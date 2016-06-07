/**
 * @module collections/songs
 */

var Backbone = require('backbone');
var _ = require('underscore');
var Song = require('../models/song');

module.exports = Backbone.Collection.extend({
	rootUrl: 'https://itunes.apple.com/search',
	model: Backbone.Model,

	/**
	 * A list of available model properties to sort on
	 *
	 * @type {Array}
	 */
	comparatorFields: [
		'trackName',
		'releaseDate',
		'collectionName',
		'trackNumber',
		'trackTimeMillis',
		'primaryGenreName'
	],

	/**
	 * Sets initial filters
	 *
	 * @param  {Object} [options] - Optional constuctor args]
	 */
	initialize: function(options) {
		options = options || {};

		this.filters = {
			term: options.term || 'Daft Punk',
			limit: options.limit || 20
		};
	},

	/**
	 * Constructs URL query string from the defined collection filters
	 *
	 * @return {String}
	 */
	url: function() {
		var args = _.map(this.filters, function(item, key) {
			return key + '=' + item;
		});

		return this.rootUrl + '?' + args.join('&');
	},

	/**
	 * Parses the the `results` out of the server response
	 *
	 * @override
	 * @param  {Object} response - Raw server response
	 * @return {Array} An array of attribute hashes
	 */
	parse: function(response) {
		return response.results || [];
	},

	/**
	 * Overrides default implementaiton to request data as JSONP (to avoid XSS
	 * secruity restrictions)
	 *
	 * @override
	 * @param  {Object} [options]
	 * @return {Object} jQuery promise
	 */
	fetch: function(options) {
		return Backbone.Collection.prototype.fetch.call(this, _.extend(
			options || {},
			{ dataType: 'jsonp' }
		)).promise();
	},

	/**
	 * Re-fetches the collection using new search filters
	 *
	 * @async
	 * @param  {Object} filters - New search filters (name -> value pairs)
	 * @return {Object} jQuery promise
	 */
	applyFilters: function(filters) {
		_.extend(this.filters, filters);
		return this.fetch().promise();
	},

	/**
	 * Randomly sorts the collection by an aribtrary model property. The same
	 * property will never be used twice in a row.
	 */
	randomizeOrder: function() {
		if(this.length > 2) {
			var fields = _.without(this.comparatorFields, this.comparator);

			this.comparator = fields[_.random(0, fields.length - 1)];
			this.sort();
		}
	}
});