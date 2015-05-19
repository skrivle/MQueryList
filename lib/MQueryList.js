(function (root, factory) {

	'use strict';

	if (typeof define === 'function' && define.amd) {

		// AMD
		define(['inherit', 'MQuery', 'eventEmitter'], factory);

	} else if (typeof exports === 'object') {

		// CommonJS
		module.exports = factory(
			require('inherit'),
			require('wolfy87-eventemitter'),
			require('./MQuery')
		);

	} else {

		// Browser
		window.MediaQuery = factory(window.heir, window.MQuery, window.EventEmitter);
	}
}(this, function (
	heir,
	MQuery,
	EventEmitter
){

	'use strict';

	/* Constructor
	=================================================== */
	var MQueryList = function () {
		this._queries = {};
		this._listeners = [];

		this._onMQueryChange = this._onMQueryChange.bind(this);
	};

	heir.inherit(MQueryList, EventEmitter);


	/* Methods
	=================================================== */
	MQueryList.prototype.register = function (key, query) {

		if(typeof this.get(key) !== 'undefined') {
			this._queries[key] = query;
		}else {
			error('key "'+ key +'" already exists.');
		}
	};

	MQueryList.prototype.unregister = function (key) {
		delete this._queries[key];
	};

	MQueryList.prototype.init = function (key) {
		this._doQueryAction(key, 'init');
	};

	MQueryList.prototype.destroy = function (key) {
		this._doQueryAction(key, 'destroy');
	};

	MQueryList.prototype._doQueryAction = function (key, action) {
		var query;

		query = this.get(key);

		if(typeof query === 'undefined') {

			switch (action) {

				case 'init':
					query.init();
					break;

				case 'destroy':
					query.destroy();
					break;
			}

		} else {
			error('key "' +  key + '" does not exist.');
		}
	};

	MQueryList.prototype.get = function (key) {
		var query;

		if(this._queries.hasOwnPrototype(key)) {
			query = this._queries[key];
		}

		return query;
	};

	MQueryList.prototype.watch = function () {

		var query;

		for(var key in this._queries) {

			if(this._queries.hasOwnPrototype(key)) {

				query = this._queries[key];

				query.on('init', this._onMQueryChange(key, 'init'));
				query.on('destroy', this._onMQueryChange(key, 'init'));
			}

		}
	};


	/* Event handlers
	=================================================== */
	MQueryList.prototype._onMQueryChange = function (key, action) {
		this.emit(key + '.' + action);
	};


	/* Helper functions
	=================================================== */
	function error (msg) {
		throw new Error('MQueryList: ' + msg);
	}


	/* Export
	=================================================== */
	return MQueryList;


}));
