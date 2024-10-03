window.widgetmain = function(query) {
    const units = {
        // Length
        m: { name: "Meters", factor: 1 },
        cm: { name: "Centimeters", factor: 0.01 },
        km: { name: "Kilometers", factor: 1000 },
        mm: { name: "Millimeters", factor: 0.001 },
        in: { name: "Inches", factor: 0.0254 },
        ft: { name: "Feet", factor: 0.3048 },
        yd: { name: "Yards", factor: 0.9144 },
        mi: { name: "Miles", factor: 1609.34 },
        // Mass
        g: { name: "Grams", factor: 1 },
        kg: { name: "Kilograms", factor: 1000 },
        mg: { name: "Milligrams", factor: 0.001 },
        oz: { name: "Ounces", factor: 28.3495 },
        lb: { name: "Pounds", factor: 453.592 },
        // Volume
        l: { name: "Liters", factor: 1 },
        ml: { name: "Milliliters", factor: 0.001 },
        cup: { name: "Cups", factor: 0.236588 },
        pint: { name: "Pints", factor: 0.473176 },
        quart: { name: "Quarts", factor: 0.946353 },
        gal: { name: "Gallons", factor: 3.78541 },
        // Temperature
        "°C": { name: "Celsius", factor: x => x + 273.15 },
        "°F": { name: "Fahrenheit", factor: x => (x - 32) * 5/9 + 273.15 },
        K: { name: "Kelvin", factor: x => x },
        // Area
        acre: { name: "Acres", factor: 4046.86 },
        ha: { name: "Hectares", factor: 10000 },
        sqft: { name: "Square Feet", factor: 0.092903 },
        sqm: { name: "Square Meters", factor: 1 },
        // Time
        s: { name: "Seconds", factor: 1 },
        min: { name: "Minutes", factor: 60 },
        h: { name: "Hours", factor: 3600 },
        // Speed
        'm/s': { name: "Meters per Second", factor: 1 },
        'km/h': { name: "Kilometers per Hour", factor: 0.277778 },
        'mi/h': { name: "Miles per Hour", factor: 0.44704 }
    };

    const convert = (value, fromUnit, toUnit) => {
        if (fromUnit === "°F" && toUnit === "cm") {
            return null; // Prevent conversion from Fahrenheit to Centimeters
        }
        if (fromUnit === "cm" && toUnit === "°F") {
            return null; // Prevent conversion from Centimeters to Fahrenheit
        }
        const fromFactor = units[fromUnit].factor;
        const toFactor = units[toUnit].factor;
        const baseValue = typeof fromFactor === 'function' ? fromFactor(value) : value * fromFactor;
        return toFactor(baseValue);
    };

    const html = `
        <style>
            #quick-answer .converter-widget {
                display: flex;
                flex-direction: column;
                align-items: center;
                background: #f9f9f9;
                margin: 20px;
                padding: 20px;
                border: 2px solid #007BFF;
                border-radius: 10px;
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
                font-family: Arial, sans-serif;
            }
            #quick-answer h2 {
                color: #007BFF;
                margin-bottom: 20px;
            }
            #quick-answer input,
            #quick-answer select {
                font-size: 16px;
                margin: 10px 0;
                padding: 10px;
                width: 250px;
                border: 1px solid #aaa;
                border-radius: 5px;
                transition: border-color 0.3s;
            }
            #quick-answer input:focus,
            #quick-answer select:focus {
                border-color: #007BFF;
            }
            #quick-answer button {
                font-size: 16px;
                padding: 10px;
                margin-top: 10px;
                border: none;
                border-radius: 5px;
                background-color: #007BFF;
                color: white;
                cursor: pointer;
                transition: background 0.3s;
            }
            #quick-answer button:hover {
                background-color: #0056b3;
            }
            #quick-answer .result {
                margin-top: 20px;
                font-size: 20px;
                color: #333;
            }
            #quick-answer .error {
                color: red;
                margin-top: 10px;
                font-weight: bold;
            }
        </style>
        <div class="converter-widget">
            <h2>Unit Converter</h2>
            <input type="number" id="value" placeholder="Value to convert" />
            <select id="fromUnit">
                ${Object.keys(units).map(unit => `<option value="${unit}">${units[unit].name}</option>`).join('')}
            </select>
            <select id="toUnit">
                ${Object.keys(units).map(unit => `<option value="${unit}">${units[unit].name}</option>`).join('')}
            </select>
            <button id="convertButton">Convert</button>
            <div class="result" id="result">Result: </div>
            <div class="error" id="errorMessage"></div>
        </div>
    `;

    // Event handling
    setTimeout(() => {
        const convertButton = document.getElementById('convertButton');
        const valueInput = document.getElementById('value');
        const fromUnitSelect = document.getElementById('fromUnit');
        const toUnitSelect = document.getElementById('toUnit');
        const resultDiv = document.getElementById('result');
        const errorMessageDiv = document.getElementById('errorMessage');

        convertButton.onclick = function() {
            const value = parseFloat(valueInput.value);
            const fromUnit = fromUnitSelect.value;
            const toUnit = toUnitSelect.value;
            const result = convert(value, fromUnit, toUnit);

            if (result !== null) {
                resultDiv.textContent = 'Result: ' + result;
                errorMessageDiv.textContent = ''; // Clear error message
            } else {
                resultDiv.textContent = 'Result: ';
                errorMessageDiv.textContent = 'Cannot convert between ' + units[fromUnit].name + ' and ' + units[toUnit].name + '.';
            }
        };
    }, 0); // Use setTimeout to wait for DOM elements to be created

    return html;
};
