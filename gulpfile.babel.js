//-------------------------------------------------------------------------------
// Imports
//-------------------------------------------------------------------------------

import _ from 'mudash'
import gulp from 'gulp'
import babel from 'gulp-babel'
import eslint from 'gulp-eslint'
import mocha from 'gulp-mocha'
import moltres from 'gulp-moltres'
import sourcemaps from 'gulp-sourcemaps'
import util from 'gulp-util'
import del from 'del'
import babelRegister from 'babel-core/register'
import path from 'path'


//-------------------------------------------------------------------------------
// Gulp Properties
//-------------------------------------------------------------------------------

const sources = {
  babel: [
    'src/**'
  ],
  lint: [
    '**/*.js'
  ],
  moltres: [
    '**/*.json'
  ],
  tests: [
    '**/__tests__/*.js'
  ]
}

const ignores = {
  default: [
    '!.git',
    '!.git/**',
    '!node_modules',
    '!node_modules/**',
    '!dist',
    '!dist/**'
  ],
  babel: [
    '!**/tests/**'
  ],
  moltres: [
    '!.git',
    '!.git/**',
    '!bin',
    '!bin/**',
    '!dist',
    '!dist/**',
    '!scripts',
    '!scripts/**'
  ]
}

function getIgnores(type) {
  return _.compact(_.concat(
    ignores.default,
    _.get(ignores, type)
  ))
}

function getSources(type) {
  return _.compact(_.concat(
    _.get(sources, type),
    getIgnores(type)
  ))
}


//-------------------------------------------------------------------------------
// Gulp Tasks
//-------------------------------------------------------------------------------

gulp.task('default', ['prod'])

gulp.task('prod', ['babel', 'moltres'])

gulp.task('dev', ['build', 'build-watch'])

gulp.task('build', ['babel', 'moltres'])

gulp.task('build-watch', ['babel-watch', 'moltres-watch'])

gulp.task('test', ['lint', 'mocha'])

gulp.task('babel', () => {
  return gulp.src(getSources('babel'))
    .pipe(sourcemaps.init({
      loadMaps: true
    }))
    .pipe(babel({
      presets: ['es2015', 'stage-1', 'stage-2'],
      plugins: ['transform-decorators-legacy']
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist'))
    .on('error', (error) => {
      util.log(error)
    })
})

gulp.task('lint', () => {
  return gulp.src(getSources('lint'))
    .pipe(eslint())
    .pipe(eslint.formatEach())
    .pipe(eslint.failOnError())
    .on('error', (error) => {
      util.log('Stream Exiting With Error', error)
    })
})

gulp.task('mocha', () => {
  return gulp.src(getSources('tests'))
    .pipe(mocha({
      compilers: {
        js: babelRegister
      }
    }))
})

gulp.task('moltres', () => {
  return gulp.src(_.concat(sources.moltres, ignores.moltres), { base: 'src' })
    .pipe(moltres.install({
      ignore: ['node_modules']
    }))
    .pipe(gulp.dest('./dist'))
    .on('error', (error) => {
      util.log(error)
    })
})

gulp.task('clean', () => {
  return del([
    'dist'
  ])
})

gulp.task('cleanse', ['clean'], () => {
  return del([
    'node_modules'
  ])
})


//-------------------------------------------------------------------------------
// Gulp Watchers
//-------------------------------------------------------------------------------

gulp.task('babel-watch', ['babel'], () => {
  const sourceMapsInit = sourcemaps.init({
    loadMaps: true
  })
  const sourceMapsWrite = sourcemaps.write('./')
  const babelPipe = babel({
    presets: ['es2015', 'stage-1', 'stage-2'],
    plugins: ['transform-decorators-legacy']
  })
  const dest = gulp.dest('./dist')
  return gulp.watch(sources.babel, (event) => {
    if (event.type !== 'deleted') {
      gulp.src(_.concat([event.path], getIgnores('babel')), { base: 'src' })
        .pipe(sourceMapsInit, {end: false})
        .pipe(babelPipe, {end: false})
        .pipe(sourceMapsWrite, {end: false})
        .pipe(dest, {end: false})
        .on('error', (error) => {
          util.log(error)
        })
    } else {
      del([path.resolve('dist', event.relative)])
    }
  })
})

gulp.task('lint-watch', ['lint'], function() {
  const lintAndPrint = eslint()
  lintAndPrint.pipe(eslint.formatEach())

  return gulp.watch(sources.lint, (event) => {
    if (event.type !== 'deleted') {
      gulp.src(_.concat([event.path], getIgnores('lint')))
        .pipe(lintAndPrint, {end: false})
        .on('error', (error) => {
          util.log(error)
        })
    }
  })
})

gulp.task('moltres-watch', ['moltres'], function() {
  const moltresInstall = moltres.install({
    ignore: ['node_modules']
  })
  const dest = gulp.dest('./dist')
  return gulp.watch(sources.moltres, (event) => {
    if (event.type !== 'deleted') {
      gulp.src(_.concat([event.path], getIgnores('moltres')))
        .pipe(moltresInstall, {end: false})
        .pipe(dest, {end: false})
        .on('error', (error) => {
          util.log(error)
        })
    }
  })
})
