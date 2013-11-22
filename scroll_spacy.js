$(document).ready(function() {

  /*
  // 実行
  */
  (function() { 

    // グローバルな変数
    var num = 40;
    var oscArray = new Array(num);
    var oscArrayOriginFreq = new Array(num);
    var envArray = new Array(num);
    var intervalArray = new Array(num);
    var intervalArrayOriginTime = new Array(num);
    


    //
    // setup関数
    //
    function timbleInit() {
      for(var i = 0; i < num; ++i) { 
        
        var env = T("adsr", {a:10,d:250, s:0.04, r: 30 });
        var osc = T("sin", {freq: Math.random()*400 + 100, mul:0.04}).play();
        oscArray[i] = T("OscGen", { osc:osc,  env:env } );
        
        oscArrayOriginFreq[i] = oscArray[i].osc.freq.value;

        

        // //envArrayOriginADSR[i] = 

        var interval = T("param", {value: 300 })
        intervalArrayOriginTime[i] = interval.value
        intervalArray[i] = T("interval", {interval:interval}, oscArray[i]).start();

      }
    }

    function mtof(val) {
      return Math.floor(440*Math.pow(2, (val-69)/12));
    }


    function ftom(frequency) {
      return(69+12*Math.log(frequency/440)/Math.log(2))
    }

    function scaleTonal(freq) {
      return mtof(parseInt(ftom(freq) ) ) 
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
    

  $(window).scroll(function () {
    var sin_val = Math.sin($(window).scrollTop() * 0.001);

    for(var i = 0; i < num; ++i) { 
      oscArray[i].osc.freq.value = 200 + sin_val * oscArrayOriginFreq[i];
      intervalArray[i].interval.value = sin_val  * intervalArrayOriginTime[i] * Math.random() * 20 
    }
    console.log(oscArray[0].osc.freq.value )
    //console.log(intervalArray[0].interval.value);
    //console.log(scaleTonal(oscArray[0].freq.value))
    
  });


  setInterval(function(){
    var array_num = scrollVal();
    
    for(var i=0; i < array_num; i++) {
      //oscArray[i].play();
      oscArray[i].osc.mul = 0.1;
    }
    for(var i=array_num; i < num; i++) {
      oscArray[i].osc.mul = 0.0;
    }
  }, 150);






  })();
});