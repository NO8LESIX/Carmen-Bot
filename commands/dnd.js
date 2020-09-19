const Discord = require("discord.js");

module.exports = (message) => {
  message.channel.send("Start ***New*** or ***Continue***?");
  const collector = new Discord.MessageCollector(
    message.channel,
    (m) => m.author.id === message.author.id,
    { time: 10000 }
  );
  //console.log(collector);
  collector.on("collect", (message) => {
    if (message.content == "New") {
      message.channel.send("Time to start a new tale!");
    } else if (message.content == "Continue") {
      message.channel.send("From what tale are we reading from today?");
    }
  });
  
  return;
};
