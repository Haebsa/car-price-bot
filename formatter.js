function formatMessage(cars){


let text="🚗 تغییر قیمت خودرو\n\n";


cars.forEach(car=>{


text += "🏭 "+car.brand+"\n";

text += car.name+"\n";

text += "🏭 "+car.factoryText;

text += "  💵 "+car.marketText;


text += "\n\n";


});


text += "📡 منبع: ایران جیب";


return text;


}


module.exports={
    formatMessage
};
