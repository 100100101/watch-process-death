import { GLOBAL_CALLBACKS_PROP_NAME } from './constants'
import { TGlobalCallbacks } from '../types'
export const awaitAllGlobalCallbacks = async (eventName, withExit) => {
    const globalCallbacks: TGlobalCallbacks =
        globalThis[GLOBAL_CALLBACKS_PROP_NAME]

    const globalCallbacksValues = Object.values(globalCallbacks)
    const callbackPromises = globalCallbacksValues.map(callback =>
        callback(eventName, withExit)
    )

    await Promise.allSettled(callbackPromises)
}
