const axios = require("axios");
const cheerio = require("cheerio");

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

    $("table.items_table tr").each((i, row) => {

        const tds = $(row).find("td");

        if (tds.length < 3) return;

        const name = $(tds[0]).text().trim();

        const market = $(tds[1]).text().trim();

        const factory = $(tds[2]).text().trim();

        if (name && market) {

            cars.push({
                name,
                market,
                factory
            });

        }

    });

    console.log(cars);

}

getIranJibCars();
