const axios = require('axios');
const apikeys = require('../keys');


const fetchMapData =  async function ( latitude, longitude) {
    try {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apikeys.geocodingkey}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching map data:', error);
      throw error;
    }
  }
  
  
module.exports = {
    fetchMapData,
};