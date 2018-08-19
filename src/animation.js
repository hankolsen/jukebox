/* eslint-disable no-return-assign, no-param-reassign */
const capitalize = str => [str.slice(0, 1).toUpperCase(), ...str.slice(1)].join();

/**
 * getAnimatableEndEvent
 *
 * returns the name of transitionend/animationend event for cross browser compatibility
 *
 * @param {string} type of the animatableEvent: 'transition' or 'animation'
 * @returns {string} the transitionend/animationend event name
 */
const getAnimatableEndEvent = function whichAnimationType(type) {
  let animatableEvent;

  const el = document.createElement('fakeelement');
  const capitalType = capitalize(type);

  const animations = {
    [type]: `${type}end`,
    [`O${capitalType}`]: `o${capitalType}End`,
    [`Moz${capitalType}`]: `${type}end`,
    [`Webkit${capitalType}`]: `webkit${capitalType}End`,
    [`MS${capitalType}`]: `MS${capitalType}End`,
  };

  const hasEventEnd = Object.keys(animations).some((item) => {
    if (el.style[item] !== undefined) {
      animatableEvent = animations[item];
      return true;
    }

    return false;
  });

  if (!hasEventEnd) {
    throw new Error(`${type}end is not supported in your web browser.`);
  }

  return animatableEvent;
};

const setAnimation = (el, animation) => el.style.webkitAnimation = animation;

const setAnimationPlayState = (el, state) => el.style.animationPlayState = state ? 'running' : 'paused';

const rotateX = (el, angle) => el.style.transform = `rotate3d(1, 0, 0, ${angle}deg)`;

const setTransitionDuration = (el, duration) => el.style.transition = `transform ${duration}s linear`;

const setRotationAngle = (el, angle) => el.style.transform = `rotate3d(0, 0, 1, ${angle}deg`;

const removeTransition = el => el.style.transition = '';

const removeTransform = el => el.style.transform = '';

const getMatrix = (el) => {
  const style = window.getComputedStyle(el, null);
  return style.getPropertyValue('-webkit-transform') || style.getPropertyValue('transform');
};

const setCurrentRotation = el => el.style.transform = getMatrix(el);

export {
  getAnimatableEndEvent,
  setAnimationPlayState,
  rotateX,
  setAnimation,
  setRotationAngle,
  setCurrentRotation,
  setTransitionDuration,
  removeTransition,
  removeTransform,
};
