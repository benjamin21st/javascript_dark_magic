/**
 * This script demostrates how order of function definitions matter,
 *
 */
console.assert(bar1() === 'bar1');
console.assert(bar() === 'bar'); // error

/**
 * functions declared using the function keyword is always hoisted,
 * so "bar1" can be executed in first line even though it seems that
 * it is not defined yet; but doing this for bar will cause error;
 */
function bar1() {
  return 'bar1';
}

/**
  * Calling "foo" which is defined  after bar inside bar's function body will
  * not cause an error, because the body of the code has not been executed;
 */
var bar = function () {
  foo();
  return 'bar';
}
/**
 * However if you define bar2 as a IIFE, this code will break, because now it attempts
 * to call foo before it is defined
 */
var bar2 = (function () {
  foo();
  return function () {
    'bar2'
  };
})();

var foo = function () {
  return 'foo';
}

console.assert(bar() === 'bar');