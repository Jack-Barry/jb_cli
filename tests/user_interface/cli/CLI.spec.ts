import { App } from '../../../src/app/App.js'
import { Logger } from '../../../src/common/Logger.js'
import { InMemoryDataStore } from '../../../src/data/InMemoryDataStore/InMemoryDataStore.js'
import { CLI } from '../../../src/user_interface/cli/CLI.js'
import { testLogger } from '../../testUtils.js'

describe('CLI', () => {
    const dataStore = new InMemoryDataStore(testLogger)
    const app = new App(testLogger, dataStore)
    const cli = new CLI(testLogger, app)

    describe('run', () => {
        it('clears the log file', async () => {
            const cleanLogFile = vi.spyOn(Logger.prototype, 'cleanLogFile')
            await cli.run()
            expect(cleanLogFile).toHaveBeenCalledOnce()
        })
    })
})
