"use strict";

//launches the fetch requests to build the page
document.addEventListener("DOMContentLoaded", start);

//this section animates the hamburger menu
const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.main-menu');
const menuGroup = document.querySelector('.menu-group');
hamburger.addEventListener("click", hamburgerChecked);
menu.addEventListener("transitionend", () => {
  if (menu.classList.contains('active')) {
    menuGroup.style.visibility = "visible";
  } else {
    menuGroup.style.visibility = "hidden";
  }
})

function hamburgerChecked () {
  menu.classList.toggle('active');
  hamburger.classList.toggle('hamburger-anim');
}

//retrieves local json, fetches from api, builds page using returned data
function start () {
  fetch('assets/json/arkansas.json')
    .then(r => { return r.json() })
    .then(data => { fetchMovies(data) })
    .then(movies => { buildPage(movies) })
}

//fetch every movie in local json file, call buildPage for each
function fetchMovies (data) {

  const api_key = "20ab01d1e4cf2615dc812916957806eb";
  const language = "en-US";
  let i = 0;

  for (i in data.movies) {
    fetch(`https://api.themoviedb.org/3/movie/
      ${data.movies[i].id}?api_key=${api_key}&language=${language}`)
      .then(r => { return r.json() })
      .then(movieData => { buildPage(movieData) })
  }
}

//inserts movie into the DOM
function buildPage (movie) {
  const results = document.querySelector('#results');
  const div = document.createElement('div');

  if (movie != undefined) {
    if (movie.poster_path != null && movie.poster_path != "") {

      div.classList.add('resultBanner');
      div.innerHTML = `${movie.title}<a href=
      "movieDetails.html?movieId=${movie.id}" alt=
      "${movie.title}"><img src=
      "https://image.tmdb.org/t/p/w500${movie.poster_path}"></a>`;
  
    } else {
  
      div.classList.add('resultNoImage');
      div.innerHTML = `<a href=
      "movieDetails.html?movieId=
      ${movie.id}">${movie.title}</a>No Image Found.`;
    }

    results.appendChild(div);
  }
}