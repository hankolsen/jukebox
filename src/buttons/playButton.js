import { publish, subscribe } from '../pubsub';
import {
  AUDIO_PLAY,
  PLAYBUTTON_PAUSE,
  PLAYBUTTON_PLAY,
  PLAYER_EJECT_RECORD,
} from '../events';

const playButton = document.querySelector('.button__play');
let isDisabled = false;

const play = () => {
  publish(PLAYBUTTON_PLAY);
};

const pause = () => {
  publish(PLAYBUTTON_PAUSE);
};

const disable = () => {
  playButton.classList.add('disabled');
  isDisabled = true;
};

const enable = () => {
  playButton.classList.remove('disabled');
  isDisabled = false;
};

const startedPlaying = () => {
  enable();
  playButton.innerText = 'Pause';
};

const resetPlayButton = () => {
  disable();
  playButton.innerText = 'Play';
};

playButton.addEventListener('click', () => {
  if (isDisabled) {
    return;
  }
  const isPlaying = playButton.innerText === 'Pause';
  playButton.innerText = isPlaying ? 'Play' : 'Pause';
  if (isPlaying) {
    pause();
  } else {
    play();
  }
});

disable();

subscribe(AUDIO_PLAY, startedPlaying);
subscribe(PLAYER_EJECT_RECORD, resetPlayButton);
