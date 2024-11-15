window.widgetmain = function(query) {
    var html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta http-equiv="content-type" content="text/html; charset=UTF-8" />
  <title>Unit Converter</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: Arial, sans-serif;
    }

    body, html {
      height: 100%;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #333;
    }

    #contentout {
      width: 100%;
      height: 100%;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      padding: 20px;
    }
    #content {
      height: 100%;
    }
    form {
      height: 100%;
    }

    #menu ul {
      display: flex;
      overflow: auto;
      justify-content: space-around;
      list-style: none;
      margin-bottom: 15px;
      border-radius: 5.5px;
      background: #fff;
      border: 1px solid #ccc;
    }
    #menu li {
      flex: 1;
      text-align: center;
    }
    #menu a {
      display: block;
      padding: 10px;
      text-decoration: none;
      color: #007bff;
      font-weight: bold;
      border-radius: 4px;
    }
    #menu a:hover {
      background-color: #6eb4ff;
      color: white;
    }
    #menu li#menuon a {
      background-color: #007bff;
      color: white;
    }

    table {
      width: 100%;
      height: 100%;
      margin-top: 10px;
    }
    label {
      font-weight: bold;
      font-size: 1rem;
    }
    .ucinput {
      width: 100%;
      padding: 10px;
      font-size: 1rem;
      border: 1px solid #ccc;
      border-radius: 4px;
      margin-top: 8px;
    }
    .ucselect {
      width: 100%;
      height: calc(100vh - 175px);
      padding: 10px;
      font-size: 1rem;
      margin-top: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    select {
      height: 100%;
    }
    
    #calResults {
      position: fixed;
      bottom: 10px;
      border-radius: 4px;
      background: #fff;
      border: 1px solid #ccc;
      padding: 5px;
      max-width: calc(100vw - 40px);
    }
  </style>
</head>
<body>

<div id="contentout">
  <div id="content">

    <div id="menu">
      <ul>
        <li id="menuon"><a href="javascript:popMenu('Length');showSel(lA);">Length</a></li>
        <li><a href="javascript:popMenu('Temperature');showSel(tA);">Temperature</a></li>
        <li><a href="javascript:popMenu('Area');showSel(aA);">Area</a></li>
        <li><a href="javascript:popMenu('Volume');showSel(vA);">Volume</a></li>
        <li><a href="javascript:popMenu('Weight');showSel(wA);">Weight</a></li>
        <li><a href="javascript:popMenu('Time');showSel(mA);">Time</a></li>
      </ul>
    </div>

    <div id="qcvt">
      <form name="calForm">
        <table border="0" align="center">
          <tr>
            <td><label for="fromVal">From:</label></td>
            <td></td>
            <td><label for="toVal">To:</label></td>
          </tr>
          <tr>
            <td><input type="text" name="fromVal" id="fromVal" onKeyUp="calcul();" class="ucinput" autofocus></td>
            <td></td>
            <td><input type="text" id="toVal" name="toVal" class="ucinput" readonly style="background-color:#eeeeee;"></td>
          </tr>
          <tr>
            <td><select name="calFrom" id="calFrom" onChange="calcul();" size="5" class="ucselect"></select></td>
            <td></td>
            <td><select name="calTo" id="calTo" size="5" onChange="calcul();" class="ucselect"></select></td>
          </tr>
        </table>
      </form>
      <div id="calResults"></div>
    </div>

  </div>
</div>

<script src="//d15gdne58bo42a.cloudfront.net/js/homeunit.js" async></script>
<script src="//d15gdne58bo42a.cloudfront.net/js/common.js" async></script>

</body>
</html>`;
    setTimeout(function(){
        var iframe = document.getElementById('embedwidgetframe');
        iframe.contentWindow.document.open();
        iframe.contentWindow.document.write(html);
        iframe.contentWindow.document.close();        
    }, 1)
    return`<iframe id="embedwidgetframe" style="border: none; width: 100%; height: 450px;"></iframe>`;
};
