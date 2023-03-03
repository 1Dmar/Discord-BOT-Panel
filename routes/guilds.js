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
var theme = config.theme

router.get('/guilds', ensureAuthenticated, (req, res) =>{
    let guilds = discord.client.guilds.cache
    
    res.render('home/guilds',{
        Permissions: Discord.Permissions,
        PermissionsBitField : PermissionsBitField,
        manage : PermissionsBitField.Flags.ManageGuild,
        guilds:guilds,
        profile:req.user,
        client:discord.client,
        dateformat:dateformat,
        number:number,
        theme:theme,
        config:config,
    })
})

router.get('/guild', ensureAuthenticated, (req,res) =>{ 
    const guildid = req.query.guildid

    if (!guildid) {
        req.flash('error', "No guild id was provided !")
        return res.redirect('/guilds')
    }

    const guild = discord.client.guilds.cache.get(guildid)

    if (!guild) {
        req.flash('error', "The guild id is incorrect !")
        return res.redirect('/guilds')
    }

    res.render('home/guild', {
        Permissions: Discord.Permissions,
        profile:req.user,
        client:discord.client,
        dateformat:dateformat,
        number:number,
        theme:theme,
        config:config,
        id:guildid,
        guild:guild,
    })
})

router.get("/addbot", ensureAuthenticated,(req,res) =>{ 
    let id = req.query.id

    if (!id) {
        req.flash('error', "No id was provided !")
        return res.redirect('/guilds')
    }

    let u_guilds = req.user.guilds
    let bot_id = config.clientID

    u_guilds.forEach((guild) => {
        if (guild.id !== id) return
        res.render('home/addbot',{
            Permissions: PermissionsBitField,
            profile:req.user,
            client:discord.client,
            dateformat:dateformat,
            number:number,
            theme:theme,
            config:config,
            id:req.params.id,
            guild:guild,
            id: id,
            u_guilds: u_guilds,
            bot_id: bot_id,
        })
    })
})

router.post('/guilds/leave/:id', ensureAuthenticated,(req,res) =>{
    discord.client.guilds.cache.get(req.params.id).leave().then(value => {
        req.flash('success', `Succesfully left guild "${value.name}"`)
        res.redirect('/guilds')
    })
})

module.exports = router;
