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
    var role = member.guild.roles.find("name", "[▬▬▬▬▬▌Member▐▬▬▬▬▬]");

    if (!role) return;

    member.addRole(role);

    var rolle = member.guild.roles.find("name", "Member");

    if (!rolle) return;

    member.addRole(rolle);

    const channel = member.guild.channels.find("name", "welcome");

    if (!channel) console.log("Kan kanaal niet vinden");
    var botIcon = bot.user.displayAvatarURL;
    var joinMessage = new discord.RichEmbed()
        .setTitle(`Welcome ${member.user.tag}`)
        .setThumbnail(`${member.user.displayAvatarURL}`)
        .setColor("#660066")
        .setDescription(`**Thank you for joining the MemoriaNetwork discord server!** \n \n **IP:** play.memorianetwork.nl  \n **Store:** store.memorianetwork.nl`)
        .setFooter('MemoriaNetwork | Do !help for more information!', botIcon);



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

        //get args
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    //get cmd
    const cmd = args.shift().toLocaleLowerCase();
    //CHECK IF MESSAGE IS SENT IN THE TICKET CHANNEL
    if (message.channel.id === config.ticketChanId) {
        //CHECK IF COMMAND IS "-ticket"
        if (command === `${prefix}ticket`) {
            console.log('TICKET CREATED BY: ' + message.author.username);
            message.guild.createChannel("ticket-" + message.author.username, "text").then((chan) => {
                chan.setParent(config.catId).then(() => {
                    let roles = message.guild.roles; // collection

                    // find specific role - enter name of a role you create here
                    //Staff is uppercase sensitive
                    let staff = roles.find('name', config.roleName);
                    //Only readable for the ticket requester
                    chan.overwritePermissions(message.guild.roles.find("name", "@everyone"), { "READ_MESSAGES": false, "READ_MESSAGE_HISTORY": false })
                    chan.overwritePermissions(message.author, {
                        "READ_MESSAGES": true,
                        "SEND_MESSAGES": true,
                        "ATTACH_FILES": true,
                        "CREATE_INSTANT_INVITE": false,
                        "ADD_REACTIONS": true,
                        "READ_MESSAGE_HISTORY": true,
                        "EMBED_LINKS": true,
                        "USE_EXTERNAL_EMOJIS": true
                    });
                    //OVERWRITE FOR STAFF
                    chan.overwritePermissions(
                        Support,
                        {
                            "READ_MESSAGES": true,
                            "SEND_MESSAGES": true,
                            "ATTACH_FILES": true,
                            "ADD_REACTIONS": true,
                            "READ_MESSAGE_HISTORY": true,
                            "EMBED_LINKS": true,
                            "USE_EXTERNAL_EMOJIS": true
                        },
                    )
                });
                //Make the embed
                const embed = {
                    "color": 0xD080B2,
                    "footer": {
                        "icon_url": message.guild.iconURL,
                        "text": message.guild.name + " ticket system"
                    },
                    "author": {
                        "name": message.guild.name,
                        "icon_url": message.guild.iconURL
                    },
                    "fields": [
                        {
                            "name": "Hey there " + message.author.username + "!",
                            "value": "Help will arrive soon!"
                        },
                        {
                            "name": "To close this ticket, use the command below.",
                            "value": "`-close`"
                        }
                    ]
                };
                //send the embed and tag the author
                chan.send("<@" + message.author.id + ">", { embed });

            });
        }
        else {
            //DELETE MESSAGE IF IT ISN'T THE "TICKET" CMD
            message.delete();
            message.author.send('a');
        }
    }

    if (message.channel.parentID === config.catId) {
        //CLOSE TICKET
        if (command === `${prefix}close`) {

            message.channel.send("Are you sure you want to close the ticket? (Y/N)");
            //OPEN A MESSAGE COLLECTOR FOR X seconds (set at 10000 now (10s))
            const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 10000 });
            collector.on('collect', message => {
                if (message.content == "Y") {

                    message.channel.delete();

                } else if (message.content == "N") {

                    message.channel.send("Ticket didn't close.");

                    collector.stop();
                }

            });

});


bot.login(process.env.token);
