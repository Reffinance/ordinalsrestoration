"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [7797], {
        98727: function(e, t, n) {
            /**
             * @license React
             * use-sync-external-store-shim.production.min.js
             *
             * Copyright (c) Facebook, Inc. and its affiliates.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */
            var r = n(86006),
                i = "function" == typeof Object.is ? Object.is : function(e, t) {
                    return e === t && (0 !== e || 1 / e == 1 / t) || e != e && t != t
                },
                u = r.useState,
                o = r.useEffect,
                a = r.useLayoutEffect,
                l = r.useDebugValue;

            function c(e) {
                var t = e.getSnapshot;
                e = e.value;
                try {
                    var n = t();
                    return !i(e, n)
                } catch (e) {
                    return !0
                }
            }
            var s = "undefined" == typeof window || void 0 === window.document || void 0 === window.document.createElement ? function(e, t) {
                return t()
            } : function(e, t) {
                var n = t(),
                    r = u({
                        inst: {
                            value: n,
                            getSnapshot: t
                        }
                    }),
                    i = r[0].inst,
                    s = r[1];
                return a(function() {
                    i.value = n, i.getSnapshot = t, c(i) && s({
                        inst: i
                    })
                }, [e, n, t]), o(function() {
                    return c(i) && s({
                        inst: i
                    }), e(function() {
                        c(i) && s({
                            inst: i
                        })
                    })
                }, [e]), l(n), n
            };
            t.useSyncExternalStore = void 0 !== r.useSyncExternalStore ? r.useSyncExternalStore : s
        },
        3276: function(e, t, n) {
            e.exports = n(98727)
        },
        74652: function(e, t, n) {
            n.d(t, {
                $l: function() {
                    return c
                },
                BN: function() {
                    return M
                },
                DY: function() {
                    return i
                },
                J$: function() {
                    return $
                },
                JN: function() {
                    return v
                },
                LI: function() {
                    return C
                },
                PM: function() {
                    return d
                },
                W6: function() {
                    return O
                },
                i_: function() {
                    return l
                },
                kY: function() {
                    return Z
                },
                ko: function() {
                    return H
                },
                kw: function() {
                    return R
                },
                mf: function() {
                    return f
                },
                o8: function() {
                    return s
                },
                qC: function() {
                    return N
                },
                s6: function() {
                    return G
                },
                sj: function() {
                    return I
                },
                u3: function() {
                    return x
                },
                u_: function() {
                    return j
                },
                w6: function() {
                    return k
                },
                xD: function() {
                    return K
                }
            });
            var r = n(86006);
            let i = new WeakMap,
                u = {},
                o = {},
                a = () => {},
                l = a(),
                c = Object,
                s = e => e === l,
                f = e => "function" == typeof e,
                d = (e, t) => ({ ...e,
                    ...t
                }),
                g = "undefined",
                w = typeof window != g,
                E = typeof document != g,
                p = () => w && typeof window.requestAnimationFrame != g,
                v = (e, t) => {
                    let n = i.get(e);
                    return [() => e.get(t) || u, r => {
                        if (!s(t)) {
                            let i = e.get(t);
                            t in o || (o[t] = i), n[5](t, d(i, r), i || u)
                        }
                    }, n[6], () => !s(t) && t in o ? o[t] : e.get(t) || u]
                },
                h = new WeakMap,
                y = 0,
                _ = e => {
                    let t, n;
                    let r = typeof e,
                        i = e && e.constructor,
                        u = i == Date;
                    if (c(e) !== e || u || i == RegExp) t = u ? e.toJSON() : "symbol" == r ? e.toString() : "string" == r ? JSON.stringify(e) : "" + e;
                    else {
                        if (t = h.get(e)) return t;
                        if (t = ++y + "~", h.set(e, t), i == Array) {
                            for (n = 0, t = "@"; n < e.length; n++) t += _(e[n]) + ",";
                            h.set(e, t)
                        }
                        if (i == c) {
                            t = "#";
                            let r = c.keys(e).sort();
                            for (; !s(n = r.pop());) s(e[n]) || (t += n + ":" + _(e[n]) + ",");
                            h.set(e, t)
                        }
                    }
                    return t
                },
                m = !0,
                [S, b] = w && window.addEventListener ? [window.addEventListener.bind(window), window.removeEventListener.bind(window)] : [a, a],
                T = {
                    initFocus: e => (E && document.addEventListener("visibilitychange", e), S("focus", e), () => {
                        E && document.removeEventListener("visibilitychange", e), b("focus", e)
                    }),
                    initReconnect: e => {
                        let t = () => {
                                m = !0, e()
                            },
                            n = () => {
                                m = !1
                            };
                        return S("online", t), S("offline", n), () => {
                            b("online", t), b("offline", n)
                        }
                    }
                },
                k = !r.useId,
                O = !w || "Deno" in window,
                R = e => p() ? window.requestAnimationFrame(e) : setTimeout(e, 1),
                C = O ? r.useEffect : r.useLayoutEffect,
                L = "undefined" != typeof navigator && navigator.connection,
                V = !O && L && (["slow-2g", "2g"].includes(L.effectiveType) || L.saveData),
                N = e => {
                    if (f(e)) try {
                        e = e()
                    } catch (t) {
                        e = ""
                    }
                    let t = e;
                    return [e = "string" == typeof e ? e : (Array.isArray(e) ? e.length : e) ? _(e) : "", t]
                },
                D = 0,
                x = () => ++D;
            var I = {
                __proto__: null,
                FOCUS_EVENT: 0,
                RECONNECT_EVENT: 1,
                MUTATE_EVENT: 2
            };
            async function M(...e) {
                let [t, n, r, u] = e, o = d({
                    populateCache: !0,
                    throwOnError: !0
                }, "boolean" == typeof u ? {
                    revalidate: u
                } : u || {}), a = o.populateCache, c = o.rollbackOnError, g = o.optimisticData, w = !1 !== o.revalidate, E = e => "function" == typeof c ? c(e) : !1 !== c, p = o.throwOnError;
                if (f(n)) {
                    let e = [],
                        r = t.keys();
                    for (let i = r.next(); !i.done; i = r.next()) {
                        let r = i.value;
                        !r.startsWith("$inf$") && n(t.get(r)._k) && e.push(r)
                    }
                    return Promise.all(e.map(h))
                }
                return h(n);
                async function h(n) {
                    let u;
                    let [o] = N(n);
                    if (!o) return;
                    let [c, d] = v(t, o), [h, y, _] = i.get(t), m = h[o], S = () => w && (delete _[o], m && m[0]) ? m[0](2).then(() => c().data) : c().data;
                    if (e.length < 3) return S();
                    let b = r,
                        T = x();
                    y[o] = [T, 0];
                    let k = !s(g),
                        O = c(),
                        R = O.data,
                        C = O._c,
                        L = s(C) ? R : C;
                    if (k && d({
                            data: g = f(g) ? g(L) : g,
                            _c: L
                        }), f(b)) try {
                        b = b(L)
                    } catch (e) {
                        u = e
                    }
                    if (b && f(b.then)) {
                        if (b = await b.catch(e => {
                                u = e
                            }), T !== y[o][0]) {
                            if (u) throw u;
                            return b
                        }
                        u && k && E(u) && (a = !0, d({
                            data: b = L,
                            _c: l
                        }))
                    }
                    a && !u && (f(a) && (b = a(b, L)), d({
                        data: b,
                        _c: l
                    })), y[o][1] = x();
                    let V = await S();
                    if (d({
                            _c: l
                        }), u) {
                        if (p) throw u;
                        return
                    }
                    return a ? V : b
                }
            }
            let P = (e, t) => {
                    for (let n in e) e[n][0] && e[n][0](t)
                },
                F = (e, t) => {
                    if (!i.has(e)) {
                        let n = d(T, t),
                            r = {},
                            u = M.bind(l, e),
                            o = a,
                            c = {},
                            s = (e, t) => {
                                let n = c[e] || [];
                                return c[e] = n, n.push(t), () => n.splice(n.indexOf(t), 1)
                            },
                            f = (t, n, r) => {
                                e.set(t, n);
                                let i = c[t];
                                if (i)
                                    for (let e = i.length; e--;) i[e](n, r)
                            },
                            g = () => {
                                if (!i.has(e) && (i.set(e, [r, {}, {}, {}, u, f, s]), !O)) {
                                    let t = n.initFocus(setTimeout.bind(l, P.bind(l, r, 0))),
                                        u = n.initReconnect(setTimeout.bind(l, P.bind(l, r, 1)));
                                    o = () => {
                                        t && t(), u && u(), i.delete(e)
                                    }
                                }
                            };
                        return g(), [e, u, g, o]
                    }
                    return [e, i.get(e)[4]]
                },
                [W, A] = F(new Map),
                j = d({
                    onLoadingSlow: a,
                    onSuccess: a,
                    onError: a,
                    onErrorRetry: (e, t, n, r, i) => {
                        let u = n.errorRetryCount,
                            o = i.retryCount,
                            a = ~~((Math.random() + .5) * (1 << (o < 8 ? o : 8))) * n.errorRetryInterval;
                        (s(u) || !(o > u)) && setTimeout(r, a, i)
                    },
                    onDiscarded: a,
                    revalidateOnFocus: !0,
                    revalidateOnReconnect: !0,
                    revalidateIfStale: !0,
                    shouldRetryOnError: !0,
                    errorRetryInterval: V ? 1e4 : 5e3,
                    focusThrottleInterval: 5e3,
                    dedupingInterval: 2e3,
                    loadingTimeout: V ? 5e3 : 3e3,
                    compare: (e, t) => _(e) == _(t),
                    isPaused: () => !1,
                    cache: W,
                    mutate: A,
                    fallback: {}
                }, {
                    isOnline: () => m,
                    isVisible: () => {
                        let e = E && document.visibilityState;
                        return s(e) || "hidden" !== e
                    }
                }),
                J = (e, t) => {
                    let n = d(e, t);
                    if (t) {
                        let {
                            use: r,
                            fallback: i
                        } = e, {
                            use: u,
                            fallback: o
                        } = t;
                        r && u && (n.use = r.concat(u)), i && o && (n.fallback = d(i, o))
                    }
                    return n
                },
                U = (0, r.createContext)({}),
                $ = e => {
                    let {
                        value: t
                    } = e, n = (0, r.useContext)(U), i = f(t), u = (0, r.useMemo)(() => i ? t(n) : t, [i, n, t]), o = (0, r.useMemo)(() => i ? u : J(n, u), [i, n, u]), a = u && u.provider, [c] = (0, r.useState)(() => a ? F(a(o.cache || W), u) : l);
                    return c && (o.cache = c[0], o.mutate = c[1]), C(() => {
                        if (c) return c[2] && c[2](), c[3]
                    }, []), (0, r.createElement)(U.Provider, d(e, {
                        value: o
                    }))
                },
                q = w && window.__SWR_DEVTOOLS_USE__,
                Y = q ? window.__SWR_DEVTOOLS_USE__ : [],
                B = e => f(e[1]) ? [e[0], e[1], e[2] || {}] : [e[0], null, (null === e[1] ? e[2] : e[1]) || {}],
                Z = () => d(j, (0, r.useContext)(U)),
                z = Y.concat(e => (t, n, r) => {
                    let u = n && ((...e) => {
                        let r = N(t)[0],
                            [, , , u] = i.get(W),
                            o = u[r];
                        return o ? (delete u[r], o) : n(...e)
                    });
                    return e(t, u, r)
                }),
                G = e => function(...t) {
                    let n = Z(),
                        [r, i, u] = B(t),
                        o = J(n, u),
                        a = e,
                        {
                            use: l
                        } = o,
                        c = (l || []).concat(z);
                    for (let e = c.length; e--;) a = c[e](a);
                    return a(r, i || o.fetcher || null, o)
                },
                H = (e, t, n) => {
                    let r = t[e] || (t[e] = []);
                    return r.push(n), () => {
                        let e = r.indexOf(n);
                        e >= 0 && (r[e] = r[r.length - 1], r.pop())
                    }
                },
                K = (e, t) => (...n) => {
                    let [r, i, u] = B(n), o = (u.use || []).concat(t);
                    return e(r, i, { ...u,
                        use: o
                    })
                };
            q && (window.__SWR_DEVTOOLS_REACT__ = r)
        },
        57797: function(e, t, n) {
            n.d(t, {
                ZP: function() {
                    return a
                },
                kY: function() {
                    return u.kY
                }
            });
            var r = n(86006),
                i = n(3276),
                u = n(74652);
            let o = {
                dedupe: !0
            };
            u.$l.defineProperty(u.J$, "defaultValue", {
                value: u.u_
            });
            var a = (0, u.s6)((e, t, n) => {
                let {
                    cache: a,
                    compare: l,
                    suspense: c,
                    fallbackData: s,
                    revalidateOnMount: f,
                    revalidateIfStale: d,
                    refreshInterval: g,
                    refreshWhenHidden: w,
                    refreshWhenOffline: E,
                    keepPreviousData: p
                } = n, [v, h, y] = u.DY.get(a), [_, m] = (0, u.qC)(e), S = (0, r.useRef)(!1), b = (0, r.useRef)(!1), T = (0, r.useRef)(_), k = (0, r.useRef)(t), O = (0, r.useRef)(n), R = () => O.current, C = () => R().isVisible() && R().isOnline(), [L, V, N, D] = (0, u.JN)(a, _), x = (0, r.useRef)({}).current, I = (0, u.o8)(s) ? n.fallback[_] : s, M = (e, t) => {
                    let n = !0;
                    for (let r in x) {
                        let i = r;
                        "data" === i ? l(t[i], e[i]) || (0, u.o8)(e[i]) && l(t[i], q) || (n = !1) : t[i] !== e[i] && (n = !1)
                    }
                    return n
                }, P = (0, r.useMemo)(() => {
                    let e = !!_ && !!t && ((0, u.o8)(f) ? !R().isPaused() && !c && (!!(0, u.o8)(d) || d) : f),
                        n = t => {
                            let n = (0, u.PM)(t);
                            return (delete n._k, e) ? {
                                isValidating: !0,
                                isLoading: !0,
                                ...n
                            } : n
                        },
                        r = n(L()),
                        i = n(D());
                    return [() => {
                        let e = n(L());
                        return M(e, r) ? r : r = e
                    }, () => i]
                }, [a, _]), F = (0, i.useSyncExternalStore)((0, r.useCallback)(e => N(_, (t, n) => {
                    M(n, t) || e()
                }), [a, _]), P[0], P[1]), W = !S.current, A = v[_] && v[_].length > 0, j = F.data, J = (0, u.o8)(j) ? I : j, U = F.error, $ = (0, r.useRef)(J), q = p ? (0, u.o8)(j) ? $.current : j : J, Y = (!A || !!(0, u.o8)(U)) && (W && !(0, u.o8)(f) ? f : !R().isPaused() && (c ? !(0, u.o8)(J) && d : (0, u.o8)(J) || d)), B = !!(_ && t && W && Y), Z = (0, u.o8)(F.isValidating) ? B : F.isValidating, z = (0, u.o8)(F.isLoading) ? B : F.isLoading, G = (0, r.useCallback)(async e => {
                    let t, r;
                    let i = k.current;
                    if (!_ || !i || b.current || R().isPaused()) return !1;
                    let o = !0,
                        a = e || {},
                        c = !y[_] || !a.dedupe,
                        s = () => u.w6 ? !b.current && _ === T.current && S.current : _ === T.current,
                        f = {
                            isValidating: !1,
                            isLoading: !1
                        },
                        d = () => {
                            V(f)
                        },
                        g = () => {
                            let e = y[_];
                            e && e[1] === r && delete y[_]
                        },
                        w = {
                            isValidating: !0
                        };
                    (0, u.o8)(L().data) && (w.isLoading = !0);
                    try {
                        if (c && (V(w), n.loadingTimeout && (0, u.o8)(L().data) && setTimeout(() => {
                                o && s() && R().onLoadingSlow(_, n)
                            }, n.loadingTimeout), y[_] = [i(m), (0, u.u3)()]), [t, r] = y[_], t = await t, c && setTimeout(g, n.dedupingInterval), !y[_] || y[_][1] !== r) return c && s() && R().onDiscarded(_), !1;
                        f.error = u.i_;
                        let e = h[_];
                        if (!(0, u.o8)(e) && (r <= e[0] || r <= e[1] || 0 === e[1])) return d(), c && s() && R().onDiscarded(_), !1;
                        let a = L().data;
                        f.data = l(a, t) ? a : t, c && s() && R().onSuccess(t, _, n)
                    } catch (n) {
                        g();
                        let e = R(),
                            {
                                shouldRetryOnError: t
                            } = e;
                        !e.isPaused() && (f.error = n, c && s() && (e.onError(n, _, e), (!0 === t || (0, u.mf)(t) && t(n)) && C() && e.onErrorRetry(n, _, e, G, {
                            retryCount: (a.retryCount || 0) + 1,
                            dedupe: !0
                        })))
                    }
                    return o = !1, d(), !0
                }, [_, a]), H = (0, r.useCallback)((...e) => (0, u.BN)(a, T.current, ...e), []);
                if ((0, u.LI)(() => {
                        k.current = t, O.current = n, (0, u.o8)(j) || ($.current = j)
                    }), (0, u.LI)(() => {
                        if (!_) return;
                        let e = G.bind(u.i_, o),
                            t = 0,
                            n = (0, u.ko)(_, v, n => {
                                if (n == u.sj.FOCUS_EVENT) {
                                    let n = Date.now();
                                    R().revalidateOnFocus && n > t && C() && (t = n + R().focusThrottleInterval, e())
                                } else if (n == u.sj.RECONNECT_EVENT) R().revalidateOnReconnect && C() && e();
                                else if (n == u.sj.MUTATE_EVENT) return G()
                            });
                        return b.current = !1, T.current = _, S.current = !0, V({
                            _k: m
                        }), Y && ((0, u.o8)(J) || u.W6 ? e() : (0, u.kw)(e)), () => {
                            b.current = !0, n()
                        }
                    }, [_]), (0, u.LI)(() => {
                        let e;

                        function t() {
                            let t = (0, u.mf)(g) ? g(J) : g;
                            t && -1 !== e && (e = setTimeout(n, t))
                        }

                        function n() {
                            !L().error && (w || R().isVisible()) && (E || R().isOnline()) ? G(o).then(t) : t()
                        }
                        return t(), () => {
                            e && (clearTimeout(e), e = -1)
                        }
                    }, [g, w, E, _]), (0, r.useDebugValue)(q), c && (0, u.o8)(J) && _) {
                    if (!u.w6 && u.W6) throw Error("Fallback data is required when using suspense in SSR.");
                    throw k.current = t, O.current = n, b.current = !1, (0, u.o8)(U) ? G(o) : U
                }
                return {
                    mutate: H,
                    get data() {
                        return x.data = !0, q
                    },
                    get error() {
                        return x.error = !0, U
                    },
                    get isValidating() {
                        return x.isValidating = !0, Z
                    },
                    get isLoading() {
                        return x.isLoading = !0, z
                    }
                }
            })
        }
    }
]);