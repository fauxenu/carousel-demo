/**
 * Basic view for display an song. Shows album art, track title, artist, and
 * album name
 *
 * @module views/song
 */

var Marionette = require('backbone.marionette');
var template = require('./templates/song.html');

module.exports = Marionette.ItemView.extend({
	tagName: 'li',
	className: 'song',
	template: template
});