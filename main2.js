$(document).ready(function() {
  /*
  // 三角関数
  */
  function Cycloyd(coef){
    var a1 = 1.6, 
      a2 = 2.3, 
      b1 = 0.7 * coef, 
      b2 = 0.15 * coef, 
      k = 0.175;

    this.val = {};

    this.dynamic = function(count_is) {
      var base1 = a1 * Math.sin(b1 * count_is );
      var base2 = a2 * Math.cos(b2 * count_is);
      var dynamics = base1 / base2;

      this.val = { 
        x_is : k * Math.cos(dynamics) * Math.sin(dynamics) * 0.2,
        y_is : k * Math.sin(dynamics) * Math.tan(dynamics) * 0.2 
      };
    }
  }


  /*
  // カウンター
  */
  function counter(count) {
    return count += 1;
  };


  /*
  // 実行 リファクタリング必要
  */
  $("#start").on("click", function() { 

    //
    // setup
    //
    var count = 0;
    var num = 1;
    var cycloydArray = new Array(num);
    var tArray = new Array(num);
    var threshould = 0;
    var circ;
    for(var i = 0; i < cycloydArray.length; ++i) { 
      cycloydArray[i] = new Cycloyd(Math.random() * 10);

      
      tArray[i] = T("tri", {freq:0, mul:0.02})
      tArray[i].play();
    };

    //
    // 描画のsetup
    //
    var paper = Raphael("svg", 1000, 1000);

    //
    // draw
    //
    setInterval(function() {
      count = counter(count);
      paper.clear();
      for(var i = 0; i < cycloydArray.length; ++i) { 

        cycloydArray[i].dynamic(count * 0.002);

        var base_cos = cycloydArray[i].val.x_is * 3000;
        var base_sin = cycloydArray[i].val.y_is * 3000;

        circ = paper.circle(500 + base_sin + Math.tan(base_cos) * 20, 250 + base_cos + Math.sin(base_sin) * 10, 1);
        tArray[i].freq.value = 500 + base_sin + Math.tan(base_cos) * 20;
      };

      if( 0 == (count % 300) ) { 
        cycloydArray.push( new Cycloyd(Math.random() * 10) );
        tArray.push(T("tri", {freq:0, mul:0.02}).play() );

      };

    },20);

  })

});