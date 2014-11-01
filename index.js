define(function(require, exports, module) {
  var Engine = require('famous/core/Engine');

  // Create Mediator object
  var Mediator = {};
  
  // Callback list for Mediator.ready([a,b,c],function(a,b,c){ ... })
  var CallbackList = [];

  // cache for all modules
  var Modules = window.Modules = {};

  /*
    For each module you want to mediate, emit a 'created' event on the Engine.

    Example: Router.js

    function Router(){
       ....
       Engine.emit('created',this);
    }
    
   */
  Engine.on('created',function(module){
    
    // Try to find a name
    var name;
    if(module.options) {
      name = module.options.id || module.options.name || module.id || module.name;
    } else {
      name = module.id || module.name;
    }

    // ready name is found
    if(name) {
      // store module
      Modules[name] = module;

      // Check callbacks that are waiting
      CallbackList.forEach(function(item,callbackIndex){
        // it this callback waiting for current module?
        var moduleIndex = item.waitFor.indexOf(name);
        // if so...
        if(moduleIndex > -1){
          // ...remove module from 'wait' list
          item.waitFor.splice(moduleIndex,1);
          // Are we finished loading all modules?
          if(item.waitFor.length === 0){
            // map names to actual modules
            var modules = item.modules.map(function(name){ return Modules[name]; });
            // invoke callback
            item.callback.apply(null,modules);
            // remove callback from list
            CallbackList.splice(callbackIndex,1);
          }
        }
      });
    }
  });
  
  /*
    Mediator.ready(modules,callback)

    Waits for until `modules` to exist before executing callback.

    Use this to couple modules together in your custom Mediators.

    Example: RouterMediator.js

    Mediator.ready(['Router','PageController'],function(router,page) { 
      router.on('change',page.update) 
    })

   */
  Mediator.ready = function ready(modules,callback){
    var waitFor = modules.filter(function(name){ return !Modules[name]; });
    // All modules are already loaded! Invoke immediatly
    if(waitFor.length === 0){
      modules = modules.map(function(name){ return Modules[name]; });
      callback.apply(null,modules);
    // Waiting for modules. Invoke later.
    } else {
      CallbackList.push({
        waitFor:waitFor,
        modules:modules,
        callback:callback
      });
    }
  };

  /*
    Mediator.on

    Mediator.on('navigate',['Router'],function(event,router){ .... })

    Use for global events, i.e. events whose information is insensitive to context.

    Example: A 'navigate' or 'tweet' event doesn't care about its sender or context
    Counter example: A 'click' event might mean different things depending on its context (surface).

   */
  Mediator.on = function(eventName,modules,callback) {
    if(typeof modules === 'function') {
      callback = modules;
      modules = [];
    }
    Engine.on(eventName,function(data){
      Mediator.ready(modules,function(){
        var args = Array.prototype.slice.call(arguments,0);
        args.unshift(data);
        callback.apply(null,args);
      });
    });
  };

  // Alias!
  Mediator.emit = Engine.emit;

  module.exports = Mediator;
});