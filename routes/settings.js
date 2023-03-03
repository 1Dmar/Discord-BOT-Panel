const express = require('express');
const router = express.Router();
const discord = require('../bot')
const { ensureAuthenticated, forwardAuthenticated } = require('../auth/auth');
const config = require('../config.json')
const version = config.ver;

json = require('json-update');

const fs = require("fs");

router.get('/settings', ensureAuthenticated,(req, res) => {

  var theme = config.theme
  fs.readdir("./themes/", (err, files) => {
    res.render('home/settings',{
        profile:req.user,
        client:discord.client,
        config:config,
        version:version,
        themeName:files,
        theme:theme,
    })
  })

})

router.post('/settings/config', ensureAuthenticated, (req,res) => {

  json.update('./config.json',{

    clientID: `${req.body.clientID}`,
    secret: `${req.body.secret}`,
    callbackURL: `${req.body.callbackURL}`,
    admins: req.body.admins.split(','),
    token: `${req.body.token}`,
    port: `${req.body.port}`

  }).then(() => { 
        req.flash('success', 'Config Updated please now restart the application!')
        res.redirect('/settings')
    }
  )

})

router.post('/settings/dashboard', ensureAuthenticated, (req,res) =>{

    json.update('./config.json',{
      theme:`${req.body.theme}`
    }).then(() => { 
        req.flash('success', 'Theme Updated!')
        res.redirect('/settings')
    })

})

router.post('/settings/upload/theme', ensureAuthenticated,function(req, res) {
    let sampleFile;
    let uploadPath;
  
    if (!req.files || Object.keys(req.files).length === 0) {
      return req.flash('error', `No file was uploaded, please try again!`), 
      res.redirect('/settings')
    }
    if(!req.files.sampleFile.name.endsWith(".css")){
      return req.flash('error', `Please only upload CSS files!`), 
      res.redirect('/settings')
    }
    const path = './themes/' + req.files.sampleFile.name
    if(fs.existsSync(path)) {
      return req.flash('error', `Theme with that name already exists!`), 
      res.redirect('/settings')
    }

    sampleFile = req.files.sampleFile;
    uploadPath = './themes/' + sampleFile.name;
  
    sampleFile.mv(uploadPath, function(err) {
      
      if (err) return res.status(500).send(err);
  
      req.flash('success', `Theme ${sampleFile.name} successfully uploaded!`)
      res.redirect('/settings')
    });
});
  
module.exports = router;
