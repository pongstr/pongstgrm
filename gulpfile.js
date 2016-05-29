'use strict';

const gulp    = require('gulp')
const util    = require('gulp-util')
const clean   = require('del')
const path    = require('path')
const babel   = require('gulp-babel')
const webpack = require('webpack-stream')
const rollup  = require('gulp-rollup')
const sourcemaps = require('gulp-sourcemaps')

gulp.task('default', function () {
  gulp.src('./src/scripts/pongstgrm.js')
    .pipe(webpack(require('./webpack.config')))
    .pipe(gulp.dest('./dist/js'))
})


gulp.task('watch', ['default'], function () {
  gulp.watch('./src/**/*.{js,scss}', ['default'])
})
