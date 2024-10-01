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
                    let expression = query.replace(/π/g, 'Math.PI').replace(/\^/g, '**');
                    result = Function('"use strict"; return (' + expression + ')')();
                } catch (e) {
                    result = "Error";
                }
            }

            document.getElementById("loader").style.top = "95%";
    
            return `
                <style>
                    #quick-answer .calculator {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        margin: 5px;
                        padding: 5px;
                    }
                    #quick-answer #display {
                        width: 100%;
                        height: 40px;
                        font-size: 24px;
                        text-align: right;
                        border: 1px solid #aaa;
                        border-radius: 5px;
                        margin-bottom: 15px;
                        padding: 5px;
                    }
                    #quick-answer button {
                        width: 60px;
                        height: 60px;
                        font-size: 24px;
                        margin: 5px;
                        border: none;
                        border-radius: 5px;
                        background: #444;
                        cursor: pointer;
                        transition: background 0.2s;
                    }
                    #quick-answer button:hover {
                        background: #777;
                    }
                    #quick-answer button:active {
                        background: #d0d0d0;
                    }
                    #quick-answer .button-container {
                        display: flex;
                        justify-content: center;
                    }
                </style>
                <div class="calculator">
                    <input type="text" id="display" value="${result}" readonly>
                    <div class="button-container">
                        <button onclick="appendToDisplay('1')">1</button>
                        <button onclick="appendToDisplay('2')">2</button>
                        <button onclick="appendToDisplay('3')">3</button>
                        <button onclick="appendToDisplay('+')">+</button>
                        <button onclick="appendToDisplay('(')">(</button>
                    </div>
                    <div class="button-container">
                        <button onclick="appendToDisplay('4')">4</button>
                        <button onclick="appendToDisplay('5')">5</button>
                        <button onclick="appendToDisplay('6')">6</button>
                        <button onclick="appendToDisplay('-')">-</button>
                        <button onclick="appendToDisplay(')')">)</button>
                    </div>
                    <div class="button-container">
                        <button onclick="appendToDisplay('7')">7</button>
                        <button onclick="appendToDisplay('8')">8</button>
                        <button onclick="appendToDisplay('9')">9</button>
                        <button onclick="appendToDisplay('*')">*</button>
                        <button onclick="appendToDisplay('^')">^</button>
                    </div>
                    <div class="button-container">
                        <button onclick="clearDisplay()">C</button>
                        <button onclick="appendToDisplay('0')">0</button>
                        <button onclick="calculateResult()">=</button>
                        <button onclick="appendToDisplay('/')">/</button>
                        <button onclick="appendToDisplay('π')">π</button>
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
