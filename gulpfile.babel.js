import gulp from 'gulp';
import { Instrumenter } from 'isparta';
import mocha from 'gulp-mocha';
import istanbul from 'gulp-istanbul';
import plumber from 'gulp-plumber';

gulp.task('gg', function (done) {
  return gulp.src(['test/**/*.js'])
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
        // Enforce a coverage of at least 90%
        .pipe(istanbul.enforceThresholds({ thresholds: { global: 90 } }));
    });
});