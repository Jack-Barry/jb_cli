import { ClassWithLogger } from '../common/ClassWithLogger.js'
import { Logger } from '../common/Logger.js'
import { DataStore } from '../data/DataStore.js'

export class App extends ClassWithLogger {
    constructor(
        logger: Logger,
        private dataStore: DataStore
    ) {
        super(logger)
    }

    async doStuff() {
        this.logger.info('Hello from businesss logic land')
        await this.dataStore.stuffRepo.getStuff()
    }
}
