require("dotenv").config();
const prefix = process.env.prefix;
const kick = require("../commands/kick");
const help = require("../commands/help");
const music = require("../commands/music");
const dnd = require("../commands/dnd");
const dndgen = require("../commands/dndgen");
const dndFunctions = require("../functions/dndFunctions.ts");

module.exports = (client, message) => {
  if (message.author.id == 753100404534935622) {
    return;
  }
  if (message.content.startsWith(prefix)) {
    return music(message);
  } else if (
    message.content.includes("<@!753100404534935622>") ||
    message.content.includes("<@&755871336139718768>") ||
    message.content.includes("<@753100404534935622>")
  ) {
    //console.log(message.content);
    msg = message;
    msg.content = msg.content.split(" ").slice(1).join(" ");
    if (msg.content.toLowerCase().startsWith("roll")) {
      return msg.reply(
        dndFunctions.DiceRoller(msg.content.split(" ").slice(1).join(" ").toLowerCase())
      );
    }
    //Gotta be a better way to do this.
    //We are working blind with types here
    key = msg.content.split(" ").slice(0);

    switch (key[0]) {
      case "":
        return msg.reply("What'cha need hun?");
      case "dnd":
        msg.content = msg.content.split(" ").slice(1).join(" ");
        return dnd(msg);
      case "dndgen":
        return dndgen(msg);
      case "kick":
        return kick(msg);
      case "help":
        return help(msg);
      case "ping":
        return msg.reply("Pong!");
      case "hello":
        return msg.reply("Hiya!");
      case "say":
        return msg.channel.send(`${msg.content.split(" ").slice(1).join(" ")}`);
      case "are you up?":
        return msg.reply("Yup!");
      case "what are you?":
        return msg.reply("My name is Carmen and I am a Bot! :yum: ");
      default:
        console.log("command not implemented");
        return;
    }
  } //end of check
}; //end of module
