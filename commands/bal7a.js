const Discord = require('discord.js');

module.exports.run = (bot , msg , args) => {

  let randomWhole = (min , max) => Math.floor(Math.random() * (max - min + 1)) + min;

  const num = randomWhole(1,6);

  const bal7a1 = new Discord.RichEmbed().setTitle('a7la bal7a <:bal7a:571534117393661954>').setImage('https://i.imgur.com/ustqXiP.jpg').setColor('#a04008')
  const bal7a2 = new Discord.RichEmbed().setTitle('a7la bal7a <:bal7a:571534117393661954>').setImage('https://i.imgur.com/m5CoFUb.jpg').setColor('#a04008')
  const bal7a3 = new Discord.RichEmbed().setTitle('a7la bal7a <:bal7a:571534117393661954>').setImage('https://i.imgur.com/aooPh9U.jpg').setColor('#a04008')
  const bal7a4 = new Discord.RichEmbed().setTitle('a7la bal7a <:bal7a:571534117393661954>').setImage('https://i.imgur.com/yyBgLse.jpg').setColor('#a04008')
  const bal7a5 = new Discord.RichEmbed().setTitle('a7la bal7a <:bal7a:571534117393661954>').setImage('https://i.imgur.com/zHtiAQ5.jpg').setColor('#a04008')
  const bal7a6 = new Discord.RichEmbed().setTitle('a7la bal7a <:bal7a:571534117393661954>').setImage('https://i.imgur.com/jV7poNW.jpg').setColor('#a04008')

  switch(num) {
    case 1 :
      msg.channel.send(bal7a1).then (async react => {
      await react.react('571534117393661954');
      await react.react('572062722124939264'); });
      break;
    case 2 :
      msg.channel.send(bal7a2).then (async react => {
      await react.react('571534117393661954');
      await react.react('572062722124939264'); });
      break;
    case 3 :
      msg.channel.send(bal7a3).then (async react => {
      await react.react('571534117393661954');
      await react.react('572062722124939264'); });
      break;
    case 4 :
      msg.channel.send(bal7a4).then (async react => {
      await react.react('571534117393661954');
      await react.react('572062722124939264'); });
      break;
    case 5 :
      msg.channel.send(bal7a5).then (async react => {
      await react.react('571534117393661954');
      await react.react('572062722124939264'); });
      break;
    case 6 :
      msg.channel.send(bal7a6).then (async react => {
      await react.react('571534117393661954');
      await react.react('572062722124939264'); });
      break;
  }

}

module.exports.help = {
  name:'bal7a'
}
