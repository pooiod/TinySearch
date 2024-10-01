var widgets = [
    {
        "regex": ".*calculator.*|^[0-9+\\-*/^().\\sπpi]+$",
        "function": function(query) {
            window.appendToDisplay = function(value) {
                document.getElementById('display').value += value;
            };
            window.clearDisplay = function() {
                document.getElementById('display').value = '';
            };
            window.calculateResult = function() {
                const display = document.getElementById('display');
                try {
                    let expression = display.value.replace(/π/g, 'Math.PI').replace(/\^/g, '**');
                    display.value = Function('"use strict"; return (' + expression + ')')();
                } catch (e) {
                    display.value = "Error";
                }
            };
    
            let result = "";
            if (/^[0-9+\-*/^().\sπpi]+$/.test(query)) {
                try {
                    let expression = query.replace(/π/g, 'Math.PI').replace(/\^/g, '**'); // Replace ^ with ** and π with Math.PI
                    result = Function('"use strict"; return (' + expression + ')')();
                } catch (e) {
                    result = "Error";
                }
            }
    
            return `
                <div>
                    <input type="text" id="display" value="${result}" readonly>
                    <div>
                        <button onclick="appendToDisplay('1')">1</button>
                        <button onclick="appendToDisplay('2')">2</button>
                        <button onclick="appendToDisplay('3')">3</button>
                        <button onclick="appendToDisplay('+')">+</button>
                    </div>
                    <div>
                        <button onclick="appendToDisplay('4')">4</button>
                        <button onclick="appendToDisplay('5')">5</button>
                        <button onclick="appendToDisplay('6')">6</button>
                        <button onclick="appendToDisplay('-')">-</button>
                    </div>
                    <div>
                        <button onclick="appendToDisplay('7')">7</button>
                        <button onclick="appendToDisplay('8')">8</button>
                        <button onclick="appendToDisplay('9')">9</button>
                        <button onclick="appendToDisplay('*')">*</button>
                    </div>
                    <div>
                        <button onclick="clearDisplay()">C</button>
                        <button onclick="appendToDisplay('0')">0</button>
                        <button onclick="calculateResult()">=</button>
                        <button onclick="appendToDisplay('/')">/</button>
                        <button onclick="appendToDisplay('π')">π</button>
                        <button onclick="appendToDisplay('^')">^</button>
                    </div>
                </div>
            `;
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
