const Discord = require('discord.js');
const config = require('../config.json');
module.exports = {
  name: "order",
  aliases: ["info", "orders"],
  description: "montre l'ordre actuel de la guilde.",
  execute: async(client, message, args, data, db) => {
   
    if (data.code == 0) return message.channel.send(`Il n'y a pas d'ordre dans cette guilde.`)
    
    let bar = []
    
    let progress = data.uses
    
    for (let i = 0;i < 10;i++) {
      progress = progress - (data.orders / 10)
      if (progress > 0) bar.push(`#`)
      else bar.push(`=`) 
    }
    
    let warn = ""
    
    await client.fetchInvite('https://discord.gg/' + data.code).catch(e => warn = "Le lien d'invitation de cette guilde est expiré! Veuillez passer une nouvelle commande ou personne ne pourra se joindre ici!")
    
   const embed = new Discord.MessageEmbed()
    .setColor("#8a8aff")
    .setAuthor(client.user.username, client.user.displayAvatarURL())
    .setTitle(`${message.guild.name} order info:`)
    .setThumbnail(message.channel.guild.iconURL())
    .addField(`Want Faster Orders Completion?`, ` Vous obtiendrez une exécution plus rapide des commandes!`)
    .setDescription(`Total ordres: ${data.orders}\nProgress: ${bar.join("")} ${data.uses}/${data.orders}`)
    .setFooter(config.EmbedFooter)

    message.channel.send(warn, embed) 
  } 
} 
