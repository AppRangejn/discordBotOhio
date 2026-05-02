module.exports = {
    name: 'random', 
    execute(client, message, args) { 
        if (args.length < 2) {
            return message.reply("❌ - Слишиш, треба вказати два числа: мінімум і максимум. Наприклад: `!random -100 500`.");
        }

        const num1 = parseInt(args[0]);
        const num2 = parseInt(args[1]);

        if (isNaN(num1) || isNaN(num2)) {
            return message.reply("❌ - Ти шо, цифри з буквами путаєш? Напиши нормальні числа!");
        }


        const min = Math.min(num1, num2);
        const max = Math.max(num1, num2);

        const result = Math.floor(Math.random() * (max - min + 1)) + min;
        
        message.reply(`🎲 На, тримай своє число з діапазону від **${min}** до **${max}**: **${result}**`);
    }
};