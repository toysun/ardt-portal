console.log("XR+ arplayer - 2021 03 12");
var _dev = "";
window.location.href.includes("#d") && (_dev = "&d&noLog");
class XRPlusPlayer {
  constructor(e) {
    if (e.id)
      if (e.scene || e.project) {
        (this.options = e),
          (this.scene = null),
          (this.sessionID = null),
          (this.arContainer = null),
          (this.arContainerID = null),
          (this.iframe = null),
          (this.iframeSrc = null),
          (this.body = document.body),
          (this.coverDiv = null),
          (this.footer = null),
          (this.videoDom = null),
          (this.browserName = null),
          (this.sendingMotion = !1),
          (this.domVideo = null),
          (this.scope = null),
          (this.playerData = null),
          (this.coverData = null),
          (this.size = { w: 0, h: 0 }),
          (this.iframeStream = {
            stream: null,
            isLoopRunning: !1,
            sendingStream: !1
          });
        var o = this;
        o.options.scene && (o.scene = o.options.scene.substring(0, 3)),
          o.options.project && (o.scene = o.options.project.substring(0, 3)),
          console.log("P project " + o.scene);
        var t = window.location.hash.substr(1),
          i = null,
          r = null;
        t &&
          t.includes("xrp") &&
          (i = (i = t.substring(0, 6)).replace(/xrp/g, "")),
          t &&
            i == o.scene &&
            t.includes("xrid") &&
            ((r = (r = t.substring(6, 16)).replace(/xrid/g, "")),
            (o.sessionID = r),
            console.log("P session " + o.sessionID)),
          (o.arContainer = document.getElementById(o.options.id)),
          o.arContainer
            ? (document.querySelectorAll("[id=" + o.options.id + "]").length >
                1 &&
                console.log(
                  ">> WARNING: multiple AR players on the same container " +
                    o.options.id
                ),
              (o.arContainerID = o.options.id),
              (o.iframeSrc =
                "https://xr.plus/" +
                o.scene +
                "?embed&player&parent=" +
                o.getReferrer()),
              (o.iframeSrc += _dev),
              window.addEventListener(
                "message",
                function(e) {
                  o.gotMessage(o, e);
                },
                !1
              ),
              o.buildPlayer(),
              window.addEventListener(
                "resize",
                function() {
                  o.onWindowResize(o);
                },
                !1
              ),
              o.onWindowResize(o),
              i == o.scene &&
                setTimeout(function() {
                  o.scrollToDiv(o.arContainerID);
                }, 2e3),
              i != o.scene
                ? "https:" == location.protocol &&
                  "3d" == o.options.start &&
                  o.start3D()
                : o.startAR())
            : alert("invalid options id");
      } else alert("missing options project");
    else alert("missing options id");
  }
  buildPlayer() {
    var e = this,
      o = "",
      t = "#" + e.arContainerID,
      i = "font-family:Arial, Helvetica, sans-serif;";
    (o += t + " .cover{"),
      (o += "position:absolute;"),
      (o += "top:0;right:0;bottom:0;left:0;"),
      (o += "cursor:pointer;"),
      (o += "transition:opacity .3s;"),
      (o += "}"),
      (o += t + " .cover:not(.coverVideoRollOver):hover{opacity:.8;}"),
      (o += t + " .cover footer{"),
      (o += "position:absolute;"),
      (o += "right:0;bottom:0;left:0;"),
      (o += "text-align:left;"),
      (o += "}"),
      (o += t + " .cover .logo{"),
      (o += "max-height: 45px;"),
      (o += "max-width: 90px;"),
      (o += "position:absolute;"),
      (o += "top:5px;left:5px;"),
      (o += "}"),
      (o += t + " .cover video{"),
      (o += "width: unset;"),
      (o += "max-width: unset;"),
      (o += "}"),
      (o += t + " p.coverTitle{"),
      (o += i),
      (o += "font-size: 16px;"),
      (o += "min-height: 30px;"),
      (o += "line-height: 30px;"),
      (o += "margin: 0;"),
      (o += "padding: 5px;"),
      (o += "position: relative;"),
      (o += "text-shadow: 0 1px 1px rgba(0,0,0,0.3);"),
      (o += "}"),
      (o += t + " button.ddd{"),
      (o += i),
      (o += "border-radius: 5px;"),
      (o += "border:none;"),
      (o += "box-shadow: 0 0 4px 0 rgba(0,0,0,0.4);"),
      (o += "font-size: 13px;"),
      (o += "padding: 5px 10px;"),
      (o += "cursor: pointer;"),
      (o += "margin: 5px;"),
      (o += "white-space: nowrap;"),
      (o += "}"),
      (o += t + ".ddd .cover{display:none;}"),
      (o += "body.embedFullXR{"),
      (o += "overflow:hidden!important;margin:0!important;"),
      (o += "height:100vh!important;"),
      (o += "}"),
      (o +=
        "body.embedFullXR *:not(.keepVisible){z-index:0!important;visibility:hidden;}"),
      (o += "body.embedFullXR .keepVisible{"),
      (o += "max-height:100vh!important;"),
      (o += "position:fixed;top:0;left:0;overflow:visible;"),
      (o += "}"),
      (o += "body.embedFullXR " + t + ".full{"),
      (o += "display:block;"),
      (o += "border-radius:0!important;"),
      (o += "box-shadow:none!important;"),
      (o += "position:fixed!important;"),
      (o += "padding:0!important;"),
      (o += "margin:0!important;"),
      (o += "max-width:none!important;"),
      (o += "max-height:none!important;"),
      (o += "height:auto!important;"),
      (o += "top:0;right:0;bottom:0;left:0;"),
      (o += "}"),
      (o += "body.embedFullXR " + t + ".full iframe{"),
      (o += "z-index:1000!important;"),
      (o += "visibility:visible!important;"),
      (o += "}");
    var r = document.createElement("style");
    (r.innerHTML = o), document.getElementsByTagName("head")[0].appendChild(r);
    var a = e.options,
      n = e.arContainer.style;
    if (
      ((n.position = "relative"),
      a.roundedCorners && (n.borderRadius = 1 * a.roundedCorners + "px"),
      a.shadow && (n.boxShadow = "rgba(0,0,0,0.3) 0 5px 15px 0"),
      (n.margin = "10px auto"),
      void 0 !== a.margin && (n.margin = a.margin),
      (n.maxWidth = "400px"),
      void 0 !== a.width && (n.maxWidth = a.width),
      window.innerWidth < 500 && (n.maxWidth = "calc(100vw - 40px)"),
      (n.minHeight = "300px"),
      (n.maxHeight = "400px"),
      (n.height = n.minHeight),
      void 0 !== a.height && ((n.maxHeight = a.height), (n.height = a.height)),
      (n.fontFamily = "Arial, Helvetica, sans-serif"),
      (n.boxSizing = "border-box"),
      (n.textAlign = "center"),
      (n.background = "white"),
      (n.overflow = "hidden"),
      "https:" == location.protocol)
    ) {
      var s = e.arContainer.querySelector(".cover");
      s && s.parentElement.removeChild(s),
        (e.coverDiv = document.createElement("div")),
        (e.coverDiv.className = "cover"),
        a.coverVideoRollOver && e.coverDiv.classList.add("coverVideoRollOver"),
        (e.footer = document.createElement("footer")),
        e.coverDiv.appendChild(e.footer),
        e.arContainer.insertBefore(e.coverDiv, e.arContainer.firstChild),
        e.getSceneCover();
    } else
      e.arContainer.innerText =
        "HTTPS protocol is required to use the XR+ player";
  }
  onWindowResize(e) {
    var o = e.arContainer.clientWidth,
      t = e.arContainer.clientHeight;
    e.size = { w: o, h: t };
  }
  start3D() {
    var e = this,
      o = e.arContainer;
    console.log("start 3D");
    var t = e.iframeSrc + "&inline";
    e.sessionID && (t += "#xrid" + e.sessionID),
      o.classList.add("ddd"),
      o.classList.remove("ar", "qr"),
      e.body.addEventListener("gesturechange", e.gestureChange, !1),
      e.body.addEventListener("touchmove", e.gestureChange, !1),
      e.iframe
        ? e.postMessage({ setMode: "ddd" })
        : (e.createIframe(), (e.iframe.src = t), o.appendChild(e.iframe));
    var i = e.iframe;
    (i.style.position = "absolute"),
      (i.style.top = 0),
      (i.style.left = 0),
      (i.width = "100%"),
      (i.height = "100%");
  }
  startAR() {
    var e = this,
      o = e.arContainer;
    if (
      (console.log("start AR"),
      e.toggleFullPage(!0),
      o.classList.remove("ddd"),
      o.classList.add("ar"),
      e.iframe)
    )
      return (e.iframe.width = "100%"), void (e.iframe.height = "100%");
    var t = e.iframeSrc;
    e.sessionID && (t += "#xrid" + e.sessionID),
      e.body.addEventListener("gesturechange", e.gestureChange, !1),
      e.body.addEventListener("touchmove", e.gestureChange, !1),
      e.createIframe();
    var i = e.iframe;
    i.classList.add("keepVisible"),
      (i.style.display = "block"),
      (i.width = "100%"),
      (i.height = "100%"),
      (i.src = ""),
      (i.src = t),
      o.appendChild(i),
      (window.onresize = function(o) {
        e.resizeFrame(i);
      }),
      e.resizeFrame(i);
  }
  toggleFullPage(e) {
    var o = this;
    console.log("PL: toggleFullPage " + e);
    var t = o.arContainer.classList,
      i = o.body;
    if ((void 0 === e && (e = !i.classList.contains("embedFullXR")), e)) {
      document.querySelectorAll(".keepVisible").forEach(function(e) {
        e.classList.remove("keepVisible");
      });
      for (var r = document.getElementById(o.arContainerID); r; )
        (r = r.parentNode) && r.classList && r.classList.add("keepVisible");
      t.add("keepVisible", "full"),
        i.classList.add("embedFullXR"),
        window.scrollTo(0, 0);
    } else
      t.remove("full"),
        i.classList.remove("embedFullXR"),
        setTimeout(function() {
          o.scrollToDiv(o.arContainerID);
        }, 500);
  }
  createIframe() {
    (this.iframe = document.createElement("iframe")),
      this.iframe.setAttribute(
        "allow",
        "camera; accelerometer; gyroscope; magnetometer; xr-spatial-tracking; fullscreen"
      ),
      (this.iframe.style.border = "none");
  }
  getReferrer() {
    return encodeURIComponent(document.location.href);
  }
  getSceneCover() {
    var e = this,
      o = e.coverDiv,
      t = e.scene,
      i = new XMLHttpRequest();
    i.open("GET", "https://xr.plus/embed/get/scenecover.php?url=" + t),
      (i.onload = function() {
        if (i.status >= 200 && i.status < 400) {
          var t = JSON.parse(i.responseText);
          if (t.error) return void alert("could not load AR player");
          (e.playerData = t.player), (e.coverData = t.cover);
          var r = e.playerData,
            a = e.coverData,
            n = r.coverScreen,
            s = document.createElement("button");
          if (
            ((s.className = "ddd"),
            (s.innerText = "" + n.button.text),
            (s.style.color = n.button.color),
            (s.style.background = n.button.bgColor),
            e.footer.appendChild(s),
            o.addEventListener("click", function() {
              (s.style.display = "none"), e.start3D();
            }),
            a.video && !e.options.coverVideoRollOver)
          )
            e.addVideoPlayer();
          else {
            var l = a.folder + a.image;
            (o.style.background = 'url("' + l + '") center/cover'),
              a.video &&
                (o.addEventListener("mouseenter", function() {
                  e.addVideoPlayer();
                }),
                o.addEventListener("mouseleave", function() {
                  e.videoDom &&
                    (e.videoDom.pause(), (e.videoDom.style.display = "none"));
                }));
          }
          if (n.title.enabled) {
            var d = document.createElement("p");
            (d.className = "coverTitle"), (d.style.color = n.title.color);
            var c = n.bgTitle.bgColor,
              m = c + "" + parseInt(255 * n.bgTitle.bgAlpha).toString(16),
              p = c + "00";
            (d.style.background =
              "linear-gradient(to bottom, " + m + " 0," + p + " 100%)"),
              (d.innerText = "" + t.name),
              o.appendChild(d);
          }
          if (n.logo.enabled && "" != r.logo) {
            var g = document.createElement("img");
            (g.className = "logo"),
              (g.src =
                "https://xr.plus/b/" + r.folder + "/" + r.id + "/" + r.logo),
              o.appendChild(g);
          }
        } else console.log("error a");
      }),
      (i.onerror = function() {
        console.log("error b");
      }),
      i.send();
  }
  addVideoPlayer() {
    var e = this;
    console.log("addVideo player");
    var o = e.coverData,
      t = e.coverDiv;
    if (e.videoDom)
      return (
        console.log("already a video"),
        e.videoDom
          .play()
          .then(() => {})
          .catch(e => {
            console.log("error play video cover");
          }),
        void (e.videoDom.style.display = "block")
      );
    e.videoDom = document.createElement("video");
    var i = e.videoDom;
    i.src = o.folder + o.video;
    var r = o.videoWidth / o.videoHeight,
      a = t.clientWidth / t.clientHeight;
    (i.autoplay = !0), (i.loop = !0), (i.muted = !0), (i.playsInline = !0);
    var n = i.style;
    r >= a ? (n.height = "100%") : (n.width = "100%"),
      (n.position = "absolute"),
      (n.left = "50%"),
      (n.top = "50%"),
      (n.transform = "translate(-50%,-50%)"),
      (n.background = "#808080"),
      t.insertBefore(i, t.firstChild);
  }
  postMessage(e) {
    var o = JSON.parse(JSON.stringify(e));
    this.iframe.contentWindow.postMessage(o, "*");
  }
  gotMessage(e, o) {
    var t = e.arContainer.classList,
      i = o.data;
    if ((i.request || i.action || i.status) && i.scene == e.scene) {
      i.browserName && (e.browserName = i.browserName),
        "motion" == i.request &&
          (console.log("request for motion"), e.getSafariMotion(i.version)),
        "camera" == i.request &&
          (console.log("request for camera"),
          "firefox" == e.browserName && e.startMotion(),
          e.getCameraStream(i.constraints)),
        "stopCamera" == i.request && e.stopCamerafeed(),
        "stopMotion" == i.request && e.stopMotion(),
        (e.sendingMotion || e.iframeStream.sendingStream) &&
          (e.iframeStream.isLoopRunning || e.startLoop());
      var r = i.action;
      if (("startAR" == r && e.startAR(), "backToDDD" == r)) {
        e.toggleFullPage(!1), t.remove("ar"), t.add("ddd");
        var a = e.iframe;
        (a.width = "100%"), (a.height = "100%");
      }
      "showQRCode" == r && e.toggleFullPage(!1),
        "hideQrCode" == r &&
          (console.log("action hideQrCode -> useless?"),
          t.add("ddd"),
          t.remove("qr")),
        "toggleFullPage" == r &&
          (void 0 !== i.value ? e.toggleFullPage(i.value) : e.toggleFullPage()),
        "ready" == i.status && t.add("ready");
    }
  }
  getSafariMotion(e) {
    var o = this;
    12 == e && (o.startMotion(), o.postMessage({ permission: "granted" })),
      e >= 13 &&
        DeviceOrientationEvent.requestPermission()
          .then(function(e) {
            o.startMotion(), o.postMessage({ permission: e });
          })
          .catch(console.error);
  }
  startMotion() {
    var e = this;
    console.log("player start motion"), (e.scope = { screenOrientation: 0 });
    window.addEventListener(
      "deviceorientation",
      function(o) {
        e.scope.deviceOrientation = o;
      },
      !1
    ),
      window.addEventListener(
        "orientationchange",
        function() {
          e.scope.screenOrientation = window.orientation || 0;
        },
        !1
      ),
      (e.sendingMotion = !0),
      e.startLoop();
  }
  startLoop() {
    var e = this;
    console.log("player start loop"),
      e.iframeStream.isLoopRunning
        ? console.log("loop already running")
        : ((e.iframeStream.isLoopRunning = !0), e.animate(e));
  }
  animate(e) {
    if (e.sendingMotion && !e.iframeStream.sendingStream) {
      var o = e.scope.deviceOrientation;
      o &&
        e.postMessage({
          deviceOrientation: { alpha: o.alpha, beta: o.beta, gamma: o.gamma },
          screenOrientation: e.scope.screenOrientation
        });
    }
    e.iframeStream.sendingStream
      ? ((w = e.domVideo.videoWidth),
        (h = e.domVideo.videoHeight),
        Promise.all([createImageBitmap(e.domVideo, 0, 0, w, h)]).then(function(
          o
        ) {
          var t = { stream: "stream", w: w, h: h, image: o },
            i = null;
          e.scope && (i = e.scope.deviceOrientation),
            i &&
              ((t.deviceOrientation = {
                alpha: i.alpha,
                beta: i.beta,
                gamma: i.gamma
              }),
              (t.screenOrientation = e.scope.screenOrientation)),
            e.iframe
              ? (e.iframe.contentWindow.postMessage(t, "*", o),
                requestAnimationFrame(function() {
                  e.animate(e);
                }))
              : console.log("error: no iframe, loop stopping");
        }))
      : requestAnimationFrame(function() {
          e.animate(e);
        });
  }
  getCameraStream(e) {
    var o = this,
      t = function(e) {
        console.log("-> player videostream: fail"),
          console.log(e),
          (m = { failed: "camera", error: { name: e.name } }),
          o.postMessage(m);
      };
    ((o.domVideo = document.createElement("video")),
    (o.domVideo.autoplay = !0),
    (o.domVideo.playsInline = !0),
    (o.domVideo.muted = !0),
    (o.domVideo.style.visibility = "hidden"),
    o.iframeStream.stream) &&
      ((o.iframeStream.sendingStream = !1),
      o.iframeStream.stream.getTracks()[0].stop(),
      (o.iframeStream.stream = null));
    navigator.mediaDevices
      .getUserMedia(e)
      .then(function(e) {
        var i = o.domVideo;
        (i.srcObject = e),
          (o.iframeStream.stream = e),
          i
            .play()
            .then(function() {
              o.iframeStream.sendingStream = !0;
            })
            .catch(function(e) {
              t(e);
            });
      })
      .catch(t);
  }
  stopCamerafeed() {
    console.log("PLAYER: STOP camera feed");
    var e = this;
    (e.sendingMotion = !1),
      (e.iframeStream.sendingStream = !1),
      e.iframeStream.stream.getTracks().forEach(function(e) {
        e.stop();
      });
  }
  stopMotion() {
    console.log("PLAYER: STOP motion feed");
    (this.sendingMotion = !1), (this.iframeStream.sendingStream = !1);
  }
  gestureChange(e) {
    1 !== (e = e.originalEvent || e).scale &&
      (e.preventDefault(), (document.body.style.transform = "scale(1)"));
  }
  resizeFrame(e) {
    document.body.classList.contains("ar") &&
      ((e.width = window.innerWidth), (e.height = window.innerHeight));
  }
  scrollToDiv(e) {
    document
      .getElementById(e)
      .scrollIntoView({ block: "center", behavior: "smooth" });
  }
}
