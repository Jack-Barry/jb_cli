import { Logger } from '../src/common/Logger.js'

/** Logger preconfigured for use in unit tests */
export const testLogger = new Logger({ writeToLogFile: false })
