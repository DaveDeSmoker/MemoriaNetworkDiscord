const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

    var botIcon = bot.user.displayAvatarURL;

    var botEmbed = new discord.RichEmbed()
        .setTitle("DISCORD BOT INFO")
        .setColor("#660066")
        .setThumbnail(botIcon)
        .addField("Bot name", bot.user.username)
        .addField("Server IP", "play.memorianetwork.nl")
        .addField("Store", "store.memorianetwork.nl")
        .addField("Created on", bot.user.createdAt)
        .addField("Created by", "@DaveDeSmoker#4271")
        .addField("Need more info?", "!help")
        .setTimestamp()
        .setFooter('MemoriaNetwork', botIcon);

    return message.channel.send(botEmbed);


}

module.exports.help = {
    name: "info"
}
