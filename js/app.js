const API_KEY = "a636ae9f-df4c-4a8f-b2d1-f834fa42dc3b"
const API_URL_POPULAR250 = 
    "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_250_BEST_FILMS&page=1"

getMovies(API_URL_POPULAR250);

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
    if(rating >= 8) {
        return "green";
    }
    else if(rating >= 6) {
        return "orange";
    }
    else{
        return "red";
    }
}

function showMovies(data) {
    const moviesEl = document.querySelector(".movies");

    data.films.forEach(movie => {
        const movieEl = document.createElement("div");
        movieEl.classList.add(".movie");
        movieEl.innerHTML = `
        <div class="movie">
        <div class="movie__cover-inner">
          <img src="${movie.posterUrlPreview}" class="movie__cover" alt="${movie.nameRu}" />
          <div class="movie__cover--darkened"></div>
        </div>
        <div class="movie__info">
          <div class="movie__title">${movie.nameRu}</div>
          <div class="movie__category">${movie.genres.map((genre) => ` ${genre.genre}`)}</div>
          <div class="movie__average movie__average--${getClassByRating(movie.rating)}">${movie.rating}</div>
        </div>
      </div>
        `;
        moviesEl.appendChild(movieEl);
    });
}




