const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

    var botIcon = bot.user.displayAvatarURL;

    var botEmbed = new discord.RichEmbed()
        .setTitle("DISCORD/MINECRAFT REGELS")
        .setColor("#660066")
        .setThumbnail("https://media.discordapp.net/attachments/574629640803450880/616081787139129395/Server_rules.png?width=935&height=374")
        .addField("REGELS", "https://bit.ly/Memoria-Regels")
        .setTimestamp()
        .setFooter('MemoriaNetwork', botIcon);

    return message.channel.send(botEmbed);


}

module.exports.help = {
    name: "regels"
}