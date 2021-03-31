const Discord = require('discord.js');
const config = require('../config.json');
module.exports = {
  name: "help",
  aliases: ["help"],
  description: "affiche les commandes du bot list.",
  execute: async(client, message, args, data, db) => {
     const embed = new Discord.MessageEmbed()
    .setColor(`RANDOM`)
    .setAuthor(client.user.username, client.user.displayAvatarURL())
    .setTitle(`${client.user.username} v2.0`)
    .setThumbnail(client.user.displayAvatarURL())
    .setDescription(`Si vous avez besoin de plus d'aide, n'hésitez pas à demander à notre équipe d'assistance sur le serveur ${config.supportServer}`)
    .addFields(
      { name: `.help`, value: `Affiche la commande d'aide. [invite Me]()`, inline: true},
      { name: `.invite`, value: `Invitez le bot sur votre serveur. [invite Me]()`, inline: true},
      { name: `.bal | .balance`, value: `Vérifiez le solde de vos pièces. [invite Me]()`, inline: true },
      { name: `.f | .find`, value: `Find some servers to join for coins. [invite Me]()`, inline: true },
      { name: `.pay`, value: `Payer des pièces à d'autres. [invite Me]()`, inline: true},
      { name: `.check`, value: `Vérifiez où vous pouvez quitter les serveurs. [invite Me]()`, inline: true},
      { name: `.order | +info`, value: `Voir les informations de votre commande. [invite Me]()`, inline: true},
      { name: `.buy`, value: `Pour acheter des utilisateurs sur votre serveur. [invite Me]()`, inline: true} ,
      { name: `.vote`, value: `Votez et obtenez 1 pièce. [invite Me]()`, inline: true},
      { name: `.giftcode`, value: `Pour convertir vos pièces en code cadeau. [invite Me]()`, inline: true},
      { name: `.botinfo`, value: `Il vous donne les informations sur le bot. [invite Me]()`, inline: true},
      { name: `.stats`, value: `Il vous donne les statistiques détaillées du bot. [invite Me]()`, inline: true})
  
   
    message.channel.send(embed).catch(e => message.channel.send(`Je ne suis pas autorisé à envoyer un message intégré ici!`)) 
  }
}
