
import './styles/index.scss';
import 'custom-video/dist/main.css';
import CustomVideoPlayer from 'custom-video';
import requirements from '../requirements.md';
import initHeaderMenu from './header-menu';
import initPortfolio from './portfolio';
import initTranslate from './translate';
import initTheme from './theme';

const video = document.querySelector('.video__player-img');
const videoPlayer = new CustomVideoPlayer(video, {
  colors: {
    theme: '#bdae82',
    mainText: 'white',
    darkText: 'black',
    controlsBg: 'rgba(0, 0, 0, 0.6)',
    settingsBg: 'rgba(0, 0, 0, 0.9)',
    fillerBg: 'rgba(255, 255, 255, 0.2)',
  }
});

initHeaderMenu();
initPortfolio();
initTranslate();
initTheme();

// console.log(requirements);
