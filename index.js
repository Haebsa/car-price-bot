const axios = require("axios");
const cheerio = require("cheerio");

async function inspect() {
    const { data } = await axios.get("https://www.iranjib.ir/showgroup/45/", {
        headers: {
            "User-Agent": "Mozilla/5.0"
        }
    });

    const $ = cheerio.load(data);

    console.log("Title:", $("title").text());

    console.log("Tables:", $("table").length);

    $(".items_table").each((i) => {
        console.log("items_table", i);
        console.log($.html($(".items_table").eq(i)).substring(0, 800));
        console.log("================================");
    });
}

inspect();
