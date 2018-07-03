
const mongoose = require('mongoose');
const logger = require('../logger');

mongoose.Promise = global.Promise;



module.exports.connect = function(url) {
   mongoose.connect(url);

   mongoose.connection
    .then(() => logger.info("Connected"))
    .catch((err) => logger.error(err));
}
