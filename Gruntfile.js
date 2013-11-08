module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! ========================================================================== \n' +
            ' * <%= pkg.name %> v<%= pkg.version %> <%= pkg.desc %>\n' +
            ' * ========================================================================== \n' +
            ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>. Licensed under MIT License. \n' +
            ' * Requires: <%= pkg.requires %> \n' +
            ' * ========================================================================= */\n\n',
    jqueryCheck: 'if (typeof jQuery === "undefined") { throw new Error("<%= pkg.name %> <%= pkg.requires %>") }',
    jshint: {
      options: { jshintrc: 'source/.jshintrc' },
      gruntfile: { src: 'Gruntfile.js' },
      src: { src: ['source/*.js' ] }
    },
    uglify: {
      options: {
        banner: '<%= banner %><%= jqueryCheck %>',
        stripBanners: false
      },
      bootstrap: { 
        src: 'source/<%= pkg.name %>.js',
        dest: 'source-min/<%= pkg.name %>.min.js'
      }
    },
    recess: {
      dist: {
        options: { 
          banner: '<%= banner %>',
          compress: true,
          noIDs: true,
          zeroUnits: true
        },
        src:  'source/<%= pkg.name %>.css',
        dest: 'source-min/<%= pkg.name %>.min.css'
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-recess');


  // Compress Sources
  grunt.registerTask('default', ['jshint','uglify', 'recess']);

};