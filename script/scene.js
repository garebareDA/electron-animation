'use strict';
// 幅、高さ取得
const width  = window.innerWidth;
const height = window.innerHeight;

// レンダラの作成、DOMに追加
const renderer = new THREE.WebGLRenderer({ alpha: true ,antialias:true});
renderer.setSize(width, height);
renderer.setClearColor( new THREE.Color(0xffffff),0.0);
document.body.appendChild(renderer.domElement);

// シーンの作成、カメラの作成と追加、ライトの作成と追加
const scene  = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, width / height, 1, 100 );
camera.position.set(0, 0, -10);

var directionalLight = new THREE.DirectionalLight( 0xffeedd, 3);
directionalLight.position.set( 0, 0, 50 );
scene.add( directionalLight );

var directionalLight2 = new THREE.DirectionalLight( 0xffeedd, 3);
directionalLight2.position.set( 0, 0, -50 );
scene.add( directionalLight2 );

var directionalLight3 = new THREE.DirectionalLight( 0xffeedd,1);
directionalLight3.position.set( 50, 0, 0 );
scene.add( directionalLight3 );

var directionalLight4 = new THREE.DirectionalLight( 0xffeedd,1);
directionalLight4.position.set( -50, 0, 0 );
scene.add( directionalLight4 );

var directionalLight5 = new THREE.DirectionalLight( 0xffeedd, 2);
directionalLight5.position.set( 0, 50, 0 );
scene.add( directionalLight5 );

const light  = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);

const clock = new THREE.Clock();
const windmillClock = new THREE.Clock();

let mixer;
let mixerWindmill;


//GLTFの読み込み
const loader = new THREE.GLTFLoader();
loader.load('./GLTF/IT.gltf', (data) => {
  const object = data.scene;
  const animations = data.animations;

  if (animations && animations.length) {
    let i;

    mixer = new THREE.AnimationMixer(object);
    for (i = 0; i < animations.length; i ++ ) {
      mixer.clipAction( animations[ i ] ).play();
    }

  }

  object.rotation.y =91.1;
  object.position.set(-6, -4, 0);
  scene.add(object);
});

loader.load('./GLTF/huusya.gltf', (data) => {
  const object = data.scene;
  const animations = data.animations;

  if (animations && animations.length) {
    let i;
    mixerWindmill = new THREE.AnimationMixer(object);
    for (i = 0; i < animations.length; i ++ ) {
      mixerWindmill.clipAction( animations[ i ] ).play();
    }
  }

  object.rotation.y = -90;
  object.position.set(-6, -4.3, 2)
  scene.add(object)
  
});

loader.load('./GLTF/grass.gltf',(data) => {
  const object = data.scene;
  object.position.set(-8, -4.3, 0) 
  scene.add(object);
})

const controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.userPan = false;
controls.userPanSpeed = 0.0;
controls.maxDistance = 5000.0;
controls.maxPolarAngle = Math.PI * 0.495;
controls.autoRotate = false;
controls.autoRotateSpeed = 1.0;

// レンダリング
const animation = () => {
  renderer.render(scene, camera);
  controls.update();

  if(mixer) {
    mixer.update(clock.getDelta());
  }

  if(mixerWindmill) {
    mixerWindmill.update(windmillClock.getDelta());
  }

  requestAnimationFrame(animation);
};

animation();