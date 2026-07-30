//index
const fs = require("fs");

const { getCars } = require("./scraper");
const { formatMessage } = require("./formatter");
// const { sendMessage } = require("./sender");


const CURRENT = "./data/cars.json";
const LAST = "./data/lastCars.json";


async function main(){

    console.log("شروع دریافت قیمت خودرو...");


    // دریافت از ایران جیب
    const cars = await getCars();


    // ذخیره قیمت فعلی
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


    // مقایسه
    const changes = findChanges(oldCars,cars);


    if(changes.length){

        console.log("تغییر قیمت پیدا شد:");

        const msg = formatMessage(changes);

        console.log(msg);

        // بعداً ارسال فعال می‌شود
        // await sendMessage(msg);

    }
    else{

        console.log("تغییری وجود ندارد");

    }



    // انتقال قیمت جدید به قبلی
    fs.writeFileSync(
        LAST,
        JSON.stringify(cars,null,2),
        "utf8"
    );


}



function findChanges(oldCars,newCars){

    let result=[];


    newCars.forEach(car=>{


        let old = oldCars.find(
            x =>
            x.brand===car.brand &&
            x.name===car.name
        );


        if(old){

            if(
                old.market !== car.market ||
                old.factory !== car.factory
            ){

                result.push(car);

            }

        }

    });


    return result;

}



main();
