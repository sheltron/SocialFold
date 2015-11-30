var gulp = require('gulp'),
		rename = require('gulp-rename');
//var autoprefixer = require('gulp-autoprefixer');
//var uglify = require('gulp-uglify');
//var imagemin = require('gulp-imagemin'),
//    cache = require('gulp-cache');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const concat = require('gulp-concat');


gulp.task('browser-sync', function () {
	browserSync.init(
			{
				server: {
					baseDir: './assets/'
				},
				open: false
			}
	);

	//gulp.watch("./assets/sass/*.scss", ['styles']).on('change', browserSync()
	//);
	//
	////gulp.watch("./assets/js/*.js", ['babel']).on('change',
	////   browserSync()
	////);

	gulp.watch("./assets/**/*.*", ['styles', 'babel']).on('change', browserSync());

});


gulp.task('babel', function () {
	gulp.src([
				'./assets/js/socialfold.js',
				'./assets/js/run.js'
			])
			.pipe(sourcemaps.init())
			.pipe(babel(
					{
						presets: 'es2015'
					}
			))
			.on('error', function (e) {
				console.log(e);
			})
			.pipe(concat('main.js'))
			.pipe(sourcemaps.write())
			.pipe(gulp.dest('assets/js/dist/'))
			.pipe(browserSync.reload({stream: true}));
});

gulp.task('styles', function () {
	gulp.src(['assets/sass/**/*.scss'])
			.pipe(sourcemaps.init())
			.pipe(sass())
			.on('error', function (e) {
				console.log(e);
			})
			.pipe(sourcemaps.write())
			//.pipe(autoprefixer('last 2 versions'))
			.pipe(gulp.dest('assets/css/'))
			.pipe(browserSync.reload({stream: true}))
});


//gulp.task('default', ['browser-sync'], function(){
//  gulp.watch("assets/sass/**/*.scss", ['styles']);
//  //gulp.watch("assets/js/**/*.js", ['scripts']);
//  //gulp.watch("*.html", ['bs-reload']);
//});