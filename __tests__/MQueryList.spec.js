(function () {

	'use strict';

	jest.dontMock('heir');
	jest.dontMock('wolfy87-eventemitter');
	jest.dontMock('../lib/MQueryList');
	jest.dontMock('../lib/MQuery');

	jest.setMock('../lib/window', require('../__mocks__/window'));

	var MQueryList = require('../lib/MQueryList');

	var instance;

	beforeEach(function () {
		instance = new MQueryList();
	});

	describe('# --- get ---', function () {

		it('should be defined', function () {
			expect(typeof instance.get).toBe('function');
		});

		it('should not throw an error when the given key does not exist', function () {
			expect(instance.get('test')).toBeUndefined();
		});
	});

	describe('# --- register ---', function () {

		it('should add an MQuery instance to the list', function () {

			var query = '(max-width: 320px)';

			expect(instance.get('mobile')).toBeUndefined();

			instance.register('mobile', query);

			expect(instance.get('mobile')).toBeDefined();
		});
	});

	describe('# --- unregister ---', function () {

		it('should remove the key from the list', function () {

			instance.register('mobile', '(max-width: 320px)');
			instance.unregister('mobile');

			expect(instance.get('mobile')).toBeUndefined();
		});
	});

	describe('# --- init/destroy ---', function () {

		var mQuery;

		beforeEach(function () {

			instance.register('mobile', '(max-width: 320px)');
			mQuery = instance.get('mobile');
		});

		it('should call the init/destroy method on the given MQuery instance', function () {

			spyOn(mQuery, 'init');
			spyOn(mQuery, 'destroy');

			instance.init('mobile');
			instance.destroy('mobile');

			expect(mQuery.init).toHaveBeenCalled();
			expect(mQuery.destroy).toHaveBeenCalled();
		});

		it('should propagate init and destroy event correctly', function () {

			var initCalled, destroyCalled;

			initCalled = false;
			destroyCalled = false;

			instance.on('init.mobile', function () {
				initCalled = true;
			});

			instance.on('destroy.mobile', function () {
				destroyCalled = true;
			});

			mQuery.emit('init', mQuery, 'init');
			mQuery.emit('destroy', mQuery, 'destroy');

			expect(initCalled).toBe(true);
			expect(destroyCalled).toBe(true);
		});
	});

	describe('# --- watch ---', function () {

		it('should start watching all MQuery instances', function () {

			var key;

			instance.register('mobile', '(max-width: 320px)');
			instance.register('tablet', '(min-width: 720px)');
			instance.register('desktop', '(min-width: 1024px)');

			for(key in instance._queries) {
				if(instance._queries.hasOwnProperty(key)) {
					spyOn(instance._queries[key], 'watch');
				}
			}

			instance.watch();

			for(key in instance._queries) {
				if(instance._queries.hasOwnProperty(key)) {
					expect(instance._queries[key].watch).toHaveBeenCalled();
				}
			}

		});

	});

})();
