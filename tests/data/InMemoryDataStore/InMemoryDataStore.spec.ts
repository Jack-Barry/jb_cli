import { InMemoryDataStore } from '../../../src/data/InMemoryDataStore/InMemoryDataStore.js'
import { testLogger } from '../../testUtils.js'

describe('InMemoryDataStore', () => {
    const dataStore = new InMemoryDataStore(testLogger)

    describe('stuffRepo', () => {
        describe('getStuff', () => {
            it('gets stuff', async () => {
                const stuff = await dataStore.stuffRepo.getStuff()
                expect(stuff).toBe('stuff')
            })
        })
    })
})
