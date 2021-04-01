const Discord = require("discord.js");
const ms = require("parse-ms");
const config = require("../config.json");
module.exports = {
  name: "stats",
  aliases: ["stats"],
  description: "",
  execute: async (client, message, args, data, db) => {
    let owners = config.OwnerID;

    

    let uptime = [];

    Object.entries(ms(client.uptime)).map((x, y) => {
      if (x[1] > 0 && y < 4) uptime.push(`**${x[1]} ${x[0]}**`);
    });

    const embed = new Discord.MessageEmbed()
      .setColor(`RANDOM`)
      .setTitle(`${client.user.username} stats`)
      .setThumbnail(client.user.displayAvatarURL())
      .addField(
        `📂Mémoire Usage:`,
        (process.memoryUsage().rss / 1024 / 1024).toFixed(2) + "MB",
        false
      )
      .addField(`🏘Nombre de serveurs:`, `${client.guilds.cache.size}`, false)
      .addField(`👥Nombre d'utilisateurs:`, `${client.users.cache.size}`, false)
      .addField(`Fragments:`, `1`, false)
      .addField(`🗓 Date de création -`, `29 Mars 2021`, false)
      .addField(`<a:wumpus_keyboard:807949412105191464> Fabriqué avec :`, `Node.js V12 et SQ Lite DataBase et votre amour`, false)
      .addField(`:tools: Le développeurs de ce bot -`, `Jules Z YTB`, false)
      .addField(`⚙➡Prefix : `, `+`, false)
      .addField(`:chart_with_upwards_trend:Uptime:`, uptime.join(", "), false)
      .addField(`🤖INVITE ME`,`[ADD ME](https://discord.com/oauth2/authorize?client_id=${client.user.ID}&permissions=93185&scope=bot)`)
      .addField(`:pushpin:Support Serveur`,`[Support Serveur](${config.supportServer})`);
    message.channel.send(embed);
  }
};
