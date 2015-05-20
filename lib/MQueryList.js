(function (root, factory) {

	'use strict';

	/* istanbul ignore next */

	if (typeof define === 'function' && define.amd) {

		// AMD
		define(['heir/heir', 'eventEmitter/EventEmitter', './MQuery'], factory);

	} else if (typeof exports === 'object') {

		// CommonJS
		module.exports = factory(
			require('heir'),
			require('wolfy87-eventemitter'),
			require('./MQuery')
		);

	} else {

		// Browser
		root.MQueryList = factory(root.heir, root.MQuery, root.EventEmitter);
	}
}(this, function (
	heir,
	EventEmitter,
	MQuery
){

	'use strict';

	/* Constructor
	=================================================== */
	var MQueryList = function () {
		this._queries = {};
		this._onMQueryChange = this._onMQueryChange.bind(this);
	};

	heir.inherit(MQueryList, EventEmitter);


	/* Methods
	=================================================== */
	MQueryList.prototype.register = function (key, query) {

		var mQuery;

		mQuery = new MQuery(query);

		mQuery.on('init', this._onMQueryChange);
		mQuery.on('destroy', this._onMQueryChange);

		this._queries[key] = mQuery;
	};

	MQueryList.prototype.unregister = function (key) {
		delete this._queries[key];
	};

	MQueryList.prototype.init = function (key) {
		this.doQueryAction(key, 'init');
	};

	MQueryList.prototype.destroy = function (key) {
		this.doQueryAction(key, 'destroy');
	};

	MQueryList.prototype.doQueryAction = function (key, action) {

		var query;

		query = this.get(key);

		if(typeof query !== 'undefined') {

			switch (action) {

				case 'init':
					query.init();
					break;

				case 'destroy':
					query.destroy();
					break;
			}
		}
	};

	MQueryList.prototype.get = function (key) {

		var query;

		if(this._queries.hasOwnProperty(key)) {
			query = this._queries[key];
		}

		return query;
	};

	MQueryList.prototype.getKey = function (query) {

		var searchedKey;

		for(var key in this._queries) {

			if(this._queries[key] === query) {
				searchedKey = key;
			}
		}

		return searchedKey;
	};

	MQueryList.prototype.watch = function () {

		for(var key in this._queries) {

			if(this._queries.hasOwnProperty(key)) {

				this._queries[key].watch();
			}
		}
	};


	/* Event handlers
	=================================================== */
	MQueryList.prototype._onMQueryChange = function (query, action) {

		var key = this.getKey(query);
		this.emit(action + '.' + key);
	};


	/* Export
	=================================================== */
	return MQueryList;


}));
