var widgets = [
    {
        "regex": ".*calculator.*|^[0-9+\\-*/^().\\sπpi]+$",
        "function": "/widgets/calculator.js"
    }
]

async function showwidget(query) {
    var html;

    for (var i = 0; i < widgets.length; i++) {
        if (query.match(widgets[i].regex)) {
            html = widgets[i];
            break;
        }
    }

    if (typeof html.function === 'string') {
        const response = await fetch(html.function);
        const code = await response.text();
        const func = new Function("query", code.match(/function\s+main\s*\(query\)\s*\{([\s\S]*?)\}/)[1]);
        html = func(query);
    } else {
        html = html.function(query);
    }

    if (html) {
        document.getElementById("loader").style.top = "80%";
        displayQuickAnswer(html, true);
    }
}
