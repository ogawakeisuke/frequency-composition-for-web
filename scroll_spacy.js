$(document).ready(function() {

  /*
  // 実行
  */
  (function() { 

    // グローバルな変数
    var oscMelo;
    var drawnNum = 10;
    var oscDrawn = new Array(drawnNum);
    var oscDrawnOriginFreq = new Array(drawnNum);
    
    var intervalArray = new Array(drawnNum);
    var intervalArrayOriginTime = new Array(drawnNum);
    


    //
    // setup関数
    //
    function timbleInit() {

      for(var i = 0; i < drawnNum; ++i) { 
        oscDrawn[i] = T("sin", {freq: Math.random()*400 + 100, mul:0.08});
        oscDrawnOriginFreq[i] = oscDrawn[i].freq.value;
      }

      var meloosc = T("tri");
      var meloenv =  T("perc", {a:10, r:200});
      oscMelo = T("OscGen",{ osc:meloosc, env:meloenv,  mul:0.3}).play();
      
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
          return value = (value>drawnNum)? drawnNum : value ;
        }
      }
    }

    var scrolling = scrollAmount();
    timbleInit();
    




  $(window).scroll(function () {
    var sin_val = Math.sin($(window).scrollTop() * 0.001);
    for(var count = 0; count < drawnNum; ++count) { 
      oscDrawn[count].freq.value = 200 + sin_val * oscDrawnOriginFreq[count];
    }
    var magicMeloVal = parseInt(1000 * sin_val)
    if(magicMeloVal % 9 == 0 ){
      oscMelo.noteOn( ( parseInt(Math.random() * 12)  * 4 ) + 70, 60);
      console.log(( parseInt(Math.random() * 12)  * 4 ) + 70)
    }
  
  });


  setInterval( function(){
    var arrayNum = scrolling();
 
    for(var i = 0; i < arrayNum; i++ ) {
      T("perc", {a: 100, r:200},oscDrawn[i]).bang().play();  
      oscMelo.play()    
    }

    /*　非常に苦しいがtimbreでオーディオメモリ解放がreset関数しかない　厳しい　*/
    (arrayNum == 0)? setTimeout(function(){T.reset();}, 300) : "" ;
    
  }, 200);





  })();
});