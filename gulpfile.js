const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();

const autoprefixer = require('autoprefixer');

const isProduction = process.env.NODE_ENV === 'production';

gulp.task('sass', () => {

	const sassOptions = isProduction
		? { outputStyle: 'compressed' }
		: { outputStyle: 'nested', errLogToConsole: true, sourceComments : 'normal' };

	const postcssOptions = [autoprefixer({ browsers: ['last 3 versions', '> 5%', 'ie > 8'] })];

	gulp.src('client/vendor/vital/index.sass')
		.pipe(plugins.sass(sassOptions))
		.pipe(plugins.postcss(postcssOptions))
		.pipe(plugins.rename(path => { path.basename = 'common'; }))
		.pipe(gulp.dest('client'));

	return gulp.src('client/pages/*.sass')
		.pipe(plugins.sass(sassOptions))
		.pipe(plugins.postcss(postcssOptions))
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