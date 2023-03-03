<h1 align="center">
    <br>
    <p>Discord BOT Dashboard - V2</p>


By [GameCreep35#1564](https://discord.com/users/696753471650660412)

[![Github all releases](https://img.shields.io/github/downloads/iGameCreep/Discord-BOT-Panel/total.svg?style=for-the-badge)](https://GitHub.com/iGameCreep/Discord-BOT-Panel/releases/) [![GitHub release](https://img.shields.io/github/release/iGameCreep/Discord-BOT-Panel.svg?style=for-the-badge)](https://GitHub.com/LachlanDev/Discord-BOT-Dashboard-V2/releases/) [![GitHub issues](https://img.shields.io/github/issues/iGameCreep/Discord-BOT-Panel.svg?style=for-the-badge)](https://GitHub.com/iGameCreep/Discord-BOT-Panel/issues/) [![DiscordServer](https://img.shields.io/discord/1074809741114609694?label=Discord%20Server&logo=Discord&colorB=5865F2&style=for-the-badge&logoColor=white)](https://discord.gg/36HFNV5ZwG)

</h1>

# 📚 About
Discord BOT Panel is made with the style of <a href="https://github.com/LachlanDev/Discord-BOT-Dashboard-V2" target="_blank">Discord BOT Dashboard V2</a>, a dashboard to manage your discord bot. A part of the files in this project are similar / are from this dashboard.
Discord BOT Panel has been made for users to use your bot like your actual account **easily**.

## 🚀 Installation / Setup

#### ⌚ Installing Requirements
Download the latest version from [Releases](https://github.com/iGameCreep/Discord-BOT-Panel/releases), open up the root directory and run the following command.
```bash
npm install
```

#### 🖥️ Setting up BOT
Rename ``config.default.js`` to ``config.js`` and open up the file, then input the required fields. 
```js
module.exports = {
    token: "",
    clientID: "",
    secret: "",
    admins: ["696753471650660412"],
    port: "3000",
    session: "",
    theme: "default.css",
    ver: "1",
    callbackURL: "http://localhost:3000/login/api"
}
```

**Token** : Your bot token. Can be found in the [Discord Developer Portal](https://discord.com/developers/applications), on the page of your application.

**ClientID** : Your bot ID. In your discord settings, go to Advanced, and enable Developer Mode. Then, right-click on your bot profile and click **Copy ID**.

**Secret** : Your bot secret. Can be found in the [Discord Developer Portal](https://discord.com/developers/applications), on the page of your application.

**Admins** : The IDs of the users that are allowed to connect. You can put your ID that can be found the same way that with your bot ID, but you have to click on your profile.

**Port** : The port the server will be running on. Default is set to 3000.

**Domain** : The domain / IP you are running the panel on. If you are running it on your PC, you can let it like this.

**Session** : 32 random characters, with numbers and lowercase letters.

**Theme** : The basic theme for the panel. You can let it like this.

**Ver** : The version of the Panel. Right now, it's on v1, so don't change it.

**Callback URL** : The callback URL. Should be *http://DOMAIN:PORT/login/api*

Make sure to enable both "Privileged Gateway Intents" and to add as a **Redirect** the Callback URL ( replace DOMAIN with your domain / IP and PORT with the port you're running on. If you didn't edited domain and port in config, enter *"http://localhost:3000/login/api"* ) on the [**Discord Developer Portal**](https://discord.com/developers).

#### 📡 Starting the application 
Open up the root directory and run the following command.
```bash
node main.js
```
You should now be able to access the dashboard at **http://localhost:3000** or on **http://DOMAIN:PORT** ( replacing DOMAIN with your domain / IP and PORT with the port the one in the config ).

## 🧰 Features
A list of some of the features that are included in Discord BOT Panel
* 🔐 **Authentication** - Discord BOT Panel is locked with a secure authentication method that only allows users who are added into the config file to access the dashboard.
* 💎 **Modern UI** - Discord BOT Panel is built with a modern UI to ensure its ease of use for anyone.
* 🖥️ **Open Source** - Discord BOT Panel is an open source project meaning anyone can contribute to make it even better.
* 🔌 **Stability** - Running your application using Discord BOT Panel ensures that it is stable and you wont have any errors.
* ⛏️ **Multiple Tools** - Discord BOT Panel is packed with multiple tools that are easy to use.

## 💡 Contribute
If you would like to contribute to the project please open a PR (Pull Request) clearly showing your changes.

## 🔒 Requirements
* [Node.JS](https://nodejs.org/en/) (v12.3.1 or later)

## 📞 Issues
If you have any issues feel free to open an issue or join the [Discord Server.](https://discord.com/invite/36HFNV5ZwG)

## 🧲 Extra
__Created by GameCreep35#1564__
* [Discord Server](https://discord.com/invite/36HFNV5ZwG)
* This file is just the README.md of [LachlanDev's Discord-BOT-Dashboard V2](https://github.com/LachlanDev/Discord-BOT-Dashboard-V2/blob/main/README.md) edited.
* The copyright on the footer of each pages isn't removed yet, i'll remove it soon.
* Credits to [**LachlanDev#8094**](https://discord.com/invite/w7B5nKB) for the theme and the main files I took for this project.
</br>
