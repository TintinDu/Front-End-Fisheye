/* eslint-disable no-unused-vars */

const modalHeader = document.querySelector("header");
const photographerHeader = document.querySelector(".photograph-header");
const gallery = document.querySelector(".gallery");
const containerLike = document.querySelector(".container__like");
const photographerMedias = document.querySelectorAll(".photographer__media");
const contactModal = document.getElementById("contact_modal");
const contactBackground = document.querySelector(".contactBackground");
const lightboxBackground = document.querySelector(".lightboxBackground");
const lightbox = document.querySelector("#lightbox");
const lightboxDiv = document.querySelector(".lightbox__media");
const lightboxMedia = document.querySelector(".carousel");
const lightboxHeader = document.querySelector(".lightbox__header");
const form = document.querySelector("#contactForm");
const formD = document.querySelectorAll(".formData");
const firstName = document.querySelector("#firstname");
const lastName = document.querySelector("#lastname");
const email = document.querySelector("#email");
const message = document.querySelector("#message");
const contactBtn = document.querySelector(".contact_button");
const modalTitle = document.querySelector("#contactMe");
const parentFirst = document.querySelector(".parentFirst");
const inputFirstName = document.querySelector(".parentFirst > input");
const parentLast = document.querySelector(".parentLast");
const inputLastName = document.querySelector(".parentLast > input");
const parentEmail = document.querySelector(".parentEmail");
const inputEmail = document.querySelector(".parentEmail > input");
const parentMessage = document.querySelector(".parentMessage");
const inputMessage = document.querySelector(".parentMessage > textarea");
const btnClose = document.querySelector(".btn-close");
const previousSlide = document.querySelector('.left-arrow');
const nextSlide = document.querySelector('.right-arrow');

const nameRegex = new RegExp("[a-zA-ZÀ-ÖØ-öø-ÿ-]{2,15}");
const emailRegex = new RegExp("[A-Za-z0-9.]+@[A-Za-z0-9.-]+.[A-Za-z]{2,13}");

const validationFirstName = document.createElement("p");
validationFirstName.innerText = "Veuillez entrer 2 caractères ou plus pour le champ du prénom.";
parentFirst.appendChild(validationFirstName);

const validationLastName = document.createElement("p");
validationLastName.innerText = "Veuillez entrer 2 caractères ou plus pour le champ du nom.";
parentLast.appendChild(validationLastName);

const validationEmail = document.createElement("p");
validationEmail.innerText = "L'adresse électronique doit être valide.";
parentEmail.appendChild(validationEmail);

const validationMessage = document.createElement("p");
validationMessage.innerText = "Le message doit être composé de 10 caractères au minimum.";
parentMessage.appendChild(validationMessage);

// Show error message
function showValidationMessage(validationElement) {
  validationElement.className = "formData__validation";
  validationElement.style.display = "flex";
}

// Hide error message
function hideValidationMessage(validationElement) {
  validationElement.className = "";
  validationElement.style.display = "none";
}

// change border to red when error
function redInputWhenErrors(parentElement) {
  parentElement.className += " text-input--error";
  parentElement.setAttribute("aria-invalid", true);
}

// change border to neutral when error
function neutralInputWhenNoErrors(parentElement) {
  parentElement.className = "text-input";
  parentElement.setAttribute("aria-invalid", false);
}


// is*****Valid functions all return a boolean depending if the condition is fulfilled
function isFirstNameValid(firstName, input) {
  if (!firstName || !nameRegex.test(firstName)) {
    showValidationMessage(validationFirstName);
    redInputWhenErrors(input);
    return false;
  } else {
    hideValidationMessage(validationFirstName);
    neutralInputWhenNoErrors(input);
    return true;
  }
}

function isLastNameValid(lastName, input) {
  if (!lastName || !nameRegex.test(lastName)) {
    showValidationMessage(validationLastName);
    redInputWhenErrors(input);
    return false;
  } else {
    hideValidationMessage(validationLastName);
    neutralInputWhenNoErrors(input);
    return true;
  }
}

function isEmailValid(email, input) {
  if (!email || !emailRegex.test(email)) {
    showValidationMessage(validationEmail);
    redInputWhenErrors(input);
    return false;
  } else {
    hideValidationMessage(validationEmail);
    neutralInputWhenNoErrors(input);
    return true;
  }
}

