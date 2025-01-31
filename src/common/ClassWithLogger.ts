import { Logger } from './Logger.js'

/**
 * Thin base class that sets up a logger to prepend messages with the class
 * name
 */
export class ClassWithLogger {
    protected readonly logger: Logger

    constructor(logger: Logger) {
        const className = this.constructor.name
        this.logger = logger.makeChildLogger(`[${className}] `)
        this.logger.trace('Instance initialized')
    }
}
