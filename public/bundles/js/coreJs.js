/*
 03110235
*/


! function (e, t) {
    var n, r, i = typeof t,
        o = e.document,
        a = e.location,
        s = e.jQuery,
        l = e.$,
        u = {},
        c = [],
        d = "1.9.1",
        p = c.concat,
        f = c.push,
        h = c.slice,
        g = c.indexOf,
        m = u.toString,
        y = u.hasOwnProperty,
        v = d.trim,
        b = function (e, t) {
            return new b.fn.init(e, t, r)
        },
        x = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        w = /\S+/g,
        C = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        T = /^(?:(<[\w\W]+>)[^>]*|#([\w-]*))$/,
        k = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        S = /^[\],:{}\s]*$/,
        N = /(?:^|:|,)(?:\s*\[)+/g,
        E = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
        A = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g,
        _ = /^-ms-/,
        j = /-([\da-z])/gi,
        L = function (e, t) {
            return t.toUpperCase()
        },
        $ = function (e) {
            (o.addEventListener || "load" === e.type || "complete" === o.readyState) && (D(), b.ready())
        },
        D = function () {
            o.addEventListener ? (o.removeEventListener("DOMContentLoaded", $, !1), e.removeEventListener("load", $, !1)) : (o.detachEvent("onreadystatechange", $), e.detachEvent("onload", $))
        };

    function H(e) {
        var t = e.length,
            n = b.type(e);
        return !b.isWindow(e) && (!(1 !== e.nodeType || !t) || ("array" === n || "function" !== n && (0 === t || "number" == typeof t && t > 0 && t - 1 in e)))
    }
    b.fn = b.prototype = {
        jquery: d,
        constructor: b,
        init: function (e, n, r) {
            var i, a;
            if (!e) return this;
            if ("string" == typeof e) {
                if (!(i = "<" === e.charAt(0) && ">" === e.charAt(e.length - 1) && e.length >= 3 ? [null, e, null] : T.exec(e)) || !i[1] && n) return !n || n.jquery ? (n || r).find(e) : this.constructor(n).find(e);
                if (i[1]) {
                    if (n = n instanceof b ? n[0] : n, b.merge(this, b.parseHTML(i[1], n && n.nodeType ? n.ownerDocument || n : o, !0)), k.test(i[1]) && b.isPlainObject(n))
                        for (i in n) b.isFunction(this[i]) ? this[i](n[i]) : this.attr(i, n[i]);
                    return this
                }
                if ((a = o.getElementById(i[2])) && a.parentNode) {
                    if (a.id !== i[2]) return r.find(e);
                    this.length = 1, this[0] = a
                }
                return this.context = o, this.selector = e, this
            }
            return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : b.isFunction(e) ? r.ready(e) : (e.selector !== t && (this.selector = e.selector, this.context = e.context), b.makeArray(e, this))
        },
        selector: "",
        length: 0,
        size: function () {
            return this.length
        },
        toArray: function () {
            return h.call(this)
        },
        get: function (e) {
            return null == e ? this.toArray() : e < 0 ? this[this.length + e] : this[e]
        },
        pushStack: function (e) {
            var t = b.merge(this.constructor(), e);
            return t.prevObject = this, t.context = this.context, t
        },
        each: function (e, t) {
            return b.each(this, e, t)
        },
        ready: function (e) {
            return b.ready.promise().done(e), this
        },
        slice: function () {
            return this.pushStack(h.apply(this, arguments))
        },
        first: function () {
            return this.eq(0)
        },
        last: function () {
            return this.eq(-1)
        },
        eq: function (e) {
            var t = this.length,
                n = +e + (e < 0 ? t : 0);
            return this.pushStack(n >= 0 && n < t ? [this[n]] : [])
        },
        map: function (e) {
            return this.pushStack(b.map(this, function (t, n) {
                return e.call(t, n, t)
            }))
        },
        end: function () {
            return this.prevObject || this.constructor(null)
        },
        push: f,
        sort: [].sort,
        splice: [].splice
    }, b.fn.init.prototype = b.fn, b.extend = b.fn.extend = function () {
        var e, n, r, i, o, a, s = arguments[0] || {},
            l = 1,
            u = arguments.length,
            c = !1;
        for ("boolean" == typeof s && (c = s, s = arguments[1] || {}, l = 2), "object" == typeof s || b.isFunction(s) || (s = {}), u === l && (s = this, --l); l < u; l++)
            if (null != (o = arguments[l]))
                for (i in o) e = s[i], s !== (r = o[i]) && (c && r && (b.isPlainObject(r) || (n = b.isArray(r))) ? (n ? (n = !1, a = e && b.isArray(e) ? e : []) : a = e && b.isPlainObject(e) ? e : {}, s[i] = b.extend(c, a, r)) : r !== t && (s[i] = r));
        return s
    }, b.extend({
        noConflict: function (t) {
            return e.$ === b && (e.$ = l), t && e.jQuery === b && (e.jQuery = s), b
        },
        isReady: !1,
        readyWait: 1,
        holdReady: function (e) {
            e ? b.readyWait++ : b.ready(!0)
        },
        ready: function (e) {
            if (!0 === e ? !--b.readyWait : !b.isReady) {
                if (!o.body) return setTimeout(b.ready);
                b.isReady = !0, !0 !== e && --b.readyWait > 0 || (n.resolveWith(o, [b]), b.fn.trigger && b(o).trigger("ready").off("ready"))
            }
        },
        isFunction: function (e) {
            return "function" === b.type(e)
        },
        isArray: Array.isArray || function (e) {
            return "array" === b.type(e)
        },
        isWindow: function (e) {
            return null != e && e == e.window
        },
        isNumeric: function (e) {
            return !isNaN(parseFloat(e)) && isFinite(e)
        },
        type: function (e) {
            return null == e ? String(e) : "object" == typeof e || "function" == typeof e ? u[m.call(e)] || "object" : typeof e
        },
        isPlainObject: function (e) {
            if (!e || "object" !== b.type(e) || e.nodeType || b.isWindow(e)) return !1;
            try {
                if (e.constructor && !y.call(e, "constructor") && !y.call(e.constructor.prototype, "isPrototypeOf")) return !1
            } catch (e) {
                return !1
            }
            var n;
            for (n in e);
            return n === t || y.call(e, n)
        },
        isEmptyObject: function (e) {
            var t;
            for (t in e) return !1;
            return !0
        },
        error: function (e) {
            throw new Error(e)
        },
        parseHTML: function (e, t, n) {
            if (!e || "string" != typeof e) return null;
            "boolean" == typeof t && (n = t, t = !1), t = t || o;
            var r = k.exec(e),
                i = !n && [];
            return r ? [t.createElement(r[1])] : (r = b.buildFragment([e], t, i), i && b(i).remove(), b.merge([], r.childNodes))
        },
        parseJSON: function (t) {
            return e.JSON && e.JSON.parse ? e.JSON.parse(t) : null === t ? t : "string" == typeof t && (t = b.trim(t)) && S.test(t.replace(E, "@").replace(A, "]").replace(N, "")) ? new Function("return " + t)() : void b.error("Invalid JSON: " + t)
        },
        parseXML: function (n) {
            var r, i;
            if (!n || "string" != typeof n) return null;
            try {
                e.DOMParser ? (i = new DOMParser, r = i.parseFromString(n, "text/xml")) : ((r = new ActiveXObject("Microsoft.XMLDOM")).async = "false", r.loadXML(n))
            } catch (e) {
                r = t
            }
            return r && r.documentElement && !r.getElementsByTagName("parsererror").length || b.error("Invalid XML: " + n), r
        },
        noop: function () {},
        globalEval: function (t) {
            t && b.trim(t) && (e.execScript || function (t) {
                e.eval.call(e, t)
            })(t)
        },
        camelCase: function (e) {
            return e.replace(_, "ms-").replace(j, L)
        },
        nodeName: function (e, t) {
            return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
        },
        each: function (e, t, n) {
            var r = 0,
                i = e.length,
                o = H(e);
            if (n) {
                if (o)
                    for (; r < i && !1 !== t.apply(e[r], n); r++);
                else
                    for (r in e)
                        if (!1 === t.apply(e[r], n)) break
            } else if (o)
                for (; r < i && !1 !== t.call(e[r], r, e[r]); r++);
            else
                for (r in e)
                    if (!1 === t.call(e[r], r, e[r])) break;
            return e
        },
        trim: v && !v.call("\ufeff ") ? function (e) {
            return null == e ? "" : v.call(e)
        } : function (e) {
            return null == e ? "" : (e + "").replace(C, "")
        },
        makeArray: function (e, t) {
            var n = t || [];
            return null != e && (H(Object(e)) ? b.merge(n, "string" == typeof e ? [e] : e) : f.call(n, e)), n
        },
        inArray: function (e, t, n) {
            var r;
            if (t) {
                if (g) return g.call(t, e, n);
                for (r = t.length, n = n ? n < 0 ? Math.max(0, r + n) : n : 0; n < r; n++)
                    if (n in t && t[n] === e) return n
            }
            return -1
        },
        merge: function (e, n) {
            var r = n.length,
                i = e.length,
                o = 0;
            if ("number" == typeof r)
                for (; o < r; o++) e[i++] = n[o];
            else
                for (; n[o] !== t;) e[i++] = n[o++];
            return e.length = i, e
        },
        grep: function (e, t, n) {
            var r = [],
                i = 0,
                o = e.length;
            for (n = !!n; i < o; i++) n !== !!t(e[i], i) && r.push(e[i]);
            return r
        },
        map: function (e, t, n) {
            var r, i = 0,
                o = e.length,
                a = [];
            if (H(e))
                for (; i < o; i++) null != (r = t(e[i], i, n)) && (a[a.length] = r);
            else
                for (i in e) null != (r = t(e[i], i, n)) && (a[a.length] = r);
            return p.apply([], a)
        },
        guid: 1,
        proxy: function (e, n) {
            var r, i, o;
            return "string" == typeof n && (o = e[n], n = e, e = o), b.isFunction(e) ? (r = h.call(arguments, 2), (i = function () {
                return e.apply(n || this, r.concat(h.call(arguments)))
            }).guid = e.guid = e.guid || b.guid++, i) : t
        },
        access: function (e, n, r, i, o, a, s) {
            var l = 0,
                u = e.length,
                c = null == r;
            if ("object" === b.type(r))
                for (l in o = !0, r) b.access(e, n, l, r[l], !0, a, s);
            else if (i !== t && (o = !0, b.isFunction(i) || (s = !0), c && (s ? (n.call(e, i), n = null) : (c = n, n = function (e, t, n) {
                    return c.call(b(e), n)
                })), n))
                for (; l < u; l++) n(e[l], r, s ? i : i.call(e[l], l, n(e[l], r)));
            return o ? e : c ? n.call(e) : u ? n(e[0], r) : a
        },
        now: function () {
            return (new Date).getTime()
        }
    }), b.ready.promise = function (t) {
        if (!n)
            if (n = b.Deferred(), "complete" === o.readyState) setTimeout(b.ready);
            else if (o.addEventListener) o.addEventListener("DOMContentLoaded", $, !1), e.addEventListener("load", $, !1);
        else {
            o.attachEvent("onreadystatechange", $), e.attachEvent("onload", $);
            var r = !1;
            try {
                r = null == e.frameElement && o.documentElement
            } catch (e) {}
            r && r.doScroll && function e() {
                if (!b.isReady) {
                    try {
                        r.doScroll("left")
                    } catch (t) {
                        return setTimeout(e, 50)
                    }
                    D(), b.ready()
                }
            }()
        }
        return n.promise(t)
    }, b.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (e, t) {
        u["[object " + t + "]"] = t.toLowerCase()
    }), r = b(o);
    var I = {};
    b.Callbacks = function (e) {
        var n, r, i, o, a, s, l, u, c = [],
            d = !(e = "string" == typeof e ? I[e] || (r = I[n = e] = {}, b.each(n.match(w) || [], function (e, t) {
                r[t] = !0
            }), r) : b.extend({}, e)).once && [],
            p = function (t) {
                for (o = e.memory && t, a = !0, l = u || 0, u = 0, s = c.length, i = !0; c && l < s; l++)
                    if (!1 === c[l].apply(t[0], t[1]) && e.stopOnFalse) {
                        o = !1;
                        break
                    }
                i = !1, c && (d ? d.length && p(d.shift()) : o ? c = [] : f.disable())
            },
            f = {
                add: function () {
                    if (c) {
                        var t = c.length;
                        ! function t(n) {
                            b.each(n, function (n, r) {
                                var i = b.type(r);
                                "function" === i ? e.unique && f.has(r) || c.push(r) : r && r.length && "string" !== i && t(r)
                            })
                        }(arguments), i ? s = c.length : o && (u = t, p(o))
                    }
                    return this
                },
                remove: function () {
                    return c && b.each(arguments, function (e, t) {
                        for (var n;
                            (n = b.inArray(t, c, n)) > -1;) c.splice(n, 1), i && (n <= s && s--, n <= l && l--)
                    }), this
                },
                has: function (e) {
                    return e ? b.inArray(e, c) > -1 : !(!c || !c.length)
                },
                empty: function () {
                    return c = [], this
                },
                disable: function () {
                    return c = d = o = t, this
                },
                disabled: function () {
                    return !c
                },
                lock: function () {
                    return d = t, o || f.disable(), this
                },
                locked: function () {
                    return !d
                },
                fireWith: function (e, t) {
                    return t = [e, (t = t || []).slice ? t.slice() : t], !c || a && !d || (i ? d.push(t) : p(t)), this
                },
                fire: function () {
                    return f.fireWith(this, arguments), this
                },
                fired: function () {
                    return !!a
                }
            };
        return f
    }, b.extend({
        Deferred: function (e) {
            var t = [
                    ["resolve", "done", b.Callbacks("once memory"), "resolved"],
                    ["reject", "fail", b.Callbacks("once memory"), "rejected"],
                    ["notify", "progress", b.Callbacks("memory")]
                ],
                n = "pending",
                r = {
                    state: function () {
                        return n
                    },
                    always: function () {
                        return i.done(arguments).fail(arguments), this
                    },
                    then: function () {
                        var e = arguments;
                        return b.Deferred(function (n) {
                            b.each(t, function (t, o) {
                                var a = o[0],
                                    s = b.isFunction(e[t]) && e[t];
                                i[o[1]](function () {
                                    var e = s && s.apply(this, arguments);
                                    e && b.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[a + "With"](this === r ? n.promise() : this, s ? [e] : arguments)
                                })
                            }), e = null
                        }).promise()
                    },
                    promise: function (e) {
                        return null != e ? b.extend(e, r) : r
                    }
                },
                i = {};
            return r.pipe = r.then, b.each(t, function (e, o) {
                var a = o[2],
                    s = o[3];
                r[o[1]] = a.add, s && a.add(function () {
                    n = s
                }, t[1 ^ e][2].disable, t[2][2].lock), i[o[0]] = function () {
                    return i[o[0] + "With"](this === i ? r : this, arguments), this
                }, i[o[0] + "With"] = a.fireWith
            }), r.promise(i), e && e.call(i, i), i
        },
        when: function (e) {
            var t, n, r, i = 0,
                o = h.call(arguments),
                a = o.length,
                s = 1 !== a || e && b.isFunction(e.promise) ? a : 0,
                l = 1 === s ? e : b.Deferred(),
                u = function (e, n, r) {
                    return function (i) {
                        n[e] = this, r[e] = arguments.length > 1 ? h.call(arguments) : i, r === t ? l.notifyWith(n, r) : --s || l.resolveWith(n, r)
                    }
                };
            if (a > 1)
                for (t = new Array(a), n = new Array(a), r = new Array(a); i < a; i++) o[i] && b.isFunction(o[i].promise) ? o[i].promise().done(u(i, r, o)).fail(l.reject).progress(u(i, n, t)) : --s;
            return s || l.resolveWith(r, o), l.promise()
        }
    }), b.support = function () {
        var t, n, r, a, s, l, u, c, d, p, f = o.createElement("div");
        if (f.setAttribute("className", "t"), f.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", n = f.getElementsByTagName("*"), r = f.getElementsByTagName("a")[0], !n || !r || !n.length) return {};
        u = (s = o.createElement("select")).appendChild(o.createElement("option")), a = f.getElementsByTagName("input")[0], r.style.cssText = "top:1px;float:left;opacity:.5", t = {
            getSetAttribute: "t" !== f.className,
            leadingWhitespace: 3 === f.firstChild.nodeType,
            tbody: !f.getElementsByTagName("tbody").length,
            htmlSerialize: !!f.getElementsByTagName("link").length,
            style: /top/.test(r.getAttribute("style")),
            hrefNormalized: "/a" === r.getAttribute("href"),
            opacity: /^0.5/.test(r.style.opacity),
            cssFloat: !!r.style.cssFloat,
            checkOn: !!a.value,
            optSelected: u.selected,
            enctype: !!o.createElement("form").enctype,
            html5Clone: "<:nav></:nav>" !== o.createElement("nav").cloneNode(!0).outerHTML,
            boxModel: "CSS1Compat" === o.compatMode,
            deleteExpando: !0,
            noCloneEvent: !0,
            inlineBlockNeedsLayout: !1,
            shrinkWrapBlocks: !1,
            reliableMarginRight: !0,
            boxSizingReliable: !0,
            pixelPosition: !1
        }, a.checked = !0, t.noCloneChecked = a.cloneNode(!0).checked, s.disabled = !0, t.optDisabled = !u.disabled;
        try {
            delete f.test
        } catch (e) {
            t.deleteExpando = !1
        }
        for (p in (a = o.createElement("input")).setAttribute("value", ""), t.input = "" === a.getAttribute("value"), a.value = "t", a.setAttribute("type", "radio"), t.radioValue = "t" === a.value, a.setAttribute("checked", "t"), a.setAttribute("name", "t"), (l = o.createDocumentFragment()).appendChild(a), t.appendChecked = a.checked, t.checkClone = l.cloneNode(!0).cloneNode(!0).lastChild.checked, f.attachEvent && (f.attachEvent("onclick", function () {
                t.noCloneEvent = !1
            }), f.cloneNode(!0).click()), {
                submit: !0,
                change: !0,
                focusin: !0
            }) f.setAttribute(c = "on" + p, "t"), t[p + "Bubbles"] = c in e || !1 === f.attributes[c].expando;
        return f.style.backgroundClip = "content-box", f.cloneNode(!0).style.backgroundClip = "", t.clearCloneStyle = "content-box" === f.style.backgroundClip, b(function () {
            var n, r, a, s = "padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;",
                l = o.getElementsByTagName("body")[0];
            l && ((n = o.createElement("div")).style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px", l.appendChild(n).appendChild(f), f.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", (a = f.getElementsByTagName("td"))[0].style.cssText = "padding:0;margin:0;border:0;display:none", d = 0 === a[0].offsetHeight, a[0].style.display = "", a[1].style.display = "none", t.reliableHiddenOffsets = d && 0 === a[0].offsetHeight, f.innerHTML = "", f.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;", t.boxSizing = 4 === f.offsetWidth, t.doesNotIncludeMarginInBodyOffset = 1 !== l.offsetTop, e.getComputedStyle && (t.pixelPosition = "1%" !== (e.getComputedStyle(f, null) || {}).top, t.boxSizingReliable = "4px" === (e.getComputedStyle(f, null) || {
                width: "4px"
            }).width, (r = f.appendChild(o.createElement("div"))).style.cssText = f.style.cssText = s, r.style.marginRight = r.style.width = "0", f.style.width = "1px", t.reliableMarginRight = !parseFloat((e.getComputedStyle(r, null) || {}).marginRight)), typeof f.style.zoom !== i && (f.innerHTML = "", f.style.cssText = s + "width:1px;padding:1px;display:inline;zoom:1", t.inlineBlockNeedsLayout = 3 === f.offsetWidth, f.style.display = "block", f.innerHTML = "<div></div>", f.firstChild.style.width = "5px", t.shrinkWrapBlocks = 3 !== f.offsetWidth, t.inlineBlockNeedsLayout && (l.style.zoom = 1)), l.removeChild(n), n = f = a = r = null)
        }), n = s = l = u = r = a = null, t
    }();
    var P = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
        O = /([A-Z])/g;

    function q(e, n, r, i) {
        if (b.acceptData(e)) {
            var o, a, s = b.expando,
                l = "string" == typeof n,
                u = e.nodeType,
                d = u ? b.cache : e,
                p = u ? e[s] : e[s] && s;
            if (p && d[p] && (i || d[p].data) || !l || r !== t) return p || (u ? e[s] = p = c.pop() || b.guid++ : p = s), d[p] || (d[p] = {}, u || (d[p].toJSON = b.noop)), "object" != typeof n && "function" != typeof n || (i ? d[p] = b.extend(d[p], n) : d[p].data = b.extend(d[p].data, n)), o = d[p], i || (o.data || (o.data = {}), o = o.data), r !== t && (o[b.camelCase(n)] = r), l ? null == (a = o[n]) && (a = o[b.camelCase(n)]) : a = o, a
        }
    }

    function B(e, t, n) {
        if (b.acceptData(e)) {
            var r, i, o, a = e.nodeType,
                s = a ? b.cache : e,
                l = a ? e[b.expando] : b.expando;
            if (s[l]) {
                if (t && (o = n ? s[l] : s[l].data)) {
                    for ((r = 0, i = (t = b.isArray(t) ? t.concat(b.map(t, b.camelCase)) : t in o ? [t] : (t = b.camelCase(t)) in o ? [t] : t.split(" ")).length); r < i; r++) delete o[t[r]];
                    if (!(n ? F : b.isEmptyObject)(o)) return
                }(n || (delete s[l].data, F(s[l]))) && (a ? b.cleanData([e], !0) : b.support.deleteExpando || s != s.window ? delete s[l] : s[l] = null)
            }
        }
    }

    function M(e, n, r) {
        if (r === t && 1 === e.nodeType) {
            var i = "data-" + n.replace(O, "-$1").toLowerCase();
            if ("string" == typeof (r = e.getAttribute(i))) {
                try {
                    r = "true" === r || "false" !== r && ("null" === r ? null : +r + "" === r ? +r : P.test(r) ? b.parseJSON(r) : r)
                } catch (e) {}
                b.data(e, n, r)
            } else r = t
        }
        return r
    }

    function F(e) {
        var t;
        for (t in e)
            if (("data" !== t || !b.isEmptyObject(e[t])) && "toJSON" !== t) return !1;
        return !0
    }
    b.extend({
        cache: {},
        expando: "jQuery" + (d + Math.random()).replace(/\D/g, ""),
        noData: {
            embed: !0,
            object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
            applet: !0
        },
        hasData: function (e) {
            return !!(e = e.nodeType ? b.cache[e[b.expando]] : e[b.expando]) && !F(e)
        },
        data: function (e, t, n) {
            return q(e, t, n)
        },
        removeData: function (e, t) {
            return B(e, t)
        },
        _data: function (e, t, n) {
            return q(e, t, n, !0)
        },
        _removeData: function (e, t) {
            return B(e, t, !0)
        },
        acceptData: function (e) {
            if (e.nodeType && 1 !== e.nodeType && 9 !== e.nodeType) return !1;
            var t = e.nodeName && b.noData[e.nodeName.toLowerCase()];
            return !t || !0 !== t && e.getAttribute("classid") === t
        }
    }), b.fn.extend({
        data: function (e, n) {
            var r, i, o = this[0],
                a = 0,
                s = null;
            if (e === t) {
                if (this.length && (s = b.data(o), 1 === o.nodeType && !b._data(o, "parsedAttrs"))) {
                    for (r = o.attributes; a < r.length; a++)(i = r[a].name).indexOf("data-") || (i = b.camelCase(i.slice(5)), M(o, i, s[i]));
                    b._data(o, "parsedAttrs", !0)
                }
                return s
            }
            return "object" == typeof e ? this.each(function () {
                b.data(this, e)
            }) : b.access(this, function (n) {
                if (n === t) return o ? M(o, e, b.data(o, e)) : null;
                this.each(function () {
                    b.data(this, e, n)
                })
            }, null, n, arguments.length > 1, null, !0)
        },
        removeData: function (e) {
            return this.each(function () {
                b.removeData(this, e)
            })
        }
    }), b.extend({
        queue: function (e, t, n) {
            var r;
            if (e) return t = (t || "fx") + "queue", r = b._data(e, t), n && (!r || b.isArray(n) ? r = b._data(e, t, b.makeArray(n)) : r.push(n)), r || []
        },
        dequeue: function (e, t) {
            t = t || "fx";
            var n = b.queue(e, t),
                r = n.length,
                i = n.shift(),
                o = b._queueHooks(e, t);
            "inprogress" === i && (i = n.shift(), r--), o.cur = i, i && ("fx" === t && n.unshift("inprogress"), delete o.stop, i.call(e, function () {
                b.dequeue(e, t)
            }, o)), !r && o && o.empty.fire()
        },
        _queueHooks: function (e, t) {
            var n = t + "queueHooks";
            return b._data(e, n) || b._data(e, n, {
                empty: b.Callbacks("once memory").add(function () {
                    b._removeData(e, t + "queue"), b._removeData(e, n)
                })
            })
        }
    }), b.fn.extend({
        queue: function (e, n) {
            var r = 2;
            return "string" != typeof e && (n = e, e = "fx", r--), arguments.length < r ? b.queue(this[0], e) : n === t ? this : this.each(function () {
                var t = b.queue(this, e, n);
                b._queueHooks(this, e), "fx" === e && "inprogress" !== t[0] && b.dequeue(this, e)
            })
        },
        dequeue: function (e) {
            return this.each(function () {
                b.dequeue(this, e)
            })
        },
        delay: function (e, t) {
            return e = b.fx && b.fx.speeds[e] || e, t = t || "fx", this.queue(t, function (t, n) {
                var r = setTimeout(t, e);
                n.stop = function () {
                    clearTimeout(r)
                }
            })
        },
        clearQueue: function (e) {
            return this.queue(e || "fx", [])
        },
        promise: function (e, n) {
            var r, i = 1,
                o = b.Deferred(),
                a = this,
                s = this.length,
                l = function () {
                    --i || o.resolveWith(a, [a])
                };
            for ("string" != typeof e && (n = e, e = t), e = e || "fx"; s--;)(r = b._data(a[s], e + "queueHooks")) && r.empty && (i++, r.empty.add(l));
            return l(), o.promise(n)
        }
    });
    var R, W, z = /[\t\r\n]/g,
        U = /\r/g,
        X = /^(?:input|select|textarea|button|object)$/i,
        Q = /^(?:a|area)$/i,
        Y = /^(?:checked|selected|autofocus|autoplay|async|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped)$/i,
        K = /^(?:checked|selected)$/i,
        J = b.support.getSetAttribute,
        Z = b.support.input;
    b.fn.extend({
        attr: function (e, t) {
            return b.access(this, b.attr, e, t, arguments.length > 1)
        },
        removeAttr: function (e) {
            return this.each(function () {
                b.removeAttr(this, e)
            })
        },
        prop: function (e, t) {
            return b.access(this, b.prop, e, t, arguments.length > 1)
        },
        removeProp: function (e) {
            return e = b.propFix[e] || e, this.each(function () {
                try {
                    this[e] = t, delete this[e]
                } catch (e) {}
            })
        },
        addClass: function (e) {
            var t, n, r, i, o, a = 0,
                s = this.length,
                l = "string" == typeof e && e;
            if (b.isFunction(e)) return this.each(function (t) {
                b(this).addClass(e.call(this, t, this.className))
            });
            if (l)
                for (t = (e || "").match(w) || []; a < s; a++)
                    if (r = 1 === (n = this[a]).nodeType && (n.className ? (" " + n.className + " ").replace(z, " ") : " ")) {
                        for (o = 0; i = t[o++];) r.indexOf(" " + i + " ") < 0 && (r += i + " ");
                        n.className = b.trim(r)
                    }
            return this
        },
        removeClass: function (e) {
            var t, n, r, i, o, a = 0,
                s = this.length,
                l = 0 === arguments.length || "string" == typeof e && e;
            if (b.isFunction(e)) return this.each(function (t) {
                b(this).removeClass(e.call(this, t, this.className))
            });
            if (l)
                for (t = (e || "").match(w) || []; a < s; a++)
                    if (r = 1 === (n = this[a]).nodeType && (n.className ? (" " + n.className + " ").replace(z, " ") : "")) {
                        for (o = 0; i = t[o++];)
                            for (; r.indexOf(" " + i + " ") >= 0;) r = r.replace(" " + i + " ", " ");
                        n.className = e ? b.trim(r) : ""
                    }
            return this
        },
        toggleClass: function (e, t) {
            var n = typeof e,
                r = "boolean" == typeof t;
            return b.isFunction(e) ? this.each(function (n) {
                b(this).toggleClass(e.call(this, n, this.className, t), t)
            }) : this.each(function () {
                if ("string" === n)
                    for (var o, a = 0, s = b(this), l = t, u = e.match(w) || []; o = u[a++];) s[(l = r ? l : !s.hasClass(o)) ? "addClass" : "removeClass"](o);
                else n !== i && "boolean" !== n || (this.className && b._data(this, "__className__", this.className), this.className = this.className || !1 === e ? "" : b._data(this, "__className__") || "")
            })
        },
        hasClass: function (e) {
            for (var t = " " + e + " ", n = 0, r = this.length; n < r; n++)
                if (1 === this[n].nodeType && (" " + this[n].className + " ").replace(z, " ").indexOf(t) >= 0) return !0;
            return !1
        },
        val: function (e) {
            var n, r, i, o = this[0];
            return arguments.length ? (i = b.isFunction(e), this.each(function (n) {
                var o, a = b(this);
                1 === this.nodeType && (null == (o = i ? e.call(this, n, a.val()) : e) ? o = "" : "number" == typeof o ? o += "" : b.isArray(o) && (o = b.map(o, function (e) {
                    return null == e ? "" : e + ""
                })), (r = b.valHooks[this.type] || b.valHooks[this.nodeName.toLowerCase()]) && "set" in r && r.set(this, o, "value") !== t || (this.value = o))
            })) : o ? (r = b.valHooks[o.type] || b.valHooks[o.nodeName.toLowerCase()]) && "get" in r && (n = r.get(o, "value")) !== t ? n : "string" == typeof (n = o.value) ? n.replace(U, "") : null == n ? "" : n : void 0
        }
    }), b.extend({
        valHooks: {
            option: {
                get: function (e) {
                    var t = e.attributes.value;
                    return !t || t.specified ? e.value : e.text
                }
            },
            select: {
                get: function (e) {
                    for (var t, n, r = e.options, i = e.selectedIndex, o = "select-one" === e.type || i < 0, a = o ? null : [], s = o ? i + 1 : r.length, l = i < 0 ? s : o ? i : 0; l < s; l++)
                        if (((n = r[l]).selected || l === i) && (b.support.optDisabled ? !n.disabled : null === n.getAttribute("disabled")) && (!n.parentNode.disabled || !b.nodeName(n.parentNode, "optgroup"))) {
                            if (t = b(n).val(), o) return t;
                            a.push(t)
                        }
                    return a
                },
                set: function (e, t) {
                    var n = b.makeArray(t);
                    return b(e).find("option").each(function () {
                        this.selected = b.inArray(b(this).val(), n) >= 0
                    }), n.length || (e.selectedIndex = -1), n
                }
            }
        },
        attr: function (e, n, r) {
            var o, a, s, l = e.nodeType;
            if (e && 3 !== l && 8 !== l && 2 !== l) return typeof e.getAttribute === i ? b.prop(e, n, r) : ((a = 1 !== l || !b.isXMLDoc(e)) && (n = n.toLowerCase(), o = b.attrHooks[n] || (Y.test(n) ? W : R)), r === t ? o && a && "get" in o && null !== (s = o.get(e, n)) ? s : (typeof e.getAttribute !== i && (s = e.getAttribute(n)), null == s ? t : s) : null !== r ? o && a && "set" in o && (s = o.set(e, r, n)) !== t ? s : (e.setAttribute(n, r + ""), r) : void b.removeAttr(e, n))
        },
        removeAttr: function (e, t) {
            var n, r, i = 0,
                o = t && t.match(w);
            if (o && 1 === e.nodeType)
                for (; n = o[i++];) r = b.propFix[n] || n, Y.test(n) ? !J && K.test(n) ? e[b.camelCase("default-" + n)] = e[r] = !1 : e[r] = !1 : b.attr(e, n, ""), e.removeAttribute(J ? n : r)
        },
        attrHooks: {
            type: {
                set: function (e, t) {
                    if (!b.support.radioValue && "radio" === t && b.nodeName(e, "input")) {
                        var n = e.value;
                        return e.setAttribute("type", t), n && (e.value = n), t
                    }
                }
            }
        },
        propFix: {
            tabindex: "tabIndex",
            readonly: "readOnly",
            for: "htmlFor",
            class: "className",
            maxlength: "maxLength",
            cellspacing: "cellSpacing",
            cellpadding: "cellPadding",
            rowspan: "rowSpan",
            colspan: "colSpan",
            usemap: "useMap",
            frameborder: "frameBorder",
            contenteditable: "contentEditable"
        },
        prop: function (e, n, r) {
            var i, o, a = e.nodeType;
            if (e && 3 !== a && 8 !== a && 2 !== a) return (1 !== a || !b.isXMLDoc(e)) && (n = b.propFix[n] || n, o = b.propHooks[n]), r !== t ? o && "set" in o && (i = o.set(e, r, n)) !== t ? i : e[n] = r : o && "get" in o && null !== (i = o.get(e, n)) ? i : e[n]
        },
        propHooks: {
            tabIndex: {
                get: function (e) {
                    var n = e.getAttributeNode("tabindex");
                    return n && n.specified ? parseInt(n.value, 10) : X.test(e.nodeName) || Q.test(e.nodeName) && e.href ? 0 : t
                }
            }
        }
    }), W = {
        get: function (e, n) {
            var r = b.prop(e, n),
                i = "boolean" == typeof r && e.getAttribute(n),
                o = "boolean" == typeof r ? Z && J ? null != i : K.test(n) ? e[b.camelCase("default-" + n)] : !!i : e.getAttributeNode(n);
            return o && !1 !== o.value ? n.toLowerCase() : t
        },
        set: function (e, t, n) {
            return !1 === t ? b.removeAttr(e, n) : Z && J || !K.test(n) ? e.setAttribute(!J && b.propFix[n] || n, n) : e[b.camelCase("default-" + n)] = e[n] = !0, n
        }
    }, Z && J || (b.attrHooks.value = {
        get: function (e, n) {
            var r = e.getAttributeNode(n);
            return b.nodeName(e, "input") ? e.defaultValue : r && r.specified ? r.value : t
        },
        set: function (e, t, n) {
            if (!b.nodeName(e, "input")) return R && R.set(e, t, n);
            e.defaultValue = t
        }
    }), J || (R = b.valHooks.button = {
        get: function (e, n) {
            var r = e.getAttributeNode(n);
            return r && ("id" === n || "name" === n || "coords" === n ? "" !== r.value : r.specified) ? r.value : t
        },
        set: function (e, n, r) {
            var i = e.getAttributeNode(r);
            return i || e.setAttributeNode(i = e.ownerDocument.createAttribute(r)), i.value = n += "", "value" === r || n === e.getAttribute(r) ? n : t
        }
    }, b.attrHooks.contenteditable = {
        get: R.get,
        set: function (e, t, n) {
            R.set(e, "" !== t && t, n)
        }
    }, b.each(["width", "height"], function (e, t) {
        b.attrHooks[t] = b.extend(b.attrHooks[t], {
            set: function (e, n) {
                if ("" === n) return e.setAttribute(t, "auto"), n
            }
        })
    })), b.support.hrefNormalized || (b.each(["href", "src", "width", "height"], function (e, n) {
        b.attrHooks[n] = b.extend(b.attrHooks[n], {
            get: function (e) {
                var r = e.getAttribute(n, 2);
                return null == r ? t : r
            }
        })
    }), b.each(["href", "src"], function (e, t) {
        b.propHooks[t] = {
            get: function (e) {
                return e.getAttribute(t, 4)
            }
        }
    })), b.support.style || (b.attrHooks.style = {
        get: function (e) {
            return e.style.cssText || t
        },
        set: function (e, t) {
            return e.style.cssText = t + ""
        }
    }), b.support.optSelected || (b.propHooks.selected = b.extend(b.propHooks.selected, {
        get: function (e) {
            var t = e.parentNode;
            return t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex), null
        }
    })), b.support.enctype || (b.propFix.enctype = "encoding"), b.support.checkOn || b.each(["radio", "checkbox"], function () {
        b.valHooks[this] = {
            get: function (e) {
                return null === e.getAttribute("value") ? "on" : e.value
            }
        }
    }), b.each(["radio", "checkbox"], function () {
        b.valHooks[this] = b.extend(b.valHooks[this], {
            set: function (e, t) {
                if (b.isArray(t)) return e.checked = b.inArray(b(e).val(), t) >= 0
            }
        })
    });
    var V = /^(?:input|select|textarea)$/i,
        G = /^key/,
        ee = /^(?:mouse|contextmenu)|click/,
        te = /^(?:focusinfocus|focusoutblur)$/,
        ne = /^([^.]*)(?:\.(.+)|)$/;

    function re() {
        return !0
    }

    function ie() {
        return !1
    }
    b.event = {
            global: {},
            add: function (e, n, r, o, a) {
                var s, l, u, c, d, p, f, h, g, m, y, v = b._data(e);
                if (v) {
                    for (r.handler && (r = (c = r).handler, a = c.selector), r.guid || (r.guid = b.guid++), (l = v.events) || (l = v.events = {}), (p = v.handle) || ((p = v.handle = function (e) {
                            return typeof b === i || e && b.event.triggered === e.type ? t : b.event.dispatch.apply(p.elem, arguments)
                        }).elem = e), u = (n = (n || "").match(w) || [""]).length; u--;) g = y = (s = ne.exec(n[u]) || [])[1], m = (s[2] || "").split(".").sort(), d = b.event.special[g] || {}, g = (a ? d.delegateType : d.bindType) || g, d = b.event.special[g] || {}, f = b.extend({
                        type: g,
                        origType: y,
                        data: o,
                        handler: r,
                        guid: r.guid,
                        selector: a,
                        needsContext: a && b.expr.match.needsContext.test(a),
                        namespace: m.join(".")
                    }, c), (h = l[g]) || ((h = l[g] = []).delegateCount = 0, d.setup && !1 !== d.setup.call(e, o, m, p) || (e.addEventListener ? e.addEventListener(g, p, !1) : e.attachEvent && e.attachEvent("on" + g, p))), d.add && (d.add.call(e, f), f.handler.guid || (f.handler.guid = r.guid)), a ? h.splice(h.delegateCount++, 0, f) : h.push(f), b.event.global[g] = !0;
                    e = null
                }
            },
            remove: function (e, t, n, r, i) {
                var o, a, s, l, u, c, d, p, f, h, g, m = b.hasData(e) && b._data(e);
                if (m && (c = m.events)) {
                    for (u = (t = (t || "").match(w) || [""]).length; u--;)
                        if (f = g = (s = ne.exec(t[u]) || [])[1], h = (s[2] || "").split(".").sort(), f) {
                            for (d = b.event.special[f] || {}, p = c[f = (r ? d.delegateType : d.bindType) || f] || [], s = s[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), l = o = p.length; o--;) a = p[o], !i && g !== a.origType || n && n.guid !== a.guid || s && !s.test(a.namespace) || r && r !== a.selector && ("**" !== r || !a.selector) || (p.splice(o, 1), a.selector && p.delegateCount--, d.remove && d.remove.call(e, a));
                            l && !p.length && (d.teardown && !1 !== d.teardown.call(e, h, m.handle) || b.removeEvent(e, f, m.handle), delete c[f])
                        } else
                            for (f in c) b.event.remove(e, f + t[u], n, r, !0);
                    b.isEmptyObject(c) && (delete m.handle, b._removeData(e, "events"))
                }
            },
            trigger: function (n, r, i, a) {
                var s, l, u, c, d, p, f, h = [i || o],
                    g = y.call(n, "type") ? n.type : n,
                    m = y.call(n, "namespace") ? n.namespace.split(".") : [];
                if (u = p = i = i || o, 3 !== i.nodeType && 8 !== i.nodeType && !te.test(g + b.event.triggered) && (g.indexOf(".") >= 0 && (g = (m = g.split(".")).shift(), m.sort()), l = g.indexOf(":") < 0 && "on" + g, (n = n[b.expando] ? n : new b.Event(g, "object" == typeof n && n)).isTrigger = !0, n.namespace = m.join("."), n.namespace_re = n.namespace ? new RegExp("(^|\\.)" + m.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, n.result = t, n.target || (n.target = i), r = null == r ? [n] : b.makeArray(r, [n]), d = b.event.special[g] || {}, a || !d.trigger || !1 !== d.trigger.apply(i, r))) {
                    if (!a && !d.noBubble && !b.isWindow(i)) {
                        for (c = d.delegateType || g, te.test(c + g) || (u = u.parentNode); u; u = u.parentNode) h.push(u), p = u;
                        p === (i.ownerDocument || o) && h.push(p.defaultView || p.parentWindow || e)
                    }
                    for (f = 0;
                        (u = h[f++]) && !n.isPropagationStopped();) n.type = f > 1 ? c : d.bindType || g, (s = (b._data(u, "events") || {})[n.type] && b._data(u, "handle")) && s.apply(u, r), (s = l && u[l]) && b.acceptData(u) && s.apply && !1 === s.apply(u, r) && n.preventDefault();
                    if (n.type = g, !a && !n.isDefaultPrevented() && (!d._default || !1 === d._default.apply(i.ownerDocument, r)) && ("click" !== g || !b.nodeName(i, "a")) && b.acceptData(i) && l && i[g] && !b.isWindow(i)) {
                        (p = i[l]) && (i[l] = null), b.event.triggered = g;
                        try {
                            i[g]()
                        } catch (e) {}
                        b.event.triggered = t, p && (i[l] = p)
                    }
                    return n.result
                }
            },
            dispatch: function (e) {
                e = b.event.fix(e);
                var n, r, i, o, a, s, l = h.call(arguments),
                    u = (b._data(this, "events") || {})[e.type] || [],
                    c = b.event.special[e.type] || {};
                if (l[0] = e, e.delegateTarget = this, !c.preDispatch || !1 !== c.preDispatch.call(this, e)) {
                    for (s = b.event.handlers.call(this, e, u), n = 0;
                        (o = s[n++]) && !e.isPropagationStopped();)
                        for (e.currentTarget = o.elem, a = 0;
                            (i = o.handlers[a++]) && !e.isImmediatePropagationStopped();) e.namespace_re && !e.namespace_re.test(i.namespace) || (e.handleObj = i, e.data = i.data, (r = ((b.event.special[i.origType] || {}).handle || i.handler).apply(o.elem, l)) !== t && !1 === (e.result = r) && (e.preventDefault(), e.stopPropagation()));
                    return c.postDispatch && c.postDispatch.call(this, e), e.result
                }
            },
            handlers: function (e, n) {
                var r, i, o, a, s = [],
                    l = n.delegateCount,
                    u = e.target;
                if (l && u.nodeType && (!e.button || "click" !== e.type))
                    for (; u != this; u = u.parentNode || this)
                        if (1 === u.nodeType && (!0 !== u.disabled || "click" !== e.type)) {
                            for (o = [], a = 0; a < l; a++) o[r = (i = n[a]).selector + " "] === t && (o[r] = i.needsContext ? b(r, this).index(u) >= 0 : b.find(r, this, null, [u]).length), o[r] && o.push(i);
                            o.length && s.push({
                                elem: u,
                                handlers: o
                            })
                        }
                return l < n.length && s.push({
                    elem: this,
                    handlers: n.slice(l)
                }), s
            },
            fix: function (e) {
                if (e[b.expando]) return e;
                var t, n, r, i = e.type,
                    a = e,
                    s = this.fixHooks[i];
                for (s || (this.fixHooks[i] = s = ee.test(i) ? this.mouseHooks : G.test(i) ? this.keyHooks : {}), r = s.props ? this.props.concat(s.props) : this.props, e = new b.Event(a), t = r.length; t--;) e[n = r[t]] = a[n];
                return e.target || (e.target = a.srcElement || o), 3 === e.target.nodeType && (e.target = e.target.parentNode), e.metaKey = !!e.metaKey, s.filter ? s.filter(e, a) : e
            },
            props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
            fixHooks: {},
            keyHooks: {
                props: "char charCode key keyCode".split(" "),
                filter: function (e, t) {
                    return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), e
                }
            },
            mouseHooks: {
                props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
                filter: function (e, n) {
                    var r, i, a, s = n.button,
                        l = n.fromElement;
                    return null == e.pageX && null != n.clientX && (a = (i = e.target.ownerDocument || o).documentElement, r = i.body, e.pageX = n.clientX + (a && a.scrollLeft || r && r.scrollLeft || 0) - (a && a.clientLeft || r && r.clientLeft || 0), e.pageY = n.clientY + (a && a.scrollTop || r && r.scrollTop || 0) - (a && a.clientTop || r && r.clientTop || 0)), !e.relatedTarget && l && (e.relatedTarget = l === e.target ? n.toElement : l), e.which || s === t || (e.which = 1 & s ? 1 : 2 & s ? 3 : 4 & s ? 2 : 0), e
                }
            },
            special: {
                load: {
                    noBubble: !0
                },
                click: {
                    trigger: function () {
                        if (b.nodeName(this, "input") && "checkbox" === this.type && this.click) return this.click(), !1
                    }
                },
                focus: {
                    trigger: function () {
                        if (this !== o.activeElement && this.focus) try {
                            return this.focus(), !1
                        } catch (e) {}
                    },
                    delegateType: "focusin"
                },
                blur: {
                    trigger: function () {
                        if (this === o.activeElement && this.blur) return this.blur(), !1
                    },
                    delegateType: "focusout"
                },
                beforeunload: {
                    postDispatch: function (e) {
                        e.result !== t && (e.originalEvent.returnValue = e.result)
                    }
                }
            },
            simulate: function (e, t, n, r) {
                var i = b.extend(new b.Event, n, {
                    type: e,
                    isSimulated: !0,
                    originalEvent: {}
                });
                r ? b.event.trigger(i, null, t) : b.event.dispatch.call(t, i), i.isDefaultPrevented() && n.preventDefault()
            }
        }, b.removeEvent = o.removeEventListener ? function (e, t, n) {
            e.removeEventListener && e.removeEventListener(t, n, !1)
        } : function (e, t, n) {
            var r = "on" + t;
            e.detachEvent && (typeof e[r] === i && (e[r] = null), e.detachEvent(r, n))
        }, b.Event = function (e, t) {
            if (!(this instanceof b.Event)) return new b.Event(e, t);
            e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || !1 === e.returnValue || e.getPreventDefault && e.getPreventDefault() ? re : ie) : this.type = e, t && b.extend(this, t), this.timeStamp = e && e.timeStamp || b.now(), this[b.expando] = !0
        }, b.Event.prototype = {
            isDefaultPrevented: ie,
            isPropagationStopped: ie,
            isImmediatePropagationStopped: ie,
            preventDefault: function () {
                var e = this.originalEvent;
                this.isDefaultPrevented = re, e && (e.preventDefault ? e.preventDefault() : e.returnValue = !1)
            },
            stopPropagation: function () {
                var e = this.originalEvent;
                this.isPropagationStopped = re, e && (e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0)
            },
            stopImmediatePropagation: function () {
                this.isImmediatePropagationStopped = re, this.stopPropagation()
            }
        }, b.each({
            mouseenter: "mouseover",
            mouseleave: "mouseout"
        }, function (e, t) {
            b.event.special[e] = {
                delegateType: t,
                bindType: t,
                handle: function (e) {
                    var n, r = e.relatedTarget,
                        i = e.handleObj;
                    return r && (r === this || b.contains(this, r)) || (e.type = i.origType, n = i.handler.apply(this, arguments), e.type = t), n
                }
            }
        }), b.support.submitBubbles || (b.event.special.submit = {
            setup: function () {
                if (b.nodeName(this, "form")) return !1;
                b.event.add(this, "click._submit keypress._submit", function (e) {
                    var n = e.target,
                        r = b.nodeName(n, "input") || b.nodeName(n, "button") ? n.form : t;
                    r && !b._data(r, "submitBubbles") && (b.event.add(r, "submit._submit", function (e) {
                        e._submit_bubble = !0
                    }), b._data(r, "submitBubbles", !0))
                })
            },
            postDispatch: function (e) {
                e._submit_bubble && (delete e._submit_bubble, this.parentNode && !e.isTrigger && b.event.simulate("submit", this.parentNode, e, !0))
            },
            teardown: function () {
                if (b.nodeName(this, "form")) return !1;
                b.event.remove(this, "._submit")
            }
        }), b.support.changeBubbles || (b.event.special.change = {
            setup: function () {
                if (V.test(this.nodeName)) return "checkbox" !== this.type && "radio" !== this.type || (b.event.add(this, "propertychange._change", function (e) {
                    "checked" === e.originalEvent.propertyName && (this._just_changed = !0)
                }), b.event.add(this, "click._change", function (e) {
                    this._just_changed && !e.isTrigger && (this._just_changed = !1), b.event.simulate("change", this, e, !0)
                })), !1;
                b.event.add(this, "beforeactivate._change", function (e) {
                    var t = e.target;
                    V.test(t.nodeName) && !b._data(t, "changeBubbles") && (b.event.add(t, "change._change", function (e) {
                        !this.parentNode || e.isSimulated || e.isTrigger || b.event.simulate("change", this.parentNode, e, !0)
                    }), b._data(t, "changeBubbles", !0))
                })
            },
            handle: function (e) {
                var t = e.target;
                if (this !== t || e.isSimulated || e.isTrigger || "radio" !== t.type && "checkbox" !== t.type) return e.handleObj.handler.apply(this, arguments)
            },
            teardown: function () {
                return b.event.remove(this, "._change"), !V.test(this.nodeName)
            }
        }), b.support.focusinBubbles || b.each({
            focus: "focusin",
            blur: "focusout"
        }, function (e, t) {
            var n = 0,
                r = function (e) {
                    b.event.simulate(t, e.target, b.event.fix(e), !0)
                };
            b.event.special[t] = {
                setup: function () {
                    0 == n++ && o.addEventListener(e, r, !0)
                },
                teardown: function () {
                    0 == --n && o.removeEventListener(e, r, !0)
                }
            }
        }), b.fn.extend({
            on: function (e, n, r, i, o) {
                var a, s;
                if ("object" == typeof e) {
                    for (a in "string" != typeof n && (r = r || n, n = t), e) this.on(a, n, r, e[a], o);
                    return this
                }
                if (null == r && null == i ? (i = n, r = n = t) : null == i && ("string" == typeof n ? (i = r, r = t) : (i = r, r = n, n = t)), !1 === i) i = ie;
                else if (!i) return this;
                return 1 === o && (s = i, (i = function (e) {
                    return b().off(e), s.apply(this, arguments)
                }).guid = s.guid || (s.guid = b.guid++)), this.each(function () {
                    b.event.add(this, e, i, r, n)
                })
            },
            one: function (e, t, n, r) {
                return this.on(e, t, n, r, 1)
            },
            off: function (e, n, r) {
                var i, o;
                if (e && e.preventDefault && e.handleObj) return i = e.handleObj, b(e.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler), this;
                if ("object" == typeof e) {
                    for (o in e) this.off(o, n, e[o]);
                    return this
                }
                return !1 !== n && "function" != typeof n || (r = n, n = t), !1 === r && (r = ie), this.each(function () {
                    b.event.remove(this, e, r, n)
                })
            },
            bind: function (e, t, n) {
                return this.on(e, null, t, n)
            },
            unbind: function (e, t) {
                return this.off(e, null, t)
            },
            delegate: function (e, t, n, r) {
                return this.on(t, e, n, r)
            },
            undelegate: function (e, t, n) {
                return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
            },
            trigger: function (e, t) {
                return this.each(function () {
                    b.event.trigger(e, t, this)
                })
            },
            triggerHandler: function (e, t) {
                var n = this[0];
                if (n) return b.event.trigger(e, t, n, !0)
            }
        }),
        function (e, t) {
            var n, r, i, o, a, s, l, u, c, d, p, f, h, g, m, y, v, x = "sizzle" + -new Date,
                w = e.document,
                C = {},
                T = 0,
                k = 0,
                S = ne(),
                N = ne(),
                E = ne(),
                A = "undefined",
                _ = 1 << 31,
                j = [],
                L = j.pop,
                $ = j.push,
                D = j.slice,
                H = j.indexOf || function (e) {
                    for (var t = 0, n = this.length; t < n; t++)
                        if (this[t] === e) return t;
                    return -1
                },
                I = "[\\x20\\t\\r\\n\\f]",
                P = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
                O = P.replace("w", "w#"),
                q = "\\[" + I + "*(" + P + ")" + I + "*(?:([*^$|!~]?=)" + I + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + O + ")|)|)" + I + "*\\]",
                B = ":(" + P + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + q.replace(3, 8) + ")*)|.*)\\)|)",
                M = new RegExp("^" + I + "+|((?:^|[^\\\\])(?:\\\\.)*)" + I + "+$", "g"),
                F = new RegExp("^" + I + "*," + I + "*"),
                R = new RegExp("^" + I + "*([\\x20\\t\\r\\n\\f>+~])" + I + "*"),
                W = new RegExp(B),
                z = new RegExp("^" + O + "$"),
                U = {
                    ID: new RegExp("^#(" + P + ")"),
                    CLASS: new RegExp("^\\.(" + P + ")"),
                    NAME: new RegExp("^\\[name=['\"]?(" + P + ")['\"]?\\]"),
                    TAG: new RegExp("^(" + P.replace("w", "w*") + ")"),
                    ATTR: new RegExp("^" + q),
                    PSEUDO: new RegExp("^" + B),
                    CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + I + "*(even|odd|(([+-]|)(\\d*)n|)" + I + "*(?:([+-]|)" + I + "*(\\d+)|))" + I + "*\\)|)", "i"),
                    needsContext: new RegExp("^" + I + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + I + "*((?:-\\d)?\\d*)" + I + "*\\)|)(?=[^-]|$)", "i")
                },
                X = /[\x20\t\r\n\f]*[+~]/,
                Q = /^[^{]+\{\s*\[native code/,
                Y = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                K = /^(?:input|select|textarea|button)$/i,
                J = /^h\d$/i,
                Z = /'|\\/g,
                V = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,
                G = /\\([\da-fA-F]{1,6}[\x20\t\r\n\f]?|.)/g,
                ee = function (e, t) {
                    var n = "0x" + t - 65536;
                    return n != n ? t : n < 0 ? String.fromCharCode(n + 65536) : String.fromCharCode(n >> 10 | 55296, 1023 & n | 56320)
                };
            try {
                D.call(w.documentElement.childNodes, 0)[0].nodeType
            } catch (e) {
                D = function (e) {
                    for (var t, n = []; t = this[e++];) n.push(t);
                    return n
                }
            }

            function te(e) {
                return Q.test(e + "")
            }

            function ne() {
                var e, t = [];
                return e = function (n, r) {
                    return t.push(n += " ") > i.cacheLength && delete e[t.shift()], e[n] = r
                }
            }

            function re(e) {
                return e[x] = !0, e
            }

            function ie(e) {
                var t = d.createElement("div");
                try {
                    return e(t)
                } catch (e) {
                    return !1
                } finally {
                    t = null
                }
            }

            function oe(e, t, n, r) {
                var o, a, l, u, p, g, m, v, b, T;
                if ((t ? t.ownerDocument || t : w) !== d && c(t), t = t || d, n = n || [], !e || "string" != typeof e) return n;
                if (1 !== (u = t.nodeType) && 9 !== u) return [];
                if (!f && !r) {
                    if (o = Y.exec(e))
                        if (l = o[1]) {
                            if (9 === u) {
                                if (!(a = t.getElementById(l)) || !a.parentNode) return n;
                                if (a.id === l) return n.push(a), n
                            } else if (t.ownerDocument && (a = t.ownerDocument.getElementById(l)) && y(t, a) && a.id === l) return n.push(a), n
                        } else {
                            if (o[2]) return $.apply(n, D.call(t.getElementsByTagName(e), 0)), n;
                            if ((l = o[3]) && C.getByClassName && t.getElementsByClassName) return $.apply(n, D.call(t.getElementsByClassName(l), 0)), n
                        }
                    if (C.qsa && !h.test(e)) {
                        if (m = !0, v = x, b = t, T = 9 === u && e, 1 === u && "object" !== t.nodeName.toLowerCase()) {
                            for (g = ce(e), (m = t.getAttribute("id")) ? v = m.replace(Z, "\\$&") : t.setAttribute("id", v), v = "[id='" + v + "'] ", p = g.length; p--;) g[p] = v + de(g[p]);
                            b = X.test(e) && t.parentNode || t, T = g.join(",")
                        }
                        if (T) try {
                            return $.apply(n, D.call(b.querySelectorAll(T), 0)), n
                        } catch (e) {} finally {
                            m || t.removeAttribute("id")
                        }
                    }
                }
                return function (e, t, n, r) {
                    var o, a, l, u, c, d = ce(e);
                    if (!r && 1 === d.length) {
                        if ((a = d[0] = d[0].slice(0)).length > 2 && "ID" === (l = a[0]).type && 9 === t.nodeType && !f && i.relative[a[1].type]) {
                            if (!(t = i.find.ID(l.matches[0].replace(G, ee), t)[0])) return n;
                            e = e.slice(a.shift().value.length)
                        }
                        for (o = U.needsContext.test(e) ? 0 : a.length; o-- && (l = a[o], !i.relative[u = l.type]);)
                            if ((c = i.find[u]) && (r = c(l.matches[0].replace(G, ee), X.test(a[0].type) && t.parentNode || t))) {
                                if (a.splice(o, 1), !(e = r.length && de(a))) return $.apply(n, D.call(r, 0)), n;
                                break
                            }
                    }
                    return s(e, d)(r, t, f, n, X.test(e)), n
                }(e.replace(M, "$1"), t, n, r)
            }

            function ae(e, t) {
                var n = t && e,
                    r = n && (~t.sourceIndex || _) - (~e.sourceIndex || _);
                if (r) return r;
                if (n)
                    for (; n = n.nextSibling;)
                        if (n === t) return -1;
                return e ? 1 : -1
            }

            function se(e) {
                return function (t) {
                    return "input" === t.nodeName.toLowerCase() && t.type === e
                }
            }

            function le(e) {
                return function (t) {
                    var n = t.nodeName.toLowerCase();
                    return ("input" === n || "button" === n) && t.type === e
                }
            }

            function ue(e) {
                return re(function (t) {
                    return t = +t, re(function (n, r) {
                        for (var i, o = e([], n.length, t), a = o.length; a--;) n[i = o[a]] && (n[i] = !(r[i] = n[i]))
                    })
                })
            }
            for (n in a = oe.isXML = function (e) {
                    var t = e && (e.ownerDocument || e).documentElement;
                    return !!t && "HTML" !== t.nodeName
                }, c = oe.setDocument = function (e) {
                    var t = e ? e.ownerDocument || e : w;
                    return t !== d && 9 === t.nodeType && t.documentElement ? (d = t, p = t.documentElement, f = a(t), C.tagNameNoComments = ie(function (e) {
                        return e.appendChild(t.createComment("")), !e.getElementsByTagName("*").length
                    }), C.attributes = ie(function (e) {
                        e.innerHTML = "<select></select>";
                        var t = typeof e.lastChild.getAttribute("multiple");
                        return "boolean" !== t && "string" !== t
                    }), C.getByClassName = ie(function (e) {
                        return e.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>", !(!e.getElementsByClassName || !e.getElementsByClassName("e").length) && (e.lastChild.className = "e", 2 === e.getElementsByClassName("e").length)
                    }), C.getByName = ie(function (e) {
                        e.id = x + 0, e.innerHTML = "<a name='" + x + "'></a><div name='" + x + "'></div>", p.insertBefore(e, p.firstChild);
                        var n = t.getElementsByName && t.getElementsByName(x).length === 2 + t.getElementsByName(x + 0).length;
                        return C.getIdNotName = !t.getElementById(x), p.removeChild(e), n
                    }), i.attrHandle = ie(function (e) {
                        return e.innerHTML = "<a href='#'></a>", e.firstChild && typeof e.firstChild.getAttribute !== A && "#" === e.firstChild.getAttribute("href")
                    }) ? {} : {
                        href: function (e) {
                            return e.getAttribute("href", 2)
                        },
                        type: function (e) {
                            return e.getAttribute("type")
                        }
                    }, C.getIdNotName ? (i.find.ID = function (e, t) {
                        if (typeof t.getElementById !== A && !f) {
                            var n = t.getElementById(e);
                            return n && n.parentNode ? [n] : []
                        }
                    }, i.filter.ID = function (e) {
                        var t = e.replace(G, ee);
                        return function (e) {
                            return e.getAttribute("id") === t
                        }
                    }) : (i.find.ID = function (e, t) {
                        if (typeof t.getElementById !== A && !f) {
                            var n = t.getElementById(e);
                            return n ? n.id === e || typeof n.getAttributeNode !== A && n.getAttributeNode("id").value === e ? [n] : void 0 : []
                        }
                    }, i.filter.ID = function (e) {
                        var t = e.replace(G, ee);
                        return function (e) {
                            var n = typeof e.getAttributeNode !== A && e.getAttributeNode("id");
                            return n && n.value === t
                        }
                    }), i.find.TAG = C.tagNameNoComments ? function (e, t) {
                        if (typeof t.getElementsByTagName !== A) return t.getElementsByTagName(e)
                    } : function (e, t) {
                        var n, r = [],
                            i = 0,
                            o = t.getElementsByTagName(e);
                        if ("*" === e) {
                            for (; n = o[i++];) 1 === n.nodeType && r.push(n);
                            return r
                        }
                        return o
                    }, i.find.NAME = C.getByName && function (e, t) {
                        if (typeof t.getElementsByName !== A) return t.getElementsByName(name)
                    }, i.find.CLASS = C.getByClassName && function (e, t) {
                        if (typeof t.getElementsByClassName !== A && !f) return t.getElementsByClassName(e)
                    }, g = [], h = [":focus"], (C.qsa = te(t.querySelectorAll)) && (ie(function (e) {
                        e.innerHTML = "<select><option selected=''></option></select>", e.querySelectorAll("[selected]").length || h.push("\\[" + I + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)"), e.querySelectorAll(":checked").length || h.push(":checked")
                    }), ie(function (e) {
                        e.innerHTML = "<input type='hidden' i=''/>", e.querySelectorAll("[i^='']").length && h.push("[*^$]=" + I + "*(?:\"\"|'')"), e.querySelectorAll(":enabled").length || h.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), h.push(",.*:")
                    })), (C.matchesSelector = te(m = p.matchesSelector || p.mozMatchesSelector || p.webkitMatchesSelector || p.oMatchesSelector || p.msMatchesSelector)) && ie(function (e) {
                        C.disconnectedMatch = m.call(e, "div"), m.call(e, "[s!='']:x"), g.push("!=", B)
                    }), h = new RegExp(h.join("|")), g = new RegExp(g.join("|")), y = te(p.contains) || p.compareDocumentPosition ? function (e, t) {
                        var n = 9 === e.nodeType ? e.documentElement : e,
                            r = t && t.parentNode;
                        return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)))
                    } : function (e, t) {
                        if (t)
                            for (; t = t.parentNode;)
                                if (t === e) return !0;
                        return !1
                    }, v = p.compareDocumentPosition ? function (e, n) {
                        var r;
                        return e === n ? (l = !0, 0) : (r = n.compareDocumentPosition && e.compareDocumentPosition && e.compareDocumentPosition(n)) ? 1 & r || e.parentNode && 11 === e.parentNode.nodeType ? e === t || y(w, e) ? -1 : n === t || y(w, n) ? 1 : 0 : 4 & r ? -1 : 1 : e.compareDocumentPosition ? -1 : 1
                    } : function (e, n) {
                        var r, i = 0,
                            o = e.parentNode,
                            a = n.parentNode,
                            s = [e],
                            u = [n];
                        if (e === n) return l = !0, 0;
                        if (!o || !a) return e === t ? -1 : n === t ? 1 : o ? -1 : a ? 1 : 0;
                        if (o === a) return ae(e, n);
                        for (r = e; r = r.parentNode;) s.unshift(r);
                        for (r = n; r = r.parentNode;) u.unshift(r);
                        for (; s[i] === u[i];) i++;
                        return i ? ae(s[i], u[i]) : s[i] === w ? -1 : u[i] === w ? 1 : 0
                    }, l = !1, [0, 0].sort(v), C.detectDuplicates = l, d) : d
                }, oe.matches = function (e, t) {
                    return oe(e, null, null, t)
                }, oe.matchesSelector = function (e, t) {
                    if ((e.ownerDocument || e) !== d && c(e), t = t.replace(V, "='$1']"), C.matchesSelector && !f && (!g || !g.test(t)) && !h.test(t)) try {
                        var n = m.call(e, t);
                        if (n || C.disconnectedMatch || e.document && 11 !== e.document.nodeType) return n
                    } catch (e) {}
                    return oe(t, d, null, [e]).length > 0
                }, oe.contains = function (e, t) {
                    return (e.ownerDocument || e) !== d && c(e), y(e, t)
                }, oe.attr = function (e, t) {
                    var n;
                    return (e.ownerDocument || e) !== d && c(e), f || (t = t.toLowerCase()), (n = i.attrHandle[t]) ? n(e) : f || C.attributes ? e.getAttribute(t) : ((n = e.getAttributeNode(t)) || e.getAttribute(t)) && !0 === e[t] ? t : n && n.specified ? n.value : null
                }, oe.error = function (e) {
                    throw new Error("Syntax error, unrecognized expression: " + e)
                }, oe.uniqueSort = function (e) {
                    var t, n = [],
                        r = 1,
                        i = 0;
                    if (l = !C.detectDuplicates, e.sort(v), l) {
                        for (; t = e[r]; r++) t === e[r - 1] && (i = n.push(r));
                        for (; i--;) e.splice(n[i], 1)
                    }
                    return e
                }, o = oe.getText = function (e) {
                    var t, n = "",
                        r = 0,
                        i = e.nodeType;
                    if (i) {
                        if (1 === i || 9 === i || 11 === i) {
                            if ("string" == typeof e.textContent) return e.textContent;
                            for (e = e.firstChild; e; e = e.nextSibling) n += o(e)
                        } else if (3 === i || 4 === i) return e.nodeValue
                    } else
                        for (; t = e[r]; r++) n += o(t);
                    return n
                }, i = oe.selectors = {
                    cacheLength: 50,
                    createPseudo: re,
                    match: U,
                    find: {},
                    relative: {
                        ">": {
                            dir: "parentNode",
                            first: !0
                        },
                        " ": {
                            dir: "parentNode"
                        },
                        "+": {
                            dir: "previousSibling",
                            first: !0
                        },
                        "~": {
                            dir: "previousSibling"
                        }
                    },
                    preFilter: {
                        ATTR: function (e) {
                            return e[1] = e[1].replace(G, ee), e[3] = (e[4] || e[5] || "").replace(G, ee), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
                        },
                        CHILD: function (e) {
                            return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || oe.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && oe.error(e[0]), e
                        },
                        PSEUDO: function (e) {
                            var t, n = !e[5] && e[2];
                            return U.CHILD.test(e[0]) ? null : (e[4] ? e[2] = e[4] : n && W.test(n) && (t = ce(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
                        }
                    },
                    filter: {
                        TAG: function (e) {
                            return "*" === e ? function () {
                                return !0
                            } : (e = e.replace(G, ee).toLowerCase(), function (t) {
                                return t.nodeName && t.nodeName.toLowerCase() === e
                            })
                        },
                        CLASS: function (e) {
                            var t = S[e + " "];
                            return t || (t = new RegExp("(^|" + I + ")" + e + "(" + I + "|$)")) && S(e, function (e) {
                                return t.test(e.className || typeof e.getAttribute !== A && e.getAttribute("class") || "")
                            })
                        },
                        ATTR: function (e, t, n) {
                            return function (r) {
                                var i = oe.attr(r, e);
                                return null == i ? "!=" === t : !t || (i += "", "=" === t ? i === n : "!=" === t ? i !== n : "^=" === t ? n && 0 === i.indexOf(n) : "*=" === t ? n && i.indexOf(n) > -1 : "$=" === t ? n && i.slice(-n.length) === n : "~=" === t ? (" " + i + " ").indexOf(n) > -1 : "|=" === t && (i === n || i.slice(0, n.length + 1) === n + "-"))
                            }
                        },
                        CHILD: function (e, t, n, r, i) {
                            var o = "nth" !== e.slice(0, 3),
                                a = "last" !== e.slice(-4),
                                s = "of-type" === t;
                            return 1 === r && 0 === i ? function (e) {
                                return !!e.parentNode
                            } : function (t, n, l) {
                                var u, c, d, p, f, h, g = o !== a ? "nextSibling" : "previousSibling",
                                    m = t.parentNode,
                                    y = s && t.nodeName.toLowerCase(),
                                    v = !l && !s;
                                if (m) {
                                    if (o) {
                                        for (; g;) {
                                            for (d = t; d = d[g];)
                                                if (s ? d.nodeName.toLowerCase() === y : 1 === d.nodeType) return !1;
                                            h = g = "only" === e && !h && "nextSibling"
                                        }
                                        return !0
                                    }
                                    if (h = [a ? m.firstChild : m.lastChild], a && v) {
                                        for (f = (u = (c = m[x] || (m[x] = {}))[e] || [])[0] === T && u[1], p = u[0] === T && u[2], d = f && m.childNodes[f]; d = ++f && d && d[g] || (p = f = 0) || h.pop();)
                                            if (1 === d.nodeType && ++p && d === t) {
                                                c[e] = [T, f, p];
                                                break
                                            }
                                    } else if (v && (u = (t[x] || (t[x] = {}))[e]) && u[0] === T) p = u[1];
                                    else
                                        for (;
                                            (d = ++f && d && d[g] || (p = f = 0) || h.pop()) && ((s ? d.nodeName.toLowerCase() !== y : 1 !== d.nodeType) || !++p || (v && ((d[x] || (d[x] = {}))[e] = [T, p]), d !== t)););
                                    return (p -= i) === r || p % r == 0 && p / r >= 0
                                }
                            }
                        },
                        PSEUDO: function (e, t) {
                            var n, r = i.pseudos[e] || i.setFilters[e.toLowerCase()] || oe.error("unsupported pseudo: " + e);
                            return r[x] ? r(t) : r.length > 1 ? (n = [e, e, "", t], i.setFilters.hasOwnProperty(e.toLowerCase()) ? re(function (e, n) {
                                for (var i, o = r(e, t), a = o.length; a--;) e[i = H.call(e, o[a])] = !(n[i] = o[a])
                            }) : function (e) {
                                return r(e, 0, n)
                            }) : r
                        }
                    },
                    pseudos: {
                        not: re(function (e) {
                            var t = [],
                                n = [],
                                r = s(e.replace(M, "$1"));
                            return r[x] ? re(function (e, t, n, i) {
                                for (var o, a = r(e, null, i, []), s = e.length; s--;)(o = a[s]) && (e[s] = !(t[s] = o))
                            }) : function (e, i, o) {
                                return t[0] = e, r(t, null, o, n), !n.pop()
                            }
                        }),
                        has: re(function (e) {
                            return function (t) {
                                return oe(e, t).length > 0
                            }
                        }),
                        contains: re(function (e) {
                            return function (t) {
                                return (t.textContent || t.innerText || o(t)).indexOf(e) > -1
                            }
                        }),
                        lang: re(function (e) {
                            return z.test(e || "") || oe.error("unsupported lang: " + e), e = e.replace(G, ee).toLowerCase(),
                                function (t) {
                                    var n;
                                    do {
                                        if (n = f ? t.getAttribute("xml:lang") || t.getAttribute("lang") : t.lang) return (n = n.toLowerCase()) === e || 0 === n.indexOf(e + "-")
                                    } while ((t = t.parentNode) && 1 === t.nodeType);
                                    return !1
                                }
                        }),
                        target: function (t) {
                            var n = e.location && e.location.hash;
                            return n && n.slice(1) === t.id
                        },
                        root: function (e) {
                            return e === p
                        },
                        focus: function (e) {
                            return e === d.activeElement && (!d.hasFocus || d.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                        },
                        enabled: function (e) {
                            return !1 === e.disabled
                        },
                        disabled: function (e) {
                            return !0 === e.disabled
                        },
                        checked: function (e) {
                            var t = e.nodeName.toLowerCase();
                            return "input" === t && !!e.checked || "option" === t && !!e.selected
                        },
                        selected: function (e) {
                            return e.parentNode && e.parentNode.selectedIndex, !0 === e.selected
                        },
                        empty: function (e) {
                            for (e = e.firstChild; e; e = e.nextSibling)
                                if (e.nodeName > "@" || 3 === e.nodeType || 4 === e.nodeType) return !1;
                            return !0
                        },
                        parent: function (e) {
                            return !i.pseudos.empty(e)
                        },
                        header: function (e) {
                            return J.test(e.nodeName)
                        },
                        input: function (e) {
                            return K.test(e.nodeName)
                        },
                        button: function (e) {
                            var t = e.nodeName.toLowerCase();
                            return "input" === t && "button" === e.type || "button" === t
                        },
                        text: function (e) {
                            var t;
                            return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || t.toLowerCase() === e.type)
                        },
                        first: ue(function () {
                            return [0]
                        }),
                        last: ue(function (e, t) {
                            return [t - 1]
                        }),
                        eq: ue(function (e, t, n) {
                            return [n < 0 ? n + t : n]
                        }),
                        even: ue(function (e, t) {
                            for (var n = 0; n < t; n += 2) e.push(n);
                            return e
                        }),
                        odd: ue(function (e, t) {
                            for (var n = 1; n < t; n += 2) e.push(n);
                            return e
                        }),
                        lt: ue(function (e, t, n) {
                            for (var r = n < 0 ? n + t : n; --r >= 0;) e.push(r);
                            return e
                        }),
                        gt: ue(function (e, t, n) {
                            for (var r = n < 0 ? n + t : n; ++r < t;) e.push(r);
                            return e
                        })
                    }
                }, {
                    radio: !0,
                    checkbox: !0,
                    file: !0,
                    password: !0,
                    image: !0
                }) i.pseudos[n] = se(n);
            for (n in {
                    submit: !0,
                    reset: !0
                }) i.pseudos[n] = le(n);

            function ce(e, t) {
                var n, r, o, a, s, l, u, c = N[e + " "];
                if (c) return t ? 0 : c.slice(0);
                for (s = e, l = [], u = i.preFilter; s;) {
                    for (a in n && !(r = F.exec(s)) || (r && (s = s.slice(r[0].length) || s), l.push(o = [])), n = !1, (r = R.exec(s)) && (n = r.shift(), o.push({
                            value: n,
                            type: r[0].replace(M, " ")
                        }), s = s.slice(n.length)), i.filter) !(r = U[a].exec(s)) || u[a] && !(r = u[a](r)) || (n = r.shift(), o.push({
                        value: n,
                        type: a,
                        matches: r
                    }), s = s.slice(n.length));
                    if (!n) break
                }
                return t ? s.length : s ? oe.error(e) : N(e, l).slice(0)
            }

            function de(e) {
                for (var t = 0, n = e.length, r = ""; t < n; t++) r += e[t].value;
                return r
            }

            function pe(e, t, n) {
                var i = t.dir,
                    o = n && "parentNode" === i,
                    a = k++;
                return t.first ? function (t, n, r) {
                    for (; t = t[i];)
                        if (1 === t.nodeType || o) return e(t, n, r)
                } : function (t, n, s) {
                    var l, u, c, d = T + " " + a;
                    if (s) {
                        for (; t = t[i];)
                            if ((1 === t.nodeType || o) && e(t, n, s)) return !0
                    } else
                        for (; t = t[i];)
                            if (1 === t.nodeType || o)
                                if ((u = (c = t[x] || (t[x] = {}))[i]) && u[0] === d) {
                                    if (!0 === (l = u[1]) || l === r) return !0 === l
                                } else if ((u = c[i] = [d])[1] = e(t, n, s) || r, !0 === u[1]) return !0
                }
            }

            function fe(e) {
                return e.length > 1 ? function (t, n, r) {
                    for (var i = e.length; i--;)
                        if (!e[i](t, n, r)) return !1;
                    return !0
                } : e[0]
            }

            function he(e, t, n, r, i) {
                for (var o, a = [], s = 0, l = e.length, u = null != t; s < l; s++)(o = e[s]) && (n && !n(o, r, i) || (a.push(o), u && t.push(s)));
                return a
            }

            function ge(e, t, n, r, i, o) {
                return r && !r[x] && (r = ge(r)), i && !i[x] && (i = ge(i, o)), re(function (o, a, s, l) {
                    var u, c, d, p = [],
                        f = [],
                        h = a.length,
                        g = o || function (e, t, n) {
                            for (var r = 0, i = t.length; r < i; r++) oe(e, t[r], n);
                            return n
                        }(t || "*", s.nodeType ? [s] : s, []),
                        m = !e || !o && t ? g : he(g, p, e, s, l),
                        y = n ? i || (o ? e : h || r) ? [] : a : m;
                    if (n && n(m, y, s, l), r)
                        for (u = he(y, f), r(u, [], s, l), c = u.length; c--;)(d = u[c]) && (y[f[c]] = !(m[f[c]] = d));
                    if (o) {
                        if (i || e) {
                            if (i) {
                                for (u = [], c = y.length; c--;)(d = y[c]) && u.push(m[c] = d);
                                i(null, y = [], u, l)
                            }
                            for (c = y.length; c--;)(d = y[c]) && (u = i ? H.call(o, d) : p[c]) > -1 && (o[u] = !(a[u] = d))
                        }
                    } else y = he(y === a ? y.splice(h, y.length) : y), i ? i(null, a, y, l) : $.apply(a, y)
                })
            }

            function me(e) {
                for (var t, n, r, o = e.length, a = i.relative[e[0].type], s = a || i.relative[" "], l = a ? 1 : 0, c = pe(function (e) {
                        return e === t
                    }, s, !0), d = pe(function (e) {
                        return H.call(t, e) > -1
                    }, s, !0), p = [function (e, n, r) {
                        return !a && (r || n !== u) || ((t = n).nodeType ? c(e, n, r) : d(e, n, r))
                    }]; l < o; l++)
                    if (n = i.relative[e[l].type]) p = [pe(fe(p), n)];
                    else {
                        if ((n = i.filter[e[l].type].apply(null, e[l].matches))[x]) {
                            for (r = ++l; r < o && !i.relative[e[r].type]; r++);
                            return ge(l > 1 && fe(p), l > 1 && de(e.slice(0, l - 1)).replace(M, "$1"), n, l < r && me(e.slice(l, r)), r < o && me(e = e.slice(r)), r < o && de(e))
                        }
                        p.push(n)
                    }
                return fe(p)
            }

            function ye() {}
            s = oe.compile = function (e, t) {
                var n, o, a, s, l, c, p, f = [],
                    h = [],
                    g = E[e + " "];
                if (!g) {
                    for (t || (t = ce(e)), n = t.length; n--;)(g = me(t[n]))[x] ? f.push(g) : h.push(g);
                    g = E(e, (o = h, s = 0, l = (a = f).length > 0, c = o.length > 0, p = function (e, t, n, p, f) {
                        var h, g, m, y = [],
                            v = 0,
                            b = "0",
                            x = e && [],
                            w = null != f,
                            C = u,
                            k = e || c && i.find.TAG("*", f && t.parentNode || t),
                            S = T += null == C ? 1 : Math.random() || .1;
                        for (w && (u = t !== d && t, r = s); null != (h = k[b]); b++) {
                            if (c && h) {
                                for (g = 0; m = o[g++];)
                                    if (m(h, t, n)) {
                                        p.push(h);
                                        break
                                    }
                                w && (T = S, r = ++s)
                            }
                            l && ((h = !m && h) && v--, e && x.push(h))
                        }
                        if (v += b, l && b !== v) {
                            for (g = 0; m = a[g++];) m(x, y, t, n);
                            if (e) {
                                if (v > 0)
                                    for (; b--;) x[b] || y[b] || (y[b] = L.call(p));
                                y = he(y)
                            }
                            $.apply(p, y), w && !e && y.length > 0 && v + a.length > 1 && oe.uniqueSort(p)
                        }
                        return w && (T = S, u = C), x
                    }, l ? re(p) : p))
                }
                return g
            }, i.pseudos.nth = i.pseudos.eq, i.filters = ye.prototype = i.pseudos, i.setFilters = new ye, c(), oe.attr = b.attr, b.find = oe, b.expr = oe.selectors, b.expr[":"] = b.expr.pseudos, b.unique = oe.uniqueSort, b.text = oe.getText, b.isXMLDoc = oe.isXML, b.contains = oe.contains
        }(e);
    var oe = /Until$/,
        ae = /^(?:parents|prev(?:Until|All))/,
        se = /^.[^:#\[\.,]*$/,
        le = b.expr.match.needsContext,
        ue = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };

    function ce(e, t) {
        do {
            e = e[t]
        } while (e && 1 !== e.nodeType);
        return e
    }

    function de(e, t, n) {
        if (t = t || 0, b.isFunction(t)) return b.grep(e, function (e, r) {
            return !!t.call(e, r, e) === n
        });
        if (t.nodeType) return b.grep(e, function (e) {
            return e === t === n
        });
        if ("string" == typeof t) {
            var r = b.grep(e, function (e) {
                return 1 === e.nodeType
            });
            if (se.test(t)) return b.filter(t, r, !n);
            t = b.filter(t, r)
        }
        return b.grep(e, function (e) {
            return b.inArray(e, t) >= 0 === n
        })
    }

    function pe(e) {
        var t = fe.split("|"),
            n = e.createDocumentFragment();
        if (n.createElement)
            for (; t.length;) n.createElement(t.pop());
        return n
    }
    b.fn.extend({
        find: function (e) {
            var t, n, r, i = this.length;
            if ("string" != typeof e) return r = this, this.pushStack(b(e).filter(function () {
                for (t = 0; t < i; t++)
                    if (b.contains(r[t], this)) return !0
            }));
            for (n = [], t = 0; t < i; t++) b.find(e, this[t], n);
            return (n = this.pushStack(i > 1 ? b.unique(n) : n)).selector = (this.selector ? this.selector + " " : "") + e, n
        },
        has: function (e) {
            var t, n = b(e, this),
                r = n.length;
            return this.filter(function () {
                for (t = 0; t < r; t++)
                    if (b.contains(this, n[t])) return !0
            })
        },
        not: function (e) {
            return this.pushStack(de(this, e, !1))
        },
        filter: function (e) {
            return this.pushStack(de(this, e, !0))
        },
        is: function (e) {
            return !!e && ("string" == typeof e ? le.test(e) ? b(e, this.context).index(this[0]) >= 0 : b.filter(e, this).length > 0 : this.filter(e).length > 0)
        },
        closest: function (e, t) {
            for (var n, r = 0, i = this.length, o = [], a = le.test(e) || "string" != typeof e ? b(e, t || this.context) : 0; r < i; r++)
                for (n = this[r]; n && n.ownerDocument && n !== t && 11 !== n.nodeType;) {
                    if (a ? a.index(n) > -1 : b.find.matchesSelector(n, e)) {
                        o.push(n);
                        break
                    }
                    n = n.parentNode
                }
            return this.pushStack(o.length > 1 ? b.unique(o) : o)
        },
        index: function (e) {
            return e ? "string" == typeof e ? b.inArray(this[0], b(e)) : b.inArray(e.jquery ? e[0] : e, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        add: function (e, t) {
            var n = "string" == typeof e ? b(e, t) : b.makeArray(e && e.nodeType ? [e] : e),
                r = b.merge(this.get(), n);
            return this.pushStack(b.unique(r))
        },
        addBack: function (e) {
            return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
        }
    }), b.fn.andSelf = b.fn.addBack, b.each({
        parent: function (e) {
            var t = e.parentNode;
            return t && 11 !== t.nodeType ? t : null
        },
        parents: function (e) {
            return b.dir(e, "parentNode")
        },
        parentsUntil: function (e, t, n) {
            return b.dir(e, "parentNode", n)
        },
        next: function (e) {
            return ce(e, "nextSibling")
        },
        prev: function (e) {
            return ce(e, "previousSibling")
        },
        nextAll: function (e) {
            return b.dir(e, "nextSibling")
        },
        prevAll: function (e) {
            return b.dir(e, "previousSibling")
        },
        nextUntil: function (e, t, n) {
            return b.dir(e, "nextSibling", n)
        },
        prevUntil: function (e, t, n) {
            return b.dir(e, "previousSibling", n)
        },
        siblings: function (e) {
            return b.sibling((e.parentNode || {}).firstChild, e)
        },
        children: function (e) {
            return b.sibling(e.firstChild)
        },
        contents: function (e) {
            return b.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : b.merge([], e.childNodes)
        }
    }, function (e, t) {
        b.fn[e] = function (n, r) {
            var i = b.map(this, t, n);
            return oe.test(e) || (r = n), r && "string" == typeof r && (i = b.filter(r, i)), i = this.length > 1 && !ue[e] ? b.unique(i) : i, this.length > 1 && ae.test(e) && (i = i.reverse()), this.pushStack(i)
        }
    }), b.extend({
        filter: function (e, t, n) {
            return n && (e = ":not(" + e + ")"), 1 === t.length ? b.find.matchesSelector(t[0], e) ? [t[0]] : [] : b.find.matches(e, t)
        },
        dir: function (e, n, r) {
            for (var i = [], o = e[n]; o && 9 !== o.nodeType && (r === t || 1 !== o.nodeType || !b(o).is(r));) 1 === o.nodeType && i.push(o), o = o[n];
            return i
        },
        sibling: function (e, t) {
            for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
            return n
        }
    });
    var fe = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
        he = / jQuery\d+="(?:null|\d+)"/g,
        ge = new RegExp("<(?:" + fe + ")[\\s/>]", "i"),
        me = /^\s+/,
        ye = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        ve = /<([\w:]+)/,
        be = /<tbody/i,
        xe = /<|&#?\w+;/,
        we = /<(?:script|style|link)/i,
        Ce = /^(?:checkbox|radio)$/i,
        Te = /checked\s*(?:[^=]|=\s*.checked.)/i,
        ke = /^$|\/(?:java|ecma)script/i,
        Se = /^true\/(.*)/,
        Ne = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
        Ee = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            legend: [1, "<fieldset>", "</fieldset>"],
            area: [1, "<map>", "</map>"],
            param: [1, "<object>", "</object>"],
            thead: [1, "<table>", "</table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: b.support.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
        },
        Ae = pe(o).appendChild(o.createElement("div"));

    function _e(e) {
        var t = e.getAttributeNode("type");
        return e.type = (t && t.specified) + "/" + e.type, e
    }

    function je(e) {
        var t = Se.exec(e.type);
        return t ? e.type = t[1] : e.removeAttribute("type"), e
    }

    function Le(e, t) {
        for (var n, r = 0; null != (n = e[r]); r++) b._data(n, "globalEval", !t || b._data(t[r], "globalEval"))
    }

    function $e(e, t) {
        if (1 === t.nodeType && b.hasData(e)) {
            var n, r, i, o = b._data(e),
                a = b._data(t, o),
                s = o.events;
            if (s)
                for (n in delete a.handle, a.events = {}, s)
                    for (r = 0, i = s[n].length; r < i; r++) b.event.add(t, n, s[n][r]);
            a.data && (a.data = b.extend({}, a.data))
        }
    }

    function De(e, t) {
        var n, r, i;
        if (1 === t.nodeType) {
            if (n = t.nodeName.toLowerCase(), !b.support.noCloneEvent && t[b.expando]) {
                for (r in (i = b._data(t)).events) b.removeEvent(t, r, i.handle);
                t.removeAttribute(b.expando)
            }
            "script" === n && t.text !== e.text ? (_e(t).text = e.text, je(t)) : "object" === n ? (t.parentNode && (t.outerHTML = e.outerHTML), b.support.html5Clone && e.innerHTML && !b.trim(t.innerHTML) && (t.innerHTML = e.innerHTML)) : "input" === n && Ce.test(e.type) ? (t.defaultChecked = t.checked = e.checked, t.value !== e.value && (t.value = e.value)) : "option" === n ? t.defaultSelected = t.selected = e.defaultSelected : "input" !== n && "textarea" !== n || (t.defaultValue = e.defaultValue)
        }
    }

    function He(e, n) {
        var r, o, a = 0,
            s = typeof e.getElementsByTagName !== i ? e.getElementsByTagName(n || "*") : typeof e.querySelectorAll !== i ? e.querySelectorAll(n || "*") : t;
        if (!s)
            for (s = [], r = e.childNodes || e; null != (o = r[a]); a++) !n || b.nodeName(o, n) ? s.push(o) : b.merge(s, He(o, n));
        return n === t || n && b.nodeName(e, n) ? b.merge([e], s) : s
    }

    function Ie(e) {
        Ce.test(e.type) && (e.defaultChecked = e.checked)
    }
    Ee.optgroup = Ee.option, Ee.tbody = Ee.tfoot = Ee.colgroup = Ee.caption = Ee.thead, Ee.th = Ee.td, b.fn.extend({
        text: function (e) {
            return b.access(this, function (e) {
                return e === t ? b.text(this) : this.empty().append((this[0] && this[0].ownerDocument || o).createTextNode(e))
            }, null, e, arguments.length)
        },
        wrapAll: function (e) {
            if (b.isFunction(e)) return this.each(function (t) {
                b(this).wrapAll(e.call(this, t))
            });
            if (this[0]) {
                var t = b(e, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && t.insertBefore(this[0]), t.map(function () {
                    for (var e = this; e.firstChild && 1 === e.firstChild.nodeType;) e = e.firstChild;
                    return e
                }).append(this)
            }
            return this
        },
        wrapInner: function (e) {
            return b.isFunction(e) ? this.each(function (t) {
                b(this).wrapInner(e.call(this, t))
            }) : this.each(function () {
                var t = b(this),
                    n = t.contents();
                n.length ? n.wrapAll(e) : t.append(e)
            })
        },
        wrap: function (e) {
            var t = b.isFunction(e);
            return this.each(function (n) {
                b(this).wrapAll(t ? e.call(this, n) : e)
            })
        },
        unwrap: function () {
            return this.parent().each(function () {
                b.nodeName(this, "body") || b(this).replaceWith(this.childNodes)
            }).end()
        },
        append: function () {
            return this.domManip(arguments, !0, function (e) {
                1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || this.appendChild(e)
            })
        },
        prepend: function () {
            return this.domManip(arguments, !0, function (e) {
                1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || this.insertBefore(e, this.firstChild)
            })
        },
        before: function () {
            return this.domManip(arguments, !1, function (e) {
                this.parentNode && this.parentNode.insertBefore(e, this)
            })
        },
        after: function () {
            return this.domManip(arguments, !1, function (e) {
                this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
            })
        },
        remove: function (e, t) {
            for (var n, r = 0; null != (n = this[r]); r++)(!e || b.filter(e, [n]).length > 0) && (t || 1 !== n.nodeType || b.cleanData(He(n)), n.parentNode && (t && b.contains(n.ownerDocument, n) && Le(He(n, "script")), n.parentNode.removeChild(n)));
            return this
        },
        empty: function () {
            for (var e, t = 0; null != (e = this[t]); t++) {
                for (1 === e.nodeType && b.cleanData(He(e, !1)); e.firstChild;) e.removeChild(e.firstChild);
                e.options && b.nodeName(e, "select") && (e.options.length = 0)
            }
            return this
        },
        clone: function (e, t) {
            return e = null != e && e, t = null == t ? e : t, this.map(function () {
                return b.clone(this, e, t)
            })
        },
        html: function (e) {
            return b.access(this, function (e) {
                var n = this[0] || {},
                    r = 0,
                    i = this.length;
                if (e === t) return 1 === n.nodeType ? n.innerHTML.replace(he, "") : t;
                if ("string" == typeof e && !we.test(e) && (b.support.htmlSerialize || !ge.test(e)) && (b.support.leadingWhitespace || !me.test(e)) && !Ee[(ve.exec(e) || ["", ""])[1].toLowerCase()]) {
                    e = e.replace(ye, "<$1></$2>");
                    try {
                        for (; r < i; r++) 1 === (n = this[r] || {}).nodeType && (b.cleanData(He(n, !1)), n.innerHTML = e);
                        n = 0
                    } catch (e) {}
                }
                n && this.empty().append(e)
            }, null, e, arguments.length)
        },
        replaceWith: function (e) {
            return b.isFunction(e) || "string" == typeof e || (e = b(e).not(this).detach()), this.domManip([e], !0, function (e) {
                var t = this.nextSibling,
                    n = this.parentNode;
                n && (b(this).remove(), n.insertBefore(e, t))
            })
        },
        detach: function (e) {
            return this.remove(e, !0)
        },
        domManip: function (e, n, r) {
            e = p.apply([], e);
            var i, o, a, s, l, u, c, d, f = 0,
                h = this.length,
                g = this,
                m = h - 1,
                y = e[0],
                v = b.isFunction(y);
            if (v || !(h <= 1 || "string" != typeof y || b.support.checkClone) && Te.test(y)) return this.each(function (i) {
                var o = g.eq(i);
                v && (e[0] = y.call(this, i, n ? o.html() : t)), o.domManip(e, n, r)
            });
            if (h && (i = (u = b.buildFragment(e, this[0].ownerDocument, !1, this)).firstChild, 1 === u.childNodes.length && (u = i), i)) {
                for (n = n && b.nodeName(i, "tr"), a = (s = b.map(He(u, "script"), _e)).length; f < h; f++) o = u, f !== m && (o = b.clone(o, !0, !0), a && b.merge(s, He(o, "script"))), r.call(n && b.nodeName(this[f], "table") ? (c = this[f], d = "tbody", c.getElementsByTagName(d)[0] || c.appendChild(c.ownerDocument.createElement(d))) : this[f], o, f);
                if (a)
                    for (l = s[s.length - 1].ownerDocument, b.map(s, je), f = 0; f < a; f++) o = s[f], ke.test(o.type || "") && !b._data(o, "globalEval") && b.contains(l, o) && (o.src ? b.ajax({
                        url: o.src,
                        type: "GET",
                        dataType: "script",
                        async: !1,
                        global: !1,
                        throws: !0
                    }) : b.globalEval((o.text || o.textContent || o.innerHTML || "").replace(Ne, "")));
                u = i = null
            }
            return this
        }
    }), b.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function (e, t) {
        b.fn[e] = function (e) {
            for (var n, r = 0, i = [], o = b(e), a = o.length - 1; r <= a; r++) n = r === a ? this : this.clone(!0), b(o[r])[t](n), f.apply(i, n.get());
            return this.pushStack(i)
        }
    }), b.extend({
        clone: function (e, t, n) {
            var r, i, o, a, s, l = b.contains(e.ownerDocument, e);
            if (b.support.html5Clone || b.isXMLDoc(e) || !ge.test("<" + e.nodeName + ">") ? o = e.cloneNode(!0) : (Ae.innerHTML = e.outerHTML, Ae.removeChild(o = Ae.firstChild)), !(b.support.noCloneEvent && b.support.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || b.isXMLDoc(e)))
                for (r = He(o), s = He(e), a = 0; null != (i = s[a]); ++a) r[a] && De(i, r[a]);
            if (t)
                if (n)
                    for (s = s || He(e), r = r || He(o), a = 0; null != (i = s[a]); a++) $e(i, r[a]);
                else $e(e, o);
            return (r = He(o, "script")).length > 0 && Le(r, !l && He(e, "script")), r = s = i = null, o
        },
        buildFragment: function (e, t, n, r) {
            for (var i, o, a, s, l, u, c, d = e.length, p = pe(t), f = [], h = 0; h < d; h++)
                if ((o = e[h]) || 0 === o)
                    if ("object" === b.type(o)) b.merge(f, o.nodeType ? [o] : o);
                    else if (xe.test(o)) {
                for (s = s || p.appendChild(t.createElement("div")), l = (ve.exec(o) || ["", ""])[1].toLowerCase(), c = Ee[l] || Ee._default, s.innerHTML = c[1] + o.replace(ye, "<$1></$2>") + c[2], i = c[0]; i--;) s = s.lastChild;
                if (!b.support.leadingWhitespace && me.test(o) && f.push(t.createTextNode(me.exec(o)[0])), !b.support.tbody)
                    for (i = (o = "table" !== l || be.test(o) ? "<table>" !== c[1] || be.test(o) ? 0 : s : s.firstChild) && o.childNodes.length; i--;) b.nodeName(u = o.childNodes[i], "tbody") && !u.childNodes.length && o.removeChild(u);
                for (b.merge(f, s.childNodes), s.textContent = ""; s.firstChild;) s.removeChild(s.firstChild);
                s = p.lastChild
            } else f.push(t.createTextNode(o));
            for (s && p.removeChild(s), b.support.appendChecked || b.grep(He(f, "input"), Ie), h = 0; o = f[h++];)
                if ((!r || -1 === b.inArray(o, r)) && (a = b.contains(o.ownerDocument, o), s = He(p.appendChild(o), "script"), a && Le(s), n))
                    for (i = 0; o = s[i++];) ke.test(o.type || "") && n.push(o);
            return s = null, p
        },
        cleanData: function (e, t) {
            for (var n, r, o, a, s = 0, l = b.expando, u = b.cache, d = b.support.deleteExpando, p = b.event.special; null != (n = e[s]); s++)
                if ((t || b.acceptData(n)) && (a = (o = n[l]) && u[o])) {
                    if (a.events)
                        for (r in a.events) p[r] ? b.event.remove(n, r) : b.removeEvent(n, r, a.handle);
                    u[o] && (delete u[o], d ? delete n[l] : typeof n.removeAttribute !== i ? n.removeAttribute(l) : n[l] = null, c.push(o))
                }
        }
    });
    var Pe, Oe, qe, Be = /alpha\([^)]*\)/i,
        Me = /opacity\s*=\s*([^)]*)/,
        Fe = /^(top|right|bottom|left)$/,
        Re = /^(none|table(?!-c[ea]).+)/,
        We = /^margin/,
        ze = new RegExp("^(" + x + ")(.*)$", "i"),
        Ue = new RegExp("^(" + x + ")(?!px)[a-z%]+$", "i"),
        Xe = new RegExp("^([+-])=(" + x + ")", "i"),
        Qe = {
            BODY: "block"
        },
        Ye = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        Ke = {
            letterSpacing: 0,
            fontWeight: 400
        },
        Je = ["Top", "Right", "Bottom", "Left"],
        Ze = ["Webkit", "O", "Moz", "ms"];

    function Ve(e, t) {
        if (t in e) return t;
        for (var n = t.charAt(0).toUpperCase() + t.slice(1), r = t, i = Ze.length; i--;)
            if ((t = Ze[i] + n) in e) return t;
        return r
    }

    function Ge(e, t) {
        return e = t || e, "none" === b.css(e, "display") || !b.contains(e.ownerDocument, e)
    }

    function et(e, t) {
        for (var n, r, i, o = [], a = 0, s = e.length; a < s; a++)(r = e[a]).style && (o[a] = b._data(r, "olddisplay"), n = r.style.display, t ? (o[a] || "none" !== n || (r.style.display = ""), "" === r.style.display && Ge(r) && (o[a] = b._data(r, "olddisplay", it(r.nodeName)))) : o[a] || (i = Ge(r), (n && "none" !== n || !i) && b._data(r, "olddisplay", i ? n : b.css(r, "display"))));
        for (a = 0; a < s; a++)(r = e[a]).style && (t && "none" !== r.style.display && "" !== r.style.display || (r.style.display = t ? o[a] || "" : "none"));
        return e
    }

    function tt(e, t, n) {
        var r = ze.exec(t);
        return r ? Math.max(0, r[1] - (n || 0)) + (r[2] || "px") : t
    }

    function nt(e, t, n, r, i) {
        for (var o = n === (r ? "border" : "content") ? 4 : "width" === t ? 1 : 0, a = 0; o < 4; o += 2) "margin" === n && (a += b.css(e, n + Je[o], !0, i)), r ? ("content" === n && (a -= b.css(e, "padding" + Je[o], !0, i)), "margin" !== n && (a -= b.css(e, "border" + Je[o] + "Width", !0, i))) : (a += b.css(e, "padding" + Je[o], !0, i), "padding" !== n && (a += b.css(e, "border" + Je[o] + "Width", !0, i)));
        return a
    }

    function rt(e, t, n) {
        var r = !0,
            i = "width" === t ? e.offsetWidth : e.offsetHeight,
            o = Oe(e),
            a = b.support.boxSizing && "border-box" === b.css(e, "boxSizing", !1, o);
        if (i <= 0 || null == i) {
            if (((i = qe(e, t, o)) < 0 || null == i) && (i = e.style[t]), Ue.test(i)) return i;
            r = a && (b.support.boxSizingReliable || i === e.style[t]), i = parseFloat(i) || 0
        }
        return i + nt(e, t, n || (a ? "border" : "content"), r, o) + "px"
    }

    function it(e) {
        var t = o,
            n = Qe[e];
        return n || ("none" !== (n = ot(e, t)) && n || ((t = ((Pe = (Pe || b("<iframe frameborder='0' width='0' height='0'/>").css("cssText", "display:block !important")).appendTo(t.documentElement))[0].contentWindow || Pe[0].contentDocument).document).write("<!doctype html><html><body>"), t.close(), n = ot(e, t), Pe.detach()), Qe[e] = n), n
    }

    function ot(e, t) {
        var n = b(t.createElement(e)).appendTo(t.body),
            r = b.css(n[0], "display");
        return n.remove(), r
    }
    b.fn.extend({
        css: function (e, n) {
            return b.access(this, function (e, n, r) {
                var i, o, a = {},
                    s = 0;
                if (b.isArray(n)) {
                    for (o = Oe(e), i = n.length; s < i; s++) a[n[s]] = b.css(e, n[s], !1, o);
                    return a
                }
                return r !== t ? b.style(e, n, r) : b.css(e, n)
            }, e, n, arguments.length > 1)
        },
        show: function () {
            return et(this, !0)
        },
        hide: function () {
            return et(this)
        },
        toggle: function (e) {
            var t = "boolean" == typeof e;
            return this.each(function () {
                (t ? e : Ge(this)) ? b(this).show(): b(this).hide()
            })
        }
    }), b.extend({
        cssHooks: {
            opacity: {
                get: function (e, t) {
                    if (t) {
                        var n = qe(e, "opacity");
                        return "" === n ? "1" : n
                    }
                }
            }
        },
        cssNumber: {
            columnCount: !0,
            fillOpacity: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            float: b.support.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function (e, n, r, i) {
            if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                var o, a, s, l = b.camelCase(n),
                    u = e.style;
                if (n = b.cssProps[l] || (b.cssProps[l] = Ve(u, l)), s = b.cssHooks[n] || b.cssHooks[l], r === t) return s && "get" in s && (o = s.get(e, !1, i)) !== t ? o : u[n];
                if (!("string" === (a = typeof r) && (o = Xe.exec(r)) && (r = (o[1] + 1) * o[2] + parseFloat(b.css(e, n)), a = "number"), null == r || "number" === a && isNaN(r) || ("number" !== a || b.cssNumber[l] || (r += "px"), b.support.clearCloneStyle || "" !== r || 0 !== n.indexOf("background") || (u[n] = "inherit"), s && "set" in s && (r = s.set(e, r, i)) === t))) try {
                    u[n] = r
                } catch (e) {}
            }
        },
        css: function (e, n, r, i) {
            var o, a, s, l = b.camelCase(n);
            return n = b.cssProps[l] || (b.cssProps[l] = Ve(e.style, l)), (s = b.cssHooks[n] || b.cssHooks[l]) && "get" in s && (a = s.get(e, !0, r)), a === t && (a = qe(e, n, i)), "normal" === a && n in Ke && (a = Ke[n]), "" === r || r ? (o = parseFloat(a), !0 === r || b.isNumeric(o) ? o || 0 : a) : a
        },
        swap: function (e, t, n, r) {
            var i, o, a = {};
            for (o in t) a[o] = e.style[o], e.style[o] = t[o];
            for (o in i = n.apply(e, r || []), t) e.style[o] = a[o];
            return i
        }
    }), e.getComputedStyle ? (Oe = function (t) {
        return e.getComputedStyle(t, null)
    }, qe = function (e, n, r) {
        var i, o, a, s = r || Oe(e),
            l = s ? s.getPropertyValue(n) || s[n] : t,
            u = e.style;
        return s && ("" !== l || b.contains(e.ownerDocument, e) || (l = b.style(e, n)), Ue.test(l) && We.test(n) && (i = u.width, o = u.minWidth, a = u.maxWidth, u.minWidth = u.maxWidth = u.width = l, l = s.width, u.width = i, u.minWidth = o, u.maxWidth = a)), l
    }) : o.documentElement.currentStyle && (Oe = function (e) {
        return e.currentStyle
    }, qe = function (e, n, r) {
        var i, o, a, s = r || Oe(e),
            l = s ? s[n] : t,
            u = e.style;
        return null == l && u && u[n] && (l = u[n]), Ue.test(l) && !Fe.test(n) && (i = u.left, (a = (o = e.runtimeStyle) && o.left) && (o.left = e.currentStyle.left), u.left = "fontSize" === n ? "1em" : l, l = u.pixelLeft + "px", u.left = i, a && (o.left = a)), "" === l ? "auto" : l
    }), b.each(["height", "width"], function (e, t) {
        b.cssHooks[t] = {
            get: function (e, n, r) {
                if (n) return 0 === e.offsetWidth && Re.test(b.css(e, "display")) ? b.swap(e, Ye, function () {
                    return rt(e, t, r)
                }) : rt(e, t, r)
            },
            set: function (e, n, r) {
                var i = r && Oe(e);
                return tt(0, n, r ? nt(e, t, r, b.support.boxSizing && "border-box" === b.css(e, "boxSizing", !1, i), i) : 0)
            }
        }
    }), b.support.opacity || (b.cssHooks.opacity = {
        get: function (e, t) {
            return Me.test((t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : t ? "1" : ""
        },
        set: function (e, t) {
            var n = e.style,
                r = e.currentStyle,
                i = b.isNumeric(t) ? "alpha(opacity=" + 100 * t + ")" : "",
                o = r && r.filter || n.filter || "";
            n.zoom = 1, (t >= 1 || "" === t) && "" === b.trim(o.replace(Be, "")) && n.removeAttribute && (n.removeAttribute("filter"), "" === t || r && !r.filter) || (n.filter = Be.test(o) ? o.replace(Be, i) : o + " " + i)
        }
    }), b(function () {
        b.support.reliableMarginRight || (b.cssHooks.marginRight = {
            get: function (e, t) {
                if (t) return b.swap(e, {
                    display: "inline-block"
                }, qe, [e, "marginRight"])
            }
        }), !b.support.pixelPosition && b.fn.position && b.each(["top", "left"], function (e, t) {
            b.cssHooks[t] = {
                get: function (e, n) {
                    if (n) return n = qe(e, t), Ue.test(n) ? b(e).position()[t] + "px" : n
                }
            }
        })
    }), b.expr && b.expr.filters && (b.expr.filters.hidden = function (e) {
        return e.offsetWidth <= 0 && e.offsetHeight <= 0 || !b.support.reliableHiddenOffsets && "none" === (e.style && e.style.display || b.css(e, "display"))
    }, b.expr.filters.visible = function (e) {
        return !b.expr.filters.hidden(e)
    }), b.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function (e, t) {
        b.cssHooks[e + t] = {
            expand: function (n) {
                for (var r = 0, i = {}, o = "string" == typeof n ? n.split(" ") : [n]; r < 4; r++) i[e + Je[r] + t] = o[r] || o[r - 2] || o[0];
                return i
            }
        }, We.test(e) || (b.cssHooks[e + t].set = tt)
    });
    var at = /%20/g,
        st = /\[\]$/,
        lt = /\r?\n/g,
        ut = /^(?:submit|button|image|reset|file)$/i,
        ct = /^(?:input|select|textarea|keygen)/i;

    function dt(e, t, n, r) {
        var i;
        if (b.isArray(t)) b.each(t, function (t, i) {
            n || st.test(e) ? r(e, i) : dt(e + "[" + ("object" == typeof i ? t : "") + "]", i, n, r)
        });
        else if (n || "object" !== b.type(t)) r(e, t);
        else
            for (i in t) dt(e + "[" + i + "]", t[i], n, r)
    }
    b.fn.extend({
        serialize: function () {
            return b.param(this.serializeArray())
        },
        serializeArray: function () {
            return this.map(function () {
                var e = b.prop(this, "elements");
                return e ? b.makeArray(e) : this
            }).filter(function () {
                var e = this.type;
                return this.name && !b(this).is(":disabled") && ct.test(this.nodeName) && !ut.test(e) && (this.checked || !Ce.test(e))
            }).map(function (e, t) {
                var n = b(this).val();
                return null == n ? null : b.isArray(n) ? b.map(n, function (e) {
                    return {
                        name: t.name,
                        value: e.replace(lt, "\r\n")
                    }
                }) : {
                    name: t.name,
                    value: n.replace(lt, "\r\n")
                }
            }).get()
        }
    }), b.param = function (e, n) {
        var r, i = [],
            o = function (e, t) {
                t = b.isFunction(t) ? t() : null == t ? "" : t, i[i.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
            };
        if (n === t && (n = b.ajaxSettings && b.ajaxSettings.traditional), b.isArray(e) || e.jquery && !b.isPlainObject(e)) b.each(e, function () {
            o(this.name, this.value)
        });
        else
            for (r in e) dt(r, e[r], n, o);
        return i.join("&").replace(at, "+")
    }, b.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (e, t) {
        b.fn[t] = function (e, n) {
            return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
        }
    }), b.fn.hover = function (e, t) {
        return this.mouseenter(e).mouseleave(t || e)
    };
    var pt, ft, ht = b.now(),
        gt = /\?/,
        mt = /#.*$/,
        yt = /([?&])_=[^&]*/,
        vt = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
        bt = /^(?:GET|HEAD)$/,
        xt = /^\/\//,
        wt = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,
        Ct = b.fn.load,
        Tt = {},
        kt = {},
        St = "*/".concat("*");
    try {
        ft = a.href
    } catch (e) {
        (ft = o.createElement("a")).href = "", ft = ft.href
    }

    function Nt(e) {
        return function (t, n) {
            "string" != typeof t && (n = t, t = "*");
            var r, i = 0,
                o = t.toLowerCase().match(w) || [];
            if (b.isFunction(n))
                for (; r = o[i++];) "+" === r[0] ? (r = r.slice(1) || "*", (e[r] = e[r] || []).unshift(n)) : (e[r] = e[r] || []).push(n)
        }
    }

    function Et(e, t, n, r) {
        var i = {},
            o = e === kt;

        function a(s) {
            var l;
            return i[s] = !0, b.each(e[s] || [], function (e, s) {
                var u = s(t, n, r);
                return "string" != typeof u || o || i[u] ? o ? !(l = u) : void 0 : (t.dataTypes.unshift(u), a(u), !1)
            }), l
        }
        return a(t.dataTypes[0]) || !i["*"] && a("*")
    }

    function At(e, n) {
        var r, i, o = b.ajaxSettings.flatOptions || {};
        for (i in n) n[i] !== t && ((o[i] ? e : r || (r = {}))[i] = n[i]);
        return r && b.extend(!0, e, r), e
    }
    pt = wt.exec(ft.toLowerCase()) || [], b.fn.load = function (e, n, r) {
        if ("string" != typeof e && Ct) return Ct.apply(this, arguments);
        var i, o, a, s = this,
            l = e.indexOf(" ");
        return l >= 0 && (i = e.slice(l, e.length), e = e.slice(0, l)), b.isFunction(n) ? (r = n, n = t) : n && "object" == typeof n && (a = "POST"), s.length > 0 && b.ajax({
            url: e,
            type: a,
            dataType: "html",
            data: n
        }).done(function (e) {
            o = arguments, s.html(i ? b("<div>").append(b.parseHTML(e)).find(i) : e)
        }).complete(r && function (e, t) {
            s.each(r, o || [e.responseText, t, e])
        }), this
    }, b.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (e, t) {
        b.fn[t] = function (e) {
            return this.on(t, e)
        }
    }), b.each(["get", "post"], function (e, n) {
        b[n] = function (e, r, i, o) {
            return b.isFunction(r) && (o = o || i, i = r, r = t), b.ajax({
                url: e,
                type: n,
                dataType: o,
                data: r,
                success: i
            })
        }
    }), b.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: ft,
            type: "GET",
            isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(pt[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": St,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText"
            },
            converters: {
                "* text": e.String,
                "text html": !0,
                "text json": b.parseJSON,
                "text xml": b.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function (e, t) {
            return t ? At(At(e, b.ajaxSettings), t) : At(b.ajaxSettings, e)
        },
        ajaxPrefilter: Nt(Tt),
        ajaxTransport: Nt(kt),
        ajax: function (e, n) {
            "object" == typeof e && (n = e, e = t), n = n || {};
            var r, i, o, a, s, l, u, c, d = b.ajaxSetup({}, n),
                p = d.context || d,
                f = d.context && (p.nodeType || p.jquery) ? b(p) : b.event,
                h = b.Deferred(),
                g = b.Callbacks("once memory"),
                m = d.statusCode || {},
                y = {},
                v = {},
                x = 0,
                C = "canceled",
                T = {
                    readyState: 0,
                    getResponseHeader: function (e) {
                        var t;
                        if (2 === x) {
                            if (!c)
                                for (c = {}; t = vt.exec(a);) c[t[1].toLowerCase()] = t[2];
                            t = c[e.toLowerCase()]
                        }
                        return null == t ? null : t
                    },
                    getAllResponseHeaders: function () {
                        return 2 === x ? a : null
                    },
                    setRequestHeader: function (e, t) {
                        var n = e.toLowerCase();
                        return x || (e = v[n] = v[n] || e, y[e] = t), this
                    },
                    overrideMimeType: function (e) {
                        return x || (d.mimeType = e), this
                    },
                    statusCode: function (e) {
                        var t;
                        if (e)
                            if (x < 2)
                                for (t in e) m[t] = [m[t], e[t]];
                            else T.always(e[T.status]);
                        return this
                    },
                    abort: function (e) {
                        var t = e || C;
                        return u && u.abort(t), k(0, t), this
                    }
                };
            if (h.promise(T).complete = g.add, T.success = T.done, T.error = T.fail, d.url = ((e || d.url || ft) + "").replace(mt, "").replace(xt, pt[1] + "//"), d.type = n.method || n.type || d.method || d.type, d.dataTypes = b.trim(d.dataType || "*").toLowerCase().match(w) || [""], null == d.crossDomain && (r = wt.exec(d.url.toLowerCase()), d.crossDomain = !(!r || r[1] === pt[1] && r[2] === pt[2] && (r[3] || ("http:" === r[1] ? 80 : 443)) == (pt[3] || ("http:" === pt[1] ? 80 : 443)))), d.data && d.processData && "string" != typeof d.data && (d.data = b.param(d.data, d.traditional)), Et(Tt, d, n, T), 2 === x) return T;
            for (i in (l = d.global) && 0 == b.active++ && b.event.trigger("ajaxStart"), d.type = d.type.toUpperCase(), d.hasContent = !bt.test(d.type), o = d.url, d.hasContent || (d.data && (o = d.url += (gt.test(o) ? "&" : "?") + d.data, delete d.data), !1 === d.cache && (d.url = yt.test(o) ? o.replace(yt, "$1_=" + ht++) : o + (gt.test(o) ? "&" : "?") + "_=" + ht++)), d.ifModified && (b.lastModified[o] && T.setRequestHeader("If-Modified-Since", b.lastModified[o]), b.etag[o] && T.setRequestHeader("If-None-Match", b.etag[o])), (d.data && d.hasContent && !1 !== d.contentType || n.contentType) && T.setRequestHeader("Content-Type", d.contentType), T.setRequestHeader("Accept", d.dataTypes[0] && d.accepts[d.dataTypes[0]] ? d.accepts[d.dataTypes[0]] + ("*" !== d.dataTypes[0] ? ", " + St + "; q=0.01" : "") : d.accepts["*"]), d.headers) T.setRequestHeader(i, d.headers[i]);
            if (d.beforeSend && (!1 === d.beforeSend.call(p, T, d) || 2 === x)) return T.abort();
            for (i in C = "abort", {
                    success: 1,
                    error: 1,
                    complete: 1
                }) T[i](d[i]);
            if (u = Et(kt, d, n, T)) {
                T.readyState = 1, l && f.trigger("ajaxSend", [T, d]), d.async && d.timeout > 0 && (s = setTimeout(function () {
                    T.abort("timeout")
                }, d.timeout));
                try {
                    x = 1, u.send(y, k)
                } catch (e) {
                    if (!(x < 2)) throw e;
                    k(-1, e)
                }
            } else k(-1, "No Transport");

            function k(e, n, r, i) {
                var c, y, v, w, C, k = n;
                2 !== x && (x = 2, s && clearTimeout(s), u = t, a = i || "", T.readyState = e > 0 ? 4 : 0, r && (w = function (e, n, r) {
                    var i, o, a, s, l = e.contents,
                        u = e.dataTypes,
                        c = e.responseFields;
                    for (s in c) s in r && (n[c[s]] = r[s]);
                    for (;
                        "*" === u[0];) u.shift(), o === t && (o = e.mimeType || n.getResponseHeader("Content-Type"));
                    if (o)
                        for (s in l)
                            if (l[s] && l[s].test(o)) {
                                u.unshift(s);
                                break
                            }
                    if (u[0] in r) a = u[0];
                    else {
                        for (s in r) {
                            if (!u[0] || e.converters[s + " " + u[0]]) {
                                a = s;
                                break
                            }
                            i || (i = s)
                        }
                        a = a || i
                    }
                    if (a) return a !== u[0] && u.unshift(a), r[a]
                }(d, T, r)), e >= 200 && e < 300 || 304 === e ? (d.ifModified && ((C = T.getResponseHeader("Last-Modified")) && (b.lastModified[o] = C), (C = T.getResponseHeader("etag")) && (b.etag[o] = C)), 204 === e ? (c = !0, k = "nocontent") : 304 === e ? (c = !0, k = "notmodified") : (k = (c = function (e, t) {
                    var n, r, i, o, a = {},
                        s = 0,
                        l = e.dataTypes.slice(),
                        u = l[0];
                    e.dataFilter && (t = e.dataFilter(t, e.dataType));
                    if (l[1])
                        for (i in e.converters) a[i.toLowerCase()] = e.converters[i];
                    for (; r = l[++s];)
                        if ("*" !== r) {
                            if ("*" !== u && u !== r) {
                                if (!(i = a[u + " " + r] || a["* " + r]))
                                    for (n in a)
                                        if ((o = n.split(" "))[1] === r && (i = a[u + " " + o[0]] || a["* " + o[0]])) {
                                            !0 === i ? i = a[n] : !0 !== a[n] && (r = o[0], l.splice(s--, 0, r));
                                            break
                                        }
                                if (!0 !== i)
                                    if (i && e.throws) t = i(t);
                                    else try {
                                        t = i(t)
                                    } catch (e) {
                                        return {
                                            state: "parsererror",
                                            error: i ? e : "No conversion from " + u + " to " + r
                                        }
                                    }
                            }
                            u = r
                        }
                    return {
                        state: "success",
                        data: t
                    }
                }(d, w)).state, y = c.data, c = !(v = c.error))) : (v = k, !e && k || (k = "error", e < 0 && (e = 0))), T.status = e, T.statusText = (n || k) + "", c ? h.resolveWith(p, [y, k, T]) : h.rejectWith(p, [T, k, v]), T.statusCode(m), m = t, l && f.trigger(c ? "ajaxSuccess" : "ajaxError", [T, d, c ? y : v]), g.fireWith(p, [T, k]), l && (f.trigger("ajaxComplete", [T, d]), --b.active || b.event.trigger("ajaxStop")))
            }
            return T
        },
        getScript: function (e, n) {
            return b.get(e, t, n, "script")
        },
        getJSON: function (e, t, n) {
            return b.get(e, t, n, "json")
        }
    }), b.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /(?:java|ecma)script/
        },
        converters: {
            "text script": function (e) {
                return b.globalEval(e), e
            }
        }
    }), b.ajaxPrefilter("script", function (e) {
        e.cache === t && (e.cache = !1), e.crossDomain && (e.type = "GET", e.global = !1)
    }), b.ajaxTransport("script", function (e) {
        if (e.crossDomain) {
            var n, r = o.head || b("head")[0] || o.documentElement;
            return {
                send: function (t, i) {
                    (n = o.createElement("script")).async = !0, e.scriptCharset && (n.charset = e.scriptCharset), n.src = e.url, n.onload = n.onreadystatechange = function (e, t) {
                        (t || !n.readyState || /loaded|complete/.test(n.readyState)) && (n.onload = n.onreadystatechange = null, n.parentNode && n.parentNode.removeChild(n), n = null, t || i(200, "success"))
                    }, r.insertBefore(n, r.firstChild)
                },
                abort: function () {
                    n && n.onload(t, !0)
                }
            }
        }
    });
    var _t = [],
        jt = /(=)\?(?=&|$)|\?\?/;
    b.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function () {
            var e = _t.pop() || b.expando + "_" + ht++;
            return this[e] = !0, e
        }
    }), b.ajaxPrefilter("json jsonp", function (n, r, i) {
        var o, a, s, l = !1 !== n.jsonp && (jt.test(n.url) ? "url" : "string" == typeof n.data && !(n.contentType || "").indexOf("application/x-www-form-urlencoded") && jt.test(n.data) && "data");
        if (l || "jsonp" === n.dataTypes[0]) return o = n.jsonpCallback = b.isFunction(n.jsonpCallback) ? n.jsonpCallback() : n.jsonpCallback, l ? n[l] = n[l].replace(jt, "$1" + o) : !1 !== n.jsonp && (n.url += (gt.test(n.url) ? "&" : "?") + n.jsonp + "=" + o), n.converters["script json"] = function () {
            return s || b.error(o + " was not called"), s[0]
        }, n.dataTypes[0] = "json", a = e[o], e[o] = function () {
            s = arguments
        }, i.always(function () {
            e[o] = a, n[o] && (n.jsonpCallback = r.jsonpCallback, _t.push(o)), s && b.isFunction(a) && a(s[0]), s = a = t
        }), "script"
    });
    var Lt, $t, Dt = 0,
        Ht = e.ActiveXObject && function () {
            var e;
            for (e in Lt) Lt[e](t, !0)
        };

    function It() {
        try {
            return new e.XMLHttpRequest
        } catch (e) {}
    }
    b.ajaxSettings.xhr = e.ActiveXObject ? function () {
        return !this.isLocal && It() || function () {
            try {
                return new e.ActiveXObject("Microsoft.XMLHTTP")
            } catch (e) {}
        }()
    } : It, $t = b.ajaxSettings.xhr(), b.support.cors = !!$t && "withCredentials" in $t, ($t = b.support.ajax = !!$t) && b.ajaxTransport(function (n) {
        var r;
        if (!n.crossDomain || b.support.cors) return {
            send: function (i, o) {
                var a, s, l = n.xhr();
                if (n.username ? l.open(n.type, n.url, n.async, n.username, n.password) : l.open(n.type, n.url, n.async), n.xhrFields)
                    for (s in n.xhrFields) l[s] = n.xhrFields[s];
                n.mimeType && l.overrideMimeType && l.overrideMimeType(n.mimeType), n.crossDomain || i["X-Requested-With"] || (i["X-Requested-With"] = "XMLHttpRequest");
                try {
                    for (s in i) l.setRequestHeader(s, i[s])
                } catch (e) {}
                l.send(n.hasContent && n.data || null), r = function (e, i) {
                    var s, u, c, d;
                    try {
                        if (r && (i || 4 === l.readyState))
                            if (r = t, a && (l.onreadystatechange = b.noop, Ht && delete Lt[a]), i) 4 !== l.readyState && l.abort();
                            else {
                                d = {}, s = l.status, u = l.getAllResponseHeaders(), "string" == typeof l.responseText && (d.text = l.responseText);
                                try {
                                    c = l.statusText
                                } catch (e) {
                                    c = ""
                                }
                                s || !n.isLocal || n.crossDomain ? 1223 === s && (s = 204) : s = d.text ? 200 : 404
                            }
                    } catch (e) {
                        i || o(-1, e)
                    }
                    d && o(s, c, d, u)
                }, n.async ? 4 === l.readyState ? setTimeout(r) : (a = ++Dt, Ht && (Lt || (Lt = {}, b(e).unload(Ht)), Lt[a] = r), l.onreadystatechange = r) : r()
            },
            abort: function () {
                r && r(t, !0)
            }
        }
    });
    var Pt, Ot, qt = /^(?:toggle|show|hide)$/,
        Bt = new RegExp("^(?:([+-])=|)(" + x + ")([a-z%]*)$", "i"),
        Mt = /queueHooks$/,
        Ft = [function (e, t, n) {
            var r, i, o, a, s, l, u, c, d, p = this,
                f = e.style,
                h = {},
                g = [],
                m = e.nodeType && Ge(e);
            n.queue || (null == (c = b._queueHooks(e, "fx")).unqueued && (c.unqueued = 0, d = c.empty.fire, c.empty.fire = function () {
                c.unqueued || d()
            }), c.unqueued++, p.always(function () {
                p.always(function () {
                    c.unqueued--, b.queue(e, "fx").length || c.empty.fire()
                })
            }));
            1 === e.nodeType && ("height" in t || "width" in t) && (n.overflow = [f.overflow, f.overflowX, f.overflowY], "inline" === b.css(e, "display") && "none" === b.css(e, "float") && (b.support.inlineBlockNeedsLayout && "inline" !== it(e.nodeName) ? f.zoom = 1 : f.display = "inline-block"));
            n.overflow && (f.overflow = "hidden", b.support.shrinkWrapBlocks || p.always(function () {
                f.overflow = n.overflow[0], f.overflowX = n.overflow[1], f.overflowY = n.overflow[2]
            }));
            for (i in t)
                if (a = t[i], qt.exec(a)) {
                    if (delete t[i], l = l || "toggle" === a, a === (m ? "hide" : "show")) continue;
                    g.push(i)
                }
            if (o = g.length) {
                "hidden" in (s = b._data(e, "fxshow") || b._data(e, "fxshow", {})) && (m = s.hidden), l && (s.hidden = !m), m ? b(e).show() : p.done(function () {
                    b(e).hide()
                }), p.done(function () {
                    var t;
                    for (t in b._removeData(e, "fxshow"), h) b.style(e, t, h[t])
                });
                for (i = 0; i < o; i++) r = g[i], u = p.createTween(r, m ? s[r] : 0), h[r] = s[r] || b.style(e, r), r in s || (s[r] = u.start, m && (u.end = u.start, u.start = "width" === r || "height" === r ? 1 : 0))
            }
        }],
        Rt = {
            "*": [function (e, t) {
                var n, r, i = this.createTween(e, t),
                    o = Bt.exec(t),
                    a = i.cur(),
                    s = +a || 0,
                    l = 1,
                    u = 20;
                if (o) {
                    if (n = +o[2], "px" !== (r = o[3] || (b.cssNumber[e] ? "" : "px")) && s) {
                        s = b.css(i.elem, e, !0) || n || 1;
                        do {
                            s /= l = l || ".5", b.style(i.elem, e, s + r)
                        } while (l !== (l = i.cur() / a) && 1 !== l && --u)
                    }
                    i.unit = r, i.start = s, i.end = o[1] ? s + (o[1] + 1) * n : n
                }
                return i
            }]
        };

    function Wt() {
        return setTimeout(function () {
            Pt = t
        }), Pt = b.now()
    }

    function zt(e, t, n) {
        var r, i, o, a, s = 0,
            l = Ft.length,
            u = b.Deferred().always(function () {
                delete c.elem
            }),
            c = function () {
                if (i) return !1;
                for (var t = Pt || Wt(), n = Math.max(0, d.startTime + d.duration - t), r = 1 - (n / d.duration || 0), o = 0, a = d.tweens.length; o < a; o++) d.tweens[o].run(r);
                return u.notifyWith(e, [d, r, n]), r < 1 && a ? n : (u.resolveWith(e, [d]), !1)
            },
            d = u.promise({
                elem: e,
                props: b.extend({}, t),
                opts: b.extend(!0, {
                    specialEasing: {}
                }, n),
                originalProperties: t,
                originalOptions: n,
                startTime: Pt || Wt(),
                duration: n.duration,
                tweens: [],
                createTween: function (t, n) {
                    var r = b.Tween(e, d.opts, t, n, d.opts.specialEasing[t] || d.opts.easing);
                    return d.tweens.push(r), r
                },
                stop: function (t) {
                    var n = 0,
                        r = t ? d.tweens.length : 0;
                    if (i) return this;
                    for (i = !0; n < r; n++) d.tweens[n].run(1);
                    return t ? u.resolveWith(e, [d, t]) : u.rejectWith(e, [d, t]), this
                }
            }),
            p = d.props;
        for (! function (e, t) {
                var n, r, i, o, a;
                for (i in e)
                    if (r = b.camelCase(i), o = t[r], n = e[i], b.isArray(n) && (o = n[1], n = e[i] = n[0]), i !== r && (e[r] = n, delete e[i]), (a = b.cssHooks[r]) && "expand" in a)
                        for (i in n = a.expand(n), delete e[r], n) i in e || (e[i] = n[i], t[i] = o);
                    else t[r] = o
            }(p, d.opts.specialEasing); s < l; s++)
            if (r = Ft[s].call(d, e, p, d.opts)) return r;
        return o = d, a = p, b.each(a, function (e, t) {
            for (var n = (Rt[e] || []).concat(Rt["*"]), r = 0, i = n.length; r < i; r++)
                if (n[r].call(o, e, t)) return
        }), b.isFunction(d.opts.start) && d.opts.start.call(e, d), b.fx.timer(b.extend(c, {
            elem: e,
            anim: d,
            queue: d.opts.queue
        })), d.progress(d.opts.progress).done(d.opts.done, d.opts.complete).fail(d.opts.fail).always(d.opts.always)
    }

    function Ut(e, t, n, r, i) {
        return new Ut.prototype.init(e, t, n, r, i)
    }

    function Xt(e, t) {
        var n, r = {
                height: e
            },
            i = 0;
        for (t = t ? 1 : 0; i < 4; i += 2 - t) r["margin" + (n = Je[i])] = r["padding" + n] = e;
        return t && (r.opacity = r.width = e), r
    }

    function Qt(e) {
        return b.isWindow(e) ? e : 9 === e.nodeType && (e.defaultView || e.parentWindow)
    }
    b.Animation = b.extend(zt, {
        tweener: function (e, t) {
            b.isFunction(e) ? (t = e, e = ["*"]) : e = e.split(" ");
            for (var n, r = 0, i = e.length; r < i; r++) n = e[r], Rt[n] = Rt[n] || [], Rt[n].unshift(t)
        },
        prefilter: function (e, t) {
            t ? Ft.unshift(e) : Ft.push(e)
        }
    }), b.Tween = Ut, Ut.prototype = {
        constructor: Ut,
        init: function (e, t, n, r, i, o) {
            this.elem = e, this.prop = n, this.easing = i || "swing", this.options = t, this.start = this.now = this.cur(), this.end = r, this.unit = o || (b.cssNumber[n] ? "" : "px")
        },
        cur: function () {
            var e = Ut.propHooks[this.prop];
            return e && e.get ? e.get(this) : Ut.propHooks._default.get(this)
        },
        run: function (e) {
            var t, n = Ut.propHooks[this.prop];
            return this.options.duration ? this.pos = t = b.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : Ut.propHooks._default.set(this), this
        }
    }, Ut.prototype.init.prototype = Ut.prototype, Ut.propHooks = {
        _default: {
            get: function (e) {
                var t;
                return null == e.elem[e.prop] || e.elem.style && null != e.elem.style[e.prop] ? (t = b.css(e.elem, e.prop, "")) && "auto" !== t ? t : 0 : e.elem[e.prop]
            },
            set: function (e) {
                b.fx.step[e.prop] ? b.fx.step[e.prop](e) : e.elem.style && (null != e.elem.style[b.cssProps[e.prop]] || b.cssHooks[e.prop]) ? b.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now
            }
        }
    }, Ut.propHooks.scrollTop = Ut.propHooks.scrollLeft = {
        set: function (e) {
            e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
        }
    }, b.each(["toggle", "show", "hide"], function (e, t) {
        var n = b.fn[t];
        b.fn[t] = function (e, r, i) {
            return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(Xt(t, !0), e, r, i)
        }
    }), b.fn.extend({
        fadeTo: function (e, t, n, r) {
            return this.filter(Ge).css("opacity", 0).show().end().animate({
                opacity: t
            }, e, n, r)
        },
        animate: function (e, t, n, r) {
            var i = b.isEmptyObject(e),
                o = b.speed(t, n, r),
                a = function () {
                    var t = zt(this, b.extend({}, e), o);
                    a.finish = function () {
                        t.stop(!0)
                    }, (i || b._data(this, "finish")) && t.stop(!0)
                };
            return a.finish = a, i || !1 === o.queue ? this.each(a) : this.queue(o.queue, a)
        },
        stop: function (e, n, r) {
            var i = function (e) {
                var t = e.stop;
                delete e.stop, t(r)
            };
            return "string" != typeof e && (r = n, n = e, e = t), n && !1 !== e && this.queue(e || "fx", []), this.each(function () {
                var t = !0,
                    n = null != e && e + "queueHooks",
                    o = b.timers,
                    a = b._data(this);
                if (n) a[n] && a[n].stop && i(a[n]);
                else
                    for (n in a) a[n] && a[n].stop && Mt.test(n) && i(a[n]);
                for (n = o.length; n--;) o[n].elem !== this || null != e && o[n].queue !== e || (o[n].anim.stop(r), t = !1, o.splice(n, 1));
                !t && r || b.dequeue(this, e)
            })
        },
        finish: function (e) {
            return !1 !== e && (e = e || "fx"), this.each(function () {
                var t, n = b._data(this),
                    r = n[e + "queue"],
                    i = n[e + "queueHooks"],
                    o = b.timers,
                    a = r ? r.length : 0;
                for (n.finish = !0, b.queue(this, e, []), i && i.cur && i.cur.finish && i.cur.finish.call(this), t = o.length; t--;) o[t].elem === this && o[t].queue === e && (o[t].anim.stop(!0), o.splice(t, 1));
                for (t = 0; t < a; t++) r[t] && r[t].finish && r[t].finish.call(this);
                delete n.finish
            })
        }
    }), b.each({
        slideDown: Xt("show"),
        slideUp: Xt("hide"),
        slideToggle: Xt("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function (e, t) {
        b.fn[e] = function (e, n, r) {
            return this.animate(t, e, n, r)
        }
    }), b.speed = function (e, t, n) {
        var r = e && "object" == typeof e ? b.extend({}, e) : {
            complete: n || !n && t || b.isFunction(e) && e,
            duration: e,
            easing: n && t || t && !b.isFunction(t) && t
        };
        return r.duration = b.fx.off ? 0 : "number" == typeof r.duration ? r.duration : r.duration in b.fx.speeds ? b.fx.speeds[r.duration] : b.fx.speeds._default, null != r.queue && !0 !== r.queue || (r.queue = "fx"), r.old = r.complete, r.complete = function () {
            b.isFunction(r.old) && r.old.call(this), r.queue && b.dequeue(this, r.queue)
        }, r
    }, b.easing = {
        linear: function (e) {
            return e
        },
        swing: function (e) {
            return .5 - Math.cos(e * Math.PI) / 2
        }
    }, b.timers = [], b.fx = Ut.prototype.init, b.fx.tick = function () {
        var e, n = b.timers,
            r = 0;
        for (Pt = b.now(); r < n.length; r++)(e = n[r])() || n[r] !== e || n.splice(r--, 1);
        n.length || b.fx.stop(), Pt = t
    }, b.fx.timer = function (e) {
        e() && b.timers.push(e) && b.fx.start()
    }, b.fx.interval = 13, b.fx.start = function () {
        Ot || (Ot = setInterval(b.fx.tick, b.fx.interval))
    }, b.fx.stop = function () {
        clearInterval(Ot), Ot = null
    }, b.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    }, b.fx.step = {}, b.expr && b.expr.filters && (b.expr.filters.animated = function (e) {
        return b.grep(b.timers, function (t) {
            return e === t.elem
        }).length
    }), b.fn.offset = function (e) {
        if (arguments.length) return e === t ? this : this.each(function (t) {
            b.offset.setOffset(this, e, t)
        });
        var n, r, o = {
                top: 0,
                left: 0
            },
            a = this[0],
            s = a && a.ownerDocument;
        return s ? (n = s.documentElement, b.contains(n, a) ? (typeof a.getBoundingClientRect !== i && (o = a.getBoundingClientRect()), r = Qt(s), {
            top: o.top + (r.pageYOffset || n.scrollTop) - (n.clientTop || 0),
            left: o.left + (r.pageXOffset || n.scrollLeft) - (n.clientLeft || 0)
        }) : o) : void 0
    }, b.offset = {
        setOffset: function (e, t, n) {
            var r = b.css(e, "position");
            "static" === r && (e.style.position = "relative");
            var i, o, a = b(e),
                s = a.offset(),
                l = b.css(e, "top"),
                u = b.css(e, "left"),
                c = {},
                d = {};
            ("absolute" === r || "fixed" === r) && b.inArray("auto", [l, u]) > -1 ? (i = (d = a.position()).top, o = d.left) : (i = parseFloat(l) || 0, o = parseFloat(u) || 0), b.isFunction(t) && (t = t.call(e, n, s)), null != t.top && (c.top = t.top - s.top + i), null != t.left && (c.left = t.left - s.left + o), "using" in t ? t.using.call(e, c) : a.css(c)
        }
    }, b.fn.extend({
        position: function () {
            if (this[0]) {
                var e, t, n = {
                        top: 0,
                        left: 0
                    },
                    r = this[0];
                return "fixed" === b.css(r, "position") ? t = r.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), b.nodeName(e[0], "html") || (n = e.offset()), n.top += b.css(e[0], "borderTopWidth", !0), n.left += b.css(e[0], "borderLeftWidth", !0)), {
                    top: t.top - n.top - b.css(r, "marginTop", !0),
                    left: t.left - n.left - b.css(r, "marginLeft", !0)
                }
            }
        },
        offsetParent: function () {
            return this.map(function () {
                for (var e = this.offsetParent || o.documentElement; e && !b.nodeName(e, "html") && "static" === b.css(e, "position");) e = e.offsetParent;
                return e || o.documentElement
            })
        }
    }), b.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function (e, n) {
        var r = /Y/.test(n);
        b.fn[e] = function (i) {
            return b.access(this, function (e, i, o) {
                var a = Qt(e);
                if (o === t) return a ? n in a ? a[n] : a.document.documentElement[i] : e[i];
                a ? a.scrollTo(r ? b(a).scrollLeft() : o, r ? o : b(a).scrollTop()) : e[i] = o
            }, e, i, arguments.length, null)
        }
    }), b.each({
        Height: "height",
        Width: "width"
    }, function (e, n) {
        b.each({
            padding: "inner" + e,
            content: n,
            "": "outer" + e
        }, function (r, i) {
            b.fn[i] = function (i, o) {
                var a = arguments.length && (r || "boolean" != typeof i),
                    s = r || (!0 === i || !0 === o ? "margin" : "border");
                return b.access(this, function (n, r, i) {
                    var o;
                    return b.isWindow(n) ? n.document.documentElement["client" + e] : 9 === n.nodeType ? (o = n.documentElement, Math.max(n.body["scroll" + e], o["scroll" + e], n.body["offset" + e], o["offset" + e], o["client" + e])) : i === t ? b.css(n, r, s) : b.style(n, r, i, s)
                }, n, a ? i : t, a, null)
            }
        })
    }), e.jQuery = e.$ = b, "function" == typeof define && define.amd && define.amd.jQuery && define("jquery", [], function () {
        return b
    })
}(window),
function (e, t, n) {
    var r = {};

    function i(n) {
        r[n] || (r[n] = !0, e.migrateWarnings.push(n), t.console && console.warn && !e.migrateMute && (console.warn("JQMIGRATE: " + n), e.migrateTrace && console.trace && console.trace()))
    }

    function o(t, n, r, o) {
        if (Object.defineProperty) try {
            return void Object.defineProperty(t, n, {
                configurable: !0,
                enumerable: !0,
                get: function () {
                    return i(o), r
                },
                set: function (e) {
                    i(o), r = e
                }
            })
        } catch (e) {}
        e._definePropertyBroken = !0, t[n] = r
    }
    e.migrateWarnings = [], !e.migrateMute && t.console && console.log && console.log("JQMIGRATE: Logging is active"), e.migrateTrace === n && (e.migrateTrace = !0), e.migrateReset = function () {
        r = {}, e.migrateWarnings.length = 0
    }, "BackCompat" === document.compatMode && i("jQuery is not compatible with Quirks Mode");
    var a = e("<input/>", {
            size: 1
        }).attr("size") && e.attrFn,
        s = e.attr,
        l = e.attrHooks.value && e.attrHooks.value.get || function () {
            return null
        },
        u = e.attrHooks.value && e.attrHooks.value.set || function () {
            return n
        },
        c = /^(?:input|button)$/i,
        d = /^[238]$/,
        p = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
        f = /^(?:checked|selected)$/i;
    o(e, "attrFn", a || {}, "jQuery.attrFn is deprecated"), e.attr = function (t, r, o, l) {
        var u = r.toLowerCase(),
            h = t && t.nodeType;
        return l && (s.length < 4 && i("jQuery.fn.attr( props, pass ) is deprecated"), t && !d.test(h) && (a ? r in a : e.isFunction(e.fn[r]))) ? e(t)[r](o) : ("type" === r && o !== n && c.test(t.nodeName) && t.parentNode && i("Can't change the 'type' of an input or button in IE 6/7/8"), !e.attrHooks[u] && p.test(u) && (e.attrHooks[u] = {
            get: function (t, r) {
                var i, o = e.prop(t, r);
                return !0 === o || "boolean" != typeof o && (i = t.getAttributeNode(r)) && !1 !== i.nodeValue ? r.toLowerCase() : n
            },
            set: function (t, n, r) {
                var i;
                return !1 === n ? e.removeAttr(t, r) : ((i = e.propFix[r] || r) in t && (t[i] = !0), t.setAttribute(r, r.toLowerCase())), r
            }
        }, f.test(u) && i("jQuery.fn.attr('" + u + "') may use property instead of attribute")), s.call(e, t, r, o))
    }, e.attrHooks.value = {
        get: function (e, t) {
            var n = (e.nodeName || "").toLowerCase();
            return "button" === n ? l.apply(this, arguments) : ("input" !== n && "option" !== n && i("jQuery.fn.attr('value') no longer gets properties"), t in e ? e.value : null)
        },
        set: function (e, t) {
            var n = (e.nodeName || "").toLowerCase();
            if ("button" === n) return u.apply(this, arguments);
            "input" !== n && "option" !== n && i("jQuery.fn.attr('value', val) no longer sets properties"), e.value = t
        }
    };
    var h, g, m = e.fn.init,
        y = e.parseJSON,
        v = /^(?:[^<]*(<[\w\W]+>)[^>]*|#([\w\-]*))$/;
    e.fn.init = function (t, n, r) {
        var o;
        return t && "string" == typeof t && !e.isPlainObject(n) && (o = v.exec(t)) && o[1] && ("<" !== t.charAt(0) && i("$(html) HTML strings must start with '<' character"), n && n.context && (n = n.context), e.parseHTML) ? m.call(this, e.parseHTML(e.trim(t), n, !0), n, r) : m.apply(this, arguments)
    }, e.fn.init.prototype = e.fn, e.parseJSON = function (e) {
        return e || null === e ? y.apply(this, arguments) : (i("jQuery.parseJSON requires a valid JSON string"), null)
    }, e.uaMatch = function (e) {
        e = e.toLowerCase();
        var t = /(chrome)[ \/]([\w.]+)/.exec(e) || /(webkit)[ \/]([\w.]+)/.exec(e) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e) || /(msie) ([\w.]+)/.exec(e) || e.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e) || [];
        return {
            browser: t[1] || "",
            version: t[2] || "0"
        }
    }, e.browser || (g = {}, (h = e.uaMatch(navigator.userAgent)).browser && (g[h.browser] = !0, g.version = h.version), g.chrome ? g.webkit = !0 : g.webkit && (g.safari = !0), e.browser = g), o(e, "browser", e.browser, "jQuery.browser is deprecated"), e.sub = function () {
        function t(e, n) {
            return new t.fn.init(e, n)
        }
        e.extend(!0, t, this), t.superclass = this, t.fn = t.prototype = this(), t.fn.constructor = t, t.sub = this.sub, t.fn.init = function (r, i) {
            return i && i instanceof e && !(i instanceof t) && (i = t(i)), e.fn.init.call(this, r, i, n)
        }, t.fn.init.prototype = t.fn;
        var n = t(document);
        return i("jQuery.sub() is deprecated"), t
    }, e.ajaxSetup({
        converters: {
            "text json": e.parseJSON
        }
    });
    var b = e.fn.data;
    e.fn.data = function (t) {
        var r, o, a = this[0];
        return !a || "events" !== t || 1 !== arguments.length || (r = e.data(a, t), o = e._data(a, t), r !== n && r !== o || o === n) ? b.apply(this, arguments) : (i("Use of jQuery.fn.data('events') is deprecated"), o)
    };
    var x = /\/(java|ecma)script/i,
        w = e.fn.andSelf || e.fn.addBack;
    e.fn.andSelf = function () {
        return i("jQuery.fn.andSelf() replaced by jQuery.fn.addBack()"), w.apply(this, arguments)
    }, e.clean || (e.clean = function (t, n, r, o) {
        n = (n = !(n = n || document).nodeType && n[0] || n).ownerDocument || n, i("jQuery.clean() is deprecated");
        var a, s, l, u, c = [];
        if (e.merge(c, e.buildFragment(t, n).childNodes), r)
            for (l = function (e) {
                    if (!e.type || x.test(e.type)) return o ? o.push(e.parentNode ? e.parentNode.removeChild(e) : e) : r.appendChild(e)
                }, a = 0; null != (s = c[a]); a++) e.nodeName(s, "script") && l(s) || (r.appendChild(s), void 0 !== s.getElementsByTagName && (u = e.grep(e.merge([], s.getElementsByTagName("script")), l), c.splice.apply(c, [a + 1, 0].concat(u)), a += u.length));
        return c
    });
    var C = e.event.add,
        T = e.event.remove,
        k = e.event.trigger,
        S = e.fn.toggle,
        N = e.fn.live,
        E = e.fn.die,
        A = "ajaxStart|ajaxStop|ajaxSend|ajaxComplete|ajaxError|ajaxSuccess",
        _ = new RegExp("\\b(?:" + A + ")\\b"),
        j = /(?:^|\s)hover(\.\S+|)\b/,
        L = function (t) {
            return "string" != typeof t || e.event.special.hover ? t : (j.test(t) && i("'hover' pseudo-event is deprecated, use 'mouseenter mouseleave'"), t && t.replace(j, "mouseenter$1 mouseleave$1"))
        };
    e.event.props && "attrChange" !== e.event.props[0] && e.event.props.unshift("attrChange", "attrName", "relatedNode", "srcElement"), e.event.dispatch && o(e.event, "handle", e.event.dispatch, "jQuery.event.handle is undocumented and deprecated"), e.event.add = function (e, t, n, r, o) {
        e !== document && _.test(t) && i("AJAX events should be attached to document: " + t), C.call(this, e, L(t || ""), n, r, o)
    }, e.event.remove = function (e, t, n, r, i) {
        T.call(this, e, L(t) || "", n, r, i)
    }, e.fn.error = function () {
        var e = Array.prototype.slice.call(arguments, 0);
        return i("jQuery.fn.error() is deprecated"), e.splice(0, 0, "error"), arguments.length ? this.bind.apply(this, e) : (this.triggerHandler.apply(this, e), this)
    }, e.fn.toggle = function (t, n) {
        if (!e.isFunction(t) || !e.isFunction(n)) return S.apply(this, arguments);
        i("jQuery.fn.toggle(handler, handler...) is deprecated");
        var r = arguments,
            o = t.guid || e.guid++,
            a = 0,
            s = function (n) {
                var i = (e._data(this, "lastToggle" + t.guid) || 0) % a;
                return e._data(this, "lastToggle" + t.guid, i + 1), n.preventDefault(), r[i].apply(this, arguments) || !1
            };
        for (s.guid = o; a < r.length;) r[a++].guid = o;
        return this.click(s)
    }, e.fn.live = function (t, n, r) {
        return i("jQuery.fn.live() is deprecated"), N ? N.apply(this, arguments) : (e(this.context).on(t, this.selector, n, r), this)
    }, e.fn.die = function (t, n) {
        return i("jQuery.fn.die() is deprecated"), E ? E.apply(this, arguments) : (e(this.context).off(t, this.selector || "**", n), this)
    }, e.event.trigger = function (e, t, n, r) {
        return n || _.test(e) || i("Global events are undocumented and deprecated"), k.call(this, e, t, n || document, r)
    }, e.each(A.split("|"), function (t, n) {
        e.event.special[n] = {
            setup: function () {
                var t = this;
                return t !== document && (e.event.add(document, n + "." + e.guid, function () {
                    e.event.trigger(n, null, t, !0)
                }), e._data(this, n, e.guid++)), !1
            },
            teardown: function () {
                return this !== document && e.event.remove(document, n + "." + e._data(this, n)), !1
            }
        }
    })
}(jQuery, window);
var KEY_UP = 38,
    KEY_DOWN = 40,
    KEY_ENTER = 13,
    KEY_A = 65,
    KEY_Z = 90,
    KEY_0 = 48,
    KEY_9 = 57,
    KEY_NUMPAD_0 = 96,
    KEY_NUMPAD_9 = 105,
    timeout = 3e3,
    lastBalance, amsrefreshTimer, loginCount = 0,
    retryCount = 3,
    isReceived = !1,
    sslTimer, useMCS = !navigator.userAgent.match(/Trident.*rv\:11\./) && !$.browser.msie,
    isIE8AndBelow = $.browser.msie && parseInt($.browser.version) <= 8,
    isIE9AndBelow = $.browser.msie && parseInt($.browser.version) <= 9,
    $parentDocument, $parentWindow;
