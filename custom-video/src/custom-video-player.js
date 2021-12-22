import {
  throttleDelayed,
  timeToText,
  isElementClicked
} from './helpers';

import './styles/custom-video-player.scss';
import playerControlsTemplate from './templates/player-controls.ejs';

const defaultColors = {
  theme: 'darkblue',
  mainText: 'white',
  darkText: 'black',
  controlsBg: 'rgba(0, 0, 0, 0.6)',
  settingsBg: 'rgba(0, 0, 0, 0.9)',
  fillerBg: 'rgba(255, 255, 255, 0.2)',
};

export default class CustomVideoPlayer {
  constructor(video, options = {}) {
    if (!video) {
      throw new Error('Video is undefined');
    }

    this.prefix = 'player';
    this.options = options;
    this.video = video;
    this.player = this._createPlayer();
    this.setColors();

    const select = s => this.player.querySelector(this.getSelector(s));
    
    this.playerActionPopup = select('action-popup');
    this.controlPanel = select('control-panel');
    this.settingsMenu = select('settings-menu');
    this.playBtn = select('play');
    this.volumeBtn = select('volume');
    this.volumeLabel = select('volume-label');
    this.fullscreenBtn = select('toggle-fullscreen');
    this.volumeSlider = select('volume-slider');
    this.volumeSliderFiller = select('volume-slider-filler');
    this.durationLabel = select('duration')
    this.progressBar = select('progress-bar');
    this.progressBarFiller = select('progress-bar-filler');
    this.progressBarTimeLabel = select('progress-bar-time-label');

    this.isSettingsMenuVisible = false;
    this.isProgressBarMouseDown = false;
    this.isVolumeSliderMouseDown = false;
    this.isVolumeSliderMouseOver = false;
    this.isFullscreen = false;
    this.playbackRate = 1;
    this.skipInterval = 20;
    this.playerActionPopupDuration = 400;
    this.volumeSliderWidth = 60;
    this.afkDelay = 2000;
    this.isUserAfk = true;
    this.afkTimer = null;
    
    this.player.addEventListener('mouseenter', this.showControlPanel);
    this.player.addEventListener('mouseleave', this.hideControlPanel);

    this.playerActionPopup.addEventListener('click', this.toggleVideoPlay);
    this.video.addEventListener('click', this.toggleVideoPlay);
    this.video.addEventListener('play', this.handleVideoPlay);
    this.video.addEventListener('pause', this.handleVideoPause);
    this.video.addEventListener('volumechange', this.handleVolumeChange);
    this.video.addEventListener('timeupdate', this.handleProgress);

    this.volumeSlider.addEventListener('mousedown', this.handleVolumeSliderMouseDown);
    this.volumeSlider.addEventListener('mouseup', this.handleVolumeSliderMouseUp);
    this.volumeBtn.addEventListener('mouseover', this.handleVolumeSliderMouseOver);
    this.volumeBtn.addEventListener('mouseout', this.handleVolumeSliderMouseOut);
    
    this.progressBar.addEventListener('mousedown', this.handleProgressBarMouseDown);
    this.progressBar.addEventListener('mouseup', this.handleProgressBarMouseUp);
    this.progressBar.addEventListener('mouseover', this.handleProgressBarMouseOver);
    this.progressBar.addEventListener('mouseout', this.handleProgressBarMouseOut);
    this.progressBar.addEventListener('mousemove', throttleDelayed(this.handleProgressBarMouseMove));

    document.addEventListener('click', this.handleDocumentClick);
    document.addEventListener('mousemove', throttleDelayed(this.handleDocumentMouseMove));
    document.addEventListener('mouseup', this.handleVolumeSliderMouseUp)

    this.controlPanel.addEventListener('click', this.handleControlPanelClick);

    this.video.volume = 0.1;
    this.video.pause();
  }
  
  setColors = ( ) => {
    const colors = this.options.colors || {};
    const { theme, mainText, darkText, controlsBg, settingsBg, fillerBg } = {...defaultColors, ...colors };
    const set = (prop, color) => this.player.style.setProperty(prop, color);
    set('--player-main-color', theme);
    set('--player-main-text-color', mainText);
    set('--player-dark-text-color', darkText);
    set('--player-controls-bg-color', controlsBg);
    set('--player-menu-bg-color', settingsBg);
    set('--player-filler-bg', fillerBg);
  }

