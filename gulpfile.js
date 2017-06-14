var gulp = require('gulp'),
imageResize = require('gulp-image-resize'),
rename = require("gulp-rename"),
imagemin = require('gulp-imagemin'),
cleanCSS = require('gulp-clean-css'),
htmlmin = require('gulp-htmlmin'),
uglify = require('gulp-uglify'),
pump = require('pump');


//Changing images for index web page
gulp.task('minify-css', function () {
  	gulp.src('src/css/*.css')
  	.pipe(cleanCSS())
  	.pipe(gulp.dest('dist/css/'));
  });

gulp.task('html-minify', function() {
  	gulp.src('src/*.html')
  	.pipe(htmlmin({collapseWhitespace: true}))
  	.pipe(gulp.dest('dist/'));
  });

// Image Resize
//Changing images for index web page
//Resizing central Image
var notebookSizes = [["small", 400, 200], ["medium", 768, 300], ["large", 992, 300], ["x-large", 1200, 300]];
var notebook = [];
notebookSizes.forEach(function(size) {
	notebookSize = 'resize_' + size[0];
	gulp.task(notebookSize, function() {
		gulp.src('src/img/central_pic.jpg')
		.pipe(imageResize({
			width: size[1],
			height: size[2],
			upscale: false,
			format: "jpg"
		}))
		.pipe(imagemin())
		.pipe(rename({suffix: "-" + size[0]}))
		.pipe(gulp.dest('dist/img/'));
	})
	notebook.push(notebookSize);
});

// Image Resize
 //Changing images for index web page
//Resizing central Image
var logoSizes = [["small", 68, 47], ["large", 95, 61]];
var logo = [];
logoSizes.forEach(function(size) {
	logoSize = 'resize' + size[0];
	gulp.task(logoSize, function() {
		gulp.src('src/img/logo_esq.jpg')
		.pipe(imageResize({
			width: size[1],
			height: size[2],
			upscale: false,
			format: "jpg"
		}))
		.pipe(imagemin())
		.pipe(rename({suffix: "-" + size[0]}))
		.pipe(gulp.dest('dist/img/'));
	})
	logo.push(logoSize);
});

// Image Resize
 //Changing images for foto logo
//Resizing central Image
var fotoLogoSizes = [["small", 125, 120], ["large", 160, 154]];
var fotoLogo = [];
fotoLogoSizes.forEach(function(size) {
	fotoLogoSize = 'resize_' + size[0];
	gulp.task(fotoLogoSize, function() {
		gulp.src('src/img/logo_foto.png')
		.pipe(imageResize({
			width: size[1],
			height: size[2],
			upscale: false,
			format: "png"
		}))
		.pipe(imagemin())
		.pipe(rename({suffix: "-" + size[0]}))
		.pipe(gulp.dest('dist/img/'));
	})
	fotoLogo.push(fotoLogoSize);
});

// Image Resize
 //Changing images for foto logo
//Resizing central Image
var iconSizes = [["small", 100, 100], ["medium", 175,175], ["large", 250, 250]];
var iconLogo = [];
iconSizes.forEach(function(size) {
	iconLogoSize = 'resize_Icon' + size[0];
	gulp.task(iconLogoSize, function() {
		gulp.src('src/img/icon*.jpg')
		.pipe(imageResize({
			width: size[1],
			height: size[2],
			upscale: false,
			format: "jpg"
		}))
		.pipe(imagemin())
		.pipe(rename({suffix: "-" + size[0]}))
		.pipe(gulp.dest('dist/img/'));
	})
	iconLogo.push(iconLogoSize);
});

var mainSizes = [["small", 120, 120], ["medium", 150,150], ["large", 175, 175]];
var mainLogo = [];
mainSizes.forEach(function(size) {
	mainLogoSize = 'resize_Main_' + size[0];
	gulp.task(mainLogoSize, function() {
		gulp.src('src/img/main*.png')
		.pipe(imageResize({
			width: size[1],
			height: size[2],
			upscale: false,
			format: "png"
		}))
		.pipe(rename({suffix: "-" + size[0]}))
		.pipe(gulp.dest('dist/img/'));
	})
	mainLogo.push(mainLogoSize);
});

//Changing images for questions logo
var questionSizes = [["small", 115, 80], ["medium", 172, 120], ["large", 215, 150]];
var questionLogo = [];
questionSizes.forEach(function(size) {
 	questionLogoSize = 'resize_Question_' + size[0];
 	gulp.task(questionLogoSize, function() {
 		gulp.src('src/img/question.png')
 		.pipe(imageResize({
 			width: size[1],
 			height: size[2],
 			upscale: false,
 			format: "png"
 		}))
 		.pipe(imagemin())
 		.pipe(rename({suffix: "-" + size[0]}))
 		.pipe(gulp.dest('dist/img/'));
 	})
 	questionLogo.push(questionLogoSize);
 });

//Changing images for favicon
var favSizes = [["small", 16, 16], ["large", 32, 32]];
var favLogo = [];
 favSizes.forEach(function(size) {
 	favLogoSize = 'resize_fav_' + size[0];
 	gulp.task(favLogoSize, function() {
 		gulp.src('src/img/not_fav.png')
 		.pipe(imageResize({
 			width: size[1],
 			height: size[2],
 			upscale: false,
 			format: "png"
 		}))
 		.pipe(rename({suffix: "-" + size[0]}))
 		.pipe(gulp.dest('dist/'));
 	})
 	favLogo.push(favLogoSize);
 });

gulp.task('js-uglify', function (cb) {
 	pump([
 		gulp.src('src/js/*.js'),
 		uglify(),
 		gulp.dest('dist/js')
 		],
 		cb
 		);
 });

//Defining tasks to watch
gulp.task('watch', function(){
	gulp.watch('src/*.html', ['html-minify']);
	gulp.watch('src/css/*.css', ['minify-css']);
	gulp.watch('src/js/*.js', ['js-uglify']);
});

gulp.task('resize-notebook', notebook);
gulp.task('resize-logo', logo);
gulp.task('resize-foto-logo', fotoLogo);
gulp.task('resize-icon', iconLogo);
gulp.task('resize-main', mainLogo);
gulp.task('resize-question', questionLogo);
gulp.task('resize-favicon', favLogo);


