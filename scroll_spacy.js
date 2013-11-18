$(document).ready(function() {

  /*
  // 実行
  */
  (function() { 

    // グローバルな変数
    var num = 50;
    var tArray = new Array(num);
    var src = wavb("36454d4b41362f303639332309efd9cc362f220df2d9c8c3c6cbccc6bab0aeb7");  

    //
    // setup関数
    //
    function timbleInit() {


      for(var i = 0; i < num; ++i) { 
        tArray[i] = T("osc", { freq: Math.random()*200 + 200, mul:0.03, wave:src }).play();
      };
    }
    function wavb(val) {
      return "wavb("+val+")"
    }

    function aTowevb() {
      return $.map( tArray, function(val) {
        return parseInt(val.freq.value).toString(16);
      }).join("");
    }



    timbleInit();



  $(window).scroll(function () {
    src = wavb(aTowevb()); 
    
    for(var i = 0; i < num; ++i) { 
      
      tArray[i].wave = src;
      if (tArray[i].freq.value < tArray[i].freq.value + $(window).scrollTop() * 0.01 ){
        tArray[i].freq.value += $(window).scrollTop() * 0.01;
      }else{
        tArray[i].freq.value -= $(window).scrollTop() * 0.01;
      }
      
    }
    
  });


  })();
});