import { GLOBAL_WATCH_PROCESS_DEATH_PROP_NAME } from './constants'
import { TGlobalWatchProcessDeath } from './types'

export default function (): TGlobalWatchProcessDeath {
    let globalWatchProcessDeath: TGlobalWatchProcessDeath =
        globalThis[GLOBAL_WATCH_PROCESS_DEATH_PROP_NAME]

    if (globalWatchProcessDeath) {
        return globalWatchProcessDeath
    }

    globalWatchProcessDeath = {
        callbackRecords: {},
        callbacksAggregatePending: null,
    }
    globalThis[GLOBAL_WATCH_PROCESS_DEATH_PROP_NAME] = globalWatchProcessDeath

    return globalWatchProcessDeath
}
