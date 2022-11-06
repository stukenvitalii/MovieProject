// const API_KEY = "a636ae9f-df4c-4a8f-b2d1-f834fa42dc3b"; 
const API_KEY = "8c8e1a50-6322-4135-8875-5d40a5420d86"
const API_URL_POPULAR250 =
 "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_250_BEST_FILMS&page=1"

const API_URL_POPULAR =
  "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1";

const API_SEARCH =
  "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";

const API_URL_MOVIE_DETAILS =
  "https://kinopoiskapiunofficial.tech/api/v2.2/films/";

getMovies(API_URL_POPULAR);

async function getMovies(url) {
  const resp = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": API_KEY,
    },
  });
  const respData = await resp.json();
  showMovies(respData);
}

function getClassByRating(rating) {
  if (rating >= 8) {
    return "green";
  } else if (rating >= 6) {
    return "orange";
  } else {
    return "red";
  }
}

function showMovies(data) {
  const moviesEl = document.querySelector(".movies");

  document.querySelector(".movies").innerHTML = "";

  data.films.forEach((movie) => {
    const movieEl = document.createElement("div");
    movieEl.classList.add(".movie");
    movieEl.innerHTML = `
        <div class="movie">
        <div class="movie__cover-inner">
          <img src="${movie.posterUrlPreview}" class="movie__cover" alt="${
      movie.nameRu
    }" />
          <div class="movie__cover--darkened"></div>
        </div>
        <div class="movie__info">
          <div class="movie__title">${movie.nameRu}</div>
          <div class="movie__category">${movie.genres.map(
            (genre) => ` ${genre.genre}`
          )}</div>
          <div class="movie__average movie__average--${getClassByRating(
            movie.rating
          )}">${movie.rating}</div>
        </div>
      </div>
        `;
    movieEl.addEventListener("click", () => openModal(movie.filmId));
    moviesEl.appendChild(movieEl);
  });
}

const form = document.querySelector("form");
const search = document.querySelector(".header__search");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const apiSearchUrl = `${API_SEARCH}${search.value}`;

  if (search.value) {
    getMovies(apiSearchUrl);
    search.value = "";
  }
});

// Modal window

const modalEl = document.querySelector(".modal");

async function openModal(id) {
  console.log(id);
  const resp = await fetch(API_URL_MOVIE_DETAILS + id, {
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": API_KEY,
    },
  });
  const respData = await resp.json();
  modalEl.classList.add("modal--show");
  document.body.classList.add("stop-scrolling");
  
  modalEl.innerHTML = `
        <div class="modal__card">
        <img class="modal__movie-backdrop" src="${respData.posterUrl}" alt="">
        <h2>
        <span class="modal__movie-title">${respData.nameRu}</span>
        <span class="modal__movie-release-year"> - ${respData.year}</span>
        </h2>
        <ul class="modal__movie-info">
        <div class="loader"></div>
        <li class="modal__movie-genre">Жанр: ${respData.genres.map((el)=> `<span>${el.genre}</span>`)}</li>
        <li class="modal__movie-runtime">Время: ${respData.filmLength} минут</li>
        <li>Сайт: <a class="modal__movie-site" href="${respData.webUrl}"> ${respData.webUrl}</a></li>
        <li class="modal__movie--overview">Описание: ${respData.description}</li>
        </ul>
        <button type="button" class="modal__button-close">Закрыть</button>
        </div>
        `;
  const buttonClose = document.querySelector(".modal__button-close");
  buttonClose.addEventListener("click", () => closeModal());
}

function closeModal() {
  modalEl.classList.remove("modal--show");
  document.body.classList.remove("stop-scrolling");
}

window.addEventListener("click", (e) => {
  if (e.target === modalEl) {
    closeModal();
  }
});

window.addEventListener("keydown", (e) => {
  if (e.keyCode === 27) {
    closeModal();
  }
});
