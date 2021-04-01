const Discord = require("discord.js");
const ms = require("parse-ms");
const config = require("../config.json");
module.exports = {
  name: "premiuminfo",
  aliases: ["infopremium", "help premium"],
  description: "affiche les informations sur la prime du bot ",
  execute: async (client, message, args, data, db) => {      
  
     const embed = new Discord.MessageEmbed()
    .setColor(`RANDOM`)
    .setAuthor(client.user.username, client.user.displayAvatarURL())
    .setTitle(`${client.user.username}`)
    .setThumbnail(client.user.displayAvatarURL())
    .setDescription(`If you need more help, feel free to ask our support team in the server https://discord.gg/ZzJqST7YbC`)
    .addField(`-LA PREMIUM VOUS PERMETTRA D'ACCÉDER AUX COMMANDES DU CODE CADEAU

-1): VOUS POUVEZ CRÉER DES PIÈCES CODE CADEAU 
-2): VOUS POUVEZ ÉCHANGER DES PIÈCES 
-IF VOUS NE SAVEZ PAS QU'EST-CE QUE LE CODE CADEAU FAIT .giftcode`, false);
 message.channel.send(embed);
  }
};
