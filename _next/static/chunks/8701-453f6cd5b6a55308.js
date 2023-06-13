"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [8701], {
        8701: function(e, t, r) {
            let a;
            r.d(t, {
                ZP: function() {
                    return Q
                }
            });
            var l = r(46750),
                n = r(40431),
                o = r(86006),
                i = r(89791),
                s = r(47562),
                u = r(73820),
                d = r(82071),
                c = r(82131),
                m = r(84970),
                p = r(21454),
                v = r(84815),
                h = r(6804),
                b = r(2343),
                f = {
                    border: 0,
                    clip: "rect(0 0 0 0)",
                    height: "1px",
                    margin: -1,
                    overflow: "hidden",
                    padding: 0,
                    position: "absolute",
                    whiteSpace: "nowrap",
                    width: "1px"
                };

            function g(e, t) {
                return e - t
            }

            function x(e, t, r) {
                return null == e ? t : Math.min(Math.max(t, e), r)
            }

            function k(e, t) {
                var r;
                let {
                    index: a
                } = null != (r = e.reduce((e, r, a) => {
                    let l = Math.abs(t - r);
                    return null === e || l < e.distance || l === e.distance ? {
                        distance: l,
                        index: a
                    } : e
                }, null)) ? r : {};
                return a
            }

            function Z(e, t) {
                if (void 0 !== t.current && e.changedTouches) {
                    for (let r = 0; r < e.changedTouches.length; r += 1) {
                        let a = e.changedTouches[r];
                        if (a.identifier === t.current) return {
                            x: a.clientX,
                            y: a.clientY
                        }
                    }
                    return !1
                }
                return {
                    x: e.clientX,
                    y: e.clientY
                }
            }

            function y({
                values: e,
                newValue: t,
                index: r
            }) {
                let a = e.slice();
                return a[r] = t, a.sort(g)
            }

            function S({
                sliderRef: e,
                activeIndex: t,
                setActive: r
            }) {
                var a, l, n;
                let o = (0, c.Z)(e.current);
                null != (a = e.current) && a.contains(o.activeElement) && Number(null == o ? void 0 : null == (l = o.activeElement) ? void 0 : l.getAttribute("data-index")) === t || null == (n = e.current) || n.querySelector(`[type="range"][data-index="${t}"]`).focus(), r && r(t)
            }
            let w = {
                    horizontal: {
                        offset: e => ({
                            left: `${e}%`
                        }),
                        leap: e => ({
                            width: `${e}%`
                        })
                    },
                    "horizontal-reverse": {
                        offset: e => ({
                            right: `${e}%`
                        }),
                        leap: e => ({
                            width: `${e}%`
                        })
                    },
                    vertical: {
                        offset: e => ({
                            bottom: `${e}%`
                        }),
                        leap: e => ({
                            height: `${e}%`
                        })
                    }
                },
                L = e => e;

            function C() {
                return void 0 === a && (a = "undefined" == typeof CSS || "function" != typeof CSS.supports || CSS.supports("touch-action", "none")), a
            }
            var z = r(23343),
                P = r(12971),
                $ = r(76487),
                R = r(4957),
                M = e => !e || !(0, d.Z)(e),
                T = r(78473),
                N = r(88539),
                A = r(13809);

            function E(e) {
                return (0, A.Z)("MuiSlider", e)
            }
            let j = (0, N.Z)("MuiSlider", ["root", "active", "colorPrimary", "colorSecondary", "disabled", "dragging", "focusVisible", "mark", "markActive", "marked", "markLabel", "markLabelActive", "rail", "sizeSmall", "thumb", "thumbColorPrimary", "thumbColorSecondary", "track", "trackInverted", "trackFalse", "thumbSizeSmall", "valueLabel", "valueLabelOpen", "valueLabelCircle", "valueLabelLabel", "vertical"]);
            var F = r(9268);
            let O = e => {
                    let {
                        open: t
                    } = e, r = {
                        offset: (0, i.Z)(t && j.valueLabelOpen),
                        circle: j.valueLabelCircle,
                        label: j.valueLabelLabel
                    };
                    return r
                },
                I = ["aria-label", "aria-valuetext", "aria-labelledby", "component", "components", "componentsProps", "color", "classes", "className", "disableSwap", "disabled", "getAriaLabel", "getAriaValueText", "marks", "max", "min", "name", "onChange", "onChangeCommitted", "orientation", "size", "step", "scale", "slotProps", "slots", "tabIndex", "track", "value", "valueLabelDisplay", "valueLabelFormat"],
                V = (e, t, r) => (e - t) * 100 / (r - t);

            function D(e) {
                return e
            }
            let Y = (0, $.ZP)("span", {
                    name: "MuiSlider",
                    slot: "Root",
                    overridesResolver: (e, t) => {
                        let {
                            ownerState: r
                        } = e;
                        return [t.root, t[`color${(0,T.Z)(r.color)}`], "medium" !== r.size && t[`size${(0,T.Z)(r.size)}`], r.marked && t.marked, "vertical" === r.orientation && t.vertical, "inverted" === r.track && t.trackInverted, !1 === r.track && t.trackFalse]
                    }
                })(({
                    theme: e,
                    ownerState: t
                }) => (0, n.Z)({
                    borderRadius: 12,
                    boxSizing: "content-box",
                    display: "inline-block",
                    position: "relative",
                    cursor: "pointer",
                    touchAction: "none",
                    color: (e.vars || e).palette[t.color].main,
                    WebkitTapHighlightColor: "transparent"
                }, "horizontal" === t.orientation && (0, n.Z)({
                    height: 4,
                    width: "100%",
                    padding: "13px 0",
                    "@media (pointer: coarse)": {
                        padding: "20px 0"
                    }
                }, "small" === t.size && {
                    height: 2
                }, t.marked && {
                    marginBottom: 20
                }), "vertical" === t.orientation && (0, n.Z)({
                    height: "100%",
                    width: 4,
                    padding: "0 13px",
                    "@media (pointer: coarse)": {
                        padding: "0 20px"
                    }
                }, "small" === t.size && {
                    width: 2
                }, t.marked && {
                    marginRight: 44
                }), {
                    "@media print": {
                        colorAdjust: "exact"
                    },
                    [`&.${j.disabled}`]: {
                        pointerEvents: "none",
                        cursor: "default",
                        color: (e.vars || e).palette.grey[400]
                    },
                    [`&.${j.dragging}`]: {
                        [`& .${j.thumb}, & .${j.track}`]: {
                            transition: "none"
                        }
                    }
                })),
                B = (0, $.ZP)("span", {
                    name: "MuiSlider",
                    slot: "Rail",
                    overridesResolver: (e, t) => t.rail
                })(({
                    ownerState: e
                }) => (0, n.Z)({
                    display: "block",
                    position: "absolute",
                    borderRadius: "inherit",
                    backgroundColor: "currentColor",
                    opacity: .38
                }, "horizontal" === e.orientation && {
                    width: "100%",
                    height: "inherit",
                    top: "50%",
                    transform: "translateY(-50%)"
                }, "vertical" === e.orientation && {
                    height: "100%",
                    width: "inherit",
                    left: "50%",
                    transform: "translateX(-50%)"
                }, "inverted" === e.track && {
                    opacity: 1
                })),
                X = (0, $.ZP)("span", {
                    name: "MuiSlider",
                    slot: "Track",
                    overridesResolver: (e, t) => t.track
                })(({
                    theme: e,
                    ownerState: t
                }) => {
                    let r = "light" === e.palette.mode ? (0, z.$n)(e.palette[t.color].main, .62) : (0, z._j)(e.palette[t.color].main, .5);
                    return (0, n.Z)({
                        display: "block",
                        position: "absolute",
                        borderRadius: "inherit",
                        border: "1px solid currentColor",
                        backgroundColor: "currentColor",
                        transition: e.transitions.create(["left", "width", "bottom", "height"], {
                            duration: e.transitions.duration.shortest
                        })
                    }, "small" === t.size && {
                        border: "none"
                    }, "horizontal" === t.orientation && {
                        height: "inherit",
                        top: "50%",
                        transform: "translateY(-50%)"
                    }, "vertical" === t.orientation && {
                        width: "inherit",
                        left: "50%",
                        transform: "translateX(-50%)"
                    }, !1 === t.track && {
                        display: "none"
                    }, "inverted" === t.track && {
                        backgroundColor: e.vars ? e.vars.palette.Slider[`${t.color}Track`] : r,
                        borderColor: e.vars ? e.vars.palette.Slider[`${t.color}Track`] : r
                    })
                }),
                _ = (0, $.ZP)("span", {
                    name: "MuiSlider",
                    slot: "Thumb",
                    overridesResolver: (e, t) => {
                        let {
                            ownerState: r
                        } = e;
                        return [t.thumb, t[`thumbColor${(0,T.Z)(r.color)}`], "medium" !== r.size && t[`thumbSize${(0,T.Z)(r.size)}`]]
                    }
                })(({
                    theme: e,
                    ownerState: t
                }) => (0, n.Z)({
                    position: "absolute",
                    width: 20,
                    height: 20,
                    boxSizing: "border-box",
                    borderRadius: "50%",
                    outline: 0,
                    backgroundColor: "currentColor",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: e.transitions.create(["box-shadow", "left", "bottom"], {
                        duration: e.transitions.duration.shortest
                    })
                }, "small" === t.size && {
                    width: 12,
                    height: 12
                }, "horizontal" === t.orientation && {
                    top: "50%",
                    transform: "translate(-50%, -50%)"
                }, "vertical" === t.orientation && {
                    left: "50%",
                    transform: "translate(-50%, 50%)"
                }, {
                    "&:before": (0, n.Z)({
                        position: "absolute",
                        content: '""',
                        borderRadius: "inherit",
                        width: "100%",
                        height: "100%",
                        boxShadow: (e.vars || e).shadows[2]
                    }, "small" === t.size && {
                        boxShadow: "none"
                    }),
                    "&::after": {
                        position: "absolute",
                        content: '""',
                        borderRadius: "50%",
                        width: 42,
                        height: 42,
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)"
                    },
                    [`&:hover, &.${j.focusVisible}`]: {
                        boxShadow: `0px 0px 0px 8px ${e.vars?`rgba(${e.vars.palette[t.color].mainChannel} / 0.16)`:(0,z.Fq)(e.palette[t.color].main,.16)}`,
                        "@media (hover: none)": {
                            boxShadow: "none"
                        }
                    },
                    [`&.${j.active}`]: {
                        boxShadow: `0px 0px 0px 14px ${e.vars?`rgba(${e.vars.palette[t.color].mainChannel} / 0.16)`:(0,z.Fq)(e.palette[t.color].main,.16)}`
                    },
                    [`&.${j.disabled}`]: {
                        "&:hover": {
                            boxShadow: "none"
                        }
                    }
                })),
                q = (0, $.ZP)(function(e) {
                    let {
                        children: t,
                        className: r,
                        value: a
                    } = e, l = O(e);
                    return t ? o.cloneElement(t, {
                        className: (0, i.Z)(t.props.className)
                    }, (0, F.jsxs)(o.Fragment, {
                        children: [t.props.children, (0, F.jsx)("span", {
                            className: (0, i.Z)(l.offset, r),
                            "aria-hidden": !0,
                            children: (0, F.jsx)("span", {
                                className: l.circle,
                                children: (0, F.jsx)("span", {
                                    className: l.label,
                                    children: a
                                })
                            })
                        })]
                    })) : null
                }, {
                    name: "MuiSlider",
                    slot: "ValueLabel",
                    overridesResolver: (e, t) => t.valueLabel
                })(({
                    theme: e,
                    ownerState: t
                }) => (0, n.Z)({
                    [`&.${j.valueLabelOpen}`]: {
                        transform: "translateY(-100%) scale(1)"
                    },
                    zIndex: 1,
                    whiteSpace: "nowrap"
                }, e.typography.body2, {
                    fontWeight: 500,
                    transition: e.transitions.create(["transform"], {
                        duration: e.transitions.duration.shortest
                    }),
                    transform: "translateY(-100%) scale(0)",
                    position: "absolute",
                    backgroundColor: (e.vars || e).palette.grey[600],
                    borderRadius: 2,
                    color: (e.vars || e).palette.common.white,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "0.25rem 0.75rem"
                }, "horizontal" === t.orientation && {
                    top: "-10px",
                    transformOrigin: "bottom center",
                    "&:before": {
                        position: "absolute",
                        content: '""',
                        width: 8,
                        height: 8,
                        transform: "translate(-50%, 50%) rotate(45deg)",
                        backgroundColor: "inherit",
                        bottom: 0,
                        left: "50%"
                    }
                }, "vertical" === t.orientation && {
                    right: "30px",
                    top: "24px",
                    transformOrigin: "right center",
                    "&:before": {
                        position: "absolute",
                        content: '""',
                        width: 8,
                        height: 8,
                        transform: "translate(-50%, 50%) rotate(45deg)",
                        backgroundColor: "inherit",
                        right: "-20%",
                        top: "25%"
                    }
                }, "small" === t.size && {
                    fontSize: e.typography.pxToRem(12),
                    padding: "0.25rem 0.5rem"
                })),
                H = (0, $.ZP)("span", {
                    name: "MuiSlider",
                    slot: "Mark",
                    shouldForwardProp: e => (0, $.Dz)(e) && "markActive" !== e,
                    overridesResolver: (e, t) => {
                        let {
                            markActive: r
                        } = e;
                        return [t.mark, r && t.markActive]
                    }
                })(({
                    theme: e,
                    ownerState: t,
                    markActive: r
                }) => (0, n.Z)({
                    position: "absolute",
                    width: 2,
                    height: 2,
                    borderRadius: 1,
                    backgroundColor: "currentColor"
                }, "horizontal" === t.orientation && {
                    top: "50%",
                    transform: "translate(-1px, -50%)"
                }, "vertical" === t.orientation && {
                    left: "50%",
                    transform: "translate(-50%, 1px)"
                }, r && {
                    backgroundColor: (e.vars || e).palette.background.paper,
                    opacity: .8
                })),
                W = (0, $.ZP)("span", {
                    name: "MuiSlider",
                    slot: "MarkLabel",
                    shouldForwardProp: e => (0, $.Dz)(e) && "markLabelActive" !== e,
                    overridesResolver: (e, t) => t.markLabel
                })(({
                    theme: e,
                    ownerState: t,
                    markLabelActive: r
                }) => (0, n.Z)({}, e.typography.body2, {
                    color: (e.vars || e).palette.text.secondary,
                    position: "absolute",
                    whiteSpace: "nowrap"
                }, "horizontal" === t.orientation && {
                    top: 30,
                    transform: "translateX(-50%)",
                    "@media (pointer: coarse)": {
                        top: 40
                    }
                }, "vertical" === t.orientation && {
                    left: 36,
                    transform: "translateY(50%)",
                    "@media (pointer: coarse)": {
                        left: 44
                    }
                }, r && {
                    color: (e.vars || e).palette.text.primary
                })),
                G = e => {
                    let {
                        disabled: t,
                        dragging: r,
                        marked: a,
                        orientation: l,
                        track: n,
                        classes: o,
                        color: i,
                        size: u
                    } = e, d = {
                        root: ["root", t && "disabled", r && "dragging", a && "marked", "vertical" === l && "vertical", "inverted" === n && "trackInverted", !1 === n && "trackFalse", i && `color${(0,T.Z)(i)}`, u && `size${(0,T.Z)(u)}`],
                        rail: ["rail"],
                        track: ["track"],
                        mark: ["mark"],
                        markActive: ["markActive"],
                        markLabel: ["markLabel"],
                        markLabelActive: ["markLabelActive"],
                        valueLabel: ["valueLabel"],
                        thumb: ["thumb", t && "disabled", u && `thumbSize${(0,T.Z)(u)}`, i && `thumbColor${(0,T.Z)(i)}`],
                        active: ["active"],
                        disabled: ["disabled"],
                        focusVisible: ["focusVisible"]
                    };
                    return (0, s.Z)(d, E, o)
                },
                J = ({
                    children: e
                }) => e,
                K = o.forwardRef(function(e, t) {
                    var r, a, s, z, $, T, N, A, E, j, O, K, Q, U, ee, et, er, ea, el, en, eo, ei, es, eu;
                    let ed = (0, P.Z)({
                            props: e,
                            name: "MuiSlider"
                        }),
                        ec = (0, R.Z)(),
                        em = "rtl" === ec.direction,
                        {
                            "aria-label": ep,
                            "aria-valuetext": ev,
                            "aria-labelledby": eh,
                            component: eb = "span",
                            components: ef = {},
                            componentsProps: eg = {},
                            color: ex = "primary",
                            classes: ek,
                            className: eZ,
                            disableSwap: ey = !1,
                            disabled: eS = !1,
                            getAriaLabel: ew,
                            getAriaValueText: eL,
                            marks: eC = !1,
                            max: ez = 100,
                            min: eP = 0,
                            orientation: e$ = "horizontal",
                            size: eR = "medium",
                            step: eM = 1,
                            scale: eT = D,
                            slotProps: eN,
                            slots: eA,
                            track: eE = "normal",
                            valueLabelDisplay: ej = "off",
                            valueLabelFormat: eF = D
                        } = ed,
                        eO = (0, l.Z)(ed, I),
                        eI = (0, n.Z)({}, ed, {
                            isRtl: em,
                            max: ez,
                            min: eP,
                            classes: ek,
                            disabled: eS,
                            disableSwap: ey,
                            orientation: e$,
                            marks: eC,
                            color: ex,
                            size: eR,
                            step: eM,
                            scale: eT,
                            track: eE,
                            valueLabelDisplay: ej,
                            valueLabelFormat: eF
                        }),
                        {
                            axisProps: eV,
                            getRootProps: eD,
                            getHiddenInputProps: eY,
                            getThumbProps: eB,
                            open: eX,
                            active: e_,
                            axis: eq,
                            focusedThumbIndex: eH,
                            range: eW,
                            dragging: eG,
                            marks: eJ,
                            values: eK,
                            trackOffset: eQ,
                            trackLeap: eU
                        } = function(e) {
                            let {
                                "aria-labelledby": t,
                                defaultValue: r,
                                disabled: a = !1,
                                disableSwap: l = !1,
                                isRtl: i = !1,
                                marks: s = !1,
                                max: u = 100,
                                min: d = 0,
                                name: z,
                                onChange: P,
                                onChangeCommitted: $,
                                orientation: R = "horizontal",
                                ref: M,
                                scale: T = L,
                                step: N = 1,
                                tabIndex: A,
                                value: E
                            } = e, j = o.useRef(), [F, O] = o.useState(-1), [I, V] = o.useState(-1), [D, Y] = o.useState(!1), B = o.useRef(0), [X, _] = (0, m.Z)({
                                controlled: E,
                                default: null != r ? r : d,
                                name: "Slider"
                            }), q = P && ((e, t, r) => {
                                let a = e.nativeEvent || e,
                                    l = new a.constructor(a.type, a);
                                Object.defineProperty(l, "target", {
                                    writable: !0,
                                    value: {
                                        value: t,
                                        name: z
                                    }
                                }), P(l, t, r)
                            }), H = Array.isArray(X), W = H ? X.slice().sort(g) : [X];
                            W = W.map(e => x(e, d, u));
                            let G = !0 === s && null !== N ? [...Array(Math.floor((u - d) / N) + 1)].map((e, t) => ({
                                    value: d + N * t
                                })) : s || [],
                                J = G.map(e => e.value),
                                {
                                    isFocusVisibleRef: K,
                                    onBlur: Q,
                                    onFocus: U,
                                    ref: ee
                                } = (0, p.Z)(),
                                [et, er] = o.useState(-1),
                                ea = o.useRef(),
                                el = (0, v.Z)(ee, ea),
                                en = (0, v.Z)(M, el),
                                eo = e => t => {
                                    var r;
                                    let a = Number(t.currentTarget.getAttribute("data-index"));
                                    U(t), !0 === K.current && er(a), V(a), null == e || null == (r = e.onFocus) || r.call(e, t)
                                },
                                ei = e => t => {
                                    var r;
                                    Q(t), !1 === K.current && er(-1), V(-1), null == e || null == (r = e.onBlur) || r.call(e, t)
                                };
                            (0, h.Z)(() => {
                                if (a && ea.current.contains(document.activeElement)) {
                                    var e;
                                    null == (e = document.activeElement) || e.blur()
                                }
                            }, [a]), a && -1 !== F && O(-1), a && -1 !== et && er(-1);
                            let es = e => t => {
                                    var r;
                                    null == (r = e.onChange) || r.call(e, t);
                                    let a = Number(t.currentTarget.getAttribute("data-index")),
                                        n = W[a],
                                        o = J.indexOf(n),
                                        i = t.target.valueAsNumber;
                                    if (G && null == N && (i = i < n ? J[o - 1] : J[o + 1]), i = x(i, d, u), G && null == N) {
                                        let e = J.indexOf(W[a]);
                                        i = i < W[a] ? J[e - 1] : J[e + 1]
                                    }
                                    if (H) {
                                        l && (i = x(i, W[a - 1] || -1 / 0, W[a + 1] || 1 / 0));
                                        let e = i;
                                        i = y({
                                            values: W,
                                            newValue: i,
                                            index: a
                                        });
                                        let t = a;
                                        l || (t = i.indexOf(e)), S({
                                            sliderRef: ea,
                                            activeIndex: t
                                        })
                                    }
                                    _(i), er(a), q && q(t, i, a), $ && $(t, i)
                                },
                                eu = o.useRef(),
                                ed = R;
                            i && "horizontal" === R && (ed += "-reverse");
                            let ec = ({
                                    finger: e,
                                    move: t = !1
                                }) => {
                                    let r, a;
                                    let {
                                        current: n
                                    } = ea, {
                                        width: o,
                                        height: i,
                                        bottom: s,
                                        left: c
                                    } = n.getBoundingClientRect();
                                    if (r = 0 === ed.indexOf("vertical") ? (s - e.y) / i : (e.x - c) / o, -1 !== ed.indexOf("-reverse") && (r = 1 - r), a = (u - d) * r + d, N) a = function(e, t, r) {
                                        let a = Math.round((e - r) / t) * t + r;
                                        return Number(a.toFixed(function(e) {
                                            if (1 > Math.abs(e)) {
                                                let t = e.toExponential().split("e-"),
                                                    r = t[0].split(".")[1];
                                                return (r ? r.length : 0) + parseInt(t[1], 10)
                                            }
                                            let t = e.toString().split(".")[1];
                                            return t ? t.length : 0
                                        }(t)))
                                    }(a, N, d);
                                    else {
                                        let e = k(J, a);
                                        a = J[e]
                                    }
                                    a = x(a, d, u);
                                    let m = 0;
                                    if (H) {
                                        m = t ? eu.current : k(W, a), l && (a = x(a, W[m - 1] || -1 / 0, W[m + 1] || 1 / 0));
                                        let e = a;
                                        a = y({
                                            values: W,
                                            newValue: a,
                                            index: m
                                        }), l && t || (m = a.indexOf(e), eu.current = m)
                                    }
                                    return {
                                        newValue: a,
                                        activeIndex: m
                                    }
                                },
                                em = (0, b.Z)(e => {
                                    let t = Z(e, j);
                                    if (!t) return;
                                    if (B.current += 1, "mousemove" === e.type && 0 === e.buttons) {
                                        ep(e);
                                        return
                                    }
                                    let {
                                        newValue: r,
                                        activeIndex: a
                                    } = ec({
                                        finger: t,
                                        move: !0
                                    });
                                    S({
                                        sliderRef: ea,
                                        activeIndex: a,
                                        setActive: O
                                    }), _(r), !D && B.current > 2 && Y(!0), q && r !== X && q(e, r, a)
                                }),
                                ep = (0, b.Z)(e => {
                                    let t = Z(e, j);
                                    if (Y(!1), !t) return;
                                    let {
                                        newValue: r
                                    } = ec({
                                        finger: t,
                                        move: !0
                                    });
                                    O(-1), "touchend" === e.type && V(-1), $ && $(e, r), j.current = void 0, eh()
                                }),
                                ev = (0, b.Z)(e => {
                                    if (a) return;
                                    C() || e.preventDefault();
                                    let t = e.changedTouches[0];
                                    null != t && (j.current = t.identifier);
                                    let r = Z(e, j);
                                    if (!1 !== r) {
                                        let {
                                            newValue: t,
                                            activeIndex: a
                                        } = ec({
                                            finger: r
                                        });
                                        S({
                                            sliderRef: ea,
                                            activeIndex: a,
                                            setActive: O
                                        }), _(t), q && q(e, t, a)
                                    }
                                    B.current = 0;
                                    let l = (0, c.Z)(ea.current);
                                    l.addEventListener("touchmove", em), l.addEventListener("touchend", ep)
                                }),
                                eh = o.useCallback(() => {
                                    let e = (0, c.Z)(ea.current);
                                    e.removeEventListener("mousemove", em), e.removeEventListener("mouseup", ep), e.removeEventListener("touchmove", em), e.removeEventListener("touchend", ep)
                                }, [ep, em]);
                            o.useEffect(() => {
                                let {
                                    current: e
                                } = ea;
                                return e.addEventListener("touchstart", ev, {
                                    passive: C()
                                }), () => {
                                    e.removeEventListener("touchstart", ev, {
                                        passive: C()
                                    }), eh()
                                }
                            }, [eh, ev]), o.useEffect(() => {
                                a && eh()
                            }, [a, eh]);
                            let eb = e => t => {
                                    var r;
                                    if (null == (r = e.onMouseDown) || r.call(e, t), a || t.defaultPrevented || 0 !== t.button) return;
                                    t.preventDefault();
                                    let l = Z(t, j);
                                    if (!1 !== l) {
                                        let {
                                            newValue: e,
                                            activeIndex: r
                                        } = ec({
                                            finger: l
                                        });
                                        S({
                                            sliderRef: ea,
                                            activeIndex: r,
                                            setActive: O
                                        }), _(e), q && q(t, e, r)
                                    }
                                    B.current = 0;
                                    let n = (0, c.Z)(ea.current);
                                    n.addEventListener("mousemove", em), n.addEventListener("mouseup", ep)
                                },
                                ef = ((H ? W[0] : d) - d) * 100 / (u - d),
                                eg = (W[W.length - 1] - d) * 100 / (u - d) - ef,
                                ex = e => t => {
                                    var r;
                                    null == (r = e.onMouseOver) || r.call(e, t);
                                    let a = Number(t.currentTarget.getAttribute("data-index"));
                                    V(a)
                                },
                                ek = e => t => {
                                    var r;
                                    null == (r = e.onMouseLeave) || r.call(e, t), V(-1)
                                };
                            return {
                                active: F,
                                axis: ed,
                                axisProps: w,
                                dragging: D,
                                focusedThumbIndex: et,
                                getHiddenInputProps: (r = {}) => {
                                    var l;
                                    let o = {
                                            onChange: es(r || {}),
                                            onFocus: eo(r || {}),
                                            onBlur: ei(r || {})
                                        },
                                        s = (0, n.Z)({}, r, o);
                                    return (0, n.Z)({
                                        tabIndex: A,
                                        "aria-labelledby": t,
                                        "aria-orientation": R,
                                        "aria-valuemax": T(u),
                                        "aria-valuemin": T(d),
                                        name: z,
                                        type: "range",
                                        min: e.min,
                                        max: e.max,
                                        step: null != (l = e.step) ? l : void 0,
                                        disabled: a
                                    }, s, {
                                        style: (0, n.Z)({}, f, {
                                            direction: i ? "rtl" : "ltr",
                                            width: "100%",
                                            height: "100%"
                                        })
                                    })
                                },
                                getRootProps: (e = {}) => {
                                    let t = {
                                            onMouseDown: eb(e || {})
                                        },
                                        r = (0, n.Z)({}, e, t);
                                    return (0, n.Z)({
                                        ref: en
                                    }, r)
                                },
                                getThumbProps: (e = {}) => {
                                    let t = {
                                        onMouseOver: ex(e || {}),
                                        onMouseLeave: ek(e || {})
                                    };
                                    return (0, n.Z)({}, e, t)
                                },
                                marks: G,
                                open: I,
                                range: H,
                                trackLeap: eg,
                                trackOffset: ef,
                                values: W
                            }
                        }((0, n.Z)({}, eI, {
                            ref: t
                        }));
                    eI.marked = eJ.length > 0 && eJ.some(e => e.label), eI.dragging = eG, eI.focusedThumbIndex = eH;
                    let e0 = G(eI),
                        e1 = null != (r = null != (a = null == eA ? void 0 : eA.root) ? a : ef.Root) ? r : Y,
                        e5 = null != (s = null != (z = null == eA ? void 0 : eA.rail) ? z : ef.Rail) ? s : B,
                        e2 = null != ($ = null != (T = null == eA ? void 0 : eA.track) ? T : ef.Track) ? $ : X,
                        e4 = null != (N = null != (A = null == eA ? void 0 : eA.thumb) ? A : ef.Thumb) ? N : _,
                        e8 = null != (E = null != (j = null == eA ? void 0 : eA.valueLabel) ? j : ef.ValueLabel) ? E : q,
                        e3 = null != (O = null != (K = null == eA ? void 0 : eA.mark) ? K : ef.Mark) ? O : H,
                        e7 = null != (Q = null != (U = null == eA ? void 0 : eA.markLabel) ? U : ef.MarkLabel) ? Q : W,
                        e6 = null != (ee = null != (et = null == eA ? void 0 : eA.input) ? et : ef.Input) ? ee : "input",
                        e9 = null != (er = null == eN ? void 0 : eN.root) ? er : eg.root,
                        te = null != (ea = null == eN ? void 0 : eN.rail) ? ea : eg.rail,
                        tt = null != (el = null == eN ? void 0 : eN.track) ? el : eg.track,
                        tr = null != (en = null == eN ? void 0 : eN.thumb) ? en : eg.thumb,
                        ta = null != (eo = null == eN ? void 0 : eN.valueLabel) ? eo : eg.valueLabel,
                        tl = null != (ei = null == eN ? void 0 : eN.mark) ? ei : eg.mark,
                        tn = null != (es = null == eN ? void 0 : eN.markLabel) ? es : eg.markLabel,
                        to = null != (eu = null == eN ? void 0 : eN.input) ? eu : eg.input,
                        ti = (0, u.Z)({
                            elementType: e1,
                            getSlotProps: eD,
                            externalSlotProps: e9,
                            externalForwardedProps: eO,
                            additionalProps: (0, n.Z)({}, M(e1) && {
                                as: eb
                            }),
                            ownerState: (0, n.Z)({}, eI, null == e9 ? void 0 : e9.ownerState),
                            className: [e0.root, eZ]
                        }),
                        ts = (0, u.Z)({
                            elementType: e5,
                            externalSlotProps: te,
                            ownerState: eI,
                            className: e0.rail
                        }),
                        tu = (0, u.Z)({
                            elementType: e2,
                            externalSlotProps: tt,
                            additionalProps: {
                                style: (0, n.Z)({}, eV[eq].offset(eQ), eV[eq].leap(eU))
                            },
                            ownerState: (0, n.Z)({}, eI, null == tt ? void 0 : tt.ownerState),
                            className: e0.track
                        }),
                        td = (0, u.Z)({
                            elementType: e4,
                            getSlotProps: eB,
                            externalSlotProps: tr,
                            ownerState: (0, n.Z)({}, eI, null == tr ? void 0 : tr.ownerState)
                        }),
                        tc = (0, u.Z)({
                            elementType: e8,
                            externalSlotProps: ta,
                            ownerState: (0, n.Z)({}, eI, null == ta ? void 0 : ta.ownerState),
                            className: e0.valueLabel
                        }),
                        tm = (0, u.Z)({
                            elementType: e3,
                            externalSlotProps: tl,
                            ownerState: eI,
                            className: e0.mark
                        }),
                        tp = (0, u.Z)({
                            elementType: e7,
                            externalSlotProps: tn,
                            ownerState: eI
                        }),
                        tv = (0, u.Z)({
                            elementType: e6,
                            getSlotProps: eY,
                            externalSlotProps: to,
                            ownerState: eI
                        });
                    return (0, F.jsxs)(e1, (0, n.Z)({}, ti, {
                        children: [(0, F.jsx)(e5, (0, n.Z)({}, ts)), (0, F.jsx)(e2, (0, n.Z)({}, tu)), eJ.filter(e => e.value >= eP && e.value <= ez).map((e, t) => {
                            let r;
                            let a = V(e.value, eP, ez),
                                l = eV[eq].offset(a);
                            return r = !1 === eE ? -1 !== eK.indexOf(e.value) : "normal" === eE && (eW ? e.value >= eK[0] && e.value <= eK[eK.length - 1] : e.value <= eK[0]) || "inverted" === eE && (eW ? e.value <= eK[0] || e.value >= eK[eK.length - 1] : e.value >= eK[0]), (0, F.jsxs)(o.Fragment, {
                                children: [(0, F.jsx)(e3, (0, n.Z)({
                                    "data-index": t
                                }, tm, !(0, d.Z)(e3) && {
                                    markActive: r
                                }, {
                                    style: (0, n.Z)({}, l, tm.style),
                                    className: (0, i.Z)(tm.className, r && e0.markActive)
                                })), null != e.label ? (0, F.jsx)(e7, (0, n.Z)({
                                    "aria-hidden": !0,
                                    "data-index": t
                                }, tp, !(0, d.Z)(e7) && {
                                    markLabelActive: r
                                }, {
                                    style: (0, n.Z)({}, l, tp.style),
                                    className: (0, i.Z)(e0.markLabel, tp.className, r && e0.markLabelActive),
                                    children: e.label
                                })) : null]
                            }, t)
                        }), eK.map((e, t) => {
                            let r = V(e, eP, ez),
                                a = eV[eq].offset(r),
                                l = "off" === ej ? J : e8;
                            return (0, F.jsx)(o.Fragment, {
                                children: (0, F.jsx)(l, (0, n.Z)({}, !(0, d.Z)(l) && {
                                    valueLabelFormat: eF,
                                    valueLabelDisplay: ej,
                                    value: "function" == typeof eF ? eF(eT(e), t) : eF,
                                    index: t,
                                    open: eX === t || e_ === t || "on" === ej,
                                    disabled: eS
                                }, tc, {
                                    children: (0, F.jsx)(e4, (0, n.Z)({
                                        "data-index": t,
                                        "data-focusvisible": eH === t
                                    }, td, {
                                        className: (0, i.Z)(e0.thumb, td.className, e_ === t && e0.active, eH === t && e0.focusVisible),
                                        style: (0, n.Z)({}, a, {
                                            pointerEvents: ey && e_ !== t ? "none" : void 0
                                        }, td.style),
                                        children: (0, F.jsx)(e6, (0, n.Z)({
                                            "data-index": t,
                                            "aria-label": ew ? ew(t) : ep,
                                            "aria-valuenow": eT(e),
                                            "aria-labelledby": eh,
                                            "aria-valuetext": eL ? eL(eT(e), t) : ev,
                                            value: eK[t]
                                        }, tv))
                                    }))
                                }))
                            }, t)
                        })]
                    }))
                });
            var Q = K
        }
    }
]);