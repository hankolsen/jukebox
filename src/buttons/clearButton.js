import { publish, subscribe } from '../pubsub';
import { AUDIO_PLAY, CLEARBUTTON_CLICK, PLAYER_INSERT_RECORD } from '../events';

const clearButton = document.querySelector('.button__clear');

let isDisabled = false;

const disable = () => {
  clearButton.classList.add('disabled');
  isDisabled = true;
};

const enable = () => {
  clearButton.classList.remove('disabled');
  isDisabled = false;
};

clearButton.addEventListener('click', () => {
  if (isDisabled) {
    return;
  }

  publish(CLEARBUTTON_CLICK);
});

subscribe(PLAYER_INSERT_RECORD, disable);
subscribe(AUDIO_PLAY, enable);
