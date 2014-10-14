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

*Router.js*
```javascript
  function Router(){
    // blablabla
    this.name = 'router';
    Engine.emit('created',this) // broadcast created event
    // blablabla
  }
```

*PageController.js*
```javascript
  function PageController(){
    // blablabla
    this.name = 'pages';   // name your module
    Engine.emit('created',this) // broadcast created event
    // blablabla
  }
```

*RouteMediator.js*
```javascript
  var Mediator = require('famous-mediator');
  var Engine = require('famous/core/Engine');

  // Mediator emits the 'router' event
  Engine.on('created:Router',function(router){
    // imagine your router emits a 'change' event
    router.on('change',function(name){
      // then we couple router to the pages!
      Mediator.pages.setPage(name);
    });
  });
```

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
  Engine.on('created:xxxx',function(xxxx){ .... });
```

The idea is to write Mediator singletons that couple modules together by:

- listening to the events they emit
- calling the public API
- triggering events on a module


## Contribute

Feel free to contribute to this project in any way. The easiest way to support this project is by giving it a star.

## Contact
-   @markmarijnissen
-   http://www.madebymark.nl
-   info@madebymark.nl

© 2014 - Mark Marijnissen