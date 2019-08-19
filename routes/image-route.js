//this is here for now so i don't have to keep dealing with user authentication while testing the upload. also using multer package too so i don't wanna mess w/ ur routes
const multer = require('multer')({ dest: './client/src/public/user/images' });
const db = require("../models");
const path = require('path');

module.exports = app => {
  app.post('/api/images', multer.any(), async (req, res) => {
    //console.log('testing',req.files[0]);
    let fileinfo = req.files[0];
    //console.log(fileinfo);
    //fileinfo.userid = req.params.userid;
    let image = await db.Image.create(fileinfo);

    res.json(image);
    //res.json('success');
  });

  app.get('/api/images', (req, res) => {
    db.Image.findAll({})
      .then(images => {
        res.json(images);
      });
  });

}