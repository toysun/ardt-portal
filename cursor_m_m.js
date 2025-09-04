/* Logohandler Function: to let the image of the logo show. Otherwise it would start to flicker or hide when the user clicks somewhere
   It still disappears sometimes on iOS (Vers. 13.5.1, Safari) */
/*AFRAME.registerComponent("logohandler", {
	init: function () {
    		const marker = document.querySelector("#marker");
    		const logo = document.querySelector("#logo");

    		marker.addEventListener('markerFound', function () {
       			logo.hidden = false;
    		}.bind(this));
    
    		marker.addEventListener('markerLost', function () {
       			logo.hidden = false;
    		}.bind(this));
  	}
});  
*/
/* Scannerhandler Function: to let the image of the scanner show or hide when marker is tracked or not tracked */

AFRAME.registerComponent("mindarscannerhandler", {
  init: function () {
    const marker = document.querySelector("#marker");
    const scanner = document.querySelector("#scanner");

    marker.addEventListener(
      "markerFound",
      function () {
        scanner.hidden = true;
      }.bind(this)
    );

    marker.addEventListener(
      "markerLost",
      function () {
        scanner.hidden = false;
      }.bind(this)
    );
  },
});

/* Ar-session-notifier Function: to set a flag when the arSession is ready 
   "ready"-state means: when other components can access the system, and use the ar.js core. */
AFRAME.registerComponent("ar-session-notifier", {
  init: function () {
    var scene = this.el.sceneEl;
    var arSession = null;
    var scanner = document.querySelector(".mindar-ui-scanning");
    // wait until the arSession is ready
    var idx = setInterval(function () {
      arSession = scene.systems["arjs"]._arSession;
      if (!arSession) return; // It just checks when the _arSession is not undefined, or null - and emits a signal.

      scanner.display = true;
      scanner.hidden = false;
      scene.emit("arSessionReady");

      clearInterval(idx);
    });
  },
});

/* Cursor-hack Function: to adjust the jsartoolkit5 projection matrix and the threejs projection matrix and emitting click-events */
AFRAME.registerComponent("cursor-modifier", {
  init: function () {
    var scene = this.el;

    // wait until the arSession is ready
    scene.addEventListener("arSessionReady", function () {
      var arSession = scene.systems["arjs"]._arSession;
      // helpers
      var raycaster = new THREE.Raycaster();
      var mouse = new THREE.Vector2();
      // useful references
      var cursorElement = document.querySelector("[cursor]");
      var arToolkitContext = arSession.arContext;
      var camera = scene.camera;

      function mousedown(event) {
        // core of this 'hack' - using the arToolkitContext projection matrix
        // makes sure that jsartoolkit5 projection matrix is not out of sync with the threejs projection matrix
        camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
        camera.projectionMatrixInverse.getInverse(camera.projectionMatrix);

        var point;
        if (event.type === "touchmove" || event.type === "touchstart") {
          // Track the first touch for simplicity.
          point = event.touches.item(0);
        } else {
          point = event;
        }
        // Calculate mouse position based on the canvas element
        var rect = scene.renderer.domElement.getBoundingClientRect();
        mouse.x = ((point.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((point.clientY - rect.top) / rect.height) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        // if there are any intersections - send the clicks
        var intersects = raycaster.intersectObjects(
          scene.object3D.children,
          true
        );
        if (intersects.length > 0) {
          // this click is stripped of any info it should have
          intersects[0].object.el.emit("click");
        }
        event.stopPropagation();
      }
      window.addEventListener("mousedown", mousedown, false);
      //window.addEventListener('touchstart', mousedown, false);
    });
  },
});
