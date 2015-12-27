require('babel-core/register');

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var babel = require('gulp-babel');
var sourceMaps = require('gulp-sourcemaps');
var mocha = require('gulp-mocha');
var eslint = require('gulp-eslint');
var shell = require('gulp-shell');

// Starts the backend server
gulp.task('start:back', ['build-backend', 'watch-backend']);

// Starts front-end dev server
gulp.task('start:front', shell.task([
  'node devServer.js'
]));

// Transpiles ES6 to ES5 on backend
gulp.task('build-backend', function(){
  return gulp.src([
    'api/**/*.js',
    '!api/build/**/*.js'
  ])
  .pipe(sourceMaps.init())
  .pipe(babel())
  .pipe(sourceMaps.write('.'))
  .pipe(gulp.dest('./api/build'));
});

// Starts Nodemon watch on backend
gulp.task('watch-backend', ['build-backend'], function(){
  nodemon({
    script: 'api/build/server.js',
    tasks: ['build-backend'],
    ignore: ['api/build', 'dist', 'spec'],
    ext: 'js'
  });
});

// Runs mocha tests in /spec folder
gulp.task('test', function(){
  return gulp.src([
    'spec/**/*.js'
  ],{ read: false })
  .pipe(mocha({ report: 'nyan' }));
});

// Runs Lint on project (frontend & backend)
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