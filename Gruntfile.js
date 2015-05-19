module.exports = function (grunt) {

	'use strict';

	grunt.initConfig({
		jest: {
			options: {
				coverage: true,
				testPathPatern: /.*.spec.js/
			}
		}
	});

	grunt.loadNpmTasks('grunt-jest');

};
