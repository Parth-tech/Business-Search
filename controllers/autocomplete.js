const axios = require('axios');
const apikeys = require('../keys');


const getAutoComplete = async (queryparams) => {

    console.log('--------------');
    console.log('Trying to fetch detailed business data');

    try {
        const response = await axios.get(`https://api.yelp.com/v3/autocomplete?text=${queryparams.keyword}`, {
          headers: {
            Authorization: `Bearer ${apikeys.yelpkey}`,
          },
        });
      
        let autocomplete = response.data; 
        if(autocomplete!=null || autocomplete!= undefined){
            autocomplete = autocomplete.terms;
        }

        // console.log();

        return {
            'autocomplete':autocomplete
        };
    } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
        const { code, description } = error.response.data.error;
        // console.log('Error Code:', code);
        // console.log('Error Description:', description);
    } else {
        // console.log('Error:', error.message);
        // console.log('Error Stack:', error.stack);
    }
    return {
        'autocomplete':[]
    };
    // throw error;
    }
};
  
module.exports = {
    getAutoComplete,
};