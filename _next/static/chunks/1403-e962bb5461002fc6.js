(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [1403], {
        96826: function(e, o, l) {
            "use strict";
            var i = l(9268);
            l(86006);
            var n = l(8683),
                s = l.n(n),
                t = l(73086),
                c = l.n(t),
                a = l(48138);
            o.Z = e => {
                let {
                    className: o,
                    collection: l
                } = e;
                return (0, i.jsxs)("div", {
                    className: s()({
                        [e.className]: !!o
                    }, c().root),
                    children: [(0, i.jsx)(a.Z, {
                        className: c().icon,
                        imageClassName: c().icon,
                        collection: l
                    }), (0, i.jsxs)("div", {
                        className: c().body,
                        children: [(0, i.jsx)("div", {
                            className: c().title,
                            children: null == l ? void 0 : l.name
                        }), (0, i.jsx)("div", {
                            className: c().subtitle,
                            children: (0, i.jsxs)("p", {
                                className: s()(c().description, "text-sm"),
                                children: ["#", null == l ? void 0 : l.lowest_inscription_num, "-", null == l ? void 0 : l.highest_inscription_num]
                            })
                        })]
                    })]
                })
            }
        },
        84563: function(e, o, l) {
            "use strict";
            var i = l(9268);
            l(86006);
            var n = l(8683),
                s = l.n(n),
                t = l(64085),
                c = l.n(t),
                a = l(21739),
                r = l(48138);
            o.Z = e => {
                let {
                    collection: o
                } = e;
                return (0, i.jsxs)(a.default, {
                    className: c().root,
                    href: "/collection/".concat(null == o ? void 0 : o.slug),
                    children: [(0, i.jsx)(r.Z, {
                        className: c().imageWrapper,
                        collection: o
                    }), (0, i.jsxs)("div", {
                        className: c().body,
                        children: [(0, i.jsx)("div", {
                            className: c().gradientBox,
                            children: !!(null == o ? void 0 : o.sponsored) && (0, i.jsx)("p", {
                                className: s()(c().sponsored, "text-xxs", "normal"),
                                children: "Sponsored"
                            })
                        }), (0, i.jsx)("p", {
                            className: s()(c().title, "display-xs", "semibold"),
                            children: null == o ? void 0 : o.name
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
                                    children: "Inscriptions"
                                }), (0, i.jsx)("p", {
                                    className: s()(c().description, "text-sm"),
                                    children: "#".concat(null == o ? void 0 : o.lowest_inscription_num, "-").concat(null == o ? void 0 : o.highest_inscription_num)
                                })]
                            })]
                        })]
                    })]
                })
            }
        },
        48138: function(e, o, l) {
            "use strict";
            var i = l(9268);
            l(86006);
            var n = l(97093),
                s = l.n(n),
                t = l(83946),
                c = l(8683),
                a = l.n(c),
                r = l(64744);
            o.Z = e => {
                var o, l, n;
                let {
                    name: c,
                    icon_inscription: d
                } = (null == e ? void 0 : e.collection) || {}, _ = r.X_.includes(null == e ? void 0 : null === (o = e.collection) || void 0 === o ? void 0 : o.slug) ? "/collections/".concat(null == e ? void 0 : null === (l = e.collection) || void 0 === l ? void 0 : l.slug, "/icon.png") : null == e ? void 0 : null === (n = e.collection) || void 0 === n ? void 0 : n.icon;
                return (0, i.jsx)("div", {
                    className: a()({
                        [null == e ? void 0 : e.className]: !!(null == e ? void 0 : e.className)
                    }, s().root),
                    children: (null == d ? void 0 : d.id) ? (0, i.jsx)(t.default, {
                        className: a()({
                            [null == e ? void 0 : e.inscriptionClassName]: !!(null == e ? void 0 : e.inscriptionClassName)
                        }, s().inscription),
                        inscription: {
                            id: null == d ? void 0 : d.id,
                            content_type: (null == d ? void 0 : d.content_type) || "image/png"
                        }
                    }) : (0, i.jsx)("img", {
                        className: a()({
                            [null == e ? void 0 : e.imageClassName]: !!(null == e ? void 0 : e.imageClassName),
                            [s().punks]: "Bitcoin Punks" == c
                        }, s().image),
                        src: _
                    })
                })
            }
        },
        13484: function(e, o, l) {
            "use strict";
            var i = l(9268);
            l(86006);
            var n = l(21739),
                s = l(8683),
                t = l.n(s),
                c = l(62454),
                a = l(77713),
                r = l.n(a),
                d = l(60846),
                _ = l(96826),
                u = l(2687);
            o.Z = e => {
                var o, l, s, a;
                let {
                    className: m,
                    collection: p
                } = e, {
                    isMobile: h
                } = (0, c.Z)(), v = {
                    VolumeHourDesc: (p.volume_hour / 1e8).toFixed(8),
                    VolumeSixHourDesc: (p.volume_six_hour / 1e8).toFixed(8),
                    VolumeDayDesc: (p.volume_day / 1e8).toFixed(8),
                    VolumeWeekDesc: (p.volume_week / 1e8).toFixed(8),
                    VolumeMonthDesc: (p.volume_month / 1e8).toFixed(8),
                    VolumeTotalDesc: (p.volume_all_time / 1e8).toFixed(8),
                    ChangeWeekDesc: (0, i.jsx)(u.Z, {
                        className: r().percentage,
                        value: null == p ? void 0 : p.change_week
                    }),
                    FloorAsc: ((null == p ? void 0 : p.floor_price) / 1e8).toFixed(8),
                    FloorDesc: ((null == p ? void 0 : p.floor_price) / 1e8).toFixed(8),
                    OwnersDesc: p.owners
                }[e.selectedKey];
                return (0, i.jsx)(n.default, {
                    className: r().link,
                    href: "/collection/".concat(null == e ? void 0 : null === (o = e.collection) || void 0 === o ? void 0 : o.slug),
                    children: (0, i.jsxs)("div", {
                        className: t()({
                            [null == e ? void 0 : e.className]: !!m
                        }, r().row),
                        children: [(0, i.jsx)("div", {
                            className: t()(r().inscription, r().column),
                            children: (0, i.jsx)(_.Z, {
                                className: r().card,
                                collection: null == e ? void 0 : e.collection
                            })
                        }), (0, i.jsxs)("div", {
                            className: t()(r().column, r().priceColumn),
                            children: [(0, i.jsx)("div", {
                                className: t()(r().floorLabel, r().mobileOnly, "text-sm", "regular"),
                                children: e.selectedTitle
                            }), (0, i.jsx)(d.Z, {
                                className: t()(r().price, "text-sm"),
                                iconClassName: t()({
                                    [r().hideIcon]: "Owners" == e.selectedTitle || "7D Change" == e.selectedTitle
                                }),
                                children: h ? v : ((null == e ? void 0 : null === (l = e.collection) || void 0 === l ? void 0 : l.floor_price) / 1e8).toFixed(8)
                            })]
                        }), (0, i.jsx)("div", {
                            className: t()(r().column, r().hideMobile),
                            children: (0, i.jsx)(u.Z, {
                                className: r().percentage,
                                value: null == e ? void 0 : null === (s = e.collection) || void 0 === s ? void 0 : s.change_week
                            })
                        }), (0, i.jsx)("div", {
                            className: t()(r().column, r().priceColumn, r().hideMobile),
                            children: (0, i.jsx)(d.Z, {
                                className: t()(r().price, "text-sm"),
                                children: v
                            })
                        }), (0, i.jsx)("div", {
                            className: t()(r().column, r().hideMobile, r().hideTablet),
                            children: (0, i.jsx)("div", {
                                className: r().listed,
                                children: null == e ? void 0 : null === (a = e.collection) || void 0 === a ? void 0 : a.owners
                            })
                        })]
                    })
                })
            }
        },
        66531: function(e, o, l) {
            "use strict";
            l.d(o, {
                Z: function() {
                    return g
                }
            });
            var i = l(9268),
                n = l(86006),
                s = e => (0, i.jsxs)("svg", {
                    onClick: e.onClick,
                    viewBox: "0 0 20 20",
                    fill: "none",
                    className: e.className,
                    width: e.width,
                    height: e.height,
                    children: [(0, i.jsx)("path", {
                        d: "M7.99988 1H0.999878V8H7.99988V1Z",
                        stroke: "white",
                        strokeWidth: "2",
                        strokeLinecap: "round",
                        strokeLinejoin: "round"
                    }), (0, i.jsx)("path", {
                        d: "M18.9999 1H11.9999V8H18.9999V1Z",
                        stroke: "white",
                        strokeWidth: "2",
                        strokeLinecap: "round",
                        strokeLinejoin: "round"
                    }), (0, i.jsx)("path", {
                        d: "M18.9999 12H11.9999V19H18.9999V12Z",
                        stroke: "white",
                        strokeWidth: "2",
                        strokeLinecap: "round",
                        strokeLinejoin: "round"
                    }), (0, i.jsx)("path", {
                        d: "M7.99988 12H0.999878V19H7.99988V12Z",
                        stroke: "white",
                        strokeWidth: "2",
                        strokeLinecap: "round",
                        strokeLinejoin: "round"
                    })]
                }),
                t = e => (0, i.jsx)("svg", {
                    onClick: e.onClick,
                    viewBox: "0 0 20 14",
                    fill: "none",
                    className: e.className,
                    width: e.width,
                    height: e.height,
                    children: (0, i.jsx)("path", {
                        d: "M5.99988 1H18.9999M5.99988 7H18.9999M5.99988 13H18.9999M0.999878 1H1.00988M0.999878 7H1.00988M0.999878 13H1.00988",
                        stroke: "white",
                        strokeWidth: "2",
                        strokeLinecap: "round",
                        strokeLinejoin: "round"
                    })
                }),
                c = l(93131),
                a = l.n(c),
                r = l(8683),
                d = l.n(r),
                _ = l(31124),
                u = l(19761),
                m = l.n(u),
                p = l(36943),
                h = l(2516),
                v = l(79715),
                C = l(14446),
                x = l(59244),
                N = l(98546);
            let w = (0, h.Z)({
                components: {
                    MuiPaper: {
                        defaultProps: {
                            sx: {
                                marginTop: "8px",
                                background: "transparent",
                                backgroundColor: "transparent",
                                borderRadius: "8px"
                            }
                        }
                    },
                    MuiSelect: {
                        styleOverrides: {
                            select: {
                                paddingLeft: "8px !important",
                                paddingRight: "4px !important"
                            }
                        }
                    },
                    MuiMenu: {
                        styleOverrides: {
                            list: {
                                background: "#30343c",
                                paddingTop: "0px",
                                paddingBottom: "0px",
                                borderRadius: "8px"
                            }
                        },
                        defaultProps: {
                            sx: {
                                paddingBottom: "0"
                            }
                        }
                    }
                }
            });
            var b = e => {
                    let {
                        selected: o,
                        options: l,
                        onSelect: s
                    } = e, [t, c] = n.useState(!1), a = n.useCallback(() => c(!0), []), r = n.useCallback(() => c(!1), []), _ = n.useCallback(() => c(e => !e), []), u = n.useCallback((e, l) => {
                        let {
                            title: n,
                            id: s,
                            onClick: t
                        } = e, c = s === o;
                        return (0, i.jsx)(v.Z, {
                            selected: c,
                            className: d()(m().menuItem, {
                                [m().selectedItem]: c
                            }),
                            value: s,
                            onClick: t,
                            children: n
                        }, l)
                    }, [o]), h = n.useCallback(e => {
                        s && s(e)
                    }, [s]);
                    return (0, i.jsx)("div", {
                        className: m().root,
                        children: (0, i.jsx)(C.Z, {
                            theme: w,
                            children: (0, i.jsx)(x.Z, {
                                children: (0, i.jsx)(N.Z, {
                                    open: t,
                                    className: m().menu,
                                    value: o,
                                    onChange: h,
                                    IconComponent: () => (0, i.jsx)(p.Z, {
                                        onClick: _,
                                        className: d()({
                                            [m().openArrow]: t
                                        }, m().arrow)
                                    }),
                                    onOpen: a,
                                    onClose: r,
                                    children: l.map(u)
                                })
                            })
                        })
                    })
                },
                j = l(10654),
                g = e => {
                    let {
                        title: o,
                        mobileTitle: l,
                        tabs: c,
                        selectedOption: r,
                        options: u,
                        hideViewSelector: m,
                        gridView: p,
                        setGridView: h,
                        divider: v
                    } = e, C = n.useCallback(() => h && h(!0), [h]), x = n.useCallback(() => h && h(!1), [h]);
                    return (0, i.jsxs)("div", {
                        className: d()({
                            [e.className]: !!e.className,
                            [a().withTabs]: !!c,
                            [a().noTitle]: !o
                        }, a().root),
                        children: [(0, i.jsxs)("div", {
                            className: a().headerLeft,
                            children: [o && (0, i.jsx)("div", {
                                className: d()({
                                    [a().mobileTitle]: !!l
                                }, {
                                    [a().titleWithTabs]: !!c
                                }, a().title),
                                children: o
                            }), c && (0, i.jsx)(_.Z, {
                                className: a().tabs,
                                tabs: c
                            })]
                        }), (0, i.jsxs)("div", {
                            className: d()(a().dropdownSection, {
                                [a().dropdownNoSelector]: !!m
                            }),
                            children: [void 0 !== e.search && (0, i.jsx)(j.Z, {
                                className: d()(a().searchInput, "text-sm", "medium"),
                                inputClassName: d()(a().input, "text-sm", "medium"),
                                value: e.search,
                                onChange: o => e.setSearch(o.target.value),
                                placeholder: "Search"
                            }), u && u.length > 0 && (0, i.jsx)("div", {
                                className: a().dropdownOptions,
                                children: (0, i.jsx)(b, {
                                    selected: r,
                                    options: u
                                })
                            })]
                        }), e.children, (0, i.jsxs)("div", {
                            className: a().layoutSection,
                            children: [e.label && (0, i.jsx)("div", {
                                className: a().mobileLabel,
                                children: e.label
                            }), !m && (0, i.jsxs)("div", {
                                className: a().icons,
                                children: [(0, i.jsx)(t, {
                                    width: 18,
                                    onClick: x,
                                    className: d()({
                                        [a().selected]: !p
                                    }, a().icon)
                                }), (0, i.jsx)(s, {
                                    width: 18,
                                    className: d()({
                                        [a().selected]: p
                                    }, a().icon),
                                    onClick: C
                                })]
                            })]
                        }), v && (0, i.jsx)("div", {
                            className: a().line
                        })]
                    })
                }
        },
        56514: function(e, o, l) {
            "use strict";
            var i = l(9268),
                n = l(86006),
                s = l(8683),
                t = l.n(s),
                c = l(22586),
                a = l.n(c),
                r = l(94606);
            o.Z = e => {
                let {
                    columns: o,
                    headerClassName: l,
                    columnClassName: s
                } = e, c = n.useCallback((o, l) => {
                    let {
                        label: n
                    } = o;
                    return (0, i.jsx)("div", {
                        className: t()({
                            [e.columnClassName]: !!s
                        }, a().columnHead),
                        children: n
                    }, l)
                }, [s]);
                return (0, i.jsxs)("div", {
                    className: t()({
                        [null == e ? void 0 : e.className]: !!e.className
                    }, a().root),
                    children: [(0, i.jsx)("div", {
                        className: t()({
                            [e.headerClassName]: !!l
                        }, a()["columns-".concat(o.length)], a().head),
                        children: o.map(c)
                    }), (null == e ? void 0 : e.isLoading) ? (0, i.jsx)(r.Z, {}) : e.children]
                })
            }
        },
        2687: function(e, o, l) {
            "use strict";
            var i = l(9268),
                n = l(8683),
                s = l.n(n);
            l(86006);
            var t = l(35474),
                c = l.n(t);
            o.Z = e => {
                let {
                    value: o,
                    className: l
                } = e;
                return (0, i.jsxs)("div", {
                    className: s()({
                        [e.className]: !!l
                    }, {
                        [c().negative]: o < 0
                    }, {
                        [c().positive]: o > 0
                    }),
                    children: [o > 0 && "+", (null == o ? void 0 : o.toFixed(2)) || 0, "%"]
                })
            }
        },
        60846: function(e, o, l) {
            "use strict";
            var i = l(9268);
            l(86006);
            var n = l(5115),
                s = l(65816),
                t = l.n(s),
                c = l(8683),
                a = l.n(c);
            o.Z = e => {
                let {
                    className: o,
                    iconClassName: l
                } = e;
                return (0, i.jsxs)("div", {
                    className: a()({
                        [e.className]: !!o
                    }, t().root),
                    children: [(0, i.jsx)(n.Z, {
                        className: a()({
                            [e.iconClassName]: !!l
                        }, t().icon)
                    }), e.children]
                })
            }
        },
        73086: function(e) {
            e.exports = {
                root: "CollectionCardSmall_root__D1ju0",
                icon: "CollectionCardSmall_icon__MMdSv",
                body: "CollectionCardSmall_body__p8bBQ",
                title: "CollectionCardSmall_title__KAqE2",
                subtitle: "CollectionCardSmall_subtitle__bQcha",
                number: "CollectionCardSmall_number__KzFvN",
                description: "CollectionCardSmall_description__FUFmL"
            }
        },
        64085: function(e) {
            e.exports = {
                root: "CollectionCard_root____tGE",
                imageWrapper: "CollectionCard_imageWrapper__QODEP",
                image: "CollectionCard_image__nOQzZ",
                body: "CollectionCard_body__Dfl5B",
                fileType: "CollectionCard_fileType__mRkio",
                title: "CollectionCard_title__ZrJbh",
                description: "CollectionCard_description__v1bCp",
                punks: "CollectionCard_punks__tGfHE",
                detailsContainer: "CollectionCard_detailsContainer__BhkIM",
                gradientBox: "CollectionCard_gradientBox__fXXRX",
                sponsored: "CollectionCard_sponsored__tEwwy",
                supplyContainer: "CollectionCard_supplyContainer__NZ0lg",
                inscriptionContainer: "CollectionCard_inscriptionContainer__e7WIp",
                supply: "CollectionCard_supply__sNbh9",
                inscritions: "CollectionCard_inscritions__ErET2"
            }
        },
        97093: function(e) {
            e.exports = {
                root: "CollectionIcon_root__lfNOr",
                punks: "CollectionIcon_punks__abn9B",
                image: "CollectionIcon_image__tB9Kk",
                inscription: "CollectionIcon_inscription__8GqLH"
            }
        },
        77713: function(e) {
            e.exports = {
                link: "CollectionRow_link__JYzGX",
                row: "CollectionRow_row__xVxuF",
                hideIcon: "CollectionRow_hideIcon__BwTXV",
                column: "CollectionRow_column__JAVvH",
                priceColumn: "CollectionRow_priceColumn__uuFTT",
                price: "CollectionRow_price__s7Ssu",
                inscription: "CollectionRow_inscription__BnvVC",
                lastSoldColumn: "CollectionRow_lastSoldColumn__k099Y",
                lastSold: "CollectionRow_lastSold__1shYz",
                icon: "CollectionRow_icon__6v5Y2",
                button: "CollectionRow_button__c9HvG",
                owner: "CollectionRow_owner__oUFiI",
                address: "CollectionRow_address__41gOo",
                item: "CollectionRow_item__wXM6M",
                card: "CollectionRow_card__m7H9W",
                listed: "CollectionRow_listed__2Jvn7",
                text: "CollectionRow_text__IZ9R1",
                percentage: "CollectionRow_percentage__3AxBY",
                floorLabel: "CollectionRow_floorLabel__Wj9fh",
                mobileOnly: "CollectionRow_mobileOnly__Af68f",
                hideTablet: "CollectionRow_hideTablet__GzRq1",
                hideMobile: "CollectionRow_hideMobile__GYYZo"
            }
        },
        19761: function(e) {
            e.exports = {
                root: "DropdownSelect_root__69Vq_",
                arrow: "DropdownSelect_arrow__vng99",
                openArrow: "DropdownSelect_openArrow__HNm8T",
                menu: "DropdownSelect_menu__LoCKI",
                menuItem: "DropdownSelect_menuItem__NPvpn",
                selectedItem: "DropdownSelect_selectedItem__KdNlz"
            }
        },
        93131: function(e) {
            e.exports = {
                root: "FeedHeader_root__BqDS2",
                noTitle: "FeedHeader_noTitle__iSyXr",
                headerLeft: "FeedHeader_headerLeft__tRhzw",
                title: "FeedHeader_title__uA_4h",
                searchInput: "FeedHeader_searchInput__gx65b",
                input: "FeedHeader_input__a3lhA",
                dropdownSection: "FeedHeader_dropdownSection__yjS_e",
                dropdownNoSelector: "FeedHeader_dropdownNoSelector__ryp_T",
                dropdownWithTabs: "FeedHeader_dropdownWithTabs__Tx8dv",
                dropdownOptions: "FeedHeader_dropdownOptions__3Vzuj",
                icons: "FeedHeader_icons__vpft2",
                icon: "FeedHeader_icon__0QR0t",
                selected: "FeedHeader_selected__W5ywF",
                line: "FeedHeader_line__HVMp4",
                mobileLabel: "FeedHeader_mobileLabel__WBySX",
                layoutContainer: "FeedHeader_layoutContainer__DH1rt",
                titleWithTabs: "FeedHeader_titleWithTabs__Tkz6_",
                mobileTitle: "FeedHeader_mobileTitle__4WZf2",
                layoutSection: "FeedHeader_layoutSection__nGsRZ"
            }
        },
        22586: function(e) {
            e.exports = {
                root: "ItemTable_root__IcUqY",
                head: "ItemTable_head__uqCiC",
                "columns-1": "ItemTable_columns-1__FckSS",
                "columns-2": "ItemTable_columns-2__qaaaL",
                "columns-3": "ItemTable_columns-3__cQZ3k",
                "columns-4": "ItemTable_columns-4__biGw2",
                "columns-5": "ItemTable_columns-5__VoENu",
                "columns-6": "ItemTable_columns-6__uspR_",
                columnHead: "ItemTable_columnHead___Gnb4"
            }
        },
        35474: function(e) {
            e.exports = {
                root: "PercentChange_root__Ctdav",
                negative: "PercentChange_negative__qKfr1",
                positive: "PercentChange_positive__3_g9b"
            }
        },
        65816: function(e) {
            e.exports = {
                root: "TablePricePreview_root__NyVh7",
                icon: "TablePricePreview_icon__Z76DE"
            }
        }
    }
]);