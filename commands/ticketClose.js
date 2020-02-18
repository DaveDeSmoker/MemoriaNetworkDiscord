const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

    var botIcon = bot.user.displayAvatarURL;
    var dm = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    var dMessage = args.join(" ").slice(22);
        
        if (!dm) return message.channel.send("Can't find user!")
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("You can't you that command!")
        if(dMessage.length < 1) return message.reply('You must supply a message!')
    
        dm.send(`${dm} A moderator from WP Coding Club sent you: ${dMessage}`)

        message.author.send(`${message.author} You have sent your message to ${dm}`)
       

}

module.exports.help = {
    name: "dm"
}
