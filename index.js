const axios = require("axios");
const cheerio = require("cheerio");

async function inspectIranJib() {

    const { data } = await axios.get(
        "https://www.iranjib.ir/showgroup/45/",
        {
            headers: {
                "User-Agent": "Mozilla/5.0"
            }
        }
    );

    const $ = cheerio.load(data);

    console.log("Tables:", $("table").length);

    $("table").each((i, table) => {

        console.log("==============");
        console.log("TABLE", i);

        console.log(
            $(table).attr("class")
        );

    });

}

inspectIranJib();
