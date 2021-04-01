const Discord = require('discord.js')
const { get } = require('../constructors/sqlite.js')

module.exports = {
  name: "ticket",
  aliases: ["lotterybuy", "lottery"],
  description: "utilisé pour acheter un billet pour participer à la loterie.",
  execute: async(client, message, args, data, db) => {
   
   console.log(data.ticket)
    
    
     
    if (data.ticket >= 1) return message.channel.send(`${message.author.username} ne peut pas acheter plus de 1 ticket!`)
     
    let users = await db.fetch(`users_0`)
    if (users === null) users = [] 
    
    if (data.coins < 10) return message.channel.send(`Vous n'avez pas assez de pièces pour acheter un ticket de loterie. Nécessite 10 pièces pour acheter`)
    
    message.channel.send(`${message.author.username} Vous avez acheté une loterie avec succès ticket!`)
    
    users.push(message.author.id)
    
    data.logs.unshift(`[-10] - Acheté une loterie ticket.`)
    
    db.set(`logs_${message.author.id}`, data.logs)
    
    db.set(`users_0`, users)
    db.subtract(`coins_${message.author.id}`, 5)
    db.add(`ticket_${message.author.id}`, 1)
  } 
} 
