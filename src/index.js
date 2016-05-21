import {
  Continuation,
  More,
  Done
} from './Continuation.js'
import Trampoline from './Trampoline.js'

const more = (fn, ...args) => new More(fn, ...args)
const done = value => new Done(value)

exports.trampoline = (fn, ...args) => new Trampoline(new More(fn, ...args)).run
exports.cont = more
exports.more = more
exports.done = done
