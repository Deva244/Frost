const Discord = require('discord.js');
const r6 = require('../jsonfiles/r6data.json');

module.exports.run = (bot , msg, args) => {

  let operators = r6.operatordata;
  let op = args[0];
  let opName = op.toLowerCase();
  let opnum; // Number that represtents the operator

  if (!op) {
    msg.channel.send('Please enter the name of an operator!\ni.e <!opd ash>');
    return
  }

  try {
    switch(opName) { //Assigning numbers to operators
      case 'sledge' : opnum = 1; break;
      case 'thatcher' : opnum = 2; break;
      case 'smoke' : opnum = 3; break;
      case 'mute' : opnum = 4; break;
      case 'ash' : opnum = 5; break;
      case 'thermite' : opnum = 6; break;
      case 'castle' : opnum = 7; break;
      case 'pulse' : opnum = 8; break;
      case 'twitch' : opnum = 9; break;
      case 'montagne' : opnum = 10; break;
      case 'doc' : opnum = 11; break;
      case 'rook' : opnum = 12; break;
      case 'glaz' : opnum = 13; break;
      case 'fuze' : opnum = 14; break;
      case 'kapkan' : opnum = 15; break;
      case 'tachanka' : opnum = 16; break;
      case 'blitz' : opnum = 17; break;
      case 'iq' : opnum = 18; break;
      case 'jager' : opnum = 19; break;
      case 'bandit' : opnum = 20; break;
      case 'buck' : opnum = 21; break;
      case 'frost' : opnum = 22; break;
      case 'blackbeard' : opnum = 23; break;
      case 'valkyrie' : opnum = 24; break;
      case 'capitao' : opnum = 25; break;
      case 'caveira' : opnum = 26; break;
      case 'hibana' : opnum = 27; break;
      case 'echo' : opnum = 28; break;
      case 'jackal' : opnum = 29; break;
      case 'mira' : opnum = 30; break;
      case 'zofia' : opnum = 31; break;
      case 'ela' : opnum = 32; break;
      case 'ying' : opnum = 33; break;
      case 'lesion' : opnum = 34; break;
      case 'dokkaebi' : opnum = 35; break;
      case 'vigil' : opnum = 36; break;
      case 'lion' : opnum = 37; break;
      case 'finka' : opnum = 38; break;
      case 'maestro' : opnum = 39; break;
      case 'alibi' : opnum = 40; break;
      case 'maverick' : opnum = 41; break;
      case 'clash' : opnum = 42; break;
      case 'nomad' : opnum = 43; break;
      case 'kaid' : opnum = 44; break;
      case 'gridlock' : opnum = 45; break;
      case 'mozzie' : opnum = 46; break;
      case 'nokk' : opnum = 47; break;
      case 'warden' : opnum = 48; break;
      case 'amaru' : opnum = 49; break;
      case 'goyo' : opnum = 50; break;
      case 'kali' : opnum = 51; break;
      case 'wamai' : opnum = 52; break;
      case 'iana' : opnum = 53; break;
      case 'oryx' : opnum = 54; break;
    } 

    let ops = operators[opnum];

    const opd = new Discord.RichEmbed()
    .setAuthor(`${ops.nickname}`)
    .setTitle(`${ops.side}`)
    .setDescription('')
    .setImage(`${ops.image}`)
    .setThumbnail(`${ops.icon}`)
    .setColor(`${ops.color}`)
    .setTimestamp()
    .setFooter(`React with "L" to view ${ops.nickname}'s loadout`)
    .addField('Operator Name' , `**${ops.operatorname}**` , true)
    .addField('CTU' , `**${ops.ctu}**` , true)
    .addField('Date of Birth' , `**${ops.dob}**` , true)
    .addField('Place of Birth' , `**${ops.pob}**` , true)
    .addField('Height' , `**${ops.height}**` , true)
    .addField('Weight' , `**${ops.weight}**` , true)
    .addField('Price' , `**${ops.price}**` , true);

    msg.channel.send(opd)
    
    .then(async react => {
      await react.react('🇩');
      await react.react('🇱');
      next();
      function next() {
        const filter = (r , user) => user.id === msg.author.id && r.emoji.name === '🇱' || r.emoji.name === '🇩';
        const collector = react.createReactionCollector(filter , {max : 1 , maxEmojis : 1 , maxUsers : 1 , time : 30000 })
        collector.on('collect' , async r => {
          if (r.emoji.name == '🇱') {
            const loadout = new Discord.RichEmbed()
            .setTitle(`${ops.nickname}'s Loadout`)
            .setImage(`${ops.loadout}`)
            .setThumbnail(`${ops.icon}`)
            .setColor(`${ops.color}`)
            .setTimestamp()
            .setFooter('Loadouts are taken from Rainbow Six Wiki.')
            .addField('Armor' , `${ops.armor}` , true)
            .addField('Speed' , `${ops.speed}` , true);
            react.edit(loadout);
            next();
          }
          else if (r.emoji.name == '🇩') {
            react.edit(opd);
            next();
          }
        })
      };
    });

  }
  catch(err) {
   msg.channel.send(`Couldn't find any operator with the name "${op}", Please check the spelling!`);
  }
}

module.exports.help = {
  name:'opd'
}
