import {
  throttleDelayed,
  timeToText,
  isElementClicked
} from './helpers';

import './styles/custom-video-player.scss';
import playerControlsTemplate from './templates/player-controls.ejs';

export default class CustomVideoPlayer {
  constructor(video) {
    if (!video) {
      throw new Error('Video is undefined');
    }
    this.prefix = 'player';
    this.video = video;
    this.player = this._createPlayer();

    const select = s => this.player.querySelector(this.selector(s));
    
    this.playerActionPopup = select('action-popup');
    this.controlPanel = select('control-panel');
    this.settingsMenu = select('settings-menu');
    this.playBtn = select('play');
    this.volumeBtn = select('volume');
    this.fullscreenBtn = select('toggle-fullscreen');
    this.volumeSlider = select('volume-slider');
    this.durationLabel = select('duration')
    this.progressBar = select('progress-bar');
    this.progressBarFiller = select('progress-bar-filler');
    this.progressBarTimeLabel = select('progress-bar-time-label');

    this.isSettingsMenuVisible = false;
    this.isProgressBarMouseDown = false;
    this.isVolumeSliderMouseDown = false;
    this.isFullscreen = false;
    this.playbackRate = 1;
    this.skipInterval = 20;
    this.playerActionPopupDuration = 400;
    this.afkDelay = 2000;
    this.isUserAfk = true;
    this.afkTimer = null;
    
    this.player.addEventListener('mouseenter', this.showControlPanel);
    this.player.addEventListener('mouseleave', this.hideControlPanel);

    this.video.addEventListener('click', this.toggleVideoPlay);
    this.video.addEventListener('play', this.handleVideoPlay);
    this.video.addEventListener('pause', this.handleVideoPause);
    this.video.addEventListener('volumechange', this.handleVolumeChange);
    this.video.addEventListener('timeupdate', this.handleProgress);

    this.volumeSlider.addEventListener('mousemove', throttleDelayed(this.handleVolumeSliderChange));
    this.volumeSlider.addEventListener('mousedown', this.handleVolumeSliderMouseDown);
    this.volumeSlider.addEventListener('mouseup', this.handleVolumeSliderMouseUp);
    this.volumeSlider.addEventListener('mouseout', this.handleVolumeSliderMouseOut);

    this.progressBar.addEventListener('mousedown', this.handleProgressBarMouseDown);
    this.progressBar.addEventListener('mouseup', this.handleProgressBarMouseUp);
    this.progressBar.addEventListener('mouseover', this.handleProgressBarMouseOver);
    this.progressBar.addEventListener('mouseout', this.handleProgressBarMouseOut);
    this.progressBar.addEventListener('mousemove', throttleDelayed(this.handleProgressBarMouseMove));

    document.addEventListener('click', this.handleDocumentClick);
    document.addEventListener('mousemove', throttleDelayed(this.handleDocumentMouseMove));

    this.controlPanel.addEventListener('click', this.controlPanelClickHandler);

    this.video.volume = 0.1;
    this.video.pause();
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

  selector = (name) => '.' + this.className(name);

  className = (name) => `${this.prefix}__${name}`

  showControlPanel = () => {
    this.controlPanel.classList.add(this.className('control-panel_show'));
  }

  hideControlPanel = () => {
    this.controlPanel.classList.remove(this.className('control-panel_show'));
    this.hideSettingsMenu();
  }

  controlPanelClickHandler = (e) => {
    const hasClass = (e, name) => e.target.classList.contains(this.className(name));
    
    if (hasClass(e, 'volume-slider')) {
      this.handleVolumeSliderChange(e);
      return;
    }
    if (hasClass(e, 'progress-bar')) {
      this.handleProgressBarClick(e);
      return;
    }
    const radio = e.target.closest(this.selector('custom-radio'));
    if (radio) {
      const input = radio.querySelector('input');
      switch (input.name) {
        case 'playback': this.changePlaybackRate(input.value); return;
        case 'skip': this.changeSkipInterval(input.value); return;
        default: return;
      }
    }
    
    const btn = e.target.closest(this.selector('button'));
    if (btn) {
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
    const popupModificator = muted ? 'volume-up' : 'volume-mute';
    this.showPlayerActionPopup(popupModificator);
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

  handleDocumentMouseMove = () => {
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
    this.showPlayerActionPopup('play');
    this.playBtn.classList.replace(this.className('button_play'), this.className('button_pause'));

  }

  handleVideoPause = () => {
    this.showPlayerActionPopup('pause');
    this.playBtn.classList.replace(this.className('button_pause'), this.className('button_play'));
  }

  handleVolumeChange = () => {
    if (this.video.muted) {
      this.volumeSlider.value = 0;
      this.volumeBtn.classList.replace(this.className('button_volume-up'), this.className('button_volume-mute'));
    } else {
      this.volumeSlider.value = this.video.volume;
      this.volumeBtn.classList.replace(this.className('button_volume-mute'), this.className('button_volume-up'));
    }
  }

  handleVolumeSliderChange = (e) => {
    if (!(e.type === 'click') && !this.isVolumeSliderMouseDown) {
      return;
    }
    this.video.muted = +e.target.value === 0;
    this.video.volume = e.target.value;
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

  handleVolumeSliderMouseDown = () => {
    this.isVolumeSliderMouseDown = true;
  }

  handleVolumeSliderMouseUp = () => {
    this.isVolumeSliderMouseDown = false;
  }

  handleVolumeSliderMouseOut = () => {
    this.isVolumeSliderMouseDown = false;
  }
}