window.widgetmain = function(query) {
    const units = {
        // Length
        m: { name: "Meters", conversion: 1 },
        cm: { name: "Centimeters", conversion: 0.01 },
        km: { name: "Kilometers", conversion: 1000 },
        mm: { name: "Millimeters", conversion: 0.001 },
        in: { name: "Inches", conversion: 0.0254 },
        ft: { name: "Feet", conversion: 0.3048 },
        yd: { name: "Yards", conversion: 0.9144 },
        mi: { name: "Miles", conversion: 1609.34 },
        // Mass
        g: { name: "Grams", conversion: 1 },
        kg: { name: "Kilograms", conversion: 1000 },
        mg: { name: "Milligrams", conversion: 0.001 },
        oz: { name: "Ounces", conversion: 28.3495 },
        lb: { name: "Pounds", conversion: 453.592 },
        // Volume
        l: { name: "Liters", conversion: 1 },
        ml: { name: "Milliliters", conversion: 0.001 },
        cup: { name: "Cups", conversion: 0.236588 },
        pint: { name: "Pints", conversion: 0.473176 },
        quart: { name: "Quarts", conversion: 0.946353 },
        gal: { name: "Gallons", conversion: 3.78541 },
        // Temperature
        "°C": { name: "Celsius", conversion: x => x + 273.15 },
        "°F": { name: "Fahrenheit", conversion: x => (x - 32) * 5 / 9 + 273.15 },
        K: { name: "Kelvin", conversion: x => x },
        // Area
        acre: { name: "Acres", conversion: 4046.86 },
        ha: { name: "Hectares", conversion: 10000 },
        sqft: { name: "Square Feet", conversion: 0.092903 },
        sqm: { name: "Square Meters", conversion: 1 },
        // Time
        s: { name: "Seconds", conversion: 1 },
        min: { name: "Minutes", conversion: 60 },
        h: { name: "Hours", conversion: 3600 },
        // Speed
        'm/s': { name: "Meters per Second", conversion: 1 },
        'km/h': { name: "Kilometers per Hour", conversion: 0.277778 },
        'mi/h': { name: "Miles per Hour", conversion: 0.44704 }
    };

    const incompatibleConversions = [
        { from: "°F", to: "cm" },
        { from: "°F", to: "m" },
        { from: "°F", to: "km" },
        { from: "°F", to: "mm" },
        { from: "°F", to: "in" },
        { from: "°F", to: "ft" },
        { from: "°F", to: "yd" },
        { from: "°F", to: "mi" },
        { from: "°F", to: "g" },
        { from: "°F", to: "kg" },
        { from: "°F", to: "mg" },
        { from: "°F", to: "oz" },
        { from: "°F", to: "lb" },
        { from: "°F", to: "l" },
        { from: "°F", to: "ml" },
        { from: "°F", to: "cup" },
        { from: "°F", to: "pint" },
        { from: "°F", to: "quart" },
        { from: "°F", to: "gal" },
        { from: "°F", to: "acre" },
        { from: "°F", to: "ha" },
        { from: "°F", to: "sqft" },
        { from: "°F", to: "sqm" },
        { from: "°F", to: "s" },
        { from: "°F", to: "min" },
        { from: "°F", to: "h" },
        { from: "°F", to: "m/s" },
        { from: "°F", to: "km/h" },
        { from: "°F", to: "mi/h" }
    ];

    const convert = (value, fromUnit, toUnit) => {
        if (fromUnit in units && toUnit in units) {
            const baseValue = typeof units[fromUnit].conversion === 'function' ? units[fromUnit].conversion(value) : value * units[fromUnit].conversion;
            return baseValue / units[toUnit].conversion;
        }
        return null;
    };

    const html = `
        <style>
            #quick-answer .converter-widget {
                display: flex;
                flex-direction: column;
                align-items: center;
                margin: 20px;
                padding: 20px;
                border: 2px solid #ccc;
                border-radius: 10px;
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
                background-color: #f9f9f9;
            }
            #quick-answer h2 {
                margin-bottom: 20px;
                color: #333;
            }
            #quick-answer .input-group {
                display: flex;
                flex-direction: column;
                align-items: center;
                width: 100%;
            }
            #quick-answer input[type="number"] {
                font-size: 20px;
                padding: 10px;
                width: 80%;
                margin: 10px 0;
                border: 1px solid #aaa;
                border-radius: 5px;
            }
            #quick-answer .unit-select {
                font-size: 18px;
                padding: 10px;
                margin: 5px 0;
                width: 80%;
                border: 1px solid #aaa;
                border-radius: 5px;
                background-color: white;
            }
            #quick-answer .convert-button {
                font-size: 20px;
                padding: 10px 20px;
                margin-top: 10px;
                border: none;
                border-radius: 5px;
                background-color: #007BFF;
                color: white;
                cursor: pointer;
                transition: background 0.3s;
            }
            #quick-answer .convert-button:hover {
                background-color: #0056b3;
            }
            #quick-answer .result {
                margin-top: 20px;
                font-size: 22px;
                font-weight: bold;
                color: #333;
            }
            #quick-answer .error {
                color: red;
                font-weight: bold;
                margin-top: 10px;
            }
        </style>
        <div class="converter-widget">
            <h2>Unit Converter</h2>
            <div class="input-group">
                <input type="number" id="value" placeholder="Value to convert" />
                <select id="fromUnit" class="unit-select"></select>
                <select id="toUnit" class="unit-select"></select>
                <button id="convertButton" class="convert-button">Convert</button>
                <div class="result" id="result">Result: </div>
                <div class="error" id="error"></div>
            </div>
        </div>
    `;

    // Populate the dropdowns
    setTimeout(() => {
        const fromUnitSelect = document.getElementById('fromUnit');
        const toUnitSelect = document.getElementById('toUnit');

        for (const unit in units) {
            const option = document.createElement('option');
            option.value = unit;
            option.textContent = units[unit].name;
            fromUnitSelect.appendChild(option);
            const option2 = option.cloneNode(true);
            toUnitSelect.appendChild(option2);
        }

        const convertButton = document.getElementById('convertButton');
        const valueInput = document.getElementById('value');
        const resultDiv = document.getElementById('result');
        const errorDiv = document.getElementById('error');

        convertButton.onclick = function() {
            const value = parseFloat(valueInput.value);
            const fromUnit = fromUnitSelect.value;
            const toUnit = toUnitSelect.value;

            // Check for incompatible conversions
            const isIncompatible = incompatibleConversions.some(pair => 
                (pair.from === fromUnit && pair.to === toUnit) || 
                (pair.from === toUnit && pair.to === fromUnit)
            );

            if (isIncompatible) {
                errorDiv.textContent = 'Incompatible conversion! Please select valid units.';
                resultDiv.textContent = 'Result: ';
                return;
            } else {
                errorDiv.textContent = '';
            }

            const result = convert(value, fromUnit, toUnit);
            resultDiv.textContent = 'Result: ' + (result !== null ? result.toFixed(2) : 'Invalid conversion');
        };
    }, 0); // Use setTimeout to wait for DOM elements to be created

    return html;
};
