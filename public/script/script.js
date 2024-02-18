function toggleButtonActive(button) {
  button.classList.toggle("active");
}

function toggleButtonHidden(button) {
  button.classList.toggle("hidden");
}

let checkedCount = 0;

const checkboxes = document.getElementsByClassName("btn-checkbox");
for (let i = 0; i < checkboxes.length; i++) {
  checkboxes[i].addEventListener("click", function () {
    if (this.classList.contains("active")) {
      checkedCount--;
    } else {
      checkedCount++;
    }

    if (checkedCount > 3) {
      this.classList.remove("active");
      checkedCount--;
      return;
    }

    toggleButtonActive(this);
    console.log(checkedCount);
  });
}

//Function for hide/view button
const hiddenCheckboxes = document.getElementsByClassName("btn-hidden");
const moreButton = document.getElementById("more-btn");
const moreButtonSign = document.getElementById("more-btn-sign");
moreButton.addEventListener("click", () => {
  for (let i = 0; i < hiddenCheckboxes.length; i++) {
    hiddenCheckboxes[i].classList.toggle("hidden");
  }

  //Change Button Icon Element
  if (moreButtonSign.classList.contains("bx-minus")) {
    moreButtonSign.classList.remove("bx-minus");
    moreButtonSign.classList.add("bx-plus-medical");
  } else {
    moreButtonSign.classList.remove("bx-plus-medical");
    moreButtonSign.classList.add("bx-minus");
  }
});

//Function for random button
document.getElementById("random-btn").addEventListener("click", () => {
  window.location.href = "/random";
});
