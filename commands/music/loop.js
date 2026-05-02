module.exports = {
    name: 'loop',
    aliases: ['lp', 'repeat'],
    category: 'Music',
    utilisation: '{prefix}loop',

    execute(client, message, args) {

        if (!message.member.voice.channel) {
            return message.channel.send(`❌ - Чуєш, єблан, зайди в голосовий канал спочатку!`);
        }


        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) {
            return message.channel.send(`❌ - Ти шо, даун? Я в іншому каналі, йди сюди!`);
        }


        const queue = client.player.getQueue(message);
        if (!queue) {
            return message.channel.send(`❌ - В черзі порожньо, нема чого крутити по колу!`);
        }


        if (args.join(" ").toLowerCase() === 'queue') {
            if (queue.loopMode) {
                client.player.setLoopMode(message, false);
                return message.channel.send(`✅ - Вирубив повтор черги. Тепер граєм як люди.`);
            } else {
                client.player.setLoopMode(message, true);
                return message.channel.send(`✅ - Втулив повтор всієї черги. Будем слухати цей список вічно!`);
            }
        } else {

            if (queue.repeatMode) {
                client.player.setRepeatMode(message, false);
                return message.channel.send(`✅ - Режим повтору однієї пісні вирублено.`);
            } else {
                client.player.setRepeatMode(message, true);
                message.react('✅');
                return message.channel.send(`✅ - Тепер цей трек буде хуярити по колу нескінченно!`);
            }
        }
    },
};