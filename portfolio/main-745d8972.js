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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _styles_index_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/index.scss */ \"./styles/index.scss\");\n/* harmony import */ var _req_1_md__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../req-1.md */ \"../req-1.md\");\n/* harmony import */ var _js_header_menu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./js/header-menu */ \"./js/header-menu.js\");\n\n // import 'custom-video/dist/main.css';\n// import initTheme from './js/theme';\n// import CustomVideoPlayer from 'custom-video';\n\n // import initPortfolio from './js/portfolio';\n// import initTranslate from './js/translate';\n// const video = document.querySelector('.video__player-img');\n// const videoPlayer = new CustomVideoPlayer(video, {\n//   colors: {\n//     theme: '#bdae82',\n//     mainText: 'white',\n//     darkText: 'black',\n//     controlsBg: 'rgba(0, 0, 0, 0.6)',\n//     settingsBg: 'rgba(0, 0, 0, 0.9)',\n//     fillerBg: 'rgba(255, 255, 255, 0.2)',\n//   }\n// });\n\n(0,_js_header_menu__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(); // initPortfolio();\n// initTranslate();\n// initTheme();\n\nconsole.log(_req_1_md__WEBPACK_IMPORTED_MODULE_1__);\n\n//# sourceURL=webpack:///./index.js?");

/***/ }),

/***/ "./js/header-menu.js":
/*!***************************!*\
  !*** ./js/header-menu.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ initHeaderMenu)\n/* harmony export */ });\nconst hamburger = document.querySelector('.menu-hamburger');\nconst headerMenu = document.querySelector('.header-menu');\nconst headerNav = document.querySelector('.header__nav');\nconst headerNavShowModificator = 'header__nav_show';\nconst hideModificator = 'header-menu_hide';\nconst humburgerHideModificator = 'menu-hamburger_hide';\nconst animationDuration = 200;\n\nfunction handleDocumentClick(e) {\n  const isShowed = headerNav.classList.contains(headerNavShowModificator);\n  const isClickOnCloseBtn = e.target.closest('.menu-hamburger');\n  const isClickOutsideMenu = !e.path.find(el => el.classList && el.classList.contains('header-menu'));\n  const isClickOnLink = e.path.find(el => el.classList && el.classList.contains('header-menu__item-link'));\n\n  if (isClickOnCloseBtn && !isShowed) {\n    headerNav.classList.add(headerNavShowModificator);\n  }\n\n  if (isShowed && (isClickOutsideMenu || isClickOnLink)) {\n    hide();\n  }\n}\n\nfunction hide() {\n  headerNav.classList.remove(headerNavShowModificator);\n  hamburger.classList.add(humburgerHideModificator);\n  headerMenu.classList.add(hideModificator);\n  setTimeout(() => {\n    headerMenu.classList.remove(hideModificator);\n    hamburger.classList.remove(humburgerHideModificator);\n  }, animationDuration);\n}\n\nfunction initHeaderMenu() {\n  document.addEventListener('click', handleDocumentClick);\n}\n\n//# sourceURL=webpack:///./js/header-menu.js?");

/***/ }),

/***/ "./styles/index.scss":
/*!***************************!*\
  !*** ./styles/index.scss ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack:///./styles/index.scss?");

/***/ }),

/***/ "../req-1.md":
/*!*******************!*\
  !*** ../req-1.md ***!
  \*******************/
/***/ ((module) => {

eval("module.exports = \"## Требования к вёрстке (110/100)\\n1. Вёрстка валидная (10/10)\\n   - для проверки валидности вёрстки используйте сервис https://validator.w3.org/  \\n   - валидной вёрстке соответствует надпись \\\"Document checking completed. No errors or warnings to show.\\\" В таком случае баллы за пункт требований выставляем полностью.\\n   - если есть предупреждения - `warnings`, но нет ошибок - `errors`, выставляем половину баллов за пункт требований\\n2. Вёрстка семантическая (26/26)  \\n   В коде странице присутствуют следующие элементы (указано минимальное количество, может быть больше):\\n   - `<header>`, `<main>`, `<footer>` (2/2)\\n   - шесть элементов `<section>` (по количеству секций) (2/2)\\n   - только один заголовок `<h1>` (2/2)\\n   - пять заголовков `<h2>` (количество секций минус одна, у которой заголовок `<h1>`) (2/2)\\n   - три заголовка `<h3>` (по количеству карточек в секции `price`) (2/2)\\n   - четыре заголовка `<h4>` (по количеству карточек в секции `skills`) (2/2)\\n   - один элемент `<nav>` (панель навигации) (2/2)\\n   - два списка `ul > li > a` (панель навигации, ссылки на соцсети) (2/2)\\n   - десять кнопок `<button>` (2/2)\\n   - два инпута: `<input type=\\\"email\\\">` и `<input type=\\\"tel\\\">` (2/2)\\n   - один элемент `<textarea>` (2/2)\\n   - три атрибута `placeholder` (2/2)\\n   - для всех элементов `<img>` указан обязательный атрибут `alt` (2/2)\\n3. Вёрстка соответствует макету (48/48)\\n   - блок `<header>` (6/6)\\n   - секция `hero` (6/6)\\n   - секция `skills` (6/6)\\n   - секция `portfolio` (6/6)\\n   - секция `video` (6/6)\\n   - секция `price` (6/6)\\n   - секция `contacts` (6/6)\\n   - блок `<footer>` (6/6) \\n4. Требования к css (12/12)\\n   - для построения сетки используются флексы или гриды (2/2)\\n   - при уменьшении масштаба страницы браузера вёрстка размещается по центру, а не сдвигается в сторону (2/2)\\n   - фоновый цвет тянется на всю ширину страницы (2/2)\\n   - иконки добавлены в формате `.svg`. SVG может быть добавлен любым способом. Обращаем внимание на формат, а не на способ добавления (2/2)\\n   - изображения добавлены в формате `.jpg` (2/2)\\n   - есть `favicon` (2/2)\\n5. Интерактивность, реализуемая через css (14/14)\\n   - плавная прокрутка по якорям (4/4)\\n   - ссылки в футере ведут на гитхаб автора проекта и на страницу курса https://rs.school/js-stage0/ (2/2)\\n   - интерактивность включает в себя не только изменение внешнего вида курсора, например, при помощи свойства `cursor: pointer`, но и другие визуальные эффекты, например, изменение цвета фона или цвета шрифта. Если в макете указаны стили при наведении и клике, для элемента указываем эти стили. Если в макете стили не указаны, реализуете их по своему усмотрению, руководствуясь общим стилем макета (4/4)\\n   - обязательное требование к интерактивности: плавное изменение внешнего вида элемента при наведении и клике не влияющее на соседние элементы (4/4)\\n\\n## Критерии оценки\\n\\n**Максимальная оценка за задание 100 баллов**  \";\n\n//# sourceURL=webpack:///../req-1.md?");

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