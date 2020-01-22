const discord = require("discord.js");
const fs = require("fs");

const warns = JSON.parse(fs.readFileSync("./warning.json", "utf8"));

module.exports.run = async(bot, message, args) => {

    var botIcon = bot.user.displayAvatarURL;

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Je hebt helaas niet de juiste permissie!");

    var user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

    if(!user) return message.channel.send("Deze gebruiken zit niet in de discord!");

    if(user.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Deze persoon kan je niet warnen!");

    var reason = args.join(" ").slice(22);

    if(!reason) return message.channel.send("Je hebt geen reden gegeven!");

    if(!warns[user.id]) warns[user.id] = {
        warns: 0

    };

    warns[user.id].warns++;

    fs.writeFile("./warning.json", JSON.stringify(warns), (err) =>  {
        if (err) console.log(err);
    });

    var warnEmbed = new discord.RichEmbed()
    .setDescription("WARN")
    .setColor("#ee0000")
    .addField("Gewarnde gebruiker: ", user)
    .addField("Gewarned door: ", message.author)
    .addField("Reden", reason)
    .addField("Aantal warns", warns[user.id].warns)
    .setTimestamp()
    .setFooter('MemoriaNetwork', botIcon);

    var warnChannel = message.guild.channels.find(`name`, "straffen");
    if (!warnChannel) return message.guild.send("Kanaal niet gevonden!");

    warnChannel.send(warnEmbed);

    if(warns[user.id].warns == 4){
        var warnBericht = new discord.RichEmbed()
        .setDescription("PAS OP " + user)
        .setColor("#ee0000")
        .addField("LET OP! ", "Nog 1 waarschuwing en je krijgt een ban!")
        .setTimestamp()
        .setFooter('MemoriaNetwork', botIcon);

     message.author.send(warnBericht);

    }else if (warns[user.id].warns == 5) {

        message.guild.member(user).ban(reason);
        message.channel.send(`${user} is verbannen!`);


    }

}

module.exports.help = {
    name: "warn"
}