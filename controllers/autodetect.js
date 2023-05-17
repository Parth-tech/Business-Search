const axios = require('axios');
const apikeys = require('../keys')

const getLatLong = async (ip) => {
    try {
      const response = await axios.get(`https://ipinfo.io/${ip}?token=${apikeys.ipinfokey}`);
      const { loc } = response.data;
      const [latitude, longitude] = loc.split(',');
  
      return { latitude, longitude };
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  
  module.exports = {
    getLatLong,
  };