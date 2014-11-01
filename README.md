famous-mediator
===============

A design pattern that decouples modules using the mediator pattern.

## Getting started

Install using bower or npm

```bash
  bower install famous-mediator
  npm install famous-mediator
```

## Benefits

Use the mediator pattern to decouple modules

* Promotes clean, reusable modules
* Clear seperation of concerns - no more sneaky business logic in your templates!
* Is the perfect place for hacks, experiments, monkey-patches and workarounds. And because all of your "bad" code is in the Mediators, your actual code base stays clean! (True story!)

## Example

Imagine you have a `router` module and a `pages` module:

*1. Router.js - just tracks navigation and doesn't know about other modules*
```javascript
  function Router(){
    // blablabla
    this.name = 'router';
    Engine.emit('created',this) // broadcast created event
    // blablabla
  }
```

*2. PageController.js - just displays pages but doesn't know how to route & navigate!*
```javascript
  function PageController(){
    // blablabla
    this.name = 'pages';   // name your module
    Engine.emit('created',this) // broadcast created event
    // blablabla
  }

  // It emits an application wide event if a link is clicked.
  PageController.prototype.onLinkClick = function(event) {
    Engine.emit('link-clicked',event.target.getAttribute('href'));
  }
}
```

*3. RouteMediator.js - couples the router and pages together!*
```javascript
  var Mediator = require('famous-mediator');

  // Router -> PageController
  Mediator.ready(['router','pages'],function(router,pages){
    router.on('change',function(name){
      pages.setPage(name);
    });
  });

  // PageController -> Router
  //
  // mediator translates 'link-clicked' from page to an actual
  // navigation in the router.
  Mediator.on('link-clicked',['router'],function(href,router){
    router.set(href);
  });
```

## Usage

The idea is to write Mediator singletons that couple modules together by:

1. Listen to events from one module, or listen to global events.
2. Call public API of another module

### Step 1: Create modules

The Famo.us Engine is used as a global eventbus to announce creation of modules. If you want to register a module, simple add to your constructor function:

```javascript
  Engine.emit('created',this)
````

A module MUST have a name to be registered. This name can be found on:

- this.options.id = 'myCoolModule'
- this.options.name = 'myCoolModule'
- this.id = 'myCoolModule'
- this.name = 'myCoolModule'

**Note:**

I am using the `Engine` so that this `Mediator` module becomes an *optional* dependency. This enables component authors to facilitate a meditator pattern without enforcing this pattern on all users.

### Step 2: Couple modules

The module with the name `myCoolModule` is accessible using `Mediator.ready(moduleArray,readyCallback)`:

```
  var Mediator = require('famous-mediator');
  Mediator.ready(['myCoolModule'],function(myCoolModule){ .... });
```

You can also mediate using global events and `Mediator.on(eventName,moduleArray,eventcallback)`

```
  // in PageController.js
  Engine.emit('link-clicked','/homepage');

  // in RouterMediator.js
  Engine.on('link-clicked',['router'],function(href,router){
    router.set(href);
  })
```

As you can see, you can specify a module array to ensure modules are ready.

## Tips

### Use global events where you can

* If there is only a single instance of the module
* If the context of the module is not important

Example: A 'navigate' or 'tweet' event doesn't care about its sender or context
Counter example: A 'click' event might mean different things depending on its context (surface).

### Write multiple mediators

Write mediators for routing, error handling, data-flow, etc. This makes it easier to maintain your software. (i.e. when you decide to switch from an REST API to Firebase, you can simply rewrite the data mediator)

### If you hack, hack in the mediators

Keep your codebase clean and only add hacks in your mediators.

* Mediators are application-specific and have little code. They are by definition not re-usable (because they couple). This makes it the perfect place to write hacks (which is usually highly app-specific code).
* Mediators are high-level which make them safer to hack. When you tweak/modify/hack low-level code, you risk regression bugs and breaking everything that depends on it.


## Changelog

### 0.2.0 (1/10/2014)

* Added `Mediator.ready` and `Mediator.on`
* Updated README.

## Contribute

Feel free to contribute to this project in any way. The easiest way to support this project is by giving it a star.

## Contact
-   @markmarijnissen
-   http://www.madebymark.nl
-   info@madebymark.nl

© 2014 - Mark Marijnissen