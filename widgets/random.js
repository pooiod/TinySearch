window.widgetmain = function(query) {
    const html = `
        <style>
            #quick-answer {
                font-family: Arial, sans-serif;
                padding: 20px;
                border: 1px solid #ccc;
                border-radius: 5px;
                text-align: center;
                background-color: #f9f9f9;
            }
            #quick-answer input {
                margin: 5px;
                padding: 10px;
                width: 60px;
            }
            #quick-answer button {
                padding: 10px 20px;
                background-color: #007bff;
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
            }
            #quick-answer button:hover {
                background-color: #0056b3;
            }
        </style>
        <div id="quick-answer">
            <input type="number" id="input1" placeholder="Min" />
            <input type="number" id="input2" placeholder="Max" />
            <button onclick="window.generateRandomNumber()">Generate Random Number</button>
            <div id="result"></div>
        </div>
        <script>
            window.generateRandomNumber = function() {
                const min = parseInt(document.getElementById('input1').value);
                const max = parseInt(document.getElementById('input2').value);
                if (!isNaN(min) && !isNaN(max) && min < max) {
                    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
                    document.getElementById('result').innerText = 'Random Number: ' + randomNumber;
                } else {
                    document.getElementById('result').innerText = 'Please enter valid min and max values.';
                }
            }
        </script>
    `;
    return html;
}
