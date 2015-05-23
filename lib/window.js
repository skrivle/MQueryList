(function (root, factory) {

	'use strict';

	if (typeof define === 'function' && define.amd) {

		// AMD
		define([], factory);

	} else if (typeof exports === 'object') {

		// CommonJS
		module.exports = factory();

	} else {

		// Browser
		root.win = factory();
	}
}(this, function () {

	'use strict';

	// This module is only used to be able to mock
	// the window object in unit tests.
	return window;

}));
