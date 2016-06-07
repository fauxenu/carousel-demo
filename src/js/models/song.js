/**
 * @module models/song
 */

var Backbone = require('backbone');
var _ = require('underscore');

module.exports = Backbone.Model.extend({
	idAttribute: 'trackId',

	url: function() {
		return 'https://itunes.apple.com/lookup?id='+ this.id +'&entity=song';
	},

	/**
	 * Grabs the first object out of the result array returned from
	 * the iTunes API. Since we're performing a direct ID lookup, there
	 * should never be more that one result.
	 *
	 * @override
	 * @param  {Object} response - Raw server response
	 * @return {Object} Modified server response
	 */
	parse: function(response) {
		return response.results.length ? response.results[0] : {};
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
		return Backbone.Model.prototype.fetch.call(this, _.extend(
			options || {},
			{ dataType: 'jsonp' }
		)).promise();
	}
});