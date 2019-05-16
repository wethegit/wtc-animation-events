# wtc-animation-events *0.0.1*

> A small library that allows for the detection of and response to the completion of collections of css animations and transitions.


### src/wtc-animation-events.js


#### WTCAnimationEvents() 

A small library that allows for the detection of and response to the completion of collections of css animations and transitions.
## Install
```sh
$ npm install wtc-animation-events
```
## Usage
This library has two general uses. The first is to determine how much time a particular transtition will take to complete 
(including, optionally, the transition time of all of the children of the element), the second is to add a listener to the 
element that triggers when all transitions are complete.

### detectAnimationEndTime(element[, depth])

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| element | `HTMLElement`  | The node to detect the transition time for. | &nbsp; |
| depth | `Number`  | How deep to test for transitions, defaults to null, which means no depth limitation | *Optional* |

Firstly, you can use it to find the transition time for an element and all of that element's children. Consider the following HTML and CSS
```html
<style>
.animation-module {
   transition: 1s transform linear;
   border: 2px solid pink;
   height: 100%;
   transform: translateY(0px);
   width: 100%;
 }
 .animation-module__sub {
   transition: 1s transform linear;
   transition-delay: 500ms;
   background: #CCEEFF;
   height: 200px;
   width: 200px;
 }
 .animation-module.active {
   transform: translateY(50px);
 }
.animation-module.active .animation-module__sub {
   transform: translateY(50px);
}
</style>
<div class="animation-module">
 <div class="animation-module__sub"></div>
</div>
```

With the following javascript we can determine the full transition time for the `animation-module` element (including its child):
```javascript
 setTimeout(()=> {
   const module = document.querySelector('.animation-module');
   module.className = module.className + ' active';
   console.log(WTCAnimationEvents.default.detectAnimationEndTime(module)); // 1500
 }, 10.);
```

### addEndEventListener(element [, listener [, depth]])

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| element | `HTMLElement`  | The node to detect the transition time for. | &nbsp; |
| listener | `function`  | The function to call when all of the transitions are complete, this function is expected to return an object, to which will be appended the amount of time that has passed in transition  | *Optional* |
| depth | `Number`  | How deep to test for transitions, defaults to null, which means no depth limitation | *Optional* |

This method attaches a single-run pseudo event listener to the element that returns a promise that represents the resolution of the animation.
Calling `then` on this promise will allow you to run a method when the promise completes.

```javascript

 Animation.
   addEndEventListener(DOMTarget, null, this.animationDepth).
   then(function(resolver) {
     console.log(resolver.time); // 1500
   }.bind(this))
```






##### Returns


- `Void`



#### detectAnimationEndTime(node[, depth])  *private method*

This function takes a node and determines the full end time of any transitions
on it. Returns the time in milliseconds.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| node | `HTMLElement`  | The node to detect the transition time for. | &nbsp; |
| depth | `Number`  | How deep to test for transitions, defaults to null, which means no depth limitation | *Optional* |




##### Returns


- `Number`  The full transition time for the node, including delays, in milliseconds



#### addEndEventListener(node, listener[, depth]) 

Allows us to add an end event listener to the node.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| node | `HTMLElement`  | The element to attach the end event listener to | &nbsp; |
| listener | `function`  | The function to run when the animation is finished. This allows us to construct an object to pass back through the promise chain of the parent. | &nbsp; |
| depth | `Number`  | How deep to test for transitions, defaults to null, which means no depth limitation | *Optional* |




##### Returns


- `Promise`  A promise that represents the animation timeout.
- `timerResolve`  The resolve method. Passes the coerced variables (if any) from the listening object back to the chain.
- `timerReject`  The reject method. Null.




*Documentation generated with [doxdox](https://github.com/neogeek/doxdox).*
