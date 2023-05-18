const axios = require('axios');
const apikeys = require('../keys');


const getBusinesses = async (queryparams, userLatLong) => {

    console.log('--------------');
    console.log('Trying to fetch businesses');

    let categoryValue;
    let businessArray = []

    switch(queryparams.category){
        case "Arts & Entertainment": 
            categoryValue = "arts";
            break;
        case "Health & Medical":
            categoryValue = "health";
            break;
        
        case "Hotels & Travel":
            categoryValue = "hotelstravel";
            break;

        case "Food": 
            categoryValue = "food";
            break;

        case "Professional Services": 
            categoryValue = "professional";
            break;

        default:
            categoryValue = "arts,health,hotelstravel,food,professional";
            break;
    }

    // let url = `https://api.yelp.com/v3/businesses/search?term=${queryparams.keyword}&latitude=${userLatLong.latitude}&longitude=${userLatLong.longitude}&categories=${categoryValue}&radius=${queryparams.distance}`
    try {
        console.log('Yelp Request at: https://api.yelp.com/v3/businesses/search', '\n queryParams received for making request: ',queryparams, '\n userlocation received for request: ', userLatLong);
        console.log('\ncategory Value: ', categoryValue);
        const response = await axios.get('https://api.yelp.com/v3/businesses/search', {
          headers: {
            Authorization: `Bearer ${apikeys.yelpkey}`,
          },
          params: {
            term: queryparams.keyword,
            latitude: userLatLong.latitude,
            longitude: userLatLong.longitude,
            categories: categoryValue,
            radius: Math.min(Math.floor(queryparams.distance * 1609.34), 40000),
          },
        });
        const businesses = response.data.businesses;
        await businesses.forEach(business => {
            const extractedBusinessObject = {
                id: business.id,
                name: business.name,
                rating: business.rating,
                review_count: business.review_count,
                image_url: business.image_url,
                distance: (business.distance*0.000621371).toFixed(1) 
            };
            businessArray.push(extractedBusinessObject);
            console.log('Printint biz names\n',business.name);
        });
        console.log('-------end of biz names-------');
        return businessArray;
    } catch (error) {
    console.error(error);
    throw error; // rethrow the error to be caught by the calling code
    }
};
  
module.exports = {
    getBusinesses,
};