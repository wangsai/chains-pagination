/*
 * chains-pagination
 * https://github.com/saiwang/chains-pagination
 *
 * Copyright (c) 2013 WangSai
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp'],
    },

    // Configuration to be run (and then tested).
    pagination: {
      test: {
        options: {
          data: grunt.file.readJSON('test/info.json'),
          dest: '_site/',
          fileNameTemplate: 'page{{index}}/index.html'
        }
      },
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');


  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'pagination']);

};
