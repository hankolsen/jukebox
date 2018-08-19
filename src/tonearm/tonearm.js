import { publish, subscribe } from '../pubsub';
import {
  PLAYER_CLEAR_RECORD,
  PLAYER_PAUSE,
  PLAYER_PLAY, RECORD_IS_INSERTED,
  TONEARM_READY,
} from '../events';
import {
  getAnimatableEndEvent,
  removeTransform, removeTransition,
  rotateX,
  setAnimation,
  setRotationAngle,
  setTransitionDuration,
} from '../animation';

const MAX_ANGLE = 25;

const tonearm = document.querySelector('.tonearm');
const tonearmImage = tonearm.querySelector('.tonearm__image');

const moveToneArmToStart = () => {
  const transitionEndEvent = getAnimatableEndEvent('transition');
  tonearm.classList.add('in');
  tonearm.addEventListener(transitionEndEvent, () => {
    publish(TONEARM_READY);
  }, { once: true });
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

function playToEnd({ remainingTime }) {
  setTransitionDuration(tonearm, remainingTime);
  setRotationAngle(tonearm, MAX_ANGLE);
  startWobble();
}

const play = ({ remainingTime }) => {
  lowerArm();
  playToEnd({ remainingTime });
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

subscribe(PLAYER_PLAY, play);
subscribe(PLAYER_PAUSE, pause);
subscribe(PLAYER_CLEAR_RECORD, returnToRest);
subscribe(RECORD_IS_INSERTED, moveToneArmToStart);
