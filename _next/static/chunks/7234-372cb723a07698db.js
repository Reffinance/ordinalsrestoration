(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [7234], {
        61610: function(t, e, n) {
            "use strict";
            n.d(e, {
                Z: function() {
                    return w
                }
            });
            var s = n(9268),
                a = n(86006),
                l = n(17970),
                i = n.n(l),
                o = n(34984),
                r = n(8683),
                c = n.n(r),
                d = n(74243),
                u = n(88568),
                m = n(57797),
                _ = n(64744),
                p = n(67692),
                x = n(21528),
                v = n.n(x),
                h = n(24249),
                f = n.n(h),
                b = n(45665),
                N = n(10654),
                y = t => {
                    let {
                        value: e,
                        setValue: n,
                        className: l,
                        inputClassName: i
                    } = t, [o, r] = a.useState(!1), d = a.useCallback(t => {
                        r(!1), n(t.target.value)
                    }, []);
                    return (0, s.jsx)("div", {
                        className: c()({
                            [t.className]: !!l
                        }, f().root),
                        children: (0, s.jsx)(N.Z, {
                            className: c()({
                                [t.inputClassName]: !!i
                            }, f().input, {
                                [f().error]: o
                            }),
                            placeholder: "Amount",
                            value: e,
                            endAdornmentClassName: f().inputEndAdornment,
                            endAdornment: (0, s.jsx)(b.Z, {
                                type: t.ticker
                            }),
                            onChange: d
                        })
                    })
                },
                j = n(72805),
                g = n(10506),
                C = n(93789),
                I = t => {
                    var e, n;
                    let {
                        data: l,
                        onClick: i,
                        selected: o
                    } = t, r = "id-".concat(null == l ? void 0 : l.ticker), [d, u] = a.useState(""), [m, _] = a.useState(!1), p = a.useCallback(t => {
                        t.stopPropagation(), _(!m)
                    }, [m]);
                    a.useEffect(() => {
                        o && document.getElementById(r).scrollIntoView({
                            behavior: "smooth",
                            block: "center"
                        })
                    }, [o]);
                    let {
                        inscribe: x
                    } = (0, g.Z)(), h = parseFloat(null == l ? void 0 : l.available_balance), f = parseFloat(d), b = !d || isNaN(f) || f > h || f <= 0, N = a.useCallback(() => {
                        let t = JSON.stringify({
                                p: "brc-20",
                                op: "transfer",
                                tick: null == l ? void 0 : l.ticker,
                                amt: f.toString()
                            }),
                            e = new File([t], "transfer-".concat(f, "-").concat(l.ticker, ".txt"), {
                                type: "text/plain"
                            });
                        x(e)
                    }, [f]), I = a.useCallback(() => {
                        i && i(l.ticker)
                    }, [l]);
                    return (0, s.jsx)("div", {
                        className: c()(v().border, {
                            [v().selected]: o
                        }),
                        id: r,
                        children: (0, s.jsxs)("div", {
                            className: c()(v().root),
                            onClick: I,
                            children: [(0, s.jsxs)("p", {
                                className: c()(v().title, "text-lg", "bold"),
                                children: ["$", null == l ? void 0 : null === (e = l.ticker) || void 0 === e ? void 0 : e.toUpperCase()]
                            }), (0, s.jsxs)("p", {
                                className: c()(v().stat, "text-sm", "semibold"),
                                children: ["Transferable: ", (0, s.jsx)("span", {
                                    children: null == l ? void 0 : l.transferable_balance
                                })]
                            }), (0, s.jsxs)("p", {
                                className: c()(v().stat, "text-sm", "semibold"),
                                children: ["Available: ", (0, s.jsx)("span", {
                                    children: null == l ? void 0 : l.available_balance
                                })]
                            }), (0, s.jsx)("div", {
                                className: v().divider
                            }), (0, s.jsxs)("p", {
                                className: c()(v().stat, "text-sm", "semibold"),
                                children: ["Balance: ", (0, s.jsx)("span", {
                                    children: null == l ? void 0 : l.overall_balance
                                })]
                            }), (0, s.jsx)("div", {
                                className: v().actions,
                                children: (0, s.jsxs)(C.Z, {
                                    title: "Create transfer inscription",
                                    open: m,
                                    handleDrawerToggle: p,
                                    children: [(0, s.jsx)(y, {
                                        value: d,
                                        setValue: u,
                                        ticker: null == l ? void 0 : null === (n = l.ticker) || void 0 === n ? void 0 : n.toUpperCase()
                                    }), (0, s.jsx)(j.Z, {
                                        onClick: N,
                                        disabled: b,
                                        children: "Create inscription"
                                    })]
                                })
                            })]
                        })
                    })
                },
                W = n(94387),
                T = n(56508),
                Z = n(75444),
                w = t => {
                    let e = t.address || p.Z.getTaprootAddress(),
                        [n, l] = a.useState(t.ticker),
                        r = !1;
                    t.address == p.Z.getTaprootAddress() ? r = !0 : t.address || (r = !0), a.useEffect(() => {
                        l(t.ticker)
                    }, [t]);
                    let {
                        data: x,
                        isLoading: v
                    } = (0, d.Z)(null == t ? void 0 : t.address), h = null == x ? void 0 : x.brc20, {
                        data: f,
                        isLoading: b
                    } = function(t, e) {
                        let n = encodeURIComponent(t);
                        return (0, m.ZP)("".concat(_.T5, "/wallet/").concat(e || p.Z.getTaprootAddress(), "/brc20/").concat(n, "/inscriptions"), u._i)
                    }(n, e);
                    a.useEffect(() => {
                        !b && f.length > 0 && n && document.getElementById("transfer-inscriptions").scrollIntoView({
                            behavior: "smooth"
                        })
                    }, [b, f, n]);
                    let N = t => {
                        l(t)
                    };
                    return v ? (0, s.jsx)("div", {
                        className: i().loading,
                        children: (0, s.jsx)(o.default, {})
                    }) : (0, s.jsxs)("div", {
                        className: i().root,
                        children: [(0, s.jsx)("div", {
                            className: i().grid,
                            children: null == h ? void 0 : h.map(t => (0, s.jsx)(I, {
                                data: t,
                                onClick: N,
                                selected: t.ticker == n
                            }, t.ticker))
                        }), b && n && (0, s.jsx)("div", {
                            className: i().loading,
                            children: (0, s.jsx)(o.default, {})
                        }), !b && f.length > 0 && n && (0, s.jsx)("div", {
                            id: "transfer-inscriptions",
                            children: (0, s.jsx)(Z.Z, {
                                className: i().inscriptions,
                                children: null == f ? void 0 : f.map(t => (0, s.jsx)(T.Z, {
                                    inscription: t,
                                    footer: (0, s.jsx)(W.Z, {
                                        inscription: t,
                                        owner: r,
                                        actionClassName: i().action
                                    })
                                }, t.id))
                            })
                        }), !b && 0 == f.length && n && (0, s.jsx)("div", {
                            className: c()(i().empty, "display-sm", "bold"),
                            children: "No Transfer Inscriptions"
                        })]
                    })
                }
        },
        80516: function(t, e, n) {
            "use strict";
            var s = n(9268);
            n(86006);
            var a = n(8683),
                l = n.n(a),
                i = n(77237),
                o = n.n(i);
            e.Z = t => (0, s.jsx)("div", {
                className: o().root,
                children: (0, s.jsx)("div", {
                    className: l()({
                        [t.className]: !!t.className
                    }, {
                        [o().unconfirmed]: "unconfirmed" === t.status
                    }, o().circle)
                })
            })
        },
        85892: function(t, e, n) {
            "use strict";
            n.d(e, {
                Z: function() {
                    return v
                }
            });
            var s = n(9268),
                a = n(86006),
                l = n(43758),
                i = n.n(l),
                o = n(34984),
                r = n(59430),
                c = n(8683),
                d = n.n(c),
                u = n(7178),
                m = n.n(u),
                _ = n(67692),
                p = t => {
                    var e, n, l, i, o;
                    let r = t.data,
                        {
                            amount: c,
                            womp: u
                        } = a.useMemo(() => {
                            let e = t.address || _.Z.getTaprootAddress(),
                                n = r.vin.filter(t => t.prevout.scriptpubkey_address === e).reduce((t, e) => t + e.prevout.value, 0),
                                s = r.vout.filter(t => t.scriptpubkey_address === e).reduce((t, e) => t + e.value, 0),
                                a = s - n;
                            return {
                                amount: (a / 1e8).toFixed(8),
                                womp: a < 0
                            }
                        }, [r, t.address]);
                    return (0, s.jsxs)("a", {
                        href: "https://mempool.space/tx/".concat(r.txid),
                        target: "_blank",
                        className: m().root,
                        children: [(0, s.jsxs)("div", {
                            className: d()(m().title, "text-sm", "medium"),
                            children: [(0, s.jsx)("span", {
                                className: m().womp,
                                children: u ? "Sent" : "Received"
                            }), (null == r ? void 0 : null === (e = r.status) || void 0 === e ? void 0 : e.confirmed) && (0, s.jsx)("p", {
                                className: d()(m().status, m().confirmed, "text-xs", "regular"),
                                children: "Confirmed"
                            }), !(null == r ? void 0 : null === (n = r.status) || void 0 === n ? void 0 : n.confirmed) && (0, s.jsx)("p", {
                                className: d()(m().status, m().pending, "text-xs", "regular"),
                                children: "Pending"
                            })]
                        }), (0, s.jsxs)("div", {
                            className: m().body,
                            children: [!(null == r ? void 0 : null === (l = r.status) || void 0 === l ? void 0 : l.confirmed) && (0, s.jsx)("p", {
                                className: d()(m().timestamp, "text-xs", "regular"),
                                children: "Unconfirmed"
                            }), (null == r ? void 0 : null === (i = r.status) || void 0 === i ? void 0 : i.confirmed) && (0, s.jsx)("p", {
                                className: d()(m().timestamp, "text-xs", "regular"),
                                children: new Date((null == r ? void 0 : null === (o = r.status) || void 0 === o ? void 0 : o.block_time) * 1e3).toLocaleString()
                            }), (0, s.jsxs)("p", {
                                className: d()(m().amount, "text-sm", "medium"),
                                children: [!u && "+", c]
                            })]
                        })]
                    })
                },
                x = n(94126),
                v = t => {
                    let {
                        address: e
                    } = t, {
                        data: n,
                        isLoading: l
                    } = (0, x.Z)(e), c = a.useCallback(t => (0, s.jsx)(p, {
                        data: t,
                        address: e
                    }, t.txid), [e]), u = (0, a.useMemo)(() => e ? "This address doesn't have a wallet history to display" : "You don’t have any wallet history to display", [e]);
                    return l ? (0, s.jsx)("div", {
                        className: i().loading,
                        children: (0, s.jsx)(o.default, {})
                    }) : (0, s.jsx)("div", {
                        className: i().root,
                        children: (null == n ? void 0 : n.length) > 0 ? n.map(c) : (0, s.jsxs)("div", {
                            className: i().emptyContainer,
                            children: [(0, s.jsx)(r.Z, {
                                classNames: d()(i().emptyTitle, "display-lg", "semibold"),
                                children: "Wot?"
                            }), (0, s.jsx)("p", {
                                className: d()(i().emptyText, "text-lg", "regular"),
                                children: u
                            })]
                        })
                    })
                }
        },
        15889: function(t, e, n) {
            "use strict";
            var s = n(9268),
                a = n(86006),
                l = n(8683),
                i = n.n(l),
                o = n(59430),
                r = n(71781),
                c = n(64744),
                d = n(94138),
                u = n.n(d);
            e.Z = t => {
                let {
                    className: e,
                    address: n
                } = t, l = a.useMemo(() => n ? "This address does not own any inscriptions" : "Get mint alerts for our next drop!", [n]);
                return (0, s.jsxs)("div", {
                    className: i()({
                        [t.className]: !!e
                    }, u().root),
                    children: [(0, s.jsxs)("div", {
                        className: u().emptyContainer,
                        children: [(0, s.jsx)(o.Z, {
                            classNames: i()(u().emptyTitle, "display-lg", "semibold"),
                            children: "NGMI"
                        }), (0, s.jsx)("p", {
                            className: i()(u().emptyText, "text-lg", "regular"),
                            children: l
                        })]
                    }), (0, s.jsx)("div", {
                        className: u().emailContainer,
                        children: !n && (0, s.jsx)(r.default, {
                            className: u().email,
                            inputClassname: u().input,
                            buttonClassname: u().button,
                            buttonLabel: "Get mint alerts",
                            successTitle: "Your're getting mint alerts!",
                            tweetIntent: "gm KINGS!\n\nI just signed up for mint alerts on @ordinalswallet!\n\njoin here: ordinalswallet.com\n\nplz RT",
                            waitlist: [c.x4, c.cv]
                        })
                    })]
                })
            }
        },
        2436: function(t, e, n) {
            "use strict";
            var s = n(9268),
                a = n(86006),
                l = n(79966),
                i = n.n(l),
                o = n(8683),
                r = n.n(o),
                c = n(19744),
                d = n(27652),
                u = n.n(d);
            e.Z = t => {
                let [e, n] = a.useState(!1);
                a.useCallback(() => n(!1), []);
                let l = e => {
                        e.preventDefault(), e.stopPropagation();
                        let s = t.value;
                        t.isUrl && (s = "".concat(window.location.origin).concat(s)), n(!0), u()(s), setTimeout(() => n(!1), 1500)
                    },
                    o = () => (0, s.jsxs)("div", {
                        className: r()(i().root, {
                            [null == t ? void 0 : t.className]: !!(null == t ? void 0 : t.className)
                        }),
                        onClick: l,
                        children: [!e && t.label && (0, s.jsx)("p", {
                            className: r()(i().copyLabel, "text-sm", t.copyLabelClassName),
                            children: t.label
                        }), e && (0, s.jsx)("p", {
                            className: r()({
                                [t.copiedClassName]: !!t.copiedClassName
                            }, i().copied, "text-sm", "medium"),
                            children: "Copied!"
                        })]
                    });
                return t.tooltip ? (0, s.jsx)(c.Z, {
                    placement: "top",
                    title: t.tooltip,
                    children: o()
                }) : o()
            }
        },
        71781: function(t, e, n) {
            "use strict";
            n.r(e), n.d(e, {
                default: function() {
                    return h
                }
            });
            var s = n(9268),
                a = n(86006),
                l = n(12253),
                i = n.n(l),
                o = n(8683),
                r = n.n(o),
                c = n(79683),
                d = n(301),
                u = n(56663),
                m = n.n(u),
                _ = n(4637),
                p = n(96818),
                x = n(88679),
                v = t => {
                    let e = t.intent ? t.intent : "gm KINGS!\n\nI just signed up for launch alerts on @ordinalswallet!\n\njoin here: ordinalswallet.com\n\nplz RT";
                    return (0, s.jsx)(x.Z, {
                        open: t.open,
                        onClose: t.onClose,
                        children: (0, s.jsxs)("div", {
                            className: m().root,
                            children: [(0, s.jsx)("img", {
                                className: m().icon,
                                src: "/success.svg"
                            }), (0, s.jsx)("p", {
                                className: r()(m().title, "text-lg", "semibold"),
                                children: t.title ? t.title : "You’re getting launch alerts!"
                            }), (0, s.jsx)("p", {
                                className: r()(m().description, "text-sm", "regular"),
                                children: "Celebrate by sharing it to Twitter \uD83E\uDD73"
                            }), (0, s.jsxs)("div", {
                                className: m().actions,
                                children: [(0, s.jsx)(_.Z, {
                                    className: m().discordButton,
                                    buttonClassName: m().actionButton
                                }), (0, s.jsx)(p.Z, {
                                    className: m().twitterButton,
                                    buttonClassName: m().actionButton,
                                    intent: e
                                })]
                            })]
                        })
                    })
                },
                h = t => {
                    let [e, n] = a.useState(""), [l, o] = a.useState(""), [u, m] = a.useState(!1), _ = a.useCallback(t => {
                        n(t.target.value), t.target.value !== e && o("")
                    }, [e]), p = a.useCallback(t => m(!1), []), x = a.useCallback(async s => {
                        if (s.preventDefault(), s.stopPropagation(), !e) {
                            m(!1), o("Invalid Email");
                            return
                        }
                        try {
                            await fetch("/api/subscribe", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({
                                    email: e,
                                    list: t.waitlist
                                })
                            }), m(!0), n(""), o("")
                        } catch (t) {
                            m(!1), o("Server Error")
                        }
                    }, [e]);
                    return (0, s.jsxs)(s.Fragment, {
                        children: [(0, s.jsxs)("form", {
                            className: r()({
                                [t.className]: !!t.className
                            }, i().root),
                            onSubmit: x,
                            children: [(0, s.jsx)(c.Z, {
                                placeholder: "Enter your email",
                                className: i().inputRoot,
                                inputClassName: r()({
                                    [t.inputClassname]: !!t.inputClassname
                                }, i().input),
                                value: e,
                                onChange: _
                            }), (0, s.jsx)(d.default, {
                                className: r()({
                                    [t.buttonClassname]: !!t.buttonClassname
                                }, i().button),
                                type: "submit",
                                children: l || (t.buttonLabel ? t.buttonLabel : "Get launch alerts")
                            })]
                        }), (0, s.jsx)(v, {
                            open: u,
                            title: t.successTitle,
                            intent: t.tweetIntent,
                            onClose: p
                        })]
                    })
                }
        },
        59430: function(t, e, n) {
            "use strict";
            var s = n(9268);
            n(86006);
            var a = n(97337),
                l = n.n(a),
                i = n(8683),
                o = n.n(i);
            e.Z = t => (0, s.jsx)("div", {
                className: o()(l().root, {
                    [t.classNames]: !!t.classNames
                }),
                children: t.children
            })
        },
        81445: function(t, e, n) {
            "use strict";
            var s = n(9268);
            n(86006);
            var a = n(26867),
                l = n.n(a),
                i = n(8683),
                o = n.n(i);
            e.Z = t => (0, s.jsx)("div", {
                className: o()(l().root, {
                    [t.className]: !!t.className
                }),
                children: (0, s.jsx)("div", {
                    className: l().line
                })
            })
        },
        39630: function(t, e, n) {
            "use strict";
            var s = n(9268),
                a = n(86006),
                l = n(8683),
                i = n.n(l),
                o = n(76394),
                r = n.n(o),
                c = n(64744),
                d = n(12246),
                u = n.n(d);
            let m = t => {
                let {
                    src: e,
                    width: n,
                    quality: s
                } = t;
                return e
            };
            e.Z = t => {
                let {
                    size: e,
                    inscription: n,
                    borderSize: l,
                    defaultGradientId: o,
                    className: d
                } = t, [_, p] = a.useState(!1), x = a.useMemo(() => e || 30, []), v = a.useMemo(() => (null == t ? void 0 : t.src) ? t.src : n && (null == n ? void 0 : n.id) ? "".concat(c.L4, "/").concat(null == n ? void 0 : n.id) : "/default-pfp.png", [t.src, n]), h = a.useMemo(() => l ? x + l : x, [x, l]);
                return (0, s.jsx)("div", {
                    className: i()(u().root, {
                        [t.className]: !!d
                    }),
                    style: {
                        height: "".concat(h, "px"),
                        minHeight: "".concat(h, "px"),
                        minWidth: "".concat(h, "px")
                    },
                    children: v && !_ && (0, s.jsx)(r(), {
                        alt: "Icon",
                        loader: m,
                        className: t.iconClassName,
                        height: x,
                        width: x,
                        src: v,
                        unoptimized: !0,
                        priority: !0,
                        onError: () => p(!0)
                    })
                })
            }
        },
        10506: function(t, e, n) {
            "use strict";
            n.d(e, {
                Z: function() {
                    return a
                }
            });
            var s = n(11553);

            function a() {
                return {
                    inscribe: t => {
                        s.Z.emit("inscribe-modal", {
                            file: t,
                            event: "open"
                        })
                    }
                }
            }
        },
        74243: function(t, e, n) {
            "use strict";
            n.d(e, {
                Z: function() {
                    return o
                }
            });
            var s = n(88568),
                a = n(57797),
                l = n(64744),
                i = n(67692);

            function o(t) {
                if ("xverse" === i.Z.type() && !t) {
                    let t = i.Z.balanceAddress(),
                        e = i.Z.getTaprootAddress(),
                        {
                            data: n,
                            isLoading: o
                        } = (0, a.ZP)("".concat(l.T5, "/wallet/").concat(t), s.UT),
                        {
                            data: r,
                            isLoading: c,
                            mutate: d
                        } = (0, a.ZP)("".concat(l.T5, "/wallet/").concat(e), s.UT),
                        u = {
                            balance: null == n ? void 0 : n.balance,
                            confirmed_balance: null == n ? void 0 : n.confirmed_balance,
                            unconfirmed_balance: null == n ? void 0 : n.unconfirmed_balance,
                            utxo_count: null == n ? void 0 : n.utxo_count,
                            inscriptions: null == r ? void 0 : r.inscriptions,
                            brc20: null == r ? void 0 : r.brc20,
                            inscription_balance: null == r ? void 0 : r.inscription_balance
                        };
                    return {
                        data: u,
                        isLoading: o || c,
                        mutate: d
                    }
                }
                let e = t || i.Z.balanceAddress();
                return (0, a.ZP)("".concat(l.T5, "/wallet/").concat(e), s.UT)
            }
        },
        94126: function(t, e, n) {
            "use strict";
            n.d(e, {
                Z: function() {
                    return o
                }
            });
            var s = n(57797),
                a = n(64744),
                l = n(67692);
            let i = function() {
                for (var t = arguments.length, e = Array(t), n = 0; n < t; n++) e[n] = arguments[n];
                return e[0].includes("null") ? {
                    data: {},
                    isLoading: !1
                } : fetch(e[0], {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    }
                }).then(t => t.json())
            };

            function o(t) {
                return (0, s.ZP)("".concat(a.T5, "/wallet/").concat(t || l.Z.getTaprootAddress(), "/history"), i)
            }
        },
        21528: function(t) {
            t.exports = {
                root: "WalletBrc20Card_root__IVjBA",
                title: "WalletBrc20Card_title__XQ6Kl",
                border: "WalletBrc20Card_border__FLuWk",
                selected: "WalletBrc20Card_selected__lgljF",
                stat: "WalletBrc20Card_stat__p1pmY",
                divider: "WalletBrc20Card_divider__j9N8w",
                actions: "WalletBrc20Card_actions__dQwYM"
            }
        },
        17970: function(t) {
            t.exports = {
                root: "WalletBrc20_root__RYWFm",
                grid: "WalletBrc20_grid__u5g6S",
                loading: "WalletBrc20_loading__TYTcU",
                inscriptions: "WalletBrc20_inscriptions__cLvFF",
                empty: "WalletBrc20_empty__vwkaN"
            }
        },
        77237: function(t) {
            t.exports = {
                root: "WalletConfirmed_root__g6EMx",
                circle: "WalletConfirmed_circle__6SbRQ",
                unconfirmed: "WalletConfirmed_unconfirmed__i5xtL"
            }
        },
        7178: function(t) {
            t.exports = {
                root: "WalletHistoryItem_root__GF_8f",
                title: "WalletHistoryItem_title__H526r",
                womp: "WalletHistoryItem_womp__g0Qfb",
                status: "WalletHistoryItem_status__2okWt",
                confirmed: "WalletHistoryItem_confirmed__mIyLb",
                pending: "WalletHistoryItem_pending__sdpfY",
                timestamp: "WalletHistoryItem_timestamp__Ez2_b",
                transaction: "WalletHistoryItem_transaction__MrnBM",
                body: "WalletHistoryItem_body__HPzaj"
            }
        },
        43758: function(t) {
            t.exports = {
                root: "WalletHistory_root__Gvzad",
                loading: "WalletHistory_loading__6kpU9",
                emptyContainer: "WalletHistory_emptyContainer__vwHok",
                emptyTitle: "WalletHistory_emptyTitle__FiSwm",
                emptyText: "WalletHistory_emptyText__FwKox"
            }
        },
        94138: function(t) {
            t.exports = {
                root: "WalletItemsEmptyState_root__aIOwq",
                emptyContainer: "WalletItemsEmptyState_emptyContainer__wQuW6",
                emptyTitle: "WalletItemsEmptyState_emptyTitle__AT1em",
                emptyText: "WalletItemsEmptyState_emptyText__4mKNN",
                input: "WalletItemsEmptyState_input__RQEQz",
                button: "WalletItemsEmptyState_button__X_G6A",
                emailContainer: "WalletItemsEmptyState_emailContainer__gz1Et",
                email: "WalletItemsEmptyState_email__tG8D_"
            }
        },
        24249: function(t) {
            t.exports = {
                root: "BRC20Input_root__Lz3tx",
                input: "BRC20Input_input__CsJCu",
                loading: "BRC20Input_loading__7ad6b",
                error: "BRC20Input_error__uKjQg",
                icon: "BRC20Input_icon__FnKqE",
                inputEndAdornment: "BRC20Input_inputEndAdornment__zJ_bO",
                altCurrency: "BRC20Input_altCurrency__SWZ9Y",
                altCurrencyLabel: "BRC20Input_altCurrencyLabel__TnXMc",
                altCurrencyIcon: "BRC20Input_altCurrencyIcon__bZ16Q"
            }
        },
        79966: function(t) {
            t.exports = {
                root: "CopyButton_root__l9SDH",
                icon: "CopyButton_icon__oMAVe",
                copyLabel: "CopyButton_copyLabel__BLV2w",
                copied: "CopyButton_copied__j85Yh"
            }
        },
        12253: function(t) {
            t.exports = {
                root: "EmailWaitlist_root__KPMyp",
                input: "EmailWaitlist_input__ZCo_b",
                button: "EmailWaitlist_button__DHYg7"
            }
        },
        56663: function(t) {
            t.exports = {
                root: "SuccessModal_root__79Ntg",
                title: "SuccessModal_title__2m17Q",
                description: "SuccessModal_description__ezKQq",
                actions: "SuccessModal_actions__hXtHX",
                actionButton: "SuccessModal_actionButton__Krnsb",
                discordButton: "SuccessModal_discordButton__IOMX7",
                twitterButton: "SuccessModal_twitterButton__EShPa"
            }
        },
        97337: function(t) {
            t.exports = {
                root: "GradientText_root__mVkmV"
            }
        },
        26867: function(t) {
            t.exports = {
                root: "LineDivider_root__j4_nd",
                line: "LineDivider_line__K7OHh"
            }
        },
        12246: function(t) {
            t.exports = {
                root: "UserIconStatic_root__SkFMv",
                default: "UserIconStatic_default__2EkPO"
            }
        }
    }
]);