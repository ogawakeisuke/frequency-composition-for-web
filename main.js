$(document).ready(function() {

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

  function cycloyd(count_is){
    // newできるかたちにする
    var a1 = 0.6, a2 = 2.3, b1 = 0.7, b2 = 0.15, k = 0.175;
    var base1 = a1 * Math.sin(b1 * count_is);
    var base2 = a2 * Math.sin(b2 * count_is);
    var dynamic = (base1 * base2);

    return k * dynamic;      
  }


  function counter(count) {
    return count += 20;
  };


  $("#start").on("click", function(){ 
    var count = 0;      
    setInterval(function() {
      count = counter(count);
      var s = cycloyd(count);
      pico.play( sinetone(s * 10000) );
      console.log(cycloyd(count) * 10000)
    },2000);
  })

  $("#stop").on("click", function(){ 
    pico.pause();
  })

});