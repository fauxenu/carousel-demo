var Backbone = require('backbone');
var _ = require('underscore');

module.exports = Backbone.Model.extend({
	idAttribute: 'trackId',

	url: function() {
		return 'https://itunes.apple.com/lookup?id='+ this.id +'&entity=song';
	},

	parse: function(response) {
		return response.results.length ? response.results[0] : {};
	},

	fetch: function(options) {
		return Backbone.Model.prototype.fetch.call(this, _.extend(
			options || {},
			{ dataType: 'jsonp' }
		)).promise();
	}
});