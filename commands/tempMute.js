const discord = require("discord.js");
const ms = require("ms");

module.exports.run = async(bot, message, args) => {

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Je hebt helaas niet de juiste permissie!");
    if(!user) return message.channel.send("Doe !tempmute [gebruiker] [tijd] [reden]");

    var user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

    if(!user) return message.channel.send("Deze gebruiken zit niet in de discord!");

    if(user.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Deze persoon kan je niet tempmuten!");

    var muteRole = message.guild.roles.find("name", "Muted");

    if(!muteRole) return message.channel.send("De rol MUTED bestaat niet!");

    var muteTime = args[1];

    if(!muteTime) return message.channel.send("Geef een tijd voor de tempmute!");

    await (user.addRole(muteRole.id));

    message.channel.send(`${user} is gemute voor ${muteTime}`);

    setTimeout(function () {

        user.removeRole(muteRole.id);

        message.channel.send(`${user} is geunmute!`);

    }, ms(muteTime));



}

module.exports.help = {
    name: "tempmute"
}