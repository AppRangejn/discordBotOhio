module.exports = {
    name: 'search',
    aliases: ['sr'],
    category: 'Music',
    utilisation: '{prefix}search [назва/URL]',

    execute(client, message, args) {

        if (!message.member.voice.channel) {
            return message.channel.send(`${client.emotes.error} - Чуєш, єблан, зайди в голосовий канал спочатку!`);
        }


        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) {
            return message.channel.send(`${client.emotes.error} - Ти шо, даун? Я вже в іншому каналі сиджу, йди сюди!`);
        }


        if (!args[0]) {
            return message.channel.send(`${client.emotes.error} - Напиши назву пісні, нахуй, я ж не екстрасенс!`);
        }


        client.player.play(message, args.join(" "));
        

        message.react('✅');
    },
};