/**
 * Userpost model events
 */

'use strict';

import {EventEmitter} from 'events';
var UserpostEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
UserpostEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Userpost) {
  for(var e in events) {
    let event = events[e];
    Userpost.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    UserpostEvents.emit(event + ':' + doc._id, doc);
    UserpostEvents.emit(event, doc);
  };
}

export {registerEvents};
export default UserpostEvents;
