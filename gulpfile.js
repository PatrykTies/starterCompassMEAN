var gulp = require('gulp');
//plugins
var jshint = require('gulp-jshint');
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync');
//var changed = require('gulp-changed');
var plumber = require('gulp-plumber');
var imagemin = require('gulp-imagemin');
var rename = require("gulp-rename");                 // rename files
var cssmin = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var prefixer = require('gulp-autoprefixer');
var compass = require('gulp-compass');

var SRC = './public/js/**/*.js';
var DEST = 'dist';

var paths = {
  styles:{
    src: './public/sass/*.scss',
    dest: './public/css/'
  },
  js:{
    src: './public/js/**/*.js',
    dest:'./public/js-dist/'
  }
};

// A display error function, to format and make custom errors more uniform
// Could be combined with gulp-util or npm colors for nicer output
var displayError = function(error) {

    // Initial building up of the error
    var errorString = '[' + error.plugin + ']';
    errorString += ' ' + error.message.replace("\n",''); // Removes new line at the end

    // If the error contains the filename or line number add it to the string
    if(error.fileName)
        errorString += ' in ' + error.fileName;

    if(error.lineNumber)
        errorString += ' on line ' + error.lineNumber;

    // This will output an error like the following:
    // [gulp-sass] error message in file_name on line 1
    console.error(errorString);
};

gulp.task('compass', function() {
  gulp.src(paths.styles.src)
    .pipe(compass({
      css: './public/css',
      sass: './public/sass',
      image: './public/img'
    }))
    .on('error', function(err){
         displayError(err);
    })
    .pipe(prefixer(
           'last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'
    ))   
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browserSync.stream());
});

gulp.task('nodemon', function () {
  nodemon({ script: 'server.js',
          ext: 'html js',
          ignore: ['ignored.js'],
          tasks: ['jshint'] })
    .on('restart', function () {
      console.log('restarted!');
    });
});
 
// Static Server + watching scss/html files
gulp.task('serve', ['compass'], function() {

    browserSync.init({
        server: "./public",
        open:"external"
    });

    gulp.watch("public/scss/**/*.scss", ['compass']);
    gulp.watch("public/views/*.html").on('change', browserSync.reload);
});



gulp.task('jshint', function() {
  gulp.src(paths.js.src)
  .pipe(plumber())
  .pipe(jshint())
  .pipe(jshint.reporter('default'));
});



gulp.task('compress-images', function(){
  return gulp.src('./public/img/*.*')
    .pipe(imagemin({ progressive: true }))
    .pipe(gulp.dest('/public/img-dist/'));

});
/*
gulp.task('changed', function() {
  return gulp.src(SRC)
  .pipe(changed(DEST))
  .pipe(gulp.dest(DEST));
});*/

gulp.task('uglify', function(){
  return gulp.src(paths.js.src)
    .pipe(uglify())
    .pipe(gulp.dest(paths.js.dest));
});

// minify & concatinate all other js
gulp.task('js-concat', function() {
    gulp.src(paths.js.src)                      // get the files
        .pipe(uglify())                                 // uglify the files
        .pipe(concat('scripts.min.js'))                 // concatinate to one file
        .pipe(gulp.dest(target.js_dest))                // where to put the files
        .pipe(notify({message: 'JS processed!'}));      // notify when done
});



gulp.task('default', ['serve','jshint'], function() { 
    // Watch the files in the paths object, and when there is a change, fun the functions in the array
    
    gulp.watch(paths.styles.src, ['compass'])
    // Also when there is a change, display what file was changed, only showing the path after the 'sass folder'
    .on('change', function(evt) {
        console.log(
            '[watcher] File ' + evt.path.replace(/.*(?=sass)/,'') + ' was ' + evt.type + ', compiling...'
        );
    });
});
