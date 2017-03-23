"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Keyboard_1 = require("./Keyboard");
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
