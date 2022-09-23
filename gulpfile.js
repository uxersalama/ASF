


var gulp = require('gulp'),
    sass = require('gulp-sass')(require('sass')),
    browserSync = require('browser-sync').create(),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    header = require('gulp-header'),
    rename = require('gulp-rename'),
    cssnano = require('gulp-cssnano'),
    cssjanus = require('gulp-cssjanus'),
    package = require('./package.json'),
    fileinclude = require('gulp-file-include'),
    filter = require('gulp-filter'),
    gih = require("gulp-include-html"),
    fs = require('file-system');
var version = '1.0.14'
var conf = {
    path: {
        src: "src",
        dist: "dist"
    }
}

var banner = [
    '/*!\n' +
    ' * <%= package.name %>\n' +
    ' * <%= package.title %>\n' +
    ' * <%= package.url %>\n' +
    ' * @author <%= package.author %>\n' +
    ' * @version <%= package.version %>\n' +
    ' * Copyright ' + new Date().getFullYear() + '. <%= package.license %> licensed.\n' +
    ' */',
    '\n'
].join('');



gulp.task('css', function () {
    return gulp.src('src/assets/scss/*.scss')
        .pipe(sass({
            errLogToConsole: true
        }))
        .pipe(autoprefixer('last 4 version'))
        .pipe(gulp.dest('dist/assets/css'))
        .pipe(cssnano())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(header(banner, {
            package: package
        }))
        .pipe(gulp.dest('dist/assets/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('copyCSS', function () {
    return gulp.src('src/assets/css/**/*.css')
        .pipe(gulp.dest('dist/assets/css'));
});

gulp.task('js', function () {
    return gulp.src('src/assets/js/**/*.js')
        .pipe(gulp.dest('dist/assets/js'));
});

gulp.task('copyCSSFromJS', function () {
    return gulp.src('src/assets/js/**/*.css')
        .pipe(gulp.dest('dist/assets/js'));
});



gulp.task('fileinclude', function () {
    return gulp.src(['src/pages/*.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file',
            indent: false
        }))
        .pipe(gulp.dest('dist/pages/'));
});

gulp.task('copyPlugins', function () {
    return gulp.src(['src/plugins/**/*.*'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('dist/assets/plugins/'));
});

// Images
//gulp.task('images', function () {
//    return gulp.src([
//    		'src/assets/images/**/*'])
//        //.pipe($.cache($.imagemin({
//        //    optimizationLevel: 3,
//        //    progressive: true,
//        //    interlaced: true
//        //})))
//        .pipe(gulp.dest('dist/images'));
//});
gulp.task('images', function () {
    return gulp.src('src/assets/images/*.*')
        .pipe(gulp.dest('dist/assets/images'));
});

gulp.task('fonts', function () {
    return gulp.src('src/assets/fonts/**/*.*')
        .pipe(gulp.dest('dist/assets/fonts'));
});

gulp.task('styles', function () {
    return gulp.src('dist/assets/css/*-ar.css')
        .pipe(autoprefixer(["last 2 versions", "> 1%"])) // Other post-processing. 
        .pipe(gulp.dest('dist/assets/css')) // Output LTR stylesheets. 
        .pipe(cssjanus()) // Convert to RTL. 
        .pipe(rename({ suffix: '-rtl' })) // Append "-rtl" to the filename. 
        .pipe(gulp.dest('dist/assets/css')) // Output RTL stylesheets. 
        .pipe(cssnano())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(header(banner, {
            package: package
        }))
        .pipe(gulp.dest('dist/assets/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('generate-index-file', function (done) {
    var i = 0;
    var html = "<!DOCTYPE html ><html><head><style type='text/css' style='display:block;'>" +
        "body{color:#555;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif}.wrapper{margin:0 auto;max-width:900px;min-width:320px;}h1{color:#333;font-size:36px;font-weight:400;}h2{color:#333;margin:10px 0 5px;}img{border:1px solid #ccc;margin:18px 0;max-width:100%;height:auto;}.logo{border:0 none}ol,p,ul{margin:20px 0 10px;}ol,ul{margin-bottom:20px;}p{line-height:20px}li{margin-bottom:15px; width:100%;}.divider{clear:both;height:10px;border-top:5px solid #5c5c5c;width:100%}a{color:#005631; text-decoration:none;}a:focus,a:hover{color:#4a4a4a;text-decoration:underline;}.header_callout{float:right}.color-bar{width:100%;height:3px;background:#3E7FC1;clear:both;float:left;margin-bottom:40px}</style></head>" +
        "<body><div class='wrapper'><header><div style='height: 80px;display: flex;align-items: center;background: #373737;padding: 10px 10px;border-radius: 10px;'><img src='assets/images/logo.png' style='    height: 100%;border-radius: 6px;' alt='Tacme' class='logo' /></div><div class='header__callout'>" +
        '<ul clas="page-list">';
    fs.recurseSync(conf.path.src + '/pages/', '*.html', function (filepath, relative, filename) {
        i++;
        html += '<li><a target="_blank" href="pages/' + filename + '">' + filename + '</a></li>';
    });
    html += '</ul>';
    fs.writeFileSync(conf.path.dist + '/index.html', html);
    done();
});


// gulp.task('browser-sync', function () {
//     browserSync.init(null, {
//         server: {
//             baseDir: "dist"
//         }, port: 9090
//     });
// });

gulp.task('bs-reload', function () {
    browserSync.reload();
});

// gulp.task('default', gulp.series('fileinclude', 'css', 'js', 'browser-sync', 'copyPlugins', 'fonts', 'images', 'styles', 'generate-index-file'), function () {
//     //gulp.task('default', ['fileinclude', 'css', 'js', 'copyPlugins', 'fonts', 'images'], function () {
//     gulp.watch("src/assets/scss/**/*.scss", ['css']);
//     gulp.watch("src/assets/js/*.js", ['js']);
//     gulp.watch("dist/*.html", ['bs-reload']);
//     gulp.watch("dist/**/*.css", ['bs-reload']);
//     gulp.watch("src/**/*.html", ['fileinclude']);
//     gulp.watch("src/**/*.html", ['fileinclude', 'generate-index-file']);
// });









gulp.task('browser-sync', function () {
    browserSync.init(null, {
        server: {
            baseDir: "dist"
        }, port: 9090
    });
});

// Specific Task
function js() {
    return gulp
        .src('src/assets/js/**/*.js')
        .pipe(gulp.dest('dist/assets/js'))
        .pipe(browserSync.stream());
}
gulp.task(js);

// Specific Task
function gulpSass() {
    return gulp
        .src(['src/assets/scss/*.scss'])
        .pipe(sass())
        .pipe(gulp.dest('assets/css'))
        .pipe(browserSync.stream());
}
gulp.task(gulpSass);

// Run multiple tasks
gulp.task('start', gulp.series(js, gulpSass, 'js', 'css', 'copyCSS', 'copyCSSFromJS', 'generate-index-file', 'fileinclude', 'copyPlugins', 'fonts', 'images', 'styles', 'browser-sync'));