!(function (t) {
  if ("object" == typeof exports && "undefined" != typeof module)
    module.exports = t();
  else if ("function" == typeof define && define.amd) define([], t);
  else {
    var e;
    (e =
      "undefined" != typeof window
        ? window
        : "undefined" != typeof global
          ? global
          : "undefined" != typeof self
            ? self
            : this),
      (e.Sound = t());
  }
})(function () {
  return (function t(e, n, o) {
    function i(s, u) {
      if (!n[s]) {
        if (!e[s]) {
          var a = "function" == typeof require && require;
          if (!u && a) return a(s, !0);
          if (r) return r(s, !0);
          var c = new Error("Cannot find module '" + s + "'");
          throw ((c.code = "MODULE_NOT_FOUND"), c);
        }
        var d = (n[s] = { exports: {} });
        e[s][0].call(
          d.exports,
          function (t) {
            var n = e[s][1][t];
            return i(n ? n : t);
          },
          d,
          d.exports,
          t,
          e,
          n,
          o,
        );
      }
      return n[s].exports;
    }
    for (
      var r = "function" == typeof require && require, s = 0;
      s < o.length;
      s++
    )
      i(o[s]);
    return i;
  })(
    {
      1: [
        function (t, e, n) {
          "use strict";
          function o(t, e) {
            t.data && u.indexOf(t._getExtension()) > -1
              ? (t.sound = s.default.add(t.name, {
                  loaded: e,
                  preload: !0,
                  srcBuffer: t.data,
                }))
              : e();
          }
          function i() {
            return o;
          }
          function r() {
            var t = PIXI.loaders.Resource;
            u.forEach(function (e) {
              t.setExtensionXhrType(e, t.XHR_RESPONSE_TYPE.BUFFER),
                t.setExtensionLoadType(e, t.LOAD_TYPE.XHR);
            }),
              PIXI.loaders.Loader.addPixiMiddleware(i),
              PIXI.loader.use(o);
          }
          var s = t("./index"),
            u = ["wav", "mp3", "ogg", "oga", "m4a"];
          n.install = r;
        },
        { "./index": 16 },
      ],
      2: [
        function (t, e, n) {
          "use strict";
          var o = t("./index"),
            i = t("./SoundInstance"),
            r = t("./SoundNodes"),
            s = t("./SoundSprite"),
            u = (function () {
              function e(t, e) {
                var n = {};
                "string" == typeof e
                  ? (n.src = e)
                  : e instanceof ArrayBuffer
                    ? (n.srcBuffer = e)
                    : (n = e),
                  (n = Object.assign(
                    {
                      autoPlay: !1,
                      singleInstance: !1,
                      src: null,
                      srcBuffer: null,
                      preload: !1,
                      volume: 1,
                      speed: 1,
                      complete: null,
                      loaded: null,
                      loop: !1,
                      useXHR: !0,
                    },
                    n,
                  )),
                  (this._context = t),
                  (this._nodes = new r.default(this._context)),
                  (this._source = this._nodes.bufferSource),
                  (this._instances = []),
                  (this._sprites = {}),
                  (this.isLoaded = !1),
                  (this.isPlaying = !1),
                  (this.autoPlay = n.autoPlay),
                  (this.singleInstance = n.singleInstance),
                  (this.preload = n.preload || this.autoPlay),
                  (this.complete = n.complete),
                  (this.loaded = n.loaded),
                  (this.src = n.src),
                  (this.srcBuffer = n.srcBuffer),
                  (this.useXHR = n.useXHR),
                  (this.volume = n.volume),
                  (this.loop = n.loop),
                  (this.speed = n.speed),
                  n.sprites && this.addSprites(n.sprites),
                  this.preload && this._beginPreload();
              }
              return (
                (e.from = function (t) {
                  return new e(o.default.context, t);
                }),
                (e.prototype.destroy = function () {
                  this._nodes.destroy(),
                    (this._nodes = null),
                    (this._context = null),
                    (this._source = null),
                    this.removeSprites(),
                    (this._sprites = null),
                    (this.complete = null),
                    (this.loaded = null),
                    (this.srcBuffer = null),
                    this._removeInstances(),
                    (this._instances = null);
                }),
                Object.defineProperty(e.prototype, "isPlayable", {
                  get: function () {
                    return (
                      this.isLoaded && !!this._source && !!this._source.buffer
                    );
                  },
                  enumerable: !0,
                  configurable: !0,
                }),
                Object.defineProperty(e.prototype, "context", {
                  get: function () {
                    return this._context;
                  },
                  enumerable: !0,
                  configurable: !0,
                }),
                Object.defineProperty(e.prototype, "volume", {
                  get: function () {
                    return this._nodes.gainNode.gain.value;
                  },
                  set: function (t) {
                    this._nodes.gainNode.gain.value = t;
                  },
                  enumerable: !0,
                  configurable: !0,
                }),
                Object.defineProperty(e.prototype, "loop", {
                  get: function () {
                    return this._source.loop;
                  },
                  set: function (t) {
                    this._source.loop = !!t;
                  },
                  enumerable: !0,
                  configurable: !0,
                }),
                Object.defineProperty(e.prototype, "buffer", {
                  get: function () {
                    return this._source.buffer;
                  },
                  set: function (t) {
                    this._source.buffer = t;
                  },
                  enumerable: !0,
                  configurable: !0,
                }),
                Object.defineProperty(e.prototype, "duration", {
                  get: function () {
                    return (
                      console.assert(
                        this.isPlayable,
                        "Sound not yet playable, no duration",
                      ),
                      this._source.buffer.duration
                    );
                  },
                  enumerable: !0,
                  configurable: !0,
                }),
                Object.defineProperty(e.prototype, "nodes", {
                  get: function () {
                    return this._nodes;
                  },
                  enumerable: !0,
                  configurable: !0,
                }),
                Object.defineProperty(e.prototype, "filters", {
                  get: function () {
                    return this._nodes.filters;
                  },
                  set: function (t) {
                    this._nodes.filters = t;
                  },
                  enumerable: !0,
                  configurable: !0,
                }),
                Object.defineProperty(e.prototype, "speed", {
                  get: function () {
                    return this._source.playbackRate.value;
                  },
                  set: function (t) {
                    this._source.playbackRate.value = t;
                  },
                  enumerable: !0,
                  configurable: !0,
                }),
                Object.defineProperty(e.prototype, "instances", {
                  get: function () {
                    return this._instances;
                  },
                  enumerable: !0,
                  configurable: !0,
                }),
                Object.defineProperty(e.prototype, "sprites", {
                  get: function () {
                    return this._sprites;
                  },
                  enumerable: !0,
                  configurable: !0,
                }),
                (e.prototype.addSprites = function (t, e) {
                  if ("object" == typeof t) {
                    var n = {};
                    for (var o in t) n[o] = this.addSprites(o, t[o]);
                    return n;
                  }
                  if ("string" == typeof t) {
                    console.assert(
                      !this._sprites[t],
                      "Alias " + t + " is already taken",
                    );
                    var i = new s.default(this, e);
                    return (this._sprites[t] = i), i;
                  }
                }),
                (e.prototype.removeSprites = function (t) {
                  if (t) {
                    var e = this._sprites[t];
                    void 0 !== e && (e.destroy(), delete this._sprites[t]);
                  } else for (var n in this._sprites) this.removeSprites(n);
                  return this;
                }),
                (e.prototype.play = function (t, e) {
                  var n,
                    o = this;
                  if ("string" == typeof t) {
                    var r = t;
                    console.assert(
                      !!this._sprites[r],
                      "Alias " + r + " is not available",
                    );
                    var s = this._sprites[r];
                    n = {
                      start: s.start,
                      end: s.end,
                      speed: s.speed,
                      complete: e,
                    };
                  } else
                    "function" == typeof t
                      ? ((n = {}), (n.complete = t))
                      : (n = t);
                  if (
                    ((n = Object.assign(
                      { complete: null, loaded: null, start: 0 },
                      n || {},
                    )),
                    n.offset && (n.start = n.offset),
                    this.isPlayable)
                  ) {
                    this.singleInstance && this._removeInstances();
                    var u = i.default.create(this);
                    return (
                      this._instances.push(u),
                      (this.isPlaying = !0),
                      u.once("end", function () {
                        n.complete && n.complete(o), o._onComplete(u);
                      }),
                      u.once("stop", function () {
                        o._onComplete(u);
                      }),
                      u.play(n.start, n.end, n.speed, n.loop),
                      u
                    );
                  }
                  if (((this.autoPlay = !0), !this.isLoaded)) {
                    var a = n.loaded;
                    a && (this.loaded = a), this._beginPreload();
                  }
                }),
                (e.prototype.stop = function () {
                  if (!this.isPlayable) return (this.autoPlay = !1), this;
                  this.isPlaying = !1;
                  for (var t = this._instances.length - 1; t >= 0; t--)
                    this._instances[t].stop();
                  return this;
                }),
                (e.prototype.pause = function () {
                  for (var t = this._instances.length - 1; t >= 0; t--)
                    this._instances[t].paused = !0;
                  return (this.isPlaying = !1), this;
                }),
                (e.prototype.resume = function () {
                  for (var t = this._instances.length - 1; t >= 0; t--)
                    this._instances[t].paused = !1;
                  return (this.isPlaying = this._instances.length > 0), this;
                }),
                (e.prototype._beginPreload = function () {
                  this.src
                    ? this.useXHR
                      ? this._loadUrl()
                      : this._loadPath()
                    : this.srcBuffer
                      ? this._decode(this.srcBuffer)
                      : this.loaded
                        ? this.loaded(
                            new Error(
                              "sound.src or sound.srcBuffer must be set",
                            ),
                          )
                        : console.error(
                            "sound.src or sound.srcBuffer must be set",
                          );
                }),
                (e.prototype._onComplete = function (t) {
                  if (this._instances) {
                    var e = this._instances.indexOf(t);
                    e > -1 && this._instances.splice(e, 1),
                      (this.isPlaying = this._instances.length > 0);
                  }
                  t.destroy();
                }),
                (e.prototype._removeInstances = function () {
                  for (var t = this._instances.length - 1; t >= 0; t--)
                    this._instances[t].destroy();
                  this._instances.length = 0;
                }),
                (e.prototype._loadUrl = function () {
                  var t = this,
                    e = new XMLHttpRequest(),
                    n = this.src;
                  e.open("GET", n, !0),
                    (e.responseType = "arraybuffer"),
                    (e.onload = function () {
                      (t.isLoaded = !0),
                        (t.srcBuffer = e.response),
                        t._decode(e.response);
                    }),
                    e.send();
                }),
                (e.prototype._loadPath = function () {
                  var e = this,
                    n = t("fs"),
                    o = this.src;
                  n.readFile(o, function (t, n) {
                    if (t)
                      return (
                        console.error(t),
                        void (
                          e.loaded &&
                          e.loaded(new Error("File not found " + e.src))
                        )
                      );
                    for (
                      var o = new ArrayBuffer(n.length),
                        i = new Uint8Array(o),
                        r = 0;
                      r < n.length;
                      ++r
                    )
                      i[r] = n[r];
                    (e.srcBuffer = o), e._decode(o);
                  });
                }),
                (e.prototype._decode = function (t) {
                  var e = this;
                  this._context.decode(t, function (t, n) {
                    t
                      ? e.loaded(t)
                      : ((e.isLoaded = !0),
                        (e.buffer = n),
                        e.loaded && e.loaded(null, e),
                        e.autoPlay && e.play(e.complete));
                  });
                }),
                e
              );
            })();
          Object.defineProperty(n, "__esModule", { value: !0 }),
            (n.default = u);
        },
        {
          "./SoundInstance": 4,
          "./SoundNodes": 6,
          "./SoundSprite": 7,
          "./index": 16,
          fs: void 0,
        },
      ],
      3: [
        function (t, e, n) {
          "use strict";
          var o = (function () {
            function t() {
              (this._ctx = new t.AudioContext()),
                (this._offlineCtx = new t.OfflineAudioContext(
                  1,
                  2,
                  this._ctx.sampleRate,
                )),
                (this._unlocked = !1),
                (this._gainNode = this._ctx.createGain()),
                (this._compressor = this._ctx.createDynamicsCompressor()),
                this._gainNode.connect(this._compressor),
                this._compressor.connect(this._ctx.destination),
                (this.volume = 1),
                (this.muted = !1),
                (this.paused = !1),
                "ontouchstart" in window &&
                  "running" !== this._ctx.state &&
                  (this._unlock(),
                  (this._unlock = this._unlock.bind(this)),
                  document.addEventListener("mousedown", this._unlock, !0),
                  document.addEventListener("touchstart", this._unlock, !0),
                  document.addEventListener("touchend", this._unlock, !0));
            }
            return (
              (t.prototype._unlock = function () {
                this._unlocked ||
                  (this.playEmptySound(),
                  "running" === this._ctx.state &&
                    (document.removeEventListener(
                      "mousedown",
                      this._unlock,
                      !0,
                    ),
                    document.removeEventListener("touchend", this._unlock, !0),
                    document.removeEventListener(
                      "touchstart",
                      this._unlock,
                      !0,
                    ),
                    (this._unlocked = !0)));
              }),
              (t.prototype.playEmptySound = function () {
                var t = this._ctx.createBufferSource();
                (t.buffer = this._ctx.createBuffer(1, 1, 22050)),
                  t.connect(this._ctx.destination),
                  t.start(0, 0, 0);
              }),
              Object.defineProperty(t, "AudioContext", {
                get: function () {
                  var t = window;
                  return t.AudioContext || t.webkitAudioContext || null;
                },
                enumerable: !0,
                configurable: !0,
              }),
              Object.defineProperty(t, "OfflineAudioContext", {
                get: function () {
                  var t = window;
                  return (
                    t.OfflineAudioContext || t.webkitOfflineAudioContext || null
                  );
                },
                enumerable: !0,
                configurable: !0,
              }),
              (t.prototype.destroy = function () {
                var t = this._ctx;
                "undefined" != typeof t.close && t.close(),
                  this._gainNode.disconnect(),
                  this._compressor.disconnect(),
                  (this._offlineCtx = null),
                  (this._ctx = null),
                  (this._gainNode = null),
                  (this._compressor = null);
              }),
              Object.defineProperty(t.prototype, "audioContext", {
                get: function () {
                  return this._ctx;
                },
                enumerable: !0,
                configurable: !0,
              }),
              Object.defineProperty(t.prototype, "offlineContext", {
                get: function () {
                  return this._offlineCtx;
                },
                enumerable: !0,
                configurable: !0,
              }),
              Object.defineProperty(t.prototype, "muted", {
                get: function () {
                  return this._muted;
                },
                set: function (t) {
                  (this._muted = !!t),
                    (this._gainNode.gain.value = this._muted
                      ? 0
                      : this._volume);
                },
                enumerable: !0,
                configurable: !0,
              }),
              Object.defineProperty(t.prototype, "volume", {
                get: function () {
                  return this._volume;
                },
                set: function (t) {
                  (this._volume = t),
                    this._muted || (this._gainNode.gain.value = this._volume);
                },
                enumerable: !0,
                configurable: !0,
              }),
              Object.defineProperty(t.prototype, "paused", {
                get: function () {
                  return this._paused;
                },
                set: function (t) {
                  t && "running" === this._ctx.state
                    ? this._ctx.suspend()
                    : t ||
                      "suspended" !== this._ctx.state ||
                      this._ctx.resume(),
                    (this._paused = t);
                },
                enumerable: !0,
                configurable: !0,
              }),
              Object.defineProperty(t.prototype, "destination", {
                get: function () {
                  return this._gainNode;
                },
                enumerable: !0,
                configurable: !0,
              }),
              (t.prototype.toggleMute = function () {
                return (this.muted = !this.muted), this._muted;
              }),
              (t.prototype.decode = function (t, e) {
                this._offlineCtx.decodeAudioData(
                  t,
                  function (t) {
                    e(null, t);
                  },
                  function () {
                    e(new Error("Unable to decode file"));
                  },
                );
              }),
              t
            );
          })();
          Object.defineProperty(n, "__esModule", { value: !0 }),
            (n.default = o);
        },
        {},
      ],
      4: [
        function (t, e, n) {
          "use strict";
          var o =
              (this && this.__extends) ||
              function (t, e) {
                function n() {
                  this.constructor = t;
                }
                for (var o in e) e.hasOwnProperty(o) && (t[o] = e[o]);
                t.prototype =
                  null === e
                    ? Object.create(e)
                    : ((n.prototype = e.prototype), new n());
              },
            i = 0,
            r = (function (t) {
              function e(e) {
                var n = t.call(this) || this;
                return (
                  (n.id = i++),
                  (n._parent = null),
                  (n._paused = !1),
                  (n._elapsed = 0),
                  n._init(e),
                  n
                );
              }
              return (
                o(e, t),
                (e.create = function (t) {
                  if (e._pool.length > 0) {
                    var n = e._pool.pop();
                    return n._init(t), n;
                  }
                  return new e(t);
                }),
                (e.prototype.stop = function () {
                  this._source && (this._internalStop(), this.emit("stop"));
                }),
                (e.prototype.play = function (t, e, n, o) {
                  void 0 === t && (t = 0),
                    e && console.assert(e > t, "End time is before start time"),
                    (this._paused = !1),
                    (this._source = this._parent.nodes.cloneBufferSource()),
                    void 0 !== n && (this._source.playbackRate.value = n),
                    (this._speed = this._source.playbackRate.value),
                    void 0 !== o && (this._source.loop = o),
                    this._source.loop &&
                      void 0 !== e &&
                      (console.warn(
                        'Looping not support when specifying an "end" time',
                      ),
                      (this._source.loop = !1)),
                    (this._lastUpdate = this._now()),
                    (this._elapsed = t),
                    (this._duration = this._source.buffer.duration),
                    (this._source.onended = this._onComplete.bind(this)),
                    this._source.start(0, t, e ? e - t : void 0),
                    this.emit("start"),
                    this._update(!0),
                    (this._enabled = !0);
                }),
                Object.defineProperty(e.prototype, "_enabled", {
                  set: function (t) {
                    var e = this;
                    this._parent.nodes.scriptNode.onaudioprocess = t
                      ? function () {
                          e._update();
                        }
                      : null;
                  },
                  enumerable: !0,
                  configurable: !0,
                }),
                Object.defineProperty(e.prototype, "progress", {
                  get: function () {
                    return this._progress;
                  },
                  enumerable: !0,
                  configurable: !0,
                }),
                Object.defineProperty(e.prototype, "paused", {
                  get: function () {
                    return this._paused;
                  },
                  set: function (t) {
                    t !== this._paused &&
                      ((this._paused = t),
                      t
                        ? (this._internalStop(), this.emit("paused"))
                        : (this.emit("resumed"),
                          this.play(this._elapsed % this._duration)),
                      this.emit("pause", t));
                  },
                  enumerable: !0,
                  configurable: !0,
                }),
                (e.prototype.destroy = function () {
                  this.removeAllListeners(),
                    this._internalStop(),
                    this._source && (this._source.onended = null),
                    (this._source = null),
                    (this._parent = null),
                    (this._elapsed = 0),
                    (this._duration = 0),
                    (this._paused = !1),
                    e._pool.indexOf(this) < 0 && e._pool.push(this);
                }),
                (e.prototype.toString = function () {
                  return "[SoundInstance id=" + this.id + "]";
                }),
                (e.prototype._now = function () {
                  return this._parent.context.audioContext.currentTime;
                }),
                (e.prototype._update = function (t) {
                  if ((void 0 === t && (t = !1), this._source)) {
                    var e = this._now(),
                      n = e - this._lastUpdate;
                    if (n > 0 || t) {
                      (this._elapsed += n), (this._lastUpdate = e);
                      var o = this._duration;
                      (this._progress =
                        ((this._elapsed * this._speed) % o) / o),
                        this.emit("progress", this._progress);
                    }
                  }
                }),
                (e.prototype._init = function (t) {
                  this._parent = t;
                }),
                (e.prototype._internalStop = function () {
                  this._source &&
                    ((this._enabled = !1),
                    (this._source.onended = null),
                    this._source.stop(),
                    (this._source = null));
                }),
                (e.prototype._onComplete = function () {
                  this._source &&
                    ((this._enabled = !1), (this._source.onended = null)),
                    (this._source = null),
                    (this._progress = 1),
                    this.emit("progress", 1),
                    this.emit("end", this);
                }),
                e
              );
            })(PIXI.utils.EventEmitter);
          (r._pool = []),
            Object.defineProperty(n, "__esModule", { value: !0 }),
            (n.default = r);
        },
        {},
      ],
      5: [
        function (t, e, n) {
          "use strict";
          var o = t("./filters"),
            i = t("./Sound"),
            r = t("./SoundContext"),
            s = t("./SoundInstance"),
            u = t("./SoundSprite"),
            a = t("./SoundUtils"),
            c = (function () {
              function t() {
                this.supported && (this._context = new r.default()),
                  (this._sounds = {}),
                  (this.utils = a.default),
                  (this.filters = o),
                  (this.Sound = i.default),
                  (this.SoundInstance = s.default),
                  (this.SoundLibrary = t),
                  (this.SoundSprite = u.default);
              }
              return (
                Object.defineProperty(t.prototype, "context", {
                  get: function () {
                    return this._context;
                  },
                  enumerable: !0,
                  configurable: !0,
                }),
                Object.defineProperty(t.prototype, "supported", {
                  get: function () {
                    return null !== r.default.AudioContext;
                  },
                  enumerable: !0,
                  configurable: !0,
                }),
                (t.prototype.add = function (t, e) {
                  if ("object" == typeof t) {
                    var n = {};
                    for (var o in t) {
                      var r = this._getOptions(t[o], e);
                      n[o] = this.add(o, r);
                    }
                    return n;
                  }
                  if ("string" == typeof t) {
                    if (
                      (console.assert(
                        !this._sounds[t],
                        "Sound with alias " + t + " already exists.",
                      ),
                      e instanceof i.default)
                    )
                      return (this._sounds[t] = e), e;
                    var r = this._getOptions(e),
                      s = new i.default(this.context, r);
                    return (this._sounds[t] = s), s;
                  }
                }),
                (t.prototype._getOptions = function (t, e) {
                  var n;
                  return (
                    (n =
                      "string" == typeof t
                        ? { src: t }
                        : t instanceof ArrayBuffer
                          ? { srcBuffer: t }
                          : t),
                    Object.assign(n, e || {})
                  );
                }),
                (t.prototype.remove = function (t) {
                  return (
                    this.exists(t, !0),
                    this._sounds[t].destroy(),
                    delete this._sounds[t],
                    this
                  );
                }),
                Object.defineProperty(t.prototype, "volumeAll", {
                  get: function () {
                    return this._context.volume;
                  },
                  set: function (t) {
                    this._context.volume = t;
                  },
                  enumerable: !0,
                  configurable: !0,
                }),
                (t.prototype.pauseAll = function () {
                  return (this._context.paused = !0), this;
                }),
                (t.prototype.resumeAll = function () {
                  return (this._context.paused = !1), this;
                }),
                (t.prototype.muteAll = function () {
                  return (this._context.muted = !0), this;
                }),
                (t.prototype.unmuteAll = function () {
                  return (this._context.muted = !1), this;
                }),
                (t.prototype.removeAll = function () {
                  for (var t in this._sounds)
                    this._sounds[t].destroy(), delete this._sounds[t];
                  return this;
                }),
                (t.prototype.stopAll = function () {
                  for (var t in this._sounds) this._sounds[t].stop();
                  return this;
                }),
                (t.prototype.exists = function (t, e) {
                  void 0 === e && (e = !1);
                  var n = !!this._sounds[t];
                  return (
                    e &&
                      console.assert(n, "No sound matching alias '" + t + "'."),
                    n
                  );
                }),
                (t.prototype.find = function (t) {
                  return this.exists(t, !0), this._sounds[t];
                }),
                (t.prototype.play = function (t, e) {
                  return this.find(t).play(e);
                }),
                (t.prototype.stop = function (t) {
                  return this.find(t).stop();
                }),
                (t.prototype.pause = function (t) {
                  return this.find(t).pause();
                }),
                (t.prototype.resume = function (t) {
                  return this.find(t).resume();
                }),
                (t.prototype.volume = function (t, e) {
                  var n = this.find(t);
                  return void 0 !== e && (n.volume = e), n.volume;
                }),
                (t.prototype.duration = function (t) {
                  return this.find(t).duration;
                }),
                (t.prototype.destroy = function () {
                  this.removeAll(),
                    (this._sounds = null),
                    (this._context = null);
                }),
                t
              );
            })();
          Object.defineProperty(n, "__esModule", { value: !0 }),
            (n.default = c);
        },
        {
          "./Sound": 2,
          "./SoundContext": 3,
          "./SoundInstance": 4,
          "./SoundSprite": 7,
          "./SoundUtils": 8,
          "./filters": 15,
        },
      ],
      6: [
        function (t, e, n) {
          "use strict";
          var o = (function () {
            function t(e) {
              this.context = e;
              var n = this.context.audioContext,
                o = n.createBufferSource(),
                i = n.createScriptProcessor(t.BUFFER_SIZE),
                r = n.createGain(),
                s = n.createAnalyser();
              r.connect(this.context.destination),
                i.connect(this.context.destination),
                s.connect(r),
                o.connect(s),
                (this.bufferSource = o),
                (this.scriptNode = i),
                (this.gainNode = r),
                (this.analyser = s),
                (this.destination = s);
            }
            return (
              Object.defineProperty(t.prototype, "filters", {
                get: function () {
                  return this._filters;
                },
                set: function (t) {
                  var e = this;
                  if (
                    (this._filters &&
                      (this._filters.forEach(function (t) {
                        t && t.disconnect();
                      }),
                      (this._filters = null),
                      this.analyser.connect(this.gainNode)),
                    t && t.length)
                  ) {
                    (this._filters = t.slice(0)), this.analyser.disconnect();
                    var n = null;
                    t.forEach(function (t) {
                      null === n
                        ? e.analyser.connect(t.destination)
                        : n.connect(t.destination),
                        (n = t);
                    }),
                      n.connect(this.gainNode);
                  }
                },
                enumerable: !0,
                configurable: !0,
              }),
              (t.prototype.destroy = function () {
                (this.filters = null),
                  this.bufferSource.disconnect(),
                  this.scriptNode.disconnect(),
                  this.gainNode.disconnect(),
                  this.analyser.disconnect(),
                  (this.bufferSource = null),
                  (this.scriptNode = null),
                  (this.gainNode = null),
                  (this.analyser = null),
                  (this.context = null);
              }),
              (t.prototype.cloneBufferSource = function () {
                var t = this.bufferSource,
                  e = this.context.audioContext.createBufferSource();
                return (
                  (e.buffer = t.buffer),
                  (e.playbackRate.value = t.playbackRate.value),
                  (e.loop = t.loop),
                  e.connect(this.destination),
                  e
                );
              }),
              t
            );
          })();
          (o.BUFFER_SIZE = 256),
            Object.defineProperty(n, "__esModule", { value: !0 }),
            (n.default = o);
        },
        {},
      ],
      7: [
        function (t, e, n) {
          "use strict";
          var o = (function () {
            function t(t, e) {
              (this.parent = t),
                Object.assign(this, e),
                (this.duration = this.end - this.start),
                console.assert(
                  this.duration > 0,
                  "End time must be after start time",
                );
            }
            return (
              (t.prototype.play = function (t) {
                return this.parent.play(
                  Object.assign({
                    complete: t,
                    speed: this.speed || this.parent.speed,
                    end: this.end,
                    start: this.start,
                  }),
                );
              }),
              (t.prototype.destroy = function () {
                this.parent = null;
              }),
              t
            );
          })();
          Object.defineProperty(n, "__esModule", { value: !0 }),
            (n.default = o);
        },
        {},
      ],
      8: [
        function (t, e, n) {
          "use strict";
          var o = t("uuid/v4"),
            i = t("./index"),
            r = t("./Sound"),
            s = (function () {
              function t() {}
              return (
                (t.sineTone = function (t, e) {
                  void 0 === t && (t = 200), void 0 === e && (e = 1);
                  for (
                    var n = i.default.context,
                      o = new r.default(n, { singleInstance: !0 }),
                      s = 1,
                      u = 48e3,
                      a = 2,
                      c = n.audioContext.createBuffer(s, e * u, u),
                      d = c.getChannelData(0),
                      l = 0;
                    l < d.length;
                    l++
                  ) {
                    var f = l / c.sampleRate,
                      p = t * f * Math.PI;
                    d[l] = Math.sin(p) * a;
                  }
                  return (o.buffer = c), (o.isLoaded = !0), o;
                }),
                (t.render = function (t, e) {
                  (e = Object.assign(
                    { width: 512, height: 128, fill: "black" },
                    e || {},
                  )),
                    console.assert(!!t.buffer, "No buffer found, load first");
                  var n = document.createElement("canvas");
                  (n.width = e.width), (n.height = e.height);
                  var o = n.getContext("2d");
                  o.fillStyle = e.fill;
                  for (
                    var i = t.buffer.getChannelData(0),
                      r = Math.ceil(i.length / e.width),
                      s = e.height / 2,
                      u = 0;
                    u < e.width;
                    u++
                  ) {
                    for (var a = 1, c = -1, d = 0; d < r; d++) {
                      var l = i[u * r + d];
                      l < a && (a = l), l > c && (c = l);
                    }
                    o.fillRect(u, (1 + a) * s, 1, Math.max(1, (c - a) * s));
                  }
                  return PIXI.BaseTexture.fromCanvas(n);
                }),
                (t.playOnce = function (t, e) {
                  var n = o();
                  return (
                    i.default.add(n, {
                      src: t,
                      preload: !0,
                      autoPlay: !0,
                      loaded: function (t) {
                        t && (console.error(t), i.default.remove(n), e && e(t));
                      },
                      complete: function () {
                        i.default.remove(n), e && e(null);
                      },
                    }),
                    n
                  );
                }),
                t
              );
            })();
          Object.defineProperty(n, "__esModule", { value: !0 }),
            (n.default = s);
        },
        { "./Sound": 2, "./index": 16, "uuid/v4": 19 },
      ],
      9: [
        function (t, e, n) {
          "use strict";
          var o = t("./Sound"),
            i = t("./SoundLibrary"),
            r = i.default.prototype,
            s = o.default.prototype;
          (r.sound = function (t) {
            return (
              console.warn(
                "PIXI.sound.sound is deprecated, use PIXI.sound.find",
              ),
              this.find(t)
            );
          }),
            (r.panning = function (t, e) {
              return (
                console.warn(
                  "PIXI.sound.panning is deprecated, use PIXI.sound.filters.StereoPan",
                ),
                0
              );
            }),
            (r.addMap = function (t, e) {
              return (
                console.warn(
                  "PIXI.sound.addMap is deprecated, use PIXI.sound.add",
                ),
                this.add(t, e)
              );
            }),
            Object.defineProperty(r, "SoundUtils", {
              get: function () {
                return (
                  console.warn(
                    "PIXI.sound.SoundUtils is deprecated, use PIXI.sound.utils",
                  ),
                  this.utils
                );
              },
            }),
            Object.defineProperty(s, "block", {
              get: function () {
                return (
                  console.warn(
                    "PIXI.sound.Sound.prototype.block is deprecated, use singleInstance instead",
                  ),
                  this.singleInstance
                );
              },
              set: function (t) {
                console.warn(
                  "PIXI.sound.Sound.prototype.block is deprecated, use singleInstance instead",
                ),
                  (this.singleInstance = t);
              },
            });
        },
        { "./Sound": 2, "./SoundLibrary": 5 },
      ],
      10: [
        function (t, e, n) {
          "use strict";
          var o =
              (this && this.__extends) ||
              function (t, e) {
                function n() {
                  this.constructor = t;
                }
                for (var o in e) e.hasOwnProperty(o) && (t[o] = e[o]);
                t.prototype =
                  null === e
                    ? Object.create(e)
                    : ((n.prototype = e.prototype), new n());
              },
            i = t("./Filter"),
            r = t("../index"),
            s = (function (t) {
              function e(e) {
                void 0 === e && (e = 0);
                var n = this,
                  o = r.default.context.audioContext.createWaveShaper();
                return (
                  (n = t.call(this, o) || this),
                  (n._distortion = o),
                  (n.amount = e),
                  n
                );
              }
              return (
                o(e, t),
                Object.defineProperty(e.prototype, "amount", {
                  get: function () {
                    return this._amount;
                  },
                  set: function (t) {
                    (t *= 1e3), (this._amount = t);
                    for (
                      var e,
                        n = 44100,
                        o = new Float32Array(n),
                        i = Math.PI / 180,
                        r = 0;
                      r < n;
                      ++r
                    )
                      (e = (2 * r) / n - 1),
                        (o[r] =
                          ((3 + t) * e * 20 * i) / (Math.PI + t * Math.abs(e)));
                    (this._distortion.curve = o),
                      (this._distortion.oversample = "4x");
                  },
                  enumerable: !0,
                  configurable: !0,
                }),
                (e.prototype.destroy = function () {
                  (this._distortion = null), t.prototype.destroy.call(this);
                }),
                e
              );
            })(i.default);
          Object.defineProperty(n, "__esModule", { value: !0 }),
            (n.default = s);
        },
        { "../index": 16, "./Filter": 12 },
      ],
      11: [
        function (t, e, n) {
          "use strict";
          var o =
              (this && this.__extends) ||
              function (t, e) {
                function n() {
                  this.constructor = t;
                }
                for (var o in e) e.hasOwnProperty(o) && (t[o] = e[o]);
                t.prototype =
                  null === e
                    ? Object.create(e)
                    : ((n.prototype = e.prototype), new n());
              },
            i = t("./Filter"),
            r = t("../index"),
            s = (function (t) {
              function e(n, o, i, s, u, a, c, d, l, f) {
                void 0 === n && (n = 0),
                  void 0 === o && (o = 0),
                  void 0 === i && (i = 0),
                  void 0 === s && (s = 0),
                  void 0 === u && (u = 0),
                  void 0 === a && (a = 0),
                  void 0 === c && (c = 0),
                  void 0 === d && (d = 0),
                  void 0 === l && (l = 0),
                  void 0 === f && (f = 0);
                var p = this,
                  h = [
                    { f: e.F32, type: "lowshelf", gain: n },
                    { f: e.F64, type: "peaking", gain: o },
                    { f: e.F125, type: "peaking", gain: i },
                    { f: e.F250, type: "peaking", gain: s },
                    { f: e.F500, type: "peaking", gain: u },
                    { f: e.F1K, type: "peaking", gain: a },
                    { f: e.F2K, type: "peaking", gain: c },
                    { f: e.F4K, type: "peaking", gain: d },
                    { f: e.F8K, type: "peaking", gain: l },
                    { f: e.F16K, type: "highshelf", gain: f },
                  ],
                  _ = h.map(function (t) {
                    var e = r.default.context.audioContext.createBiquadFilter();
                    return (
                      (e.type = t.type),
                      (e.gain.value = t.gain),
                      (e.Q.value = 1),
                      (e.frequency.value = t.f),
                      e
                    );
                  });
                (p = t.call(this, _[0], _[_.length - 1]) || this),
                  (p.bands = _),
                  (p.bandsMap = {});
                for (var y = 0; y < p.bands.length; y++) {
                  var v = p.bands[y];
                  y > 0 && p.bands[y - 1].connect(v),
                    (p.bandsMap[v.frequency.value] = v);
                }
                return p;
              }
              return (
                o(e, t),
                (e.prototype.setGain = function (t, e) {
                  if ((void 0 === e && (e = 0), !this.bandsMap[t]))
                    throw "No band found for frequency " + t;
                  this.bandsMap[t].gain.value = e;
                }),
                (e.prototype.reset = function () {
                  this.bands.forEach(function (t) {
                    t.gain.value = 0;
                  });
                }),
                (e.prototype.destroy = function () {
                  this.bands.forEach(function (t) {
                    t.disconnect();
                  }),
                    (this.bands = null),
                    (this.bandsMap = null);
                }),
                e
              );
            })(i.default);
          (s.F32 = 32),
            (s.F64 = 64),
            (s.F125 = 125),
            (s.F250 = 250),
            (s.F500 = 500),
            (s.F1K = 1e3),
            (s.F2K = 2e3),
            (s.F4K = 4e3),
            (s.F8K = 8e3),
            (s.F16K = 16e3),
            Object.defineProperty(n, "__esModule", { value: !0 }),
            (n.default = s);
        },
        { "../index": 16, "./Filter": 12 },
      ],
      12: [
        function (t, e, n) {
          "use strict";
          var o = (function () {
            function t(t, e) {
              (this.destination = t), (this.source = e || t);
            }
            return (
              (t.prototype.connect = function (t) {
                this.source.connect(t);
              }),
              (t.prototype.disconnect = function () {
                this.source.disconnect();
              }),
              (t.prototype.destroy = function () {
                this.disconnect(),
                  (this.destination = null),
                  (this.source = null);
              }),
              t
            );
          })();
          Object.defineProperty(n, "__esModule", { value: !0 }),
            (n.default = o);
        },
        {},
      ],
      13: [
        function (t, e, n) {
          "use strict";
          var o =
              (this && this.__extends) ||
              function (t, e) {
                function n() {
                  this.constructor = t;
                }
                for (var o in e) e.hasOwnProperty(o) && (t[o] = e[o]);
                t.prototype =
                  null === e
                    ? Object.create(e)
                    : ((n.prototype = e.prototype), new n());
              },
            i = t("./Filter"),
            r = t("../index"),
            s = (function (t) {
              function e(e, n, o) {
                void 0 === e && (e = 3),
                  void 0 === n && (n = 2),
                  void 0 === o && (o = !1);
                var i = this,
                  s = r.default.context.audioContext.createConvolver();
                return (
                  (i = t.call(this, s) || this),
                  (i._convolver = s),
                  (i._seconds = i._clamp(e, 1, 50)),
                  (i._decay = i._clamp(n, 0, 100)),
                  (i._reverse = o),
                  i._rebuild(),
                  i
                );
              }
              return (
                o(e, t),
                (e.prototype._clamp = function (t, e, n) {
                  return Math.min(n, Math.max(e, t));
                }),
                Object.defineProperty(e.prototype, "seconds", {
                  get: function () {
                    return this._seconds;
                  },
                  set: function (t) {
                    (this._seconds = this._clamp(t, 1, 50)), this._rebuild();
                  },
                  enumerable: !0,
                  configurable: !0,
                }),
                Object.defineProperty(e.prototype, "decay", {
                  get: function () {
                    return this._decay;
                  },
                  set: function (t) {
                    (this._decay = this._clamp(t, 0, 100)), this._rebuild();
                  },
                  enumerable: !0,
                  configurable: !0,
                }),
                Object.defineProperty(e.prototype, "reverse", {
                  get: function () {
                    return this._reverse;
                  },
                  set: function (t) {
                    (this._reverse = t), this._rebuild();
                  },
                  enumerable: !0,
                  configurable: !0,
                }),
                (e.prototype._rebuild = function () {
                  for (
                    var t,
                      e = r.default.context.audioContext,
                      n = e.sampleRate,
                      o = n * this._seconds,
                      i = e.createBuffer(2, o, n),
                      s = i.getChannelData(0),
                      u = i.getChannelData(1),
                      a = 0;
                    a < o;
                    a++
                  )
                    (t = this._reverse ? o - a : a),
                      (s[a] =
                        (2 * Math.random() - 1) *
                        Math.pow(1 - t / o, this._decay)),
                      (u[a] =
                        (2 * Math.random() - 1) *
                        Math.pow(1 - t / o, this._decay));
                  this._convolver.buffer = i;
                }),
                (e.prototype.destroy = function () {
                  (this._convolver = null), t.prototype.destroy.call(this);
                }),
                e
              );
            })(i.default);
          Object.defineProperty(n, "__esModule", { value: !0 }),
            (n.default = s);
        },
        { "../index": 16, "./Filter": 12 },
      ],
      14: [
        function (t, e, n) {
          "use strict";
          var o =
              (this && this.__extends) ||
              function (t, e) {
                function n() {
                  this.constructor = t;
                }
                for (var o in e) e.hasOwnProperty(o) && (t[o] = e[o]);
                t.prototype =
                  null === e
                    ? Object.create(e)
                    : ((n.prototype = e.prototype), new n());
              },
            i = t("./Filter"),
            r = t("../index"),
            s = (function (t) {
              function e(e) {
                void 0 === e && (e = 0);
                var n,
                  o,
                  i,
                  s = this,
                  u = r.default.context.audioContext;
                return (
                  u.createStereoPanner
                    ? ((n = u.createStereoPanner()), (i = n))
                    : ((o = u.createPanner()),
                      (o.panningModel = "equalpower"),
                      (i = o)),
                  (s = t.call(this, i) || this),
                  (s._stereo = n),
                  (s._panner = o),
                  (s.pan = e),
                  s
                );
              }
              return (
                o(e, t),
                Object.defineProperty(e.prototype, "pan", {
                  get: function () {
                    return this._pan;
                  },
                  set: function (t) {
                    (this._pan = t),
                      this._stereo
                        ? (this._stereo.pan.value = t)
                        : this._panner.setPosition(t, 0, 1 - Math.abs(t));
                  },
                  enumerable: !0,
                  configurable: !0,
                }),
                (e.prototype.destroy = function () {
                  t.prototype.destroy.call(this),
                    (this._stereo = null),
                    (this._panner = null);
                }),
                e
              );
            })(i.default);
          Object.defineProperty(n, "__esModule", { value: !0 }),
            (n.default = s);
        },
        { "../index": 16, "./Filter": 12 },
      ],
      15: [
        function (t, e, n) {
          "use strict";
          var o = t("./Filter");
          n.Filter = o.default;
          var i = t("./EqualizerFilter");
          n.EqualizerFilter = i.default;
          var r = t("./DistortionFilter");
          n.DistortionFilter = r.default;
          var s = t("./StereoFilter");
          n.StereoFilter = s.default;
          var u = t("./ReverbFilter");
          n.ReverbFilter = u.default;
        },
        {
          "./DistortionFilter": 10,
          "./EqualizerFilter": 11,
          "./Filter": 12,
          "./ReverbFilter": 13,
          "./StereoFilter": 14,
        },
      ],
      16: [
        function (t, e, n) {
          (function (e) {
            "use strict";
            var o = t("./LoaderMiddleware"),
              i = t("./SoundLibrary");
            t("./deprecations");
            var r = new i.default();
            if (void 0 === e.PIXI) throw new Error("pixi.js is required");
            void 0 !== PIXI.loaders && o.install(),
              Object.defineProperty(PIXI, "sound", {
                get: function () {
                  return r;
                },
              }),
              Object.defineProperty(n, "__esModule", { value: !0 }),
              (n.default = r);
          }).call(
            this,
            "undefined" != typeof global
              ? global
              : "undefined" != typeof self
                ? self
                : "undefined" != typeof window
                  ? window
                  : {},
          );
        },
        { "./LoaderMiddleware": 1, "./SoundLibrary": 5, "./deprecations": 9 },
      ],
      17: [
        function (t, e, n) {
          function o(t, e) {
            var n = e || 0,
              o = i;
            return (
              o[t[n++]] +
              o[t[n++]] +
              o[t[n++]] +
              o[t[n++]] +
              "-" +
              o[t[n++]] +
              o[t[n++]] +
              "-" +
              o[t[n++]] +
              o[t[n++]] +
              "-" +
              o[t[n++]] +
              o[t[n++]] +
              "-" +
              o[t[n++]] +
              o[t[n++]] +
              o[t[n++]] +
              o[t[n++]] +
              o[t[n++]] +
              o[t[n++]]
            );
          }
          for (var i = [], r = 0; r < 256; ++r)
            i[r] = (r + 256).toString(16).substr(1);
          e.exports = o;
        },
        {},
      ],
      18: [
        function (t, e, n) {
          (function (t) {
            var n,
              o = t.crypto || t.msCrypto;
            if (o && o.getRandomValues) {
              var i = new Uint8Array(16);
              n = function () {
                return o.getRandomValues(i), i;
              };
            }
            if (!n) {
              var r = new Array(16);
              n = function () {
                for (var t, e = 0; e < 16; e++)
                  0 === (3 & e) && (t = 4294967296 * Math.random()),
                    (r[e] = (t >>> ((3 & e) << 3)) & 255);
                return r;
              };
            }
            e.exports = n;
          }).call(
            this,
            "undefined" != typeof global
              ? global
              : "undefined" != typeof self
                ? self
                : "undefined" != typeof window
                  ? window
                  : {},
          );
        },
        {},
      ],
      19: [
        function (t, e, n) {
          function o(t, e, n) {
            var o = (e && n) || 0;
            "string" == typeof t &&
              ((e = "binary" == t ? new Array(16) : null), (t = null)),
              (t = t || {});
            var s = t.random || (t.rng || i)();
            if (((s[6] = (15 & s[6]) | 64), (s[8] = (63 & s[8]) | 128), e))
              for (var u = 0; u < 16; ++u) e[o + u] = s[u];
            return e || r(s);
          }
          var i = t("./lib/rng"),
            r = t("./lib/bytesToUuid");
          e.exports = o;
        },
        { "./lib/bytesToUuid": 17, "./lib/rng": 18 },
      ],
    },
    {},
    [16],
  )(16);
});
