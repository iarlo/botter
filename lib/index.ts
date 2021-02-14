import 'dotenv/config';
import Discord from 'discord.js';
import messages from './messages.json';
import GetPlayerInfo from './services/getPlayerInfo';
import GetPrint from './services/getPrint';
import GetServerInfo from './services/getServerInfo';
import GetUserInfo from './services/getUserInfo';
import SendPrint from './services/sendPrint';
import sequelize from './database';
import GetHelp from './services/getHelp';
import ApprovalSystem from './services/approvalSystem';
import GetKissGif from './services/getKissGif';
import GetShootGif from './services/getShootGif';
import ChangeMyMind from './services/changeMyMind';

const client = new Discord.Client({
  partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.channels.cache
    .get(messages.bot.ready_channel_id)
    ?.send(
      messages.bot.ready[Math.floor(Math.random() * messages.bot.ready.length)],
    );
});

client.on('message', async (msg) => {
  if (msg.content.startsWith('/atirar') || msg.content.startsWith('/shoot')) {
    GetShootGif.main(msg);
  }
  if (
    // prettier-ignore
    msg.content.startsWith('/server')
    || msg.content.startsWith('/ip')
    || msg.content.startsWith('/servidor')
  ) {
    GetServerInfo.main(msg);
  }
  if (msg.content.startsWith('/regras') || msg.content.startsWith('/rules')) {
    GetServerInfo.getRules(msg);
  }
  if (msg.content.startsWith('/player') || msg.content.startsWith('/jogador')) {
    GetPlayerInfo.main(msg);
  }
  if (msg.content.startsWith('/avatar')) {
    GetUserInfo.main(msg);
  }
  if (msg.content.startsWith('/mmm') || msg.content.startsWith('/cmm')) {
    ChangeMyMind.main(msg);
  }
  if (msg.content.startsWith('/print') || msg.content.startsWith('/prints')) {
    GetPrint.main(msg);
  }
  if (msg.content.startsWith('/beijar') || msg.content.startsWith('/kiss')) {
    GetKissGif.main(msg);
  }
  if (msg.content.startsWith('/enviar') || msg.content.startsWith('/send')) {
    SendPrint.main(msg);
  }
  if (msg.content.startsWith('/ajuda') || msg.content.startsWith('/help')) {
    GetHelp.main(msg);
  }
});

client.on('messageReactionAdd', async (reaction, user) => {
  if (reaction.message.channel.id === messages.bot.image_approval_channel_id) {
    if (!user.bot) {
      try {
        await reaction.fetch();
        await ApprovalSystem.main(reaction, user);
      } catch (err) {
        reaction.message.channel.send(`**ERRO INTERNO:** ${err}`);
      }
    }
  }
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    client.login(process.env.DISCORD_TOKEN);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();
