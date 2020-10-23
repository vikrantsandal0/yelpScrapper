const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const http = require('http')
const logging = require('./routes/logging');
const redis = require('redis');
require('dotenv').config()
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
global.app = app;

require('./modules/scrapping');

let port = 3013;
var startServer = http.createServer(app).listen(port, () => {
    connectRedis();
    logging.log('into startServer')
});

const connectRedis = ()=> {
        let redis_port = 6379;
        redis_client = redis.createClient(redis_port);
        redis_client.on('connect', function () {
        logging.log('connected to redis');
        });
}

process.on("uncaughtException",(err)=> {
    logging.log("uncaughtException", err);
    startServer.close();
    setTimeout(function () {
        process.exit(0);
    }, 15000);
})