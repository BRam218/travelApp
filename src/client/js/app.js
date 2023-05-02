import fetch from "node-fetch";

// Event listener

// document.getElementById("submit").addEventListener("click", handleSubmit);

// Function called by Event listener

async function handleSubmit(e) {
  e.preventDefault();
  // Our handleSubmit function first will take the data entered by the user, city and the starting date of the trip.
  let city = document.getElementById("input-city").value;
  let startDate = document.getElementById("input-start-date").value;

  if (city != 0) {
    await postData("http://localhost:8080/newTripData", {
      city: city,
      date: startDate,
    });

    //Restcountries API
    await callServer("http://localhost:8080/restcountries");

    //Weatherbit API
    await callServer("http://localhost:8080/weatherbit");

    //Pixabay API
    await callServer("http://localhost:8080/pixabay");

    await callServer("http://localhost:8080/getData");

    updateUI();
  } else {
    alert("Not valid data entered. Please enter valid data");
  }
}

// Modal which will contain the details of the trip as per the data from the user.

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.querySelector(".modal");
  const overlay = document.querySelector(".overlay");
  const btnCloseModal = document.querySelector(".close-modal");
  const btnsOpenModal = document.querySelector(".show-modal");
  const closeModal = function () {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
  };
  const openModal = function () {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
  };
  btnsOpenModal.addEventListener("click", openModal);
  btnCloseModal.addEventListener("click", closeModal);
  overlay.addEventListener("click", closeModal);
  document.addEventListener("keydown", function (event) {
    console.log(event.key);
    if (event.key === "Escape" && !modal.classList.contains("hidden")) {
      closeModal();
    }
  });
});

// Update User Interface. This function will update the UI on the modal implemented once the user clicks the button.

async function updateUI() {
  const response = await fetch("http://localhost:8080/getData");
  const clientData = await response.json();
  console.log(clientData);
  document.querySelector(".city-image").src = clientData.image1;
  document.querySelector(".icon").src = clientData.flag;
  document.querySelector(".city-name").innerHTML =
    "Your destination : " +
    clientData.name +
    " " +
    "(" +
    clientData.countryName +
    ")";
  document.querySelector(
    ".icon"
  ).src = `https://www.weatherbit.io/static/img/icons/${clientData.icon}.png`;
  document.querySelector(".description").innerHTML = clientData.description;
  document.querySelector(".temperature").innerHTML = clientData.temp + "°C";
  document.querySelector(".departure").innerHTML =
    "Departure date: " + clientData.date;
}

// call to server for data
const callServer = async (url) => {
  const asyncParams = {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = await fetch(url, asyncParams);
  try {
    const data = await res.json();
    return data;
  } catch {
    console.log(`Error: ${res.statusText}`);
  }
};

// POST route for our server

async function postData(url, data) {
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export { handleSubmit };
export { callServer };
export { updateUI };
