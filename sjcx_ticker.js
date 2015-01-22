var express = require('express');
var app = express();

var request=require('request');
var n=2;

var exchanges=[
{
    name:"Melotic",
    url:"https://www.melotic.com/api/markets",
    pair:"sjcx-btc",
    hp:"https://www.melotic.com/markets/sjcx-btc",
    params:{
        price:"latest_price",
        high:"highest_deal_price",
        low:"lowest_deal_price"
    }
},
{
    name:"Poloniex",
    url:"https://poloniex.com/public?command=returnTicker",
    pair:"BTC_SJCX",
    hp:"https://www.poloniex.com/exchange#btc_sjcx",
    params:{
        price:"last",
        high:"high24hr",
        low:"low24hr"
    }
}
];


app.get('/', function (req, res) {
    console.log("index");
    var result=[];
    for(var i=0;i<exchanges.length;i++){
        getTicker(res,result,i,function(result){
            if(result.length==n){
                res.jsonp(result);
            }
        });
    }
});

app.use(express.static(__dirname+'/public'));


function getTicker(res,result,i,atLast){
    var r={};
    r.name=exchanges[i].name;
    request(exchanges[i].url,function(error,response,body){
        try{
            if (!error && response.statusCode == 200) {
                var json=JSON.parse(body);
                for(key in exchanges[i].params){
                    r[key]=json[exchanges[i].pair][exchanges[i].params[key]];
                }
            } else {
                r.value=-1;
            }
        }catch(e){
            r.value=-1;
        }finally{
            result.push(r);
            atLast(result);
        }
    });
}
var port=process.env.PORT || 3000;

var server=app.listen(port,function(){
    var host = server.address().address;
    console.log('listening at http://%s:%s', host, port);
});


/*
   function master(res,r){
   var result={};
   result.name="masterXchange";
   var dt = parseInt(new Date().getTime()/1000);
   dt-=24*60*60; 
   var url="https://masterxchange.com/api/v2/trades.php?timestamp="+dt+"&currency=xcpsjcx";
   request(url,function(error,response,body){
   try{
   if (!error && response.statusCode == 200) {
   var json=JSON.parse(body);
   if(json.length>0){
   value=json[0]["price"];
   var volume=0;

   for(var i=0;i<json.length;i++){
   volume+=parseFloat(json[i]["amount"]);
   }

   result.value=value;
   result.volume=volume;
   }else{
   result.value=-1;
   result.volume=0;
   }
   } else {
   result.value=-1;
   result.volume=0;
   }
   }catch(e){
   result.value=-1;
   result.volume=0;
   }finally{
   r.push(result);
   n--;
   send(res,r);
   }
   });
   }
   */
