# trampoline-js

[![Build Status](https://travis-ci.org/princejwesley/trampoline-js.svg)](https://travis-ci.org/princejwesley/trampoline-js) [![npm version](https://badge.fury.io/js/trampoline-js.svg)](http://badge.fury.io/js/trampoline-js) ![license](https://img.shields.io/badge/license-MIT-blue.svg)

Transforms recursion ⟹ loop

## Usage

Install from npm

> npm install trampoline-js

```javascript

let { trampoline, done, more } = require('trampoline-js')


const times = (() => {
  // optional accumulators & user input
  const _times = (acc, n, s) =>
    n <= 0
      // on done (base condition)
      ? done(acc)
      // continuation as thunks
      // takes continuation function and params
      : more(_times, `${acc}${s}`, n - 1, s)
  // build trampoline by passing recursive function and optional initial objects
  return trampoline(_times, '')
})()

times(5, '*')
// > '*****'

```

### API
<code> function trampoline(genFun, [args]) </code>
> `trampoline` takes **generate/recursive** function and optional arguments (optional). it returns a function of form `function ([arguments]) {}`.

> On invoking returned function, `genFun` will be called with `args` followed by caller supplied `arguments`.

> `genFun` should return either `done` (a wrapper for base case) or `more`(a wrapper function for continuation function). Otherwise, 'Invalid continuation' Error will be thrown.

<code> function more(fun, [args]) </code>
> `more` should provide continuation function as first parameter and optional args.

<code> function cont(fun, [args]) </code>
> Alias for `more`.

<code> function done(result) </code>
> `done` is a base case wrapper which takes terminal object and `result` will be returned as output.



## License
This plugin is licensed under the [MIT license](https://github.com/princejwesley/trampoline-js/blob/master/LICENSE).

Copyright (c) 2016 [Senthil Porunan / Prince John Wesley](http://www.toolitup.com)
