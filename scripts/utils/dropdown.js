const dropdownButtons = document.querySelectorAll(".dropdown__button");
const currentDropdownButton = document.querySelector('.current-filter');
const otherDropdownButtons = document.querySelectorAll('.other-filter');


currentDropdownButton.addEventListener("click", ()  => {
  openDropdown(currentDropdownButton, otherDropdownButtons);
});

function openDropdown(currentBtn, otherBtns) {
  currentBtn.className = "dropdown__button other-filter";
  currentBtn.style.display = "block";

  otherBtns.forEach((button) => {
    button.style.display = "block";
  });

  dropdownButtons.forEach((button) => {
    button.addEventListener("click", () => {
      dropdownButtons.forEach((btn) => {

        btn.style.display = "none";
      },
      );
      button.className = "dropdown__button current-filter";
      button.style.display = "block";

      const newCurrentDropdownButton = document.querySelector('.current-filter');
      const newOtherDropdownButtons = document.querySelectorAll('.other-filter');
      newCurrentDropdownButton.addEventListener("click", ()  => {
        openDropdown(newCurrentDropdownButton, newOtherDropdownButtons);
      });
      console.log("toto");
    });
  });


}
