(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [2553], {
        69159: function() {},
        18971: function() {},
        52361: function() {},
        94616: function() {},
        64744: function(t, e, s) {
            "use strict";
            s.d(e, {
                Ao: function() {
                    return _
                },
                Au: function() {
                    return d
                },
                CD: function() {
                    return N
                },
                Di: function() {
                    return x
                },
                Gh: function() {
                    return E
                },
                I9: function() {
                    return f
                },
                Ie: function() {
                    return n
                },
                It: function() {
                    return w
                },
                KL: function() {
                    return W
                },
                KS: function() {
                    return p
                },
                L4: function() {
                    return c
                },
                Mf: function() {
                    return v
                },
                Mq: function() {
                    return o
                },
                NO: function() {
                    return C
                },
                T5: function() {
                    return a
                },
                X_: function() {
                    return K
                },
                cv: function() {
                    return O
                },
                dE: function() {
                    return y
                },
                eR: function() {
                    return g
                },
                hE: function() {
                    return u
                },
                iV: function() {
                    return I
                },
                lS: function() {
                    return r
                },
                mW: function() {
                    return T
                },
                nB: function() {
                    return l
                },
                oh: function() {
                    return A
                },
                rN: function() {
                    return k
                },
                rc: function() {
                    return B
                },
                rt: function() {
                    return h
                },
                sc: function() {
                    return Z
                },
                t6: function() {
                    return P
                },
                ty: function() {
                    return i
                },
                v0: function() {
                    return b
                },
                x4: function() {
                    return M
                },
                yY: function() {
                    return m
                },
                zw: function() {
                    return S
                }
            });
            let n = "https://ordinalswallet.com",
                a = "https://turbo.ordinalswallet.com",
                r = "https://mint.ordinalswallet.com",
                i = "https://twetch.com",
                o = "https://cdn.ordinalswallet.com",
                c = "".concat(o, "/inscription/content"),
                l = "".concat(o, "/inscription/preview"),
                u = "https://discord.gg/ordinalswallet",
                d = "https://mempool.space",
                m = "https://buy.moonpay.com?apiKey=pk_live_MXqk7kNvNuPCPGrnboQzEHXCbPr3hUS&currencyCode=btc",
                g = "https://media.ordinalswallet.com",
                f = "v2/collections",
                w = "v2/search",
                p = "ordinals_wallet::encrypted_seed",
                h = "ordinals_wallet::encrypted_seed_salt",
                y = "ordinals_wallet::last_active_at",
                b = "ordinals_wallet::public_key",
                v = "ordinals_wallet::taproot_address",
                P = "ordinals_wallet::ack_wallet_warning",
                x = "ordinals_wallet::did_register",
                I = "ordinals_wallet::wallet_type",
                S = "ordinals_wallet::xverse_payment_address",
                T = "ordinals_wallet::xverse_taproot_public_key",
                Z = "ordinals_wallet::floating_menu",
                _ = "ordinals_wallet::profile",
                B = "ordinals_wallet::quit-password-modal",
                E = 736,
                k = 1073,
                A = 1280,
                M = "h7G763S0UwEsKtHOjqF892RXGg",
                O = "drH1nv5wIVP8j1ZYSb9usg",
                W = "https://brc20api.bestinslot.xyz/v1",
                C = "https://bestinslot.xyz",
                K = ["bitcoin-rocks", "rare-scrilla-sounds", "ordinal-diamonds", "ordinal-rabbits", "bible-ordinals", "squiggs", "ordinal-tortoises", "the-fiat-collection", "btc-machines", "h17n-text", "bureaucrats", "sharkies"],
                N = ["sat-names", "unisat-names", "xbt-names", "btc-names", "gm-names", "gua-names", "meta-names", "ow-names", "pepe-names", "mllt-names", "ord-names", "magic-names"]
        },
        11553: function(t, e, s) {
            "use strict";
            s.d(e, {
                Z: function() {
                    return a
                }
            });
            var n = s(5762);
            let a = new class {
                emit(t, e) {
                    this.eventEmitter.emit(t, e)
                }
                listen(t, e) {
                    this.eventEmitter.on(t, e)
                }
                removeListener(t, e) {
                    this.eventEmitter.removeListener(t, e)
                }
                constructor() {
                    this.eventEmitter = new n.Z
                }
            }
        },
        35290: function(t, e, s) {
            "use strict";
            s.d(e, {
                Z: function() {
                    return a
                },
                j: function() {
                    return r
                }
            });
            let n = ["418", "425"];
            async function a(t) {
                try {
                    let e = JSON.stringify(t, Object.getOwnPropertyNames(t)),
                        s = n.some(t => e.includes(t));
                    if (s) return;
                    await fetch("https://discord.com/api/webhooks/1075597924634988614/r9yTnZPHjFNtW7HnaJopn2Pd6dIPcoLdhG4DrxPL-xB_hNLo_VbAgMySZ3PFnlKejBCH", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            content: "".concat(t.message, "\n```\n").concat(t.stack, "\n```")
                        })
                    })
                } catch (t) {
                    console.log("reportError", t)
                }
            }
            async function r(t) {
                try {
                    var e, s;
                    let n;
                    n = (null == t ? void 0 : t.message) ? "".concat(t.message, "\n```\n").concat(t.stack, "\n```") : "```".concat(JSON.stringify(t, Object.getOwnPropertyNames(t)), "```");
                    let a = (null == t ? void 0 : null === (e = t.response) || void 0 === e ? void 0 : null === (s = e.data) || void 0 === s ? void 0 : s.message) ? t.response.data.message : "Wallet error";
                    await fetch("https://discord.com/api/webhooks/1105114159718338700/7ZRFHy0UzM-GGYPqSPOBV3xmPbWMSEHHg4-YydrtCdPw4Zb-LTb4t6lrk2GS9TGSQw_C", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            content: "".concat(n, " ```").concat(a, "```")
                        })
                    })
                } catch (t) {
                    console.log("reportError", t)
                }
            }
        },
        47239: function(t, e, s) {
            "use strict";
            s.d(e, {
                Z: function() {
                    return n
                }
            });
            class n {
                static setItem(t, e, s) {
                    if (!s && localStorage.getItem(t)) throw Error("This operation would overwrite an existing seed!");
                    localStorage.setItem(t, e)
                }
                static getItem(t) {
                    return localStorage.getItem(t)
                }
                static removeItem(t) {
                    localStorage.removeItem(t)
                }
            }
        },
        35440: function(t, e) {
            "use strict";
            e.Z = t => new Promise(e => setTimeout(e, t))
        },
        67692: function(t, e, s) {
            "use strict";
            s.d(e, {
                Z: function() {
                    return h
                }
            });
            var n = s(64744),
                a = s(45406),
                r = s(61562),
                i = s(26350),
                o = s(47239),
                c = s(35440),
                l = s(35290),
                u = s(58471),
                d = s(11553),
                m = s(91083).Buffer;
            class g {
                static async login() {
                    return new Promise((t, e) => {
                        (0, u.getAddress)({
                            payload: {
                                purposes: ["ordinals", "payment"],
                                message: "Address for receiving Ordinals and payments",
                                network: {
                                    type: "Mainnet"
                                }
                            },
                            onFinish: e => {
                                o.Z.setItem(n.v0, e.addresses[1].publicKey), o.Z.setItem(n.mW, e.addresses[0].publicKey), o.Z.setItem(n.Mf, e.addresses[0].address), o.Z.setItem(n.zw, e.addresses[1].address), o.Z.setItem(n.iV, "xverse"), h.fetchProfile(), d.Z.emit("logged-in-out"), t()
                            },
                            onCancel: () => e()
                        })
                    })
                }
                static balanceAddress() {
                    return o.Z.getItem(n.zw)
                }
                static taprootPublicKey() {
                    return o.Z.getItem(n.mW)
                }
                static taprootAddress() {
                    return o.Z.getItem(n.Mf)
                }
                static async signCancel(t) {
                    let e = r.YW.fromPSBT(m.from(t, "hex")),
                        s = e.inputs.map((t, e) => e),
                        n = {
                            network: {
                                type: "Mainnet"
                            },
                            message: "Sign Transaction",
                            psbtBase64: m.from(t, "hex").toString("base64"),
                            broadcast: !1,
                            inputsToSign: [{
                                address: g.taprootAddress(),
                                signingIndexes: s,
                                sigHash: 1
                            }]
                        };
                    return await new Promise((t, e) => {
                        (0, u.signTransaction)({
                            payload: n,
                            onFinish: e => {
                                let s = r.YW.fromPSBT(m.from(e.psbtBase64, "base64"));
                                s.finalize(), t(m.from(s.extract()).toString("hex"))
                            },
                            onCancel: () => e()
                        })
                    })
                }
                static async signInscribe(t) {
                    let e = i.networks.mainnet,
                        s = i.Psbt.fromHex(t, {
                            network: e
                        }),
                        n = s.data.inputs.map((t, e) => e),
                        a = s.data.toBase64(),
                        o = {
                            network: {
                                type: "Mainnet"
                            },
                            message: "Sign Transaction",
                            psbtBase64: a,
                            broadcast: !1,
                            inputsToSign: [{
                                address: g.balanceAddress(),
                                signingIndexes: n
                            }]
                        };
                    return await new Promise((t, e) => {
                        (0, u.signTransaction)({
                            payload: o,
                            onFinish: e => {
                                let s = r.YW.fromPSBT(m.from(e.psbtBase64, "base64"));
                                s.finalize(), t(m.from(s.extract()).toString("hex"))
                            },
                            onCancel: () => e()
                        })
                    })
                }
                static async signPurchase(t, e) {
                    let s, n = r.YW.fromPSBT(m.from(t, "hex")),
                        a = n.inputs.map((t, e) => e),
                        i = {
                            network: {
                                type: "Mainnet"
                            },
                            message: "Sign Transaction",
                            psbtBase64: m.from(t, "hex").toString("base64"),
                            broadcast: !1,
                            inputsToSign: [{
                                address: g.balanceAddress(),
                                signingIndexes: a
                            }]
                        },
                        o = await new Promise((t, e) => {
                            (0, u.signTransaction)({
                                payload: i,
                                onFinish: e => {
                                    (s = r.YW.fromPSBT(m.from(e.psbtBase64, "base64"))).finalize(), t(m.from(s.extract()).toString("hex"))
                                },
                                onCancel: () => e()
                            })
                        }),
                        c = r.YW.fromPSBT(m.from(e, "hex"));
                    c.inputs[0].txid = m.from(s.id, "hex"), c.inputs[2].txid = m.from(s.id, "hex");
                    let l = {
                            network: {
                                type: "Mainnet"
                            },
                            message: "Sign Transaction",
                            psbtBase64: m.from(c.toPSBT()).toString("base64"),
                            broadcast: !1,
                            inputsToSign: [{
                                address: g.balanceAddress(),
                                signingIndexes: [0, 2]
                            }]
                        },
                        d = await new Promise((t, e) => {
                            (0, u.signTransaction)({
                                payload: l,
                                onFinish: e => {
                                    let s = r.YW.fromPSBT(m.from(e.psbtBase64, "base64"));
                                    s.finalizeIdx(0), s.finalizeIdx(2), t(m.from(s.toPSBT()).toString("hex"))
                                },
                                onCancel: () => e()
                            })
                        });
                    return {
                        signedSetup: o,
                        signedPurchase: d
                    }
                }
                static async signEscrow(t) {
                    let e = {
                        network: {
                            type: "Mainnet"
                        },
                        message: "Sign Transaction",
                        psbtBase64: m.from(t, "hex").toString("base64"),
                        broadcast: !1,
                        inputsToSign: [{
                            address: g.taprootAddress(),
                            signingIndexes: [1],
                            sigHash: 131
                        }]
                    };
                    return new Promise((t, s) => {
                        (0, u.signTransaction)({
                            payload: e,
                            onFinish: e => {
                                let s = r.YW.fromPSBT(m.from(e.psbtBase64, "base64"));
                                s.finalizeIdx(1), t(m.from(s.toPSBT()).toString("hex"))
                            },
                            onCancel: () => s()
                        })
                    })
                }
            }
            var f = s(60147);
            class w {
                static init() {
                    o.Z.setItem(n.sc, "true", !0)
                }
                static floatingMenu() {
                    if (!h.isSet()) return !1;
                    let t = localStorage.getItem(n.sc);
                    return t ? "true" === t : (o.Z.setItem(n.sc, "false"), !1)
                }
                static toggleFloatingMenu() {
                    try {
                        if (!h.isSet()) return;
                        this.floatingMenu() ? o.Z.setItem(n.sc, "false", !0) : o.Z.setItem(n.sc, "true", !0)
                    } catch (t) {
                        console.log(t)
                    }
                }
            }
            var p = s(91083).Buffer;
            class h {
                static async setProfile(t) {
                    try {
                        let e = JSON.parse(localStorage.getItem(n.Ao));
                        localStorage.setItem(n.Ao, JSON.stringify({ ...e,
                            ...t
                        })), d.Z.emit("logged-in-out")
                    } catch (t) {
                        console.log("Error setting profile", t)
                    }
                }
                static async fetchProfile() {
                    try {
                        let {
                            data: t
                        } = await a.Z.post("".concat(n.T5, "/wallet/").concat(h.getTaprootAddress(), "/profile"));
                        localStorage.setItem(n.Ao, JSON.stringify(t)), d.Z.emit("logged-in-out")
                    } catch (t) {
                        console.log("Error fetching profile", t)
                    }
                }
                static delete() {
                    h.notDefined() || (o.Z.removeItem(n.KS), o.Z.removeItem(n.rt), o.Z.removeItem(n.v0), o.Z.removeItem(n.dE), o.Z.removeItem(n.Mf), o.Z.removeItem(n.t6), o.Z.removeItem(n.sc), o.Z.removeItem(n.Di), o.Z.removeItem(n.iV), o.Z.removeItem(n.zw), o.Z.removeItem(n.mW), o.Z.removeItem(n.rc), o.Z.removeItem(n.Ao))
                }
                static isSet() {
                    return !h.notDefined() && !!o.Z.getItem(n.Mf)
                }
                static get xverse() {
                    return g
                }
                static get unisat() {
                    return f.Z
                }
                static get settings() {
                    return w
                }
                static async seed() {
                    let {
                        getSeed: t
                    } = await s.e(9364).then(s.bind(s, 29364)), e = await t();
                    for (; !e.valid;) {
                        e = await t(), await (0, c.Z)(1e3);
                        let s = JSON.parse(localStorage.getItem(n.rc));
                        if (s.quit) break
                    }
                    return e
                }
                static type() {
                    return localStorage.getItem(n.iV) || "ordinalswallet"
                }
                static async register() {
                    try {
                        if ("true" === o.Z.getItem(n.Di) || !h.isSet()) return;
                        let {
                            data: t
                        } = await a.Z.post("".concat(n.T5, "/wallet/register"), {
                            public_key: h.getPublicKey(),
                            address: h.getTaprootAddress(),
                            wallet_type: h.type()
                        });
                        t.success && (o.Z.setItem(n.Di, "true"), h.settings.init())
                    } catch (t) {
                        console.log(t)
                    }
                }
                static async signInscription(t) {
                    let e = h.type(),
                        n = "";
                    if ("ordinalswallet" === e) {
                        let e = await h.seed();
                        if (!e.valid) return;
                        let {
                            signMessage: a
                        } = await Promise.all([s.e(3907), s.e(3606)]).then(s.bind(s, 48934));
                        n = await a(e.seed, t)
                    } else if ("unisat" === e) {
                        let {
                            buildDummyPSBT: t
                        } = await Promise.all([s.e(3907), s.e(3606)]).then(s.bind(s, 48934)), e = await t(h.getPublicKey());
                        n = await h.unisat.signInscribe(e)
                    } else if ("xverse" === e) {
                        let {
                            buildDummyPSBT: e
                        } = await Promise.all([s.e(3907), s.e(3606)]).then(s.bind(s, 48934));
                        await e(h.xverse.taprootPublicKey());
                        let a = await h.getEscrow(t, 1e8 * 21e6, {});
                        n = await h.xverse.signEscrow(a)
                    }
                    return n
                }
                static async cancelEscrow(t) {
                    let e = h.type(),
                        r = "";
                    if ("ordinalswallet" === e) {
                        let e = await h.seed();
                        if (!e.valid) return;
                        let {
                            signMessage: n
                        } = await Promise.all([s.e(3907), s.e(3606)]).then(s.bind(s, 48934));
                        r = await n(e.seed, t)
                    } else if ("unisat" === e) {
                        let {
                            buildDummyPSBT: t
                        } = await Promise.all([s.e(3907), s.e(3606)]).then(s.bind(s, 48934)), e = await t(h.getPublicKey());
                        r = await h.unisat.signInscribe(e)
                    } else if ("xverse" === e) {
                        let {
                            buildDummyPSBT: e
                        } = await Promise.all([s.e(3907), s.e(3606)]).then(s.bind(s, 48934));
                        await e(h.xverse.taprootPublicKey());
                        let n = await h.getEscrow(t, 1e8 * 21e6, {});
                        r = await h.xverse.signEscrow(n)
                    }
                    await a.Z.post("".concat(n.T5, "/market/cancel-escrow"), {
                        inscription_id: t,
                        signature: r
                    })
                }
                static async getEscrow(t, e, s) {
                    let r = {
                        inscription: t,
                        from: h.getTaprootAddress(),
                        price: e,
                        force_excess_sats: null == s ? void 0 : s.forceExcessSats,
                        force_multi_inscriptions: null == s ? void 0 : s.forceMultiInscriptions,
                        dummy: ["xverse", "ordinalswallet", "unisat"].includes(h.type()),
                        public_key: h.getPublicKey(),
                        receive_address: void 0
                    };
                    "xverse" === h.type() && (r.receive_address = h.xverse.balanceAddress(), r.public_key = h.xverse.taprootPublicKey());
                    let {
                        data: i
                    } = await a.Z.post("".concat(n.T5, "/wallet/escrow"), r);
                    return i.psbt
                }
                static getMarketFee(t) {
                    try {
                        let e = r.YW.fromPSBT(p.from(t, "hex")),
                            s = e.getOutput(3);
                        return Number(null == s ? void 0 : s.amount)
                    } catch (a) {
                        let e = i.networks.mainnet,
                            s = i.Psbt.fromHex(t, {
                                network: e
                            }),
                            n = s.txOutputs[3];
                        return n.value
                    }
                }
                static getPSBTFee(t) {
                    try {
                        let e = r.YW.fromPSBT(p.from(t, "hex")),
                            s = BigInt(0),
                            n = BigInt(0);
                        e.inputs.forEach(t => {
                            s += t.witnessUtxo.amount
                        }), e.outputs.forEach(t => {
                            n += t.amount
                        });
                        let a = s - n;
                        return a
                    } catch (o) {
                        let e = i.networks.mainnet,
                            s = i.Psbt.fromHex(t, {
                                network: e
                            }),
                            n = BigInt(0),
                            a = BigInt(0);
                        s.data.inputs.forEach(t => {
                            n += BigInt(t.witnessUtxo.value)
                        }), s.txOutputs.forEach(t => {
                            a += BigInt(t.value)
                        });
                        let r = n - a;
                        return r
                    }
                }
                static async getPurchase(t) {
                    let e = {
                        inscription: t,
                        from: h.getTaprootAddress(),
                        public_key: h.getPublicKey(),
                        to: void 0,
                        is_p2sh: void 0
                    };
                    "xverse" === h.type() && (e.from = h.xverse.balanceAddress(), e.to = h.getTaprootAddress(), e.is_p2sh = !0);
                    let {
                        data: s
                    } = await a.Z.post("".concat(n.T5, "/wallet/purchase"), e), r = h.getPSBTFee(s.setup), i = h.getPSBTFee(s.purchase), o = h.getMarketFee(s.purchase);
                    return { ...s,
                        setup_fee: r,
                        purchase_fee: i,
                        market_fee: o
                    }
                }
                static async getInscribe(t, e, s) {
                    let r = new FormData;
                    r.append("file", t);
                    let i = h.getTaprootAddress(),
                        o = h.getTaprootAddress();
                    "xverse" === h.type() && (i = h.xverse.balanceAddress());
                    let c = "".concat(n.T5, "/inscribe/upload"),
                        {
                            data: l
                        } = await a.Z.post("".concat(c, "?postage=").concat(s, "&destination=").concat(o, "&fee_rate=").concat(e, "&from=").concat(i, "&public_key=").concat(h.getPublicKey()), r, {
                            headers: {
                                "Content-Type": "multipart/form-data"
                            }
                        });
                    return l.psbt
                }
                static async signMessage(t) {
                    let e = h.type();
                    if ("ordinalswallet" === e) {
                        let e = await h.seed();
                        if (!e.valid) return {
                            success: !1
                        };
                        let {
                            signMessage: n
                        } = await Promise.all([s.e(3907), s.e(3606)]).then(s.bind(s, 48934)), a = await n(e.seed, t);
                        return {
                            signature: a,
                            success: !0
                        }
                    }
                    if ("unisat" === e) {
                        let e = await h.unisat.signMessage(t);
                        return {
                            signature: e,
                            success: !0
                        }
                    }
                }
                static async signInscribe(t) {
                    let e;
                    let n = h.type();
                    if ("ordinalswallet" === n) {
                        let n = await h.seed();
                        if (!n.valid) return {
                            success: !1
                        };
                        let {
                            signRawtx: a,
                            signRawtxBitcoinjs: r
                        } = await Promise.all([s.e(3907), s.e(3606)]).then(s.bind(s, 48934));
                        e = await r(n.seed, {
                            psbt: t
                        })
                    } else "unisat" === n ? e = await h.unisat.signInscribe(t) : "xverse" === n && (e = await h.xverse.signInscribe(t));
                    return {
                        rawtx: e,
                        success: !0
                    }
                }
                static async signPurchase(t, e) {
                    let n = h.type();
                    if ("ordinalswallet" === n) {
                        let n = await h.seed();
                        if (!n.valid) return {
                            success: !1
                        };
                        let {
                            signRawtx: a,
                            signRawtxBitcoinjs: r
                        } = await Promise.all([s.e(3907), s.e(3606)]).then(s.bind(s, 48934)), i = await r(n.seed, {
                            psbt: t
                        }), o = await a(n.seed, {
                            psbt: e,
                            disableExtract: !0,
                            skipSignIndex: 1
                        });
                        return {
                            signedSetup: i,
                            signedPurchase: o,
                            success: !0
                        }
                    }
                    if ("unisat" === n) {
                        let s = await h.unisat.signPurchase(t, e);
                        return { ...s,
                            success: !0
                        }
                    }
                    if ("xverse" === n) {
                        let s = await h.xverse.signPurchase(t, e);
                        return { ...s,
                            success: !0
                        }
                    }
                }
                static async signEscrow(t) {
                    let e;
                    let n = h.type();
                    if ("ordinalswallet" === n) {
                        let n = await h.seed();
                        if (!n.valid) return {
                            success: !1
                        };
                        let {
                            microSignRawtxSingleAnyoneCanPay: a
                        } = await Promise.all([s.e(3907), s.e(3606)]).then(s.bind(s, 48934));
                        e = await a(n.seed, t)
                    } else "unisat" === n ? e = await h.unisat.signEscrow(t) : "xverse" === n && (e = await h.xverse.signEscrow(t));
                    return {
                        rawtx: e,
                        success: !0
                    }
                }
                static getPublicKey() {
                    return h.notDefined() ? "" : o.Z.getItem(n.v0)
                }
                static balanceAddress() {
                    return h.notDefined() ? "" : "xverse" === h.type() ? h.xverse.balanceAddress() : o.Z.getItem(n.Mf)
                }
                static getTaprootAddress() {
                    return h.notDefined() ? "" : o.Z.getItem(n.Mf)
                }
                static getItem(t) {
                    return h.notDefined() ? "" : o.Z.getItem(t)
                }
                static handleError(t) {
                    var e, s;
                    console.log("WALLET_ERROR", t);
                    let n = (null == t ? void 0 : null === (e = t.response) || void 0 === e ? void 0 : null === (s = e.data) || void 0 === s ? void 0 : s.message) ? t.response.data.message : "Wallet error";
                    d.Z.emit("snackbar", {
                        variant: "error",
                        title: n
                    }), (0, l.j)(t)
                }
                static setItem(t, e) {
                    h.notDefined() || o.Z.setItem(t, e)
                }
                static notDefined() {
                    return !1
                }
            }
        },
        60147: function(t, e, s) {
            "use strict";
            s.d(e, {
                Z: function() {
                    return l
                }
            });
            var n = s(64744),
                a = s(11553),
                r = s(47239),
                i = s(61562),
                o = s(67692),
                c = s(91083).Buffer;
            class l {
                static async listenForAccountChange() {
                    window.unisat && "unisat" === o.Z.type() && window.unisat.on("accountsChanged", async () => {
                        await l.login(), window.location.reload()
                    })
                }
                static async login() {
                    if (!window.unisat) throw Error("Unisat not installed");
                    let [t] = await window.unisat.requestAccounts(), e = await window.unisat.getPublicKey();
                    localStorage.setItem(n.Mf, t), localStorage.setItem(n.iV, "unisat"), localStorage.setItem(n.v0, e), a.Z.emit("logged-in-out");
                    try {
                        await o.Z.fetchProfile()
                    } catch (t) {}
                }
                static taprootAddress() {
                    return r.Z.getItem(n.Mf)
                }
                static async signMessage(t) {
                    try {
                        let e = await window.unisat.signMessage(t);
                        return e
                    } catch (t) {
                        return
                    }
                }
                static async signInscribe(t) {
                    try {
                        let e = await window.unisat.signPsbt(t),
                            s = i.YW.fromPSBT(c.from(e, "hex"));
                        return c.from(s.extract()).toString("hex")
                    } catch (t) {
                        throw console.log(t), t
                    }
                }
                static async signEscrow(t) {
                    try {
                        let e = await window.unisat.signPsbt(t),
                            s = i.YW.fromPSBT(c.from(e, "hex"));
                        return c.from(s.toPSBT()).toString("hex")
                    } catch (t) {
                        throw console.log(t), t
                    }
                }
                static async signPurchase(t, e) {
                    try {
                        let s = await window.unisat.signPsbt(t),
                            n = i.YW.fromPSBT(c.from(s, "hex")),
                            a = c.from(n.extract()).toString("hex"),
                            r = await window.unisat.signPsbt(e);
                        return {
                            signedSetup: a,
                            signedPurchase: r
                        }
                    } catch (t) {
                        return
                    }
                }
            }
        }
    }
]);