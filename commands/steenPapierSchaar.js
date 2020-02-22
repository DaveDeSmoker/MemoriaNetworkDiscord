const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

      if(!args[0]) return message.channel.send("Gebruik: !sps {steen, papier, schaar}");
      
      var options = ["steen", "papier", "schaar"];
      
      var result = options[Math.floor(Math.random() * options.lenght)];
      
      if(args[0] == "steen"){
      
          if(result == "papier"){
          
              message.channel.send(`Ik heb ${result} :notepad_spiral:, ik win.`);
          }else if(result == "schaar"){
              message.channel.send(`Ik heb ${result} :scissors:, jij wint.`);
          }else if(result == "steen"){
              message.channel.send(`Ik heb ${result} :moyai:, het is gelijkspel.`);
          }
      
      
      }
      else if(args[0] == "papier"){
      
          if(result == "steen"){
          
              message.channel.send(`Ik heb ${result} :moyai:, jij wint.`);
          }else if(result == "schaar"){
              message.channel.send(`Ik heb ${result} :scissors:, ik win.`);
          }else if(result == "steen"){
              message.channel.send(`Ik heb ${result} :notepad_spiral:, het is gelijkspel.`);
          }
      
      
      }
      else if(args[0] == "schaar"){
      
          if(result == "steen"){
          
              message.channel.send(`Ik heb ${result} :moyai:, ik win.`);
          }else if(result == "papier"){
              message.channel.send(`Ik heb ${result} :notepad_spiral:, jij wint.`);
          }else if(result == "schaar"){
              message.channel.send(`Ik heb ${result} :scissors:, het is gelijkspel.`);
          }
      
      
      }
      


}
    

module.exports.help = {
    name: "sps"
}
