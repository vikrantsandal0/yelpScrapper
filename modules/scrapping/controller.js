const Promise = require('bluebird');
const _ = require('underscore');
const scrapper = require('./service');
const logging = require('../../routes/logging');
const common = require('../../routes/commonfunction');
const responses = require('../../routes/response');

const scrapYelp = (req,res) => {
    Promise.coroutine(function* () {
      let { term, location, sort_by = 'best_match', limit = 10 } = req.body, tasks = [],allReviews = [];
      let allBusiness = yield scrapper.findBusinesses({ term, location, sort_by, limit });
      if(_.isEmpty(allBusiness)) return {}
      let businessIds = _.pluck(allBusiness, 'id');
      logging.log('all buisness ids---->', businessIds);
      for (let id of businessIds) {
        tasks.push(scrapper.findBusinessesReviews({ businessId: id }));
        if (tasks.length > 5) {
          allReviews = yield Promise.all(tasks);
          tasks = [];
        }
      }
      if (tasks.length !== 0) allReviews = [...allReviews,...yield Promise.all(tasks)];
      logging.log('all reviews---->>>', JSON.stringify(allReviews));
      let finalResult = scrapper.prepareFinalResult(allBusiness, allReviews);
      yield common.setDataInRedis(req.apiReference, 'SETTING DATA INTO REDIS', `yelp-${term}-${location}-${sort_by}`,finalResult, 3600);
      return { data : finalResult }
    })().then((result) => {
      return responses.sendResponse(res, result.msg, result.status, result.data);
    }, (error) => {
      logging.log2(req.apiReference, { error, DATA: {} });
      return responses.sendError(res);
    });
}

exports.scrapYelp = scrapYelp