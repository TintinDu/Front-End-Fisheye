//Mettre le code JavaScript lié à la page photographer.html
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

async function displayData(photographer) {
  const photographerHeader = document.querySelector(".personal-informations");
  const photographerAvatar = document.querySelector(".photograph-avatar");
  const mediasSection = document.querySelector(".photograph-medias");
  const photographerModel = photographerFactoryPhotographer(photographer);
  const userHeaderDOM = photographerModel.getUserHeaderDOM();
  const userAvatar = photographerModel.getUserAvatar();
  const userMedias = photographerModel.getUserMedia();
  photographerHeader.appendChild(userHeaderDOM);
  photographerAvatar.appendChild(userAvatar);
  console.log(userMedias);
  userMedias.map((userMedia) => {
    mediasSection.appendChild(userMedia);
  });


}

async function initializeOnePhotographer() {
  const photographer = await getOnePhotographer();
  displayData(photographer);
}

initializeOnePhotographer();