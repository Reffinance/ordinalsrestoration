(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [107], {
        66482: function(e, t, n) {
            Promise.resolve().then(n.bind(n, 56070))
        },
        81301: function(e, t, n) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), Object.defineProperty(t, "default", {
                enumerable: !0,
                get: function() {
                    return i
                }
            });
            let l = n(26927);
            n(86006);
            let o = l._(n(1937));

            function r(e) {
                return {
                    default: (null == e ? void 0 : e.default) || e
                }
            }

            function i(e, t) {
                let n = o.default,
                    l = {
                        loading: e => {
                            let {
                                error: t,
                                isLoading: n,
                                pastDelay: l
                            } = e;
                            return null
                        }
                    };
                "function" == typeof e && (l.loader = e), Object.assign(l, t);
                let i = l.loader;
                return n({ ...l,
                    loader: () => null != i ? i().then(r) : Promise.resolve(r(() => null))
                })
            }("function" == typeof t.default || "object" == typeof t.default && null !== t.default) && void 0 === t.default.__esModule && (Object.defineProperty(t.default, "__esModule", {
                value: !0
            }), Object.assign(t.default, t), e.exports = t.default)
        },
        77069: function(e, t, n) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                    value: !0
                }),
                function(e, t) {
                    for (var n in t) Object.defineProperty(e, n, {
                        enumerable: !0,
                        get: t[n]
                    })
                }(t, {
                    suspense: function() {
                        return o
                    },
                    NoSSR: function() {
                        return r
                    }
                }), n(26927), n(86006);
            let l = n(34722);

            function o() {
                let e = Error(l.NEXT_DYNAMIC_NO_SSR_CODE);
                throw e.digest = l.NEXT_DYNAMIC_NO_SSR_CODE, e
            }

            function r(e) {
                let {
                    children: t
                } = e;
                return t
            }
        },
        1937: function(e, t, n) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), Object.defineProperty(t, "default", {
                enumerable: !0,
                get: function() {
                    return i
                }
            });
            let l = n(26927),
                o = l._(n(86006)),
                r = n(77069),
                i = function(e) {
                    let t = Object.assign({
                        loader: null,
                        loading: null,
                        ssr: !0
                    }, e);

                    function n(e) {
                        let n = t.loading,
                            l = o.default.createElement(n, {
                                isLoading: !0,
                                pastDelay: !0,
                                error: null
                            }),
                            i = t.ssr ? o.default.Fragment : r.NoSSR,
                            a = t.lazy;
                        return o.default.createElement(o.default.Suspense, {
                            fallback: l
                        }, o.default.createElement(i, null, o.default.createElement(a, e)))
                    }
                    return t.lazy = o.default.lazy(t.loader), n.displayName = "LoadableComponent", n
                }
        },
        56070: function(e, t, n) {
            "use strict";
            n.r(t);
            var l = n(9268),
                o = n(86006),
                r = n(100),
                i = n.n(r),
                a = n(64744),
                s = n(8683),
                u = n.n(s),
                c = n(34984),
                d = n(41183),
                f = n(84563),
                _ = n(75444),
                m = n(41470),
                h = n(88568),
                b = n(66531),
                p = n(56514),
                v = n(13484);
            let g = [{
                label: "Collection"
            }, {
                label: "Floor"
            }, {
                label: "7D Change"
            }, {
                label: "7D Volume"
            }, {
                label: "Supply"
            }];
            t.default = e => {
                let [t, n] = o.useState("VolumeWeekDesc"), [r, s] = o.useState(!1), [w, y] = o.useState(!0), {
                    data: N,
                    error: x,
                    isLoading: S,
                    isValidating: j,
                    mutate: k,
                    size: C,
                    setSize: D
                } = (0, m.ZP)((n, l) => "".concat(a.T5, "/").concat(a.It, "/").concat(e.query, "?order=").concat(t, "&offset=").concat(10 * n, "&limit=10"), h._i, {
                    initialSize: 1,
                    revalidateFirstPage: !1
                }), O = o.useMemo(() => [{
                    title: "7D Volume",
                    id: "VolumeWeekDesc",
                    onClick: () => {
                        n("VolumeWeekDesc")
                    }
                }, {
                    title: "7D Change",
                    id: "ChangeWeekDesc",
                    onClick: () => {
                        n("ChangeWeekDesc")
                    }
                }, {
                    title: "Lowest floor",
                    id: "FloorAsc",
                    onClick: () => {
                        n("FloorAsc")
                    }
                }, {
                    title: "Highest floor",
                    id: "FloorDesc",
                    onClick: () => {
                        n("FloorDesc")
                    }
                }], []), E = O.find(e => e.id === t), F = (null == e ? void 0 : e.isMobile) ? E.id : (null == t ? void 0 : t.includes("Volume")) ? E.id : "VolumeWeekDesc", L = o.useCallback(async () => {
                    D(C + 1)
                }, [C, D]), M = [];
                if ((null == N ? void 0 : N.length) > 0)
                    for (let e of N) M = (null == e ? void 0 : e.collections) ? M.concat(null == e ? void 0 : e.collections) : M;
                return M.length || S ? (0, l.jsxs)("div", {
                    className: i().root,
                    children: [(0, l.jsx)(b.Z, {
                        title: "Search Results",
                        mobileTitle: !0,
                        selectedOption: t,
                        options: O,
                        gridView: r,
                        setGridView: s,
                        label: "Collection",
                        divider: !0
                    }), (0, l.jsxs)(d.Z, {
                        dataLength: null == M ? void 0 : M.length,
                        next: L,
                        hasMore: (null == M ? void 0 : M.length) % 10 == 0,
                        loader: (0, l.jsx)("div", {
                            className: i().loading,
                            children: (0, l.jsx)(c.default, {})
                        }),
                        children: [r && (0, l.jsx)(_.Z, {
                            className: i().grid,
                            isLoading: S,
                            children: M.map((e, t) => (0, l.jsx)(f.Z, {
                                collection: e
                            }, t))
                        }), !r && (0, l.jsx)(p.Z, {
                            className: i().table,
                            columns: g,
                            headerClassName: i().header,
                            columnClassName: i().column,
                            isLoading: S,
                            children: null == M ? void 0 : M.map((e, t) => (0, l.jsx)(v.Z, {
                                collection: e,
                                selectedKey: F,
                                selectedTitle: E.title
                            }, t))
                        })]
                    })]
                }) : (0, l.jsxs)("div", {
                    className: i().root,
                    children: [(0, l.jsx)(b.Z, {
                        title: "Search Results",
                        mobileTitle: !0,
                        hideViewSelector: !0,
                        selectedOption: t,
                        options: [],
                        gridView: r,
                        setGridView: s,
                        label: "",
                        divider: !0
                    }), (0, l.jsx)("div", {
                        className: u()(i().noResult, "display-sm", "bold"),
                        children: "No Results"
                    })]
                })
            }
        },
        94606: function(e, t, n) {
            "use strict";
            var l = n(9268);
            n(86006);
            var o = n(8683),
                r = n.n(o),
                i = n(34984),
                a = n(4894),
                s = n.n(a);
            t.Z = e => {
                let {
                    className: t
                } = e;
                return (0, l.jsx)("div", {
                    className: r()({
                        [e.className]: !!t
                    }, s().root),
                    children: (0, l.jsx)(i.default, {
                        className: s().loader
                    })
                })
            }
        },
        75444: function(e, t, n) {
            "use strict";
            var l = n(9268);
            n(86006);
            var o = n(7333),
                r = n.n(o),
                i = n(8683),
                a = n.n(i),
                s = n(94606);
            t.Z = e => (null == e ? void 0 : e.isLoading) ? (0, l.jsx)(s.Z, {}) : (0, l.jsx)("div", {
                className: a()({
                    [null == e ? void 0 : e.className]: !!e.className
                }, r().root),
                children: e.children
            })
        },
        31124: function(e, t, n) {
            "use strict";
            var l = n(9268),
                o = n(86006),
                r = n(18698),
                i = n.n(r),
                a = n(8683),
                s = n.n(a);
            t.Z = e => {
                let {
                    className: t
                } = e, n = o.useCallback((e, t) => {
                    let {
                        title: n,
                        selected: o,
                        onClick: r,
                        status: a
                    } = e;
                    return (0, l.jsxs)("div", {
                        className: s()(i().tab, "text-md", "bold", {
                            [i().tabSelected]: o
                        }),
                        onClick: r,
                        children: [n, a && a]
                    }, t)
                }, []);
                return (0, l.jsx)("div", {
                    className: s()(i().root, {
                        [e.className]: !!t
                    }),
                    children: (0, l.jsx)("div", {
                        className: i().tabs,
                        children: e.tabs.map(n)
                    })
                })
            }
        },
        64744: function(e, t, n) {
            "use strict";
            n.d(t, {
                Ao: function() {
                    return C
                },
                Au: function() {
                    return d
                },
                CD: function() {
                    return V
                },
                Di: function() {
                    return N
                },
                Gh: function() {
                    return O
                },
                I9: function() {
                    return m
                },
                Ie: function() {
                    return l
                },
                It: function() {
                    return h
                },
                KL: function() {
                    return R
                },
                KS: function() {
                    return b
                },
                L4: function() {
                    return s
                },
                Mf: function() {
                    return w
                },
                Mq: function() {
                    return a
                },
                NO: function() {
                    return Z
                },
                T5: function() {
                    return o
                },
                X_: function() {
                    return P
                },
                cv: function() {
                    return M
                },
                dE: function() {
                    return v
                },
                eR: function() {
                    return _
                },
                hE: function() {
                    return c
                },
                iV: function() {
                    return x
                },
                lS: function() {
                    return r
                },
                mW: function() {
                    return j
                },
                nB: function() {
                    return u
                },
                oh: function() {
                    return F
                },
                rN: function() {
                    return E
                },
                rc: function() {
                    return D
                },
                rt: function() {
                    return p
                },
                sc: function() {
                    return k
                },
                t6: function() {
                    return y
                },
                ty: function() {
                    return i
                },
                v0: function() {
                    return g
                },
                x4: function() {
                    return L
                },
                yY: function() {
                    return f
                },
                zw: function() {
                    return S
                }
            });
            let l = "https://ordinalswallet.com",
                o = "https://turbo.ordinalswallet.com",
                r = "https://mint.ordinalswallet.com",
                i = "https://twetch.com",
                a = "https://cdn.ordinalswallet.com",
                s = "".concat(a, "/inscription/content"),
                u = "".concat(a, "/inscription/preview"),
                c = "https://discord.gg/ordinalswallet",
                d = "https://mempool.space",
                f = "https://buy.moonpay.com?apiKey=pk_live_MXqk7kNvNuPCPGrnboQzEHXCbPr3hUS&currencyCode=btc",
                _ = "https://media.ordinalswallet.com",
                m = "v2/collections",
                h = "v2/search",
                b = "ordinals_wallet::encrypted_seed",
                p = "ordinals_wallet::encrypted_seed_salt",
                v = "ordinals_wallet::last_active_at",
                g = "ordinals_wallet::public_key",
                w = "ordinals_wallet::taproot_address",
                y = "ordinals_wallet::ack_wallet_warning",
                N = "ordinals_wallet::did_register",
                x = "ordinals_wallet::wallet_type",
                S = "ordinals_wallet::xverse_payment_address",
                j = "ordinals_wallet::xverse_taproot_public_key",
                k = "ordinals_wallet::floating_menu",
                C = "ordinals_wallet::profile",
                D = "ordinals_wallet::quit-password-modal",
                O = 736,
                E = 1073,
                F = 1280,
                L = "h7G763S0UwEsKtHOjqF892RXGg",
                M = "drH1nv5wIVP8j1ZYSb9usg",
                R = "https://brc20api.bestinslot.xyz/v1",
                Z = "https://bestinslot.xyz",
                P = ["bitcoin-rocks", "rare-scrilla-sounds", "ordinal-diamonds", "ordinal-rabbits", "bible-ordinals", "squiggs", "ordinal-tortoises", "the-fiat-collection", "btc-machines", "h17n-text", "bureaucrats", "sharkies"],
                V = ["sat-names", "unisat-names", "xbt-names", "btc-names", "gm-names", "gua-names", "meta-names", "ow-names", "pepe-names", "mllt-names", "ord-names", "magic-names"]
        },
        62454: function(e, t, n) {
            "use strict";
            n.d(t, {
                Z: function() {
                    return i
                }
            });
            var l = n(86006),
                o = n(64744),
                r = function(e, t, n) {
                    let o = (0, l.useRef)();
                    (0, l.useEffect)(() => {
                        let l = (null == n ? void 0 : n.current) || window;
                        if (!(l && l.addEventListener)) return;
                        o.current !== t && (o.current = t);
                        let r = e => {
                            (null == o ? void 0 : o.current) && o.current(e)
                        };
                        return l.addEventListener(e, r), () => {
                            l.removeEventListener(e, r)
                        }
                    }, [e, n, t])
                },
                i = function(e, t) {
                    let [n, i] = (0, l.useState)({
                        width: window.innerWidth,
                        height: window.innerHeight,
                        isMobile: window.innerWidth < o.Gh,
                        isDesktop: window.innerWidth >= o.rN,
                        isLargeDesktop: window.innerWidth >= o.oh
                    });
                    return r("resize", () => {
                        let e = window.innerWidth,
                            t = window.innerHeight;
                        requestAnimationFrame(() => {
                            setTimeout(() => {
                                i({
                                    width: e,
                                    height: t,
                                    isMobile: e < o.Gh,
                                    isDesktop: e >= o.rN,
                                    isLargeDesktop: e >= o.oh
                                })
                            }, 0)
                        })
                    }), n
                }
        },
        100: function(e) {
            e.exports = {
                root: "SearchFeed_root__CL_C3",
                loading: "SearchFeed_loading__rVmjJ",
                grid: "SearchFeed_grid__unoge",
                table: "SearchFeed_table__Lidnr",
                noResult: "SearchFeed_noResult__FgxZa"
            }
        },
        4894: function(e) {
            e.exports = {
                root: "FeedLoadingState_root__kRBXO",
                loader: "FeedLoadingState_loader__D0tc8"
            }
        },
        7333: function(e) {
            e.exports = {
                root: "ItemGrid_root__FxMIV"
            }
        },
        18698: function(e) {
            e.exports = {
                root: "Tabs_root__bzc69",
                tabs: "Tabs_tabs___8zy5",
                tab: "Tabs_tab__EyOgz",
                tabSelected: "Tabs_tabSelected__InTvg"
            }
        },
        28281: function(e) {
            e.exports = {
                style: {
                    fontFamily: "'__Roboto_Mono_65f3ca', '__Roboto_Mono_Fallback_65f3ca'",
                    fontWeight: 400,
                    fontStyle: "normal"
                },
                className: "__className_65f3ca"
            }
        },
        89949: function(e, t, n) {
            "use strict";
            n.d(t, {
                Z: function() {
                    return o
                }
            });
            var l = n(57797),
                o = (0, n(74652).xD)(l.ZP, e => (t, n, l) => (l.revalidateOnFocus = !1, l.revalidateIfStale = !1, l.revalidateOnReconnect = !1, e(t, n, l)))
        }
    },
    function(e) {
        e.O(0, [2938, 7704, 4782, 9942, 7797, 9502, 4043, 1776, 3622, 8067, 1403, 2667, 6488, 1744], function() {
            return e(e.s = 66482)
        }), _N_E = e.O()
    }
]);