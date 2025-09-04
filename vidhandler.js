const _0x3f83 = [
  "vidNodes",
  "pause",
  "vidhandler",
  "play",
  "toggle",
  "#vid",
  "registerComponent",
  "length"
];
(function(_0x4cc2d3, _0x94163e) {
  const _0x3f835b = function(_0x5642e2) {
    while (--_0x5642e2) {
      _0x4cc2d3["push"](_0x4cc2d3["shift"]());
    }
  };
  _0x3f835b(++_0x94163e);
})(_0x3f83, 0x68);
const _0x5642 = function(_0x4cc2d3, _0x94163e) {
  _0x4cc2d3 = _0x4cc2d3 - 0x18e;
  let _0x3f835b = _0x3f83[_0x4cc2d3];
  return _0x3f835b;
};
const _0xdd5959 = _0x5642;
AFRAME[_0xdd5959(0x194)](_0xdd5959(0x190), {
  init: function() {
    const _0x1e02cb = _0xdd5959;
    (this["toggle"] = ![]),
      (this["vidNodes"] = document["querySelectorAll"](_0x1e02cb(0x193)));
    for (
      let _0x2857ae = 0x0;
      _0x2857ae < this[_0x1e02cb(0x18e)]["length"];
      _0x2857ae++
    ) {
      this[_0x1e02cb(0x18e)][_0x2857ae]["pause"]();
    }
  },
  tick: function() {
    const _0x2e00c2 = _0xdd5959;
    if (this["el"]["object3D"]["visible"] == !![]) {
      if (!this[_0x2e00c2(0x192)]) {
        this["toggle"] = !![];
        for (
          let _0x2b9c97 = 0x0;
          _0x2b9c97 < this[_0x2e00c2(0x18e)]["length"];
          _0x2b9c97++
        ) {
          this[_0x2e00c2(0x18e)][_0x2b9c97][_0x2e00c2(0x191)]();
        }
      }
    } else {
      this[_0x2e00c2(0x192)] = ![];
      for (
        let _0x403539 = 0x0;
        _0x403539 < this["vidNodes"][_0x2e00c2(0x195)];
        _0x403539++
      ) {
        this[_0x2e00c2(0x18e)][_0x403539][_0x2e00c2(0x18f)]();
      }
    }
  }
});
