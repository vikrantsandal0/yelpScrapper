const Joi = require('joi');
const logging = require('./logging');
const _ = require('underscore');
const constants = require('./constants');

const validateFields = (req, res, schema)=> {
  const validation = Joi.validate(req, schema);
  if (validation.error) {
    let errorName = validation.error.name;
    let errorReason = validation.error.details !== undefined ? validation.error.details[0].message : 'Parameter missing or parameter type is wrong';
    let response = {
      "message": 'Insufficient information was supplied. Please check and try again',
      "status": 100,
      "data": {}
    };
    logging.log("validateFields", errorReason)
    res.send(JSON.stringify(response));
    return false;
  }
  return true;
};
const createHashMap = (uniqueKey, array)=>{
  const hashObject = {};
  array.forEach(elem => {
    hashObject[elem[uniqueKey]] = elem;
  });
  return hashObject;
}
const setDataInRedis = (apiReference, event, key, value, expireSeconds) => {
  return new Promise((resolve, reject) => {
      try {
          if (!apiReference) {
              apiReference = {
                  module: "databaseService",
                  api: "setDataInRedis"
              }
          }
          logging.log2(apiReference, {
              EVENT: event,
              KEY: key,
              value
          });
          redis_client.set(key, JSON.stringify(value));
          redis_client.expire(key, expireSeconds);
          return resolve();
      } catch (e) {
          return resolve();
      }
  });
}
const getDataFromRedis = (apiReference, event, key) => {
  return new Promise((resolve, reject) => {
      try {
          if (!apiReference) {
              apiReference = {
                  module: "databaseService",
                  api: "getDataFromRedis"
              }
          }
          redis_client.get(key, function (error, data) {
              if (error) {
                  return resolve("");
              } else {
                  try {
                      logging.log2(apiReference, {
                          EVENT: event,
                          KEY: key,
                          LENGTH: JSON.parse(data).length
                      });
                      return resolve(data);
                  } catch (e) {
                      return resolve("");
                  }
              }
          })
      } catch (e) {
          return resolve("");
      }
  });
}


exports.validateFields = validateFields;
exports.createHashMap = createHashMap;
exports.setDataInRedis = setDataInRedis;
exports.getDataFromRedis = getDataFromRedis;