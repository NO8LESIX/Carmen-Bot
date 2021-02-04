require("dotenv").config();
const ffmpeg = require("ffmpeg-static");
const prefix = process.env.prefix;
const ytdl = require("ytdl-core");

const queue = new Map();

module.exports = (message) => {
  console.log(message.content);
  if (!message.content.startsWith(prefix)) return;

  let serverQueue = queue.get(message.guild.id);

  //determines the execution method based on !{keyword}
  switch (message.content.split(" ").slice(0)[0]) {
    case `${prefix}play`:
      execute(message, serverQueue);
      return;
    case `${prefix}pause`:
      pause(message, serverQueue);
      return;
    case `${prefix}resume`:
      resume(message, serverQueue);
      return;
    case `${prefix}skip`:
      skip(message, serverQueue);
      return;
    case `${prefix}stop`:
      stop(message, serverQueue);
      return;
    case `${prefix}queue`:
      showQueue(message, serverQueue);
      return;
    default:
      message.channel.send("You need to enter a valid command!");
      return;
  }
};

async function execute(message, serverQueue) {
  const args = message.content.split(" ");

  const voiceChannel = message.member.voice.channel;
  if (!voiceChannel)
    return message.channel.send(
      "You need to be in a voice channel to play music!"
    );
  const permissions = voiceChannel.permissionsFor(message.client.user);
  if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
    return message.channel.send(
      "I need the permissions to join and speak in your voice channel!"
    );
  }
  if (args.length <= 1) {
    return message.channel.send("You need to provide a youtube url");
  }
  const songInfo = await ytdl.getInfo(args[1]);
  const song = {
    title: songInfo.videoDetails.title,
    url: songInfo.videoDetails.video_url,
  };

  if (!serverQueue) {
    const queueContruct = {
      textChannel: message.channel,
      voiceChannel: voiceChannel,
      connection: null,
      songs: [],
      volume: 2,
      playing: true,
    };

    queue.set(message.guild.id, queueContruct);

    queueContruct.songs.push(song);

    try {
      var connection = await voiceChannel.join();
      queueContruct.connection = connection;
      play(message.guild, queueContruct.songs[0]);
    } catch (err) {
      console.log(err);
      queue.delete(message.guild.id);
      return message.channel.send(
        `Uh, oh! We encountered the following issue playing the song: ${err}`
      );
    }
  } else {
    serverQueue.songs.push(song);
    return message.channel.send(
      `**${song.title}** has been added to the queue!`
    );
  }
}

function skip(message, serverQueue) {
  if (!message.member.voice.channel)
    return message.channel.send(
      "You have to be in a voice channel to skip a song!"
    );
  if (serverQueue.songs.length <= 1)
    return message.channel.send("There are no songs in queue to skip");

  serverQueue.songs.shift();
  play(message.guild, serverQueue.songs[0]);
  serverQueue.textChannel.send(
    `Now playing: **${serverQueue.songs[0].title}**`
  );

  return;
}

function stop(message, serverQueue) {
  if (!message.member.voice.channel)
    return message.channel.send(
      "You have to be in a voice channel to stop the music!"
    );
  if (!serverQueue) {
    return message.channel.send("There are no songs in the queue!");
  }
  message.channel.send(`Stopping playback and dumping remaining queue.`);
  serverQueue.voiceChannel.leave();
  queue.delete(message.guild.id);
  return;
}

function showQueue(message, serverQueue) {
  if (serverQueue.songs.length <= 0) {
    return message.channel.send(`The queue is empty!`);
  }

  let songList = ``;
  let songCounter = 1;
  serverQueue.songs.forEach((element) => {
    songList = `${songList}\n\t${songCounter}. ${element.title}`;
    songCounter++;
  });

  return message.channel.send(`Here is the current queue: ${songList}`);
}

function pause(message, serverQueue) {
  if (!message.member.voice.channel)
    return message.channel.send(
      "You have to be in the voice channel to pause the music!"
    );
  if (!serverQueue) {
    return message.channel.send("I can't pause an empty queue!");
  }
  if (!serverQueue.connection.dispatcher.paused) {
    serverQueue.connection.dispatcher.pause();
    return message.channel.send(
      "The stream is paused! Now I can make some tea."
    );
  } else {
    return message.channel.send(
      "Are you smooth? The stream is already paused!"
    );
  }
}

function resume(message, serverQueue) {
  if (!message.member.voice.channel)
    return message.channel.send(
      "You have to be in the voice channel to resume the music!"
    );
  if (!serverQueue) {
    return message.channel.send("I can't resume an empty queue!");
  }
  if (serverQueue.connection.dispatcher.paused) {
    serverQueue.connection.dispatcher.resume();
    return message.channel.send("Restarting the stream!");
  } else {
    return message.channel.send(
      "Are you sure it's not playing already? It is on my end, hun."
    );
  }
}

function play(guild, song) {
  const serverQueue = queue.get(guild.id);
  if (!song) {
    serverQueue.voiceChannel.leave();
    queue.delete(guild.id);
    return;
  }

  const dispatcher = serverQueue.connection
    .play(ytdl(song.url), {
      quality: "highestaudio",
      highWaterMark: 64,
      filter: (format) => format.container === "mp4",
    })
    .on("finish", () => {
      serverQueue.songs.shift();
      play(guild, serverQueue.songs[0]);
    })
    .on("error", (error) => {
      console.error(error);
      serverQueue.textChannel.send(`Stream Error: ${error}`);
    });
  dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
  serverQueue.textChannel.send(`Now playing: **${song.title}**`);
}
