var widgets = [
    {
        "regex": ".*calculator.*|^[0-9+\\-*/().\\s]+$",
        "function": function(query) {
            if (/^[0-9+\-*/().\s]+$/.test(query)) {
                return `<div>Result: ${eval(query)}</div>`;
            } else {
                return `
                    <div>
                        <input type="text" id="display" readonly>
                        <div>
                            <button onclick="window.appendToDisplay('1')">1</button>
                            <button onclick="window.appendToDisplay('2')">2</button>
                            <button onclick="window.appendToDisplay('3')">3</button>
                            <button onclick="window.appendToDisplay('+')">+</button>
                        </div>
                        <div>
                            <button onclick="window.appendToDisplay('4')">4</button>
                            <button onclick="window.appendToDisplay('5')">5</button>
                            <button onclick="window.appendToDisplay('6')">6</button>
                            <button onclick="window.appendToDisplay('-')">-</button>
                        </div>
                        <div>
                            <button onclick="window.appendToDisplay('7')">7</button>
                            <button onclick="window.appendToDisplay('8')">8</button>
                            <button onclick="window.appendToDisplay('9')">9</button>
                            <button onclick="window.appendToDisplay('*')">*</button>
                        </div>
                        <div>
                            <button onclick="window.clearDisplay()">C</button>
                            <button onclick="window.appendToDisplay('0')">0</button>
                            <button onclick="window.calculateResult()">=</button>
                            <button onclick="window.appendToDisplay('/')">/</button>
                        </div>
                    </div>
                    <script>
                        window.appendToDisplay = function(value) {
                            document.getElementById('display').value += value;
                        }
                        window.clearDisplay = function() {
                            document.getElementById('display').value = '';
                        }
                        window.calculateResult = function() {
                            const display = document.getElementById('display');
                            display.value = eval(display.value);
                        }
                    </script>
                `;
            }
        }
    }
]

function showwidget(query) {
    var html;

    for (var i = 0; i < widgets.length; i++) {
        if (query.match(widgets[i].regex)) {
            html = widgets[i].function(query);
            break;
        }
    }

    if (html) {
        document.getElementById("loader").style.top = "80%";
        displayQuickAnswer(html, true);
    }
}
