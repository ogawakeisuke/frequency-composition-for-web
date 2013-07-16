window.addEventListener("DOMContentLoaded", function(){
  var width = window.innerWidth;
  var height = window.innerHeight;

  var renderer =  new THREE.WebGLRenderer();
  renderer.setSize(width, height);
  document.body.appendChild(renderer.domElement);

  var scene = new THREE.Scene();



  //カメラ設定 この設定さっぱりわからん
  var fov = 80;
  var aspect = width / height;
  var near = 1;
  var far = 1000;

  var camera = new THREE.PerspectiveCamera(fov, aspect, near,   far);
  camera.position.z =  500;
  scene.add(camera);




  // 光源を設定
  var directionalLight = new THREE.DirectionalLight( 0xffffff, 3);
  scene.add(directionalLight);

  //ジオメトリを指定　こいつがボーン
  var geometry = new THREE.CubeGeometry(10, 10, 10);

  //マテリアルを設定　こいつはテクスチャ
  var material = new THREE.MeshLambertMaterial({ color: 0xff0000 });

  //メッシュを設定　こいつはそれを合成したもの
  var cubeMesh = new THREE.Mesh(geometry, material);

  scene.add(cubeMesh);




  // animationなど
  var theta = 0;

  function anim() {
    var radian = theta * Math.PI / 180;
    cubeMesh.rotation.set(radian, radian, radian);
    theta ++;

    renderer.render(scene, camera);
    requestAnimationFrame(anim); //setTimeoutに似たようなもの
  };
  anim();

  
})