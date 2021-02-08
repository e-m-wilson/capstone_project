"use strict";

document.addEventListener("DOMContentLoaded", buildPage);
var hamburger = document.querySelector('.hamburger');
var menu = document.querySelector('.main-menu');
hamburger.addEventListener("click", hamburgerChecked);

function hamburgerChecked () {
  menu.classList.toggle('active');
  hamburger.classList.toggle('hamburger-anim');
}


//use local maintained json to call api; make array of movie objects to build page
function buildPage () {
  const api_key = "20ab01d1e4cf2615dc812916957806eb";
  const include_adult = "false";
  var ar_movies = [];
  var language = "en-US";
  var page = "1";
  var sort = "popularity.desc";
  var include_video = "false";
  var pageNumber = "1";
  var i = 0;
  fetch('assets/json/arkansas.json')
    .then(r => {
      return r.json();
    })
    .then(data => {
      for (i in data.movies) {
        fetch(`https://api.themoviedb.org/3/movie/
          ${data.movies[i].id}?api_key=${api_key}&language=${language}`)
          .then(r => {
            return r.json();
          })
          .then(data => {
              ar_movies.push(data);
              if (data.poster_path != null && data.poster_path != "") {
                  document.getElementById("allMoviesList").innerHTML +=
                  `<div class="resultBanner">${data.title}<a href=
                  "movieDetails.html?movieId=${data.id}" alt=
                  "${data.title}"><img src=
                  "https://image.tmdb.org/t/p/w500${data.poster_path}"></a></div>`;
              } else {
                document.getElementById("allMoviesList").innerHTML +=
                 `<div class="resultNoImage"><a href=
                 "movieDetails.html?movieId=${data.id}">${data.title}</a>No Image Found.</div>`;
              }
          })
      }
    })
}
