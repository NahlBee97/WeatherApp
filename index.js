import express from "express";
import axios from "axios";
import bodyParser from "body-parser"

const app = express();
const port = 3000;
const apiKey = "4206c8e4348ea76d83bf2880c63ff0c6";
const API_URL = "https://api.openweathermap.org/data/2.5/weather";

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req,res) => {
    res.render("index.ejs");
});

app.post("/", async (req,res) => {
    const latlon = req.body.latlon;
    const lat = latlon.split(",")[0];
    const lon = latlon.split(",")[1];
    try {
        const response = await axios.get(API_URL, {
            params: {
                lat: lat,
                lon: lon,
                appid: apiKey,
                units: "metric"
            }
        });
        const data = JSON.parse(JSON.stringify(response.data));
        console.log(data);
        res.render("index.ejs", {
            data: data,
            icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
        });
    } catch (error) {
        console.log(error);
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});