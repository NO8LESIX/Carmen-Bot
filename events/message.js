require("dotenv").config();
const prefix = process.env.prefix;
const kick = require("../commands/kick");
const help = require("../commands/help");
const music = require("../commands/music");
module.exports = (client, message) => {
  if (message.author.id == 753100404534935622){
    return;
  }
  if (message.content.startsWith(prefix)) {
      return music(message);
  }
  else if (
    message.content.includes("<@!753100404534935622>") ||
    message.content.includes("<@&755871336139718768>")
  ) {
    //console.log(message.content);
    msg = message;
    msg.content = msg.content.split(" ").slice(1).join(" ");
    //Gotta be a better way to do this.
    //We are working blind with types here
    switch (msg.content.toLowerCase()) {
      case "":
        return msg.reply("What'cha need hun?");
      case "kick":
        return kick(msg);
      case "help":
        return help(msg);
      case "ping":
        return msg.reply("Pong!");
      case "hello":
        return msg.reply("Hiya!");
      case "are you up?":
        return msg.reply("Yup!");
      case "what are you?":
        return msg.reply("My name is Carmen and I am a Bot! :yum: ");
      default:
        console.log("command not implemented");
        return;
    }
  } //end of check
  else {
      console.log("else" + prefix);
      return;
  }
}; //end of module