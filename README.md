sjcx_ticker
====

ticker of sjcx from Melotic and PoloniEx and return as JSONP.

## Description
This node.js program get ticker of sjcx from from Melotic and PoloniEx by using REST API,
and return jsonp on http://<hostname>/ and return widget for web pages on http://<hostname>/sjcx_ticker.html

## Demo Page
widget:  https://sjcx-ticker.herokuapp.com/sjcx_ticker.html

jsonp : https://sjcx-ticker.herokuapp.com/
  
  
## Requirement
* node.js
* express
* request

## Usage
1. npm install in sjcx_tikcer directory.
1. node sjcx_ticker.js
2. access port 3000 by your program using jsonp or browser.

If you want to embed widget, add a line in your page.
```
<iframe seamless frameborder="0" src="https://<hostname>/sjcx_ticker.html …" width="300" height="130" >
```

## Contribution
Feel free to make any improvements, and to pull requests. 

## Licence
BSD license

