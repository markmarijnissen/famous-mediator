famous-mediator
===============

A design pattern that decouples modules using the mediator pattern.

## Getting started

Install using bower or npm

```bash
  bower install famous-mediator
  npm install famous-mediator
```
## Example

Imagine you have a `Router` module and a `pages` module:

*1. Router.js - does it's thing and doesn't know about other modules*
```javascript
  function Router(){
    // blablabla
    this.name = 'router';
    Engine.emit('created',this) // broadcast created event
    // blablabla
  }
```

*2. PageController.js - displays pages but doesn't know about any routes!*
```javascript
  function PageController(){
    // blablabla
    this.name = 'pages';   // name your module
    Engine.emit('created',this) // broadcast created event
    // blablabla
  }
```

*3. RouteMediator.js - couples the router and pages together!*
```javascript
  var Mediator = require('famous-mediator');;

  Mediator.on('created:Router',function(router){
    router.on('change',function(name){
      Mediator.pages.setPage(name);
    });
  });
```

## Benefits

Using the mediator pattern to decouple modules

* Promotes clean, reusable modules
* Clear seperation of concerns - no more sneaky business logic in your templates!
* Is the perfect place for hacks, experiments, monkey-patches and workarounds. And because all of your "bad" code is in the Mediators, your actual code base stays clean! (True story!)

## Usage

The Famo.us Engine is used as a global eventbus to announce creation of modules. If you want to register a module, simple call in your constructor function:

```javascript
  Engine.emit('created',this)
````

A module MUST have a name to be registered. This name can be found on:

- this.options.id = 'xxxx'
- this.options.name = 'xxxx'
- this.id = 'xxxx'
- this.name = 'xxxx'

The module with the name `xxxx` is accessible as follows:

```
  var Mediator = require('famous-mediator');
  Mediator.xxxx
  Mediator.on('created:xxxx',function(xxxx){ .... });
```

The idea is to write Mediator singletons that couple modules together by:

- listening to the events they emit
- calling the public API
- triggering events on a module

## Changelog

### 0.1.1 (31/10/2014)

* Aliased `Mediator.on` to `Engine.on`.

## Contribute

Feel free to contribute to this project in any way. The easiest way to support this project is by giving it a star.

## Contact
-   @markmarijnissen
-   http://www.madebymark.nl
-   info@madebymark.nl

© 2014 - Mark Marijnissen