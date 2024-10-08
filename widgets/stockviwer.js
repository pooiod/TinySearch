window.widgetmain = function(query, results) {
    setTimeout(function(){
        document.getElementById('stockButton').addEventListener('click', function() {
            const symbol = document.getElementById('stockInput').value.trim();
            if (symbol === '') return;
            
            const iframeSrc = `https://s.tradingview.com/widgetembed/?frameElementId=tradingview_12345&symbol=${symbol.toUpperCase()}&interval=D&hidesidetoolbar=1&symboledit=1&saveimage=1&toolbarbg=f1f3f6&studies=[]&theme=light&style=1&timezone=exchange&studies_overrides={}&overrides={}&enabled_features=[]&disabled_features=[]&locale=en`;
            document.getElementById('stockFrame').src = iframeSrc;
        });
        if (query.match("^\\w+ stock(s view|s| view| price| market)?$")) {
            document.getElementById('stockInput').value = query.split(' ')[0];
            document.getElementById('stockButton').click();
        }
    }, 500);
    window.addEventListener('message', function(event) {
        if (event.data === 'unblockerloaded') {
            if (document.getElementById('stockInput').value.trim() === '') return;
            var yahoolink = JSON.stringify(results).match(/https:\/\/pinhole\.finance\.yahoo\.com.*?\/__screenshot/g);
            
            const iframe = document.getElementById('stockFrame');
            
            const img = new Image();

            if (yahoolink) {
                img.src = yahoolink;
            } else {
                img.src = `https://pinhole.finance.yahoo.com/chart/${document.getElementById('stockInput').value.trim().toUpperCase()}/__screenshot`;
            }
            
            img.onload = () => {
                iframe.src = "/imgview.html?img=" + img.src;
                iframe.style.height = "440px";
            };
            
            img.onerror = () => {
                iframe.src = "data:text/plain,Unable to find stock price"; 
            };
        }
    });    
    return `
<style>
    #stockFrame { border: 1px solid #d4d4d4; width: 100%; height: 350px; margin-top: 20px; }
    #stockInput { padding: 8px; font-size: 16px; width: 80%; display: inline-block; }
    #stockButton { padding: 10px; font-size: 16px; cursor: pointer; display: inline-block; }
</style>
<h1 style="margin-left: 20px;">Stock Price Viewer</h1>
<input type="text" id="stockInput" placeholder="Enter stock symbol (e.g., AAPL)">
<button id="stockButton">Get Stock Price</button>
<iframe id="stockFrame" src="data:txt,Choose a company to view" allowfullscreen></iframe>
`;
}
