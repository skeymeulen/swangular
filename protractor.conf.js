var config = {

    specs: ['test/spec.js']
};

if (process.env.TRAVIS) {
    config.sauceUser = process.env.SAUCE_USERNAME;
    config.sauceKey = process.env.SAUCE_ACCESS_KEY;
    config.capabilities = {
        'browserName': 'chrome',
        'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
        'build': process.env.TRAVIS_BUILD_NUMBER
    };
} else {
    //command to execute locally: webdriver-manager start (https://www.npmjs.com/package/webdriver-manager)
    config.seleniumAddress = 'http://localhost:4444/wd/hub';
}

module.exports.config = config;