const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    var botIcon = bot.user.displayAvatarURL;

    try{

        var embedHelp = new discord.RichEmbed()
        .setTitle("STAFF HELP")
        .setColor("#660066")
        .setDescription("__**PUNISHMENT**__\n**!ban {user} {reden}** | *Ban a user*\n**!tempban {user} {tijd} {reden}** | *Tempban a user*\n**!mute {user}** | *Mute a person*\n**!tempmute {user} {tijd} {reden}** | *Tempmute a user*\n**!kick {user}** | *Kick a user*\n\n__**TICKET**__\n**!close** | *Close a ticket*\n**!rename {name}** | *Rename & ticket*\n\n__**OTHERS**__\n**!announcement {bericht}//{colorcode}//{kanaal}ZONDER #//title** | *Create a announcement*\n**!clear {number}** | *Delete some messages in a channel!*")
        .setTimestamp()
        .setFooter('MemoriaNetwork', botIcon);

        message.author.send(embedHelp);

    message.reply("View your private messages for the commands!").then(message => message.delete(10000));

    }catch (error) {
        message.channel.send("Er is iets fout gegaan!");

    }

}

module.exports.help = {
    name: "staffhelp"
}
