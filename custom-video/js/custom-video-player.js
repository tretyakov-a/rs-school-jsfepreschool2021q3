
class CustomVideoPlayer {
  constructor(video) {
    this.player = document.createElement('div');
    this.player.classList.add('player');
    video.parentNode.insertBefore(this.player, video);
    video.classList.add('player__viewport');
    video.removeAttribute('controls');
    video.setAttribute('muted', true);
    this.video = video;
    this.player.appendChild(this.video);
    this.player.insertAdjacentHTML('beforeend', videoControls);

    this.playerActionPopup = this.player.querySelector('.player__action-popup');
    this.controlPanel = this.player.querySelector('.player__control-panel');
    this.settingsMenu = this.controlPanel.querySelector('.control-panel__settings-menu');
    this.playBtn = this.controlPanel.querySelector('[data-fn="play"]');
    this.volumeBtn = this.controlPanel.querySelector('[data-fn="mute"]');
    this.fullscreenBtn = this.controlPanel.querySelector('[data-fn="toggle-fullscreen"]');
    this.volumeSlider = this.controlPanel.querySelector('.volume-slider');
    this.durationLabel = this.controlPanel.querySelector('.control-panel__duration')
    this.progressBar = this.controlPanel.querySelector('.progress-bar');
    this.progressBarFiller = this.progressBar.querySelector('.progress-bar__filler');
    this.progressBarTimeLabel = this.progressBar.querySelector('.progress-bar__time-label');

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

  showControlPanel = () => {
    this.controlPanel.classList.add('player__control-panel_show');
  }

  hideControlPanel = () => {
    this.controlPanel.classList.remove('player__control-panel_show');
  }

  controlPanelClickHandler = (e) => {
    if (e.target.classList.contains('volume-slider')) {
      this.handleVolumeSliderChange(e);
      return;
    }
    if (e.target.classList.contains('progress-bar')) {
      this.handleProgressBarClick(e);
      return;
    }

    if (e.target.nodeName === 'INPUT') {
      switch (e.target.name) {
        case 'playback': this.changePlaybackRate(e.target.value); return;
        case 'skip': this.changeSkipInterval(e.target.value); return;
        default: return;
      }
    }
    
    const btn = e.target.closest('.button');
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
    if (this.isFullscreen && document.exitFullscreen) {
      document.exitFullscreen();
      this.isFullscreen = false;
      this.fullscreenBtn.classList.replace('button_compress', 'button_expand');
      clearTimeout(this.afkTimer);
    } else if (this.player.requestFullscreen) {
      this.player.requestFullscreen();
      this.isFullscreen = true;
      this.fullscreenBtn.classList.replace('button_expand', 'button_compress');
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
    if (isElementClicked(e, ['control-panel__settings-menu', 'control-panel__settings'])) {
      return;
    }
    this.hideSettingsMenu();
  }

  handleDocumentMouseMove = () => {
    if (this.isFullscreen) {
      console.log(this.isFullscreen)
      this.isUserAfk = false;
      this.showControlPanel();
      this.player.classList.remove('player_no-cursor');
      clearTimeout(this.afkTimer);

      this.afkTimer = setTimeout(() => {
        this.isUserAfk = true;
        this.hideControlPanel();
        this.player.classList.add('player_no-cursor');
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
    const className = `player__action-popup_${modificator}`;
    this.playerActionPopup.classList.add(className);
    setTimeout(() => {
      this.playerActionPopup.classList.remove(className);
    }, this.playerActionPopupDuration);
  }

  handleVideoPlay = () => {
    this.showPlayerActionPopup('play');
    this.playBtn.classList.replace('button_play', 'button_pause');

  }

  handleVideoPause = () => {
    this.showPlayerActionPopup('pause');
    this.playBtn.classList.replace('button_pause', 'button_play');
  }

  handleVolumeChange = () => {
    if (video.muted) {
      this.volumeSlider.value = 0;
      this.volumeBtn.classList.replace('button_volume-up', 'button_volume-mute');
    } else {
      this.volumeSlider.value = video.volume;
      this.volumeBtn.classList.replace('button_volume-mute', 'button_volume-up');
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

this.videoControls = `
  <div class="player__action-popup player__action-popup_play"></div>
  <div class="player__control-panel control-panel">
    <ul class="control-panel__settings-menu settings-menu">
      <li class="settings-menu__item">
        <div>Playback speed</div>
        <div class="settings-menu__options">
          <label>
            <input type="radio" name="playback" value="0.5">
            <span>0.25x</span>
          </label> 
          <label>
            <input type="radio" name="playback" value="0.5">
            <span>0.5x</span>
          </label>        
          <label>
            <input type="radio" name="playback" value="1" checked>
            <span>normal</span>
          </label>
          <label>
            <input type="radio" name="playback" value="1.5">
            <span>1.5x</span>
          </label>
          <label>
            <input type="radio" name="playback" value="2">
            <span>2x</span>
          </label>
        </div>
      </li>
      <li class="settings-menu__item">
        <div>Skip interval</div>
        <div class="settings-menu__options">
          <label>
            <input type="radio" name="skip" value="10">
            <span>10s</span>
          </label>
          <label>
            <input type="radio" name="skip" value="20" checked>
            <span>20s</span>
          </label>
          <label>
            <input type="radio" name="skip" value="30">
            <span>30s</span>
          </label>
        </div>
      </li>
    </ul>
    <div class="control-panel__progress progress-bar">
      <div class="progress-bar__time-label"></div>
      <div class="progress-bar__filler"></div>
    </div>
    <div class="control-panel__buttons">
      <div class="control-panel__buttons-group">
        <button class="control-panel__play button button_play" data-fn="play" title="play">
          <div class="button__icon">
          </div>
        </button>
        <button class="control-panel__step-backward button button_backward" data-fn="backward" title="step backward">
          <div class="button__icon">
          </div>
        </button>
        <button class="control-panel__step-forward button button_forward" data-fn="forward" title="step forward">
          <div class="button__icon">
          </div>
        </button>
        <button class="control-panel__volume button button_volume-up" data-fn="mute" title="click: mute">
          <div class="button__icon">
          </div>
          <input class="control-panel__volume-slider volume-slider" type="range" name="volume" min="0" max="1" step="0.05" value="1" tabindex="-1" />
        </button>
        <div class="control-panel__duration"></div>
      </div>
      <div class="control-panel__buttons-group">
        <button class="control-panel__settings button button_settings" data-fn="settings">
          <div class="button__icon">
          </div>
        </button>
        <button class="control-panel__toggle-fullscreen button button_expand" data-fn="toggle-fullscreen">
          <div class="button__icon">
          </div>
        </button>
      </div>
    </div>
  </div>`