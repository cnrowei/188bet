/*
 03110235
*/


var TrimPath;
! function (e, t) {
    var i, a, s = 0,
        n = /^ui-id-\d+$/;
    (e.ui = e.ui || {}, e.ui.version) || (e.extend(e.ui, {
        version: "1.9.2",
        keyCode: {
            BACKSPACE: 8,
            COMMA: 188,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            LEFT: 37,
            NUMPAD_ADD: 107,
            NUMPAD_DECIMAL: 110,
            NUMPAD_DIVIDE: 111,
            NUMPAD_ENTER: 108,
            NUMPAD_MULTIPLY: 106,
            NUMPAD_SUBTRACT: 109,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SPACE: 32,
            TAB: 9,
            UP: 38
        }
    }), e.fn.extend({
        _focus: e.fn.focus,
        focus: function (t, i) {
            return "number" == typeof t ? this.each(function () {
                var a = this;
                setTimeout(function () {
                    e(a).focus(), i && i.call(a)
                }, t)
            }) : this._focus.apply(this, arguments)
        },
        scrollParent: function () {
            var t;
            return t = e.ui.ie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? this.parents().filter(function () {
                return /(relative|absolute|fixed)/.test(e.css(this, "position")) && /(auto|scroll)/.test(e.css(this, "overflow") + e.css(this, "overflow-y") + e.css(this, "overflow-x"))
            }).eq(0) : this.parents().filter(function () {
                return /(auto|scroll)/.test(e.css(this, "overflow") + e.css(this, "overflow-y") + e.css(this, "overflow-x"))
            }).eq(0), /fixed/.test(this.css("position")) || !t.length ? e(document) : t
        },
        zIndex: function (i) {
            if (i !== t) return this.css("zIndex", i);
            if (this.length)
                for (var a, s, n = e(this[0]); n.length && n[0] !== document;) {
                    if (("absolute" === (a = n.css("position")) || "relative" === a || "fixed" === a) && (s = parseInt(n.css("zIndex"), 10), !isNaN(s) && 0 !== s)) return s;
                    n = n.parent()
                }
            return 0
        },
        uniqueId: function () {
            return this.each(function () {
                this.id || (this.id = "ui-id-" + ++s)
            })
        },
        removeUniqueId: function () {
            return this.each(function () {
                n.test(this.id) && e(this).removeAttr("id")
            })
        }
    }), e.extend(e.expr[":"], {
        data: e.expr.createPseudo ? e.expr.createPseudo(function (t) {
            return function (i) {
                return !!e.data(i, t)
            }
        }) : function (t, i, a) {
            return !!e.data(t, a[3])
        },
        focusable: function (t) {
            return o(t, !isNaN(e.attr(t, "tabindex")))
        },
        tabbable: function (t) {
            var i = e.attr(t, "tabindex"),
                a = isNaN(i);
            return (a || i >= 0) && o(t, !a)
        }
    }), e(function () {
        var t = document.body,
            i = t.appendChild(i = document.createElement("div"));
        i.offsetHeight, e.extend(i.style, {
            minHeight: "100px",
            height: "auto",
            padding: 0,
            borderWidth: 0
        }), e.support.minHeight = 100 === i.offsetHeight, e.support.selectstart = "onselectstart" in i, t.removeChild(i).style.display = "none"
    }), e("<a>").outerWidth(1).jquery || e.each(["Width", "Height"], function (i, a) {
        var s = "Width" === a ? ["Left", "Right"] : ["Top", "Bottom"],
            n = a.toLowerCase(),
            o = {
                innerWidth: e.fn.innerWidth,
                innerHeight: e.fn.innerHeight,
                outerWidth: e.fn.outerWidth,
                outerHeight: e.fn.outerHeight
            };

        function r(t, i, a, n) {
            return e.each(s, function () {
                i -= parseFloat(e.css(t, "padding" + this)) || 0, a && (i -= parseFloat(e.css(t, "border" + this + "Width")) || 0), n && (i -= parseFloat(e.css(t, "margin" + this)) || 0)
            }), i
        }
        e.fn["inner" + a] = function (i) {
            return i === t ? o["inner" + a].call(this) : this.each(function () {
                e(this).css(n, r(this, i) + "px")
            })
        }, e.fn["outer" + a] = function (t, i) {
            return "number" != typeof t ? o["outer" + a].call(this, t) : this.each(function () {
                e(this).css(n, r(this, t, !0, i) + "px")
            })
        }
    }), e("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (e.fn.removeData = (i = e.fn.removeData, function (t) {
        return arguments.length ? i.call(this, e.camelCase(t)) : i.call(this)
    })), a = /msie ([\w.]+)/.exec(navigator.userAgent.toLowerCase()) || [], e.ui.ie = !!a.length, e.ui.ie6 = 6 === parseFloat(a[1], 10), e.fn.extend({
        disableSelection: function () {
            return this.bind((e.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function (e) {
                e.preventDefault()
            })
        },
        enableSelection: function () {
            return this.unbind(".ui-disableSelection")
        }
    }), e.extend(e.ui, {
        plugin: {
            add: function (t, i, a) {
                var s, n = e.ui[t].prototype;
                for (s in a) n.plugins[s] = n.plugins[s] || [], n.plugins[s].push([i, a[s]])
            },
            call: function (e, t, i) {
                var a, s = e.plugins[t];
                if (s && e.element[0].parentNode && 11 !== e.element[0].parentNode.nodeType)
                    for (a = 0; a < s.length; a++) e.options[s[a][0]] && s[a][1].apply(e.element, i)
            }
        },
        contains: e.contains,
        hasScroll: function (t, i) {
            if ("hidden" === e(t).css("overflow")) return !1;
            var a, s = i && "left" === i ? "scrollLeft" : "scrollTop";
            return t[s] > 0 || (t[s] = 1, a = t[s] > 0, t[s] = 0, a)
        },
        isOverAxis: function (e, t, i) {
            return e > t && e < t + i
        },
        isOver: function (t, i, a, s, n, o) {
            return e.ui.isOverAxis(t, a, n) && e.ui.isOverAxis(i, s, o)
        }
    }));

    function o(t, i) {
        var a, s, n, o = t.nodeName.toLowerCase();
        return "area" === o ? (s = (a = t.parentNode).name, !(!t.href || !s || "map" !== a.nodeName.toLowerCase()) && (!!(n = e("img[usemap=#" + s + "]")[0]) && r(n))) : (/input|select|textarea|button|object/.test(o) ? !t.disabled : "a" === o && t.href || i) && r(t)
    }

    function r(t) {
        return e.expr.filters.visible(t) && !e(t).parents().andSelf().filter(function () {
            return "hidden" === e.css(this, "visibility")
        }).length
    }
}(jQuery),
function (e, t) {
    var i = 0,
        a = Array.prototype.slice,
        s = e.cleanData;
    e.cleanData = function (t) {
        for (var i, a = 0; null != (i = t[a]); a++) try {
            e(i).triggerHandler("remove")
        } catch (e) {}
        s(t)
    }, e.widget = function (t, i, a) {
        var s, n, o, r, l = t.split(".")[0];
        t = t.split(".")[1], s = l + "-" + t, a || (a = i, i = e.Widget), e.expr[":"][s.toLowerCase()] = function (t) {
            return !!e.data(t, s)
        }, e[l] = e[l] || {}, n = e[l][t], o = e[l][t] = function (e, t) {
            if (!this._createWidget) return new o(e, t);
            arguments.length && this._createWidget(e, t)
        }, e.extend(o, n, {
            version: a.version,
            _proto: e.extend({}, a),
            _childConstructors: []
        }), (r = new i).options = e.widget.extend({}, r.options), e.each(a, function (t, s) {
            var n, o;
            e.isFunction(s) && (a[t] = (n = function () {
                return i.prototype[t].apply(this, arguments)
            }, o = function (e) {
                return i.prototype[t].apply(this, e)
            }, function () {
                var e, t = this._super,
                    i = this._superApply;
                return this._super = n, this._superApply = o, e = s.apply(this, arguments), this._super = t, this._superApply = i, e
            }))
        }), o.prototype = e.widget.extend(r, {
            widgetEventPrefix: n ? r.widgetEventPrefix : t
        }, a, {
            constructor: o,
            namespace: l,
            widgetName: t,
            widgetBaseClass: s,
            widgetFullName: s
        }), n ? (e.each(n._childConstructors, function (t, i) {
            var a = i.prototype;
            e.widget(a.namespace + "." + a.widgetName, o, i._proto)
        }), delete n._childConstructors) : i._childConstructors.push(o), e.widget.bridge(t, o)
    }, e.widget.extend = function (i) {
        for (var s, n, o = a.call(arguments, 1), r = 0, l = o.length; r < l; r++)
            for (s in o[r]) n = o[r][s], o[r].hasOwnProperty(s) && n !== t && (e.isPlainObject(n) ? i[s] = e.isPlainObject(i[s]) ? e.widget.extend({}, i[s], n) : e.widget.extend({}, n) : i[s] = n);
        return i
    }, e.widget.bridge = function (i, s) {
        var n = s.prototype.widgetFullName || i;
        e.fn[i] = function (o) {
            var r = "string" == typeof o,
                l = a.call(arguments, 1),
                c = this;
            return o = !r && l.length ? e.widget.extend.apply(null, [o].concat(l)) : o, r ? this.each(function () {
                var a, s = e.data(this, n);
                return s ? e.isFunction(s[o]) && "_" !== o.charAt(0) ? (a = s[o].apply(s, l)) !== s && a !== t ? (c = a && a.jquery ? c.pushStack(a.get()) : a, !1) : void 0 : e.error("no such method '" + o + "' for " + i + " widget instance") : e.error("cannot call methods on " + i + " prior to initialization; attempted to call method '" + o + "'")
            }) : this.each(function () {
                var t = e.data(this, n);
                t ? t.option(o || {})._init() : e.data(this, n, new s(o, this))
            }), c
        }
    }, e.Widget = function () {}, e.Widget._childConstructors = [], e.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        defaultElement: "<div>",
        options: {
            disabled: !1,
            create: null
        },
        _createWidget: function (t, a) {
            a = e(a || this.defaultElement || this)[0], this.element = e(a), this.uuid = i++, this.eventNamespace = "." + this.widgetName + this.uuid, this.options = e.widget.extend({}, this.options, this._getCreateOptions(), t), this.bindings = e(), this.hoverable = e(), this.focusable = e(), a !== this && (e.data(a, this.widgetName, this), e.data(a, this.widgetFullName, this), this._on(!0, this.element, {
                remove: function (e) {
                    e.target === a && this.destroy()
                }
            }), this.document = e(a.style ? a.ownerDocument : a.document || a), this.window = e(this.document[0].defaultView || this.document[0].parentWindow)), this._create(), this._trigger("create", null, this._getCreateEventData()), this._init()
        },
        _getCreateOptions: e.noop,
        _getCreateEventData: e.noop,
        _create: e.noop,
        _init: e.noop,
        destroy: function () {
            this._destroy(), this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(e.camelCase(this.widgetFullName)), this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled ui-state-disabled"), this.bindings.unbind(this.eventNamespace), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")
        },
        _destroy: e.noop,
        widget: function () {
            return this.element
        },
        option: function (i, a) {
            var s, n, o, r = i;
            if (0 === arguments.length) return e.widget.extend({}, this.options);
            if ("string" == typeof i)
                if (r = {}, i = (s = i.split(".")).shift(), s.length) {
                    for (n = r[i] = e.widget.extend({}, this.options[i]), o = 0; o < s.length - 1; o++) n[s[o]] = n[s[o]] || {}, n = n[s[o]];
                    if (i = s.pop(), a === t) return n[i] === t ? null : n[i];
                    n[i] = a
                } else {
                    if (a === t) return this.options[i] === t ? null : this.options[i];
                    r[i] = a
                }
            return this._setOptions(r), this
        },
        _setOptions: function (e) {
            var t;
            for (t in e) this._setOption(t, e[t]);
            return this
        },
        _setOption: function (e, t) {
            return this.options[e] = t, "disabled" === e && (this.widget().toggleClass(this.widgetFullName + "-disabled ui-state-disabled", !!t).attr("aria-disabled", t), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")), this
        },
        enable: function () {
            return this._setOption("disabled", !1)
        },
        disable: function () {
            return this._setOption("disabled", !0)
        },
        _on: function (t, i, a) {
            var s, n = this;
            "boolean" != typeof t && (a = i, i = t, t = !1), a ? (i = s = e(i), this.bindings = this.bindings.add(i)) : (a = i, i = this.element, s = this.widget()), e.each(a, function (a, o) {
                function r() {
                    if (t || !0 !== n.options.disabled && !e(this).hasClass("ui-state-disabled")) return ("string" == typeof o ? n[o] : o).apply(n, arguments)
                }
                "string" != typeof o && (r.guid = o.guid = o.guid || r.guid || e.guid++);
                var l = a.match(/^(\w+)\s*(.*)$/),
                    c = l[1] + n.eventNamespace,
                    d = l[2];
                d ? s.delegate(d, c, r) : i.bind(c, r)
            })
        },
        _off: function (e, t) {
            t = (t || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, e.unbind(t).undelegate(t)
        },
        _delay: function (e, t) {
            var i = this;
            return setTimeout(function () {
                return ("string" == typeof e ? i[e] : e).apply(i, arguments)
            }, t || 0)
        },
        _hoverable: function (t) {
            this.hoverable = this.hoverable.add(t), this._on(t, {
                mouseenter: function (t) {
                    e(t.currentTarget).addClass("ui-state-hover")
                },
                mouseleave: function (t) {
                    e(t.currentTarget).removeClass("ui-state-hover")
                }
            })
        },
        _focusable: function (t) {
            this.focusable = this.focusable.add(t), this._on(t, {
                focusin: function (t) {
                    e(t.currentTarget).addClass("ui-state-focus")
                },
                focusout: function (t) {
                    e(t.currentTarget).removeClass("ui-state-focus")
                }
            })
        },
        _trigger: function (t, i, a) {
            var s, n, o = this.options[t];
            if (a = a || {}, (i = e.Event(i)).type = (t === this.widgetEventPrefix ? t : this.widgetEventPrefix + t).toLowerCase(), i.target = this.element[0], n = i.originalEvent)
                for (s in n) s in i || (i[s] = n[s]);
            return this.element.trigger(i, a), !(e.isFunction(o) && !1 === o.apply(this.element[0], [i].concat(a)) || i.isDefaultPrevented())
        }
    }, e.each({
        show: "fadeIn",
        hide: "fadeOut"
    }, function (t, i) {
        e.Widget.prototype["_" + t] = function (a, s, n) {
            "string" == typeof s && (s = {
                effect: s
            });
            var o, r = s ? !0 === s || "number" == typeof s ? i : s.effect || i : t;
            "number" == typeof (s = s || {}) && (s = {
                duration: s
            }), o = !e.isEmptyObject(s), s.complete = n, s.delay && a.delay(s.delay), o && e.effects && (e.effects.effect[r] || !1 !== e.uiBackCompat && e.effects[r]) ? a[t](s) : r !== t && a[r] ? a[r](s.duration, s.easing, n) : a.queue(function (i) {
                e(this)[t](), n && n.call(a[0]), i()
            })
        }
    }), !1 !== e.uiBackCompat && (e.Widget.prototype._getCreateOptions = function () {
        return e.metadata && e.metadata.get(this.element[0])[this.widgetName]
    })
}(jQuery),
function (e, t) {
    e.ui = e.ui || {};
    var i, a, s, n = Math.max,
        o = Math.abs,
        r = Math.round,
        l = /left|center|right/,
        c = /top|center|bottom/,
        d = /[\+\-]\d+%?/,
        p = /^\w+/,
        u = /%$/,
        h = e.fn.position;

    function f(e, t, i) {
        return [parseInt(e[0], 10) * (u.test(e[0]) ? t / 100 : 1), parseInt(e[1], 10) * (u.test(e[1]) ? i / 100 : 1)]
    }

    function m(t, i) {
        return parseInt(e.css(t, i), 10) || 0
    }
    e.position = {
            scrollbarWidth: function () {
                if (void 0 !== i) return i;
                var t, a, s = e("<div style='display:block;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),
                    n = s.children()[0];
                return e("body").append(s), t = n.offsetWidth, s.css("overflow", "scroll"), t === (a = n.offsetWidth) && (a = s[0].clientWidth), s.remove(), i = t - a
            },
            getScrollInfo: function (t) {
                var i = t.isWindow ? "" : t.element.css("overflow-x"),
                    a = t.isWindow ? "" : t.element.css("overflow-y"),
                    s = "scroll" === i || "auto" === i && t.width < t.element[0].scrollWidth,
                    n = "scroll" === a || "auto" === a && t.height < t.element[0].scrollHeight;
                return {
                    width: s ? e.position.scrollbarWidth() : 0,
                    height: n ? e.position.scrollbarWidth() : 0
                }
            },
            getWithinInfo: function (t) {
                var i = e(t || window),
                    a = e.isWindow(i[0]);
                return {
                    element: i,
                    isWindow: a,
                    offset: i.offset() || {
                        left: 0,
                        top: 0
                    },
                    scrollLeft: i.scrollLeft(),
                    scrollTop: i.scrollTop(),
                    width: a ? i.width() : i.outerWidth(),
                    height: a ? i.height() : i.outerHeight()
                }
            }
        }, e.fn.position = function (t) {
            if (!t || !t.of) return h.apply(this, arguments);
            t = e.extend({}, t);
            var i, a, s, u, g, v = e(t.of),
                S = e.position.getWithinInfo(t.within),
                T = e.position.getScrollInfo(S),
                b = v[0],
                E = (t.collision || "flip").split(" "),
                C = {};
            return 9 === b.nodeType ? (a = v.width(), s = v.height(), u = {
                top: 0,
                left: 0
            }) : e.isWindow(b) ? (a = v.width(), s = v.height(), u = {
                top: v.scrollTop(),
                left: v.scrollLeft()
            }) : b.preventDefault ? (t.at = "left top", a = s = 0, u = {
                top: b.pageY,
                left: b.pageX
            }) : (a = v.outerWidth(), s = v.outerHeight(), u = v.offset()), g = e.extend({}, u), e.each(["my", "at"], function () {
                var e, i, a = (t[this] || "").split(" ");
                1 === a.length && (a = l.test(a[0]) ? a.concat(["center"]) : c.test(a[0]) ? ["center"].concat(a) : ["center", "center"]), a[0] = l.test(a[0]) ? a[0] : "center", a[1] = c.test(a[1]) ? a[1] : "center", e = d.exec(a[0]), i = d.exec(a[1]), C[this] = [e ? e[0] : 0, i ? i[0] : 0], t[this] = [p.exec(a[0])[0], p.exec(a[1])[0]]
            }), 1 === E.length && (E[1] = E[0]), "right" === t.at[0] ? g.left += a : "center" === t.at[0] && (g.left += a / 2), "bottom" === t.at[1] ? g.top += s : "center" === t.at[1] && (g.top += s / 2), i = f(C.at, a, s), g.left += i[0], g.top += i[1], this.each(function () {
                var l, c, d = e(this),
                    p = d.outerWidth(),
                    h = d.outerHeight(),
                    b = m(this, "marginLeft"),
                    _ = m(this, "marginTop"),
                    y = p + b + m(this, "marginRight") + T.width,
                    O = h + _ + m(this, "marginBottom") + T.height,
                    w = e.extend({}, g),
                    A = f(C.my, d.outerWidth(), d.outerHeight());
                "right" === t.my[0] ? w.left -= p : "center" === t.my[0] && (w.left -= p / 2), "bottom" === t.my[1] ? w.top -= h : "center" === t.my[1] && (w.top -= h / 2), w.left += A[0], w.top += A[1], e.support.offsetFractions || (w.left = r(w.left), w.top = r(w.top)), l = {
                    marginLeft: b,
                    marginTop: _
                }, e.each(["left", "top"], function (n, o) {
                    e.ui.position[E[n]] && e.ui.position[E[n]][o](w, {
                        targetWidth: a,
                        targetHeight: s,
                        elemWidth: p,
                        elemHeight: h,
                        collisionPosition: l,
                        collisionWidth: y,
                        collisionHeight: O,
                        offset: [i[0] + A[0], i[1] + A[1]],
                        my: t.my,
                        at: t.at,
                        within: S,
                        elem: d
                    })
                }), e.fn.bgiframe && d.bgiframe(), t.using && (c = function (e) {
                    var i = u.left - w.left,
                        r = i + a - p,
                        l = u.top - w.top,
                        c = l + s - h,
                        f = {
                            target: {
                                element: v,
                                left: u.left,
                                top: u.top,
                                width: a,
                                height: s
                            },
                            element: {
                                element: d,
                                left: w.left,
                                top: w.top,
                                width: p,
                                height: h
                            },
                            horizontal: r < 0 ? "left" : i > 0 ? "right" : "center",
                            vertical: c < 0 ? "top" : l > 0 ? "bottom" : "middle"
                        };
                    a < p && o(i + r) < a && (f.horizontal = "center"), s < h && o(l + c) < s && (f.vertical = "middle"), n(o(i), o(r)) > n(o(l), o(c)) ? f.important = "horizontal" : f.important = "vertical", t.using.call(this, e, f)
                }), d.offset(e.extend(w, {
                    using: c
                }))
            })
        }, e.ui.position = {
            fit: {
                left: function (e, t) {
                    var i, a = t.within,
                        s = a.isWindow ? a.scrollLeft : a.offset.left,
                        o = a.width,
                        r = e.left - t.collisionPosition.marginLeft,
                        l = s - r,
                        c = r + t.collisionWidth - o - s;
                    t.collisionWidth > o ? l > 0 && c <= 0 ? (i = e.left + l + t.collisionWidth - o - s, e.left += l - i) : e.left = c > 0 && l <= 0 ? s : l > c ? s + o - t.collisionWidth : s : l > 0 ? e.left += l : c > 0 ? e.left -= c : e.left = n(e.left - r, e.left)
                },
                top: function (e, t) {
                    var i, a = t.within,
                        s = a.isWindow ? a.scrollTop : a.offset.top,
                        o = t.within.height,
                        r = e.top - t.collisionPosition.marginTop,
                        l = s - r,
                        c = r + t.collisionHeight - o - s;
                    t.collisionHeight > o ? l > 0 && c <= 0 ? (i = e.top + l + t.collisionHeight - o - s, e.top += l - i) : e.top = c > 0 && l <= 0 ? s : l > c ? s + o - t.collisionHeight : s : l > 0 ? e.top += l : c > 0 ? e.top -= c : e.top = n(e.top - r, e.top)
                }
            },
            flip: {
                left: function (e, t) {
                    var i, a, s = t.within,
                        n = s.offset.left + s.scrollLeft,
                        r = s.width,
                        l = s.isWindow ? s.scrollLeft : s.offset.left,
                        c = e.left - t.collisionPosition.marginLeft,
                        d = c - l,
                        p = c + t.collisionWidth - r - l,
                        u = "left" === t.my[0] ? -t.elemWidth : "right" === t.my[0] ? t.elemWidth : 0,
                        h = "left" === t.at[0] ? t.targetWidth : "right" === t.at[0] ? -t.targetWidth : 0,
                        f = -2 * t.offset[0];
                    d < 0 ? ((i = e.left + u + h + f + t.collisionWidth - r - n) < 0 || i < o(d)) && (e.left += u + h + f) : p > 0 && ((a = e.left - t.collisionPosition.marginLeft + u + h + f - l) > 0 || o(a) < p) && (e.left += u + h + f)
                },
                top: function (e, t) {
                    var i, a, s = t.within,
                        n = s.offset.top + s.scrollTop,
                        r = s.height,
                        l = s.isWindow ? s.scrollTop : s.offset.top,
                        c = e.top - t.collisionPosition.marginTop,
                        d = c - l,
                        p = c + t.collisionHeight - r - l,
                        u = "top" === t.my[1] ? -t.elemHeight : "bottom" === t.my[1] ? t.elemHeight : 0,
                        h = "top" === t.at[1] ? t.targetHeight : "bottom" === t.at[1] ? -t.targetHeight : 0,
                        f = -2 * t.offset[1];
                    d < 0 ? (a = e.top + u + h + f + t.collisionHeight - r - n, e.top + u + h + f > d && (a < 0 || a < o(d)) && (e.top += u + h + f)) : p > 0 && (i = e.top - t.collisionPosition.marginTop + u + h + f - l, e.top + u + h + f > p && (i > 0 || o(i) < p) && (e.top += u + h + f))
                }
            },
            flipfit: {
                left: function () {
                    e.ui.position.flip.left.apply(this, arguments), e.ui.position.fit.left.apply(this, arguments)
                },
                top: function () {
                    e.ui.position.flip.top.apply(this, arguments), e.ui.position.fit.top.apply(this, arguments)
                }
            }
        },
        function () {
            var t, i, a, s, n, o = document.getElementsByTagName("body")[0],
                r = document.createElement("div");
            for (n in t = document.createElement(o ? "div" : "body"), a = {
                    visibility: "hidden",
                    width: 0,
                    height: 0,
                    border: 0,
                    margin: 0,
                    background: "none"
                }, o && e.extend(a, {
                    position: "absolute",
                    left: "-1000px",
                    top: "-1000px"
                }), a) t.style[n] = a[n];
            t.appendChild(r), (i = o || document.documentElement).insertBefore(t, i.firstChild), r.style.cssText = "position: absolute; left: 10.7432222px;", s = e(r).offset().left, e.support.offsetFractions = s > 10 && s < 11, t.innerHTML = "", i.removeChild(t)
        }(), !1 !== e.uiBackCompat && (a = jQuery, s = a.fn.position, a.fn.position = function (e) {
            if (!e || !e.offset) return s.call(this, e);
            var t = e.offset.split(" "),
                i = e.at.split(" ");
            return 1 === t.length && (t[1] = t[0]), /^\d/.test(t[0]) && (t[0] = "+" + t[0]), /^\d/.test(t[1]) && (t[1] = "+" + t[1]), 1 === i.length && (/left|center|right/.test(i[0]) ? i[1] = "center" : (i[1] = i[0], i[0] = "center")), s.call(this, a.extend(e, {
                at: i[0] + t[0] + " " + i[1] + t[1],
                offset: void 0
            }))
        })
}(jQuery),
function ($, undefined) {
    $.extend($.ui, {
        datepicker: {
            version: "1.9.2"
        }
    });
    var PROP_NAME = "datepicker",
        dpuuid = (new Date).getTime(),
        instActive;

    function Datepicker() {
        this.debug = !1, this._curInst = null, this._keyEvent = !1, this._disabledInputs = [], this._datepickerShowing = !1, this._inDialog = !1, this._mainDivId = "ui-datepicker-div", this._inlineClass = "ui-datepicker-inline", this._appendClass = "ui-datepicker-append", this._triggerClass = "ui-datepicker-trigger", this._dialogClass = "ui-datepicker-dialog", this._disableClass = "ui-datepicker-disabled", this._unselectableClass = "ui-datepicker-unselectable", this._currentClass = "ui-datepicker-current-day", this._dayOverClass = "ui-datepicker-days-cell-over", this.regional = [], this.regional[""] = {
            closeText: "Done",
            prevText: "Prev",
            nextText: "Next",
            currentText: "Today",
            monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
            weekHeader: "Wk",
            dateFormat: "mm/dd/yy",
            firstDay: 0,
            isRTL: !1,
            showMonthAfterYear: !1,
            yearSuffix: ""
        }, this._defaults = {
            showOn: "focus",
            showAnim: "fadeIn",
            showOptions: {},
            defaultDate: null,
            appendText: "",
            buttonText: "...",
            buttonImage: "",
            buttonImageOnly: !1,
            hideIfNoPrevNext: !1,
            navigationAsDateFormat: !1,
            gotoCurrent: !1,
            changeMonth: !1,
            changeYear: !1,
            yearRange: "c-10:c+10",
            showOtherMonths: !1,
            selectOtherMonths: !1,
            showWeek: !1,
            calculateWeek: this.iso8601Week,
            shortYearCutoff: "+10",
            minDate: null,
            maxDate: null,
            duration: "fast",
            beforeShowDay: null,
            beforeShow: null,
            onSelect: null,
            onChangeMonthYear: null,
            onClose: null,
            numberOfMonths: 1,
            showCurrentAtPos: 0,
            stepMonths: 1,
            stepBigMonths: 12,
            altField: "",
            altFormat: "",
            constrainInput: !0,
            showButtonPanel: !1,
            autoSize: !1,
            disabled: !1
        }, $.extend(this._defaults, this.regional[""]), this.dpDiv = bindHover($('<div id="' + this._mainDivId + '" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>'))
    }

    function bindHover(e) {
        var t = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
        return e.delegate(t, "mouseout", function () {
            $(this).removeClass("ui-state-hover"), -1 != this.className.indexOf("ui-datepicker-prev") && $(this).removeClass("ui-datepicker-prev-hover"), -1 != this.className.indexOf("ui-datepicker-next") && $(this).removeClass("ui-datepicker-next-hover")
        }).delegate(t, "mouseover", function () {
            $.datepicker._isDisabledDatepicker(instActive.inline ? e.parent()[0] : instActive.input[0]) || ($(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"), $(this).addClass("ui-state-hover"), -1 != this.className.indexOf("ui-datepicker-prev") && $(this).addClass("ui-datepicker-prev-hover"), -1 != this.className.indexOf("ui-datepicker-next") && $(this).addClass("ui-datepicker-next-hover"))
        })
    }

    function extendRemove(e, t) {
        for (var i in $.extend(e, t), t) null != t[i] && t[i] != undefined || (e[i] = t[i]);
        return e
    }
    $.extend(Datepicker.prototype, {
        markerClassName: "hasDatepicker",
        maxRows: 4,
        log: function () {
            this.debug && console.log.apply("", arguments)
        },
        _widgetDatepicker: function () {
            return this.dpDiv
        },
        setDefaults: function (e) {
            return extendRemove(this._defaults, e || {}), this
        },
        _attachDatepicker: function (target, settings) {
            var inlineSettings = null;
            for (var attrName in this._defaults) {
                var attrValue = target.getAttribute("date:" + attrName);
                if (attrValue) {
                    inlineSettings = inlineSettings || {};
                    try {
                        inlineSettings[attrName] = eval(attrValue)
                    } catch (e) {
                        inlineSettings[attrName] = attrValue
                    }
                }
            }
            var nodeName = target.nodeName.toLowerCase(),
                inline = "div" == nodeName || "span" == nodeName;
            target.id || (this.uuid += 1, target.id = "dp" + this.uuid);
            var inst = this._newInst($(target), inline);
            inst.settings = $.extend({}, settings || {}, inlineSettings || {}), "input" == nodeName ? this._connectDatepicker(target, inst) : inline && this._inlineDatepicker(target, inst)
        },
        _newInst: function (e, t) {
            return {
                id: e[0].id.replace(/([^A-Za-z0-9_-])/g, "\\\\$1"),
                input: e,
                selectedDay: 0,
                selectedMonth: 0,
                selectedYear: 0,
                drawMonth: 0,
                drawYear: 0,
                inline: t,
                dpDiv: t ? bindHover($('<div class="' + this._inlineClass + ' ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>')) : this.dpDiv
            }
        },
        _connectDatepicker: function (e, t) {
            var i = $(e);
            t.append = $([]), t.trigger = $([]), i.hasClass(this.markerClassName) || (this._attachments(i, t), i.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp).bind("setData.datepicker", function (e, i, a) {
                t.settings[i] = a
            }).bind("getData.datepicker", function (e, i) {
                return this._get(t, i)
            }), this._autoSize(t), $.data(e, PROP_NAME, t), t.settings.disabled && this._disableDatepicker(e))
        },
        _attachments: function (e, t) {
            var i = this._get(t, "appendText"),
                a = this._get(t, "isRTL");
            t.append && t.append.remove(), i && (t.append = $('<span class="' + this._appendClass + '">' + i + "</span>"), e[a ? "before" : "after"](t.append)), e.unbind("focus", this._showDatepicker), t.trigger && t.trigger.remove();
            var s = this._get(t, "showOn");
            if ("focus" != s && "both" != s || e.focus(this._showDatepicker), "button" == s || "both" == s) {
                var n = this._get(t, "buttonText"),
                    o = this._get(t, "buttonImage");
                t.trigger = $(this._get(t, "buttonImageOnly") ? $("<img/>").addClass(this._triggerClass).attr({
                    src: o,
                    alt: n,
                    title: n
                }) : $('<button type="button"></button>').addClass(this._triggerClass).html("" == o ? n : $("<img/>").attr({
                    src: o,
                    alt: n,
                    title: n
                }))), e[a ? "before" : "after"](t.trigger), t.trigger.click(function () {
                    return $.datepicker._datepickerShowing && $.datepicker._lastInput == e[0] ? $.datepicker._hideDatepicker() : $.datepicker._datepickerShowing && $.datepicker._lastInput != e[0] ? ($.datepicker._hideDatepicker(), $.datepicker._showDatepicker(e[0])) : $.datepicker._showDatepicker(e[0]), !1
                })
            }
        },
        _autoSize: function (e) {
            if (this._get(e, "autoSize") && !e.inline) {
                var t = new Date(2009, 11, 20),
                    i = this._get(e, "dateFormat");
                if (i.match(/[DM]/)) {
                    var a = function (e) {
                        for (var t = 0, i = 0, a = 0; a < e.length; a++) e[a].length > t && (t = e[a].length, i = a);
                        return i
                    };
                    t.setMonth(a(this._get(e, i.match(/MM/) ? "monthNames" : "monthNamesShort"))), t.setDate(a(this._get(e, i.match(/DD/) ? "dayNames" : "dayNamesShort")) + 20 - t.getDay())
                }
                e.input.attr("size", this._formatDate(e, t).length)
            }
        },
        _inlineDatepicker: function (e, t) {
            var i = $(e);
            i.hasClass(this.markerClassName) || (i.addClass(this.markerClassName).append(t.dpDiv).bind("setData.datepicker", function (e, i, a) {
                t.settings[i] = a
            }).bind("getData.datepicker", function (e, i) {
                return this._get(t, i)
            }), $.data(e, PROP_NAME, t), this._setDate(t, this._getDefaultDate(t), !0), this._updateDatepicker(t), this._updateAlternate(t), t.settings.disabled && this._disableDatepicker(e), t.dpDiv.css("display", "block"))
        },
        _dialogDatepicker: function (e, t, i, a, s) {
            var n = this._dialogInst;
            if (!n) {
                this.uuid += 1;
                var o = "dp" + this.uuid;
                this._dialogInput = $('<input type="text" id="' + o + '" style="position: absolute; top: -100px; width: 0px;"/>'), this._dialogInput.keydown(this._doKeyDown), $("body").append(this._dialogInput), (n = this._dialogInst = this._newInst(this._dialogInput, !1)).settings = {}, $.data(this._dialogInput[0], PROP_NAME, n)
            }
            if (extendRemove(n.settings, a || {}), t = t && t.constructor == Date ? this._formatDate(n, t) : t, this._dialogInput.val(t), this._pos = s ? s.length ? s : [s.pageX, s.pageY] : null, !this._pos) {
                var r = document.documentElement.clientWidth,
                    l = document.documentElement.clientHeight,
                    c = document.documentElement.scrollLeft || document.body.scrollLeft,
                    d = document.documentElement.scrollTop || document.body.scrollTop;
                this._pos = [r / 2 - 100 + c, l / 2 - 150 + d]
            }
            return this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px"), n.settings.onSelect = i, this._inDialog = !0, this.dpDiv.addClass(this._dialogClass), this._showDatepicker(this._dialogInput[0]), $.blockUI && $.blockUI(this.dpDiv), $.data(this._dialogInput[0], PROP_NAME, n), this
        },
        _destroyDatepicker: function (e) {
            var t = $(e),
                i = $.data(e, PROP_NAME);
            if (t.hasClass(this.markerClassName)) {
                var a = e.nodeName.toLowerCase();
                $.removeData(e, PROP_NAME), "input" == a ? (i.append.remove(), i.trigger.remove(), t.removeClass(this.markerClassName).unbind("focus", this._showDatepicker).unbind("keydown", this._doKeyDown).unbind("keypress", this._doKeyPress).unbind("keyup", this._doKeyUp)) : "div" != a && "span" != a || t.removeClass(this.markerClassName).empty()
            }
        },
        _enableDatepicker: function (e) {
            var t = $(e),
                i = $.data(e, PROP_NAME);
            if (t.hasClass(this.markerClassName)) {
                var a = e.nodeName.toLowerCase();
                if ("input" == a) e.disabled = !1, i.trigger.filter("button").each(function () {
                    this.disabled = !1
                }).end().filter("img").css({
                    opacity: "1.0",
                    cursor: ""
                });
                else if ("div" == a || "span" == a) {
                    var s = t.children("." + this._inlineClass);
                    s.children().removeClass("ui-state-disabled"), s.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !1)
                }
                this._disabledInputs = $.map(this._disabledInputs, function (t) {
                    return t == e ? null : t
                })
            }
        },
        _disableDatepicker: function (e) {
            var t = $(e),
                i = $.data(e, PROP_NAME);
            if (t.hasClass(this.markerClassName)) {
                var a = e.nodeName.toLowerCase();
                if ("input" == a) e.disabled = !0, i.trigger.filter("button").each(function () {
                    this.disabled = !0
                }).end().filter("img").css({
                    opacity: "0.5",
                    cursor: "default"
                });
                else if ("div" == a || "span" == a) {
                    var s = t.children("." + this._inlineClass);
                    s.children().addClass("ui-state-disabled"), s.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !0)
                }
                this._disabledInputs = $.map(this._disabledInputs, function (t) {
                    return t == e ? null : t
                }), this._disabledInputs[this._disabledInputs.length] = e
            }
        },
        _isDisabledDatepicker: function (e) {
            if (!e) return !1;
            for (var t = 0; t < this._disabledInputs.length; t++)
                if (this._disabledInputs[t] == e) return !0;
            return !1
        },
        _getInst: function (e) {
            try {
                return $.data(e, PROP_NAME)
            } catch (e) {
                throw "Missing instance data for this datepicker"
            }
        },
        _optionDatepicker: function (e, t, i) {
            var a = this._getInst(e);
            if (2 == arguments.length && "string" == typeof t) return "defaults" == t ? $.extend({}, $.datepicker._defaults) : a ? "all" == t ? $.extend({}, a.settings) : this._get(a, t) : null;
            var s = t || {};
            if ("string" == typeof t && ((s = {})[t] = i), a) {
                this._curInst == a && this._hideDatepicker();
                var n = this._getDateDatepicker(e, !0),
                    o = this._getMinMaxDate(a, "min"),
                    r = this._getMinMaxDate(a, "max");
                extendRemove(a.settings, s), null !== o && s.dateFormat !== undefined && s.minDate === undefined && (a.settings.minDate = this._formatDate(a, o)), null !== r && s.dateFormat !== undefined && s.maxDate === undefined && (a.settings.maxDate = this._formatDate(a, r)), this._attachments($(e), a), this._autoSize(a), this._setDate(a, n), this._updateAlternate(a), this._updateDatepicker(a)
            }
        },
        _changeDatepicker: function (e, t, i) {
            this._optionDatepicker(e, t, i)
        },
        _refreshDatepicker: function (e) {
            var t = this._getInst(e);
            t && this._updateDatepicker(t)
        },
        _setDateDatepicker: function (e, t) {
            var i = this._getInst(e);
            i && (this._setDate(i, t), this._updateDatepicker(i), this._updateAlternate(i))
        },
        _getDateDatepicker: function (e, t) {
            var i = this._getInst(e);
            return i && !i.inline && this._setDateFromField(i, t), i ? this._getDate(i) : null
        },
        _doKeyDown: function (e) {
            var t = $.datepicker._getInst(e.target),
                i = !0,
                a = t.dpDiv.is(".ui-datepicker-rtl");
            if (t._keyEvent = !0, $.datepicker._datepickerShowing) switch (e.keyCode) {
                case 9:
                    $.datepicker._hideDatepicker(), i = !1;
                    break;
                case 13:
                    var s = $("td." + $.datepicker._dayOverClass + ":not(." + $.datepicker._currentClass + ")", t.dpDiv);
                    s[0] && $.datepicker._selectDay(e.target, t.selectedMonth, t.selectedYear, s[0]);
                    var n = $.datepicker._get(t, "onSelect");
                    if (n) {
                        var o = $.datepicker._formatDate(t);
                        n.apply(t.input ? t.input[0] : null, [o, t])
                    } else $.datepicker._hideDatepicker();
                    return !1;
                case 27:
                    $.datepicker._hideDatepicker();
                    break;
                case 33:
                    $.datepicker._adjustDate(e.target, e.ctrlKey ? -$.datepicker._get(t, "stepBigMonths") : -$.datepicker._get(t, "stepMonths"), "M");
                    break;
                case 34:
                    $.datepicker._adjustDate(e.target, e.ctrlKey ? +$.datepicker._get(t, "stepBigMonths") : +$.datepicker._get(t, "stepMonths"), "M");
                    break;
                case 35:
                    (e.ctrlKey || e.metaKey) && $.datepicker._clearDate(e.target), i = e.ctrlKey || e.metaKey;
                    break;
                case 36:
                    (e.ctrlKey || e.metaKey) && $.datepicker._gotoToday(e.target), i = e.ctrlKey || e.metaKey;
                    break;
                case 37:
                    (e.ctrlKey || e.metaKey) && $.datepicker._adjustDate(e.target, a ? 1 : -1, "D"), i = e.ctrlKey || e.metaKey, e.originalEvent.altKey && $.datepicker._adjustDate(e.target, e.ctrlKey ? -$.datepicker._get(t, "stepBigMonths") : -$.datepicker._get(t, "stepMonths"), "M");
                    break;
                case 38:
                    (e.ctrlKey || e.metaKey) && $.datepicker._adjustDate(e.target, -7, "D"), i = e.ctrlKey || e.metaKey;
                    break;
                case 39:
                    (e.ctrlKey || e.metaKey) && $.datepicker._adjustDate(e.target, a ? -1 : 1, "D"), i = e.ctrlKey || e.metaKey, e.originalEvent.altKey && $.datepicker._adjustDate(e.target, e.ctrlKey ? +$.datepicker._get(t, "stepBigMonths") : +$.datepicker._get(t, "stepMonths"), "M");
                    break;
                case 40:
                    (e.ctrlKey || e.metaKey) && $.datepicker._adjustDate(e.target, 7, "D"), i = e.ctrlKey || e.metaKey;
                    break;
                default:
                    i = !1
            } else 36 == e.keyCode && e.ctrlKey ? $.datepicker._showDatepicker(this) : i = !1;
            i && (e.preventDefault(), e.stopPropagation())
        },
        _doKeyPress: function (e) {
            var t = $.datepicker._getInst(e.target);
            if ($.datepicker._get(t, "constrainInput")) {
                var i = $.datepicker._possibleChars($.datepicker._get(t, "dateFormat")),
                    a = String.fromCharCode(e.charCode == undefined ? e.keyCode : e.charCode);
                return e.ctrlKey || e.metaKey || a < " " || !i || i.indexOf(a) > -1
            }
        },
        _doKeyUp: function (e) {
            var t = $.datepicker._getInst(e.target);
            if (t.input.val() != t.lastVal) try {
                $.datepicker.parseDate($.datepicker._get(t, "dateFormat"), t.input ? t.input.val() : null, $.datepicker._getFormatConfig(t)) && ($.datepicker._setDateFromField(t), $.datepicker._updateAlternate(t), $.datepicker._updateDatepicker(t))
            } catch (e) {
                $.datepicker.log(e)
            }
            return !0
        },
        _showDatepicker: function (e) {
            if ("input" != (e = e.target || e).nodeName.toLowerCase() && (e = $("input", e.parentNode)[0]), !$.datepicker._isDisabledDatepicker(e) && $.datepicker._lastInput != e) {
                var t = $.datepicker._getInst(e);
                $.datepicker._curInst && $.datepicker._curInst != t && ($.datepicker._curInst.dpDiv.stop(!0, !0), t && $.datepicker._datepickerShowing && $.datepicker._hideDatepicker($.datepicker._curInst.input[0]));
                var i = $.datepicker._get(t, "beforeShow"),
                    a = i ? i.apply(e, [e, t]) : {};
                if (!1 !== a) {
                    extendRemove(t.settings, a), t.lastVal = null, $.datepicker._lastInput = e, $.datepicker._setDateFromField(t), $.datepicker._inDialog && (e.value = ""), $.datepicker._pos || ($.datepicker._pos = $.datepicker._findPos(e), $.datepicker._pos[1] += e.offsetHeight);
                    var s = !1;
                    $(e).parents().each(function () {
                        return !(s |= "fixed" == $(this).css("position"))
                    });
                    var n = {
                        left: $.datepicker._pos[0],
                        top: $.datepicker._pos[1]
                    };
                    if ($.datepicker._pos = null, t.dpDiv.empty(), t.dpDiv.css({
                            position: "absolute",
                            display: "block",
                            top: "-1000px"
                        }), $.datepicker._updateDatepicker(t), n = $.datepicker._checkOffset(t, n, s), t.dpDiv.css({
                            position: $.datepicker._inDialog && $.blockUI ? "static" : s ? "fixed" : "absolute",
                            display: "none",
                            left: n.left + "px",
                            top: n.top + "px"
                        }), !t.inline) {
                        var o = $.datepicker._get(t, "showAnim"),
                            r = $.datepicker._get(t, "duration"),
                            l = function () {
                                var e = t.dpDiv.find("iframe.ui-datepicker-cover");
                                if (e.length) {
                                    var i = $.datepicker._getBorders(t.dpDiv);
                                    e.css({
                                        left: -i[0],
                                        top: -i[1],
                                        width: t.dpDiv.outerWidth(),
                                        height: t.dpDiv.outerHeight()
                                    })
                                }
                            };
                        t.dpDiv.zIndex($(e).zIndex() + 1), $.datepicker._datepickerShowing = !0, $.effects && ($.effects.effect[o] || $.effects[o]) ? t.dpDiv.show(o, $.datepicker._get(t, "showOptions"), r, l) : t.dpDiv[o || "show"](o ? r : null, l), o && r || l(), t.input.is(":visible") && !t.input.is(":disabled") && t.input.focus(), $.datepicker._curInst = t
                    }
                }
            }
        },
        _updateDatepicker: function (e) {
            this.maxRows = 4;
            var t = $.datepicker._getBorders(e.dpDiv);
            instActive = e, e.dpDiv.empty().append(this._generateHTML(e)), this._attachHandlers(e);
            var i = e.dpDiv.find("iframe.ui-datepicker-cover");
            i.length && i.css({
                left: -t[0],
                top: -t[1],
                width: e.dpDiv.outerWidth(),
                height: e.dpDiv.outerHeight()
            }), e.dpDiv.find("." + this._dayOverClass + " a").mouseover();
            var a = this._getNumberOfMonths(e),
                s = a[1];
            if (e.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""), s > 1 && e.dpDiv.addClass("ui-datepicker-multi-" + s).css("width", 17 * s + "em"), e.dpDiv[(1 != a[0] || 1 != a[1] ? "add" : "remove") + "Class"]("ui-datepicker-multi"), e.dpDiv[(this._get(e, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl"), e == $.datepicker._curInst && $.datepicker._datepickerShowing && e.input && e.input.is(":visible") && !e.input.is(":disabled") && e.input[0] != document.activeElement && e.input.focus(), e.yearshtml) {
                var n = e.yearshtml;
                setTimeout(function () {
                    n === e.yearshtml && e.yearshtml && e.dpDiv.find("select.ui-datepicker-year:first").replaceWith(e.yearshtml), n = e.yearshtml = null
                }, 0)
            }
        },
        _getBorders: function (e) {
            var t = function (e) {
                return {
                    thin: 1,
                    medium: 2,
                    thick: 3
                }[e] || e
            };
            return [parseFloat(t(e.css("border-left-width"))), parseFloat(t(e.css("border-top-width")))]
        },
        _checkOffset: function (e, t, i) {
            var a = e.dpDiv.outerWidth(),
                s = e.dpDiv.outerHeight(),
                n = e.input ? e.input.outerWidth() : 0,
                o = e.input ? e.input.outerHeight() : 0,
                r = document.documentElement.clientWidth + (i ? 0 : $(document).scrollLeft()),
                l = document.documentElement.clientHeight + (i ? 0 : $(document).scrollTop());
            return t.left -= this._get(e, "isRTL") ? a - n : 0, t.left -= i && t.left == e.input.offset().left ? $(document).scrollLeft() : 0, t.top -= i && t.top == e.input.offset().top + o ? $(document).scrollTop() : 0, t.left -= Math.min(t.left, t.left + a > r && r > a ? Math.abs(t.left + a - r) : 0), t.top -= Math.min(t.top, t.top + s > l && l > s ? Math.abs(s + o) : 0), t
        },
        _findPos: function (e) {
            for (var t = this._getInst(e), i = this._get(t, "isRTL"); e && ("hidden" == e.type || 1 != e.nodeType || $.expr.filters.hidden(e));) e = e[i ? "previousSibling" : "nextSibling"];
            var a = $(e).offset();
            return [a.left, a.top]
        },
        _hideDatepicker: function (e) {
            var t = this._curInst;
            if (t && (!e || t == $.data(e, PROP_NAME)) && this._datepickerShowing) {
                var i = this._get(t, "showAnim"),
                    a = this._get(t, "duration"),
                    s = function () {
                        $.datepicker._tidyDialog(t)
                    };
                $.effects && ($.effects.effect[i] || $.effects[i]) ? t.dpDiv.hide(i, $.datepicker._get(t, "showOptions"), a, s) : t.dpDiv["slideDown" == i ? "slideUp" : "fadeIn" == i ? "fadeOut" : "hide"](i ? a : null, s), i || s(), this._datepickerShowing = !1;
                var n = this._get(t, "onClose");
                n && n.apply(t.input ? t.input[0] : null, [t.input ? t.input.val() : "", t]), this._lastInput = null, this._inDialog && (this._dialogInput.css({
                    position: "absolute",
                    left: "0",
                    top: "-100px"
                }), $.blockUI && ($.unblockUI(), $("body").append(this.dpDiv))), this._inDialog = !1
            }
        },
        _tidyDialog: function (e) {
            e.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")
        },
        _checkExternalClick: function (e) {
            if ($.datepicker._curInst) {
                var t = $(e.target),
                    i = $.datepicker._getInst(t[0]);
                (t[0].id == $.datepicker._mainDivId || 0 != t.parents("#" + $.datepicker._mainDivId).length || t.hasClass($.datepicker.markerClassName) || t.closest("." + $.datepicker._triggerClass).length || !$.datepicker._datepickerShowing || $.datepicker._inDialog && $.blockUI) && (!t.hasClass($.datepicker.markerClassName) || $.datepicker._curInst == i) || $.datepicker._hideDatepicker()
            }
        },
        _adjustDate: function (e, t, i) {
            var a = $(e),
                s = this._getInst(a[0]);
            this._isDisabledDatepicker(a[0]) || (this._adjustInstDate(s, t + ("M" == i ? this._get(s, "showCurrentAtPos") : 0), i), this._updateDatepicker(s))
        },
        _gotoToday: function (e) {
            var t = $(e),
                i = this._getInst(t[0]);
            if (this._get(i, "gotoCurrent") && i.currentDay) i.selectedDay = i.currentDay, i.drawMonth = i.selectedMonth = i.currentMonth, i.drawYear = i.selectedYear = i.currentYear;
            else {
                var a = new Date;
                i.selectedDay = a.getDate(), i.drawMonth = i.selectedMonth = a.getMonth(), i.drawYear = i.selectedYear = a.getFullYear()
            }
            this._notifyChange(i), this._adjustDate(t)
        },
        _selectMonthYear: function (e, t, i) {
            var a = $(e),
                s = this._getInst(a[0]);
            s["selected" + ("M" == i ? "Month" : "Year")] = s["draw" + ("M" == i ? "Month" : "Year")] = parseInt(t.options[t.selectedIndex].value, 10), this._notifyChange(s), this._adjustDate(a)
        },
        _selectDay: function (e, t, i, a) {
            var s = $(e);
            if (!$(a).hasClass(this._unselectableClass) && !this._isDisabledDatepicker(s[0])) {
                var n = this._getInst(s[0]);
                n.selectedDay = n.currentDay = $("a", a).html(), n.selectedMonth = n.currentMonth = t, n.selectedYear = n.currentYear = i, this._selectDate(e, this._formatDate(n, n.currentDay, n.currentMonth, n.currentYear))
            }
        },
        _clearDate: function (e) {
            var t = $(e);
            this._getInst(t[0]);
            this._selectDate(t, "")
        },
        _selectDate: function (e, t) {
            var i = $(e),
                a = this._getInst(i[0]);
            t = null != t ? t : this._formatDate(a), a.input && a.input.val(t), this._updateAlternate(a);
            var s = this._get(a, "onSelect");
            s ? s.apply(a.input ? a.input[0] : null, [t, a]) : a.input && a.input.trigger("change"), a.inline ? this._updateDatepicker(a) : (this._hideDatepicker(), this._lastInput = a.input[0], "object" != typeof a.input[0] && a.input.focus(), this._lastInput = null)
        },
        _updateAlternate: function (e) {
            var t = this._get(e, "altField");
            if (t) {
                var i = this._get(e, "altFormat") || this._get(e, "dateFormat"),
                    a = this._getDate(e),
                    s = this.formatDate(i, a, this._getFormatConfig(e));
                $(t).each(function () {
                    $(this).val(s)
                })
            }
        },
        noWeekends: function (e) {
            var t = e.getDay();
            return [t > 0 && t < 6, ""]
        },
        iso8601Week: function (e) {
            var t = new Date(e.getTime());
            t.setDate(t.getDate() + 4 - (t.getDay() || 7));
            var i = t.getTime();
            return t.setMonth(0), t.setDate(1), Math.floor(Math.round((i - t) / 864e5) / 7) + 1
        },
        parseDate: function (e, t, i) {
            if (null == e || null == t) throw "Invalid arguments";
            if ("" == (t = "object" == typeof t ? t.toString() : t + "")) return null;
            var a = (i ? i.shortYearCutoff : null) || this._defaults.shortYearCutoff;
            a = "string" != typeof a ? a : (new Date).getFullYear() % 100 + parseInt(a, 10);
            for (var s = (i ? i.dayNamesShort : null) || this._defaults.dayNamesShort, n = (i ? i.dayNames : null) || this._defaults.dayNames, o = (i ? i.monthNamesShort : null) || this._defaults.monthNamesShort, r = (i ? i.monthNames : null) || this._defaults.monthNames, l = -1, c = -1, d = -1, p = -1, u = !1, h = function (t) {
                    var i = S + 1 < e.length && e.charAt(S + 1) == t;
                    return i && S++, i
                }, f = function (e) {
                    var i = h(e),
                        a = new RegExp("^\\d{1," + ("@" == e ? 14 : "!" == e ? 20 : "y" == e && i ? 4 : "o" == e ? 3 : 2) + "}"),
                        s = t.substring(v).match(a);
                    if (!s) throw "Missing number at position " + v;
                    return v += s[0].length, parseInt(s[0], 10)
                }, m = function (e, i, a) {
                    var s = $.map(h(e) ? a : i, function (e, t) {
                            return [
                                [t, e]
                            ]
                        }).sort(function (e, t) {
                            return -(e[1].length - t[1].length)
                        }),
                        n = -1;
                    if ($.each(s, function (e, i) {
                            var a = i[1];
                            if (t.substr(v, a.length).toLowerCase() == a.toLowerCase()) return n = i[0], v += a.length, !1
                        }), -1 != n) return n + 1;
                    throw "Unknown name at position " + v
                }, g = function () {
                    if (t.charAt(v) != e.charAt(S)) throw "Unexpected literal at position " + v;
                    v++
                }, v = 0, S = 0; S < e.length; S++)
                if (u) "'" != e.charAt(S) || h("'") ? g() : u = !1;
                else switch (e.charAt(S)) {
                    case "d":
                        d = f("d");
                        break;
                    case "D":
                        m("D", s, n);
                        break;
                    case "o":
                        p = f("o");
                        break;
                    case "m":
                        c = f("m");
                        break;
                    case "M":
                        c = m("M", o, r);
                        break;
                    case "y":
                        l = f("y");
                        break;
                    case "@":
                        l = (T = new Date(f("@"))).getFullYear(), c = T.getMonth() + 1, d = T.getDate();
                        break;
                    case "!":
                        var T;
                        l = (T = new Date((f("!") - this._ticksTo1970) / 1e4)).getFullYear(), c = T.getMonth() + 1, d = T.getDate();
                        break;
                    case "'":
                        h("'") ? g() : u = !0;
                        break;
                    default:
                        g()
                }
            if (v < t.length) {
                var b = t.substr(v);
                if (!/^\s+/.test(b)) throw "Extra/unparsed characters found in date: " + b
            }
            if (-1 == l ? l = (new Date).getFullYear() : l < 100 && (l += (new Date).getFullYear() - (new Date).getFullYear() % 100 + (l <= a ? 0 : -100)), p > -1)
                for (c = 1, d = p;;) {
                    var E = this._getDaysInMonth(l, c - 1);
                    if (d <= E) break;
                    c++, d -= E
                }
            if ((T = this._daylightSavingAdjust(new Date(l, c - 1, d))).getFullYear() != l || T.getMonth() + 1 != c || T.getDate() != d) throw "Invalid date";
            return T
        },
        ATOM: "yy-mm-dd",
        COOKIE: "D, dd M yy",
        ISO_8601: "yy-mm-dd",
        RFC_822: "D, d M y",
        RFC_850: "DD, dd-M-y",
        RFC_1036: "D, d M y",
        RFC_1123: "D, d M yy",
        RFC_2822: "D, d M yy",
        RSS: "D, d M y",
        TICKS: "!",
        TIMESTAMP: "@",
        W3C: "yy-mm-dd",
        _ticksTo1970: 24 * (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)) * 60 * 60 * 1e7,
        formatDate: function (e, t, i) {
            if (!t) return "";
            var a = (i ? i.dayNamesShort : null) || this._defaults.dayNamesShort,
                s = (i ? i.dayNames : null) || this._defaults.dayNames,
                n = (i ? i.monthNamesShort : null) || this._defaults.monthNamesShort,
                o = (i ? i.monthNames : null) || this._defaults.monthNames,
                r = function (t) {
                    var i = u + 1 < e.length && e.charAt(u + 1) == t;
                    return i && u++, i
                },
                l = function (e, t, i) {
                    var a = "" + t;
                    if (r(e))
                        for (; a.length < i;) a = "0" + a;
                    return a
                },
                c = function (e, t, i, a) {
                    return r(e) ? a[t] : i[t]
                },
                d = "",
                p = !1;
            if (t)
                for (var u = 0; u < e.length; u++)
                    if (p) "'" != e.charAt(u) || r("'") ? d += e.charAt(u) : p = !1;
                    else switch (e.charAt(u)) {
                        case "d":
                            d += l("d", t.getDate(), 2);
                            break;
                        case "D":
                            d += c("D", t.getDay(), a, s);
                            break;
                        case "o":
                            d += l("o", Math.round((new Date(t.getFullYear(), t.getMonth(), t.getDate()).getTime() - new Date(t.getFullYear(), 0, 0).getTime()) / 864e5), 3);
                            break;
                        case "m":
                            d += l("m", t.getMonth() + 1, 2);
                            break;
                        case "M":
                            d += c("M", t.getMonth(), n, o);
                            break;
                        case "y":
                            d += r("y") ? t.getFullYear() : (t.getYear() % 100 < 10 ? "0" : "") + t.getYear() % 100;
                            break;
                        case "@":
                            d += t.getTime();
                            break;
                        case "!":
                            d += 1e4 * t.getTime() + this._ticksTo1970;
                            break;
                        case "'":
                            r("'") ? d += "'" : p = !0;
                            break;
                        default:
                            d += e.charAt(u)
                    }
            return d
        },
        _possibleChars: function (e) {
            for (var t = "", i = !1, a = function (t) {
                    var i = s + 1 < e.length && e.charAt(s + 1) == t;
                    return i && s++, i
                }, s = 0; s < e.length; s++)
                if (i) "'" != e.charAt(s) || a("'") ? t += e.charAt(s) : i = !1;
                else switch (e.charAt(s)) {
                    case "d":
                    case "m":
                    case "y":
                    case "@":
                        t += "0123456789";
                        break;
                    case "D":
                    case "M":
                        return null;
                    case "'":
                        a("'") ? t += "'" : i = !0;
                        break;
                    default:
                        t += e.charAt(s)
                }
            return t
        },
        _get: function (e, t) {
            return e.settings[t] !== undefined ? e.settings[t] : this._defaults[t]
        },
        _setDateFromField: function (e, t) {
            if (e.input.val() != e.lastVal) {
                var i, a, s = this._get(e, "dateFormat"),
                    n = e.lastVal = e.input ? e.input.val() : null;
                i = a = this._getDefaultDate(e);
                var o = this._getFormatConfig(e);
                try {
                    i = this.parseDate(s, n, o) || a
                } catch (e) {
                    this.log(e), n = t ? "" : n
                }
                e.selectedDay = i.getDate(), e.drawMonth = e.selectedMonth = i.getMonth(), e.drawYear = e.selectedYear = i.getFullYear(), e.currentDay = n ? i.getDate() : 0, e.currentMonth = n ? i.getMonth() : 0, e.currentYear = n ? i.getFullYear() : 0, this._adjustInstDate(e)
            }
        },
        _getDefaultDate: function (e) {
            return this._restrictMinMax(e, this._determineDate(e, this._get(e, "defaultDate"), new Date))
        },
        _determineDate: function (e, t, i) {
            var a, s, n = null == t || "" === t ? i : "string" == typeof t ? function (t) {
                try {
                    return $.datepicker.parseDate($.datepicker._get(e, "dateFormat"), t, $.datepicker._getFormatConfig(e))
                } catch (e) {}
                for (var i = (t.toLowerCase().match(/^c/) ? $.datepicker._getDate(e) : null) || new Date, a = i.getFullYear(), s = i.getMonth(), n = i.getDate(), o = /([+-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g, r = o.exec(t); r;) {
                    switch (r[2] || "d") {
                        case "d":
                        case "D":
                            n += parseInt(r[1], 10);
                            break;
                        case "w":
                        case "W":
                            n += 7 * parseInt(r[1], 10);
                            break;
                        case "m":
                        case "M":
                            s += parseInt(r[1], 10), n = Math.min(n, $.datepicker._getDaysInMonth(a, s));
                            break;
                        case "y":
                        case "Y":
                            a += parseInt(r[1], 10), n = Math.min(n, $.datepicker._getDaysInMonth(a, s))
                    }
                    r = o.exec(t)
                }
                return new Date(a, s, n)
            }(t) : "number" == typeof t ? isNaN(t) ? i : (a = t, (s = new Date).setDate(s.getDate() + a), s) : new Date(t.getTime());
            return (n = n && "Invalid Date" == n.toString() ? i : n) && (n.setHours(0), n.setMinutes(0), n.setSeconds(0), n.setMilliseconds(0)), this._daylightSavingAdjust(n)
        },
        _daylightSavingAdjust: function (e) {
            return e ? (e.setHours(e.getHours() > 12 ? e.getHours() + 2 : 0), e) : null
        },
        _setDate: function (e, t, i) {
            var a = !t,
                s = e.selectedMonth,
                n = e.selectedYear,
                o = this._restrictMinMax(e, this._determineDate(e, t, new Date));
            e.selectedDay = e.currentDay = o.getDate(), e.drawMonth = e.selectedMonth = e.currentMonth = o.getMonth(), e.drawYear = e.selectedYear = e.currentYear = o.getFullYear(), s == e.selectedMonth && n == e.selectedYear || i || this._notifyChange(e), this._adjustInstDate(e), e.input && e.input.val(a ? "" : this._formatDate(e))
        },
        _getDate: function (e) {
            return !e.currentYear || e.input && "" == e.input.val() ? null : this._daylightSavingAdjust(new Date(e.currentYear, e.currentMonth, e.currentDay))
        },
        _attachHandlers: function (e) {
            var t = this._get(e, "stepMonths"),
                i = "#" + e.id.replace(/\\\\/g, "\\");
            e.dpDiv.find("[data-handler]").map(function () {
                var e = {
                    prev: function () {
                        window["DP_jQuery_" + dpuuid].datepicker._adjustDate(i, -t, "M")
                    },
                    next: function () {
                        window["DP_jQuery_" + dpuuid].datepicker._adjustDate(i, +t, "M")
                    },
                    hide: function () {
                        window["DP_jQuery_" + dpuuid].datepicker._hideDatepicker()
                    },
                    today: function () {
                        window["DP_jQuery_" + dpuuid].datepicker._gotoToday(i)
                    },
                    selectDay: function () {
                        return window["DP_jQuery_" + dpuuid].datepicker._selectDay(i, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this), !1
                    },
                    selectMonth: function () {
                        return window["DP_jQuery_" + dpuuid].datepicker._selectMonthYear(i, this, "M"), !1
                    },
                    selectYear: function () {
                        return window["DP_jQuery_" + dpuuid].datepicker._selectMonthYear(i, this, "Y"), !1
                    }
                };
                $(this).bind(this.getAttribute("data-event"), e[this.getAttribute("data-handler")])
            })
        },
        _generateHTML: function (e) {
            var t = new Date;
            t = this._daylightSavingAdjust(new Date(t.getFullYear(), t.getMonth(), t.getDate()));
            var i = this._get(e, "isRTL"),
                a = this._get(e, "showButtonPanel"),
                s = this._get(e, "hideIfNoPrevNext"),
                n = this._get(e, "navigationAsDateFormat"),
                o = this._getNumberOfMonths(e),
                r = this._get(e, "showCurrentAtPos"),
                l = this._get(e, "stepMonths"),
                c = 1 != o[0] || 1 != o[1],
                d = this._daylightSavingAdjust(e.currentDay ? new Date(e.currentYear, e.currentMonth, e.currentDay) : new Date(9999, 9, 9)),
                p = this._getMinMaxDate(e, "min"),
                u = this._getMinMaxDate(e, "max"),
                h = e.drawMonth - r,
                f = e.drawYear;
            if (h < 0 && (h += 12, f--), u) {
                var m = this._daylightSavingAdjust(new Date(u.getFullYear(), u.getMonth() - o[0] * o[1] + 1, u.getDate()));
                for (m = p && m < p ? p : m; this._daylightSavingAdjust(new Date(f, h, 1)) > m;) --h < 0 && (h = 11, f--)
            }
            e.drawMonth = h, e.drawYear = f;
            var g = this._get(e, "prevText");
            g = n ? this.formatDate(g, this._daylightSavingAdjust(new Date(f, h - l, 1)), this._getFormatConfig(e)) : g;
            var v = this._canAdjustMonth(e, -1, f, h) ? '<a class="ui-datepicker-prev ui-corner-all" data-handler="prev" data-event="click" title="' + g + '"><span class="ui-icon ui-icon-circle-triangle-' + (i ? "e" : "w") + '">' + g + "</span></a>" : s ? "" : '<a class="ui-datepicker-prev ui-corner-all ui-state-disabled" title="' + g + '"><span class="ui-icon ui-icon-circle-triangle-' + (i ? "e" : "w") + '">' + g + "</span></a>",
                S = this._get(e, "nextText");
            S = n ? this.formatDate(S, this._daylightSavingAdjust(new Date(f, h + l, 1)), this._getFormatConfig(e)) : S;
            var T = this._canAdjustMonth(e, 1, f, h) ? '<a class="ui-datepicker-next ui-corner-all" data-handler="next" data-event="click" title="' + S + '"><span class="ui-icon ui-icon-circle-triangle-' + (i ? "w" : "e") + '">' + S + "</span></a>" : s ? "" : '<a class="ui-datepicker-next ui-corner-all ui-state-disabled" title="' + S + '"><span class="ui-icon ui-icon-circle-triangle-' + (i ? "w" : "e") + '">' + S + "</span></a>",
                b = this._get(e, "currentText"),
                E = this._get(e, "gotoCurrent") && e.currentDay ? d : t;
            b = n ? this.formatDate(b, E, this._getFormatConfig(e)) : b;
            var C = e.inline ? "" : '<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" data-handler="hide" data-event="click">' + this._get(e, "closeText") + "</button>",
                _ = a ? '<div class="ui-datepicker-buttonpane ui-widget-content">' + (i ? C : "") + (this._isInRange(e, E) ? '<button type="button" class="ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all" data-handler="today" data-event="click">' + b + "</button>" : "") + (i ? "" : C) + "</div>" : "",
                y = parseInt(this._get(e, "firstDay"), 10);
            y = isNaN(y) ? 0 : y;
            for (var O = this._get(e, "showWeek"), w = this._get(e, "dayNames"), A = (this._get(e, "dayNamesShort"), this._get(e, "dayNamesMin")), k = this._get(e, "monthNames"), P = this._get(e, "monthNamesShort"), I = this._get(e, "beforeShowDay"), L = this._get(e, "showOtherMonths"), B = this._get(e, "selectOtherMonths"), N = (this._get(e, "calculateWeek") || this.iso8601Week, this._getDefaultDate(e)), D = "", M = 0; M < o[0]; M++) {
                var R = "";
                this.maxRows = 4;
                for (var x = 0; x < o[1]; x++) {
                    var H = this._daylightSavingAdjust(new Date(f, h, e.selectedDay)),
                        F = " ui-corner-all",
                        U = "";
                    if (c) {
                        if (U += '<div class="ui-datepicker-group', o[1] > 1) switch (x) {
                            case 0:
                                U += " ui-datepicker-group-first", F = " ui-corner-" + (i ? "right" : "left");
                                break;
                            case o[1] - 1:
                                U += " ui-datepicker-group-last", F = " ui-corner-" + (i ? "left" : "right");
                                break;
                            default:
                                U += " ui-datepicker-group-middle", F = ""
                        }
                        U += '">'
                    }
                    U += '<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix' + F + '">' + (/all|left/.test(F) && 0 == M ? i ? T : v : "") + (/all|right/.test(F) && 0 == M ? i ? v : T : "") + this._generateMonthYearHeader(e, h, f, p, u, M > 0 || x > 0, k, P) + '</div><table class="ui-datepicker-calendar"><thead><tr>';
                    for (var G = O ? '<th class="ui-datepicker-week-col">' + this._get(e, "weekHeader") + "</th>" : "", j = 0; j < 7; j++) {
                        var W = (j + y) % 7;
                        G += "<th" + ((j + y + 6) % 7 >= 5 ? ' class="ui-datepicker-week-end"' : "") + '><span title="' + w[W] + '">' + A[W] + "</span></th>"
                    }
                    U += G + "</tr></thead><tbody>";
                    var V = this._getDaysInMonth(f, h);
                    f == e.selectedYear && h == e.selectedMonth && (e.selectedDay = Math.min(e.selectedDay, V));
                    var Y = (this._getFirstDayOfMonth(f, h) - y + 7) % 7,
                        z = Math.ceil((Y + V) / 7),
                        K = c && this.maxRows > z ? this.maxRows : z;
                    this.maxRows = K;
                    for (var q = this._daylightSavingAdjust(new Date(f, h, 1 - Y)), X = 0; X < K; X++) {
                        U += "<tr>";
                        var Q = O ? '<td class="ui-datepicker-week-col">' + this._get(e, "calculateWeek")(q) + "</td>" : "";
                        for (j = 0; j < 7; j++) {
                            var J = I ? I.apply(e.input ? e.input[0] : null, [q]) : [!0, ""],
                                Z = q.getMonth() != h,
                                ee = Z && !B || !J[0] || p && q < p || u && q > u;
                            Q += '<td class="' + ((j + y + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + (Z ? " ui-datepicker-other-month" : "") + (q.getTime() == H.getTime() && h == e.selectedMonth && e._keyEvent || N.getTime() == q.getTime() && N.getTime() == H.getTime() ? " " + this._dayOverClass : "") + (ee ? " " + this._unselectableClass + " ui-state-disabled" : "") + (Z && !L ? "" : " " + J[1] + (q.getTime() == d.getTime() ? " " + this._currentClass : "") + (q.getTime() == t.getTime() ? " ui-datepicker-today" : "")) + '"' + (Z && !L || !J[2] ? "" : ' title="' + J[2] + '"') + (ee ? "" : ' data-handler="selectDay" data-event="click" data-month="' + q.getMonth() + '" data-year="' + q.getFullYear() + '"') + ">" + (Z && !L ? "&#xa0;" : ee ? '<span class="ui-state-default">' + q.getDate() + "</span>" : '<a class="ui-state-default' + (q.getTime() == t.getTime() ? " ui-state-highlight" : "") + (q.getTime() == d.getTime() ? " ui-state-active" : "") + (Z ? " ui-priority-secondary" : "") + '" href="#">' + q.getDate() + "</a>") + "</td>", q.setDate(q.getDate() + 1), q = this._daylightSavingAdjust(q)
                        }
                        U += Q + "</tr>"
                    }++h > 11 && (h = 0, f++), R += U += "</tbody></table>" + (c ? "</div>" + (o[0] > 0 && x == o[1] - 1 ? '<div class="ui-datepicker-row-break"></div>' : "") : "")
                }
                D += R
            }
            return D += _ + ($.ui.ie6 && !e.inline ? '<iframe src="javascript:false;" class="ui-datepicker-cover" frameborder="0"></iframe>' : ""), e._keyEvent = !1, D
        },
        _generateMonthYearHeader: function (e, t, i, a, s, n, o, r) {
            var l = this._get(e, "changeMonth"),
                c = this._get(e, "changeYear"),
                d = this._get(e, "showMonthAfterYear"),
                p = '<div class="ui-datepicker-title">',
                u = "";
            if (n || !l) u += '<span class="ui-datepicker-month">' + o[t] + "</span>";
            else {
                var h = a && a.getFullYear() == i,
                    f = s && s.getFullYear() == i;
                u += '<select class="ui-datepicker-month" data-handler="selectMonth" data-event="change">';
                for (var m = 0; m < 12; m++)(!h || m >= a.getMonth()) && (!f || m <= s.getMonth()) && (u += '<option value="' + m + '"' + (m == t ? ' selected="selected"' : "") + ">" + r[m] + "</option>");
                u += "</select>"
            }
            if (d || (p += u + (!n && l && c ? "" : "&#xa0;")), !e.yearshtml)
                if (e.yearshtml = "", n || !c) p += '<span class="ui-datepicker-year">' + i + "</span>";
                else {
                    var g = this._get(e, "yearRange").split(":"),
                        v = (new Date).getFullYear(),
                        S = function (e) {
                            var t = e.match(/c[+-].*/) ? i + parseInt(e.substring(1), 10) : e.match(/[+-].*/) ? v + parseInt(e, 10) : parseInt(e, 10);
                            return isNaN(t) ? v : t
                        },
                        T = S(g[0]),
                        b = Math.max(T, S(g[1] || ""));
                    for (T = a ? Math.max(T, a.getFullYear()) : T, b = s ? Math.min(b, s.getFullYear()) : b, e.yearshtml += '<select class="ui-datepicker-year" data-handler="selectYear" data-event="change">'; T <= b; T++) e.yearshtml += '<option value="' + T + '"' + (T == i ? ' selected="selected"' : "") + ">" + T + "</option>";
                    e.yearshtml += "</select>", p += e.yearshtml, e.yearshtml = null
                }
            return p += this._get(e, "yearSuffix"), d && (p += (!n && l && c ? "" : "&#xa0;") + u), p += "</div>"
        },
        _adjustInstDate: function (e, t, i) {
            var a = e.drawYear + ("Y" == i ? t : 0),
                s = e.drawMonth + ("M" == i ? t : 0),
                n = Math.min(e.selectedDay, this._getDaysInMonth(a, s)) + ("D" == i ? t : 0),
                o = this._restrictMinMax(e, this._daylightSavingAdjust(new Date(a, s, n)));
            e.selectedDay = o.getDate(), e.drawMonth = e.selectedMonth = o.getMonth(), e.drawYear = e.selectedYear = o.getFullYear(), "M" != i && "Y" != i || this._notifyChange(e)
        },
        _restrictMinMax: function (e, t) {
            var i = this._getMinMaxDate(e, "min"),
                a = this._getMinMaxDate(e, "max"),
                s = i && t < i ? i : t;
            return s = a && s > a ? a : s
        },
        _notifyChange: function (e) {
            var t = this._get(e, "onChangeMonthYear");
            t && t.apply(e.input ? e.input[0] : null, [e.selectedYear, e.selectedMonth + 1, e])
        },
        _getNumberOfMonths: function (e) {
            var t = this._get(e, "numberOfMonths");
            return null == t ? [1, 1] : "number" == typeof t ? [1, t] : t
        },
        _getMinMaxDate: function (e, t) {
            return this._determineDate(e, this._get(e, t + "Date"), null)
        },
        _getDaysInMonth: function (e, t) {
            return 32 - this._daylightSavingAdjust(new Date(e, t, 32)).getDate()
        },
        _getFirstDayOfMonth: function (e, t) {
            return new Date(e, t, 1).getDay()
        },
        _canAdjustMonth: function (e, t, i, a) {
            var s = this._getNumberOfMonths(e),
                n = this._daylightSavingAdjust(new Date(i, a + (t < 0 ? t : s[0] * s[1]), 1));
            return t < 0 && n.setDate(this._getDaysInMonth(n.getFullYear(), n.getMonth())), this._isInRange(e, n)
        },
        _isInRange: function (e, t) {
            var i = this._getMinMaxDate(e, "min"),
                a = this._getMinMaxDate(e, "max");
            return (!i || t.getTime() >= i.getTime()) && (!a || t.getTime() <= a.getTime())
        },
        _getFormatConfig: function (e) {
            var t = this._get(e, "shortYearCutoff");
            return {
                shortYearCutoff: t = "string" != typeof t ? t : (new Date).getFullYear() % 100 + parseInt(t, 10),
                dayNamesShort: this._get(e, "dayNamesShort"),
                dayNames: this._get(e, "dayNames"),
                monthNamesShort: this._get(e, "monthNamesShort"),
                monthNames: this._get(e, "monthNames")
            }
        },
        _formatDate: function (e, t, i, a) {
            t || (e.currentDay = e.selectedDay, e.currentMonth = e.selectedMonth, e.currentYear = e.selectedYear);
            var s = t ? "object" == typeof t ? t : this._daylightSavingAdjust(new Date(a, i, t)) : this._daylightSavingAdjust(new Date(e.currentYear, e.currentMonth, e.currentDay));
            return this.formatDate(this._get(e, "dateFormat"), s, this._getFormatConfig(e))
        }
    }), $.fn.datepicker = function (e) {
        if (!this.length) return this;
        $.datepicker.initialized || ($(document).mousedown($.datepicker._checkExternalClick).find(document.body).append($.datepicker.dpDiv), $.datepicker.initialized = !0);
        var t = Array.prototype.slice.call(arguments, 1);
        return "string" != typeof e || "isDisabled" != e && "getDate" != e && "widget" != e ? "option" == e && 2 == arguments.length && "string" == typeof arguments[1] ? $.datepicker["_" + e + "Datepicker"].apply($.datepicker, [this[0]].concat(t)) : this.each(function () {
            "string" == typeof e ? $.datepicker["_" + e + "Datepicker"].apply($.datepicker, [this].concat(t)) : $.datepicker._attachDatepicker(this, e)
        }) : $.datepicker["_" + e + "Datepicker"].apply($.datepicker, [this[0]].concat(t))
    }, $.datepicker = new Datepicker, $.datepicker.initialized = !1, $.datepicker.uuid = (new Date).getTime(), $.datepicker.version = "1.9.2", window["DP_jQuery_" + dpuuid] = $
}(jQuery),
function (e, t) {
    var i, a = 0,
        s = /#.*$/;

    function n() {
        return ++a
    }

    function o(e) {
        return e.hash.length > 1 && e.href.replace(s, "") === location.href.replace(s, "").replace(/\s/g, "%20")
    }
    e.widget("ui.tabs", {
        version: "1.9.2",
        delay: 300,
        options: {
            active: null,
            collapsible: !1,
            event: "click",
            heightStyle: "content",
            hide: null,
            show: null,
            activate: null,
            beforeActivate: null,
            beforeLoad: null,
            load: null
        },
        _create: function () {
            var t = this,
                i = this.options,
                a = i.active,
                s = location.hash.substring(1);
            this.running = !1, this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all").toggleClass("ui-tabs-collapsible", i.collapsible).delegate(".ui-tabs-nav > li", "mousedown" + this.eventNamespace, function (t) {
                e(this).is(".ui-state-disabled") && t.preventDefault()
            }).delegate(".ui-tabs-anchor", "focus" + this.eventNamespace, function () {
                e(this).closest("li").is(".ui-state-disabled") && this.blur()
            }), this._processTabs(), null === a && (s && this.tabs.each(function (t, i) {
                if (e(i).attr("aria-controls") === s) return a = t, !1
            }), null === a && (a = this.tabs.index(this.tabs.filter(".ui-tabs-active"))), null !== a && -1 !== a || (a = !!this.tabs.length && 0)), !1 !== a && -1 === (a = this.tabs.index(this.tabs.eq(a))) && (a = !i.collapsible && 0), i.active = a, !i.collapsible && !1 === i.active && this.anchors.length && (i.active = 0), e.isArray(i.disabled) && (i.disabled = e.unique(i.disabled.concat(e.map(this.tabs.filter(".ui-state-disabled"), function (e) {
                return t.tabs.index(e)
            }))).sort()), !1 !== this.options.active && this.anchors.length ? this.active = this._findActive(this.options.active) : this.active = e(), this._refresh(), this.active.length && this.load(i.active)
        },
        _getCreateEventData: function () {
            return {
                tab: this.active,
                panel: this.active.length ? this._getPanelForTab(this.active) : e()
            }
        },
        _tabKeydown: function (t) {
            var i = e(this.document[0].activeElement).closest("li"),
                a = this.tabs.index(i),
                s = !0;
            if (!this._handlePageNav(t)) {
                switch (t.keyCode) {
                    case e.ui.keyCode.RIGHT:
                    case e.ui.keyCode.DOWN:
                        a++;
                        break;
                    case e.ui.keyCode.UP:
                    case e.ui.keyCode.LEFT:
                        s = !1, a--;
                        break;
                    case e.ui.keyCode.END:
                        a = this.anchors.length - 1;
                        break;
                    case e.ui.keyCode.HOME:
                        a = 0;
                        break;
                    case e.ui.keyCode.SPACE:
                        return t.preventDefault(), clearTimeout(this.activating), void this._activate(a);
                    case e.ui.keyCode.ENTER:
                        return t.preventDefault(), clearTimeout(this.activating), void this._activate(a !== this.options.active && a);
                    default:
                        return
                }
                t.preventDefault(), clearTimeout(this.activating), a = this._focusNextTab(a, s), t.ctrlKey || (i.attr("aria-selected", "false"), this.tabs.eq(a).attr("aria-selected", "true"), this.activating = this._delay(function () {
                    this.option("active", a)
                }, this.delay))
            }
        },
        _panelKeydown: function (t) {
            this._handlePageNav(t) || t.ctrlKey && t.keyCode === e.ui.keyCode.UP && (t.preventDefault(), this.active.focus())
        },
        _handlePageNav: function (t) {
            return t.altKey && t.keyCode === e.ui.keyCode.PAGE_UP ? (this._activate(this._focusNextTab(this.options.active - 1, !1)), !0) : t.altKey && t.keyCode === e.ui.keyCode.PAGE_DOWN ? (this._activate(this._focusNextTab(this.options.active + 1, !0)), !0) : void 0
        },
        _findNextTab: function (t, i) {
            var a = this.tabs.length - 1;
            for (; - 1 !== e.inArray((t > a && (t = 0), t < 0 && (t = a), t), this.options.disabled);) t = i ? t + 1 : t - 1;
            return t
        },
        _focusNextTab: function (e, t) {
            return e = this._findNextTab(e, t), this.tabs.eq(e).focus(), e
        },
        _setOption: function (e, t) {
            "active" !== e ? "disabled" !== e ? (this._super(e, t), "collapsible" === e && (this.element.toggleClass("ui-tabs-collapsible", t), t || !1 !== this.options.active || this._activate(0)), "event" === e && this._setupEvents(t), "heightStyle" === e && this._setupHeightStyle(t)) : this._setupDisabled(t) : this._activate(t)
        },
        _tabId: function (e) {
            return e.attr("aria-controls") || "ui-tabs-" + n()
        },
        _sanitizeSelector: function (e) {
            return e ? e.replace(/[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g, "\\$&") : ""
        },
        refresh: function () {
            var t = this.options,
                i = this.tablist.children(":has(a[href])");
            t.disabled = e.map(i.filter(".ui-state-disabled"), function (e) {
                return i.index(e)
            }), this._processTabs(), !1 !== t.active && this.anchors.length ? this.active.length && !e.contains(this.tablist[0], this.active[0]) ? this.tabs.length === t.disabled.length ? (t.active = !1, this.active = e()) : this._activate(this._findNextTab(Math.max(0, t.active - 1), !1)) : t.active = this.tabs.index(this.active) : (t.active = !1, this.active = e()), this._refresh()
        },
        _refresh: function () {
            this._setupDisabled(this.options.disabled), this._setupEvents(this.options.event), this._setupHeightStyle(this.options.heightStyle), this.tabs.not(this.active).attr({
                "aria-selected": "false",
                tabIndex: -1
            }), this.panels.not(this._getPanelForTab(this.active)).hide().attr({
                "aria-expanded": "false",
                "aria-hidden": "true"
            }), this.active.length ? (this.active.addClass("ui-tabs-active ui-state-active").attr({
                "aria-selected": "true",
                tabIndex: 0
            }), this._getPanelForTab(this.active).show().attr({
                "aria-expanded": "true",
                "aria-hidden": "false"
            })) : this.tabs.eq(0).attr("tabIndex", 0)
        },
        _processTabs: function () {
            var t = this;
            this.tablist = this._getList().addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").attr("role", "tablist"), this.tabs = this.tablist.find("> li:has(a[href])").addClass("ui-state-default ui-corner-top").attr({
                role: "tab",
                tabIndex: -1
            }), this.anchors = this.tabs.map(function () {
                return e("a", this)[0]
            }).addClass("ui-tabs-anchor").attr({
                role: "presentation",
                tabIndex: -1
            }), this.panels = e(), this.anchors.each(function (i, a) {
                var s, n, r, l = e(a).uniqueId().attr("id"),
                    c = e(a).closest("li"),
                    d = c.attr("aria-controls");
                o(a) ? (s = a.hash, n = t.element.find(t._sanitizeSelector(s))) : (s = "#" + (r = t._tabId(c)), (n = t.element.find(s)).length || (n = t._createPanel(r)).insertAfter(t.panels[i - 1] || t.tablist), n.attr("aria-live", "polite")), n.length && (t.panels = t.panels.add(n)), d && c.data("ui-tabs-aria-controls", d), c.attr({
                    "aria-controls": s.substring(1),
                    "aria-labelledby": l
                }), n.attr("aria-labelledby", l)
            }), this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").attr("role", "tabpanel")
        },
        _getList: function () {
            return this.element.find("ol,ul").eq(0)
        },
        _createPanel: function (t) {
            return e("<div>").attr("id", t).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").data("ui-tabs-destroy", !0)
        },
        _setupDisabled: function (t) {
            e.isArray(t) && (t.length ? t.length === this.anchors.length && (t = !0) : t = !1);
            for (var i, a = 0; i = this.tabs[a]; a++) !0 === t || -1 !== e.inArray(a, t) ? e(i).addClass("ui-state-disabled").attr("aria-disabled", "true") : e(i).removeClass("ui-state-disabled").removeAttr("aria-disabled");
            this.options.disabled = t
        },
        _setupEvents: function (t) {
            var i = {
                click: function (e) {
                    e.preventDefault()
                }
            };
            t && e.each(t.split(" "), function (e, t) {
                i[t] = "_eventHandler"
            }), this._off(this.anchors.add(this.tabs).add(this.panels)), this._on(this.anchors, i), this._on(this.tabs, {
                keydown: "_tabKeydown"
            }), this._on(this.panels, {
                keydown: "_panelKeydown"
            }), this._focusable(this.tabs), this._hoverable(this.tabs)
        },
        _setupHeightStyle: function (t) {
            var i, a, s = this.element.parent();
            "fill" === t ? (e.support.minHeight || (a = s.css("overflow"), s.css("overflow", "hidden")), i = s.height(), this.element.siblings(":visible").each(function () {
                var t = e(this),
                    a = t.css("position");
                "absolute" !== a && "fixed" !== a && (i -= t.outerHeight(!0))
            }), a && s.css("overflow", a), this.element.children().not(this.panels).each(function () {
                i -= e(this).outerHeight(!0)
            }), this.panels.each(function () {
                e(this).height(Math.max(0, i - e(this).innerHeight() + e(this).height()))
            }).css("overflow", "auto")) : "auto" === t && (i = 0, this.panels.each(function () {
                i = Math.max(i, e(this).height("").height())
            }).height(i))
        },
        _eventHandler: function (t) {
            var i = this.options,
                a = this.active,
                s = e(t.currentTarget).closest("li"),
                n = s[0] === a[0],
                o = n && i.collapsible,
                r = o ? e() : this._getPanelForTab(s),
                l = a.length ? this._getPanelForTab(a) : e(),
                c = {
                    oldTab: a,
                    oldPanel: l,
                    newTab: o ? e() : s,
                    newPanel: r
                };
            t.preventDefault(), s.hasClass("ui-state-disabled") || s.hasClass("ui-tabs-loading") || this.running || n && !i.collapsible || !1 === this._trigger("beforeActivate", t, c) || (i.active = !o && this.tabs.index(s), this.active = n ? e() : s, this.xhr && this.xhr.abort(), l.length || r.length || e.error("jQuery UI Tabs: Mismatching fragment identifier."), r.length && this.load(this.tabs.index(s), t), this._toggle(t, c))
        },
        _toggle: function (t, i) {
            var a = this,
                s = i.newPanel,
                n = i.oldPanel;

            function o() {
                a.running = !1, a._trigger("activate", t, i)
            }

            function r() {
                i.newTab.closest("li").addClass("ui-tabs-active ui-state-active"), s.length && a.options.show ? a._show(s, a.options.show, o) : (s.show(), o())
            }
            this.running = !0, n.length && this.options.hide ? this._hide(n, this.options.hide, function () {
                i.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"), r()
            }) : (i.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"), n.hide(), r()), n.attr({
                "aria-expanded": "false",
                "aria-hidden": "true"
            }), i.oldTab.attr("aria-selected", "false"), s.length && n.length ? i.oldTab.attr("tabIndex", -1) : s.length && this.tabs.filter(function () {
                return 0 === e(this).attr("tabIndex")
            }).attr("tabIndex", -1), s.attr({
                "aria-expanded": "true",
                "aria-hidden": "false"
            }), i.newTab.attr({
                "aria-selected": "true",
                tabIndex: 0
            })
        },
        _activate: function (t) {
            var i, a = this._findActive(t);
            a[0] !== this.active[0] && (a.length || (a = this.active), i = a.find(".ui-tabs-anchor")[0], this._eventHandler({
                target: i,
                currentTarget: i,
                preventDefault: e.noop
            }))
        },
        _findActive: function (t) {
            return !1 === t ? e() : this.tabs.eq(t)
        },
        _getIndex: function (e) {
            return "string" == typeof e && (e = this.anchors.index(this.anchors.filter("[href$='" + e + "']"))), e
        },
        _destroy: function () {
            this.xhr && this.xhr.abort(), this.element.removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible"), this.tablist.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").removeAttr("role"), this.anchors.removeClass("ui-tabs-anchor").removeAttr("role").removeAttr("tabIndex").removeData("href.tabs").removeData("load.tabs").removeUniqueId(), this.tabs.add(this.panels).each(function () {
                e.data(this, "ui-tabs-destroy") ? e(this).remove() : e(this).removeClass("ui-state-default ui-state-active ui-state-disabled ui-corner-top ui-corner-bottom ui-widget-content ui-tabs-active ui-tabs-panel").removeAttr("tabIndex").removeAttr("aria-live").removeAttr("aria-busy").removeAttr("aria-selected").removeAttr("aria-labelledby").removeAttr("aria-hidden").removeAttr("aria-expanded").removeAttr("role")
            }), this.tabs.each(function () {
                var t = e(this),
                    i = t.data("ui-tabs-aria-controls");
                i ? t.attr("aria-controls", i) : t.removeAttr("aria-controls")
            }), this.panels.show(), "content" !== this.options.heightStyle && this.panels.css("height", "")
        },
        enable: function (i) {
            var a = this.options.disabled;
            !1 !== a && (i === t ? a = !1 : (i = this._getIndex(i), a = e.isArray(a) ? e.map(a, function (e) {
                return e !== i ? e : null
            }) : e.map(this.tabs, function (e, t) {
                return t !== i ? t : null
            })), this._setupDisabled(a))
        },
        disable: function (i) {
            var a = this.options.disabled;
            if (!0 !== a) {
                if (i === t) a = !0;
                else {
                    if (i = this._getIndex(i), -1 !== e.inArray(i, a)) return;
                    a = e.isArray(a) ? e.merge([i], a).sort() : [i]
                }
                this._setupDisabled(a)
            }
        },
        load: function (t, i) {
            t = this._getIndex(t);
            var a = this,
                s = this.tabs.eq(t),
                n = s.find(".ui-tabs-anchor"),
                r = this._getPanelForTab(s),
                l = {
                    tab: s,
                    panel: r
                };
            o(n[0]) || (this.xhr = e.ajax(this._ajaxSettings(n, i, l)), this.xhr && "canceled" !== this.xhr.statusText && (s.addClass("ui-tabs-loading"), r.attr("aria-busy", "true"), this.xhr.success(function (e) {
                setTimeout(function () {
                    r.html(e), a._trigger("load", i, l)
                }, 1)
            }).complete(function (e, t) {
                setTimeout(function () {
                    "abort" === t && a.panels.stop(!1, !0), s.removeClass("ui-tabs-loading"), r.removeAttr("aria-busy"), e === a.xhr && delete a.xhr
                }, 1)
            })))
        },
        _ajaxSettings: function (t, i, a) {
            var s = this;
            return {
                url: t.attr("href"),
                beforeSend: function (t, n) {
                    return s._trigger("beforeLoad", i, e.extend({
                        jqXHR: t,
                        ajaxSettings: n
                    }, a))
                }
            }
        },
        _getPanelForTab: function (t) {
            var i = e(t).attr("aria-controls");
            return this.element.find(this._sanitizeSelector("#" + i))
        }
    }), !1 !== e.uiBackCompat && (e.ui.tabs.prototype._ui = function (e, t) {
        return {
            tab: e,
            panel: t,
            index: this.anchors.index(e)
        }
    }, e.widget("ui.tabs", e.ui.tabs, {
        url: function (e, t) {
            this.anchors.eq(e).attr("href", t)
        }
    }), e.widget("ui.tabs", e.ui.tabs, {
        options: {
            ajaxOptions: null,
            cache: !1
        },
        _create: function () {
            this._super();
            var t = this;
            this._on({
                tabsbeforeload: function (i, a) {
                    e.data(a.tab[0], "cache.tabs") ? i.preventDefault() : a.jqXHR.success(function () {
                        t.options.cache && e.data(a.tab[0], "cache.tabs", !0)
                    })
                }
            })
        },
        _ajaxSettings: function (t, i, a) {
            var s = this.options.ajaxOptions;
            return e.extend({}, s, {
                error: function (e, t) {
                    try {
                        s.error(e, t, a.tab.closest("li").index(), a.tab[0])
                    } catch (e) {}
                }
            }, this._superApply(arguments))
        },
        _setOption: function (e, t) {
            "cache" === e && !1 === t && this.anchors.removeData("cache.tabs"), this._super(e, t)
        },
        _destroy: function () {
            this.anchors.removeData("cache.tabs"), this._super()
        },
        url: function (e) {
            this.anchors.eq(e).removeData("cache.tabs"), this._superApply(arguments)
        }
    }), e.widget("ui.tabs", e.ui.tabs, {
        abort: function () {
            this.xhr && this.xhr.abort()
        }
    }), e.widget("ui.tabs", e.ui.tabs, {
        options: {
            spinner: "<em>Loading&#8230;</em>"
        },
        _create: function () {
            this._super(), this._on({
                tabsbeforeload: function (e, t) {
                    if (e.target === this.element[0] && this.options.spinner) {
                        var i = t.tab.find("span"),
                            a = i.html();
                        i.html(this.options.spinner), t.jqXHR.complete(function () {
                            i.html(a)
                        })
                    }
                }
            })
        }
    }), e.widget("ui.tabs", e.ui.tabs, {
        options: {
            enable: null,
            disable: null
        },
        enable: function (t) {
            var i, a = this.options;
            (t && !0 === a.disabled || e.isArray(a.disabled) && -1 !== e.inArray(t, a.disabled)) && (i = !0), this._superApply(arguments), i && this._trigger("enable", null, this._ui(this.anchors[t], this.panels[t]))
        },
        disable: function (t) {
            var i, a = this.options;
            (t && !1 === a.disabled || e.isArray(a.disabled) && -1 === e.inArray(t, a.disabled)) && (i = !0), this._superApply(arguments), i && this._trigger("disable", null, this._ui(this.anchors[t], this.panels[t]))
        }
    }), e.widget("ui.tabs", e.ui.tabs, {
        options: {
            add: null,
            remove: null,
            tabTemplate: "<li><a href='#{href}'><span>#{label}</span></a></li>"
        },
        add: function (i, a, s) {
            s === t && (s = this.anchors.length);
            var n, o, r = this.options,
                l = e(r.tabTemplate.replace(/#\{href\}/g, i).replace(/#\{label\}/g, a)),
                c = i.indexOf("#") ? this._tabId(l) : i.replace("#", "");
            return l.addClass("ui-state-default ui-corner-top").data("ui-tabs-destroy", !0), l.attr("aria-controls", c), n = s >= this.tabs.length, (o = this.element.find("#" + c)).length || (o = this._createPanel(c), n ? s > 0 ? o.insertAfter(this.panels.eq(-1)) : o.appendTo(this.element) : o.insertBefore(this.panels[s])), o.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").hide(), n ? l.appendTo(this.tablist) : l.insertBefore(this.tabs[s]), r.disabled = e.map(r.disabled, function (e) {
                return e >= s ? ++e : e
            }), this.refresh(), 1 === this.tabs.length && !1 === r.active && this.option("active", 0), this._trigger("add", null, this._ui(this.anchors[s], this.panels[s])), this
        },
        remove: function (t) {
            t = this._getIndex(t);
            var i = this.options,
                a = this.tabs.eq(t).remove(),
                s = this._getPanelForTab(a).remove();
            return a.hasClass("ui-tabs-active") && this.anchors.length > 2 && this._activate(t + (t + 1 < this.anchors.length ? 1 : -1)), i.disabled = e.map(e.grep(i.disabled, function (e) {
                return e !== t
            }), function (e) {
                return e >= t ? --e : e
            }), this.refresh(), this._trigger("remove", null, this._ui(a.find("a")[0], s[0])), this
        }
    }), e.widget("ui.tabs", e.ui.tabs, {
        length: function () {
            return this.anchors.length
        }
    }), e.widget("ui.tabs", e.ui.tabs, {
        options: {
            idPrefix: "ui-tabs-"
        },
        _tabId: function (t) {
            var i = t.is("li") ? t.find("a[href]") : t;
            return i = i[0], e(i).closest("li").attr("aria-controls") || i.title && i.title.replace(/\s/g, "_").replace(/[^\w\u00c0-\uFFFF\-]/g, "") || this.options.idPrefix + n()
        }
    }), e.widget("ui.tabs", e.ui.tabs, {
        options: {
            panelTemplate: "<div></div>"
        },
        _createPanel: function (t) {
            return e(this.options.panelTemplate).attr("id", t).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").data("ui-tabs-destroy", !0)
        }
    }), e.widget("ui.tabs", e.ui.tabs, {
        _create: function () {
            var e = this.options;
            null === e.active && e.selected !== t && (e.active = -1 !== e.selected && e.selected), this._super(), e.selected = e.active, !1 === e.selected && (e.selected = -1)
        },
        _setOption: function (e, t) {
            if ("selected" !== e) return this._super(e, t);
            var i = this.options;
            this._super("active", -1 !== t && t), i.selected = i.active, !1 === i.selected && (i.selected = -1)
        },
        _eventHandler: function () {
            this._superApply(arguments), this.options.selected = this.options.active, !1 === this.options.selected && (this.options.selected = -1)
        }
    }), e.widget("ui.tabs", e.ui.tabs, {
        options: {
            show: null,
            select: null
        },
        _create: function () {
            this._super(), !1 !== this.options.active && this._trigger("show", null, this._ui(this.active.find(".ui-tabs-anchor")[0], this._getPanelForTab(this.active)[0]))
        },
        _trigger: function (e, t, i) {
            var a, s, n = this._superApply(arguments);
            return !!n && ("beforeActivate" === e ? (a = i.newTab.length ? i.newTab : i.oldTab, s = i.newPanel.length ? i.newPanel : i.oldPanel, n = this._super("select", t, {
                tab: a.find(".ui-tabs-anchor")[0],
                panel: s[0],
                index: a.closest("li").index()
            })) : "activate" === e && i.newTab.length && (n = this._super("show", t, {
                tab: i.newTab.find(".ui-tabs-anchor")[0],
                panel: i.newPanel[0],
                index: i.newTab.closest("li").index()
            })), n)
        }
    }), e.widget("ui.tabs", e.ui.tabs, {
        select: function (e) {
            if (-1 === (e = this._getIndex(e))) {
                if (!this.options.collapsible || -1 === this.options.selected) return;
                e = this.options.selected
            }
            this.anchors.eq(e).trigger(this.options.event + this.eventNamespace)
        }
    }), i = 0, e.widget("ui.tabs", e.ui.tabs, {
        options: {
            cookie: null
        },
        _create: function () {
            var e, t = this.options;
            null == t.active && t.cookie && (-1 === (e = parseInt(this._cookie(), 10)) && (e = !1), t.active = e), this._super()
        },
        _cookie: function (t) {
            var a = [this.cookie || (this.cookie = this.options.cookie.name || "ui-tabs-" + ++i)];
            return arguments.length && (a.push(!1 === t ? -1 : t), a.push(this.options.cookie)), e.cookie.apply(null, a)
        },
        _refresh: function () {
            this._super(), this.options.cookie && this._cookie(this.options.active, this.options.cookie)
        },
        _eventHandler: function () {
            this._superApply(arguments), this.options.cookie && this._cookie(this.options.active, this.options.cookie)
        },
        _destroy: function () {
            this._super(), this.options.cookie && this._cookie(null, this.options.cookie)
        }
    }), e.widget("ui.tabs", e.ui.tabs, {
        _trigger: function (t, i, a) {
            var s = e.extend({}, a);
            return "load" === t && (s.panel = s.panel[0], s.tab = s.tab.find(".ui-tabs-anchor")[0]), this._super(t, i, s)
        }
    }), e.widget("ui.tabs", e.ui.tabs, {
        options: {
            fx: null
        },
        _getFx: function () {
            var t, i, a = this.options.fx;
            return a && (e.isArray(a) ? (t = a[0], i = a[1]) : t = i = a), a ? {
                show: i,
                hide: t
            } : null
        },
        _toggle: function (e, t) {
            var i = this,
                a = t.newPanel,
                s = t.oldPanel,
                n = this._getFx();
            if (!n) return this._super(e, t);

            function o() {
                i.running = !1, i._trigger("activate", e, t)
            }

            function r() {
                t.newTab.closest("li").addClass("ui-tabs-active ui-state-active"), a.length && n.show ? a.animate(n.show, n.show.duration, function () {
                    o()
                }) : (a.show(), o())
            }
            i.running = !0, s.length && n.hide ? s.animate(n.hide, n.hide.duration, function () {
                t.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"), r()
            }) : (t.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"), s.hide(), r())
        }
    }))
}(jQuery), jQuery.effects || function (e, t) {
        var i, a = !1 !== e.uiBackCompat,
            s = "ui-effects-";
        e.effects = {
                effect: {}
            },
            function (t, i) {
                var a, s = "backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor".split(" "),
                    n = /^([\-+])=\s*(\d+\.?\d*)/,
                    o = [{
                        re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,
                        parse: function (e) {
                            return [e[1], e[2], e[3], e[4]]
                        }
                    }, {
                        re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,
                        parse: function (e) {
                            return [2.55 * e[1], 2.55 * e[2], 2.55 * e[3], e[4]]
                        }
                    }, {
                        re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,
                        parse: function (e) {
                            return [parseInt(e[1], 16), parseInt(e[2], 16), parseInt(e[3], 16)]
                        }
                    }, {
                        re: /#([a-f0-9])([a-f0-9])([a-f0-9])/,
                        parse: function (e) {
                            return [parseInt(e[1] + e[1], 16), parseInt(e[2] + e[2], 16), parseInt(e[3] + e[3], 16)]
                        }
                    }, {
                        re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,
                        space: "hsla",
                        parse: function (e) {
                            return [e[1], e[2] / 100, e[3] / 100, e[4]]
                        }
                    }],
                    r = t.Color = function (e, i, a, s) {
                        return new t.Color.fn.parse(e, i, a, s)
                    },
                    l = {
                        rgba: {
                            props: {
                                red: {
                                    idx: 0,
                                    type: "byte"
                                },
                                green: {
                                    idx: 1,
                                    type: "byte"
                                },
                                blue: {
                                    idx: 2,
                                    type: "byte"
                                }
                            }
                        },
                        hsla: {
                            props: {
                                hue: {
                                    idx: 0,
                                    type: "degrees"
                                },
                                saturation: {
                                    idx: 1,
                                    type: "percent"
                                },
                                lightness: {
                                    idx: 2,
                                    type: "percent"
                                }
                            }
                        }
                    },
                    c = {
                        byte: {
                            floor: !0,
                            max: 255
                        },
                        percent: {
                            max: 1
                        },
                        degrees: {
                            mod: 360,
                            floor: !0
                        }
                    },
                    d = r.support = {},
                    p = t("<p>")[0],
                    u = t.each;

                function h(e, t, i) {
                    var a = c[t.type] || {};
                    return null == e ? i || !t.def ? null : t.def : (e = a.floor ? ~~e : parseFloat(e), isNaN(e) ? t.def : a.mod ? (e + a.mod) % a.mod : 0 > e ? 0 : a.max < e ? a.max : e)
                }

                function f(e) {
                    var i = r(),
                        s = i._rgba = [];
                    return e = e.toLowerCase(), u(o, function (t, a) {
                        var n, o = a.re.exec(e),
                            r = o && a.parse(o),
                            c = a.space || "rgba";
                        if (r) return n = i[c](r), i[l[c].cache] = n[l[c].cache], s = i._rgba = n._rgba, !1
                    }), s.length ? ("0,0,0,0" === s.join() && t.extend(s, a.transparent), i) : a[e]
                }

                function m(e, t, i) {
                    return 6 * (i = (i + 1) % 1) < 1 ? e + (t - e) * i * 6 : 2 * i < 1 ? t : 3 * i < 2 ? e + (t - e) * (2 / 3 - i) * 6 : e
                }
                p.style.cssText = "background-color:rgba(1,1,1,.5)", d.rgba = p.style.backgroundColor.indexOf("rgba") > -1, u(l, function (e, t) {
                    t.cache = "_" + e, t.props.alpha = {
                        idx: 3,
                        type: "percent",
                        def: 1
                    }
                }), r.fn = t.extend(r.prototype, {
                    parse: function (s, n, o, c) {
                        if (s === i) return this._rgba = [null, null, null, null], this;
                        (s.jquery || s.nodeType) && (s = t(s).css(n), n = i);
                        var d = this,
                            p = t.type(s),
                            m = this._rgba = [];
                        return n !== i && (s = [s, n, o, c], p = "array"), "string" === p ? this.parse(f(s) || a._default) : "array" === p ? (u(l.rgba.props, function (e, t) {
                            m[t.idx] = h(s[t.idx], t)
                        }), this) : "object" === p ? (u(l, s instanceof r ? function (e, t) {
                            s[t.cache] && (d[t.cache] = s[t.cache].slice())
                        } : function (t, i) {
                            var a = i.cache;
                            u(i.props, function (e, t) {
                                if (!d[a] && i.to) {
                                    if ("alpha" === e || null == s[e]) return;
                                    d[a] = i.to(d._rgba)
                                }
                                d[a][t.idx] = h(s[e], t, !0)
                            }), d[a] && e.inArray(null, d[a].slice(0, 3)) < 0 && (d[a][3] = 1, i.from && (d._rgba = i.from(d[a])))
                        }), this) : void 0
                    },
                    is: function (e) {
                        var t = r(e),
                            i = !0,
                            a = this;
                        return u(l, function (e, s) {
                            var n, o = t[s.cache];
                            return o && (n = a[s.cache] || s.to && s.to(a._rgba) || [], u(s.props, function (e, t) {
                                if (null != o[t.idx]) return i = o[t.idx] === n[t.idx]
                            })), i
                        }), i
                    },
                    _space: function () {
                        var e = [],
                            t = this;
                        return u(l, function (i, a) {
                            t[a.cache] && e.push(i)
                        }), e.pop()
                    },
                    transition: function (e, t) {
                        var i = r(e),
                            a = i._space(),
                            s = l[a],
                            n = 0 === this.alpha() ? r("transparent") : this,
                            o = n[s.cache] || s.to(n._rgba),
                            d = o.slice();
                        return i = i[s.cache], u(s.props, function (e, a) {
                            var s = a.idx,
                                n = o[s],
                                r = i[s],
                                l = c[a.type] || {};
                            null !== r && (null === n ? d[s] = r : (l.mod && (r - n > l.mod / 2 ? n += l.mod : n - r > l.mod / 2 && (n -= l.mod)), d[s] = h((r - n) * t + n, a)))
                        }), this[a](d)
                    },
                    blend: function (e) {
                        if (1 === this._rgba[3]) return this;
                        var i = this._rgba.slice(),
                            a = i.pop(),
                            s = r(e)._rgba;
                        return r(t.map(i, function (e, t) {
                            return (1 - a) * s[t] + a * e
                        }))
                    },
                    toRgbaString: function () {
                        var e = "rgba(",
                            i = t.map(this._rgba, function (e, t) {
                                return null == e ? t > 2 ? 1 : 0 : e
                            });
                        return 1 === i[3] && (i.pop(), e = "rgb("), e + i.join() + ")"
                    },
                    toHslaString: function () {
                        var e = "hsla(",
                            i = t.map(this.hsla(), function (e, t) {
                                return null == e && (e = t > 2 ? 1 : 0), t && t < 3 && (e = Math.round(100 * e) + "%"), e
                            });
                        return 1 === i[3] && (i.pop(), e = "hsl("), e + i.join() + ")"
                    },
                    toHexString: function (e) {
                        var i = this._rgba.slice(),
                            a = i.pop();
                        return e && i.push(~~(255 * a)), "#" + t.map(i, function (e) {
                            return 1 === (e = (e || 0).toString(16)).length ? "0" + e : e
                        }).join("")
                    },
                    toString: function () {
                        return 0 === this._rgba[3] ? "transparent" : this.toRgbaString()
                    }
                }), r.fn.parse.prototype = r.fn, l.hsla.to = function (e) {
                    if (null == e[0] || null == e[1] || null == e[2]) return [null, null, null, e[3]];
                    var t, i, a = e[0] / 255,
                        s = e[1] / 255,
                        n = e[2] / 255,
                        o = e[3],
                        r = Math.max(a, s, n),
                        l = Math.min(a, s, n),
                        c = r - l,
                        d = r + l,
                        p = .5 * d;
                    return t = l === r ? 0 : a === r ? 60 * (s - n) / c + 360 : s === r ? 60 * (n - a) / c + 120 : 60 * (a - s) / c + 240, i = 0 === p || 1 === p ? p : p <= .5 ? c / d : c / (2 - d), [Math.round(t) % 360, i, p, null == o ? 1 : o]
                }, l.hsla.from = function (e) {
                    if (null == e[0] || null == e[1] || null == e[2]) return [null, null, null, e[3]];
                    var t = e[0] / 360,
                        i = e[1],
                        a = e[2],
                        s = e[3],
                        n = a <= .5 ? a * (1 + i) : a + i - a * i,
                        o = 2 * a - n;
                    return [Math.round(255 * m(o, n, t + 1 / 3)), Math.round(255 * m(o, n, t)), Math.round(255 * m(o, n, t - 1 / 3)), s]
                }, u(l, function (e, a) {
                    var s = a.props,
                        o = a.cache,
                        l = a.to,
                        c = a.from;
                    r.fn[e] = function (e) {
                        if (l && !this[o] && (this[o] = l(this._rgba)), e === i) return this[o].slice();
                        var a, n = t.type(e),
                            d = "array" === n || "object" === n ? e : arguments,
                            p = this[o].slice();
                        return u(s, function (e, t) {
                            var i = d["object" === n ? e : t.idx];
                            null == i && (i = p[t.idx]), p[t.idx] = h(i, t)
                        }), c ? ((a = r(c(p)))[o] = p, a) : r(p)
                    }, u(s, function (i, a) {
                        r.fn[i] || (r.fn[i] = function (s) {
                            var o, r = t.type(s),
                                l = "alpha" === i ? this._hsla ? "hsla" : "rgba" : e,
                                c = this[l](),
                                d = c[a.idx];
                            return "undefined" === r ? d : ("function" === r && (s = s.call(this, d), r = t.type(s)), null == s && a.empty ? this : ("string" === r && (o = n.exec(s)) && (s = d + parseFloat(o[2]) * ("+" === o[1] ? 1 : -1)), c[a.idx] = s, this[l](c)))
                        })
                    })
                }), u(s, function (e, i) {
                    t.cssHooks[i] = {
                        set: function (e, a) {
                            var s, n, o = "";
                            if ("string" !== t.type(a) || (s = f(a))) {
                                if (a = r(s || a), !d.rgba && 1 !== a._rgba[3]) {
                                    for (n = "backgroundColor" === i ? e.parentNode : e;
                                        ("" === o || "transparent" === o) && n && n.style;) try {
                                        o = t.css(n, "backgroundColor"), n = n.parentNode
                                    } catch (e) {}
                                    a = a.blend(o && "transparent" !== o ? o : "_default")
                                }
                                a = a.toRgbaString()
                            }
                            try {
                                e.style[i] = a
                            } catch (e) {}
                        }
                    }, t.fx.step[i] = function (e) {
                        e.colorInit || (e.start = r(e.elem, i), e.end = r(e.end), e.colorInit = !0), t.cssHooks[i].set(e.elem, e.start.transition(e.end, e.pos))
                    }
                }), t.cssHooks.borderColor = {
                    expand: function (e) {
                        var t = {};
                        return u(["Top", "Right", "Bottom", "Left"], function (i, a) {
                            t["border" + a + "Color"] = e
                        }), t
                    }
                }, a = t.Color.names = {
                    aqua: "#00ffff",
                    black: "#000000",
                    blue: "#0000ff",
                    fuchsia: "#ff00ff",
                    gray: "#808080",
                    green: "#008000",
                    lime: "#00ff00",
                    maroon: "#800000",
                    navy: "#000080",
                    olive: "#808000",
                    purple: "#800080",
                    red: "#ff0000",
                    silver: "#c0c0c0",
                    teal: "#008080",
                    white: "#ffffff",
                    yellow: "#ffff00",
                    transparent: [null, null, null, 0],
                    _default: "#ffffff"
                }
            }(jQuery),
            function () {
                var t = ["add", "remove", "toggle"],
                    i = {
                        border: 1,
                        borderBottom: 1,
                        borderColor: 1,
                        borderLeft: 1,
                        borderRight: 1,
                        borderTop: 1,
                        borderWidth: 1,
                        margin: 1,
                        padding: 1
                    };

                function a() {
                    var t, i, a = this.ownerDocument.defaultView ? this.ownerDocument.defaultView.getComputedStyle(this, null) : this.currentStyle,
                        s = {};
                    if (a && a.length && a[0] && a[a[0]])
                        for (i = a.length; i--;) "string" == typeof a[t = a[i]] && (s[e.camelCase(t)] = a[t]);
                    else
                        for (t in a) "string" == typeof a[t] && (s[t] = a[t]);
                    return s
                }
                e.each(["borderLeftStyle", "borderRightStyle", "borderBottomStyle", "borderTopStyle"], function (t, i) {
                    e.fx.step[i] = function (e) {
                        ("none" !== e.end && !e.setAttr || 1 === e.pos && !e.setAttr) && (jQuery.style(e.elem, i, e.end), e.setAttr = !0)
                    }
                }), e.effects.animateClass = function (s, n, o, r) {
                    var l = e.speed(n, o, r);
                    return this.queue(function () {
                        var n, o = e(this),
                            r = o.attr("class") || "",
                            c = l.children ? o.find("*").andSelf() : o;
                        c = c.map(function () {
                            return {
                                el: e(this),
                                start: a.call(this)
                            }
                        }), (n = function () {
                            e.each(t, function (e, t) {
                                s[t] && o[t + "Class"](s[t])
                            })
                        })(), c = c.map(function () {
                            return this.end = a.call(this.el[0]), this.diff = function (t, a) {
                                var s, n, o = {};
                                for (s in a) n = a[s], t[s] !== n && (i[s] || !e.fx.step[s] && isNaN(parseFloat(n)) || (o[s] = n));
                                return o
                            }(this.start, this.end), this
                        }), o.attr("class", r), c = c.map(function () {
                            var t = this,
                                i = e.Deferred(),
                                a = jQuery.extend({}, l, {
                                    queue: !1,
                                    complete: function () {
                                        i.resolve(t)
                                    }
                                });
                            return this.el.animate(this.diff, a), i.promise()
                        }), e.when.apply(e, c.get()).done(function () {
                            n(), e.each(arguments, function () {
                                var t = this.el;
                                e.each(this.diff, function (e) {
                                    t.css(e, "")
                                })
                            }), l.complete.call(o[0])
                        })
                    })
                }, e.fn.extend({
                    _addClass: e.fn.addClass,
                    addClass: function (t, i, a, s) {
                        return i ? e.effects.animateClass.call(this, {
                            add: t
                        }, i, a, s) : this._addClass(t)
                    },
                    _removeClass: e.fn.removeClass,
                    removeClass: function (t, i, a, s) {
                        return i ? e.effects.animateClass.call(this, {
                            remove: t
                        }, i, a, s) : this._removeClass(t)
                    },
                    _toggleClass: e.fn.toggleClass,
                    toggleClass: function (t, i, a, s, n) {
                        return "boolean" == typeof i || void 0 === i ? a ? e.effects.animateClass.call(this, i ? {
                            add: t
                        } : {
                            remove: t
                        }, a, s, n) : this._toggleClass(t, i) : e.effects.animateClass.call(this, {
                            toggle: t
                        }, i, a, s)
                    },
                    switchClass: function (t, i, a, s, n) {
                        return e.effects.animateClass.call(this, {
                            add: i,
                            remove: t
                        }, a, s, n)
                    }
                })
            }(),
            function () {
                function t(t, i, a, s) {
                    return e.isPlainObject(t) && (i = t, t = t.effect), t = {
                        effect: t
                    }, null == i && (i = {}), e.isFunction(i) && (s = i, a = null, i = {}), ("number" == typeof i || e.fx.speeds[i]) && (s = a, a = i, i = {}), e.isFunction(a) && (s = a, a = null), i && e.extend(t, i), a = a || i.duration, t.duration = e.fx.off ? 0 : "number" == typeof a ? a : a in e.fx.speeds ? e.fx.speeds[a] : e.fx.speeds._default, t.complete = s || i.complete, t
                }

                function i(t) {
                    return !(t && "number" != typeof t && !e.fx.speeds[t]) || "string" == typeof t && !e.effects.effect[t] && (!a || !e.effects[t])
                }
                e.extend(e.effects, {
                    version: "1.9.2",
                    save: function (e, t) {
                        for (var i = 0; i < t.length; i++) null !== t[i] && e.data(s + t[i], e[0].style[t[i]])
                    },
                    restore: function (e, t) {
                        var i, a;
                        for (a = 0; a < t.length; a++) null !== t[a] && (void 0 === (i = e.data(s + t[a])) && (i = ""), e.css(t[a], i))
                    },
                    setMode: function (e, t) {
                        return "toggle" === t && (t = e.is(":hidden") ? "show" : "hide"), t
                    },
                    getBaseline: function (e, t) {
                        var i, a;
                        switch (e[0]) {
                            case "top":
                                i = 0;
                                break;
                            case "middle":
                                i = .5;
                                break;
                            case "bottom":
                                i = 1;
                                break;
                            default:
                                i = e[0] / t.height
                        }
                        switch (e[1]) {
                            case "left":
                                a = 0;
                                break;
                            case "center":
                                a = .5;
                                break;
                            case "right":
                                a = 1;
                                break;
                            default:
                                a = e[1] / t.width
                        }
                        return {
                            x: a,
                            y: i
                        }
                    },
                    createWrapper: function (t) {
                        if (t.parent().is(".ui-effects-wrapper")) return t.parent();
                        var i = {
                                width: t.outerWidth(!0),
                                height: t.outerHeight(!0),
                                float: t.css("float")
                            },
                            a = e("<div></div>").addClass("ui-effects-wrapper").css({
                                fontSize: "100%",
                                background: "transparent",
                                border: "none",
                                margin: 0,
                                padding: 0
                            }),
                            s = {
                                width: t.width(),
                                height: t.height()
                            },
                            n = document.activeElement;
                        try {
                            n.id
                        } catch (e) {
                            n = document.body
                        }
                        return t.wrap(a), (t[0] === n || e.contains(t[0], n)) && e(n).focus(), a = t.parent(), "static" === t.css("position") ? (a.css({
                            position: "relative"
                        }), t.css({
                            position: "relative"
                        })) : (e.extend(i, {
                            position: t.css("position"),
                            zIndex: t.css("z-index")
                        }), e.each(["top", "left", "bottom", "right"], function (e, a) {
                            i[a] = t.css(a), isNaN(parseInt(i[a], 10)) && (i[a] = "auto")
                        }), t.css({
                            position: "relative",
                            top: 0,
                            left: 0,
                            right: "auto",
                            bottom: "auto"
                        })), t.css(s), a.css(i).show()
                    },
                    removeWrapper: function (t) {
                        var i = document.activeElement;
                        return t.parent().is(".ui-effects-wrapper") && (t.parent().replaceWith(t), (t[0] === i || e.contains(t[0], i)) && e(i).focus()), t
                    },
                    setTransition: function (t, i, a, s) {
                        return s = s || {}, e.each(i, function (e, i) {
                            var n = t.cssUnit(i);
                            n[0] > 0 && (s[i] = n[0] * a + n[1])
                        }), s
                    }
                }), e.fn.extend({
                    effect: function () {
                        var i = t.apply(this, arguments),
                            s = i.mode,
                            n = i.queue,
                            o = e.effects.effect[i.effect],
                            r = !o && a && e.effects[i.effect];
                        if (e.fx.off || !o && !r) return s ? this[s](i.duration, i.complete) : this.each(function () {
                            i.complete && i.complete.call(this)
                        });

                        function l(t) {
                            var a = e(this),
                                s = i.complete,
                                n = i.mode;

                            function r() {
                                e.isFunction(s) && s.call(a[0]), e.isFunction(t) && t()
                            }(a.is(":hidden") ? "hide" === n : "show" === n) ? r(): o.call(a[0], i, r)
                        }
                        return o ? !1 === n ? this.each(l) : this.queue(n || "fx", l) : r.call(this, {
                            options: i,
                            duration: i.duration,
                            callback: i.complete,
                            mode: i.mode
                        })
                    },
                    _show: e.fn.show,
                    show: function (e) {
                        if (i(e)) return this._show.apply(this, arguments);
                        var a = t.apply(this, arguments);
                        return a.mode = "show", this.effect.call(this, a)
                    },
                    _hide: e.fn.hide,
                    hide: function (e) {
                        if (i(e)) return this._hide.apply(this, arguments);
                        var a = t.apply(this, arguments);
                        return a.mode = "hide", this.effect.call(this, a)
                    },
                    __toggle: e.fn.toggle,
                    toggle: function (a) {
                        if (i(a) || "boolean" == typeof a || e.isFunction(a)) return this.__toggle.apply(this, arguments);
                        var s = t.apply(this, arguments);
                        return s.mode = "toggle", this.effect.call(this, s)
                    },
                    cssUnit: function (t) {
                        var i = this.css(t),
                            a = [];
                        return e.each(["em", "px", "%", "pt"], function (e, t) {
                            i.indexOf(t) > 0 && (a = [parseFloat(i), t])
                        }), a
                    }
                })
            }(), i = {}, e.each(["Quad", "Cubic", "Quart", "Quint", "Expo"], function (e, t) {
                i[t] = function (t) {
                    return Math.pow(t, e + 2)
                }
            }), e.extend(i, {
                Sine: function (e) {
                    return 1 - Math.cos(e * Math.PI / 2)
                },
                Circ: function (e) {
                    return 1 - Math.sqrt(1 - e * e)
                },
                Elastic: function (e) {
                    return 0 === e || 1 === e ? e : -Math.pow(2, 8 * (e - 1)) * Math.sin((80 * (e - 1) - 7.5) * Math.PI / 15)
                },
                Back: function (e) {
                    return e * e * (3 * e - 2)
                },
                Bounce: function (e) {
                    for (var t, i = 4; e < ((t = Math.pow(2, --i)) - 1) / 11;);
                    return 1 / Math.pow(4, 3 - i) - 7.5625 * Math.pow((3 * t - 2) / 22 - e, 2)
                }
            }), e.each(i, function (t, i) {
                e.easing["easeIn" + t] = i, e.easing["easeOut" + t] = function (e) {
                    return 1 - i(1 - e)
                }, e.easing["easeInOut" + t] = function (e) {
                    return e < .5 ? i(2 * e) / 2 : 1 - i(-2 * e + 2) / 2
                }
            })
    }(jQuery),
    function (e, t) {
        var i = /up|down|vertical/,
            a = /up|left|vertical|horizontal/;
        e.effects.effect.blind = function (t, s) {
            var n, o, r, l = e(this),
                c = ["position", "top", "bottom", "left", "right", "height", "width"],
                d = e.effects.setMode(l, t.mode || "hide"),
                p = t.direction || "up",
                u = i.test(p),
                h = u ? "height" : "width",
                f = u ? "top" : "left",
                m = a.test(p),
                g = {},
                v = "show" === d;
            l.parent().is(".ui-effects-wrapper") ? e.effects.save(l.parent(), c) : e.effects.save(l, c), l.show(), o = (n = e.effects.createWrapper(l).css({
                overflow: "hidden"
            }))[h](), r = parseFloat(n.css(f)) || 0, g[h] = v ? o : 0, m || (l.css(u ? "bottom" : "right", 0).css(u ? "top" : "left", "auto").css({
                position: "absolute"
            }), g[f] = v ? r : o + r), v && (n.css(h, 0), m || n.css(f, r + o)), n.animate(g, {
                duration: t.duration,
                easing: t.easing,
                queue: !1,
                complete: function () {
                    "hide" === d && l.hide(), e.effects.restore(l, c), e.effects.removeWrapper(l), s()
                }
            })
        }
    }(jQuery),
    function (e, t) {
        e.effects.effect.fade = function (t, i) {
            var a = e(this),
                s = e.effects.setMode(a, t.mode || "toggle");
            a.animate({
                opacity: s
            }, {
                queue: !1,
                duration: t.duration,
                easing: t.easing,
                complete: i
            })
        }
    }(jQuery),
    function (e, t) {
        e.effects.effect.slide = function (t, i) {
            var a, s = e(this),
                n = ["position", "top", "bottom", "left", "right", "width", "height"],
                o = e.effects.setMode(s, t.mode || "show"),
                r = "show" === o,
                l = t.direction || "left",
                c = "up" === l || "down" === l ? "top" : "left",
                d = "up" === l || "left" === l,
                p = {};
            e.effects.save(s, n), s.show(), a = t.distance || s["top" === c ? "outerHeight" : "outerWidth"](!0), e.effects.createWrapper(s).css({
                overflow: "hidden"
            }), r && s.css(c, d ? isNaN(a) ? "-" + a : -a : a), p[c] = (r ? d ? "+=" : "-=" : d ? "-=" : "+=") + a, s.animate(p, {
                queue: !1,
                duration: t.duration,
                easing: t.easing,
                complete: function () {
                    "hide" === o && s.hide(), e.effects.restore(s, n), e.effects.removeWrapper(s), i()
                }
            })
        }
    }(jQuery),
    function () {
        var UNDEFINED;
        null == TrimPath && (TrimPath = new Object), null == TrimPath.evalEx && (TrimPath.evalEx = function (src) {
            return eval(src)
        }), null == Array.prototype.pop && (Array.prototype.pop = function () {
            return 0 === this.length ? UNDEFINED : this[--this.length]
        }), null == Array.prototype.push && (Array.prototype.push = function () {
            for (var e = 0; e < arguments.length; ++e) this[this.length] = arguments[e];
            return this.length
        }), TrimPath.parseTemplate = function (e, t, i) {
            null == i && (i = TrimPath.parseTemplate_etc);
            var a = parse(e, t, i),
                s = TrimPath.evalEx(a, t, 1);
            return null != s ? new i.Template(t, e, a, s, i) : null
        };
        try {
            String.prototype.process = function (e, t) {
                var i = TrimPath.parseTemplate(this, null);
                return null != i ? i.process(e, t) : this
            }
        } catch (e) {}
        TrimPath.parseTemplate_etc = {}, TrimPath.parseTemplate_etc.statementTag = "forelse|for|if|elseif|else|var|macro", TrimPath.parseTemplate_etc.statementDef = {
            if: {
                delta: 1,
                prefix: "if (",
                suffix: ") {",
                paramMin: 1
            },
            else: {
                delta: 0,
                prefix: "} else {"
            },
            elseif: {
                delta: 0,
                prefix: "} else if (",
                suffix: ") {",
                paramDefault: "true"
            },
            "/if": {
                delta: -1,
                prefix: "}"
            },
            for: {
                delta: 1,
                paramMin: 3,
                prefixFunc: function (e, t, i, a) {
                    if ("in" != e[2]) throw new a.ParseError(i, t.line, "bad for loop statement: " + e.join(" "));
                    var s = e[1],
                        n = "__LIST__" + s;
                    return ["var ", n, " = ", e[3], ";", "var __LENGTH_STACK__;", "if (typeof(__LENGTH_STACK__) == 'undefined' || !__LENGTH_STACK__.length) __LENGTH_STACK__ = new Array();", "__LENGTH_STACK__[__LENGTH_STACK__.length] = 0;", "if ((", n, ") != null) { ", "var ", s, "_ct = 0;", "for (var ", s, "_index in ", n, ") { ", s, "_ct++;", "if (typeof(", n, "[", s, "_index]) == 'function') {continue;}", "__LENGTH_STACK__[__LENGTH_STACK__.length - 1]++;", "var ", s, " = ", n, "[", s, "_index];"].join("")
                }
            },
            forelse: {
                delta: 0,
                prefix: "} } if (__LENGTH_STACK__[__LENGTH_STACK__.length - 1] == 0) { if (",
                suffix: ") {",
                paramDefault: "true"
            },
            "/for": {
                delta: -1,
                prefix: "} }; delete __LENGTH_STACK__[__LENGTH_STACK__.length - 1];"
            },
            var: {
                delta: 0,
                prefix: "var ",
                suffix: ";"
            },
            macro: {
                delta: 1,
                prefixFunc: function (e, t, i, a) {
                    var s = e[1].split("(")[0];
                    return ["var ", s, " = function", e.slice(1).join(" ").substring(s.length), "{ var _OUT_arr = []; var _OUT = { write: function(m) { if (m) _OUT_arr.push(m); } }; "].join("")
                }
            },
            "/macro": {
                delta: -1,
                prefix: " return _OUT_arr.join(''); };"
            }
        }, TrimPath.parseTemplate_etc.modifierDef = {
            eat: function (e) {
                return ""
            },
            escape: function (e) {
                return String(e).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
            },
            capitalize: function (e) {
                return String(e).toUpperCase()
            },
            default: function (e, t) {
                return null != e ? e : t
            }
        }, TrimPath.parseTemplate_etc.modifierDef.h = TrimPath.parseTemplate_etc.modifierDef.escape, TrimPath.parseTemplate_etc.Template = function (e, t, i, a, s) {
            this.process = function (e, t) {
                for (var i in null == e && (e = {}), null == e._MODIFIERS && (e._MODIFIERS = {}), null == e.defined && (e.defined = function (t) {
                        return void 0 != e[t]
                    }), s.modifierDef) null == e._MODIFIERS[i] && (e._MODIFIERS[i] = s.modifierDef[i]);
                null == t && (t = {});
                var n = [],
                    o = {
                        write: function (e) {
                            n.push(e)
                        }
                    };
                try {
                    a(o, e, t)
                } catch (e) {
                    if (1 == t.throwExceptions) throw e;
                    var r = new String(n.join("") + "[ERROR: " + e.toString() + (e.message ? "; " + e.message : "") + "]");
                    return r.exception = e, r
                }
                return n.join("")
            }, this.name = e, this.source = t, this.sourceFunc = i, this.toString = function () {
                return "TrimPath.Template [" + e + "]"
            }
        }, TrimPath.parseTemplate_etc.ParseError = function (e, t, i) {
            this.name = e, this.line = t, this.message = i
        }, TrimPath.parseTemplate_etc.ParseError.prototype.toString = function () {
            return "TrimPath template ParseError in " + this.name + ": line " + this.line + ", " + this.message
        };
        var parse = function (e, t, i) {
                e = cleanWhiteSpace(e);
                for (var a = ["var TrimPath_Template_TEMP = function(_OUT, _CONTEXT, _FLAGS) { with (_CONTEXT) {"], s = {
                        stack: [],
                        line: 1
                    }, n = -1; n + 1 < e.length;) {
                    var o = n;
                    for (o = e.indexOf("{", o + 1); o >= 0;) {
                        var r = e.indexOf("}", o + 1),
                            l = e.substring(o, r).match(/^\{(cdata|minify|eval)/);
                        if (l) {
                            var c = l[1],
                                d = o + c.length + 1,
                                p = e.indexOf("}", d);
                            if (p >= 0) {
                                var u;
                                u = p - d <= 0 ? "{/" + c + "}" : e.substring(d + 1, p);
                                var h = e.indexOf(u, p + 1);
                                if (h >= 0) {
                                    emitSectionText(e.substring(n + 1, o), a);
                                    var f = e.substring(p + 1, h);
                                    "cdata" == c ? emitText(f, a) : "minify" == c ? emitText(scrubWhiteSpace(f), a) : "eval" == c && null != f && f.length > 0 && a.push("_OUT.write( (function() { " + f + " })() );"), o = n = h + u.length - 1
                                }
                            }
                        } else if ("$" != e.charAt(o - 1) && "\\" != e.charAt(o - 1)) {
                            var m = "/" == e.charAt(o + 1) ? 2 : 1;
                            if (0 == e.substring(o + m, o + 10 + m).search(TrimPath.parseTemplate_etc.statementTag)) break
                        }
                        o = e.indexOf("{", o + 1)
                    }
                    if (o < 0) break;
                    if ((r = e.indexOf("}", o + 1)) < 0) break;
                    emitSectionText(e.substring(n + 1, o), a), emitStatement(e.substring(o, r + 1), s, a, t, i), n = r
                }
                if (emitSectionText(e.substring(n + 1), a), 0 != s.stack.length) throw new i.ParseError(t, s.line, "unclosed, unmatched statement(s): " + s.stack.join(","));
                return a.push("}}; TrimPath_Template_TEMP"), a.join("")
            },
            emitStatement = function (e, t, i, a, s) {
                var n = e.slice(1, -1).split(" "),
                    o = s.statementDef[n[0]];
                if (null != o) {
                    if (o.delta < 0) {
                        if (t.stack.length <= 0) throw new s.ParseError(a, t.line, "close tag does not match any previous statement: " + e);
                        t.stack.pop()
                    }
                    if (o.delta > 0 && t.stack.push(e), null != o.paramMin && o.paramMin >= n.length) throw new s.ParseError(a, t.line, "statement needs more parameters: " + e);
                    if (null != o.prefixFunc ? i.push(o.prefixFunc(n, t, a, s)) : i.push(o.prefix), null != o.suffix) {
                        if (n.length <= 1) null != o.paramDefault && i.push(o.paramDefault);
                        else
                            for (var r = 1; r < n.length; r++) r > 1 && i.push(" "), i.push(n[r]);
                        i.push(o.suffix)
                    }
                } else emitSectionText(e, i)
            },
            emitSectionText = function (e, t) {
                if (!(e.length <= 0)) {
                    for (var i = 0, a = e.length - 1; i < e.length && "\n" == e.charAt(i);) i++;
                    for (; a >= 0 && (" " == e.charAt(a) || "\t" == e.charAt(a));) a--;
                    if (a < i && (a = i), i > 0) t.push('if (_FLAGS.keepWhitespace == true) _OUT.write("'), "\n" == (s = e.substring(0, i).replace("\n", "\\n")).charAt(s.length - 1) && (s = s.substring(0, s.length - 1)), t.push(s), t.push('");');
                    for (var s, n = e.substring(i, a + 1).split("\n"), o = 0; o < n.length; o++) emitSectionTextLine(n[o], t), o < n.length - 1 && t.push('_OUT.write("\\n");\n');
                    if (a + 1 < e.length) t.push('if (_FLAGS.keepWhitespace == true) _OUT.write("'), "\n" == (s = e.substring(a + 1).replace("\n", "\\n")).charAt(s.length - 1) && (s = s.substring(0, s.length - 1)), t.push(s), t.push('");')
                }
            },
            emitSectionTextLine = function (e, t) {
                for (var i = "}", a = -1; a + i.length < e.length;) {
                    var s = "${",
                        n = "}",
                        o = e.indexOf(s, a + i.length);
                    if (o < 0) break;
                    "%" == e.charAt(o + 2) && (s = "${%", n = "%}");
                    var r = e.indexOf(n, o + s.length);
                    if (r < 0) break;
                    emitText(e.substring(a + i.length, o), t);
                    var l = e.substring(o + s.length, r).replace(/\|\|/g, "#@@#").split("|");
                    for (var c in l) l[c].replace && (l[c] = l[c].replace(/#@@#/g, "||"));
                    t.push("_OUT.write("), emitExpression(l, l.length - 1, t), t.push(");"), a = r, i = n
                }
                emitText(e.substring(a + i.length), t)
            },
            emitText = function (e, t) {
                null == e || e.length <= 0 || (e = (e = (e = e.replace(/\\/g, "\\\\")).replace(/\n/g, "\\n")).replace(/"/g, '\\"'), t.push('_OUT.write("'), t.push(e), t.push('");'))
            },
            emitExpression = function (e, t, i) {
                var a = e[t];
                if (t <= 0) i.push(a);
                else {
                    var s = a.split(":");
                    i.push('_MODIFIERS["'), i.push(s[0]), i.push('"]('), emitExpression(e, t - 1, i), s.length > 1 && (i.push(","), i.push(s[1])), i.push(")")
                }
            },
            cleanWhiteSpace = function (e) {
                return e = (e = (e = (e = e.replace(/\t/g, "    ")).replace(/\r\n/g, "\n")).replace(/\r/g, "\n")).replace(/^(\s*\S*(\s+\S+)*)\s*$/, "$1")
            },
            scrubWhiteSpace = function (e) {
                return e = (e = (e = (e = e.replace(/^\s+/g, "")).replace(/\s+$/g, "")).replace(/\s+/g, " ")).replace(/^(\s*\S*(\s+\S+)*)\s*$/, "$1")
            };
        TrimPath.parseDOMTemplate = function (e, t, i) {
            null == t && (t = document);
            var a = t.getElementById(e),
                s = a.value;
            return null == s && (s = a.innerHTML), s = s.replace(/&lt;/g, "<").replace(/&gt;/g, ">"), TrimPath.parseTemplate(s, e, i)
        }, TrimPath.processDOMTemplate = function (e, t, i, a, s) {
            return TrimPath.parseDOMTemplate(e, a, s).process(t, i)
        }
    }(), jQuery.GetIEVersion = function () {
        var e = window.navigator.userAgent,
            t = e.indexOf("MSIE");
        return t > 0 ? parseInt(e.substring(t + 5, e.indexOf(".", t))) : navigator.userAgent.match(/Trident\/7\./) ? 11 : 0
    },
    function (e) {
        var t = new Array;
        e.widget("ui.dropdown", {
            options: {
                contentId: null,
                triggerEvent: "mouseover",
                hide: "blind",
                show: "blind",
                zIndex: 1e3,
                hideTimeout: 300,
                showSpd: "fast",
                hideSpd: "fast",
                hideEffectOptions: {},
                showEffectOptions: {},
                bgiframe: !1,
                position: "left-bottom",
                moveToRoot: !0,
                autoWidth: !0,
                dropShadow: !0,
                popupAdjust: {
                    left: 0,
                    top: 0,
                    bottom: 0,
                    right: 0
                },
                onShowed: null,
                onHidden: null
            },
            _create: function () {
                var i = this,
                    a = this.options;
                if (t.push(i), jQuery().dropShadow && !isIE8AndBelow || (a.dropShadow = !1), a.contentId) {
                    this._popupRoot = e("#" + a.contentId), this._popupRoot.css({
                        position: "absolute",
                        display: "block",
                        visibility: "hidden",
                        zIndex: a.zIndex
                    }), this._delayhide = !1, this._delayShow = !1, this._isHiding = !1, this._isShowing = !1, this._isShowed = !1, "click" == a.triggerEvent ? (i.element.mousedown(function (e) {
                        if (t)
                            for (var a = 0; a < t.length; a++)(t[a]._isShowed || t[a]._isShowing) && t[a] != i && t[a].hide(!0);
                        return i._isShowed ? i.hide() : i.show(), !1
                    }), this._popupRoot.click(function () {
                        i.hide()
                    })) : i.element.hover(function () {
                        i._hideTimeOut && clearTimeout(i._hideTimeOut), i.show()
                    }, function () {
                        i._hidePopupTimeOut()
                    }), a.moveToRoot && this._popupRoot.appendTo(document.body), this._popupRoot.attr("_h", this._popupRoot.outerHeight()), this._popupRoot.attr("_w", this._popupRoot.outerWidth()), this._popupRoot.css({
                        display: "none",
                        visibility: "visible"
                    }), this.hide(!0), e(document).mousedown(function (t) {
                        var s = e(t.target);
                        (i._isShowed || i._isShowing) && t.target.id != a.contentId && 0 == s.parents("#" + a.contentId).length && ("" != t.target.id && t.target.id != i.element[0].id || "" == t.target.id && "" != i.element[0].id || "" == t.target.id && "" == i.element[0].id && t.target.uniqueID && t.target.uniqueID != i.element[0].uniqueID) && i.hide(!0)
                    });
                    var s = null;
                    if (e(window).bind("resize scroll", function () {
                            (i._isShowing || i._isShowed) && (i._popupRoot.stop(!0, !0), s && clearTimeout(s), s = setTimeout(function () {
                                i._popupRoot.hide()
                            }, 100), i.hide(!0))
                        }), "click" != a.triggerEvent && this._popupRoot.hover(function () {
                            i._hideTimeOut && clearTimeout(i._hideTimeOut)
                        }, function () {
                            i._hidePopupTimeOut()
                        }), a.bgiframe && e.fn.bgiframe && isIE8AndBelow) this._popupRoot.bgiframe()
                }
            },
            show: function () {
                var t = this,
                    i = this.options;
                if (!(t.element.attr("disabled") || (t._delayShow = t._isHiding, t._isHiding || t._isShowing || t._isShowed))) {
                    t._setPosition();
                    var a = function () {
                        i.dropShadow && t._isShowing && t._popupRoot.dropShadow({
                            left: "left-top" == i.autoPos ? -2 : 2,
                            top: "left-top" == i.autoPos || "right-top" == i.autoPos ? -2 : 2
                        }), t._isShowing && (t._popupRoot.attr("_h", t._popupRoot.outerHeight()), t._popupRoot.attr("_w", t._popupRoot.outerWidth()), i.onShowed && e.isFunction(i.onShowed) && i.onShowed(t)), t._isShowing = !1, t._isShowed = !0, t._isHiding = !1, t._delayHide && t.hide()
                    };
                    if (t._isShowing = !0, i.show && "auto" != i.show && "animate" != i.show) t._popupRoot.show(i.show, i.showEffectOptions, i.showSpd, a);
                    else if ("animate" == i.show) t._popupRoot.animate(i.showEffectOptions, i.showSpd, a);
                    else if (!i.autoPos || "left-top" != i.autoPos && "right-top" != i.autoPos) t._popupRoot.slideDown(i.showSpd, a);
                    else {
                        var s = this.element.offset(),
                            n = this._popupRoot;
                        t._popupRoot.animate({
                            top: s.top - n.outerHeight(),
                            height: "toggle"
                        }, i.showSpd, a)
                    }
                }
            },
            hide: function (t) {
                var i = this,
                    a = this.options;
                if (i._delayHide = i._isShowing, !i._isHiding && i._isShowed && !i._isShowing) {
                    if (a.dropShadow && i._isShowed) {
                        var s = i._popupRoot.shadowId();
                        s && e("#" + s).hide()
                    }
                    var n = function () {
                        if (a.onHidden && e.isFunction(a.onHidden) && a.onHidden(i), a.dropShadow && i._isShowed) {
                            var t = i._popupRoot.shadowId();
                            t && e("#" + t).hide()
                        }
                        i._isShowed = !1, i._isHiding = !1, i._delayShow && i.show()
                    };
                    if (i._isHiding = !0, a.hide && "auto" != a.hide && "animate" != a.hide) i._popupRoot.hide(a.hide, a.hideEffectOptions, a.hideSpd, n);
                    else if ("animate" == a.hide) i._popupRoot.animate(a.hideEffectOptions, a.hideSpd, n);
                    else if (!a.autoPos || "left-top" != a.autoPos && "right-top" != a.autoPos) i._popupRoot.slideUp(a.showSpd, n);
                    else {
                        var o = this.element.offset();
                        i._popupRoot.animate({
                            height: "toggle",
                            top: o.top
                        }, a.showSpd, n)
                    }
                    t && i._popupRoot.stop(!0, !0)
                }
            },
            _setPosition: function () {
                var t = this.options,
                    i = this.element,
                    a = i.offset(),
                    s = {
                        left: 0,
                        top: 0,
                        right: 0,
                        bottom: 0
                    },
                    n = this._popupRoot;
                if (t.autoWidth) {
                    var o = i.outerWidth();
                    n.outerWidth() < o && n.css({
                        width: o
                    })
                }
                t.popupAdjust && (t.popupAdjust.left && (s.left = t.popupAdjust.left), t.popupAdjust.top && (s.top = t.popupAdjust.top), t.popupAdjust.right && (s.right = t.popupAdjust.right), t.popupAdjust.bottom && (s.bottom = t.popupAdjust.bottom));
                var r = null,
                    l = t.position ? t.position : "left-bottom";
                if ("auto" == l) {
                    var c = e(window).height(),
                        d = e(window).width(),
                        p = e(window).scrollTop(),
                        u = e(window).scrollLeft(),
                        h = parseInt(n.attr("_w")),
                        f = parseInt(n.attr("_h"));
                    l = "left", (r = this._calPosition("left-bottom", a, i, s, t)).left - u + h > d && (l = "right"), r.top - p + f > c ? l += "-top" : l += "-bottom", "left-bottom" != l && (r = this._calPosition(l, a, i, s, t))
                }
                return null == r && (r = this._calPosition(l, a, i, s, t)), n.css(r), r
            },
            _calPosition: function (e, t, i, a, s) {
                var n = this._popupRoot;
                switch (s.autoPos = "", e) {
                    case "left-bottom":
                        return {
                            left: t.left + a.left,
                            top: t.top + i.outerHeight() + a.top
                        };
                    case "right-bottom":
                        return {
                            left: t.left + (i.outerWidth() - n.outerWidth() - a.right),
                            top: t.top + i.outerHeight() + a.top
                        };
                    case "left-top":
                        return s.autoPos = "left-top", {
                            left: t.left + a.left,
                            top: t.top + a.top - ("auto" != s.show ? n.outerHeight() : 0)
                        };
                    case "right-top":
                        return s.autoPos = "right-top", {
                            left: t.left + i.outerWidth() - n.outerWidth() - a.right,
                            top: t.top + a.top - ("auto" != s.show ? n.outerHeight() : 0)
                        };
                    case "top-right":
                        return {
                            left: t.left + i.outerWidth() + a.left,
                            top: t.top + a.top
                        };
                    case "top-left":
                        return {
                            left: t.left - (a.left + n.outerWidth()),
                            top: t.top + a.top
                        }
                }
                return {
                    lef: 0,
                    top: 0
                }
            },
            _hidePopupTimeOut: function () {
                var e = this,
                    t = this.options;
                e._hideTimeOut && clearTimeout(e._hideTimeOut), e._hideTimeOut = setTimeout(function () {
                    e.hide()
                }, t.hideTimeout)
            }
        }), e.extend(e.ui.dropdown, {
            version: "1.0"
        })
    }(jQuery),
    function (e) {
        e.widget("ui.floating", {
            options: {
                top: 0,
                left: "auto",
                width: "auto",
                displayDummy: "hidden",
                dummy: null,
                zIndex: 1e3,
                floatObject: "self",
                dummyPosition: "after",
                getOffset: null,
                onFloating: null,
                onFloat: null,
                onDock: null,
                onDocked: null,
                onScrolled: null,
                onSized: null
            },
            _init: function () {
                var t = this,
                    i = this.options,
                    a = this.element;
                this.udata = null, "self" != i.floatObject && (i.floatObject = "dummy"), "hidden" != i.displayDummy && "auto" != i.displayDummy && "none" != i.displayDummy && (i.displayDummy = "none"), isNaN(i.width) && (i.width = "auto"), this._isDestroyed = !1, i.getOffset || e.isFunction(i.getOffset) ? this.o = i.getOffset() : (i.getOffset = null, this.o = a.offset()), this._css = {
                    left: a.css("left"),
                    top: a.css("top"),
                    position: a.css("position"),
                    zIndex: a.css("z-index")
                }, this.o.width = "auto" == i.width ? a.outerWidth() : i.width, this._isFloating = !1, this.windowSize = {
                    l: e(window).scrollLeft(),
                    w: e(window).width(),
                    h: e(window).height(),
                    t: e(window).scrollTop()
                }, null == i.dummy && (i.dummy = e("<div></div>")), this.rfn = function (e) {
                    t._windowResize(e)
                }, e(window).bind("resize", this.rfn), this.sfn = function (e) {
                    t._windowScroll(e)
                }, e(window).bind("scroll", this.sfn)
            },
            floating: function () {
                this._floating(this.windowSize.l, this.windowSize.t, this.windowSize.w, this.windowSize.h)
            },
            windowScroll: function () {
                this.windowSize.l = 0, this.windowSize.t = 0, this._windowScroll()
            },
            _windowScroll: function (t) {
                var i = e(window).scrollTop(),
                    a = e(window).scrollLeft();
                this.windowSize.t == i && this.windowSize.l == a || (this.windowSize.t = i, this.windowSize.l != a && (this.o.left = this._getOffset().left - a, this.windowSize.l = a), this._floating(a, i), this.onWindowScroll())
            },
            windowResize: function () {
                this.windowSize.h = 0, this.windowSize.w = 0, this._windowResize()
            },
            _windowResize: function (t) {
                var i = e(window).height(),
                    a = e(window).width(),
                    s = e(window).scrollTop(),
                    n = (this.options, this);
                this.windowSize.h == i && this.windowSize.w == a && this.windowSize.t == s || (void 0 !== this._to && this._to && clearTimeout(this._to), this._to = setTimeout(function () {
                    if (!n._isDestroyed) {
                        var t = e(window).scrollLeft();
                        n.windowSize.h == i && n.windowSize.w == a || n.windowSize.w != a && (t > 0 && t == n.windowSize.l && n.windowSize.w < a && (t -= a - n.windowSize.w) < 0 && (t = 0), n.o.left = n._getOffset().left - t), n.windowSize.l = t, n.windowSize.h = i, n.windowSize.w = a, n.windowSize.t = s, n.onWindowResize(), n._floating(t, s, i, a)
                    }
                }, 50))
            },
            onWindowResize: function () {
                this.options.onSized && this.options.onSized({
                    window: this.windowSize,
                    isF: this._isFloating,
                    element: this.element,
                    oTop: this.o.top
                })
            },
            onWindowScroll: function () {
                this.options.onScrolled && this.options.onScrolled({
                    window: this.windowSize,
                    isF: this._isFloating,
                    element: this.element,
                    oTop: this.o.top
                })
            },
            _getOffset: function () {
                return "self" == this.options.floatObject && this._isFloating ? this.options.dummy.offset() : this.element.offset()
            },
            updateOffset: function (e) {
                e && e.left && e.top ? this.o = e : this.options.getOffset ? this.o = this.options.getOffset() : this.o = this._getOffset()
            },
            updateDummySize: function (e, t) {
                "none" != this.options.displayDummy && (e && this.options.dummy.width(e), t && this.options.dummy.height(t))
            },
            _floating: function (t, i, a, s) {
                if (!this._isDestroyed) {
                    var n = this.options,
                        o = this.o,
                        r = this.element,
                        l = r.height();
                    if (null == i && (i = e(window).scrollTop()), i + n.top >= o.top && 0 != i) {
                        if (!this._isFloating) {
                            var c = {
                                data: this.udata,
                                element: r,
                                dummy: n.dummy,
                                window: this.windowSize,
                                scrollTop: i,
                                oTop: o.top,
                                oLeft: o.left,
                                elLeft: o.left,
                                elTop: n.top,
                                cancel: !1,
                                elHeight: l,
                                elWidth: r.width(),
                                isF: this._isFloating
                            };
                            if (n.onFloat && e.isFunction(n.onFloat))
                                if (!1 === n.onFloat(c) && (c.cancel = !0), this.udata = c.data, o.top = c.oTop, o.left = c.oLeft, c.cancel) return;
                            if (n.dummy) {
                                try {
                                    "after" == n.dummyPosition ? n.dummy.insertAfter(r) : n.dummy.insertBefore(r)
                                } catch (e) {
                                    this.destroy()
                                }
                                "self" == n.floatObject ? ("hidden" != n.displayDummy && "none" != n.displayDummy || n.dummy.css("visibility", "hidden"), n.dummy.css(e.extend({
                                    display: "auto" == n.displayDummy || "hidden" == n.displayDummy ? r.css("display") : "block",
                                    height: "none" == n.displayDummy ? 1 : l,
                                    width: c.elWidth
                                }, this._css))) : n.dummy.css({
                                    visibility: "visible"
                                })
                            }
                            "self" == n.floatObject ? r.css({
                                zoom: 1,
                                left: c.elLeft,
                                top: c.elTop,
                                zIndex: n.zIndex,
                                width: c.elWidth,
                                height: c.elHeight,
                                position: "fixed"
                            }) : n.dummy.css({
                                display: "block",
                                zoom: 1,
                                left: c.elLeft,
                                top: c.elTop,
                                zIndex: n.zIndex,
                                width: c.elWidth,
                                height: l,
                                position: "fixed"
                            }), this._isFloating = !0
                        }
                        if (this._isFloating) {
                            c = {
                                data: this.udata,
                                element: r,
                                dummy: n.dummy,
                                window: this.windowSize,
                                scrollTop: i,
                                oTop: o.top,
                                oLeft: o.left,
                                elLeft: o.left,
                                elTop: n.top,
                                cancel: !1,
                                elHeight: r.height(),
                                elWidth: r.width(),
                                isF: this._isFloating
                            };
                            if (n.onFloating && e.isFunction(n.onFloating))
                                if (!1 === n.onFloating(c) && (c.cancel = !0), this.udata = c.data, o.top = c.oTop, o.left = c.oLeft, c.cancel) return;
                            "self" == n.floatObject ? r.parent().prev().hasClass("collapsed") ? r.css({
                                left: c.elLeft,
                                top: c.elTop,
                                height: this.udata.z.h,
                                width: this.udata.z.w
                            }) : r.css({
                                left: c.elLeft,
                                top: c.elTop,
                                height: c.elHeight,
                                width: c.elWidth
                            }) : n.dummy.css({
                                left: c.elLeft,
                                top: c.elTop,
                                height: c.elHeight,
                                width: c.elWidth
                            })
                        }
                    } else this.dock()
                }
            },
            dock: function () {
                if (this._isFloating) {
                    var t = this.options,
                        i = this.o,
                        a = this.element;
                    if (t.onDock && e.isFunction(t.onDock)) {
                        var s = {
                            data: this.udata,
                            element: a,
                            dummy: t.dummy,
                            window: this.windowSize,
                            oTop: i.top,
                            oLeft: i.left,
                            elLeft: i.left,
                            elTop: t.top,
                            cancel: !1,
                            elHeight: "auto",
                            elWidth: "auto"
                        };
                        !1 === t.onDock(s) && (s.cancel = !0), i.top = s.oTop, i.left = s.oLeft, this.udata = s.data
                    }
                    if ("self" == t.floatObject) {
                        var n = e.extend({}, this._css, s ? {
                            height: s.elHeight,
                            width: s.elWidth
                        } : {});
                        a.css(n)
                    }
                    if (t.dummy && (t.dummy.remove(), t.dummy.css("display", "none")), this._isFloating = !1, t.onDocked && e.isFunction(t.onDocked)) {
                        s = {
                            data: this.udata,
                            element: a,
                            dummy: t.dummy,
                            window: this.windowSize,
                            oTop: i.top,
                            oLeft: i.left
                        };
                        t.onDocked(s), i.top = s.oTop, i.left = s.oLeft, this.udata = s.data
                    }
                }
            },
            isFloating: function () {
                return this._isFloating
            },
            destroy: function () {
                this._isDestroyed = !0, void 0 !== this._to && this._to && clearTimeout(this._to), this.dock(), this.dummy && this.dummy.remove(), e(window).unbind("scroll", this.sfn), e(window).unbind("resize", this.rfn), void 0 === e.Widget ? e.widget.prototype.destroy.apply(this, arguments) : e.Widget.prototype.destroy.call(this, arguments)
            }
        }), e.extend(e.ui.floating, {
            version: "1.0"
        })
    }(jQuery),
    function (e) {
        e.widget("ui.loadingMask", {
            options: {
                maskCss: "processing",
                width: "auto",
                height: "auto",
                zIndex: 999
            },
            _create: function () {
                this.mask = e("<div class='" + this.options.maskCss + "'/>").insertBefore(this.element), this.mask.show(), this.refresh(), this.show()
            },
            refresh: function (e, t) {
                e || (e = "auto"), t || (t = "auto");
                var i = this.element,
                    a = this.options;
                a.width = "auto" == e ? i.width() : e, a.height = "auto" == t ? i.height() : t, this.mask.width(a.width).height(a.height)
            },
            show: function () {
                this.mask && this.mask.show()
            },
            hide: function () {
                this.mask && this.mask.hide()
            },
            _setOption: function (e, t) {
                this.options[e] = t, this.refresh()
            }
        }), e.extend(e.ui.loadingMask, {
            version: "1.0"
        })
    }(jQuery),
    function (e) {
        var t = {},
            a = {
                mode: "horizontal",
                slideSelector: "",
                infiniteLoop: !0,
                hideControlOnEnd: !1,
                speed: 500,
                easing: null,
                slideMargin: 0,
                startSlide: 0,
                randomStart: !1,
                captions: !1,
                ticker: !1,
                tickerHover: !1,
                adaptiveHeight: !1,
                adaptiveHeightSpeed: 500,
                video: !1,
                useCSS: !0,
                preloadImages: "visible",
                responsive: !0,
                slideZIndex: 50,
                touchEnabled: !0,
                swipeThreshold: 50,
                oneToOneTouch: !0,
                preventDefaultSwipeX: !0,
                preventDefaultSwipeY: !1,
                pager: !0,
                pagerType: "full",
                pagerShortSeparator: " / ",
                pagerSelector: null,
                buildPager: null,
                pagerCustom: null,
                controls: !0,
                nextText: "Next",
                prevText: "Prev",
                nextSelector: null,
                prevSelector: null,
                autoControls: !1,
                startText: "Start",
                stopText: "Stop",
                autoControlsCombine: !1,
                autoControlsSelector: null,
                auto: !1,
                pause: 4e3,
                autoStart: !0,
                autoDirection: "next",
                autoHover: !1,
                autoDelay: 0,
                minSlides: 1,
                maxSlides: 1,
                moveSlides: 0,
                slideWidth: 0,
                onSliderLoad: function () {},
                onSlideBefore: function () {},
                onSlideAfter: function () {},
                onSlideNext: function () {},
                onSlidePrev: function () {},
                onSliderResize: function () {}
            };
        e.fn.bxSlider = function (s) {
            if (0 == this.length) return this;
            if (this.length > 1) return this.each(function () {
                e(this).bxSlider(s)
            }), this;
            var n = {},
                o = this;
            t.el = this;
            var r = e(window).width(),
                l = e(window).height(),
                c = function () {
                    n.settings = e.extend({}, a, s), n.settings.slideWidth = parseInt(n.settings.slideWidth), n.children = o.children(n.settings.slideSelector), n.children.length < n.settings.minSlides && (n.settings.minSlides = n.children.length), n.children.length < n.settings.maxSlides && (n.settings.maxSlides = n.children.length), n.settings.randomStart && (n.settings.startSlide = Math.floor(Math.random() * n.children.length)), n.active = {
                        index: n.settings.startSlide
                    }, n.carousel = n.settings.minSlides > 1 || n.settings.maxSlides > 1, n.carousel && (n.settings.preloadImages = "all"), n.minThreshold = n.settings.minSlides * n.settings.slideWidth + (n.settings.minSlides - 1) * n.settings.slideMargin, n.maxThreshold = n.settings.maxSlides * n.settings.slideWidth + (n.settings.maxSlides - 1) * n.settings.slideMargin, n.working = !1, n.controls = {}, n.interval = null, n.animProp = "vertical" == n.settings.mode ? "top" : "left", n.usingCSS = n.settings.useCSS && "fade" != n.settings.mode && function () {
                        var e = document.createElement("div"),
                            t = ["WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective"];
                        for (var i in t)
                            if (void 0 !== e.style[t[i]]) return n.cssPrefix = t[i].replace("Perspective", "").toLowerCase(), n.animProp = "-" + n.cssPrefix + "-transform", !0;
                        return !1
                    }(), "vertical" == n.settings.mode && (n.settings.maxSlides = n.settings.minSlides), o.data("origStyle", o.attr("style")), o.children(n.settings.slideSelector).each(function () {
                        e(this).data("origStyle", e(this).attr("style"))
                    }), d()
                },
                d = function () {
                    o.wrap('<div class="bx-wrapper"><div class="bx-viewport"></div></div>'), n.viewport = o.parent(), n.loader = e('<div class="bx-loading" />'), n.viewport.prepend(n.loader), o.css({
                        width: "horizontal" == n.settings.mode ? 100 * n.children.length + 215 + "%" : "auto",
                        position: "relative"
                    }), n.usingCSS && n.settings.easing ? o.css("-" + n.cssPrefix + "-transition-timing-function", n.settings.easing) : n.settings.easing || (n.settings.easing = "swing"), g(), n.viewport.css({
                        width: "100%",
                        overflow: "hidden",
                        position: "relative"
                    }), n.viewport.parent().css({
                        maxWidth: f()
                    }), n.settings.pager || n.viewport.parent().css({
                        margin: "0 auto 0px"
                    }), n.children.css({
                        float: "horizontal" == n.settings.mode ? "left" : "none",
                        listStyle: "none",
                        position: "relative"
                    }), n.children.css("width", m()), "horizontal" == n.settings.mode && n.settings.slideMargin > 0 && n.children.css("marginRight", n.settings.slideMargin), "vertical" == n.settings.mode && n.settings.slideMargin > 0 && n.children.css("marginBottom", n.settings.slideMargin), "fade" == n.settings.mode && (n.children.css({
                        position: "absolute",
                        zIndex: 0,
                        display: "none"
                    }), n.children.eq(n.settings.startSlide).css({
                        zIndex: n.settings.slideZIndex,
                        display: "block"
                    })), n.controls.el = e('<div class="bx-controls" />'), n.settings.captions && O(), n.active.last = n.settings.startSlide == v() - 1, n.settings.video && o.fitVids();
                    var t = n.children.eq(n.settings.startSlide);
                    "all" == n.settings.preloadImages && (t = n.children), n.settings.ticker ? n.settings.pager = !1 : (n.settings.pager && C(), n.settings.controls && _(), n.settings.auto && n.settings.autoControls && y(), (n.settings.controls || n.settings.autoControls || n.settings.pager) && n.viewport.after(n.controls.el)), p(t, u)
                },
                p = function (t, i) {
                    var a = t.find("img, iframe").length;
                    if (0 != a) {
                        var s = 0;
                        t.find("img, iframe").each(function () {
                            e(this).one("load", function () {
                                ++s == a && i()
                            }).each(function () {
                                this.complete && e(this).load()
                            })
                        })
                    } else i()
                },
                u = function () {
                    if (n.settings.infiniteLoop && "fade" != n.settings.mode && !n.settings.ticker) {
                        var t = "vertical" == n.settings.mode ? n.settings.minSlides : n.settings.maxSlides,
                            i = n.children.slice(0, t).clone().addClass("bx-clone"),
                            a = n.children.slice(-t).clone().addClass("bx-clone");
                        o.append(i).prepend(a)
                    }
                    n.loader.remove(), T(), "vertical" == n.settings.mode && (n.settings.adaptiveHeight = !0), n.viewport.height(h()), o.redrawSlider(), n.settings.onSliderLoad(n.active.index), n.initialized = !0, n.settings.responsive && e(window).bind("resize", G), n.settings.auto && n.settings.autoStart && M(), n.settings.ticker && R(), n.settings.pager && L(n.settings.startSlide), n.settings.controls && D(), n.settings.touchEnabled && !n.settings.ticker && H()
                },
                h = function () {
                    var t = 0,
                        a = e();
                    if ("vertical" == n.settings.mode || n.settings.adaptiveHeight)
                        if (n.carousel) {
                            var s = 1 == n.settings.moveSlides ? n.active.index : n.active.index * S();
                            for (a = n.children.eq(s), i = 1; i <= n.settings.maxSlides - 1; i++) a = s + i >= n.children.length ? a.add(n.children.eq(i - 1)) : a.add(n.children.eq(s + i))
                        } else a = n.children.eq(n.active.index);
                    else a = n.children;
                    return "vertical" == n.settings.mode ? (a.each(function () {
                        t += e(this).outerHeight()
                    }), n.settings.slideMargin > 0 && (t += n.settings.slideMargin * (n.settings.minSlides - 1))) : t = Math.max.apply(Math, a.map(function () {
                        return e(this).outerHeight(!1)
                    }).get()), t
                },
                f = function () {
                    var e = "100%";
                    return n.settings.slideWidth > 0 && (e = "horizontal" == n.settings.mode ? n.settings.maxSlides * n.settings.slideWidth + (n.settings.maxSlides - 1) * n.settings.slideMargin : n.settings.slideWidth), e
                },
                m = function () {
                    var e = n.settings.slideWidth,
                        t = n.viewport.width();
                    return 0 == n.settings.slideWidth || n.settings.slideWidth > t && !n.carousel || "vertical" == n.settings.mode ? e = t : n.settings.maxSlides > 1 && "horizontal" == n.settings.mode && (t > n.maxThreshold || t < n.minThreshold && (e = (t - n.settings.slideMargin * (n.settings.minSlides - 1)) / n.settings.minSlides)), e
                },
                g = function () {
                    var e = 1;
                    if ("horizontal" == n.settings.mode && n.settings.slideWidth > 0)
                        if (n.viewport.width() < n.minThreshold) e = n.settings.minSlides;
                        else if (n.viewport.width() > n.maxThreshold) e = n.settings.maxSlides;
                    else {
                        var t = n.children.first().width();
                        e = Math.floor(n.viewport.width() / t)
                    } else "vertical" == n.settings.mode && (e = n.settings.minSlides);
                    return e
                },
                v = function () {
                    var e = 0;
                    if (n.settings.moveSlides > 0)
                        if (n.settings.infiniteLoop) e = n.children.length / S();
                        else
                            for (var t = 0, i = 0; t < n.children.length;) ++e, t = i + g(), i += n.settings.moveSlides <= g() ? n.settings.moveSlides : g();
                    else e = Math.ceil(n.children.length / g());
                    return e
                },
                S = function () {
                    return n.settings.moveSlides > 0 && n.settings.moveSlides <= g() ? n.settings.moveSlides : g()
                },
                T = function () {
                    if (n.children.length > n.settings.maxSlides && n.active.last && !n.settings.infiniteLoop) {
                        if ("horizontal" == n.settings.mode) {
                            var e = n.children.last(),
                                t = e.position();
                            b(-(t.left - (n.viewport.width() - e.width())), "reset", 0)
                        } else if ("vertical" == n.settings.mode) {
                            var i = n.children.length - n.settings.minSlides;
                            t = n.children.eq(i).position();
                            b(-t.top, "reset", 0)
                        }
                    } else {
                        t = n.children.eq(n.active.index * S()).position();
                        n.active.index == v() - 1 && (n.active.last = !0), void 0 != t && ("horizontal" == n.settings.mode ? b(-t.left, "reset", 0) : "vertical" == n.settings.mode && b(-t.top, "reset", 0))
                    }
                },
                b = function (e, t, i, a) {
                    if (n.usingCSS) {
                        var s = "vertical" == n.settings.mode ? "translate3d(0, " + e + "px, 0)" : "translate3d(" + e + "px, 0, 0)";
                        o.css("-" + n.cssPrefix + "-transition-duration", i / 1e3 + "s"), "slide" == t ? (o.css(n.animProp, s), o.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function () {
                            o.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"), B()
                        })) : "reset" == t ? o.css(n.animProp, s) : "ticker" == t && (o.css("-" + n.cssPrefix + "-transition-timing-function", "linear"), o.css(n.animProp, s), o.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function () {
                            o.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"), b(a.resetValue, "reset", 0), x()
                        }))
                    } else {
                        var r = {};
                        r[n.animProp] = e, "slide" == t ? o.animate(r, i, n.settings.easing, function () {
                            B()
                        }) : "reset" == t ? o.css(n.animProp, e) : "ticker" == t && o.animate(r, speed, "linear", function () {
                            b(a.resetValue, "reset", 0), x()
                        })
                    }
                },
                E = function () {
                    for (var t = "", i = v(), a = 0; i > a; a++) {
                        var s = "";
                        n.settings.buildPager && e.isFunction(n.settings.buildPager) ? (s = n.settings.buildPager(a), n.pagerEl.addClass("bx-custom-pager")) : (s = a + 1, n.pagerEl.addClass("bx-default-pager")), t += '<div class="bx-pager-item"><a href="" data-slide-index="' + a + '" class="bx-pager-link">' + s + "</a></div>"
                    }
                    n.pagerEl.html(t)
                },
                C = function () {
                    n.settings.pagerCustom ? n.pagerEl = e(n.settings.pagerCustom) : (n.pagerEl = e('<div class="bx-pager" />'), n.settings.pagerSelector ? e(n.settings.pagerSelector).html(n.pagerEl) : n.controls.el.addClass("bx-has-pager").append(n.pagerEl), E()), n.pagerEl.on("click", "a", I)
                },
                _ = function () {
                    n.controls.next = e('<a class="bx-next" href="">' + n.settings.nextText + "</a>"), n.controls.prev = e('<a class="bx-prev" href="">' + n.settings.prevText + "</a>"), n.controls.next.bind("click", w), n.controls.prev.bind("click", A), n.settings.nextSelector && e(n.settings.nextSelector).append(n.controls.next), n.settings.prevSelector && e(n.settings.prevSelector).append(n.controls.prev), n.settings.nextSelector || n.settings.prevSelector || (n.controls.directionEl = e('<div class="bx-controls-direction" />'), n.controls.directionEl.append(n.controls.prev).append(n.controls.next), n.controls.el.addClass("bx-has-controls-direction").append(n.controls.directionEl))
                },
                y = function () {
                    n.controls.start = e('<div class="bx-controls-auto-item"><a class="bx-start" href="">' + n.settings.startText + "</a></div>"), n.controls.stop = e('<div class="bx-controls-auto-item"><a class="bx-stop" href="">' + n.settings.stopText + "</a></div>"), n.controls.autoEl = e('<div class="bx-controls-auto" />'), n.controls.autoEl.on("click", ".bx-start", k), n.controls.autoEl.on("click", ".bx-stop", P), n.settings.autoControlsCombine ? n.controls.autoEl.append(n.controls.start) : n.controls.autoEl.append(n.controls.start).append(n.controls.stop), n.settings.autoControlsSelector ? e(n.settings.autoControlsSelector).html(n.controls.autoEl) : n.controls.el.addClass("bx-has-controls-auto").append(n.controls.autoEl), N(n.settings.autoStart ? "stop" : "start")
                },
                O = function () {
                    n.children.each(function () {
                        var t = e(this).find("img:first").attr("title");
                        void 0 != t && ("" + t).length && e(this).append('<div class="bx-caption"><span>' + t + "</span></div>")
                    })
                },
                w = function (e) {
                    n.settings.auto && o.stopAuto(), o.goToNextSlide(), e.preventDefault()
                },
                A = function (e) {
                    n.settings.auto && o.stopAuto(), o.goToPrevSlide(), e.preventDefault()
                },
                k = function (e) {
                    o.startAuto(), e.preventDefault()
                },
                P = function (e) {
                    o.stopAuto(), e.preventDefault()
                },
                I = function (t) {
                    n.settings.auto && o.stopAuto();
                    var i = e(t.currentTarget),
                        a = parseInt(i.attr("data-slide-index"));
                    a != n.active.index && o.goToSlide(a), t.preventDefault()
                },
                L = function (t) {
                    var i = n.children.length;
                    return "short" == n.settings.pagerType ? (n.settings.maxSlides > 1 && (i = Math.ceil(n.children.length / n.settings.maxSlides)), void n.pagerEl.html(t + 1 + n.settings.pagerShortSeparator + i)) : (n.pagerEl.find("a").removeClass("active"), void n.pagerEl.each(function (i, a) {
                        e(a).find("a").eq(t).addClass("active")
                    }))
                },
                B = function () {
                    if (n.settings.infiniteLoop) {
                        var e = "";
                        0 == n.active.index ? e = n.children.eq(0).position() : n.active.index == v() - 1 && n.carousel ? e = n.children.eq((v() - 1) * S()).position() : n.active.index == n.children.length - 1 && (e = n.children.eq(n.children.length - 1).position()), e && ("horizontal" == n.settings.mode ? b(-e.left, "reset", 0) : "vertical" == n.settings.mode && b(-e.top, "reset", 0))
                    }
                    n.working = !1, n.settings.onSlideAfter(n.children.eq(n.active.index), n.oldIndex, n.active.index)
                },
                N = function (e) {
                    n.settings.autoControlsCombine ? n.controls.autoEl.html(n.controls[e]) : (n.controls.autoEl.find("a").removeClass("active"), n.controls.autoEl.find("a:not(.bx-" + e + ")").addClass("active"))
                },
                D = function () {
                    1 == v() ? (n.controls.prev.addClass("disabled"), n.controls.next.addClass("disabled")) : !n.settings.infiniteLoop && n.settings.hideControlOnEnd && (0 == n.active.index ? (n.controls.prev.addClass("disabled"), n.controls.next.removeClass("disabled")) : n.active.index == v() - 1 ? (n.controls.next.addClass("disabled"), n.controls.prev.removeClass("disabled")) : (n.controls.prev.removeClass("disabled"), n.controls.next.removeClass("disabled")))
                },
                M = function () {
                    n.settings.autoDelay > 0 ? setTimeout(o.startAuto, n.settings.autoDelay) : o.startAuto(), n.settings.autoHover && o.hover(function () {
                        n.interval && (o.stopAuto(!0), n.autoPaused = !0)
                    }, function () {
                        n.autoPaused && (o.startAuto(!0), n.autoPaused = null)
                    })
                },
                R = function () {
                    var t = 0;
                    if ("next" == n.settings.autoDirection) o.append(n.children.clone().addClass("bx-clone"));
                    else {
                        o.prepend(n.children.clone().addClass("bx-clone"));
                        var i = n.children.first().position();
                        t = "horizontal" == n.settings.mode ? -i.left : -i.top
                    }
                    b(t, "reset", 0), n.settings.pager = !1, n.settings.controls = !1, n.settings.autoControls = !1, n.settings.tickerHover && !n.usingCSS && n.viewport.hover(function () {
                        o.stop()
                    }, function () {
                        var t = 0;
                        n.children.each(function () {
                            t += "horizontal" == n.settings.mode ? e(this).outerWidth(!0) : e(this).outerHeight(!0)
                        });
                        var i = n.settings.speed / t,
                            a = "horizontal" == n.settings.mode ? "left" : "top",
                            s = i * (t - Math.abs(parseInt(o.css(a))));
                        x(s)
                    }), x()
                },
                x = function (e) {
                    speed = e || n.settings.speed;
                    var t = {
                            left: 0,
                            top: 0
                        },
                        i = {
                            left: 0,
                            top: 0
                        };
                    "next" == n.settings.autoDirection ? t = o.find(".bx-clone").first().position() : i = n.children.first().position();
                    var a = "horizontal" == n.settings.mode ? -t.left : -t.top,
                        s = "horizontal" == n.settings.mode ? -i.left : -i.top;
                    b(a, "ticker", speed, {
                        resetValue: s
                    })
                },
                H = function () {
                    n.touch = {
                        start: {
                            x: 0,
                            y: 0
                        },
                        end: {
                            x: 0,
                            y: 0
                        }
                    }, n.viewport.bind("touchstart", $)
                },
                $ = function (e) {
                    if (n.working) e.preventDefault();
                    else {
                        n.touch.originalPos = o.position();
                        var t = e.originalEvent;
                        n.touch.start.x = t.changedTouches[0].pageX, n.touch.start.y = t.changedTouches[0].pageY, n.viewport.bind("touchmove", F), n.viewport.bind("touchend", U)
                    }
                },
                F = function (e) {
                    var t = e.originalEvent,
                        i = Math.abs(t.changedTouches[0].pageX - n.touch.start.x),
                        a = Math.abs(t.changedTouches[0].pageY - n.touch.start.y);
                    if (3 * i > a && n.settings.preventDefaultSwipeX ? e.preventDefault() : 3 * a > i && n.settings.preventDefaultSwipeY && e.preventDefault(), "fade" != n.settings.mode && n.settings.oneToOneTouch) {
                        var s = 0;
                        if ("horizontal" == n.settings.mode) {
                            var o = t.changedTouches[0].pageX - n.touch.start.x;
                            s = n.touch.originalPos.left + o
                        } else {
                            o = t.changedTouches[0].pageY - n.touch.start.y;
                            s = n.touch.originalPos.top + o
                        }
                        b(s, "reset", 0)
                    }
                },
                U = function (e) {
                    n.viewport.unbind("touchmove", F);
                    var t = e.originalEvent,
                        i = 0;
                    if (n.touch.end.x = t.changedTouches[0].pageX, n.touch.end.y = t.changedTouches[0].pageY, "fade" == n.settings.mode) {
                        (a = Math.abs(n.touch.start.x - n.touch.end.x)) >= n.settings.swipeThreshold && (n.touch.start.x > n.touch.end.x ? o.goToNextSlide() : o.goToPrevSlide(), o.stopAuto())
                    } else {
                        var a = 0;
                        "horizontal" == n.settings.mode ? (a = n.touch.end.x - n.touch.start.x, i = n.touch.originalPos.left) : (a = n.touch.end.y - n.touch.start.y, i = n.touch.originalPos.top), !n.settings.infiniteLoop && (0 == n.active.index && a > 0 || n.active.last && 0 > a) ? b(i, "reset", 200) : Math.abs(a) >= n.settings.swipeThreshold ? (0 > a ? o.goToNextSlide() : o.goToPrevSlide(), o.stopAuto()) : b(i, "reset", 200)
                    }
                    n.viewport.unbind("touchend", U)
                },
                G = function () {
                    var t = e(window).width(),
                        i = e(window).height();
                    (r != t || l != i) && (r = t, l = i, o.redrawSlider(), n.settings.onSliderResize.call(o, n.active.index))
                };
            return o.goToSlide = function (t, i) {
                if (!n.working && n.active.index != t)
                    if (n.working = !0, n.oldIndex = n.active.index, n.active.index = 0 > t ? v() - 1 : t >= v() ? 0 : t, n.settings.onSlideBefore(n.children.eq(n.active.index), n.oldIndex, n.active.index), "next" == i ? n.settings.onSlideNext(n.children.eq(n.active.index), n.oldIndex, n.active.index) : "prev" == i && n.settings.onSlidePrev(n.children.eq(n.active.index), n.oldIndex, n.active.index), n.active.last = n.active.index >= v() - 1, n.settings.pager && L(n.active.index), n.settings.controls && D(), "fade" == n.settings.mode) n.settings.adaptiveHeight && n.viewport.height() != h() && n.viewport.animate({
                        height: h()
                    }, n.settings.adaptiveHeightSpeed), n.children.filter(":visible").fadeOut(n.settings.speed).css({
                        zIndex: 0
                    }), n.children.eq(n.active.index).css("zIndex", n.settings.slideZIndex + 1).fadeIn(n.settings.speed, function () {
                        e(this).css("zIndex", n.settings.slideZIndex), B()
                    });
                    else {
                        n.settings.adaptiveHeight && n.viewport.height() != h() && n.viewport.animate({
                            height: h()
                        }, n.settings.adaptiveHeightSpeed);
                        var a = 0,
                            s = {
                                left: 0,
                                top: 0
                            };
                        if (!n.settings.infiniteLoop && n.carousel && n.active.last)
                            if ("horizontal" == n.settings.mode) {
                                s = (l = n.children.eq(n.children.length - 1)).position(), a = n.viewport.width() - l.outerWidth()
                            } else {
                                var r = n.children.length - n.settings.minSlides;
                                s = n.children.eq(r).position()
                            }
                        else if (n.carousel && n.active.last && "prev" == i) {
                            var l, c = 1 == n.settings.moveSlides ? n.settings.maxSlides - S() : (v() - 1) * S() - (n.children.length - n.settings.maxSlides);
                            s = (l = o.children(".bx-clone").eq(c)).position()
                        } else if ("next" == i && 0 == n.active.index) s = o.find("> .bx-clone").eq(n.settings.maxSlides).position(), n.active.last = !1;
                        else if (t >= 0) {
                            var d = t * S();
                            s = n.children.eq(d).position()
                        }
                        if (void 0 !== s) {
                            var p = "horizontal" == n.settings.mode ? -(s.left - a) : -s.top;
                            b(p, "slide", n.settings.speed)
                        }
                    }
            }, o.goToNextSlide = function () {
                if (n.settings.infiniteLoop || !n.active.last) {
                    var e = parseInt(n.active.index) + 1;
                    o.goToSlide(e, "next")
                }
            }, o.goToPrevSlide = function () {
                if (n.settings.infiniteLoop || 0 != n.active.index) {
                    var e = parseInt(n.active.index) - 1;
                    o.goToSlide(e, "prev")
                }
            }, o.startAuto = function (e) {
                n.interval || (n.interval = setInterval(function () {
                    "next" == n.settings.autoDirection ? o.goToNextSlide() : o.goToPrevSlide()
                }, n.settings.pause), n.settings.autoControls && 1 != e && N("stop"))
            }, o.stopAuto = function (e) {
                n.interval && (clearInterval(n.interval), n.interval = null, n.settings.autoControls && 1 != e && N("start"))
            }, o.getCurrentSlide = function () {
                return n.active.index
            }, o.getCurrentSlideElement = function () {
                return n.children.eq(n.active.index)
            }, o.getSlideCount = function () {
                return n.children.length
            }, o.redrawSlider = function () {
                n.children.add(o.find(".bx-clone")).outerWidth(m()), n.viewport.css("height", h()), n.settings.ticker || T(), n.active.last && (n.active.index = v() - 1), n.active.index >= v() && (n.active.last = !0), n.settings.pager && !n.settings.pagerCustom && (E(), L(n.active.index))
            }, o.destroySlider = function () {
                n.initialized && (n.initialized = !1, e(".bx-clone", this).remove(), n.children.each(function () {
                    void 0 != e(this).data("origStyle") ? e(this).attr("style", e(this).data("origStyle")) : e(this).removeAttr("style")
                }), void 0 != e(this).data("origStyle") ? this.attr("style", e(this).data("origStyle")) : e(this).removeAttr("style"), e(this).unwrap().unwrap(), n.controls.el && n.controls.el.remove(), n.controls.next && n.controls.next.remove(), n.controls.prev && n.controls.prev.remove(), n.pagerEl && n.settings.controls && n.pagerEl.remove(), e(".bx-caption", this).remove(), n.controls.autoEl && n.controls.autoEl.remove(), clearInterval(n.interval), n.settings.responsive && e(window).unbind("resize", G))
            }, o.reloadSlider = function (e) {
                void 0 != e && (s = e), o.destroySlider(), c()
            }, c(), this
        }
    }(jQuery),
    function (e) {
        "function" == typeof define && define.amd ? define(["jquery"], e) : "object" == typeof exports ? module.exports = e(require("jquery")) : e(jQuery)
    }(function (e) {
        e.fn.jScrollPane = function (t) {
            function i(t, i) {
                var a, s, n, o, r, l, c, d, p, u, h, f, m, g, v, S, T, b, E, C, _, y, O, w, A, k, P, I, L, B, N, D, M, R, x = this,
                    H = !0,
                    $ = !0,
                    F = !1,
                    U = !1,
                    G = t.clone(!1, !1).empty(),
                    j = e.fn.mwheelIntent ? "mwheelIntent.jsp" : "mousewheel.jsp";

                function W(i) {
                    var C, H, $, F, U, G, re, le, ce, de, pe, ue, he, fe, me = !1,
                        ge = !1;
                    if (a = i, void 0 === s) U = t.scrollTop(), G = t.scrollLeft(), t.css({
                        overflow: "hidden",
                        padding: 0
                    }), n = t.innerWidth() + M, o = t.innerHeight(), t.width(n), s = e('<div class="jspPane" />').css("padding", D).append(t.children()), r = e('<div class="jspContainer" />').css({
                        width: n + "px",
                        height: o + "px"
                    }).append(s).appendTo(t);
                    else {
                        if (t.css("width", "auto"), me = a.stickToBottom && ((le = c - o) > 20 && le - ne() < 10), ge = a.stickToRight && ((re = l - n) > 20 && re - se() < 10), (F = t.innerWidth() + M != n || t.outerHeight() != o) && (n = t.innerWidth() + M + 50, o = t.innerHeight(), r.css({
                                width: n + "px",
                                height: o + "px"
                            })), !F && R == l && s.outerHeight() == c) return;
                        R = l, r.find(">.jspVerticalBar,>.jspHorizontalBar").remove().end()
                    }
                    s.css("overflow", "auto"), l = i.contentWidth ? i.contentWidth : s[0].scrollWidth, c = s[0].scrollHeight, s.css("overflow", ""), d = l / n, u = (p = c / o) > 1, h = !1, a.keepTrack || h || u ? (h || u || s.css({
                        top: 0,
                        left: 0,
                        width: r.width() - M
                    }), t.addClass("jspScrollable"), (C = a.maintainPosition && (g || T)) && (H = se(), $ = ne()), function () {
                        r.append(e('<div class="jspVerticalBar" />').append(e('<div class="jspCap jspCapTop" />'), e('<div class="jspTrack" />').append(e('<div class="jspDrag" />').append(e('<div class="jspDragTop" />'), e('<div class="jspDragBottom" />'))), e('<div class="jspCap jspCapBottom" />'))), b = r.find(">.jspVerticalBar"), E = b.find(">.jspTrack"), f = E.find(">.jspDrag"), a.showArrows && (O = e('<a class="jspArrow jspArrowUp" />').bind("mousedown.jsp", K(0, -1)).bind("click.jsp", oe), w = e('<a class="jspArrow jspArrowDown" />').bind("mousedown.jsp", K(0, 1)).bind("click.jsp", oe), a.arrowScrollOnHover && (O.bind("mouseover.jsp", K(0, -1, O)), w.bind("mouseover.jsp", K(0, 1, w))), z(E, a.verticalArrowPositions, O, w));
                        _ = o, r.find(">.jspVerticalBar>.jspCap:visible,>.jspVerticalBar>.jspArrow").each(function () {
                            _ -= e(this).outerHeight()
                        }), f.hover(function () {
                            f.addClass("jspHover")
                        }, function () {
                            f.removeClass("jspHover")
                        }).bind("mousedown.jsp", function (t) {
                            e("html").bind("dragstart.jsp selectstart.jsp", oe), f.addClass("jspActive");
                            var i = t.pageY - f.position().top;
                            return e("html").bind("mousemove.jsp", function (e) {
                                Q(e.pageY - i, !1)
                            }).bind("mouseup.jsp mouseleave.jsp", X), !1
                        }), V()
                    }(), h && (r.append(e('<div class="jspHorizontalBar" />').append(e('<div class="jspCap jspCapLeft" />'), e('<div class="jspTrack" />').append(e('<div class="jspDrag" />').append(e('<div class="jspDragLeft" />'), e('<div class="jspDragRight" />'))), e('<div class="jspCap jspCapRight" />'))), A = r.find(">.jspHorizontalBar"), k = A.find(">.jspTrack"), v = k.find(">.jspDrag"), a.showArrows && (L = e('<a class="jspArrow jspArrowLeft" />').bind("mousedown.jsp", K(-1, 0)).bind("click.jsp", oe), B = e('<a class="jspArrow jspArrowRight" />').bind("mousedown.jsp", K(1, 0)).bind("click.jsp", oe), a.arrowScrollOnHover && (L.bind("mouseover.jsp", K(-1, 0, L)), B.bind("mouseover.jsp", K(1, 0, B))), z(k, a.horizontalArrowPositions, L, B)), v.hover(function () {
                        v.addClass("jspHover")
                    }, function () {
                        v.removeClass("jspHover")
                    }).bind("mousedown.jsp", function (t) {
                        e("html").bind("dragstart.jsp selectstart.jsp", oe), v.addClass("jspActive");
                        var i = t.pageX - v.position().left;
                        return e("html").bind("mousemove.jsp", function (e) {
                            Z(e.pageX - i, !1)
                        }).bind("mouseup.jsp mouseleave.jsp", X), !1
                    }), P = r.innerWidth(), Y()), function () {
                        if (h && u) {
                            var t = k.outerHeight(),
                                i = E.outerWidth();
                            _ -= t, e(A).find(">.jspCap:visible,>.jspArrow").each(function () {
                                P += e(this).outerWidth()
                            }), P -= i, o -= i, n -= t, k.parent().append(e('<div class="jspCorner" />').css("width", t + "px")), V(), Y()
                        }
                        h && s.width(r.outerWidth() - M + "px");
                        c = s.outerHeight(), p = c / o, h && ((I = Math.ceil(1 / d * P)) > a.horizontalDragMaxWidth ? I = a.horizontalDragMaxWidth : I < a.horizontalDragMinWidth && (I = a.horizontalDragMinWidth), v.width(I + "px"), S = P - I, ee(T));
                        u && ((y = Math.ceil(1 / p * _)) > a.verticalDragMaxHeight ? y = a.verticalDragMaxHeight : y < a.verticalDragMinHeight && (y = a.verticalDragMinHeight), f.height(y + "px"), m = _ - y, J(g))
                    }(), C && (ie(ge ? l - n : H, !1), te(me ? c - o : $, !1)), s.find(":input,a").unbind("focus.jsp").bind("focus.jsp", function (e) {
                        ae(e.target, !1)
                    }), r.unbind(j).bind(j, function (e, t, i, s) {
                        T || (T = 0), g || (g = 0);
                        var n = T,
                            o = g,
                            r = e.deltaFactor || a.mouseWheelSpeed;
                        return x.scrollBy(i * r, -s * r, !1), n == T && o == g
                    }), fe = !1, r.unbind("touchstart.jsp touchmove.jsp touchend.jsp click.jsp-touchclick").bind("touchstart.jsp", function (e) {
                        var t = e.originalEvent.touches[0];
                        ce = se(), de = ne(), pe = t.pageX, ue = t.pageY, he = !1, fe = !0
                    }).bind("touchmove.jsp", function (e) {
                        if (fe) {
                            var t = e.originalEvent.touches[0],
                                i = T,
                                a = g;
                            return x.scrollTo(ce + pe - t.pageX, de + ue - t.pageY), he = he || Math.abs(pe - t.pageX) > 5 || Math.abs(ue - t.pageY) > 5, i == T && a == g
                        }
                    }).bind("touchend.jsp", function (e) {
                        fe = !1
                    }).bind("click.jsp-touchclick", function (e) {
                        if (he) return he = !1, !1
                    }), a.enableKeyboardNavigation && function () {
                        var i, n, l = [];
                        h && l.push(A[0]), u && l.push(b[0]), s.bind("focus.jsp", function () {
                            t.focus()
                        }), t.attr("tabindex", 0).unbind("keydown.jsp keypress.jsp").bind("keydown.jsp", function (t) {
                            if (t.target === this || l.length && e(t.target).closest(l).length) {
                                var a = T,
                                    s = g;
                                switch (t.keyCode) {
                                    case 40:
                                    case 38:
                                    case 34:
                                    case 32:
                                    case 33:
                                    case 39:
                                    case 37:
                                        i = t.keyCode, d();
                                        break;
                                    case 35:
                                        te(c - o), i = null;
                                        break;
                                    case 36:
                                        te(0), i = null
                                }
                                return !(n = t.keyCode == i && a != T || s != g)
                            }
                        }).bind("keypress.jsp", function (t) {
                            if (t.keyCode == i && d(), t.target === this || l.length && e(t.target).closest(l).length) return !n
                        }), a.hideFocus ? (t.css("outline", "none"), "hideFocus" in r[0] && t.attr("hideFocus", !0)) : (t.css("outline", ""), "hideFocus" in r[0] && t.attr("hideFocus", !1));

                        function d() {
                            var e = T,
                                t = g;
                            switch (i) {
                                case 40:
                                    x.scrollByY(a.keyboardSpeed, !1);
                                    break;
                                case 38:
                                    x.scrollByY(-a.keyboardSpeed, !1);
                                    break;
                                case 34:
                                case 32:
                                    x.scrollByY(o * a.scrollPagePercent, !1);
                                    break;
                                case 33:
                                    x.scrollByY(-o * a.scrollPagePercent, !1);
                                    break;
                                case 39:
                                    x.scrollByX(a.keyboardSpeed, !1);
                                    break;
                                case 37:
                                    x.scrollByX(-a.keyboardSpeed, !1)
                            }
                            return n = e != T || t != g
                        }
                    }(), a.clickOnTrack && function () {
                        q(), u && E.bind("mousedown.jsp", function (t) {
                            if (void 0 === t.originalTarget || t.originalTarget == t.currentTarget) {
                                var i, s = e(this),
                                    n = s.offset(),
                                    r = t.pageY - n.top - g,
                                    l = !0,
                                    d = function () {
                                        var e = s.offset(),
                                            n = t.pageY - e.top - y / 2,
                                            u = o * a.scrollPagePercent,
                                            h = m * u / (c - o);
                                        if (r < 0) g - h > n ? x.scrollByY(-u) : Q(n);
                                        else {
                                            if (!(r > 0)) return void p();
                                            g + h < n ? x.scrollByY(u) : Q(n)
                                        }
                                        i = setTimeout(d, l ? a.initialDelay : a.trackClickRepeatFreq), l = !1
                                    },
                                    p = function () {
                                        i && clearTimeout(i), i = null, e(document).unbind("mouseup.jsp", p)
                                    };
                                return d(), e(document).bind("mouseup.jsp", p), !1
                            }
                        });
                        h && k.bind("mousedown.jsp", function (t) {
                            if (void 0 === t.originalTarget || t.originalTarget == t.currentTarget) {
                                var i, s = e(this),
                                    o = s.offset(),
                                    r = t.pageX - o.left - T,
                                    c = !0,
                                    d = function () {
                                        var e = s.offset(),
                                            o = t.pageX - e.left - I / 2,
                                            u = n * a.scrollPagePercent,
                                            h = S * u / (l - n);
                                        if (r < 0) T - h > o ? x.scrollByX(-u) : Z(o);
                                        else {
                                            if (!(r > 0)) return void p();
                                            T + h < o ? x.scrollByX(u) : Z(o)
                                        }
                                        i = setTimeout(d, c ? a.initialDelay : a.trackClickRepeatFreq), c = !1
                                    },
                                    p = function () {
                                        i && clearTimeout(i), i = null, e(document).unbind("mouseup.jsp", p)
                                    };
                                return d(), e(document).bind("mouseup.jsp", p), !1
                            }
                        })
                    }(), function () {
                        if (location.hash && location.hash.length > 1) {
                            var t, i, a = escape(location.hash.substr(1));
                            try {
                                t = e("#" + a + ', a[name="' + a + '"]')
                            } catch (e) {
                                return
                            }
                            t.length && s.find(a) && (0 === r.scrollTop() ? i = setInterval(function () {
                                r.scrollTop() > 0 && (ae(t, !0), e(document).scrollTop(r.position().top), clearInterval(i))
                            }, 50) : (ae(t, !0), e(document).scrollTop(r.position().top)))
                        }
                    }(), a.hijackInternalLinks && function () {
                        if (e(document.body).data("jspHijack")) return;
                        e(document.body).data("jspHijack", !0), e(document.body).delegate("a[href*=#]", "click", function (t) {
                            var i, a, s, n, o, r = this.href.substr(0, this.href.indexOf("#")),
                                l = location.href;
                            if (-1 !== location.href.indexOf("#") && (l = location.href.substr(0, location.href.indexOf("#"))), r === l) {
                                i = escape(this.href.substr(this.href.indexOf("#") + 1));
                                try {
                                    a = e("#" + i + ', a[name="' + i + '"]')
                                } catch (e) {
                                    return
                                }
                                a.length && (s = a.closest(".jspScrollable"), s.data("jsp").scrollToElement(a, !0), s[0].scrollIntoView && (n = e(window).scrollTop(), ((o = a.offset().top) < n || o > n + e(window).height()) && s[0].scrollIntoView()), t.preventDefault())
                            }
                        })
                    }()) : (t.removeClass("jspScrollable"), s.css({
                        top: 0,
                        left: 0,
                        width: r.width() - M
                    }), r.unbind(j), s.find(":input,a").unbind("focus.jsp"), t.attr("tabindex", "-1").removeAttr("tabindex").unbind("keydown.jsp keypress.jsp"), s.unbind(".jsp"), q()), a.autoReinitialise && !N ? N = setInterval(function () {
                        W(a)
                    }, a.autoReinitialiseDelay) : !a.autoReinitialise && N && clearInterval(N), U && t.scrollTop(0) && te(U, !1), G && t.scrollLeft(0) && ie(G, !1), t.trigger("jsp-initialised", [h || u])
                }

                function V() {
                    E.height(_ + "px"), g = 0, C = a.verticalGutter + E.outerWidth(), s.width(n - C - M);
                    try {
                        0 === b.position().left && s.css("margin-left", C + "px")
                    } catch (e) {}
                }

                function Y() {
                    r.find(">.jspHorizontalBar>.jspCap:visible,>.jspHorizontalBar>.jspArrow").each(function () {
                        P -= e(this).outerWidth()
                    }), k.width(P + "px"), T = 0
                }

                function z(e, t, i, a) {
                    var s, n = "before",
                        o = "after";
                    "os" == t && (t = /Mac/.test(navigator.platform) ? "after" : "split"), t == n ? o = t : t == o && (n = t, s = i, i = a, a = s), e[n](i)[o](a)
                }

                function K(t, i, s) {
                    return function () {
                        return function (t, i, s, n) {
                            s = e(s).addClass("jspActive");
                            var o, r, l = !0,
                                c = function () {
                                    0 !== t && x.scrollByX(t * a.arrowButtonSpeed), 0 !== i && x.scrollByY(i * a.arrowButtonSpeed), r = setTimeout(c, l ? a.initialDelay : a.arrowRepeatFreq), l = !1
                                };
                            c(), o = n ? "mouseout.jsp" : "mouseup.jsp", (n = n || e("html")).bind(o, function () {
                                s.removeClass("jspActive"), r && clearTimeout(r), r = null, n.unbind(o)
                            })
                        }(t, i, this, s), this.blur(), !1
                    }
                }

                function q() {
                    k && k.unbind("mousedown.jsp"), E && E.unbind("mousedown.jsp")
                }

                function X() {
                    e("html").unbind("dragstart.jsp selectstart.jsp mousemove.jsp mouseup.jsp mouseleave.jsp"), f && f.removeClass("jspActive"), v && v.removeClass("jspActive")
                }

                function Q(e, t) {
                    u && (e < 0 ? e = 0 : e > m && (e = m), void 0 === t && (t = a.animateScroll), t ? x.animate(f, "top", e, J) : (f.css("top", e), J(e)))
                }

                function J(e) {
                    void 0 === e && (e = f.position().top), r.scrollTop(0);
                    var i, n, l = 0 === (g = e || 0),
                        d = g == m,
                        p = -(e / m) * (c - o);
                    H == l && F == d || (H = l, F = d, t.trigger("jsp-arrow-change", [H, F, $, U])), i = l, n = d, a.showArrows && (O[i ? "addClass" : "removeClass"]("jspDisabled"), w[n ? "addClass" : "removeClass"]("jspDisabled")), s.css("top", p), t.trigger("jsp-scroll-y", [-p, l, d]).trigger("scroll")
                }

                function Z(e, t) {
                    h && (e < 0 ? e = 0 : e > S && (e = S), void 0 === t && (t = a.animateScroll), t ? x.animate(v, "left", e, ee) : (v.css("left", e), ee(e)))
                }

                function ee(e) {
                    void 0 === e && (e = v.position().left), r.scrollTop(0);
                    var i, o, c = 0 === (T = e || 0),
                        d = T == S,
                        p = -(e / S) * (l - n);
                    $ == c && U == d || ($ = c, U = d, t.trigger("jsp-arrow-change", [H, F, $, U])), i = c, o = d, a.showArrows && (L[i ? "addClass" : "removeClass"]("jspDisabled"), B[o ? "addClass" : "removeClass"]("jspDisabled")), s.css("left", p), t.trigger("jsp-scroll-x", [-p, c, d]).trigger("scroll")
                }

                function te(e, t) {
                    Q(e / (c - o) * m, t)
                }

                function ie(e, t) {
                    Z(e / (l - n) * S, t)
                }

                function ae(t, i, s) {
                    var l, c, d, p, u, h, f, m, g, v = 0,
                        S = 0;
                    try {
                        l = e(t)
                    } catch (e) {
                        return
                    }
                    for (c = l.outerHeight(), d = l.outerWidth(), r.scrollTop(0), r.scrollLeft(0); !l.is(".jspPane");)
                        if (v += l.position().top, S += l.position().left, l = l.offsetParent(), /^body|html$/i.test(l[0].nodeName)) return;
                    h = (p = ne()) + o, v < p || i ? m = v - a.horizontalGutter : v + c > h && (m = v - o + c + a.horizontalGutter), isNaN(m) || te(m, s), f = (u = se()) + n, S < u || i ? g = S - a.horizontalGutter : S + d > f && (g = S - n + d + a.horizontalGutter), isNaN(g) || ie(g, s)
                }

                function se() {
                    return -s.position().left
                }

                function ne() {
                    return -s.position().top
                }

                function oe() {
                    return !1
                }
                "border-box" === t.css("box-sizing") ? (D = 0, M = 0) : (D = t.css("paddingTop") + " " + t.css("paddingRight") + " " + t.css("paddingBottom") + " " + t.css("paddingLeft"), M = (parseInt(t.css("paddingLeft"), 10) || 0) + (parseInt(t.css("paddingRight"), 10) || 0)), e.extend(x, {
                    reinitialise: function (t) {
                        W(t = e.extend({}, a, t))
                    },
                    scrollToElement: function (e, t, i) {
                        ae(e, t, i)
                    },
                    scrollTo: function (e, t, i) {
                        ie(e, i), te(t, i)
                    },
                    scrollToX: function (e, t) {
                        ie(e, t)
                    },
                    scrollToY: function (e, t) {
                        te(e, t)
                    },
                    scrollToPercentX: function (e, t) {
                        ie(e * (l - n), t)
                    },
                    scrollToPercentY: function (e, t) {
                        te(e * (c - o), t)
                    },
                    scrollBy: function (e, t, i) {
                        x.scrollByX(e, i), x.scrollByY(t, i)
                    },
                    scrollByX: function (e, t) {
                        Z((se() + Math[e < 0 ? "floor" : "ceil"](e)) / (l - n) * S, t)
                    },
                    scrollByY: function (e, t) {
                        Q((ne() + Math[e < 0 ? "floor" : "ceil"](e)) / (c - o) * m, t)
                    },
                    positionDragX: function (e, t) {
                        Z(e, t)
                    },
                    positionDragY: function (e, t) {
                        Q(e, t)
                    },
                    animate: function (e, t, i, s) {
                        var n = {};
                        n[t] = i, e.animate(n, {
                            duration: a.animateDuration,
                            easing: a.animateEase,
                            queue: !1,
                            step: s
                        })
                    },
                    getContentPositionX: function () {
                        return se()
                    },
                    getContentPositionY: function () {
                        return ne()
                    },
                    getContentWidth: function () {
                        return l
                    },
                    getContentHeight: function () {
                        return c
                    },
                    getPercentScrolledX: function () {
                        return se() / (l - n)
                    },
                    getPercentScrolledY: function () {
                        return ne() / (c - o)
                    },
                    getIsScrollableH: function () {
                        return h
                    },
                    getIsScrollableV: function () {
                        return u
                    },
                    getContentPane: function () {
                        return s
                    },
                    scrollToBottom: function (e) {
                        Q(m, e)
                    },
                    hijackInternalLinks: e.noop,
                    destroy: function () {
                        var e, i;
                        e = ne(), i = se(), t.removeClass("jspScrollable").unbind(".jsp"), s.unbind(".jsp"), t.replaceWith(G.append(s.children())), G.scrollTop(e), G.scrollLeft(i), N && clearInterval(N)
                    }
                }), W(i)
            }
            return t = e.extend({}, e.fn.jScrollPane.defaults, t), e.each(["arrowButtonSpeed", "trackClickSpeed", "keyboardSpeed"], function () {
                t[this] = t[this] || t.speed
            }), this.each(function () {
                var a = e(this),
                    s = a.data("jsp");
                s ? s.reinitialise(t) : (e("script", a).filter('[type="text/javascript"],:not([type])').remove(), s = new i(a, t), a.data("jsp", s))
            })
        }, e.fn.jScrollPane.defaults = {
            showArrows: !1,
            maintainPosition: !0,
            stickToBottom: !1,
            stickToRight: !1,
            clickOnTrack: !0,
            autoReinitialise: !1,
            autoReinitialiseDelay: 500,
            verticalDragMinHeight: 0,
            verticalDragMaxHeight: 99999,
            horizontalDragMinWidth: 0,
            horizontalDragMaxWidth: 99999,
            contentWidth: void 0,
            animateScroll: !1,
            animateDuration: 300,
            animateEase: "linear",
            hijackInternalLinks: !1,
            verticalGutter: 4,
            horizontalGutter: 4,
            mouseWheelSpeed: 3,
            arrowButtonSpeed: 0,
            arrowRepeatFreq: 50,
            arrowScrollOnHover: !1,
            trackClickSpeed: 0,
            trackClickRepeatFreq: 70,
            verticalArrowPositions: "split",
            horizontalArrowPositions: "split",
            enableKeyboardNavigation: !0,
            hideFocus: !1,
            keyboardSpeed: 0,
            initialDelay: 300,
            speed: 30,
            scrollPagePercent: .8
        }
    }),
    function (e) {
        "function" == typeof define && define.amd ? define(["jquery"], e) : "object" == typeof exports ? module.exports = e : e(jQuery)
    }(function (e) {
        var t, i, a = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
            s = "onwheel" in document || document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
            n = Array.prototype.slice;
        if (e.event.fixHooks)
            for (var o = a.length; o;) e.event.fixHooks[a[--o]] = e.event.mouseHooks;
        var r = e.event.special.mousewheel = {
            version: "3.1.12",
            setup: function () {
                if (this.addEventListener)
                    for (var t = s.length; t;) this.addEventListener(s[--t], l, !1);
                else this.onmousewheel = l;
                e.data(this, "mousewheel-line-height", r.getLineHeight(this)), e.data(this, "mousewheel-page-height", r.getPageHeight(this))
            },
            teardown: function () {
                if (this.removeEventListener)
                    for (var t = s.length; t;) this.removeEventListener(s[--t], l, !1);
                else this.onmousewheel = null;
                e.removeData(this, "mousewheel-line-height"), e.removeData(this, "mousewheel-page-height")
            },
            getLineHeight: function (t) {
                var i = e(t),
                    a = i["offsetParent" in e.fn ? "offsetParent" : "parent"]();
                return a.length || (a = e("body")), parseInt(a.css("fontSize"), 10) || parseInt(i.css("fontSize"), 10) || 16
            },
            getPageHeight: function (t) {
                return e(t).height()
            },
            settings: {
                adjustOldDeltas: !0,
                normalizeOffset: !0
            }
        };

        function l(a) {
            var s, o = a || window.event,
                l = n.call(arguments, 1),
                p = 0,
                u = 0,
                h = 0,
                f = 0,
                m = 0;
            if ((a = e.event.fix(o)).type = "mousewheel", "detail" in o && (h = -1 * o.detail), "wheelDelta" in o && (h = o.wheelDelta), "wheelDeltaY" in o && (h = o.wheelDeltaY), "wheelDeltaX" in o && (u = -1 * o.wheelDeltaX), "axis" in o && o.axis === o.HORIZONTAL_AXIS && (u = -1 * h, h = 0), p = 0 === h ? u : h, "deltaY" in o && (p = h = -1 * o.deltaY), "deltaX" in o && (u = o.deltaX, 0 === h && (p = -1 * u)), 0 !== h || 0 !== u) {
                if (1 === o.deltaMode) {
                    var g = e.data(this, "mousewheel-line-height");
                    p *= g, h *= g, u *= g
                } else if (2 === o.deltaMode) {
                    var v = e.data(this, "mousewheel-page-height");
                    p *= v, h *= v, u *= v
                }
                if (s = Math.max(Math.abs(h), Math.abs(u)), (!i || s < i) && (i = s, d(o, s) && (i /= 40)), d(o, s) && (p /= 40, u /= 40, h /= 40), p = Math[p >= 1 ? "floor" : "ceil"](p / i), u = Math[u >= 1 ? "floor" : "ceil"](u / i), h = Math[h >= 1 ? "floor" : "ceil"](h / i), r.settings.normalizeOffset && this.getBoundingClientRect) {
                    var S = this.getBoundingClientRect();
                    f = a.clientX - S.left, m = a.clientY - S.top
                }
                return a.deltaX = u, a.deltaY = h, a.deltaFactor = i, a.offsetX = f, a.offsetY = m, a.deltaMode = 0, l.unshift(a, p, u, h), t && clearTimeout(t), t = setTimeout(c, 200), (e.event.dispatch || e.event.handle).apply(this, l)
            }
        }

        function c() {
            i = null
        }

        function d(e, t) {
            return r.settings.adjustOldDeltas && "mousewheel" === e.type && t % 120 == 0
        }
        e.fn.extend({
            mousewheel: function (e) {
                return e ? this.bind("mousewheel", e) : this.trigger("mousewheel")
            },
            unmousewheel: function (e) {
                return this.unbind("mousewheel", e)
            }
        })
    });
var mpc = {
        pv: -1
    },
    selobj = {
        pid: 0,
        isp: !1,
        spt: -1,
        evt: 0,
        cids: "0",
        dp: -1,
        favT: 0,
        btp: "full-time-asian-handicap-and-over-under",
        btp2: "full-time-asian-handicap-and-over-under",
        dts: null,
        themeColor: "black"
    },
    param = {
        IsFirstLoad: !0,
        VersionL: -1,
        VersionU: -1,
        VersionS: -1,
        VersionF: -1,
        VersionH: -1,
        VersionT: -1,
        IsEventMenu: !1,
        SportID: -1,
        CompetitionID: -1,
        reqUrl: "",
        oIsInplayAll: !1,
        oSportId: null,
        oVersion: null,
        oCompetitionId: null,
        oEventDate: null,
        oEventIds: null,
        oIsFirstLoad: !1,
        oIsFutureDate: null,
        oSortBy: null,
        oTab: null,
        oUiBetType: null,
        oOddsType: 0,
        oPageNo: 0
    },
    cCtrl = {
        isConsoleLogLoadContent: !1,
        prevLoadStartTime: null,
        spanSec: 2e3,
        isProcessing: !1,
        queryStrings: [],
        updateSelObj: function (e) {
            var t, i;
            selobj.pid = e.pid, 0 == selobj.pid && (selobj.pid = (t = cCtrl.getLocation(), (i = isIE9AndBelow ? t.url.query : t.search).indexOf("pid=") > -1 ? i.split("pid=")[1].split("&")[0] : 0)), selobj.isp = e.isp, selobj.spt = e.spt, selobj.sptn = e.sptn, selobj.evt = e.evt, selobj.cids = e.cids, selobj.dp = e.dp, selobj.favT = e.favT, selobj.btp2 = e.btp, selobj.dts = e.dts, o.param && (o.param.Tab = e.tab, o.param.SportId = e.spt.toString(), o.param.UIBetType = e.uibt, o.param.EventDate = e.edt, o.param.IsFutureDate = e.isfd, o.param.IsInplay = e.ip, o.param.IsInplayAll = e.ipo, o.param.IsFirstLoad = e.ifl)
        },
        updateUV: function (e) {
            uv && o.param && (o.param.SortBy = e.sb, o.param.OddsType = e.ov)
        },
        updateMpc: function (e) {
            mpc.pv = e.pv
        },
        successAction: function (e, t) {
            e && (e.selobj && cCtrl.updateSelObj(e.selobj), e.uvd && (cCtrl.updateUV(e.uvd), e.uvd = _.assign({}, e.uvd, t)), e.mpc && cCtrl.updateMpc(e.mpc), "DEFAULT" != BS.MODE && "PLACEBET" != BS.MODE || BS_Store.showMyBet() || BS.RemainBetSlip(!0), Action.SiteRefresh(e))
        },
        getData: function (jsonData) {
            return "object" == typeof jsonData ? jsonData : eval("(" + jsonData + ")")
        },
        hasOddsForToday: function (e) {
            if ("Today" != o.param.Tab) return !0;
            if ("" == selobj.cids) return !0;
            for (var t = o.param.UIBetType, i = !1, a = 0; a < e[0].e.length; ++a) {
                var s = e[0].e[a];
                if ("oe" == t) {
                    if (void 0 !== s.o.oe || void 0 !== s.o.oe1st) {
                        i = !0;
                        break
                    }
                } else if ("tg" == t) {
                    if (void 0 !== s.o.tg || void 0 !== s.o.tg1st) {
                        i = !0;
                        break
                    }
                } else if ("cs" == t) {
                    if (void 0 !== s.o.cs || void 0 !== s.o.cs1st) {
                        i = !0;
                        break
                    }
                } else {
                    if ("ft1x2" != t) {
                        i = !0;
                        break
                    }
                    if (void 0 !== s.o["1x2"] || void 0 !== s.o["1x21st"]) {
                        i = !0;
                        break
                    }
                }
            }
            return i
        },
        failedAction: function () {
            utility.currentRequest && "abort" != utility.currentRequest.statusText && oddsPage.showLoading(!1), cCtrl.isProcessing = !1
        },
        loadRefresh: function () {
            var e = cCtrl.getLocation(),
                t = e.pathname + e.search;
            isIE9AndBelow && (t = e.url.path + e.url.query), cCtrl.loadContent(t, !1, !1, null, !1)
        },
        loadContent: function (e, t, i, a, s, n) {
            if (Action.resetTimer(), e) {
                var r = (new Date).getTime();
                if (cCtrl.isProcessing && null != cCtrl.prevLoadStartTime && r - cCtrl.prevLoadStartTime < cCtrl.spanSec) return console.log("Subsequent requests fail to be sent while processing requests and within 2 second."), !1;
                cCtrl.isProcessing = !0, cCtrl.prevLoadStartTime = r;
                var l = !1;
                if (t) {
                    var c = cCtrl.getLocation(),
                        d = c.pathname + c.search;
                    isIE9AndBelow && (d = c.url.path + c.url.query);
                    var p = e.indexOf(c.host);
                    p > 0 && (p += c.host.length, e = e.substr(p)), d != e && (l = !0, history.pushState && (isIE9AndBelow ? document.location.hash = e : history.pushState(null, null, e))), e.indexOf("pageno") > 0 && cCtrl.setPageNo(e)
                }
                param.IsFirstLoad = s || !0, param.VersionT = -1, param.VersionS = -1, param.VersionL = -1, param.VersionF = -1, param.VersionU = 0, param.VersionH = HP_Store.getVersion(), param.IsEventMenu = !1, param.SportID = 1, param.CompetitionID = -1, param.reqUrl = e, o.param && (param.oVersion = s ? null : om.versionUtil.getVersion(), param.oCompetitionId = o.param.CompetitionId, param.oEventIds = o.param.EventIds, param.oIsFirstLoad = 1 == s || 1 == l, param.oPageNo = o.param.PageNo, param.oSortBy = o.param.SortBy), ccparam && window.global.enableLiveFeed && (param.LiveCenterEventId = +ccparam.playingEventId, param.LiveCenterSportId = +ccparam.sportId), i && oddsPage.showLoading(!0), r = (new Date).getTime(), utility.service("CentralService", "GetData", param, "POST", function (e) {
                    var i = (new Date).getTime(),
                        s = i - r;
                    cCtrl.isConsoleLogLoadContent && console.log("CentralControl.js - cCtrl.loadContent - GetData - " + s + "ms"), cCtrl.successAction(e, n);
                    var o = (i = (new Date).getTime()) - r;
                    document.title = s + "|" + (o - s) + "|" + o, console.log("document.title = " + document.title), a && a(e), t && pm.tellCashWhereSBKIs()
                }, function () {
                    cCtrl.failedAction()
                })
            }
        },
        changeTheme: function (e) {
            var t = $("#theme");
            if (t.length > 0) {
                var i = t.attr("href"),
                    a = e ? e.toLowerCase() : "";
                switch (a) {
                    case "black":
                    case "theme_black":
                        a = "black";
                        break;
                    case "white":
                    case "theme_white":
                        a = "white";
                        break;
                    case "blue":
                    case "theme_blue":
                        a = "blue";
                        break;
                    case "darkblue":
                    case "theme_darkblue":
                        a = "darkblue";
                        break;
                    default:
                        a = -1 != i.indexOf("/Theme_White/") ? "black" : "white"
                }
                "black" == a ? i = (i = (i = i.replace("/Theme_White/", "/Theme_Black/")).replace("/Theme_Blue/", "/Theme_Black/")).replace("/Theme_DarkBlue/", "/Theme_Black/") : "white" == a ? i = (i = (i = i.replace("/Theme_Black/", "/Theme_White/")).replace("/Theme_Blue/", "/Theme_White/")).replace("/Theme_DarkBlue/", "/Theme_White/") : "blue" == a ? i = (i = (i = i.replace("/Theme_Black/", "/Theme_Blue/")).replace("/Theme_White/", "/Theme_Blue/")).replace("/Theme_DarkBlue/", "/Theme_Blue/") : "darkblue" == a && (i = (i = (i = i.replace("/Theme_Black/", "/Theme_DarkBlue/")).replace("/Theme_White/", "/Theme_DarkBlue/")).replace("/Theme_Blue/", "/Theme_DarkBlue/")), t.attr("href", i), selobj.themeColor = a
            }
        },
        reloadPage: function (e) {
            var t = cCtrl.getLocation(),
                i = t.pathname + t.search;
            isIE9AndBelow && (i = t.url.path + t.url.query), "/" == i && isIE9AndBelow, cCtrl.loadContent(i, !0, !0, null, !0)
        },
        getQueryFromUrl: function (e) {
            var t, i = [];
            "string" == typeof e && "" != e.trim() || (e = window.location.href);
            for (var a = e.slice(e.indexOf("?") + 1).split("&"), s = 0; s < a.length; s++)(t = a[s].split("=")).length > 1 && (i.push(t[0]), i[t[0].toLowerCase()] = t[1]);
            return i
        },
        setPageNo: function (e) {
            var t = parseInt(cCtrl.getQueryFromUrl(e).pageno, 10);
            !isNaN(t) && t > 0 && (o.param.PageNo = t - 1)
        },
        setBackCloseUrl: function (e) {
            var t = cCtrl.getLocation(),
                i = sessionStorage.historyUrls ? JSON.parse(sessionStorage.historyUrls) : [],
                a = (t.pathname + t.search).replace(location.origin, "");
            isIE9AndBelow && (a = t.url.path + t.url.query), 1 != mpc.pv && 0 != mpc.pv || (sessionStorage.removeItem("historyUrls"), i = []), e != a && (i.length >= 100 && i.pop(), i.unshift(a), sessionStorage.historyUrls = JSON.stringify(i))
        },
        goBackClosePage: function () {
            var e = sessionStorage.historyUrls ? JSON.parse(sessionStorage.historyUrls) : ["/" + global.lan + "/sports"],
                t = e.shift();
            t = t.replace(t.slice(1).split("/")[0], global.lan), cCtrl.loadContent(t, !0, !0, function () {
                OddsHeader.reHighlightSelOdds(), OddsHeader.hideAllDDL()
            }, !0), 0 == e.length ? sessionStorage.removeItem("historyUrls") : sessionStorage.historyUrls = JSON.stringify(e)
        },
        goPageNotFound: function () {
            if (cCtrl.isProcessing = !1, parent.location.href) parent.location.replace(parent.location.origin + "/" + global.lan + "/page-not-found");
            else {
                var e = window.location.href.split("sports/");
                window.location.href = e[0] + "page-not-found"
            }
        },
        getLocation: function () {
            var e = isIE9AndBelow ? document.location : history.location || document.location;
            return isIE9AndBelow && (e.url = {
                path: e.hash.length > 0 ? e.hash.slice(1).split("?")[0] : e.pathname,
                query: e.hash.length > 0 && e.hash.slice(1).split("?").length > 1 ? "?" + e.hash.slice(1).split("?")[1] : ""
            }), e
        }
    },
    currentPage = location.hash || 1;
$(function () {
    $.browser.msie && document.documentElement.focus(), UI.isIE && $("#center-panel").css("overflow-y", "scroll"), cCtrl.queryStrings = cCtrl.getQueryFromUrl(location.href.search), cCtrl.reloadPage(), pm.init(), BS.Init(), Action.RightPanel.initBSEvent(), MB.Init(), Action.RightPanel.initMBEvent();
    var e = $("#ftbanner");
    e.length > 0 && e.attr("src", utility.getFooterUrl()), liveCentreControl.Init(), global.portalURL = pm.parentHost()
});
var CONSTANTS = {
        SITEREFRESH: "SITEREFRESH",
        UICHANGE: "UICHANGE",
        TIMERRESET: "TIMERRESET",
        CENTERPANEL: {
            REMOVEHIGHLIGHTODDS: "REMOVEHIGHLIGHTODDS",
            HIGHLIGHTODDS: "CENTERPANELHIGHLIGHTODDS",
            MYEVENTTOGGLE: "CENTERPANELMYEVENTTOGGLE"
        },
        RIGHTPANEL: {},
        LEFTPANEL: {
            TOGGLE: "LEFTPANEL_TOGGLE",
            VIEW: "LEFTPANEL_VIEW",
            EXPAND: "LEFTPANEL_EXPAND",
            VIEWALL: "LEFTPANEL_VIEWALL",
            RESET: "LEFTPANEL_RESET",
            MENUEXPAND: "LEFTPANEL_MENUEXPAND",
            MY_COMPETITION: {
                TOGGLE: "LEFTPANEL_MY_COMPETITION_TOGGLE",
                VIEWALL: "LEFTPANEL_MY_COMPETITION_VIEWALL",
                ORDER: "LEFTPANEL_MY_COMPETITION_ORDER",
                SELECT: "LEFTPANEL_MY_COMPETITION_SELECT",
                EXPAND: "LEFTPANEL_MY_COMPETITION_EXPAND"
            },
            MY_EVENT: {
                TOGGLE: "LEFTPANEL_MY_EVENT_TOGGLE",
                EXPAND: "LEFTPANEL_MY_EVENT_EXPAND"
            },
            SUBVIEW: "LEFTPANEL_SUBVIEW",
            PSEVENT_VIEWALL: "LEFTPANEL_PSEVENT_VIEWALL",
            SERVERCODE: "LEFTPANEL_SERVERCODE"
        },
        PROGRAMME: "PROGRAMME",
        PERFORMANCE: {
            TOGGLE: "PERFORMANCE_TOGGLE"
        },
        FULLSCREENBLOCK: {
            SHOW: "SHOWFULLSCREENBLOCK",
            HIDE: "HIDEFULLSCREENBLOCK"
        },
        POPUP: {
            SHOW: "SHOWPOPUP",
            HIDE: "HIDEPOPUP"
        }
    },
    VIEW = {
        PRESTART: 0,
        INPLAY: 1,
        STARTINGSOON: 2,
        PARLAY: 3
    },
    Router = ReactModule.createModule("Router", {
        home: function () {
            return Router.props.header
        },
        inplay: function () {
            return Router.props.header + "all/in-play"
        },
        startingsoon: function () {
            var e = Router.state.ssmid;
            return Router.props.header + e + "/popular/full-time-asian-handicap-and-over-under"
        },
        parlay: function () {
            var e = Router.state.psmSport;
            return this.lpSport(e, VIEW.PARLAY)
        },
        parlayExit: function () {
            var e = cCtrl.getLocation(),
                t = e.pathname.replace("parlay/", "") + "?" + e.search;
            return e.search && (t += "?" + e.search), t
        },
        sport: function (e, t, i) {
            t || (t = Router.state.view);
            var a = Router.props.header;
            switch (t === VIEW.PARLAY && (a = Router.props.parlayHeader), t) {
                default:
                    case VIEW.PRESTART:
                    Router.state.competitionDefault && i ? a += e + "/select-competition/default" : a += e + "/competition/full-time-asian-handicap-and-over-under";
                break;
                case VIEW.STARTINGSOON:
                        a += e + "/popular/full-time-asian-handicap-and-over-under";
                    break;
                case VIEW.INPLAY:
                        a += (-1 == e ? "all" : e) + "/in-play/full-time-asian-handicap-and-over-under";
                    break;
                case VIEW.PARLAY:
                        a += e + "/competition/full-time-asian-handicap-and-over-under"
            }
            return a
        },
        lpSport: function (e, t) {
            var i = Router.props.header;
            t === VIEW.PARLAY && (i = Router.props.parlayHeader);
            var a = e.sid;
            switch (t) {
                default:
                    case VIEW.PRESTART:
                    case VIEW.PARLAY:
                    i += e.sen,
                Router.state.competitionDefault ? i += "/select-competition/default" : 1 !== e.sid ? i += "/competition/full-time-asian-handicap-and-over-under" : 0 === e.tc ? 1 !== e.sid || 0 === e.tmrc ? i += "/competition/full-time-asian-handicap-and-over-under" : i += "/matches-by-date/tomorrow/full-time-asian-handicap-and-over-under" : i += "/matches-by-date/today/full-time-asian-handicap-and-over-under";
                break;
                case VIEW.STARTINGSOON:
                        i += e.sen + "/popular/full-time-asian-handicap-and-over-under";
                    break;
                case VIEW.INPLAY:
                        i += (-1 === a ? "all" : e.sen) + "/in-play/full-time-asian-handicap-and-over-under"
            }
            return i
        },
        competition: function (e, t, i) {
            var a;
            return a = Router.state.view === VIEW.PARLAY ? Router.props.parlayHeader + e : Router.props.header + e, a += i ? "/mycompetition" : "/competition", a += "/full-time-asian-handicap-and-over-under?competitionids=" + t
        },
        competitionMenu: function (e, t) {
            var i = Router.props.header;
            return Router.state.view === VIEW.PARLAY && (i = Router.props.parlayHeader), Router.state.view == VIEW.INPLAY ? i += "all/select-competition/default?date=inplay" : MM.isEPM ? i += e + "/select-competition/epm" : i += e + "/select-competition/default", i
        },
        selectedCompetitionMenu: function (e) {
            if (o.param.IsInplay) "inplay";
            else if (selobj.dts)
                for (var t = 0; t < selobj.dts.length; ++t) selobj.dts[t].IsSelect && selobj.dts[t].Date;
            var i = this.competitionMenu(e, !1);
            return "" != selobj.cids && (i = i + "?competitionids=" + selobj.cids), i
        },
        event: function () {
            var e = Router.props.header + arguments[0];
            MM.view === VIEW.PARLAY && (e = Router.props.parlayHeader + arguments[0]);
            var t, i = "";
            switch (3 == arguments.length ? (t = arguments[1], i = arguments[2]) : 2 == arguments.length && (_.isString(arguments[1]) ? i = arguments[1] : t = arguments[1]), void 0 === t && (t = Router.state.view), t) {
                case VIEW.STARTINGSOON:
                    e += "/popular";
                    break;
                case VIEW.INPLAY:
                    e += "/in-play"
            }
            return i && i.length > 0 && (e += "/" + i), e
        },
        today: function (e) {
            return MM.view === VIEW.PARLAY ? Router.props.parlayHeader + e + "/matches-by-date/today/full-time-asian-handicap-and-over-under" : Router.props.header + e + "/matches-by-date/today/full-time-asian-handicap-and-over-under"
        },
        tomorrow: function (e) {
            return MM.view === VIEW.PARLAY ? Router.props.parlayHeader + e + "/matches-by-date/tomorrow/full-time-asian-handicap-and-over-under" : Router.props.header + e + "/matches-by-date/tomorrow/full-time-asian-handicap-and-over-under"
        },
        allMatches: function (e) {
            return MM.view === VIEW.PARLAY ? Router.props.parlayHeader + e + "/competition/full-time-asian-handicap-and-over-under" : Router.props.header + e + "/competition/full-time-asian-handicap-and-over-under"
        },
        outright: function (e, t) {
            var i = 1 == e ? "/matches-by-date/today/outright" : "/competition/outright";
            return null != t && (i += "?competitionids=" + t), MM.view === VIEW.PARLAY ? Router.props.parlayHeader + e + i : Router.props.header + e + i
        },
        epm: function (e, t) {
            var i = "/competition/epm";
            return null != t && (i += "?competitionids=" + t), Router.props.header + e + i
        },
        SportEpm: function () {
            return this.betType("epm").split("?")[0]
        },
        betType: function (e) {
            var t = cCtrl.getLocation(),
                i = t.pathname,
                a = t.search;
            isIE9AndBelow && (i = t.url.path, a = t.url.query);
            var s = i.split("/"),
                n = a.replace(/pageno=\d*/i, "pageno=1"),
                r = "",
                l = "parlay" === s[3].toLowerCase();
            switch (l && s.splice(3, 1), s.length) {
                case 4:
                    r = 1 == o.param.SportId ? s.join("/") + "/matches-by-date/" + o.param.Tab + "/" + e + n : s.join("/") + "/competition/" + e + n;
                    break;
                case 5:
                    r = s.join("/") + "/" + (selobj.pid > 0 ? "competition/" : "") + e + n;
                    break;
                case 6:
                    for (var c = 0; c < o.stateObjs.bts.length; c++)
                        if (s[5] == o.stateObjs.bts[c].k) {
                            s.splice(5, 1);
                            break
                        }
                    6 != s.length || "default" != s[5].toLowerCase() && "full-time-asian-handicap-and-over-under" != s[5].toLowerCase() || s.splice(5, 1), "epm" === e && "popular" === s[s.length - 1] && (s[s.length - 1] = "competition"), r = s.join("/") + "/" + e + n;
                    break;
                case 7:
                    for (c = 0; c < o.stateObjs.bts.length; c++)
                        if (s[6] == o.stateObjs.bts[c].k) {
                            s.splice(6, 1);
                            break
                        }
                    7 != s.length || "default" != s[6].toLowerCase() && "full-time-asian-handicap-and-over-under" != s[6].toLowerCase() || s.splice(6, 1), 7 == s.length && s.splice(6, 1), "epm" === e && 6 === s.length && "matches-by-date" === s[s.length - 2] && (s.splice(s.length - 1, 1), s[s.length - 1] = "competition"), r = s.join("/") + "/" + e + n
            }
            return l && (r = r.replace(Router.props.header, Router.props.parlayHeader)), r
        },
        statement: {
            unsettled: function () {
                var e = pm.parentHost();
                return "localhost" != document.domain && null != e && "" != e ? e + "/" + global.lan + "/my-account/statement/betting-history/sports/unsettled-bets" : ""
            },
            settled: function () {
                var e = pm.parentHost();
                return "localhost" != document.domain && null != e && "" != e ? e + "/" + global.lan + "/my-account/statement/betting-history/sports/settled-bets" : ""
            }
        },
        racing: function () {
            return pm.parentHost() + this.props.racing
        }
    });
Object.defineProperty(Router, "state", {
    get: function () {
        return Router.getStore("Router").state
    }
}), Object.defineProperty(Router, "props", {
    get: function () {
        return Router.getStore("Router").props
    }
}), Router.createStore("Router", {
    props: {
        header: "/" + global.lan + "/sports/",
        parlayHeader: "/" + global.lan + "/sports/parlay/",
        cookie: "competitionDefault",
        racing: "/" + global.lan + "/racing/"
    },
    state: {
        view: 0,
        ssmid: -1,
        psmSport: -1,
        rc: !1,
        competitionDefault: !1,
        querystring: !1,
        currentPage: "",
        isChanged: !1
    },
    init: function () {
        var e = this.props.cookie,
            t = this.state;
        Object.defineProperty(this.state, "querystring", {
            get: function () {
                var e = {};
                if (location.search.length > 0) {
                    var t = location.search.substring(1).split("&");
                    t = _.map(t, function (t) {
                        var i = t.toString().split("=");
                        2 == i.length ? e[i[0].toLowerCase()] = i[1] : e[i[0]] = ""
                    })
                }
                return e
            }
        }), t.querystring.rc && t.querystring.rc != t.rc && (t.rc = t.querystring.rc), rc = t.rc, Object.defineProperty(this.state, "competitionDefault", {
            get: function () {
                return "true" == utility.cookie.read(e) || "ASIAN" == uv.urView || "UK" == rc || utility.cookie.write(e, !0, 730), "true" == utility.cookie.read(e)
            },
            set: function (t) {
                utility.cookie.write(e, t, 730)
            }
        }), this.state.currentPage = location.hash || 1, $(window).bind("popstate", function (e) {
            var i = location.hash;
            (t.currentPage != i || !$.browser.msie || $.browser.msie && $.browser.version > 9) && (cCtrl.reloadPage(), t.currentPage = i), t.isChanged = t.currentPage != i
        })
    },
    methods: {
        siterefresh: function (e) {
            this.state.view = e.lpc.sm, e.lpd.ssm && e.lpd.ssm.ssmd.length > 0 ? this.state.ssmid = e.lpd.ssm.ssmd[0].sen : this.state.ssmid = -1, e.lpd.psm && e.lpd.psm.psmd.length > 0 ? this.state.psmSport = e.lpd.psm.psmd[0] : this.state.psmSport = -1
        },
        ChangeDefaultButton: function (e) {
            this.state.competitionDefault = e
        }
    }
});
var Action = function () {
        function e(e, t) {
            return {
                type: e,
                data: t
            }
        }
        return {
            uiChange: function (t) {
                var i = e(CONSTANTS.UICHANGE, t);
                dispatcher.dispatch(i)
            },
            SiteRefresh: function (e) {
                var t = {
                    type: CONSTANTS.SITEREFRESH,
                    data: e
                };
                dispatcher.dispatch(t)
            },
            resetTimer: function () {
                dispatcher.dispatch(e(CONSTANTS.TIMERRESET))
            },
            LoadSite: function (e, t) {
                cCtrl.setBackCloseUrl(e), cCtrl.loadContent(e, !0, !0, null, !0, t)
            },
            RefreshSite: function () {
                cCtrl.loadRefresh()
            },
            ProcessingFinish: function () {
                cCtrl.isProcessing = !1
            },
            PopupNewWin: function (e, t, i) {
                i || (i = e.id), utility.popupUrlWin(t, e, i)
            },
            programme: function (e) {
                cCtrl.loadContent(e, !0, !0, null, !0)
            },
            sport: function () {
                var e = Router.sport.apply(window, arguments);
                cCtrl.loadContent(e, !0, !0, null, !0)
            },
            competition: function (e, t) {
                var i = Router.competition(e, t);
                cCtrl.loadContent(i, !0, !0, null, !0)
            },
            event: function () {
                var e = Router.event.apply(window, arguments);
                cCtrl.setBackCloseUrl(e), cCtrl.loadContent(e, !0, !0, null, !0)
            },
            eventRightCick: function () {
                var e = Router.event.apply(window, arguments);
                utility.openNewTab(e)
            },
            CenterPanel: {
                removeHighlightOdds: function (e) {
                    dispatcher.dispatch({
                        type: CONSTANTS.CENTERPANEL.REMOVEHIGHLIGHTODDS,
                        sids: e
                    })
                },
                HighlightOdds: function (e) {
                    dispatcher.dispatch({
                        type: CONSTANTS.CENTERPANEL.HIGHLIGHTODDS,
                        sids: e
                    })
                }
            },
            RightPanel: {},
            LeftPanel: {
                home: function () {
                    var e = Router.home();
                    cCtrl.loadContent(e, !0, !0, function () {
                        Action.LeftPanel.reset()
                    }, !0)
                },
                homeRightClick: function () {
                    utility.openNewTab(Router.home())
                },
                inplay: function () {
                    var e = Router.inplay();
                    cCtrl.loadContent(e, !0, !0, function () {
                        Action.LeftPanel.reset()
                    })
                },
                inplayRightClick: function () {
                    utility.openNewTab(Router.inplay())
                },
                startingsoon: function () {
                    var e = Router.startingsoon();
                    cCtrl.loadContent(e, !0, !0, function () {
                        Action.LeftPanel.reset()
                    })
                },
                startingsoonRightClick: function () {
                    utility.openNewTab(Router.startingsoon())
                },
                parlay: function () {
                    var e = Router.parlay();
                    cCtrl.loadContent(e, !0, !0)
                },
                parlayRightClick: function () {
                    utility.openNewTab(Router.parlay())
                },
                parlayExit: function () {
                    var e = Router.parlayExit();
                    cCtrl.loadContent(e, !0, !0, function () {
                        Action.LeftPanel.reset()
                    })
                },
                view: function (t) {
                    var i = e(CONSTANTS.LEFTPANEL.VIEW, {
                        view: t
                    });
                    dispatcher.dispatch(i)
                },
                expand: function (t) {
                    var i = e(CONSTANTS.LEFTPANEL.EXPAND, t);
                    dispatcher.dispatch(i)
                },
                viewAll: function (t, i) {
                    var a = e(CONSTANTS.LEFTPANEL.VIEWALL, {
                        id: t,
                        view: i
                    });
                    dispatcher.dispatch(a)
                },
                collapse: function (e) {
                    UI.LEFTPANEL_COLLAPSE(e)
                },
                reset: function () {
                    var t = e(CONSTANTS.LEFTPANEL.RESET);
                    dispatcher.dispatch(t)
                },
                subview: function (t) {
                    var i = e(CONSTANTS.LEFTPANEL.SUBVIEW, t);
                    dispatcher.dispatch(i)
                },
                psEventViewAll: function (t) {
                    var i = e(CONSTANTS.LEFTPANEL.PSEVENT_VIEWALL, t);
                    dispatcher.dispatch(i)
                },
                sport: function () {
                    var e = Router.lpSport.apply(window, arguments);
                    cCtrl.loadContent(e, !0, !0, null, !0)
                },
                sportRightClick: function () {
                    utility.openNewTab(Router.lpSport.apply(window, arguments))
                },
                menuExpand: function (t) {
                    var i = e(CONSTANTS.LEFTPANEL.MENUEXPAND, t);
                    dispatcher.dispatch(i)
                },
                code: function (t) {
                    var i = e(CONSTANTS.LEFTPANEL.SERVERCODE);
                    dispatcher.dispatch(i)
                },
                MyCompetition: {
                    toggle: function (t) {
                        var i = e(CONSTANTS.LEFTPANEL.MY_COMPETITION.TOGGLE, t);
                        dispatcher.dispatch(i)
                    },
                    viewAll: function () {
                        var t = e(CONSTANTS.LEFTPANEL.MY_COMPETITION.VIEWALL);
                        dispatcher.dispatch(t)
                    },
                    order: function (t, i) {
                        var a = e(CONSTANTS.LEFTPANEL.MY_COMPETITION.ORDER, {
                            i: t,
                            d: i
                        });
                        dispatcher.dispatch(a)
                    },
                    select: function (e, t) {
                        var i = Router.competition(t, e, !0);
                        cCtrl.loadContent(i, !0, !0)
                    },
                    expand: function (t) {
                        var i = e(CONSTANTS.LEFTPANEL.MY_COMPETITION.EXPAND, t);
                        dispatcher.dispatch(i)
                    }
                },
                MyEvent: {
                    toggle: function (t) {
                        var i = e(CONSTANTS.LEFTPANEL.MY_EVENT.TOGGLE, t);
                        dispatcher.dispatch(i)
                    },
                    expand: function (t) {
                        var i = e(CONSTANTS.LEFTPANEL.MY_EVENT.EXPAND, t);
                        dispatcher.dispatch(i)
                    }
                }
            },
            FullScreenBlock: {
                show: function (e) {
                    dispatcher.dispatch({
                        type: CONSTANTS.FULLSCREENBLOCK.SHOW,
                        content: e
                    })
                },
                hide: function () {
                    dispatcher.dispatch({
                        type: CONSTANTS.FULLSCREENBLOCK.HIDE
                    })
                }
            },
            PopUp: {
                show: function (e, t) {
                    dispatcher.dispatch({
                        type: CONSTANTS.POPUP.SHOW,
                        isAddedMsg: e,
                        popupType: t
                    })
                },
                hide: function () {
                    dispatcher.dispatch({
                        type: CONSTANTS.POPUP.HIDE
                    })
                }
            }
        }
    }(),
    ccparam = {
        playingEventId: "",
        playingLsId: "",
        hTeamName: "",
        aTeamName: "",
        sportId: "",
        isInplay: !1,
        videoProvider: "",
        selSp: 0,
        targetId: "iframeTarget",
        domain: global.bgurl,
        width: "240",
        height: "245",
        width_enlarge: "418",
        height_enlarge: "346",
        checkEventInterval: 3e5,
        currentDelayTimesToPlayNextEvent: 0,
        delayTimesToPlayNextEvent: 2,
        checkEventTimer: null,
        expireDays: {
            expires: 0,
            path: "/"
        },
        isHideErrorMsg: !1,
        fakeFBId: 10,
        tvTxt: "",
        infoTxt: "",
        liveCentreTxt: "",
        tvGuildTxt: "",
        tvMenuTxt: "",
        CONTENT_CONSOLE_COOKIE_NAME: "ContentConsoleSetting",
        CONTENT_CONSOLE_DEFAULT_PLAY_COOKIE_NAME: "CCDefaultTvPlay",
        CONTENT_CONSOLE_DEFAULT_PLAY_COOKIE_NAME2: "CCDefaultBgPlay",
        CONTENT_CONSOLE_DEFAULT_PLAY_MOREBET_COOKIE_NAME: "CCDefaultMbPlay",
        CONTENT_CONSOLE_CURRENT_PLAY_MOREBET_COOKIE_NAME: "CCCurrentMbPlay",
        CONTENT_CONSOLE_ENLARGE_STATUS: "CCEnlargeStatus"
    },
    lockInfo = {
        isLock: !1,
        eventId: "",
        lsId: "",
        hTeamName: "",
        aTeamName: "",
        sportId: "",
        lang: "",
        videoProvider: ""
    },
    cookies = function () {
        return {
            clearDefaultBgInfo: function () {
                utility.cookie.write(ccparam.CONTENT_CONSOLE_DEFAULT_PLAY_COOKIE_NAME2, "", ccparam.expireDays)
            },
            saveLockInfo: function (e, t, i, a, s, n, o) {
                lockInfo.isLock = !0, lockInfo.eventId = e, lockInfo.lsId = n, lockInfo.aTeamName = i, lockInfo.hTeamName = t, lockInfo.sportId = a, lockInfo.lang = s, lockInfo.videoProvider = o;
                var r = "isLock=" + lockInfo.isLock + "&eventId=" + lockInfo.eventId + "&lsId=" + lockInfo.lsId + "&aTeamName=" + lockInfo.aTeamName + "&hTeamName=" + lockInfo.hTeamName + "&sportId=" + lockInfo.sportId + "&lang=" + s + "&vidoProvider=" + o;
                utility.cookie.write(ccparam.CONTENT_CONSOLE_COOKIE_NAME, r, ccparam.expireDays)
            },
            getLockInfoFromCookie: function () {
                var e = utility.cookie.read(ccparam.CONTENT_CONSOLE_COOKIE_NAME);
                if (null != e && "" != e)
                    for (var t = e.split("&"), i = 0; i < t.length; i++) {
                        var a = t[i].split("=");
                        switch (a[0]) {
                            case "isLock":
                                lockInfo.isLock = Boolean(a[1]);
                                break;
                            case "eventId":
                                lockInfo.eventId = a[1];
                                break;
                            case "lsId":
                                lockInfo.lsId = a[1];
                                break;
                            case "aTeamName":
                                lockInfo.aTeamName = a[1];
                                break;
                            case "hTeamName":
                                lockInfo.hTeamName = a[1];
                                break;
                            case "sportId":
                                lockInfo.sportId = a[1];
                                break;
                            case "lang":
                                ccparam.lang = a[1];
                                break;
                            case "vidoProvider":
                                lockInfo.videoProvider = a[1]
                        }
                    }
            },
            clearLockInfo: function () {
                lockInfo.isLock = !1, lockInfo.eventId = "", lockInfo.lsId = "", lockInfo.aTeamName = "", lockInfo.hTeamName = "", lockInfo.sportId = "", lockInfo.lang = "", lockInfo.videoProvider = "", utility.cookie.write(ccparam.CONTENT_CONSOLE_COOKIE_NAME, "", ccparam.expireDays)
            },
            getDefaultTvInfo: function () {
                var e = utility.cookie.read(ccparam.CONTENT_CONSOLE_DEFAULT_PLAY_COOKIE_NAME);
                if (e && "" != e) {
                    for (var t = new Object, i = e.split("&"), a = 0; a < i.length; a++) {
                        var s = i[a].split("=");
                        switch (s[0]) {
                            case "eventId":
                                t.playingEventId = s[1];
                                break;
                            case "lsId":
                                t.playingLsId = s[1];
                                break;
                            case "aTeamName":
                                t.aTeamName = s[1];
                                break;
                            case "hTeamName":
                                t.hTeamName = s[1];
                                break;
                            case "sportId":
                                t.sportId = s[1];
                                break;
                            case "lang":
                                t.lang = s[1];
                                break;
                            case "vidoProvider":
                                t.videoProvider = s[1]
                        }
                    }
                    return t
                }
                return null
            },
            saveDefaultTvInfo: function (e, t, i, a, s, n, o) {
                var r = "eventId=" + e + "&lsId=" + n + "&aTeamName=" + i + "&hTeamName=" + t + "&sportId=" + a + "&lang=" + s + "&vidoProvider=" + o;
                utility.cookie.write(ccparam.CONTENT_CONSOLE_DEFAULT_PLAY_COOKIE_NAME, r, ccparam.expireDays)
            },
            getDefaultBgInfo: function () {
                var e = utility.cookie.read(ccparam.CONTENT_CONSOLE_DEFAULT_PLAY_COOKIE_NAME2);
                if (e && "" != e) {
                    for (var t = e.split("&"), i = new Object, a = 0; a < t.length; a++) {
                        var s = t[a].split("=");
                        switch (s[0]) {
                            case "eventId":
                                i.playingEventId = s[1];
                                break;
                            case "lsId":
                                i.playingLsId = s[1];
                                break;
                            case "aTeamName":
                                i.aTeamName = s[1];
                                break;
                            case "hTeamName":
                                i.hTeamName = s[1];
                                break;
                            case "sportId":
                                i.sportId = s[1];
                                break;
                            case "lang":
                                i.lang = s[1];
                                break;
                            case "vidoProvider":
                                i.videoProvider = s[1]
                        }
                    }
                    return i
                }
                return null
            },
            saveDefaultBgInfo: function (e, t, i, a, s, n, o) {
                var r = "eventId=" + e + "&lsId=" + n + "&aTeamName=" + i + "&hTeamName=" + t + "&sportId=" + a + "&lang=" + s + "&vidoProvider=" + o;
                utility.cookie.write(ccparam.CONTENT_CONSOLE_DEFAULT_PLAY_COOKIE_NAME2, r, ccparam.expireDays)
            },
            saveMbInfo: function (e, t, i, a, s, n, o, r) {
                var l = "eventId=" + e + "&lsId=" + n + "&aTeamName=" + i + "&hTeamName=" + t + "&sportId=" + a + "&lang=" + s + "&vidoProvider=" + o,
                    c = r ? ccparam.CONTENT_CONSOLE_DEFAULT_PLAY_MOREBET_COOKIE_NAME : ccparam.CONTENT_CONSOLE_CURRENT_PLAY_MOREBET_COOKIE_NAME;
                utility.cookie.write(c, l, r ? ccparam.expireDays : 1)
            },
            getMbInfo: function (e) {
                var t = e ? ccparam.CONTENT_CONSOLE_DEFAULT_PLAY_MOREBET_COOKIE_NAME : ccparam.CONTENT_CONSOLE_CURRENT_PLAY_MOREBET_COOKIE_NAME,
                    i = utility.cookie.read(t);
                if (i && "" != i) {
                    for (var a = i.split("&"), s = new Object, n = 0; n < a.length; n++) {
                        var o = a[n].split("=");
                        switch (o[0]) {
                            case "eventId":
                                s.playingEventId = o[1];
                                break;
                            case "lsId":
                                s.playingLsId = o[1];
                                break;
                            case "aTeamName":
                                s.aTeamName = o[1];
                                break;
                            case "hTeamName":
                                s.hTeamName = o[1];
                                break;
                            case "sportId":
                                s.sportId = o[1];
                                break;
                            case "lang":
                                s.lang = o[1];
                                break;
                            case "vidoProvider":
                                s.videoProvider = o[1]
                        }
                    }
                    return s
                }
                return null
            },
            clearMbInfo: function (e) {
                utility.cookie.write(e ? ccparam.CONTENT_CONSOLE_DEFAULT_PLAY_MOREBET_COOKIE_NAME : ccparam.CONTENT_CONSOLE_CURRENT_PLAY_MOREBET_COOKIE_NAME, "", ccparam.expireDays)
            }
        }
    }(),
    liveCentreControl = function () {
        var e = function (e, t, i, s, n, o, r) {
                r ? utility.service("LiveTv", "GetLiveEventDetails", {
                    Date: "",
                    SportId: s,
                    IsCheckUserCanSeeTv: !0
                }, "GET", function (r) {
                    r.stv || (n = ""), a(e, t, i, s, n, o)
                }) : a(e, t, i, s, "", o), Action.RightPanel.TV.setPlayEventId(e)
            },
            t = function () {
                $("#noBgMsg").addClass("hidden").parent().removeClass("noEvents"), $("#iframeTarget").removeClass("hidden"), $("#lcsb").removeClass("hidden"), ccparam.isHideErrorMsg = !0
            },
            i = function (e, i, a, n, o, r, l) {
                if (window.global.enableLiveFeed) t(), lockInfo.isLock && (e = lockInfo.eventId, r = lockInfo.lsId, i = lockInfo.hTeamName, a = lockInfo.aTeamName, n = lockInfo.sportId, l = lockInfo.videoProvider), s(e, i, a, n, r, l);
                else {
                    ccparam.width, ccparam.height;
                    try {
                        if (t(), lockInfo.isLock && (e = lockInfo.eventId, r = lockInfo.lsId, i = lockInfo.hTeamName, a = lockInfo.aTeamName, n = lockInfo.sportId, l = lockInfo.videoProvider), ccparam.playingEventId = e, ccparam.playingLsId = r, ccparam.hTeamName = i, ccparam.aTeamName = a, ccparam.sportId = n, ccparam.videoProvider = l, ccparam.currentDelayTimesToPlayNextEvent = 0, !scorecentre) return;
                        utility.service("LiveTv", "GetLiveStramProvider", {
                            Date: "",
                            SportId: n,
                            IsCheckUserCanSeeTv: !0,
                            EventId: e
                        }, "GET", function (t) {
                            var i = "s" == t.pvdr && "" != r ? t.strmId : r,
                                a = pm.parentHost();
                            null == a && document.location.origin;
                            liveCentreControl.getEnlargeStatus() && (ccparam.width_enlarge, ccparam.height_enlarge), cookies.saveMbInfo(ccparam.playingEventId, ccparam.hTeamName, ccparam.aTeamName, ccparam.sportId, global.lan, i, t.pvdr, !1);
                            var s = location.protocol + "//" + (1 == n ? window.global.fbLiveCenterURL : window.global.osLiveCenterURL) + "?eventId=" + e + "&culture=" + function (e) {
                                "km-kh" == e && (e = "en-gb");
                                var t = e.split("-"),
                                    i = "";
                                t.length > 1 ? ("zh-cn" === t[1] && (t[1] = "zh-ch"), i = t[0] + "-" + t[1].toUpperCase()) : i = e;
                                return i
                            }(o);
                            i > 0 && (s += "&videoId=" + i + "&videoProvider=" + t.pvdr + "&homeTeamName=" + ccparam.hTeamName + "&awayTeamName=" + ccparam.aTeamName), document.getElementById(ccparam.targetId).innerHTML = '<iframe id="liveCenter" style="height: 280px;" width="100%" scrolling="no" frameborder="0" allowtransparency="true" src="' + s + '"></iframe>', Action.RightPanel.TV.setPlayEventId(e)
                        })
                    } catch (e) {
                        console.log("liveCentre.js create - Error Message = " + e.message)
                    }
                }
            };
        var a = function (e, a, n, o, r, l) {
            if (window.global.enableLiveFeed) t(), s(e, a, n, o, r, l);
            else try {
                if (t(), "undefined" == typeof scorecentre || !scorecentre) return;
                om.isPlayingCC ? (ccparam.playingEventId = e, ccparam.playingLsId = r, ccparam.hTeamName = a, ccparam.aTeamName = n, ccparam.sportId = o, ccparam.videoProvider = l, ccparam.currentDelayTimesToPlayNextEvent = 0, scorecentre.target && scorecentre.target.id ? utility.service("LiveTv", "GetLiveStramProvider", {
                    Date: "",
                    SportId: o,
                    IsCheckUserCanSeeTv: !0,
                    EventId: e
                }, "GET", function (t) {
                    var s = "s" == t.pvdr && "" != r ? t.strmId : r;
                    try {
                        cookies.saveMbInfo(ccparam.playingEventId, ccparam.hTeamName, ccparam.aTeamName, ccparam.sportId, global.lan, s, t.pvdr, !1), scorecentre.iframe.api.loadEvent(e, a, n, 1 != o || "" == s || t.isBgs ? o : ccparam.fakeFBId, s, t.pvdr)
                    } catch (t) {
                        console.log("api.loadEvent : " + t), i(e, a, n, o, global.lan, r, l)
                    }
                }) : i(e, a, n, o, global.lan, r, l)) : i(e, a, n, o, global.lan, r, l)
            } catch (e) {
                console.log("liveCentre.js playIgnoreLockPlay - Error Message = " + e.message)
            }
        };

        function s(e, t, i, a, s, o) {
            ccparam.playingEventId = e, ccparam.playingLsId = s, ccparam.hTeamName = t, ccparam.aTeamName = i, ccparam.sportId = a, ccparam.videoProvider = o, ccparam.currentDelayTimesToPlayNextEvent = 0, utility.service("LiveTv", "GetLiveStramProvider", {
                Date: "",
                SportId: a,
                IsCheckUserCanSeeTv: !0,
                EventId: e
            }, "GET", function (t) {
                cookies.saveMbInfo(ccparam.playingEventId, ccparam.hTeamName, ccparam.aTeamName, ccparam.sportId, global.lan, s, t.pvdr, !1), n(), lcApi.loadLiveCenter(document.getElementById(ccparam.targetId), e, "" == s ? 0 : s, +global.lcPId, global.lan, !1)
            })
        }

        function n() {
            utility.service("CentralService", "GetDataLCSB", {
                SportId: ccparam.sportId,
                EventId: ccparam.playingEventId
            }, "POST", function (e) {
                Action.RightPanel.LiveCenter.updateScoreboard(e)
            })
        }
        return {
            Init: function () {
                uv.login ? utility.service("LiveTv", "GetLiveEventDetails", {
                    Date: ccparam.selDt,
                    SportId: ccparam.selSp,
                    IsCheckUserCanSeeTv: !0
                }, "GET", function (e) {
                    e.stv ? Action.RightPanel.TV.showMenuBtn() : Action.RightPanel.TV.hideMenuBtn()
                }) : Action.RightPanel.TV.hideMenuBtn(), cookies.getLockInfoFromCookie(), lockInfo.isLock && (Action.RightPanel.TV.toggleLockBtn(!0, !1), e(lockInfo.eventId, lockInfo.hTeamName, lockInfo.aTeamName, lockInfo.sportId, lockInfo.lsId, lockInfo.videoProvider, uv.login))
            },
            showErrorMsg: function () {
                $("#noBgMsg").removeClass("hidden").parent().addClass("noEvents"), $("#iframeTarget").addClass("hidden"), $("#lcsb").addClass("hidden"), ccparam.isHideErrorMsg = !1
            },
            hideErrorMsg: t,
            clearDefaultBgInfo: cookies.clearDefaultBgInfo,
            playIgnoreLock: e,
            saveLockInfo: cookies.saveLockInfo,
            loadEvent: function () {
                utility.service("LiveTv", "GetLiveEventDetails", {
                    Date: ccparam.selDt,
                    SportId: ccparam.selSp,
                    IsCheckUserCanSeeTv: !0
                }, "GET", function (e) {
                    Action.RightPanel.TV.tvDataLoaded(e)
                })
            },
            playDefault: function (e) {
                var s = !1;
                uv.login ? utility.service("LiveTv", "GetEventDetailsWithoutChkRegion", {
                    Date: "",
                    SportId: ccparam.selSp
                }, "GET", function (n) {
                    var r = o.$mainOddsPanel.find(".tvip.bgs");
                    if (r.length > 0) {
                        var l = r[0].getAttribute("cc-info");
                        if (l && "" != l) {
                            var c = l.split("|"),
                                d = c[0],
                                p = c[1],
                                u = c[2],
                                h = c[3],
                                f = n && n.stv ? c[4] : "",
                                m = c[5],
                                g = cookies.getDefaultTvInfo();
                            g ? d != g.playingEventId ? (cookies.saveDefaultTvInfo(d, p, u, h, global.lan, f, m), a(d, p, u, h, f, m)) : d == ccparam.playingEventId || lockInfo.isLock ? om.isPlayingCC || i(d, p, u, h, global.lan, f, m) : a(d, p, u, h, f, m) : (cookies.saveDefaultTvInfo(d, p, u, h, global.lan, f, m), i(d, p, u, h, global.lan, f, m)), t(), s = !0
                        }
                    }
                    e && e(s)
                }) : (s = !1, e && e(s))
            },
            play: function (e, a, n, o, r, l, c) {
                if (window.global.enableLiveFeed) {
                    if (t(), lockInfo.isLock && "" != ccparam.playingEventId) return;
                    if (ccparam.playingEventId == e && ccparam.playingLsId == r) return;
                    s(e, a, n, o, r, l)
                } else try {
                    if (t(), lockInfo.isLock && "" != ccparam.playingEventId) return;
                    if (!scorecentre) return;
                    if (ccparam.playingEventId == e && ccparam.playingLsId == r) return;
                    om.isPlayingCC ? (ccparam.playingEventId = e, ccparam.playingLsId = r, ccparam.hTeamName = a, ccparam.aTeamName = n, ccparam.sportId = o, ccparam.currentDelayTimesToPlayNextEvent = 0, scorecentre.target && scorecentre.target.id && !c ? utility.service("LiveTv", "GetLiveStramProvider", {
                        Date: "",
                        SportId: o,
                        IsCheckUserCanSeeTv: !0,
                        EventId: e
                    }, "GET", function (t) {
                        var s = "s" == t.pvdr && "" != r ? t.strmId : r;
                        try {
                            cookies.saveMbInfo(ccparam.playingEventId, ccparam.hTeamName, ccparam.aTeamName, ccparam.sportId, global.lan, s, t.pvdr, !1), scorecentre.iframe.api.loadEvent(e, a, n, 1 != o || "" == s || t.isBgs ? o : ccparam.fakeFBId, s, t.pvdr)
                        } catch (t) {
                            console.log("api.loadEvent : " + t), i(e, a, n, o, global.lan, r, l)
                        }
                    }) : i(e, a, n, o, global.lan, r, l)) : i(e, a, n, o, global.lan, r, l)
                } catch (e) {
                    console.log("liveCentre.js play - Error Message = " + e.message)
                }
            },
            resetToDefault: function () {
                om.isFoundBg = !1, om.isPlayingCC = !1, ccparam.currentDelayTimesToPlayNextEvent = 0, ccparam.playingEventId = "", ccparam.sportId = "", cookies.clearMbInfo(!1)
            },
            getDefaultBgInfo: cookies.getDefaultBgInfo,
            saveMbInfo: cookies.saveMbInfo,
            saveDefaultBgInfo: cookies.saveDefaultBgInfo,
            getMbInfo: cookies.getMbInfo,
            clearMbInfo: cookies.clearMbInfo,
            enlarge: function () {
                ccparam.isEnlarge = !0;
                var e = document.getElementById(ccparam.targetId);
                e && (e.width = ccparam ? ccparam.width_enlarge : 418, e.height = ccparam ? ccparam.height_enlarge : 346, utility.cookie.write(ccparam.CONTENT_CONSOLE_ENLARGE_STATUS, "true", ccparam.expireDays))
            },
            shrink: function () {
                ccparam.isEnlarge = !1;
                var e = document.getElementById(ccparam.targetId);
                e && (e.width = ccparam ? ccparam.width : 240, e.height = ccparam ? ccparam.height : 245, utility.cookie.write(ccparam.CONTENT_CONSOLE_ENLARGE_STATUS, "false", ccparam.expireDays))
            },
            getEnlargeStatus: function () {
                var e = utility.cookie.read(ccparam.CONTENT_CONSOLE_ENLARGE_STATUS);
                return !!e && "true" == e
            },
            checkPlayingEvent: function () {
                ccparam.checkEventTimer && (clearInterval(ccparam.checkEventTimer), ccparam.checkEventTimer = null), ccparam.checkEventTimer = setInterval(function () {
                    utility.service("LiveTv", "CheckPlayingBGEvent", {
                        eventId: "" == ccparam.playingEventId ? "0" : ccparam.playingEventId,
                        sportId: "" == ccparam.sportId ? "0" : ccparam.sportId,
                        IsLiveTvEvent: "" != ccparam.playingLsId
                    }, "GET", function (e) {
                        void 0 !== e.cdbg && e.cdbg != uv.cdbg && (uv.cdbg = e.cdbg, ccparam.playingEventId = "", ccparam.playingLsId = "", om.isPlayingCC = !1, om.isFoundBg = !1, uv.cdbg ? 2 == mpc.pv ? omb.playCC(!0) : 1 == mpc.pv && e.ipe && om.playCC() : liveCentreControl.clearDefaultBgInfo()), e.ipe || (ccparam.currentDelayTimesToPlayNextEvent != ccparam.delayTimesToPlayNextEvent && om.isPlayingCC ? ccparam.currentDelayTimesToPlayNextEvent += 1 : (ccparam.currentDelayTimesToPlayNextEvent = 0, "" != ccparam.playingEventId && (ccparam.previousPlayingEventId = ccparam.playingEventId), ccparam.playingEventId = "", om.isFoundBg = !1, om.isPlayingCC = !1, uv.cdbg && 1 == mpc.pv && (ccparam.previousPlayingEventId == lockInfo.eventId && lockInfo.isLock && Action.RightPanel.TV.toggleLockBtn(!1, !0), function () {
                            liveCentreControl.clearDefaultBgInfo(), uv.login && "" != ccparam.playingLsId ? ("" != ccparam.previousPlayingEventId && o.$mainOddsPanel.find("#e" + ccparam.previousPlayingEventId + " .btn-tv-ip").removeClass("bgs"), ccparam.playingLsId = "") : "" != ccparam.previousPlayingEventId && o.$mainOddsPanel.find("#e" + ccparam.previousPlayingEventId + " .btn-livematch-ip").addClass("hidden");
                            var e, t, i, a, s, n, r, l = o.$mainOddsPanel.find(".btn-livematch-ip:not(.hidden)"),
                                c = !1;
                            if (l.length > 0) {
                                for (var d = 0; d < l.length; d++)
                                    if (e = l[d]) {
                                        var p = e.getAttribute("cc-info");
                                        if (p && "" != p) {
                                            var u = p.split("|");
                                            if (t = u[0], i = u[1], a = u[2], s = u[3], n = u[4], r = u[5], ccparam.previousPlayingEventId != t) {
                                                c = !0;
                                                break
                                            }
                                            e.className += " hidden", d === l.length - 1 && (ccparam.previousPlayingEventId = "")
                                        }
                                    }
                            } else ccparam.previousPlayingEventId = "";
                            c && (liveCentreControl.saveDefaultBgInfo(t, i, a, s, global.lan, n, r), om.isFoundBg = !0, console.log("Find next e : " + t + ", s : " + s)), om.playCC()
                        }())))
                    })
                }, ccparam.checkEventInterval)
            },
            create: i,
            updateScoreboard: n
        }
    }(),
    Timer = ReactModule.createModule("Timer");
Timer.createSingularStore({
    init: function () {
        var e = this;
        this.props.timer.add(1e3, function () {
            e.tick(), e.trigger()
        })
    },
    props: {
        timer: function () {
            var e, t = 1e3,
                i = !1,
                a = [],
                s = 1;

            function n(e) {
                for (var t = 0; t < a.length; t++)
                    if (a[t].id == e) return {
                        i: t,
                        item: a[t]
                    }
            }

            function o(s, o) {
                if (s) {
                    var r = n(s);
                    r && r.item.toggle(o)
                } else
                    for (var l = 0; l < a.length; l++) a[l].toggle(o);
                o && !i && (i = !0, e = window.setInterval(function () {
                    for (l = 0; l < a.length; l++) a[l].step()
                }, t))
            }
            return {
                add: function () {
                    var e, i, o;
                    if (3 == arguments.length) e = arguments[0], i = arguments[1], o = arguments[2];
                    else {
                        if (2 != arguments.length) return;
                        e = s++, i = arguments[0], o = arguments[1]
                    }
                    var r = new function (e, i, a) {
                            var s = i,
                                n = !1;
                            this.id = e, this.interval = i, this.Work = a, this.step = function () {
                                n && (s -= t) <= 0 && (s = this.interval, this.Work())
                            }, this.start = function () {
                                n || (s = this.interval, n = !0)
                            }, this.stop = function () {
                                n = !1
                            }, this.toggle = function (e) {
                                e ? this.start() : this.stop()
                            }, this.getDesc = function () {
                                return {
                                    id: this.id,
                                    interval: this.interval
                                }
                            }
                        }(e, i, o),
                        l = n(e);
                    return l ? a[l.i] = r : a.push(r), e
                },
                remove: function (e) {
                    var t = n(e);
                    t && a.splice(t.i, 1)
                },
                getJobs: function () {
                    for (var e = [], t = 0; t < a.length; t++) e.push(a[t].getDesc());
                    return e
                },
                start: function (e) {
                    o(e, !0)
                },
                stop: function (e) {
                    o(e, !1)
                },
                destory: function () {
                    a = [], i && (i = !1, clearInterval(e))
                },
                restart: function () {
                    this.destory(), this.start()
                }
            }
        }()
    },
    state: {
        period: 0,
        tick: 0,
        schedule: {}
    },
    methods: {
        SITEREFRESH: function (e) {
            this.updateData(e)
        },
        TIMERRESET: function () {
            this.state.period = 0, this.state.schedule = {}
        },
        updateData: function (e) {
            this.props.timer.stop(), this.props.timer.destory(), this.state.tick = this.state.period = 0, this.state.schedule = {};
            var t = this;
            this.props.timer.add(1e3, function () {
                t.tick(), t.trigger()
            }), this.props.timer.start()
        },
        tick: function () {
            this.state.tick++, this.state.period++, this.state.schedule[this.state.tick] && _.map(this.state.schedule[this.state.tick], function (e) {
                try {
                    e.c(this.state.tick)
                } catch (e) {
                    console.error(e)
                }
            }, this)
        }
    },
    public: {
        after: function (e, t) {
            var i = this.state.tick + e;
            this.state.schedule[i] || (this.state.schedule[i] = []);
            var a = {
                c: t
            };
            return this.state.schedule[i].push(a),
                function (e) {
                    a.c = function (e) {
                        console.log("task cancel at " + e)
                    }
                }
        },
        interval: function (e, t) {
            var i = this,
                a = this.props.timer.add(1e3 * e, function () {
                    t(i.state.tick)
                });
            return this.props.timer.start(a), a
        },
        remove: function (e) {
            this.props.timer.remove(e)
        }
    }
}), ReactModule.publicToModule(Timer);
var ScrollerBar = function () {
        var e, t, i, a, s, n = !1,
            r = $("#center-panel");

        function l() {
            var e = $("#ftbanner"),
                t = s.outerHeight(),
                i = o.$mainOddsPanel.height() + (e.hasClass("hidden") ? 0 : e.height());
            winHeight = $(window).height();
            var n = (i > winHeight ? i : winHeight) - a.offset().top - 10;
            a.height(n > t ? t : n)
        }
        return {
            initScrollbarStatus: function () {
                $("#center-panel").removeAttr("style")
            },
            initQuickMenuScrollbar: function () {
                i = $("#quickMenu"), a = $("#quickMenuContainer"), s = $("#quickMenuOptions"), l(), a.hasClass("jspScrollable") ? (t.reinitialise(), t.scrollTo(0, 0)) : (a.jScrollPane({
                    showArrows: !1,
                    hideFocus: !0,
                    verticalGutter: 0,
                    horizontalGutter: 0,
                    keepTrack: !1
                }), t = a.data("jsp"), $(window).bind("resize", function () {
                    i.hasClass("collapsed") || (l(), t.reinitialise())
                }))
            },
            scrollToTop: function () {
                UI.isIE ? r[0].scrollTop = 0 : n ? e.scrollTo(0, 0) : r[0].scrollTop = 0
            }
        }
    }(),
    UI = ReactModule.createModule("ui", {}, function () {
        Object.defineProperty(this, "state", {
            get: function () {
                return UI.store.ui.state
            }
        }), Object.defineProperty(this, "view", {
            get: function () {
                return UI.store.ui.state.view
            }
        }), Object.defineProperty(this, "left", {
            get: function () {
                return UI.store.ui.state.left
            }
        }), Object.defineProperty(this, "center", {
            get: function () {
                return UI.store.ui.state.center
            }
        }), Object.defineProperty(this, "right", {
            get: function () {
                return UI.store.ui.state.right
            }
        }), Object.defineProperty(this, "indicator", {
            get: function () {
                return UI.store.ui.props.INDICATOR
            }
        }), Object.defineProperty(this, "rightPanelEnlarge", {
            get: function () {
                return liveCentreControl.getEnlargeStatus()
            },
            set: function (e) {
                e ? liveCentreControl.enlarge() : liveCentreControl.shrink()
            }
        }), Object.defineProperty(this, "browser", {
            get: function () {
                return this.store.ui.state.browser
            }
        }), Object.defineProperty(this, "isIE", {
            get: function () {
                var e = this.store.ui.state.browser;
                return _.startsWith(e, "IE") || _.startsWith(e, "MSIE") || _.startsWith(e, "Edge")
            }
        }), Object.defineProperty(this, "isFirefox", {
            get: function () {
                var e = this.store.ui.state.browser;
                return _.startsWith(e, "Firefox")
            }
        }), Object.defineProperty(this, "isMACFirefox", {
            get: function () {
                var e = this.store.ui.state.browser;
                return "MacIntel" == navigator.platform && _.startsWith(e, "Firefox")
            }
        }), Object.defineProperty(this, "isMACSafari", {
            get: function () {
                var e = this.store.ui.state.browser;
                return "MacIntel" == navigator.platform && _.startsWith(e, "Safari")
            }
        })
    }),
    UIVIEW = {
        NORMAL: 1440,
        R1024: 1024,
        R1280: 1280
    };
UI.createStore("ui", {
    init: function () {
        var e, t, i;
        $("#sbody").addClass(this.props.VIEWCSS.NORMAL), this.state.viewCss = this.props.VIEWCSS.NORMAL, this.state.view = UIVIEW.NORMAL, this.state.indicator = this.props.INDICATOR.WINDOW, window.location.href.indexOf("popup/betslip") < 0 && (this.updateSize(), $(window).resize(function () {
            this.updateSize()
        }.bind(this))), this.state.browser = navigator.sayswho = (t = navigator.userAgent, i = t.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [], /trident/i.test(i[1]) ? "IE " + ((e = /\brv[ :]+(\d+)/g.exec(t) || [])[1] || "") : "Chrome" === i[1] && null != (e = t.match(/\b(OPR|Edge)\/(\d+)/)) ? e.slice(1).join(" ").replace("OPR", "Opera") : (i = i[2] ? [i[1], i[2]] : [navigator.appName, navigator.appVersion, "-?"], null != (e = t.match(/version\/(\d+)/i)) && i.splice(1, 1, e[1]), i.join(" ")))
    },
    props: {
        INDICATOR: {
            WINDOW: 0,
            LEFT: 1,
            CENTER: 2,
            RIGHT: 3
        },
        VIEWCSS: {
            NORMAL: "res1440",
            R1024: "res1024",
            R1280: "res1280"
        }
    },
    state: {
        w: 0,
        h: 0,
        view: null,
        viewCss: null,
        indicator: !1,
        left: {
            minimized: !1
        },
        center: {
            is1stHalfOn: null,
            isBasketball: !1
        },
        right: {
            isLarge: !1
        },
        pv: 0,
        isInplay: !1,
        uiBetType: null,
        browser: !1
    },
    methods: {
        update: function () {
            var e = UI.rightPanelEnlarge;
            switch (this.state.indicator) {
                case this.props.INDICATOR.LEFT:
                    switch (this.state.view) {
                        case UIVIEW.R1024:
                            this.state.center.is1stHalfOn = !!this.state.left.minimized, this.state.right.isLarge = !1;
                            break;
                        case UIVIEW.R1280:
                            2 == this.state.pv ? this.state.left.minimized = !1 : this.state.left.minimized ? (this.state.center.is1stHalfOn = !0, this.state.right.isLarge = !0) : this.state.right.isLarge = !this.state.center.is1stHalfOn && !this.state.center.isBasketball;
                            break;
                        case UIVIEW.NORMAL:
                        default:
                            this.state.left.minimized = !1
                    }
                    break;
                case this.props.INDICATOR.CENTER:
                    switch (this.state.view) {
                        case UIVIEW.R1024:
                            2 == this.state.pv ? (this.state.left.minimized = !!this.state.isInplay, this.state.right.isLarge = !!this.state.isInplay) : null != this.state.center.is1stHalfOn && (this.state.center.is1stHalfOn ? e ? this.state.right.isLarge = !1 : this.state.left.minimized = !0 : e || (this.state.left.minimized = !1));
                            break;
                        case UIVIEW.R1280:
                            2 == this.state.pv ? (this.state.left.minimized = !1, this.state.right.isLarge = !0) : 1 == this.state.pv && (this.state.center.is1stHalfOn || this.state.center.isBasketball ? this.state.left.minimized = !(!this.state.isInplay || !e) : this.state.left.minimized = !1);
                            break;
                        case UIVIEW.NORMAL:
                        default:
                            this.state.left.minimized = !1, this.state.right.isLarge = !(2 != this.state.pv && !this.state.isInplay)
                    }
                    break;
                case this.props.INDICATOR.RIGHT:
                    switch (this.state.view) {
                        case UIVIEW.R1024:
                            this.state.left.minimized = !!this.state.right.isLarge, this.state.center.is1stHalfOn = !1;
                            break;
                        case UIVIEW.R1280:
                            2 == this.state.pv ? this.state.left.minimized = !1 : this.state.left.minimized = !(!this.state.right.isLarge || !this.state.center.is1stHalfOn && !this.state.center.isBasketball);
                            break;
                        case UIVIEW.NORMAL:
                        default:
                            this.state.left.minimized = !1
                    }
                    break;
                case this.props.INDICATOR.WINDOW:
                default:
                    switch (this.state.view) {
                        case UIVIEW.R1024:
                            2 == this.state.pv ? this.state.isInplay ? (this.state.left.minimized = !!e, this.state.right.isLarge = e) : (this.state.left.minimized = !1, this.state.right.isLarge = !1) : this.state.center.is1stHalfOn ? (this.state.left.minimized = !0, this.state.right.isLarge = !1) : (this.state.left.minimized = !!e, this.state.right.isLarge = e);
                            break;
                        case UIVIEW.R1280:
                            2 == this.state.pv ? (this.state.left.minimized = !1, this.state.right.isLarge = !0) : this.state.center.is1stHalfOn || this.state.center.isBasketball || e ? (this.state.left.minimized = !(!this.state.center.is1stHalfOn && !this.state.center.isBasketball || !e), this.state.right.isLarge = e) : (this.state.left.minimized = !1, this.state.right.isLarge = !1);
                            break;
                        case UIVIEW.NORMAL:
                        default:
                            this.state.left.minimized = !1, this.state.right.isLarge = !(2 != this.state.pv && !this.state.isInplay)
                    }
            }
            0 == this.state.pv ? (this.state.left.minimized = !1, this.state.right.isLarge = !1) : 1 == this.state.pv ? ("ftahou" != o.param.UIBetType && "ft1x2" != o.param.UIBetType && (this.state.left.minimized = !1), this.state.isInplay || (this.state.right.isLarge = !1)) : 3 == this.state.pv && "Inplay" != o.param.Tab && (this.state.left.minimized = !1, this.state.right.isLarge = !1), this.updateCenterPanel()
        },
        updateSize: function () {
            this.state.w = $(window).width(), this.state.h = $(window).height();
            var e = this.getView();
            e != this.state.view && (this.state.view = e, this.state.indicator = this.props.INDICATOR.WINDOW, this.update(), this.updateBodyCss(), this.dispatch())
        },
        getView: function () {
            var e;
            return (e = void 0 !== window.outerWidth && 0 != window.outerWidth ? window.outerWidth : $(window).outerWidth(!0) + 23) < UIVIEW.R1280 ? UIVIEW.R1024 : e >= UIVIEW.NORMAL ? UIVIEW.NORMAL : UIVIEW.R1280
        },
        updateBodyCss: function () {
            var e;
            switch (this.state.view) {
                case UIVIEW.R1024:
                    e = this.props.VIEWCSS.R1024;
                    break;
                case UIVIEW.R1280:
                    e = this.props.VIEWCSS.R1280;
                    break;
                default:
                    e = this.props.VIEWCSS.NORMAL
            }
            $("#sbody").removeClass(this.state.viewCss).addClass(e), this.state.viewCss = e
        },
        updateCenterPanel: function () {
            var e = $("#center-panel");
            this.state.left.minimized ? e.addClass("left-min").removeClass("left-normal") : e.addClass("left-normal").removeClass("left-min"), this.state.right.isLarge ? e.addClass("right-enlarge").removeClass("right-normal") : e.addClass("right-normal").removeClass("right-enlarge")
        },
        hasBasketball: function (e) {
            if (_.isArray(e))
                for (var t = 0; t < e.length; t++)
                    if (2 == e[t].k) return !0;
            return !1
        },
        dispatch: function () {
            Action.uiChange(_.clone(this.state, !0))
        },
        SITEREFRESH: function (e) {
            o.param.IsFirstLoad && (this.state.center.is1stHalfOn = null, this.state.center.isBasketball = this.hasBasketball(_.isUndefined(e.mod) ? null : e.mod.d), this.state.pv = e.mpc.pv, this.state.isInplay = e.selobj.ip, this.state.uiBetType = o.param.UIBetType, this.update(), this.dispatch())
        }
    },
    public: {
        LEFTPANEL_COLLAPSE: function (e) {
            this.state.left.minimized != e && (this.state.left.minimized = e, this.state.indicator = this.props.INDICATOR.LEFT, this.update(), this.dispatch())
        },
        RPRESIZE: function (e) {
            this.state.right.isLarge != e && (this.state.right.isLarge = e, this.state.indicator = this.props.INDICATOR.RIGHT, this.update(), this.dispatch())
        },
        MPRESIZE: function (e) {
            this.state.center.is1stHalfOn != e && (this.state.center.is1stHalfOn = e, this.state.indicator = this.props.INDICATOR.CENTER, this.update(), this.dispatch())
        }
    }
}), ReactModule.publicToModule(UI, "ui");
var FSB_Store = function () {
        var e = {
                isDisplay: !1,
                content: null
            },
            t = "FSB_Update",
            i = dispatcher.register(function (t) {
                switch (t.type) {
                    case CONSTANTS.FULLSCREENBLOCK.SHOW:
                        e.isDisplay = !0, e.content = t.content, a();
                        break;
                    case CONSTANTS.FULLSCREENBLOCK.HIDE:
                        e.isDisplay = !1, e.content = null, a()
                }
            }),
            a = function () {
                s.trigger("FSB_Update")
            },
            s = $({});
        return {
            DispatchToken: i,
            addUpdateListener: function (e, i) {
                var a = i ? t + "." + i : t;
                s.on(a, e)
            },
            removeUpdateListener: function (e) {
                var i = e ? t + "." + e : t;
                s.off(i)
            },
            getData: function () {
                return e
            }
        }
    }(),
    PopUp_Store = function () {
        var e = {
                isDisplay: !1,
                isAddedMsg: !1,
                popupType: null
            },
            t = {
                MYEVENTS: "MYEVENTS",
                MYMARKETS: "MYMARKETS"
            },
            i = "POPUP_Update",
            a = dispatcher.register(function (t) {
                switch (t.type) {
                    case CONSTANTS.POPUP.SHOW:
                        e.isDisplay = !0, e.isAddedMsg = t.isAddedMsg, e.popupType = t.popupType, s();
                        break;
                    case CONSTANTS.POPUP.HIDE:
                        e.isDisplay = !1, s()
                }
            }),
            s = function (e) {
                n.trigger("POPUP_Update")
            },
            n = $({});
        return {
            DispatchToken: a,
            addUpdateListener: function (e, t) {
                var a = t ? i + "." + t : i;
                n.on(a, e)
            },
            removeUpdateListener: function (e) {
                var t = e ? i + "." + e : i;
                n.off(t)
            },
            getData: function () {
                return e
            },
            popUpType: function () {
                return t
            }
        }
    }();
CONSTANTS.NOTIFYPOPUP = {
    NEXTSTEP: "NP_NEXTSTEP",
    PREVIOUSSTEP: "NP_PREVIOUSSTEP",
    FINISHSTEP: "NP_FINISHSTEP",
    INITSCROLLBAR: "NP_INITSCROLLBAR"
}, Action.NotifyPopUp = {
    NextStep: function (e) {
        dispatcher.dispatch({
            type: CONSTANTS.NOTIFYPOPUP.NEXTSTEP,
            data: e
        })
    },
    PreviousStep: function (e) {
        dispatcher.dispatch({
            type: CONSTANTS.NOTIFYPOPUP.PREVIOUSSTEP,
            data: e
        })
    },
    FinishStep: function () {
        dispatcher.dispatch({
            type: CONSTANTS.NOTIFYPOPUP.FINISHSTEP
        })
    },
    InitScrollBar: function () {
        dispatcher.dispatch({
            type: CONSTANTS.NOTIFYPOPUP.INITSCROLLBAR
        })
    }
};
var NotifyPopUp_Store = function () {
        var e = {
                PreView: [{
                    color: "blue",
                    size: "low",
                    content: "NP_CD_PRE_S1",
                    btn: l.NP_Next
                }, {
                    color: "orange",
                    size: "",
                    content: "NP_CD_PRE_S2",
                    btn: l.NP_Next
                }, {
                    color: "t_green",
                    size: "",
                    content: "NP_CD_PRE_S3",
                    btn: l.NP_Next
                }, {
                    color: "red",
                    size: "",
                    content: "NP_CD_PRE_S4",
                    btn: l.NP_Next
                }, {
                    color: "green",
                    size: "low",
                    content: "NP_CD_PRE_S5",
                    btn: l.NP_OK
                }],
                Formal: [{
                    color: "blue",
                    size: "low",
                    content: "NP_CD_POST_S1",
                    btn: l.NP_Next
                }, {
                    color: "orange",
                    size: "",
                    content: "NP_CD_POST_S2",
                    btn: l.NP_Next
                }, {
                    color: "t_green",
                    size: "",
                    content: "NP_CD_POST_S3",
                    btn: l.NP_Next
                }, {
                    color: "red",
                    size: "",
                    content: "NP_CD_POST_S4",
                    btn: l.NP_Next
                }, {
                    color: "green",
                    size: "low",
                    content: "NP_CD_POST_S5",
                    btn: l.NP_OK
                }]
            },
            t = {
                isDisplay: !1,
                slide: [],
                current: {
                    color: "blue",
                    size: "low"
                }
            },
            i = "NotifyPOPUP_Update",
            a = dispatcher.register(function (i) {
                switch (i.type) {
                    case CONSTANTS.SITEREFRESH:
                        var a = i.data.uvd;
                        NotifyPopUp_Store.checkDisplay(a.login), t.slide = e[notiType], s();
                        break;
                    case CONSTANTS.NOTIFYPOPUP.NEXTSTEP:
                        o = (o = _.findIndex(t.slide, "color", i.data) + 1) >= t.slide.length ? t.slide.length - 1 : o;
                        var n = t.slide[o];
                        t.current = {
                            color: n.color,
                            size: n.size
                        }, s();
                        break;
                    case CONSTANTS.NOTIFYPOPUP.PREVIOUSSTEP:
                        var o;
                        o = (o = _.findIndex(t.slide, "color", i.data) - 1) <= 0 ? 0 : o;
                        var r = t.slide[o];
                        t.current = {
                            color: r.color,
                            size: r.size
                        }, s();
                        break;
                    case CONSTANTS.NOTIFYPOPUP.FINISHSTEP:
                        utility.cookie.write("Notify_" + notiType, !0), t.isDisplay = !1, window.GLOBAL && (window.GLOBAL.state.fadeout = t.isDisplay, $("body").removeClass("ofw-hidden height-100p pos-fixed")), s();
                        break;
                    case CONSTANTS.NOTIFYPOPUP.INITSCROLLBAR:
                        var l = $(".pagecontainer");
                        NotifyPopUp_Store.changeHeight(l), l.length > 0 && _.forEach(l, function (e) {
                            $(e).jScrollPane && ($(e).jScrollPane({
                                showArrows: !1,
                                hideFocus: !0,
                                verticalGutter: 0,
                                horizontalGutter: 0
                            }), $(e).data("jsp").reinitialise())
                        });
                        break;
                    case CONSTANTS.RESIZE:
                        l = $(".pagecontainer");
                        NotifyPopUp_Store.changeHeight(l), window.GLOBAL && (window.GLOBAL.state.fadeout = t.isDisplay, $("body")[t.isDisplay ? "addClass" : "removeClass"]("ofw-hidden height-100p pos-fixed"))
                }
            }),
            s = function (e) {
                n.trigger("NotifyPOPUP_Update")
            },
            n = $({});
        return {
            DispatchToken: a,
            addUpdateListener: function (e, t) {
                var a = t ? i + "." + t : i;
                n.on(a, e)
            },
            removeUpdateListener: function (e) {
                var t = e ? i + "." + e : i;
                n.off(t)
            },
            getData: function () {
                return t
            },
            changeHeight: function (e) {
                setTimeout(function () {
                    var t = document.documentElement.clientHeight <= 420 ? document.documentElement.clientHeight : 420;
                    e.height(t).parent().height(t)
                }, 550)
            },
            checkDisplay: function (e) {
                if (e) {
                    var i = utility.cookie.read("Notify_" + notiType);
                    t.isDisplay = !i || "true" != i.toString()
                } else t.isDisplay = !1;
                return ("None" == notiType || /showNotify\=\-1/gi.test(location.search)) && (t.isDisplay = !1), t.isDisplay
            }
        }
    }(),
    BS = {
        service: {
            betSlipService: "BetSlipService",
            placeBetService: "PlaceBetNew",
            getSelectionService: "GetBySelectionId",
            getRetainService: "GetRetainSelectionId",
            getRemainService: "GetRemainSelectionId",
            getSummaryService: "GetSummary",
            updateAcceptBetterOddsService: "UpdateAcceptBetterOdds",
            updateShowBetConfirmationService: "UpdateShowBetConfirmation"
        },
        MODE: "DEFAULT",
        GROUP: "#,###.00",
        expireDays: {
            expires: 0,
            path: "/"
        },
        strSelList: "",
        strEventList: "",
        strOddsList: "",
        strHdpList: "",
        strScoreList: "",
        strAmtList: "",
        strInplayList: "",
        strParlayList: "",
        strClosedList: "",
        strParentEventList: "",
        SEPARATOR: "_",
        selListCookies: "BetSlip@strSelList",
        eventListCookies: "BetSlip@strEventList",
        amtListCookies: "BetSlip@strAmtList",
        inplayListCookies: "BetSlip@strInplayList",
        cbStakeCookies: "BetSlip@strCBStakeList",
        oddsListCookies: "BetSlip@strOddsList",
        hdpListCookies: "BetSlip@strHdpList",
        scoreListCookies: "BetSlip@strScoreList",
        parlayListCookies: "BetSlip@strParlayList",
        expandCBCookies: "BetSlip@expandCombo",
        EnableRetainCookie: "BetSlip@eRetain",
        parentEventListCookie: "BetSlip@strParentEventList",
        eachWayListCookies: "BetSlip@strEachWayList",
        cbEachWayListCookies: "BetSlip@strCBEachWayList",
        bsCookiesValues: [],
        refreshId: null,
        isPopUp: !1,
        source: 1,
        processing: !1,
        _eventInstance: $({}),
        Events: {
            ExceedMaxiumSelections: "BSExceedMaxiumSelections",
            RemoveHighlightOdds: "BSRemoveHighlightOdds",
            HighlightOdds: "BSHighlightOdds",
            UpdateBetslip: "BSUpdateBetslip",
            UpdateSummary: "BSUpdateSummary",
            Processing: "BSProcessing",
            Completed: "BSCompleted",
            ToggleAcceptBetterOdds: "BSToggleAcceptBetterOdds",
            ToggleShowBetConfirmation: "BSToggleShowBetConfirmation",
            ShowBetConfirm: "BSShowBetConfirm",
            RefreshBalance: "BSRefreshBalance",
            DisplayMessage: "BSDisplayMessage"
        },
        fire: function (e, t) {
            BS._eventInstance.trigger(e, t)
        },
        on: function (e, t, i) {
            if (e && "" != e) {
                var a = t ? e + "." + t : e;
                BS._eventInstance.on(a, i)
            }
        }
    };
BS.bsCookie = {
    saveCookieValues: function (e, t, i) {
        if (null == BS.bsCookiesValues || 0 == BS.bsCookiesValues.length) {
            var a = utility.cookie.read("BS@Cookies");
            null != a && (BS.bsCookiesValues = a.split("#")), (null == BS.bsCookiesValues || BS.bsCookiesValues.length < 14) && (BS.bsCookiesValues = ["", "", "", "", "", "", "", "", "", "true", "", "", "", ""])
        }
        if (14 == BS.bsCookiesValues.length) {
            switch (e) {
                case "BetSlip@strSelList":
                    BS.bsCookiesValues[0] = t;
                    break;
                case "BetSlip@strEventList":
                    BS.bsCookiesValues[1] = t;
                    break;
                case "BetSlip@strAmtList":
                    BS.bsCookiesValues[2] = t;
                    break;
                case "BetSlip@strInplayList":
                    BS.bsCookiesValues[3] = t;
                    break;
                case "BetSlip@strCBStakeList":
                    BS.bsCookiesValues[4] = t;
                    break;
                case "BetSlip@strOddsList":
                    BS.bsCookiesValues[5] = t;
                    break;
                case "BetSlip@strHdpList":
                    BS.bsCookiesValues[6] = t;
                    break;
                case "BetSlip@strScoreList":
                    BS.bsCookiesValues[7] = t;
                    break;
                case "BetSlip@strParlayList":
                    BS.bsCookiesValues[8] = t;
                    break;
                case "BetSlip@expandCombo":
                    BS.bsCookiesValues[9] = t;
                    break;
                case "BetSlip@eRetain":
                    BS.bsCookiesValues[10] = t;
                    break;
                case "BetSlip@strParentEventList":
                    BS.bsCookiesValues[11] = t;
                    break;
                case "BetSlip@strEachWayList":
                    BS.bsCookiesValues[12] = t;
                    break;
                case "BetSlip@strCBEachWayList":
                    BS.bsCookiesValues[13] = t
            }
            return i && BS.bsCookie.saveSelectionsToCookie(), !0
        }
        return !1
    },
    saveSelectionsToCookie: function () {
        BS.bsCookiesValues && $.isArray(BS.bsCookiesValues) && 14 == BS.bsCookiesValues.length ? utility.cookie.write("BS@Cookies", BS.bsCookiesValues.join("#"), BS.expireDays) : utility.cookie.write("BS@Cookies", "", BS.expireDays)
    },
    clearBSCookies: function () {
        utility.cookie.write("BS@Cookies", "", BS.expireDays), BS.bsCookiesValues = ["", "", "", "", "", "", "", "", "", "true", "", "", "", ""]
    },
    getCookieValue: function (e) {
        if (null == BS.bsCookiesValues || 0 == BS.bsCookiesValues.length) {
            var t = utility.cookie.read("BS@Cookies");
            null != t && (BS.bsCookiesValues = t.split("#")), (null == BS.bsCookiesValues || BS.bsCookiesValues.length < 14) && (BS.bsCookiesValues = ["", "", "", "", "", "", "", "", "", "true", "", "", "", ""])
        }
        if (14 == BS.bsCookiesValues.length) switch (e) {
            case "BetSlip@strSelList":
                return BS.bsCookiesValues[0];
            case "BetSlip@strEventList":
                return BS.bsCookiesValues[1];
            case "BetSlip@strAmtList":
                return BS.bsCookiesValues[2];
            case "BetSlip@strInplayList":
                return BS.bsCookiesValues[3];
            case "BetSlip@strCBStakeList":
                return BS.bsCookiesValues[4];
            case "BetSlip@strOddsList":
                return BS.bsCookiesValues[5];
            case "BetSlip@strHdpList":
                return BS.bsCookiesValues[6];
            case "BetSlip@strScoreList":
                return BS.bsCookiesValues[7];
            case "BetSlip@strParlayList":
                return BS.bsCookiesValues[8];
            case "BetSlip@expandCombo":
                return BS.bsCookiesValues[9];
            case "BetSlip@eRetain":
                return BS.bsCookiesValues[10];
            case "BetSlip@strParentEventList":
                return BS.bsCookiesValues[11];
            case "BetSlip@strEachWayList":
                return BS.bsCookiesValues[12];
            case "BetSlip@strCBEachWayList":
                return BS.bsCookiesValues[13]
        }
        return ""
    },
    loadCookieValues: function () {
        BS.bsCookie.getCookieValue("")
    }
}, BS.Utility = {
    Replace: function (e) {
        return "" == e ? 0 : ("string" != typeof e && (e = "" + e), e = e.replace(/[^a-zA-Z 0-9.]+/g, ""), parseFloat(e))
    },
    AddCommas: function (e) {
        x = (e += "").split("."), x1 = "" != x[0] ? BS.Utility.Replace(x[0]).toString() : "", x2 = x.length > 1 ? "." + x[1] : "";
        for (var t = /(\d+)(\d{3})/; t.test(x1);) x1 = x1.replace(t, "$1,$2");
        return x1 + x2
    },
    Combination: function (e, t) {
        return BS.Utility.Factorial(e) / (BS.Utility.Factorial(t) * BS.Utility.Factorial(e - t))
    },
    Factorial: function (e) {
        for (var t = 1, i = 2; i < e + 1; i++) t *= i;
        return t
    },
    FullCoverWager: function (e) {
        switch (e) {
            case 3:
                return 11;
            case 4:
                return 12;
            case 5:
                return 13;
            case 6:
                return 14;
            case 7:
                return 15;
            case 8:
                return 16;
            case 9:
                return 17;
            case 10:
                return 18
        }
        return null
    },
    IgnoreInput: function (e) {
        var t = BS.Utility.GetKeyCode(e);
        return t >= KEY_A && t <= KEY_Z || t == ($.ui ? $.ui.keyCode.TAB : 9) || t == ($.ui ? $.ui.keyCode.SHIFT : 16) || 13 == t
    },
    GetKeyCode: function (e) {
        return e.keyCode ? e.keyCode : e.which
    },
    FormatPrice: function (e) {
        var t = $("<div>" + e + "</div>");
        return t.format({
            format: BS.GROUP,
            locale: "us"
        }), t.text()
    },
    Truncate: function (e, t) {
        return e.length > t && $.browser.mozilla ? e.substring(0, t - 3) + "..." : e
    }
}, BS.getBetSlipdata = function () {
    return BS_Store.getData()
}, BS.PopulateParams = function (e, t, i) {
    BS.strSelList = "", BS.strEventList = "", BS.strOddsList = "", BS.strHdpList = "", BS.strScoreList = "", BS.strAmtList = "", BS.strInplayList = "", BS.strParlayList = "", BS.strClosedList = "", BS.strParentEventList = "", BS.strEachWayList = "";
    try {
        if (null != e.s[0])
            if (t || 1 == e.k && (e.s = $.grep(e.s, function (e) {
                    return 9999 != e.rsl && 8888 != e.rsl
                })), i)
                for (var a = 0; a < e.s.length; a++) {
                    var s = (o = e.s[a]).st,
                        n = !isNaN(s) && s > 0 ? s : 0;
                    o.ispl || (BS.strSelList += o.sid + BS.SEPARATOR, BS.strEventList += o.eid + BS.SEPARATOR, BS.strOddsList += o.o + BS.SEPARATOR, BS.strHdpList += o.hd + BS.SEPARATOR, BS.strScoreList += o.hs + ":" + o.as + BS.SEPARATOR, BS.strAmtList += n + BS.SEPARATOR, BS.strInplayList += o.ip + BS.SEPARATOR, BS.strParlayList += o.ap + BS.SEPARATOR, BS.strClosedList += o.rsl + BS.SEPARATOR, BS.strParentEventList += o.peid + BS.SEPARATOR, BS.strEachWayList += o.isew.toString() + BS.SEPARATOR)
                } else
                    for (a = 0; a < e.s.length; a++) {
                        var o;
                        (o = e.s[a]).ispl || (BS.strSelList += o.sid + BS.SEPARATOR, BS.strEventList += o.eid + BS.SEPARATOR, BS.strOddsList += o.o + BS.SEPARATOR, BS.strHdpList += o.hd + BS.SEPARATOR, BS.strScoreList += o.hs + ":" + o.as + BS.SEPARATOR, BS.strAmtList += o.st + BS.SEPARATOR, BS.strInplayList += o.ip + BS.SEPARATOR, BS.strParlayList += o.ap + BS.SEPARATOR, BS.strClosedList += o.rsl + BS.SEPARATOR, BS.strParentEventList += o.peid + BS.SEPARATOR, BS.strEachWayList += o.isew.toString() + BS.SEPARATOR)
                    }
    } catch (e) {
        console.log(e)
    }
    BS.strSelList = BS.strSelList.slice(0, -1), BS.strEventList = BS.strEventList.slice(0, -1), BS.strOddsList = BS.strOddsList.slice(0, -1), BS.strHdpList = BS.strHdpList.slice(0, -1), BS.strScoreList = BS.strScoreList.slice(0, -1), BS.strAmtList = BS.strAmtList.slice(0, -1), BS.strInplayList = BS.strInplayList.slice(0, -1), BS.strParlayList = BS.strParlayList.slice(0, -1), BS.strClosedList = BS.strClosedList.slice(0, -1), BS.strParentEventList = BS.strParentEventList.slice(0, -1), BS.strEachWayList = BS.strEachWayList.slice(0, -1), BS.bsCookie.saveCookieValues(BS.selListCookies, BS.strSelList), BS.bsCookie.saveCookieValues(BS.eventListCookies, BS.strEventList), BS.bsCookie.saveCookieValues(BS.amtListCookies, BS.strAmtList), BS.bsCookie.saveCookieValues(BS.inplayListCookies, BS.strInplayList), BS.bsCookie.saveCookieValues(BS.parlayListCookies, BS.strParlayList), BS.bsCookie.saveCookieValues(BS.parentEventListCookie, BS.strParentEventList), BS.bsCookie.saveCookieValues(BS.eachWayListCookies, BS.strEachWayList), BS.bsCookie.saveSelectionsToCookie()
}, BS.PopulateComboData = function (e, t) {
    var i = BS.GenerateComboBet(BS.CountCombination(e, BS.strEventList, BS.strInplayList, BS.strParlayList, BS.strClosedList, BS.strParentEventList));
    if (null != e.cinfo[0] && (e.c = new Array, null != i && "" != i)) {
        var a, s = i.split(BS.SEPARATOR);
        if (e.cno = s.length, null != (a = BS.bsCookie.getCookieValue(BS.cbStakeCookies)))(a = a.split(BS.SEPARATOR)).length != s.length && (a = null);
        var n = BS.bsCookie.getCookieValue(BS.cbEachWayListCookies);
        null != n && (n = n.split(BS.SEPARATOR)).length != s.length && (n = null);
        for (var o = 0; o < s.length; o++) {
            var r = s[o].split("@");
            if (s.length > 0)
                for (var l = 0; l < e.cinfo.length; l++) {
                    var c = e.cinfo[l];
                    if (c.wid == r[0]) {
                        e.c[o] = {
                            wid: parseFloat(r[0]),
                            bc: parseFloat(r[1]),
                            cba: null == a || t ? 0 : BS.Utility.Replace(a[o]),
                            cbn: c.cbn,
                            cbs: {
                                bmax: c.cbs.bmax,
                                dm: c.cbs.dm,
                                bpay: c.cbs.bpay,
                                bmin: c.cbs.bmin
                            },
                            isew: null != n && !t && "true" == n[o]
                        };
                        break
                    }
                }
        }
    }
}, BS.GenerateComboBet = function (e) {
    var t = 0,
        i = "";
    if (BS.strEventList = BS.bsCookie.getCookieValue(BS.eventListCookies), null == BS.strEventList) return null;
    var a = BS.strEventList.split(BS.SEPARATOR),
        s = a.length;
    if (a.length > 1 && s > 1 && (i += "1@" + s), e > 0) {
        for (var n = 1; n <= e; n++) t += BS.Utility.Combination(e, n), n > 1 && (i += BS.SEPARATOR + n + "@" + BS.Utility.Combination(e, n));
        e > 2 && (i += BS.SEPARATOR + BS.Utility.FullCoverWager(e) + "@" + (t - e))
    }
    return i
}, BS.CountCombination = function (e, t, i, a, s, n) {
    var o, r, l = t.split(BS.SEPARATOR),
        c = i.split(BS.SEPARATOR),
        d = a.split(BS.SEPARATOR),
        p = s.split(BS.SEPARATOR),
        u = n.split(BS.SEPARATOR),
        h = new Array,
        f = new Array;
    if (index = 0, e.iscom = !0, 1 == l.length) return 0;
    for (var m = 0, g = l.length; m < g; m++)
        if ("true" != c[m] && "false" != d[m] && "8888" != p[m]) {
            for (var v = 0; v < h.length; v++) h[v] != l[m] && h[v] != u[m] || (f[index++] = u[m], e.iscom = !1);
            h[h.length] = u[m], o = f.unique().length, r = h.unique().length
        } else e.iscom = !1;
    return e.canNotParlay = f.unique(), r - o
}, BS.verifyEventId = function (e, t) {
    var i = BS.getBetSlipdata();
    if (null != i.s[0]) {
        for (var a = 0; a < i.s.length; a++) {
            var s = i.s[a];
            if (s.sid == e && s.eid == t) return "UPDATE"
        }
        if (i.s.length > 9) return "STOP"
    }
    return "ADD"
}, BS.AddSelection = function (e, t, i, a, s, n, o, r) {
    if ("PROCESSED" == BS.MODE || "PROCESSING" == BS.MODE || null == e || isNaN(e) || null == t || isNaN(t) || null == i || isNaN(BS.Utility.Replace(i))) "PROCESSED" == BS.MODE || "PROCESSING" == BS.MODE ? (BS.MODE, _.includes(u, e) || BS.fire(BS.Events.RemoveHighlightOdds, [
        ["" + e]
    ])) : BS.fire(BS.Events.DisplayMessage, [l.BS_ParameterInvalid, l.BS_SelectionInvalid]);
    else {
        "SUMMARY" == BS.MODE && (BS.EmptyBetSlip(), BS.MODE = "PLACEBET");
        var c = BS.verifyEventId(e, t);
        if (/UPDATE/i.test(c)) BS.RemoveSelection(e);
        else if (/ADD/i.test(c)) {
            BS.MODE = "PROCESSING";
            var d = BS.getBetSlipdata();
            BS.PopulateParams(d, !1, !0);
            var p = r ? "true" : "false";
            null != d.s[0] ? (BS.strSelList = e + BS.SEPARATOR + BS.strSelList, BS.strEventList = t + BS.SEPARATOR + BS.strEventList, BS.strOddsList = i + BS.SEPARATOR + BS.strOddsList, BS.strHdpList = a + BS.SEPARATOR + BS.strHdpList, BS.strScoreList = s + BS.SEPARATOR + BS.strScoreList, BS.strAmtList = "0" + BS.SEPARATOR + BS.strAmtList, BS.strInplayList = n + BS.SEPARATOR + BS.strInplayList, BS.strParentEventList = o + BS.SEPARATOR + BS.strParentEventList, BS.strEachWayList = p + BS.SEPARATOR + BS.strEachWayList) : (!0, BS.strSelList += e, BS.strEventList += t, BS.strOddsList += i, BS.strHdpList += a, BS.strScoreList += s, BS.strAmtList += "0", BS.strInplayList += n, BS.strParentEventList += o, BS.strEachWayList += p.toString()), utility.service(BS.service.betSlipService, BS.service.getSelectionService, {
                SelList: BS.strSelList,
                EventList: BS.strEventList,
                OddsList: BS.strOddsList,
                HdpList: BS.strHdpList,
                ScoreList: BS.strScoreList,
                SStakeList: BS.strAmtList,
                InplayList: BS.strInplayList,
                ParentEventList: BS.strParentEventList,
                EachWayList: BS.strEachWayList
            }, "GET", function (e) {
                BS.WriteExpandCBCookies(!0), BS.PopulateParams(e, !1, !1), BS.PopulateComboData(e), BS.UpdateBetSlip(e)
            }, function () {
                null != betSlipJson.s[0] ? BS.MODE = "PLACEBET" : BS.MODE = "DEFAULT"
            })
        } else {
            var u = BS.strSelList.split(BS.SEPARATOR);
            _.includes(u, e) || BS.fire(BS.Events.RemoveHighlightOdds, [
                ["" + e]
            ]), BS.fire(BS.Events.ExceedMaxiumSelections)
        }
    }
}, BS.RemoveSelection = function (e) {
    if ("PROCESSING" != BS.MODE && "PROCESSED" != BS.MODE) {
        var t = BS.getBetSlipdata(),
            i = t.s;
        t.s = jQuery.grep(t.s, function (t) {
            return t.sid != e
        }), null != t.s[0] ? (BS.fire(BS.Events.Processing), BS.PopulateParams(t, !1, !0), utility.service(BS.service.betSlipService, BS.service.getSelectionService, {
            SelList: BS.strSelList,
            EventList: BS.strEventList,
            OddsList: BS.strOddsList,
            HdpList: BS.strHdpList,
            ScoreList: BS.strScoreList,
            SStakeList: BS.strAmtList,
            InplayList: BS.strInplayList,
            ParentEventList: BS.strParentEventList
        }, "GET", function (t) {
            BS.PopulateParams(t, !1, !1), BS.PopulateComboData(t), BS.UpdateBetSlip(t), BS.fire(BS.Events.RemoveHighlightOdds, [
                ["" + e]
            ]), BS.fire(BS.Events.Completed)
        }, function () {
            t.s = i, BS.PopulateParams(t, !1, !1), BS.fire(BS.Events.Completed)
        })) : BS.EmptyBetSlip()
    }
}, BS.EmptyBetSlip = function () {
    if ("PROCESSING" != BS.MODE && "PROCESSED" != BS.MODE) {
        BS.MODE = "DEFAULT", "" != BS.strSelList && BS.fire(BS.Events.RemoveHighlightOdds, [BS.strSelList.split(BS.SEPARATOR)]), BS.bsCookie.clearBSCookies(), BS.strSelList = "", null != BS.refreshId && BS.StopAutoRefresh();
        var e = {
            s: [],
            c: [],
            cinfo: [],
            islog: uv.login
        };
        BS.fire(BS.Events.UpdateBetslip, [e, !1])
    }
}, BS.VerifyBetSlip = function (e) {
    if (0 == e.islog) return !1;
    for (var t = !0, i = !0, a = 0, s = 0; s < e.s.length; s++) {
        var n = e.s[s],
            o = n.st,
            r = n.o,
            c = n.isew ? n.bsew.bmin : n.bs.bmin;
        n.serr = null, 0 == r && (n.serr = "BS_OddsUpdating", a++), "" != BS.Utility.Replace(o) && BS.Utility.Replace(o) < c && (n.serr = "BS_NotExceedMinBet", n.errMsg = l.BS_Minimum_Bet + " " + BS.Utility.AddCommas(c) + " " + e.cc, n.st = c, t = !1)
    }
    if (e.totalStake <= 0 && a < e.s.length) return e.info = l.BS_Stake_Amount, !1;
    if (a == e.s.length.length) return !1;
    for (s = 0; s < e.c.length; s++) {
        var d = e.c[s],
            p = (o = d.cba, d.cbs.bmin);
        "" != BS.Utility.Replace(o) && BS.Utility.Replace(o) < p && (d.cba = p, i = !1)
    }
    return t && i ? (e.info = null, !0) : (t || null == e.c[0] || (e.c[0].cba = ""), !1)
}, BS.ProcessBet = function (e) {
    if (BS.processing) console.warn("processing bet blocked");
    else {
        BS.processing = !0, BS.fire(BS.Events.Processing), BS.bsCookie.clearBSCookies();
        var t = "";
        if (null != e.c[0]) {
            for (var i = 0; i < e.c.length; i++) {
                var a = e.c[i],
                    s = BS.Utility.Replace(a.cba);
                (isNaN(s) || s <= 0) && (s = 0);
                var n = null == a.co ? "" : a.co,
                    o = parseFloat(s * n - s * a.bc);
                t += a.cbn + "@" + a.bc + "@" + s + "@" + o + "@" + a.wid + "@" + a.isew + BS.SEPARATOR
            }
            t = t.slice(0, -1)
        }
        for (var r = "", c = 0; c < e.s.length; c++) {
            var d = e.s[c];
            s = BS.Utility.Replace(d.st);
            (isNaN(s) || s <= 0) && "" == t || (r += d.sid + "@" + d.o + "@" + d.hd + "@" + d.hs + ":" + d.as + "@" + (!isNaN(s) && s > 0 ? d.st : 0) + "@" + d.ip + "@" + d.eo + "@" + d.eid + "@" + d.ap + "@" + d.peid + "@" + d.isew + BS.SEPARATOR)
        }
        r = r.slice(0, -1), BS.MODE = "PROCESSED", utility.service(BS.service.betSlipService, BS.service.placeBetService, {
            SingleList: r,
            ComboList: t,
            LatestSubmitted: e.dt,
            NoOfCombine: e.s.length,
            source: BS.source
        }, "POST", function (e) {
            if (BS.processing = !1, -1 === e.berr) return BS.fire(BS.Events.Completed), BS.MODE = "SUMMARY", void console.log("ptc");
            if (1 == e.ko) return BS.fire(BS.Events.DisplayMessage, [l.BS_SessionInvalid, l.BS_SessionInvalid, !0]), void(BS.MODE = "DEFAULT");
            if (6666 == e.berr || 7777 == e.berr || 8888 == e.berr) BS.PopulateParams(e, !0, !1), BS.PopulateComboData(e), BS.UpdateBetSlip(e, !1, !0);
            else if (5555 == e.berr) BS.PopulateParams(e, !0, !1), BS.PopulateComboData(e), BS.UpdateBetSlip(e, !1, !1);
            else if (-2 == e.berr) pm.showParentAlert("", l.BS_PIdLost);
            else {
                var t = e.s.map(function (e) {
                    return e.sid + ""
                });
                BS.fire(BS.Events.RemoveHighlightOdds, [t]), BS.UpdateSummary(e), BS.fire(BS.Events.RefreshBalance)
            }
        }, function () {
            BS.MODE = "DEFAULT", BS.processing = !1, console.log("Failed to access placeBetService"), BS.fire(BS.Events.Completed)
        })
    }
}, BS.UpdateBetSlip = function (e, t, i) {
    BS.ModifyDisplayInformation(e), null != e.info && (e.info = l[e.info]), BS.WriteOddsHDPScoreCookies(e), null != e.s[0] ? (BS.MODE = "PLACEBET", BS.StarAutoRefresh()) : (BS.MODE = "DEFAULT", BS.StopAutoRefresh()), "" != BS.strSelList && BS.fire(BS.Events.HighlightOdds, [BS.strSelList.split(BS.SEPARATOR)]), BS.fire(BS.Events.UpdateBetslip, [e, t, i])
}, BS.UpdateSummary = function (e) {
    BS.MODE = "SUMMARY", BS.ModifyDisplayInformation(e), BS.fire(BS.Events.UpdateSummary, [e]), BS.bsCookie.saveCookieValues(BS.EnableRetainCookie, "1", !0)
}, BS.RemainBetSlip = function (e) {
    if (BS.strSelList = BS.bsCookie.getCookieValue(BS.selListCookies), null != BS.strSelList && "" != BS.strSelList) try {
        BS.strEventList = BS.bsCookie.getCookieValue(BS.eventListCookies), BS.strOddsList = BS.bsCookie.getCookieValue(BS.oddsListCookies), BS.strHdpList = BS.bsCookie.getCookieValue(BS.hdpListCookies), BS.strScoreList = BS.bsCookie.getCookieValue(BS.scoreListCookies), BS.strAmtList = BS.bsCookie.getCookieValue(BS.amtListCookies), BS.strCBStake = BS.bsCookie.getCookieValue(BS.cbStakeCookies), BS.strCheckedList = BS.bsCookie.getCookieValue(BS.checkedListCookies), BS.strInplayList = BS.bsCookie.getCookieValue(BS.inplayListCookies), BS.strParlayList = BS.bsCookie.getCookieValue(BS.parlayListCookies), BS.strParentEventList = BS.bsCookie.getCookieValue(BS.parentEventListCookie), BS.strEachWayList = BS.bsCookie.getCookieValue(BS.eachWayListCookies), BS.strCBEachWayList = BS.bsCookie.getCookieValue(BS.cbEachWayListCookies), utility.service(BS.service.betSlipService, BS.service.getRemainService, {
            SelList: BS.strSelList,
            EventList: BS.strEventList,
            OddsList: BS.strOddsList,
            HdpList: BS.strHdpList,
            ScoreList: BS.strScoreList,
            SStakeList: BS.strAmtList,
            CBStakeList: BS.strCBStake,
            InplayList: BS.strInplayList,
            IsUpdate: e,
            ParentEventList: BS.strParentEventList,
            EachWayList: BS.strEachWayList,
            CBEachWayList: BS.strCBEachWayList
        }, "GET", function (t) {
            BS.PopulateParams(t, !1, !1), BS.PopulateComboData(t), BS.UpdateBetSlip(t, e)
        }, function () {})
    } catch (e) {
        BS.EmptyBetSlip()
    }
}, BS.RetainSelection = function (e, t) {
    BS.fire(BS.Events.Processing), BS.PopulateParams(t, e, !1), "" == BS.strSelList && BS.EmptyBetSlip(), utility.service(BS.service.betSlipService, BS.service.getRetainService, {
        SelList: BS.strSelList,
        InplayList: BS.strInplayList,
        OddsList: BS.strOddsList,
        HdpList: BS.strHdpList,
        ScoreList: BS.strScoreList,
        EventList: BS.strEventList,
        ParentEventList: BS.strParentEventList,
        EachWayList: BS.strEachWayList,
        CBEachWayList: BS.strCBEachWayList
    }, "GET", function (e) {
        BS.PopulateParams(e, !1, !1), BS.PopulateComboData(e, !0), "" != BS.strSelList && BS.fire(BS.Events.HighlightOdds, [BS.strSelList.split(BS.SEPARATOR)]), MODE = "DEFAULT", BS.UpdateBetSlip(e)
    }, function () {
        BS.fire(BS.Events.Completed)
    })
}, BS.ModifyDisplayInformation = function (e) {
    if (null != e.s[0])
        for (var t = 0; t < e.s.length; t++) {
            var i = e.s[t];
            "BS_DailyBetLimitValue" == i.serr && (l.BS_DailyBetLimitValue = l.BS_DailyBetLimit.replace("XXX", BS.Utility.AddCommas(i.cv) + " " + e.cc)), i.serr && i.serr.indexOf("BS_SingleMinBetValue") >= 0 && (i.errMsg = l.BS_ExceededMinBet.replace("XXX", BS.Utility.AddCommas(i.bs.bmin) + " " + e.cc)), i.serr && i.serr.indexOf("BS_ExceededSingleEventMax") >= 0 && (i.errMsg = l.BS_ExceededSingleEventMax2.replace("XXX", BS.Utility.AddCommas(i.ara) + " " + e.cc)), "BS_FLScorer" == i.bn && (i.bn = l.BS_FLScorer), "BS_FLTeamTS" == i.bn && (i.bn = l.BS_FLTeamTS)
        }
    if (null != e.c[0])
        for (var a = 0; a < e.c.length; a++) {
            var s = e.c[a];
            "BS_DailyBetLimitValue" == s.cerr && (l.BS_DailyBetLimitValue = l.BS_DailyBetLimit.replace("XXX", BS.Utility.AddCommas(s.cv) + " " + e.cc)), "BS_ComboMinBetValue" == s.cerr && (l.BS_ComboMinBetValue = l.BS_LessThanComboMinBet.replace("XXX", BS.Utility.AddCommas(s.cbs.bmin) + " " + e.cc)), "BS_ExceededComboWinningAmount" == s.cerr && (l.BS_ExceededComboWinningAmount = l.BS_ExceededComboWinningAmount.replace("XXX", BS.Utility.AddCommas(s.dwa) + " " + e.cc))
        }
}, BS.WriteSStakeCookies = function (e) {
    BS.bsCookie.saveCookieValues(BS.amtListCookies, e, !0)
}, BS.WriteCBStakeCookies = function (e) {
    BS.bsCookie.saveCookieValues(BS.cbStakeCookies, e, !0)
}, BS.WriteExpandCBCookies = function (e) {
    BS.bsCookie.saveCookieValues(BS.expandCBCookies, e ? "true" : "false", !0)
}, BS.WriteOddsHDPScoreCookies = function (e) {
    var t = "",
        i = "",
        a = "";
    if (null != e.s[0]) {
        for (var s = 0; s < e.s.length; s++) {
            var n = e.s[s];
            t += n.o + BS.SEPARATOR, i += n.hd + BS.SEPARATOR, a += (null != n.hs ? n.hs : 0) + ":" + (null != n.as ? n.as : 0) + BS.SEPARATOR
        }
        t = t.slice(0, -1), i = i.slice(0, -1), a = a.slice(0, -1)
    }
    BS.bsCookie.saveCookieValues(BS.oddsListCookies, t), BS.bsCookie.saveCookieValues(BS.hdpListCookies, i), BS.bsCookie.saveCookieValues(BS.scoreListCookies, a, !0)
}, BS.WriteSEachWayCookies = function (e) {
    BS.bsCookie.saveCookieValues(BS.eachWayListCookies, e, !0)
}, BS.WriteCBEachWayCookies = function (e) {
    BS.bsCookie.saveCookieValues(BS.cbEachWayListCookies, e, !0)
}, BS.BetConfirmToPlaceBet = function () {
    BS.StarAutoRefresh()
}, BS.PlacebetToBetConfirm = function () {
    BS.StopAutoRefresh();
    var e = BS.getBetSlipdata();
    0 != e.s.length && (BS.VerifyBetSlip(e) ? BS.fire(BS.Events.ShowBetConfirm) : BS.fire(BS.Events.UpdateBetslip, [e, !1]))
}, BS.BetConfirmToBetReceipt = function () {
    var e = BS.getBetSlipdata();
    BS.VerifyBetSlip(e) ? BS.ProcessBet(e) : BS.fire(BS.Events.UpdateBetslip, [e, !1])
}, BS.PlacebetToBetReceipt = function () {
    BS.StopAutoRefresh();
    var e = BS.getBetSlipdata();
    0 != e.s.length && (BS.VerifyBetSlip(e) ? BS.ProcessBet(e) : BS.fire(BS.Events.UpdateBetslip, [e, !1]))
}, BS.BetReceiptToPlacebet = function () {
    BS.bsCookie.saveCookieValues(BS.EnableRetainCookie, "", !0);
    var e = BS.getBetSlipdata();
    BS_Store.isRetainSelection() ? BS.RetainSelection(!0, e) : 1 != e.k ? BS.EmptyBetSlip() : BS.RetainSelection(!1, e)
}, BS.GetSelectionIds = function () {
    var e = [],
        t = BS.bsCookie.getCookieValue(BS.selListCookies);
    return null != t && (e = t.split(BS.SEPARATOR)), e
}, BS.toggleRefreshTimer = function (e) {
    e && "PLACEBET" == BS.MODE ? BS.StarAutoRefresh() : BS.StopAutoRefresh()
}, BS.UpdateAcceptBetterOdds = function (e) {
    BS.fire(BS.Events.Processing), utility.service(BS.service.betSlipService, BS.service.updateAcceptBetterOddsService, {
        isAccept: e
    }, "POST", function (t) {
        BS.fire(BS.Events.ToggleAcceptBetterOdds, [e]), BS.fire(BS.Events.Completed)
    }, function () {
        BS.fire(BS.Events.Completed)
    })
}, BS.UpdateShowBetConfirmation = function (e) {
    BS.fire(BS.Events.Processing), utility.service(BS.service.betSlipService, BS.service.updateShowBetConfirmationService, {
        isShow: e
    }, "POST", function (t) {
        BS.fire(BS.Events.ToggleShowBetConfirmation, [e]), BS.fire(BS.Events.Completed)
    }, function () {
        BS.fire(BS.Events.Completed)
    })
}, BS.StarAutoRefresh = function () {
    null != BS.refreshId && Timer.remove(BS.refreshId), BS.refreshId = Timer.interval(30, function () {
        BS.RemainBetSlip(!0)
    })
}, BS.StopAutoRefresh = function () {
    null != BS.refreshId && Timer.remove(BS.refreshId), BS.refreshId = null
}, BS.xhr, BS.fetchDangerStatus = function (e, t) {
    BS.xhr && 4 != BS.xhr.readyState && BS.xhr.abort(), BS.xhr = $.ajax({
        type: "GET",
        url: location.protocol + "//" + fnspi + "/api/WagerStatus",
        data: {
            ids: e
        },
        timeout: 15e3,
        success: function (e) {
            switch (e.t && e.t.every(function (e) {
                return 0 !== e.ts
            }) && utility.cookie.write("dangerStatus", JSON.stringify(e)), t) {
                case "betreceipt":
                    Action.RightPanel.updateDangerStatus(e);
                    break;
                case "mybet":
                    Action.RightPanel.updateDangerStatus_mybet(e);
                    break;
                case "m_betreceipt":
                    Action.BetSlip.updateDangerStatus(e);
                    break;
                case "m_mybet":
                    Action.MyBet.updateDangerStatus(e)
            }
        },
        error: function (e, i) {
            var a = {
                t: [],
                f: !1,
                rc: 0
            };
            switch (t) {
                case "betreceipt":
                    Action.RightPanel.updateDangerStatus(a);
                    break;
                case "mybet":
                    Action.RightPanel.updateDangerStatus_mybet(a);
                    break;
                case "m_betreceipt":
                    Action.BetSlip.updateDangerStatus(a);
                    break;
                case "m_mybet":
                    Action.MyBet.updateDangerStatus(a)
            }
            console.log("WagerStatus:", i)
        },
        dataType: "json",
        contentType: "application/json; charset=utf-8"
    })
}, BS.Init = function () {
    "1" == BS.bsCookie.getCookieValue(BS.EnableRetainCookie) && utility.service(BS.service.betSlipService, BS.service.getSummaryService, null, "GET", function (e) {
        e.s && e.s.length > 0 ? BS.UpdateSummary(e) : BS.EmptyBetSlip()
    }), $(document).keydown(function (e) {
        if (13 == BS.Utility.GetKeyCode(e) && (null == BS_Store.showMyBet || !BS_Store.showMyBet())) {
            var t = BS_Store.currentMode(),
                i = BS_Store.modes;
            switch (t) {
                case i.PLACEBET:
                    BS_Store.showBetConfirmation() ? BS.PlacebetToBetConfirm() : BS.PlacebetToBetReceipt();
                    break;
                case i.BETCONFIRM:
                    BS.BetConfirmToBetReceipt();
                    break;
                case i.BETRECEIPT:
                    BS.isPopUp ? pm.resetBetSlip() : BS.BetReceiptToPlacebet()
            }
            e.preventDefault()
        }
    })
};
var opSetting = {
    CanDisplayScore: function (e) {
        var t = opScoreSetting.split(",");
        for (i = 0; i < t.length; i++)
            if (t[i] == e) return !0;
        return !1
    },
    IsOutRightSport: function (e) {
        var t = opORSports.split(",");
        for (i = 0; i < t.length; i++)
            if (opORSports[i] == e) return !0;
        return !1
    },
    GetHighlightIds: function () {
        return "SUMMARY" == BS.MODE ? [] : BS.GetSelectionIds()
    }
};
CONSTANTS.HOMEPAGE = {
    TOGGLESPORTSCONTENT: "TOGGLESPORTSCONTENT",
    HIGHLIGHTODDS: "HIGHLIGHTODDS",
    SETTOPBANNERHEIGHT: "SETTOPBANNERHEIGHT",
    REMOVEODDSJUMP: "REMOVEODDSJUMP"
};
var HP_Store = function () {
    var e = function () {
            var e = pm.parentHost();
            return "localhost" != document.domain && null != e && "" != e ? e + "/" + global.lan + "/sports/getbanner?id=sbk-center" : ""
        },
        t = {
            l: {
                m: null,
                s: [],
                hip: [],
                hnph: [],
                hnps: [],
                r: null
            },
            r: {}
        },
        i = "HP_Update",
        a = [3, 9, 20, 13],
        s = [2, 14],
        n = null,
        o = {
            isDisplay: !0,
            bannerURL: e(),
            isDisplayHL: !0,
            elapsed: 0,
            odds: {
                hlo: [],
                isEuroOdds: !0,
                oddsUp: [],
                oddsDown: []
            },
            isFirstLoad: !0,
            oddsType: uv.ov,
            topBannerH: 0,
            needScrollTop: !1,
            needUpdateOddsJump: !1
        },
        r = !1,
        l = dispatcher.register(function (e) {
            switch (e.type) {
                case CONSTANTS.SITEREFRESH:
                    null == e.data.mod || !e.data.mod.t || 3 != e.data.mod.t && 4 != e.data.mod.t ? (r = !1, o.isDisplayHL = !0, t.l.r = null, o.elapsed = null) : (o.needScrollTop = !r, r = !0, o.elapsed = 0, t.l = e.data.mod, _.forEach(t.l.hip, function (e) {
                        e.cds = opSetting.CanDisplayScore(e.k), e.isNetSports = _.includes(a, e.k), 21 == e.k && (e.rd = "HDP")
                    }), null != t.l.m && (t.l.m.ip && (t.l.m.cds = opSetting.CanDisplayScore(t.l.m.sid)), t.l.m.isNetSports = _.includes(a, t.l.m.sid)), _.forEach(t.l.s, function (e) {
                        e.ip ? e.cds = opSetting.CanDisplayScore(e.sid) : e.cds = !1, e.isNetSports = _.includes(a, e.sid)
                    }), t.r = _.cloneDeep(t.l.s), u(), Timer.interval(1, function () {
                        o.needScrollTop = !r, o.isFirstLoad = !1
                    }), 0 == t.l.hnps.length && (o.isDisplayHL = !0), o.isFirstLoad = param.oIsFirstLoad), c();
                    break;
                case CONSTANTS.HOMEPAGE.TOGGLESPORTSCONTENT:
                    o.isDisplayHL = e.isShowHL, c();
                    break;
                case CONSTANTS.HOMEPAGE.HIGHLIGHTODDS:
                    c();
                    break;
                case CONSTANTS.CENTERPANEL.REMOVEHIGHLIGHTODDS:
                    _.remove(o.odds.hlo, function (t) {
                        return _.includes(e.sids, t)
                    }), c();
                    break;
                case CONSTANTS.CENTERPANEL.HIGHLIGHTODDS:
                    o.odds.hlo = opSetting.GetHighlightIds(), c();
                    break;
                case CONSTANTS.HOMEPAGE.SETTOPBANNERHEIGHT:
                    o.topBannerH = e.h, c();
                    break;
                case CONSTANTS.HOMEPAGE.REMOVEODDSJUMP:
                    o.odds.oddsUp = [], o.odds.oddsDown = [], o.needUpdateOddsJump = !1, c()
            }
        }),
        c = function () {
            p(), d.trigger("HP_Update")
        },
        d = $({}),
        p = function () {
            o.isDisplay = 0 == mpc.pv, o.isDisplay && (o.odds.isEuroOdds = 1 === uv.ov, o.oddsType = uv.ov, o.bannerURL = e())
        },
        u = function () {
            n = null;
            var e, i, a, s = ["hip", "hnph", "hnps"];
            for (var o in t.l)
                if (-1 !== s.indexOf(o) && t.l[o] instanceof Array)
                    for (var r = 0; r < t.l[o].length; r++) i = (e = t.l[o][r]).k, a = e.v, n || (n = {}), n[i] = a
        };
    return {
        getData: function () {
            return t
        },
        DispatchToken: l,
        addUpdateListener: function (e, t) {
            var a = t ? i + "." + t : i;
            d.on(a, e)
        },
        removeUpdateListener: function (e) {
            var t = e ? i + "." + e : i;
            d.off(t)
        },
        initTimerString: function (e) {
            return e.indexOf(":") < 0 ? "" : e
        },
        getBannerUrl: function () {
            return "localhost" != document.domain && global.parentHost && "" != global.parentHost ? location.protocol + "//" + global.parentHost + "/" + global.lan + "/sports/getbanners?id=Adinfo" : ""
        },
        getVersion: function () {
            if (null == n) return 0;
            var e = [];
            return _.forEach(n, function (t, i) {
                e.push(i + ":" + t)
            }), e.join()
        },
        getExtraData: function () {
            return o
        },
        getNeedScoreBoardConditionSports: function () {
            return s
        }
    }
}();
Action.Homepage = {
    toggleSportsContent: function (e) {
        dispatcher.dispatch({
            type: CONSTANTS.HOMEPAGE.TOGGLESPORTSCONTENT,
            isShowHL: e
        })
    },
    highlightOdds: function (e) {
        dispatcher.dispatch({
            type: CONSTANTS.HOMEPAGE.HIGHLIGHTODDS,
            sid: e
        })
    },
    setTopBannerHeight: function (e) {
        dispatcher.dispatch({
            type: CONSTANTS.HOMEPAGE.SETTOPBANNERHEIGHT,
            h: e
        })
    },
    removeOddsJump: function () {
        dispatcher.dispatch({
            type: CONSTANTS.HOMEPAGE.REMOVEODDSJUMP
        })
    }
};
var MM = {};
Object.defineProperty(MM, "view", {
    get: function () {
        return window.LPM.store.LeftPanel.state.view
    }
}), Object.defineProperty(MM, "isEPM", {
    get: function () {
        return -1 !== window.location.pathname.indexOf("epm")
    }
});
var LPM = ReactModule.createModule("LeftPanel", {
    filter: function () {
        for (var e = arguments[0], t = 1; t < arguments.length; t++) {
            var i = arguments[t];
            e = _.isFunction(i) ? _.filter(e, i) : _.flatten(_.pluck(e, arguments[t]))
        }
        return e
    },
    getIdListFromCookie: function (e, t) {
        var i = utility.cookie.read(e);
        return i ? (i = i.split(t)).length > 0 && (i = _.compact(_.map(i, _.parseInt))) : i = [], i
    },
    getSSMin: function (e, t, i) {
        var a = LPM.getStore("StartingSoon").state.ssmd,
            s = _.find(a, function (t) {
                return t.sid == e
            });
        if (s) {
            var n = _.find(s.puc, function (e) {
                return e.cid == t
            });
            if (n) {
                var o = _.find(n.ces, function (e) {
                    return e.eid == i
                });
                if (o) return o.mts
            }
        }
    },
    redirect: function (e) {
        "home" == e ? Action.LeftPanel.home() : Action.LeftPanel.sport(e, VIEW.PRESTART)
    },
    trimSportName: function (e) {
        var t = 0,
            i = {
                n: "",
                t: !1
            };
        switch (global.lan) {
            case "zh-tw":
            case "zh-cn":
            case "ja-jp":
                t = 10;
                break;
            case "en-gb":
            case "id-id":
            case "ko-kr":
            case "vi-vn":
            case "th-th":
            case "pt-br":
            case "km-kh":
                t = 20
        }
        return i.n = e.length > t ? e.substr(0, t) + "..." : e, i.t = e.length > t, i
    },
    trimTeamName: function (e, t) {
        var i = 0,
            a = {
                h: "",
                a: "",
                ht: !1,
                at: !1
            };
        switch (global.lan) {
            case "zh-tw":
            case "zh-cn":
            case "ja-jp":
                i = t ? 26 : 31;
                break;
            case "en-gb":
            case "id-id":
            case "ko-kr":
            case "vi-vn":
            case "th-th":
            case "pt-br":
            case "km-kh":
                i = t ? 44 : 59
        }
        return a.n = e.length > i ? e.substr(0, i) + "..." : e, a.t = e.length > i, a
    },
    trimCompetitionName: function (e, t) {
        var i = 0,
            a = {
                n: "",
                t: !1
            };
        switch (global.lan) {
            case "zh-tw":
            case "zh-cn":
            case "ja-jp":
                i = t ? 22 : 27;
                break;
            case "en-gb":
            case "id-id":
            case "ko-kr":
            case "vi-vn":
            case "th-th":
            case "pt-br":
            case "km-kh":
                i = t ? 44 : 48
        }
        return a.n = e.length > i ? e.substr(0, i) + "..." : e, a.t = e.length > i, a
    },
    trimSingleProgrammeName: function (e) {
        var t = 0,
            i = {
                n: "",
                t: !1
            };
        switch (global.lan) {
            case "zh-tw":
            case "zh-cn":
            case "ja-jp":
                t = 29;
                break;
            case "en-gb":
            case "id-id":
            case "ko-kr":
            case "vi-vn":
            case "th-th":
            case "pt-br":
            case "km-kh":
                t = 45
        }
        return i.n = e.length > t ? e.substr(0, t) + "..." : e, i.t = e.length > t, i
    },
    trimMultiProgrammeName: function (e) {
        var t = 0,
            i = {
                n: "",
                t: !1
            };
        switch (global.lan) {
            case "zh-tw":
            case "zh-cn":
            case "ja-jp":
                t = 26;
                break;
            case "en-gb":
            case "id-id":
            case "ko-kr":
            case "vi-vn":
            case "th-th":
            case "pt-br":
            case "km-kh":
                t = 44
        }
        return i.n = e.length > t ? e.substr(0, t) + "..." : e, i.t = e.length > t, i
    },
    inplayTimeCheck: function (e) {
        var t = {
            puc: [],
            count: 0
        };
        return t.puc = _.filter(e, function (e) {
            return e.ces = _.filter(e.ces, function (e) {
                return +e.ipt.split(":")[0] <= global.thi
            }), t.count += e.ces.length, e.ces.length > 0
        }), t
    }
}, function () {
    Object.defineProperty(this, "view", {
        get: function () {
            return this.getStore("LeftPanel").state.view
        }
    }), Object.defineProperty(this, "collapsed", {
        get: function () {
            return UI.left.minimized
        }
    }), Object.defineProperty(this, "mycomps", {
        get: function () {
            return this.getStore("PreStart").state.mycomps.data
        }
    }), Object.defineProperty(this, "myevents", {
        get: function () {
            return this.getStore("InPlay").state.myevents
        }
    }), Object.defineProperty(this, "firstLoad", {
        get: function () {
            return this.store.LeftPanel.state.firstLoad
        }
    }), Object.defineProperty(this, "tab", {
        get: function () {
            return this.store.LeftPanel.state.tab
        }
    }), Object.defineProperty(this, "needScrollToAnchor", {
        get: function () {
            return tempStore.get("needScrollToAnchor")
        }
    }), Object.defineProperty(this, "disableScrollbar", {
        get: function () {
            return this.store.LeftPanel.state.disableScrollbar
        }
    })
});
LPM.createMixin("scrollbarMixin", {
    isUpdateFromParent: !1,
    componentWillReceiveProps: function (e) {
        this.isUpdateFromParent = !0
    },
    componentDidUpdate: function (e, t) {
        this.props.updateScrollbar && !this.props.isUpdateFromParent && (this.props.updateScrollbar(), this.isUpdateFromParent = !1), this.updateScrollbar && this.updateScrollbar()
    }
}), LPM.createMixin("expandMixin", {
    expand: function (e) {
        e.stopPropagation();
        var t = $(this.refs.expandObj.getDOMNode()).stop(!0, !0),
            i = function () {
                Action.LeftPanel.expand(this.getActiveKey())
            }.bind(this);
        this.isActive() ? t.slideUp(400, i) : t.slideDown(400, i)
    },
    getExpandIconCss: function () {
        var e = this.isActive();
        return classNames("float-left", {
            icon: !0,
            "icon-ArrowUp": e,
            "icon-ArrowDown": !e
        })
    },
    getExpandStyle: function () {
        return {
            display: this.isActive() ? "block" : "none"
        }
    },
    isActive: function () {
        return _.contains(this.props.actives, this.getActiveKey())
    }
}), LPM.createMixin("longNameTooltipMixin", {
    getInitialState: function () {
        return {
            enalbeLongNameTooltip: !1
        }
    },
    parse: function (e) {
        var t = $(e.currentTarget);
        return {
            x: e.clientX + 10,
            y: e.clientY,
            text: t.data("tip"),
            id: t.data("reactid")
        }
    },
    getDisplayName: function (e, t, i) {
        var a = {
            n: e,
            t: !1
        };
        switch (t) {
            case "c":
                a = LPM.trimCompetitionName(e, i);
                break;
            case "t":
                a = LPM.trimTeamName(e, i);
                break;
            case "s":
                a = LPM.trimSportName(e)
        }
        return a.t && this.setState({
            enalbeLongNameTooltip: !0
        }), a.n
    }
}), LPM.createMixin("liveStreamMixin", {
    hasLivestream: function () {
        var e = this.props.e || this.props.d;
        return uv.login && e.tid.length > 0
    }
}), LPM.createMixin("sExpandHandler", {
    setActives: function (e) {
        if (LPM.firstLoad) {
            var t = this.getSelectedSequence();
            t.length > 0 && (this.state.actives = e ? t : _.union(this.state.actives, t));
            var i = this.getExpandList(this.props.dataKey);
            this.state.cActives = t, this.state.actives = _.union(this.state.actives, i), this.state.isRefresh = !1
        }
    },
    getSelectedSequence: function () {
        var e = [],
            t = _.where(this.state[this.props.dataKey], {
                puc: [{
                    ces: [{
                        eid: this.state.e
                    }]
                }]
            });
        if (t.length > 0) {
            var i = _.where(t[0].puc, {
                ces: [{
                    eid: this.state.e
                }]
            });
            i.length > 0 && (e = ["s" + t[0].sid, "c" + i[0].cid])
        }
        return e
    },
    getExpandList: function (e) {
        var t = [];
        this.state.viewAll = {};
        for (var i = 0, a = this.props.limit, s = this.state[e], n = 0; n < s.length && !(i >= a); n++) {
            for (var o = this.props.expandConfig[n] || _.last(this.props.expandConfig), r = s[n], l = 0, c = 0; c < r.puc.length; c++) {
                var d = r.puc[c];
                if (l >= o[0]) break;
                t = _.union(t, ["s" + r.sid, "c" + d.cid]), d.ces.length > o[1] && o[1] > 0 && (this.state.viewAll[r.sid] || (this.state.viewAll[r.sid] = {}), this.state.viewAll[r.sid][d.cid] = {
                    all: !1,
                    limit: o[1]
                }), l += Math.min(d.ces.length, 0 == o[1] ? 9999 : o[1])
            }
            i += l
        }
        return t
    },
    LEFTPANEL_EXPAND: function (e) {
        if (!(LPM.view != this.props.view || LPM.view != VIEW.PRESTART && LPM.collapsed && this.state.eventViewFirsload && (this.state.eventViewFirsload = !1, e == "s" + this.state.s)))
            if (this.props.view != VIEW.PRESTART && LPM.collapsed && _.startsWith(e, "s")) {
                var t = _.contains(this.state.cActives, e);
                this.state.cActives = t ? [] : [e]
            } else this.state.actives = _.xor(this.state.actives, [e]), this.state.cActives && (this.state.cActives = _.xor(this.state.cActives, [e]))
    },
    LEFTPANEL_RESET: function () {
        this.state = _.extend(this.state, this.props.reset)
    },
    LEFTPANEL_VIEWALL: function (e) {
        if (e.view == this.props.view) {
            var t = _.findKey(this.state.viewAll, function (t) {
                return _.has(t, e.id)
            });
            t && (this.state.viewAll[t][e.id].all = !0)
        }
    },
    UICHANGE: function (e) {
        LPM.collapsed && this.props.view != VIEW.PRESTART && (this.state.cActives = this.getSelectedSequence(e))
    }
}), LPM.createMixin("sDataHandler", {
    SITEREFRESH: function (e) {
        this.updateData(e)
    }
}), LPM.createStore("LeftPanel", {
    mixins: ["sDataHandler"],
    init: function () {
        this.state.disableScrollbar = !1, this.state.isUKsite = Router.state.querystring.partnerid && "18801" === Router.state.querystring.partnerid || !1
    },
    props: {
        info: [{
            text: l.InfoCentre_SportsRules,
            url: "/rules/sports",
            icon: "icon-Rules",
            width: 1029,
            height: 600,
            resizable: "yes",
            k: "1",
            scroll: "yes"
        }, {
            text: l.InfoCentre_Results,
            url: "/sports/results",
            icon: "icon-Results",
            width: 860,
            height: 695,
            resizable: "yes",
            k: "2",
            scroll: "no"
        }, {
            text: l.InfoCentre_Statistics,
            url: "/info-centre/sportsbook-info/statistics/",
            icon: "icon-Stats",
            width: 1095,
            height: 790,
            resizable: "yes",
            local: !0,
            k: "3"
        }, {
            text: l.LT_FAQs,
            url: "/faqs/sports",
            icon: "icon-FAQs",
            width: 1020,
            height: 600,
            r: "yes",
            k: "4"
        }]
    },
    state: {
        view: 0,
        tipc: 0,
        tssc: 0,
        tpsc: 0,
        s: -1,
        e: -1,
        tab: "",
        firstLoad: !1,
        lpc: {},
        tooltip: !1,
        menuState: -1,
        enableScrollbar: !0,
        showCode: !1,
        qmd: [],
        ipFB: {},
        isUKsite: !1
    },
    methods: {
        updateData: function (e) {
            var t = this.state.lpc;
            this.state = _.extend(this.state, {
                view: e.lpc.sm,
                tipc: e.lpd.tipc,
                tssc: _.chain(e.lpd.ssm.ssmd).pluck("puc").flatten().sum(function (e) {
                    return e.ces.length
                }).value(),
                tpsc: e.lpd.tpc,
                s: e.selobj.spt,
                e: e.selobj.evt,
                tab: e.selobj.tab,
                lpc: e.lpc
            }), this.state.firstLoad = !_.isEqual(t, this.state.lpc), this.state.firstLoad && (tempStore.set("needScrollToAnchor", !0), this.state.menuState = -1), this.state.view == VIEW.STARTINGSOON && 0 == this.state.tssc && (0 == this.state.smd.length ? tempStore.set("redirect", "home") : tempStore.set("redirect", e.lpd.sm.smd[0])), 0 == e.selobj.evt && this.state.view != VIEW.PRESTART ? this.state.qmd = _.take(e.lpd.sm.smd, 3) : this.state.qmd = !1, e.lpd.tipc > 0 && this._handleInplayFootball(e.lpd.ips.ismd)
        },
        LEFTPANEL_MENUEXPAND: function (e) {
            this.state.menuState = e
        },
        LEFTPANEL_VIEW: function (e) {
            this.state.view = e.view
        },
        LEFTPANEL_EXPAND: function (e) {},
        UICHANGE: function (e) {
            e.left.minimized || (this.state.tooltip = !1)
        },
        LEFTPANEL_TOOLTIP: function (e) {
            this.state.tooltip = e
        },
        LEFTPANEL_MY_EVENT_TOGGLE: function () {
            this.state.tooltip = !1
        },
        LEFTPANEL_SERVERCODE: function () {
            this.state.showCode = !this.state.showCode
        },
        _handleInplayFootball: function (e) {
            var t = _.first(_.filter(e, {
                sid: 1
            }));
            if (t && t.puc.length > 0) {
                var i = LPM.inplayTimeCheck(t.puc);
                this.state.ipFB = _.assign({}, t), this.state.ipFB.puc = i.puc, this.state.ipFB.ipc = i.count, this.state.tipc += i.count - t.ipc
            }
        }
    }
}), LPM.createStore("PreStart", {
    mixins: ["sDataHandler"],
    init: function (e) {
        var t = e.cookie;
        if (Object.defineProperty(this.state.mycomps, "data", {
                get: function () {
                    return LPM.getIdListFromCookie(t, ",")
                },
                set: function (e) {
                    var i = e.join(",");
                    utility.cookie.write(t, i, 730)
                }
            }), e.showRacing = Router.state.querystring.allowracing && "true" == Router.state.querystring.allowracing.toLowerCase(), e.showRacing) {
            Router.racing();
            e.otherSports.Horse.url = Router.racing(), e.otherSports.Greyhound.url = Router.racing()
        }
    },
    props: {
        view: VIEW.PRESTART,
        cookie: "mycomps",
        mycompsall: "mycompsall",
        reset: {
            collapsed: !1,
            viewAll: !1,
            e: !1,
            s: !1,
            p: !1,
            actives: [],
            submenuView: 0
        },
        resetMC: {
            favt: 0,
            active: -1
        },
        otherSports: {
            Horse: {
                sn: l.LP_Horse,
                i: "40",
                ios: !0,
                key: "r40"
            },
            Greyhound: {
                sn: l.LP_Greyhound,
                i: "39",
                ios: !0,
                key: "r31"
            }
        }
    },
    state: {
        topSports: [],
        fe: [],
        fv: 0,
        smd: [],
        v: 0,
        events: [],
        viewAll: !1,
        mycomps: {
            collapsed: !1,
            viewAll: !1,
            data: [],
            info: [],
            favt: 0,
            active: -1,
            size: [5, 3, 3]
        },
        e: !1,
        s: !1,
        p: !1,
        actives: [],
        submenuView: 0,
        eventMenuSize: 10,
        gap: 5
    },
    methods: {
        LEFTPANEL_MY_COMPETITION_TOGGLE: function (e) {
            var t = [e.cid];
            _.contains(this.state.mycomps.data, e.cid) ? (this.state.mycomps.data = _.xor(this.state.mycomps.data, t), 2 == this.state.mycomps.favt && this.state.c === e.cid && tempStore.set("redirect", _.where(this.state.smd, {
                sid: this.state.s
            })[0])) : (this.state.mycomps.data = _.union(t, this.state.mycomps.data), this.state.mycomps.info.push(e), this.state.mycomps.collapsed = !1), this.state.mycomps.info = this.getMyComps(), this.state.mycomps.collapsed = !1
        },
        LEFTPANEL_MY_COMPETITION_ORDER: function (e) {
            var t = this.state.mycomps.data,
                i = e.i,
                a = e.d;
            if (0 == i && -1 == a || i + a == t.length);
            else {
                var s = t[i];
                t[i] = t[i + a], t[i + a] = s
            }
            this.state.mycomps.data = t, this.state.mycomps.info = this.getMyComps()
        },
        LEFTPANEL_MY_COMPETITION_VIEWALL: function () {
            this.state.mycomps.viewAll = !0
        },
        LEFTPANEL_MY_COMPETITION_EXPAND: function (e) {
            if (0 == this.state.mycomps.data.length) return !1;
            this.state.mycomps.collapsed = e
        },
        updateData: function (e) {
            if (e.lpd) {
                var t = e.lpd.sm;
                this.state = _.extend(this.state, {
                    fe: _.sortByAll(t.fe.progms, ["ims", "pen"]),
                    fv: t.fe.fv,
                    smd: _.sortByAll(t.smd, ["son", "sen"]),
                    v: t.v,
                    events: _.chain(t.smd).pluck("puc").flatten().filter(function (e) {
                        return e.ces && e.ces.length > 0
                    }).value(),
                    redirect: !1
                });
                var i = _.take(this.state.smd, 5),
                    a = [];
                if (this.props.showRacing && (this.state.topSports = [this.props.otherSports.Horse], i.push(this.props.otherSports.Greyhound), this.state.gap = 6), this.state.smd.length > 5 && (a = _.sortBy(_.takeRight(this.state.smd, this.state.smd.length - 5), "sen")), this.state.smd = _.union(i, a), LPM.view == this.props.view)
                    if (this.leftpanel_reset(), this.state.s = e.selobj.spt, this.state.c = parseInt(e.selobj.cids), 2 == e.lpc.smv) {
                        if (this.state = _.extend(this.state, {
                                e: e.selobj.evt
                            }), this.state.events.length > 0) {
                            var s = this.state.events[0].ces;
                            s.length > this.state.eventMenuSize && (_.contains(_.pluck(_.take(s, this.state.eventMenuSize), "eid"), this.state.e) || (this.state.viewAll = !0))
                        }
                        this.state.mycomps.favt = 1
                    } else 2 == e.selobj.favT ? (this.state.mycomps = _.extend(this.state.mycomps, {
                        favt: e.selobj.favT,
                        active: +e.selobj.cids
                    }), this.state.submenuView = 1, this.checkMyCompsNeedViewAll(e.selobj)) : (this.state = _.extend(this.state, {
                        p: e.selobj.pid
                    }), this.state.mycomps.favt = this.state.s > 0 ? 1 : 0, this.state.p > 0 && (this.state.actives = [this.state.p]));
                this.state.mycomps.info = this.getMyComps(t.mc), this.state.mycomps.info.length > 0 && Router.state.isChanged && (this.state.mycomps.collapsed = !1)
            }
        },
        LEFTPANEL_SPORT: function (e) {
            e.view == this.props.view && (this.state.s = e.id)
        },
        leftpanel_reset: function () {
            this.state = _.extend(this.state, this.props.reset), this.state.mycomps = _.extend(this.state.mycomps, this.props.resetMC), LPM.firstLoad && (this.state.mycomps.collapsed = !1), this.state.mycomps.viewAll = !1
        },
        LEFTPANEL_EXPAND: function (e) {
            LPM.view == this.props.view && (this.state.actives = _.xor(this.state.actives, [e]), this.state.submenuView = this.state.actives.length > 0 ? 3 : 0)
        },
        checkMyCompsNeedViewAll: function (e) {
            if (!this.state.mycomps.viewAll) {
                var t = parseInt(e.cids);
                this.state.mycomps.data.indexOf(t) >= this.state.mycomps.size[this.state.mycomps.favt] && (this.state.mycomps.viewAll = !0)
            }
        },
        getMyComps: function (e) {
            e || (e = this.state.mycomps.info);
            var t = [];
            return _.map(this.state.mycomps.data, function (i) {
                var a = _.remove(e, function (e) {
                    return e.cid == i
                });
                a.length > 0 ? t.push(a[0]) : _.remove(this.state.mycomps.data, function (e) {
                    return e == i
                })
            }, this), t
        },
        LEFTPANEL_SUBVIEW: function (e) {
            this.state.actives = [], this.state.submenuView == e.v ? this.state.submenuView = 0 : (this.state.submenuView = e.v, 1 == this.state.submenuView || 2 == this.state.submenuView ? this.state.mycomps.collapsed = !1 : e.id && this.LEFTPANEL_EXPAND(e.id))
        },
        LEFTPANEL_PSEVENT_VIEWALL: function (e) {
            this.state.viewAll = e
        },
        UICHANGE: function (e) {
            e.left.minimized == LPM.collapsed || LPM.view == VIEW.PRESTART && !this.state.s || (this.state.submenuView = 0, this.state.actives = [])
        }
    }
}), LPM.createStore("InPlay", {
    mixins: ["sDataHandler", "sExpandHandler"],
    init: function (e) {
        var t = this.props.cookie;
        Object.defineProperty(this.state, "myevents", {
            get: function () {
                return LPM.getIdListFromCookie(t, "|")
            },
            set: function (e) {
                var i = e.join("|");
                utility.cookie.write(t, i, 730)
            }
        })
    },
    props: {
        view: VIEW.INPLAY,
        dataKey: "ismd",
        expandConfig: [
            [10, 0],
            [6, 0],
            [6, 0]
        ],
        limit: 22,
        cookie: "fav3",
        reset: {
            e: !1,
            actives: [],
            viewAll: {},
            s: -1
        },
        scoreboard: [null, null, [0, 6, 7],
            [1, 2, 3],
            [2, 3, 4, 5, 7],
            [1, 2, 3, 4, 6], null, [1, 2, 3, 4, 6, 7, 8]
        ]
    },
    state: {
        ismd: [],
        myevents: [],
        myeventInfo: [],
        tipc: 0,
        v: 0,
        e: !1,
        actives: [],
        cActives: [],
        viewAll: {},
        s: -1,
        meCollapsed: !1,
        eventViewFirsload: !1
    },
    methods: {
        updateData: function (e) {
            if (e.lpd) {
                var t = e.lpd.ips;
                this.state = _.extend(this.state, {
                    ismd: t.ismd,
                    v: t.v
                }), LPM.view == this.props.view ? 2 == e.lpc.imv ? (LPM.firstLoad && (this.LEFTPANEL_RESET(), this.state.eventViewFirsload = !0), this.state = _.extend(this.state, {
                    e: e.selobj.evt,
                    s: e.selobj.spt
                }), this.setActives(), this.state.myeventInfo = this.getMyEvents()) : (this.LEFTPANEL_RESET(), this.state = _.extend(this.state, {
                    e: !1,
                    s: e.selobj.spt
                })) : this.LEFTPANEL_RESET()
            }
        },
        LEFTPANEL_MY_EVENT_TOGGLE: function (e) {
            var t = _.map(_.flatten([e]), _.parseInt);
            this.state.myevents = _.xor(this.state.myevents, t).reverse(), _.intersection(this.state.myevents, t).length > 0 && (this.state.meCollapsed = !1), 0 == this.state.myevents.length && LPM.collapsed && _.remove(this.state.cActives, function (e) {
                return "smyevents" == e
            }), this.state.myeventInfo = this.getMyEvents()
        },
        CENTERPANELMYEVENTTOGGLE: function (e) {
            this.LEFTPANEL_MY_EVENT_TOGGLE(e)
        },
        LEFTPANEL_MY_EVENT_EXPAND: function (e) {
            this.state.meCollapsed = e
        },
        getMyEvents: function () {
            var e = this.state.ismd,
                t = this.state.myevents,
                i = [];
            return _.map(e, function (e) {
                _.map(e.puc, function (a) {
                    var s = _.filter(a.ces, function (e) {
                        return t.length > 0 && t.indexOf(e.eid) > -1
                    });
                    s.length > 0 && (i = _.union(i, _.map(s, function (t) {
                        return t.s = e.sid, t
                    })))
                })
            }), i = _.sortBy(i, function (e) {
                return _.indexOf(t, e.eid)
            })
        }
    },
    public: {
        filter: function () {
            if (0 == this.state.myevents.length) return this.state.ismd;
            var e = this.state.myevents,
                t = _.clone(this.state.ismd, !0);
            return _.remove(t, function (t) {
                return _.remove(t.puc, function (t) {
                    return _.remove(t.ces, function (t) {
                        return _.contains(e, t.eid)
                    }), 0 == t.ces.length
                }), 0 == t.puc.length
            }), t
        }
    }
}), LPM.createStore("StartingSoon", {
    mixins: ["sDataHandler", "sExpandHandler"],
    props: {
        view: VIEW.STARTINGSOON,
        dataKey: "ssmd",
        expandConfig: [
            [10, 5],
            [6, 3],
            [6, 3]
        ],
        limit: 22,
        reset: {
            e: !1,
            actives: [],
            viewAll: {}
        }
    },
    state: {
        ssmd: [],
        tssc: 0,
        v: 0,
        e: !1,
        actives: [],
        cActives: [],
        viewAll: {},
        s: !1,
        eventViewFirsload: !1
    },
    methods: {
        updateData: function (e) {
            if (e.lpd) {
                var t = e.lpd.ssm;
                this.state = _.extend(this.state, {
                    ssmd: t.ssmd,
                    v: t.v
                }), LPM.view == this.props.view ? 2 == e.lpc.ssv ? (LPM.firstLoad && (this.LEFTPANEL_RESET(), this.state.eventViewFirsload = !0), this.state.isRefresh = !0, this.state = _.extend(this.state, {
                    e: e.selobj.evt,
                    s: e.selobj.spt
                }), this.setActives()) : (this.LEFTPANEL_RESET(), this.state = _.extend(this.state, {
                    e: !1,
                    s: e.selobj.spt
                })) : this.LEFTPANEL_RESET()
            }
        }
    }
}), LPM.createStore("Parlay", {
    mixins: ["sDataHandler", "sExpandHandler"],
    init: function (e) {
        e.cookie;
        if (e.showRacing = Router.state.querystring.allowracing && "true" == Router.state.querystring.allowracing.toLowerCase(), e.showRacing) {
            Router.racing();
            e.otherSports.Horse.url = Router.racing(), e.otherSports.Greyhound.url = Router.racing()
        }
    },
    props: {
        view: VIEW.PARLAY,
        reset: {
            collapsed: !1,
            e: !1,
            sid: 3,
            p: !1,
            actives: [],
            submenuView: 0
        },
        resetMC: {
            favt: 0,
            active: -1
        },
        otherSports: {
            Horse: {
                sn: l.LP_Horse,
                i: "40",
                ios: !0,
                key: "r40"
            },
            Greyhound: {
                sn: l.LP_Greyhound,
                i: "39",
                ios: !0,
                key: "r31"
            }
        }
    },
    state: {
        topSports: [],
        fe: [],
        fv: 0,
        smd: [],
        v: 0,
        events: [],
        viewAll: !1,
        e: !1,
        sid: -1,
        p: !1,
        actives: [],
        submenuView: 0,
        eventMenuSize: 10,
        gap: 5,
        topPrestarSport: {}
    },
    methods: {
        updateData: function (e) {
            if (e.lpd) {
                var t = e.lpd.psm;
                if (this.state = _.extend(this.state, {
                        smd: _.sortByAll(t.psmd, ["son", "sen"]),
                        v: t.v,
                        events: [],
                        redirect: !1,
                        topPrestarSport: {
                            sid: e.lpd.sm.smd[0].sid,
                            sen: e.lpd.sm.smd[0].sen,
                            tc: e.lpd.sm.smd[0].tc,
                            tmrc: e.lpd.sm.smd[0].tmrc
                        }
                    }), LPM.view == this.props.view) {
                    if (this.leftpanel_reset_parlay(), this.state = _.extend(this.state, {
                            sid: e.selobj.spt,
                            c: parseInt(e.selobj.cids)
                        }), 2 == e.lpc.smv) {
                        this.state = _.extend(this.state, {
                            e: e.selobj.evt
                        });
                        var i = t.psmd.filter(function (t) {
                            return t.sid === e.selobj.spt
                        });
                        if (this.state.events = _.chain(i).pluck("puc").flatten().filter(function (e) {
                                return e.ces && e.ces.length > 0
                            }).value(), this.state.events.length > 0) {
                            var a = this.state.events[0].ces;
                            a.length > this.state.eventMenuSize && (_.contains(_.pluck(_.take(a, this.state.eventMenuSize), "eid"), this.state.e) || (this.state.viewAll = !0))
                        }
                    }
                } else this.leftpanel_reset_parlay()
            }
        },
        LEFTPANEL_SPORT: function (e) {
            e.view == this.props.view && (this.state.sid = e.id)
        },
        leftpanel_reset_parlay: function () {
            this.state = _.extend(this.state, this.props.reset)
        },
        LEFTPANEL_EXPAND: function (e) {
            LPM.view == this.props.view && (this.state.actives = _.xor(this.state.actives, [e]), this.state.submenuView = this.state.actives.length > 0 ? 3 : 0)
        },
        LEFTPANEL_PSEVENT_VIEWALL: function (e) {
            this.state.viewAll = e
        },
        UICHANGE: function (e) {
            e.left.minimized == LPM.collapsed || LPM.view == VIEW.PRESTART && !this.state.sid || (this.state.submenuView = 0, this.state.actives = [])
        }
    }
});
var tempStore = function () {
        var e = {};
        return {
            get: function (t) {
                var i = e[t];
                return e[t] = null, i
            },
            set: function (t, i) {
                e[t] = i
            }
        }
    }(),
    settingParam = {
        oddsType: uv.ov,
        sortBy: uv.sb,
        noOfLine: uv.nol,
        autoRefreshBetslip: uv.iarf,
        SPORT_SETTING_COOKIE_NAME: "settingProfile",
        expiredDay: 730,
        orgOddsType: uv.ov,
        orgSortBy: uv.sb
    },
    MPStore = function () {
        var e = -1;
        dispatcher.register(function (t) {
            switch (t.type) {
                case CONSTANTS.SITEREFRESH:
                    1 == mpc.pv ? function (e) {
                        try {
                            if (e && e.p && !o.param.IsInplay && (o.param.PageNo = -1 == e.p.c ? 0 : e.p.c, o.totalPages = e.p.t), o.param.IsFirstLoad)
                                if (e && !e.error)
                                    if (e.d) {
                                        var t;
                                        if (e.d instanceof Array) {
                                            for (var i = 0; i < e.d.length; i++)
                                                if (e.d[i].c) {
                                                    t = e.d[i].c;
                                                    break
                                                }
                                        } else t = e.d.c;
                                        if (0 == _.where(e.bt, {
                                                sk: "ftahou"
                                            }).length && (e.bt = _.union([{
                                                c: 0,
                                                n: "Handicap & Over / Under",
                                                k: "full-time-asian-handicap-and-over-under",
                                                sk: "ftahou"
                                            }], e.bt)), t && t.length > 0 && cCtrl.hasOddsForToday(t)) om.processData.loadAsync(e);
                                        else if (e.bt && e.bt.length > 0) {
                                            for (var a = !1, s = param.reqUrl, i = 0; i < e.bt.length; i++) {
                                                if (e.bt[i].sk != o.param.UIBetType && ("Today" != o.param.Tab || "or" != e.bt[i].sk)) {
                                                    s = (s = -1 != s.indexOf("programme/") && -1 == s.indexOf("/competition/") ? s + "/competition/" + e.bt[i].k : s.replace("/" + selobj.btp2, "/" + e.bt[i].k)).replace("/default", "/" + e.bt[i].k), setTimeout(function () {
                                                        cCtrl.isProcessing = !1, cCtrl.loadContent(s, !0, !0, null, !0)
                                                    }, cCtrl.spanSec), a = !0;
                                                    break
                                                }
                                                if ("Today" == o.param.Tab && "or" == e.bt[i].sk) {
                                                    s = s.replace(selobj.btp2, e.bt[i].k), setTimeout(function () {
                                                        cCtrl.isProcessing = !1, cCtrl.loadContent(s, !0, !0, null, !0)
                                                    }, cCtrl.spanSec), a = !0;
                                                    break
                                                }
                                            }
                                            a || setTimeout(function () {
                                                cCtrl.isProcessing = !1, om.processData.loadAsync(e)
                                            }, cCtrl.spanSec)
                                        } else setTimeout(function () {
                                            cCtrl.isProcessing = !1, om.processData.loadAsync(e)
                                        }, cCtrl.spanSec)
                                    } else setTimeout(function () {
                                        cCtrl.isProcessing = !1, om.processData.loadAsync(e)
                                    }, cCtrl.spanSec);
                            else e.error && cCtrl.goPageNotFound();
                            else om.processData.refreshAsync(e), $(".timer:not(empty)", ".cp-container").each(function (e, t) {
                                +$(t).text().split(":")[0] >= global.thi && cCtrl.loadContent(location.href, !1, !1, null, !0)
                            })
                        } catch (e) {
                            console.log("Update MOP - Error = " + e.stack), oddsPage.showLoading(!1), cCtrl.isProcessing = !1
                        }
                    }(t.data.mod) : (om.timerUtil.clearTimer(), o.$loading.addClass("hidden")), e != mpc.pv && (o.$mainOddsPanel[1 == mpc.pv ? "removeClass" : "addClass"]("hidden"), Action.PopUp.hide(), e = mpc.pv);
                    break;
                case CONSTANTS.CENTERPANEL.REMOVEHIGHLIGHTODDS:
                    1 == mpc.pv && _.forEach(t.sids, function (e) {
                        o.$mainOddsPanel.find("#o" + e).parents("td.selected").removeClass("selected"), o.$mainOddsPanel.find(".secondRow #o" + e).parents("td.selected").removeClass("selected")
                    });
                    break;
                case CONSTANTS.CENTERPANEL.HIGHLIGHTODDS:
                    1 == mpc.pv && om.odds.reSelectedOdds(t.sids);
                    break;
                case CONSTANTS.LEFTPANEL.MY_EVENT.TOGGLE:
                    1 == mpc.pv && myEvents.removeEvent(t.data, !0);
                    break;
                case CONSTANTS.LEFTPANEL.MY_COMPETITION.TOGGLE:
                    if (1 == mpc.pv) {
                        var i = o.$mainOddsPanel.find("#cf" + t.data.cid).toggleClass("actived");
                        i.hasClass("actived") ? i.attr("title", l.LP_RemoveMyComp) : i.attr("title", l.LP_Add2MyComp)
                    }
                    break;
                case CONSTANTS.UICHANGE:
                    1 == mpc.pv && o.is1stHalfOn != t.data.center.is1stHalfOn && t.data.indicator != UI.indicator.WINDOW && t.data.indicator != UI.indicator.CENTER && (t.data.center.is1stHalfOn ? OddsHeader.$filter_half && OddsHeader.$filter_half.eq(0).trigger("click", [!1, !0]) : OddsHeader.$filter_standard && OddsHeader.$filter_standard.eq(0).trigger("click", [!1, !0])), setTimeout(ScrollerBar.initScrollbarStatus, 50)
            }
        })
    }();
Action.MainOdds = {
    QuickMenu: {
        changeOption: function (e, t, i) {
            var a = Router[e](t, "sport" == e ? VIEW.INPLAY : i);
            Action.LoadSite(a)
        }
    },
    BetType: {
        changeOption: function (e) {
            var t = Router.betType(e);
            Action.LoadSite(t)
        }
    },
    InplayAll: function () {
        var e = Router.inplay();
        Action.LoadSite(e)
    },
    CompetitionMenu: function () {
        var e = Router.selectedCompetitionMenu(selobj.sptn);
        Action.LoadSite(e)
    },
    MyEvents: {
        toggle: function (e) {
            dispatcher.dispatch({
                type: CONSTANTS.CENTERPANEL.MYEVENTTOGGLE,
                data: e
            })
        }
    },
    Toggle1stHalfView: function (e) {
        setTimeout(function () {
            UI.MPRESIZE(e)
        }, 100)
    },
    EPM: function () {
        var e = Router.SportEpm();
        Action.LoadSite(e)
    }
};
var lcl = {
        NeutralText: l.neut,
        LiveText: l.LiveText
    },
    $mask = null,
    d2, strDate = "",
    o = {
        vars: {
            GetOdds: null,
            GetMoreBetsOdds: null,
            GetUiBetTypes: null,
            TemplatesFolder: null,
            ShowBS: !1,
            timer: 0,
            maxTimer: 80,
            isCollapsing: !1,
            betTypesTemplate: null,
            betTypesData: null,
            favURL: "",
            isFav: !1,
            isTimerEnabled: !0
        },
        param: {
            IsInplayAll: !1,
            SportId: null,
            SportName: null,
            CompetitionId: null,
            EventDate: null,
            EventIds: null,
            IsFirstLoad: !0,
            IsFutureDate: !1,
            IsInplay: !1,
            SortBy: 1,
            Tab: null,
            UIBetType: null,
            OddsType: 0,
            PageNo: 0
        },
        params: [],
        stateObjs: {
            $upObjs: $([]),
            $downObjs: $([]),
            timers: [],
            times: [],
            bts: [],
            sports: null,
            $collapsedObjs: [],
            $expandObjs: [],
            $collapsedObjsChild: [],
            $expandObjsChild: []
        },
        netSports: [3, 9, 13, 20, 27],
        $centerPanel: $("#center-panel"),
        $mainOddsPanel: $("#MOP"),
        $containerWrapper: $("#odds-tbl-containers"),
        $myEventsContainer: $("#myEventContainer"),
        $CompetitionMenu: $("#compMenu"),
        $loading: $("#page .loading"),
        $rtimer: null,
        mainIntervalId: null,
        hasMatch: !1,
        containersDic: [],
        noMatch: null,
        noPopularMatch: null,
        noMyEvent: null,
        lang: "en-gb",
        totalPages: 0,
        ALL_FAV_COOKIE_NAME: "fav3",
        ALL_FAVCom_COOKIE_NAME: "fav-com",
        FILTER_TYPE: "filterType",
        MB_FAVBT_NAME: "favBT",
        showBackBtn: !0,
        Select_All_Comps: "selAllComps",
        defaultBT: "full-time-asian-handicap-and-over-under",
        is1stHalfOn: !1,
        has1stHalfFilter: !1,
        pacType: {
            par: 0,
            corners: 1,
            bookings: 2,
            et: 3,
            etCorners: 4,
            pelAH: 5,
            pelOU: 6,
            toQualify: 7,
            subs: 8,
            throwIn: 9,
            goalKick: 10,
            freeKick: 11,
            playerSpec: 14,
            winner: 53,
            offsides: 55,
            etBookings: 54,
            teamPointT1: 41,
            teamPointT2: 42
        }
    };
$(function () {
    if ("-2" != o.param.SportId) {
        o.$rtimer = $("#refCounter").on("click", function () {
            om.refresh.process(function () {
                o.vars.timer = o.vars.maxTimer
            })
        }), o.vars.timer = o.vars.maxTimer;
        var e = $("#emptyMsg").text();
        o.noMatch = e.replace("{0}", l.NoMatch), o.noPopularMatch = '<div class="container"><div class="odds-table"><div class="time-header"><span class="time-txt">{0}</span></div></div>' + o.noMatch + "</div>", o.noMyEvent = e.replace("{0}", l.NoMatch)
    } else cCtrl.goPageNotFound()
});
var oddsPage = {
        getOddsType: function (e) {
            var t = "MALAY";
            switch (e) {
                case "1":
                    t = "EURO";
                    break;
                case "2":
                    t = "HK";
                    break;
                case "3":
                    t = "MALAY";
                    break;
                case "4":
                    t = "INDO"
            }
            return t
        },
        initParams: function () {
            o.stateObjs.$downObjs = $([]), o.stateObjs.timers = [], o.stateObjs.times = [], o.stateObjs.bts = [], o.stateObjs.$collapsedObjs = [], o.stateObjs.$expandObjs = [], o.stateObjs.$collapsedObjsChild = [], o.stateObjs.$expandObjsChild = [], o.is1stHalfOn = !1, o.has1stHalfFilter = !1, o.hasMatch = !1, om.versionUtil.resetVersion()
        },
        setSelectedAllCompetitions: function (e, t) {
            if (t) {
                if (-1 != t.indexOf("select-competition") || -1 != t.indexOf("morebet")) return;
                var i = t.split("/");
                if (4 == i.length && !isNaN(i[3])) return
            }
            utility.cookie.write(o.Select_All_Comps, e)
        },
        showLoading: function (e) {
            o.$loading[e ? "removeClass" : "addClass"]("hidden")
        },
        showNoMatch: function (e) {
            "popular" == o.param.Tab.toLowerCase() ? (e || (e = o.$containerWrapper.find("#headerTxt").text()), o.$containerWrapper[0].innerHTML = o.noPopularMatch.replace("{0}", e)) : o.$containerWrapper[0].innerHTML = o.noMatch, liveCentreControl.showErrorMsg(), liveCentreControl.resetToDefault()
        }
    },
    oddsUtil = {
        indicator: 0,
        lockIcon: null,
        netLockIcon: null,
        getStartSoonMins: function (e, t, i) {
            var a = LPM.getSSMin(e, t, i),
                s = l.LP_StartingInMins.replace("{0}", a);
            return a <= 1 && "en-gb" == global.lan && (s = s.slice(0, s.length - 1)), s
        },
        getValueIndicator: function (e, t) {
            return oddsUtil.indicator = 0, e == t ? oddsUtil.indicator : (3 == uv.ov ? 0 == e ? oddsUtil.indicator = 1 : e > 0 && t < 0 ? oddsUtil.indicator = 1 : e < 0 && t > 0 ? oddsUtil.indicator = 2 : e > 0 && t > 0 && e < t ? oddsUtil.indicator = 1 : e > 0 && t > 0 && e > t ? oddsUtil.indicator = 2 : e < 0 && t < 0 && e > t ? oddsUtil.indicator = 2 : e < 0 && t < 0 && e < t && (oddsUtil.indicator = 1) : oddsUtil.indicator = e < t ? 1 : 2, oddsUtil.indicator)
        },
        isFavouriteTeam: function (e, t, i) {
            var a = 0;
            if (t > 1 && (a = 8 * (t - 1)), null != e) {
                if (homeSelectionHdp = e[a + 1], awaySelectionHdp = e[a + 3], null == homeSelectionHdp && null == awaySelectionHdp || 0 == homeSelectionHdp && 0 == awaySelectionHdp) return !1;
                if ("-" == homeSelectionHdp.substr(0, 1)) return !!i;
                if ("-" == awaySelectionHdp.substr(0, 1)) return !i
            }
            return !1
        },
        isInMyCompetitions: function (e) {
            var t = parseInt(e),
                i = LPM.mycomps;
            return _.includes(i, t)
        },
        isFtHtFavouriteTeam: function (e, t, i, a) {
            var s = 0;
            if (i > 1 && (s = 8 * (i - 1)), null != e) {
                var n = e[s + 1],
                    o = e[s + 3];
                if (null == n && null == o || 0 == n && 0 == o) return !1;
                if ("-" == n.substr(0, 1)) return !!a;
                if ("-" == o.substr(0, 1)) return !a
            }
            if (null != t) {
                n = t[s + 1], o = t[s + 3];
                if (null == n && null == o || 0 == n && 0 == o) return !1;
                if ("-" == n.substr(0, 1)) return !!a;
                if ("-" == o.substr(0, 1)) return !a
            }
            return !1
        },
        getLockIcon: function (e) {
            return e ? (null == oddsUtil.netLockIcon && (oddsUtil.netLockIcon = TrimPath.processDOMTemplate("lockIcon", null), oddsUtil.netLockIcon = oddsUtil.netLockIcon.replace("{0}", "singleVal")), oddsUtil.netLockIcon) : (null == oddsUtil.lockIcon && (oddsUtil.lockIcon = TrimPath.processDOMTemplate("lockIcon", null), oddsUtil.lockIcon = oddsUtil.lockIcon.replace("{0}", "")), oddsUtil.lockIcon)
        },
        GetPeriodLocalization: function (e, t) {
            if (("zh-cn" == global.lan || "zh-tw" == global.lan || "en-gb" == global.lan) && "ot" != e) return "";
            switch (e) {
                case "q1":
                    return l.Period_1Q;
                case "q2":
                    return l.Period_2Q;
                case "q3":
                    return l.Period_3Q;
                case "q4":
                    return l.Period_4Q;
                case "s1":
                    return "id-id" != global.lan ? "" : l.Period_1S;
                case "s2":
                    return "id-id" != global.lan ? "" : l.Period_2S;
                case "s3":
                    return "id-id" != global.lan ? "" : l.Period_3S;
                case "s4":
                    return "id-id" != global.lan ? "" : l.Period_4S;
                case "s5":
                    return "id-id" != global.lan ? "" : l.Period_5S;
                case "s6":
                    return "id-id" != global.lan ? "" : l.Period_6S;
                case "s7":
                    return "id-id" != global.lan ? "" : l.Period_7S;
                case "p1":
                    return "id-id" != global.lan ? "" : l.Period_1P;
                case "p2":
                    return "id-id" != global.lan ? "" : l.Period_2P;
                case "p3":
                    return "id-id" != global.lan ? "" : l.Period_3P;
                case "1st":
                    return "vi-vn" != global.lan || "2" != t && "7" != t ? l.Period_1H : l.Period_VietBBall_1H;
                case "h2":
                    return "vi-vn" != global.lan || "2" != t && "7" != t ? l.Period_2H : l.Period_VietBBall_2H;
                case "pt":
                    return "id-id" == global.lan || "vi-vn" == global.lan ? l.Period_PointLines_ttp : "";
                case "ot":
                    return l.Period_OT;
                case "fts":
                    return "vi-vn" == global.lan ? l.Period_GameLines : "";
                default:
                    return ""
            }
        },
        GetPeriodText: function (e, t) {
            switch (e) {
                case "q1":
                    return "th-th" == global.lan || "id-id" == global.lan ? "Q1" : l.Period_1Q;
                case "q2":
                    return "th-th" == global.lan || "id-id" == global.lan ? "Q2" : l.Period_2Q;
                case "q3":
                    return "th-th" == global.lan || "id-id" == global.lan ? "Q3" : l.Period_3Q;
                case "q4":
                    return "th-th" == global.lan || "id-id" == global.lan ? "Q4" : l.Period_4Q;
                case "s1":
                    return "vi-vn" == global.lan || "id-id" == global.lan ? oddsUtil.IsTableTennisOrBadminton(t) ? "Game 1" : "Set 1" : oddsUtil.IsTableTennisOrBadminton(t) ? l.Period_1G : l.Period_1S;
                case "s2":
                    return "vi-vn" == global.lan || "id-id" == global.lan ? oddsUtil.IsTableTennisOrBadminton(t) ? "Game 2" : "Set 2" : oddsUtil.IsTableTennisOrBadminton(t) ? l.Period_2G : l.Period_2S;
                case "s3":
                    return "vi-vn" == global.lan || "id-id" == global.lan ? oddsUtil.IsTableTennisOrBadminton(t) ? "Game 3" : "Set 3" : oddsUtil.IsTableTennisOrBadminton(t) ? l.Period_3G : l.Period_3S;
                case "s4":
                    return "vi-vn" == global.lan || "id-id" == global.lan ? oddsUtil.IsTableTennisOrBadminton(t) ? "Game 4" : "Set 4" : oddsUtil.IsTableTennisOrBadminton(t) ? l.Period_4G : l.Period_4S;
                case "s5":
                    return "vi-vn" == global.lan || "id-id" == global.lan ? oddsUtil.IsTableTennisOrBadminton(t) ? "Game 5" : "Set 5" : oddsUtil.IsTableTennisOrBadminton(t) ? l.Period_5G : l.Period_5S;
                case "s6":
                    return "vi-vn" == global.lan || "id-id" == global.lan ? oddsUtil.IsTableTennisOrBadminton(t) ? "Game 6" : "Set 6" : oddsUtil.IsTableTennisOrBadminton(t) ? l.Period_6G : l.Period_6S;
                case "s7":
                    return "vi-vn" == global.lan || "id-id" == global.lan ? oddsUtil.IsTableTennisOrBadminton(t) ? "Game 7" : "Set 7" : oddsUtil.IsTableTennisOrBadminton(t) ? l.Period_7G : l.Period_7S;
                case "p1":
                    return "id-id" == global.lan ? "P1" : l.Period_1P;
                case "p2":
                    return "id-id" == global.lan ? "P2" : l.Period_2P;
                case "p3":
                    return "id-id" == global.lan ? "P3" : l.Period_3P;
                case "1st":
                    return "th-th" == global.lan || "id-id" == global.lan ? "1H" : "vi-vn" != global.lan || "2" != t && "7" != t ? l.Period_1H : l.Period_BBandAF_1H;
                case "h2":
                    return "th-th" == global.lan || "id-id" == global.lan ? "2H" : "vi-vn" != global.lan || "2" != t && "7" != t ? l.Period_2H : l.Period_BBandAF_2H;
                case "pt":
                    return l.Period_Pt;
                case "ot":
                    return "vi-vn" == global.lan || "th-th" == global.lan || "id-id" == global.lan || "ko-kr" == global.lan ? "OT & Pens" : "en-gb" == global.lan ? "Incl. O/T & Pens" : l.Period_InclOTandPens;
                case "fts":
                    return l.Period_GM
            }
        },
        IsTableTennisOrBadminton: function (e) {
            return !!e && (20 == e || 9 == e)
        },
        GetEventTimer: function (e) {
            if ("th-th" == global.lan || "vi-vn" == global.lan || "id-id" == global.lan || "ko-kr" == global.lan || "pt-br" == global.lan) return e;
            if ("en-gb" == global.lan && ("ET" == e.toUpperCase() || "PENS" == e.toUpperCase())) return e;
            switch (e.toUpperCase()) {
                case "1H":
                    return l.ti1H;
                case "2H":
                    return l.ti2H;
                case "HT":
                    return l.tiHT;
                case "ET":
                    return l.tiET;
                case "OT":
                    return "vi-vn" == global.lan || "th-th" == global.lan || "id-id" == global.lan || "ko-kr" == global.lan ? "OT & Pens" : "en-gb" == global.lan ? "Incl. O/T & Pens" : l.Period_InclOTandPens;
                case "PENS":
                    return l.tiPens;
                case "Q1":
                    return l.tiQ1;
                case "Q2":
                    return l.tiQ2;
                case "Q3":
                    return l.tiQ3;
                case "Q4":
                    return l.tiQ4
            }
        },
        GetEventTimerTooltip: function (e) {
            if (("en-gb" == global.lan || "zh-cn" == global.lan || "zh-tw" == global.lan) && "PENS" != e.toUpperCase() && "OT" != e.toUpperCase()) return "";
            switch (e.toUpperCase()) {
                case "1H":
                case "H1":
                    return l.ti1H;
                case "2H":
                case "H2":
                    return l.ti2H;
                case "HT":
                    return l.tiHT;
                case "ET":
                    return "ko-kr" == global.lan ? e.toUpperCase() : l.tiET;
                case "OT":
                    return l.tiOT;
                case "PENS":
                    return l.tiPens;
                case "Q1":
                    return l.tiQ1;
                case "Q2":
                    return l.tiQ2;
                case "Q3":
                    return l.tiQ3;
                case "Q4":
                    return l.tiQ4
            }
        },
        GetPeriodClass: function (e) {
            switch (e) {
                case "1st":
                case "h2":
                    return "halves";
                case "q1":
                case "q2":
                case "q3":
                case "q4":
                    return "quarters";
                case "s1":
                case "s2":
                case "s3":
                case "s4":
                case "s5":
                case "s6":
                case "s7":
                    return "sets";
                case "fts":
                    return "game";
                case "pt":
                    return "point";
                case "p1":
                case "p2":
                case "p3":
                    return "periods";
                default:
                    return ""
            }
        },
        GetSelectedBetType: function () {
            var e = _.find(o.stateObjs.bts, function (e) {
                return e.k == selobj.btp2
            });
            return e || (e = {
                c: 0,
                n: "Handicap & Over / Under",
                k: "full-time-asian-handicap-and-over-under",
                sk: "ftahou"
            }), e ? oddsUtil.CustomizedBettypeName(selobj.spt, e.sk, e.n) : ""
        },
        CustomizedBettypeName: function (e, t, i) {
            var a = i;
            return "ftahou" == t ? a = l.CM_MM : "ftml" == t && _.indexOf([3, 9, 13, 20, 27], e) > -1 && (a = l.Odds_Winner), a
        },
        GetHomepageEventTimerLocalization: function (e) {
            if ("en-gb" == global.lan) return e;
            switch (e) {
                case "First Half":
                    return l.HPET_1H;
                case "Second Half":
                    return l.HPET_2H;
                case "Half Time":
                    return l.HPET_HT;
                case "Extra Time":
                    return l.HPET_ET;
                case "Penalty Shootout":
                    return l.HPET_Pens;
                default:
                    return e
            }
        },
        GetOULocalization: function (e) {
            if ("zh-cn" == global.lan) switch (e.toLowerCase()) {
                case "o":
                    e = l.o;
                    break;
                case "u":
                    e = l.u
            }
            return e
        },
        GetBestOfLocalization: function (e) {
            var t = +e;
            switch (t) {
                case 0:
                    return;
                case 3:
                    return l.SB_BestOf3;
                case 5:
                    return l.SB_BestOf5;
                case 7:
                    return l.SB_BestOf7;
                default:
                    return l["SB_BestOf" + t]
            }
        },
        GetCurrentScore: function (e, t, i, a) {
            var s;
            return s = 3 == i ? "p" : 2 == i ? "ft" : t, (e = _.find(e, function (e) {
                return e.p == s
            })) ? a ? 3 == i && 1 == e.adv ? "A" : e.h : 3 == i && 0 == e.adv ? "A" : e.a : ""
        },
        GetSetScore: function (e, t) {
            return (e = _.find(e, function (e) {
                return e.p == t
            })) ? e.h + "-" + e.a : "-"
        },
        GetTotal: function (e, t, i) {
            var a;
            if (a = 3 == t ? "ftg" : "p", e = _.find(e, function (e) {
                    return e.p == a
                }), i) {
                var s = "";
                return e && (s = +e.h + +e.a), "(" + s + ")"
            }
            return e ? e.h + "-" + e.a : "-"
        },
        HideSetScore: function (e, t, i) {
            var a = +e.substr(1);
            if (isNaN(a) && "s" != e.substr(0)) return !0;
            if (3 == i) {
                if (a < t) return !0
            } else if (a <= t) return !0;
            return !1
        },
        GetEventIds: function (e) {
            var t = [];
            return e && e.length > 0 && _.forEach(e, function (e) {
                t.push(e.pk)
            }), _.uniq(t)
        },
        ShowSportContainer: function (e, t) {
            var i = !1;
            return e && e.length > 0 && _.forEach(e, function (e) {
                var a = t ? e.me : e.e;
                a && a.length > 0 && (i = !0)
            }), t || i ? i : this.isSportsEventAreToggedToMyEvent(e)
        },
        isSportsEventAreToggedToMyEvent: function (e) {
            var t = !0;
            return _.forEach(e, function (e) {
                var i = e.me;
                e.e.length > 0 && 0 == i.length && (t = !1)
            }), t
        },
        SetOddsTypeCss: function () {
            var e = "";
            3 == uv.ov && (e = "malayOdds"), 4 == uv.ov && (e = "indoOdds"), $("#sbody").removeClass("malayOdds indoOdds").addClass(e)
        }
    },
    om = {
        havePlayingBg: !1,
        havePlayingTv: !1,
        isPlayingCC: !1,
        isFoundBg: !1,
        isFoundTv: !1,
        prevLoadStartTime: null,
        isShowCountDown: !1,
        pagination: {
            $container: null,
            $btnNext: null,
            $btnPrev: null,
            $currPage: null,
            $maxPage: null,
            $pageBtn: null,
            $opt: null,
            $bkTop: null
        },
        tthi: 110,
        refresh: function () {
            var e = function () {
                    var e = (new Date).getTime();
                    null != om.prevLoadStartTime && e - om.prevLoadStartTime < 1e3 ? console.log("Subsequent odds refreshing calls cannot be made within 1 second.") : (om.prevLoadStartTime = e, cCtrl.loadRefresh())
                },
                t = function () {
                    om.versionUtil.resetVersion();
                    var e = cCtrl.getLocation(),
                        t = e.pathname + e.search;
                    isIE9AndBelow && (t = e.url.path + e.url.query), cCtrl.loadContent(t, !1, !0, null, !0)
                };
            return {
                process: function (i) {
                    try {
                        om.odds.removeUpDownIndicators(), o.hasMatch ? e() : t()
                    } catch (e) {
                        window.console && console.log("refresh:" + e.message)
                    }
                    i && i()
                }
            }
        }(),
        tryRelaodInplay: function () {
            for (var e = $("#s1 .timer"), t = 0; t < e.length; t++) {
                var i = e.eq(t).text();
                if ("" != i) {
                    var a = i.split(":")[0];
                    if (!isNaN(a) && a > om.ttih) {
                        location.reload();
                        break
                    }
                }
            }
        },
        canShowEpmBtnOrNot: function (e) {
            var t = location.pathname.split("/");
            return console.log("[canShowEpmBtnOrNot],enableEps:" + window.global.enableEPS + ", view:" + (MM.view === VIEW.PRESTART || MM.view === VIEW.STARTINGSOON) + ", isEPM:" + !MM.isEPM + ", urlArray:" + !(t.length >= 3 && "programme" === t[2]) + ", sportHasEpm:" + e), window.global.enableEPS && (MM.view === VIEW.PRESTART || MM.view === VIEW.STARTINGSOON) && !MM.isEPM && !(t.length >= 3 && "programme" === t[2]) && e
        },
        processData: function () {
            var e = function (n, r, l, d, p) {
                    var u, h = n && n.length >= 0 ? n[0] : n;
                    if (h) {
                        if (h.sportId && h.data) u = h.sportId, h = h.data;
                        else if (h.sportId) return r = i(h.sportId, d), o.hasMatch = !0, void e(n.length ? n.slice(1) : null, r, l, d, p);
                        if (_.isEmpty(h)) return r = i(u, d).remove(), om.versionUtil.removeSportVersion(u), void e(n.length ? n.slice(1) : null, r, l, d, p);
                        switch (l ? h.t : 1) {
                            case 1:
                                return o.param.SportName = h.n, h.d && (h = _.merge(h.d, _.omit(h, "d"))), void(h.c && h.c.length > 0 ? utility.template("OddsPage/" + h.tn, function (a) {
                                    h.isEuroOddsType = 1 == o.param.OddsType, h.isMyEvents = d;
                                    var c = a.process(h).replace(/>\s+</g, "><");
                                    if (l)
                                        if (r && 0 != r.length) {
                                            var u = r.next(),
                                                f = u.prop("id");
                                            u && u.length > 0 && f == (d ? "mesc" : "sc").concat(h.k) ? u[0].innerHTML = c : (i(h.k, d).remove(), (u = $(t(h.k, d, c))).insertAfter(r)), r = u
                                        } else i(h.k, d).remove(), r = $(t(h.k, d, c)), (d ? o.$myEventsContainer : o.$containerWrapper).prepend(r);
                                    else r.append(t(h.k, d, c));
                                    s(h, l, d), om.logUtil.logTime("SportOddsOM.js - rendering template - " + h.tn + " ,isMyEvents : " + d), h = null, c = null, o.hasMatch = !0, e(n.length ? n.slice(1) : null, r, l, d, p)
                                }, h.tn) : e(n.length ? n.slice(1) : null, r, l, d, p));
                            case 2:
                                if (o.hasMatch = !0, r = i(h.k, d), d) return;
                                return a(h, r), om.logUtil.logTime("SportOddsOM.js - process partial refresh with sport Id : " + h.k), om.versionUtil.updateVersion(h.k, h.v), e(n.length ? n.slice(1) : null, r, l, d, p), void(1 == o.param.IsInplay && 1 == h.k && om.tryRelaodInplay());
                            default:
                                return void e(n.length ? n.slice(1) : null, r, l, d, p)
                        }
                    } else {
                        o.hasMatch || oddsPage.showNoMatch();
                        var f = o.param.IsFirstLoad;
                        setTimeout(function () {
                            ScrollerBar.initScrollbarStatus(), f && ScrollerBar.scrollToTop()
                        }, 50), p && "function" == typeof p && p(), om.logUtil.logTotalTime("SportOddsOM.js - rendering finished"), oddsPage.showLoading(!1), cCtrl.isProcessing = !1, c(), n = null, r = null, p = null
                    }
                },
                t = function (e, t, i) {
                    return '<div class="container" id="' + (t ? "mesc" : "sc") + e + '" ' + (-1 != _.indexOf(o.netSports, e) ? "data-net" : "") + ">" + i + "</div>"
                },
                i = function (e, t) {
                    return (t ? o.$myEventsContainer : o.$containerWrapper).find((t ? "#mesc" : "#sc") + e)
                },
                a = function (e, t) {
                    for (var i = 0; i < e.d.length; i++) {
                        var a, s = e.d[i];
                        if (a = -1 != s[0].indexOf("rh") ? o.$mainOddsPanel.find("#ht" + s[0].substr(2)) : -1 != s[0].indexOf("ra") ? o.$mainOddsPanel.find("#at" + s[0].substr(2)) : 1 == e.k && -1 != s[0].indexOf("tm") ? o.$mainOddsPanel.find(".tm" + s[0].substr(2)) : 2 == e.k && -1 != s[0].indexOf("sb") ? o.$mainOddsPanel.find("#sh" + s[0].substr(2)) : o.$mainOddsPanel.find("#" + s[0])[0]) {
                            var n = $(a);
                            switch (s[0].substr(0, 2)) {
                                case "lt":
                                    "" == s[1] ? n.removeClass("btn-tv-ip") : n.addClass("btn-tv-ip");
                                    break;
                                case "sh":
                                case "sa":
                                    if (n.hasClass("fb")) {
                                        var r = s[0].substr(2, s[0].length - 1);
                                        $(("sh" == s[0].substr(0, 2) ? "#sa" : "#sh") + r).removeClass("fontWeight-bold"), n.html(s[1]).addClass("fontWeight-bold")
                                    } else n.html(s[1]);
                                    break;
                                case "ed":
                                case "et":
                                    $("div[id*='" + s[0] + "']").html(s[1]);
                                    break;
                                case "tm":
                                    var c = s[1].split("^");
                                    $.each(o.stateObjs.timers, function () {
                                        if (-1 != this.id.indexOf(s[0])) {
                                            !0;
                                            var t = c[1] && "" != c[1] ? c[1] : "";
                                            if ("" != t ? n.prev("span.period").text(2 == e.k ? l["sti" + t.toUpperCase()] : t).attr("title", oddsUtil.GetEventTimerTooltip(t)) : n.prev("span.period").text("").attr("title", ""), 2 == e.k);
                                            else if ("HT" == t || "Pens" == t)
                                                for (var i in o.stateObjs.times) {
                                                    if (o.stateObjs.times.hasOwnProperty(i))(u = o.stateObjs.times[i]).tm == this.id && (u.id = s[0], u.tmrText = "&nbsp;", u.s = null)
                                                } else {
                                                    var a = c[0].split(":");
                                                    if (2 != a.length) o.stateObjs.times[this.id] = {
                                                        id: s[0],
                                                        tmrText: c[0],
                                                        tm: s[0]
                                                    }, n.next().text("");
                                                    else {
                                                        a[0] = new Number(a[0]);
                                                        var r = new Number(a[1]),
                                                            d = new Number(a[0]);
                                                        if (r = r < 0 ? 0 : r, d = d < 0 ? 0 : d, 1 == e.k) {
                                                            var p = this.id;
                                                            for (var i in o.stateObjs.times) {
                                                                var u;
                                                                if (o.stateObjs.times.hasOwnProperty(i))(u = o.stateObjs.times[i]).tm == p && (u.id = s[0], u.m = d, u.s = r)
                                                            }
                                                        } else o.stateObjs.times[this.id] = {
                                                            id: s[0],
                                                            m: d,
                                                            s: r,
                                                            tm: s[0]
                                                        }
                                                    }
                                                }
                                            var h = $("#ex" + /\d+$/.exec(s[0])[0]);
                                            h.length > 0 && h[/et/i.test(t) ? "removeClass" : "addClass"]("hidden")
                                        }
                                    });
                                    break;
                                case "rh":
                                    var d = ".rh" + s[0].substr(2);
                                    o.$mainOddsPanel.find(d).removeClass(function () {
                                        var e = /rc[0-9]/g.exec($(this).attr("class"));
                                        return e ? e.join("") : ""
                                    }).addClass("rc" + s[1]);
                                    break;
                                case "ra":
                                    var p = ".ra" + s[0].substr(2);
                                    o.$mainOddsPanel.find(p).removeClass(function () {
                                        var e = /rc[0-9]/g.exec($(this).attr("class"));
                                        return e ? e.join("") : ""
                                    }).addClass("rc" + s[1]);
                                    break;
                                case "mb":
                                    n.html(s[1]);
                                    break;
                                case "fs":
                                    if ("" === s[1]) n.text("").parent().addClass("hidden");
                                    else {
                                        var u = s[1].split("|");
                                        n.length > 0 && n.text("(" + u[0] + "-" + u[1] + ")").parent().hasClass("hidden") && n.parent().removeClass("hidden")
                                    }
                                    break;
                                case "sb":
                                    var h;
                                    if (s[0].length > 0 && s[1]) {
                                        h = JSON.parse(s[1]);
                                        var f = e.k,
                                            m = h.k;
                                        if (2 == f) {
                                            n.text(oddsUtil.GetCurrentScore(h.ps, h.cp, f, !0)), $("#sa" + m).text(oddsUtil.GetCurrentScore(h.ps, h.cp, f, !1));
                                            h.ct && h.ct;
                                            var g = h.cp ? h.cp : "";
                                            $("#tm" + m).text(h.ct).prev("span.period").text(l["sti" + g.toUpperCase()]).attr("title", oddsUtil.GetEventTimerTooltip(g))
                                        } else {
                                            $("#ph" + m).text(oddsUtil.GetCurrentScore(h.ps, h.cp, f, !0)), $("#pa" + m).text(oddsUtil.GetCurrentScore(h.ps, h.cp, f, !1)), $("#svh" + m)[1 == h.s ? "addClass" : "removeClass"]("serve"), $("#sva" + m)[0 == h.s ? "addClass" : "removeClass"]("serve");
                                            var v = $("#" + h.cp + "-" + m),
                                                S = 3 == f ? v.text(oddsUtil.GetSetScore(h.ps, h.cp)).addClass("totalOrange").removeClass("hidden").siblings(".score").removeClass("totalOrange") : v.addClass("hidden").siblings(".score");
                                            0 == v.length && (S = $("#" + s[0]).find(".score").removeClass("totalOrange")), _.forEach(S, function (e) {
                                                var t = e.id.split("-")[0];
                                                oddsUtil.HideSetScore(h.cp, t.substr(1), f) ? $(e).addClass("hidden") : $(e).text(oddsUtil.GetSetScore(h.ps, t)).removeClass("hidden")
                                            }), $("#total" + m).text(oddsUtil.GetTotal(h.ps, f, !1)), $("#sum" + m).text(oddsUtil.GetTotal(h.ps, f, !0))
                                        }
                                    }
                                    break;
                                default:
                                    var T = oddsUtil.getValueIndicator(parseFloat(a.innerHTML), parseFloat(s[1]));
                                    !n.hasClass("odds") && !n.hasClass("netOdds") || n.hasClass("closed") || (1 == T ? (om.odds.removeUpDownObjById(a.id), o.stateObjs.$upObjs.push(a)) : 2 == T && (om.odds.removeUpDownObjById(a.id), o.stateObjs.$downObjs.push(a)));
                                    var b = n.prev("span.ou").attr("ou"),
                                        E = b ? b.toLowerCase() : "",
                                        C = o.$myEventsContainer.find("#s" + e.k);
                                    if (C.length > 0 && (t = t.add(C)), "o" == E || "u" == E) t.data("net") ? t.find("span[id='" + s[0] + "']").html(s[1].replace("+", "")) : n.html(s[1].replace("+", ""));
                                    else if ("h" == n.attr("id").substr(0, 1)) {
                                        var y;
                                        (y = t.data("net") ? t.find("div[id='" + s[0] + "']") : n).attr("hdp", s[1]), n.hasClass("hidden") || (1 == o.param.OddsType ? y.html(s[1]) : y.html(s[1].replace("+", "").replace("-", "")))
                                    } else n.hasClass("locked") || n.html(s[1]);
                                    n && n.html() && n.length > 0 && (parseFloat(a.innerHTML) > 0 ? n.removeClass("negOdds") : n.addClass("negOdds"))
                            }
                        }
                    }
                    e = null, t = null, C = null
                },
                s = function (e, t, i) {
                    var a = e.k;
                    t && !i && om.odds.getUpDownIndicators(e), o.param.IsInplay && !om.isFoundBg && om.findTheFirstAvaiableBg(e);
                    var s = o.param.IsInplay ? l.ip.toUpperCase() : e.n;
                    if (OddsHeader.resetSportText(s), OddsHeader.initFilterButton(a), om.timerUtil.init(), 1 != a || o.param.IsInplay || "Competition" == o.param.Tab || o.$mainOddsPanel.find(".competitionName:gt(19)").removeClass("expand").next(".event-container").hide(), om.state.maintainCollExpandCompState(a), om.state.maintainCollExpandChildState(a), om.versionUtil.updateVersion(a, e.v), "or" == o.param.UIBetType) {
                        var n = cCtrl.queryStrings.sid,
                            r = $("#o" + n);
                        r.length > 0 && r.trigger("click")
                    }
                    e = null
                },
                n = function () {
                    myEvents.init(o.param.IsInplay), om.odds.reSelectedOdds(), "False" == ltEn && o.$mainOddsPanel.find("a.btn-tv-ip").addClass("hidden"), "False" == staEn && o.$mainOddsPanel.find("a.btn-stats").addClass("hidden"), o.param.IsInplay ? liveCentreControl.checkPlayingEvent() : Action.RightPanel.TV.resetToDefault();
                    var e = setInterval(function () {
                        window.global.enableLiveFeed ? 1 == mpc.pv && (om.playCC(), clearInterval(e)) : "undefined" != typeof scorecentre && 0 != mpc.pv && 1 == mpc.pv && (om.playCC(), clearInterval(e))
                    }, 1e3);
                    om.timerUtil.setTimer(), OddsHeader.competitionMenu().count(), o.param.IsFirstLoad = !1
                },
                r = function () {
                    om.odds.reSelectedOdds(), om.odds.highlightOdds(), o.param.IsInplay && myEvents.refresh()
                },
                c = function () {
                    "ftahou" == o.param.UIBetType ? $("#ddlMarket").removeClass("hidden") : $("#ddlMarket").addClass("hidden")
                },
                d = function () {
                    if (o.param.IsInplay) om.pagination.$container && om.pagination.$container.addClass("hidden");
                    else {
                        var e = om.pagination;
                        e.$container || (e.$container = $("#pagination"), e.$btnPrev = $("#p-prev"), e.$btnNext = $("#p-next"), e.$currPage = $("#p-current-page"), e.$maxPage = $("#p-max-page"), e.$opt = $("#p-options"), e.$pageBtn = $("#p-pg-btn"), e.$bkTop = $("#p-top")), !o.totalPages || o.totalPages <= 1 ? e.$container.addClass("hidden") : (e.$container.removeClass("hidden"), e.$currPage.text(o.param.PageNo + 1), e.$maxPage.text(o.totalPages)), e.$bkTop.on("click", function () {
                            ScrollerBar.scrollToTop()
                        });
                        var t = e.$opt.find("ul");
                        t.empty();
                        for (var i = new StringBuilderEx, a = 0; a < o.totalPages; a++) {
                            var s = a == o.param.PageNo,
                                n = a + 1 + " / " + o.totalPages,
                                r = "<li" + (s ? " class=actived" : "") + " data-val=" + a + ">";
                            i.append(r), i.append(n), i.append("</li>"), t.html(i.toString())
                        }
                        t.unbind("click").on("click", "li", function (t) {
                            var i = $(this).data("val"),
                                a = parseInt(i, 10) + 1;
                            e.$pageBtn.toggleClass("collapsed"), p(a), t.stopPropagation()
                        }), e.$pageBtn.unbind("click").on("click", function (e) {
                            $(this).toggleClass("collapsed"), OddsHeader.hideAllDDL(this), e.stopPropagation()
                        }), parseInt(o.param.PageNo, 10) + 2 > o.totalPages ? e.$btnNext.addClass("disabled").unbind("click") : e.$btnNext.removeClass("disabled").unbind("click").click(function (t) {
                            var i = isNaN(parseInt(o.param.PageNo, 10)) ? 1 : parseInt(o.param.PageNo, 10) + 1,
                                a = parseInt(i, 10) + 1;
                            e.$pageBtn.addClass("collapsed"), p(a), t.stopPropagation()
                        }), parseInt(o.param.PageNo, 10) <= 0 ? e.$btnPrev.addClass("disabled").unbind("click") : e.$btnPrev.removeClass("disabled").unbind("click").click(function (t) {
                            var i = isNaN(parseInt(o.param.PageNo, 10)) ? 1 : parseInt(o.param.PageNo, 10) + 1,
                                a = parseInt(i, 10) - 1;
                            e.$pageBtn.addClass("collapsed"), p(a), t.stopPropagation()
                        })
                    }
                },
                p = function (e) {
                    var t = cCtrl.getLocation(),
                        i = t.pathname,
                        a = t.search;
                    if (isIE9AndBelow && (i = t.url.path, a = t.url.query), a.length) {
                        for (var s = a.slice(1).split("&"), n = "?", o = 0; o < s.length; o++) - 1 == s[o].indexOf("pageno") && (n = n + s[o] + "&");
                        a = n + "pageno=" + e
                    } else a = "?pageno=" + e;
                    var r = i;
                    r += a, cCtrl.loadContent(r, !0, !0)
                };
            return {
                loadAsync: function (t) {
                    if (om.tthi = t.tthi, 0 == t.ec) return i = MM.view === VIEW.PARLAY ? "/" + global.lan + "/sports/parlay" : "/" + global.lan + "/sports", void cCtrl.loadContent(i, !0);
                    var i, a = t.d,
                        s = !1;
                    if (t.d instanceof Array) {
                        a = t.d[0];
                        for (var r = 0; r < t.d.length; r++)
                            if (null != t.d[r].c && t.d[r].c.length > 0) {
                                s = !0;
                                break
                            }
                    }
                    if (void 0 !== a && void 0 === a.c && 2 == selobj.favT) return i = MM.view === VIEW.PARLAY ? "/" + global.lan + "/sports/parlay/" + selobj.sptn : "/" + global.lan + "/sports/" + selobj.sptn, void cCtrl.loadContent(i, !0, !0);
                    if ((null == a || !s) && "" != selobj.cids) return i = MM.view === VIEW.PARLAY ? "/" + global.lan + "/sports/parlay/" + selobj.sptn : "/" + global.lan + "/sports/" + selobj.sptn, void setTimeout(function () {
                        cCtrl.isProcessing = !1, cCtrl.loadContent(i, !0, !0, null, !0)
                    }, cCtrl.spanSec);
                    if (oddsPage.initParams(), o.vars.maxTimer = t.r, o.stateObjs.bts = t.bt, o.param.IsInplay ? o.$centerPanel.addClass("inplay").removeClass("non-inplay") : o.$centerPanel.addClass("non-inplay").removeClass("inplay"), null == t.d || !s) {
                        var c = o.param.IsInplay ? l.ip.toUpperCase() : t.d ? _.isArray(t.d) ? t.d[0].n : t.d.n : "";
                        return OddsHeader.resetSportText(c), myEvents.init(o.param.IsInplay), oddsPage.showNoMatch(t.d && t.d.c ? t.d[0].n : ""), oddsPage.showLoading(!1), cCtrl.isProcessing = !1, void om.timerUtil.setTimer()
                    }
                    o.$containerWrapper[0].innerHTML = "", o.$myEventsContainer[0].innerHTML = "", om.logUtil.startTicker(), o.param.IsInplay && e(t.d, o.$myEventsContainer, !1, !0), e(t.d, o.$containerWrapper, !1, !1, n), d(), OddsHeader.reInitHeaderDDLs(), "Popular" == o.param.Tab ? o.$containerWrapper.addClass("startingsoon") : o.$containerWrapper.removeClass("startingsoon")
                },
                refreshAsync: function (t) {
                    if (!t || !t.d) return oddsPage.showLoading(!1), void(cCtrl.isProcessing = !1);
                    var i = !0;
                    if (t.d instanceof Array)
                        for (var a = 0; a < t.d.length; a++)
                            if (1 == t.t && !t.d[a].c) {
                                i = !1;
                                break
                            }
                    if (!i) {
                        var s = cCtrl.getLocation(),
                            n = s.pathname + s.search;
                        isIE9AndBelow && (n = s.url.path + s.url.query), cCtrl.loadContent(n, !1, !0, null, !0)
                    }
                    o.stateObjs.bts = t.bt, o.hasMatch = !1, om.logUtil.startTicker(), _.isPlainObject(t.d) && _.merge(t.d, _.omit(t, "d"));
                    var l = 2 == t.t ? t : t.d;
                    o.param.IsInplay && e(l, null, !0, !0), e(l, null, !0, !1, r)
                }
            }
        }(),
        odds: {
            getUpDownIndicators: function (e) {
                if (null != e.hd && void 0 !== e.hd)
                    for (var t = 0; t < e.hd.length; t++) {
                        var i = document.getElementById(e.hd[t]),
                            a = $(i);
                        i && a.html() && !a.hasClass("closed") && o.stateObjs.$downObjs.push(i)
                    }
                if (null != e.hu && void 0 !== e.hu)
                    for (t = 0; t < e.hu.length; t++) i = document.getElementById(e.hu[t]), a = $(i), i && a.html() && !a.hasClass("closed") && o.stateObjs.$upObjs.push(i)
            },
            removeUpDownIndicators: function () {
                o.stateObjs.$upObjs.each(function (e, t) {
                    null != t && ($(t).hasClass("netOdds") ? o.$mainOddsPanel.find("#" + t.id).parent().parent().removeClass("oddsUp") : o.$mainOddsPanel.find("#" + t.id).parent().removeClass("oddsUp"))
                }), o.stateObjs.$downObjs.each(function (e, t) {
                    null != t && ($(t).hasClass("netOdds") ? o.$mainOddsPanel.find("#" + t.id).parent().parent().removeClass("oddsDown") : o.$mainOddsPanel.find("#" + t.id).parent().removeClass("oddsDown"))
                }), o.stateObjs.$upObjs = $([]), o.stateObjs.$downObjs = $([])
            },
            removeUpDownObjById: function (e) {
                var t = -1;
                o.stateObjs.$upObjs.each(function (i, a) {
                    null != a && a.id == e && (t = i)
                }), t >= 0 && o.stateObjs.$upObjs.splice(t, 1), t = -1, o.stateObjs.$downObjs.each(function (i, a) {
                    null != a && a.id == e && (t = i)
                }), t >= 0 && o.stateObjs.$downObjs.splice(t, 1)
            },
            highlightOdds: function () {
                o.stateObjs.$upObjs.length > 0 && o.stateObjs.$upObjs.each(function (e, t) {
                    null != t && ($(t).hasClass("netOdds") ? o.$mainOddsPanel.find("#" + t.id).parent().parent().addClass("oddsUp") : o.$mainOddsPanel.find("#" + t.id).parent().addClass("oddsUp"))
                }), o.stateObjs.$downObjs.length > 0 && o.stateObjs.$downObjs.each(function (e, t) {
                    null != t && ($(t).hasClass("netOdds") ? o.$mainOddsPanel.find("#" + t.id).parent().parent().addClass("oddsDown") : o.$mainOddsPanel.find("#" + t.id).parent().addClass("oddsDown"))
                })
            },
            reSelectedOdds: function (e) {
                e || (e = opSetting.GetHighlightIds());
                for (var t = e.length, i = 0; i < t; ++i) {
                    var a = e[i];
                    $o = o.$mainOddsPanel.find("#o" + a), $o.length > 0 && $o.parents("td").addClass("selected"), $o = o.$mainOddsPanel.find(".secondRow #o" + a), $o.length > 0 && $o.parents("td").addClass("selected")
                }
            }
        },
        state: function () {
            var e = function (e, t) {
                for (; e.hasClass("event");) t ? e.removeClass("hidden") : e.addClass("hidden"), e = e.next()
            };
            return {
                maintainCollExpandCompState: function (e) {
                    var t = o.$containerWrapper.find("#sc" + e);
                    _.forEach(o.stateObjs.$collapsedObjs, function (e) {
                        t.find("#" + e).removeClass("expand");
                        var i = -1 != e.indexOf("st") ? e.replace("st", "s") : e.replace("ct", "c");
                        o.$containerWrapper.find("#" + i).hide()
                    }), _.forEach(o.stateObjs.$expandObjs, function (e) {
                        t.find("#" + e).addClass("expand");
                        var i = -1 != e.indexOf("st") ? e.replace("st", "s") : e.replace("ct", "c");
                        o.$containerWrapper.find("#" + i).show()
                    })
                },
                maintainCollExpandChildState: function (t) {
                    1 == t && ($.each(o.stateObjs.$collapsedObjsChild, function (t, i) {
                        var a = $("#" + i).parent().next();
                        e(a, !1)
                    }), $.each(o.stateObjs.$expandObjsChild, function (t, i) {
                        var a = $("#" + i).parent().next();
                        e(a, !0)
                    }))
                },
                showHideChildEvt: e
            }
        }(),
        timerUtil: function () {
            var e = function () {
                    o.mainIntervalId && (window.clearInterval(o.mainIntervalId), o.mainIntervalId = null)
                },
                t = function (e) {
                    if (e) return null != e.s ? (e.s += 1, 60 == e.s && (e.m += 1, e.s = 0), (e.m < 10 ? "0" + e.m : e.m) + ":" + (e.s < 10 ? "0" + e.s : e.s)) : void 0 !== e.tmrText && null != e.tmrText ? e.tmrText : e
                };
            return {
                setTimer: function () {
                    if (o.param.IsFirstLoad) {
                        e();
                        var i = o.vars.maxTimer;
                        o.vars.timer = i, om.isShowCountDown && o.$rtimer.text(o.vars.timer < 10 ? "0" + o.vars.timer : o.vars.timer), o.mainIntervalId = setInterval(function () {
                            var e = o.vars.timer--;
                            om.isShowCountDown && o.$rtimer.text(e), document.title = document.title.split("-")[0] + " - " + e, i - e == 5 && om.odds.removeUpDownIndicators(), e <= 0 && om.refresh.process(function () {
                                o.vars.timer = i, om.isShowCountDown && o.$rtimer.text(e)
                            }), o.param.IsInplay && $.each(o.stateObjs.timers, function () {
                                var e = t(o.stateObjs.times[this.id]);
                                this.innerHTML = e
                            })
                        }, 1e3)
                    } else o.vars.timer = o.vars.maxTimer
                },
                clearTimer: e,
                init: function () {
                    o.stateObjs.times = [], o.stateObjs.timers = [], o.param.IsInplay && (o.stateObjs.timers = o.$mainOddsPanel.find("span.timer"), $.each(o.stateObjs.timers, function () {
                        var e = $(this),
                            t = e.attr("class").split(" ")[1];
                        if ("45:00" == this.innerHTML && "HT" == e.next().text()) o.stateObjs.times[this.id] = {
                            id: this.id,
                            tmrText: "45:00",
                            tm: t
                        };
                        else {
                            var i = this.innerHTML.split(":");
                            if (2 != i.length || e.hasClass("static")) o.stateObjs.times[this.id] = {
                                id: this.id,
                                tmrText: this.innerHTML,
                                tm: t
                            };
                            else {
                                i[0] = Math.abs(i[0]), i[1] = Math.abs(i[1]);
                                var a = {
                                    id: this.id,
                                    m: new Number(i[0]),
                                    s: new Number(i[1]),
                                    tm: t
                                };
                                o.stateObjs.times[this.id] = a
                            }
                        }
                    }))
                }
            }
        }(),
        logUtil: function () {
            var e, t;
            return {
                startTicker: function () {
                    e = t = (new Date).getTime()
                },
                logTime: function (t) {
                    var i, a;
                    t && console.log(t.concat(" - ", (i = (new Date).getTime(), a = i - e, e = i, a), " ms"))
                },
                logTotalTime: function (e) {
                    e && console.log(e.concat(" - ", (new Date).getTime() - t, " ms"))
                }
            }
        }(),
        versionUtil: function () {
            var e = {};
            return {
                updateVersion: function (t, i) {
                    var a = t + "," + i;
                    e["s" + t] = a
                },
                removeSportVersion: function (t) {
                    delete e["s" + t]
                },
                resetVersion: function () {
                    e = {}
                },
                getVersion: function () {
                    if (_.isEmpty(e)) return null;
                    var t = "";
                    return 1 != _.size(e) || o.param.IsInplayAll ? (_.forIn(e, function (e, i) {
                        t += e.concat("|")
                    }), t = t.slice(0, -1)) : t = (t = e[Object.keys(e)[0]]).split(",")[1], t
                }
            }
        }(),
        handler: function () {
            var e = function (e, t) {
                $.each(e, function (i, a) {
                    a == t && e.splice(i, 1)
                })
            };
            return {
                oddsContainerClicked: function (t) {
                    var i = $(t.target) || $(t.srcElement);
                    if (i.hasClass("icon-Stats")) {
                        var a = i.hasClass("icon-Stats") ? utility.parsePopupInfo("popup-new w1065 h790") : utility.parsePopupInfo("popup-new w810 h560"),
                            s = screen.width / 2 - a.width / 2,
                            n = screen.height / 2 - a.height / 2 * 1.1,
                            r = "center=yes,resizable=" + (i.hasClass("tvip") ? "no" : "yes") + ",scrollbars=yes,  width=" + a.width + ", height=" + a.height + ",left=" + s + ",top=" + n,
                            l = "";
                        l = pm.parentOrLocalHost() + "/" + global.lan + "/live-streaming", l += i.attr("url").split("/live-streaming")[1];
                        var c = i.hasClass("tvip") ? "stream" : "_blank";
                        window.open(i.attr("url"), c, r), t.stopPropagation(), t.preventDefault()
                    } else {
                        if (i.hasClass("btn-mb")) return void $("#view-setting").hide();
                        if (i.hasClass("bg")) {
                            if (uv.cdbg && void 0 != (g = i.attr("cc-info")) && "" != g && null != g) {
                                var d = (v = g.split("|"))[0],
                                    p = v[1],
                                    u = v[2],
                                    h = v[3],
                                    f = v[4],
                                    m = v[5];
                                liveCentreControl.playIgnoreLock(d, p, u, h, f, m, uv.login), lockInfo.isLock && liveCentreControl.saveLockInfo(d, p, u, h, ccparam.lang, f, m)
                            }
                            return
                        }
                        if (i.hasClass("tvip")) {
                            var g, v;
                            if (uv.cdbg && i.hasClass("bgs")) {
                                if (void 0 != (g = i.attr("cc-info")) && "" != g && null != g) d = (v = g.split("|"))[0], p = v[1], u = v[2], h = v[3], f = v[4], m = v[5], Action.RightPanel.TV.playTvIgnoreLock(d, p, u, h, f, m, uv.login), lockInfo.isLock && liveCentreControl.saveLockInfo(d, p, u, h, ccparam.lang, f, m)
                            } else a = utility.parsePopupInfo("popup-new w810 h598"), s = screen.width / 2 - a.width / 2, n = screen.height / 2 - a.height / 2, r = "center=yes,resizable=" + (i.hasClass("tvip") ? "no" : "yes") + ",scrollbars=yes,  width=" + a.width + ", height=" + a.height + ",left=" + s + ",top=" + n, l = "", l = pm.parentOrLocalHost() + "/" + global.lan + "/live-streaming", l += i.attr("url").split("/live-streaming")[1], c = i.hasClass("tvip") ? "stream" : "_blank", window.open(l, c, r), t.stopPropagation(), t.preventDefault();
                            return
                        }
                        if (i.hasClass("fve")) myEvents.toggleMyEventsByEvent(i);
                        else if (i.hasClass("fvc")) myEvents.toggleMyEventsByCompetition(i);
                        else {
                            if (i.hasClass("comp-fav")) {
                                var S = i.hasClass("cpIcon") ? i : i.parent(),
                                    T = S.attr("id").substr(2);
                                return Action.LeftPanel.MyCompetition.toggle({
                                    sid: o.param.SportId,
                                    sn: o.param.SportName,
                                    cid: +T,
                                    cn: S.parent().prev().text().trim()
                                }), !1
                            }
                            if (i.hasClass("childExp") || i.hasClass("icon-ArrowUp") || i.hasClass("icon-ArrowDown")) {
                                if (!o.vars.isCollapsing) {
                                    o.vars.isCollapsing = !0;
                                    var b = i.parents(".childTitle"),
                                        E = b.parent();
                                    if (y = b.attr("id"), b.hasClass("collapsed")) {
                                        b.removeClass("collapsed");
                                        var C = E.next();
                                        om.state.showHideChildEvt(C, !0), setTimeout(function () {
                                            ScrollerBar.initScrollbarStatus()
                                        }, 100), e(o.stateObjs.$collapsedObjsChild, y), o.stateObjs.$expandObjsChild.push(y)
                                    } else b.addClass("collapsed"), C = E.next(), om.state.showHideChildEvt(C, !1), setTimeout(function () {
                                        ScrollerBar.initScrollbarStatus()
                                    }, 100), o.stateObjs.$collapsedObjsChild.push(y), e(o.stateObjs.$expandObjsChild, y);
                                    o.vars.isCollapsing = !1
                                }
                            } else if (i.hasClass("btn-toggle") || i.hasClass("toggle-arrow")) {
                                if (!o.vars.isCollapsing && (o.vars.isCollapsing = !0, i.hasClass("child"))) {
                                    var _ = i.parents(".child-title"),
                                        y = (w = i.closest("span.btn-toggle")).attr("id"),
                                        O = i.closest("tbody");
                                    w.hasClass("expand") ? (_.nextAll().hide(), O.nextUntil(".firstEvt"), o.stateObjs.$collapsedObjsChild.push(y), om.removeFromArray(o.stateObjs.$expandObjsChild, y), w.removeClass("expand"), o.vars.isCollapsing = !1) : (_.nextAll().show(), O.nextUntil(".firstEvt"), om.removeFromArray(o.stateObjs.$collapsedObjsChild, y), o.stateObjs.$expandObjsChild.push(y), w.addClass("expand"), o.vars.isCollapsing = !1)
                                }
                            } else if ((i.hasClass("competitionName") || i.hasClass("tableContainer") || i.hasClass("cpn")) && !o.vars.isCollapsing) {
                                o.vars.isCollapsing = !0;
                                var w, A = -1 !== window.location.pathname.indexOf("epm"),
                                    k = (y = (w = i.closest(".competitionName")).attr("id"), A ? w.closest("table") : w);
                                w.hasClass("expand") ? (w.removeClass("expand"), o.stateObjs.$collapsedObjs.push(y), e(o.stateObjs.$expandObjs, y), k.next().hide("blind", function () {
                                    o.vars.isCollapsing = !1, ScrollerBar.initScrollbarStatus()
                                })) : (w.addClass("expand"), e(o.stateObjs.$collapsedObjs, y), o.stateObjs.$expandObjs.push(y), k.next().show("blind", function () {
                                    o.vars.isCollapsing = !1, ScrollerBar.initScrollbarStatus()
                                }))
                            }
                        }
                    }
                },
                oddsClicked: function (e) {
                    var t, i = $(this);
                    if (i.hasClass("net") && (i = i.children().last()), "" != (t = i.html())) {
                        var a = i.attr("id");
                        if (void 0 != a && "" != a) {
                            var s = i.parents("div.event"),
                                n = s.attr("id"),
                                r = s.attr("pid");
                            if (s.attr("ctid") == window.o.pacType.pelAH) {
                                var l = i.parent().parent();
                                (l.hasClass("td-odds-ou-odds") || l.hasClass("td-odds-ouSecond-odds")) && ($evts = s.nextUntil(".hidden"), 0 === $evts.length ? n = s.next().attr("id") : void 0 === (n = $evts.last().next().attr("id")) && (n = s.attr("id")))
                            }
                            n = n.substring(1);
                            var c = "";
                            i.parent().parent().hasClass("td-odds-teamOu-odds") && (c = n, n = i.parents("tr").attr("tid").substring(1));
                            var d = o.$mainOddsPanel.find("#" + a.replace("o", "h")).attr("hdp");
                            "" != d && void 0 != d || (d = null), n && -1 != n.indexOf("_") && o.param.IsInplay && (n = n.split("_")[0]);
                            var p = "" == c ? o.$mainOddsPanel.find("#sh" + n) : o.$mainOddsPanel.find("#sh" + c),
                                u = "" == c ? o.$mainOddsPanel.find("#sa" + n) : o.$mainOddsPanel.find("#sa" + c),
                                h = (void 0 === p.html() ? null : p.html()) + ":" + (void 0 === u.html() ? null : u.html()); - 1 != n.indexOf("_") && (n = n.substring(0, n.indexOf("_"))), i.parents("td").addClass("selected");
                            var f = i.closest("tr").next(".secondRow");
                            if (f.length > 0) f.find("#" + i.attr("id")).parents("td").addClass("selected");
                            else {
                                var m = i.closest("tr");
                                m.length > 0 && m.hasClass("secondRow") && m.prev("tr").find("#" + i.attr("id")).parents("td").addClass("selected")
                            }
                            Action.RightPanel.addSelection(a.substring(1), n, t, d, h, o.param.IsInplay, r), e.stopPropagation()
                        }
                    }
                },
                allMarketsClicked: function (e) {
                    var t = $(this).parents(".event"),
                        i = t.attr("pid");
                    i && 0 != i || (i = t.prop("id").substring(1));
                    var a = $("#en" + i).val(),
                        s = VIEW.PRESTART;
                    "Inplay" == o.param.Tab ? s = VIEW.INPLAY : "Popular" == o.param.Tab && (s = VIEW.STARTINGSOON), Action.event(i, s, a), e.stopPropagation()
                },
                contextmenuClicked: function (e) {
                    var t = $(this).parents(".event"),
                        i = t.attr("pid");
                    i && 0 != i || (i = t.prop("id").substring(1));
                    var a = $("#en" + i).val(),
                        s = VIEW.PRESTART;
                    return "Inplay" == o.param.Tab ? s = VIEW.INPLAY : "Popular" == o.param.Tab && (s = VIEW.STARTINGSOON), Action.eventRightCick(i, s, a), !1
                },
                epsClicked: function (e) {
                    var t = $(this).parents(".event"),
                        i = t.attr("pid");
                    i && 0 != i || (i = t.prop("id").substring(1));
                    var a = $("#en" + i).val(),
                        s = VIEW.PRESTART;
                    Action.event(i, s, a), e.stopPropagation()
                },
                selectionHover: function (e) {
                    var t = $(this).parents("tbody").find(".td-teameName").addClass("darkerHover").end().data("amkt");
                    o.$mainOddsPanel.find("#" + t).addClass("hover"), e.stopPropagation()
                },
                selectionLeave: function (e) {
                    var t = $(this).parents("tbody").find(".td-teameName").removeClass("darkerHover").end().data("amkt");
                    o.$mainOddsPanel.find("#" + t).removeClass("hover"), e.stopPropagation()
                },
                epmInfoHover: function (e) {
                    $(this).parent("td").find(".overlayContainer").removeClass("hidden"), e.stopPropagation()
                },
                epmInfoLeave: function (e) {
                    $(this).parent("td").find(".overlayContainer").addClass("hidden"), e.stopPropagation()
                }
            }
        }(),
        filter: {
            isSelectedFilterType: function (e) {
                var t = utility.cookie.read(o.FILTER_TYPE);
                if (t && t.length > 0) {
                    var i = t.split(",");
                    if (-1 != $.inArray(e, i)) return !0
                }
                return !1
            },
            isUnselectedFilterType: function (e) {
                return om.filter.isSelectedFilterType("-" + e)
            },
            addFilterTypeToCookie: function (e) {
                var t = utility.cookie.read(o.FILTER_TYPE);
                if (t && t.length > 0) {
                    var i = t.split(",");
                    t = _.union(i, [e]).join(",")
                } else t = e;
                utility.cookie.write(o.FILTER_TYPE, t, 730)
            },
            removeFilterTypeFromCookie: function (e) {
                var t = utility.cookie.read(o.FILTER_TYPE);
                if (t && t.length > 0) {
                    var i = t.split(",");
                    _.remove(i, function (t) {
                        return t == e
                    }), utility.cookie.write(o.FILTER_TYPE, i.join(","), 730)
                }
            },
            activateFilter: function (e) {
                om.filter.removeFilterTypeFromCookie("-" + e), om.filter.addFilterTypeToCookie(e)
            },
            inactivateFilter: function (e) {
                om.filter.removeFilterTypeFromCookie(e), om.filter.addFilterTypeToCookie("-" + e)
            }
        },
        findTheFirstAvaiableBg: function (e) {
            var t, i = null,
                a = !1;
            if (e.c && e.c.length > 0)
                for (var s = 0; s < e.c.length && !a; s++)
                    for (var n = e.c[s].e, o = 0; o < n.length; o++)
                        if ((i = n[o]).ibs && i.ibsc) {
                            a = !0;
                            break
                        }
            a ? (t = 0 == i.cei.ctid ? i.k : i.pk, om.isFoundBg = !0, liveCentreControl.saveDefaultBgInfo(t, i.i[0], i.i[1], e.k, global.lan, i.i[7], i.pvdr)) : (liveCentreControl.clearDefaultBgInfo(), "" == ccparam.playingLsId && (ccparam.playingEventId = ""))
        },
        playCC: function () {
            o.param.IsInplay && Action.RightPanel.TV.playTvDefault(function (e) {
                if (e) {
                    if (om.isPlayingCC = !0, om.havePlayingTv = !0, !om.isFoundBg)(t = liveCentreControl.getDefaultBgInfo()) && liveCentreControl.clearDefaultBgInfo()
                } else {
                    om.isFoundTv = !1;
                    var t = liveCentreControl.getDefaultBgInfo();
                    if (!om.isFoundBg) return t && void 0 !== t && liveCentreControl.clearDefaultBgInfo(), om.isPlayingCC = !1, liveCentreControl.clearMbInfo(!1), void liveCentreControl.showErrorMsg();
                    if (om.isFoundBg) {
                        if (om.isPlayingCC) return void(liveCentreControl.getEnlargeStatus() && setTimeout(function () {
                            Action.RightPanel.resize(!0)
                        }, 500));
                        t && void 0 !== t && (uv.login ? utility.service("LiveTv", "GetLiveEventDetails", {
                            Date: "",
                            SportId: t.sportId,
                            IsCheckUserCanSeeTv: !0
                        }, "GET", function (e) {
                            var i = t.playingLsId;
                            e.stv || (i = ""), liveCentreControl.create(t.playingEventId, t.hTeamName, t.aTeamName, t.sportId, global.lan, i, t.videoProvider), om.isPlayingCC = !0
                        }) : om.isPlayingCC || (liveCentreControl.create(t.playingEventId, t.hTeamName, t.aTeamName, t.sportId, global.lan, "", t.videoProvider), om.isPlayingCC = !0), om.havePlayingBg = !0)
                    }
                }
                om.havePlayingBg || om.havePlayingTv || ccparam.isHideErrorMsg && (liveCentreControl.hideErrorMsg(), om.isPlayingCC = !1), om.isPlayingCC && liveCentreControl.getEnlargeStatus() && setTimeout(function () {
                    Action.RightPanel.resize(!0)
                }, 500)
            })
        }
    };
$(function () {
    o.$mainOddsPanel.on("click", "div.container", om.handler.oddsContainerClicked).on("click", ".odds", om.handler.oddsClicked).on("click", ".amkt", om.handler.allMarketsClicked).on("contextmenu", ".amkt", om.handler.contextmenuClicked).on("click", ".epsbanner", om.handler.epsClicked).on("mouseenter", ".h-amkt", om.handler.selectionHover).on("mouseleave", ".h-amkt", om.handler.selectionLeave).on("mouseenter", ".icon-i-s", om.handler.epmInfoHover).on("mouseleave", ".icon-i-s", om.handler.epmInfoLeave)
});
var myEvents = function () {
    var e = $("#myEventTitle"),
        t = $("#myEventCount"),
        i = $($("#myEventsEmptyMsg").text()),
        a = function (e) {
            var t, i = e.parent(),
                a = e.data("meinfo").split("_"),
                s = a[0],
                l = a[1];
            if (i.hasClass("actived")) {
                var h = 0 == o.$containerWrapper.find("#" + l + " .event").length;
                t = d(l, !0), h ? u(s, l) : _.forEach(t, function (e) {
                    n(s, l, e, o.$containerWrapper, o.$myEventsContainer, !1)
                }), c(t)
            } else {
                h = 0 == o.$myEventsContainer.find("#" + l + " .event").length;
                t = d(l, !1), h ? p(s, l) : _.forEach(t, function (e) {
                    n(s, l, e, o.$myEventsContainer, o.$containerWrapper, !0)
                }), r(t)
            }
            e = null
        },
        s = function (e, t) {
            var i = e.parent(),
                a = e.data("meinfo").split("_"),
                s = a[0],
                d = a[1],
                p = +a[2];
            i.hasClass("actived") ? (n(s, d, p, o.$containerWrapper, o.$myEventsContainer, !1), c(p, t), e.attr("title", l.OP_AddMyEvents)) : (n(s, d, p, o.$myEventsContainer, o.$containerWrapper, !0), r(p)), e = null
        },
        n = function (e, t, i, a, s, n) {
            var o = a.find("#" + t + " .ec"),
                r = o.children(),
                c = s.find("#" + t + " .ec"),
                d = m(t);
            if (r.length > 0) {
                var p = c.find('.event[pid="' + i + '"]').detach().find(".myFavorite")[n ? "addClass" : "removeClass"]("actived").children().attr("title", n ? l.OP_RemoveMyEvents : l.OP_AddMyEvents).end().end();
                d && (_.forEach(p, function (e) {
                    h($(e), r)
                }), o.html(r))
            } else {
                if (d) {
                    var u = c.find('.event[pid="' + i + '"]').prevAll(".child").addBack().clone().find(".myFavorite")[n ? "addClass" : "removeClass"]("actived").children().attr("title", n ? l.OP_RemoveMyEvents : l.OP_AddMyEvents).end().end(),
                        S = u.map(function () {
                            var e = $(this),
                                t = e.data("gtid");
                            if (e.hasClass("event") && !_.isUndefined(t)) return "gt" + t
                        });
                    _.remove(u, function (e) {
                        return !$(e).hasClass("event") && -1 == _.indexOf(S, e.id)
                    }), o.html(u)
                }
                c.find('.event[pid="' + i + '"]').remove()
            }
            f(c), g(e, t, !0), v(), g(e, t, !1), a = null, s = null
        },
        r = function (e) {
            o.stateObjs.timers = o.$mainOddsPanel.find(".timer"), Action.MainOdds.MyEvents.toggle(e), Action.PopUp.show(!0, PopUp_Store.popUpType().MYEVENTS), S()
        },
        c = function (e, t) {
            o.stateObjs.timers = o.$mainOddsPanel.find(".timer"), !t && Action.MainOdds.MyEvents.toggle(e), Action.PopUp.show(!1, PopUp_Store.popUpType().MYEVENTS), S()
        },
        d = function (e, t) {
            var i = (t ? o.$myEventsContainer : o.$containerWrapper).find("#" + e + " .event"),
                a = [];
            return _.forEach(i, function (e) {
                a.push(+$(e).attr("pid"))
            }), _.uniq(a)
        },
        p = function (e, t) {
            var i = o.$containerWrapper.find("#" + t + " .ec").children().detach().find(".myFavorite").addClass("actived").children().attr("title", l.OP_RemoveMyEvents).end().end();
            o.$myEventsContainer.find("#" + t + " .ec").html(i), g(e, t, !0), v(), g(e, t, !1), i = null
        },
        u = function (e, t) {
            var i = o.$myEventsContainer.find("#" + t + " .ec").children().detach().find(".myFavorite").removeClass("actived").children().attr("title", l.OP_AddMyEvents).end().end();
            isValidCompetitions = m(t), isValidCompetitions && o.$containerWrapper.find("#" + t + " .ec").html(i), g(e, t, !0), v(), g(e, t, !1), i = null
        },
        h = function (e, t) {
            var i = +e.data("odr"),
                a = 0,
                s = e.data("gtid"),
                n = !1,
                o = !1,
                r = null,
                l = 0;
            if (t.each(function (e) {
                    var t = $(this);
                    if (t.hasClass("event")) {
                        if (a = +t.data("odr"), i < a) return n || 0 == s || (r = document.getElementById("gt" + s)) && (r = r.cloneNode(!0)), l = e, !1
                    } else if (t.hasClass("child")) {
                        t.prop("id").slice(2) == s && (n = !0, t.children(".childTitle").hasClass("collapsed") && (o = !0))
                    }
                }), 0 == l && i > a) n || (r = document.getElementById("gt" + s)), r ? (t.push(r.cloneNode(!0)), $(r).children(".childTitle").hasClass("collapsed") && e.addClass("hidden")) : o && e.addClass("hidden"), t.push(e[0]);
            else {
                var c = $(t[l - 1]);
                c.length > 0 && c.hasClass("child") && c.prop("id").slice(2) != s && (l -= 1), r ? ($(r).children(".childTitle").hasClass("collapsed") && e.addClass("hidden"), t.splice(l, 0, r, e[0])) : (o && e.addClass("hidden"), t.splice(l, 0, e[0]))
            }
        },
        f = function (e) {
            var t = e.find(".child"),
                i = _.remove(t, function (t) {
                    return 0 == e.find('.event[data-gtid="' + t.id.slice(2) + '"]').length
                });
            e.find(i).remove()
        },
        m = function (e) {
            return 0 == selobj.cids.length || selobj.cids.length > 0 && -1 != _.indexOf(selobj.cids.split(","), e.split("-")[0].substr(2))
        },
        g = function (e, t, i) {
            var a = (i ? o.$myEventsContainer : o.$containerWrapper).find("#" + e),
                s = (i ? o.$myEventsContainer : o.$containerWrapper).find("#" + t),
                n = 0 == a.find(".event").length,
                r = 0 == s.find(".event").length;
            i ? a[n ? "addClass" : "removeClass"]("hidden") : a.find("#sportEmptyMsg")[n ? "removeClass" : "addClass"]("hidden"), s[r ? "addClass" : "removeClass"]("hidden")
        },
        v = function () {
            0 == o.$myEventsContainer.find(".event").length ? (e.find(".removeAll").addClass("hidden"), o.$myEventsContainer.append(i).removeClass("myFavHasEvent hidden")) : (e.removeClass("collapsed").find(".removeAll").removeClass("hidden"), o.$myEventsContainer.addClass("myFavHasEvent").removeClass("hidden"), i.remove())
        },
        S = function () {
            var e = o.$myEventsContainer.find(".fve"),
                i = _.map(e, function (e) {
                    return $(e).data("meinfo")
                });
            t.text(_.uniq(i).length)
        };
    return {
        init: function (t) {
            if (e[t ? "removeClass" : "addClass"]("hidden"), o.$myEventsContainer[t ? "removeClass" : "addClass"]("hidden"), t) {
                var i = o.$myEventsContainer.find(".event").length > 0;
                e[i ? "removeClass" : "addClass"]("collapsed").find(".removeAll")[i ? "removeClass" : "addClass"]("hidden"), i ? o.$myEventsContainer.find("#addMyEventsMsg").remove().end().addClass("myFavHasEvent") : o.$myEventsContainer.addClass("myFavHasEvent"), S()
            }
        },
        refresh: function () {
            var t = o.$myEventsContainer.find(".event").length > 0;
            t ? e.hasClass("collapsed") ? o.$myEventsContainer.addClass("hidden") : o.$myEventsContainer.find("#addMyEventsMsg").remove().end().addClass("myFavHasEvent") : e.hasClass("collapsed") ? o.$myEventsContainer.addClass("hidden") : o.$myEventsContainer.append(i).removeClass("myFavHasEvent"), e.find(".removeAll")[t ? "removeClass" : "addClass"]("hidden"), S()
        },
        toggleTitle: function () {
            e.hasClass("collapsed") ? (e.removeClass("collapsed"), 0 == o.$myEventsContainer.find(".event").length ? o.$myEventsContainer.append(i).removeClass("hidden myFavHasEvent") : o.$myEventsContainer.removeClass("hidden")) : (e.addClass("collapsed"), 0 == o.$myEventsContainer.find(".event").length ? o.$myEventsContainer.find("#addMyEventsMsg").remove().end().addClass("hidden myFavHasEvent") : o.$myEventsContainer.addClass("hidden")), ScrollerBar.initScrollbarStatus()
        },
        toggleMyEventsByCompetition: a,
        toggleMyEventsByEvent: s,
        removeAll: function (e) {
            var t = o.$myEventsContainer.find(".cp-container").not(".hidden").find(".fvc");
            _.forEach(t, function (e) {
                var t = $(e);
                a(t)
            }), e.stopPropagation()
        },
        removeEvent: function (e, t) {
            var i = o.$myEventsContainer.find('.event[pid="' + e + '"]').eq(0).find(".fve");
            i.length > 0 && s(i, t)
        }
    }
}();
$(function () {
    OddsHeader.container || (OddsHeader.container = $("#oddsHeaderContainer"), OddsHeader.ddl_odds = $("#ddl_odds"), OddsHeader.ddl_oddsOpt = $("#ddl_oddsFmtOptions1"), OddsHeader.ddl_oddsDisplay = $("#ddl_oddsFmtDisplay1"), OddsHeader.ddl_sortBy = $("#ddlSortBy"), OddsHeader.ddl_sortIcon = $("#sortIcon"), OddsHeader.ddl_sortOpt = $("#sortByOpt"), OddsHeader.ddl_market = $("#ddlMarket"), OddsHeader.ddl_marketOpt = $("#ddlMarketOpt"), OddsHeader.pager = $("#p-pg-btn")), OddsHeader.initOddsDDL(), OddsHeader.initSortByDDL(), OddsHeader.initMarketDDL(), OddsHeader.competitionMenu().init(), OddsHeader.QuickMenuDDL().init(), OddsHeader.BetTypeDDL().init(), $("html").click(function (e) {
        ($(e.target) || $(e.srcElement)).hasClass("icon-Xbutton") || OddsHeader.hideAllDDL()
    })
});
var OddsHeader = {
        container: null,
        ddl_odds: null,
        ddl_oddsOpt: null,
        ddl_oddsDisplay: null,
        ddl_sortBy: null,
        ddl_sortIcon: null,
        ddl_sortOpt: null,
        ddl_market: null,
        ddl_marketOpt: null,
        $filter_half: null,
        $filter_standard: null,
        setting: {
            ipcRefInt: null,
            SPORT_SETTING_COOKIE_NAME: "settingProfile",
            param: {
                OddsType: null,
                IsFirstLoad: !0,
                SortBy: null
            },
            oddsType: uv.ov,
            sortBy: uv.sb,
            noOfLine: uv.nol,
            autoRefreshBetslip: uv.iarf,
            expiredDay: 7
        },
        hideAllDDL: function (e) {
            if (1 == mpc.pv) {
                OddsHeader.ddl_sortBy.hasClass("collapsed") || e == OddsHeader.ddl_sortBy[0] || OddsHeader.ddl_sortBy.toggleClass("collapsed"), OddsHeader.ddl_odds.hasClass("collapsed") || e == OddsHeader.ddl_odds[0] || OddsHeader.ddl_odds.toggleClass("collapsed"), OddsHeader.ddl_market.hasClass("collapsed") || e == OddsHeader.ddl_market[0] || OddsHeader.ddl_market.toggleClass("collapsed"), OddsHeader.pager.hasClass("collapsed") || e == OddsHeader.pager[0] || OddsHeader.pager.toggleClass("collapsed");
                var t = $("#quickMenu");
                t.hasClass("collapsed") || void 0 != e && e.id == t.attr("id") || t.toggleClass("collapsed");
                var i = $("#betType");
                i.hasClass("collapsed") || void 0 != e && e.id == i.attr("id") || i.toggleClass("collapsed")
            }
        },
        initOddsDDL: function () {
            OddsHeader.ddl_odds.on("click", function (e) {
                $(this).toggleClass("collapsed"), OddsHeader.hideAllDDL(this), e.stopPropagation()
            }), OddsHeader.ddl_oddsOpt.on("click", "li", function () {
                var e = $(this),
                    t = e.data("value");
                OddsHeader.setting.param.OddsType = t, OddsHeader.setting.param.IsFirstLoad = !0, utility.service("OddsService", "UpdateOddsType", OddsHeader.setting.param, "GET", function (i) {
                    i.suc && (settingParam.oddsType = uv.ov = t, OddsHeader.saveToCookie(), oddsUtil.SetOddsTypeCss(), cCtrl.reloadPage(), OddsHeader.ddl_oddsDisplay.html(e.data("sel")), e.siblings().removeClass("actived"), e.addClass("actived"))
                })
            });
            var e = OddsHeader.ddl_oddsOpt.find("li[data-value='" + uv.ov + "']").addClass("actived").data("sel");
            OddsHeader.ddl_oddsDisplay.html(e)
        },
        reHighlightSelOdds: function () {
            OddsHeader.ddl_oddsOpt.find("li").removeClass("actived");
            var e = OddsHeader.ddl_oddsOpt.find("li[data-value='" + uv.ov + "']").addClass("actived").data("sel");
            OddsHeader.ddl_oddsDisplay.html(e)
        },
        initSortByDDL: function () {
            OddsHeader.ddl_sortBy.on("click", function (e) {
                $(this).toggleClass("collapsed"), OddsHeader.hideAllDDL(this), e.stopPropagation()
            }), OddsHeader.ddl_sortOpt.on("click", "li", function () {
                var e = $(this),
                    t = e.data("value");
                settingParam.sortBy = uv.sb = t, OddsHeader.saveToCookie(), cCtrl.reloadPage(), OddsHeader.ddl_sortIcon.attr("class", "1" == t ? "icon-SortCompetition" : "icon-SortTime"), e.siblings().removeClass("actived"), e.addClass("actived")
            }), OddsHeader.ddl_sortOpt.find("li[data-value='" + settingParam.sortBy + "']").addClass("actived"), OddsHeader.ddl_sortIcon.attr("class", "1" == settingParam.sortBy ? "icon-SortCompetition" : "icon-SortTime")
        },
        initMarketDDL: function () {
            OddsHeader.ddl_market.on("click", function (e) {
                $(this).toggleClass("collapsed"), OddsHeader.hideAllDDL(this), e.stopPropagation()
            }), OddsHeader.ddl_marketOpt.on("click", "li", function () {
                var e = $(this),
                    t = e.data("value");
                settingParam.noOfLine = uv.nol = t, OddsHeader.saveToCookie(), cCtrl.reloadPage(), e.siblings().removeClass("actived"), e.addClass("actived"), 1 == settingParam.noOfLine ? OddsHeader.ddl_market.removeClass("plus").addClass("minur") : OddsHeader.ddl_market.removeClass("minur").addClass("plus")
            }), 1 == settingParam.noOfLine ? OddsHeader.ddl_market.removeClass("plus").addClass("minur") : OddsHeader.ddl_market.removeClass("minur").addClass("plus"), (UI.isMACFirefox || UI.isMACSafari) && OddsHeader.ddl_market.children(".leftPart").addClass("macfix"), OddsHeader.ddl_marketOpt.find("li[data-value='" + settingParam.noOfLine + "']").addClass("actived")
        },
        saveToCookie: function () {
            var e = "OddsType=" + settingParam.oddsType + "&NoOfLinePerEvent=" + settingParam.noOfLine + "&SortBy=" + settingParam.sortBy + "&AutoRefreshBetslip=" + settingParam.autoRefreshBetslip;
            utility.cookie.write(settingParam.SPORT_SETTING_COOKIE_NAME, e, settingParam.expiredDay)
        },
        reInitHeaderDDLs: function () {
            var e = uv.ov,
                t = (uv.nol, uv.sb, uv.iarf, utility.cookie.read(settingParam.SPORT_SETTING_COOKIE_NAME));
            if (null != t)
                for (var i = t.split("&"), a = 0; a < i.length; a++) {
                    var s = i[a].split("=");
                    switch (s[0]) {
                        case "OddsType":
                            e = s[1];
                            break;
                        case "NoOfLinePerEvent":
                            s[1];
                            break;
                        case "SortBy":
                            s[1];
                            break;
                        case "AutoRefreshBetslip":
                            s[1]
                    }
                }
            OddsHeader.ddl_oddsOpt.find("li").removeClass("actived");
            var n = OddsHeader.ddl_oddsOpt.find("li[data-value='" + e + "']").addClass("actived").data("sel");
            OddsHeader.ddl_oddsDisplay.html(n)
        },
        resetSportText: function (e) {
            "Popular" == o.param.Tab ? $("#headerTxt").text(l.LP_StartingSoonMenu) : "Favourite" == o.param.Tab ? $("#headerTxt").html(l.ip.toUpperCase() + ' : <span class="fav-txt">' + l.LP_My_Fav + "</span>") : 2 == selobj.favT ? $("#headerTxt").text(l.LP_MyComp) : $("#headerTxt").text(e)
        },
        initFilterButton: function (e) {
            var t, i, a, s, n, r, l = o.$mainOddsPanel.find('[id="s' + e + '"]'),
                c = function (t, i) {
                    var a = $(this);
                    i ? (t.data.addClass("activated"), l.addClass(a.attr("id"))) : (a.hasClass("activated") ? (t.data.removeClass("activated"), l.removeClass(a.attr("id")), om.filter.inactivateFilter(a.attr("id") + e)) : (t.data.addClass("activated"), l.addClass(a.attr("id")), om.filter.activateFilter(a.attr("id") + e)), ScrollerBar.initScrollbarStatus()), t.stopPropagation(), t = null
                };
            switch (e) {
                case 1:
                    OddsHeader.$filter_half = l.find('[id="filter_half"]'), OddsHeader.$filter_standard = l.find('[id="filter_standard"]'), OddsHeader.$filter_half.off("click").on("click", OddsHeader.$filter_half, function (t, i, a) {
                        t.data.addClass("activated"), l.removeClass("standard-View").addClass("half1st-View"), OddsHeader.$filter_standard.removeClass("activated"), i || (om.filter.activateFilter("1h_" + e), om.filter.inactivateFilter("st_" + e)), !a && Action.MainOdds.Toggle1stHalfView(!0), t.stopPropagation(), o.is1stHalfOn = !0, t = null
                    }), OddsHeader.$filter_standard.off("click").on("click", OddsHeader.$filter_standard, function (t, i, a) {
                        t.data.addClass("activated"), l.removeClass("half1st-View").addClass("standard-View"), OddsHeader.$filter_half.removeClass("activated"), i || (om.filter.activateFilter("st_" + e), om.filter.inactivateFilter("1h_" + e)), !a && Action.MainOdds.Toggle1stHalfView(!1), t.stopPropagation(), o.is1stHalfOn = !1, t = null
                    });
                    var d = o.param.UIBetType;
                    "cs" == d && "htft" == d || (om.filter.isSelectedFilterType("1h_" + e) ? OddsHeader.$filter_half.eq(0).trigger("click", [!0, !1]) : om.filter.isSelectedFilterType("st_" + e) ? OddsHeader.$filter_standard.eq(0).trigger("click", [!0, !1]) : "asian" == uv.urView.toLowerCase() && UI.state.view != UIVIEW.R1024 && OddsHeader.$filter_half.eq(0).trigger("click", [!0, !1]));
                    break;
                case 2:
                case 7:
                    t = l.find('[id="quarters"]'), i = l.find('[id="halves"]'), t.off("click").on("click", t, c), i.off("click").on("click", i, c);
                    var p = i.attr("id") + e,
                        u = t.attr("id") + e;
                    om.filter.isSelectedFilterType(p) ? i.eq(0).trigger("click", !0) : 7 != e || "asian" != uv.urView.toLowerCase() || om.filter.isUnselectedFilterType(p) || i.eq(0).trigger("click", !0), om.filter.isSelectedFilterType(u) ? t.eq(0).trigger("click", !0) : 7 != e || "asian" != uv.urView.toLowerCase() || om.filter.isUnselectedFilterType(u) || t.eq(0).trigger("click", !0);
                    break;
                case 3:
                case 9:
                case 13:
                case 20:
                case 27:
                    a = l.find('[id="sets"]'), s = l.find('[id="game"]'), n = l.find('[id="point"]'), a.off("click").on("click", a, c), s.off("click").on("click", s, c), n.off("click").on("click", n, c);
                    var h = a.attr("id") + e,
                        f = s.attr("id") + e,
                        m = n.attr("id") + e;
                    (om.filter.isSelectedFilterType(h) || "asian" == uv.urView.toLowerCase() && !om.filter.isUnselectedFilterType(h)) && a.eq(0).trigger("click", !0), (om.filter.isSelectedFilterType(f) || "asian" == uv.urView.toLowerCase() && !om.filter.isUnselectedFilterType(f)) && s.eq(0).trigger("click", !0), (om.filter.isSelectedFilterType(m) || "asian" == uv.urView.toLowerCase() && !om.filter.isUnselectedFilterType(m)) && n.eq(0).trigger("click", !0);
                    break;
                case 19:
                case 26:
                    (r = l.find('[id="periods"]')).off("click").on("click", r, c);
                    var g = r.attr("id") + e;
                    (om.filter.isSelectedFilterType(g) || "asian" == uv.urView.toLowerCase() && !om.filter.isUnselectedFilterType(g)) && r.eq(0).trigger("click", !0)
            }
        },
        QuickMenuDDL: function () {
            var e = null,
                t = null,
                i = function (i) {
                    var a = global.lan + ".QuickMenu.html",
                        s = $("#quickMenuOptions"),
                        n = i.srcElement || i.target;
                    if (t = $("#quickMenu"), -1 == n.className.indexOf("jsp")) {
                        if (t.hasClass("collapsed")) {
                            var o = MM.view === VIEW.PARLAY ? LPM.getStore("Parlay").state.smd : LPM.getStore("PreStart").state.smd;
                            (o = _.find(o, function (e) {
                                return e.sid == selobj.spt
                            })).mc = LPM.mycomps, e = o.sn, utility.template("OddsPage/" + a, function (e) {
                                s.html(e.process(o)), setTimeout(ScrollerBar.initQuickMenuScrollbar, 100), t.removeClass("collapsed")
                            }, a)
                        } else t.addClass("collapsed");
                        OddsHeader.hideAllDDL(this)
                    }
                    i.stopPropagation()
                },
                a = function (i) {
                    var a = $(this);
                    if (a.hasClass("mycomp")) {
                        var s = a.toggleClass("actived").parents(".qmopt"),
                            n = s.data("cid"),
                            o = s.data("cn");
                        Action.LeftPanel.MyCompetition.toggle({
                            sid: selobj.spt,
                            sn: e,
                            cid: n,
                            cn: o
                        })
                    } else {
                        var r = a.data("key");
                        0 == +a.data("ct") ? (a.find(".hidden").removeClass("hidden"), ScrollerBar.initQuickMenuScrollbar()) : (t && t.addClass("collapsed"), Action.MainOdds.QuickMenu.changeOption(r, selobj.sptn, a.data("cid")))
                    }
                    i.stopPropagation()
                };
            return {
                init: function () {
                    o.$containerWrapper.on("click", "#quickMenu", i).on("click", ".qmopt,.mycomp", a)
                }
            }
        },
        BetTypeDDL: function () {
            var e = function (e) {
                    var t = $("#betType"),
                        i = $("#betTypeOptions"),
                        a = new StringBuilderEx,
                        s = o.stateObjs.bts;
                    if (t.hasClass("collapsed")) {
                        if (0 == _.where(s, {
                                sk: "ftahou"
                            }).length && (s = _.union([{
                                c: 0,
                                n: "Handicap & Over / Under",
                                k: "full-time-asian-handicap-and-over-under",
                                sk: "ftahou"
                            }], s)), MM.view === VIEW.PARLAY && (s = _.filter(s, function (e) {
                                return "epm" !== e.sk
                            })), s.length > 0)
                            for (var n = 0; n < s.length; n++) a.appendFormat('<li class="btopt {0}" data-val="{1}"><table><colgroup><col><col class="col-fixed1"></colgroup><tbody><tr><td class="pd-0"><span class="lht-1p1 dsp-iblk mg-t-3">{2}<span></span></span></td><td class="height-37"></td></tr></tbody></table></li>', s[n].k == selobj.btp2 ? "actived" : "", s[n].k, oddsUtil.CustomizedBettypeName(selobj.spt, s[n].sk, s[n].n));
                        i.html(a.toString()), t.removeClass("collapsed"), a = null
                    } else t.addClass("collapsed");
                    OddsHeader.hideAllDDL(this), e.stopPropagation()
                },
                t = function (e) {
                    var t = $(this).attr("data-val");
                    t && Action.MainOdds.BetType.changeOption(t), e.stopPropagation()
                };
            return {
                init: function () {
                    o.$containerWrapper.on("click", "#betType", e).on("click", ".btopt", t)
                }
            }
        },
        competitionMenu: function () {
            return {
                init: function () {
                    o.$CompetitionMenu.click(function () {
                        Action.MainOdds.CompetitionMenu()
                    })
                },
                count: function () {
                    var e = utility.cookie.read(o.Select_All_Comps);
                    0 != selobj.pid || "" == selobj.cids || null == e || -1 == e ? o.$CompetitionMenu.find(".count").text(l.all) : o.$CompetitionMenu.find(".count").text(e)
                }
            }
        }
    },
    AllMarketUtility = {
        getBetTypeName: function (e, t, i, a) {
            var s;
            switch (e.slice(0, 2)) {
                case "ah":
                    s = l.MB_HDC, _.contains([3, 13, 27], a) && (s = "ah" == e ? l.MB_SetHDC : l.MB_GameHDC), _.contains([9, 20], a) && (s = "ah" == e ? l.MB_GameHDC : l.MB_PointHDC);
                    break;
                case "ou":
                    s = l.MB_OU;
                    break;
                case "oe":
                    s = l.MB_OE;
                    break;
                case "cs":
                    s = l.MB_CS;
                    break;
                case "hf":
                    s = l.MB_HF;
                    break;
                case "tg":
                    s = l.MB_TG;
                    break;
                case "ml":
                    s = this.isNetSport(a) ? l.Odds_Winner : l.MB_MoneyLine;
                    break;
                case "sb":
                    s = l.MB_SB
            }
            switch (e.slice(0, 3)) {
                case "1x2":
                    s = l.MB_1X2;
                    break;
                case "tts":
                    s = l.MB_1stLstGoal;
                    break;
                case "sco":
                    s = l.MB_GS;
                    break;
                case "bts":
                    s = l.Odds_bts;
                    break;
                case "win":
                    s = l.MB_Winner
            }
            return "spwos" == e ? s = i : "m180" == e && (s = l.Most180), s
        },
        getPeriod: function (e, t) {
            switch (e = e.toLowerCase()) {
                case "et 1h":
                    return l.ETT_H3;
                case "et 2h":
                    return l.ETT_H4
            }
            switch (e.substr(e.length - 2, 2)) {
                case "1h":
                case "h1":
                    return l.Period_1H;
                case "2h":
                case "h2":
                    return l.Period_2H;
                case "s1":
                    return this.isTableTennisOrBadmintion(t) ? l.Period_1G : l.Period_1S;
                case "s2":
                    return this.isTableTennisOrBadmintion(t) ? l.Period_2G : l.Period_2S;
                case "s3":
                    return this.isTableTennisOrBadmintion(t) ? l.Period_3G : l.Period_3S;
                case "s4":
                    return this.isTableTennisOrBadmintion(t) ? l.Period_4G : l.Period_4S;
                case "s5":
                    return this.isTableTennisOrBadmintion(t) ? l.Period_5G : l.Period_5S;
                case "s6":
                    return this.isTableTennisOrBadmintion(t) ? l.Period_6G : l.Period_6S;
                case "s7":
                    return this.isTableTennisOrBadmintion(t) ? l.Period_7G : l.Period_7S;
                case "q1":
                    return l.Period_1Q;
                case "q2":
                    return l.Period_2Q;
                case "q3":
                    return l.Period_3Q;
                case "q4":
                    return l.Period_4Q;
                case "p1":
                    return l.Period_1P;
                case "p2":
                    return l.Period_2P;
                case "p3":
                    return l.Period_3P;
                case "et":
                    return l.tiET;
                case "ht":
                    return l.tiHT;
                case "ot":
                    return 2 == t ? l.tiOT : l.Period_OT
            }
            switch (e.substr(e.length - 3)) {
                case "1st":
                    return l.Period_1H
            }
            switch (e.substr(e.length - 4)) {
                case "f5in":
                    return l.Period_1st5Innings;
                case "pens":
                    return l.tiPens;
                default:
                    return ""
            }
        },
        isTableTennisOrBadmintion: function (e) {
            return 20 == e || 9 == e
        },
        getPretermName: function (e, t, i) {
            if (1 == i && _.contains([0, 3, 5, 6], t)) switch (e.slice(0, 2)) {
                case "ou":
                case "oe":
                    return this.preternFixed(l.PreTern_Goals, !1)
            }
            if (2 == i) switch (e.slice(0, 2)) {
                case "ou":
                case "oe":
                    return this.preternFixed(l.PreTern_TotalPoints, !1)
            }
            if (3 == i) {
                switch (e) {
                    case "ou":
                    case "oe":
                        return this.preternFixed(l.PreTern_TotalSets, !1)
                }
                switch (e.slice(0, 2)) {
                    case "ou":
                    case "oe":
                        return this.preternFixed(l.PreTern_TotalGames, !1)
                }
            }
            if (_.contains([9, 20], i)) {
                switch (e) {
                    case "ou":
                    case "oe":
                        return this.preternFixed(l.PreTern_TotalGames, !1)
                }
                switch (e.slice(0, 2)) {
                    case "ou":
                    case "oe":
                        return this.preternFixed(l.PreTern_TotalPoints, !1)
                }
            }
            if (_.contains([13, 27], i)) {
                switch (e) {
                    case "ou":
                    case "oe":
                        return this.preternFixed(l.PreTern_TotalSets, !1)
                }
                switch (e.slice(0, 2)) {
                    case "ou":
                    case "oe":
                        return this.preternFixed(l.PreTern_TotalPoints, !1)
                }
            }
            if (_.contains([19, 26], i)) switch (e.slice(0, 2)) {
                case "ou":
                case "oe":
                    return this.preternFixed(l.PreTern_Goals, !0)
            }
            if (21 == i) switch (e.slice(0, 2)) {
                case "ou":
                case "oe":
                    return this.preternFixed(l.PreTern_TotalFrames, !1)
            }
            return ""
        },
        preternFixed: function (e, t) {
            return "" != e ? e + (t ? " " : ": ") : ""
        },
        CustomizedAHLocalization: function (e, t) {
            var i = "Asian Handicap";
            switch (e) {
                case 0:
                    i = l.MB_AH2, 1 != selobj.spt && (i = CustomizedAHLocalization(selobj.spt, t));
                    break;
                case 1:
                    i = l.MB_AH2;
                    break;
                case 2:
                case 7:
                case 19:
                case 26:
                    i = l.MB_HDC;
                    break;
                case 3:
                    i = "ah" == t ? l.MB_SetHDC : l.MB_GameHDC;
                    break;
                case 9:
                case 13:
                case 20:
                case 27:
                    i = "ah" == t ? l.MB_SetHDC : l.MB_PointHDC;
                    break;
                default:
                    i = l.MB_HDC
            }
            return i
        },
        CustomizedOULocalization: function (e, t, i) {
            var a = "Over / Under";
            switch (e) {
                case 0:
                    a = 3 == i || 5 == i || 6 == i ? l.MB_GoalsOU : l.MB_OU, 1 != selobj.spt && (a = AllMarketPage.CustomizedOULocalization(selobj.spt, t, i));
                    break;
                case 1:
                case 19:
                case 26:
                    a = l.MB_GoalsOU;
                    break;
                case 3:
                    a = "ou" == t ? l.MB_SetsOU : l.MB_GamesOU;
                    break;
                case 2:
                case 7:
                    a = l.MB_PointsOU;
                    break;
                case 9:
                case 13:
                case 20:
                case 27:
                    a = "ou" == t ? l.MB_SetsOU : l.MB_PointsOU;
                    break;
                default:
                    a = l.MB_OU
            }
            return a
        },
        CustomizedOELocalization: function (e, t, i) {
            var a = "Odd / Even";
            switch (e) {
                case 0:
                    a = 3 == i || 5 == i || 6 == i ? l.MB_GoalsOE : l.MB_OE, 1 != selobj.spt && (a = AllMarketPage.CustomizedOELocalization(selobj.spt, t, i));
                    break;
                case 1:
                case 19:
                case 26:
                    a = l.MB_GoalsOE;
                    break;
                case 3:
                    a = "oe" == t ? l.MB_SetsOE : l.MB_GamesOE;
                    break;
                case 2:
                case 7:
                    a = l.MB_PointsOE;
                    break;
                case 9:
                case 13:
                case 20:
                case 27:
                    a = "oe" == t ? l.MB_SetsOE : l.MB_PointsOE;
                    break;
                default:
                    a = l.MB_OE
            }
            return a
        },
        isNetSport: function (e) {
            return _.contains([3, 9, 13, 20, 27], +e)
        },
        padZeroLeft: function (e, t) {
            return _.padLeft(e, t, "0")
        }
    };
CONSTANTS.ALLMARKETPAGE = {
    HIGHLIGHTODDS: "AM_HIGHLIGHTODDS",
    SWITCHLESSMORE: "AM_SWITCHLESSMORE",
    SWITCHLESSMORE_EPS: "AM_SWITCHLESSMORE_EPS",
    ADDTOMYMARKETS: "AM_ADDTOMYMARKETS",
    REMOVEMYMARKETS: "AM_REMOVEMYMARKETS",
    FILTEREDMARKET: "AM_FILTEREDMARKET",
    SHOWODDSTYPEDDL: "AM_SHOWODDSTYPEDDL",
    SHOWMYMARKETS: "AM_SHOWMYMARKETS",
    CLEARODDSCHANGE: "AM_CLEARODDSCHANGE",
    SHOWHIDEFILTERBTN: "AM_SHOWHIDEFILTERBTN"
};
var AMStore = function () {
    var AM_Data = {
            d: {
                c: [{
                    e: [{
                        i: new Array(50)
                    }],
                    n: ""
                }],
                tn: ":"
            },
            ec: 0,
            r: 0,
            t: 0,
            v: 0,
            selId: -1
        },
        _const = {
            updateEvent: "AM_Update"
        },
        _firstLoad = !0,
        _eventId = 0,
        _highlightIds = [],
        _showMoreEventIds = [],
        _showMoreEPS = !1,
        _smmt = localStorage.getItem("mmt"),
        _myMarketTypes = void 0 === _smmt ? [] : JSON.parse(_smmt),
        _netSport = [3, 9, 13, 20],
        _filter = {
            filteredType: "|p|"
        },
        _showOddsTypeDDL = !1,
        _showMyMarkets = !1,
        _oddsChange = {
            Up: [],
            Down: []
        },
        _oddsType = uv.ov,
        _AMRTimerID = null;
    _cTimer = null, window._elapsed = 0;
    var _oddsClearFlag = !1,
        _spwosOrder = 300,
        _mainUnordered = 400,
        _mainChildUnordered = 500,
        _spwosChildOrder = 600,
        _maxDefaultOrder = 999,
        _constructOddsData = function (e) {
            if (!e.odds || 0 == e.odds.length) return e.odds;
            var t = function (e) {
                    return 0 != +e[1]
                },
                i = function (e) {
                    return void 0 === e ? [
                        ["", "", ""],
                        ["", "", ""]
                    ] : 1 == e.length ? e.concat([
                        ["", "", ""]
                    ]) : e
                };
            switch (e.betType.slice(0, 2)) {
                case "ah":
                case "ou":
                    var a = _.chain(e.odds).chunk(8).map(function (e) {
                        var t = _.chunk(e, 2);
                        return [t[0].concat(t[2]), t[1].concat(t[3])]
                    }).flatten().value();
                    return a = 1 != e.sid && 2 != e.sid || 0 != e.ctid ? _.chunk(a, 2) : _.chunk(a, 12);
                case "oe":
                case "ml":
                    return _.chunk(e.odds, 2);
                case "hf":
                    for (var s = [e.home + " / " + e.home, e.home + " / " + l.Odds_Draw, e.home + " / " + e.away, l.Odds_Draw + " / " + e.home, l.Odds_Draw + " / " + l.Odds_Draw, l.Odds_Draw + " / " + e.away, e.away + " / " + e.home, e.away + " / " + l.Odds_Draw, e.away + " / " + e.away], n = _.chain(e.odds).chunk(2).map(function (e, t) {
                            return e.push(s[t]), e
                        }).chunk(3).value(), o = new Array(3), r = 0; r < o.length; r++) o[r] = _.map(n, function (e) {
                        return e[r]
                    });
                    return o;
                case "cs":
                    var c = ["1 - 0", "0 - 1", "2 - 0", "0 - 2", "2 - 1", "1 - 2", "3 - 0", "0 - 3", "3 - 1", "1 - 3", "3 - 2", "2 - 3", "4 - 0", "0 - 4", "4 - 1", "1 - 4", "4 - 2", "2 - 4", "4 - 3", "3 - 4", "0 - 0", "1 - 1", "2 - 2", "3 - 3", "4 - 4", l.Odds_AOS],
                        d = ["1 - 0", "0 - 1", "2 - 0", "0 - 2", "2 - 1", "1 - 2", "3 - 0", "0 - 3", "3 - 1", "1 - 3", "3 - 2", "2 - 3", "0 - 0", "1 - 1", "2 - 2", "3 - 3", l.Odds_AOS];
                    (T = _.chain(e.odds).chunk(2).map(function (t, i) {
                        return t[2] = "cs" == e.betType ? c[i] : d[i], t
                    }).chunk("cs" == e.betType ? 20 : 12).value())[0] = _.partition(T[0], function (e, t) {
                        return t % 2 == 0
                    }).map(function (i) {
                        return _.chunk(e.isInplay ? _.filter(i, t) : i, 2)
                    }), T[1] = _.partition(T[1], function (e, t) {
                        return T[1].length - 1 != t
                    }).map(function (i) {
                        return e.isInplay ? _.filter(i, t) : i
                    }), T = _.flatten(T);
                    var p = [],
                        u = Math.max(T[0].length, T[1].length, T[2].length);
                    for (r = 0; r < u; r++) T[0][r] = i(T[0][r]), T[1][r] = i(T[1][r]), T[2][r] = void 0 === T[2][r] ? ["", "", ""] : T[2][r], p.push(T[0][r].concat([T[2][r]]).concat(T[1][r]));
                    return p.push(void 0 === T[3][0] || 0 == parseFloat(T[3][0][1]) ? ["", "", ""] : T[3][0]), p;
                case "sb":
                    var h = ["2 - 0", "0 - 2", "2 - 1", "1 - 2", "3 - 0", "0 - 3", "3 - 1", "1 - 3", "3 - 2", "2 - 3", "4 - 0", "0 - 4", "4 - 1", "1 - 4", "4 - 2", "2 - 4", "4 - 3", "3 - 4"],
                        f = _.chain(e.odds).chunk(2).map(function (e, t) {
                            return e[2] = h[t], e
                        }).value();
                    if (-1 == _.indexOf(["", "0", 0], e.bestOf)) {
                        var m, g = [];
                        switch (+e.bestOf) {
                            case 3:
                                g = _.slice(f, 0, 4);
                                break;
                            case 5:
                                g = _.slice(f, 4, 10);
                                break;
                            case 7:
                                g = _.slice(f, 10, f.length)
                        }
                        m = _.remove(g, function (e, t) {
                            return t % 2 == 1
                        }), f = g.concat(m)
                    } else f = _.chunk(f, 2);
                    return f;
                case "tg":
                    var v = [l.odds_TG01, l.odds_TG23, l.odds_TG46, l.odds_Up7],
                        S = [l.odds_TG0, l.odds_TG1, l.odds_TG2, l.odds_TG3UP],
                        T = _.chunk(e.odds, 2).map(function (t, i) {
                            return t[2] = "tg" == e.betType ? v[i] : S[i], t
                        });
                    T = e.isInplay ? _.filter(T, t) : T;
                    for (r = 0; r < 4 - T.length; r++) T.push(["", "", ""]);
                    return T
            }
            switch (e.betType.slice(0, 3)) {
                case "1x2":
                    var b = _.chunk(e.odds, 2);
                    return b.concat(_.remove(b, function (e, t) {
                        return 1 == t
                    }));
                case "tts":
                    var E = [
                        [],
                        []
                    ];
                    return E[0] = e.odds[0] && e.odds[0].length > 0 ? _.chunk(e.odds[0], 2) : [
                        [, ],
                        [, ],
                        [, ]
                    ], E[1] = e.odds[1] && e.odds[1].length > 0 ? _.chunk(e.odds[1], 2) : [
                        [, ],
                        [, ]
                    ], E;
                case "sco":
                    var C, y, O, w = _.chunk(e.odds[0], 2).map(function (e, t) {
                            return e[1] = e[1].split("|"), _.flatten(e)
                        }),
                        A = _.chunk(e.odds[1], 2).map(function (e, t) {
                            return e[1] = e[1].split("|"), _.flatten(e)
                        });
                    C = _.chain(w.concat(A)).map(function (e) {
                        return e[1]
                    }).uniq().map(function (t) {
                        var i = _.flatten(_.filter(w, 1, t)),
                            a = _.flatten(_.filter(A, 1, t)),
                            s = _.flatten(_.filter(e.odds[2], 0, t.slice(1))),
                            n = i.length > 0 ? i[2] : a[2],
                            o = [
                                [i[0], i[3]],
                                [a[0], a[3]],
                                [s[1], s[2]]
                            ];
                        return "h1" == t && (o = [
                            [a[0], a[3]],
                            [a[0], a[3]],
                            [a[0], a[3]]
                        ]), {
                            k: t,
                            n: n,
                            o: o,
                            fo: isNaN(i[3]) ? 0 : +i[3]
                        }
                    }).value(), g = _.result(_.remove(C, "k", "a2"), 0), O = _.result(_.remove(C, "k", "h1"), 0), y = _.remove(C, function (e) {
                        if ("a" == e.k.slice(0, 1)) return e
                    }), C = _.sortBy(C, "fo"), y = _.sortBy(y, "fo");
                    var k = [];
                    for (u = Math.max(C.length, y.length), r = 0; r < u; r++) k[r] = [C[r], y[r]];
                    return k.push([g, O]), k
            }
            var P = ["TimeOfFirstGoal_ThreeWay", "ThreeWayHandicap", "DoubleChance"],
                I = ["WinningMargin", "WinningMargin_1st5Innings", "FT_1X2_And_FT_OU_1p5", "FT_1X2_And_FT_OU_2p5", "FT_1X2_And_FT_OU_3p5", "FT_1X2_And_FT_OU_4p5", "FT_1X2_And_1stTeamToScore", "FT_1X2_And_BothTeamsToScore", "DoubleChance_And_FT_OU_1p5", "DoubleChance_And_FT_OU_2p5", "DoubleChance_And_FT_OU_3p5", "DoubleChance_And_FT_OU_4p5", "DoubleChance_And_BothTeamsToScore", "DoubleChance_And_1stTeamToScore"],
                L = ["HalfWithMostGoals_1X2", "FirstGoalMethod"],
                B = ["FT_OU_1p5_And_1stTeamToScore", "FT_OU_2p5_And_1stTeamToScore", "FT_OU_3p5_And_1stTeamToScore", "FT_OU_4p5_And_1stTeamToScore"],
                N = ["FT_OU_1p5_And_BothTeamsToScore", "FT_OU_2p5_And_BothTeamsToScore", "FT_OU_3p5_And_BothTeamsToScore", "FT_OU_4p5_And_BothTeamsToScore", "FT_OU_1p5_And_FT_OE", "FT_OU_2p5_And_FT_OE", "FT_OU_3p5_And_FT_OE", "FT_OU_4p5_And_FT_OE", "WinningMethod", "QualifyingMethod"],
                D = ["_1stGoal", "_2ndGoal", "_3rdGoal", "_4thGoal", "_5thGoal", "_6thGoal", "_7thGoal", "_8thGoal", "_9thGoal", "_10thGoal", "_11thGoal", "_12thGoal", "_13thGoal", "_14thGoal", "_15thGoal"];
            if ("spwos" == e.betType) {
                if (-1 != _.indexOf(P, e.mn)) {
                    var M = 1,
                        R = e.odds.length;
                    if (e.odds.length % M != 0)
                        for (r = 0; r < M - R % M; r++) e.odds.push(["", "", ""]);
                    return _.chain(e.odds).map(function (e) {
                        var t = _.pullAt(e, 0);
                        return e.push(t[0]), e
                    }).chunk(M).value()
                }
                if (-1 != _.indexOf(I, e.mn)) {
                    M = 3, R = e.odds.length;
                    return e.odds.sort(_fn_orderbyindex), _.chain(_fn_ReorderArray(e.odds, M)).map(function (e) {
                        var t = _.pullAt(e, 0),
                            i = _.pullAt(e, 2);
                        return e.push(t[0]), e.push(i[0]), e
                    }).chunk(M).value()
                }
                if (-1 != _.indexOf(L, e.mn)) {
                    M = 3, R = e.odds.length;
                    if (e.odds.length % M != 0)
                        for (r = 0; r < M - R % M; r++) e.odds.push(["", "", ""]);
                    return _.chain(e.odds).map(function (e) {
                        var t = _.pullAt(e, 0);
                        return e.push(t[0]), e
                    }).chunk(M).value()
                }
                if (-1 != _.indexOf(B, e.mn)) {
                    M = 2, R = e.odds.length;
                    return e.odds.sort(_fn_orderbyindex), _.chain(_fn_ReorderArray(e.odds, M)).map(function (e) {
                        var t = _.pullAt(e, 0),
                            i = _.pullAt(e, 2);
                        return e.push(t[0]), e.push(i[0]), e
                    }).chunk(M).value()
                }
                if (-1 != _.indexOf(N, e.mn)) {
                    M = 4, R = e.odds.length;
                    e.odds.sort(_fn_orderbyindex);
                    var x = (H = e.odds.filter(function (e) {
                        return 999 != e[3]
                    })).length ? Math.ceil(H[H.length - 1][3] / M) : 1;
                    return _.chain(_fn_RecombinantArray(e.odds, x, M)).map(function (e) {
                        var t = _.pullAt(e, 0),
                            i = _.pullAt(e, 2);
                        return e.push(t[0]), e.push(i[0]), e
                    }).chunk(M).value()
                }
                if (-1 != _.indexOf(D, e.mn)) {
                    M = 3, R = e.odds.length;
                    e.odds.sort(_fn_orderbyindex);
                    var H;
                    x = (H = e.odds.filter(function (e) {
                        return 999 != e[3]
                    })).length ? Math.ceil(H[H.length - 1][3] / M) : 1;
                    return _.chain(_fn_RecombinantArray(e.odds, x, M)).map(function (e) {
                        var t = _.pullAt(e, 0),
                            i = _.pullAt(e, 2);
                        return e.push(t[0]), e.push(i[0]), e
                    }).chunk(M).value()
                }
                return e.odds.length % 2 == 1 && e.odds.push(["", "", ""]), _.chain(e.odds).map(function (e) {
                    var t = _.pullAt(e, 0);
                    (e.push(t[0]), 5 == e.length) && (e = [e[2], e[3], e[0], e[1], e[4]]);
                    return e
                }).chunk(2).value()
            }
            return e.odds
        };

    function _fn_RecombinantArray(e, t, i) {
        for (var a = [], s = 0; s < t * i; s++) {
            var n = $.grep(e, function (e) {
                return e[3] == s
            })[0];
            void 0 !== n ? a.push(n) : a.push(["", "", "", s])
        }
        var o = (a = a.concat(e.filter(function (e) {
            return 999 == e[3]
        }))).length;
        for (s = 1; s < Math.ceil(o / i); s++)
            for (; o % i != 0;) a.push(["", "", "", "999"]), o++;
        return a
    }

    function _fn_ReorderArray(e, t) {
        for (var i = [], a = e.filter(function (e) {
                return 999 != e[3]
            }), s = [], n = 0, o = 0; o < a.length; o++) {
            var r = a[o],
                l = +r[3] % t;
            _.isArray(s[l]) || (s[l] = []), s[l].push(r), s[l].length > n && (n = s[l].length)
        }
        if (_.forEach(s, function (e, t) {
                if (void 0 === e && (s[t] = e = []), n > e.length)
                    for (; n > e.length;) e.push(["", "", "", "999"])
            }), t > s.length)
            for (; t > s.length;) {
                var c = [];
                for (o = 0; o < n; o++) c.push(["", "", "", "999"]);
                s.push(c)
            }
        _.forEach(_.zip.apply(this, s), function (e) {
            Array.prototype.push.apply(i, e)
        });
        var d = (i = i.concat(e.filter(function (e) {
            return 999 == e[3]
        }))).length;
        for (o = 1; o < Math.ceil(d / t); o++)
            for (; d % t != 0;) i.push(["", "", "", "999"]), d++;
        return i
    }

    function _fn_orderbyindex(e, t) {
        return e[3] - t[3]
    }
    var _processOddsData = function (e) {
            var t = .1,
                i = .1,
                a = .1,
                s = .1;
            if (e.d.c[0].e[0].hide) e.d.c[0].e[0].o = [];
            else {
                var n = {
                    a: ["tts", "sco"],
                    b: ["1st", "last"],
                    bt: {
                        tts: {
                            f: "",
                            mo: 999,
                            v: [
                                [],
                                []
                            ]
                        },
                        sco: {
                            f: "",
                            mo: 999,
                            v: [
                                [],
                                [],
                                []
                            ]
                        }
                    }
                };
                _.forEach(n.a, function (t) {
                    _.forEach(n.b, function (i) {
                        void 0 !== e.d.c[0].e[0].o[t + i] && (n.bt[t].f = e.d.c[0].e[0].o[t + i].f, n.bt[t].mo = e.d.c[0].e[0].o[t + i].mo, "1st" == i ? n.bt[t].v[0] = e.d.c[0].e[0].o[t + i].v : n.bt[t].v[1] = e.d.c[0].e[0].o[t + i].v, delete e.d.c[0].e[0].o[t + i])
                    })
                }), "" != n.bt.tts.f && (e.d.c[0].e[0].o.tts = n.bt.tts), n.ags = _.remove(e.d.c[0].e[0]["n-o"], "mn", "AnytimeGoalScorer"), "" != n.bt.sco.f && (e.d.c[0].e[0].o.sco = n.bt.sco, e.d.c[0].e[0].o.sco.v[2] = void 0 !== n.ags[0] ? n.ags[0].o : []), n = {};
                var o = e.d.k,
                    r = e.d.c[0].e[0].cei.ctid,
                    l = e.d.c[0].e[0].k,
                    c = "inplay" == e.d.tn.split(":")[1],
                    d = e.d.c[0].e[0].i[37],
                    p = e.d.c[0].e[0].o.eps;
                p && (p = $.extend(p, {
                    mt: "eps",
                    k: l
                }), _.forEach(p.o, function (e, t) {
                    e = $.extend(e, [e[1], e[2], e[0]])
                }), e.d.c[0].e[0].eps = p, delete e.d.c[0].e[0].o.eps), e.d.c[0].e[0].o = _.chain(e.d.c[0].e[0].o).mapValues(function (i, a) {
                    return (i = $.extend(i, {
                        mt: a,
                        ctid: 0,
                        k: l,
                        v: _constructOddsData({
                            betType: a,
                            odds: i.v,
                            isInplay: c,
                            home: e.d.c[0].e[0].i[0],
                            away: e.d.c[0].e[0].i[1],
                            bestOf: d,
                            sid: o,
                            ctid: r
                        })
                    }, 1 != o || c || void 0 !== i.f ? {} : {
                        f: "|o|"
                    })).mo = _getExViewOrder(i, e.d.k, c), i.mo == _maxDefaultOrder && (i.mo = (_mainUnordered + t).toFixed(1), t += .1), i
                }).values().value(), _.forEach(e.d.c[0].e[0]["n-o"], function (t) {
                    (t = $.extend(t, {
                        mt: "spwos",
                        ctid: r,
                        k: l,
                        v: _constructOddsData({
                            betType: "spwos",
                            odds: t.o,
                            isInplay: c,
                            home: e.d.c[0].e[0].i[0],
                            away: e.d.c[0].e[0].i[1],
                            bestOf: d,
                            sid: o,
                            ctid: r,
                            mn: t.mn
                        })
                    }, 1 != o || c || void 0 !== t.f ? {} : {
                        f: "|o|"
                    })).mo = _getExViewOrder(t, e.d.k, c), delete t.o, t.mo == _spwosOrder && (t.mo = (t.mo + i).toFixed(1), i += .1)
                }), e.d.c[0].e[0].o = e.d.c[0].e[0].o.concat(e.d.c[0].e[0]["n-o"])
            }
            return null != e.d.c[0].e[0].cel && _.forEach(e.d.c[0].e[0].cel, function (t) {
                if (!t.hide) {
                    var i = t.cei.n,
                        n = t.i[0],
                        r = t.i[1],
                        p = t.k,
                        u = t.cei.ctid,
                        h = (_childEventDisplayCurrentTotal(u, c), t.i[10]),
                        f = t.i[11],
                        m = {
                            a: ["tts", "sco"],
                            b: ["1st", "last"],
                            bt: {
                                tts: {
                                    f: "",
                                    mo: 999,
                                    v: [
                                        [],
                                        []
                                    ]
                                },
                                sco: {
                                    f: "",
                                    mo: 999,
                                    v: [
                                        [],
                                        [],
                                        []
                                    ]
                                }
                            }
                        };
                    _.forEach(m.a, function (e) {
                        _.forEach(m.b, function (i) {
                            void 0 !== t.o[e + i] && (m.bt[e].f = t.o[e + i].f, m.bt[e].mo = t.o[e + i].mo, "1st" == i ? m.bt[e].v[0] = t.o[e + i].v : m.bt[e].v[1] = t.o[e + i].v, delete t.o[e + i])
                        })
                    }), "" != m.bt.tts.f && (t.o.tts = m.bt.tts);
                    var g = _.remove(t["n-o"], "mn", "AnytimeGoalScorer");
                    "" != m.bt.sco.f && (t.o.sco = m.bt.sco, t.o.sco.v[2] = void 0 !== g[0] ? g[0].o : []), delete t.o.eps, t.o = _.chain(t.o).mapValues(function (t, s) {
                        return (t = $.extend(t, {
                            mt: s,
                            cn: i,
                            ch: n,
                            ca: r,
                            ctid: u,
                            k: p,
                            pk: l,
                            v: _constructOddsData({
                                betType: s,
                                odds: t.v,
                                isInplay: c,
                                home: e.d.c[0].e[0].i[0],
                                away: e.d.c[0].e[0].i[1],
                                bestOf: d,
                                sid: o,
                                ctid: u
                            })
                        }, 1 != o || c || void 0 !== t.f ? {} : {
                            f: "|o|"
                        }, {
                            scoh: h,
                            scoa: f
                        })).mo = _getExViewOrder(t, e.d.k, c), t.mo == _maxDefaultOrder && (t.mo = (_mainChildUnordered + a).toFixed(1), a += .1), t
                    }).values().value(), _.forEach(t["n-o"], function (t) {
                        (t = $.extend(t, {
                            mt: "spwos",
                            cn: i,
                            ctid: u,
                            k: p,
                            pk: l,
                            v: _constructOddsData({
                                betType: "spwos",
                                odds: t.o,
                                isInplay: c,
                                home: e.d.c[0].e[0].i[0],
                                away: e.d.c[0].e[0].i[1],
                                bestOf: d,
                                sid: o,
                                ctid: u,
                                mn: t.mn
                            })
                        }, 1 != o || c || void 0 !== t.f ? {} : {
                            f: "|o|"
                        }, {
                            scoh: h,
                            scoa: f
                        })).mo = _getExViewOrder(t, e.d.k, c), delete t.o, t.mo == _spwosOrder && (t.mo = (_spwosChildOrder + s).toFixed(1), s += .1)
                    }), e.d.c[0].e[0].o = e.d.c[0].e[0].o.concat(t.o, t["n-o"])
                }
            }), delete t, _.remove(e.d.c[0].e[0].o, function (e) {
                return void 0 == e
            }), e.d.c[0].e[0].o = _.sortByAll(e.d.c[0].e[0].o, "mo"), e.d.c[0].e[0].myo = _.remove(e.d.c[0].e[0].o, function (e) {
                var t = e.mt + "|" + e.ctid + "|" + (void 0 !== e.mn ? e.n : "");
                return _.indexOf(AMStore.getMyMarketTypes(), t) > -1
            }), e
        },
        rowViewOrder = [{
            sid: 1,
            ipBT: "1x2",
            nipBT: "1x2"
        }, {
            sid: 6,
            nipBT: "ml"
        }, {
            sid: 11,
            nipBT: "ml"
        }, {
            sid: 14,
            nipBT: "1x2"
        }, {
            sid: 16,
            nipBT: "1x2"
        }, {
            sid: 18,
            ipBT: "ml",
            nipBT: "ml"
        }, {
            sid: 19,
            nipBT: "1x2"
        }, {
            sid: 22,
            nipBT: "ml"
        }, {
            sid: 23,
            ipBT: "ml",
            nipBT: "ml"
        }, {
            sid: 24,
            nipBT: "1x2"
        }, {
            sid: 25,
            ipBT: "ml",
            nipBT: "ml"
        }, {
            sid: 29,
            nipBT: "1x2"
        }, {
            sid: 30,
            nipBT: "ml"
        }, {
            sid: 31,
            nipBT: "ml"
        }, {
            sid: 32,
            nipBT: "ml"
        }, {
            sid: 34,
            nipBT: "ml"
        }],
        _getExViewOrder = function (e, t, i) {
            if ("spwos" == e.mt && 999 == e.mo) return _spwosOrder;
            if ("EURO" == uv.urView) {
                if (-1 != _.findIndex(rowViewOrder, function (a) {
                        return a.sid == t && (i ? void 0 !== a.ipBT && a.ipBT == e.mt : void 0 !== a.nipBT && a.nipBT == e.mt)
                    })) return 0
            }
            return e.mo
        },
        _childEventDisplayCurrentTotal = function (ctid, ip) {
            return -1 != _.indexOf(eval("[" + displayCurrentTotalSetting + "]"), ctid) && ip
        },
        _dispatchToken = dispatcher.register(function (e) {
            switch (e.type) {
                case CONSTANTS.SITEREFRESH:
                    if (_resetTimer(), _firstLoad = void 0 == e.data.mbd || _eventId != e.data.selobj.evt, _highlightIds = opSetting.GetHighlightIds(), _oddsChange = {
                            Up: [],
                            Down: []
                        }, _showOddsTypeDDL = !1, _showMoreEPS = e.data.uvd.showMoreEPS ? e.data.uvd.showMoreEPS : !_firstLoad && _showMoreEPS, _eventId = e.data.selobj.evt, null != e.data.mbd && e.data.selobj.evt > 0) {
                        var t = "inplay" == (AM_Data = e.data.mbd).d.tn.split(":")[1];
                        $("#center-panel")[t ? "removeClass" : "addClass"]("non-inplay"), void 0 === AM_Data.d.c[0].e[0].o && (AM_Data.d.c[0].e[0].o = {}), (AM_Data = _processOddsData(e.data.mbd)).selId = parseInt(cCtrl.getQueryFromUrl(location.href).sid) || -1, _oddsType = uv.ov, _firstLoad && (_filter.filteredType = t || !t && 1 != AM_Data.d.k || !AM_Data.d.fb ? "" : "|p|"), t && void 0 !== AM_Data.d.c[0].e[0].i[5] && "" != AM_Data.d.c[0].e[0].i[5] && _.contains([1, 19], AM_Data.d.k) && (_cTimer = Timer.interval(1, function () {
                            window._elapsed++, triggerEvent()
                        })), _AMRTimerID = Timer.interval(t ? 30 : 90, function () {
                            cCtrl.loadContent(location.pathname, !1, !1, null, !0)
                        })
                    }
                    if (t) {
                        var i = AM_Data.d.c[0].e[0].sb;
                        18 == AM_Data.d.k ? i && i.players ? (i.players = _.takeRight(_.filter(i.players, function (e) {
                            return e.d
                        }), 2), _.map(_.range(2 - i.players.length), function (e) {
                            i.players.push({})
                        })) : "True" == AM_Data.d.c[0].e[0].i[38] && (AM_Data.d.c[0].e[0].sb = {
                            cp: 0,
                            ps: [{}, {}],
                            players: [{}, {}]
                        }) : 25 == AM_Data.d.k && (i || "True" == AM_Data.d.c[0].e[0].i[38] && (AM_Data.d.c[0].e[0].sb = {
                            cp: 0,
                            s: -1,
                            ps: [{}, {}]
                        }))
                    }
                    triggerEvent(), Timer.after(5, function () {
                        Action.AllMarket.clearOddsChange()
                    });
                    break;
                case CONSTANTS.CENTERPANEL.HIGHLIGHTODDS:
                    _highlightIds = opSetting.GetHighlightIds(), triggerEvent();
                    break;
                case CONSTANTS.ALLMARKETPAGE.HIGHLIGHTODDS:
                    _.includes(_highlightIds, e.sid) ? _.pull(_highlightIds, e.sid) : _highlightIds.push(e.sid), triggerEvent();
                    break;
                case CONSTANTS.CENTERPANEL.REMOVEHIGHLIGHTODDS:
                    _.remove(_highlightIds, function (t) {
                        return _.includes(e.sids, t)
                    }), triggerEvent();
                    break;
                case CONSTANTS.ALLMARKETPAGE.SWITCHLESSMORE:
                    -1 == _.indexOf(_showMoreEventIds, e.eid) ? _showMoreEventIds.push(e.eid) : _.remove(_showMoreEventIds, function (t) {
                        return t == e.eid
                    }), triggerEvent();
                    break;
                case CONSTANTS.ALLMARKETPAGE.SWITCHLESSMORE_EPS:
                    _showMoreEPS = e.isShow, triggerEvent();
                    break;
                case CONSTANTS.ALLMARKETPAGE.FILTEREDMARKET:
                    _filter.filteredType != e.fb && (_filter = $.extend(_filter, {
                        filteredType: e.fb
                    }), triggerEvent());
                    break;
                case CONSTANTS.ALLMARKETPAGE.SHOWODDSTYPEDDL:
                    _showOddsTypeDDL = !_showOddsTypeDDL, void 0 !== e.forceShow && (_showOddsTypeDDL = e.forceShow), triggerEvent();
                    break;
                case CONSTANTS.ALLMARKETPAGE.SHOWMYMARKETS:
                    _showMyMarkets = e.isShow, triggerEvent();
                    break;
                case CONSTANTS.ALLMARKETPAGE.ADDTOMYMARKETS:
                    AMStore.setMyMarketTypes(e.bt, e.ctid, e.smt, !0);
                    var a = _.remove(AM_Data.d.c[0].e[0].o, function (e) {
                        var t = e.mt + "|" + e.ctid + "|" + (void 0 !== e.mn ? e.n : "");
                        return _.indexOf(AMStore.getMyMarketTypes(), t) > -1
                    });
                    AM_Data.d.c[0].e[0].myo = AM_Data.d.c[0].e[0].myo.concat(a), triggerEvent();
                    break;
                case CONSTANTS.ALLMARKETPAGE.REMOVEMYMARKETS:
                    AMStore.setMyMarketTypes(e.bt, e.ctid, e.smt, !1);
                    a = _.remove(AM_Data.d.c[0].e[0].myo, function (e) {
                        var t = e.mt + "|" + e.ctid + "|" + (void 0 !== e.mn ? e.n : "");
                        return -1 == _.indexOf(AMStore.getMyMarketTypes(), t)
                    });
                    0 == AM_Data.d.c[0].e[0].myo.length && (_showMyMarkets = !1), AM_Data.d.c[0].e[0].o = _.sortBy(AM_Data.d.c[0].e[0].o.concat(a), "mo"), triggerEvent();
                    break;
                case CONSTANTS.ALLMARKETPAGE.CLEARODDSCHANGE:
                    _oddsChange = {
                        Up: [],
                        Down: []
                    }, triggerEvent();
                    break;
                case CONSTANTS.ALLMARKETPAGE.SHOWHIDEFILTERBTN:
                    var s = $("#fbContainer"),
                        n = $("#filterbar");
                    if (void 0 !== n[0]) {
                        $(".jspPane", "#center-panel").length > 0 && s.css("width", $(".jspPane", "#center-panel").width() - 20 + "px");
                        var o = n[0].scrollWidth > n[0].clientWidth;
                        n.parent()[o ? "addClass" : "removeClass"]("mg-r-22 mg-l-22").siblings()[o ? "removeClass" : "addClass"]("hidden").end().end().children().first()[o ? "addClass" : "removeClass"]("mg-l-16"), 0 == n.children('[data-ex="' + _filter.filteredType + '"]').length && (_filter.filteredType = n.children(":first").data("ex"), n.children(":first").addClass("actived"), triggerEvent()), $("#fg")[n[0].scrollLeft + n[0].clientWidth >= n[0].scrollWidth - 35 ? "addClass" : "removeClass"]("hidden")
                    }
            }
        }),
        triggerEvent = function () {
            baseInstance.trigger("AM_Update")
        },
        _resetTimer = function () {
            null != _cTimer && (Timer.remove(_cTimer), window._elapsed = 0), null != _AMRTimerID && Timer.remove(_AMRTimerID)
        },
        baseInstance = $({});
    return {
        getAMData: function () {
            return AM_Data
        },
        DispatchToken: _dispatchToken,
        addUpdateListener: function (e, t) {
            var i = t ? _const.updateEvent + "." + t : _const.updateEvent;
            baseInstance.on(i, e)
        },
        removeUpdateListener: function (e) {
            var t = e ? _const.updateEvent + "." + e : _const.updateEvent;
            baseInstance.off(t)
        },
        getHighlightIds: function () {
            return _highlightIds
        },
        getShowMoreEventIds: function () {
            return _showMoreEventIds
        },
        getFilterParam: function () {
            return _filter
        },
        getMyMarketTypes: function () {
            var e = localStorage.getItem("mmt");
            return void 0 !== e && null != e ? JSON.parse(e) : []
        },
        setMyMarketTypes: function (e, t, i, a) {
            var s = e + "|" + t + "|" + i,
                n = AMStore.getMyMarketTypes();
            a ? n.push(s) : _.remove(n, function (e) {
                return e == s
            }), localStorage.setItem("mmt", JSON.stringify(_.uniq(n)))
        },
        chkShowOddsTypeDDL: function () {
            return _showOddsTypeDDL
        },
        chkShowMyMarkets: function () {
            return _showMyMarkets
        },
        getOddsChange: function () {
            return _oddsChange
        },
        getClrUDTimer: function () {
            return clrUDTimer
        },
        getOddsType: function () {
            return _oddsType
        },
        getElapsed: function () {
            return _elapsed
        },
        getFirstLoad: function () {
            return _firstLoad
        },
        setFirstLoad: function (e) {
            _firstLoad = e
        },
        getShowMoreLess_EPS: function () {
            return _showMoreEPS
        },
        getDeeplinkSelId: function () {
            return AM_Data.selId
        }
    }
}();
Action.AllMarket = {
    refresh: function (e) {
        dispatcher.dispatch({
            type: AM_Events.Refresh,
            data: e
        })
    },
    highlightOdds: function (e) {
        dispatcher.dispatch({
            type: CONSTANTS.ALLMARKETPAGE.HIGHLIGHTODDS,
            sid: e
        })
    },
    switchLessMore: function (e) {
        dispatcher.dispatch({
            type: CONSTANTS.ALLMARKETPAGE.SWITCHLESSMORE,
            eid: e
        })
    },
    switchLessMore_EPS: function (e) {
        dispatcher.dispatch({
            type: CONSTANTS.ALLMARKETPAGE.SWITCHLESSMORE_EPS,
            isShow: e
        })
    },
    addToMyMarkets: function (e, t, i) {
        dispatcher.dispatch({
            type: CONSTANTS.ALLMARKETPAGE.ADDTOMYMARKETS,
            bt: e,
            ctid: t,
            smt: i
        })
    },
    removeMyMarkets: function (e, t, i) {
        dispatcher.dispatch({
            type: CONSTANTS.ALLMARKETPAGE.REMOVEMYMARKETS,
            bt: e,
            ctid: t,
            smt: i
        })
    },
    filteredMarket: function (e) {
        dispatcher.dispatch({
            type: CONSTANTS.ALLMARKETPAGE.FILTEREDMARKET,
            fb: e
        })
    },
    showHideOddsTypeDDL: function (e) {
        dispatcher.dispatch({
            type: CONSTANTS.ALLMARKETPAGE.SHOWODDSTYPEDDL,
            forceShow: e
        })
    },
    showHideMyMarkets: function (e) {
        dispatcher.dispatch({
            type: CONSTANTS.ALLMARKETPAGE.SHOWMYMARKETS,
            isShow: e
        })
    },
    clearOddsChange: function () {
        dispatcher.dispatch({
            type: CONSTANTS.ALLMARKETPAGE.CLEARODDSCHANGE
        })
    },
    showHideFilterMoveBtn: function (e, t) {
        dispatcher.dispatch({
            type: CONSTANTS.ALLMARKETPAGE.SHOWHIDEFILTERBTN
        })
    }
}, CONSTANTS.RIGHTPANEL = {
    RESIZE: "RPRESIZE",
    SHOWTV: "SHOWTV",
    HIDETV: "HIDETV",
    ADDSELECTION: "ADDSELECTION",
    UPDATEBETSLIP: "UPDATEBETSLIP",
    REMOVESELECTION: "REMOVESELECTION",
    EDITBETSLIP: "EDITBETSLIP",
    UPDATESTAKE: "UPDATESTAKE",
    UPDATETOWIN: "UPDATETOWIN",
    ADDSTAKE: "ADDSTAKE",
    UPDATECBSTAKE: "UPDATECBSTAKE",
    ADDCBSTAKE: "ADDCBSTAKE",
    SHOWBETCONFIRM: "SHOWBETCONFIRM",
    SHOWPLACEBET: "SHOWPLACEBET",
    UPDATESUMMARY: "UPDATESUMMARY",
    CHANGECOMBOCOLLAPSESTATUS: "CHANGECOMBOCOLLAPSESTATUS",
    ISRETAINSELECTION: "ISRETAINSELECTION",
    TOGGLEMYBET: "TOGGLEMYBET",
    TOGGLELOADING: "TOGGLELOADING",
    SHOWERRORMSG: "RPSHOWERRORMSG",
    COLLAPSEDROW: "COLLAPSEDPARLAYPOPUPROW",
    EXPANDROW: "EXPANDPARLAYPOPUPROW",
    UPDATEMYBET: "UPDATEMYBET",
    UPDATEDANGERSTATUS: "UPDATEDANGERSTATUS",
    TOGGLEUNSETTLED: "TOGGLEUNSETTLED",
    TOGGLESETTLED: "TOGGLESETTLED",
    TOGGLEPARLAYINFO: "MBTOGGLEPARLAYINFO",
    TOGGLEACCEPTBETTERODDS: "TOGGLEACCEPTBETTERODDS",
    SHOWBETCONFIRMATION: "SHOWBETCONFIRMATION",
    TOGGLESINGLEEACHWAY: "TOGGLESINGLEEACHWAY",
    TOGGLECOMBOEACHWAY: "TOGGLECOMBOEACHWAY",
    TV: {
        MENUBTNSHOWHIDE: "MENUBTNSHOWHIDE",
        TOGGLELOCKBTN: "TOGGLELOCKBTN",
        MENUSHOWHIDE: "MENUSHOWHIDE",
        TOGGLETVMENU: "TOGGLETVMENU",
        LOAD_TV_CONTENT: "LOAD_TV_CONTENT",
        TOGGLE_SPORT_MENU: "TOGGLE_SPORT_MENU",
        HIDE_SPORT_MENU: "HIDE_SPORT_MENU",
        TOGGLE_DATE_MENU: "TOGGLE_DATE_MENU",
        HIDE_DATE_MENU: "HIDE_DATE_MENU",
        SEL_SPORT_FILTER: "SEL_SPORT_FILTER",
        SEL_DATE_FILTER: "SEL_DATE_FILTER",
        PLAY_IGNORE_LOCK: "PLAY_IGNORE_LOCK",
        SEL_EVENT_PLAYED: "SEL_EVENT_PLAYED"
    },
    BANNER: {
        TOGGLE: "TOGGLERPBANNER",
        SETBANNERHEIGHT: "SETRPBANNERHEIGHT"
    },
    LIVECENTER: {
        UPDATESCOREBOARD: "UPDATESCOREBOARD",
        CLEARSCOREHIGHLIGHT: "CLEARSCOREHIGHLIGHT"
    },
    MYBET: {
        UPDATEDANGERSTATUS: "MYBET_UPDATEDANGERSTATUS"
    }
};
var BS_Store = function () {
    var e = {
            s: [],
            c: [],
            ts: [],
            tc: [],
            cinfo: [],
            islog: uv.login,
            totalBet: 0,
            totalStake: 0,
            totalPay: 0,
            abo: uv.abo,
            sbc: !1
        },
        t = {
            PLACEBET: "PLACEBET",
            BETCONFIRM: "BETCONFIRM",
            BETRECEIPT: "BETRECEIPT"
        },
        i = "BS_Update",
        a = {
            single: {
                EUR: [5, 10, 25, 50, 100, 200],
                GBP: [5, 10, 25, 50, 100, 200],
                USD: [5, 10, 25, 50, 100, 200],
                SGD: [5, 10, 25, 50, 100, 200],
                RMB: [25, 50, 100, 250, 500, 1e3],
                HKD: [50, 100, 250, 500, 1e3, 2e3],
                VND: [5e4, 15e4, 3e5, 5e5, 1e6, 25e5],
                IDR: [5e4, 15e4, 3e5, 5e5, 1e6, 25e5],
                MYR: [20, 50, 100, 200, 500, 1e3],
                THB: [150, 300, 500, 1e3, 2e3, 5e3],
                KHR: [2e4, 5e4, 1e5, 2e5, 5e5, 1e6],
                BRL: [10, 25, 50, 100, 250, 500],
                JPY: [500, 1e3, 2500, 5e3, 1e4, 25e3],
                KRW: [5e3, 1e4, 25e3, 5e4, 1e5, 25e4]
            },
            parlay: {
                EUR: [1, 2, 5, 10, 25, 50],
                GBP: [1, 2, 5, 10, 25, 50],
                USD: [1, 2, 5, 10, 25, 50],
                SGD: [1, 2, 5, 10, 25, 50],
                RMB: [5, 10, 25, 50, 100, 200],
                HKD: [10, 20, 50, 100, 200, 400],
                VND: [1e4, 25e3, 5e4, 1e5, 2e5, 5e5],
                IDR: [1e4, 25e3, 5e4, 1e5, 2e5, 5e5],
                MYR: [5, 10, 20, 40, 100, 200],
                THB: [25, 50, 100, 250, 500, 1e3],
                KHR: [4e3, 1e4, 2e4, 4e4, 1e5, 2e5],
                BRL: [2, 4, 10, 20, 50, 100],
                JPY: [100, 200, 500, 1e3, 2e3, 5e3],
                KRW: [1e3, 2e3, 5e3, 1e4, 2e4, 5e4]
            }
        },
        s = {
            editingId: "",
            isOpenCombo: !1,
            currentMode: t.PLACEBET,
            modes: t,
            showMyBet: !1,
            showLoading: !1,
            retainSelection: !1,
            showLoading: !1,
            needFocus: !1,
            needAcceptChange: !1,
            uc: uv.usc,
            dangerStatus: null
        },
        n = dispatcher.register(function (i) {
            switch (i.type) {
                case CONSTANTS.RIGHTPANEL.UPDATEBETSLIP:
                    if (e = _.assign({
                            abo: e.abo,
                            sbc: !1
                        }, i.BS_Data), s.showLoading = !1, null != e && null != e.s && e.s.length > 0) {
                        i.isRefresh && "" != s.editingId || (s.editingId = e.s[0].sid);
                        for (var a = {}, n = [], r = 0; r < e.s.length; r++) {
                            (f = e.s[r]).st > 0 ? h(f) : 0 == f.st && (f.st = null), a.hasOwnProperty(f.eid) ? n.push(f.eid) : a[f.eid] = !1
                        }
                        e.s.length > 1 && (S(), C()), T(), E()
                    } else s.editingId = "";
                    s.isOpenCombo = i.isOpenCombo, s.currentMode = i.isRefresh && s.currentMode == t.BETCONFIRM ? t.BETCONFIRM : t.PLACEBET, s.needFocus = !i.isRefresh, s.needAcceptChange = i.needAcceptChange, s.dangerStatus = null, s.showMyBet = !1, o();
                    break;
                case CONSTANTS.RIGHTPANEL.EDITBETSLIP:
                    s.editingId = i.key, o();
                    break;
                case CONSTANTS.RIGHTPANEL.UPDATESTAKE:
                    c(i.sid, i.value, !0, !1), o();
                    break;
                case CONSTANTS.RIGHTPANEL.UPDATETOWIN:
                    c(i.sid, i.value, !1, !1), o();
                    break;
                case CONSTANTS.RIGHTPANEL.ADDSTAKE:
                    c(i.sid, i.value, !0, !0), o();
                    break;
                case CONSTANTS.RIGHTPANEL.UPDATECBSTAKE:
                    d(i.cid, i.value, !1), o();
                    break;
                case CONSTANTS.RIGHTPANEL.ADDCBSTAKE:
                    d(i.cid, i.value, !0), o();
                    break;
                case CONSTANTS.RIGHTPANEL.SHOWBETCONFIRM:
                    s.currentMode = t.BETCONFIRM, o();
                    break;
                case CONSTANTS.RIGHTPANEL.SHOWPLACEBET:
                    s.currentMode = t.PLACEBET, o();
                    break;
                case CONSTANTS.RIGHTPANEL.UPDATESUMMARY:
                    e = _.assign({
                        abo: e.abo,
                        sbc: !1
                    }, i.BS_Data), b(), s.retainSelection = !1, s.currentMode = t.BETRECEIPT, s.isOpenCombo = !0, s.showLoading = !1, s.uc = i.BS_Data.usc;
                    var l = null == e ? null : e.s,
                        p = _.pluck(_.filter(l, {
                            idan: !0
                        }), "wo");
                    p.length > 0 && Action.RightPanel.fetchDangerStatus(p, "betreceipt");
                    var u = utility.cookie.read("dangerStatus");
                    u && u.length > 0 && (s.dangerStatus = JSON.parse(u)), o();
                    break;
                case CONSTANTS.RIGHTPANEL.CHANGECOMBOCOLLAPSESTATUS:
                    s.isOpenCombo = i.isOpenCombo, BS.WriteExpandCBCookies(i.isOpenCombo), o();
                    break;
                case CONSTANTS.RIGHTPANEL.ISRETAINSELECTION:
                    s.retainSelection = i.isRetain, o();
                    break;
                case CONSTANTS.RIGHTPANEL.TOGGLEMYBET:
                    s.showMyBet = i.isShowMyBet, i.isShowMyBet && (s.uc = i.uc), o();
                    break;
                case CONSTANTS.RIGHTPANEL.TOGGLELOADING:
                    s.showLoading = i.isLoading, o();
                    break;
                case CONSTANTS.RIGHTPANEL.TOGGLEACCEPTBETTERODDS:
                    e.abo = i.isChecked, o();
                    break;
                case CONSTANTS.RIGHTPANEL.SHOWBETCONFIRMATION:
                    e.sbc = i.isChecked, o();
                    break;
                case CONSTANTS.RIGHTPANEL.SHOWERRORMSG:
                    e.errmsg = i.msg, o();
                    break;
                case CONSTANTS.RIGHTPANEL.UPDATEDANGERSTATUS:
                    s.dangerStatus = i.data, T(_.pluck(_.filter(s.dangerStatus.t, {
                        ts: 3
                    }), "bid")), o();
                    break;
                case CONSTANTS.RIGHTPANEL.TOGGLESINGLEEACHWAY:
                    var f;
                    (f = _.find(e.s, {
                        sid: i.sid
                    })).isew = i.isChecked, h(f), !(m = _.find(e.c, {
                        wid: 1
                    })) || (_.every(e.s, {
                        isew: !0
                    }) ? m.isew = !0 : m.isew = !1, O()), e.s.length > 0 && S(), T(), y(), o();
                    break;
                case CONSTANTS.RIGHTPANEL.TOGGLECOMBOEACHWAY:
                    var m;
                    (m = _.find(e.c, {
                        wid: i.wid
                    })).isew = i.isChecked;
                    for (r = 0; r < e.s.length; r++) 1 == i.wid && (e.s[r].isew = m.isew), h(e.s[r]);
                    e.s.length > 0 && S(), T(), 1 == i.wid && y(), O(), o()
            }
        }),
        o = function () {
            l(), r.trigger("BS_Update"), s.needFocus && (s.needFocus = !1)
        },
        r = $({}),
        l = function () {
            if (s.currentMode != t.PLACEBET) {
                var i = !1;
                e.tc = $.grep(e.c, function (e) {
                    return null != e.cba && e.cba > 0 && 1 != e.wid
                }).map(function (e) {
                    return null != e.cerr && "" != e.cerr || (i = !0), _.assign({}, e)
                }), e.tc.length > 0 ? e.ts = e.s.map(function (e) {
                    return _.assign({
                        hasSuccessComboBet: i
                    }, e)
                }) : e.ts = $.grep(e.s, function (e) {
                    return null != e.st && e.st > 0
                }).map(function (e) {
                    return _.assign({}, e)
                })
            } else e.ts = e.s.map(function (e) {
                return _.assign({}, e)
            }), e.tc = e.c.map(function (e) {
                return _.assign({}, e)
            });
            e.canNotParlay && e.canNotParlay.length > 0 && _.forEach(e.ts, function (t) {
                _.includes(e.canNotParlay, "" + t.peid) && (t.ap = !1)
            })
        },
        c = function (t, i, a, s) {
            for (var n = p(i), o = u(i), r = isNaN(parseFloat(o)) ? null : parseFloat(o), l = ("" + o).length != ("" + r).length, c = 0; c < e.s.length; c++) {
                var d = e.s[c];
                if (d.sid == t) {
                    a ? (d.st = s ? null == d.st ? r : parseFloat(d.st) + r : r, h(d), l && (d.st = null == d.st ? n : ("" + d.st).split(".")[0] + n)) : (d.towin = r, f(d), null != d.towin && l && (d.towin += n));
                    break
                }
            }
            e.c[0] && (e.c[0].cba = null, C()), T(), E()
        },
        d = function (t, i, a) {
            for (var s = p(i), n = u(i), o = isNaN(parseFloat(n)) ? null : parseFloat(n), r = ("" + n).length != ("" + o).length, l = 0; l < e.c.length; l++) {
                var c = e.c[l];
                if (c.wid == t) {
                    c.cba = a ? null == c.cba ? o : parseFloat(c.cba) + o : o, m(c), r && (c.cba = null == c.cba ? s : ("" + c.cba).split(".")[0] + s);
                    break
                }
            }
            T(), 1 == t && E(), C()
        },
        p = function (e) {
            var t = /(\.\d{0,2})\d?$/.exec(e);
            return null == t ? null : t[1]
        },
        u = function (e) {
            var t = p(e),
                i = e;
            null != t && (i = ("" == i.split(".")[0] ? "0" : i.split(".")[0]) + t);
            return i
        },
        h = function (e) {
            var t = null == e.st ? 0 : e.st,
                i = e.isew && e.bsew ? e.bsew.bmax : e.bs.bmax,
                a = e.o,
                s = e.bo,
                n = e.po;
            t > 0 && 0 !== a ? t > i ? (e.st = i, e.towin = g(i, a, s), e.toplace = g(i, n, s)) : (e.towin = g(t, a, s), e.toplace = g(t, n, s)) : (0 === a && (e.st = null), 0 == e.st ? (e.towin = 0, e.toplace = 0) : null == e.st && (e.towin = null, e.toplace = null))
        },
        f = function (e) {
            var t = null == e.towin ? 0 : e.towin,
                i = e.bs.bmax,
                a = e.o,
                s = e.bo;
            t > 0 && 0 !== a ? (e.st = v(t, a, s), e.st > i && (e.st = i, e.towin = g(i, a, s))) : (0 === a && (e.st = null, e.towin = null), 0 == e.towin ? e.st = 0 : null == e.towin && (e.st = null))
        },
        m = function (t) {
            var i = null == t.cba ? 0 : t.cba,
                a = t.isew && t.cbsew ? t.cbsew.bmax : t.cbs.bmax,
                s = t.co,
                n = t.pco,
                o = t.bc;
            if (1 == t.wid)
                if (i > 0 && "0" !== s) {
                    for (var r = 0, l = 0, c = 0; c < e.s.length; c++) {
                        (d = e.s[c]).st = i, d.isew = t.isew ? t.isew : d.isew, h(d), r += d.towin, l += d.toplace
                    }
                    t.payout = r, t.placePayout = l
                } else {
                    for (c = 0; c < e.s.length; c++) {
                        var d;
                        (d = e.s[c]).st = null, h(d)
                    }
                    t.payout = null, t.placePayout = null
                }
            else i > 0 && "0" !== s ? (i > a && (t.cba = a), t.payout = t.cba * s - t.cba * o, t.placePayout = t.cba * n - t.cba * o) : ("0" === s && (t.cba = null), t.payout = null, t.placePayout = null)
        },
        g = function (t, i, a) {
            var s = 0,
                n = e.ot;
            return 1 == a && (n = 1), s = 1 == n ? t * (i - 1) : 2 == n ? t * i : i < 0 ? t : t * i, Math.abs(Math.round(100 * s) / 100)
        },
        v = function (t, i, a) {
            var s = 0,
                n = e.ot;
            return 1 == a && (n = 1), s = 1 == n ? t / (i - 1) : 2 == n ? t / i : i < 0 ? t : t / i, Math.abs(Math.round(100 * s) / 100)
        },
        S = function () {
            if (null != e.s[0]) {
                for (var t = new Array, i = new Array, a = 0, s = new Array, n = new Array, o = 0, r = 0, l = e.s.length; r < l; r++) {
                    if ("true" != (p = e.s[r]).ip && 0 != p.ap && 8888 != p.rsl) {
                        for (var c = 0; c < n.length; c++) n[c] == p.eid && (s[o++] = p.eid);
                        n[n.length] = p.eid
                    }
                }
                var d = s.unique();
                for (r = 0; r < e.s.length; r++) {
                    var p;
                    if ("true" != (p = e.s[r]).ip && 0 != p.ap && 8888 != p.rsl)
                        if (d.length > 0)
                            for (var u = 0; u < d.length; u++) d[u] != p.eid && (t[a] = parseFloat(p.eo), i[a] = parseFloat(p.po ? p.po : 0), ++a);
                        else t[a] = parseFloat(p.eo), i[a] = parseFloat(p.po ? p.po : 0), ++a
                }
                var h = t.length,
                    f = (new Array(h), new Array(h)),
                    g = new Array(h);
                for (r = 0; r < h; r++) f[r] = t[r], g[r] = i[r];
                l = 2;
                var v = 0,
                    S = 0,
                    T = {},
                    b = {};
                for (r = 1; r < h; r++) {
                    for (var E = 0, C = 0, _ = h - 1; _ >= r; _--) {
                        for (var y = 0, O = 0, w = _ - 1; w >= r - 1; w--) y += f[w], O += g[w];
                        f[_] = t[_] * y, E += f[_], g[_] = i[_] * O, C += g[_]
                    }
                    v += E, T[l] = E, S += C, b[l] = C, l++
                }
                r > 2 && (T[BS.Utility.FullCoverWager(h)] = v, b[BS.Utility.FullCoverWager(h)] = S);
                for (c = 0; c < e.c.length; c++) {
                    var A = e.c[c];
                    null != A && (A.co = T[A.wid], A.pco = b[A.wid], A.cba = A.cba > 0 ? A.cba : null, null == A.cba ? (A.payout = null, A.placePayout = null) : m(A))
                }
            }
        },
        T = function (t) {
            for (var i = 0, a = 0, s = 0, n = 0, o = 0, r = 0, l = 0, c = 0, d = 0; d < e.s.length; d++) {
                var p = e.s[d],
                    u = p.st;
                t && _.indexOf(t, p.wo.toString()) > -1 || null != u && u > 0 && (i++, s += u, o += p.towin, p.isew && p.po && p.po > 0 && (i++, s += u, r += p.toplace))
            }
            for (d = 1; d < e.c.length; d++) {
                var h = e.c[d],
                    f = h.cba;
                if (null != f && f > 0) {
                    var m = h.bc,
                        g = null == h.co ? "" : h.co,
                        v = null == h.pco ? "" : h.pco;
                    a += m, n += f * m, l += f * g - f * m, h.isew && h.pco && h.pco > 0 && (a += m, n += f * m, c += f * v - f * m)
                }
            }
            if (e.s.length > 1) {
                var S = e.c[0];
                S.payout = null, S.placePayout = null, S.cba && S.cba > 0 && (o > 0 && (S.payout = o), S.isew && (S.placePayout = r))
            }
            e.totalBet = i + a, e.totalStake = s + n, e.totalPay = o + r + l + c
        },
        b = function () {
            var t = 0,
                i = 0,
                a = 0;
            if (null != e.s[0])
                for (var s = 0; s < e.s.length; s++) {
                    var n = e.s[s];
                    if (n.st > 0) {
                        var o = g(n.st, n.o, n.bo);
                        9999 == n.rsl && (t++, i += n.st, a += o), n.towin = o, n.st = n.st
                    }
                }
            if (null != e.c[0])
                for (s = 1; s < e.c.length; s++) {
                    var r = e.c[s];
                    r.cba > 0 && 9999 == r.rsl && (t += r.bc, i += r.cba * r.bc, a += r.payout)
                }
            e.totalBet = t, e.totalStake = i, e.totalPay = a
        },
        E = function () {
            for (var t = "", i = 0; i < e.s.length; i++) {
                var a = e.s[i];
                t += (null != a.st ? a.st : 0) + BS.SEPARATOR
            }
            t = t.slice(0, -1), BS.WriteSStakeCookies(t)
        },
        C = function () {
            for (var t = "", i = 0; i < e.c.length; i++) {
                var a = e.c[i];
                t += (null != a.cba ? a.cba : 0) + BS.SEPARATOR
            }
            t = t.slice(0, -1), BS.WriteCBStakeCookies(t)
        },
        y = function () {
            for (var t = "", i = 0; i < e.s.length; i++) {
                t += e.s[i].isew.toString() + BS.SEPARATOR
            }
            t = t.slice(0, -1), BS.WriteSEachWayCookies(t)
        },
        O = function () {
            for (var t = "", i = 0; i < e.c.length; i++) {
                t += (!!e.c[i].isew).toString() + BS.SEPARATOR
            }
            t = t.slice(0, -1), BS.WriteCBEachWayCookies(t)
        };
    return {
        getData: function () {
            return _.assign({}, e)
        },
        getQuickStake: function (e, t) {
            var i = e ? a.single[t] : a.parlay[t];
            return null == i ? e ? a.single.EUR : a.parlay.EUR : i
        },
        DispatchToken: n,
        addUpdateListener: function (e, t) {
            var a = t ? i + "." + t : i;
            r.on(a, e)
        },
        removeUpdateListener: function (e) {
            var t = e ? i + "." + e : i;
            r.off(t)
        },
        getExtraData: function () {
            return _.assign({}, s)
        },
        isRetainSelection: function () {
            return s.retainSelection
        },
        showMyBet: function () {
            return s.showMyBet
        },
        currentMode: function () {
            return s.currentMode
        },
        showBetConfirmation: function () {
            return !1
        },
        modes: t
    }
}();
Action.RightPanel = {
    resize: function (e) {
        UI.RPRESIZE(e)
    },
    addSelection: function (e, t, i, a, s, n, o, r) {
        r || (r = !1), BS.AddSelection(e, t, i, a, s, n, null == o || 0 == o ? t : o, !!r)
    },
    updateBetSlip: function (e, t, i) {
        dispatcher.dispatch({
            type: CONSTANTS.RIGHTPANEL.UPDATEBETSLIP,
            BS_Data: e,
            isOpenCombo: "true" == BS.bsCookie.getCookieValue(BS.expandCBCookies),
            isRefresh: t,
            needAcceptChange: i
        })
    },
    removeSelection: function (e) {
        BS.RemoveSelection(e)
    },
    editBetSlip: function (e) {
        dispatcher.dispatch({
            type: CONSTANTS.RIGHTPANEL.EDITBETSLIP,
            key: e
        })
    },
    updateStake: function (e, t) {
        dispatcher.dispatch({
            type: CONSTANTS.RIGHTPANEL.UPDATESTAKE,
            sid: e,
            value: t
        })
    },
    updateToWin: function (e, t) {
        dispatcher.dispatch({
            type: CONSTANTS.RIGHTPANEL.UPDATETOWIN,
            sid: e,
            value: t
        })
    },
    addStake: function (e, t) {
        dispatcher.dispatch({
            type: CONSTANTS.RIGHTPANEL.ADDSTAKE,
            sid: e,
            value: t
        })
    },
    updateComboStake: function (e, t) {
        dispatcher.dispatch({
            type: CONSTANTS.RIGHTPANEL.UPDATECBSTAKE,
            cid: e,
            value: t
        })
    },
    addComboStake: function (e, t) {
        dispatcher.dispatch({
            type: CONSTANTS.RIGHTPANEL.ADDCBSTAKE,
            cid: e,
            value: t
        })
    },
    emptyBetslip: function () {
        BS.EmptyBetSlip()
    },
    verifyBetSlip: function () {
        showBetConfirm()
    },
    showBetConfirm: function () {
        dispatcher.dispatch({
            type: CONSTANTS.RIGHTPANEL.SHOWBETCONFIRM
        })
    },
    showPlacebet: function () {
        BS.BetConfirmToPlaceBet(), dispatcher.dispatch({
            type: CONSTANTS.RIGHTPANEL.SHOWPLACEBET
        })
    },
    placebetToBetConfirm: function () {
        BS.PlacebetToBetConfirm()
    },
    betConfirmToBetReceipt: function () {
        BS.BetConfirmToBetReceipt()
    },
    betReceiptToPlacebet: function () {
        BS.BetReceiptToPlacebet()
    },
    placebetToBetReceipt: function () {
        BS.PlacebetToBetReceipt()
    },
    updateSummary: function (e) {
        dispatcher.dispatch({
            type: CONSTANTS.RIGHTPANEL.UPDATESUMMARY,
            BS_Data: e
        })
    },
    changeComboCollapseStatus: function (e) {
        dispatcher.dispatch({
            type: CONSTANTS.RIGHTPANEL.CHANGECOMBOCOLLAPSESTATUS,
            isOpenCombo: e
        })
    },
    isRetainSelection: function (e) {
        dispatcher.dispatch({
            type: CONSTANTS.RIGHTPANEL.ISRETAINSELECTION,
            isRetain: e
        })
    },
    toggleMyBet: function (e, t) {
        BS.toggleRefreshTimer(!e), e ? dispatcher.dispatch({
            type: CONSTANTS.RIGHTPANEL.TOGGLEMYBET,
            isShowMyBet: e,
            uc: t.uc
        }) : dispatcher.dispatch({
            type: CONSTANTS.RIGHTPANEL.TOGGLEMYBET,
            isShowMyBet: e
        })
    },
    toggleLoading: function (e) {
        dispatcher.dispatch({
            type: CONSTANTS.RIGHTPANEL.TOGGLELOADING,
            isLoading: e
        })
    },
    updateAcceptBetterOdds: function (e) {
        BS.UpdateAcceptBetterOdds(e)
    },
    updateShowBetConfirmation: function (e) {
        BS.UpdateShowBetConfirmation(e)
    },
    toggleAcceptBetterOdds: function (e) {
        dispatcher.dispatch({
            type: CONSTANTS.RIGHTPANEL.TOGGLEACCEPTBETTERODDS,
            isChecked: e
        })
    },
    toggleShowBetConfirmation: function (e) {
        dispatcher.dispatch({
            type: CONSTANTS.RIGHTPANEL.SHOWBETCONFIRMATION,
            isChecked: e
        })
    },
    closePopUpWindow: function () {
        BS.ClosePopUpWindow()
    },
    showErrorMsg: function (e) {
        dispatcher.dispatch({
            type: CONSTANTS.RIGHTPANEL.SHOWERRORMSG,
            msg: e
        })
    },
    updateMyBet: function (e) {
        dispatcher.dispatch({
            type: CONSTANTS.RIGHTPANEL.UPDATEMYBET,
            data: e
        })
    },
    fetchDangerStatus: function (e, t) {
        BS.fetchDangerStatus(e, t)
    },
    updateDangerStatus: function (e, t) {
        dispatcher.dispatch({
            type: CONSTANTS.RIGHTPANEL.UPDATEDANGERSTATUS,
            data: e
        })
    },
    updateDangerStatus_mybet: function (e) {
        dispatcher.dispatch({
            type: CONSTANTS.RIGHTPANEL.MYBET.UPDATEDANGERSTATUS,
            data: e
        })
    },
    toggleUnsettled: function (e) {
        dispatcher.dispatch({
            type: CONSTANTS.RIGHTPANEL.TOGGLEUNSETTLED,
            isOpen: e
        })
    },
    toggleSettled: function (e) {
        dispatcher.dispatch({
            type: CONSTANTS.RIGHTPANEL.TOGGLESETTLED,
            isOpen: e
        })
    },
    refreshMyBet: function (e) {
        MB.refreshMyBet(e)
    },
    toggleParlayInfo: function (e) {
        dispatcher.dispatch({
            type: CONSTANTS.RIGHTPANEL.TOGGLEPARLAYINFO,
            betId: e
        })
    },
    collapsedRow: function () {
        console.log("collapsedRow"), dispatcher.dispatch({
            type: CONSTANTS.RIGHTPANEL.COLLAPSEDROW
        })
    },
    expandRow: function (e) {
        dispatcher.dispatch({
            type: CONSTANTS.RIGHTPANEL.EXPANDROW,
            index: e
        })
    },
    resizeFrame: function () {
        var e = Math.max($("#lt-right").height(), $("#lt-right .betbox").height());
        pm.resizeFrame(e)
    },
    resetBetSlip: function () {
        pm.resetBetSlip()
    },
    toggleSingleEachWay: function (e, t) {
        dispatcher.dispatch({
            type: CONSTANTS.RIGHTPANEL.TOGGLESINGLEEACHWAY,
            sid: e,
            isChecked: t
        })
    },
    toggleComboEachWay: function (e, t) {
        dispatcher.dispatch({
            type: CONSTANTS.RIGHTPANEL.TOGGLECOMBOEACHWAY,
            wid: e,
            isChecked: t
        })
    },
    TV: {
        showMenuBtn: function () {
            dispatcher.dispatch({
                type: CONSTANTS.RIGHTPANEL.TV.MENUBTNSHOWHIDE,
                isDisplay: !0
            })
        },
        hideMenuBtn: function () {
            dispatcher.dispatch({
                type: CONSTANTS.RIGHTPANEL.TV.MENUBTNSHOWHIDE,
                isDisplay: !1
            })
        },
        toggleLockBtn: function (e, t) {
            dispatcher.dispatch({
                type: CONSTANTS.RIGHTPANEL.TV.TOGGLELOCKBTN,
                islock: e,
                isSaveCookie: t
            })
        },
        toggleTvMenu: function (e) {
            dispatcher.dispatch({
                type: CONSTANTS.RIGHTPANEL.TV.TOGGLETVMENU,
                isDisplay: e
            }), e && liveCentreControl.loadEvent()
        },
        toggleSportMenu: function () {
            dispatcher.dispatch({
                type: CONSTANTS.RIGHTPANEL.TV.TOGGLE_SPORT_MENU
            })
        },
        toggleDateMenu: function () {
            dispatcher.dispatch({
                type: CONSTANTS.RIGHTPANEL.TV.TOGGLE_DATE_MENU
            })
        },
        hideSportMenu: function () {
            dispatcher.dispatch({
                type: CONSTANTS.RIGHTPANEL.TV.HIDE_SPORT_MENU
            })
        },
        hideDateMenu: function () {
            dispatcher.dispatch({
                type: CONSTANTS.RIGHTPANEL.TV.HIDE_DATE_MENU
            })
        },
        tvDataLoaded: function (e) {
            dispatcher.dispatch({
                type: CONSTANTS.RIGHTPANEL.TV.LOAD_TV_CONTENT,
                lsData: e
            })
        },
        selSportFilter: function (e) {
            dispatcher.dispatch({
                type: CONSTANTS.RIGHTPANEL.TV.SEL_SPORT_FILTER,
                sport: e
            })
        },
        selDateFilter: function (e) {
            dispatcher.dispatch({
                type: CONSTANTS.RIGHTPANEL.TV.SEL_DATE_FILTER,
                date: e
            })
        },
        playTvDefault: function (e) {
            liveCentreControl.playDefault(e)
        },
        resetToDefault: function () {
            liveCentreControl.resetToDefault()
        },
        playTvIgnoreLock: function (e, t, i, a, s, n, o) {
            liveCentreControl.playIgnoreLock(e, t, i, a, s, n, o)
        },
        setPlayEventId: function (e) {
            dispatcher.dispatch({
                type: CONSTANTS.RIGHTPANEL.TV.SEL_EVENT_PLAYED,
                eid: e
            })
        }
    },
    LiveCenter: {
        updateScoreboard: function (e) {
            dispatcher.dispatch({
                type: CONSTANTS.RIGHTPANEL.LIVECENTER.UPDATESCOREBOARD,
                data: e
            })
        },
        clearScoreHighlight: function () {
            dispatcher.dispatch({
                type: CONSTANTS.RIGHTPANEL.LIVECENTER.CLEARSCOREHIGHLIGHT
            })
        }
    },
    Banner: {
        show: function () {
            dispatcher.dispatch({
                type: CONSTANTS.RIGHTPANEL.BANNER.TOGGLE,
                isDisplay: !0
            })
        },
        hide: function () {
            dispatcher.dispatch({
                type: CONSTANTS.RIGHTPANEL.BANNER.TOGGLE,
                isDisplay: !1
            })
        },
        setBannerHeight: function (e) {
            dispatcher.dispatch({
                type: CONSTANTS.RIGHTPANEL.BANNER.SETBANNERHEIGHT,
                h: e
            })
        }
    },
    initBSEvent: function () {
        BS.on(BS.Events.ExceedMaxiumSelections, "betslip", function () {
            Action.RightPanel.showErrorMsg(l.BS_Maximum_Selection)
        }), BS.on(BS.Events.RemoveHighlightOdds, "centerPanel", function (e, t) {
            Action.CenterPanel.removeHighlightOdds(t)
        }), BS.on(BS.Events.HighlightOdds, "centerPanel", function (e, t) {
            Action.CenterPanel.HighlightOdds(t)
        }), BS.on(BS.Events.UpdateBetslip, "betslip", function (e, t, i, a) {
            Action.RightPanel.updateBetSlip(t, i, a)
        }), BS.on(BS.Events.UpdateSummary, "betslip", function (e, t) {
            Action.RightPanel.updateSummary(t)
        }), BS.on(BS.Events.Processing, "betslip", function () {
            Action.RightPanel.toggleLoading(!0)
        }), BS.on(BS.Events.Completed, "betslip", function () {
            Action.RightPanel.toggleLoading(!1)
        }), BS.on(BS.Events.ToggleAcceptBetterOdds, "betslip", function (e, t) {
            Action.RightPanel.toggleAcceptBetterOdds(t)
        }), BS.on(BS.Events.ToggleShowBetConfirmation, "betslip", function (e, t) {
            Action.RightPanel.toggleShowBetConfirmation(t)
        }), BS.on(BS.Events.ShowBetConfirm, "betslip", function () {
            Action.RightPanel.showBetConfirm()
        }), BS.on(BS.Events.RefreshBalance, "betslip", function () {
            try {
                pm.refreshBalance()
            } catch (e) {
                console.log("ERROR: pm.refreshBalance() - " + e.message)
            }
        }), BS.on(BS.Events.DisplayMessage, "betslip", function (e, t, i) {
            try {
                pm.showParentAlert(t, i)
            } catch (e) {
                console.log("ERROR: pm.showParentAlert() - " + e.message)
            }
        })
    },
    initMBEvent: function () {
        MB.on(MB.Events.Refresh, "mybet", function (e, t, i) {
            Action.RightPanel.updateMyBet(t), i && Action.RightPanel.toggleMyBet(!0, t)
        })
    }
};
var MB = {
        _eventInstance: $({}),
        Events: {
            Refresh: "MBRefresh"
        },
        fire: function (e, t) {
            MB._eventInstance.trigger(e, t)
        },
        on: function (e, t, i) {
            if (e && "" != e) {
                var a = t ? e + "." + t : e;
                MB._eventInstance.on(a, i)
            }
        },
        refreshMyBet: function (e) {
            utility.service("MyBetService", "GetMyBet", null, "GET", function (t) {
                null != t && null != t.isAuth && 0 == t.isAuth ? document.location.reload() : MB.fire(MB.Events.Refresh, [t, e])
            })
        },
        Init: function () {
            uv.login && MB.refreshMyBet()
        }
    },
    MB_Store = function () {
        var e = {
                aul: [],
                ipul: [],
                sl: [],
                uc: 0,
                sc: 0
            },
            t = "MB_Update",
            i = {
                isOpenUnsettled: !0,
                isOpenSettled: !1,
                showParlayInfo: null,
                dangerStatus: null
            },
            a = dispatcher.register(function (t) {
                switch (t.type) {
                    case CONSTANTS.RIGHTPANEL.UPDATEMYBET:
                        e = t.data, i.dangerStatus = null, s();
                        break;
                    case CONSTANTS.RIGHTPANEL.TOGGLEUNSETTLED:
                        i.isOpenUnsettled = t.isOpen, s();
                        break;
                    case CONSTANTS.RIGHTPANEL.TOGGLESETTLED:
                        i.isOpenSettled = t.isOpen, s();
                        break;
                    case CONSTANTS.RIGHTPANEL.TOGGLEPARLAYINFO:
                        i.showParlayInfo = t.betId, s();
                        break;
                    case CONSTANTS.RIGHTPANEL.MYBET.UPDATEDANGERSTATUS:
                        i.dangerStatus = t.data, s()
                }
            }),
            s = function () {
                n.trigger("MB_Update")
            },
            n = $({});
        return {
            DispatchToken: a,
            addUpdateListener: function (e, i) {
                var a = i ? t + "." + i : t;
                n.on(a, e)
            },
            removeUpdateListener: function (e) {
                var i = e ? t + "." + e : t;
                n.off(i)
            },
            getData: function () {
                return _.assign({}, e)
            },
            getExtraData: function () {
                return _.assign({}, i)
            }
        }
    }(),
    TVMenu_Store = function () {
        var e, t = "TV_Update",
            i = {
                showLC: !1,
                i18n: {
                    tvMenuTxt: ""
                },
                showMenu: !1,
                lsData: null,
                showSportSubMenu: !1,
                showDateSubMenu: !1,
                sportFilter: "",
                dateFilter: ""
            },
            a = dispatcher.register(function (t) {
                switch (t.type) {
                    case CONSTANTS.SITEREFRESH:
                        void 0 != t.data.selobj.tab && "inplay" == t.data.selobj.tab.toLowerCase() || (e || (e = $("#tvMenu")), e.hide()), i.i18n.tvMenuTxt = ccparam.tvMenuTxt, i.i18n.tvGuideTxt = ccparam.tvGuildTxt, s();
                        break;
                    case CONSTANTS.RIGHTPANEL.TV.LOAD_TV_CONTENT:
                        i.lsData = t.lsData, s();
                        break;
                    case CONSTANTS.RIGHTPANEL.TV.MENUBTNSHOWHIDE:
                        i.showMenuBtn = t.isDisplay, i.showLC && s();
                        break;
                    case CONSTANTS.RIGHTPANEL.TV.MENUSHOWHIDE:
                        i.showMenu = t.isDisplay, i.showLC && s();
                        break;
                    case CONSTANTS.RIGHTPANEL.TV.TOGGLETVMENU:
                        i.showMenu = t.isDisplay, i.showMenu || s();
                        break;
                    case CONSTANTS.RIGHTPANEL.TV.TOGGLE_SPORT_MENU:
                        i.showSportSubMenu = !i.showSportSubMenu, i.showDateSubMenu = !1, s();
                        break;
                    case CONSTANTS.RIGHTPANEL.TV.HIDE_SPORT_MENU:
                        i.showSportSubMenu = !1, s();
                        break;
                    case CONSTANTS.RIGHTPANEL.TV.TOGGLE_DATE_MENU:
                        i.showDateSubMenu = !i.showDateSubMenu, i.showSportSubMenu = !1, s();
                        break;
                    case CONSTANTS.RIGHTPANEL.TV.HIDE_DATE_MENU:
                        i.showDateSubMenu = !1, s();
                        break;
                    case CONSTANTS.RIGHTPANEL.TV.LOAD_TV_CONTENT:
                        i.lsData = t.lsData, s();
                        break;
                    case CONSTANTS.RIGHTPANEL.TV.SEL_SPORT_FILTER:
                        i.sportFilter = t.sport, i.dateFilter = "", i.showSportSubMenu = !i.showSportSubMenu, s();
                        break;
                    case CONSTANTS.RIGHTPANEL.TV.SEL_DATE_FILTER:
                        i.dateFilter = t.date, i.showDateSubMenu = !i.showDateSubMenu, s();
                        break;
                    case CONSTANTS.RIGHTPANEL.TV.SEL_EVENT_PLAYED:
                        i.playEventId = t.eid, s()
                }
            }),
            s = function () {
                n.trigger(t)
            },
            n = $({});
        return {
            DispatchToken: a,
            addUpdateListener: function (e, i) {
                var a = i ? t + "." + i : t;
                n.on(a, e)
            },
            removeUpdateListener: function (e) {
                var i = e ? t + "." + e : t;
                n.off(i)
            },
            getData: function () {
                return i
            }
        }
    }(),
    LC_Store = function () {
        var e = "LC_Update",
            t = {
                showLC: !1,
                showMenuBtn: !0,
                islockBtn: !1,
                i18n: {
                    info: "",
                    liveCentreTxt: "",
                    tvMenuTxt: "",
                    tvGuideTxt: ""
                },
                showMenu: !1,
                showSportSubMenu: !1,
                showDateSubMenu: !1,
                sportFilter: "",
                dateFilter: "",
                playEventId: -1,
                currentEventId: -1
            },
            i = dispatcher.register(function (e) {
                switch (e.type) {
                    case CONSTANTS.SITEREFRESH:
                        a(e.data), t.i18n.info = ccparam.infoTxt.replace("188", "188BET"), t.i18n.liveCentreTxt = ccparam.liveCentreTxt, t.i18n.tvMenuTxt = ccparam.tvMenuTxt, t.i18n.tvGuideTxt = ccparam.tvGuildTxt, n(), 2 == e.data.mpc.pv && (s(e.data, t.currentEventId != e.data.selobj.evt), t.currentEventId = e.data.selobj.evt), 2 != e.data.mpc.pv && (t.currentEventId = -1);
                        break;
                    case CONSTANTS.RIGHTPANEL.RESIZE:
                        e.isLarge ? liveCentreControl.enlarge() : liveCentreControl.shrink();
                        break;
                    case CONSTANTS.RIGHTPANEL.TV.MENUBTNSHOWHIDE:
                        t.showMenuBtn = e.isDisplay, t.showLC && n();
                        break;
                    case CONSTANTS.RIGHTPANEL.TV.MENUSHOWHIDE:
                        t.showMenu = e.isDisplay, t.showLC && n();
                        break;
                    case CONSTANTS.RIGHTPANEL.TV.TOGGLELOCKBTN:
                        t.islockBtn = e.islock, e.isSaveCookie && (t.islockBtn ? cookies.saveLockInfo(ccparam.playingEventId, ccparam.hTeamName, ccparam.aTeamName, ccparam.sportId, ccparam.lang, ccparam.playingLsId, ccparam.videoProvider) : cookies.clearLockInfo()), t.showLC && n();
                        break;
                    case CONSTANTS.RIGHTPANEL.TV.TOGGLETVMENU:
                        t.showMenu = e.isDisplay, t.showMenu || n();
                        break;
                    case CONSTANTS.RIGHTPANEL.TV.TOGGLE_SPORT_MENU:
                        t.showSportSubMenu = !t.showSportSubMenu, t.showDateSubMenu = !1, n();
                        break;
                    case CONSTANTS.RIGHTPANEL.TV.HIDE_SPORT_MENU:
                        t.showSportSubMenu = !1, n();
                        break;
                    case CONSTANTS.RIGHTPANEL.TV.TOGGLE_DATE_MENU:
                        t.showDateSubMenu = !t.showDateSubMenu, t.showSportSubMenu = !1, n();
                        break;
                    case CONSTANTS.RIGHTPANEL.TV.HIDE_DATE_MENU:
                        t.showDateSubMenu = !1, n();
                        break;
                    case CONSTANTS.RIGHTPANEL.TV.LOAD_TV_CONTENT:
                        break;
                    case CONSTANTS.RIGHTPANEL.TV.SEL_SPORT_FILTER:
                        t.sportFilter = e.sport, t.dateFilter = "", t.showSportSubMenu = !t.showSportSubMenu, n();
                        break;
                    case CONSTANTS.RIGHTPANEL.TV.SEL_DATE_FILTER:
                        t.dateFilter = e.date, t.showDateSubMenu = !t.showDateSubMenu, n();
                        break;
                    case CONSTANTS.RIGHTPANEL.TV.SEL_EVENT_PLAYED:
                        t.playEventId = e.eid, n()
                }
            }),
            a = function (e) {
                if (e.selobj.ifl) {
                    var i = 0 == e.selobj.dp;
                    t.showLC = uv.cdbg && i
                }
            },
            s = function (e, t) {
                var i = e.mbd;
                if (i && t) {
                    if (e.selobj.ip && i) {
                        var a;
                        a = 0 == !i.d.c[0].e[0].cei.ctid ? i.d.c[0].e[0].pk : i.d.c[0].e[0].k;
                        var s = i.d.c[0].e[0].i[7],
                            n = i.d.c[0].e[0].i[0],
                            o = i.d.c[0].e[0].i[1],
                            r = i.d.c[0].e[0].ibs,
                            l = i.d.c[0].e[0].ibsc
                    }
                    if (uv.login ? utility.service("LiveTv", "GetLiveEventDetails", {
                            Date: "",
                            SportId: i.d.k,
                            IsCheckUserCanSeeTv: !0
                        }, "GET", function (e) {
                            e.stv || (s = ""), uv.cdbg && liveCentreControl.clearMbInfo(!0), r && l ? liveCentreControl.saveMbInfo(a, n, o, i.d.k, global.lan, s, i.d.c[0].e[0].pvdr, !0) : r && "" != s ? liveCentreControl.saveMbInfo(a, n, o, i.d.k, global.lan, s, i.d.c[0].e[0].pvdr, !0) : lockInfo.eventId
                        }) : (uv.cdbg && liveCentreControl.clearMbInfo(!0), r && l && liveCentreControl.saveMbInfo(a, n, o, i.d.k, global.lan, s, i.d.c[0].e[0].pvdr, !0)), uv.cdbg) var c = setInterval(function () {
                        if (2 == mpc.pv) {
                            var e = liveCentreControl.getMbInfo(!0);
                            if (e) {
                                if (e.playingEventId) {
                                    var t = uv.login ? e.playingLsId : "";
                                    liveCentreControl.play(e.playingEventId, e.hTeamName, e.aTeamName, e.sportId, t, e.videoProvider, !1)
                                }
                            } else if (!om.isPlayingCC) {
                                var i = liveCentreControl.getMbInfo(!1);
                                if (i) {
                                    t = uv.login ? i.playingLsId : "";
                                    liveCentreControl.play(i.playingEventId, i.hTeamName, i.aTeamName, i.sportId, t, i.videoProvider, !1)
                                } else liveCentreControl.showErrorMsg()
                            }
                            clearInterval(c)
                        }
                    }, 1e3);
                    ccparam.checkEventTimer || liveCentreControl.checkPlayingEvent()
                }
            },
            n = function () {
                o.trigger(e)
            },
            o = $({});
        return {
            DispatchToken: i,
            addUpdateListener: function (t, i) {
                var a = i ? e + "." + i : e;
                o.on(a, t)
            },
            removeUpdateListener: function (t) {
                var i = t ? e + "." + t : e;
                o.off(i)
            },
            getData: function () {
                return t
            }
        }
    }(),
    LCSB_Store = function () {
        var e, t, i = "LCSB_Update",
            a = {
                hName: "",
                hScore: 0,
                hFScore: 0,
                hRedCard: 0,
                aName: "",
                aScore: 0,
                aFScore: 0,
                aRedCard: 0,
                period: "",
                time: "",
                sId: 0,
                elapsed: 0,
                lastScore: null
            },
            s = $({}),
            n = function () {
                s.trigger(i)
            },
            o = function (i) {
                null != e && (Timer.remove(e), a.elapsed = 0), i && null != t && Timer.remove(t)
            },
            r = function (t) {
                var i;
                i = t, a.hName = i.hn, a.hFScore = i.hfs, a.aName = i.an, a.aFScore = i.afs, a.hRedCard = i.hrc, a.aRedCard = i.arc, a.period = i.p, a.time = i.t, a.sId = i.sid, "" !== a.lastScore || "" === i.lts || a.hScore == i.hs && a.aScore == i.as ? a.lastScore = "" : a.lastScore = i.lts, a.hScore = i.hs, a.aScore = i.as, n(), 1 == t.sid && "" != t.t && (e = Timer.interval(1, function () {
                    a.elapsed++, n()
                })), "" !== a.lastScore && Timer.after(3, function () {
                    Action.RightPanel.LiveCenter.clearScoreHighlight()
                })
            };
        return {
            DispatchToken: dispatcher.register(function (e) {
                switch (e.type) {
                    case CONSTANTS.SITEREFRESH:
                        o(!0), e.data.lcsb && (r(e.data.lcsb), 3 == e.data.mpc.pv && (t = Timer.interval(30, function () {
                            liveCentreControl.updateScoreboard()
                        })));
                        break;
                    case CONSTANTS.RIGHTPANEL.LIVECENTER.UPDATESCOREBOARD:
                        o(), e.data && r(e.data);
                        break;
                    case CONSTANTS.RIGHTPANEL.LIVECENTER.CLEARSCOREHIGHLIGHT:
                        a.lastScore = "", n()
                }
            }),
            addUpdateListener: function (e, t) {
                var a = t ? i + "." + t : i;
                s.on(a, e)
            },
            removeUpdateListener: function (e) {
                var t = e ? i + "." + e : i;
                s.off(t)
            },
            getData: function () {
                return a
            }
        }
    }(),
    RP_Store = function () {
        var e = {
                enlarge: !1,
                showTVOnTop: !1,
                topTVtxt: "",
                h: function () {
                    return document.documentElement.clientHeight - 2
                },
                w: 257,
                disableScrollbar: !1
            },
            t = "RP_Update",
            i = (MB_Store.DispatchToken, dispatcher.register(function (t) {
                switch (t.type) {
                    case CONSTANTS.SITEREFRESH:
                        e.showTVOnTop = uv.showls, e.topTVtxt = ccparam.tvTxt, e.w = e.enlarge ? 437 : 257, a();
                        break;
                    case CONSTANTS.UICHANGE:
                        e.enlarge = UI.rightPanelEnlarge = t.data.right.isLarge, e.w = e.enlarge ? 437 : 257, a()
                }
            })),
            a = function () {
                s.trigger("RP_Update")
            },
            s = $({});
        return {
            DispatchToken: i,
            addUpdateListener: function (e, i) {
                var a = i ? t + "." + i : t;
                s.on(a, e)
            },
            removeUpdateListener: function (e) {
                var i = e ? t + "." + e : t;
                s.off(i)
            },
            getData: function () {
                return e
            }
        }
    }(),
    PP_Store = function () {
        var e = {
                info: l.BS_ParlayPopUp,
                parlayPopUpExpandRowIndex: 0,
                h: .8 * document.documentElement.clientHeight + 5 > 600 ? 600 : .8 * document.documentElement.clientHeight + 5,
                w: /^(IE|MSIE|EDGE)/i.test(UI.browser) ? 443 : 448,
                disableScrollbar: !1
            },
            t = "PP_Update",
            i = dispatcher.register(function (t) {
                switch (t.type) {
                    case CONSTANTS.RIGHTPANEL.EXPANDROW:
                        e.parlayPopUpExpandRowIndex = t.index, a();
                        break;
                    case CONSTANTS.RIGHTPANEL.COLLAPSEDROW:
                        e.parlayPopUpExpandRowIndex = null, a();
                        break;
                    case CONSTANTS.FULLSCREENBLOCK.HIDE:
                        e.parlayPopUpExpandRowIndex = 0
                }
            }),
            a = function () {
                s.trigger("PP_Update")
            },
            s = $({});
        return {
            DispatchToken: i,
            addUpdateListener: function (e, i) {
                var a = i ? t + "." + i : t;
                s.on(a, e)
            },
            removeUpdateListener: function (e) {
                var i = e ? t + "." + e : t;
                s.off(i)
            },
            getData: function () {
                return e.h = .8 * document.documentElement.clientHeight + 5 > 600 ? 600 : .8 * document.documentElement.clientHeight + 5, e
            }
        }
    }(),
    EWP_Store = function () {
        var e = {
                info: l.BS_EachWayPopUp,
                eachWayPopUpExpandRowIndex: null,
                h: .8 * document.documentElement.clientHeight + 5 > 600 ? 600 : .8 * document.documentElement.clientHeight + 5,
                w: /^(IE|MSIE|EDGE)/i.test(UI.browser) ? 443 : 448,
                disableScrollbar: !1
            },
            t = "EWP_Update",
            i = dispatcher.register(function (t) {
                switch (t.type) {
                    case CONSTANTS.RIGHTPANEL.EXPANDROW:
                        e.eachWayPopUpExpandRowIndex = t.index, a();
                        break;
                    case CONSTANTS.RIGHTPANEL.COLLAPSEDROW:
                        e.eachWayPopUpExpandRowIndex = null, a();
                        break;
                    case CONSTANTS.FULLSCREENBLOCK.HIDE:
                        e.eachWayPopUpExpandRowIndex = 0
                }
            }),
            a = function () {
                s.trigger("EWP_Update")
            },
            s = $({});
        return {
            DispatchToken: i,
            addUpdateListener: function (e, i) {
                var a = i ? t + "." + i : t;
                s.on(a, e)
            },
            removeUpdateListener: function (e) {
                var i = e ? t + "." + e : t;
                s.off(i)
            },
            getData: function () {
                return e.h = .8 * document.documentElement.clientHeight + 5 > 600 ? 600 : .8 * document.documentElement.clientHeight + 5, e
            }
        }
    }(),
    RB_Store = function () {
        var e = function () {
                var e = pm.parentHost();
                return "localhost" != document.domain && null != e && "" != e ? e + "/" + global.lan + "/sports/getbanner?id=sbk-right" : ""
            },
            t = {
                isDisplay: !0,
                url: e(),
                height: 0
            },
            i = "RB_Update",
            a = dispatcher.register(function (i) {
                switch (i.type) {
                    case CONSTANTS.RIGHTPANEL.BANNER.TOGGLE:
                        t.isDisplay = i.isDisplay, t.url = e(), s();
                        break;
                    case CONSTANTS.RIGHTPANEL.BANNER.SETBANNERHEIGHT:
                        t.height = i.h, s()
                }
            }),
            s = function () {
                n.trigger("RB_Update")
            },
            n = $({});
        return {
            DispatchToken: a,
            addUpdateListener: function (e, t) {
                var a = t ? i + "." + t : i;
                n.on(a, e)
            },
            removeUpdateListener: function (e) {
                var t = e ? i + "." + e : i;
                n.off(t)
            },
            getData: function () {
                return t
            }
        }
    }(),
    ocomp = {
        isAllComp: !1,
        isFirstLoad: !0,
        dateFilter: "",
        defaultDate: "",
        sportName: "",
        setCompFooterTimeout: null,
        topSectionGroup: {
            1: l.CM_PEM,
            2: l.CM_UEFA,
            3: l.CM_AAM,
            4: l.CM_UK,
            5: l.CM_NSAM,
            6: l.CM_IM,
            7: l.CM_WC,
            8: l.CM_EC,
            9: l.CM_EM2016M,
            10: l.CM_EM2016OR,
            11: l.CM_CA2016
        },
        Sliderduration: 500,
        currentSliderLeftBetType: 0,
        currentSliderLeftDateType: 0,
        is_rnr: !1,
        tmid: "",
        JsScrollPaneTmID: "",
        renderSelectCompetiton: function (e) {
            utility.template("OddsPage/" + global.lan + ".SelectCompetition.html", function (t) {
                var i = t.process({
                    d: e
                });
                isIE8AndBelow ? document.getElementById("comp-div").innerHTML = i : $("#comp-div").html(i);
                var a = selobj.cids;
                null != a && ocomp.checkCompetition(a), ocomp.isFirstLoad && utility.scrollToTop(), ocomp.setDateRang(), ocomp.initComp(), cCtrl.isProcessing = !1, ocomp.expandIfChecked(), ocomp.showSumitButton()
            }, "SelectCompetition")
        },
        filterCompetition: function () {
            for (var e = window.location.href.split("/"), t = window.location.pathname.toString(), i = !1, a = 0; a < e.length; a++) e[a].indexOf("#") > 0 && (i = !0);
            if (i) {
                t = "";
                var s = !1;
                for (a = 0; a < e.length; a++) s && (e[a].indexOf("?") > 0 && (e[a] = e[a].split("?")[0]), t = t + "/" + e[a]), e[a].indexOf("#") > 0 && (s = !0)
            }
            var n = "";
            null != selobj.cids && "" != selobj.cids && (n = "?competitionids=" + selobj.cids);
            var r, l = "" == n ? "?" : "&";
            (ocomp.isAllComp || "outright" == selobj.btp2 || "epm" == selobj.btp2 || (n = "Today" == o.param.Tab ? n + l + "date=today" : o.param.IsFutureDate ? n + l + "date=future" : n + l + "date=" + ocomp.convertDateFormat(o.param.EventDate, 2)), selobj.btp != selobj.btp2) ? ((r = t.split("/"))[r.length - 1] = selobj.btp2, t = r.join("/")) : ((r = t.split("/"))[r.length - 1] = "default", t = r.join("/"));
            var c = t;
            c += n, ocomp.isFirstLoad = !1, Action.Competition.filterCompetition(c)
        },
        filterAllCompetition: function () {
            utility.service("CentralService", "GetAllCompetitions", {
                SportId: o.param.SportId,
                BetType: selobj.btp2
            }, "GET", function (e) {
                ocomp.isAllComp = !0, ocomp.isFirstLoad = !1, ocomp.renderSelectCompetiton(e)
            })
        },
        initComp: function () {
            if (Router.state.competitionDefault ? $("#ShowMenuBtn").addClass("selected") : $("#ShowMenuBtn").removeClass("selected"), o.mainIntervalId && window.clearInterval(o.mainIntervalId), $("#lt-center").find(".cpact").on("click", ocomp.cpact_click), "Inplay" == o.param.Tab || o.param.IsInplay) $("#cpHeaderTxt").text(l.ip.toUpperCase()), $("span.cpact.favcp").hide();
            else {
                var e = $("#comp-div").find("span.comp-sportName").eq(0).text();
                "" != e && (ocomp.sportName = e), $("#cpHeaderTxt").text(ocomp.sportName.toUpperCase()), ocomp.initFavComp()
            }
            ocomp.setCompTab(), ocomp.expandOther(5);
            var t = $("#center-panel");
            0 === t.find(".contatiner").length && (t.find("#lt-center").wrap("<div class='contatiner'></div>"), t.find(".contatiner").append($("#center-panel > .ofw-hidden"))), $(window).resize(function () {
                ocomp.setSumitBtnAlign()
            }), ocomp.setSumitBtnAlign(), ScrollerBar.scrollToTop(), ocomp.isFirstLoad = !0, o.param.IsFirstLoad = !1
        },
        setSumitBtnAlign: function () {
            ocomp.setCompetitionsumitDiv(), ocomp.setDefaultSlider(), ocomp.setUIeffectforbettype(), ocomp.setUIeffectforDate()
        },
        setCompetitionsumitDiv: function () {
            $(".fixedcontainer").width($("#comp-div").width())
        },
        getleftpx: function (e) {
            return UI.isIE ? e.parent().width() / 2 + $("#comp-hidden").offset().left - e.outerWidth() / 2 : e.parent().width() / 2 - e.outerWidth() / 2
        },
        cpact_click: function (e) {
            var t = $(this);
            if (t.hasClass("span-toggle")) e.preventDefault(), e.stopPropagation(), b = t.parent().next(), s = b.attr("cg"), (t = t.add($('.tb[cg="' + s + '"]:hidden').prev().children("span:eq(0)"))).hasClass("expand") ? t.hasClass("lock") || (t.removeClass("expand").addClass("collapsed").addClass("lock"), b.hide("blind", function () {
                t.removeClass("lock"), $("table[cg=" + s + "]").hide()
            })) : t.hasClass("lock") || (t.removeClass("collapsed").addClass("expand").addClass("lock"), b.show("blind", function () {
                t.removeClass("lock"), $("table[cg=" + s + "]").show()
            })), ScrollerBar.initScrollbarStatus();
            else if (t.children(".span-toggle").length) e.preventDefault(), e.stopPropagation(), t.children(".span-toggle").click();
            else if (t.hasClass("favcp")) {
                var i = parseInt(t.attr("c"), 10);
                t.hasClass("actived") ? (t.removeClass("actived"), t.attr("title", l.LP_RemoveMyComp)) : (t.addClass("actived"), t.attr("title", l.LP_Add2MyComp)), Action.LeftPanel.MyCompetition.toggle({
                    sid: o.param.SportId,
                    sn: ocomp.sportName,
                    cid: i,
                    cn: t.closest("td").next().find("span").text().trim()
                })
            } else if (t.hasClass("group-txt") || t.hasClass("comp-txt")) {
                var a = t.attr("id").replace("_spn", "");
                $("#" + a).trigger("click")
            } else if (t.hasClass("allSPN")) t.prev().trigger("click");
            else if (t.hasClass("cp")) {
                var s = t.attr("cg"),
                    n = t.attr("value"),
                    r = !0;
                t.hasClass("selected") ? $("span.cpact.cp[value=" + n + "]").removeClass("selected") : $("span.cpact.cp[value=" + n + "]").addClass("selected"), $("span.cpact.cp[cg=" + s + "]").each(function () {
                    $(this).hasClass("selected") || (r = !1)
                }), r ? $("span.cgCB[cg=" + s + "]").addClass("selected") : $("span.cgCB[cg=" + s + "]").removeClass("selected");
                var c = !0;
                $("span.cp.select").each(function () {
                    $(this).hasClass("selected") || (c = !1)
                }), c ? $("span.selall").next().addClass("selected") : $("span.selall").next().removeClass("selected"), ocomp.showSumitButton(), ocomp.sethighlighted()
            } else if (t.hasClass("cgCB")) {
                s = t.attr("cg");
                var d = "selected",
                    p = "selected";
                t.hasClass(d) ? ($("span.cpact.cgCB[cg=" + s + "]").removeClass(d), $("span.cpact.cp[cg=" + s + "]").removeClass(p)) : ($("span.cpact.cgCB[cg=" + s + "]").addClass(d), $("span.cpact.cp[cg=" + s + "]").addClass(p));
                c = !0;
                $("span.cp.select").each(function () {
                    $(this).hasClass(p) || (c = !1)
                }), c ? $("span.selall").next().addClass(d) : $("span.selall").next().removeClass(d), ocomp.showSumitButton(), ocomp.sethighlighted(), e.stopPropagation()
            } else if (t.hasClass("allCB")) {
                d = "selected", p = "selected";
                t.hasClass(d) ? (t.removeClass(d), $("span.cgCB").removeClass(d), $("span.cp.select").removeClass(p)) : (t.addClass(d), $("span.cgCB").addClass(d), $("span.cp.select").addClass(p)), ocomp.showSumitButton(), ocomp.sethighlighted()
            } else if (t.hasClass("sbmt")) {
                var u = $("span.cp.select").map(function () {
                        if ($(this).hasClass("selected")) return this
                    }),
                    h = $("span.allCB").hasClass("selected"),
                    f = new Array;
                u.each(function () {
                    f.push($(this).attr("value"))
                });
                var m = f.unique().join(",");
                if ("" == m) {
                    var g = l.SelectCompetition,
                        v = l.AtLeast1Competition;
                    Control.Dialog ? pm.showParentAlert(g, v) : alert(v)
                } else {
                    var S = ocomp.prepareUrl() + "?competitionids=" + m;
                    ocomp.currentSliderLeftBetType = 0, ocomp.currentSliderLeftDateType = 0, utility.cookie.write(o.Select_All_Comps, h ? -1 : m.split(",").length), Action.Competition.filterCompetition(S)
                }
            } else if (t.hasClass("by-time")) t.hasClass("selected") || (o.param.UIBetType = "ftahou", selobj.btp = "full-time-asian-handicap-and-over-under", "cpTab_all" == t.attr("id") ? (ocomp.isAllComp = !0, ocomp.isFirstLoad = !1, ocomp.filterCompetition()) : "cpTab_today" == t.attr("id") ? (ocomp.isAllComp = !1, o.param.IsFutureDate = !1, o.param.Tab = "Today", ocomp.filterCompetition()) : "cpTab_date" == t.attr("id") && (ocomp.isAllComp = !1, t.hasClass("future") && (o.param.IsFutureDate = !0), o.param.Tab = "Date", o.param.EventDate = ocomp.defaultDate, ocomp.filterCompetition()));
            else if (t.hasClass("defbtn")) {
                var T = t.find("span:eq(1)");
                T.hasClass("selected") ? (Action.Competition.ChangeDefaultButton(!1), T.removeClass("selected")) : (Action.Competition.ChangeDefaultButton(!0), T.addClass("selected"))
            } else if (t.hasClass("tps")) {
                var b = t.find("span.fts-13"),
                    E = b.attr("tg"),
                    C = b.attr("gi");
                if (b.hasClass("bt-cpCount")) o.param.UIBetType = "ftahou", selobj.btp = selobj.btp2 = "full-time-asian-handicap-and-over-under", "today" == E ? (ocomp.isAllComp = !1, o.param.Tab = "Today", S = ocomp.prepareUrl()) : "tomorrow" == E ? (ocomp.isAllComp = !1, o.param.Tab = "Date", o.param.Tab = "Today", S = ocomp.prepareUrl().replace("today", "tomorrow")) : "am" == E ? (ocomp.isAllComp = !0, S = ocomp.prepareUrl()) : (ocomp.isAllComp = !0, S = ocomp.prepareUrl() + "?competitionids=" + E + "&groupid=" + C), Action.Competition.filterCompetition(S)
            } else t.hasClass("filters") ? t.hasClass("filterdate") ? (ocomp.currentSliderLeftBetType = 0, ocomp.isAllComp = !1, o.param.Tab = "Date", o.param.IsFutureDate = !1, o.param.EventDate = t.attr("d"), "future" == t.attr("tag") && (o.param.IsFutureDate = !0), ocomp.filterCompetition()) : t.hasClass("actived") || (t.parent().find("div").removeClass("actived"), $("#divdate").hide(), t.addClass("actived"), "outright" == selobj.btp2 && (selobj.btp2 = "full-time-asian-handicap-and-over-under"), selobj.btp2 = selobj.btp, ocomp.currentSliderLeftBetType = 0, "midf" == t.attr("id") ? (ocomp.isAllComp = !0, ocomp.isFirstLoad = !1, ocomp.filterCompetition()) : "midd" == t.attr("id") ? ($("#divdate").show(), ocomp.currentSliderLeftDateType = 0, ocomp.setDefaultSlider(), ocomp.CheckArrow($("#DateFilter"))) : "midt" == t.attr("id") ? (ocomp.isAllComp = !1, o.param.IsFutureDate = !1, o.param.Tab = "Today", ocomp.filterCompetition()) : "mido" == t.attr("id") ? (selobj.btp2 = "outright", ocomp.isAllComp = !1, $("#divbt").hide(), ocomp.filterCompetition()) : "mide" == t.attr("id") && (selobj.btp2 = "epm", ocomp.isAllComp = !1, $("#divbt").hide(), ocomp.filterCompetition())) : t.hasClass("bf") ? (ocomp.isAllComp = $("#midf").hasClass("actived"), selobj.btp2 = t.attr("expr"), ocomp.filterCompetition()) : t.hasClass("cmp") && t.closest("tr").find("span.cp.select").click()
        },
        initFavComp: function () {
            $("span.cpact.favcp").removeClass("actived").attr("title", l.LP_Add2MyComp);
            var e = LPM.mycomps;
            if (null != e && "" != e)
                for (var t = 0; t < e.length; t++) {
                    var i = e[t];
                    $("span.cpact.favcp[c=" + i + "]").addClass("actived").attr("title", l.LP_RemoveMyComp)
                }
        },
        checkCompetition: function (e) {
            for (var t = null == e ? null : e.split(","), i = "selected", a = "selected", s = 0; s < t.length; s++) $("span.cp.select").each(function () {
                $(this).attr("value") == t[s] && $(this).addClass(a)
            });
            $("span.cgCB").each(function () {
                var e = $(this).attr("cg"),
                    t = !0;
                $("span.cp[cg=" + e + "]").each(function () {
                    $(this).hasClass(a) || (t = !1)
                }), t ? $(this).addClass(i) : $(this).removeClass(i)
            });
            var n = !0;
            $("span.cp.select").each(function () {
                $(this).hasClass(a) || (n = !1)
            }), n ? $("span.selall").next().addClass(i) : $("span.selall").next().removeClass(i), ocomp.showSumitButton(), ocomp.sethighlighted()
        },
        setCompTab: function () {
            if (ocomp.isAllComp) "outright" != selobj.btp2 ? "epm" == selobj.btp2 ? $("#mide").addClass("actived") : $("#midf").addClass("actived") : $("#mido").addClass("actived");
            else if ("epm" == selobj.btp2) $("#mide").addClass("actived");
            else if ("outright" != selobj.btp2) {
                if ("Today" == o.param.Tab) $("#midt").addClass("actived");
                else if ("Date" == o.param.Tab && 1 == o.param.SportId) {
                    $("#midd").addClass("actived"), $("#divdate").show();
                    var e = $("#DateFilter div.filterdate"),
                        t = ocomp.convertDateFormat(o.param.EventDate, 2);
                    e.removeClass("actived"), e.each(function () {
                        $(this).attr("d") != t || $(this).addClass("actived")
                    })
                }
            } else $("#mido").addClass("actived");
            var i = $("#BetFilter .bf");
            i.removeClass("actived"), i.each(function () {
                if ($(this).attr("expr") == selobj.btp2) return $(this).addClass("actived"), !1
            }), ocomp.checkBetType(), ocomp.isFirstLoad = !1, "Future" == ocomp.dateFilter && $("#cpTab_date").addClass("future").text(l.D_future)
        },
        convertDateFormat: function (e, t) {
            var i, a, s, n, o, r = !1;
            if ("[object Date]" === Object.prototype.toString.call(e) && (isNaN(e.getTime()) || (i = new Date(e), r = !0)), !r) {
                if ("string" != typeof e) return;
                if (3 == (a = e.split("/")).length) switch (s = parseInt(a[2], 10), n = -1, o = parseInt(a[0], 10), a[1].toLowerCase()) {
                    case "jan":
                        n = 0;
                        break;
                    case "feb":
                        n = 1;
                        break;
                    case "mar":
                        n = 2;
                        break;
                    case "apr":
                        n = 3;
                        break;
                    case "may":
                        n = 4;
                        break;
                    case "jun":
                        n = 5;
                        break;
                    case "jul":
                        n = 6;
                        break;
                    case "aug":
                        n = 7;
                        break;
                    case "sep":
                        n = 8;
                        break;
                    case "oct":
                        n = 9;
                        break;
                    case "nov":
                        n = 10;
                        break;
                    case "dec":
                        n = 11;
                        break;
                    default:
                        n = -1
                } else 3 === (a = e.split("-")).length && (s = parseInt(a[0], 10), n = parseInt(a[1], 10) - 1, o = parseInt(a[2], 10));
                i = new Date(s, n, o), "[object Date]" === Object.prototype.toString.call(i) && (isNaN(i.getTime()) || (r = !0))
            }
            if (r) {
                var l = i.getFullYear(),
                    c = i.getMonth() + 1,
                    d = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][i.getMonth()],
                    p = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][i.getDay()],
                    u = i.getDate();
                return 0 == t ? ("0" + u).slice(-2) + "/" + d + "/" + l : 1 == t ? p + " - " + ("0" + u).slice(-2) + " " + d : 2 == t ? l + "-" + ("0" + c).slice(-2) + "-" + ("0" + u).slice(-2) : i
            }
            return i
        },
        prepareUrl: function () {
            var e = window.location.toString().split("/")[3],
                t = -1 == o.param.SportId ? "all" : selobj.sptn,
                i = "competition",
                a = null == selobj.btp2 || "" == selobj ? "default" : selobj.btp2;
            if (o.param.IsInplay || "Inplay" == o.param.Tab) {
                i = "in-play";
                var s = 0;
                $("input.cpact.cp:checked").each(function () {
                    var e = parseInt($(this).attr("cg"), 10);
                    if (0 == s && s != e && (s = e), s != e) return s = -1, !1
                }), t = s > 0 ? s.toString() : "all"
            } else ocomp.isAllComp ? i = "competition" : (i = "matches-by-date", d = "", o.param.IsFutureDate ? d = "future" : ("Today" == o.param.Tab ? d = "today" : "Date" == o.param.Tab ? d = ocomp.convertDateFormat(o.param.EventDate, 2) : d = ocomp.convertDateFormat(new Date, 2), $("#cpTab_today").hasClass("selected") && (d = "today")), i = i + "/" + d, "Popular" == o.param.Tab && (i = "popular"));
            return MM.view === VIEW.PARLAY ? "/" + e + "/sports/parlay/" + t + "/" + i + "/" + a : "/" + e + "/sports/" + t + "/" + i + "/" + a
        },
        expandOther: function (e) {
            var t = 0;
            for ($("#comp-div").find(".lowRes span.span-toggle").each(function () {
                    $(this).hasClass("expand") && t++
                }); t < e;) {
                t++;
                var i = $("#comp-div").find(".lowRes span.span-toggle.collapsed").eq(0),
                    a = $("#comp-div").find(".highRes span.span-toggle.collapsed").eq(0);
                i.removeClass("collapsed").addClass("expand"), a.removeClass("collapsed").addClass("expand"), i.parent().next().show(), a.parent().next().show()
            }
            ocomp.expandIfChecked()
        },
        expandIfChecked: function () {
            $("span.cgCB").each(function () {
                var e = $(this).parent().next(),
                    t = $(e).parent().next(),
                    i = $(this).attr("cg"),
                    a = !1;
                $("span.cp[cg=" + i + "]").each(function () {
                    $(this).hasClass("selected") && (a = !0)
                }), a && ($(e).removeClass("collapse").addClass("expand"), $(t).show())
            })
        },
        HeightChanged: function () {
            (o.param.IsInplay || "Inplay" == o.param.Tab) && oddsPage.initScrollbarStatus()
        },
        setDisplayDate: function (e, t) {
            var i = ocomp.convertDateFormat(e, 1);
            utility.service("CentralService", "GetDisplayDate", {
                d: ocomp.convertDateFormat(e, 2)
            }, "POST", function (e) {
                i = e.d, ocomp.dateFilter = i, $("#" + t).text(i)
            }, function () {
                ocomp.dateFilter = i, $("#" + t).text(i)
            })
        },
        setUIeffectforDate: function () {
            $("#DateFilter").find("div.filterdate").css("position", "relative"), $("#divdate").find("span.darrow").off("click"), $("#divdate").find("span.darrow").on("click", ocomp.SliderEvent), ocomp.CheckArrow($("#DateFilter"))
        },
        setUIeffectforbettype: function () {
            $("#BetFilter").find("span").css("position", "relative"), $("#divbt").find("span.barrow").off("click"), $("#divbt").find("span.barrow").on("click", ocomp.SliderEvent), ocomp.CheckArrow($("#BetFilter"))
        },
        setDateRang: function () {
            var e = selobj.dts,
                t = new StringBuilderEx,
                i = $("#DateFilter");
            if (e) {
                for (var a = 1; a < e.length; ++a) {
                    var s = e[a];
                    1 == a && t.appendFormat('<div class="width-35 right-0 height-40 pos-absolute gradientFadeOut-r"></div>'), t.appendFormat('<div class="dsp-iblk t-va-m lht-1p3 pd-l-10 pd-r-10 filters y-hover cpact filterdate" tag="{0}" d="{1}" >{2}</div>', s.Url, s.Date, s.DisplayDate)
                }
                i.html(t.toString())
            }
        },
        setTopSectionData: function (e, t) {
            var i = jQuery.extend({}, e),
                a = _.filter(i.om, function (e) {
                    return e.ec > 0
                }),
                s = new Array;
            if (a) {
                a = _.sortBy(a, "s");
                s = ocomp.rearrangementDataforRow(a, t, {
                    cids: "",
                    ec: 0,
                    gi: 0,
                    s: -1
                }, 1)
            }
            return i.om = s, i
        },
        setMidSectionData: function (e, t) {
            var i = jQuery.extend([], e);
            return ocomp.rearrangementDataforRow(i, t, {
                c: "",
                id: -1,
                n: ""
            }, 2)
        },
        rearrangementDataforRow: function (e, t, i, a) {
            var s = new Array,
                n = new Array,
                o = 0;
            return 2 === t ? $.each(e, function (t) {
                s[o] = this, o++, t % 2 == 1 ? (n.push(s), s = [], o = 0) : t == e.length - 1 && (s[o] = i, n.push(s))
            }) : 1 == a ? $.each(e, function (t) {
                0 == t ? (s[0] = s[1] = i, s[2] = this, n.push(s), s = []) : (s[o] = this, o++, t % 3 == 0 ? (n.push(s), s = [], o = 0) : t == e.length - 1 && (1 == s.length ? s[1] = s[2] = i : s[2] = i, n.push(s), s = []))
            }) : $.each(e, function (t) {
                s[o] = this, o++, (t + 1) % 3 == 0 ? (n.push(s), s = [], o = 0) : t == e.length - 1 && (1 == s.length ? s[1] = s[2] = i : s[2] = i, n.push(s), s = [])
            }), n
        },
        checkBetType: function () {
            $("#BetFilter").children().length > 1 ? $("#divbt").show() : $("#divbt").hide()
        },
        showSumitButton: function () {
            var e = !1;
            $("span.cp.select").each(function () {
                $(this).hasClass("selected") && (e = !0)
            }), e ? $("div.sbmt").parent().removeClass("hidden") : $("div.sbmt").parent().addClass("hidden")
        },
        sethighlighted: function () {
            $("span.cp.select").each(function () {
                var e = $(this).closest("td").next().children();
                $(this).hasClass("selected") ? (e.removeClass("ft-c-47"), e.addClass("ft-c-16")) : (e.addClass("ft-c-47"), e.removeClass("ft-c-16"))
            })
        },
        CheckArrow: function (e) {
            var t = e,
                i = t.outerWidth(),
                a = parseInt(t.find("span:eq(0),div.filterdate:eq(0)").css("left"), 10) || 0,
                s = 0,
                n = !1;
            0 === a || a < 0 && t.parent().children(".float-left").find("span").removeClass("hidden"), t.children().siblings("span,div.filterdate").each(function (e, t) {
                s += $(t).outerWidth()
            }), (s += 12) < i ? (t.parent().children(".float-left").find("span").addClass("hidden"), t.parent().children(".float-right").find("span").addClass("hidden"), ocomp.currentSliderLeftBetType = 0, ocomp.currentSliderLeftDateType = 0, ocomp.setDefaultSlider(), n = !0) : (t.parent().children(".float-left").find("span").removeClass("hidden"), t.parent().children(".float-right").find("span").removeClass("hidden")), n ? t.removeClass("withController") : t.addClass("withController")
        },
        setDefaultSlider: function () {
            $("#BetFilter").find("span").css("left", ocomp.currentSliderLeftBetType), $("#DateFilter").find("div.filterdate").css("left", ocomp.currentSliderLeftDateType)
        },
        SliderEvent: function (e) {
            var t, i = $(this),
                a = i.parent().parent().children(":last-child"),
                s = a.outerWidth(),
                n = 0,
                o = i.hasClass("lb") || i.hasClass("rb"),
                r = 0,
                l = !0;
            a.children().siblings("span,div.filterdate").each(function (e, t) {
                n + $(t).outerWidth() + (o ? ocomp.currentSliderLeftBetType : ocomp.currentSliderLeftDateType) < s && l ? n += $(t).outerWidth() : (r += $(t).outerWidth(), l = !1)
            }), s = i.hasClass("ld") || i.hasClass("rd") ? n : n + 30, ocomp.is_rnr || (i.hasClass("lb") ? (ocomp.is_rnr = !0, 0 != (t = "auto" == (t = parseInt(a.children("span:First").css("left"), 10) || 0) ? 0 : t) ? (sliderwidth = t + s, a.children("span:First").animate({
                left: sliderwidth >= 0 ? 0 : sliderwidth
            }, {
                duration: ocomp.Sliderduration,
                step: function (e, t) {
                    a.children("span:gt(0)").css("left", e)
                },
                complete: function () {
                    ocomp.CheckArrow(a), ocomp.currentSliderLeftBetType = parseInt(a.children("span:First").css("left"), 10), ocomp.is_rnr = !1
                }
            })) : ocomp.is_rnr = !1) : i.hasClass("rb") ? (ocomp.is_rnr = !0, 0 == (t = "auto" == (t = parseInt(a.children("span:First").css("left"), 10) || 0) ? 0 : t) ? a.children("span:First").animate({
                left: t - s
            }, {
                duration: ocomp.Sliderduration,
                step: function (e, t) {
                    a.children("span:gt(0)").css("left", e)
                },
                complete: function () {
                    ocomp.CheckArrow(a), ocomp.currentSliderLeftBetType = parseInt(a.children("span:First").css("left"), 10), ocomp.is_rnr = !1
                }
            }) : ocomp.is_rnr = !1) : i.hasClass("ld") ? (ocomp.is_rnr = !0, 0 != (t = "auto" == (t = parseInt(a.children("div.filterdate:First").css("left"), 10) || 0) ? 0 : t) ? a.children("div.filterdate:First").animate({
                left: s >= 0 ? 0 : s
            }, {
                duration: ocomp.Sliderduration,
                step: function (e, t) {
                    a.children("div.filterdate:gt(0)").css("left", e)
                },
                complete: function () {
                    ocomp.CheckArrow(a), ocomp.currentSliderLeftDateType = parseInt(a.children("div.filterdate:First").css("left"), 10), ocomp.is_rnr = !1
                }
            }) : ocomp.is_rnr = !1) : i.hasClass("rd") && (ocomp.is_rnr = !0, t = "auto" == (t = parseInt(a.children("div.filterdate:First").css("left"), 10) || 0) ? 0 : t, r ? a.children("div.filterdate:First").animate({
                left: -s
            }, {
                duration: ocomp.Sliderduration,
                step: function (e, t) {
                    a.children("div.filterdate:gt(0)").css("left", e)
                },
                complete: function () {
                    ocomp.CheckArrow(a), ocomp.currentSliderLeftDateType = parseInt(a.children("div.filterdate:First").css("left"), 10), ocomp.is_rnr = !1
                }
            }) : ocomp.is_rnr = !1))
        }
    },
    CMStore = function () {
        var e = "CM_Update",
            t = dispatcher.register(function (e) {
                switch (e.type) {
                    case CONSTANTS.SITEREFRESH:
                        if (3 == e.data.mpc.pv) {
                            $("#comp-div").removeClass("hidden"), $("#comp-hidden").show();
                            var t = e.data.mod;
                            "SelectCompetition" == o.param.Tab ? ocomp.isAllComp = !0 : ocomp.isAllComp = !1, ocomp.renderSelectCompetiton(t)
                        } else $("#comp-div").addClass("hidden"), $("#comp-hidden").hide(), ocomp.tmid && window.clearInterval(ocomp.tmid);
                        break;
                    case CONSTANTS.Competiton.filterCompetition:
                        cCtrl.loadContent(e.data, !0, !0);
                        break;
                    case CONSTANTS.LEFTPANEL.MY_COMPETITION.TOGGLE:
                        ocomp.initFavComp();
                        break;
                    case CONSTANTS.UICHANGE:
                        ocomp.setUIeffectforbettype(), ocomp.setUIeffectforDate()
                }
            }),
            i = $({});
        return {
            DispatchToken: t,
            addUpdateListener: function (t, a) {
                var s = a ? e + "." + a : e;
                i.on(s, t)
            },
            removeUpdateListener: function (t) {
                var a = t ? e + "." + t : e;
                i.off(a)
            }
        }
    }();
CONSTANTS.Competiton = {
    filterCompetition: "filterCompetition",
    ChangeDefaultButton: "ChangeDefaultButton"
}, Action.Competition = {
    filterCompetition: function (e) {
        dispatcher.dispatch({
            type: CONSTANTS.Competiton.filterCompetition,
            data: e
        })
    },
    ChangeDefaultButton: function (e) {
        dispatcher.dispatch({
            type: CONSTANTS.Competiton.ChangeDefaultButton,
            data: e
        })
    }
};