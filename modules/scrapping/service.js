const Promise = require('bluebird');
const moment = require('moment');
const _ = require('underscore');
const axios = require('axios');
const logging = require('../../routes/logging');
const constants = require('../../routes/constants');
const common = require('../../routes/commonfunction');


const getAxiosInstance = () => {
  return axios.create({
    method: 'get',
    baseURL: constants.yelpCreds.BASE_URL,
    headers: {
      Authorization: `Bearer ${constants.yelpCreds.API_KEY}`,
      "Content-type": "application/json"
    }
  })
}


const findBusinesses = (params) => {
  return Promise.coroutine(function* () {
    let axiosInstance = getAxiosInstance()
    logging.log('find business', params);
    let result = yield axiosInstance(constants.yelpCreds.BUSINESS_SEARCH, { params });
    if (result.status != 200) throw 'no data found'
    let { businesses } = result.data
    return businesses
  })()
}

const findBusinessesReviews = (payload) => {
    return Promise.coroutine(function* () {
      let axiosInstance = getAxiosInstance();
      let endpoint = constants.yelpCreds.BUSINESS_REVIEW.replace('{id}', payload.businessId);
      let result = yield axiosInstance(endpoint);
      if (result.status != 200) return { businessId: payload.businessId, reviews: [] };
      let { reviews } = result.data;
      return { businessId: payload.businessId, reviews }
    })()
}

const prepareFinalResult = (allBusiness, allReviews) => {
  let reviewHashmap = common.createHashMap('businessId', allReviews), finalResultArr = [];
  for (let business of allBusiness) {
     _.extend(business, { review: '', user: '', userImage: '' });
    if (reviewHashmap[business.id]) {
      let revArr = reviewHashmap[business.id].reviews;
      if (!_.isEmpty(revArr)) {
        _.extend(business, { review: revArr[0].text, user: revArr[0].user.name, userImage: revArr[0].user.profile_url });
      }
    }
    finalResultArr.push({
      business_name: business.name, business_image : business.image_url ,rating: business.rating, address: business.location['address1'], excerpt: business.review
      , reviewer_name: business.user, reviewer_image: business.userImage
    })

  }
  logging.log('final result array----->>', finalResultArr);
  return finalResultArr

}
exports.findBusinesses = findBusinesses;
exports.findBusinessesReviews = findBusinessesReviews;
exports.prepareFinalResult = prepareFinalResult;