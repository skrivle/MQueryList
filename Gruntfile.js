module.exports = function (grunt) {

	'use strict';

	var jsFiles = [
		'index.js',
		'lib/**/*.js',
		'__mocks__/**/*.js',
		'__tests__/**/*.js'
	];

	grunt.initConfig({

		jest: {
			options: {
				coverage: true,
				testPathPatern: /.*.spec.js/
			}
		},

		watch: {

			jshint: {
				files: jsFiles,
				tasks: ['jshint']
			},

			tests: {
				files: jsFiles,
				tasks: ['jest']
			}
		},

		jshint: {
			options: {
				jshintrc: true
			},
			all: jsFiles
		}

	});

	grunt.loadNpmTasks('grunt-jest');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');

	grunt.registerTask('dev', ['jshint', 'jest', 'watch']);
	grunt.registerTask('test', ['jshint', 'jest']);

};
