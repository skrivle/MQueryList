(function (root, factory) {
	if (typeof define === 'function' && define.amd) {

		// AMD
		define(['inherit', 'MQuery', 'eventEmitter'], factory);

	} else if (typeof exports === 'object') {

		// CommonJS
		module.exports = factory(require('inherit'), require('MQuery'), require('wolfy87-eventemitter'));

	} else {

		// Browser
		window.MediaQuery = factory(inherit, MQuery, window.EventEmitter);
	}
}(this, function (
	inherit,
	MQuery,
	EventEmitter,
) {

	/* Constructor
	=================================================== */


	/* Methods
	=================================================== */


	/* Event handlers
	=================================================== */


	/* Export
	=================================================== */

}));
