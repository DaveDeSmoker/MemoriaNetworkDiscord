const discord = require("discord.js");
const botConfig = require("./botconfig.json");
const levelfile = require("./level.json");

const fs = require("fs");


const bot = new discord.Client();
bot.commands = new discord.Collection();

fs.readdir("./commands/", (err, files) => {

    if(err) console.log(err);

    var jsFiles = files.filter(f => f.split(".").pop() === "js");

    if(jsFiles.length <= 0) {
        console.log("Kon geen files vinden");
        return;
    }

    jsFiles.forEach((f, i) => {

        var fileGet = require(`./commands/${f}`);
        console.log(`De file ${f} is geladen!`)

        bot.commands.set(fileGet.help.name, fileGet);
    })

});

bot.on("ready", async () => {

    console.log(`${bot.user.username} is online!`)

    bot.user.setActivity("play.memorianetwork.nl", {type: "PLAYING"});
});

bot.on("guildMemberAdd", member => {
    var role = member.guild.roles.find("name", "[▬▬▬▬▬▌Member▐▬▬▬▬▬]");

    if (!role) return;

    member.addRole(role);

    var rolle = member.guild.roles.find("name", "Member");

    if (!rolle) return;

    member.addRole(rolle);

    const channel = member.guild.channels.find("name", "welkom");

    if (!channel) console.log("Kan kanaal niet vinden");
    var botIcon = bot.user.displayAvatarURL;
    var joinMessage = new discord.RichEmbed()
        .setTitle(`Welkom ${member.user.tag}`)
        .setThumbnail(`${member.user.displayAvatarURL}`)
        .setColor("#660066")
        .setDescription(`**Leuk dat je gejoined bent op de MemoriaNetwork server!** \n \n **IP:** play.memorianetwork.nl  \n **Website:** shop.memorianetwork.nl`)
        .setFooter('MemoriaNetwork | Doe !help voor meer informatie!', botIcon);



    channel.send(joinMessage);
});

// bot.on("guildMemberAdd"), member => {
//     const channel = member.guild.channels.find(name,"welcome")


// });

var swearWords = ["kanker","discord.gg","kkr","aids","downie","homo","kalf","hoer","slet","bitch","porno","pornhub","xnxx","porn"];

bot.on("message", async message => {

    if(message.author.bot) return;

    if(message.channel.type === "dn") return;

    var prefix = botConfig.prefix;

    var messageArray = message.content.split(" ");

    var command = messageArray[0];

    var arguments = messageArray.slice(1);


    var commands = bot.commands.get(command.slice(prefix.length));

    if(commands) commands.run(bot, message, arguments);


    var msg = message.content.toLowerCase();

   for(var i = 0; i < swearWords.length; i++){

        if(msg.includes(swearWords[i])) {

            message.delete();

            return message.channel.send("Je hebt een bericht verstuurd met ongepaste content!").then(msg => msg.delete(5000));

        }



   } 



    if (command === `${prefix}kick`) {
        var botIcon = bot.user.displayAvatarURL;

        var kickUser = message.guild.member(message.mentions.users.first() || message.guild.members(arguments[0]));

        if(!kickUser) return message.channel.send("Deze gebruiken zit niet in de discord!");

        var reason = arguments.join(" ").slice(22);

        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Je hebt helaas niet de juiste permissie!");
        
        if(kickUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Deze gebruiken kan je niet kicken.");

        var kick = new discord.RichEmbed()
            .setDescription("KICK")
            .setColor("#ee0000")
            .addField("Gekickte gebruiker: ", kickUser)
            .addField("Gekickt door: ", message.author)
            .addField("Reden", reason)
            .setTimestamp()
            .setFooter('MemoriaNetwork', botIcon);
        
        var kickChannel = message.guild.channels.find(`name`, "straffen");
        if (!kickChannel) return message.guild.send("Kanaal niet gevonden!");

        message.guild.member(kickUser).kick(reason);

        kickChannel.send(kick);

        return;

    }

    if (command === `${prefix}ban`) {
        var botIcon = bot.user.displayAvatarURL;
        var banUser = message.guild.member(message.mentions.users.first() || message.guild.members(arguments[0]));

        if(!banUser) return message.channel.send("Deze gebruiken zit niet in de discord!");

        var reason = arguments.join(" ").slice(22);

        if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Je hebt helaas niet de juiste permissie!");
        
        if(banUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Deze gebruiken kan je niet bannen.");

        var ban = new discord.RichEmbed()
            .setDescription("BAN")
            .setColor("#ee0000")
            .addField("Gebannede gebruiker: ", banUser)
            .addField("Gebanned door: ", message.author)
            .addField("Reden", reason)
            .setTimestamp()
            .setFooter('MemoriaNetwork', botIcon);
        
        var banChannel = message.guild.channels.find(`name`, "straffen");
        if (!banChannel) return message.guild.send("Kanaal niet gevonden!");

        message.guild.member(banUser).ban(reason);

        banChannel.send(ban);

        return;

    }
    
        if (command === `${prefix}avatar`) {
	if (arguments[0]) {
		const user = message.guild.member(message.mentions.users.first() || message.guild.members(arguments[0]));
		if (!user) {
			return message.reply('Zet er een speler bij.');
		}

		return message.channel.send(`${user.username}'s avatar: ${user.displayAvatarURL}`);
	}

	return message.channel.send(`${message.author.username}, jou avatar: ${message.author.displayAvatarURL}`);
}
	
// Genereer random xp.
    var randomxp = Math.floor(Math.random(1) * 15) + 1;

    // Verkrijg id van de gebruiker.
    var idUser = message.author.id;

    // console.log(randomxp);

    // Als persoon nog niet in file is maak dan standaard aan.
    if (!levelfile[idUser]) {

        levelfile[idUser] = {

            xp: 0,
            level: 0

        };

    }

    // Voeg xp toe.
    levelfile[idUser].xp += randomxp;

    // Verkrijg level van de gebruiker.
    var levelUser = levelfile[idUser].level;
    // Verkrijg xp van de gebruiker.
    var xpUser = levelfile[idUser].xp;
    // Bereken volgend level op basis van de xp.
    var nextLevelXp = levelUser * 300;
    
    // Als het level 0 is zet dan xp op 100.
    if (nextLevelXp === 0) nextLevelXp = 100;

    console.log(nextLevelXp + " " + xpUser);

    // Als gebruikeer volgend level heeft bereikt zet level 1 hoger en zet in file.
    // Let op Nodemon restart wegens dat we de file als require hebben binnengehaald.
    if (xpUser >= nextLevelXp) {

        levelfile[idUser].level += 1;

        // Wegschrijven van data. Je kan dit ook altijd opslaan maar dit zorgt ervoor dat het data
        // verkeer te groot wordt.
        fs.writeFile("./level.json", JSON.stringify(levelfile), err => {

            if (err) console.log(err);

        });

        // Zenden van een embed met gegevens.
        var embedLevel = new discord.RichEmbed()
            .setTitle("***LEVEL UP***")
	    .setThumbnail(`${message.author.displayAvatarURL}`)
            .setColor("#29e53f")
            .setDescription('**${user}** is een level omhoog!')
            .setDescription(`${message.author.username} is een level omhoog!`)
            .addField("Nieuw level: ", levelfile[idUser].level);

        message.channel.send(embedLevel);

    }
    

});


bot.login(process.env.token);
