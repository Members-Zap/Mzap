const Discord = require('discord.js')
const config = require("../config.json")
module.exports = {
  execute: async(client, guild, message) => {
  
    let channel = client.channels.cache.get(config.logChannel)
  
    const embed = new Discord.MessageEmbed()
    .setTitle(`Nouveau serveur!`)
    .setColor(`#19ec1d`)
    .setDescription(`Nom & Id: **${guild.name}(\`${guild.id})\`**\nTotal Users: **${guild.memberCount}**\nOwner: **${guild.owner.user.tag}(\`${guild.owner.id}\`)**`)
    .setThumbnail(guild.iconURL());
     if (channel) channel.send(embed);
    
  } 
}
