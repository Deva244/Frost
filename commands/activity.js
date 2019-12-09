const Discord = require('discord.js');
const fs = require('fs');
const Activity = require('../models/activity.js');
const mongoose = require('mongoose');

module.exports.run = (bot , msg , args) => {
  
  let dburl = 'mongodb+srv://Deva244:0164231199mM@frost-bot-db-cxybp.mongodb.net/Frost';
  mongoose.connect(dburl , {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

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

        msg.channel.send(`*Applying the new activity.* **"${act}"**`)
        .then(change => {
          Activity.findOne({
            userID: "198426222810628106"
          }, (err , activity) => {
            if (err) console.log(err);
            if (!activity) {
              const newActivity = new Activity({
                userID : msg.author.id,
                activity : act,
                type : type
              })
              newActivity.save().catch(err => console.log(err));
            }
            else {
              activity.activity = act;
              activity.type = type;
              activity.save().catch(err => console.log(err));
            }
          })  
          change.delete();
          msg.channel.send(`**${act}** will be applied after the next restart`);
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
