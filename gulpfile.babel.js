'use strict';

import path from 'path';
import gulp from 'gulp';
import del from 'del';
import runSequence from 'run-sequence';
import browserSync from 'browser-sync';
import swPrecache from 'sw-precache';
import gulpLoadPlugins from 'gulp-load-plugins';
import {output as pagespeed} from 'psi';
import pkg from './package.json';

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

gulp.task('scripts', () => {
  return gulp.src('docs/**/*.ts')
    .pipe($.typescript({

    }))
});


gulp.task('serve', () => {
  browserSync({
    notify: false,
    // Customize the Browsersync console logging prefix
    logPrefix: 'WSK',
    // Allow scroll syncing across breakpoints
    // scrollElementMapping: ['main', '.mdl-layout'],
    // Run as an https by uncommenting 'https: true'
    // Note: this uses an unsigned certificate which on first access
    //       will present a certificate warning in the browser.
    // https: true,
    // files: [jekyllSiteDir + '/**'],
    server: ['src'],
    port: 4001
  });

  gulp.watch(['docs/**/*.html'], reload);
  gulp.watch(['docs/**/*.{scss,css}'], reload);
  gulp.watch(['docs/**/*.js'], reload);
});
