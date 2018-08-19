import { publish, subscribe } from '../pubsub';
import { CLEARBUTTON_CLICK, PLAYER_EJECT_RECORD, SELECTORBUTTONS_SELECTION } from '../events';

const selectorButtons = [...document.querySelectorAll('.selectorButtons button')];
let isLocked = false;

const pressedButtons = {
  button__letter: false,
  button__number: false,
};

const buttonType = button => [...button.classList].filter(cls => ['button__number', 'button__letter'].includes(cls));

const press = (button) => {
  pressedButtons[buttonType(button)] = button.innerText;
  button.classList.add('pressed');
};

const depress = (button) => {
  pressedButtons[buttonType(button)] = false;
  button.classList.remove('pressed');
};

const validSelection = () => Object.values(pressedButtons).reduce((valid, state) => valid && state, true);

const isPressed = button => button.classList.contains('pressed');


const lock = () => {
  isLocked = true;
};

const unlock = () => {
  isLocked = false;
};

const depressOtherButtonIfPressed = (pressedButton) => {
  const pressedButtonType = buttonType(pressedButton);
  const [otherButton] = [...pressedButton.parentElement.querySelectorAll(`.${pressedButtonType}`)]
    .filter(button => button !== pressedButton);
  depress(otherButton);
};

selectorButtons.forEach((button) => {
  button.addEventListener('click', () => {
    if (isLocked) {
      return;
    }

    if (isPressed(button)) {
      depress(button);
      return;
    }

    depressOtherButtonIfPressed(button);
    press(button);

    if (validSelection()) {
      lock();
      const letter = pressedButtons.button__letter;
      const number = parseInt(pressedButtons.button__number, 10) - 1;
      publish(SELECTORBUTTONS_SELECTION, { letter, number });
    }
  });
});

const clearAll = () => {
  selectorButtons.map(button => depress(button));
  unlock();
};

subscribe(PLAYER_EJECT_RECORD, clearAll);
subscribe(CLEARBUTTON_CLICK, clearAll);
