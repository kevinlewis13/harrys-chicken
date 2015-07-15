
// alternate version, broke up into multiple tasks, essentially to get 2 destinations.

// gulp.task('webpack', ['clean', 'linter:all'], function() {
//   return gulp.src('./app/js/client.jsx')
//     .pipe(webpack({
//       //watch: true,
//       entry: {
//         test: './server/tests/test.js',
//         app: './app/js/client.jsx',
//       },
//       module: {
//         loaders: [
//           {
//             test: /\.jsx$/,
//             loader: 'jsx-loader'
//           },
//         ],
//       },
//       output: {
//         filename: '[name].js',
//       },
//     }))
//     .pipe(gulp.dest('./build/'))
// });

var gulp = require('gulp');
var sass = require('gulp-sass');
var webpack = require('gulp-webpack');
var jshint = require('gulp-jshint');
var nodemon = require('gulp-nodemon');
var del = require('del');

//other tasks to consider:
// minifier/uglifier
// auto-prefixer
//gulp.task('linter:html');
//gulp.task('linter:css');
// var serverFiles = ['./server/**/*.js'];
// var htmlFiles = [];
// var clientFiles = [];

gulp.task('default', ['webpack:client', 'copy:html', 'sass', 'watch']);

// clean build directory task
gulp.task('clean', function (cb) {
  del(['build/', 'app/tests/karma_tests/build/'], cb);
});

// webpack build, probably want to break these out to seperate tasks.
gulp.task('webpack:client', ['linter:all'], function() {
  return gulp.src('./app/js/client.jsx')
    .pipe(webpack({
      //watch: true,
      module: {
        loaders: [
          {
            test: /\.jsx$/,
            loader: 'jsx-loader'
          },
        ],
      },
      output: {
        filename: 'bundle.js',
      },
    }))
    .pipe(gulp.dest('./build/'));
});

gulp.task('webpack:karma_tests', ['linter:all'], function() {
  return gulp.src('./app/tests/karma_tests/test_entry.js')
    .pipe(webpack({
      //watch: true,
      output: {
        filename: 'karma_test_bundle.js',
      },
    }))
    .pipe(gulp.dest('.app/tests/karma_tests/build/'));
});

//file copier
gulp.task('copy:html', function() {
  var html = ['./app/**/*.html'];
  return gulp.src(html).pipe(gulp.dest('./build/'));
});

// scss to css conversion
gulp.task('sass', function() {
  gulp.src('./app/stylesheet/application.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./build/stylesheet/'));
});

//nodemon server restart
gulp.task('nodemon', ['linter:server_js'], function() {
  nodemon({
    script: './server/server.js',
    ext: 'js',
    ignore: ['./app/**/*.js', './build/**/*.js']
    //tasks: ['linter:server_js'] this is only available with node 0.12
  })
  .on('restart', function () {
    console.log('nodemon restarting server...');
  });
});

// watchers
gulp.task('sass:watch', function() {
  gulp.watch('./app/stylesheet/**/*.scss', ['sass']);
});

gulp.task('html:watch', function() {
  gulp.watch('./app/**/*.html', ['copy:html']);
});

// gulp.task('server:watch', function() {
//   gulp.watch('./server/**/*.js', ['nodemon']);
// });

gulp.task('app:watch', function() {
  gulp.watch('./app/**/*.jsx', ['webpack:client']);
});

gulp.task('watch', ['html:watch', 'sass:watch', 'app:watch']);

// linters
gulp.task('linter:client_jsx', function() {
  var options = {
    node:true, globals: {document: true}, linter: require('jshint-jsx').JSXHINT
  };
  return gulp.src('./app/js/**/*.jsx')
    .pipe(jshint(options))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('linter:server_js', function() {
  var options = {node: true};
  return gulp.src(['./server/**/*.js', './gulpfile.js'])
    .pipe(jshint(options))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('linter:server_tests');
  var mochaOptions = {
    globals: {
      describe: true,
      it: true,
      before: true,
      beforeEach: true,
      after: true,
      afterEach: true
    }
  };

gulp.task('linter:client_tests');
  var jasmineOptions = {
    globals: {
      angular: true,
      describe: true,
      it: true,
      before: true,
      beforeEach: true,
      after: true,
      afterEach: true,
      expect: true
    }
  };

gulp.task('linter:all', ['linter:client_jsx', 'linter:server_js']);
