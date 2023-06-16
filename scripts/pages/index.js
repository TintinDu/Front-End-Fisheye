import photographerFactoryHomepage from "../factories/photographerHomepage.js";

async function getPhotographers() {

  const response = await fetch("./data/photographers.json");

  const data = await response.json();

  return ({
    photographers: [...data.photographers]});
}

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactoryHomepage(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function initializeData() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

initializeData();

