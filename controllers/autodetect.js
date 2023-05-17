const axios = require('axios');
const apikeys = require('../keys')

const getLatLong = async (ip) => {
    if(ip == "::1"){
        ip = "68.181.16.188"; // (3X's) custom location 
    }
    try {
      const response = await axios.get(`https://ipinfo.io/${ip}?token=${apikeys.ipinfokey}`);
      console.log('Making a call to ipinfo: ', `https://ipinfo.io/${ip}?token=${apikeys.ipinfokey}`);
      console.log('Response Data: ', response.data);
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