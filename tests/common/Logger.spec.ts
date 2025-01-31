import { EnvVar } from '../../src/common/constants.js'
import { LogFnArgs, Logger } from '../../src/common/Logger.js'
import { testLogger } from '../testUtils.js'

describe('Logger', () => {
    describe('constructor', () => {
        const originalEnv = process.env

        beforeEach(() => {
            process.env = { ...originalEnv }
        })

        afterEach(() => {
            process.env = originalEnv
        })

        it('prevents invalid CONSOLE_LOG_LEVEL values', () => {
            process.env[EnvVar.CONSOLE_LOG_LEVEL] = 'invalid'
            expect(() => new Logger({})).toThrow(`Invalid ${EnvVar.CONSOLE_LOG_LEVEL}`)
        })

        it('prevents invalid FILE_LOG_LEVEL values', () => {
            process.env[EnvVar.FILE_LOG_LEVEL] = 'invalid'
            expect(() => new Logger({})).toThrow(`Invalid ${EnvVar.FILE_LOG_LEVEL}`)
        })
    })

    describe('trace', () => {
        it('invokes the underlying logger method', () => {
            const traceSpy = vi.spyOn(testLogger['logger'], 'trace')
            const args: LogFnArgs = [{ test: 'object' }, 'test']
            testLogger.trace(...args)
            expect(traceSpy).toHaveBeenCalledExactlyOnceWith(...args)
        })
    })

    describe('debug', () => {
        it('invokes the underlying logger method', () => {
            const debugSpy = vi.spyOn(testLogger['logger'], 'debug')
            const args: LogFnArgs = [{ test: 'object' }, 'test']
            testLogger.debug(...args)
            expect(debugSpy).toHaveBeenCalledExactlyOnceWith(...args)
        })
    })

    describe('info', () => {
        it('invokes the underlying logger method', () => {
            const infoSpy = vi.spyOn(testLogger['logger'], 'info')
            const args: LogFnArgs = [{ test: 'object' }, 'test']
            testLogger.info(...args)
            expect(infoSpy).toHaveBeenCalledExactlyOnceWith(...args)
        })
    })

    describe('warn', () => {
        it('invokes the underlying logger method', () => {
            const warnSpy = vi.spyOn(testLogger['logger'], 'warn')
            const args: LogFnArgs = [{ test: 'object' }, 'test']
            testLogger.warn(...args)
            expect(warnSpy).toHaveBeenCalledExactlyOnceWith(...args)
        })
    })

    describe('error', () => {
        it('invokes the underlying logger method', () => {
            const errorSpy = vi.spyOn(testLogger['logger'], 'error')
            const args: LogFnArgs = [{ test: 'object' }, 'test']
            testLogger.error(...args)
            expect(errorSpy).toHaveBeenCalledExactlyOnceWith(...args)
        })
    })

    describe('fatal', () => {
        it('invokes the underlying logger method', () => {
            const fatalSpy = vi.spyOn(testLogger['logger'], 'fatal')
            const args: LogFnArgs = [{ test: 'object' }, 'test']
            testLogger.fatal(...args)
            expect(fatalSpy).toHaveBeenCalledExactlyOnceWith(...args)
        })
    })
})
