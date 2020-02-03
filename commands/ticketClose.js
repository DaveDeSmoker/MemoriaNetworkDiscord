const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

    var botIcon = bot.user.displayAvatarURL;
    const categoryid = "669255390139121664";

    if(message.channel.parentID = categoryid){

        message.channel.delete();
    }else{
        message.channel.send("Dit kan enkel in een ticket!");
    }

    var embedCloseTicket = new discord.RichEmbed()
        .setTitle("Ticket " + message.channel.name + " is gesloten!")
        .setColor("#660066")
        .setDescription("Dit ticket is afgerond!")
        .addField("Gesloten door:", message.author.username.toString())
        .setTimestamp()
        .setFooter('MemoriaNetwork', botIcon);

        var logChannel = message.guild.channels.find("name","straffen");
        if(!logChannel) return message.channel.send ("Kanaal bestaat niet");

        logChannel.send(embedCloseTicket);


}

module.exports.help = {
    name: "close"
}