const kick = require("../commands/kick")
module.exports = (client, message) => {
  if (message.content.startsWith("!kick")) {
    return kick(message)
  }

  if (message.content === "ping") {
    message.reply("Pong!")
  }

  if (message.content === "Hello") {
    message.reply("Hiya!")
  }

  if (message.content === "What are you?") {
    message.reply("My name is Carmen and I am Bot! :yum: ")
  }
}