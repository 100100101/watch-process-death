type callbackType = (eventName: string) => void
let isProcessWatchingStarted = false
const callbackList: Array<callbackType> = []

const exitHandler = async function (options: any = {}, error) {
    const eventName = options.eventName
    if (eventName === 'uncaughtException') {
        console.error(error)
        return
    }
    if (eventName === 'exit') {
        return
    }
    console.log('error:', error, eventName)
    await Promise.all(callbackList.map(callback => callback(eventName)))
    if (options.exit) {
        // setTimeout(process.exit, 10000)
        process.exit()
    }
}

export const startProcessDeathWatching = () => {
    process.stdin.resume()
    // do something when app is closing
    process.on(
        'exit',
        exitHandler.bind(null, { eventName: 'exit', exit: true })
    )
    // catches ctrl+c event
    process.on(
        'SIGINT',
        exitHandler.bind(null, { eventName: 'SIGINT', exit: true })
    )

    //  catches "kill pid" (for example: nodemon restart)
    process.on(
        'SIGUSR1',
        exitHandler.bind(null, { eventName: 'SIGUSR1', exit: true })
    )
    process.on(
        'SIGUSR2',
        exitHandler.bind(null, { eventName: 'SIGUSR2', exit: true })
    )
    // catches uncaught exceptions
    // отлавливает exceptions и не дает завершиться процессу
    process.on(
        'uncaughtException',
        exitHandler.bind(null, { eventName: 'uncaughtException', exit: true })
    )

    isProcessWatchingStarted = true
}

export const watchProcessDeath = (callback: callbackType) => {
    if (!isProcessWatchingStarted) startProcessDeathWatching()
    callbackList.push(callback)
}

// process.kill(process.pid, 'SIGUSR2')
// process.kill(process.ppid, 'SIGUSR2')
