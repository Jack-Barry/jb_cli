import { ClassWithLogger } from '../../common/ClassWithLogger.js'
import { type DataStore } from '../DataStore.js'
import { StuffRepo } from './StuffRepo.js'

/** Implements data storage in memory */
export class InMemoryDataStore extends ClassWithLogger implements DataStore {
    stuffRepo = new StuffRepo(this.logger)
}
