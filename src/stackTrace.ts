export const getStackTrace = () => {
    const _prepareStackTrace = Error.prepareStackTrace
    Error.prepareStackTrace = (_, stack) => stack

    const stack = (new Error() as any).stack.slice(1)
    Error.prepareStackTrace = _prepareStackTrace
    return stack
}

export const getCallerCallSite = ({ depth = 0 } = {}) => {
    const callers: any[] = []
    const callerFileSet = new Set()
    const callSites = getStackTrace()

    for (const callSite of callSites) {
        const fileName = callSite.getFileName()
        const hasReceiver = callSite.getTypeName() !== null && fileName !== null

        if (!callerFileSet.has(fileName)) {
            callerFileSet.add(fileName)
            callers.unshift(callSite)
        }

        if (hasReceiver) {
            return callers[depth]
        }
    }
}

export const getIdFromStackTrace = (stackTrace: any) => {
    let idFromNames = ''
    let i = 0
    for (const callSite of stackTrace) {
        const fileName = callSite.getFileName()
        const idPart = fileName || ''
        idFromNames += `${i} ${idPart}\n`
        i++
    }
    return idFromNames
}
