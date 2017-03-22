namespace KeyboardController {
  export class Keyboard {
    readonly _CHORD_RELEASE_TIME: number;

    private _keys_down: Set<string>;
    private _keys_released: Set<string>;
    private _chord: Array<string>;

    private _chordPressed: Event;
    private _combos: Array<object>;
    private _element: HTMLElement;

    public listener: keypress.Listener;

    constructor() {
      this._CHORD_RELEASE_TIME = 100;

      this._keys_down = new Set("");
      this._keys_released = new Set("");
      this._chord = [];
      this._combos = [];

      this._chordPressed = new Event("chordPressed");
      this._init();
    }

    _init() {
      this.listener = new keypress.Listener();
      this.listener.should_force_event_defaults = true;

      this.generateCombos(controlKeys);

      this.listener.register_many(this._combos);
    }

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

    on_down(key: string): void {
      if (!this._keys_down.has(key)) {
        this._keys_down.add(key);
      }
    }

    on_up(key: string): void {
      if (this._keys_down.has(key)) {
        this._keys_down.delete(key);
        this.keyReleased(key);
      }
    }

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

    setChord(key_set: Set<string>): void {
      this._chord = Array.from(key_set).sort();
      this._element.dispatchEvent(this._chordPressed);
    }

    get keys_down(): Array<string> {
      return Array.from(this._keys_down).sort();
    }

    setChordEvent(element: HTMLElement, callback: EventListener) {
      this._element = element;
      this._element.addEventListener("chordPressed", callback, false);
    }

  }
}
