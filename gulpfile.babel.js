import gulp from 'gulp';
import plugins from 'gulp-load-plugins';
const $ = plugins();
const tapColorize = require('tap-colorize')

const options = {
  src: ['src/*.js'],
  test: ['test/*.js'],
  dist: 'dist',
  config: {
    "presets": ["es2015", "stage-0"]
  }
}

gulp.task('compile', () =>
  gulp.src(options.src)
    .pipe($.babel(options.config).on('error', console.error.bind(console)))
    .pipe(gulp.dest(options.dist)))

gulp.task('test', ['compile'], () =>
  gulp.src(options.test)
    .pipe($.tape({
      reporter: tapColorize()
    })))

gulp.task('default', ['compile']);
