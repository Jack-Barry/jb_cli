/**
 * Abstract interface that must be implemented by a "stuff repo" to be usable by
 * the application
 */
export interface StuffRepo {
    getStuff: () => string | Promise<string>
}

/**
 * Abstract interface that must be implemented by a data store to be usable by
 * the application
 *
 * "Sub" repositories can be their own classes so that they're less sprawling
 * and more focused. The single `DataStore` serves as an easy way to instantiate
 * all repositories in a single constructor at app initialization time.
 *
 * A single `DataStore` may even comprise more than a single data storage type,
 * e.g. if a mixture of in memory, filesystem, and database, etc. were needed.
 * In that case it might be named for the context in which its used, e.g.
 * `WebAppDataStore` or `DesktopAppDataStore` etc.
 */
export interface DataStore {
    stuffRepo: StuffRepo
}