String.prototype.startWith = function (e) {
    return this.match("^" + e) == e
}, String.prototype.trim = function () {
    return this.replace(/^[\s\xA0]+/, "").replace(/[\s\xA0]+$/, "")
}, String.prototype.endWith = function (e) {
    return this.match(e + "$") == e
}, jQuery.cookie = function (e, t, n) {
    if (void 0 === t) {
        var r = null;
        if (document.cookie && "" != document.cookie)
            for (var i = document.cookie.split(";"), o = 0; o < i.length; o++) {
                var a = jQuery.trim(i[o]);
                if (a.substring(0, e.length + 1) == e + "=") {
                    r = decodeURIComponent(a.substring(e.length + 1));
                    break
                }
            }
        return r
    }
    n = n || {}, null === t && (t = "", n.expires = -1);
    var s, l = "";
    n.expires && ("number" == typeof n.expires || n.expires.toUTCString) && ("number" == typeof n.expires ? (s = new Date).setTime(s.getTime() + 24 * n.expires * 60 * 60 * 1e3) : s = n.expires, l = "; expires=" + s.toUTCString());
    var u = n.path ? "; path=" + n.path : "",
        c = n.domain ? "; domain=" + n.domain : "",
        d = n.secure ? "; secure" : "";
    document.cookie = [e, "=", encodeURIComponent(t), l, u, c, d].join("")
};
var StringBuilderEx = Array;
Array.prototype.append = Array.prototype.push, Array.prototype._convertToArray = function (arguments) {
    if (!arguments) return new Array;
    if (arguments.toArray) return arguments.toArray();
    for (var e = arguments.length, t = new Array(e); e--;) t[e] = arguments[e];
    return t
}, Array.prototype.appendFormat = function (e) {
    var t = this._convertToArray(arguments).slice(1);
    this[this.length] = e.replace(/\{(\d+)\}/g, function (e, n) {
        if (void 0 != t[n] || null != t[n]) return t[n].toString()
    })
}, Array.prototype.appendFormatEx = function (e) {
    null == this._parameters && (this._parameters = new Array);
    for (var t = this._convertToArray(arguments).slice(1), n = 0, r = t.length; n < r; n++) this._parameters[this._parameters.length] = t[n];
    this[this.length] = e
}, Array.prototype.toString = function () {
    var e = null != this._parameters;
    if (e = e && this._parameters.length > 0) {
        for (var t = this.join("").split("?"), n = new Array, r = 0, i = t.length; r < i; r++) n[n.length] = t[r], n[n.length] = this._parameters[r];
        return n.join("")
    }
    return this.join("")
}, Array.prototype.indexOf = function (e, t) {
    for (var n = t || 0, r = this.length; n < r; n++)
        if (this[n] === e) return n;
    return -1
}, Array.prototype.unique = function () {
    for (var e = [], t = this.length, n = 0; n < t; n++) {
        for (var r = n + 1; r < t; r++) this[n] === this[r] && (r = ++n);
        e.push(this[n])
    }
    return e
};
var utility = {
        securetimeout: 1e4,
        templateCache: new Object,
        isConsoleLogTemplate: !1,
        stopRequest: !1,
        $error: null,
        $lostConn: null,
        bodyHeight: 0,
        currentRequest: null,
        currentRequestUrl: null,
        abortTimer: null,
        showError: function (e) {
            null == utility.$error && (utility.$error = $("<a href='javascript:void(0)' id='errMsg'>" + new Date + ":Error Occur:Please refresh page</a>").click(function () {
                window.location.href = window.location.href
            }), window.status = new Date)
        },
        showLostConn: function (e) {
            utility.stopRequest = !0, null == utility.$lostConn && (utility.$lostConn = $("<a href='javascript:void(0)' id='errLostConnMsg'>" + new Date + ":Lost connection,Please refresh page</a>").click(function () {
                window.location.href = window.location.href
            }), window.status = new Date)
        },
        template: function (e, t, n) {
            var r, i;
            if (this.isConsoleLogTemplate && console.log("[utility.template] templateUrl = " + e + ", key = " + n), n) {
                var o = this.templateCache[n];
                if (o) return r = TrimPath.parseTemplate(o), this.isConsoleLogTemplate && console.log("[utility.template] Get from templateCache. key = " + n), void t(r)
            }
            i = "localhost:288" != window.location.host ? "/Public/Templates/" + e + "?v=" + global.rv : "/Public/Templates/" + e + "?v=" + (new Date).getTime();
            var a = !0; - 1 == e.indexOf("_1024") && -1 == e.indexOf("_1280") || (a = !1), utility.stopRequest || $.ajax({
                url: i,
                cache: !0,
                type: "GET",
                success: function (e) {
                    r = TrimPath.parseTemplate(e), utility.templateCache[n] = e, utility.isConsoleLogTemplate && console.log("[utility.template] Ajax get template (" + i + ", key = " + n + ") and store into templateCache"), t(r)
                },
                error: function (e) {},
                async: a
            })
        },
        templateFromPage: function (e, t, n) {
            var r;
            if (e = "tmpl" + (e = e.split("/")[1]).replace(".html", ""), this.isConsoleLogTemplate && console.log("[utility.template] templateId = " + e + ", key = " + n), n && (r = this.templateCache[n])) return this.isConsoleLogTemplate && console.log("[utility.template] Get from templateCache. key = " + n), void t(r);
            var i = $("#" + e).text();
            r = TrimPath.parseTemplate(i), i = null, utility.templateCache[n] = r, utility.isConsoleLogTemplate && console.log("[utility.template] Ajax get template (" + e + ", key = " + n + ") and store into templateCache"), t(r)
        },
        getValueFromUrl: function (e) {
            if (window.location.search) {
                var t = [],
                    n = e.toLowerCase();
                $.each(window.location.search.substring(1).split("&"), function () {
                    $.each(this.split("="), function () {
                        t.push(this)
                    })
                });
                for (var r = 0; r < t.length; r += 2)
                    if (t[r].toLowerCase() == n) return t[r + 1]
            }
            return null
        },
        getQueryFromUrl: function (e, t) {
            var n = [];
            void 0 === e && (e = window.location.search);
            var r = e.split("?");
            if (r.length >= 2) {
                for (var i = r[1].split("&"), o = 0; o < i.length; o++) {
                    i[o].split("=")[0].toLowerCase() !== t.toLowerCase() && n.push(i[o])
                }
                return n.join("&")
            }
        },
        service: function (e, t, n, r, i, o, a) {
            if (!utility.stopRequest) {
                utility.abortTimer && (clearTimeout(utility.abortTimer), utility.abortTimer = !1);
                var s = this.objToPostString(n),
                    l = "/" + global.lan + "/Service/" + e + "?" + t + "&ts=" + (new Date).getTime();
                    console.log(l);
                utility.currentRequest = $.ajax({
                    url: l,
                    cache: !1,
                    data: s,
                    type: r,
                    success: function (e) {
                        utility.currentRequest = null, utility.succeededAction(e, i, a)
                    },
                    error: function (e) {
                        utility.currentRequest = null, utility.failedAction(e, o)
                    },
                    beforeSend: function (e, t) {
                        utility.currentRequest && 4 != utility.currentRequest.readyState && -1 != utility.currentRequestUrl.indexOf("CentralService?") && -1 != t.url.indexOf("CentralService?") && (utility.currentRequest.abort(), utility.currentRequest = null, console.log("Abort previous ajax request!")), utility.currentRequestUrl = t.url
                    }
                }), -1 != utility.currentRequestUrl.indexOf("CentralService?") && n.IsFirstLoad && (utility.abortTimer = setTimeout(function () {
                    utility.currentRequest ? (console.log("Abort current ajax request!"), alert("Request timeout. Issue a new request."), utility.currentRequest.abort(), utility.currentRequest = null, utility.service(e, t, n, r, i, o, a)) : console.log("ajax call completed in time")
                }, 3e4))
            }
        },
        parsePopupInfo: function (e) {
            for (var t, n, r, i = e.split(" "), o = 0; o < i.length; o++) switch (String(i[o]).toLowerCase().charAt(0)) {
                case "w":
                    n = String(i[o]).substr(1);
                    break;
                case "h":
                    r = String(i[o]).substr(1);
                    break;
                case "i":
                    t = String(i[o]).substr(1)
            }
            return {
                id: t,
                width: n,
                height: r
            }
        },
        replaceTooltipBu: function (e) {
            if (-1 != e.indexOf("{0}")) {
                if ("188BET" == global.bu) return e.replace("{0}", l.TvNamePrefix188);
                if (-1 != global.bu.indexOf("RIO") || -1 != global.bu.indexOf("TT_CASH")) return e.replace("{0}", l.TvNamePrefixTT)
            }
            return e
        },
        succeededAction: function (response, callBack, excludeLanguage) {
            var data, parsed = !1;
            try {
                response && "" != response ? ("object" == typeof response ? data = response : eval("data =" + response), !excludeLanguage && window.l && (data.$l = window.l), parsed = !0) : parsed = !1
            } catch (e) {
                utility.showError("parse error: " + response)
            }
            parsed && data && (data.syserror ? console.log(data.syserror) : data.lostConn ? console.log("lost connection occurred...") : 0 == data.isAuth || callBack && callBack(data)), data = null, response = null
        },
        failedAction: function (e, t) {
            404 == e.status && (utility.stopRequest = !0, window.status = new Date), t && t(), e = null
        },
        objToPostString: function (e, t) {
            t || (t = "");
            var n = [];
            for (var r in e)
                if (void 0 == e[r] || null == e[r]);
                else if (e[r] instanceof Array)
                for (var i = e[r], o = 0; o < i.length; o++) n.push(t + r + "=" + i[o]);
            else "object" == typeof e[r] ? n.push(this.objToPostString(e[r], r + ".")) : n.push(t + r + "=" + encodeURIComponent(e[r]));
            return n.join("&")
        },
        isCookieEnabled: function () {
            return !!navigator.cookieEnabled
        },
        cache: {},
        cookie: {
            write: function (e, t, n) {
                n || (n = 7), $.cookie(e, t, {
                    expires: n,
                    path: "/"
                }), utility.cache[e] = t
            },
            read: function (e) {
                return utility.cache[e] || $.cookie(e)
            },
            erase: function (e) {
                $.cookie(e, null), utility.cache[e] = null
            }
        },
        dialogIndex: 0,
        popupUrl: function (e, t, n, r, i, o, a) {
            if (!e || e.indexOf("javascript:void") >= 0) return !1;
            if (n && -1 != n || (n = 800), r && -1 != r || (r = 550), i || (i = "no"), t) {
                var s = $("#" + t);
                if (s.length > 0) s.parent().dialog("destroy").remove()
            } else t = "dialog" + utility.dialogIndex++;
            $("<div/>").dialog({
                autoOpen: !1,
                modal: !0,
                height: r,
                width: n,
                closeOnEscape: null == o || o,
                resizable: !1,
                close: function (e, t) {
                    a && $.isFunction(a) && a(e, t)
                }
            }).html('<iframe id="' + t + '" width="100%" height="100%" marginWidth="0" marginHeight="0" frameBorder="0" scrolling="' + i + '" />').dialog("open"), $("#" + t).attr("src", e)
        },
        haveClass: function (e, t) {
            for (var n = 0; n < e.length; n++)
                if (!$(e[n]).hasClass(t)) return !1;
            return !0
        },
        remove: function (e, t) {
            var n = [];
            if (e)
                for (var r = 0; r < e.length; r++) {
                    var i = e[r];
                    i && t != i && n.push(i)
                }
            return n
        },
        parseToSizeInfo: function (e) {
            for (var t, n, i = e.split(" "), o = -1, a = -1, s = 0; s < i.length; s++) switch (String(i[s]).toLowerCase().charAt(0)) {
                case "w":
                    o = parseInt(String(i[s]).substr(1));
                    break;
                case "h":
                    a = parseInt(String(i[s]).substr(1));
                    break;
                case "i":
                    t = String(i[s]).substr(1);
                    break;
                case "s":
                    n = String(i[s]).substr(1);
                    break;
                case "r":
                    r = String(i[s]).substr(1)
            }
            return void 0 !== n && "no" == n.toLowerCase() || (n = "yes"), "undefined" != typeof r && "yes" == r.toLowerCase() || (r = "no"), (isNaN(o) || isNaN(a)) && pm.showParentAlert(global.tLogin, "Error:" + e), {
                id: t,
                width: o,
                height: a,
                scroll: n,
                resizable: r
            }
        },
        disableLinks: function (e) {
            $(e).fadeTo(2e3, .3).addClass("disabled_link").removeClass("popup-new").removeAttr("href").unbind("click")
        },
        popupUrlWin: function (e, t, n) {
            var r, i, o = 800,
                a = 600; - 1 != t.width && (o = t.width), -1 != t.height && (a = t.height), r = (screen.width - o) / 2, i = (screen.height - a) / 2;
            var s = "resizable=" + t.resizable + ", scrollbars=" + t.scroll + ", left=" + r + ", top=" + i + ", width=" + o + ", height=" + a;
            window.open(e, n, s).focus()
        },
        openNewTab: function (e) {
            window.open(window.global.portalURL + e, "_blank")
        },
        popupNewWin: function (e, t, n, r) {
            var i = utility.parseToSizeInfo(t.className);
            "_blank" == n && (n = "188BET"), n || (n = "188BET"), i && i.id && (n = i.id), utility.popupUrlWin(t.href, i, n), r && 1 == r || (e.stopPropagation(), e.preventDefault())
        },
        ttip: function (e) {
            $(e).tt({
                showEvent: "mouseover",
                hideEvent: "mouseout",
                vAlign: "above",
                align: "flushLeft",
                ttClass: "tooltip",
                distanceX: 0,
                distanceY: 0,
                visibleOnScroll: !0
            })
        },
        ttip_st: function (e) {
            $(e).tt({
                showEvent: "mouseover",
                hideEvent: "mouseout",
                vAlign: "above",
                align: "flushLeft",
                ttClass: "tooltip",
                distanceX: 0,
                distanceY: 0,
                visibleOnScroll: !0,
                autoHide: !1
            })
        },
        checkRefresh: function () {
            uv && uv.login && utility.service("HomePageService", "NeedRefresh", {}, "GET", function (e) {
                e && e.ref && parent.location.reload()
            })
        },
        cancelEvent: function (e) {
            return (e = e || window.event).stopPropagation && e.stopPropagation(), e.preventDefault && e.preventDefault(), e.cancelBubble = !0, e.cancel = !0, e.returnValue = !1, !1
        },
        getParentScrollTop: function () {
            try {
                return void 0 === $parentDocument && ($parentDocument = parent.$(parent.document)), $parentDocument.scrollTop()
            } catch (e) {
                return console.log("Error: utility.getParentScrollTop() - " + e.message), 0
            }
        },
        getParentWindowHeight: function () {
            try {
                return void 0 === $parentWindow && ($parentWindow = parent.$(parent.window)), $parentWindow.height()
            } catch (e) {
                return console.log("Error: utility.getParentWindowHeight() - " + e.message), 0
            }
        },
        cachedAnnBarHeight: -1,
        getParentAnnBarHeight: function () {
            if (-1 == this.cachedAnnBarHeight) {
                var e = 0;
                try {
                    var t = parent.$("#announcement-box:visible");
                    t.length > 0 && (e = t.height())
                } catch (e) {
                    console.log("Error: utility.getParentAnnBarHeight() - " + e.message)
                }
                this.cachedAnnBarHeight = e
            }
            return this.cachedAnnBarHeight
        },
        getParentHeaderHeight: function () {
            var e;
            return e = "188BET" == global.bu || "SB1888" == global.bu ? "#HeadContainer" : ".header-c", $(parent.document) ? $(parent.document).find(e).first().outerHeight() : 0
        },
        getParentFooterHeight: function () {
            var e;
            return e = ("188BET" == global.bu || global.bu, "#footer"), $(parent.document) ? $(parent.document).find(e).first().outerHeight() : 0
        },
        getFooterUrl: function () {
            var e = pm.parentHost();
            return "localhost" != document.domain && null != e && "" != e ? e + "/" + global.lan + "/sports/getfooter" : ""
        },
        getBeforeBetSlipTabHeight: function () {
            return 118 + utility.getParentAnnBarHeight()
        },
        scrollToTop: function () {
            if (self != window.top) try {
                parent.scrollTo(0, 0)
            } catch (e) {} else window.scrollTo(0, 0)
        },
        setInplayHeightAndFooter: function (e) {
            if (self != window.top) try {
                if ("Inplay" == o.param.Tab || o.param.IsInplay) {
                    var t = parent.$("#container");
                    t && t.is(":animated") && t.stop(!0, !0), parent.utility.setInplayPage(!0)
                } else parent.utility.setInplayPage(!1)
            } catch (e) {}
        },
        initAllIEScrollbarCss: function () {},
        setSBKFrameUrl: function (e) {
            window.location = e
        },
        logoutCashSite: function () {
            self != window.top && parent.$("#btnLogout").click()
        },
        canTick: function (e) {
            return _.contains([1, 19], e)
        }
    },
    HomeJS = {
        isP: !1,
        Promte: function (e) {},
        initLogin: function () {
            HomeJS.selectSiteLink(), HomeJS.checkDisplayItems()
        },
        checkDisplayItems: function () {
            uv.showls && $("li.c-ls,#tvicon").removeClass("hidden")
        },
        selectSiteLink: function () {
            $("a#changeToACM").click(function () {
                window.top.location.href = location.protocol + "//" + window.top.location.hostname + "/" + global.lan + "/asia"
            })
        },
        timeOutId: null,
        ajaxLoading: function (e) {
            var t = $("#ajxldg");
            e ? (HomeJS.isP = !0, t.length <= 0 && ($("#preLogin").addClass("hidden"), $("#TitleForgotPass").addClass("hidden"), $("<div id='ajxldg' class='ajxldg'/>").insertAfter("#preLogin")), HomeJS.timeOutId ? clearTimeout(HomeJS.timeOutId) : HomeJS.timeOutId = setTimeout("document.location.reload()", 12e4)) : ($("#preLogin").removeClass("hidden"), t.remove(), HomeJS.isP = !1, $("#TitleForgotPass").removeClass("hidden"), HomeJS.timeOutId && clearTimeout(HomeJS.timeOutId))
        },
        removeQueryString: function (e) {
            return -1 != (e = e.toLowerCase()).indexOf("?competitionids") ? e.substr(0, e.indexOf("?competitionids")) : e
        }
    },
    TimeZone = {
        userTZOffset: null,
        initTz: function (e, t, n) {
            var r = Number(e);
            e && !isNaN(r) && (TimeZone.userTZOffset = r);
            var i = -(new Date).getTimezoneOffset(),
                o = utility.cookie.read("timeZone");
            null != TimeZone.userTZOffset && "" != TimeZone.userTZOffset ? TimeZone.userTZOffset != o && utility.cookie.write("timeZone", TimeZone.userTZOffset) : i != o && utility.cookie.write("timeZone", i)
        }
    };
