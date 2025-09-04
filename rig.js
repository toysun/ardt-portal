AFRAME.registerComponent("rig", {
  init: function () {
    this.bindMethod();
    this.el.sceneEl.addEventListener("pinchstarted", this.onPinchStarted);
  },

  //I still don't get what this thing does.
  bindMethod: function () {
    this.onPinchStarted = this.onPinchStarted.bind(this);
  },

  onPinchStarted: function () {
    this.el.setAttribute("rotation", {
      y: this.el.getAttribute("rotation").y + 180,
    });
  },
});
