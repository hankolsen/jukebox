import {
  pause as pauseAudio, play as playAudio, remainingTime, removeSong, setSong,
} from '../audio';
import { pause as platterPause, play as platterPlay, reset as platterReset } from '../platter';
import {
  clearAll as resetSelectorButtons,
  disable as disableClearButton,
  enable as enableClearButton,
  resetPlayButton,
  startedPlaying,
} from '../buttons';
import { rollInRecord, rollOutRecord, setImage } from '../record';
import {
  moveToneArmToStart,
  pause as tonearmPause,
  play as tonearmPlay,
  returnToRest as tonearmReturn,
} from '../tonearm';

import './player.css';

const songs = {
  A: [
    {
      url: 'src/audio/1Monster.mp3',
      title: 'Monster',
      label: 'src/images/dd-single.png',
    },
  ],
  B: [
    {
      url: 'src/audio/2Three.mp3',
      title: 'Three Times a Sinner',
      label: 'src/images/dd-single.png',
    },
    {
      url: 'src/audio/3Out.mp3',
      title: 'Out in the Rain',
      label: 'src/images/dd-single.png',
    },
  ],
};


let hasRecord = false;

const insertRecord = ({ letter, number }) => {
  disableClearButton();
  const selectedSong = songs[letter][number] || { url: 'src/audio/endnoise.mp3' };
  setSong(selectedSong);
  setImage({ path: selectedSong.label });
  rollInRecord();
};

const play = () => {
  platterPlay();
  tonearmPlay();
  setTimeout(() => {
    playAudio()
      .then(() => {
        startedPlaying();
        enableClearButton();
      });
  }, 700);
};

const pause = () => {
  tonearmPause();
  setTimeout(pauseAudio, 200);
  setTimeout(platterPause, 500);
};

const recordIsInserted = () => {
  hasRecord = true;
  moveToneArmToStart().then(() => {
    play();
  });
};

const ejectRecord = () => {
  rollOutRecord();
  hasRecord = false;
};

const clearLoadedRecord = () => {
  if (!hasRecord) {
    return;
  }

  pause();
  tonearmReturn();
  platterReset();
  setTimeout(() => {
    ejectRecord();
    removeSong();
    resetSelectorButtons();
    resetPlayButton();
  }, 1000);
};

const getRemainingTime = () => remainingTime();

const setupLabels = () => {
  const label = document.querySelector('.label');

  Object.entries(songs).forEach(([letter, entries]) => {
    const list = document.createElement('dl');
    const term = document.createElement('dt');
    term.innerText = letter;
    list.appendChild(term);
    entries.forEach(({ title }, index) => {
      const clazz = index === 0 ? 'top' : 'bottom';
      const description = document.createElement('dd');
      description.classList.add(clazz);
      const span = document.createElement('span');
      span.classList.add(`${letter}`);
      span.innerText = `${letter}${index + 1}`;
      description.appendChild(span);
      const textLabel = document.createTextNode(title);
      description.appendChild(textLabel);
      list.appendChild(description);
      label.appendChild(list);
    });
  });
};

setupLabels();

export {
  insertRecord,
  play,
  pause,
  recordIsInserted,
  getRemainingTime,
  clearLoadedRecord,
  songs,
};
