const Discord = require('discord.js');
const superagent = require('superagent');
const r6 = require('../jsonfiles/r6data.json');

module.exports.run = async (bot , msg , args) => {

  let ranks = r6.rank;
  let region , platform;

  switch(args[0]) { // list of regions
    case 'eu' : region = 'p_EU_currentmmr'; break;
    case 'na' : region = 'p_NA_currentmmr'; break;
    case 'as' : region = 'p_AS_currentmmr'; break;
    case 'g' : region = 'p_currentmmr'; break;
    default : region = 'p_currentmmr'; break;
  }
  switch(args[1]) { // list of platforms
    case 'ps' : platform = 'psn'; break;
    case 'xb' : platform = 'xbl'; break;
    default : platform = 'uplay'; break;
  }
  let platform2 = { // beautifying the platforms' names to use in embed
    "psn" : "PS",
    "uplay" : "PC",
    "xbl" : "Xbox"
  }
  let region2 = { // beautifying the regions' names to use in embed
    "p_currentmmr" : "Global",
    "p_EU_currentmmr" : "EU",
    "p_NA_currentmmr" : "NA",
    "p_AS_currentmmr" : "AS"
  }
  try {
    let apiUrl = `https://r6tab.com/api/leaderboards.php?sortplatform=${platform}&sortregion=${region}`;
    let {body} = await superagent.get(apiUrl);

    let num = 0 , num2 = 1;
    let playerCount = body.length;

    let embed = new Discord.RichEmbed()
    .setColor('#050000')
    .setTitle(`Top 10 players , ${region2[region]} ranking on ${platform2[platform]}`)
    .setDescription('**Ranking is based on MMR**')
    .setFooter(`Page ${num2} of 10`)
    .setTimestamp()
    .setThumbnail('https://i.imgur.com/RpG9i03.jpg')
    for (let i = 0 ; i < 10 ; i++) {
      if (body[num].p_currentmmr >= 4500 || body[num].p_maxmmr >= 4500) {
        body[num].p_maxrank = 21;
        body[num].p_currentrank = 21;
      }
      embed.addField(body[num].position + ' - ' + body[num].p_name , '**Level: **' + body[num].p_level + ' - ' + '**K/D: **' + (body[num].kd / 100)
      + ' - ' + '**Rank: **' + ranks[body[num].p_currentrank] + ` **${body[num].p_currentmmr}**`);
      num += 1;
    }

    msg.channel.send(embed)

    .then(async react => {
      await react.react('⬅');
      await react.react('➡');
      next();
      function next() {
        const filter = (r , user) => user.id === msg.author.id && r.emoji.name === '➡' || r.emoji.name === '⬅';
        const collector = react.createReactionCollector(filter , {max : 1 , maxEmojis : 2 , maxUsers : 1 , time : 30000})
        collector.on('collect' , r => {
          if (r.emoji.name == '➡') {
            if (num <= (playerCount - 1)) {
              num2 += 1;
              let newEmbed = new Discord.RichEmbed()
              .setColor('#050000')
              .setTitle(`Top 10 players , ${region2[region]} ranking on ${platform2[platform]}`)
              .setDescription('**Ranking is based on MMR**')
              .setFooter(`Page ${num2} of 10`)
              .setTimestamp()
              .setThumbnail('https://i.imgur.com/RpG9i03.jpg')
              for (let i = 0 ; i < 10 ; i++) {
                if (body[num].p_currentmmr >= 4500 || body[num].p_maxmmr >= 4500) {
                  body[num].p_maxrank = 21;
                  body[num].p_currentrank = 21;
                }
                newEmbed.addField(body[num].position + ' - ' + body[num].p_name , '**Level: **' + body[num].p_level + ' - ' + '**K/D: **' + (body[num].kd / 100)
                + ' - ' + '**Rank: **' + ranks[body[num].p_currentrank] + ` **${body[num].p_currentmmr}**`);
                num += 1;
              }
              react.edit(newEmbed);
              next();
            }
            else if (num > (playerCount - 1)) {
              num = 10;
              num2 = 1;
              react.edit(embed);
              next();
            }
          }
          else if (r.emoji.name == '⬅') {
            if (num2 > 1) {
              num -= 20;
              num2 -= 1;
              let newEmbed = new Discord.RichEmbed()
              .setColor('#050000')
              .setTitle(`Top 10 players , ${region2[region]} ranking on ${platform2[platform]}`)
              .setDescription('**Ranking is based on MMR**')
              .setFooter(`Page ${num2} of 10`)
              .setTimestamp()
              .setThumbnail('https://i.imgur.com/RpG9i03.jpg')
              for (let i = 0 ; i < 10 ; i++) {
                if (body[num].p_currentmmr >= 4500 || body[num].p_maxmmr >= 4500) {
                  body[num].p_maxrank = 21;
                  body[num].p_currentrank = 21;
                }
                newEmbed.addField(body[num].position + ' - ' + body[num].p_name , '**Level: **' + body[num].p_level + ' - ' + '**K/D: **' + (body[num].kd / 100)
                + ' - ' + '**Rank: **' + ranks[body[num].p_currentrank] + ` **${body[num].p_currentmmr}**`);
                num += 1;
              }
              react.edit(newEmbed);
              next();
            }
            else if (num2 == 1) {
              num = playerCount - 10;
              num2 += 9;
              let newEmbed = new Discord.RichEmbed()
              .setColor('#050000')
              .setTitle(`Top 10 players , ${region2[region]} ranking on ${platform2[platform]}`)
              .setDescription('**Ranking is based on MMR**')
              .setFooter(`Page ${num2} of 10`)
              .setTimestamp()
              .setThumbnail('https://i.imgur.com/RpG9i03.jpg')
              for (let i = 0 ; i < 10 ; i++) {
                if (body[num].p_currentmmr >= 4500 || body[num].p_maxmmr >= 4500) {
                  body[num].p_maxrank = 21;
                  body[num].p_currentrank = 21;
                }
                newEmbed.addField(body[num].position + ' - ' + body[num].p_name , '**Level: **' + body[num].p_level + ' - ' + '**K/D: **' + (body[num].kd / 100)
                + ' - ' + '**Rank: **' + ranks[body[num].p_currentrank] + ` **${body[num].p_currentmmr}**`);
                num += 1;
              }
              react.edit(newEmbed);
              next();
            }
          }
        })
      }
    });

  }
  catch(err) {
    msg.channel.send('```' + err + '```');
  }

}

module.exports.help = {
  name:'top'
}
