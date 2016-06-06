var Marionette = require('backbone.marionette');
var template = require('./templates/song.html');

module.exports = Marionette.ItemView.extend({
	tagName: 'li',
	className: 'song',
	template: template
});