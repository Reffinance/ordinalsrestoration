(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [7983], {
        56508: function(t, s, n) {
            "use strict";
            n.d(s, {
                Z: function() {
                    return A
                }
            });
            var o = n(9268),
                e = n(86006),
                i = n(8683),
                c = n.n(i),
                a = n(38012),
                l = n.n(a),
                r = n(21739),
                d = n(83946),
                _ = n(8431),
                u = n(6416),
                p = n.n(u),
                m = t => (0, o.jsxs)("svg", {
                    onClick: t.onClick,
                    viewBox: "0 0 36 36",
                    fill: "none",
                    className: t.className,
                    children: [(0, o.jsxs)("g", {
                        filter: "url(#filter0_b_650_44540)",
                        children: [(0, o.jsx)("rect", {
                            width: "36",
                            height: "36",
                            rx: "18",
                            fill: "#98A2B3",
                            fillOpacity: "0.5"
                        }), (0, o.jsx)("g", {
                            clipPath: "url(#clip0_650_44540)",
                            children: (0, o.jsx)("path", {
                                d: "M18 28C23.4706 28 28 23.4706 28 18C28 12.5392 23.4608 8 17.9902 8C12.5294 8 8 12.5392 8 18C8 23.4706 12.5392 28 18 28ZM18 17.6961C16.5686 17.6863 15.402 16.4804 15.402 14.8529C15.402 13.3431 16.5686 12.0882 18 12.0882C19.4314 12.0882 20.598 13.3431 20.598 14.8529C20.598 16.4804 19.4314 17.7059 18 17.6961ZM13.3824 23.1373C12.9706 23.1373 12.7843 22.8726 12.7843 22.5C12.7843 21.402 14.451 18.5294 18 18.5294C21.549 18.5294 23.2157 21.402 23.2157 22.5C23.2157 22.8726 23.0294 23.1373 22.6176 23.1373H13.3824Z",
                                fill: "white"
                            })
                        })]
                    }), (0, o.jsxs)("defs", {
                        children: [(0, o.jsxs)("filter", {
                            id: "filter0_b_650_44540",
                            x: "-12",
                            y: "-12",
                            width: "60",
                            height: "60",
                            filterUnits: "userSpaceOnUse",
                            colorInterpolationFilters: "sRGB",
                            children: [(0, o.jsx)("feFlood", {
                                floodOpacity: "0",
                                result: "BackgroundImageFix"
                            }), (0, o.jsx)("feGaussianBlur", { in: "BackgroundImageFix",
                                stdDeviation: "6"
                            }), (0, o.jsx)("feComposite", {
                                in2: "SourceAlpha",
                                operator: "in",
                                result: "effect1_backgroundBlur_650_44540"
                            }), (0, o.jsx)("feBlend", {
                                mode: "normal",
                                in: "SourceGraphic",
                                in2: "effect1_backgroundBlur_650_44540",
                                result: "shape"
                            })]
                        }), (0, o.jsx)("clipPath", {
                            id: "clip0_650_44540",
                            children: (0, o.jsx)("rect", {
                                width: "20",
                                height: "20",
                                fill: "white",
                                transform: "translate(8 8)"
                            })
                        })]
                    })]
                }),
                x = n(19744),
                b = n(67692),
                h = n(45406),
                C = n(64744),
                j = n(57797),
                N = n(88986),
                f = n.n(N),
                v = n(93776),
                w = n(88679),
                I = n(4637),
                S = n(96818),
                g = t => (0, o.jsx)(w.Z, {
                    open: t.open,
                    onClose: t.onClose,
                    children: (0, o.jsxs)("div", {
                        className: f().root,
                        onClick: t.onClose,
                        children: [(0, o.jsx)(v.Z, {
                            className: f().icon
                        }), (0, o.jsx)("p", {
                            className: c()(f().title, "text-lg", "semibold"),
                            children: "Nice PFP!"
                        }), (0, o.jsx)("p", {
                            className: c()(f().description, "text-sm", "regular"),
                            children: "Celebrate by sharing it to Twitter \uD83E\uDD73"
                        }), (0, o.jsxs)("div", {
                            className: f().buttons,
                            children: [(0, o.jsx)(S.Z, {
                                buttonClassName: f().button,
                                intent: "I just verified my PFP on @ordinalswallet\n\nCheck it out! \uD83D\uDC47\u2028https://ordinalswallet.com/inscription/".concat(t.inscription.id),
                                iconClassName: f().twitterIcon
                            }), (0, o.jsx)(I.Z, {
                                buttonClassName: f().discord,
                                iconClassName: f().discordIcon
                            })]
                        })]
                    })
                }),
                Z = t => {
                    let [s, n] = e.useState(!1), {
                        mutate: i
                    } = (0, j.kY)(), a = async s => {
                        s.preventDefault(), s.stopPropagation();
                        let o = t.inscription.id,
                            e = b.Z.getTaprootAddress(),
                            i = await b.Z.signInscription(o);
                        n(!0), await h.Z.post("".concat(C.T5, "/wallet/").concat(e, "/icon"), {
                            inscription: o,
                            signature: i
                        }), b.Z.fetchProfile()
                    };
                    return (0, o.jsxs)(o.Fragment, {
                        children: [(0, o.jsx)(x.Z, {
                            placement: "top",
                            title: "Set as PFP",
                            children: (0, o.jsx)("div", {
                                className: c()(t.className, p().root),
                                onClick: a,
                                children: (0, o.jsx)(m, {
                                    className: p().icon
                                })
                            })
                        }), (0, _.createPortal)((0, o.jsx)(g, {
                            open: s,
                            onClose: t => {
                                n(!1)
                            },
                            inscription: t.inscription
                        }), document.body)]
                    })
                },
                M = n(30039),
                k = n.n(M),
                y = n(32692),
                B = n.n(y),
                D = t => {
                    var s, n;
                    let e = b.Z.getTaprootAddress();
                    return (0, o.jsx)(w.Z, {
                        open: t.open,
                        onClose: t.onClose,
                        children: (0, o.jsxs)("div", {
                            className: B().root,
                            onClick: t.onClose,
                            children: [(0, o.jsx)(v.Z, {
                                className: B().icon
                            }), (0, o.jsx)("p", {
                                className: c()(B().title, "text-lg", "semibold"),
                                children: ".Name set!"
                            }), (0, o.jsx)("p", {
                                className: c()(B().description, "text-sm", "regular"),
                                children: "Celebrate by sharing it to Twitter \uD83E\uDD73"
                            }), (0, o.jsxs)("div", {
                                className: B().buttons,
                                children: [(0, o.jsx)(S.Z, {
                                    buttonClassName: B().button,
                                    intent: "I just set my .Name on @ordinalswallet!\n\nYou can now send money directly to ".concat(null == t ? void 0 : null === (s = t.inscription) || void 0 === s ? void 0 : null === (n = s.meta) || void 0 === n ? void 0 : n.name, " !!!\n\nSet yours here \uD83D\uDC47 https://ordinalswallet.com/address/").concat(e),
                                    iconClassName: B().twitterIcon
                                }), (0, o.jsx)(I.Z, {
                                    buttonClassName: B().discord,
                                    iconClassName: B().discordIcon
                                })]
                            })]
                        })
                    })
                },
                T = t => {
                    let [s, n] = e.useState(!1), {
                        mutate: i
                    } = (0, j.kY)(), a = async s => {
                        s.preventDefault(), s.stopPropagation();
                        let o = t.inscription.id,
                            e = b.Z.getTaprootAddress(),
                            i = await b.Z.signInscription(o);
                        n(!0), b.Z.setProfile({
                            sns: t.inscription.meta.name
                        }), await h.Z.post("".concat(C.T5, "/wallet/").concat(e, "/sns"), {
                            inscription: o,
                            signature: i
                        })
                    };
                    return (0, o.jsxs)(o.Fragment, {
                        children: [(0, o.jsx)(x.Z, {
                            placement: "top",
                            title: "Set as .Name",
                            children: (0, o.jsx)("div", {
                                className: c()(t.className, k().root),
                                onClick: a,
                                children: (0, o.jsx)(m, {
                                    className: k().icon
                                })
                            })
                        }), (0, _.createPortal)((0, o.jsx)(D, {
                            open: s,
                            onClose: t => {
                                n(!1)
                            },
                            inscription: t.inscription
                        }), document.body)]
                    })
                },
                P = n(33599),
                F = n(28978),
                A = t => {
                    let {
                        subtitle: s
                    } = t, {
                        id: n,
                        num: i,
                        content_type: a,
                        collection: _,
                        meta: u
                    } = t.inscription, [p, m] = e.useState(!1), x = (0, P.Z)(null == u ? void 0 : u.name), b = {
                        too_many_sats: !0,
                        multiple_inscriptions: !1,
                        sats: 4e6
                    };
                    return e.useMemo(() => b.too_many_sats || b.multiple_inscriptions, []), e.useMemo(() => b.too_many_sats ? "Too many sats in inscription" : b.multiple_inscriptions ? "Multiple inscriptions in UTXO" : void 0, [b]), e.useCallback(t => {
                        t.preventDefault(), t.stopPropagation(), m(!0)
                    }, [t.inscription, b]), e.useCallback(() => m(!1), []), (0, o.jsxs)("div", {
                        className: l().root,
                        children: [(0, o.jsxs)(r.default, {
                            className: l().link,
                            href: "/inscription/".concat(n),
                            children: [(0, o.jsxs)("div", {
                                className: l().contentWrapper,
                                children: [(null == a ? void 0 : a.includes("image")) && t.showSetPfp && (0, o.jsx)(Z, {
                                    inscription: t.inscription,
                                    className: l().pfpButton
                                }), C.CD.includes(null == _ ? void 0 : _.slug) && t.showSetSns && (0, o.jsx)(T, {
                                    inscription: t.inscription,
                                    className: l().pfpButton
                                }), (0, o.jsx)(d.default, {
                                    className: c()(l().content),
                                    inscription: t.inscription
                                })]
                            }), (0, o.jsxs)("div", {
                                className: l().body,
                                children: [(0, o.jsx)("p", {
                                    className: c()(l().title, "text-lg", "bold"),
                                    children: x || "Inscription #".concat(i)
                                }), (0, o.jsxs)("div", {
                                    className: l().row,
                                    children: [!s && (0, o.jsx)("p", {
                                        className: c()(l().subtitle, "text-sm", "semibold"),
                                        children: x ? "Inscription #".concat(i) : a
                                    }), s && (0, o.jsx)("p", {
                                        className: c()(l().subtitle, "text-sm", "semibold"),
                                        children: s
                                    }), (0, o.jsx)(F.Z, {
                                        rank: null == u ? void 0 : u.rank
                                    })]
                                })]
                            })]
                        }), t.footer && (0, o.jsx)("div", {
                            className: l().footer,
                            children: t.footer
                        })]
                    })
                }
        },
        75444: function(t, s, n) {
            "use strict";
            var o = n(9268);
            n(86006);
            var e = n(7333),
                i = n.n(e),
                c = n(8683),
                a = n.n(c),
                l = n(94606);
            s.Z = t => (null == t ? void 0 : t.isLoading) ? (0, o.jsx)(l.Z, {}) : (0, o.jsx)("div", {
                className: a()({
                    [null == t ? void 0 : t.className]: !!t.className
                }, i().root),
                children: t.children
            })
        },
        4637: function(t, s, n) {
            "use strict";
            var o = n(9268);
            n(86006);
            var e = n(301),
                i = n(8683),
                c = n.n(i),
                a = n(64744),
                l = n(41511),
                r = n(10021),
                d = n.n(r);
            s.Z = t => (0, o.jsx)("a", {
                className: c()(d().root, {
                    [t.className]: !!t.className
                }),
                target: "_blank",
                href: a.hE,
                children: (0, o.jsxs)(e.default, {
                    className: c()(d().button, {
                        [t.buttonClassName]: !!t.buttonClassName
                    }),
                    children: [(0, o.jsx)(l.Z, {
                        className: c()(d().icon, {
                            [t.iconClassName]: !!t.iconClassName
                        })
                    }), t.label || "Join Discord!"]
                })
            })
        },
        31124: function(t, s, n) {
            "use strict";
            var o = n(9268),
                e = n(86006),
                i = n(18698),
                c = n.n(i),
                a = n(8683),
                l = n.n(a);
            s.Z = t => {
                let {
                    className: s
                } = t, n = e.useCallback((t, s) => {
                    let {
                        title: n,
                        selected: e,
                        onClick: i,
                        status: a
                    } = t;
                    return (0, o.jsxs)("div", {
                        className: l()(c().tab, "text-md", "bold", {
                            [c().tabSelected]: e
                        }),
                        onClick: i,
                        children: [n, a && a]
                    }, s)
                }, []);
                return (0, o.jsx)("div", {
                    className: l()(c().root, {
                        [t.className]: !!s
                    }),
                    children: (0, o.jsx)("div", {
                        className: c().tabs,
                        children: t.tabs.map(n)
                    })
                })
            }
        },
        96818: function(t, s, n) {
            "use strict";
            var o = n(9268);
            n(86006);
            var e = n(301),
                i = n(8683),
                c = n.n(i),
                a = n(6960),
                l = n(87715),
                r = n.n(l);
            s.Z = t => {
                let s = t.intent ? encodeURIComponent(t.intent) : "I%20just%20joined%20the%20waitlist%20for%20%40ordinalswallet%20%F0%9F%9A%80%0A%0AJoin%20here%3A%20ordinalswallet.com%0A%0Aplz%20RT";
                return (0, o.jsx)("a", {
                    className: c()({
                        [t.className]: !!t.className
                    }, r().root),
                    target: "_blank",
                    href: "https://twitter.com/intent/tweet?text=".concat(s),
                    children: (0, o.jsxs)(e.default, {
                        className: c()({
                            [t.buttonClassName]: !!t.buttonClassName
                        }, r().button),
                        children: [(0, o.jsx)(a.Z, {
                            className: c()({
                                [t.iconClassName]: !!t.iconClassName
                            }, r().icon)
                        }), t.title ? t.title : "Share it!"]
                    })
                })
            }
        },
        38012: function(t) {
            t.exports = {
                root: "InscriptionCard_root__MV19b",
                link: "InscriptionCard_link__nCSvF",
                pfpButton: "InscriptionCard_pfpButton__XtpyH",
                contentWrapper: "InscriptionCard_contentWrapper__lnC6p",
                content: "InscriptionCard_content__fO9_9",
                body: "InscriptionCard_body__JPTAm",
                footer: "InscriptionCard_footer__LCvFx",
                title: "InscriptionCard_title__zkCVw",
                subtitle: "InscriptionCard_subtitle__Yvhsb",
                satsWarning: "InscriptionCard_satsWarning__nc0bj",
                alert: "InscriptionCard_alert__5DF_0",
                warningLabel: "InscriptionCard_warningLabel__bJ1tG",
                row: "InscriptionCard_row__vy33Y"
            }
        },
        7333: function(t) {
            t.exports = {
                root: "ItemGrid_root__FxMIV"
            }
        },
        10021: function(t) {
            t.exports = {
                root: "JoinDiscordButton_root__f6Msq",
                button: "JoinDiscordButton_button__wT2_q",
                icon: "JoinDiscordButton_icon__lZ_G3"
            }
        },
        6416: function(t) {
            t.exports = {
                root: "SetPfpButton_root__N9ZyF",
                icon: "SetPfpButton_icon__65pc_"
            }
        },
        88986: function(t) {
            t.exports = {
                root: "SuccessModal_root__38jJF",
                icon: "SuccessModal_icon__5jvEO",
                title: "SuccessModal_title__tG_9M",
                description: "SuccessModal_description__h6V64",
                buttons: "SuccessModal_buttons__42qYU",
                discord: "SuccessModal_discord__QV_J3",
                discordIcon: "SuccessModal_discordIcon__aozJ_",
                button: "SuccessModal_button__MxWf4",
                twitterIcon: "SuccessModal_twitterIcon__rvKUA"
            }
        },
        30039: function(t) {
            t.exports = {
                root: "SetSnsButton_root__y5MOZ",
                icon: "SetSnsButton_icon__puXqU"
            }
        },
        32692: function(t) {
            t.exports = {
                root: "SuccessModal_root__4XhEm",
                icon: "SuccessModal_icon__otx4D",
                title: "SuccessModal_title__0GZV4",
                description: "SuccessModal_description__sN3Q8",
                buttons: "SuccessModal_buttons__O54FZ",
                discord: "SuccessModal_discord___sHr_",
                discordIcon: "SuccessModal_discordIcon__tTaYK",
                button: "SuccessModal_button__iUG2l",
                twitterIcon: "SuccessModal_twitterIcon__abRVo"
            }
        },
        18698: function(t) {
            t.exports = {
                root: "Tabs_root__bzc69",
                tabs: "Tabs_tabs___8zy5",
                tab: "Tabs_tab__EyOgz",
                tabSelected: "Tabs_tabSelected__InTvg"
            }
        },
        87715: function(t) {
            t.exports = {
                root: "TweetIntentButton_root__iolYU",
                button: "TweetIntentButton_button__9GURi",
                icon: "TweetIntentButton_icon__bjYAA"
            }
        }
    }
]);