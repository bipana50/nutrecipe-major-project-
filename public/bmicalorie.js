$(document).ready(function(){
    $('.bmi').click(function(){
        var wkg = $('#weight').val();
        var hft = $('#heightinfeet').val();
        var hin = $('#heightininches').val();
        var age = $('#age').val();
        var gender = $("input[name='gender']:checked").val();
        var activity = $("select[name='activity']").children("option:selected").val();
        var totalheightinch = (hft*12) + Number(hin); 
        var totalheightmeter = totalheightinch * 0.0254;
        var bmi = wkg/(totalheightmeter * totalheightmeter);
        
        if(gender === "female"){
          var BMR = (wkg * 2.2 *4.35) + (totalheightinch * 4.7) - (age * 4.7) + 655;
        }else if(gender === "male") {
            var BMR = (wkg * 2.2 *6.23) + (totalheightinch * 12.7) - (age * 6.8) + 66;
        }
         
        var dailyCalorie = BMR * activity;
        console.log(dailyCalorie);
        $('#title').text("Your BMI and Calorie Resolution");
        $('.value1').text("Your bmi is: "+ bmi.toFixed(2) +" kg/m^2");
        
      
        console.log(typeof(bmi));
        if(bmi<18.5){
          $('.value1').append("<h4>Remark: You're in the underweight range</h4>");
          $('.value2').text("You need to consume more than: "+ dailyCalorie.toFixed(2) + " calories to increase your current weight");
        }else if(bmi>=18.5 && bmi<=24.9){
          console.log("hello");
          $('.value1').append("<h4>Remark: You're in the healthy weight range</h4>");
          $('.value2').text("You need to consume: "+ dailyCalorie.toFixed(2) + " calories to maintain your current weight");
        }else if(bmi>24.9 && bmi<=29.9){
          $('.value1').append("<h4>Remark: You're in the overweight range</h4>");
          $('.value2').text("You need to consume less than: "+ dailyCalorie.toFixed(2) + " calories to decrease your current weight. Or exercising more might work.");
        }else{
          $('.value1').append("<h4>Remark: You're in the obese range</h4>");
          $('.value2').text("You need to consume less than: "+ dailyCalorie.toFixed(2) + " calories to decrease your current weight. Consulting nutritionist and doctors with physical exercise might work.");
        }
        $('form').hide();
        });        
});
