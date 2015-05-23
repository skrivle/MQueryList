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

	/**
	 * MQuery constructor
	 *
	 * @param {String}
	 */
	var MQuery = function (query) {

		this._query = query;
		this._isActive = false;
		this._mql = win.matchMedia(query);

		this._onChange = this._onChange.bind(this);
	};

	heir.inherit(MQuery, EventEmitter);


	/* Methods
	=================================================== */

	/**
	 * Activates the MQuery instance
	 *
	 * @return {void}
	 */
	MQuery.prototype.init = function () {
		this._isActive = true;
		this.emit('init', this, 'init');
	};

	/**
	 * Deactivates the MQuery instance
	 *
	 * @return {void}
	 */
	MQuery.prototype.destroy = function () {
		this._isActive = false;
		this.emit('destroy', this, 'destroy');
	};

	/**
	 * Start listening for change events on the MediaQueryList
	 * instance. Also calls the _onChange handler to make sure
	 * an event is triggerd when we start watching.
	 *
	 * @return {void} [description]
	 */
	MQuery.prototype.watch = function () {
		this._mql.addListener(this._onChange);
		this._onChange();
	};

	/**
	 * Stop listening for changes
	 *
	 * @return {void}
	 */
	MQuery.prototype.stopWatching = function () {
		this._mql.removeListener(this._onChange);
	};

	/**
	 * Getter for _isActive
	 *
	 * @return {Boolean}
	 */
	MQuery.prototype.isActive = function () {
		return this._isActive;
	};


	/* Event handlers
	=================================================== */

	/**
	 * Event handler for events that are triggerd on the
	 * MediaQueryList object. Will call the init() or
	 * destroy() method.
	 *
	 * @return {void}
	 */
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
