module.exports = {
	options: {
		compress: {
			drop_console: true
		}
	},
	prod: {
		files: {
			'build/deploy/main.js': ['build/deploy/main.js']
		}
	}
};