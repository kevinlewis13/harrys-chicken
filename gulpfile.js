var gulp = require('gulp');
var sass = require('gulp-sass');
var webpack = require('gulp-webpack');
var jshint = require('gulp-jshint');
var nodemon = require('gulp-nodemon');
var del = require('del');
var jsxhint = require('jshint-jsx').JSXHINT;
var merge = require('merge-stream');

// run client tasks
gulp.task('client', ['lint:client'], function() {
  var styles = gulp.src('./app/stylesheet/application.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('./build/stylesheet/'));

  var copy = gulp.src(['./app/**/*.html'])
      .pipe(gulp.dest('./build/'));

  var build = gulp.src('./app/js/client.jsx')
      .pipe(webpack({
        module: { loaders: [{test: /\.jsx$/, loader: 'jsx-loader'}]},
        output: { filename: 'bundle.js' }
      }))
      .pipe(gulp.dest('./build/'));

  return merge(styles, copy, build);
});

gulp.task('lint:server', function() {
  return gulp.src(['./server/**/*.js', './gulpfile.js'])
    .pipe(jshint({ node: true }))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('lint:client', function() {
  return gulp.src('./app/js/**/*.jsx')
    .pipe(jshint({ node:true, globals: { document: true }, linter: jsxhint }))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

// nodemon server restart
gulp.task('nodemon', function() {
  nodemon({
    script: './server/server.js',
    ignore: ['./app/**/*', './build/**/*']
  })
    .on('restart', function () {
      console.log('nodemon restarting server...');
    });
});

// clean build dir
gulp.task('clean', function(cb) {
  del(['build/'], cb);
});

// watchers
gulp.task('watch', function() {
  gulp.watch('./app/**/*', ['client']);
});

gulp.task('lint', ['lint:server', 'lint:client']);
gulp.task('default', ['client', 'watch']);
