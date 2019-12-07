const Discord = require('discord.js');
const r6 = require('../jsonfiles/r6game.json');

module.exports.run = async (bot , msg ,args) => {

  let randomWhole = (min , max) => Math.floor(Math.random() * (max - min + 1)) + min;

  let user1 = msg.author;
  let user2 = msg.mentions.members.first().user;
  let attackers = r6.Attackers;
  let defenders = r6.Defenders;
  let gamemodes = r6.gamemodes;
  let maps = r6.maps;
  let objectives = r6.objective

  if (!args[0]) msg.channel.send('Please mention someone to play with.');

  // Game code

  if (args[0] && args[0] == user2 && args[0] != user1) {

    let map = 1;
    let mode_num = randomWhole(1,3);
    let obj_num = randomWhole(1,4);
    let drone = randomWhole(1,100);
    let won , lost;

    if (mode_num == 1 && map == 1) obj_num = randomWhole(1,3);

    msg.channel.send(`${user2} , ${user1} has challenged you to a game. Type 'y' to accept or 'n' to decline.`);

    const filter = m => m.author === user1; // Person to respond to the message
    msg.channel.awaitMessages(filter , {max:1 , time:15000 , errors:['time']})

    .then(async game => {

      if (game.first().content === 'y') {

        await msg.channel.send(`Setting up a game between **${user1.username}** and **${user2.username}**`)

        .then(operator_roll => {
          // 1st Player attacker roll
          p1_attacker = randomWhole(0,23)
          // 1st Player defender roll
          p1_defender = randomWhole(0,23)
          // 2nd Player attacker roll
          p2_attacker = randomWhole(0,23)
          // 2nd Player defender roll
          p2_defender = randomWhole(0,23)
        })

        // Game stats embed
        const gamestats = new Discord.RichEmbed()
        .setAuthor(`Game Between ${user1.username} and ${user2.username}`)
        .setTitle(`Map is **${maps[map]}**`)
        .setDescription(`Game Mode : **${gamemodes[mode_num]}**`)
        .setImage('https://i.imgur.com/4qVl5vP.jpg?2')
        .setThumbnail('https://i.imgur.com/HdmUVYQ.jpg')
        .setColor('#50d10c')
        .addField(`**${user1.username}'s Operators**` , `Attacker : **${attackers[p1_attacker]}** , Defender : **${defenders[p1_defender]}**`)
        .addField(`**${user2.username}'s Operators**` , `Attacker :** ${attackers[p2_attacker]}** , Defender : **${defenders[p2_defender]}**`);

        await msg.channel.send(gamestats)

        .then(round1 => {

          let attacker , defender;
          let objective = objectives[map][mode_num][obj_num];
          let entry = objectives[map][4];
          let entry_point = objectives[map][5];
          let enter = randomWhole(1,3);
          let Defend1 = {} , Attack1 = {};

          switch (players = randomWhole(1,2)) {
            case 1 : attacker = user2;
                     defender = user1;
                     msg.channel.send(`**${attacker.username}** is attacking first!`);
                     break;
            case 2 : attacker = user2;
                     defender = user1;
                     msg.channel.send(`**${attacker.username}** is attacking first!`);
                     break;
          }
          msg.channel.send('**ROUND1**')

          .then(async prep => {

            const object = new Discord.RichEmbed().setTitle('Objective').setDescription(`**${objective}**`).setColor('#fc8b28');

            await msg.channel.send('**PREP PHASE (20 SECS)**')

            .then(async defense => {

              await msg.channel.send(`*Sending DMs to **${defender.username}** to set up the defense*`);
              await defender.send(object);
              defender.send('What do you wanna do?\n1) **Anchor**\n2) **Roam**')

              .then(async defend => {

                filter2 = m => m.author === defender;
                await defend.channel.awaitMessages(filter2 , {max : 1 , time : 15000 , errors : 'time'})

                .then(async collected => {
                  if (collected.first().content == '1') {
                    Defend1.anchor = true;
                    Defend1.roam = false;
                    await defend.channel.send('You choose to **Anchor** in the objective');
                  }
                  else if (collected.first().content == '2') {
                    Defend1.anchor = false;
                    Defend1.roam = true;
                    await defend.channel.send(`You choose to **Roam**\nWhich floor do you want to stay at?\n1) **${entry[1]}**\n2) **${entry[2]}**\n3) **${entry[3]}**`);

                    defend.channel.awaitMessages(filter2 , {max : 1 , time : 15000 , errors : 'time'})

                    .then(collected => {
                      if (collected.first().content == '1') {
                        Defend1.roam_floor = entry[1];
                        defend.channel.send(`You are going to be roaming in the **${entry[1]}**`);
                      }
                      else if (collected.first().content == '2') {
                        Defend1.roam_floor = entry[2];
                        defend.channel.send(`You are going to be roaming on the **${entry[2]}**`);
                      }
                      else if (collected.first().content == '3') {
                        Defend1.roam_floor = entry[3];
                        defend.channel.send(`You are going to be roaming on the **${entry[3]}**`);
                      }

                    })
                    .catch(err => {
                      console.log(err);
                      defend.channel.send('Time ran out!')
                    })
                  }
                })
                .catch(err => {
                  console.log(err);
                  defend.channel.send('Time ran out!');
                })
              })
            })

            .then (async attack => {

              await msg.channel.send(`*Sending DMs to **${attacker.username}** to set up the attack*`);

              const basement = new Discord.RichEmbed().setTitle(`${entry[1]} entry points`).addField('1' , `**${entry_point[1][1]}**`).addField('2' , `**${entry_point[1][2]}**`)
              .setImage('https://i.imgur.com/lVe9Ovv.png');

              const floor1 = new Discord.RichEmbed().setTitle(`${entry[2]} entry points`).addField('1' , `**${entry_point[2][1]}**`).addField('2' , `**${entry_point[2][2]}**`)
              .addField('3' , `**${entry_point[2][3]}**`).addField('4' , `**${entry_point[2][4]}**`).addField('5' , `**${entry_point[2][5]}**`).setImage('https://i.imgur.com/zwIFSRV.png');

              const floor2 = new Discord.RichEmbed().setTitle(`${entry[3]} entry points`).addField('1' , `**${entry_point[3][1]}**`).addField('2' , `**${entry_point[3][2]}**`)
              .addField('3' , `**${entry_point[3][3]}**`).addField('4' , `**${entry_point[3][4]}**`).addField('5' , `**${entry_point[3][5]}**`).setImage('https://i.imgur.com/51bu0v0.png');

              if (drone > 20) { // Objective is found
                await defender.send(`**${attacker.username}** , You found the objective\n` , object);
              }
              else {
                await defender.send(`**${attacker.username}** , You didn't find the objective`);
              }
              await defender.send(`Where do you want to enter from?\n1) **${entry[1]}**\n2) **${entry[2]}**\n3) **${entry[3]}**`)

              .then(reply => {

                const filter3 = m => m.author == defender;
                reply.channel.awaitMessages(filter2 , {time:15000 , max:1 , errors:['time']})

                .then(async collected => {

                  if (collected.first().content === '1') {
                    Attack1.entry_floor = entry[1];
                    await reply.channel.send(`Entreing from **${entry[1]}**`);
                    await reply.channel.send('**Pick your entry point**' , basement);

                    reply.channel.awaitMessages(filter3 , {max: 1 , time: 15000 , errors: ['time']})

                    .then(async collected => {

                      if (collected.first().content === '1') {
                        Attack1.entryPoint = entry_point[1][1];
                        await reply.channel.send(`Entry point set to **${entry_point[1][1]}**`);
                      }
                      if (collected.first().content === '2') {
                        Attack1.entryPoint = entry_point[1][2];
                        await reply.channel.send(`Entry point set to **${entry_point[1][2]}**`);
                      }
                    })
                    .catch(async err => {
                      console.log(err);
                      await reply.channel.send('Time has ran out!');
                      await reply.channel.send('Random Entry point is set to **Garage**');
                    })
                  }

                  if (collected.first().content === '2') {
                    Attack1.entry_floor = entry[2];
                    await reply.channel.send(`Entry point is set to **${entry[2]}**`);
                    await reply.channel.send('**Pick your entry point**' , floor1);

                    reply.channel.awaitMessages(filter3 , {max: 1 , time: 15000 , errors: ['time']})

                    .then(async collected => {

                      if (collected.first().content === '1') {
                        Attack1.entryPoint = entry_point[2][1];
                        await reply.channel.send(`Entry Point set to **${entry_point[2][1]}**`);
                      }
                      if (collected.first().content === '2') {
                        Attack1.entryPoint = entry_point[2][2];
                        await reply.channel.send(`Entry Point set to **${entry_point[2][2]}**`);
                      }
                      if (collected.first().content === '3') {
                        Attack1.entryPoint = entry_point[2][3];
                        await reply.channel.send(`Entry Point set to **${entry_point[2][3]}**`);
                      }
                      if (collected.first().content === '4') {
                        Attack1.entryPoint = entry_point[2][4];
                        await reply.channel.send(`Entry Point set to **${entry_point[2][4]}**`);
                      }
                      if (collected.first().content === '5') {
                        Attack1.entryPoint = entry_point[2][5];
                        await reply.channel.send(`Entry Point set to **${entry_point[2][5]}**`);
                      }
                    })
                    .catch(async err => {
                      console.log(err);
                      await reply.channel.send('Time has ran out!');
                      await reply.channel.send('Random Entry point is set to **Back Entrance**');
                    })
                  }
                  if (collected.first().content === '3') {
                    Attack1.entry_floor = entry[3];
                    await reply.channel.send(`Entry point is set to **${entry[3]}**`);
                    await reply.channel.send('**Pick your entry point**' , floor2);

                    reply.channel.awaitMessages(filter3 , {max: 1 , time: 15000 , errors: ['time']})

                    .then(async collected => {

                      if (collected.first().content === '1') {
                        Attack1.entryPoint = entry_point[3][1];
                        await reply.channel.send(`Entry point set to **${entry_point[3][1]}**`);
                      }
                      if (collected.first().content === '2') {
                        Attack1.entryPoint = entry_point[3][2];
                        await reply.channel.send(`Entry point set to **${entry_point[3][2]}**`);
                      }
                      if (collected.first().content === '3') {
                        Attack1.entryPoint = entry_point[3][3];
                        await reply.channel.send(`Entry point set to **${entry_point[3][3]}**`);
                      }
                      if (collected.first().content === '4') {
                        Attack1.entryPoint = entry_point[3][4];
                        await reply.channel.send(`Entry point set to **${entry_point[3][4]}**`);
                      }
                      if (collected.first().content === '5') {
                        Attack1.entryPoint = entry_point[3][5];
                        await reply.channel.send(`Entry point set to **${entry_point[3][5]}**`);
                      }
                    }).catch(async err => {
                      console.log(err);
                      await reply.channel.send('Time has ran out!');
                      await reply.channel.send('Random Entry point is set to **Master Bedroom**');
                    })
                  }
                })
                .catch(async err => {
                  console.log(err);
                  await reply.channel.send('Time has ran out!');
                  await reply.channel.send('Picking a random entry point');
                  await reply.channel.send(`Random entry point is set to **${entry[enter]}**`);
                  reply.collection;
                })
              })
            })
            setTimeout(async prep_end => {
              if (drone > 20) await msg.channel.send(`**${attacker.username}** was able to find the objective.`);
              else msg.channel.send(`**${attacker.username}** couldn't find the objective in time.`);
              await msg.channel.send('Everything is set uo');
              await msg.channel.send('**PREP PHASE** is now over.');
              await msg.channel.send('**ACTION PHASE ( SECS)**');
            },16000)

          }).then(setTimeout(async action => {

            let p1Attacker = attackers[p1_attacker];
            let p2Defender = defenders[p2_defender];
            let round1_win;
            let def = randomWhole(1,100);
            let att = randomWhole(1,100);
            let att_dmg = randomWhole(1,100) , def_dmg = randomWhole(1,100);
            let att_hs = randomWhole(1,100) , def_hs = randomWhole(1,100);
            let Attacker = {} , Defender = {};

            await msg.channel.send(`**${attacker.username}** entered the building through **${Attack1.entryPoint}** - **${Attack1.entry_floor}**`);

            if (Defend1.anchor == true) {
              if (def > att) {
                if (def_dmg < 100 && def_hs < 80) {
                  await msg.channel.send(`**${attacker.username}** rushed the objective, got shot and lost **${def_dmg}** HP`);
                  Attacker.hp = 100 - def_dmg;
                  msg.channel.send(`**${attacker.username}** has **${Attacker.hp}** HP left!`);
                }
                else if (def_dmg == 100 || def_hs >= 80) {
                  await msg.channel.send(`**${attacker.username}** walked into the objective and got killed instantly! Nice.`);
                  round1_win = defender;
                  msg.channel.send(`**${defender.username}** Won the first round 🎉`);
                }
              }
              else if (att > def) {
                if (att_dmg < 100 && att_hs < 80) {
                  await msg.channel.send(`**${attacker.username}** managed to get a shot at **${defender.username}** and dealt **${att_dmg}** DMG`);
                  Defender.hp = 100 - att_dmg;
                  msg.channel.send(`**${defender.username}** has **${Defender.hp}** HP left`);
                }
                else if (att_dmg == 100 || att_hs >= 80) {
                  await msg.channel.send(`**${attacker.username}** got a shot at **${defender.username}** and killed them!`);
                  round1_win = attacker;
                  msg.channel.send(`**${attacker.username}** Won the first round 🎉`);
                }
              }
            }

            if (Defend1.roam == true) {

            }

          },28000))

        })
        .then(round2 => {

        })
        .then(round3 => {

        })

      } else if (collected.first().content == 'n') {
      msg.channel.send('The game request have been denied! <:FrostCry:580556824848105477>');
      }
  }).catch(err => {
    console.log(err);
    msg.channel.send('Time ran out! FeelsIgnoredMan')
  })

  }
  if (args[0] == user1) {
    await msg.channel.send("You can't play with yourself!\nKind of <:kapp:567347854390067236>");
  }else if (args[0] && args[0] != user2) {
    msg.channel.send('Who is that?!');
  }

}

module.exports.help = {
  name:'r6game'
}
