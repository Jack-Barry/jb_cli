import { writeFile } from 'node:fs/promises'
import { type Logger as PinoLogger, StreamEntry, multistream, pino } from 'pino'
import PinoPretty, { PrettyOptions } from 'pino-pretty'
import { EnvVar } from './constants.js'

export type LogFnArgs = [unknown, string, ...args: unknown[]] | [string, ...args: unknown[]]
export type LogFn = (...args: LogFnArgs) => void

enum LogLevel {
    Trace = 'trace',
    Debug = 'debug',
    Info = 'info',
    Warn = 'warn',
    Error = 'error',
    Fatal = 'fatal'
}

export interface LoggerOptions {
    /** Path to the log file to use */
    logFile?: string
    /**
     * Whether or not to write to log file, e.g. can be turned off for unit
     * tests
     *
     * @default true if `logFile` is set, false otherwise
     */
    writeToLogFile?: boolean
    /**
     * Custom Pino Logger to use, should mostly only be used internally when making child loggers
     */
    customLogger?: PinoLogger
}

export class Logger {
    private logger: PinoLogger
    private loggerOptions: LoggerOptions
    private children: Record<string, Logger> = {}

    constructor(options: LoggerOptions) {
        /* v8 ignore start */
        const consoleLogLevel = process.env[EnvVar.CONSOLE_LOG_LEVEL] || LogLevel.Info
        this.validateLogLevel(EnvVar.CONSOLE_LOG_LEVEL, consoleLogLevel)

        const fileLogLevel = process.env[EnvVar.FILE_LOG_LEVEL] || LogLevel.Trace
        this.validateLogLevel(EnvVar.FILE_LOG_LEVEL, fileLogLevel)

        const { customLogger, writeToLogFile = !!options.logFile, logFile } = options

        this.loggerOptions = {
            customLogger,
            logFile,
            writeToLogFile
        }

        if (customLogger) {
            this.logger = customLogger
            return
        }

        const streams: StreamEntry[] = []
        const basePrettyOptions: PrettyOptions = {
            ignore: 'pid,hostname',
            sync: true
        }

        streams.push({
            level: consoleLogLevel,
            stream: PinoPretty(basePrettyOptions)
        })

        if (writeToLogFile) {
            streams.push({
                level: fileLogLevel,
                stream: PinoPretty({
                    ...basePrettyOptions,
                    colorize: false,
                    destination: this.loggerOptions.logFile,
                    mkdir: true
                })
            })
        }

        this.logger = pino({ level: LogLevel.Trace }, multistream(streams))
        /* v8 ignore end */
    }

    /** Clears the contents of the log file */
    async cleanLogFile() {
        if (!this.loggerOptions.logFile) {
            this.trace('logFile not set, skipping log file cleaning')
            return
        }

        if (!this.loggerOptions.writeToLogFile) {
            this.trace('writeToLogFile is false, skipping log file cleaning')
            return
        }

        this.trace('Cleaning log file')
        await writeFile(this.loggerOptions.logFile, '', 'utf8')
        this.trace('Log file has been cleaned')
    }

    /** Generates a child logger that will add to its parent's `msgPrefix` value */
    makeChildLogger(msgPrefix: string) {
        if (!this.children[msgPrefix]) {
            this.children[msgPrefix] = new Logger({
                ...this.loggerOptions,
                customLogger: this.logger.child({}, { msgPrefix })
            })
        }
        return this.children[msgPrefix]
    }

    trace(...args: LogFnArgs) {
        this.log(LogLevel.Trace, ...args)
    }

    debug(...args: LogFnArgs) {
        this.log(LogLevel.Debug, ...args)
    }

    info(...args: LogFnArgs) {
        this.log(LogLevel.Info, ...args)
    }

    warn(...args: LogFnArgs) {
        this.log(LogLevel.Warn, ...args)
    }

    error(...args: LogFnArgs) {
        this.log(LogLevel.Error, ...args)
    }

    fatal(...args: LogFnArgs) {
        this.log(LogLevel.Fatal, ...args)
    }

    private log(level: LogLevel, ...args: LogFnArgs) {
        const logFn = (this.logger[level] as LogFn).bind(this.logger)
        logFn(...args)
    }

    private validateLogLevel(envVarName: EnvVar, level: string): asserts level is LogLevel {
        if (!Object.values(LogLevel).includes(level as LogLevel)) {
            throw new Error(
                `Invalid ${envVarName}: ${level}, must be one of ${Object.values(LogLevel).join(', ')}`
            )
        }
    }
}
