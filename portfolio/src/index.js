
import './styles/index.scss';
import requirements from '../req-3.md';
import 'custom-video/dist/main.css';
import initHeaderMenu from './js/header-menu';
import CustomVideoPlayer from 'custom-video';
import initTheme from './js/theme';
import initPortfolio from './js/portfolio';
import initTranslate from './js/translate';
import initRippleButtons from './js/ripple-button';

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
initRippleButtons();

console.log(requirements);
