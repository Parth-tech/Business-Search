const axios = require('axios');
const apikeys = require('../keys')

const getLatLong = async (address) => {
    let correctedAddress = address.replace(/\s+/g, '+');
    console.log('formatted address: ',correctedAddress);
    try {
        console.log('making geocoding request');
        const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json?address='+correctedAddress+`&key=${apikeys.geocodingkey}`);

        console.log('Response Data: ', response.data);
        let latitude = response.data["results"][0]["geometry"]["location"]["lat"];
        let longitude = response.data["results"][0]["geometry"]["location"]["lng"];
        // const { loc } = response.data;
        // const [latitude, longitude] = loc.split(',');
    
        return { latitude, longitude };
    } catch (error) {
        console.error(error);
        return null;
    }
};
  
module.exports = {
    getLatLong,
};