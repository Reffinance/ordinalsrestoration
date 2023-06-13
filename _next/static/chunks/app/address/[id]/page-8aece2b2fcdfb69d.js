(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [1091], {
        85160: function(e, s, t) {
            Promise.resolve().then(t.t.bind(t, 55016, 23)), Promise.resolve().then(t.bind(t, 73821))
        },
        73821: function(e, s, t) {
            "use strict";
            t.r(s), t.d(s, {
                default: function() {
                    return A
                }
            });
            var a = t(9268),
                n = t(86006),
                i = t(64744),
                l = t(74243),
                o = t(80516),
                r = t(31124),
                d = t(81445),
                c = t(60359),
                _ = t.n(c),
                C = t(5115),
                u = t(8683),
                Z = t.n(u),
                h = t(9238),
                m = e => {
                    let {
                        address: s
                    } = e, {
                        data: t,
                        isLoading: n
                    } = (0, l.Z)(s), i = (((null == t ? void 0 : t.balance) || 0) / 1e8).toFixed(8);
                    return (0, a.jsxs)("div", {
                        className: _().root,
                        children: [(0, a.jsx)("div", {
                            className: _().balanceContainer,
                            children: (0, a.jsx)("div", {
                                className: Z()(_().address, "display-md", "semibold"),
                                children: s
                            })
                        }), (0, a.jsx)("div", {
                            className: Z()(_().description, _().topLabel, "text-sm"),
                            children: "Address"
                        }), (0, a.jsxs)("div", {
                            className: _().balanceContainer,
                            children: [(0, a.jsx)(C.Z, {
                                className: _().bitcoinIcon
                            }), (0, a.jsxs)("div", {
                                className: Z()(_().balance, "display-md", "semibold"),
                                children: [n && (0, a.jsx)(h.Z, {
                                    variant: "rectangular",
                                    animation: "wave",
                                    classes: {
                                        rectangular: _().valueSkele
                                    }
                                }), !n && i]
                            })]
                        }), (0, a.jsx)("div", {
                            className: Z()(_().description, "text-sm"),
                            children: "Balance"
                        })]
                    })
                },
                x = t(85892),
                p = t(2436),
                M = t(39630),
                j = t(30237),
                N = t(61610),
                v = t(96818),
                f = t(24724),
                b = t(27795),
                w = t.n(b),
                A = e => {
                    let {
                        address: s,
                        profile: t,
                        twetchId: c
                    } = e, {
                        data: _,
                        isLoading: C
                    } = (0, l.Z)(s), [u, Z] = n.useState(""), [h, b] = n.useState("inscriptions"), A = n.useMemo(() => [{
                        title: "Inscriptions",
                        onClick: () => b("inscriptions"),
                        selected: "inscriptions" === h
                    }, {
                        title: "Wallet history",
                        onClick: () => b("wallet-history"),
                        selected: "wallet-history" === h,
                        status: (null == _ ? void 0 : _.unconfirmed_balance) > 0 && (0, a.jsx)(o.Z, {
                            status: "unconfirmed",
                            className: w().walletHistoryStatus
                        })
                    }, {
                        title: "BRC20",
                        onClick: () => b("brc-20"),
                        selected: "brc-20" === h
                    }], [h, _]), B = n.useMemo(() => "".concat(i.Ie, "/address/").concat(s), [s]), k = n.useMemo(() => "GM KINGS!\n\nCheck out this collection on @ordinalswallet !\n\n".concat(B), [B]), g = parseInt(s, 16);
                    return (0, a.jsxs)("div", {
                        className: w().root,
                        children: [(0, a.jsxs)("div", {
                            className: w().walletHeader,
                            children: [!(null == t ? void 0 : t.icon) && (0, a.jsx)(M.Z, {
                                className: w().profilePic,
                                defaultGradientId: g,
                                size: 60
                            }), (null == t ? void 0 : t.icon) && (0, a.jsx)(M.Z, {
                                className: w().profilePic,
                                src: "".concat(i.L4, "/").concat(null == t ? void 0 : t.icon),
                                defaultGradientId: g,
                                size: 60
                            }), (0, a.jsx)(m, {
                                address: s
                            }), (0, a.jsxs)("div", {
                                className: w().actions,
                                children: [c >= 0 ? (0, a.jsxs)("a", {
                                    className: w().outlineButton,
                                    href: "".concat(i.ty, "/u/").concat(c),
                                    target: "_blank",
                                    children: [(0, a.jsx)(f.Z, {
                                        className: w().icon
                                    }), (0, a.jsx)("span", {
                                        className: w().copied,
                                        children: "Owner"
                                    })]
                                }) : (0, a.jsx)(p.Z, {
                                    value: B,
                                    label: "Copy URL",
                                    className: w().outlineButton,
                                    copiedClassName: w().copied
                                }), (0, a.jsx)(v.Z, {
                                    className: w().button,
                                    buttonClassName: w().tweetButton,
                                    title: "Share it",
                                    intent: k
                                })]
                            })]
                        }), (0, a.jsxs)("div", {
                            className: w().container,
                            children: [(0, a.jsx)(d.Z, {
                                className: w().line
                            }), (0, a.jsx)(r.Z, {
                                tabs: A
                            }), "wallet-history" === h && (0, a.jsx)(x.Z, {
                                address: s
                            }), "inscriptions" === h && (0, a.jsx)(j.Z, {
                                address: s,
                                hideFooter: !0
                            }), "brc-20" === h && (0, a.jsx)(N.Z, {
                                ticker: u,
                                address: s
                            })]
                        })]
                    })
                }
        },
        30237: function(e, s, t) {
            "use strict";
            t.d(s, {
                Z: function() {
                    return m
                }
            });
            var a = t(9268),
                n = t(86006),
                i = t(88568),
                l = t(57797),
                o = t(64744),
                r = t(67692),
                d = t(56508),
                c = t(75444),
                _ = t(34984),
                C = t(94387),
                u = t(15889),
                Z = t(59136),
                h = t.n(Z),
                m = e => {
                    let {
                        address: s
                    } = e, {
                        data: t,
                        isLoading: Z
                    } = (0, l.ZP)("".concat(o.T5, "/wallet/").concat(s || r.Z.getTaprootAddress(), "/inscriptions"), i._i), m = n.useCallback(s => (0, a.jsx)(d.Z, {
                        inscription: s,
                        footer: (0, a.jsx)(C.Z, {
                            inscription: s,
                            owner: !e.hideFooter,
                            actionClassName: h().action
                        })
                    }, s.id), [e.hideFooter]);
                    return Z ? (0, a.jsx)("div", {
                        className: h().loading,
                        children: (0, a.jsx)(_.default, {})
                    }) : (0, a.jsx)("div", {
                        className: h().root,
                        children: (null == t ? void 0 : t.length) > 0 ? (0, a.jsx)(c.Z, {
                            className: h().grid,
                            children: t.map(m)
                        }) : (0, a.jsx)(u.Z, {
                            address: s
                        })
                    })
                }
        },
        94606: function(e, s, t) {
            "use strict";
            var a = t(9268);
            t(86006);
            var n = t(8683),
                i = t.n(n),
                l = t(34984),
                o = t(4894),
                r = t.n(o);
            s.Z = e => {
                let {
                    className: s
                } = e;
                return (0, a.jsx)("div", {
                    className: i()({
                        [e.className]: !!s
                    }, r().root),
                    children: (0, a.jsx)(l.default, {
                        className: r().loader
                    })
                })
            }
        },
        24724: function(e, s, t) {
            "use strict";
            var a = t(9268);
            t(86006), s.Z = e => (0, a.jsxs)("svg", {
                onClick: e.onClick,
                viewBox: "0 0 25 24",
                fill: "none",
                className: e.className,
                width: e.width,
                height: e.height,
                children: [(0, a.jsx)("g", {
                    clipPath: "url(#clip0_980_48819)",
                    children: (0, a.jsx)("path", {
                        d: "M3.45046 11.6252C2.48386 10.0027 2.54975 8.07705 3.45046 6.56282C4.3516 8.07705 4.4175 10.0027 3.45046 11.6252ZM3.45046 11.6252C2.54975 13.1394 2.48386 15.0651 3.45046 16.6876C4.4175 15.0651 4.3516 13.1394 3.45046 11.6252ZM12.5003 1.5C11.5996 3.01424 11.5337 4.93991 12.5003 6.56239C13.4669 4.93991 13.401 3.01424 12.5003 1.5ZM12.5003 6.56282C11.5996 8.07705 11.5337 10.0027 12.5003 11.6252C13.4669 10.0027 13.401 8.07705 12.5003 6.56282ZM12.5003 11.6252C11.5996 13.1394 11.5337 15.0651 12.5003 16.6876C13.4669 15.0651 13.401 13.1394 12.5003 11.6252ZM12.5003 16.6876C11.5996 18.2018 11.5337 20.1275 12.5003 21.75C13.4669 20.1275 13.401 18.2018 12.5003 16.6876ZM21.5497 6.56282C20.649 8.07705 20.5831 10.0027 21.5497 11.6252C22.5163 10.0027 22.4504 8.07705 21.5497 6.56282ZM21.5497 11.6252C20.649 13.1394 20.5831 15.0651 21.5497 16.6876C22.5163 15.0651 22.4504 13.1394 21.5497 11.6252ZM7.97537 4.0312C8.94241 5.65411 10.6963 6.56113 12.5003 6.56239C11.597 5.04943 9.90901 4.0312 7.97537 4.0312ZM7.97537 4.0312C9.90901 4.0312 11.597 3.01297 12.5003 1.5C10.6963 1.50127 8.94241 2.40871 7.97537 4.0312ZM7.97537 4.0312C7.00877 5.65411 7.07467 7.57978 7.97537 9.09401C8.87652 7.57978 8.94241 5.65411 7.97537 4.0312ZM3.45089 6.56239C5.25493 6.56113 7.00877 5.65368 7.97537 4.0312C6.04174 4.0312 4.35378 5.04943 3.45089 6.56239ZM17.0248 4.0312C17.9918 5.65411 19.7457 6.56113 21.5497 6.56239C20.6464 5.04943 18.9584 4.0312 17.0248 4.0312ZM17.0248 4.0312C16.0582 5.65411 16.1241 7.57978 17.0248 9.09401C17.9259 7.57978 17.9918 5.65411 17.0248 4.0312ZM12.5003 6.56239C14.3043 6.56113 16.0582 5.65368 17.0248 4.0312C15.0911 4.0312 13.4032 5.04943 12.5003 6.56239ZM12.5003 1.5C13.4032 3.01297 15.0916 4.0312 17.0248 4.0312C16.0582 2.40871 14.3043 1.50127 12.5003 1.5ZM7.97537 9.09359C8.94241 10.7165 10.6963 11.6235 12.5003 11.6248C11.597 10.1118 9.90901 9.09359 7.97537 9.09359ZM7.97537 9.09359C9.90901 9.09359 11.597 8.07536 12.5003 6.56239C10.6963 6.56366 8.94241 7.4711 7.97537 9.09359ZM7.97537 9.09359C7.00877 10.7165 7.07467 12.6422 7.97537 14.1564C8.87652 12.6422 8.94241 10.7165 7.97537 9.09359ZM3.45089 11.6252C5.25493 11.6239 7.00877 10.7165 7.97537 9.09401C6.04174 9.09359 4.35378 10.1118 3.45089 11.6252ZM3.45089 6.56239C4.35378 8.07536 6.04217 9.09359 7.97537 9.09359C7.00877 7.4711 5.25449 6.56366 3.45089 6.56239ZM17.0248 9.09359C17.9918 10.7165 19.7457 11.6235 21.5497 11.6248C20.6464 10.1118 18.9584 9.09359 17.0248 9.09359ZM17.0248 9.09359C18.9584 9.09359 20.6464 8.07536 21.5497 6.56239C19.7457 6.56366 17.9918 7.4711 17.0248 9.09359ZM17.0248 9.09359C16.0582 10.7165 16.1241 12.6422 17.0248 14.1564C17.9259 12.6422 17.9918 10.7165 17.0248 9.09359ZM12.5003 11.6252C14.3043 11.6239 16.0582 10.7165 17.0248 9.09401C15.0911 9.09359 13.4032 10.1118 12.5003 11.6252ZM12.5003 6.56239C13.4032 8.07536 15.0916 9.09359 17.0248 9.09359C16.0582 7.4711 14.3043 6.56366 12.5003 6.56239ZM7.97537 14.1564C8.94241 15.7793 10.6963 16.6863 12.5003 16.6876C11.597 15.1746 9.90901 14.1564 7.97537 14.1564ZM7.97537 14.1564C9.90901 14.1564 11.597 13.1382 12.5003 11.6252C10.6963 11.6265 8.94241 12.5335 7.97537 14.1564ZM7.97537 14.1564C7.00877 15.7793 7.07467 17.705 7.97537 19.2192C8.87652 17.7046 8.94241 15.7789 7.97537 14.1564ZM3.45089 16.6876C5.25493 16.6863 7.00877 15.7789 7.97537 14.1564C6.04174 14.1564 4.35378 15.1746 3.45089 16.6876ZM3.45089 11.6252C4.35378 13.1382 6.04217 14.1564 7.97537 14.1564C7.00877 12.5335 5.25449 11.6265 3.45089 11.6252ZM17.0248 14.1564C17.9918 15.7793 19.7457 16.6863 21.5497 16.6876C20.6464 15.1746 18.9584 14.1564 17.0248 14.1564ZM17.0248 14.1564C18.9584 14.1564 20.6464 13.1382 21.5497 11.6252C19.7457 11.6265 17.9918 12.5335 17.0248 14.1564ZM17.0248 14.1564C16.0582 15.7793 16.1241 17.705 17.0248 19.2192C17.9259 17.7046 17.9918 15.7789 17.0248 14.1564ZM12.5003 16.6876C14.3043 16.6863 16.0582 15.7789 17.0248 14.1564C15.0911 14.1564 13.4032 15.1746 12.5003 16.6876ZM12.5003 11.6252C13.4032 13.1382 15.0916 14.1564 17.0248 14.1564C16.0582 12.5335 14.3043 11.6265 12.5003 11.6252ZM7.97537 19.2188C8.94241 20.8417 10.6963 21.7487 12.5003 21.75C11.597 20.237 9.90901 19.2188 7.97537 19.2188ZM7.97537 19.2188C9.90901 19.2188 11.597 18.2006 12.5003 16.6876C10.6963 16.6889 8.94241 17.5963 7.97537 19.2188ZM3.45089 16.6876C4.35378 18.2006 6.04217 19.2188 7.97537 19.2188C7.00877 17.5963 5.25449 16.6889 3.45089 16.6876ZM17.0248 19.2188C18.9584 19.2188 20.6464 18.2006 21.5497 16.6876C19.7457 16.6889 17.9918 17.5963 17.0248 19.2188ZM12.5003 21.75C14.3043 21.7487 16.0582 20.8413 17.0248 19.2188C15.0911 19.2188 13.4032 20.237 12.5003 21.75ZM12.5003 16.6876C13.4032 18.2006 15.0916 19.2188 17.0248 19.2188C16.0582 17.5963 14.3043 16.6889 12.5003 16.6876Z"
                    })
                }), (0, a.jsx)("defs", {
                    children: (0, a.jsx)("clipPath", {
                        id: "clip0_980_48819",
                        children: (0, a.jsx)("rect", {
                            width: "19.5",
                            height: "20.25",
                            transform: "translate(2.75 1.5)"
                        })
                    })
                })]
            })
        },
        55016: function(e) {
            e.exports = {
                root: "page_root__NHZH2"
            }
        },
        60359: function(e) {
            e.exports = {
                root: "AddressBalance_root__KTst0",
                bitcoinIcon: "AddressBalance_bitcoinIcon__B47xd",
                balanceContainer: "AddressBalance_balanceContainer__evEaH",
                confirmedContainer: "AddressBalance_confirmedContainer__9sKte",
                address: "AddressBalance_address__t0ZrQ",
                balance: "AddressBalance_balance__VYxu_",
                description: "AddressBalance_description__WSU8C",
                topLabel: "AddressBalance_topLabel__skUNe",
                valueSkele: "AddressBalance_valueSkele__BMLtp"
            }
        },
        27795: function(e) {
            e.exports = {
                root: "Address_root__NMeld",
                line: "Address_line__5hWWH",
                walletHeader: "Address_walletHeader__KdxXo",
                walletHistoryStatus: "Address_walletHistoryStatus__w6hTb",
                icon: "Address_icon__QmC44",
                actions: "Address_actions__Q8knn",
                container: "Address_container__MC4Ds",
                outlineButton: "Address_outlineButton__mbhjq",
                tweetButton: "Address_tweetButton__qLrOP",
                copied: "Address_copied___HZDk",
                copy: "Address_copy__sZihi",
                twitter: "Address_twitter__hdC2m",
                addressInfo: "Address_addressInfo__M2upa",
                viewCollection: "Address_viewCollection__SiVpH",
                share: "Address_share__r4d1x",
                button: "Address_button__eccWY",
                profilePic: "Address_profilePic__b11UD"
            }
        },
        59136: function(e) {
            e.exports = {
                root: "WalletItems_root__09FNl",
                loading: "WalletItems_loading__jPhla",
                grid: "WalletItems_grid__quf20",
                action: "WalletItems_action__82l8p"
            }
        },
        4894: function(e) {
            e.exports = {
                root: "FeedLoadingState_root__kRBXO",
                loader: "FeedLoadingState_loader__D0tc8"
            }
        }
    },
    function(e) {
        e.O(0, [7880, 2938, 7704, 4782, 9942, 1083, 3038, 7797, 9744, 97, 8701, 5225, 6306, 2553, 8067, 4854, 7983, 7234, 5654, 2667, 6488, 1744], function() {
            return e(e.s = 85160)
        }), _N_E = e.O()
    }
]);