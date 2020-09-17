const kick = require("../commands/kick");
const help = require("../commands/help");
module.exports = (client, message) => {
  //did Carmen write the message?
  if (message.author.bot) return;
  //was Carmen mentioned?
  if (
    message.content.includes("<@!753100404534935622>") ||
    message.content.includes("<@&755871336139718768>")
  ) {
    msg = message.content.split(" ").slice(1).join(" ");
    //console.log(msg);
    //Gotta be a better way to do this.
    //We are working blind with types here
    switch (msg.toLowerCase()) {
      case "":
        return;
      case "!kick":
        return kick(message);
      case "!help":
        return help(message);
      case "ping":
        return message.reply("Pong!");
      case "hello":
        return message.reply("Hiya!");
      case "are you up?":
        return message.reply("Yup!");
      case "what are you?":
        return message.reply("My name is Carmen and I am a Bot! :yum: ");
      default:
        console.log("command not implemented");
        return;
    }
  } //end of check
  else {
    return;
  }
}; //end of module