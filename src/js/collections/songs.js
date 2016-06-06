var Backbone = require('backbone');
var _ = require('underscore');
var Song = require('../models/song');

module.exports = Backbone.Collection.extend({
	rootUrl: 'https://itunes.apple.com/search',
	model: Backbone.Model,
	comparatorFields: [
		'trackName',
		'releaseDate',
		'collectionName',
		'trackNumber',
		'trackTimeMillis',
		'primaryGenreName'
	],

	initialize: function(options) {
		options = options || {};

		this.filters = {
			term: options.term || 'Daft Punk',
			limit: options.limit || 20
		};
	},

	url: function() {
		var args = _.map(this.filters, function(item, key) {
			return key + '=' + item;
		});

		return this.rootUrl + '?' + args.join('&');
	},

	parse: function(response) {
		return response.results || [];
	},

	fetch: function(options) {
		return Backbone.Collection.prototype.fetch.call(this, _.extend(
			options || {},
			{ dataType: 'jsonp' }
		)).promise();
	},

	applyFilters: function(filters) {
		_.extend(this.filters, filters);
		return this.fetch().promise();
	},

	randomizeOrder: function() {
		if(this.length > 2) {
			var fields = _.without(this.comparatorFields, this.comparator);
			console.log(fields, this.comparator);

			this.comparator = fields[_.random(0, fields.length - 1)];
			console.log(this.comparator);
			this.sort();
		}
	}
});