const axios = require("axios");
const config = require("../config");

async function sendRubika(message) {

    for (const bot of config.rubika) {

        const finalMessage =
            message +
            "\n━━━━━━━━━━━━\n📢 " +
            bot.channel;

        const url = `https://botapi.rubika.ir/v3/${bot.token}/sendMessage`;

        try {

            const res = await axios.post(url, {
                chat_id: bot.chatId,
                text: finalMessage
            });

            console.log("✅ Rubika:");
            console.log(res.data);

        } catch (err) {

            console.log("❌ Rubika Error:");

            if (err.response) {
                console.log(err.response.data);
            } else {
                console.log(err.message);
            }

        }

    }

}

module.exports = { sendRubika };
