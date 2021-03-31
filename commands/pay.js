const Discord = require('discord.js');
const { get } = require('../constructors/sqlite.js');
const config = require('../config.json');
module.exports = {
  name: "pay",
  aliases: ["pay"],
  description: "utilisé pour payer des pièces à l'utilisateur mentionné.",
  execute: async(client, message, args, data, db) => {

    let amount = args.filter(x => !x.startsWith("<@"))[0]

    if (message.mentions.users.size < 1 || isNaN(amount) || amount < 1) return message.channel.send(`**Command Incorrect!**\n\`-pay <User> <Coins>\`\n*Example: -pay <@728099900176334900> 100*`)

    let user = message.mentions.users.first()


    /*-------------------------------------------------------------------------*/
    let errorembed = new Discord.MessageEmbed()
    .setAuthor(client.user.username, client.user.displayAvatarURL({ format: "png", dynamic: true }))
    .setTitle('Error!')
    .setDescription(`<@${message.author.id}> Tu n'as pas **${amount}** coins! `)
    .setThumbnail(message.author.displayAvatarURL({ format: "png", dynamic: true }))
    .setColor(`#ff0400`)
    .setTimestamp()
    .setFooter(config.EmbedFooter, message.author.displayAvatarURL({ format: 'png', dynamic: true }));
    /*-------------------------------------------------------------------------*/
    let minimumbruh = new Discord.MessageEmbed()
    .setAuthor(client.user.username, client.user.displayAvatarURL({ format: "png", dynamic: true }))
    .setTimestamp()
    .setTitle('Error!')
    .setDescription(`<@${message.author.id}> Le paiement minimum est **10** Coins!`)
    .setThumbnail(message.author.displayAvatarURL({ format: "png", dynamic: true }))
    .setColor(`#ff0400`)
    .setFooter(config.EmbedFooter, message.author.displayAvatarURL({ format: 'png', dynamic: true }))
    /*-------------------------------------------------------------------------*/
    let thisisbotbruh = new Discord.MessageEmbed()
    .setAuthor(client.user.username, client.user.displayAvatarURL({ format: "png", dynamic: true }))
    .setTimestamp()
    .setTitle('Error!')
    .setDescription(`<@${message.author.id}> Vous ne pouvez pas envoyer de pièces à un **bot**!`)
    .setThumbnail(message.author.displayAvatarURL({ format: "png", dynamic: true }))
    .setColor(`#ff0400`)
    .setFooter(config.EmbedFooter, message.author.displayAvatarURL({ format: 'png', dynamic: true }))
    /*-------------------------------------------------------------------------*/
    let youcantpay = new Discord.MessageEmbed()
    .setAuthor(client.user.username, client.user.displayAvatarURL({ format: "png", dynamic: true }))
    .setTimestamp()
    .setTitle('Error!')
    .setDescription(`<@${message.author.id}> Vous ne pouvez pas envoyer de pièces à un **Toi même**!`)
    .setThumbnail(message.author.displayAvatarURL({ format: "png", dynamic: true }))
    .setColor(`#ff0400`)
    .setFooter(config.EmbedFooter, message.author.displayAvatarURL({ format: 'png', dynamic: true }))
    /*-------------------------------------------------------------------------*/

    if (data.coins < Number(amount)) return message.channel.send(errorembed)

    if (Number(amount) < 10) return message.channel.send(minimumbruh)

    if (user.id === message.author.id) return message.channel.send(youcantpay)

    if (user.bot) return message.channel.send(thisisbotbruh)

    /*-------------------------------------------------------------------------*/

    let paidDMembed = new Discord.MessageEmbed()
    .setAuthor(client.user.username, client.user.displayAvatarURL({ format: "png", dynamic: true }))
    .setTitle('You Sent Coins!')
    .setDescription(`<@${message.author.id}> tu as envoyé **${amount}** coins to <@${user.id}> !`)
    .setFooter(config.EmbedFooter, message.author.displayAvatarURL({ format: 'png', dynamic: true }))
    .setThumbnail(message.author.displayAvatarURL({ format: "png", dynamic: true }))
    .setColor('#8a8aff')
    .setTimestamp()
    message.author.send(paidDMembed)

    /*-------------------------------------------------------------------------*/
        message.channel.send(`Vous avez payé **${amount}** coins! à ${user}`)
    /*-------------------------------------------------------------------------*/
    let paidembed = new Discord.MessageEmbed()
    .setAuthor(client.user.username, client.user.displayAvatarURL({ format: "png", dynamic: true }))
    .setTitle('Vous avez Coins!')
    .setDescription(`<@${message.author.id}> vous a envoyé **${amount}** Coins! Enjoy!!`)
    .setFooter(config.EmbedFooter, message.author.displayAvatarURL({ format: 'png', dynamic: true }))
    .setThumbnail(user.displayAvatarURL({ format: "png", dynamic: true }))
    .setColor('#8a8aff')
    .setTimestamp()
    user.send(paidembed)
    /*-------------------------------------------------------------------------*/

    data.logs.unshift(`[-${amount}] - Vous avez payé ${user.tag}.`)

    db.set(`logs_${message.author.id}`, data.logs)

    db.subtract(`coins_${message.author.id}`, Number(amount))

    data = await get(message, user)

    data.logs.unshift(`[+${amount}] - ${message.author.tag} vous a payé.`)

    db.set(`logs_${user.id}`, data.logs)

    db.add(`coins_${user.id}`, Number(amount))
    
    let logchannel = client.channels.cache.get(config.logChannel)
    let embed = new Discord.MessageEmbed()
    .setAuthor(client.user.username, client.user.displayAvatarURL({ format: "png", dynamic: true }))
    .setTitle('Coins Paid [User to User]')
    .setDescription(`Pièces payées par: **${message.author.tag}(${message.author.id})**\nCoins Versée à: **${user.tag}(${user.id})**\nTotal: **${amount}** coins!`)
    .setThumbnail(user.displayAvatarURL({ format: 'png', dynamic: true }))
    .setTimestamp()
    .setColor('#8a8aff')
    .setFooter('Experience+ v2.0 | 2020 (C) | https://discord.gg/w4hXdRW', message.author.displayAvatarURL({ format: 'png', dynamic: true }))
    logchannel.send(embed)
    
  }
}
