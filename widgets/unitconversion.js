window.widgetmain = function(query) {
    const regex = /\b(\d*\.?\d+)\s*(m|cm|km|mm|in|ft|yd|mi|g|kg|mg|oz|lb|l|ml|cup|pint|quart|gal|°C|°F|K|J|cal|N|Pa|psi|atm|W|kW|hp|V|A|Ohm|Hz|s|min|h|d|week|month|year|acre|ha|sqft|sqm|cubicm|cubicft|mL|cc|L|m³|ft³|cm³|b|bit|KB|MB|GB|TB|Hz|m\/s|km\/h|mi\/h|c|°R|°K|s|Btu|mole|mol|R|C|D|T)\b/g;

    const convertUnits = (value, fromUnit, toUnit) => {
        const conversions = {
            // Length
            m: 1,
            cm: 0.01,
            km: 1000,
            mm: 0.001,
            in: 0.0254,
            ft: 0.3048,
            yd: 0.9144,
            mi: 1609.34,

            // Mass
            g: 1,
            kg: 1000,
            mg: 0.001,
            oz: 28.3495,
            lb: 453.592,

            // Volume
            l: 1,
            ml: 0.001,
            cup: 0.24,
            pint: 0.473176,
            quart: 0.946353,
            gal: 3.78541,

            // Temperature (Celsius to Kelvin/Fahrenheit)
            '°C': (value) => (value * 9/5) + 32, // Celsius to Fahrenheit
            '°F': (value) => (value - 32) * 5/9, // Fahrenheit to Celsius
            K: (value) => value - 273.15, // Kelvin to Celsius
        };

        if (conversions[fromUnit] && conversions[toUnit]) {
            if (typeof conversions[fromUnit] === 'function') {
                // Handle temperature conversions
                const celsiusValue = conversions[fromUnit](value);
                return toUnit === '°C' ? celsiusValue : conversions['°C'](celsiusValue);
            }
            return (value * conversions[fromUnit]) / conversions[toUnit];
        }
        return null; // Invalid conversion
    };

    const matches = query.match(regex);
    let resultHtml = `
        <style>
            #unit-converter {
                display: flex;
                flex-direction: column;
                align-items: center;
                margin: 20px;
                padding: 20px;
                border: 2px solid #ccc;
                border-radius: 10px;
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
            }
            #unit-converter input, #unit-converter select {
                width: 80%;
                padding: 10px;
                margin: 10px 0;
                font-size: 16px;
                border: 1px solid #aaa;
                border-radius: 5px;
            }
            #unit-converter button {
                padding: 10px 20px;
                font-size: 16px;
                border: none;
                border-radius: 5px;
                background-color: #28a745;
                color: white;
                cursor: pointer;
                transition: background 0.2s;
            }
            #unit-converter button:hover {
                background-color: #218838;
            }
            #result {
                margin-top: 15px;
                font-size: 18px;
            }
        </style>
        <div id="unit-converter">
            <input type="text" id="value" placeholder="Enter value (e.g., 10 m)">
            <select id="fromUnit"></select>
            <select id="toUnit"></select>
            <button id="convertButton">Convert</button>
            <div id="result"></div>
        </div>
    `;

    // Generate unit options
    const units = [
        'm', 'cm', 'km', 'mm', 'in', 'ft', 'yd', 'mi',
        'g', 'kg', 'mg', 'oz', 'lb',
        'l', 'ml', 'cup', 'pint', 'quart', 'gal',
        '°C', '°F', 'K'
    ];

    const fromUnitSelect = document.getElementById('fromUnit');
    const toUnitSelect = document.getElementById('toUnit');

    units.forEach(unit => {
        const optionFrom = document.createElement('option');
        optionFrom.value = unit;
        optionFrom.textContent = unit;
        fromUnitSelect.appendChild(optionFrom);

        const optionTo = document.createElement('option');
        optionTo.value = unit;
        optionTo.textContent = unit;
        toUnitSelect.appendChild(optionTo);
    });

    // Handle conversion on button click
    document.getElementById('convertButton').onclick = function() {
        const value = parseFloat(document.getElementById('value').value);
        const fromUnit = document.getElementById('fromUnit').value;
        const toUnit = document.getElementById('toUnit').value;

        if (isNaN(value)) {
            document.getElementById('result').textContent = 'Please enter a valid number.';
            return;
        }

        const convertedValue = convertUnits(value, fromUnit, toUnit);
        if (convertedValue === null) {
            document.getElementById('result').textContent = 'Invalid conversion.';
        } else {
            document.getElementById('result').textContent = `${value} ${fromUnit} = ${convertedValue.toFixed(2)} ${toUnit}`;
        }
    };

    return resultHtml;
};
