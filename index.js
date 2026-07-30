const axios = require("axios");
const cheerio = require("cheerio");
const { buildMessage } = require("./formatter");

function faToEn(str) {
    return str
        .replace(/[۰-۹]/g, d => "۰۱۲۳۴۵۶۷۸۹".indexOf(d))
        .replace(/,/g, "")
        .replace(/٬/g, "")
        .trim();
}

async function getIranJibCars() {

    const { data } = await axios.get(
        "https://www.iranjib.ir/showgroup/45/",
        {
            headers: {
                "User-Agent": "Mozilla/5.0"
            }
        }
    );

    const $ = cheerio.load(data);

    const cars = [];

    let brand = "";

    $("table.items_table tr").each((i, row) => {

        if ($(row).hasClass("catsection")) {

            const title = $(row).find("h2").text().trim();

            if (title) brand = title;

            return;
        }

        const tds = $(row).find("td");

        if (tds.length < 3) return;

        const name = $(tds[0]).text().trim();
        const marketText = $(tds[1]).text().trim();
        const factoryText = $(tds[2]).text().trim();

        if (!name) return;

        cars.push({
            brand,
            name,
            market: Number(faToEn(marketText)) || null,
            factory: Number(faToEn(factoryText)) || null,
            marketText,
            factoryText
        });

    });

    // خروجی JSON (برای تست)
    console.log(JSON.stringify(cars, null, 2));

    // خروجی متن نهایی
    console.log("\n================ MESSAGE ================\n");
    console.log(buildMessage(cars));

}

getIranJibCars();
