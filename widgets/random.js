window.widgetmain = function(query) {
    const html = `
        <div id="quick-answer">
            <h2>Random Number Generator</h2>
            <input type="number" id="input1" placeholder="Enter minimum" />
            <input type="number" id="input2" placeholder="Enter maximum" />
            <button id="generateButton">Generate Random Number</button>
            <p id="result"></p>
        </div>
        <style>
            #quick-answer {
                font-family: Arial, sans-serif;
                text-align: center;
                margin: 20px;
                border: 2px solid #4CAF50;
                padding: 20px;
                border-radius: 10px;
            }
            #quick-answer input, #quick-answer button {
                margin: 10px;
                padding: 10px;
                font-size: 16px;
            }
            #quick-answer button {
                background-color: #4CAF50;
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
            }
            #quick-answer button:hover {
                background-color: #45a049;
            }
            #quick-answer p {
                font-size: 20px;
                font-weight: bold;
            }
        </style>
        <script>
            window.generateRandomNumber = function() {
                const min = parseInt(document.getElementById('input1').value);
                const max = parseInt(document.getElementById('input2').value);
                if (isNaN(min) || isNaN(max) || min >= max) {
                    document.getElementById('result').innerText = 'Please enter valid numbers.';
                    return;
                }
                const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
                document.getElementById('result').innerText = 'Random Number: ' + randomNum;
            }
            document.getElementById('generateButton').onclick = window.generateRandomNumber;
        </script>
    `;
    return html;
}
