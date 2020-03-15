const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

    if (!message.member.hasPermissions("MANAGE_MESSAGES")) return message.reply("You dont have the permission for that!");

    if (!args[0]) return message.reply("Enter a number.");

    if(Number.isInteger(parseInt(args[0]))){

        var amount = parseInt(args[0]) + 1;

        message.channel.bulkDelete(amount).then(() => { });

            message.reply(`deleted ${args[0]} messages!`).then(message => message.delete(10000));


    }else {
        return message.reply("Enter a number.");
    }


}
    

module.exports.help = {
    name: "clear"
}
