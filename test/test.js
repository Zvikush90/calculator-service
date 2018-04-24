var expect = require("chai").expect;
var assert = require('assert');

var calc = require('../calc');

describe('Calculator Module', function() {
  describe('Number Concat', function() {
    it('should concat 12345', function() {
      let s = null
      s = calc.calculateNextState(s, "1") // 1
      expect(JSON.parse(s).display).to.equal("1");
      s = calc.calculateNextState(s, "2") // 12
      expect(JSON.parse(s).display).to.equal("12");
      s = calc.calculateNextState(s, "3") // 123
      expect(JSON.parse(s).display).to.equal("123");
      s = calc.calculateNextState(s, "4") // 1234
      expect(JSON.parse(s).display).to.equal("1234");
      s = calc.calculateNextState(s, "5") // 12345
      expect(JSON.parse(s).display).to.equal("12345");
    });
  });
});

// let s = null
// s = calculateNextState(s, "1")
// console.log(JSON.parse(s).display) // 1
// s = calculateNextState(s, "2")
// console.log(JSON.parse(s).display) // 12
// s = calculateNextState(s, "+")
// console.log(JSON.parse(s).display) // 12
// s = calculateNextState(s, "4")
// console.log(JSON.parse(s).display) // 4
// s = calculateNextState(s, "3")
// console.log(JSON.parse(s).display) // 43
// s = calculateNextState(s, "=")
// console.log(JSON.parse(s).display) // 55
// s = calculateNextState(s, "+")
// console.log(JSON.parse(s).display) // 55
// s = calculateNextState(s, "1")
// console.log(JSON.parse(s).display) // 1
// s = calculateNextState(s, "=")
// console.log(JSON.parse(s).display) // 56
// s = calculateNextState(s, "5")
// console.log(JSON.parse(s).display) // 5
