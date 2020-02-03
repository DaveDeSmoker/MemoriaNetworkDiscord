const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    var botIcon = bot.user.displayAvatarURL;

    try{

        var embedHelp = new discord.RichEmbed()
        .setTitle("HELP")
        .setColor("#660066")
        .setDescription("Bekijk alle commands van de discord!")
        .addField("!help", "Verkrijg dit command!!")
        .addField("!members", "Bekijk het aantal members in de discord!")
        .addField("!ip", "Bekijk het server ip & de discord link!")
        .addField("!regels", "Bekijk de regels van de minecraft & discord server!")
        .addField("!ticket", "Maak een ticket aan!")
        .addField("!close", "Sluit een ticket!")
        .setTimestamp()
        .setFooter('MemoriaNetwork', botIcon);

        message.author.send(embedHelp);

    message.reply("Bekijk je prive berichten voor de commands!").then(message => message.delete(10000));

    }catch (error) {
        message.channel.send("Er is iets fout gegaan!");

    }

}

module.exports.help = {
    name: "help"
}