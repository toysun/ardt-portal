AFRAME.registerComponent("wave-component", {
  schema: {
    texturepath: {
      default:
        "pirate.png",
    },
  },
  init: function () {
    var el = this.el;
    const loader = new THREE.TextureLoader();

    var geometry = new THREE.PlaneGeometry(10, 3, 100, 60);

    // Creating a material with the texture path provided
    var material = new THREE.MeshBasicMaterial({
      map: loader.load(this.data.texturepath),
      transparent: true,
    });

    var wave = new THREE.Mesh(geometry, material);

    wave.rotation.set(-0.1, 0, 0);
    const clock = new THREE.Clock();

    el.setObject3D("WaveMesh", wave);

    // Function to animate each vertex of the texture to simulate a wave effect
    function animate() {
      const t = clock.getElapsedTime();

      wave.geometry.vertices.map((v) => {
        const waveX1 = 0.75 * Math.sin(v.x * 2 + t * 3);
        const waveX2 = 0.25 * Math.sin(v.x * 3 + t * 2);
        const waveY1 = 0.1 * Math.sin(v.y * 3 + t * 0.5);
        const multi = (v.x + 2.5) / 5;

        v.z = (waveX1 + waveX2 + waveY1) * multi;
      });

      wave.geometry.verticesNeedUpdate = true;
      requestAnimationFrame(animate);
    }
    animate();
  },
});
