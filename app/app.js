import { alphabet } from "./constants/english-alphabet.js";

const keyArray = [...document.querySelectorAll(".key")];

/**
 * @description Create audio elements with data-key attribute.
 */
function createAudioElements() {
  return new Promise((resolve, reject) => {
    alphabet.forEach((letter, index) => {
      keyArray[index].setAttribute("data-key", alphabet[index].key);
      const tempAudioElement = `
    <audio data-key="${letter.key}" src="./assets/sounds/${letter.character}.mp3"></audio>
      `;
      const audiosElement = document.getElementById("audios");
      audiosElement.innerHTML += tempAudioElement;
    });
  });
}

/**
 * @description Play audio for keydown event.
 * @param {Event} event
 */
function playAudioForKeyDown(event) {
  if ((event.keyCode < 65) | (event.keyCode > 90)) return;

  const audioElement = document.querySelector(
    `audio[data-key="${event.keyCode}"]`
  );
  const keyElement = document.querySelector(
    `.key[data-key="${event.keyCode}"]`
  );

  audioElement.currentTime = 0;
  audioElement.play();
  keyElement.classList.add("key-playing");

  setTimeout(() => {
    keyElement.classList.remove("key-playing");
  }, 300);
}

createAudioElements();
window.addEventListener("keydown", playAudioForKeyDown);
