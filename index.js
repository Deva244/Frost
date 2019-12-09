const Discord = require('discord.js');
const { Client , RichEmbed , Attachment } = require('discord.js');
const bot = new Discord.Client();
const fs = require('fs');
const Activity = require('./models/activity.js');
const mongoose = require('mongoose');
let dburl = process.env.DBLink;
console.log(dburl);
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

//Bot Mentioned
  if (msg.isMentioned('567136594495143987')) {
    await msg.react('603005282150383659');
    if (msg.content.includes('no') || msg.content.includes('ya') || msg.content.includes('u') || msg.content.includes('you') || msg.content.includes('kys')) {
      msg.channel.send('<:nou:571503160464637956>');
    }
    if (msg.content.includes('fuck')) {
      msg.channel.send('<:KannaFu:571518019377823757>');
    }
    if (msg.content.includes('tezk')) {
      msg.channel.send(`${msg.author} tezk enta`)
    }
  }
//F reaction
  if (msg.content == ('f') || msg.content == ('F') || msg.content.startsWith('Rip') || msg.content.startsWith('rip') || msg.content.startsWith('RIP')) {
    msg.channel.send('Press F to pay respects.').then(react => {
    react.react('580556814425260053');
  });
  }
// sad reaction
  if (msg.content.includes('sad') || msg.content.includes('Sad') || msg.content.includes('cry') || msg.content.includes('Cry')) {
    msg.react('580556824848105477');
  }
// Balbos Trigger
  if (msg.author.id == '264804785775968259') {
    const num = randomWhole(1,100);
    if (num >= 90 && num <= 100) {
      msg.channel.send('Hail Balbos The Almighty AI <:kapp:567347854390067236>');
    }
  }
// Frost Trap Trigger
  if (msg.content.includes('t') && !msg.content.startsWith('!') && !msg.isMentioned('567136594495143987')) {
    const num = randomWhole(1,100);
    if (num >= 90 && num <= 100) {
      await msg.react('577249791113953292');
      await msg.channel.send(`**${msg.author.username}** walked into a trap <:Frosty:603005282234138624>`);
    }
  }
// Balyz Trigger
  if (msg.content.includes('balyz')) {
    const num = randomWhole(1,100);
    if (num >= 50 && num <= 100) {
      msg.reply('tezk balyz! <:oilup:568181229233504276>');
    }
  }
// Palese Trigger
  if (msg.content.includes('palese')) {
    const num = randomWhole(1,100);
    if (num >= 50 && num <= 100) {
      msg.reply('tezk palese! <:oilup:568181229233504276>');
    }
  }
// Self Destruct
  if (msg.content.includes('kill me') || msg.content.includes('end me')) {
    let rng = randomWhole(1,100);
    if (rng >= 1 && rng < 90) {
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
  }
// Pls kill trigger
  if (msg.content.startsWith('pls kill')) {
    const num = randomWhole(1,100);
    if (num >= 30 && num <= 100) {
      msg.channel.send('<:KannaSip:572034399483461632>');
    }
  }
// No u trigger
  if (msg.content.includes('fuck you') || msg.content.includes('fuck u') || msg.content.includes('fck u')) {
    let nou = randomWhole(1,100);
    if (nou > 50) msg.channel.send('no u');
  }
  if (msg.content == 'opt') msg.channel.send("!opt in");
});

bot.on('messageDelete' , deleted => {
  if (deleted.guild.id == '264824022775103498') {
    if (deleted.content == '' || deleted.author.id == '213466096718708737') return;
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
