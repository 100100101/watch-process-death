type callbackType = (eventName: string) => void
let isProcessWatchingStarted = false
const callbackList: Array<callbackType> = []
type TOptions = {
    isExit: boolean
    eventName:
        | 'exit'
        | 'SIGINT'
        | 'SIGUSR1'
        | 'SIGUSR2'
        | 'uncaughtException'
        | ''
}
const exitHandler = async (
    { isExit = false, eventName = '' }: TOptions,
    error
) => {
    console.log(
        `%c❗ Error event '${eventName}' : `,
        'color: #ff6860',
        'with process exit:',
        isExit,
        error,
        `❗`
    )

    if (!isExit) return

    await Promise.all(callbackList.map(callback => callback(eventName)))

    // setTimeout(process.exit, 10000)
    process.exit()
}

export const startProcessDeathWatching = () => {
    process.stdin.resume()
    // do something when app is closing
    process.on(
        'exit',
        exitHandler.bind(null, { eventName: 'exit', isExit: true })
    )
    // catches ctrl+c event
    process.on(
        'SIGINT',
        exitHandler.bind(null, { eventName: 'SIGINT', isExit: true })
    )

    //  catches "kill pid" (for example: nodemon restart)
    process.on(
        'SIGUSR1',
        exitHandler.bind(null, { eventName: 'SIGUSR1', isExit: true })
    )
    process.on(
        'SIGUSR2',
        exitHandler.bind(null, { eventName: 'SIGUSR2', isExit: true })
    )
    // catches uncaught exceptions
    // отлавливает exceptions и не дает завершиться процессу
    process.on(
        'uncaughtException',
        exitHandler.bind(null, {
            eventName: 'uncaughtException',
            isExit: false,
        })
    )

    isProcessWatchingStarted = true
}

export const watchProcessDeath = (callback: callbackType) => {
    if (!isProcessWatchingStarted) startProcessDeathWatching()
    callbackList.push(callback)
}

// process.kill(process.pid, 'SIGUSR2')
// process.kill(process.ppid, 'SIGUSR2')
