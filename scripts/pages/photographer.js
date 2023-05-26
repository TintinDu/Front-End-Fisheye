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

  const modalHeader = document.querySelectorAll(".modal__header > h2");
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

  // lightbox
  const medias = document.querySelectorAll(".photographer__media");


  console.log(medias);

  // for (let index = 0; index < medias.length; index++) {
  //   const slides = document.querySelector(".slides");
  //   const slide = document.createElement("li");
  //   slide.className = "slide";
  //   slides.appendChild(slide);
  // }

  medias.forEach((media)=> {
    const slides = document.querySelector(".lightbox__slides");
    const slide = document.createElement("li");
    const tagName = media.tagName;
    const id = media.id;
    slide.className = "lightbox__slide";
    slide.id = `slide${id}`;
    slides.appendChild(slide);

    if (tagName === "IMG") {

      const name = media.name;
      const imageToOpen = document.getElementById(id);
      const img = document.createElement("img");
      const div = document.createElement("div");
      const h4 = document.createElement("h4");
      img.src = imageToOpen.src;
      img.setAttribute('id', id);
      h4.innerText = name;
      h4.className = "lightbox__header";
      div.setAttribute("class", "lightbox__media lightbox__image");
      div.appendChild(img);
      slide.appendChild(div);
      slide.appendChild(h4);

    } else if (tagName === "VIDEO") {

      const name = media.title;
      const sourceToOpen = document.getElementById(`${id}source`);
      const vid = document.createElement("video");
      const source = document.createElement("source");
      const div = document.createElement("div");
      const h4 = document.createElement("h4");
      source.src = sourceToOpen.src;
      source.setAttribute('id', id);
      h4.innerText = name;
      h4.className = "lightbox__header";
      vid.appendChild(source);
      vid.setAttribute("controls", "controls");
      div.setAttribute("class", "lightbox__media lightbox__video");
      div.appendChild(vid);
      slide.appendChild(div);
      slide.appendChild(h4);

    }

    media.addEventListener("click", (e) => {
      console.log(e.target.id);
      const id = e.target.id;
      displayLightbox(id);
    });
  });


  // medias.forEach((media)=> {
  //   const slides = document.querySelector(".lightbox__slides");
  //   const slide = document.createElement("li");
  //   slide.className = `lightbox__slide ${media.id}`;
  //   slides.appendChild(slide);

  //   media.addEventListener("click", (e) => {
  //     console.log(e);
  //     const tagName = e.target.tagName;
  //     const id = e.target.id;
  //     if (tagName === "IMG") {
  //       const name = e.target.name;
  //       displayLightbox(tagName, id, name, slide);
  //     } else if (tagName === "VIDEO") {
  //       const name = e.target.title;
  //       displayLightbox(tagName, id, name, slide);
  //     }
  //   });
  // });




}

async function initializeOnePhotographer() {
  const photographer = await getOnePhotographer();
  displayData(photographer);

}


initializeOnePhotographer();
