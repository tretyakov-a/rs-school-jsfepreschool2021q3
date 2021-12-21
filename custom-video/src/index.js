import './styles/index.scss';
import CustomVideoPlayer from './custom-video-player';
import requirements from '../requirements.md';

const video = document.querySelector('video');
const videoPlayer = new CustomVideoPlayer(video, {
  colors: {
    theme: '#bdae82',
    mainText: 'white',
    darkText: 'black',
    controlsBg: 'rgba(0, 0, 0, 0.6)',
    settingsBg: 'rgba(0, 0, 0, 0.9)',
  }
});

// export default CustomVideoPlayer;
// console.log(requirements);