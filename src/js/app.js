var Marionette = require('backbone.marionette');
var Songs = require('./collections/songs');
var SongCarousel = require('./views/songCarousel');

var RootLayout = Marionette.LayoutView.extend({
	el: 'body',
	regions: {
		content: '#content'
	}
});

module.exports = Marionette.Application.extend({
	initialize: function() {
		this.collection = new Songs();
		this.listenToOnce(this.collection, 'sync', this.onInitialFetch);
	},

	onStart: function() {
		this.layout = new RootLayout();
		this.collection.fetch();
	},

	onInitialFetch: function() {
		this.layout.showChildView('content', new SongCarousel({
			collection: this.collection
		}));
	}
});