# Business-Search
This application help users find businesses in their vicinity

## Application Hightlights:
1. Customized search helps you find businesses as per you needs
2. Responsive Web Application
3. Show's up-to-date information as per the Yelp API

## Technologies Employed:
1. Front-end: HTML, CSS, BootStrap, Vanilla JS
2. Back-end: Node.js, Express.js, EJS, Jest
3. API: Yelp API, Google's GeoCoding API, IPinfo API 

## Usage:
1. Clone & install the required dependencies
2. Set up keys.js with Yelp API key, IPinfo API key & Google API key (with Google Maps JavaScript API & Geocoding API enabled)
3. Inside ***autodetect.js*** set *[ip=Your_IP_Address]* as request's to locally hosted server have *IP=[::1]*

## Testing: 
Run `npx jest getAutoComplete.test.js` to run the Jest test case on getAutoComplete.js
