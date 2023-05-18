const axios = require('axios');
const apikeys = require('../keys');


const getLatestReviews = async (businessId, totalReviewCount) => {
    try {
        const limit = 3; // Number of reviews to fetch per request
        const totalReviewsToFetch = Math.min(totalReviewCount, 10); // Maximum of 25 reviews to fetch
        let offset = 0; // Initial offset value
        let reviews = []; // Array to store the fetched reviews
    
        while (offset < totalReviewsToFetch) {
            const response = await axios.get(`https://api.yelp.com/v3/businesses/${businessId}/reviews`, {
            headers: {
                Authorization: `Bearer ${apikeys.yelpkey}`,
            },
            params: {
                limit,
                offset,
            },
            });
    
            const fetchedReviews = response.data.reviews;
            reviews.push(...fetchedReviews.filter(review => !reviews.find(r => r.id === review.id)));
            offset += limit;
        }
    
        const sortedReviews = reviews.sort((a, b) => {
            if (a.time_created && b.time_created) {
              return new Date(b.time_created) - new Date(a.time_created);
            } else if (!a.time_created && !b.time_created) {
              return 0; // Both time_created values are undefined or null, consider them equal
            } else if (!a.time_created) {
              return -1; // a.time_created is undefined or null, place it after b
            } else {
              return 1; // b.time_created is undefined or null, place it after a
            }
        });
        const latestReviews = sortedReviews.slice(0, totalReviewsToFetch);
    
        return latestReviews;
    } catch (error) {
        // Handle the error
        throw error;
    }
};
  
module.exports = {
    getLatestReviews,
};