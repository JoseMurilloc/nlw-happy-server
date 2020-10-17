const multer = require('multer');

const { resolve } = require('path');

const tempFolder = resolve(__dirname, '..', '..', 'tmp')

module.exports = {
  directory: tempFolder,
  storage: multer.diskStorage({
    destination: tempFolder,
    filename: (req, file, callback) => {

      const FileFilename = String(file.originalname);

      const filenameRemoveSpace = FileFilename.replace(/\s/g,'');


      const fileName = `${filenameRemoveSpace}`;

      return callback(null, fileName)
    },
  }),
};
