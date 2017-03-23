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

import webpack from 'webpack-stream';
import child from 'child_process';

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

gulp.task('compile-scripts', cb =>
  runSequence(
    'webpack',
    ['scripts'],
    cb)
);

gulp.task('typescript', () => {
  let tsResult = gulp.src('src/scripts/**/*.ts')
    .pipe($.typescript.createProject('tsconfig.json')());

  return tsResult.js.pipe(gulp.dest('src/scripts'));
});

gulp.task('scripts', () => {
  gulp.src([
    './src/scripts/bundle.js'
  ])
    .pipe($.newer('.tmp/scripts'))
    .pipe($.sourcemaps.init())
    .pipe($.babel())
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('.tmp/scripts'))
    .pipe($.concat('main.min.js'))
    // .pipe($.uglify({preserveComments: 'some'}))
    // Output files
    .pipe($.size({title: 'scripts'}))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('dist/scripts'))
    .pipe(gulp.dest('.tmp/scripts'));
});

gulp.task('webpack', () => {
  const webpackProcess = child.spawnSync('C:/Users/joels/Real Documents/Websites/_workshop/WebAudioKeyboard/webpack.bat', [],
    {
      cwd: './',
    }
  );

  const logger = (buffer) => {
    buffer.toString()
      .split(/\n/)
      .forEach((message) => $.util.log('Webpack: ' + message));
  };

  logger(webpackProcess.stdout);
  logger(webpackProcess.stderr);
});

gulp.task('serve', ['default'], () => {
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
    server: ['.tmp', 'src'],
    port: 4001
  });

  gulp.watch(['src/**/*.html'], reload);
  gulp.watch(['src/**/*.{scss,css}'], reload);
  gulp.watch(['src/scripts/**/*.{ts, js}'], ['compile-scripts', reload]);
});

gulp.task('copy', () =>
  gulp.src([
    'app/*',
    '!app/*.html',
    'node_modules/apache-server-configs/dist/.htaccess'
  ], {
    dot: true
  }).pipe(gulp.dest('dist'))
    .pipe($.size({title: 'copy'}))
);

 gulp.task('clean', () => del(['.tmp', 'dist/*', '!dist/.git'], {dot: true}));

gulp.task('default', ['clean'], cb =>
  runSequence(
    'compile-scripts',
    ['copy'],
    cb
  )
);
