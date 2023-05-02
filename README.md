Weather Journal App

HTML, CSS, JS and Webpack were used to create this project.

Objective

Creating an app that uses several APIs to get weather based on the data provided by the user (in this case destination of the trip and date), and dynamically update UI.

Development Strategy

1. Setting up project environment, installing Node and other packages and requiring them in index.js file.
2. Adding a POST and a GET routes.
3. Obtaining API credentials from weatherBit, pixaBay and restCountries.
4. Creating async functions to fetch data and store it on the local server.
5. Creating a function to update UI dynamically.
6. Creating logic for a modal that will pop up once the button is clicked and that will be populated with the data requested by the user once the UI is updated.

In terms of design of this app i decided to keep it as simple and clean as possible. Basically the html consists in a form where the user will type the city where he/she wants to travel to and also the user will pick the date of trip from a calender. After that there is a button to submit the form.
Once the form is submitted a modal will pop up. This modal will be updated with the data of the trip according to the data introduced by the user.
