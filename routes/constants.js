exports.yelpCreds = {
  BASE_URL : 'https://api.yelp.com/v3/',
  API_KEY: process.env.API_KEY,
  BUSINESS_SEARCH  : 'businesses/search',
  BUSINESS_REVIEW : `businesses/{id}/reviews`
};