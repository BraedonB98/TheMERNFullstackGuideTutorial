const axios = require('axios');

const HttpError = require('../models/http-error');

const API_KEY = 'AIzaSyBPojJxRuYT2pPukVDVpg-DO_utm1U9YpI';

async function getCoordsForAddress(address){
    const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${API_KEY}`); //encodeURIComponent removes all white space and weird things about address   ---- await is the same as adding a then bust easier to read

    const data = response.data;

    if (!data|| data.status === 'ZERO_RESULTS'){
        throw NewHttp('Could not find location for the specified address.',422);
    }

    const coordinates = data.results[0].geometry.location;

    return coordinates;
}

module.exports = getCoordsForAddress;