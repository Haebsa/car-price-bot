const axios = require("axios");
const { RUBIKA_BOTS } = require("./config");

async function sendRubika(message) {

    for (const bot of RUBIKA_BOTS) {

        try {

            const url = `https://botapi.rubika.ir/v3/${bot.token}/sendMessage`;

            const response = await axios.post(
                url,
                {
                    chat_id: bot.chatId,
                    text: message
                },
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );

            console.log("✅ ارسال شد به:", bot.chatId);
            console.log(response.data);

        } catch (err) {

            console.log("❌ خطا در ارسال به:", bot.chatId);

            if (err.response) {
                console.log(err.response.data);
            } else {
                console.log(err.message);
            }

        }

    }

}

module.exports = {
    sendRubika
};
