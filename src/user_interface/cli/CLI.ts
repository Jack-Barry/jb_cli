import { App } from '../../app/App.js'
import { ClassWithLogger } from '../../common/ClassWithLogger.js'
import { Logger } from '../../common/Logger.js'

/** Provides view for the app in form of a CLI */
export class CLI extends ClassWithLogger {
    constructor(
        logger: Logger,
        private app: App
    ) {
        super(logger)
    }

    async run() {
        await this.logger.cleanLogFile()
        this.logger.info('Hello from user interface land')
        await this.app.doStuff()
    }
}
