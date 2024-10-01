var widgets = [
    {
        "regex": ".*calculator.*|^[-+]?[0-9]*\\.?[0-9]+\\s*[-+*/]\\s*[-+]?[0-9]*\\.?[0-9]+$",
        "function": function(query) {
            const calculate = (equation) => {
                try {
                    return eval(equation);
                } catch (error) {
                    return 'Error';
                }
            };
    
            if (/calculator/i.test(query)) {
                return `
                    <div>
                        <input type="text" id="display" readonly>
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
                        </div>
                    </div>
                `;
            } else if (/^[-+]?[0-9]*\\.?[0-9]+\\s*[-+*/]\\s*[-+]?[0-9]*\\.?[0-9]+$/.test(query)) {
                return calculate(query);
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
