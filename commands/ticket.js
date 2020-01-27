const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
    var botIcon = bot.user.displayAvatarURL;

    const categoryid = "604450345179021314";

    var userName = message.author.username;
    var userDiscriminator = message.author.discriminator;

    var bool = false;

    message.guild.channels.forEach((channel) => {

        if (channel.name == userName.toLowerCase() + "-" + userDiscriminator) {
            
            message.channel.send("Je hebt al een ticket!");
            bool = true;

        }


    });
    if(bool == true) return;

    var embedCreateTicket = new discord.RichEmbed()
        .setTitle("TICKET WORDT AANGEMAAKT")
        .setColor("#660066")
        .setDescription("Je ticket wordt nu aangemaakt! Kijk in: #" + userName.toLowerCase() + "-" + userDiscriminator, ".")
        .setTimestamp()
        .setFooter('MemoriaNetwork', botIcon);

        message.channel.send(embedCreateTicket);

        message.guild.createChannel(userName + "-" + userDiscriminator, "text").then((createdChan) => {
            createdChan.setParent(categoryid).then((settedParent) => {
                settedParent.overwritePermissions(message.guild.roles.find('name', "@everyone"), { "READ_MESSAGES": false });
                settedParent.overwritePermissions(message.author, {
                    "READ_MESSAGES": true, "SEND_MESSAGES": true,
                    "ATTACH_FILES": true, "CONNECT": true,
                    "CREATE_INSTANT_INVITE": false 
                })                   
                settedParent.overwritePermissions(message.guild.roles.find('name', "@Support"), { "READ_MESSAGES": false });
                settedParent.overwritePermissions(message.role, {
                    "READ_MESSAGES": true, "SEND_MESSAGES": true,
                    "ATTACH_FILES": true, "CONNECT": true,
                    "CREATE_INSTANT_INVITE": false 
                });
        var embedParent = new discord.RichEmbed()
            .setTitle("Hi, " + message.author.username.toString())
            .setColor("#660066")
            .setDescription("Stel je vraag en de support helpt je zo snel mogelijk!")
            .setTimestamp()
            .setFooter('MemoriaNetwork', botIcon);

        settedParent.send(embedParent);


            })

        })


}

module.exports.help = {
    name: "ticket"
}
