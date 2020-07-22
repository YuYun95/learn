import { foo, bar } from './module.mjs'

console.log(foo, bar)

import fs from 'fs'

fs.writeFileSync('./foo.txt', 'es module working')
