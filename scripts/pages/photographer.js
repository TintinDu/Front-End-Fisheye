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
  const mediasSection = document.querySelector(".photograph-medias");
  const containerLike = document.querySelector('.container__like');
  const photographerModel = photographerFactoryPhotographer(data);
  const mediaModel = mediaFactory(data);
  const userHeaderDOM = photographerModel.getUserHeaderDOM();
  const userAvatar = photographerModel.getUserAvatar();
  const userPrice = photographerModel.getUserPrice();
  const userPhotos = mediaModel.getUserPhotographs();
  const userVideos = mediaModel.getUserVideos();

  const modalHeader = document.querySelector(".modal__header > h2");
  modalHeader.innerHTML = "Contactez-moi" + "<br>" + data.photographer.name;

  photographerHeader.appendChild(userHeaderDOM);
  photographerAvatar.appendChild(userAvatar);
  containerLike.appendChild(userPrice);
  userPhotos.map((userMedia) => {
    mediasSection.appendChild(userMedia);
  });
  userVideos.map((userVideo) => {
    mediasSection.appendChild(userVideo);
  });

}

async function initializeOnePhotographer() {
  const photographer = await getOnePhotographer();
  displayData(photographer);
}

initializeOnePhotographer();