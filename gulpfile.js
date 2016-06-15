const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();

gulp.task('pug', () => {

	return gulp.src('client/pages/*.pug')
		.pipe(plugins.pug({ pretty: true }))
		.pipe(gulp.dest('public'));

});

gulp.task('build', plugins.sequence('pug'));