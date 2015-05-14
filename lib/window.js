(function (root, factory) {
	if (typeof define === 'function' && define.amd) {

		// AMD
		define([], factory);

	} else if (typeof exports === 'object') {

		// CommonJS
		module.exports = factory();

	} else {

		// Browser
		window = factory();
	}
}(this, function () {

	return window;

}));
