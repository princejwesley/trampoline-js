import AssertError from './AssertError.js'

export class Continuation {
	constructor(val) {
		this.val = val
	}

	get value() {
		return this.val
	}

	set value(val) {
		this.val = val
	}
}

export class More extends Continuation {
	constructor(fn, ...args) {
		if(typeof fn !== 'function') {
			throw new AssertError(`Expected: function Found: ${typeof fn}`)
		}
		super(fn)
		this.arguments = args
	}

	get args() {
		return this.arguments
	}
}

export class Done extends Continuation {
	constructor(result) {
		super(result)
	}
}

Continuation.prototype.more = fn => new More(fn)
Continuation.prototype.done = value => new Done(value)
