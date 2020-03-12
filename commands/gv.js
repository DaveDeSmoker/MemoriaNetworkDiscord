const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    var botIcon = bot.user.displayAvatarURL;
    if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send("Je hebt helaas niet de juiste permissie!");
    if(args[0] == null) {
            var useMessage = new discord.RichEmbed()
            .setTitle("GEBRUIK GIVEAWAY")
            .setColor("#660066")
            .setDescription(`Maak een giveaway door gebruik te maken van: \n !gv {aantal winners} {tijd} {prijs}`)
            .setTimestamp()
            .setFooter('MemoriaNetwork', botIcon);
        return message.channel.send(useMessage);

        }

    // Argumenten die we later nodig hebben.
    var item = "";
    var tijd = DateTime.Now.Date.Add(new TimeSpan(1, 0, 0));;
    var winnerCount;
 
    // Nakijken als je perms hebt om dit command te doen.
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Sorry jij kan dit niet doen");
 
    // !giveaway aantalWinnaars seconden itemOmTeWinnen.
 
    // Aantal winnaars opvragen.
    winnerCount = args[0];
    // Tijd hoelang het moet duren.
    time = args[1];
    // Welke prijs men kan winnen.
    item = args.splice(2, args.length).join(' ');
 
    // Verwijder het bericht dat net is gemaakt door de gebruiker.
    message.delete();
 
    // Verval datum berekenen.
    var date = new Date().getTime();
    var dateTime = new Date(date + (time * 1000));

    // Maak embed aan.
    var giveawayEmbed = new discord.RichEmbed()
        .setTitle("**GIVEAWAY** 🎉")
        .setDescription(`**Prijs:** ${item} \n **Vervalt:** ${dateTime}`)
        .setColor("#660066")
        .setTimestamp()
        .setFooter('MemoriaNetwork | Giveaway', botIcon);

    // Verzend embed en zet de reactie op de popper.
    var embedSend = await message.channel.send(giveawayEmbed);
    embedSend.react("🎉");
 
    // Zet een timeout die na het aantal seconden af gaat.
    setTimeout(function () {
 
        // Argumenten die we nodig hebben.
        var random = 0;
        var winners = [];
        var inList = false;
 
        // Verkrijg de gebruikers die gereageerd hebben op de giveaway.
        var peopleReacted = embedSend.reactions.get("🎉").users.array();
 
        // Hier gaan we al de mensen over gaan en kijken als de bot er tussen staan
        // De bot moeten we uit de lijst weghalen en dan gaan we verder.
        for (var i = 0; i < peopleReacted.length; i++) {
            if (peopleReacted[i].id == bot.user.id) {
                peopleReacted.splice(i, 1);
                continue;
            }
        }
 
        // Hier kijken we na als er wel iemand heeft meegedaan.
        if (peopleReacted.length == 0) {
            return message.channel.send("Niemand heeft gewonnen dus de bot wint.");
        }
 
        // Tijdelijk kijken we na als er te wienig mensen hebben mee gedaan aan de wedstrijd.
        if (peopleReacted.length < winnerCount) {
            return message.channel.send("Er zijn te weinig mensen die mee deden daarom heeft de bot gewonnen.");
        }
 
        // Voor het aantal winnaars dat we eerder hebben opgegeven gaan we een random nummer aanmaken en de user in een array zetten.
        for (var i = 0; i < winnerCount; i++) {
 
            inList = false;
 
            // Aanmaken van een random getal zodat we een user kunnen kiezen.
            random = Math.floor(Math.random() * peopleReacted.length);
 
            // Als een winnaar al voorkomt in de winnaars lijst dan moeten we opnieuw gaan zoeken naar een andere winnaar.
            for (var y = 0; y < winners.length; y++) {
                // Nakijken als de geslecteerde winnaar al in de lijst zit.
                if (winners[y] == peopleReacted[random]) {
                    // We zetten i 1 minder zodat we opnieuw kunnen doorgaan in de lijst.
                    i--;
                    // We zetten dit op true zodat we weten dat deze al in de lijst zit.
                    inList = true;
                    break;
                }
            }
 
            // Zit deze niet in de lijst gaan we deze toevoegen.
            if (!inList) {
                winners.push(peopleReacted[random]);
            }
 
        }
 
        // Voor iedere winnaar gaan we een bericht sturen.
        for (var i = 0; i < winners.length; i++) {
            message.channel.send("Proficiat " + winners[i] + `! Je hebt gewonnen **${item}** \n Maak binnen 24h een ticket aan in #bots met **!new**`);
        
        }
 
    }, 1000 * time);
 
 
}
 
module.exports.help = {
    name: "gv",
    description: "Start een giveaway"
}
