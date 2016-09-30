var most = require('most');

import { compose, id } from '@most/prelude'

const pipe = (...fs) => fs.reduceRight(compose)


let one = (x) => x + 1
let two = (y) => y * 3

let action = pipe(one, two);

console.log(action(1));