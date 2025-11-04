const playButton = document.querySelector('.play-btn');

playButton.addEventListener('mouseenter', () => {
  playButton.style.boxShadow = '0 0 25px #1ed760';
});

playButton.addEventListener('mouseleave', () => {
  playButton.style.boxShadow = 'none';
});

const albumCover = document.querySelector('.album-cover');
const albumImage = document.querySelector('.album-cover img');
const audio = new Audio('audio/guts-snippet.mp3');
let fadeInterval;

albumCover.addEventListener('mouseenter', () => {
  albumImage.style.filter = 'drop-shadow(0 0 30px #b185ff) brightness(1.2)';
  fadeInAudio(audio);
  albumCover.style.cursor = 'pointer';
});

albumCover.addEventListener('mouseleave', () => {
  albumImage.style.filter = 'none';
  fadeOutAudio(audio);
  albumCover.style.cursor = 'default';
});

function fadeInAudio(audio) {
  clearInterval(fadeInterval);
  audio.volume = 0;
  audio.currentTime = 0;
  audio.play();
  fadeInterval = setInterval(() => {
    if (audio.volume < 1) audio.volume = Math.min(audio.volume + 0.2, 1);
    else clearInterval(fadeInterval);
  }, 30);
}

function fadeOutAudio(audio) {
  clearInterval(fadeInterval);
  fadeInterval = setInterval(() => {
    if (audio.volume > 0.2) audio.volume = Math.max(audio.volume - 0.2, 0);
    else {
      audio.pause();
      audio.currentTime = 0;
      clearInterval(fadeInterval);
    }
  }, 30);
}


const shuffleButton = document.getElementById('shuffleButton');
const shuffleIcon = document.getElementById('shuffleIcon');
let shuffleActive = false;

shuffleButton.addEventListener('click', () => {
  shuffleActive = !shuffleActive;
  shuffleIcon.src = shuffleActive
    ? 'images/shuffle-active-icon.png'
    : 'images/shuffle-default-icon.png';
});

const saveButton = document.getElementById('saveButton');
const saveIcon = document.getElementById('saveIcon');
let saved = false;

saveButton.addEventListener('click', () => {
  saveIcon.style.opacity = 0;

  setTimeout(() => {
    saved = !saved;
    saveIcon.src = saved
      ? 'images/save-active-icon.png'
      : 'images/save-default-icon.png';
    saveIcon.style.opacity = 1;

    if (saved) {
      saveIcon.classList.add('save-pulse');
      setTimeout(() => saveIcon.classList.remove('save-pulse'), 400);
    }
  }, 200);
});

const downloadButton = document.getElementById('downloadButton');
const downloadIcon = document.getElementById('downloadIcon');
let downloadActive = false;
let downloading = false;

downloadButton.addEventListener('click', () => {
  if (downloading) return;

  downloadActive = !downloadActive;
  if (downloadActive) {
    downloading = true;
    downloadIcon.src = 'images/download-active-icon.png';
    downloadIcon.classList.add('downloading');

    setTimeout(() => {
      downloadIcon.classList.remove('downloading');
      downloading = false;
    }, 3000);
  } else {
    downloadIcon.src = 'images/download-default-icon.png';
    downloadIcon.classList.remove('downloading');
  }
});
