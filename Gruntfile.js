module.exports = function (grunt) {

	'use strict';

	grunt.initConfig({

		jest: {
			options: {
				coverage: true,
				testPathPatern: /.*.spec.js/
			}
		},

		watch: {
			tests: {
				files: ['lib/**/*.js', '__mocks__/**/*.js', '__tests__/**/*.js'],
				tasks: ['jest']
			}
		}
	});

	grunt.loadNpmTasks('grunt-jest');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('dev', ['jest', 'watch']);
	grunt.registerTask('test', ['jest']);

};
