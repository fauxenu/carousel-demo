module.exports = {
	dev: {
		files: {
			'build/dev/main.css': "src/less/main.less"
		}
	},
	deploy: {
		options: {
			cleancss: true
		},
		files: {
			'build/deploy/main.css': "src/less/main.less"
		}
	}
};