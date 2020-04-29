// grab our gulp packages
const gulp = require('gulp');
const eslint = require('gulp-eslint');

// define the default task and add the watch task to it
gulp.task('default', ['watch']);

// configure the jshint task
gulp.task('eslint', function() {
  return gulp.src(['**/*.js', '!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

// configure which files to watch and what tasks to use on file changes
gulp.task('watch', function() {
  gulp.watch(['**/*.js', '!node_modules/**'], ['eslint']);
});



