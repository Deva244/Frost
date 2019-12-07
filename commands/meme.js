const Discord = require('discord.js');
const superagent = require('superagent');

module.exports.run = async (bot , msg , args) => {

  try {

    let url = 'https://www.reddit.com/r/shittyrainbow6/hot.json';
    let {body} = await superagent.get(url);

    let random = Math.floor(Math.random() * body.data.dist);

    let api = body.data.children[random].data;

    if (api.is_reddit_media_domain == 'false') random =+ 1;
    if (api.is_video == 'true') random =+ 1;
    if (api.title == "IN-GAME SCREENSHOTS AREN'T MEMES") random =+ 1;

    const embed = new Discord.RichEmbed()
    .setTitle(`${api.title}`)
    .setImage(api.url)
    .setFooter(`⬆ ${api.score} ⬇ 💬 ${api.num_comments}`)
    .setURL(`https://www.reddit.com${api.permalink}`)
    .setColor('#9e5611')
    .setTimestamp();

    msg.channel.send(embed);

  }
  catch(err) {
    console.log(err);
  }
}

module.exports.help = {
  name:'meme'
}
