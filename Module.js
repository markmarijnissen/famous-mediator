define(function(require, exports, module) {
  var EventHandler = require('famous/core/EventHandler');
  var OptionsManager = require('famous/core/OptionsManager');

  /**
   * Useful for quickly creating elements within applications
   *   with large event systems.  Consists of an input 
   *   EventHandler and an output EventHandler.
   *   Meant to be extended by the developer.
   *
   * @class Module
   * @uses EventHandler
   * @uses OptionsManager
   * @constructor
   */
  function Module(options) {
      this._eventInput = new EventHandler();
      this._eventOutput = new EventHandler();
      EventHandler.setInputHandler(this, this._eventInput);
      EventHandler.setOutputHandler(this, this._eventOutput);

      this.options = Object.create(this.constructor.DEFAULT_OPTIONS || Module.DEFAULT_OPTIONS);
      this._optionsManager = new OptionsManager(this.options);

      if (options) this.setOptions(options);
  }

  Module.DEFAULT_OPTIONS = {}; // no defaults

  /**
   * Look up options value by key
   * @method getOptions
   *
   * @param {string} key key
   * @return {Object} associated object
   */
  Module.prototype.getOptions = function getOptions() {
      return this._optionsManager.value();
  };

  /*
   *  Set internal options.
   *  No defaults options are set in Module.
   *
   *  @method setOptions
   *  @param {Object} options
   */
  Module.prototype.setOptions = function setOptions(options) {
      this._optionsManager.patch(options);
  };


  module.exports = Module;

});