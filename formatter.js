function formatPrice(value, text) {
    if (value === null || isNaN(value)) return text;

    return (value / 1000000000).toFixed(3);
}

function carLine(car) {

    const market = formatPrice(car.market, car.marketText);
    const factory = formatPrice(car.factory, car.factoryText);

    return `${car.name}  🏭${factory}  💵${market}`;
}

function buildMessages(cars) {

    let msg1 = "🚗 قیمت روز خودرو\n\n";
    let msg2 = "🚗 ادامه قیمت روز خودرو\n\n";

    let current = "";

    cars.forEach(car => {

        if (car.brand !== current) {

            current = car.brand;

            const title = `🏭 ${current}\n\n`;

            if (
                current === "ایران خودرو" ||
                current === "سایپا"
            ) {
                msg1 += title;
            } else {
                msg2 += title;
            }
        }

        const line = carLine(car) + "\n";

        if (
            car.brand === "ایران خودرو" ||
            car.brand === "سایپا"
        ) {
            msg1 += line;
        } else {
            msg2 += line;
        }

    });

    msg1 += "\n━━━━━━━━━━━━\n📢 @Khodroo_Akhbar";
    msg2 += "\n━━━━━━━━━━━━\n📢 @Khodroo_Akhbar";

    return [msg1, msg2];

}

module.exports = { buildMessages };
