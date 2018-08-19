import { subscribe } from '../pubsub';
import { PLAYER_CLEAR_RECORD, PLAYER_PAUSE, PLAYER_PLAY } from '../events';
import {
  getAnimatableEndEvent,
  setAnimationPlayState,
  setCurrentRotation,
  setRotationAngle,
  setTransitionDuration,
} from '../animation';

const platter = document.querySelector('.platter');

const startSpinning = () => {
  setAnimationPlayState(platter, true);
};

const stopSpinning = () => {
  setAnimationPlayState(platter, false);
};

const play = () => {
  startSpinning();
};

const pause = () => {
  setTimeout(stopSpinning, 500);
};

const reset = () => {
  // For some reason the rotation need to be set both before and after out class has been added...
  setCurrentRotation(platter);
  platter.classList.add('out');
  setCurrentRotation(platter);

  // Make the platter rotate back to origin
  setTransitionDuration(platter, 0.8);
  setRotationAngle(platter, 0);

  // When the platter has returned, remove some stuff that we added
  const transitionEndEvent = getAnimatableEndEvent('animation');
  platter.addEventListener(transitionEndEvent, () => {
    // removeTransition(platter);
    platter.classList.remove('out');
  });
};

subscribe(PLAYER_PLAY, play);
subscribe(PLAYER_PAUSE, pause);
subscribe(PLAYER_CLEAR_RECORD, reset);
