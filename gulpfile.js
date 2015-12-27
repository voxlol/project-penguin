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
var path = require('path');

var buildpath = {
  www: path.join(__dirname, 'build', 'www'),
  api: path.join(__dirname, 'build', 'api'),
};

// Start Backend Task
gulp.task('start:api', ['build:api', 'watch:api']);

// Start Frontend Task
gulp.task('start:www', shell.task([
  'node devServer.js'
]));

// Clean api Task
gulp.task('clean:api', function(){
  return del([
    buildpath.api + '/**/*'
  ]);
});

// Clean Frontend Task
gulp.task('clean:www', function(){
  return del([
    buildpath.api + '/**/*'
  ]);
});

// Build api Task
gulp.task('build:api', ['clean:api'], function(){
  return gulp.src([
    'api/**/*.js',
    '!' + buildpath.api + '/**/*.js'
  ])
  .pipe(sourceMaps.init())
  .pipe(babel())
  .pipe(sourceMaps.write('.'))
  .pipe(gulp.dest(buildpath.api));
});

// Build Frontend Task
gulp.task('build:www', ['clean:www'], function(done){
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

// Run & Watch Backend Task
gulp.task('watch:api', ['build:api'], function(){
  nodemon({
    script: buildpath.api + '/server.js',
    tasks: ['build:api'],
    ignore: [buildpath.api, buildpath.www, 'spec'],
    ext: 'js'
  });
});

// Run Tests Task
gulp.task('test', function(){
  return gulp.src([
    'spec/**/*.js'
  ],{ read: false })
  .pipe(mocha({ report: 'nyan' }))
  .once('end', () => {
    process.exit();
  });
});

// Lint entire project Task
gulp.task('vet', function(d){
  return gulp.src([
    '**/*.js',
    '!node_modules/**',
    '!' + buildpath.api + '/**',
    '!' + buildpath.www + '/**',
    ])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});
