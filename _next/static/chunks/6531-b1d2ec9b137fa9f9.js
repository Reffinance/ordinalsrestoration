(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [6531], {
        27652: function(t, e, r) {
            "use strict";
            var o = r(49494),
                n = {
                    "text/plain": "Text",
                    "text/html": "Url",
                    default: "Text"
                };
            t.exports = function(t, e) {
                var r, a, i, s, u, l, f, h, c = !1;
                e || (e = {}), i = e.debug || !1;
                try {
                    if (u = o(), l = document.createRange(), f = document.getSelection(), (h = document.createElement("span")).textContent = t, h.ariaHidden = "true", h.style.all = "unset", h.style.position = "fixed", h.style.top = 0, h.style.clip = "rect(0, 0, 0, 0)", h.style.whiteSpace = "pre", h.style.webkitUserSelect = "text", h.style.MozUserSelect = "text", h.style.msUserSelect = "text", h.style.userSelect = "text", h.addEventListener("copy", function(r) {
                            if (r.stopPropagation(), e.format) {
                                if (r.preventDefault(), void 0 === r.clipboardData) {
                                    i && console.warn("unable to use e.clipboardData"), i && console.warn("trying IE specific stuff"), window.clipboardData.clearData();
                                    var o = n[e.format] || n.default;
                                    window.clipboardData.setData(o, t)
                                } else r.clipboardData.clearData(), r.clipboardData.setData(e.format, t)
                            }
                            e.onCopy && (r.preventDefault(), e.onCopy(r.clipboardData))
                        }), document.body.appendChild(h), l.selectNodeContents(h), f.addRange(l), !document.execCommand("copy")) throw Error("copy command was unsuccessful");
                    c = !0
                } catch (o) {
                    i && console.error("unable to copy using execCommand: ", o), i && console.warn("trying IE specific stuff");
                    try {
                        window.clipboardData.setData(e.format || "text", t), e.onCopy && e.onCopy(window.clipboardData), c = !0
                    } catch (o) {
                        i && console.error("unable to copy using clipboardData: ", o), i && console.error("falling back to prompt"), r = "message" in e ? e.message : "Copy to clipboard: #{key}, Enter", a = (/mac os x/i.test(navigator.userAgent) ? "⌘" : "Ctrl") + "+C", s = r.replace(/#{\s*key\s*}/g, a), window.prompt(s, t)
                    }
                } finally {
                    f && ("function" == typeof f.removeRange ? f.removeRange(l) : f.removeAllRanges()), h && document.body.removeChild(h), u()
                }
                return c
            }
        },
        97611: function(t, e, r) {
            "use strict";
            var o = r(86054);

            function n() {}

            function a() {}
            a.resetWarningCache = n, t.exports = function() {
                function t(t, e, r, n, a, i) {
                    if (i !== o) {
                        var s = Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");
                        throw s.name = "Invariant Violation", s
                    }
                }

                function e() {
                    return t
                }
                t.isRequired = t;
                var r = {
                    array: t,
                    bigint: t,
                    bool: t,
                    func: t,
                    number: t,
                    object: t,
                    string: t,
                    symbol: t,
                    any: t,
                    arrayOf: e,
                    element: t,
                    elementType: t,
                    instanceOf: e,
                    node: t,
                    objectOf: e,
                    oneOf: e,
                    oneOfType: e,
                    shape: e,
                    exact: e,
                    checkPropTypes: a,
                    resetWarningCache: n
                };
                return r.PropTypes = r, r
            }
        },
        79497: function(t, e, r) {
            t.exports = r(97611)()
        },
        86054: function(t) {
            "use strict";
            t.exports = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"
        },
        45436: function(t, e, r) {
            var o = r(76374);

            function n(t) {
                this.mode = o.MODE_8BIT_BYTE, this.data = t
            }
            n.prototype = {
                getLength: function(t) {
                    return this.data.length
                },
                write: function(t) {
                    for (var e = 0; e < this.data.length; e++) t.put(this.data.charCodeAt(e), 8)
                }
            }, t.exports = n
        },
        24961: function(t) {
            function e() {
                this.buffer = [], this.length = 0
            }
            e.prototype = {
                get: function(t) {
                    var e = Math.floor(t / 8);
                    return (this.buffer[e] >>> 7 - t % 8 & 1) == 1
                },
                put: function(t, e) {
                    for (var r = 0; r < e; r++) this.putBit((t >>> e - r - 1 & 1) == 1)
                },
                getLengthInBits: function() {
                    return this.length
                },
                putBit: function(t) {
                    var e = Math.floor(this.length / 8);
                    this.buffer.length <= e && this.buffer.push(0), t && (this.buffer[e] |= 128 >>> this.length % 8), this.length++
                }
            }, t.exports = e
        },
        75473: function(t) {
            t.exports = {
                L: 1,
                M: 0,
                Q: 3,
                H: 2
            }
        },
        2659: function(t, e, r) {
            var o = r(70917);

            function n(t, e) {
                if (void 0 == t.length) throw Error(t.length + "/" + e);
                for (var r = 0; r < t.length && 0 == t[r];) r++;
                this.num = Array(t.length - r + e);
                for (var o = 0; o < t.length - r; o++) this.num[o] = t[o + r]
            }
            n.prototype = {
                get: function(t) {
                    return this.num[t]
                },
                getLength: function() {
                    return this.num.length
                },
                multiply: function(t) {
                    for (var e = Array(this.getLength() + t.getLength() - 1), r = 0; r < this.getLength(); r++)
                        for (var a = 0; a < t.getLength(); a++) e[r + a] ^= o.gexp(o.glog(this.get(r)) + o.glog(t.get(a)));
                    return new n(e, 0)
                },
                mod: function(t) {
                    if (this.getLength() - t.getLength() < 0) return this;
                    for (var e = o.glog(this.get(0)) - o.glog(t.get(0)), r = Array(this.getLength()), a = 0; a < this.getLength(); a++) r[a] = this.get(a);
                    for (var a = 0; a < t.getLength(); a++) r[a] ^= o.gexp(o.glog(t.get(a)) + e);
                    return new n(r, 0).mod(t)
                }
            }, t.exports = n
        },
        1710: function(t, e, r) {
            var o = r(45436),
                n = r(47967),
                a = r(24961),
                i = r(74868),
                s = r(2659);

            function u(t, e) {
                this.typeNumber = t, this.errorCorrectLevel = e, this.modules = null, this.moduleCount = 0, this.dataCache = null, this.dataList = []
            }
            var l = u.prototype;
            l.addData = function(t) {
                var e = new o(t);
                this.dataList.push(e), this.dataCache = null
            }, l.isDark = function(t, e) {
                if (t < 0 || this.moduleCount <= t || e < 0 || this.moduleCount <= e) throw Error(t + "," + e);
                return this.modules[t][e]
            }, l.getModuleCount = function() {
                return this.moduleCount
            }, l.make = function() {
                if (this.typeNumber < 1) {
                    var t = 1;
                    for (t = 1; t < 40; t++) {
                        for (var e = n.getRSBlocks(t, this.errorCorrectLevel), r = new a, o = 0, s = 0; s < e.length; s++) o += e[s].dataCount;
                        for (var s = 0; s < this.dataList.length; s++) {
                            var u = this.dataList[s];
                            r.put(u.mode, 4), r.put(u.getLength(), i.getLengthInBits(u.mode, t)), u.write(r)
                        }
                        if (r.getLengthInBits() <= 8 * o) break
                    }
                    this.typeNumber = t
                }
                this.makeImpl(!1, this.getBestMaskPattern())
            }, l.makeImpl = function(t, e) {
                this.moduleCount = 4 * this.typeNumber + 17, this.modules = Array(this.moduleCount);
                for (var r = 0; r < this.moduleCount; r++) {
                    this.modules[r] = Array(this.moduleCount);
                    for (var o = 0; o < this.moduleCount; o++) this.modules[r][o] = null
                }
                this.setupPositionProbePattern(0, 0), this.setupPositionProbePattern(this.moduleCount - 7, 0), this.setupPositionProbePattern(0, this.moduleCount - 7), this.setupPositionAdjustPattern(), this.setupTimingPattern(), this.setupTypeInfo(t, e), this.typeNumber >= 7 && this.setupTypeNumber(t), null == this.dataCache && (this.dataCache = u.createData(this.typeNumber, this.errorCorrectLevel, this.dataList)), this.mapData(this.dataCache, e)
            }, l.setupPositionProbePattern = function(t, e) {
                for (var r = -1; r <= 7; r++)
                    if (!(t + r <= -1) && !(this.moduleCount <= t + r))
                        for (var o = -1; o <= 7; o++) e + o <= -1 || this.moduleCount <= e + o || (0 <= r && r <= 6 && (0 == o || 6 == o) || 0 <= o && o <= 6 && (0 == r || 6 == r) || 2 <= r && r <= 4 && 2 <= o && o <= 4 ? this.modules[t + r][e + o] = !0 : this.modules[t + r][e + o] = !1)
            }, l.getBestMaskPattern = function() {
                for (var t = 0, e = 0, r = 0; r < 8; r++) {
                    this.makeImpl(!0, r);
                    var o = i.getLostPoint(this);
                    (0 == r || t > o) && (t = o, e = r)
                }
                return e
            }, l.createMovieClip = function(t, e, r) {
                var o = t.createEmptyMovieClip(e, r);
                this.make();
                for (var n = 0; n < this.modules.length; n++)
                    for (var a = 1 * n, i = 0; i < this.modules[n].length; i++) {
                        var s = 1 * i;
                        this.modules[n][i] && (o.beginFill(0, 100), o.moveTo(s, a), o.lineTo(s + 1, a), o.lineTo(s + 1, a + 1), o.lineTo(s, a + 1), o.endFill())
                    }
                return o
            }, l.setupTimingPattern = function() {
                for (var t = 8; t < this.moduleCount - 8; t++) null == this.modules[t][6] && (this.modules[t][6] = t % 2 == 0);
                for (var e = 8; e < this.moduleCount - 8; e++) null == this.modules[6][e] && (this.modules[6][e] = e % 2 == 0)
            }, l.setupPositionAdjustPattern = function() {
                for (var t = i.getPatternPosition(this.typeNumber), e = 0; e < t.length; e++)
                    for (var r = 0; r < t.length; r++) {
                        var o = t[e],
                            n = t[r];
                        if (null == this.modules[o][n])
                            for (var a = -2; a <= 2; a++)
                                for (var s = -2; s <= 2; s++) - 2 == a || 2 == a || -2 == s || 2 == s || 0 == a && 0 == s ? this.modules[o + a][n + s] = !0 : this.modules[o + a][n + s] = !1
                    }
            }, l.setupTypeNumber = function(t) {
                for (var e = i.getBCHTypeNumber(this.typeNumber), r = 0; r < 18; r++) {
                    var o = !t && (e >> r & 1) == 1;
                    this.modules[Math.floor(r / 3)][r % 3 + this.moduleCount - 8 - 3] = o
                }
                for (var r = 0; r < 18; r++) {
                    var o = !t && (e >> r & 1) == 1;
                    this.modules[r % 3 + this.moduleCount - 8 - 3][Math.floor(r / 3)] = o
                }
            }, l.setupTypeInfo = function(t, e) {
                for (var r = this.errorCorrectLevel << 3 | e, o = i.getBCHTypeInfo(r), n = 0; n < 15; n++) {
                    var a = !t && (o >> n & 1) == 1;
                    n < 6 ? this.modules[n][8] = a : n < 8 ? this.modules[n + 1][8] = a : this.modules[this.moduleCount - 15 + n][8] = a
                }
                for (var n = 0; n < 15; n++) {
                    var a = !t && (o >> n & 1) == 1;
                    n < 8 ? this.modules[8][this.moduleCount - n - 1] = a : n < 9 ? this.modules[8][15 - n - 1 + 1] = a : this.modules[8][15 - n - 1] = a
                }
                this.modules[this.moduleCount - 8][8] = !t
            }, l.mapData = function(t, e) {
                for (var r = -1, o = this.moduleCount - 1, n = 7, a = 0, s = this.moduleCount - 1; s > 0; s -= 2)
                    for (6 == s && s--;;) {
                        for (var u = 0; u < 2; u++)
                            if (null == this.modules[o][s - u]) {
                                var l = !1;
                                a < t.length && (l = (t[a] >>> n & 1) == 1), i.getMask(e, o, s - u) && (l = !l), this.modules[o][s - u] = l, -1 == --n && (a++, n = 7)
                            }
                        if ((o += r) < 0 || this.moduleCount <= o) {
                            o -= r, r = -r;
                            break
                        }
                    }
            }, u.PAD0 = 236, u.PAD1 = 17, u.createData = function(t, e, r) {
                for (var o = n.getRSBlocks(t, e), s = new a, l = 0; l < r.length; l++) {
                    var f = r[l];
                    s.put(f.mode, 4), s.put(f.getLength(), i.getLengthInBits(f.mode, t)), f.write(s)
                }
                for (var h = 0, l = 0; l < o.length; l++) h += o[l].dataCount;
                if (s.getLengthInBits() > 8 * h) throw Error("code length overflow. (" + s.getLengthInBits() + ">" + 8 * h + ")");
                for (s.getLengthInBits() + 4 <= 8 * h && s.put(0, 4); s.getLengthInBits() % 8 != 0;) s.putBit(!1);
                for (; !(s.getLengthInBits() >= 8 * h) && (s.put(u.PAD0, 8), !(s.getLengthInBits() >= 8 * h));) s.put(u.PAD1, 8);
                return u.createBytes(s, o)
            }, u.createBytes = function(t, e) {
                for (var r = 0, o = 0, n = 0, a = Array(e.length), u = Array(e.length), l = 0; l < e.length; l++) {
                    var f = e[l].dataCount,
                        h = e[l].totalCount - f;
                    o = Math.max(o, f), n = Math.max(n, h), a[l] = Array(f);
                    for (var c = 0; c < a[l].length; c++) a[l][c] = 255 & t.buffer[c + r];
                    r += f;
                    var g = i.getErrorCorrectPolynomial(h),
                        d = new s(a[l], g.getLength() - 1).mod(g);
                    u[l] = Array(g.getLength() - 1);
                    for (var c = 0; c < u[l].length; c++) {
                        var p = c + d.getLength() - u[l].length;
                        u[l][c] = p >= 0 ? d.get(p) : 0
                    }
                }
                for (var m = 0, c = 0; c < e.length; c++) m += e[c].totalCount;
                for (var v = Array(m), C = 0, c = 0; c < o; c++)
                    for (var l = 0; l < e.length; l++) c < a[l].length && (v[C++] = a[l][c]);
                for (var c = 0; c < n; c++)
                    for (var l = 0; l < e.length; l++) c < u[l].length && (v[C++] = u[l][c]);
                return v
            }, t.exports = u
        },
        47967: function(t, e, r) {
            var o = r(75473);

            function n(t, e) {
                this.totalCount = t, this.dataCount = e
            }
            n.RS_BLOCK_TABLE = [
                [1, 26, 19],
                [1, 26, 16],
                [1, 26, 13],
                [1, 26, 9],
                [1, 44, 34],
                [1, 44, 28],
                [1, 44, 22],
                [1, 44, 16],
                [1, 70, 55],
                [1, 70, 44],
                [2, 35, 17],
                [2, 35, 13],
                [1, 100, 80],
                [2, 50, 32],
                [2, 50, 24],
                [4, 25, 9],
                [1, 134, 108],
                [2, 67, 43],
                [2, 33, 15, 2, 34, 16],
                [2, 33, 11, 2, 34, 12],
                [2, 86, 68],
                [4, 43, 27],
                [4, 43, 19],
                [4, 43, 15],
                [2, 98, 78],
                [4, 49, 31],
                [2, 32, 14, 4, 33, 15],
                [4, 39, 13, 1, 40, 14],
                [2, 121, 97],
                [2, 60, 38, 2, 61, 39],
                [4, 40, 18, 2, 41, 19],
                [4, 40, 14, 2, 41, 15],
                [2, 146, 116],
                [3, 58, 36, 2, 59, 37],
                [4, 36, 16, 4, 37, 17],
                [4, 36, 12, 4, 37, 13],
                [2, 86, 68, 2, 87, 69],
                [4, 69, 43, 1, 70, 44],
                [6, 43, 19, 2, 44, 20],
                [6, 43, 15, 2, 44, 16],
                [4, 101, 81],
                [1, 80, 50, 4, 81, 51],
                [4, 50, 22, 4, 51, 23],
                [3, 36, 12, 8, 37, 13],
                [2, 116, 92, 2, 117, 93],
                [6, 58, 36, 2, 59, 37],
                [4, 46, 20, 6, 47, 21],
                [7, 42, 14, 4, 43, 15],
                [4, 133, 107],
                [8, 59, 37, 1, 60, 38],
                [8, 44, 20, 4, 45, 21],
                [12, 33, 11, 4, 34, 12],
                [3, 145, 115, 1, 146, 116],
                [4, 64, 40, 5, 65, 41],
                [11, 36, 16, 5, 37, 17],
                [11, 36, 12, 5, 37, 13],
                [5, 109, 87, 1, 110, 88],
                [5, 65, 41, 5, 66, 42],
                [5, 54, 24, 7, 55, 25],
                [11, 36, 12],
                [5, 122, 98, 1, 123, 99],
                [7, 73, 45, 3, 74, 46],
                [15, 43, 19, 2, 44, 20],
                [3, 45, 15, 13, 46, 16],
                [1, 135, 107, 5, 136, 108],
                [10, 74, 46, 1, 75, 47],
                [1, 50, 22, 15, 51, 23],
                [2, 42, 14, 17, 43, 15],
                [5, 150, 120, 1, 151, 121],
                [9, 69, 43, 4, 70, 44],
                [17, 50, 22, 1, 51, 23],
                [2, 42, 14, 19, 43, 15],
                [3, 141, 113, 4, 142, 114],
                [3, 70, 44, 11, 71, 45],
                [17, 47, 21, 4, 48, 22],
                [9, 39, 13, 16, 40, 14],
                [3, 135, 107, 5, 136, 108],
                [3, 67, 41, 13, 68, 42],
                [15, 54, 24, 5, 55, 25],
                [15, 43, 15, 10, 44, 16],
                [4, 144, 116, 4, 145, 117],
                [17, 68, 42],
                [17, 50, 22, 6, 51, 23],
                [19, 46, 16, 6, 47, 17],
                [2, 139, 111, 7, 140, 112],
                [17, 74, 46],
                [7, 54, 24, 16, 55, 25],
                [34, 37, 13],
                [4, 151, 121, 5, 152, 122],
                [4, 75, 47, 14, 76, 48],
                [11, 54, 24, 14, 55, 25],
                [16, 45, 15, 14, 46, 16],
                [6, 147, 117, 4, 148, 118],
                [6, 73, 45, 14, 74, 46],
                [11, 54, 24, 16, 55, 25],
                [30, 46, 16, 2, 47, 17],
                [8, 132, 106, 4, 133, 107],
                [8, 75, 47, 13, 76, 48],
                [7, 54, 24, 22, 55, 25],
                [22, 45, 15, 13, 46, 16],
                [10, 142, 114, 2, 143, 115],
                [19, 74, 46, 4, 75, 47],
                [28, 50, 22, 6, 51, 23],
                [33, 46, 16, 4, 47, 17],
                [8, 152, 122, 4, 153, 123],
                [22, 73, 45, 3, 74, 46],
                [8, 53, 23, 26, 54, 24],
                [12, 45, 15, 28, 46, 16],
                [3, 147, 117, 10, 148, 118],
                [3, 73, 45, 23, 74, 46],
                [4, 54, 24, 31, 55, 25],
                [11, 45, 15, 31, 46, 16],
                [7, 146, 116, 7, 147, 117],
                [21, 73, 45, 7, 74, 46],
                [1, 53, 23, 37, 54, 24],
                [19, 45, 15, 26, 46, 16],
                [5, 145, 115, 10, 146, 116],
                [19, 75, 47, 10, 76, 48],
                [15, 54, 24, 25, 55, 25],
                [23, 45, 15, 25, 46, 16],
                [13, 145, 115, 3, 146, 116],
                [2, 74, 46, 29, 75, 47],
                [42, 54, 24, 1, 55, 25],
                [23, 45, 15, 28, 46, 16],
                [17, 145, 115],
                [10, 74, 46, 23, 75, 47],
                [10, 54, 24, 35, 55, 25],
                [19, 45, 15, 35, 46, 16],
                [17, 145, 115, 1, 146, 116],
                [14, 74, 46, 21, 75, 47],
                [29, 54, 24, 19, 55, 25],
                [11, 45, 15, 46, 46, 16],
                [13, 145, 115, 6, 146, 116],
                [14, 74, 46, 23, 75, 47],
                [44, 54, 24, 7, 55, 25],
                [59, 46, 16, 1, 47, 17],
                [12, 151, 121, 7, 152, 122],
                [12, 75, 47, 26, 76, 48],
                [39, 54, 24, 14, 55, 25],
                [22, 45, 15, 41, 46, 16],
                [6, 151, 121, 14, 152, 122],
                [6, 75, 47, 34, 76, 48],
                [46, 54, 24, 10, 55, 25],
                [2, 45, 15, 64, 46, 16],
                [17, 152, 122, 4, 153, 123],
                [29, 74, 46, 14, 75, 47],
                [49, 54, 24, 10, 55, 25],
                [24, 45, 15, 46, 46, 16],
                [4, 152, 122, 18, 153, 123],
                [13, 74, 46, 32, 75, 47],
                [48, 54, 24, 14, 55, 25],
                [42, 45, 15, 32, 46, 16],
                [20, 147, 117, 4, 148, 118],
                [40, 75, 47, 7, 76, 48],
                [43, 54, 24, 22, 55, 25],
                [10, 45, 15, 67, 46, 16],
                [19, 148, 118, 6, 149, 119],
                [18, 75, 47, 31, 76, 48],
                [34, 54, 24, 34, 55, 25],
                [20, 45, 15, 61, 46, 16]
            ], n.getRSBlocks = function(t, e) {
                var r = n.getRsBlockTable(t, e);
                if (void 0 == r) throw Error("bad rs block @ typeNumber:" + t + "/errorCorrectLevel:" + e);
                for (var o = r.length / 3, a = [], i = 0; i < o; i++)
                    for (var s = r[3 * i + 0], u = r[3 * i + 1], l = r[3 * i + 2], f = 0; f < s; f++) a.push(new n(u, l));
                return a
            }, n.getRsBlockTable = function(t, e) {
                switch (e) {
                    case o.L:
                        return n.RS_BLOCK_TABLE[(t - 1) * 4 + 0];
                    case o.M:
                        return n.RS_BLOCK_TABLE[(t - 1) * 4 + 1];
                    case o.Q:
                        return n.RS_BLOCK_TABLE[(t - 1) * 4 + 2];
                    case o.H:
                        return n.RS_BLOCK_TABLE[(t - 1) * 4 + 3];
                    default:
                        return
                }
            }, t.exports = n
        },
        70917: function(t) {
            for (var e = {
                    glog: function(t) {
                        if (t < 1) throw Error("glog(" + t + ")");
                        return e.LOG_TABLE[t]
                    },
                    gexp: function(t) {
                        for (; t < 0;) t += 255;
                        for (; t >= 256;) t -= 255;
                        return e.EXP_TABLE[t]
                    },
                    EXP_TABLE: Array(256),
                    LOG_TABLE: Array(256)
                }, r = 0; r < 8; r++) e.EXP_TABLE[r] = 1 << r;
            for (var r = 8; r < 256; r++) e.EXP_TABLE[r] = e.EXP_TABLE[r - 4] ^ e.EXP_TABLE[r - 5] ^ e.EXP_TABLE[r - 6] ^ e.EXP_TABLE[r - 8];
            for (var r = 0; r < 255; r++) e.LOG_TABLE[e.EXP_TABLE[r]] = r;
            t.exports = e
        },
        76374: function(t) {
            t.exports = {
                MODE_NUMBER: 1,
                MODE_ALPHA_NUM: 2,
                MODE_8BIT_BYTE: 4,
                MODE_KANJI: 8
            }
        },
        74868: function(t, e, r) {
            var o = r(76374),
                n = r(2659),
                a = r(70917),
                i = {
                    PATTERN000: 0,
                    PATTERN001: 1,
                    PATTERN010: 2,
                    PATTERN011: 3,
                    PATTERN100: 4,
                    PATTERN101: 5,
                    PATTERN110: 6,
                    PATTERN111: 7
                },
                s = {
                    PATTERN_POSITION_TABLE: [
                        [],
                        [6, 18],
                        [6, 22],
                        [6, 26],
                        [6, 30],
                        [6, 34],
                        [6, 22, 38],
                        [6, 24, 42],
                        [6, 26, 46],
                        [6, 28, 50],
                        [6, 30, 54],
                        [6, 32, 58],
                        [6, 34, 62],
                        [6, 26, 46, 66],
                        [6, 26, 48, 70],
                        [6, 26, 50, 74],
                        [6, 30, 54, 78],
                        [6, 30, 56, 82],
                        [6, 30, 58, 86],
                        [6, 34, 62, 90],
                        [6, 28, 50, 72, 94],
                        [6, 26, 50, 74, 98],
                        [6, 30, 54, 78, 102],
                        [6, 28, 54, 80, 106],
                        [6, 32, 58, 84, 110],
                        [6, 30, 58, 86, 114],
                        [6, 34, 62, 90, 118],
                        [6, 26, 50, 74, 98, 122],
                        [6, 30, 54, 78, 102, 126],
                        [6, 26, 52, 78, 104, 130],
                        [6, 30, 56, 82, 108, 134],
                        [6, 34, 60, 86, 112, 138],
                        [6, 30, 58, 86, 114, 142],
                        [6, 34, 62, 90, 118, 146],
                        [6, 30, 54, 78, 102, 126, 150],
                        [6, 24, 50, 76, 102, 128, 154],
                        [6, 28, 54, 80, 106, 132, 158],
                        [6, 32, 58, 84, 110, 136, 162],
                        [6, 26, 54, 82, 110, 138, 166],
                        [6, 30, 58, 86, 114, 142, 170]
                    ],
                    G15: 1335,
                    G18: 7973,
                    G15_MASK: 21522,
                    getBCHTypeInfo: function(t) {
                        for (var e = t << 10; s.getBCHDigit(e) - s.getBCHDigit(s.G15) >= 0;) e ^= s.G15 << s.getBCHDigit(e) - s.getBCHDigit(s.G15);
                        return (t << 10 | e) ^ s.G15_MASK
                    },
                    getBCHTypeNumber: function(t) {
                        for (var e = t << 12; s.getBCHDigit(e) - s.getBCHDigit(s.G18) >= 0;) e ^= s.G18 << s.getBCHDigit(e) - s.getBCHDigit(s.G18);
                        return t << 12 | e
                    },
                    getBCHDigit: function(t) {
                        for (var e = 0; 0 != t;) e++, t >>>= 1;
                        return e
                    },
                    getPatternPosition: function(t) {
                        return s.PATTERN_POSITION_TABLE[t - 1]
                    },
                    getMask: function(t, e, r) {
                        switch (t) {
                            case i.PATTERN000:
                                return (e + r) % 2 == 0;
                            case i.PATTERN001:
                                return e % 2 == 0;
                            case i.PATTERN010:
                                return r % 3 == 0;
                            case i.PATTERN011:
                                return (e + r) % 3 == 0;
                            case i.PATTERN100:
                                return (Math.floor(e / 2) + Math.floor(r / 3)) % 2 == 0;
                            case i.PATTERN101:
                                return e * r % 2 + e * r % 3 == 0;
                            case i.PATTERN110:
                                return (e * r % 2 + e * r % 3) % 2 == 0;
                            case i.PATTERN111:
                                return (e * r % 3 + (e + r) % 2) % 2 == 0;
                            default:
                                throw Error("bad maskPattern:" + t)
                        }
                    },
                    getErrorCorrectPolynomial: function(t) {
                        for (var e = new n([1], 0), r = 0; r < t; r++) e = e.multiply(new n([1, a.gexp(r)], 0));
                        return e
                    },
                    getLengthInBits: function(t, e) {
                        if (1 <= e && e < 10) switch (t) {
                            case o.MODE_NUMBER:
                                return 10;
                            case o.MODE_ALPHA_NUM:
                                return 9;
                            case o.MODE_8BIT_BYTE:
                            case o.MODE_KANJI:
                                return 8;
                            default:
                                throw Error("mode:" + t)
                        } else if (e < 27) switch (t) {
                            case o.MODE_NUMBER:
                                return 12;
                            case o.MODE_ALPHA_NUM:
                                return 11;
                            case o.MODE_8BIT_BYTE:
                                return 16;
                            case o.MODE_KANJI:
                                return 10;
                            default:
                                throw Error("mode:" + t)
                        } else if (e < 41) switch (t) {
                            case o.MODE_NUMBER:
                                return 14;
                            case o.MODE_ALPHA_NUM:
                                return 13;
                            case o.MODE_8BIT_BYTE:
                                return 16;
                            case o.MODE_KANJI:
                                return 12;
                            default:
                                throw Error("mode:" + t)
                        } else throw Error("type:" + e)
                    },
                    getLostPoint: function(t) {
                        for (var e = t.getModuleCount(), r = 0, o = 0; o < e; o++)
                            for (var n = 0; n < e; n++) {
                                for (var a = 0, i = t.isDark(o, n), s = -1; s <= 1; s++)
                                    if (!(o + s < 0) && !(e <= o + s))
                                        for (var u = -1; u <= 1; u++) !(n + u < 0) && !(e <= n + u) && (0 != s || 0 != u) && i == t.isDark(o + s, n + u) && a++;
                                a > 5 && (r += 3 + a - 5)
                            }
                        for (var o = 0; o < e - 1; o++)
                            for (var n = 0; n < e - 1; n++) {
                                var l = 0;
                                t.isDark(o, n) && l++, t.isDark(o + 1, n) && l++, t.isDark(o, n + 1) && l++, t.isDark(o + 1, n + 1) && l++, (0 == l || 4 == l) && (r += 3)
                            }
                        for (var o = 0; o < e; o++)
                            for (var n = 0; n < e - 6; n++) t.isDark(o, n) && !t.isDark(o, n + 1) && t.isDark(o, n + 2) && t.isDark(o, n + 3) && t.isDark(o, n + 4) && !t.isDark(o, n + 5) && t.isDark(o, n + 6) && (r += 40);
                        for (var n = 0; n < e; n++)
                            for (var o = 0; o < e - 6; o++) t.isDark(o, n) && !t.isDark(o + 1, n) && t.isDark(o + 2, n) && t.isDark(o + 3, n) && t.isDark(o + 4, n) && !t.isDark(o + 5, n) && t.isDark(o + 6, n) && (r += 40);
                        for (var f = 0, n = 0; n < e; n++)
                            for (var o = 0; o < e; o++) t.isDark(o, n) && f++;
                        return r + 10 * (Math.abs(100 * f / e / e - 50) / 5)
                    }
                };
            t.exports = s
        },
        15221: function(t, e, r) {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var o = Object.assign || function(t) {
                    for (var e = 1; e < arguments.length; e++) {
                        var r = arguments[e];
                        for (var o in r) Object.prototype.hasOwnProperty.call(r, o) && (t[o] = r[o])
                    }
                    return t
                },
                n = s(r(79497)),
                a = r(86006),
                i = s(a);

            function s(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }
            var u = {
                    bgColor: n.default.oneOfType([n.default.object, n.default.string]).isRequired,
                    bgD: n.default.string.isRequired,
                    fgColor: n.default.oneOfType([n.default.object, n.default.string]).isRequired,
                    fgD: n.default.string.isRequired,
                    size: n.default.number.isRequired,
                    title: n.default.string,
                    viewBoxSize: n.default.number.isRequired,
                    xmlns: n.default.string
                },
                l = (0, a.forwardRef)(function(t, e) {
                    var r = t.bgColor,
                        n = t.bgD,
                        a = t.fgD,
                        s = t.fgColor,
                        u = t.size,
                        l = t.title,
                        f = t.viewBoxSize,
                        h = function(t, e) {
                            var r = {};
                            for (var o in t) !(e.indexOf(o) >= 0) && Object.prototype.hasOwnProperty.call(t, o) && (r[o] = t[o]);
                            return r
                        }(t, ["bgColor", "bgD", "fgD", "fgColor", "size", "title", "viewBoxSize"]);
                    return i.default.createElement("svg", o({}, h, {
                        height: u,
                        ref: e,
                        viewBox: "0 0 " + f + " " + f,
                        width: u
                    }), l ? i.default.createElement("title", null, l) : null, i.default.createElement("path", {
                        d: n,
                        fill: r
                    }), i.default.createElement("path", {
                        d: a,
                        fill: s
                    }))
                });
            l.displayName = "QRCodeSvg", l.propTypes = u, l.defaultProps = {
                title: void 0,
                xmlns: "http://www.w3.org/2000/svg"
            }, e.default = l
        },
        8943: function(t, e, r) {
            "use strict";
            var o = Object.assign || function(t) {
                    for (var e = 1; e < arguments.length; e++) {
                        var r = arguments[e];
                        for (var o in r) Object.prototype.hasOwnProperty.call(r, o) && (t[o] = r[o])
                    }
                    return t
                },
                n = f(r(1710)),
                a = f(r(75473)),
                i = f(r(79497)),
                s = r(86006),
                u = f(s),
                l = f(r(15221));

            function f(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }
            var h = {
                    bgColor: i.default.oneOfType([i.default.object, i.default.string]),
                    fgColor: i.default.oneOfType([i.default.object, i.default.string]),
                    level: i.default.string,
                    size: i.default.number,
                    value: i.default.string.isRequired
                },
                c = (0, s.forwardRef)(function(t, e) {
                    var r = t.bgColor,
                        i = t.fgColor,
                        s = t.level,
                        f = t.size,
                        h = t.value,
                        c = function(t, e) {
                            var r = {};
                            for (var o in t) !(e.indexOf(o) >= 0) && Object.prototype.hasOwnProperty.call(t, o) && (r[o] = t[o]);
                            return r
                        }(t, ["bgColor", "fgColor", "level", "size", "value"]),
                        g = new n.default(-1, a.default[s]);
                    g.addData(h), g.make();
                    var d = g.modules;
                    return u.default.createElement(l.default, o({}, c, {
                        bgColor: r,
                        bgD: d.map(function(t, e) {
                            return t.map(function(t, r) {
                                return t ? "" : "M " + r + " " + e + " l 1 0 0 1 -1 0 Z"
                            }).join(" ")
                        }).join(" "),
                        fgColor: i,
                        fgD: d.map(function(t, e) {
                            return t.map(function(t, r) {
                                return t ? "M " + r + " " + e + " l 1 0 0 1 -1 0 Z" : ""
                            }).join(" ")
                        }).join(" "),
                        ref: e,
                        size: f,
                        viewBoxSize: d.length
                    }))
                });
            c.displayName = "QRCode", c.propTypes = h, c.defaultProps = {
                bgColor: "#FFFFFF",
                fgColor: "#000000",
                level: "L",
                size: 256
            }, e.Z = c
        },
        49494: function(t) {
            t.exports = function() {
                var t = document.getSelection();
                if (!t.rangeCount) return function() {};
                for (var e = document.activeElement, r = [], o = 0; o < t.rangeCount; o++) r.push(t.getRangeAt(o));
                switch (e.tagName.toUpperCase()) {
                    case "INPUT":
                    case "TEXTAREA":
                        e.blur();
                        break;
                    default:
                        e = null
                }
                return t.removeAllRanges(),
                    function() {
                        "Caret" === t.type && t.removeAllRanges(), t.rangeCount || r.forEach(function(e) {
                            t.addRange(e)
                        }), e && e.focus()
                    }
            }
        }
    }
]);