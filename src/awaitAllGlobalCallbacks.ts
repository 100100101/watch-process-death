import fsPromises from 'node:fs/promises'
import { WatchProcessDeath } from './'

export async function awaitAllGlobalCallbacks(
    this: WatchProcessDeath,
    eventName,
    withExit
) {
    const globalCallbacks = this.globalCallbacks
    if (!globalCallbacks) return

    const globalCallbacksValues = Object.values(globalCallbacks)
    const callbackPromises: any = []

    const callbacksInFileEntries = Object.entries(globalCallbacksValues)
    for (const [callbackString, callbackRecord] of callbacksInFileEntries) {
        const { filePath, lineNumber, callback } = callbackRecord
        try {
            await fsPromises.access(filePath)
        } catch {
            delete globalCallbacksValues[callbackString]
            continue
        }
        console.log(
            `\x1b[46m\x1b[30mCalled process death handler from\n${filePath}:${lineNumber}\x1b[0m`
        )
        const callbackPromise = callback(eventName, withExit)
        callbackPromises.push(callbackPromise)
    }
    await Promise.allSettled(callbackPromises)
}
