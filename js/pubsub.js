/* jshint esversion:6 */

/* Use:

   Assume three modules: A, B and C

   // Module A subscribes to an event:
   events.on('eventName', someHandler);
   
   // Module B subscribes to an event:
   events.on('eventName', someOtherHandler);
   
   Those subscriptions register the events in the events object, pushing
   each function on to each event's array. After those subscriptions, the
   events object would look like this:
   
   events = {
       eventName: [
           someHandler,
           someOtherHandler
       ]
   }
   
   // Then when Module C publishes (emits) an event:
   events.emit('eventName', 3);
   
   We look for the event name in the 'events' object, and execute each
   function in its array of callbacks, passing 'data' to those functions.
   Given the above example, we fire:
      someHandler(3)
      someOtherHandler(3)
   
*/

var events = (function() {
    
    var events = {};
    
    
    /* ========================== PUBLIC METHODS =========================== */
    
    // Subscribe to an event on receipt of 'eventName'.
    // Registers a callback in our events object, keyed to the event name.
    function on(eventName, fn) {
        events[eventName] = events[eventName] || [];
        events[eventName].push(fn);
    }
    
    
    // Unsubscribe from an event on receipt of 'eventName'.
    // Removes the associated callback from our events object.
    function off(eventName, fn) {
        if (events[eventName]) {
            for (let i = 0; i < events[eventName].length; i += 1) {
                if (events[eventName][i] === fn) {
                    events[eventName].splice(i, 1);
                    break;
                }
            }
        }
    }
    
    // publish event emitter 'eventName', passing 'data' to all registered
    // callbacks linked to the event name in our 'events' object
    function emit(eventName, data) {
        if (events[eventName]) {
            events[eventName].forEach( (fn) => {
                fn(data);
            });
        }
    }
    
    
    /* ============================ EXPORT API ============================= */
    
    return {
        on   : on,
        off  : off,
        emit : emit
    };
    
}());
