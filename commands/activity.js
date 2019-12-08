const Discord = require('discord.js');
const fs = require('fs');

module.exports.run = (bot , msg , args) => {

  JSON.parse(fs.readFileSync('./jsonfiles/activity.json' , 'utf8'));

try {
  if (msg.author.id === '198426222810628106') {

    let act = msg.content.slice(5);

    if (!args[0]) {
      msg.channel.send("Enter an activity to be set!"); return;
    } 

    msg.channel.send('Enter the type of the activity');

    const filter = m => m.author == msg.author;

    msg.channel.awaitMessages(filter , { max : 1 , time : 20000 , error : ['time'] })

    .then(collected => {

      let collectedType = collected.first().content;
      let type = collectedType.toUpperCase();

      if (type != 'PLAYING' && type != 'WATCHING' && type != 'STREAMING' && type != 'LISTENING') {
        msg.channel.send("That's not a valid activity type!\ntypes are (playing , watching , streaming and listening)");
        return;
      }

      let newAct = {
        "activity":`${act}`,
        "type":`${type}`
      };

      msg.channel.send(`*Applying the new activity.* **"${newAct.activity}"**`)
      .then(change => {
        change.delete();
        fs.writeFileSync('./jsonfiles/activity.json' , JSON.stringify(newAct) , (err) => {
          if (err) console.log(err);
        });
        msg.channel.send(`**${newAct.activity}** is now applied`);
      })
    })
  }
  else msg.channel.send("You're not allowed to use this command.")
}
catch(err) {
  msg.channel.send("Something went wrong!");
  console.log(err);
}


}

module.exports.help = {
  name:"act"
}
