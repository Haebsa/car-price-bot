import axios from "axios";
import * as cheerio from "cheerio";

const URL = "https://www.iranjib.ir/showgroup/45/";

export async function getIranJibPrices() {

    try {

        const response = await axios.get(URL, {
            headers: {
                "User-Agent": "Mozilla/5.0"
            },
            timeout: 20000
        });


        const $ = cheerio.load(response.data);


        const cars = [];


        // اینجا همان کد استخراج قبلی قرار می‌گیرد
        // که خروجی می‌سازد:
        //
        // brand
        // name
        // market
        // factory
        // marketText
        // factoryText


        return cars;


    } catch (err) {

        console.error(
            "IranJib Error:",
            err.message
        );

        return [];

    }

}
