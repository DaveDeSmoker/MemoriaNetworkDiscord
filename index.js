const discord = require("discord.js");
const botConfig = require("./botconfig.json");

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
    var role = member.guild.roles.find("name", "New");

    if (!role) return;

    member.addRole(role);

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

            return message.channel.send("You have sent a message with inappropriate content!").then(msg => msg.delete(5000));

        }



   } 



    if (command === `${prefix}kick`) {
        var botIcon = bot.user.displayAvatarURL;

        var kickUser = message.guild.member(message.mentions.users.first() || message.guild.members(arguments[0]));

        if(!kickUser) return message.channel.send("Deze gebruiken zit niet in de discord!");

        var reason = arguments.join(" ").slice(22);

        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You dont have permissions for that!");
        
        if(kickUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You cannot kick this user!");

        var kick = new discord.RichEmbed()
            .setDescription("KICK")
            .setColor("#ee0000")
            .addField("Kicked User: ", kickUser)
            .addField("Kicked by: ", message.author)
            .addField("Reason", reason)
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

        if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You dont have permissions for that!");
        
        if(banUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You cannot ban this user.");

        var ban = new discord.RichEmbed()
            .setDescription("BAN")
            .setColor("#ee0000")
            .addField("Banned User: ", banUser)
            .addField("Banned By: ", message.author)
            .addField("Reason", reason)
            .setTimestamp()
            .setFooter('MemoriaNetwork', botIcon);
        
        var banChannel = message.guild.channels.find(`name`, "straffen");
        if (!banChannel) return message.guild.send("Kanaal niet gevonden!");

        message.guild.member(banUser).ban(reason);

        banChannel.send(ban);

        return;

    }
            });
        }
    }


});



bot.login(process.env.token);
