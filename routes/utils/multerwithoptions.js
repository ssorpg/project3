const path = require('path');

module.exports = require('multer')({
  dest: 'client/build/images',
  limits: {
    fileSize: 3 * 1024 * 1024, // 3MB
    files: 1
  },
  fileFilter: function (req, file, cb) {
    const fileTypes = /jpeg|jpg|png/;
    const mimeType = fileTypes.test(file.mimetype);
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());

    if (mimeType && extName) {
      return cb(null, true);
    }

    cb({ status: 400, msg: 'File upload only supports the following filetypes: .jpeg .jpg .png' });
  }
});
