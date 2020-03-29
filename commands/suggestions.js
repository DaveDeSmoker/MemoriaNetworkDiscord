const discord = require("discord.js");
 
module.exports.run = async (bot, message, args) => {
 
    // Vang het idee op.
    var idee = args.join(" ");
 
    // Kijk na als er een idee is meegegeven.
    if (!idee) return message.channel.send("You have not given a suggestion!");
 
    // Maak het embed aan.
    var ideeEmbed = new discord.RichEmbed()
        .setTitle("Suggestion")
        .setColor("#660066")
        .addField("Submitted by: ", message.author)
        .addField("Message: ", idee);
 
    // Vind het kanaal.
    var ideeChannel = message.guild.channels.find(`name`, "suggestions");
    if (!ideeChannel) return message.guild.send("Can't find the channel **suggestions**.");
 
    // Verzend het bericht en voeg er reacties aan toe.
    ideeChannel.send(ideeEmbed).then(embedMessage => {
        embedMessage.react('✅');
        embedMessage.react('❎');
    });
 
    // Einde.
 
}
 
module.exports.help = {
    name: "suggestion",
    description: "Heb je een idee. Zet het dan hier en misschien passen we het toe."
}
