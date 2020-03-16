const discord = require("discord.js");
 
module.exports.run = async (bot, message, args) => {
 
    // Aantal sterren opvragen.
    const aantalSterren = args[0];
 
    // Nakijken als men een getal meegeeft, of als men een getal tussen 1 en 5 opgeeft.
    if (!aantalSterren || aantalSterren < 1 || aantalSterren > 5) return message.channel.send("Enter some stars! Choose between 1 and 5.");
 
    // Nakijken als je een bericht hebt meegegeven.
    const bericht = args.splice(1, args.length).join(' ') || '**No message given**';
 
    // Kanaal waar reviews inkomen opzoeken.
    var reviewChannel = message.guild.channels.find('name', 'server-feedback');
    // als kanaal niet is gevonden geef een bericht.
    if (!reviewChannel) return message.channel.send("Kanaal niet gevonden");
 
    var sterren = "";
    // Voor ieder aantal sterren gaan we deze tekst aanmaken.
    for (var i = 0; i < aantalSterren; i++) {
 
        sterren += ":star: ";
 
    }
 
    // Verwijder het bestaande bericht.
    message.delete();
 
    // Maak de review aan met het aantal sterren en het berichtje.
    const review = new discord.RichEmbed()
        .setTitle(`${message.author.username} wrote a review! :tada:`)
        .setColor("#660066")
        .setThumbnail("https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.planetminecraft.com%2Fserver%2Fmemorianetwork-4382336%2F&psig=AOvVaw0UauwXtfp3LfwTnE0d2CmJ&ust=1583841299957000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCKjSv-KqjegCFQAAAAAdAAAAABAE")
        .addField("Stars:", `${sterren}`)
        .addField("Review:", `${bericht}`);
 
    // Zend bericht naar de gebruiker dat hij een review heeft aangemaakt.
    message.channel.send(":white_check_mark: You have successfully written a review!");
    // Zend het bericht in het review kanaal.
    return reviewChannel.send(review);
 
}
 
module.exports.help = {
    name: "review",
    description: "review command."
}
