const axios = require('axios');
const apikeys = require('../keys');
const getReviewsController = require('./getReviews')
const fetchMapDataController = require('./fetchMapData');
const ejs = require('ejs');
const fs = require('fs');
const path = require('path');


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

        const mapData = await fetchMapDataController.fetchMapData(coordinates.latitude, coordinates.longitude);
        // const mapTemplate = fs.readFileSync(path.join(__dirname, '../public/map.ejs'), 'utf8');
        // const renderedMap = ejs.render(mapTemplate, { mapData });

        let formattedDetailedBusinessData = {...detailedBusinessData};
        formattedDetailedBusinessData.location = formattedDetailedBusinessData.location.join('\n');
        
        var titles = formattedDetailedBusinessData.categories.map(function(obj) {
            return obj.title;
        });
          
        var joinedTitles = titles.join(' | ');

        formattedDetailedBusinessData.categories = joinedTitles;

        let twitterURL = "Check " + formattedDetailedBusinessData.name +" on Ticketmaster.\n" +formattedDetailedBusinessData.url;
        twitterURL = `https://twitter.com/intent/tweet?text=${encodeURIComponent(formattedDetailedBusinessData.url)}`;

        formattedDetailedBusinessData = {...formattedDetailedBusinessData,
            'twitterURL' : twitterURL
        }

        const reviewsTemplate = fs.readFileSync(path.join(__dirname, '..', 'views', 'review.ejs'), 'utf8');
        const renderedReviews = ejs.render(reviewsTemplate, { reviews });

        const businessDetailsTemplate = fs.readFileSync(path.join(__dirname, '..', 'views', 'businessDetails.ejs'), 'utf8');
        // const businessDetailsTemplate = fs.readFileSync(path.join(__dirname, '../public/businessDetails.ejs'), 'utf8');
        const renderedBusinessDetailsTemplate = ejs.render(businessDetailsTemplate, { formattedDetailedBusinessData });

        return { 
            'detailedBusinessData': detailedBusinessData,
            'businessReviews' : reviews,
            'mapHTML': mapData,
            'renderedReviews': renderedReviews,
            'renderedBusinessDetailsTemplate': renderedBusinessDetailsTemplate
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