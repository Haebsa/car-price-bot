function formatNumber(price) {

    if (price == null) return "-";

    return (price / 1000000000).toFixed(3);

}

function buildMessage(cars){

    let text = "🚗 قیمت روز خودرو\n\n";

    let currentBrand = "";

    cars.forEach(car=>{

        if(car.brand !== currentBrand){

            currentBrand = car.brand;

            text += "🏭 " + currentBrand + "\n\n";

        }

        const factory = car.factory == null ? car.factoryText : formatNumber(car.factory);
        const market  = car.market == null ? car.marketText : formatNumber(car.market);

        text += `${car.name}  🏭${factory}  💵${market}\n`;

    });

    return text;

}

module.exports = {
    buildMessage
};
