const express = require('express');
const cors = require('cors');
const path = require('path');
// const axios = require('axios');
// const apikeys = require('./keys');
const autoDetectController = require('./controllers/autodetect');
const geocodingController = require('./controllers/geocoding');
const getBusinessesController = require('./controllers/findBusinesses');
const getDetailedBusinessData = require('./controllers/getDetailedBizData');
const getAutoCompleteController = require('./controllers/autocomplete');

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
const port = 3000;

// Define routes
app.get('/findbiz', async (req, res) => {

    const queryParams = req.query;
    console.log('Request Received!');
    console.log('Params:', req.query);
    
    // var userIp = req.ip;

    let userIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    let userLatLong = "";

    // Extract the IP address from the x-forwarded-for header
    if (userIp && userIp.includes(',')) {
        const ipArr = userIp.split(',');
        userIp = ipArr[0].trim();
    }

    // finding location using AUTO-DETECT CONTROLLER
    if(queryParams.autodetect == 'true'){
        console.log('finding location using auto detect');
        userLatLong = await autoDetectController.getLatLong(userIp);
        console.log(userLatLong);
        console.log('auto detect process complete');
    }
    else{
        // finding location using GEOCODING API
        console.log('finding location using geocoding');
        userLatLong = await geocodingController.getLatLong(queryParams.location);
        console.log(userLatLong);
        console.log('geocoding process complete');
    }

    let results = await getBusinessesController.getBusinesses(queryParams, userLatLong);
    console.log('Sending the following result of businesses: ', results);
    res.send(results);

    // res.send('Hello, World!');
});

app.get('/getbizdetails', async(req, res) => {
    
    const queryParams = req.query;
    console.log('Request Received!');
    console.log('Params:', req.query);
    console.log('------------Params End-----------');

    let businessDetails = await getDetailedBusinessData.getDetailedBusinessData(queryParams);
    console.log('|||||||||||||\n', businessDetails);
    res.send(businessDetails);

});

app.get('/autocomplete', async(req, res) => {
    
    const queryParams = req.query;
    console.log('AutoComplete Request Received!');
    console.log('Params:', req.query);
    console.log('------------Params End-----------');

    let autocomplete = await getAutoCompleteController.getAutoComplete(queryParams);
    console.log('+++++++++++\n', autocomplete);
    res.send(autocomplete);

});

app.get('/', (req, res) => {
    const data = {
      title: 'Service Finder',
      // Other data you want to pass to the template
    };
    res.render('homepage', data);
});



// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});