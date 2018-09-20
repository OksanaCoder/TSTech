'use strict';

const gulp = require('gulp'),
	sass = require('gulp-sass'),
	htmlmin = require('gulp-htmlmin'),
	cssmin = require('gulp-clean-css'),
	uglify = require('gulp-uglify'),
    image = require('gulp-image'),
	browserSync = require("browser-sync"),
	reload = browserSync.reload;



var path = {
	build: {
		html: 'build/',
		js: 'build/js/',
		css: 'build/style/',
		img: 'build/images/',

	},
	src: {
		html: 'src/index.html',
		js: 'src/js/*.js',
		style: 'src/style/main.scss',
		img: 'src/images/**/*.*',
	},
	watch: {
		html: 'src/**/*.html',
		js: 'src/js/**/*.js',
		style: 'src/style/**/*.scss',
		css: 'src/style/**/*.css',
		img: 'src/images/*.*',
	}

};


gulp.task('scripts', function () {
	gulp.src(path.src.js)
		.pipe(uglify())
		.pipe(gulp.dest(path.build.js));
});



gulp.task('styles', function () {
	  gulp.src(path.src.style)
        .pipe(sass())
        .pipe(cssmin())
        .pipe(gulp.dest(path.build.css));
});

gulp.task('minify', () => {
  return gulp.src('src/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('build'));
});

gulp.task('image', function () {
  gulp.src(path.src.img)
    .pipe(image({
      pngquant: true,
      optipng: false,
      zopflipng: true,
      jpegRecompress: false,
      mozjpeg: true,
      guetzli: false,
      gifsicle: true,
      svgo: true,
      concurrent: 10,
      quiet: true // defaults to false
    }))
    .pipe(gulp.dest(path.build.img));
});

 gulp.task('browser-sync', function () { 
	browserSync({ 
		server: { 
			baseDir: 'build'
		},
		notify: false 
	});
}); 



gulp.task('build', ['scripts', 'styles', 'minify', 'image', 'browser-sync']);

gulp.task('watch', function () {
	gulp.watch(path.watch.style, ['styles']);
	gulp.watch(path.watch.css, ['styles']);
	gulp.watch(path.watch.js, ['scripts']);
	gulp.watch(path.watch.img, ['image']);
	gulp.watch(path.watch.html, browserSync.reload);
	gulp.watch(path.watch.style, browserSync.reload);
	gulp.watch(path.watch.js, browserSync.reload);
});

gulp.task('default', ['build', 'watch']);
