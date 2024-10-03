window.widgetmain = function(query) {
    const units = {
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
        cup: 0.236588,
        pint: 0.473176,
        quart: 0.946353,
        gal: 3.78541,
        // Temperature (specific conversions)
        "°C": x => x + 273.15,
        "°F": x => (x - 32) * 5/9 + 273.15,
        K: x => x,
        // Area
        acre: 4046.86,
        ha: 10000,
        sqft: 0.092903,
        sqm: 1,
        // Time
        s: 1,
        min: 60,
        h: 3600,
        d: 86400,
        // Speed
        'm/s': 1,
        'km/h': 0.277778,
        'mi/h': 0.44704
    };

    const convert = (value, fromUnit, toUnit) => {
        if (fromUnit in units) {
            const baseValue = typeof units[fromUnit] === 'function' ? units[fromUnit](value) : value * units[fromUnit];
            return toUnit in units ? baseValue / units[toUnit] : null;
        }
        return null;
    };

    return `
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
            }
            #quick-answer input,
            #quick-answer select {
                font-size: 18px;
                margin: 10px 0;
                padding: 10px;
                width: 200px;
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
        </style>
        <div class="converter-widget">
            <h2>Unit Converter</h2>
            <input type="number" id="value" placeholder="Value to convert" />
            <select id="fromUnit">
                ${Object.keys(units).map(unit => `<option value="${unit}">${unit}</option>`).join('')}
            </select>
            <select id="toUnit">
                ${Object.keys(units).map(unit => `<option value="${unit}">${unit}</option>`).join('')}
            </select>
            <button id="convertButton">Convert</button>
            <div class="result" id="result">Result: </div>
        </div>
        <script>
            document.getElementById('convertButton').onclick = function() {
                const value = parseFloat(document.getElementById('value').value);
                const fromUnit = document.getElementById('fromUnit').value;
                const toUnit = document.getElementById('toUnit').value;
                const result = convert(value, fromUnit, toUnit);
                document.getElementById('result').textContent = 'Result: ' + (result !== null ? result : 'Invalid conversion');
            };
        </script>
    `;
};
