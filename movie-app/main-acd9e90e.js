(()=>{var __webpack_modules__={925:module=>{module.exports=function anonymous(locals,escapeFn,include,rethrow){escapeFn=escapeFn||function(markup){return null==markup?"":String(markup).replace(_MATCH_HTML,encode_char)};var _ENCODE_HTML_RULES={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&#34;","'":"&#39;"},_MATCH_HTML=/[&<>'"]/g;function encode_char(c){return _ENCODE_HTML_RULES[c]||c}var __output="";function __append(s){null!=s&&(__output+=s)}with(locals||{})__append('<div class="lds-ring">\n  <div></div>\n  <div></div>\n  <div></div>\n  <div></div>\n</div>');return __output}},416:(module,__unused_webpack_exports,__webpack_require__)=>{module.exports=function anonymous(locals,escapeFn,include,rethrow){escapeFn=escapeFn||function(markup){return null==markup?"":String(markup).replace(_MATCH_HTML,encode_char)};var _ENCODE_HTML_RULES={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&#34;","'":"&#39;"},_MATCH_HTML=/[&<>'"]/g;function encode_char(c){return _ENCODE_HTML_RULES[c]||c}var __output="";function __append(s){null!=s&&(__output+=s)}with(locals||{})__append('<div class="movie-card-full">\n  <div class="movie-card-full__poster-container">\n    <img class="movie-card-full__poster poster" src="'),__append(escapeFn(locals.Poster)),__append('" alt="'),__append(escapeFn(locals.Title)),__append('">\n  </div>\n  <div class="movie-card-full__info-block">\n    <div class="movie-card-full__title-container">\n      <h2 class="movie-card-full__title">'),__append(escapeFn(locals.Title)),__append('</h2>\n    </div>\n    <div class="movie-card-full__content">\n      <div class="movie-card-full__row">\n        <span class="movie-card-full__row-content">'),__append(escapeFn(locals.Plot)),__append('</span>\n      </div>\n      <div class="movie-card-full__row">\n        <span class="movie-card-full__row-title">Country:</span>\n        <span class="movie-card-full__row-content">\n          '),__append(escapeFn(locals.Country)),__append(",&nbsp;"),__append(escapeFn(locals.Year)),__append('\n        </span>\n      </div>\n      <div class="movie-card-full__row">\n        <span class="movie-card-full__row-title">Director:</span>\n        <span class="movie-card-full__row-content">'),__append(escapeFn(locals.Director)),__append('</span>\n      </div>\n      <div class="movie-card-full__row">\n        <span class="movie-card-full__row-title">Writer:</span>\n        <span class="movie-card-full__row-content">'),__append(escapeFn(locals.Writer)),__append('</span>\n      </div>\n      <div class="movie-card-full__row">\n        <span class="movie-card-full__row-title">Actors:</span>\n        <span class="movie-card-full__row-content">'),__append(escapeFn(locals.Actors)),__append('</span>\n      </div>\n      <div class="movie-card-full__row">\n        <span class="movie-card-full__row-title">Release date:</span>\n        <span class="movie-card-full__row-content">'),__append(escapeFn(locals.Released)),__append('</span>\n      </div>\n      <div class="movie-card-full__row">\n        <span class="movie-card-full__row-title">Runtime:</span>\n        <span class="movie-card-full__row-content">'),__append(escapeFn(locals.Runtime)),__append('</span>\n      </div>\n      <div class="movie-card-full__row">\n        <span class="movie-card-full__row-title">Box office:</span>\n        <span class="movie-card-full__row-content">'),__append(escapeFn(locals.BoxOffice)),__append('</span>\n      </div>\n      <div class="movie-card-full__row">\n        <span class="movie-card-full__row-title">Awards:</span>\n        <span class="movie-card-full__row-content">'),__append(escapeFn(locals.Awards)),__append('</span>\n      </div>\n      <div class="movie-card-full__row">\n        <span class="movie-card-full__row-title">DVD:</span>\n        <span class="movie-card-full__row-content">'),__append(escapeFn(locals.DVD)),__append('</span>\n      </div>\n      <div class="movie-card-full__row">\n        <span class="movie-card-full__row-title">Rated:</span>\n        <span class="movie-card-full__row-content">'),__append(escapeFn(locals.Rated)),__append('</span>\n      </div>\n      <div class="movie-card-full__ratings">\n        <span class="movie-card-full__ratings-item">\n          <img src="'),__append(escapeFn(__webpack_require__(58))),__append('" alt="imdb" width="35" height="17">\n          '),__append(escapeFn(locals.imdbRating)),__append("&nbsp;/&nbsp;10\n        </span>\n        "),locals.rotten&&(__append('\n          <span class="movie-card-full__ratings-item">\n            <img src="'),__append(escapeFn(__webpack_require__(654))),__append('" alt="rotten tomatoes" width="16" height="17">\n            '),__append(escapeFn(locals.rotten)),__append("\n          </span>\n        ")),__append("\n      </div>\n    </div>\n  </div>\n</div>");return __output}},816:(module,__unused_webpack_exports,__webpack_require__)=>{module.exports=function anonymous(locals,escapeFn,include,rethrow){escapeFn=escapeFn||function(markup){return null==markup?"":String(markup).replace(_MATCH_HTML,encode_char)};var _ENCODE_HTML_RULES={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&#34;","'":"&#39;"},_MATCH_HTML=/[&<>'"]/g;function encode_char(c){return _ENCODE_HTML_RULES[c]||c}var __output="";function __append(s){null!=s&&(__output+=s)}with(locals||{})__append('<li class="movies-list__item movie-card" data-id="'),__append(escapeFn(locals.imdbID)),__append('">\n  <div class="movie-card__poster-container">\n    <div class="movie-card__movie-type">'),__append(escapeFn(locals.Type)),__append('</div>\n    <img class="movie-card__poster poster" src="'),__append(escapeFn(locals.Poster)),__append('" alt="'),__append(escapeFn(locals.Title)),__append('">\n  </div>\n  <div class="movie-card__text-content">\n    <div class="movie-card__info">\n      <span class="movie-card__country">'),__append(escapeFn(locals.Country)),__append('</span>,&nbsp;\n      <span class="movie-card__year">'),__append(escapeFn(locals.Year)),__append('</span>\n    </div>\n    <h2 class="movie-card__title">'),__append(escapeFn(locals.Title)),__append('</h2>\n    <div class="movie-card__ratings">\n      <span class="movie-card__imdb">\n        <img src="'),__append(escapeFn(__webpack_require__(58))),__append('" alt="imdb" width="35" height="17">\n        '),__append(escapeFn(locals.imdbRating)),__append("&nbsp;/&nbsp;10\n      </span>\n      "),locals.rotten&&(__append('\n        <span class="movie-card__rotten">\n          <img src="'),__append(escapeFn(__webpack_require__(654))),__append('" alt="rotten tomatoes" width="16" height="17">\n          '),__append(escapeFn(locals.rotten)),__append("\n        </span>\n      ")),__append('\n    </div>\n    <div class="movie-card__info">\n      <span class="movie-card__genre">'),__append(escapeFn(locals.Genre)),__append("</span>\n    </div>\n  </div>\n</li>\n");return __output}},162:module=>{module.exports=function anonymous(locals,escapeFn,include,rethrow){escapeFn=escapeFn||function(markup){return null==markup?"":String(markup).replace(_MATCH_HTML,encode_char)};var _ENCODE_HTML_RULES={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&#34;","'":"&#39;"},_MATCH_HTML=/[&<>'"]/g;function encode_char(c){return _ENCODE_HTML_RULES[c]||c}var __output="";function __append(s){null!=s&&(__output+=s)}with(locals||{})__append('<li data-id="'),__append(escapeFn(locals.imdbID)),__append('">\n  '),__append(escapeFn(locals.Title)),__append("&nbsp;("),__append(escapeFn(locals.Year)),__append(")\n</li>");return __output}},58:(module,__unused_webpack_exports,__webpack_require__)=>{"use strict";module.exports=__webpack_require__.p+"images/imdb-099759c1.png"},110:(module,__unused_webpack_exports,__webpack_require__)=>{"use strict";module.exports=__webpack_require__.p+"images/img-placeholder-ee97e8e7.svg"},654:(module,__unused_webpack_exports,__webpack_require__)=>{"use strict";module.exports=__webpack_require__.p+"images/rotten-2c0a99f7.png"}},__webpack_module_cache__={};function __webpack_require__(moduleId){var cachedModule=__webpack_module_cache__[moduleId];if(void 0!==cachedModule)return cachedModule.exports;var module=__webpack_module_cache__[moduleId]={exports:{}};return __webpack_modules__[moduleId](module,module.exports,__webpack_require__),module.exports}__webpack_require__.n=module=>{var getter=module&&module.__esModule?()=>module.default:()=>module;return __webpack_require__.d(getter,{a:getter}),getter},__webpack_require__.d=(exports,definition)=>{for(var key in definition)__webpack_require__.o(definition,key)&&!__webpack_require__.o(exports,key)&&Object.defineProperty(exports,key,{enumerable:!0,get:definition[key]})},__webpack_require__.o=(obj,prop)=>Object.prototype.hasOwnProperty.call(obj,prop),__webpack_require__.p="";var __webpack_exports__={};(()=>{"use strict";var movie_card=__webpack_require__(816),movie_card_default=__webpack_require__.n(movie_card);function renderMovies(items){return items.reduce(((movies,item)=>movies+function renderListItem(item){return movie_card_default()(item)}(item)),"")}var movie_card_full=__webpack_require__(416),movie_card_full_default=__webpack_require__.n(movie_card_full),search_list_item=__webpack_require__(162),search_list_item_default=__webpack_require__.n(search_list_item),loader=__webpack_require__(925),loader_default=__webpack_require__.n(loader);function isClickOutside(e,element){return e&&!e.path.find((el=>el.classList&&el.classList.contains(element)))}var img_placeholder=__webpack_require__(110);const searchForm=document.querySelector(".search-form"),searchInput=searchForm.querySelector(".search-form__input"),searchList=searchForm.querySelector(".search-form__search-list"),clearButton=searchForm.querySelector(".search-form__button_clear"),moviesList=document.querySelector(".movies-list"),popup=document.querySelector(".popup"),apiService=new class OmdbApiService{constructor(){this.apiKey="2b2733ee",this.baseQuery=`https://www.omdbapi.com/?apikey=${this.apiKey}&`,this.searchQuery=`${this.baseQuery}s=`,this.titleQuery=`${this.baseQuery}plot=full&t=`,this.idQuery=`${this.baseQuery}plot=full&i=`}_getSearchQuery(str){return this.searchQuery+encodeURIComponent(str)}_getFetchByIdQuery(id){return this.idQuery+encodeURIComponent(id)}_getFetchByTitleQuery(title){return this.titleQuery+encodeURIComponent(title)}_fetch=async query=>{try{const response=await fetch(query),data=await response.json();if(data.Ratings){const rotten=data.Ratings.find((item=>"Rotten Tomatoes"===item.Source));rotten&&(data.rotten=rotten.Value)}return data}catch(error){console.error(error)}};async search(str){return await this._fetch(this._getSearchQuery(str))}async fetchMovieByTitle(title){return await this._fetch(this._getFetchByTitleQuery(title))}async fetchMovieById(id){return await this._fetch(this._getFetchByIdQuery(id))}async fetchMoviesById(ids){try{return await Promise.all(ids.map((id=>this._fetch(this._getFetchByIdQuery(id)))))}catch(error){console.error(error)}}};let currentLoadedData={search:null,data:null},currentSearch="",currentSearchData=null;const errorMessage='<p style="padding-left: 10px;">No movies found</p>';async function handleSearchFormSubmit(e){e&&e.preventDefault();const searchInputValue=searchInput.value;if(""===searchInputValue)return;const searchData=await search(searchInputValue);hideSearchList();let data=null;if(searchData.Search)if(currentLoadedData.search!==currentSearch){moviesList.innerHTML=loader_default()();const ids=searchData.Search.map((({imdbID})=>imdbID));data=await apiService.fetchMoviesById(ids),currentLoadedData.search=currentSearch,currentLoadedData.data=data}else data=currentLoadedData.data;handleImgLoadErrors(moviesList),moviesList.innerHTML=data?renderMovies(data):errorMessage}function handleImgLoadErrors(container){setTimeout((()=>{const imgs=container.querySelectorAll(".poster");for(const img of imgs)img.addEventListener("error",handleImgError)}))}function handleImgError(e){e.target.src=img_placeholder,e.target.removeEventListener("error",handleImgError)}async function search(value){let searchData=null;return value===currentSearch?searchData=currentSearchData:(searchData=await apiService.search(value),currentSearch=value,currentSearchData=searchData),searchData}async function handleSearchInput(e){const searchInputValue=searchInput.value;if(""===searchInputValue)return currentSearch="",currentSearchData=null,searchList.innerHTML="",clearButton.classList.add("search-form__button_hide"),void hideSearchList();clearButton.classList.remove("search-form__button_hide"),showSearchList(),searchList.innerHTML=loader_default()();const searchData=await search(searchInputValue);let html=null;searchData.Search&&(html=searchData.Search.map((item=>search_list_item_default()(item))).join("")),searchList.innerHTML=html||errorMessage}function showSearchList(){document.addEventListener("click",handleDocumentClick),searchList.classList.add("search-form__search-list_show")}function hideSearchList(){document.removeEventListener("click",handleDocumentClick),searchList.classList.remove("search-form__search-list_show")}function handleDocumentClick(e){isClickOutside(e,"search-form")&&hideSearchList()}searchForm.addEventListener("submit",handleSearchFormSubmit),searchInput.addEventListener("input",((ms,fn)=>{let timer=null;return function wrapper(...args){clearTimeout(timer),timer=setTimeout((()=>{fn(...args)}),ms)}})(500,handleSearchInput)),searchInput.addEventListener("focus",(function handleSearchInputFocus(e){""!==currentSearch&&showSearchList()})),clearButton.addEventListener("click",(function handleClearButtonClick(e){searchInput.value="",clearButton.classList.add("search-form__button_hide"),handleSearchInput()})),searchList.addEventListener("click",(async function handleSearchListClick(e){if(moviesList.innerHTML=loader_default()(),e.target.dataset){const id=e.target.dataset.id,movies=renderMovies([await apiService.fetchMovieById(id)]);moviesList.innerHTML=movies,handleImgLoadErrors(moviesList),hideSearchList()}})),moviesList.addEventListener("click",(function handleMovieListClick(e){const movieCard=e.target.closest(".movie-card");if(movieCard){if(!currentLoadedData.data)return;popup.classList.add("popup_show");const inner=popup.querySelector(".popup__card"),movieData=currentLoadedData.data.find((el=>el.imdbID===movieCard.dataset.id)),html=movie_card_full_default()(movieData);inner.innerHTML=html,handleImgLoadErrors(inner)}})),popup.addEventListener("click",(function handlePopupClick(e){isClickOutside(e,"popup__card")&&popup.classList.remove("popup_show")})),async function init(){searchInput.value="star wars",await handleSearchInput(),await handleSearchFormSubmit(),searchInput.focus()}()})()})();
//# sourceMappingURL=main-acd9e90e.js.map