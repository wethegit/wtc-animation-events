# wtc-animation-events *0.0.1*

> A small library that allows for the detection of and response to the completion of collections of css animations and transitions.


### src/wtc-animation-events.js


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
