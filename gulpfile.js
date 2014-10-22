// Include gulp
var gulp = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    prefix = require('gulp-autoprefixer'),
    coffee = require('gulp-coffee'),
    coffeelint = require('gulp-coffeelint'),
    concat = require('gulp-concat'),
    plumber = require('gulp-plumber'),
    changed = require('gulp-changed'),
    uglify = require('gulp-uglify'),
    livereload = require('gulp-livereload'),
    lr = require('tiny-lr'),
    server = lr(),
    notify = require("gulp-notify");

var options = {

    // SASS / CSS
    SASS_SOURCE     : "private/stylesheets/**/*.scss",
    SASS_DEST       : "public/stylesheets/",

    // JavaScript
    COFFEE_SOURCE   : "private/javascripts/**/*.coffee",
    COFFEE_DEST     : "public/javascripts/",

    // Live reload
    LIVE_RELOAD_PORT: 35729
};

// Compile Our Sass
gulp.task('sass', function() {
    gulp.src( options.SASS_SOURCE )
        .pipe(plumber())
        .pipe(sass({
            outputStyle: 'compressed',
            // sourceComments: 'map'
            }))
        .on("error", notify.onError())
        .on("error", function (err) {
            console.log("Error:", err);
        })
        .pipe(prefix(
            "last 2 versions", "> 10%"
            ))
        .pipe(gulp.dest( options.SASS_DEST ))
        .pipe(livereload(server));
});

// Compile Our Coffee
gulp.task('coffee', function () {
  gulp.src( options.COFFEE_SOURCE )
    .pipe(coffee({bare: true})
    .on('error', gutil.log))
    .on("error", notify.onError())
    .pipe(gulp.dest('./public/javascripts/'))
    .pipe(livereload(server));
});


gulp.task('lint', function () {
    gulp.src( options.COFFEE_SOURCE )
        .pipe(coffeelint())
        .pipe(coffeelint.reporter())
});

gulp.task('bowerCopy', function() {
  gulp.src([
    'vendor/yepnope/yepnope.js',
    'vendor/jquery/jquery.min.js'
    // 'vendor/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/tooltip.js',
    // 'vendor/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/popover.js'
    ])
    .pipe(uglify())
    .pipe(gulp.dest( options.COFFEE_DEST + "libs" ))
});

gulp.task('bowerMerge', function() {
  gulp.src([
    'vendor/owlcarousel/owl-carousel/owl.carousel.js',
    'vendor/bootstrap/js/tab.js',
    'vendor/parsleyjs/dist/parsley.min.js'
    ])
    .pipe(concat("plugins.js"))
    .pipe(uglify())
    .pipe(gulp.dest( options.COFFEE_DEST ))
});

gulp.task('default', function () {
  gulp.watch( options.SASS_SOURCE , ['sass']);
  gulp.watch( options.COFFEE_SOURCE , ['coffee'] );
});


gulp.task('watch', function () {
  server.listen( options.LIVE_RELOAD_PORT , function (err) {
    if (err) {
        return console.log(err)
    };

    // Watch .SCSS files
    gulp.watch( options.COFFEE_SOURCE , ['coffee'] );
    gulp.watch( options.SASS_SOURCE , ['sass']);

  });
});