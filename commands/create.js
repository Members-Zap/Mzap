const Discord = require('discord.js');
const db = require('quick.db');
const config = require('../config.json');
module.exports = {
    name: "giftcode",
    description: "Redeem Code for coins!",
    execute: async(client, message, args, data, db) => {

      if(args[0] == 'create') {

        let COINS = Number(args[1])
        if (!COINS || isNaN(COINS) || COINS < 1) return message.channel.send(`Commande incorrecte!\nIn pour acheter une carte-cadeau, faites \`-giftcode create <numberOfCoins> <Code>\``)
        if (COINS > data.coins) return message.channel.send(`${message.author.username} tu n'as pas assez d'équilibre.\n\n\`Si vous obtenez ceci! Veuillez essayer de rejoindre certains serveurs d'abord, puis réessayez cette commande\``)
        COINS = Math.round(COINS)

      let CODE = args[2]
      message.reply(`Vérifier dm!`)
      message.delete()
      let embed = new Discord.MessageEmbed()
      .setTitle(`Code cadeau généré!`)
      .setDescription(`<@${message.author.id}> Vous avez converti vos pièces en code cadeau!`)
      .addField(`Code:`, `${CODE}`, false)
      .addField(`Total Coins:`, `${COINS}`, false)
      .setThumbnail(message.author.displayAvatarURL({ format: "png", dynamic: true }))
      .setTimestamp()
      .setColor("GREEN")
      .setFooter(config.EmbedFooter, message.author.displayAvatarURL({ format: "png", dynamic: true }))
      message.author.send(embed)
      await new Promise(resolve => setTimeout(resolve, 100))
      db.add(`code_` + CODE, COINS)
      db.subtract(`coins_${message.author.id}`, Number(COINS))
      data.logs.unshift(`[-${COINS}] - Pièces converties en code cadeau.`)

      db.set(`logs_${message.author.id}`, data.logs)

      } else if(args[0] === 'redeem') {
        REDEEMINGCODE = args[1]
        let COINSTOADD = db.fetch(`code_` + REDEEMINGCODE)
        if (COINSTOADD == null || COINSTOADD == 0) {
              message.channel.send('Ce code a déjà été utilisé ou n'est pas valide!')
            } else {
                const redeemed = new Discord.MessageEmbed()
                .setColor("#8a8aff")
                .setTitle(`LE CODE A ÉTÉ RÉCOMPENSÉ AVEC SUCCÈS!`)
                .setFooter(config.EmbedFooter)
                .setDescription(`➡ **Vous avez racheté \`${COINSTOADD}\` coins du code cadeau!**`)
                message.channel.send(redeemed)
          data.logs.unshift(`[+${COINSTOADD}] - Redeemed a Gift code.`)
          db.set(`logs_${message.author.id}`, data.logs)
          db.add(`coins_${message.author.id}`, COINSTOADD)
          db.subtract(`code_` + REDEEMINGCODE, COINSTOADD)
            }
        } else {
          let helpembed = new Discord.MessageEmbed()
          .setTitle('Gift Code Command Help!')
          .addField(`\`.giftcode create <Coins> <Code>\``, `En utilisant cela, vous pouvez convertir vos pièces en codes cadeaux!`, false)
          .addField(`\`.giftcode redeem <Code>\``, `En utilisant cela, vous pouvez utiliser des codes cadeaux!`, false)
          .setFooter(config.EmbedFooter, message.author.displayAvatarURL({ format: "png", dynamic: true }))
          .setColor('YELLOW')
        message.channel.send(helpembed)
        }
    
     }

  }
