var express = require('express');
var app = express();

var request=require('request');
var n;
app.get('/', function (req, res) {
    n=3;
    var result=[];
    master(res,result);
    melotic(res,result);
    poloniex(res,result);
});

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

function melotic(res,r){
    var result={};
    var url="https://www.melotic.com/api/markets";
    request(url,function(error,response,body){
        try{
            if (!error && response.statusCode == 200) {
                var json=JSON.parse(body);
                var value=json["sjcx-btc"]["latest_price"];
                var volume=json["sjcx-btc"]["volume"];
                result=({name:"melotic",value:value,volume:volume});
            } else {
                result=({name:"melotic",value:-1,volume:0});
            }
        }catch(e){
            result=({name:"melotic",value:-1,volume:0});
        }finally{
            r.push(result);
            n--;
            send(res,r);
        }
    });
}

function poloniex(res,r){
    var result={};
    var url="https://poloniex.com/public?command=returnTicker";
    request(url,function(error,response,body){
        try{
            if (!error && response.statusCode == 200) {
                var json=JSON.parse(body);
                var value=json["BTC_SJCX"]["last"];
                var volume=json["BTC_SJCX"]["baseVolume"];
                result=({name:"poloniex",value:value,volume:volume});
            } else {
                result=({name:"poloniex",value:-1,volume:0});
            }
        }catch(e){
            result-({name:"poloniex",value:-1,volume:0});
        }finally{
            r.push(result);
            n--;
            send(res,r);
        }
    });
}

function send(res,result){
    console.log(result[result.length-1]["name"])
        if(n==0){
            res.jsonp(result);
        }
}

app.listen(process.env.PORT || 3000);
