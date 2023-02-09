const express = require('express');
const router = express.Router();
const discord = require('../bot')
const { ensureAuthenticated, forwardAuthenticated } = require('../auth/auth');
const dateformat = require('dateformat');
const config = require('../config.js')
const ver = config.ver

const number = require('easy-number-formatter')
var request = require("request");
const jsonfile = require('jsonfile')

router.get('/', ensureAuthenticated,(req,res) =>{
    res.redirect('/home')
})

router.get('/home', ensureAuthenticated,(req, res) => {
  var theme = config.theme
    var options = {
        method: 'GET',
        url: `https://raw.githubusercontent.com/LachlanDev/Discord-BOT-Dashboard-V2/main/src/config/version.json`,
        headers: {
          'User-Agent': 'Discord-Bot-Dashboard',
          useQueryString: true
        }
      }
      // Prase update request data to JSON.
      request(options, function (error, response, body) {
        try 
        {
          jsonprased = JSON.parse(body)
          verL = jsonprased.ver
        } 
        catch (e) 
        {
          console.log("Failed to check for updates you may continue using this version, please try again or contact LachlanDev#8014")
          verL = ver.ver
        }
    res.render('home/home',{
        profile:req.user,
        client:discord.client,
        joinedDate:dateformat(`${discord.client.user.createdAt}`, 'dddd, mmmm dS, yyyy, h:MM TT'),
        prefix:config.prefix,
        number:number,
        Latestversion:verL,
        Currentversion:ver.ver,
        theme:theme,
        config: config
    })
    })
})

// Logout
router.get('/logout', (req, res, next) => {
    req.logout(function(err) {
        if (err) return next(err)
    });
    req.flash('success', 'Logged out');
    res.redirect('/login');
  });
  
module.exports = router;