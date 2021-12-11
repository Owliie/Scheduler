import * as dotenv from 'dotenv'
dotenv.config()

import UnhandledErrorHandler from './processes/unhandled-error-handler'
UnhandledErrorHandler.run()

import { APIServer } from './app'

const server = new APIServer()
const app = server.getApp()

export { app }
