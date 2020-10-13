import multer from 'multer';

import { resolve } from 'path';

const tempFolder = resolve(__dirname, '..', '..', 'tmp')

export default {
  directory: tempFolder,
  storage: multer.diskStorage({
    destination: tempFolder,
    filename: (req, file, callback) => {
      const fileName = `${file.filename}`

      return callback(null, fileName)
    },
  }),
};
