var fs = require('fs');
var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var handlebars = require('gulp-compile-handlebars'),
    layouts = require('handlebars-layouts');

layouts.register(handlebars.Handlebars);

// Static server
gulp.task('bs', function() {
    browserSync.init({
        server: {
            baseDir: ['./dist', './src', './mock', '../pub'],
            port: 3030
        }
    });
    browserSync.watch(['./dist/**/*.html', './mock/**', './src/script/**', './src/static/**']).on('change', browserSync.reload);
});

/**
 * 配置代理
 */
gulp.task('bs-proxy', function () {
    browserSync.init({
        proxy: "http://127.0.0.1:8899", // 测试环境
        // proxy: "localhost:3000",
        serveStatic: ['./dist', './src', '../pub'],
        port: 3030,
        open: "external"
    });

    gulp.watch(['./dist/**/*.html', './src/script/**', './src/static/**']).on('change', browserSync.reload);
});

gulp.task('build', function () {
    gulp.src('src/views/pages/**/*.html')
        .pipe(handlebars(
            {
                app: {
                    assetsStatic: '/static',
                    assetsAliFonts: '/static/ali-fonts',
                    assetsCss: '/static/css',
                    assetsJs: '/static/js',
                    assetsImg: '/static/images',
                    assetsLib: '/static/lib'
                }
            },
            {
                ignorePartials: true,
                batch: ['./src/views/partials'],
                helpers: {
                    raw: function (options) { return options.fn(); }
                }
            }))
        .pipe(gulp.dest('dist'));
});
gulp.task('moveStaticToDist', function () {
    gulp.src('src/static/**/*')
        .pipe(gulp.dest('dist/static'))
});
gulp.task('buildDeploy', ['build', 'moveStaticToDist']);
gulp.task('clearDist', function () {

});