function isMessageValid(message, input) {
  if (!message || !nameRegex.test(message)) {
    showValidationMessage(validationMessage);
    redInputWhenErrors(input);
    return false;
  } else {
    hideValidationMessage(validationMessage);
    neutralInputWhenNoErrors(input);
    return true;
  }
}

// mapping for checking each input
function checkEachInputOnChange(input) {

  if (input.id === "firstname") {
    isFirstNameValid(input.value, input);
  } else if (input.id === "lastname") {
    isLastNameValid(input.value, input);
  } else if (input.id === "email") {
    isEmailValid(input.value, input);
  } else if (input.id === "message") {
    isMessageValid(input.value, input);
  }

}

// validations on change
function validateOnChange(inputSelector) {
  const input = document.querySelector(inputSelector);

  input.addEventListener("change", (event) => {
    event.preventDefault();
    checkEachInputOnChange(input);
  });
}

function getDataFromForm() {
  const formObject = {};
  const formData = new FormData(form);
  for (let key of formData.keys()) {
    formObject[key] = formData.get(key);
  }
  return formObject;
}

function isValidOnSubmit() {
  const dataFromForm = getDataFromForm();

  const areAllInputsValidOnSubmit = isFirstNameValid(dataFromForm.firstname, inputFirstName) &&
    isLastNameValid(dataFromForm.lastname, inputLastName) &&
    isEmailValid(dataFromForm.email, inputEmail) &&
    isMessageValid(dataFromForm.message, inputMessage);

  return areAllInputsValidOnSubmit;
}

function displayContactModal() {
  contactBackground.style.display = "block";
  modalTitle.focus();
  photographerHeader.setAttribute("aria-hidden", true);
  gallery.setAttribute("aria-hidden", true);
  modalHeader.setAttribute("aria-hidden", true);
  containerLike.setAttribute("aria-hidden", true);
}

function closeContactModal() {
  contactBackground.style.display = "none";
  photographerHeader.setAttribute("aria-hidden", false);
  gallery.setAttribute("aria-hidden", false);
  modalHeader.setAttribute("aria-hidden", false);
  containerLike.setAttribute("aria-hidden", false);
}

const closeContactModalWithEsc = (event) =>  {
  if (event.key === 'Escape') {
    contactBackground.style.display = "none";
    photographerHeader.setAttribute("aria-hidden", false);
    gallery.setAttribute("aria-hidden", false);
    modalHeader.setAttribute("aria-hidden", false);
    containerLike.setAttribute("aria-hidden", false);
  }
};

function getDataForLightbox(media, tagName) {
  const header = document.createElement('h4');
  const img = document.createElement('img');
  const vid = document.createElement('video');
  const source = document.createElement('source');
  vid.appendChild(source);
  lightbox.appendChild(header);
  img.className = "lightbox__img";
  vid.className = "lightbox__vid";
  source.className = "lightbox__source";
  header.className = "lightbox__header";
  console.log("toto");

  header.innerText = media.title;
  if (tagName === "IMG") {

    displayImageLightbox(media, img);

  } else if (tagName === "VIDEO") {

    displayVideoLightbox(media, vid, source);

  }
}

function displayImageLightbox(media, img) {
  const imageName = media.image;
  const imageTitle = media.title;
  const imageAuthor = media.authorName;
  const imagePath = `assets/images/${imageAuthor}/${imageName}`;
  img.className = "carousel";

  img.setAttribute("src", imagePath);
  img.setAttribute("alt", `open lightbox for ${media.title}`);
  img.setAttribute("id", media.id);
  img.setAttribute("name", imageTitle);
  img.style.cursor = "pointer";

  const header = document.querySelector('.lightbox__header');
  lightbox.appendChild(header);
  header.innerText = imageTitle;

  lightboxDiv.setAttribute("class", "lightbox__media lightbox__image");
  lightboxDiv.appendChild(img);
}

function displayVideoLightbox(media, vid, source) {
  const videoName = media.video;
  const videoTitle = media.title;
  const videoAuthor = media.authorName;
  const videoPath =`assets/images/${videoAuthor}/${videoName}`;

  vid.className = "carousel";
  source.className = "carousel";

  source.setAttribute("src", videoPath);
  source.setAttribute("type", "video/mp4");

  vid.setAttribute("id", media.id);
  vid.setAttribute("title", videoTitle);
  source.setAttribute("id", `${media.id}source`);
  vid.style.cursor = "pointer";
  vid.setAttribute("aria-label", `open lightbox for ${videoTitle}`);

  const header = document.querySelector('.lightbox__header');
  header.innerText = videoTitle;

  vid.setAttribute("controls", "controls");
  lightboxDiv.setAttribute("class", "lightbox__media lightbox__video");
  lightboxDiv.appendChild(vid);
}

