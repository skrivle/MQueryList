# Attention!

This module isn't usable yet, it's work in progress.

# MQueryList && MQuery

The MQueryList provides you with a more convenient API to interact with media queries in Javascript. This package exists out of two Classes:

- MQuery
- MQueryList


The MQuery class represents a single media query. You can choose whether you want to use the MQuery class on it's own and create a separate instance per query or you can create instances through a more higher level API which is provided by the MQueryList.

The MQueryList provides you with the possiblilty to create multiple MQuery instances and store them in a single object (MQueryList instance). This way you can use one object throughout your app to listen for media query changes.

Please note that this project isn't a window.matchMedia() polyfill. It is build upon window.matchMedia() and you will need to include a polyfill to make it work in browsers that don't support window.matchMedia(). Paul Irish did a great job writing one, you can find it at https://github.com/paulirish/matchMedia.js/

## MQuery

``` javascript
var myQuery = new MQuery('only screen and (max-width: 480px)');

myQuery.on('init', function () {
	console.log('This is a small screen ...');
});

myQuery.on('destroy', function () {
	console.log('This is a bigger screen ...');
});

myQuery.watch();

```
The watch() method will start listening for changes on the media query object. It will make sure events are triggered on the MQuery instance when the query has matches or doesn't has matches anymore. 

It's important to know that you can also manually activate an MQuery instance. This can be usefull in situations where you know media queries aren't supported, for example in IE8. In many cases you will just serve a desktop css file to IE8 and you also want to make sure the corresponding scripts are correctly initialised. The only thing you need to do is call the init() method on the MQuery instance to let your application know your showing the desktop view.

```javascript
var myQuery = new MQuery('only screen and (max-width: 480px)');

myQuery.on('init', function () {
	console.log('This is a small screen ...');
});

myQuery.on('destroy', function () {
	console.log('This is a bigger screen ...');
});

myQuery.init();
```

## MQueryList

``` javascript
var myList = new MQueryList();

myList.register('mobileAndDown', 'only screen and (max-width: 480px)');
myList.register('tabletAndUp', 'only screen and (min-width: 481px)');

myList.on('mobileAndDown.init', function () {
	console.log('Do stuff for mobile ...');
});

myList.on('tabletAndUp.init', function () {
	console.log('Do stuff for tablet ...');
});

myList.on('mobileAndDown.destroy', function () {
	console.log('Stop doing stuff for mobile ...');
});

myList.on('tabletAndUp.destroy', function () {
	console.log('Stop doing stuff for tablet ...');
});

myList.watch();

```

It's possible to retrieve MQuery instance from an MQueryList instance by using the get method

``` javascript
var myQuery = myList.get('mobileAndDown');
```
