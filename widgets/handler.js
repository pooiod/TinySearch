
function showwidget(query) {
    var html;

    for (var i = 0; i < widgets.length; i++) {
        if (new RegExp(widgets[i].regex).test(query)) {
            document.getElementById("loader").style.top = "80%";
            html = widgets[i];
            break;
        }
    }

    if (html && typeof html.function === 'string') {
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
    } else if (html) {
        html = html.function(query);
    }

    if (html) {
        displayQuickAnswer(html, true);
    }
}
