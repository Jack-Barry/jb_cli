import { ClassWithLogger } from '../../common/ClassWithLogger.js'
import { type DataStore } from '../DataStore.js'
import { StuffRepo } from './StuffRepo.js'

/** Implements data storage using the file system */
export class FileDataStore extends ClassWithLogger implements DataStore {
    readonly stuffRepo = new StuffRepo(this.logger)
}
