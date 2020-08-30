require("dotenv").config();
const request = require("request");

// const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const WEATHER_API_KEY = ab4bb12db7014af34d69c8fd49d08cc0;

const forcast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=" +
    WEATHER_API_KEY +
    "&query=" +
    latitude +
    "," +
    longitude +
    "&units=f";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location services", undefined);
    } else if (body.error) {
      callback("unable to find location.", undefined);
    } else {
      callback(undefined, {
        description: body.current.weather_descriptions[0],
        current: body.current.temperature,
        feelsLike: body.current.feelslike,
      });
    }
  });
};

module.exports = forcast;
