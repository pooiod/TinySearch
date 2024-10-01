var widgets = [
    {
        "regex": ".*calculator.*|^[0-9+\\-*/^().\\sπpi]+$",
        "function": "/widgets/calculator.js"
    }
]

function showwidget(query) {
    var html;

    for (var i = 0; i < widgets.length; i++) {
        if (query.match(widgets[i].regex)) {
            html = widgets[i];
            break;
        }
    }

    document.getElementById("loader").style.top = "80%";

    if (typeof html.function === 'string') {
        const script = document.createElement('script');
        script.src = html.function;

        script.onload = function() {
            if (typeof widgetmain === 'function') {
                html = widgetmain(query);
                if (html) {
                    displayQuickAnswer(html, true);
                }
            } else {
                console.error("Widget did not respond with widgetmain function.");
            }
        };

        document.head.appendChild(script);
    } else {
        html = html.function(query);
    }

    if (html) {
        displayQuickAnswer(html, true);
    }
}
