import { ClassWithLogger } from '../../common/ClassWithLogger.js'
import { StuffRepo as StuffRepoInterface } from '../DataStore.js'

export class StuffRepo extends ClassWithLogger implements StuffRepoInterface {
    async getStuff() {
        this.logger.trace('Getting stuff')
        return 'stuff'
    }
}
