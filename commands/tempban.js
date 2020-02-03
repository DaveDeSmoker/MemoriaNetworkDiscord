const discord = require("discord.js");
const ms = require("ms");

module.exports.run = async(bot, message, args) => {

    var botIcon = bot.user.displayAvatarURL;

    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Je hebt helaas niet de juiste permissie!");

    var user = message.guild.member(message.mentions.users.first());
    
    if(!user) return message.channel.send("Doe !tempban [gebruiker] [tijd] [reden]");

    if(user.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Deze gebruiken kan je niet bannen.");

    var tempBanTime = args[1];

    var reason = args.join(" ").slice(22);
    if(!reason) return message.channel.send("Geef een reden op!");

    if(ms(tempBanTime)){

        await message.guild.member(user).ban(reason);

        message.channel.send(`${user} is gebanned voor ${reason}`);
        setTimeout(function(){
            message.guild.unban(user.id);

            message.channel.send(`${user} is geunbanned!`);





        }, ms(tempBanTime));



    } else {
        return message.channel.send("Geef een tijd voor de tempban!");
        }

}

module.exports.help = {
    name: "tempban"
}