const discord = require("discord.js");
 
module.exports.run = async (bot, message, args) => {
    var botIcon = bot.user.displayAvatarURL;
    
    // ID van de categorie van de tickets.
    const categoryId = "604450345179021314";
 
    // Verkrijg Gebruikersnaam
    var userName = message.author.username;
    // Verkrijg discriminator
    var userDiscriminator = message.author.discriminator;
 
    // Als ticket al gemaakt is
    var bool = false;
 
    // Kijk na als ticket al gemaakt is.
    message.guild.channels.forEach((channel) => {
 
        // Als ticket is gemaakt, zend bericht.
        if (channel.name == userName.toLowerCase() + "-" + userDiscriminator) {
 
            message.channel.send("Je hebt al een ticket aangemaakt");
 
            bool = true;
 
        }
 
    });
 
    // Als ticket return code.
    if (bool == true) return;
 
    var embedCreateTicket = new discord.RichEmbed()
        .setTitle("Hoi, " + message.author.username)
        .setFooter("Support kanaal wordt aangemaakt");
 
    message.channel.send(embedCreateTicket);
 
    // Maak kanaal en zet in juiste categorie.
    message.guild.createChannel(userName + "-" + userDiscriminator, "text").then((createdChan) => { // Maak kanaal
 
        createdChan.setParent(categoryId).then((settedParent) => { // Zet kanaal in category.
 
            // Zet perms voor iedereen
            settedParent.overwritePermissions(message.guild.roles.find('name', "@everyone"), { "READ_MESSAGES": false });
            // Zet perms voor de gebruiker die ticket heeft aangemaakt.
            settedParent.overwritePermissions(message.author,@Support {
 
                "READ_MESSAGES": true, "SEND_MESSAGES": true,
                "ATTACH_FILES": true, "CONNECT": true,
                "CREATE_INSTANT_INVITE": false, "ADD_REACTIONS": true
 
            });
 
            var embedParent = new discord.RichEmbed()
                .setTitle("Hoi, " + message.author.username.toString())
                .setDescription("Dankje voor het openen van een ticket! \nStaff zal je zo snel mogelijk helpen! \nStel je vraag alvast voor een sneller antwoord!");
                .setTimestamp()
                .setFooter(`MemoriaNetwork`, botIcon);
            settedParent.send(embedParent);
        }).catch(err => {
            message.channel.send("Er is iets fout gelopen.");
        });
 
    }).catch(err => {
        message.channel.send("Er is iets fout gelopen.");
    });
 
}
 
module.exports.help = {
    name: "ticket",
    description: "Maak een ticket aan"
}