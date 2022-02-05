import { alphabet } from "./constants/english-alphabet.js";

const keys = document.querySelectorAll(".key");
const keyArray = Array.from(keys);

//ripple click effect for keys
keyArray.forEach((key) => {
  key.onclick = function (event) {
    let ripple = document.createElement("span");
    ripple.classList.add("ripple");
    this.appendChild(ripple);

    let x = event.clientX - event.target.offsetLeft;
    let y = event.clientY - event.target.offsetTop;

    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    setTimeout(() => {
      ripple.remove();
    }, 300);
  };
});

//create data-key attributes and audio elements
alphabet.forEach((item, index) => {
  keyArray[index].setAttribute("data-key", alphabet[index].key);
  let temporaryAudio = `
  <audio data-key="${item.key}" src="./assets/sounds/${item.character}.mp3"></audio>
    `;
  document.getElementById("audios").innerHTML += temporaryAudio;
});

//play audio with data-key attribute
function playAudioForKeyDown(event) {
  const audio = document.querySelector(`audio[data-key="${event.keyCode}"]`);
  const key = document.querySelector(`.key[data-key="${event.keyCode}"]`);
  if (!audio) return;
  audio.currentTime = 0;
  audio.play();
  key.classList.add("key-playing");
  setTimeout(() => {
    key.classList.remove("key-playing");
  }, 200);
}

function playAudioForClick() {
  content = this.firstChild.innerHTML;
  alphabet.forEach((item) => {
    if (content == item.character) {
      const audio = document.querySelector(`audio[data-key="${item.key}"]`);
      if (!audio) return;
      audio.currentTime = 0;
      audio.play();
    }
  });
}

keys.forEach((key) => {
  key.addEventListener("click", playAudioForClick);
});

//listen keydown for window object
window.addEventListener("keydown", playAudioForKeyDown);
