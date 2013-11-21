$(document).ready(function() {

  /*
  // 実行
  */
  (function() { 

    // グローバルな変数
    var num = 70;
    var oscArray = new Array(num);
    var oscArrayOriginFreq = new Array(num);
    var envArray = new Array(num);
    var intervalArray = new Array(num);
    var intervalArrayOriginTime = new Array(num);
    var src = wavb("00112233445566778877665544332211");  


    //
    // setup関数
    //
    function timbleInit() {
      for(var i = 0; i < num; ++i) { 
        
        oscArray[i] = T("sin", { freq: Math.random()*400 + 100, mul:0.03}).plot({target:wavbase});
        oscArrayOriginFreq[i] = oscArray[i].freq.value;

        envArray[i] = T("adsr", {a:20, d:500, s:0.2,r: 100 }, oscArray[i]).bang().play();

        //envArrayOriginADSR[i] = 

        var interval = T("param", {value: 200 })
        intervalArrayOriginTime[i] = interval.value
        intervalArray[i] = T("interval", {interval:interval}, envArray[i]).start();

      }
    }


    function wavb(val) {
      return "wavb("+val+")"
    }

    function aTowevb() {
      return $.map( oscArray, function(val) {
        return parseInt(val.freq.value).toString(16);
      }).join("");
    }

    /*　スクロール量で値を変化させる */
    function scrollAmount() {
      var value = 0;
      var scrollVal = 0;
      return function() {
        if ( $(window).scrollTop() == scrollVal ) {
          value -= 1;
          return value = (value<2)? 2 : value ;
        }else{
          scrollVal = $(window).scrollTop();
          value += 1;
          return value = (value>num)? num : value ;
        }
      }
    }



    var scrollVal = scrollAmount();

    timbleInit();
    console.log(envArray[0].table )



  $(window).scroll(function () {
    var sin_val = Math.sin($(window).scrollTop() * 0.001);

    for(var i = 0; i < num; ++i) { 
      oscArray[i].freq.value = parseInt(200 + sin_val * oscArrayOriginFreq[i]);
      intervalArray[i].interval.value = sin_val  * intervalArrayOriginTime[i] * Math.random() * 20 
    }
//    console.log(intervalArray[0].interval.value);
    
  });


  setInterval(function(){
    var array_num = scrollVal();
    
    for(var i=0; i < array_num; i++) {
      oscArray[i].mul = 0.03;
    }
    for(var i=array_num; i < num; i++) {
      oscArray[i].mul = 0.0;
    }
  }, 150);






  })();
});