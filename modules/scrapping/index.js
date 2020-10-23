/**
 * Created by vikrant sandal on 09/10/2020.
 */
'use strict';
const validator = require('./validator');
const controller = require('./controller');
const cache = require('./cache');


app.post('/scrapYelp', validator.scrapYelp, cache.scrapYelp ,controller.scrapYelp);