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
    var oscArray = new Array(num);
    var threshould = 0;
    var circ;
    for(var i = 0; i < oscArray.length; ++i) { 
      oscArray[i] = new Cycloyd(Math.random() * 10);
    };

    var paper = Raphael("svg", 1280, 1000);


    setInterval(function() {
      count = counter(count);
      paper.clear();
      for(var i = 0; i < oscArray.length; ++i) { 
        oscArray[i].dynamic(count);
        
        circ = paper.circle(oscArray[i].val * 30000 + 400,150, 7);
      }
    


      // pico.play({
      //   process: function(L, R) {
      //     for (var i = 0; i < L.length; i++) {
      //       L[i] = R[i] = threshould;
      //     }
      //   }
      // });

    },20);

  })


  $("#stop").on("click", function() { 
    pico.pause();
  })

});