define(function(require, exports, module) {
  /*
     
  The Famo.us Engine is used as a global eventbus to announce creation of modules.

  If you want to register a module, simple call in your constructor function:

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

  For example, imagine you have a `Router` module and a `pages` module:

  ```
    var Mediator = require('famous-mediator');
    var Engine = require('famous/core/Engine');

    Engine.on('created:Router',function(router){
      router.on('change',function(name){
        Mediator.pages.set(name);
      });
    });
  ```
  */
  
  var Engine = require('famous/core/Engine');

  // cache for all modules that are created
  var modules = window.Modules = {};

  // when a module is created...
  Engine.on('created',function(module){
    
    // try to find a name
    var name;
    if(module.options) {
      name = module.options.id || module.options.name || module.id || module.name;
    } else {
      name = module.id || module.name;
    }

    // when name is found
    if(name) {
      modules[name] = module;               // store module for later reference      
      Engine.emit('created:'+name,module);  // broadcast module creation
    }
  });

  module.exports = modules;
});