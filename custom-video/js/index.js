
const player = document.querySelector('.player');
const playerActionPopup = player.querySelector('.player__action-popup');
const video = player.querySelector('.player__viewport');

const controlPanel = player.querySelector('.player__control-panel');
const settingsMenu = controlPanel.querySelector('.control-panel__settings-menu');
const playBtn = controlPanel.querySelector('[data-fn="play"]');
const volumeBtn = controlPanel.querySelector('[data-fn="mute"]');
const fullscreenBtn = controlPanel.querySelector('[data-fn="toggle-fullscreen"]');
const volumeSlider = controlPanel.querySelector('.volume-slider');
const durationLabel = controlPanel.querySelector('.control-panel__duration')
const progressBar = controlPanel.querySelector('.progress-bar');
const progressBarFiller = progressBar.querySelector('.progress-bar__filler');
const progressBarTimeLabel = progressBar.querySelector('.progress-bar__time-label');

let isSettingsMenuVisible = false;
let isProgressBarMouseDown = false;
let isVolumeSliderMouseDown = false;
let isFullscreen = false;
let playbackRate = 1;
let skipInterval = 20;

const playerActionPopupDuration = 400;
const throttlingDelay = 50;

function changePlaybackRate(newValue) {
  if (newValue !== playbackRate) {
    playbackRate = newValue;
    video.playbackRate = playbackRate;
  }
};

function changeSkipInterval(newValue) {
  skipInterval = newValue;
};

function toggleVideoPlay() {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}

function toggleFullscreen() {
  if (isFullscreen && document.exitFullscreen) {
    document.exitFullscreen();
    isFullscreen = false;
    fullscreenBtn.classList.replace('button_compress', 'button_expand');
  } else if (player.requestFullscreen) {
    player.requestFullscreen();
    isFullscreen = true;
    fullscreenBtn.classList.replace('button_expand', 'button_compress');
  }
}

function toggleVideoMute() {
  if (video.muted && video.volume === 0) {
    return;
  }
  const popupModificator = video.muted ? 'volume-up' : 'volume-mute';
  showPlayerActionPopup(popupModificator);
  video.muted = !video.muted;
  handleVolumeChange();
}

function toggleSettingsMenu() {
  isSettingsMenuVisible = !isSettingsMenuVisible;
  settingsMenu.style.display = isSettingsMenuVisible ? 'block' : 'none';
}

function isSettingsEl(el) {
  const result = (
    (el.dataset && el.dataset.fn === 'settings') ||
    (el.classList && el.classList.contains('control-panel__settings-menu'))
  );
  return result;
}

function hideSettingsMenu(e) {
  if (e && e.path.find(el => isSettingsEl(el))) {
    return;
  }
  isSettingsMenuVisible = false;
  settingsMenu.style.display = 'none';
}

function skipVideo(value) {
  video.currentTime += parseFloat(value);
}

function showPlayerActionPopup(modificator) {
  const className = `player__action-popup_${modificator}`;
  playerActionPopup.classList.add(className);
  setTimeout(() => {
    playerActionPopup.classList.remove(className);
  }, playerActionPopupDuration);
}

function handleVideoPlay() {
  showPlayerActionPopup('play');
  playBtn.classList.replace('button_play', 'button_pause');

}

function handleVideoPause() {
  showPlayerActionPopup('pause');
  playBtn.classList.replace('button_pause', 'button_play');
}

function handleVolumeChange() {
  if (video.muted) {
    volumeSlider.value = 0;
    volumeBtn.classList.replace('button_volume-up', 'button_volume-mute');
  } else {
    volumeSlider.value = video.volume;
    volumeBtn.classList.replace('button_volume-mute', 'button_volume-up');
  }
}

function handleVolumeSliderChange(e) {
  if (!(e.type === 'click') && !isVolumeSliderMouseDown) {
    return;
  }
  video.muted = +e.target.value === 0;
  video.volume = e.target.value;
}

function handleProgress() {
  durationLabel.textContent = `${timeToText(video.currentTime)} / ${timeToText(video.duration)}`;
  const percent = (video.currentTime / video.duration) * 100;
  progressBarFiller.style.width = `${percent}%`;
}

function handleProgressBarClick(e) {
  video.currentTime = (e.offsetX / progressBar.offsetWidth) * video.duration;
}

