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
    root: 'dist'
    livereload: true

gulp.task 'images', ->
  gulp.src 'src/images/*'
    .pipe gulp.dest './dist/images/'

gulp.task 'html', ->
  gulp.src 'src/jade/index.jade'
    .pipe jade()
    .pipe gulp.dest 'dist/'

gulp.task 'css', ->
  gulp.src 'src/stylesheets/*.css'
    .pipe csso()
    .pipe rename 'style.min.css'
    .pipe gulp.dest 'dist/'

gulp.task 'css-bootstrap', ->
  gulp.src 'bower_components/bootstrap/dist/css/bootstrap.min.css'
    .pipe gulp.dest 'dist/bower_components'

gulp.task 'icons', ->
  gulp.src 'bower_components/fontawesome/fonts/**.*'
    .pipe gulp.dest './dist/fonts'
  gulp.src 'bower_components/fontawesome/css/font-awesome.min.css'
    .pipe gulp.dest './dist/bower_components'

gulp.task 'bower-files', ->
  gulp.src bowerFiles()
    .pipe uglify( preserveComments: 'all' )
    .pipe gulp.dest './dist/scripts/lib/'

gulp.task 'js', ->
  gulp.src ['src/javascripts/*.js', 'src/javascripts/**/*.js']
    .pipe uglify()
    .pipe gulp.dest('dist/scripts/')

gulp.task 'clean', ->
  del(['dist/*'])

gulp.task 'default', ['html','css', 'css-bootstrap', 'images', 'icons', 'js', 'bower-files']

# gulp.task 'vendor', ->
#   gulp.src bowerFiles()
#     .pipe concat('vendor.js')
#     .pipe uglify()
#     .pipe gulp.dest './dist'

# gulp.task 'js', ->
#   browserify
#     entries: ['./src/scripts/app.coffee']
#     extensions: ['.coffee']
#   .transform 'coffeeify'
#   .bundle()
#   .pipe source 'bundle.js'
#   .pipe streamify(uglify())
#   .pipe gulp.dest('dist/')
# 
# gulp.task 'watch', ->
#   gulp.watch('src/styles/*.less', ['css'])
#   gulp.watch('src/scripts/*.coffee', ['js'])
#   gulp.watch('src/scripts/**/*.coffee', ['js'])
# 
# gulp.task 'default', ['html', 'css', 'js', 'vendor']
