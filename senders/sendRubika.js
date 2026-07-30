const axios = require("axios");

// config.js را می‌خواند
const { RUBIKA_BOTS } = require("./config");

async function sendRubika(message) {

    for (const bot of RUBIKA_BOTS) {

        try {

            const url =
                `https://botapi.rubika.ir/v3/${bot.token}/sendMessage`;

            const res = await axios.post(url, {
                chat_id: bot.chatId,
                text: message
            });

            console.log(
                `✅ ارسال شد -> ${bot.chatId}`,
                res.data
            );

        } catch (err) {

            console.log(
                `❌ خطا برای ${bot.chatId}`
            );

            if (err.response)
                console.log(err.response.data);
            else
                console.log(err.message);

        }

    }

}

module.exports = { sendRubika };
