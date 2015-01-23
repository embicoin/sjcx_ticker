sjcx_ticker
====

ticker of sjcx from Melotic and PoloniEx and return as JSONP.

## Description
This node.js program get ticker of sjcx from from Melotic and PoloniEx by using REST API,
and return jsonp on http://<hostname>/ and return widget for web pages on http://<hostname>/sjcx_ticker.html

## demo page
widget:  https://sjcx-ticker.herokuapp.com/sjcx_ticker.html

jsonp : https://sjcx-ticker.herokuapp.com/
  
  
## Requirement
* node.js
* express
* request

## Usage
just run node sjcx_ticker.js, and access it by your program using jsonp or browser.
If you want to embed widget, add a line in your page.
```
<iframe seamless frameborder="0" src="https://<hostname>/sjcx_ticker.html …" width="300" height="130" >
```

## Contribution
Feel free to make any improvements, and to pull requests. 

## Licence
BSD license

