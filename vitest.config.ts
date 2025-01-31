import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        coverage: {
            include: ['src/**'],
            exclude: ['src/data/DataStore.ts', 'src/user_interface/cli/run.ts'],
            thresholds: {
                '100': true
            }
        },
        dir: 'tests',
        globals: true
    }
})
