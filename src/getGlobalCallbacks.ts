import { GLOBAL_CALLBACKS_PROP_NAME } from './constants'
import { TGlobalCallbacks } from '../types'

export default function (): TGlobalCallbacks {
    let globalCallbacks: TGlobalCallbacks =
        globalThis[GLOBAL_CALLBACKS_PROP_NAME]

    if (!globalCallbacks) {
        globalCallbacks = {}
        globalThis[GLOBAL_CALLBACKS_PROP_NAME] = globalCallbacks
    }
    return globalCallbacks
}
