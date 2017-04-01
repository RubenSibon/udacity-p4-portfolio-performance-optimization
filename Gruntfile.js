module.exports = function(grunt) {

  var mozjpeg = require('imagemin-mozjpeg');

  grunt.initConfig({

    // Compress images
    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'src/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'dist/'
        }]
      }
    },

    // Minify JavaScript files
    uglify: {
      my_target: {
        files: {
          'dest/output.min.js': ['src/input1.js', 'src/input2.js']
        }
      }
    },

    connect: {
      options: {
        port: process.env.PORT || 3131,
        base: 'dist/',
      },

      all: {},
    },

    watch: {
      options: {
        livereload: true
      },

      html: {
        files: '<%= ejs.all.src %>',
        tasks: ['ejs'],
      },

      assets: {
        files: ['assets/**/*', '*.css', '*.js', 'images/**/*', 'img/**/*', '!Gruntfile.js'],
        tasks: ['copy'],
      }
    },
  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.registerTask('default', ['imagemin', 'uglify']);

  grunt.registerTask('server', ['default', 'connect', 'watch']);

};
