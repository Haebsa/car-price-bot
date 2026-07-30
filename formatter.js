const LRM = "\u200E";

function formatPrice(price, text) {

    if (price === null || isNaN(price)) {
        return text || "---";
    }

    return (price / 1000000000).toFixed(3);

}

function buildMessages(cars) {

    const messages = [];

    const groups = [
        ["ایران خودرو", "سایپا"],
        ["مدیران خودرو", "کرمان موتور", "بهمن موتور", "سایر شرکت ها"]
    ];

    groups.forEach(groupBrands => {

        let msg = "🚗 قیمت روز خودرو\n\n";

        groupBrands.forEach(brand => {

            const brandCars = cars.filter(c => c.brand === brand);

            if (!brandCars.length) return;

            msg += `🏭 ${brand}\n\n`;

            brandCars.forEach(car => {

                const name = `${LRM}${car.name}${LRM}`;

                const factory = formatPrice(car.factory, car.factoryText);
                const market = formatPrice(car.market, car.marketText);

                msg += `${name}  🏭${factory}  💵${market}\n`;

            });

            msg += "\n";

        });

        messages.push(msg);

    });

    return messages;

}

module.exports = {
    buildMessages
};
