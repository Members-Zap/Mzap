const Discord = require('discord.js')
const config = require('../config.json')
module.exports = {
  name: "clearlogs",
  aliases: ["cl", "prunelogs"],
  account: true,
  description: "utilisé pour effacer le journal des pièces.",
  execute: async(client, message, args, data, db) => {
    
    let owners = config.OwnerID;
    
    if (!owners.includes(message.author.id)) return
   
    if (data.logs.length == 0) return message.channel.send(`${message.author.username} vos logs sont déjà vides.`)
    
    else message.channel.send(`${message.author.username} vos journaux ont été effacés avec succès.`), db.set(`logs_${message.author.id}`, []) 
  } 
} 
