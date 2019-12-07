const Discord = require('discord.js');

module.exports.run = (bot , msg , args) => {

  let randomWhole = (min , max) => Math.floor(Math.random() * (max - min + 1)) + min;

  const num = randomWhole(1,2);

  const balbos1 = new Discord.RichEmbed()
  .setTitle('Balbos Starter Pack')
  .setImage('https://i.imgur.com/ueM0UAW.png')
  .setColor('#f81e1e');

  const balbos2 = new Discord.RichEmbed()
  .setTitle('Balbos Starter Pack')
  .setImage('https://i.imgur.com/PaOP6Ej.png')
  .setColor('#f81e1e');

  switch(num) {
    case 1 :
      msg.channel.send(balbos1)
      break;
    case 2 :
      msg.channel.send(balbos2)
      break;
    }

}

module.exports.help = {
  name:'balbos'
}
