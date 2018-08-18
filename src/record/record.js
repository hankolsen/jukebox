import { recordIsInserted } from '../player';
import './record.css';
import { getAnimatableEndEvent } from '../animation';

const record = document.querySelector('.record-ui');
const player = document.querySelector('.player');
let animationEndEvent;

const setImage = ({ path }) => {
  if (path) {
    record.style.backgroundImage = `url("${path}")`;
  }
};

const rolledIn = () => {
  record.removeEventListener(animationEndEvent, rolledIn);
  record.classList.remove('rollin');
  // Put the Play/Pause buttons on top again to be able to control the player
  player.classList.remove('ontop');
  recordIsInserted();
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


export { setImage, rollInRecord, rollOutRecord };
