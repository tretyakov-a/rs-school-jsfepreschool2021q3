import './styles/index.scss';
import CustomVideoPlayer from './custom-video-player';
import requirements from '../requirements.md';

const video = document.querySelector('video');
const videoPlayer = new CustomVideoPlayer(video);

// console.log(requirements);