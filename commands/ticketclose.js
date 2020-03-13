const discord = require("discord.js");
 
module.exports.run = async (bot, message, args) => {
    var botIcon = bot.user.displayAvatarURL;
 
    // Id van category van tickets.
    const categoryId = "604450345179021314";
 
    // Als bericht in ticket kanaal is dan verwijder kanaal ander zend bericht
    if (message.channel.parentID == categoryId) {
 
        message.channel.delete();
 
    } else {
 
        message.channel.send("Dit kan enkel in een ticket.");
 
    }
 
    var embedCloseTicket = new discord.RichEmbed()
        .setTitle("Hoi, " + message.channel.name)
        .setDescription("Je ticket is gemarkeerd als **compleet**. Wil je een nieuwe maken doe dan !ticket")
        .setTimestamp()
        .setFooter(`MemoriaNetwork`, botIcon);

 
    // Vind kanaal voor de logs.
 
    message.author.sendMessage(embedCloseTicket);
 
}
 
module.exports.help = {
    name: "close",
    description: "Sluit een ticket af"
}
