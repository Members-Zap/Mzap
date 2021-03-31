const Discord = require('discord.js')
const { get } = require('../constructors/sqlite.js')
const config = require('../config.json');
module.exports = {
  name: "bal",
  aliases: ["balance"], 
  description: "montre le journal des piècesy.",
  execute: async(client, message, args, data, db) => {
    let user = message.guild.members.cache.get(member => args.length && message.mentions.users.size < 1 && member.user.username.toLowerCase().startsWith(args.join(" ").toLowerCase())) || message.author
    if (user.username === undefined) user = user.user
    data = await get(message, user)
    let page = Number(args[0]) 
    if (!page || isNaN(page) || page < 1) page = 1
    let obj = { min: page * 10 - 10, max: page * 10 }
    let tpages = 1
    let n = 10
    data.logs.map((x, y) => {
      if (y == 10) n += 10, tpages++
    })
    if (page > tpages) return message.channel.send(`Page not found.`)
    let logs = []
    data.logs.map((x, y) => {
      if (y >= obj.min && y < obj.max) logs.push(x)
    }) 
    const embed = new Discord.MessageEmbed()
    .setColor("#8a8aff")
    .setAuthor(``) 
    .setTitle(`💰${user.username} ➡ Tu as **${data.coins.toFixed(1)}** coins 💰`)
    .setFooter(`Page ${page}/${tpages} | .bal #page | ${config.EmbedFooter}`)
    .setDescription(`**Vous voulez des pièces sans rejoindre le serveur?**\nBuy pièces de monnaie de notre officiel [Discord Server](${config.supportServer}) et obtenez jusqu'à 25 000 pièces par semaine pour développer votre serveur extrêmement rapidement. Cool, à droite?`)
    .addField(`** Coin Transaction History**`, logs.length == 0 ? "Aucun historique des transactions trouvé!" : logs.join("\n")) 
    .setImage(`https://cdn.discordapp.com/attachments/801320007077593111/805370070070853652/350kb.gif`)
    message.channel.send(embed) 
  } 
}
