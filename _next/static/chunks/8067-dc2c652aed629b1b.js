(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [8067], {
        34984: function(n, e, t) {
            "use strict";
            t.r(e);
            var a = t(9268);
            t(86006);
            var s = t(8683),
                l = t.n(s),
                o = t(84065),
                i = t.n(o);
            e.default = n => (0, a.jsxs)("svg", {
                className: l()({
                    [n.className]: !!n.className
                }, i().root),
                xmlns: "http://www.w3.org/2000/svg",
                fill: "none",
                viewBox: "0 0 24 24",
                children: [(0, a.jsx)("circle", {
                    className: "opacity-25",
                    cx: "12",
                    cy: "12",
                    r: "10",
                    stroke: "currentColor",
                    style: {
                        opacity: ".2"
                    },
                    strokeWidth: "4"
                }), (0, a.jsx)("path", {
                    className: "opacity-75",
                    fill: "currentColor",
                    d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                })]
            })
        },
        10654: function(n, e, t) {
            "use strict";
            var a = t(9268),
                s = t(86006),
                l = t(8683),
                o = t.n(l),
                i = t(12565),
                r = t.n(i);
            e.Z = n => {
                let {
                    onParentBlur: e,
                    onParentFocus: t
                } = n, l = s.useCallback(n => {
                    n.preventDefault(), n.stopPropagation(), t && t(n)
                }, [t]), i = s.useCallback(n => {
                    n.preventDefault(), n.stopPropagation(), null === n.relatedTarget && e && e(n)
                }, [e]);
                return (0, a.jsxs)("div", {
                    onClick: n.onClick,
                    onFocus: l,
                    onBlurCapture: i,
                    className: o()(r().root, {
                        [n.className]: !!n.className
                    }),
                    children: [n.startAdornment && (0, a.jsx)("div", {
                        onClick: n.onStartAdornmentClick,
                        className: o()(r().adornment, r().startAdornment, {
                            [n.startAdornmentClassName]: !!n.startAdornmentClassName
                        }),
                        children: n.startAdornment
                    }), !n.multiline && (0, a.jsx)("input", {
                        tabIndex: 0,
                        onChange: n.onChange,
                        className: o()(r().input, {
                            [n.inputClassName]: !!n.inputClassName,
                            [r().disabled]: n.disabled,
                            [r().startAdornmentInput]: !!n.startAdornment,
                            [r().endAdornmentInput]: !!n.endAdornment,
                            [r().error]: !!n.error
                        }),
                        onKeyDown: n.onKeyDown,
                        autoFocus: n.autoFocus,
                        onFocus: n.onFocus,
                        onBlur: n.onBlur,
                        disabled: n.disabled,
                        max: n.max,
                        min: n.min,
                        placeholder: n.placeholder,
                        step: n.step,
                        type: n.type,
                        value: n.value,
                        onPaste: n.onPaste,
                        id: n.inputId,
                        name: n.name,
                        ref: n.inputRef,
                        autoComplete: n.autocomplete || "off"
                    }), n.multiline && (0, a.jsx)("textarea", {
                        tabIndex: 0,
                        onChange: n.onChange,
                        className: o()(r().input, {
                            [n.inputClassName]: !!n.inputClassName,
                            [r().disabled]: n.disabled,
                            [r().startAdornmentInput]: !!n.startAdornment,
                            [r().endAdornmentInput]: !!n.endAdornment
                        }),
                        onKeyDown: n.onKeyDown,
                        onFocus: n.onFocus,
                        onBlur: n.onBlur,
                        autoFocus: n.autoFocus,
                        disabled: n.disabled,
                        placeholder: n.placeholder,
                        rows: n.rows,
                        value: n.value,
                        onPaste: n.onPaste,
                        id: n.inputId,
                        ref: n.inputRef,
                        autoComplete: n.autocomplete || "off"
                    }), n.endAdornment && (0, a.jsx)("div", {
                        tabIndex: 0,
                        onClick: n.onEndAdornmentClick,
                        className: o()(r().adornment, r().endAdornment, {
                            [n.endAdornmentClassName]: !!n.endAdornmentClassName
                        }),
                        children: n.endAdornment
                    })]
                })
            }
        },
        83946: function(n, e, t) {
            "use strict";
            t.r(e), t.d(e, {
                default: function() {
                    return A
                }
            });
            var a = t(9268),
                s = t(28281),
                l = t.n(s);
            t(86006);
            var o = t(4534),
                i = t.n(o),
                r = t(64744),
                c = t(8683),
                d = t.n(c),
                u = t(81301),
                m = t.n(u),
                C = t(88456),
                p = t.n(C),
                N = t(88568),
                v = t(89949),
                _ = n => {
                    let e;
                    let {
                        data: t
                    } = (0, v.Z)("".concat(r.L4, "/").concat(n.inscriptionId), N.K2);
                    try {
                        let s = JSON.parse(t);
                        if ((null == s ? void 0 : s.p) === "gen-brc-721" && (null == s ? void 0 : s.op) === "mint") return (0, a.jsx)("img", {
                            src: "".concat(r.nB, "/").concat(n.inscriptionId),
                            className: d()({
                                [null == n ? void 0 : n.className]: !!(null == n ? void 0 : n.className),
                                [null == n ? void 0 : n.imageClassName]: !!(null == n ? void 0 : n.imageClassName)
                            })
                        });
                        e = JSON.stringify(s, null, 2)
                    } catch (n) {}
                    return (0, a.jsx)("div", {
                        className: d()(p().root, {
                            [n.className]: !!n.className
                        }),
                        children: (0, a.jsx)("div", {
                            className: d()(p().container, {
                                [n.textClassName]: !!n.textClassName
                            }),
                            children: (0, a.jsx)("p", {
                                children: e || t
                            })
                        })
                    })
                },
                x = t(55953),
                g = t.n(x),
                h = n => {
                    var e, t, s;
                    let {
                        data: l
                    } = (0, v.Z)("".concat(r.L4, "/").concat(n.inscriptionId), N._i);
                    return (null == l ? void 0 : null === (e = l.credentialSubject) || void 0 === e ? void 0 : e.image) ? n.isDetail ? (0, a.jsxs)(a.Fragment, {
                        children: [(0, a.jsx)("img", {
                            src: null == l ? void 0 : null === (s = l.credentialSubject) || void 0 === s ? void 0 : s.image,
                            className: d()(g().root, {
                                [n.className]: !!n.className,
                                [n.imageClassName]: !!n.imageClassName
                            })
                        }), (0, a.jsx)("div", {
                            className: d()(g().root, {
                                [n.className]: !!n.className
                            }),
                            children: JSON.stringify(l, null, 2)
                        })]
                    }) : (0, a.jsx)("img", {
                        src: null == l ? void 0 : null === (t = l.credentialSubject) || void 0 === t ? void 0 : t.image,
                        className: d()({
                            [n.className]: !!n.className,
                            [n.imageClassName]: !!n.imageClassName
                        })
                    }) : (null == l ? void 0 : l.p) === "gen-brc-721" && (null == l ? void 0 : l.op) === "mint" || (null == l ? void 0 : l.p) === "brc-721e" ? (0, a.jsx)("img", {
                        src: "".concat(r.nB, "/").concat(n.inscriptionId),
                        className: d()({
                            [null == n ? void 0 : n.className]: !!(null == n ? void 0 : n.className),
                            [null == n ? void 0 : n.imageClassName]: !!(null == n ? void 0 : n.imageClassName)
                        })
                    }) : (0, a.jsx)("div", {
                        className: d()(g().root, {
                            [n.className]: !!n.className
                        }),
                        children: JSON.stringify(l, null, 2)
                    })
                },
                f = t(94608),
                j = t.n(f),
                I = n => {
                    var e, t, s;
                    let {
                        inscription: l
                    } = n, o = (null == n ? void 0 : n.smallCard) ? "text-xxs" : "text-lg", i = (null == n ? void 0 : n.smallCard) ? null == l ? void 0 : null === (e = l.meta) || void 0 === e ? void 0 : null === (t = e.name) || void 0 === t ? void 0 : t.slice(0, 10) : null == l ? void 0 : null === (s = l.meta) || void 0 === s ? void 0 : s.name;
                    return (0, a.jsxs)("div", {
                        className: d()({
                            [null == n ? void 0 : n.className]: !!(null == n ? void 0 : n.className)
                        }, j().root),
                        children: [(0, a.jsx)("img", {
                            className: d()(j().background, {
                                [null == n ? void 0 : n.className]: !!(null == n ? void 0 : n.className)
                            }),
                            src: "/brc20-background.jpg"
                        }), (0, a.jsx)("div", {
                            className: j().contentContainer,
                            children: (0, a.jsx)("p", {
                                className: d()(o, "regular", j().content),
                                children: i
                            })
                        })]
                    })
                };
            let b = m()(() => Promise.all([t.e(7174), t.e(1083), t.e(8196), t.e(1994)]).then(t.bind(t, 96265)), {
                loadableGenerated: {
                    webpack: () => [96265]
                },
                ssr: !1
            });
            var A = n => {
                let {
                    collection: e,
                    content_type: t,
                    id: s
                } = n.inscription, o = (null == t ? void 0 : t.includes("html")) ? "/html.png" : "".concat(r.L4, "/").concat(s);
                return r.CD.includes(null == e ? void 0 : e.slug) ? (0, a.jsx)(I, {
                    className: n.className,
                    textClassName: n.textClasName,
                    inscription: n.inscription,
                    smallCard: null == n ? void 0 : n.smallCard
                }) : (0, a.jsxs)(a.Fragment, {
                    children: [(null == t ? void 0 : t.includes("model")) && (0, a.jsx)(b, {
                        className: n.className,
                        src: o
                    }), (null == t ? void 0 : t.includes("image")) && (0, a.jsx)("img", {
                        className: d()(n.className, i().image, {
                            [i().punks]: (null == e ? void 0 : e.slug) == "bitcoinpunks"
                        }),
                        src: o
                    }), (null == t ? void 0 : t.includes("html")) && (0, a.jsx)("img", {
                        className: d()(n.className, i().image),
                        src: o
                    }), (null == t ? void 0 : t.includes("audio")) && (0, a.jsx)("audio", {
                        controls: !0,
                        className: d()(n.className, i().audio),
                        children: (0, a.jsx)("source", {
                            src: o,
                            type: t
                        })
                    }), (null == t ? void 0 : t.includes("video")) && (0, a.jsx)("video", {
                        loop: !0,
                        muted: !0,
                        autoPlay: !0,
                        controls: !0,
                        className: d()(n.className, i().audio),
                        children: (0, a.jsx)("source", {
                            src: o,
                            type: t
                        })
                    }), (null == t ? void 0 : t.includes("text/plain")) && (0, a.jsx)(_, {
                        className: d()(l().className, n.className),
                        inscriptionId: s,
                        textClassName: null == n ? void 0 : n.textClasName
                    }), (null == t ? void 0 : t.includes("application/json")) && (0, a.jsx)(h, {
                        className: d()(l().className, n.className),
                        isDetail: n.isDetail,
                        imageClassName: i().image,
                        inscriptionId: s
                    }), (null == t ? void 0 : t.includes("application/pdf")) && (0, a.jsx)("object", {
                        data: o,
                        type: "application/pdf",
                        width: "100%",
                        height: "100%",
                        className: n.className
                    })]
                })
            }
        },
        21739: function(n, e, t) {
            "use strict";
            t.r(e);
            var a = t(9268),
                s = t(86006),
                l = t(35846),
                o = t.n(l);
            e.default = n => (s.useCallback(() => {
                window.scroll(0, 0), (null == n ? void 0 : n.onClick) && (null == n || n.onClick())
            }, [n]), (0, a.jsx)(o(), {
                className: null == n ? void 0 : n.className,
                href: null == n ? void 0 : n.href,
                onClick: null == n ? void 0 : n.onClick,
                prefetch: !1,
                target: null == n ? void 0 : n.target,
                children: n.children
            }))
        },
        5115: function(n, e, t) {
            "use strict";
            var a = t(9268);
            t(86006), e.Z = n => (0, a.jsx)("svg", {
                onClick: n.onClick,
                viewBox: "0 0 44 44",
                fill: "none",
                className: n.className,
                width: n.width,
                height: n.height,
                children: (0, a.jsx)("path", {
                    d: "M36.2302 7.76941C40.1876 11.6726 42.1663 16.4161 42.1663 21.9999C42.1663 27.5837 40.1876 32.3543 36.2302 36.3117C32.327 40.215 27.5835 42.1666 21.9997 42.1666C16.4159 42.1666 11.6453 40.215 7.68785 36.3117C3.78462 32.3543 1.83301 27.5837 1.83301 21.9999C1.83301 16.4161 3.78462 11.6726 7.68785 7.76941C11.6453 3.81197 16.4159 1.83325 21.9997 1.83325C27.5835 1.83325 32.327 3.81197 36.2302 7.76941ZM30.6193 19.1538C30.9988 16.8769 29.5351 15.1693 26.2282 14.0308L27.1227 10.3716L24.9271 9.88366L24.0326 13.3803C23.5989 13.2719 23.0026 13.1363 22.2436 12.9737L23.1381 9.39575L20.9426 8.82653L20.0481 12.4858C19.3975 12.3774 18.9096 12.269 18.5844 12.1605L15.5756 11.4287L15.0064 13.7869C15.0606 13.7869 15.1419 13.814 15.2503 13.8682C15.3588 13.8682 15.5214 13.8953 15.7383 13.9495C16.0093 14.0037 16.199 14.0579 16.3075 14.1122C16.4701 14.1122 16.5514 14.1122 16.5514 14.1122C17.3104 14.329 17.6628 14.7627 17.6085 15.4132L16.5514 19.5604C16.6598 19.6146 16.7412 19.6417 16.7954 19.6417C16.7954 19.6417 16.7683 19.6417 16.7141 19.6417C16.6598 19.6417 16.6056 19.6146 16.5514 19.5604L15.0877 25.4152C14.9251 25.8489 14.5998 26.0116 14.1119 25.9031C14.1119 25.9031 13.9764 25.876 13.7053 25.8218C13.4343 25.7676 13.1632 25.7134 12.8921 25.6592L12.4856 25.4966L11.4284 28.0174L14.2745 28.7492C14.4914 28.8035 14.7624 28.8848 15.0877 28.9932C15.4672 29.1016 15.7111 29.1558 15.8196 29.1558L14.9251 32.8151L17.1206 33.3843L18.0965 29.8064C18.6386 29.9148 19.2078 30.0503 19.8041 30.213L18.9096 33.8722L21.1052 34.3601L22.081 30.7009C23.9242 31.1888 25.5234 31.2159 26.8787 30.7822C28.2882 30.3485 29.2911 29.3456 29.8874 27.7734C30.7006 25.3339 30.023 23.5449 27.8545 22.4065C29.4266 22.027 30.3482 20.9428 30.6193 19.1538ZM25.5776 26.2284C25.5234 26.4995 25.415 26.7434 25.2524 26.9603C25.0897 27.1771 24.8729 27.3398 24.6018 27.4482C24.385 27.5566 24.141 27.665 23.87 27.7734C23.5989 27.8277 23.2736 27.8548 22.8942 27.8548C22.5689 27.8548 22.2707 27.8548 21.9997 27.8548C21.7286 27.8005 21.4033 27.7463 21.0239 27.6921C20.6444 27.5837 20.3462 27.5024 20.1294 27.4482C19.9667 27.394 19.6957 27.3398 19.3162 27.2855C18.9909 27.1771 18.8012 27.1229 18.747 27.1229L19.9667 22.2439C20.021 22.2439 20.292 22.2981 20.7799 22.4065C21.2678 22.5149 21.6473 22.6234 21.9184 22.7318C22.1894 22.786 22.5689 22.8944 23.0568 23.057C23.5447 23.2197 23.9242 23.4094 24.1952 23.6263C24.4663 23.7889 24.7374 24.0057 25.0084 24.2768C25.3337 24.4936 25.5234 24.7918 25.5776 25.1713C25.6861 25.4966 25.6861 25.8489 25.5776 26.2284ZM26.3095 19.0725C26.2011 19.3436 26.0655 19.5875 25.9029 19.8044C25.7945 19.967 25.6318 20.1025 25.415 20.2109C25.1982 20.3194 24.9813 20.4278 24.7645 20.5362C24.6018 20.5904 24.3579 20.6175 24.0326 20.6175C23.7615 20.6175 23.4905 20.6175 23.2194 20.6175C23.0026 20.5633 22.7315 20.5091 22.4063 20.4549C22.1352 20.4007 21.8913 20.3465 21.6744 20.2923C21.5118 20.238 21.2949 20.1838 21.0239 20.1296C20.7528 20.0754 20.5902 20.0212 20.536 19.967L21.6744 15.5759C21.7286 15.5759 21.9184 15.6301 22.2436 15.7385C22.5689 15.7927 22.8128 15.8469 22.9755 15.9011C23.1923 15.9553 23.4634 16.0367 23.7887 16.1451C24.1681 16.2535 24.4392 16.3619 24.6018 16.4704C24.8187 16.5788 25.0897 16.7414 25.415 16.9583C25.7403 17.1209 25.93 17.3106 25.9842 17.5275C26.0926 17.6901 26.2011 17.9341 26.3095 18.2593C26.4721 18.5304 26.4721 18.8014 26.3095 19.0725Z"
                })
            })
        },
        88568: function(n, e, t) {
            "use strict";
            t.d(e, {
                Eb: function() {
                    return l
                },
                K2: function() {
                    return s
                },
                UT: function() {
                    return o
                },
                _i: function() {
                    return a
                }
            });
            let a = function() {
                    for (var n = arguments.length, e = Array(n), t = 0; t < n; t++) e[t] = arguments[t];
                    return fetch(...e).then(n => n.json())
                },
                s = function() {
                    for (var n = arguments.length, e = Array(n), t = 0; t < n; t++) e[t] = arguments[t];
                    return fetch(...e).then(n => n.text())
                },
                l = async (n, e) => {
                    let t = new Promise((n, e) => {
                            setTimeout(() => {
                                e(Error("Request timed out"))
                            }, 5e3)
                        }),
                        a = fetch(n, e);
                    try {
                        let n = await Promise.race([a, t]);
                        if (n instanceof Response) return n.json();
                        throw Error("Invalid response received")
                    } catch (n) {
                        throw console.error(n), n
                    }
                },
                o = function() {
                    for (var n = arguments.length, e = Array(n), t = 0; t < n; t++) e[t] = arguments[t];
                    return e[0].includes("null") ? {
                        data: {},
                        isLoading: !1
                    } : fetch(e[0], {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }).then(n => n.json())
                }
        },
        84065: function(n) {
            n.exports = {
                root: "CircleLoading_root__nmr4Y",
                spin: "CircleLoading_spin__IivJA"
            }
        },
        12565: function(n) {
            n.exports = {
                root: "Input_root__UqGsV",
                adornment: "Input_adornment__gxWoh",
                startAdornment: "Input_startAdornment__Km9YW",
                endAdornment: "Input_endAdornment__KOm4v",
                input: "Input_input__N3qpq",
                error: "Input_error__BEFq5",
                disabled: "Input_disabled__a6Vl6",
                startAdornmentInput: "Input_startAdornmentInput__bY8L5",
                endAdornmentInput: "Input_endAdornmentInput__4ZgVL"
            }
        },
        4534: function(n) {
            n.exports = {
                root: "InscriptionContent_root__bFgxl",
                iframe: "InscriptionContent_iframe__PpASN",
                image: "InscriptionContent_image__QTQgG",
                audio: "InscriptionContent_audio__EseZS",
                punks: "InscriptionContent_punks__nA08s"
            }
        },
        55953: function(n) {
            n.exports = {
                root: "InscriptionText_root__2QPMs"
            }
        },
        88456: function(n) {
            n.exports = {
                root: "InscriptionText_root__ckrUG",
                container: "InscriptionText_container__dSg8Z"
            }
        },
        94608: function(n) {
            n.exports = {
                root: "NameInscriptionContent_root__XxYLM",
                contentContainer: "NameInscriptionContent_contentContainer__yPq0K",
                background: "NameInscriptionContent_background__HhRK6",
                content: "NameInscriptionContent_content__hsgJ4"
            }
        }
    }
]);