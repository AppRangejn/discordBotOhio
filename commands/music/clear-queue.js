module.exports = {
    name: 'clear-queue',
    aliases: ['cq'],
    category: 'Music',
    utilisation: '{prefix}clear-queue',

    execute(client, message, args) { 
  
        if (!message.member.voice.channel) {
            return message.channel.send(`❌ - Чуєш, єблан, зайди в голосовий канал спочатку!`);
        }


        const botMember = message.guild.members.me;
        if (botMember.voice.channel && message.member.voice.channel.id !== botMember.voice.channel.id) {
            return message.channel.send(`❌ - Ти шо, даун? Я в іншому каналі, йди сюди!`);
        }


        const queue = client.player.nodes.get(message.guild.id);

        if (!queue || !queue.isPlaying()) {
            return message.channel.send(`❌ - В черзі порожньо, як у холодильнику Ілюшки!`);
        }


        if (queue.tracks.size === 0) {
            return message.channel.send(`❌ - В черзі тільки одна пісня, нема чого чистити, нахуй.`);
        }

        // 5. Чистимо чергу
        queue.tracks.clear();

        message.channel.send(`✅ - Черга музла для Puzo Gang зачищена під нуль!`);
        message.react('✅').catch(() => null);
    },
};