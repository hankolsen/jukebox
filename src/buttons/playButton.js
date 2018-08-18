import { pause as playerPause, play as playerPlay } from '../player';

const playButton = document.querySelector('.button__play');
let isDisabled = false;

const play = () => {
  playerPlay();
};

const pause = () => {
  playerPause();
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

export { startedPlaying, resetPlayButton };
