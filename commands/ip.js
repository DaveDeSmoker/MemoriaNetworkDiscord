const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

    var botIcon = bot.user.displayAvatarURL;

    var botEmbed = new discord.RichEmbed()
        .setTitle("IP ADRESS")
        .setColor("#660066")
        .setThumbnail(botIcon)
        .addField("MINECRAFT IP ADRESS", "play.memorianetwork.nl")
        .addField("DISCORD LINK", "https://discord.gg/7JkhfxS")
        .setTimestamp()
        .setFooter('MemoriaNetwork', botIcon);

    return message.channel.send(botEmbed);
    }
    

module.exports.help = {
    name: "ip"
}