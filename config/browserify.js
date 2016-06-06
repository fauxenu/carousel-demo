module.exports = {
	dev: {
		options: {
			browserifyOptions: {
				debug: true,
				transform: ['node-underscorify'],
			}
		},
		files: {
			"build/dev/main.js": ['src/js/main.js']
		}
	},
	deploy: {
		options: {
			browserifyOptions: {
				transform: ['node-underscorify'],
			}
		},
		files: {
			"build/deploy/main.js": ['src/js/main.js']
		}
	}
};