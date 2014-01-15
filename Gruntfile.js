'use strict';

module.exports = function(grunt) {
  grunt.initConfig({
    tplComplie: {
      main: {
        options:{},
        files: {
          'test/expected/js/tpl.js': ['test/*.html']
        }
      }
    },

    clean: {
      tests: ['test/expected/js']
    },

    mocha_phantomjs: {
      options: {
        'reporter': 'xunit',
        'output': 'tests/results/result.xml'
      },
      all: ['test/expected/*.html']
    }
  });

  grunt.loadTasks('tasks');

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-mocha-phantomjs');

  grunt.registerTask('test', ['clean', 'tplComplie', 'mocha_phantomjs']);
  // By default, run all tests
  grunt.registerTask('default', ['test']);
};