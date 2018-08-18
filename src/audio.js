let songHasEnded = false;
let song = new Audio();
const endNoise = new Audio('src/audio/endnoise.mp3');
endNoise.loop = true;

const playEndNoise = () => endNoise.play();

const songEnded = () => {
  songHasEnded = true;
  playEndNoise();
};

const loadSong = () => {
  song.load();
  song.addEventListener('ended', songEnded);
};

const setSong = (selectedSong) => {
  song.src = selectedSong.url;
  loadSong();
};

const playSong = () => song.play();

const pauseSong = () => song.pause();


const pauseEndNoise = () => {
  endNoise.pause();
};

const play = () => {
  if (songHasEnded) {
    return playEndNoise();
  }

  return playSong();
};

const pause = () => {
  if (songHasEnded) {
    pauseEndNoise();
  } else {
    pauseSong();
  }
};

const removeSong = () => {
  songHasEnded = false;
  song = undefined;
  // iPhone keeps triggering metadataloaded, so create a whole new dom instead
  song = new Audio();
};

const remainingTime = () => song.duration - song.currentTime;

export {
  play,
  pause,
  setSong,
  removeSong,
  remainingTime,
};
