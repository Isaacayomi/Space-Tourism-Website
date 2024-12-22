"use strict";

const openNavBtn = document.querySelector(".icon__open");
const closeNavBtn = document.querySelector(".icon__close");
const link = document.querySelector(".links");
const bodyEl = document.querySelector("body");
const mediaQuery = window.matchMedia("(max-width: 630px)");
const paginations = document.querySelectorAll(".pagination");
// let destinationHeading = document.querySelector(
//   ".destination__heading"
// ).textContent;
// let destinationSummary = document.querySelector(".summary").textContent;
// let destinationDistance = document.querySelector(".distance p").textContent;
// let destinationTime = document.querySelector(".time p").textContent;

const toggleBtn = () => {
  if (mediaQuery.matches) {
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
  const toggleDestination = (data) => {
    const destinations = data.destinations;

    paginations.forEach(function (p, i) {
      p.addEventListener("click", function () {
        console.log(i);
        // console.log(destinationHeading.textContent);
        document.querySelector('.destination__heading').style.textTransform = "uppercase";
        if (destinations[i]) {
          document.querySelector(".destination__heading").textContent =
            destinations[i].name;
          document.querySelector(".summary").textContent =
            destinations[i].description;
          document.querySelector(".distance p").textContent =
            destinations[i].distance;
          document.querySelector(".time p").textContent =
            destinations[i].travel;
        }
        paginations.forEach(function (pagItem, i) {
          pagItem.classList.remove("active");
        });
        p.classList.add("active");
      });
    });
  };
  // toggleDestination(data);

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
    } catch (err) {
      console.log(err.message);
    }
  };
  getData();
});
