require('babel-core/register');

var babel = require('gulp-babel');
var del = require('del');
var eslint = require('gulp-eslint');
var gulp = require('gulp');
var mocha = require('gulp-mocha');
var nodemon = require('gulp-nodemon');
var sourceMaps = require('gulp-sourcemaps');
var shell = require('gulp-shell');
var webpack = require('webpack');

// Start Backend Task
gulp.task('start:backend', ['build:backend', 'watch-backend']);

// Clean Backend Task
gulp.task('clean:backend', function(){
  return del([
    'api/build/**/*'
  ]);
});

// Build Backend Task
gulp.task('build:backend', ['clean:backend'], function(){
  return gulp.src([
    'api/**/*.js',
    '!api/build/**/*.js'
  ])
  .pipe(sourceMaps.init())
  .pipe(babel())
  .pipe(sourceMaps.write('.'))
  .pipe(gulp.dest('./api/build'));
});

// Run & Watch Backend Task
gulp.task('watch-backend', ['build:backend'], function(){
  nodemon({
    script: 'api/build/server.js',
    tasks: ['build:backend'],
    ignore: ['api/build', 'dist', 'spec'],
    ext: 'js'
  });
});

// Start Frontend Task
gulp.task('start:frontend', shell.task([
  'node devServer.js'
]));

// Build Frontend Task
gulp.task('build:frontend', function(done){
  var webpackConfig = require('./webpack.config.' + (process.env.NODE_ENV === 'production' ? 'prod' : 'dev' ));
  webpack(webpackConfig, function(err, stats){
    if(err) {
      console.log('Error', err);
    } else {
      console.log(stats.toString());
    }
    done();
  });
});


// Run Tests Task
gulp.task('test', function(){
  return gulp.src([
    'spec/**/*.js'
  ],{ read: false })
  .pipe(mocha({ report: 'nyan' }));
});

// Lint entire project Task
gulp.task('vet', function(d){
  return gulp.src([
    '**/*.js',
    '!node_modules/**',
    '!api/build/**',
    '!dist/**'
    ])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});
