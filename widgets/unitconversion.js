window.widgetmain = function(query) {
    var frame = `<!DOCTYPE html>
<html lang="en">
<head>
	<meta http-equiv="content-type" content="text/html; charset=UTF-8" />
	<title>Unit Converter</title>
	<link rel="stylesheet" href="//d15gdne58bo42a.cloudfront.net/style-n.css" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>

<div id="clear"></div>
<div id="contentout">
	<div id="content">

<div id="unquickcalc" style="display:none;"></div>
<div id="menu"><ul><li id="menuon"><a href="javascript:popMenu(&quot;Length&quot;);showSel(lA);">Length</a></li> <li><a href="javascript:popMenu(&quot;Temperature&quot;);showSel(tA);">Temperature</a></li> <li><a href="javascript:popMenu(&quot;Area&quot;);showSel(aA);">Area</a></li> <li><a href="javascript:popMenu(&quot;Volume&quot;);showSel(vA);">Volume</a></li> <li><a href="javascript:popMenu(&quot;Weight&quot;);showSel(wA);">Weight</a></li> <li><a href="javascript:popMenu(&quot;Time&quot;);showSel(mA);">Time</a></li> </ul></div>
<script>
var isMobile = false;
</script>
<div id="qcvt">
<table border="0" align="center" style="padding-top:5px;">
<form name="calForm">
	<tr><td><label for="fromVal"><b>From:</b></label></td><td>&nbsp;</td><td><label for="toVal"><b>To:</b></label></td></tr>
	<tr><td><input type="text" name="fromVal" id="fromVal" onKeyUp="calcul();" class="ucinput" autofocus></td><td>&nbsp;</td><td><input type="text" id="toVal" name="toVal" style="background-color:#eeeeee;" class="ucinput" readonly></td></tr>
	<tr><td style="padding-top:8px;"><select name="calFrom" id="calFrom" onChange="calcul();" size="11" class="ucselect"></select></td><td>&nbsp;</td><td style="padding-top:8px;"><select name="calTo" id="calTo" size="11" onChange="calcul();" class="ucselect"></select></td></tr>
</form>
</table>
<br><div id="calResults"></div>
</div>


<br><div id="findutoc" hidden>
<h3>Find the Units to Convert</h3>
<table align="center" border="0" cellspacing="0" cellpadding="0">
<form>
	<tr><td><label for="fromunit"><b>From Unit:</b></label></td><td>&nbsp;</td><td><label for="tounit"><b>To Unit:</b></label></td></tr>
	<tr>
		<td><input type="text" name="fromunit" id="fromunit" onKeyUp="findUnit();" class="ucinput" placeholder="e.g. kilogram"></td>
		<td>&nbsp;</td>
		<td><input type="text" name="tounit" id="tounit" onKeyUp="findUnit();" class="ucinput" placeholder="e.g. lbs"></td>
	</tr>
</form>
</table>
<div id="futcResult"></div>
</div>

<script src="//d15gdne58bo42a.cloudfront.net/js/homeunit.js" async></script>
<script src="//d15gdne58bo42a.cloudfront.net/js/common.js" async></script>

	</div>
</div>
</body>
</html>`;
    setTimeout(function(){
        document.getElementById('embedwidgetframe').contentWindow.document.body.innerHTML = html;
    }, 1)
    return`<iframe id="embedwidgetframe"></iframe>`;
};
