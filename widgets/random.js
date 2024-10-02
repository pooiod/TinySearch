window.widgetmain = function(query) {
    const parseQuery = (query) => {
        const numbers = query.match(/-?\d+/g) || [];
        return numbers.map(Number);
    };

    const numbers = parseQuery(query);
    let min, max;

    if (numbers.length === 2) {
        [min, max] = numbers;
    } else if (numbers.length === 1) {
        min = 0;
        max = numbers[0];
    } else {
        min = 0;
        max = 1; // Default case if no numbers found
    }

    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;

    const html = `
        <h2>Random Number Generator</h2>
        <input type="number" id="input1" value="${min}" />
        <input type="number" id="input2" value="${max}" />
        <button id="generateButton">Generate Random Number</button>
        <p id="result">Random Number: ${randomNum}</p>
        <style>
            #quick-answer {
                font-family: Arial, sans-serif;
                text-align: center;
                padding: 5px;
            }
            #quick-answer input, #quick-answer button {
                margin: 10px;
                padding: 10px;
                font-size: 16px;
            }
            #quick-answer button {
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
            }
            #quick-answer p {
                font-size: 20px;
                font-weight: bold;
            }
        </style>
    `;

    window.generateRandomNumber = function() {
        const min = parseInt(document.getElementById('input1').value);
        const max = parseInt(document.getElementById('input2').value);
        if (isNaN(min) || isNaN(max) || min >= max) {
            document.getElementById('result').innerText = 'Please enter valid numbers.';
            return;
        }
        const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
        document.getElementById('result').innerText = 'Random Number: ' + randomNum;
    };

    setTimeout(() => {
        document.getElementById('generateButton').onclick = window.generateRandomNumber;
    }, 0);

    return html;
}
