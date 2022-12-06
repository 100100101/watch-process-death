import { GLOBAL_CALLBACKS_PROP_NAME } from './constants'
import { TWatchProcessDeath, TGlobalCallbacks } from '../types'
import { startProcessDeathWatching } from './startProcessDeathWatching'
import { getCallSitesIdFromNames } from './callSites'

export const watchProcessDeath: TWatchProcessDeath = callback => {
    const callSitesIdFromNames = getCallSitesIdFromNames()
    const globalCallbacks: TGlobalCallbacks =
        globalThis[GLOBAL_CALLBACKS_PROP_NAME]
    if (!globalCallbacks) {
        startProcessDeathWatching()
    }
    globalCallbacks[callSitesIdFromNames] = callback
}
