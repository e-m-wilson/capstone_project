"use strict";

document.addEventListener("DOMContentLoaded", buildPage);

//this section animates the hamburger menu
let hamburger = document.querySelector('.hamburger');
let menu = document.querySelector('.main-menu');
let menuGroup = document.querySelector('.menu-group');
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

// this function fills out the document with info from the api
function buildPage () {
  const query = window.location.search;
  const urlParams = new URLSearchParams(query);
  const id = urlParams.get("movieId");
  const api_key = "20ab01d1e4cf2615dc812916957806eb";
  let movie;
  let language = "en-US";
  
  fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}&language=${language}`)
    .then(r => {
      return r.json();
    })
    .then(data => {
      movie = data;
      buildMovieDetails(movie);
      buildCastDetails(movie, api_key);
    })
}


function buildMovieDetails(movie) {
  const months = ['January', 'February', 'March', 'April', 'May', 'June',
   'July', 'August', 'September', 'October', 'November', 'December'];
  let newDate = "";

  if (movie.release_date != null && movie.release_date != "") {
    const year = movie.release_date.slice(0, 4);
    const month = movie.release_date.slice(5, 7);
    const day = movie.release_date.slice(8, 10);
    newDate = `${months[month-1]} ${day}, ${year}`;
  }

  if (movie.poster_path != null && movie.poster_path != "") {
      document.getElementById("movieDetails").innerHTML +=
      `<h1 id="movieTitle">${movie.title}</h1><div id="movieBanner"><img src=
      "https://image.tmdb.org/t/p/w500${movie.poster_path}" alt=
      "${movie.title}"><div id="movieDate">${newDate}</div></div`;
  } else {
    document.getElementById("movieDetails").innerHTML +=
     `<h1 id="movieTitle">${movie.title}</h1><div id="movieBanner"><p>No Image Found.</p><div id=
     "movieDate">${newDate}</div></div>`;
  }

  if (movie.overview != null && movie.overview != "") {
    document.getElementById("movieDetails").innerHTML +=
    `<div id="overview">${movie.overview}</div>`;
  } else {
    document.getElementById("movieDetails").innerHTML +=
    `<div id="overview">No overview could be found for this title.</div>`;
  }

  if (movie.runtime != null && movie.runtime != "") {
    document.getElementById("movieDetails").innerHTML +=
    `<div id="runtime">Total Runtime: ${movie.runtime} minutes.</div>`;
  } else {
    document.getElementById("movieDetails").innerHTML +=
    `<div id="runtime">No runtime could be found for this title.</div>`;
  }
}

//call api to get cast and post to document
function buildCastDetails(movie, api_key) {
  let creditsList;
  const wrapper = document.querySelector('.wrapper');
  let i = 0;
  
  fetch(`https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${api_key}`)
  .then(r => {
    return r.json();
  })
  .then(data => {
    creditsList = data;

    if (creditsList.cast != 0) {
    
      const castHeader = document.createElement('h2');
      const castHeaderTextNode = document.createTextNode(`Cast of ${movie.title}`); 
      castHeader.appendChild(castHeaderTextNode); 
      const castList = document.createElement('ul');
      castList.id = 'castList';
      wrapper.appendChild(castHeader);
      wrapper.appendChild(castList);
  
  
      for (i in creditsList.cast) {
        if (creditsList.cast[i].character != "" && creditsList.cast[i].character != null) {
          if (creditsList.cast[i].profile_path != null && creditsList.cast[i].profile_path != "") {
            document.getElementById("castList").innerHTML +=
            `<li class="castMember"><a href=
            "actorDetails.html?actorId=${creditsList.cast[i].id}" alt=
            "${creditsList.cast[i].name}"><img src=
            "https://image.tmdb.org/t/p/w500${creditsList.cast[i].profile_path}" alt=
            "${creditsList.cast[i].name}"></a>${creditsList.cast[i].name} as ${creditsList.cast[i].character}</li>`;
          } else {
            document.getElementById("castList").innerHTML +=
            `<li class="castMember"><a href=
            "actorDetails.html?actorId=${creditsList.cast[i].id}" alt=
            "${creditsList.cast[i].name}">${creditsList.cast[i].name}</a> as ${creditsList.cast[i].character}</li>`;
          }
        } else {
          if (creditsList.cast[i].profile_path != null && creditsList.cast[i].profile_path != "") {
            document.getElementById("castList").innerHTML +=
            `<li class="castMember"><a href=
            "actorDetails.html?actorId=${creditsList.cast[i].id}" alt=
            "${creditsList.cast[i].name}"><img src=
            "https://image.tmdb.org/t/p/w500${creditsList.cast[i].profile_path}" alt=
            "${creditsList.cast[i].name}"></a>${creditsList.cast[i].name}</li>`;
          } else {
            document.getElementById("castList").innerHTML +=
            `<li class="castMember"><a href=
            "actorDetails.html?actorId=${creditsList.cast[i].id}" alt=
            "${creditsList.cast[i].name}">${creditsList.cast[i].name}</a></li>`;
          }
        }
      }
    } else {
      wrapper.innerHTML +=
      `<p>No Cast could be found for this title.</p>`;
    }
  })
}