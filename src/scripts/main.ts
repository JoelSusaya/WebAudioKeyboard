/// <reference path="./definitions/keypress.d.ts" />
/// <reference path="./definitions/timbre.d.ts" />

/// <reference path="./KeyboardController.ts" />
/// <reference path="./controlKeys.ts" />

let keys_down_node: HTMLElement;
let chord_pressed_node: HTMLElement;
let chord_callback: EventListener;
let keyboard: KeyboardController.Keyboard;
let audioContext: AudioContext;



keys_down_node = document.getElementById("keys_down");
chord_pressed_node = document.getElementById("chord_pressed");

chord_callback = (e: Event): void  => {
  chord_pressed_node.innerHTML = "Chord Pressed: " + String(keyboard.chord.join(""));
};

keyboard = new KeyboardController.Keyboard();

keyboard.setChordEvent(chord_pressed_node, chord_callback);

document.addEventListener("keydown", function(e) {
  return keys_down_node.innerHTML = "Keys Down: " + String(keyboard.keys_down.join(""));
}, false);

document.addEventListener("keyup", function(e) {
  return keys_down_node.innerHTML = "Keys Down: " + String(keyboard.keys_down.join(""));
}, false);
