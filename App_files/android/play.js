const audio = new Audio("./tree.mp3");

audio.loop = true;

const button = document.getElementById("hmmm");

button.addEventListener("click", function () {
  if (audio.paused) {
    audio.play();
    button.innerHTML = 'Pause Hmmm <i class="bi bi-pause-fill"></i>';
  } else {
    audio.pause();
    button.innerHTML = 'Play Hmmm <i class="bi bi-play-fill"></i>';
  }
});
