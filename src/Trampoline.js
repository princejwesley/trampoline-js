import {
  Continuation,
  More,
  Done
} from './Continuation.js'

export default class Trampoline {
  constructor(cont) {
    this.cont = cont
    this.run = this.run.bind(this)
  }

  run(...args) {
    let cont = this.cont.value(...this.cont.args, ...args)
    while (cont) {
      if (cont instanceof Done) {
        return cont.value
      }

      if (cont instanceof More) {
        cont = cont.value(...cont.args)
      } else throw new Error(`Invalid continuation: ${cont}`)
    }
    throw new Error(`Invalid continuation: ${cont}`)
  }
}
