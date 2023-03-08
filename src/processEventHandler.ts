import { TProcessEventHandler } from '../types'
import { WatchProcessDeath } from './'
export const processEventHandler: TProcessEventHandler = async function (
    this: WatchProcessDeath,
    { withExit = false, eventName },
    errorOrErrorCode
) {
    const isErrorCode = typeof errorOrErrorCode === 'number'
    const logPart = `\x1b[42m\x1b[30mwatch-process-death 
    event: ${eventName}
    With process exit: ${withExit}\x1b[0m
    `
    if (isErrorCode) {
        const isSuccessCode = errorOrErrorCode === 0
        const message = isSuccessCode ? 'Is success event' : ''
        console.log(logPart, '\n', 'Message:', message)
    } else if (eventName === 'uncaughtException') {
        console.error('"uncaughtException" errorOrErrorCode:', errorOrErrorCode)
        return
    } else {
        console.log(logPart)
    }

    await this.awaitAllGlobalCallbacks(eventName, withExit)

    if (withExit) {
        process.exit()
    }
}
