function validateTemperatureInput(input, unit) {
    let newValue = input.value;
    
    if (unit === 'K') {
        newValue = newValue.replace(/[^0-9.]/g, '');
    } else {
        newValue = newValue.replace(/[^0-9.-]/g, '');
        
        if (newValue.indexOf('-') > 0) {
            newValue = newValue.replace(/-/g, '');
        }
        if (newValue.split('-').length > 2) {
            newValue = newValue.replace(/-/g, '');
            newValue = '-' + newValue;
        }
    }
    
    if ((newValue.match(/\./g) || []).length > 1) {
        newValue = newValue.slice(0, -1);
    }
    
    input.value = newValue;
    
    if (newValue === '-' || newValue === '.' || newValue === '-.') {
        input.classList.add('invalid');
        return;
    } else {
        input.classList.remove('invalid');
    }
    
    convertFrom(unit);
}

function convertFrom(temperature) {
    const kInput = document.getElementById("K");
    const cInput = document.getElementById("C");
    const fInput = document.getElementById("F");
    
    const valueStr = document.getElementById(temperature).value;
    
    if (valueStr === "" || valueStr === "-" || valueStr === "." || valueStr === "-.") {
        kInput.value = "";
        cInput.value = "";
        fInput.value = "";
        return;
    }
    
    const value = parseFloat(valueStr);
    
    if (isNaN(value)) {
        kInput.value = "";
        cInput.value = "";
        fInput.value = "";
        return;
    }
    
    let valueInCelsius = value;
    
    if (temperature === "F") {
        valueInCelsius = (value - 32) * 5 / 9;
    } else if (temperature === "K") {
        if (value < 0) {
            cInput.value = "";
            fInput.value = "";
            return;
        }
        valueInCelsius = value - 273.15;
    }
    
    if (temperature !== "C") {
        if (valueInCelsius >= -273.15 || temperature === "F") {
            cInput.value = valueInCelsius.toFixed(2);
        } else {
            cInput.value = "";
        }
    }
    
    if (temperature !== "K") {
        const kelvinValue = valueInCelsius + 273.15;
        if (kelvinValue >= 0) {
            kInput.value = kelvinValue.toFixed(2);
        } else {
            kInput.value = "";
        }
    }
    
    if (temperature !== "F") {
        if (valueInCelsius >= -273.15) {
            fInput.value = (valueInCelsius * 9 / 5 + 32).toFixed(2);
        } else {
            fInput.value = "";
        }
    }
}