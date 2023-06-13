(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [1963], {
        57045: function(e, t, n) {
            "use strict";
            var o = n(86006),
                r = n(84815),
                a = n(2343),
                i = n(82131),
                l = n(9268);

            function c(e) {
                return e.substring(2).toLowerCase()
            }
            t.Z = function(e) {
                let {
                    children: t,
                    disableReactTree: n = !1,
                    mouseEvent: s = "onClick",
                    onClickAway: u,
                    touchEvent: d = "onTouchEnd"
                } = e, p = o.useRef(!1), v = o.useRef(null), f = o.useRef(!1), m = o.useRef(!1);
                o.useEffect(() => (setTimeout(() => {
                    f.current = !0
                }, 0), () => {
                    f.current = !1
                }), []);
                let h = (0, r.Z)(t.ref, v),
                    g = (0, a.Z)(e => {
                        let t = m.current;
                        m.current = !1;
                        let o = (0, i.Z)(v.current);
                        if (f.current && v.current && (!("clientX" in e) || !(o.documentElement.clientWidth < e.clientX) && !(o.documentElement.clientHeight < e.clientY))) {
                            if (p.current) {
                                p.current = !1;
                                return
                            }(e.composedPath ? e.composedPath().indexOf(v.current) > -1 : !o.documentElement.contains(e.target) || v.current.contains(e.target)) || !n && t || u(e)
                        }
                    }),
                    b = e => n => {
                        m.current = !0;
                        let o = t.props[e];
                        o && o(n)
                    },
                    Z = {
                        ref: h
                    };
                return !1 !== d && (Z[d] = b(d)), o.useEffect(() => {
                    if (!1 !== d) {
                        let e = c(d),
                            t = (0, i.Z)(v.current),
                            n = () => {
                                p.current = !0
                            };
                        return t.addEventListener(e, g), t.addEventListener("touchmove", n), () => {
                            t.removeEventListener(e, g), t.removeEventListener("touchmove", n)
                        }
                    }
                }, [g, d]), !1 !== s && (Z[s] = b(s)), o.useEffect(() => {
                    if (!1 !== s) {
                        let e = c(s),
                            t = (0, i.Z)(v.current);
                        return t.addEventListener(e, g), () => {
                            t.removeEventListener(e, g)
                        }
                    }
                }, [g, s]), (0, l.jsx)(o.Fragment, {
                    children: o.cloneElement(t, Z)
                })
            }
        },
        601: function(e, t, n) {
            "use strict";
            var o = n(78997);
            t.Z = void 0;
            var r = o(n(76906)),
                a = n(9268),
                i = (0, r.default)((0, a.jsx)("path", {
                    d: "M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"
                }), "Menu");
            t.Z = i
        },
        76906: function(e, t, n) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), Object.defineProperty(t, "default", {
                enumerable: !0,
                get: function() {
                    return o.createSvgIcon
                }
            });
            var o = n(896)
        },
        47931: function(e, t, n) {
            "use strict";
            n.d(t, {
                Z: function() {
                    return C
                }
            });
            var o = n(46750),
                r = n(40431),
                a = n(86006),
                i = n(89791),
                l = n(24552),
                c = n(47562),
                s = n(23343),
                u = n(76487),
                d = n(12971),
                p = n(60351),
                v = n(78473),
                f = n(88539),
                m = n(13809);

            function h(e) {
                return (0, m.Z)("MuiButton", e)
            }
            let g = (0, f.Z)("MuiButton", ["root", "text", "textInherit", "textPrimary", "textSecondary", "textSuccess", "textError", "textInfo", "textWarning", "outlined", "outlinedInherit", "outlinedPrimary", "outlinedSecondary", "outlinedSuccess", "outlinedError", "outlinedInfo", "outlinedWarning", "contained", "containedInherit", "containedPrimary", "containedSecondary", "containedSuccess", "containedError", "containedInfo", "containedWarning", "disableElevation", "focusVisible", "disabled", "colorInherit", "textSizeSmall", "textSizeMedium", "textSizeLarge", "outlinedSizeSmall", "outlinedSizeMedium", "outlinedSizeLarge", "containedSizeSmall", "containedSizeMedium", "containedSizeLarge", "sizeMedium", "sizeSmall", "sizeLarge", "fullWidth", "startIcon", "endIcon", "iconSizeSmall", "iconSizeMedium", "iconSizeLarge"]),
                b = a.createContext({});
            var Z = n(9268);
            let x = ["children", "color", "component", "className", "disabled", "disableElevation", "disableFocusRipple", "endIcon", "focusVisibleClassName", "fullWidth", "size", "startIcon", "type", "variant"],
                y = e => {
                    let {
                        color: t,
                        disableElevation: n,
                        fullWidth: o,
                        size: a,
                        variant: i,
                        classes: l
                    } = e, s = {
                        root: ["root", i, `${i}${(0,v.Z)(t)}`, `size${(0,v.Z)(a)}`, `${i}Size${(0,v.Z)(a)}`, "inherit" === t && "colorInherit", n && "disableElevation", o && "fullWidth"],
                        label: ["label"],
                        startIcon: ["startIcon", `iconSize${(0,v.Z)(a)}`],
                        endIcon: ["endIcon", `iconSize${(0,v.Z)(a)}`]
                    }, u = (0, c.Z)(s, h, l);
                    return (0, r.Z)({}, l, u)
                },
                S = e => (0, r.Z)({}, "small" === e.size && {
                    "& > *:nth-of-type(1)": {
                        fontSize: 18
                    }
                }, "medium" === e.size && {
                    "& > *:nth-of-type(1)": {
                        fontSize: 20
                    }
                }, "large" === e.size && {
                    "& > *:nth-of-type(1)": {
                        fontSize: 22
                    }
                }),
                z = (0, u.ZP)(p.Z, {
                    shouldForwardProp: e => (0, u.FO)(e) || "classes" === e,
                    name: "MuiButton",
                    slot: "Root",
                    overridesResolver: (e, t) => {
                        let {
                            ownerState: n
                        } = e;
                        return [t.root, t[n.variant], t[`${n.variant}${(0,v.Z)(n.color)}`], t[`size${(0,v.Z)(n.size)}`], t[`${n.variant}Size${(0,v.Z)(n.size)}`], "inherit" === n.color && t.colorInherit, n.disableElevation && t.disableElevation, n.fullWidth && t.fullWidth]
                    }
                })(({
                    theme: e,
                    ownerState: t
                }) => {
                    var n, o;
                    return (0, r.Z)({}, e.typography.button, {
                        minWidth: 64,
                        padding: "6px 16px",
                        borderRadius: (e.vars || e).shape.borderRadius,
                        transition: e.transitions.create(["background-color", "box-shadow", "border-color", "color"], {
                            duration: e.transitions.duration.short
                        }),
                        "&:hover": (0, r.Z)({
                            textDecoration: "none",
                            backgroundColor: e.vars ? `rgba(${e.vars.palette.text.primaryChannel} / ${e.vars.palette.action.hoverOpacity})` : (0, s.Fq)(e.palette.text.primary, e.palette.action.hoverOpacity),
                            "@media (hover: none)": {
                                backgroundColor: "transparent"
                            }
                        }, "text" === t.variant && "inherit" !== t.color && {
                            backgroundColor: e.vars ? `rgba(${e.vars.palette[t.color].mainChannel} / ${e.vars.palette.action.hoverOpacity})` : (0, s.Fq)(e.palette[t.color].main, e.palette.action.hoverOpacity),
                            "@media (hover: none)": {
                                backgroundColor: "transparent"
                            }
                        }, "outlined" === t.variant && "inherit" !== t.color && {
                            border: `1px solid ${(e.vars||e).palette[t.color].main}`,
                            backgroundColor: e.vars ? `rgba(${e.vars.palette[t.color].mainChannel} / ${e.vars.palette.action.hoverOpacity})` : (0, s.Fq)(e.palette[t.color].main, e.palette.action.hoverOpacity),
                            "@media (hover: none)": {
                                backgroundColor: "transparent"
                            }
                        }, "contained" === t.variant && {
                            backgroundColor: (e.vars || e).palette.grey.A100,
                            boxShadow: (e.vars || e).shadows[4],
                            "@media (hover: none)": {
                                boxShadow: (e.vars || e).shadows[2],
                                backgroundColor: (e.vars || e).palette.grey[300]
                            }
                        }, "contained" === t.variant && "inherit" !== t.color && {
                            backgroundColor: (e.vars || e).palette[t.color].dark,
                            "@media (hover: none)": {
                                backgroundColor: (e.vars || e).palette[t.color].main
                            }
                        }),
                        "&:active": (0, r.Z)({}, "contained" === t.variant && {
                            boxShadow: (e.vars || e).shadows[8]
                        }),
                        [`&.${g.focusVisible}`]: (0, r.Z)({}, "contained" === t.variant && {
                            boxShadow: (e.vars || e).shadows[6]
                        }),
                        [`&.${g.disabled}`]: (0, r.Z)({
                            color: (e.vars || e).palette.action.disabled
                        }, "outlined" === t.variant && {
                            border: `1px solid ${(e.vars||e).palette.action.disabledBackground}`
                        }, "contained" === t.variant && {
                            color: (e.vars || e).palette.action.disabled,
                            boxShadow: (e.vars || e).shadows[0],
                            backgroundColor: (e.vars || e).palette.action.disabledBackground
                        })
                    }, "text" === t.variant && {
                        padding: "6px 8px"
                    }, "text" === t.variant && "inherit" !== t.color && {
                        color: (e.vars || e).palette[t.color].main
                    }, "outlined" === t.variant && {
                        padding: "5px 15px",
                        border: "1px solid currentColor"
                    }, "outlined" === t.variant && "inherit" !== t.color && {
                        color: (e.vars || e).palette[t.color].main,
                        border: e.vars ? `1px solid rgba(${e.vars.palette[t.color].mainChannel} / 0.5)` : `1px solid ${(0,s.Fq)(e.palette[t.color].main,.5)}`
                    }, "contained" === t.variant && {
                        color: e.vars ? e.vars.palette.text.primary : null == (n = (o = e.palette).getContrastText) ? void 0 : n.call(o, e.palette.grey[300]),
                        backgroundColor: (e.vars || e).palette.grey[300],
                        boxShadow: (e.vars || e).shadows[2]
                    }, "contained" === t.variant && "inherit" !== t.color && {
                        color: (e.vars || e).palette[t.color].contrastText,
                        backgroundColor: (e.vars || e).palette[t.color].main
                    }, "inherit" === t.color && {
                        color: "inherit",
                        borderColor: "currentColor"
                    }, "small" === t.size && "text" === t.variant && {
                        padding: "4px 5px",
                        fontSize: e.typography.pxToRem(13)
                    }, "large" === t.size && "text" === t.variant && {
                        padding: "8px 11px",
                        fontSize: e.typography.pxToRem(15)
                    }, "small" === t.size && "outlined" === t.variant && {
                        padding: "3px 9px",
                        fontSize: e.typography.pxToRem(13)
                    }, "large" === t.size && "outlined" === t.variant && {
                        padding: "7px 21px",
                        fontSize: e.typography.pxToRem(15)
                    }, "small" === t.size && "contained" === t.variant && {
                        padding: "4px 10px",
                        fontSize: e.typography.pxToRem(13)
                    }, "large" === t.size && "contained" === t.variant && {
                        padding: "8px 22px",
                        fontSize: e.typography.pxToRem(15)
                    }, t.fullWidth && {
                        width: "100%"
                    })
                }, ({
                    ownerState: e
                }) => e.disableElevation && {
                    boxShadow: "none",
                    "&:hover": {
                        boxShadow: "none"
                    },
                    [`&.${g.focusVisible}`]: {
                        boxShadow: "none"
                    },
                    "&:active": {
                        boxShadow: "none"
                    },
                    [`&.${g.disabled}`]: {
                        boxShadow: "none"
                    }
                }),
                w = (0, u.ZP)("span", {
                    name: "MuiButton",
                    slot: "StartIcon",
                    overridesResolver: (e, t) => {
                        let {
                            ownerState: n
                        } = e;
                        return [t.startIcon, t[`iconSize${(0,v.Z)(n.size)}`]]
                    }
                })(({
                    ownerState: e
                }) => (0, r.Z)({
                    display: "inherit",
                    marginRight: 8,
                    marginLeft: -4
                }, "small" === e.size && {
                    marginLeft: -2
                }, S(e))),
                $ = (0, u.ZP)("span", {
                    name: "MuiButton",
                    slot: "EndIcon",
                    overridesResolver: (e, t) => {
                        let {
                            ownerState: n
                        } = e;
                        return [t.endIcon, t[`iconSize${(0,v.Z)(n.size)}`]]
                    }
                })(({
                    ownerState: e
                }) => (0, r.Z)({
                    display: "inherit",
                    marginRight: -4,
                    marginLeft: 8
                }, "small" === e.size && {
                    marginRight: -2
                }, S(e))),
                k = a.forwardRef(function(e, t) {
                    let n = a.useContext(b),
                        c = (0, l.Z)(n, e),
                        s = (0, d.Z)({
                            props: c,
                            name: "MuiButton"
                        }),
                        {
                            children: u,
                            color: p = "primary",
                            component: v = "button",
                            className: f,
                            disabled: m = !1,
                            disableElevation: h = !1,
                            disableFocusRipple: g = !1,
                            endIcon: S,
                            focusVisibleClassName: k,
                            fullWidth: C = !1,
                            size: R = "medium",
                            startIcon: E,
                            type: I,
                            variant: P = "text"
                        } = s,
                        _ = (0, o.Z)(s, x),
                        M = (0, r.Z)({}, s, {
                            color: p,
                            component: v,
                            disabled: m,
                            disableElevation: h,
                            disableFocusRipple: g,
                            fullWidth: C,
                            size: R,
                            type: I,
                            variant: P
                        }),
                        L = y(M),
                        j = E && (0, Z.jsx)(w, {
                            className: L.startIcon,
                            ownerState: M,
                            children: E
                        }),
                        F = S && (0, Z.jsx)($, {
                            className: L.endIcon,
                            ownerState: M,
                            children: S
                        });
                    return (0, Z.jsxs)(z, (0, r.Z)({
                        ownerState: M,
                        className: (0, i.Z)(n.className, L.root, f),
                        component: v,
                        disabled: m,
                        focusRipple: !g,
                        focusVisibleClassName: (0, i.Z)(L.focusVisible, k),
                        ref: t,
                        type: I
                    }, _, {
                        classes: L,
                        children: [j, u, F]
                    }))
                });
            var C = k
        },
        39714: function(e, t, n) {
            "use strict";
            n.d(t, {
                Z: function() {
                    return S
                }
            });
            var o = n(46750),
                r = n(40431),
                a = n(86006),
                i = n(89791),
                l = n(47562),
                c = n(23343),
                s = n(76487),
                u = n(12971),
                d = n(60351),
                p = n(78473),
                v = n(88539),
                f = n(13809);

            function m(e) {
                return (0, f.Z)("MuiIconButton", e)
            }
            let h = (0, v.Z)("MuiIconButton", ["root", "disabled", "colorInherit", "colorPrimary", "colorSecondary", "colorError", "colorInfo", "colorSuccess", "colorWarning", "edgeStart", "edgeEnd", "sizeSmall", "sizeMedium", "sizeLarge"]);
            var g = n(9268);
            let b = ["edge", "children", "className", "color", "disabled", "disableFocusRipple", "size"],
                Z = e => {
                    let {
                        classes: t,
                        disabled: n,
                        color: o,
                        edge: r,
                        size: a
                    } = e, i = {
                        root: ["root", n && "disabled", "default" !== o && `color${(0,p.Z)(o)}`, r && `edge${(0,p.Z)(r)}`, `size${(0,p.Z)(a)}`]
                    };
                    return (0, l.Z)(i, m, t)
                },
                x = (0, s.ZP)(d.Z, {
                    name: "MuiIconButton",
                    slot: "Root",
                    overridesResolver: (e, t) => {
                        let {
                            ownerState: n
                        } = e;
                        return [t.root, "default" !== n.color && t[`color${(0,p.Z)(n.color)}`], n.edge && t[`edge${(0,p.Z)(n.edge)}`], t[`size${(0,p.Z)(n.size)}`]]
                    }
                })(({
                    theme: e,
                    ownerState: t
                }) => (0, r.Z)({
                    textAlign: "center",
                    flex: "0 0 auto",
                    fontSize: e.typography.pxToRem(24),
                    padding: 8,
                    borderRadius: "50%",
                    overflow: "visible",
                    color: (e.vars || e).palette.action.active,
                    transition: e.transitions.create("background-color", {
                        duration: e.transitions.duration.shortest
                    })
                }, !t.disableRipple && {
                    "&:hover": {
                        backgroundColor: e.vars ? `rgba(${e.vars.palette.action.activeChannel} / ${e.vars.palette.action.hoverOpacity})` : (0, c.Fq)(e.palette.action.active, e.palette.action.hoverOpacity),
                        "@media (hover: none)": {
                            backgroundColor: "transparent"
                        }
                    }
                }, "start" === t.edge && {
                    marginLeft: "small" === t.size ? -3 : -12
                }, "end" === t.edge && {
                    marginRight: "small" === t.size ? -3 : -12
                }), ({
                    theme: e,
                    ownerState: t
                }) => {
                    var n;
                    let o = null == (n = (e.vars || e).palette) ? void 0 : n[t.color];
                    return (0, r.Z)({}, "inherit" === t.color && {
                        color: "inherit"
                    }, "inherit" !== t.color && "default" !== t.color && (0, r.Z)({
                        color: null == o ? void 0 : o.main
                    }, !t.disableRipple && {
                        "&:hover": (0, r.Z)({}, o && {
                            backgroundColor: e.vars ? `rgba(${o.mainChannel} / ${e.vars.palette.action.hoverOpacity})` : (0, c.Fq)(o.main, e.palette.action.hoverOpacity)
                        }, {
                            "@media (hover: none)": {
                                backgroundColor: "transparent"
                            }
                        })
                    }), "small" === t.size && {
                        padding: 5,
                        fontSize: e.typography.pxToRem(18)
                    }, "large" === t.size && {
                        padding: 12,
                        fontSize: e.typography.pxToRem(28)
                    }, {
                        [`&.${h.disabled}`]: {
                            backgroundColor: "transparent",
                            color: (e.vars || e).palette.action.disabled
                        }
                    })
                }),
                y = a.forwardRef(function(e, t) {
                    let n = (0, u.Z)({
                            props: e,
                            name: "MuiIconButton"
                        }),
                        {
                            edge: a = !1,
                            children: l,
                            className: c,
                            color: s = "default",
                            disabled: d = !1,
                            disableFocusRipple: p = !1,
                            size: v = "medium"
                        } = n,
                        f = (0, o.Z)(n, b),
                        m = (0, r.Z)({}, n, {
                            edge: a,
                            color: s,
                            disabled: d,
                            disableFocusRipple: p,
                            size: v
                        }),
                        h = Z(m);
                    return (0, g.jsx)(x, (0, r.Z)({
                        className: (0, i.Z)(h.root, c),
                        centerRipple: !0,
                        focusRipple: !p,
                        disabled: d,
                        ref: t,
                        ownerState: m
                    }, f, {
                        children: l
                    }))
                });
            var S = y
        },
        78417: function(e, t, n) {
            "use strict";
            var o = n(46750),
                r = n(40431),
                a = n(86006),
                i = n(91559),
                l = n(48527),
                c = n(86601),
                s = n(95135),
                u = n(76487),
                d = n(12971),
                p = n(9268);
            let v = ["component", "direction", "spacing", "divider", "children"],
                f = e => ({
                    row: "Left",
                    "row-reverse": "Right",
                    column: "Top",
                    "column-reverse": "Bottom"
                })[e],
                m = (0, u.ZP)("div", {
                    name: "MuiStack",
                    slot: "Root",
                    overridesResolver: (e, t) => [t.root]
                })(({
                    ownerState: e,
                    theme: t
                }) => {
                    let n = (0, r.Z)({
                        display: "flex",
                        flexDirection: "column"
                    }, (0, i.k9)({
                        theme: t
                    }, (0, i.P$)({
                        values: e.direction,
                        breakpoints: t.breakpoints.values
                    }), e => ({
                        flexDirection: e
                    })));
                    if (e.spacing) {
                        let o = (0, l.hB)(t),
                            r = Object.keys(t.breakpoints.values).reduce((t, n) => (("object" == typeof e.spacing && null != e.spacing[n] || "object" == typeof e.direction && null != e.direction[n]) && (t[n] = !0), t), {}),
                            a = (0, i.P$)({
                                values: e.direction,
                                base: r
                            }),
                            c = (0, i.P$)({
                                values: e.spacing,
                                base: r
                            });
                        "object" == typeof a && Object.keys(a).forEach((e, t, n) => {
                            let o = a[e];
                            if (!o) {
                                let o = t > 0 ? a[n[t - 1]] : "column";
                                a[e] = o
                            }
                        }), n = (0, s.Z)(n, (0, i.k9)({
                            theme: t
                        }, c, (t, n) => ({
                            "& > :not(style) + :not(style)": {
                                margin: 0,
                                [`margin${f(n?a[n]:e.direction)}`]: (0, l.NA)(o, t)
                            }
                        })))
                    }
                    return (0, i.dt)(t.breakpoints, n)
                }),
                h = a.forwardRef(function(e, t) {
                    let n = (0, d.Z)({
                            props: e,
                            name: "MuiStack"
                        }),
                        i = (0, c.Z)(n),
                        {
                            component: l = "div",
                            direction: s = "column",
                            spacing: u = 0,
                            divider: f,
                            children: h
                        } = i,
                        g = (0, o.Z)(i, v);
                    return (0, p.jsx)(m, (0, r.Z)({
                        as: l,
                        ownerState: {
                            direction: s,
                            spacing: u
                        },
                        ref: t
                    }, g, {
                        children: f ? function(e, t) {
                            let n = a.Children.toArray(e).filter(Boolean);
                            return n.reduce((e, o, r) => (e.push(o), r < n.length - 1 && e.push(a.cloneElement(t, {
                                key: `separator-${r}`
                            })), e), [])
                        }(h, f) : h
                    }))
                });
            t.Z = h
        },
        896: function(e, t, n) {
            "use strict";
            n.r(t), n.d(t, {
                capitalize: function() {
                    return r.Z
                },
                createChainedFunction: function() {
                    return a
                },
                createSvgIcon: function() {
                    return i.Z
                },
                debounce: function() {
                    return l.Z
                },
                deprecatedPropType: function() {
                    return c
                },
                isMuiElement: function() {
                    return s.Z
                },
                ownerDocument: function() {
                    return u.Z
                },
                ownerWindow: function() {
                    return d.Z
                },
                requirePropFactory: function() {
                    return p
                },
                setRef: function() {
                    return v
                },
                unstable_ClassNameGenerator: function() {
                    return y
                },
                unstable_useEnhancedEffect: function() {
                    return f.Z
                },
                unstable_useId: function() {
                    return m.Z
                },
                unsupportedProp: function() {
                    return h
                },
                useControlled: function() {
                    return g.Z
                },
                useEventCallback: function() {
                    return b.Z
                },
                useForkRef: function() {
                    return Z.Z
                },
                useIsFocusVisible: function() {
                    return x.Z
                }
            });
            var o = n(47327),
                r = n(78473),
                a = n(52010).Z,
                i = n(46975),
                l = n(81975),
                c = function(e, t) {
                    return () => null
                },
                s = n(6205),
                u = n(96319),
                d = n(50232);
            n(40431);
            var p = function(e, t) {
                    return () => null
                },
                v = n(65464).Z,
                f = n(76837),
                m = n(66033),
                h = function(e, t, n, o, r) {
                    return null
                },
                g = n(14223),
                b = n(23631),
                Z = n(84414),
                x = n(91724);
            let y = {
                configure: e => {
                    o.Z.configure(e)
                }
            }
        },
        86601: function(e, t, n) {
            "use strict";
            n.d(t, {
                Z: function() {
                    return s
                }
            });
            var o = n(40431),
                r = n(46750),
                a = n(95135),
                i = n(2272);
            let l = ["sx"],
                c = e => {
                    var t, n;
                    let o = {
                            systemProps: {},
                            otherProps: {}
                        },
                        r = null != (t = null == e ? void 0 : null == (n = e.theme) ? void 0 : n.unstable_sxConfig) ? t : i.Z;
                    return Object.keys(e).forEach(t => {
                        r[t] ? o.systemProps[t] = e[t] : o.otherProps[t] = e[t]
                    }), o
                };

            function s(e) {
                let t;
                let {
                    sx: n
                } = e, i = (0, r.Z)(e, l), {
                    systemProps: s,
                    otherProps: u
                } = c(i);
                return t = Array.isArray(n) ? [s, ...n] : "function" == typeof n ? (...e) => {
                    let t = n(...e);
                    return (0, a.P)(t) ? (0, o.Z)({}, s, t) : s
                } : (0, o.Z)({}, s, n), (0, o.Z)({}, u, {
                    sx: t
                })
            }
        },
        49539: function(e) {
            e.exports = {
                style: {
                    fontFamily: "'__Inter_0ec1f4', '__Inter_Fallback_0ec1f4'",
                    fontStyle: "normal"
                },
                className: "__className_0ec1f4"
            }
        },
        78997: function(e) {
            e.exports = function(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }, e.exports.__esModule = !0, e.exports.default = e.exports
        },
        34298: function(e, t, n) {
            "use strict";
            n.d(t, {
                c: function() {
                    return i
                }
            });
            var o = n(86006),
                r = (n(28611), () => {
                    window.va || (window.va = function(...e) {
                        (window.vaq = window.vaq || []).push(e)
                    })
                }),
                a = (e = {
                    debug: !0
                }) => {
                    var t;
                    if (!("undefined" != typeof window)) return;
                    let n = function(e = "auto") {
                        return "auto" === e ? "production" : e
                    }(e.mode);
                    r(), e.beforeSend && (null == (t = window.va) || t.call(window, "beforeSend", e.beforeSend));
                    let o = "development" === n ? "https://cdn.vercel-insights.com/v1/script.debug.js" : "/_vercel/insights/script.js";
                    if (document.head.querySelector(`script[src*="${o}"]`)) return;
                    let a = document.createElement("script");
                    a.src = o, a.defer = !0, "development" === n && !1 === e.debug && a.setAttribute("data-debug", "false"), document.head.appendChild(a)
                };

            function i({
                beforeSend: e,
                debug: t = !0,
                mode: n = "auto"
            }) {
                return (0, o.useEffect)(() => {
                    a({
                        beforeSend: e,
                        debug: t,
                        mode: n
                    })
                }, [e, t, n]), null
            }
        }
    }
]);