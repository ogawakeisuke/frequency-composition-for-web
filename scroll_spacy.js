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



    timbleInit();



  $(window).scroll(function () {
    var sin_val = Math.sin($(window).scrollTop() * 0.001);
    for(var i = 0; i < num; ++i) { 
      oscArray[i].freq.value = parseInt(200 + sin_val * oscArrayOriginFreq[i]);
      intervalArray[i].interval.value = sin_val * ( Math.sin($(window).scrollTop() * 0.001) * 400 ) * intervalArrayOriginTime[i]
    }
    console.log(intervalArray[0].interval.value);
    
  });


  })();
});