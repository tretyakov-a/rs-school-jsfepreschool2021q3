/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _styles_index_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/index.scss */ \"./styles/index.scss\");\n/* harmony import */ var _req_2_md__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../req-2.md */ \"../req-2.md\");\n/* harmony import */ var custom_video_dist_main_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! custom-video/dist/main.css */ \"../../../tretyakov-a-JSFEPRESCHOOL/custom-video/dist/main.css\");\n/* harmony import */ var _js_header_menu__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./js/header-menu */ \"./js/header-menu.js\");\n\n\n\n // import CustomVideoPlayer from 'custom-video';\n// import initTheme from './js/theme';\n// import initPortfolio from './js/portfolio';\n// import initTranslate from './js/translate';\n// import initRippleButtons from './js/ripple-button';\n// const video = document.querySelector('.video__player-img');\n// const videoPlayer = new CustomVideoPlayer(video, {\n//   colors: {\n//     theme: '#bdae82',\n//     mainText: 'white',\n//     darkText: 'black',\n//     controlsBg: 'rgba(0, 0, 0, 0.6)',\n//     settingsBg: 'rgba(0, 0, 0, 0.9)',\n//     fillerBg: 'rgba(255, 255, 255, 0.2)',\n//   }\n// });\n\n(0,_js_header_menu__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(); // initPortfolio();\n// initTranslate();\n// initTheme();\n// initRippleButtons();\n\nconsole.log(_req_2_md__WEBPACK_IMPORTED_MODULE_1__);\n\n//# sourceURL=webpack:///./index.js?");

/***/ }),

/***/ "./js/header-menu.js":
/*!***************************!*\
  !*** ./js/header-menu.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ initHeaderMenu)\n/* harmony export */ });\nconst headerNav = document.querySelector('.header__nav');\nconst headerNavShowModificator = 'header__nav_show';\nconst headerNavHideModificator = 'header__nav_hide';\nconst animationDuration = 400;\n\nfunction handleDocumentClick(e) {\n  const isShowed = headerNav.classList.contains(headerNavShowModificator);\n  const isClickOnCloseBtn = e.target.closest('.menu-hamburger');\n  const isClickOutsideMenu = !e.path.find(el => el.classList && el.classList.contains('header-menu'));\n  const isClickOnLink = e.path.find(el => el.classList && el.classList.contains('header-menu__item-link'));\n\n  if (isClickOnCloseBtn && !isShowed) {\n    headerNav.classList.add(headerNavShowModificator);\n  }\n\n  if (isShowed && (isClickOutsideMenu || isClickOnLink)) {\n    hide();\n  }\n}\n\nfunction hide() {\n  headerNav.classList.remove(headerNavShowModificator);\n  headerNav.classList.add(headerNavHideModificator);\n  setTimeout(() => {\n    headerNav.classList.remove(headerNavHideModificator);\n  }, animationDuration);\n}\n\nfunction initHeaderMenu() {\n  document.addEventListener('click', handleDocumentClick);\n}\n\n//# sourceURL=webpack:///./js/header-menu.js?");

/***/ }),

/***/ "./styles/index.scss":
/*!***************************!*\
  !*** ./styles/index.scss ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack:///./styles/index.scss?");

/***/ }),

/***/ "../../../tretyakov-a-JSFEPRESCHOOL/custom-video/dist/main.css":
/*!*********************************************************************!*\
  !*** ../../../tretyakov-a-JSFEPRESCHOOL/custom-video/dist/main.css ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack:///../../../tretyakov-a-JSFEPRESCHOOL/custom-video/dist/main.css?");

/***/ }),

/***/ "../req-2.md":
/*!*******************!*\
  !*** ../req-2.md ***!
  \*******************/
/***/ ((module) => {

eval("module.exports = \"## Требования к вёрстке (85/75)\\n1. Вёрстка соответствует макету. Ширина экрана 768px (48/48)\\n   - блок `<header>` (6/6)\\n   - секция `hero` (6/6)\\n   - секция `skills` (6/6)\\n   - секция `portfolio` (6/6)\\n   - секция `video` (6/6)\\n   - секция `price` (6/6)\\n   - секция `contacts` (6/6)\\n   - блок `<footer>` (6/6) \\n2. Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется (15/15)\\n   - нет полосы прокрутки при ширине страницы от 1440рх до 768рх (5/5)\\n   - нет полосы прокрутки при ширине страницы от 768рх до 480рх (5/5)\\n   - нет полосы прокрутки при ширине страницы от 480рх до 320рх (5/5)\\n3. На ширине экрана 768рх и меньше реализовано адаптивное меню (22/22)\\n   - при ширине страницы 768рх панель навигации скрывается, появляется бургер-иконка (2/2)   \\n   - при нажатии на бургер-иконку справа плавно появляется адаптивное меню, бургер-иконка изменяется на крестик (4/4)\\n   - высота адаптивного меню занимает всю высоту экрана. При ширине экрана 768-620рх вёрстка меню соответствует макету, когда экран становится уже, меню занимает всю ширину экрана (4/4)\\n   - при нажатии на крестик адаптивное меню плавно скрывается уезжая за правую часть экрана, крестик превращается в бургер-иконку (4/4)\\n   - бургер-иконка, которая при клике превращающается в крестик, создана при помощи css-анимаций без использования изображений (2/2)\\n   - ссылки в адаптивном меню работают, обеспечивая плавную прокрутку по якорям (2/2)\\n   - при клике по ссылке в адаптивном меню адаптивное меню плавно скрывается, крестик превращается в бургер-иконку (4/4) \\n\\n## Критерии оценки\\n\\n**Максимальная оценка за задание 75 баллов**  \";\n\n//# sourceURL=webpack:///../req-2.md?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./index.js");
/******/ 	
/******/ })()
;