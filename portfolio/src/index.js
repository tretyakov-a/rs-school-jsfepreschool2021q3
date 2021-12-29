
import './styles/index.scss';
import 'custom-video/dist/main.css';
import CustomVideoPlayer from 'custom-video';
import requirements from '../req-1.md';
import initHeaderMenu from './js/header-menu';
import initPortfolio from './js/portfolio';
import initTranslate from './js/translate';
import initTheme from './js/theme';

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

console.log(requirements);
