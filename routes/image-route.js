//this is here for now so i don't have to keep dealing with user authentication while testing the upload. also using multer package too so i don't wanna mess w/ ur routes
const multer = require('multer')({ dest: 'public/images' });
const db = require("../models");
const path = require('path');

module.exports = app => {
  app.post('/api/:userid/images', multer.any(), async (req, res) => {
    let fileinfo = req.files[0];
    fileinfo.userid = req.params.userid;
    let image = await db.Image.create(fileinfo);

    res.json(image);
    //res.json('success');
  });

  app.get('/api/:userid/images', (req, res) => {
    db.Image.findAll({
      where: { userid: req.params.userid },
      order: [['createdAt', 'DESC']]
    })
      .then(images => {
        res.json(images);
      });
  });
}