import fs from "fs";
import { getIranJibPrices } from "./sources/iranjib.js";
import { formatMessage } from "./formatter.js";


const CURRENT = "./data/cars.json";
const LAST = "./data/lastCars.json";


async function main(){

    console.log("شروع دریافت قیمت خودرو...");


    const cars = await getIranJibPrices();


    console.log("تعداد خودرو:", cars.length);


    fs.writeFileSync(
        CURRENT,
        JSON.stringify(cars,null,2),
        "utf8"
    );


    let oldCars=[];


    if(fs.existsSync(LAST)){

        oldCars = JSON.parse(
            fs.readFileSync(LAST,"utf8")
        );

    }


    const changes = findChanges(oldCars,cars);



    if(changes.length > 0){

        console.log("تغییر قیمت پیدا شد:");

        const msg = formatMessage(changes);

        console.log(msg);

    }
    else{

        console.log("تغییری وجود ندارد");

    }



    fs.writeFileSync(
        LAST,
        JSON.stringify(cars,null,2),
        "utf8"
    );


}



function findChanges(oldCars,newCars){

    let changes=[];


    newCars.forEach(car=>{


        const old = oldCars.find(
            x =>
            x.brand === car.brand &&
            x.name === car.name
        );


        if(old){

            if(
                old.market !== car.market ||
                old.factory !== car.factory
            ){

                changes.push(car);

            }

        }

    });


    return changes;

}



main();