$(function () {
    "undefined" == typeof console && (window.console = {
        log: function () {}
    }), $.fx.speeds._default = 300, isIE8AndBelow && ($.fx.off = !0), document.oncontextmenu = function (e) {
        if ($.browser.safari || $.browser.opera) return !1;
        var t = e ? e.target : event.srcElement;
        return "A" != t.nodeName && ("A" != t.parentNode.nodeName && void 0)
    }, 3 == uv.ov ? $("#sbody").addClass("malayOdds") : 4 == uv.ov && $("#sbody").addClass("indoOdds")
}), window.Modernizr = function (e, t, n) {
    var r, i, o = {},
        a = t.documentElement,
        s = "modernizr",
        l = t.createElement(s),
        u = l.style,
        c = " -webkit- -moz- -o- -ms- ".split(" "),
        d = {},
        p = [],
        f = p.slice,
        h = function (e, n, r, i) {
            var o, l, u, c, d = t.createElement("div"),
                p = t.body,
                f = p || t.createElement("body");
            if (parseInt(r, 10))
                for (; r--;)(u = t.createElement("div")).id = i ? i[r] : s + (r + 1), d.appendChild(u);
            return o = ["&#173;", '<style id="s', s, '">', e, "</style>"].join(""), d.id = s, (p ? d : f).innerHTML += o, f.appendChild(d), p || (f.style.background = "", f.style.overflow = "hidden", c = a.style.overflow, a.style.overflow = "hidden", a.appendChild(f)), l = n(d, e), p ? d.parentNode.removeChild(d) : (f.parentNode.removeChild(f), a.style.overflow = c), !!l
        },
        g = {}.hasOwnProperty;

    function m(e) {
        u.cssText = e
    }

    function y(e, t) {
        return typeof e === t
    }
    for (var v in i = y(g, "undefined") || y(g.call, "undefined") ? function (e, t) {
            return t in e && y(e.constructor.prototype[t], "undefined")
        } : function (e, t) {
            return g.call(e, t)
        }, Function.prototype.bind || (Function.prototype.bind = function (e) {
            var t = this;
            if ("function" != typeof t) throw new TypeError;
            var n = f.call(arguments, 1),
                r = function () {
                    if (this instanceof r) {
                        var i = function () {};
                        i.prototype = t.prototype;
                        var o = new i,
                            a = t.apply(o, n.concat(f.call(arguments)));
                        return Object(a) === a ? a : o
                    }
                    return t.apply(e, n.concat(f.call(arguments)))
                };
            return r
        }), d.touch = function () {
            var n;
            return "ontouchstart" in e || e.DocumentTouch && t instanceof DocumentTouch ? n = !0 : h(["@media (", c.join("touch-enabled),("), s, ")", "{#modernizr{top:9px;position:absolute}}"].join(""), function (e) {
                n = 9 === e.offsetTop
            }), n
        }, d) i(d, v) && (r = v.toLowerCase(), o[r] = d[v](), p.push((o[r] ? "" : "no-") + r));
    return o.addTest = function (e, t) {
        if ("object" == typeof e)
            for (var r in e) i(e, r) && o.addTest(r, e[r]);
        else {
            if (e = e.toLowerCase(), o[e] !== n) return o;
            t = "function" == typeof t ? t() : t, a.className += " " + (t ? "" : "no-") + e, o[e] = t
        }
        return o
    }, m(""), l = null, o._version = "2.6.2", o._prefixes = c, o.testStyles = h, a.className = a.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + " js " + p.join(" "), o
}(this, this.document);
var Control = {};
Control.Dialog = {
    _dialogID: "custom-dialog",
    type: {
        Information: "info",
        Alert: "alert",
        Question: "confirm",
        Prompt: "promte",
        Splash: "splash"
    },
    showMessage: function (e, t, n) {
        this._showDialog(this.type.Information, e, t, [{
            Text: l.Dlg_OK,
            Callback: n
        }])
    },
    showParentMessage: function (e, t, n) {
        self == top ? Control.Dialog.showMessage(t) : parent.Control && parent.Control.Dialog ? parent.Control.Dialog.showAlert(e, t, n) : Control.Dialog.showMessage(t)
    },
    showAlert: function (e, t, n) {
        this._showDialog(this.type.Alert, e, t, [{
            Text: l.Dlg_OK,
            Callback: n
        }])
    },
    showConfirm: function (e, t, n, r) {
        this._showDialog(this.type.Question, e, t, [{
            Text: l.Dlg_Yes,
            Callback: n
        }, {
            Text: l.Dlg_NO,
            Callback: r
        }])
    },
    showParentConfirm: function (e, t, n, r) {
        self == top ? confirm(t) : parent.Control && parent.Control.Dialog ? parent.Control.Dialog.showConfirm(e, t, okFunction) : confirm(t)
    },
    showPromptMessage: function (e, t, n, r, i) {
        this._showDialog(this.type.Prompt, e, t, [{
            Text: n[0],
            Callback: r
        }, {
            Text: n[1],
            Callback: i
        }, {
            Text: n[2],
            Callback: function () {}
        }])
    },
    showSplashMessage: function (e, t) {
        this._showDialog(this.type.Splash, e, t)
    },
    _render: function (e, t, n) {
        var r = [];
        return r.push('<div id="' + this._dialogID + '" title="' + t + '">'), r.push("<table id='_dlgct'><tr><td valign='top'>"), r.push('<span class="' + e + ' ui-icon ui-icon-circle-check"></span>'), r.push("</td><td valign='middle'>"), r.push(n), r.push("</td></tr></table>"), r.push("</div>"), $(r.join(""))
    },
    _render_Splash: function (e, t, n) {
        var r = [];
        return r.push('<div id="' + this._dialogID + '" title="' + t + "\" style='margin:5px 10px'>"), r.push(n), r.push("</div>"), $(r.join(""))
    },
    _showDialog: function (e, t, n, r) {
        var i = function () {
                var e = ($(window).width() - c.outerWidth()) / 2,
                    t = $(window).height() > c.outerHeight() ? ($(window).height() - c.outerHeight()) / 2 : 10;
                c.css({
                    top: t,
                    left: e
                })
            },
            o = e && e.toString().length > 0 ? "icon-" + e : "icon-" + this.type.Information,
            a = {};
        $.isArray(r) && $(r).each(function (e) {
            a[r[e].Text] = function () {
                r[e].Callback && $.isFunction(r[e].Callback) && r[e].Callback(), $(this).dialog("close")
            }
        });
        var s = e == Control.Dialog.type.Splash ? this._render_Splash(o, t, n) : this._render(o, t, n),
            l = e == Control.Dialog.type.Prompt ? 785 : e == Control.Dialog.type.Splash ? 840 : 260,
            u = $(window).height();
        s.dialog({
            modal: !0,
            resizable: !1,
            width: l,
            minHeight: 66,
            maxHeight: u,
            buttons: a,
            draggable: !1,
            open: function (e, t) {
                $(window).resize(i)
            },
            close: function (e, t) {
                $(window).unbind("resize", i), $(e.target || e.srcElement).remove()
            }
        });
        var c = s.parent("div.ui-dialog"),
            d = u > c.outerHeight() ? (u - c.outerHeight()) / 2 : 10,
            p = $(window).width() > l ? ($(window).width() - l) / 2 : 10;
        if (c.addClass("c-dlg").css({
                width: l,
                top: e == Control.Dialog.type.Splash ? 10 : d,
                left: p
            }), e == Control.Dialog.type.Splash && c.addClass("splash-dlg"), e != Control.Dialog.type.Alert && e != Control.Dialog.type.Splash || $("a.ui-dialog-titlebar-close", c).remove(), e == Control.Dialog.type.Prompt) {
            c.find("table#_dlgct tr td:eq(0)").remove();
            var f = c.find("div.ui-dialog-buttonpane"),
                h = f.find("button:eq(2)");
            f.append("<span class='btnright'>" + h.text() + "<input type='checkbox' id='ckbDontShow' /input></span>"), f.find("button").css({
                float: "left"
            }), h.remove(), $("#custom-dialog").css("margin", "3px 15px")
        }
    }
}, Control.Select = {
    List_Prefix: "list_",
    Text_Prefix: "text_",
    selectCache: new Array,
    init: function (e, t) {
        t = $.extend({
            type: "single",
            position: "auto",
            disabled: !1,
            dropShadow: !0
        }, t);
        e.id;
        var n = Control.Select._build.apply(e, [t]);
        n._allLinks = $("li > a", n.list), n._selectedIndex = i(n._selectedIndex), n._selectedLink = n._allLinks.eq(n._selectedIndex);
        var r = n._selectedIndex;
        n._selectedLink;

        function i(e) {
            return Math.max(0, Math.min(e, n._allLinks ? n._allLinks.length - 1 : 0))
        }

        function o(e) {
            "link" != t.type ? (r = n._selectedIndex, n._allLinks.removeClass(), e.addClass("focus"), n._selectedLink = e, function (e) {
                var t = e.attr("value");
                if (t != n.val()) {
                    var r = e.html();
                    n.text.html(r), n.val(t).trigger("change")
                }
            }(e)) : e.get(0).click()
        }

        function a(e) {
            (e = i(e)) != n._selectedIndex && (n._selectedIndex = e, n._selectedLink = n._allLinks.eq(n._selectedIndex), r = n._selectedIndex, o(n._selectedLink))
        }

        function s(e) {
            if ((e = i(e)) != r) {
                r = e;
                var t = n._allLinks.eq(r);
                n._allLinks.removeClass("focus"), t.addClass("focus"), l(t)
            }
        }

        function l(e) {
            var t = $("ul", n.list),
                r = t.scrollTop(),
                i = (e.offset() ? e.offset().top : 0) + t.scrollTop() - t.offset().top;
            (i < r || i > r - 15 + t.height()) && t.scrollTop(-15 + i)
        }

        function u(e, t) {
            var i, o, l = e.keyCode;
            switch (l) {
                case KEY_UP:
                    t ? s(r - 1) : a(n._selectedIndex - 1), e.preventDefault();
                    break;
                case KEY_DOWN:
                    t ? s(r + 1) : a(n._selectedIndex + 1), e.preventDefault();
                    break;
                case KEY_ENTER:
                    t && (a(r), n.text.dropdown("hide"));
                    break;
                case $.ui.keyCode.TAB:
                    t && n.text.dropdown("hide");
                    break;
                default:
                    if ((o = l) >= KEY_A && o <= KEY_Z || o >= KEY_0 && o <= KEY_9 || o >= KEY_NUMPAD_0 && o <= KEY_NUMPAD_9) ! function (e, t) {
                        var i = r;
                        i < 0 && (i = n._selectedIndex);
                        i < 0 && (i = 0);
                        n._allLinks;
                        var o = -1,
                            l = -1;
                        n._allLinks.each(function (t) {
                            var n = $(this).text();
                            o < 0 && t <= i ? c(n, e) && (o = t) : l < 0 && t > i && c(n, e) && (l = t)
                        }), l < 0 && (l = o);
                        l >= 0 && (t ? s(l) : a(l))
                    }((i = l) >= KEY_NUMPAD_0 && i <= KEY_NUMPAD_9 ? (i - KEY_NUMPAD_0).toString() : String.fromCharCode(i), t)
            }
        }

        function c(e, t) {
            return "+" == e.charAt(0) ? e.charAt(1).toUpperCase() == t : e.charAt(0).toUpperCase() == t
        }
        return n.text.dropdown({
            contentId: n.list[0].id,
            show: "auto",
            hide: "auto",
            position: t.position,
            triggerEvent: "click",
            dropShadow: 1 == t.dropShadow,
            onShowed: function () {
                n.isAnimating = !1, n.list.is(":visible") && ((void 0 === n._selectedIndex || n._selectedIndex < 0) && (n._selectedIndex = parseInt(n.attr("selectedIndex"))), n._selectedIndex >= 0 && n._allLinks.removeClass("focus").eq(n._selectedIndex).addClass("focus"), n.text.focus(), n._allLinks.unbind("click").bind("click", function (e) {
                    if ("link" != t.type) {
                        var r = $(this);
                        return n._selectedIndex = n._allLinks.index(r), o(r), n.text.dropdown("hide"), !1
                    }
                }).hover(function () {
                    var e = $(this);
                    n._allLinks.eq(n._selectedIndex).removeClass("focus"), e.addClass("focus"), r = n._allLinks.index(e)
                }, function () {
                    $(this).removeClass("focus")
                }), l(n._selectedLink))
            }
        }), n.text.keydown(function (e) {
            $(this).attr("disabled") || (e.keyCode, u(e, n.list.is(":visible")))
        }), $.browser.msie ? (n.list.keydown(function (e) {
            e.keyCode, u(e, !0)
        }), $("ul", n.list).bind("mousewheel", function (e) {
            e.stopPropagation()
        })) : $("ul", n.list).scroll(function (e) {
            window.setTimeout(function () {
                n.text.focus()
            }, 1e3)
        }), n
    },
    select: function (e, t) {
        var n = Control.Select.selectCache[e],
            r = n.text,
            i = n.list;
        $("a", i).each(function (e) {
            var i = $(this).attr("value");
            if (t(i)) return n._selectedIndex = e, n._selectedLink = $(this), void r.html($(this).html())
        })
    },
    _buildLinkItem: function () {
        return this.text ? '<li><a href="' + this.value + '"' + (this.selected ? ' class="focus">' : ">") + this.text + "</a></li>" : ""
    },
    _buildBreak: function () {
        return "<li class='break-line'>" + this.text + "</li>"
    },
    _buildItem: function () {
        return this.text ? "<li><a href='javascript:void(0)' value=\"" + this.value + '"' + (this.selected ? ' class="focus">' : ">") + this.text + "</a></li>" : ""
    },
    _buildHeader: function (e, t) {
        return $this = $(this), "<a id='" + Control.Select.Text_Prefix + e + "' href='javascript:void(0)' class='ddl-text'" + (t ? " disabled='disabled'" : "") + ">" + $this.text() + "</a><input name='" + ($(this).attr("name") ? $(this).attr("name") : e) + "' id='" + e + "' value=\"" + $this.val() + "\" type='hidden' />"
    },
    _build: function (e) {
        var t = "",
            n = [],
            r = this.id,
            i = 0;
        if (n.push("<div class='ddl-list' id='" + Control.Select.List_Prefix + r + "'><ul>"), 0 == this.options.length) t = Control.Select._buildHeader.apply(this, [r, e.disabled]);
        else {
            var o = 0;
            $("option", $(this)).each(function () {
                $(this).is(":selected") && (t = Control.Select._buildHeader.apply(this, [r, e.disabled]), i = o), "ignore" == this.value ? (n.push(Control.Select._buildBreak.apply(this)), o--) : "link" == e.type ? n.push(Control.Select._buildLinkItem.apply(this)) : n.push(Control.Select._buildItem.apply(this)), o++
            })
        }
        n.push("</ul></div>"), $(this).after(t), $(document.body).append(n.join("")), this.id = "fake_" + r;
        var a = $("#" + r);
        a._selectedIndex = i, a.text = $("#" + Control.Select.Text_Prefix + r), a.list = $("#" + Control.Select.List_Prefix + r), a.options = e, a._allLinks = $("li > a", a.list), Control.Select.selectCache[r] = a, this.className && a.text.addClass(this.className), $(this).attr("title") && a.text.attr("title", $(this).attr("title")), this.onfocus && a.text.bind("focus", this.onfocus), this.onclick && a.text.bind("click", this.onclick), this.onchange && a.bind("change", this.onchange);
        var s = $.data(this, "events");
        if (s) {
            for (var l = ["click", "focus"], u = [], c = 0; c < l.length; c++)
                for (var d in u = s[l[c]]) $.event.add(a.text[0], l[c], u[d], u[d].data);
            l = ["change"];
            for (c = 0; c < l.length; c++)
                for (var d in u = s[l[c]]) $.event.add(a.get(0), l[c], u[d], u[d].data)
        }
        return $(this).remove(), a
    },
    remove: function (e, t) {
        var n = Control.Select.selectCache[e];
        if (null != n) {
            var r = $("ul > li", n.list);
            t < 0 || t > r.length - 1 || (t == n._selectedIndex && (n.text.text(" - "), n.val("").trigger("change"), n._selectedIndex = -1), r.eq(t).remove())
        }
    },
    removeAll: function (e) {
        var t = Control.Select.selectCache[e];
        if (null != t) {
            $("ul > li", t.list).remove();
            t._selectedIndex >= 0 && (t.text.text(" - "), t._selectedIndex = -1)
        }
    },
    addItem: function (e, t, n) {
        Control.Select.addItems(e, [t], n)
    },
    addItems: function (id, items, index) {
        if (null != items && 0 != items.length) {
            var $self = Control.Select.selectCache[id];
            if (null != $self) {
                var options = $self.options,
                    itemCode = "Control.Select._buildItem.apply(this)";
                options && "link" == options.type && (itemCode = "Control.Select._buildLinkItem.apply(this)");
                var allItems = $("ul > li", $self.list),
                    parent = null;
                if (index)
                    if (0 == allItems.length && 0 == index) parent = $("ul", $self.list), $(items).each(function () {
                        parent.append(eval(itemCode))
                    });
                    else {
                        if (!(index < allItems.length && index >= 0)) return;
                        var $current = allItems.eq(index);
                        $(items).each(function () {
                            $current.before(eval(itemCode))
                        })
                    }
                else parent = $("ul", $self.list), $(items).each(function () {
                    parent.append(eval(itemCode))
                })
            }
        }
    },
    refresh: function (e) {
        var t = Control.Select.selectCache[e];
        if (null != t) {
            t.list = $("#" + Control.Select.List_Prefix + e), t._allLinks = $("li > a", t.list);
            var n = $("li > a.focus", t.list);
            n.length > 0 && (t.text = $("#" + Control.Select.Text_Prefix + e), t.text.html(n.text()), t.val(n.val()), t.attr("selectedIndex", $("li > a", t.list).index(n))), Control.Select.selectCache[e] = t
        }
    },
    disabled: function (e, t) {
        t ? $("#" + Control.Select.Text_Prefix + e).attr("disabled", "disabled").addClass("ddl-dsd") : $("#" + Control.Select.Text_Prefix + e).removeAttr("disabled").removeClass("ddl-dsd")
    }
}, Control.DDL = {
    buildItem: function (e, t, n) {
        var r = new StringBuilderEx,
            i = n ? "data-sel" : "";
        return r.appendFormat('<li><a href="javascript:void(0)" data-val="{0}" {2}>{1}</a></li>', t, e, i), r.toString()
    },
    buildItem2: function (e, t, n) {
        var r = new StringBuilderEx,
            i = n ? "data-sel" : "";
        return r.appendFormat('<li><span data-val="{0}" {2}>{1}</span></li>', t, e, i), r.toString()
    }
};
var pm = function () {
    var e = document.referrer.match(/(?:[(http|https)\://])*[^\/]*/)[0],
        t = function (t) {
            window.top.postMessage(t, e)
        },
        n = function (e) {
            var t = e.t,
                n = e.h;
            switch (console.log("target:" + t + ", height:" + n), t) {
                case "t":
                    Action.Homepage.setTopBannerHeight(n);
                    break;
                case "b":
                    $("#ftbanner").attr("height", n), ScrollerBar.initScrollbarStatus();
                    break;
                case "r":
                    0 == n ? Action.RightPanel.Banner.hide() : Action.RightPanel.Banner.setBannerHeight(n)
            }
        },
        r = function (e) {
            var t, n, r, i = "";
            if (e.length > 0) {
                n = e.slice(1).split("&");
                for (var o = 0; o < n.length; o++) r = (t = n[o].split("="))[0].toLowerCase(), /(theme|q|country|currency|tzoff|PartnerId|IsSingleWallet|mc|allowracing|reg|rc)/i.test(r) || (i = i + ("" === i ? "?" : "&") + r + "=" + t[1])
            }
            return i
        };
    return {
        init: function () {
            var e = window.addEventListener ? "addEventListener" : "attachEvent";
            (0, window[e])("attachEvent" == e ? "onmessage" : "message", function (e) {
                ! function (e) {
                    switch (e.topic) {
                        case "setBannerHeight":
                            n(e.data)
                    }
                }(e.data)
            }, !1)
        },
        parentHost: function () {
            return self != top ? e : null
        },
        parentOrLocalHost: function () {
            var e = this.parentHost();
            return e || location.origin
        },
        tellCashWhereSBKIs: function () {
            try {
                var e = r(window.location.search);
                if (self != window.top) {
                    var n = "";
                    if (isIE9AndBelow) {
                        var i = window.location.hash;
                        if ("" != i) {
                            var o = i.indexOf("?");
                            e = o > -1 ? r(i.substr(o)) : "", n = (-1 == o ? i.substr(1, i.length) : i.substr(1, o - 1)) + e
                        } else n = window.location.pathname + e
                    } else n = window.location.pathname + e;
                    t({
                        topic: "setHistory",
                        data: {
                            title: "",
                            url: n
                        }
                    })
                }
            } catch (e) {
                console.log(e)
            }
        },
        showParentAlert: function (e, n) {
            t({
                topic: "showDialog",
                data: {
                    title: e,
                    message: n
                }
            })
        },
        refreshBalance: function () {
            t({
                topic: "updateBalance",
                data: null
            })
        },
        resizeFrame: function (e) {
            "localhost" != document.domain && t({
                topic: "resize",
                data: {
                    height: e,
                    windowName: window.name
                }
            })
        },
        resetBetSlip: function () {
            "localhost" != document.domain && t({
                topic: "resetBetSlip",
                data: {}
            })
        },
        resizeWindow: function (e, n) {
            "localhost" != document.domain && t({
                topic: "updateWinSize",
                data: {
                    width: e,
                    height: n
                }
            })
        }
    }
}();