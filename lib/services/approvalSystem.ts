import { MessageReaction, PartialUser, User } from 'discord.js';
import Print from '../database/entities/prints';

class ApprovalSystem {
  public static async main(
    reaction: MessageReaction,
    user: User | PartialUser,
  ) {
    if (reaction.emoji.name === '✅') {
      const { description, thumbnail, footer } = reaction.message.embeds[0];
      const data = {
        author: JSON.parse(footer?.text as string).id,
        description: description === 'Sem descrição' ? null : description,
        link: thumbnail?.url as string,
        approvedBy: user.id,
      };
      await Print.create(data);
      reaction.message.delete();
    } else if (reaction.emoji.name === '❌') {
      reaction.message.delete();
    }
  }
}

export default ApprovalSystem;
