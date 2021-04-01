const Discord = require('discord.js');
const config = require('../config.json');
module.exports = {
  name: "unban",
  description: "supprime un utilisateur du bot, propriétaire uniquement.",
  execute: async(client, message, args, data, db) => {

    let owners = config.OwnerID;

    if (!owners.includes(message.author.id)) return

    let user = client.users.cache.find(user => args.length && message.mentions.users.size < 1 && user.username.toLowerCase().startsWith(args.join(" ").toLowerCase())) || client.users.cache.get(args[0]) || message.mentions.users.first()

    if (user === undefined) return message.channel.send(`**Commande incorrecte** ||Noob Propriétaire||\nUsage: \`${config.prefix}ban [@user/username/userID]\``)

    let embedd = new Discord.MessageEmbed()
    .setTitle('Vous n'êtes pas banni!')
    .setDescription(`<@${message.author.id}> vous interdire! Congo!!`)
    .setThumbnail(user.displayAvatarURL({ format: 'png', dynamic: true }))
    .setFooter(config.EmbedFooter, user.displayAvatarURL({ format: 'png', dynamic: true }))


    if (await db.fetch(`banned_${user.id}`) == true) 
	user.send(embedd)
	message.channel.send('Non banni!')



    let banned = await db.fetch(`banned_${user.id}`)

    if (banned == false) return message.channel.send(`${user.tag} isn't banned. **BRUH** <:MonkaWae:741915455303843871>`)
    db.set(`banned_${user.id}`, false)
    
    let unbannedchannel = client.channels.cache.get(config.logChannel)
    let can = new Discord.MessageEmbed()
    .setTitle('User Unbanned!')
    .setDescription(`User Nom: **${user.username}**\nUser ID: **${user.id}**\nUnbanned by: <@${message.author.id}>`)
    .setFooter(config.EmbedFooter, user.displayAvatarURL({ format: 'png', dynamic: true }))
    .setColor('BLUE')
    .setThumbnail(user.displayAvatarURL({ format: 'png', dynamic: true }))
    unbannedchannel.send(can)
    
    
  }
}
