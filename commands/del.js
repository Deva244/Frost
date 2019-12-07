const Discord = require('discord.js');

module.exports.run = async (bot , msg , args) => {

  let num = args[0];

  if (num > 100) msg.channel.send("You can't delete more than 100 messages at a time")
  .then(del => {
    del.delete(10000);
  })

  try {

  if (msg.guild.me.hasPermission('MANAGE_MESSAGES' , true , true , true )) {
    if (!msg.content.includes(num)) {
      msg.channel.send('Specify the amount of messages to be deleted!');
    } else {
      msg.delete();
      const fetch = await msg.channel.fetchMessages({limit : num});
      msg.channel.bulkDelete(fetch);
    }
  } else if (!msg.guild.me.hasPermission('MANAGE_MESSAGES')) {
    msg.channel.send("You aren't allowed to do that!");
  } else if (msg.content.includes(num) && !Number.isInteger(num)) {
    msg.channel.send('❌ Enter an integer number!');
  }

  }
  catch(err){
    console.log(err);
  }

}

module.exports.help = {
  name:'del'
}
