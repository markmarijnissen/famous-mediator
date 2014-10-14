define(function(require, exports, module) {
  /**
   * Example mediator.
   *
   * Usage:
   * ```` 
   *   // in your main.js
   *   require('famous-mediator/ErrorMediator'); 
   *
   *   // in some module
   *   Engine.emit('error',{
   *      target: this, // a string or a instantiated object
   *      message: '....' // the error message
   *      data: {} // optional data
   *   })
   * ```
   *
   * The beauty of mediators is loose coupling.
   *
   * It's easy to write your own error mediator, and you don't have to touch
   * your app code!
   *
   * You could write an ErrorMediator to show a popup, send a log to server, etc, etc!
   */

  var Engine = require('famous/core/Engine');

  Engine.on('error',function(err){
    var target = typeof err.target == "string"? err.target: err.target && err.target.constructor && err.target.constructor.name? err.target.constructor.name: err.target || "UnknownTarget";
    console.error("Error "+target+": "+err.message,err.data);
  });
});