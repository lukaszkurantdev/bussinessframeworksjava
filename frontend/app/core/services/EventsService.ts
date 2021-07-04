import { EventEmitter, Listener } from 'events';

/**
  * List of events used in application.
*/
export const EventsPoints = {
  FUNCTION_UNAVAILABLE: 'function_unavailable',
  HELPER_TOGGLE: 'helper_toggle'
}

const myEmitter: EventEmitter = new EventEmitter();

/**
  * Gets the main emitter.
  *
  * @returns Emitter.
  *
*/
let getEmitter = (): EventEmitter => {
  return myEmitter;
}

/**
  * Emit event in default emitter.
  *
  * @param point - The event point from list of used events in application.
  *
*/
let emitEvent = (point: string): void => {
  myEmitter.emit(point);
}

/**
  * Adds listener to default emitter.
  *
  * @param point - The event point from list of used events in application.
  * @param callback - Function that will be executed after emit event.
  * @returns Listener with specyfic callback.
  *
*/
let addListener = (point: string, callback: Listener): EventEmitter => {
  return myEmitter.addListener(point, callback);
}

/**
  * Removes listener from default emitter.
  *
  * @param point - The event point from list of used events in application.
  * @param callback - Function that will be executed after emit event.
  *
*/
let removeListener = (point: string, callback: Listener): void => {
  myEmitter.removeListener(point, callback);
}


/**
  * Removes all listeners from default emitter.
  *
*/
let removeAllListeners = (): void => {
  myEmitter.removeAllListeners();
}

export default {
  EventsPoints,
  getEmitter,
  emitEvent,
  addListener,
  removeListener,
  removeAllListeners
};
