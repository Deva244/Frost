const Discord = require('discord.js');
const superagent = require('superagent');
const fetch = require('node-fetch');

module.exports.run = async (bot , msg , args) => {

  let userName = args[0];

  if (!args[0]) {
      msg.channel.send('Please enter a username!');
      return;
  }

  try {
    let apiUrl =`https://r6tab.com/api/search.php?platform=uplay&search=${userName}`;
    let {body} = await superagent.get(apiUrl);

    if (body.totalresults == 0) {
        msg.channel.send(`Couldn't find any player with the name **${args[0]}**.`);
        return;
      }
    
    let id = body.results[0].p_id;

    let idUrl = `https://r6tab.com/api/player.php?p_id=${id}`;
    let stats = fetch(idUrl)
    .then(res => {
    return res.json()
    }).then(json => {

      if (!json.matches || json.matches.length == 0) {
        msg.channel.send("Couldn't find any match history for that user.\nEither that user haven't played any matches recently or it hasn't registred in the API");
        return;
      } // error message incase no matches were found

      let matchCount = json.matches.length; // total amount of matches on the API
      let num = 0; // match numbers start from 0
      let avatar = `https://ubisoft-avatars.akamaized.net/${body.results[0].p_user}/default_146_146.png`; // getting the user profile picture


      let matches = new Discord.RichEmbed() // original embed to be sent on using the command
      .setColor('#050000')
      .setThumbnail('https://i.imgur.com/RpG9i03.jpg')
      .setAuthor(`${json.p_name}'s Match History` , `${avatar}`)
      .setFooter(`Page ${num + 1} of ${matchCount} - ${json.updatedon.split('<u>').join('</u>').split('</u>')}`)
      .setTimestamp()
      if (json.matches[num].casual_wlstatus && json.matches[num].ranked_wlstatus) {
        matches.setTitle(`Date : ${json.matches[num].casual_datatime}`)
        matches.addField('**Casual**' , 
        `**Games : **${json.matches[num].casual_winslost}
        **Kills : **${json.matches[num].db_p_total_casualkills}
        **Deaths : **${json.matches[num].db_p_total_casualdeaths}` , true);
        matches.addField('**Ranked**' , 
        `**Games : **${json.matches[num].ranked_winslost}
        **Kills : **${json.matches[num].db_p_total_rankedkills}
        **Deaths : **${json.matches[num].db_p_total_rankeddeaths}
        **Total headshots : **${json.matches[num].db_p_total_totalhs}` , true);
      }
      else if (json.matches[num].casual_wlstatus && !json.matches[num].ranked_wlstatus) {
        matches.setTitle(`Date : ${json.matches[num].casual_datatime}`)
        matches.addField('**Casual**' , 
        `**Games : **${json.matches[num].casual_winslost}
        **Kills : **${json.matches[num].db_p_total_casualkills}
        **Deaths : **${json.matches[num].db_p_total_casualdeaths}
        **Total headshots : **${json.matches[num].db_p_total_totalhs}`);
      }
      else if (!json.matches[num].casual_wlstatus && json.matches[num].ranked_wlstatus) {
        matches.setTitle(`Date : ${json.matches[num].ranked_datatime}`)
        matches.addField('**Ranked**' , 
        `**Games : **${json.matches[num].ranked_winslost}
        **Kills : **${json.matches[num].db_p_total_rankedkills}
        **Deaths : **${json.matches[num].db_p_total_rankeddeaths}
        **Total headshots : **${json.matches[num].db_p_total_totalhs}`);
      }
      
      msg.channel.send(matches) // sending the embed above

      .then(async react => {
        await react.react('⬅');
        await react.react('➡');
        next();
        function next() {
          const filter = (r , user) => user.id === msg.author.id && r.emoji.name === '➡' || r.emoji.name === '⬅';
          const collector = react.createReactionCollector(filter , {max : 1 , maxEmojis : 2 , maxUsers : 1 , time : 30000});
          collector.on('collect' , r => {
            if (r.emoji.name === '➡') {
              if ((num + 1) <= (matchCount - 1)) { // 'matchCount - 1' because matches starts from 0 & 'num + 1' because 'num' will be incremented by 1 in the if statement
                num += 1;
                let nxtMatch = new Discord.RichEmbed()
                .setColor('#050000')
                .setThumbnail('https://i.imgur.com/RpG9i03.jpg')
                .setAuthor(`${json.p_name}'s Match History` , `${avatar}`)
                .setFooter(`Page ${num + 1} of ${matchCount} - ${json.updatedon.split('<u>').join('</u>').split('</u>')}`)
                .setTimestamp()
                if (json.matches[num].casual_wlstatus && json.matches[num].ranked_wlstatus) {
                  nxtMatch.setTitle(`Date : ${json.matches[num].casual_datatime}`)
                  nxtMatch.addField('Casual' , 
                  `**Games : **${json.matches[num].casual_winslost}
                  **Kills : **${json.matches[num].db_p_total_casualkills}
                  **Deaths : **${json.matches[num].db_p_total_casualdeaths}` , true);
                  nxtMatch.addField('Ranked' , 
                  `**Games : **${json.matches[num].ranked_winslost}
                  **Kills : **${json.matches[num].db_p_total_rankedkills}
                  **Deaths : **${json.matches[num].db_p_total_rankeddeaths}
                  **Total headshots : **${json.matches[num].db_p_total_totalhs}` , true);
                }
                else if (json.matches[num].casual_wlstatus && !json.matches[num].ranked_wlstatus) {
                  nxtMatch.setTitle(`Date : ${json.matches[num].casual_datatime}`)
                  nxtMatch.addField('Casual' , 
                  `**Games : **${json.matches[num].casual_winslost}
                  **Kills : **${json.matches[num].db_p_total_casualkills}
                  **Deaths : **${json.matches[num].db_p_total_casualdeaths}
                  **Total headshots : **${json.matches[num].db_p_total_totalhs}`);
                }
                else if (!json.matches[num].casual_wlstatus && json.matches[num].ranked_wlstatus) {
                  nxtMatch.setTitle(`Date : ${json.matches[num].ranked_datatime}`)
                  nxtMatch.addField('Ranked' , 
                  `**Games : **${json.matches[num].ranked_winslost}
                  **Kills : **${json.matches[num].db_p_total_rankedkills}
                  **Deaths : **${json.matches[num].db_p_total_rankeddeaths}
                  **Total headshots : **${json.matches[num].db_p_total_totalhs}`);
                }
                react.edit(nxtMatch);
                next();
              }
              else if ((num + 1) > (matchCount - 1)) { // if num exceeds the match count start over
                num = 0;
                react.edit(matches);
                next();
              }
            }
            else if (r.emoji.name === '⬅') {
              if (num == 0) {
                num = (matchCount - 1);
                let nxtMatch = new Discord.RichEmbed()
                .setColor('#050000')
                .setThumbnail('https://i.imgur.com/RpG9i03.jpg')
                .setAuthor(`${json.p_name}'s Match History` , `${avatar}`)
                .setFooter(`Page ${num + 1} of ${matchCount} - ${json.updatedon.split('<u>').join('</u>').split('</u>')}`)
                .setTimestamp()
                if (json.matches[num].casual_wlstatus && json.matches[num].ranked_wlstatus) {
                  nxtMatch.setTitle(`Date : ${json.matches[num].casual_datatime}`)
                  nxtMatch.addField('Casual' , 
                  `**Games : **${json.matches[num].casual_winslost}
                  **Kills : **${json.matches[num].db_p_total_casualkills}
                  **Deaths : **${json.matches[num].db_p_total_casualdeaths}` , true);
                  nxtMatch.addField('Ranked' , 
                  `**Games : **${json.matches[num].ranked_winslost}
                  **Kills : **${json.matches[num].db_p_total_rankedkills}
                  **Deaths : **${json.matches[num].db_p_total_rankeddeaths}
                  **Total headshots : **${json.matches[num].db_p_total_totalhs}` , true);
                }
                else if (json.matches[num].casual_wlstatus && !json.matches[num].ranked_wlstatus) {
                  nxtMatch.setTitle(`Date : ${json.matches[num].casual_datatime}`)
                  nxtMatch.addField('Casual' , 
                  `**Games : **${json.matches[num].casual_winslost}
                  **Kills : **${json.matches[num].db_p_total_casualkills}
                  **Deaths : **${json.matches[num].db_p_total_casualdeaths}
                  **Total headshots : **${json.matches[num].db_p_total_totalhs}`);
                }
                else if (!json.matches[num].casual_wlstatus && json.matches[num].ranked_wlstatus) {
                  nxtMatch.setTitle(`Date : ${json.matches[num].ranked_datatime}`)
                  nxtMatch.addField('Ranked' , 
                  `**Games : **${json.matches[num].ranked_winslost}
                  **Kills : **${json.matches[num].db_p_total_rankedkills}
                  **Deaths : **${json.matches[num].db_p_total_rankeddeaths}
                  **Total headshots : **${json.matches[num].db_p_total_totalhs}`);
                }
                react.edit(nxtMatch);
                next();
              }
              else if (num > 0) {
                num -= 1;
                let nxtMatch = new Discord.RichEmbed()
                .setColor('#050000')
                .setThumbnail('https://i.imgur.com/RpG9i03.jpg')
                .setAuthor(`${json.p_name}'s Match History` , `${avatar}`)
                .setFooter(`Page ${num + 1} of ${matchCount} - ${json.updatedon.split('<u>').join('</u>').split('</u>')}`)
                .setTimestamp()
                if (json.matches[num].casual_wlstatus && json.matches[num].ranked_wlstatus) {
                  nxtMatch.setTitle(`Date : ${json.matches[num].casual_datatime}`)
                  nxtMatch.addField('Casual' , 
                  `**Games : **${json.matches[num].casual_winslost}
                  **Kills : **${json.matches[num].db_p_total_casualkills}
                  **Deaths : **${json.matches[num].db_p_total_casualdeaths}` , true);
                  nxtMatch.addField('Ranked' , 
                  `**Games : **${json.matches[num].ranked_winslost}
                  **Kills : **${json.matches[num].db_p_total_rankedkills}
                  **Deaths : **${json.matches[num].db_p_total_rankeddeaths}
                  **Total headshots : **${json.matches[num].db_p_total_totalhs}` , true);
                }
                else if (json.matches[num].casual_wlstatus && !json.matches[num].ranked_wlstatus) {
                  nxtMatch.setTitle(`Date : ${json.matches[num].casual_datatime}`)
                  nxtMatch.addField('Casual' , 
                  `**Games : **${json.matches[num].casual_winslost}
                  **Kills : **${json.matches[num].db_p_total_casualkills}
                  **Deaths : **${json.matches[num].db_p_total_casualdeaths}
                  **Total headshots : **${json.matches[num].db_p_total_totalhs}`);
                }
                else if (!json.matches[num].casual_wlstatus && json.matches[num].ranked_wlstatus) {
                  nxtMatch.setTitle(`Date : ${json.matches[num].ranked_datatime}`)
                  nxtMatch.addField('Ranked' , 
                  `**Games : **${json.matches[num].ranked_winslost}
                  **Kills : **${json.matches[num].db_p_total_rankedkills}
                  **Deaths : **${json.matches[num].db_p_total_rankeddeaths}
                  **Total headshots : **${json.matches[num].db_p_total_totalhs}`);
                }  
                react.edit(nxtMatch);
                next();
              }
            }
          })
        }
      })
    });

  }
  catch(err) {
    msg.channel.send('```' + err + '```');
  }
  
}

module.exports.help = {
    name:'mh'
}