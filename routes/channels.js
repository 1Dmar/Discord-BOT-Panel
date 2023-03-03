const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../auth/auth');
const discord = require('../bot')
const dateformat = require('dateformat')
const number = require('easy-number-formatter')
const jsonfile = require('jsonfile')
const config = require("../config.json")
const Discord = require("discord.js")
const { PermissionsBitField, GatewayIntentBits } = require("discord.js")
const transcript = require('discord-html-transcripts')
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
    const action = req.query.action

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

    if (action === "view") {
        const file = transcript.createTranscript(channel)
        file.then((file) => {
            const utf16Decoder = new TextDecoder('UTF-8')
            res.send(utf16Decoder.decode(file.attachment))
        })
    }

    if (action === "send") {
        res.render('home/sendmsg', {
            profile:req.user,
            client:discord.client,
            dateformat:dateformat,
            number:number,
            theme:theme,
            config:config,
            guild:guild,
            channel: channel,
            channeltypes: channeltypes
        })
    }

    if (!action) {
        res.render('home/channel', {
            Permissions: Discord.Permissions,
            profile:req.user,
            client:discord.client,
            dateformat:dateformat,
            number:number,
            theme:theme,
            config:config,
            guild:guild,
            channel: channel,
            channeltypes: channeltypes
        })
    }
})

router.post('/guild/:gid/channel/:cid/delete', ensureAuthenticated, (req, res) => {
    const guildid = req.params.gid
    const channelid = req.params.cid

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

    try {
        channel.delete()
    } catch (error) {
        req.flash('error', `An error occured while deleting this channel. Error : \n ${error}`)
        return res.redirect(`/channel?guildid=${guildid}&channelid=${channelid}`)
    }

    req.flash('success', `Successfully deleted channel "${channel.name}" !`)
    return res.redirect(`/channels?guildid=${guildid}`)

})

module.exports = router;
