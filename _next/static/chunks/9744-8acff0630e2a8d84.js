"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [9744], {
        19744: function(e, t, o) {
            o.d(t, {
                Z: function() {
                    return W
                }
            });
            var r = o(46750),
                n = o(40431),
                p = o(86006),
                i = o(89791),
                l = o(47562),
                a = o(5309),
                u = o(23343),
                s = o(76487),
                c = o(4957),
                m = o(12971),
                d = o(78473),
                h = o(38913),
                g = o(47933),
                f = o(23631),
                v = o(84414),
                T = o(66033),
                Z = o(91724),
                b = o(14223),
                w = o(88539),
                y = o(13809);

            function x(e) {
                return (0, y.Z)("MuiTooltip", e)
            }
            let R = (0, w.Z)("MuiTooltip", ["popper", "popperInteractive", "popperArrow", "popperClose", "tooltip", "tooltipArrow", "touch", "tooltipPlacementLeft", "tooltipPlacementRight", "tooltipPlacementTop", "tooltipPlacementBottom", "arrow"]);
            var M = o(9268);
            let P = ["arrow", "children", "classes", "components", "componentsProps", "describeChild", "disableFocusListener", "disableHoverListener", "disableInteractive", "disableTouchListener", "enterDelay", "enterNextDelay", "enterTouchDelay", "followCursor", "id", "leaveDelay", "leaveTouchDelay", "onClose", "onOpen", "open", "placement", "PopperComponent", "PopperProps", "slotProps", "slots", "title", "TransitionComponent", "TransitionProps"],
                k = e => {
                    let {
                        classes: t,
                        disableInteractive: o,
                        arrow: r,
                        touch: n,
                        placement: p
                    } = e, i = {
                        popper: ["popper", !o && "popperInteractive", r && "popperArrow"],
                        tooltip: ["tooltip", r && "tooltipArrow", n && "touch", `tooltipPlacement${(0,d.Z)(p.split("-")[0])}`],
                        arrow: ["arrow"]
                    };
                    return (0, l.Z)(i, x, t)
                },
                C = (0, s.ZP)(g.Z, {
                    name: "MuiTooltip",
                    slot: "Popper",
                    overridesResolver: (e, t) => {
                        let {
                            ownerState: o
                        } = e;
                        return [t.popper, !o.disableInteractive && t.popperInteractive, o.arrow && t.popperArrow, !o.open && t.popperClose]
                    }
                })(({
                    theme: e,
                    ownerState: t,
                    open: o
                }) => (0, n.Z)({
                    zIndex: (e.vars || e).zIndex.tooltip,
                    pointerEvents: "none"
                }, !t.disableInteractive && {
                    pointerEvents: "auto"
                }, !o && {
                    pointerEvents: "none"
                }, t.arrow && {
                    [`&[data-popper-placement*="bottom"] .${R.arrow}`]: {
                        top: 0,
                        marginTop: "-0.71em",
                        "&::before": {
                            transformOrigin: "0 100%"
                        }
                    },
                    [`&[data-popper-placement*="top"] .${R.arrow}`]: {
                        bottom: 0,
                        marginBottom: "-0.71em",
                        "&::before": {
                            transformOrigin: "100% 0"
                        }
                    },
                    [`&[data-popper-placement*="right"] .${R.arrow}`]: (0, n.Z)({}, t.isRtl ? {
                        right: 0,
                        marginRight: "-0.71em"
                    } : {
                        left: 0,
                        marginLeft: "-0.71em"
                    }, {
                        height: "1em",
                        width: "0.71em",
                        "&::before": {
                            transformOrigin: "100% 100%"
                        }
                    }),
                    [`&[data-popper-placement*="left"] .${R.arrow}`]: (0, n.Z)({}, t.isRtl ? {
                        left: 0,
                        marginLeft: "-0.71em"
                    } : {
                        right: 0,
                        marginRight: "-0.71em"
                    }, {
                        height: "1em",
                        width: "0.71em",
                        "&::before": {
                            transformOrigin: "0 0"
                        }
                    })
                })),
                E = (0, s.ZP)("div", {
                    name: "MuiTooltip",
                    slot: "Tooltip",
                    overridesResolver: (e, t) => {
                        let {
                            ownerState: o
                        } = e;
                        return [t.tooltip, o.touch && t.touch, o.arrow && t.tooltipArrow, t[`tooltipPlacement${(0,d.Z)(o.placement.split("-")[0])}`]]
                    }
                })(({
                    theme: e,
                    ownerState: t
                }) => (0, n.Z)({
                    backgroundColor: e.vars ? e.vars.palette.Tooltip.bg : (0, u.Fq)(e.palette.grey[700], .92),
                    borderRadius: (e.vars || e).shape.borderRadius,
                    color: (e.vars || e).palette.common.white,
                    fontFamily: e.typography.fontFamily,
                    padding: "4px 8px",
                    fontSize: e.typography.pxToRem(11),
                    maxWidth: 300,
                    margin: 2,
                    wordWrap: "break-word",
                    fontWeight: e.typography.fontWeightMedium
                }, t.arrow && {
                    position: "relative",
                    margin: 0
                }, t.touch && {
                    padding: "8px 16px",
                    fontSize: e.typography.pxToRem(14),
                    lineHeight: `${Math.round(1e5*(16/14))/1e5}em`,
                    fontWeight: e.typography.fontWeightRegular
                }, {
                    [`.${R.popper}[data-popper-placement*="left"] &`]: (0, n.Z)({
                        transformOrigin: "right center"
                    }, t.isRtl ? (0, n.Z)({
                        marginLeft: "14px"
                    }, t.touch && {
                        marginLeft: "24px"
                    }) : (0, n.Z)({
                        marginRight: "14px"
                    }, t.touch && {
                        marginRight: "24px"
                    })),
                    [`.${R.popper}[data-popper-placement*="right"] &`]: (0, n.Z)({
                        transformOrigin: "left center"
                    }, t.isRtl ? (0, n.Z)({
                        marginRight: "14px"
                    }, t.touch && {
                        marginRight: "24px"
                    }) : (0, n.Z)({
                        marginLeft: "14px"
                    }, t.touch && {
                        marginLeft: "24px"
                    })),
                    [`.${R.popper}[data-popper-placement*="top"] &`]: (0, n.Z)({
                        transformOrigin: "center bottom",
                        marginBottom: "14px"
                    }, t.touch && {
                        marginBottom: "24px"
                    }),
                    [`.${R.popper}[data-popper-placement*="bottom"] &`]: (0, n.Z)({
                        transformOrigin: "center top",
                        marginTop: "14px"
                    }, t.touch && {
                        marginTop: "24px"
                    })
                })),
                O = (0, s.ZP)("span", {
                    name: "MuiTooltip",
                    slot: "Arrow",
                    overridesResolver: (e, t) => t.arrow
                })(({
                    theme: e
                }) => ({
                    overflow: "hidden",
                    position: "absolute",
                    width: "1em",
                    height: "0.71em",
                    boxSizing: "border-box",
                    color: e.vars ? e.vars.palette.Tooltip.bg : (0, u.Fq)(e.palette.grey[700], .9),
                    "&::before": {
                        content: '""',
                        margin: "auto",
                        display: "block",
                        width: "100%",
                        height: "100%",
                        backgroundColor: "currentColor",
                        transform: "rotate(45deg)"
                    }
                })),
                L = !1,
                S = null,
                N = {
                    x: 0,
                    y: 0
                };

            function $(e, t) {
                return o => {
                    t && t(o), e(o)
                }
            }
            let F = p.forwardRef(function(e, t) {
                var o, l, u, s, d, w, y, x, R, F, W, A, B, I, j, z, D, U, _;
                let q = (0, m.Z)({
                        props: e,
                        name: "MuiTooltip"
                    }),
                    {
                        arrow: H = !1,
                        children: X,
                        components: Y = {},
                        componentsProps: G = {},
                        describeChild: J = !1,
                        disableFocusListener: K = !1,
                        disableHoverListener: Q = !1,
                        disableInteractive: V = !1,
                        disableTouchListener: ee = !1,
                        enterDelay: et = 100,
                        enterNextDelay: eo = 0,
                        enterTouchDelay: er = 700,
                        followCursor: en = !1,
                        id: ep,
                        leaveDelay: ei = 0,
                        leaveTouchDelay: el = 1500,
                        onClose: ea,
                        onOpen: eu,
                        open: es,
                        placement: ec = "bottom",
                        PopperComponent: em,
                        PopperProps: ed = {},
                        slotProps: eh = {},
                        slots: eg = {},
                        title: ef,
                        TransitionComponent: ev = h.Z,
                        TransitionProps: eT
                    } = q,
                    eZ = (0, r.Z)(q, P),
                    eb = (0, c.Z)(),
                    ew = "rtl" === eb.direction,
                    [ey, ex] = p.useState(),
                    [eR, eM] = p.useState(null),
                    eP = p.useRef(!1),
                    ek = V || en,
                    eC = p.useRef(),
                    eE = p.useRef(),
                    eO = p.useRef(),
                    eL = p.useRef(),
                    [eS, eN] = (0, b.Z)({
                        controlled: es,
                        default: !1,
                        name: "Tooltip",
                        state: "open"
                    }),
                    e$ = eS,
                    eF = (0, T.Z)(ep),
                    eW = p.useRef(),
                    eA = p.useCallback(() => {
                        void 0 !== eW.current && (document.body.style.WebkitUserSelect = eW.current, eW.current = void 0), clearTimeout(eL.current)
                    }, []);
                p.useEffect(() => () => {
                    clearTimeout(eC.current), clearTimeout(eE.current), clearTimeout(eO.current), eA()
                }, [eA]);
                let eB = e => {
                        clearTimeout(S), L = !0, eN(!0), eu && !e$ && eu(e)
                    },
                    eI = (0, f.Z)(e => {
                        clearTimeout(S), S = setTimeout(() => {
                            L = !1
                        }, 800 + ei), eN(!1), ea && e$ && ea(e), clearTimeout(eC.current), eC.current = setTimeout(() => {
                            eP.current = !1
                        }, eb.transitions.duration.shortest)
                    }),
                    ej = e => {
                        eP.current && "touchstart" !== e.type || (ey && ey.removeAttribute("title"), clearTimeout(eE.current), clearTimeout(eO.current), et || L && eo ? eE.current = setTimeout(() => {
                            eB(e)
                        }, L ? eo : et) : eB(e))
                    },
                    ez = e => {
                        clearTimeout(eE.current), clearTimeout(eO.current), eO.current = setTimeout(() => {
                            eI(e)
                        }, ei)
                    },
                    {
                        isFocusVisibleRef: eD,
                        onBlur: eU,
                        onFocus: e_,
                        ref: eq
                    } = (0, Z.Z)(),
                    [, eH] = p.useState(!1),
                    eX = e => {
                        eU(e), !1 === eD.current && (eH(!1), ez(e))
                    },
                    eY = e => {
                        ey || ex(e.currentTarget), e_(e), !0 === eD.current && (eH(!0), ej(e))
                    },
                    eG = e => {
                        eP.current = !0;
                        let t = X.props;
                        t.onTouchStart && t.onTouchStart(e)
                    };
                p.useEffect(() => {
                    if (e$) return document.addEventListener("keydown", e), () => {
                        document.removeEventListener("keydown", e)
                    };

                    function e(e) {
                        ("Escape" === e.key || "Esc" === e.key) && eI(e)
                    }
                }, [eI, e$]);
                let eJ = (0, v.Z)(X.ref, eq, ex, t);
                ef || 0 === ef || (e$ = !1);
                let eK = p.useRef(),
                    eQ = {},
                    eV = "string" == typeof ef;
                J ? (eQ.title = e$ || !eV || Q ? null : ef, eQ["aria-describedby"] = e$ ? eF : null) : (eQ["aria-label"] = eV ? ef : null, eQ["aria-labelledby"] = e$ && !eV ? eF : null);
                let e0 = (0, n.Z)({}, eQ, eZ, X.props, {
                        className: (0, i.Z)(eZ.className, X.props.className),
                        onTouchStart: eG,
                        ref: eJ
                    }, en ? {
                        onMouseMove: e => {
                            let t = X.props;
                            t.onMouseMove && t.onMouseMove(e), N = {
                                x: e.clientX,
                                y: e.clientY
                            }, eK.current && eK.current.update()
                        }
                    } : {}),
                    e1 = {};
                ee || (e0.onTouchStart = e => {
                    eG(e), clearTimeout(eO.current), clearTimeout(eC.current), eA(), eW.current = document.body.style.WebkitUserSelect, document.body.style.WebkitUserSelect = "none", eL.current = setTimeout(() => {
                        document.body.style.WebkitUserSelect = eW.current, ej(e)
                    }, er)
                }, e0.onTouchEnd = e => {
                    X.props.onTouchEnd && X.props.onTouchEnd(e), eA(), clearTimeout(eO.current), eO.current = setTimeout(() => {
                        eI(e)
                    }, el)
                }), Q || (e0.onMouseOver = $(ej, e0.onMouseOver), e0.onMouseLeave = $(ez, e0.onMouseLeave), ek || (e1.onMouseOver = ej, e1.onMouseLeave = ez)), K || (e0.onFocus = $(eY, e0.onFocus), e0.onBlur = $(eX, e0.onBlur), ek || (e1.onFocus = eY, e1.onBlur = eX));
                let e4 = p.useMemo(() => {
                        var e;
                        let t = [{
                            name: "arrow",
                            enabled: !!eR,
                            options: {
                                element: eR,
                                padding: 4
                            }
                        }];
                        return null != (e = ed.popperOptions) && e.modifiers && (t = t.concat(ed.popperOptions.modifiers)), (0, n.Z)({}, ed.popperOptions, {
                            modifiers: t
                        })
                    }, [eR, ed]),
                    e7 = (0, n.Z)({}, q, {
                        isRtl: ew,
                        arrow: H,
                        disableInteractive: ek,
                        placement: ec,
                        PopperComponentProp: em,
                        touch: eP.current
                    }),
                    e3 = k(e7),
                    e2 = null != (o = null != (l = eg.popper) ? l : Y.Popper) ? o : C,
                    e9 = null != (u = null != (s = null != (d = eg.transition) ? d : Y.Transition) ? s : ev) ? u : h.Z,
                    e8 = null != (w = null != (y = eg.tooltip) ? y : Y.Tooltip) ? w : E,
                    e6 = null != (x = null != (R = eg.arrow) ? R : Y.Arrow) ? x : O,
                    e5 = (0, a.Z)(e2, (0, n.Z)({}, ed, null != (F = eh.popper) ? F : G.popper, {
                        className: (0, i.Z)(e3.popper, null == ed ? void 0 : ed.className, null == (W = null != (A = eh.popper) ? A : G.popper) ? void 0 : W.className)
                    }), e7),
                    te = (0, a.Z)(e9, (0, n.Z)({}, eT, null != (B = eh.transition) ? B : G.transition), e7),
                    tt = (0, a.Z)(e8, (0, n.Z)({}, null != (I = eh.tooltip) ? I : G.tooltip, {
                        className: (0, i.Z)(e3.tooltip, null == (j = null != (z = eh.tooltip) ? z : G.tooltip) ? void 0 : j.className)
                    }), e7),
                    to = (0, a.Z)(e6, (0, n.Z)({}, null != (D = eh.arrow) ? D : G.arrow, {
                        className: (0, i.Z)(e3.arrow, null == (U = null != (_ = eh.arrow) ? _ : G.arrow) ? void 0 : U.className)
                    }), e7);
                return (0, M.jsxs)(p.Fragment, {
                    children: [p.cloneElement(X, e0), (0, M.jsx)(e2, (0, n.Z)({
                        as: null != em ? em : g.Z,
                        placement: ec,
                        anchorEl: en ? {
                            getBoundingClientRect: () => ({
                                top: N.y,
                                left: N.x,
                                right: N.x,
                                bottom: N.y,
                                width: 0,
                                height: 0
                            })
                        } : ey,
                        popperRef: eK,
                        open: !!ey && e$,
                        id: eF,
                        transition: !0
                    }, e1, e5, {
                        popperOptions: e4,
                        children: ({
                            TransitionProps: e
                        }) => (0, M.jsx)(e9, (0, n.Z)({
                            timeout: eb.transitions.duration.shorter
                        }, e, te, {
                            children: (0, M.jsxs)(e8, (0, n.Z)({}, tt, {
                                children: [ef, H ? (0, M.jsx)(e6, (0, n.Z)({}, to, {
                                    ref: eM
                                })) : null]
                            }))
                        }))
                    }))]
                })
            });
            var W = F
        }
    }
]);