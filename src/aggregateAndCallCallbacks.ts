import { WatchProcessDeath } from './'
import { TEventNames } from './types'
import fsPromises from 'node:fs/promises'
const callAllCallbacks = async function (
    this: WatchProcessDeath,
    eventName,
    withExit
) {
    const globalCallbackRecords = this.globalCallbackRecords
    if (globalCallbackRecords === null) return

    const globalCallbackRecordEntries = Object.entries(globalCallbackRecords)
    for (const [
        idFromStackTrace,
        callbackRecord,
    ] of globalCallbackRecordEntries) {
        const { filePath, lineNumber, callback } = callbackRecord
        try {
            await fsPromises.access(filePath)
        } catch {
            delete globalCallbackRecords[idFromStackTrace]
            continue
        }
        console.log(
            `\x1b[46m\x1b[30mCalled process death handler from\n${filePath}:${lineNumber}\x1b[0m`
        )
        await callback(eventName, withExit)
    }
}
export const aggregateAndCallCallbacks = async function (
    this: WatchProcessDeath,
    eventName: TEventNames,
    withExit: boolean
) {
    const globalCallbackRecords = this.globalCallbackRecords
    if (globalCallbackRecords === null) return

    const globalWatchProcessDeath = this.globalWatchProcessDeath
    if (!globalWatchProcessDeath) return
    const { callbacksAggregatePending } = globalWatchProcessDeath

    if (!callbacksAggregatePending) {
        const { callbacksAggregatePendingMs } = this.options
        const callbacksAggregatePending = new Promise(resolve =>
            setTimeout(resolve, callbacksAggregatePendingMs)
        )
        globalWatchProcessDeath.callbacksAggregatePending =
            callbacksAggregatePending
        callbacksAggregatePending.then(async () => {
            globalWatchProcessDeath.callbacksAggregatePending = null
            await callAllCallbacks.call(this, eventName, withExit)
            if (!withExit) return
            process.exit()
        })
    }
}
