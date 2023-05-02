const dotenv = require("dotenv");
dotenv.config();

// Require Express to run server and routes

const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const cors = require("cors");

// Start up an instance of app

const app = express();

/* Middleware*/

// Cors for cross origin allowance
app.use(cors());
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Initialize the main project folder
app.use(express.static("dist"));

//Geonames API
const baseUrl = "http://api.geonames.org/searchJSON?q=";
const geonamesUser = `&username=${process.env.GEONAMES_USERNAME}`;
const geonamesParams = "&maxRows=1";
// console.log(`Your Geonames API username is ${process.env.GEONAMES_USERNAME}`);
//Weatherbit API
const weatherBitBaseUrl = "https://api.weatherbit.io/v2.0/forecast/daily?";
const weatherBitKey = `&key=${process.env.WEATHERBIT_KEY}`;
// console.log(`Your Weatherbit API KEY is ${process.env.WEATHERBIT_KEY}`);
//Pixabay API
const pixabayBaseUrl = "https://pixabay.com/api/";
const pixabayKey = `?key=${process.env.PIXABAY_KEY}`;
// console.log(`Your Pixabay API KEY is ${process.env.PIXABAY_KEY}`);

//projectData object will store the data from the user input

let projectData = {};

//GET route
app.get("/", function (_req, res) {
  res.sendFile("dist/index.html");
});

//POST route
app.post("/newTripData", async function (req, res) {
  const data = req.body;
  projectData = data;
  console.log(projectData);

  const response = await fetch(
    `${baseUrl}${data.city}${geonamesParams}${geonamesUser}`
  );

  try {
    const geonamesData = await response.json();
    projectData["long"] = geonamesData.geonames[0].lng;
    projectData["lat"] = geonamesData.geonames[0].lat;
    projectData["name"] = geonamesData.geonames[0].name;
    projectData["countryName"] = geonamesData.geonames[0].countryName;
    projectData["code"] = geonamesData.geonames[0].countryCode;
    console.log("projectData : ", projectData);
    res.send(projectData);
  } catch (err) {
    console.log("error", err);
  }
});

//WeatherBit API
app.get("/weatherbit", async function (_req, res) {
  const lat = projectData.lat;
  const long = projectData.long;
  const weatherbitURL = `${weatherBitBaseUrl}lat=${lat}&lon=${long}${weatherBitKey}`;
  // console.log(`Latitude: ${projectData.lat}`);
  // console.log(`Longitude: ${projectData.long}`);
  // console.log(`Weatherbit URL is ${weatherbitURL}`);

  try {
    const response = await fetch(weatherbitURL);
    const weatherbitData = await response.json();

    projectData["icon"] = weatherbitData.data[0].weather.icon;
    projectData["description"] = weatherbitData.data[0].weather.description;
    projectData["temp"] = weatherbitData.data[0].temp;
    console.log(weatherbitData);
    res.send(weatherbitData);
  } catch (error) {
    console.log("weatherbit error", error);
    res.send(null);
  }
});

//Pixabay API

app.get("/pixabay", async function (_req, res) {
  const city = projectData.name;
  const image1 = projectData.image1;
  // console.log(`Pixabay requested city is ${city}`);

  const pixabayUrl = `${pixabayBaseUrl}${pixabayKey}&q=${city}&image_type=photo&orientation=horizontal&safesearch=true&per_page=100`;
  // console.log(`Pixabay URL is ${pixabayUrl}`);
  try {
    const response = await fetch(pixabayUrl);
    const pixabayData = await response.json();
    projectData["image1"] = pixabayData.hits[0].webformatURL;
    image1 = projectData;

    res.send(pixabayData);
  } catch (error) {
    res.send(null);
  }
});

// Rest Countries API

app.get("/restcountries", async function (_req, res) {
  const country = projectData.countryName;
  const restcountriesUrl = `https://restcountries.eu/rest/v2/name/${country}`;
  console.log(`Rest Countries API URL is ${restcountriesUrl}`);
  try {
    const response = await fetch(restcountriesUrl);
    const restcountriesData = await response.json();
    projectData["language"] = restcountriesData[0].languages[0].name;
    projectData["flag"] = restcountriesData[0].flag;
    projectData["currency"] = restcountriesData[0].currencies[0].name;
    res.send(restcountriesData);
    console.log(restcountriesData);
  } catch (error) {
    res.send("rest countries API error");
  }
});

app.get("/getData", async (_req, res) => {
  console.log(projectData);

  res.send(projectData);
});

// Setup Server

app.listen(8081, function () {
  console.log("Example app listening on port 8081!");
});

module.exports = app;
