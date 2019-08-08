var myClarifaiApiKey = 'cdacfc8df64e4f2f9205b5a3936c2790';
var myWolframAppId = 'GEQRT4-WG4X227VAL';

var app = new Clarifai.App({apiKey: myClarifaiApiKey});

/*
  Purpose: Pass information to other helper functions after a user clicks 'Predict'
  Args:
    value - Actual filename or URL
    source - 'url' or 'file'
    */
function predict_click(value, source) {
  var preview = $(".food-photo");
  var file    = document.querySelector("input[type=file]").files[0];
  var loader  = "https://s3.amazonaws.com/static.mlh.io/icons/loading.svg";
  var reader  = new FileReader();

  // load local file picture
  reader.addEventListener("load", function () {
    preview.attr('style', 'background-image: url("' + reader.result + '");');
    doPredict({ base64: reader.result.split("base64,")[1] });
  }, false);

  if (file) {
    reader.readAsDataURL(file);
    $('#concepts').html('<img src="' + loader + '" class="loading" />');
  } else { alert("No file selcted!"); }
}

/*
  Purpose: Does a v2 prediction based on user input
  Args:
    value - Either {url : urlValue} or { base64 : base64Value }
*/
function doPredict(value) {
  app.models.predict(Clarifai.FOOD_MODEL, value).then(function(response) {
      if(response.rawData.outputs[0].data.hasOwnProperty("concepts")) {
        var tag = response.rawData.outputs[0].data.concepts[0].name;
        var url = 'http://api.wolframalpha.com/v2/query?input='+tag+'%20nutrition%20facts&appid='+myWolframAppId;
        console.log(tag);
        $('.tagkey').html("<h4>The food is: "+ tag + "</h4>");
        getNutritionalInfo(url, function (result) {
          $('#concepts').html('<h3>'+ tag + '</h3>'+ "<img height='800' width='100%' src='"+result+"'>");
          $('.recipeclass').html("<button id='clickplace' class='btn btn-success btn-lg btn-block'>Show recipe</button>");

          $("#clickplace").click(function(){
            $('#seetag').val(tag);
            $('#sendtag').appendTo($(document.body)).submit();
          });

        });
      }
    }, function(err) { console.log(err); });
}

