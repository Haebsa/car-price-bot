import { getIranJibPrices } from "./sources/iranjib.js";

async function main() {

    console.log("شروع دریافت قیمت خودرو...");

    const cars = await getIranJibPrices();

    console.log(cars);

}

main();
