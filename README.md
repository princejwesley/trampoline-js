# trampoline-js

[![npm version](https://badge.fury.io/js/trampoline-js.svg)](http://badge.fury.io/js/trampoline-js) ![license](https://img.shields.io/badge/license-MIT-blue.svg)

Transforms recursion ⟹ loop

##Usage

Install from npm

> npm install trampoline-js

```javascript

let { trampoline, done, more } = require('trampoline-js')


const times = (() => {
  const _times = (n, s, acc) =>
    n <= 0
      // on done (base condition)
      ? done(acc)
      // continuation as thunks
      // takes continuation function and accumulated results
      : more(_times, n - 1, s, `${acc}${s}`)
  // build trampoline by passing recursive function and optional initial objects
  return trampoline(_times, '')
})()

times(5, '*')
// > '*****'

```

## License
This plugin is licensed under the [MIT license](https://github.com/princejwesley/trampoline-js/blob/master/LICENSE).

Copyright (c) 2016 [Prince John Wesley](http://www.toolitup.com)
