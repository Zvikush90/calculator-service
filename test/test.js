// https://semaphoreci.com/community/tutorials/getting-started-with-node-js-and-mocha
var app = require('../server');
var chai = require('chai');
var chaiHttp = require('chai-http') ;
chai.use(chaiHttp);
var expect = chai.expect;
var assert = chai.assert;
var request = require('supertest');

// ******************************************************************************************************
//                                            UNIT TESTS
// ******************************************************************************************************

// #region unit-tests

var calc = require('../calc');

describe('Calculator Module', function() {
  describe('Number Concat', function() {
    it('should concat 12345', function() {
      let s = null
      s = calc.calculateNextState(s, "1") // 1
      expect(JSON.parse(s).display).to.equal(1);
      s = calc.calculateNextState(s, "2") // 12
      expect(JSON.parse(s).display).to.equal(12);
      s = calc.calculateNextState(s, "3") // 123
      expect(JSON.parse(s).display).to.equal(123);
      s = calc.calculateNextState(s, "4") // 1234
      expect(JSON.parse(s).display).to.equal(1234);
      s = calc.calculateNextState(s, "5") // 12345
      expect(JSON.parse(s).display).to.equal(12345);
    });
  });

  describe('+ Operator after Concat', function() {
    it('should accept + after number and continue to display 12345', function() {
      let s = null
      s = calc.calculateNextState(s, "1") // 1
      expect(JSON.parse(s).display).to.equal(1);
      s = calc.calculateNextState(s, "2") // 12
      expect(JSON.parse(s).display).to.equal(12);
      s = calc.calculateNextState(s, "3") // 123
      expect(JSON.parse(s).display).to.equal(123);
      s = calc.calculateNextState(s, "4") // 1234
      expect(JSON.parse(s).display).to.equal(1234);
      s = calc.calculateNextState(s, "5") // 12345
      expect(JSON.parse(s).display).to.equal(12345);
      s = calc.calculateNextState(s, "+") // 12345
      expect(JSON.parse(s).display).to.equal(12345);
    });
  });

  describe('- Operator after Concat', function() {
    it('should accept - after number and continue to display 12345', function() {
      let s = null
      s = calc.calculateNextState(s, "1") // 1
      expect(JSON.parse(s).display).to.equal(1);
      s = calc.calculateNextState(s, "2") // 12
      expect(JSON.parse(s).display).to.equal(12);
      s = calc.calculateNextState(s, "3") // 123
      expect(JSON.parse(s).display).to.equal(123);
      s = calc.calculateNextState(s, "4") // 1234
      expect(JSON.parse(s).display).to.equal(1234);
      s = calc.calculateNextState(s, "5") // 12345
      expect(JSON.parse(s).display).to.equal(12345);
      s = calc.calculateNextState(s, "-") // 12345
      expect(JSON.parse(s).display).to.equal(12345);
    });
  });

  describe('* Operator after Concat', function() {
    it('should accept * after number and continue to display 12345', function() {
      let s = null
      s = calc.calculateNextState(s, "1") // 1
      expect(JSON.parse(s).display).to.equal(1);
      s = calc.calculateNextState(s, "2") // 12
      expect(JSON.parse(s).display).to.equal(12);
      s = calc.calculateNextState(s, "3") // 123
      expect(JSON.parse(s).display).to.equal(123);
      s = calc.calculateNextState(s, "4") // 1234
      expect(JSON.parse(s).display).to.equal(1234);
      s = calc.calculateNextState(s, "5") // 12345
      expect(JSON.parse(s).display).to.equal(12345);
      s = calc.calculateNextState(s, "*") // 12345
      expect(JSON.parse(s).display).to.equal(12345);
    });
  });

  describe('Single sequence of + operator followed by =', function() {
    it('should perform + operator between two digits', function() {
      let s = null
      s = calc.calculateNextState(s, "1") // 1
      expect(JSON.parse(s).display).to.equal(1);
      s = calc.calculateNextState(s, "2") // 12
      expect(JSON.parse(s).display).to.equal(12);
      s = calc.calculateNextState(s, "+") // 12
      expect(JSON.parse(s).display).to.equal(12);
      s = calc.calculateNextState(s, "4") // 4
      expect(JSON.parse(s).display).to.equal(4);
      s = calc.calculateNextState(s, "3") // 43
      expect(JSON.parse(s).display).to.equal(43);
      s = calc.calculateNextState(s, "=") // 55
      expect(JSON.parse(s).display).to.equal(55);
    });
  });

  describe('Single sequence of - operator followed by =', function() {
    it('should perform - operator between two digits', function() {
      let s = null
      s = calc.calculateNextState(s, "5") // 5
      expect(JSON.parse(s).display).to.equal(5);
      s = calc.calculateNextState(s, "5") // 55
      expect(JSON.parse(s).display).to.equal(55);
      s = calc.calculateNextState(s, "-") // 55
      expect(JSON.parse(s).display).to.equal(55);
      s = calc.calculateNextState(s, "1") // 1
      expect(JSON.parse(s).display).to.equal(1);
      s = calc.calculateNextState(s, "2") // 12
      expect(JSON.parse(s).display).to.equal(12);
      s = calc.calculateNextState(s, "=") // 43
      expect(JSON.parse(s).display).to.equal(43);
    });
  });

  
  describe('Single sequence of * operator followed by =', function() {
    it('should perform * operator between two digits', function() {
      let s = null
      s = calc.calculateNextState(s, "1") // 1
      expect(JSON.parse(s).display).to.equal(1);
      s = calc.calculateNextState(s, "2") // 12
      expect(JSON.parse(s).display).to.equal(12);
      s = calc.calculateNextState(s, "*") // 12
      expect(JSON.parse(s).display).to.equal(12);
      s = calc.calculateNextState(s, "3") // 3
      expect(JSON.parse(s).display).to.equal(3);
      s = calc.calculateNextState(s, "5") // 35
      expect(JSON.parse(s).display).to.equal(35);
      s = calc.calculateNextState(s, "=") // 420
      expect(JSON.parse(s).display).to.equal(420);
    });
  });
  
  describe('Double sequence of + operator followed by = followed by + operator followed by =', function() {
    it('should perform + operator evaluate then + then evaluate', function() {
      let s = null
      s = calc.calculateNextState(s, "1") // 1
      expect(JSON.parse(s).display).to.equal(1);
      s = calc.calculateNextState(s, "2") // 12
      expect(JSON.parse(s).display).to.equal(12);
      s = calc.calculateNextState(s, "+") // 12
      expect(JSON.parse(s).display).to.equal(12);
      s = calc.calculateNextState(s, "4") // 4
      expect(JSON.parse(s).display).to.equal(4);
      s = calc.calculateNextState(s, "3") // 43
      expect(JSON.parse(s).display).to.equal(43);
      s = calc.calculateNextState(s, "=") // 55
      expect(JSON.parse(s).display).to.equal(55);
      s = calc.calculateNextState(s, "+") // 55
      expect(JSON.parse(s).display).to.equal(55);
      s = calc.calculateNextState(s, "1") // 1
      expect(JSON.parse(s).display).to.equal(1);
      s = calc.calculateNextState(s, "0") // 10
      expect(JSON.parse(s).display).to.equal(10);
      s = calc.calculateNextState(s, "=") // 65
      expect(JSON.parse(s).display).to.equal(65);
    });
  });
  
  describe('Double sequence of + operator followed by = followed by - operator followed by =', function() {
    it('should perform + operator evaluate then - then evaluate', function() {
      let s = null
      s = calc.calculateNextState(s, "1") // 1
      expect(JSON.parse(s).display).to.equal(1);
      s = calc.calculateNextState(s, "2") // 12
      expect(JSON.parse(s).display).to.equal(12);
      s = calc.calculateNextState(s, "+") // 12
      expect(JSON.parse(s).display).to.equal(12);
      s = calc.calculateNextState(s, "4") // 4
      expect(JSON.parse(s).display).to.equal(4);
      s = calc.calculateNextState(s, "3") // 43
      expect(JSON.parse(s).display).to.equal(43);
      s = calc.calculateNextState(s, "=") // 55
      expect(JSON.parse(s).display).to.equal(55);
      s = calc.calculateNextState(s, "-") // 55
      expect(JSON.parse(s).display).to.equal(55);
      s = calc.calculateNextState(s, "1") // 1
      expect(JSON.parse(s).display).to.equal(1);
      s = calc.calculateNextState(s, "0") // 10
      expect(JSON.parse(s).display).to.equal(10);
      s = calc.calculateNextState(s, "=") // 45
      expect(JSON.parse(s).display).to.equal(45);
    });
  });

  describe('Double sequence of + operator followed by = followed by * operator followed by =', function() {
    it('should perform + operator evaluate then * then evaluate', function() {
      let s = null
      s = calc.calculateNextState(s, "1") // 1
      expect(JSON.parse(s).display).to.equal(1);
      s = calc.calculateNextState(s, "2") // 12
      expect(JSON.parse(s).display).to.equal(12);
      s = calc.calculateNextState(s, "+") // 12
      expect(JSON.parse(s).display).to.equal(12);
      s = calc.calculateNextState(s, "4") // 4
      expect(JSON.parse(s).display).to.equal(4);
      s = calc.calculateNextState(s, "3") // 43
      expect(JSON.parse(s).display).to.equal(43);
      s = calc.calculateNextState(s, "=") // 55
      expect(JSON.parse(s).display).to.equal(55);
      s = calc.calculateNextState(s, "*") // 55
      expect(JSON.parse(s).display).to.equal(55);
      s = calc.calculateNextState(s, "1") // 1
      expect(JSON.parse(s).display).to.equal(1);
      s = calc.calculateNextState(s, "0") // 10
      expect(JSON.parse(s).display).to.equal(10);
      s = calc.calculateNextState(s, "=") // 550
      expect(JSON.parse(s).display).to.equal(550);
    });
  });

  describe('Double sequence of + operator followed by operator + followed by = ', function() {
    it('should perform + operator evaluate implicitly then + then evaluate', function() {
      let s = null
      s = calc.calculateNextState(s, "1") // 1
      expect(JSON.parse(s).display).to.equal(1);
      s = calc.calculateNextState(s, "2") // 12
      expect(JSON.parse(s).display).to.equal(12);
      s = calc.calculateNextState(s, "+") // 12
      expect(JSON.parse(s).display).to.equal(12);
      s = calc.calculateNextState(s, "4") // 4
      expect(JSON.parse(s).display).to.equal(4);
      s = calc.calculateNextState(s, "3") // 43
      expect(JSON.parse(s).display).to.equal(43);
      s = calc.calculateNextState(s, "+") // 55
      expect(JSON.parse(s).display).to.equal(55);
      s = calc.calculateNextState(s, "1") // 1
      expect(JSON.parse(s).display).to.equal(1);
      s = calc.calculateNextState(s, "0") // 10
      expect(JSON.parse(s).display).to.equal(10);
      s = calc.calculateNextState(s, "=") // 65
      expect(JSON.parse(s).display).to.equal(65);
    });
  });

  describe('Double sequence of + operator followed by operator - followed by = ', function() {
    it('should perform + operator evaluate implicitly then - then evaluate', function() {
      let s = null
      s = calc.calculateNextState(s, "1") // 1
      expect(JSON.parse(s).display).to.equal(1);
      s = calc.calculateNextState(s, "2") // 12
      expect(JSON.parse(s).display).to.equal(12);
      s = calc.calculateNextState(s, "+") // 12
      expect(JSON.parse(s).display).to.equal(12);
      s = calc.calculateNextState(s, "4") // 4
      expect(JSON.parse(s).display).to.equal(4);
      s = calc.calculateNextState(s, "3") // 43
      expect(JSON.parse(s).display).to.equal(43);
      s = calc.calculateNextState(s, "-") // 55
      expect(JSON.parse(s).display).to.equal(55);
      s = calc.calculateNextState(s, "1") // 1
      expect(JSON.parse(s).display).to.equal(1);
      s = calc.calculateNextState(s, "0") // 10
      expect(JSON.parse(s).display).to.equal(10);
      s = calc.calculateNextState(s, "=") // 45
      expect(JSON.parse(s).display).to.equal(45);
    });
  });

  describe('Double sequence of + operator followed by operator - followed by = ', function() {
    it('should perform + operator evaluate implicitly then - then evaluate', function() {
      let s = null
      s = calc.calculateNextState(s, "1") // 1
      expect(JSON.parse(s).display).to.equal(1);
      s = calc.calculateNextState(s, "2") // 12
      expect(JSON.parse(s).display).to.equal(12);
      s = calc.calculateNextState(s, "+") // 12
      expect(JSON.parse(s).display).to.equal(12);
      s = calc.calculateNextState(s, "4") // 4
      expect(JSON.parse(s).display).to.equal(4);
      s = calc.calculateNextState(s, "3") // 43
      expect(JSON.parse(s).display).to.equal(43);
      s = calc.calculateNextState(s, "*") // 55
      expect(JSON.parse(s).display).to.equal(55);
      s = calc.calculateNextState(s, "1") // 1
      expect(JSON.parse(s).display).to.equal(1);
      s = calc.calculateNextState(s, "0") // 10
      expect(JSON.parse(s).display).to.equal(10);
      s = calc.calculateNextState(s, "=") // 550
      expect(JSON.parse(s).display).to.equal(550);
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

// #endregion

// ******************************************************************************************************
//                                            INTEGRATION TESTS
// ******************************************************************************************************

// #region integration-tests

var server = 'http://localhost:3000';

// https://scotch.io/@LazyDog/integration-tests-of-rest-services-using-nodejs-mocha-and-chai

function testAsync(done, fn) {
  try {
      fn();
      done();
  } catch(err) {
      done(err);
  }
}


describe('Test REST api', function() {
  after(function() {
    app.server.close();
  });
  
  describe('POST /calculate Concat',function() {
    it('should get 1', function(done){
  
      request(app.app)
       .post('/calculate')
       .send({ "calculatorState": null, "input": 1 })
       .end((err, res) => {
          try {
            expect(res).to.have.status(200);      
            assert.equal(1, res.body.display);    
          } catch(err) {
            done(err);
          }
                   
        });
                    
    })
  });
});

// #endregion


