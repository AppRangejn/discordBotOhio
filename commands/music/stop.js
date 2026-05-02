module.exports = {
    name: 'stop',
    aliases: ['dc'],
    category: 'Music',
    execute: async (client, message) => {
        if (!message.member.voice.channel) return message.channel.send(`❌ - Зайди в канал!`);

        const queue = client.player.nodes.get(message.guild.id);

        if (!queue || !queue.isPlaying()) {
            return message.channel.send(`❌ - Я і так нічого не граю!`);
        }

        queue.delete();
        
        message.channel.send(`🛑 - Музло зупинено. Puzo Gang відпочиває.`);
        message.react('🛑');
    },
};