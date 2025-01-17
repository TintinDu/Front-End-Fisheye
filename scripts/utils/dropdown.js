import { displayUserMediaArticles } from "../pages/photographer.js";

const dropdownButtons = document.querySelectorAll(".dropdown__button");
const displayDropdownButton = document.getElementById("displayDropdownBtn");
const mainButton = document.querySelector(".main-button");
const mainButtonDropdown = document.querySelector(".button-open-dropdown");

mainButton.addEventListener("click", () => {
  openDropdown();
});


//Delete media assets from the gallery section to clear space for sort output
const clearGallery = () => {
  const gallerySection = document.querySelector(".photograph-medias");
  function removeAllChildNodes(parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }

  removeAllChildNodes(gallerySection);
};

function openDropdown() {
  displayDropdownButton.className = "buttonOpenDropdown--hidden";

  dropdownButtons.forEach((button) => {
    button.className = "dropdown__button visible-button";
    button.addEventListener("click", (event) => {
      const newCurrentBtn = event.target;
      closeDropdown(newCurrentBtn);
    });
  });

}

function closeDropdown(newFilter) {

  mainButtonDropdown.innerText = newFilter.innerText;
  displayDropdownButton.className = "buttonOpenDropdown sortBy__dropdown main-button";

  dropdownButtons.forEach((button) => {
    button.className = "dropdown__button hidden-button";

  });
}

export const sortBy = (data, filter) => {
  clearGallery();
  let newData = data;
  const medias = data.photographerMedia;
  const photographer = data.photographer;

  if (filter === "Titre") {
    const mediasSorted = medias.sort((b, a) => (a.title < b.title) ? 1 : (a.title > b.title)? -1 : 0);
    newData = {photographer: photographer, photographerMedia: mediasSorted};
    return displayUserMediaArticles(newData);
  }

  if (filter === "Date") {
    const mediasSorted = medias.sort((b, a) => (a.date < b.date) ? 1 : (a.date > b.date)? -1 : 0);
    newData = {photographer: photographer, photographerMedia: mediasSorted};
    return displayUserMediaArticles(newData);
  }

  if (filter === "Popularité") {
    const mediasSorted = medias.sort((a, b) => (a.likes < b.likes) ? 1 : (a.likes > b.likes)? -1 : 0);
    newData = {photographer: photographer, photographerMedia: mediasSorted};
    return displayUserMediaArticles(newData);
  }
};