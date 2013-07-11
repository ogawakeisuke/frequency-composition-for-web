$(document).ready(function() {

  var noise = {
    process: function(L, R) {
      for (var i = 0; i < L.length; i++) {
        L[i] = R[i] = Math.random() * 0.25;
      }
    }
  };

  function sinetone(freq) {
    var phase = 0,
      phaseStep = freq / pico.samplerate;
    return {
      process: function(L, R) {
        for (var i = 0; i < L.length; i++) {
          L[i] = R[i] = Math.sin(6.28318 * phase) * 0.25;
          phase += phaseStep;
          console.log(phase);
        }
      }
    };
  }


  $("#start").on("click", function(){ 
    pico.play(sinetone(880));
  })

  $("#stop").on("click", function(){ 
    pico.pause();
  })

});