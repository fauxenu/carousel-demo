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

	onNext: function() {
		this.setActive(this.ui.items.find('.active').next());
	},

	onPrevious: function() {
		this.setActive(this.ui.items.find('.active').prev());
	},

	onReorder: function() {
		this.collection.randomizeOrder();
		this._renderSlides();
	},

	setActive: function($el) {
		if(this.active) {
			this.active.removeClass('active');
		}

		this.active = $el;
		this.active.addClass('active');

		this.ui.next.prop('disabled', !$el.next().length);
		this.ui.previous.prop('disabled', !$el.prev().length);
	},

	_renderSlides: function() {
		var regionIds = _.keys(this.regions);

		regionIds.forEach(function(id, index) {
			var subCollection = this._createSubCollection(
					index * this.songsPerSlide, (index + 1) * this.songsPerSlide);

			this.showChildView(id, new SongList({ collection: subCollection }));
		}, this);

		this.active = this.ui.items.find('.active');
	},

	_createSubCollection: function(start, end) {
			var models = this.collection.slice(start, end);
			var subCollection = { models: models };

			Marionette.actAsCollection(subCollection, 'models');
			_.extend(subCollection, Backbone.Events);

			return subCollection;
	}
});