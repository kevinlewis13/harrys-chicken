var gulp = require('gulp');
var sass = require('gulp-sass');
var webpack = require('gulp-webpack');
var jshint = require('gulp-jshint');
var nodemon = require('gulp-nodemon');
var del = require('del');
var jsxhint = require('jshint-jsx').JSXHINT;
var merge = require('merge-stream');
var plumber = require('gulp-plumber');
var mocha = require('gulp-mocha');
var react = require('gulp-react');
var replace = require('gulp-replace');

// run client tasks
gulp.task('client', ['lint:client'], function() {
  var styles = gulp.src('./app/stylesheet/application.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./build/stylesheet/'));

  var copy = gulp.src(['./app/**/*.html'])
    .pipe(gulp.dest('./build/'));

  var fonts = gulp.src(['./app/stylesheet/fonts/*'])
      .pipe(gulp.dest('./build/fonts/'));

  var build = gulp.src('./app/js/client.jsx')
      .pipe(webpack({
        module: { loaders: [{test: /\.jsx$/, loader: 'jsx-loader'}]},
        output: { filename: 'bundle.js' }
      }))
      .pipe(gulp.dest('./build/'));

  return merge(styles, copy, fonts, build);
});

gulp.task('lint:server', function() {
  return gulp.src(['./server/**/*.js', './tests/server/*test.js'])
    .pipe(plumber())
    .pipe(jshint({
      node: true,
      globals: {
        describe: true,
        it: true,
        before: true,
        beforeEach: true,
        after: true,
        afterEach: true
      }
    }))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('lint:client', function() {
  return gulp.src(['./app/js/**/*.jsx', './tests/client/*test.js'])
    .pipe(plumber())
    .pipe(jshint({
      node:true,
      globals: {
        document: true,
        google: true,
        describe: true,
        it: true,
        before: true,
        beforeEach: true,
        after: true,
        afterEach: true
      },
      linter: jsxhint
    }))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

// nodemon server restart
gulp.task('nodemon', function() {
  return nodemon({
    script: './server/server.js',
    ignore: ['./app/**/*', './build/**/*']
  })
    .on('restart', function () {
      console.log('nodemon restarting server...');
    });
});

gulp.task('test:server', ['lint:server'], function() {
  return gulp.src('./tests/server/*test.js')
    .pipe(mocha())
    .once('error', function(err) {
      console.log(err);
      process.exit();
    })
    .once('end', function() {
      process.exit();
    });
});

gulp.task('compile:tests', ['lint:client'], function() {
  return gulp.src('./app/**/*.jsx')
    .pipe(react())
    .pipe(replace('.jsx', '.js'))
    .pipe(gulp.dest('./tests/client/test_build/'));
});

gulp.task('test:client', ['compile:tests'], function() {
  return gulp.src('./tests/client/*test.js')
    .pipe(mocha())
    .once('error', function(err) {
      console.log(err);
      process.exit(1);
    })
    .once('end', function() {
      process.exit();
    });
});

// clean build dir
gulp.task('clean', function(cb) {
  return del(['./build/', './tests/client/build/'], cb);
});

// watchers
gulp.task('watch', function() {
  gulp.watch('app/**/*', ['client']);
  gulp.watch('server/**/*', ['lint:server']);
  gulp.watch('./app/**/*.jsx', ['lint:client']);
});

gulp.task('lint', ['lint:server', 'lint:client']);
gulp.task('test', ['test:client']);
gulp.task('default', ['client', 'watch']);
