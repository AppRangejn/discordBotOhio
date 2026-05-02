module.exports = {
    name: 'filter',
    aliases: [],
    category: 'Music',
    utilisation: '{prefix}filter [назва фільтра]',

    async execute(client, message, args) {
        if (!message || !message.member) return;

        if (!message.member.voice.channel) {
            return message.channel.send(`❌ - Чуєш, єблан, зайди в голосовий канал спочатку!`);
        }

        const botMember = message.guild.members.me;
        if (botMember.voice.channel && message.member.voice.channel.id !== botMember.voice.channel.id) {
            return message.channel.send(`❌ - Ти шо, даун? Я в іншому каналі, йди сюди!`);
        }

        const queue = client.player.nodes.get(message.guild.id);

        if (!queue || !queue.isPlaying()) {
            return message.channel.send(`❌ - Включи шось спочатку, нахуй!`);
        }

        if (!args[0]) {
            return message.channel.send(`❌ - Напиши назву фільтра! Спробуй: **bassboost, 8D, nightcore, reverse**`);
        }

        const filterName = args[0].toLowerCase();
        

        const filterExists = queue.filters.ffmpeg.isValidFilter(filterName);

        if (!filterExists) {
            return message.channel.send(`❌ - Такого фільтра нема. Спробуй: **bassboost, 8D, nightcore, vibrato**!`);
        }


        await queue.filters.ffmpeg.toggle(filterName);

        const isEnabled = queue.filters.ffmpeg.isEnabled(filterName);

        message.channel.send({
            content: isEnabled 
                ? `🎧 - Втулив фільтр **${filterName}**. Зараз музло перерахується...` 
                : `🎧 - Вирубив **${filterName}**. Повертаємо нормальний звук.`
        });
        
        message.react('✅').catch(() => null);
    },
};