const Discord = require('discord.js');

module.exports.run = (bot , msg , args) => {

  let content = msg.content.slice(6);

  let openingEmbed = new Discord.RichEmbed().setTitle('All JoJo openings').setColor('#ff0000')
  .setImage('https://i.imgur.com/etyp6aG.jpg')
  .addField('**All openings in one video(excluding 2nd opening of part 5)**' , 'https://youtu.be/gH_i1mqgEDU')
  .addField('**Playlist with all the openings and OSTs**' , 'https://www.youtube.com/playlist?list=PLvR1Vs9Qj4fk-VnGR2xUtNLvLcwBwGB6V');

  let part1Embed = new Discord.RichEmbed()
  .setTitle('Part 1')
  .setImage('https://i.imgur.com/etyp6aG.jpg')
  .setColor('#ff0000')
  .addField('**Anime**' , 'https://animepahe.com/anime/jojos-bizarre-adventure-tv')
  .addField('**Opening**' , 'https://youtu.be/jXYN_M2RDLQ');

  let part2Embed = new Discord.RichEmbed()
  .setTitle('Part 2')
  .setImage('https://i.imgur.com/etyp6aG.jpg')
  .setColor('#ff0000')
  .addField('**Anime**' , 'https://animepahe.com/anime/jojos-bizarre-adventure-tv')
  .addField('**Opening**' , 'https://youtu.be/RZhGITHIbns');

  let part3Embed = new Discord.RichEmbed()
  .setTitle('Part 3')
  .setImage('https://i.imgur.com/L6o9M0s.jpg')
  .setColor('#ff0000')
  .addField('**Anime**' , '**S1** : https://animepahe.com/anime/jojos-bizarre-adventure-stardust-crusaders \n**S2** : https://animepahe.com/anime/jojos-bizarre-adventure-stardust-crusaders-2nd-season')
  .addField('**Opening 1**' , 'https://youtu.be/lviyLEF7lPE')
  .addField('**Opening 2**' , 'https://youtu.be/9xF5GfqJrhE');

  let part4Embed = new Discord.RichEmbed()
  .setTitle('Part 4')
  .setImage('https://i.imgur.com/B9cMF0a.jpg')
  .setColor('#ff0000')
  .addField('**Anime**' , 'https://animepahe.com/anime/jojos-bizarre-adventure-diamond-is-unbreakable')
  .addField('**Opening 1**' , 'https://youtu.be/0EX6L6jCaLw')
  .addField('**Opening 2**' , 'https://youtu.be/HYNK0YRqZb4')
  .addField('**Opening 3**' , 'https://youtu.be/9oxf2sBssH8');

  let part5Embed = new Discord.RichEmbed()
  .setTitle('Part 5')
  .setImage('https://i.imgur.com/oLlIl8f.jpg')
  .setColor('#ff0000')
  .addField('**Anime**' , 'https://animepahe.com/anime/jojo-no-kimyou-na-bouken-ougon-no-kaze')
  .addField('**Opening 1**' , 'https://youtu.be/PANGjAyF4CQ')
  .addField('**Opening 2**' , 'https://youtu.be/fqBNnC_apV4');

  if (content == 'opening') {
    msg.channel.send(openingEmbed);
  }
  else if (content == 'part 1') {
    msg.channel.send(part1Embed);
  }
  else if (content == 'part 2') {
    msg.channel.send(part2Embed);
  }
  else if (content == 'part 3') {
    msg.channel.send(part3Embed);
  }
  else if (content == 'part 4') {
    msg.channel.send(part4Embed);
  }
  else if (content == 'part 5') {
    msg.channel.send(part5Embed);
  }
  else if (content == 'manga') {
    msg.channel.send('https://www.reddit.com/r/StardustCrusaders/wiki/manga');
  }
}
module.exports.help = {
  name:'jojo'
}