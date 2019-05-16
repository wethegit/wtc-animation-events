

/**
 * A small library that allows for the detection of and response to the completion of collections of css animations and transitions.
 * ## Install
 * ```sh
 * $ npm install wtc-animation-events
 * ```
 * ## Usage
 * This library has two general uses. The first is to determine how much time a particular transtition will take to complete 
 * (including, optionally, the transition time of all of the children of the element), the second is to add a listener to the 
 * element that triggers when all transitions are complete.
 * 
 * ### detectAnimationEndTime(element[, depth])
 * 
 * | Name | Type | Description |  |
 * | ---- | ---- | ----------- | -------- |
 * | node | `HTMLElement`  | The node to detect the transition time for. | &nbsp; |
 * | depth | `Number`  | How deep to test for transitions, defaults to null, which means no depth limitation | *Optional* |
 * 
 * Firstly, you can use it to find the transition time for an element and all of that element's children. Consider the following HTML and CSS
 * ```html
 * <style>
 * .animation-module {
 *    transition: 1s transform linear;
 *    border: 2px solid pink;
 *    height: 100%;
 *    transform: translateY(0px);
 *    width: 100%;
 *  }
 *  .animation-module__sub {
 *    transition: 1s transform linear;
 *    transition-delay: 500ms;
 *    background: #CCEEFF;
 *    height: 200px;
 *    width: 200px;
 *  }
 *  .animation-module.active {
 *    transform: translateY(50px);
 *  }
 * .animation-module.active .animation-module__sub {
 *    transform: translateY(50px);
 * }
 * </style>
 * <div class="animation-module">
 *  <div class="animation-module__sub"></div>
 * </div>
 * ```
 * 
 * With the following javascript we can determine the full transition time for the `animation-module` element (including its child):
 * ```javascript
 *  setTimeout(()=> {
 *    const module = document.querySelector('.animation-module');
 *    module.className = module.className + ' active';
 *    console.log(WTCAnimationEvents.default.detectAnimationEndTime(module)); // 1500
 *  }, 10.);
 * ```
 * 
 * @static
 * @namespace
 * @module wtc-AnimationEvents
 * @exports WTCAnimationEvents
 * @author Liam Egan <liam@wethecollective.com>
 * @version 0.9
 * @created May 16, 2019
 */
let WTCAnimationEvents = {};

/**
 * This function takes a node and determines the full end time of any transitions
 * on it. Returns the time in milliseconds.
 *
 * @private
 * @param   {HTMLElement} node    The node to detect the transition time for.
 * @param   {Number}      [depth] How deep to test for transitions, defaults to null, which means no depth limitation
 * @return  {Number}              The full transition time for the node, including delays, in milliseconds
 */
const detectAnimationEndTime = function(node, depth = null) {
  var fulltime = 0;
  var timeRegex = /(\d+\.?(\d+)?)(s|ms)/;
  var currentDepth = 0;
  var maxDepth = (typeof depth === 'number' && depth >= 0) ? depth : -1;
  var recursiveLoop = function(el) {
    if(el instanceof Element) {
      var timebreakdown = timeRegex.exec(window.getComputedStyle(el).transitionDuration)
      var delaybreakdown = timeRegex.exec(window.getComputedStyle(el).transitionDelay)
      var time = timebreakdown[1] * (timebreakdown[3] == 's' ? 1000 : 1)
      var delay = delaybreakdown[1] * (delaybreakdown[3] == 's' ? 1000 : 1)
      if(time + delay > fulltime) {
        fulltime = time + delay
      }
    }
    if(maxDepth > -1) {
      if(currentDepth++ < maxDepth) {
        if(el.childNodes) {
          for(var i in el.childNodes) {
            recursiveLoop(el.childNodes[i]);
          }
        }
      }
    } else {
      if(el.childNodes) {
        for(var i in el.childNodes) {
          recursiveLoop(el.childNodes[i]);
        }
      }
    }
  }

  recursiveLoop(node);

  if(typeof fulltime !== 'number') {
    fulltime = 0;
  }

  return fulltime;
}

/**
 * The resolving object for the {@link wtc-AnimationEvents.addEndEventListener}
 *
 * @callback timerResolve
 * @param {string} response           The response from the AJAX call
 * @param {array} arguments           The arguments array originally passed to the {@link AJAX.ajaxGet} method
 * @param {DOMElement} linkTarget     The target element that fired the {@link AJAX.ajaxGet}
 */

/**
 * Allows us to add an end event listener to the node.
 *
 * @param  {HTMLElement}  node      The element to attach the end event listener to
 * @param  {function}     listener  The function to run when the animation is finished. This allows us to construct an object to pass back through the promise chain of the parent.
 * @param  {Number}       [depth]   How deep to test for transitions, defaults to null, which means no depth limitation
 * @return {Promise}                A promise that represents the animation timeout.
 * @return {timerResolve}           The resolve method. Passes the coerced variables (if any) from the listening object back to the chain.
 * @return {timerReject}            The reject method. Null.
 */
const addEndEventListener = function(node, listener, depth) {
  if(typeof listener !== 'function')
  {
    var listener = function(){ return {} };
  }
  return new Promise(function(resolve, reject) {
    var time = detectAnimationEndTime(node, depth);
    var timeout = setTimeout(function() {
      var returner = listener();
      returner.time = time;
      resolve(returner);
    }, time);
  });
}

/**
 * The animation object encapsulates all of the basic functionality that allows us
 * to detect animation etc.
 *
 * @export
 */
WTCAnimationEvents = {
  addEndEventListener: addEndEventListener,
  detectAnimationEndTime: detectAnimationEndTime
};


export default WTCAnimationEvents;
