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
		root.MQueryList = factory(root.heir, root.EventEmitter, root.MQuery);
	}
}(this, function (
	heir,
	EventEmitter,
	MQuery
){

	'use strict';

	/* Constructor
	=================================================== */

	/**
	 * MQueryList constructor
	 */
	var MQueryList = function () {
		this._queries = {};
		this._onMQueryChange = this._onMQueryChange.bind(this);
	};

	heir.inherit(MQueryList, EventEmitter);


	/* Methods
	=================================================== */

	/**
	 * Stores an MQuery instance in the list.
	 *
	 * @param  {String}
	 * @param  {String}
	 * @return {MQueryList}
	 */
	MQueryList.prototype.register = function (key, query) {

		var mQuery;

		mQuery = new MQuery(query);

		mQuery.on('init', this._onMQueryChange);
		mQuery.on('destroy', this._onMQueryChange);

		this._queries[key] = mQuery;

		return this;
	};

	/**
	 * Removes an entry from the list.
	 *
	 * @param  {String}
	 * @return {MQueryList}
	 */
	MQueryList.prototype.unregister = function (key) {
		delete this._queries[key];

		return this;
	};

	/**
	 * Actives the MQuery instance at the given key
	 *
	 * @param  {String}
	 * @return {MQueryList}
	 */
	MQueryList.prototype.init = function (key) {
		this.doQueryAction(key, 'init');

		return this;
	};

	/**
	 * Deactivate the MQuery instance at the given key
	 *
	 * @param  {String}
	 * @return {MQueryList}
	 */
	MQueryList.prototype.destroy = function (key) {
		this.doQueryAction(key, 'destroy');

		return this;
	};

	/**
	 * Calls a given action on the MQuery instance at
	 * the given key.
	 *
	 * @param  {String}
	 * @param  {String}
	 * @return {MQueryList}
	 */
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

		return this;
	};

	/**
	 * Get an MQuery instance by key
	 *
	 * @param  {String}
	 * @return {MQuery}
	 */
	MQueryList.prototype.get = function (key) {

		var query;

		if(this._queries.hasOwnProperty(key)) {
			query = this._queries[key];
		}

		return query;
	};

	/**
	 * Get the key of a given MQuery instance
	 *
	 * @param  {MQuery}
	 * @return {String}
	 */
	MQueryList.prototype.getKey = function (query) {

		var searchedKey;

		for(var key in this._queries) {

			if(this._queries[key] === query) {
				searchedKey = key;
			}
		}

		return searchedKey;
	};

	/**
	 * Start watching for changes on all the MQuery instances
	 *
	 * @return {MQueryList}
	 */
	MQueryList.prototype.watch = function () {

		for(var key in this._queries) {

			if(this._queries.hasOwnProperty(key)) {

				this._queries[key].watch();
			}
		}

		return this;
	};


	/* Event handlers
	=================================================== */

	/**
	 * Gets called when an MQuery instance emits a change
	 * event. Makes sure the events are correctly propagated.
	 *
	 * @param  {MQuery}
	 * @param  {String}
	 * @return {void}
	 */
	MQueryList.prototype._onMQueryChange = function (query, action) {

		var key = this.getKey(query);
		this.emit(action + '.' + key);
	};


	/* Export
	=================================================== */
	return MQueryList;


}));
