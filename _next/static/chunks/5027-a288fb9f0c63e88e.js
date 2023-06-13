(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [5027], {
        25027: function(e, l, o) {
            "use strict";
            o.r(l);
            var i = o(9268),
                t = o(86006),
                s = o(29788),
                n = o.n(s),
                c = o(64744),
                r = o(34984),
                a = o(41183),
                d = o(35840),
                _ = o(75444),
                u = o(41470),
                m = o(88568),
                C = o(66531),
                p = o(56514),
                v = o(64596),
                x = o(94606),
                h = o(5169);
            let k = !0;
            l.default = e => {
                var l;
                let {
                    isMobile: o
                } = e, [s, w] = t.useState(""), [b, g] = t.useState("VolumeWeekDesc"), [y, N] = t.useState(!1), j = (0, h.Z)(s, 300), {
                    data: f,
                    error: D,
                    isLoading: F,
                    isValidating: H,
                    mutate: Z,
                    size: R,
                    setSize: S
                } = (0, u.ZP)((e, l) => {
                    let o = "".concat(c.T5, "/v2/brc20s?order=").concat(b, "&offset=").concat(100 * e, "&limit=").concat(100);
                    return j && (o = "".concat(o, "&search=").concat(j)), o
                }, m._i, {
                    initialSize: 1,
                    revalidateFirstPage: !1
                }), V = t.useMemo(() => [{
                    title: "1H Volume",
                    key: "volume_hour",
                    id: "VolumeHourDesc",
                    onClick: () => {
                        k = !1, g("VolumeHourDesc")
                    }
                }, {
                    title: "6H Volume",
                    key: "volume_six_hour",
                    id: "VolumeSixHourDesc",
                    onClick: () => {
                        k = !1, g("VolumeSixHourDesc")
                    }
                }, {
                    title: "24H Volume",
                    key: "volume_day",
                    id: "VolumeDayDesc",
                    onClick: () => {
                        k = !1, g("VolumeDayDesc")
                    }
                }, {
                    title: "7D Volume",
                    key: "volume_week",
                    id: "VolumeWeekDesc",
                    onClick: () => {
                        k = !1, g("VolumeWeekDesc")
                    }
                }, {
                    title: "30D Volume",
                    key: "volume_month",
                    id: "VolumeMonthDesc",
                    onClick: () => {
                        k = !1, g("VolumeMonthDesc")
                    }
                }, {
                    title: "Total Volume",
                    key: "volume_all_time",
                    id: "VolumeTotalDesc",
                    onClick: () => {
                        k = !1, g("VolumeTotalDesc")
                    }
                }, {
                    title: "7D Change",
                    key: "ChangeWeekDesc",
                    id: "ChangeWeekDesc",
                    onClick: () => {
                        k = !1, g("ChangeWeekDesc")
                    }
                }, {
                    title: "Lowest floor",
                    id: "FloorAsc",
                    key: "FloorAsc",
                    onClick: () => {
                        k = !1, g("FloorAsc")
                    }
                }, {
                    title: "Highest floor",
                    id: "FloorDesc",
                    key: "FloorDesc",
                    onClick: () => {
                        k = !1, g("FloorDesc")
                    }
                }, {
                    title: "Owners",
                    id: "OwnersDesc",
                    key: "OwnersDesc",
                    onClick: () => {
                        k = !1, g("OwnersDesc")
                    }
                }], []), M = [{
                    label: "Ticker"
                }, {
                    label: "Market Cap"
                }, {
                    label: "7D Change"
                }, {
                    label: (null == b ? void 0 : b.includes("Volume")) ? null === (l = V.find(e => e.id === b)) || void 0 === l ? void 0 : l.title : "7D Volume"
                }, {
                    label: "Owners"
                }], T = t.useCallback(async () => {
                    S(R + 1)
                }, [R, S]), W = [];
                if (null == f ? void 0 : f.length)
                    for (let e of f) W = W.concat(null == e ? void 0 : e.brc20s);
                else W = e.items;
                return (0, i.jsxs)("div", {
                    className: n().root,
                    children: [(0, i.jsx)(C.Z, {
                        title: e.title,
                        mobileTitle: !0,
                        tabs: null == e ? void 0 : e.tabs,
                        selectedOption: b,
                        options: V,
                        gridView: y,
                        setGridView: N,
                        search: s,
                        setSearch: w,
                        label: "Collection",
                        divider: !0
                    }), (0, i.jsxs)(a.Z, {
                        dataLength: (null == W ? void 0 : W.length) ? null == W ? void 0 : W.length : 0,
                        next: T,
                        hasMore: (null == W ? void 0 : W.length) % 100 == 0,
                        loader: (0, i.jsx)("div", {
                            className: n().loading,
                            children: (0, i.jsx)(r.default, {})
                        }),
                        children: [y && (F && !k ? (0, i.jsx)(x.Z, {}) : (0, i.jsx)(_.Z, {
                            className: n().grid,
                            children: W.map((e, l) => (0, i.jsx)(d.Z, {
                                collection: e
                            }, l))
                        })), !y && (0, i.jsx)(p.Z, {
                            className: n().table,
                            columns: M,
                            headerClassName: n().header,
                            columnClassName: n().column,
                            children: F && !k ? (0, i.jsx)(x.Z, {}) : null == W ? void 0 : W.map((e, l) => {
                                var t, s, n;
                                return (0, i.jsx)(v.Z, {
                                    collection: e,
                                    selectedKey: o ? null === (s = V.find(e => e.id === b)) || void 0 === s ? void 0 : s.key : (null == b ? void 0 : b.includes("Volume")) ? null === (t = V.find(e => e.id === b)) || void 0 === t ? void 0 : t.key : "volume_week",
                                    selectedTitle: null === (n = V.find(e => e.id === b)) || void 0 === n ? void 0 : n.title
                                }, l)
                            })
                        })]
                    })]
                })
            }
        },
        66900: function(e, l, o) {
            "use strict";
            var i = o(9268);
            o(86006);
            var t = o(8683),
                s = o.n(t),
                n = o(57279),
                c = o.n(n),
                r = o(94452),
                a = o(15648),
                d = o(97961);
            l.Z = e => {
                var l;
                let {
                    className: o,
                    collection: t
                } = e, {
                    exchangeRate: n
                } = (0, a.Z)(), _ = (0, d.Z)((null == t ? void 0 : t.floor_price_per) / 1e8 * n || 0);
                return (0, i.jsxs)("div", {
                    className: s()({
                        [e.className]: !!o
                    }, c().root),
                    children: [(0, i.jsx)(r.Z, {
                        className: c().icon,
                        imageClassName: c().icon,
                        ticker: null == t ? void 0 : t.ticker
                    }), (0, i.jsxs)("div", {
                        className: c().body,
                        children: [(0, i.jsxs)("div", {
                            className: c().title,
                            children: ["$", null == t ? void 0 : null === (l = t.ticker) || void 0 === l ? void 0 : l.toUpperCase()]
                        }), (0, i.jsx)("div", {
                            className: c().subtitle,
                            children: (0, i.jsxs)("p", {
                                className: s()(c().description, "text-sm"),
                                children: ["PRICE $", _]
                            })
                        })]
                    })]
                })
            }
        },
        35840: function(e, l, o) {
            "use strict";
            var i = o(9268);
            o(86006);
            var t = o(8683),
                s = o.n(t),
                n = o(49456),
                c = o.n(n),
                r = o(21739),
                a = o(64744);
            l.Z = e => {
                var l;
                let {
                    collection: o
                } = e;
                return (0, i.jsxs)(r.default, {
                    className: c().root,
                    href: "/brc20/".concat(null == o ? void 0 : o.ticker),
                    children: [(0, i.jsx)("img", {
                        src: "".concat(a.Mq, "/brc20/").concat(null == o ? void 0 : o.ticker, "/preview"),
                        className: c().imageWrapper
                    }), (0, i.jsxs)("div", {
                        className: c().body,
                        children: [(0, i.jsxs)("p", {
                            className: s()(c().title, "display-xs", "semibold"),
                            children: ["$", null == o ? void 0 : null === (l = o.ticker) || void 0 === l ? void 0 : l.toUpperCase()]
                        }), (0, i.jsxs)("div", {
                            className: c().detailsContainer,
                            children: [(0, i.jsxs)("div", {
                                className: c().supplyContainer,
                                children: [(0, i.jsx)("p", {
                                    className: s()(c().supply, "text-xs"),
                                    children: (null == o ? void 0 : o.listed) === 0 ? "Supply" : "Listings"
                                }), (0, i.jsx)("p", {
                                    className: s()(c().description, "text-sm"),
                                    children: (null == o ? void 0 : o.listed) === 0 ? null == o ? void 0 : o.total_supply : null == o ? void 0 : o.listed
                                })]
                            }), (0, i.jsxs)("div", {
                                className: c().inscriptionContainer,
                                children: [(0, i.jsx)("p", {
                                    className: s()(c().supply, "text-xs"),
                                    children: "Total Supply"
                                }), (0, i.jsx)("p", {
                                    className: s()(c().description, "text-sm"),
                                    children: null == o ? void 0 : o.total_supply
                                })]
                            })]
                        })]
                    })]
                })
            }
        },
        64596: function(e, l, o) {
            "use strict";
            var i = o(9268);
            o(86006);
            var t = o(21739),
                s = o(8683),
                n = o.n(s),
                c = o(36661),
                r = o.n(c),
                a = o(60846),
                d = o(66900),
                _ = o(2687),
                u = o(15648),
                m = o(81418),
                C = o(62454);
            l.Z = e => {
                let {
                    className: l,
                    collection: o
                } = e, {
                    exchangeRate: s
                } = (0, u.Z)(), c = ((null == o ? void 0 : o.floor_price_per) / 1e8).toFixed(8), p = (null == o ? void 0 : o.floor_price_per) / 1e8 * (null == o ? void 0 : o.total_supply) * s, v = parseInt(p.toString(), 10).toLocaleString(), x = (null == o ? void 0 : o.minted_percent) * 100, h = encodeURIComponent(null == o ? void 0 : o.ticker), {
                    isMobile: k
                } = (0, C.Z)(), w = {
                    volume_hour: (o.volume_hour / 1e8).toFixed(8),
                    volume_six_hour: (o.volume_six_hour / 1e8).toFixed(8),
                    volume_day: (o.volume_day / 1e8).toFixed(8),
                    volume_week: (o.volume_week / 1e8).toFixed(8),
                    volume_month: (o.volume_month / 1e8).toFixed(8),
                    volume_all_time: (o.volume_month / 1e8).toFixed(8),
                    ChangeWeekDesc: (0, i.jsx)(_.Z, {
                        className: r().percentage,
                        value: null == o ? void 0 : o.change_week
                    }),
                    FloorAsc: c,
                    FloorDesc: c,
                    OwnersDesc: o.owners
                }[e.selectedKey];
                return (0, i.jsx)(t.default, {
                    className: r().link,
                    href: "/brc20/".concat(h),
                    children: (0, i.jsxs)("div", {
                        className: n()({
                            [null == e ? void 0 : e.className]: !!l
                        }, r().row),
                        children: [(0, i.jsx)("div", {
                            className: n()(r().inscription, r().column),
                            children: (0, i.jsx)(d.Z, {
                                className: r().card,
                                collection: o
                            })
                        }), (0, i.jsxs)("div", {
                            className: n()(r().column, r().priceColumn),
                            children: [(0, i.jsx)("div", {
                                className: n()(r().floorLabel, r().mobileOnly, "text-sm", "regular"),
                                children: e.selectedTitle
                            }), (0, i.jsx)("div", {
                                className: r().listed,
                                children: k ? w : "$".concat(v)
                            })]
                        }), (0, i.jsx)("div", {
                            className: n()(r().column, r().hideMobile),
                            children: (0, i.jsx)(_.Z, {
                                className: r().percentage,
                                value: null == o ? void 0 : o.change_week
                            })
                        }), (0, i.jsx)("div", {
                            className: n()(r().column, r().priceColumn, r().hideMobile),
                            children: (0, i.jsx)(a.Z, {
                                className: n()(r().price, "text-sm"),
                                children: (o[e.selectedKey || "volume_week"] / 1e8).toFixed(8)
                            })
                        }), (0, i.jsx)("div", {
                            className: n()(r().column, r().hideMobile, r().hideTablet),
                            children: (0, i.jsxs)("div", {
                                className: r().listed,
                                children: [null == o ? void 0 : o.owners, x < 100 && (0, i.jsx)(m.Z, {
                                    progress: x
                                })]
                            })
                        })]
                    })
                })
            }
        },
        81418: function(e, l, o) {
            "use strict";
            var i = o(9268);
            o(86006);
            var t = o(95221),
                s = o.n(t);
            l.Z = e => (0, i.jsx)("div", {
                className: s().root,
                children: (0, i.jsx)("div", {
                    className: s().progress,
                    style: {
                        width: "".concat(e.progress, "%")
                    }
                })
            })
        },
        97961: function(e, l, o) {
            "use strict";

            function i(e) {
                return e >= .01 ? e.toFixed(2) : e > 1e-4 ? e.toFixed(4) : e > 1e-6 ? e.toFixed(6) : Math.round(1e8 * e) / 1e8
            }
            o.d(l, {
                Z: function() {
                    return i
                }
            })
        },
        29788: function(e) {
            e.exports = {
                root: "Feed_root__Jx92s",
                loading: "Feed_loading__n6Lvw",
                grid: "Feed_grid__x6_M_",
                table: "Feed_table__qTill"
            }
        },
        57279: function(e) {
            e.exports = {
                root: "CollectionCardSmall_root__EXgF_",
                icon: "CollectionCardSmall_icon__OJtqs",
                body: "CollectionCardSmall_body__SU4F_",
                title: "CollectionCardSmall_title__dsd96",
                subtitle: "CollectionCardSmall_subtitle__tpmIK",
                number: "CollectionCardSmall_number__5_4z1",
                description: "CollectionCardSmall_description__5h20X"
            }
        },
        49456: function(e) {
            e.exports = {
                root: "CollectionCard_root__NhAWh",
                imageWrapper: "CollectionCard_imageWrapper__HZ0tW",
                image: "CollectionCard_image__rY5Bk",
                body: "CollectionCard_body__EWvUr",
                fileType: "CollectionCard_fileType__zUybO",
                title: "CollectionCard_title__vfiYY",
                description: "CollectionCard_description__PaXt0",
                punks: "CollectionCard_punks__lAk8c",
                detailsContainer: "CollectionCard_detailsContainer__3zi9y",
                gradientBox: "CollectionCard_gradientBox__TVkcK",
                sponsored: "CollectionCard_sponsored__sp6R9",
                supplyContainer: "CollectionCard_supplyContainer__tS99F",
                inscriptionContainer: "CollectionCard_inscriptionContainer__Qm_Bt",
                supply: "CollectionCard_supply__4mnYz",
                inscritions: "CollectionCard_inscritions__kYA4e"
            }
        },
        36661: function(e) {
            e.exports = {
                link: "HomeCollectionRow_link__WHt8C",
                row: "HomeCollectionRow_row__x66zC",
                column: "HomeCollectionRow_column__9i3jo",
                priceColumn: "HomeCollectionRow_priceColumn__x9KAm",
                price: "HomeCollectionRow_price__AnRC8",
                inscription: "HomeCollectionRow_inscription__pbgQE",
                lastSoldColumn: "HomeCollectionRow_lastSoldColumn__zhY5_",
                lastSold: "HomeCollectionRow_lastSold__NFphL",
                icon: "HomeCollectionRow_icon__88sQp",
                button: "HomeCollectionRow_button__ZOFSx",
                owner: "HomeCollectionRow_owner__Nzz2v",
                address: "HomeCollectionRow_address__QMpI7",
                item: "HomeCollectionRow_item__noX2s",
                card: "HomeCollectionRow_card__LOwt0",
                listed: "HomeCollectionRow_listed__k_56Y",
                text: "HomeCollectionRow_text__lDezp",
                percentage: "HomeCollectionRow_percentage__u2qIs",
                floorLabel: "HomeCollectionRow_floorLabel__WcAvG",
                mobileOnly: "HomeCollectionRow_mobileOnly__ljI5M",
                hideTablet: "HomeCollectionRow_hideTablet__FfN5W",
                hideMobile: "HomeCollectionRow_hideMobile__wXZaF"
            }
        },
        95221: function(e) {
            e.exports = {
                root: "ProgressBar_root__dxwzC",
                progress: "ProgressBar_progress__p3fMg"
            }
        }
    }
]);