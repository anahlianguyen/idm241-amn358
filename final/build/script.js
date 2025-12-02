// PLAY BUTTON
const playButton = document.querySelector('.play-btn');
const albumCover = document.querySelector('.album-cover');
const albumInner = document.querySelector('.album-inner');
const albumImage = document.querySelector('.album-front'); 

const mainAudio = new Audio('audio/guts-snippet.mp3');
mainAudio.loop = true; 

let isPlaying = false;

const previewAudio = new Audio('audio/guts-snippet.mp3');
let fadeInterval;

if (playButton) {
  playButton.addEventListener('mouseenter', () => {
    playButton.style.boxShadow = '0 0 25px #1ed760';
  });

  playButton.addEventListener('mouseleave', () => {
    playButton.style.boxShadow = 'none';
  });

  playButton.addEventListener('click', () => {
    isPlaying = !isPlaying;

    if (isPlaying) {
      playButton.textContent = '⏸';

      if (albumCover && albumInner) {
        albumCover.classList.add('playing');
      }

      stopPreviewAudio();

      mainAudio.currentTime = 0;
      mainAudio.volume = 1;
      mainAudio.play();
    } else {
      playButton.textContent = '▶';
      if (albumCover && albumInner) {
        albumCover.classList.remove('playing');
      }
      mainAudio.pause();
      mainAudio.currentTime = 0;
    }
  });
}

// ALBUM HOVER
if (albumCover && albumImage) {
  albumCover.addEventListener('mouseenter', () => {
    if (isPlaying || albumCover.classList.contains('playing')) {
      return;
    }

    albumImage.style.filter = 'drop-shadow(0 0 30px #b185ff) brightness(1.2)';
    fadeInAudio(previewAudio);
    albumCover.style.cursor = 'pointer';
  });

  albumCover.addEventListener('mouseleave', () => {
    if (!isPlaying && !albumCover.classList.contains('playing')) {
      albumImage.style.filter = 'none';
      fadeOutAudio(previewAudio);
      albumCover.style.cursor = 'default';
    } else {
      albumCover.style.cursor = 'default';
    }
  });
}

function fadeInAudio(audioElement) {
  clearInterval(fadeInterval);
  audioElement.volume = 0;
  audioElement.currentTime = 0;
  audioElement.play();

  fadeInterval = setInterval(() => {
    if (audioElement.volume < 1) {
      audioElement.volume = Math.min(audioElement.volume + 0.2, 1);
    } else {
      clearInterval(fadeInterval);
    }
  }, 30);
}

function fadeOutAudio(audioElement) {
  clearInterval(fadeInterval);

  fadeInterval = setInterval(() => {
    if (audioElement.volume > 0.2) {
      audioElement.volume = Math.max(audioElement.volume - 0.2, 0);
    } else {
      audioElement.pause();
      audioElement.currentTime = 0;
      clearInterval(fadeInterval);
    }
  }, 30);
}

function stopPreviewAudio() {
  clearInterval(fadeInterval);
  previewAudio.pause();
  previewAudio.currentTime = 0;
}

// SHUFFLE BUTTON 
const shuffleButton = document.getElementById('shuffleButton');
const shuffleIcon = document.getElementById('shuffleIcon');
let shuffleActive = false;

if (shuffleButton && shuffleIcon) {
  shuffleButton.addEventListener('click', () => {
    shuffleActive = !shuffleActive;
    shuffleIcon.src = shuffleActive
      ? 'images/shuffle-active-icon.png'
      : 'images/shuffle-default-icon.png';
  });
}

const saveButton = document.getElementById('saveButton');
const saveIcon = document.getElementById('saveIcon');
let saved = false;


function animateAlbumToSave() {
  if (!albumImage || !saveButton) return;

  const albumRect = albumImage.getBoundingClientRect();
  const saveRect = saveButton.getBoundingClientRect();

  const flying = albumImage.cloneNode();
  flying.classList.add('flying-album');

  flying.style.top = (albumRect.top + albumRect.height / 2) + 'px';
  flying.style.left = (albumRect.left + albumRect.width / 2) + 'px';

  document.body.appendChild(flying);

  requestAnimationFrame(() => {
    flying.style.top = (saveRect.top + saveRect.height / 2) + 'px';
    flying.style.left = (saveRect.left + saveRect.width / 2) + 'px';
    flying.style.opacity = '0';
    flying.style.transform = 'translate(-50%, -50%) scale(0.3)';
  });

  flying.addEventListener(
    'transitionend',
    () => {
      flying.remove();
    },
    { once: true }
  );
}

if (saveButton && saveIcon) {
  saveButton.addEventListener('click', () => {
    if (!saved) {
      animateAlbumToSave();
    }

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
}

// DOWNLOAD BUTTON
const downloadButton = document.getElementById('downloadButton');
const downloadIcon = document.getElementById('downloadIcon');
let downloadActive = false;
let downloading = false;

if (downloadButton && downloadIcon) {
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
}
