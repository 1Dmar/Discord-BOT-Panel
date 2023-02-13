const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../auth/auth');
const discord = require('../bot')
const dateformat = require('dateformat')
const number = require('easy-number-formatter')
const config = require("../config.js")
const Discord = require("discord.js")
const { PermissionsBitField, GatewayIntentBits } = require("discord.js")
var theme = config.theme

router.post('/sendmessage', ensureAuthenticated, (req, res) => {
    const guildid = req.query.guildid
    const channelid = req.query.channelid
    const message = req.body.message

    if (!guildid) {
        req.flash('error', "No guild id was provided !")
        return res.redirect('/guilds')
    }

    let guild = discord.client.guilds.cache.get(guildid)

    if (!guild) {
        req.flash('error', "The guild id is incorrect !")
        return res.redirect('/guilds')
    }

    const channel = guild.channels.cache.get(channelid)

    if (!channel) {
        req.flash('error', "The channel id is incorrect !")
        return res.redirect(`/guild?guildid=${guildid}`)
    }

    if (!message) {
        req.flash('error', `The message isn't valid ! Make sure to send a valid message.`)
        return res.redirect(`/guild?guildid=${guildid}&channelid=${channelid}&action=send`)
    }
    
    console.log(req.body)
})

module.exports = router;
