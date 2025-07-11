const rate = {
    g: 1000,
    kg: 1,
    ton: 0.001,
    karat: 5000,
    pound: 2.20462,
    ounce: 35.274,
    cent: 0.01
};

function convertFrom(weight) {
    const gInput = document.getElementById("g");
    const kgInput = document.getElementById("kg");
    const tonInput = document.getElementById("ton");
    const karatInput = document.getElementById("karat");
    const poundInput = document.getElementById("pound");
    const ounceInput = document.getElementById("ounce");
    const centInput = document.getElementById("cent");

    let value = parseFloat(document.getElementById(weight).value);

    if (isNaN(value)) {
        gInput.value = "";
        kgInput.value = "";
        karatInput.value = "";
        tonInput.value = "";
        poundInput.value = "";
        ounceInput.value = "";
        centInput.value = "";
        return;
    }

    let valueInKilos = value;
    if (weight !== "kg") {
        valueInKilos = value / rate[weight];
    }

    if (weight !== "g") gInput.value = (valueInKilos * rate.g).toFixed(5);
    if (weight !== "kg") kgInput.value = valueInKilos.toFixed(5);
    if (weight !== "ton") tonInput.value = (valueInKilos * rate.ton).toFixed(5);
    if (weight !== "karat") karatInput.value = (valueInKilos * rate.karat).toFixed(5);
    if (weight !== "pound") poundInput.value = (valueInKilos * rate.pound).toFixed(5);
    if (weight !== "ounce") ounceInput.value = (valueInKilos * rate.ounce).toFixed(5);
    if (weight !== "cent") centInput.value = (valueInKilos * rate.cent).toFixed(5);
}
