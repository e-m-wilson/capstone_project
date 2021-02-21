"use strict";

//launches the fetch requests and builds the page
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
async function start () {
  const arMovieActorData = await fetchArList();
  const arMovieApiData = await fetchMovies(arMovieActorData);
  buildPage(arMovieApiData);
}

//fetches local json and returns
async function fetchArList () {
  const res = await fetch('assets/json/arkansas.json');
  const arList = await res.json();
  return arList;
}

//fetches movies from api and returns in an array
async function fetchMovies (data) {

  const api_key = "20ab01d1e4cf2615dc812916957806eb";
  const language = "en-US";
  const arMovieArr = [];
  let i = 0;

  for (i in data.movies) {
    const movie = await fetch(`https://api.themoviedb.org/3/movie/
      ${data.movies[i].id}?api_key=${api_key}&language=${language}`)
    const parsedMovie = await movie.json();
    arMovieArr.push(parsedMovie);
  }
  return arMovieArr;
}

//loops through movies arr and inserts movie into the DOM
function buildPage (arMovies) {
  
  const results = document.querySelector('#results');
  let i = 0;

  for (i in arMovies) {
    
    const div = document.createElement('div');

    if (arMovies[i].poster_path != null && arMovies[i].poster_path != "") {

      div.classList.add('resultBanner');
      div.innerHTML = `${arMovies[i].title}<a href=
      "movieDetails.html?movieId=${arMovies[i].id}" alt=
      "${arMovies[i].title}"><img src=
      "https://image.tmdb.org/t/p/w500${arMovies[i].poster_path}"></a>`;
  
    } else {
  
      div.classList.add('resultNoImage');
      div.innerHTML = `<a href=
      "movieDetails.html?movieId=
      ${arMovies[i].id}">${arMovies[i].title}</a>No Image Found.`;
    }
  
    results.appendChild(div);
  }
}