# wait-for-event

```
    const ee = new EventEmitter();
    var evt = await waitForEvent({
        emitter: ee,
        eventName: 'event-emitted',
        ttl: 3000,
        runner: ()=>{
            setTimeout(()=>{
                // This event will be filtered
                ee.emit('event-emitted', {hello: 'alice'});
            }, 1000);
            setTimeout(()=>{
                // This event will be matched
                ee.emit('event-emitted', {hello: 'bob'});
            }, 2000);
        },
        filter: (evt)=>{
            return evt.hello === 'bob'
        }
    });
    console.log("event", evt);    
```