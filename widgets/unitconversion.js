window.widgetmain = function(query) {
    const units = {
        // Length
        m: { fullName: "Meters", conversion: 1 },
        cm: { fullName: "Centimeters", conversion: 0.01 },
        km: { fullName: "Kilometers", conversion: 1000 },
        mm: { fullName: "Millimeters", conversion: 0.001 },
        in: { fullName: "Inches", conversion: 0.0254 },
        ft: { fullName: "Feet", conversion: 0.3048 },
        yd: { fullName: "Yards", conversion: 0.9144 },
        mi: { fullName: "Miles", conversion: 1609.34 },
        // Mass
        g: { fullName: "Grams", conversion: 1 },
        kg: { fullName: "Kilograms", conversion: 1000 },
        mg: { fullName: "Milligrams", conversion: 0.001 },
        oz: { fullName: "Ounces", conversion: 28.3495 },
        lb: { fullName: "Pounds", conversion: 453.592 },
        // Volume
        l: { fullName: "Liters", conversion: 1 },
        ml: { fullName: "Milliliters", conversion: 0.001 },
        cup: { fullName: "Cups", conversion: 0.236588 },
        pint: { fullName: "Pints", conversion: 0.473176 },
        quart: { fullName: "Quarts", conversion: 0.946353 },
        gal: { fullName: "Gallons", conversion: 3.78541 },
        // Temperature
        "°C": { fullName: "Celsius", conversion: x => x + 273.15 },
        "°F": { fullName: "Fahrenheit", conversion: x => (x - 32) * 5 / 9 + 273.15 },
        K: { fullName: "Kelvin", conversion: x => x },
        // Area
        acre: { fullName: "Acres", conversion: 4046.86 },
        ha: { fullName: "Hectares", conversion: 10000 },
        sqft: { fullName: "Square Feet", conversion: 0.092903 },
        sqm: { fullName: "Square Meters", conversion: 1 },
        // Time
        s: { fullName: "Seconds", conversion: 1 },
        min: { fullName: "Minutes", conversion: 60 },
        h: { fullName: "Hours", conversion: 3600 },
        // Speed
        'm/s': { fullName: "Meters per Second", conversion: 1 },
        'km/h': { fullName: "Kilometers per Hour", conversion: 0.277778 },
        'mi/h': { fullName: "Miles per Hour", conversion: 0.44704 }
    };

    const convert = (value, fromUnit, toUnit) => {
        // Prevent invalid conversions
        if (fromUnit === "°F" && toUnit === "cm") return null;
        if (fromUnit === "cm" && toUnit === "°F") return null;

        if (fromUnit in units) {
            const baseValue = typeof units[fromUnit].conversion === 'function' ? units[fromUnit].conversion(value) : value * units[fromUnit].conversion;
            return toUnit in units ? baseValue / units[toUnit].conversion : null;
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
                font-family: Arial, sans-serif;
            }
            #quick-answer input,
            #quick-answer select {
                font-size: 18px;
                margin: 10px 0;
                padding: 10px;
                width: 220px;
                border: 1px solid #aaa;
                border-radius: 5px;
            }
            #quick-answer button {
                font-size: 18px;
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
            }
            #quick-answer .disabled {
                color: red;
                font-weight: bold;
            }
        </style>
        <div class="converter-widget">
            <h2>Unit Converter</h2>
            <input type="number" id="value" placeholder="Value to convert" />
            <select id="fromUnit" onchange="updateUI()">
                ${Object.keys(units).map(unit => `<option value="${unit}">${units[unit].fullName}</option>`).join('')}
            </select>
            <select id="toUnit" onchange="updateUI()">
                ${Object.keys(units).map(unit => `<option value="${unit}">${units[unit].fullName}</option>`).join('')}
            </select>
            <button id="convertButton">Convert</button>
            <div class="result" id="result">Result: </div>
        </div>
    `;

    // Event handling
    setTimeout(() => {
        const convertButton = document.getElementById('convertButton');
        const valueInput = document.getElementById('value');
        const fromUnitSelect = document.getElementById('fromUnit');
        const toUnitSelect = document.getElementById('toUnit');
        const resultDiv = document.getElementById('result');

        const updateUI = () => {
            const fromUnit = fromUnitSelect.value;
            const toUnit = toUnitSelect.value;

            if (fromUnit === "°F" && toUnit === "cm") {
                convertButton.disabled = true;
                convertButton.classList.add('disabled');
            } else {
                convertButton.disabled = false;
                convertButton.classList.remove('disabled');
            }
        };

        convertButton.onclick = function() {
            const value = parseFloat(valueInput.value);
            const fromUnit = fromUnitSelect.value;
            const toUnit = toUnitSelect.value;
            const result = convert(value, fromUnit, toUnit);
            resultDiv.textContent = 'Result: ' + (result !== null ? result : 'Invalid conversion');
        };

        updateUI(); // Initial UI update
    }, 0); // Use setTimeout to wait for DOM elements to be created

    return html;
};
