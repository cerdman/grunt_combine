/**
 *
 * Grunt combiner
 *
 **/

'use strict';

module.exports = function(grunt) {

    var path = require('path');

    // Project configuration.
    grunt.initConfig({
        meta: {
            gruntconfigkey: "gruntconfigvalue"
        },
        watch: {
            files: ['Gruntfile.js', 'input/**/*.js', 'input/**/*.json','./tmp/*.json'],
            tasks: 'default'
        },
        jshint: {
            files: ['grunt.js', 'input/**/*.js', 'input/**/*.json', 'dist/*.js'],
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                boss: true,
                eqnull: true,
                node: true,
                globals: {
                    // jasmine globals
                    angular: true,
                    describe: false,
                    jasmine: false,
                    it: false,
                    xit: false,
                    expect: false,
                    beforeEach: false,
                    afterEach: false
                }
            },
        },
        "concat-json": {
            "concatted": {
                files: {
                    "dist/en.json": ["input/**/*.json"]

                }
            }
        },
        json: {
            main: {
                options: {
                    namespace: 'ColumnDefs',
                    includePath: false,
                    processName: function(filename) {
                        return filename.toLowerCase();
                    }
                },
                src:  '.tmp/**/*.json',
                dest: 'dist/json.js'
            }
        },
        copy: {
          main: {
              files: [
                  {expand: true, flatten: true, src: ['input/**/*.json'], dest: '.tmp/', filter: 'isFile'}
              ]
          }
        },
        uglify: {
            columns: {
                files: {
                    'dist/output.min.js': ['dist/json.js']
                }
            }
        },
        'json-minify': {
            columns: {
                files: '.tmp/*.json'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-concat-json');
    grunt.loadNpmTasks('grunt-json');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-json-minify');
    grunt.loadTasks('tasks');
    // By default, lint and run all tests.
    grunt.registerTask('default', ['copy','json-minify:columns','json','jshint']);

};
