# Attention!

This module isn't usable yet, it's work in progress.

# MQueryList && MQuery

The MQueryList provides you with a more convenient API to interact with media queries in Javascript. This package exists out of two Classes:

- MQuery
- MQueryList


The MQuery class represents a single media query. You can choose you whether you want to use the MQuery class on it's self and create a separate instance/query or through the more higher level API which is provided by the MQueryList.

The MQueryList provides you with the possiblilty to create multiple MQuery instances and store them in a single object (MQueryList instance). This way you can use one object throughout your app to listen for media query changes.

Please note that this project isn't a window.matchMedia() polyfill. It is build upon window.matchMedia() and you will need to include a polyfill to make it work in browsers that don't support window.matchMedia(). Paul Irish did a great job writing one, you can find it a https://github.com/paulirish/matchMedia.js/

## MQuery

``` javascript
var myQuery = new MQuery('only screen and (max-width: 480px)');

myQuery.on('init', function () {
	console.log('This is a small screen ...');
});

myQuery.on('destroy', function () {
	console.log('This is a bigger screen ...');
});
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
```
