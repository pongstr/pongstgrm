module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! ========================================================================== \n' +
            ' * <%= pkg.name %> v<%= pkg.version %> <%= pkg.desc %> | <%= pkg.homepage %> \n' +
            ' * =========================================================================== \n' +
            ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>. Licensed under MIT License. \n' +
            ' * =========================================================================== */\n',
    copy: {
      jquery: {
        files: [
          { // jQuery latest (unminified)
            flatten:  true,
            src:      ['bower_components/jquery/jquery.min.js'],
            dest:      'assets/js/jquery.min.js',
            filter:    'isFile'
          }
        ]
      },
      bootstrap: {
        files: [
          { // Bootstrap JS 
            flatten:  true,
            src:      ['bower_components/bootstrap/dist/js/bootstrap.min.js'],
            dest:      'assets/js/bootstrap.min.js',
            filter:    'isFile'
          },
          { // Copy Bootstrap Less files
            expand:   true,
            flatten:  true,
            src:      ['bower_components/bootstrap/less/*'],
            dest:      'assets/less/bootstrap/',
            filter:    'isFile'            
          },
          { // Bootstrap Glyphicons
            expand:   true,
            flatten:  true,
            src:      ['bower_components/bootstrap/dist/fonts/*'],
            dest:      'assets/fonts/bootstrap/',
            filter:    'isFile'
          }
        ]
      },
      fontawesome: {
        files: [
         { // Font-Awesome Less
            expand:   true,
            flatten:  true,
            src:      ['bower_components/font-awesome/less/*'],
            dest:      'assets/less/font-awesome/',
            filter:    'isFile'
          },
          { // Font-Awesome Glyphs
            expand:   true,
            flatten:  true,
            src:      ['bower_components/font-awesome/fonts/*'],
            dest:      'assets/fonts/font-awesome/',
            filter:    'isFile'
          }
        ]
      }
    },
    jshint: {
      options: { jshintrc: 'source/.jshintrc' },
      src: { src: ['source/pongstagr.am.js'] }
    },
    usebanner: {
      dist: {
        options: {
          position: 'top',
          banner: '<%= banner %>'
        },
        files: {
          src: [
            'source/<%= pkg.name %>.css',
            'source/<%= pkg.name %>.js',
          ]
        }
      }      
    },
    concat: {
      options: {
        stripBanners: true,
        separator: ';',
        banner:  '<%= banner %> \n'
      },
      docsjs: {
        src: [
          'assets/js/prettify.js',
          'assets/js/easing.js',
          'assets/js/docs.js'         
        ],
        dest: 'assets/js/plugins.js'
      },
    },
    uglify: {
      options: {
        banner: '<%= banner %> \n',
        stripBanners: true
      },
      plugin_min: { 
        src:  'source/<%= pkg.name %>.js',
        dest: 'source/<%= pkg.name %>.min.js'
      },
      docs: {
        src: 'assets/js/plugins.js',
        dest: 'assets/js/plugins.js'
      }
    },
    less: {
      docs: {
        options: {
          strictMath: true,
          sourceMap: false,
          compress: true
        },
        files: {
          'assets/css/docs.css': 'assets/less/docs.less',
          'assets/css/font-awesome.css': 'assets/less/font-awesome/font-awesome.less'
        }
      },
      plugin_full: {
        options: {
          strictMath: true,
          sourceMap: false
        },
        files: {
          'source/<%= pkg.name %>.css':'source/<%= pkg.name %>.css'
        }
      },
      plugin_min: {
        options: {
          strictMath: true,
          sourceMap: false,
          compress: true
        },
        files: {
          'source/<%= pkg.name %>.min.css':'source/<%= pkg.name %>.css'
        }
      }
    },
    imagemin: {
      img: {
        files: [
          {
            expand: true,
            cwd: '_images/img',
            src: ['*.{png,jpg,gif}'],
            dest: 'assets/img'
          }
        ]        
      },
      ico: {
        files: [
          {
            expand: true,
            cwd: '_images/ico',
            src: ['*.{png,jpg,gif}'],
            dest: 'assets/ico'
          }
        ]        
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-banner');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');

  // Update Deps
  grunt.registerTask('update-packages', ['copy']);

  // Optimise Images
  grunt.registerTask('optimize-image', ['imagemin']);
  grunt.registerTask('build-css', ['less']);

  // Compress Sources
  grunt.registerTask('default', ['jshint', 'usebanner', 'concat', 'uglify', 'less', 'imagemin']);

};