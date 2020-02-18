const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

    var botIcon = bot.user.displayAvatarURL;
    var dm = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    var dMessage = args.join(" ").slice(22);
        
        if (!dm) return message.channel.send("Ik kan deze gebruiker niet vinden.")
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Je hebt hiervoor niet genoeg permissie!")
        if(dMessage.length < 1) return message.reply('Je moet een bericht achterlaten!')

        var embedDm = new discord.RichEmbed()
        .setTitle("BELANGERIJK")
        .setColor("#660066")
        .setDescription("${dMessage}")
        .addField("!help", "Verkrijg dit command!!")
        .addField("!members", "Bekijk het aantal members in de discord!")
        .addField("!ip", "Bekijk het server ip & de discord link!")
        .addField("!regels", "Bekijk de regels van de minecraft & discord server!")
        .addField("!ticket", "Maak een ticket aan!")
        .addField("!close", "Sluit een ticket!")
        .setTimestamp()
        .setFooter('Verzonden door: ${dm}', botIcon);
    
        dm.send(embedDm);

        message.author.send(`${message.author} je hebt een bericht verstuurd naar ${dm}`);
       

}

module.exports.help = {
    name: "dm"
}
