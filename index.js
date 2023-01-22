const { Client, EmbedBuilder, GatewayIntentBits } = require('discord.js');
const samp = require('samp-query');


const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessages

  ]
});



async function run(client) {
  const ip = "play.apexroleplay.in:5555".split(':');
  const options = {
      host: ip[0],
      port: ip[1] || 7777
  };


  await samp(options, (error, query) => {

    if (error) {
      console.log(error)
      const cutomembed = new EmbedBuilder()
        .setAuthor({name : 'APEX ROLEPLAY | SERVER STATUS', iconURL : 'https://cdn.discordapp.com/icons/966350920172597288/7e19fdcf526e5ff312d06dd37ef5766e.png?size=2048'})
        .addFields(
          { name: '__Server Status__', value: `Offline`, inline: true },
          { name: '__Players__', value: `0/350`, inline: true },
          { name: '__In-game Time__', value: `00:00`, inline: true },
          { name: '__Server-ip__', value: `play.apexroleplay.in:5555`, inline: true },
          { name: '__Language__', value: `Malayalam`, inline: true },
          { name: 'Connecting Issue', value: `<#966354834443886622>`, inline: true },)
        .setColor("#36393e")
        .setFooter({ text: 'Anandhu#1096   | Server Status' });
      const channel = client.channels.cache.get('1025986215067009044');
      if (!channel || !channel.messages) return;
      channel.messages.fetch('1066603483261841468').then(message => {

        if (message.editable) {

          message.edit({ embeds: [cutomembed] });
        }
      });
    }
    else {

      const cutomembed = new EmbedBuilder()
        .setAuthor({name : 'APEX ROLEPLAY | SERVER STATUS', iconURL : 'https://cdn.discordapp.com/icons/966350920172597288/7e19fdcf526e5ff312d06dd37ef5766e.png?size=2048'})
        .addFields(
          { name: '__Server Status__', value: `Online`, inline: true },
          { name: '__Players__', value: `${query['online'] || 0}/${query['maxplayers'] || 0}`, inline: true },
          { name: '__In-game Time__', value: query['rules']['worldtime'], inline: true },
          { name: '__Server-ip__', value: `play.apexroleplay.in:5555`, inline: true },
          { name: '__Language__', value: `Malayalam`, inline: true },
          { name: '__Connecting Issue__', value: `<#966354834443886622>`, inline: true },
        )
        .setColor("#36393e")
        .setFooter({ text: 'Anandhu#1096   | Server Status' });
      const channel = client.channels.cache.get('1025986215067009044');
      if (!channel || !channel.messages) return;
      channel.messages.fetch('1066603483261841468').then(message => {
        if (message.editable) {

          message.edit({ embeds: [cutomembed] });
        }
      }).catch(console.error);
    }
  });
}






client.on('ready' , async () =>{
  console.log(`Logged in as ${client.user.tag}!`);
    
    setInterval(() => {
    run(client);
  }, 10000);
  
})



client.login("MTA2NjI1OTA1MjAzMzc0MDgwMg.GgaYYI.1VpuIT8rpHIm6qEOOVpR2lqp9CIYl3BxClgUnc");