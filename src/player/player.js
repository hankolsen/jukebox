import { publish, subscribe } from '../pubsub';
import { getRemainingTime } from '../audio';

import {
  CLEARBUTTON_CLICK,
  PLAYBUTTON_PAUSE,
  PLAYBUTTON_PLAY,
  PLAYER_CLEAR_RECORD, PLAYER_EJECT_RECORD, PLAYER_INSERT_RECORD,
  PLAYER_PAUSE,
  PLAYER_PLAY, RECORD_IS_INSERTED, SELECTORBUTTONS_SELECTION, TONEARM_READY,
} from '../events';


const songs = {
  A: [
    {
      url: 'public/audio/1Monster.mp3',
      title: 'Monster',
      label: 'public/images/dd-single.png',
    },
  ],
  B: [
    {
      url: 'public/audio/2Three.mp3',
      title: 'Three Times a Sinner',
      label: 'public/images/dd-single.png',
    },
    {
      url: 'public/audio/3Out.mp3',
      title: 'Out in the Rain',
      label: 'public/images/dd-single.png',
    },
  ],
};


let hasRecord = false;

const insertRecord = ({ letter, number }) => {
  const selectedSong = songs[letter][number] || { url: 'public/audio/endnoise.mp3' };
  const { label, url } = selectedSong;
  publish(PLAYER_INSERT_RECORD, { label, url });
};

const play = () => {
  const remainingTime = getRemainingTime();
  publish(PLAYER_PLAY, { remainingTime });
};

const pause = () => {
  publish(PLAYER_PAUSE);
};

const recordIsInserted = () => {
  hasRecord = true;
};

const clearLoadedRecord = () => {
  if (!hasRecord) {
    return;
  }
  pause();
  publish(PLAYER_CLEAR_RECORD);

  setTimeout(() => {
    hasRecord = false;
    publish(PLAYER_EJECT_RECORD);
  }, 1000);
};

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
subscribe(PLAYBUTTON_PLAY, play);
subscribe(PLAYBUTTON_PAUSE, pause);
subscribe(CLEARBUTTON_CLICK, clearLoadedRecord);
subscribe(TONEARM_READY, play);
subscribe(SELECTORBUTTONS_SELECTION, insertRecord);
subscribe(RECORD_IS_INSERTED, recordIsInserted);
