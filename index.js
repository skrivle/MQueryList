(function (root, factory) {
	if (typeof define === 'function' && define.amd) {

		// AMD
		define(['./lib/MQuery', './lib/MQueryList'], factory);

	} else if (typeof exports === 'object') {

		// CommonJS
		module.exports = factory(require('./lib/MQuery'), require('./lib/MQueryList'));

	} else {

		// Browser
		window.MQueryList = factory(MQuery, MQueryList);
	}
}(this, function (
	MQuery,
	MQueryList,
) {

	return {
		MQuery: MQuery,
		MQueryList: MQueryList
	};

}));
