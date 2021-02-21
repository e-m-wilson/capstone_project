"use strict";

document.addEventListener("DOMContentLoaded", start);

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

//retrieves local json, fetches actor data, builds page with data
async function start () {
  const arMovieActorData = await fetchArList();
  const arPeopleApiData = await fetchArPeople(arMovieActorData);
  buildPage(arPeopleApiData);
}

//fetches local json and returns
async function fetchArList () {
  const res = await fetch('assets/json/arkansas.json');
  const arList = await res.json();
  return arList;
}

//fetches each actor from api and returns in an array
async function fetchArPeople (arList) {

  const api_key = "20ab01d1e4cf2615dc812916957806eb";
  const arPeopleArr = [];
  let language = "en-US";
  let i = 0;

  for (i in arList.actors) {
    if (arList.actors[i].id != "") {
    const actorData = await fetch(`https://api.themoviedb.org/3/person/${arList.actors[i].id}?api_key=${api_key}&language=${language}`);
    const parsedActor = await actorData.json();
    arPeopleArr.push(parsedActor);
    } else {
      document.getElementById("results").innerHTML +=
      `<div class="resultNoImage">${arList.actors[i].name} is not in the TMDB database. Their name was still included because they were found in the Encyclopedia of Arkansas.</div>`;
    }
  }

  return arPeopleArr;
}


//builds page from array of arkansas people
function buildPage (arPeople) {

  const results = document.querySelector('#results');
  let i = 0;

  for (i in arPeople) {
    
    const div = document.createElement('div');

    if (arPeople[i].profile_path != null && arPeople[i].profile_path != "") {

      div.classList.add('resultBanner');
      div.innerHTML = `${arPeople[i].name}<a href=
      "actorDetails.html?actorId=${arPeople[i].id}" alt=
      "${arPeople[i].name}"><img src=
      "https://image.tmdb.org/t/p/w500${arPeople[i].profile_path}"></a>`;

    } else {

      div.classList.add('resultNoImage');
      div.innerHTML = `<a href=
      "actorDetails.html?actorId=${arPeople[i].id}">${arPeople[i].name}</a>`;

    }
    results.appendChild(div);
  }
}