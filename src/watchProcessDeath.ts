import { GLOBAL_CALLBACK_LIST_PROP_NAME } from './constants'
import { TWatchProcessDeath } from '../types'
import { startProcessDeathWatching } from './startProcessDeathWatching'
// let isProcessWatchingStarted = false
// globalThis.isProcessWatchingStarted = false

export const watchProcessDeath: TWatchProcessDeath = callback => {
    const globalCallbackList = globalThis[GLOBAL_CALLBACK_LIST_PROP_NAME]
    if (!globalCallbackList) {
        console.log('startProcessDeathWatching:')

        startProcessDeathWatching()
    }
    globalCallbackList.push(callback)
    console.log('globalCallbackList:', globalCallbackList, callback)
}

// process.kill(process.pid, 'SIGUSR2')
// process.kill(process.ppid, 'SIGUSR2')
