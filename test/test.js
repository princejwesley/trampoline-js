let test = require('tape');
let { trampoline, done, more } = require('../dist/index.js')

const _times = (n, s, acc) => n <= 0 ? done(acc) : more(_times, n - 1, s, `${acc}${s}`)
const times = trampoline(_times, '')

test('recursive times function', function (t) {
  t.plan(2);
  let result = times(5, '*')
  t.equal(result, '*****');
  t.equal(times(5000, '*').length, 5000);
});


const _counter = (n, c) => n <= 0 ? done(c) : more(_counter, n - 1, c + 1)
const counter = trampoline(_counter, 0)

test('recursive counter function', function (t) {
  t.plan(1);
  t.equal(counter(500000), 500000);
});


test('verify recursive function params', function (t) {
  t.plan(4);
  let fun = trampoline(() => done(1))
  t.equal(fun(), 1);

  fun = trampoline(x => done(x))
  t.equal(fun('trampoline'), 'trampoline');

  fun = trampoline((x, y) => y ? done(`${y} ${x}`) : done(`${x} welcome!`), 'Hi')
  t.equal(fun('there!'), 'Hi there!');
  t.equal(fun(), 'Hi welcome!');
});