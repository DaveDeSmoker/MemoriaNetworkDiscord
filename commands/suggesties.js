const discord = require("discord.js");
 
module.exports.run = async (bot, message, args) => {
 
    // Vang het idee op.
    var idee = args.join(" ");
 
    // Kijk na als er een idee is meegegeven.
    if (!idee) return message.channel.send("Je hebt geen suggestie mee gegeven!");
 
    // Maak het embed aan.
    var ideeEmbed = new discord.RichEmbed()
        .setTitle("Suggestie")
        .setColor("#660066")
        .addField("Ingestuurd door: ", message.author)
        .addField("Bericht: ", idee);
 
    // Vind het kanaal.
    var ideeChannel = message.guild.channels.find(`name`, "suggesties");
    if (!ideeChannel) return message.guild.send("Kan het kanaal **suggesties** niet vinden");
 
    // Verzend het bericht en voeg er reacties aan toe.
    ideeChannel.send(ideeEmbed).then(embedMessage => {
        embedMessage.react('✅');
        embedMessage.react('❎');
    });
 
    // Einde.
 
}
 
module.exports.help = {
    name: "suggestie",
    description: "Heb je een idee. Zet het dan hier en misschien passen we het toe."
}