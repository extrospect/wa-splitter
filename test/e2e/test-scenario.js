var util = require('util');
var webdriver = require('selenium-webdriver');
var protractor = require('../lib/protractor.js');
require('../jasminewd');

describe('el goog', function() {

    var driver,
        ptor;

    beforeEach(function() {
        driver = new webdriver.Builder().
            usingServer('http://localhost:7777/wd/hub').
            withCapabilities(webdriver.Capabilities.chrome()).build();

        driver.manage().timeouts().setScriptTimeout(10000);
        ptor = protractor.wrapDriver(driver);
    });


    it('should google stuff', function() {
        ptor.get('http://www.google.com');

        var qEl = ptor.findElement(protractor.By.name("q"));
        qEl.sendKeys("HAL9000");

        expect(qEl.getText()).toEqual('Hello Julie!');
    }, 10000);
});