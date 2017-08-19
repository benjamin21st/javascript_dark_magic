var pkg = (function () {
    function PrivateMember(name, age) {
        this.name = name;
        this.age = age;
    }

    PrivateMember.prototype.greet = function () {
        return 'Hi, my name is ' + this.name + ' and I am ' + this.age;
    }
    return {
        // This is the gist, by creating a facade, we effectively proxied any
        // attempt to tamper the real PrivateMember to a new function
        PrivateMember: function (name, age) {
            return new PrivateMember(name, age);
        }
    };
})();


// Test
var turing = new pkg.PrivateMember('alan', 105)
console.assert(turing.greet() === 'Hi, my name is alan and I am 105');

var daVinci = new pkg.PrivateMember('leo', 565);
console.assert(daVinci.greet() === 'Hi, my name is leo and I am 565');

console.assert(turing.greet === daVinci.greet);

// Try to hijack this popular function and do evil things with it
pkg.PrivateMember.prototype.greet = function () {
    return 'This greeting is hijacked';
}
// justice prevails and evils lose
console.assert(turing.greet() === 'Hi, my name is alan and I am 105');
console.assert(daVinci.greet() === 'Hi, my name is leo and I am 565');
