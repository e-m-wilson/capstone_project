"use strict";

var hamburger = document.querySelector('.hamburger');
var menu = document.querySelector('.main-menu');
hamburger.addEventListener("click", hamburgerChecked);

function hamburgerChecked () {
  menu.classList.toggle('active');
  hamburger.classList.toggle('hamburger-anim');
}