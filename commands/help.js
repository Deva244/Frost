const Discord = require('discord.js');

module.exports.run = async (bot , msg , args) => {

  const help = new Discord.RichEmbed()
  .setAuthor('Frost Help' , 'https://i.imgur.com/IRQnnMf.jpg')
  .setColor('#211e72')
  .setTitle('Use !help [command category] for more info on the commands')
  .setTimestamp()
  .setFooter('Ready for company.')
  .setThumbnail('https://i.imgur.com/WVaiXAh.png')
  .addField('<:r6icon:584492298012983366> R6' , '!help r6 for the Rainbow six Siege command list')
  .addField('<:othersicon:584495597638385675> Other' , '!help other for the command list')
  .addField('<:modicon:584492529261477888> Moderation' , '!help mod for the Moderation command list');

  const helpmod = new Discord.RichEmbed()
  .setColor('#ce0909')
  .setAuthor('Frost Help' , 'https://i.imgur.com/IRQnnMf.jpg')
  .setTitle('<:modicon:584492529261477888> Moderation Commands')
  .setDescription("Deleted messages across the server will be collected in the 'deleted-messages' channel")
  .setThumbnail('https://i.imgur.com/YjEHpiT.png')
  .addField('del' , '!del [number of messages to delete] , Deletes a specified amount of messages, with a maximum of 100 messages. i.e : !del 5');

  const helpr6 = new Discord.RichEmbed()
  .setAuthor('Frost Help' , 'https://i.imgur.com/IRQnnMf.jpg')
  .setColor('#050000')
  .setTitle('<:r6icon:584492298012983366> Rainbow Six Siege commands')
  .setThumbnail('https://i.imgur.com/RpG9i03.jpg')
  .addField('stats' , "!stats [username] , Displays the character's stats (PC only)")
  .addField('top' , 'Top 10 players globaly or regionally, !help r6 top for more info.')
  .addField('opd' , 'Oerator details. !opd [operator name]')
  .addField('mh' , 'Match history. !mh [username] (PC only)')
  .addField('r6op' , 'Coming Soon™')
  .addField('game' , 'Rainbow Six Siege simulation game **(still in development)**');

  const helptop = new Discord.RichEmbed()
  .setAuthor('Frost Help' , 'https://i.imgur.com/IRQnnMf.jpg')
  .setColor('#050000')
  .setTitle('<:r6icon:584492298012983366> Rainbow Six Siege Leaderboard command')
  .setThumbnail('https://i.imgur.com/RpG9i03.jpg')
  .addField("!top [region] [platform]" , "**Default region :** global\n**Default platform :** PC")
  .addField('Regions' , "**Global :** g\n**Europe :** eu\n**North America :** na\n**Asia :** as")
  .addField('Platforms' , '**Playstations :** ps\n**Xbox :** xb')
  .addField('g is only needed to search for global ranking on PS or Xbox.' , '!top g ps / !top g xb');

  const helpother = new Discord.RichEmbed()
  .setAuthor('Frost Help' , 'https://i.imgur.com/IRQnnMf.jpg')
  .setColor('#951dac')
  .setTitle('<:othersicon:584495597638385675> Other/Misc Commands')
  .setTimestamp()
  .setThumbnail('https://i.imgur.com/YVuws9m.jpg')
  .addField('bal7a' , 'Random Picture of our glorious leader bal7a')
  .addField('trap' , 'Mention someone for some frost traping')
  .addField('meme' , 'Rainbow Six Siege shitposts')
  .addField('info' , "Displays some of the server and user's info")

  if (!args[0]) {
    msg.channel.send(help);
  }
  else if (args[0] == 'other') {
    msg.channel.send(helpother);
  }
  else if (args[0] == 'r6' && !args[1]) {
    msg.channel.send(helpr6);
  }
  else if (args[0] == 'r6' && args[1] == 'top') {
    msg.channel.send(helptop);
  }
  else if (args[0] == 'mod') {
    if (msg.guild.me.hasPermission('MANAGE_MESSAGES' , false , true , true)) {  // checks for user permissions
      msg.channel.send(`${msg.author} Check your DMs <:ninja:584494715597225995>`);
      msg.author.send('Hello ,' , helpmod);
    } else { msg.channel.send("You don't have the permission to view these commands"); }
  }

}

module.exports.help = {
  name: 'help'
}
