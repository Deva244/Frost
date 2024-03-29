const Discord = require('discord.js');
const { Client , RichEmbed , Attachment } = require('discord.js');
const bot = new Discord.Client();
const fs = require('fs');
const copypasta = require('./jsonfiles/copypasta.json');
const Activity = require('./models/activity.js');
const mongoose = require('mongoose');
let dburl = process.env.DBLink;
mongoose.connect(dburl , {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

bot.commands = new Discord.Collection();

let randomWhole = (min , max) => Math.floor(Math.random() * (max - min + 1)) + min;

fs.readdir("./commands" , (err , files) => {

  if (err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === 'js')
  if (jsfile.length <= 0) {
    console.log('couldnt find commands.');
    return;
  }
  jsfile.forEach((f , i) => {
    let props = require(`./commands/${f}`);
    bot.commands.set(props.help.name , props);
  });
});

bot.on('ready', () => {
  console.log(`Frost Bot is online!`);
  let act , actType;
  Activity.findOne({
    userID: "198426222810628106"
  }, (err , activity) => {
    if (err) console.log(err);
    if (!activity) {
      const newActivity = new Activity({
        userID : "198426222810628106",
        activity : "!help",
        type : "PLAYING"
      })
      newActivity.save().catch(err => console.log(err));
      act = newActivity.activity , actType = newActivity.type;
    }
    else {
      act = activity.activity;
      actType = activity.type;
    }
    bot.user.setActivity(`${act}` , { type : `${actType}` })
  })
 });

bot.on('guildMemberAdd' , member => {
  const channel = member.guild.channels.find(ch => ch.name === 'general');
    if (!channel) return;
    if (member.guild.id != '264824022775103498') return;
    channel.send(`I caught ${member}<:frosttrap:577249791113953292> sneaking into the village`);
});

bot.on('message', async msg => {

  if (msg.author.bot) return;
  if (msg.channel.type === 'dm') return;

  let prefix = '!';
  let msgArray = msg.content.split(' ');
  let cmd = msgArray[0];
  let args = msgArray.slice(1);

  if (msg.content.startsWith(`${prefix}`)){
    let commandfile = bot.commands.get(cmd.slice(`${prefix.length}`));
    if (commandfile) commandfile.run(bot , msg , args);
  }
  else {
    let content = msg.content.toLowerCase();
    let rate = randomWhole(1,100);
  
    // JoJo copypasta triggers
    if (rate >= 98) {
      if (content.includes('kira')) {
        msg.channel.send(copypasta.kira);
        return;
      }
      else if (content.includes("jojo reference") || content.includes('jonathan') || content.includes('dio')) {
        msg.channel.send(copypasta.reference);
        return;
      }
      else if (content.includes('approach') || content.includes('closer') || content.includes("beat")) {
        msg.channel.send(copypasta.approach);
        return;
      }
      else if (content.includes('rant') || content.includes('venice') || content.includes("france") || content.includes('paris')) {
        msg.channel.send(copypasta.venice);
        return;
      }
      else if (content.includes('enemy') || content.includes('stand') || content.includes("care")) {
        msg.channel.send(copypasta.enemy);
        return;
      }
      else if (content.includes('heaven') || content.includes('priest') || content.includes("pope") || content.includes('papa')) {
        msg.channel.send(copypasta.heaven);
        return;
      }
      else if (content.includes('watch') || content.includes('jojo')) {
        msg.channel.send(copypasta.jojo);
        return;
      }
      else if (content.includes('door')) {
        let embed = new Discord.RichEmbed().setImage('https://i.imgur.com/Hi0YNft.png').setColor('#d7691a');
        msg.channel.send(embed);
        return;
      }
      else if (content.includes('yo') || content.includes('rock') || content.includes('angelo')) {
        let embed = new Discord.RichEmbed().setImage('https://i.imgur.com/NOOhJ9l.jpg').setColor('#8f8e8e');
        msg.channel.send(embed);
        return;
      }
      else if (content.includes('torture') || content.includes('dance')) {
        msg.channel.send('https://youtu.be/AQx_KMoCgJU');
        return;
      }
    }

    //Bot Mentioned
    if (msg.isMentioned('567136594495143987')) {
      await msg.react('603005282150383659');
      let trigger_chance = randomWhole(1,100);
      if (trigger_chance >= 71) {
        if (msg.content.includes('no') || msg.content.includes('ya') || msg.content.includes('u') || msg.content.includes('you') || msg.content.includes('kys')) {
          msg.channel.send('<:nou:571503160464637956>');
          return;
        }
        else if (msg.content.includes('fuck')) {
          msg.channel.send('<:KannaFu:571518019377823757>');
          return;
        }
        else if (msg.content.includes('tezk')) {
          msg.channel.send(`${msg.author} tezk enta`);
          return;
        }
      }
    }
    //F reaction
    if (msg.content == ('f') || msg.content == ('F') || msg.content.startsWith('Rip') || msg.content.startsWith('rip') || msg.content.startsWith('RIP')) {
      msg.channel.send('Press F to pay respects.').then(react => {
      react.react('580556814425260053');
    });
      return;
    }
    // sad reaction
    if (msg.content.includes('sad') || msg.content.includes('Sad') || msg.content.includes('cry') || msg.content.includes('Cry')) {
      msg.react('580556824848105477');
      return;
    }
    // Balbos Trigger
    if (msg.author.id == '264804785775968259') {
      const num = randomWhole(1,100);
      if (num >= 90 && num <= 100) {
        msg.channel.send('Hail Balbos The Almighty AI <:kapp:567347854390067236>');
      }
      return;
    }
    // Frost Trap Trigger
    if (msg.content.includes('t') && !msg.content.startsWith('!') && !msg.isMentioned('567136594495143987')) {
      const num = randomWhole(1,100);
      if (num >= 98 && num <= 100) {
        await msg.react('577249791113953292');
        await msg.channel.send(`**${msg.author.username}** walked into a trap <:Frosty:603005282234138624>`);
      }
      return;
    }
    // Balyz Trigger
    if (msg.content.includes('balyz')) {
      const num = randomWhole(1,100);
      if (num >= 50 && num <= 100) {
        msg.reply('tezk balyz! <:oilup:568181229233504276>');
      }
      return;
    }
    // Palese Trigger
    if (msg.content.includes('palese')) {
      const num = randomWhole(1,100);
      if (num >= 50 && num <= 100) {
        msg.reply('tezk palese! <:oilup:568181229233504276>');
      }
      return;
    }
    // Self Destruct
    if (msg.content.includes('kill me') || msg.content.includes('end me')) {
      let rng = randomWhole(1,100);
      if (rng >= 96) {
        let rng2 = randomWhole(1,2);
        const embed = new Discord.RichEmbed().setTitle(`${msg.author.username} Has self destructed`).setImage('https://media.giphy.com/media/Bloycira6ehGw/giphy.gif');
        const embed2 = new Discord.RichEmbed().setTitle(`${msg.author.username} Has self destructed`).setImage('https://media.giphy.com/media/dZw29nwrIPcv6/giphy.gif');
        switch (rng2) {
          case 1 : msg.channel.send(embed); break;
          case 2 : msg.channel.send(embed2); break;
        }
      }
      else if (rng >= 90) msg.channel.send('<:No:594137203500908566>');
    }
    // REEE trigger
    if (msg.content.includes('reee')) {
      msg.react('571496623624945664');
      return;
    }
    // Pls kill trigger
    if (msg.content.startsWith('pls kill')) {
      const num = randomWhole(1,100);
      if (num >= 60 && num <= 100) {
        msg.channel.send('<:KannaSip:572034399483461632>');
      }
      return;
    }
    // No u trigger
    if (msg.content.includes('fuck you') || msg.content.includes('fuck u') || msg.content.includes('fck u')) {
      let nou = randomWhole(1,100);
      if (nou > 50) msg.channel.send('no u');
      return;
    }
  }
});

bot.on('messageDelete' , deleted => {
  if (deleted.guild.id == '264824022775103498') {
    if (deleted.content == '' || deleted.author.bot == true) return;
    const deletedChannel = deleted.guild.channels.find(ch => ch.name == 'deleted-messages')

    const embed = new Discord.RichEmbed()
    .setAuthor(`${deleted.author.tag}'s deleted message` , `${deleted.author.avatarURL}`)
    .setDescription(`Message was written in '**${deleted.channel.name}**'`)
    .addField('Message Content' , `${deleted.content}`)
    .setThumbnail('https://i.imgur.com/iMJlH7t.png')
    .setColor('#e3eb3a')
    .setTimestamp();

    deletedChannel.send(embed);
  }
  else return;
})

bot.login(process.env.token);
