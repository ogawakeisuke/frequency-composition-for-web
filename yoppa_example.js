/*
 *
 * Three.js パーティクルシステム: テクスチャを貼る
 * 
 */

//画面設定
var b = document.body;
var d = document.documentElement;
var WIDTH = Math.max(b.clientWidth , b.scrollWidth, d.scrollWidth, d.clientWidth);
var HEIGHT = Math.max(b.clientHeight , b.scrollHeight, d.scrollHeight, d.clientHeight);

// Three.jsで必要な変数
var renderer, scene, camera, particles;

// パーティクルの数
var NUM = 40000;

// 初期化とアニメーションを呼び出し
init();
animate();

function init() {
    //コンテナとレンダラーの配置
    var $container = $('#container');
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(WIDTH, HEIGHT);
    $container.append(renderer.domElement);
    
    // シーン作成
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.0007);
    
    // カメラ追加
    camera = new THREE.PerspectiveCamera(60, WIDTH / HEIGHT, 1, 3000);
    camera.position.z = 1000;
    scene.add(camera);
    
    // ジオメトリ作成
    var geometry = new THREE.Geometry();
    
    // パーティクルの色の配列
    var colors = [];
    
    // ジオメトリにパーティクルを追加
    for ( i = 0; i < NUM; i ++ ) {
        var spred = 2000;
        var vector = new THREE.Vector3(Math.random() * spred - spred/2, 
                            Math.random() * spred - spred/2, 
                            Math.random() * spred - spred/2);
        geometry.vertices.push(new THREE.Vertex(vector));
        colors[i] = new THREE.Color(Math.random() * 0xffffff);
    }
    
    // それぞれのパーティクルにランダムな色を適用
    geometry.colors = colors;
    // マテリアル設定
    var materials = new THREE.ParticleBasicMaterial({
      map: THREE.ImageUtils.loadTexture("http://jsrun.it/assets/n/J/A/m/nJAmD.png"),
      depthTest: false,
      size:100,                              
      blending: THREE.AdditiveBlending,            
      transparent: true,
      vertexColors: true
    }); 
    
    // ジオメトリとマテリアルからパーティクルシステム作成
    particles = new THREE.ParticleSystem(geometry, materials);
    
    // パーティクルシステムをシーンに追加
    scene.add( particles );
}

// アニメーション
function animate() {
    requestAnimationFrame(animate);
    render();
}

// レンダリング
function render() {
    
    // 全体を回転
    particles.rotation.x += 0.001;
    particles.rotation.y += 0.003;
    
    renderer.render(scene, camera);
}