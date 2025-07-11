const rate = {
    m: 1,
    sm: 100,
    dm: 10,
    km: 0.001,
    inch: 39.3701,
    foot: 3.28084,
    yard: 1.09361
};

function convertFrom(length) {
    const mInput = document.getElementById("m");
    const smInput = document.getElementById("sm");
    const dmInput = document.getElementById("dm");
    const kmInput = document.getElementById("km");
    const inchInput = document.getElementById("inch");
    const footInput = document.getElementById("foot");
    const yardInput = document.getElementById("yard");

    let value = parseFloat(document.getElementById(length).value);

    if (isNaN(value)) {
        mInput.value = "";
        smInput.value = "";
        kmInput.value = "";
        dmInput.value = "";
        inchInput.value = "";
        footInput.value = "";
        yardInput.value = "";
        return;
    }

    let valueInMeters = value;
    if (length !== "m") {
        valueInMeters = value / rate[length];
    }
    
    if (length !== "m") mInput.value = valueInMeters.toFixed(5);
    if (length !== "sm") smInput.value = (valueInMeters * rate.sm).toFixed(5);
    if (length !== "dm") dmInput.value = (valueInMeters * rate.dm).toFixed(5);
    if (length !== "km") kmInput.value = (valueInMeters * rate.km).toFixed(5);
    if (length !== "inch") inchInput.value = (valueInMeters * rate.inch).toFixed(5);
    if (length !== "foot") footInput.value = (valueInMeters * rate.foot).toFixed(5);
    if (length !== "yard") yardInput.value = (valueInMeters * rate.yard).toFixed(5);
}
