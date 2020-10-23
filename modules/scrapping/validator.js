const apiReferenceModule = 'yelpScrapper';
const Joi = require('joi');
const common = require('../../routes/commonfunction');
const logging = require('../../routes/logging');

const scrapYelp = (req, res, next) => {
    logging.log('inside validator-->', req.body);
    const schema = Joi.object().keys({
        term: Joi.string().required(),
        location: Joi.string().required(),
        sort_by : Joi.string().optional()
    });
    if (common.validateFields(req.body, res, schema)) {
        req.apiReference = {
            module: apiReferenceModule,
            api: "scrapYelp"
        };
        req.body.lang = req.headers['content-language'] || 'en';
        next()
    }
};

exports.scrapYelp = scrapYelp;