const axios = require('axios');
const apikeys = require('../keys');
const getReviewsController = require('./getReviews')


const getDetailedBusinessData = async (queryparams) => {

    console.log('--------------');
    console.log('Trying to fetch detailed business data');

    try {
        const response = await axios.get(`https://api.yelp.com/v3/businesses/${queryparams.id}`, {
          headers: {
            Authorization: `Bearer ${apikeys.yelpkey}`,
          },
        });
      
        const businessData = response.data;
        console.log(businessData);
        console.log('-----DETAILED DATA FETCHED-----');

        const {
            coordinates,
            price,
            photos,
            hours,
            location: { display_address },
            rating,
            categories,
            review_count,
            name,
            display_phone,
            url
          } = businessData;

        let detailedBusinessData = {
            'coordinates': coordinates,
            'price': price,
            'photos': photos,
            'hours': hours,
            // 'is_open_now': is_open_now,
            'location': display_address,
            'rating': rating,
            'categories': categories,
            'review_count': review_count,
            'name': name,
            'display_phone': display_phone,
            'url': url
        };

        console.log('Detailed Data to be returned: \n', detailedBusinessData, '\n-----------');
        let reviews = [];
        if(detailedBusinessData){
            reviews = await getReviewsController.getLatestReviews(queryparams.id, detailedBusinessData.review_count);
        }


        return { 
            'detailedBusinessData': detailedBusinessData,
            'businessReviews' : reviews
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
    throw error;
    }
};
  
module.exports = {
    getDetailedBusinessData,
};