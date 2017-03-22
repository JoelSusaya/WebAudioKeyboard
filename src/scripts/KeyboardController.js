var KeyboardController;
(function (KeyboardController) {
    var Keyboard = (function () {
        function Keyboard() {
            this._CHORD_RELEASE_TIME = 100;
            this._keys_down = new Set("");
            this._keys_released = new Set("");
            this._chord = [];
            this._combos = [];
            this._chordPressed = new Event("chordPressed");
            this._init();
        }
        Keyboard.prototype._init = function () {
            this.listener = new keypress.Listener();
            this.listener.should_force_event_defaults = true;
            this.generateCombos(KeyboardController.controlKeys);
            this.listener.register_many(this._combos);
        };
        Keyboard.prototype.generateCombos = function (keys) {
            var _this = this;
            var _loop_1 = function (key) {
                this_1._combos.push({
                    keys: key,
                    on_keydown: function () {
                        return _this.on_down(key);
                    },
                    on_keyup: function () {
                        return _this.on_up(key);
                    }
                });
            };
            var this_1 = this;
            for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                var key = keys_1[_i];
                _loop_1(key);
            }
        };
        Keyboard.prototype.on_down = function (key) {
            if (!this._keys_down.has(key)) {
                this._keys_down.add(key);
            }
        };
        Keyboard.prototype.on_up = function (key) {
            if (this._keys_down.has(key)) {
                this._keys_down["delete"](key);
                this.keyReleased(key);
            }
        };
        Keyboard.prototype.keyReleased = function (key) {
            var _this = this;
            this._keys_released.add(key);
            // if there are keys down, we cannot output a chord
            // if there are keys down and this is the first key released, start a timer
            // once the timer is done:
            // if the there are no keys down, set the chord
            // otherwise remove this key
            var promise = new Promise(function (resolve, reject) {
                window.setTimeout(function () {
                    if (_this.keys_down.length === 0 && _this._keys_released.size !== 0) {
                        resolve(true);
                    }
                    else {
                        resolve(false);
                    }
                }, _this._CHORD_RELEASE_TIME);
            });
            promise.then(function (succeeded) {
                if (succeeded) {
                    // console.log("success");
                    _this.setChord(_this._keys_released);
                    _this._keys_released.clear();
                }
                else {
                    // console.log("failure");
                    _this._keys_released["delete"](key);
                }
            });
        };
        Object.defineProperty(Keyboard.prototype, "chord", {
            get: function () {
                return this._chord;
            },
            enumerable: true,
            configurable: true
        });
        Keyboard.prototype.setChord = function (key_set) {
            this._chord = Array.from(key_set).sort();
            this._element.dispatchEvent(this._chordPressed);
        };
        Object.defineProperty(Keyboard.prototype, "keys_down", {
            get: function () {
                return Array.from(this._keys_down).sort();
            },
            enumerable: true,
            configurable: true
        });
        Keyboard.prototype.setChordEvent = function (element, callback) {
            this._element = element;
            this._element.addEventListener("chordPressed", callback, false);
        };
        return Keyboard;
    }());
    KeyboardController.Keyboard = Keyboard;
})(KeyboardController || (KeyboardController = {}));
