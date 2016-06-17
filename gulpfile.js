const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();

gulp.task('js', () => {

	return gulp.src('client/pages/*.js')
		.pipe(plugins.babel({ presets: ['es2015'] }))
		.pipe(plugins.browserify())
		.pipe(gulp.dest('public'));

});

gulp.task('pug', () => {

	return gulp.src('client/pages/*.pug')
		.pipe(plugins.pug({ pretty: true }))
		.pipe(gulp.dest('public'));

});

gulp.task('build', plugins.sequence('js', 'pug'));