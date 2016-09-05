module.exports = function (config) {
    config.set({

        files: [
            './tests.bundle.js'
        ],

        plugins: [
            'karma-osx-reporter'
        ],

        reporters: [ 'dots', 'osx' ],

        singleRun: false
  });
};