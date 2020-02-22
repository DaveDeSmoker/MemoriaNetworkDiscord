const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    var botIcon = bot.user.displayAvatarURL;

    try{

        var embedHelp = new discord.RichEmbed()
        .setTitle("STAFF HELP")
        .setColor("#660066")
        .setDescription("Bekijk alle staff commands van de discord!")
        .addField("**!announcement {bericht}//{colorcode}//{kanaal}ZONDER #**", "Maak een melding in de discord!")
        .addField("**!dm {user} {bericht}**", "Verstuur een DM met deze bot (Gewone tekst)!")
        .addField("**!dmembed {user} {bericht}**", "Verstuur een DM met deze bot (Speciale tekst)")
        .addField("**!ban {user} {reden}**", "Verban een user van de discord!")
        .addField("**!tempban {user} {tijd} {reden}**", "Verban een user tijdelijk van de discord!")
        .addField("**!mute {user}**", "Mute een persoon in de discord!")
        .addField("**!tempmute {user} {tijd} {reden}**", "Mute een persoon tijdelijk in de discord!")
        .addField("**!kick {user}**", "Kick een user van de discord server!")
        .addField("**!clear {aantal}**", "Verwijder een aantal berichten in een channel!")
        .addField("**!close**", "Sluit een ticket!")
        .addField("**!rename {naam}**", "Hernoem een ticket channel!")
        .setTimestamp()
        .setFooter('MemoriaNetwork', botIcon);

        message.author.send(embedHelp);

    message.reply("Bekijk je prive berichten voor de commands!").then(message => message.delete(10000));

    }catch (error) {
        message.channel.send("Er is iets fout gegaan!");

    }

}

module.exports.help = {
    name: "staffhelp"
}
