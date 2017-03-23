/// <reference path="./definitions/keypress.d.ts" />

import { controlKeys } from './controlKeys';

export class Keyboard {
  readonly _CHORD_RELEASE_TIME: number;

  private _keys_down: Set<string>;
  private _keys_released: Set<string>;
  private _chord: Array<string>;

  private _chordPressed: Event;
  private _combos: Array<object>;
  private _eventElements: Array<HTMLElement>;

  public listener: keypress.Listener;

  constructor() {
    this._CHORD_RELEASE_TIME = 150;
    console.log("yo");
    this._keys_down = new Set("");
    this._keys_released = new Set("");
    this._chord = [];
    this._combos = [];
    this._eventElements = [];

    this._chordPressed = new Event("chordPressed");
    this._init();
  }

  _init() {
    this.listener = new keypress.Listener();
    this.listener.should_force_event_defaults = true;

    // Generate combos from controlKeys.ts
    this.generateCombos(controlKeys);

    // Register combos with our keyboard listener
    this.listener.register_many(this._combos);
  }

  // Loop through the keys from controlKeys.ts and set up our combo array
  generateCombos(keys: Array<string>): void {
    for (let key of keys) {
      this._combos.push({
        keys: key,
        on_keydown: () => {
          return this.on_down(key);
        },
        on_keyup: () => {
          return this.on_up(key);
        }
      });
    }
  }

  // This function gets called whenever a key is down
  on_down(key: string): void {
    if (!this._keys_down.has(key)) {
      this._keys_down.add(key);
    }
  }

  // This function gets called whenever a key goes up
  on_up(key: string): void {
    if (this._keys_down.has(key)) {
      this._keys_down.delete(key);
      this.keyReleased(key);
    }
  }

  // When a key is released, we want to track that it was released;
  // If all other keys (if any) are also released before this._CHORD_RELEASE_TIME
  // is reached, then a chord is registered from all the released keys.
  // This also clears the tracker so that the other keys that were released don't
  // generate a new chord.
  //
  // If keys are still down when the timer expiores, the released key is
  // removed from our tracker.
  keyReleased(key: string): void {
    this._keys_released.add(key);

    // if there are keys down, we cannot output a chord
    // if there are keys down and this is the first key released, start a timer
    // once the timer is done:
    	// if the there are no keys down, set the chord
      // otherwise remove this key

    let promise = new Promise( (resolve, reject) => {
      window.setTimeout( () => {
        if (this.keys_down.length === 0 && this._keys_released.size !== 0) {
          resolve(true);
        }
        else {
          resolve(false);
        }
      }, this._CHORD_RELEASE_TIME);
    });

    promise.then((succeeded) => {
      if (succeeded) {
      	// console.log("success");
        this.setChord(this._keys_released);
        this._keys_released.clear();
      }
      else {
      	// console.log("failure");
        this._keys_released.delete(key);
      }
    });
  }

  get chord(): Array<string> {
    return this._chord;
  }

  // Sets the chord and triggers the "chordPressed" event, which allows us
  // to trigger actions whenever a new chord is registered
  setChord(key_set: Set<string>): void {
    this._chord = Array.from(key_set).sort();

    for (let element of this._eventElements) {
      element.dispatchEvent(this._chordPressed);
    }
  }

  get keys_down(): Array<string> {
    return Array.from(this._keys_down).sort();
  }

  // This function lets us pass in an HTMLElement and an EventListener
  // that we can apply the "chordPressed" event to.
  // We also store the HTMLElement so we can fire the event whenever a chord
  // is pressed.
  setChordEvent(element: HTMLElement, callback: EventListener) {
    element.addEventListener("chordPressed", callback, false);
    this._eventElements.push(element);
  }

}
