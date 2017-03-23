/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/// <reference path="./definitions/keypress.d.ts" />

Object.defineProperty(exports, "__esModule", { value: true });
const controlKeys_1 = __webpack_require__(1);
class Keyboard {
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
        this.generateCombos(controlKeys_1.controlKeys);
        // Register combos with our keyboard listener
        this.listener.register_many(this._combos);
    }
    // Loop through the keys from controlKeys.ts and set up our combo array
    generateCombos(keys) {
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
    on_down(key) {
        if (!this._keys_down.has(key)) {
            this._keys_down.add(key);
        }
    }
    // This function gets called whenever a key goes up
    on_up(key) {
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
    keyReleased(key) {
        this._keys_released.add(key);
        // if there are keys down, we cannot output a chord
        // if there are keys down and this is the first key released, start a timer
        // once the timer is done:
        // if the there are no keys down, set the chord
        // otherwise remove this key
        let promise = new Promise((resolve, reject) => {
            window.setTimeout(() => {
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
    get chord() {
        return this._chord;
    }
    // Sets the chord and triggers the "chordPressed" event, which allows us
    // to trigger actions whenever a new chord is registered
    setChord(key_set) {
        this._chord = Array.from(key_set).sort();
        for (let element of this._eventElements) {
            element.dispatchEvent(this._chordPressed);
        }
    }
    get keys_down() {
        return Array.from(this._keys_down).sort();
    }
    // This function lets us pass in an HTMLElement and an EventListener
    // that we can apply the "chordPressed" event to.
    // We also store the HTMLElement so we can fire the event whenever a chord
    // is pressed.
    setChordEvent(element, callback) {
        element.addEventListener("chordPressed", callback, false);
        this._eventElements.push(element);
    }
}
exports.Keyboard = Keyboard;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.controlKeys = [
    "backspace",
    "tab",
    "q",
    "w",
    "e",
    "r",
    "t",
    "y",
    "u",
    "i",
    "o",
    "p",
    "[",
    "]",
    "a",
    "s",
    "d",
    "f",
    "g",
    "h",
    "j",
    "k",
    "l",
    ";",
    "\'",
    "caps_lock",
    "enter",
    "shift",
    "z",
    "x",
    "c",
    "v",
    "b",
    "n",
    "m",
    ",",
    ".",
    "/",
    "ctrl",
    "alt",
    "cmd",
    "space",
];


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Keyboard_1 = __webpack_require__(0);
let keys_down_node;
let chord_pressed_node;
let chord_callback;
let keyboard;
let audioContext;
keys_down_node = document.getElementById("keys_down");
chord_pressed_node = document.getElementById("chord_pressed");
chord_callback = (e) => {
    chord_pressed_node.innerHTML = "Chord Pressed: " + String(keyboard.chord.join(""));
};
keyboard = new Keyboard_1.Keyboard();
keyboard.setChordEvent(chord_pressed_node, chord_callback);
document.addEventListener("keydown", function (e) {
    return keys_down_node.innerHTML = "Keys Down: " + String(keyboard.keys_down.join(""));
}, false);
document.addEventListener("keyup", function (e) {
    return keys_down_node.innerHTML = "Keys Down: " + String(keyboard.keys_down.join(""));
}, false);


/***/ })
/******/ ]);