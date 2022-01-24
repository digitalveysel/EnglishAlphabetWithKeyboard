const keys = document.querySelectorAll(".key");
const keyArray = Array.from(keys);
const alphabet = [
  {
    character: "A",
    key: 65,
  },
  {
    character: "B",
    key: 66,
  },
  {
    character: "C",
    key: 67,
  },
  {
    character: "D",
    key: 68,
  },
  {
    character: "E",
    key: 69,
  },
  {
    character: "F",
    key: 70,
  },
  {
    character: "G",
    key: 71,
  },
  {
    character: "H",
    key: 72,
  },
  {
    character: "I",
    key: 73,
  },
  {
    character: "J",
    key: 74,
  },
  {
    character: "K",
    key: 75,
  },
  {
    character: "L",
    key: 76,
  },
  {
    character: "M",
    key: 77,
  },
  {
    character: "N",
    key: 78,
  },
  {
    character: "O",
    key: 79,
  },
  {
    character: "P",
    key: 80,
  },
  {
    character: "Q",
    key: 81,
  },
  {
    character: "R",
    key: 82,
  },
  {
    character: "S",
    key: 83,
  },
  {
    character: "T",
    key: 84,
  },
  {
    character: "U",
    key: 85,
  },
  {
    character: "V",
    key: 86,
  },
  {
    character: "W",
    key: 87,
  },
  {
    character: "X",
    key: 88,
  },
  {
    character: "Y",
    key: 89,
  },
  {
    character: "Z",
    key: 90,
  },
];

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
      const audio = document.querySelector(
        `audio[data-key="${item.key}"]`
      );
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
