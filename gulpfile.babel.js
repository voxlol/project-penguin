import { Instrumenter } from 'isparta';
import istanbul from 'gulp-istanbul';
import coveralls from 'gulp-coveralls';
import plumber from 'gulp-plumber';

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
var istanbulTraceur = require('istanbul-traceur');
var buildpath = {
  www: path.join(__dirname, 'build', 'www'),
  api: path.join(__dirname, 'build', 'api'),
};

gulp.task('jsx-coverage', require('gulp-jsx-coverage').createTask({
    src: ['test/**/*.js'],  // will pass to gulp.src as mocha tests 
    isparta: true,                                  // use istanbul as default 
    istanbul: {                                      // will pass to istanbul or isparta 
        preserveComments: true,                       // required for istanbul 0.4.0+ 
        coverageVariable: '__MY_TEST_COVERAGE__',
        exclude: /node_modules|test[0-9]|build/            // do not instrument these files 
    },
 
    threshold: 80,                                   // fail the task when coverage lower than this 
                                                     // default is no threshold 
    thresholdType: 'functions',                      // one of 'lines', 'statements', 'functions', 'banches' 
                                                     // default is 'lines' 
 
    transpile: {                                     // this is default whitelist/blacklist for transpilers 
        babel: {
            include: /\.jsx?$/,
            exclude: /node_modules/,
            omitExt: false                           // if you wanna omit file ext when require(), put an array 
        }
    },
    coverage: {
        reporters: ['text-summary', 'json', 'lcov'], // list of istanbul reporters 
        directory: 'coverage'                        // will pass to istanbul reporters 
    },
    mocha: {                                         // will pass to mocha 
        reporter: 'spec'
    },
 
    // Recommend moving this to .babelrc 
    babel: {                                         // will pass to babel-core 
        presets: ['es2015', 'react'],                // Use proper presets or plugins for your scripts 
        sourceMap: 'both'                            // get hints in covarage reports or error stack 
    }
  })
);
// Generate Test Coverage Task
gulp.task('coverage', function (done) { 
  gulp.src(['api/**/*.js', 'src/**/*.js'])
    .pipe(istanbul({
      instrumenter: Instrumenter,
      includeUntested: true
    }))
    .pipe(istanbul.hookRequire())
    .on('finish', () => {
      gulp.src(['test/**/*.js'], { read: false })
        .pipe(plumber())
        .pipe(mocha({
          reporter: 'spec'
        }))
        .pipe(istanbul.writeReports())
        .pipe(istanbul.enforceThresholds({ thresholds: { global: 80 } }))
        .on('error', function(err){
          console.log(err);
          process.exit(1);
        })
        .on('end', done);
    });
});

gulp.task('coveralls', ['jsx-coverage'], function(){
  gulp.src('coverage/lcov.info')
    .pipe(coveralls());
});

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
    ignore: [buildpath.api, buildpath.www, 'test'],
    ext: 'js'
  });
});

// Run Tests Task
gulp.task('test', function(){
  return gulp.src([
    'test/**/*.js'
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
