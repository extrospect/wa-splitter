var util = require('util');

describe('wangular', function() {

    var driver,
        ptor;

    beforeEach(function() {
        ptor = protractor.getInstance();
        ptor.get('http://angularjs.org/');
    });

    it('should be searchyable', function() {
        var qEl = ptor.findElement(protractor.By.name("as_q"));
        ptor.debugger();
        qEl.sendKeys('some stuff')
        expect(qEl.getText()).toEqual('some stuff');
    }, 10000);
});