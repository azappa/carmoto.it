const gulp = require('gulp');
const del = require('del');
const plumber = require('gulp-plumber');
const connect = require('gulp-connect');
const pug = require('gulp-pug');
const pugInheritance = require('gulp-pug-inheritance');
const stylus = require('gulp-stylus');
const nib = require('nib');
const rupture = require('rupture');
const uglify = require('gulp-uglify');
const changed = require('gulp-changed');
const filter = require('gulp-filter');
const deploy = require('gulp-gh-pages');


gulp.task('clean', (cb) => {
  del.sync(['./dist/'], cb());
});


gulp.task('serve', () => (
  connect.server({
    root: './dist',
    livereload: true,
    host: '0.0.0.0',
    port: 1337,
  })
));


gulp.task('layout', () => (
  gulp
    .src([
      './src/*.pug',
    ])
    .pipe(changed('./dist', { extension: '.html' }))
    .pipe(plumber())
    .pipe(pugInheritance({ basedir: 'src', skip: 'node_modules' }))
    .pipe(filter(file => (!/\/_/.test(file.path) && !/^_/.test(file.relative))))
    .pipe(pug())
    .pipe(gulp.dest('./dist'))
    .pipe(connect.reload())
));


gulp.task('style', () => (
  gulp
    .src([
      './src/assets/css/*.styl',
    ])
    .pipe(changed('./dist/assets/css', { extension: '.css' }))
    .pipe(plumber())
    .pipe(
      stylus({
        compress: true,
        use: [
          nib(),
          rupture(),
        ],
      })
    )
    .pipe(gulp.dest('./dist/assets/css'))
    .pipe(connect.reload())
));


gulp.task('javaspritz', () => (
  gulp
    .src([
      './src/assets/js/*.js',
    ])
    .pipe(changed('./dist/assets/js', { extension: '.js' }))
    .pipe(plumber())
    .pipe(uglify())
    .pipe(gulp.dest('./dist/assets/js'))
));


gulp.task('imgs', () => (
  gulp
    .src(['./src/assets/img/**/*'])
    .pipe(plumber())
    .pipe(gulp.dest('./dist/assets/img'))
));


gulp.task('cname', () => (
  gulp
    .src(['./CNAME'])
    .pipe(gulp.dest('./dist'))
));


gulp.task('watch', () => {
  gulp.watch('./src/*.pug', gulp.series(['layout']));
  gulp.watch('./src/assets/css/*.styl', gulp.series(['style']));
  gulp.watch('./src/assets/js/*.js', gulp.series(['javaspritz']));
  gulp.watch('./src/assets/img/**/*', gulp.series(['imgs']));
  gulp.watch('./CNAME', gulp.series(['cname']));
});


gulp.task('deploy', () => (
  gulp
    .src('./dist/**/*')
    .pipe(
      deploy()
    )
));


gulp.task('default', gulp.series(['clean', 'layout', 'style', 'javaspritz', 'imgs', 'cname', 'watch', 'serve']));
gulp.task('build', gulp.series(['clean', 'layout', 'style', 'javaspritz', 'imgs', 'cname']));
gulp.task('gh', gulp.series(['deploy']));
