if (typeof dw == "undefined") {
    var dw = {};
}
if (typeof dw.__dwAnalyticsLoaded == "undefined") {
    dw.__dwAnalyticsLoaded = true;
    dw.__dwAnalytics = function() {
        var K = 2000;
        var B, F = {},
            D = document,
            C = navigator,
            H = screen,
            L = window,
            I = L.location.hostname;

        function M(N) {
            return typeof N !== "undefined";
        }

        function J(V, j) {
            var O = V + "?" || "?",
                e, Y = D.title,
                l = "0",
                m, S = {
                    pdf: ["pdf", "application/pdf", "0"],
                    quicktime: ["qt", "video/quicktime", "0"],
                    realplayer: ["realp", "audio/x-pn-realaudio-plugin", "0"],
                    wma: ["wma", "application/x-mplayer2", "0"],
                    director: ["dir", "application/x-director", "0"],
                    flash: ["fla", "application/x-shockwave-flash", "0"],
                    java: ["java", "application/x-java-vm", "0"],
                    gears: ["gears", "application/x-googlegears", "0"],
                    silverlight: ["ag", "application/x-silverlight", "0"]
                },
                b = false,
                c = L.encodeURIComponent || escape,
                P = L.decodeURIComponent || unescape,
                f = {};

            function d(t, q, o, s, p, r) {
                var n;
                if (o) {
                    n = new Date();
                    n.setTime(n.getTime() + o * 86400000);
                }
                D.cookie = t + "=" + c(q) + (o ? ";expires=" + n.toGMTString() : "") + ";path=" + (s ? s : "/") + (p ? ";domain=" + p : "") + (r ? ";secure" : "");
            }

            function k(p) {
                var n = new RegExp("(^|;)[ ]*" + p + "=([^;]*)"),
                    o = n.exec(D.cookie);
                return o ? P(o[2]) : 0;
            }

            function N(n) {
                dw.__timeoutCallback = function() {
                    for (var o = 0; o < n.length; o++) {
                        var p = new Image(1, 1);
                        p.onLoad = function() {};
                        p.src = n[o];
                    }
                };
                setTimeout("dw.__timeoutCallback()", 100);
            }

            function Z() {
                var n, o;
                if (typeof C.javaEnabled !== "undefined" && C.javaEnabled()) {
                    S.java[2] = "1";
                }
                if (typeof L.GearsFactory === "function") {
                    S.gears[2] = "1";
                }
                if (C.mimeTypes && C.mimeTypes.length) {
                    for (n in S) {
                        o = C.mimeTypes[S[n][1]];
                        if (o && o.enabledPlugin) {
                            S[n][2] = "1";
                        }
                    }
                }
            }

            function R() {
                var n = "";
                try {
                    n = top.document.referrer;
                } catch (p) {
                    if (parent) {
                        try {
                            n = parent.document.referrer;
                        } catch (o) {
                            n = "";
                        }
                    }
                }
                if (n === "") {
                    n = D.referrer;
                }
                return n;
            }

            function X() {
                var n = "_pk_testcookie";
                if (!M(C.cookieEnabled)) {
                    d(n, "1");
                    return k(n) == "1" ? "1" : "0";
                }
                return C.cookieEnabled ? "1" : "0";
            }

            function a(n, t, r) {
                var u = Math.random();
                var p = h(n, t, r, u);
                if (t != null && t.debugEnabled) {
                    var s = "";
                    for (var o = 0; o < p.length; o++) {
                        s += p[o][0] + '"=' + p[o][1] + '"\n';
                    }
                    alert(s);
                }
                var q = Q(n, O, p, u);
                N(q);
            }
            m = R();
            l = X();
            Z();
            try {
                A();
            } catch (U) {}
            return {
                trackPageView: function(n) {
                    a(null, null, n);
                },
                trackPageViewWithProducts: function(n, p, o) {
                    a(n, p, o);
                }
            };

            function T(n, p) {
                var o = p.charAt(p.length - 1) == "?" ? "" : "&";
                return p + o + n[0] + "=" + n[1];
            }

            function g(n) {
                return n[0].length + n[1].length + 2;
            }

            function h(n, r, q, s) {
                var p = [
                    ["url", c(M(e) ? e : D.location.href)],
                    ["res", H.width + "x" + H.height],
                    ["cookie", l],
                    ["ref", c(m)],
                    ["title", c(M(q) && q != null ? q : Y)]
                ];
                for (var o in S) {
                    p.push([S[o][0], S[o][2]]);
                }
                if (n != null && n.dwEnabled) {
                    p.push(["dwac", s]);
                    p.push(["cmpn", n.sourceCode]);
                    p.push(["tz", n.timeZone]);
                    n.category = dw.ac._category;
                    if (dw.ac._searchData) {
                        n.searchData = dw.ac._searchData;
                    }
                    W(n, r, p);
                }
                return p;
            }

            function W(v, n, u) {
                u.push(["pcc", v.siteCurrency]);
                u.push(["pct", v.customer]);
                u.push(["pcat", v.category]);
                if (v.searchData) {
                    if (v.searchData.q) {
                        u.push(["pst-q", v.searchData.q]);
                    }
                    if (v.searchData.searchID) {
                        u.push(["pst-id", v.searchData.searchID]);
                    }
                    if (v.searchData.refs) {
                        u.push(["pst-refs", v.searchData.refs]);
                    }
                    if (v.searchData.sort) {
                        u.push(["pst-sort", v.searchData.sort]);
                    }
                    if (undefined != v.searchData.persd) {
                        u.push(["pst-pers", v.searchData.persd]);
                    }
                    if (v.searchData.imageUUID) {
                        u.push(["pst-img", v.searchData.imageUUID]);
                    }
                    if (v.searchData.suggestedSearchText) {
                        u.push(["pst-sug", v.searchData.suggestedSearchText]);
                    }
                    if (v.searchData.locale) {
                        u.push(["pst-loc", v.searchData.locale]);
                    }
                    if (v.searchData.queryLocale) {
                        u.push(["pst-qloc", v.searchData.queryLocale]);
                    }
                    if (undefined != v.searchData.showProducts) {
                        u.push(["pst-show", v.searchData.showProducts]);
                    }
                }
                var t = n.productImpressions.getEntries();
                var r = n.productRecommendations.getEntries();
                var o = n.productViews.getEntries();
                var w = 0;
                for (var s = 0; s < t.length; s++) {
                    u.push([("pid-" + w), t[s].value.id]);
                    u.push([("pev-" + w), "event3"]);
                    w++;
                }
                for (var q = 0; q < r.length; q++) {
                    u.push([("pid-" + w), r[q].value.id]);
                    u.push([("pev-" + w), "event3"]);
                    u.push([("evr4-" + w), "Yes"]);
                    w++;
                }
                for (var p = 0; p < o.length; p++) {
                    u.push([("pid-" + w), o[p].value.id]);
                    u.push([("pev-" + w), "event4"]);
                    w++;
                }
            }

            function Q(t, s, r, o) {
                var v = [];
                var p = s;
                for (var q = 0; q < r.length; q++) {
                    var u = (r[q][0].slice(0, "pid-".length) == "pid-") && (g(r[q]) + ((q + 1) < r.length ? g(r[q + 1]) : 0) + ((q + 2) < r.length ? g(r[q + 2]) : 0) + p.length > K);
                    var w = (r[q][0].slice(0, "pid-".length) != "pid-") && (g(r[q]) + p.length > K);
                    if (u || w) {
                        v.push(p);
                        p = T(["dwac", o], s);
                        if (t != null && t.dwEnabled) {
                            p = T(["cmpn", t.sourceCode], p);
                            p = T(["tz", t.timeZone], p);
                            p = T(["pcc", t.siteCurrency], p);
                            p = T(["pct", t.customer], p);
                            p = T(["pcat", t.category], p);
                            if (t.searchData) {
                                if (t.searchData.q) {
                                    T(["pst-q", t.searchData.q], p);
                                }
                                if (t.searchData.searchID) {
                                    T(["pst-id", t.searchData.searchID], p);
                                }
                                if (t.searchData.refs) {
                                    T(["pst-refs", JSON.stringify(t.searchData.refs)], p);
                                }
                                if (t.searchData.sort) {
                                    T(["pst-sort", JSON.stringify(t.searchData.sort)], p);
                                }
                                if (undefined != t.searchData.persd) {
                                    T(["pst-pers", t.searchData.persd], p);
                                }
                                if (t.searchData.imageUUID) {
                                    T(["pst-img", t.searchData.imageUUID], p);
                                }
                                if (t.searchData.suggestedSearchText) {
                                    T(["pst-sug", t.searchData.suggestedSearchText], p);
                                }
                                if (t.searchData.locale) {
                                    T(["pst-loc", t.searchData.locale], p);
                                }
                                if (t.searchData.queryLocale) {
                                    T(["pst-qloc", t.searchData.queryLocale], p);
                                }
                                if (undefined != t.searchData.showProducts) {
                                    T(["pst-show", t.searchData.showProducts], p);
                                }
                            }
                        }
                    }
                    p = T(r[q], p);
                }
                var n = k("dw_dnt");
                if (n === 0 || n === "" || n === null || n === false) {} else {
                    p = T(["dw_dnt", n], p);
                }
                v.push(p);
                return v;
            }
        }

        function E(O) {
            var N = G(O);
            if (N) {
                document.cookie = O + "=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
            }
            return N;
        }

        function G(N) {
            return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(N).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1").replace(/\+/g, "%20")) || null;
        }

        function A() {
            if (dw.ac) {
                dw.ac._anact = E("__anact");
                if (dw.ac._anact_nohit_tag || dw.ac._anact) {
                    var R = dw.ac._anact_nohit_tag ? dw.ac._anact_nohit_tag : dw.ac._anact;
                    var O = JSON.parse(R);
                    if (O) {
                        var Q = Array.isArray(O) ? O[0] : O;
                        if (Q && "viewSearch" == Q.activityType && Q.parameters) {
                            var S = Q.parameters;
                            var N = {};
                            N.q = S.searchText;
                            N.suggestedSearchText = S.suggestedSearchText;
                            N.persd = S.personalized;
                            N.refs = S.refinements;
                            N.sort = S.sorting_rule;
                            N.imageUUID = S.image_uuid;
                            N.showProducts = S.showProducts;
                            N.searchID = S.searchID;
                            N.locale = S.locale;
                            N.queryLocale = S.queryLocale;
                            dw.ac.applyContext({
                                searchData: N
                            });
                            var P = S.products;
                            if (P && Array.isArray(P)) {
                                for (i = 0; i < P.length; i++) {
                                    if (P[i]) {
                                        dw.ac._capture({
                                            id: P[i].id,
                                            type: dw.ac.EV_PRD_SEARCHHIT
                                        });
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return {
            getTracker: function(N) {
                return new J(N);
            }
        };
    }();
}