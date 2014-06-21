/*! =========================================================================
 * Grunt Tasks for AngularJS web apps v0.1.0
 * Copyright 2014 (c) Pongstr Ordillo. MIT License.
 * ========================================================================= */

module.exports = function(grunt) {

  // Project Configuration

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    site: {
      app:  'app',
      bower: 'bower_components',
      dist_dir: 'dist',
      src: 'src'
    },
    banner: '/*! ========================================================================\n' +
            ' * <%= pkg.name %> v<%= pkg.version %> \n' +
            ' * =========================================================================\n' +
            ' * <%= pkg.description %> \n'+
            ' * Authored by <%= pkg.author %> [<%= pkg.email %>] \n' +
            ' * ========================================================================= */\n',

    // Copy assets that don't need processing
    // ======================================
    copy: {
      app: {
        files: [
          {
            expand: true,
            flatten: true,
            src: [
              'source/javascript/pongstagr.am.js'
            ],
            dest: 'application/assets/js/',
            filter: 'isFile'
          }
        ]
      },
      libs: {
        files: [
          { // Copy jQuery library
            expand: true,
            flatten: true,
            src: [
              'bower_components/jquery/dist/jquery.js',
              'bower_components/jquery/dist/jquery.min.js'
            ],
            dest: 'application/assets/js/jquery/',
            filter: 'isFile'
          },
          { // Font-Awesome Glyphs
            expand: true,
            flatten: true,
            src: ['bower_components/font-awesome/fonts/*'],
            dest: 'application/assets/fonts/font-awesome/',
            filter: 'isFile'
          }
        ]
      },
      lessfiles: {
        files: [
          { // Font-awesome less stylesheets
            expand: true,
            flatten: true,
            src: ['bower_components/font-awesome/less/*'],
            dest: 'source/less/font-awesome',
            filter: 'isFile'
          }
        ]
      }
    },

    // Compile Less stylesheets
    // =====================================
    less: {
      development: {
        options: {
          strictMath: true,
          sourceMap: false
        },
        files: {
          '<%= site.app %>/assets/css/<%= pkg.name %>.css' : '<%= site.src %>/less/bootstrap.less'
        }
      },
      production: {
        options: {
          strictMath: true,
          sourceMap: false,
          compress: true
        },
        files: {
          '<%= site.app %>/assets/css/<%= pkg.name %>.min.css' : '<%= site.src %>/less/bootstrap.less'
        }
      }
    },

    // Watch Tasks
    // =====================================
    watch: {
      less: {
        files: ['source/less/**/*.less'],
        tasks: ['less:development']
      },
      jshint: {
        files: ['source/javascript/*.js'],
        tasks: ['jshint:app']
      },
      copy: {
        files: ['source/javascript/*.js'],
        tasks: ['copy:app']
      }
    },

    // Optimise Image Assets
    // =====================================
    imagemin: {
      dynamic: {
        options: {
          pngquant: true,
          optimizationLevel: 3
        },
        files:[
          {
            expand: true,
            src: ['*.{png,jpg,gif}'],
            cwd: 'source/img/',
            dest: 'application/assets/img/'
          }
        ]
      }
    },

    // Add Banners for Application Build info
    // ======================================
    usebanner: {
      dist: {
        options: {
          position: 'top',
          banner: '<%= banner %>'
        },
        files: {
          src: [
            'dist/css/**',
            'dist/js/**',
            'Gruntfile.js'
          ]
        }
      }
    },

    // Lint gruntfile and js apps
    jshint: {
      grunt: {
        src: ['Gruntfile.js']
      },
      app: {
        options: {
          jshintrc: 'application/assets/js/app/.jshintrc'
        },
        src: [
          'application/assets/js/app/app.js'
        ]
      }
    }

  });

  // These grunt plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-banner');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');


  // Update Frontend Packages
  grunt.registerTask('updatepkg', ['copy']);

  // Less CSS Tasks
  grunt.registerTask('watchless', ['watch:less']);
  grunt.registerTask('buildless', ['less']);

  // Javascript Tasks
  grunt.registerTask('lintjs', ['jshint']);
  grunt.registerTask('watchjs', ['watch:jshint']);

  // Optimise and Build images for production
  grunt.registerTask('buildimg', ['imagemin']);

  // Default Task Less
  grunt.registerTask('default', ['less', 'imagemin', 'jshint']);

  // Default Task Compas
  // grunt.registerTask('default', ['compass', 'imagemin', 'jshint']);

};
