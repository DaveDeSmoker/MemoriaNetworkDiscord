const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

    var botIcon = bot.user.displayAvatarURL;

    var botEmbed = new discord.RichEmbed()
        .setTitle("DISCORD BOT INFO")
        .setColor("#660066")
        .setThumbnail(botIcon)
        .addField("Bot naam", bot.user.username)
        .addField("Gemaakt op", bot.user.createdAt)
        .addField("Gemaakt door", "@DaveDeSmoker#4271")
        .addField("Meer info?", "!help")
        .setTimestamp()
        .setFooter('MemoriaNetwork', botIcon);

    return message.channel.send(botEmbed);


}

module.exports.help = {
    name: "info"
}
