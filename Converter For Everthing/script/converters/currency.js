const rate = {
    BYN: 2.9,  // курс BYN к USD
    USD: 1,
    EUR: 0.8
};

function convertFrom(Currency) {
    const bynInput = document.getElementById("BYN");
    const usdInput = document.getElementById("USD");
    const eurInput = document.getElementById("EUR");

    let value = parseFloat(document.getElementById(Currency).value);

    if (isNaN(value)) {
        bynInput.value = "";
        eurInput.value = "";
        usdInput.value = "";
        return;
    }

    // Конвертируем в USD
    let valueInUSD = value;
    if (Currency !== "USD") {
        valueInUSD = value / rate[Currency];
    }

    // Обновляем остальные поля
    if (Currency !== "BYN") bynInput.value = (valueInUSD * rate.BYN).toFixed(2);
    if (Currency !== "USD") usdInput.value = valueInUSD.toFixed(2);
    if (Currency !== "EUR") eurInput.value = (valueInUSD * rate.EUR).toFixed(2);
}
