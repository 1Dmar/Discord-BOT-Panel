const express = require('express');
const router = express.Router();
const discord = require('../bot')
const passport = require('passport');

router.get('/', (req, res) => {
    res.render('login/login',{
        user:discord.client.user.username,
        avatar: discord.client.user.avatarURL()
    })
})

router.get('/api',(req,res, next)=>{
    passport.authenticate('discord', {
        successRedirect: '/home',
        failureRedirect: '/login',
        failureFlash: true
      })(req, res, next);
})

module.exports = router;
