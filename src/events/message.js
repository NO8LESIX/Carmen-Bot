const kick = require("../commands/kick")
module.exports = (client, message) => {
  if (message.content.startsWith("!kick")) {
    return kick(message)
  }
}

client.on("message", (msg) => {
  if (msg.content === "ping") {
    msg.reply("Pong!")
  }
})

client.on("message", (msg) => {
    if (msg.content === "Hello") {
      msg.reply("Hiya!")
    }
})