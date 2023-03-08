import { TAddMiddleware } from '../types'
import { getIdFromStackTrace, getStackTrace } from './stackTrace'
import { WatchProcessDeath } from './'
export const addMiddleware: TAddMiddleware = function (
    this: WatchProcessDeath,
    callback
) {
    const globalCallbacks = this.globalCallbacks
    if (globalCallbacks === null) return
    const stackTrace = getStackTrace()
    const idFromStackTrace = getIdFromStackTrace(stackTrace)
    const firstCallSite = stackTrace[1]
    const filePath = firstCallSite.getFileName()
    const lineNumber = firstCallSite.getLineNumber()
    globalCallbacks[idFromStackTrace] = {
        filePath,
        lineNumber,
        callback,
    }
}
