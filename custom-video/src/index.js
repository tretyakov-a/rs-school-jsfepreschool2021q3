import './styles/index.scss';
import CustomVideoPlayer from './custom-video-player';
import requirements from '../requirements.md';
import frameSpriteSrc from './assets/sprite-2s.png';

const video = document.querySelector('video');
const videoPlayer = new CustomVideoPlayer(video, {
  frameSprite: {
    src: frameSpriteSrc,
    width: 150,
    height: 84,
    step: 2
  },
  colors: {
    theme: '#bdae82',
    mainText: 'white',
    darkText: 'black',
    controlsBg: 'rgba(0, 0, 0, 0.6)',
    settingsBg: 'rgba(0, 0, 0, 0.9)',
    fillerBg: 'rgba(255, 255, 255, 0.2)',
  }
});

console.log(requirements);