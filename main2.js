$(document).ready(function() {
  /*
  // 三角関数
  */
  function Cycloyd(coef){
    var a1 = 0.6, 
      a2 = 2.3, 
      b1 = 0.7 * coef, 
      b2 = 0.15 * coef, 
      k = 0.175;

    this.val = 0;

    this.dynamic = function(count_is) {
      var base1 = a1 * Math.sin(b1 * count_is );
      var base2 = a2 * Math.cos(b2 * count_is);
      var dynamics = base1 / base2;

      this.val = k * Math.sin(dynamics) * 0.2;
    };
  }

  
  /*
  // とりあえずサイン波オシレータ
  */

  function sinetone(freq) {
    var phase = 0,
        phaseStep = freq / pico.samplerate;
    return {
        process: function(L, R) {
            for (var i = 0; i < L.length; i++) {
                L[i] = R[i] = Math.sin(6.28318 * phase) * 0.25;
                phase += phaseStep;
            }
        }
    };
  }



  /*
  // カウンター
  */
  function counter(count) {
    return count += 0.002;
  };


  /*
  // 実行 リファクタリング必要
  */
  $("#start").on("click", function() { 
    var count = 0;
    var num = 128;
    var cycloydArray = new Array(num);
    var threshould = 0;
    var circ;
    for(var i = 0; i < cycloydArray.length; ++i) { 
      cycloydArray[i] = new Cycloyd(Math.random() * 10);
    };

    var paper = Raphael("svg", 1280, 1000);


    setInterval(function() {
      count = counter(count);
      paper.clear();
      for(var i = 0; i < cycloydArray.length; ++i) { 
        cycloydArray[i].dynamic(count);
        
        circ = paper.circle(cycloydArray[i].val * 30000 + 400,150, 7);
      }

      pico.play(sinetone(count));

      // pico.play({
      //   process: function(L, R) {
      //     for (var i = 0; i < L.length; i++) {
      //       L[i] = R[i] = threshould;
      //     }
      //   }
      // });

    },20);

  })

  $(window).mousemove(function(e){
    var dx = e.clientX;
    
    pico.play(sinetone(dx));
  });


  $("#stop").on("click", function() { 
    pico.pause();
  })

});