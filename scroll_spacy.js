$(document).ready(function() {

  /*
  // 実行
  */
  (function() { 

    // グローバルな変数
    var num = 100;
    var oscArray = new Array(num);
    var oscArrayOriginFreq = new Array(num);
    var intervalArray = new Array(num);
    var intervalArrayOriginTime = new Array(num);
    var src = wavb("00112233445566778877665544332211");  


    //
    // setup関数
    //
    function timbleInit() {
      for(var i = 0; i < num; ++i) { 
        
        oscArray[i] = T("tri", { freq: Math.random()*400 + 200, mul:0.03, env:env}).plot({target:wavbase});
        oscArrayOriginFreq[i] = oscArray[i].freq.value;

        var env = T("adshr", {a:20, r: 300 }, oscArray[i]).bang().play();

        var interval = T("param", {value: 20 })
        intervalArrayOriginTime[i] = interval.value
        intervalArray[i] = T("interval", {interval:interval}, env).start();

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
          return value = (value<0)? 0 : value ;
        }else{
          scrollVal = $(window).scrollTop();
          value += 1;
          return value = (value>50)? 50 : value ;
        }
      }
    }



    var scrollVal = scrollAmount();

    timbleInit();



  $(window).scroll(function () {
    var sin_val = Math.sin($(window).scrollTop() * 0.001);
    for(var i = 0; i < num; ++i) { 
      oscArray[i].freq.value = parseInt(200 + sin_val * oscArrayOriginFreq[i]);
      intervalArray[i].interval.value = sin_val * 40  * intervalArrayOriginTime[i] * Math.random() * 20 
    }
//    console.log(intervalArray[0].interval.value);
    
  });


  setInterval(function(){
    scrollVal();
  }, 100);






  })();
});