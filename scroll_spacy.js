$(document).ready(function() {

  /*
  // 実行
  */
  (function() { 

    // グローバルな変数
    var num = 50;
    var tArray = new Array(num);
    var buffer = new Float32Array(44100);


    //
    // setup関数
    //
    function timbleInit() {
      var src = "wavb(36454d4b41362f303639332309efd9cc362f220df2d9c8c3c6cbccc6bab0aeb7)";

      for(var i = 0; i < num; ++i) { 
        tArray[i] = T("osc", { freq: Math.random()*200 + 200, mul:0.03, wave:buffer, wave:src }).play();
      };
    }



    timbleInit();



  $(window).scroll(function () {

    for(var i = 0; i < num; ++i) { 
      var table = [0.5, [0, 500]];
      if (tArray[i].freq.value < tArray[i].freq.value + $(window).scrollTop() * 0.01 ){
        tArray[i].freq.value += $(window).scrollTop() * 0.01;
      
      }else{
        tArray[i].freq.value -= $(window).scrollTop() * 0.01;
      }
      // T("env", {table:table}, tArray[i]).on("ended", function() {
      //   this.pause();
      // }).bang().play();
    }
    console.log($(window).scrollTop() );
  });


  })();
});