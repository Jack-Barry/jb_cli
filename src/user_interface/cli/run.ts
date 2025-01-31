import { homedir } from 'node:os'
import { resolve } from 'node:path'
import { App } from '../../app/App.js'
import { Logger } from '../../common/Logger.js'
import { InMemoryDataStore } from '../../data/InMemoryDataStore/InMemoryDataStore.js'
import { CLI } from './CLI.js'

const logger = new Logger({ logFile: resolve(homedir(), 'Desktop/CLI Logs/cli.log') })
const dataStore = new InMemoryDataStore(logger)
const app = new App(logger, dataStore)
const cli = new CLI(logger, app)
cli.run()
