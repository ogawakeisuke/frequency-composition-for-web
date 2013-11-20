$(document).ready(function() {

  /*
  // 実行
  */
  (function() { 

    // グローバルな変数
    var num = 50;
    var tArray = new Array(num);
    var src = wavb("00112233445566778877665544332211");  


    //test
    // var len    = 44100;
    // var buffer = new Float32Array(len);
    // for (var i = 0; i < buffer.length; i++) {
    //   buffer[i] = Math.sin(Math.PI * 0.001 * i) * (i/len) * (1-(i/len)) * 2;
    // }
    // buffer = { buffer:buffer, samplerate:22050 };
    // var src = wavb(buffer);  



    //
    // setup関数
    //
    function timbleInit() {


      for(var i = 0; i < num; ++i) { 
        tArray[i] = T("osc", { freq: Math.random()*200 + 200, mul:0.03, wave:src }).plot({target:wavbase}).play();
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
    //src = wavb(aTowevb()); 
    
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