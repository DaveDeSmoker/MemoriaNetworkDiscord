const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    var botIcon = bot.user.displayAvatarURL;

    try{

        var embedHelp = new discord.RichEmbed()
        .setTitle("__**HELP**__")
        .setColor("#660066")
        .setDescription("\n\n__**INFORMATION!**__\n**!help** | *Get this command*\n**!members** | *View the number of members in the discord*\n**!ip** | *View the server ip & the discord link*\n**!rules** | *View the rules of the minecraft & discord server*\n**!info** | *Get info about the discord bot*\n\n__**FEEDBACK**__\n**!idee {idea}** | *Leave an idea*\n**!review {number} {review}** | *Leave a review*\n\n__**GAMES**__\n**!stonepaperscissor {stone} {paper} {shear}**\n**!steenpapierschaar {steen} {papier} {schaar}** | *Play rock paper scissors*\n\n__**TICKET**__\n**!new** | *Create a ticket*\n**!close** | *Close a ticket*")
        .setTimestamp()
        .setFooter('MemoriaNetwork', botIcon);

        message.author.send(embedHelp);

    message.reply("View your private messages for the commands!").then(message => message.delete(10000));

    }catch (error) {
        message.channel.send("Er is iets fout gegaan!");

    }

}

module.exports.help = {
    name: "help"
}
