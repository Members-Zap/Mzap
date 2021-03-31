const Discord = require('discord.js')

module.exports = {
  execute: async(client, db) => {
   
    console.log(`je suis prêt`)
 
    client.user.setActivity(`Bot fait par jules Z YTB `, { type: "PLAYING" }) 

  } 
}
