import { Message, MessageEmbed } from 'discord.js';
import messages from '../messages.json';

class SendPrint {
  public static async main(msg: Message) {
    try {
      if (msg.attachments.size < 1) {
        throw new Error('Você deve anexar uma imagem junto ao comando.');
      } else if (msg.attachments.size > 1) {
        throw new Error('Você deve anexar apenas uma imagem.');
      }
      const attach = msg.attachments.get(msg.attachments.firstKey() as string);
      const desc = (() => {
        const str = msg.content
          .slice(
            (msg.content.startsWith('/enviar') ? '/enviar' : '/send').length,
          )
          .trim()
          .toLowerCase()
          .normalize();
        return str.charAt(0).toUpperCase() + str.slice(1);
      })();
      if (
        // prettier-ignore
        (attach?.url as string).endsWith('.png')
        || (attach?.url as string).endsWith('.jpg')
        || (attach?.url as string).endsWith('.jpeg')
      ) {
        const approvalChannel = msg.client.channels.cache.get(
          messages.bot.image_approval_channel_id,
        );
        if (!approvalChannel) {
          throw new Error(
            '**ERRO INTERNO:** A ID do canal de aprovação de prints é inválida',
          );
        }
        const embed = new MessageEmbed()
          .setColor(messages.bot.color)
          .setTitle('Aguardando aprovação')
          .setAuthor(
            `Enviada por: ${msg.author.tag}`,
            msg.author.avatarURL() as string,
          )
          .setDescription(desc || 'Sem descrição')
          .setThumbnail(attach?.url as string)
          .setFooter(JSON.stringify({ id: msg.author.id }))
          .setTimestamp();
        approvalChannel
          .send(embed)
          .then((v) => {
            v.react('✅');
            v.react('❌');
          })
          .catch((err) => {
            msg.reply(err);
          });
        msg.reply(
          'Sua imagem foi enviada com sucesso e está aguardando aprovação.',
        );
      } else {
        throw new Error('Você só pode enviar imagens.');
      }
    } catch (err) {
      msg.reply(err.message);
    }
  }
}

export default SendPrint;
