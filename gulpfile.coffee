gulp        = require 'gulp'
jade        = require 'gulp-jade'
csso        = require 'gulp-csso'
uglify      = require 'gulp-uglify'
del         = require 'del'
bowerFiles  = require 'main-bower-files'
rename      = require 'gulp-rename'
connect     = require 'gulp-connect'
concat      = require 'gulp-concat'

gulp.task 'server', ->
  connect.server
    root: 'public'
    livereload: true

gulp.task 'images', ->
  gulp.src 'src/images/*'
    .pipe gulp.dest './public/images/'

gulp.task 'html', ->
  gulp.src 'src/jade/index.jade'
    .pipe jade()
    .pipe gulp.dest 'public/'

gulp.task 'css', ->
  gulp.src 'src/stylesheets/*.css'
    .pipe csso()
    .pipe rename 'style.min.css'
    .pipe gulp.dest 'public/'

gulp.task 'bootstrap', ->
  gulp.src 'bower_components/bootstrap/dist/css/bootstrap.min.css'
    .pipe gulp.dest 'public/bower_components'
  gulp.src 'bower_components/bootstrap/dist/js/bootstrap.min.js'
    .pipe gulp.dest 'public/scripts/lib'

gulp.task 'icons', ->
  gulp.src 'bower_components/fontawesome/fonts/**.*'
    .pipe gulp.dest './public/fonts'
  gulp.src 'bower_components/fontawesome/css/font-awesome.min.css'
    .pipe gulp.dest './public/bower_components'

gulp.task 'bower-files', ->
  gulp.src bowerFiles()
    .pipe uglify( preserveComments: 'all' )
    .pipe gulp.dest './public/scripts/lib/'

gulp.task 'js', ->
  gulp.src ['src/javascripts/*.js', 'src/javascripts/**/*.js']
    .pipe uglify()
    .pipe gulp.dest('public/scripts/')

gulp.task 'watch', ->
  gulp.watch('src/jade/*.jade', ['html'])
  gulp.watch('src/javascripts/*.js', ['js'])
  gulp.watch('src/javascripts/**/*.js', ['js'])
  gulp.watch('src/stylesheets/*.css', ['css'])

gulp.task 'clean', ->
  del(['public/*'])

gulp.task 'default', ['html','css', 'bootstrap', 'images', 'icons', 'js', 'bower-files']
