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
    this.prefix = 'player';
    this.options = options;
    this.video = video;
    this.player = this.createPlayer();
    this.setColors();

    const select = s => this.player.querySelector(this.getSelector(s));
    
    this.playerActionPopup = select('action-popup');
    this.controlPanel = select('control-panel');
    this.settingsMenu = select('settings-menu');
    this.playBtn = select('play');
    this.volumeBtn = select('volume');
    this.volumeLabel = select('volume-label');
    this.volumeContainer = select('volume-container');
    this.fullscreenBtn = select('toggle-fullscreen');
    this.volumeSlider = select('volume-slider');
    this.volumeSliderFiller = select('volume-slider-filler');
    this.durationLabel = select('duration')
    this.progressBar = select('progress-bar');
    this.progressBarFiller = select('progress-bar-filler');
    this.progressBarThumb = select('progress-bar-thumb');
    this.progressBarTooltip = select('progress-bar-tooltip');
    this.progressBarTooltipTime = select('progress-bar-tooltip-time');
    this.progressBarTooltipBg = select('progress-bar-tooltip-bg');

    this.isSettingsMenuVisible = false;
    this.isProgressBarMouseDown = false;
    this.isProgressBarMouseOver = false;
    this.isVolumeSliderMouseDown = false;
    this.isVolumeSliderMouseOver = false;
    this.isFullscreen = false;
    this.playbackRate = 1;
    this.skipInterval = 20;
    this.playerActionPopupDuration = 400;
    this.volumeSliderWidth = 60;
    this.timeLabelWidth = 100;
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
    this.video.addEventListener('loadstart', this.handleLoadStart);

    this.volumeSlider.addEventListener('mousedown', this.handleVolumeSliderMouseDown);
    this.volumeSlider.addEventListener('mouseup', this.handleVolumeSliderMouseUp);
    this.volumeContainer.addEventListener('mouseover', this.handleVolumeSliderMouseOver);
    this.volumeContainer.addEventListener('mouseout', this.handleVolumeSliderMouseOut);
    
    this.progressBar.addEventListener('mousedown', this.handleProgressBarMouseDown);
    this.progressBar.addEventListener('mouseup', this.handleProgressBarMouseUp);
    this.progressBar.addEventListener('mouseover', this.handleProgressBarMouseOver);
    this.progressBar.addEventListener('mouseout', this.handleProgressBarMouseOut);

    document.addEventListener('click', this.handleDocumentClick);
    document.addEventListener('mousemove', throttleDelayed(this.handleDocumentMouseMove));
    document.addEventListener('mouseup', this.handleDocumentMouseUp)

    this.controlPanel.addEventListener('click', this.handleControlPanelClick);

    this.isMobile = this.checkMobile();
    this.video.volume = 0.1;
    this.video.pause();
  }
  
  handleLoadStart = () => {
    this.durationLabel.textContent = '';
    this.progressBarFiller.style.width = '0%';
    this.progressBarThumb.style.left = `calc(0% - 6px)`;
    this.loadFrameSprite();
    this.handleVideoPause();
  }

  loadFrameSprite = () => {
    const img = document.createElement('img');
    img.src = this.options.frameSprite.src;
  }

  setColors = () => {
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

  createPlayer = () => {
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

  handleUserAfk = () => {
    const noCursor = this.className('_no-cursor');
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

  get isMobile() {
    return this._isMobile;
  }

  set isMobile(value) {
    if (value !== this._isMobile) {
      const action = value ? 'add' : 'remove';
      this.volumeSlider.parentElement.classList[action](this.className('volume-slider_mobile'));
      this.controlPanel.classList[action](this.className('control-panel_mobile'));
    }
    this._isMobile = value;
  }

  checkMobile = () => {
    return /Mobi|Android/i.test(navigator.userAgent);
  }

  handleDocumentClick = (e) => {
    this.isMobile = this.checkMobile();
    if (isElementClicked(e, [this.className('settings-menu'), this.className('settings')])) {
      return;
    }
    this.hideSettingsMenu();
  }
  
  handleDocumentMouseMove = (e) => {
    if (this.isFullscreen) {
      this.handleUserAfk()
    }
    if (this.isVolumeSliderMouseDown) {
      this.handleVolumeSliderChange(e);
    }
    if (this.isProgressBarMouseDown || this.isProgressBarMouseOver) {
      this.handleProgressBarMouseMove(e);
    }
  }

  handleDocumentMouseUp = (e) => {
    this.handleVolumeSliderMouseUp();
    this.handleProgressBarMouseUp();
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
    const { x: volumeSliderX, width } = this.volumeSlider.getBoundingClientRect();
    const sliderWidth = this.isFullscreen ? 90 : width;
    let sliderX = e.clientX < volumeSliderX
      ? 0 : e.clientX > volumeSliderX + sliderWidth ? sliderWidth : e.clientX - volumeSliderX;
    const volume = +(sliderX / sliderWidth).toFixed(2);
    this.video.muted = volume === 0;
    this.video.volume = volume;
  }

  handleProgress = () => {
    const { currentTime, duration } = this.video;
    this.durationLabel.textContent = `${timeToText(currentTime)} / ${timeToText(duration)}`;
    const percent = (currentTime / duration) * 100;
    this.progressBarFiller.style.width = `${percent}%`;
    this.progressBarThumb.style.left = `calc(${percent}% - 6px)`;
  }

  showTooltip = (time, offset) => {
    this.progressBarTooltip.style.display = 'block';
    this.progressBarTooltip.style.left = `${offset}px`;
    this.progressBarTooltipTime.textContent = `${timeToText(time)}`;
    const bgOffset = Math.floor(time / this.options.frameSprite.step) * this.options.frameSprite.height;
    this.progressBarTooltipBg.style.backgroundImage = `url(${this.options.frameSprite.src})`;
    this.progressBarTooltipBg.style.backgroundPosition = `0 -${bgOffset}px`;
  }

  handleProgressBarMouseMove = (e) => {
    const { x: progressBarX, width: progressBarWidth } = this.progressBar.getBoundingClientRect();
    const progressX = e.clientX < progressBarX
      ? 0 : e.clientX > progressBarX + progressBarWidth ? progressBarWidth : e.clientX - progressBarX;
    const time = (progressX / progressBarWidth) * this.video.duration;
    
    if (this.isProgressBarMouseDown) {
      this.video.currentTime = time;
    }
    let offset = progressX - this.timeLabelWidth / 2;
    if (offset < 0) {
      offset = 0;
    }
    if (offset > progressBarWidth - this.timeLabelWidth) {
      offset = progressBarWidth - this.timeLabelWidth;
    }
    if (!this.isMobile) {
      this.showTooltip(time, offset);
    }
  }

  handleProgressBarMouseOver = (e) => {
    this.isProgressBarMouseOver = true;
  }

  handleProgressBarMouseOut = () => {
    if (!this.isProgressBarMouseDown) {
      this.progressBarTooltip.style.display = 'none';
    }
    this.isProgressBarMouseOver = false;
  }

  handleProgressBarMouseDown = (e) => {
    e.preventDefault();
    this.video.pause();
    this.isProgressBarMouseDown = true;
    this.handleProgressBarMouseMove(e);
  }

  handleProgressBarMouseUp = (e) => {
    if (this.isProgressBarMouseDown) {
      this.video.play();
      this.isProgressBarMouseDown = false;
      if (!this.isProgressBarMouseOver) {
        this.handleProgressBarMouseOut(e);
      }
    }
  }

  handleVolumeSliderMouseDown = (e) => {
    this.isVolumeSliderMouseDown = true;
    this.handleVolumeSliderChange(e);
  }

  hideVolumeSlider = () => {
    this.volumeSlider.parentElement.classList.remove(this.className('volume-slider_show'));
  }

  showVolumeSlider = () => {
    this.volumeSlider.parentElement.classList.add(this.className('volume-slider_show'));
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