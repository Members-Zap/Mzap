const Discord = require('discord.js')
const config = require('../config.json')
module.exports = {
  name: "lotterystats",
  description: "statistiques de la loterie, propriétaire uniquement.",
  execute: async(client, message, args, data, db) => {

    let owners = config.OwnerID;
    
    if (!owners.includes(message.author.id)) return
    
    let users = await db.fetch(`users_0`)
    
    if (users === null) users = []
    
    let handler = users
    
    users = []
    
    handler.map(x => {
      if (!users.includes(x)) users.push(x) 
    })
    
    let money = 10 * users.length
    
    let embed = new Discord.MessageEmbed()
    .setColor(config.embedColor)
    .setTitle(`Participants à la loterie:`)
    .addField(`Les participants:`, users.length, false)
    .addField(`Récompense:`, de l'argent + " coins", false)
    .setThumbnail(client.user.displayAvatarURL)
    .setFooter(`Tapez .end pour sélectionner le gagnant!`)
    message.channel.send(embed) 
  } 
} 
