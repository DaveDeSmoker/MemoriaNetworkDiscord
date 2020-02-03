const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

    if (!message.member.hasPermissions("MANAGE_MESSAGES")) return message.reply("Je hebt helaas niet de juiste permissie!");

    if (!args[0]) return message.reply("Geef een aantal op.");

    if(Number.isInteger(parseInt(args[0]))){

        var amount = parseInt(args[0]) + 1;

        message.channel.bulkDelete(amount).then(() => { });

            message.reply(`heeft ${args[0]} berichten verwijderd!`).then(message => message.delete(10000));


    }else {
        return message.reply("Geef een aantal op.");
    }


}
    

module.exports.help = {
    name: "clear"
}