const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();

const autoprefixer = require('autoprefixer');

const isProduction = process.env.NODE_ENV === 'production';

gulp.task('sass', () => {

	const sassOptions = isProduction
		? { outputStyle: 'compressed' }
		: { outputStyle: 'nested', errLogToConsole: true, sourceComments : 'normal' };

	const postcssOptions = [autoprefixer({ browsers: ['last 3 versions', '> 5%', 'ie > 8'] })];

	return gulp.src('client/index.sass')
		.pipe(plugins.sass(sassOptions))
		.pipe(plugins.postcss(postcssOptions))
		.pipe(plugins.rename(path => { path.basename = 'styles'; }))
		.pipe(gulp.dest('public'));

});

gulp.task('js', () => {

	return gulp.src('client/pages/*.js')
		.pipe(plugins.browserify())
		.pipe(plugins.babel({ presets: ['es2015'] }))
		.pipe(plugins.if(isProduction, plugins.uglify()))
		.pipe(gulp.dest('public'));

});

gulp.task('pug', () => {

	return gulp.src('client/pages/*.pug')
		.pipe(plugins.pug({ pretty: !isProduction, locals: { isProduction } }))
		.pipe(gulp.dest('public'));

});

gulp.task('build', plugins.sequence('sass', 'js', 'pug'));