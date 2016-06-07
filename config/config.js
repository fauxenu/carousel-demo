module.exports = function (grunt) {
	"use strict";

	var config = {
		pkg: grunt.file.readJSON('package.json'),
		browserify: require('./browserify'),
		copy: require('./copy'),
		less: require('./less'),
		connect: require('./connect'),
		watch: require('./watch'),
		clean: require('./clean'),
		uglify: require('./uglify')
	};

	return config;
};