function timeToText(time) {
  time = Math.trunc(time);
  const seconds = time % 60;
  const minutes = Math.trunc(time / 60) % 60;
  const hours = Math.trunc(time / 60 / 60);
  const hoursLabel = hours ? `${hours}:` : '';
  return `${hoursLabel}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function showTimeLabel(time, offset) {
  progressBarTimeLabel.textContent = timeToText(time);
  progressBarTimeLabel.style.left = `${offset}px`;
}

function handleProgressBarMouseMove(e) {
  const time = (e.offsetX / progressBar.offsetWidth) * video.duration;
  let offset = e.offsetX - progressBarTimeLabel.offsetWidth / 2;
  if (offset < 0) {
    offset = 0;
  }
  if (offset > progressBar.offsetWidth - progressBarTimeLabel.offsetWidth) {
    offset = progressBar.offsetWidth - progressBarTimeLabel.offsetWidth;
  }
  if (isProgressBarMouseDown) {
    video.currentTime = time;
  }
  showTimeLabel(time, offset);
}

function handleProgressBarMouseOver() {
  progressBarTimeLabel.style.display = 'block';
}

function handleProgressBarMouseOut() {
  progressBarTimeLabel.style.display = 'none';
  isProgressBarMouseDown = false;
}

function handleProgressBarMouseDown(e) {
  isProgressBarMouseDown = true;
  handleProgressBarMouseMove(e);
}

function handleProgressBarMouseUp() {
  isProgressBarMouseDown = false;
}

function handleVolumeSliderMouseDown() {
  isVolumeSliderMouseDown = true;
}
function handleVolumeSliderMouseUp() {
  isVolumeSliderMouseDown = false;
}
function handleVolumeSliderMouseOut() {
  isVolumeSliderMouseDown = false;
}

// doesnt work with objects methods
const throttle = (ms, fn) => {
  let cooldown = false;
  let savedArgs = null;

  function wrapper(...args) {
    if (cooldown) {
      savedArgs = args;
      return;
    }
    cooldown = true;
    setTimeout(() => {
      fn.apply(null, args);
      cooldown = false;
      if (savedArgs) {
        wrapper.apply(null, savedArgs);
        savedArgs = null;
      }
    }, ms);
  }
  return wrapper;
};

const throttleDelayed = fn => throttle.call(null, throttlingDelay, fn);

video.addEventListener('click', toggleVideoPlay);
video.addEventListener('play', handleVideoPlay);
video.addEventListener('pause', handleVideoPause);
video.addEventListener('volumechange', handleVolumeChange);
video.addEventListener('timeupdate', handleProgress);

volumeSlider.addEventListener('mousemove', throttleDelayed(handleVolumeSliderChange));
volumeSlider.addEventListener('mousedown', handleVolumeSliderMouseDown);
volumeSlider.addEventListener('mouseup', handleVolumeSliderMouseUp);
volumeSlider.addEventListener('mouseout', handleVolumeSliderMouseOut);

progressBar.addEventListener('mousedown', handleProgressBarMouseDown);
progressBar.addEventListener('mouseup', handleProgressBarMouseUp);
progressBar.addEventListener('mouseover', handleProgressBarMouseOver);
progressBar.addEventListener('mouseout', handleProgressBarMouseOut);
progressBar.addEventListener('mousemove', throttleDelayed(handleProgressBarMouseMove));

document.addEventListener('click', hideSettingsMenu);

controlPanel.addEventListener('click', e => {
  console.log(e);
  
  if (e.target.classList.contains('volume-slider')) {
    handleVolumeSliderChange(e);
    return;
  }
  if (e.target.classList.contains('progress-bar')) {
    handleProgressBarClick(e);
    return;
  }

  if (e.target.nodeName === 'INPUT') {
    switch (e.target.name) {
      case 'playback': changePlaybackRate(e.target.value); return;
      case 'skip': changeSkipInterval(e.target.value); return;
      default: return;
    }
  }
  
  const btn = e.target.closest('.button');
  if (btn) {
    switch (btn.dataset.fn) {
      case 'play': toggleVideoPlay(); return;
      case 'forward': skipVideo(skipInterval); return;
      case 'backward': skipVideo(-skipInterval); return;
      case 'mute': toggleVideoMute(); return;
      case 'settings': toggleSettingsMenu(); return;
      case 'toggle-fullscreen': toggleFullscreen(); return;
      default: return;
    }
  }
});

video.volume = 0.25;
handleVolumeChange();
handleVideoPlay();

console.log(`Всего (60 / 60) :
1) Вёрстка, дизайн, UI (20 / 20)
  - внешний вид приложения соответствует предложенному образцу или является его улучшенной версией (5 / 5)
  - вёрстка адаптивная. Приложения корректно отображается и отсутствует полоса прокрутки при ширине страницы от 1920рх до 768рх (5 / 5)
  - интерактивность элементов, с которыми пользователи могут взаимодействовать, изменение внешнего вида самого элемента и состояния курсора при наведении, использование разных стилей для активного и неактивного состояния элемента, плавные анимации (5 / 5)
2) Кнопка Play/Pause (10 / 10)
  - есть кнопка Play/Pause при клике по которой можно запустить или остановить проигрывание видео (5 / 5)
  - внешний вид и функционал кнопки изменяется в зависимости от того, проигрывается ли видео в данный момент (5 / 5)
3) Есть прогресс-бар ползунок которого перемещается отображая прогресс проигрывания видео. При перемещении ползунка вручную меняется время текущего проигрывания видео (10 / 10)
4) Есть кнопка Volume/Mute при клике по которой можно включить или отключить звук (10 / 10)
5) Есть регулятор громкости звука (10 / 10)
6) Функционал плеера соответствует демо или является его улучшенной версией (5 / 5)
`);
