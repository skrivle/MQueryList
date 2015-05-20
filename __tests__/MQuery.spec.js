(function () {

	'use strict';

	jest.dontMock('../lib/MQuery');
	jest.dontMock('heir');
	jest.dontMock('wolfy87-eventemitter');
	jest.dontMock('../__mocks__/window');

	jest.setMock('../lib/window', require('../__mocks__/window'));

	var MQuery = require('../lib/MQuery');

	var instance;

	beforeEach(function () {
		instance = new MQuery('');
	});

	describe('# --- isActive ---', function () {

		it('should default to false', function () {
			expect(instance.isActive()).toBe(false);
		});
	});

	describe('# --- init ---', function () {

		it('should emit an init event', function () {

			var called = false;

			instance.on('init', function () {
				called = true;
			});

			instance.init();

			expect(called).toBe(true);
		});

		it('should set the activate the query', function () {
			instance.init();
			expect(instance.isActive()).toBe(true);
		});

	});

	describe('# --- destroy ---', function () {

		it('should emit a destroy event', function () {

			var called = false;

			instance.on('destroy', function () {
				called = true;
			});

			instance.destroy();

			expect(called).toBe(true);

		});

		it('should deactive the query', function () {

			instance.init();
			instance.destroy();

			expect(instance.isActive()).toBe(false);

		});
	});

	describe('# --- watch ---', function () {

		it('Should register an eventListener on the MediaQueryList object', function () {

			spyOn(instance._mql, 'addListener');

			instance.watch();

			expect(instance._mql.addListener).toHaveBeenCalled();

		});

		it('Should do an initial check to see if MediaQueryList has matches', function () {

			spyOn(instance, '_onChange');

			instance.watch();

			expect(instance._onChange).toHaveBeenCalled();

		});

	});

	describe('# --- stopWatching ---', function () {

		it('should remove the eventListener from the MediaQueryList object', function () {

			spyOn(instance._mql, 'removeListener');

			instance.watch();
			instance.stopWatching();

			expect(instance._mql.removeListener).toHaveBeenCalled();

		});
	});

	describe('# --- _onChange ---', function () {

		it('should call the init() method when the MediaQueryList has matches', function () {

			spyOn(instance, 'init');
			instance._mql.matches = true;

			instance._onChange();

			expect(instance.init).toHaveBeenCalled();

		});

		it('should call the destroy() method when the MediaQueryList has no matches', function () {

			spyOn(instance, 'destroy');
			instance._mql.matches = false;

			instance._onChange();

			expect(instance.destroy).toHaveBeenCalled();
		});
	});

})();
