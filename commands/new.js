require("dotenv").config();
const ffmpeg = require("ffmpeg-static")
const prefix = process.env.prefix;
const ytdl = require("ytdl-core");
const music = require("./music");

module.exports = (message) => {
    key = message.content.split(" ").slice(1)
    console.log(key)
    message.content = message.content.split(" ").slice(1).join(" ")
    console.log(message.content)
    switch(key){
        case "playlist":
            console.log("playlist")
            message.channel.send("Generating Playlist")
            return music(message)
        default:
            return;
    }    
};