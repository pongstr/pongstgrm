module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! ========================================================================== \n' +
            ' * <%= pkg.name %> v<%= pkg.version %> <%= pkg.desc %> | <%= pkg.homepage %> \n' +
            ' * ========================================================================== \n' +
            ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>. Licensed under MIT License. \n' +
            ' * Requires: <%= pkg.requires %> \n' +
            ' * ========================================================================= */\n\n',
    jqueryCheck: 'if (typeof jQuery === "undefined") { throw new Error("<%= pkg.name %> requires <%= pkg.requires %>") }',
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
      plugin_min: { 
        src: 'source/<%= pkg.name %>.js',
        dest: 'source-min/<%= pkg.name %>.min.js'
      }
    },
    recess: {
      options: { 
        banner: '<%= banner %>',
        compile: true,
        noIDs: true,
        zeroUnits: true
      },
      docs: {
        options: { compress: true },
        src: ['less/docs.less'],
        dest: 'assets/css/docs.css'
      },
      plugin: {
        options: { compress: false },
        src: ['less/<%= pkg.name %>.less'],
        dest: 'source/<%= pkg.name %>.css'
      },
      plugin_min: {
        options: { compress: true },
        src: ['less/<%= pkg.name %>.less'],
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