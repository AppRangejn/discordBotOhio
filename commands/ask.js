const { askGemini } = require('../gemini');

module.exports = {
    name: 'ask', 
    async execute(client, message, args) { 
        const prompt = args.join(' ');
        if (!prompt) return message.reply("Шо спитать хотів?");

        try {
            await message.channel.sendTyping();
            const text = await askGemini(prompt);
            message.reply(text.length > 2000 ? text.substring(0, 1990) + "..." : text);
        } catch (error) {
            console.error(error);
            message.reply("Помилка нейронки.");
        }
    }
};