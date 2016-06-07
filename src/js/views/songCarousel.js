/**
 * A simple carousel that renders a collection of songs (4 per carousel slide)
 * @module views/songCarousel
 */

var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var _ = require('underscore');
var Song = require('./song');
var template = require('./templates/songCarousel.html');

var SongList = Marionette.CollectionView.extend({
	tagName: 'ul',
	className: 'song-list',
	childView: Song
});

module.exports = Marionette.LayoutView.extend({
	className: 'carousel',
	template: template,
	childView: Song,
	songsPerSlide: 4,
	ui: {
		items: '.carousel-items',
		next: '[data-action="next"]',
		previous: '[data-action="previous"]',
		reorder: '[data-action="reorder"]'
	},
	events: {
		'click @ui.next': 'onNext',
		'click @ui.previous': 'onPrevious',
		'click @ui.reorder': 'onReorder'
	},

	/**
	 * Dynamically creates a set of regions to render a collection
	 * of songs in by dividing the total number of songs by desired amount
	 * of songs per slide (default is 4)
	 *
	 * @param  {Object} [options] - view constructor options
	 * @return {Object} Region name-selector hash
	 */
	regions: function(options) {
		var regions = {};
		var total = Math.ceil(options.collection.length /
				this.songsPerSlide);

		for(var x = 0; x < total; x++) {
			var id = _.uniqueId('region-');
			regions[id] = '#' + id;
		}

		return regions;
	},

	templateHelpers: function() {
		return { regions: _.keys(this.regions) };
	},

	onRender: function() {
		this._renderSlides();
	},

	/**
	 * Advances carousel one slide to the right
	 */
	onNext: function() {
		this.setActive(this.ui.items.find('.active').next());
	},

	/**
	 * Advances carousel one slide to the left
	 */
	onPrevious: function() {
		this.setActive(this.ui.items.find('.active').prev());
	},

	/**
	 * Randomly reorders the backing collection and re-renders the view
	 */
	onReorder: function() {
		this.collection.randomizeOrder();
		this._renderSlides();
	},

	/**
	 * Sets the passed element as the active slide. Only one slide can
	 * be active at a time
	 *
	 * @param {Object} $el - jQuery selector
	 */
	setActive: function($el) {
		if(this.active) {
			this.active.removeClass('active');
		}

		// set active region
		this.active = $el;
		this.active.addClass('active');

		// toggle next/previous button state based on whether the active region
		// is the first of last item in the list
		this.ui.next.prop('disabled', !$el.next().length);
		this.ui.previous.prop('disabled', !$el.prev().length);
	},

	/**
	 * Renders a sub-collection of songs in each region as a simple
	 * CollectionView.
	 *
	 * @private
	 */
	_renderSlides: function() {
		var regionIds = _.keys(this.regions);

		regionIds.forEach(function(id, index) {
			var subCollection = this._createSubCollection(
					index * this.songsPerSlide, (index + 1) * this.songsPerSlide);

			this.showChildView(id, new SongList({ collection: subCollection }));
		}, this);

		this.setActive(this.ui.items.find(':first-child'));
	},

	/**
	 * Creates a sub-collection from a segment of the larger view
	 * collection. Returns a psuedo-collection suitable for rendering in
	 * a CollectionView as opposed to an actual Backbone Collection. This
	 * ensures that each model's `collection` reference doesn't accidently
	 * get changed.
	 *
	 * @private
	 * @param  {Integer} start - 0-based Collection index to start from
	 * @param  {Integer} end - 0-based Collection index to stop at
	 * @return {Object} A collection-like object
	 */
	_createSubCollection: function(start, end) {
			var models = this.collection.slice(start, end);
			var subCollection = { models: models };

			Marionette.actAsCollection(subCollection, 'models');
			_.extend(subCollection, Backbone.Events);

			return subCollection;
	}
});