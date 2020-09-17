require("dotenv").config();
const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client();

client.on('ready', () => {
  console.log('Carmen is ready!');
});
process.on('unhandledRejection', error => console.error('Uncaught Promise Rejection', error));

client.once("reconnecting", () => {
  console.log("Carmen is finding her way back!");
});

client.once("disconnect", () => {
  console.log("Carmen has Disconnected!");
});

fs.readdir("./events/", (err, files) => {
  files.forEach((file) => {
    const eventHandler = require(`./events/${file}`)
    const eventName = file.split(".")[0]
    client.on(eventName, (...args) => eventHandler(client, ...args))
  })
});

client.login(process.env.BOT_TOKEN);