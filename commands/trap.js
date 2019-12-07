const Discord = require('discord.js');

module.exports.run = async (bot , msg , args) => {

  let user1 = msg.author;
  let user2 = msg.mentions.members.first();

  let randomWhole = (min , max) => Math.floor(Math.random() * (max - min + 1)) + min;

  if (!args[0]) {
    msg.channel.send('Please mention someone to trap');
  }
  if (args[0] == 'me' || args[0] == user1) {
    msg.channel.send('You got trapped <:frosttrap:577249791113953292>');
  }
  if (args[0] && !user2) {
    msg.channel.send('Please mention someone to trap');
  }
  if (args[0] && user2 && args[0] != 'me' && args[0] != user1) {
    const rand = randomWhole(1,100);
    if (rand > 1 && rand <= 50) {
      await msg.channel.send(`${user2} got away`);
    }
    if (rand > 50 && rand <= 100) {
      await msg.channel.send(`**${user2}** got trapped <:frosttrap:577249791113953292>`).then(async react => {
        await react.channel.send('React with <:FrostF:580556814425260053> to attempt a rescue. You got 10 seconds!').then(react2 => {
          react2.delete(10000);
          react.react('580556814425260053')
        .then(reaction => {
          const filter = (r , user) => r.emoji.id === '580556814425260053' && user.id != '567136594495143987';
          react.awaitReactions(filter , {max : 1 , time : 10000 , errors : 'time'})
          .then(async collected => {
            await reaction.remove('567136594495143987'); // removes the bot reaction, using the user id
            reaction.fetchUsers(1).then(usersReacted => {
              let savior = usersReacted.first();
              let random = randomWhole(1,100);
              if (savior.id == user1.id) {
              msg.channel.send(`**${user1.username}** , you can't rescue the one u trapped smh`);
              }
              else if (random >= 1 && random < 90 && savior.id == user2.user) {
                msg.channel.send(`Heh , Nice try **${savior.username}** but no`);
              }
              else if (random >= 90 && random <= 100 && savior.id == user2.user) {
                msg.channel.send(`**${savior.username}** got up on his own!`);
              }
              else if (random >= 1 && random <= 20 && savior.id != user2.user) {
                msg.channel.send(`**${savior.username}** failed to save **${user2.user.username}**`);
              }
              else if (random > 20 && random <= 100 && savior.id != user2.user) {
                msg.channel.send(`**${savior.username}** saved **${user2.user.username}**`);
              }
            });
          }).catch(err => reaction.remove('567136594495143987'));
        });
      });
      });
    }
  }

}

module.exports.help = {
  name:'trap'
}
