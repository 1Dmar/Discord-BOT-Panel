const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../auth/auth');
const discord = require('../bot')
const dateformat = require('dateformat')
const number = require('easy-number-formatter')
const jsonfile = require('jsonfile')
const config = require("../config.js")
const Discord = require("discord.js")
const { PermissionsBitField, GatewayIntentBits } = require("discord.js")
var theme = config.theme

var channeltypes = {
    GuildText: 0,
    DM: 1,
    GuildVoice: 2,
    GroupDM: 3,
    GuildCategory: 4,
    GuildAnnouncements: 5, // OLD: GuildNews
    AnnouncementThread: 10, // OLD: GuildNewsThread
    PublicThread: 11, // OLD : GuildPublicThread
    PrivateThread: 12, // OLD : GuildPrivateThread
    GuildStageVoice: 13,
    GuildDirectory: 14,
    GuildForum: 15
}

router.get('/channels', ensureAuthenticated, (req, res) => {
    const guildid = req.query.guildid

    if (!guildid) {
        req.flash('error', "No guild id was provided !")
        return res.redirect('/guilds')
    }

    let guild = discord.client.guilds.cache.get(guildid)

    if (!guild) {
        req.flash('error', "The guild id is incorrect !")
        return res.redirect('/guilds')
    }

    const channels = guild.channels.cache
    
    res.render('home/channels',{
        profile:req.user,
        client:discord.client,
        dateformat:dateformat,
        number:number,
        theme:theme,
        config:config,
        guild: guild,
        channels: channels,
        channeltypes: channeltypes
    })
})

router.get('/channel', ensureAuthenticated, (req,res) =>{ 
    const guildid = req.query.guildid
    const channelid = req.query.channelid

    if (!guildid) {
        req.flash('error', "No guild id was provided !")
        return res.redirect('/guilds')
    }

    if (!channelid) {
        req.flash('error', "No channel id was provided !")
        return res.redirect(`/guild?guildid=${guildid}`)
    }

    const guild = discord.client.guilds.cache.get(guildid)

    if (!guild) {
        req.flash('error', "The guild id is incorrect !")
        return res.redirect('/guilds')
    }

    const channel = guild.channels.cache.get(channelid)

    if (!channel) {
        req.flash('error', "The channel id is incorrect !")
        return res.redirect(`/guild?guildid=${guildid}`)
    }

    res.render('home/channel', {
        Permissions: Discord.Permissions,
        profile:req.user,
        client:discord.client,
        dateformat:dateformat,
        number:number,
        theme:theme,
        config:config,
        guild:guild,
        channel: channel
    })
})

module.exports = router;
