import { publish, subscribe } from './pubsub';
import {
  AUDIO_PLAY, PLAYER_EJECT_RECORD,
  PLAYER_INSERT_RECORD,
  PLAYER_PAUSE,
  PLAYER_PLAY,
} from './events';

let songHasEnded = false;
let song = new Audio();
const endNoise = new Audio('public/audio/endnoise.mp3');
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

const setSong = ({ url }) => {
  song.src = url;
  loadSong();
};

const playSong = () => song.play();

const pauseSong = () => song.pause();


const pauseEndNoise = () => {
  endNoise.pause();
};

const play = () => {
  if (songHasEnded) {
    playEndNoise();
  }

  playSong().then(() => {
    setTimeout(() => {
      publish(AUDIO_PLAY);
    }, 700);
  });
};

const pause = () => {
  if (songHasEnded) {
    pauseEndNoise();
  } else {
    setTimeout(pauseSong, 200);
  }
};

const removeSong = () => {
  songHasEnded = false;
  song = undefined;
  // iPhone keeps triggering metadataloaded, so create a whole new dom instead
  song = new Audio();
};

const getRemainingTime = () => song.duration - song.currentTime;

subscribe(PLAYER_PAUSE, pause);

subscribe(PLAYER_INSERT_RECORD, setSong);

subscribe(PLAYER_PLAY, () => {
  setTimeout(play, 700);
});

subscribe(PLAYER_EJECT_RECORD, removeSong);

export {
  getRemainingTime,
};
