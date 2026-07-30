const axios = require("axios");

async function testIranJib() {
    try {
        const res = await axios.get("https://www.iranjib.ir/showgroup/45/");

        console.log("Status:", res.status);
        console.log("Length:", res.data.length);

        console.log(res.data.substring(0, 500));

    } catch (err) {
        console.error(err.message);
    }
}

testIranJib();
