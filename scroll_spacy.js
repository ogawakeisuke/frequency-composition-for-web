$(document).ready(function() {

  /*
  // 実行
  */
  (function() { 

    // グローバルな変数
    var num = 5;
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


    var scrolling = scrollAmount();

    timbleInit();
    

  $(window).scroll(function () {
    var sin_val = Math.sin($(window).scrollTop() * 0.001);
    for(var count = 0; count < num; ++count) { 
      oscArray[count].freq.value = 200 + sin_val * oscArrayOriginFreq[count];
      
    }
    
  });


  setInterval( function(){
    var array_num = scrolling();
      var onTable = T("param").linTo(0.6, 100).on("ended", function() {
      this.linTo(0.01, 300);
      
    });
 
    for(var i = 0; i < array_num; i++ ) {
      T("*", oscArray[i], onTable).play();      
    }


    /*　非常に苦しいがtimbreでオーディオメモリ解放がreset関数しかない　厳しい　*/
    (array_num == 0)? setTimeout(function(){T.reset();}, 300) : "" ;

    
  }, 200);







  })();
});