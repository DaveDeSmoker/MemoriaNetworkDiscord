const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
    var botIcon = bot.user.displayAvatarURL;

    if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send("Je hebt helaas niet de juiste permissie!");

    var splitser = "//";

        if(args[0] == null) {

            var useMessage = new discord.RichEmbed()
            .setTitle("GEBRUIK ANNOUNCEMENT")
            .setColor("#660066")
            .setDescription(`Maak een announcement door gebruik te maken van: \n !announcement Bericht ${splitser} Kleur ${splitser} Kanaal`)
            .setTimestamp()
            .setFooter('MemoriaNetwork', botIcon);

        return message.channel.send(useMessage);
            
        }

        args = args.join(" ").split(splitser);

        if(args[1] == undefined) args[1] = "#660066";
        if(args[2] == undefined) args[2] = "announcement";

        var options = {

            bericht: args[0] ||"Geen inhoud opgegeven",
            kleur: args[1].trim(),
            kanaal: args[2].trim()


        }

        var announcer = message.author;

        var announcementEmbed = new discord.RichEmbed()
        .setTitle("Announcement")
        .setColor(` ${options.kleur} `)
        .setDescription(`\n ${options.bericht} \n`)
        .setTimestamp()
        .setFooter(`MemoriaNetwork`, botIcon);

    var announcementChannel = message.guild.channels.find(`name`, options.kanaal);
    if(!announcementChannel) return message.channel.send("Kan het kanaal niet vinden!");

    announcementChannel.send(announcementEmbed);


}

module.exports.help = {
    name: "announcement"
}