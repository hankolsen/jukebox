import { clearAll as clearAllSelectorButtons } from './selectorButtons';
import { clearLoadedRecord } from '../player';

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

  clearAllSelectorButtons();
  clearLoadedRecord();
});

export { enable, disable };
