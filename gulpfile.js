var gulp = require('gulp');
var sass = require('gulp-sass');
var webpack = require('gulp-webpack');
var jshint = require('gulp-jshint');
var nodemon = require('gulp-nodemon');
//var copy = require('gulp-copy'); not needed apparently?

//other tasks to consider:
// minifier/uglifier
// clean build directory task

gulp.task('default', ['watch']);

// scss to css conversion
gulp.task('sass', function() {
  gulp.src('./app/stylesheet/application.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./build/stylesheet'))
});

//file copier
gulp.task('copy:html', function() {
  var html = ['./app/**/*.html'];
  return gulp.src(html).pipe(gulp.dest('./build/views/'));
});

//nodemon server restart
gulp.task('nodemon', function() {
  nodemon({
    script: './server/server.js',
  })
  .on('restart', function () {
    console.log('nodemon restarting server...')
  });
});

// webpack build, probably want to break these out to seperate tasks.
gulp.task('webpack', function() {
  return gulp.src('./app/js/client.jsx')
    .pipe(webpack({
      //watch: true,
      entry: {
        test: './server/tests/test.js',
        app: './app/js/client.jsx',
      },
      module: {
        loaders: [
          {
            test: /\.jsx$/,
            loader: 'jsx-loader'
          },
        ],
      },
      output: {
        filename: '[name].js',
      },
    }))
    .pipe(gulp.dest('./build/'))
});

// watchers
gulp.task('sass:watch', function() {
  gulp.watch('./app/stylesheet/**/*.scss', ['sass']);
});

gulp.task('html:watch', function() {
  gulp.watch('./app/**/*.html', ['copy:html']);
});

gulp.task('server:watch', function() {
  gulp.watch('./server/**/*.js', ['nodemon']);
});

gulp.task('app:watch', function() {
  gulp.watch('./app/**/*.jsx', ['webpack']);
});

gulp.task('watch', ['html:watch', 'sass:watch', 'server:watch', 'app:watch']);

// linter
gulp.task('linter:jsx', function() {
  return gulp.src('./app/js/**/*.jsx')
    .pipe(jshint({
      node: true,
      linter: require('jshint-jsx').JSXHINT
    }))
    .pipe(jshint.reporter('default'));
});
