"use strict";

document.addEventListener("DOMContentLoaded", buildPage);

// this function fills out the document with info from the api
function buildPage () {
  const query = window.location.search;
  const urlParams = new URLSearchParams(query);
  const id = urlParams.get("movieId");
  const api_key = "20ab01d1e4cf2615dc812916957806eb";
  const months = ['January', 'February', 'March', 'April', 'May', 'June',
   'July', 'August', 'September', 'October', 'November', 'December'];
  var newDate = "";
  var movie;
  var language = "en-US";
  var i = 0;
  fetch(`https://api.themoviedb.org/3/movie/
    ${id}?api_key=${api_key}&language=${language}`)
    .then(r => {
      return r.json();
    })
    .then(data => {
      movie = data;

      if (movie.release_date != null && movie.release_date != "") {
        const year = movie.release_date.slice(0, 4);
        const month = movie.release_date.slice(5, 7);
        const day = movie.release_date.slice(8, 10);
        newDate = `${months[month-1]} ${day}, ${year}`;
      }

      if (movie.poster_path != null && movie.poster_path != "") {
          document.getElementById("results").innerHTML +=
          `<div id="titleBanner">${data.title}<a href=
          "movieDetails.html?movieId=${data.id}" alt=
          "${data.title}"><img src=
          "https://image.tmdb.org/t/p/w500${data.poster_path}"></a>${newDate}</div>`;
      } else {
        document.getElementById("results").innerHTML +=
         `<div id="titleBannerNoImage"><a href=
         "movieDetails.html?movieId=${data.id}">${data.title}</a>${newDate}</div>`;
      }

      if (movie.overview != null && movie.overview != "") {
        document.getElementById("results").innerHTML +=
        `<div id="overview">${movie.overview}</div>`;
      } else {
        document.getElementById("results").innerHTML +=
        `<div id="overview">No overview could be found for this title.</div>`;
      }

      if (movie.runtime != null && movie.runtime != "") {
        document.getElementById("results").innerHTML +=
        `<div id="runtime">Total Runtime: ${movie.runtime} minutes.</div>`;
      } else {
        document.getElementById("results").innerHTML +=
        `<div id="runtime">No runtime could be found for this title.</div>`;
      }


      //call api to get cast and post to document
      fetch(`https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${api_key}`)
        .then(r => {
          return r.json();
        })
        .then(data => {
          if (data.cast != 0) {
            document.getElementById("results").innerHTML +=
            `<h2> Cast of ${movie.title} </h2>`;
            document.getElementById("results").innerHTML +=
            `<ul id="castList"></ul>`;
            for (i in data.cast) {
              if (data.cast[i].character != "" && data.cast[i].character != null) {
                if (data.cast[i].profile_path != null && data.cast[i].profile_path != "") {
                  document.getElementById("castList").innerHTML +=
                  `<li class="castMember"><a href=
                  "actorDetails.html?actorId=${data.cast[i].id}" alt=
                  "${data.cast[i].name}"><img src=
                  "https://image.tmdb.org/t/p/w500${data.cast[i].profile_path}" alt=
                  "${data.cast[i].name}"></a>${data.cast[i].name} as ${data.cast[i].character}</li>`;
                } else {
                  document.getElementById("castList").innerHTML +=
                  `<li class="castMember"><a href=
                  "actorDetails.html?actorId=${data.cast[i].id}" alt=
                  "${data.cast[i].name}">${data.cast[i].name}</a> as ${data.cast[i].character}</li>`;
                }
              } else {
                if (data.cast[i].profile_path != null && data.cast[i].profile_path != "") {
                  document.getElementById("castList").innerHTML +=
                  `<li class="castMember"><a href=
                  "actorDetails.html?actorId=${data.cast[i].id}" alt=
                  "${data.cast[i].name}"><img src=
                  "https://image.tmdb.org/t/p/w500${data.cast[i].profile_path}" alt=
                  "${data.cast[i].name}"></a>${data.cast[i].name}</li>`;
                } else {
                  document.getElementById("castList").innerHTML +=
                  `<li class="castMember"><a href=
                  "actorDetails.html?actorId=${data.cast[i].id}" alt=
                  "${data.cast[i].name}">${data.cast[i].name}</a></li>`;
                }
              }
            }
          } else {
            document.getElementById("results").innerHTML +=
            `<div id="noCast">No Cast could be found for this title.</div>`;
          }
        })

    })
}
