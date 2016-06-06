module.exports = function(grunt) {
	"use strict";

	var initConfig = require('./config/config.js')(grunt);

	grunt.initConfig(initConfig);

	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-less');

	grunt.registerTask('compile-dev',  ['clean:dev', 'copy:dev', 'browserify:dev', 'less:dev']);
	grunt.registerTask('compile-deploy',  ['clean:deploy', 'copy:deploy', 'browserify:deploy', 'less:deploy']);
	grunt.registerTask('compile', ['compile-dev', 'compile-deploy']);
	grunt.registerTask('server', ['compile-dev', 'connect:all', 'watch']);
	grunt.registerTask('default', ['compile']);
}