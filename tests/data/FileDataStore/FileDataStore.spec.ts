import { FileDataStore } from '../../../src/data/FileDataStore/FileDataStore.js'
import { testLogger } from '../../testUtils.js'

describe('FileDataStore', () => {
    const dataStore = new FileDataStore(testLogger)

    describe('stuffRepo', () => {
        describe('getStuff', () => {
            it('gets stuff', async () => {
                const stuff = await dataStore.stuffRepo.getStuff()
                expect(stuff).toBe('stuff')
            })
        })
    })
})
