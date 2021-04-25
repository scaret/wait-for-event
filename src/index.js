"use strict";

export default function waitForEvent(options) {
    let emitter = options.emitter;
    let eventName = options.eventName;
    let runner = options.runner;
    let filter = options.filter;
    let ttl = options.ttl || 0;

    return new Promise((resolve, reject) => {

        let timeout;
        let ended = false;

        const cb = (msg) => {
            if (filter && !filter(msg)){
                return
            }
            if (!ended){
                ended = true;
                clearTimeout(timeout);
                emitter.removeListener(eventName, cb);
                resolve(msg);
            }
        };

        if (ttl) {
            timeout = setTimeout(
                () => {
                    if (!ended){
                        ended = true;
                        clearTimeout(timeout)
                        emitter.removeListener(eventName, cb);
                        reject(`timed out after ${ttl}ms:${eventName}`);
                    }
                },
                ttl
            );
        }
        emitter.on(eventName, cb);
        if (runner){
            runner()
        }
    });
}