"use strict";

const openNavBtn = document.querySelector(".icon__open");
const closeNavBtn = document.querySelector(".icon__close");
const link = document.querySelector(".links");
const bodyEl = document.querySelector("body");
const mediaQuery = window.matchMedia("(max-width: 630px)");
const paginations = document.querySelectorAll(".pagination");
const paginationDots = document.querySelectorAll(".dot");
const numberedPagination = document.querySelectorAll(".num__pagination");
//DESTINATION CONSTANT ELEMENTS
const destinationName = document.querySelector(".destination__heading");
const destinationDescription = document.querySelector(".summary");
const destinationDistance = document.querySelector(".distance p");
const destinationTime = document.querySelector(".time p");
const destinationImg = document.querySelector(".destination__img");
//CREW CONSTANT ELEMENTS
const crewImage = document.querySelector(".crew__image");
const crewRole = document.querySelector(".role");
const crewName = document.querySelector(".name");
const crewSummary = document.querySelector(".summary");

const toggleBtn = () => {
  if (mediaQuery.matches) {
    anime({
      targets: ".links",
      translateX: [50, 0],
      easings: "easeOutExpo",
    });
    if (link.style.display === "none") {
      link.style.display = "block";
      openNavBtn.style.display = "none";
      bodyEl.style.overflow = "hidden";
    } else {
      link.style.display = "none";
      openNavBtn.style.display = "block";
      bodyEl.style.overflow = "scroll";
    }
  } else if (!mediaQuery.matches) {
    link.style.display = "none";
  }
};

document.addEventListener("DOMContentLoaded", () => {
  anime({
    targets: "section",
    opacity: [0, 1],
    easings: "easeOutExpo",
    delay: 500,
  });

  const toggleDestination = (data) => {
    const destinations = data.destinations;

    paginations.forEach(function (p, i) {
      p.addEventListener("click", function () {
        console.log(i);
        anime({
          targets: ".planets",
          opacity: [0, 1],
          easings: "easeOutExpo",

          delay: 300,
        });
        document.querySelector(".destination__heading").style.textTransform =
          "uppercase";
        if (destinations[i]) {
          destinationName.textContent = destinations[i].name;
          destinationDescription.textContent = destinations[i].description;
          destinationDistance.textContent = destinations[i].distance;
          destinationTime.textContent = destinations[i].travel;
          destinationImg.src = destinations[i].images.png;
        }
        paginations.forEach(function (pagItem, i) {
          pagItem.classList.remove("active");
        });
        p.classList.add("active");
      });
    });
  };

  const toggleCrew = (data) => {
    const crews = data.crew;

    console.log(crews);
    paginationDots.forEach((dots, i) => {
      dots.addEventListener("click", function () {
        anime({
          targets: ".slide",
          opacity: [0, 1],
          easings: "easeOutExpo",
          delay: 300,
        });
        if (crews[i]) {
          crewImage.src = crews[i].images.png;
          crewRole.textContent = crews[i].role;
          crewName.textContent = crews[i].name;
          crewSummary.textContent = crews[i].bio;
        }
        paginationDots.forEach((pagDot) => {
          pagDot.classList.remove("active");
        });
        dots.classList.add("active");
      });
    });
  };

  const toggleSpaceLaunch = (data) => {
    const technologyName = document.querySelector(".technology__name");
    const technologyDescription = document.querySelector(".description");
    const technologyPortraitImg = document.querySelector(".portrait");
    const technologyLandscapeImg = document.querySelector(".landscape");
    const spaceLaunch = data.technology;
    numberedPagination.forEach(function (numPag, i) {
      numPag.addEventListener("click", function () {
        anime({
          targets: ".tech__summary",
          opacity: [0.3, 1],
          easings: "easeOutExpo",
          delay: 200,
        });
        if (spaceLaunch[i]) {
          technologyName.textContent = spaceLaunch[i].name;
          technologyDescription.textContent = spaceLaunch[i].description;
          technologyPortraitImg.src = spaceLaunch[i].images.portrait;
          technologyLandscapeImg.src = spaceLaunch[i].images.landscape;
        }
        numberedPagination.forEach(function (pag) {
          pag.classList.remove("active__pagination");
        });
        numPag.classList.add("active__pagination");
      });
    });
  };
  openNavBtn.addEventListener("click", toggleBtn);
  closeNavBtn.addEventListener("click", toggleBtn);

  const getData = async function () {
    try {
      const res = await fetch(`../data.json`);
      console.log(res); // check status of the response
      if (!res.ok) throw new Error(`Something went wrong`);

      const datas = await res.json(); // gets the datas
      console.log(datas);
      toggleDestination(datas);
      toggleCrew(datas);
      toggleSpaceLaunch(datas);
    } catch (err) {
      console.log(err.message);
    }
  };
  getData();
});
