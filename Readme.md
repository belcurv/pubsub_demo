### Readme

Based on videos 4 and 5 from the Modular Javascript series:

[#4 - PubSub JavaScript Design](https://www.youtube.com/watch?v=nQRXi1SVOow&list=PLoYCgNOIyGABs-wDaaxChu82q_xQgUb4f&index=4)

[#5 - PubSub Implementation](https://www.youtube.com/watch?v=jDhDvnlbr4Q&index=5&list=PLoYCgNOIyGABs-wDaaxChu82q_xQgUb4f)

#### Summary

Revealing module pattern is great for isolating code into functional units that hide private properties and reveal public ones. If an app has, let's say, less than 10 modules, it's not too hard to keep each module updated with data from other modules by calling those modules' public methods directly.

For example, after actually rendering the DOM our People module's public `render` method might need to update multiple other modules with changes to its `people` collection:

```javascript
    function _render() {

        /* ... snip ... */
        
        // call other module's public methods with updates
        stats.setPeople(people.length);
        header.updatePeople(people.length);
        footer.countPeople(people);
        modal.reportPeople({ count : people.length});
        settings.setPeople(people);
    }
```

The problem is, each of those other modules might have a slightly different API - maybe we didn't write them, so their public methods might have unique names or expect the data in unique ways. And what if those modules' APIs change? This **tight coupling** is a management nightmare in a larger application.

Enter **PubSub** pattern.

With PubSub we fire a single command and every other module automatically updates. This **loose coupling** means we don't have to keep track of all the other modules' APIs.

PubSub depends on modules **publishing** and **subscribing to** events. Subscribers automatically update when a subject module emits an event they have subscribed to.

**In use:**

Assume three modules: A, B and C...  we want modules A and B to _listen for_ specific events. Similar to how we bind DOM events to event handlers, we can bind emitted event messages to our event handlers too.

Module A subscribes to an event in its private `_bindEvents()` method:
```javascript
    function _bindEvents() {
        events.on('eventName', someHandler);
    }
```

Module B subscribes to the same event:
```javascript
    function _bindEvents() {
        events.on('eventName', someOtherHandler);
    }
```

Those subscriptions register the events on the `events` object, pushing the specified event handlers on to each event's array. After registering those subscriptions, the `events` object would look like this if were we able to inspect it:

```javascript
    events = {
       eventName: [
           someHandler,
           someOtherHandler
       ]
    }
```

When Module C emits an event, the Events module searches for the specified event name in its `events` object, and if found, executes each callback in that event's array of associated functions, passing `data` to each function. For example, say Module C publishes an 'eventName' event:

```javascript
    events.emit('eventName', 3);
```

Our Events module finds `eventName` in its `events` object since both Module A and B are subscribing to that event. And then each callback associated with `eventName` is fired in order, with `3` passed as data. Effectively:

```javascript
    someHandler(3);
    someOtherHandler(3);
```
