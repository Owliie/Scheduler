import { getLoggerFor } from '../services/logger'

const logger = getLoggerFor('Node-App')
const MAX_TIME_TO_HANDLE = 10000 // 10 Seconds

class UnhandledErrorHandler {

    private unhandledRejections: any
    public static instance: UnhandledErrorHandler

    public constructor () {
        if (!UnhandledErrorHandler.instance) {
            this.unhandledRejections = new Map()
            UnhandledErrorHandler.instance = this
        }

        return UnhandledErrorHandler.instance
    }

    public run () {
        /**
         * This Global-error-handler is required so that we do not miss any uncaughtException or unhandledPromiseRejection that occurs in the App.
         * The exceptions and promise rejections should be logged, because by default all uncaught exceptions and promises go to stout, however our AWS Deployments have only winston logged logs,
         * therefore we won't notice the exceptions if we do not have global exception handlers
         */
        // Listens for every unchaughtException that occurs and loggs it as critical.
        process.on('uncaughtException', (error) => {
            logger.error(`Uncaught Exception. Details:\n${error.stack}`)
        })
        /**
         * The Unhandled rejections can be handled asynchronously on another run of the event loop, therefore we add the unhandledRejection in a map.
         * Once the rejection is handled we remove it from the map, however if the rejection is not handled in the provided time - in this case MAX_TIME_TO_HANDLE - 10 seconds, we log the unhandled promise.
         */
        process.on('unhandledRejection', (error, promise) => {
            this.unhandledRejections.set(promise, { error, time: Date.now() })
        })
        process.on('rejectionHandled', (promise) => {
            this.unhandledRejections.delete(promise)
        })

        setInterval(() => {
            const notHandled: any = []
            const now = Date.now()
            // @ts-ignore
            this.unhandledRejections.forEach(({ error, time }, promise) => {
                if ((now - time) > MAX_TIME_TO_HANDLE) {
                    logger.error(`Unhandled promise rejection: ${error}`)
                    notHandled.push(promise)
                }
            })

            notHandled.forEach((promise: any) => this.unhandledRejections.delete(promise))
        }, MAX_TIME_TO_HANDLE)
    }

}

export default new UnhandledErrorHandler()
