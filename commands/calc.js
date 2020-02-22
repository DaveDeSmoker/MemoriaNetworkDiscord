const math = require('mathjs');
const Discord = require('discord.js');

exports.run = (client, message, args, tools) => {

    if (!args[0]) return message.channel.send("Zet er een som bij!");
    
    let resp;
    try {
        resp = math.eval(args.join(" "));
    } catch (e) {
         return message.channel.send("Zet er een mogelijke rekensom bij");
    }
    
    const embed = new Discord.MessageEmbed()
        .setColor(0xfffff)
        .setTitle("REKENMACHINE")
        .setDescription(`\`\`\`js\n${args.join(" ")}\`\`\``)
        .addField("Uitkomst", ´\´\´\´js\n${resp}\`\`\``)
     message.channel.send(embed);
     
}
