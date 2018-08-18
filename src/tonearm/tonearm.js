import {
  getAnimatableEndEvent,
  removeTransform, removeTransition,
  rotateX,
  setAnimation,
  setRotationAngle,
  setTransitionDuration,
} from '../animation';

import './tonearm.css';
import { getRemainingTime } from '../player';

const MAX_ANGLE = 25;

const tonearm = document.querySelector('.tonearm');
const tonearmImage = tonearm.querySelector('.tonearm__image');

const moveToneArmToStart = () => {
  const transitionEndEvent = getAnimatableEndEvent('transition');
  tonearm.classList.add('in');
  return new Promise(resolve => tonearm.addEventListener(transitionEndEvent, resolve));
};

const lowerArm = () => {
  rotateX(tonearmImage, 0);
};

const raiseArm = () => {
  rotateX(tonearmImage, 20);
};

const startWobble = () => tonearm.classList.add('wobble');
const stopWobble = () => tonearm.classList.remove('wobble');

const stopMoving = () => {
  setAnimation(tonearm, '');
  stopWobble();
};

function playToEnd() {
  setTransitionDuration(tonearm, getRemainingTime());
  setRotationAngle(tonearm, MAX_ANGLE);
  startWobble();
}

const play = () => {
  lowerArm();
  playToEnd();
  tonearm.classList.remove('in');
};

const pause = () => {
  raiseArm();
  stopMoving();
};

const resetTransition = () => {
  removeTransform(tonearm);
  removeTransition(tonearm);
};

const returnToRest = () => {
  raiseArm();
  setTransitionDuration(tonearm, 1);
  setRotationAngle(tonearm, 0);
  const transitionEndEvent = getAnimatableEndEvent('transition');
  tonearm.addEventListener(transitionEndEvent, resetTransition, { once: true });
};

export {
  moveToneArmToStart,
  returnToRest,
  lowerArm,
  play,
  pause,
};
