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

function buildPage() {
  const query = window.location.search;
  const urlParams = new URLSearchParams(query);
  const id = urlParams.get("actorId");
  const api_key = "20ab01d1e4cf2615dc812916957806eb";
  const months = ['January', 'February', 'March', 'April', 'May', 'June',
   'July', 'August', 'September', 'October', 'November', 'December'];
  let actor;
  let filmography;
  let i = 0;
  let language = "en-US";
  fetch(`https://api.themoviedb.org/3/person/${id}?api_key=${api_key}&language=${language}`)
    .then(r => {
      return r.json();
    })
    .then(data => {
      actor = data;

      if (actor.profile_path != null && actor.profile_path != "") {
          document.getElementById("results").innerHTML +=
          `<div id="actorBanner">${actor.name}<a href=
          "actorDetails.html?actorId=${actor.id}" alt=
          "${actor.name}"><img src=
          "https://image.tmdb.org/t/p/w500${actor.profile_path}"></a></div>`;
      } else {
        document.getElementById("results").innerHTML +=
         `<div id="actorBannerNoImage"><a href=
         "actorDetails.html?actorId=${actor.id}">${actor.name}</a></div>`;
      }

      //handle birthday here
      if (actor.birthday != null && actor.birthday != "") {
        const birthYear = actor.birthday.slice(0, 4);
        const birthMonth = actor.birthday.slice(5, 7);
        const birthDay = actor.birthday.slice(8, 10);
        const newBirthday = `${months[birthMonth-1]} ${birthDay}, ${birthYear}`;
        if (actor.place_of_birth != null && actor.place_of_birth != "") {
          document.getElementById("results").innerHTML +=
          `<div id="birthday">Born: ${newBirthday} in ${actor.place_of_birth}</div>`;
        } else {
          document.getElementById("results").innerHTML +=
          `<div id="birthday">Born: ${newBirthday}</div>`;
        }
      } else {
        document.getElementById("results").innerHTML +=
        `<div id="birthday">Born: No date found.</div>`;
      }

      //handle deathday here
      if (actor.deathday != null && actor.deathday != "") {
        const deathYear = actor.deathday.slice(0, 4);
        const deathMonth = actor.deathday.slice(5, 7);
        const deathDay = actor.deathday.slice(8, 10);
        const newDeathDay = `${months[deathMonth-1]} ${deathDay}, ${deathYear}`;
        document.getElementById("results").innerHTML +=
        `<div id="deathday">Died: ${newDeathDay}</div>`;
      } else {
        document.getElementById("results").innerHTML +=
        `<div id="deathday">Died: No date found.</div>`;
      }

      if (actor.biography != "" && actor.biography != null) {
        document.getElementById("results").innerHTML +=
        `<div id="bio">${actor.biography}</div>`;
      } else {
        document.getElementById("results").innerHTML +=
        `<div id="bio">No biography found for actor.</div>`;
      }

// get and build filmography here
      fetch(`https://api.themoviedb.org/3/person/${actor.id}/movie_credits?api_key=${api_key}&language=en-US`)
        .then(r => {
          return r.json();
        })
        .then(data => {
          filmography = data;
          document.getElementById("results").innerHTML +=
          `<h2> Filmography of ${actor.name}</h2>`;
          document.getElementById("results").innerHTML +=
          `<ul id="credits_list"></ul>`;
          for (i in filmography.cast) {

              if (filmography.cast[i].poster_path != null && filmography.cast[i].poster_path != "") {
                  document.getElementById("credits_list").innerHTML +=
                  `<li class="resultBanner">${filmography.cast[i].title}<a href=
                  "movieDetails.html?movieId=${filmography.cast[i].id}" alt=
                  "${filmography.cast[i].title}"><img src=
                  "https://image.tmdb.org/t/p/w500${filmography.cast[i].poster_path}"></a></li>`;
              } else {
                document.getElementById("credits_list").innerHTML +=
                 `<li class="resultNoImage"><a href=
                 "movieDetails.html?movieId=${filmography.cast[i].id}">${filmography.cast[i].title}</a>No Image Found.</li>`;
              }
          }
        })
    })
}
