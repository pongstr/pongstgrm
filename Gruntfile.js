module.exports = function(grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    site: {
      app:    'app',
      src:    'src',
      dist:   'dist-<%= pkg.name %>',
      test:   'tests',
      bower:  'bower_components'
    },
    banner: '/*! <%= pkg.name %> v<%= pkg.version %> <%= pkg.description %> '+
            ' * <%= pkg.license %> \n' +
            ' */',
    // Less Pre-processor
    less: {
      dev: {
        options: {
          sourceMap: false,
          strictMath: true
        },
        files: {
          '<%= site.src %>/css/<%= pkg.name %>.css': '<%= site.src %>/less/<%= pkg.name %>.less'
        }
      },
      dist: {
        options: {
          compress: true,
          sourceMap: true,
          strictMath: true
        },
        files: {
          '<%= site.src %>/css/<%= pkg.name %>.min.css': '<%= site.src %>/less/<%= pkg.name %>.less'
        }
      }
    },

    // Jshint
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      files: ['<%= site.src %>/js/*.js']
    },

    // Watch Less stylesheets
    watch: {
      less: {
        files: '<%= site.src %>/less/**/*.less',
        tasks: ['less']
      }
    }
  });

  // Run CSS Tasks
  grunt.registerTask('buildcss', [
    'less',
    'watch:less'
  ]);
};
