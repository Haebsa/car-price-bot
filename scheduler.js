const fs = require("fs");

const FILE = "lastSend.json";

function canSend(minutes) {

    let data = {};

    if (fs.existsSync(FILE)) {
        data = JSON.parse(fs.readFileSync(FILE));
    }

    const now = Date.now();

    if (!data.lastSend) {

        data.lastSend = now;

        fs.writeFileSync(FILE, JSON.stringify(data));

        return true;
    }

    const diff = (now - data.lastSend) / 60000;

    if (diff >= minutes) {

        data.lastSend = now;

        fs.writeFileSync(FILE, JSON.stringify(data));

        return true;
    }

    return false;

}

module.exports = { canSend };
