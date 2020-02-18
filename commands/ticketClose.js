const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

    var botIcon = bot.user.displayAvatarURL;
    var dm = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    var dMessage = args.join(" ").slice(22);
        
        if (!dm) return message.channel.send("Ik kan deze gebruiker niet vinden.")
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Je hebt hiervoor niet genoeg permissie!")
        if(dMessage.length < 1) return message.reply('Je moet een bericht achterlaten!')

        var dmEmbed = new discord.RichEmbed()
        .setDescription(` ${dMessage} `)
        .setColor("#660066")
        .addField(`Verzonden door:`, `${dm}`)
        .setTimestamp()
        .setFooter('MemoriaNetwork', botIcon);
    
        dm.send(dmEmbed);

       

}

module.exports.help = {
    name: "dm"
}
