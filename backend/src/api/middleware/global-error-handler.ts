// This only works for express(4.x) with routes set in style ->
//      router.#method('url', middleware, action)
//      app.use('router url', router);
// #Method can be each one of the http's methods
//
// Errors Handler works for already routed app
// It's purpose is to handle routes and middleware errors

class AppErrorsHandler {

    private app: any

    public constructor (app: any) {
        this.app = app
    }

    public handleErrors () {
        const appStack = this.app._router.stack

        for (let i = 0; i < appStack.length; i++) {
            // Check if middleware
            if (!appStack[i].handle.stack) {
                appStack[i].handle = this.buildErrorHandlerForAction(appStack[i].handle)
            }

            // Check if router
            if (appStack[i].handle.stack) {
                const appRoute = appStack[i].handle.stack
                this.wrapEachRouteActionWithErrorHandler(appRoute)
            }
        }

        return this.app
    }

    private wrapEachRouteActionWithErrorHandler (appRoute: any, i = 0): any {
        if (i === appRoute.length) {
            return undefined
        }

        // Check for nested routes
        if (appRoute[i].handle.stack) {
            this.wrapEachRouteActionWithErrorHandler(appRoute[i].handle.stack)
        } else {
            const routeActions = appRoute[i].route.stack

            for (let j = 0; j < routeActions.length; j++) {
                const routeAction = routeActions[j].handle
                routeActions[j].handle = this.buildErrorHandlerForAction(routeAction)
            }
        }

        return this.wrapEachRouteActionWithErrorHandler(appRoute, ++i)
    }

    private buildErrorHandlerForAction (routeAction: any) {
        return async (req: any, res: any, next: any) => {
            try {
                await routeAction(req, res, next)
            } catch (error) {
                if (error.isAPIOne) {
                    error.logError()
                    return res.status(error.statusCode).send({ message: error.message })
                }

                console.log(error)
                return res.status(500).send({ message: 'Internal Error' })
            }
        }
    }

}

export default AppErrorsHandler
