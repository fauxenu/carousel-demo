/**
 * Root Marionette application. Bootstraps initial data-set and displays
 * a carousel widget on startup
 *
 * @module app
 */

var Marionette = require('backbone.marionette');
var _ = require('underscore');
var Songs = require('./collections/songs');
var SongCarousel = require('./views/songCarousel');

var RootLayout = Marionette.LayoutView.extend({
	el: 'body',
	regions: {
		content: '#content'
	}
});

var ErrorView = Marionette.ItemView.extend({
	tagName: 'p',
	className: 'error-message',
	template: _.template('Unable to retrieve song data')
});

module.exports = Marionette.Application.extend({
	initialize: function() {
		this.collection = new Songs();
	},

	/**
	 * Fetches an initial list of songs on application startup
	 *
	 * @async
	 */
	onStart: function() {
		var self = this;
		this.layout = new RootLayout();

		return this.collection.fetch({
			success: function() { self.onInitialFetch(); },
			error: function() { self.onError(); }
		}).promise();
	},

	/**
	 * Renders song carousel on successful fetch
	 */
	onInitialFetch: function() {
		this.layout.showChildView('content', new SongCarousel({
			collection: this.collection
		}));
	},

	/**
	 * Displays a generic error message if an error occurs while fetching
	 * song data
	 */
	onError: function() {
		this.layout.showChildView('content', new ErrorView());
	}
});