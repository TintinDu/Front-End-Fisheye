const lightboxHiddenHeader = document.querySelector("#lightbox-hidden-header");
const contactHiddenHeader = document.querySelector("#contact-hidden-header");
const modalHeader = document.querySelector("header");
const photographerHeader = document.querySelector(".photograph-header");
const gallery = document.querySelector(".gallery");
const containerLike = document.querySelector(".container__like");
const contactBackground = document.querySelector(".contactBackground");
const lightboxBackground = document.querySelector(".lightboxBackground");
const lightbox = document.querySelector("#lightbox");
const lightboxDiv = document.querySelector(".lightbox__media");
const form = document.querySelector("#contactForm");
const firstName = document.querySelector("#firstname");
const lastName = document.querySelector("#lastname");
const email = document.querySelector("#email");
const message = document.querySelector("#message");
const contactBtnOpen = document.querySelector(".button-open-modal");
const contactBtnSubmit = document.querySelector(".contact_button__modal");
const modalTitle = document.querySelector("#contactMe");
const parentFirst = document.querySelector(".parentFirst");
const inputFirstName = document.querySelector(".parentFirst > input");
const parentLast = document.querySelector(".parentLast");
const inputLastName = document.querySelector(".parentLast > input");
const parentEmail = document.querySelector(".parentEmail");
const inputEmail = document.querySelector(".parentEmail > input");
const parentMessage = document.querySelector(".parentMessage");
const inputMessage = document.querySelector(".parentMessage > textarea");
const previousSlide = document.querySelector('.left-arrow');
const nextSlide = document.querySelector('.right-arrow');
const btnCloseContactModal = document.querySelector(".btn-close");
const btnCloseLightbox = document.querySelector(".btn-lightbox");
let currentIndex = 0;
let userMedias = [];

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

const displayContactModal = () => {
  contactHiddenHeader.style.display = "block";
  contactBackground.style.display = "block";
  modalTitle.focus();
  photographerHeader.setAttribute("aria-hidden", true);
  gallery.setAttribute("aria-hidden", true);
  modalHeader.setAttribute("aria-hidden", true);
  containerLike.setAttribute("aria-hidden", true);
  window.addEventListener("keydown", closeContactModalWithEsc);
  btnCloseContactModal.addEventListener("click", closeContactModal);
};

contactBtnSubmit.addEventListener("click", sendContactForm);

const closeContactModal = () => {
  contactHiddenHeader.style.display = "none";
  contactBackground.style.display = "none";
  photographerHeader.setAttribute("aria-hidden", false);
  gallery.setAttribute("aria-hidden", false);
  modalHeader.setAttribute("aria-hidden", false);
  containerLike.setAttribute("aria-hidden", false);
};

const closeContactModalWithEsc = (event) =>  {
  if (event.key === 'Escape') {
    contactHiddenHeader.style.display = "none";
    contactBackground.style.display = "none";
    photographerHeader.setAttribute("aria-hidden", false);
    gallery.setAttribute("aria-hidden", false);
    modalHeader.setAttribute("aria-hidden", false);
    containerLike.setAttribute("aria-hidden", false);
  }
};

function getDataForLightbox(media, tagName) {
  const header = document.createElement('h2');
  const img = document.createElement('img');
  const vid = document.createElement('video');
  const source = document.createElement('source');
  vid.appendChild(source);
  lightbox.appendChild(header);
  img.className = "lightbox__img";
  vid.className = "lightbox__vid";
  source.className = "lightbox__source";
  header.className = "lightbox__header";

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

export const displayLightbox = (id, tagName, array) => {
  lightboxHiddenHeader.style.display = "block";
  photographerHeader.setAttribute("aria-hidden", true);
  gallery.setAttribute("aria-hidden", true);
  modalHeader.setAttribute("aria-hidden", true);
  containerLike.setAttribute("aria-hidden", true);

  const medias = array.filter((media) => {
    // eslint-disable-next-line eqeqeq
    return media.id == id;
  });
  const media = medias[0];


  getDataForLightbox(media, tagName);

  lightboxBackground.style.display = "block";

  currentIndex = array.indexOf(media);
  userMedias = array;

  btnCloseLightbox.addEventListener("click", closeLightbox);
  window.addEventListener("keydown", closeLightboxModalWithEsc);
  previousSlide.addEventListener("click", () => {
    displayPreviousMedia(userMedias);
  });
  nextSlide.addEventListener("click", () => {
    displayNextMedia(userMedias);
  });
  window.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      displayPreviousMedia(userMedias);
    } else if (event.key === "ArrowRight") {
      displayNextMedia(userMedias);
    }
  });

};


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


function displayPreviousMedia(array) {
  let newMedia = array[currentIndex];

  clearLightbox();

  if  (currentIndex === 0) {
    newMedia = array[array.length - 1];
    const tagName = getTagName(newMedia);
    currentIndex = array.length - 1;

    getDataForLightbox(newMedia, tagName);

  } else {
    newMedia = array[currentIndex - 1];
    const tagName = getTagName(newMedia);
    currentIndex --;

    getDataForLightbox(newMedia, tagName);

  }
}

function displayNextMedia(array) {
  let newMedia = array[currentIndex];

  clearLightbox();

  if  (currentIndex === array.length - 1) {
    newMedia = array[0];
    const tagName = getTagName(newMedia);
    currentIndex = 0;


    getDataForLightbox(newMedia, tagName);
  } else {
    newMedia = array[currentIndex + 1];
    const tagName = getTagName(newMedia);
    currentIndex ++;

    getDataForLightbox(newMedia, tagName);
  }
}


export const closeLightbox = () => {
  lightboxHiddenHeader.style.display = "none";
  lightboxBackground.style.display = "none";
  photographerHeader.setAttribute("aria-hidden", false);
  gallery.setAttribute("aria-hidden", false);
  modalHeader.setAttribute("aria-hidden", false);
  containerLike.setAttribute("aria-hidden", false);
  clearLightbox();
};

const closeLightboxModalWithEsc = (event) =>  {
  if (event.key === 'Escape') {
    lightboxHiddenHeader.style.display = "none";
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

// listener displayContactModal
contactBtnOpen.addEventListener("click", displayContactModal);
