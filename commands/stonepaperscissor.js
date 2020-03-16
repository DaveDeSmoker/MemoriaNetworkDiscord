const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

      if(!args[0]) return message.channel.send("Gebruik: !sps <stone, paper, shear>");

      var options = ["stone", "paper", "shear"];

      var result = options[Math.floor(Math.random() * options.length)];

      if(args[0] == "stone"){

          if(result == "paper"){

              message.channel.send(`I got ${result} :notepad_spiral:, I win.`);
          }else if(result == "schaar"){
              message.channel.send(`I got ${result} :scissors:, you win.`);
          }else if(result == "steen"){
              message.channel.send(`I got ${result} :moyai:, it's a draw.`);
          }


      }
      else if(args[0] == "paper"){

          if(result == "stone"){

              message.channel.send(`I got ${result} :moyai:, you win.`);
          }else if(result == "schaar"){
              message.channel.send(`I got ${result} :scissors:, I win.`);
          }else if(result == "papier"){
              message.channel.send(`I got ${result} :notepad_spiral:, it's a draw.`);
          }


      }
      else if(args[0] == "shear"){

          if(result == "stone"){

              message.channel.send(`I got ${result} :moyai:, I win.`);
          }else if(result == "papier"){
              message.channel.send(`I got ${result} :notepad_spiral:, you win.`);
          }else if(result == "schaar"){
              message.channel.send(`I got ${result} :scissors:, it's a draw.`);
          }


      }



}


module.exports.help = {
    name: "sps"
}
