const { QueryType } = require('discord-player');

module.exports = {
    name: 'play',
    aliases: ['p'],
    category: 'Music',
    execute: async (client, message, args) => {

        if (!message.member.voice.channel) {
            return message.channel.send(`❌ - Зайди в канал, єблан!`);
        }


        if (!args[0]) {
            return message.channel.send(`❌ - Шо мені грати? Стіни?`);
        }

        const query = args.join(' ');
        

        let searchEngine = QueryType.AUTO;
        if (query.includes('youtube.com/watch') || query.includes('youtu.be/')) {
            searchEngine = QueryType.YOUTUBE_VIDEO;
        } else if (query.includes('youtube.com/playlist')) {
            searchEngine = QueryType.YOUTUBE_PLAYLIST;
        } else if (query.includes('spotify.com')) {
            searchEngine = QueryType.SPOTIFY_SONG;
        }

        try {

            const { track } = await client.player.play(message.member.voice.channel, query, {
                nodeOptions: {
                    metadata: message, 
                    leaveOnEmpty: false, 
                    leaveOnEnd: false,
                    leaveOnStop: false,
                    bufferingTimeout: 5000, 
                    selfDeaf: true,
                    volume: 80,

                    requestedBy: message.author 
                },
                searchEngine: searchEngine, 
                requestedBy: message.author,

                audioPlayerOptions: {
                    highWaterMark: 1 << 25
                }
            });

            return message.channel.send(`✅ - Додав у чергу: **${track.title}**`);

        } catch (e) {
            console.error(`[Play Error] ${e.message}`);


            if (e.message.includes('Extractor: N/A')) {
                return message.channel.send(`❌ - Бот не вдуплив, шо це за посилання. Спробуй просто написати назву пісні текстом!`);
            }

            if (e.message.includes('Could not extract stream')) {
                return message.channel.send(`❌ - YouTube заблокував стрім (403). Юзай назву треку, а не лінк.`);
            }

            if (e.name === 'NoResultError' || e.message.includes('No results found')) {
                return message.channel.send(`❌ - Нічого не знайшов за запитом: **${query}**`);
            }

            return message.channel.send(`❌ - Сталася якась хуйня! Глянь в термінал.`);
        }
    },
};