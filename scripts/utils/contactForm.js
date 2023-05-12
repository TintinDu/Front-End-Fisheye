/* eslint-disable no-unused-vars */

const modal = document.getElementById("contact_modal");
const modalbackground = document.querySelector(".background");
const form = document.querySelector("#contactForm");
const formD = document.querySelectorAll(".formData");
const firstName = document.querySelector("#first");
const lastName = document.querySelector("#last");
const email = document.querySelector("#email");
const message = document.querySelector("#message");
const contactBtn = document.querySelector(".contact_button");
const parentFirst = document.querySelector(".parentFirst");
const inputFirstName = document.querySelector(".parentFirst > input");
const parentLast = document.querySelector(".parentLast");
const inputLastName = document.querySelector(".parentLast > input");
const parentEmail = document.querySelector(".parentEmail");
const inputEmail = document.querySelector(".parentEmail > input");
const parentMessage = document.querySelector(".parentMessage");
const inputMessage = document.querySelector(".parentMessage > text-area");

const nameRegex = new RegExp("[a-zA-ZÀ-ÖØ-öø-ÿ-]{2,15}");
const emailRegex = new RegExp("[A-Za-z0-9.]+@[A-Za-z0-9.-]+.[A-Za-z]{2,13}");


function displayModal() {
  modalbackground.style.display = "block";
}

function closeModal() {
  modalbackground.style.display = "none";
}

function getDataFromForm() {
  const formObject = {};
  const formData = new FormData(form);
  for (let key of formData.keys()) {
    formObject[key] = formData.get(key);
  }
  return formObject;
}

function sendContactForm() {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const contact = getDataFromForm();

    form.reset();
    console.log(contact);
    return contact;
  });
}

contactBtn.addEventListener("click", sendContactForm());