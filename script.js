            // Possible improvements:
// - Change timeline and volume slider into input sliders, reskinned
// - Change into Vue or React component
// - Be able to grab a custom title instead of "Music Song"
// - Hover over sliders to see preview of timestamp/volume change

const audioPlayer = document.querySelector(".audio-player");
const audio = new Audio(
  "minai2.mp3"
);
//credit for song: Adrian kreativaweb@gmail.com

console.dir(audio);

audio.addEventListener(
  "loadeddata",
  () => {
    audioPlayer.querySelector(".time .length").textContent = getTimeCodeFromNum(
      audio.duration
    );
    audio.volume = .75;
  },
  false
);

//click on timeline to skip around
const timeline = audioPlayer.querySelector(".timeline");
timeline.addEventListener("click", e => {
  const timelineWidth = window.getComputedStyle(timeline).width;
  const timeToSeek = e.offsetX / parseInt(timelineWidth) * audio.duration;
  audio.currentTime = timeToSeek;
}, false);

//click volume slider to change volume
const volumeSlider = audioPlayer.querySelector(".controls .volume-slider");
volumeSlider.addEventListener('input', e => {
    const newVolume = e.target.value;
    audio.volume = newVolume;
    audioPlayer.querySelector(".controls .volume-percentage").style.width = newVolume * 100 + '%';
}, false);

audioPlayer.querySelector(".volume-button").addEventListener("click", () => {
  const volumeEl = audioPlayer.querySelector(".volume-container .volume");
  audio.muted = !audio.muted;
  if (audio.muted) {
    volumeEl.classList.remove("icono-volumeMedium");
    volumeEl.classList.add("icono-volumeMute");
  } else {
    volumeEl.classList.add("icono-volumeMedium");
    volumeEl.classList.remove("icono-volumeMute");
  }
});

//check audio percentage and update time accordingly
setInterval(() => {
  const progressBar = audioPlayer.querySelector(".progress");
  progressBar.style.width = audio.currentTime / audio.duration * 100 + "%";
  audioPlayer.querySelector(".time .current").textContent = getTimeCodeFromNum(
    audio.currentTime
  );
}, 500);

//toggle between playing and pausing on button click
const playBtn = audioPlayer.querySelector(".controls .toggle-play");
playBtn.addEventListener(
  "click",
  () => {
    if (audio.paused) {
      playBtn.classList.remove("play");
      playBtn.classList.add("pause");
      audio.play();
    } else {
      playBtn.classList.remove("pause");
      playBtn.classList.add("play");
      audio.pause();
    }
  },
  false
);


audioPlayer.querySelector(".volume-button").addEventListener("click", () => {
  const volumeEl = audioPlayer.querySelector(".volume-container .volume");
  audio.muted = !audio.muted;
  if (audio.muted) {
    volumeEl.classList.remove("icono-volumeMedium");
    volumeEl.classList.add("icono-volumeMute");
  } else {
    volumeEl.classList.add("icono-volumeMedium");
    volumeEl.classList.remove("icono-volumeMute");
    const volumeSlider = audioPlayer.querySelector(".controls .volume-slider");
volumeSlider.addEventListener('input', e => {
    const newVolume = e.target.value;
    audio.volume = newVolume;
}, false);
  }
});

//turn 128 seconds into 2:08
function getTimeCodeFromNum(num) {
  let seconds = parseInt(num);
  let minutes = parseInt(seconds / 60);
  seconds -= minutes * 60;
  const hours = parseInt(minutes / 60);
  minutes -= hours * 60;

  if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
  return `${String(hours).padStart(2, 0)}:${minutes}:${String(
    seconds % 60
  ).padStart(2, 0)}`;
}

            function showPurchaseOptions(songTitle) {
                const choice = confirm(`Do you want to buy "${songTitle}" with Nibi or Beatcoin?`);
                if (choice) {
                    alert(`You have purchased "${songTitle}" with Nibi`);
                } else {
                    alert(`You have purchased "${songTitle}" with Beatcoin`);
                }
            }






    // Player

    // Récupérer les éléments audio individuellement
    const musicAudio = document.getElementById('music-audio1');
    const musicAction = document.getElementById('music-action');
    const musicSeek = document.getElementById('music-seek');
    const musicSeekHandle = document.querySelector('.music__seek_handle');
    const musicCurrentTime = document.getElementById('music-current-time');
    const musicDuration = document.getElementById('music-duration');
    const volumeControl = document.getElementById('volume-control');

    // Fonction pour jouer ou mettre en pause une piste audio
    function toggleAudioPlay() {
      if (musicAudio.paused) {
        musicAudio.play();
      } else {
        musicAudio.pause();
      }
    }

    // Associer la fonction de lecture/arrêt à la piste audio au clic sur le bouton de lecture
    musicAction.addEventListener('click', function() {
      toggleAudioPlay();
    });

    // Mettre à jour la durée de la piste
    musicAudio.addEventListener('loadedmetadata', function() {
      const duration = formatTime(musicAudio.duration);
      musicDuration.textContent = duration;
    });

    // Fonction pour mettre à jour la barre de progression
    function updateProgress() {
      const progress = (musicAudio.currentTime / musicAudio.duration) * 100;
      musicSeekHandle.style.left = progress + '%';
      musicCurrentTime.textContent = formatTime(musicAudio.currentTime);
    }

    // Mettre à jour la barre de progression lors de la lecture de la piste
    musicAudio.addEventListener('timeupdate', function() {
      updateProgress();
    });

    // Fonction pour changer la position de lecture
    function setProgress(e) {
      const width = musicSeek.clientWidth;
      const clickX = e.offsetX;
      const duration = musicAudio.duration;
      musicAudio.currentTime = (clickX / width) * duration;
    }

    // Écouteur d'événements pour changer la position de lecture en cliquant sur la barre de progression
    musicSeek.addEventListener('click', function(e) {
      setProgress(e);
    });

    // Écouteur d'événements pour changer la position de lecture en faisant glisser la poignée de la barre de progression
    musicSeekHandle.addEventListener('mousedown', function(e) {
      let isDragging = true;
      window.addEventListener('mousemove', function(e) {
        if (isDragging) {
          setProgress(e);
        }
      });
      window.addEventListener('mouseup', function() {
        isDragging = false;
      });
    });

    // Fonction pour formater le temps au format HH:MM:SS
    function formatTime(time) {
      const hours = Math.floor(time / 3600);
      const minutes = Math.floor((time % 3600) / 60);
      const seconds = Math.floor(time % 60);
      return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    }

    // Fonction pour régler le volume
    function setVolume(volume) {
      musicAudio.volume = volume;
    }

    // Régler le volume de la piste audio
    volumeControl.addEventListener('input', function() {
      const volume = this.value;
      setVolume(volume);
    });