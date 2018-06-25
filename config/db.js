
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://root:mentorsapppass1@ds247410.mlab.com:47410/mentorsapp');

module.exports.connect = function() {
   mongoose.connection
  .then(() => console.log("Connected"))
  .catch((err) => console.console.error(err));
}
