/**
 * This code module defines and illustrates a "parasitic combination inheritance",
 * which is the most optimal inheritance paradigm in JavaScript in terms of
 * performance, decouple instance/constructor, etc.
 */
'use strict';

function Person(name) {
  this.name = name;
  this.languages = ['English'];
}

Person.prototype.greet  = function () {
  return 'Hi, my name is ' + this.name + '.';
}

function Developer(name, languages) {
  Person.call(this, name); // or apply(this, [name]) if you are uncertain of how many params it takes
  this.languages = languages;
}

function extend(SubType, SuperType) {
  var prototype = SuperType.prototype;
  prototype.constructor = SubType;
  SubType.prototype = prototype;
}

extend(Developer, Person);


Developer.prototype.intro = function () {
  var lang = '';
  for (var i = 0; i < this.languages.length; i++) {
    if (i !== 0) {
      lang += ', '
    }
    lang += this.languages[i];
  }
  return this.greet() + ' I write ' + lang;
}

// Tests
var p = new Person('p');
console.assert(p.name === 'p');
console.assert(p.greet() === 'Hi, my name is p.');
var q = new Developer('q', ['javascript', 'python']);
console.assert(q.name === 'q');
console.assert(q.intro() === 'Hi, my name is q. I write javascript, python');
q.languages.push('c++');
console.assert(p.languages[0] === 'English' && p.languages.length === 1);
console.assert(q.languages[q.languages.length - 1] === 'c++');
console.assert(q.greet === p.greet);