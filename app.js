const { json } = require("express");
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html")
});

app.post("/", function(req, res) {
    const query = req.body.cityName;
    const apiKey = "212f4e3d54d243bf380d0a0c0f71114d";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=metric";

    https.get(url, function(response) {
        response.on("data", function(data) {
            const weatherData = JSON.parse(data)
            const temp = Math.floor(weatherData.main.temp)
            const weatherDescription = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png"

            res.write("<h1>The temperature in " + query + " is " + temp + " degrees Celsius.</h1>");
            res.write("<p>The weather is currently " + weatherDescription + "</p>");
            res.write("<img src=" + imageURL + ">");
            res.send()
        })
    })
})



app.listen(3000, function() {
    console.log("Server running on port 3000.");
})