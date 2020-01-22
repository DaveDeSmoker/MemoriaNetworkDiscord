const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
    var botIcon = bot.user.displayAvatarURL;

    var icon = message.guild.iconURL;

    var membersEmbed = new discord.RichEmbed()
        .setTitle("SERVER INFO")
        .setColor("#660066")
        .setThumbnail(icon)
        .addField("Totaal aantal members", message.guild.memberCount)
        .setTimestamp()
        .setFooter('MemoriaNetwork', botIcon);



    return message.channel.send(membersEmbed);


}

module.exports.help = {
    name: "members"
}