AFRAME.registerComponent('raycaster-autorefresh', {
  init: function () {
    var el = this.el;
    this.el.addEventListener('model-loaded', function () {
      var cursorEl = el.querySelector('[raycaster]');
      cursorEl.components.raycaster.refreshObjects();
    });
  }
});


AFRAME.registerComponent('navigate-on-click', {
  schema: {
    url: {
      default: ''
    }
  },
  init: function () {
    console.log("hello")
    console.log(this.el)
    var data = this.data;
    var el = this.el;
    el.addEventListener('click', function () {
      //window.location.href = data.url;
      window.open(data.url, '_self', true);
    });
  }
});


AFRAME.registerComponent('navigate-on-click-intro', {
  schema: {
    url: {
      default: ''
    }
  },
  dependencies: ['raycaster'],
  
  init: function () {
    console.log("hello")
    console.log(this.el)
    var data = this.data;
    var el = this.el;
    el.addEventListener('click', function () {
      //window.location.href = data.url;
      window.open(data.url, '_blank', true);
    });
  }
});