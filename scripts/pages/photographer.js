/* eslint-disable no-undef */
async function getOnePhotographer() {

  const url = new URL(window.location.href);
  const id = parseInt(url.searchParams.get("id"));

  const data = await fetch("./data/photographers.json").then(
    (response) => response.json(),
  );


  const photographerPersonalData = data.photographers.filter(
    (photographer) => photographer.id === id,
  );

  const photographer = Object.assign({}, ...photographerPersonalData);

  const photographerMedia = data.media.filter((media) => media.photographerId === id);

  const photographerData = {
    photographer, photographerMedia,
  };

  return photographerData;
}

async function displayData(data) {
  const photographerHeader = document.querySelector(".personal-informations");
  const photographerAvatar = document.querySelector(".photograph-avatar");
  const containerLike = document.querySelector('.container__like');
  const photographerModel = photographerFactoryPhotographer(data);

  const userHeaderDOM = photographerModel.getUserHeaderDOM();
  const userAvatar = photographerModel.getUserAvatar();
  const userLikes = photographerModel.getUserLikes();
  const userPrice = photographerModel.getUserPrice();

  const modalHeader = document.querySelectorAll(".modal__header > h2");
  modalHeader.innerHTML = "Contactez-moi" + "<br>" + data.photographer.name;

  photographerHeader.appendChild(userHeaderDOM);
  photographerAvatar.appendChild(userAvatar);
  containerLike.appendChild(userLikes);
  containerLike.appendChild(userPrice);
}

function displayUserMediaArticles(data) {

  const mediasSection = document.querySelector(".photograph-medias");
  const mediaModel = mediaFactory(data);
  const mediasData = mediaModel.medias;
  const userMediaArticles = mediaModel.getUserMediaArticles();
  userMediaArticles.map((userMedia) => {
    mediasSection.appendChild(userMedia);
  });

  // lightbox
  const medias = document.querySelectorAll(".photographer__media");
  medias.forEach((media) => {
    media.addEventListener("click", () => {
      displayLightbox(media.id, media.tagName, mediasData);
    });
    media.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        displayLightbox(media.id, media.tagName, mediasData);
      }
    });
  });

  // likes
  const hearts = document.querySelectorAll('.media__heart');
  const totalLikes = document.querySelector(".total-likes");

  let click = 0;

  hearts.forEach((heart) => {
    heart.addEventListener("click", () => {

      if (click === 0) {
        parseInt(heart.previousElementSibling.innerText++);
        click ++;
        totalLikes.innerText ++;

      } else if (click === 1) {
        parseInt(heart.previousElementSibling.innerText--);
        click --;
        totalLikes.innerText --;

      }
    });
  });


  //sort
  const dropdownButtons = document.querySelectorAll(".dropdown__button");

  dropdownButtons.forEach((button) => {
    button.addEventListener("click", () => {
      sortBy(data, button.id);
    });
  });
}

async function initializeOnePhotographer() {
  const photographer = await getOnePhotographer();
  displayData(photographer);
  displayUserMediaArticles(photographer);
}


initializeOnePhotographer();
