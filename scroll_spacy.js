$(document).ready(function() {

  /*
  // 実行
  */
  (function() { 

    // グローバルな変数
    var num = 20;
    var oscArray = new Array(num);
    var oscArrayOriginFreq = new Array(num);
    
    var intervalArray = new Array(num);
    var intervalArrayOriginTime = new Array(num);
    


    //
    // setup関数
    //
    function timbleInit() {
      for(var i = 0; i < num; ++i) { 
        oscArray[i] = T("sin", {freq: Math.random()*400 + 100, mul:0.04});
        oscArrayOriginFreq[i] = oscArray[i].freq.value;
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
          return value = (value<0)? 0 : value ;
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
      oscArray[i].freq.value = 200 + sin_val * oscArrayOriginFreq[i];
      
    }
    
  });


  setInterval(function(){
    var array_num = scrollVal();
    var onTable  =  T("param").linTo(0.2, 100).once("ended", function() {
      this.linTo(0.0, 300).pause();
    });
    //var offTable  = T("param").linTo(0.0, "1sec");
    
    for(var i=0; i < array_num; i++) {
      T("*", oscArray[i], onTable).play();
      console.log(oscArray[0]);
    }
      
  }, 150);







  })();
});