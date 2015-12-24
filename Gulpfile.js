'use strict';

let gulp   = require('gulp')
let watch  = require('gulp-watch')
let coffee = require('gulp-coffee')
let sass   = require('gulp-sass')

gulp.task('development', () => {
  gulp.src('./src/coffee/*.coffee')
    .pipe(watch('./src/coffee/*.coffee'))
    .pipe(coffee({ bare: true }))
    .pipe(gulp.dest('./dist/js'))

  gulp.src('./src/scss/*.scss')
    .pipe(watch('./src/scss/*.scss'))
    .pipe(sass({ outputStyle: 'expanded' }))
    .pipe(gulp.dest('./dist/css'))
})
