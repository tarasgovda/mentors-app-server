const dropboxV2Api = require('dropbox-v2-api');
const fs = require('fs');
const logger = require('../logger');

const checkProps =  async function() {
  try {
    fs.accessSync('./config/props.js', fs.constants.F_OK);
    logger.info('props file already exists, no download needed');
  } catch (error) {
      logger.info('no props file, starting download');
      try {
        await downloadProps();
        logger.info('download of props file completed');
      } catch (err) {
        logger.error("error occurred while downloading props file");
        logger.error(err.error_summary);
      }
    }
};



function downloadProps() {
    return new Promise((resolve, reject) => {
      const dropbox = dropboxV2Api.authenticate({
        token: 'J4wKj7c0KUAAAAAAAAAACepCOQnP1nYTmvAF6E0Ym9Olqo5DwuE6peuMkd_dIh_l'
      });

      dropbox({
        resource: 'files/download',
        parameters: {
          path: '/props.js'
        }
      }, (err, result, response) => {
        if(err) {
          reject(err);
        }
        resolve();
      }).pipe(fs.createWriteStream('./config/props.js'));
    }
  );
}

module.exports = async function() {
  logger.info('start');
   await checkProps();
}
