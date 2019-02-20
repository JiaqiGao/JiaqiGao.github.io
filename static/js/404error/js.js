var DAT = DAT || {};

DAT.Globe = function() {


  var camera, scene, renderer;
  var mesh, point;

  var y = 0.2;

  function init() {
      camera = new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 0.01, 10 );
      camera.position.z = 1

      scene = new THREE.Scene();

      var bgcolor = new THREE.Color("white");

      scene.background = bgcolor;

      //Create a new ambient light
      var light = new THREE.AmbientLight( 0x888888 );
      scene.add( light );

      //Create a new directional light
      var light = new THREE.DirectionalLight( 0xfdfcf0, 1 );
      light.position.set(20,10,20);
      scene.add( light );

      //Create geometry and material
      var geometry = new THREE.SphereGeometry(0.5, 32, 32);
      var texture = new THREE.TextureLoader().load("static/images/earth.jpg");
      var material = new THREE.MeshBasicMaterial( {
          map: texture
      } );

      point = new THREE.Mesh(geometry);


      material.bumpMap = THREE.TextureLoader("static/images/earthbump.jpg");
      material.bumpScale = 0.05;


      mesh = new THREE.Mesh( geometry, material );
      scene.add( mesh );

      renderer = new THREE.WebGLRenderer( { antialias: true } );
      renderer.setSize( window.innerWidth, window.innerHeight );


      document.body.appendChild( renderer.domElement );

  }


  function positioning(event) {
      if(event.clientX > window.innerWidth/2 && x < 0)
              y += 0.05;
      if(event.clientX < window.innerWidth/2 && x > 0)
              y += -0.05;
  }

  function animate(e) {
      requestAnimationFrame( animate );
      document.addEventListener("click", positioning);
      mesh.rotation.y += y;
      renderer.render( scene, camera );
  }

  init();
  animate();
}

addGlobe = function(){
    // Where to put the globe?
    var container = document.getElementById( 'container' );

    // Make the globe
    var globe = new DAT.Globe( container );

}

addGlobe();
