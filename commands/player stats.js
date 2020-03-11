const Discord = require('discord.js');
const superagent = require('superagent');
const fetch = require('node-fetch');
const r6 = require('../jsonfiles/r6data.json');

module.exports.run = async (bot , msg , args) => {

  let rank = r6.rank;
  let op = r6.operators;

  let userName = msg.content.slice(7);

  if (!args[0]) {
    msg.channel.send('Please Enter a username!')
    return;
  }

  try {
    let apiUrl =`https://r6tab.com/api/search.php?platform=uplay&search=${userName}`;
    let {body} = await superagent.get(apiUrl);

    if (body.totalresults == 0) {
      msg.channel.send(`Couldn't find any player with the name **${args[0]}**.`);
      return;
    }

    id = body.results[0].p_id;

    let url = `https://r6tab.com/api/player.php?p_id=${id}`;
    let stats = fetch(url);
    stats.then((res) => {
      return res.json();
    }).then((json) => {

      if (json.p_currentmmr >= 4500 || json.p_maxmmr >= 4500) {
        json.p_maxrank = 21;
        json.p_currentrank = 21;
      }

      let embed = new Discord.RichEmbed()
      .setColor('#050000')
      .setAuthor(`${json.p_name}'s stats`)
      .setTitle('Full Info')
      .setURL('https://r6tab.com/' + id)
      .setFooter(`All stats are from R6Tab.com - ${json.updatedon.split('<u>').join('</u>').split('</u>')}`)
      .setThumbnail(`https://ubisoft-avatars.akamaized.net/${body.results[0].p_user}/default_146_146.png`)
      .setTimestamp()
      .addField('Level' , `**${json.p_level}**` , true)
      .addField('<:attacker:592295684141481985> Favorite Attacker' , `**${op[json.favattacker]}**` , true)
      .addField('<:defender:592295683902537730> Favorite Defender' , `**${op[json.favdefender]}**` , true)
      .addField("Total Time Played" , (json.data[5] / 60 / 60 + json.data[0] / 60 / 60).toFixed(2) + ' Hours' , true)
      .addField("Casual Play Time" , (json.data[5] / 60 / 60).toFixed(2) + ' Hours' , true)
      .addField("Ranked Play Time" , (json.data[0] / 60 / 60).toFixed(2) + ' Hours' , true)
      .addField('📋 General stats' ,
        'Headshots : ' + json.data[17]
        + '\nHS Accuaracy : ' + (json.data[17] / (json.data[1] + json.data[6]) * 100).toFixed(2) + ' %'
        + '\nMelees : ' + json.data[18]
        + '\nRevives : ' + json.data[19]
        + '\nSuicides : ' + json.data[20]
        + '\nK/D : ' + ((json.data[6] + json.data[1]) / (json.data[7] + json.data[2])).toFixed(2)
        + '\nW/L : ' + ((json.data[8] + json.data[3]) / (json.data[9] + json.data[4])).toFixed(2) , true)
      .addField('<:casual:611631719866695688> Casual stats' ,
        'Games : ' + (json.data[8] + json.data[9])
        + '\nWins : ' + json.data[8]
        + '\nLosses : ' + json.data[9]
        + '\nKills : ' + json.data[6]
        + '\nDeaths : ' + json.data[7]
        + '\nK/D : ' + (json.data[6] / json.data[7]).toFixed(2)
        + '\nW/L : ' + (json.data[8] / json.data[9]).toFixed(2) , true)
      .addField('Ranked stats' ,
          'Games : ' + (json.data[3] + json.data[4])
          + '\nWins : ' + json.data[3]
          + '\nLosses : ' + json.data[4]
          + '\nKills : ' + json.data[1]
          + '\nDeaths : ' + json.data[2]
          + '\nK/D : ' + (json.data[1] / json.data[2]).toFixed(2)
          + '\nW/L : ' + (json.data[3] / json.data[4]).toFixed(2), true)
      .addField('💣 Bomb stats' ,
        'Games : ' + (json.data[10] + json.data[11])
        + '\nWins : ' + json.data[10]
        + '\nLosses : ' + json.data[11]
        + '\nW/L : ' + (json.data[10] / json.data[11]).toFixed(2) , true)
      .addField('🛡 Secure Area stats' ,
        'Games : ' + (json.data[12] + json.data[13])
        + '\nWins : ' + json.data[12]
        + '\nLosses : ' + json.data[13]
        + '\nW/L : ' + (json.data[12] / json.data[13]).toFixed(2) , true)
      .addField('🤵🏽 Hostage stats' ,
        'Games : ' + (json.data[14] + json.data[15])
        + '\nWins : ' + json.data[14]
        + '\nLosses : ' + json.data[15]
        + '\nW/L : ' + (json.data[14] / json.data[15]).toFixed(2) , true)
        .addBlankField()
        .addField('Past Seasons Rank' ,
        '**Health : **' + rank[json.season6rank] + ' ' + json.season6mmr
        + '\n**Blood Orchid : **' + rank[json.season7rank] + ' ' + json.season7mmr
        + '\n**White Noise : **' + rank[json.season8rank] + ' ' + json.season8mmr
        + '\n**Chimera : **' + rank[json.season9rank] + ' ' + json.season9mmr
        + '\n**Para Bellum : **' + rank[json.season10rank] + ' ' + json.season10mmr
        + '\n**Grim Sky : **' + rank[json.season11rank] + ' ' + json.season11mmr
        + '\n**Wind Bastion : **' + rank[json.season12rank] + ' ' + json.season12mmr
        + '\n**Burnt Horizon : **' + rank[json.season13rank] + ' ' + json.season13mmr
        + '\n**Phantom Sight : **' + rank[json.season14rank] + ' ' + json.season14mmr
        + '\n**Ember Rise : **' + rank[json.season15rank] + ' ' + json.season15mmr
        + '\n**Shifting Tides : **' + rank[json.season16rank] + ' ' + json.season16mmr , true)
        .addField('Current Season Ranking' ,
        '**Current Rank : **' + rank[json.p_currentrank] + " " + json.p_currentmmr
        + '**\nMax Rank : **' + rank[json.p_maxrank] + " " + json.p_maxmmr , true);

      msg.channel.send(embed);
    });

  }
  catch(err) {
    msg.channel.send('```' + err + '```');
  }
  
}

module.exports.help = {
  name: 'stats'
}
