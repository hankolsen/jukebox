import { publish, subscribe } from '../pubsub';
import { PLAYER_EJECT_RECORD, PLAYER_INSERT_RECORD, RECORD_IS_INSERTED } from '../events';
import { getAnimatableEndEvent } from '../animation';

const record = document.querySelector('.record-ui');
const player = document.querySelector('.player');
let animationEndEvent;

const setImage = ({ label }) => {
  if (label) {
    record.style.backgroundImage = `url("${label}")`;
  }
};

const rolledIn = () => {
  record.removeEventListener(animationEndEvent, rolledIn);
  record.classList.remove('rollin');
  // Put the Play/Pause buttons on top again to be able to control the player
  player.classList.remove('ontop');
  publish(RECORD_IS_INSERTED);
};

const rollInRecord = () => {
  player.classList.add('ontop');
  record.classList.remove('out');
  record.classList.add('rollin');
  animationEndEvent = getAnimatableEndEvent('animation');
  record.addEventListener(animationEndEvent, rolledIn, false);
};

const rolledOut = () => {
  record.removeEventListener(animationEndEvent, rolledOut);
  record.classList.add('out');
  record.classList.remove('rollout');
  player.classList.remove('ontop');
};

const rollOutRecord = () => {
  player.classList.add('ontop');
  record.classList.add('rollout');
  animationEndEvent = getAnimatableEndEvent('animation');
  record.addEventListener(animationEndEvent, rolledOut, false);
};

subscribe(PLAYER_INSERT_RECORD, ({ label }) => {
  rollInRecord();
  setImage({ label });
});

subscribe(PLAYER_EJECT_RECORD, rollOutRecord);
