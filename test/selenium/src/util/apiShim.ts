import CP from 'child_process'
import FS from 'fs'

import {envOpts} from 'test/selenium'

export function ShimApiTests(startsWith: string) {
    beforeAll(() => {
        const out = CP.execSync(`RDECK_URL=${envOpts.RUNDECK_URL} bash ./rundecklogin.sh - admin admin`, {cwd: '../api'})
    })

    let tests = FS.readdirSync('../api')

    tests = tests.filter(t => t.startsWith(startsWith) && t.endsWith('.sh'))

    tests.forEach(t => {
        it(t, () => {
            try {
                const out = CP.execSync(`RDECK_URL=${envOpts.RUNDECK_URL} bash ./${t} -`, {cwd: '../api'})
            } catch {
                process.exit(1)
            }
        })
    })
}
