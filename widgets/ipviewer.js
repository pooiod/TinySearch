window.widgetmain = async function(query) {
    const ipPromise = (async () => {
        const ipv4Response = await fetch("https://api.ipify.org?format=json");
        const ipv4Data = await ipv4Response.json();
        const ipv6Response = await fetch("https://api64.ipify.org?format=json");
        const ipv6Data = await ipv6Response.json();
        return { ipv4: ipv4Data.ip, ipv6: ipv6Data.ip };
    })();

    (async function() {
        const { ipv4, ipv6 } = await ipPromise;
        // document.getElementById('ipv4').textContent = ipv4;
        document.getElementById('ipv6').textContent = ipv6;
    })();

    return `
        <style>
            #quick-answer .ip-widget {
                display: flex;
                flex-direction: column;
                align-items: center;
                margin: 0px;
                padding: 10px;
                text-align: center;
            }
            #quick-answer .ip-address {
                font-size: 10px;
                margin: 10px 0;
                transition: filter 0.3s;
                filter: blur(2px);
            }
            #quick-answer .ip-address:hover {
                filter: blur(0);
            }
            #quick-answer .ip-label {
                font-size: 18px;
                margin-bottom: 5px;
            }
        </style>
        <div class="ip-widget">
            // <div class="ip-label">Your IPv4 Address:</div>
            // <div class="ip-address" id="ipv4">Loading...</div>
            <div class="ip-label">Your IPv6 Address:</div>
            <div class="ip-address" id="ipv6">Loading...</div>
        </div>
    `;
}
