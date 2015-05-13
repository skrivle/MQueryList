(function (root, factory) {
	if (typeof define === 'function' && define.amd) {

		// AMD
		define(['./window', 'inherit', 'eventEmitter'], factory);

	} else if (typeof exports === 'object') {

		// CommonJS
		module.exports = factory(require('./window'), require('inherit'), require('wolfy87-eventemitter'));

	} else {

		// Browser
		window.MediaQuery = factory(window, inherit, window.EventEmitter);
	}
}(this, function (
	window,
	EventEmitter,
) {

	/* Constructor
	=================================================== */
	var MediaQuery = function (query) {
		this._query = query;
		this._isActive = false;
		this._mql = window.matchMedia(query);

		this._onMediaQueryChangeRef = this._onMediaQueryChange.bind(this);
	};

	inherit(MediaQuery, EventEmitter);


	/* Methods
	=================================================== */
	MediaQuery.prototype.init = function () {
		this._isActive = true;
		this.emit('active');
	};

	MediaQuery.prototype.destroy = function () {
		this._isActive = false;
		this.emit('active');
	};

	MediaQuery.prototype.watch = function () {
		this._mql.addListener(this._onMediaQueryChangeRef);
		this._onMediaQueryChange();
	};

	MediaQuery.prototype.stopWatching = function () {
		this._mql.removeListener(this._onMediaQueryChangeRef);
	};


	/* Export
	=================================================== */
	MediaQuery.prototype._onMediaQueryChange = function () {
		if(this._mql.matches) {
			this.init();
		}else {
			this.destroy();
		}
	};

	/* Export
	=================================================== */
	return;
}));
