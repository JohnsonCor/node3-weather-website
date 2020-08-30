// require("dotenv").config();
const request = require("request");

// const GEO_API_KEY = process.env.GEO_API_KEY;
const GEO_API_KEY =
  "pk.eyJ1Ijoiam9obnNvbmNvcmN3dSIsImEiOiJja2VjNjVyb20wNGozMnFzNGUwOHVodGNsIn0.T_IgOxVMGInSR9IkyVN8XA";

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    address +
    ".json?access_token=" +
    GEO_API_KEY +
    "&limit=1";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location services", undefined);
    } else if (body.features === undefined || body.features.length === 0) {
      callback("Unable to find location.  Try another search.", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
