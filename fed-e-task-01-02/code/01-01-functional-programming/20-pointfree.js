// point free
// Hello world => hello_world

const fp = require('lodash/fp')
const f = fp.flowRight(fp.replace(/\s+/g, '_'), fp.toLower)
console.log(f('Hello world'))
