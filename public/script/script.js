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

document.getElementById("random-btn").addEventListener("click", async() => {
  let selectedCategories = [];
  Array.from(checkboxes).forEach((checkbox) => {
    if (checkbox.classList.contains("active")) {
      selectedCategories.push(checkbox.id);
    }
  });
  console.log(selectedCategories);

  // fetch('/random', {
  //   method: "POST",
  //   headers:{
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify(selectedCategories),
  // })
  try {
    const response = await fetch('/random', {
      method: "POST",
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(selectedCategories),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    // Redirect to /random after successful response
    window.location.href = "/random";
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
});
//Function for random button
// document.getElementById("random-btn").addEventListener("click", async() => {
//   try {
//     // event.preventDefault();
//     let selectedCategories = [];
//     Array.from(checkboxes).forEach(checkbox => {
//       if (checkbox.classList.contains("active")){
//         selectedCategories.push(checkbox.id);
//       }
//     });
//     console.log(selectedCategories);

//     const response = await fetch('/random', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ selectedCategories: selectedCategories })
//     });

//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }

//     const data = await response.json();
//     console.log('Response from server:', data);
//     Handle response from server as needed

//     Redirect only after successful response
//     window.location.href = "/random";
//     console.log(response);
//     document.body.innerHTML = await response.text();
//     const content = await response;
//     console.log(response);
//   } catch (error) {
//     console.error('There was a problem with the fetch operation:', error);
//   }
// });
