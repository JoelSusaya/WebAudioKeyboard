class Keyboard {

  constructor() {
  	this._CHORD_RELEASE_TIME = 100;

    this._keys_down = new Set();
    this._keys_released = new Set();
    this._chord = new Set();

    this.chordPressed = new Event('chordPressed');
    this._init();
  }

  _init() {
  	this.listener = new window.keypress.Listener();
    this.listener.should_force_event_defaults = true;

    this.combos = [
    {
      keys: "backspace",
      on_keydown: () => {
        return this.on_down("backspace");
      },
      on_keyup: () => {
        return this.on_up("backspace");
      }
    }, {
      keys: "tab",
      on_keydown: () => {
        return this.on_down("tab");
      },
      on_keyup: () => {
        return this.on_up("tab");
      }
    }, {
      keys: "q",
      on_keydown: () => {
        return this.on_down("q");
      },
      on_keyup: () => {
        return this.on_up("q");
      }
    }, {
      keys: "w",
      on_keydown: () => {
        return this.on_down("w");
      },
      on_keyup: () => {
        return this.on_up("w");
      }
    }, {
      keys: "e",
      on_keydown: () => {
        return this.on_down("e");
      },
      on_keyup: () => {
        return this.on_up("e");
      }
    }, {
      keys: "r",
      on_keydown: () => {
        return this.on_down("r");
      },
      on_keyup: () => {
        return this.on_up("r");
      }
    }, {
      keys: "t",
      on_keydown: () => {
        return this.on_down("t");
      },
      on_keyup: () => {
        return this.on_up("t");
      }
    }, {
      keys: "y",
      on_keydown: () => {
        return this.on_down("y");
      },
      on_keyup: () => {
        return this.on_up("y");
      }
    }, {
      keys: "u",
      on_keydown: () => {
        return this.on_down("u");
      },
      on_keyup: () => {
        return this.on_up("u");
      }
    }, {
      keys: "i",
      on_keydown: () => {
        return this.on_down("i");
      },
      on_keyup: () => {
        return this.on_up("i");
      }
    }, {
      keys: "o",
      on_keydown: () => {
        return this.on_down("o");
      },
      on_keyup: () => {
        return this.on_up("o");
      }
    }, {
      keys: "p",
      on_keydown: () => {
        return this.on_down("p");
      },
      on_keyup: () => {
        return this.on_up("p");
      }
    }, {
      keys: "[",
      on_keydown: () => {
        return this.on_down("left_bracket");
      },
      on_keyup: () => {
        return this.on_up("left_bracket");
      }
    }, {
      keys: "]",
      on_keydown: () => {
        return this.on_down("right_bracket");
      },
      on_keyup: () => {
        return this.on_up("right_bracket");
      }
    }, {
      keys: "\\",
      on_keydown: () => {
        return this.on_down("backslash");
      },
      on_keyup: () => {
        return this.on_up("backslash");
      }
    }, {
      keys: "caps_lock",
      on_keydown: () => {
        return this.on_down("caps_lock");
      },
      on_keyup: () => {
        return this.on_up("caps_lock");
      }
    }, {
      keys: "a",
      on_keydown: () => {
        return this.on_down("a");
      },
      on_keyup: () => {
        return this.on_up("a");
      }
    }, {
      keys: "s",
      on_keydown: () => {
        return this.on_down("s");
      },
      on_keyup: () => {
        return this.on_up("s");
      }
    }, {
      keys: "d",
      on_keydown: () => {
        return this.on_down("d");
      },
      on_keyup: () => {
        return this.on_up("d");
      }
    }, {
      keys: "f",
      on_keydown: () => {
        return this.on_down("f");
      },
      on_keyup: () => {
        return this.on_up("f");
      }
    }, {
      keys: "g",
      on_keydown: () => {
        return this.on_down("g");
      },
      on_keyup: () => {
        return this.on_up("g");
      }
    }, {
      keys: "h",
      on_keydown: () => {
        return this.on_down("h");
      },
      on_keyup: () => {
        return this.on_up("h");
      }
    }, {
      keys: "j",
      on_keydown: () => {
        return this.on_down("j");
      },
      on_keyup: () => {
        return this.on_up("j");
      }
    }, {
      keys: "k",
      on_keydown: () => {
        return this.on_down("k");
      },
      on_keyup: () => {
        return this.on_up("k");
      }
    }, {
      keys: "l",
      on_keydown: () => {
        return this.on_down("l");
      },
      on_keyup: () => {
        return this.on_up("l");
      }
    }, {
      keys: ";",
      on_keydown: () => {
        return this.on_down("semicolon");
      },
      on_keyup: () => {
        return this.on_up("semicolon");
      }
    }, {
      keys: "\'",
      on_keydown: () => {
        return this.on_down("apostrophe");
      },
      on_keyup: () => {
        return this.on_up("apostrophe");
      }
    }, {
      keys: "enter",
      on_keydown: () => {
        return this.on_down("enter");
      },
      on_keyup: () => {
        return this.on_up("enter");
      }
    }, {
      keys: "shift",
      on_keydown: () => {
        this.on_down("left_shift");
        return this.on_down("right_shift");
      },
      on_keyup: () => {
        this.on_up("left_shift");
        return this.on_up("right_shift");
      }
    }, {
      keys: "z",
      on_keydown: () => {
        return this.on_down("z");
      },
      on_keyup: () => {
        return this.on_up("z");
      }
    }, {
      keys: "x",
      on_keydown: () => {
        return this.on_down("x");
      },
      on_keyup: () => {
        return this.on_up("x");
      }
    }, {
      keys: "c",
      on_keydown: () => {
        return this.on_down("c");
      },
      on_keyup: () => {
        return this.on_up("c");
      }
    }, {
      keys: "v",
      on_keydown: () => {
        return this.on_down("v");
      },
      on_keyup: () => {
        return this.on_up("v");
      }
    }, {
      keys: "b",
      on_keydown: () => {
        return this.on_down("b");
      },
      on_keyup: () => {
        return this.on_up("b");
      }
    }, {
      keys: "n",
      on_keydown: () => {
        return this.on_down("n");
      },
      on_keyup: () => {
        return this.on_up("n");
      }
    }, {
      keys: "m",
      on_keydown: () => {
        return this.on_down("m");
      },
      on_keyup: () => {
        return this.on_up("m");
      }
    }, {
      keys: ",",
      on_keydown: () => {
        return this.on_down("comma");
      },
      on_keyup: () => {
        return this.on_up("comma");
      }
    }, {
      keys: ".",
      on_keydown: () => {
        return this.on_down("period");
      },
      on_keyup: () => {
        return this.on_up("period");
      }
    }, {
      keys: "/",
      on_keydown: () => {
        return this.on_down("forwardslash");
      },
      on_keyup: () => {
        return this.on_up("forwardslash");
      }
    }, {
      keys: "ctrl",
      on_keydown: () => {
        this.on_down("left_ctrl");
        return this.on_down("right_ctrl");
      },
      on_keyup: () => {
        this.on_up("left_ctrl");
        return this.on_up("right_ctrl");
      }
    }, {
      keys: "alt",
      on_keydown: () => {
        this.on_down("left_alt");
        return this.on_down("right_alt");
      },
      on_keyup: () => {
        this.on_up("left_alt");
        return this.on_up("right_alt");
      }
    }, {
      keys: "cmd",
      on_keydown: () => {
        this.on_down("left_cmd");
        return this.on_down("right_cmd");
      },
      on_keyup: () => {
        this.on_up("left_cmd");
        return this.on_up("right_cmd");
      }
    }, {
      keys: "space",
      on_keydown: () => {
        return this.on_down("space");
      },
      on_keyup: () => {
        return this.on_up("space");
      }
    }
  	];

  	this.listener.register_many(this.combos);
  }

  on_down(key) {
  	if(!this._keys_down.has(key)) {
    	this._keys_down.add(key);
    }
  }

  on_up(key) {
  	if(this._keys_down.has(key)) {
    	this._keys_down.delete(key);
      this.keys_released = key;
    }
  }

  get keys_released() {
  	return this._keys_released;
  }

  set keys_released(key) {
  	this._keys_released.add(key);

    // if there are keys down, we can't output a chord
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
    	if(succeeded) {
      	//console.log("success");
      	this.chord = this.keys_released;
        this.keys_released.clear();
      }
      else {
      	//console.log("failure");
      	this._keys_released.delete(key);
      }
    });
  }

  get chord() {
    return this._chord;
  }

  set chord(keySet) {
		this._chord = Array.from(keySet).sort().join("");
    this.element.dispatchEvent(this.chordPressed);
  }

  get keys_down() {
  	return Array.from(this._keys_down).sort().join("");
  }

  setChordEvent(element, callback) {
  	this.element = element;
  	this.element.addEventListener('chordPressed', callback, false);
  }

}

let keys_down_node = document.getElementById('keys_down');
let chord_pressed_node = document.getElementById('chord_pressed');

let chord_callback = (e) => {
  return chord_pressed_node.innerHTML = "Chord Pressed: " + String(keyboard.chord);
};

let keyboard = new Keyboard();

keyboard.setChordEvent(chord_pressed_node, chord_callback);

document.addEventListener('keydown', function(e) {
  return keys_down_node.innerHTML = "Keys Down: " + String(keyboard.keys_down);
}, false)
document.addEventListener('keyup', function(e) {
  return keys_down_node.innerHTML = "Keys Down: " + String(keyboard.keys_down);
}, false);
