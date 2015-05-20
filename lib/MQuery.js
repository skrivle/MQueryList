(function (root, factory) {

	'use strict';

	/* istanbul ignore next */

	if (typeof define === 'function' && define.amd) {

		// AMD
		define(['./window', 'heir/heir', 'eventEmitter/EventEmitter'], factory);

	} else if (typeof exports === 'object') {

		// CommonJS
		module.exports = factory(
			require('./window'),
			require('heir'),
			require('wolfy87-eventemitter')
		);


	} else {

		// Browser
		root.MQuery = factory(
			root,
			root.heir,
			root.EventEmitter
		);
	}

}(this, function (
	win,
	heir,
	EventEmitter
) {

	'use strict';

	/* Constructor
	=================================================== */
	var MQuery = function (query) {

		this._query = query;
		this._isActive = false;
		this._mql = win.matchMedia(query);

		this._onChange = this._onChange.bind(this);
	};

	heir.inherit(MQuery, EventEmitter);


	/* Methods
	=================================================== */
	MQuery.prototype.init = function () {
		this._isActive = true;
		this.emit('init', this, 'init');
	};

	MQuery.prototype.destroy = function () {
		this._isActive = false;
		this.emit('destroy', this, 'destroy');
	};

	MQuery.prototype.watch = function () {
		this._mql.addListener(this._onMQueryChangeRef);
		this._onChange();
	};

	MQuery.prototype.stopWatching = function () {
		this._mql.removeListener(this._onMQueryChangeRef);
	};

	MQuery.prototype.isActive = function () {
		return this._isActive;
	};


	/* Event handlers
	=================================================== */
	MQuery.prototype._onChange = function () {
		if(this._mql.matches) {
			this.init();
		}else {
			this.destroy();
		}
	};


	/* Export
	=================================================== */
	return MQuery;

}));
