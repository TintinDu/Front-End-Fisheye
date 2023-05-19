/* eslint-disable no-unused-vars */

const header = document.querySelector("header");
const photographerHeader = document.querySelector(".photograph-header");
const gallery = document.querySelector(".gallery");
const containerLike = document.querySelector(".container__like");
const photographerMedias = document.querySelectorAll(".photographer__media");
const contactModal = document.getElementById("contact_modal");
const lightboxModal = document.getElementById("lightbox");
const contactBackground = document.querySelector(".contactBackground");
const lightboxBackground = document.querySelector(".lightboxBackground");
// const modalMedia = document.querySelector("#lightbox");
const mediaLinks = document.querySelectorAll(".media__link");
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
  header.setAttribute("aria-hidden", true);
  containerLike.setAttribute("aria-hidden", true);
}

function closeContactModal() {
  contactBackground.style.display = "none";
  photographerHeader.setAttribute("aria-hidden", false);
  gallery.setAttribute("aria-hidden", false);
  header.setAttribute("aria-hidden", false);
  containerLike.setAttribute("aria-hidden", false);
}

const closeContactModalWithEsc = (event) =>  {
  if (event.key === 'Escape') {
    contactBackground.style.display = "none";
    photographerHeader.setAttribute("aria-hidden", false);
    gallery.setAttribute("aria-hidden", false);
    header.setAttribute("aria-hidden", false);
    containerLike.setAttribute("aria-hidden", false);
  }
};

function displayLightbox(tag, id) {
  lightboxBackground.style.display = "block";

  if(tag === "IMG") {
    const imageToOpen = document.getElementById(id);
    const img = document.createElement("img");
    const div = document.createElement("div");
    img.src = imageToOpen.src;
    img.setAttribute('id', id);
    div.setAttribute("class", "lightbox__media lightbox__image");
    div.appendChild(img);
    lightboxModal.appendChild(div);
  }

  if(tag === "VIDEO") {
    const sourceToOpen = document.getElementById(`${id}source`);
    const vid = document.createElement("video");
    const source = document.createElement("source");
    const div = document.createElement("div");
    source.src = sourceToOpen.src;
    source.setAttribute('id', id);
    vid.appendChild(source);
    vid.setAttribute("controls", "controls");
    div.setAttribute("class", "lightbox__media lightbox__video");
    div.appendChild(vid);
    lightboxModal.appendChild(div);
  }

}

function closeLightbox() {
  lightboxBackground.style.display = "none";
}

const closeLightboxModalWithEsc = (event) =>  {
  if (event.key === 'Escape') {
    lightboxBackground.style.display = "none";
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

// mediaLinks.forEach(media => {
//   media.addEventListener("click", displayLightbox());
// });

// photographerMedias.forEach(media => {
//   media.addEventListener("click", (e) => {
//     console.log("event", e);
//   });
// });



window.addEventListener("keydown", closeContactModalWithEsc);
