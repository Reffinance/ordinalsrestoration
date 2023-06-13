(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [7556], {
        5143: function(e, t, n) {
            Promise.resolve().then(n.bind(n, 31698)), Promise.resolve().then(n.t.bind(n, 61114, 23))
        },
        81301: function(e, t, n) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), Object.defineProperty(t, "default", {
                enumerable: !0,
                get: function() {
                    return r
                }
            });
            let l = n(26927);
            n(86006);
            let o = l._(n(1937));

            function i(e) {
                return {
                    default: (null == e ? void 0 : e.default) || e
                }
            }

            function r(e, t) {
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
                let r = l.loader;
                return n({ ...l,
                    loader: () => null != r ? r().then(i) : Promise.resolve(i(() => null))
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
                        return i
                    }
                }), n(26927), n(86006);
            let l = n(34722);

            function o() {
                let e = Error(l.NEXT_DYNAMIC_NO_SSR_CODE);
                throw e.digest = l.NEXT_DYNAMIC_NO_SSR_CODE, e
            }

            function i(e) {
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
                    return r
                }
            });
            let l = n(26927),
                o = l._(n(86006)),
                i = n(77069),
                r = function(e) {
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
                            r = t.ssr ? o.default.Fragment : i.NoSSR,
                            s = t.lazy;
                        return o.default.createElement(o.default.Suspense, {
                            fallback: l
                        }, o.default.createElement(r, null, o.default.createElement(s, e)))
                    }
                    return t.lazy = o.default.lazy(t.loader), n.displayName = "LoadableComponent", n
                }
        },
        31698: function(e, t, n) {
            "use strict";
            n.r(t), n.d(t, {
                default: function() {
                    return S
                }
            });
            var l = n(9268),
                o = n(86006),
                i = n(55227),
                r = n.n(i),
                s = n(92697),
                c = n.n(s),
                a = n(64744),
                u = n(8683),
                d = n.n(u),
                m = n(35840),
                f = n(75444),
                _ = n(57797),
                h = n(88568),
                v = n(66531),
                b = n(56514),
                p = n(64596),
                w = n(94606),
                k = n(21739),
                g = n(5169);
            let D = !0,
                C = function() {
                    for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                    return D ? [] : (0, h._i)(...t)
                };
            var x = e => {
                    var t, n;
                    let i;
                    let {
                        tabs: r,
                        isMobile: s
                    } = e, [u, h] = o.useState(""), [x, y] = o.useState("VolumeWeekDesc"), [V, N] = o.useState(!1), [j, S] = o.useState(!0), F = (0, g.Z)(u, 300);
                    F && (D = !1);
                    let {
                        data: O,
                        error: Z,
                        isLoading: M
                    } = (i = "".concat(a.T5, "/v2/brc20s?order=").concat(x, "&limit=").concat(10), F && (i = "".concat(i, "&search=").concat(F)), (0, _.ZP)(i, C)), H = o.useMemo(() => [{
                        title: "1H Volume",
                        key: "volume_hour",
                        id: "VolumeHourDesc",
                        onClick: () => {
                            D = !1, y("VolumeHourDesc")
                        }
                    }, {
                        title: "6H Volume",
                        key: "volume_six_hour",
                        id: "VolumeSixHourDesc",
                        onClick: () => {
                            D = !1, y("VolumeSixHourDesc")
                        }
                    }, {
                        title: "24H Volume",
                        key: "volume_day",
                        id: "VolumeDayDesc",
                        onClick: () => {
                            D = !1, y("VolumeDayDesc")
                        }
                    }, {
                        title: "7D Volume",
                        key: "volume_week",
                        id: "VolumeWeekDesc",
                        onClick: () => {
                            D = !1, y("VolumeWeekDesc")
                        }
                    }, {
                        title: "30D Volume",
                        key: "volume_month",
                        id: "VolumeMonthDesc",
                        onClick: () => {
                            D = !1, y("VolumeMonthDesc")
                        }
                    }, {
                        title: "Total Volume",
                        key: "volume_all_time",
                        id: "VolumeTotalDesc",
                        onClick: () => {
                            D = !1, y("VolumeTotalDesc")
                        }
                    }, {
                        title: "7D Change",
                        key: "ChangeWeekDesc",
                        id: "ChangeWeekDesc",
                        onClick: () => {
                            D = !1, y("ChangeWeekDesc")
                        }
                    }, {
                        title: "Lowest floor",
                        key: "FloorAsc",
                        id: "FloorAsc",
                        onClick: () => {
                            D = !1, y("FloorAsc")
                        }
                    }, {
                        title: "Highest floor",
                        key: "FloorDesc",
                        id: "FloorDesc",
                        onClick: () => {
                            D = !1, y("FloorDesc")
                        }
                    }, {
                        title: "Owners",
                        key: "OwnersDesc",
                        id: "OwnersDesc",
                        onClick: () => {
                            D = !1, y("OwnersDesc")
                        }
                    }], []), T = [{
                        label: "Ticker"
                    }, {
                        label: "Market Cap"
                    }, {
                        label: "7D Change"
                    }, {
                        label: (null == x ? void 0 : x.includes("Volume")) ? null === (t = H.find(e => e.id === x)) || void 0 === t ? void 0 : t.title : "7D Volume"
                    }, {
                        label: "Owners"
                    }], E = [];
                    return E = (null == O ? void 0 : null === (n = O.brc20s) || void 0 === n ? void 0 : n.length) ? E.concat(null == O ? void 0 : O.brc20s) : e.items, (0, l.jsxs)("div", {
                        className: c().root,
                        children: [(0, l.jsx)(v.Z, {
                            title: "Collect",
                            mobileTitle: !0,
                            selectedOption: x,
                            options: H,
                            gridView: V,
                            setGridView: N,
                            search: u,
                            setSearch: h,
                            tabs: r,
                            label: "Ticker",
                            divider: !0
                        }), V && (M && !D ? (0, l.jsx)(w.Z, {}) : (0, l.jsx)(f.Z, {
                            className: c().grid,
                            children: null == E ? void 0 : E.map((e, t) => (0, l.jsx)(m.Z, {
                                collection: e
                            }, t))
                        })), !V && (0, l.jsx)(b.Z, {
                            className: c().table,
                            columns: T,
                            headerClassName: c().header,
                            columnClassName: c().column,
                            children: M && !D ? (0, l.jsx)(w.Z, {}) : null == E ? void 0 : E.map((e, t) => {
                                var n, o, i;
                                return (0, l.jsx)(p.Z, {
                                    collection: e,
                                    selectedKey: s ? null === (o = H.find(e => e.id === x)) || void 0 === o ? void 0 : o.key : (null == x ? void 0 : x.includes("Volume")) ? null === (n = H.find(e => e.id === x)) || void 0 === n ? void 0 : n.key : "volume_week",
                                    selectedTitle: null === (i = H.find(e => e.id === x)) || void 0 === i ? void 0 : i.title
                                }, t)
                            })
                        }), (0, l.jsx)("div", {
                            className: c().link,
                            children: (0, l.jsx)(k.default, {
                                href: "/brc20",
                                className: d()(c().viewAll, "text-md", "semibold"),
                                children: "View All"
                            })
                        })]
                    })
                },
                y = n(25027),
                V = n(27390),
                N = n(56008);
            let j = ["nft", "brc20", "names"];
            var S = e => {
                let {
                    isMobile: t,
                    brc20s: n,
                    collections: i,
                    names: s
                } = e, c = (0, N.useRouter)(), a = (0, N.usePathname)(), u = (0, N.useSearchParams)(), [m, f] = o.useState(), _ = [{
                    title: "NFT",
                    onClick: () => {
                        f("nft"), c.push("".concat(a, "?tab=nft"))
                    },
                    selected: "nft" === m
                }, {
                    title: "BRC-20",
                    onClick: () => {
                        f("brc20"), c.push("".concat(a, "?tab=brc20"))
                    },
                    selected: "brc20" === m
                }, {
                    title: "SNS",
                    onClick: () => {
                        f("names"), c.push("".concat(a, "?tab=names"))
                    },
                    selected: "names" === m
                }];
                return o.useEffect(() => {
                    let e = u.get("tab");
                    j.includes(e) ? f(e) : f("nft")
                }, [u]), (0, l.jsxs)("div", {
                    className: d()({
                        [null == e ? void 0 : e.className]: !!(null == e ? void 0 : e.className)
                    }, r().root),
                    children: ["brc20" === m && !(null == e ? void 0 : e.infinite) && (0, l.jsx)(x, {
                        tabs: _,
                        isMobile: t,
                        items: n
                    }), "brc20" === m && (null == e ? void 0 : e.infinite) && (0, l.jsx)(y.default, {
                        title: "Collect",
                        tabs: _,
                        items: n,
                        isMobile: t
                    }), "nft" === m && (0, l.jsx)(V.default, {
                        title: "Collect",
                        tabs: _,
                        isMobile: t,
                        items: i,
                        infinite: null == e ? void 0 : e.infinite
                    }), "names" === m && (0, l.jsx)(V.default, {
                        title: "Collect",
                        tabs: _,
                        isMobile: t,
                        items: s,
                        sns: !0,
                        infinite: e.infinite
                    })]
                })
            }
        },
        27390: function(e, t, n) {
            "use strict";
            n.r(t), n.d(t, {
                default: function() {
                    return V
                }
            });
            var l = n(9268),
                o = n(86006),
                i = n(30076),
                r = n.n(i),
                s = n(64744),
                c = n(34984),
                a = n(41183),
                u = n(84563),
                d = n(75444),
                m = n(57797),
                f = n(88568),
                _ = n(66531),
                h = n(56514),
                v = n(13484),
                b = n(8683),
                p = n.n(b),
                w = n(5169),
                k = n(73795),
                g = n.n(k),
                D = n(21739),
                C = e => (0, l.jsx)("div", {
                    className: p()({
                        [null == e ? void 0 : e.className]: !!(null == e ? void 0 : e.className)
                    }, g().root),
                    children: (0, l.jsx)(D.default, {
                        href: e.href,
                        className: p()(g().viewAll, "text-md", "semibold"),
                        children: "View All"
                    })
                }),
                x = n(41470);
            let y = !0;
            var V = e => {
                let {
                    className: t,
                    isMobile: n,
                    title: i,
                    tabs: b,
                    sns: k,
                    infinite: g
                } = e, [D, V] = o.useState(""), [N, j] = o.useState("VolumeWeekDesc"), [S, F] = o.useState(!1), O = (0, w.Z)(D, 300);
                O && (y = !1);
                let {
                    data: Z,
                    isLoading: M,
                    size: H,
                    setSize: T
                } = g ? function(e, t, n) {
                    let {
                        data: l,
                        isLoading: o,
                        size: i,
                        setSize: r
                    } = (0, x.ZP)((l, o) => {
                        let i = "".concat(s.T5, "/").concat(s.I9, "?order=").concat(t, "&offset=").concat(100 * l, "&sns=").concat(!!n);
                        return e && (i = "".concat(i, "&search=").concat(e)), i
                    }, f._i, {
                        initialSize: 2,
                        revalidateFirstPage: !1
                    }), c = [];
                    if ((null == l ? void 0 : l.length) > 0)
                        for (let e of l) c = (null == e ? void 0 : e.collections) ? c.concat(null == e ? void 0 : e.collections) : c;
                    return {
                        data: c,
                        isLoading: o,
                        size: i,
                        setSize: r
                    }
                }(O, N, k) : function(e, t, n) {
                    var l;
                    let o = "".concat(s.T5, "/").concat(s.I9, "?limit=16&order=").concat(t, "&sns=").concat(!!n);
                    e && (o = "".concat(o, "&search=").concat(e));
                    let {
                        data: i,
                        isLoading: r
                    } = (0, m.ZP)(o, function() {
                        for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                        return y ? [] : (0, f._i)(...t)
                    }), c = (null == i ? void 0 : null === (l = i.collections) || void 0 === l ? void 0 : l.length) ? [].concat(...null == i ? void 0 : i.collections) : [];
                    return {
                        data: c,
                        isLoading: r,
                        size: 0,
                        setSize: () => {}
                    }
                }(O, N, k), E = (null == Z ? void 0 : Z.length) ? [].concat(...Z) : e.items, P = [{
                    title: "1H Volume",
                    id: "VolumeHourDesc",
                    onClick: () => {
                        y = !1, j("VolumeHourDesc")
                    }
                }, {
                    title: "6H Volume",
                    id: "VolumeSixHourDesc",
                    onClick: () => {
                        y = !1, j("VolumeSixHourDesc")
                    }
                }, {
                    title: "24H Volume",
                    id: "VolumeDayDesc",
                    onClick: () => {
                        y = !1, j("VolumeDayDesc")
                    }
                }, {
                    title: "7D Volume",
                    id: "VolumeWeekDesc",
                    onClick: () => {
                        y = !1, j("VolumeWeekDesc")
                    }
                }, {
                    title: "30D Volume",
                    id: "VolumeMonthDesc",
                    onClick: () => {
                        y = !1, j("VolumeMonthDesc")
                    }
                }, {
                    title: "Total Volume",
                    id: "VolumeTotalDesc",
                    onClick: () => {
                        y = !1, j("VolumeTotalDesc")
                    }
                }, {
                    title: "7D Change",
                    id: "ChangeWeekDesc",
                    onClick: () => {
                        y = !1, j("ChangeWeekDesc")
                    }
                }, {
                    title: "Lowest floor",
                    id: "FloorAsc",
                    onClick: () => {
                        y = !1, j("FloorAsc")
                    }
                }, {
                    title: "Highest floor",
                    id: "FloorDesc",
                    onClick: () => {
                        y = !1, j("FloorDesc")
                    }
                }, {
                    title: "Owners",
                    id: "OwnersDesc",
                    onClick: () => {
                        y = !1, j("OwnersDesc")
                    }
                }], W = P.find(e => e.id === N), A = [{
                    label: "Collection"
                }, {
                    label: "Floor"
                }, {
                    label: "7D Change"
                }, {
                    label: (null == N ? void 0 : N.includes("Volume")) ? null == W ? void 0 : W.title : "7D Volume"
                }, {
                    label: "Owners"
                }], L = () => (0, l.jsx)(d.Z, {
                    className: r().grid,
                    isLoading: M && !y,
                    children: null == E ? void 0 : E.map((e, t) => (0, l.jsx)(u.Z, {
                        collection: e
                    }, t))
                }), z = () => {
                    let e = n ? W.id : (null == N ? void 0 : N.includes("Volume")) ? W.id : "VolumeWeekDesc";
                    return (0, l.jsx)(h.Z, {
                        className: r().table,
                        columns: A,
                        headerClassName: r().header,
                        columnClassName: r().column,
                        isLoading: M && !y,
                        children: null == E ? void 0 : E.map((t, n) => (0, l.jsx)(v.Z, {
                            collection: t,
                            selectedKey: e,
                            selectedTitle: W.title
                        }, n))
                    })
                };
                return (0, l.jsxs)("div", {
                    className: p()({
                        [e.className]: !!t
                    }, r().root),
                    children: [(0, l.jsx)(_.Z, {
                        title: i,
                        mobileTitle: !0,
                        selectedOption: N,
                        options: P,
                        gridView: S,
                        setGridView: F,
                        search: k ? void 0 : D,
                        setSearch: k ? void 0 : V,
                        tabs: b,
                        label: k ? "SNS" : "Collection",
                        divider: !0
                    }), !g && (0, l.jsxs)(l.Fragment, {
                        children: [S && L() || !S && z(), (0, l.jsx)(C, {
                            className: r().footer,
                            href: "/collect?tab=".concat(k ? "names" : "nft")
                        })]
                    }), g && (0, l.jsx)(a.Z, {
                        dataLength: null == E ? void 0 : E.length,
                        next: () => T(H + 1),
                        hasMore: (null == E ? void 0 : E.length) % 100 == 0,
                        loader: (0, l.jsx)("div", {
                            className: r().loading,
                            children: (0, l.jsx)(c.default, {})
                        }),
                        children: S && L() || !S && z()
                    })]
                })
            }
        },
        75444: function(e, t, n) {
            "use strict";
            var l = n(9268);
            n(86006);
            var o = n(7333),
                i = n.n(o),
                r = n(8683),
                s = n.n(r),
                c = n(94606);
            t.Z = e => (null == e ? void 0 : e.isLoading) ? (0, l.jsx)(c.Z, {}) : (0, l.jsx)("div", {
                className: s()({
                    [null == e ? void 0 : e.className]: !!e.className
                }, i().root),
                children: e.children
            })
        },
        31124: function(e, t, n) {
            "use strict";
            var l = n(9268),
                o = n(86006),
                i = n(18698),
                r = n.n(i),
                s = n(8683),
                c = n.n(s);
            t.Z = e => {
                let {
                    className: t
                } = e, n = o.useCallback((e, t) => {
                    let {
                        title: n,
                        selected: o,
                        onClick: i,
                        status: s
                    } = e;
                    return (0, l.jsxs)("div", {
                        className: c()(r().tab, "text-md", "bold", {
                            [r().tabSelected]: o
                        }),
                        onClick: i,
                        children: [n, s && s]
                    }, t)
                }, []);
                return (0, l.jsx)("div", {
                    className: c()(r().root, {
                        [e.className]: !!t
                    }),
                    children: (0, l.jsx)("div", {
                        className: r().tabs,
                        children: e.tabs.map(n)
                    })
                })
            }
        },
        64744: function(e, t, n) {
            "use strict";
            n.d(t, {
                Ao: function() {
                    return N
                },
                Au: function() {
                    return d
                },
                CD: function() {
                    return P
                },
                Di: function() {
                    return D
                },
                Gh: function() {
                    return S
                },
                I9: function() {
                    return _
                },
                Ie: function() {
                    return l
                },
                It: function() {
                    return h
                },
                KL: function() {
                    return H
                },
                KS: function() {
                    return v
                },
                L4: function() {
                    return c
                },
                Mf: function() {
                    return k
                },
                Mq: function() {
                    return s
                },
                NO: function() {
                    return T
                },
                T5: function() {
                    return o
                },
                X_: function() {
                    return E
                },
                cv: function() {
                    return M
                },
                dE: function() {
                    return p
                },
                eR: function() {
                    return f
                },
                hE: function() {
                    return u
                },
                iV: function() {
                    return C
                },
                lS: function() {
                    return i
                },
                mW: function() {
                    return y
                },
                nB: function() {
                    return a
                },
                oh: function() {
                    return O
                },
                rN: function() {
                    return F
                },
                rc: function() {
                    return j
                },
                rt: function() {
                    return b
                },
                sc: function() {
                    return V
                },
                t6: function() {
                    return g
                },
                ty: function() {
                    return r
                },
                v0: function() {
                    return w
                },
                x4: function() {
                    return Z
                },
                yY: function() {
                    return m
                },
                zw: function() {
                    return x
                }
            });
            let l = "https://ordinalswallet.com",
                o = "https://turbo.ordinalswallet.com",
                i = "https://mint.ordinalswallet.com",
                r = "https://twetch.com",
                s = "https://cdn.ordinalswallet.com",
                c = "".concat(s, "/inscription/content"),
                a = "".concat(s, "/inscription/preview"),
                u = "https://discord.gg/ordinalswallet",
                d = "https://mempool.space",
                m = "https://buy.moonpay.com?apiKey=pk_live_MXqk7kNvNuPCPGrnboQzEHXCbPr3hUS&currencyCode=btc",
                f = "https://media.ordinalswallet.com",
                _ = "v2/collections",
                h = "v2/search",
                v = "ordinals_wallet::encrypted_seed",
                b = "ordinals_wallet::encrypted_seed_salt",
                p = "ordinals_wallet::last_active_at",
                w = "ordinals_wallet::public_key",
                k = "ordinals_wallet::taproot_address",
                g = "ordinals_wallet::ack_wallet_warning",
                D = "ordinals_wallet::did_register",
                C = "ordinals_wallet::wallet_type",
                x = "ordinals_wallet::xverse_payment_address",
                y = "ordinals_wallet::xverse_taproot_public_key",
                V = "ordinals_wallet::floating_menu",
                N = "ordinals_wallet::profile",
                j = "ordinals_wallet::quit-password-modal",
                S = 736,
                F = 1073,
                O = 1280,
                Z = "h7G763S0UwEsKtHOjqF892RXGg",
                M = "drH1nv5wIVP8j1ZYSb9usg",
                H = "https://brc20api.bestinslot.xyz/v1",
                T = "https://bestinslot.xyz",
                E = ["bitcoin-rocks", "rare-scrilla-sounds", "ordinal-diamonds", "ordinal-rabbits", "bible-ordinals", "squiggs", "ordinal-tortoises", "the-fiat-collection", "btc-machines", "h17n-text", "bureaucrats", "sharkies"],
                P = ["sat-names", "unisat-names", "xbt-names", "btc-names", "gm-names", "gua-names", "meta-names", "ow-names", "pepe-names", "mllt-names", "ord-names", "magic-names"]
        },
        5169: function(e, t, n) {
            "use strict";
            var l = n(86006);
            t.Z = function(e, t) {
                let [n, o] = (0, l.useState)(e);
                return (0, l.useEffect)(() => {
                    let n = setTimeout(() => {
                        o(e)
                    }, t);
                    return () => {
                        clearTimeout(n)
                    }
                }, [e, t]), n
            }
        },
        15648: function(e, t, n) {
            "use strict";
            n.d(t, {
                Z: function() {
                    return i
                }
            });
            var l = n(88568),
                o = n(57797);

            function i() {
                let {
                    data: e,
                    isLoading: t
                } = (0, o.ZP)("https://cloud-functions.twetch.app/api/btc-exchange-rate", l._i);
                return {
                    exchangeRate: null == e ? void 0 : e.price,
                    isLoading: t
                }
            }
        },
        62454: function(e, t, n) {
            "use strict";
            n.d(t, {
                Z: function() {
                    return r
                }
            });
            var l = n(86006),
                o = n(64744),
                i = function(e, t, n) {
                    let o = (0, l.useRef)();
                    (0, l.useEffect)(() => {
                        let l = (null == n ? void 0 : n.current) || window;
                        if (!(l && l.addEventListener)) return;
                        o.current !== t && (o.current = t);
                        let i = e => {
                            (null == o ? void 0 : o.current) && o.current(e)
                        };
                        return l.addEventListener(e, i), () => {
                            l.removeEventListener(e, i)
                        }
                    }, [e, n, t])
                },
                r = function(e, t) {
                    let [n, r] = (0, l.useState)({
                        width: window.innerWidth,
                        height: window.innerHeight,
                        isMobile: window.innerWidth < o.Gh,
                        isDesktop: window.innerWidth >= o.rN,
                        isLargeDesktop: window.innerWidth >= o.oh
                    });
                    return i("resize", () => {
                        let e = window.innerWidth,
                            t = window.innerHeight;
                        requestAnimationFrame(() => {
                            setTimeout(() => {
                                r({
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
        61114: function(e) {
            e.exports = {
                root: "page_root__D2hSo"
            }
        },
        92697: function(e) {
            e.exports = {
                root: "HomeBrc20Feed_root__3hpnL",
                loading: "HomeBrc20Feed_loading__4m9pm",
                grid: "HomeBrc20Feed_grid__O1JJW",
                table: "HomeBrc20Feed_table__Y_CX8",
                viewAll: "HomeBrc20Feed_viewAll__7fRm9",
                link: "HomeBrc20Feed_link__Vjh36"
            }
        },
        55227: function(e) {
            e.exports = {
                root: "CollectFeed_root__F5YMx"
            }
        },
        30076: function(e) {
            e.exports = {
                root: "CollectionsFeed_root__JWvhX",
                loading: "CollectionsFeed_loading__dbZtq",
                grid: "CollectionsFeed_grid__CY0PV",
                table: "CollectionsFeed_table___jE8Q",
                footer: "CollectionsFeed_footer__Jojzj",
                column: "CollectionsFeed_column__3yL2t",
                header: "CollectionsFeed_header__Eyuww"
            }
        },
        73795: function(e) {
            e.exports = {
                root: "FeedFooter_root__X_hVM",
                viewAll: "FeedFooter_viewAll___2b_c"
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
        56008: function(e, t, n) {
            e.exports = n(93027)
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
        e.O(0, [2938, 7704, 4782, 9942, 7797, 9502, 4043, 1776, 3622, 8067, 5922, 1403, 5027, 2667, 6488, 1744], function() {
            return e(e.s = 5143)
        }), _N_E = e.O()
    }
]);