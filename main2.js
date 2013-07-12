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

    this.val = {};

    this.dynamic = function(count_is) {
      var base1 = a1 * Math.sin(b1 * count_is );
      var base2 = a2 * Math.cos(b2 * count_is);
      var dynamics = base1 / base2;

      this.val = { 
        x_is : k * Math.cos(dynamics) * 0.2,
        y_is : k * Math.sin(dynamics) * 0.2
      };
    }
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

    //
    // setup
    //
    var count = 0;
    var num = 10;
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
        cycloydArray[i].dynamic(count);
        
        circ = paper.circle(500 + Math.sin(cycloydArray[i].val.x_is) * 3000, 250 + Math.sin(cycloydArray[i].val.y_is) * 3000, 2);
        tArray[i].freq.value = cycloydArray[i].val.y_is * 30000;
      }
      //console.log(Math.cos(cycloydArray[0].val.x_is * 0.5) + 3000);
      

    },20);

  })

});