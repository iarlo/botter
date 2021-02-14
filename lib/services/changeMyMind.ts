import { Message, MessageAttachment, MessageEmbed } from 'discord.js';
import Canvas from 'canvas';
import messages from '../messages.json';

class ChangeMyMind {
  public static async main(msg: Message) {
    try {
      const content = msg.content
        .slice((msg.content.startsWith('/cmm') ? '/cmm' : '/mmm').length)
        .trim()
        .toLowerCase();

      if (content.length >= 64) {
        throw new Error('Você deve enviar no máximo, 63 caractéres');
      }

      const canvas = await Canvas.createCanvas(735, 627);
      const ctx = canvas.getContext('2d');

      const background = await Canvas.loadImage(
        './lib/services/images/mmm.jpg',
      );

      ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
      ctx.font = '30px sans-serif';
      ctx.fillStyle = '#000000';
      ctx.rotate(-0.391);
      ctx.fillText(
        content.replace(/(.{21})/g, (v) => `${v}\n`),
        canvas.width / 4.7,
        canvas.height / 1.17,
      );
      const attachment = new MessageAttachment(
        canvas.toBuffer(),
        'mudeMinhaMente.png',
      );
      return msg.reply({
        embed: new MessageEmbed()
          .setColor(messages.bot.color)
          .setAuthor(messages.bot.name, messages.bot.avatar)
          .setImage('attachment://mudeMinhaMente.png'),
        files: [attachment],
      });
    } catch (err) {
      return msg.reply(err.message);
    }
  }
}

export default ChangeMyMind;
