(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [3038], {
        58262: function(e, t) {
            "use strict";

            function r(e) {
                if (!Number.isSafeInteger(e) || e < 0) throw Error(`Wrong positive integer: ${e}`)
            }

            function n(e) {
                if ("boolean" != typeof e) throw Error(`Expected boolean, not ${e}`)
            }

            function i(e, ...t) {
                if (!(e instanceof Uint8Array)) throw TypeError("Expected Uint8Array");
                if (t.length > 0 && !t.includes(e.length)) throw TypeError(`Expected Uint8Array of length ${t}, not of length=${e.length}`)
            }

            function o(e) {
                if ("function" != typeof e || "function" != typeof e.create) throw Error("Hash should be wrapped by utils.wrapConstructor");
                r(e.outputLen), r(e.blockLen)
            }

            function s(e, t = !0) {
                if (e.destroyed) throw Error("Hash instance has been destroyed");
                if (t && e.finished) throw Error("Hash#digest() has already been called")
            }

            function a(e, t) {
                i(e);
                let r = t.outputLen;
                if (e.length < r) throw Error(`digestInto() expects output buffer of length at least ${r}`)
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.output = t.exists = t.hash = t.bytes = t.bool = t.number = void 0, t.number = r, t.bool = n, t.bytes = i, t.hash = o, t.exists = s, t.output = a, t.default = {
                number: r,
                bool: n,
                bytes: i,
                hash: o,
                exists: s,
                output: a
            }
        },
        23277: function(e, t, r) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.SHA2 = void 0;
            let n = r(58262),
                i = r(55836);
            class o extends i.Hash {
                constructor(e, t, r, n) {
                    super(), this.blockLen = e, this.outputLen = t, this.padOffset = r, this.isLE = n, this.finished = !1, this.length = 0, this.pos = 0, this.destroyed = !1, this.buffer = new Uint8Array(e), this.view = (0, i.createView)(this.buffer)
                }
                update(e) {
                    n.default.exists(this);
                    let {
                        view: t,
                        buffer: r,
                        blockLen: o
                    } = this;
                    e = (0, i.toBytes)(e);
                    let s = e.length;
                    for (let n = 0; n < s;) {
                        let a = Math.min(o - this.pos, s - n);
                        if (a === o) {
                            let t = (0, i.createView)(e);
                            for (; o <= s - n; n += o) this.process(t, n);
                            continue
                        }
                        r.set(e.subarray(n, n + a), this.pos), this.pos += a, n += a, this.pos === o && (this.process(t, 0), this.pos = 0)
                    }
                    return this.length += e.length, this.roundClean(), this
                }
                digestInto(e) {
                    n.default.exists(this), n.default.output(e, this), this.finished = !0;
                    let {
                        buffer: t,
                        view: r,
                        blockLen: o,
                        isLE: s
                    } = this, {
                        pos: a
                    } = this;
                    t[a++] = 128, this.buffer.subarray(a).fill(0), this.padOffset > o - a && (this.process(r, 0), a = 0);
                    for (let e = a; e < o; e++) t[e] = 0;
                    ! function(e, t, r, n) {
                        if ("function" == typeof e.setBigUint64) return e.setBigUint64(t, r, n);
                        let i = BigInt(32),
                            o = BigInt(4294967295),
                            s = Number(r >> i & o),
                            a = Number(r & o),
                            u = n ? 4 : 0,
                            l = n ? 0 : 4;
                        e.setUint32(t + u, s, n), e.setUint32(t + l, a, n)
                    }(r, o - 8, BigInt(8 * this.length), s), this.process(r, 0);
                    let u = (0, i.createView)(e),
                        l = this.outputLen;
                    if (l % 4) throw Error("_sha2: outputLen should be aligned to 32bit");
                    let f = l / 4,
                        c = this.get();
                    if (f > c.length) throw Error("_sha2: outputLen bigger than state");
                    for (let e = 0; e < f; e++) u.setUint32(4 * e, c[e], s)
                }
                digest() {
                    let {
                        buffer: e,
                        outputLen: t
                    } = this;
                    this.digestInto(e);
                    let r = e.slice(0, t);
                    return this.destroy(), r
                }
                _cloneInto(e) {
                    e || (e = new this.constructor), e.set(...this.get());
                    let {
                        blockLen: t,
                        buffer: r,
                        length: n,
                        finished: i,
                        destroyed: o,
                        pos: s
                    } = this;
                    return e.length = n, e.pos = s, e.finished = i, e.destroyed = o, n % t && e.buffer.set(r), e
                }
            }
            t.SHA2 = o
        },
        2344: function(e, t) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.crypto = void 0, t.crypto = "object" == typeof globalThis && "crypto" in globalThis ? globalThis.crypto : void 0
        },
        89565: function(e, t, r) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.hmac = void 0;
            let n = r(58262),
                i = r(55836);
            class o extends i.Hash {
                constructor(e, t) {
                    super(), this.finished = !1, this.destroyed = !1, n.default.hash(e);
                    let r = (0, i.toBytes)(t);
                    if (this.iHash = e.create(), "function" != typeof this.iHash.update) throw TypeError("Expected instance of class which extends utils.Hash");
                    this.blockLen = this.iHash.blockLen, this.outputLen = this.iHash.outputLen;
                    let o = this.blockLen,
                        s = new Uint8Array(o);
                    s.set(r.length > o ? e.create().update(r).digest() : r);
                    for (let e = 0; e < s.length; e++) s[e] ^= 54;
                    this.iHash.update(s), this.oHash = e.create();
                    for (let e = 0; e < s.length; e++) s[e] ^= 106;
                    this.oHash.update(s), s.fill(0)
                }
                update(e) {
                    return n.default.exists(this), this.iHash.update(e), this
                }
                digestInto(e) {
                    n.default.exists(this), n.default.bytes(e, this.outputLen), this.finished = !0, this.iHash.digestInto(e), this.oHash.update(e), this.oHash.digestInto(e), this.destroy()
                }
                digest() {
                    let e = new Uint8Array(this.oHash.outputLen);
                    return this.digestInto(e), e
                }
                _cloneInto(e) {
                    e || (e = Object.create(Object.getPrototypeOf(this), {}));
                    let {
                        oHash: t,
                        iHash: r,
                        finished: n,
                        destroyed: i,
                        blockLen: o,
                        outputLen: s
                    } = this;
                    return e.finished = n, e.destroyed = i, e.blockLen = o, e.outputLen = s, e.oHash = t._cloneInto(e.oHash), e.iHash = r._cloneInto(e.iHash), e
                }
                destroy() {
                    this.destroyed = !0, this.oHash.destroy(), this.iHash.destroy()
                }
            }
            t.hmac = (e, t, r) => new o(e, t).update(r).digest(), t.hmac.create = (e, t) => new o(e, t)
        },
        4378: function(e, t, r) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.sha224 = t.sha256 = void 0;
            let n = r(23277),
                i = r(55836),
                o = (e, t, r) => e & t ^ ~e & r,
                s = (e, t, r) => e & t ^ e & r ^ t & r,
                a = new Uint32Array([1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298]),
                u = new Uint32Array([1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225]),
                l = new Uint32Array(64);
            class f extends n.SHA2 {
                constructor() {
                    super(64, 32, 8, !1), this.A = 0 | u[0], this.B = 0 | u[1], this.C = 0 | u[2], this.D = 0 | u[3], this.E = 0 | u[4], this.F = 0 | u[5], this.G = 0 | u[6], this.H = 0 | u[7]
                }
                get() {
                    let {
                        A: e,
                        B: t,
                        C: r,
                        D: n,
                        E: i,
                        F: o,
                        G: s,
                        H: a
                    } = this;
                    return [e, t, r, n, i, o, s, a]
                }
                set(e, t, r, n, i, o, s, a) {
                    this.A = 0 | e, this.B = 0 | t, this.C = 0 | r, this.D = 0 | n, this.E = 0 | i, this.F = 0 | o, this.G = 0 | s, this.H = 0 | a
                }
                process(e, t) {
                    for (let r = 0; r < 16; r++, t += 4) l[r] = e.getUint32(t, !1);
                    for (let e = 16; e < 64; e++) {
                        let t = l[e - 15],
                            r = l[e - 2],
                            n = (0, i.rotr)(t, 7) ^ (0, i.rotr)(t, 18) ^ t >>> 3,
                            o = (0, i.rotr)(r, 17) ^ (0, i.rotr)(r, 19) ^ r >>> 10;
                        l[e] = o + l[e - 7] + n + l[e - 16] | 0
                    }
                    let {
                        A: r,
                        B: n,
                        C: u,
                        D: f,
                        E: c,
                        F: h,
                        G: p,
                        H: d
                    } = this;
                    for (let e = 0; e < 64; e++) {
                        let t = (0, i.rotr)(c, 6) ^ (0, i.rotr)(c, 11) ^ (0, i.rotr)(c, 25),
                            y = d + t + o(c, h, p) + a[e] + l[e] | 0,
                            g = (0, i.rotr)(r, 2) ^ (0, i.rotr)(r, 13) ^ (0, i.rotr)(r, 22),
                            b = g + s(r, n, u) | 0;
                        d = p, p = h, h = c, c = f + y | 0, f = u, u = n, n = r, r = y + b | 0
                    }
                    r = r + this.A | 0, n = n + this.B | 0, u = u + this.C | 0, f = f + this.D | 0, c = c + this.E | 0, h = h + this.F | 0, p = p + this.G | 0, d = d + this.H | 0, this.set(r, n, u, f, c, h, p, d)
                }
                roundClean() {
                    l.fill(0)
                }
                destroy() {
                    this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0)
                }
            }
            class c extends f {
                constructor() {
                    super(), this.A = -1056596264, this.B = 914150663, this.C = 812702999, this.D = -150054599, this.E = -4191439, this.F = 1750603025, this.G = 1694076839, this.H = -1090891868, this.outputLen = 28
                }
            }
            t.sha256 = (0, i.wrapConstructor)(() => new f), t.sha224 = (0, i.wrapConstructor)(() => new c)
        },
        55836: function(e, t, r) {
            "use strict"; /*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.randomBytes = t.wrapConstructorWithOpts = t.wrapConstructor = t.checkOpts = t.Hash = t.concatBytes = t.toBytes = t.utf8ToBytes = t.asyncLoop = t.nextTick = t.hexToBytes = t.bytesToHex = t.isLE = t.rotr = t.createView = t.u32 = t.u8 = void 0;
            let n = r(2344);
            if (t.u8 = e => new Uint8Array(e.buffer, e.byteOffset, e.byteLength), t.u32 = e => new Uint32Array(e.buffer, e.byteOffset, Math.floor(e.byteLength / 4)), t.createView = e => new DataView(e.buffer, e.byteOffset, e.byteLength), t.rotr = (e, t) => e << 32 - t | e >>> t, t.isLE = 68 === new Uint8Array(new Uint32Array([287454020]).buffer)[0], !t.isLE) throw Error("Non little-endian hardware is not supported");
            let i = Array.from({
                length: 256
            }, (e, t) => t.toString(16).padStart(2, "0"));
            t.bytesToHex = function(e) {
                if (!(e instanceof Uint8Array)) throw Error("Uint8Array expected");
                let t = "";
                for (let r = 0; r < e.length; r++) t += i[e[r]];
                return t
            }, t.hexToBytes = function(e) {
                if ("string" != typeof e) throw TypeError("hexToBytes: expected string, got " + typeof e);
                if (e.length % 2) throw Error("hexToBytes: received invalid unpadded hex");
                let t = new Uint8Array(e.length / 2);
                for (let r = 0; r < t.length; r++) {
                    let n = 2 * r,
                        i = e.slice(n, n + 2),
                        o = Number.parseInt(i, 16);
                    if (Number.isNaN(o) || o < 0) throw Error("Invalid byte sequence");
                    t[r] = o
                }
                return t
            };
            let o = async () => {};
            async function s(e, r, n) {
                let i = Date.now();
                for (let o = 0; o < e; o++) {
                    n(o);
                    let e = Date.now() - i;
                    e >= 0 && e < r || (await (0, t.nextTick)(), i += e)
                }
            }

            function a(e) {
                if ("string" != typeof e) throw TypeError(`utf8ToBytes expected string, got ${typeof e}`);
                return new TextEncoder().encode(e)
            }

            function u(e) {
                if ("string" == typeof e && (e = a(e)), !(e instanceof Uint8Array)) throw TypeError(`Expected input type is Uint8Array (got ${typeof e})`);
                return e
            }
            t.nextTick = o, t.asyncLoop = s, t.utf8ToBytes = a, t.toBytes = u, t.concatBytes = function(...e) {
                if (!e.every(e => e instanceof Uint8Array)) throw Error("Uint8Array list expected");
                if (1 === e.length) return e[0];
                let t = e.reduce((e, t) => e + t.length, 0),
                    r = new Uint8Array(t);
                for (let t = 0, n = 0; t < e.length; t++) {
                    let i = e[t];
                    r.set(i, n), n += i.length
                }
                return r
            }, t.Hash = class {
                clone() {
                    return this._cloneInto()
                }
            };
            let l = e => "[object Object]" === Object.prototype.toString.call(e) && e.constructor === Object;
            t.checkOpts = function(e, t) {
                if (void 0 !== t && ("object" != typeof t || !l(t))) throw TypeError("Options should be object or undefined");
                let r = Object.assign(e, t);
                return r
            }, t.wrapConstructor = function(e) {
                let t = t => e().update(u(t)).digest(),
                    r = e();
                return t.outputLen = r.outputLen, t.blockLen = r.blockLen, t.create = () => e(), t
            }, t.wrapConstructorWithOpts = function(e) {
                let t = (t, r) => e(r).update(u(t)).digest(),
                    r = e({});
                return t.outputLen = r.outputLen, t.blockLen = r.blockLen, t.create = t => e(t), t
            }, t.randomBytes = function(e = 32) {
                if (n.crypto && "function" == typeof n.crypto.getRandomValues) return n.crypto.getRandomValues(new Uint8Array(e));
                throw Error("crypto.getRandomValues must be defined")
            }
        },
        46454: function(e, t, r) {
            "use strict";
            let n, i; /*! noble-secp256k1 - MIT License (c) 2019 Paul Miller (paulmillr.com) */
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.utils = t.schnorr = t.verify = t.signSync = t.sign = t.getSharedSecret = t.recoverPublicKey = t.getPublicKey = t.Signature = t.Point = t.CURVE = void 0;
            let o = r(69159),
                s = BigInt(0),
                a = BigInt(1),
                u = BigInt(2),
                l = BigInt(3),
                f = BigInt(8),
                c = Object.freeze({
                    a: s,
                    b: BigInt(7),
                    P: BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f"),
                    n: BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"),
                    h: a,
                    Gx: BigInt("55066263022277343669578718895168534326250603453777594175500187360389116729240"),
                    Gy: BigInt("32670510020758816978083085130507043184471273380659243275938904335757337482424"),
                    beta: BigInt("0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee")
                });
            t.CURVE = c;
            let h = (e, t) => (e + t / u) / t,
                p = {
                    beta: BigInt("0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee"),
                    splitScalar(e) {
                        let {
                            n: t
                        } = c, r = BigInt("0x3086d221a7d46bcde86c90e49284eb15"), n = -a * BigInt("0xe4437ed6010e88286f547fa90abfe4c3"), i = BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8"), o = BigInt("0x100000000000000000000000000000000"), s = h(r * e, t), u = h(-n * e, t), l = H(e - s * r - u * i, t), f = H(-s * n - u * r, t), p = l > o, d = f > o;
                        if (p && (l = t - l), d && (f = t - f), l > o || f > o) throw Error("splitScalarEndo: Endomorphism failed, k=" + e);
                        return {
                            k1neg: p,
                            k1: l,
                            k2neg: d,
                            k2: f
                        }
                    }
                };

            function d(e) {
                let {
                    a: t,
                    b: r
                } = c, n = H(e * e), i = H(n * e);
                return H(i + t * e + r)
            }
            let y = c.a === s;
            class g extends Error {
                constructor(e) {
                    super(e)
                }
            }

            function b(e) {
                if (!(e instanceof m)) throw TypeError("JacobianPoint expected")
            }
            class m {
                constructor(e, t, r) {
                    this.x = e, this.y = t, this.z = r
                }
                static fromAffine(e) {
                    if (!(e instanceof S)) throw TypeError("JacobianPoint#fromAffine: expected Point");
                    return e.equals(S.ZERO) ? m.ZERO : new m(e.x, e.y, a)
                }
                static toAffineBatch(e) {
                    let t = function(e, t = c.P) {
                        let r = Array(e.length),
                            n = e.reduce((e, n, i) => n === s ? e : (r[i] = e, H(e * n, t)), a),
                            i = D(n, t);
                        return e.reduceRight((e, n, i) => n === s ? e : (r[i] = H(e * r[i], t), H(e * n, t)), i), r
                    }(e.map(e => e.z));
                    return e.map((e, r) => e.toAffine(t[r]))
                }
                static normalizeZ(e) {
                    return m.toAffineBatch(e).map(m.fromAffine)
                }
                equals(e) {
                    b(e);
                    let {
                        x: t,
                        y: r,
                        z: n
                    } = this, {
                        x: i,
                        y: o,
                        z: s
                    } = e, a = H(n * n), u = H(s * s), l = H(t * u), f = H(i * a), c = H(H(r * s) * u), h = H(H(o * n) * a);
                    return l === f && c === h
                }
                negate() {
                    return new m(this.x, H(-this.y), this.z)
                }
                double() {
                    let {
                        x: e,
                        y: t,
                        z: r
                    } = this, n = H(e * e), i = H(t * t), o = H(i * i), s = e + i, a = H(u * (H(s * s) - n - o)), c = H(l * n), h = H(c * c), p = H(h - u * a), d = H(c * (a - p) - f * o), y = H(u * t * r);
                    return new m(p, d, y)
                }
                add(e) {
                    b(e);
                    let {
                        x: t,
                        y: r,
                        z: n
                    } = this, {
                        x: i,
                        y: o,
                        z: a
                    } = e;
                    if (i === s || o === s) return this;
                    if (t === s || r === s) return e;
                    let l = H(n * n),
                        f = H(a * a),
                        c = H(t * f),
                        h = H(i * l),
                        p = H(H(r * a) * f),
                        d = H(H(o * n) * l),
                        y = H(h - c),
                        g = H(d - p);
                    if (y === s) return g === s ? this.double() : m.ZERO;
                    let w = H(y * y),
                        E = H(y * w),
                        S = H(c * w),
                        v = H(g * g - E - u * S),
                        _ = H(g * (S - v) - p * E),
                        T = H(n * a * y);
                    return new m(v, _, T)
                }
                subtract(e) {
                    return this.add(e.negate())
                }
                multiplyUnsafe(e) {
                    let t = m.ZERO;
                    if ("bigint" == typeof e && e === s) return t;
                    let r = L(e);
                    if (r === a) return this;
                    if (!y) {
                        let e = t,
                            n = this;
                        for (; r > s;) r & a && (e = e.add(n)), n = n.double(), r >>= a;
                        return e
                    }
                    let {
                        k1neg: n,
                        k1: i,
                        k2neg: o,
                        k2: u
                    } = p.splitScalar(r), l = t, f = t, c = this;
                    for (; i > s || u > s;) i & a && (l = l.add(c)), u & a && (f = f.add(c)), c = c.double(), i >>= a, u >>= a;
                    return n && (l = l.negate()), o && (f = f.negate()), f = new m(H(f.x * p.beta), f.y, f.z), l.add(f)
                }
                precomputeWindow(e) {
                    let t = y ? 128 / e + 1 : 256 / e + 1,
                        r = [],
                        n = this,
                        i = n;
                    for (let o = 0; o < t; o++) {
                        i = n, r.push(i);
                        for (let t = 1; t < 2 ** (e - 1); t++) i = i.add(n), r.push(i);
                        n = i.double()
                    }
                    return r
                }
                wNAF(e, t) {
                    !t && this.equals(m.BASE) && (t = S.BASE);
                    let r = t && t._WINDOW_SIZE || 1;
                    if (256 % r) throw Error("Point#wNAF: Invalid precomputation window, must be power of 2");
                    let n = t && E.get(t);
                    !n && (n = this.precomputeWindow(r), t && 1 !== r && (n = m.normalizeZ(n), E.set(t, n)));
                    let i = m.ZERO,
                        o = m.BASE,
                        s = 1 + (y ? 128 / r : 256 / r),
                        u = 2 ** (r - 1),
                        l = BigInt(2 ** r - 1),
                        f = 2 ** r,
                        c = BigInt(r);
                    for (let t = 0; t < s; t++) {
                        let r = t * u,
                            s = Number(e & l);
                        e >>= c, s > u && (s -= f, e += a);
                        let h = r + Math.abs(s) - 1,
                            p = t % 2 != 0,
                            d = s < 0;
                        0 === s ? o = o.add(w(p, n[r])) : i = i.add(w(d, n[h]))
                    }
                    return {
                        p: i,
                        f: o
                    }
                }
                multiply(e, t) {
                    let r, n, i = L(e);
                    if (y) {
                        let {
                            k1neg: e,
                            k1: o,
                            k2neg: s,
                            k2: a
                        } = p.splitScalar(i), {
                            p: u,
                            f: l
                        } = this.wNAF(o, t), {
                            p: f,
                            f: c
                        } = this.wNAF(a, t);
                        u = w(e, u), f = w(s, f), f = new m(H(f.x * p.beta), f.y, f.z), r = u.add(f), n = l.add(c)
                    } else {
                        let {
                            p: e,
                            f: o
                        } = this.wNAF(i, t);
                        r = e, n = o
                    }
                    return m.normalizeZ([r, n])[0]
                }
                toAffine(e) {
                    let {
                        x: t,
                        y: r,
                        z: n
                    } = this, i = this.equals(m.ZERO);
                    null == e && (e = i ? f : D(n));
                    let o = e,
                        s = H(o * o),
                        u = H(s * o),
                        l = H(t * s),
                        c = H(r * u),
                        h = H(n * o);
                    if (i) return S.ZERO;
                    if (h !== a) throw Error("invZ was invalid");
                    return new S(l, c)
                }
            }

            function w(e, t) {
                let r = t.negate();
                return e ? r : t
            }
            m.BASE = new m(c.Gx, c.Gy, a), m.ZERO = new m(s, a, s);
            let E = new WeakMap;
            class S {
                constructor(e, t) {
                    this.x = e, this.y = t
                }
                _setWindowSize(e) {
                    this._WINDOW_SIZE = e, E.delete(this)
                }
                hasEvenY() {
                    return this.y % u === s
                }
                static fromCompressedHex(e) {
                    let t = 32 === e.length,
                        r = U(t ? e : e.subarray(1));
                    if (!V(r)) throw Error("Point is not on curve");
                    let n = d(r),
                        i = function(e) {
                            let {
                                P: t
                            } = c, r = BigInt(6), n = BigInt(11), i = BigInt(22), o = BigInt(23), s = BigInt(44), a = BigInt(88), f = e * e * e % t, h = f * f * e % t, p = j(h, l) * h % t, d = j(p, l) * h % t, y = j(d, u) * f % t, g = j(y, n) * y % t, b = j(g, i) * g % t, m = j(b, s) * b % t, w = j(m, a) * m % t, E = j(w, s) * b % t, S = j(E, l) * h % t, v = j(S, o) * g % t, _ = j(v, r) * f % t, T = j(_, u);
                            if (T * T % t !== e) throw Error("Cannot find square root");
                            return T
                        }(n),
                        o = (i & a) === a;
                    if (t) o && (i = H(-i));
                    else {
                        let t = (1 & e[0]) == 1;
                        t !== o && (i = H(-i))
                    }
                    let s = new S(r, i);
                    return s.assertValidity(), s
                }
                static fromUncompressedHex(e) {
                    let t = U(e.subarray(1, 33)),
                        r = U(e.subarray(33, 65)),
                        n = new S(t, r);
                    return n.assertValidity(), n
                }
                static fromHex(e) {
                    let t = C(e),
                        r = t.length,
                        n = t[0];
                    if (32 === r || 33 === r && (2 === n || 3 === n)) return this.fromCompressedHex(t);
                    if (65 === r && 4 === n) return this.fromUncompressedHex(t);
                    throw Error(`Point.fromHex: received invalid point. Expected 32-33 compressed bytes or 65 uncompressed bytes, not ${r}`)
                }
                static fromPrivateKey(e) {
                    return S.BASE.multiply($(e))
                }
                static fromSignature(e, t, r) {
                    let {
                        r: n,
                        s: i
                    } = G(t);
                    if (![0, 1, 2, 3].includes(r)) throw Error("Cannot recover: invalid recovery bit");
                    let o = M(C(e)),
                        {
                            n: s
                        } = c,
                        a = 2 === r || 3 === r ? n + s : n,
                        u = D(a, s),
                        l = H(-o * u, s),
                        f = H(i * u, s),
                        h = 1 & r ? "03" : "02",
                        p = S.fromHex(h + k(a)),
                        d = S.BASE.multiplyAndAddUnsafe(p, l, f);
                    if (!d) throw Error("Cannot recover signature: point at infinify");
                    return d.assertValidity(), d
                }
                toRawBytes(e = !1) {
                    return N(this.toHex(e))
                }
                toHex(e = !1) {
                    let t = k(this.x);
                    if (!e) return `04${t}${k(this.y)}`; {
                        let e = this.hasEvenY() ? "02" : "03";
                        return `${e}${t}`
                    }
                }
                toHexX() {
                    return this.toHex(!0).slice(2)
                }
                toRawX() {
                    return this.toRawBytes(!0).slice(1)
                }
                assertValidity() {
                    let e = "Point is not on elliptic curve",
                        {
                            x: t,
                            y: r
                        } = this;
                    if (!V(t) || !V(r)) throw Error(e);
                    let n = H(r * r),
                        i = d(t);
                    if (H(n - i) !== s) throw Error(e)
                }
                equals(e) {
                    return this.x === e.x && this.y === e.y
                }
                negate() {
                    return new S(this.x, H(-this.y))
                }
                double() {
                    return m.fromAffine(this).double().toAffine()
                }
                add(e) {
                    return m.fromAffine(this).add(m.fromAffine(e)).toAffine()
                }
                subtract(e) {
                    return this.add(e.negate())
                }
                multiply(e) {
                    return m.fromAffine(this).multiply(e, this).toAffine()
                }
                multiplyAndAddUnsafe(e, t, r) {
                    let n = m.fromAffine(this),
                        i = t === s || t === a || this !== S.BASE ? n.multiplyUnsafe(t) : n.multiply(t),
                        o = m.fromAffine(e).multiplyUnsafe(r),
                        u = i.add(o);
                    return u.equals(m.ZERO) ? void 0 : u.toAffine()
                }
            }

            function v(e) {
                return Number.parseInt(e[0], 16) >= 8 ? "00" + e : e
            }

            function _(e) {
                if (e.length < 2 || 2 !== e[0]) throw Error(`Invalid signature integer tag: ${I(e)}`);
                let t = e[1],
                    r = e.subarray(2, t + 2);
                if (!t || r.length !== t) throw Error("Invalid signature integer: wrong length");
                if (0 === r[0] && r[1] <= 127) throw Error("Invalid signature integer: trailing length");
                return {
                    data: U(r),
                    left: e.subarray(t + 2)
                }
            }
            t.Point = S, S.BASE = new S(c.Gx, c.Gy), S.ZERO = new S(s, s);
            class T {
                constructor(e, t) {
                    this.r = e, this.s = t, this.assertValidity()
                }
                static fromCompact(e) {
                    let t = e instanceof Uint8Array,
                        r = "Signature.fromCompact";
                    if ("string" != typeof e && !t) throw TypeError(`${r}: Expected string or Uint8Array`);
                    let n = t ? I(e) : e;
                    if (128 !== n.length) throw Error(`${r}: Expected 64-byte hex`);
                    return new T(B(n.slice(0, 64)), B(n.slice(64, 128)))
                }
                static fromDER(e) {
                    let t = e instanceof Uint8Array;
                    if ("string" != typeof e && !t) throw TypeError("Signature.fromDER: Expected string or Uint8Array");
                    let {
                        r,
                        s: n
                    } = function(e) {
                        if (e.length < 2 || 48 != e[0]) throw Error(`Invalid signature tag: ${I(e)}`);
                        if (e[1] !== e.length - 2) throw Error("Invalid signature: incorrect length");
                        let {
                            data: t,
                            left: r
                        } = _(e.subarray(2)), {
                            data: n,
                            left: i
                        } = _(r);
                        if (i.length) throw Error(`Invalid signature: left bytes after parsing: ${I(i)}`);
                        return {
                            r: t,
                            s: n
                        }
                    }(t ? e : N(e));
                    return new T(r, n)
                }
                static fromHex(e) {
                    return this.fromDER(e)
                }
                assertValidity() {
                    let {
                        r: e,
                        s: t
                    } = this;
                    if (!W(e)) throw Error("Invalid Signature: r must be 0 < r < n");
                    if (!W(t)) throw Error("Invalid Signature: s must be 0 < s < n")
                }
                hasHighS() {
                    let e = c.n >> a;
                    return this.s > e
                }
                normalizeS() {
                    return this.hasHighS() ? new T(this.r, H(-this.s, c.n)) : this
                }
                toDERRawBytes() {
                    return N(this.toDERHex())
                }
                toDERHex() {
                    let e = v(R(this.s)),
                        t = v(R(this.r)),
                        r = e.length / 2,
                        n = t.length / 2,
                        i = R(r),
                        o = R(n),
                        s = R(n + r + 4);
                    return `30${s}02${o}${t}02${i}${e}`
                }
                toRawBytes() {
                    return this.toDERRawBytes()
                }
                toHex() {
                    return this.toDERHex()
                }
                toCompactRawBytes() {
                    return N(this.toCompactHex())
                }
                toCompactHex() {
                    return k(this.r) + k(this.s)
                }
            }

            function A(...e) {
                if (!e.every(e => e instanceof Uint8Array)) throw Error("Uint8Array list expected");
                if (1 === e.length) return e[0];
                let t = e.reduce((e, t) => e + t.length, 0),
                    r = new Uint8Array(t);
                for (let t = 0, n = 0; t < e.length; t++) {
                    let i = e[t];
                    r.set(i, n), n += i.length
                }
                return r
            }
            t.Signature = T;
            let O = Array.from({
                length: 256
            }, (e, t) => t.toString(16).padStart(2, "0"));

            function I(e) {
                if (!(e instanceof Uint8Array)) throw Error("Expected Uint8Array");
                let t = "";
                for (let r = 0; r < e.length; r++) t += O[e[r]];
                return t
            }
            let P = BigInt("0x10000000000000000000000000000000000000000000000000000000000000000");

            function k(e) {
                if ("bigint" != typeof e) throw Error("Expected bigint");
                if (!(s <= e && e < P)) throw Error("Expected number 0 <= n < 2^256");
                return e.toString(16).padStart(64, "0")
            }

            function x(e) {
                let t = N(k(e));
                if (32 !== t.length) throw Error("Error: expected 32 bytes");
                return t
            }

            function R(e) {
                let t = e.toString(16);
                return 1 & t.length ? `0${t}` : t
            }

            function B(e) {
                if ("string" != typeof e) throw TypeError("hexToNumber: expected string, got " + typeof e);
                return BigInt(`0x${e}`)
            }

            function N(e) {
                if ("string" != typeof e) throw TypeError("hexToBytes: expected string, got " + typeof e);
                if (e.length % 2) throw Error("hexToBytes: received invalid unpadded hex" + e.length);
                let t = new Uint8Array(e.length / 2);
                for (let r = 0; r < t.length; r++) {
                    let n = 2 * r,
                        i = e.slice(n, n + 2),
                        o = Number.parseInt(i, 16);
                    if (Number.isNaN(o) || o < 0) throw Error("Invalid byte sequence");
                    t[r] = o
                }
                return t
            }

            function U(e) {
                return B(I(e))
            }

            function C(e) {
                return e instanceof Uint8Array ? Uint8Array.from(e) : N(e)
            }

            function L(e) {
                if ("number" == typeof e && Number.isSafeInteger(e) && e > 0) return BigInt(e);
                if ("bigint" == typeof e && W(e)) return e;
                throw TypeError("Expected valid private scalar: 0 < scalar < curve.n")
            }

            function H(e, t = c.P) {
                let r = e % t;
                return r >= s ? r : t + r
            }

            function j(e, t) {
                let {
                    P: r
                } = c, n = e;
                for (; t-- > s;) n *= n, n %= r;
                return n
            }

            function D(e, t = c.P) {
                if (e === s || t <= s) throw Error(`invert: expected positive integers, got n=${e} mod=${t}`);
                let r = H(e, t),
                    n = t,
                    i = s,
                    o = a,
                    u = a,
                    l = s;
                for (; r !== s;) {
                    let e = n / r,
                        t = n % r,
                        s = i - u * e,
                        a = o - l * e;
                    n = r, r = t, i = u, o = l, u = s, l = a
                }
                let f = n;
                if (f !== a) throw Error("invert: does not exist");
                return H(i, t)
            }

            function M(e, t = !1) {
                let r = function(e) {
                    let t = 8 * e.length - 256,
                        r = U(e);
                    return t > 0 ? r >> BigInt(t) : r
                }(e);
                if (t) return r;
                let {
                    n
                } = c;
                return r >= n ? r - n : r
            }
            class F {
                constructor(e, t) {
                    if (this.hashLen = e, this.qByteLen = t, "number" != typeof e || e < 2) throw Error("hashLen must be a number");
                    if ("number" != typeof t || t < 2) throw Error("qByteLen must be a number");
                    this.v = new Uint8Array(e).fill(1), this.k = new Uint8Array(e).fill(0), this.counter = 0
                }
                hmac(...e) {
                    return t.utils.hmacSha256(this.k, ...e)
                }
                hmacSync(...e) {
                    return i(this.k, ...e)
                }
                checkSync() {
                    if ("function" != typeof i) throw new g("hmacSha256Sync needs to be set")
                }
                incr() {
                    if (this.counter >= 1e3) throw Error("Tried 1,000 k values for sign(), all were invalid");
                    this.counter += 1
                }
                async reseed(e = new Uint8Array) {
                    this.k = await this.hmac(this.v, Uint8Array.from([0]), e), this.v = await this.hmac(this.v), 0 !== e.length && (this.k = await this.hmac(this.v, Uint8Array.from([1]), e), this.v = await this.hmac(this.v))
                }
                reseedSync(e = new Uint8Array) {
                    this.checkSync(), this.k = this.hmacSync(this.v, Uint8Array.from([0]), e), this.v = this.hmacSync(this.v), 0 !== e.length && (this.k = this.hmacSync(this.v, Uint8Array.from([1]), e), this.v = this.hmacSync(this.v))
                }
                async generate() {
                    this.incr();
                    let e = 0,
                        t = [];
                    for (; e < this.qByteLen;) {
                        this.v = await this.hmac(this.v);
                        let r = this.v.slice();
                        t.push(r), e += this.v.length
                    }
                    return A(...t)
                }
                generateSync() {
                    this.checkSync(), this.incr();
                    let e = 0,
                        t = [];
                    for (; e < this.qByteLen;) {
                        this.v = this.hmacSync(this.v);
                        let r = this.v.slice();
                        t.push(r), e += this.v.length
                    }
                    return A(...t)
                }
            }

            function W(e) {
                return s < e && e < c.n
            }

            function V(e) {
                return s < e && e < c.P
            }

            function K(e, t, r, n = !0) {
                let {
                    n: i
                } = c, o = M(e, !0);
                if (!W(o)) return;
                let u = D(o, i),
                    l = S.BASE.multiply(o),
                    f = H(l.x, i);
                if (f === s) return;
                let h = H(u * H(t + r * f, i), i);
                if (h === s) return;
                let p = new T(f, h),
                    d = (l.x === p.r ? 0 : 2) | Number(l.y & a);
                return n && p.hasHighS() && (p = p.normalizeS(), d ^= 1), {
                    sig: p,
                    recovery: d
                }
            }

            function $(e) {
                let t;
                if ("bigint" == typeof e) t = e;
                else if ("number" == typeof e && Number.isSafeInteger(e) && e > 0) t = BigInt(e);
                else if ("string" == typeof e) {
                    if (64 !== e.length) throw Error("Expected 32 bytes of private key");
                    t = B(e)
                } else if (e instanceof Uint8Array) {
                    if (32 !== e.length) throw Error("Expected 32 bytes of private key");
                    t = U(e)
                } else throw TypeError("Expected valid private key");
                if (!W(t)) throw Error("Expected private key: 0 < key < n");
                return t
            }

            function q(e) {
                return e instanceof S ? (e.assertValidity(), e) : S.fromHex(e)
            }

            function G(e) {
                if (e instanceof T) return e.assertValidity(), e;
                try {
                    return T.fromDER(e)
                } catch (t) {
                    return T.fromCompact(e)
                }
            }

            function z(e) {
                let t = e instanceof Uint8Array,
                    r = "string" == typeof e,
                    n = (t || r) && e.length;
                return t ? 33 === n || 65 === n : r ? 66 === n || 130 === n : e instanceof S
            }

            function X(e) {
                let t = e.length > 32 ? e.slice(0, 32) : e;
                return U(t)
            }

            function Y(e, r, n) {
                if (null == e) throw Error(`sign: expected valid message hash, not "${e}"`);
                let i = C(e),
                    o = $(r),
                    a = [x(o), function(e) {
                        var t;
                        let r = X(e),
                            n = H(r, c.n);
                        return x(n < s ? r : n)
                    }(i)];
                if (null != n) {
                    !0 === n && (n = t.utils.randomBytes(32));
                    let e = C(n);
                    if (32 !== e.length) throw Error("sign: Expected 32 bytes of extra data");
                    a.push(e)
                }
                let u = A(...a),
                    l = X(i);
                return {
                    seed: u,
                    m: l,
                    d: o
                }
            }

            function J(e, t) {
                let {
                    sig: r,
                    recovery: n
                } = e, {
                    der: i,
                    recovered: o
                } = Object.assign({
                    canonical: !0,
                    der: !0
                }, t), s = i ? r.toDERRawBytes() : r.toCompactRawBytes();
                return o ? [s, n] : s
            }
            async function Z(e, t, r = {}) {
                let n;
                let {
                    seed: i,
                    m: o,
                    d: s
                } = Y(e, t, r.extraEntropy), a = new F(32, 32);
                for (await a.reseed(i); !(n = K(await a.generate(), o, s, r.canonical));) await a.reseed();
                return J(n, r)
            }
            t.getPublicKey = function(e, t = !1) {
                return S.fromPrivateKey(e).toRawBytes(t)
            }, t.recoverPublicKey = function(e, t, r, n = !1) {
                return S.fromSignature(e, t, r).toRawBytes(n)
            }, t.getSharedSecret = function(e, t, r = !1) {
                if (z(e)) throw TypeError("getSharedSecret: first arg must be private key");
                if (!z(t)) throw TypeError("getSharedSecret: second arg must be public key");
                let n = q(t);
                return n.assertValidity(), n.multiply($(e)).toRawBytes(r)
            }, t.sign = Z, t.signSync = function(e, t, r = {}) {
                let n;
                let {
                    seed: i,
                    m: o,
                    d: s
                } = Y(e, t, r.extraEntropy), a = new F(32, 32);
                for (a.reseedSync(i); !(n = K(a.generateSync(), o, s, r.canonical));) a.reseedSync();
                return J(n, r)
            };
            let Q = {
                strict: !0
            };

            function ee(e) {
                return H(U(e), c.n)
            }
            t.verify = function(e, t, r, n = Q) {
                let i, o;
                try {
                    i = G(e), t = C(t)
                } catch (e) {
                    return !1
                }
                let {
                    r: s,
                    s: a
                } = i;
                if (n.strict && i.hasHighS()) return !1;
                let u = M(t);
                try {
                    o = q(r)
                } catch (e) {
                    return !1
                }
                let {
                    n: l
                } = c, f = D(a, l), h = H(u * f, l), p = H(s * f, l), d = S.BASE.multiplyAndAddUnsafe(o, h, p);
                if (!d) return !1;
                let y = H(d.x, l);
                return y === s
            };
            class et {
                constructor(e, t) {
                    this.r = e, this.s = t, this.assertValidity()
                }
                static fromHex(e) {
                    let t = C(e);
                    if (64 !== t.length) throw TypeError(`SchnorrSignature.fromHex: expected 64 bytes, not ${t.length}`);
                    let r = U(t.subarray(0, 32)),
                        n = U(t.subarray(32, 64));
                    return new et(r, n)
                }
                assertValidity() {
                    let {
                        r: e,
                        s: t
                    } = this;
                    if (!V(e) || !W(t)) throw Error("Invalid signature")
                }
                toHex() {
                    return k(this.r) + k(this.s)
                }
                toRawBytes() {
                    return N(this.toHex())
                }
            }
            class er {
                constructor(e, r, n = t.utils.randomBytes()) {
                    if (null == e) throw TypeError(`sign: Expected valid message, not "${e}"`);
                    this.m = C(e);
                    let {
                        x: i,
                        scalar: o
                    } = this.getScalar($(r));
                    if (this.px = i, this.d = o, this.rand = C(n), 32 !== this.rand.length) throw TypeError("sign: Expected 32 bytes of aux randomness")
                }
                getScalar(e) {
                    let t = S.fromPrivateKey(e),
                        r = t.hasEvenY() ? e : c.n - e;
                    return {
                        point: t,
                        scalar: r,
                        x: t.toRawX()
                    }
                }
                initNonce(e, t) {
                    return x(e ^ U(t))
                }
                finalizeNonce(e) {
                    let t = H(U(e), c.n);
                    if (t === s) throw Error("sign: Creation of signature failed. k is zero");
                    let {
                        point: r,
                        x: n,
                        scalar: i
                    } = this.getScalar(t);
                    return {
                        R: r,
                        rx: n,
                        k: i
                    }
                }
                finalizeSig(e, t, r, n) {
                    return new et(e.x, H(t + r * n, c.n)).toRawBytes()
                }
                error() {
                    throw Error("sign: Invalid signature produced")
                }
                async calc() {
                    let {
                        m: e,
                        d: r,
                        px: n,
                        rand: i
                    } = this, o = t.utils.taggedHash, s = this.initNonce(r, await o(el.aux, i)), {
                        R: a,
                        rx: u,
                        k: l
                    } = this.finalizeNonce(await o(el.nonce, s, n, e)), f = ee(await o(el.challenge, u, n, e)), c = this.finalizeSig(a, l, f, r);
                    return await es(c, e, n) || this.error(), c
                }
                calcSync() {
                    let {
                        m: e,
                        d: r,
                        px: n,
                        rand: i
                    } = this, o = t.utils.taggedHashSync, s = this.initNonce(r, o(el.aux, i)), {
                        R: a,
                        rx: u,
                        k: l
                    } = this.finalizeNonce(o(el.nonce, s, n, e)), f = ee(o(el.challenge, u, n, e)), c = this.finalizeSig(a, l, f, r);
                    return ea(c, e, n) || this.error(), c
                }
            }
            async function en(e, t, r) {
                return new er(e, t, r).calc()
            }

            function ei(e, t, r) {
                let n = e instanceof et,
                    i = n ? e : et.fromHex(e);
                return n && i.assertValidity(), { ...i,
                    m: C(t),
                    P: q(r)
                }
            }

            function eo(e, t, r, n) {
                let i = S.BASE.multiplyAndAddUnsafe(t, $(r), H(-n, c.n));
                return !!(i && i.hasEvenY()) && i.x === e
            }
            async function es(e, r, n) {
                try {
                    let {
                        r: i,
                        s: o,
                        m: s,
                        P: a
                    } = ei(e, r, n), u = ee(await t.utils.taggedHash(el.challenge, x(i), a.toRawX(), s));
                    return eo(i, a, o, u)
                } catch (e) {
                    return !1
                }
            }

            function ea(e, r, n) {
                try {
                    let {
                        r: i,
                        s: o,
                        m: s,
                        P: a
                    } = ei(e, r, n), u = ee(t.utils.taggedHashSync(el.challenge, x(i), a.toRawX(), s));
                    return eo(i, a, o, u)
                } catch (e) {
                    if (e instanceof g) throw e;
                    return !1
                }
            }
            t.schnorr = {
                Signature: et,
                getPublicKey: function(e) {
                    return S.fromPrivateKey(e).toRawX()
                },
                sign: en,
                verify: es,
                signSync: function(e, t, r) {
                    return new er(e, t, r).calcSync()
                },
                verifySync: ea
            }, S.BASE._setWindowSize(8);
            let eu = {
                    node: o,
                    web: "object" == typeof self && "crypto" in self ? self.crypto : void 0
                },
                el = {
                    challenge: "BIP0340/challenge",
                    aux: "BIP0340/aux",
                    nonce: "BIP0340/nonce"
                },
                ef = {};
            t.utils = {
                bytesToHex: I,
                hexToBytes: N,
                concatBytes: A,
                mod: H,
                invert: D,
                isValidPrivateKey(e) {
                    try {
                        return $(e), !0
                    } catch (e) {
                        return !1
                    }
                },
                _bigintTo32Bytes: x,
                _normalizePrivateKey: $,
                hashToPrivateKey: e => {
                    if ((e = C(e)).length < 40 || e.length > 1024) throw Error("Expected valid bytes of private key as per FIPS 186");
                    let t = H(U(e), c.n - a) + a;
                    return x(t)
                },
                randomBytes: (e = 32) => {
                    if (eu.web) return eu.web.getRandomValues(new Uint8Array(e));
                    if (eu.node) {
                        let {
                            randomBytes: t
                        } = eu.node;
                        return Uint8Array.from(t(e))
                    }
                    throw Error("The environment doesn't have randomBytes function")
                },
                randomPrivateKey: () => t.utils.hashToPrivateKey(t.utils.randomBytes(40)),
                precompute(e = 8, t = S.BASE) {
                    let r = t === S.BASE ? t : new S(t.x, t.y);
                    return r._setWindowSize(e), r.multiply(l), r
                },
                sha256: async (...e) => {
                    if (eu.web) {
                        let t = await eu.web.subtle.digest("SHA-256", A(...e));
                        return new Uint8Array(t)
                    }
                    if (eu.node) {
                        let {
                            createHash: t
                        } = eu.node, r = t("sha256");
                        return e.forEach(e => r.update(e)), Uint8Array.from(r.digest())
                    }
                    throw Error("The environment doesn't have sha256 function")
                },
                hmacSha256: async (e, ...t) => {
                    if (eu.web) {
                        let r = await eu.web.subtle.importKey("raw", e, {
                                name: "HMAC",
                                hash: {
                                    name: "SHA-256"
                                }
                            }, !1, ["sign"]),
                            n = A(...t),
                            i = await eu.web.subtle.sign("HMAC", r, n);
                        return new Uint8Array(i)
                    }
                    if (eu.node) {
                        let {
                            createHmac: r
                        } = eu.node, n = r("sha256", e);
                        return t.forEach(e => n.update(e)), Uint8Array.from(n.digest())
                    }
                    throw Error("The environment doesn't have hmac-sha256 function")
                },
                sha256Sync: void 0,
                hmacSha256Sync: void 0,
                taggedHash: async (e, ...r) => {
                    let n = ef[e];
                    if (void 0 === n) {
                        let r = await t.utils.sha256(Uint8Array.from(e, e => e.charCodeAt(0)));
                        n = A(r, r), ef[e] = n
                    }
                    return t.utils.sha256(n, ...r)
                },
                taggedHashSync: (e, ...t) => {
                    if ("function" != typeof n) throw new g("sha256Sync is undefined, you need to set it");
                    let r = ef[e];
                    if (void 0 === r) {
                        let t = n(Uint8Array.from(e, e => e.charCodeAt(0)));
                        r = A(t, t), ef[e] = r
                    }
                    return n(r, ...t)
                },
                _JacobianPoint: m
            }, Object.defineProperties(t.utils, {
                sha256Sync: {
                    configurable: !1,
                    get: () => n,
                    set(e) {
                        n || (n = e)
                    }
                },
                hmacSha256Sync: {
                    configurable: !1,
                    get: () => i,
                    set(e) {
                        i || (i = e)
                    }
                }
            })
        },
        96820: function(e, t, r) {
            "use strict";
            var n = r(2403).Buffer;
            e.exports = function(e) {
                if (e.length >= 255) throw TypeError("Alphabet too long");
                for (var t = new Uint8Array(256), r = 0; r < t.length; r++) t[r] = 255;
                for (var i = 0; i < e.length; i++) {
                    var o = e.charAt(i),
                        s = o.charCodeAt(0);
                    if (255 !== t[s]) throw TypeError(o + " is ambiguous");
                    t[s] = i
                }
                var a = e.length,
                    u = e.charAt(0),
                    l = Math.log(a) / Math.log(256),
                    f = Math.log(256) / Math.log(a);

                function c(e) {
                    if ("string" != typeof e) throw TypeError("Expected String");
                    if (0 === e.length) return n.alloc(0);
                    for (var r = 0, i = 0, o = 0; e[r] === u;) i++, r++;
                    for (var s = (e.length - r) * l + 1 >>> 0, f = new Uint8Array(s); e[r];) {
                        var c = t[e.charCodeAt(r)];
                        if (255 === c) return;
                        for (var h = 0, p = s - 1;
                            (0 !== c || h < o) && -1 !== p; p--, h++) c += a * f[p] >>> 0, f[p] = c % 256 >>> 0, c = c / 256 >>> 0;
                        if (0 !== c) throw Error("Non-zero carry");
                        o = h, r++
                    }
                    for (var d = s - o; d !== s && 0 === f[d];) d++;
                    var y = n.allocUnsafe(i + (s - d));
                    y.fill(0, 0, i);
                    for (var g = i; d !== s;) y[g++] = f[d++];
                    return y
                }
                return {
                    encode: function(t) {
                        if ((Array.isArray(t) || t instanceof Uint8Array) && (t = n.from(t)), !n.isBuffer(t)) throw TypeError("Expected Buffer");
                        if (0 === t.length) return "";
                        for (var r = 0, i = 0, o = 0, s = t.length; o !== s && 0 === t[o];) o++, r++;
                        for (var l = (s - o) * f + 1 >>> 0, c = new Uint8Array(l); o !== s;) {
                            for (var h = t[o], p = 0, d = l - 1;
                                (0 !== h || p < i) && -1 !== d; d--, p++) h += 256 * c[d] >>> 0, c[d] = h % a >>> 0, h = h / a >>> 0;
                            if (0 !== h) throw Error("Non-zero carry");
                            i = p, o++
                        }
                        for (var y = l - i; y !== l && 0 === c[y];) y++;
                        for (var g = u.repeat(r); y < l; ++y) g += e.charAt(c[y]);
                        return g
                    },
                    decodeUnsafe: c,
                    decode: function(e) {
                        var t = c(e);
                        if (t) return t;
                        throw Error("Non-base" + a + " character")
                    }
                }
            }
        },
        216: function(e, t) {
            "use strict";
            t.byteLength = function(e) {
                var t = u(e),
                    r = t[0],
                    n = t[1];
                return (r + n) * 3 / 4 - n
            }, t.toByteArray = function(e) {
                var t, r, o = u(e),
                    s = o[0],
                    a = o[1],
                    l = new i((s + a) * 3 / 4 - a),
                    f = 0,
                    c = a > 0 ? s - 4 : s;
                for (r = 0; r < c; r += 4) t = n[e.charCodeAt(r)] << 18 | n[e.charCodeAt(r + 1)] << 12 | n[e.charCodeAt(r + 2)] << 6 | n[e.charCodeAt(r + 3)], l[f++] = t >> 16 & 255, l[f++] = t >> 8 & 255, l[f++] = 255 & t;
                return 2 === a && (t = n[e.charCodeAt(r)] << 2 | n[e.charCodeAt(r + 1)] >> 4, l[f++] = 255 & t), 1 === a && (t = n[e.charCodeAt(r)] << 10 | n[e.charCodeAt(r + 1)] << 4 | n[e.charCodeAt(r + 2)] >> 2, l[f++] = t >> 8 & 255, l[f++] = 255 & t), l
            }, t.fromByteArray = function(e) {
                for (var t, n = e.length, i = n % 3, o = [], s = 0, a = n - i; s < a; s += 16383) o.push(function(e, t, n) {
                    for (var i, o = [], s = t; s < n; s += 3) o.push(r[(i = (e[s] << 16 & 16711680) + (e[s + 1] << 8 & 65280) + (255 & e[s + 2])) >> 18 & 63] + r[i >> 12 & 63] + r[i >> 6 & 63] + r[63 & i]);
                    return o.join("")
                }(e, s, s + 16383 > a ? a : s + 16383));
                return 1 === i ? o.push(r[(t = e[n - 1]) >> 2] + r[t << 4 & 63] + "==") : 2 === i && o.push(r[(t = (e[n - 2] << 8) + e[n - 1]) >> 10] + r[t >> 4 & 63] + r[t << 2 & 63] + "="), o.join("")
            };
            for (var r = [], n = [], i = "undefined" != typeof Uint8Array ? Uint8Array : Array, o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", s = 0, a = o.length; s < a; ++s) r[s] = o[s], n[o.charCodeAt(s)] = s;

            function u(e) {
                var t = e.length;
                if (t % 4 > 0) throw Error("Invalid string. Length must be a multiple of 4");
                var r = e.indexOf("="); - 1 === r && (r = t);
                var n = r === t ? 0 : 4 - r % 4;
                return [r, n]
            }
            n["-".charCodeAt(0)] = 62, n["_".charCodeAt(0)] = 63
        },
        38621: function(e, t) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.bech32m = t.bech32 = void 0;
            let r = "qpzry9x8gf2tvdw0s3jn54khce6mua7l",
                n = {};
            for (let e = 0; e < r.length; e++) {
                let t = r.charAt(e);
                n[t] = e
            }

            function i(e) {
                let t = e >> 25;
                return (33554431 & e) << 5 ^ 996825010 & -(t >> 0 & 1) ^ 642813549 & -(t >> 1 & 1) ^ 513874426 & -(t >> 2 & 1) ^ 1027748829 & -(t >> 3 & 1) ^ 705979059 & -(t >> 4 & 1)
            }

            function o(e) {
                let t = 1;
                for (let r = 0; r < e.length; ++r) {
                    let n = e.charCodeAt(r);
                    if (n < 33 || n > 126) return "Invalid prefix (" + e + ")";
                    t = i(t) ^ n >> 5
                }
                t = i(t);
                for (let r = 0; r < e.length; ++r) {
                    let n = e.charCodeAt(r);
                    t = i(t) ^ 31 & n
                }
                return t
            }

            function s(e, t, r, n) {
                let i = 0,
                    o = 0,
                    s = (1 << r) - 1,
                    a = [];
                for (let n = 0; n < e.length; ++n)
                    for (i = i << t | e[n], o += t; o >= r;) a.push(i >> (o -= r) & s);
                if (n) o > 0 && a.push(i << r - o & s);
                else {
                    if (o >= t) return "Excess padding";
                    if (i << r - o & s) return "Non-zero padding"
                }
                return a
            }

            function a(e) {
                return s(e, 8, 5, !0)
            }

            function u(e) {
                let t = s(e, 5, 8, !1);
                if (Array.isArray(t)) return t
            }

            function l(e) {
                let t = s(e, 5, 8, !1);
                if (Array.isArray(t)) return t;
                throw Error(t)
            }

            function f(e) {
                let t;

                function s(e, r) {
                    if (r = r || 90, e.length < 8) return e + " too short";
                    if (e.length > r) return "Exceeds length limit";
                    let s = e.toLowerCase(),
                        a = e.toUpperCase();
                    if (e !== s && e !== a) return "Mixed-case string " + e;
                    e = s;
                    let u = e.lastIndexOf("1");
                    if (-1 === u) return "No separator character for " + e;
                    if (0 === u) return "Missing prefix for " + e;
                    let l = e.slice(0, u),
                        f = e.slice(u + 1);
                    if (f.length < 6) return "Data too short";
                    let c = o(l);
                    if ("string" == typeof c) return c;
                    let h = [];
                    for (let e = 0; e < f.length; ++e) {
                        let t = f.charAt(e),
                            r = n[t];
                        if (void 0 === r) return "Unknown character " + t;
                        c = i(c) ^ r, e + 6 >= f.length || h.push(r)
                    }
                    return c !== t ? "Invalid checksum for " + e : {
                        prefix: l,
                        words: h
                    }
                }
                return t = "bech32" === e ? 1 : 734539939, {
                    decodeUnsafe: function(e, t) {
                        let r = s(e, t);
                        if ("object" == typeof r) return r
                    },
                    decode: function(e, t) {
                        let r = s(e, t);
                        if ("object" == typeof r) return r;
                        throw Error(r)
                    },
                    encode: function(e, n, s) {
                        if (s = s || 90, e.length + 7 + n.length > s) throw TypeError("Exceeds length limit");
                        let a = o(e = e.toLowerCase());
                        if ("string" == typeof a) throw Error(a);
                        let u = e + "1";
                        for (let e = 0; e < n.length; ++e) {
                            let t = n[e];
                            if (t >> 5 != 0) throw Error("Non 5-bit word");
                            a = i(a) ^ t, u += r.charAt(t)
                        }
                        for (let e = 0; e < 6; ++e) a = i(a);
                        a ^= t;
                        for (let e = 0; e < 6; ++e) {
                            let t = a >> (5 - e) * 5 & 31;
                            u += r.charAt(t)
                        }
                        return u
                    },
                    toWords: a,
                    fromWordsUnsafe: u,
                    fromWords: l
                }
            }
            t.bech32 = f("bech32"), t.bech32m = f("bech32m")
        },
        40779: function(e, t, r) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            let n = r(29742);

            function i(e, t, r) {
                return n => {
                    if (e.has(n)) return;
                    let i = r.filter(e => e.key.toString("hex") === n)[0];
                    t.push(i), e.add(n)
                }
            }

            function o(e) {
                return e.globalMap.unsignedTx
            }

            function s(e) {
                let t = new Set;
                return e.forEach(e => {
                    let r = e.key.toString("hex");
                    if (t.has(r)) throw Error("Combine: KeyValue Map keys should be unique");
                    t.add(r)
                }), t
            }
            t.combine = function(e) {
                let t = e[0],
                    r = n.psbtToKeyVals(t),
                    a = e.slice(1);
                if (0 === a.length) throw Error("Combine: Nothing to combine");
                let u = o(t);
                if (void 0 === u) throw Error("Combine: Self missing transaction");
                let l = s(r.globalKeyVals),
                    f = r.inputKeyVals.map(s),
                    c = r.outputKeyVals.map(s);
                for (let e of a) {
                    let t = o(e);
                    if (void 0 === t || !t.toBuffer().equals(u.toBuffer())) throw Error("Combine: One of the Psbts does not have the same transaction.");
                    let a = n.psbtToKeyVals(e),
                        h = s(a.globalKeyVals);
                    h.forEach(i(l, r.globalKeyVals, a.globalKeyVals));
                    let p = a.inputKeyVals.map(s);
                    p.forEach((e, t) => e.forEach(i(f[t], r.inputKeyVals[t], a.inputKeyVals[t])));
                    let d = a.outputKeyVals.map(s);
                    d.forEach((e, t) => e.forEach(i(c[t], r.outputKeyVals[t], a.outputKeyVals[t])))
                }
                return n.psbtFromKeyVals(u, {
                    globalMapKeyVals: r.globalKeyVals,
                    inputKeyVals: r.inputKeyVals,
                    outputKeyVals: r.outputKeyVals
                })
            }
        },
        64544: function(e, t, r) {
            "use strict";
            var n = r(91083).Buffer;
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            let i = r(97753),
                o = e => [...Array(e).keys()];
            t.decode = function(e) {
                if (e.key[0] !== i.GlobalTypes.GLOBAL_XPUB) throw Error("Decode Error: could not decode globalXpub with key 0x" + e.key.toString("hex"));
                if (79 !== e.key.length || ![2, 3].includes(e.key[46])) throw Error("Decode Error: globalXpub has invalid extended pubkey in key 0x" + e.key.toString("hex"));
                if (e.value.length / 4 % 1 != 0) throw Error("Decode Error: Global GLOBAL_XPUB value length should be multiple of 4");
                let t = e.key.slice(1),
                    r = {
                        masterFingerprint: e.value.slice(0, 4),
                        extendedPubkey: t,
                        path: "m"
                    };
                for (let t of o(e.value.length / 4 - 1)) {
                    let n = e.value.readUInt32LE(4 * t + 4),
                        i = !!(2147483648 & n),
                        o = 2147483647 & n;
                    r.path += "/" + o.toString(10) + (i ? "'" : "")
                }
                return r
            }, t.encode = function(e) {
                let t = n.from([i.GlobalTypes.GLOBAL_XPUB]),
                    r = n.concat([t, e.extendedPubkey]),
                    o = e.path.split("/"),
                    s = n.allocUnsafe(4 * o.length);
                e.masterFingerprint.copy(s, 0);
                let a = 4;
                return o.slice(1).forEach(e => {
                    let t = "'" === e.slice(-1),
                        r = 2147483647 & parseInt(t ? e.slice(0, -1) : e, 10);
                    t && (r += 2147483648), s.writeUInt32LE(r, a), a += 4
                }), {
                    key: r,
                    value: s
                }
            }, t.expected = "{ masterFingerprint: Buffer; extendedPubkey: Buffer; path: string; }", t.check = function(e) {
                let t = e.extendedPubkey,
                    r = e.masterFingerprint,
                    i = e.path;
                return n.isBuffer(t) && 78 === t.length && [2, 3].indexOf(t[45]) > -1 && n.isBuffer(r) && 4 === r.length && "string" == typeof i && !!i.match(/^m(\/\d+'?)*$/)
            }, t.canAddToArray = function(e, t, r) {
                let n = t.extendedPubkey.toString("hex");
                return !r.has(n) && (r.add(n), 0 === e.filter(e => e.extendedPubkey.equals(t.extendedPubkey)).length)
            }
        },
        10982: function(e, t, r) {
            "use strict";
            var n = r(91083).Buffer;
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            let i = r(97753);
            t.encode = function(e) {
                return {
                    key: n.from([i.GlobalTypes.UNSIGNED_TX]),
                    value: e.toBuffer()
                }
            }
        },
        93202: function(e, t, r) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            let n = r(97753),
                i = r(64544),
                o = r(10982),
                s = r(82992),
                a = r(31979),
                u = r(40730),
                l = r(12553),
                f = r(1438),
                c = r(4448),
                h = r(54298),
                p = r(38271),
                d = r(42603),
                y = r(46399),
                g = r(31968),
                b = r(27825),
                m = r(3534),
                w = r(90433),
                E = r(69828),
                S = r(6775),
                v = r(33403),
                _ = r(2406),
                T = {
                    unsignedTx: o,
                    globalXpub: i,
                    checkPubkey: w.makeChecker([])
                };
            t.globals = T;
            let A = {
                nonWitnessUtxo: u,
                partialSig: l,
                sighashType: c,
                finalScriptSig: s,
                finalScriptWitness: a,
                porCommitment: f,
                witnessUtxo: g,
                bip32Derivation: m.makeConverter(n.InputTypes.BIP32_DERIVATION),
                redeemScript: E.makeConverter(n.InputTypes.REDEEM_SCRIPT),
                witnessScript: _.makeConverter(n.InputTypes.WITNESS_SCRIPT),
                checkPubkey: w.makeChecker([n.InputTypes.PARTIAL_SIG, n.InputTypes.BIP32_DERIVATION]),
                tapKeySig: h,
                tapScriptSig: y,
                tapLeafScript: p,
                tapBip32Derivation: S.makeConverter(n.InputTypes.TAP_BIP32_DERIVATION),
                tapInternalKey: v.makeConverter(n.InputTypes.TAP_INTERNAL_KEY),
                tapMerkleRoot: d
            };
            t.inputs = A;
            let O = {
                bip32Derivation: m.makeConverter(n.OutputTypes.BIP32_DERIVATION),
                redeemScript: E.makeConverter(n.OutputTypes.REDEEM_SCRIPT),
                witnessScript: _.makeConverter(n.OutputTypes.WITNESS_SCRIPT),
                checkPubkey: w.makeChecker([n.OutputTypes.BIP32_DERIVATION]),
                tapBip32Derivation: S.makeConverter(n.OutputTypes.TAP_BIP32_DERIVATION),
                tapTree: b,
                tapInternalKey: v.makeConverter(n.OutputTypes.TAP_INTERNAL_KEY)
            };
            t.outputs = O
        },
        82992: function(e, t, r) {
            "use strict";
            var n = r(91083).Buffer;
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            let i = r(97753);
            t.decode = function(e) {
                if (e.key[0] !== i.InputTypes.FINAL_SCRIPTSIG) throw Error("Decode Error: could not decode finalScriptSig with key 0x" + e.key.toString("hex"));
                return e.value
            }, t.encode = function(e) {
                let t = n.from([i.InputTypes.FINAL_SCRIPTSIG]);
                return {
                    key: t,
                    value: e
                }
            }, t.expected = "Buffer", t.check = function(e) {
                return n.isBuffer(e)
            }, t.canAdd = function(e, t) {
                return !!e && !!t && void 0 === e.finalScriptSig
            }
        },
        31979: function(e, t, r) {
            "use strict";
            var n = r(91083).Buffer;
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            let i = r(97753);
            t.decode = function(e) {
                if (e.key[0] !== i.InputTypes.FINAL_SCRIPTWITNESS) throw Error("Decode Error: could not decode finalScriptWitness with key 0x" + e.key.toString("hex"));
                return e.value
            }, t.encode = function(e) {
                let t = n.from([i.InputTypes.FINAL_SCRIPTWITNESS]);
                return {
                    key: t,
                    value: e
                }
            }, t.expected = "Buffer", t.check = function(e) {
                return n.isBuffer(e)
            }, t.canAdd = function(e, t) {
                return !!e && !!t && void 0 === e.finalScriptWitness
            }
        },
        40730: function(e, t, r) {
            "use strict";
            var n = r(91083).Buffer;
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            let i = r(97753);
            t.decode = function(e) {
                if (e.key[0] !== i.InputTypes.NON_WITNESS_UTXO) throw Error("Decode Error: could not decode nonWitnessUtxo with key 0x" + e.key.toString("hex"));
                return e.value
            }, t.encode = function(e) {
                return {
                    key: n.from([i.InputTypes.NON_WITNESS_UTXO]),
                    value: e
                }
            }, t.expected = "Buffer", t.check = function(e) {
                return n.isBuffer(e)
            }, t.canAdd = function(e, t) {
                return !!e && !!t && void 0 === e.nonWitnessUtxo
            }
        },
        12553: function(e, t, r) {
            "use strict";
            var n = r(91083).Buffer;
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            let i = r(97753);
            t.decode = function(e) {
                if (e.key[0] !== i.InputTypes.PARTIAL_SIG) throw Error("Decode Error: could not decode partialSig with key 0x" + e.key.toString("hex"));
                if (!(34 === e.key.length || 66 === e.key.length) || ![2, 3, 4].includes(e.key[1])) throw Error("Decode Error: partialSig has invalid pubkey in key 0x" + e.key.toString("hex"));
                let t = e.key.slice(1);
                return {
                    pubkey: t,
                    signature: e.value
                }
            }, t.encode = function(e) {
                let t = n.from([i.InputTypes.PARTIAL_SIG]);
                return {
                    key: n.concat([t, e.pubkey]),
                    value: e.signature
                }
            }, t.expected = "{ pubkey: Buffer; signature: Buffer; }", t.check = function(e) {
                return n.isBuffer(e.pubkey) && n.isBuffer(e.signature) && [33, 65].includes(e.pubkey.length) && [2, 3, 4].includes(e.pubkey[0]) && function(e) {
                    if (!n.isBuffer(e) || e.length < 9 || 48 !== e[0] || e.length !== e[1] + 3 || 2 !== e[2]) return !1;
                    let t = e[3];
                    if (t > 33 || t < 1 || 2 !== e[3 + t + 1]) return !1;
                    let r = e[3 + t + 2];
                    return !(r > 33) && !(r < 1) && e.length === 3 + t + 2 + r + 2
                }(e.signature)
            }, t.canAddToArray = function(e, t, r) {
                let n = t.pubkey.toString("hex");
                return !r.has(n) && (r.add(n), 0 === e.filter(e => e.pubkey.equals(t.pubkey)).length)
            }
        },
        1438: function(e, t, r) {
            "use strict";
            var n = r(91083).Buffer;
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            let i = r(97753);
            t.decode = function(e) {
                if (e.key[0] !== i.InputTypes.POR_COMMITMENT) throw Error("Decode Error: could not decode porCommitment with key 0x" + e.key.toString("hex"));
                return e.value.toString("utf8")
            }, t.encode = function(e) {
                let t = n.from([i.InputTypes.POR_COMMITMENT]);
                return {
                    key: t,
                    value: n.from(e, "utf8")
                }
            }, t.expected = "string", t.check = function(e) {
                return "string" == typeof e
            }, t.canAdd = function(e, t) {
                return !!e && !!t && void 0 === e.porCommitment
            }
        },
        4448: function(e, t, r) {
            "use strict";
            var n = r(91083).Buffer;
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            let i = r(97753);
            t.decode = function(e) {
                if (e.key[0] !== i.InputTypes.SIGHASH_TYPE) throw Error("Decode Error: could not decode sighashType with key 0x" + e.key.toString("hex"));
                return e.value.readUInt32LE(0)
            }, t.encode = function(e) {
                let t = n.from([i.InputTypes.SIGHASH_TYPE]),
                    r = n.allocUnsafe(4);
                return r.writeUInt32LE(e, 0), {
                    key: t,
                    value: r
                }
            }, t.expected = "number", t.check = function(e) {
                return "number" == typeof e
            }, t.canAdd = function(e, t) {
                return !!e && !!t && void 0 === e.sighashType
            }
        },
        54298: function(e, t, r) {
            "use strict";
            var n = r(91083).Buffer;
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            let i = r(97753);

            function o(e) {
                return n.isBuffer(e) && (64 === e.length || 65 === e.length)
            }
            t.decode = function(e) {
                if (e.key[0] !== i.InputTypes.TAP_KEY_SIG || 1 !== e.key.length) throw Error("Decode Error: could not decode tapKeySig with key 0x" + e.key.toString("hex"));
                if (!o(e.value)) throw Error("Decode Error: tapKeySig not a valid 64-65-byte BIP340 signature");
                return e.value
            }, t.encode = function(e) {
                let t = n.from([i.InputTypes.TAP_KEY_SIG]);
                return {
                    key: t,
                    value: e
                }
            }, t.expected = "Buffer", t.check = o, t.canAdd = function(e, t) {
                return !!e && !!t && void 0 === e.tapKeySig
            }
        },
        38271: function(e, t, r) {
            "use strict";
            var n = r(91083).Buffer;
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            let i = r(97753);
            t.decode = function(e) {
                if (e.key[0] !== i.InputTypes.TAP_LEAF_SCRIPT) throw Error("Decode Error: could not decode tapLeafScript with key 0x" + e.key.toString("hex"));
                if ((e.key.length - 2) % 32 != 0) throw Error("Decode Error: tapLeafScript has invalid control block in key 0x" + e.key.toString("hex"));
                let t = e.value[e.value.length - 1];
                if ((254 & e.key[1]) !== t) throw Error("Decode Error: tapLeafScript bad leaf version in key 0x" + e.key.toString("hex"));
                let r = e.value.slice(0, -1),
                    n = e.key.slice(1);
                return {
                    controlBlock: n,
                    script: r,
                    leafVersion: t
                }
            }, t.encode = function(e) {
                let t = n.from([i.InputTypes.TAP_LEAF_SCRIPT]),
                    r = n.from([e.leafVersion]);
                return {
                    key: n.concat([t, e.controlBlock]),
                    value: n.concat([e.script, r])
                }
            }, t.expected = "{ controlBlock: Buffer; leafVersion: number, script: Buffer; }", t.check = function(e) {
                return n.isBuffer(e.controlBlock) && (e.controlBlock.length - 1) % 32 == 0 && (254 & e.controlBlock[0]) === e.leafVersion && n.isBuffer(e.script)
            }, t.canAddToArray = function(e, t, r) {
                let n = t.controlBlock.toString("hex");
                return !r.has(n) && (r.add(n), 0 === e.filter(e => e.controlBlock.equals(t.controlBlock)).length)
            }
        },
        42603: function(e, t, r) {
            "use strict";
            var n = r(91083).Buffer;
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            let i = r(97753);

            function o(e) {
                return n.isBuffer(e) && 32 === e.length
            }
            t.decode = function(e) {
                if (e.key[0] !== i.InputTypes.TAP_MERKLE_ROOT || 1 !== e.key.length) throw Error("Decode Error: could not decode tapMerkleRoot with key 0x" + e.key.toString("hex"));
                if (!o(e.value)) throw Error("Decode Error: tapMerkleRoot not a 32-byte hash");
                return e.value
            }, t.encode = function(e) {
                let t = n.from([i.InputTypes.TAP_MERKLE_ROOT]);
                return {
                    key: t,
                    value: e
                }
            }, t.expected = "Buffer", t.check = o, t.canAdd = function(e, t) {
                return !!e && !!t && void 0 === e.tapMerkleRoot
            }
        },
        46399: function(e, t, r) {
            "use strict";
            var n = r(91083).Buffer;
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            let i = r(97753);
            t.decode = function(e) {
                if (e.key[0] !== i.InputTypes.TAP_SCRIPT_SIG) throw Error("Decode Error: could not decode tapScriptSig with key 0x" + e.key.toString("hex"));
                if (65 !== e.key.length) throw Error("Decode Error: tapScriptSig has invalid key 0x" + e.key.toString("hex"));
                if (64 !== e.value.length && 65 !== e.value.length) throw Error("Decode Error: tapScriptSig has invalid signature in key 0x" + e.key.toString("hex"));
                let t = e.key.slice(1, 33),
                    r = e.key.slice(33);
                return {
                    pubkey: t,
                    leafHash: r,
                    signature: e.value
                }
            }, t.encode = function(e) {
                let t = n.from([i.InputTypes.TAP_SCRIPT_SIG]);
                return {
                    key: n.concat([t, e.pubkey, e.leafHash]),
                    value: e.signature
                }
            }, t.expected = "{ pubkey: Buffer; leafHash: Buffer; signature: Buffer; }", t.check = function(e) {
                return n.isBuffer(e.pubkey) && n.isBuffer(e.leafHash) && n.isBuffer(e.signature) && 32 === e.pubkey.length && 32 === e.leafHash.length && (64 === e.signature.length || 65 === e.signature.length)
            }, t.canAddToArray = function(e, t, r) {
                let n = t.pubkey.toString("hex") + t.leafHash.toString("hex");
                return !r.has(n) && (r.add(n), 0 === e.filter(e => e.pubkey.equals(t.pubkey) && e.leafHash.equals(t.leafHash)).length)
            }
        },
        31968: function(e, t, r) {
            "use strict";
            var n = r(91083).Buffer;
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            let i = r(97753),
                o = r(99857),
                s = r(77004);
            t.decode = function(e) {
                if (e.key[0] !== i.InputTypes.WITNESS_UTXO) throw Error("Decode Error: could not decode witnessUtxo with key 0x" + e.key.toString("hex"));
                let t = o.readUInt64LE(e.value, 0),
                    r = 8,
                    n = s.decode(e.value, r);
                r += s.encodingLength(n);
                let a = e.value.slice(r);
                if (a.length !== n) throw Error("Decode Error: WITNESS_UTXO script is not proper length");
                return {
                    script: a,
                    value: t
                }
            }, t.encode = function(e) {
                let {
                    script: t,
                    value: r
                } = e, a = s.encodingLength(t.length), u = n.allocUnsafe(8 + a + t.length);
                return o.writeUInt64LE(u, r, 0), s.encode(t.length, u, 8), t.copy(u, 8 + a), {
                    key: n.from([i.InputTypes.WITNESS_UTXO]),
                    value: u
                }
            }, t.expected = "{ script: Buffer; value: number; }", t.check = function(e) {
                return n.isBuffer(e.script) && "number" == typeof e.value
            }, t.canAdd = function(e, t) {
                return !!e && !!t && void 0 === e.witnessUtxo
            }
        },
        27825: function(e, t, r) {
            "use strict";
            var n = r(91083).Buffer;
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            let i = r(97753),
                o = r(77004);
            t.decode = function(e) {
                if (e.key[0] !== i.OutputTypes.TAP_TREE || 1 !== e.key.length) throw Error("Decode Error: could not decode tapTree with key 0x" + e.key.toString("hex"));
                let t = 0,
                    r = [];
                for (; t < e.value.length;) {
                    let n = e.value[t++],
                        i = e.value[t++],
                        s = o.decode(e.value, t);
                    t += o.encodingLength(s), r.push({
                        depth: n,
                        leafVersion: i,
                        script: e.value.slice(t, t + s)
                    }), t += s
                }
                return {
                    leaves: r
                }
            }, t.encode = function(e) {
                let t = n.from([i.OutputTypes.TAP_TREE]),
                    r = [].concat(...e.leaves.map(e => [n.of(e.depth, e.leafVersion), o.encode(e.script.length), e.script]));
                return {
                    key: t,
                    value: n.concat(r)
                }
            }, t.expected = "{ leaves: [{ depth: number; leafVersion: number, script: Buffer; }] }", t.check = function(e) {
                return Array.isArray(e.leaves) && e.leaves.every(e => e.depth >= 0 && e.depth <= 128 && (254 & e.leafVersion) === e.leafVersion && n.isBuffer(e.script))
            }, t.canAdd = function(e, t) {
                return !!e && !!t && void 0 === e.tapTree
            }
        },
        3534: function(e, t, r) {
            "use strict";
            var n = r(91083).Buffer;
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            let i = e => [...Array(e).keys()],
                o = e => 33 === e.length && [2, 3].includes(e[0]) || 65 === e.length && 4 === e[0];
            t.makeConverter = function(e, t = o) {
                return {
                    decode: function(r) {
                        if (r.key[0] !== e) throw Error("Decode Error: could not decode bip32Derivation with key 0x" + r.key.toString("hex"));
                        let n = r.key.slice(1);
                        if (!t(n)) throw Error("Decode Error: bip32Derivation has invalid pubkey in key 0x" + r.key.toString("hex"));
                        if (r.value.length / 4 % 1 != 0) throw Error("Decode Error: Input BIP32_DERIVATION value length should be multiple of 4");
                        let o = {
                            masterFingerprint: r.value.slice(0, 4),
                            pubkey: n,
                            path: "m"
                        };
                        for (let e of i(r.value.length / 4 - 1)) {
                            let t = r.value.readUInt32LE(4 * e + 4),
                                n = !!(2147483648 & t),
                                i = 2147483647 & t;
                            o.path += "/" + i.toString(10) + (n ? "'" : "")
                        }
                        return o
                    },
                    encode: function(t) {
                        let r = n.from([e]),
                            i = n.concat([r, t.pubkey]),
                            o = t.path.split("/"),
                            s = n.allocUnsafe(4 * o.length);
                        t.masterFingerprint.copy(s, 0);
                        let a = 4;
                        return o.slice(1).forEach(e => {
                            let t = "'" === e.slice(-1),
                                r = 2147483647 & parseInt(t ? e.slice(0, -1) : e, 10);
                            t && (r += 2147483648), s.writeUInt32LE(r, a), a += 4
                        }), {
                            key: i,
                            value: s
                        }
                    },
                    check: function(e) {
                        return n.isBuffer(e.pubkey) && n.isBuffer(e.masterFingerprint) && "string" == typeof e.path && t(e.pubkey) && 4 === e.masterFingerprint.length
                    },
                    expected: "{ masterFingerprint: Buffer; pubkey: Buffer; path: string; }",
                    canAddToArray: function(e, t, r) {
                        let n = t.pubkey.toString("hex");
                        return !r.has(n) && (r.add(n), 0 === e.filter(e => e.pubkey.equals(t.pubkey)).length)
                    }
                }
            }
        },
        90433: function(e, t) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.makeChecker = function(e) {
                return function(t) {
                    let r;
                    if (e.includes(t.key[0]) && (!(33 === (r = t.key.slice(1)).length || 65 === r.length) || ![2, 3, 4].includes(r[0]))) throw Error("Format Error: invalid pubkey in key 0x" + t.key.toString("hex"));
                    return r
                }
            }
        },
        69828: function(e, t, r) {
            "use strict";
            var n = r(91083).Buffer;
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.makeConverter = function(e) {
                return {
                    decode: function(t) {
                        if (t.key[0] !== e) throw Error("Decode Error: could not decode redeemScript with key 0x" + t.key.toString("hex"));
                        return t.value
                    },
                    encode: function(t) {
                        let r = n.from([e]);
                        return {
                            key: r,
                            value: t
                        }
                    },
                    check: function(e) {
                        return n.isBuffer(e)
                    },
                    expected: "Buffer",
                    canAdd: function(e, t) {
                        return !!e && !!t && void 0 === e.redeemScript
                    }
                }
            }
        },
        6775: function(e, t, r) {
            "use strict";
            var n = r(91083).Buffer;
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            let i = r(77004),
                o = r(3534),
                s = e => 32 === e.length;
            t.makeConverter = function(e) {
                let t = o.makeConverter(e, s);
                return {
                    decode: function(e) {
                        let r = i.decode(e.value),
                            n = i.encodingLength(r),
                            o = t.decode({
                                key: e.key,
                                value: e.value.slice(n + 32 * r)
                            }),
                            s = Array(r);
                        for (let t = 0, i = n; t < r; t++, i += 32) s[t] = e.value.slice(i, i + 32);
                        return Object.assign({}, o, {
                            leafHashes: s
                        })
                    },
                    encode: function(e) {
                        let r = t.encode(e),
                            o = i.encodingLength(e.leafHashes.length),
                            s = n.allocUnsafe(o);
                        i.encode(e.leafHashes.length, s);
                        let a = n.concat([s, ...e.leafHashes, r.value]);
                        return Object.assign({}, r, {
                            value: a
                        })
                    },
                    check: function(e) {
                        return Array.isArray(e.leafHashes) && e.leafHashes.every(e => n.isBuffer(e) && 32 === e.length) && t.check(e)
                    },
                    expected: "{ masterFingerprint: Buffer; pubkey: Buffer; path: string; leafHashes: Buffer[]; }",
                    canAddToArray: t.canAddToArray
                }
            }
        },
        33403: function(e, t, r) {
            "use strict";
            var n = r(91083).Buffer;
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.makeConverter = function(e) {
                return {
                    decode: function(t) {
                        if (t.key[0] !== e || 1 !== t.key.length) throw Error("Decode Error: could not decode tapInternalKey with key 0x" + t.key.toString("hex"));
                        if (32 !== t.value.length) throw Error("Decode Error: tapInternalKey not a 32-byte x-only pubkey");
                        return t.value
                    },
                    encode: function(t) {
                        let r = n.from([e]);
                        return {
                            key: r,
                            value: t
                        }
                    },
                    check: function(e) {
                        return n.isBuffer(e) && 32 === e.length
                    },
                    expected: "Buffer",
                    canAdd: function(e, t) {
                        return !!e && !!t && void 0 === e.tapInternalKey
                    }
                }
            }
        },
        2406: function(e, t, r) {
            "use strict";
            var n = r(91083).Buffer;
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.makeConverter = function(e) {
                return {
                    decode: function(t) {
                        if (t.key[0] !== e) throw Error("Decode Error: could not decode witnessScript with key 0x" + t.key.toString("hex"));
                        return t.value
                    },
                    encode: function(t) {
                        let r = n.from([e]);
                        return {
                            key: r,
                            value: t
                        }
                    },
                    check: function(e) {
                        return n.isBuffer(e)
                    },
                    expected: "Buffer",
                    canAdd: function(e, t) {
                        return !!e && !!t && void 0 === e.witnessScript
                    }
                }
            }
        },
        99857: function(e, t, r) {
            "use strict";
            var n = r(91083).Buffer;
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            let i = r(77004);

            function o(e) {
                let t = e.key.length,
                    r = e.value.length,
                    o = i.encodingLength(t),
                    s = i.encodingLength(r),
                    a = n.allocUnsafe(o + t + s + r);
                return i.encode(t, a, 0), e.key.copy(a, o), i.encode(r, a, o + t), e.value.copy(a, o + t + s), a
            }

            function s(e, t) {
                if ("number" != typeof e) throw Error("cannot write a non-number as a number");
                if (e < 0) throw Error("specified a negative value for writing an unsigned value");
                if (e > t) throw Error("RangeError: value out of range");
                if (Math.floor(e) !== e) throw Error("value has a fractional component")
            }
            t.range = e => [...Array(e).keys()], t.reverseBuffer = function(e) {
                if (e.length < 1) return e;
                let t = e.length - 1,
                    r = 0;
                for (let n = 0; n < e.length / 2; n++) r = e[n], e[n] = e[t], e[t] = r, t--;
                return e
            }, t.keyValsToBuffer = function(e) {
                let t = e.map(o);
                return t.push(n.from([0])), n.concat(t)
            }, t.keyValToBuffer = o, t.readUInt64LE = function(e, t) {
                let r = e.readUInt32LE(t),
                    n = e.readUInt32LE(t + 4);
                return s((n *= 4294967296) + r, 9007199254740991), n + r
            }, t.writeUInt64LE = function(e, t, r) {
                return s(t, 9007199254740991), e.writeInt32LE(-1 & t, r), e.writeUInt32LE(Math.floor(t / 4294967296), r + 4), r + 8
            }
        },
        77004: function(e, t, r) {
            "use strict";
            var n = r(91083).Buffer;

            function i(e) {
                if (e < 0 || e > 9007199254740991 || e % 1 != 0) throw RangeError("value out of range")
            }

            function o(e) {
                return i(e), e < 253 ? 1 : e <= 65535 ? 3 : e <= 4294967295 ? 5 : 9
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.encode = function e(t, r, s) {
                if (i(t), r || (r = n.allocUnsafe(o(t))), !n.isBuffer(r)) throw TypeError("buffer must be a Buffer instance");
                return s || (s = 0), t < 253 ? (r.writeUInt8(t, s), Object.assign(e, {
                    bytes: 1
                })) : t <= 65535 ? (r.writeUInt8(253, s), r.writeUInt16LE(t, s + 1), Object.assign(e, {
                    bytes: 3
                })) : t <= 4294967295 ? (r.writeUInt8(254, s), r.writeUInt32LE(t, s + 1), Object.assign(e, {
                    bytes: 5
                })) : (r.writeUInt8(255, s), r.writeUInt32LE(t >>> 0, s + 1), r.writeUInt32LE(t / 4294967296 | 0, s + 5), Object.assign(e, {
                    bytes: 9
                })), r
            }, t.decode = function e(t, r) {
                if (!n.isBuffer(t)) throw TypeError("buffer must be a Buffer instance");
                r || (r = 0);
                let o = t.readUInt8(r);
                if (o < 253) return Object.assign(e, {
                    bytes: 1
                }), o;
                if (253 === o) return Object.assign(e, {
                    bytes: 3
                }), t.readUInt16LE(r + 1);
                if (254 === o) return Object.assign(e, {
                    bytes: 5
                }), t.readUInt32LE(r + 1); {
                    Object.assign(e, {
                        bytes: 9
                    });
                    let n = t.readUInt32LE(r + 1),
                        o = t.readUInt32LE(r + 5),
                        s = 4294967296 * o + n;
                    return i(s), s
                }
            }, t.encodingLength = o
        },
        97092: function(e, t, r) {
            "use strict";
            var n = r(91083).Buffer;
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            let i = r(93202),
                o = r(99857),
                s = r(77004),
                a = r(97753);

            function u(e, t, r) {
                if (!t.equals(n.from([r]))) throw Error(`Format Error: Invalid ${e} key: ${t.toString("hex")}`)
            }

            function l(e, {
                globalMapKeyVals: t,
                inputKeyVals: r,
                outputKeyVals: n
            }) {
                let s = {
                        unsignedTx: e
                    },
                    l = 0;
                for (let e of t) switch (e.key[0]) {
                    case a.GlobalTypes.UNSIGNED_TX:
                        if (u("global", e.key, a.GlobalTypes.UNSIGNED_TX), l > 0) throw Error("Format Error: GlobalMap has multiple UNSIGNED_TX");
                        l++;
                        break;
                    case a.GlobalTypes.GLOBAL_XPUB:
                        void 0 === s.globalXpub && (s.globalXpub = []), s.globalXpub.push(i.globals.globalXpub.decode(e));
                        break;
                    default:
                        s.unknownKeyVals || (s.unknownKeyVals = []), s.unknownKeyVals.push(e)
                }
                let f = r.length,
                    c = n.length,
                    h = [],
                    p = [];
                for (let e of o.range(f)) {
                    let t = {};
                    for (let n of r[e]) switch (i.inputs.checkPubkey(n), n.key[0]) {
                        case a.InputTypes.NON_WITNESS_UTXO:
                            if (u("input", n.key, a.InputTypes.NON_WITNESS_UTXO), void 0 !== t.nonWitnessUtxo) throw Error("Format Error: Input has multiple NON_WITNESS_UTXO");
                            t.nonWitnessUtxo = i.inputs.nonWitnessUtxo.decode(n);
                            break;
                        case a.InputTypes.WITNESS_UTXO:
                            if (u("input", n.key, a.InputTypes.WITNESS_UTXO), void 0 !== t.witnessUtxo) throw Error("Format Error: Input has multiple WITNESS_UTXO");
                            t.witnessUtxo = i.inputs.witnessUtxo.decode(n);
                            break;
                        case a.InputTypes.PARTIAL_SIG:
                            void 0 === t.partialSig && (t.partialSig = []), t.partialSig.push(i.inputs.partialSig.decode(n));
                            break;
                        case a.InputTypes.SIGHASH_TYPE:
                            if (u("input", n.key, a.InputTypes.SIGHASH_TYPE), void 0 !== t.sighashType) throw Error("Format Error: Input has multiple SIGHASH_TYPE");
                            t.sighashType = i.inputs.sighashType.decode(n);
                            break;
                        case a.InputTypes.REDEEM_SCRIPT:
                            if (u("input", n.key, a.InputTypes.REDEEM_SCRIPT), void 0 !== t.redeemScript) throw Error("Format Error: Input has multiple REDEEM_SCRIPT");
                            t.redeemScript = i.inputs.redeemScript.decode(n);
                            break;
                        case a.InputTypes.WITNESS_SCRIPT:
                            if (u("input", n.key, a.InputTypes.WITNESS_SCRIPT), void 0 !== t.witnessScript) throw Error("Format Error: Input has multiple WITNESS_SCRIPT");
                            t.witnessScript = i.inputs.witnessScript.decode(n);
                            break;
                        case a.InputTypes.BIP32_DERIVATION:
                            void 0 === t.bip32Derivation && (t.bip32Derivation = []), t.bip32Derivation.push(i.inputs.bip32Derivation.decode(n));
                            break;
                        case a.InputTypes.FINAL_SCRIPTSIG:
                            u("input", n.key, a.InputTypes.FINAL_SCRIPTSIG), t.finalScriptSig = i.inputs.finalScriptSig.decode(n);
                            break;
                        case a.InputTypes.FINAL_SCRIPTWITNESS:
                            u("input", n.key, a.InputTypes.FINAL_SCRIPTWITNESS), t.finalScriptWitness = i.inputs.finalScriptWitness.decode(n);
                            break;
                        case a.InputTypes.POR_COMMITMENT:
                            u("input", n.key, a.InputTypes.POR_COMMITMENT), t.porCommitment = i.inputs.porCommitment.decode(n);
                            break;
                        case a.InputTypes.TAP_KEY_SIG:
                            u("input", n.key, a.InputTypes.TAP_KEY_SIG), t.tapKeySig = i.inputs.tapKeySig.decode(n);
                            break;
                        case a.InputTypes.TAP_SCRIPT_SIG:
                            void 0 === t.tapScriptSig && (t.tapScriptSig = []), t.tapScriptSig.push(i.inputs.tapScriptSig.decode(n));
                            break;
                        case a.InputTypes.TAP_LEAF_SCRIPT:
                            void 0 === t.tapLeafScript && (t.tapLeafScript = []), t.tapLeafScript.push(i.inputs.tapLeafScript.decode(n));
                            break;
                        case a.InputTypes.TAP_BIP32_DERIVATION:
                            void 0 === t.tapBip32Derivation && (t.tapBip32Derivation = []), t.tapBip32Derivation.push(i.inputs.tapBip32Derivation.decode(n));
                            break;
                        case a.InputTypes.TAP_INTERNAL_KEY:
                            u("input", n.key, a.InputTypes.TAP_INTERNAL_KEY), t.tapInternalKey = i.inputs.tapInternalKey.decode(n);
                            break;
                        case a.InputTypes.TAP_MERKLE_ROOT:
                            u("input", n.key, a.InputTypes.TAP_MERKLE_ROOT), t.tapMerkleRoot = i.inputs.tapMerkleRoot.decode(n);
                            break;
                        default:
                            t.unknownKeyVals || (t.unknownKeyVals = []), t.unknownKeyVals.push(n)
                    }
                    h.push(t)
                }
                for (let e of o.range(c)) {
                    let t = {};
                    for (let r of n[e]) switch (i.outputs.checkPubkey(r), r.key[0]) {
                        case a.OutputTypes.REDEEM_SCRIPT:
                            if (u("output", r.key, a.OutputTypes.REDEEM_SCRIPT), void 0 !== t.redeemScript) throw Error("Format Error: Output has multiple REDEEM_SCRIPT");
                            t.redeemScript = i.outputs.redeemScript.decode(r);
                            break;
                        case a.OutputTypes.WITNESS_SCRIPT:
                            if (u("output", r.key, a.OutputTypes.WITNESS_SCRIPT), void 0 !== t.witnessScript) throw Error("Format Error: Output has multiple WITNESS_SCRIPT");
                            t.witnessScript = i.outputs.witnessScript.decode(r);
                            break;
                        case a.OutputTypes.BIP32_DERIVATION:
                            void 0 === t.bip32Derivation && (t.bip32Derivation = []), t.bip32Derivation.push(i.outputs.bip32Derivation.decode(r));
                            break;
                        case a.OutputTypes.TAP_INTERNAL_KEY:
                            u("output", r.key, a.OutputTypes.TAP_INTERNAL_KEY), t.tapInternalKey = i.outputs.tapInternalKey.decode(r);
                            break;
                        case a.OutputTypes.TAP_TREE:
                            u("output", r.key, a.OutputTypes.TAP_TREE), t.tapTree = i.outputs.tapTree.decode(r);
                            break;
                        case a.OutputTypes.TAP_BIP32_DERIVATION:
                            void 0 === t.tapBip32Derivation && (t.tapBip32Derivation = []), t.tapBip32Derivation.push(i.outputs.tapBip32Derivation.decode(r));
                            break;
                        default:
                            t.unknownKeyVals || (t.unknownKeyVals = []), t.unknownKeyVals.push(r)
                    }
                    p.push(t)
                }
                return {
                    globalMap: s,
                    inputs: h,
                    outputs: p
                }
            }
            t.psbtFromBuffer = function(e, t) {
                let r = 0;

                function n() {
                    let t = s.decode(e, r);
                    r += s.encodingLength(t);
                    let n = e.slice(r, r + t);
                    return r += t, n
                }

                function i() {
                    let e = n(),
                        t = n();
                    return {
                        key: e,
                        value: t
                    }
                }

                function u() {
                    if (r >= e.length) throw Error("Format Error: Unexpected End of PSBT");
                    let t = 0 === e.readUInt8(r);
                    return t && r++, t
                }
                if (1886610036 !== function() {
                        let t = e.readUInt32BE(r);
                        return r += 4, t
                    }()) throw Error("Format Error: Invalid Magic Number");
                if (255 !== function() {
                        let t = e.readUInt8(r);
                        return r += 1, t
                    }()) throw Error("Format Error: Magic Number must be followed by 0xff separator");
                let f = [],
                    c = {};
                for (; !u();) {
                    let e = i(),
                        t = e.key.toString("hex");
                    if (c[t]) throw Error("Format Error: Keys must be unique for global keymap: key " + t);
                    c[t] = 1, f.push(e)
                }
                let h = f.filter(e => e.key[0] === a.GlobalTypes.UNSIGNED_TX);
                if (1 !== h.length) throw Error("Format Error: Only one UNSIGNED_TX allowed");
                let p = t(h[0].value),
                    {
                        inputCount: d,
                        outputCount: y
                    } = p.getInputOutputCounts(),
                    g = [],
                    b = [];
                for (let e of o.range(d)) {
                    let t = {},
                        r = [];
                    for (; !u();) {
                        let n = i(),
                            o = n.key.toString("hex");
                        if (t[o]) throw Error("Format Error: Keys must be unique for each input: input index " + e + " key " + o);
                        t[o] = 1, r.push(n)
                    }
                    g.push(r)
                }
                for (let e of o.range(y)) {
                    let t = {},
                        r = [];
                    for (; !u();) {
                        let n = i(),
                            o = n.key.toString("hex");
                        if (t[o]) throw Error("Format Error: Keys must be unique for each output: output index " + e + " key " + o);
                        t[o] = 1, r.push(n)
                    }
                    b.push(r)
                }
                return l(p, {
                    globalMapKeyVals: f,
                    inputKeyVals: g,
                    outputKeyVals: b
                })
            }, t.checkKeyBuffer = u, t.psbtFromKeyVals = l
        },
        29742: function(e, t, r) {
            "use strict";

            function n(e) {
                for (var r in e) t.hasOwnProperty(r) || (t[r] = e[r])
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), n(r(97092)), n(r(88641))
        },
        88641: function(e, t, r) {
            "use strict";
            var n = r(91083).Buffer;
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            let i = r(93202),
                o = r(99857);
            t.psbtToBuffer = function({
                globalMap: e,
                inputs: t,
                outputs: r
            }) {
                let {
                    globalKeyVals: i,
                    inputKeyVals: s,
                    outputKeyVals: a
                } = u({
                    globalMap: e,
                    inputs: t,
                    outputs: r
                }), l = o.keyValsToBuffer(i), f = e => 0 === e.length ? [n.from([0])] : e.map(o.keyValsToBuffer), c = f(s), h = f(a), p = n.allocUnsafe(5);
                return p.writeUIntBE(482972169471, 0, 5), n.concat([p, l].concat(c, h))
            };
            let s = (e, t) => e.key.compare(t.key);

            function a(e, t) {
                let r = new Set,
                    n = Object.entries(e).reduce((e, [n, i]) => {
                        if ("unknownKeyVals" === n) return e;
                        let o = t[n];
                        if (void 0 === o) return e;
                        let s = (Array.isArray(i) ? i : [i]).map(o.encode),
                            a = s.map(e => e.key.toString("hex"));
                        return a.forEach(e => {
                            if (r.has(e)) throw Error("Serialize Error: Duplicate key: " + e);
                            r.add(e)
                        }), e.concat(s)
                    }, []),
                    i = e.unknownKeyVals ? e.unknownKeyVals.filter(e => !r.has(e.key.toString("hex"))) : [];
                return n.concat(i).sort(s)
            }

            function u({
                globalMap: e,
                inputs: t,
                outputs: r
            }) {
                return {
                    globalKeyVals: a(e, i.globals),
                    inputKeyVals: t.map(e => a(e, i.inputs)),
                    outputKeyVals: r.map(e => a(e, i.outputs))
                }
            }
            t.psbtToKeyVals = u
        },
        6654: function(e, t, r) {
            "use strict";
            var n = r(91083).Buffer;
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            let i = r(40779),
                o = r(29742),
                s = r(97753),
                a = r(48944);
            t.Psbt = class {
                constructor(e) {
                    this.inputs = [], this.outputs = [], this.globalMap = {
                        unsignedTx: e
                    }
                }
                static fromBase64(e, t) {
                    let r = n.from(e, "base64");
                    return this.fromBuffer(r, t)
                }
                static fromHex(e, t) {
                    let r = n.from(e, "hex");
                    return this.fromBuffer(r, t)
                }
                static fromBuffer(e, t) {
                    let r = o.psbtFromBuffer(e, t),
                        n = new this(r.globalMap.unsignedTx);
                    return Object.assign(n, r), n
                }
                toBase64() {
                    let e = this.toBuffer();
                    return e.toString("base64")
                }
                toHex() {
                    let e = this.toBuffer();
                    return e.toString("hex")
                }
                toBuffer() {
                    return o.psbtToBuffer(this)
                }
                updateGlobal(e) {
                    return a.updateGlobal(e, this.globalMap), this
                }
                updateInput(e, t) {
                    let r = a.checkForInput(this.inputs, e);
                    return a.updateInput(t, r), this
                }
                updateOutput(e, t) {
                    let r = a.checkForOutput(this.outputs, e);
                    return a.updateOutput(t, r), this
                }
                addUnknownKeyValToGlobal(e) {
                    return a.checkHasKey(e, this.globalMap.unknownKeyVals, a.getEnumLength(s.GlobalTypes)), this.globalMap.unknownKeyVals || (this.globalMap.unknownKeyVals = []), this.globalMap.unknownKeyVals.push(e), this
                }
                addUnknownKeyValToInput(e, t) {
                    let r = a.checkForInput(this.inputs, e);
                    return a.checkHasKey(t, r.unknownKeyVals, a.getEnumLength(s.InputTypes)), r.unknownKeyVals || (r.unknownKeyVals = []), r.unknownKeyVals.push(t), this
                }
                addUnknownKeyValToOutput(e, t) {
                    let r = a.checkForOutput(this.outputs, e);
                    return a.checkHasKey(t, r.unknownKeyVals, a.getEnumLength(s.OutputTypes)), r.unknownKeyVals || (r.unknownKeyVals = []), r.unknownKeyVals.push(t), this
                }
                addInput(e) {
                    this.globalMap.unsignedTx.addInput(e), this.inputs.push({
                        unknownKeyVals: []
                    });
                    let t = e.unknownKeyVals || [],
                        r = this.inputs.length - 1;
                    if (!Array.isArray(t)) throw Error("unknownKeyVals must be an Array");
                    return t.forEach(e => this.addUnknownKeyValToInput(r, e)), a.addInputAttributes(this.inputs, e), this
                }
                addOutput(e) {
                    this.globalMap.unsignedTx.addOutput(e), this.outputs.push({
                        unknownKeyVals: []
                    });
                    let t = e.unknownKeyVals || [],
                        r = this.outputs.length - 1;
                    if (!Array.isArray(t)) throw Error("unknownKeyVals must be an Array");
                    return t.forEach(e => this.addUnknownKeyValToInput(r, e)), a.addOutputAttributes(this.outputs, e), this
                }
                clearFinalizedInput(e) {
                    let t = a.checkForInput(this.inputs, e);
                    for (let r of (a.inputCheckUncleanFinalized(e, t), Object.keys(t)))["witnessUtxo", "nonWitnessUtxo", "finalScriptSig", "finalScriptWitness", "unknownKeyVals"].includes(r) || delete t[r];
                    return this
                }
                combine(...e) {
                    let t = i.combine([this].concat(e));
                    return Object.assign(this, t), this
                }
                getTransaction() {
                    return this.globalMap.unsignedTx.toBuffer()
                }
            }
        },
        97753: function(e, t) {
            "use strict";
            var r, n, i;
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), (r = t.GlobalTypes || (t.GlobalTypes = {}))[r.UNSIGNED_TX = 0] = "UNSIGNED_TX", r[r.GLOBAL_XPUB = 1] = "GLOBAL_XPUB", t.GLOBAL_TYPE_NAMES = ["unsignedTx", "globalXpub"], (n = t.InputTypes || (t.InputTypes = {}))[n.NON_WITNESS_UTXO = 0] = "NON_WITNESS_UTXO", n[n.WITNESS_UTXO = 1] = "WITNESS_UTXO", n[n.PARTIAL_SIG = 2] = "PARTIAL_SIG", n[n.SIGHASH_TYPE = 3] = "SIGHASH_TYPE", n[n.REDEEM_SCRIPT = 4] = "REDEEM_SCRIPT", n[n.WITNESS_SCRIPT = 5] = "WITNESS_SCRIPT", n[n.BIP32_DERIVATION = 6] = "BIP32_DERIVATION", n[n.FINAL_SCRIPTSIG = 7] = "FINAL_SCRIPTSIG", n[n.FINAL_SCRIPTWITNESS = 8] = "FINAL_SCRIPTWITNESS", n[n.POR_COMMITMENT = 9] = "POR_COMMITMENT", n[n.TAP_KEY_SIG = 19] = "TAP_KEY_SIG", n[n.TAP_SCRIPT_SIG = 20] = "TAP_SCRIPT_SIG", n[n.TAP_LEAF_SCRIPT = 21] = "TAP_LEAF_SCRIPT", n[n.TAP_BIP32_DERIVATION = 22] = "TAP_BIP32_DERIVATION", n[n.TAP_INTERNAL_KEY = 23] = "TAP_INTERNAL_KEY", n[n.TAP_MERKLE_ROOT = 24] = "TAP_MERKLE_ROOT", t.INPUT_TYPE_NAMES = ["nonWitnessUtxo", "witnessUtxo", "partialSig", "sighashType", "redeemScript", "witnessScript", "bip32Derivation", "finalScriptSig", "finalScriptWitness", "porCommitment", "tapKeySig", "tapScriptSig", "tapLeafScript", "tapBip32Derivation", "tapInternalKey", "tapMerkleRoot"], (i = t.OutputTypes || (t.OutputTypes = {}))[i.REDEEM_SCRIPT = 0] = "REDEEM_SCRIPT", i[i.WITNESS_SCRIPT = 1] = "WITNESS_SCRIPT", i[i.BIP32_DERIVATION = 2] = "BIP32_DERIVATION", i[i.TAP_INTERNAL_KEY = 5] = "TAP_INTERNAL_KEY", i[i.TAP_TREE = 6] = "TAP_TREE", i[i.TAP_BIP32_DERIVATION = 7] = "TAP_BIP32_DERIVATION", t.OUTPUT_TYPE_NAMES = ["redeemScript", "witnessScript", "bip32Derivation", "tapInternalKey", "tapTree", "tapBip32Derivation"]
        },
        48944: function(e, t, r) {
            "use strict";
            var n = r(91083).Buffer;
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            let i = r(93202);

            function o(e, t) {
                let r = e[t];
                if (void 0 === r) throw Error(`No input #${t}`);
                return r
            }

            function s(e, t) {
                let r = e[t];
                if (void 0 === r) throw Error(`No output #${t}`);
                return r
            }

            function a(e, t, r, n) {
                throw Error(`Data for ${e} key ${t} is incorrect: Expected ${r} and got ${JSON.stringify(n)}`)
            }

            function u(e) {
                return (t, r) => {
                    for (let n of Object.keys(t)) {
                        let o = t[n],
                            {
                                canAdd: s,
                                canAddToArray: u,
                                check: l,
                                expected: f
                            } = i[e + "s"][n] || {},
                            c = !!u;
                        if (l) {
                            if (c) {
                                if (!Array.isArray(o) || r[n] && !Array.isArray(r[n])) throw Error(`Key type ${n} must be an array`);
                                o.every(l) || a(e, n, f, o);
                                let t = r[n] || [],
                                    i = new Set;
                                if (!o.every(e => u(t, e, i))) throw Error("Can not add duplicate data to array");
                                r[n] = t.concat(o)
                            } else {
                                if (l(o) || a(e, n, f, o), !s(r, o)) throw Error(`Can not add duplicate data to ${e}`);
                                r[n] = o
                            }
                        }
                    }
                }
            }
            t.checkForInput = o, t.checkForOutput = s, t.checkHasKey = function(e, t, r) {
                if (e.key[0] < r) throw Error("Use the method for your specific key instead of addUnknownKeyVal*");
                if (t && 0 !== t.filter(t => t.key.equals(e.key)).length) throw Error(`Duplicate Key: ${e.key.toString("hex")}`)
            }, t.getEnumLength = function(e) {
                let t = 0;
                return Object.keys(e).forEach(e => {
                    Number(isNaN(Number(e))) && t++
                }), t
            }, t.inputCheckUncleanFinalized = function(e, t) {
                let r = !1;
                if (t.nonWitnessUtxo || t.witnessUtxo) {
                    let e = !!t.redeemScript,
                        n = !!t.witnessScript,
                        i = !e || !!t.finalScriptSig,
                        o = !n || !!t.finalScriptWitness,
                        s = !!t.finalScriptSig || !!t.finalScriptWitness;
                    r = i && o && s
                }
                if (!1 === r) throw Error(`Input #${e} has too much or too little data to clean`)
            }, t.updateGlobal = u("global"), t.updateInput = u("input"), t.updateOutput = u("output"), t.addInputAttributes = function(e, r) {
                let n = e.length - 1,
                    i = o(e, n);
                t.updateInput(r, i)
            }, t.addOutputAttributes = function(e, r) {
                let n = e.length - 1,
                    i = s(e, n);
                t.updateOutput(r, i)
            }, t.defaultVersionSetter = function(e, t) {
                if (!n.isBuffer(t) || t.length < 4) throw Error("Set Version: Invalid Transaction");
                return t.writeUInt32LE(e, 0), t
            }, t.defaultLocktimeSetter = function(e, t) {
                if (!n.isBuffer(t) || t.length < 4) throw Error("Set Locktime: Invalid Transaction");
                return t.writeUInt32LE(e, t.length - 4), t
            }
        },
        91900: function(e, t, r) {
            "use strict";
            var n = r(91083).Buffer;
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.toOutputScript = t.fromOutputScript = t.toBech32 = t.toBase58Check = t.fromBech32 = t.fromBase58Check = void 0;
            let i = r(69609),
                o = r(41303),
                s = r(37692),
                a = r(25492),
                u = r(38621),
                l = r(31378),
                f = "WARNING: Sending to a future segwit version address can lead to loss of funds. End users MUST be warned carefully in the GUI and asked if they wish to proceed with caution. Wallets should verify the segwit version from the output of fromBech32, then decide when it is safe to use which version of segwit.";

            function c(e) {
                let t = l.decode(e);
                if (t.length < 21) throw TypeError(e + " is too short");
                if (t.length > 21) throw TypeError(e + " is too long");
                let r = t.readUInt8(0),
                    n = t.slice(1);
                return {
                    version: r,
                    hash: n
                }
            }

            function h(e) {
                let t, r;
                try {
                    t = u.bech32.decode(e)
                } catch (e) {}
                if (t) {
                    if (0 !== (r = t.words[0])) throw TypeError(e + " uses wrong encoding")
                } else if (0 === (r = (t = u.bech32m.decode(e)).words[0])) throw TypeError(e + " uses wrong encoding");
                let i = u.bech32.fromWords(t.words.slice(1));
                return {
                    version: r,
                    prefix: t.prefix,
                    data: n.from(i)
                }
            }

            function p(e, t, r) {
                let n = u.bech32.toWords(e);
                return n.unshift(t), 0 === t ? u.bech32.encode(r, n) : u.bech32m.encode(r, n)
            }
            t.fromBase58Check = c, t.fromBech32 = h, t.toBase58Check = function(e, t) {
                (0, a.typeforce)((0, a.tuple)(a.Hash160bit, a.UInt8), arguments);
                let r = n.allocUnsafe(21);
                return r.writeUInt8(t, 0), e.copy(r, 1), l.encode(r)
            }, t.toBech32 = p, t.fromOutputScript = function(e, t) {
                t = t || i.bitcoin;
                try {
                    return o.p2pkh({
                        output: e,
                        network: t
                    }).address
                } catch (e) {}
                try {
                    return o.p2sh({
                        output: e,
                        network: t
                    }).address
                } catch (e) {}
                try {
                    return o.p2wpkh({
                        output: e,
                        network: t
                    }).address
                } catch (e) {}
                try {
                    return o.p2wsh({
                        output: e,
                        network: t
                    }).address
                } catch (e) {}
                try {
                    return o.p2tr({
                        output: e,
                        network: t
                    }).address
                } catch (e) {}
                try {
                    return function(e, t) {
                        let r = e.slice(2);
                        if (r.length < 2 || r.length > 40) throw TypeError("Invalid program length for segwit address");
                        let n = e[0] - 80;
                        if (n < 2 || n > 16) throw TypeError("Invalid version for segwit address");
                        if (e[1] !== r.length) throw TypeError("Invalid script for segwit address");
                        return console.warn(f), p(r, n, t.bech32)
                    }(e, t)
                } catch (e) {}
                throw Error(s.toASM(e) + " has no matching Address")
            }, t.toOutputScript = function(e, t) {
                let r, n;
                t = t || i.bitcoin;
                try {
                    r = c(e)
                } catch (e) {}
                if (r) {
                    if (r.version === t.pubKeyHash) return o.p2pkh({
                        hash: r.hash
                    }).output;
                    if (r.version === t.scriptHash) return o.p2sh({
                        hash: r.hash
                    }).output
                } else {
                    try {
                        n = h(e)
                    } catch (e) {}
                    if (n) {
                        if (n.prefix !== t.bech32) throw Error(e + " has an invalid prefix");
                        if (0 === n.version) {
                            if (20 === n.data.length) return o.p2wpkh({
                                hash: n.data
                            }).output;
                            if (32 === n.data.length) return o.p2wsh({
                                hash: n.data
                            }).output
                        } else if (1 === n.version) {
                            if (32 === n.data.length) return o.p2tr({
                                pubkey: n.data
                            }).output
                        } else if (n.version >= 2 && n.version <= 16 && n.data.length >= 2 && n.data.length <= 40) return console.warn(f), s.compile([n.version + 80, n.data])
                    }
                }
                throw Error(e + " has no matching Script")
            }
        },
        76841: function(e, t, r) {
            "use strict";
            var n = r(91083).Buffer;
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.encode = t.decode = t.check = void 0, t.check = function(e) {
                if (e.length < 8 || e.length > 72 || 48 !== e[0] || e[1] !== e.length - 2 || 2 !== e[2]) return !1;
                let t = e[3];
                if (0 === t || 5 + t >= e.length || 2 !== e[4 + t]) return !1;
                let r = e[5 + t];
                return 0 !== r && 6 + t + r === e.length && !(128 & e[4]) && (!(t > 1) || 0 !== e[4] || !!(128 & e[5])) && !(128 & e[t + 6]) && (!(r > 1) || 0 !== e[t + 6] || !!(128 & e[t + 7]))
            }, t.decode = function(e) {
                if (e.length < 8) throw Error("DER sequence length is too short");
                if (e.length > 72) throw Error("DER sequence length is too long");
                if (48 !== e[0]) throw Error("Expected DER sequence");
                if (e[1] !== e.length - 2) throw Error("DER sequence length is invalid");
                if (2 !== e[2]) throw Error("Expected DER integer");
                let t = e[3];
                if (0 === t) throw Error("R length is zero");
                if (5 + t >= e.length) throw Error("R length is too long");
                if (2 !== e[4 + t]) throw Error("Expected DER integer (2)");
                let r = e[5 + t];
                if (0 === r) throw Error("S length is zero");
                if (6 + t + r !== e.length) throw Error("S length is invalid");
                if (128 & e[4]) throw Error("R value is negative");
                if (t > 1 && 0 === e[4] && !(128 & e[5])) throw Error("R value excessively padded");
                if (128 & e[t + 6]) throw Error("S value is negative");
                if (r > 1 && 0 === e[t + 6] && !(128 & e[t + 7])) throw Error("S value excessively padded");
                return {
                    r: e.slice(4, 4 + t),
                    s: e.slice(6 + t)
                }
            }, t.encode = function(e, t) {
                let r = e.length,
                    i = t.length;
                if (0 === r) throw Error("R length is zero");
                if (0 === i) throw Error("S length is zero");
                if (r > 33) throw Error("R length is too long");
                if (i > 33) throw Error("S length is too long");
                if (128 & e[0]) throw Error("R value is negative");
                if (128 & t[0]) throw Error("S value is negative");
                if (r > 1 && 0 === e[0] && !(128 & e[1])) throw Error("R value excessively padded");
                if (i > 1 && 0 === t[0] && !(128 & t[1])) throw Error("S value excessively padded");
                let o = n.allocUnsafe(6 + r + i);
                return o[0] = 48, o[1] = o.length - 2, o[2] = 2, o[3] = e.length, e.copy(o, 4), o[4 + r] = 2, o[5 + r] = t.length, t.copy(o, 6 + r), o
            }
        },
        73194: function(e, t, r) {
            "use strict";
            var n = r(91083).Buffer;
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.Block = void 0;
            let i = r(950),
                o = r(4998),
                s = r(74277),
                a = r(69648),
                u = r(25492),
                {
                    typeforce: l
                } = u,
                f = TypeError("Cannot compute merkle root for zero transactions"),
                c = TypeError("Cannot compute witness commit for non-segwit block");
            class h {
                constructor() {
                    this.version = 1, this.prevHash = void 0, this.merkleRoot = void 0, this.timestamp = 0, this.witnessCommit = void 0, this.bits = 0, this.nonce = 0, this.transactions = void 0
                }
                static fromBuffer(e) {
                    if (e.length < 80) throw Error("Buffer too small (< 80 bytes)");
                    let t = new i.BufferReader(e),
                        r = new h;
                    if (r.version = t.readInt32(), r.prevHash = t.readSlice(32), r.merkleRoot = t.readSlice(32), r.timestamp = t.readUInt32(), r.bits = t.readUInt32(), r.nonce = t.readUInt32(), 80 === e.length) return r;
                    let n = () => {
                            let e = a.Transaction.fromBuffer(t.buffer.slice(t.offset), !0);
                            return t.offset += e.byteLength(), e
                        },
                        o = t.readVarInt();
                    r.transactions = [];
                    for (let e = 0; e < o; ++e) {
                        let e = n();
                        r.transactions.push(e)
                    }
                    let s = r.getWitnessCommit();
                    return s && (r.witnessCommit = s), r
                }
                static fromHex(e) {
                    return h.fromBuffer(n.from(e, "hex"))
                }
                static calculateTarget(e) {
                    let t = n.alloc(32, 0);
                    return t.writeUIntBE(8388607 & e, 29 - (((4278190080 & e) >> 24) - 3), 3), t
                }
                static calculateMerkleRoot(e, t) {
                    if (l([{
                            getHash: u.Function
                        }], e), 0 === e.length) throw f;
                    if (t && !p(e)) throw c;
                    let r = e.map(e => e.getHash(t)),
                        i = (0, s.fastMerkleRoot)(r, o.hash256);
                    return t ? o.hash256(n.concat([i, e[0].ins[0].witness[0]])) : i
                }
                getWitnessCommit() {
                    if (!p(this.transactions)) return null;
                    let e = this.transactions[0].outs.filter(e => e.script.slice(0, 6).equals(n.from("6a24aa21a9ed", "hex"))).map(e => e.script.slice(6, 38));
                    if (0 === e.length) return null;
                    let t = e[e.length - 1];
                    return t instanceof n && 32 === t.length ? t : null
                }
                hasWitnessCommit() {
                    return this.witnessCommit instanceof n && 32 === this.witnessCommit.length || null !== this.getWitnessCommit()
                }
                hasWitness() {
                    var e;
                    return (e = this.transactions) instanceof Array && e.some(e => "object" == typeof e && e.ins instanceof Array && e.ins.some(e => "object" == typeof e && e.witness instanceof Array && e.witness.length > 0))
                }
                weight() {
                    let e = this.byteLength(!1, !1),
                        t = this.byteLength(!1, !0);
                    return 3 * e + t
                }
                byteLength(e, t = !0) {
                    return e || !this.transactions ? 80 : 80 + i.varuint.encodingLength(this.transactions.length) + this.transactions.reduce((e, r) => e + r.byteLength(t), 0)
                }
                getHash() {
                    return o.hash256(this.toBuffer(!0))
                }
                getId() {
                    return (0, i.reverseBuffer)(this.getHash()).toString("hex")
                }
                getUTCDate() {
                    let e = new Date(0);
                    return e.setUTCSeconds(this.timestamp), e
                }
                toBuffer(e) {
                    let t = n.allocUnsafe(this.byteLength(e)),
                        r = new i.BufferWriter(t);
                    return r.writeInt32(this.version), r.writeSlice(this.prevHash), r.writeSlice(this.merkleRoot), r.writeUInt32(this.timestamp), r.writeUInt32(this.bits), r.writeUInt32(this.nonce), e || !this.transactions || (i.varuint.encode(this.transactions.length, t, r.offset), r.offset += i.varuint.encode.bytes, this.transactions.forEach(e => {
                        let n = e.byteLength();
                        e.toBuffer(t, r.offset), r.offset += n
                    })), t
                }
                toHex(e) {
                    return this.toBuffer(e).toString("hex")
                }
                checkTxRoots() {
                    let e = this.hasWitnessCommit();
                    return !(!e && this.hasWitness()) && this.__checkMerkleRoot() && (!e || this.__checkWitnessCommit())
                }
                checkProofOfWork() {
                    let e = (0, i.reverseBuffer)(this.getHash()),
                        t = h.calculateTarget(this.bits);
                    return 0 >= e.compare(t)
                }
                __checkMerkleRoot() {
                    if (!this.transactions) throw f;
                    let e = h.calculateMerkleRoot(this.transactions);
                    return 0 === this.merkleRoot.compare(e)
                }
                __checkWitnessCommit() {
                    if (!this.transactions) throw f;
                    if (!this.hasWitnessCommit()) throw c;
                    let e = h.calculateMerkleRoot(this.transactions, !0);
                    return 0 === this.witnessCommit.compare(e)
                }
            }

            function p(e) {
                return e instanceof Array && e[0] && e[0].ins && e[0].ins instanceof Array && e[0].ins[0] && e[0].ins[0].witness && e[0].ins[0].witness instanceof Array && e[0].ins[0].witness.length > 0
            }
            t.Block = h
        },
        950: function(e, t, r) {
            "use strict";
            var n = r(91083).Buffer;
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.BufferReader = t.BufferWriter = t.cloneBuffer = t.reverseBuffer = t.writeUInt64LE = t.readUInt64LE = t.varuint = void 0;
            let i = r(25492),
                {
                    typeforce: o
                } = i,
                s = r(1791);

            function a(e, t) {
                if ("number" != typeof e) throw Error("cannot write a non-number as a number");
                if (e < 0) throw Error("specified a negative value for writing an unsigned value");
                if (e > t) throw Error("RangeError: value out of range");
                if (Math.floor(e) !== e) throw Error("value has a fractional component")
            }

            function u(e, t) {
                let r = e.readUInt32LE(t),
                    n = e.readUInt32LE(t + 4);
                return a((n *= 4294967296) + r, 9007199254740991), n + r
            }

            function l(e, t, r) {
                return a(t, 9007199254740991), e.writeInt32LE(-1 & t, r), e.writeUInt32LE(Math.floor(t / 4294967296), r + 4), r + 8
            }
            t.varuint = s, t.readUInt64LE = u, t.writeUInt64LE = l, t.reverseBuffer = function(e) {
                if (e.length < 1) return e;
                let t = e.length - 1,
                    r = 0;
                for (let n = 0; n < e.length / 2; n++) r = e[n], e[n] = e[t], e[t] = r, t--;
                return e
            }, t.cloneBuffer = function(e) {
                let t = n.allocUnsafe(e.length);
                return e.copy(t), t
            };
            class f {
                static withCapacity(e) {
                    return new f(n.alloc(e))
                }
                constructor(e, t = 0) {
                    this.buffer = e, this.offset = t, o(i.tuple(i.Buffer, i.UInt32), [e, t])
                }
                writeUInt8(e) {
                    this.offset = this.buffer.writeUInt8(e, this.offset)
                }
                writeInt32(e) {
                    this.offset = this.buffer.writeInt32LE(e, this.offset)
                }
                writeUInt32(e) {
                    this.offset = this.buffer.writeUInt32LE(e, this.offset)
                }
                writeUInt64(e) {
                    this.offset = l(this.buffer, e, this.offset)
                }
                writeVarInt(e) {
                    s.encode(e, this.buffer, this.offset), this.offset += s.encode.bytes
                }
                writeSlice(e) {
                    if (this.buffer.length < this.offset + e.length) throw Error("Cannot write slice out of bounds");
                    this.offset += e.copy(this.buffer, this.offset)
                }
                writeVarSlice(e) {
                    this.writeVarInt(e.length), this.writeSlice(e)
                }
                writeVector(e) {
                    this.writeVarInt(e.length), e.forEach(e => this.writeVarSlice(e))
                }
                end() {
                    if (this.buffer.length === this.offset) return this.buffer;
                    throw Error(`buffer size ${this.buffer.length}, offset ${this.offset}`)
                }
            }
            t.BufferWriter = f, t.BufferReader = class {
                constructor(e, t = 0) {
                    this.buffer = e, this.offset = t, o(i.tuple(i.Buffer, i.UInt32), [e, t])
                }
                readUInt8() {
                    let e = this.buffer.readUInt8(this.offset);
                    return this.offset++, e
                }
                readInt32() {
                    let e = this.buffer.readInt32LE(this.offset);
                    return this.offset += 4, e
                }
                readUInt32() {
                    let e = this.buffer.readUInt32LE(this.offset);
                    return this.offset += 4, e
                }
                readUInt64() {
                    let e = u(this.buffer, this.offset);
                    return this.offset += 8, e
                }
                readVarInt() {
                    let e = s.decode(this.buffer, this.offset);
                    return this.offset += s.decode.bytes, e
                }
                readSlice(e) {
                    if (this.buffer.length < this.offset + e) throw Error("Cannot read slice out of bounds");
                    let t = this.buffer.slice(this.offset, this.offset + e);
                    return this.offset += e, t
                }
                readVarSlice() {
                    return this.readSlice(this.readVarInt())
                }
                readVector() {
                    let e = this.readVarInt(),
                        t = [];
                    for (let r = 0; r < e; r++) t.push(this.readVarSlice());
                    return t
                }
            }
        },
        4998: function(e, t, r) {
            "use strict";
            var n = r(91083).Buffer;
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.taggedHash = t.hash256 = t.hash160 = t.sha256 = t.sha1 = t.ripemd160 = void 0;
            let i = r(43330),
                o = r(99670);

            function s(e) {
                try {
                    return i("rmd160").update(e).digest()
                } catch (t) {
                    try {
                        return i("ripemd160").update(e).digest()
                    } catch (t) {
                        return new o().update(e).digest()
                    }
                }
            }

            function a(e) {
                return i("sha256").update(e).digest()
            }
            t.ripemd160 = s, t.sha1 = function(e) {
                return i("sha1").update(e).digest()
            }, t.sha256 = a, t.hash160 = function(e) {
                return s(a(e))
            }, t.hash256 = function(e) {
                return a(a(e))
            };
            let u = Object.fromEntries(["BIP0340/challenge", "BIP0340/aux", "BIP0340/nonce", "TapLeaf", "TapBranch", "TapSighash", "TapTweak", "KeyAgg list", "KeyAgg coefficient"].map(e => {
                let t = a(n.from(e));
                return [e, n.concat([t, t])]
            }));
            t.taggedHash = function(e, t) {
                return a(n.concat([u[e], t]))
            }
        },
        36414: function(e, t, r) {
            "use strict";
            var n = r(91083).Buffer;
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.getEccLib = t.initEccLib = void 0;
            let i = {};
            t.initEccLib = function(e) {
                e ? e !== i.eccLib && (s("function" == typeof e.isXOnlyPoint), s(e.isXOnlyPoint(o("79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798"))), s(e.isXOnlyPoint(o("fffffffffffffffffffffffffffffffffffffffffffffffffffffffeeffffc2e"))), s(e.isXOnlyPoint(o("f9308a019258c31049344f85f89d5229b531c845836f99b08601f113bce036f9"))), s(e.isXOnlyPoint(o("0000000000000000000000000000000000000000000000000000000000000001"))), s(!e.isXOnlyPoint(o("0000000000000000000000000000000000000000000000000000000000000000"))), s(!e.isXOnlyPoint(o("fffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f"))), s("function" == typeof e.xOnlyPointAddTweak), a.forEach(t => {
                    let r = e.xOnlyPointAddTweak(o(t.pubkey), o(t.tweak));
                    null === t.result ? s(null === r) : (s(null !== r), s(r.parity === t.parity), s(n.from(r.xOnlyPubkey).equals(o(t.result))))
                }), i.eccLib = e) : i.eccLib = e
            }, t.getEccLib = function() {
                if (!i.eccLib) throw Error("No ECC Library provided. You must call initEccLib() with a valid TinySecp256k1Interface instance");
                return i.eccLib
            };
            let o = e => n.from(e, "hex");

            function s(e) {
                if (!e) throw Error("ecc library invalid")
            }
            let a = [{
                pubkey: "79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798",
                tweak: "fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364140",
                parity: -1,
                result: null
            }, {
                pubkey: "1617d38ed8d8657da4d4761e8057bc396ea9e4b9d29776d4be096016dbd2509b",
                tweak: "a8397a935f0dfceba6ba9618f6451ef4d80637abf4e6af2669fbc9de6a8fd2ac",
                parity: 1,
                result: "e478f99dab91052ab39a33ea35fd5e6e4933f4d28023cd597c9a1f6760346adf"
            }, {
                pubkey: "2c0b7cf95324a07d05398b240174dc0c2be444d96b159aa6c7f7b1e668680991",
                tweak: "823c3cd2142744b075a87eade7e1b8678ba308d566226a0056ca2b7a76f86b47",
                parity: 0,
                result: "9534f8dc8c6deda2dc007655981c78b49c5d96c778fbf363462a11ec9dfd948c"
            }]
        },
        26350: function(e, t, r) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.initEccLib = t.Transaction = t.opcodes = t.Psbt = t.Block = t.script = t.payments = t.networks = t.crypto = t.address = void 0;
            let n = r(91900);
            t.address = n;
            let i = r(4998);
            t.crypto = i;
            let o = r(69609);
            t.networks = o;
            let s = r(41303);
            t.payments = s;
            let a = r(37692);
            t.script = a;
            var u = r(73194);
            Object.defineProperty(t, "Block", {
                enumerable: !0,
                get: function() {
                    return u.Block
                }
            });
            var l = r(37213);
            Object.defineProperty(t, "Psbt", {
                enumerable: !0,
                get: function() {
                    return l.Psbt
                }
            });
            var f = r(56731);
            Object.defineProperty(t, "opcodes", {
                enumerable: !0,
                get: function() {
                    return f.OPS
                }
            });
            var c = r(69648);
            Object.defineProperty(t, "Transaction", {
                enumerable: !0,
                get: function() {
                    return c.Transaction
                }
            });
            var h = r(36414);
            Object.defineProperty(t, "initEccLib", {
                enumerable: !0,
                get: function() {
                    return h.initEccLib
                }
            })
        },
        74277: function(e, t, r) {
            "use strict";
            var n = r(91083).Buffer;
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.fastMerkleRoot = void 0, t.fastMerkleRoot = function(e, t) {
                if (!Array.isArray(e)) throw TypeError("Expected values Array");
                if ("function" != typeof t) throw TypeError("Expected digest Function");
                let r = e.length,
                    i = e.concat();
                for (; r > 1;) {
                    let e = 0;
                    for (let o = 0; o < r; o += 2, ++e) {
                        let s = i[o],
                            a = o + 1 === r ? s : i[o + 1],
                            u = n.concat([s, a]);
                        i[e] = t(u)
                    }
                    r = e
                }
                return i[0]
            }
        },
        69609: function(e, t) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.testnet = t.regtest = t.bitcoin = void 0, t.bitcoin = {
                messagePrefix: "\x18Bitcoin Signed Message:\n",
                bech32: "bc",
                bip32: {
                    public: 76067358,
                    private: 76066276
                },
                pubKeyHash: 0,
                scriptHash: 5,
                wif: 128
            }, t.regtest = {
                messagePrefix: "\x18Bitcoin Signed Message:\n",
                bech32: "bcrt",
                bip32: {
                    public: 70617039,
                    private: 70615956
                },
                pubKeyHash: 111,
                scriptHash: 196,
                wif: 239
            }, t.testnet = {
                messagePrefix: "\x18Bitcoin Signed Message:\n",
                bech32: "tb",
                bip32: {
                    public: 70617039,
                    private: 70615956
                },
                pubKeyHash: 111,
                scriptHash: 196,
                wif: 239
            }
        },
        56731: function(e, t) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.REVERSE_OPS = t.OPS = void 0;
            let r = {
                OP_FALSE: 0,
                OP_0: 0,
                OP_PUSHDATA1: 76,
                OP_PUSHDATA2: 77,
                OP_PUSHDATA4: 78,
                OP_1NEGATE: 79,
                OP_RESERVED: 80,
                OP_TRUE: 81,
                OP_1: 81,
                OP_2: 82,
                OP_3: 83,
                OP_4: 84,
                OP_5: 85,
                OP_6: 86,
                OP_7: 87,
                OP_8: 88,
                OP_9: 89,
                OP_10: 90,
                OP_11: 91,
                OP_12: 92,
                OP_13: 93,
                OP_14: 94,
                OP_15: 95,
                OP_16: 96,
                OP_NOP: 97,
                OP_VER: 98,
                OP_IF: 99,
                OP_NOTIF: 100,
                OP_VERIF: 101,
                OP_VERNOTIF: 102,
                OP_ELSE: 103,
                OP_ENDIF: 104,
                OP_VERIFY: 105,
                OP_RETURN: 106,
                OP_TOALTSTACK: 107,
                OP_FROMALTSTACK: 108,
                OP_2DROP: 109,
                OP_2DUP: 110,
                OP_3DUP: 111,
                OP_2OVER: 112,
                OP_2ROT: 113,
                OP_2SWAP: 114,
                OP_IFDUP: 115,
                OP_DEPTH: 116,
                OP_DROP: 117,
                OP_DUP: 118,
                OP_NIP: 119,
                OP_OVER: 120,
                OP_PICK: 121,
                OP_ROLL: 122,
                OP_ROT: 123,
                OP_SWAP: 124,
                OP_TUCK: 125,
                OP_CAT: 126,
                OP_SUBSTR: 127,
                OP_LEFT: 128,
                OP_RIGHT: 129,
                OP_SIZE: 130,
                OP_INVERT: 131,
                OP_AND: 132,
                OP_OR: 133,
                OP_XOR: 134,
                OP_EQUAL: 135,
                OP_EQUALVERIFY: 136,
                OP_RESERVED1: 137,
                OP_RESERVED2: 138,
                OP_1ADD: 139,
                OP_1SUB: 140,
                OP_2MUL: 141,
                OP_2DIV: 142,
                OP_NEGATE: 143,
                OP_ABS: 144,
                OP_NOT: 145,
                OP_0NOTEQUAL: 146,
                OP_ADD: 147,
                OP_SUB: 148,
                OP_MUL: 149,
                OP_DIV: 150,
                OP_MOD: 151,
                OP_LSHIFT: 152,
                OP_RSHIFT: 153,
                OP_BOOLAND: 154,
                OP_BOOLOR: 155,
                OP_NUMEQUAL: 156,
                OP_NUMEQUALVERIFY: 157,
                OP_NUMNOTEQUAL: 158,
                OP_LESSTHAN: 159,
                OP_GREATERTHAN: 160,
                OP_LESSTHANOREQUAL: 161,
                OP_GREATERTHANOREQUAL: 162,
                OP_MIN: 163,
                OP_MAX: 164,
                OP_WITHIN: 165,
                OP_RIPEMD160: 166,
                OP_SHA1: 167,
                OP_SHA256: 168,
                OP_HASH160: 169,
                OP_HASH256: 170,
                OP_CODESEPARATOR: 171,
                OP_CHECKSIG: 172,
                OP_CHECKSIGVERIFY: 173,
                OP_CHECKMULTISIG: 174,
                OP_CHECKMULTISIGVERIFY: 175,
                OP_NOP1: 176,
                OP_NOP2: 177,
                OP_CHECKLOCKTIMEVERIFY: 177,
                OP_NOP3: 178,
                OP_CHECKSEQUENCEVERIFY: 178,
                OP_NOP4: 179,
                OP_NOP5: 180,
                OP_NOP6: 181,
                OP_NOP7: 182,
                OP_NOP8: 183,
                OP_NOP9: 184,
                OP_NOP10: 185,
                OP_CHECKSIGADD: 186,
                OP_PUBKEYHASH: 253,
                OP_PUBKEY: 254,
                OP_INVALIDOPCODE: 255
            };
            t.OPS = r;
            let n = {};
            for (let e of (t.REVERSE_OPS = n, Object.keys(r))) {
                let t = r[e];
                n[t] = e
            }
        },
        47107: function(e, t, r) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.tweakKey = t.tapTweakHash = t.tapleafHash = t.findScriptPath = t.toHashTree = t.rootHashFromPath = t.MAX_TAPTREE_DEPTH = t.LEAF_VERSION_TAPSCRIPT = void 0;
            let n = r(91083),
                i = r(36414),
                o = r(4998),
                s = r(950),
                a = r(25492);
            t.LEAF_VERSION_TAPSCRIPT = 192, t.MAX_TAPTREE_DEPTH = 128;
            let u = e => "left" in e && "right" in e;

            function l(e) {
                let r = e.version || t.LEAF_VERSION_TAPSCRIPT;
                return o.taggedHash("TapLeaf", n.Buffer.concat([n.Buffer.from([r]), function(e) {
                    let t = s.varuint.encodingLength(e.length),
                        r = n.Buffer.allocUnsafe(t);
                    return s.varuint.encode(e.length, r), n.Buffer.concat([r, e])
                }(e.output)]))
            }

            function f(e, t) {
                return o.taggedHash("TapTweak", n.Buffer.concat(t ? [e, t] : [e]))
            }

            function c(e, t) {
                return o.taggedHash("TapBranch", n.Buffer.concat([e, t]))
            }
            t.rootHashFromPath = function(e, t) {
                if (e.length < 33) throw TypeError(`The control-block length is too small. Got ${e.length}, expected min 33.`);
                let r = (e.length - 33) / 32,
                    n = t;
                for (let t = 0; t < r; t++) {
                    let r = e.slice(33 + 32 * t, 65 + 32 * t);
                    n = 0 > n.compare(r) ? c(n, r) : c(r, n)
                }
                return n
            }, t.toHashTree = function e(t) {
                if ((0, a.isTapleaf)(t)) return {
                    hash: l(t)
                };
                let r = [e(t[0]), e(t[1])];
                r.sort((e, t) => e.hash.compare(t.hash));
                let [n, i] = r;
                return {
                    hash: c(n.hash, i.hash),
                    left: n,
                    right: i
                }
            }, t.findScriptPath = function e(t, r) {
                if (u(t)) {
                    let n = e(t.left, r);
                    if (void 0 !== n) return [...n, t.right.hash];
                    let i = e(t.right, r);
                    if (void 0 !== i) return [...i, t.left.hash]
                } else if (t.hash.equals(r)) return []
            }, t.tapleafHash = l, t.tapTweakHash = f, t.tweakKey = function(e, t) {
                if (!n.Buffer.isBuffer(e) || 32 !== e.length || t && 32 !== t.length) return null;
                let r = f(e, t),
                    o = (0, i.getEccLib)().xOnlyPointAddTweak(e, r);
                return o && null !== o.xOnlyPubkey ? {
                    parity: o.parity,
                    x: n.Buffer.from(o.xOnlyPubkey)
                } : null
            }
        },
        94812: function(e, t, r) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.p2data = void 0;
            let n = r(69609),
                i = r(37692),
                o = r(25492),
                s = r(83586),
                a = i.OPS;
            t.p2data = function(e, t) {
                if (!e.data && !e.output) throw TypeError("Not enough data");
                t = Object.assign({
                    validate: !0
                }, t || {}), (0, o.typeforce)({
                    network: o.typeforce.maybe(o.typeforce.Object),
                    output: o.typeforce.maybe(o.typeforce.Buffer),
                    data: o.typeforce.maybe(o.typeforce.arrayOf(o.typeforce.Buffer))
                }, e);
                let r = e.network || n.bitcoin,
                    u = {
                        name: "embed",
                        network: r
                    };
                if (s.prop(u, "output", () => {
                        if (e.data) return i.compile([a.OP_RETURN].concat(e.data))
                    }), s.prop(u, "data", () => {
                        if (e.output) return i.decompile(e.output).slice(1)
                    }), t.validate && e.output) {
                    var l, f;
                    let t = i.decompile(e.output);
                    if (t[0] !== a.OP_RETURN || !t.slice(1).every(o.typeforce.Buffer)) throw TypeError("Output is invalid");
                    if (e.data && (l = e.data, f = u.data, !(l.length === f.length && l.every((e, t) => e.equals(f[t]))))) throw TypeError("Data mismatch")
                }
                return Object.assign(u, e)
            }
        },
        41303: function(e, t, r) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.p2tr = t.p2wsh = t.p2wpkh = t.p2sh = t.p2pkh = t.p2pk = t.p2ms = t.embed = void 0;
            let n = r(94812);
            Object.defineProperty(t, "embed", {
                enumerable: !0,
                get: function() {
                    return n.p2data
                }
            });
            let i = r(54126);
            Object.defineProperty(t, "p2ms", {
                enumerable: !0,
                get: function() {
                    return i.p2ms
                }
            });
            let o = r(1152);
            Object.defineProperty(t, "p2pk", {
                enumerable: !0,
                get: function() {
                    return o.p2pk
                }
            });
            let s = r(88389);
            Object.defineProperty(t, "p2pkh", {
                enumerable: !0,
                get: function() {
                    return s.p2pkh
                }
            });
            let a = r(28871);
            Object.defineProperty(t, "p2sh", {
                enumerable: !0,
                get: function() {
                    return a.p2sh
                }
            });
            let u = r(31819);
            Object.defineProperty(t, "p2wpkh", {
                enumerable: !0,
                get: function() {
                    return u.p2wpkh
                }
            });
            let l = r(89657);
            Object.defineProperty(t, "p2wsh", {
                enumerable: !0,
                get: function() {
                    return l.p2wsh
                }
            });
            let f = r(77840);
            Object.defineProperty(t, "p2tr", {
                enumerable: !0,
                get: function() {
                    return f.p2tr
                }
            })
        },
        83586: function(e, t) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.value = t.prop = void 0, t.prop = function(e, t, r) {
                Object.defineProperty(e, t, {
                    configurable: !0,
                    enumerable: !0,
                    get() {
                        let e = r.call(this);
                        return this[t] = e, e
                    },
                    set(e) {
                        Object.defineProperty(this, t, {
                            configurable: !0,
                            enumerable: !0,
                            value: e,
                            writable: !0
                        })
                    }
                })
            }, t.value = function(e) {
                let t;
                return () => void 0 !== t ? t : t = e()
            }
        },
        54126: function(e, t, r) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.p2ms = void 0;
            let n = r(69609),
                i = r(37692),
                o = r(25492),
                s = r(83586),
                a = i.OPS,
                u = a.OP_RESERVED;

            function l(e, t) {
                return e.length === t.length && e.every((e, r) => e.equals(t[r]))
            }
            t.p2ms = function(e, t) {
                if (!e.input && !e.output && !(e.pubkeys && void 0 !== e.m) && !e.signatures) throw TypeError("Not enough data");

                function r(e) {
                    return i.isCanonicalScriptSignature(e) || (t.allowIncomplete && e === a.OP_0) !== void 0
                }
                t = Object.assign({
                    validate: !0
                }, t || {}), (0, o.typeforce)({
                    network: o.typeforce.maybe(o.typeforce.Object),
                    m: o.typeforce.maybe(o.typeforce.Number),
                    n: o.typeforce.maybe(o.typeforce.Number),
                    output: o.typeforce.maybe(o.typeforce.Buffer),
                    pubkeys: o.typeforce.maybe(o.typeforce.arrayOf(o.isPoint)),
                    signatures: o.typeforce.maybe(o.typeforce.arrayOf(r)),
                    input: o.typeforce.maybe(o.typeforce.Buffer)
                }, e);
                let f = e.network || n.bitcoin,
                    c = {
                        network: f
                    },
                    h = [],
                    p = !1;

                function d(e) {
                    p || (p = !0, h = i.decompile(e), c.m = h[0] - u, c.n = h[h.length - 2] - u, c.pubkeys = h.slice(1, -2))
                }
                if (s.prop(c, "output", () => {
                        if (e.m && c.n && e.pubkeys) return i.compile([].concat(u + e.m, e.pubkeys, u + c.n, a.OP_CHECKMULTISIG))
                    }), s.prop(c, "m", () => {
                        if (c.output) return d(c.output), c.m
                    }), s.prop(c, "n", () => {
                        if (c.pubkeys) return c.pubkeys.length
                    }), s.prop(c, "pubkeys", () => {
                        if (e.output) return d(e.output), c.pubkeys
                    }), s.prop(c, "signatures", () => {
                        if (e.input) return i.decompile(e.input).slice(1)
                    }), s.prop(c, "input", () => {
                        if (e.signatures) return i.compile([a.OP_0].concat(e.signatures))
                    }), s.prop(c, "witness", () => {
                        if (c.input) return []
                    }), s.prop(c, "name", () => {
                        if (c.m && c.n) return `p2ms(${c.m} of ${c.n})`
                    }), t.validate) {
                    if (e.output) {
                        if (d(e.output), !o.typeforce.Number(h[0]) || !o.typeforce.Number(h[h.length - 2]) || h[h.length - 1] !== a.OP_CHECKMULTISIG || c.m <= 0 || c.n > 16 || c.m > c.n || c.n !== h.length - 3 || !c.pubkeys.every(e => (0, o.isPoint)(e))) throw TypeError("Output is invalid");
                        if (void 0 !== e.m && e.m !== c.m) throw TypeError("m mismatch");
                        if (void 0 !== e.n && e.n !== c.n) throw TypeError("n mismatch");
                        if (e.pubkeys && !l(e.pubkeys, c.pubkeys)) throw TypeError("Pubkeys mismatch")
                    }
                    if (e.pubkeys) {
                        if (void 0 !== e.n && e.n !== e.pubkeys.length) throw TypeError("Pubkey count mismatch");
                        if (c.n = e.pubkeys.length, c.n < c.m) throw TypeError("Pubkey count cannot be less than m")
                    }
                    if (e.signatures) {
                        if (e.signatures.length < c.m) throw TypeError("Not enough signatures provided");
                        if (e.signatures.length > c.m) throw TypeError("Too many signatures provided")
                    }
                    if (e.input) {
                        if (e.input[0] !== a.OP_0) throw TypeError("Input is invalid");
                        if (0 === c.signatures.length || !c.signatures.every(r)) throw TypeError("Input has invalid signature(s)");
                        if (e.signatures && !l(e.signatures, c.signatures)) throw TypeError("Signature mismatch");
                        if (void 0 !== e.m && e.m !== e.signatures.length) throw TypeError("Signature count mismatch")
                    }
                }
                return Object.assign(c, e)
            }
        },
        1152: function(e, t, r) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.p2pk = void 0;
            let n = r(69609),
                i = r(37692),
                o = r(25492),
                s = r(83586),
                a = i.OPS;
            t.p2pk = function(e, t) {
                if (!e.input && !e.output && !e.pubkey && !e.input && !e.signature) throw TypeError("Not enough data");
                t = Object.assign({
                    validate: !0
                }, t || {}), (0, o.typeforce)({
                    network: o.typeforce.maybe(o.typeforce.Object),
                    output: o.typeforce.maybe(o.typeforce.Buffer),
                    pubkey: o.typeforce.maybe(o.isPoint),
                    signature: o.typeforce.maybe(i.isCanonicalScriptSignature),
                    input: o.typeforce.maybe(o.typeforce.Buffer)
                }, e);
                let r = s.value(() => i.decompile(e.input)),
                    u = e.network || n.bitcoin,
                    l = {
                        name: "p2pk",
                        network: u
                    };
                if (s.prop(l, "output", () => {
                        if (e.pubkey) return i.compile([e.pubkey, a.OP_CHECKSIG])
                    }), s.prop(l, "pubkey", () => {
                        if (e.output) return e.output.slice(1, -1)
                    }), s.prop(l, "signature", () => {
                        if (e.input) return r()[0]
                    }), s.prop(l, "input", () => {
                        if (e.signature) return i.compile([e.signature])
                    }), s.prop(l, "witness", () => {
                        if (l.input) return []
                    }), t.validate) {
                    if (e.output) {
                        if (e.output[e.output.length - 1] !== a.OP_CHECKSIG) throw TypeError("Output is invalid");
                        if (!(0, o.isPoint)(l.pubkey)) throw TypeError("Output pubkey is invalid");
                        if (e.pubkey && !e.pubkey.equals(l.pubkey)) throw TypeError("Pubkey mismatch")
                    }
                    if (e.signature && e.input && !e.input.equals(l.input)) throw TypeError("Signature mismatch");
                    if (e.input) {
                        if (1 !== r().length) throw TypeError("Input is invalid");
                        if (!i.isCanonicalScriptSignature(l.signature)) throw TypeError("Input has invalid signature")
                    }
                }
                return Object.assign(l, e)
            }
        },
        88389: function(e, t, r) {
            "use strict";
            var n = r(91083).Buffer;
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.p2pkh = void 0;
            let i = r(4998),
                o = r(69609),
                s = r(37692),
                a = r(25492),
                u = r(83586),
                l = r(31378),
                f = s.OPS;
            t.p2pkh = function(e, t) {
                if (!e.address && !e.hash && !e.output && !e.pubkey && !e.input) throw TypeError("Not enough data");
                t = Object.assign({
                    validate: !0
                }, t || {}), (0, a.typeforce)({
                    network: a.typeforce.maybe(a.typeforce.Object),
                    address: a.typeforce.maybe(a.typeforce.String),
                    hash: a.typeforce.maybe(a.typeforce.BufferN(20)),
                    output: a.typeforce.maybe(a.typeforce.BufferN(25)),
                    pubkey: a.typeforce.maybe(a.isPoint),
                    signature: a.typeforce.maybe(s.isCanonicalScriptSignature),
                    input: a.typeforce.maybe(a.typeforce.Buffer)
                }, e);
                let r = u.value(() => {
                        let t = l.decode(e.address),
                            r = t.readUInt8(0),
                            n = t.slice(1);
                        return {
                            version: r,
                            hash: n
                        }
                    }),
                    c = u.value(() => s.decompile(e.input)),
                    h = e.network || o.bitcoin,
                    p = {
                        name: "p2pkh",
                        network: h
                    };
                if (u.prop(p, "address", () => {
                        if (!p.hash) return;
                        let e = n.allocUnsafe(21);
                        return e.writeUInt8(h.pubKeyHash, 0), p.hash.copy(e, 1), l.encode(e)
                    }), u.prop(p, "hash", () => e.output ? e.output.slice(3, 23) : e.address ? r().hash : e.pubkey || p.pubkey ? i.hash160(e.pubkey || p.pubkey) : void 0), u.prop(p, "output", () => {
                        if (p.hash) return s.compile([f.OP_DUP, f.OP_HASH160, p.hash, f.OP_EQUALVERIFY, f.OP_CHECKSIG])
                    }), u.prop(p, "pubkey", () => {
                        if (e.input) return c()[1]
                    }), u.prop(p, "signature", () => {
                        if (e.input) return c()[0]
                    }), u.prop(p, "input", () => {
                        if (e.pubkey && e.signature) return s.compile([e.signature, e.pubkey])
                    }), u.prop(p, "witness", () => {
                        if (p.input) return []
                    }), t.validate) {
                    let t = n.from([]);
                    if (e.address) {
                        if (r().version !== h.pubKeyHash) throw TypeError("Invalid version or Network mismatch");
                        if (20 !== r().hash.length) throw TypeError("Invalid address");
                        t = r().hash
                    }
                    if (e.hash) {
                        if (t.length > 0 && !t.equals(e.hash)) throw TypeError("Hash mismatch");
                        t = e.hash
                    }
                    if (e.output) {
                        if (25 !== e.output.length || e.output[0] !== f.OP_DUP || e.output[1] !== f.OP_HASH160 || 20 !== e.output[2] || e.output[23] !== f.OP_EQUALVERIFY || e.output[24] !== f.OP_CHECKSIG) throw TypeError("Output is invalid");
                        let r = e.output.slice(3, 23);
                        if (t.length > 0 && !t.equals(r)) throw TypeError("Hash mismatch");
                        t = r
                    }
                    if (e.pubkey) {
                        let r = i.hash160(e.pubkey);
                        if (t.length > 0 && !t.equals(r)) throw TypeError("Hash mismatch");
                        t = r
                    }
                    if (e.input) {
                        let r = c();
                        if (2 !== r.length) throw TypeError("Input is invalid");
                        if (!s.isCanonicalScriptSignature(r[0])) throw TypeError("Input has invalid signature");
                        if (!(0, a.isPoint)(r[1])) throw TypeError("Input has invalid pubkey");
                        if (e.signature && !e.signature.equals(r[0])) throw TypeError("Signature mismatch");
                        if (e.pubkey && !e.pubkey.equals(r[1])) throw TypeError("Pubkey mismatch");
                        let n = i.hash160(r[1]);
                        if (t.length > 0 && !t.equals(n)) throw TypeError("Hash mismatch")
                    }
                }
                return Object.assign(p, e)
            }
        },
        28871: function(e, t, r) {
            "use strict";
            var n = r(91083).Buffer;
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.p2sh = void 0;
            let i = r(4998),
                o = r(69609),
                s = r(37692),
                a = r(25492),
                u = r(83586),
                l = r(31378),
                f = s.OPS;
            t.p2sh = function(e, t) {
                if (!e.address && !e.hash && !e.output && !e.redeem && !e.input) throw TypeError("Not enough data");
                t = Object.assign({
                    validate: !0
                }, t || {}), (0, a.typeforce)({
                    network: a.typeforce.maybe(a.typeforce.Object),
                    address: a.typeforce.maybe(a.typeforce.String),
                    hash: a.typeforce.maybe(a.typeforce.BufferN(20)),
                    output: a.typeforce.maybe(a.typeforce.BufferN(23)),
                    redeem: a.typeforce.maybe({
                        network: a.typeforce.maybe(a.typeforce.Object),
                        output: a.typeforce.maybe(a.typeforce.Buffer),
                        input: a.typeforce.maybe(a.typeforce.Buffer),
                        witness: a.typeforce.maybe(a.typeforce.arrayOf(a.typeforce.Buffer))
                    }),
                    input: a.typeforce.maybe(a.typeforce.Buffer),
                    witness: a.typeforce.maybe(a.typeforce.arrayOf(a.typeforce.Buffer))
                }, e);
                let r = e.network;
                r || (r = e.redeem && e.redeem.network || o.bitcoin);
                let c = {
                        network: r
                    },
                    h = u.value(() => {
                        let t = l.decode(e.address),
                            r = t.readUInt8(0),
                            n = t.slice(1);
                        return {
                            version: r,
                            hash: n
                        }
                    }),
                    p = u.value(() => s.decompile(e.input)),
                    d = u.value(() => {
                        let t = p(),
                            i = t[t.length - 1];
                        return {
                            network: r,
                            output: i === f.OP_FALSE ? n.from([]) : i,
                            input: s.compile(t.slice(0, -1)),
                            witness: e.witness || []
                        }
                    });
                if (u.prop(c, "address", () => {
                        if (!c.hash) return;
                        let e = n.allocUnsafe(21);
                        return e.writeUInt8(c.network.scriptHash, 0), c.hash.copy(e, 1), l.encode(e)
                    }), u.prop(c, "hash", () => e.output ? e.output.slice(2, 22) : e.address ? h().hash : c.redeem && c.redeem.output ? i.hash160(c.redeem.output) : void 0), u.prop(c, "output", () => {
                        if (c.hash) return s.compile([f.OP_HASH160, c.hash, f.OP_EQUAL])
                    }), u.prop(c, "redeem", () => {
                        if (e.input) return d()
                    }), u.prop(c, "input", () => {
                        if (e.redeem && e.redeem.input && e.redeem.output) return s.compile([].concat(s.decompile(e.redeem.input), e.redeem.output))
                    }), u.prop(c, "witness", () => c.redeem && c.redeem.witness ? c.redeem.witness : c.input ? [] : void 0), u.prop(c, "name", () => {
                        let e = ["p2sh"];
                        return void 0 !== c.redeem && void 0 !== c.redeem.name && e.push(c.redeem.name), e.join("-")
                    }), t.validate) {
                    let t = n.from([]);
                    if (e.address) {
                        if (h().version !== r.scriptHash) throw TypeError("Invalid version or Network mismatch");
                        if (20 !== h().hash.length) throw TypeError("Invalid address");
                        t = h().hash
                    }
                    if (e.hash) {
                        if (t.length > 0 && !t.equals(e.hash)) throw TypeError("Hash mismatch");
                        t = e.hash
                    }
                    if (e.output) {
                        if (23 !== e.output.length || e.output[0] !== f.OP_HASH160 || 20 !== e.output[1] || e.output[22] !== f.OP_EQUAL) throw TypeError("Output is invalid");
                        let r = e.output.slice(2, 22);
                        if (t.length > 0 && !t.equals(r)) throw TypeError("Hash mismatch");
                        t = r
                    }
                    let o = e => {
                        if (e.output) {
                            let r = s.decompile(e.output);
                            if (!r || r.length < 1) throw TypeError("Redeem.output too short");
                            let n = i.hash160(e.output);
                            if (t.length > 0 && !t.equals(n)) throw TypeError("Hash mismatch");
                            t = n
                        }
                        if (e.input) {
                            let t = e.input.length > 0,
                                r = e.witness && e.witness.length > 0;
                            if (!t && !r) throw TypeError("Empty input");
                            if (t && r) throw TypeError("Input and witness provided");
                            if (t) {
                                let t = s.decompile(e.input);
                                if (!s.isPushOnly(t)) throw TypeError("Non push-only scriptSig")
                            }
                        }
                    };
                    if (e.input) {
                        let e = p();
                        if (!e || e.length < 1) throw TypeError("Input too short");
                        if (!n.isBuffer(d().output)) throw TypeError("Input is invalid");
                        o(d())
                    }
                    if (e.redeem) {
                        if (e.redeem.network && e.redeem.network !== r) throw TypeError("Network mismatch");
                        if (e.input) {
                            let t = d();
                            if (e.redeem.output && !e.redeem.output.equals(t.output)) throw TypeError("Redeem.output mismatch");
                            if (e.redeem.input && !e.redeem.input.equals(t.input)) throw TypeError("Redeem.input mismatch")
                        }
                        o(e.redeem)
                    }
                    if (e.witness) {
                        var y, g;
                        if (e.redeem && e.redeem.witness && (y = e.redeem.witness, g = e.witness, !(y.length === g.length && y.every((e, t) => e.equals(g[t]))))) throw TypeError("Witness and redeem.witness mismatch")
                    }
                }
                return Object.assign(c, e)
            }
        },
        77840: function(e, t, r) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.p2tr = void 0;
            let n = r(91083),
                i = r(69609),
                o = r(37692),
                s = r(25492),
                a = r(36414),
                u = r(47107),
                l = r(83586),
                f = r(38621),
                c = o.OPS;
            t.p2tr = function(e, t) {
                if (!e.address && !e.output && !e.pubkey && !e.internalPubkey && !(e.witness && e.witness.length > 1)) throw TypeError("Not enough data");
                t = Object.assign({
                    validate: !0
                }, t || {}), (0, s.typeforce)({
                    address: s.typeforce.maybe(s.typeforce.String),
                    input: s.typeforce.maybe(s.typeforce.BufferN(0)),
                    network: s.typeforce.maybe(s.typeforce.Object),
                    output: s.typeforce.maybe(s.typeforce.BufferN(34)),
                    internalPubkey: s.typeforce.maybe(s.typeforce.BufferN(32)),
                    hash: s.typeforce.maybe(s.typeforce.BufferN(32)),
                    pubkey: s.typeforce.maybe(s.typeforce.BufferN(32)),
                    signature: s.typeforce.maybe(s.typeforce.BufferN(64)),
                    witness: s.typeforce.maybe(s.typeforce.arrayOf(s.typeforce.Buffer)),
                    scriptTree: s.typeforce.maybe(s.isTaptree),
                    redeem: s.typeforce.maybe({
                        output: s.typeforce.maybe(s.typeforce.Buffer),
                        redeemVersion: s.typeforce.maybe(s.typeforce.Number),
                        witness: s.typeforce.maybe(s.typeforce.arrayOf(s.typeforce.Buffer))
                    }),
                    redeemVersion: s.typeforce.maybe(s.typeforce.Number)
                }, e);
                let r = l.value(() => {
                        let t = f.bech32m.decode(e.address),
                            r = t.words.shift(),
                            i = f.bech32m.fromWords(t.words);
                        return {
                            version: r,
                            prefix: t.prefix,
                            data: n.Buffer.from(i)
                        }
                    }),
                    h = l.value(() => {
                        if (e.witness && e.witness.length) return e.witness.length >= 2 && 80 === e.witness[e.witness.length - 1][0] ? e.witness.slice(0, -1) : e.witness.slice()
                    }),
                    p = l.value(() => e.scriptTree ? (0, u.toHashTree)(e.scriptTree) : e.hash ? {
                        hash: e.hash
                    } : void 0),
                    d = e.network || i.bitcoin,
                    y = {
                        name: "p2tr",
                        network: d
                    };
                if (l.prop(y, "address", () => {
                        if (!y.pubkey) return;
                        let e = f.bech32m.toWords(y.pubkey);
                        return e.unshift(1), f.bech32m.encode(d.bech32, e)
                    }), l.prop(y, "hash", () => {
                        let e = p();
                        if (e) return e.hash;
                        let t = h();
                        if (t && t.length > 1) {
                            let e = t[t.length - 1],
                                r = e[0] & s.TAPLEAF_VERSION_MASK,
                                n = t[t.length - 2],
                                i = (0, u.tapleafHash)({
                                    output: n,
                                    version: r
                                });
                            return (0, u.rootHashFromPath)(e, i)
                        }
                        return null
                    }), l.prop(y, "output", () => {
                        if (y.pubkey) return o.compile([c.OP_1, y.pubkey])
                    }), l.prop(y, "redeemVersion", () => e.redeemVersion ? e.redeemVersion : e.redeem && void 0 !== e.redeem.redeemVersion && null !== e.redeem.redeemVersion ? e.redeem.redeemVersion : u.LEAF_VERSION_TAPSCRIPT), l.prop(y, "redeem", () => {
                        let e = h();
                        if (e && !(e.length < 2)) return {
                            output: e[e.length - 2],
                            witness: e.slice(0, -2),
                            redeemVersion: e[e.length - 1][0] & s.TAPLEAF_VERSION_MASK
                        }
                    }), l.prop(y, "pubkey", () => {
                        if (e.pubkey) return e.pubkey;
                        if (e.output) return e.output.slice(2);
                        if (e.address) return r().data;
                        if (y.internalPubkey) {
                            let e = (0, u.tweakKey)(y.internalPubkey, y.hash);
                            if (e) return e.x
                        }
                    }), l.prop(y, "internalPubkey", () => {
                        if (e.internalPubkey) return e.internalPubkey;
                        let t = h();
                        if (t && t.length > 1) return t[t.length - 1].slice(1, 33)
                    }), l.prop(y, "signature", () => {
                        if (e.signature) return e.signature;
                        let t = h();
                        if (t && 1 === t.length) return t[0]
                    }), l.prop(y, "witness", () => {
                        if (e.witness) return e.witness;
                        let t = p();
                        if (t && e.redeem && e.redeem.output && e.internalPubkey) {
                            let r = (0, u.tapleafHash)({
                                    output: e.redeem.output,
                                    version: y.redeemVersion
                                }),
                                i = (0, u.findScriptPath)(t, r);
                            if (!i) return;
                            let o = (0, u.tweakKey)(e.internalPubkey, t.hash);
                            if (!o) return;
                            let s = n.Buffer.concat([n.Buffer.from([y.redeemVersion | o.parity]), e.internalPubkey].concat(i));
                            return [e.redeem.output, s]
                        }
                        if (e.signature) return [e.signature]
                    }), t.validate) {
                    let t = n.Buffer.from([]);
                    if (e.address) {
                        if (d && d.bech32 !== r().prefix) throw TypeError("Invalid prefix or Network mismatch");
                        if (1 !== r().version) throw TypeError("Invalid address version");
                        if (32 !== r().data.length) throw TypeError("Invalid address data");
                        t = r().data
                    }
                    if (e.pubkey) {
                        if (t.length > 0 && !t.equals(e.pubkey)) throw TypeError("Pubkey mismatch");
                        t = e.pubkey
                    }
                    if (e.output) {
                        if (34 !== e.output.length || e.output[0] !== c.OP_1 || 32 !== e.output[1]) throw TypeError("Output is invalid");
                        if (t.length > 0 && !t.equals(e.output.slice(2))) throw TypeError("Pubkey mismatch");
                        t = e.output.slice(2)
                    }
                    if (e.internalPubkey) {
                        let r = (0, u.tweakKey)(e.internalPubkey, y.hash);
                        if (t.length > 0 && !t.equals(r.x)) throw TypeError("Pubkey mismatch");
                        t = r.x
                    }
                    if (t && t.length && !(0, a.getEccLib)().isXOnlyPoint(t)) throw TypeError("Invalid pubkey for p2tr");
                    let i = p();
                    if (e.hash && i && !e.hash.equals(i.hash)) throw TypeError("Hash mismatch");
                    if (e.redeem && e.redeem.output && i) {
                        let t = (0, u.tapleafHash)({
                            output: e.redeem.output,
                            version: y.redeemVersion
                        });
                        if (!(0, u.findScriptPath)(i, t)) throw TypeError("Redeem script not in tree")
                    }
                    let l = h();
                    if (e.redeem && y.redeem) {
                        var g, b;
                        if (e.redeem.redeemVersion && e.redeem.redeemVersion !== y.redeem.redeemVersion) throw TypeError("Redeem.redeemVersion and witness mismatch");
                        if (e.redeem.output) {
                            if (0 === o.decompile(e.redeem.output).length) throw TypeError("Redeem.output is invalid");
                            if (y.redeem.output && !e.redeem.output.equals(y.redeem.output)) throw TypeError("Redeem.output and witness mismatch")
                        }
                        if (e.redeem.witness && y.redeem.witness && (g = e.redeem.witness, b = y.redeem.witness, !(g.length === b.length && g.every((e, t) => e.equals(b[t]))))) throw TypeError("Redeem.witness and witness mismatch")
                    }
                    if (l && l.length) {
                        if (1 === l.length) {
                            if (e.signature && !e.signature.equals(l[0])) throw TypeError("Signature mismatch")
                        } else {
                            let r = l[l.length - 1];
                            if (r.length < 33) throw TypeError(`The control-block length is too small. Got ${r.length}, expected min 33.`);
                            if ((r.length - 33) % 32 != 0) throw TypeError(`The control-block length of ${r.length} is incorrect!`);
                            let n = (r.length - 33) / 32;
                            if (n > 128) throw TypeError(`The script path is too long. Got ${n}, expected max 128.`);
                            let i = r.slice(1, 33);
                            if (e.internalPubkey && !e.internalPubkey.equals(i)) throw TypeError("Internal pubkey mismatch");
                            if (!(0, a.getEccLib)().isXOnlyPoint(i)) throw TypeError("Invalid internalPubkey for p2tr witness");
                            let o = r[0] & s.TAPLEAF_VERSION_MASK,
                                f = l[l.length - 2],
                                c = (0, u.tapleafHash)({
                                    output: f,
                                    version: o
                                }),
                                h = (0, u.rootHashFromPath)(r, c),
                                p = (0, u.tweakKey)(i, h);
                            if (!p) throw TypeError("Invalid outputKey for p2tr witness");
                            if (t.length && !t.equals(p.x)) throw TypeError("Pubkey mismatch for p2tr witness");
                            if (p.parity !== (1 & r[0])) throw Error("Incorrect parity")
                        }
                    }
                }
                return Object.assign(y, e)
            }
        },
        31819: function(e, t, r) {
            "use strict";
            var n = r(91083).Buffer;
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.p2wpkh = void 0;
            let i = r(4998),
                o = r(69609),
                s = r(37692),
                a = r(25492),
                u = r(83586),
                l = r(38621),
                f = s.OPS,
                c = n.alloc(0);
            t.p2wpkh = function(e, t) {
                if (!e.address && !e.hash && !e.output && !e.pubkey && !e.witness) throw TypeError("Not enough data");
                t = Object.assign({
                    validate: !0
                }, t || {}), (0, a.typeforce)({
                    address: a.typeforce.maybe(a.typeforce.String),
                    hash: a.typeforce.maybe(a.typeforce.BufferN(20)),
                    input: a.typeforce.maybe(a.typeforce.BufferN(0)),
                    network: a.typeforce.maybe(a.typeforce.Object),
                    output: a.typeforce.maybe(a.typeforce.BufferN(22)),
                    pubkey: a.typeforce.maybe(a.isPoint),
                    signature: a.typeforce.maybe(s.isCanonicalScriptSignature),
                    witness: a.typeforce.maybe(a.typeforce.arrayOf(a.typeforce.Buffer))
                }, e);
                let r = u.value(() => {
                        let t = l.bech32.decode(e.address),
                            r = t.words.shift(),
                            i = l.bech32.fromWords(t.words);
                        return {
                            version: r,
                            prefix: t.prefix,
                            data: n.from(i)
                        }
                    }),
                    h = e.network || o.bitcoin,
                    p = {
                        name: "p2wpkh",
                        network: h
                    };
                if (u.prop(p, "address", () => {
                        if (!p.hash) return;
                        let e = l.bech32.toWords(p.hash);
                        return e.unshift(0), l.bech32.encode(h.bech32, e)
                    }), u.prop(p, "hash", () => e.output ? e.output.slice(2, 22) : e.address ? r().data : e.pubkey || p.pubkey ? i.hash160(e.pubkey || p.pubkey) : void 0), u.prop(p, "output", () => {
                        if (p.hash) return s.compile([f.OP_0, p.hash])
                    }), u.prop(p, "pubkey", () => e.pubkey ? e.pubkey : e.witness ? e.witness[1] : void 0), u.prop(p, "signature", () => {
                        if (e.witness) return e.witness[0]
                    }), u.prop(p, "input", () => {
                        if (p.witness) return c
                    }), u.prop(p, "witness", () => {
                        if (e.pubkey && e.signature) return [e.signature, e.pubkey]
                    }), t.validate) {
                    let t = n.from([]);
                    if (e.address) {
                        if (h && h.bech32 !== r().prefix) throw TypeError("Invalid prefix or Network mismatch");
                        if (0 !== r().version) throw TypeError("Invalid address version");
                        if (20 !== r().data.length) throw TypeError("Invalid address data");
                        t = r().data
                    }
                    if (e.hash) {
                        if (t.length > 0 && !t.equals(e.hash)) throw TypeError("Hash mismatch");
                        t = e.hash
                    }
                    if (e.output) {
                        if (22 !== e.output.length || e.output[0] !== f.OP_0 || 20 !== e.output[1]) throw TypeError("Output is invalid");
                        if (t.length > 0 && !t.equals(e.output.slice(2))) throw TypeError("Hash mismatch");
                        t = e.output.slice(2)
                    }
                    if (e.pubkey) {
                        let r = i.hash160(e.pubkey);
                        if (t.length > 0 && !t.equals(r)) throw TypeError("Hash mismatch");
                        if (t = r, !(0, a.isPoint)(e.pubkey) || 33 !== e.pubkey.length) throw TypeError("Invalid pubkey for p2wpkh")
                    }
                    if (e.witness) {
                        if (2 !== e.witness.length) throw TypeError("Witness is invalid");
                        if (!s.isCanonicalScriptSignature(e.witness[0])) throw TypeError("Witness has invalid signature");
                        if (!(0, a.isPoint)(e.witness[1]) || 33 !== e.witness[1].length) throw TypeError("Witness has invalid pubkey");
                        if (e.signature && !e.signature.equals(e.witness[0])) throw TypeError("Signature mismatch");
                        if (e.pubkey && !e.pubkey.equals(e.witness[1])) throw TypeError("Pubkey mismatch");
                        let r = i.hash160(e.witness[1]);
                        if (t.length > 0 && !t.equals(r)) throw TypeError("Hash mismatch")
                    }
                }
                return Object.assign(p, e)
            }
        },
        89657: function(e, t, r) {
            "use strict";
            var n = r(91083).Buffer;
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.p2wsh = void 0;
            let i = r(4998),
                o = r(69609),
                s = r(37692),
                a = r(25492),
                u = r(83586),
                l = r(38621),
                f = s.OPS,
                c = n.alloc(0);

            function h(e) {
                return !!(n.isBuffer(e) && 65 === e.length && 4 === e[0] && (0, a.isPoint)(e))
            }
            t.p2wsh = function(e, t) {
                if (!e.address && !e.hash && !e.output && !e.redeem && !e.witness) throw TypeError("Not enough data");
                t = Object.assign({
                    validate: !0
                }, t || {}), (0, a.typeforce)({
                    network: a.typeforce.maybe(a.typeforce.Object),
                    address: a.typeforce.maybe(a.typeforce.String),
                    hash: a.typeforce.maybe(a.typeforce.BufferN(32)),
                    output: a.typeforce.maybe(a.typeforce.BufferN(34)),
                    redeem: a.typeforce.maybe({
                        input: a.typeforce.maybe(a.typeforce.Buffer),
                        network: a.typeforce.maybe(a.typeforce.Object),
                        output: a.typeforce.maybe(a.typeforce.Buffer),
                        witness: a.typeforce.maybe(a.typeforce.arrayOf(a.typeforce.Buffer))
                    }),
                    input: a.typeforce.maybe(a.typeforce.BufferN(0)),
                    witness: a.typeforce.maybe(a.typeforce.arrayOf(a.typeforce.Buffer))
                }, e);
                let r = u.value(() => {
                        let t = l.bech32.decode(e.address),
                            r = t.words.shift(),
                            i = l.bech32.fromWords(t.words);
                        return {
                            version: r,
                            prefix: t.prefix,
                            data: n.from(i)
                        }
                    }),
                    p = u.value(() => s.decompile(e.redeem.input)),
                    d = e.network;
                d || (d = e.redeem && e.redeem.network || o.bitcoin);
                let y = {
                    network: d
                };
                if (u.prop(y, "address", () => {
                        if (!y.hash) return;
                        let e = l.bech32.toWords(y.hash);
                        return e.unshift(0), l.bech32.encode(d.bech32, e)
                    }), u.prop(y, "hash", () => e.output ? e.output.slice(2) : e.address ? r().data : y.redeem && y.redeem.output ? i.sha256(y.redeem.output) : void 0), u.prop(y, "output", () => {
                        if (y.hash) return s.compile([f.OP_0, y.hash])
                    }), u.prop(y, "redeem", () => {
                        if (e.witness) return {
                            output: e.witness[e.witness.length - 1],
                            input: c,
                            witness: e.witness.slice(0, -1)
                        }
                    }), u.prop(y, "input", () => {
                        if (y.witness) return c
                    }), u.prop(y, "witness", () => {
                        if (e.redeem && e.redeem.input && e.redeem.input.length > 0 && e.redeem.output && e.redeem.output.length > 0) {
                            let t = s.toStack(p());
                            return y.redeem = Object.assign({
                                witness: t
                            }, e.redeem), y.redeem.input = c, [].concat(t, e.redeem.output)
                        }
                        if (e.redeem && e.redeem.output && e.redeem.witness) return [].concat(e.redeem.witness, e.redeem.output)
                    }), u.prop(y, "name", () => {
                        let e = ["p2wsh"];
                        return void 0 !== y.redeem && void 0 !== y.redeem.name && e.push(y.redeem.name), e.join("-")
                    }), t.validate) {
                    let t = n.from([]);
                    if (e.address) {
                        if (r().prefix !== d.bech32) throw TypeError("Invalid prefix or Network mismatch");
                        if (0 !== r().version) throw TypeError("Invalid address version");
                        if (32 !== r().data.length) throw TypeError("Invalid address data");
                        t = r().data
                    }
                    if (e.hash) {
                        if (t.length > 0 && !t.equals(e.hash)) throw TypeError("Hash mismatch");
                        t = e.hash
                    }
                    if (e.output) {
                        if (34 !== e.output.length || e.output[0] !== f.OP_0 || 32 !== e.output[1]) throw TypeError("Output is invalid");
                        let r = e.output.slice(2);
                        if (t.length > 0 && !t.equals(r)) throw TypeError("Hash mismatch");
                        t = r
                    }
                    if (e.redeem) {
                        var g, b;
                        if (e.redeem.network && e.redeem.network !== d) throw TypeError("Network mismatch");
                        if (e.redeem.input && e.redeem.input.length > 0 && e.redeem.witness && e.redeem.witness.length > 0) throw TypeError("Ambiguous witness source");
                        if (e.redeem.output) {
                            if (0 === s.decompile(e.redeem.output).length) throw TypeError("Redeem.output is invalid");
                            let r = i.sha256(e.redeem.output);
                            if (t.length > 0 && !t.equals(r)) throw TypeError("Hash mismatch");
                            t = r
                        }
                        if (e.redeem.input && !s.isPushOnly(p())) throw TypeError("Non push-only scriptSig");
                        if (e.witness && e.redeem.witness && (g = e.witness, b = e.redeem.witness, !(g.length === b.length && g.every((e, t) => e.equals(b[t]))))) throw TypeError("Witness and redeem.witness mismatch");
                        if (e.redeem.input && p().some(h) || e.redeem.output && (s.decompile(e.redeem.output) || []).some(h)) throw TypeError("redeem.input or redeem.output contains uncompressed pubkey")
                    }
                    if (e.witness && e.witness.length > 0) {
                        let t = e.witness[e.witness.length - 1];
                        if (e.redeem && e.redeem.output && !e.redeem.output.equals(t)) throw TypeError("Witness and redeem.output mismatch");
                        if (e.witness.some(h) || (s.decompile(t) || []).some(h)) throw TypeError("Witness contains uncompressed pubkey")
                    }
                }
                return Object.assign(y, e)
            }
        },
        37213: function(e, t, r) {
            "use strict";
            var n = r(91083).Buffer;
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.Psbt = void 0;
            let i = r(6654),
                o = r(77004),
                s = r(48944),
                a = r(91900),
                u = r(950),
                l = r(69609),
                f = r(41303),
                c = r(47107),
                h = r(37692),
                p = r(69648),
                d = r(88047),
                y = r(62829),
                g = {
                    network: l.bitcoin,
                    maximumFeeRate: 5e3
                };
            class b {
                static fromBase64(e, t = {}) {
                    let r = n.from(e, "base64");
                    return this.fromBuffer(r, t)
                }
                static fromHex(e, t = {}) {
                    let r = n.from(e, "hex");
                    return this.fromBuffer(r, t)
                }
                static fromBuffer(e, t = {}) {
                    let r = i.Psbt.fromBuffer(e, m),
                        n = new b(t, r);
                    return function(e, t) {
                        e.ins.forEach(e => {
                            I(t, e)
                        })
                    }(n.__CACHE.__TX, n.__CACHE), n
                }
                constructor(e = {}, t = new i.Psbt(new w)) {
                    this.data = t, this.opts = Object.assign({}, g, e), this.__CACHE = {
                        __NON_WITNESS_UTXO_TX_CACHE: [],
                        __NON_WITNESS_UTXO_BUF_CACHE: [],
                        __TX_IN_CACHE: {},
                        __TX: this.data.globalMap.unsignedTx.tx,
                        __UNSAFE_SIGN_NONSEGWIT: !1
                    }, 0 === this.data.inputs.length && this.setVersion(2);
                    let r = (e, t, r, n) => Object.defineProperty(e, t, {
                        enumerable: r,
                        writable: n
                    });
                    r(this, "__CACHE", !1, !0), r(this, "opts", !1, !0)
                }
                get inputCount() {
                    return this.data.inputs.length
                }
                get version() {
                    return this.__CACHE.__TX.version
                }
                set version(e) {
                    this.setVersion(e)
                }
                get locktime() {
                    return this.__CACHE.__TX.locktime
                }
                set locktime(e) {
                    this.setLocktime(e)
                }
                get txInputs() {
                    return this.__CACHE.__TX.ins.map(e => ({
                        hash: (0, u.cloneBuffer)(e.hash),
                        index: e.index,
                        sequence: e.sequence
                    }))
                }
                get txOutputs() {
                    return this.__CACHE.__TX.outs.map(e => {
                        let t;
                        try {
                            t = (0, a.fromOutputScript)(e.script, this.opts.network)
                        } catch (e) {}
                        return {
                            script: (0, u.cloneBuffer)(e.script),
                            value: e.value,
                            address: t
                        }
                    })
                }
                combine(...e) {
                    return this.data.combine(...e.map(e => e.data)), this
                }
                clone() {
                    let e = b.fromBuffer(this.data.toBuffer());
                    return e.opts = JSON.parse(JSON.stringify(this.opts)), e
                }
                setMaximumFeeRate(e) {
                    T(e), this.opts.maximumFeeRate = e
                }
                setVersion(e) {
                    T(e), A(this.data.inputs, "setVersion");
                    let t = this.__CACHE;
                    return t.__TX.version = e, t.__EXTRACTED_TX = void 0, this
                }
                setLocktime(e) {
                    T(e), A(this.data.inputs, "setLocktime");
                    let t = this.__CACHE;
                    return t.__TX.locktime = e, t.__EXTRACTED_TX = void 0, this
                }
                setInputSequence(e, t) {
                    T(t), A(this.data.inputs, "setInputSequence");
                    let r = this.__CACHE;
                    if (r.__TX.ins.length <= e) throw Error("Input index too high");
                    return r.__TX.ins[e].sequence = t, r.__EXTRACTED_TX = void 0, this
                }
                addInputs(e) {
                    return e.forEach(e => this.addInput(e)), this
                }
                addInput(e) {
                    if (arguments.length > 1 || !e || void 0 === e.hash || void 0 === e.index) throw Error("Invalid arguments for Psbt.addInput. Requires single object with at least [hash] and [index]");
                    (0, d.checkTaprootInputFields)(e, e, "addInput"), A(this.data.inputs, "addInput"), e.witnessScript && q(e.witnessScript);
                    let t = this.__CACHE;
                    this.data.addInput(e);
                    let r = t.__TX.ins[t.__TX.ins.length - 1];
                    I(t, r);
                    let n = this.data.inputs.length - 1,
                        i = this.data.inputs[n];
                    return i.nonWitnessUtxo && D(this.__CACHE, i, n), t.__FEE = void 0, t.__FEE_RATE = void 0, t.__EXTRACTED_TX = void 0, this
                }
                addOutputs(e) {
                    return e.forEach(e => this.addOutput(e)), this
                }
                addOutput(e) {
                    if (arguments.length > 1 || !e || void 0 === e.value || void 0 === e.address && void 0 === e.script) throw Error("Invalid arguments for Psbt.addOutput. Requires single object with at least [script or address] and [value]");
                    A(this.data.inputs, "addOutput");
                    let {
                        address: t
                    } = e;
                    if ("string" == typeof t) {
                        let {
                            network: r
                        } = this.opts, n = (0, a.toOutputScript)(t, r);
                        e = Object.assign(e, {
                            script: n
                        })
                    }(0, d.checkTaprootOutputFields)(e, e, "addOutput");
                    let r = this.__CACHE;
                    return this.data.addOutput(e), r.__FEE = void 0, r.__FEE_RATE = void 0, r.__EXTRACTED_TX = void 0, this
                }
                extractTransaction(e) {
                    if (!this.data.inputs.every(v)) throw Error("Not finalized");
                    let t = this.__CACHE;
                    if (e || function(e, t, r) {
                            let n = t.__FEE_RATE || e.getFeeRate(),
                                i = t.__EXTRACTED_TX.virtualSize();
                            if (n >= r.maximumFeeRate) throw Error(`Warning: You are paying around ${(n*i/1e8).toFixed(8)} in fees, which is ${n} satoshi per byte for a transaction with a VSize of ${i} bytes (segwit counted as 0.25 byte per byte). Use setMaximumFeeRate method to raise your threshold, or pass true to the first arg of extractTransaction.`)
                        }(this, t, this.opts), t.__EXTRACTED_TX) return t.__EXTRACTED_TX;
                    let r = t.__TX.clone();
                    return M(this.data.inputs, r, t, !0), r
                }
                getFeeRate() {
                    return R("__FEE_RATE", "fee rate", this.data.inputs, this.__CACHE)
                }
                getFee() {
                    return R("__FEE", "fee", this.data.inputs, this.__CACHE)
                }
                finalizeAllInputs() {
                    return (0, s.checkForInput)(this.data.inputs, 0), z(this.data.inputs.length).forEach(e => this.finalizeInput(e)), this
                }
                finalizeInput(e, t) {
                    let r = (0, s.checkForInput)(this.data.inputs, e);
                    return (0, d.isTaprootInput)(r) ? this._finalizeTaprootInput(e, r, void 0, t) : this._finalizeInput(e, r, t)
                }
                finalizeTaprootInput(e, t, r = d.tapScriptFinalizer) {
                    let n = (0, s.checkForInput)(this.data.inputs, e);
                    if ((0, d.isTaprootInput)(n)) return this._finalizeTaprootInput(e, n, t, r);
                    throw Error(`Cannot finalize input #${e}. Not Taproot.`)
                }
                _finalizeInput(e, t, r = B) {
                    let {
                        script: n,
                        isP2SH: i,
                        isP2WSH: o,
                        isSegwit: s
                    } = function(e, t, r) {
                        let n = r.__TX,
                            i = {
                                script: null,
                                isSegwit: !1,
                                isP2SH: !1,
                                isP2WSH: !1
                            };
                        if (i.isP2SH = !!t.redeemScript, i.isP2WSH = !!t.witnessScript, t.witnessScript) i.script = t.witnessScript;
                        else if (t.redeemScript) i.script = t.redeemScript;
                        else if (t.nonWitnessUtxo) {
                            let o = F(r, t, e),
                                s = n.ins[e].index;
                            i.script = o.outs[s].script
                        } else t.witnessUtxo && (i.script = t.witnessUtxo.script);
                        return (t.witnessScript || (0, y.isP2WPKH)(i.script)) && (i.isSegwit = !0), i
                    }(e, t, this.__CACHE);
                    if (!n) throw Error(`No script found for input #${e}`);
                    ! function(e) {
                        if (!e.sighashType || !e.partialSig) return;
                        let {
                            partialSig: t,
                            sighashType: r
                        } = e;
                        t.forEach(e => {
                            let {
                                hashType: t
                            } = h.signature.decode(e.signature);
                            if (r !== t) throw Error("Signature sighash does not match input sighash type")
                        })
                    }(t);
                    let {
                        finalScriptSig: a,
                        finalScriptWitness: u
                    } = r(e, t, n, s, i, o);
                    if (a && this.data.updateInput(e, {
                            finalScriptSig: a
                        }), u && this.data.updateInput(e, {
                            finalScriptWitness: u
                        }), !a && !u) throw Error(`Unknown error finalizing input #${e}`);
                    return this.data.clearFinalizedInput(e), this
                }
                _finalizeTaprootInput(e, t, r, n = d.tapScriptFinalizer) {
                    if (!t.witnessUtxo) throw Error(`Cannot finalize input #${e}. Missing withness utxo.`);
                    if (t.tapKeySig) {
                        let r = f.p2tr({
                                output: t.witnessUtxo.script,
                                signature: t.tapKeySig
                            }),
                            n = (0, y.witnessStackToScriptWitness)(r.witness);
                        this.data.updateInput(e, {
                            finalScriptWitness: n
                        })
                    } else {
                        let {
                            finalScriptWitness: i
                        } = n(e, t, r);
                        this.data.updateInput(e, {
                            finalScriptWitness: i
                        })
                    }
                    return this.data.clearFinalizedInput(e), this
                }
                getInputType(e) {
                    let t = (0, s.checkForInput)(this.data.inputs, e),
                        r = W(e, t, this.__CACHE),
                        i = $(r, e, "input", t.redeemScript || function(e) {
                            if (!e) return;
                            let t = h.decompile(e);
                            if (!t) return;
                            let r = t[t.length - 1];
                            if (!n.isBuffer(r) || K(r) || h.isCanonicalScriptSignature(r)) return;
                            let i = h.decompile(r);
                            if (i) return r
                        }(t.finalScriptSig), t.witnessScript || function(e) {
                            if (!e) return;
                            let t = j(e),
                                r = t[t.length - 1];
                            if (K(r)) return;
                            let n = h.decompile(r);
                            if (n) return r
                        }(t.finalScriptWitness)),
                        o = "raw" === i.type ? "" : i.type + "-",
                        a = G(i.meaningfulScript);
                    return o + a
                }
                inputHasPubkey(e, t) {
                    let r = (0, s.checkForInput)(this.data.inputs, e);
                    return function(e, t, r, n) {
                        let i = W(r, t, n),
                            {
                                meaningfulScript: o
                            } = $(i, r, "input", t.redeemScript, t.witnessScript);
                        return (0, y.pubkeyInScript)(e, o)
                    }(t, r, e, this.__CACHE)
                }
                inputHasHDKey(e, t) {
                    let r = (0, s.checkForInput)(this.data.inputs, e),
                        n = _(t);
                    return !!r.bip32Derivation && r.bip32Derivation.some(n)
                }
                outputHasPubkey(e, t) {
                    let r = (0, s.checkForOutput)(this.data.outputs, e);
                    return function(e, t, r, n) {
                        let i = n.__TX.outs[r].script,
                            {
                                meaningfulScript: o
                            } = $(i, r, "output", t.redeemScript, t.witnessScript);
                        return (0, y.pubkeyInScript)(e, o)
                    }(t, r, e, this.__CACHE)
                }
                outputHasHDKey(e, t) {
                    let r = (0, s.checkForOutput)(this.data.outputs, e),
                        n = _(t);
                    return !!r.bip32Derivation && r.bip32Derivation.some(n)
                }
                validateSignaturesOfAllInputs(e) {
                    (0, s.checkForInput)(this.data.inputs, 0);
                    let t = z(this.data.inputs.length).map(t => this.validateSignaturesOfInput(t, e));
                    return t.reduce((e, t) => !0 === t && e, !0)
                }
                validateSignaturesOfInput(e, t, r) {
                    let n = this.data.inputs[e];
                    return (0, d.isTaprootInput)(n) ? this.validateSignaturesOfTaprootInput(e, t, r) : this._validateSignaturesOfInput(e, t, r)
                }
                _validateSignaturesOfInput(e, t, r) {
                    let n, i, o;
                    let s = this.data.inputs[e],
                        a = (s || {}).partialSig;
                    if (!s || !a || a.length < 1) throw Error("No signatures to validate");
                    if ("function" != typeof t) throw Error("Need validator function to validate signatures");
                    let u = r ? a.filter(e => e.pubkey.equals(r)) : a;
                    if (u.length < 1) throw Error("No signatures for this pubkey");
                    let l = [];
                    for (let r of u) {
                        let a = h.signature.decode(r.signature),
                            {
                                hash: u,
                                script: f
                            } = o !== a.hashType ? U(e, Object.assign({}, s, {
                                sighashType: a.hashType
                            }), this.__CACHE, !0) : {
                                hash: n,
                                script: i
                            };
                        o = a.hashType, n = u, i = f, O(r.pubkey, f, "verify"), l.push(t(r.pubkey, u, a.signature))
                    }
                    return l.every(e => !0 === e)
                }
                validateSignaturesOfTaprootInput(e, t, r) {
                    let n = this.data.inputs[e],
                        i = (n || {}).tapKeySig,
                        o = (n || {}).tapScriptSig;
                    if (!n && !i && !(o && !o.length)) throw Error("No signatures to validate");
                    if ("function" != typeof t) throw Error("Need validator function to validate signatures");
                    r = r && (0, d.toXOnly)(r);
                    let s = r ? C(e, n, this.data.inputs, r, this.__CACHE) : function(e, t, r, n) {
                        let i = [];
                        if (t.tapInternalKey) {
                            let r = (0, d.tweakInternalPubKey)(e, t);
                            i.push(r)
                        }
                        if (t.tapScriptSig) {
                            let e = t.tapScriptSig.map(e => e.pubkey);
                            i.push(...e)
                        }
                        let o = i.map(i => C(e, t, r, i, n));
                        return o.flat()
                    }(e, n, this.data.inputs, this.__CACHE);
                    if (!s.length) throw Error("No signatures for this pubkey");
                    let a = s.find(e => !!e.leafHash);
                    if (i && a) {
                        let e = t(a.pubkey, a.hash, i);
                        if (!e) return !1
                    }
                    if (o)
                        for (let e of o) {
                            let r = s.find(t => e.pubkey.equals(t.pubkey));
                            if (r) {
                                let n = t(e.pubkey, r.hash, e.signature);
                                if (!n) return !1
                            }
                        }
                    return !0
                }
                signAllInputsHD(e, t = [p.Transaction.SIGHASH_ALL]) {
                    if (!e || !e.publicKey || !e.fingerprint) throw Error("Need HDSigner to sign input");
                    let r = [];
                    for (let n of z(this.data.inputs.length)) try {
                        this.signInputHD(n, e, t), r.push(!0)
                    } catch (e) {
                        r.push(!1)
                    }
                    if (r.every(e => !1 === e)) throw Error("No inputs were signed");
                    return this
                }
                signAllInputsHDAsync(e, t = [p.Transaction.SIGHASH_ALL]) {
                    return new Promise((r, n) => {
                        if (!e || !e.publicKey || !e.fingerprint) return n(Error("Need HDSigner to sign input"));
                        let i = [],
                            o = [];
                        for (let r of z(this.data.inputs.length)) o.push(this.signInputHDAsync(r, e, t).then(() => {
                            i.push(!0)
                        }, () => {
                            i.push(!1)
                        }));
                        return Promise.all(o).then(() => {
                            if (i.every(e => !1 === e)) return n(Error("No inputs were signed"));
                            r()
                        })
                    })
                }
                signInputHD(e, t, r = [p.Transaction.SIGHASH_ALL]) {
                    if (!t || !t.publicKey || !t.fingerprint) throw Error("Need HDSigner to sign input");
                    let n = H(e, this.data.inputs, t);
                    return n.forEach(t => this.signInput(e, t, r)), this
                }
                signInputHDAsync(e, t, r = [p.Transaction.SIGHASH_ALL]) {
                    return new Promise((n, i) => {
                        if (!t || !t.publicKey || !t.fingerprint) return i(Error("Need HDSigner to sign input"));
                        let o = H(e, this.data.inputs, t),
                            s = o.map(t => this.signInputAsync(e, t, r));
                        return Promise.all(s).then(() => {
                            n()
                        }).catch(i)
                    })
                }
                signAllInputs(e, t) {
                    if (!e || !e.publicKey) throw Error("Need Signer to sign input");
                    let r = [];
                    for (let n of z(this.data.inputs.length)) try {
                        this.signInput(n, e, t), r.push(!0)
                    } catch (e) {
                        r.push(!1)
                    }
                    if (r.every(e => !1 === e)) throw Error("No inputs were signed");
                    return this
                }
                signAllInputsAsync(e, t) {
                    return new Promise((r, n) => {
                        if (!e || !e.publicKey) return n(Error("Need Signer to sign input"));
                        let i = [],
                            o = [];
                        for (let [r] of this.data.inputs.entries()) o.push(this.signInputAsync(r, e, t).then(() => {
                            i.push(!0)
                        }, () => {
                            i.push(!1)
                        }));
                        return Promise.all(o).then(() => {
                            if (i.every(e => !1 === e)) return n(Error("No inputs were signed"));
                            r()
                        })
                    })
                }
                signInput(e, t, r) {
                    if (!t || !t.publicKey) throw Error("Need Signer to sign input");
                    let n = (0, s.checkForInput)(this.data.inputs, e);
                    return (0, d.isTaprootInput)(n) ? this._signTaprootInput(e, n, t, void 0, r) : this._signInput(e, t, r)
                }
                signTaprootInput(e, t, r, n) {
                    if (!t || !t.publicKey) throw Error("Need Signer to sign input");
                    let i = (0, s.checkForInput)(this.data.inputs, e);
                    if ((0, d.isTaprootInput)(i)) return this._signTaprootInput(e, i, t, r, n);
                    throw Error(`Input #${e} is not of type Taproot.`)
                }
                _signInput(e, t, r = [p.Transaction.SIGHASH_ALL]) {
                    let {
                        hash: n,
                        sighashType: i
                    } = N(this.data.inputs, e, t.publicKey, this.__CACHE, r), o = [{
                        pubkey: t.publicKey,
                        signature: h.signature.encode(t.sign(n), i)
                    }];
                    return this.data.updateInput(e, {
                        partialSig: o
                    }), this
                }
                _signTaprootInput(e, t, r, n, i = [p.Transaction.SIGHASH_DEFAULT]) {
                    let o = this.checkTaprootHashesForSig(e, t, r, n, i),
                        s = o.filter(e => !e.leafHash).map(e => (0, d.serializeTaprootSignature)(r.signSchnorr(e.hash), t.sighashType))[0],
                        a = o.filter(e => !!e.leafHash).map(e => ({
                            pubkey: (0, d.toXOnly)(r.publicKey),
                            signature: (0, d.serializeTaprootSignature)(r.signSchnorr(e.hash), t.sighashType),
                            leafHash: e.leafHash
                        }));
                    return s && this.data.updateInput(e, {
                        tapKeySig: s
                    }), a.length && this.data.updateInput(e, {
                        tapScriptSig: a
                    }), this
                }
                signInputAsync(e, t, r) {
                    return Promise.resolve().then(() => {
                        if (!t || !t.publicKey) throw Error("Need Signer to sign input");
                        let n = (0, s.checkForInput)(this.data.inputs, e);
                        return (0, d.isTaprootInput)(n) ? this._signTaprootInputAsync(e, n, t, void 0, r) : this._signInputAsync(e, t, r)
                    })
                }
                signTaprootInputAsync(e, t, r, n) {
                    return Promise.resolve().then(() => {
                        if (!t || !t.publicKey) throw Error("Need Signer to sign input");
                        let i = (0, s.checkForInput)(this.data.inputs, e);
                        if ((0, d.isTaprootInput)(i)) return this._signTaprootInputAsync(e, i, t, r, n);
                        throw Error(`Input #${e} is not of type Taproot.`)
                    })
                }
                _signInputAsync(e, t, r = [p.Transaction.SIGHASH_ALL]) {
                    let {
                        hash: n,
                        sighashType: i
                    } = N(this.data.inputs, e, t.publicKey, this.__CACHE, r);
                    return Promise.resolve(t.sign(n)).then(r => {
                        let n = [{
                            pubkey: t.publicKey,
                            signature: h.signature.encode(r, i)
                        }];
                        this.data.updateInput(e, {
                            partialSig: n
                        })
                    })
                }
                async _signTaprootInputAsync(e, t, r, n, i = [p.Transaction.SIGHASH_DEFAULT]) {
                    let o = this.checkTaprootHashesForSig(e, t, r, n, i),
                        s = [],
                        a = o.filter(e => !e.leafHash)[0];
                    if (a) {
                        let e = Promise.resolve(r.signSchnorr(a.hash)).then(e => ({
                            tapKeySig: (0, d.serializeTaprootSignature)(e, t.sighashType)
                        }));
                        s.push(e)
                    }
                    let u = o.filter(e => !!e.leafHash);
                    if (u.length) {
                        let e = u.map(e => Promise.resolve(r.signSchnorr(e.hash)).then(n => {
                            let i = [{
                                pubkey: (0, d.toXOnly)(r.publicKey),
                                signature: (0, d.serializeTaprootSignature)(n, t.sighashType),
                                leafHash: e.leafHash
                            }];
                            return {
                                tapScriptSig: i
                            }
                        }));
                        s.push(...e)
                    }
                    return Promise.all(s).then(t => {
                        t.forEach(t => this.data.updateInput(e, t))
                    })
                }
                checkTaprootHashesForSig(e, t, r, n, i) {
                    if ("function" != typeof r.signSchnorr) throw Error(`Need Schnorr Signer to sign taproot input #${e}.`);
                    let o = C(e, t, this.data.inputs, r.publicKey, this.__CACHE, n, i);
                    if (!o || !o.length) throw Error(`Can not sign for input #${e} with the key ${r.publicKey.toString("hex")}`);
                    return o
                }
                toBuffer() {
                    return E(this.__CACHE), this.data.toBuffer()
                }
                toHex() {
                    return E(this.__CACHE), this.data.toHex()
                }
                toBase64() {
                    return E(this.__CACHE), this.data.toBase64()
                }
                updateGlobal(e) {
                    return this.data.updateGlobal(e), this
                }
                updateInput(e, t) {
                    return t.witnessScript && q(t.witnessScript), (0, d.checkTaprootInputFields)(this.data.inputs[e], t, "updateInput"), this.data.updateInput(e, t), t.nonWitnessUtxo && D(this.__CACHE, this.data.inputs[e], e), this
                }
                updateOutput(e, t) {
                    let r = this.data.outputs[e];
                    return (0, d.checkTaprootOutputFields)(r, t, "updateOutput"), this.data.updateOutput(e, t), this
                }
                addUnknownKeyValToGlobal(e) {
                    return this.data.addUnknownKeyValToGlobal(e), this
                }
                addUnknownKeyValToInput(e, t) {
                    return this.data.addUnknownKeyValToInput(e, t), this
                }
                addUnknownKeyValToOutput(e, t) {
                    return this.data.addUnknownKeyValToOutput(e, t), this
                }
                clearFinalizedInput(e) {
                    return this.data.clearFinalizedInput(e), this
                }
            }
            t.Psbt = b;
            let m = e => new w(e);
            class w {
                constructor(e = n.from([2, 0, 0, 0, 0, 0, 0, 0, 0, 0])) {
                    this.tx = p.Transaction.fromBuffer(e),
                        function(e) {
                            let t = e.ins.every(e => e.script && 0 === e.script.length && e.witness && 0 === e.witness.length);
                            if (!t) throw Error("Format Error: Transaction ScriptSigs are not empty")
                        }(this.tx), Object.defineProperty(this, "tx", {
                            enumerable: !1,
                            writable: !0
                        })
                }
                getInputOutputCounts() {
                    return {
                        inputCount: this.tx.ins.length,
                        outputCount: this.tx.outs.length
                    }
                }
                addInput(e) {
                    if (void 0 === e.hash || void 0 === e.index || !n.isBuffer(e.hash) && "string" != typeof e.hash || "number" != typeof e.index) throw Error("Error adding input.");
                    let t = "string" == typeof e.hash ? (0, u.reverseBuffer)(n.from(e.hash, "hex")) : e.hash;
                    this.tx.addInput(t, e.index, e.sequence)
                }
                addOutput(e) {
                    if (void 0 === e.script || void 0 === e.value || !n.isBuffer(e.script) || "number" != typeof e.value) throw Error("Error adding output.");
                    this.tx.addOutput(e.script, e.value)
                }
                toBuffer() {
                    return this.tx.toBuffer()
                }
            }

            function E(e) {
                if (!1 !== e.__UNSAFE_SIGN_NONSEGWIT) throw Error("Not BIP174 compliant, can not export")
            }

            function S(e, t, r) {
                let n;
                if (!t) return !1;
                if ((n = r ? r.map(e => {
                        let r = function(e) {
                            if (65 === e.length) {
                                let t = 1 & e[64],
                                    r = e.slice(0, 33);
                                return r[0] = 2 | t, r
                            }
                            return e.slice()
                        }(e);
                        return t.find(e => e.pubkey.equals(r))
                    }).filter(e => !!e) : t).length > e) throw Error("Too many signatures");
                return n.length === e
            }

            function v(e) {
                return !!e.finalScriptSig || !!e.finalScriptWitness
            }

            function _(e) {
                return t => !!(t.masterFingerprint.equals(e.fingerprint) && e.derivePath(t.path).publicKey.equals(t.pubkey))
            }

            function T(e) {
                if ("number" != typeof e || e !== Math.floor(e) || e > 4294967295 || e < 0) throw Error("Invalid 32 bit integer")
            }

            function A(e, t) {
                e.forEach(e => {
                    let r = (0, d.isTaprootInput)(e) ? (0, d.checkTaprootInputForSigs)(e, t) : (0, y.checkInputForSig)(e, t);
                    if (r) throw Error("Can not modify transaction, signatures exist.")
                })
            }

            function O(e, t, r) {
                if (!(0, y.pubkeyInScript)(e, t)) throw Error(`Can not ${r} for this input with the key ${e.toString("hex")}`)
            }

            function I(e, t) {
                let r = (0, u.reverseBuffer)(n.from(t.hash)).toString("hex") + ":" + t.index;
                if (e.__TX_IN_CACHE[r]) throw Error("Duplicate input detected.");
                e.__TX_IN_CACHE[r] = 1
            }

            function P(e, t) {
                return (r, n, i, o) => {
                    let s = e({
                        redeem: {
                            output: i
                        }
                    }).output;
                    if (!n.equals(s)) throw Error(`${t} for ${o} #${r} doesn't match the scriptPubKey in the prevout`)
                }
            }
            let k = P(f.p2sh, "Redeem script"),
                x = P(f.p2wsh, "Witness script");

            function R(e, t, r, n) {
                let i;
                if (!r.every(v)) throw Error(`PSBT must be finalized to calculate ${t}`);
                if ("__FEE_RATE" === e && n.__FEE_RATE) return n.__FEE_RATE;
                if ("__FEE" === e && n.__FEE) return n.__FEE;
                let o = !0;
                return (n.__EXTRACTED_TX ? (i = n.__EXTRACTED_TX, o = !1) : i = n.__TX.clone(), M(r, i, n, o), "__FEE_RATE" === e) ? n.__FEE_RATE : "__FEE" === e ? n.__FEE : void 0
            }

            function B(e, t, r, n, i, o) {
                let s = G(r);
                if (! function(e, t, r) {
                        switch (r) {
                            case "pubkey":
                            case "pubkeyhash":
                            case "witnesspubkeyhash":
                                return S(1, e.partialSig);
                            case "multisig":
                                let n = f.p2ms({
                                    output: t
                                });
                                return S(n.m, e.partialSig, n.pubkeys);
                            default:
                                return !1
                        }
                    }(t, r, s)) throw Error(`Can not finalize input #${e}`);
                return function(e, t, r, n, i, o) {
                    let s, a;
                    let u = function(e, t, r) {
                            let n;
                            switch (t) {
                                case "multisig":
                                    let i = function(e, t) {
                                        let r = f.p2ms({
                                            output: e
                                        });
                                        return r.pubkeys.map(e => (t.filter(t => t.pubkey.equals(e))[0] || {}).signature).filter(e => !!e)
                                    }(e, r);
                                    n = f.p2ms({
                                        output: e,
                                        signatures: i
                                    });
                                    break;
                                case "pubkey":
                                    n = f.p2pk({
                                        output: e,
                                        signature: r[0].signature
                                    });
                                    break;
                                case "pubkeyhash":
                                    n = f.p2pkh({
                                        output: e,
                                        pubkey: r[0].pubkey,
                                        signature: r[0].signature
                                    });
                                    break;
                                case "witnesspubkeyhash":
                                    n = f.p2wpkh({
                                        output: e,
                                        pubkey: r[0].pubkey,
                                        signature: r[0].signature
                                    })
                            }
                            return n
                        }(e, t, r),
                        l = o ? f.p2wsh({
                            redeem: u
                        }) : null,
                        c = i ? f.p2sh({
                            redeem: l || u
                        }) : null;
                    return n ? (a = l ? (0, y.witnessStackToScriptWitness)(l.witness) : (0, y.witnessStackToScriptWitness)(u.witness), c && (s = c.input)) : s = c ? c.input : u.input, {
                        finalScriptSig: s,
                        finalScriptWitness: a
                    }
                }(r, s, t.partialSig, n, i, o)
            }

            function N(e, t, r, n, i) {
                let o = (0, s.checkForInput)(e, t),
                    {
                        hash: a,
                        sighashType: u,
                        script: l
                    } = U(t, o, n, !1, i);
                return O(r, l, "sign"), {
                    hash: a,
                    sighashType: u
                }
            }

            function U(e, t, r, n, i) {
                let o, s;
                let a = r.__TX,
                    u = t.sighashType || p.Transaction.SIGHASH_ALL;
                if (L(u, i), t.nonWitnessUtxo) {
                    let n = F(r, t, e),
                        i = a.ins[e].hash,
                        o = n.getHash();
                    if (!i.equals(o)) throw Error(`Non-witness UTXO hash for input #${e} doesn't match the hash specified in the prevout`);
                    let u = a.ins[e].index;
                    s = n.outs[u]
                } else if (t.witnessUtxo) s = t.witnessUtxo;
                else throw Error("Need a Utxo input item for signing");
                let {
                    meaningfulScript: l,
                    type: c
                } = $(s.script, e, "input", t.redeemScript, t.witnessScript);
                if (["p2sh-p2wsh", "p2wsh"].indexOf(c) >= 0) o = a.hashForWitnessV0(e, l, s.value, u);
                else if ((0, y.isP2WPKH)(l)) {
                    let t = f.p2pkh({
                        hash: l.slice(2)
                    }).output;
                    o = a.hashForWitnessV0(e, t, s.value, u)
                } else {
                    if (void 0 === t.nonWitnessUtxo && !1 === r.__UNSAFE_SIGN_NONSEGWIT) throw Error(`Input #${e} has witnessUtxo but non-segwit script: ${l.toString("hex")}`);
                    n || !1 === r.__UNSAFE_SIGN_NONSEGWIT || console.warn("Warning: Signing non-segwit inputs without the full parent transaction means there is a chance that a miner could feed you incorrect information to trick you into paying large fees. This behavior is the same as Psbt's predecesor (TransactionBuilder - now removed) when signing non-segwit scripts. You are not able to export this Psbt with toBuffer|toBase64|toHex since it is not BIP174 compliant.\n*********************\nPROCEED WITH CAUTION!\n*********************"), o = a.hashForSignature(e, l, u)
                }
                return {
                    script: l,
                    sighashType: u,
                    hash: o
                }
            }

            function C(e, t, r, n, i, o, s) {
                let a = i.__TX,
                    u = t.sighashType || p.Transaction.SIGHASH_DEFAULT;
                L(u, s);
                let l = r.map((e, t) => V(t, e, i)),
                    f = l.map(e => e.script),
                    h = l.map(e => e.value),
                    g = [];
                if (t.tapInternalKey && !o) {
                    let r = (0, d.tweakInternalPubKey)(e, t);
                    if ((0, d.toXOnly)(n).equals(r)) {
                        let t = a.hashForWitnessV1(e, f, h, u);
                        g.push({
                            pubkey: n,
                            hash: t
                        })
                    }
                }
                let b = (t.tapLeafScript || []).filter(e => (0, y.pubkeyInScript)(n, e.script)).map(e => {
                    let t = (0, c.tapleafHash)({
                        output: e.script,
                        version: e.leafVersion
                    });
                    return Object.assign({
                        hash: t
                    }, e)
                }).filter(e => !o || o.equals(e.hash)).map(t => {
                    let r = a.hashForWitnessV1(e, f, h, p.Transaction.SIGHASH_DEFAULT, t.hash);
                    return {
                        pubkey: n,
                        hash: r,
                        leafHash: t.hash
                    }
                });
                return g.concat(b)
            }

            function L(e, t) {
                if (t && 0 > t.indexOf(e)) {
                    let t = function(e) {
                        let t = e & p.Transaction.SIGHASH_ANYONECANPAY ? "SIGHASH_ANYONECANPAY | " : "";
                        switch (31 & e) {
                            case p.Transaction.SIGHASH_ALL:
                                t += "SIGHASH_ALL";
                                break;
                            case p.Transaction.SIGHASH_SINGLE:
                                t += "SIGHASH_SINGLE";
                                break;
                            case p.Transaction.SIGHASH_NONE:
                                t += "SIGHASH_NONE"
                        }
                        return t
                    }(e);
                    throw Error(`Sighash type is not allowed. Retry the sign method passing the sighashTypes array of whitelisted types. Sighash type: ${t}`)
                }
            }

            function H(e, t, r) {
                let n = (0, s.checkForInput)(t, e);
                if (!n.bip32Derivation || 0 === n.bip32Derivation.length) throw Error("Need bip32Derivation to sign with HD");
                let i = n.bip32Derivation.map(e => e.masterFingerprint.equals(r.fingerprint) ? e : void 0).filter(e => !!e);
                if (0 === i.length) throw Error("Need one bip32Derivation masterFingerprint to match the HDSigner fingerprint");
                let o = i.map(e => {
                    let t = r.derivePath(e.path);
                    if (!e.pubkey.equals(t.publicKey)) throw Error("pubkey did not match bip32Derivation");
                    return t
                });
                return o
            }

            function j(e) {
                let t = 0;

                function r() {
                    let r = o.decode(e, t);
                    return t += o.decode.bytes, r
                }
                return function() {
                    let n = r(),
                        i = [];
                    for (let o = 0; o < n; o++) i.push(function() {
                        var n;
                        return n = r(), t += n, e.slice(t - n, t)
                    }());
                    return i
                }()
            }

            function D(e, t, r) {
                e.__NON_WITNESS_UTXO_BUF_CACHE[r] = t.nonWitnessUtxo;
                let n = p.Transaction.fromBuffer(t.nonWitnessUtxo);
                e.__NON_WITNESS_UTXO_TX_CACHE[r] = n, delete t.nonWitnessUtxo, Object.defineProperty(t, "nonWitnessUtxo", {
                    enumerable: !0,
                    get() {
                        let t = e.__NON_WITNESS_UTXO_BUF_CACHE[r],
                            n = e.__NON_WITNESS_UTXO_TX_CACHE[r];
                        if (void 0 !== t) return t; {
                            let t = n.toBuffer();
                            return e.__NON_WITNESS_UTXO_BUF_CACHE[r] = t, t
                        }
                    },
                    set(t) {
                        e.__NON_WITNESS_UTXO_BUF_CACHE[r] = t
                    }
                })
            }

            function M(e, t, r, n) {
                let i = 0;
                e.forEach((e, o) => {
                    if (n && e.finalScriptSig && (t.ins[o].script = e.finalScriptSig), n && e.finalScriptWitness && (t.ins[o].witness = j(e.finalScriptWitness)), e.witnessUtxo) i += e.witnessUtxo.value;
                    else if (e.nonWitnessUtxo) {
                        let n = F(r, e, o),
                            s = t.ins[o].index,
                            a = n.outs[s];
                        i += a.value
                    }
                });
                let o = t.outs.reduce((e, t) => e + t.value, 0),
                    s = i - o;
                if (s < 0) throw Error("Outputs are spending more than Inputs");
                let a = t.virtualSize();
                r.__FEE = s, r.__EXTRACTED_TX = t, r.__FEE_RATE = Math.floor(s / a)
            }

            function F(e, t, r) {
                let n = e.__NON_WITNESS_UTXO_TX_CACHE;
                return n[r] || D(e, t, r), n[r]
            }

            function W(e, t, r) {
                let {
                    script: n
                } = V(e, t, r);
                return n
            }

            function V(e, t, r) {
                if (void 0 !== t.witnessUtxo) return {
                    script: t.witnessUtxo.script,
                    value: t.witnessUtxo.value
                };
                if (void 0 !== t.nonWitnessUtxo) {
                    let n = F(r, t, e),
                        i = n.outs[r.__TX.ins[e].index];
                    return {
                        script: i.script,
                        value: i.value
                    }
                }
                throw Error("Can't find pubkey in input without Utxo data")
            }

            function K(e) {
                return 33 === e.length && h.isCanonicalPubKey(e)
            }

            function $(e, t, r, n, i) {
                let o;
                let s = (0, y.isP2SHScript)(e),
                    a = s && n && (0, y.isP2WSHScript)(n),
                    u = (0, y.isP2WSHScript)(e);
                if (s && void 0 === n) throw Error("scriptPubkey is P2SH but redeemScript missing");
                if ((u || a) && void 0 === i) throw Error("scriptPubkey or redeemScript is P2WSH but witnessScript missing");
                return a ? (o = i, k(t, e, n, r), x(t, n, i, r), q(o)) : u ? (o = i, x(t, e, i, r), q(o)) : s ? (o = n, k(t, e, n, r)) : o = e, {
                    meaningfulScript: o,
                    type: a ? "p2sh-p2wsh" : s ? "p2sh" : u ? "p2wsh" : "raw"
                }
            }

            function q(e) {
                if ((0, y.isP2WPKH)(e) || (0, y.isP2SHScript)(e)) throw Error("P2WPKH or P2SH can not be contained within P2WSH")
            }

            function G(e) {
                return (0, y.isP2WPKH)(e) ? "witnesspubkeyhash" : (0, y.isP2PKH)(e) ? "pubkeyhash" : (0, y.isP2MS)(e) ? "multisig" : (0, y.isP2PK)(e) ? "pubkey" : "nonstandard"
            }

            function z(e) {
                return [...Array(e).keys()]
            }
        },
        88047: function(e, t, r) {
            "use strict";
            var n = r(91083).Buffer;
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.checkTaprootInputForSigs = t.tapTreeFromList = t.tapTreeToList = t.tweakInternalPubKey = t.checkTaprootOutputFields = t.checkTaprootInputFields = t.isTaprootOutput = t.isTaprootInput = t.serializeTaprootSignature = t.tapScriptFinalizer = t.toXOnly = void 0;
            let i = r(25492),
                o = r(69648),
                s = r(62829),
                a = r(47107),
                u = r(41303),
                l = r(62829);

            function f(e) {
                return e && !!(e.tapInternalKey || e.tapMerkleRoot || e.tapLeafScript && e.tapLeafScript.length || e.tapBip32Derivation && e.tapBip32Derivation.length || e.witnessUtxo && (0, s.isP2TR)(e.witnessUtxo.script))
            }

            function c(e, t) {
                return e && !!(e.tapInternalKey || e.tapTree || e.tapBip32Derivation && e.tapBip32Derivation.length || t && (0, s.isP2TR)(t))
            }

            function h(e = []) {
                return 1 === e.length && 0 === e[0].depth ? {
                    output: e[0].script,
                    version: e[0].leafVersion
                } : function(e) {
                    let t;
                    for (let r of e)
                        if (!(t = function e(t, r, n = 0) {
                                if (n > a.MAX_TAPTREE_DEPTH) throw Error("Max taptree depth exceeded.");
                                if (t.depth === n) return r ? void 0 : {
                                    output: t.script,
                                    version: t.leafVersion
                                };
                                if ((0, i.isTapleaf)(r)) return;
                                let o = e(t, r && r[0], n + 1);
                                if (o) return [o, r && r[1]];
                                let s = e(t, r && r[1], n + 1);
                                if (s) return [r && r[0], s]
                            }(r, t))) throw Error("No room left to insert tapleaf in tree");
                    return t
                }(e)
            }

            function p(e) {
                return {
                    signature: e.slice(0, 64),
                    hashType: e.slice(64)[0] || o.Transaction.SIGHASH_DEFAULT
                }
            }

            function d(e, t) {
                if (!t) return !0;
                let r = (0, a.tapleafHash)({
                        output: e.script,
                        version: e.leafVersion
                    }),
                    n = (0, a.rootHashFromPath)(e.controlBlock, r);
                return n.equals(t)
            }

            function y(e) {
                return e && !!(e.redeemScript || e.witnessScript || e.bip32Derivation && e.bip32Derivation.length)
            }
            t.toXOnly = e => 32 === e.length ? e : e.slice(1, 33), t.tapScriptFinalizer = function(e, t, r) {
                let n = function(e, t, r) {
                    if (!e.tapScriptSig || !e.tapScriptSig.length) throw Error(`Can not finalize taproot input #${t}. No tapleaf script signature provided.`);
                    let n = (e.tapLeafScript || []).sort((e, t) => e.controlBlock.length - t.controlBlock.length).find(t => (function(e, t, r) {
                        let n = (0, a.tapleafHash)({
                                output: e.script,
                                version: e.leafVersion
                            }),
                            i = !r || r.equals(n);
                        return i && void 0 !== t.find(e => e.leafHash.equals(n))
                    })(t, e.tapScriptSig, r));
                    if (!n) throw Error(`Can not finalize taproot input #${t}. Signature for tapleaf script not found.`);
                    return n
                }(t, e, r);
                try {
                    let e = function(e, t) {
                            let r = (0, a.tapleafHash)({
                                output: t.script,
                                version: t.leafVersion
                            });
                            return (e.tapScriptSig || []).filter(e => e.leafHash.equals(r)).map(e => {
                                var r;
                                return r = t.script, Object.assign({
                                    positionInScript: (0, s.pubkeyPositionInScript)(e.pubkey, r)
                                }, e)
                            }).sort((e, t) => t.positionInScript - e.positionInScript).map(e => e.signature)
                        }(t, n),
                        r = e.concat(n.script).concat(n.controlBlock);
                    return {
                        finalScriptWitness: (0, s.witnessStackToScriptWitness)(r)
                    }
                } catch (t) {
                    throw Error(`Can not finalize taproot input #${e}: ${t}`)
                }
            }, t.serializeTaprootSignature = function(e, t) {
                let r = t ? n.from([t]) : n.from([]);
                return n.concat([e, r])
            }, t.isTaprootInput = f, t.isTaprootOutput = c, t.checkTaprootInputFields = function(e, t, r) {
                (function(e, t, r) {
                    let n = f(e) && y(t),
                        i = y(e) && f(t),
                        o = e === t && f(t) && y(t);
                    if (n || i || o) throw Error(`Invalid arguments for Psbt.${r}. Cannot use both taproot and non-taproot fields.`)
                })(e, t, r),
                function(e, t, r) {
                    if (t.tapMerkleRoot) {
                        let n = (t.tapLeafScript || []).every(e => d(e, t.tapMerkleRoot)),
                            i = (e.tapLeafScript || []).every(e => d(e, t.tapMerkleRoot));
                        if (!n || !i) throw Error(`Invalid arguments for Psbt.${r}. Tapleaf not part of taptree.`)
                    } else if (e.tapMerkleRoot) {
                        let n = (t.tapLeafScript || []).every(t => d(t, e.tapMerkleRoot));
                        if (!n) throw Error(`Invalid arguments for Psbt.${r}. Tapleaf not part of taptree.`)
                    }
                }(e, t, r)
            }, t.checkTaprootOutputFields = function(e, t, r) {
                (function(e, t, r) {
                    let n = c(e) && y(t),
                        i = y(e) && c(t),
                        o = e === t && c(t) && y(t);
                    if (n || i || o) throw Error(`Invalid arguments for Psbt.${r}. Cannot use both taproot and non-taproot fields.`)
                })(e, t, r),
                function(e, t) {
                    if (!t.tapTree && !t.tapInternalKey) return;
                    let r = t.tapInternalKey || e.tapInternalKey,
                        n = t.tapTree || e.tapTree;
                    if (r) {
                        let {
                            script: t
                        } = e, i = function(e, t) {
                            let r = t && h(t.leaves),
                                {
                                    output: n
                                } = (0, u.p2tr)({
                                    internalPubkey: e,
                                    scriptTree: r
                                });
                            return n
                        }(r, n);
                        if (t && !t.equals(i)) throw Error("Error adding output. Script or address missmatch.")
                    }
                }(e, t)
            }, t.tweakInternalPubKey = function(e, t) {
                let r = t.tapInternalKey,
                    n = r && (0, a.tweakKey)(r, t.tapMerkleRoot);
                if (!n) throw Error(`Cannot tweak tap internal key for input #${e}. Public key: ${r&&r.toString("hex")}`);
                return n.x
            }, t.tapTreeToList = function(e) {
                if (!(0, i.isTaptree)(e)) throw Error("Cannot convert taptree to tapleaf list. Expecting a tapree structure.");
                return function e(t, r = [], n = 0) {
                    if (n > a.MAX_TAPTREE_DEPTH) throw Error("Max taptree depth exceeded.");
                    return t ? (0, i.isTapleaf)(t) ? (r.push({
                        depth: n,
                        leafVersion: t.version || a.LEAF_VERSION_TAPSCRIPT,
                        script: t.output
                    }), r) : (t[0] && e(t[0], r, n + 1), t[1] && e(t[1], r, n + 1), r) : []
                }(e)
            }, t.tapTreeFromList = h, t.checkTaprootInputForSigs = function(e, t) {
                let r = function(e) {
                    let t = [];
                    if (e.tapKeySig && t.push(e.tapKeySig), e.tapScriptSig && t.push(...e.tapScriptSig.map(e => e.signature)), !t.length) {
                        let r = function(e) {
                            if (!e) return;
                            let t = e.slice(2);
                            if (64 === t.length || 65 === t.length) return t
                        }(e.finalScriptWitness);
                        r && t.push(r)
                    }
                    return t
                }(e);
                return r.some(e => (0, l.signatureBlocksAction)(e, p, t))
            }
        },
        62829: function(e, t, r) {
            "use strict";
            var n = r(91083).Buffer;
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.signatureBlocksAction = t.checkInputForSig = t.pubkeyInScript = t.pubkeyPositionInScript = t.witnessStackToScriptWitness = t.isP2TR = t.isP2SHScript = t.isP2WSHScript = t.isP2WPKH = t.isP2PKH = t.isP2PK = t.isP2MS = void 0;
            let i = r(77004),
                o = r(37692),
                s = r(69648),
                a = r(4998),
                u = r(41303);

            function l(e) {
                return t => {
                    try {
                        return e({
                            output: t
                        }), !0
                    } catch (e) {
                        return !1
                    }
                }
            }

            function f(e, t) {
                let r = (0, a.hash160)(e),
                    n = e.slice(1, 33),
                    i = o.decompile(t);
                if (null === i) throw Error("Unknown script error");
                return i.findIndex(t => "number" != typeof t && (t.equals(e) || t.equals(r) || t.equals(n)))
            }

            function c(e, t, r) {
                let {
                    hashType: n
                } = t(e), i = [], o = n & s.Transaction.SIGHASH_ANYONECANPAY;
                switch (o && i.push("addInput"), 31 & n) {
                    case s.Transaction.SIGHASH_ALL:
                        break;
                    case s.Transaction.SIGHASH_SINGLE:
                    case s.Transaction.SIGHASH_NONE:
                        i.push("addOutput"), i.push("setInputSequence")
                }
                return -1 === i.indexOf(r)
            }
            t.isP2MS = l(u.p2ms), t.isP2PK = l(u.p2pk), t.isP2PKH = l(u.p2pkh), t.isP2WPKH = l(u.p2wpkh), t.isP2WSHScript = l(u.p2wsh), t.isP2SHScript = l(u.p2sh), t.isP2TR = l(u.p2tr), t.witnessStackToScriptWitness = function(e) {
                let t = n.allocUnsafe(0);

                function r(e) {
                    let r = t.length,
                        o = i.encodingLength(e);
                    t = n.concat([t, n.allocUnsafe(o)]), i.encode(e, t, r)
                }
                return r(e.length), e.forEach(function(e) {
                    r(e.length), t = n.concat([t, n.from(e)])
                }), t
            }, t.pubkeyPositionInScript = f, t.pubkeyInScript = function(e, t) {
                return -1 !== f(e, t)
            }, t.checkInputForSig = function(e, t) {
                let r = function(e) {
                    let t = [];
                    if (0 === (e.partialSig || []).length) {
                        if (!e.finalScriptSig && !e.finalScriptWitness) return [];
                        t = function(e) {
                            let t = e.finalScriptSig && o.decompile(e.finalScriptSig) || [],
                                r = e.finalScriptWitness && o.decompile(e.finalScriptWitness) || [];
                            return t.concat(r).filter(e => n.isBuffer(e) && o.isCanonicalScriptSignature(e)).map(e => ({
                                signature: e
                            }))
                        }(e)
                    } else t = e.partialSig;
                    return t.map(e => e.signature)
                }(e);
                return r.some(e => c(e, o.signature.decode, t))
            }, t.signatureBlocksAction = c
        },
        29503: function(e, t, r) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.decode = t.encode = t.encodingLength = void 0;
            let n = r(56731);

            function i(e) {
                return e < n.OPS.OP_PUSHDATA1 ? 1 : e <= 255 ? 2 : e <= 65535 ? 3 : 5
            }
            t.encodingLength = i, t.encode = function(e, t, r) {
                let o = i(t);
                return 1 === o ? e.writeUInt8(t, r) : 2 === o ? (e.writeUInt8(n.OPS.OP_PUSHDATA1, r), e.writeUInt8(t, r + 1)) : 3 === o ? (e.writeUInt8(n.OPS.OP_PUSHDATA2, r), e.writeUInt16LE(t, r + 1)) : (e.writeUInt8(n.OPS.OP_PUSHDATA4, r), e.writeUInt32LE(t, r + 1)), o
            }, t.decode = function(e, t) {
                let r, i;
                let o = e.readUInt8(t);
                if (o < n.OPS.OP_PUSHDATA1) r = o, i = 1;
                else if (o === n.OPS.OP_PUSHDATA1) {
                    if (t + 2 > e.length) return null;
                    r = e.readUInt8(t + 1), i = 2
                } else if (o === n.OPS.OP_PUSHDATA2) {
                    if (t + 3 > e.length) return null;
                    r = e.readUInt16LE(t + 1), i = 3
                } else {
                    if (t + 5 > e.length) return null;
                    if (o !== n.OPS.OP_PUSHDATA4) throw Error("Unexpected opcode");
                    r = e.readUInt32LE(t + 1), i = 5
                }
                return {
                    opcode: o,
                    number: r,
                    size: i
                }
            }
        },
        37692: function(e, t, r) {
            "use strict";
            var n = r(91083).Buffer;
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.signature = t.number = t.isCanonicalScriptSignature = t.isDefinedHashType = t.isCanonicalPubKey = t.toStack = t.fromASM = t.toASM = t.decompile = t.compile = t.isPushOnly = t.OPS = void 0;
            let i = r(76841),
                o = r(56731);
            Object.defineProperty(t, "OPS", {
                enumerable: !0,
                get: function() {
                    return o.OPS
                }
            });
            let s = r(29503),
                a = r(28400),
                u = r(3303),
                l = r(25492),
                {
                    typeforce: f
                } = l,
                c = o.OPS.OP_RESERVED;

            function h(e) {
                return l.Buffer(e) || l.Number(e) && (e === o.OPS.OP_0 || e >= o.OPS.OP_1 && e <= o.OPS.OP_16 || e === o.OPS.OP_1NEGATE)
            }

            function p(e) {
                return l.Array(e) && e.every(h)
            }

            function d(e) {
                if (0 === e.length) return o.OPS.OP_0;
                if (1 === e.length) {
                    if (e[0] >= 1 && e[0] <= 16) return c + e[0];
                    if (129 === e[0]) return o.OPS.OP_1NEGATE
                }
            }

            function y(e) {
                return n.isBuffer(e)
            }

            function g(e) {
                return n.isBuffer(e)
            }

            function b(e) {
                if (y(e)) return e;
                f(l.Array, e);
                let t = e.reduce((e, t) => g(t) ? 1 === t.length && void 0 !== d(t) ? e + 1 : e + s.encodingLength(t.length) + t.length : e + 1, 0),
                    r = n.allocUnsafe(t),
                    i = 0;
                if (e.forEach(e => {
                        if (g(e)) {
                            let t = d(e);
                            if (void 0 !== t) {
                                r.writeUInt8(t, i), i += 1;
                                return
                            }
                            i += s.encode(r, e.length, i), e.copy(r, i), i += e.length
                        } else r.writeUInt8(e, i), i += 1
                    }), i !== r.length) throw Error("Could not decode chunks");
                return r
            }

            function m(e) {
                if (l.Array(e)) return e;
                f(l.Buffer, e);
                let t = [],
                    r = 0;
                for (; r < e.length;) {
                    let n = e[r];
                    if (n > o.OPS.OP_0 && n <= o.OPS.OP_PUSHDATA4) {
                        let n = s.decode(e, r);
                        if (null === n || (r += n.size) + n.number > e.length) return null;
                        let i = e.slice(r, r + n.number);
                        r += n.number;
                        let o = d(i);
                        void 0 !== o ? t.push(o) : t.push(i)
                    } else t.push(n), r += 1
                }
                return t
            }

            function w(e) {
                let t = -129 & e;
                return t > 0 && t < 4
            }
            t.isPushOnly = p, t.compile = b, t.decompile = m, t.toASM = function(e) {
                return y(e) && (e = m(e)), e.map(e => {
                    if (g(e)) {
                        let t = d(e);
                        if (void 0 === t) return e.toString("hex");
                        e = t
                    }
                    return o.REVERSE_OPS[e]
                }).join(" ")
            }, t.fromASM = function(e) {
                return f(l.String, e), b(e.split(" ").map(e => void 0 !== o.OPS[e] ? o.OPS[e] : (f(l.Hex, e), n.from(e, "hex"))))
            }, t.toStack = function(e) {
                return f(p, e = m(e)), e.map(e => g(e) ? e : e === o.OPS.OP_0 ? n.allocUnsafe(0) : a.encode(e - c))
            }, t.isCanonicalPubKey = function(e) {
                return l.isPoint(e)
            }, t.isDefinedHashType = w, t.isCanonicalScriptSignature = function(e) {
                return !!(n.isBuffer(e) && w(e[e.length - 1])) && i.check(e.slice(0, -1))
            }, t.number = a, t.signature = u
        },
        28400: function(e, t, r) {
            "use strict";
            var n = r(91083).Buffer;
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.encode = t.decode = void 0, t.decode = function(e, t, r) {
                t = t || 4, r = void 0 === r || r;
                let n = e.length;
                if (0 === n) return 0;
                if (n > t) throw TypeError("Script number overflow");
                if (r && (127 & e[n - 1]) == 0 && (n <= 1 || (128 & e[n - 2]) == 0)) throw Error("Non-minimally encoded script number");
                if (5 === n) {
                    let t = e.readUInt32LE(0),
                        r = e.readUInt8(4);
                    return 128 & r ? -((-129 & r) * 4294967296 + t) : 4294967296 * r + t
                }
                let i = 0;
                for (let t = 0; t < n; ++t) i |= e[t] << 8 * t;
                return 128 & e[n - 1] ? -(i & ~(128 << 8 * (n - 1))) : i
            }, t.encode = function(e) {
                var t;
                let r = Math.abs(e),
                    i = (t = r) > 2147483647 ? 5 : t > 8388607 ? 4 : t > 32767 ? 3 : t > 127 ? 2 : t > 0 ? 1 : 0,
                    o = n.allocUnsafe(i),
                    s = e < 0;
                for (let e = 0; e < i; ++e) o.writeUInt8(255 & r, e), r >>= 8;
                return 128 & o[i - 1] ? o.writeUInt8(s ? 128 : 0, i - 1) : s && (o[i - 1] |= 128), o
            }
        },
        3303: function(e, t, r) {
            "use strict";
            var n = r(91083).Buffer;
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.encode = t.decode = void 0;
            let i = r(76841),
                o = r(25492),
                {
                    typeforce: s
                } = o,
                a = n.alloc(1, 0);

            function u(e) {
                let t = 0;
                for (; 0 === e[t];) ++t;
                return t === e.length ? a : 128 & (e = e.slice(t))[0] ? n.concat([a, e], 1 + e.length) : e
            }

            function l(e) {
                0 === e[0] && (e = e.slice(1));
                let t = n.alloc(32, 0),
                    r = Math.max(0, 32 - e.length);
                return e.copy(t, r), t
            }
            t.decode = function(e) {
                let t = e.readUInt8(e.length - 1),
                    r = -129 & t;
                if (r <= 0 || r >= 4) throw Error("Invalid hashType " + t);
                let o = i.decode(e.slice(0, -1)),
                    s = l(o.r),
                    a = l(o.s),
                    u = n.concat([s, a], 64);
                return {
                    signature: u,
                    hashType: t
                }
            }, t.encode = function(e, t) {
                s({
                    signature: o.BufferN(64),
                    hashType: o.UInt8
                }, {
                    signature: e,
                    hashType: t
                });
                let r = -129 & t;
                if (r <= 0 || r >= 4) throw Error("Invalid hashType " + t);
                let a = n.allocUnsafe(1);
                a.writeUInt8(t, 0);
                let l = u(e.slice(0, 32)),
                    f = u(e.slice(32, 64));
                return n.concat([i.encode(l, f), a])
            }
        },
        69648: function(e, t, r) {
            "use strict";
            var n = r(91083).Buffer;
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.Transaction = void 0;
            let i = r(950),
                o = r(4998),
                s = r(37692),
                a = r(37692),
                u = r(25492),
                {
                    typeforce: l
                } = u;

            function f(e) {
                let t = e.length;
                return i.varuint.encodingLength(t) + t
            }
            let c = n.allocUnsafe(0),
                h = [],
                p = n.from("0000000000000000000000000000000000000000000000000000000000000000", "hex"),
                d = n.from("0000000000000000000000000000000000000000000000000000000000000001", "hex"),
                y = n.from("ffffffffffffffff", "hex"),
                g = {
                    script: c,
                    valueBuffer: y
                };
            class b {
                constructor() {
                    this.version = 1, this.locktime = 0, this.ins = [], this.outs = []
                }
                static fromBuffer(e, t) {
                    let r = new i.BufferReader(e),
                        n = new b;
                    n.version = r.readInt32();
                    let o = r.readUInt8(),
                        s = r.readUInt8(),
                        a = !1;
                    o === b.ADVANCED_TRANSACTION_MARKER && s === b.ADVANCED_TRANSACTION_FLAG ? a = !0 : r.offset -= 2;
                    let u = r.readVarInt();
                    for (let e = 0; e < u; ++e) n.ins.push({
                        hash: r.readSlice(32),
                        index: r.readUInt32(),
                        script: r.readVarSlice(),
                        sequence: r.readUInt32(),
                        witness: h
                    });
                    let l = r.readVarInt();
                    for (let e = 0; e < l; ++e) n.outs.push({
                        value: r.readUInt64(),
                        script: r.readVarSlice()
                    });
                    if (a) {
                        for (let e = 0; e < u; ++e) n.ins[e].witness = r.readVector();
                        if (!n.hasWitnesses()) throw Error("Transaction has superfluous witness data")
                    }
                    if (n.locktime = r.readUInt32(), t) return n;
                    if (r.offset !== e.length) throw Error("Transaction has unexpected data");
                    return n
                }
                static fromHex(e) {
                    return b.fromBuffer(n.from(e, "hex"), !1)
                }
                static isCoinbaseHash(e) {
                    l(u.Hash256bit, e);
                    for (let t = 0; t < 32; ++t)
                        if (0 !== e[t]) return !1;
                    return !0
                }
                isCoinbase() {
                    return 1 === this.ins.length && b.isCoinbaseHash(this.ins[0].hash)
                }
                addInput(e, t, r, n) {
                    return l(u.tuple(u.Hash256bit, u.UInt32, u.maybe(u.UInt32), u.maybe(u.Buffer)), arguments), u.Null(r) && (r = b.DEFAULT_SEQUENCE), this.ins.push({
                        hash: e,
                        index: t,
                        script: n || c,
                        sequence: r,
                        witness: h
                    }) - 1
                }
                addOutput(e, t) {
                    return l(u.tuple(u.Buffer, u.Satoshi), arguments), this.outs.push({
                        script: e,
                        value: t
                    }) - 1
                }
                hasWitnesses() {
                    return this.ins.some(e => 0 !== e.witness.length)
                }
                weight() {
                    let e = this.byteLength(!1),
                        t = this.byteLength(!0);
                    return 3 * e + t
                }
                virtualSize() {
                    return Math.ceil(this.weight() / 4)
                }
                byteLength(e = !0) {
                    let t = e && this.hasWitnesses();
                    return (t ? 10 : 8) + i.varuint.encodingLength(this.ins.length) + i.varuint.encodingLength(this.outs.length) + this.ins.reduce((e, t) => e + 40 + f(t.script), 0) + this.outs.reduce((e, t) => e + 8 + f(t.script), 0) + (t ? this.ins.reduce((e, t) => e + function(e) {
                        let t = e.length;
                        return i.varuint.encodingLength(t) + e.reduce((e, t) => e + f(t), 0)
                    }(t.witness), 0) : 0)
                }
                clone() {
                    let e = new b;
                    return e.version = this.version, e.locktime = this.locktime, e.ins = this.ins.map(e => ({
                        hash: e.hash,
                        index: e.index,
                        script: e.script,
                        sequence: e.sequence,
                        witness: e.witness
                    })), e.outs = this.outs.map(e => ({
                        script: e.script,
                        value: e.value
                    })), e
                }
                hashForSignature(e, t, r) {
                    if (l(u.tuple(u.UInt32, u.Buffer, u.Number), arguments), e >= this.ins.length) return d;
                    let i = s.compile(s.decompile(t).filter(e => e !== a.OPS.OP_CODESEPARATOR)),
                        f = this.clone();
                    if ((31 & r) === b.SIGHASH_NONE) f.outs = [], f.ins.forEach((t, r) => {
                        r !== e && (t.sequence = 0)
                    });
                    else if ((31 & r) === b.SIGHASH_SINGLE) {
                        if (e >= this.outs.length) return d;
                        f.outs.length = e + 1;
                        for (let t = 0; t < e; t++) f.outs[t] = g;
                        f.ins.forEach((t, r) => {
                            r !== e && (t.sequence = 0)
                        })
                    }
                    r & b.SIGHASH_ANYONECANPAY ? (f.ins = [f.ins[e]], f.ins[0].script = i) : (f.ins.forEach(e => {
                        e.script = c
                    }), f.ins[e].script = i);
                    let h = n.allocUnsafe(f.byteLength(!1) + 4);
                    return h.writeInt32LE(r, h.length - 4), f.__toBuffer(h, 0, !1), o.hash256(h)
                }
                hashForWitnessV1(e, t, r, s, a, h) {
                    if (l(u.tuple(u.UInt32, l.arrayOf(u.Buffer), l.arrayOf(u.Satoshi), u.UInt32), arguments), r.length !== this.ins.length || t.length !== this.ins.length) throw Error("Must supply prevout script and value for all inputs");
                    let p = s === b.SIGHASH_DEFAULT ? b.SIGHASH_ALL : s & b.SIGHASH_OUTPUT_MASK,
                        d = s & b.SIGHASH_INPUT_MASK,
                        y = d === b.SIGHASH_ANYONECANPAY,
                        g = p === b.SIGHASH_NONE,
                        m = p === b.SIGHASH_SINGLE,
                        w = c,
                        E = c,
                        S = c,
                        v = c,
                        _ = c;
                    if (!y) {
                        let e = i.BufferWriter.withCapacity(36 * this.ins.length);
                        this.ins.forEach(t => {
                            e.writeSlice(t.hash), e.writeUInt32(t.index)
                        }), w = o.sha256(e.end()), e = i.BufferWriter.withCapacity(8 * this.ins.length), r.forEach(t => e.writeUInt64(t)), E = o.sha256(e.end()), e = i.BufferWriter.withCapacity(t.map(f).reduce((e, t) => e + t)), t.forEach(t => e.writeVarSlice(t)), S = o.sha256(e.end()), e = i.BufferWriter.withCapacity(4 * this.ins.length), this.ins.forEach(t => e.writeUInt32(t.sequence)), v = o.sha256(e.end())
                    }
                    if (g || m) {
                        if (m && e < this.outs.length) {
                            let t = this.outs[e],
                                r = i.BufferWriter.withCapacity(8 + f(t.script));
                            r.writeUInt64(t.value), r.writeVarSlice(t.script), _ = o.sha256(r.end())
                        }
                    } else {
                        let e = this.outs.map(e => 8 + f(e.script)).reduce((e, t) => e + t),
                            t = i.BufferWriter.withCapacity(e);
                        this.outs.forEach(e => {
                            t.writeUInt64(e.value), t.writeVarSlice(e.script)
                        }), _ = o.sha256(t.end())
                    }
                    let T = (a ? 2 : 0) + (h ? 1 : 0),
                        A = 174 - (y ? 49 : 0) - (g ? 32 : 0) + (h ? 32 : 0) + (a ? 37 : 0),
                        O = i.BufferWriter.withCapacity(A);
                    if (O.writeUInt8(s), O.writeInt32(this.version), O.writeUInt32(this.locktime), O.writeSlice(w), O.writeSlice(E), O.writeSlice(S), O.writeSlice(v), g || m || O.writeSlice(_), O.writeUInt8(T), y) {
                        let n = this.ins[e];
                        O.writeSlice(n.hash), O.writeUInt32(n.index), O.writeUInt64(r[e]), O.writeVarSlice(t[e]), O.writeUInt32(n.sequence)
                    } else O.writeUInt32(e);
                    if (h) {
                        let e = i.BufferWriter.withCapacity(f(h));
                        e.writeVarSlice(h), O.writeSlice(o.sha256(e.end()))
                    }
                    return m && O.writeSlice(_), a && (O.writeSlice(a), O.writeUInt8(0), O.writeUInt32(4294967295)), o.taggedHash("TapSighash", n.concat([n.of(0), O.end()]))
                }
                hashForWitnessV0(e, t, r, s) {
                    let a;
                    l(u.tuple(u.UInt32, u.Buffer, u.Satoshi, u.UInt32), arguments);
                    let c = n.from([]),
                        h = p,
                        d = p,
                        y = p;
                    if (s & b.SIGHASH_ANYONECANPAY || (c = n.allocUnsafe(36 * this.ins.length), a = new i.BufferWriter(c, 0), this.ins.forEach(e => {
                            a.writeSlice(e.hash), a.writeUInt32(e.index)
                        }), d = o.hash256(c)), s & b.SIGHASH_ANYONECANPAY || (31 & s) === b.SIGHASH_SINGLE || (31 & s) === b.SIGHASH_NONE || (c = n.allocUnsafe(4 * this.ins.length), a = new i.BufferWriter(c, 0), this.ins.forEach(e => {
                            a.writeUInt32(e.sequence)
                        }), y = o.hash256(c)), (31 & s) !== b.SIGHASH_SINGLE && (31 & s) !== b.SIGHASH_NONE) {
                        let e = this.outs.reduce((e, t) => e + 8 + f(t.script), 0);
                        c = n.allocUnsafe(e), a = new i.BufferWriter(c, 0), this.outs.forEach(e => {
                            a.writeUInt64(e.value), a.writeVarSlice(e.script)
                        }), h = o.hash256(c)
                    } else if ((31 & s) === b.SIGHASH_SINGLE && e < this.outs.length) {
                        let t = this.outs[e];
                        c = n.allocUnsafe(8 + f(t.script)), (a = new i.BufferWriter(c, 0)).writeUInt64(t.value), a.writeVarSlice(t.script), h = o.hash256(c)
                    }
                    c = n.allocUnsafe(156 + f(t)), a = new i.BufferWriter(c, 0);
                    let g = this.ins[e];
                    return a.writeInt32(this.version), a.writeSlice(d), a.writeSlice(y), a.writeSlice(g.hash), a.writeUInt32(g.index), a.writeVarSlice(t), a.writeUInt64(r), a.writeUInt32(g.sequence), a.writeSlice(h), a.writeUInt32(this.locktime), a.writeUInt32(s), o.hash256(c)
                }
                getHash(e) {
                    return e && this.isCoinbase() ? n.alloc(32, 0) : o.hash256(this.__toBuffer(void 0, void 0, e))
                }
                getId() {
                    return (0, i.reverseBuffer)(this.getHash(!1)).toString("hex")
                }
                toBuffer(e, t) {
                    return this.__toBuffer(e, t, !0)
                }
                toHex() {
                    return this.toBuffer(void 0, void 0).toString("hex")
                }
                setInputScript(e, t) {
                    l(u.tuple(u.Number, u.Buffer), arguments), this.ins[e].script = t
                }
                setWitness(e, t) {
                    l(u.tuple(u.Number, [u.Buffer]), arguments), this.ins[e].witness = t
                }
                __toBuffer(e, t, r = !1) {
                    e || (e = n.allocUnsafe(this.byteLength(r)));
                    let o = new i.BufferWriter(e, t || 0);
                    o.writeInt32(this.version);
                    let s = r && this.hasWitnesses();
                    return (s && (o.writeUInt8(b.ADVANCED_TRANSACTION_MARKER), o.writeUInt8(b.ADVANCED_TRANSACTION_FLAG)), o.writeVarInt(this.ins.length), this.ins.forEach(e => {
                        o.writeSlice(e.hash), o.writeUInt32(e.index), o.writeVarSlice(e.script), o.writeUInt32(e.sequence)
                    }), o.writeVarInt(this.outs.length), this.outs.forEach(e => {
                        void 0 !== e.value ? o.writeUInt64(e.value) : o.writeSlice(e.valueBuffer), o.writeVarSlice(e.script)
                    }), s && this.ins.forEach(e => {
                        o.writeVector(e.witness)
                    }), o.writeUInt32(this.locktime), void 0 !== t) ? e.slice(t, o.offset) : e
                }
            }
            t.Transaction = b, b.DEFAULT_SEQUENCE = 4294967295, b.SIGHASH_DEFAULT = 0, b.SIGHASH_ALL = 1, b.SIGHASH_NONE = 2, b.SIGHASH_SINGLE = 3, b.SIGHASH_ANYONECANPAY = 128, b.SIGHASH_OUTPUT_MASK = 3, b.SIGHASH_INPUT_MASK = 128, b.ADVANCED_TRANSACTION_MARKER = 0, b.ADVANCED_TRANSACTION_FLAG = 1
        },
        25492: function(e, t, r) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.oneOf = t.Null = t.BufferN = t.Function = t.UInt32 = t.UInt8 = t.tuple = t.maybe = t.Hex = t.Buffer = t.String = t.Boolean = t.Array = t.Number = t.Hash256bit = t.Hash160bit = t.Buffer256bit = t.isTaptree = t.isTapleaf = t.TAPLEAF_VERSION_MASK = t.Network = t.ECPoint = t.Satoshi = t.Signer = t.BIP32Path = t.UInt31 = t.isPoint = t.typeforce = void 0;
            let n = r(91083);
            t.typeforce = r(59451);
            let i = n.Buffer.alloc(32, 0),
                o = n.Buffer.from("fffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f", "hex");

            function s(e) {
                return t.typeforce.String(e) && !!e.match(/^(m\/)?(\d+'?\/)*\d+'?$/)
            }
            t.isPoint = function(e) {
                if (!n.Buffer.isBuffer(e) || e.length < 33) return !1;
                let t = e[0],
                    r = e.slice(1, 33);
                if (0 === r.compare(i) || r.compare(o) >= 0) return !1;
                if ((2 === t || 3 === t) && 33 === e.length) return !0;
                let s = e.slice(33);
                return !(0 === s.compare(i) || s.compare(o) >= 0) && 4 === t && 65 === e.length
            }, t.UInt31 = function(e) {
                return t.typeforce.UInt32(e) && e <= 2147483647
            }, t.BIP32Path = s, s.toJSON = () => "BIP32 derivation path", t.Signer = function(e) {
                return (t.typeforce.Buffer(e.publicKey) || "function" == typeof e.getPublicKey) && "function" == typeof e.sign
            };
            let a = 21 * 1e14;

            function u(e) {
                return !!(e && "output" in e && n.Buffer.isBuffer(e.output)) && (void 0 === e.version || (e.version & t.TAPLEAF_VERSION_MASK) === e.version)
            }
            t.Satoshi = function(e) {
                return t.typeforce.UInt53(e) && e <= a
            }, t.ECPoint = t.typeforce.quacksLike("Point"), t.Network = t.typeforce.compile({
                messagePrefix: t.typeforce.oneOf(t.typeforce.Buffer, t.typeforce.String),
                bip32: {
                    public: t.typeforce.UInt32,
                    private: t.typeforce.UInt32
                },
                pubKeyHash: t.typeforce.UInt8,
                scriptHash: t.typeforce.UInt8,
                wif: t.typeforce.UInt8
            }), t.TAPLEAF_VERSION_MASK = 254, t.isTapleaf = u, t.isTaptree = function e(r) {
                return (0, t.Array)(r) ? 2 === r.length && r.every(t => e(t)) : u(r)
            }, t.Buffer256bit = t.typeforce.BufferN(32), t.Hash160bit = t.typeforce.BufferN(20), t.Hash256bit = t.typeforce.BufferN(32), t.Number = t.typeforce.Number, t.Array = t.typeforce.Array, t.Boolean = t.typeforce.Boolean, t.String = t.typeforce.String, t.Buffer = t.typeforce.Buffer, t.Hex = t.typeforce.Hex, t.maybe = t.typeforce.maybe, t.tuple = t.typeforce.tuple, t.UInt8 = t.typeforce.UInt8, t.UInt32 = t.typeforce.UInt32, t.Function = t.typeforce.Function, t.BufferN = t.typeforce.BufferN, t.Null = t.typeforce.Null, t.oneOf = t.typeforce.oneOf
        },
        15765: function(e, t, r) {
            var n = r(96820);
            e.exports = n("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz")
        },
        6403: function(e, t, r) {
            "use strict";
            var n = r(15765),
                i = r(2403).Buffer;
            e.exports = function(e) {
                function t(t) {
                    var r = t.slice(0, -4),
                        n = t.slice(-4),
                        i = e(r);
                    if (!(n[0] ^ i[0] | n[1] ^ i[1] | n[2] ^ i[2] | n[3] ^ i[3])) return r
                }
                return {
                    encode: function(t) {
                        var r = e(t);
                        return n.encode(i.concat([t, r], t.length + 4))
                    },
                    decode: function(r) {
                        var i = t(n.decode(r), e);
                        if (!i) throw Error("Invalid checksum");
                        return i
                    },
                    decodeUnsafe: function(e) {
                        var r = n.decodeUnsafe(e);
                        if (r) return t(r)
                    }
                }
            }
        },
        31378: function(e, t, r) {
            "use strict";
            var n = r(43330),
                i = r(6403);
            e.exports = i(function(e) {
                var t = n("sha256").update(e).digest();
                return n("sha256").update(t).digest()
            })
        },
        8144: function(e, t, r) {
            "use strict";
            var n = r(94633),
                i = r(28609),
                o = i(n("String.prototype.indexOf"));
            e.exports = function(e, t) {
                var r = n(e, !!t);
                return "function" == typeof r && o(e, ".prototype.") > -1 ? i(r) : r
            }
        },
        28609: function(e, t, r) {
            "use strict";
            var n = r(15758),
                i = r(94633),
                o = i("%Function.prototype.apply%"),
                s = i("%Function.prototype.call%"),
                a = i("%Reflect.apply%", !0) || n.call(s, o),
                u = i("%Object.getOwnPropertyDescriptor%", !0),
                l = i("%Object.defineProperty%", !0),
                f = i("%Math.max%");
            if (l) try {
                l({}, "a", {
                    value: 1
                })
            } catch (e) {
                l = null
            }
            e.exports = function(e) {
                var t = a(n, s, arguments);
                return u && l && u(t, "length").configurable && l(t, "length", {
                    value: 1 + f(0, e.length - (arguments.length - 1))
                }), t
            };
            var c = function() {
                return a(n, o, arguments)
            };
            l ? l(e.exports, "apply", {
                value: c
            }) : e.exports.apply = c
        },
        13410: function(e, t, r) {
            var n = r(2403).Buffer,
                i = r(85981).Transform,
                o = r(33099).StringDecoder;

            function s(e) {
                i.call(this), this.hashMode = "string" == typeof e, this.hashMode ? this[e] = this._finalOrDigest : this.final = this._finalOrDigest, this._final && (this.__final = this._final, this._final = null), this._decoder = null, this._encoding = null
            }
            r(3501)(s, i), s.prototype.update = function(e, t, r) {
                "string" == typeof e && (e = n.from(e, t));
                var i = this._update(e);
                return this.hashMode ? this : (r && (i = this._toString(i, r)), i)
            }, s.prototype.setAutoPadding = function() {}, s.prototype.getAuthTag = function() {
                throw Error("trying to get auth tag in unsupported state")
            }, s.prototype.setAuthTag = function() {
                throw Error("trying to set auth tag in unsupported state")
            }, s.prototype.setAAD = function() {
                throw Error("trying to set aad in unsupported state")
            }, s.prototype._transform = function(e, t, r) {
                var n;
                try {
                    this.hashMode ? this._update(e) : this.push(this._update(e))
                } catch (e) {
                    n = e
                } finally {
                    r(n)
                }
            }, s.prototype._flush = function(e) {
                var t;
                try {
                    this.push(this.__final())
                } catch (e) {
                    t = e
                }
                e(t)
            }, s.prototype._finalOrDigest = function(e) {
                var t = this.__final() || n.alloc(0);
                return e && (t = this._toString(t, e, !0)), t
            }, s.prototype._toString = function(e, t, r) {
                if (this._decoder || (this._decoder = new o(t), this._encoding = t), this._encoding !== t) throw Error("can't switch encodings");
                var n = this._decoder.write(e);
                return r && (n += this._decoder.end()), n
            }, e.exports = s
        },
        43330: function(e, t, r) {
            "use strict";
            var n = r(3501),
                i = r(75343),
                o = r(99670),
                s = r(36677),
                a = r(13410);

            function u(e) {
                a.call(this, "digest"), this._hash = e
            }
            n(u, a), u.prototype._update = function(e) {
                this._hash.update(e)
            }, u.prototype._final = function() {
                return this._hash.digest()
            }, e.exports = function(e) {
                return "md5" === (e = e.toLowerCase()) ? new i : "rmd160" === e || "ripemd160" === e ? new o : new u(s(e))
            }
        },
        28958: function(e) {
            "use strict";
            var t = Object.prototype.hasOwnProperty,
                r = "~";

            function n() {}

            function i(e, t, r) {
                this.fn = e, this.context = t, this.once = r || !1
            }

            function o(e, t, n, o, s) {
                if ("function" != typeof n) throw TypeError("The listener must be a function");
                var a = new i(n, o || e, s),
                    u = r ? r + t : t;
                return e._events[u] ? e._events[u].fn ? e._events[u] = [e._events[u], a] : e._events[u].push(a) : (e._events[u] = a, e._eventsCount++), e
            }

            function s(e, t) {
                0 == --e._eventsCount ? e._events = new n : delete e._events[t]
            }

            function a() {
                this._events = new n, this._eventsCount = 0
            }
            Object.create && (n.prototype = Object.create(null), new n().__proto__ || (r = !1)), a.prototype.eventNames = function() {
                var e, n, i = [];
                if (0 === this._eventsCount) return i;
                for (n in e = this._events) t.call(e, n) && i.push(r ? n.slice(1) : n);
                return Object.getOwnPropertySymbols ? i.concat(Object.getOwnPropertySymbols(e)) : i
            }, a.prototype.listeners = function(e) {
                var t = r ? r + e : e,
                    n = this._events[t];
                if (!n) return [];
                if (n.fn) return [n.fn];
                for (var i = 0, o = n.length, s = Array(o); i < o; i++) s[i] = n[i].fn;
                return s
            }, a.prototype.listenerCount = function(e) {
                var t = r ? r + e : e,
                    n = this._events[t];
                return n ? n.fn ? 1 : n.length : 0
            }, a.prototype.emit = function(e, t, n, i, o, s) {
                var a = r ? r + e : e;
                if (!this._events[a]) return !1;
                var u, l, f = this._events[a],
                    c = arguments.length;
                if (f.fn) {
                    switch (f.once && this.removeListener(e, f.fn, void 0, !0), c) {
                        case 1:
                            return f.fn.call(f.context), !0;
                        case 2:
                            return f.fn.call(f.context, t), !0;
                        case 3:
                            return f.fn.call(f.context, t, n), !0;
                        case 4:
                            return f.fn.call(f.context, t, n, i), !0;
                        case 5:
                            return f.fn.call(f.context, t, n, i, o), !0;
                        case 6:
                            return f.fn.call(f.context, t, n, i, o, s), !0
                    }
                    for (l = 1, u = Array(c - 1); l < c; l++) u[l - 1] = arguments[l];
                    f.fn.apply(f.context, u)
                } else {
                    var h, p = f.length;
                    for (l = 0; l < p; l++) switch (f[l].once && this.removeListener(e, f[l].fn, void 0, !0), c) {
                        case 1:
                            f[l].fn.call(f[l].context);
                            break;
                        case 2:
                            f[l].fn.call(f[l].context, t);
                            break;
                        case 3:
                            f[l].fn.call(f[l].context, t, n);
                            break;
                        case 4:
                            f[l].fn.call(f[l].context, t, n, i);
                            break;
                        default:
                            if (!u)
                                for (h = 1, u = Array(c - 1); h < c; h++) u[h - 1] = arguments[h];
                            f[l].fn.apply(f[l].context, u)
                    }
                }
                return !0
            }, a.prototype.on = function(e, t, r) {
                return o(this, e, t, r, !1)
            }, a.prototype.once = function(e, t, r) {
                return o(this, e, t, r, !0)
            }, a.prototype.removeListener = function(e, t, n, i) {
                var o = r ? r + e : e;
                if (!this._events[o]) return this;
                if (!t) return s(this, o), this;
                var a = this._events[o];
                if (a.fn) a.fn !== t || i && !a.once || n && a.context !== n || s(this, o);
                else {
                    for (var u = 0, l = [], f = a.length; u < f; u++)(a[u].fn !== t || i && !a[u].once || n && a[u].context !== n) && l.push(a[u]);
                    l.length ? this._events[o] = 1 === l.length ? l[0] : l : s(this, o)
                }
                return this
            }, a.prototype.removeAllListeners = function(e) {
                var t;
                return e ? (t = r ? r + e : e, this._events[t] && s(this, t)) : (this._events = new n, this._eventsCount = 0), this
            }, a.prototype.off = a.prototype.removeListener, a.prototype.addListener = a.prototype.on, a.prefixed = r, a.EventEmitter = a, e.exports = a
        },
        6721: function(e, t, r) {
            "use strict";
            var n = r(9267),
                i = Object.prototype.toString,
                o = Object.prototype.hasOwnProperty,
                s = function(e, t, r) {
                    for (var n = 0, i = e.length; n < i; n++) o.call(e, n) && (null == r ? t(e[n], n, e) : t.call(r, e[n], n, e))
                },
                a = function(e, t, r) {
                    for (var n = 0, i = e.length; n < i; n++) null == r ? t(e.charAt(n), n, e) : t.call(r, e.charAt(n), n, e)
                },
                u = function(e, t, r) {
                    for (var n in e) o.call(e, n) && (null == r ? t(e[n], n, e) : t.call(r, e[n], n, e))
                };
            e.exports = function(e, t, r) {
                var o;
                if (!n(t)) throw TypeError("iterator must be a function");
                arguments.length >= 3 && (o = r), "[object Array]" === i.call(e) ? s(e, t, o) : "string" == typeof e ? a(e, t, o) : u(e, t, o)
            }
        },
        42129: function(e) {
            "use strict";
            var t = Array.prototype.slice,
                r = Object.prototype.toString;
            e.exports = function(e) {
                var n, i = this;
                if ("function" != typeof i || "[object Function]" !== r.call(i)) throw TypeError("Function.prototype.bind called on incompatible " + i);
                for (var o = t.call(arguments, 1), s = Math.max(0, i.length - o.length), a = [], u = 0; u < s; u++) a.push("$" + u);
                if (n = Function("binder", "return function (" + a.join(",") + "){ return binder.apply(this,arguments); }")(function() {
                        if (!(this instanceof n)) return i.apply(e, o.concat(t.call(arguments)));
                        var r = i.apply(this, o.concat(t.call(arguments)));
                        return Object(r) === r ? r : this
                    }), i.prototype) {
                    var l = function() {};
                    l.prototype = i.prototype, n.prototype = new l, l.prototype = null
                }
                return n
            }
        },
        15758: function(e, t, r) {
            "use strict";
            var n = r(42129);
            e.exports = Function.prototype.bind || n
        },
        94633: function(e, t, r) {
            "use strict";
            var n, i = SyntaxError,
                o = Function,
                s = TypeError,
                a = function(e) {
                    try {
                        return o('"use strict"; return (' + e + ").constructor;")()
                    } catch (e) {}
                },
                u = Object.getOwnPropertyDescriptor;
            if (u) try {
                u({}, "")
            } catch (e) {
                u = null
            }
            var l = function() {
                    throw new s
                },
                f = u ? function() {
                    try {
                        return arguments.callee, l
                    } catch (e) {
                        try {
                            return u(arguments, "callee").get
                        } catch (e) {
                            return l
                        }
                    }
                }() : l,
                c = r(53833)(),
                h = Object.getPrototypeOf || function(e) {
                    return e.__proto__
                },
                p = {},
                d = "undefined" == typeof Uint8Array ? n : h(Uint8Array),
                y = {
                    "%AggregateError%": "undefined" == typeof AggregateError ? n : AggregateError,
                    "%Array%": Array,
                    "%ArrayBuffer%": "undefined" == typeof ArrayBuffer ? n : ArrayBuffer,
                    "%ArrayIteratorPrototype%": c ? h([][Symbol.iterator]()) : n,
                    "%AsyncFromSyncIteratorPrototype%": n,
                    "%AsyncFunction%": p,
                    "%AsyncGenerator%": p,
                    "%AsyncGeneratorFunction%": p,
                    "%AsyncIteratorPrototype%": p,
                    "%Atomics%": "undefined" == typeof Atomics ? n : Atomics,
                    "%BigInt%": "undefined" == typeof BigInt ? n : BigInt,
                    "%BigInt64Array%": "undefined" == typeof BigInt64Array ? n : BigInt64Array,
                    "%BigUint64Array%": "undefined" == typeof BigUint64Array ? n : BigUint64Array,
                    "%Boolean%": Boolean,
                    "%DataView%": "undefined" == typeof DataView ? n : DataView,
                    "%Date%": Date,
                    "%decodeURI%": decodeURI,
                    "%decodeURIComponent%": decodeURIComponent,
                    "%encodeURI%": encodeURI,
                    "%encodeURIComponent%": encodeURIComponent,
                    "%Error%": Error,
                    "%eval%": eval,
                    "%EvalError%": EvalError,
                    "%Float32Array%": "undefined" == typeof Float32Array ? n : Float32Array,
                    "%Float64Array%": "undefined" == typeof Float64Array ? n : Float64Array,
                    "%FinalizationRegistry%": "undefined" == typeof FinalizationRegistry ? n : FinalizationRegistry,
                    "%Function%": o,
                    "%GeneratorFunction%": p,
                    "%Int8Array%": "undefined" == typeof Int8Array ? n : Int8Array,
                    "%Int16Array%": "undefined" == typeof Int16Array ? n : Int16Array,
                    "%Int32Array%": "undefined" == typeof Int32Array ? n : Int32Array,
                    "%isFinite%": isFinite,
                    "%isNaN%": isNaN,
                    "%IteratorPrototype%": c ? h(h([][Symbol.iterator]())) : n,
                    "%JSON%": "object" == typeof JSON ? JSON : n,
                    "%Map%": "undefined" == typeof Map ? n : Map,
                    "%MapIteratorPrototype%": "undefined" != typeof Map && c ? h(new Map()[Symbol.iterator]()) : n,
                    "%Math%": Math,
                    "%Number%": Number,
                    "%Object%": Object,
                    "%parseFloat%": parseFloat,
                    "%parseInt%": parseInt,
                    "%Promise%": "undefined" == typeof Promise ? n : Promise,
                    "%Proxy%": "undefined" == typeof Proxy ? n : Proxy,
                    "%RangeError%": RangeError,
                    "%ReferenceError%": ReferenceError,
                    "%Reflect%": "undefined" == typeof Reflect ? n : Reflect,
                    "%RegExp%": RegExp,
                    "%Set%": "undefined" == typeof Set ? n : Set,
                    "%SetIteratorPrototype%": "undefined" != typeof Set && c ? h(new Set()[Symbol.iterator]()) : n,
                    "%SharedArrayBuffer%": "undefined" == typeof SharedArrayBuffer ? n : SharedArrayBuffer,
                    "%String%": String,
                    "%StringIteratorPrototype%": c ? h("" [Symbol.iterator]()) : n,
                    "%Symbol%": c ? Symbol : n,
                    "%SyntaxError%": i,
                    "%ThrowTypeError%": f,
                    "%TypedArray%": d,
                    "%TypeError%": s,
                    "%Uint8Array%": "undefined" == typeof Uint8Array ? n : Uint8Array,
                    "%Uint8ClampedArray%": "undefined" == typeof Uint8ClampedArray ? n : Uint8ClampedArray,
                    "%Uint16Array%": "undefined" == typeof Uint16Array ? n : Uint16Array,
                    "%Uint32Array%": "undefined" == typeof Uint32Array ? n : Uint32Array,
                    "%URIError%": URIError,
                    "%WeakMap%": "undefined" == typeof WeakMap ? n : WeakMap,
                    "%WeakRef%": "undefined" == typeof WeakRef ? n : WeakRef,
                    "%WeakSet%": "undefined" == typeof WeakSet ? n : WeakSet
                };
            try {
                null.error
            } catch (e) {
                var g = h(h(e));
                y["%Error.prototype%"] = g
            }
            var b = function e(t) {
                    var r;
                    if ("%AsyncFunction%" === t) r = a("async function () {}");
                    else if ("%GeneratorFunction%" === t) r = a("function* () {}");
                    else if ("%AsyncGeneratorFunction%" === t) r = a("async function* () {}");
                    else if ("%AsyncGenerator%" === t) {
                        var n = e("%AsyncGeneratorFunction%");
                        n && (r = n.prototype)
                    } else if ("%AsyncIteratorPrototype%" === t) {
                        var i = e("%AsyncGenerator%");
                        i && (r = h(i.prototype))
                    }
                    return y[t] = r, r
                },
                m = {
                    "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
                    "%ArrayPrototype%": ["Array", "prototype"],
                    "%ArrayProto_entries%": ["Array", "prototype", "entries"],
                    "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
                    "%ArrayProto_keys%": ["Array", "prototype", "keys"],
                    "%ArrayProto_values%": ["Array", "prototype", "values"],
                    "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
                    "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
                    "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
                    "%BooleanPrototype%": ["Boolean", "prototype"],
                    "%DataViewPrototype%": ["DataView", "prototype"],
                    "%DatePrototype%": ["Date", "prototype"],
                    "%ErrorPrototype%": ["Error", "prototype"],
                    "%EvalErrorPrototype%": ["EvalError", "prototype"],
                    "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
                    "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
                    "%FunctionPrototype%": ["Function", "prototype"],
                    "%Generator%": ["GeneratorFunction", "prototype"],
                    "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
                    "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
                    "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
                    "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
                    "%JSONParse%": ["JSON", "parse"],
                    "%JSONStringify%": ["JSON", "stringify"],
                    "%MapPrototype%": ["Map", "prototype"],
                    "%NumberPrototype%": ["Number", "prototype"],
                    "%ObjectPrototype%": ["Object", "prototype"],
                    "%ObjProto_toString%": ["Object", "prototype", "toString"],
                    "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
                    "%PromisePrototype%": ["Promise", "prototype"],
                    "%PromiseProto_then%": ["Promise", "prototype", "then"],
                    "%Promise_all%": ["Promise", "all"],
                    "%Promise_reject%": ["Promise", "reject"],
                    "%Promise_resolve%": ["Promise", "resolve"],
                    "%RangeErrorPrototype%": ["RangeError", "prototype"],
                    "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
                    "%RegExpPrototype%": ["RegExp", "prototype"],
                    "%SetPrototype%": ["Set", "prototype"],
                    "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
                    "%StringPrototype%": ["String", "prototype"],
                    "%SymbolPrototype%": ["Symbol", "prototype"],
                    "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
                    "%TypedArrayPrototype%": ["TypedArray", "prototype"],
                    "%TypeErrorPrototype%": ["TypeError", "prototype"],
                    "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
                    "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
                    "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
                    "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
                    "%URIErrorPrototype%": ["URIError", "prototype"],
                    "%WeakMapPrototype%": ["WeakMap", "prototype"],
                    "%WeakSetPrototype%": ["WeakSet", "prototype"]
                },
                w = r(15758),
                E = r(16908),
                S = w.call(Function.call, Array.prototype.concat),
                v = w.call(Function.apply, Array.prototype.splice),
                _ = w.call(Function.call, String.prototype.replace),
                T = w.call(Function.call, String.prototype.slice),
                A = w.call(Function.call, RegExp.prototype.exec),
                O = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g,
                I = /\\(\\)?/g,
                P = function(e) {
                    var t = T(e, 0, 1),
                        r = T(e, -1);
                    if ("%" === t && "%" !== r) throw new i("invalid intrinsic syntax, expected closing `%`");
                    if ("%" === r && "%" !== t) throw new i("invalid intrinsic syntax, expected opening `%`");
                    var n = [];
                    return _(e, O, function(e, t, r, i) {
                        n[n.length] = r ? _(i, I, "$1") : t || e
                    }), n
                },
                k = function(e, t) {
                    var r, n = e;
                    if (E(m, n) && (n = "%" + (r = m[n])[0] + "%"), E(y, n)) {
                        var o = y[n];
                        if (o === p && (o = b(n)), void 0 === o && !t) throw new s("intrinsic " + e + " exists, but is not available. Please file an issue!");
                        return {
                            alias: r,
                            name: n,
                            value: o
                        }
                    }
                    throw new i("intrinsic " + e + " does not exist!")
                };
            e.exports = function(e, t) {
                if ("string" != typeof e || 0 === e.length) throw new s("intrinsic name must be a non-empty string");
                if (arguments.length > 1 && "boolean" != typeof t) throw new s('"allowMissing" argument must be a boolean');
                if (null === A(/^%?[^%]*%?$/, e)) throw new i("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
                var r = P(e),
                    n = r.length > 0 ? r[0] : "",
                    o = k("%" + n + "%", t),
                    a = o.name,
                    l = o.value,
                    f = !1,
                    c = o.alias;
                c && (n = c[0], v(r, S([0, 1], c)));
                for (var h = 1, p = !0; h < r.length; h += 1) {
                    var d = r[h],
                        g = T(d, 0, 1),
                        b = T(d, -1);
                    if (('"' === g || "'" === g || "`" === g || '"' === b || "'" === b || "`" === b) && g !== b) throw new i("property names with quotes must have matching quotes");
                    if ("constructor" !== d && p || (f = !0), n += "." + d, E(y, a = "%" + n + "%")) l = y[a];
                    else if (null != l) {
                        if (!(d in l)) {
                            if (!t) throw new s("base intrinsic for " + e + " exists, but the property is not available.");
                            return
                        }
                        if (u && h + 1 >= r.length) {
                            var m = u(l, d);
                            l = (p = !!m) && "get" in m && !("originalValue" in m.get) ? m.get : l[d]
                        } else p = E(l, d), l = l[d];
                        p && !f && (y[a] = l)
                    }
                }
                return l
            }
        },
        87863: function(e, t, r) {
            "use strict";
            var n = r(94633)("%Object.getOwnPropertyDescriptor%", !0);
            if (n) try {
                n([], "length")
            } catch (e) {
                n = null
            }
            e.exports = n
        },
        53833: function(e, t, r) {
            "use strict";
            var n = "undefined" != typeof Symbol && Symbol,
                i = r(38871);
            e.exports = function() {
                return "function" == typeof n && "function" == typeof Symbol && "symbol" == typeof n("foo") && "symbol" == typeof Symbol("bar") && i()
            }
        },
        38871: function(e) {
            "use strict";
            e.exports = function() {
                if ("function" != typeof Symbol || "function" != typeof Object.getOwnPropertySymbols) return !1;
                if ("symbol" == typeof Symbol.iterator) return !0;
                var e = {},
                    t = Symbol("test"),
                    r = Object(t);
                if ("string" == typeof t || "[object Symbol]" !== Object.prototype.toString.call(t) || "[object Symbol]" !== Object.prototype.toString.call(r)) return !1;
                for (t in e[t] = 42, e) return !1;
                if ("function" == typeof Object.keys && 0 !== Object.keys(e).length || "function" == typeof Object.getOwnPropertyNames && 0 !== Object.getOwnPropertyNames(e).length) return !1;
                var n = Object.getOwnPropertySymbols(e);
                if (1 !== n.length || n[0] !== t || !Object.prototype.propertyIsEnumerable.call(e, t)) return !1;
                if ("function" == typeof Object.getOwnPropertyDescriptor) {
                    var i = Object.getOwnPropertyDescriptor(e, t);
                    if (42 !== i.value || !0 !== i.enumerable) return !1
                }
                return !0
            }
        },
        8238: function(e, t, r) {
            "use strict";
            var n = r(38871);
            e.exports = function() {
                return n() && !!Symbol.toStringTag
            }
        },
        16908: function(e, t, r) {
            "use strict";
            var n = r(15758);
            e.exports = n.call(Function.call, Object.prototype.hasOwnProperty)
        },
        1360: function(e, t, r) {
            "use strict";
            var n = r(2403).Buffer,
                i = r(58319).Transform;

            function o(e) {
                i.call(this), this._block = n.allocUnsafe(e), this._blockSize = e, this._blockOffset = 0, this._length = [0, 0, 0, 0], this._finalized = !1
            }
            r(40088)(o, i), o.prototype._transform = function(e, t, r) {
                var n = null;
                try {
                    this.update(e, t)
                } catch (e) {
                    n = e
                }
                r(n)
            }, o.prototype._flush = function(e) {
                var t = null;
                try {
                    this.push(this.digest())
                } catch (e) {
                    t = e
                }
                e(t)
            }, o.prototype.update = function(e, t) {
                if (function(e, t) {
                        if (!n.isBuffer(e) && "string" != typeof e) throw TypeError(t + " must be a string or a buffer")
                    }(e, "Data"), this._finalized) throw Error("Digest already called");
                n.isBuffer(e) || (e = n.from(e, t));
                for (var r = this._block, i = 0; this._blockOffset + e.length - i >= this._blockSize;) {
                    for (var o = this._blockOffset; o < this._blockSize;) r[o++] = e[i++];
                    this._update(), this._blockOffset = 0
                }
                for (; i < e.length;) r[this._blockOffset++] = e[i++];
                for (var s = 0, a = 8 * e.length; a > 0; ++s) this._length[s] += a, (a = this._length[s] / 4294967296 | 0) > 0 && (this._length[s] -= 4294967296 * a);
                return this
            }, o.prototype._update = function() {
                throw Error("_update is not implemented")
            }, o.prototype.digest = function(e) {
                if (this._finalized) throw Error("Digest already called");
                this._finalized = !0;
                var t = this._digest();
                void 0 !== e && (t = t.toString(e)), this._block.fill(0), this._blockOffset = 0;
                for (var r = 0; r < 4; ++r) this._length[r] = 0;
                return t
            }, o.prototype._digest = function() {
                throw Error("_digest is not implemented")
            }, e.exports = o
        },
        40088: function(e) {
            "function" == typeof Object.create ? e.exports = function(e, t) {
                t && (e.super_ = t, e.prototype = Object.create(t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }))
            } : e.exports = function(e, t) {
                if (t) {
                    e.super_ = t;
                    var r = function() {};
                    r.prototype = t.prototype, e.prototype = new r, e.prototype.constructor = e
                }
            }
        },
        3501: function(e) {
            "function" == typeof Object.create ? e.exports = function(e, t) {
                e.super_ = t, e.prototype = Object.create(t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                })
            } : e.exports = function(e, t) {
                e.super_ = t;
                var r = function() {};
                r.prototype = t.prototype, e.prototype = new r, e.prototype.constructor = e
            }
        },
        26714: function(e, t, r) {
            "use strict";
            var n = r(8238)(),
                i = r(8144)("Object.prototype.toString"),
                o = function(e) {
                    return (!n || !e || "object" != typeof e || !(Symbol.toStringTag in e)) && "[object Arguments]" === i(e)
                },
                s = function(e) {
                    return !!o(e) || null !== e && "object" == typeof e && "number" == typeof e.length && e.length >= 0 && "[object Array]" !== i(e) && "[object Function]" === i(e.callee)
                },
                a = function() {
                    return o(arguments)
                }();
            o.isLegacyArguments = s, e.exports = a ? o : s
        },
        9267: function(e) {
            "use strict";
            var t, r, n = Function.prototype.toString,
                i = "object" == typeof Reflect && null !== Reflect && Reflect.apply;
            if ("function" == typeof i && "function" == typeof Object.defineProperty) try {
                t = Object.defineProperty({}, "length", {
                    get: function() {
                        throw r
                    }
                }), r = {}, i(function() {
                    throw 42
                }, null, t)
            } catch (e) {
                e !== r && (i = null)
            } else i = null;
            var o = /^\s*class\b/,
                s = function(e) {
                    try {
                        var t = n.call(e);
                        return o.test(t)
                    } catch (e) {
                        return !1
                    }
                },
                a = function(e) {
                    try {
                        if (s(e)) return !1;
                        return n.call(e), !0
                    } catch (e) {
                        return !1
                    }
                },
                u = Object.prototype.toString,
                l = "function" == typeof Symbol && !!Symbol.toStringTag,
                f = !(0 in [, ]),
                c = function() {
                    return !1
                };
            if ("object" == typeof document) {
                var h = document.all;
                u.call(h) === u.call(document.all) && (c = function(e) {
                    if ((f || !e) && (void 0 === e || "object" == typeof e)) try {
                        var t = u.call(e);
                        return ("[object HTMLAllCollection]" === t || "[object HTML document.all class]" === t || "[object HTMLCollection]" === t || "[object Object]" === t) && null == e("")
                    } catch (e) {}
                    return !1
                })
            }
            e.exports = i ? function(e) {
                if (c(e)) return !0;
                if (!e || "function" != typeof e && "object" != typeof e) return !1;
                try {
                    i(e, null, t)
                } catch (e) {
                    if (e !== r) return !1
                }
                return !s(e) && a(e)
            } : function(e) {
                if (c(e)) return !0;
                if (!e || "function" != typeof e && "object" != typeof e) return !1;
                if (l) return a(e);
                if (s(e)) return !1;
                var t = u.call(e);
                return !!("[object Function]" === t || "[object GeneratorFunction]" === t || /^\[object HTML/.test(t)) && a(e)
            }
        },
        10079: function(e, t, r) {
            "use strict";
            var n, i = Object.prototype.toString,
                o = Function.prototype.toString,
                s = /^\s*(?:function)?\*/,
                a = r(8238)(),
                u = Object.getPrototypeOf,
                l = function() {
                    if (!a) return !1;
                    try {
                        return Function("return function*() {}")()
                    } catch (e) {}
                };
            e.exports = function(e) {
                if ("function" != typeof e) return !1;
                if (s.test(o.call(e))) return !0;
                if (!a) return "[object GeneratorFunction]" === i.call(e);
                if (!u) return !1;
                if (void 0 === n) {
                    var t = l();
                    n = !!t && u(t)
                }
                return u(e) === n
            }
        },
        20932: function(e, t, r) {
            "use strict";
            var n = r(6721),
                i = r(74250),
                o = r(8144),
                s = o("Object.prototype.toString"),
                a = r(8238)(),
                u = r(87863),
                l = "undefined" == typeof globalThis ? r.g : globalThis,
                f = i(),
                c = o("Array.prototype.indexOf", !0) || function(e, t) {
                    for (var r = 0; r < e.length; r += 1)
                        if (e[r] === t) return r;
                    return -1
                },
                h = o("String.prototype.slice"),
                p = {},
                d = Object.getPrototypeOf;
            a && u && d && n(f, function(e) {
                var t = new l[e];
                if (Symbol.toStringTag in t) {
                    var r = d(t),
                        n = u(r, Symbol.toStringTag);
                    n || (n = u(d(r), Symbol.toStringTag)), p[e] = n.get
                }
            });
            var y = function(e) {
                var t = !1;
                return n(p, function(r, n) {
                    if (!t) try {
                        t = r.call(e) === n
                    } catch (e) {}
                }), t
            };
            e.exports = function(e) {
                return !!e && "object" == typeof e && (a && Symbol.toStringTag in e ? !!u && y(e) : c(f, h(s(e), 8, -1)) > -1)
            }
        },
        96334: function(e, t, r) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.decode = t.encode = t.unescape = t.escape = t.pad = void 0;
            let n = r(216);

            function i(e) {
                return `${e}${"=".repeat(4-(e.length%4||4))}`
            }

            function o(e) {
                return e.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_")
            }

            function s(e) {
                return i(e).replace(/-/g, "+").replace(/_/g, "/")
            }
            t.pad = i, t.escape = o, t.unescape = s, t.encode = function(e) {
                return o((0, n.fromByteArray)(new TextEncoder().encode(e)))
            }, t.decode = function(e) {
                return new TextDecoder().decode((0, n.toByteArray)(i(s(e))))
            }
        },
        67609: function(e, t, r) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.cryptoClients = t.SECP256K1Client = void 0;
            let n = r(25662);
            Object.defineProperty(t, "SECP256K1Client", {
                enumerable: !0,
                get: function() {
                    return n.SECP256K1Client
                }
            });
            let i = {
                ES256K: n.SECP256K1Client
            };
            t.cryptoClients = i
        },
        25662: function(e, t, r) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.SECP256K1Client = void 0;
            let n = r(89565),
                i = r(4378),
                o = r(46454),
                s = r(50882),
                a = r(45010),
                u = r(55836);
            o.utils.hmacSha256Sync = (e, ...t) => {
                let r = n.hmac.create(i.sha256, e);
                return t.forEach(e => r.update(e)), r.digest()
            };
            class l {
                static derivePublicKey(e, t = !0) {
                    return 66 === e.length && (e = e.slice(0, 64)), e.length < 64 && (e = e.padStart(64, "0")), (0, u.bytesToHex)(o.getPublicKey(e, t))
                }
                static signHash(e, t, r = "jose") {
                    if (!e || !t) throw new a.MissingParametersError("a signing input hash and private key are all required");
                    let n = o.signSync(e, t.slice(0, 64), {
                        der: !0,
                        canonical: !1
                    });
                    if ("der" === r) return (0, u.bytesToHex)(n);
                    if ("jose" === r) return (0, s.derToJose)(n, "ES256");
                    throw Error("Invalid signature format")
                }
                static loadSignature(e) {
                    return (0, s.joseToDer)(e, "ES256")
                }
                static verifyHash(e, t, r) {
                    if (!e || !t || !r) throw new a.MissingParametersError("a signing input hash, der signature, and public key are all required");
                    return o.verify(t, e, r, {
                        strict: !1
                    })
                }
            }
            t.SECP256K1Client = l, l.algorithmName = "ES256K"
        },
        78754: function(e, t, r) {
            "use strict";
            var n = this && this.__awaiter || function(e, t, r, n) {
                return new(r || (r = Promise))(function(i, o) {
                    function s(e) {
                        try {
                            u(n.next(e))
                        } catch (e) {
                            o(e)
                        }
                    }

                    function a(e) {
                        try {
                            u(n.throw(e))
                        } catch (e) {
                            o(e)
                        }
                    }

                    function u(e) {
                        var t;
                        e.done ? i(e.value) : ((t = e.value) instanceof r ? t : new r(function(e) {
                            e(t)
                        })).then(s, a)
                    }
                    u((n = n.apply(e, t || [])).next())
                })
            };
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.hashSha256Async = t.hashSha256 = void 0;
            let i = r(4378);

            function o(e) {
                return (0, i.sha256)(e)
            }
            t.hashSha256 = o, t.hashSha256Async = function(e) {
                return n(this, void 0, void 0, function*() {
                    try {
                        let t = "undefined" != typeof crypto && void 0 !== crypto.subtle;
                        if (t) {
                            let t = "string" == typeof e ? new TextEncoder().encode(e) : e,
                                r = yield crypto.subtle.digest("SHA-256", t);
                            return new Uint8Array(r)
                        } {
                            let t = r(18971);
                            if (!t.createHash) throw Error("`crypto` module does not contain `createHash`");
                            return Promise.resolve(t.createHash("sha256").update(e).digest())
                        }
                    } catch (t) {
                        return console.log(t), console.log('Crypto lib not found. Neither the global `crypto.subtle` Web Crypto API, nor the or the Node.js `require("crypto").createHash` module is available. Falling back to JS implementation.'), Promise.resolve(o(e))
                    }
                })
            }
        },
        11280: function(e, t, r) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.decodeToken = void 0;
            let n = r(96334);
            t.decodeToken = function(e) {
                if ("string" == typeof e) {
                    let t = e.split("."),
                        r = JSON.parse(n.decode(t[0])),
                        i = JSON.parse(n.decode(t[1])),
                        o = t[2];
                    return {
                        header: r,
                        payload: i,
                        signature: o
                    }
                }
                if ("object" == typeof e) {
                    if ("string" != typeof e.payload) throw Error("Expected token payload to be a base64 or json string");
                    let t = e.payload;
                    "{" !== e.payload[0] && (t = n.decode(t));
                    let r = [];
                    return e.header.map(e => {
                        let t = JSON.parse(n.decode(e));
                        r.push(t)
                    }), {
                        header: r,
                        payload: JSON.parse(t),
                        signature: e.signature
                    }
                }
            }
        },
        50882: function(e, t, r) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.joseToDer = t.derToJose = void 0;
            let n = r(216),
                i = r(96334);

            function o(e) {
                return (e / 8 | 0) + (e % 8 == 0 ? 0 : 1)
            }
            let s = {
                ES256: o(256),
                ES384: o(384),
                ES512: o(521)
            };

            function a(e) {
                let t = s[e];
                if (t) return t;
                throw Error(`Unknown algorithm "${e}"`)
            }

            function u(e) {
                if (e instanceof Uint8Array) return e;
                if ("string" == typeof e) return (0, n.toByteArray)((0, i.pad)(e));
                throw TypeError("ECDSA signature must be a Base64 string or a Uint8Array")
            }

            function l(e, t, r) {
                let n = 0;
                for (; t + n < r && 0 === e[t + n];) ++n;
                let i = e[t + n] >= 128;
                return i && --n, n
            }
            t.derToJose = function(e, t) {
                let r = u(e),
                    o = a(t),
                    s = o + 1,
                    l = r.length,
                    f = 0;
                if (48 !== r[f++]) throw Error('Could not find expected "seq"');
                let c = r[f++];
                if (129 === c && (c = r[f++]), l - f < c) throw Error(`"seq" specified length of "${c}", only "${l-f}" remaining`);
                if (2 !== r[f++]) throw Error('Could not find expected "int" for "r"');
                let h = r[f++];
                if (l - f - 2 < h) throw Error(`"r" specified length of "${h}", only "${l-f-2}" available`);
                if (s < h) throw Error(`"r" specified length of "${h}", max of "${s}" is acceptable`);
                let p = f;
                if (f += h, 2 !== r[f++]) throw Error('Could not find expected "int" for "s"');
                let d = r[f++];
                if (l - f !== d) throw Error(`"s" specified length of "${d}", expected "${l-f}"`);
                if (s < d) throw Error(`"s" specified length of "${d}", max of "${s}" is acceptable`);
                let y = f;
                if ((f += d) !== l) throw Error(`Expected to consume entire array, but "${l-f}" bytes remain`);
                let g = o - h,
                    b = o - d,
                    m = new Uint8Array(g + h + b + d);
                for (f = 0; f < g; ++f) m[f] = 0;
                m.set(r.subarray(p + Math.max(-g, 0), p + h), f), f = o;
                for (let e = f; f < e + b; ++f) m[f] = 0;
                return m.set(r.subarray(y + Math.max(-b, 0), y + d), f), (0, i.escape)((0, n.fromByteArray)(m))
            }, t.joseToDer = function(e, t) {
                e = u(e);
                let r = a(t),
                    n = e.length;
                if (n !== 2 * r) throw TypeError(`"${t}" signatures must be "${2*r}" bytes, saw "${n}"`);
                let i = l(e, 0, r),
                    o = l(e, r, e.length),
                    s = r - i,
                    f = r - o,
                    c = 2 + s + 1 + 1 + f,
                    h = c < 128,
                    p = new Uint8Array((h ? 2 : 3) + c),
                    d = 0;
                return p[d++] = 48, h ? p[d++] = c : (p[d++] = 129, p[d++] = 255 & c), p[d++] = 2, p[d++] = s, i < 0 ? (p[d++] = 0, p.set(e.subarray(0, r), d), d += r) : (p.set(e.subarray(i, r), d), d += r - i), p[d++] = 2, p[d++] = f, o < 0 ? (p[d++] = 0, p.set(e.subarray(r), d)) : p.set(e.subarray(r + o), d), p
            }
        },
        45010: function(e, t) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.InvalidTokenError = t.MissingParametersError = void 0, t.MissingParametersError = class extends Error {
                constructor(e) {
                    super(), this.name = "MissingParametersError", this.message = e || ""
                }
            }, t.InvalidTokenError = class extends Error {
                constructor(e) {
                    super(), this.name = "InvalidTokenError", this.message = e || ""
                }
            }
        },
        66630: function(e, t, r) {
            "use strict";
            var n = this && this.__createBinding || (Object.create ? function(e, t, r, n) {
                    void 0 === n && (n = r);
                    var i = Object.getOwnPropertyDescriptor(t, r);
                    (!i || ("get" in i ? !t.__esModule : i.writable || i.configurable)) && (i = {
                        enumerable: !0,
                        get: function() {
                            return t[r]
                        }
                    }), Object.defineProperty(e, n, i)
                } : function(e, t, r, n) {
                    void 0 === n && (n = r), e[n] = t[r]
                }),
                i = this && this.__exportStar || function(e, t) {
                    for (var r in e) "default" === r || Object.prototype.hasOwnProperty.call(t, r) || n(t, e, r)
                };
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), i(r(84654), t), i(r(82003), t), i(r(11280), t), i(r(45010), t), i(r(67609), t)
        },
        84654: function(e, t, r) {
            "use strict";
            var n = this && this.__awaiter || function(e, t, r, n) {
                return new(r || (r = Promise))(function(i, o) {
                    function s(e) {
                        try {
                            u(n.next(e))
                        } catch (e) {
                            o(e)
                        }
                    }

                    function a(e) {
                        try {
                            u(n.throw(e))
                        } catch (e) {
                            o(e)
                        }
                    }

                    function u(e) {
                        var t;
                        e.done ? i(e.value) : ((t = e.value) instanceof r ? t : new r(function(e) {
                            e(t)
                        })).then(s, a)
                    }
                    u((n = n.apply(e, t || [])).next())
                })
            };
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.TokenSigner = t.createUnsecuredToken = void 0;
            let i = r(96334),
                o = r(67609),
                s = r(45010),
                a = r(78754);

            function u(e, t) {
                let r = [],
                    n = i.encode(JSON.stringify(t));
                r.push(n);
                let o = i.encode(JSON.stringify(e));
                r.push(o);
                let s = r.join(".");
                return s
            }
            t.createUnsecuredToken = function(e) {
                return u(e, {
                    typ: "JWT",
                    alg: "none"
                }) + "."
            }, t.TokenSigner = class {
                constructor(e, t) {
                    if (!(e && t)) throw new s.MissingParametersError("a signing algorithm and private key are required");
                    if ("string" != typeof e) throw Error("signing algorithm parameter must be a string");
                    if (e = e.toUpperCase(), !o.cryptoClients.hasOwnProperty(e)) throw Error("invalid signing algorithm");
                    this.tokenType = "JWT", this.cryptoClient = o.cryptoClients[e], this.rawPrivateKey = t
                }
                header(e = {}) {
                    let t = {
                        typ: this.tokenType,
                        alg: this.cryptoClient.algorithmName
                    };
                    return Object.assign({}, t, e)
                }
                sign(e, t = !1, r = {}) {
                    let n = this.header(r),
                        i = u(e, n),
                        o = (0, a.hashSha256)(i);
                    return this.createWithSignedHash(e, t, n, i, o)
                }
                signAsync(e, t = !1, r = {}) {
                    return n(this, void 0, void 0, function*() {
                        let n = this.header(r),
                            i = u(e, n),
                            o = yield(0, a.hashSha256Async)(i);
                        return this.createWithSignedHash(e, t, n, i, o)
                    })
                }
                createWithSignedHash(e, t, r, n, o) {
                    let s = this.cryptoClient.signHash(o, this.rawPrivateKey);
                    if (!t) return [n, s].join("."); {
                        let t = {
                            header: [i.encode(JSON.stringify(r))],
                            payload: JSON.stringify(e),
                            signature: [s]
                        };
                        return t
                    }
                }
            }
        },
        82003: function(e, t, r) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.TokenVerifier = void 0;
            let n = r(96334),
                i = r(67609),
                o = r(45010),
                s = r(78754);
            t.TokenVerifier = class {
                constructor(e, t) {
                    if (!(e && t)) throw new o.MissingParametersError("a signing algorithm and public key are required");
                    if ("string" != typeof e) throw "signing algorithm parameter must be a string";
                    if (e = e.toUpperCase(), !i.cryptoClients.hasOwnProperty(e)) throw "invalid signing algorithm";
                    this.tokenType = "JWT", this.cryptoClient = i.cryptoClients[e], this.rawPublicKey = t
                }
                verify(e) {
                    return "string" == typeof e ? this.verifyCompact(e, !1) : "object" == typeof e && this.verifyExpanded(e, !1)
                }
                verifyAsync(e) {
                    return "string" == typeof e ? this.verifyCompact(e, !0) : "object" == typeof e ? this.verifyExpanded(e, !0) : Promise.resolve(!1)
                }
                verifyCompact(e, t) {
                    let r = e.split("."),
                        n = r[0] + "." + r[1],
                        i = e => {
                            let t = this.cryptoClient.loadSignature(r[2]);
                            return this.cryptoClient.verifyHash(e, t, this.rawPublicKey)
                        };
                    if (t) return (0, s.hashSha256Async)(n).then(e => i(e)); {
                        let e = (0, s.hashSha256)(n);
                        return i(e)
                    }
                }
                verifyExpanded(e, t) {
                    let r = [e.header.join("."), n.encode(e.payload)].join("."),
                        i = !0,
                        o = t => (e.signature.map(e => {
                            let r = this.cryptoClient.loadSignature(e),
                                n = this.cryptoClient.verifyHash(t, r, this.rawPublicKey);
                            n || (i = !1)
                        }), i);
                    if (t) return (0, s.hashSha256Async)(r).then(e => o(e)); {
                        let e = (0, s.hashSha256)(r);
                        return o(e)
                    }
                }
            }
        },
        75343: function(e, t, r) {
            "use strict";
            var n = r(3501),
                i = r(1360),
                o = r(2403).Buffer,
                s = Array(16);

            function a() {
                i.call(this, 64), this._a = 1732584193, this._b = 4023233417, this._c = 2562383102, this._d = 271733878
            }

            function u(e, t) {
                return e << t | e >>> 32 - t
            }

            function l(e, t, r, n, i, o, s) {
                return u(e + (t & r | ~t & n) + i + o | 0, s) + t | 0
            }

            function f(e, t, r, n, i, o, s) {
                return u(e + (t & n | r & ~n) + i + o | 0, s) + t | 0
            }

            function c(e, t, r, n, i, o, s) {
                return u(e + (t ^ r ^ n) + i + o | 0, s) + t | 0
            }

            function h(e, t, r, n, i, o, s) {
                return u(e + (r ^ (t | ~n)) + i + o | 0, s) + t | 0
            }
            n(a, i), a.prototype._update = function() {
                for (var e = 0; e < 16; ++e) s[e] = this._block.readInt32LE(4 * e);
                var t = this._a,
                    r = this._b,
                    n = this._c,
                    i = this._d;
                t = l(t, r, n, i, s[0], 3614090360, 7), i = l(i, t, r, n, s[1], 3905402710, 12), n = l(n, i, t, r, s[2], 606105819, 17), r = l(r, n, i, t, s[3], 3250441966, 22), t = l(t, r, n, i, s[4], 4118548399, 7), i = l(i, t, r, n, s[5], 1200080426, 12), n = l(n, i, t, r, s[6], 2821735955, 17), r = l(r, n, i, t, s[7], 4249261313, 22), t = l(t, r, n, i, s[8], 1770035416, 7), i = l(i, t, r, n, s[9], 2336552879, 12), n = l(n, i, t, r, s[10], 4294925233, 17), r = l(r, n, i, t, s[11], 2304563134, 22), t = l(t, r, n, i, s[12], 1804603682, 7), i = l(i, t, r, n, s[13], 4254626195, 12), n = l(n, i, t, r, s[14], 2792965006, 17), r = l(r, n, i, t, s[15], 1236535329, 22), t = f(t, r, n, i, s[1], 4129170786, 5), i = f(i, t, r, n, s[6], 3225465664, 9), n = f(n, i, t, r, s[11], 643717713, 14), r = f(r, n, i, t, s[0], 3921069994, 20), t = f(t, r, n, i, s[5], 3593408605, 5), i = f(i, t, r, n, s[10], 38016083, 9), n = f(n, i, t, r, s[15], 3634488961, 14), r = f(r, n, i, t, s[4], 3889429448, 20), t = f(t, r, n, i, s[9], 568446438, 5), i = f(i, t, r, n, s[14], 3275163606, 9), n = f(n, i, t, r, s[3], 4107603335, 14), r = f(r, n, i, t, s[8], 1163531501, 20), t = f(t, r, n, i, s[13], 2850285829, 5), i = f(i, t, r, n, s[2], 4243563512, 9), n = f(n, i, t, r, s[7], 1735328473, 14), r = f(r, n, i, t, s[12], 2368359562, 20), t = c(t, r, n, i, s[5], 4294588738, 4), i = c(i, t, r, n, s[8], 2272392833, 11), n = c(n, i, t, r, s[11], 1839030562, 16), r = c(r, n, i, t, s[14], 4259657740, 23), t = c(t, r, n, i, s[1], 2763975236, 4), i = c(i, t, r, n, s[4], 1272893353, 11), n = c(n, i, t, r, s[7], 4139469664, 16), r = c(r, n, i, t, s[10], 3200236656, 23), t = c(t, r, n, i, s[13], 681279174, 4), i = c(i, t, r, n, s[0], 3936430074, 11), n = c(n, i, t, r, s[3], 3572445317, 16), r = c(r, n, i, t, s[6], 76029189, 23), t = c(t, r, n, i, s[9], 3654602809, 4), i = c(i, t, r, n, s[12], 3873151461, 11), n = c(n, i, t, r, s[15], 530742520, 16), r = c(r, n, i, t, s[2], 3299628645, 23), t = h(t, r, n, i, s[0], 4096336452, 6), i = h(i, t, r, n, s[7], 1126891415, 10), n = h(n, i, t, r, s[14], 2878612391, 15), r = h(r, n, i, t, s[5], 4237533241, 21), t = h(t, r, n, i, s[12], 1700485571, 6), i = h(i, t, r, n, s[3], 2399980690, 10), n = h(n, i, t, r, s[10], 4293915773, 15), r = h(r, n, i, t, s[1], 2240044497, 21), t = h(t, r, n, i, s[8], 1873313359, 6), i = h(i, t, r, n, s[15], 4264355552, 10), n = h(n, i, t, r, s[6], 2734768916, 15), r = h(r, n, i, t, s[13], 1309151649, 21), t = h(t, r, n, i, s[4], 4149444226, 6), i = h(i, t, r, n, s[11], 3174756917, 10), n = h(n, i, t, r, s[2], 718787259, 15), r = h(r, n, i, t, s[9], 3951481745, 21), this._a = this._a + t | 0, this._b = this._b + r | 0, this._c = this._c + n | 0, this._d = this._d + i | 0
            }, a.prototype._digest = function() {
                this._block[this._blockOffset++] = 128, this._blockOffset > 56 && (this._block.fill(0, this._blockOffset, 64), this._update(), this._blockOffset = 0), this._block.fill(0, this._blockOffset, 56), this._block.writeUInt32LE(this._length[0], 56), this._block.writeUInt32LE(this._length[1], 60), this._update();
                var e = o.allocUnsafe(16);
                return e.writeInt32LE(this._a, 0), e.writeInt32LE(this._b, 4), e.writeInt32LE(this._c, 8), e.writeInt32LE(this._d, 12), e
            }, e.exports = a
        },
        78326: function(e) {
            ! function() {
                "use strict";
                var t = {
                        864: function(e) {
                            var t, r = "object" == typeof Reflect ? Reflect : null,
                                n = r && "function" == typeof r.apply ? r.apply : function(e, t, r) {
                                    return Function.prototype.apply.call(e, t, r)
                                };
                            t = r && "function" == typeof r.ownKeys ? r.ownKeys : Object.getOwnPropertySymbols ? function(e) {
                                return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e))
                            } : function(e) {
                                return Object.getOwnPropertyNames(e)
                            };
                            var i = Number.isNaN || function(e) {
                                return e != e
                            };

                            function o() {
                                o.init.call(this)
                            }
                            e.exports = o, e.exports.once = function(e, t) {
                                return new Promise(function(r, n) {
                                    function i(r) {
                                        e.removeListener(t, o), n(r)
                                    }

                                    function o() {
                                        "function" == typeof e.removeListener && e.removeListener("error", i), r([].slice.call(arguments))
                                    }
                                    y(e, t, o, {
                                        once: !0
                                    }), "error" !== t && "function" == typeof e.on && y(e, "error", i, {
                                        once: !0
                                    })
                                })
                            }, o.EventEmitter = o, o.prototype._events = void 0, o.prototype._eventsCount = 0, o.prototype._maxListeners = void 0;
                            var s = 10;

                            function a(e) {
                                if ("function" != typeof e) throw TypeError('The "listener" argument must be of type Function. Received type ' + typeof e)
                            }

                            function u(e) {
                                return void 0 === e._maxListeners ? o.defaultMaxListeners : e._maxListeners
                            }

                            function l(e, t, r, n) {
                                if (a(r), void 0 === (o = e._events) ? (o = e._events = Object.create(null), e._eventsCount = 0) : (void 0 !== o.newListener && (e.emit("newListener", t, r.listener ? r.listener : r), o = e._events), s = o[t]), void 0 === s) s = o[t] = r, ++e._eventsCount;
                                else if ("function" == typeof s ? s = o[t] = n ? [r, s] : [s, r] : n ? s.unshift(r) : s.push(r), (i = u(e)) > 0 && s.length > i && !s.warned) {
                                    s.warned = !0;
                                    var i, o, s, l = Error("Possible EventEmitter memory leak detected. " + s.length + " " + String(t) + " listeners added. Use emitter.setMaxListeners() to increase limit");
                                    l.name = "MaxListenersExceededWarning", l.emitter = e, l.type = t, l.count = s.length, console && console.warn && console.warn(l)
                                }
                                return e
                            }

                            function f() {
                                if (!this.fired) return (this.target.removeListener(this.type, this.wrapFn), this.fired = !0, 0 == arguments.length) ? this.listener.call(this.target) : this.listener.apply(this.target, arguments)
                            }

                            function c(e, t, r) {
                                var n = {
                                        fired: !1,
                                        wrapFn: void 0,
                                        target: e,
                                        type: t,
                                        listener: r
                                    },
                                    i = f.bind(n);
                                return i.listener = r, n.wrapFn = i, i
                            }

                            function h(e, t, r) {
                                var n = e._events;
                                if (void 0 === n) return [];
                                var i = n[t];
                                return void 0 === i ? [] : "function" == typeof i ? r ? [i.listener || i] : [i] : r ? function(e) {
                                    for (var t = Array(e.length), r = 0; r < t.length; ++r) t[r] = e[r].listener || e[r];
                                    return t
                                }(i) : d(i, i.length)
                            }

                            function p(e) {
                                var t = this._events;
                                if (void 0 !== t) {
                                    var r = t[e];
                                    if ("function" == typeof r) return 1;
                                    if (void 0 !== r) return r.length
                                }
                                return 0
                            }

                            function d(e, t) {
                                for (var r = Array(t), n = 0; n < t; ++n) r[n] = e[n];
                                return r
                            }

                            function y(e, t, r, n) {
                                if ("function" == typeof e.on) n.once ? e.once(t, r) : e.on(t, r);
                                else if ("function" == typeof e.addEventListener) e.addEventListener(t, function i(o) {
                                    n.once && e.removeEventListener(t, i), r(o)
                                });
                                else throw TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof e)
                            }
                            Object.defineProperty(o, "defaultMaxListeners", {
                                enumerable: !0,
                                get: function() {
                                    return s
                                },
                                set: function(e) {
                                    if ("number" != typeof e || e < 0 || i(e)) throw RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + e + ".");
                                    s = e
                                }
                            }), o.init = function() {
                                (void 0 === this._events || this._events === Object.getPrototypeOf(this)._events) && (this._events = Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0
                            }, o.prototype.setMaxListeners = function(e) {
                                if ("number" != typeof e || e < 0 || i(e)) throw RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + e + ".");
                                return this._maxListeners = e, this
                            }, o.prototype.getMaxListeners = function() {
                                return u(this)
                            }, o.prototype.emit = function(e) {
                                for (var t = [], r = 1; r < arguments.length; r++) t.push(arguments[r]);
                                var i = "error" === e,
                                    o = this._events;
                                if (void 0 !== o) i = i && void 0 === o.error;
                                else if (!i) return !1;
                                if (i) {
                                    if (t.length > 0 && (s = t[0]), s instanceof Error) throw s;
                                    var s, a = Error("Unhandled error." + (s ? " (" + s.message + ")" : ""));
                                    throw a.context = s, a
                                }
                                var u = o[e];
                                if (void 0 === u) return !1;
                                if ("function" == typeof u) n(u, this, t);
                                else
                                    for (var l = u.length, f = d(u, l), r = 0; r < l; ++r) n(f[r], this, t);
                                return !0
                            }, o.prototype.addListener = function(e, t) {
                                return l(this, e, t, !1)
                            }, o.prototype.on = o.prototype.addListener, o.prototype.prependListener = function(e, t) {
                                return l(this, e, t, !0)
                            }, o.prototype.once = function(e, t) {
                                return a(t), this.on(e, c(this, e, t)), this
                            }, o.prototype.prependOnceListener = function(e, t) {
                                return a(t), this.prependListener(e, c(this, e, t)), this
                            }, o.prototype.removeListener = function(e, t) {
                                var r, n, i, o, s;
                                if (a(t), void 0 === (n = this._events) || void 0 === (r = n[e])) return this;
                                if (r === t || r.listener === t) 0 == --this._eventsCount ? this._events = Object.create(null) : (delete n[e], n.removeListener && this.emit("removeListener", e, r.listener || t));
                                else if ("function" != typeof r) {
                                    for (i = -1, o = r.length - 1; o >= 0; o--)
                                        if (r[o] === t || r[o].listener === t) {
                                            s = r[o].listener, i = o;
                                            break
                                        }
                                    if (i < 0) return this;
                                    0 === i ? r.shift() : function(e, t) {
                                        for (; t + 1 < e.length; t++) e[t] = e[t + 1];
                                        e.pop()
                                    }(r, i), 1 === r.length && (n[e] = r[0]), void 0 !== n.removeListener && this.emit("removeListener", e, s || t)
                                }
                                return this
                            }, o.prototype.off = o.prototype.removeListener, o.prototype.removeAllListeners = function(e) {
                                var t, r, n;
                                if (void 0 === (r = this._events)) return this;
                                if (void 0 === r.removeListener) return 0 == arguments.length ? (this._events = Object.create(null), this._eventsCount = 0) : void 0 !== r[e] && (0 == --this._eventsCount ? this._events = Object.create(null) : delete r[e]), this;
                                if (0 == arguments.length) {
                                    var i, o = Object.keys(r);
                                    for (n = 0; n < o.length; ++n) "removeListener" !== (i = o[n]) && this.removeAllListeners(i);
                                    return this.removeAllListeners("removeListener"), this._events = Object.create(null), this._eventsCount = 0, this
                                }
                                if ("function" == typeof(t = r[e])) this.removeListener(e, t);
                                else if (void 0 !== t)
                                    for (n = t.length - 1; n >= 0; n--) this.removeListener(e, t[n]);
                                return this
                            }, o.prototype.listeners = function(e) {
                                return h(this, e, !0)
                            }, o.prototype.rawListeners = function(e) {
                                return h(this, e, !1)
                            }, o.listenerCount = function(e, t) {
                                return "function" == typeof e.listenerCount ? e.listenerCount(t) : p.call(e, t)
                            }, o.prototype.listenerCount = p, o.prototype.eventNames = function() {
                                return this._eventsCount > 0 ? t(this._events) : []
                            }
                        }
                    },
                    r = {};

                function n(e) {
                    var i = r[e];
                    if (void 0 !== i) return i.exports;
                    var o = r[e] = {
                            exports: {}
                        },
                        s = !0;
                    try {
                        t[e](o, o.exports, n), s = !1
                    } finally {
                        s && delete r[e]
                    }
                    return o.exports
                }
                n.ab = "//";
                var i = n(864);
                e.exports = i
            }()
        },
        85981: function(e, t, r) {
            var n = r(28611);
            ! function() {
                var t = {
                        782: function(e) {
                            "function" == typeof Object.create ? e.exports = function(e, t) {
                                t && (e.super_ = t, e.prototype = Object.create(t.prototype, {
                                    constructor: {
                                        value: e,
                                        enumerable: !1,
                                        writable: !0,
                                        configurable: !0
                                    }
                                }))
                            } : e.exports = function(e, t) {
                                if (t) {
                                    e.super_ = t;
                                    var r = function() {};
                                    r.prototype = t.prototype, e.prototype = new r, e.prototype.constructor = e
                                }
                            }
                        },
                        646: function(e) {
                            "use strict";
                            let t = {};

                            function r(e, r, n) {
                                n || (n = Error);
                                class i extends n {
                                    constructor(e, t, n) {
                                        super("string" == typeof r ? r : r(e, t, n))
                                    }
                                }
                                i.prototype.name = n.name, i.prototype.code = e, t[e] = i
                            }

                            function n(e, t) {
                                if (!Array.isArray(e)) return `of ${t} ${String(e)}`; {
                                    let r = e.length;
                                    return (e = e.map(e => String(e)), r > 2) ? `one of ${t} ${e.slice(0,r-1).join(", ")}, or ` + e[r - 1] : 2 === r ? `one of ${t} ${e[0]} or ${e[1]}` : `of ${t} ${e[0]}`
                                }
                            }
                            r("ERR_INVALID_OPT_VALUE", function(e, t) {
                                return 'The value "' + t + '" is invalid for option "' + e + '"'
                            }, TypeError), r("ERR_INVALID_ARG_TYPE", function(e, t, r) {
                                var i, o, s, a, u;
                                let l, f;
                                if ("string" == typeof t && (i = "not ", t.substr(!o || o < 0 ? 0 : +o, i.length) === i) ? (l = "must not be", t = t.replace(/^not /, "")) : l = "must be", s = " argument", (void 0 === a || a > e.length) && (a = e.length), e.substring(a - s.length, a) === s) f = `The ${e} ${l} ${n(t,"type")}`;
                                else {
                                    let r = ("number" != typeof u && (u = 0), u + 1 > e.length || -1 === e.indexOf(".", u)) ? "argument" : "property";
                                    f = `The "${e}" ${r} ${l} ${n(t,"type")}`
                                }
                                return f + `. Received type ${typeof r}`
                            }, TypeError), r("ERR_STREAM_PUSH_AFTER_EOF", "stream.push() after EOF"), r("ERR_METHOD_NOT_IMPLEMENTED", function(e) {
                                return "The " + e + " method is not implemented"
                            }), r("ERR_STREAM_PREMATURE_CLOSE", "Premature close"), r("ERR_STREAM_DESTROYED", function(e) {
                                return "Cannot call " + e + " after a stream was destroyed"
                            }), r("ERR_MULTIPLE_CALLBACK", "Callback called multiple times"), r("ERR_STREAM_CANNOT_PIPE", "Cannot pipe, not readable"), r("ERR_STREAM_WRITE_AFTER_END", "write after end"), r("ERR_STREAM_NULL_VALUES", "May not write null values to stream", TypeError), r("ERR_UNKNOWN_ENCODING", function(e) {
                                return "Unknown encoding: " + e
                            }, TypeError), r("ERR_STREAM_UNSHIFT_AFTER_END_EVENT", "stream.unshift() after end event"), e.exports.q = t
                        },
                        403: function(e, t, r) {
                            "use strict";
                            var i = Object.keys || function(e) {
                                var t = [];
                                for (var r in e) t.push(r);
                                return t
                            };
                            e.exports = f;
                            var o = r(709),
                                s = r(337);
                            r(782)(f, o);
                            for (var a = i(s.prototype), u = 0; u < a.length; u++) {
                                var l = a[u];
                                f.prototype[l] || (f.prototype[l] = s.prototype[l])
                            }

                            function f(e) {
                                if (!(this instanceof f)) return new f(e);
                                o.call(this, e), s.call(this, e), this.allowHalfOpen = !0, e && (!1 === e.readable && (this.readable = !1), !1 === e.writable && (this.writable = !1), !1 === e.allowHalfOpen && (this.allowHalfOpen = !1, this.once("end", c)))
                            }

                            function c() {
                                this._writableState.ended || n.nextTick(h, this)
                            }

                            function h(e) {
                                e.end()
                            }
                            Object.defineProperty(f.prototype, "writableHighWaterMark", {
                                enumerable: !1,
                                get: function() {
                                    return this._writableState.highWaterMark
                                }
                            }), Object.defineProperty(f.prototype, "writableBuffer", {
                                enumerable: !1,
                                get: function() {
                                    return this._writableState && this._writableState.getBuffer()
                                }
                            }), Object.defineProperty(f.prototype, "writableLength", {
                                enumerable: !1,
                                get: function() {
                                    return this._writableState.length
                                }
                            }), Object.defineProperty(f.prototype, "destroyed", {
                                enumerable: !1,
                                get: function() {
                                    return void 0 !== this._readableState && void 0 !== this._writableState && this._readableState.destroyed && this._writableState.destroyed
                                },
                                set: function(e) {
                                    void 0 !== this._readableState && void 0 !== this._writableState && (this._readableState.destroyed = e, this._writableState.destroyed = e)
                                }
                            })
                        },
                        889: function(e, t, r) {
                            "use strict";
                            e.exports = i;
                            var n = r(170);

                            function i(e) {
                                if (!(this instanceof i)) return new i(e);
                                n.call(this, e)
                            }
                            r(782)(i, n), i.prototype._transform = function(e, t, r) {
                                r(null, e)
                            }
                        },
                        709: function(e, t, i) {
                            "use strict";
                            e.exports = O, O.ReadableState = A, i(361).EventEmitter;
                            var o, s, a, u, l, f = function(e, t) {
                                    return e.listeners(t).length
                                },
                                c = i(678),
                                h = i(300).Buffer,
                                p = r.g.Uint8Array || function() {},
                                d = i(837);
                            s = d && d.debuglog ? d.debuglog("stream") : function() {};
                            var y = i(379),
                                g = i(25),
                                b = i(776).getHighWaterMark,
                                m = i(646).q,
                                w = m.ERR_INVALID_ARG_TYPE,
                                E = m.ERR_STREAM_PUSH_AFTER_EOF,
                                S = m.ERR_METHOD_NOT_IMPLEMENTED,
                                v = m.ERR_STREAM_UNSHIFT_AFTER_END_EVENT;
                            i(782)(O, c);
                            var _ = g.errorOrDestroy,
                                T = ["error", "close", "destroy", "pause", "resume"];

                            function A(e, t, r) {
                                o = o || i(403), e = e || {}, "boolean" != typeof r && (r = t instanceof o), this.objectMode = !!e.objectMode, r && (this.objectMode = this.objectMode || !!e.readableObjectMode), this.highWaterMark = b(this, e, "readableHighWaterMark", r), this.buffer = new y, this.length = 0, this.pipes = null, this.pipesCount = 0, this.flowing = null, this.ended = !1, this.endEmitted = !1, this.reading = !1, this.sync = !0, this.needReadable = !1, this.emittedReadable = !1, this.readableListening = !1, this.resumeScheduled = !1, this.paused = !0, this.emitClose = !1 !== e.emitClose, this.autoDestroy = !!e.autoDestroy, this.destroyed = !1, this.defaultEncoding = e.defaultEncoding || "utf8", this.awaitDrain = 0, this.readingMore = !1, this.decoder = null, this.encoding = null, e.encoding && (a || (a = i(704).s), this.decoder = new a(e.encoding), this.encoding = e.encoding)
                            }

                            function O(e) {
                                if (o = o || i(403), !(this instanceof O)) return new O(e);
                                var t = this instanceof o;
                                this._readableState = new A(e, this, t), this.readable = !0, e && ("function" == typeof e.read && (this._read = e.read), "function" == typeof e.destroy && (this._destroy = e.destroy)), c.call(this)
                            }

                            function I(e, t, r, n, i) {
                                s("readableAddChunk", t);
                                var o, a, u, l, f, c = e._readableState;
                                if (null === t) c.reading = !1,
                                    function(e, t) {
                                        if (s("onEofChunk"), !t.ended) {
                                            if (t.decoder) {
                                                var r = t.decoder.end();
                                                r && r.length && (t.buffer.push(r), t.length += t.objectMode ? 1 : r.length)
                                            }
                                            t.ended = !0, t.sync ? x(e) : (t.needReadable = !1, t.emittedReadable || (t.emittedReadable = !0, R(e)))
                                        }
                                    }(e, c);
                                else {
                                    if (i || (o = c, a = t, h.isBuffer(a) || a instanceof p || "string" == typeof a || void 0 === a || o.objectMode || (u = new w("chunk", ["string", "Buffer", "Uint8Array"], a)), f = u), f) _(e, f);
                                    else if (c.objectMode || t && t.length > 0) {
                                        if ("string" == typeof t || c.objectMode || Object.getPrototypeOf(t) === h.prototype || (l = t, t = h.from(l)), n) c.endEmitted ? _(e, new v) : P(e, c, t, !0);
                                        else if (c.ended) _(e, new E);
                                        else {
                                            if (c.destroyed) return !1;
                                            c.reading = !1, c.decoder && !r ? (t = c.decoder.write(t), c.objectMode || 0 !== t.length ? P(e, c, t, !1) : B(e, c)) : P(e, c, t, !1)
                                        }
                                    } else n || (c.reading = !1, B(e, c))
                                }
                                return !c.ended && (c.length < c.highWaterMark || 0 === c.length)
                            }

                            function P(e, t, r, n) {
                                t.flowing && 0 === t.length && !t.sync ? (t.awaitDrain = 0, e.emit("data", r)) : (t.length += t.objectMode ? 1 : r.length, n ? t.buffer.unshift(r) : t.buffer.push(r), t.needReadable && x(e)), B(e, t)
                            }

                            function k(e, t) {
                                if (e <= 0 || 0 === t.length && t.ended) return 0;
                                if (t.objectMode) return 1;
                                if (e != e) return t.flowing && t.length ? t.buffer.head.data.length : t.length;
                                if (e > t.highWaterMark) {
                                    var r;
                                    t.highWaterMark = ((r = e) >= 1073741824 ? r = 1073741824 : (r--, r |= r >>> 1, r |= r >>> 2, r |= r >>> 4, r |= r >>> 8, r |= r >>> 16, r++), r)
                                }
                                return e <= t.length ? e : t.ended ? t.length : (t.needReadable = !0, 0)
                            }

                            function x(e) {
                                var t = e._readableState;
                                s("emitReadable", t.needReadable, t.emittedReadable), t.needReadable = !1, t.emittedReadable || (s("emitReadable", t.flowing), t.emittedReadable = !0, n.nextTick(R, e))
                            }

                            function R(e) {
                                var t = e._readableState;
                                s("emitReadable_", t.destroyed, t.length, t.ended), !t.destroyed && (t.length || t.ended) && (e.emit("readable"), t.emittedReadable = !1), t.needReadable = !t.flowing && !t.ended && t.length <= t.highWaterMark, H(e)
                            }

                            function B(e, t) {
                                t.readingMore || (t.readingMore = !0, n.nextTick(N, e, t))
                            }

                            function N(e, t) {
                                for (; !t.reading && !t.ended && (t.length < t.highWaterMark || t.flowing && 0 === t.length);) {
                                    var r = t.length;
                                    if (s("maybeReadMore read 0"), e.read(0), r === t.length) break
                                }
                                t.readingMore = !1
                            }

                            function U(e) {
                                var t = e._readableState;
                                t.readableListening = e.listenerCount("readable") > 0, t.resumeScheduled && !t.paused ? t.flowing = !0 : e.listenerCount("data") > 0 && e.resume()
                            }

                            function C(e) {
                                s("readable nexttick read 0"), e.read(0)
                            }

                            function L(e, t) {
                                s("resume", t.reading), t.reading || e.read(0), t.resumeScheduled = !1, e.emit("resume"), H(e), t.flowing && !t.reading && e.read(0)
                            }

                            function H(e) {
                                var t = e._readableState;
                                for (s("flow", t.flowing); t.flowing && null !== e.read(););
                            }

                            function j(e, t) {
                                var r;
                                return 0 === t.length ? null : (t.objectMode ? r = t.buffer.shift() : !e || e >= t.length ? (r = t.decoder ? t.buffer.join("") : 1 === t.buffer.length ? t.buffer.first() : t.buffer.concat(t.length), t.buffer.clear()) : r = t.buffer.consume(e, t.decoder), r)
                            }

                            function D(e) {
                                var t = e._readableState;
                                s("endReadable", t.endEmitted), t.endEmitted || (t.ended = !0, n.nextTick(M, t, e))
                            }

                            function M(e, t) {
                                if (s("endReadableNT", e.endEmitted, e.length), !e.endEmitted && 0 === e.length && (e.endEmitted = !0, t.readable = !1, t.emit("end"), e.autoDestroy)) {
                                    var r = t._writableState;
                                    (!r || r.autoDestroy && r.finished) && t.destroy()
                                }
                            }

                            function F(e, t) {
                                for (var r = 0, n = e.length; r < n; r++)
                                    if (e[r] === t) return r;
                                return -1
                            }
                            Object.defineProperty(O.prototype, "destroyed", {
                                enumerable: !1,
                                get: function() {
                                    return void 0 !== this._readableState && this._readableState.destroyed
                                },
                                set: function(e) {
                                    this._readableState && (this._readableState.destroyed = e)
                                }
                            }), O.prototype.destroy = g.destroy, O.prototype._undestroy = g.undestroy, O.prototype._destroy = function(e, t) {
                                t(e)
                            }, O.prototype.push = function(e, t) {
                                var r, n = this._readableState;
                                return n.objectMode ? r = !0 : "string" == typeof e && ((t = t || n.defaultEncoding) !== n.encoding && (e = h.from(e, t), t = ""), r = !0), I(this, e, t, !1, r)
                            }, O.prototype.unshift = function(e) {
                                return I(this, e, null, !0, !1)
                            }, O.prototype.isPaused = function() {
                                return !1 === this._readableState.flowing
                            }, O.prototype.setEncoding = function(e) {
                                a || (a = i(704).s);
                                var t = new a(e);
                                this._readableState.decoder = t, this._readableState.encoding = this._readableState.decoder.encoding;
                                for (var r = this._readableState.buffer.head, n = ""; null !== r;) n += t.write(r.data), r = r.next;
                                return this._readableState.buffer.clear(), "" !== n && this._readableState.buffer.push(n), this._readableState.length = n.length, this
                            }, O.prototype.read = function(e) {
                                s("read", e), e = parseInt(e, 10);
                                var t, r = this._readableState,
                                    n = e;
                                if (0 !== e && (r.emittedReadable = !1), 0 === e && r.needReadable && ((0 !== r.highWaterMark ? r.length >= r.highWaterMark : r.length > 0) || r.ended)) return s("read: emitReadable", r.length, r.ended), 0 === r.length && r.ended ? D(this) : x(this), null;
                                if (0 === (e = k(e, r)) && r.ended) return 0 === r.length && D(this), null;
                                var i = r.needReadable;
                                return s("need readable", i), (0 === r.length || r.length - e < r.highWaterMark) && s("length less than watermark", i = !0), r.ended || r.reading ? s("reading or ended", i = !1) : i && (s("do read"), r.reading = !0, r.sync = !0, 0 === r.length && (r.needReadable = !0), this._read(r.highWaterMark), r.sync = !1, r.reading || (e = k(n, r))), null === (t = e > 0 ? j(e, r) : null) ? (r.needReadable = r.length <= r.highWaterMark, e = 0) : (r.length -= e, r.awaitDrain = 0), 0 === r.length && (r.ended || (r.needReadable = !0), n !== e && r.ended && D(this)), null !== t && this.emit("data", t), t
                            }, O.prototype._read = function(e) {
                                _(this, new S("_read()"))
                            }, O.prototype.pipe = function(e, t) {
                                var r = this,
                                    i = this._readableState;
                                switch (i.pipesCount) {
                                    case 0:
                                        i.pipes = e;
                                        break;
                                    case 1:
                                        i.pipes = [i.pipes, e];
                                        break;
                                    default:
                                        i.pipes.push(e)
                                }
                                i.pipesCount += 1, s("pipe count=%d opts=%j", i.pipesCount, t);
                                var o = t && !1 === t.end || e === n.stdout || e === n.stderr ? y : a;

                                function a() {
                                    s("onend"), e.end()
                                }
                                i.endEmitted ? n.nextTick(o) : r.once("end", o), e.on("unpipe", function t(n, o) {
                                    s("onunpipe"), n === r && o && !1 === o.hasUnpiped && (o.hasUnpiped = !0, s("cleanup"), e.removeListener("close", p), e.removeListener("finish", d), e.removeListener("drain", u), e.removeListener("error", h), e.removeListener("unpipe", t), r.removeListener("end", a), r.removeListener("end", y), r.removeListener("data", c), l = !0, i.awaitDrain && (!e._writableState || e._writableState.needDrain) && u())
                                });
                                var u = function() {
                                    var e = r._readableState;
                                    s("pipeOnDrain", e.awaitDrain), e.awaitDrain && e.awaitDrain--, 0 === e.awaitDrain && f(r, "data") && (e.flowing = !0, H(r))
                                };
                                e.on("drain", u);
                                var l = !1;

                                function c(t) {
                                    s("ondata");
                                    var n = e.write(t);
                                    s("dest.write", n), !1 === n && ((1 === i.pipesCount && i.pipes === e || i.pipesCount > 1 && -1 !== F(i.pipes, e)) && !l && (s("false write response, pause", i.awaitDrain), i.awaitDrain++), r.pause())
                                }

                                function h(t) {
                                    s("onerror", t), y(), e.removeListener("error", h), 0 === f(e, "error") && _(e, t)
                                }

                                function p() {
                                    e.removeListener("finish", d), y()
                                }

                                function d() {
                                    s("onfinish"), e.removeListener("close", p), y()
                                }

                                function y() {
                                    s("unpipe"), r.unpipe(e)
                                }
                                return r.on("data", c),
                                    function(e, t, r) {
                                        if ("function" == typeof e.prependListener) return e.prependListener(t, r);
                                        e._events && e._events[t] ? Array.isArray(e._events[t]) ? e._events[t].unshift(r) : e._events[t] = [r, e._events[t]] : e.on(t, r)
                                    }(e, "error", h), e.once("close", p), e.once("finish", d), e.emit("pipe", r), i.flowing || (s("pipe resume"), r.resume()), e
                            }, O.prototype.unpipe = function(e) {
                                var t = this._readableState,
                                    r = {
                                        hasUnpiped: !1
                                    };
                                if (0 === t.pipesCount) return this;
                                if (1 === t.pipesCount) return e && e !== t.pipes || (e || (e = t.pipes), t.pipes = null, t.pipesCount = 0, t.flowing = !1, e && e.emit("unpipe", this, r)), this;
                                if (!e) {
                                    var n = t.pipes,
                                        i = t.pipesCount;
                                    t.pipes = null, t.pipesCount = 0, t.flowing = !1;
                                    for (var o = 0; o < i; o++) n[o].emit("unpipe", this, {
                                        hasUnpiped: !1
                                    });
                                    return this
                                }
                                var s = F(t.pipes, e);
                                return -1 === s || (t.pipes.splice(s, 1), t.pipesCount -= 1, 1 === t.pipesCount && (t.pipes = t.pipes[0]), e.emit("unpipe", this, r)), this
                            }, O.prototype.on = function(e, t) {
                                var r = c.prototype.on.call(this, e, t),
                                    i = this._readableState;
                                return "data" === e ? (i.readableListening = this.listenerCount("readable") > 0, !1 !== i.flowing && this.resume()) : "readable" !== e || i.endEmitted || i.readableListening || (i.readableListening = i.needReadable = !0, i.flowing = !1, i.emittedReadable = !1, s("on readable", i.length, i.reading), i.length ? x(this) : i.reading || n.nextTick(C, this)), r
                            }, O.prototype.addListener = O.prototype.on, O.prototype.removeListener = function(e, t) {
                                var r = c.prototype.removeListener.call(this, e, t);
                                return "readable" === e && n.nextTick(U, this), r
                            }, O.prototype.removeAllListeners = function(e) {
                                var t = c.prototype.removeAllListeners.apply(this, arguments);
                                return ("readable" === e || void 0 === e) && n.nextTick(U, this), t
                            }, O.prototype.resume = function() {
                                var e = this._readableState;
                                return e.flowing || (s("resume"), e.flowing = !e.readableListening, e.resumeScheduled || (e.resumeScheduled = !0, n.nextTick(L, this, e))), e.paused = !1, this
                            }, O.prototype.pause = function() {
                                return s("call pause flowing=%j", this._readableState.flowing), !1 !== this._readableState.flowing && (s("pause"), this._readableState.flowing = !1, this.emit("pause")), this._readableState.paused = !0, this
                            }, O.prototype.wrap = function(e) {
                                var t = this,
                                    r = this._readableState,
                                    n = !1;
                                for (var i in e.on("end", function() {
                                        if (s("wrapped end"), r.decoder && !r.ended) {
                                            var e = r.decoder.end();
                                            e && e.length && t.push(e)
                                        }
                                        t.push(null)
                                    }), e.on("data", function(i) {
                                        s("wrapped data"), r.decoder && (i = r.decoder.write(i)), (!r.objectMode || null != i) && (r.objectMode || i && i.length) && (t.push(i) || (n = !0, e.pause()))
                                    }), e) void 0 === this[i] && "function" == typeof e[i] && (this[i] = function(t) {
                                    return function() {
                                        return e[t].apply(e, arguments)
                                    }
                                }(i));
                                for (var o = 0; o < T.length; o++) e.on(T[o], this.emit.bind(this, T[o]));
                                return this._read = function(t) {
                                    s("wrapped _read", t), n && (n = !1, e.resume())
                                }, this
                            }, "function" == typeof Symbol && (O.prototype[Symbol.asyncIterator] = function() {
                                return void 0 === u && (u = i(871)), u(this)
                            }), Object.defineProperty(O.prototype, "readableHighWaterMark", {
                                enumerable: !1,
                                get: function() {
                                    return this._readableState.highWaterMark
                                }
                            }), Object.defineProperty(O.prototype, "readableBuffer", {
                                enumerable: !1,
                                get: function() {
                                    return this._readableState && this._readableState.buffer
                                }
                            }), Object.defineProperty(O.prototype, "readableFlowing", {
                                enumerable: !1,
                                get: function() {
                                    return this._readableState.flowing
                                },
                                set: function(e) {
                                    this._readableState && (this._readableState.flowing = e)
                                }
                            }), O._fromList = j, Object.defineProperty(O.prototype, "readableLength", {
                                enumerable: !1,
                                get: function() {
                                    return this._readableState.length
                                }
                            }), "function" == typeof Symbol && (O.from = function(e, t) {
                                return void 0 === l && (l = i(727)), l(O, e, t)
                            })
                        },
                        170: function(e, t, r) {
                            "use strict";
                            e.exports = f;
                            var n = r(646).q,
                                i = n.ERR_METHOD_NOT_IMPLEMENTED,
                                o = n.ERR_MULTIPLE_CALLBACK,
                                s = n.ERR_TRANSFORM_ALREADY_TRANSFORMING,
                                a = n.ERR_TRANSFORM_WITH_LENGTH_0,
                                u = r(403);

                            function l(e, t) {
                                var r = this._transformState;
                                r.transforming = !1;
                                var n = r.writecb;
                                if (null === n) return this.emit("error", new o);
                                r.writechunk = null, r.writecb = null, null != t && this.push(t), n(e);
                                var i = this._readableState;
                                i.reading = !1, (i.needReadable || i.length < i.highWaterMark) && this._read(i.highWaterMark)
                            }

                            function f(e) {
                                if (!(this instanceof f)) return new f(e);
                                u.call(this, e), this._transformState = {
                                    afterTransform: l.bind(this),
                                    needTransform: !1,
                                    transforming: !1,
                                    writecb: null,
                                    writechunk: null,
                                    writeencoding: null
                                }, this._readableState.needReadable = !0, this._readableState.sync = !1, e && ("function" == typeof e.transform && (this._transform = e.transform), "function" == typeof e.flush && (this._flush = e.flush)), this.on("prefinish", c)
                            }

                            function c() {
                                var e = this;
                                "function" != typeof this._flush || this._readableState.destroyed ? h(this, null, null) : this._flush(function(t, r) {
                                    h(e, t, r)
                                })
                            }

                            function h(e, t, r) {
                                if (t) return e.emit("error", t);
                                if (null != r && e.push(r), e._writableState.length) throw new a;
                                if (e._transformState.transforming) throw new s;
                                return e.push(null)
                            }
                            r(782)(f, u), f.prototype.push = function(e, t) {
                                return this._transformState.needTransform = !1, u.prototype.push.call(this, e, t)
                            }, f.prototype._transform = function(e, t, r) {
                                r(new i("_transform()"))
                            }, f.prototype._write = function(e, t, r) {
                                var n = this._transformState;
                                if (n.writecb = r, n.writechunk = e, n.writeencoding = t, !n.transforming) {
                                    var i = this._readableState;
                                    (n.needTransform || i.needReadable || i.length < i.highWaterMark) && this._read(i.highWaterMark)
                                }
                            }, f.prototype._read = function(e) {
                                var t = this._transformState;
                                null === t.writechunk || t.transforming ? t.needTransform = !0 : (t.transforming = !0, this._transform(t.writechunk, t.writeencoding, t.afterTransform))
                            }, f.prototype._destroy = function(e, t) {
                                u.prototype._destroy.call(this, e, function(e) {
                                    t(e)
                                })
                            }
                        },
                        337: function(e, t, i) {
                            "use strict";

                            function o(e) {
                                var t = this;
                                this.next = null, this.entry = null, this.finish = function() {
                                    (function(e, t, r) {
                                        var n = e.entry;
                                        for (e.entry = null; n;) {
                                            var i = n.callback;
                                            t.pendingcb--, i(void 0), n = n.next
                                        }
                                        t.corkedRequestsFree.next = e
                                    })(t, e)
                                }
                            }
                            e.exports = O, O.WritableState = A;
                            var s, a, u = {
                                    deprecate: i(769)
                                },
                                l = i(678),
                                f = i(300).Buffer,
                                c = r.g.Uint8Array || function() {},
                                h = i(25),
                                p = i(776).getHighWaterMark,
                                d = i(646).q,
                                y = d.ERR_INVALID_ARG_TYPE,
                                g = d.ERR_METHOD_NOT_IMPLEMENTED,
                                b = d.ERR_MULTIPLE_CALLBACK,
                                m = d.ERR_STREAM_CANNOT_PIPE,
                                w = d.ERR_STREAM_DESTROYED,
                                E = d.ERR_STREAM_NULL_VALUES,
                                S = d.ERR_STREAM_WRITE_AFTER_END,
                                v = d.ERR_UNKNOWN_ENCODING,
                                _ = h.errorOrDestroy;

                            function T() {}

                            function A(e, t, r) {
                                s = s || i(403), e = e || {}, "boolean" != typeof r && (r = t instanceof s), this.objectMode = !!e.objectMode, r && (this.objectMode = this.objectMode || !!e.writableObjectMode), this.highWaterMark = p(this, e, "writableHighWaterMark", r), this.finalCalled = !1, this.needDrain = !1, this.ending = !1, this.ended = !1, this.finished = !1, this.destroyed = !1;
                                var a = !1 === e.decodeStrings;
                                this.decodeStrings = !a, this.defaultEncoding = e.defaultEncoding || "utf8", this.length = 0, this.writing = !1, this.corked = 0, this.sync = !0, this.bufferProcessing = !1, this.onwrite = function(e) {
                                    (function(e, t) {
                                        var r = e._writableState,
                                            i = r.sync,
                                            o = r.writecb;
                                        if ("function" != typeof o) throw new b;
                                        if (r.writing = !1, r.writecb = null, r.length -= r.writelen, r.writelen = 0, t) --r.pendingcb, i ? (n.nextTick(o, t), n.nextTick(B, e, r), e._writableState.errorEmitted = !0, _(e, t)) : (o(t), e._writableState.errorEmitted = !0, _(e, t), B(e, r));
                                        else {
                                            var s = x(r) || e.destroyed;
                                            s || r.corked || r.bufferProcessing || !r.bufferedRequest || k(e, r), i ? n.nextTick(P, e, r, s, o) : P(e, r, s, o)
                                        }
                                    })(t, e)
                                }, this.writecb = null, this.writelen = 0, this.bufferedRequest = null, this.lastBufferedRequest = null, this.pendingcb = 0, this.prefinished = !1, this.errorEmitted = !1, this.emitClose = !1 !== e.emitClose, this.autoDestroy = !!e.autoDestroy, this.bufferedRequestCount = 0, this.corkedRequestsFree = new o(this)
                            }

                            function O(e) {
                                var t = this instanceof(s = s || i(403));
                                if (!t && !a.call(O, this)) return new O(e);
                                this._writableState = new A(e, this, t), this.writable = !0, e && ("function" == typeof e.write && (this._write = e.write), "function" == typeof e.writev && (this._writev = e.writev), "function" == typeof e.destroy && (this._destroy = e.destroy), "function" == typeof e.final && (this._final = e.final)), l.call(this)
                            }

                            function I(e, t, r, n, i, o, s) {
                                t.writelen = n, t.writecb = s, t.writing = !0, t.sync = !0, t.destroyed ? t.onwrite(new w("write")) : r ? e._writev(i, t.onwrite) : e._write(i, o, t.onwrite), t.sync = !1
                            }

                            function P(e, t, r, n) {
                                r || 0 === t.length && t.needDrain && (t.needDrain = !1, e.emit("drain")), t.pendingcb--, n(), B(e, t)
                            }

                            function k(e, t) {
                                t.bufferProcessing = !0;
                                var r = t.bufferedRequest;
                                if (e._writev && r && r.next) {
                                    var n = Array(t.bufferedRequestCount),
                                        i = t.corkedRequestsFree;
                                    i.entry = r;
                                    for (var s = 0, a = !0; r;) n[s] = r, r.isBuf || (a = !1), r = r.next, s += 1;
                                    n.allBuffers = a, I(e, t, !0, t.length, n, "", i.finish), t.pendingcb++, t.lastBufferedRequest = null, i.next ? (t.corkedRequestsFree = i.next, i.next = null) : t.corkedRequestsFree = new o(t), t.bufferedRequestCount = 0
                                } else {
                                    for (; r;) {
                                        var u = r.chunk,
                                            l = r.encoding,
                                            f = r.callback,
                                            c = t.objectMode ? 1 : u.length;
                                        if (I(e, t, !1, c, u, l, f), r = r.next, t.bufferedRequestCount--, t.writing) break
                                    }
                                    null === r && (t.lastBufferedRequest = null)
                                }
                                t.bufferedRequest = r, t.bufferProcessing = !1
                            }

                            function x(e) {
                                return e.ending && 0 === e.length && null === e.bufferedRequest && !e.finished && !e.writing
                            }

                            function R(e, t) {
                                e._final(function(r) {
                                    t.pendingcb--, r && _(e, r), t.prefinished = !0, e.emit("prefinish"), B(e, t)
                                })
                            }

                            function B(e, t) {
                                var r = x(t);
                                if (r && (t.prefinished || t.finalCalled || ("function" != typeof e._final || t.destroyed ? (t.prefinished = !0, e.emit("prefinish")) : (t.pendingcb++, t.finalCalled = !0, n.nextTick(R, e, t))), 0 === t.pendingcb && (t.finished = !0, e.emit("finish"), t.autoDestroy))) {
                                    var i = e._readableState;
                                    (!i || i.autoDestroy && i.endEmitted) && e.destroy()
                                }
                                return r
                            }
                            i(782)(O, l), A.prototype.getBuffer = function() {
                                    for (var e = this.bufferedRequest, t = []; e;) t.push(e), e = e.next;
                                    return t
                                },
                                function() {
                                    try {
                                        Object.defineProperty(A.prototype, "buffer", {
                                            get: u.deprecate(function() {
                                                return this.getBuffer()
                                            }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003")
                                        })
                                    } catch (e) {}
                                }(), "function" == typeof Symbol && Symbol.hasInstance && "function" == typeof Function.prototype[Symbol.hasInstance] ? (a = Function.prototype[Symbol.hasInstance], Object.defineProperty(O, Symbol.hasInstance, {
                                    value: function(e) {
                                        return !!a.call(this, e) || this === O && e && e._writableState instanceof A
                                    }
                                })) : a = function(e) {
                                    return e instanceof this
                                }, O.prototype.pipe = function() {
                                    _(this, new m)
                                }, O.prototype.write = function(e, t, r) {
                                    var i, o, s, a, u, l, h, p = this._writableState,
                                        d = !1,
                                        g = !p.objectMode && (i = e, f.isBuffer(i) || i instanceof c);
                                    return g && !f.isBuffer(e) && (o = e, e = f.from(o)), ("function" == typeof t && (r = t, t = null), g ? t = "buffer" : t || (t = p.defaultEncoding), "function" != typeof r && (r = T), p.ending) ? (s = r, _(this, a = new S), n.nextTick(s, a)) : (g || (u = e, l = r, null === u ? h = new E : "string" == typeof u || p.objectMode || (h = new y("chunk", ["string", "Buffer"], u)), !h || (_(this, h), n.nextTick(l, h), 0))) && (p.pendingcb++, d = function(e, t, r, n, i, o) {
                                        if (!r) {
                                            var s, a, u = (s = n, a = i, t.objectMode || !1 === t.decodeStrings || "string" != typeof s || (s = f.from(s, a)), s);
                                            n !== u && (r = !0, i = "buffer", n = u)
                                        }
                                        var l = t.objectMode ? 1 : n.length;
                                        t.length += l;
                                        var c = t.length < t.highWaterMark;
                                        if (c || (t.needDrain = !0), t.writing || t.corked) {
                                            var h = t.lastBufferedRequest;
                                            t.lastBufferedRequest = {
                                                chunk: n,
                                                encoding: i,
                                                isBuf: r,
                                                callback: o,
                                                next: null
                                            }, h ? h.next = t.lastBufferedRequest : t.bufferedRequest = t.lastBufferedRequest, t.bufferedRequestCount += 1
                                        } else I(e, t, !1, l, n, i, o);
                                        return c
                                    }(this, p, g, e, t, r)), d
                                }, O.prototype.cork = function() {
                                    this._writableState.corked++
                                }, O.prototype.uncork = function() {
                                    var e = this._writableState;
                                    !e.corked || (e.corked--, e.writing || e.corked || e.bufferProcessing || !e.bufferedRequest || k(this, e))
                                }, O.prototype.setDefaultEncoding = function(e) {
                                    if ("string" == typeof e && (e = e.toLowerCase()), !(["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((e + "").toLowerCase()) > -1)) throw new v(e);
                                    return this._writableState.defaultEncoding = e, this
                                }, Object.defineProperty(O.prototype, "writableBuffer", {
                                    enumerable: !1,
                                    get: function() {
                                        return this._writableState && this._writableState.getBuffer()
                                    }
                                }), Object.defineProperty(O.prototype, "writableHighWaterMark", {
                                    enumerable: !1,
                                    get: function() {
                                        return this._writableState.highWaterMark
                                    }
                                }), O.prototype._write = function(e, t, r) {
                                    r(new g("_write()"))
                                }, O.prototype._writev = null, O.prototype.end = function(e, t, r) {
                                    var i, o = this._writableState;
                                    return "function" == typeof e ? (r = e, e = null, t = null) : "function" == typeof t && (r = t, t = null), null != e && this.write(e, t), o.corked && (o.corked = 1, this.uncork()), o.ending || (i = r, o.ending = !0, B(this, o), i && (o.finished ? n.nextTick(i) : this.once("finish", i)), o.ended = !0, this.writable = !1), this
                                }, Object.defineProperty(O.prototype, "writableLength", {
                                    enumerable: !1,
                                    get: function() {
                                        return this._writableState.length
                                    }
                                }), Object.defineProperty(O.prototype, "destroyed", {
                                    enumerable: !1,
                                    get: function() {
                                        return void 0 !== this._writableState && this._writableState.destroyed
                                    },
                                    set: function(e) {
                                        this._writableState && (this._writableState.destroyed = e)
                                    }
                                }), O.prototype.destroy = h.destroy, O.prototype._undestroy = h.undestroy, O.prototype._destroy = function(e, t) {
                                    t(e)
                                }
                        },
                        871: function(e, t, r) {
                            "use strict";

                            function i(e, t, r) {
                                return t in e ? Object.defineProperty(e, t, {
                                    value: r,
                                    enumerable: !0,
                                    configurable: !0,
                                    writable: !0
                                }) : e[t] = r, e
                            }
                            var o, s = r(698),
                                a = Symbol("lastResolve"),
                                u = Symbol("lastReject"),
                                l = Symbol("error"),
                                f = Symbol("ended"),
                                c = Symbol("lastPromise"),
                                h = Symbol("handlePromise"),
                                p = Symbol("stream");

                            function d(e, t) {
                                return {
                                    value: e,
                                    done: t
                                }
                            }

                            function y(e) {
                                var t = e[a];
                                if (null !== t) {
                                    var r = e[p].read();
                                    null !== r && (e[c] = null, e[a] = null, e[u] = null, t(d(r, !1)))
                                }
                            }

                            function g(e) {
                                n.nextTick(y, e)
                            }
                            var b = Object.getPrototypeOf(function() {}),
                                m = Object.setPrototypeOf((i(o = {
                                    get stream() {
                                        return this[p]
                                    },
                                    next: function() {
                                        var e, t, r = this,
                                            i = this[l];
                                        if (null !== i) return Promise.reject(i);
                                        if (this[f]) return Promise.resolve(d(void 0, !0));
                                        if (this[p].destroyed) return new Promise(function(e, t) {
                                            n.nextTick(function() {
                                                r[l] ? t(r[l]) : e(d(void 0, !0))
                                            })
                                        });
                                        var o = this[c];
                                        if (o) t = new Promise((e = this, function(t, r) {
                                            o.then(function() {
                                                if (e[f]) {
                                                    t(d(void 0, !0));
                                                    return
                                                }
                                                e[h](t, r)
                                            }, r)
                                        }));
                                        else {
                                            var s = this[p].read();
                                            if (null !== s) return Promise.resolve(d(s, !1));
                                            t = new Promise(this[h])
                                        }
                                        return this[c] = t, t
                                    }
                                }, Symbol.asyncIterator, function() {
                                    return this
                                }), i(o, "return", function() {
                                    var e = this;
                                    return new Promise(function(t, r) {
                                        e[p].destroy(null, function(e) {
                                            if (e) {
                                                r(e);
                                                return
                                            }
                                            t(d(void 0, !0))
                                        })
                                    })
                                }), o), b);
                            e.exports = function(e) {
                                var t, r = Object.create(m, (i(t = {}, p, {
                                    value: e,
                                    writable: !0
                                }), i(t, a, {
                                    value: null,
                                    writable: !0
                                }), i(t, u, {
                                    value: null,
                                    writable: !0
                                }), i(t, l, {
                                    value: null,
                                    writable: !0
                                }), i(t, f, {
                                    value: e._readableState.endEmitted,
                                    writable: !0
                                }), i(t, h, {
                                    value: function(e, t) {
                                        var n = r[p].read();
                                        n ? (r[c] = null, r[a] = null, r[u] = null, e(d(n, !1))) : (r[a] = e, r[u] = t)
                                    },
                                    writable: !0
                                }), t));
                                return r[c] = null, s(e, function(e) {
                                    if (e && "ERR_STREAM_PREMATURE_CLOSE" !== e.code) {
                                        var t = r[u];
                                        null !== t && (r[c] = null, r[a] = null, r[u] = null, t(e)), r[l] = e;
                                        return
                                    }
                                    var n = r[a];
                                    null !== n && (r[c] = null, r[a] = null, r[u] = null, n(d(void 0, !0))), r[f] = !0
                                }), e.on("readable", g.bind(null, r)), r
                            }
                        },
                        379: function(e, t, r) {
                            "use strict";

                            function n(e, t) {
                                var r = Object.keys(e);
                                if (Object.getOwnPropertySymbols) {
                                    var n = Object.getOwnPropertySymbols(e);
                                    t && (n = n.filter(function(t) {
                                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                                    })), r.push.apply(r, n)
                                }
                                return r
                            }

                            function i(e, t) {
                                for (var r = 0; r < t.length; r++) {
                                    var n = t[r];
                                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                                }
                            }
                            var o = r(300).Buffer,
                                s = r(837).inspect,
                                a = s && s.custom || "inspect";
                            e.exports = function() {
                                var e, t;

                                function r() {
                                    ! function(e, t) {
                                        if (!(e instanceof t)) throw TypeError("Cannot call a class as a function")
                                    }(this, r), this.head = null, this.tail = null, this.length = 0
                                }
                                return e = [{
                                    key: "push",
                                    value: function(e) {
                                        var t = {
                                            data: e,
                                            next: null
                                        };
                                        this.length > 0 ? this.tail.next = t : this.head = t, this.tail = t, ++this.length
                                    }
                                }, {
                                    key: "unshift",
                                    value: function(e) {
                                        var t = {
                                            data: e,
                                            next: this.head
                                        };
                                        0 === this.length && (this.tail = t), this.head = t, ++this.length
                                    }
                                }, {
                                    key: "shift",
                                    value: function() {
                                        if (0 !== this.length) {
                                            var e = this.head.data;
                                            return 1 === this.length ? this.head = this.tail = null : this.head = this.head.next, --this.length, e
                                        }
                                    }
                                }, {
                                    key: "clear",
                                    value: function() {
                                        this.head = this.tail = null, this.length = 0
                                    }
                                }, {
                                    key: "join",
                                    value: function(e) {
                                        if (0 === this.length) return "";
                                        for (var t = this.head, r = "" + t.data; t = t.next;) r += e + t.data;
                                        return r
                                    }
                                }, {
                                    key: "concat",
                                    value: function(e) {
                                        if (0 === this.length) return o.alloc(0);
                                        for (var t, r, n = o.allocUnsafe(e >>> 0), i = this.head, s = 0; i;) t = i.data, r = s, o.prototype.copy.call(t, n, r), s += i.data.length, i = i.next;
                                        return n
                                    }
                                }, {
                                    key: "consume",
                                    value: function(e, t) {
                                        var r;
                                        return e < this.head.data.length ? (r = this.head.data.slice(0, e), this.head.data = this.head.data.slice(e)) : r = e === this.head.data.length ? this.shift() : t ? this._getString(e) : this._getBuffer(e), r
                                    }
                                }, {
                                    key: "first",
                                    value: function() {
                                        return this.head.data
                                    }
                                }, {
                                    key: "_getString",
                                    value: function(e) {
                                        var t = this.head,
                                            r = 1,
                                            n = t.data;
                                        for (e -= n.length; t = t.next;) {
                                            var i = t.data,
                                                o = e > i.length ? i.length : e;
                                            if (o === i.length ? n += i : n += i.slice(0, e), 0 == (e -= o)) {
                                                o === i.length ? (++r, t.next ? this.head = t.next : this.head = this.tail = null) : (this.head = t, t.data = i.slice(o));
                                                break
                                            }++r
                                        }
                                        return this.length -= r, n
                                    }
                                }, {
                                    key: "_getBuffer",
                                    value: function(e) {
                                        var t = o.allocUnsafe(e),
                                            r = this.head,
                                            n = 1;
                                        for (r.data.copy(t), e -= r.data.length; r = r.next;) {
                                            var i = r.data,
                                                s = e > i.length ? i.length : e;
                                            if (i.copy(t, t.length - e, 0, s), 0 == (e -= s)) {
                                                s === i.length ? (++n, r.next ? this.head = r.next : this.head = this.tail = null) : (this.head = r, r.data = i.slice(s));
                                                break
                                            }++n
                                        }
                                        return this.length -= n, t
                                    }
                                }, {
                                    key: a,
                                    value: function(e, t) {
                                        return s(this, function(e) {
                                            for (var t = 1; t < arguments.length; t++) {
                                                var r = null != arguments[t] ? arguments[t] : {};
                                                t % 2 ? n(Object(r), !0).forEach(function(t) {
                                                    var n;
                                                    n = r[t], t in e ? Object.defineProperty(e, t, {
                                                        value: n,
                                                        enumerable: !0,
                                                        configurable: !0,
                                                        writable: !0
                                                    }) : e[t] = n
                                                }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : n(Object(r)).forEach(function(t) {
                                                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
                                                })
                                            }
                                            return e
                                        }({}, t, {
                                            depth: 0,
                                            customInspect: !1
                                        }))
                                    }
                                }], i(r.prototype, e), t && i(r, t), r
                            }()
                        },
                        25: function(e) {
                            "use strict";

                            function t(e, t) {
                                i(e, t), r(e)
                            }

                            function r(e) {
                                (!e._writableState || e._writableState.emitClose) && (!e._readableState || e._readableState.emitClose) && e.emit("close")
                            }

                            function i(e, t) {
                                e.emit("error", t)
                            }
                            e.exports = {
                                destroy: function(e, o) {
                                    var s = this,
                                        a = this._readableState && this._readableState.destroyed,
                                        u = this._writableState && this._writableState.destroyed;
                                    return a || u ? (o ? o(e) : e && (this._writableState ? this._writableState.errorEmitted || (this._writableState.errorEmitted = !0, n.nextTick(i, this, e)) : n.nextTick(i, this, e)), this) : (this._readableState && (this._readableState.destroyed = !0), this._writableState && (this._writableState.destroyed = !0), this._destroy(e || null, function(e) {
                                        !o && e ? s._writableState ? s._writableState.errorEmitted ? n.nextTick(r, s) : (s._writableState.errorEmitted = !0, n.nextTick(t, s, e)) : n.nextTick(t, s, e) : o ? (n.nextTick(r, s), o(e)) : n.nextTick(r, s)
                                    }), this)
                                },
                                undestroy: function() {
                                    this._readableState && (this._readableState.destroyed = !1, this._readableState.reading = !1, this._readableState.ended = !1, this._readableState.endEmitted = !1), this._writableState && (this._writableState.destroyed = !1, this._writableState.ended = !1, this._writableState.ending = !1, this._writableState.finalCalled = !1, this._writableState.prefinished = !1, this._writableState.finished = !1, this._writableState.errorEmitted = !1)
                                },
                                errorOrDestroy: function(e, t) {
                                    var r = e._readableState,
                                        n = e._writableState;
                                    r && r.autoDestroy || n && n.autoDestroy ? e.destroy(t) : e.emit("error", t)
                                }
                            }
                        },
                        698: function(e, t, r) {
                            "use strict";
                            var n = r(646).q.ERR_STREAM_PREMATURE_CLOSE;

                            function i() {}
                            e.exports = function e(t, r, o) {
                                if ("function" == typeof r) return e(t, null, r);
                                r || (r = {}), s = o || i, a = !1, o = function() {
                                    if (!a) {
                                        a = !0;
                                        for (var e = arguments.length, t = Array(e), r = 0; r < e; r++) t[r] = arguments[r];
                                        s.apply(this, t)
                                    }
                                };
                                var s, a, u = r.readable || !1 !== r.readable && t.readable,
                                    l = r.writable || !1 !== r.writable && t.writable,
                                    f = function() {
                                        t.writable || h()
                                    },
                                    c = t._writableState && t._writableState.finished,
                                    h = function() {
                                        l = !1, c = !0, u || o.call(t)
                                    },
                                    p = t._readableState && t._readableState.endEmitted,
                                    d = function() {
                                        u = !1, p = !0, l || o.call(t)
                                    },
                                    y = function(e) {
                                        o.call(t, e)
                                    },
                                    g = function() {
                                        var e;
                                        return u && !p ? (t._readableState && t._readableState.ended || (e = new n), o.call(t, e)) : l && !c ? (t._writableState && t._writableState.ended || (e = new n), o.call(t, e)) : void 0
                                    },
                                    b = function() {
                                        t.req.on("finish", h)
                                    };
                                return t.setHeader && "function" == typeof t.abort ? (t.on("complete", h), t.on("abort", g), t.req ? b() : t.on("request", b)) : l && !t._writableState && (t.on("end", f), t.on("close", f)), t.on("end", d), t.on("finish", h), !1 !== r.error && t.on("error", y), t.on("close", g),
                                    function() {
                                        t.removeListener("complete", h), t.removeListener("abort", g), t.removeListener("request", b), t.req && t.req.removeListener("finish", h), t.removeListener("end", f), t.removeListener("close", f), t.removeListener("finish", h), t.removeListener("end", d), t.removeListener("error", y), t.removeListener("close", g)
                                    }
                            }
                        },
                        727: function(e, t, r) {
                            "use strict";

                            function n(e, t, r, n, i, o, s) {
                                try {
                                    var a = e[o](s),
                                        u = a.value
                                } catch (e) {
                                    r(e);
                                    return
                                }
                                a.done ? t(u) : Promise.resolve(u).then(n, i)
                            }

                            function i(e, t) {
                                var r = Object.keys(e);
                                if (Object.getOwnPropertySymbols) {
                                    var n = Object.getOwnPropertySymbols(e);
                                    t && (n = n.filter(function(t) {
                                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                                    })), r.push.apply(r, n)
                                }
                                return r
                            }
                            var o = r(646).q.ERR_INVALID_ARG_TYPE;
                            e.exports = function(e, t, r) {
                                if (t && "function" == typeof t.next) s = t;
                                else if (t && t[Symbol.asyncIterator]) s = t[Symbol.asyncIterator]();
                                else if (t && t[Symbol.iterator]) s = t[Symbol.iterator]();
                                else throw new o("iterable", ["Iterable"], t);
                                var s, a = new e(function(e) {
                                        for (var t = 1; t < arguments.length; t++) {
                                            var r = null != arguments[t] ? arguments[t] : {};
                                            t % 2 ? i(Object(r), !0).forEach(function(t) {
                                                var n;
                                                n = r[t], t in e ? Object.defineProperty(e, t, {
                                                    value: n,
                                                    enumerable: !0,
                                                    configurable: !0,
                                                    writable: !0
                                                }) : e[t] = n
                                            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : i(Object(r)).forEach(function(t) {
                                                Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
                                            })
                                        }
                                        return e
                                    }({
                                        objectMode: !0
                                    }, r)),
                                    u = !1;

                                function l() {
                                    return f.apply(this, arguments)
                                }

                                function f() {
                                    var e;
                                    return e = function*() {
                                        try {
                                            var e = yield s.next(), t = e.value;
                                            e.done ? a.push(null) : a.push((yield t)) ? l() : u = !1
                                        } catch (e) {
                                            a.destroy(e)
                                        }
                                    }, (f = function() {
                                        var t = this,
                                            r = arguments;
                                        return new Promise(function(i, o) {
                                            var s = e.apply(t, r);

                                            function a(e) {
                                                n(s, i, o, a, u, "next", e)
                                            }

                                            function u(e) {
                                                n(s, i, o, a, u, "throw", e)
                                            }
                                            a(void 0)
                                        })
                                    }).apply(this, arguments)
                                }
                                return a._read = function() {
                                    u || (u = !0, l())
                                }, a
                            }
                        },
                        442: function(e, t, r) {
                            "use strict";
                            var n, i = r(646).q,
                                o = i.ERR_MISSING_ARGS,
                                s = i.ERR_STREAM_DESTROYED;

                            function a(e) {
                                if (e) throw e
                            }

                            function u(e) {
                                e()
                            }

                            function l(e, t) {
                                return e.pipe(t)
                            }
                            e.exports = function() {
                                for (var e, t, i = arguments.length, f = Array(i), c = 0; c < i; c++) f[c] = arguments[c];
                                var h = (e = f).length && "function" == typeof e[e.length - 1] ? e.pop() : a;
                                if (Array.isArray(f[0]) && (f = f[0]), f.length < 2) throw new o("streams");
                                var p = f.map(function(e, i) {
                                    var o, a, l, c, d, y = i < f.length - 1;
                                    return a = o = function(e) {
                                            t || (t = e), e && p.forEach(u), y || (p.forEach(u), h(t))
                                        }, l = !1, o = function() {
                                            l || (l = !0, a.apply(void 0, arguments))
                                        }, c = !1, e.on("close", function() {
                                            c = !0
                                        }), void 0 === n && (n = r(698)), n(e, {
                                            readable: y,
                                            writable: i > 0
                                        }, function(e) {
                                            if (e) return o(e);
                                            c = !0, o()
                                        }), d = !1,
                                        function(t) {
                                            if (!c && !d) {
                                                if (d = !0, e.setHeader && "function" == typeof e.abort) return e.abort();
                                                if ("function" == typeof e.destroy) return e.destroy();
                                                o(t || new s("pipe"))
                                            }
                                        }
                                });
                                return f.reduce(l)
                            }
                        },
                        776: function(e, t, r) {
                            "use strict";
                            var n = r(646).q.ERR_INVALID_OPT_VALUE;
                            e.exports = {
                                getHighWaterMark: function(e, t, r, i) {
                                    var o = null != t.highWaterMark ? t.highWaterMark : i ? t[r] : null;
                                    if (null != o) {
                                        if (!(isFinite(o) && Math.floor(o) === o) || o < 0) {
                                            var s = i ? r : "highWaterMark";
                                            throw new n(s, o)
                                        }
                                        return Math.floor(o)
                                    }
                                    return e.objectMode ? 16 : 16384
                                }
                            }
                        },
                        678: function(e, t, r) {
                            e.exports = r(781)
                        },
                        55: function(e, t, r) {
                            var n = r(300),
                                i = n.Buffer;

                            function o(e, t) {
                                for (var r in e) t[r] = e[r]
                            }

                            function s(e, t, r) {
                                return i(e, t, r)
                            }
                            i.from && i.alloc && i.allocUnsafe && i.allocUnsafeSlow ? e.exports = n : (o(n, t), t.Buffer = s), s.prototype = Object.create(i.prototype), o(i, s), s.from = function(e, t, r) {
                                if ("number" == typeof e) throw TypeError("Argument must not be a number");
                                return i(e, t, r)
                            }, s.alloc = function(e, t, r) {
                                if ("number" != typeof e) throw TypeError("Argument must be a number");
                                var n = i(e);
                                return void 0 !== t ? "string" == typeof r ? n.fill(t, r) : n.fill(t) : n.fill(0), n
                            }, s.allocUnsafe = function(e) {
                                if ("number" != typeof e) throw TypeError("Argument must be a number");
                                return i(e)
                            }, s.allocUnsafeSlow = function(e) {
                                if ("number" != typeof e) throw TypeError("Argument must be a number");
                                return n.SlowBuffer(e)
                            }
                        },
                        173: function(e, t, r) {
                            e.exports = i;
                            var n = r(361).EventEmitter;

                            function i() {
                                n.call(this)
                            }
                            r(782)(i, n), i.Readable = r(709), i.Writable = r(337), i.Duplex = r(403), i.Transform = r(170), i.PassThrough = r(889), i.finished = r(698), i.pipeline = r(442), i.Stream = i, i.prototype.pipe = function(e, t) {
                                var r = this;

                                function i(t) {
                                    e.writable && !1 === e.write(t) && r.pause && r.pause()
                                }

                                function o() {
                                    r.readable && r.resume && r.resume()
                                }
                                r.on("data", i), e.on("drain", o), e._isStdio || t && !1 === t.end || (r.on("end", a), r.on("close", u));
                                var s = !1;

                                function a() {
                                    s || (s = !0, e.end())
                                }

                                function u() {
                                    s || (s = !0, "function" == typeof e.destroy && e.destroy())
                                }

                                function l(e) {
                                    if (f(), 0 === n.listenerCount(this, "error")) throw e
                                }

                                function f() {
                                    r.removeListener("data", i), e.removeListener("drain", o), r.removeListener("end", a), r.removeListener("close", u), r.removeListener("error", l), e.removeListener("error", l), r.removeListener("end", f), r.removeListener("close", f), e.removeListener("close", f)
                                }
                                return r.on("error", l), e.on("error", l), r.on("end", f), r.on("close", f), e.on("close", f), e.emit("pipe", r), e
                            }
                        },
                        704: function(e, t, r) {
                            "use strict";
                            var n = r(55).Buffer,
                                i = n.isEncoding || function(e) {
                                    switch ((e = "" + e) && e.toLowerCase()) {
                                        case "hex":
                                        case "utf8":
                                        case "utf-8":
                                        case "ascii":
                                        case "binary":
                                        case "base64":
                                        case "ucs2":
                                        case "ucs-2":
                                        case "utf16le":
                                        case "utf-16le":
                                        case "raw":
                                            return !0;
                                        default:
                                            return !1
                                    }
                                };

                            function o(e) {
                                var t;
                                switch (this.encoding = function(e) {
                                    var t = function(e) {
                                        var t;
                                        if (!e) return "utf8";
                                        for (;;) switch (e) {
                                            case "utf8":
                                            case "utf-8":
                                                return "utf8";
                                            case "ucs2":
                                            case "ucs-2":
                                            case "utf16le":
                                            case "utf-16le":
                                                return "utf16le";
                                            case "latin1":
                                            case "binary":
                                                return "latin1";
                                            case "base64":
                                            case "ascii":
                                            case "hex":
                                                return e;
                                            default:
                                                if (t) return;
                                                e = ("" + e).toLowerCase(), t = !0
                                        }
                                    }(e);
                                    if ("string" != typeof t && (n.isEncoding === i || !i(e))) throw Error("Unknown encoding: " + e);
                                    return t || e
                                }(e), this.encoding) {
                                    case "utf16le":
                                        this.text = u, this.end = l, t = 4;
                                        break;
                                    case "utf8":
                                        this.fillLast = a, t = 4;
                                        break;
                                    case "base64":
                                        this.text = f, this.end = c, t = 3;
                                        break;
                                    default:
                                        this.write = h, this.end = p;
                                        return
                                }
                                this.lastNeed = 0, this.lastTotal = 0, this.lastChar = n.allocUnsafe(t)
                            }

                            function s(e) {
                                return e <= 127 ? 0 : e >> 5 == 6 ? 2 : e >> 4 == 14 ? 3 : e >> 3 == 30 ? 4 : e >> 6 == 2 ? -1 : -2
                            }

                            function a(e) {
                                var t = this.lastTotal - this.lastNeed,
                                    r = function(e, t, r) {
                                        if ((192 & t[0]) != 128) return e.lastNeed = 0, "�";
                                        if (e.lastNeed > 1 && t.length > 1) {
                                            if ((192 & t[1]) != 128) return e.lastNeed = 1, "�";
                                            if (e.lastNeed > 2 && t.length > 2 && (192 & t[2]) != 128) return e.lastNeed = 2, "�"
                                        }
                                    }(this, e, 0);
                                return void 0 !== r ? r : this.lastNeed <= e.length ? (e.copy(this.lastChar, t, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal)) : void(e.copy(this.lastChar, t, 0, e.length), this.lastNeed -= e.length)
                            }

                            function u(e, t) {
                                if ((e.length - t) % 2 == 0) {
                                    var r = e.toString("utf16le", t);
                                    if (r) {
                                        var n = r.charCodeAt(r.length - 1);
                                        if (n >= 55296 && n <= 56319) return this.lastNeed = 2, this.lastTotal = 4, this.lastChar[0] = e[e.length - 2], this.lastChar[1] = e[e.length - 1], r.slice(0, -1)
                                    }
                                    return r
                                }
                                return this.lastNeed = 1, this.lastTotal = 2, this.lastChar[0] = e[e.length - 1], e.toString("utf16le", t, e.length - 1)
                            }

                            function l(e) {
                                var t = e && e.length ? this.write(e) : "";
                                if (this.lastNeed) {
                                    var r = this.lastTotal - this.lastNeed;
                                    return t + this.lastChar.toString("utf16le", 0, r)
                                }
                                return t
                            }

                            function f(e, t) {
                                var r = (e.length - t) % 3;
                                return 0 === r ? e.toString("base64", t) : (this.lastNeed = 3 - r, this.lastTotal = 3, 1 === r ? this.lastChar[0] = e[e.length - 1] : (this.lastChar[0] = e[e.length - 2], this.lastChar[1] = e[e.length - 1]), e.toString("base64", t, e.length - r))
                            }

                            function c(e) {
                                var t = e && e.length ? this.write(e) : "";
                                return this.lastNeed ? t + this.lastChar.toString("base64", 0, 3 - this.lastNeed) : t
                            }

                            function h(e) {
                                return e.toString(this.encoding)
                            }

                            function p(e) {
                                return e && e.length ? this.write(e) : ""
                            }
                            t.s = o, o.prototype.write = function(e) {
                                var t, r;
                                if (0 === e.length) return "";
                                if (this.lastNeed) {
                                    if (void 0 === (t = this.fillLast(e))) return "";
                                    r = this.lastNeed, this.lastNeed = 0
                                } else r = 0;
                                return r < e.length ? t ? t + this.text(e, r) : this.text(e, r) : t || ""
                            }, o.prototype.end = function(e) {
                                var t = e && e.length ? this.write(e) : "";
                                return this.lastNeed ? t + "�" : t
                            }, o.prototype.text = function(e, t) {
                                var r = function(e, t, r) {
                                    var n = t.length - 1;
                                    if (n < r) return 0;
                                    var i = s(t[n]);
                                    return i >= 0 ? (i > 0 && (e.lastNeed = i - 1), i) : --n < r || -2 === i ? 0 : (i = s(t[n])) >= 0 ? (i > 0 && (e.lastNeed = i - 2), i) : --n < r || -2 === i ? 0 : (i = s(t[n])) >= 0 ? (i > 0 && (2 === i ? i = 0 : e.lastNeed = i - 3), i) : 0
                                }(this, e, t);
                                if (!this.lastNeed) return e.toString("utf8", t);
                                this.lastTotal = r;
                                var n = e.length - (r - this.lastNeed);
                                return e.copy(this.lastChar, 0, n), e.toString("utf8", t, n)
                            }, o.prototype.fillLast = function(e) {
                                if (this.lastNeed <= e.length) return e.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
                                e.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, e.length), this.lastNeed -= e.length
                            }
                        },
                        769: function(e) {
                            e.exports = function(e, r) {
                                if (t("noDeprecation")) return e;
                                var n = !1;
                                return function() {
                                    if (!n) {
                                        if (t("throwDeprecation")) throw Error(r);
                                        t("traceDeprecation") ? console.trace(r) : console.warn(r), n = !0
                                    }
                                    return e.apply(this, arguments)
                                }
                            };

                            function t(e) {
                                try {
                                    if (!r.g.localStorage) return !1
                                } catch (e) {
                                    return !1
                                }
                                var t = r.g.localStorage[e];
                                return null != t && "true" === String(t).toLowerCase()
                            }
                        },
                        300: function(e) {
                            "use strict";
                            e.exports = r(91083)
                        },
                        361: function(e) {
                            "use strict";
                            e.exports = r(78326)
                        },
                        781: function(e) {
                            "use strict";
                            e.exports = r(78326).EventEmitter
                        },
                        837: function(e) {
                            "use strict";
                            e.exports = r(19341)
                        }
                    },
                    i = {};

                function o(e) {
                    var r = i[e];
                    if (void 0 !== r) return r.exports;
                    var n = i[e] = {
                            exports: {}
                        },
                        s = !0;
                    try {
                        t[e](n, n.exports, o), s = !1
                    } finally {
                        s && delete i[e]
                    }
                    return n.exports
                }
                o.ab = "//";
                var s = o(173);
                e.exports = s
            }()
        },
        28611: function(e) {
            var t, r, n, i = e.exports = {};

            function o() {
                throw Error("setTimeout has not been defined")
            }

            function s() {
                throw Error("clearTimeout has not been defined")
            }

            function a(e) {
                if (t === setTimeout) return setTimeout(e, 0);
                if ((t === o || !t) && setTimeout) return t = setTimeout, setTimeout(e, 0);
                try {
                    return t(e, 0)
                } catch (r) {
                    try {
                        return t.call(null, e, 0)
                    } catch (r) {
                        return t.call(this, e, 0)
                    }
                }
            }! function() {
                try {
                    t = "function" == typeof setTimeout ? setTimeout : o
                } catch (e) {
                    t = o
                }
                try {
                    r = "function" == typeof clearTimeout ? clearTimeout : s
                } catch (e) {
                    r = s
                }
            }();
            var u = [],
                l = !1,
                f = -1;

            function c() {
                l && n && (l = !1, n.length ? u = n.concat(u) : f = -1, u.length && h())
            }

            function h() {
                if (!l) {
                    var e = a(c);
                    l = !0;
                    for (var t = u.length; t;) {
                        for (n = u, u = []; ++f < t;) n && n[f].run();
                        f = -1, t = u.length
                    }
                    n = null, l = !1,
                        function(e) {
                            if (r === clearTimeout) return clearTimeout(e);
                            if ((r === s || !r) && clearTimeout) return r = clearTimeout, clearTimeout(e);
                            try {
                                r(e)
                            } catch (t) {
                                try {
                                    return r.call(null, e)
                                } catch (t) {
                                    return r.call(this, e)
                                }
                            }
                        }(e)
                }
            }

            function p(e, t) {
                this.fun = e, this.array = t
            }

            function d() {}
            i.nextTick = function(e) {
                var t = Array(arguments.length - 1);
                if (arguments.length > 1)
                    for (var r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
                u.push(new p(e, t)), 1 !== u.length || l || a(h)
            }, p.prototype.run = function() {
                this.fun.apply(null, this.array)
            }, i.title = "browser", i.browser = !0, i.env = {}, i.argv = [], i.version = "", i.versions = {}, i.on = d, i.addListener = d, i.once = d, i.off = d, i.removeListener = d, i.removeAllListeners = d, i.emit = d, i.prependListener = d, i.prependOnceListener = d, i.listeners = function(e) {
                return []
            }, i.binding = function(e) {
                throw Error("process.binding is not supported")
            }, i.cwd = function() {
                return "/"
            }, i.chdir = function(e) {
                throw Error("process.chdir is not supported")
            }, i.umask = function() {
                return 0
            }
        },
        34143: function(e) {
            "use strict";
            var t = {};

            function r(e, r, n) {
                n || (n = Error);
                var i = function(e) {
                    function t(t, n, i) {
                        return e.call(this, "string" == typeof r ? r : r(t, n, i)) || this
                    }
                    return t.prototype = Object.create(e.prototype), t.prototype.constructor = t, t.__proto__ = e, t
                }(n);
                i.prototype.name = n.name, i.prototype.code = e, t[e] = i
            }

            function n(e, t) {
                if (!Array.isArray(e)) return "of ".concat(t, " ").concat(String(e));
                var r = e.length;
                return (e = e.map(function(e) {
                    return String(e)
                }), r > 2) ? "one of ".concat(t, " ").concat(e.slice(0, r - 1).join(", "), ", or ") + e[r - 1] : 2 === r ? "one of ".concat(t, " ").concat(e[0], " or ").concat(e[1]) : "of ".concat(t, " ").concat(e[0])
            }
            r("ERR_INVALID_OPT_VALUE", function(e, t) {
                return 'The value "' + t + '" is invalid for option "' + e + '"'
            }, TypeError), r("ERR_INVALID_ARG_TYPE", function(e, t, r) {
                if ("string" == typeof t && (i = "not ", t.substr(!o || o < 0 ? 0 : +o, i.length) === i) ? (l = "must not be", t = t.replace(/^not /, "")) : l = "must be", s = " argument", (void 0 === a || a > e.length) && (a = e.length), e.substring(a - s.length, a) === s) f = "The ".concat(e, " ").concat(l, " ").concat(n(t, "type"));
                else {
                    var i, o, s, a, u, l, f, c = ("number" != typeof u && (u = 0), u + 1 > e.length || -1 === e.indexOf(".", u)) ? "argument" : "property";
                    f = 'The "'.concat(e, '" ').concat(c, " ").concat(l, " ").concat(n(t, "type"))
                }
                return f + ". Received type ".concat(typeof r)
            }, TypeError), r("ERR_STREAM_PUSH_AFTER_EOF", "stream.push() after EOF"), r("ERR_METHOD_NOT_IMPLEMENTED", function(e) {
                return "The " + e + " method is not implemented"
            }), r("ERR_STREAM_PREMATURE_CLOSE", "Premature close"), r("ERR_STREAM_DESTROYED", function(e) {
                return "Cannot call " + e + " after a stream was destroyed"
            }), r("ERR_MULTIPLE_CALLBACK", "Callback called multiple times"), r("ERR_STREAM_CANNOT_PIPE", "Cannot pipe, not readable"), r("ERR_STREAM_WRITE_AFTER_END", "write after end"), r("ERR_STREAM_NULL_VALUES", "May not write null values to stream", TypeError), r("ERR_UNKNOWN_ENCODING", function(e) {
                return "Unknown encoding: " + e
            }, TypeError), r("ERR_STREAM_UNSHIFT_AFTER_END_EVENT", "stream.unshift() after end event"), e.exports.q = t
        },
        45983: function(e, t, r) {
            "use strict";
            var n = r(28611),
                i = Object.keys || function(e) {
                    var t = [];
                    for (var r in e) t.push(r);
                    return t
                };
            e.exports = f;
            var o = r(13928),
                s = r(14307);
            r(29573)(f, o);
            for (var a = i(s.prototype), u = 0; u < a.length; u++) {
                var l = a[u];
                f.prototype[l] || (f.prototype[l] = s.prototype[l])
            }

            function f(e) {
                if (!(this instanceof f)) return new f(e);
                o.call(this, e), s.call(this, e), this.allowHalfOpen = !0, e && (!1 === e.readable && (this.readable = !1), !1 === e.writable && (this.writable = !1), !1 === e.allowHalfOpen && (this.allowHalfOpen = !1, this.once("end", c)))
            }

            function c() {
                this._writableState.ended || n.nextTick(h, this)
            }

            function h(e) {
                e.end()
            }
            Object.defineProperty(f.prototype, "writableHighWaterMark", {
                enumerable: !1,
                get: function() {
                    return this._writableState.highWaterMark
                }
            }), Object.defineProperty(f.prototype, "writableBuffer", {
                enumerable: !1,
                get: function() {
                    return this._writableState && this._writableState.getBuffer()
                }
            }), Object.defineProperty(f.prototype, "writableLength", {
                enumerable: !1,
                get: function() {
                    return this._writableState.length
                }
            }), Object.defineProperty(f.prototype, "destroyed", {
                enumerable: !1,
                get: function() {
                    return void 0 !== this._readableState && void 0 !== this._writableState && this._readableState.destroyed && this._writableState.destroyed
                },
                set: function(e) {
                    void 0 !== this._readableState && void 0 !== this._writableState && (this._readableState.destroyed = e, this._writableState.destroyed = e)
                }
            })
        },
        85814: function(e, t, r) {
            "use strict";
            e.exports = i;
            var n = r(6179);

            function i(e) {
                if (!(this instanceof i)) return new i(e);
                n.call(this, e)
            }
            r(29573)(i, n), i.prototype._transform = function(e, t, r) {
                r(null, e)
            }
        },
        13928: function(e, t, r) {
            "use strict";
            var n, i, o, s, a, u = r(28611);
            e.exports = A, A.ReadableState = T, r(78326).EventEmitter;
            var l = function(e, t) {
                    return e.listeners(t).length
                },
                f = r(88307),
                c = r(91083).Buffer,
                h = (void 0 !== r.g ? r.g : "undefined" != typeof window ? window : "undefined" != typeof self ? self : {}).Uint8Array || function() {},
                p = r(94616);
            i = p && p.debuglog ? p.debuglog("stream") : function() {};
            var d = r(61402),
                y = r(4859),
                g = r(12258).getHighWaterMark,
                b = r(34143).q,
                m = b.ERR_INVALID_ARG_TYPE,
                w = b.ERR_STREAM_PUSH_AFTER_EOF,
                E = b.ERR_METHOD_NOT_IMPLEMENTED,
                S = b.ERR_STREAM_UNSHIFT_AFTER_END_EVENT;
            r(29573)(A, f);
            var v = y.errorOrDestroy,
                _ = ["error", "close", "destroy", "pause", "resume"];

            function T(e, t, i) {
                n = n || r(45983), e = e || {}, "boolean" != typeof i && (i = t instanceof n), this.objectMode = !!e.objectMode, i && (this.objectMode = this.objectMode || !!e.readableObjectMode), this.highWaterMark = g(this, e, "readableHighWaterMark", i), this.buffer = new d, this.length = 0, this.pipes = null, this.pipesCount = 0, this.flowing = null, this.ended = !1, this.endEmitted = !1, this.reading = !1, this.sync = !0, this.needReadable = !1, this.emittedReadable = !1, this.readableListening = !1, this.resumeScheduled = !1, this.paused = !0, this.emitClose = !1 !== e.emitClose, this.autoDestroy = !!e.autoDestroy, this.destroyed = !1, this.defaultEncoding = e.defaultEncoding || "utf8", this.awaitDrain = 0, this.readingMore = !1, this.decoder = null, this.encoding = null, e.encoding && (o || (o = r(33099).StringDecoder), this.decoder = new o(e.encoding), this.encoding = e.encoding)
            }

            function A(e) {
                if (n = n || r(45983), !(this instanceof A)) return new A(e);
                var t = this instanceof n;
                this._readableState = new T(e, this, t), this.readable = !0, e && ("function" == typeof e.read && (this._read = e.read), "function" == typeof e.destroy && (this._destroy = e.destroy)), f.call(this)
            }

            function O(e, t, r, n, o) {
                i("readableAddChunk", t);
                var s, a, u, l, f, p = e._readableState;
                if (null === t) p.reading = !1,
                    function(e, t) {
                        if (i("onEofChunk"), !t.ended) {
                            if (t.decoder) {
                                var r = t.decoder.end();
                                r && r.length && (t.buffer.push(r), t.length += t.objectMode ? 1 : r.length)
                            }
                            t.ended = !0, t.sync ? k(e) : (t.needReadable = !1, t.emittedReadable || (t.emittedReadable = !0, x(e)))
                        }
                    }(e, p);
                else {
                    if (o || (s = p, a = t, c.isBuffer(a) || a instanceof h || "string" == typeof a || void 0 === a || s.objectMode || (u = new m("chunk", ["string", "Buffer", "Uint8Array"], a)), f = u), f) v(e, f);
                    else if (p.objectMode || t && t.length > 0) {
                        if ("string" == typeof t || p.objectMode || Object.getPrototypeOf(t) === c.prototype || (l = t, t = c.from(l)), n) p.endEmitted ? v(e, new S) : I(e, p, t, !0);
                        else if (p.ended) v(e, new w);
                        else {
                            if (p.destroyed) return !1;
                            p.reading = !1, p.decoder && !r ? (t = p.decoder.write(t), p.objectMode || 0 !== t.length ? I(e, p, t, !1) : R(e, p)) : I(e, p, t, !1)
                        }
                    } else n || (p.reading = !1, R(e, p))
                }
                return !p.ended && (p.length < p.highWaterMark || 0 === p.length)
            }

            function I(e, t, r, n) {
                t.flowing && 0 === t.length && !t.sync ? (t.awaitDrain = 0, e.emit("data", r)) : (t.length += t.objectMode ? 1 : r.length, n ? t.buffer.unshift(r) : t.buffer.push(r), t.needReadable && k(e)), R(e, t)
            }

            function P(e, t) {
                if (e <= 0 || 0 === t.length && t.ended) return 0;
                if (t.objectMode) return 1;
                if (e != e) return t.flowing && t.length ? t.buffer.head.data.length : t.length;
                if (e > t.highWaterMark) {
                    var r;
                    t.highWaterMark = ((r = e) >= 1073741824 ? r = 1073741824 : (r--, r |= r >>> 1, r |= r >>> 2, r |= r >>> 4, r |= r >>> 8, r |= r >>> 16, r++), r)
                }
                return e <= t.length ? e : t.ended ? t.length : (t.needReadable = !0, 0)
            }

            function k(e) {
                var t = e._readableState;
                i("emitReadable", t.needReadable, t.emittedReadable), t.needReadable = !1, t.emittedReadable || (i("emitReadable", t.flowing), t.emittedReadable = !0, u.nextTick(x, e))
            }

            function x(e) {
                var t = e._readableState;
                i("emitReadable_", t.destroyed, t.length, t.ended), !t.destroyed && (t.length || t.ended) && (e.emit("readable"), t.emittedReadable = !1), t.needReadable = !t.flowing && !t.ended && t.length <= t.highWaterMark, L(e)
            }

            function R(e, t) {
                t.readingMore || (t.readingMore = !0, u.nextTick(B, e, t))
            }

            function B(e, t) {
                for (; !t.reading && !t.ended && (t.length < t.highWaterMark || t.flowing && 0 === t.length);) {
                    var r = t.length;
                    if (i("maybeReadMore read 0"), e.read(0), r === t.length) break
                }
                t.readingMore = !1
            }

            function N(e) {
                var t = e._readableState;
                t.readableListening = e.listenerCount("readable") > 0, t.resumeScheduled && !t.paused ? t.flowing = !0 : e.listenerCount("data") > 0 && e.resume()
            }

            function U(e) {
                i("readable nexttick read 0"), e.read(0)
            }

            function C(e, t) {
                i("resume", t.reading), t.reading || e.read(0), t.resumeScheduled = !1, e.emit("resume"), L(e), t.flowing && !t.reading && e.read(0)
            }

            function L(e) {
                var t = e._readableState;
                for (i("flow", t.flowing); t.flowing && null !== e.read(););
            }

            function H(e, t) {
                var r;
                return 0 === t.length ? null : (t.objectMode ? r = t.buffer.shift() : !e || e >= t.length ? (r = t.decoder ? t.buffer.join("") : 1 === t.buffer.length ? t.buffer.first() : t.buffer.concat(t.length), t.buffer.clear()) : r = t.buffer.consume(e, t.decoder), r)
            }

            function j(e) {
                var t = e._readableState;
                i("endReadable", t.endEmitted), t.endEmitted || (t.ended = !0, u.nextTick(D, t, e))
            }

            function D(e, t) {
                if (i("endReadableNT", e.endEmitted, e.length), !e.endEmitted && 0 === e.length && (e.endEmitted = !0, t.readable = !1, t.emit("end"), e.autoDestroy)) {
                    var r = t._writableState;
                    (!r || r.autoDestroy && r.finished) && t.destroy()
                }
            }

            function M(e, t) {
                for (var r = 0, n = e.length; r < n; r++)
                    if (e[r] === t) return r;
                return -1
            }
            Object.defineProperty(A.prototype, "destroyed", {
                enumerable: !1,
                get: function() {
                    return void 0 !== this._readableState && this._readableState.destroyed
                },
                set: function(e) {
                    this._readableState && (this._readableState.destroyed = e)
                }
            }), A.prototype.destroy = y.destroy, A.prototype._undestroy = y.undestroy, A.prototype._destroy = function(e, t) {
                t(e)
            }, A.prototype.push = function(e, t) {
                var r, n = this._readableState;
                return n.objectMode ? r = !0 : "string" == typeof e && ((t = t || n.defaultEncoding) !== n.encoding && (e = c.from(e, t), t = ""), r = !0), O(this, e, t, !1, r)
            }, A.prototype.unshift = function(e) {
                return O(this, e, null, !0, !1)
            }, A.prototype.isPaused = function() {
                return !1 === this._readableState.flowing
            }, A.prototype.setEncoding = function(e) {
                o || (o = r(33099).StringDecoder);
                var t = new o(e);
                this._readableState.decoder = t, this._readableState.encoding = this._readableState.decoder.encoding;
                for (var n = this._readableState.buffer.head, i = ""; null !== n;) i += t.write(n.data), n = n.next;
                return this._readableState.buffer.clear(), "" !== i && this._readableState.buffer.push(i), this._readableState.length = i.length, this
            }, A.prototype.read = function(e) {
                i("read", e), e = parseInt(e, 10);
                var t, r = this._readableState,
                    n = e;
                if (0 !== e && (r.emittedReadable = !1), 0 === e && r.needReadable && ((0 !== r.highWaterMark ? r.length >= r.highWaterMark : r.length > 0) || r.ended)) return i("read: emitReadable", r.length, r.ended), 0 === r.length && r.ended ? j(this) : k(this), null;
                if (0 === (e = P(e, r)) && r.ended) return 0 === r.length && j(this), null;
                var o = r.needReadable;
                return i("need readable", o), (0 === r.length || r.length - e < r.highWaterMark) && i("length less than watermark", o = !0), r.ended || r.reading ? i("reading or ended", o = !1) : o && (i("do read"), r.reading = !0, r.sync = !0, 0 === r.length && (r.needReadable = !0), this._read(r.highWaterMark), r.sync = !1, r.reading || (e = P(n, r))), null === (t = e > 0 ? H(e, r) : null) ? (r.needReadable = r.length <= r.highWaterMark, e = 0) : (r.length -= e, r.awaitDrain = 0), 0 === r.length && (r.ended || (r.needReadable = !0), n !== e && r.ended && j(this)), null !== t && this.emit("data", t), t
            }, A.prototype._read = function(e) {
                v(this, new E("_read()"))
            }, A.prototype.pipe = function(e, t) {
                var r = this,
                    n = this._readableState;
                switch (n.pipesCount) {
                    case 0:
                        n.pipes = e;
                        break;
                    case 1:
                        n.pipes = [n.pipes, e];
                        break;
                    default:
                        n.pipes.push(e)
                }
                n.pipesCount += 1, i("pipe count=%d opts=%j", n.pipesCount, t);
                var o = t && !1 === t.end || e === u.stdout || e === u.stderr ? y : s;

                function s() {
                    i("onend"), e.end()
                }
                n.endEmitted ? u.nextTick(o) : r.once("end", o), e.on("unpipe", function t(o, u) {
                    i("onunpipe"), o === r && u && !1 === u.hasUnpiped && (u.hasUnpiped = !0, i("cleanup"), e.removeListener("close", p), e.removeListener("finish", d), e.removeListener("drain", a), e.removeListener("error", h), e.removeListener("unpipe", t), r.removeListener("end", s), r.removeListener("end", y), r.removeListener("data", c), f = !0, n.awaitDrain && (!e._writableState || e._writableState.needDrain) && a())
                });
                var a = function() {
                    var e = r._readableState;
                    i("pipeOnDrain", e.awaitDrain), e.awaitDrain && e.awaitDrain--, 0 === e.awaitDrain && l(r, "data") && (e.flowing = !0, L(r))
                };
                e.on("drain", a);
                var f = !1;

                function c(t) {
                    i("ondata");
                    var o = e.write(t);
                    i("dest.write", o), !1 === o && ((1 === n.pipesCount && n.pipes === e || n.pipesCount > 1 && -1 !== M(n.pipes, e)) && !f && (i("false write response, pause", n.awaitDrain), n.awaitDrain++), r.pause())
                }

                function h(t) {
                    i("onerror", t), y(), e.removeListener("error", h), 0 === l(e, "error") && v(e, t)
                }

                function p() {
                    e.removeListener("finish", d), y()
                }

                function d() {
                    i("onfinish"), e.removeListener("close", p), y()
                }

                function y() {
                    i("unpipe"), r.unpipe(e)
                }
                return r.on("data", c),
                    function(e, t, r) {
                        if ("function" == typeof e.prependListener) return e.prependListener(t, r);
                        e._events && e._events[t] ? Array.isArray(e._events[t]) ? e._events[t].unshift(r) : e._events[t] = [r, e._events[t]] : e.on(t, r)
                    }(e, "error", h), e.once("close", p), e.once("finish", d), e.emit("pipe", r), n.flowing || (i("pipe resume"), r.resume()), e
            }, A.prototype.unpipe = function(e) {
                var t = this._readableState,
                    r = {
                        hasUnpiped: !1
                    };
                if (0 === t.pipesCount) return this;
                if (1 === t.pipesCount) return e && e !== t.pipes || (e || (e = t.pipes), t.pipes = null, t.pipesCount = 0, t.flowing = !1, e && e.emit("unpipe", this, r)), this;
                if (!e) {
                    var n = t.pipes,
                        i = t.pipesCount;
                    t.pipes = null, t.pipesCount = 0, t.flowing = !1;
                    for (var o = 0; o < i; o++) n[o].emit("unpipe", this, {
                        hasUnpiped: !1
                    });
                    return this
                }
                var s = M(t.pipes, e);
                return -1 === s || (t.pipes.splice(s, 1), t.pipesCount -= 1, 1 === t.pipesCount && (t.pipes = t.pipes[0]), e.emit("unpipe", this, r)), this
            }, A.prototype.on = function(e, t) {
                var r = f.prototype.on.call(this, e, t),
                    n = this._readableState;
                return "data" === e ? (n.readableListening = this.listenerCount("readable") > 0, !1 !== n.flowing && this.resume()) : "readable" !== e || n.endEmitted || n.readableListening || (n.readableListening = n.needReadable = !0, n.flowing = !1, n.emittedReadable = !1, i("on readable", n.length, n.reading), n.length ? k(this) : n.reading || u.nextTick(U, this)), r
            }, A.prototype.addListener = A.prototype.on, A.prototype.removeListener = function(e, t) {
                var r = f.prototype.removeListener.call(this, e, t);
                return "readable" === e && u.nextTick(N, this), r
            }, A.prototype.removeAllListeners = function(e) {
                var t = f.prototype.removeAllListeners.apply(this, arguments);
                return ("readable" === e || void 0 === e) && u.nextTick(N, this), t
            }, A.prototype.resume = function() {
                var e = this._readableState;
                return e.flowing || (i("resume"), e.flowing = !e.readableListening, e.resumeScheduled || (e.resumeScheduled = !0, u.nextTick(C, this, e))), e.paused = !1, this
            }, A.prototype.pause = function() {
                return i("call pause flowing=%j", this._readableState.flowing), !1 !== this._readableState.flowing && (i("pause"), this._readableState.flowing = !1, this.emit("pause")), this._readableState.paused = !0, this
            }, A.prototype.wrap = function(e) {
                var t = this,
                    r = this._readableState,
                    n = !1;
                for (var o in e.on("end", function() {
                        if (i("wrapped end"), r.decoder && !r.ended) {
                            var e = r.decoder.end();
                            e && e.length && t.push(e)
                        }
                        t.push(null)
                    }), e.on("data", function(o) {
                        i("wrapped data"), r.decoder && (o = r.decoder.write(o)), (!r.objectMode || null != o) && (r.objectMode || o && o.length) && (t.push(o) || (n = !0, e.pause()))
                    }), e) void 0 === this[o] && "function" == typeof e[o] && (this[o] = function(t) {
                    return function() {
                        return e[t].apply(e, arguments)
                    }
                }(o));
                for (var s = 0; s < _.length; s++) e.on(_[s], this.emit.bind(this, _[s]));
                return this._read = function(t) {
                    i("wrapped _read", t), n && (n = !1, e.resume())
                }, this
            }, "function" == typeof Symbol && (A.prototype[Symbol.asyncIterator] = function() {
                return void 0 === s && (s = r(33535)), s(this)
            }), Object.defineProperty(A.prototype, "readableHighWaterMark", {
                enumerable: !1,
                get: function() {
                    return this._readableState.highWaterMark
                }
            }), Object.defineProperty(A.prototype, "readableBuffer", {
                enumerable: !1,
                get: function() {
                    return this._readableState && this._readableState.buffer
                }
            }), Object.defineProperty(A.prototype, "readableFlowing", {
                enumerable: !1,
                get: function() {
                    return this._readableState.flowing
                },
                set: function(e) {
                    this._readableState && (this._readableState.flowing = e)
                }
            }), A._fromList = H, Object.defineProperty(A.prototype, "readableLength", {
                enumerable: !1,
                get: function() {
                    return this._readableState.length
                }
            }), "function" == typeof Symbol && (A.from = function(e, t) {
                return void 0 === a && (a = r(90976)), a(A, e, t)
            })
        },
        6179: function(e, t, r) {
            "use strict";
            e.exports = f;
            var n = r(34143).q,
                i = n.ERR_METHOD_NOT_IMPLEMENTED,
                o = n.ERR_MULTIPLE_CALLBACK,
                s = n.ERR_TRANSFORM_ALREADY_TRANSFORMING,
                a = n.ERR_TRANSFORM_WITH_LENGTH_0,
                u = r(45983);

            function l(e, t) {
                var r = this._transformState;
                r.transforming = !1;
                var n = r.writecb;
                if (null === n) return this.emit("error", new o);
                r.writechunk = null, r.writecb = null, null != t && this.push(t), n(e);
                var i = this._readableState;
                i.reading = !1, (i.needReadable || i.length < i.highWaterMark) && this._read(i.highWaterMark)
            }

            function f(e) {
                if (!(this instanceof f)) return new f(e);
                u.call(this, e), this._transformState = {
                    afterTransform: l.bind(this),
                    needTransform: !1,
                    transforming: !1,
                    writecb: null,
                    writechunk: null,
                    writeencoding: null
                }, this._readableState.needReadable = !0, this._readableState.sync = !1, e && ("function" == typeof e.transform && (this._transform = e.transform), "function" == typeof e.flush && (this._flush = e.flush)), this.on("prefinish", c)
            }

            function c() {
                var e = this;
                "function" != typeof this._flush || this._readableState.destroyed ? h(this, null, null) : this._flush(function(t, r) {
                    h(e, t, r)
                })
            }

            function h(e, t, r) {
                if (t) return e.emit("error", t);
                if (null != r && e.push(r), e._writableState.length) throw new a;
                if (e._transformState.transforming) throw new s;
                return e.push(null)
            }
            r(29573)(f, u), f.prototype.push = function(e, t) {
                return this._transformState.needTransform = !1, u.prototype.push.call(this, e, t)
            }, f.prototype._transform = function(e, t, r) {
                r(new i("_transform()"))
            }, f.prototype._write = function(e, t, r) {
                var n = this._transformState;
                if (n.writecb = r, n.writechunk = e, n.writeencoding = t, !n.transforming) {
                    var i = this._readableState;
                    (n.needTransform || i.needReadable || i.length < i.highWaterMark) && this._read(i.highWaterMark)
                }
            }, f.prototype._read = function(e) {
                var t = this._transformState;
                null === t.writechunk || t.transforming ? t.needTransform = !0 : (t.transforming = !0, this._transform(t.writechunk, t.writeencoding, t.afterTransform))
            }, f.prototype._destroy = function(e, t) {
                u.prototype._destroy.call(this, e, function(e) {
                    t(e)
                })
            }
        },
        14307: function(e, t, r) {
            "use strict";
            var n, i, o = r(28611);

            function s(e) {
                var t = this;
                this.next = null, this.entry = null, this.finish = function() {
                    (function(e, t, r) {
                        var n = e.entry;
                        for (e.entry = null; n;) {
                            var i = n.callback;
                            t.pendingcb--, i(void 0), n = n.next
                        }
                        t.corkedRequestsFree.next = e
                    })(t, e)
                }
            }
            e.exports = A, A.WritableState = T;
            var a = {
                    deprecate: r(41202)
                },
                u = r(88307),
                l = r(91083).Buffer,
                f = (void 0 !== r.g ? r.g : "undefined" != typeof window ? window : "undefined" != typeof self ? self : {}).Uint8Array || function() {},
                c = r(4859),
                h = r(12258).getHighWaterMark,
                p = r(34143).q,
                d = p.ERR_INVALID_ARG_TYPE,
                y = p.ERR_METHOD_NOT_IMPLEMENTED,
                g = p.ERR_MULTIPLE_CALLBACK,
                b = p.ERR_STREAM_CANNOT_PIPE,
                m = p.ERR_STREAM_DESTROYED,
                w = p.ERR_STREAM_NULL_VALUES,
                E = p.ERR_STREAM_WRITE_AFTER_END,
                S = p.ERR_UNKNOWN_ENCODING,
                v = c.errorOrDestroy;

            function _() {}

            function T(e, t, i) {
                n = n || r(45983), e = e || {}, "boolean" != typeof i && (i = t instanceof n), this.objectMode = !!e.objectMode, i && (this.objectMode = this.objectMode || !!e.writableObjectMode), this.highWaterMark = h(this, e, "writableHighWaterMark", i), this.finalCalled = !1, this.needDrain = !1, this.ending = !1, this.ended = !1, this.finished = !1, this.destroyed = !1;
                var a = !1 === e.decodeStrings;
                this.decodeStrings = !a, this.defaultEncoding = e.defaultEncoding || "utf8", this.length = 0, this.writing = !1, this.corked = 0, this.sync = !0, this.bufferProcessing = !1, this.onwrite = function(e) {
                    (function(e, t) {
                        var r = e._writableState,
                            n = r.sync,
                            i = r.writecb;
                        if ("function" != typeof i) throw new g;
                        if (r.writing = !1, r.writecb = null, r.length -= r.writelen, r.writelen = 0, t) --r.pendingcb, n ? (o.nextTick(i, t), o.nextTick(R, e, r), e._writableState.errorEmitted = !0, v(e, t)) : (i(t), e._writableState.errorEmitted = !0, v(e, t), R(e, r));
                        else {
                            var s = k(r) || e.destroyed;
                            s || r.corked || r.bufferProcessing || !r.bufferedRequest || P(e, r), n ? o.nextTick(I, e, r, s, i) : I(e, r, s, i)
                        }
                    })(t, e)
                }, this.writecb = null, this.writelen = 0, this.bufferedRequest = null, this.lastBufferedRequest = null, this.pendingcb = 0, this.prefinished = !1, this.errorEmitted = !1, this.emitClose = !1 !== e.emitClose, this.autoDestroy = !!e.autoDestroy, this.bufferedRequestCount = 0, this.corkedRequestsFree = new s(this)
            }

            function A(e) {
                var t = this instanceof(n = n || r(45983));
                if (!t && !i.call(A, this)) return new A(e);
                this._writableState = new T(e, this, t), this.writable = !0, e && ("function" == typeof e.write && (this._write = e.write), "function" == typeof e.writev && (this._writev = e.writev), "function" == typeof e.destroy && (this._destroy = e.destroy), "function" == typeof e.final && (this._final = e.final)), u.call(this)
            }

            function O(e, t, r, n, i, o, s) {
                t.writelen = n, t.writecb = s, t.writing = !0, t.sync = !0, t.destroyed ? t.onwrite(new m("write")) : r ? e._writev(i, t.onwrite) : e._write(i, o, t.onwrite), t.sync = !1
            }

            function I(e, t, r, n) {
                r || 0 === t.length && t.needDrain && (t.needDrain = !1, e.emit("drain")), t.pendingcb--, n(), R(e, t)
            }

            function P(e, t) {
                t.bufferProcessing = !0;
                var r = t.bufferedRequest;
                if (e._writev && r && r.next) {
                    var n = Array(t.bufferedRequestCount),
                        i = t.corkedRequestsFree;
                    i.entry = r;
                    for (var o = 0, a = !0; r;) n[o] = r, r.isBuf || (a = !1), r = r.next, o += 1;
                    n.allBuffers = a, O(e, t, !0, t.length, n, "", i.finish), t.pendingcb++, t.lastBufferedRequest = null, i.next ? (t.corkedRequestsFree = i.next, i.next = null) : t.corkedRequestsFree = new s(t), t.bufferedRequestCount = 0
                } else {
                    for (; r;) {
                        var u = r.chunk,
                            l = r.encoding,
                            f = r.callback,
                            c = t.objectMode ? 1 : u.length;
                        if (O(e, t, !1, c, u, l, f), r = r.next, t.bufferedRequestCount--, t.writing) break
                    }
                    null === r && (t.lastBufferedRequest = null)
                }
                t.bufferedRequest = r, t.bufferProcessing = !1
            }

            function k(e) {
                return e.ending && 0 === e.length && null === e.bufferedRequest && !e.finished && !e.writing
            }

            function x(e, t) {
                e._final(function(r) {
                    t.pendingcb--, r && v(e, r), t.prefinished = !0, e.emit("prefinish"), R(e, t)
                })
            }

            function R(e, t) {
                var r = k(t);
                if (r && (t.prefinished || t.finalCalled || ("function" != typeof e._final || t.destroyed ? (t.prefinished = !0, e.emit("prefinish")) : (t.pendingcb++, t.finalCalled = !0, o.nextTick(x, e, t))), 0 === t.pendingcb && (t.finished = !0, e.emit("finish"), t.autoDestroy))) {
                    var n = e._readableState;
                    (!n || n.autoDestroy && n.endEmitted) && e.destroy()
                }
                return r
            }
            r(29573)(A, u), T.prototype.getBuffer = function() {
                    for (var e = this.bufferedRequest, t = []; e;) t.push(e), e = e.next;
                    return t
                },
                function() {
                    try {
                        Object.defineProperty(T.prototype, "buffer", {
                            get: a.deprecate(function() {
                                return this.getBuffer()
                            }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003")
                        })
                    } catch (e) {}
                }(), "function" == typeof Symbol && Symbol.hasInstance && "function" == typeof Function.prototype[Symbol.hasInstance] ? (i = Function.prototype[Symbol.hasInstance], Object.defineProperty(A, Symbol.hasInstance, {
                    value: function(e) {
                        return !!i.call(this, e) || this === A && e && e._writableState instanceof T
                    }
                })) : i = function(e) {
                    return e instanceof this
                }, A.prototype.pipe = function() {
                    v(this, new b)
                }, A.prototype.write = function(e, t, r) {
                    var n, i, s, a, u, c, h, p = this._writableState,
                        y = !1,
                        g = !p.objectMode && (n = e, l.isBuffer(n) || n instanceof f);
                    return g && !l.isBuffer(e) && (i = e, e = l.from(i)), ("function" == typeof t && (r = t, t = null), g ? t = "buffer" : t || (t = p.defaultEncoding), "function" != typeof r && (r = _), p.ending) ? (s = r, v(this, a = new E), o.nextTick(s, a)) : (g || (u = e, c = r, null === u ? h = new w : "string" == typeof u || p.objectMode || (h = new d("chunk", ["string", "Buffer"], u)), !h || (v(this, h), o.nextTick(c, h), 0))) && (p.pendingcb++, y = function(e, t, r, n, i, o) {
                        if (!r) {
                            var s, a, u = (s = n, a = i, t.objectMode || !1 === t.decodeStrings || "string" != typeof s || (s = l.from(s, a)), s);
                            n !== u && (r = !0, i = "buffer", n = u)
                        }
                        var f = t.objectMode ? 1 : n.length;
                        t.length += f;
                        var c = t.length < t.highWaterMark;
                        if (c || (t.needDrain = !0), t.writing || t.corked) {
                            var h = t.lastBufferedRequest;
                            t.lastBufferedRequest = {
                                chunk: n,
                                encoding: i,
                                isBuf: r,
                                callback: o,
                                next: null
                            }, h ? h.next = t.lastBufferedRequest : t.bufferedRequest = t.lastBufferedRequest, t.bufferedRequestCount += 1
                        } else O(e, t, !1, f, n, i, o);
                        return c
                    }(this, p, g, e, t, r)), y
                }, A.prototype.cork = function() {
                    this._writableState.corked++
                }, A.prototype.uncork = function() {
                    var e = this._writableState;
                    !e.corked || (e.corked--, e.writing || e.corked || e.bufferProcessing || !e.bufferedRequest || P(this, e))
                }, A.prototype.setDefaultEncoding = function(e) {
                    if ("string" == typeof e && (e = e.toLowerCase()), !(["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((e + "").toLowerCase()) > -1)) throw new S(e);
                    return this._writableState.defaultEncoding = e, this
                }, Object.defineProperty(A.prototype, "writableBuffer", {
                    enumerable: !1,
                    get: function() {
                        return this._writableState && this._writableState.getBuffer()
                    }
                }), Object.defineProperty(A.prototype, "writableHighWaterMark", {
                    enumerable: !1,
                    get: function() {
                        return this._writableState.highWaterMark
                    }
                }), A.prototype._write = function(e, t, r) {
                    r(new y("_write()"))
                }, A.prototype._writev = null, A.prototype.end = function(e, t, r) {
                    var n, i = this._writableState;
                    return "function" == typeof e ? (r = e, e = null, t = null) : "function" == typeof t && (r = t, t = null), null != e && this.write(e, t), i.corked && (i.corked = 1, this.uncork()), i.ending || (n = r, i.ending = !0, R(this, i), n && (i.finished ? o.nextTick(n) : this.once("finish", n)), i.ended = !0, this.writable = !1), this
                }, Object.defineProperty(A.prototype, "writableLength", {
                    enumerable: !1,
                    get: function() {
                        return this._writableState.length
                    }
                }), Object.defineProperty(A.prototype, "destroyed", {
                    enumerable: !1,
                    get: function() {
                        return void 0 !== this._writableState && this._writableState.destroyed
                    },
                    set: function(e) {
                        this._writableState && (this._writableState.destroyed = e)
                    }
                }), A.prototype.destroy = c.destroy, A.prototype._undestroy = c.undestroy, A.prototype._destroy = function(e, t) {
                    t(e)
                }
        },
        33535: function(e, t, r) {
            "use strict";
            var n, i = r(28611);

            function o(e, t, r) {
                var n;
                return (t = "symbol" == typeof(n = function(e, t) {
                    if ("object" != typeof e || null === e) return e;
                    var r = e[Symbol.toPrimitive];
                    if (void 0 !== r) {
                        var n = r.call(e, t || "default");
                        if ("object" != typeof n) return n;
                        throw TypeError("@@toPrimitive must return a primitive value.")
                    }
                    return ("string" === t ? String : Number)(e)
                }(t, "string")) ? n : String(n)) in e ? Object.defineProperty(e, t, {
                    value: r,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[t] = r, e
            }
            var s = r(5473),
                a = Symbol("lastResolve"),
                u = Symbol("lastReject"),
                l = Symbol("error"),
                f = Symbol("ended"),
                c = Symbol("lastPromise"),
                h = Symbol("handlePromise"),
                p = Symbol("stream");

            function d(e, t) {
                return {
                    value: e,
                    done: t
                }
            }

            function y(e) {
                var t = e[a];
                if (null !== t) {
                    var r = e[p].read();
                    null !== r && (e[c] = null, e[a] = null, e[u] = null, t(d(r, !1)))
                }
            }

            function g(e) {
                i.nextTick(y, e)
            }
            var b = Object.getPrototypeOf(function() {}),
                m = Object.setPrototypeOf((o(n = {
                    get stream() {
                        return this[p]
                    },
                    next: function() {
                        var e, t, r = this,
                            n = this[l];
                        if (null !== n) return Promise.reject(n);
                        if (this[f]) return Promise.resolve(d(void 0, !0));
                        if (this[p].destroyed) return new Promise(function(e, t) {
                            i.nextTick(function() {
                                r[l] ? t(r[l]) : e(d(void 0, !0))
                            })
                        });
                        var o = this[c];
                        if (o) t = new Promise((e = this, function(t, r) {
                            o.then(function() {
                                if (e[f]) {
                                    t(d(void 0, !0));
                                    return
                                }
                                e[h](t, r)
                            }, r)
                        }));
                        else {
                            var s = this[p].read();
                            if (null !== s) return Promise.resolve(d(s, !1));
                            t = new Promise(this[h])
                        }
                        return this[c] = t, t
                    }
                }, Symbol.asyncIterator, function() {
                    return this
                }), o(n, "return", function() {
                    var e = this;
                    return new Promise(function(t, r) {
                        e[p].destroy(null, function(e) {
                            if (e) {
                                r(e);
                                return
                            }
                            t(d(void 0, !0))
                        })
                    })
                }), n), b);
            e.exports = function(e) {
                var t, r = Object.create(m, (o(t = {}, p, {
                    value: e,
                    writable: !0
                }), o(t, a, {
                    value: null,
                    writable: !0
                }), o(t, u, {
                    value: null,
                    writable: !0
                }), o(t, l, {
                    value: null,
                    writable: !0
                }), o(t, f, {
                    value: e._readableState.endEmitted,
                    writable: !0
                }), o(t, h, {
                    value: function(e, t) {
                        var n = r[p].read();
                        n ? (r[c] = null, r[a] = null, r[u] = null, e(d(n, !1))) : (r[a] = e, r[u] = t)
                    },
                    writable: !0
                }), t));
                return r[c] = null, s(e, function(e) {
                    if (e && "ERR_STREAM_PREMATURE_CLOSE" !== e.code) {
                        var t = r[u];
                        null !== t && (r[c] = null, r[a] = null, r[u] = null, t(e)), r[l] = e;
                        return
                    }
                    var n = r[a];
                    null !== n && (r[c] = null, r[a] = null, r[u] = null, n(d(void 0, !0))), r[f] = !0
                }), e.on("readable", g.bind(null, r)), r
            }
        },
        61402: function(e, t, r) {
            "use strict";

            function n(e, t) {
                var r = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var n = Object.getOwnPropertySymbols(e);
                    t && (n = n.filter(function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    })), r.push.apply(r, n)
                }
                return r
            }

            function i(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var r = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? n(Object(r), !0).forEach(function(t) {
                        var n, i;
                        n = t, i = r[t], (n = s(n)) in e ? Object.defineProperty(e, n, {
                            value: i,
                            enumerable: !0,
                            configurable: !0,
                            writable: !0
                        }) : e[n] = i
                    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : n(Object(r)).forEach(function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
                    })
                }
                return e
            }

            function o(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var n = t[r];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, s(n.key), n)
                }
            }

            function s(e) {
                var t = function(e, t) {
                    if ("object" != typeof e || null === e) return e;
                    var r = e[Symbol.toPrimitive];
                    if (void 0 !== r) {
                        var n = r.call(e, t || "default");
                        if ("object" != typeof n) return n;
                        throw TypeError("@@toPrimitive must return a primitive value.")
                    }
                    return ("string" === t ? String : Number)(e)
                }(e, "string");
                return "symbol" == typeof t ? t : String(t)
            }
            var a = r(91083).Buffer,
                u = r(52361).inspect,
                l = u && u.custom || "inspect";
            e.exports = function() {
                var e, t;

                function r() {
                    ! function(e, t) {
                        if (!(e instanceof t)) throw TypeError("Cannot call a class as a function")
                    }(this, r), this.head = null, this.tail = null, this.length = 0
                }
                return e = [{
                    key: "push",
                    value: function(e) {
                        var t = {
                            data: e,
                            next: null
                        };
                        this.length > 0 ? this.tail.next = t : this.head = t, this.tail = t, ++this.length
                    }
                }, {
                    key: "unshift",
                    value: function(e) {
                        var t = {
                            data: e,
                            next: this.head
                        };
                        0 === this.length && (this.tail = t), this.head = t, ++this.length
                    }
                }, {
                    key: "shift",
                    value: function() {
                        if (0 !== this.length) {
                            var e = this.head.data;
                            return 1 === this.length ? this.head = this.tail = null : this.head = this.head.next, --this.length, e
                        }
                    }
                }, {
                    key: "clear",
                    value: function() {
                        this.head = this.tail = null, this.length = 0
                    }
                }, {
                    key: "join",
                    value: function(e) {
                        if (0 === this.length) return "";
                        for (var t = this.head, r = "" + t.data; t = t.next;) r += e + t.data;
                        return r
                    }
                }, {
                    key: "concat",
                    value: function(e) {
                        if (0 === this.length) return a.alloc(0);
                        for (var t, r, n = a.allocUnsafe(e >>> 0), i = this.head, o = 0; i;) t = i.data, r = o, a.prototype.copy.call(t, n, r), o += i.data.length, i = i.next;
                        return n
                    }
                }, {
                    key: "consume",
                    value: function(e, t) {
                        var r;
                        return e < this.head.data.length ? (r = this.head.data.slice(0, e), this.head.data = this.head.data.slice(e)) : r = e === this.head.data.length ? this.shift() : t ? this._getString(e) : this._getBuffer(e), r
                    }
                }, {
                    key: "first",
                    value: function() {
                        return this.head.data
                    }
                }, {
                    key: "_getString",
                    value: function(e) {
                        var t = this.head,
                            r = 1,
                            n = t.data;
                        for (e -= n.length; t = t.next;) {
                            var i = t.data,
                                o = e > i.length ? i.length : e;
                            if (o === i.length ? n += i : n += i.slice(0, e), 0 == (e -= o)) {
                                o === i.length ? (++r, t.next ? this.head = t.next : this.head = this.tail = null) : (this.head = t, t.data = i.slice(o));
                                break
                            }++r
                        }
                        return this.length -= r, n
                    }
                }, {
                    key: "_getBuffer",
                    value: function(e) {
                        var t = a.allocUnsafe(e),
                            r = this.head,
                            n = 1;
                        for (r.data.copy(t), e -= r.data.length; r = r.next;) {
                            var i = r.data,
                                o = e > i.length ? i.length : e;
                            if (i.copy(t, t.length - e, 0, o), 0 == (e -= o)) {
                                o === i.length ? (++n, r.next ? this.head = r.next : this.head = this.tail = null) : (this.head = r, r.data = i.slice(o));
                                break
                            }++n
                        }
                        return this.length -= n, t
                    }
                }, {
                    key: l,
                    value: function(e, t) {
                        return u(this, i(i({}, t), {}, {
                            depth: 0,
                            customInspect: !1
                        }))
                    }
                }], o(r.prototype, e), t && o(r, t), Object.defineProperty(r, "prototype", {
                    writable: !1
                }), r
            }()
        },
        4859: function(e, t, r) {
            "use strict";
            var n = r(28611);

            function i(e, t) {
                s(e, t), o(e)
            }

            function o(e) {
                (!e._writableState || e._writableState.emitClose) && (!e._readableState || e._readableState.emitClose) && e.emit("close")
            }

            function s(e, t) {
                e.emit("error", t)
            }
            e.exports = {
                destroy: function(e, t) {
                    var r = this,
                        a = this._readableState && this._readableState.destroyed,
                        u = this._writableState && this._writableState.destroyed;
                    return a || u ? (t ? t(e) : e && (this._writableState ? this._writableState.errorEmitted || (this._writableState.errorEmitted = !0, n.nextTick(s, this, e)) : n.nextTick(s, this, e)), this) : (this._readableState && (this._readableState.destroyed = !0), this._writableState && (this._writableState.destroyed = !0), this._destroy(e || null, function(e) {
                        !t && e ? r._writableState ? r._writableState.errorEmitted ? n.nextTick(o, r) : (r._writableState.errorEmitted = !0, n.nextTick(i, r, e)) : n.nextTick(i, r, e) : t ? (n.nextTick(o, r), t(e)) : n.nextTick(o, r)
                    }), this)
                },
                undestroy: function() {
                    this._readableState && (this._readableState.destroyed = !1, this._readableState.reading = !1, this._readableState.ended = !1, this._readableState.endEmitted = !1), this._writableState && (this._writableState.destroyed = !1, this._writableState.ended = !1, this._writableState.ending = !1, this._writableState.finalCalled = !1, this._writableState.prefinished = !1, this._writableState.finished = !1, this._writableState.errorEmitted = !1)
                },
                errorOrDestroy: function(e, t) {
                    var r = e._readableState,
                        n = e._writableState;
                    r && r.autoDestroy || n && n.autoDestroy ? e.destroy(t) : e.emit("error", t)
                }
            }
        },
        5473: function(e, t, r) {
            "use strict";
            var n = r(34143).q.ERR_STREAM_PREMATURE_CLOSE;

            function i() {}
            e.exports = function e(t, r, o) {
                if ("function" == typeof r) return e(t, null, r);
                r || (r = {}), s = o || i, a = !1, o = function() {
                    if (!a) {
                        a = !0;
                        for (var e = arguments.length, t = Array(e), r = 0; r < e; r++) t[r] = arguments[r];
                        s.apply(this, t)
                    }
                };
                var s, a, u = r.readable || !1 !== r.readable && t.readable,
                    l = r.writable || !1 !== r.writable && t.writable,
                    f = function() {
                        t.writable || h()
                    },
                    c = t._writableState && t._writableState.finished,
                    h = function() {
                        l = !1, c = !0, u || o.call(t)
                    },
                    p = t._readableState && t._readableState.endEmitted,
                    d = function() {
                        u = !1, p = !0, l || o.call(t)
                    },
                    y = function(e) {
                        o.call(t, e)
                    },
                    g = function() {
                        var e;
                        return u && !p ? (t._readableState && t._readableState.ended || (e = new n), o.call(t, e)) : l && !c ? (t._writableState && t._writableState.ended || (e = new n), o.call(t, e)) : void 0
                    },
                    b = function() {
                        t.req.on("finish", h)
                    };
                return t.setHeader && "function" == typeof t.abort ? (t.on("complete", h), t.on("abort", g), t.req ? b() : t.on("request", b)) : l && !t._writableState && (t.on("end", f), t.on("close", f)), t.on("end", d), t.on("finish", h), !1 !== r.error && t.on("error", y), t.on("close", g),
                    function() {
                        t.removeListener("complete", h), t.removeListener("abort", g), t.removeListener("request", b), t.req && t.req.removeListener("finish", h), t.removeListener("end", f), t.removeListener("close", f), t.removeListener("finish", h), t.removeListener("end", d), t.removeListener("error", y), t.removeListener("close", g)
                    }
            }
        },
        90976: function(e) {
            e.exports = function() {
                throw Error("Readable.from is not available in the browser")
            }
        },
        69406: function(e, t, r) {
            "use strict";
            var n, i = r(34143).q,
                o = i.ERR_MISSING_ARGS,
                s = i.ERR_STREAM_DESTROYED;

            function a(e) {
                if (e) throw e
            }

            function u(e) {
                e()
            }

            function l(e, t) {
                return e.pipe(t)
            }
            e.exports = function() {
                for (var e, t, i = arguments.length, f = Array(i), c = 0; c < i; c++) f[c] = arguments[c];
                var h = (e = f).length && "function" == typeof e[e.length - 1] ? e.pop() : a;
                if (Array.isArray(f[0]) && (f = f[0]), f.length < 2) throw new o("streams");
                var p = f.map(function(e, i) {
                    var o, a, l, c, d, y = i < f.length - 1;
                    return a = o = function(e) {
                            t || (t = e), e && p.forEach(u), y || (p.forEach(u), h(t))
                        }, l = !1, o = function() {
                            l || (l = !0, a.apply(void 0, arguments))
                        }, c = !1, e.on("close", function() {
                            c = !0
                        }), void 0 === n && (n = r(5473)), n(e, {
                            readable: y,
                            writable: i > 0
                        }, function(e) {
                            if (e) return o(e);
                            c = !0, o()
                        }), d = !1,
                        function(t) {
                            if (!c && !d) {
                                if (d = !0, e.setHeader && "function" == typeof e.abort) return e.abort();
                                if ("function" == typeof e.destroy) return e.destroy();
                                o(t || new s("pipe"))
                            }
                        }
                });
                return f.reduce(l)
            }
        },
        12258: function(e, t, r) {
            "use strict";
            var n = r(34143).q.ERR_INVALID_OPT_VALUE;
            e.exports = {
                getHighWaterMark: function(e, t, r, i) {
                    var o = null != t.highWaterMark ? t.highWaterMark : i ? t[r] : null;
                    if (null != o) {
                        if (!(isFinite(o) && Math.floor(o) === o) || o < 0) {
                            var s = i ? r : "highWaterMark";
                            throw new n(s, o)
                        }
                        return Math.floor(o)
                    }
                    return e.objectMode ? 16 : 16384
                }
            }
        },
        88307: function(e, t, r) {
            e.exports = r(78326).EventEmitter
        },
        29573: function(e) {
            "function" == typeof Object.create ? e.exports = function(e, t) {
                t && (e.super_ = t, e.prototype = Object.create(t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }))
            } : e.exports = function(e, t) {
                if (t) {
                    e.super_ = t;
                    var r = function() {};
                    r.prototype = t.prototype, e.prototype = new r, e.prototype.constructor = e
                }
            }
        },
        58319: function(e, t, r) {
            (t = e.exports = r(13928)).Stream = t, t.Readable = t, t.Writable = r(14307), t.Duplex = r(45983), t.Transform = r(6179), t.PassThrough = r(85814), t.finished = r(5473), t.pipeline = r(69406)
        },
        99670: function(e, t, r) {
            "use strict";
            var n = r(91083).Buffer,
                i = r(3501),
                o = r(1360),
                s = Array(16),
                a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13],
                u = [5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11],
                l = [11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6],
                f = [8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11];

            function c() {
                o.call(this, 64), this._a = 1732584193, this._b = 4023233417, this._c = 2562383102, this._d = 271733878, this._e = 3285377520
            }

            function h(e, t) {
                return e << t | e >>> 32 - t
            }
            i(c, o), c.prototype._update = function() {
                for (var e, t, r, n, i, o, c, p, d, y, g, b, m, w, E, S, v, _, T, A, O, I, P, k, x, R, B, N, U, C, L, H, j, D, M, F, W, V, K, $, q, G, z, X, Y, J, Z, Q, ee, et, er, en, ei, eo, es, ea, eu, el, ef, ec, eh, ep, ed, ey, eg, eb, em, ew, eE, eS, ev, e_, eT = 0; eT < 16; ++eT) s[eT] = this._block.readInt32LE(4 * eT);
                for (var eA = 0 | this._a, eO = 0 | this._b, eI = 0 | this._c, eP = 0 | this._d, ek = 0 | this._e, ex = 0 | this._a, eR = 0 | this._b, eB = 0 | this._c, eN = 0 | this._d, eU = 0 | this._e, eC = 0; eC < 80; eC += 1) eC < 16 ? (e = eA, t = eO, r = eI, n = eP, i = ek, ev = h(e + (t ^ r ^ n) + s[a[eC]] + 0 | 0, l[eC]) + i | 0, p = ex, d = eR, y = eB, g = eN, b = eU, e_ = h(p + (d ^ (y | ~g)) + s[u[eC]] + 1352829926 | 0, f[eC]) + b | 0) : eC < 32 ? (E = eA, S = eO, v = eI, _ = eP, T = ek, ev = h(E + (S & v | ~S & _) + s[a[eC]] + 1518500249 | 0, l[eC]) + T | 0, I = ex, P = eR, k = eB, x = eN, R = eU, e_ = h(I + (P & x | k & ~x) + s[u[eC]] + 1548603684 | 0, f[eC]) + R | 0) : eC < 48 ? (U = eA, C = eO, L = eI, H = eP, j = ek, ev = h(U + ((C | ~L) ^ H) + s[a[eC]] + 1859775393 | 0, l[eC]) + j | 0, F = ex, W = eR, V = eB, K = eN, $ = eU, e_ = h(F + ((W | ~V) ^ K) + s[u[eC]] + 1836072691 | 0, f[eC]) + $ | 0) : eC < 64 ? (z = eA, X = eO, Y = eI, J = eP, Z = ek, ev = h(z + (X & J | Y & ~J) + s[a[eC]] + 2400959708 | 0, l[eC]) + Z | 0, et = ex, er = eR, en = eB, ei = eN, eo = eU, e_ = h(et + (er & en | ~er & ei) + s[u[eC]] + 2053994217 | 0, f[eC]) + eo | 0) : (eu = eA, el = eO, ef = eI, ec = eP, eh = ek, ev = h(eu + (el ^ (ef | ~ec)) + s[a[eC]] + 2840853838 | 0, l[eC]) + eh | 0, ey = ex, eg = eR, eb = eB, em = eN, ew = eU, e_ = h(ey + (eg ^ eb ^ em) + s[u[eC]] + 0 | 0, f[eC]) + ew | 0), eA = ek, ek = eP, eP = h(eI, 10), eI = eO, eO = ev, ex = eU, eU = eN, eN = h(eB, 10), eB = eR, eR = e_;
                var eL = this._b + eI + eN | 0;
                this._b = this._c + eP + eU | 0, this._c = this._d + ek + ex | 0, this._d = this._e + eA + eR | 0, this._e = this._a + eO + eB | 0, this._a = eL
            }, c.prototype._digest = function() {
                this._block[this._blockOffset++] = 128, this._blockOffset > 56 && (this._block.fill(0, this._blockOffset, 64), this._update(), this._blockOffset = 0), this._block.fill(0, this._blockOffset, 56), this._block.writeUInt32LE(this._length[0], 56), this._block.writeUInt32LE(this._length[1], 60), this._update();
                var e = n.alloc ? n.alloc(20) : new n(20);
                return e.writeInt32LE(this._a, 0), e.writeInt32LE(this._b, 4), e.writeInt32LE(this._c, 8), e.writeInt32LE(this._d, 12), e.writeInt32LE(this._e, 16), e
            }, e.exports = c
        },
        2403: function(e, t, r) { /*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
            var n = r(91083),
                i = n.Buffer;

            function o(e, t) {
                for (var r in e) t[r] = e[r]
            }

            function s(e, t, r) {
                return i(e, t, r)
            }
            i.from && i.alloc && i.allocUnsafe && i.allocUnsafeSlow ? e.exports = n : (o(n, t), t.Buffer = s), s.prototype = Object.create(i.prototype), o(i, s), s.from = function(e, t, r) {
                if ("number" == typeof e) throw TypeError("Argument must not be a number");
                return i(e, t, r)
            }, s.alloc = function(e, t, r) {
                if ("number" != typeof e) throw TypeError("Argument must be a number");
                var n = i(e);
                return void 0 !== t ? "string" == typeof r ? n.fill(t, r) : n.fill(t) : n.fill(0), n
            }, s.allocUnsafe = function(e) {
                if ("number" != typeof e) throw TypeError("Argument must be a number");
                return i(e)
            }, s.allocUnsafeSlow = function(e) {
                if ("number" != typeof e) throw TypeError("Argument must be a number");
                return n.SlowBuffer(e)
            }
        },
        58471: function(e, t, r) {
            "use strict";
            var n = this && this.__createBinding || (Object.create ? function(e, t, r, n) {
                    void 0 === n && (n = r);
                    var i = Object.getOwnPropertyDescriptor(t, r);
                    (!i || ("get" in i ? !t.__esModule : i.writable || i.configurable)) && (i = {
                        enumerable: !0,
                        get: function() {
                            return t[r]
                        }
                    }), Object.defineProperty(e, n, i)
                } : function(e, t, r, n) {
                    void 0 === n && (n = r), e[n] = t[r]
                }),
                i = this && this.__exportStar || function(e, t) {
                    for (var r in e) "default" === r || Object.prototype.hasOwnProperty.call(t, r) || n(t, e, r)
                };
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), i(r(3723), t), i(r(52943), t), i(r(5558), t), i(r(18917), t)
        },
        3723: function(e, t, r) {
            "use strict";
            var n = this && this.__createBinding || (Object.create ? function(e, t, r, n) {
                    void 0 === n && (n = r);
                    var i = Object.getOwnPropertyDescriptor(t, r);
                    (!i || ("get" in i ? !t.__esModule : i.writable || i.configurable)) && (i = {
                        enumerable: !0,
                        get: function() {
                            return t[r]
                        }
                    }), Object.defineProperty(e, n, i)
                } : function(e, t, r, n) {
                    void 0 === n && (n = r), e[n] = t[r]
                }),
                i = this && this.__exportStar || function(e, t) {
                    for (var r in e) "default" === r || Object.prototype.hasOwnProperty.call(t, r) || n(t, e, r)
                };
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.getAddress = void 0;
            let o = r(66630),
                s = async e => {
                    let {
                        message: t,
                        network: r,
                        purposes: n
                    } = e.payload, i = window.BitcoinProvider;
                    if (!i) throw Error("No Bitcoin Wallet installed");
                    if (!n) throw Error("Address purposes are required");
                    try {
                        let t = (0, o.createUnsecuredToken)(e.payload),
                            r = await i.connect(t);
                        e.onFinish ? .(r)
                    } catch (t) {
                        console.error("[Connect] Error during address request", t), e.onCancel ? .()
                    }
                };
            t.getAddress = s, i(r(6290), t)
        },
        6290: function(e, t) {
            "use strict";
            var r;
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.AddressPurposes = void 0, (r = t.AddressPurposes || (t.AddressPurposes = {})).PAYMENT = "payment", r.ORDINALS = "ordinals"
        },
        5558: function(e, t, r) {
            "use strict";
            var n;
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.callWalletPopup = t.CallMethod = void 0;
            let i = r(66630);
            (n = t.CallMethod || (t.CallMethod = {})).SIGN_TRANSACTION = "signTransaction", n.GET_ADDRESS = "getAddress";
            let o = async e => {
                let t = window.BitcoinProvider,
                    {
                        method: r
                    } = e.payload;
                if (!t) throw Error("No Bitcoin Wallet installed");
                if (!r) throw Error("A wallet method is required");
                let n = (0, i.createUnsecuredToken)(e.payload);
                try {
                    let r = await t.call(n);
                    e.onFinish ? .(r)
                } catch (t) {
                    console.error("[Connect] Error during call request", t), e.onCancel ? .()
                }
            };
            t.callWalletPopup = o
        },
        52943: function(e, t) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            })
        },
        18917: function(e, t, r) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.signTransaction = void 0;
            let n = r(66630),
                i = async e => {
                    let {
                        psbtBase64: t,
                        inputsToSign: r
                    } = e.payload, i = window.BitcoinProvider;
                    if (!i) throw Error("No Bitcoin Wallet installed");
                    if (!t) throw Error("a value for psbtBase64 representing the tx hash is required");
                    if (!r) throw Error("an array specifying the inputs to be signed by the wallet is required");
                    try {
                        let t = (0, n.createUnsecuredToken)(e.payload),
                            r = await i.signTransaction(t);
                        e.onFinish ? .(r)
                    } catch (t) {
                        console.error("[Connect] Error during signPsbt request", t), e.onCancel ? .()
                    }
                };
            t.signTransaction = i
        },
        63534: function(e, t, r) {
            var n = r(2403).Buffer;

            function i(e, t) {
                this._block = n.alloc(e), this._finalSize = t, this._blockSize = e, this._len = 0
            }
            i.prototype.update = function(e, t) {
                "string" == typeof e && (t = t || "utf8", e = n.from(e, t));
                for (var r = this._block, i = this._blockSize, o = e.length, s = this._len, a = 0; a < o;) {
                    for (var u = s % i, l = Math.min(o - a, i - u), f = 0; f < l; f++) r[u + f] = e[a + f];
                    s += l, a += l, s % i == 0 && this._update(r)
                }
                return this._len += o, this
            }, i.prototype.digest = function(e) {
                var t = this._len % this._blockSize;
                this._block[t] = 128, this._block.fill(0, t + 1), t >= this._finalSize && (this._update(this._block), this._block.fill(0));
                var r = 8 * this._len;
                if (r <= 4294967295) this._block.writeUInt32BE(r, this._blockSize - 4);
                else {
                    var n = (4294967295 & r) >>> 0,
                        i = (r - n) / 4294967296;
                    this._block.writeUInt32BE(i, this._blockSize - 8), this._block.writeUInt32BE(n, this._blockSize - 4)
                }
                this._update(this._block);
                var o = this._hash();
                return e ? o.toString(e) : o
            }, i.prototype._update = function() {
                throw Error("_update must be implemented by subclass")
            }, e.exports = i
        },
        36677: function(e, t, r) {
            var n = e.exports = function(e) {
                var t = n[e = e.toLowerCase()];
                if (!t) throw Error(e + " is not supported (we accept pull requests)");
                return new t
            };
            n.sha = r(64525), n.sha1 = r(51208), n.sha224 = r(55569), n.sha256 = r(97026), n.sha384 = r(949), n.sha512 = r(98361)
        },
        64525: function(e, t, r) {
            var n = r(3501),
                i = r(63534),
                o = r(2403).Buffer,
                s = [1518500249, 1859775393, -1894007588, -899497514],
                a = Array(80);

            function u() {
                this.init(), this._w = a, i.call(this, 64, 56)
            }
            n(u, i), u.prototype.init = function() {
                return this._a = 1732584193, this._b = 4023233417, this._c = 2562383102, this._d = 271733878, this._e = 3285377520, this
            }, u.prototype._update = function(e) {
                for (var t = this._w, r = 0 | this._a, n = 0 | this._b, i = 0 | this._c, o = 0 | this._d, a = 0 | this._e, u = 0; u < 16; ++u) t[u] = e.readInt32BE(4 * u);
                for (; u < 80; ++u) t[u] = t[u - 3] ^ t[u - 8] ^ t[u - 14] ^ t[u - 16];
                for (var l = 0; l < 80; ++l) {
                    var f, c, h, p, d, y = ~~(l / 20),
                        g = ((f = r) << 5 | f >>> 27) + (c = n, h = i, p = o, 0 === y ? c & h | ~c & p : 2 === y ? c & h | c & p | h & p : c ^ h ^ p) + a + t[l] + s[y] | 0;
                    a = o, o = i, i = (d = n) << 30 | d >>> 2, n = r, r = g
                }
                this._a = r + this._a | 0, this._b = n + this._b | 0, this._c = i + this._c | 0, this._d = o + this._d | 0, this._e = a + this._e | 0
            }, u.prototype._hash = function() {
                var e = o.allocUnsafe(20);
                return e.writeInt32BE(0 | this._a, 0), e.writeInt32BE(0 | this._b, 4), e.writeInt32BE(0 | this._c, 8), e.writeInt32BE(0 | this._d, 12), e.writeInt32BE(0 | this._e, 16), e
            }, e.exports = u
        },
        51208: function(e, t, r) {
            var n = r(3501),
                i = r(63534),
                o = r(2403).Buffer,
                s = [1518500249, 1859775393, -1894007588, -899497514],
                a = Array(80);

            function u() {
                this.init(), this._w = a, i.call(this, 64, 56)
            }
            n(u, i), u.prototype.init = function() {
                return this._a = 1732584193, this._b = 4023233417, this._c = 2562383102, this._d = 271733878, this._e = 3285377520, this
            }, u.prototype._update = function(e) {
                for (var t = this._w, r = 0 | this._a, n = 0 | this._b, i = 0 | this._c, o = 0 | this._d, a = 0 | this._e, u = 0; u < 16; ++u) t[u] = e.readInt32BE(4 * u);
                for (; u < 80; ++u) t[u] = (f = t[u - 3] ^ t[u - 8] ^ t[u - 14] ^ t[u - 16]) << 1 | f >>> 31;
                for (var l = 0; l < 80; ++l) {
                    var f, c, h, p, d, y, g = ~~(l / 20),
                        b = ((c = r) << 5 | c >>> 27) + (h = n, p = i, d = o, 0 === g ? h & p | ~h & d : 2 === g ? h & p | h & d | p & d : h ^ p ^ d) + a + t[l] + s[g] | 0;
                    a = o, o = i, i = (y = n) << 30 | y >>> 2, n = r, r = b
                }
                this._a = r + this._a | 0, this._b = n + this._b | 0, this._c = i + this._c | 0, this._d = o + this._d | 0, this._e = a + this._e | 0
            }, u.prototype._hash = function() {
                var e = o.allocUnsafe(20);
                return e.writeInt32BE(0 | this._a, 0), e.writeInt32BE(0 | this._b, 4), e.writeInt32BE(0 | this._c, 8), e.writeInt32BE(0 | this._d, 12), e.writeInt32BE(0 | this._e, 16), e
            }, e.exports = u
        },
        55569: function(e, t, r) {
            var n = r(3501),
                i = r(97026),
                o = r(63534),
                s = r(2403).Buffer,
                a = Array(64);

            function u() {
                this.init(), this._w = a, o.call(this, 64, 56)
            }
            n(u, i), u.prototype.init = function() {
                return this._a = 3238371032, this._b = 914150663, this._c = 812702999, this._d = 4144912697, this._e = 4290775857, this._f = 1750603025, this._g = 1694076839, this._h = 3204075428, this
            }, u.prototype._hash = function() {
                var e = s.allocUnsafe(28);
                return e.writeInt32BE(this._a, 0), e.writeInt32BE(this._b, 4), e.writeInt32BE(this._c, 8), e.writeInt32BE(this._d, 12), e.writeInt32BE(this._e, 16), e.writeInt32BE(this._f, 20), e.writeInt32BE(this._g, 24), e
            }, e.exports = u
        },
        97026: function(e, t, r) {
            var n = r(3501),
                i = r(63534),
                o = r(2403).Buffer,
                s = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298],
                a = Array(64);

            function u() {
                this.init(), this._w = a, i.call(this, 64, 56)
            }
            n(u, i), u.prototype.init = function() {
                return this._a = 1779033703, this._b = 3144134277, this._c = 1013904242, this._d = 2773480762, this._e = 1359893119, this._f = 2600822924, this._g = 528734635, this._h = 1541459225, this
            }, u.prototype._update = function(e) {
                for (var t = this._w, r = 0 | this._a, n = 0 | this._b, i = 0 | this._c, o = 0 | this._d, a = 0 | this._e, u = 0 | this._f, l = 0 | this._g, f = 0 | this._h, c = 0; c < 16; ++c) t[c] = e.readInt32BE(4 * c);
                for (; c < 64; ++c) t[c] = (((p = t[c - 2]) >>> 17 | p << 15) ^ (p >>> 19 | p << 13) ^ p >>> 10) + t[c - 7] + (((d = t[c - 15]) >>> 7 | d << 25) ^ (d >>> 18 | d << 14) ^ d >>> 3) + t[c - 16] | 0;
                for (var h = 0; h < 64; ++h) {
                    var p, d, y, g, b, m, w, E, S, v = f + (((y = a) >>> 6 | y << 26) ^ (y >>> 11 | y << 21) ^ (y >>> 25 | y << 7)) + (g = a, b = u, (m = l) ^ g & (b ^ m)) + s[h] + t[h] | 0,
                        _ = (((w = r) >>> 2 | w << 30) ^ (w >>> 13 | w << 19) ^ (w >>> 22 | w << 10)) + ((E = r) & (S = n) | i & (E | S)) | 0;
                    f = l, l = u, u = a, a = o + v | 0, o = i, i = n, n = r, r = v + _ | 0
                }
                this._a = r + this._a | 0, this._b = n + this._b | 0, this._c = i + this._c | 0, this._d = o + this._d | 0, this._e = a + this._e | 0, this._f = u + this._f | 0, this._g = l + this._g | 0, this._h = f + this._h | 0
            }, u.prototype._hash = function() {
                var e = o.allocUnsafe(32);
                return e.writeInt32BE(this._a, 0), e.writeInt32BE(this._b, 4), e.writeInt32BE(this._c, 8), e.writeInt32BE(this._d, 12), e.writeInt32BE(this._e, 16), e.writeInt32BE(this._f, 20), e.writeInt32BE(this._g, 24), e.writeInt32BE(this._h, 28), e
            }, e.exports = u
        },
        949: function(e, t, r) {
            var n = r(3501),
                i = r(98361),
                o = r(63534),
                s = r(2403).Buffer,
                a = Array(160);

            function u() {
                this.init(), this._w = a, o.call(this, 128, 112)
            }
            n(u, i), u.prototype.init = function() {
                return this._ah = 3418070365, this._bh = 1654270250, this._ch = 2438529370, this._dh = 355462360, this._eh = 1731405415, this._fh = 2394180231, this._gh = 3675008525, this._hh = 1203062813, this._al = 3238371032, this._bl = 914150663, this._cl = 812702999, this._dl = 4144912697, this._el = 4290775857, this._fl = 1750603025, this._gl = 1694076839, this._hl = 3204075428, this
            }, u.prototype._hash = function() {
                var e = s.allocUnsafe(48);

                function t(t, r, n) {
                    e.writeInt32BE(t, n), e.writeInt32BE(r, n + 4)
                }
                return t(this._ah, this._al, 0), t(this._bh, this._bl, 8), t(this._ch, this._cl, 16), t(this._dh, this._dl, 24), t(this._eh, this._el, 32), t(this._fh, this._fl, 40), e
            }, e.exports = u
        },
        98361: function(e, t, r) {
            var n = r(3501),
                i = r(63534),
                o = r(2403).Buffer,
                s = [1116352408, 3609767458, 1899447441, 602891725, 3049323471, 3964484399, 3921009573, 2173295548, 961987163, 4081628472, 1508970993, 3053834265, 2453635748, 2937671579, 2870763221, 3664609560, 3624381080, 2734883394, 310598401, 1164996542, 607225278, 1323610764, 1426881987, 3590304994, 1925078388, 4068182383, 2162078206, 991336113, 2614888103, 633803317, 3248222580, 3479774868, 3835390401, 2666613458, 4022224774, 944711139, 264347078, 2341262773, 604807628, 2007800933, 770255983, 1495990901, 1249150122, 1856431235, 1555081692, 3175218132, 1996064986, 2198950837, 2554220882, 3999719339, 2821834349, 766784016, 2952996808, 2566594879, 3210313671, 3203337956, 3336571891, 1034457026, 3584528711, 2466948901, 113926993, 3758326383, 338241895, 168717936, 666307205, 1188179964, 773529912, 1546045734, 1294757372, 1522805485, 1396182291, 2643833823, 1695183700, 2343527390, 1986661051, 1014477480, 2177026350, 1206759142, 2456956037, 344077627, 2730485921, 1290863460, 2820302411, 3158454273, 3259730800, 3505952657, 3345764771, 106217008, 3516065817, 3606008344, 3600352804, 1432725776, 4094571909, 1467031594, 275423344, 851169720, 430227734, 3100823752, 506948616, 1363258195, 659060556, 3750685593, 883997877, 3785050280, 958139571, 3318307427, 1322822218, 3812723403, 1537002063, 2003034995, 1747873779, 3602036899, 1955562222, 1575990012, 2024104815, 1125592928, 2227730452, 2716904306, 2361852424, 442776044, 2428436474, 593698344, 2756734187, 3733110249, 3204031479, 2999351573, 3329325298, 3815920427, 3391569614, 3928383900, 3515267271, 566280711, 3940187606, 3454069534, 4118630271, 4000239992, 116418474, 1914138554, 174292421, 2731055270, 289380356, 3203993006, 460393269, 320620315, 685471733, 587496836, 852142971, 1086792851, 1017036298, 365543100, 1126000580, 2618297676, 1288033470, 3409855158, 1501505948, 4234509866, 1607167915, 987167468, 1816402316, 1246189591],
                a = Array(160);

            function u() {
                this.init(), this._w = a, i.call(this, 128, 112)
            }

            function l(e, t) {
                return (e >>> 28 | t << 4) ^ (t >>> 2 | e << 30) ^ (t >>> 7 | e << 25)
            }

            function f(e, t) {
                return (e >>> 14 | t << 18) ^ (e >>> 18 | t << 14) ^ (t >>> 9 | e << 23)
            }

            function c(e, t) {
                return e >>> 0 < t >>> 0 ? 1 : 0
            }
            n(u, i), u.prototype.init = function() {
                return this._ah = 1779033703, this._bh = 3144134277, this._ch = 1013904242, this._dh = 2773480762, this._eh = 1359893119, this._fh = 2600822924, this._gh = 528734635, this._hh = 1541459225, this._al = 4089235720, this._bl = 2227873595, this._cl = 4271175723, this._dl = 1595750129, this._el = 2917565137, this._fl = 725511199, this._gl = 4215389547, this._hl = 327033209, this
            }, u.prototype._update = function(e) {
                for (var t = this._w, r = 0 | this._ah, n = 0 | this._bh, i = 0 | this._ch, o = 0 | this._dh, a = 0 | this._eh, u = 0 | this._fh, h = 0 | this._gh, p = 0 | this._hh, d = 0 | this._al, y = 0 | this._bl, g = 0 | this._cl, b = 0 | this._dl, m = 0 | this._el, w = 0 | this._fl, E = 0 | this._gl, S = 0 | this._hl, v = 0; v < 32; v += 2) t[v] = e.readInt32BE(4 * v), t[v + 1] = e.readInt32BE(4 * v + 4);
                for (; v < 160; v += 2) {
                    var _, T, A, O, I, P, k, x, R = t[v - 30],
                        B = t[v - 30 + 1],
                        N = ((_ = R) >>> 1 | (T = B) << 31) ^ (_ >>> 8 | T << 24) ^ _ >>> 7,
                        U = ((A = B) >>> 1 | (O = R) << 31) ^ (A >>> 8 | O << 24) ^ (A >>> 7 | O << 25);
                    R = t[v - 4], B = t[v - 4 + 1];
                    var C = ((I = R) >>> 19 | (P = B) << 13) ^ (P >>> 29 | I << 3) ^ I >>> 6,
                        L = ((k = B) >>> 19 | (x = R) << 13) ^ (x >>> 29 | k << 3) ^ (k >>> 6 | x << 26),
                        H = t[v - 14],
                        j = t[v - 14 + 1],
                        D = t[v - 32],
                        M = t[v - 32 + 1],
                        F = U + j | 0,
                        W = N + H + c(F, U) | 0;
                    W = (W = W + C + c(F = F + L | 0, L) | 0) + D + c(F = F + M | 0, M) | 0, t[v] = W, t[v + 1] = F
                }
                for (var V = 0; V < 160; V += 2) {
                    W = t[V], F = t[V + 1];
                    var K, $, q, G, z, X, Y, J, Z, Q, ee = (K = r) & ($ = n) | i & (K | $),
                        et = (q = d) & (G = y) | g & (q | G),
                        er = l(r, d),
                        en = l(d, r),
                        ei = f(a, m),
                        eo = f(m, a),
                        es = s[V],
                        ea = s[V + 1],
                        eu = (z = a, X = u, (Y = h) ^ z & (X ^ Y)),
                        el = (J = m, Z = w, (Q = E) ^ J & (Z ^ Q)),
                        ef = S + eo | 0,
                        ec = p + ei + c(ef, S) | 0;
                    ec = (ec = (ec = ec + eu + c(ef = ef + el | 0, el) | 0) + es + c(ef = ef + ea | 0, ea) | 0) + W + c(ef = ef + F | 0, F) | 0;
                    var eh = en + et | 0,
                        ep = er + ee + c(eh, en) | 0;
                    p = h, S = E, h = u, E = w, u = a, w = m, a = o + ec + c(m = b + ef | 0, b) | 0, o = i, b = g, i = n, g = y, n = r, y = d, r = ec + ep + c(d = ef + eh | 0, ef) | 0
                }
                this._al = this._al + d | 0, this._bl = this._bl + y | 0, this._cl = this._cl + g | 0, this._dl = this._dl + b | 0, this._el = this._el + m | 0, this._fl = this._fl + w | 0, this._gl = this._gl + E | 0, this._hl = this._hl + S | 0, this._ah = this._ah + r + c(this._al, d) | 0, this._bh = this._bh + n + c(this._bl, y) | 0, this._ch = this._ch + i + c(this._cl, g) | 0, this._dh = this._dh + o + c(this._dl, b) | 0, this._eh = this._eh + a + c(this._el, m) | 0, this._fh = this._fh + u + c(this._fl, w) | 0, this._gh = this._gh + h + c(this._gl, E) | 0, this._hh = this._hh + p + c(this._hl, S) | 0
            }, u.prototype._hash = function() {
                var e = o.allocUnsafe(64);

                function t(t, r, n) {
                    e.writeInt32BE(t, n), e.writeInt32BE(r, n + 4)
                }
                return t(this._ah, this._al, 0), t(this._bh, this._bl, 8), t(this._ch, this._cl, 16), t(this._dh, this._dl, 24), t(this._eh, this._el, 32), t(this._fh, this._fl, 40), t(this._gh, this._gl, 48), t(this._hh, this._hl, 56), e
            }, e.exports = u
        },
        33099: function(e, t, r) {
            "use strict";
            var n = r(2403).Buffer,
                i = n.isEncoding || function(e) {
                    switch ((e = "" + e) && e.toLowerCase()) {
                        case "hex":
                        case "utf8":
                        case "utf-8":
                        case "ascii":
                        case "binary":
                        case "base64":
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                        case "raw":
                            return !0;
                        default:
                            return !1
                    }
                };

            function o(e) {
                var t;
                switch (this.encoding = function(e) {
                    var t = function(e) {
                        var t;
                        if (!e) return "utf8";
                        for (;;) switch (e) {
                            case "utf8":
                            case "utf-8":
                                return "utf8";
                            case "ucs2":
                            case "ucs-2":
                            case "utf16le":
                            case "utf-16le":
                                return "utf16le";
                            case "latin1":
                            case "binary":
                                return "latin1";
                            case "base64":
                            case "ascii":
                            case "hex":
                                return e;
                            default:
                                if (t) return;
                                e = ("" + e).toLowerCase(), t = !0
                        }
                    }(e);
                    if ("string" != typeof t && (n.isEncoding === i || !i(e))) throw Error("Unknown encoding: " + e);
                    return t || e
                }(e), this.encoding) {
                    case "utf16le":
                        this.text = u, this.end = l, t = 4;
                        break;
                    case "utf8":
                        this.fillLast = a, t = 4;
                        break;
                    case "base64":
                        this.text = f, this.end = c, t = 3;
                        break;
                    default:
                        this.write = h, this.end = p;
                        return
                }
                this.lastNeed = 0, this.lastTotal = 0, this.lastChar = n.allocUnsafe(t)
            }

            function s(e) {
                return e <= 127 ? 0 : e >> 5 == 6 ? 2 : e >> 4 == 14 ? 3 : e >> 3 == 30 ? 4 : e >> 6 == 2 ? -1 : -2
            }

            function a(e) {
                var t = this.lastTotal - this.lastNeed,
                    r = function(e, t, r) {
                        if ((192 & t[0]) != 128) return e.lastNeed = 0, "�";
                        if (e.lastNeed > 1 && t.length > 1) {
                            if ((192 & t[1]) != 128) return e.lastNeed = 1, "�";
                            if (e.lastNeed > 2 && t.length > 2 && (192 & t[2]) != 128) return e.lastNeed = 2, "�"
                        }
                    }(this, e, 0);
                return void 0 !== r ? r : this.lastNeed <= e.length ? (e.copy(this.lastChar, t, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal)) : void(e.copy(this.lastChar, t, 0, e.length), this.lastNeed -= e.length)
            }

            function u(e, t) {
                if ((e.length - t) % 2 == 0) {
                    var r = e.toString("utf16le", t);
                    if (r) {
                        var n = r.charCodeAt(r.length - 1);
                        if (n >= 55296 && n <= 56319) return this.lastNeed = 2, this.lastTotal = 4, this.lastChar[0] = e[e.length - 2], this.lastChar[1] = e[e.length - 1], r.slice(0, -1)
                    }
                    return r
                }
                return this.lastNeed = 1, this.lastTotal = 2, this.lastChar[0] = e[e.length - 1], e.toString("utf16le", t, e.length - 1)
            }

            function l(e) {
                var t = e && e.length ? this.write(e) : "";
                if (this.lastNeed) {
                    var r = this.lastTotal - this.lastNeed;
                    return t + this.lastChar.toString("utf16le", 0, r)
                }
                return t
            }

            function f(e, t) {
                var r = (e.length - t) % 3;
                return 0 === r ? e.toString("base64", t) : (this.lastNeed = 3 - r, this.lastTotal = 3, 1 === r ? this.lastChar[0] = e[e.length - 1] : (this.lastChar[0] = e[e.length - 2], this.lastChar[1] = e[e.length - 1]), e.toString("base64", t, e.length - r))
            }

            function c(e) {
                var t = e && e.length ? this.write(e) : "";
                return this.lastNeed ? t + this.lastChar.toString("base64", 0, 3 - this.lastNeed) : t
            }

            function h(e) {
                return e.toString(this.encoding)
            }

            function p(e) {
                return e && e.length ? this.write(e) : ""
            }
            t.StringDecoder = o, o.prototype.write = function(e) {
                var t, r;
                if (0 === e.length) return "";
                if (this.lastNeed) {
                    if (void 0 === (t = this.fillLast(e))) return "";
                    r = this.lastNeed, this.lastNeed = 0
                } else r = 0;
                return r < e.length ? t ? t + this.text(e, r) : this.text(e, r) : t || ""
            }, o.prototype.end = function(e) {
                var t = e && e.length ? this.write(e) : "";
                return this.lastNeed ? t + "�" : t
            }, o.prototype.text = function(e, t) {
                var r = function(e, t, r) {
                    var n = t.length - 1;
                    if (n < r) return 0;
                    var i = s(t[n]);
                    return i >= 0 ? (i > 0 && (e.lastNeed = i - 1), i) : --n < r || -2 === i ? 0 : (i = s(t[n])) >= 0 ? (i > 0 && (e.lastNeed = i - 2), i) : --n < r || -2 === i ? 0 : (i = s(t[n])) >= 0 ? (i > 0 && (2 === i ? i = 0 : e.lastNeed = i - 3), i) : 0
                }(this, e, t);
                if (!this.lastNeed) return e.toString("utf8", t);
                this.lastTotal = r;
                var n = e.length - (r - this.lastNeed);
                return e.copy(this.lastChar, 0, n), e.toString("utf8", t, n)
            }, o.prototype.fillLast = function(e) {
                if (this.lastNeed <= e.length) return e.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
                e.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, e.length), this.lastNeed -= e.length
            }
        },
        27499: function(e, t, r) {
            var n = r(91935);

            function i(e) {
                return e.name || e.toString().match(/function (.*?)\s*\(/)[1]
            }

            function o(e) {
                return n.Nil(e) ? "" : i(e.constructor)
            }

            function s(e, t) {
                Error.captureStackTrace && Error.captureStackTrace(e, t)
            }

            function a(e) {
                return n.Function(e) ? e.toJSON ? e.toJSON() : i(e) : n.Array(e) ? "Array" : e && n.Object(e) ? "Object" : void 0 !== e ? e : ""
            }

            function u(e, t, r) {
                var i = n.Function(t) ? "" : n.String(t) ? JSON.stringify(t) : t && n.Object(t) ? "" : t;
                return "Expected " + a(e) + ", got" + ("" !== r ? " " + r : "") + ("" !== i ? " " + i : "")
            }

            function l(e, t, r) {
                r = r || o(t), this.message = u(e, t, r), s(this, l), this.__type = e, this.__value = t, this.__valueTypeName = r
            }

            function f(e, t, r, n, i) {
                if (e) {
                    var f, c;
                    i = i || o(n), this.message = (f = i, c = '" of type ', "key" === r && (c = '" with key type '), u('property "' + a(t) + c + a(e), n, f))
                } else this.message = 'Unexpected property "' + t + '"';
                s(this, l), this.__label = r, this.__property = t, this.__type = e, this.__value = n, this.__valueTypeName = i
            }
            l.prototype = Object.create(Error.prototype), l.prototype.constructor = l, f.prototype = Object.create(Error.prototype), f.prototype.constructor = l, e.exports = {
                TfTypeError: l,
                TfPropertyTypeError: f,
                tfCustomError: function(e, t) {
                    return new l(e, {}, t)
                },
                tfSubError: function(e, t, r) {
                    return e instanceof f ? (t = t + "." + e.__property, e = new f(e.__type, t, e.__label, e.__value, e.__valueTypeName)) : e instanceof l && (e = new f(e.__type, t, r, e.__value, e.__valueTypeName)), s(e), e
                },
                tfJSON: a,
                getValueTypeName: o
            }
        },
        13015: function(e, t, r) {
            var n = r(91083).Buffer,
                i = r(91935),
                o = r(27499);

            function s(e) {
                return n.isBuffer(e)
            }

            function a(e) {
                return "string" == typeof e && /^([0-9a-f]{2})+$/i.test(e)
            }

            function u(e, t) {
                var r = e.toJSON();

                function n(n) {
                    if (!e(n)) return !1;
                    if (n.length === t) return !0;
                    throw o.tfCustomError(r + "(Length: " + t + ")", r + "(Length: " + n.length + ")")
                }
                return n.toJSON = function() {
                    return r
                }, n
            }
            var l = u.bind(null, i.Array),
                f = u.bind(null, s),
                c = u.bind(null, a),
                h = {
                    ArrayN: l,
                    Buffer: s,
                    BufferN: f,
                    Finite: function(e) {
                        return "number" == typeof e && isFinite(e)
                    },
                    Hex: a,
                    HexN: c,
                    Int8: function(e) {
                        return e << 24 >> 24 === e
                    },
                    Int16: function(e) {
                        return e << 16 >> 16 === e
                    },
                    Int32: function(e) {
                        return (0 | e) === e
                    },
                    Int53: function(e) {
                        return "number" == typeof e && e >= -9007199254740991 && e <= 9007199254740991 && Math.floor(e) === e
                    },
                    Range: function(e, t, r) {
                        function n(n, i) {
                            return r(n, i) && n > e && n < t
                        }
                        return r = r || i.Number, n.toJSON = function() {
                            return `${r.toJSON()} between [${e}, ${t}]`
                        }, n
                    },
                    StringN: u.bind(null, i.String),
                    UInt8: function(e) {
                        return (255 & e) === e
                    },
                    UInt16: function(e) {
                        return (65535 & e) === e
                    },
                    UInt32: function(e) {
                        return e >>> 0 === e
                    },
                    UInt53: function(e) {
                        return "number" == typeof e && e >= 0 && e <= 9007199254740991 && Math.floor(e) === e
                    }
                };
            for (var p in h) h[p].toJSON = (function(e) {
                return e
            }).bind(null, p);
            e.exports = h
        },
        59451: function(e, t, r) {
            var n = r(27499),
                i = r(91935),
                o = n.tfJSON,
                s = n.TfTypeError,
                a = n.TfPropertyTypeError,
                u = n.tfSubError,
                l = n.getValueTypeName,
                f = {
                    arrayOf: function(e, t) {
                        function r(r, n) {
                            return !(!i.Array(r) || i.Nil(r)) && (void 0 === t.minLength || !(r.length < t.minLength)) && (void 0 === t.maxLength || !(r.length > t.maxLength)) && (void 0 === t.length || r.length === t.length) && r.every(function(t, r) {
                                try {
                                    return h(e, t, n)
                                } catch (e) {
                                    throw u(e, r)
                                }
                            })
                        }
                        return e = c(e), t = t || {}, r.toJSON = function() {
                            var r = "[" + o(e) + "]";
                            return void 0 !== t.length ? r += "{" + t.length + "}" : (void 0 !== t.minLength || void 0 !== t.maxLength) && (r += "{" + (void 0 === t.minLength ? 0 : t.minLength) + "," + (void 0 === t.maxLength ? 1 / 0 : t.maxLength) + "}"), r
                        }, r
                    },
                    maybe: function e(t) {
                        function r(r, n) {
                            return i.Nil(r) || t(r, n, e)
                        }
                        return t = c(t), r.toJSON = function() {
                            return "?" + o(t)
                        }, r
                    },
                    map: function(e, t) {
                        function r(r, n) {
                            if (!i.Object(r) || i.Nil(r)) return !1;
                            for (var o in r) {
                                try {
                                    t && h(t, o, n)
                                } catch (e) {
                                    throw u(e, o, "key")
                                }
                                try {
                                    var s = r[o];
                                    h(e, s, n)
                                } catch (e) {
                                    throw u(e, o)
                                }
                            }
                            return !0
                        }
                        return e = c(e), t && (t = c(t)), t ? r.toJSON = function() {
                            return "{" + o(t) + ": " + o(e) + "}"
                        } : r.toJSON = function() {
                            return "{" + o(e) + "}"
                        }, r
                    },
                    object: function(e) {
                        var t = {};
                        for (var r in e) t[r] = c(e[r]);

                        function n(e, r) {
                            if (!i.Object(e) || i.Nil(e)) return !1;
                            try {
                                for (n in t) {
                                    var n, o = t[n],
                                        s = e[n];
                                    h(o, s, r)
                                }
                            } catch (e) {
                                throw u(e, n)
                            }
                            if (r) {
                                for (n in e)
                                    if (!t[n]) throw new a(void 0, n)
                            }
                            return !0
                        }
                        return n.toJSON = function() {
                            return o(t)
                        }, n
                    },
                    anyOf: function() {
                        var e = [].slice.call(arguments).map(c);

                        function t(t, r) {
                            return e.some(function(e) {
                                try {
                                    return h(e, t, r)
                                } catch (e) {
                                    return !1
                                }
                            })
                        }
                        return t.toJSON = function() {
                            return e.map(o).join("|")
                        }, t
                    },
                    allOf: function() {
                        var e = [].slice.call(arguments).map(c);

                        function t(t, r) {
                            return e.every(function(e) {
                                try {
                                    return h(e, t, r)
                                } catch (e) {
                                    return !1
                                }
                            })
                        }
                        return t.toJSON = function() {
                            return e.map(o).join(" & ")
                        }, t
                    },
                    quacksLike: function(e) {
                        function t(t) {
                            return e === l(t)
                        }
                        return t.toJSON = function() {
                            return e
                        }, t
                    },
                    tuple: function() {
                        var e = [].slice.call(arguments).map(c);

                        function t(t, r) {
                            return !(i.Nil(t) || i.Nil(t.length)) && (!r || t.length === e.length) && e.every(function(e, n) {
                                try {
                                    return h(e, t[n], r)
                                } catch (e) {
                                    throw u(e, n)
                                }
                            })
                        }
                        return t.toJSON = function() {
                            return "(" + e.map(o).join(", ") + ")"
                        }, t
                    },
                    value: function(e) {
                        function t(t) {
                            return t === e
                        }
                        return t.toJSON = function() {
                            return e
                        }, t
                    }
                };

            function c(e) {
                if (i.String(e)) return "?" === e[0] ? f.maybe(e.slice(1)) : i[e] || f.quacksLike(e);
                if (e && i.Object(e)) {
                    if (i.Array(e)) {
                        if (1 !== e.length) throw TypeError("Expected compile() parameter of type Array of length 1");
                        return f.arrayOf(e[0])
                    }
                    return f.object(e)
                }
                return i.Function(e) ? e : f.value(e)
            }

            function h(e, t, r, n) {
                if (i.Function(e)) {
                    if (e(t, r)) return !0;
                    throw new s(n || e, t)
                }
                return h(c(e), t, r)
            }
            for (var p in f.oneOf = f.anyOf, i) h[p] = i[p];
            for (p in f) h[p] = f[p];
            var d = r(13015);
            for (p in d) h[p] = d[p];
            h.compile = c, h.TfTypeError = s, h.TfPropertyTypeError = a, e.exports = h
        },
        91935: function(e) {
            var t = {
                Array: function(e) {
                    return null != e && e.constructor === Array
                },
                Boolean: function(e) {
                    return "boolean" == typeof e
                },
                Function: function(e) {
                    return "function" == typeof e
                },
                Nil: function(e) {
                    return null == e
                },
                Number: function(e) {
                    return "number" == typeof e
                },
                Object: function(e) {
                    return "object" == typeof e
                },
                String: function(e) {
                    return "string" == typeof e
                },
                "": function() {
                    return !0
                }
            };
            for (var r in t.Null = t.Nil, t) t[r].toJSON = (function(e) {
                return e
            }).bind(null, r);
            e.exports = t
        },
        41202: function(e, t, r) {
            e.exports = function(e, t) {
                if (n("noDeprecation")) return e;
                var r = !1;
                return function() {
                    if (!r) {
                        if (n("throwDeprecation")) throw Error(t);
                        n("traceDeprecation") ? console.trace(t) : console.warn(t), r = !0
                    }
                    return e.apply(this, arguments)
                }
            };

            function n(e) {
                try {
                    if (!r.g.localStorage) return !1
                } catch (e) {
                    return !1
                }
                var t = r.g.localStorage[e];
                return null != t && "true" === String(t).toLowerCase()
            }
        },
        71238: function(e) {
            "function" == typeof Object.create ? e.exports = function(e, t) {
                t && (e.super_ = t, e.prototype = Object.create(t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }))
            } : e.exports = function(e, t) {
                if (t) {
                    e.super_ = t;
                    var r = function() {};
                    r.prototype = t.prototype, e.prototype = new r, e.prototype.constructor = e
                }
            }
        },
        56351: function(e) {
            e.exports = function(e) {
                return e && "object" == typeof e && "function" == typeof e.copy && "function" == typeof e.fill && "function" == typeof e.readUInt8
            }
        },
        62587: function(e, t, r) {
            "use strict";
            var n = r(26714),
                i = r(10079),
                o = r(22583),
                s = r(20932);

            function a(e) {
                return e.call.bind(e)
            }
            var u = "undefined" != typeof BigInt,
                l = "undefined" != typeof Symbol,
                f = a(Object.prototype.toString),
                c = a(Number.prototype.valueOf),
                h = a(String.prototype.valueOf),
                p = a(Boolean.prototype.valueOf);
            if (u) var d = a(BigInt.prototype.valueOf);
            if (l) var y = a(Symbol.prototype.valueOf);

            function g(e, t) {
                if ("object" != typeof e) return !1;
                try {
                    return t(e), !0
                } catch (e) {
                    return !1
                }
            }

            function b(e) {
                return "[object Map]" === f(e)
            }

            function m(e) {
                return "[object Set]" === f(e)
            }

            function w(e) {
                return "[object WeakMap]" === f(e)
            }

            function E(e) {
                return "[object WeakSet]" === f(e)
            }

            function S(e) {
                return "[object ArrayBuffer]" === f(e)
            }

            function v(e) {
                return "undefined" != typeof ArrayBuffer && (S.working ? S(e) : e instanceof ArrayBuffer)
            }

            function _(e) {
                return "[object DataView]" === f(e)
            }

            function T(e) {
                return "undefined" != typeof DataView && (_.working ? _(e) : e instanceof DataView)
            }
            t.isArgumentsObject = n, t.isGeneratorFunction = i, t.isTypedArray = s, t.isPromise = function(e) {
                return "undefined" != typeof Promise && e instanceof Promise || null !== e && "object" == typeof e && "function" == typeof e.then && "function" == typeof e.catch
            }, t.isArrayBufferView = function(e) {
                return "undefined" != typeof ArrayBuffer && ArrayBuffer.isView ? ArrayBuffer.isView(e) : s(e) || T(e)
            }, t.isUint8Array = function(e) {
                return "Uint8Array" === o(e)
            }, t.isUint8ClampedArray = function(e) {
                return "Uint8ClampedArray" === o(e)
            }, t.isUint16Array = function(e) {
                return "Uint16Array" === o(e)
            }, t.isUint32Array = function(e) {
                return "Uint32Array" === o(e)
            }, t.isInt8Array = function(e) {
                return "Int8Array" === o(e)
            }, t.isInt16Array = function(e) {
                return "Int16Array" === o(e)
            }, t.isInt32Array = function(e) {
                return "Int32Array" === o(e)
            }, t.isFloat32Array = function(e) {
                return "Float32Array" === o(e)
            }, t.isFloat64Array = function(e) {
                return "Float64Array" === o(e)
            }, t.isBigInt64Array = function(e) {
                return "BigInt64Array" === o(e)
            }, t.isBigUint64Array = function(e) {
                return "BigUint64Array" === o(e)
            }, b.working = "undefined" != typeof Map && b(new Map), t.isMap = function(e) {
                return "undefined" != typeof Map && (b.working ? b(e) : e instanceof Map)
            }, m.working = "undefined" != typeof Set && m(new Set), t.isSet = function(e) {
                return "undefined" != typeof Set && (m.working ? m(e) : e instanceof Set)
            }, w.working = "undefined" != typeof WeakMap && w(new WeakMap), t.isWeakMap = function(e) {
                return "undefined" != typeof WeakMap && (w.working ? w(e) : e instanceof WeakMap)
            }, E.working = "undefined" != typeof WeakSet && E(new WeakSet), t.isWeakSet = function(e) {
                return E(e)
            }, S.working = "undefined" != typeof ArrayBuffer && S(new ArrayBuffer), t.isArrayBuffer = v, _.working = "undefined" != typeof ArrayBuffer && "undefined" != typeof DataView && _(new DataView(new ArrayBuffer(1), 0, 1)), t.isDataView = T;
            var A = "undefined" != typeof SharedArrayBuffer ? SharedArrayBuffer : void 0;

            function O(e) {
                return "[object SharedArrayBuffer]" === f(e)
            }

            function I(e) {
                return void 0 !== A && (void 0 === O.working && (O.working = O(new A)), O.working ? O(e) : e instanceof A)
            }

            function P(e) {
                return g(e, c)
            }

            function k(e) {
                return g(e, h)
            }

            function x(e) {
                return g(e, p)
            }

            function R(e) {
                return u && g(e, d)
            }

            function B(e) {
                return l && g(e, y)
            }
            t.isSharedArrayBuffer = I, t.isAsyncFunction = function(e) {
                return "[object AsyncFunction]" === f(e)
            }, t.isMapIterator = function(e) {
                return "[object Map Iterator]" === f(e)
            }, t.isSetIterator = function(e) {
                return "[object Set Iterator]" === f(e)
            }, t.isGeneratorObject = function(e) {
                return "[object Generator]" === f(e)
            }, t.isWebAssemblyCompiledModule = function(e) {
                return "[object WebAssembly.Module]" === f(e)
            }, t.isNumberObject = P, t.isStringObject = k, t.isBooleanObject = x, t.isBigIntObject = R, t.isSymbolObject = B, t.isBoxedPrimitive = function(e) {
                return P(e) || k(e) || x(e) || R(e) || B(e)
            }, t.isAnyArrayBuffer = function(e) {
                return "undefined" != typeof Uint8Array && (v(e) || I(e))
            }, ["isProxy", "isExternal", "isModuleNamespaceObject"].forEach(function(e) {
                Object.defineProperty(t, e, {
                    enumerable: !1,
                    value: function() {
                        throw Error(e + " is not supported in userland")
                    }
                })
            })
        },
        19341: function(e, t, r) {
            var n = r(28611),
                i = Object.getOwnPropertyDescriptors || function(e) {
                    for (var t = Object.keys(e), r = {}, n = 0; n < t.length; n++) r[t[n]] = Object.getOwnPropertyDescriptor(e, t[n]);
                    return r
                },
                o = /%[sdj%]/g;
            t.format = function(e) {
                if (!w(e)) {
                    for (var t = [], r = 0; r < arguments.length; r++) t.push(l(arguments[r]));
                    return t.join(" ")
                }
                for (var r = 1, n = arguments, i = n.length, s = String(e).replace(o, function(e) {
                        if ("%%" === e) return "%";
                        if (r >= i) return e;
                        switch (e) {
                            case "%s":
                                return String(n[r++]);
                            case "%d":
                                return Number(n[r++]);
                            case "%j":
                                try {
                                    return JSON.stringify(n[r++])
                                } catch (e) {
                                    return "[Circular]"
                                }
                            default:
                                return e
                        }
                    }), a = n[r]; r < i; a = n[++r]) b(a) || !v(a) ? s += " " + a : s += " " + l(a);
                return s
            }, t.deprecate = function(e, r) {
                if (void 0 !== n && !0 === n.noDeprecation) return e;
                if (void 0 === n) return function() {
                    return t.deprecate(e, r).apply(this, arguments)
                };
                var i = !1;
                return function() {
                    if (!i) {
                        if (n.throwDeprecation) throw Error(r);
                        n.traceDeprecation ? console.trace(r) : console.error(r), i = !0
                    }
                    return e.apply(this, arguments)
                }
            };
            var s = {},
                a = /^$/;
            if (n.env.NODE_DEBUG) {
                var u = n.env.NODE_DEBUG;
                a = RegExp("^" + (u = u.replace(/[|\\{}()[\]^$+?.]/g, "\\$&").replace(/\*/g, ".*").replace(/,/g, "$|^").toUpperCase()) + "$", "i")
            }

            function l(e, r) {
                var n = {
                    seen: [],
                    stylize: c
                };
                return arguments.length >= 3 && (n.depth = arguments[2]), arguments.length >= 4 && (n.colors = arguments[3]), g(r) ? n.showHidden = r : r && t._extend(n, r), E(n.showHidden) && (n.showHidden = !1), E(n.depth) && (n.depth = 2), E(n.colors) && (n.colors = !1), E(n.customInspect) && (n.customInspect = !0), n.colors && (n.stylize = f), h(n, e, n.depth)
            }

            function f(e, t) {
                var r = l.styles[t];
                return r ? "\x1b[" + l.colors[r][0] + "m" + e + "\x1b[" + l.colors[r][1] + "m" : e
            }

            function c(e, t) {
                return e
            }

            function h(e, r, n) {
                if (e.customInspect && r && A(r.inspect) && r.inspect !== t.inspect && !(r.constructor && r.constructor.prototype === r)) {
                    var i, o, s, a, u, l = r.inspect(n, e);
                    return w(l) || (l = h(e, l, n)), l
                }
                var f = function(e, t) {
                    if (E(t)) return e.stylize("undefined", "undefined");
                    if (w(t)) {
                        var r = "'" + JSON.stringify(t).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
                        return e.stylize(r, "string")
                    }
                    return m(t) ? e.stylize("" + t, "number") : g(t) ? e.stylize("" + t, "boolean") : b(t) ? e.stylize("null", "null") : void 0
                }(e, r);
                if (f) return f;
                var c = Object.keys(r),
                    v = (a = {}, c.forEach(function(e, t) {
                        a[e] = !0
                    }), a);
                if (e.showHidden && (c = Object.getOwnPropertyNames(r)), T(r) && (c.indexOf("message") >= 0 || c.indexOf("description") >= 0)) return p(r);
                if (0 === c.length) {
                    if (A(r)) {
                        var O = r.name ? ": " + r.name : "";
                        return e.stylize("[Function" + O + "]", "special")
                    }
                    if (S(r)) return e.stylize(RegExp.prototype.toString.call(r), "regexp");
                    if (_(r)) return e.stylize(Date.prototype.toString.call(r), "date");
                    if (T(r)) return p(r)
                }
                var I = "",
                    P = !1,
                    x = ["{", "}"];
                return (y(r) && (P = !0, x = ["[", "]"]), A(r) && (I = " [Function" + (r.name ? ": " + r.name : "") + "]"), S(r) && (I = " " + RegExp.prototype.toString.call(r)), _(r) && (I = " " + Date.prototype.toUTCString.call(r)), T(r) && (I = " " + p(r)), 0 !== c.length || P && 0 != r.length) ? n < 0 ? S(r) ? e.stylize(RegExp.prototype.toString.call(r), "regexp") : e.stylize("[Object]", "special") : (e.seen.push(r), u = P ? function(e, t, r, n, i) {
                    for (var o = [], s = 0, a = t.length; s < a; ++s) k(t, String(s)) ? o.push(d(e, t, r, n, String(s), !0)) : o.push("");
                    return i.forEach(function(i) {
                        i.match(/^\d+$/) || o.push(d(e, t, r, n, i, !0))
                    }), o
                }(e, r, n, v, c) : c.map(function(t) {
                    return d(e, r, n, v, t, P)
                }), e.seen.pop(), i = I, o = x, s = 0, u.reduce(function(e, t) {
                    return s++, t.indexOf("\n") >= 0 && s++, e + t.replace(/\u001b\[\d\d?m/g, "").length + 1
                }, 0) > 60 ? o[0] + ("" === i ? "" : i + "\n ") + " " + u.join(",\n  ") + " " + o[1] : o[0] + i + " " + u.join(", ") + " " + o[1]) : x[0] + I + x[1]
            }

            function p(e) {
                return "[" + Error.prototype.toString.call(e) + "]"
            }

            function d(e, t, r, n, i, o) {
                var s, a, u;
                if ((u = Object.getOwnPropertyDescriptor(t, i) || {
                        value: t[i]
                    }).get ? a = u.set ? e.stylize("[Getter/Setter]", "special") : e.stylize("[Getter]", "special") : u.set && (a = e.stylize("[Setter]", "special")), k(n, i) || (s = "[" + i + "]"), !a && (0 > e.seen.indexOf(u.value) ? (a = b(r) ? h(e, u.value, null) : h(e, u.value, r - 1)).indexOf("\n") > -1 && (a = o ? a.split("\n").map(function(e) {
                        return "  " + e
                    }).join("\n").slice(2) : "\n" + a.split("\n").map(function(e) {
                        return "   " + e
                    }).join("\n")) : a = e.stylize("[Circular]", "special")), E(s)) {
                    if (o && i.match(/^\d+$/)) return a;
                    (s = JSON.stringify("" + i)).match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/) ? (s = s.slice(1, -1), s = e.stylize(s, "name")) : (s = s.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'"), s = e.stylize(s, "string"))
                }
                return s + ": " + a
            }

            function y(e) {
                return Array.isArray(e)
            }

            function g(e) {
                return "boolean" == typeof e
            }

            function b(e) {
                return null === e
            }

            function m(e) {
                return "number" == typeof e
            }

            function w(e) {
                return "string" == typeof e
            }

            function E(e) {
                return void 0 === e
            }

            function S(e) {
                return v(e) && "[object RegExp]" === O(e)
            }

            function v(e) {
                return "object" == typeof e && null !== e
            }

            function _(e) {
                return v(e) && "[object Date]" === O(e)
            }

            function T(e) {
                return v(e) && ("[object Error]" === O(e) || e instanceof Error)
            }

            function A(e) {
                return "function" == typeof e
            }

            function O(e) {
                return Object.prototype.toString.call(e)
            }

            function I(e) {
                return e < 10 ? "0" + e.toString(10) : e.toString(10)
            }
            t.debuglog = function(e) {
                if (!s[e = e.toUpperCase()]) {
                    if (a.test(e)) {
                        var r = n.pid;
                        s[e] = function() {
                            var n = t.format.apply(t, arguments);
                            console.error("%s %d: %s", e, r, n)
                        }
                    } else s[e] = function() {}
                }
                return s[e]
            }, t.inspect = l, l.colors = {
                bold: [1, 22],
                italic: [3, 23],
                underline: [4, 24],
                inverse: [7, 27],
                white: [37, 39],
                grey: [90, 39],
                black: [30, 39],
                blue: [34, 39],
                cyan: [36, 39],
                green: [32, 39],
                magenta: [35, 39],
                red: [31, 39],
                yellow: [33, 39]
            }, l.styles = {
                special: "cyan",
                number: "yellow",
                boolean: "yellow",
                undefined: "grey",
                null: "bold",
                string: "green",
                date: "magenta",
                regexp: "red"
            }, t.types = r(62587), t.isArray = y, t.isBoolean = g, t.isNull = b, t.isNullOrUndefined = function(e) {
                return null == e
            }, t.isNumber = m, t.isString = w, t.isSymbol = function(e) {
                return "symbol" == typeof e
            }, t.isUndefined = E, t.isRegExp = S, t.types.isRegExp = S, t.isObject = v, t.isDate = _, t.types.isDate = _, t.isError = T, t.types.isNativeError = T, t.isFunction = A, t.isPrimitive = function(e) {
                return null === e || "boolean" == typeof e || "number" == typeof e || "string" == typeof e || "symbol" == typeof e || void 0 === e
            }, t.isBuffer = r(56351);
            var P = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

            function k(e, t) {
                return Object.prototype.hasOwnProperty.call(e, t)
            }
            t.log = function() {
                var e, r;
                console.log("%s - %s", (r = [I((e = new Date).getHours()), I(e.getMinutes()), I(e.getSeconds())].join(":"), [e.getDate(), P[e.getMonth()], r].join(" ")), t.format.apply(t, arguments))
            }, t.inherits = r(71238), t._extend = function(e, t) {
                if (!t || !v(t)) return e;
                for (var r = Object.keys(t), n = r.length; n--;) e[r[n]] = t[r[n]];
                return e
            };
            var x = "undefined" != typeof Symbol ? Symbol("util.promisify.custom") : void 0;

            function R(e, t) {
                if (!e) {
                    var r = Error("Promise was rejected with a falsy value");
                    r.reason = e, e = r
                }
                return t(e)
            }
            t.promisify = function(e) {
                if ("function" != typeof e) throw TypeError('The "original" argument must be of type Function');
                if (x && e[x]) {
                    var t = e[x];
                    if ("function" != typeof t) throw TypeError('The "util.promisify.custom" argument must be of type Function');
                    return Object.defineProperty(t, x, {
                        value: t,
                        enumerable: !1,
                        writable: !1,
                        configurable: !0
                    }), t
                }

                function t() {
                    for (var t, r, n = new Promise(function(e, n) {
                            t = e, r = n
                        }), i = [], o = 0; o < arguments.length; o++) i.push(arguments[o]);
                    i.push(function(e, n) {
                        e ? r(e) : t(n)
                    });
                    try {
                        e.apply(this, i)
                    } catch (e) {
                        r(e)
                    }
                    return n
                }
                return Object.setPrototypeOf(t, Object.getPrototypeOf(e)), x && Object.defineProperty(t, x, {
                    value: t,
                    enumerable: !1,
                    writable: !1,
                    configurable: !0
                }), Object.defineProperties(t, i(e))
            }, t.promisify.custom = x, t.callbackify = function(e) {
                if ("function" != typeof e) throw TypeError('The "original" argument must be of type Function');

                function t() {
                    for (var t = [], r = 0; r < arguments.length; r++) t.push(arguments[r]);
                    var i = t.pop();
                    if ("function" != typeof i) throw TypeError("The last argument must be of type Function");
                    var o = this,
                        s = function() {
                            return i.apply(o, arguments)
                        };
                    e.apply(this, t).then(function(e) {
                        n.nextTick(s.bind(null, null, e))
                    }, function(e) {
                        n.nextTick(R.bind(null, e, s))
                    })
                }
                return Object.setPrototypeOf(t, Object.getPrototypeOf(e)), Object.defineProperties(t, i(e)), t
            }
        },
        1791: function(e, t, r) {
            "use strict";
            var n = r(2403).Buffer;

            function i(e) {
                if (e < 0 || e > 9007199254740991 || e % 1 != 0) throw RangeError("value out of range")
            }

            function o(e, t, r) {
                if (i(e), t || (t = n.allocUnsafe(a(e))), !n.isBuffer(t)) throw TypeError("buffer must be a Buffer instance");
                return r || (r = 0), e < 253 ? (t.writeUInt8(e, r), o.bytes = 1) : e <= 65535 ? (t.writeUInt8(253, r), t.writeUInt16LE(e, r + 1), o.bytes = 3) : e <= 4294967295 ? (t.writeUInt8(254, r), t.writeUInt32LE(e, r + 1), o.bytes = 5) : (t.writeUInt8(255, r), t.writeUInt32LE(e >>> 0, r + 1), t.writeUInt32LE(e / 4294967296 | 0, r + 5), o.bytes = 9), t
            }

            function s(e, t) {
                if (!n.isBuffer(e)) throw TypeError("buffer must be a Buffer instance");
                t || (t = 0);
                var r = e.readUInt8(t);
                if (r < 253) return s.bytes = 1, r;
                if (253 === r) return s.bytes = 3, e.readUInt16LE(t + 1);
                if (254 === r) return s.bytes = 5, e.readUInt32LE(t + 1);
                s.bytes = 9;
                var o = e.readUInt32LE(t + 1),
                    a = 4294967296 * e.readUInt32LE(t + 5) + o;
                return i(a), a
            }

            function a(e) {
                return i(e), e < 253 ? 1 : e <= 65535 ? 3 : e <= 4294967295 ? 5 : 9
            }
            e.exports = {
                encode: o,
                decode: s,
                encodingLength: a
            }
        },
        22583: function(e, t, r) {
            "use strict";
            var n = r(6721),
                i = r(74250),
                o = r(8144),
                s = r(87863),
                a = o("Object.prototype.toString"),
                u = r(8238)(),
                l = "undefined" == typeof globalThis ? r.g : globalThis,
                f = i(),
                c = o("String.prototype.slice"),
                h = {},
                p = Object.getPrototypeOf;
            u && s && p && n(f, function(e) {
                if ("function" == typeof l[e]) {
                    var t = new l[e];
                    if (Symbol.toStringTag in t) {
                        var r = p(t),
                            n = s(r, Symbol.toStringTag);
                        n || (n = s(p(r), Symbol.toStringTag)), h[e] = n.get
                    }
                }
            });
            var d = function(e) {
                    var t = !1;
                    return n(h, function(r, n) {
                        if (!t) try {
                            var i = r.call(e);
                            i === n && (t = i)
                        } catch (e) {}
                    }), t
                },
                y = r(20932);
            e.exports = function(e) {
                return !!y(e) && (u && Symbol.toStringTag in e ? d(e) : c(a(e), 8, -1))
            }
        },
        74250: function(e, t, r) {
            "use strict";
            var n = ["BigInt64Array", "BigUint64Array", "Float32Array", "Float64Array", "Int16Array", "Int32Array", "Int8Array", "Uint16Array", "Uint32Array", "Uint8Array", "Uint8ClampedArray"],
                i = "undefined" == typeof globalThis ? r.g : globalThis;
            e.exports = function() {
                for (var e = [], t = 0; t < n.length; t++) "function" == typeof i[n[t]] && (e[e.length] = n[t]);
                return e
            }
        },
        61562: function(e, t, r) {
            "use strict";
            r.d(t, {
                OP: function() {
                    return a
                },
                JL: function() {
                    return u
                },
                YW: function() {
                    return nE
                },
                Sq: function() {
                    return ni
                }
            });
            var n, i, o, s, a, u, l = {};

            function f(e) {
                if (!Number.isSafeInteger(e) || e < 0) throw Error(`Wrong positive integer: ${e}`)
            }

            function c(e, ...t) {
                if (!(e instanceof Uint8Array)) throw TypeError("Expected Uint8Array");
                if (t.length > 0 && !t.includes(e.length)) throw TypeError(`Expected Uint8Array of length ${t}, not of length=${e.length}`)
            }
            r.r(l), r.d(l, {
                bitGet: function() {
                    return X
                },
                bitLen: function() {
                    return z
                },
                bitMask: function() {
                    return J
                },
                bitSet: function() {
                    return Y
                },
                bytesToHex: function() {
                    return C
                },
                bytesToNumberBE: function() {
                    return D
                },
                bytesToNumberLE: function() {
                    return M
                },
                concatBytes: function() {
                    return $
                },
                createHmacDrbg: function() {
                    return ee
                },
                ensureBytes: function() {
                    return K
                },
                equalBytes: function() {
                    return q
                },
                hexToBytes: function() {
                    return j
                },
                hexToNumber: function() {
                    return H
                },
                numberToBytesBE: function() {
                    return F
                },
                numberToBytesLE: function() {
                    return W
                },
                numberToHexUnpadded: function() {
                    return L
                },
                numberToVarBytesBE: function() {
                    return V
                },
                utf8ToBytes: function() {
                    return G
                },
                validateObject: function() {
                    return er
                }
            });
            var h = {
                number: f,
                bool: function(e) {
                    if ("boolean" != typeof e) throw Error(`Expected boolean, not ${e}`)
                },
                bytes: c,
                hash: function(e) {
                    if ("function" != typeof e || "function" != typeof e.create) throw Error("Hash should be wrapped by utils.wrapConstructor");
                    f(e.outputLen), f(e.blockLen)
                },
                exists: function(e, t = !0) {
                    if (e.destroyed) throw Error("Hash instance has been destroyed");
                    if (t && e.finished) throw Error("Hash#digest() has already been called")
                },
                output: function(e, t) {
                    c(e);
                    let r = t.outputLen;
                    if (e.length < r) throw Error(`digestInto() expects output buffer of length at least ${r}`)
                }
            };
            let p = "object" == typeof globalThis && "crypto" in globalThis ? globalThis.crypto : void 0,
                d = e => new DataView(e.buffer, e.byteOffset, e.byteLength),
                y = (e, t) => e << 32 - t | e >>> t,
                g = 68 === new Uint8Array(new Uint32Array([287454020]).buffer)[0];
            if (!g) throw Error("Non little-endian hardware is not supported");

            function b(e) {
                if ("string" == typeof e && (e = function(e) {
                        if ("string" != typeof e) throw TypeError(`utf8ToBytes expected string, got ${typeof e}`);
                        return new TextEncoder().encode(e)
                    }(e)), !(e instanceof Uint8Array)) throw TypeError(`Expected input type is Uint8Array (got ${typeof e})`);
                return e
            }
            Array.from({
                length: 256
            }, (e, t) => t.toString(16).padStart(2, "0"));
            class m {
                clone() {
                    return this._cloneInto()
                }
            }

            function w(e) {
                let t = t => e().update(b(t)).digest(),
                    r = e();
                return t.outputLen = r.outputLen, t.blockLen = r.blockLen, t.create = () => e(), t
            }

            function E(e = 32) {
                if (p && "function" == typeof p.getRandomValues) return p.getRandomValues(new Uint8Array(e));
                throw Error("crypto.getRandomValues must be defined")
            }
            class S extends m {
                constructor(e, t, r, n) {
                    super(), this.blockLen = e, this.outputLen = t, this.padOffset = r, this.isLE = n, this.finished = !1, this.length = 0, this.pos = 0, this.destroyed = !1, this.buffer = new Uint8Array(e), this.view = d(this.buffer)
                }
                update(e) {
                    h.exists(this);
                    let {
                        view: t,
                        buffer: r,
                        blockLen: n
                    } = this;
                    e = b(e);
                    let i = e.length;
                    for (let o = 0; o < i;) {
                        let s = Math.min(n - this.pos, i - o);
                        if (s === n) {
                            let t = d(e);
                            for (; n <= i - o; o += n) this.process(t, o);
                            continue
                        }
                        r.set(e.subarray(o, o + s), this.pos), this.pos += s, o += s, this.pos === n && (this.process(t, 0), this.pos = 0)
                    }
                    return this.length += e.length, this.roundClean(), this
                }
                digestInto(e) {
                    h.exists(this), h.output(e, this), this.finished = !0;
                    let {
                        buffer: t,
                        view: r,
                        blockLen: n,
                        isLE: i
                    } = this, {
                        pos: o
                    } = this;
                    t[o++] = 128, this.buffer.subarray(o).fill(0), this.padOffset > n - o && (this.process(r, 0), o = 0);
                    for (let e = o; e < n; e++) t[e] = 0;
                    ! function(e, t, r, n) {
                        if ("function" == typeof e.setBigUint64) return e.setBigUint64(t, r, n);
                        let i = BigInt(32),
                            o = BigInt(4294967295),
                            s = Number(r >> i & o),
                            a = Number(r & o),
                            u = n ? 4 : 0,
                            l = n ? 0 : 4;
                        e.setUint32(t + u, s, n), e.setUint32(t + l, a, n)
                    }(r, n - 8, BigInt(8 * this.length), i), this.process(r, 0);
                    let s = d(e),
                        a = this.outputLen;
                    if (a % 4) throw Error("_sha2: outputLen should be aligned to 32bit");
                    let u = a / 4,
                        l = this.get();
                    if (u > l.length) throw Error("_sha2: outputLen bigger than state");
                    for (let e = 0; e < u; e++) s.setUint32(4 * e, l[e], i)
                }
                digest() {
                    let {
                        buffer: e,
                        outputLen: t
                    } = this;
                    this.digestInto(e);
                    let r = e.slice(0, t);
                    return this.destroy(), r
                }
                _cloneInto(e) {
                    e || (e = new this.constructor), e.set(...this.get());
                    let {
                        blockLen: t,
                        buffer: r,
                        length: n,
                        finished: i,
                        destroyed: o,
                        pos: s
                    } = this;
                    return e.length = n, e.pos = s, e.finished = i, e.destroyed = o, n % t && e.buffer.set(r), e
                }
            }
            let v = (e, t, r) => e & t ^ ~e & r,
                _ = (e, t, r) => e & t ^ e & r ^ t & r,
                T = new Uint32Array([1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298]),
                A = new Uint32Array([1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225]),
                O = new Uint32Array(64);
            class I extends S {
                constructor() {
                    super(64, 32, 8, !1), this.A = 0 | A[0], this.B = 0 | A[1], this.C = 0 | A[2], this.D = 0 | A[3], this.E = 0 | A[4], this.F = 0 | A[5], this.G = 0 | A[6], this.H = 0 | A[7]
                }
                get() {
                    let {
                        A: e,
                        B: t,
                        C: r,
                        D: n,
                        E: i,
                        F: o,
                        G: s,
                        H: a
                    } = this;
                    return [e, t, r, n, i, o, s, a]
                }
                set(e, t, r, n, i, o, s, a) {
                    this.A = 0 | e, this.B = 0 | t, this.C = 0 | r, this.D = 0 | n, this.E = 0 | i, this.F = 0 | o, this.G = 0 | s, this.H = 0 | a
                }
                process(e, t) {
                    for (let r = 0; r < 16; r++, t += 4) O[r] = e.getUint32(t, !1);
                    for (let e = 16; e < 64; e++) {
                        let t = O[e - 15],
                            r = O[e - 2],
                            n = y(t, 7) ^ y(t, 18) ^ t >>> 3,
                            i = y(r, 17) ^ y(r, 19) ^ r >>> 10;
                        O[e] = i + O[e - 7] + n + O[e - 16] | 0
                    }
                    let {
                        A: r,
                        B: n,
                        C: i,
                        D: o,
                        E: s,
                        F: a,
                        G: u,
                        H: l
                    } = this;
                    for (let e = 0; e < 64; e++) {
                        let t = y(s, 6) ^ y(s, 11) ^ y(s, 25),
                            f = l + t + v(s, a, u) + T[e] + O[e] | 0,
                            c = y(r, 2) ^ y(r, 13) ^ y(r, 22),
                            h = c + _(r, n, i) | 0;
                        l = u, u = a, a = s, s = o + f | 0, o = i, i = n, n = r, r = f + h | 0
                    }
                    r = r + this.A | 0, n = n + this.B | 0, i = i + this.C | 0, o = o + this.D | 0, s = s + this.E | 0, a = a + this.F | 0, u = u + this.G | 0, l = l + this.H | 0, this.set(r, n, i, o, s, a, u, l)
                }
                roundClean() {
                    O.fill(0)
                }
                destroy() {
                    this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0)
                }
            }
            class P extends I {
                constructor() {
                    super(), this.A = -1056596264, this.B = 914150663, this.C = 812702999, this.D = -150054599, this.E = -4191439, this.F = 1750603025, this.G = 1694076839, this.H = -1090891868, this.outputLen = 28
                }
            }
            let k = w(() => new I);
            w(() => new P); /*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
            let x = BigInt(0),
                R = BigInt(1),
                B = BigInt(2),
                N = e => e instanceof Uint8Array,
                U = Array.from({
                    length: 256
                }, (e, t) => t.toString(16).padStart(2, "0"));

            function C(e) {
                if (!N(e)) throw Error("Uint8Array expected");
                let t = "";
                for (let r = 0; r < e.length; r++) t += U[e[r]];
                return t
            }

            function L(e) {
                let t = e.toString(16);
                return 1 & t.length ? `0${t}` : t
            }

            function H(e) {
                if ("string" != typeof e) throw Error("hex string expected, got " + typeof e);
                return BigInt("" === e ? "0" : `0x${e}`)
            }

            function j(e) {
                if ("string" != typeof e) throw Error("hex string expected, got " + typeof e);
                if (e.length % 2) throw Error("hex string is invalid: unpadded " + e.length);
                let t = new Uint8Array(e.length / 2);
                for (let r = 0; r < t.length; r++) {
                    let n = 2 * r,
                        i = e.slice(n, n + 2),
                        o = Number.parseInt(i, 16);
                    if (Number.isNaN(o) || o < 0) throw Error("invalid byte sequence");
                    t[r] = o
                }
                return t
            }

            function D(e) {
                return H(C(e))
            }

            function M(e) {
                if (!N(e)) throw Error("Uint8Array expected");
                return H(C(Uint8Array.from(e).reverse()))
            }
            let F = (e, t) => j(e.toString(16).padStart(2 * t, "0")),
                W = (e, t) => F(e, t).reverse(),
                V = e => j(L(e));

            function K(e, t, r) {
                let n;
                if ("string" == typeof t) try {
                        n = j(t)
                    } catch (r) {
                        throw Error(`${e} must be valid hex string, got "${t}". Cause: ${r}`)
                    } else if (N(t)) n = Uint8Array.from(t);
                    else throw Error(`${e} must be hex string or Uint8Array`);
                let i = n.length;
                if ("number" == typeof r && i !== r) throw Error(`${e} expected ${r} bytes, got ${i}`);
                return n
            }

            function $(...e) {
                let t = new Uint8Array(e.reduce((e, t) => e + t.length, 0)),
                    r = 0;
                return e.forEach(e => {
                    if (!N(e)) throw Error("Uint8Array expected");
                    t.set(e, r), r += e.length
                }), t
            }

            function q(e, t) {
                if (e.length !== t.length) return !1;
                for (let r = 0; r < e.length; r++)
                    if (e[r] !== t[r]) return !1;
                return !0
            }

            function G(e) {
                if ("string" != typeof e) throw Error(`utf8ToBytes expected string, got ${typeof e}`);
                return new TextEncoder().encode(e)
            }

            function z(e) {
                let t;
                for (t = 0; e > 0 n; e >>= R, t += 1);
                return t
            }
            let X = (e, t) => e >> BigInt(t) & 1 n,
                Y = (e, t, r) => e | (r ? R : x) << BigInt(t),
                J = e => (B << BigInt(e - 1)) - R,
                Z = e => new Uint8Array(e),
                Q = e => Uint8Array.from(e);

            function ee(e, t, r) {
                if ("number" != typeof e || e < 2) throw Error("hashLen must be a number");
                if ("number" != typeof t || t < 2) throw Error("qByteLen must be a number");
                if ("function" != typeof r) throw Error("hmacFn must be a function");
                let n = Z(e),
                    i = Z(e),
                    o = 0,
                    s = () => {
                        n.fill(1), i.fill(0), o = 0
                    },
                    a = (...e) => r(i, n, ...e),
                    u = (e = Z()) => {
                        i = a(Q([0]), e), n = a(), 0 !== e.length && (i = a(Q([1]), e), n = a())
                    },
                    l = () => {
                        if (o++ >= 1e3) throw Error("drbg: tried 1000 values");
                        let e = 0,
                            r = [];
                        for (; e < t;) {
                            n = a();
                            let t = n.slice();
                            r.push(t), e += n.length
                        }
                        return $(...r)
                    };
                return (e, t) => {
                    let r;
                    for (s(), u(e); !(r = t(l()));) u();
                    return s(), r
                }
            }
            let et = {
                bigint: e => "bigint" == typeof e,
                function: e => "function" == typeof e,
                boolean: e => "boolean" == typeof e,
                string: e => "string" == typeof e,
                isSafeInteger: e => Number.isSafeInteger(e),
                array: e => Array.isArray(e),
                field: (e, t) => t.Fp.isValid(e),
                hash: e => "function" == typeof e && Number.isSafeInteger(e.outputLen)
            };

            function er(e, t, r = {}) {
                let n = (t, r, n) => {
                    let i = et[r];
                    if ("function" != typeof i) throw Error(`Invalid validator "${r}", expected function`);
                    let o = e[t];
                    if ((!n || void 0 !== o) && !i(o, e)) throw Error(`Invalid param ${String(t)}=${o} (${typeof o}), expected ${r}`)
                };
                for (let [e, r] of Object.entries(t)) n(e, r, !1);
                for (let [e, t] of Object.entries(r)) n(e, t, !0);
                return e
            } /*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
            let en = BigInt(0),
                ei = BigInt(1),
                eo = BigInt(2),
                es = BigInt(3),
                ea = BigInt(4),
                eu = BigInt(5),
                el = BigInt(8);

            function ef(e, t) {
                let r = e % t;
                return r >= en ? r : t + r
            }

            function ec(e, t, r) {
                let n = e;
                for (; t-- > en;) n *= n, n %= r;
                return n
            }

            function eh(e, t) {
                if (e === en || t <= en) throw Error(`invert: expected positive integers, got n=${e} mod=${t}`);
                let r = ef(e, t),
                    n = t,
                    i = en,
                    o = ei,
                    s = ei,
                    a = en;
                for (; r !== en;) {
                    let e = n / r,
                        t = n % r,
                        u = i - s * e,
                        l = o - a * e;
                    n = r, r = t, i = s, o = a, s = u, a = l
                }
                let u = n;
                if (u !== ei) throw Error("invert: does not exist");
                return ef(i, t)
            }
            BigInt(9), BigInt(16);
            let ep = ["create", "isValid", "is0", "neg", "inv", "sqrt", "sqr", "eql", "add", "sub", "mul", "pow", "div", "addN", "subN", "mulN", "sqrN"];

            function ed(e) {
                let t = ep.reduce((e, t) => (e[t] = "function", e), {
                    ORDER: "bigint",
                    MASK: "bigint",
                    BYTES: "isSafeInteger",
                    BITS: "isSafeInteger"
                });
                return er(e, t)
            }

            function ey(e, t) {
                let r = void 0 !== t ? t : e.toString(2).length;
                return {
                    nBitLength: r,
                    nByteLength: Math.ceil(r / 8)
                }
            } /*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
            let eg = BigInt(0),
                eb = BigInt(1);

            function em(e) {
                return ed(e.Fp), er(e, {
                    n: "bigint",
                    h: "bigint",
                    Gx: "field",
                    Gy: "field"
                }, {
                    nBitLength: "isSafeInteger",
                    nByteLength: "isSafeInteger"
                }), Object.freeze({ ...ey(e.n, e.nBitLength),
                    ...e
                })
            }
            let {
                bytesToNumberBE: ew,
                hexToBytes: eE
            } = l, eS = {
                Err: class extends Error {
                    constructor(e = "") {
                        super(e)
                    }
                },
                _parseInt(e) {
                    let {
                        Err: t
                    } = eS;
                    if (e.length < 2 || 2 !== e[0]) throw new t("Invalid signature integer tag");
                    let r = e[1],
                        n = e.subarray(2, r + 2);
                    if (!r || n.length !== r) throw new t("Invalid signature integer: wrong length");
                    if (0 === n[0] && n[1] <= 127) throw new t("Invalid signature integer: trailing length");
                    return {
                        d: ew(n),
                        l: e.subarray(r + 2)
                    }
                },
                toSig(e) {
                    let {
                        Err: t
                    } = eS, r = "string" == typeof e ? eE(e) : e;
                    if (!(r instanceof Uint8Array)) throw Error("ui8a expected");
                    let n = r.length;
                    if (n < 2 || 48 != r[0]) throw new t("Invalid signature tag");
                    if (r[1] !== n - 2) throw new t("Invalid signature: incorrect length");
                    let {
                        d: i,
                        l: o
                    } = eS._parseInt(r.subarray(2)), {
                        d: s,
                        l: a
                    } = eS._parseInt(o);
                    if (a.length) throw new t("Invalid signature: left bytes after parsing");
                    return {
                        r: i,
                        s
                    }
                },
                hexFromSig(e) {
                    let t = e => Number.parseInt(e[0], 16) >= 8 ? "00" + e : e,
                        r = e => {
                            let t = e.toString(16);
                            return 1 & t.length ? `0${t}` : t
                        },
                        n = t(r(e.s)),
                        i = t(r(e.r)),
                        o = n.length / 2,
                        s = i.length / 2,
                        a = r(o),
                        u = r(s);
                    return `30${r(s+o+4)}02${u}${i}02${a}${n}`
                }
            }, ev = BigInt(0), e_ = BigInt(1), eT = D;

            function eA(e, t) {
                if (e < 0 || e >= 1 << 8 * t) throw Error(`bad I2OSP call: value=${e} length=${t}`);
                let r = Array.from({
                    length: t
                }).fill(0);
                for (let n = t - 1; n >= 0; n--) r[n] = 255 & e, e >>>= 8;
                return new Uint8Array(r)
            }

            function eO(e) {
                if (!(e instanceof Uint8Array)) throw Error("Uint8Array expected")
            }

            function eI(e) {
                if (!Number.isSafeInteger(e)) throw Error("number expected")
            }

            function eP(e, t, r) {
                let n;
                er(r, {
                    DST: "string",
                    p: "bigint",
                    m: "isSafeInteger",
                    k: "isSafeInteger",
                    hash: "hash"
                });
                let {
                    p: i,
                    k: o,
                    m: s,
                    hash: a,
                    expand: u,
                    DST: l
                } = r;
                eO(e), eI(t);
                let f = function(e) {
                        if (e instanceof Uint8Array) return e;
                        if ("string" == typeof e) return G(e);
                        throw Error("DST must be Uint8Array or string")
                    }(l),
                    c = i.toString(2).length,
                    h = Math.ceil((c + o) / 8),
                    p = t * s * h;
                if ("xmd" === u) n = function(e, t, r, n) {
                    eO(e), eO(t), eI(r), t.length > 255 && (t = n($(G("H2C-OVERSIZE-DST-"), t)));
                    let {
                        outputLen: i,
                        blockLen: o
                    } = n, s = Math.ceil(r / i);
                    if (s > 255) throw Error("Invalid xmd length");
                    let a = $(t, eA(t.length, 1)),
                        u = eA(0, o),
                        l = eA(r, 2),
                        f = Array(s),
                        c = n($(u, e, l, eA(0, 1), a));
                    f[0] = n($(c, eA(1, 1), a));
                    for (let e = 1; e <= s; e++) {
                        let t = [function(e, t) {
                            let r = new Uint8Array(e.length);
                            for (let n = 0; n < e.length; n++) r[n] = e[n] ^ t[n];
                            return r
                        }(c, f[e - 1]), eA(e + 1, 1), a];
                        f[e] = n($(...t))
                    }
                    let h = $(...f);
                    return h.slice(0, r)
                }(e, f, p, a);
                else if ("xof" === u) n = function(e, t, r, n, i) {
                    if (eO(e), eO(t), eI(r), t.length > 255 && (t = i.create({
                            dkLen: Math.ceil(2 * n / 8)
                        }).update(G("H2C-OVERSIZE-DST-")).update(t).digest()), r > 65535 || t.length > 255) throw Error("expand_message_xof: invalid lenInBytes");
                    return i.create({
                        dkLen: r
                    }).update(e).update(eA(r, 2)).update(t).update(eA(t.length, 1)).digest()
                }(e, f, p, o, a);
                else if (void 0 === u) n = e;
                else throw Error('expand must be "xmd", "xof" or undefined');
                let d = Array(t);
                for (let e = 0; e < t; e++) {
                    let t = Array(s);
                    for (let r = 0; r < s; r++) {
                        let o = h * (r + e * s),
                            a = n.subarray(o, o + h);
                        t[r] = ef(eT(a), i)
                    }
                    d[e] = t
                }
                return d
            }
            class ek extends m {
                constructor(e, t) {
                    super(), this.finished = !1, this.destroyed = !1, h.hash(e);
                    let r = b(t);
                    if (this.iHash = e.create(), "function" != typeof this.iHash.update) throw TypeError("Expected instance of class which extends utils.Hash");
                    this.blockLen = this.iHash.blockLen, this.outputLen = this.iHash.outputLen;
                    let n = this.blockLen,
                        i = new Uint8Array(n);
                    i.set(r.length > n ? e.create().update(r).digest() : r);
                    for (let e = 0; e < i.length; e++) i[e] ^= 54;
                    this.iHash.update(i), this.oHash = e.create();
                    for (let e = 0; e < i.length; e++) i[e] ^= 106;
                    this.oHash.update(i), i.fill(0)
                }
                update(e) {
                    return h.exists(this), this.iHash.update(e), this
                }
                digestInto(e) {
                    h.exists(this), h.bytes(e, this.outputLen), this.finished = !0, this.iHash.digestInto(e), this.oHash.update(e), this.oHash.digestInto(e), this.destroy()
                }
                digest() {
                    let e = new Uint8Array(this.oHash.outputLen);
                    return this.digestInto(e), e
                }
                _cloneInto(e) {
                    e || (e = Object.create(Object.getPrototypeOf(this), {}));
                    let {
                        oHash: t,
                        iHash: r,
                        finished: n,
                        destroyed: i,
                        blockLen: o,
                        outputLen: s
                    } = this;
                    return e.finished = n, e.destroyed = i, e.blockLen = o, e.outputLen = s, e.oHash = t._cloneInto(e.oHash), e.iHash = r._cloneInto(e.iHash), e
                }
                destroy() {
                    this.destroyed = !0, this.oHash.destroy(), this.iHash.destroy()
                }
            }
            let ex = (e, t, r) => new ek(e, t).update(r).digest();
            ex.create = (e, t) => new ek(e, t); /*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
            let eR = BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f"),
                eB = BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"),
                eN = BigInt(1),
                eU = BigInt(2),
                eC = (e, t) => (e + t / eU) / t;

            function eL(e) {
                let t = BigInt(3),
                    r = BigInt(6),
                    n = BigInt(11),
                    i = BigInt(22),
                    o = BigInt(23),
                    s = BigInt(44),
                    a = BigInt(88),
                    u = e * e * e % eR,
                    l = u * u * e % eR,
                    f = ec(l, t, eR) * l % eR,
                    c = ec(f, t, eR) * l % eR,
                    h = ec(c, eU, eR) * u % eR,
                    p = ec(h, n, eR) * h % eR,
                    d = ec(p, i, eR) * p % eR,
                    y = ec(d, s, eR) * d % eR,
                    g = ec(y, a, eR) * y % eR,
                    b = ec(g, s, eR) * d % eR,
                    m = ec(b, t, eR) * l % eR,
                    w = ec(m, o, eR) * p % eR,
                    E = ec(w, r, eR) * u % eR,
                    S = ec(E, eU, eR);
                if (!eH.eql(eH.sqr(S), e)) throw Error("Cannot find square root");
                return S
            }
            let eH = function(e, t, r = !1, n = {}) {
                    if (e <= en) throw Error(`Expected Fp ORDER > 0, got ${e}`);
                    let {
                        nBitLength: i,
                        nByteLength: o
                    } = ey(e, t);
                    if (o > 2048) throw Error("Field lengths over 2048 bytes are not supported");
                    let s = function(e) {
                            if (e % ea === es) {
                                let t = (e + ei) / ea;
                                return function(e, r) {
                                    let n = e.pow(r, t);
                                    if (!e.eql(e.sqr(n), r)) throw Error("Cannot find square root");
                                    return n
                                }
                            }
                            if (e % el === eu) {
                                let t = (e - eu) / el;
                                return function(e, r) {
                                    let n = e.mul(r, eo),
                                        i = e.pow(n, t),
                                        o = e.mul(r, i),
                                        s = e.mul(e.mul(o, eo), i),
                                        a = e.mul(o, e.sub(s, e.ONE));
                                    if (!e.eql(e.sqr(a), r)) throw Error("Cannot find square root");
                                    return a
                                }
                            }
                            return function(e) {
                                let t, r, n;
                                let i = (e - ei) / eo;
                                for (t = e - ei, r = 0; t % eo === en; t /= eo, r++);
                                for (n = eo; n < e && function(e, t, r) {
                                        if (r <= en || t < en) throw Error("Expected power/modulo > 0");
                                        if (r === ei) return en;
                                        let n = ei;
                                        for (; t > en;) t & ei && (n = n * e % r), e = e * e % r, t >>= ei;
                                        return n
                                    }(n, i, e) !== e - ei; n++);
                                if (1 === r) {
                                    let t = (e + ei) / ea;
                                    return function(e, r) {
                                        let n = e.pow(r, t);
                                        if (!e.eql(e.sqr(n), r)) throw Error("Cannot find square root");
                                        return n
                                    }
                                }
                                let o = (t + ei) / eo;
                                return function(e, s) {
                                    if (e.pow(s, i) === e.neg(e.ONE)) throw Error("Cannot find square root");
                                    let a = r,
                                        u = e.pow(e.mul(e.ONE, n), t),
                                        l = e.pow(s, o),
                                        f = e.pow(s, t);
                                    for (; !e.eql(f, e.ONE);) {
                                        if (e.eql(f, e.ZERO)) return e.ZERO;
                                        let t = 1;
                                        for (let r = e.sqr(f); t < a && !e.eql(r, e.ONE); t++) r = e.sqr(r);
                                        let r = e.pow(u, ei << BigInt(a - t - 1));
                                        u = e.sqr(r), l = e.mul(l, r), f = e.mul(f, u), a = t
                                    }
                                    return l
                                }
                            }(e)
                        }(e),
                        a = Object.freeze({
                            ORDER: e,
                            BITS: i,
                            BYTES: o,
                            MASK: J(i),
                            ZERO: en,
                            ONE: ei,
                            create: t => ef(t, e),
                            isValid: t => {
                                if ("bigint" != typeof t) throw Error(`Invalid field element: expected bigint, got ${typeof t}`);
                                return en <= t && t < e
                            },
                            is0: e => e === en,
                            isOdd: e => (e & ei) === ei,
                            neg: t => ef(-t, e),
                            eql: (e, t) => e === t,
                            sqr: t => ef(t * t, e),
                            add: (t, r) => ef(t + r, e),
                            sub: (t, r) => ef(t - r, e),
                            mul: (t, r) => ef(t * r, e),
                            pow: (e, t) => (function(e, t, r) {
                                if (r < en) throw Error("Expected power > 0");
                                if (r === en) return e.ONE;
                                if (r === ei) return t;
                                let n = e.ONE,
                                    i = t;
                                for (; r > en;) r & ei && (n = e.mul(n, i)), i = e.sqr(i), r >>= 1 n;
                                return n
                            })(a, e, t),
                            div: (t, r) => ef(t * eh(r, e), e),
                            sqrN: e => e * e,
                            addN: (e, t) => e + t,
                            subN: (e, t) => e - t,
                            mulN: (e, t) => e * t,
                            inv: t => eh(t, e),
                            sqrt: n.sqrt || (e => s(a, e)),
                            invertBatch: e => (function(e, t) {
                                let r = Array(t.length),
                                    n = t.reduce((t, n, i) => e.is0(n) ? t : (r[i] = t, e.mul(t, n)), e.ONE),
                                    i = e.inv(n);
                                return t.reduceRight((t, n, i) => e.is0(n) ? t : (r[i] = e.mul(t, r[i]), e.mul(t, n)), i), r
                            })(a, e),
                            cmov: (e, t, r) => r ? t : e,
                            toBytes: e => r ? W(e, o) : F(e, o),
                            fromBytes: e => {
                                if (e.length !== o) throw Error(`Fp.fromBytes: expected ${o}, got ${e.length}`);
                                return r ? M(e) : D(e)
                            }
                        });
                    return Object.freeze(a)
                }(eR, void 0, void 0, {
                    sqrt: eL
                }),
                ej = function(e, t) {
                    let r = t => (function(e) {
                        let t = function(e) {
                                let t = em(e);
                                return er(t, {
                                    hash: "hash",
                                    hmac: "function",
                                    randomBytes: "function"
                                }, {
                                    bits2int: "function",
                                    bits2int_modN: "function",
                                    lowS: "boolean"
                                }), Object.freeze({
                                    lowS: !0,
                                    ...t
                                })
                            }(e),
                            r = t.n,
                            n = t.Fp,
                            i = n.BYTES + 1,
                            o = 2 * n.BYTES + 1;

                        function s(e) {
                            return ef(e, r)
                        }
                        let {
                            ProjectivePoint: a,
                            normPrivateKeyToScalar: u,
                            weierstrassEquation: l,
                            isWithinCurveOrder: f
                        } = function(e) {
                            let t = /*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */ function(e) {
                                    let t = em(e);
                                    er(t, {
                                        a: "field",
                                        b: "field",
                                        fromBytes: "function",
                                        toBytes: "function"
                                    }, {
                                        allowedPrivateKeyLengths: "array",
                                        wrapPrivateKey: "boolean",
                                        isTorsionFree: "function",
                                        clearCofactor: "function",
                                        allowInfinityPoint: "boolean"
                                    });
                                    let {
                                        endo: r,
                                        Fp: n,
                                        a: i
                                    } = t;
                                    if (r) {
                                        if (!n.eql(i, n.ZERO)) throw Error("Endomorphism can only be defined for Koblitz curves that have a=0");
                                        if ("object" != typeof r || "bigint" != typeof r.beta || "function" != typeof r.splitScalar) throw Error("Expected endomorphism with beta: bigint and splitScalar: function")
                                    }
                                    return Object.freeze({ ...t
                                    })
                                }(e),
                                {
                                    Fp: r
                                } = t;

                            function n(e) {
                                let {
                                    a: n,
                                    b: i
                                } = t, o = r.sqr(e), s = r.mul(o, e);
                                return r.add(r.add(s, r.mul(e, n)), i)
                            }

                            function i(e) {
                                return "bigint" == typeof e && ev < e && e < t.n
                            }

                            function o(e) {
                                if (!i(e)) throw Error("Expected valid bigint: 0 < bigint < curve.n")
                            }

                            function s(e) {
                                let r;
                                let {
                                    allowedPrivateKeyLengths: n,
                                    nByteLength: i,
                                    wrapPrivateKey: s,
                                    n: a
                                } = t;
                                if (n && "bigint" != typeof e) {
                                    if (e instanceof Uint8Array && (e = C(e)), "string" != typeof e || !n.includes(e.length)) throw Error("Invalid key");
                                    e = e.padStart(2 * i, "0")
                                }
                                try {
                                    r = "bigint" == typeof e ? e : D(K("private key", e, i))
                                } catch (t) {
                                    throw Error(`private key must be ${i} bytes, hex or bigint, not ${typeof e}`)
                                }
                                return s && (r = ef(r, a)), o(r), r
                            }
                            let a = new Map;

                            function u(e) {
                                if (!(e instanceof l)) throw Error("ProjectivePoint expected")
                            }
                            class l {
                                constructor(e, t, n) {
                                    if (this.px = e, this.py = t, this.pz = n, null == e || !r.isValid(e)) throw Error("x required");
                                    if (null == t || !r.isValid(t)) throw Error("y required");
                                    if (null == n || !r.isValid(n)) throw Error("z required")
                                }
                                static fromAffine(e) {
                                    let {
                                        x: t,
                                        y: n
                                    } = e || {};
                                    if (!e || !r.isValid(t) || !r.isValid(n)) throw Error("invalid affine point");
                                    if (e instanceof l) throw Error("projective point not allowed");
                                    let i = e => r.eql(e, r.ZERO);
                                    return i(t) && i(n) ? l.ZERO : new l(t, n, r.ONE)
                                }
                                get x() {
                                    return this.toAffine().x
                                }
                                get y() {
                                    return this.toAffine().y
                                }
                                static normalizeZ(e) {
                                    let t = r.invertBatch(e.map(e => e.pz));
                                    return e.map((e, r) => e.toAffine(t[r])).map(l.fromAffine)
                                }
                                static fromHex(e) {
                                    let r = l.fromAffine(t.fromBytes(K("pointHex", e)));
                                    return r.assertValidity(), r
                                }
                                static fromPrivateKey(e) {
                                    return l.BASE.multiply(s(e))
                                }
                                _setWindowSize(e) {
                                    this._WINDOW_SIZE = e, a.delete(this)
                                }
                                assertValidity() {
                                    if (this.is0()) {
                                        if (t.allowInfinityPoint) return;
                                        throw Error("bad point: ZERO")
                                    }
                                    let {
                                        x: e,
                                        y: i
                                    } = this.toAffine();
                                    if (!r.isValid(e) || !r.isValid(i)) throw Error("bad point: x or y not FE");
                                    let o = r.sqr(i),
                                        s = n(e);
                                    if (!r.eql(o, s)) throw Error("bad point: equation left != right");
                                    if (!this.isTorsionFree()) throw Error("bad point: not in prime-order subgroup")
                                }
                                hasEvenY() {
                                    let {
                                        y: e
                                    } = this.toAffine();
                                    if (r.isOdd) return !r.isOdd(e);
                                    throw Error("Field doesn't support isOdd")
                                }
                                equals(e) {
                                    u(e);
                                    let {
                                        px: t,
                                        py: n,
                                        pz: i
                                    } = this, {
                                        px: o,
                                        py: s,
                                        pz: a
                                    } = e, l = r.eql(r.mul(t, a), r.mul(o, i)), f = r.eql(r.mul(n, a), r.mul(s, i));
                                    return l && f
                                }
                                negate() {
                                    return new l(this.px, r.neg(this.py), this.pz)
                                }
                                double() {
                                    let {
                                        a: e,
                                        b: n
                                    } = t, i = r.mul(n, 3 n), {
                                        px: o,
                                        py: s,
                                        pz: a
                                    } = this, u = r.ZERO, f = r.ZERO, c = r.ZERO, h = r.mul(o, o), p = r.mul(s, s), d = r.mul(a, a), y = r.mul(o, s);
                                    return y = r.add(y, y), c = r.mul(o, a), c = r.add(c, c), u = r.mul(e, c), f = r.mul(i, d), f = r.add(u, f), u = r.sub(p, f), f = r.add(p, f), f = r.mul(u, f), u = r.mul(y, u), c = r.mul(i, c), d = r.mul(e, d), y = r.sub(h, d), y = r.mul(e, y), y = r.add(y, c), c = r.add(h, h), h = r.add(c, h), h = r.add(h, d), h = r.mul(h, y), f = r.add(f, h), d = r.mul(s, a), d = r.add(d, d), h = r.mul(d, y), u = r.sub(u, h), c = r.mul(d, p), c = r.add(c, c), c = r.add(c, c), new l(u, f, c)
                                }
                                add(e) {
                                    u(e);
                                    let {
                                        px: n,
                                        py: i,
                                        pz: o
                                    } = this, {
                                        px: s,
                                        py: a,
                                        pz: f
                                    } = e, c = r.ZERO, h = r.ZERO, p = r.ZERO, d = t.a, y = r.mul(t.b, 3 n), g = r.mul(n, s), b = r.mul(i, a), m = r.mul(o, f), w = r.add(n, i), E = r.add(s, a);
                                    w = r.mul(w, E), E = r.add(g, b), w = r.sub(w, E), E = r.add(n, o);
                                    let S = r.add(s, f);
                                    return E = r.mul(E, S), S = r.add(g, m), E = r.sub(E, S), S = r.add(i, o), c = r.add(a, f), S = r.mul(S, c), c = r.add(b, m), S = r.sub(S, c), p = r.mul(d, E), c = r.mul(y, m), p = r.add(c, p), c = r.sub(b, p), p = r.add(b, p), h = r.mul(c, p), b = r.add(g, g), b = r.add(b, g), m = r.mul(d, m), E = r.mul(y, E), b = r.add(b, m), m = r.sub(g, m), m = r.mul(d, m), E = r.add(E, m), g = r.mul(b, E), h = r.add(h, g), g = r.mul(S, E), c = r.mul(w, c), c = r.sub(c, g), g = r.mul(w, b), p = r.mul(S, p), p = r.add(p, g), new l(c, h, p)
                                }
                                subtract(e) {
                                    return this.add(e.negate())
                                }
                                is0() {
                                    return this.equals(l.ZERO)
                                }
                                wNAF(e) {
                                    return c.wNAFCached(this, a, e, e => {
                                        let t = r.invertBatch(e.map(e => e.pz));
                                        return e.map((e, r) => e.toAffine(t[r])).map(l.fromAffine)
                                    })
                                }
                                multiplyUnsafe(e) {
                                    let n = l.ZERO;
                                    if (e === ev) return n;
                                    if (o(e), e === e_) return this;
                                    let {
                                        endo: i
                                    } = t;
                                    if (!i) return c.unsafeLadder(this, e);
                                    let {
                                        k1neg: s,
                                        k1: a,
                                        k2neg: u,
                                        k2: f
                                    } = i.splitScalar(e), h = n, p = n, d = this;
                                    for (; a > ev || f > ev;) a & e_ && (h = h.add(d)), f & e_ && (p = p.add(d)), d = d.double(), a >>= e_, f >>= e_;
                                    return s && (h = h.negate()), u && (p = p.negate()), p = new l(r.mul(p.px, i.beta), p.py, p.pz), h.add(p)
                                }
                                multiply(e) {
                                    let n, i;
                                    o(e);
                                    let {
                                        endo: s
                                    } = t;
                                    if (s) {
                                        let {
                                            k1neg: t,
                                            k1: o,
                                            k2neg: a,
                                            k2: u
                                        } = s.splitScalar(e), {
                                            p: f,
                                            f: h
                                        } = this.wNAF(o), {
                                            p: p,
                                            f: d
                                        } = this.wNAF(u);
                                        f = c.constTimeNegate(t, f), p = c.constTimeNegate(a, p), p = new l(r.mul(p.px, s.beta), p.py, p.pz), n = f.add(p), i = h.add(d)
                                    } else {
                                        let {
                                            p: t,
                                            f: r
                                        } = this.wNAF(e);
                                        n = t, i = r
                                    }
                                    return l.normalizeZ([n, i])[0]
                                }
                                multiplyAndAddUnsafe(e, t, r) {
                                    let n = l.BASE,
                                        i = (e, t) => t !== ev && t !== e_ && e.equals(n) ? e.multiply(t) : e.multiplyUnsafe(t),
                                        o = i(this, t).add(i(e, r));
                                    return o.is0() ? void 0 : o
                                }
                                toAffine(e) {
                                    let {
                                        px: t,
                                        py: n,
                                        pz: i
                                    } = this, o = this.is0();
                                    null == e && (e = o ? r.ONE : r.inv(i));
                                    let s = r.mul(t, e),
                                        a = r.mul(n, e),
                                        u = r.mul(i, e);
                                    if (o) return {
                                        x: r.ZERO,
                                        y: r.ZERO
                                    };
                                    if (!r.eql(u, r.ONE)) throw Error("invZ was invalid");
                                    return {
                                        x: s,
                                        y: a
                                    }
                                }
                                isTorsionFree() {
                                    let {
                                        h: e,
                                        isTorsionFree: r
                                    } = t;
                                    if (e === e_) return !0;
                                    if (r) return r(l, this);
                                    throw Error("isTorsionFree() has not been declared for the elliptic curve")
                                }
                                clearCofactor() {
                                    let {
                                        h: e,
                                        clearCofactor: r
                                    } = t;
                                    return e === e_ ? this : r ? r(l, this) : this.multiplyUnsafe(t.h)
                                }
                                toRawBytes(e = !0) {
                                    return this.assertValidity(), t.toBytes(l, this, e)
                                }
                                toHex(e = !0) {
                                    return C(this.toRawBytes(e))
                                }
                            }
                            l.BASE = new l(t.Gx, t.Gy, r.ONE), l.ZERO = new l(r.ZERO, r.ONE, r.ZERO);
                            let f = t.nBitLength,
                                c = function(e, t) {
                                    let r = (e, t) => {
                                            let r = t.negate();
                                            return e ? r : t
                                        },
                                        n = e => ({
                                            windows: Math.ceil(t / e) + 1,
                                            windowSize: 2 ** (e - 1)
                                        });
                                    return {
                                        constTimeNegate: r,
                                        unsafeLadder(t, r) {
                                            let n = e.ZERO,
                                                i = t;
                                            for (; r > eg;) r & eb && (n = n.add(i)), i = i.double(), r >>= eb;
                                            return n
                                        },
                                        precomputeWindow(e, t) {
                                            let {
                                                windows: r,
                                                windowSize: i
                                            } = n(t), o = [], s = e, a = s;
                                            for (let e = 0; e < r; e++) {
                                                a = s, o.push(a);
                                                for (let e = 1; e < i; e++) a = a.add(s), o.push(a);
                                                s = a.double()
                                            }
                                            return o
                                        },
                                        wNAF(t, i, o) {
                                            let {
                                                windows: s,
                                                windowSize: a
                                            } = n(t), u = e.ZERO, l = e.BASE, f = BigInt(2 ** t - 1), c = 2 ** t, h = BigInt(t);
                                            for (let e = 0; e < s; e++) {
                                                let t = e * a,
                                                    n = Number(o & f);
                                                o >>= h, n > a && (n -= c, o += eb);
                                                let s = t + Math.abs(n) - 1,
                                                    p = e % 2 != 0,
                                                    d = n < 0;
                                                0 === n ? l = l.add(r(p, i[t])) : u = u.add(r(d, i[s]))
                                            }
                                            return {
                                                p: u,
                                                f: l
                                            }
                                        },
                                        wNAFCached(e, t, r, n) {
                                            let i = e._WINDOW_SIZE || 1,
                                                o = t.get(e);
                                            return o || (o = this.precomputeWindow(e, i), 1 !== i && t.set(e, n(o))), this.wNAF(i, o, r)
                                        }
                                    }
                                }(l, t.endo ? Math.ceil(f / 2) : f);
                            return {
                                ProjectivePoint: l,
                                normPrivateKeyToScalar: s,
                                weierstrassEquation: n,
                                isWithinCurveOrder: i
                            }
                        }({ ...t,
                            toBytes(e, t, r) {
                                let i = t.toAffine(),
                                    o = n.toBytes(i.x),
                                    s = $;
                                return r ? s(Uint8Array.from([t.hasEvenY() ? 2 : 3]), o) : s(Uint8Array.from([4]), o, n.toBytes(i.y))
                            },
                            fromBytes(e) {
                                let t = e.length,
                                    r = e[0],
                                    s = e.subarray(1);
                                if (t === i && (2 === r || 3 === r)) {
                                    let e = D(s);
                                    if (!(ev < e && e < n.ORDER)) throw Error("Point is not on curve");
                                    let t = l(e),
                                        i = n.sqrt(t),
                                        o = (i & e_) === e_;
                                    return (1 & r) == 1 !== o && (i = n.neg(i)), {
                                        x: e,
                                        y: i
                                    }
                                }
                                if (t === o && 4 === r) {
                                    let e = n.fromBytes(s.subarray(0, n.BYTES)),
                                        t = n.fromBytes(s.subarray(n.BYTES, 2 * n.BYTES));
                                    return {
                                        x: e,
                                        y: t
                                    }
                                }
                                throw Error(`Point of length ${t} was invalid. Expected ${i} compressed bytes or ${o} uncompressed bytes`)
                            }
                        }), c = e => C(F(e, t.nByteLength));

                        function h(e) {
                            let t = r >> e_;
                            return e > t
                        }
                        let p = (e, t, r) => D(e.slice(t, r));
                        class d {
                            constructor(e, t, r) {
                                this.r = e, this.s = t, this.recovery = r, this.assertValidity()
                            }
                            static fromCompact(e) {
                                let r = t.nByteLength;
                                return e = K("compactSignature", e, 2 * r), new d(p(e, 0, r), p(e, r, 2 * r))
                            }
                            static fromDER(e) {
                                let {
                                    r: t,
                                    s: r
                                } = eS.toSig(K("DER", e));
                                return new d(t, r)
                            }
                            assertValidity() {
                                if (!f(this.r)) throw Error("r must be 0 < r < CURVE.n");
                                if (!f(this.s)) throw Error("s must be 0 < s < CURVE.n")
                            }
                            addRecoveryBit(e) {
                                return new d(this.r, this.s, e)
                            }
                            recoverPublicKey(e) {
                                let {
                                    r: i,
                                    s: o,
                                    recovery: u
                                } = this, l = b(K("msgHash", e));
                                if (null == u || ![0, 1, 2, 3].includes(u)) throw Error("recovery id invalid");
                                let f = 2 === u || 3 === u ? i + t.n : i;
                                if (f >= n.ORDER) throw Error("recovery id 2 or 3 invalid");
                                let h = (1 & u) == 0 ? "02" : "03",
                                    p = a.fromHex(h + c(f)),
                                    d = eh(f, r),
                                    y = s(-l * d),
                                    g = s(o * d),
                                    m = a.BASE.multiplyAndAddUnsafe(p, y, g);
                                if (!m) throw Error("point at infinify");
                                return m.assertValidity(), m
                            }
                            hasHighS() {
                                return h(this.s)
                            }
                            normalizeS() {
                                return this.hasHighS() ? new d(this.r, s(-this.s), this.recovery) : this
                            }
                            toDERRawBytes() {
                                return j(this.toDERHex())
                            }
                            toDERHex() {
                                return eS.hexFromSig({
                                    r: this.r,
                                    s: this.s
                                })
                            }
                            toCompactRawBytes() {
                                return j(this.toCompactHex())
                            }
                            toCompactHex() {
                                return c(this.r) + c(this.s)
                            }
                        }

                        function y(e) {
                            let t = e instanceof Uint8Array,
                                r = "string" == typeof e,
                                n = (t || r) && e.length;
                            return t ? n === i || n === o : r ? n === 2 * i || n === 2 * o : e instanceof a
                        }
                        let g = t.bits2int || function(e) {
                                let r = D(e),
                                    n = 8 * e.length - t.nBitLength;
                                return n > 0 ? r >> BigInt(n) : r
                            },
                            b = t.bits2int_modN || function(e) {
                                return s(g(e))
                            },
                            m = J(t.nBitLength);

                        function w(e) {
                            if ("bigint" != typeof e) throw Error("bigint expected");
                            if (!(ev <= e && e < m)) throw Error(`bigint expected < 2^${t.nBitLength}`);
                            return F(e, t.nByteLength)
                        }
                        let E = {
                                lowS: t.lowS,
                                prehash: !1
                            },
                            S = {
                                lowS: t.lowS,
                                prehash: !1
                            };
                        return a.BASE._setWindowSize(8), {
                            CURVE: t,
                            getPublicKey: function(e, t = !0) {
                                return a.fromPrivateKey(e).toRawBytes(t)
                            },
                            getSharedSecret: function(e, t, r = !0) {
                                if (y(e)) throw Error("first arg must be private key");
                                if (!y(t)) throw Error("second arg must be public key");
                                let n = a.fromHex(t);
                                return n.multiply(u(e)).toRawBytes(r)
                            },
                            sign: function(e, i, o = E) {
                                let {
                                    seed: l,
                                    k2sig: c
                                } = function(e, i, o = E) {
                                    if (["recovered", "canonical"].some(e => e in o)) throw Error("sign() legacy options not supported");
                                    let {
                                        hash: l,
                                        randomBytes: c
                                    } = t, {
                                        lowS: p,
                                        prehash: y,
                                        extraEntropy: m
                                    } = o;
                                    null == p && (p = !0), e = K("msgHash", e), y && (e = K("prehashed msgHash", l(e)));
                                    let S = b(e),
                                        v = u(i),
                                        _ = [w(v), w(S)];
                                    if (null != m) {
                                        let e = !0 === m ? c(n.BYTES) : m;
                                        _.push(K("extraEntropy", e, n.BYTES))
                                    }
                                    let T = $(..._);
                                    return {
                                        seed: T,
                                        k2sig: function(e) {
                                            let t = g(e);
                                            if (!f(t)) return;
                                            let n = eh(t, r),
                                                i = a.BASE.multiply(t).toAffine(),
                                                o = s(i.x);
                                            if (o === ev) return;
                                            let u = s(n * s(S + o * v));
                                            if (u === ev) return;
                                            let l = (i.x === o ? 0 : 2) | Number(i.y & e_),
                                                c = u;
                                            return p && h(u) && (c = h(u) ? s(-u) : u, l ^= 1), new d(o, c, l)
                                        }
                                    }
                                }(e, i, o), p = ee(t.hash.outputLen, t.nByteLength, t.hmac);
                                return p(l, c)
                            },
                            verify: function(e, n, i, o = S) {
                                let u, l;
                                if (n = K("msgHash", n), i = K("publicKey", i), "strict" in o) throw Error("options.strict was renamed to lowS");
                                let {
                                    lowS: f,
                                    prehash: c
                                } = o;
                                try {
                                    if ("string" == typeof e || e instanceof Uint8Array) try {
                                        l = d.fromDER(e)
                                    } catch (t) {
                                        if (!(t instanceof eS.Err)) throw t;
                                        l = d.fromCompact(e)
                                    } else if ("object" == typeof e && "bigint" == typeof e.r && "bigint" == typeof e.s) {
                                        let {
                                            r: t,
                                            s: r
                                        } = e;
                                        l = new d(t, r)
                                    } else throw Error("PARSE");
                                    u = a.fromHex(i)
                                } catch (e) {
                                    if ("PARSE" === e.message) throw Error("signature must be Signature instance, Uint8Array or hex string");
                                    return !1
                                }
                                if (f && l.hasHighS()) return !1;
                                c && (n = t.hash(n));
                                let {
                                    r: h,
                                    s: p
                                } = l, y = b(n), g = eh(p, r), m = s(y * g), w = s(h * g), E = a.BASE.multiplyAndAddUnsafe(u, m, w) ? .toAffine();
                                if (!E) return !1;
                                let v = s(E.x);
                                return v === h
                            },
                            ProjectivePoint: a,
                            Signature: d,
                            utils: {
                                isValidPrivateKey(e) {
                                    try {
                                        return u(e), !0
                                    } catch (e) {
                                        return !1
                                    }
                                },
                                normPrivateKeyToScalar: u,
                                randomPrivateKey: () => {
                                    let e = t.randomBytes(n.BYTES + 8),
                                        i = function(e, t, r = !1) {
                                            e = K("privateHash", e);
                                            let n = e.length,
                                                i = ey(t).nByteLength + 8;
                                            if (i < 24 || n < i || n > 1024) throw Error(`hashToPrivateScalar: expected ${i}-1024 bytes of input, got ${n}`);
                                            let o = r ? M(e) : D(e);
                                            return ef(o, t - ei) + ei
                                        }(e, r);
                                    return F(i, t.nByteLength)
                                },
                                precompute: (e = 8, t = a.BASE) => (t._setWindowSize(e), t.multiply(BigInt(3)), t)
                            }
                        }
                    })({ ...e,
                        hash: t,
                        hmac: (e, ...r) => ex(t, e, function(...e) {
                            if (!e.every(e => e instanceof Uint8Array)) throw Error("Uint8Array list expected");
                            if (1 === e.length) return e[0];
                            let t = e.reduce((e, t) => e + t.length, 0),
                                r = new Uint8Array(t);
                            for (let t = 0, n = 0; t < e.length; t++) {
                                let i = e[t];
                                r.set(i, n), n += i.length
                            }
                            return r
                        }(...r)),
                        randomBytes: E
                    });
                    return Object.freeze({ ...r(t),
                        create: r
                    })
                }({
                    a: BigInt(0),
                    b: BigInt(7),
                    Fp: eH,
                    n: eB,
                    Gx: BigInt("55066263022277343669578718895168534326250603453777594175500187360389116729240"),
                    Gy: BigInt("32670510020758816978083085130507043184471273380659243275938904335757337482424"),
                    h: BigInt(1),
                    lowS: !0,
                    endo: {
                        beta: BigInt("0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee"),
                        splitScalar: e => {
                            let t = BigInt("0x3086d221a7d46bcde86c90e49284eb15"),
                                r = -eN * BigInt("0xe4437ed6010e88286f547fa90abfe4c3"),
                                n = BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8"),
                                i = BigInt("0x100000000000000000000000000000000"),
                                o = eC(t * e, eB),
                                s = eC(-r * e, eB),
                                a = ef(e - o * t - s * n, eB),
                                u = ef(-o * r - s * t, eB),
                                l = a > i,
                                f = u > i;
                            if (l && (a = eB - a), f && (u = eB - u), a > i || u > i) throw Error("splitScalar: Endomorphism failed, k=" + e);
                            return {
                                k1neg: l,
                                k1: a,
                                k2neg: f,
                                k2: u
                            }
                        }
                    }
                }, k),
                eD = BigInt(0),
                eM = e => "bigint" == typeof e && eD < e && e < eR,
                eF = e => "bigint" == typeof e && eD < e && e < eB,
                eW = {};

            function eV(e, ...t) {
                let r = eW[e];
                if (void 0 === r) {
                    let t = k(Uint8Array.from(e, e => e.charCodeAt(0)));
                    r = $(t, t), eW[e] = r
                }
                return k($(r, ...t))
            }
            let eK = e => e.toRawBytes(!0).slice(1),
                e$ = e => F(e, 32),
                eq = e => ef(e, eR),
                eG = e => ef(e, eB),
                ez = ej.ProjectivePoint,
                eX = (e, t, r) => ez.BASE.multiplyAndAddUnsafe(e, t, r);

            function eY(e) {
                let t = ej.utils.normPrivateKeyToScalar(e),
                    r = ez.fromPrivateKey(t),
                    n = r.hasEvenY() ? t : eG(-t);
                return {
                    scalar: n,
                    bytes: eK(r)
                }
            }

            function eJ(e) {
                if (!eM(e)) throw Error("bad x: need 0 < x < p");
                let t = eq(e * e),
                    r = eq(t * e + BigInt(7)),
                    n = eL(r);
                n % 2 n !== 0 n && (n = eq(-n));
                let i = new ez(e, n, eN);
                return i.assertValidity(), i
            }

            function eZ(...e) {
                return eG(D(eV("BIP0340/challenge", ...e)))
            }

            function eQ(e, t, r) {
                let n = K("signature", e, 64),
                    i = K("message", t),
                    o = K("publicKey", r, 32);
                try {
                    let e = eJ(D(o)),
                        t = D(n.subarray(0, 32));
                    if (!eM(t)) return !1;
                    let r = D(n.subarray(32, 64));
                    if (!eF(r)) return !1;
                    let s = eZ(e$(t), eK(e), i),
                        a = eX(e, r, eG(-s));
                    if (!a || !a.hasEvenY() || a.toAffine().x !== t) return !1;
                    return !0
                } catch (e) {
                    return !1
                }
            }
            let e0 = {
                    getPublicKey: function(e) {
                        return eY(e).bytes
                    },
                    sign: function(e, t, r = E(32)) {
                        let n = K("message", e),
                            {
                                bytes: i,
                                scalar: o
                            } = eY(t),
                            s = K("auxRand", r, 32),
                            a = e$(o ^ D(eV("BIP0340/aux", s))),
                            u = eV("BIP0340/nonce", a, i, n),
                            l = eG(D(u));
                        if (l === eD) throw Error("sign failed: k is zero");
                        let {
                            bytes: f,
                            scalar: c
                        } = eY(l), h = eZ(f, i, n), p = new Uint8Array(64);
                        if (p.set(f, 0), p.set(e$(eG(c + h * o)), 32), !eQ(p, n, i)) throw Error("sign: Invalid signature produced");
                        return p
                    },
                    verify: eQ,
                    utils: {
                        randomPrivateKey: ej.utils.randomPrivateKey,
                        lift_x: eJ,
                        pointToBytes: eK,
                        numberToBytesBE: F,
                        bytesToNumberBE: D,
                        taggedHash: eV,
                        mod: ef
                    }
                },
                e1 = function(e, t) {
                    let r = t.map(e => Array.from(e).reverse());
                    return (t, n) => {
                        let [i, o, s, a] = r.map(r => r.reduce((r, n) => e.add(e.mul(r, t), n)));
                        return {
                            x: t = e.div(i, o),
                            y: n = e.mul(n, e.div(s, a))
                        }
                    }
                }(eH, [
                    ["0x8e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38daaaaa8c7", "0x7d3d4c80bc321d5b9f315cea7fd44c5d595d2fc0bf63b92dfff1044f17c6581", "0x534c328d23f234e6e2a413deca25caece4506144037c40314ecbd0b53d9dd262", "0x8e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38daaaaa88c"],
                    ["0xd35771193d94918a9ca34ccbb7b640dd86cd409542f8487d9fe6b745781eb49b", "0xedadc6f64383dc1df7c4b2d51b54225406d36b641f5e41bbc52a56612a8c6d14", "0x0000000000000000000000000000000000000000000000000000000000000001"],
                    ["0x4bda12f684bda12f684bda12f684bda12f684bda12f684bda12f684b8e38e23c", "0xc75e0c32d5cb7c0fa9d0a54b12a0a6d5647ab046d686da6fdffc90fc201d71a3", "0x29a6194691f91a73715209ef6512e576722830a201be2018a765e85a9ecee931", "0x2f684bda12f684bda12f684bda12f684bda12f684bda12f684bda12f38e38d84"],
                    ["0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffff93b", "0x7a06534bb8bdb49fd5e9e6632722c2989467c1bfc8e8d978dfb425d2685c2573", "0x6484aa716545ca2cf3a70c3fa8fe337e0a3d21162f0d6299a7bf8192bfd2a76f", "0x0000000000000000000000000000000000000000000000000000000000000001"]
                ].map(e => e.map(e => BigInt(e)))),
                e2 = function(e, t) {
                    if (ed(e), !e.isValid(t.A) || !e.isValid(t.B) || !e.isValid(t.Z)) throw Error("mapToCurveSimpleSWU: invalid opts");
                    let r = function(e, t) {
                        let r = e.ORDER,
                            n = 0 n;
                        for (let e = r - 1 n; e % 2 n === 0 n; e /= 2 n) n += 1 n;
                        let i = n,
                            o = (r - 1 n) / 2 n ** i,
                            s = (o - 1 n) / 2 n,
                            a = 2 n ** i - 1 n,
                            u = 2 n ** (i - 1 n),
                            l = e.pow(t, o),
                            f = e.pow(t, (o + 1 n) / 2 n),
                            c = (t, r) => {
                                let n = l,
                                    o = e.pow(r, a),
                                    c = e.sqr(o);
                                c = e.mul(c, r);
                                let h = e.mul(t, c);
                                h = e.pow(h, s), h = e.mul(h, o), o = e.mul(h, r), c = e.mul(h, t);
                                let p = e.mul(c, o);
                                h = e.pow(p, u);
                                let d = e.eql(h, e.ONE);
                                o = e.mul(c, f), h = e.mul(p, n), c = e.cmov(o, c, d), p = e.cmov(h, p, d);
                                for (let t = i; t > 1; t--) {
                                    let r = 2 n ** (t - 2 n),
                                        i = e.pow(p, r),
                                        s = e.eql(i, e.ONE);
                                    o = e.mul(c, n), n = e.mul(n, n), i = e.mul(p, n), c = e.cmov(o, c, s), p = e.cmov(i, p, s)
                                }
                                return {
                                    isValid: d,
                                    value: c
                                }
                            };
                        if (e.ORDER % 4 n === 3 n) {
                            let r = (e.ORDER - 3 n) / 4 n,
                                n = e.sqrt(e.neg(t));
                            c = (t, i) => {
                                let o = e.sqr(i),
                                    s = e.mul(t, i);
                                o = e.mul(o, s);
                                let a = e.pow(o, r);
                                a = e.mul(a, s);
                                let u = e.mul(a, n),
                                    l = e.mul(e.sqr(a), i),
                                    f = e.eql(l, t),
                                    c = e.cmov(u, a, f);
                                return {
                                    isValid: f,
                                    value: c
                                }
                            }
                        }
                        return c
                    }(e, t.Z);
                    if (!e.isOdd) throw Error("Fp.isOdd is not implemented!");
                    return n => {
                        let i, o, s, a, u, l, f, c;
                        i = e.sqr(n), i = e.mul(i, t.Z), o = e.sqr(i), o = e.add(o, i), s = e.add(o, e.ONE), s = e.mul(s, t.B), a = e.cmov(t.Z, e.neg(o), !e.eql(o, e.ZERO)), a = e.mul(a, t.A), o = e.sqr(s), l = e.sqr(a), u = e.mul(l, t.A), o = e.add(o, u), o = e.mul(o, s), l = e.mul(l, a), u = e.mul(l, t.B), o = e.add(o, u), f = e.mul(i, s);
                        let {
                            isValid: h,
                            value: p
                        } = r(o, l);
                        c = e.mul(i, n), c = e.mul(c, p), f = e.cmov(f, s, h), c = e.cmov(c, p, h);
                        let d = e.isOdd(n) === e.isOdd(c);
                        return c = e.cmov(e.neg(c), c, d), {
                            x: f = e.div(f, a),
                            y: c
                        }
                    }
                }(eH, {
                    A: BigInt("0x3f8731abdd661adca08a5558f0f5d272e953d363cb6f0e5d405447c01a444533"),
                    B: BigInt("1771"),
                    Z: eH.create(BigInt("-11"))
                }),
                {
                    hashToCurve: e3,
                    encodeToCurve: e4
                } = function(e, t, r) {
                    if ("function" != typeof t) throw Error("mapToCurve() must be defined");
                    return {
                        hashToCurve(n, i) {
                            let o = eP(n, 2, { ...r,
                                    DST: r.DST,
                                    ...i
                                }),
                                s = e.fromAffine(t(o[0])),
                                a = e.fromAffine(t(o[1])),
                                u = s.add(a).clearCofactor();
                            return u.assertValidity(), u
                        },
                        encodeToCurve(n, i) {
                            let o = eP(n, 1, { ...r,
                                    DST: r.encodeDST,
                                    ...i
                                }),
                                s = e.fromAffine(t(o[0])).clearCofactor();
                            return s.assertValidity(), s
                        }
                    }
                }(ej.ProjectivePoint, e => {
                    let {
                        x: t,
                        y: r
                    } = e2(eH.create(e[0]));
                    return e1(t, r)
                }, {
                    DST: "secp256k1_XMD:SHA-256_SSWU_RO_",
                    encodeDST: "secp256k1_XMD:SHA-256_SSWU_NU_",
                    p: eH.ORDER,
                    m: 1,
                    k: 128,
                    expand: "xmd",
                    hash: k
                }),
                e8 = new Uint8Array([7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8]),
                e6 = Uint8Array.from({
                    length: 16
                }, (e, t) => t),
                e5 = e6.map(e => (9 * e + 5) % 16),
                e9 = [e6],
                e7 = [e5];
            for (let e = 0; e < 4; e++)
                for (let t of [e9, e7]) t.push(t[e].map(e => e8[e]));
            let te = [
                    [11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8],
                    [12, 13, 11, 15, 6, 9, 9, 7, 12, 15, 11, 13, 7, 8, 7, 7],
                    [13, 15, 14, 11, 7, 7, 6, 8, 13, 14, 13, 12, 5, 5, 6, 9],
                    [14, 11, 12, 14, 8, 6, 5, 5, 15, 12, 15, 14, 9, 9, 8, 6],
                    [15, 12, 13, 13, 9, 5, 8, 6, 14, 11, 12, 11, 8, 6, 5, 5]
                ].map(e => new Uint8Array(e)),
                tt = e9.map((e, t) => e.map(e => te[t][e])),
                tr = e7.map((e, t) => e.map(e => te[t][e])),
                tn = new Uint32Array([0, 1518500249, 1859775393, 2400959708, 2840853838]),
                ti = new Uint32Array([1352829926, 1548603684, 1836072691, 2053994217, 0]),
                to = (e, t) => e << t | e >>> 32 - t;

            function ts(e, t, r, n) {
                return 0 === e ? t ^ r ^ n : 1 === e ? t & r | ~t & n : 2 === e ? (t | ~r) ^ n : 3 === e ? t & n | r & ~n : t ^ (r | ~n)
            }
            let ta = new Uint32Array(16);
            class tu extends S {
                constructor() {
                    super(64, 20, 8, !0), this.h0 = 1732584193, this.h1 = -271733879, this.h2 = -1732584194, this.h3 = 271733878, this.h4 = -1009589776
                }
                get() {
                    let {
                        h0: e,
                        h1: t,
                        h2: r,
                        h3: n,
                        h4: i
                    } = this;
                    return [e, t, r, n, i]
                }
                set(e, t, r, n, i) {
                    this.h0 = 0 | e, this.h1 = 0 | t, this.h2 = 0 | r, this.h3 = 0 | n, this.h4 = 0 | i
                }
                process(e, t) {
                    for (let r = 0; r < 16; r++, t += 4) ta[r] = e.getUint32(t, !0);
                    let r = 0 | this.h0,
                        n = r,
                        i = 0 | this.h1,
                        o = i,
                        s = 0 | this.h2,
                        a = s,
                        u = 0 | this.h3,
                        l = u,
                        f = 0 | this.h4,
                        c = f;
                    for (let e = 0; e < 5; e++) {
                        let t = 4 - e,
                            h = tn[e],
                            p = ti[e],
                            d = e9[e],
                            y = e7[e],
                            g = tt[e],
                            b = tr[e];
                        for (let t = 0; t < 16; t++) {
                            let n = to(r + ts(e, i, s, u) + ta[d[t]] + h, g[t]) + f | 0;
                            r = f, f = u, u = 0 | to(s, 10), s = i, i = n
                        }
                        for (let e = 0; e < 16; e++) {
                            let r = to(n + ts(t, o, a, l) + ta[y[e]] + p, b[e]) + c | 0;
                            n = c, c = l, l = 0 | to(a, 10), a = o, o = r
                        }
                    }
                    this.set(this.h1 + s + l | 0, this.h2 + u + c | 0, this.h3 + f + n | 0, this.h4 + r + o | 0, this.h0 + i + a | 0)
                }
                roundClean() {
                    ta.fill(0)
                }
                destroy() {
                    this.destroyed = !0, this.buffer.fill(0), this.set(0, 0, 0, 0, 0)
                }
            }
            let tl = w(() => new tu); /*! scure-base - MIT License (c) 2022 Paul Miller (paulmillr.com) */
            function tf(e) {
                if (!Number.isSafeInteger(e)) throw Error(`Wrong integer: ${e}`)
            }

            function tc(...e) {
                let t = (e, t) => r => e(t(r)),
                    r = Array.from(e).reverse().reduce((e, r) => e ? t(e, r.encode) : r.encode, void 0),
                    n = e.reduce((e, r) => e ? t(e, r.decode) : r.decode, void 0);
                return {
                    encode: r,
                    decode: n
                }
            }

            function th(e) {
                return {
                    encode: t => {
                        if (!Array.isArray(t) || t.length && "number" != typeof t[0]) throw Error("alphabet.encode input should be an array of numbers");
                        return t.map(t => {
                            if (tf(t), t < 0 || t >= e.length) throw Error(`Digit index outside alphabet: ${t} (alphabet: ${e.length})`);
                            return e[t]
                        })
                    },
                    decode: t => {
                        if (!Array.isArray(t) || t.length && "string" != typeof t[0]) throw Error("alphabet.decode input should be array of strings");
                        return t.map(t => {
                            if ("string" != typeof t) throw Error(`alphabet.decode: not string element=${t}`);
                            let r = e.indexOf(t);
                            if (-1 === r) throw Error(`Unknown letter: "${t}". Allowed: ${e}`);
                            return r
                        })
                    }
                }
            }

            function tp(e = "") {
                if ("string" != typeof e) throw Error("join separator should be string");
                return {
                    encode: t => {
                        if (!Array.isArray(t) || t.length && "string" != typeof t[0]) throw Error("join.encode input should be array of strings");
                        for (let e of t)
                            if ("string" != typeof e) throw Error(`join.encode: non-string input=${e}`);
                        return t.join(e)
                    },
                    decode: t => {
                        if ("string" != typeof t) throw Error("join.decode input should be string");
                        return t.split(e)
                    }
                }
            }

            function td(e, t = "=") {
                if (tf(e), "string" != typeof t) throw Error("padding chr should be string");
                return {
                    encode(r) {
                        if (!Array.isArray(r) || r.length && "string" != typeof r[0]) throw Error("padding.encode input should be array of strings");
                        for (let e of r)
                            if ("string" != typeof e) throw Error(`padding.encode: non-string input=${e}`);
                        for (; r.length * e % 8;) r.push(t);
                        return r
                    },
                    decode(r) {
                        if (!Array.isArray(r) || r.length && "string" != typeof r[0]) throw Error("padding.encode input should be array of strings");
                        for (let e of r)
                            if ("string" != typeof e) throw Error(`padding.decode: non-string input=${e}`);
                        let n = r.length;
                        if (n * e % 8) throw Error("Invalid padding: string should have whole number of bytes");
                        for (; n > 0 && r[n - 1] === t; n--)
                            if (!((n - 1) * e % 8)) throw Error("Invalid padding: string has too much padding");
                        return r.slice(0, n)
                    }
                }
            }

            function ty(e) {
                if ("function" != typeof e) throw Error("normalize fn should be function");
                return {
                    encode: e => e,
                    decode: t => e(t)
                }
            }

            function tg(e, t, r) {
                if (t < 2) throw Error(`convertRadix: wrong from=${t}, base cannot be less than 2`);
                if (r < 2) throw Error(`convertRadix: wrong to=${r}, base cannot be less than 2`);
                if (!Array.isArray(e)) throw Error("convertRadix: data should be array");
                if (!e.length) return [];
                let n = 0,
                    i = [],
                    o = Array.from(e);
                for (o.forEach(e => {
                        if (tf(e), e < 0 || e >= t) throw Error(`Wrong integer: ${e}`)
                    });;) {
                    let e = 0,
                        s = !0;
                    for (let i = n; i < o.length; i++) {
                        let a = o[i],
                            u = t * e + a;
                        if (!Number.isSafeInteger(u) || t * e / t !== e || u - a != t * e || (e = u % r, o[i] = Math.floor(u / r), !Number.isSafeInteger(o[i]) || o[i] * r + e !== u)) throw Error("convertRadix: carry overflow");
                        s && (o[i] ? s = !1 : n = i)
                    }
                    if (i.push(e), s) break
                }
                for (let t = 0; t < e.length - 1 && 0 === e[t]; t++) i.push(0);
                return i.reverse()
            }
            let tb = (e, t) => t ? tb(t, e % t) : e,
                tm = (e, t) => e + (t - tb(e, t));

            function tw(e, t, r, n) {
                if (!Array.isArray(e)) throw Error("convertRadix2: data should be array");
                if (t <= 0 || t > 32) throw Error(`convertRadix2: wrong from=${t}`);
                if (r <= 0 || r > 32) throw Error(`convertRadix2: wrong to=${r}`);
                if (tm(t, r) > 32) throw Error(`convertRadix2: carry overflow from=${t} to=${r} carryBits=${tm(t,r)}`);
                let i = 0,
                    o = 0,
                    s = 2 ** r - 1,
                    a = [];
                for (let n of e) {
                    if (tf(n), n >= 2 ** t) throw Error(`convertRadix2: invalid data word=${n} from=${t}`);
                    if (i = i << t | n, o + t > 32) throw Error(`convertRadix2: carry overflow pos=${o} from=${t}`);
                    for (o += t; o >= r; o -= r) a.push((i >> o - r & s) >>> 0);
                    i &= 2 ** o - 1
                }
                if (i = i << r - o & s, !n && o >= t) throw Error("Excess padding");
                if (!n && i) throw Error(`Non-zero padding: ${i}`);
                return n && o > 0 && a.push(i >>> 0), a
            }

            function tE(e, t = !1) {
                if (tf(e), e <= 0 || e > 32) throw Error("radix2: bits should be in (0..32]");
                if (tm(8, e) > 32 || tm(e, 8) > 32) throw Error("radix2: carry overflow");
                return {
                    encode: r => {
                        if (!(r instanceof Uint8Array)) throw Error("radix2.encode input should be Uint8Array");
                        return tw(Array.from(r), 8, e, !t)
                    },
                    decode: r => {
                        if (!Array.isArray(r) || r.length && "number" != typeof r[0]) throw Error("radix2.decode input should be array of strings");
                        return Uint8Array.from(tw(r, e, 8, t))
                    }
                }
            }

            function tS(e) {
                if ("function" != typeof e) throw Error("unsafeWrapper fn should be function");
                return function(...t) {
                    try {
                        return e.apply(null, t)
                    } catch (e) {}
                }
            }
            tc(tE(4), th("0123456789ABCDEF"), tp("")), tc(tE(5), th("ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"), td(5), tp("")), tc(tE(5), th("0123456789ABCDEFGHIJKLMNOPQRSTUV"), td(5), tp("")), tc(tE(5), th("0123456789ABCDEFGHJKMNPQRSTVWXYZ"), tp(""), ty(e => e.toUpperCase().replace(/O/g, "0").replace(/[IL]/g, "1"))), tc(tE(6), th("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"), td(6), tp("")), tc(tE(6), th("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"), td(6), tp(""));
            let tv = e => tc((tf(58), {
                    encode: e => {
                        if (!(e instanceof Uint8Array)) throw Error("radix.encode input should be Uint8Array");
                        return tg(Array.from(e), 256, 58)
                    },
                    decode: e => {
                        if (!Array.isArray(e) || e.length && "number" != typeof e[0]) throw Error("radix.decode input should be array of strings");
                        return Uint8Array.from(tg(e, 58, 256))
                    }
                }), th(e), tp("")),
                t_ = tv("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz");
            tv("123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"), tv("rpshnaf39wBUDNEGHJKLM4PQRST7VWXYZ2bcdeCg65jkm8oFqi1tuvAxyz");
            let tT = tc(th("qpzry9x8gf2tvdw0s3jn54khce6mua7l"), tp("")),
                tA = [996825010, 642813549, 513874426, 1027748829, 705979059];

            function tO(e) {
                let t = e >> 25,
                    r = (33554431 & e) << 5;
                for (let e = 0; e < tA.length; e++)(t >> e & 1) == 1 && (r ^= tA[e]);
                return r
            }

            function tI(e, t, r = 1) {
                let n = e.length,
                    i = 1;
                for (let t = 0; t < n; t++) {
                    let r = e.charCodeAt(t);
                    if (r < 33 || r > 126) throw Error(`Invalid prefix (${e})`);
                    i = tO(i) ^ r >> 5
                }
                i = tO(i);
                for (let t = 0; t < n; t++) i = tO(i) ^ 31 & e.charCodeAt(t);
                for (let e of t) i = tO(i) ^ e;
                for (let e = 0; e < 6; e++) i = tO(i);
                return i ^= r, tT.encode(tw([i % 1073741824], 30, 5, !1))
            }

            function tP(e) {
                let t = "bech32" === e ? 1 : 734539939,
                    r = tE(5),
                    n = r.decode,
                    i = r.encode,
                    o = tS(n);

                function s(e, r = 90) {
                    if ("string" != typeof e) throw Error(`bech32.decode input should be string, not ${typeof e}`);
                    if (e.length < 8 || !1 !== r && e.length > r) throw TypeError(`Wrong string length: ${e.length} (${e}). Expected (8..${r})`);
                    let n = e.toLowerCase();
                    if (e !== n && e !== e.toUpperCase()) throw Error("String must be lowercase or uppercase");
                    e = n;
                    let i = e.lastIndexOf("1");
                    if (0 === i || -1 === i) throw Error('Letter "1" must be present between prefix and data only');
                    let o = e.slice(0, i),
                        s = e.slice(i + 1);
                    if (s.length < 6) throw Error("Data must be at least 6 characters long");
                    let a = tT.decode(s).slice(0, -6),
                        u = tI(o, a, t);
                    if (!s.endsWith(u)) throw Error(`Invalid checksum in ${e}: expected "${u}"`);
                    return {
                        prefix: o,
                        words: a
                    }
                }
                let a = tS(s);
                return {
                    encode: function(e, r, n = 90) {
                        if ("string" != typeof e) throw Error(`bech32.encode prefix should be string, not ${typeof e}`);
                        if (!Array.isArray(r) || r.length && "number" != typeof r[0]) throw Error(`bech32.encode words should be array of numbers, not ${typeof r}`);
                        let i = e.length + 7 + r.length;
                        if (!1 !== n && i > n) throw TypeError(`Length ${i} exceeds limit ${n}`);
                        return e = e.toLowerCase(), `${e}1${tT.encode(r)}${tI(e,r,t)}`
                    },
                    decode: s,
                    decodeToBytes: function(e) {
                        let {
                            prefix: t,
                            words: r
                        } = s(e, !1);
                        return {
                            prefix: t,
                            words: r,
                            bytes: n(r)
                        }
                    },
                    decodeUnsafe: a,
                    fromWords: n,
                    fromWordsUnsafe: o,
                    toWords: i
                }
            }
            let tk = tP("bech32"),
                tx = tP("bech32m"),
                tR = {
                    encode: e => new TextDecoder().decode(e),
                    decode: e => new TextEncoder().encode(e)
                },
                tB = tc(tE(4), th("0123456789abcdef"), tp(""), ty(e => {
                    if ("string" != typeof e || e.length % 2) throw TypeError(`hex.decode: expected string, got ${typeof e} with length ${e.length}`);
                    return e.toLowerCase()
                })),
                tN = new Uint8Array,
                tU = new Uint8Array([0]);

            function tC(e, t) {
                if (e.length !== t.length) return !1;
                for (let r = 0; r < e.length; r++)
                    if (e[r] !== t[r]) return !1;
                return !0
            }

            function tL(...e) {
                if (1 === e.length) return e[0];
                let t = e.reduce((e, t) => e + t.length, 0),
                    r = new Uint8Array(t);
                for (let t = 0, n = 0; t < e.length; t++) {
                    let i = e[t];
                    r.set(i, n), n += i.length
                }
                return r
            }
            let tH = e => e instanceof Uint8Array;
            class tj {
                constructor(e, t = [], r = []) {
                    this.data = e, this.path = t, this.fieldPath = r, this.pos = 0, this.hasPtr = !1, this.bitBuf = 0, this.bitPos = 0
                }
                err(e) {
                    return Error(`Reader(${this.fieldPath.join("/")}): ${e}`)
                }
                absBytes(e) {
                    if (e > this.data.length) throw Error("absBytes: Unexpected end of buffer");
                    return this.data.subarray(e)
                }
                bytes(e, t = !1) {
                    if (this.bitPos) throw this.err("readBytes: bitPos not empty");
                    if (!Number.isFinite(e)) throw this.err(`readBytes: wrong length=${e}`);
                    if (this.pos + e > this.data.length) throw this.err("readBytes: Unexpected end of buffer");
                    let r = this.data.subarray(this.pos, this.pos + e);
                    return t || (this.pos += e), r
                }
                byte(e = !1) {
                    if (this.bitPos) throw this.err("readByte: bitPos not empty");
                    return this.data[e ? this.pos : this.pos++]
                }
                get leftBytes() {
                    return this.data.length - this.pos
                }
                isEnd() {
                    return this.pos >= this.data.length && !this.bitPos
                }
                length(e) {
                    let t;
                    if (tK(e) ? t = Number(e.decodeStream(this)) : "number" == typeof e ? t = e : "string" == typeof e && (t = tV(this.path, e.split("/"))), "bigint" == typeof t && (t = Number(t)), "number" != typeof t) throw this.err(`Wrong length: ${t}`);
                    return t
                }
                bits(e) {
                    if (e > 32) throw this.err("BitReader: cannot read more than 32 bits in single call");
                    let t = 0;
                    for (; e;) {
                        this.bitPos || (this.bitBuf = this.data[this.pos++], this.bitPos = 8);
                        let r = Math.min(e, this.bitPos);
                        this.bitPos -= r, t = t << r | this.bitBuf >> this.bitPos & 2 ** r - 1, this.bitBuf &= 2 ** this.bitPos - 1, e -= r
                    }
                    return t >>> 0
                }
                find(e, t = this.pos) {
                    if (!tH(e)) throw this.err(`find: needle is not bytes! ${e}`);
                    if (this.bitPos) throw this.err("findByte: bitPos not empty");
                    if (!e.length) throw this.err("find: needle is empty");
                    for (let r = t; - 1 !== (r = this.data.indexOf(e[0], r)); r++) {
                        if (-1 === r) return;
                        let t = this.data.length - r;
                        if (t < e.length) return;
                        if (tC(e, this.data.subarray(r, r + e.length))) return r
                    }
                }
                finish() {
                    if (!this.isEnd() && !this.hasPtr) throw this.err(`${this.leftBytes} bytes ${this.bitPos} bits left after unpack: ${tB.encode(this.data.slice(this.pos))}`)
                }
                fieldPathPush(e) {
                    this.fieldPath.push(e)
                }
                fieldPathPop() {
                    this.fieldPath.pop()
                }
            }
            class tD {
                constructor(e = [], t = []) {
                    this.path = e, this.fieldPath = t, this.buffers = [], this.pos = 0, this.ptrs = [], this.bitBuf = 0, this.bitPos = 0
                }
                err(e) {
                    return Error(`Writer(${this.fieldPath.join("/")}): ${e}`)
                }
                bytes(e) {
                    if (this.bitPos) throw this.err("writeBytes: ends with non-empty bit buffer");
                    this.buffers.push(e), this.pos += e.length
                }
                byte(e) {
                    if (this.bitPos) throw this.err("writeByte: ends with non-empty bit buffer");
                    this.buffers.push(new Uint8Array([e])), this.pos++
                }
                get buffer() {
                    if (this.bitPos) throw this.err("buffer: ends with non-empty bit buffer");
                    let e = tL(...this.buffers);
                    for (let t of this.ptrs) {
                        let r = e.length;
                        e = tL(e, t.buffer);
                        let n = t.ptr.encode(r);
                        for (let r = 0; r < n.length; r++) e[t.pos + r] = n[r]
                    }
                    return e
                }
                length(e, t) {
                    let r;
                    if (null !== e) {
                        if (tK(e)) return e.encodeStream(this, t);
                        if ("number" == typeof e ? r = e : "string" == typeof e && (r = tV(this.path, e.split("/"))), "bigint" == typeof r && (r = Number(r)), void 0 === r || r !== t) throw this.err(`Wrong length: ${r} len=${e} exp=${t}`)
                    }
                }
                bits(e, t) {
                    if (t > 32) throw this.err("writeBits: cannot write more than 32 bits in single call");
                    if (e >= 2 ** t) throw this.err(`writeBits: value (${e}) >= 2**bits (${t})`);
                    for (; t;) {
                        let r = Math.min(t, 8 - this.bitPos);
                        this.bitBuf = this.bitBuf << r | e >> t - r, this.bitPos += r, t -= r, e &= 2 ** t - 1, 8 === this.bitPos && (this.bitPos = 0, this.buffers.push(new Uint8Array([this.bitBuf])), this.pos++)
                    }
                }
                fieldPathPush(e) {
                    this.fieldPath.push(e)
                }
                fieldPathPop() {
                    this.fieldPath.pop()
                }
            }
            let tM = e => Uint8Array.from(e).reverse();

            function tF(e, t, r, n) {
                if (n) {
                    let n = 2 n ** (r - 1 n);
                    if (t < -n || t >= n) throw e.err("sInt: value out of bounds")
                } else if (0 n > t || t >= 2 n ** r) throw e.err("uInt: value out of bounds")
            }

            function tW(e) {
                return { ...e,
                    encode: t => {
                        let r = new tD;
                        return e.encodeStream(r, t), r.buffer
                    },
                    decode: t => {
                        let r = new tj(t),
                            n = e.decodeStream(r);
                        return r.finish(), n
                    }
                }
            }

            function tV(e, t) {
                e = Array.from(e);
                let r = 0;
                for (; r < t.length && ".." === t[r]; r++) e.pop();
                let n = e.pop();
                for (; r < t.length; r++) {
                    if (!n || void 0 === n[t[r]]) return;
                    n = n[t[r]]
                }
                return n
            }

            function tK(e) {
                return "function" == typeof e.encode && "function" == typeof e.encodeStream && "function" == typeof e.decode && "function" == typeof e.decodeStream
            }
            let t$ = {
                    dict: function() {
                        return {
                            encode: e => {
                                let t = {};
                                for (let [r, n] of e) {
                                    if (void 0 !== t[r]) throw Error(`coders.dict: same key(${r}) appears twice in struct`);
                                    t[r] = n
                                }
                                return t
                            },
                            decode: e => Object.entries(e)
                        }
                    },
                    number: {
                        encode: e => {
                            if (e > BigInt(Number.MAX_SAFE_INTEGER)) throw Error(`coders.number: element bigger than MAX_SAFE_INTEGER=${e}`);
                            return Number(e)
                        },
                        decode: e => BigInt(e)
                    },
                    tsEnum: function(e) {
                        return {
                            encode: t => e[t],
                            decode: t => e[t]
                        }
                    },
                    decimal: function(e) {
                        let t = 10 n ** BigInt(e);
                        return {
                            encode: t => {
                                let r = (t < 0 n ? -t : t).toString(10),
                                    n = r.length - e;
                                n < 0 && (r = r.padStart(r.length - n, "0"), n = 0);
                                let i = r.length - 1;
                                for (; i >= n && "0" === r[i]; i--);
                                let [o, s] = [r.slice(0, n), r.slice(n, i + 1)];
                                return (o || (o = "0"), t < 0 n && (o = "-" + o), s) ? `${o}.${s}` : o
                            },
                            decode: r => {
                                let n = !1;
                                r.startsWith("-") && (n = !0, r = r.slice(1));
                                let i = r.indexOf(".");
                                i = -1 === i ? r.length : i;
                                let [o, s] = [r.slice(0, i), r.slice(i + 1)], a = BigInt(o) * t, u = Math.min(s.length, e), l = BigInt(s.slice(0, u)) * 10 n ** BigInt(e - u), f = a + l;
                                return n ? -f : f
                            }
                        }
                    },
                    match: function(e) {
                        return {
                            encode: t => {
                                for (let r of e) {
                                    let e = r.encode(t);
                                    if (void 0 !== e) return e
                                }
                                throw Error(`match/encode: cannot find match in ${t}`)
                            },
                            decode: t => {
                                for (let r of e) {
                                    let e = r.decode(t);
                                    if (void 0 !== e) return e
                                }
                                throw Error(`match/decode: cannot find match in ${t}`)
                            }
                        }
                    }
                },
                tq = (e, t = !1, r = !1) => tW({
                    size: e,
                    encodeStream: (n, i) => {
                        if ("number" != typeof i && "bigint" != typeof i) throw n.err(`bigint: invalid value: ${i}`);
                        let o = BigInt(i),
                            s = BigInt(e);
                        tF(n, o, 8 n * s, !!r);
                        let a = 2 n ** (8 n * s - 1 n);
                        r && o < 0 && (o |= a);
                        let u = [];
                        for (let t = 0; t < e; t++) u.push(Number(255 n & o)), o >>= 8 n;
                        let l = new Uint8Array(u).reverse();
                        n.bytes(t ? l.reverse() : l)
                    },
                    decodeStream: n => {
                        let i = BigInt(e),
                            o = n.bytes(e);
                        t && (o = tM(o));
                        let s = tM(o),
                            a = 2 n ** (8 n * i - 1 n),
                            u = 0 n;
                        for (let e = 0; e < s.length; e++) u |= BigInt(s[e]) << 8 n * BigInt(e);
                        return r && u & a && (u = (u ^ a) - a), tF(n, u, 8 n * i, !!r), u
                    }
                });
            tq(32, !0);
            let tG = tq(32, !1);
            tq(32, !0, !0), tq(32, !1, !0), tq(16, !0), tq(16, !1), tq(16, !0, !0), tq(16, !1, !0);
            let tz = tq(8, !0);
            tq(8, !1);
            let tX = tq(8, !0, !0);
            tq(8, !1, !0);
            let tY = (e, t = !1, r = !1) => {
                    if (e > 6) throw Error("int supports size up to 6 bytes (48 bits), for other use bigint");
                    return t4(tq(e, t, r), t$.number)
                },
                tJ = tY(4, !0),
                tZ = tY(4, !1),
                tQ = tY(4, !0, !0);
            tY(4, !1, !0);
            let t0 = tY(2, !0);
            tY(2, !1), tY(2, !0, !0), tY(2, !1, !0);
            let t1 = tY(1, !1);
            tY(1, !1, !0), tW({
                size: 1,
                encodeStream: (e, t) => e.byte(t ? 1 : 0),
                decodeStream: e => {
                    let t = e.byte();
                    if (0 !== t && 1 !== t) throw e.err(`bool: invalid value ${t}`);
                    return 1 === t
                }
            });
            let t2 = (e, t = !1) => tW({
                    size: "number" == typeof e ? e : void 0,
                    encodeStream: (r, n) => {
                        if (!tH(n)) throw r.err(`bytes: invalid value ${n}`);
                        tH(e) || r.length(e, n.length), r.bytes(t ? tM(n) : n), tH(e) && r.bytes(e)
                    },
                    decodeStream: r => {
                        let n;
                        if (tH(e)) {
                            let t = r.find(e);
                            if (!t) throw r.err("bytes: cannot find terminator");
                            n = r.bytes(t - r.pos), r.bytes(e.length)
                        } else n = r.bytes(null === e ? r.leftBytes : r.length(e));
                        return t ? tM(n) : n
                    }
                }),
                t3 = (e, t = !1) => {
                    let r = t2(e, t);
                    return tW({
                        size: r.size,
                        encodeStream: (e, t) => r.encodeStream(e, tR.decode(t)),
                        decodeStream: e => tR.encode(r.decodeStream(e))
                    })
                };

            function t4(e, t) {
                if (!tK(e)) throw Error(`apply: invalid inner value ${e}`);
                return tW({
                    size: e.size,
                    encodeStream: (r, n) => {
                        let i;
                        try {
                            i = t.decode(n)
                        } catch (e) {
                            throw r.err("" + e)
                        }
                        return e.encodeStream(r, i)
                    },
                    decodeStream: r => {
                        let n = e.decodeStream(r);
                        try {
                            return t.encode(n)
                        } catch (e) {
                            throw r.err("" + e)
                        }
                    }
                })
            }

            function t8(e, t) {
                if (!tK(e)) throw Error(`validate: invalid inner value ${e}`);
                return tW({
                    size: e.size,
                    encodeStream: (r, n) => e.encodeStream(r, t(n)),
                    decodeStream: r => t(e.decodeStream(r))
                })
            }

            function t6(e, t, r = !0) {
                if (!tK(e)) throw Error(`flagged: invalid inner value ${e}`);
                return tW({
                    size: e.size,
                    encodeStream: (r, n) => e.encodeStream(r, t),
                    decodeStream: n => {
                        let i = e.decodeStream(n);
                        if (r && "object" != typeof i && i !== t || tH(t) && !tC(t, i)) throw n.err(`magic: invalid value: ${i} !== ${t}`)
                    }
                })
            }

            function t5(e) {
                let t = 0;
                for (let r of e) {
                    if (!r.size) return;
                    t += r.size
                }
                return t
            }

            function t9(e) {
                if (Array.isArray(e)) throw Error("Packed.Struct: got array instead of object");
                return tW({
                    size: t5(Object.values(e)),
                    encodeStream: (t, r) => {
                        if ("object" != typeof r || null === r) throw t.err(`struct: invalid value ${r}`);
                        for (let n in t.path.push(r), e) t.fieldPathPush(n), e[n].encodeStream(t, r[n]), t.fieldPathPop();
                        t.path.pop()
                    },
                    decodeStream: t => {
                        let r = {};
                        for (let n in t.path.push(r), e) t.fieldPathPush(n), r[n] = e[n].decodeStream(t), t.fieldPathPop();
                        return t.path.pop(), r
                    }
                })
            }

            function t7(e, t) {
                if (!tK(t)) throw Error(`array: invalid inner value ${t}`);
                return tW({
                    size: "number" == typeof e && t.size ? e * t.size : void 0,
                    encodeStream: (r, n) => {
                        if (!Array.isArray(n)) throw r.err(`array: invalid value ${n}`);
                        tH(e) || r.length(e, n.length), r.path.push(n);
                        for (let i = 0; i < n.length; i++) {
                            r.fieldPathPush("" + i);
                            let o = n[i],
                                s = r.pos;
                            if (t.encodeStream(r, o), tH(e)) {
                                if (e.length > r.pos - s) continue;
                                let t = r.buffer.subarray(s, r.pos);
                                if (tC(t.subarray(0, e.length), e)) throw r.err(`array: inner element encoding same as separator. elm=${o} data=${t}`)
                            }
                            r.fieldPathPop()
                        }
                        r.path.pop(), tH(e) && r.bytes(e)
                    },
                    decodeStream: r => {
                        let n = [];
                        if (null === e) {
                            let e = 0;
                            for (r.path.push(n); !r.isEnd() && (r.fieldPathPush("" + e++), n.push(t.decodeStream(r)), r.fieldPathPop(), !t.size || !(r.leftBytes < t.size)););
                            r.path.pop()
                        } else if (tH(e)) {
                            let i = 0;
                            for (r.path.push(n);;) {
                                if (tC(r.bytes(e.length, !0), e)) {
                                    r.bytes(e.length);
                                    break
                                }
                                r.fieldPathPush("" + i++), n.push(t.decodeStream(r)), r.fieldPathPop()
                            }
                            r.path.pop()
                        } else {
                            r.fieldPathPush("arrayLen");
                            let i = r.length(e);
                            r.fieldPathPop(), r.path.push(n);
                            for (let e = 0; e < i; e++) r.fieldPathPush("" + e), n.push(t.decodeStream(r)), r.fieldPathPop();
                            r.path.pop()
                        }
                        return n
                    }
                })
            }
            t3(tU), t6(t2(0), tN); /*! scure-btc-signer - MIT License (c) 2022 Paul Miller (paulmillr.com) */
            let {
                ProjectivePoint: re,
                sign: rt,
                getPublicKey: rr
            } = ej, rn = ej.CURVE.n, ri = (e, t) => void 0 === e ? t : e, ro = e => tl(k(e)), rs = (...e) => k(k(ra(...e))), ra = tL, ru = tc(function(e, t) {
                if (tf(e), "function" != typeof t) throw Error("checksum fn should be function");
                return {
                    encode(r) {
                        if (!(r instanceof Uint8Array)) throw Error("checksum.encode: input should be Uint8Array");
                        let n = t(r).slice(0, e),
                            i = new Uint8Array(r.length + e);
                        return i.set(r), i.set(n, r.length), i
                    },
                    decode(r) {
                        if (!(r instanceof Uint8Array)) throw Error("checksum.decode: input should be Uint8Array");
                        let n = r.slice(0, -e),
                            i = t(n).slice(0, e),
                            o = r.slice(-e);
                        for (let t = 0; t < e; t++)
                            if (i[t] !== o[t]) throw Error("Invalid checksum");
                        return n
                    }
                }
            }(4, e => k(k(e))), t_);

            function rl(e) {
                if (Array.isArray(e)) return e.map(e => rl(e));
                if (e instanceof Uint8Array) return Uint8Array.from(e);
                if (["number", "bigint", "boolean", "string", "undefined"].includes(typeof e) || null === e) return e;
                if ("object" == typeof e) return Object.fromEntries(Object.entries(e).map(([e, t]) => [e, rl(t)]));
                throw Error(`cloneDeep: unknown type=${e} (${typeof e})`)
            }

            function rf(e, t) {
                let r = e.length;
                if (t === s.ecdsa) {
                    if (32 === r) throw Error("Expected non-Schnorr key");
                    return re.fromHex(e), e
                }
                if (t === s.schnorr) {
                    if (32 !== r) throw Error("Expected 32-byte Schnorr key");
                    return e0.utils.lift_x(e0.utils.bytesToNumberBE(e)), e
                }
                throw Error("Unknown key type")
            }

            function rc(e, t) {
                try {
                    return rf(e, t), !0
                } catch (e) {
                    return !1
                }
            }(n = s || (s = {}))[n.ecdsa = 0] = "ecdsa", n[n.schnorr = 1] = "schnorr";
            let rh = e => e.r < rn / 2 n;

            function rp(e, t) {
                let r = e0.utils,
                    n = r.taggedHash("TapTweak", e, t),
                    i = r.bytesToNumberBE(n);
                if (i >= rn) throw Error("tweak higher than curve order");
                return i
            }

            function rd(e, t) {
                let r = e0.utils,
                    n = rp(e, t),
                    i = r.lift_x(r.bytesToNumberBE(e)),
                    o = i.add(re.fromPrivateKey(n)),
                    s = o.hasEvenY() ? 0 : 1;
                return [r.pointToBytes(o), s]
            }
            let ry = t8(t2(null), e => rf(e, s.ecdsa)),
                rg = t8(t2(32), e => rf(e, s.schnorr)),
                rb = t8(t2(null), e => {
                    if (64 !== e.length && 65 !== e.length) throw Error("Schnorr signature should be 64 or 65 bytes long");
                    return e
                }),
                rm = {
                    bech32: "bc",
                    pubKeyHash: 0,
                    scriptHash: 5,
                    wif: 128
                },
                rw = new Uint8Array(32);

            function rE(e, t) {
                if (!tH(e) || !tH(t)) throw Error(`cmp: wrong type a=${typeof e} b=${typeof t}`);
                let r = Math.min(e.length, t.length);
                for (let n = 0; n < r; n++)
                    if (e[n] != t[n]) return Math.sign(e[n] - t[n]);
                return Math.sign(e.length - t.length)
            }
            t$.decimal(8), (i = a || (a = {}))[i.OP_0 = 0] = "OP_0", i[i.PUSHDATA1 = 76] = "PUSHDATA1", i[i.PUSHDATA2 = 77] = "PUSHDATA2", i[i.PUSHDATA4 = 78] = "PUSHDATA4", i[i["1NEGATE"] = 79] = "1NEGATE", i[i.RESERVED = 80] = "RESERVED", i[i.OP_1 = 81] = "OP_1", i[i.OP_2 = 82] = "OP_2", i[i.OP_3 = 83] = "OP_3", i[i.OP_4 = 84] = "OP_4", i[i.OP_5 = 85] = "OP_5", i[i.OP_6 = 86] = "OP_6", i[i.OP_7 = 87] = "OP_7", i[i.OP_8 = 88] = "OP_8", i[i.OP_9 = 89] = "OP_9", i[i.OP_10 = 90] = "OP_10", i[i.OP_11 = 91] = "OP_11", i[i.OP_12 = 92] = "OP_12", i[i.OP_13 = 93] = "OP_13", i[i.OP_14 = 94] = "OP_14", i[i.OP_15 = 95] = "OP_15", i[i.OP_16 = 96] = "OP_16", i[i.NOP = 97] = "NOP", i[i.VER = 98] = "VER", i[i.IF = 99] = "IF", i[i.NOTIF = 100] = "NOTIF", i[i.VERIF = 101] = "VERIF", i[i.VERNOTIF = 102] = "VERNOTIF", i[i.ELSE = 103] = "ELSE", i[i.ENDIF = 104] = "ENDIF", i[i.VERIFY = 105] = "VERIFY", i[i.RETURN = 106] = "RETURN", i[i.TOALTSTACK = 107] = "TOALTSTACK", i[i.FROMALTSTACK = 108] = "FROMALTSTACK", i[i["2DROP"] = 109] = "2DROP", i[i["2DUP"] = 110] = "2DUP", i[i["3DUP"] = 111] = "3DUP", i[i["2OVER"] = 112] = "2OVER", i[i["2ROT"] = 113] = "2ROT", i[i["2SWAP"] = 114] = "2SWAP", i[i.IFDUP = 115] = "IFDUP", i[i.DEPTH = 116] = "DEPTH", i[i.DROP = 117] = "DROP", i[i.DUP = 118] = "DUP", i[i.NIP = 119] = "NIP", i[i.OVER = 120] = "OVER", i[i.PICK = 121] = "PICK", i[i.ROLL = 122] = "ROLL", i[i.ROT = 123] = "ROT", i[i.SWAP = 124] = "SWAP", i[i.TUCK = 125] = "TUCK", i[i.CAT = 126] = "CAT", i[i.SUBSTR = 127] = "SUBSTR", i[i.LEFT = 128] = "LEFT", i[i.RIGHT = 129] = "RIGHT", i[i.SIZE = 130] = "SIZE", i[i.INVERT = 131] = "INVERT", i[i.AND = 132] = "AND", i[i.OR = 133] = "OR", i[i.XOR = 134] = "XOR", i[i.EQUAL = 135] = "EQUAL", i[i.EQUALVERIFY = 136] = "EQUALVERIFY", i[i.RESERVED1 = 137] = "RESERVED1", i[i.RESERVED2 = 138] = "RESERVED2", i[i["1ADD"] = 139] = "1ADD", i[i["1SUB"] = 140] = "1SUB", i[i["2MUL"] = 141] = "2MUL", i[i["2DIV"] = 142] = "2DIV", i[i.NEGATE = 143] = "NEGATE", i[i.ABS = 144] = "ABS", i[i.NOT = 145] = "NOT", i[i["0NOTEQUAL"] = 146] = "0NOTEQUAL", i[i.ADD = 147] = "ADD", i[i.SUB = 148] = "SUB", i[i.MUL = 149] = "MUL", i[i.DIV = 150] = "DIV", i[i.MOD = 151] = "MOD", i[i.LSHIFT = 152] = "LSHIFT", i[i.RSHIFT = 153] = "RSHIFT", i[i.BOOLAND = 154] = "BOOLAND", i[i.BOOLOR = 155] = "BOOLOR", i[i.NUMEQUAL = 156] = "NUMEQUAL", i[i.NUMEQUALVERIFY = 157] = "NUMEQUALVERIFY", i[i.NUMNOTEQUAL = 158] = "NUMNOTEQUAL", i[i.LESSTHAN = 159] = "LESSTHAN", i[i.GREATERTHAN = 160] = "GREATERTHAN", i[i.LESSTHANOREQUAL = 161] = "LESSTHANOREQUAL", i[i.GREATERTHANOREQUAL = 162] = "GREATERTHANOREQUAL", i[i.MIN = 163] = "MIN", i[i.MAX = 164] = "MAX", i[i.WITHIN = 165] = "WITHIN", i[i.RIPEMD160 = 166] = "RIPEMD160", i[i.SHA1 = 167] = "SHA1", i[i.SHA256 = 168] = "SHA256", i[i.HASH160 = 169] = "HASH160", i[i.HASH256 = 170] = "HASH256", i[i.CODESEPARATOR = 171] = "CODESEPARATOR", i[i.CHECKSIG = 172] = "CHECKSIG", i[i.CHECKSIGVERIFY = 173] = "CHECKSIGVERIFY", i[i.CHECKMULTISIG = 174] = "CHECKMULTISIG", i[i.CHECKMULTISIGVERIFY = 175] = "CHECKMULTISIGVERIFY", i[i.NOP1 = 176] = "NOP1", i[i.CHECKLOCKTIMEVERIFY = 177] = "CHECKLOCKTIMEVERIFY", i[i.CHECKSEQUENCEVERIFY = 178] = "CHECKSEQUENCEVERIFY", i[i.NOP4 = 179] = "NOP4", i[i.NOP5 = 180] = "NOP5", i[i.NOP6 = 181] = "NOP6", i[i.NOP7 = 182] = "NOP7", i[i.NOP8 = 183] = "NOP8", i[i.NOP9 = 184] = "NOP9", i[i.NOP10 = 185] = "NOP10", i[i.CHECKSIGADD = 186] = "CHECKSIGADD", i[i.INVALID = 255] = "INVALID";
            let rS = tW({
                encodeStream: (e, t) => {
                    for (let r of t) {
                        if ("string" == typeof r) {
                            if (void 0 === a[r]) throw Error(`Unknown opcode=${r}`);
                            e.byte(a[r]);
                            continue
                        }
                        if ("number" == typeof r) {
                            if (0 === r) {
                                e.byte(0);
                                continue
                            }
                            if (1 <= r && r <= 16) {
                                e.byte(a.OP_1 - 1 + r);
                                continue
                            }
                        }
                        if ("number" == typeof r && (r = rv().encode(BigInt(r))), !tH(r)) throw Error(`Wrong Script OP=${r} (${typeof r})`);
                        let t = r.length;
                        t < a.PUSHDATA1 ? e.byte(t) : t <= 255 ? (e.byte(a.PUSHDATA1), e.byte(t)) : t <= 65535 ? (e.byte(a.PUSHDATA2), e.bytes(t0.encode(t))) : (e.byte(a.PUSHDATA4), e.bytes(tJ.encode(t))), e.bytes(r)
                    }
                },
                decodeStream: e => {
                    let t = [];
                    for (; !e.isEnd();) {
                        let r = e.byte();
                        if (a.OP_0 < r && r <= a.PUSHDATA4) {
                            let n;
                            if (r < a.PUSHDATA1) n = r;
                            else if (r === a.PUSHDATA1) n = t1.decodeStream(e);
                            else if (r === a.PUSHDATA2) n = t0.decodeStream(e);
                            else if (r === a.PUSHDATA4) n = tJ.decodeStream(e);
                            else throw Error("Should be not possible");
                            t.push(e.bytes(n))
                        } else if (0 === r) t.push(0);
                        else if (a.OP_1 <= r && r <= a.OP_16) t.push(r - (a.OP_1 - 1));
                        else {
                            let e = a[r];
                            if (void 0 === e) throw Error(`Unknown opcode=${r.toString(16)}`);
                            t.push(e)
                        }
                    }
                    return t
                }
            });

            function rv(e = 6, t = !1) {
                return tW({
                    encodeStream: (e, t) => {
                        if (0 n === t) return;
                        let r = t < 0,
                            n = BigInt(t),
                            i = [];
                        for (let e = r ? -n : n; e; e >>= 8 n) i.push(Number(255 n & e));
                        i[i.length - 1] >= 128 ? i.push(r ? 128 : 0) : r && (i[i.length - 1] |= 128), e.bytes(new Uint8Array(i))
                    },
                    decodeStream: r => {
                        let n = r.leftBytes;
                        if (n > e) throw Error(`ScriptNum: number (${n}) bigger than limit=${e}`);
                        if (0 === n) return 0 n;
                        if (t && (127 & r.data[n - 1]) == 0 && (n <= 1 || (128 & r.data[n - 2]) == 0)) throw Error("Non-minimally encoded ScriptNum");
                        let i = 0,
                            o = 0 n;
                        for (let e = 0; e < n; ++e) o |= BigInt(i = r.byte()) << 8 n * BigInt(e);
                        return i >= 128 && (o &= 2 n ** BigInt(8 * n) - 1 n >> 1 n, o = -o), o
                    }
                })
            }
            let r_ = {
                    253: [253, 2, 253 n, 65535 n],
                    254: [254, 4, 65536 n, 4294967295 n],
                    255: [255, 8, 4294967296 n, 0xffffffffffffffff n]
                },
                rT = tW({
                    encodeStream: (e, t) => {
                        if ("number" == typeof t && (t = BigInt(t)), 0 n <= t && t <= 252 n) return e.byte(Number(t));
                        for (let [r, n, i, o] of Object.values(r_))
                            if (!(i > t) && !(t > o)) {
                                e.byte(r);
                                for (let r = 0; r < n; r++) e.byte(Number(t >> 8 n * BigInt(r) & 255 n));
                                return
                            }
                        throw e.err(`VarInt too big: ${t}`)
                    },
                    decodeStream: e => {
                        let t = e.byte();
                        if (t <= 252) return BigInt(t);
                        let [r, n, i] = r_[t], o = 0 n;
                        for (let t = 0; t < n; t++) o |= BigInt(e.byte()) << 8 n * BigInt(t);
                        if (o < i) throw e.err(`Wrong CompactSize(${8*n})`);
                        return o
                    }
                }),
                rA = t4(rT, t$.number),
                rO = e => t7(rT, e),
                rI = t2(rT),
                rP = t9({
                    txid: t2(32, !0),
                    index: tJ,
                    finalScriptSig: rI,
                    sequence: tJ
                }),
                rk = t9({
                    amount: tz,
                    script: rI
                }),
                rx = {
                    amount: 0xffffffffffffffff n,
                    script: tN
                },
                rR = t7(rA, rI),
                rB = t9({
                    version: tQ,
                    segwitFlag: ((e, t = !1) => tW({
                        size: e.length,
                        encodeStream: (r, n) => {
                            !!n !== t && r.bytes(e)
                        },
                        decodeStream: r => {
                            let n = r.leftBytes >= e.length;
                            return n && (n = tC(r.bytes(e.length, !0), e)) && r.bytes(e.length), n !== t
                        }
                    }))(new Uint8Array([0, 1])),
                    inputs: rO(rP),
                    outputs: rO(rk),
                    witnesses: function(e, t, r) {
                        if (!tK(t)) throw Error(`flagged: invalid inner value ${t}`);
                        return tW({
                            encodeStream: (n, i) => {
                                "string" == typeof e ? tV(n.path, e.split("/")) ? t.encodeStream(n, i) : r && t.encodeStream(n, r) : (e.encodeStream(n, !!i), i ? t.encodeStream(n, i) : r && t.encodeStream(n, r))
                            },
                            decodeStream: n => {
                                if ("string" == typeof e ? tV(n.path, e.split("/")) : e.decodeStream(n)) return t.decodeStream(n);
                                r && t.decodeStream(n)
                            }
                        })
                    }("segwitFlag", t7("inputs/length", rR)),
                    lockTime: tJ
                }),
                rN = t8(rB, function(e) {
                    if (e.segwitFlag && e.witnesses && !e.witnesses.length) throw Error("Segwit flag with empty witnesses array");
                    return e
                });

            function rU(e) {
                let [t, r, n, i, o, s] = e;
                return {
                    type: t,
                    kc: r,
                    vc: n,
                    reqInc: i,
                    allowInc: o,
                    silentIgnore: s
                }
            }
            let rC = t9({
                    fingerprint: tZ,
                    path: t7(null, tJ)
                }),
                rL = t9({
                    version: t1,
                    internalKey: t2(32),
                    merklePath: t7(null, t2(32))
                }),
                rH = t8(rL, e => {
                    if (e.merklePath.length > 128) throw Error("TaprootControlBlock: merklePath should be of length 0..128 (inclusive)");
                    return e
                }),
                rj = t9({
                    hashes: t7(rA, t2(32)),
                    der: rC
                }),
                rD = t2(78),
                rM = t9({
                    pubKey: rg,
                    leafHash: t2(32)
                }),
                rF = t7(null, t9({
                    depth: t1,
                    version: t1,
                    script: rI
                })),
                rW = t2(null),
                rV = t2(20),
                rK = t2(32),
                r$ = {
                    unsignedTx: [0, !1, rN, [0],
                        [0], !1
                    ],
                    xpub: [1, rD, rC, [],
                        [0, 2], !1
                    ],
                    txVersion: [2, !1, tJ, [2],
                        [2], !1
                    ],
                    fallbackLocktime: [3, !1, tJ, [],
                        [2], !1
                    ],
                    inputCount: [4, !1, rA, [2],
                        [2], !1
                    ],
                    outputCount: [5, !1, rA, [2],
                        [2], !1
                    ],
                    txModifiable: [6, !1, t1, [],
                        [2], !1
                    ],
                    version: [251, !1, tJ, [],
                        [0, 2], !1
                    ],
                    proprietary: [252, rW, rW, [],
                        [0, 2], !1
                    ]
                },
                rq = {
                    nonWitnessUtxo: [0, !1, rN, [],
                        [0, 2], !1
                    ],
                    witnessUtxo: [1, !1, rk, [],
                        [0, 2], !1
                    ],
                    partialSig: [2, ry, rW, [],
                        [0, 2], !1
                    ],
                    sighashType: [3, !1, tJ, [],
                        [0, 2], !1
                    ],
                    redeemScript: [4, !1, rW, [],
                        [0, 2], !1
                    ],
                    witnessScript: [5, !1, rW, [],
                        [0, 2], !1
                    ],
                    bip32Derivation: [6, ry, rC, [],
                        [0, 2], !1
                    ],
                    finalScriptSig: [7, !1, rW, [],
                        [0, 2], !1
                    ],
                    finalScriptWitness: [8, !1, rR, [],
                        [0, 2], !1
                    ],
                    porCommitment: [9, !1, rW, [],
                        [0, 2], !1
                    ],
                    ripemd160: [10, rV, rW, [],
                        [0, 2], !1
                    ],
                    sha256: [11, rK, rW, [],
                        [0, 2], !1
                    ],
                    hash160: [12, rV, rW, [],
                        [0, 2], !1
                    ],
                    hash256: [13, rK, rW, [],
                        [0, 2], !1
                    ],
                    txid: [14, !1, rK, [2],
                        [2], !0
                    ],
                    index: [15, !1, tJ, [2],
                        [2], !0
                    ],
                    sequence: [16, !1, tJ, [],
                        [2], !0
                    ],
                    requiredTimeLocktime: [17, !1, tJ, [],
                        [2], !1
                    ],
                    requiredHeightLocktime: [18, !1, tJ, [],
                        [2], !1
                    ],
                    tapKeySig: [19, !1, rb, [],
                        [0, 2], !1
                    ],
                    tapScriptSig: [20, rM, rb, [],
                        [0, 2], !1
                    ],
                    tapLeafScript: [21, rH, rW, [],
                        [0, 2], !1
                    ],
                    tapBip32Derivation: [22, rK, rj, [],
                        [0, 2], !1
                    ],
                    tapInternalKey: [23, !1, rg, [],
                        [0, 2], !1
                    ],
                    tapMerkleRoot: [24, !1, rK, [],
                        [0, 2], !1
                    ],
                    proprietary: [252, rW, rW, [],
                        [0, 2], !1
                    ]
                },
                rG = ["txid", "sequence", "index", "witnessUtxo", "nonWitnessUtxo", "finalScriptSig", "finalScriptWitness", "unknown"],
                rz = ["partialSig", "finalScriptSig", "finalScriptWitness", "tapKeySig", "tapScriptSig"],
                rX = {
                    redeemScript: [0, !1, rW, [],
                        [0, 2], !1
                    ],
                    witnessScript: [1, !1, rW, [],
                        [0, 2], !1
                    ],
                    bip32Derivation: [2, ry, rC, [],
                        [0, 2], !1
                    ],
                    amount: [3, !1, tX, [2],
                        [2], !0
                    ],
                    script: [4, !1, rW, [2],
                        [2], !0
                    ],
                    tapInternalKey: [5, !1, rg, [],
                        [0, 2], !1
                    ],
                    tapTree: [6, !1, rF, [],
                        [0, 2], !1
                    ],
                    tapBip32Derivation: [7, rg, rj, [],
                        [0, 2], !1
                    ],
                    proprietary: [252, rW, rW, [],
                        [0, 2], !1
                    ]
                },
                rY = [],
                rJ = t7(tU, t9({
                    key: function(e, t) {
                        if (!tK(t)) throw Error(`prefix: invalid inner value ${t}`);
                        if (tH(e)) throw Error("prefix: len cannot be Uint8Array");
                        let r = t2(e);
                        return tW({
                            size: "number" == typeof e ? e : void 0,
                            encodeStream: (e, n) => {
                                let i = new tD(e.path, e.fieldPath);
                                t.encodeStream(i, n), r.encodeStream(e, i.buffer)
                            },
                            decodeStream: e => {
                                let n = r.decodeStream(e);
                                return t.decodeStream(new tj(n, e.path, e.fieldPath))
                            }
                        })
                    }(rA, t9({
                        type: rA,
                        key: t2(null)
                    })),
                    value: t2(rA)
                }));

            function rZ(e) {
                let t = {};
                for (let r in e) {
                    let [n, i, o] = e[r];
                    t[n] = [r, i, o]
                }
                return tW({
                    encodeStream: (t, r) => {
                        let n = [];
                        for (let t in e) {
                            let i = r[t];
                            if (void 0 === i) continue;
                            let [o, s, a] = e[t];
                            if (s) {
                                let e = i.map(([e, t]) => [s.encode(e), a.encode(t)]);
                                for (let [t, r] of (e.sort((e, t) => rE(e[0], t[0])), e)) n.push({
                                    key: {
                                        key: t,
                                        type: o
                                    },
                                    value: r
                                })
                            } else n.push({
                                key: {
                                    type: o,
                                    key: tN
                                },
                                value: a.encode(i)
                            })
                        }
                        if (r.unknown)
                            for (let [e, t] of (r.unknown.sort((e, t) => rE(e[0].key, t[0].key)), r.unknown)) n.push({
                                key: e,
                                value: t
                            });
                        rJ.encodeStream(t, n)
                    },
                    decodeStream: e => {
                        let r = rJ.decodeStream(e),
                            n = {},
                            i = {};
                        for (let e of r) {
                            let r = "unknown",
                                o = e.key.key,
                                s = e.value;
                            if (t[e.key.type]) {
                                let [a, u, l] = t[e.key.type];
                                if (r = a, !u && o.length) throw Error(`PSBT: Non-empty key for ${r} (key=${tB.encode(o)} value=${tB.encode(s)}`);
                                if (o = u ? u.decode(o) : void 0, s = l.decode(s), !u) {
                                    if (n[r]) throw Error(`PSBT: Same keys: ${r} (key=${o} value=${s})`);
                                    n[r] = s, i[r] = !0;
                                    continue
                                }
                            } else o = {
                                type: e.key.type,
                                key: e.key.key
                            };
                            if (i[r]) throw Error(`PSBT: Key type with empty key and no key=${r} val=${s}`);
                            n[r] || (n[r] = []), n[r].push([o, s])
                        }
                        return n
                    }
                })
            }

            function rQ(e, t) {
                if (!tC(e.hash, k(t))) throw Error("checkScript: wsh wrong witnessScript hash");
                let r = na.decode(t);
                if ("tr" === r.type || "tr_ns" === r.type || "tr_ms" === r.type) throw Error(`checkScript: P2${r.type} cannot be wrapped in P2SH`);
                if ("wpkh" === r.type || "sh" === r.type) throw Error(`checkScript: P2${r.type} cannot be wrapped in P2WSH`)
            }

            function r0(e, t, r) {
                if (e) {
                    let n = na.decode(e);
                    if ("tr_ns" === n.type || "tr_ms" === n.type || "ms" === n.type || "pk" == n.type) throw Error(`checkScript: non-wrapped ${n.type}`);
                    if ("sh" === n.type && t) {
                        if (!tC(n.hash, ro(t))) throw Error("checkScript: sh wrong redeemScript hash");
                        let e = na.decode(t);
                        if ("tr" === e.type || "tr_ns" === e.type || "tr_ms" === e.type) throw Error(`checkScript: P2${e.type} cannot be wrapped in P2SH`);
                        if ("sh" === e.type) throw Error("checkScript: P2SH cannot be wrapped in P2SH")
                    }
                    "wsh" === n.type && r && rQ(n, r)
                }
                if (t) {
                    let e = na.decode(t);
                    "wsh" === e.type && r && rQ(e, r)
                }
            }
            t9({
                type: rA,
                key: t2(null)
            });
            let r1 = t8(rZ(rq), e => {
                    if (e.finalScriptWitness && !e.finalScriptWitness.length) throw Error("validateInput: wmpty finalScriptWitness");
                    if (e.partialSig && !e.partialSig.length) throw Error("Empty partialSig");
                    if (e.partialSig)
                        for (let [t, r] of e.partialSig) rf(t, s.ecdsa);
                    if (e.bip32Derivation)
                        for (let [t, r] of e.bip32Derivation) rf(t, s.ecdsa);
                    if (void 0 !== e.requiredTimeLocktime && e.requiredTimeLocktime < 5e8) throw Error(`validateInput: wrong timeLocktime=${e.requiredTimeLocktime}`);
                    if (void 0 !== e.requiredHeightLocktime && (e.requiredHeightLocktime <= 0 || e.requiredHeightLocktime >= 5e8)) throw Error(`validateInput: wrong heighLocktime=${e.requiredHeightLocktime}`);
                    if (e.nonWitnessUtxo && void 0 !== e.index) {
                        let t = e.nonWitnessUtxo.outputs.length - 1;
                        if (e.index > t) throw Error(`validateInput: index(${e.index}) not in nonWitnessUtxo`);
                        let r = e.nonWitnessUtxo.outputs[e.index];
                        if (e.witnessUtxo && (!tC(e.witnessUtxo.script, r.script) || e.witnessUtxo.amount !== r.amount)) throw Error("validateInput: witnessUtxo different from nonWitnessUtxo")
                    }
                    if (e.tapLeafScript)
                        for (let [t, r] of e.tapLeafScript) {
                            if ((254 & t.version) !== r[r.length - 1]) throw Error("validateInput: tapLeafScript version mimatch");
                            if (1 & r[r.length - 1]) throw Error("validateInput: tapLeafScript version has parity bit!")
                        }
                    if (e.nonWitnessUtxo && e.index && e.txid) {
                        let t = e.nonWitnessUtxo.outputs;
                        if (t.length - 1 < e.index) throw Error("nonWitnessUtxo: incorect output index");
                        let r = nE.fromRaw(rN.encode(e.nonWitnessUtxo)),
                            n = tB.encode(e.txid);
                        if (r.id !== n) throw Error(`nonWitnessUtxo: wrong txid, exp=${n} got=${r.id}`)
                    }
                    return e
                }),
                r2 = t8(rZ(rX), e => {
                    if (e.bip32Derivation)
                        for (let [t, r] of e.bip32Derivation) rf(t, s.ecdsa);
                    return e
                }),
                r3 = t8(rZ(r$), e => {
                    let t = e.version || 0;
                    if (0 === t) {
                        if (!e.unsignedTx) throw Error("PSBTv0: missing unsignedTx");
                        if (e.unsignedTx.segwitFlag || e.unsignedTx.witnesses) throw Error("PSBTv0: witness in unsingedTx");
                        for (let t of e.unsignedTx.inputs)
                            if (t.finalScriptSig && t.finalScriptSig.length) throw Error("PSBTv0: input scriptSig found in unsignedTx")
                    }
                    return e
                }),
                r4 = t9({
                    magic: t6(t3(new Uint8Array([255])), "psbt"),
                    global: r3,
                    inputs: t7("global/unsignedTx/inputs/length", r1),
                    outputs: t7(null, r2)
                }),
                r8 = t9({
                    magic: t6(t3(new Uint8Array([255])), "psbt"),
                    global: r3,
                    inputs: t7("global/inputCount", r1),
                    outputs: t7("global/outputCount", r2)
                });

            function r6(e, t, r) {
                for (let n in r) {
                    if ("unknown" === n || !t[n]) continue;
                    let {
                        allowInc: r
                    } = rU(t[n]);
                    if (!r.includes(e)) throw Error(`PSBTv${e}: field ${n} is not allowed`)
                }
                for (let n in t) {
                    let {
                        reqInc: i
                    } = rU(t[n]);
                    if (i.includes(e) && void 0 === r[n]) throw Error(`PSBTv${e}: missing required field ${n}`)
                }
            }

            function r5(e, t, r) {
                let n = {};
                for (let i in r) {
                    let o = i;
                    if ("unknown" !== o) {
                        if (!t[o]) continue;
                        let {
                            allowInc: r,
                            silentIgnore: n
                        } = rU(t[o]);
                        if (!r.includes(e)) {
                            if (n) continue;
                            throw Error(`Failed to serialize in PSBTv${e}: ${o} but versions allows inclusion=${r}`)
                        }
                    }
                    n[o] = r[o]
                }
                return n
            }

            function r9(e) {
                let t = e && e.global && e.global.version || 0;
                for (let r of (r6(t, r$, e.global), e.inputs)) r6(t, rq, r);
                for (let r of e.outputs) r6(t, rX, r);
                let r = t ? e.global.inputCount : e.global.unsignedTx.inputs.length;
                if (e.inputs.length < r) throw Error("Not enough inputs");
                let n = e.inputs.slice(r);
                if (n.length > 1 || n.length && Object.keys(n[0]).length) throw Error(`Unexpected inputs left in tx=${n}`);
                let i = t ? e.global.outputCount : e.global.unsignedTx.outputs.length;
                if (e.outputs.length < i) throw Error("Not outputs inputs");
                let o = e.outputs.slice(i);
                if (o.length > 1 || o.length && Object.keys(o[0]).length) throw Error(`Unexpected outputs left in tx=${o}`);
                return e
            }

            function r7(e, t, r, n) {
                let i = { ...r,
                    ...t
                };
                for (let o in e) {
                    let s = o,
                        [a, u, l] = e[s],
                        f = n && !n.includes(o);
                    if (void 0 === t[o] && o in t) {
                        if (f) throw Error(`Cannot remove signed field=${o}`);
                        delete i[o]
                    } else if (u) {
                        let e = r && r[o] ? r[o] : [],
                            n = t[s];
                        if (n) {
                            if (!Array.isArray(n)) throw Error(`keyMap(${o}): KV pairs should be [k, v][]`);
                            n = n.map(e => {
                                if (2 !== e.length) throw Error(`keyMap(${o}): KV pairs should be [k, v][]`);
                                return ["string" == typeof e[0] ? u.decode(tB.decode(e[0])) : e[0], "string" == typeof e[1] ? l.decode(tB.decode(e[1])) : e[1]]
                            });
                            let t = {},
                                r = (e, r, n) => {
                                    if (void 0 === t[e]) {
                                        t[e] = [r, n];
                                        return
                                    }
                                    let i = tB.encode(l.encode(t[e][1])),
                                        o = tB.encode(l.encode(n));
                                    if (i !== o) throw Error(`keyMap(${s}): same key=${e} oldVal=${i} newVal=${o}`)
                                };
                            for (let [t, n] of e) {
                                let e = tB.encode(u.encode(t));
                                r(e, t, n)
                            }
                            for (let [e, i] of n) {
                                let n = tB.encode(u.encode(e));
                                if (void 0 === i) {
                                    if (f) throw Error(`Cannot remove signed field=${s}/${e}`);
                                    delete t[n]
                                } else r(n, e, i)
                            }
                            i[s] = Object.values(t)
                        }
                    } else if ("string" == typeof i[o]) i[o] = l.decode(tB.decode(i[o]));
                    else if (f && o in t && r && void 0 !== r[o] && !tC(l.encode(t[o]), l.encode(r[o]))) throw Error(`Cannot change signed field=${o}`)
                }
                for (let t in i) e[t] || delete i[t];
                return i
            }
            t9({
                magic: t6(t3(new Uint8Array([255])), "psbt"),
                items: t7(null, t4(t7(tU, function(e) {
                    if (!Array.isArray(e)) throw Error(`Packed.Tuple: got ${typeof e} instead of array`);
                    return tW({
                        size: t5(e),
                        encodeStream: (t, r) => {
                            if (!Array.isArray(r)) throw t.err(`tuple: invalid value ${r}`);
                            t.path.push(r);
                            for (let n = 0; n < e.length; n++) t.fieldPathPush("" + n), e[n].encodeStream(t, r[n]), t.fieldPathPop();
                            t.path.pop()
                        },
                        decodeStream: t => {
                            let r = [];
                            t.path.push(r);
                            for (let n = 0; n < e.length; n++) t.fieldPathPush("" + n), r.push(e[n].decodeStream(t)), t.fieldPathPop();
                            return t.path.pop(), r
                        }
                    })
                }([((e, t = !1, r = !1) => {
                    let n = t2(e, t);
                    return tW({
                        size: n.size,
                        encodeStream: (e, t) => {
                            if (r && !t.startsWith("0x")) throw Error("hex(withZero=true).encode input should start with 0x");
                            let i = tB.decode(r ? t.slice(2) : t);
                            return n.encodeStream(e, i)
                        },
                        decodeStream: e => (r ? "0x" : "") + tB.encode(n.decodeStream(e))
                    })
                })(rA), t2(rT)])), t$.dict()))
            });
            let ne = t8(r4, r9),
                nt = t8(r8, r9),
                nr = t9({
                    txid: t2(32, !0),
                    index: tJ
                }),
                nn = k(re.BASE.toRawBytes(!1));

            function ni(e, t, r = rm, n = !1) {
                let i, o;
                if (!e && !t) throw Error("p2tr: should have pubKey or scriptTree (or both)");
                let a = "string" == typeof e ? tB.decode(e) : e || nn;
                if (!rc(a, s.schnorr)) throw Error("p2tr: non-schnorr pubkey");
                let u = t ? function e(t, r = []) {
                        if (!t) throw Error("taprootAddPath: empty tree");
                        if ("leaf" === t.type) return { ...t,
                            path: r
                        };
                        if ("branch" !== t.type) throw Error(`taprootAddPath: wrong type=${t}`);
                        return { ...t,
                            path: r,
                            left: e(t.left, [t.right.hash, ...r]),
                            right: e(t.right, [t.left.hash, ...r])
                        }
                    }(function e(t, r = !1) {
                        if (!t) throw Error("taprootHashTree: empty tree");
                        if (Array.isArray(t) && 1 === t.length && (t = t[0]), !Array.isArray(t)) {
                            let {
                                leafVersion: e,
                                script: n,
                                tapInternalKey: i
                            } = t;
                            if (t.tapLeafScript || t.tapMerkleRoot && !tC(t.tapMerkleRoot, tN)) throw Error("P2TR: tapRoot leafScript cannot have tree");
                            if (i && tC(i, nn)) throw Error("P2TR: tapRoot leafScript cannot have unspendble key");
                            let o = "string" == typeof n ? tB.decode(n) : n;
                            if (!tH(o)) throw Error(`checkScript: wrong script type=${o}`);
                            return ! function(e, t = !1) {
                                let r = na.decode(e);
                                if (("unknown" !== r.type || !t) && !["tr_ns", "tr_ms"].includes(r.type)) throw Error(`P2TR: invalid leaf script=${r.type}`)
                            }(o, r), {
                                type: "leaf",
                                tapInternalKey: i,
                                version: e,
                                script: o,
                                hash: nb(o, e)
                            }
                        }
                        if (2 !== t.length && (t = function(e) {
                                let t = Array.from(e);
                                for (; t.length >= 2;) {
                                    t.sort((e, t) => (t.weight || 1) - (e.weight || 1));
                                    let e = t.pop(),
                                        r = t.pop(),
                                        n = (r ? .weight || 1) + (e ? .weight || 1);
                                    t.push({
                                        weight: n,
                                        childs: [r ? .childs || r, e ? .childs || e]
                                    })
                                }
                                let r = t[0];
                                return r ? .childs || r
                            }(t)), 2 !== t.length) throw Error("hashTree: non binary tree!");
                        let n = e(t[0], r),
                            i = e(t[1], r),
                            [o, s] = [n.hash, i.hash];
                        return -1 === rE(s, o) && ([o, s] = [s, o]), {
                            type: "branch",
                            left: n,
                            right: i,
                            hash: e0.utils.taggedHash("TapBranch", o, s)
                        }
                    }(t, n)) : void 0,
                    l = u ? u.hash : void 0,
                    [f, c] = rd(a, l || tN);
                u && (i = (function e(t) {
                    if (!t) throw Error("taprootAddPath: empty tree");
                    if ("leaf" === t.type) return [t];
                    if ("branch" !== t.type) throw Error(`taprootWalkTree: wrong type=${t}`);
                    return [...e(t.left), ...e(t.right)]
                })(u).map(e => ({ ...e,
                    controlBlock: rH.encode({
                        version: (e.version || ng) + c,
                        internalKey: e.tapInternalKey || a,
                        merklePath: e.path
                    })
                }))), i && (o = i.map(e => [rH.decode(e.controlBlock), ra(e.script, new Uint8Array([e.version || ng]))]));
                let h = {
                    type: "tr",
                    script: na.encode({
                        type: "tr",
                        pubkey: f
                    }),
                    address: nc(r).encode({
                        type: "tr",
                        pubkey: f
                    }),
                    tweakedPubkey: f,
                    tapInternalKey: a
                };
                return i && (h.leaves = i), o && (h.tapLeafScript = o), l && (h.tapMerkleRoot = l), h
            }
            let no = [{
                    encode(e) {
                        if (2 === e.length && tH(e[0]) && rc(e[0], s.ecdsa) && "CHECKSIG" === e[1]) return {
                            type: "pk",
                            pubkey: e[0]
                        }
                    },
                    decode: e => "pk" === e.type ? [e.pubkey, "CHECKSIG"] : void 0
                }, {
                    encode(e) {
                        if (5 === e.length && "DUP" === e[0] && "HASH160" === e[1] && tH(e[2]) && "EQUALVERIFY" === e[3] && "CHECKSIG" === e[4]) return {
                            type: "pkh",
                            hash: e[2]
                        }
                    },
                    decode: e => "pkh" === e.type ? ["DUP", "HASH160", e.hash, "EQUALVERIFY", "CHECKSIG"] : void 0
                }, {
                    encode(e) {
                        if (3 === e.length && "HASH160" === e[0] && tH(e[1]) && "EQUAL" === e[2]) return {
                            type: "sh",
                            hash: e[1]
                        }
                    },
                    decode: e => "sh" === e.type ? ["HASH160", e.hash, "EQUAL"] : void 0
                }, {
                    encode(e) {
                        if (2 === e.length && 0 === e[0] && tH(e[1]) && 32 === e[1].length) return {
                            type: "wsh",
                            hash: e[1]
                        }
                    },
                    decode: e => "wsh" === e.type ? [0, e.hash] : void 0
                }, {
                    encode(e) {
                        if (2 === e.length && 0 === e[0] && tH(e[1]) && 20 === e[1].length) return {
                            type: "wpkh",
                            hash: e[1]
                        }
                    },
                    decode: e => "wpkh" === e.type ? [0, e.hash] : void 0
                }, {
                    encode(e) {
                        let t = e.length - 1;
                        if ("CHECKMULTISIG" !== e[t]) return;
                        let r = e[0],
                            n = e[t - 1];
                        if ("number" != typeof r || "number" != typeof n) return;
                        let i = e.slice(1, -2);
                        if (n === i.length) {
                            for (let e of i)
                                if (!tH(e)) return;
                            return {
                                type: "ms",
                                m: r,
                                pubkeys: i
                            }
                        }
                    },
                    decode: e => "ms" === e.type ? [e.m, ...e.pubkeys, e.pubkeys.length, "CHECKMULTISIG"] : void 0
                }, {
                    encode(e) {
                        if (2 === e.length && 1 === e[0] && tH(e[1])) return {
                            type: "tr",
                            pubkey: e[1]
                        }
                    },
                    decode: e => "tr" === e.type ? [1, e.pubkey] : void 0
                }, {
                    encode(e) {
                        let t = e.length - 1;
                        if ("CHECKSIG" !== e[t]) return;
                        let r = [];
                        for (let n = 0; n < t; n++) {
                            let i = e[n];
                            if (1 & n) {
                                if ("CHECKSIGVERIFY" !== i || n === t - 1) return;
                                continue
                            }
                            if (!tH(i)) return;
                            r.push(i)
                        }
                        return {
                            type: "tr_ns",
                            pubkeys: r
                        }
                    },
                    decode: e => {
                        if ("tr_ns" !== e.type) return;
                        let t = [];
                        for (let r = 0; r < e.pubkeys.length - 1; r++) t.push(e.pubkeys[r], "CHECKSIGVERIFY");
                        return t.push(e.pubkeys[e.pubkeys.length - 1], "CHECKSIG"), t
                    }
                }, {
                    encode(e) {
                        let t = e.length - 1;
                        if ("NUMEQUAL" !== e[t] || "CHECKSIG" !== e[1]) return;
                        let r = [],
                            n = function(e, t = 4, r = !0) {
                                if ("number" == typeof e) return e;
                                if (tH(e)) try {
                                    let n = rv(t, r).decode(e);
                                    if (n > Number.MAX_SAFE_INTEGER) return;
                                    return Number(n)
                                } catch (e) {
                                    return
                                }
                            }(e[t - 1]);
                        if ("number" == typeof n) {
                            for (let n = 0; n < t - 1; n++) {
                                let t = e[n];
                                if (1 & n) {
                                    if (t !== (1 === n ? "CHECKSIG" : "CHECKSIGADD")) throw Error("OutScript.encode/tr_ms: wrong element");
                                    continue
                                }
                                if (!tH(t)) throw Error("OutScript.encode/tr_ms: wrong key element");
                                r.push(t)
                            }
                            return {
                                type: "tr_ms",
                                pubkeys: r,
                                m: n
                            }
                        }
                    },
                    decode: e => {
                        if ("tr_ms" !== e.type) return;
                        let t = [e.pubkeys[0], "CHECKSIG"];
                        for (let r = 1; r < e.pubkeys.length; r++) t.push(e.pubkeys[r], "CHECKSIGADD");
                        return t.push(e.m, "NUMEQUAL"), t
                    }
                }, {
                    encode: e => ({
                        type: "unknown",
                        script: rS.encode(e)
                    }),
                    decode: e => "unknown" === e.type ? rS.decode(e.script) : void 0
                }],
                ns = t4(rS, t$.match(no)),
                na = t8(ns, e => {
                    if ("pk" === e.type && !rc(e.pubkey, s.ecdsa)) throw Error("OutScript/pk: wrong key");
                    if (("pkh" === e.type || "sh" === e.type || "wpkh" === e.type) && (!tH(e.hash) || 20 !== e.hash.length)) throw Error(`OutScript/${e.type}: wrong hash`);
                    if ("wsh" === e.type && (!tH(e.hash) || 32 !== e.hash.length)) throw Error("OutScript/wsh: wrong hash");
                    if ("tr" === e.type && (!tH(e.pubkey) || !rc(e.pubkey, s.schnorr))) throw Error("OutScript/tr: wrong taproot public key");
                    if (("ms" === e.type || "tr_ns" === e.type || "tr_ms" === e.type) && !Array.isArray(e.pubkeys)) throw Error("OutScript/multisig: wrong pubkeys array");
                    if ("ms" === e.type) {
                        let t = e.pubkeys.length;
                        for (let t of e.pubkeys)
                            if (!rc(t, s.ecdsa)) throw Error("OutScript/multisig: wrong pubkey");
                        if (e.m <= 0 || t > 16 || e.m > t) throw Error("OutScript/multisig: invalid params")
                    }
                    if ("tr_ns" === e.type || "tr_ms" === e.type) {
                        for (let t of e.pubkeys)
                            if (!rc(t, s.schnorr)) throw Error(`OutScript/${e.type}: wrong pubkey`)
                    }
                    if ("tr_ms" === e.type) {
                        let t = e.pubkeys.length;
                        if (e.m <= 0 || t > 999 || e.m > t) throw Error("OutScript/tr_ms: invalid params")
                    }
                    return e
                });

            function nu(e, t) {
                if (t.length < 2 || t.length > 40) throw Error("Witness: invalid length");
                if (e > 16) throw Error("Witness: invalid version");
                if (0 === e && !(20 === t.length || 32 === t.length)) throw Error("Witness: invalid length for version")
            }

            function nl(e, t, r = rm) {
                nu(e, t);
                let n = 0 === e ? tk : tx;
                return n.encode(r.bech32, [e].concat(n.toWords(t)))
            }

            function nf(e, t) {
                return ru.encode(ra(Uint8Array.from(t), e))
            }

            function nc(e = rm) {
                return {
                    encode(t) {
                        let {
                            type: r
                        } = t;
                        if ("wpkh" === r || "wsh" === r) return nl(0, t.hash, e);
                        if ("tr" === r) return nl(1, t.pubkey, e);
                        if ("pkh" === r) return nf(t.hash, [e.pubKeyHash]);
                        if ("sh" === r) return nf(t.hash, [e.scriptHash]);
                        throw Error(`Unknown address type=${r}`)
                    },
                    decode(t) {
                        if (t.length < 14 || t.length > 74) throw Error("Invalid address length");
                        if (e.bech32 && t.toLowerCase().startsWith(e.bech32)) {
                            let r;
                            try {
                                if (r = tk.decode(t), 0 !== r.words[0]) throw Error(`bech32: wrong version=${r.words[0]}`)
                            } catch (e) {
                                if (0 === (r = tx.decode(t)).words[0]) throw Error(`bech32m: wrong version=${r.words[0]}`)
                            }
                            if (r.prefix !== e.bech32) throw Error(`wrong bech32 prefix=${r.prefix}`);
                            let [n, ...i] = r.words, o = tk.fromWords(i);
                            if (nu(n, o), 0 === n && 32 === o.length) return {
                                type: "wsh",
                                hash: o
                            };
                            if (0 === n && 20 === o.length) return {
                                type: "wpkh",
                                hash: o
                            };
                            if (1 === n && 32 === o.length) return {
                                type: "tr",
                                pubkey: o
                            };
                            throw Error("Unkown witness program")
                        }
                        let r = t_.decode(t);
                        if (25 !== r.length) throw Error("Invalid base58 address");
                        if (r[0] === e.pubKeyHash) {
                            let e = t_.decode(t);
                            return {
                                type: "pkh",
                                hash: e.slice(1, e.length - 4)
                            }
                        }
                        if (r[0] === e.scriptHash) {
                            let e = t_.decode(t);
                            return {
                                type: "sh",
                                hash: t_.decode(t).slice(1, e.length - 4)
                            }
                        }
                        throw Error(`Invalid address prefix=${r[0]}`)
                    }
                }
            }

            function nh(e) {
                let t = 31 & e;
                return {
                    isAny: !!(e & u.ANYONECANPAY),
                    isNone: t === u.NONE,
                    isSingle: t === u.SINGLE
                }
            }

            function np(e) {
                if (void 0 === e.txid || void 0 === e.index) throw Error("Transaction/input: txid and index required");
                return {
                    txid: e.txid,
                    index: e.index,
                    sequence: ri(e.sequence, 4294967295),
                    finalScriptSig: ri(e.finalScriptSig, tN)
                }
            }

            function nd(e) {
                for (let t in e) {
                    let r = t;
                    rG.includes(r) || delete e[r]
                }
            }

            function ny(e) {
                if (void 0 === e.script || void 0 === e.amount) throw Error("Transaction/output: script and amount required");
                return {
                    script: e.script,
                    amount: e.amount
                }
            }(o = u || (u = {}))[o.DEFAULT = 0] = "DEFAULT", o[o.ALL = 1] = "ALL", o[o.NONE = 2] = "NONE", o[o.SINGLE = 3] = "SINGLE", o[o.ANYONECANPAY = 128] = "ANYONECANPAY", t4(tJ, t$.tsEnum(u));
            let ng = 192,
                nb = (e, t = ng) => e0.utils.taggedHash("TapLeaf", new Uint8Array([t]), rI.encode(e));

            function nm(e, t, r, n = tN) {
                return tC(r, t) && (e = function(e, t = new Uint8Array) {
                    let r = e0.utils,
                        n = r.bytesToNumberBE(e),
                        i = re.fromPrivateKey(n),
                        o = i.hasEvenY() ? n : r.mod(-n, rn),
                        s = r.pointToBytes(i),
                        a = rp(s, t);
                    return r.numberToBytesBE(r.mod(o + a, rn), 32)
                }(e, n), t = e0.getPublicKey(e)), {
                    privKey: e,
                    pubKey: t
                }
            }
            let nw = e => "[object Object]" === Object.prototype.toString.call(e) && e.constructor === Object;
            class nE {
                constructor(e = {}) {
                    this.global = {}, this.inputs = [], this.outputs = [];
                    let t = this.opts = function(e) {
                        if (!nw(e)) throw Error(`Wrong object type for transaction options: ${e}`);
                        let t = { ...e,
                            version: ri(e.version, 2),
                            lockTime: ri(e.lockTime, 0),
                            PSBTVersion: ri(e.PSBTVersion, 0)
                        };
                        if (![-1, 0, 1, 2].includes(t.version)) throw Error(`Unknown version: ${t.version}`);
                        if ("number" != typeof t.lockTime) throw Error("Transaction lock time should be number");
                        if (tJ.encode(t.lockTime), 0 !== t.PSBTVersion && 2 !== t.PSBTVersion) throw Error(`Unknown PSBT version ${t.PSBTVersion}`);
                        for (let e of ["allowUnknowOutput", "allowUnknowInput", "disableScriptCheck", "bip174jsCompat", "allowLegacyWitnessUtxo", "lowR"]) {
                            let r = t[e];
                            if (void 0 !== r && "boolean" != typeof r) throw Error(`Transation options wrong type: ${e}=${r} (${typeof r})`)
                        }
                        return Object.freeze(t)
                    }(e);
                    0 !== t.lockTime && (this.global.fallbackLocktime = t.lockTime), this.global.txVersion = t.version
                }
                static fromRaw(e, t = {}) {
                    let r = rN.decode(e),
                        n = new nE({ ...t,
                            version: r.version,
                            lockTime: r.lockTime
                        });
                    for (let e of r.outputs) n.addOutput(e);
                    if (n.outputs = r.outputs, n.inputs = r.inputs, r.witnesses)
                        for (let e = 0; e < r.witnesses.length; e++) n.inputs[e].finalScriptWitness = r.witnesses[e];
                    return n
                }
                static fromPSBT(e, t = {}) {
                    let r;
                    try {
                        r = ne.decode(e)
                    } catch (t) {
                        try {
                            r = nt.decode(e)
                        } catch (e) {
                            throw t
                        }
                    }
                    let n = r.global.version || 0;
                    if (0 !== n && 2 !== n) throw Error(`Wrong PSBT version=${n}`);
                    let i = r.global.unsignedTx,
                        o = 0 === n ? i ? .version : r.global.txVersion,
                        s = 0 === n ? i ? .lockTime : r.global.fallbackLocktime,
                        a = new nE({ ...t,
                            version: o,
                            lockTime: s,
                            PSBTVersion: n
                        }),
                        u = 0 === n ? i ? .inputs.length : r.global.inputCount;
                    a.inputs = r.inputs.slice(0, u).map((e, t) => ({
                        finalScriptSig: tN,
                        ...r.global.unsignedTx ? .inputs[t],
                        ...e
                    }));
                    let l = 0 === n ? i ? .outputs.length : r.global.outputCount;
                    return a.outputs = r.outputs.slice(0, l).map((e, t) => ({ ...e,
                        ...r.global.unsignedTx ? .outputs[t]
                    })), a.global = { ...r.global,
                        txVersion: o
                    }, 0 !== s && (a.global.fallbackLocktime = s), a
                }
                toPSBT(e = this.opts.PSBTVersion) {
                    if (0 !== e && 2 !== e) throw Error(`Wrong PSBT version=${e}`);
                    let t = this.inputs.map(t => r5(e, rq, t));
                    for (let e of t) e.partialSig && !e.partialSig.length && delete e.partialSig, e.finalScriptSig && !e.finalScriptSig.length && delete e.finalScriptSig, e.finalScriptWitness && !e.finalScriptWitness.length && delete e.finalScriptWitness;
                    let r = this.outputs.map(t => r5(e, rX, t)),
                        n = { ...this.global
                        };
                    return 0 === e ? (n.unsignedTx = rN.decode(this.unsignedTx), delete n.fallbackLocktime, delete n.txVersion) : (n.version = e, n.txVersion = this.version, n.inputCount = this.inputs.length, n.outputCount = this.outputs.length, n.fallbackLocktime && 0 === n.fallbackLocktime && delete n.fallbackLocktime), this.opts.bip174jsCompat && (t.length || t.push({}), r.length || r.push({})), (0 === e ? ne : nt).encode({
                        global: n,
                        inputs: t,
                        outputs: r
                    })
                }
                get lockTime() {
                    let e = 0,
                        t = 0,
                        r = 0,
                        n = 0;
                    for (let i of this.inputs) i.requiredHeightLocktime && (e = Math.max(e, i.requiredHeightLocktime), t++), i.requiredTimeLocktime && (r = Math.max(r, i.requiredTimeLocktime), n++);
                    return t && t >= n ? e : 0 !== r ? r : this.global.fallbackLocktime || 0
                }
                get version() {
                    if (void 0 === this.global.txVersion) throw Error("No global.txVersion");
                    return this.global.txVersion
                }
                inputStatus(e) {
                    this.checkInputIdx(e);
                    let t = this.inputs[e];
                    return t.finalScriptSig && t.finalScriptSig.length || t.finalScriptWitness && t.finalScriptWitness.length ? "finalized" : t.tapKeySig || t.tapScriptSig && t.tapScriptSig.length || t.partialSig && t.partialSig.length ? "signed" : "unsigned"
                }
                inputSighash(e) {
                    this.checkInputIdx(e);
                    let t = this.inputType(this.inputs[e]).sighash,
                        r = t === u.DEFAULT ? u.ALL : 3 & t,
                        n = t & u.ANYONECANPAY;
                    return {
                        sigInputs: n,
                        sigOutputs: r
                    }
                }
                signStatus() {
                    let e = !0,
                        t = !0,
                        r = [],
                        n = [];
                    for (let i = 0; i < this.inputs.length; i++) {
                        let o = this.inputStatus(i);
                        if ("unsigned" === o) continue;
                        let {
                            sigInputs: s,
                            sigOutputs: a
                        } = this.inputSighash(i);
                        if (s === u.ANYONECANPAY ? r.push(i) : e = !1, a === u.ALL) t = !1;
                        else if (a === u.SINGLE) n.push(i);
                        else if (a === u.NONE);
                        else throw Error(`Wrong signature hash output type: ${a}`)
                    }
                    return {
                        addInput: e,
                        addOutput: t,
                        inputs: r,
                        outputs: n
                    }
                }
                get isFinal() {
                    for (let e = 0; e < this.inputs.length; e++)
                        if ("finalized" !== this.inputStatus(e)) return !1;
                    return !0
                }
                get hasWitnesses() {
                    let e = !1;
                    for (let t of this.inputs) t.finalScriptWitness && t.finalScriptWitness.length && (e = !0);
                    return e
                }
                get weight() {
                    if (!this.isFinal) throw Error("Transaction is not finalized");
                    let e = 32,
                        t = this.outputs.map(ny);
                    for (let t of (this.hasWitnesses && (e += 2), e += 4 * rA.encode(this.inputs.length).length + 4 * rA.encode(this.outputs.length).length, this.inputs)) t.finalScriptSig && (e += 160 + 4 * rI.encode(t.finalScriptSig).length);
                    for (let r of t) e += 32 + 4 * rI.encode(r.script).length;
                    if (this.hasWitnesses)
                        for (let t of this.inputs) t.finalScriptWitness && (e += rR.encode(t.finalScriptWitness).length);
                    return e
                }
                get vsize() {
                    return Math.ceil(this.weight / 4)
                }
                toBytes(e = !1, t = !1) {
                    return rN.encode({
                        version: this.version,
                        lockTime: this.lockTime,
                        inputs: this.inputs.map(np).map(t => ({ ...t,
                            finalScriptSig: e && t.finalScriptSig || tN
                        })),
                        outputs: this.outputs.map(ny),
                        witnesses: this.inputs.map(e => e.finalScriptWitness || []),
                        segwitFlag: t && this.hasWitnesses
                    })
                }
                get unsignedTx() {
                    return this.toBytes(!1, !1)
                }
                get hex() {
                    return tB.encode(this.toBytes(!0, this.hasWitnesses))
                }
                get hash() {
                    if (!this.isFinal) throw Error("Transaction is not finalized");
                    return tB.encode(rs(this.toBytes(!0)))
                }
                get id() {
                    if (!this.isFinal) throw Error("Transaction is not finalized");
                    return tB.encode(rs(this.toBytes(!0)).reverse())
                }
                checkInputIdx(e) {
                    if (!Number.isSafeInteger(e) || 0 > e || e >= this.inputs.length) throw Error(`Wrong input index=${e}`)
                }
                getInput(e) {
                    return this.checkInputIdx(e), rl(this.inputs[e])
                }
                get inputsLength() {
                    return this.inputs.length
                }
                normalizeInput(e, t, r) {
                    let n, {
                        nonWitnessUtxo: i,
                        txid: o
                    } = e;
                    "string" == typeof i && (i = tB.decode(i)), tH(i) && (i = rN.decode(i)), void 0 === i && (i = t ? .nonWitnessUtxo), "string" == typeof o && (o = tB.decode(o)), void 0 === o && (o = t ? .txid);
                    let s = { ...t,
                        ...e,
                        nonWitnessUtxo: i,
                        txid: o
                    };
                    return void 0 === s.nonWitnessUtxo && delete s.nonWitnessUtxo, void 0 === s.sequence && (s.sequence = 4294967295), null === s.tapMerkleRoot && delete s.tapMerkleRoot, s = r7(rq, s, t, r), r1.encode(s), s.nonWitnessUtxo && void 0 !== s.index ? n = s.nonWitnessUtxo.outputs[s.index] : s.witnessUtxo && (n = s.witnessUtxo), n && !this.opts.disableScriptCheck && r0(n && n.script, s.redeemScript, s.witnessScript), s
                }
                addInput(e, t = !1) {
                    if (!t && !this.signStatus().addInput) throw Error("Tx has signed inputs, cannot add new one");
                    return this.inputs.push(this.normalizeInput(e)), this.inputs.length - 1
                }
                updateInput(e, t, r = !1) {
                    let n;
                    if (this.checkInputIdx(e), !r) {
                        let t = this.signStatus();
                        (!t.addInput || t.inputs.includes(e)) && (n = rz)
                    }
                    this.inputs[e] = this.normalizeInput(t, this.inputs[e], n)
                }
                checkOutputIdx(e) {
                    if (!Number.isSafeInteger(e) || 0 > e || e >= this.outputs.length) throw Error(`Wrong output index=${e}`)
                }
                getOutput(e) {
                    return this.checkInputIdx(e), rl(this.outputs[e])
                }
                get outputsLength() {
                    return this.outputs.length
                }
                normalizeOutput(e, t, r) {
                    let {
                        amount: n,
                        script: i
                    } = e;
                    if (void 0 === n && (n = t ? .amount), "bigint" != typeof n) throw Error("amount must be bigint sats");
                    "string" == typeof i && (i = tB.decode(i)), void 0 === i && (i = t ? .script);
                    let o = { ...t,
                        ...e,
                        amount: n,
                        script: i
                    };
                    if (void 0 === o.amount && delete o.amount, o = r7(rX, o, t, r), r2.encode(o), o.script && !this.opts.allowUnknowOutput && "unknown" === na.decode(o.script).type) throw Error("Transaction/output: unknown output script type, there is a chance that input is unspendable. Pass allowUnkownScript=true, if you sure");
                    return this.opts.disableScriptCheck || r0(o.script, o.redeemScript, o.witnessScript), o
                }
                addOutput(e, t = !1) {
                    if (!t && !this.signStatus().addOutput) throw Error("Tx has signed outputs, cannot add new one");
                    return this.outputs.push(this.normalizeOutput(e)), this.outputs.length - 1
                }
                updateOutput(e, t, r = !1) {
                    let n;
                    if (this.checkOutputIdx(e), !r) {
                        let t = this.signStatus();
                        (!t.addOutput || t.outputs.includes(e)) && (n = rY)
                    }
                    this.outputs[e] = this.normalizeOutput(t, this.outputs[e], n)
                }
                addOutputAddress(e, t, r = rm) {
                    return this.addOutput({
                        script: na.encode(nc(r).decode(e)),
                        amount: t
                    })
                }
                get fee() {
                    let e = 0 n;
                    for (let t of this.inputs) {
                        let r = this.prevOut(t);
                        if (!r) throw Error("Empty input amount");
                        e += r.amount
                    }
                    let t = this.outputs.map(ny);
                    for (let r of t) e -= r.amount;
                    return e
                }
                preimageLegacy(e, t, r) {
                    let {
                        isAny: n,
                        isNone: i,
                        isSingle: o
                    } = nh(r);
                    if (e < 0 || !Number.isSafeInteger(e)) throw Error(`Invalid input idx=${e}`);
                    if (o && e >= this.outputs.length || e >= this.inputs.length) return tG.encode(1 n);
                    t = rS.encode(rS.decode(t).filter(e => "CODESEPARATOR" !== e));
                    let s = this.inputs.map(np).map((r, n) => ({ ...r,
                        finalScriptSig: n === e ? t : tN
                    }));
                    n ? s = [s[e]] : (i || o) && (s = s.map((t, r) => ({ ...t,
                        sequence: r === e ? t.sequence : 0
                    })));
                    let a = this.outputs.map(ny);
                    i ? a = [] : o && (a = a.slice(0, e).fill(rx).concat([a[e]]));
                    let u = rN.encode({
                        lockTime: this.lockTime,
                        version: this.version,
                        segwitFlag: !1,
                        inputs: s,
                        outputs: a
                    });
                    return rs(u, tQ.encode(r))
                }
                preimageWitnessV0(e, t, r, n) {
                    let {
                        isAny: i,
                        isNone: o,
                        isSingle: s
                    } = nh(r), a = rw, u = rw, l = rw, f = this.inputs.map(np), c = this.outputs.map(ny);
                    i || (a = rs(...f.map(nr.encode))), i || s || o || (u = rs(...f.map(e => tJ.encode(e.sequence)))), s || o ? s && e < c.length && (l = rs(rk.encode(c[e]))) : l = rs(...c.map(rk.encode));
                    let h = f[e];
                    return rs(tQ.encode(this.version), a, u, t2(32, !0).encode(h.txid), tJ.encode(h.index), rI.encode(t), tz.encode(n), tJ.encode(h.sequence), l, tJ.encode(this.lockTime), tJ.encode(r))
                }
                preimageWitnessV1(e, t, r, n, i = -1, o, s = 192, a) {
                    if (!Array.isArray(n) || this.inputs.length !== n.length) throw Error(`Invalid amounts array=${n}`);
                    if (!Array.isArray(t) || this.inputs.length !== t.length) throw Error(`Invalid prevOutScript array=${t}`);
                    let l = [t1.encode(0), t1.encode(r), tQ.encode(this.version), tJ.encode(this.lockTime)],
                        f = r === u.DEFAULT ? u.ALL : 3 & r,
                        c = r & u.ANYONECANPAY,
                        h = this.inputs.map(np),
                        p = this.outputs.map(ny);
                    c !== u.ANYONECANPAY && l.push(...[h.map(nr.encode), n.map(tz.encode), t.map(rI.encode), h.map(e => tJ.encode(e.sequence))].map(e => k(ra(...e)))), f === u.ALL && l.push(k(ra(...p.map(rk.encode))));
                    let d = (a ? 1 : 0) | (o ? 2 : 0);
                    if (l.push(new Uint8Array([d])), c === u.ANYONECANPAY) {
                        let r = h[e];
                        l.push(nr.encode(r), tz.encode(n[e]), rI.encode(t[e]), tJ.encode(r.sequence))
                    } else l.push(tJ.encode(e));
                    return 1 & d && l.push(k(rI.encode(a || tN))), f === u.SINGLE && l.push(e < p.length ? k(rk.encode(p[e])) : rw), o && l.push(nb(o, s), t1.encode(0), tQ.encode(i)), e0.utils.taggedHash("TapSighash", ...l)
                }
                prevOut(e) {
                    if (e.nonWitnessUtxo) {
                        if (void 0 === e.index) throw Error("Uknown input index");
                        return e.nonWitnessUtxo.outputs[e.index]
                    }
                    if (e.witnessUtxo) return e.witnessUtxo;
                    throw Error("Cannot find previous output info.")
                }
                inputType(e) {
                    let t = "legacy",
                        r = u.ALL,
                        n = this.prevOut(e),
                        i = na.decode(n.script),
                        o = i.type,
                        s = i,
                        a = [i];
                    if ("tr" === i.type) return r = u.DEFAULT, {
                        txType: "taproot",
                        type: "tr",
                        last: i,
                        lastScript: n.script,
                        defaultSighash: r,
                        sighash: e.sighashType || r
                    }; {
                        if (("wpkh" === i.type || "wsh" === i.type) && (t = "segwit"), "sh" === i.type) {
                            if (!e.redeemScript) throw Error("inputType: sh without redeemScript");
                            let r = na.decode(e.redeemScript);
                            ("wpkh" === r.type || "wsh" === r.type) && (t = "segwit"), a.push(r), s = r, o += `-${r.type}`
                        }
                        if ("wsh" === s.type) {
                            if (!e.witnessScript) throw Error("inputType: wsh without witnessScript");
                            let r = na.decode(e.witnessScript);
                            "wsh" === r.type && (t = "segwit"), a.push(r), s = r, o += `-${r.type}`
                        }
                        let n = a[a.length - 1];
                        if ("sh" === n.type || "wsh" === n.type) throw Error("inputType: sh/wsh cannot be terminal type");
                        let u = na.encode(n),
                            l = {
                                type: o,
                                txType: t,
                                last: n,
                                lastScript: u,
                                defaultSighash: r,
                                sighash: e.sighashType || r
                            };
                        if ("legacy" === t && !this.opts.allowLegacyWitnessUtxo && !e.nonWitnessUtxo) throw Error("Transaction/sign: legacy input without nonWitnessUtxo, can result in attack that forces paying higher fees. Pass allowLegacyWitnessUtxo=true, if you sure");
                        return l
                    }
                }
                signIdx(e, t, r, n) {
                    this.checkInputIdx(t);
                    let i = this.inputs[t],
                        o = this.inputType(i);
                    if (!tH(e)) {
                        if (!i.bip32Derivation || !i.bip32Derivation.length) throw Error("bip32Derivation: empty");
                        let r = i.bip32Derivation.filter(t => t[1].fingerprint == e.fingerprint).map(([t, {
                            path: r
                        }]) => {
                            let n = e;
                            for (let e of r) n = n.deriveChild(e);
                            if (!tC(n.publicKey, t)) throw Error("bip32Derivation: wrong pubKey");
                            if (!n.privateKey) throw Error("bip32Derivation: no privateKey");
                            return n
                        });
                        if (!r.length) throw Error(`bip32Derivation: no items with fingerprint=${e.fingerprint}`);
                        let n = !1;
                        for (let e of r) this.signIdx(e.privateKey, t) && (n = !0);
                        return n
                    }
                    r || (r = [o.defaultSighash]);
                    let s = o.sighash;
                    if (!r.includes(s)) throw Error(`Input with not allowed sigHash=${s}. Allowed: ${r.join(", ")}`);
                    let {
                        sigInputs: a,
                        sigOutputs: l
                    } = this.inputSighash(t);
                    if (l === u.SINGLE && t >= this.outputs.length) throw Error(`Input with sighash SINGLE, but there is no output with corresponding index=${t}`);
                    let f = this.prevOut(i);
                    if ("taproot" === o.txType) {
                        if (i.tapBip32Derivation) throw Error("tapBip32Derivation unsupported");
                        let r = this.inputs.map(this.prevOut),
                            o = r.map(e => e.script),
                            a = r.map(e => e.amount),
                            l = !1,
                            f = e0.getPublicKey(e),
                            c = i.tapMerkleRoot || tN;
                        if (i.tapInternalKey) {
                            let {
                                pubKey: r,
                                privKey: h
                            } = nm(e, f, i.tapInternalKey, c), [p, d] = rd(i.tapInternalKey, c);
                            if (tC(p, r)) {
                                let e = this.preimageWitnessV1(t, o, s, a),
                                    r = ra(e0.sign(e, h, n), s !== u.DEFAULT ? new Uint8Array([s]) : tN);
                                this.updateInput(t, {
                                    tapKeySig: r
                                }, !0), l = !0
                            }
                        }
                        if (i.tapLeafScript)
                            for (let [r, c] of (i.tapScriptSig = i.tapScriptSig || [], i.tapLeafScript)) {
                                let i = c.subarray(0, -1),
                                    h = rS.decode(i),
                                    p = c[c.length - 1],
                                    d = nb(i, p),
                                    {
                                        pubKey: y,
                                        privKey: g
                                    } = nm(e, f, r.internalKey, tN),
                                    b = h.findIndex(e => tH(e) && tC(e, y));
                                if (-1 === b) continue;
                                let m = this.preimageWitnessV1(t, o, s, a, void 0, i, p),
                                    w = ra(e0.sign(m, g, n), s !== u.DEFAULT ? new Uint8Array([s]) : tN);
                                this.updateInput(t, {
                                    tapScriptSig: [
                                        [{
                                            pubKey: y,
                                            leafHash: d
                                        }, w]
                                    ]
                                }, !0), l = !0
                            }
                        if (!l) throw Error("No taproot scripts signed")
                    } else {
                        let r;
                        let n = rr(e),
                            i = !1,
                            a = ro(n);
                        for (let e of rS.decode(o.lastScript)) tH(e) && (tC(e, n) || tC(e, a)) && (i = !0);
                        if (!i) throw Error(`Input script doesn't have pubKey: ${o.lastScript}`);
                        if ("legacy" === o.txType) r = this.preimageLegacy(t, o.lastScript, s);
                        else if ("segwit" === o.txType) {
                            let e = o.lastScript;
                            "wpkh" === o.last.type && (e = na.encode({
                                type: "pkh",
                                hash: o.last.hash
                            })), r = this.preimageWitnessV0(t, e, s, f.amount)
                        } else throw Error(`Transaction/sign: unknown tx type: ${o.txType}`);
                        let u = function(e, t, r = !1) {
                            let n = rt(e, t);
                            if (r && !rh(n)) {
                                let r = new Uint8Array(32);
                                for (let i = 0; i < Number.MAX_SAFE_INTEGER && (r.set(tJ.encode(i)), !rh(n = rt(e, t, {
                                        extraEntropy: r
                                    }))); i++);
                            }
                            return n.toDERRawBytes()
                        }(r, e, this.opts.lowR);
                        this.updateInput(t, {
                            partialSig: [
                                [n, ra(u, new Uint8Array([s]))]
                            ]
                        }, !0)
                    }
                    return !0
                }
                sign(e, t, r) {
                    let n = 0;
                    for (let i = 0; i < this.inputs.length; i++) try {
                        this.signIdx(e, i, t, r) && n++
                    } catch (e) {}
                    if (!n) throw Error("No inputs signed");
                    return n
                }
                finalizeIdx(e) {
                    let t, r;
                    if (this.checkInputIdx(e), this.fee < 0 n) throw Error("Outputs spends more than inputs amount");
                    let n = this.inputs[e],
                        i = this.inputType(n);
                    if ("taproot" === i.txType) {
                        if (n.tapKeySig) n.finalScriptWitness = [n.tapKeySig];
                        else if (n.tapLeafScript && n.tapScriptSig) {
                            let e = n.tapLeafScript.sort((e, t) => rH.encode(e[0]).length - rH.encode(t[0]).length);
                            for (let [t, r] of e) {
                                let e = r.slice(0, -1),
                                    i = r[r.length - 1],
                                    o = na.decode(e),
                                    s = nb(e, i),
                                    a = n.tapScriptSig.filter(e => tC(e[0].leafHash, s)),
                                    u = [];
                                if ("tr_ms" === o.type) {
                                    let e = o.m,
                                        t = o.pubkeys,
                                        r = 0;
                                    for (let n of t) {
                                        let t = a.findIndex(e => tC(e[0].pubKey, n));
                                        if (r === e || -1 === t) {
                                            u.push(tN);
                                            continue
                                        }
                                        u.push(a[t][1]), r++
                                    }
                                    if (r !== e) continue
                                } else if ("tr_ns" === o.type) {
                                    for (let e of o.pubkeys) {
                                        let t = a.findIndex(t => tC(t[0].pubKey, e)); - 1 !== t && u.push(a[t][1])
                                    }
                                    if (u.length !== o.pubkeys.length) continue
                                } else if ("unknown" === o.type && this.opts.allowUnknowInput) {
                                    let t = rS.decode(e);
                                    if (!(u = a.map(([{
                                            pubKey: e
                                        }, r]) => {
                                            let n = t.findIndex(t => tH(t) && tC(t, e));
                                            if (-1 === n) throw Error("finalize/taproot: cannot find position of pubkey in script");
                                            return {
                                                signature: r,
                                                pos: n
                                            }
                                        }).sort((e, t) => e.pos - t.pos).map(e => e.signature)).length) continue
                                } else throw Error("Finalize: Unknown tapLeafScript");
                                n.finalScriptWitness = u.reverse().concat([e, rH.encode(t)]);
                                break
                            }
                            if (!n.finalScriptWitness) throw Error("finalize/taproot: empty witness")
                        } else throw Error("finalize/taproot: unknown input");
                        n.finalScriptSig = tN, nd(n);
                        return
                    }
                    if (!n.partialSig || !n.partialSig.length) throw Error("Not enough partial sign");
                    let o = tN,
                        s = [];
                    if ("ms" === i.last.type) {
                        let e = i.last.m,
                            t = i.last.pubkeys,
                            r = [];
                        for (let e of t) {
                            let t = n.partialSig.find(t => tC(e, t[0]));
                            t && r.push(t[1])
                        }
                        if ((r = r.slice(0, e)).length !== e) throw Error(`Multisig: wrong signatures count, m=${e} n=${t.length} signatures=${r.length}`);
                        o = rS.encode([0, ...r])
                    } else if ("pk" === i.last.type) o = rS.encode([n.partialSig[0][1]]);
                    else if ("pkh" === i.last.type) o = rS.encode([n.partialSig[0][1], n.partialSig[0][0]]);
                    else if ("wpkh" === i.last.type) o = tN, s = [n.partialSig[0][1], n.partialSig[0][0]];
                    else if ("unknown" === i.last.type && !this.opts.allowUnknowInput) throw Error("Unknown inputs not allowed");
                    if (i.type.includes("wsh-") && (o.length && i.lastScript.length && (s = rS.decode(o).map(e => {
                            if (0 === e) return tN;
                            if (tH(e)) return e;
                            throw Error(`Wrong witness op=${e}`)
                        })), s = s.concat(i.lastScript)), "segwit" === i.txType && (r = s), i.type.startsWith("sh-wsh-") ? t = rS.encode([rS.encode([0, k(i.lastScript)])]) : i.type.startsWith("sh-") ? t = rS.encode([...rS.decode(o), i.lastScript]) : i.type.startsWith("wsh-") || "segwit" !== i.txType && (t = o), !t && !r) throw Error("Unknown error finalizing input");
                    t && (n.finalScriptSig = t), r && (n.finalScriptWitness = r), nd(n)
                }
                finalize() {
                    for (let e = 0; e < this.inputs.length; e++) this.finalizeIdx(e)
                }
                extract() {
                    if (!this.isFinal) throw Error("Transaction has unfinalized inputs");
                    if (!this.outputs.length) throw Error("Transaction has no outputs");
                    if (this.fee < 0 n) throw Error("Outputs spends more than inputs amount");
                    return this.toBytes(!0, !0)
                }
                combine(e) {
                    for (let t of ["PSBTVersion", "version", "lockTime"])
                        if (this.opts[t] !== e.opts[t]) throw Error(`Transaction/combine: different ${t} this=${this.opts[t]} other=${e.opts[t]}`);
                    for (let t of ["inputs", "outputs"])
                        if (this[t].length !== e[t].length) throw Error(`Transaction/combine: different ${t} length this=${this[t].length} other=${e[t].length}`);
                    let t = this.global.unsignedTx ? rN.encode(this.global.unsignedTx) : tN,
                        r = e.global.unsignedTx ? rN.encode(e.global.unsignedTx) : tN;
                    if (!tC(t, r)) throw Error("Transaction/combine: different unsigned tx");
                    this.global = r7(r$, this.global, e.global);
                    for (let t = 0; t < this.inputs.length; t++) this.updateInput(t, e.inputs[t], !0);
                    for (let t = 0; t < this.outputs.length; t++) this.updateOutput(t, e.outputs[t], !0);
                    return this
                }
                clone() {
                    return nE.fromPSBT(this.toPSBT(2), this.opts)
                }
            }
        },
        45406: function(e, t, r) {
            "use strict";
            let n;

            function i(e, t) {
                return function() {
                    return e.apply(t, arguments)
                }
            }
            r.d(t, {
                Z: function() {
                    return eM
                }
            });
            let {
                toString: o
            } = Object.prototype, {
                getPrototypeOf: s
            } = Object, a = (C = Object.create(null), e => {
                let t = o.call(e);
                return C[t] || (C[t] = t.slice(8, -1).toLowerCase())
            }), u = e => (e = e.toLowerCase(), t => a(t) === e), l = e => t => typeof t === e, {
                isArray: f
            } = Array, c = l("undefined"), h = u("ArrayBuffer"), p = l("string"), d = l("function"), y = l("number"), g = e => null !== e && "object" == typeof e, b = e => {
                if ("object" !== a(e)) return !1;
                let t = s(e);
                return (null === t || t === Object.prototype || null === Object.getPrototypeOf(t)) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e)
            }, m = u("Date"), w = u("File"), E = u("Blob"), S = u("FileList"), v = u("URLSearchParams");

            function _(e, t, {
                allOwnKeys: r = !1
            } = {}) {
                let n, i;
                if (null != e) {
                    if ("object" != typeof e && (e = [e]), f(e))
                        for (n = 0, i = e.length; n < i; n++) t.call(null, e[n], n, e);
                    else {
                        let i;
                        let o = r ? Object.getOwnPropertyNames(e) : Object.keys(e),
                            s = o.length;
                        for (n = 0; n < s; n++) i = o[n], t.call(null, e[i], i, e)
                    }
                }
            }

            function T(e, t) {
                let r;
                t = t.toLowerCase();
                let n = Object.keys(e),
                    i = n.length;
                for (; i-- > 0;)
                    if (t === (r = n[i]).toLowerCase()) return r;
                return null
            }
            let A = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : "undefined" != typeof window ? window : global,
                O = e => !c(e) && e !== A,
                I = (L = "undefined" != typeof Uint8Array && s(Uint8Array), e => L && e instanceof L),
                P = u("HTMLFormElement"),
                k = (({
                    hasOwnProperty: e
                }) => (t, r) => e.call(t, r))(Object.prototype),
                x = u("RegExp"),
                R = (e, t) => {
                    let r = Object.getOwnPropertyDescriptors(e),
                        n = {};
                    _(r, (r, i) => {
                        !1 !== t(r, i, e) && (n[i] = r)
                    }), Object.defineProperties(e, n)
                },
                B = "abcdefghijklmnopqrstuvwxyz",
                N = "0123456789",
                U = {
                    DIGIT: N,
                    ALPHA: B,
                    ALPHA_DIGIT: B + B.toUpperCase() + N
                };
            var C, L, H = {
                isArray: f,
                isArrayBuffer: h,
                isBuffer: function(e) {
                    return null !== e && !c(e) && null !== e.constructor && !c(e.constructor) && d(e.constructor.isBuffer) && e.constructor.isBuffer(e)
                },
                isFormData: e => {
                    let t = "[object FormData]";
                    return e && ("function" == typeof FormData && e instanceof FormData || o.call(e) === t || d(e.toString) && e.toString() === t)
                },
                isArrayBufferView: function(e) {
                    return "undefined" != typeof ArrayBuffer && ArrayBuffer.isView ? ArrayBuffer.isView(e) : e && e.buffer && h(e.buffer)
                },
                isString: p,
                isNumber: y,
                isBoolean: e => !0 === e || !1 === e,
                isObject: g,
                isPlainObject: b,
                isUndefined: c,
                isDate: m,
                isFile: w,
                isBlob: E,
                isRegExp: x,
                isFunction: d,
                isStream: e => g(e) && d(e.pipe),
                isURLSearchParams: v,
                isTypedArray: I,
                isFileList: S,
                forEach: _,
                merge: function e() {
                    let {
                        caseless: t
                    } = O(this) && this || {}, r = {}, n = (n, i) => {
                        let o = t && T(r, i) || i;
                        b(r[o]) && b(n) ? r[o] = e(r[o], n) : b(n) ? r[o] = e({}, n) : f(n) ? r[o] = n.slice() : r[o] = n
                    };
                    for (let e = 0, t = arguments.length; e < t; e++) arguments[e] && _(arguments[e], n);
                    return r
                },
                extend: (e, t, r, {
                    allOwnKeys: n
                } = {}) => (_(t, (t, n) => {
                    r && d(t) ? e[n] = i(t, r) : e[n] = t
                }, {
                    allOwnKeys: n
                }), e),
                trim: e => e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, ""),
                stripBOM: e => (65279 === e.charCodeAt(0) && (e = e.slice(1)), e),
                inherits: (e, t, r, n) => {
                    e.prototype = Object.create(t.prototype, n), e.prototype.constructor = e, Object.defineProperty(e, "super", {
                        value: t.prototype
                    }), r && Object.assign(e.prototype, r)
                },
                toFlatObject: (e, t, r, n) => {
                    let i, o, a;
                    let u = {};
                    if (t = t || {}, null == e) return t;
                    do {
                        for (o = (i = Object.getOwnPropertyNames(e)).length; o-- > 0;) a = i[o], (!n || n(a, e, t)) && !u[a] && (t[a] = e[a], u[a] = !0);
                        e = !1 !== r && s(e)
                    } while (e && (!r || r(e, t)) && e !== Object.prototype);
                    return t
                },
                kindOf: a,
                kindOfTest: u,
                endsWith: (e, t, r) => {
                    e = String(e), (void 0 === r || r > e.length) && (r = e.length), r -= t.length;
                    let n = e.indexOf(t, r);
                    return -1 !== n && n === r
                },
                toArray: e => {
                    if (!e) return null;
                    if (f(e)) return e;
                    let t = e.length;
                    if (!y(t)) return null;
                    let r = Array(t);
                    for (; t-- > 0;) r[t] = e[t];
                    return r
                },
                forEachEntry: (e, t) => {
                    let r;
                    let n = e && e[Symbol.iterator],
                        i = n.call(e);
                    for (;
                        (r = i.next()) && !r.done;) {
                        let n = r.value;
                        t.call(e, n[0], n[1])
                    }
                },
                matchAll: (e, t) => {
                    let r;
                    let n = [];
                    for (; null !== (r = e.exec(t));) n.push(r);
                    return n
                },
                isHTMLForm: P,
                hasOwnProperty: k,
                hasOwnProp: k,
                reduceDescriptors: R,
                freezeMethods: e => {
                    R(e, (t, r) => {
                        if (d(e) && -1 !== ["arguments", "caller", "callee"].indexOf(r)) return !1;
                        let n = e[r];
                        if (d(n)) {
                            if (t.enumerable = !1, "writable" in t) {
                                t.writable = !1;
                                return
                            }
                            t.set || (t.set = () => {
                                throw Error("Can not rewrite read-only method '" + r + "'")
                            })
                        }
                    })
                },
                toObjectSet: (e, t) => {
                    let r = {};
                    return (e => {
                        e.forEach(e => {
                            r[e] = !0
                        })
                    })(f(e) ? e : String(e).split(t)), r
                },
                toCamelCase: e => e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function(e, t, r) {
                    return t.toUpperCase() + r
                }),
                noop: () => {},
                toFiniteNumber: (e, t) => Number.isFinite(e = +e) ? e : t,
                findKey: T,
                global: A,
                isContextDefined: O,
                ALPHABET: U,
                generateString: (e = 16, t = U.ALPHA_DIGIT) => {
                    let r = "",
                        {
                            length: n
                        } = t;
                    for (; e--;) r += t[Math.random() * n | 0];
                    return r
                },
                isSpecCompliantForm: function(e) {
                    return !!(e && d(e.append) && "FormData" === e[Symbol.toStringTag] && e[Symbol.iterator])
                },
                toJSONObject: e => {
                    let t = Array(10),
                        r = (e, n) => {
                            if (g(e)) {
                                if (t.indexOf(e) >= 0) return;
                                if (!("toJSON" in e)) {
                                    t[n] = e;
                                    let i = f(e) ? [] : {};
                                    return _(e, (e, t) => {
                                        let o = r(e, n + 1);
                                        c(o) || (i[t] = o)
                                    }), t[n] = void 0, i
                                }
                            }
                            return e
                        };
                    return r(e, 0)
                }
            };

            function j(e, t, r, n, i) {
                Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = Error().stack, this.message = e, this.name = "AxiosError", t && (this.code = t), r && (this.config = r), n && (this.request = n), i && (this.response = i)
            }
            H.inherits(j, Error, {
                toJSON: function() {
                    return {
                        message: this.message,
                        name: this.name,
                        description: this.description,
                        number: this.number,
                        fileName: this.fileName,
                        lineNumber: this.lineNumber,
                        columnNumber: this.columnNumber,
                        stack: this.stack,
                        config: H.toJSONObject(this.config),
                        code: this.code,
                        status: this.response && this.response.status ? this.response.status : null
                    }
                }
            });
            let D = j.prototype,
                M = {};
            ["ERR_BAD_OPTION_VALUE", "ERR_BAD_OPTION", "ECONNABORTED", "ETIMEDOUT", "ERR_NETWORK", "ERR_FR_TOO_MANY_REDIRECTS", "ERR_DEPRECATED", "ERR_BAD_RESPONSE", "ERR_BAD_REQUEST", "ERR_CANCELED", "ERR_NOT_SUPPORT", "ERR_INVALID_URL"].forEach(e => {
                M[e] = {
                    value: e
                }
            }), Object.defineProperties(j, M), Object.defineProperty(D, "isAxiosError", {
                value: !0
            }), j.from = (e, t, r, n, i, o) => {
                let s = Object.create(D);
                return H.toFlatObject(e, s, function(e) {
                    return e !== Error.prototype
                }, e => "isAxiosError" !== e), j.call(s, e.message, t, r, n, i), s.cause = e, s.name = e.name, o && Object.assign(s, o), s
            };
            var F = r(91083).Buffer;

            function W(e) {
                return H.isPlainObject(e) || H.isArray(e)
            }

            function V(e) {
                return H.endsWith(e, "[]") ? e.slice(0, -2) : e
            }

            function K(e, t, r) {
                return e ? e.concat(t).map(function(e, t) {
                    return e = V(e), !r && t ? "[" + e + "]" : e
                }).join(r ? "." : "") : t
            }
            let $ = H.toFlatObject(H, {}, null, function(e) {
                return /^is[A-Z]/.test(e)
            });
            var q = function(e, t, r) {
                if (!H.isObject(e)) throw TypeError("target must be an object");
                t = t || new FormData, r = H.toFlatObject(r, {
                    metaTokens: !0,
                    dots: !1,
                    indexes: !1
                }, !1, function(e, t) {
                    return !H.isUndefined(t[e])
                });
                let n = r.metaTokens,
                    i = r.visitor || f,
                    o = r.dots,
                    s = r.indexes,
                    a = r.Blob || "undefined" != typeof Blob && Blob,
                    u = a && H.isSpecCompliantForm(t);
                if (!H.isFunction(i)) throw TypeError("visitor must be a function");

                function l(e) {
                    if (null === e) return "";
                    if (H.isDate(e)) return e.toISOString();
                    if (!u && H.isBlob(e)) throw new j("Blob is not supported. Use a Buffer instead.");
                    return H.isArrayBuffer(e) || H.isTypedArray(e) ? u && "function" == typeof Blob ? new Blob([e]) : F.from(e) : e
                }

                function f(e, r, i) {
                    let a = e;
                    if (e && !i && "object" == typeof e) {
                        if (H.endsWith(r, "{}")) r = n ? r : r.slice(0, -2), e = JSON.stringify(e);
                        else {
                            var u;
                            if (H.isArray(e) && (u = e, H.isArray(u) && !u.some(W)) || (H.isFileList(e) || H.endsWith(r, "[]")) && (a = H.toArray(e))) return r = V(r), a.forEach(function(e, n) {
                                H.isUndefined(e) || null === e || t.append(!0 === s ? K([r], n, o) : null === s ? r : r + "[]", l(e))
                            }), !1
                        }
                    }
                    return !!W(e) || (t.append(K(i, r, o), l(e)), !1)
                }
                let c = [],
                    h = Object.assign($, {
                        defaultVisitor: f,
                        convertValue: l,
                        isVisitable: W
                    });
                if (!H.isObject(e)) throw TypeError("data must be an object");
                return ! function e(r, n) {
                    if (!H.isUndefined(r)) {
                        if (-1 !== c.indexOf(r)) throw Error("Circular reference detected in " + n.join("."));
                        c.push(r), H.forEach(r, function(r, o) {
                            let s = !(H.isUndefined(r) || null === r) && i.call(t, r, H.isString(o) ? o.trim() : o, n, h);
                            !0 === s && e(r, n ? n.concat(o) : [o])
                        }), c.pop()
                    }
                }(e), t
            };

            function G(e) {
                let t = {
                    "!": "%21",
                    "'": "%27",
                    "(": "%28",
                    ")": "%29",
                    "~": "%7E",
                    "%20": "+",
                    "%00": "\x00"
                };
                return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function(e) {
                    return t[e]
                })
            }

            function z(e, t) {
                this._pairs = [], e && q(e, this, t)
            }
            let X = z.prototype;

            function Y(e) {
                return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]")
            }

            function J(e, t, r) {
                let n;
                if (!t) return e;
                let i = r && r.encode || Y,
                    o = r && r.serialize;
                if (n = o ? o(t, r) : H.isURLSearchParams(t) ? t.toString() : new z(t, r).toString(i)) {
                    let t = e.indexOf("#"); - 1 !== t && (e = e.slice(0, t)), e += (-1 === e.indexOf("?") ? "?" : "&") + n
                }
                return e
            }
            X.append = function(e, t) {
                this._pairs.push([e, t])
            }, X.toString = function(e) {
                let t = e ? function(t) {
                    return e.call(this, t, G)
                } : G;
                return this._pairs.map(function(e) {
                    return t(e[0]) + "=" + t(e[1])
                }, "").join("&")
            };
            var Z = class {
                    constructor() {
                        this.handlers = []
                    }
                    use(e, t, r) {
                        return this.handlers.push({
                            fulfilled: e,
                            rejected: t,
                            synchronous: !!r && r.synchronous,
                            runWhen: r ? r.runWhen : null
                        }), this.handlers.length - 1
                    }
                    eject(e) {
                        this.handlers[e] && (this.handlers[e] = null)
                    }
                    clear() {
                        this.handlers && (this.handlers = [])
                    }
                    forEach(e) {
                        H.forEach(this.handlers, function(t) {
                            null !== t && e(t)
                        })
                    }
                },
                Q = {
                    silentJSONParsing: !0,
                    forcedJSONParsing: !0,
                    clarifyTimeoutError: !1
                },
                ee = "undefined" != typeof URLSearchParams ? URLSearchParams : z,
                et = FormData;
            let er = ("undefined" == typeof navigator || "ReactNative" !== (n = navigator.product) && "NativeScript" !== n && "NS" !== n) && "undefined" != typeof window && "undefined" != typeof document,
                en = "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope && "function" == typeof self.importScripts;
            var ei = {
                    isBrowser: !0,
                    classes: {
                        URLSearchParams: ee,
                        FormData: et,
                        Blob
                    },
                    isStandardBrowserEnv: er,
                    isStandardBrowserWebWorkerEnv: en,
                    protocols: ["http", "https", "file", "blob", "url", "data"]
                },
                eo = function(e) {
                    if (H.isFormData(e) && H.isFunction(e.entries)) {
                        let t = {};
                        return H.forEachEntry(e, (e, r) => {
                            ! function e(t, r, n, i) {
                                let o = t[i++],
                                    s = Number.isFinite(+o),
                                    a = i >= t.length;
                                if (o = !o && H.isArray(n) ? n.length : o, a) return H.hasOwnProp(n, o) ? n[o] = [n[o], r] : n[o] = r, !s;
                                n[o] && H.isObject(n[o]) || (n[o] = []);
                                let u = e(t, r, n[o], i);
                                return u && H.isArray(n[o]) && (n[o] = function(e) {
                                    let t, r;
                                    let n = {},
                                        i = Object.keys(e),
                                        o = i.length;
                                    for (t = 0; t < o; t++) n[r = i[t]] = e[r];
                                    return n
                                }(n[o])), !s
                            }(H.matchAll(/\w+|\[(\w*)]/g, e).map(e => "[]" === e[0] ? "" : e[1] || e[0]), r, t, 0)
                        }), t
                    }
                    return null
                };
            let es = {
                    "Content-Type": void 0
                },
                ea = {
                    transitional: Q,
                    adapter: ["xhr", "http"],
                    transformRequest: [function(e, t) {
                        let r;
                        let n = t.getContentType() || "",
                            i = n.indexOf("application/json") > -1,
                            o = H.isObject(e);
                        o && H.isHTMLForm(e) && (e = new FormData(e));
                        let s = H.isFormData(e);
                        if (s) return i && i ? JSON.stringify(eo(e)) : e;
                        if (H.isArrayBuffer(e) || H.isBuffer(e) || H.isStream(e) || H.isFile(e) || H.isBlob(e)) return e;
                        if (H.isArrayBufferView(e)) return e.buffer;
                        if (H.isURLSearchParams(e)) return t.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), e.toString();
                        if (o) {
                            if (n.indexOf("application/x-www-form-urlencoded") > -1) {
                                var a, u;
                                return (a = e, u = this.formSerializer, q(a, new ei.classes.URLSearchParams, Object.assign({
                                    visitor: function(e, t, r, n) {
                                        return ei.isNode && H.isBuffer(e) ? (this.append(t, e.toString("base64")), !1) : n.defaultVisitor.apply(this, arguments)
                                    }
                                }, u))).toString()
                            }
                            if ((r = H.isFileList(e)) || n.indexOf("multipart/form-data") > -1) {
                                let t = this.env && this.env.FormData;
                                return q(r ? {
                                    "files[]": e
                                } : e, t && new t, this.formSerializer)
                            }
                        }
                        return o || i ? (t.setContentType("application/json", !1), function(e, t, r) {
                            if (H.isString(e)) try {
                                return (0, JSON.parse)(e), H.trim(e)
                            } catch (e) {
                                if ("SyntaxError" !== e.name) throw e
                            }
                            return (0, JSON.stringify)(e)
                        }(e)) : e
                    }],
                    transformResponse: [function(e) {
                        let t = this.transitional || ea.transitional,
                            r = t && t.forcedJSONParsing,
                            n = "json" === this.responseType;
                        if (e && H.isString(e) && (r && !this.responseType || n)) {
                            let r = t && t.silentJSONParsing;
                            try {
                                return JSON.parse(e)
                            } catch (e) {
                                if (!r && n) {
                                    if ("SyntaxError" === e.name) throw j.from(e, j.ERR_BAD_RESPONSE, this, null, this.response);
                                    throw e
                                }
                            }
                        }
                        return e
                    }],
                    timeout: 0,
                    xsrfCookieName: "XSRF-TOKEN",
                    xsrfHeaderName: "X-XSRF-TOKEN",
                    maxContentLength: -1,
                    maxBodyLength: -1,
                    env: {
                        FormData: ei.classes.FormData,
                        Blob: ei.classes.Blob
                    },
                    validateStatus: function(e) {
                        return e >= 200 && e < 300
                    },
                    headers: {
                        common: {
                            Accept: "application/json, text/plain, */*"
                        }
                    }
                };
            H.forEach(["delete", "get", "head"], function(e) {
                ea.headers[e] = {}
            }), H.forEach(["post", "put", "patch"], function(e) {
                ea.headers[e] = H.merge(es)
            });
            let eu = H.toObjectSet(["age", "authorization", "content-length", "content-type", "etag", "expires", "from", "host", "if-modified-since", "if-unmodified-since", "last-modified", "location", "max-forwards", "proxy-authorization", "referer", "retry-after", "user-agent"]);
            var el = e => {
                let t, r, n;
                let i = {};
                return e && e.split("\n").forEach(function(e) {
                    n = e.indexOf(":"), t = e.substring(0, n).trim().toLowerCase(), r = e.substring(n + 1).trim(), !t || i[t] && eu[t] || ("set-cookie" === t ? i[t] ? i[t].push(r) : i[t] = [r] : i[t] = i[t] ? i[t] + ", " + r : r)
                }), i
            };
            let ef = Symbol("internals");

            function ec(e) {
                return e && String(e).trim().toLowerCase()
            }

            function eh(e) {
                return !1 === e || null == e ? e : H.isArray(e) ? e.map(eh) : String(e)
            }

            function ep(e, t, r, n) {
                if (H.isFunction(n)) return n.call(this, t, r);
                if (H.isString(t)) {
                    if (H.isString(n)) return -1 !== t.indexOf(n);
                    if (H.isRegExp(n)) return n.test(t)
                }
            }
            class ed {
                constructor(e) {
                    e && this.set(e)
                }
                set(e, t, r) {
                    let n = this;

                    function i(e, t, r) {
                        let i = ec(t);
                        if (!i) throw Error("header name must be a non-empty string");
                        let o = H.findKey(n, i);
                        o && void 0 !== n[o] && !0 !== r && (void 0 !== r || !1 === n[o]) || (n[o || t] = eh(e))
                    }
                    let o = (e, t) => H.forEach(e, (e, r) => i(e, r, t));
                    if (H.isPlainObject(e) || e instanceof this.constructor) o(e, t);
                    else {
                        var s;
                        H.isString(e) && (e = e.trim()) && (s = e, !/^[-_a-zA-Z]+$/.test(s.trim())) ? o(el(e), t) : null != e && i(t, e, r)
                    }
                    return this
                }
                get(e, t) {
                    if (e = ec(e)) {
                        let r = H.findKey(this, e);
                        if (r) {
                            let e = this[r];
                            if (!t) return e;
                            if (!0 === t) return function(e) {
                                let t;
                                let r = Object.create(null),
                                    n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
                                for (; t = n.exec(e);) r[t[1]] = t[2];
                                return r
                            }(e);
                            if (H.isFunction(t)) return t.call(this, e, r);
                            if (H.isRegExp(t)) return t.exec(e);
                            throw TypeError("parser must be boolean|regexp|function")
                        }
                    }
                }
                has(e, t) {
                    if (e = ec(e)) {
                        let r = H.findKey(this, e);
                        return !!(r && void 0 !== this[r] && (!t || ep(this, this[r], r, t)))
                    }
                    return !1
                }
                delete(e, t) {
                    let r = this,
                        n = !1;

                    function i(e) {
                        if (e = ec(e)) {
                            let i = H.findKey(r, e);
                            i && (!t || ep(r, r[i], i, t)) && (delete r[i], n = !0)
                        }
                    }
                    return H.isArray(e) ? e.forEach(i) : i(e), n
                }
                clear(e) {
                    let t = Object.keys(this),
                        r = t.length,
                        n = !1;
                    for (; r--;) {
                        let i = t[r];
                        (!e || ep(this, this[i], i, e)) && (delete this[i], n = !0)
                    }
                    return n
                }
                normalize(e) {
                    let t = this,
                        r = {};
                    return H.forEach(this, (n, i) => {
                        let o = H.findKey(r, i);
                        if (o) {
                            t[o] = eh(n), delete t[i];
                            return
                        }
                        let s = e ? i.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (e, t, r) => t.toUpperCase() + r) : String(i).trim();
                        s !== i && delete t[i], t[s] = eh(n), r[s] = !0
                    }), this
                }
                concat(...e) {
                    return this.constructor.concat(this, ...e)
                }
                toJSON(e) {
                    let t = Object.create(null);
                    return H.forEach(this, (r, n) => {
                        null != r && !1 !== r && (t[n] = e && H.isArray(r) ? r.join(", ") : r)
                    }), t
                }[Symbol.iterator]() {
                    return Object.entries(this.toJSON())[Symbol.iterator]()
                }
                toString() {
                    return Object.entries(this.toJSON()).map(([e, t]) => e + ": " + t).join("\n")
                }
                get[Symbol.toStringTag]() {
                    return "AxiosHeaders"
                }
                static from(e) {
                    return e instanceof this ? e : new this(e)
                }
                static concat(e, ...t) {
                    let r = new this(e);
                    return t.forEach(e => r.set(e)), r
                }
                static accessor(e) {
                    let t = this[ef] = this[ef] = {
                            accessors: {}
                        },
                        r = t.accessors,
                        n = this.prototype;

                    function i(e) {
                        let t = ec(e);
                        r[t] || (! function(e, t) {
                            let r = H.toCamelCase(" " + t);
                            ["get", "set", "has"].forEach(n => {
                                Object.defineProperty(e, n + r, {
                                    value: function(e, r, i) {
                                        return this[n].call(this, t, e, r, i)
                                    },
                                    configurable: !0
                                })
                            })
                        }(n, e), r[t] = !0)
                    }
                    return H.isArray(e) ? e.forEach(i) : i(e), this
                }
            }

            function ey(e, t) {
                let r = this || ea,
                    n = t || r,
                    i = ed.from(n.headers),
                    o = n.data;
                return H.forEach(e, function(e) {
                    o = e.call(r, o, i.normalize(), t ? t.status : void 0)
                }), i.normalize(), o
            }

            function eg(e) {
                return !!(e && e.__CANCEL__)
            }

            function eb(e, t, r) {
                j.call(this, null == e ? "canceled" : e, j.ERR_CANCELED, t, r), this.name = "CanceledError"
            }
            ed.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]), H.freezeMethods(ed.prototype), H.freezeMethods(ed), H.inherits(eb, j, {
                __CANCEL__: !0
            });
            var em = ei.isStandardBrowserEnv ? {
                write: function(e, t, r, n, i, o) {
                    let s = [];
                    s.push(e + "=" + encodeURIComponent(t)), H.isNumber(r) && s.push("expires=" + new Date(r).toGMTString()), H.isString(n) && s.push("path=" + n), H.isString(i) && s.push("domain=" + i), !0 === o && s.push("secure"), document.cookie = s.join("; ")
                },
                read: function(e) {
                    let t = document.cookie.match(RegExp("(^|;\\s*)(" + e + ")=([^;]*)"));
                    return t ? decodeURIComponent(t[3]) : null
                },
                remove: function(e) {
                    this.write(e, "", Date.now() - 864e5)
                }
            } : {
                write: function() {},
                read: function() {
                    return null
                },
                remove: function() {}
            };

            function ew(e, t) {
                return e && !/^([a-z][a-z\d+\-.]*:)?\/\//i.test(t) ? t ? e.replace(/\/+$/, "") + "/" + t.replace(/^\/+/, "") : e : t
            }
            var eE = ei.isStandardBrowserEnv ? function() {
                    let e;
                    let t = /(msie|trident)/i.test(navigator.userAgent),
                        r = document.createElement("a");

                    function n(e) {
                        let n = e;
                        return t && (r.setAttribute("href", n), n = r.href), r.setAttribute("href", n), {
                            href: r.href,
                            protocol: r.protocol ? r.protocol.replace(/:$/, "") : "",
                            host: r.host,
                            search: r.search ? r.search.replace(/^\?/, "") : "",
                            hash: r.hash ? r.hash.replace(/^#/, "") : "",
                            hostname: r.hostname,
                            port: r.port,
                            pathname: "/" === r.pathname.charAt(0) ? r.pathname : "/" + r.pathname
                        }
                    }
                    return e = n(window.location.href),
                        function(t) {
                            let r = H.isString(t) ? n(t) : t;
                            return r.protocol === e.protocol && r.host === e.host
                        }
                }() : function() {
                    return !0
                },
                eS = function(e, t) {
                    let r;
                    e = e || 10;
                    let n = Array(e),
                        i = Array(e),
                        o = 0,
                        s = 0;
                    return t = void 0 !== t ? t : 1e3,
                        function(a) {
                            let u = Date.now(),
                                l = i[s];
                            r || (r = u), n[o] = a, i[o] = u;
                            let f = s,
                                c = 0;
                            for (; f !== o;) c += n[f++], f %= e;
                            if ((o = (o + 1) % e) === s && (s = (s + 1) % e), u - r < t) return;
                            let h = l && u - l;
                            return h ? Math.round(1e3 * c / h) : void 0
                        }
                };

            function ev(e, t) {
                let r = 0,
                    n = eS(50, 250);
                return i => {
                    let o = i.loaded,
                        s = i.lengthComputable ? i.total : void 0,
                        a = o - r,
                        u = n(a),
                        l = o <= s;
                    r = o;
                    let f = {
                        loaded: o,
                        total: s,
                        progress: s ? o / s : void 0,
                        bytes: a,
                        rate: u || void 0,
                        estimated: u && s && l ? (s - o) / u : void 0,
                        event: i
                    };
                    f[t ? "download" : "upload"] = !0, e(f)
                }
            }
            let e_ = "undefined" != typeof XMLHttpRequest;
            var eT = e_ && function(e) {
                return new Promise(function(t, r) {
                    let n, i = e.data,
                        o = ed.from(e.headers).normalize(),
                        s = e.responseType;

                    function a() {
                        e.cancelToken && e.cancelToken.unsubscribe(n), e.signal && e.signal.removeEventListener("abort", n)
                    }
                    H.isFormData(i) && (ei.isStandardBrowserEnv || ei.isStandardBrowserWebWorkerEnv) && o.setContentType(!1);
                    let u = new XMLHttpRequest;
                    if (e.auth) {
                        let t = e.auth.username || "",
                            r = e.auth.password ? unescape(encodeURIComponent(e.auth.password)) : "";
                        o.set("Authorization", "Basic " + btoa(t + ":" + r))
                    }
                    let l = ew(e.baseURL, e.url);

                    function f() {
                        if (!u) return;
                        let n = ed.from("getAllResponseHeaders" in u && u.getAllResponseHeaders()),
                            i = s && "text" !== s && "json" !== s ? u.response : u.responseText,
                            o = {
                                data: i,
                                status: u.status,
                                statusText: u.statusText,
                                headers: n,
                                config: e,
                                request: u
                            };
                        ! function(e, t, r) {
                            let n = r.config.validateStatus;
                            !r.status || !n || n(r.status) ? e(r) : t(new j("Request failed with status code " + r.status, [j.ERR_BAD_REQUEST, j.ERR_BAD_RESPONSE][Math.floor(r.status / 100) - 4], r.config, r.request, r))
                        }(function(e) {
                            t(e), a()
                        }, function(e) {
                            r(e), a()
                        }, o), u = null
                    }
                    if (u.open(e.method.toUpperCase(), J(l, e.params, e.paramsSerializer), !0), u.timeout = e.timeout, "onloadend" in u ? u.onloadend = f : u.onreadystatechange = function() {
                            u && 4 === u.readyState && (0 !== u.status || u.responseURL && 0 === u.responseURL.indexOf("file:")) && setTimeout(f)
                        }, u.onabort = function() {
                            u && (r(new j("Request aborted", j.ECONNABORTED, e, u)), u = null)
                        }, u.onerror = function() {
                            r(new j("Network Error", j.ERR_NETWORK, e, u)), u = null
                        }, u.ontimeout = function() {
                            let t = e.timeout ? "timeout of " + e.timeout + "ms exceeded" : "timeout exceeded",
                                n = e.transitional || Q;
                            e.timeoutErrorMessage && (t = e.timeoutErrorMessage), r(new j(t, n.clarifyTimeoutError ? j.ETIMEDOUT : j.ECONNABORTED, e, u)), u = null
                        }, ei.isStandardBrowserEnv) {
                        let t = (e.withCredentials || eE(l)) && e.xsrfCookieName && em.read(e.xsrfCookieName);
                        t && o.set(e.xsrfHeaderName, t)
                    }
                    void 0 === i && o.setContentType(null), "setRequestHeader" in u && H.forEach(o.toJSON(), function(e, t) {
                        u.setRequestHeader(t, e)
                    }), H.isUndefined(e.withCredentials) || (u.withCredentials = !!e.withCredentials), s && "json" !== s && (u.responseType = e.responseType), "function" == typeof e.onDownloadProgress && u.addEventListener("progress", ev(e.onDownloadProgress, !0)), "function" == typeof e.onUploadProgress && u.upload && u.upload.addEventListener("progress", ev(e.onUploadProgress)), (e.cancelToken || e.signal) && (n = t => {
                        u && (r(!t || t.type ? new eb(null, e, u) : t), u.abort(), u = null)
                    }, e.cancelToken && e.cancelToken.subscribe(n), e.signal && (e.signal.aborted ? n() : e.signal.addEventListener("abort", n)));
                    let c = function(e) {
                        let t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
                        return t && t[1] || ""
                    }(l);
                    if (c && -1 === ei.protocols.indexOf(c)) {
                        r(new j("Unsupported protocol " + c + ":", j.ERR_BAD_REQUEST, e));
                        return
                    }
                    u.send(i || null)
                })
            };
            let eA = {
                http: null,
                xhr: eT
            };
            H.forEach(eA, (e, t) => {
                if (e) {
                    try {
                        Object.defineProperty(e, "name", {
                            value: t
                        })
                    } catch (e) {}
                    Object.defineProperty(e, "adapterName", {
                        value: t
                    })
                }
            });
            var eO = {
                getAdapter: e => {
                    let t, r;
                    e = H.isArray(e) ? e : [e];
                    let {
                        length: n
                    } = e;
                    for (let i = 0; i < n && (t = e[i], !(r = H.isString(t) ? eA[t.toLowerCase()] : t)); i++);
                    if (!r) {
                        if (!1 === r) throw new j(`Adapter ${t} is not supported by the environment`, "ERR_NOT_SUPPORT");
                        throw Error(H.hasOwnProp(eA, t) ? `Adapter '${t}' is not available in the build` : `Unknown adapter '${t}'`)
                    }
                    if (!H.isFunction(r)) throw TypeError("adapter is not a function");
                    return r
                },
                adapters: eA
            };

            function eI(e) {
                if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted) throw new eb(null, e)
            }

            function eP(e) {
                eI(e), e.headers = ed.from(e.headers), e.data = ey.call(e, e.transformRequest), -1 !== ["post", "put", "patch"].indexOf(e.method) && e.headers.setContentType("application/x-www-form-urlencoded", !1);
                let t = eO.getAdapter(e.adapter || ea.adapter);
                return t(e).then(function(t) {
                    return eI(e), t.data = ey.call(e, e.transformResponse, t), t.headers = ed.from(t.headers), t
                }, function(t) {
                    return !eg(t) && (eI(e), t && t.response && (t.response.data = ey.call(e, e.transformResponse, t.response), t.response.headers = ed.from(t.response.headers))), Promise.reject(t)
                })
            }
            let ek = e => e instanceof ed ? e.toJSON() : e;

            function ex(e, t) {
                t = t || {};
                let r = {};

                function n(e, t, r) {
                    return H.isPlainObject(e) && H.isPlainObject(t) ? H.merge.call({
                        caseless: r
                    }, e, t) : H.isPlainObject(t) ? H.merge({}, t) : H.isArray(t) ? t.slice() : t
                }

                function i(e, t, r) {
                    return H.isUndefined(t) ? H.isUndefined(e) ? void 0 : n(void 0, e, r) : n(e, t, r)
                }

                function o(e, t) {
                    if (!H.isUndefined(t)) return n(void 0, t)
                }

                function s(e, t) {
                    return H.isUndefined(t) ? H.isUndefined(e) ? void 0 : n(void 0, e) : n(void 0, t)
                }

                function a(r, i, o) {
                    return o in t ? n(r, i) : o in e ? n(void 0, r) : void 0
                }
                let u = {
                    url: o,
                    method: o,
                    data: o,
                    baseURL: s,
                    transformRequest: s,
                    transformResponse: s,
                    paramsSerializer: s,
                    timeout: s,
                    timeoutMessage: s,
                    withCredentials: s,
                    adapter: s,
                    responseType: s,
                    xsrfCookieName: s,
                    xsrfHeaderName: s,
                    onUploadProgress: s,
                    onDownloadProgress: s,
                    decompress: s,
                    maxContentLength: s,
                    maxBodyLength: s,
                    beforeRedirect: s,
                    transport: s,
                    httpAgent: s,
                    httpsAgent: s,
                    cancelToken: s,
                    socketPath: s,
                    responseEncoding: s,
                    validateStatus: a,
                    headers: (e, t) => i(ek(e), ek(t), !0)
                };
                return H.forEach(Object.keys(e).concat(Object.keys(t)), function(n) {
                    let o = u[n] || i,
                        s = o(e[n], t[n], n);
                    H.isUndefined(s) && o !== a || (r[n] = s)
                }), r
            }
            let eR = "1.3.2",
                eB = {};
            ["object", "boolean", "number", "function", "string", "symbol"].forEach((e, t) => {
                eB[e] = function(r) {
                    return typeof r === e || "a" + (t < 1 ? "n " : " ") + e
                }
            });
            let eN = {};
            eB.transitional = function(e, t, r) {
                function n(e, t) {
                    return "[Axios v" + eR + "] Transitional option '" + e + "'" + t + (r ? ". " + r : "")
                }
                return (r, i, o) => {
                    if (!1 === e) throw new j(n(i, " has been removed" + (t ? " in " + t : "")), j.ERR_DEPRECATED);
                    return t && !eN[i] && (eN[i] = !0, console.warn(n(i, " has been deprecated since v" + t + " and will be removed in the near future"))), !e || e(r, i, o)
                }
            };
            var eU = {
                assertOptions: function(e, t, r) {
                    if ("object" != typeof e) throw new j("options must be an object", j.ERR_BAD_OPTION_VALUE);
                    let n = Object.keys(e),
                        i = n.length;
                    for (; i-- > 0;) {
                        let o = n[i],
                            s = t[o];
                        if (s) {
                            let t = e[o],
                                r = void 0 === t || s(t, o, e);
                            if (!0 !== r) throw new j("option " + o + " must be " + r, j.ERR_BAD_OPTION_VALUE);
                            continue
                        }
                        if (!0 !== r) throw new j("Unknown option " + o, j.ERR_BAD_OPTION)
                    }
                },
                validators: eB
            };
            let eC = eU.validators;
            class eL {
                constructor(e) {
                    this.defaults = e, this.interceptors = {
                        request: new Z,
                        response: new Z
                    }
                }
                request(e, t) {
                    let r, n, i;
                    "string" == typeof e ? (t = t || {}).url = e : t = e || {}, t = ex(this.defaults, t);
                    let {
                        transitional: o,
                        paramsSerializer: s,
                        headers: a
                    } = t;
                    void 0 !== o && eU.assertOptions(o, {
                        silentJSONParsing: eC.transitional(eC.boolean),
                        forcedJSONParsing: eC.transitional(eC.boolean),
                        clarifyTimeoutError: eC.transitional(eC.boolean)
                    }, !1), void 0 !== s && eU.assertOptions(s, {
                        encode: eC.function,
                        serialize: eC.function
                    }, !0), t.method = (t.method || this.defaults.method || "get").toLowerCase(), (r = a && H.merge(a.common, a[t.method])) && H.forEach(["delete", "get", "head", "post", "put", "patch", "common"], e => {
                        delete a[e]
                    }), t.headers = ed.concat(r, a);
                    let u = [],
                        l = !0;
                    this.interceptors.request.forEach(function(e) {
                        ("function" != typeof e.runWhen || !1 !== e.runWhen(t)) && (l = l && e.synchronous, u.unshift(e.fulfilled, e.rejected))
                    });
                    let f = [];
                    this.interceptors.response.forEach(function(e) {
                        f.push(e.fulfilled, e.rejected)
                    });
                    let c = 0;
                    if (!l) {
                        let e = [eP.bind(this), void 0];
                        for (e.unshift.apply(e, u), e.push.apply(e, f), i = e.length, n = Promise.resolve(t); c < i;) n = n.then(e[c++], e[c++]);
                        return n
                    }
                    i = u.length;
                    let h = t;
                    for (c = 0; c < i;) {
                        let e = u[c++],
                            t = u[c++];
                        try {
                            h = e(h)
                        } catch (e) {
                            t.call(this, e);
                            break
                        }
                    }
                    try {
                        n = eP.call(this, h)
                    } catch (e) {
                        return Promise.reject(e)
                    }
                    for (c = 0, i = f.length; c < i;) n = n.then(f[c++], f[c++]);
                    return n
                }
                getUri(e) {
                    e = ex(this.defaults, e);
                    let t = ew(e.baseURL, e.url);
                    return J(t, e.params, e.paramsSerializer)
                }
            }
            H.forEach(["delete", "get", "head", "options"], function(e) {
                eL.prototype[e] = function(t, r) {
                    return this.request(ex(r || {}, {
                        method: e,
                        url: t,
                        data: (r || {}).data
                    }))
                }
            }), H.forEach(["post", "put", "patch"], function(e) {
                function t(t) {
                    return function(r, n, i) {
                        return this.request(ex(i || {}, {
                            method: e,
                            headers: t ? {
                                "Content-Type": "multipart/form-data"
                            } : {},
                            url: r,
                            data: n
                        }))
                    }
                }
                eL.prototype[e] = t(), eL.prototype[e + "Form"] = t(!0)
            });
            class eH {
                constructor(e) {
                    let t;
                    if ("function" != typeof e) throw TypeError("executor must be a function.");
                    this.promise = new Promise(function(e) {
                        t = e
                    });
                    let r = this;
                    this.promise.then(e => {
                        if (!r._listeners) return;
                        let t = r._listeners.length;
                        for (; t-- > 0;) r._listeners[t](e);
                        r._listeners = null
                    }), this.promise.then = e => {
                        let t;
                        let n = new Promise(e => {
                            r.subscribe(e), t = e
                        }).then(e);
                        return n.cancel = function() {
                            r.unsubscribe(t)
                        }, n
                    }, e(function(e, n, i) {
                        r.reason || (r.reason = new eb(e, n, i), t(r.reason))
                    })
                }
                throwIfRequested() {
                    if (this.reason) throw this.reason
                }
                subscribe(e) {
                    if (this.reason) {
                        e(this.reason);
                        return
                    }
                    this._listeners ? this._listeners.push(e) : this._listeners = [e]
                }
                unsubscribe(e) {
                    if (!this._listeners) return;
                    let t = this._listeners.indexOf(e); - 1 !== t && this._listeners.splice(t, 1)
                }
                static source() {
                    let e;
                    let t = new eH(function(t) {
                        e = t
                    });
                    return {
                        token: t,
                        cancel: e
                    }
                }
            }
            let ej = {
                Continue: 100,
                SwitchingProtocols: 101,
                Processing: 102,
                EarlyHints: 103,
                Ok: 200,
                Created: 201,
                Accepted: 202,
                NonAuthoritativeInformation: 203,
                NoContent: 204,
                ResetContent: 205,
                PartialContent: 206,
                MultiStatus: 207,
                AlreadyReported: 208,
                ImUsed: 226,
                MultipleChoices: 300,
                MovedPermanently: 301,
                Found: 302,
                SeeOther: 303,
                NotModified: 304,
                UseProxy: 305,
                Unused: 306,
                TemporaryRedirect: 307,
                PermanentRedirect: 308,
                BadRequest: 400,
                Unauthorized: 401,
                PaymentRequired: 402,
                Forbidden: 403,
                NotFound: 404,
                MethodNotAllowed: 405,
                NotAcceptable: 406,
                ProxyAuthenticationRequired: 407,
                RequestTimeout: 408,
                Conflict: 409,
                Gone: 410,
                LengthRequired: 411,
                PreconditionFailed: 412,
                PayloadTooLarge: 413,
                UriTooLong: 414,
                UnsupportedMediaType: 415,
                RangeNotSatisfiable: 416,
                ExpectationFailed: 417,
                ImATeapot: 418,
                MisdirectedRequest: 421,
                UnprocessableEntity: 422,
                Locked: 423,
                FailedDependency: 424,
                TooEarly: 425,
                UpgradeRequired: 426,
                PreconditionRequired: 428,
                TooManyRequests: 429,
                RequestHeaderFieldsTooLarge: 431,
                UnavailableForLegalReasons: 451,
                InternalServerError: 500,
                NotImplemented: 501,
                BadGateway: 502,
                ServiceUnavailable: 503,
                GatewayTimeout: 504,
                HttpVersionNotSupported: 505,
                VariantAlsoNegotiates: 506,
                InsufficientStorage: 507,
                LoopDetected: 508,
                NotExtended: 510,
                NetworkAuthenticationRequired: 511
            };
            Object.entries(ej).forEach(([e, t]) => {
                ej[t] = e
            });
            let eD = function e(t) {
                let r = new eL(t),
                    n = i(eL.prototype.request, r);
                return H.extend(n, eL.prototype, r, {
                    allOwnKeys: !0
                }), H.extend(n, r, null, {
                    allOwnKeys: !0
                }), n.create = function(r) {
                    return e(ex(t, r))
                }, n
            }(ea);
            eD.Axios = eL, eD.CanceledError = eb, eD.CancelToken = eH, eD.isCancel = eg, eD.VERSION = eR, eD.toFormData = q, eD.AxiosError = j, eD.Cancel = eD.CanceledError, eD.all = function(e) {
                return Promise.all(e)
            }, eD.spread = function(e) {
                return function(t) {
                    return e.apply(null, t)
                }
            }, eD.isAxiosError = function(e) {
                return H.isObject(e) && !0 === e.isAxiosError
            }, eD.mergeConfig = ex, eD.AxiosHeaders = ed, eD.formToJSON = e => eo(H.isHTMLForm(e) ? new FormData(e) : e), eD.HttpStatusCode = ej, eD.default = eD;
            var eM = eD
        },
        5762: function(e, t, r) {
            "use strict";
            var n = r(28958);
            t.Z = n
        }
    }
]);