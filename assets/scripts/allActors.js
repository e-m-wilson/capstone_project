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

//use local maintained json to call api; make array of movie objects to build page
function buildPage () {
  const api_key = "20ab01d1e4cf2615dc812916957806eb";
  const include_adult = "false";
  let ar_actors = [];
  let language = "en-US";
  let page = "1";
  let sort = "popularity.desc";
  let include_video = "false";
  let pageNumber = "1";
  let i = 0;
  fetch('assets/json/arkansas.json')
    .then(r => {
      return r.json();
    })
    .then(data => {
      for (i in data.actors) {
        if (data.actors[i].id != "") {
        fetch(`https://api.themoviedb.org/3/person/${data.actors[i].id}?api_key=${api_key}&language=${language}`)
          .then(r => {
            return r.json();
          })
          .then(data => {
              ar_actors.push(data);
              if (data.profile_path != null && data.profile_path != "") {
                  document.getElementById("results").innerHTML +=
                  `<div class="resultBanner">${data.name}<a href=
                  "actorDetails.html?actorId=${data.id}" alt=
                  "${data.name}"><img src=
                  "https://image.tmdb.org/t/p/w500${data.profile_path}"></a></div>`;
              } else {
                document.getElementById("results").innerHTML +=
                 `<div class="resultNoImage"><a href=
                 "actorDetails.html?actorId=${data.id}">${data.name}</a></div>`;
              }
          })
        } else {
            document.getElementById("results").innerHTML +=
            `<div class="resultNoImage">${data.actors[i].name} is not in the TMDB database. Their name was still included because they were found in the Encyclopedia of Arkansas.</div>`;
        }
      }
    })
}
