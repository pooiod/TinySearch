window.widgetmain = function(input1, input2) {
    const html = `
        <div>
            <input type="number" id="min" placeholder="Enter minimum" value="${input1}">
            <input type="number" id="max" placeholder="Enter maximum" value="${input2}">
            <button onclick="generateRandom()">Generate Random Number</button>
            <p id="result"></p>
        </div>
        <script>
            function generateRandom() {
                const min = parseInt(document.getElementById('min').value);
                const max = parseInt(document.getElementById('max').value);
                const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
                document.getElementById('result').innerText = randomNum;
            }
        </script>
    `;
    return html;
}
