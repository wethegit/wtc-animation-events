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