function displayLightbox(id, tagName, array) {

  const medias = array.filter((media) => {
    // eslint-disable-next-line eqeqeq
    return media.id == id;
  });
  const media = medias[0];


  getDataForLightbox(media, tagName);

  lightboxBackground.style.display = "block";

  let index = array.indexOf(media);

  previousSlide.addEventListener("click", () => {
    // if() {
    displayPreviousMedia(array, index);

    // }

  });
  nextSlide.addEventListener("click", () => {
    displayNextMedia(array, index);
  });

}

const clearLightbox = () => {
  const lightboxMedia = document.querySelector(".lightbox__media");
  const lightboxHeader = document.querySelector(".lightbox__header");
  function removeAllChildNodes(parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }
  removeAllChildNodes(lightboxMedia);
  lightboxHeader.remove();
};

function getTagName(media) {
  if(media.image) {
    return "IMG";
  }
  return "VIDEO";

}


function displayPreviousMedia(array, index) {
  let newIndex = index;
  let newMedia;

  clearLightbox();

  if  (index === 0) {
    newMedia = array[array.length - 1];
    const tagName = getTagName(newMedia);
    newIndex = array.length;

    getDataForLightbox(newMedia, tagName);

  } else {
    newMedia = array[index - 1];
    const tagName = getTagName(newMedia);
    newIndex --;

    getDataForLightbox(newMedia, tagName);

  }

  previousSlide.addEventListener("click", () => {
    displayPreviousMedia(array, newIndex);
  });
  nextSlide.addEventListener("click", () => {
    displayNextMedia(array, newIndex);
  });
}

function displayNextMedia(array, index) {
  let newIndex = index;
  let newMedia;

  clearLightbox();

  if  (index === array.length - 1) {
    newMedia = array[0];
    const tagName = getTagName(newMedia);
    newIndex = 0;


    getDataForLightbox(newMedia, tagName);
  } else {
    newMedia = array[index + 1];
    const tagName = getTagName(newMedia);
    newIndex ++;

    getDataForLightbox(newMedia, tagName);
  }


  previousSlide.addEventListener("click", () => {
    displayPreviousMedia(array, newIndex);
  });
  nextSlide.addEventListener("click", () => {
    displayNextMedia(array, newIndex);
  });
}


// function ChangeAttributeForImage(media, lightboxImg) {

//   lightboxImg.setAttribute("src", `assets/images/${media.authorName}/${media.image}`);
// }

// function ChangeAttributeForVideo(media, lightboxVid, lightboxSource) {
//   lightboxSource.setAttribute("src", `assets/images/${media.authorName}/${media.video}`);
//   lightboxSource.setAttribute("type", "video/mp4");
//   lightboxVid.setAttribute("id", media.id);
//   lightboxVid.setAttribute("title", media.title);
//   lightboxVid.setAttribute("controls", "controls");
// }

// window.addEventListener("keyboard", (event) => {
//   if (event.key === "ArrowLeft") {
//     displayNextImage(id);
//   } else if (event.key === "ArrowRight") {
//     displayPreviousImage(id);
//   }
// });




function closeLightbox() {
  lightboxBackground.style.display = "none";
  clearLightbox();
}

const closeLightboxModalWithEsc = (event) =>  {
  if (event.key === 'Escape') {
    lightboxBackground.style.display = "none";
    clearLightbox();
  }
};

function sendContactForm() {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (isValidOnSubmit()) {
      const contact = getDataFromForm();

      form.reset();
      console.log(contact);
      return contact;
    }
  });
}

// launch validations on change event
firstName.addEventListener("change", validateOnChange("#firstname"));
lastName.addEventListener("change", validateOnChange("#lastname"));
email.addEventListener("change", validateOnChange("#email"));
message.addEventListener("change", validateOnChange("#message"));

contactBtn.addEventListener("click", sendContactForm());

window.addEventListener("keydown", closeContactModalWithEsc);
window.addEventListener("keydown", closeLightboxModalWithEsc);