  _createPlayer = () => {
    const player = document.createElement('div');
    player.classList.add(this.prefix);
    this.video.parentNode.insertBefore(player, this.video);
    this.video.classList.add(this.className('viewport'));
    this.video.removeAttribute('controls');
    this.video.setAttribute('muted', true);

    player.appendChild(this.video);
    player.insertAdjacentHTML('beforeend', playerControlsTemplate());
    return player;
  }

  getSelector = (name) => '.' + this.className(name);

  className = (name) => `${this.prefix}__${name}`

  showControlPanel = () => {
    this.controlPanel.classList.add(this.className('control-panel_show'));
  }

  hideControlPanel = () => {
    this.controlPanel.classList.remove(this.className('control-panel_show'));
    this.hideSettingsMenu();
  }

  handleSettingsMenuClick = (_, radio) => {
    const input = radio.querySelector('input');
    switch (input.name) {
      case 'playback': this.changePlaybackRate(input.value); return;
      case 'skip': this.changeSkipInterval(input.value); return;
      default: return;
    }
  }

  handleButtonClick = (_, btn) => {
    switch (btn.dataset.fn) {
      case 'play': this.toggleVideoPlay(); return;
      case 'forward': this.skipVideo(this.skipInterval); return;
      case 'backward': this.skipVideo(-this.skipInterval); return;
      case 'mute': this.toggleVideoMute(); return;
      case 'settings': this.toggleSettingsMenu(); return;
      case 'toggle-fullscreen': this.toggleFullscreen(); return;
      default: return;
    }
  }

  handleControlPanelClick = (e) => {
    const closest = (e, name) => e.target.closest(this.getSelector(name));
    
    const handlers = { 
      'volume-slider': this.handleVolumeSliderChange,
      'progress-bar': this.handleProgressBarClick,
      'custom-radio': this.handleSettingsMenuClick,
      'button': this.handleButtonClick
    }

    let el = null;
    const handlerName = Object.keys(handlers).find(name => el = closest(e, name));
    if (handlerName) {
      handlers[handlerName](e, el);
    }
  }

  changePlaybackRate = (newValue) => {
    if (newValue !== this.playbackRate) {
      this.playbackRate = newValue;
      this.video.playbackRate = this.playbackRate;
    }
  };

  changeSkipInterval = (newValue) => {
    this.skipInterval = newValue;
  };

  toggleVideoPlay = () => {
    const method = this.video.paused ? 'play' : 'pause';
    this.video[method]();
  }

  toggleFullscreen = () => {
    const [ compress, expand ] = [
      this.className('button_compress'),
      this.className('button_expand')
    ];
    if (this.isFullscreen && document.exitFullscreen) {
      document.exitFullscreen();
      this.isFullscreen = false;
      this.fullscreenBtn.classList.replace(compress, expand);
      clearTimeout(this.afkTimer);
    } else if (this.player.requestFullscreen) {
      this.player.requestFullscreen();
      this.isFullscreen = true;
      this.fullscreenBtn.classList.replace(expand, compress);
    }
  }

  toggleVideoMute = () => {
    const { muted, volume } = this.video;
    if (muted && volume === 0) {
      return;
    }
    this.video.muted = !muted;
    this.handleVolumeChange();
  }

  toggleSettingsMenu = () => {
    this.isSettingsMenuVisible = !this.isSettingsMenuVisible;
    this.settingsMenu.style.display = this.isSettingsMenuVisible ? 'block' : 'none';
  }

  handleDocumentClick = (e) => {
    if (isElementClicked(e, [this.className('settings-menu'), this.className('settings')])) {
      return;
    }
    this.hideSettingsMenu();
  }

  handleDocumentMouseMove = (e) => {
    const noCursor = this.className('_no-cursor');
    if (this.isFullscreen) {
      this.isUserAfk = false;
      this.showControlPanel();
      this.player.classList.remove(noCursor);
      clearTimeout(this.afkTimer);

      this.afkTimer = setTimeout(() => {
        this.isUserAfk = true;
        this.hideControlPanel();
        this.player.classList.add(noCursor);
      }, this.afkDelay);
    }

    this.handleVolumeSliderChange(e);
  }

  hideSettingsMenu = () => {
    this.isSettingsMenuVisible = false;
    this.settingsMenu.style.display = 'none';
  }

  skipVideo = (value) => {
    this.video.currentTime += parseFloat(value);
  }

  showPlayerActionPopup = (modificator) => {
    const className = this.className(`action-popup_${modificator}`);
    this.playerActionPopup.classList.add(className);
    setTimeout(() => {
      this.playerActionPopup.classList.remove(className);
    }, this.playerActionPopupDuration);
  }

