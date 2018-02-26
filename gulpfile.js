
var gulp = require('gulp'),
    connect = require('gulp-connect'),
    protractor = require("gulp-protractor").protractor;


gulp.task('connect', function () {
    connect.server({
        root: ['./', 'test/', 'node_modules/'],
        port: 8899,
        fallback: './test/testfixture.html'
    });
});

gulp.task('test', ['connect'], function(done) {
    var args = ['--baseUrl', 'http://127.0.0.1:8899'];
    gulp.src(["./spec.js"])
        .pipe(protractor({
            configFile: "protractor.conf.js",
            args: args
        }))
        .on('error', function(e) {     connect.serverClose(); throw e; })
        .on('end', function() {     connect.serverClose(); });

});