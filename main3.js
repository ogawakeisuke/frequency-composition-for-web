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
        x_is : k * Math.sin(dynamics) * Math.sin(dynamics) * 0.2,
        y_is : k * Math.cos(dynamics) * Math.cos(dynamics) * 0.2 
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


    // グローバルな変数
    var count = 0;
    var num = 100;
    var cycloydArray = new Array(num);
    var tArray = new Array(num);
    var bufferTable = new Float32Array(44100);

    // Three.jsで必要な変数
    var renderer, scene, camera, particles;

    

    //
    // setup関数
    //

    function cycloydInit() {
      for(var i = 0; i < cycloydArray.length; ++i) { 
        cycloydArray[i] = new Cycloyd(Math.random() * 10);
      }
    }

    function timbleInit() {
      for(var i = 0; i < cycloydArray.length; ++i) { 
        tArray[i] = T("tri", {freq:0, mul:0.01})
        tArray[i].play();
      };
    }





    function threeInit() {
      var width = window.innerWidth;
      var height = window.innerHeight;

      renderer = new THREE.WebGLRenderer();
      renderer.setSize(width, height);
      document.body.appendChild(renderer.domElement);
      
      scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x000000, 0.0007);
      
      camera = new THREE.PerspectiveCamera(60, width / height, 1, 3000);
      camera.position.z = 1000;
      scene.add(camera);
      
      // ジオメトリ作成
      var geometry = new THREE.Geometry();
      
      // パーティクルの色の配列
      var colors = [];
      
      //
      // ジオメトリにパーティクルを追加
      // ここでcycloydArrayを入れている
      //
      for ( i = 0; i < cycloydArray.length; i ++ ) {
        var spred = 2000;
        var vector = new THREE.Vector3(cycloydArray[i].val.x_is * spred - spred/2, 
                                        cycloydArray[i].val.y_is * spred - spred/2, 
                                        Math.random() * spred - spred/2);
        geometry.vertices.push(new THREE.Vector3(vector));
        colors[i] = new THREE.Color(0x000000);
      }
      
      // それぞれのパーティクルにランダムな色を適用
      geometry.colors = colors;
      // マテリアル設定
      var materials = new THREE.ParticleBasicMaterial({
        depthTest: false,
        size:10,                              
        blending: THREE.AdditiveBlending,            
        transparent: true,
        vertexColors: true
      }); 
      
      // ジオメトリとマテリアルからパーティクルシステム作成
      particles = new THREE.ParticleSystem(geometry, materials);
      
      // パーティクルシステムをシーンに追加
      scene.add( particles );
    }


    //
    // loop
    //
    function loop() {
      count = counter(count);

      for(var i = 0; i < cycloydArray.length; ++i) { 

        //この魔法書かないと動かないという
        particles.geometry.verticesNeedUpdate = true 
        
        cycloydArray[i].dynamic(count * 0.0005);
        var base_cos = cycloydArray[i].val.x_is * 3000;
        var base_sin = cycloydArray[i].val.y_is * 3000;
        particles.geometry.vertices.push
        particles.geometry.vertices[i].x = base_cos * Math.cos(base_cos) * 100;
        particles.geometry.vertices[i].y = base_sin + Math.sin(base_sin) * 100;
        particles.geometry.vertices[i].z = base_sin + Math.sin(base_cos) * 100;


        //
        // 音の部分
        //

        tArray[i].freq.value = 500 + particles.geometry.vertices[i].x;
        tArray[i].fb.value = particles.geometry.vertices[i].y * 0.005;
      
      };

      threeRender();
    };


    //
    // render
    //
    function threeRender() {
      particles.rotation.x += 0.001;
      particles.rotation.y += 0.003;
      
      renderer.render(scene, camera);
    }



    cycloydInit();
    timbleInit();
    threeInit();

    /*
    // 実行
    */
    var clock = setInterval(loop, 20);

    $(window).mousedown(function() {
      clearInterval(clock);
    });

    $(window).mouseup(function() {
      clock = setInterval(loop, 20);
    });


  })

});