  handleVideoPlay = () => {
    this.playerActionPopup.classList.remove(this.className('action-popup_show'));
    this.playBtn.classList.replace(this.className('button_play'), this.className('button_pause'));

  }

  handleVideoPause = () => {
    console.log(this.playerActionPopup.classList)
    this.playerActionPopup.classList.add(this.className('action-popup_show'));
    this.playBtn.classList.replace(this.className('button_pause'), this.className('button_play'));
  }

  handleVolumeChange = () => {
    if (this.video.muted) {      
      this.volumeSlider.dataset.value = 0;
      this.volumeSliderFiller.style.width = '0%';
      this.volumeBtn.classList.replace(this.className('button_volume-up'), this.className('button_volume-mute'));
    } else {
      const { volume } = this.video;
      this.volumeSlider.dataset.value = volume;
      this.volumeSliderFiller.style.width = `${volume * 100}%`;
      this.volumeBtn.classList.replace(this.className('button_volume-mute'), this.className('button_volume-up'));
    }
    this.volumeLabel.textContent = this.volumeSliderFiller.style.width;
  }

  handleVolumeSliderChange = (e) => {
    if (this.isVolumeSliderMouseDown) {
      const { x: volumeSliderX } = this.volumeSlider.getBoundingClientRect();
      let sliderX = e.screenX < volumeSliderX ? 0 : e.screenX % volumeSliderX;
      if (sliderX > this.volumeSliderWidth) {
        sliderX = this.volumeSliderWidth;
      }
      const volume = +(sliderX / this.volumeSliderWidth).toFixed(2);
      this.video.muted = volume === 0;
      this.video.volume = volume;
    }
  }

  handleProgress = () => {
    const { currentTime, duration } = this.video;
    this.durationLabel.textContent = `${timeToText(currentTime)} / ${timeToText(duration)}`;
    const percent = (currentTime / duration) * 100;
    this.progressBarFiller.style.width = `${percent}%`;
  }

  handleProgressBarClick = (e) => {
    this.video.currentTime = (e.offsetX / this.progressBar.offsetWidth) * this.video.duration;
  }

  showTimeLabel = (time, offset) => {
    this.progressBarTimeLabel.textContent = timeToText(time);
    this.progressBarTimeLabel.style.left = `${offset}px`;
  }

  handleProgressBarMouseMove = (e) => {
    const { offsetWidth } = this.progressBar;
    const { offsetWidth: timeLabelWidth } = this.progressBarTimeLabel;
    const time = (e.offsetX / offsetWidth) * this.video.duration;

    let offset = e.offsetX - timeLabelWidth / 2;
    if (offset < 0) {
      offset = 0;
    }
    if (offset > offsetWidth - timeLabelWidth) {
      offset = offsetWidth - timeLabelWidth;
    }
    if (this.isProgressBarMouseDown) {
      this.video.currentTime = time;
    }
    this.showTimeLabel(time, offset);
  }

  handleProgressBarMouseOver = () => {
    this.progressBarTimeLabel.style.display = 'block';
  }

  handleProgressBarMouseOut = () => {
    this.progressBarTimeLabel.style.display = 'none';
    this.isProgressBarMouseDown = false;
  }

  handleProgressBarMouseDown = (e) => {
    this.video.pause();
    this.isProgressBarMouseDown = true;
    this.handleProgressBarMouseMove(e);
  }

  handleProgressBarMouseUp = () => {
    this.video.play();
    this.isProgressBarMouseDown = false;
  }

  handleVolumeSliderMouseDown = (e) => {
    this.isVolumeSliderMouseDown = true;
    this.handleVolumeSliderChange(e);
  }

  hideVolumeSlider = () => {
    this.volumeBtn.classList.remove(this.className('volume_show'));
  }

  showVolumeSlider = () => {
    this.volumeBtn.classList.add(this.className('volume_show'));
  }

  handleVolumeSliderMouseUp = () => {
    if (!this.isVolumeSliderMouseOver) {
      this.hideVolumeSlider();
    }
    this.isVolumeSliderMouseDown = false;
  }

  handleVolumeSliderMouseOut = () => {
    this.isVolumeSliderMouseOver = false;
    if (!this.isVolumeSliderMouseDown) {
      this.hideVolumeSlider();
    }
  }

  handleVolumeSliderMouseOver = () => {
    this.isVolumeSliderMouseOver = true;
    this.showVolumeSlider();
  }
}