const common = require('../../routes/commonfunction');
const logging = require('../../routes/logging');

const scrapYelp = (req, res, next) => {
  let key = `yelp-${req.body.term}-${req.body.location}-${req.body.sort_by || 'best_match'}`
  common.getDataFromRedis(req.body.apiReference, "GETTING DATA FROM REDIS", key)
    .then(data => {
      logging.log('cache data--->', data);
      if (data && data.length > 0) {
        try {
          data = JSON.parse(data);
          let response = {
            "message": 'Successful',
            "status": 200, data
          }
          res.send(JSON.stringify(response));
        }
        catch (err) {
          logging.log('error in parsing data---->', err);
          next()
        }
      } else {
        next()
      }

    })

};

exports.scrapYelp = scrapYelp;