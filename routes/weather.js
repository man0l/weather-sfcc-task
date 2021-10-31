var express = require('express');
var router = express.Router();
var fs = require("fs"),
    json;

/* GET weather. */
router.get('/', function(req, res, next) {
  json = getConfig('../weather.json');  
  res.render('weather', { weatherData: json });  
});

router.post('/', function(req, res, next) {
    let selectedCity = {};
    json = getConfig('../weather.json');  

    for(i in json) {        
        if(req.body.city_id == json[i].id) {
            selectedCity = json[i];
        }
    }
    
    res.render('weather', { weatherData: json, city: selectedCity });  
  });

function readJsonFileSync(filepath, encoding){

    if (typeof (encoding) == 'undefined'){
        encoding = 'utf8';
    }
    var file = fs.readFileSync(filepath, encoding);
    return JSON.parse(file);
}

function getConfig(file){

    var filepath = __dirname + '/' + file;
    return readJsonFileSync(filepath);
}


module.exports = router;
