const Discord = require('discord.js');

module.exports.run = (bot , msg , args) => {

  const embed = new Discord.RichEmbed()
  .setAuthor('Frost Help' , 'https://i.imgur.com/IRQnnMf.jpg')
  .setTitle(`${msg.guild.name}'s info`)
  .setDescription(`**Server ID : ${msg.guild.id}**`)
  .setColor('#61ac7f')
  .setThumbnail(`${msg.guild.iconURL}`)
  .addField('Server Owner' , `${msg.guild.owner}`)
  .addField('Created at' , `${msg.guild.createdAt}`)
  .addField('You joined at' , `${msg.guild.joinedAt}`)
  .addField('Members count' , `${msg.guild.memberCount}`)
  .addField('Region' , `${msg.guild.region}`)

  msg.channel.send(embed);

}

module.exports.help = {
  name:"info"
}
