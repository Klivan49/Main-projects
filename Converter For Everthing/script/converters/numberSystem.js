function validateInput(inputElement, base) {
    const value = inputElement.value;
    let regex;
    
    switch(base) {
        case '2':
            regex = /[^0-1]/g;
            break;
        case '8':
            regex = /[^0-7]/g;
            break;
        case '10':
            regex = /[^0-9]/g;
            break;
        case '16':
            regex = /[^0-9a-fA-F]/g;
            break;
        default:
            return;
    }
    
    const newValue = value.replace(regex, '');

    if (value !== newValue) {
        inputElement.value = newValue;
    }
    
    if (newValue !== '') {
        convertFrom(base);
    } else {
        ['2','8','10','16'].forEach(id => {
            if(id !== base) document.getElementById(id).value = '';
        });
    }
}

function convertFrom(base) {
    const input2 = document.getElementById("2");
    const input10 = document.getElementById("10");
    const input8 = document.getElementById("8");
    const input16 = document.getElementById("16");
    
    const valueStr = document.getElementById(base).value;
    
    if (valueStr === "") {
        input2.value = "";
        input10.value = "";
        input8.value = "";
        input16.value = "";
        return;
    }
    
    let decimalValue;
    
    if (base === "10") {
        decimalValue = parseInt(valueStr, 10);
    } 
    else {
        decimalValue = parseInt(valueStr, parseInt(base));
    }
    
    if (isNaN(decimalValue)) {
        if (base !== "2") input2.value = "";
        if (base !== "10") input10.value = "";
        if (base !== "8") input8.value = "";
        if (base !== "16") input16.value = "";
        return;
    }
    
    if (base !== "2") input2.value = decimalValue.toString(2);
    if (base !== "10") input10.value = decimalValue.toString(10);
    if (base !== "8") input8.value = decimalValue.toString(8);
    if (base !== "16") input16.value = decimalValue.toString(16).toUpperCase();
}