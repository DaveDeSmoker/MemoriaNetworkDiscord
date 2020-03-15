const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
    var botIcon = bot.user.displayAvatarURL;

    if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send("You dont have the permissions for that!");

    var splitser = "//";

        if(args[0] == null) {

            var useMessage = new discord.RichEmbed()
            .setTitle("USE ANNOUNCEMENT")
            .setColor("#660066")
            .setDescription(`Make an announcement using: \n !announcement message ${splitser} color ${splitser} channel name ${splitser} title`)
            .setTimestamp()
            .setFooter('MemoriaNetwork', botIcon);

        return message.channel.send(useMessage);
            
        }

        args = args.join(" ").split(splitser);

        if(args[1] == undefined) args[1] = "#660066";
        if(args[2] == undefined) args[2] = "announcements";
        if(args[3] == undefined) args[3] = "Announcement";

        var options = {

            bericht: args[0] ||"NO INFORMATION",
            kleur: args[1].trim(),
            kanaal: args[2].trim(),
            naam: args[3].trim()


        }

        var announcer = message.author;

        var announcementEmbed = new discord.RichEmbed()
        .setTitle(` ${options.naam} `)
        .setColor(` ${options.kleur} `)
        .setDescription(`\n ${options.bericht} \n`)
        .setTimestamp()
        .setFooter(`MemoriaNetwork`, botIcon);

    var announcementChannel = message.guild.channels.find(`name`, options.kanaal);
    if(!announcementChannel) return message.channel.send("Cannot find the channel!");

    announcementChannel.send(announcementEmbed);


}

module.exports.help = {
    name: "announcement"
}
