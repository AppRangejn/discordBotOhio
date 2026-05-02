module.exports = {
    name: 'who', 
    async execute(client, message, args) { 
        const question = args.join(' ');
        if (!question) return message.reply("Ти шо, даун? Напиши питання після !who");

        try {
            const members = await message.guild.members.fetch();
            const randomUser = members.filter(m => !m.user.bot).random();
            
            message.reply(`🎯 Я блять впевнений, що **${question}** — це <@${randomUser.id}>`);
        } catch (e) {
            console.error(e);
            message.reply("Не зміг знайти жертву.");
        }
    }
};