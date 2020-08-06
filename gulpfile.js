const path = require('path');
const { src, pipe, dest, watch } = require('gulp');
const rename = require('gulp-rename')
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const gulpIf = require('gulp-if');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');

// 编译压缩scss
function scss (cb) {
  src('src/scss/iu-toast.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(cssnano())
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest('./dist'));
  cb();
}

// 实时监听编译scss
function watchScss (cb) {
  watch('src/*.scss', scss)
  cb();
}

// 打包兼容js
function scripts (cb) {
  const webpackConfigPath = path.join(process.cwd(), 'webpack.config.js');
  const webpackConfig = require(webpackConfigPath);

  src('src/js/*.js')
    .pipe(gulpIf(webpackConfig, webpackStream(webpackConfig, webpack)))
    .pipe(dest('./dist'));
  cb();
}

module.exports = {
  scss: scss,
  scripts: scripts,
  watchScss: watchScss
}
