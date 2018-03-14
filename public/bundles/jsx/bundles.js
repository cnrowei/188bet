/*
 03110235
*/


! function (e) {
    function t(l) {
        if (a[l]) return a[l].exports;
        var c = a[l] = {
            i: l,
            l: !1,
            exports: {}
        };
        return e[l].call(c.exports, c, c.exports, t), c.l = !0, c.exports
    }
    var a = {};
    t.m = e, t.c = a, t.d = function (e, a, l) {
        t.o(e, a) || Object.defineProperty(e, a, {
            configurable: !1,
            enumerable: !0,
            get: l
        })
    }, t.n = function (e) {
        var a = e && e.__esModule ? function () {
            return e.default
        } : function () {
            return e
        };
        return t.d(a, "a", a), a
    }, t.o = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, t.p = "", t(t.s = 2)
}([function (e, t, a) {
    "use strict";
    var l = {
            css: {
                scrollbar: "scrollBar",
                scrollThumb: "scrollDrag"
            }
        },
        c = React.createClass({
            displayName: "ScrollBar",
            getDefaultProps: function () {
                var e = "MacIntel" == navigator.platform,
                    t = /Firefox/.test(navigator.userAgent);
                return {
                    nativeScrollbarWidth: 17,
                    macOffset: e && !t ? -17 : 0
                }
            },
            getInitialState: function () {
                return {
                    enable: !0,
                    x: 0,
                    y: 0,
                    cursorDown: !1,
                    prevPageX: 0,
                    prevPageY: 0,
                    offsetTop: 0,
                    offsetLeft: 0,
                    hasScroll: !1,
                    freeze: !1
                }
            },
            componentDidMount: function () {
                this.props.disable || this.addListener();
                var e = this;
                $(window).resize(function () {
                    e.isMounted() && e.forceUpdate()
                })
            },
            componentDidUpdate: function (e, t) {
                if (!this.props.disable && isIE9AndBelow) {
                    var a = this.refs.boxer.getDOMNode(),
                        l = this.refs.wrapper.getDOMNode();
                    a.style.overflowX = "", setTimeout(function () {
                        a.style.overflowX = "hidden", l.style.paddingLeft = 10
                    }, 100)
                }
            },
            render: function () {
                var e = React.addons.renderChild(this);
                if (this.props.disable) {
                    var t = {
                        overflowY: "scroll",
                        width: this.props.w,
                        overflowX: "hidden"
                    };
                    return this.props.ieMaxHeight ? t.maxHeight = this.getHeight() : t.height = this.getHeight(), React.createElement("div", {
                        ref: "content",
                        style: t
                    }, e)
                }
                var a = {
                    maxHeight: this.getHeight(),
                    overflowX: "hidden"
                };
                this.props.w && (a.width = this.props.w + (this.state.hasScroll ? this.props.macOffset : 0) - (this.state.hasScroll || !this.props.always ? 0 : this.props.offset || 0));
                var c = {
                        display: "none"
                    },
                    s = this.props.scrollThumbCss || l.css.scrollThumb,
                    n = _.contains(navigator.userAgent, "Macintosh"),
                    e = Array.isArray(this.props.children) ? this.props.children.map(function (e) {
                        return React.cloneElement(e)
                    }) : React.cloneElement(this.props.children);
                return React.createElement("div", {
                    "data-layer": "0",
                    ref: "boxer",
                    style: {
                        overflowX: "hidden"
                    }
                }, React.createElement("div", {
                    "data-layer": "1",
                    className: classNames({
                        noscrollappereance: n
                    }),
                    style: a,
                    ref: "wrapper"
                }, React.createElement("div", {
                    "data-layer": "2",
                    ref: "content"
                }, e, React.createElement("br", {
                    style: {
                        clear: "both",
                        display: "none"
                    }
                })), React.createElement("div", {
                    "data-layer": "2",
                    ref: "scrollbar",
                    style: c
                }, React.createElement("div", {
                    className: s,
                    style: this.getThumbStyle(),
                    ref: "thumb"
                }))))
            },
            update: function () {
                if (this.isMounted() && !this.props.disable) {
                    var e = this.refs.content.getDOMNode(),
                        t = this.refs.scrollbar.getDOMNode(),
                        a = this.refs.thumb.getDOMNode(),
                        l = this.state.hasScroll;
                    if (0 == e.clientHeight || e.clientHeight <= this.getHeight()) return t.style.display = "none", l = !1, void this.updateScrollStatus(l);
                    l = !0, t.style.display = "block";
                    var c = this.cumulativeOffset(e);
                    this.state.offsetTop = c.top, this.state.offsetLeft = e.offsetLeft, t.style.position = "absolute", t.style.height = this.getHeight() + "px", t.style.left = this.props.w + this.state.offsetLeft - this.props.nativeScrollbarWidth + "px", t.style.top = null == this.props.top ? 0 : this.props.top + "px", t.style.zIndex = 99, a.style.cursor = "pointer", a.style.position = "relative", a.style.height = Math.ceil(this.getHeight() / e.clientHeight * 100) + "%", this.refs.wrapper.getDOMNode().style.overflowY = "auto", this.updateScrollStatus(l)
                }
            },
            updateScrollStatus: function (e) {
                e != this.state.hasScroll && this.setState({
                    hasScroll: e
                }), this.props.onChange && this.props.onChange(e)
            },
            getHeight: function () {
                return _.isFunction(this.props.h) ? this.props.h() : this.props.h
            },
            addListener: function () {
                var e = this.refs.wrapper.getDOMNode(),
                    t = this.refs.thumb.getDOMNode(),
                    a = this.refs.scrollbar.getDOMNode();
                e.addEventListener("scroll", this.handleScroll), a.addEventListener("mousedown", this.handleVerticalTrackMouseDown), t.addEventListener("mousedown", this.handleVerticalThumbMouseDown), document.addEventListener("mouseup", this.handleDocumentMouseUp), window.addEventListener("resize", this.update)
            },
            handleScroll: function () {
                this.setState(this.getPosition())
            },
            getPosition: function () {
                var e = this.refs.wrapper.getDOMNode(),
                    t = this.refs.content.getDOMNode();
                return {
                    y: e.scrollTop / t.clientHeight,
                    x: e.scrollLeft / t.clientWidth
                }
            },
            getThumbStyle: function () {
                return {
                    top: Math.floor(100 * this.state.y) + "%"
                }
            },
            handleVerticalTrackMouseDown: function (e) {
                e.stopPropagation();
                var t = this.refs.wrapper.getDOMNode(),
                    a = this.refs.content.getDOMNode(),
                    l = this.refs.scrollbar.getDOMNode(),
                    c = this.refs.thumb.getDOMNode(),
                    s = Math.abs(e.target.getBoundingClientRect().top - e.clientY),
                    n = 100 * (s - c.offsetHeight / 2) / l.offsetHeight;
                t.scrollTop = n * a.scrollHeight / 100
            },
            handleVerticalThumbMouseDown: function (e) {
                e.stopPropagation(), this.dragStart(e), this.state.prevPageY = e.currentTarget.offsetHeight - (e.clientY - e.currentTarget.getBoundingClientRect().top)
            },
            handleDocumentMouseMove: function (e) {
                if (e.stopPropagation(), !1 !== this.state.cursorDown && this.state.prevPageY) {
                    var t = this.refs.wrapper.getDOMNode(),
                        a = this.refs.scrollbar.getDOMNode(),
                        l = this.refs.thumb.getDOMNode(),
                        c = this.refs.content.getDOMNode(),
                        s = e.clientY - this.state.offsetTop,
                        n = l.offsetHeight - this.state.prevPageY,
                        r = 100 * (s - n) / a.offsetHeight;
                    t.scrollTop = r * c.scrollHeight / 100
                }
            },
            handleDocumentMouseUp: function () {
                this.dragEnd()
            },
            dragStart: function (e) {
                e.stopPropagation(), e.stopImmediatePropagation(), this.state.cursorDown = !0, document.addEventListener("mousemove", this.handleDocumentMouseMove), document.onselectstart = function () {
                    return !1
                }
            },
            dragEnd: function () {
                this.state.cursorDown = !1, this.state.prevPageX = this.state.prevPageY = 0, document.removeEventListener("mousemove", this.handleDocumentMouseMove), document.onselectstart = null
            },
            scrollToAnchor: function () {
                if (this.isMounted()) {
                    var e = this.refs.content.getDOMNode(),
                        t = $(e).find("span[data-scrollbaranchor]");
                    t.length > 0 && (t = t[0], t.scrollIntoView())
                }
            },
            scrollTo: function (e) {
                if (this.isMounted()) {
                    (this.props.disable ? this.refs.content.getDOMNode() : this.refs.wrapper.getDOMNode()).scrollTop = e
                }
            },
            freeze: function () {
                this.state.hasScroll && !this.state.disable && (this.refs.wrapper.getDOMNode().style.overflowY = "hidden", this.refs.scrollbar.getDOMNode().style.visibility = "hidden", this.setState({
                    freeze: !0
                }))
            },
            release: function () {
                this.state.hasScroll && !this.props.disable && (this.refs.wrapper.getDOMNode().style.overflowY = "auto", this.refs.scrollbar.getDOMNode().style.visibility = "visible", this.setState({
                    freeze: !1
                }))
            },
            cumulativeOffset: function (e) {
                var t = 0,
                    a = 0;
                do {
                    t += e.offsetTop || 0, a += e.offsetLeft || 0, e = e.offsetParent
                } while (e);
                return {
                    top: t,
                    left: a
                }
            }
        });
    c.ScrollBarAnchor = React.createClass({
        displayName: "ScrollBarAnchor",
        render: function () {
            return React.createElement("div", {
                "data-scrollbaranchor": "1",
                style: {
                    width: 0,
                    height: 0
                }
            })
        }
    }), e.exports = c
}, function (e, t, a) {
    "use strict";
    var c = Object.assign || function (e) {
            for (var t = 1; t < arguments.length; t++) {
                var a = arguments[t];
                for (var l in a) Object.prototype.hasOwnProperty.call(a, l) && (e[l] = a[l])
            }
            return e
        },
        s = React.createClass({
            displayName: "Homepage",
            _getDataFromStore: function () {
                return {
                    data: HP_Store.getData(),
                    extraData: HP_Store.getExtraData()
                }
            },
            getInitialState: function () {
                return this._getDataFromStore()
            },
            componentDidMount: function () {
                HP_Store.addUpdateListener(this._onUpdate)
            },
            componentDidUpdate: function () {
                var e = this.state.data.l.r;
                Timer.after(e, function () {
                    Action.RefreshSite()
                }), this.state.extraData.needUpdateOddsJump && Timer.after(5, function () {
                    Action.Homepage.removeOddsJump()
                }), this.state.extraData.isDisplay && (ScrollerBar.initScrollbarStatus(), this.state.extraData.needScrollTop && ScrollerBar.scrollToTop(), Action.ProcessingFinish())
            },
            render: function () {
                if (null == this.state.data.l.m && 0 == this.state.data.l.s.length && 0 == this.state.data.l.hip.length && 0 == this.state.data.l.hnph.length && 0 == this.state.data.l.hnps.length) return React.createElement("div", {
                    className: "hidden"
                });
                var e = this.state.extraData;
                e.odds.addOddsJump = this._addOddsJump;
                var t = {
                        data: this.state.data.l,
                        extraData: e
                    },
                    a = {
                        data: this.state.data.r,
                        extraData: e
                    };
                return React.createElement("div", {
                    className: "homepage" + (this.state.extraData.isDisplay ? "" : " hidden")
                }, React.createElement("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    width: "37",
                    height: "20",
                    className: "lockedBg_svg",
                    dangerouslySetInnerHTML: {
                        __html: '<defs><pattern id="p1" patternUnits="objectBoundingBox" width=".1" height=".1" patternTransform="rotate(45)"><rect width="3" height="100" fill="#000" x="0" y="0" opacity=".06"></rect></pattern></defs>'
                    }
                }), React.createElement(s.rightPanel, {
                    data: a
                }), React.createElement(s.leftPanel, {
                    data: t
                }), React.createElement("div", {
                    className: "clearBoth"
                }))
            },
            _addOddsJump: function (e, t) {
                if (e) {
                    var a = this.state.extraData;
                    1 == t ? a.odds.oddsUp.push(e) : 2 == t && a.odds.oddsDown.push(e), a.needUpdateOddsJump = !0
                }
            },
            _onUpdate: function () {
                this.setState(this._getDataFromStore())
            }
        });
    s.Utility = {
        timer: {
            _getIPTime: function (e, t) {
                var a = e.split(":"),
                    l = (Math.abs(a[1]) + t) % 60,
                    c = Math.abs(a[0]) + Math.floor((Math.abs(a[1]) + t) / 60);
                return (c < 10 ? ("0" + c).slice(-2) : c) + ":" + (l < 10 ? ("0" + l).slice(-2) : l)
            },
            _getEventDate: function (e) {
                var t = moment(e);
                return t.isSame(new Date, "d") ? "" : t.format("DD / MM")
            },
            _getEventDateForPreStart: function (e) {
                return moment(e).format("DD / MM")
            },
            _getEventStartTime: function (e) {
                return moment(e).format("HH:mm")
            },
            _getShortPeriod: function (e) {
                var t = null;
                return e && ((t = l["sti" + e.toUpperCase()]) || (t = e)), t
            },
            _getLongPeriod: function (e) {
                return null == e ? "" : l["ti" + e]
            }
        },
        odds: {
            _needBlackTeamName: function (e) {
                return /-/.test(e)
            },
            _getHDPbyOddsType: function (e) {
                this.props.data.extraData.odds.isEuroOdds;
                return null == e || "" == e ? "" : e
            },
            _getOddsByRegion: function (e, t, a) {
                if (18 == a) return null != t.o && null != t.o.ml ? this._getOddsItems("ml", t) : null;
                if (14 == a) return null != t.o && t.o["1x2"] ? this._getOddsItems("1x2", t) : null;
                if (25 == a) return null != t.o && t.o.win ? this._getOddsItems("win", t) : null;
                switch (e) {
                    case "HDP":
                        return t.o && t.o.ah ? this._getOddsItems("ah", t) : null;
                    case "1X2":
                        return t.o && t.o["1x2"] ? this._getOddsItems("1x2", t) : null;
                    case "ML":
                        return t.o && t.o.ml ? this._getOddsItems("ml", t) : null;
                    default:
                        return null
                }
            },
            _getEpmOddsItem: function (e, t) {
                if (!t) return null;
                var a = [{
                    sid: t.id,
                    hdp: null,
                    odds: t.o,
                    ttp: l.EPM.EPM
                }];
                if (null != a) {
                    var c = this._highlightCheck,
                        s = this._formatSelectionId;
                    _.forEach(a, function (e, t) {
                        null != e && (e instanceof Array ? _.forEach(e, function (e, t) {
                            e.sid = s(e.sid), e.isHL = c(e.sid)
                        }) : (e.sid = s(e.sid), e.isHL = c(e.sid)))
                    })
                }
                return a
            },
            _getOddsItems: function (e, t) {
                var a;
                if (null == t.o || null == t.o[e]) return null;
                a = t.o[e];
                var c;
                switch (e) {
                    case "ah":
                    case "ahfts":
                        "0" == a[1] && a[3], this.props.data.extraData.odds.isEuroOdds;
                        c = [{
                            sid: a[4],
                            hdp: a[1],
                            odds: a[5],
                            chdp: "0" == a[1] ? a[1] : this._getHDPbyOddsType(a[1]),
                            ttp: t.i[0]
                        }, {
                            sid: a[6],
                            hdp: a[3],
                            odds: a[7],
                            chdp: "0" == a[3] ? a[3] : this._getHDPbyOddsType(a[3]),
                            ttp: t.i[1]
                        }];
                        break;
                    case "ou":
                    case "t1ou":
                    case "t2ou":
                    case "oufts":
                        c = [{
                            sid: a[4],
                            hdp: a[1],
                            odds: a[5],
                            OU: "O",
                            ttp: l.Odds_Over
                        }, {
                            sid: a[6],
                            hdp: a[3],
                            odds: a[7],
                            OU: "U",
                            ttp: l.Odds_Under
                        }];
                        break;
                    case "1x2":
                        c = [{
                            sid: a[0],
                            hdp: null,
                            odds: a[1],
                            ttp: t.i[0]
                        }, {
                            sid: a[4],
                            hdp: null,
                            odds: a[5],
                            ttp: l.Odds_Draw
                        }, {
                            sid: a[2],
                            hdp: null,
                            odds: a[3],
                            ttp: t.i[1]
                        }];
                        break;
                    case "ml":
                        c = [{
                            sid: a[0],
                            hdp: null,
                            odds: a[1],
                            ttp: t.i[0]
                        }, {
                            sid: a[2],
                            hdp: null,
                            odds: a[3],
                            ttp: t.i[1]
                        }];
                        break;
                    case "bts":
                        c = [{
                            sid: a[0][1],
                            hdp: null,
                            odds: a[0][2],
                            n: a[0][0],
                            ttp: a[0][0]
                        }, null == a[1] ? null : {
                            sid: a[1][1],
                            hdp: null,
                            odds: a[1][2],
                            n: a[1][0],
                            ttp: a[1][0]
                        }];
                        break;
                    case "eps":
                        if (null != a.o && a.o.length > 0) {
                            var s = a.o;
                            c = [];
                            for (var n = 0; n < s.length; n++) {
                                var r = s[n];
                                c.push({
                                    sid: r[1],
                                    hdp: null,
                                    odds: r[2],
                                    ttp: r[0],
                                    n: r[0],
                                    was: r[3]
                                })
                            }
                        }
                        break;
                    case "win":
                    case "m180":
                        a.win || a.m180;
                        c = _.map(a, function (e) {
                            return {
                                sid: e[1].substring(1),
                                hdp: null,
                                odds: e[2],
                                ttp: e[0]
                            }
                        }), t.cf || (c[1] = [c[2], c[2] = c[1]][0]);
                        break;
                    case "cs":
                        var i = _.chunk(_.takeRight(a, 12), 2),
                            o = _.chunk(_.take(a, 40), 2),
                            d = [],
                            m = [];
                        i = _.take(i, i.length - 1);
                        for (var p = ["1 - 0", "2 - 0", "2 - 1", "3 - 0", "3 - 1", "3 - 2", "4 - 0", "4 - 1", "4 - 2", "4 - 3"], h = ["0 - 0", "1 - 1", "2 - 2", "3 - 3", "4 - 4"], u = ["0 - 1", "0 - 2", "1 - 2", "0 - 3", "1 - 3", "2 - 3", "0 - 4", "1 - 4", "2 - 4", "3 - 4"], n = 0; n < o.length; n++) n % 2 == 0 ? d.push(o[n]) : m.push(o[n]);
                        for (var E = [], R = [], g = [], n = 0; n < d.length; n++) E.push({
                            n: p[n],
                            sid: d[n][0],
                            odds: d[n][1],
                            hdp: null,
                            ttp: p[n]
                        });
                        for (var n = 0; n < i.length; n++) R.push({
                            n: h[n],
                            sid: i[n][0],
                            odds: i[n][1],
                            hdp: null,
                            ttp: h[n]
                        });
                        for (var n = 0; n < m.length; n++) g.push({
                            n: u[n],
                            sid: m[n][0],
                            odds: m[n][1],
                            hdp: null,
                            ttp: u[n]
                        });
                        c = [E, R, g];
                        break;
                    default:
                        c = null
                }
                if (null != c) {
                    var f = this._highlightCheck,
                        v = this._formatSelectionId;
                    _.forEach(c, function (e, t) {
                        null != e && (e instanceof Array ? _.forEach(e, function (e, t) {
                            e.sid = v(e.sid), e.isHL = f(e.sid)
                        }) : (e.sid = v(e.sid), e.isHL = f(e.sid)))
                    })
                }
                return c
            },
            _highlightCheck: function (e) {
                var t = this.props.data.extraData.odds.hlo;
                return -1 != _.indexOf(t, e)
            },
            _formatSelectionId: function (e) {
                return e.replace(/\D+/, "")
            },
            _getBaseOddsProp: function (e, t) {
                return {
                    evtid: e.k,
                    score: e.i[10] + ":" + e.i[11],
                    isInplay: t,
                    parentEventId: e.pk,
                    addOddsJump: this.props.data.extraData.odds.addOddsJump,
                    oddsUp: this.props.data.extraData.odds.oddsUp,
                    oddsDown: this.props.data.extraData.odds.oddsDown,
                    oddsType: this.props.data.extraData.oddsType,
                    isFirstLoad: this.props.data.extraData.isFirstLoad
                }
            },
            _getOddsTooltips: function (e, t, a) {
                t
            }
        },
        oddsBtn: {
            componentWillReceiveProps: function (e) {
                var t = parseFloat(this.props.data.odds),
                    a = parseFloat(e.data.odds),
                    l = this.props.data.oddsType,
                    c = e.data.oddsType,
                    s = e.data.isFirstLoad;
                if (a != t && l == c && !s) {
                    var n = this.props.data.sid;
                    this.props.data.addOddsJump(n, oddsUtil.getValueIndicator(t, a))
                }
            },
            _addSelection: function (e) {
                var t = this.props.data,
                    a = null != t.ignoreHDP && t.ignoreHDP;
                Action.RightPanel.addSelection(t.sid, t.evtid, t.odds, a ? null : t.hdp, t.score, t.isInplay, t.parentEventId), Action.Homepage.highlightOdds(t.sid), e.preventDefault(), e.stopPropagation()
            }
        },
        pnc: {
            _displayChildTag: function (e) {
                var t = [o.pacType.et, o.pacType.pelAH, o.pacType.pelOU, o.pacType.toQualify, o.pacType.winner];
                return _.includes(t, e)
            },
            _getChildTag: function (e) {
                switch (e) {
                    case o.pacType.et:
                        return l.OP_ExtraTime;
                    case o.pacType.pelAH:
                    case o.pacType.pelOU:
                        return l.HPET_Pens;
                    case o.pacType.toQualify:
                        return l.MB_Qualify;
                    case o.pacType.winner:
                        return l.Odds_Winner
                }
            },
            _displayExtraTimeHeader: function (e) {
                var t = window.o.pacType,
                    a = e.cei.ctid;
                return a == t.et && e.ihe || a == t.par && "ET" == e.i[31]
            }
        },
        link: {
            _getMorebetLink: function (e, t, a) {
                return Router.event(e, t, a)
            },
            _getSportLink: function (e, t) {
                return Router.sport(t, e ? VIEW.INPLAY : VIEW.PRESTART)
            },
            _getFootballTodayLink: function () {
                return Router.today(1)
            },
            _getFootballTomorrowLink: function () {
                return Router.tomorrow(1)
            },
            _getSportStartingSoonLink: function (e) {
                return Router.sport(e, VIEW.STARTINGSOON)
            },
            _getCompetitionLink: function (e, t) {
                return Router.competition(e, t)
            },
            _getAllInplayLink: function () {
                return Router.inplay()
            },
            _getOutrightLink: function (e, t) {
                return Router.outright(e, t)
            },
            _getEpmLink: function (e, t) {
                return Router.epm(e, t)
            }
        },
        tv: {
            _playTV: function () {
                console.log("play TV")
            }
        },
        naming: {
            _getMarketLineName: function (e, t, a) {
                var c = [3, 9, 20, 13, 18];
                if ("ml" == e && _.includes(c, a)) return l.Odds_Winner;
                var s = AllMarketUtility.getPretermName(e, t, a),
                    n = AllMarketUtility.getBetTypeName(e, t, "", a),
                    r = AllMarketUtility.getPeriod(e);
                return s + n + ("" == r ? "" : "- " + r)
            },
            _getChildMarketLineName: function (e, t, a, l) {
                return _.indexOf([7, 53], t) > -1 ? l : l + " - " + AllMarketUtility.getPretermName(e, t, a) + AllMarketUtility.getBetTypeName(e, t, "", a)
            },
            _getBestOfLocalization: function (e) {
                return "0" == e ? l.LiveText : oddsUtil.GetBestOfLocalization(e)
            },
            _getNetSportPeriod: function (e, t) {
                var a = t || this.props.data.sid;
                if (AllMarketUtility.isTableTennisOrBadmintion(a)) {
                    var c = e[1];
                    return l["Period_" + c + "G"]
                }
                return oddsUtil.GetPeriodText(e)
            }
        },
        feContent: {
            _genOddsItem: function (e, t, a) {
                var l = this.props.data,
                    c = l.data.c.e[0],
                    n = e.odds,
                    r = e.sid;
                if (0 == n) return React.createElement("td", {
                    key: r,
                    className: "odds-large t-a-r" + (a ? "" : " pd-t-5")
                }, React.createElement(s.sport.oddsLock, null));
                var l = this.props.data,
                    c = (l.isEuroOdds, l.data.c.e[0]),
                    i = _.assign(this._getBaseOddsProp(c, l.data.ip), e);
                return "ou" == t && c.cei.ctid == o.pacType.pelAH && (i.evtid = c.ouId), React.createElement("td", {
                    key: r,
                    className: "odds-large t-a-r" + (a ? "" : " pd-t-5")
                }, React.createElement(s.sport.odds, {
                    data: i
                }))
            },
            _getOddsProps: function (e, t, a) {
                if (null == t.o[a]) return null;
                var l = this.props.data,
                    c = l.data,
                    s = t.cei.ctid;
                "ou" == a && t.cei.ctid == o.pacType.pelAH && (s = o.pacType.pelOU);
                var n = {
                    ctid: t.cei.ctid,
                    sid: c.sid,
                    betType: a
                };
                s != o.pacType.par && (n.childName = t.cei.n);
                var r = _.assign(n, {
                    baseOddsProps: _.assign({}, e)
                });
                return r.oddsItems = this._getOddsItems(a, t), r
            },
            _linkToAMPage: function (e, t) {
                Action.LoadSite(e), t.preventDefault(), t.stopPropagation()
            }
        },
        score: {
            _canDisplayScore: function (e, t, a) {
                var l = [3, 4, 9, 20, 13, 18, 25, 14, 2];
                return 18 != t && (_.contains(l, t) ? a && "True" == e.i[38] : a)
            }
        }
    }, s.rightPanel = React.createClass({
        displayName: "rightPanel",
        render: function () {
            var e = this.props.data,
                t = e.extraData,
                a = [],
                l = !0;
            return _.forEach(e.data, function (e, c) {
                var n = {
                    data: e,
                    extraData: t,
                    isFirst: l
                };
                1 == e.t ? a.push(React.createElement(s.rightPanel.eventForm, {
                    key: "rfe_" + e.spid,
                    data: n
                })) : 2 == e.t && e.isEpm ? a.push(React.createElement(s.rightPanel.epmForm, {
                    key: "rfe_" + e.spid,
                    data: n
                })) : 2 != e.t || e.isEpm ? 3 == e.t && a.push(React.createElement(s.rightPanel.competitionForm, {
                    key: "rfe_" + e.spid,
                    data: n
                })) : a.push(React.createElement(s.rightPanel.outrightForm, {
                    key: "rfe_" + e.spid,
                    data: n
                })), l && (l = !1)
            }), React.createElement("div", {
                className: "content-r float-right"
            }, a)
        }
    }), s.rightPanel.eventForm = React.createClass({
        displayName: "eventForm",
        mixins: [s.Utility.tv, s.Utility.odds, s.Utility.timer, s.Utility.pnc, s.Utility.link, s.Utility.score],
        render: function () {
            var e, t = this.props.data,
                a = t.data,
                c = a.c.e[0],
                n = a.ip,
                r = this._canDisplayScore(c, a.sid, a.cds);
            "" != c.i[7] && (e = React.createElement("div", {
                onClick: this._playTV,
                className: "icon-TV2 ft-c-18 dsp-iblk",
                title: utility.replaceTooltipBu(n ? l.LP_LiveStreamInplay : l.LP_LiveStream)
            }));
            var i;
            n && (i = React.createElement("div", {
                className: "live dsp-iblk ft-c-14 fts-12" + (null == e ? "" : " mg-r-6")
            }, l.LiveText), 4 == a.sid && ("True" == c.i[38] && c.sb ? i = React.createElement(s.sport.baseBallPeriod, {
                showinInplay: !1,
                hasTV: null != e,
                data: {
                    cp: c.sb.cp,
                    s: c.sb.s
                }
            }) : r = !1));
            var d, m, p = {
                    info: c.i,
                    edt: c.edt,
                    isInplay: n,
                    sid: a.sid,
                    isns: a.isNetSports,
                    cp: null != c.sb ? c.sb.cp : null
                },
                h = c.i[10],
                u = c.i[11];
            d = r ? h + " - " + u : "v", m = React.createElement("div", {
                className: "pd-b-5"
            }, React.createElement("span", {
                className: "mg-r-10"
            }, c.i[0]), React.createElement("span", {
                className: "ft-c-14 mg-r-10 dsp-iblk"
            }, d), c.i[1]);
            var E;
            a.isNetSports && n && null != c.sb && (E = React.createElement("div", {
                className: "pd-t-10 pd-l-10 pd-t-10 pd-b-3 pd-r-6 fts-13"
            }, React.createElement(s.rightPanel.eventForm.netSportScore, {
                data: {
                    sb: c.sb,
                    eid: c.k,
                    r: !0,
                    sid: a.sid
                }
            })));
            var R;
            18 == a.sid && null != c.sb && null != c.sb.ps && c.sb.ps.length > 0 && (R = React.createElement("div", {
                className: "pd-t-10 pd-l-10 pd-t-10 pd-b-3 pd-r-6 fts-13"
            }, React.createElement(s.rightPanel.eventForm.cricketScore, {
                data: {
                    gt: c.i[37],
                    sb: c.sb
                }
            })));
            var g;
            n && this._displayExtraTimeHeader(c) && 1 == a.sid && (g = React.createElement(s.mainFeatureEvent.header.extraTime, {
                data: {
                    hs: c.i[33],
                    as: c.i[34],
                    multipleLine: !0
                }
            }));
            var f, v = {
                txt: l.HP_AllMarkets + " ",
                ec: c.i[32],
                url: this._getMorebetLink(c.cei.ctid == o.pacType.par ? c.k : c.pk, a.ip ? VIEW.INPLAY : VIEW.PRESTART, c.i[36]),
                top: 0
            };
            "N" == c.g && (f = React.createElement(s.neutralIcon, {
                isRight: !0
            }));
            var N;
            if (!a.ip && null != c.o && null != c.o.eps && null != c.o.eps.o && c.o.eps.o.length > 0) {
                var b = {
                    baseProps: this._getBaseOddsProp(c, n),
                    oddsItems: this._getOddsItems("eps", c),
                    url: v.url,
                    n: c.o.eps.n
                };
                N = React.createElement(s.rightPanel.eps, {
                    data: b
                })
            }
            var _;
            return a.idm && "" != a.msg && (_ = React.createElement(s.mainFeatureEvent.content.message, {
                pdb: !1,
                msg: a.msg
            })), React.createElement("div", {
                className: "radius bg-c-1 container pd-6 " + (t.isFirst ? "" : "mg-t-10")
            }, React.createElement("div", {
                className: "rpl-header multiple bg-c-10 radius",
                onClick: this._gotoAMPage.bind(this, v.url)
            }, React.createElement("div", {
                className: "leagueName radius pd-l-10 pd-t-8 pd-b-6  ft-c-27 fts-13 border_lv4"
            }, React.createElement("div", {
                className: "div-lineHeight-lv1 dsp-iblk float-right mg-r-6 "
            }, i, e), React.createElement("div", {
                className: "lht-1e"
            }, a.c.n)), React.createElement("div", {
                className: "teamName radius pd-l-10 pd-r-6  ft-c-27 fts-13 border_lv4"
            }, React.createElement("table", {
                className: "width-100p height-29"
            }, React.createElement("colgroup", null, React.createElement("col", null), React.createElement("col", {
                className: "col-fixed23"
            })), React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", {
                className: "ft-c-3 fts-15 t-va-t"
            }, m), React.createElement("td", {
                className: "t-va-t t-a-r t-va-t"
            }, f))))), g), E, R, React.createElement("div", {
                className: "rpl-greenScreen mg-t-6 bg-c-29 radius"
            }, React.createElement(s.mainFeatureEvent.img, {
                src: a.img,
                url: v.url
            }), React.createElement(s.rightPanel.eventForm.PeriodAndTime, {
                data: p
            })), _, N, React.createElement(s.rightPanel.eventForm.marketLines, {
                data: {
                    evt: c,
                    sid: a.sid,
                    rd: a.rd,
                    isInplay: n,
                    extraData: t.extraData
                }
            }), React.createElement(s.rightPanel.morebet, {
                data: v
            }))
        },
        _gotoAMPage: function (e) {
            Action.LoadSite(e)
        }
    }), s.rightPanel.eventForm.netSportScore = React.createClass({
        displayName: "netSportScore",
        render: function () {
            var e, t = this.props.data,
                a = t.sb,
                c = t.eid,
                s = [],
                n = this._getScore;
            if (null != a) {
                _.forEach(a.ps, function (e, t) {
                    var l, r = "rfe_ns_" + c + "_" + t;
                    l = t != a.ps.length - 1 ? "mg-r-6" : "ft-c-16", s.push(React.createElement("span", {
                        key: r,
                        className: l
                    }, n(e)))
                });
                var r = 3 == t.sid ? l.Results_Games : l.Results_Points;
                e = t.r ? React.createElement("div", {
                    className: "float-right ft-c-16"
                }, React.createElement("span", {
                    className: "ft-c-21 mg-r-3"
                }, r), this._getScore(3 == t.sid ? a.ftg : a.p)) : React.createElement("span", {
                    className: "ft-c-16 mg-l-30"
                }, React.createElement("span", {
                    className: "ft-c-21 mg-r-3"
                }, r), this._getScore(3 == t.sid ? a.ftg : a.p))
            }
            return t.r ? React.createElement("div", null, e, s, React.createElement("div", {
                className: "clearBoth"
            })) : React.createElement("div", null, s, e, React.createElement("div", {
                className: "clearBoth"
            }))
        },
        _getScore: function (e) {
            return e.h + "-" + e.a
        }
    }), s.rightPanel.eventForm.cricketScore = React.createClass({
        displayName: "cricketScore",
        render: function () {
            var e = this.props.data;
            return React.createElement("div", null, React.createElement("span", {
                className: "ft-c-16"
            }, this._getScore(e.gt, e.sb)))
        },
        _getScore: function (e, t) {
            var a = 13 == e ? "i1" : t.cp,
                l = _.first(_.filter(t.ps, "p", a));
            return "1" == t.s ? l.h + "-" + l.hw : l.a + "-" + l.aw
        }
    }), s.rightPanel.eventForm.PeriodAndTime = React.createClass({
        displayName: "PeriodAndTime",
        mixins: [s.Utility.timer, s.Utility.naming],
        render: function () {
            var e, t, a, c, n, r = this.props.data,
                i = r.info,
                o = r.sid;
            if (r.isInplay) {
                if (null != i[31] && "" != i[31] && (a = React.createElement("span", {
                        title: this._getLongPeriod(i[31]),
                        className: "mg-r-4 ft-c-" + (3 == o ? "3" : "18")
                    }, this._getShortPeriod(i[31]))), "" != i[5] && (c = 2 == o ? React.createElement("span", {
                        className: "ft-c-3"
                    }, i[5]) : 14 == o ? React.createElement("span", {
                        className: "ft-c-3"
                    }, "" != i[5] ? i[5].split(":")[0] + "'" : i[5]) : React.createElement(s.sport.iptime, {
                        canTick: utility.canTick(o),
                        data: {
                            class: "ft-c-3",
                            t: i[5]
                        }
                    })), r.isns && null != r.cp && (n = React.createElement("span", {
                        className: "ft-c-3"
                    }, this._getNetSportPeriod(r.cp))), 18 == o && null != r.cp) {
                    var d = "i1" == r.cp ? l.Innings1 : l.Innings2;
                    n = React.createElement("span", {
                        className: "ft-c-3"
                    }, d), a = null, c = null
                }
                if (21 == o && i[37] > 0 && (n = React.createElement("span", {
                        className: "ft-c-3"
                    }, this._getBestOfLocalization(i[37])), a = null, c = null), null == a && null == c && null == n) return null
            } else {
                var m = this._getEventDate(r.edt);
                if ("" != m && (e = React.createElement("span", {
                        className: "ft-c-18"
                    }, m)), t = React.createElement("span", {
                        className: "ft-c-3"
                    }, " " + this._getEventStartTime(r.edt)), null == e && null == t) return null
            }
            return React.createElement("div", {
                className: "greenScreen-time pd-6 pos-absolute bg-c-10 radius fts-13"
            }, a, c, n, e, t)
        }
    }), s.rightPanel.eventForm.marketLines = React.createClass({
        displayName: "marketLines",
        mixins: [s.Utility.odds],
        render: function () {
            var e = this.props.data,
                t = e.evt,
                a = e.sid,
                l = e.rd,
                c = e.isInplay,
                s = e.extraData,
                n = this._getMarketLinesByRegion(t, a, l, c, s);
            return React.createElement("div", {
                className: "mg-t-6"
            }, n)
        },
        _getMarketLinesByRegion: function (e, t, a, l, c) {
            var s;
            if (1 == t) s = "HDP" == a ? ["ah", "ou", "1x2", "bts", "cs"] : ["1x2", "ah", "ou", "bts", "cs"], e.cei.ctid != o.pacType.toQualify && e.cei.ctid != o.pacType.winner && s.push("To Qualify/ Winner");
            else if (2 == t) s = ["ah", "ou", "ml", "t1ou", "t2ou"];
            else if (3 == t) s = ["ml", "ah", "ahfts", "oufts"];
            else if (18 == t) s = ["ml"];
            else if (14 == t) s = ["1x2", "ah", "ou"];
            else if (25 == t) s = ["win", "m180"];
            else if (26 == t) s = ["ah", "ou", "1x2"];
            else {
                var n = null != e.o.ml;
                s = "HDP" == a ? ["ah", "ou", n ? "ml" : "1x2"] : [n ? "ml" : "1x2", "ah", "ou"]
            }
            var r = [],
                i = this._genMarketLine;
            return _.forEach(s, function (a, s) {
                r.push(i(a, e, l, c, t))
            }), r
        },
        _genMarketLine: function (e, t, a, l, c) {
            var n = {
                betType: e,
                baseOddsProps: this._getBaseOddsProp(t, a),
                ctid: t.cei.ctid,
                sid: c
            };
            t.cei.ctid != o.pacType.par && (n.childName = t.cei.n);
            var r;
            switch (e) {
                case "ah":
                case "ml":
                case "ahfts":
                    n.oddsItems = this._getOddsItems(e, t), null != n.oddsItems && (n.hn = t.i[0], n.an = t.i[1]), r = "ah";
                    break;
                case "ou":
                    1 == c && t.cei.ctid == o.pacType.pelAH && (n.baseOddsProps.evtid = t.ouId), n.oddsItems = this._getOddsItems(e, t), r = e;
                    break;
                case "m180":
                    var i = this._getOddsItems(e, t);
                    i && 3 == i.length && (i[1] = [i[2], i[2] = i[1]][0]), n.oddsItems = i, r = "ah";
                    break;
                case "win":
                case "1x2":
                case "cs":
                case "bts":
                    n.oddsItems = this._getOddsItems(e, t), r = e;
                    break;
                case "To Qualify/ Winner":
                    var d = _.find(t.cel, function (e) {
                        return e.cei.ctid == window.o.pacType.toQualify || e.cei.ctid == window.o.pacType.winner
                    });
                    null != d && null != d.o && null != d.o.ah ? (n.oddsItems = this._getOddsItems("ah", d), n.oddsItems[0].chdp = "", n.oddsItems[1].chdp = "", n.hn = t.i[0], n.an = t.i[1], n.ctid = d.cei.ctid, n.betType = "ah", n.childName = d.cei.n, n.baseOddsProps.evtid = d.k, n.baseOddsProps.parentEventId = d.pk) : n.oddsItems = null, r = "ah";
                    break;
                case "t1ou":
                    n.oddsItems = this._getOddsItems(e, t);
                    var d = _.find(t.cel, function (e) {
                        return e.cei.ctid == window.o.pacType.teamPointT1
                    });
                    null != d && null != d.cei && (n.ctid = d.cei.ctid, n.betType = "ou", n.childName = d.cei.n, n.baseOddsProps.evtid = d.k, n.baseOddsProps.parentEventId = d.pk), r = "ou";
                    break;
                case "t2ou":
                    n.oddsItems = this._getOddsItems(e, t);
                    var d = _.find(t.cel, function (e) {
                        return e.cei.ctid == window.o.pacType.teamPointT2
                    });
                    null != d && null != d.cei && (n.ctid = d.cei.ctid, n.betType = "ou", n.childName = d.cei.n, n.baseOddsProps.evtid = d.k, n.baseOddsProps.parentEventId = d.pk), r = "ou";
                case "oufts":
                    n.oddsItems = this._getOddsItems(e, t), r = "ou"
            }
            return null == n.oddsItems ? null : React.createElement(s.rightPanel.eventForm.marketLines[r], {
                key: t.k + "_" + e,
                data: n
            }, null)
        }
    }), s.rightPanel.odds = React.createClass({
        displayName: "odds",
        mixins: [s.Utility.oddsBtn],
        render: function () {
            var e = this.props.data,
                t = null;
            _.includes(e.oddsUp, e.sid) ? t = "oddsUp" : _.includes(e.oddsDown, e.sid) && (t = "oddsDown");
            var a = ["OddsWrapper", "dsp-iblk"];
            return e.isHL && a.push("selected"), null != t && a.push(t), e.isRight && a.push("float-right"), !e.isInplay || 0 != e.odds && "c" != e.odds ? e.inplay || 0 != e.odds && "c" != e.odds ? React.createElement("div", {
                className: a.join(" "),
                title: e.ttp
            }, React.createElement("span", {
                onClick: this._addSelection,
                className: "odds" + (e.last ? " odds-last" : "") + (e.odds < 0 ? " negOdds" : "")
            }, e.odds ? e.odds : "?�")) : React.createElement("div", {
                className: "OddsWrapper dsp-iblk"
            }, React.createElement("span", {
                className: "odds locked v-hidden",
                dangerouslySetInnerHTML: {
                    __html: "&nbsp;"
                }
            })) : React.createElement(s.sport.oddsLock, {
                isRight: e.isRight
            })
        }
    }), s.rightPanel.hdp = React.createClass({
        displayName: "hdp",
        render: function () {
            return React.createElement("div", {
                className: "OddsWrapper dsp-iblk"
            }, React.createElement("span", {
                className: "dark ft-c-16 mg-r-6"
            }, this.props.hdp))
        }
    }), s.rightPanel.marketLineTitle = React.createClass({
        displayName: "marketLineTitle",
        render: function () {
            return React.createElement("div", {
                className: "tb-mainEvent-sub-title bg-c-27 radius ft-c-4 t-a-l"
            }, this.props.n)
        }
    }), s.rightPanel.eventForm.marketLines.ah = React.createClass({
        displayName: "ah",
        mixins: [s.Utility.odds, s.Utility.naming],
        render: function () {
            for (var e = this.props.data, t = e.betType, a = e.baseOddsProps, l = e.oddsItems, c = "m180" == t, n = c ? 3 : 2, r = [], i = (this._needBlackTeamName, 0); i < n; i++) {
                var o = {
                    tn: 0 == i ? e.hn : e.an,
                    baseOddsProps: a,
                    oddsItem: l[i],
                    last: i == n - 1
                };
                null != o.oddsItem && (c && (o.tn = o.oddsItem.ttp), r.push(React.createElement(s.rightPanel.ahMarketLineRow, {
                    key: "fe_ah_" + (0 == i ? "h" : "a") + o.oddsItem.sid,
                    data: o
                })))
            }
            var d = 0 == e.ctid ? this._getMarketLineName(t, e.ctid, e.sid) : this._getChildMarketLineName(t, e.ctid, e.sid, e.childName);
            return React.createElement("table", {
                className: "tb-rpl"
            }, React.createElement("colgroup", null, React.createElement("col", null), React.createElement("col", {
                className: "col-fixed110"
            })), React.createElement("tbody", {
                className: "fts-13"
            }, React.createElement("tr", null, React.createElement("td", {
                colSpan: "2",
                className: "pd-0"
            }, React.createElement(s.rightPanel.marketLineTitle, {
                n: d
            })))), React.createElement("tbody", {
                className: "fts-13"
            }, r))
        }
    }), s.rightPanel.ahMarketLineRow = React.createClass({
        displayName: "ahMarketLineRow",
        mixins: [s.Utility.odds],
        getInitialState: function () {
            return {
                showDetail: !1
            }
        },
        render: function () {
            var e = this,
                t = this.props.data,
                a = t.tn,
                l = t.baseOddsProps,
                c = t.oddsItem,
                n = t.isEpm,
                r = t.dt,
                i = t.dil,
                o = t.ril,
                d = t.iscc,
                m = t.isFirst,
                p = this._needBlackTeamName;
            a = n ? i.map(function (t, a) {
                var l = e._getEpmDisplayName(r, t);
                return React.createElement(s.sport.team, {
                    key: "epmfe_" + t + "_" + a,
                    data: {
                        n: l
                    }
                })
            }) : React.createElement(s.sport.team, {
                data: {
                    n: a,
                    black: p(c.hdp)
                }
            });
            var h;
            (!l.isInplay || null != c.odds && 0 != c.odds) && c.hdp && (h = React.createElement("span", {
                className: "dark ft-c-16 mg-r-6"
            }, null == c.chdp ? c.hdp : c.chdp));
            var u = void 0;
            return n && (u = React.createElement("td", {
                className: "epm epm-content-r pd-t-10 t-a-r " + (m ? "" : " topBorder pd-b-5")
            }, React.createElement("span", {
                className: "icon icon-i-s ft-c-22 bg-c-57",
                onMouseEnter: function () {
                    return e._handleMouseEvent(!0)
                },
                onMouseLeave: function () {
                    return e._handleMouseEvent(!1)
                }
            }), this.state.showDetail ? React.createElement("div", {
                className: "overlayContainer selected pos-absolute"
            }, React.createElement("div", {
                className: "tickContainer"
            }, React.createElement("span", {
                className: "tick"
            })), React.createElement("div", {
                className: "overlay"
            }, React.createElement("div", {
                className: "br-c-1 bg-c-55 fts-13"
            }, o && o.map(function (t, a) {
                var l = e._getReferDetailName(t.isor, t.rn);
                return [React.createElement("div", {
                    className: "bold ft-c-25 t-a-l" + (0 !== a ? " pd-t-5 " : "")
                }, t.sn), d ? React.createElement("div", {
                    className: "ft-c-22 t-a-l"
                }, React.createElement("span", {
                    className: "mg-r-6"
                }, t.cn)) : null, React.createElement("div", {
                    className: "ft-c-22 t-a-l"
                }, l, React.createElement("span", {
                    className: "mg-r-5"
                }, ","), React.createElement("span", {
                    className: "mg-r-10"
                }, t.rd), React.createElement("span", null, t.rt))]
            })))) : null)), React.createElement("tr", {
                className: p(c.hdp) ? "home" : ""
            }, React.createElement("td", {
                className: "td-teameName t-a-l pd-t-10 pd-l-10" + (t.last ? " pd-b-10" : "") + (n && !m ? " topBorder pd-b-5" : " pd-b-5"),
                onClick: this._gotoAMPage
            }, a), u, React.createElement("td", {
                className: "t-a-r pd-t-10 " + (t.last ? " pd-b-10" : "") + (n && !m ? " topBorder pd-b-5" : " pd-b-5")
            }, h, React.createElement(s.rightPanel.odds, {
                data: _.assign({
                    last: !0
                }, l, c)
            })))
        },
        _gotoAMPage: function () {
            this.props.data.url && Action.LoadSite(this.props.data.url)
        },
        _getEpmDisplayName: function (e, t) {
            switch (e) {
                case 1:
                    var a = t.split("-v-");
                    return a.length < 2 ? null : a[0] + " v " + a[1];
                case 2:
                case 3:
                    return t
            }
        },
        _getReferDetailName: function (e, t) {
            if (e) return React.createElement("span", {
                className: "mg-r-6"
            }, t);
            var a = t.split("-v-");
            return a.length < 2 ? null : [React.createElement("span", {
                className: "mg-r-6"
            }, a[0]), React.createElement("span", {
                className: "mg-r-6 ft-c-16"
            }, "v"), React.createElement("span", null, a[1])]
        },
        _handleMouseEvent: function (e) {
            this.setState({
                showDetail: e
            })
        }
    }), s.rightPanel.eventForm.marketLines.ou = React.createClass({
        displayName: "ou",
        mixins: [s.Utility.odds, s.Utility.naming],
        render: function () {
            var e, t, a = this.props.data,
                c = a.betType,
                n = a.baseOddsProps,
                r = a.oddsItems;
            (!n.isInplay || null != r[0].odds && 0 != r[0].odds) && (e = React.createElement("span", {
                className: "upInt dsp-iblk ft-c-16 mg-r-15"
            }, React.createElement("span", {
                className: "ou ft-c-24 mg-r-5"
            }, l.so), r[0].hdp)), (!n.isInplay || null != r[1].odds && 0 != r[1].odds) && (t = React.createElement("span", {
                className: "upInt dsp-iblk ft-c-16 mg-r-15"
            }, React.createElement("span", {
                className: "ou ft-c-24 mg-r-5"
            }, l.su), r[1].hdp));
            var i = 0 == a.ctid ? this._getMarketLineName(c, a.ctid, a.sid) : this._getChildMarketLineName(c, a.ctid, a.sid, a.childName);
            return React.createElement("table", {
                className: "tb-rpl"
            }, React.createElement("colgroup", null, React.createElement("col", {
                className: "col-50Percent"
            }), React.createElement("col", {
                className: "col-50Percent"
            })), React.createElement("tbody", {
                className: "fts-13"
            }, React.createElement("tr", null, React.createElement("td", {
                colSpan: "2",
                className: "pd-0"
            }, React.createElement(s.rightPanel.marketLineTitle, {
                n: i
            })))), React.createElement("tbody", {
                className: "fts-13"
            }, React.createElement("tr", null, React.createElement("td", {
                className: "t-a-l pd-tb-10 pd-l-10"
            }, e, React.createElement(s.rightPanel.odds, {
                data: _.assign({
                    last: !0
                }, n, r[0])
            })), React.createElement("td", {
                className: "t-a-r pd-tb-10 pd-l-10"
            }, t, React.createElement(s.rightPanel.odds, {
                data: _.assign({
                    last: !0
                }, n, r[1])
            })))))
        }
    }), s.rightPanel.eventForm.marketLines["1x2"] = React.createClass({
        mixins: [s.Utility.odds, s.Utility.naming],
        render: function () {
            var e, t = this.props.data;
            if (null != t) {
                var a = t.baseOddsProps,
                    l = t.oddsItems;
                e = React.createElement("tbody", {
                    className: "fts-13"
                }, React.createElement("tr", null, React.createElement("td", {
                    className: "t-a-l pd-tb-10 pd-l-10 nowrap"
                }, React.createElement("span", {
                    className: "ft-1x2 ft-c-16"
                }, "1"), React.createElement(s.rightPanel.odds, {
                    data: _.assign({}, a, l[0])
                })), React.createElement("td", {
                    className: "t-a-c pd-tb-10 nowrap"
                }, React.createElement("span", {
                    className: "ft-1x2 ft-c-16"
                }, "X"), React.createElement(s.rightPanel.odds, {
                    data: _.assign({}, a, l[1])
                })), React.createElement("td", {
                    className: "t-a-r pd-tb-10 nowrap"
                }, React.createElement("span", {
                    className: "ft-1x2 ft-c-16"
                }, "2"), React.createElement(s.rightPanel.odds, {
                    data: _.assign({}, a, l[2])
                }))))
            }
            var c = 0 == t.ctid ? this._getMarketLineName("1x2", t.ctid, t.sid) : this._getChildMarketLineName("1x2", t.ctid, t.sid, t.childName),
                n = this.props.main;
            return React.createElement("table", {
                className: n ? "tb-mainEvent-sub" : "tb-rpl"
            }, React.createElement("colgroup", null, React.createElement("col", null), React.createElement("col", null), React.createElement("col", null)), React.createElement("tbody", {
                className: "fts-13"
            }, React.createElement("tr", null, React.createElement("td", {
                colSpan: "3",
                className: "pd-0"
            }, React.createElement(s.rightPanel.marketLineTitle, {
                n: c
            }))), e))
        }
    }), s.rightPanel.eventForm.marketLines.win = React.createClass({
        displayName: "win",
        mixins: [s.Utility.odds, s.Utility.naming],
        render: function () {
            var e, t = this.props.data;
            if (null != t) {
                var a, l = t.baseOddsProps,
                    c = t.oddsItems;
                a = void 0 != c[1] ? React.createElement(s.rightPanel.odds, {
                    data: _.assign({}, l, c[1])
                }) : React.createElement(s.sport.oddsEmptyWithSpace, null), e = React.createElement("tbody", {
                    className: "fts-13"
                }, React.createElement("tr", null, React.createElement("td", {
                    className: "t-a-l pd-tb-10 pd-l-10 nowrap"
                }, React.createElement("span", {
                    className: "ft-1x2 ft-c-16"
                }, "1"), React.createElement(s.rightPanel.odds, {
                    data: _.assign({}, l, c[0])
                })), React.createElement("td", {
                    className: "t-a-c pd-tb-10 nowrap"
                }, React.createElement("span", {
                    className: "ft-1x2 ft-c-16"
                }, "X"), a), React.createElement("td", {
                    className: "t-a-r pd-tb-10 nowrap"
                }, React.createElement("span", {
                    className: "ft-1x2 ft-c-16"
                }, "2"), React.createElement(s.rightPanel.odds, {
                    data: _.assign({}, l, c[2])
                }))))
            }
            var n = 0 == t.ctid ? this._getMarketLineName("win", t.ctid, t.sid) : this._getChildMarketLineName("win", t.ctid, t.sid, t.childName),
                r = this.props.main;
            return React.createElement("table", {
                className: r ? "tb-mainEvent-sub" : "tb-rpl"
            }, React.createElement("colgroup", null, React.createElement("col", null), React.createElement("col", null), React.createElement("col", null)), React.createElement("tbody", {
                className: "fts-13"
            }, React.createElement("tr", null, React.createElement("td", {
                colSpan: "3",
                className: "pd-0"
            }, React.createElement(s.rightPanel.marketLineTitle, {
                n: n
            }))), e))
        }
    }), s.rightPanel.eventForm.marketLines.bts = React.createClass({
        displayName: "bts",
        mixins: [s.Utility.odds, s.Utility.naming],
        render: function () {
            var e, t = this.props.data;
            if (null != t) {
                var a, l = t.baseOddsProps,
                    c = t.oddsItems;
                null != c[1] && (a = React.createElement("td", {
                    className: "t-a-r pd-tb-10"
                }, React.createElement("span", {
                    className: "mg-l-10 ft-c-4  mg-r-36 fts-12"
                }, c[1].n), React.createElement(s.rightPanel.odds, {
                    data: _.assign({}, l, c[1])
                }))), e = React.createElement("tbody", {
                    className: "fts-13"
                }, React.createElement("tr", null, React.createElement("td", {
                    className: "t-a-l pd-tb-10 pd-l-10"
                }, React.createElement("span", {
                    className: "ft-c-4  mg-r-36 fts-12"
                }, c[0].n), React.createElement(s.rightPanel.odds, {
                    data: _.assign({}, l, c[0])
                })), a))
            }
            return React.createElement("table", {
                className: this.props.main ? "tb-mainEvent-sub" : "tb-rpl"
            }, React.createElement("colgroup", null, React.createElement("col", {
                className: "col-50Percent"
            }), React.createElement("col", {
                className: "col-50Percent"
            })), React.createElement("tbody", {
                className: "fts-13"
            }, React.createElement("tr", null, React.createElement("td", {
                colSpan: "2",
                className: "pd-0"
            }, React.createElement(s.rightPanel.marketLineTitle, {
                n: this._getMarketLineName(t.betType, t.ctid, t.sid)
            })))), e)
        }
    }), s.rightPanel.eventForm.marketLines.cs = React.createClass({
        displayName: "cs",
        mixins: [s.Utility.odds, s.Utility.naming],
        render: function () {
            var e = this.props.data,
                t = e.baseOddsProps,
                a = e.oddsItems,
                l = [],
                c = this._filterOutZeroOdds;
            _.forEach(a, function (e, t) {
                l.push(_.filter(e, c))
            });
            var n = 0 == e.ctid ? this._getMarketLineName("cs", e.ctid, e.sid) : this._getChildMarketLineName("cs", e.ctid, e.sid, e.childName);
            return React.createElement("table", {
                className: "tb-rpl nowrap"
            }, React.createElement("colgroup", null, React.createElement("col", {
                className: "col-22Percent"
            }), React.createElement("col", {
                className: "col-22Percent"
            }), React.createElement("col", {
                className: "col-22Percent"
            })), React.createElement("tbody", {
                className: "fts-13"
            }, React.createElement("tr", null, React.createElement("td", {
                colSpan: "3",
                className: "pd-0"
            }, React.createElement(s.rightPanel.marketLineTitle, {
                n: n
            })))), React.createElement("tbody", {
                className: "fts-13"
            }, this._genRow(l[0], l[1], l[2], t)))
        },
        _filterOutZeroOdds: function (e) {
            return null != e && null != e.odds && "0.00" != e.odds
        },
        _genRow: function (e, t, a, l) {
            for (var c = [], s = this._genOdds, n = l.isInplay ? 3 : Math.max(e.length, t.length, a.length), r = 0; r < n; r++) {
                var i = e[r],
                    o = t[r],
                    d = a[r],
                    m = "";
                m += 0 == r ? " pd-t-10" : " pd-t-5", r == n - 1 && (m += " pd-b-10"), c.push(React.createElement("tr", {
                    key: "cs_r" + r
                }, s(i, m + " pd-l-10 t-a-l", l), s(o, m + " t-a-c", l), s(d, m + " t-a-r", l)))
            }
            return c
        },
        _genOdds: function (e, t, a) {
            return null == e || "0.00" == e.odds ? React.createElement("td", {
                className: t
            }) : React.createElement("td", {
                className: t
            }, React.createElement("span", {
                className: "mg-r-6 ft-c-16"
            }, e.n), React.createElement(s.rightPanel.odds, {
                data: _.assign({}, a, e)
            }))
        }
    }), s.rightPanel.eps = React.createClass({
        displayName: "eps",
        render: function () {
            for (var e = this.props.data, t = [], a = 0; a < e.oddsItems.length && a < 2; a++) {
                var c = e.oddsItems[a],
                    n = {
                        n: c.n,
                        was: c.was,
                        oddsItem: _.assign({
                            last: !0
                        }, e.baseProps, c)
                    },
                    r = "fe_eps_" + c.sid;
                t.push(React.createElement(s.rightPanel.eps.selections, {
                    key: r,
                    data: n
                }))
            }
            return React.createElement("div", null, React.createElement("table", {
                className: "tb-eps mg-t-6 width-100p fts-13"
            }, React.createElement("thead", {
                className: " ft-c-3  radius"
            }, React.createElement("tr", null, React.createElement("th", {
                className: "height-28 bg-c-4 radius t-a-l fontWeight-normal pd-l-10",
                colSpan: "3"
            }, e.n)))), React.createElement("table", {
                className: "tb-eps mg-t-6 width-100p fts-13"
            }, React.createElement("colgroup", null, React.createElement("col", null), React.createElement("col", {
                className: "col-fixed41"
            })), React.createElement("tbody", null, t)), React.createElement("div", {
                className: "viewall lht-30 t-a-c fts-13 topBorder mg-t-5" + (e.oddsItems.length <= 2 ? " hidden" : ""),
                onClick: this._linkToAMP
            }, l.LP_View_All))
        },
        _linkToAMP: function (e) {
            Action.LoadSite(this.props.data.url, {
                showMoreEPS: !0
            }), e.preventDefault(), e.stopPropagation()
        }
    }), s.rightPanel.eps.selections = React.createClass({
        displayName: "selections",
        render: function () {
            var e = this.props.data;
            return React.createElement("tr", null, React.createElement("td", {
                className: "pd-0 height-30 pd-l-10"
            }, e.n), React.createElement("td", {
                className: "pd-0 t-a-cheight-30"
            }, React.createElement(s.rightPanel.odds, {
                data: e.oddsItem
            })))
        }
    }), s.rightPanel.morebet = React.createClass({
        displayName: "morebet",
        render: function () {
            var e = this.props.data,
                t = e.isEpm,
                a = {};
            e.nottp || (a.title = l.OP_ViewAllMarkets);
            var s = "t-a-c bt-moreBet-enlarge height-40 radius ft-c-3 fts-12 mg-t-" + e.top;
            return s += t ? " bg-c-4 epsbanner" : " bg-c-41", React.createElement("div", c({}, a, {
                onClick: this._clickMoreBet.bind(this, e.url),
                className: s
            }), e.txt, React.createElement("span", {
                className: "fontWeight-bold"
            }, e.ec), React.createElement("span", {
                className: "icon-ArrowMoreBets"
            }))
        },
        _clickMoreBet: function (e, t) {
            Action.LoadSite(e), t.preventDefault(), t.stopPropagation()
        }
    }), s.rightPanel.outrightForm = React.createClass({
        displayName: "outrightForm",
        mixins: [s.Utility.odds, s.Utility.link],
        render: function () {
            var e, t = this.props.data,
                a = t.data,
                c = a.c.e[0],
                n = c["n-o"][0],
                r = this._getBaseOddsProp,
                i = this._formatSelectionId,
                o = this._highlightCheck,
                d = _.take(n.o, 10).map(function (e) {
                    var t = i(e[1]),
                        l = {
                            sid: t,
                            hdp: null,
                            odds: e[2],
                            isHL: o(t)
                        },
                        n = r(c, a.ip),
                        d = {
                            tn: e[0],
                            baseOddsProps: n,
                            oddsItem: l
                        };
                    return React.createElement(s.rightPanel.ahMarketLineRow, {
                        key: "ror_" + c.k + "_" + e[1],
                        data: d
                    })
                });
            n.pf && n.pt && (e = React.createElement("table", {
                className: "tb-rpl mg-b-6"
            }, React.createElement("colgroup", null, React.createElement("col", null), React.createElement("col", {
                className: "col-fixedodds"
            })), React.createElement("tbody", {
                className: "fts-13"
            }, React.createElement("tr", null, React.createElement("td", {
                colSpan: "2",
                className: "pd-t-10"
            }, React.createElement("div", {
                className: "tb-mainEvent-sub-title  bg-c-27  radius ft-c-4"
            }, l.OP_EW_S, " - 1/", n.pf, ", ", l.OP_NT.replace("XXX", n.pt)))))));
            var m;
            a.idm && "" != a.msg && (m = React.createElement(s.mainFeatureEvent.content.message, {
                msg: a.msg
            }));
            var p = this._getOutrightLink(a.sid, a.c.k);
            return React.createElement("div", {
                className: "radius bg-c-1 container pd-6 " + (t.isFirst ? "" : "mg-t-10")
            }, React.createElement("div", {
                className: "rpl-header cr-pointer multiple bg-c-10 radius",
                onClick: this._clickHeader.bind(this, p)
            }, React.createElement("div", {
                className: "leagueName radius pd-l-10 pd-t-8 pd-b-6  ft-c-27 fts-13 border_lv4 "
            }, React.createElement("div", {
                className: "uppercase lht-1e"
            }, a.sn)), React.createElement("div", {
                className: "teamName radius pd-l-10 pd-r-6  ft-c-27 fts-13 border_lv4"
            }, React.createElement("table", {
                className: "width-100p height-29"
            }, React.createElement("colgroup", null, React.createElement("col", null), React.createElement("col", {
                className: "col-fixed23"
            })), React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", {
                className: "ft-c-3 fts-15 t-va-t"
            }, React.createElement("div", {
                className: " pd-b-5"
            }, c.egn)), React.createElement("td", {
                className: "t-va-t t-a-r"
            })))))), React.createElement("div", {
                className: "rpl-greenScreen mg-t-6 bg-c-29 radius"
            }, React.createElement(s.mainFeatureEvent.img, {
                src: a.img,
                url: p
            })), m, React.createElement("div", {
                className: "mg-t-6"
            }, React.createElement("table", {
                className: "tb-rpl"
            }, React.createElement("colgroup", null, React.createElement("col", null), React.createElement("col", {
                className: "col-fixedodds"
            })), React.createElement("tbody", {
                className: "fts-13"
            }, React.createElement("tr", null, React.createElement("td", {
                colSpan: "2"
            }, React.createElement(s.rightPanel.marketLineTitle, {
                n: n.mn
            })))), React.createElement("tbody", {
                className: "fts-13"
            }, d)), e, React.createElement(s.rightPanel.morebet, {
                data: {
                    txt: l.LP_View_All,
                    url: p,
                    top: e ? 0 : 10
                }
            })))
        },
        _clickHeader: function (e) {
            Action.LoadSite(e)
        }
    }), s.rightPanel.epmForm = React.createClass({
        displayName: "epmForm",
        mixins: [s.Utility.odds, s.Utility.link],
        render: function () {
            var e, t = this.props.data,
                a = t.data,
                c = a.c.e[0],
                n = c["e-o"][0],
                r = this._getBaseOddsProp,
                i = this._formatSelectionId,
                o = this._highlightCheck,
                d = n.o.map(function (e, t) {
                    var l = e.id,
                        n = e.dil,
                        d = e.ril,
                        m = e.dt,
                        p = e.iscc,
                        h = e.lo,
                        u = e.o,
                        E = i(l),
                        R = {
                            sid: E,
                            hdp: null,
                            odds: u,
                            isHL: o(E)
                        },
                        g = r(c, a.ip),
                        f = {
                            baseOddsProps: g,
                            oddsItem: R,
                            isEpm: !0,
                            lo: h,
                            iscc: p,
                            dt: m,
                            dil: n,
                            ril: d,
                            isFirst: 0 === t
                        };
                    return React.createElement(s.rightPanel.ahMarketLineRow, {
                        key: "repm_" + c.k + "_" + l,
                        data: f
                    })
                });
            a.idm && "" != a.msg && (e = React.createElement(s.mainFeatureEvent.content.message, {
                msg: a.msg
            }));
            var m = this._getEpmLink(a.sid, a.c.k);
            return React.createElement("div", {
                className: "radius bg-c-1 container pd-6 " + (t.isFirst ? "" : "mg-t-10")
            }, React.createElement("div", {
                className: "rpl-header cr-pointer multiple bg-c-10 radius",
                onClick: this._clickHeader.bind(this, m)
            }, React.createElement("div", {
                className: "leagueName radius pd-l-10 pd-t-8 pd-b-6  ft-c-27 fts-13 border_lv4 "
            }, React.createElement("div", {
                className: "uppercase lht-1e"
            }, a.sn)), React.createElement("div", {
                className: "teamName radius pd-l-10 pd-r-6  ft-c-27 fts-13 border_lv4"
            }, React.createElement("table", {
                className: "width-100p height-29"
            }, React.createElement("colgroup", null, React.createElement("col", null), React.createElement("col", {
                className: "col-fixed23"
            })), React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", {
                className: "ft-c-3 fts-15 t-va-t"
            }, React.createElement("div", {
                className: " pd-b-5"
            }, c.egn)), React.createElement("td", {
                className: "t-va-t t-a-r"
            })))))), React.createElement("div", {
                className: "rpl-greenScreen mg-t-6 bg-c-29 radius"
            }, React.createElement(s.mainFeatureEvent.img, {
                src: a.img,
                url: m
            })), e, React.createElement("div", {
                className: "mg-t-6"
            }, React.createElement("table", {
                className: "tb-rpl"
            }, React.createElement("colgroup", null, React.createElement("col", null), React.createElement("col", {
                className: "col-fixedodds"
            }), React.createElement("col", {
                className: "col-fixedodds"
            })), React.createElement("tbody", {
                className: "fts-13"
            }, React.createElement("tr", null, React.createElement("td", {
                colSpan: "3"
            }, React.createElement(s.rightPanel.marketLineTitle, {
                n: n.mn
            })))), React.createElement("tbody", {
                className: "fts-13"
            }, d)), React.createElement(s.rightPanel.morebet, {
                data: {
                    txt: l.LP_View_All,
                    url: m,
                    top: 10
                }
            })))
        },
        _clickHeader: function (e) {
            Action.LoadSite(e)
        }
    }), s.rightPanel.competitionForm = React.createClass({
        displayName: "competitionForm",
        mixins: [s.Utility.odds, s.Utility.link],
        render: function () {
            var e, t = this.props.data,
                a = t.data,
                c = a.c;
            switch (a.rd) {
                case "HDP":
                    e = "ah";
                    break;
                case "ML":
                    e = "ml";
                    break;
                case "1X2":
                    e = "1x2"
            }
            25 == a.sid && (e = "win");
            var n;
            c.e.length > 0 && (n = React.createElement("div", {
                className: "fts-13"
            }, React.createElement(s.rightPanel.marketLineTitle, {
                n: l.LP_Matches
            })));
            var r, i = this._getOddsItems,
                d = this._getBaseOddsProp,
                m = !1,
                p = this._getMorebetLink,
                h = c.e.map(function (l) {
                    25 == a.sid && (l.cf = !0);
                    var c = i(e, l);
                    if (null != c) {
                        var n, r, h, u, E, R, g = d(l, l.ip),
                            f = p(l.cei.ctid == o.pacType.par ? l.k : l.pk, VIEW.PRESTART, l.i[36]);
                        n = {
                            tn: c[0].ttp,
                            baseOddsProps: g,
                            oddsItem: c[0],
                            url: f
                        }, r = {
                            tn: c[1].ttp,
                            baseOddsProps: g,
                            oddsItem: c[1],
                            url: f,
                            last: "1X2" != a.rd
                        }, u = React.createElement(s.rightPanel.ahMarketLineRow, {
                            data: n
                        }), E = React.createElement(s.rightPanel.ahMarketLineRow, {
                            data: r
                        }), ("1X2" == a.rd || 25 == t.data.sid && 3 == c.length) && (h = {
                            tn: c[2].ttp,
                            baseOddsProps: g,
                            oddsItem: c[2],
                            url: f,
                            last: !0
                        }, R = React.createElement(s.rightPanel.ahMarketLineRow, {
                            data: h
                        }), r.last = !0, h.last = !1, E = React.createElement(s.rightPanel.ahMarketLineRow, {
                            data: h
                        }), R = React.createElement(s.rightPanel.ahMarketLineRow, {
                            data: r
                        }));
                        var v = "tb-rpl tb-rfeatureEvent";
                        return m && (v += " topBorder"), !m && (m = !0), React.createElement("table", {
                            key: "feComp_" + l.k,
                            className: v
                        }, React.createElement("colgroup", null, React.createElement("col", null), React.createElement("col", {
                            className: "col-fixed110"
                        })), React.createElement("tbody", {
                            className: "fts-13 hovertby"
                        }, u, E, R))
                    }
                });
            c.hasor && (r = React.createElement(s.rightPanel.morebet, {
                data: {
                    txt: l.LP_OutrightMarkets,
                    url: this._getOutrightLink(a.sid, c.k),
                    nottp: !0
                }
            }));
            var u = void 0;
            c.hasepm && (u = React.createElement(s.rightPanel.morebet, {
                data: {
                    txt: l.EPM.EPM_Available,
                    url: this._getEpmLink(a.sid, c.k),
                    nottp: !0,
                    isEpm: !0
                }
            }));
            var E;
            a.idm && "" != a.msg && (E = React.createElement(s.mainFeatureEvent.content.message, {
                msg: a.msg
            }));
            var R, g = this._getCompetitionLink(a.sid, c.k);
            return c.ec > 0 && (R = React.createElement(s.rightPanel.morebet, {
                data: {
                    txt: l.HP_AllMatches + " " + c.ec,
                    url: g,
                    nottp: !0
                }
            })), React.createElement("div", {
                className: "radius bg-c-1 container pd-6 " + (t.isFirst ? "" : "mg-t-10")
            }, React.createElement("div", {
                className: "rpl-header cr-pointer multiple bg-c-10 radius",
                onClick: this._clickHeader.bind(this, g)
            }, React.createElement("div", {
                className: "leagueName radius pd-l-10 pd-t-8 pd-b-6  ft-c-27 fts-13 border_lv4 "
            }, React.createElement("div", {
                className: "lht-1e uppercase"
            }, a.sn.toUpperCase())), React.createElement("div", {
                className: "teamName radius pd-l-10 pd-r-6  ft-c-27 fts-13 border_lv4"
            }, React.createElement("table", {
                className: "width-100p height-29"
            }, React.createElement("colgroup", null, React.createElement("col", null), React.createElement("col", {
                className: "col-fixed23"
            })), React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", {
                className: "ft-c-3 fts-15 t-va-t"
            }, React.createElement("div", {
                className: " pd-b-5"
            }, c.n)), React.createElement("td", {
                className: "t-va-t t-a-r"
            })))))), React.createElement("div", {
                className: "rpl-greenScreen mg-t-6 bg-c-29 radius"
            }, React.createElement(s.mainFeatureEvent.img, {
                src: a.img,
                url: g
            })), E, React.createElement("div", {
                className: "mg-t-6"
            }, n, h, R, r, u))
        },
        _clickHeader: function (e) {
            Action.LoadSite(e)
        }
    }), s.leftPanel = React.createClass({
        displayName: "leftPanel",
        render: function () {
            var e, t, a, l, c, n, r, i, o = this.props.data,
                d = o.data,
                m = o.extraData;
            null != d.m && (a = {
                data: d.m,
                extraData: m
            }, l = React.createElement(s.mainFeatureEvent, {
                data: a
            })), d.s.length > 0 && (c = React.createElement(s.secondaryFeatureEvent, {
                data: {
                    data: d.s,
                    extraData: m
                }
            })), d.hip.length > 0 && (e = {
                data: d.hip,
                extraData: m,
                ipec: d.ipec
            }, n = React.createElement(s.inplayPanel, {
                data: e
            })), (d.hnph.length > 0 || d.hnps.length > 0) && (t = {
                hl: d.hnph,
                ss: d.hnps,
                extraData: m
            }, r = React.createElement(s.prestartPanel, {
                data: t
            })), window.global.enableEPS && d.hes && d.hes.length > 0 && (i = React.createElement(s.epmSection, {
                data: d.hes,
                extraData: m
            }));
            var p = React.createElement(s.leftPanel.topBanner, {
                url: m.bannerURL,
                h: m.topBannerH
            });
            return React.createElement("div", {
                className: "content-l clearHack-left"
            }, p, l, n, c, r, i)
        }
    }), s.leftPanel.topBanner = React.createClass({
        displayName: "topBanner",
        render: function () {
            return React.createElement("div", {
                className: "radius bg-c-1 pos-relative ofw-hidden topbanner",
                style: {
                    height: this.props.h + "px"
                }
            }, React.createElement("iframe", {
                src: this.props.url,
                height: this.props.h,
                width: "100%",
                scrolling: "no",
                frameBorder: "0",
                allowTransparency: "true"
            }))
        }
    }), s.neutralIcon = React.createClass({
        displayName: "neutralIcon",
        render: function () {
            return React.createElement("span", {
                title: l.neut,
                className: "neutral fts-12" + (this.props.isRight ? "" : " pos-absolute right-n23 top-2")
            }, React.createElement("span", {
                className: "icon-Neutralbg"
            }), React.createElement("span", {
                className: "icon-NeutralN"
            }))
        }
    }), s.mainFeatureEvent = React.createClass({
        displayName: "mainFeatureEvent",
        mixins: [s.Utility.pnc, s.Utility.timer, s.Utility.link, s.Utility.feContent],
        render: function () {
            var e = this.props.data,
                t = e.data,
                a = t.c.e[0],
                c = HP_Store.getNeedScoreBoardConditionSports(),
                n = {
                    isInplay: t.ip,
                    cds: t.cds || "True" == a.i[38],
                    hs: a.i[10],
                    as: a.i[11],
                    ht: a.i[0],
                    at: a.i[1],
                    showExtraTime: t.ip && this._displayExtraTimeHeader(a) && 1 == t.sid,
                    isNeutral: "N" == a.g,
                    period: a.i[31],
                    time: a.i[5],
                    date: this._getEventDate(a.edt),
                    startTime: this._getEventStartTime(a.edt),
                    cn: t.c.n,
                    showTV: "" != a.i[7],
                    isns: t.isNetSports,
                    nspt: a.i[37],
                    fhs: a.i[33],
                    fas: a.i[34],
                    sid: t.sid,
                    url: this._getMorebetLink(a.cei.ctid == o.pacType.par ? a.k : a.pk, t.ip ? VIEW.INPLAY : VIEW.PRESTART, a.i[36])
                };
            _.includes(c, t.sid) && (n.cds = t.cds && "True" == a.i[38]), 18 == t.sid && a.sb && (n.period = "i1" == a.sb.cp || 13 == a.i[37] ? l.Innings1 : l.Innings2, a.sb.ps && a.sb.ps.length > 0 && (n.cricketScore = {
                gt: a.i[37],
                sb: a.sb
            })), 4 == t.sid && "True" == a.i[38] && a.sb && (n.period = a.sb.cp, n.serve = a.sb.s);
            var r, i = {
                data: t,
                extraData: e.extraData
            };
            return r = 25 == t.sid ? React.createElement(s.mainFeatureEvent.dartsContent, {
                data: i
            }) : React.createElement(s.mainFeatureEvent.content, {
                data: i
            }), React.createElement("div", {
                className: "radius bg-c-1 pd-6 mainEvent" + (0 == e.extraData.topBannerH ? "" : " mg-t-10")
            }, React.createElement(s.mainFeatureEvent.header, {
                data: n
            }), r)
        }
    }), s.mainFeatureEvent.header = React.createClass({
        displayName: "header",
        mixins: [s.Utility.timer, s.Utility.tv, s.Utility.naming],
        render: function () {
            var e, t = this.props.data,
                a = t.isInplay,
                c = t.cds,
                n = t.hs,
                r = t.as,
                i = t.showExtraTime;
            i && (e = React.createElement(s.mainFeatureEvent.header.extraTime, {
                data: {
                    hs: t.fhs,
                    as: t.fas
                }
            }));
            var o;
            18 == t.sid && a && c && t.cricketScore && (o = React.createElement(s.mainFeatureEvent.header.cricketscore, {
                score: t.cricketScore
            }));
            var d;
            t.isNeutral && (d = React.createElement(s.neutralIcon, null));
            var m, p, h, u, E, R, g, f, v, N;
            if (t.showTV && (f = React.createElement("div", {
                    className: "icon-TV2 ft-c-18 dsp-iblk fts-13",
                    onClick: this._playTV,
                    title: a ? l.LP_LiveStreamInplay : l.LP_LiveStream
                })), a) {
                if (m = React.createElement("div", {
                        className: "ft-c-14 live dsp-iblk" + (null == f ? "" : " mg-r-6")
                    }, l.LiveText), t.isns || 21 == t.sid) {
                    var b = this._getBestOfLocalization(t.nspt);
                    u = React.createElement("span", {
                        className: "ft-c-18 fts-12 time"
                    }, _.contains(l.LiveText, b) ? "" : b)
                } else {
                    var y = t.period,
                        k = "" == t.time ? "" : t.time;
                    y && (p = React.createElement("span", {
                        className: "ft-c-18 time fts-" + (null != k && "" != k ? 12 : 15)
                    }, y + " ")), k && 18 != t.sid && (h = "" == k || 2 == t.sid ? React.createElement("span", {
                        className: "ft-c-3 time fts-12"
                    }, k) : 14 == t.sid ? React.createElement("span", {
                        className: "ft-c-3 time fts-12"
                    }, k.split(":")[0] + "'") : React.createElement(s.sport.iptime, {
                        canTick: utility.canTick(t.sid),
                        data: {
                            class: "ft-c-3 time fts-12",
                            t: k
                        }
                    }))
                }
                4 == t.sid && ("" == t.period || isNaN(+t.serve) ? c = !1 : (m = React.createElement(s.sport.baseBallPeriod, {
                    showinInplay: !1,
                    hasTV: null != f,
                    data: {
                        cp: t.period,
                        s: t.serve
                    }
                }), h = null, p = null)), null == p && null == u || (N = React.createElement("div", {
                    className: "div-lineHeight-lv1 mg-t-3"
                }, p, h, u))
            } else {
                var P = t.date,
                    S = t.startTime;
                null != P && "" != P && (E = React.createElement("span", {
                    className: "ft-c-18 fts-12 time"
                }, P)), R = React.createElement("span", {
                    className: "ft-c-3 time fts-" + (null != P && "" != P ? 12 : 15)
                }, " " + S), N = React.createElement("div", {
                    className: "div-lineHeight-lv1" + (null == f ? "" : " mg-t-4")
                }, E, R)
            }
            return g = c && !this._noShowScoreLine() ? n + " - " + r : "v", null == m && null == f || (v = React.createElement("div", {
                className: "div-lineHeight-lv1"
            }, m, f)), React.createElement("div", {
                className: "mainevent-header cr-pointer " + (i ? "extra-time" : ""),
                onClick: this._gotoAMPage
            }, React.createElement("table", {
                className: "tb-mainEventHeader bg-c-10 radius border_lv4"
            }, React.createElement("colgroup", null, React.createElement("col", null), React.createElement("col", {
                className: "col-fixedHeaderRight"
            })), React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", null, React.createElement("div", {
                className: "ft-c-3 pd-t-2 pd-b-2 pd-l-10 pd-r-10 dsp-iblk fts-12 "
            }, React.createElement("div", {
                className: "fts-13 ft-c-18"
            }, t.cn), React.createElement("div", {
                className: "fts-15 pos-relative lht-1p1"
            }, React.createElement("span", {
                className: "dsp-iblk t-va-m"
            }, t.ht), React.createElement("span", {
                className: "ft-c-14 mg-l-10 mg-r-10 t-va-m dsp-iblk"
            }, g), React.createElement("span", {
                className: "dsp-iblk t-va-m"
            }, t.at), d))), React.createElement("td", {
                className: "ft-c-3  fts-12 pd-r-10 t-a-r pd-t-2"
            }, v, N)))), e, o)
        },
        _gotoAMPage: function () {
            Action.LoadSite(this.props.data.url)
        },
        _noShowScoreLine: function () {
            return this.props.data.isns || _.contains([18, 25], this.props.data.sid)
        }
    }), s.mainFeatureEvent.header.extraTime = React.createClass({
        displayName: "extraTime",
        render: function () {
            var e, t = this.props.data,
                a = t.multipleLine;
            "" != t.hs && "" != t.as && (e = React.createElement("div", {
                key: "mfe_h_ex_r",
                className: "ft-c-3" + (a ? "" : " float-right")
            }, l.OddsPage_Page_FT_RESULT + " (" + t.hs + "-" + t.as + ")"));
            var c = React.createElement("div", {
                    key: "mfe_h_ex_t",
                    className: a ? "" : "left"
                }, l.OddsPage_Page_ET_MSG),
                s = a ? [c, e] : [e, c];
            return React.createElement("div", {
                className: "et-header radius bg-c-42 ft-c-35 fts-12 pd-t-5 pd-b-5 pd-r-10 pd-l-10 pd-r-10 border_lv5"
            }, s)
        }
    }), s.mainFeatureEvent.header.cricketscore = React.createClass({
        displayName: "cricketscore",
        render: function () {
            var e = this.props.score;
            return React.createElement("div", {
                className: "ft-c-16 fts-13 pd-t-6 pd-l-10"
            }, this._getScore(e.gt, e.sb))
        },
        _getScore: function (e, t) {
            var a = 13 == e ? "i1" : t.cp,
                l = _.first(_.filter(t.ps, "p", a));
            return "1" == t.s ? l.h + "-" + l.hw : l.a + "-" + l.aw
        }
    }), s.mainFeatureEvent.content = React.createClass({
        displayName: "content",
        mixins: [s.Utility.odds, s.Utility.link, s.Utility.pnc, s.Utility.naming, s.Utility.feContent],
        render: function () {
            var e, t, a, c = this.props.data,
                n = c.data,
                r = n.c.e[0],
                i = (c.hlo, c.isEuroOdds, n.ip),
                d = (this._getBaseOddsProp(r, i), {
                    n: r.i[0]
                }),
                m = {
                    n: r.i[1]
                },
                p = [],
                h = [],
                u = this._getMarketLinesByRegionAndSport(n.rd, n.sid),
                E = this._needBlackTeamName,
                R = this._genOddsItem,
                g = this._getOddsItems;
            null != r.o && _.forEach(u, function (l, c) {
                null == l ? (p.push(React.createElement("td", {
                    key: "mfe_t_" + l,
                    className: "odds-large t-a-r"
                })), h.push(React.createElement("td", {
                    key: "mfe_m_" + l,
                    className: "odds-large pd-t-5 t-a-r"
                }))) : (a = r.o[l], "1x2" == l && (e = []), a ? ("ah" == l && (d.black = E(a[1]), m.black = E(a[3])), t = g(l, r), p.push(R(t[0], l, !0)), h.push(R(t["1x2" == l ? 2 : 1], l, !1)), "1x2" == l && e.push(R(t[1], l, !1))) : (p.push(React.createElement("td", {
                    key: "mfe_t_" + l,
                    className: "odds-large t-a-r"
                }, React.createElement(s.sport.oddsEmpty, null))), h.push(React.createElement("td", {
                    key: "mfe_m_" + l,
                    className: "odds-large pd-t-5 t-a-r"
                }, React.createElement(s.sport.oddsEmpty, null))), "1x2" == l && e.push(React.createElement("td", {
                    key: "mfe_b_" + l,
                    className: "odds-large pd-t-5 t-a-r"
                }, React.createElement(s.sport.oddsEmpty, null)))))
            });
            var f;
            "1X2" != n.rd && 14 != n.sid || (f = React.createElement("div", {
                className: "ft-c-21 t-a-l"
            }, l.Odds_Draw));
            var v, N, b = {
                morebetcount: r.i[32],
                url: this._getMorebetLink(r.cei.ctid == o.pacType.par ? r.k : r.pk, n.ip ? VIEW.INPLAY : VIEW.PRESTART, r.i[36])
            };
            1 == n.sid && this._displayChildTag(r.cei.ctid) && (N = React.createElement("div", {
                className: "ft-c-5 float-right mg-r-6"
            }, this._getChildTag(r.cei.ctid)));
            var y, k;
            if (e) 2 != n.dv ? (b.isMin = !0, v = React.createElement(s.sport.morebet, {
                data: b
            }), e.push(React.createElement("td", {
                className: "odds-large t-a-r pd-t-5"
            }, v))) : e.push(React.createElement("td", null));
            else {
                var P;
                2 != n.dv && (b.isMin = !1, v = React.createElement(s.sport.morebet, {
                    data: b
                }), e = React.createElement("td", {
                    colSpan: "2",
                    className: "t-a-r pd-t-5"
                }, v))
            }
            var P;
            n.isNetSports && null != r.sb && (P = [], _.forEach(r.sb.ps, function (e, t) {
                var a = "mfe_ns_" + r.k + "_" + t;
                P.push(React.createElement(s.sport.score.netSport.scoreItem, {
                    key: a,
                    data: e
                }))
            }));
            var k;
            null != P ? k = React.createElement("td", {
                className: "td-score ft-c-23 fts-13 t-a-l",
                colSpan: "2"
            }, P) : null == N && null == f && null == e || (k = React.createElement("td", {
                colSpan: "2"
            }, N, f)), null == k && null == e || (y = React.createElement("tr", null, k, e));
            var S, M;
            if (!n.ip && null != r.o && null != r.o.eps && null != r.o.eps.o && r.o.eps.o.length > 0) {
                var w = {
                    baseProps: this._getBaseOddsProp(r, i),
                    oddsItems: this._getOddsItems("eps", r),
                    url: b.url,
                    n: r.o.eps.n
                };
                S = React.createElement(s.mainFeatureEvent.eps, {
                    data: w
                })
            }
            var C;
            if (2 == n.dv && null != r.o) {
                if (M = null == M ? this._getBaseOddsProp(r, i) : M, 1 == n.sid) {
                    var T, L, x, I = "HDP" == n.rd ? "1x2" : "ou";
                    if (null != r.o[I] || null != r.o.bts) {
                        "ou" == I && r.cei.ctid == o.pacType.pelAH && (M.evtid = r.ouId);
                        var A = {
                            l: {
                                key: I,
                                data: this._getOddsProps(M, r, I)
                            },
                            r: {
                                key: "bts",
                                data: r.cei.ctid == o.pacType.par ? this._getOddsProps(M, r, "bts") : null
                            }
                        };
                        T = React.createElement(s.mainFeatureEvent.content.oddsRow_twoMarketLine, {
                            key: "mfe_mo_bt",
                            data: A
                        })
                    }
                    if (null == r.o.cs || r.cei.ctid != o.pacType.par && r.cei.ctid != o.pacType.et || (L = React.createElement(s.mainFeatureEvent.content.oddsRow_cs, {
                            key: "mfe_mo_cs",
                            data: this._getOddsProps(M, r, "cs")
                        })), r.cei.ctid != o.pacType.toQualify && r.cei.ctid != o.pacType.winner) {
                        var O = _.find(r.cel, function (e) {
                            return e.cei.ctid == window.o.pacType.toQualify || e.cei.ctid == window.o.pacType.winner
                        });
                        if (null != O && null != O.o && null != O.o.ah) {
                            var B = this._getOddsProps(M, O, "ah");
                            B.oddsItems[0].chdp = "", B.oddsItems[1].chdp = "", B.ctid = O.cei.ctid, B.hn = r.i[0], B.an = r.i[1], B.mn = this._getChildMarketLineName("ah", O.cei.ctid, 1, O.cei.n), B.baseOddsProps.evtid = O.k, B.baseOddsProps.parentEventId = O.pk, B.baseOddsProps.score = r.i[10] + ":" + r.i[11], x = React.createElement(s.mainFeatureEvent.content.oddsRow_singleMarketLine, {
                                key: "mfe_mo_ch",
                                data: B
                            })
                        }
                    }
                    C = [T, L, x]
                } else if (2 == n.sid) {
                    var D, U;
                    if (null != r.o.ml) {
                        var F = this._getOddsProps(M, r, "ml");
                        F.hn = r.i[0], F.an = r.i[1], F.mn = this._getMarketLineName("ml", r.cei.ctid, 2), D = React.createElement(s.mainFeatureEvent.content.oddsRow_singleMarketLine, {
                            key: "mfe_mo_ml",
                            data: F
                        })
                    }
                    if (null != r.o.t1ou || null != r.o.t2ou) {
                        var H = {
                            l: {
                                key: "ou",
                                data: this._getOddsProps(M, r, "t1ou")
                            },
                            r: {
                                key: "ou",
                                data: this._getOddsProps(M, r, "t2ou")
                            }
                        };
                        H.l.data.betType = "ou", H.r.data.betType = "ou";
                        var W = _.find(r.cel, function (e) {
                            return e.cei.ctid == window.o.pacType.teamPointT1
                        });
                        null != W && (H.l.data.ctid = W.cei.ctid, H.l.data.childName = W.cei.n, H.l.data.baseOddsProps.evtid = W.k, H.l.data.baseOddsProps.parentEventId = W.pk);
                        var V = _.find(r.cel, function (e) {
                            return e.cei.ctid == window.o.pacType.teamPointT2
                        });
                        null != V && (H.r.data.ctid = V.cei.ctid, H.r.data.childName = V.cei.n, H.r.data.baseOddsProps.evtid = V.k, H.r.data.baseOddsProps.parentEventId = V.pk), null != W && null != V && (U = React.createElement(s.mainFeatureEvent.content.oddsRow_twoMarketLine, {
                            key: "mfe_mo_ch",
                            data: H
                        }))
                    }
                    C = [D, U]
                }
                b = {
                    txt: l.HP_AllMarkets + " " + r.i[32],
                    url: this._getMorebetLink(r.cei.ctid == o.pacType.par ? r.k : r.pk, n.ip ? VIEW.INPLAY : VIEW.PRESTART, r.i[36]),
                    top: 10
                }, v = React.createElement(s.rightPanel.morebet, {
                    key: "mfe_mo_mb",
                    data: b
                }), C.push(v)
            }
            var z, G = n.isNetSports ? this._getOddsTitleForNetSport() : this._getOddsTitleByRegionAndSport(n.rd, n.sid);
            n.idm && "" != n.msg && (z = React.createElement(s.mainFeatureEvent.content.message, {
                msg: n.msg
            }));
            var X;
            return y || (X = React.createElement("div", {
                className: "pd-tb-10"
            })), React.createElement("div", {
                className: "mg-t-6 oddsContainer"
            }, React.createElement("table", {
                className: "tb-mainEvent odds-large"
            }, React.createElement("colgroup", null, React.createElement("col", {
                className: "col-fixedPicture"
            }), React.createElement("col", null)), React.createElement("tbody", {
                className: "hovertby fts-13",
                onClick: this._linkToAMPage.bind(this, b.url)
            }, React.createElement("tr", null, React.createElement("td", {
                className: "fixedPicture t-a-l lht-0p7"
            }, React.createElement(s.mainFeatureEvent.img, {
                disable: !0,
                src: n.img
            })), React.createElement("td", {
                className: "t-va-bot"
            }, React.createElement("table", {
                className: "odds-large width-100p cr-pointer"
            }, React.createElement("colgroup", null, React.createElement("col", null), React.createElement("col", {
                className: "col-fixedRedcard"
            }), React.createElement("col", {
                className: "col-fixedodds"
            }), React.createElement("col", {
                className: "col-fixedodds"
            })), React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", null), React.createElement("td", null), React.createElement("td", {
                className: "fts-11 t-a-c ft-c-23 pd-l-8 pd-b-8"
            }, G[0]), React.createElement("td", {
                className: "fts-11 t-a-c ft-c-23 pd-l-8 pd-b-8"
            }, G[1])), React.createElement("tr", {
                className: d.black ? "home" : ""
            }, React.createElement("td", {
                className: "td-teameName t-a-l"
            }, React.createElement(s.sport.team, {
                data: d
            })), React.createElement(s.mainFeatureEvent.content.redCard, {
                num: r.i[8]
            }), p), React.createElement("tr", {
                className: m.black ? "home" : ""
            }, React.createElement("td", {
                className: "td-teameName t-a-l"
            }, React.createElement(s.sport.team, {
                data: m
            })), React.createElement(s.mainFeatureEvent.content.redCard, {
                num: r.i[9]
            }), h), y)), X)))), S, C, z)
        },
        _getOddsTitleByRegionAndSport: function (e, t) {
            if (18 == t) return [null, l.Odds_Winner];
            if (14 == t) return [l.Odds_1X2, l.Odds_Hdp];
            switch (e) {
                case "HDP":
                    return [l.Odds_Hdp, l.Odds_OU_Short];
                case "1X2":
                    return [l.Odds_1X2, l.Odds_Hdp];
                case "ML":
                    return [l.Odds_MoneyLine, l.Odds_Hdp];
                default:
                    return []
            }
        },
        _getOddsTitleForNetSport: function () {
            return [l.Odds_Winner, AllMarketUtility.isTableTennisOrBadmintion(this.props.data.data.sid) ? l.MB_GameHDC : l.MB_SetHDC]
        },
        _getMarketLinesByRegionAndSport: function (e, t) {
            if (18 == t) return [null, "ml"];
            if (14 == t) return ["1x2", "ah"];
            switch (e) {
                case "HDP":
                    return ["ah", "ou"];
                case "1X2":
                    return ["1x2", "ah"];
                case "ML":
                    return ["ml", "ah"];
                default:
                    return []
            }
        }
    }), s.mainFeatureEvent.dartsContent = React.createClass({
        displayName: "dartsContent",
        mixins: [s.Utility.odds, s.Utility.link, s.Utility.pnc, s.Utility.naming, s.Utility.feContent],
        render: function () {
            var e = this.props.data.data,
                t = e.c.e[0],
                a = t.i,
                c = t,
                n = {
                    data: this._getBaseOddsProp(t, e.ip)
                };
            n.data.o = _.fill(Array(3), null);
            var r = _.fill(Array(3), n),
                i = this.props.data.extraData.odds.hlo;
            t.o.win ? (_.map(t.o.win, function (e, t) {
                var a = {
                    sid: e[1].toString().substring(1),
                    ignoreHDP: !0,
                    odds: e[2],
                    o: e
                };
                _.contains(i, a.sid) && (a.isHL = !0), r[t] = {
                    data: _.assign({}, r[t].data, a)
                }, r[t] = React.createElement(s.mainFeatureEvent.singleOdds, r[t])
            }), 1 == t.o.win.length && (r[1] = React.createElement(s.sport.oddsEmpty, null))) : r = _.fill(Array(2), React.createElement(s.sport.oddsEmpty, null));
            var d, m = {
                morebetcount: a[32],
                url: this._getMorebetLink(t.cei.ctid == o.pacType.par ? t.k : t.pk, e.ip ? VIEW.INPLAY : VIEW.PRESTART, t.i[36]),
                isMin: t.o.win && 3 == t.o.win.length
            };
            if (!e.ip && null != c.o && null != c.o.eps && null != c.o.eps.o && c.o.eps.o.length > 0) {
                var p = {
                    baseProps: this._getBaseOddsProp(c, e.ip),
                    oddsItems: this._getOddsItems("eps", c),
                    url: m.url,
                    n: c.o.eps.n
                };
                d = React.createElement(s.mainFeatureEvent.eps, {
                    data: p
                })
            }
            var h;
            return e.idm && "" != e.msg && (h = React.createElement(s.mainFeatureEvent.content.message, {
                msg: e.msg
            })), React.createElement("div", {
                className: "mg-t-10 oddsContainer"
            }, React.createElement("table", {
                className: "tb-mainEvent odds-large"
            }, React.createElement("colgroup", null, React.createElement("col", {
                className: "col-fixedPicture"
            }), React.createElement("col", null), React.createElement("col", {
                className: "col-fixedRedcard"
            }), React.createElement("col", {
                className: "col-fixedodds"
            }), React.createElement("col", {
                className: "col-fixedodds"
            })), React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", {
                className: "fixedPicture",
                rowSpan: "4"
            }, React.createElement(s.mainFeatureEvent.img, {
                src: e.img
            })), React.createElement("td", null), React.createElement("td", null), React.createElement("td", {
                className: "fts-12 t-a-c ft-c-23"
            }, l.Odds_Winner), React.createElement("td", {
                className: "fts-12 t-a-c ft-c-23"
            })), React.createElement("tr", null, React.createElement("td", {
                className: "td-teameName t-a-l"
            }, React.createElement("div", {
                className: "ft-c-21 ft-c-4 fts-13"
            }, a[0])), React.createElement("td", {
                className: "one t-a-c"
            }, React.createElement("div", {
                className: "redCard"
            }, React.createElement("div", {
                className: "icon-RedCard"
            }), React.createElement("div", {
                className: "icon-RedCard2"
            }), React.createElement("div", {
                className: "icon-RedCard3"
            }))), React.createElement("td", {
                className: "odds-large"
            }, r[0]), React.createElement("td", {
                className: "odds-large"
            })), React.createElement("tr", null, React.createElement("td", {
                className: "td-teameName t-a-l"
            }, React.createElement("div", {
                className: "ft-c-21 ft-c-4 fts-13"
            }, a[1])), React.createElement("td", {
                className: "one t-a-c"
            }, React.createElement("div", {
                className: "redCard"
            }, React.createElement("div", {
                className: "icon-RedCard"
            }), React.createElement("div", {
                className: "icon-RedCard2"
            }), React.createElement("div", {
                className: "icon-RedCard3"
            }))), React.createElement("td", {
                className: "odds-large"
            }, r[1]), React.createElement("td", {
                className: "odds-large"
            })), React.createElement("tr", {
                className: "moreBet"
            }, React.createElement("td", {
                className: "td-teameName t-a-l",
                colSpan: "2"
            }, React.createElement("div", {
                className: "ft-c-21 ft-c-4 fts-13"
            }, m.isMin ? l.Odds_Draw : "")), m.isMin ? React.createElement("td", {
                className: "odds-large"
            }, r[2]) : null, React.createElement("td", {
                className: "odds-large t-a-c",
                colSpan: m.isMin ? 1 : 2
            }, React.createElement(s.sport.morebet, {
                data: m
            }))))), d, h)
        }
    }), s.mainFeatureEvent.singleOdds = React.createClass({
        displayName: "singleOdds",
        mixins: [s.Utility.oddsBtn],
        render: function () {
            var e = this.props.data,
                t = e.o;
            return "0.00" == e.odds ? React.createElement(s.sport.oddsLock, {
                style: {
                    top: 10
                }
            }) : React.createElement("div", {
                className: "odds-container dsp-iblk"
            }, React.createElement("div", {
                className: classNames("OddsWrapper", {
                    selected: e.isHL
                })
            }, React.createElement("span", {
                onClick: this._addSelection,
                className: classNames("odds singleOdds", {
                    oddsUp: _.includes(e.oddsUp, e.sid),
                    oddsDown: _.includes(e.oddsDown, e.sid)
                })
            }, t[2])))
        }
    }), s.mainFeatureEvent.eps = React.createClass({
        displayName: "eps",
        render: function () {
            for (var e = this.props.data, t = [], a = 0; a < e.oddsItems.length && a < 2; a++) {
                var c = e.oddsItems[a],
                    n = {
                        n: c.n,
                        was: c.was,
                        oddsItem: _.assign({}, e.baseProps, c)
                    },
                    r = "fe_eps_" + c.sid;
                t.push(React.createElement(s.mainFeatureEvent.eps.selection, {
                    key: r,
                    data: n
                }))
            }
            return React.createElement("div", null, React.createElement("table", {
                className: "tb-eps mg-t-6 width-100p fts-13"
            }, React.createElement("colgroup", null, React.createElement("col", null), React.createElement("col", {
                className: "col-fixed65"
            }), React.createElement("col", {
                className: "col-fixed65"
            })), React.createElement("thead", {
                className: " ft-c-3  radius"
            }, React.createElement("tr", null, React.createElement("th", {
                className: "height-28 bg-c-4 radius-lt-lb t-a-l fontWeight-normal pd-l-10 rbr-c-1 tbr-c-18"
            }, e.n), React.createElement("th", {
                className: "height-28 ft-c-56 t-a-c bg-c-4 fontWeight-normal rbr-c-1"
            }, l.OP_Was), React.createElement("th", {
                className: "height-28 t-a-c  bg-c-4 radius-rt-rb fontWeight-normal tbr-c-18"
            }, l.OP_Now)))), React.createElement("table", {
                className: "tb-eps mg-t-6 width-100p fts-13"
            }, React.createElement("colgroup", null, React.createElement("col", null), React.createElement("col", {
                className: "col-fixed65"
            }), React.createElement("col", {
                className: "col-fixed65"
            })), React.createElement("tbody", null, t)), React.createElement("div", {
                className: "viewall lht-30 t-a-c fts-13 topBorder mg-t-5" + (e.oddsItems.length <= 2 ? " hidden" : ""),
                onClick: this._linkToAMP
            }, l.LP_View_All))
        },
        _linkToAMP: function (e) {
            Action.LoadSite(this.props.data.url, {
                showMoreEPS: !0
            }), e.preventDefault(), e.stopPropagation()
        }
    }), s.mainFeatureEvent.eps.selection = React.createClass({
        displayName: "selection",
        render: function () {
            var e = this.props.data;
            return React.createElement("tr", null, React.createElement("td", {
                className: "pd-0 height-30 pd-l-10"
            }, e.n), React.createElement("td", {
                className: "pd-0 t-a-c height-30"
            }, React.createElement("span", {
                className: "odds odds-last linethrough"
            }, e.was)), React.createElement("td", {
                className: "pd-0 t-a-c height-30"
            }, React.createElement(s.rightPanel.odds, {
                data: e.oddsItem
            })))
        }
    }), s.mainFeatureEvent.img = React.createClass({
        displayName: "img",
        render: function () {
            var e;
            if (null == this.props.src || "" == this.props.src) e = "/Public/Theme/Theme_Black/Images/SBK-default-banner.jpg";
            else {
                var t = window.location.protocol;
                e = this.props.src.replace(/^(http:|https:)/, t)
            }
            return React.createElement("img", {
                className: classNames({
                    "cr-pointer": !this.props.disable
                }),
                src: e,
                onClick: this._gotoAMPage
            })
        },
        _gotoAMPage: function () {
            this.props.url && Action.LoadSite(this.props.url)
        }
    }), s.mainFeatureEvent.content.oddsRow_twoMarketLine = React.createClass({
        displayName: "oddsRow_twoMarketLine",
        render: function () {
            var e = this.props.data,
                t = e.l,
                a = e.r,
                l = null == t.data ? React.createElement(s.mainFeatureEvent.content.oddsRow_emptyMarketLine, null) : React.createElement(s.rightPanel.eventForm.marketLines[t.key], {
                    data: t.data,
                    main: !0
                }, null),
                c = null == a.data ? React.createElement(s.mainFeatureEvent.content.oddsRow_emptyMarketLine, null) : React.createElement(s.rightPanel.eventForm.marketLines[a.key], {
                    data: a.data,
                    main: !0
                }, null);
            return React.createElement("table", {
                className: "tb-mainEvent mg-t-10"
            }, React.createElement("colgroup", null, React.createElement("col", {
                className: "col-50Percent"
            }), React.createElement("col", {
                className: "col-50Percent"
            })), React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", {
                className: "rightBorder pd-r-10"
            }, l), React.createElement("td", {
                className: "pd-l-10"
            }, c))))
        }
    }), s.mainFeatureEvent.content.oddsRow_emptyMarketLine = React.createClass({
        displayName: "oddsRow_emptyMarketLine",
        render: function () {
            return React.createElement("table", {
                className: "tb-mainEvent-sub"
            }, React.createElement("colgroup", null, React.createElement("col", {
                className: "col-50Percent"
            }), React.createElement("col", {
                className: "col-50Percent"
            })), React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", {
                colSpan: "2",
                className: "t-a-l"
            }, React.createElement("div", {
                className: "tb-mainEvent-sub-title fts-13 bg-c-27 radius ft-c-4 height-15"
            }))), React.createElement("tr", null, React.createElement("td", {
                className: "t-a-l pd-tb-10 pd-l-10 height-26"
            }), React.createElement("td", {
                className: "t-a-r pd-tb-10 height-26"
            }))))
        }
    }), s.mainFeatureEvent.content.oddsRow_cs = React.createClass({
        displayName: "oddsRow_cs",
        mixins: [s.Utility.naming],
        render: function () {
            var e = this.props.data,
                t = e.oddsItems,
                a = e.baseOddsProps,
                l = [],
                c = this._filterOutZeroOdds;
            a.isInplay ? _.forEach(t, function (e, t) {
                l.push(_.filter(e, c))
            }) : l = t;
            var n = 0 == e.ctid ? this._getMarketLineName("cs", e.ctid, e.sid) : this._getChildMarketLineName("cs", e.ctid, e.sid, e.childName);
            return React.createElement("table", {
                className: "tb-mainEvent mg-t-10"
            }, React.createElement("colgroup", null, React.createElement("col", {
                className: "col-19Percent"
            }), React.createElement("col", {
                className: "col-19Percent"
            }), React.createElement("col", {
                className: "col-22Percent"
            }), React.createElement("col", {
                className: "col-19Percent"
            }), React.createElement("col", {
                className: "col-19Percent"
            })), React.createElement("tbody", {
                className: "fts-13"
            }, React.createElement("tr", null, React.createElement("td", {
                colSpan: "5",
                className: "pd-0 "
            }, React.createElement("div", {
                className: "mg-b-10"
            }, React.createElement(s.rightPanel.marketLineTitle, {
                n: n
            })))), this._genRow(l[0], l[1], l[2], a)))
        },
        _filterOutZeroOdds: function (e) {
            return null != e && null != e.odds && "0.00" != e.odds
        },
        _genRow: function (e, t, a, l) {
            for (var c = [], s = this._genOdds, n = [], r = [], i = [], o = [], d = l.isInplay ? 3 : Math.max(Math.floor(e.length / 2), t.length, Math.floor(a.length / 2)), m = 0; m < e.length; m++) m % 2 == 0 ? n.push(e[m]) : r.push(e[m]);
            for (var p = 0; p < a.length; p++) p % 2 == 0 ? i.push(a[p]) : o.push(a[p]);
            for (var h = 0; h < d; h++) {
                var u = n[h],
                    E = r[h],
                    R = t[h],
                    g = i[h],
                    f = o[h];
                c.push(React.createElement("tr", {
                    key: "m_cs_r" + h
                }, s(u, "t-a-l pd-tb-10 pd-l-10", l), s(E, "t-a-c pd-tb-10", l), s(R, "t-a-c pd-tb-10 rightBorder leftBorder", l), s(g, "t-a-c pd-tb-10", l), s(f, "t-a-r pd-tb-10", l)))
            }
            return c
        },
        _genOdds: function (e, t, a) {
            if (!a.isInplay || null != e && "0.00" != e.odds) {
                var l;
                return l = null != e && "0.00" != e.odds ? React.createElement(s.rightPanel.odds, {
                    data: _.assign({}, a, e)
                }) : React.createElement("span", {
                    className: "odds v-hidden"
                }), React.createElement("td", {
                    className: t
                }, React.createElement("span", {
                    className: "mg-r-6 ft-c-16"
                }, null != e ? e.n : ""), l)
            }
            return React.createElement("td", {
                className: t
            })
        }
    }), s.mainFeatureEvent.content.oddsRow_singleMarketLine = React.createClass({
        displayName: "oddsRow_singleMarketLine",
        render: function () {
            var e = this.props.data,
                t = e.oddsItems,
                a = e.baseOddsProps;
            return React.createElement("table", {
                className: "tb-mainEvent mg-t-10 layout-BTTS"
            }, React.createElement("colgroup", null, React.createElement("col", {
                className: "col-50Percent"
            }), React.createElement("col", {
                className: "col-50Percent"
            })), React.createElement("tbody", {
                className: "fts-13"
            }, React.createElement("tr", null, React.createElement("td", {
                colSpan: "2",
                className: "pd-0"
            }, React.createElement(s.rightPanel.marketLineTitle, {
                n: e.mn
            }))), React.createElement("tr", null, React.createElement("td", {
                className: "t-a-l pd-tb-10 pd-l-10"
            }, React.createElement(s.rightPanel.odds, {
                data: _.assign({
                    isRight: !0
                }, a, t[0])
            }), React.createElement("span", {
                className: "ft-c-4 sp-teamName mg-t-2 dsp-iblk"
            }, e.hn)), React.createElement("td", {
                className: "t-a-l pd-tb-10 pd-l-10"
            }, React.createElement(s.rightPanel.odds, {
                data: _.assign({
                    isRight: !0
                }, a, t[1])
            }), React.createElement("span", {
                className: "ft-c-4 sp-teamName mg-t-2 dsp-iblk"
            }, e.an)))))
        }
    }), s.mainFeatureEvent.content.redCard = React.createClass({
        displayName: "redCard",
        render: function () {
            var e, t = ["1", "2", "3"];
            return _.includes(t, this.props.num) && (e = React.createElement("div", {
                className: "redCard"
            }, React.createElement("div", {
                className: "icon-RedCard"
            }), React.createElement("div", {
                className: "icon-RedCard2"
            }), React.createElement("div", {
                className: "icon-RedCard3"
            }))), React.createElement("td", {
                className: "t-a-c rc" + this.props.num
            }, e)
        }
    }), s.mainFeatureEvent.content.message = React.createClass({
        displayName: "message",
        render: function () {
            return React.createElement("div", {
                className: "bg-c-53 pd-t-6" + (this.props.pdb ? " pd-b-6" : "")
            }, React.createElement("div", {
                className: "radius bg-c-54 pd-l-10 pd-r-10 pd-t-8 pd-b-7 fts-13 t-a-l ft-c-57 lht-15"
            }, this.props.msg))
        }
    }), s.secondaryFeatureEvent = React.createClass({
        displayName: "secondaryFeatureEvent",
        render: function () {
            var e = this.props.data,
                t = [];
            return _.forEach(e.data, function (a, l) {
                var c = {
                    data: a,
                    extraData: e.extraData,
                    index: l
                };
                if (1 == a.t) {
                    var n;
                    n = 25 == a.sid ? React.createElement(s.secondaryFeatureEvent.dartsEventForm, {
                        key: "fe_" + l,
                        data: c
                    }) : React.createElement(s.secondaryFeatureEvent.eventForm, {
                        key: "fe_" + l,
                        data: c
                    }), t.push(n)
                } else 2 == a.t && a.isEpm ? t.push(React.createElement(s.secondaryFeatureEvent.epmForm, {
                    key: "rfe_" + a.spid,
                    data: c
                })) : 2 != a.t || a.isEpm ? 3 == a.t && t.push(React.createElement(s.secondaryFeatureEvent.competitionForm, {
                    key: "fe_" + l,
                    data: c
                })) : t.push(React.createElement(s.secondaryFeatureEvent.outrightForm, {
                    key: "rfe_" + a.spid,
                    data: c
                }))
            }), React.createElement("div", {
                className: "radius bg-c-1 pd-6 mg-t-10 featureEvent"
            }, React.createElement("div", {
                className: "featureEvent-header"
            }, React.createElement("div", {
                className: "bg-c-48 radius ft-c-3 fts-16 pd-l-10 pd-r-10 fontWeight-bold pd-t-11 pd-b-11"
            }, l.HP_FeatureEvent)), React.createElement("div", null, t))
        }
    }), s.secondaryFeatureEvent.eventForm = React.createClass({
        displayName: "eventForm",
        mixins: [s.Utility.odds, s.Utility.pnc, s.Utility.link, s.Utility.tv, s.Utility.naming],
        render: function () {
            var e, t = this.props.data,
                a = t.data,
                c = a.c.e[0],
                n = (t.hlo, t.index);
            "" != c.i[7] && (e = React.createElement("div", {
                onClick: this._playTV,
                className: "icon-TV2 dsp-iblk"
            }));
            var r, i = a.ip;
            i && (r = React.createElement("div", {
                className: "live dsp-iblk" + (null == e ? "" : " mg-r-10")
            }, l.LiveText), 4 == a.sid && "True" == c.i[38] && c.sb && (r = null));
            var d;
            1 == a.sid && this._displayChildTag(c.cei.ctid) && (d = React.createElement("div", {
                className: "dsp-iblk ft-c-5" + (null == e && null == r ? "" : " mg-r-10")
            }, this._getChildTag(c.cei.ctid)));
            var m = a.isNetSports,
                p = this._canDisplayScore(c, a.sid, a.cds),
                h = {
                    hn: c.i[0],
                    an: c.i[1]
                };
            if (4 != a.sid && 14 != a.sid || (p = c.i[38], 4 == a.sid && (p = p && c.sb)), p && (h.hs = c.i[10], h.as = c.i[11]), "HDP" == a.rd && c.o && c.o.ah) {
                h.hb = this._needBlackTeamName(c.o.ah[1]), h.ab = this._needBlackTeamName(c.o.ah[3]);
                (25 == a.sid || 14 == a.sid) && (h.hb = !1, h.ab = !1)
            }
            var u;
            m && i && null != c.sb && (u = React.createElement("tr", null, React.createElement("td", {
                colSpan: "6",
                className: "pd-b-10 pd-r-6 ft-c-21 t-a-l"
            }, React.createElement(s.rightPanel.eventForm.netSportScore, {
                data: {
                    sb: c.sb,
                    eid: c.k,
                    sid: a.sid
                }
            }))));
            var E = "1X2" == a.rd || 25 == a.sid || 14 == a.sid,
                R = this._getOddsByRegion(a.rd, c, a.sid),
                g = [];
            if (null == R) g.push(React.createElement("td", {
                key: c.k + "_empty1",
                className: "pd-t-6 pd-b-6"
            }, React.createElement(s.sport.oddsEmpty, null))), g.push(React.createElement("td", {
                key: c.k + "_empty2",
                className: "pd-t-6 pd-b-6"
            }, React.createElement(s.sport.oddsEmpty, null))), E && g.push(React.createElement("td", {
                key: c.k + "_empty3",
                className: "pd-t-6 pd-b-6"
            }, React.createElement(s.sport.oddsEmpty, null)));
            else {
                E || 14 == a.sid ? (R[0].hdp = "1", R[1].hdp = "X", R[2].hdp = "2") : "ML" != a.rd && 18 != a.sid || (R[0].hdp = "1", R[1].hdp = "2");
                var f = this._getBaseOddsProp;
                _.forEach(R, function (e) {
                    if (0 == e.odds) g.push(React.createElement("td", {
                        key: e.sid,
                        className: "pd-t-6 pd-b-6"
                    }, React.createElement(s.sport.oddsLock, null)));
                    else {
                        var t = _.assign({
                            ignoreHDP: "HDP" != a.rd || 18 == a.sid || 14 == a.sid
                        }, f(c, i), e);
                        g.push(React.createElement("td", {
                            key: e.sid,
                            className: "pd-t-6 pd-b-6"
                        }, React.createElement(s.sport.odds, {
                            data: t
                        })))
                    }
                })
            }
            var v = {
                    morebetcount: c.i[32],
                    url: this._getMorebetLink(c.cei.ctid == o.pacType.par ? c.k : c.pk, a.ip ? VIEW.INPLAY : VIEW.PRESTART, c.i[36]),
                    isMin: !0
                },
                N = React.createElement(s.sport.morebet, {
                    data: v
                }),
                b = {
                    isInplay: i,
                    sid: a.sid
                };
            if (i) {
                if (b.showScore = p, b.period = c.i[31], b.time = HP_Store.initTimerString(c.i[5]), 18 == a.sid && null != c.sb && (c.sb.cp = 13 == c.i[37] ? "i1" : c.sb.cp, b.period = c.sb.cp, null != c.sb.ps && c.sb.ps.length > 0)) {
                    var y = _.filter(c.sb.ps, "p", c.sb.cp)[0];
                    b.h = "1" == c.sb.s ? y.h : y.a, b.a = "1" == c.sb.s ? y.hw : y.aw
                }
            } else b.edt = c.edt;
            var k;
            if (m && i) {
                var P;
                null != c.sb && (P = React.createElement("div", null, this._getNetSportPeriod(c.sb.cp, this.props.data.data.sid))), k = React.createElement("td", {
                    className: "ft-c-23"
                }, P), h = $.extend(h, {
                    hs: null,
                    as: null
                })
            } else if (4 == a.sid && i) {
                var S;
                c.sb && (S = React.createElement(s.sport.baseBallPeriod, {
                    showinInplay: !0,
                    hasTV: !1,
                    data: {
                        cp: c.sb.cp,
                        s: c.sb.s
                    }
                })), k = React.createElement("td", {
                    className: "ft-c-59 t-a-c"
                }, S)
            } else k = 21 == a.sid && i ? React.createElement("td", {
                className: "ft-c-23 t-a-c"
            }, c.i[37] > 0 ? this._getBestOfLocalization(c.i[37]) : null) : React.createElement(s.sport.periodAndTime, {
                data: b
            });
            var M, w = 6;
            "1X2" != a.rd && 14 != a.sid || (M = React.createElement("col", {
                className: "col-fixedodds"
            }), w = 7);
            var C;
            this._displayExtraTimeHeader(c) && 1 == a.sid && (C = React.createElement("tr", null, React.createElement("td", {
                colSpan: w,
                className: "t-a-l"
            }, React.createElement(s.mainFeatureEvent.header.extraTime, {
                data: {
                    hs: c.i[33],
                    as: c.i[34]
                }
            }))));
            var T;
            !a.ip && null != c.o && null != c.o.eps && null != c.o.eps.o && c.o.eps.o.length > 0 && (T = React.createElement("tr", null, React.createElement("td", {
                colSpan: w,
                className: "t-a-l"
            }, React.createElement(s.secondaryFeatureEvent.eps, {
                pdt: !0,
                url: v.url
            }))));
            var L;
            a.idm && "" != a.msg && (L = React.createElement("tr", null, React.createElement("td", {
                colSpan: w,
                className: "t-a-l"
            }, React.createElement(s.mainFeatureEvent.content.message, {
                pdb: !0,
                msg: a.msg
            }))));
            return "N" == c.g && React.createElement(s.neutralIcon, null), React.createElement("table", {
                className: "tb-featureEvent odds-large t-a-c odds-large secondary min " + (n > 0 ? " topBorder" : "")
            }, React.createElement("colgroup", null, React.createElement("col", {
                className: "col-eventImage"
            }), React.createElement("col", null), React.createElement("col", {
                className: "col-fixed45"
            }), React.createElement("col", {
                className: "col-fixedodds"
            }), M, React.createElement("col", {
                className: "col-fixedodds"
            }), React.createElement("col", {
                className: "col-fixed51"
            })), React.createElement("tbody", {
                className: "fts-13 selection hovertby\tcr-pointer"
            }, React.createElement("tr", null, React.createElement("td", {
                colSpan: w,
                className: "pd-b-3"
            })), C, React.createElement("tr", {
                className: "ft-c-16 height-24"
            }, React.createElement("td", {
                className: "td-eventImage",
                rowSpan: "2"
            }, React.createElement(s.mainFeatureEvent.img, {
                src: a.img,
                url: v.url
            })), React.createElement("td", {
                className: "t-a-l pd-l-10 pd-t-5 pd-b-2 lht-0p9",
                colSpan: "3"
            }, a.c.n), React.createElement("td", {
                colSpan: null == M ? 2 : 3,
                className: "t-a-r pd-t-5 pd-r-10"
            }, React.createElement("div", {
                className: "div-lineHeight-lv1 ft-c-21 fts-12"
            }, d, r, e))), React.createElement("tr", null, React.createElement("td", {
                className: "t-a-l pd-l-10",
                onClick: this._gotoAMPage.bind(this, v.url)
            }, React.createElement(s.sport.scoreAndTeamName, {
                data: h
            })), k, g, React.createElement("td", {
                className: "t-a-r"
            }, N)), u, T, L))
        },
        _gotoAMPage: function (e) {
            Action.LoadSite(e)
        },
        _canDisplayScore: function (e, t, a) {
            var l = [2, 3, 4, 9, 13, 14, 20, 18, 25];
            return 18 != t && (e && _.contains(l, t) ? "True" == e.i[38] : a)
        }
    }), s.secondaryFeatureEvent.dartsEventForm = React.createClass({
        displayName: "dartsEventForm",
        mixins: [s.Utility.odds, s.Utility.pnc, s.Utility.link, s.Utility.tv, s.Utility.naming],
        render: function () {
            var e, t, a = this.props.data,
                c = a.data,
                n = c.c.e[0],
                r = n.i,
                i = (a.hlo, a.index, {
                    morebetcount: n.i[32],
                    url: this._getMorebetLink(n.cei.ctid == o.pacType.par ? n.k : n.pk, c.ip ? VIEW.INPLAY : VIEW.PRESTART, n.i[36]),
                    isMin: !0
                }),
                d = c.ip && c.cds && "True" == r[38],
                m = {
                    hn: n.i[0],
                    an: n.i[1]
                };
            d && (m.hs = n.i[10], m.as = n.i[11]);
            !c.ip && null != n.o && null != n.o.eps && null != n.o.eps.o && n.o.eps.o.length > 0 && (e = React.createElement("tr", null, React.createElement("td", {
                colSpan: 7,
                className: "t-a-l"
            }, React.createElement(s.secondaryFeatureEvent.eps, {
                pdt: !0,
                url: i.url
            })))), c.idm && "" != c.msg && (t = React.createElement("tr", null, React.createElement("td", {
                colSpan: 7,
                className: "t-a-l"
            }, React.createElement(s.mainFeatureEvent.content.message, {
                pdb: !0,
                msg: c.msg
            }))));
            var p = [],
                h = this._getOddsByRegion(c.rd, n, c.sid),
                p = [];
            if (h) {
                h[1] ? h[1].hdp = "X" : h[1] = {
                    hdp: "X"
                }, h[0].hdp = "1", h[2].hdp = "2";
                var u = this._getBaseOddsProp;
                _.forEach(h, function (e) {
                    if (null == e) p.push(React.createElement("td", {
                        key: n.k + "_empty",
                        className: "pd-t-6 pd-b-6"
                    }, React.createElement(s.sport.oddsEmpty, null)));
                    else if (0 == e.odds) p.push(React.createElement("td", {
                        key: e.sid,
                        className: "pd-t-6 pd-b-6"
                    }, React.createElement(s.sport.oddsLock, null)));
                    else {
                        var t = _.assign({
                            ignoreHDP: !0
                        }, u(n, c.ip), e);
                        p.push(React.createElement("td", {
                            key: e.sid,
                            className: "pd-t-6 pd-b-6"
                        }, React.createElement(s.sport.odds, {
                            data: t
                        })))
                    }
                })
            } else p.push(React.createElement("td", {
                key: n.k + "_empty1",
                className: "pd-t-6 pd-b-6"
            }, React.createElement(s.sport.oddsEmpty, null))), p.push(React.createElement("td", {
                key: n.k + "_empty2",
                className: "pd-t-6 pd-b-6"
            }, React.createElement(s.sport.oddsEmpty, null))), p.push(React.createElement("td", {
                key: n.k + "_empty3",
                className: "pd-t-6 pd-b-6"
            }, React.createElement(s.sport.oddsEmpty, null)));
            return React.createElement("table", {
                className: "tb-featureEvent odds-large t-a-c odds-large secondary topBorder"
            }, React.createElement("colgroup", null, React.createElement("col", {
                className: "col-eventImage"
            }), React.createElement("col", null), React.createElement("col", null), React.createElement("col", {
                className: "col-fixedodds"
            }), React.createElement("col", {
                className: "col-fixedodds"
            }), React.createElement("col", {
                className: "col-fixedodds"
            }), React.createElement("col", {
                className: "col-fixed51"
            })), React.createElement("tbody", {
                className: "fts-13 selection hovertby cr-pointer"
            }, React.createElement("tr", null, React.createElement("td", {
                colSpan: "7",
                className: "pd-b-3"
            })), React.createElement("tr", {
                className: "ft-c-16 height-24"
            }, React.createElement("td", {
                className: "td-eventImage",
                rowSpan: "2"
            }, React.createElement(s.mainFeatureEvent.img, {
                src: c.img,
                url: i.url
            })), React.createElement("td", {
                className: "t-a-l pd-l-10 pd-t-5 pd-b-2 lht-0p9",
                colSpan: "3"
            }, c.c.n), React.createElement("td", {
                colSpan: "3",
                className: "t-a-r pd-r-10"
            }, React.createElement("div", {
                className: "div-lineHeight-lv1 ft-c-21 fts-12"
            }, React.createElement("div", {
                className: "dsp-iblk mg-r-10 ft-c-5"
            }), React.createElement("div", {
                className: classNames("live dsp-iblk", {
                    "mg-r-10": "" != r[7]
                })
            }, c.ip ? l.LiveText : null), "" == r[7] ? null : React.createElement("div", {
                className: "icon-TV2  dsp-iblk"
            })))), React.createElement("tr", null, React.createElement("td", {
                colSpan: "2",
                className: "t-a-l pd-l-10",
                onClick: this._gotoAMPage.bind(this, i.url)
            }, React.createElement(s.sport.scoreAndTeamName, {
                data: m
            })), p, React.createElement("td", {
                className: "t-a-r"
            }, React.createElement(s.sport.morebet, {
                data: i
            }))), e, t))
        },
        _gotoAMPage: function (e) {
            Action.LoadSite(e)
        }
    }), s.secondaryFeatureEvent.eps = React.createClass({
        displayName: "eps",
        render: function () {
            return React.createElement("div", {
                className: "bg-c-53" + (this.props.pdt ? " pd-t-6" : "") + (this.props.pdb ? " pd-b-6" : "")
            }, React.createElement("div", {
                className: "radius bg-c-4 pd-l-10 pd-r-10 pd-t-8 pd-b-7 fts-13 t-a-c ft-c-3 epsbanner",
                onClick: this._gotoAMPage
            }, l.OP_EPSAvailable))
        },
        _gotoAMPage: function () {
            Action.LoadSite(this.props.url)
        }
    }), s.secondaryFeatureEvent.outrightForm = React.createClass({
        displayName: "outrightForm",
        mixins: [s.Utility.odds, s.Utility.link],
        render: function () {
            var e = this.props.data,
                t = e.data,
                a = t.c.e[0],
                c = a["n-o"][0],
                n = e.index;
            if (null == c) return null;
            for (var r, i, o = c.o.length > 2 ? 3 : 2, d = [], m = 0; m < c.o.length && m < 4; m++) {
                var p = c.o[m];
                d.push(React.createElement("td", {
                    className: "t-a-l" + (m % 2 == 0 ? " pd-l-10" : " pd-l-5")
                }, React.createElement("div", {
                    className: "ft-c-25"
                }, p[0])));
                var h = {
                    sid: p[1].replace(/\D+/, ""),
                    odds: p[2],
                    hdp: null,
                    last: !1
                };
                d.push(React.createElement("td", {
                    className: m % 2 == 0 ? "" : "t-a-r pd-r-5"
                }, React.createElement("div", {
                    className: "odds-container"
                }, React.createElement(s.rightPanel.odds, {
                    data: _.assign({}, this._getBaseOddsProp(a, !1), h)
                }))))
            }
            var u = {
                    url: this._getOutrightLink(t.sid, t.c.k),
                    isMin: !0,
                    height: 48
                },
                E = React.createElement(s.sport.morebet, {
                    data: u
                });
            d = _.chunk(_.chunk(d, 2), 2), d.length > 1 ? (r = React.createElement("tr", {
                className: "height-24"
            }, d[0], React.createElement("td", {
                className: "t-a-r",
                rowSpan: "2"
            }, E)), 1 == d[1].length && d[1].push([React.createElement("td", null), React.createElement("td", null)]), i = React.createElement("tr", {
                className: "height-24"
            }, d[1])) : (1 == d[0].length && d[0].push([React.createElement("td", null), React.createElement("td", null)]), r = React.createElement("tr", {
                className: "height-24"
            }, d[0], React.createElement("td", {
                className: "t-a-r"
            }, E)));
            var R;
            c.pf && c.pt && (R = React.createElement("tr", null, React.createElement("td", {
                colSpan: "6",
                className: "t-a-l"
            }, React.createElement("div", {
                className: "bg-c-53 pd-t-6 pd-b-6"
            }, React.createElement("div", {
                className: "radius bg-c-27 pd-l-10 pd-r-10 pd-t-8 pd-b-7 fts-13 t-a-l ft-c-4 lht-15"
            }, l.OP_EW_S, " - 1/", c.pf, ",", " ", l.OP_NT.replace("XXX", c.pt))))));
            var g;
            return t.idm && "" != t.msg && (g = React.createElement("tr", null, React.createElement("td", {
                colSpan: "6",
                className: "t-a-l"
            }, React.createElement(s.mainFeatureEvent.content.message, {
                pdb: !0,
                msg: t.msg
            })))), React.createElement("table", {
                className: "tb-featureEvent t-a-c secondary" + (n > 0 ? " topBorder" : "")
            }, React.createElement("colgroup", null, React.createElement("col", {
                className: "col-eventImage"
            }), React.createElement("col", null), React.createElement("col", {
                className: "col-fixedodds"
            }), React.createElement("col", null), React.createElement("col", {
                className: "col-fixedodds"
            }), React.createElement("col", {
                className: "col-fixed57"
            })), React.createElement("tbody", {
                className: "fts-13 selection hovertby cr-pointer"
            }, React.createElement("tr", null, React.createElement("td", {
                colSpan: "6",
                className: "pd-b-3"
            })), React.createElement("tr", {
                className: "ft-c-16 fts-13 height-24"
            }, React.createElement("td", {
                className: "td-eventImage",
                rowSpan: o
            }, React.createElement(s.mainFeatureEvent.img, {
                src: t.img,
                url: u.url
            })), React.createElement("td", {
                className: "t-a-l pd-l-10  lht-1e",
                colSpan: "5"
            }, React.createElement("div", {
                className: "pd-t-5 pd-b-2"
            }, a.egn, React.createElement("span", {
                className: "ft-c-23"
            }, " " + c.mn)))), r, i, R, g))
        }
    }), s.secondaryFeatureEvent.epmForm = React.createClass({
        displayName: "epmForm",
        mixins: [s.Utility.odds, s.Utility.link],
        render: function () {
            var e = this.props.data,
                t = e.data,
                a = t.c,
                l = t.c.e[0],
                n = l["e-o"][0],
                r = e.index,
                i = e.extraData;
            if (null == n) return null;
            var o = {
                    url: this._getEpmLink(t.sid, t.c.k),
                    isMin: !0,
                    height: 48
                },
                d = _.first(n.o),
                m = d ? React.createElement(s.secondaryFeatureEvent.epmForm.selection, c({
                    key: "se_epm_sel_" + d.id
                }, d, {
                    evt: l,
                    epmLink: o.url,
                    data: {
                        extraData: i
                    }
                })) : null,
                p = void 0;
            return t.idm && "" != t.msg && (p = React.createElement("tr", null, React.createElement("td", {
                colSpan: "6",
                className: "t-a-l"
            }, React.createElement(s.mainFeatureEvent.content.message, {
                pdb: !0,
                msg: t.msg
            })))), React.createElement("table", {
                className: "tb-featureEvent odds-large t-a-c odds-large secondary min" + (r > 0 ? " topBorder" : "")
            }, React.createElement("colgroup", null, React.createElement("col", {
                className: "col-eventImage"
            }), React.createElement("col", null), React.createElement("col", {
                className: "col-fixed45"
            }), React.createElement("col", {
                className: "col-fixedodds"
            }), React.createElement("col", {
                className: "col-fixedodds"
            }), React.createElement("col", {
                className: "col-fixed51"
            })), React.createElement("tbody", {
                className: "fts-13 selection hovertby\tcr-pointer"
            }, React.createElement("tr", null, React.createElement("td", {
                colSpan: "6",
                className: "pd-b-3"
            })), React.createElement("tr", {
                className: "ft-c-16 height-24"
            }, React.createElement("td", {
                className: "td-eventImage",
                rowSpan: 2
            }, React.createElement(s.mainFeatureEvent.img, {
                src: t.img,
                url: o.url
            })), React.createElement("td", {
                className: "t-a-l pd-l-10 pd-t-5 lht-0p9 ft-c-56 fts-13",
                colSpan: "5"
            }, a.n, React.createElement("div", {
                className: "ft-c-83 fts-13 pd-t-5"
            }, n.mn))), m, p))
        }
    }), s.secondaryFeatureEvent.epmForm.selection = React.createClass({
        displayName: "selection",
        mixins: [s.Utility.odds, s.Utility.link],
        getInitialState: function () {
            return {
                showDetail: !1
            }
        },
        render: function () {
            var e = this,
                t = this.props,
                a = t.id,
                l = t.o,
                c = t.lo,
                n = t.dt,
                r = t.dil,
                i = t.ril,
                o = t.iscc,
                d = t.epmLink,
                m = t.evt,
                p = this.state.showDetail,
                h = a.replace(/\D+/, ""),
                u = {
                    sid: h,
                    odds: l,
                    isHL: this._highlightCheck(h),
                    hdp: null,
                    last: !1
                },
                E = _.assign({}, this._getBaseOddsProp(m, !1), u);
            return React.createElement("tr", null, React.createElement("td", {
                className: "t-a-l pd-l-10"
            }, React.createElement("table", {
                className: "lht-1p4"
            }, React.createElement("tbody", null, r && r.map(function (t, a) {
                var l = e._getEpmDisplayName(n, t);
                return React.createElement("tr", {
                    key: "se_epm_" + m.k + "_sel_dil_" + t + "_" + a
                }, React.createElement("td", null, React.createElement("div", {
                    className: "ft-c-4"
                }, l)))
            })))), React.createElement("td", {
                className: "pd-0 t-a-c epm tb-featureEvent "
            }, React.createElement("span", {
                className: "icon icon-i-s ft-c-22 bg-c-57 ",
                onMouseEnter: function () {
                    return e._handleMouseEvent(!0)
                },
                onMouseLeave: function () {
                    return e._handleMouseEvent(!1)
                }
            }), p ? React.createElement("div", {
                className: "overlayContainer selected pos-absolute pd-r-7"
            }, React.createElement("div", {
                className: "tickContainer "
            }, React.createElement("span", {
                className: "tick "
            })), React.createElement("div", {
                className: "overlay "
            }, React.createElement("div", {
                className: "br-c-1 bg-c-55 fts-13 "
            }, i && i.map(function (t, a) {
                var l = e._getReferDetailName(t.isor, t.rn);
                return [React.createElement("div", {
                    key: "sec_epm_sel_ril_sn_" + a,
                    className: "bold ft-c-25 t-a-l " + (0 !== a ? " pd-t-5" : "")
                }, t.sn), o ? React.createElement("div", {
                    key: "sec_epm_sel_ril_cn_" + a,
                    className: "ft-c-22 t-a-l"
                }, React.createElement("span", {
                    className: "mg-r-6"
                }, t.cn)) : null, React.createElement("div", {
                    className: "ft-c-22 t-a-l ",
                    key: "sec_epm_sel_ril_dd_" + a
                }, l, React.createElement("span", {
                    className: "mg-r-5 "
                }, ","), React.createElement("span", {
                    className: "mg-r-10 "
                }, t.rd), React.createElement("span", null, t.rt))]
            })))) : null), React.createElement("td", {
                className: "pd-0 t-a-c "
            }, React.createElement("span", {
                className: "fontWeight-bold strike "
            }, c)), React.createElement("td", {
                className: "pd-t-10 pd-b-10 ",
                key: "epmselodds_" + a
            }, React.createElement("div", {
                className: "odds-container dsp-iblk "
            }, React.createElement(s.sport.odds, {
                data: E
            }))), React.createElement("td", {
                className: "t-a-r pd-t-10 pd-b-10 "
            }, React.createElement("div", {
                className: "t-a-c bt-moreBet bt-moreBet-min bg-c-41 height-40 radius ft-c-3 fontWeight-bold",
                onClick: function () {
                    return Action.LoadSite(d)
                }
            }, React.createElement("span", {
                className: "icon-ArrowMoreBets "
            }))))
        },
        _getEpmDisplayName: function (e, t) {
            switch (e) {
                case 1:
                    var a = t.split("-v-");
                    return a.length < 2 ? null : a[0] + " v " + a[1];
                case 2:
                case 3:
                    return t
            }
        },
        _getReferDetailName: function (e, t) {
            if (e) return React.createElement("span", {
                className: "mg-r-6"
            }, t);
            var a = t.split("-v-");
            return a.length < 2 ? null : [React.createElement("span", {
                className: "mg-r-6"
            }, a[0]), React.createElement("span", {
                className: "mg-r-6 ft-c-16"
            }, "v"), React.createElement("span", null, a[1])]
        },
        _handleMouseEvent: function (e) {
            this.setState({
                showDetail: e
            })
        }
    }), s.secondaryFeatureEvent.competitionForm = React.createClass({
        displayName: "competitionForm",
        mixins: [s.Utility.odds, s.Utility.link],
        render: function () {
            var e, t = this,
                a = this.props.data,
                c = a.data,
                n = c.c,
                r = a.index;
            n.hasor && (e = React.createElement("div", {
                className: "mg-l-10 dsp-blk t-a-c bt-moreBet bg-c-41 height-40 radius ft-c-3 fts-12 colButton",
                onClick: this._linkToOutRight
            }, React.createElement("span", {
                className: "maxwidth-85 pos-relative dsp-iblk lht-1e mg-b-3 t-va-m"
            }, l.LP_OutrightMarkets), React.createElement("span", {
                className: "icon-ArrowMoreBets"
            })));
            var i = void 0;
            n.hasepm && (i = React.createElement("tr", null, React.createElement("td", {
                colSpan: "6",
                className: "t-a-l pd-b-6"
            }, React.createElement("div", {
                className: "t-a-c bt-moreBet-enlarge height-40 radius ft-c-3 fts-12 bg-c-4 epsbanner",
                onClick: function () {
                    return Action.LoadSite(t._getEpmLink(c.sid, n.k))
                }
            }, React.createElement("span", null, l.EPM.EPM_Available), React.createElement("span", {
                className: "fontWeight-bold"
            }), React.createElement("span", {
                className: "icon-ArrowMoreBets"
            })))));
            var o;
            c.idm && "" != c.msg && (o = React.createElement("tr", null, React.createElement("td", {
                colSpan: "6",
                className: "t-a-l"
            }, React.createElement(s.mainFeatureEvent.content.message, {
                pdb: !0,
                msg: c.msg
            }))));
            var d;
            return n.ec > 0 && (d = React.createElement("div", {
                className: "dsp-blk t-a-c bt-moreBet bg-c-41 height-40 radius ft-c-3 fts-12 colButton",
                onClick: this._linkToCompetition
            }, n.ec + " " + l.HP_Matches, React.createElement("span", {
                className: "icon-ArrowMoreBets"
            }))), React.createElement("table", {
                className: "tb-featureEvent t-a-c secondary" + (r > 0 ? " topBorder" : "")
            }, React.createElement("colgroup", null, React.createElement("col", {
                className: "col-eventImage"
            }), React.createElement("col", null), React.createElement("col", {
                className: "col-fixedodds"
            }), React.createElement("col", null), React.createElement("col", {
                className: "col-fixedodds"
            }), React.createElement("col", {
                className: "col-fixedodds"
            })), React.createElement("tbody", {
                className: "fts-13 selection hovertby cr-pointer"
            }, React.createElement("tr", {
                className: "ft-c-16 fts-13 height-24"
            }, React.createElement("td", {
                className: "td-eventImage"
            }, React.createElement(s.mainFeatureEvent.img, {
                src: c.img,
                url: this._getCompetitionLink(c.sid, n.k)
            })), React.createElement("td", {
                className: " pd-l-10 t-a-l"
            }, React.createElement("div", {
                className: "ft-c-21 uppercase"
            }, c.sn), React.createElement("div", {
                className: "ft-c-16 mg-t-5"
            }, n.n)), React.createElement("td", {
                colSpan: "4",
                className: "t-a-r"
            }, d, e)), i, o))
        },
        _linkToCompetition: function () {
            var e = this.props.data,
                t = e.data,
                a = t.c;
            Action.LoadSite(this._getCompetitionLink(t.sid, a.k))
        },
        _linkToOutRight: function () {
            var e = this.props.data,
                t = e.data,
                a = t.c;
            Action.LoadSite(this._getOutrightLink(t.sid, a.k))
        }
    }), s.inplayPanel = React.createClass({
        displayName: "inplayPanel",
        mixins: [s.Utility.link],
        render: function () {
            var e = this.props.data,
                t = e.data,
                a = e.extraData;
            if (null == t || 0 == t.length) return null;
            var c, n = !0,
                r = t.slice(0, 3).map(function (e) {
                    var t = {
                            data: e,
                            isFirstSport: n,
                            isInplay: !0,
                            sportType: "IP",
                            extraData: a
                        },
                        l = React.createElement(s.sport, {
                            key: "hp_ip_" + e.k,
                            data: t
                        });
                    return n && (n = !1), l
                });
            return t.slice(3).length > 0 && (c = React.createElement(s.inplayPanel.otherSports, {
                data: t.slice(3)
            })), React.createElement("div", {
                className: "radius bg-c-1 pd-6 mg-t-10 in-play"
            }, React.createElement(s.header, {
                isInplay: !0,
                ec: e.ipec
            }), React.createElement("div", null, r, c, React.createElement(s.sport.bottomLink, {
                txt: l.LP_All + " " + l.LP_Inplay,
                count: e.ipec,
                url: this._getAllInplayLink()
            })))
        }
    }), s.inplayPanel.otherSports = React.createClass({
        displayName: "otherSports",
        render: function () {
            for (var e = this.props.data, t = [], a = 0; a < e.length; a += 2) {
                var l = a + 2 < e.length ? e.slice(a, a + 2) : e.slice(a);
                t.push(React.createElement(s.inplayPanel.otherSports.row, {
                    key: "other_" + l[0].k,
                    data: l
                }))
            }
            return React.createElement("table", {
                className: "tb-featureEvent odds-large t-a-c odds-large mg-t-10 topBorder_2px bottomBorder_2px"
            }, React.createElement("colgroup", null, React.createElement("col", {
                className: "col-50Percent"
            }), React.createElement("col", {
                className: "col-50Percent"
            })), React.createElement("tbody", {
                className: "fts-13"
            }, t))
        }
    }), s.inplayPanel.otherSports.row = React.createClass({
        displayName: "row",
        render: function () {
            var e = this.props.data,
                t = React.createElement(s.inplayPanel.otherSports.cell, {
                    data: e[0]
                }),
                a = e[1] ? React.createElement(s.inplayPanel.otherSports.cell, {
                    data: e[1]
                }) : React.createElement("td", null);
            return React.createElement("tr", null, t, a)
        }
    }), s.inplayPanel.otherSports.cell = React.createClass({
        displayName: "cell",
        mixins: [s.Utility.link],
        render: function () {
            var e = this.props.data;
            return React.createElement("td", {
                onClick: this._viewAll.bind(this, this._getSportLink(!0, e.k)),
                className: "viewEvents pd-l-10 pd-t-10 pd-b-6 t-a-l pd-r-10"
            }, React.createElement("div", {
                className: "round-moreBet round bg-c-2 ft-c-3 dsp-iblk fts-15 t-a-c fontWeight-bold float-right"
            }, e.ec), React.createElement("div", {
                className: "fontWeight-bold dsp-iblk ft-c-16 fts-15 mg-t-5 uppercase"
            }, React.createElement("span", {
                className: "sportName"
            }, e.n), React.createElement("div", {
                className: "fontWeight-normal ft-c-25 fts-13 txt-idt-1"
            }, l.HP_ViewEvent)))
        },
        _viewAll: function (e, t) {
            Action.LoadSite(e)
        }
    }), s.prestartPanel = React.createClass({
        displayName: "prestartPanel",
        render: function () {
            var e = this.props.data,
                t = e.extraData,
                a = {
                    data: e.hl,
                    isHidden: !t.isDisplayHL,
                    sportType: "HL",
                    extraData: t
                },
                c = {
                    data: e.ss,
                    isHidden: t.isDisplayHL,
                    sportType: "SS",
                    extraData: t
                };
            return React.createElement("div", {
                className: "radius bg-c-1 pd-6 mg-t-10 in-play"
            }, React.createElement(s.header, {
                isInplay: !1
            }), React.createElement("div", null, React.createElement("table", {
                className: "tb-featureEvent odds-large t-a-c odds-large"
            }, React.createElement("colgroup", null, React.createElement("col", {
                className: "col-50Percent"
            }), React.createElement("col", {
                className: "col-50Percent"
            })), React.createElement("tbody", {
                className: "fts-13"
            }, React.createElement("tr", null, React.createElement("td", {
                className: " pd-t-11 pd-b-10 t-a-r pd-r-15"
            }, React.createElement("div", {
                onClick: this._toggleContent.bind(this, !0),
                className: "dsp-blk t-a-c bt-tab bg-c-41 height-35 ft-c-3 fts-14 singleButton radius" + (t.isDisplayHL ? " actived" : "")
            }, l.HP_Highlights)), React.createElement("td", {
                className: "pd-l-15 pd-t-11 pd-b-10 t-a-l"
            }, React.createElement("div", {
                onClick: this._toggleContent.bind(this, !1),
                className: "dsp-blk t-a-c bt-tab bg-c-41 height-35 ft-c-3 fts-14 singleButton radius" + (t.isDisplayHL ? "" : " actived")
            }, l.LP_StartingSoonMenu))))), React.createElement(s.prestartPanel.sportContent, {
                data: a
            }), React.createElement(s.prestartPanel.sportContent, {
                data: c
            })))
        },
        _toggleContent: function (e, t) {
            var a = this.props.data;
            (e && a.hl.length > 0 || !e && a.ss.length > 0) && Action.Homepage.toggleSportsContent(e)
        }
    }), s.prestartPanel.sportContent = React.createClass({
        displayName: "sportContent",
        render: function () {
            var e, t = this.props.data,
                a = t.data,
                l = t.extraData,
                c = !0,
                n = a.slice(0, 3).map(function (e) {
                    var a = {
                            data: e,
                            isFirstSport: c,
                            isInplay: !1,
                            sportType: t.sportType,
                            extraData: l
                        },
                        n = React.createElement(s.sport, {
                            key: "hp_" + t.sportType + "_" + e.k,
                            data: a
                        });
                    return c && (c = !1), n
                });
            if (a.length > 3) {
                var r = "HL" == t.sportType ? a.slice(3, 7) : _.drop(a, 3);
                e = _.chunk(r, 2).map(function (e) {
                    var a = "oths_" + e[0].k + (null != e[1] ? "_" + e[1].k : "");
                    return React.createElement(s.prestartPanel.otherSports, {
                        key: a,
                        data: e,
                        sportType: t.sportType
                    })
                })
            }
            return React.createElement("div", {
                className: t.isHidden ? "hidden" : ""
            }, n, e)
        }
    }), s.prestartPanel.otherSports = React.createClass({
        displayName: "otherSports",
        mixins: [s.Utility.link],
        render: function () {
            var e = this._createSportLinks(this.props.data, "HL" == this.props.sportType);
            return React.createElement("table", {
                className: "tb-featureEvent odds-large t-a-c odds-large mg-t-10 topBorder_2px"
            }, React.createElement("colgroup", null, React.createElement("col", {
                className: "col-50Percent"
            }), React.createElement("col", {
                className: "col-50Percent"
            })), React.createElement("tbody", {
                className: "fts-13"
            }, e))
        },
        _createSportLinks: function (e, t) {
            var a = e[0],
                l = e[1],
                c = t ? this._createHLSportLinkCells : this._createSSSportLinkCells,
                s = c(a, a.ec, !0),
                n = null == l ? [] : c(l, l.ec, !1),
                r = t ? Math.max(s.length, n.length) : 2,
                i = "oths_" + a.k;
            return null != l && (i += "_" + l.k), this._createLinkRows(s, n, r, i)
        },
        _createLinkRows: function (e, t, a, l) {
            for (var c = [], s = 0; s < a; s++) {
                var n = l + "_" + s;
                c.push(this._createLinkRow(e[s], t[s], n))
            }
            return c
        },
        _createLinkRow: function (e, t, a) {
            var l = null == e ? React.createElement("td", null) : e,
                c = null == t ? React.createElement("td", null) : t;
            return React.createElement("tr", {
                key: a
            }, l, c)
        },
        _createHLSportLinkCells: function (e, t, a) {
            var c = [],
                n = {
                    sid: e.k,
                    n: e.n,
                    en: e.en,
                    tc: e.tec,
                    tmrc: e.tmec
                };
            c.push(React.createElement(s.prestartPanel.otherSports.titleCell, {
                data: n
            }));
            var r;
            if (e.or) r = _.take(e.c, 3);
            else {
                var i;
                if (1 == e.k) {
                    var o, d, m = null != e.tec ? e.tec : null != e.tmec ? e.tmec : 0;
                    o = null != e.tec ? l.HP_TodayMatches : null != e.tmec ? l.HP_TomorrowMatches : null, d = null != e.tec ? this._getFootballTodayLink() : null != e.tmec ? this._getFootballTomorrowLink() : null, null != o && (i = {
                        n: o,
                        ec: m,
                        link: d
                    })
                } else i = {
                    n: l.HP_AllMatches,
                    ec: t,
                    link: this._getSportLink(!1, e.k)
                };
                null != i && c.push(React.createElement(s.sport.linkCell, {
                    data: i,
                    odd: a
                })), r = _.take(e.c, null == i ? 3 : 2)
            }
            var p = this._getLinkCellProps,
                h = r.map(function (t) {
                    return React.createElement(s.sport.linkCell, {
                        data: p(e, t, !0),
                        odd: a
                    })
                });
            return c.concat(h)
        },
        _createSSSportLinkCells: function (e, t, a) {
            var l = [],
                c = {
                    sid: e.k,
                    n: e.n,
                    en: e.en,
                    tc: e.tec,
                    tmrc: e.tmec
                };
            return l.push(React.createElement(s.prestartPanel.otherSports.titleCell, {
                data: c
            })), l.push(React.createElement(s.sport.linkCell, {
                data: this._getLinkCellProps(e, null, !1),
                odd: a
            })), l
        },
        _getLinkCellProps: function (e, t, a) {
            return {
                ec: a ? t.ec : e.ec,
                n: a ? t.n : l.LP_StartingSoonMenu,
                link: a ? this._getCompetitionLink(e.k, t.k) : this._getSportStartingSoonLink(e.k)
            }
        }
    }), s.prestartPanel.otherSports.titleCell = React.createClass({
        displayName: "titleCell",
        mixins: [s.Utility.link],
        render: function () {
            var e = this.props.data;
            return React.createElement("td", {
                className: " pd-l-10 pd-t-10 pd-b-10 t-a-l pd-r-15 clickableTitle",
                onClick: this._clickHeader
            }, React.createElement("div", {
                className: "float-right fts-27 ft-c-26 icon-" + e.sid
            }), React.createElement("div", {
                className: "fontWeight-bold dsp-iblk dark ft-c-16 fts-15 mg-t-5 uppercase"
            }, e.n))
        },
        _clickHeader: function () {
            var e = this.props.data,
                t = VIEW.PRESTART,
                a = {
                    sid: e.sid,
                    sen: e.en.replace(/\s/g, "-")
                };
            1 == e.sid && (a.tc = e.tc, a.tmrc = e.tmrc), Action.LeftPanel.sport(a, t)
        }
    }), s.header = React.createClass({
        displayName: "header",
        mixins: [s.Utility.link],
        render: function () {
            var e, t, a = this.props.isInplay;
            return a ? (e = React.createElement("div", {
                className: "round-moreBet round bg-c-2 ft-c-3 dsp-iblk float-right fts-15 t-a-c fontWeight-bold"
            }, this.props.ec), t = l.LP_Inplay) : t = this.props.isEPM ? l.EPM.EPM : l.MyAcc_Sports, React.createElement("div", {
                className: "featureEvent-header"
            }, React.createElement("div", {
                className: "bg-c-10 radius ft-c-14 fts-16 pd-t-15 pd-b-13 lht-0p8 fontWeight-bold pd-r-13 pd-l-10" + (a ? " inplayHeader" : ""),
                onClick: this._clickHeader
            }, e, t.toUpperCase()))
        },
        _clickHeader: function () {
            this.props.isInplay && Action.LoadSite(this._getAllInplayLink())
        }
    }), s.sport = React.createClass({
        displayName: "sport",
        mixins: [s.Utility.link, s.Utility.score],
        render: function () {
            var e = this.props.data,
                t = e.data,
                a = e.extraData,
                c = "tb-featureEvent odds-large t-a-c odds-large mg-t-10";
            e.isFirstSport || (c += " topBorder_2px"), e.isInplay && 2 == t.k && (c += " tridigits");
            for (var n = [], r = 0; r < t.c.length; r++) n = n.concat(t.c[r].e);
            var i, o = !0,
                d = e.isInplay,
                m = "1X2" == t.rd || 25 == t.k,
                p = e.sportType,
                h = _.map(_.filter(n, function (e) {
                    return e.ihe
                }), "pk"),
                u = _.map(n, function (e) {
                    var l = e.i[5].split(":")[0];
                    if (d && 1 == t.k && +l.split(":")[0] > window.global.thi) return null;
                    if (_.includes(h, e.k)) return null;
                    var c = this._canDisplayScore(e, t.k, t.cds),
                        n = {
                            data: e,
                            showScore: !!d && c,
                            isFirstEvt: o,
                            isInplay: d,
                            rd: t.rd,
                            sportId: t.k,
                            isNetSports: t.isNetSports,
                            sportType: p,
                            extraData: a,
                            cols: "1X2" == t.rd || 25 == t.k ? 6 : 5
                        },
                        r = React.createElement(s.sport.eventItem, {
                            key: e.k,
                            data: n
                        });
                    return o && (o = !1), r
                }, this);
            switch (p) {
                case "IP":
                    i = React.createElement(s.sport.bottomLink, {
                        txt: l.LP_All + " " + t.n + " " + l.LP_Inplay,
                        count: t.ec,
                        url: this._getSportLink(!0, t.k)
                    });
                    break;
                case "HL":
                    i = React.createElement(s.sport.bottomLinkMultiple, {
                        ec: t.ec,
                        data: t
                    });
                    break;
                case "SS":
                    i = React.createElement(s.sport.bottomLink, {
                        txt: l.LP_All + " " + t.n + " " + l.LP_StartingSoonMenu,
                        count: t.ec,
                        url: this._getSportStartingSoonLink(t.k)
                    })
            }
            var E = {
                isInplay: d,
                isSS: "SS" == p,
                sid: t.k,
                sportName: t.n,
                en: t.en,
                evtCount: t.ec,
                is1X2: m || 14 == t.k,
                url: d ? this._getSportLink(d, t.k) : null,
                isFirstSport: e.isFirstSport
            };
            return 1 == t.k && (E.tc = t.tec, E.tmrc = t.tmec), React.createElement("div", null, React.createElement("table", {
                className: c
            }, React.createElement(s.sport.colgroup, {
                is1X2: "1X2" == t.rd || 14 == t.k || 25 == t.k,
                isInplay: d,
                isns: t.isNetSports
            }), React.createElement(s.sport.sportsHeader, {
                data: E
            }), u), i)
        }
    }), s.sport.colgroup = React.createClass({
        displayName: "colgroup",
        render: function () {
            var e, t = this.props.is1X2;
            this.props.isInplay;
            return t && (e = React.createElement("col", {
                className: "col-fixedodds"
            })), React.createElement("colgroup", null, React.createElement("col", null), React.createElement("col", {
                className: this.props.isns ? "" : "col-fixedodds"
            }), React.createElement("col", {
                className: "col-fixedodds"
            }), e, React.createElement("col", {
                className: "col-fixedodds"
            }), React.createElement("col", {
                className: "col-fixed51"
            }))
        }
    }), s.sport.sportsHeader = React.createClass({
        displayName: "sportsHeader",
        mixins: [s.Utility.link],
        render: function () {
            var e, t = this.props.data;
            t.is1X2 && (e = React.createElement("th", {
                className: "fts-12 ft-c-60 " + (t.isFirstSport ? "" : "pd-t-10")
            }, "X"));
            var a;
            return t.isInplay || (a = React.createElement("th", {
                className: "t-a-c " + (t.isFirstSport ? "" : "pd-t-10")
            }, React.createElement("div", {
                className: "icon-" + t.sid + " fts-27 ft-c-26"
            }))), React.createElement("thead", null, React.createElement("tr", {
                className: "fontWeight-bold ft-c-16 fts-15 moreBet1x2 " + (t.isFirstSport ? "" : "pd-t-10"),
                onClick: this._clickHeader
            }, React.createElement("th", {
                className: "t-a-l pd-l-10 sportName uppercase " + (t.isFirstSport ? "" : "pd-t-10"),
                colSpan: "2"
            }, t.sportName), React.createElement("th", {
                className: "fts-12 ft-c-60 " + (t.isFirstSport ? "" : "pd-t-10")
            }, "1"), e, React.createElement("th", {
                className: "fts-12 ft-c-60 " + (t.isFirstSport ? "" : "pd-t-10")
            }, "2"), a, void 0))
        },
        _clickHeader: function () {
            var e = this.props.data,
                t = e.isInplay ? VIEW.INPLAY : e.isSS ? VIEW.STARTINGSOON : VIEW.PRESTART,
                a = {
                    sid: e.sid,
                    sen: e.en.replace(/\s/g, "-")
                };
            1 == a.sid && (a.tc = e.tc, a.tmrc = e.tmrc), Action.LeftPanel.sport(a, t)
        },
        _showSportAllInplay: function () {
            var e = this.props.data;
            e.isInplay && Action.LoadSite(e.url)
        }
    }), s.sport.eventItem = React.createClass({
        displayName: "eventItem",
        mixins: [s.Utility.odds, s.Utility.link, s.Utility.pnc, s.Utility.naming],
        render: function () {
            var e = this.props.data,
                t = e.sportId,
                a = e.data,
                c = e.isInplay,
                n = (e.extraData, "fts-13 selection");
            e.isFirstEvt || (n += " topBorder");
            var r;
            this._displayChildTag(a.cei.ctid) && (r = React.createElement("tr", {
                className: "fontWeight-bold ft-c-16 fts-15"
            }, React.createElement("td", {
                className: "t-a-l pd-l-10" + (e.isFirstEvt ? "" : " topBorder"),
                colSpan: "2"
            }), React.createElement("td", {
                colSpan: "3",
                className: "ft-c-5 fontWeight-normal fts-12 pd-t-10" + (e.isFirstEvt ? "" : " topBorder")
            }, this._getChildTag(a.cei.ctid))));
            var i = e.rd,
                d = "1X2" == i || 25 == e.sportId || 14 == e.sportId,
                m = e.sportType,
                p = e.showScore,
                h = e.isNetSports;
            4 != t && 14 != t || (p = "True" == a.i[38], 4 == t && p && a.sb);
            var u = {
                hn: a.i[0],
                an: a.i[1]
            };
            p && (u.hs = a.i[10], u.as = a.i[11]), "HDP" == i && a.o && a.o.ah && (d ? (u.hb = !1, u.ab = !1) : (u.hb = this._needBlackTeamName(a.o.ah[1]), u.ab = this._needBlackTeamName(a.o.ah[3])));
            var E;
            h && c && (E = "0" != a.i[37] ? React.createElement(s.sport.score.netSport, {
                data: {
                    sb: a.sb,
                    sid: t,
                    eid: a.k,
                    topBorder: !e.isFirstEvt && null == r
                }
            }) : React.createElement("td", {
                className: "ft-c-16 t-a-r" + (e.isFirstEvt ? "" : " topBorder")
            }, React.createElement("div", {
                className: "pd-r-10"
            }, l.LiveText)));
            var R;
            4 == t && c && (i = "HDP", R = "0" != a.i[37] && a.sb ? React.createElement("td", {
                className: "ft-c-59 t-a-c"
            }, React.createElement(s.sport.baseBallPeriod, {
                showinInplay: !0,
                hasTV: !1,
                data: {
                    cp: a.sb.cp,
                    s: a.sb.s
                }
            })) : React.createElement("td", {
                className: "ft-c-16 t-a-r" + (e.isFirstEvt ? "" : " topBorder")
            }, React.createElement("div", {
                className: "pd-r-10"
            }, l.LiveText)));
            var g;
            21 == t && c && (g = a.i[37] > 0 ? React.createElement("td", {
                className: "ft-c-23 t-a-c" + (e.isFirstEvt ? "" : " topBorder")
            }, React.createElement("div", {
                className: ""
            }, this._getBestOfLocalization(a.i[37]))) : React.createElement("td", {
                className: "ft-c-16 t-a-r" + (e.isFirstEvt ? "" : " topBorder")
            }, React.createElement("div", {
                className: "pd-r-10"
            }, l.LiveText)));
            var f = this._getOddsByRegion(i, a, e.sportId),
                v = [],
                N = "pd-t-10 pd-b-10" + (e.isFirstEvt || null != r ? "" : " topBorder");
            if (null == f) v.push(React.createElement("td", {
                key: a.k + "_empty1",
                className: N
            }, React.createElement(s.sport.oddsEmpty, null))), v.push(React.createElement("td", {
                key: a.k + "_empty2",
                className: N
            }, React.createElement(s.sport.oddsEmpty, null))), d && v.push(React.createElement("td", {
                key: a.k + "_empty3",
                rowSpan: "2",
                className: N
            }, React.createElement(s.sport.oddsEmpty, null)));
            else {
                var b = (a.i[10], a.i[11], this._getBaseOddsProp);
                _.forEach(f, function (e, t) {
                    if (e)
                        if (0 == e.odds) v.push(React.createElement("td", {
                            key: e.sid,
                            className: N
                        }, React.createElement(s.sport.oddsLock, null)));
                        else {
                            var l = _.assign(b(a, c), e);
                            v.push(React.createElement("td", {
                                key: e.sid,
                                className: N
                            }, React.createElement(s.sport.odds, {
                                data: l
                            })))
                        }
                    else v.push(React.createElement("td", {
                        key: a.k + "_empty2",
                        className: N
                    }, React.createElement(s.sport.oddsEmpty, null)))
                })
            }
            var y, k = {
                    morebetcount: a.i[32],
                    url: this._getMorebetLink(a.cei.ctid == o.pacType.par ? a.k : a.pk, c ? VIEW.INPLAY : VIEW.PRESTART, a.i[36]),
                    isMin: !0
                },
                P = React.createElement(s.sport.morebet, {
                    data: k
                }),
                S = {
                    isInplay: c,
                    topBorder: !e.isFirstEvt && null == r,
                    sid: t
                };
            if (c) {
                if (S.showScore = p, S.period = a.i[31], S.time = HP_Store.initTimerString(a.i[5]), 18 == t && null != a.sb && (a.sb.cp = 13 == a.i[37] ? "i1" : a.sb.cp, S.period = a.sb.cp, null != a.sb.ps && a.sb.ps.length > 0)) {
                    var M = _.filter(a.sb.ps, "p", a.sb.cp)[0];
                    S.h = "1" == a.sb.s ? M.h : M.a, S.a = "1" == a.sb.s ? M.hw : M.aw
                }
            } else S.edt = a.edt, "SS" == m ? (S.isSS = !0, S.mts = a.mts) : S.isSS = !1, null != a.o && null != a.o.eps && null != a.o.eps.o && a.o.eps.o.length > 0 && (y = React.createElement("tr", null, React.createElement("td", {
                colSpan: e.cols
            }, React.createElement(s.secondaryFeatureEvent.eps, {
                pdb: !0,
                url: k.url
            }))));
            var w;
            return h || (w = React.createElement(s.sport.periodAndTime, {
                data: S
            })), (R || g) && (w = null), React.createElement("tbody", {
                className: "hovertby fts-13 selection cr-pointer"
            }, r, React.createElement("tr", null, React.createElement("td", {
                className: "t-a-l pd-l-10" + (e.isFirstEvt || null != r ? "" : " topBorder"),
                onClick: this._gotoAMPage.bind(this, k.url)
            }, React.createElement(s.sport.scoreAndTeamName, {
                data: u
            })), w, E, R, g, v, React.createElement("td", {
                className: "t-a-r" + (e.isFirstEvt || null != r ? "" : " topBorder")
            }, P)), y)
        },
        _gotoAMPage: function (e) {
            Action.LoadSite(e)
        }
    }), s.sport.scoreAndTeamName = React.createClass({
        displayName: "scoreAndTeamName",
        render: function () {
            var e, t, a = this.props.data;
            return null != a.hs && (e = React.createElement("td", {
                className: "ft-c-16 score"
            }, a.hs)), null != a.as && (t = React.createElement("td", {
                className: "ft-c-16 score"
            }, a.as)), React.createElement("table", {
                className: "lht-1p4"
            }, React.createElement("tbody", null, React.createElement("tr", {
                className: a.hb ? "home" : ""
            }, e, React.createElement("td", {
                className: null != e ? " pd-l-10" : ""
            }, React.createElement(s.sport.team, {
                data: {
                    black: a.hb,
                    n: a.hn,
                    url: a.url
                }
            }))), React.createElement("tr", {
                className: a.ab ? "home" : ""
            }, t, React.createElement("td", {
                className: null != t ? " pd-l-10" : ""
            }, React.createElement(s.sport.team, {
                data: {
                    black: a.ab,
                    n: a.an,
                    url: a.url
                }
            })))))
        }
    }), s.sport.score = React.createClass({
        displayName: "score",
        render: function () {
            return React.createElement("td", {
                className: "t-a-l pd-l-10 ft-c-16"
            }, React.createElement("div", {
                className: "pd-t-1 pd-b-3"
            }, this.props.score))
        }
    }), s.sport.score.netSport = React.createClass({
        displayName: "netSport",
        render: function () {
            var e = this.props.data,
                t = e.sb,
                a = e.sid,
                c = e.eid,
                n = [];
            if (null == t) return React.createElement("td", {
                className: "ft-c-16 t-a-r" + (e.topBorder ? " topBorder" : " ")
            }, React.createElement("div", {
                className: "pd-r-10"
            }, l.LiveText));
            if (3 == a)
                for (var r = 0; r < t.ps.length; r++) {
                    var i = c + "_ns_" + r;
                    n.push(React.createElement(s.sport.score.netSport.scoreItem, {
                        key: i,
                        data: t.ps[r]
                    }))
                } else {
                    var i = c + "_ns_ft";
                    n.push(React.createElement(s.sport.score.netSport.scoreItem, {
                        key: i,
                        data: t.ft
                    })), i = c + "_ns_c", n.push(React.createElement(s.sport.score.netSport.scoreItem, {
                        key: i,
                        data: t.ps.length > 0 ? t.ps[0] : null
                    }))
                }
            return React.createElement("td", {
                className: "ft-c-23 t-a-r" + (e.topBorder ? " topBorder" : ""),
                rowSpan: "2"
            }, n)
        }
    }), s.sport.score.netSport.scoreItem = React.createClass({
        displayName: "scoreItem",
        render: function () {
            var e = this.props.data;
            return null == e ? React.createElement("div", null) : React.createElement("div", {
                className: "dsp-iblk scoreRow" + (e.ic ? " ft-c-16" : "")
            }, React.createElement("div", null, e.h), React.createElement("div", null, e.a))
        }
    }), s.sport.team = React.createClass({
        displayName: "team",
        render: function () {
            var e = this.props.data;
            return React.createElement("div", {
                className: "ft-c-" + (e.black ? 4 : 25)
            }, e.n)
        }
    }), s.sport.periodAndTime = React.createClass({
        displayName: "periodAndTime",
        mixins: [s.Utility.timer],
        render: function () {
            var e, t, a, c, n, r = this.props.data;
            if (r.isInplay) r.showScore ? (e = React.createElement("div", {
                title: this._getLongPeriod(r.period)
            }, this._getShortPeriod(r.period)), r.time && "" != r.time && (t = 2 == r.sid ? React.createElement("div", null, r.time) : 14 == r.sid ? React.createElement("div", null, "" != r.time ? r.time.split(":")[0] + "'" : r.time) : React.createElement(s.sport.iptime, {
                canTick: utility.canTick(r.sid),
                data: {
                    class: "",
                    t: r.time
                }
            }))) : 18 == r.sid ? (r.period && (e = React.createElement("div", null, "i1" == r.period ? l.Innings1 : l.Innings2)), null != r.h && null != r.a && (t = React.createElement("div", {
                className: "ft-c-16"
            }, r.h + "-" + r.a)), null == e && null == t && (a = React.createElement("div", {
                className: "ft-c-16"
            }, l.LiveText))) : 19 != r.sid && (a = React.createElement("div", {
                className: "ft-c-16"
            }, l.LiveText));
            else if (r.isSS) {
                var i = parseFloat(r.mts);
                n = React.createElement("div", {
                    className: "dark ft-c-16"
                }, i + (1 == i ? " " + l.HP_Min : " " + l.HP_Mins))
            } else c = React.createElement("div", null, this._getEventDateForPreStart(r.edt)), n = React.createElement("div", null, this._getEventStartTime(r.edt));
            return React.createElement("td", {
                className: "ft-c-23" + (r.topBorder ? " topBorder" : "")
            }, a, e, t, c, n)
        }
    }), s.sport.baseBallPeriod = React.createClass({
        displayName: "baseBallPeriod",
        render: function () {
            var e = this.props.data;
            return React.createElement("div", {
                className: classNames("dsp-iblk", {
                    firsthalf: "0" == e.s || 2 == e.s,
                    secondhalf: 1 == e.s,
                    "mg-r-6": this.props.hasTV,
                    "ft-c-14": !this.props.showinInplay
                })
            }, React.createElement("span", {
                className: "t-va-m mg-r-4"
            }, e.cp.substr(1)), React.createElement("span", {
                className: "icon-current fts-8 t-va-m"
            }))
        }
    }), s.sport.odds = React.createClass({
        displayName: "odds",
        mixins: [s.Utility.oddsBtn],
        render: function () {
            var e = this.props.data;
            if (!e.odds || 0 == parseFloat(e.odds)) return React.createElement("div", {
                className: "odds-container"
            }, React.createElement("div", {
                className: "OddsWrapper"
            }, React.createElement("span", {
                className: "odds singleOdds locked",
                dangerouslySetInnerHTML: {
                    __html: "&nbsp;"
                }
            })));
            var t, a;
            e.OU && "" != e.OU && (t = React.createElement("span", {
                className: "ou ft-c-24 fontWeight-normal"
            }, e.OU));
            var l = "odds";
            e.odds && e.hdp && (null == e.chdp || "" != e.chdp) ? a = React.createElement("span", {
                className: "upInt dsp-blk ft-c-16 fontWeight-normal"
            }, t, React.createElement("span", null, null == e.chdp ? e.hdp : e.chdp)) : l += " singleOdds", e.odds < 0 && (l += " negOdds");
            var c = null;
            _.includes(e.oddsUp, e.sid) ? c = "oddsUp" : _.includes(e.oddsDown, e.sid) && (c = "oddsDown");
            var s = ["OddsWrapper"];
            return e.isHL && s.push("selected"), null != c && s.push(c), React.createElement("div", {
                className: "odds-container",
                title: e.ttp
            }, React.createElement("div", {
                className: s.join(" ")
            }, React.createElement("span", {
                onClick: this._addSelection,
                className: l
            }, a, e.odds)))
        }
    }), s.sport.oddsLock = React.createClass({
        displayName: "oddsLock",
        render: function () {
            var e = this.props.isRight;
            return React.createElement("div", {
                className: "OddsWrapper" + (e ? " float-right" : "")
            }, React.createElement("span", {
                className: "odds locked singleOdds"
            }, React.createElement("span", {
                className: "icon-Lock",
                style: this.props.style
            }), React.createElement("svg", {
                width: "37",
                height: "20",
                className: "lockedBg"
            }, React.createElement("rect", {
                width: "100%",
                height: "100%",
                fill: "url(#p1)"
            }))))
        }
    }), s.sport.oddsEmpty = React.createClass({
        displayName: "oddsEmpty",
        render: function () {
            return React.createElement("div", {
                className: "OddsWrapper dsp-iblk",
                onClick: this._handleClick
            }, React.createElement("span", {
                className: "odds odds-empty"
            }))
        },
        _handleClick: function (e) {
            e.preventDefault(), e.stopPropagation()
        }
    }), s.sport.oddsEmptyWithSpace = React.createClass({
        displayName: "oddsEmptyWithSpace",
        render: function () {
            return React.createElement("div", {
                className: "OddsWrapper dsp-iblk",
                onClick: this._handleClick
            }, React.createElement("span", {
                className: "odds odds-empty odds-no-hover"
            }, " "))
        },
        _handleClick: function (e) {
            e.preventDefault(), e.stopPropagation()
        }
    }), s.sport.morebet = React.createClass({
        displayName: "morebet",
        render: function () {
            var e = this.props.data,
                t = ["t-a-c", "bt-moreBet", "bg-c-41", "radius", "ft-c-3 ", "fts-12"];
            return null != e.height ? t.push("height-" + e.height) : t.push("height-40"), e.isMin && t.push("bt-moreBet-min"), null == e.morebetcount && t.push("empty"), 50 == e.height && t.push("lht-50"), React.createElement("div", {
                title: l.OP_ViewAllMarkets,
                onClick: this._clickMoreBet.bind(this, e.url),
                className: t.join(" ")
            }, e.morebetcount, React.createElement("span", {
                className: "icon-ArrowMoreBets"
            }))
        },
        _clickMoreBet: function (e, t) {
            Action.LoadSite(e)
        }
    }), s.sport.iptime = React.createClass({
        displayName: "iptime",
        mixins: [s.Utility.timer],
        getInitialState: function () {
            return this._defaultState()
        },
        componentDidMount: function () {
            this.props.canTick && Timer.store.Timer.listen(this._tick)
        },
        render: function () {
            var e = this.props.data;
            return React.createElement("span", {
                className: e.class
            }, this._getIPTime(e.t, this.state.elapsed))
        },
        _defaultState: function () {
            return {
                elapsed: 0
            }
        },
        _tick: function (e) {
            this.state.elapsed = e.tick, this.setState(this.state)
        }
    }), s.sport.bottomLink = React.createClass({
        displayName: "bottomLink",
        render: function () {
            return React.createElement("div", {
                onClick: this._handleClick.bind(this, this.props.url),
                className: "mg-t-6 t-a-c bt-moreBet-enlarge bg-c-27 height-40 radius ft-c-21 fts-13 pos-relative"
            }, React.createElement("span", {
                className: "bg-c-11 height-40 float-right ft-c-25 radius bt-moreBet-arrowContainer"
            }, this.props.count, React.createElement("span", {
                className: "icon-ArrowMoreBets"
            })), this.props.txt)
        },
        _handleClick: function (e, t) {
            Action.LoadSite(e)
        }
    }), s.sport.bottomLinkMultiple = React.createClass({
        displayName: "bottomLinkMultiple",
        mixins: [s.Utility.link],
        render: function () {
            var e = this.props.data,
                t = this.props.ec;
            if (0 == e.c.length) return null;
            var a = e.or ? 4 : 3,
                c = e.c.slice(0, a),
                n = this._createLinkCellProps,
                r = c.map(function (t) {
                    return n(e.k, t)
                }),
                i = null;
            if (!e.or)
                if (1 == e.k) {
                    var o, d, m = null != e.tec ? e.tec : null != e.tmec ? e.tmec : 0;
                    o = null != e.tec ? l.HP_TodayMatches : null != e.tmec ? l.HP_TomorrowMatches : null, d = null != e.tec ? this._getFootballTodayLink() : null != e.tmec ? this._getFootballTomorrowLink() : null, null != o && (i = {
                        n: o,
                        ec: m,
                        link: d
                    })
                } else i = {
                    n: l.HP_AllMatches,
                    ec: t,
                    link: this._getSportLink(!1, e.k)
                };
            null != i && (r = [i].concat(r)), r = _.chunk(r, 2);
            for (var p = [], h = 0; h < r.length; h++) {
                var u;
                r[h].length > 1 && (u = React.createElement(s.sport.linkCell, {
                    data: r[h][1]
                })), p.push(React.createElement("tr", {
                    key: "blm_" + e.k + "_" + h
                }, React.createElement(s.sport.linkCell, {
                    data: r[h][0],
                    odd: !0
                }), u)), u = null
            }
            return React.createElement("table", {
                className: "tb-featureEvent odds-large t-a-c odds-large"
            }, React.createElement("colgroup", null, React.createElement("col", {
                className: "col-50Percent"
            }), React.createElement("col", {
                className: "col-50Percent"
            })), React.createElement("tbody", {
                className: "fts-13"
            }, p))
        },
        _createLinkCellProps: function (e, t) {
            return {
                n: t.n,
                ec: t.ec,
                link: this._getCompetitionLink(e, t.k)
            }
        }
    }), s.sport.linkCell = React.createClass({
        displayName: "linkCell",
        render: function () {
            var e = this.props.data;
            return React.createElement("td", {
                className: "pd-t-6" + (this.props.odd ? " pd-r-3" : " pd-l-3")
            }, React.createElement("div", {
                className: "dsp-tb ",
                onClick: this._handleClick
            }, React.createElement("div", {
                className: "t-va-m pd-l-10 t-a-l bt-moreBet-enlarge bg-c-27 height-40 radius ft-c-25 fts-12 dsp-tbcl  pd-r-60 pos-relative"
            }, React.createElement("span", {
                className: " bg-c-11 height-40 float-right ft-c-25 radius bt-moreBet-arrowContainer t-a-c pos-absolute fontWeight-bold"
            }, e.ec, React.createElement("span", {
                className: "icon-ArrowMoreBets"
            })), React.createElement("table", {
                className: "width-100p height-40 lht-1e"
            }, React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", null, e.n)))))))
        },
        _handleClick: function () {
            Action.LoadSite(this.props.data.link)
        }
    }), s.epmSection = React.createClass({
        displayName: "epmSection",
        render: function () {
            var e = this,
                t = this.props.data,
                a = [],
                l = [];
            return t.map(function (e, t) {
                t < 3 ? a.push(e) : l.push(e)
            }), React.createElement("div", {
                className: "radius bg-c-1 pd-6 mg-t-10 in-play"
            }, React.createElement(s.header, {
                isInplay: !1,
                isEPM: !0
            }), React.createElement("div", null, a.map(function (t, a) {
                var l = {
                    sport: t,
                    extraData: e.props.extraData
                };
                return React.createElement(s.epmSection.sport, {
                    key: "epmsec_sport_" + t.k,
                    data: l,
                    sportIndex: a
                })
            })), l.length > 0 ? React.createElement(s.epmSection.otherSports, {
                sports: l
            }) : null)
        },
        _toggleContent: function (e, t) {
            var a = this.props.data;
            (e && a.hl.length > 0 || !e && a.ss.length > 0) && Action.Homepage.toggleSportsContent(e)
        }
    }), s.epmSection.otherSports = React.createClass({
        displayName: "otherSports",
        render: function () {
            var e = this.props.sports,
                t = [],
                a = [];
            e.map(function (e, l) {
                l % 2 == 0 ? t.push(e) : a.push(e)
            });
            for (var c = t.length >= a.length ? t.length : a.length, n = [], r = 0; r < c; r++) n.push(React.createElement("tr", null, React.createElement(s.epmSection.otherSports.sportBox, {
                sport: t[r]
            }), React.createElement(s.epmSection.otherSports.sportBox, {
                sport: a[r]
            })));
            return React.createElement("div", {
                className: "pd-t-5"
            }, React.createElement("table", {
                className: "tb-featureEvent odds-large t-a-c odds-large topBorder_2px"
            }, React.createElement("colgroup", null, React.createElement("col", {
                className: "col-50Percent"
            }), React.createElement("col", {
                className: "col-50Percent"
            })), React.createElement("thead", null, React.createElement("tr", {
                className: "ft-c-16 fts-15"
            }, React.createElement("th", {
                className: "t-a-l pd-l-10 pd-t-15 pd-b-10 sportName",
                colSpan: "3"
            }, l.LP_OtherSports))), n))
        }
    }), s.epmSection.otherSports.sportBox = React.createClass({
        displayName: "sportBox",
        render: function () {
            var e = this,
                t = this.props.sport;
            if (!t) return React.createElement("td", {
                className: "pd-t-6 pd-r-3"
            });
            var a = (t.k, t.n);
            return React.createElement("td", {
                className: "pd-t-6 pd-r-3",
                onClick: function () {
                    return e._handleClick()
                }
            }, React.createElement("div", {
                className: "dsp-tb "
            }, React.createElement("div", {
                className: "t-va-m pd-l-10 t-a-l bt-moreBet-enlarge bg-c-27 height-40 radius ft-c-25 fts-12 dsp-tbcl  pd-r-60 pos-relative"
            }, React.createElement("span", {
                className: " bg-c-11 height-40 float-right ft-c-25 radius bt-moreBet-arrowContainer t-a-c pos-absolute fontWeight-bold"
            }, React.createElement("span", {
                className: "float-right fts-18 ft-c-25 icon-8 pd-r-15 pd-t-10"
            })), React.createElement("table", {
                className: "width-100p height-40 lht-1e"
            }, React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", {
                className: "fts-13 fontWeight-bold uppercase"
            }, a)))))))
        },
        _handleClick: function () {
            var e = Router.epm(this.props.sport.k);
            Action.LoadSite(e)
        }
    }), s.epmSection.sport = React.createClass({
        displayName: "sport",
        render: function () {
            var e = this.props.data,
                t = e.sport,
                a = e.extraData,
                c = t.c,
                n = t.en,
                r = t.k,
                i = t.n,
                o = t.ec,
                d = this.props.sportIndex,
                m = 0 === d ? 6 : 4,
                p = 0,
                h = c.filter(function (e, t) {
                    var a = !1;
                    return a = !(p >= m), e.e.map(function (e) {
                        e.show = !(p >= m);
                        var t = e["e-o"];
                        t && t.length > 0 && (t.map(function (e) {
                            return p++, e.mlIndex = p, e
                        }), e["e-o"] = t.filter(function (e) {
                            return e.mlIndex <= m
                        }))
                    }), e.e = e.e.filter(function (e) {
                        return e.show
                    }), a
                }),
                u = h.map(function (e) {
                    var t = {
                        comp: e,
                        extraData: a
                    };
                    return React.createElement(s.epmSection.competition, {
                        key: "epmsec_comp_" + e.k,
                        data: t,
                        sportId: r
                    })
                });
            return React.createElement("div", {
                className: 0 !== d ? " topBorder pd-t-5" : ""
            }, React.createElement("table", {
                className: "tb-featureEvent odds-large t-a-c odds-large mg-t-10"
            }, React.createElement("colgroup", null, React.createElement("col", null), React.createElement("col", null), React.createElement("col", {
                className: "col-fixed30"
            }), React.createElement("col", {
                className: "col-fixedodds"
            }), React.createElement("col", {
                className: "col-fixedodds"
            }), React.createElement("col", {
                className: "col-fixed51"
            })), React.createElement("thead", null, React.createElement("tr", {
                className: "ft-c-16 fts-15"
            }, React.createElement("th", {
                className: "t-a-l pd-l-10 sportName",
                colSpan: "3"
            }, i), React.createElement("th", {
                className: "fts-12 ft-c-16"
            }, l.OP_Was), React.createElement("th", {
                className: "fts-12 ft-c-25"
            }, l.OP_Now), React.createElement("th", {
                className: "t-a-c"
            }, React.createElement("div", {
                className: "fts-27 ft-c-26 icon-" + r
            })))), u), React.createElement(s.sport.bottomLink, {
                txt: l.EPM.EPM_Sport_Available.replace("{sport}", i),
                count: o,
                url: Router.epm(n)
            }))
        }
    }), s.epmSection.competition = React.createClass({
        displayName: "competition",
        mixins: [s.Utility.odds],
        render: function () {
            var e = this,
                t = this.props.sportId,
                a = this.props.data,
                l = a.comp,
                c = a.extraData,
                s = l.e,
                n = l.n,
                r = l.k,
                i = s.map(function (a, l) {
                    var s = {
                        epmLink: Router.epm(t, r),
                        evt: a,
                        evtIndex: l,
                        extraData: c
                    };
                    return e._getEventContent(s)
                });
            return React.createElement("tbody", {
                className: "fts-13"
            }, React.createElement("tr", {
                className: "ft-c-16 fts-13"
            }, React.createElement("th", {
                className: "t-a-l pd-l-10 sportName",
                colSpan: "6"
            }, n)), i)
        },
        _getEventContent: function (e) {
            var t = this,
                a = e.evt,
                l = e.epmLink,
                n = e.evtIndex,
                r = e.extraData,
                i = a["e-o"],
                o = (a.iscc, a.k),
                d = [];
            return i.map(function (e, i) {
                var m = {
                    isFirst: 0 === n && 0 === i,
                    name: e.mn
                };
                d.push(React.createElement(s.epmSection.marketlineHeader, c({
                    key: "epmsec_" + o + "_ml_" + e.mn + "_" + i
                }, m))), e.o && e.o.map(function (e) {
                    var c = t._getEpmOddsItem(a, e),
                        n = _.assign(t._getBaseOddsProp(a, !1), c[0]),
                        i = {
                            sel: e,
                            extraData: r
                        };
                    d.push(React.createElement(s.epmSection.selectionRow, {
                        key: "epmsec_" + o + "_sel_" + e.id,
                        data: i,
                        oddsProps: n,
                        epmLink: l
                    }))
                })
            }), d
        }
    }), s.epmSection.marketlineHeader = React.createClass({
        displayName: "marketlineHeader",
        render: function () {
            var e = this.props,
                t = e.isFirst,
                a = e.name;
            return React.createElement("tr", {
                className: "ft-c-23 fts-13"
            }, React.createElement("th", {
                className: "t-a-l pd-l-10" + (t ? "" : " topBorder pd-t-5"),
                colSpan: "6"
            }, a))
        }
    }), s.epmSection.selectionRow = React.createClass({
        displayName: "selectionRow",
        getInitialState: function () {
            return {
                showInfo: !1
            }
        },
        render: function () {
            var e = this,
                t = this.props.epmLink,
                a = this.props.data,
                l = a.sel,
                c = (a.extraData, l.dt),
                n = l.id,
                r = l.lo,
                i = (l.o, l.ril),
                o = l.dil,
                d = l.iscc,
                m = this.state.showInfo,
                p = [],
                h = [];
            return o && o.map(function (t, a) {
                var l = (a + 1) % 2 == 0,
                    s = e._getEpmDisplayName(c, t);
                l ? h.push({
                    originName: t,
                    dislpayName: s
                }) : p.push({
                    originName: t,
                    dislpayName: s
                })
            }), React.createElement("tr", {
                className: "tr-outright selection"
            }, React.createElement("td", {
                className: "pd-0 pd-l-10 ft-c-25 t-a-l"
            }, p.map(function (e, t) {
                var a = e.originName,
                    l = e.dislpayName;
                return React.createElement("div", {
                    key: "epmsec_sel_" + n + "_left_" + a + "_" + t,
                    className: "rightBorder_lv4 pd-r-10"
                }, l)
            })), React.createElement("td", {
                className: "pd-0 pd-l-10 ft-c-25 t-a-l"
            }, h.map(function (e, t) {
                var a = e.originName,
                    l = e.dislpayName;
                return React.createElement("div", {
                    key: "epmsec_sel_" + n + "_right_" + a + "_" + t,
                    className: "pd-r-10"
                }, " ", l)
            }), p.length !== h.length ? React.createElement("div", {
                className: "pd-t-12"
            }) : null), React.createElement("td", {
                className: "pd-0 t-a-c epm tb-featureEvent"
            }, React.createElement("span", {
                className: "icon icon-i-s ft-c-22 bg-c-57",
                onMouseEnter: function () {
                    return e._handleMouseEvent(!0)
                },
                onMouseLeave: function () {
                    return e._handleMouseEvent(!1)
                }
            }), m ? React.createElement("div", {
                className: "overlayContainer selected pos-absolute"
            }, React.createElement("div", {
                className: "tickContainer"
            }, React.createElement("span", {
                className: "tick"
            })), React.createElement("div", {
                className: "overlay"
            }, React.createElement("div", {
                className: "br-c-1 bg-c-55 fts-13"
            }, i && i.map(function (t, a) {
                var l = e._getReferDetailName(t.isor, t.rn);
                return [React.createElement("div", {
                    key: "epmsec_" + n + "_ril_" + t.sn + "_" + a,
                    className: "bold ft-c-25 t-a-l" + (0 !== a ? " pd-t-5" : "")
                }, t.sn), d ? React.createElement("div", {
                    key: "epmsec_" + n + "_ril_" + t.cn + "_" + a,
                    className: "ft-c-22 t-a-l"
                }, React.createElement("span", {
                    className: "mg-r-6"
                }, t.cn)) : null, React.createElement("div", {
                    className: "ft-c-22 t-a-l",
                    key: "epmsec_" + n + "_ril_" + t.rn + "_" + a
                }, l, React.createElement("span", {
                    className: "mg-r-5"
                }, ","), React.createElement("span", {
                    className: "mg-r-10"
                }, t.rd), React.createElement("span", null, t.rt))]
            })))) : null), React.createElement("td", {
                className: "pd-0 t-a-c"
            }, React.createElement("span", {
                className: "fontWeight-bold strike"
            }, r)), React.createElement("td", {
                className: "pd-t-10 pd-b-10"
            }, React.createElement(s.sport.odds, {
                data: this.props.oddsProps
            })), React.createElement("td", {
                className: "t-a-r pd-t-10 pd-b-10",
                onClick: function () {
                    return Action.LoadSite(t)
                }
            }, React.createElement(s.moreBetEmptyBtn, null)))
        },
        _getEpmDisplayName: function (e, t) {
            arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
            switch (e) {
                case 1:
                    var a = t.split("-v-");
                    return a.length < 2 ? null : React.createElement("div", null, a[0], React.createElement("span", {
                        className: "ft-c-16 mg-r-6 mg-l-6"
                    }, "v"), a[1]);
                case 2:
                case 3:
                    return t
            }
        },
        _getReferDetailName: function (e, t) {
            if (e) return React.createElement("span", {
                className: "mg-r-6"
            }, t);
            var a = t.split("-v-");
            return a.length < 2 ? null : [React.createElement("span", {
                className: "mg-r-6"
            }, a[0]), React.createElement("span", {
                className: "mg-r-6 ft-c-16"
            }, "v"), React.createElement("span", null, a[1])]
        },
        _handleMouseEvent: function (e) {
            this.setState({
                showInfo: e
            })
        }
    }), s.moreBetEmptyBtn = React.createClass({
        displayName: "moreBetEmptyBtn",
        shouldComponentUpdate: function () {
            return !1
        },
        render: function () {
            return React.createElement("div", {
                className: "t-a-c bg-c-41 radius ft-c-3 bt-moreBet bt-moreBet-min"
            }, React.createElement("span", {
                className: "icon-ArrowMoreBets empty"
            }))
        }
    }), e.exports = s
}, function (e, t, a) {
    e.exports = a(3)
}, function (e, t, a) {
    "use strict";
    var l = a(4),
        c = a(5),
        s = a(6),
        n = (a(8), a(9), a(10), a(11), a(12), a(13), a(14)),
        r = a(15),
        i = a(16);
    React.render(React.createElement(n, null), document.getElementById("fullScreenBlock")), React.render(React.createElement(c, null), document.getElementById("HP")), React.render(React.createElement(l, null), document.getElementById("AMP")), React.render(React.createElement(s, null), document.getElementById("right-panel")), React.render(React.createElement(r, null), document.getElementById("popup")), React.render(React.createElement(i, null), document.getElementById("notify"));
    LPM.render("LeftPanel", document.getElementById("left-panel"))
}, function (module, exports, __webpack_require__) {
    "use strict";
    var _extends = Object.assign || function (e) {
            for (var t = 1; t < arguments.length; t++) {
                var a = arguments[t];
                for (var l in a) Object.prototype.hasOwnProperty.call(a, l) && (e[l] = a[l])
            }
            return e
        },
        Homepage = __webpack_require__(1),
        AllMarketPage = React.createClass({
            displayName: "AllMarketPage",
            getInitialState: function () {
                return {
                    data: AMStore.getAMData(),
                    showMoreEventIds: AMStore.getShowMoreEventIds(),
                    filterParam: AMStore.getFilterParam(),
                    showOddsTypeDDL: AMStore.chkShowOddsTypeDDL(),
                    showMyMarkets: AMStore.chkShowMyMarkets(),
                    oddsChange: AMStore.getOddsChange(),
                    oddsType: AMStore.getOddsType(),
                    elapsed: AMStore.getElapsed()
                }
            },
            componentDidMount: function () {
                AMStore.addUpdateListener(this._onUpdate), setTimeout(function () {
                    ScrollerBar.initScrollbarStatus()
                }, 50)
            },
            componentDidUpdate: function () {
                0 != this.state.data.v && 2 == mpc.pv && (Action.ProcessingFinish(), setTimeout(function () {
                    ScrollerBar.initScrollbarStatus(), AMStore.getFirstLoad() && (AMStore.setFirstLoad(!1), ScrollerBar.scrollToTop())
                }, 50))
            },
            statics: _.assign({}, AllMarketUtility),
            render: function () {
                if (0 == this.state.data.v || 2 != mpc.pv) return null;
                var e, t = this.state.data.d.k,
                    a = this.state.data.d.c[0].e[0].k,
                    c = this.state.data.d.c[0].e[0].pk,
                    s = this.state.data.d.c[0].e[0].i[0],
                    n = this.state.data.d.c[0].e[0].i[1],
                    r = this.state.data.d.c[0].e[0].i[10],
                    i = this.state.data.d.c[0].e[0].i[11],
                    o = AMStore.getHighlightIds(),
                    d = this.state.oddsChange,
                    m = this.state.oddsType,
                    p = this.state.showMoreEventIds,
                    h = this.state.filterParam,
                    u = "inplay" == this.state.data.d.tn.split(":")[1],
                    E = this.state.data.d.c[0].e[0].i[37],
                    R = "" != this.state.data.d.c[0].e[0].i[7] && uv.login,
                    g = this.state.data.d.c[0].e[0].ibs && this.state.data.d.c[0].e[0].ibsc && "" == this.state.data.d.c[0].e[0].i[7],
                    f = {
                        sn: this.state.data.d.n,
                        sid: t,
                        eid: a,
                        peid: c,
                        cn: this.state.data.d.c[0].n,
                        hn: s,
                        an: n,
                        ip: u,
                        ibs: this.state.data.d.c[0].e[0].ibs,
                        isShowTv: R,
                        isShowBG: g,
                        lsid: this.state.data.d.c[0].e[0].i[7],
                        pvdr: this.state.data.d.c[0].e[0].pvdr,
                        showOddsTypeDDL: this.state.showOddsTypeDDL,
                        oddsType: m
                    },
                    v = _.filter(_.map(this.state.data.d.c[0].e[0].o, function (e, a) {
                        if (void 0 === e.f && "" != h.filteredType || "" != h.filteredType && -1 == e.f.indexOf(h.filteredType)) return null;
                        var l = {
                            sID: t,
                            homeName: s,
                            awayName: n,
                            homeScore: r,
                            awayScore: i,
                            childHomeScore: e.scoh,
                            childAwayScore: e.scoa,
                            childEventName: void 0 === e.cn || "" == e.cn ? "" : e.cn,
                            pretermName: AllMarketUtility.getPretermName(e.mt, e.ctid, t),
                            betTypeName: AllMarketUtility.getBetTypeName(e.mt, e.ctid, e.n, t),
                            period: AllMarketUtility.getPeriod(e.mt, t),
                            inPlay: u,
                            market: e,
                            highLightOdds: o,
                            oddsChange: d,
                            oddsType: m,
                            showMoreEventIds: p,
                            bestOf: E,
                            isMyMk: !1
                        };
                        return React.createElement(AllMarketPage.Market, {
                            key: "m" + a,
                            data: l
                        })
                    }), null),
                    N = _.map(this.state.data.d.c[0].e[0].myo, function (e, a) {
                        var l = {
                            sID: t,
                            homeName: s,
                            awayName: n,
                            homeScore: r,
                            awayScore: i,
                            childHomeScore: e.scoh,
                            childAwayScore: e.scoa,
                            childEventName: void 0 === e.cn || "" == e.cn ? "" : e.cn,
                            pretermName: AllMarketUtility.getPretermName(e.mt, e.ctid, t),
                            betTypeName: AllMarketUtility.getBetTypeName(e.mt, e.ctid, e.n, t),
                            period: AllMarketUtility.getPeriod(e.mt, t),
                            inPlay: u,
                            market: e,
                            highLightOdds: o,
                            oddsChange: d,
                            oddsType: m,
                            showMoreEventIds: p,
                            bestOf: E,
                            isMyMk: !0
                        };
                        return React.createElement(AllMarketPage.Market, {
                            key: "mm" + a,
                            data: l
                        })
                    });
                if (this.state.data.d.c[0].e[0].eps) {
                    var b = this.state.data.d.c[0].e[0].eps;
                    e = {
                        sID: t,
                        eventId: b.k,
                        parentEventId: b.k,
                        childEventTypeId: null,
                        score: r + ":" + i,
                        child_score: ":",
                        isAH: !1,
                        homeName: s,
                        awayName: n,
                        inPlay: u,
                        market: b,
                        odds: b.o,
                        highLightOdds: o,
                        oddsChange: d,
                        oddsType: m,
                        showMoreEventIds: p
                    }
                }
                var y = {
                    event: this.state.data.d.c[0].e[0],
                    sportID: this.state.data.d.k,
                    inPlay: u,
                    competitionName: this.state.data.d.c[0].n,
                    elapsed: this.state.elapsed,
                    marketsCount: this.state.data.d.c[0].e[0].o.length + this.state.data.d.c[0].e[0].myo.length + (this.state.data.d.c[0].e[0].o.eps ? this.state.data.d.c[0].e[0].eps.length : 0)
                };
                return React.createElement("div", {
                    className: "moreBet bg-c-16 mg-b-1" + (0 == this.state.data.v || 2 != mpc.pv ? " hidden" : "")
                }, React.createElement("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    width: "37",
                    height: "20",
                    className: "lockedBg_svg",
                    dangerouslySetInnerHTML: {
                        __html: '<defs><pattern id="p1" patternUnits="objectBoundingBox" width=".1" height=".1" patternTransform="rotate(45)"><rect width="3" height="100" fill="#000" x="0" y="0" opacity=".06"></rect></pattern></defs>'
                    }
                }), React.createElement(AllMarketPage.Header, {
                    hp: f
                }), React.createElement(AllMarketPage.ScoreBoard, {
                    sbParam: y
                }), React.createElement(AllMarketPage.FilterButtons, {
                    filters: this.state.data.d.fb,
                    sportID: this.state.data.d.k,
                    inPlay: u,
                    filterParam: this.state.filterParam
                }), React.createElement(AllMarketPage.MyMarketList, {
                    MyMarkets: N,
                    isShow: this.state.showMyMarkets
                }), React.createElement("div", {
                    className: "pd-t-10 pd-b-11 pd-r-10 pd-l-10 bg-c-13 topBorder_lv1 overflow-hidden mg-t-2 fontWeight-bold"
                }, React.createElement("span", {
                    className: "dsp-iblk fts-16 ft-c-3 lht-14 uppercase"
                }, function (e, t) {
                    if (void 0 === e || "" == t) return l.MB_AllMarkets;
                    var a = _.pluck(_.filter(e, "ex", t), "tx");
                    return 1 == a.length ? a[0] : l.MB_AllMarkets
                }(this.state.data.d.fb, this.state.filterParam.filteredType))), React.createElement("div", {
                    className: "bg-c-14 fts-13 ft-c-27 pd-t-10 pd-b-10 pd-l-10 pd-r-10 t-a-c" + (v.length > 0 ? " hidden" : "")
                }, React.createElement("span", {
                    className: "t-va-m"
                }, 0 == v.length && 0 == N.length ? l.Odds_EventClosed : l.MB_AllAddedToMyMarkets)), React.createElement("div", {
                    className: "sportsTable"
                }, React.createElement(AllMarketPage.Market.MarketType.EPS, {
                    data: e
                }), v))
            },
            _onUpdate: function () {
                this.setState({
                    data: AMStore.getAMData(),
                    showMoreEventIds: AMStore.getShowMoreEventIds(),
                    filterParam: AMStore.getFilterParam(),
                    showOddsTypeDDL: AMStore.chkShowOddsTypeDDL(),
                    showMyMarkets: AMStore.chkShowMyMarkets(),
                    oddsChange: AMStore.getOddsChange(),
                    oddsType: AMStore.getOddsType(),
                    elapsed: AMStore.getElapsed()
                })
            }
        });
    AllMarketPage.Neutral = React.createClass({
        displayName: "Neutral",
        render: function () {
            return React.createElement("span", {
                title: l.neut
            }, React.createElement("span", {
                className: "neutral fts-12 t-va-m dsp-iblk"
            }, React.createElement("span", {
                className: "icon-Neutralbg"
            }), React.createElement("span", {
                className: "icon-NeutralN"
            })))
        }
    }), AllMarketPage.Utility = {
        odds: {
            oddsComponentUP_DWN: function (e, t) {
                var a, l, c, s, n = AMStore.getOddsChange();
                if (!(t.data && (l = t.data.value) && l[0] && "" != l[0])) return n;
                var r = (c = "h" == l[0].substr(0, 1)) ? 2 : 0,
                    i = c ? 3 : 1,
                    a = e.data.value;
                return e.data.ot == t.data.ot && a[0] == l[0] && "0.00" != l[i] && "0.00" != a[i] && "c" != l[i] && "c" != a[i] && (1 == (s = oddsUtil.getValueIndicator(+l[i], +a[i])) ? n.Up.push(l[r]) : 2 == s && n.Down.push(l[r])), n
            },
            addSelection: function (e, t, a, l, c, s, n, r) {
                r && (r.preventDefault(), r.stopPropagation()), _.contains(["0.00", "c"], a) || (Action.AllMarket.highlightOdds(e), Action.RightPanel.addSelection(e, t, a, l, c, s, n))
            },
            componentWillReceiveProps: function (e) {
                this.setState({
                    oddsChange: this.oddsComponentUP_DWN(e, this.props)
                })
            },
            getUpDownflag: function (e, t) {
                var a = 0;
                return "" != t && (_.contains(e.Up, t) && (a = 1), _.contains(e.Down, t) && (a = -1)), a
            }
        },
        market: {
            addSelection: function (e, t) {
                t.preventDefault(), t.stopPropagation();
                var a, l, c = e.value[0] && "h" == e.value[0].substr(0, 1);
                e.value[0] && "0.00" != (a = c ? e.value[3] : e.value[1]) && (Action.AllMarket.highlightOdds(l = e.value[0].substr(1)), Action.RightPanel.addSelection(l, e.eventId, a, c ? e.value[1] : null, e.score, e.inPlay, e.parentEventId))
            },
            isOddsUnaval: function (e) {
                var t = e[1] ? e.length > 3 ? e[3] : e[1] : "";
                return "" == t || "0.00" == t || "c" == t || 0 == +t
            },
            getSnameOrMname: function (e, t, a) {
                var l = e.split(a);
                if (!(l.length > 1)) return e;
                switch (t) {
                    case 0:
                        return l[0];
                    case 1:
                        return l[1];
                    case 2:
                        return l[l.length - 1]
                }
            },
            deepLinkOnClicked: null
        }
    }, AllMarketPage.Header = React.createClass({
        displayName: "Header",
        render: function () {
            var e = this.props.hp,
                t = {};
            if (e.isShowTv) {
                var a = e.ip ? this._playTV.bind(this, e) : null;
                t = React.createElement("span", {
                    className: "tv dsp-iblk bg-c-12 radius iconbg-s t-va-m mg-r-10",
                    title: utility.replaceTooltipBu(e.ip ? l.LP_LiveStreamInplay : l.LP_LiveStream),
                    onClick: a
                }, React.createElement("span", {
                    className: "dsp-iblk icon-TV2 fts-12 wh-ht-22 lht-22"
                }))
            } else if (e.isShowBG) {
                var c = e.ip ? this._playBG.bind(this, e) : null;
                t = React.createElement("span", {
                    className: "pitch dsp-iblk bg-c-12 radius iconbg-s t-va-m mg-r-10",
                    title: e.ip ? l.OP_188LiveMatchViewAvailable : l.OP_188MatchLiveMatchViewAvailableInplay,
                    onClick: c
                }, React.createElement("span", {
                    className: "dsp-iblk icon icon-Pitch fts-15 wh-ht-22 lht-22" + (e.ip ? " green" : "")
                }))
            }
            var s = l.HH_EuroOdds_Short;
            switch (e.oddsType) {
                case 1:
                    s = l.HH_EuroOdds_Short;
                    break;
                case 2:
                    s = l.HH_HKOdds_Short;
                    break;
                case 3:
                    s = l.HH_MalayOdds_Short;
                    break;
                case 4:
                    s = l.HH_IndoOdds_Short
            }
            return React.createElement("div", {
                className: "header pd-r-10 pd-l-10 bg-c-13 topBorder_lv1"
            }, React.createElement("table", {
                className: "width-100p height-39"
            }, React.createElement("colgroup", null, React.createElement("col", {
                className: "col-fixed25"
            }), React.createElement("col", null), React.createElement("col", null)), React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", {
                className: "t-va-m"
            }, React.createElement("div", null, React.createElement("span", {
                className: "dsp-iblk icon-BackArrowWithTail fts-16 ft-c-46 lht-22 cr-pointer",
                onClick: this._goToPrevious
            }))), React.createElement("td", null, React.createElement("div", null, React.createElement("span", {
                className: "dsp-iblk fts-18 t-va-m fontWeight-bold ft-c-15 lht-14 mg-r-10 uppercase clickablespname",
                onClick: this._goToMainOdds
            }, e.ip ? l.ip : e.sn), React.createElement("span", {
                className: "dsp-iblk fts-13 t-va-b fontWeight-normal ft-c-27 lht-14 top-2 pos-relative"
            }, e.ip ? "" : e.cn))), React.createElement("td", {
                className: "t-a-r t-va-t pd-t-8"
            }, React.createElement("div", null, React.createElement("div", {
                className: "dsp-iblk"
            }, React.createElement("div", {
                className: "sortOdds fts-12 mg-r-16" + (e.showOddsTypeDDL ? "" : " collapsed"),
                onClick: this._showHideOddsTypeDDL
            }, React.createElement("span", null, l.Odds + ":"), React.createElement("span", {
                className: "sortName"
            }, s), React.createElement("span", {
                className: "pos-relative arrowWithTick"
            }, React.createElement("span", {
                className: "icon-ArrowDown t-va-m"
            }), React.createElement("span", {
                className: "tick dsp-iblk"
            })), React.createElement("div", {
                className: "dropDownContainer"
            }, React.createElement("ul", null, React.createElement("li", {
                className: 1 == e.oddsType ? "actived" : null,
                onClick: this._setOddsType.bind(this, 1)
            }, React.createElement("table", null, React.createElement("colgroup", null, React.createElement("col", null), React.createElement("col", {
                className: "col-fixed1"
            })), React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", {
                className: "pd-0"
            }, React.createElement("span", {
                className: "lht-1p1 dsp-iblk mg-t-3"
            }, l.HH_EuroOdds, React.createElement("span", null))), React.createElement("td", {
                className: "height-37"
            }))))), React.createElement("li", {
                className: 2 == e.oddsType ? "actived" : null,
                onClick: this._setOddsType.bind(this, 2)
            }, React.createElement("table", null, React.createElement("colgroup", null, React.createElement("col", null), React.createElement("col", {
                className: "col-fixed1"
            })), React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", {
                className: "pd-0"
            }, React.createElement("span", {
                className: "lht-1p1 dsp-iblk mg-t-3"
            }, l.HH_HKOdds, React.createElement("span", null))), React.createElement("td", {
                className: "height-37"
            }))))), React.createElement("li", {
                className: 3 == e.oddsType ? "actived" : null,
                onClick: this._setOddsType.bind(this, 3)
            }, React.createElement("table", null, React.createElement("colgroup", null, React.createElement("col", null), React.createElement("col", {
                className: "col-fixed1"
            })), React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", {
                className: "pd-0"
            }, React.createElement("span", {
                className: "lht-1p1 dsp-iblk mg-t-3"
            }, l.HH_MalayOdds, React.createElement("span", null))), React.createElement("td", {
                className: "height-37"
            }))))), React.createElement("li", {
                className: 4 == e.oddsType ? "actived" : null,
                onClick: this._setOddsType.bind(this, 4)
            }, React.createElement("table", null, React.createElement("colgroup", null, React.createElement("col", null), React.createElement("col", {
                className: "col-fixed1"
            })), React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", {
                className: "pd-0"
            }, React.createElement("span", {
                className: "lht-1p1 dsp-iblk mg-t-3"
            }, l.HH_IndoOdds, React.createElement("span", null))), React.createElement("td", {
                className: "height-37"
            }))))))))), React.createElement("span", {
                className: "state dsp-iblk bg-c-12 radius iconbg-s t-va-m mg-r-10",
                title: l.InfoCentre_Statistics
            }, React.createElement(AllMarketPage.Button.Stat, {
                eventId: e.eid
            })), t, React.createElement("span", {
                className: "refresh dsp-iblk bg-c-12 radius iconbg-s t-va-m",
                title: l.OP_Refresh
            }, React.createElement(AllMarketPage.Button.Refresh, null))))))))
        },
        componentDidMount: function () {
            this.addListener()
        },
        addListener: function () {
            $(document).mouseup(function (e) {
                void 0 === $(e.target).closest(".sortOdds")[0] && AMStore.chkShowOddsTypeDDL() && Action.AllMarket.showHideOddsTypeDDL(!1)
            })
        },
        _showHideOddsTypeDDL: function () {
            Action.AllMarket.showHideOddsTypeDDL()
        },
        _setOddsType: function (e, t) {
            t.preventDefault(), t.stopPropagation(), OddsHeader.setting.param.OddsType = e, OddsHeader.setting.param.IsFirstLoad = !0, utility.service("OddsService", "UpdateOddsType", OddsHeader.setting.param, "GET", function (t) {
                t.suc && (settingParam.oddsType = uv.ov = e, OddsHeader.saveToCookie(), oddsUtil.SetOddsTypeCss(), cCtrl.reloadPage())
            })
        },
        _goToPrevious: function () {
            cCtrl.goBackClosePage()
        },
        _goToMainOdds: function () {
            switch (LPM.view) {
                case 0:
                    Action.LoadSite("/" + window.global.lan + "/sports/" + selobj.sptn);
                    break;
                case 1:
                    Action.LeftPanel.inplay();
                    break;
                case 2:
                    Action.LoadSite("/" + window.global.lan + "/sports/" + selobj.sptn + "/popular/full-time-asian-handicap-and-over-under");
                case 3:
                    Action.LoadSite("/" + window.global.lan + "/sports/parlay/" + selobj.sptn)
            }
        },
        _playBG: function (e, t) {
            liveCentreControl.playIgnoreLock(e.peid, e.hn, e.an, e.sid, e.lsid, e.pvdr, uv.login), lockInfo.isLock && liveCentreControl.saveLockInfo(e.peid, e.hn, e.an, e.sid, window.global.lan, e.lsid, e.pvdr)
        },
        _playTV: function (e, t) {
            if (uv.cdbg && e.ibs || 1 == e.sid) liveCentreControl.playIgnoreLock(e.peid, e.hn, e.an, e.sid, e.lsid, e.pvdr, uv.login), lockInfo.isLock && liveCentreControl.saveLockInfo(e.peid, e.hn, e.an, e.sid, window.global.lan, e.lsid, e.pvdr);
            else {
                var a = screen.width / 2 - 405,
                    l = screen.height / 2 - 260,
                    c = "center=yes,resizable=yes,scrollbars=yes, width=810, height=520,left=" + a + ",top=" + l;
                window.open("/" + window.global.lan + "/live-streaming/" + e.eid, "stream", c)
            }
        }
    }), AllMarketPage.ScoreBoard = React.createClass({
        _getBGClass: function (e) {
            var t;
            switch (e) {
                case 1:
                    t = "sb-football";
                    break;
                case 2:
                    t = "sb-basketball";
                    break;
                case 3:
                    t = "sb-tennis";
                    break;
                case 4:
                    t = "sb-baseball";
                    break;
                case 7:
                    t = "sb-americaFootball";
                    break;
                case 9:
                    t = "sb-badminton";
                    break;
                case 13:
                    t = "sb-volleyball";
                    break;
                case 14:
                    t = "sb-rugby";
                    break;
                case 18:
                    t = "sb-cricket";
                    break;
                case 19:
                    t = "sb-beachSccore";
                    break;
                case 20:
                    t = "sb-tableTennis";
                    break;
                case 21:
                    t = "sb-snooker";
                    break;
                case 23:
                    t = "sb-eSports";
                    break;
                case 25:
                    t = "sb-darts";
                    break;
                case 26:
                    t = "sb-iceHockey";
                    break;
                case 27:
                    t = "sb-beachVolleyball";
                    break;
                default:
                    t = "sb-otherSports"
            }
            return t
        },
        render: function render() {
            var sbParam = this.props.sbParam,
                sb = React.createElement(AllMarketPage.ScoreBoardNonInplay, {
                    sbParam: sbParam
                }),
                isExpanded = !1;
            if (sbParam.inPlay) switch (sbParam.sportID) {
                case 2:
                    sb = "True" == sbParam.event.i[38] ? React.createElement(AllMarketPage.ScoreBoardInplay.Basketball, {
                        sbParam: sbParam
                    }) : React.createElement(AllMarketPage.ScoreBoardInplay.NoScoreboard, {
                        sbParam: sbParam
                    }), isExpanded = "True" == sbParam.event.i[38];
                    break;
                case 4:
                    sb = "True" == sbParam.event.i[38] ? React.createElement(AllMarketPage.ScoreBoardInplay.Baseball, {
                        sbParam: sbParam
                    }) : React.createElement(AllMarketPage.ScoreBoardInplay.NoScoreboard, {
                        sbParam: sbParam
                    }), isExpanded = "True" == sbParam.event.i[38];
                    break;
                case 3:
                case 9:
                case 13:
                case 20:
                case 27:
                    sb = "True" == sbParam.event.i[38] ? React.createElement(AllMarketPage.ScoreBoardInplay.NetSport, {
                        sbParam: sbParam
                    }) : React.createElement(AllMarketPage.ScoreBoardInplay.NoScoreboard, {
                        sbParam: sbParam
                    }), isExpanded = "True" == sbParam.event.i[38];
                    break;
                case 25:
                    sb = "True" == sbParam.event.i[38] ? React.createElement(AllMarketPage.ScoreBoardInplay.Darts, {
                        sbParam: sbParam
                    }) : React.createElement(AllMarketPage.ScoreBoardInplay.NoScoreboard, {
                        sbParam: sbParam
                    }), isExpanded = "True" == sbParam.event.i[38];
                    break;
                case 18:
                    sb = "True" == sbParam.event.i[38] ? React.createElement(AllMarketPage.ScoreBoardInplay.Cricket, {
                        sbParam: sbParam
                    }) : React.createElement(AllMarketPage.ScoreBoardInplay.NoScoreboard, {
                        sbParam: sbParam
                    }), isExpanded = "True" == sbParam.event.i[38];
                    break;
                default:
                    sb = _.contains(eval("[" + opScoreSetting + "]"), sbParam.sportID) && 2 != sbParam.sportID && 18 != sbParam.sportID && 14 != sbParam.sportID || 14 == sbParam.sportID && "True" == sbParam.event.i[38] ? React.createElement(AllMarketPage.ScoreBoardInplay, {
                        sbParam: sbParam
                    }) : React.createElement(AllMarketPage.ScoreBoardInplay.NoScoreboard, {
                        sbParam: sbParam
                    })
            }
            return React.createElement("div", {
                className: "mg-t-1" + (2 != sbParam.sportID && 4 != sbParam.sportID || "True" != sbParam.event.i[38] ? "ScoreBoardInplay" == sb.type.displayName ? " pd-b-6 pd-l-6 pd-r-6" : " pd-4" : " pd-6") + " pos-relative " + this._getBGClass(sbParam.sportID) + (isExpanded ? " expanded" : "")
            }, sb)
        }
    }, void 0), AllMarketPage.ScoreBoardInplay = React.createClass({
        displayName: "ScoreBoardInplay",
        mixins: [Homepage.Utility.timer],
        render: function () {
            var e = this.props.sbParam,
                t = e.event,
                a = t.i[0],
                c = t.i[1],
                s = t.i[10],
                n = t.i[11],
                r = t.i[8],
                i = t.i[9],
                o = t.i[35],
                d = t.i[31],
                m = "" == t.i[37] ? 0 : +t.i[37],
                p = void 0 !== t.i[5] && "" != t.i[5] && t.i[5].indexOf(":") > 0 ? t.i[5] : "",
                h = t.i[33],
                u = t.i[34],
                E = !_.contains([21, 26], +e.sportID) && "" != p && e.marketsCount > 0 ? 14 == e.sportID ? React.createElement("span", {
                    className: "ft-c-3 fts-12 time mg-l-6"
                }, "" != p ? p.split(":")[0] + "'" : p) : React.createElement("span", {
                    className: "ft-c-3 fts-12 time mg-l-6"
                }, this._getIPTime(p, e.elapsed)) : null;
            return React.createElement("span", null, React.createElement("div", {
                className: "fts-12 ft-c-3 pd-b-6 pd-t-10"
            }, React.createElement("div", {
                className: "float-right"
            }, "N" == t.g ? React.createElement(AllMarketPage.Neutral, null) : null, "" == d && 0 == m ? React.createElement("span", {
                className: "ft-c-14 fts-13 mg-l-10"
            }, l.LiveText) : "" != d ? React.createElement("span", {
                className: "ft-c-14 fts-13 t-va-m mg-l-10"
            }, AllMarketPage.getPeriod(d, e.sportID)) : 21 == e.sportID && "" != m ? React.createElement("span", {
                className: "ft-c-14 fts-13 t-va-m mg-l-10"
            }, oddsUtil.GetBestOfLocalization(m)) : React.createElement("span", {
                className: "ft-c-14 fts-13 mg-l-10"
            }, l.LiveText), E, !isNaN(parseInt(h)) && e.marketsCount > 0 ? React.createElement("span", {
                className: "ft-c-12 fts-13 mg-l-8"
            }, "[FT " + h + " - " + u + "]") : null), e.competitionName), React.createElement("div", {
                className: " pd-l-10 overflow-hidden pos-relative"
            }, React.createElement("div", {
                className: "bg_black_opty6  top-0 left-0 "
            }), React.createElement("div", {
                className: "bg_red top-0 left-0 ft-c-3 fts-14 t-a-c dsp-tbcl" + (0 == r ? " hidden" : "")
            }, React.createElement("div", {
                className: "pos-relative dsp-tb height-100p"
            }, React.createElement("div", {
                className: "dsp-tbcl t-va-m"
            }, r))), React.createElement("div", {
                className: "bg_red top-0 right-0 ft-c-3 fts-14 t-a-c dsp-tbcl t-va-m" + (0 == i ? " hidden" : "")
            }, React.createElement("div", {
                className: "pos-relative dsp-tb height-100p"
            }, React.createElement("div", {
                className: "dsp-tbcl t-va-m"
            }, i))), React.createElement("table", {
                className: "width-100p"
            }, React.createElement("colgroup", null, React.createElement("col", {
                className: "col-46Percent"
            }), React.createElement("col", {
                className: "col-fixed91"
            }), React.createElement("col", {
                className: "col-46Percent"
            })), React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", {
                className: "pd-l-10 pd-r-6 t-a-r"
            }, React.createElement("div", {
                className: "fts-15 ft-c-3 z-idx-1 pos-relative line-clamp height-2p5em pd-t-15 pd-b-16",
                title: a
            }, a)), React.createElement("td", null, React.createElement("div", {
                className: "fts-18 ft-c-3 z-idx-1 pos-relative t-a-c"
            }, React.createElement("span", {
                className: "fontWeight-bold mg-r-6 dsp-iblk width-30 t-a-r" + ("h" == o && 1 == e.sportID ? " ft-c-12" : " ft-c-14")
            }, s), React.createElement("span", {
                className: "ft-c-31 fts-12 t-va-m"
            }, "-"), React.createElement("span", {
                className: "fontWeight-bold mg-l-6 dsp-iblk width-30 t-a-l" + ("a" == o && 1 == e.sportID ? " ft-c-12" : " ft-c-14")
            }, n))), React.createElement("td", {
                className: "pd-r-10 pd-l-6 pd-r-15 t-a-l"
            }, React.createElement("div", {
                className: "fts-15 ft-c-3 z-idx-1 pos-relative t-a-l line-clamp",
                title: c
            }, c)))))))
        }
    }), AllMarketPage.ScoreBoardInplay.NetSport = React.createClass({
        displayName: "NetSport",
        render: function () {
            var e = this.props.sbParam,
                t = e.event,
                a = t.i[0],
                c = t.i[1],
                s = "" == t.i[37] ? 3 : t.i[37],
                n = void 0 === t.sb ? {} : t.sb,
                r = [],
                i = [],
                o = [],
                d = [];
            n.cp = void 0 === n.cp ? "s0" : n.cp, n.cpi = parseInt(n.cp.substr(1));
            for (var m = 1; m <= 7 - s; m++) {
                var p = r.length;
                r.push(React.createElement("col", {
                    key: "c" + p,
                    className: "col-fixed26"
                })), i.push(React.createElement("th", {
                    key: "th" + p
                }, React.createElement("div", {
                    className: "bg_black_opty75 top-0 left-0"
                }), React.createElement("span", {
                    className: "pos-relative z-idx-1"
                }))), o.push(React.createElement("td", {
                    key: "hs" + p,
                    className: "pd-t-4 pd-b-2"
                }, React.createElement("span", null))), d.push(React.createElement("td", {
                    key: "as" + p,
                    className: "pd-t-4 pd-b-2"
                }, React.createElement("span", null)))
            }
            for (var h = 1; h <= s; h++) {
                var p = r.length;
                r.push(React.createElement("col", {
                    key: "c" + p,
                    className: "col-fixed26"
                })), i.push(React.createElement("th", {
                    key: "th" + p
                }, React.createElement("div", {
                    className: "bg_black_opty75 top-0 left-0"
                }), React.createElement("span", {
                    className: "pos-relative z-idx-1"
                }, h)));
                var u = void 0 === n.ps ? {
                    h: "",
                    a: "",
                    p: "s" + h
                } : _.chain(n.ps).filter("p", "s" + h).first().value();
                void 0 === u && (u = {
                    h: "",
                    a: "",
                    p: "s" + h
                }), h > n.cpi && (u.h = "", u.a = ""), o.push(React.createElement("td", {
                    key: "hs" + p,
                    className: "pd-t-4 pd-b-2"
                }, React.createElement("span", {
                    className: "fts-13" + (u.p == n.cp ? " fontWeight-bold" : " ft-c-3")
                }, u.h))), d.push(React.createElement("td", {
                    key: "as" + p,
                    className: "pd-t-4 pd-b-2"
                }, React.createElement("span", {
                    className: "fts-13" + (u.p == n.cp ? " fontWeight-bold" : " ft-c-3")
                }, u.a)))
            }
            var E = void 0 === n.ps ? {
                h: "",
                a: "",
                p: "ft"
            } : _.chain(n.ps).filter("p", "ft").first().value();
            if (void 0 !== E) {
                var p = r.length;
                r.push(React.createElement("col", {
                    key: "c" + p,
                    className: "col-fixed48"
                })), i.push(React.createElement("th", {
                    key: "th" + p
                }, React.createElement("div", {
                    className: "bg_black_opty75 top-0 left-0"
                }), React.createElement("span", {
                    className: "pos-relative z-idx-1"
                }, 9 == e.sportID || 20 == e.sportID ? l.Results_Games : l.Results_Sets))), o.push(React.createElement("td", {
                    key: "hs" + p,
                    className: "pos-relative rightBorder_lv2 pd-t-4 pd-b-2"
                }, React.createElement("div", {
                    className: "bg_white_opty16 height-100p width-100p pos-absolute top-0 left-0 z-idx-0"
                }), React.createElement("span", {
                    className: "pos-relative z-idx-1 fts-13 fontWeight-bold"
                }, E.h))), d.push(React.createElement("td", {
                    key: "as" + p,
                    className: "pos-relative rightBorder_lv2 pd-t-4 pd-b-2"
                }, React.createElement("div", {
                    className: "bg_white_opty16 height-100p width-100p pos-absolute top-0 left-0 z-idx-0"
                }), React.createElement("span", {
                    className: "pos-relative z-idx-1 fts-13 fontWeight-bold"
                }, E.a)))
            }
            var R = void 0 === n.ps ? {
                h: "",
                a: "",
                p: "p",
                adv: -1
            } : _.chain(n.ps).filter("p", "p").first().value();
            if (void 0 !== R) {
                var p = r.length;
                r.push(React.createElement("col", {
                    key: "c" + p,
                    className: "col-fixed48"
                })), i.push(React.createElement("th", {
                    key: "th" + p,
                    className: 3 != e.sportID ? "pd-t-4 pd-b-4" : ""
                }, 3 != e.sportID ? React.createElement("div", {
                    className: "bg_black_opty75 height-100p width-100p pos-absolute top-0 left-0 z-idx-0 radius-r-t"
                }) : React.createElement("div", {
                    className: "bg_black_opty75 top-0 left-0"
                }), React.createElement("span", {
                    className: "pos-relative z-idx-1"
                }, 3 == e.sportID ? l.Results_Points : l.SB_TotalPoints))), o.push(React.createElement("td", {
                    key: "hs" + p,
                    className: "pos-relative pd-t-4 pd-b-2" + (3 != e.sportID ? "" : " rightBorder_lv2")
                }, React.createElement("div", {
                    className: "bg_white_opty16 height-100p width-100p pos-absolute top-0 left-0 z-idx-0"
                }), React.createElement("span", {
                    className: (3 == e.sportID ? "ft-c-3" : "ft-c-12 fontWeight-bold") + " pos-relative z-idx-1 fts-13"
                }, 1 == R.adv ? "A" : R.h))), d.push(React.createElement("td", {
                    key: "as" + p,
                    className: "pos-relative pd-t-4 pd-b-2" + (3 != e.sportID ? "" : " rightBorder_lv2")
                }, React.createElement("div", {
                    className: "bg_white_opty16 height-100p width-100p pos-absolute top-0 left-0 z-idx-0"
                }), React.createElement("span", {
                    className: (3 == e.sportID ? "ft-c-3" : "ft-c-12 fontWeight-bold") + " pos-relative z-idx-1 fts-13"
                }, 0 == R.adv ? "A" : R.a)))
            }
            var g = void 0 === n.ps ? {
                h: "",
                a: "",
                p: "ftg"
            } : _.chain(n.ps).filter("p", "ftg").first().value();
            if (void 0 !== g && 3 == +e.sportID) {
                var p = r.length;
                r.push(React.createElement("col", {
                    key: "c" + p,
                    className: "col-fixed48"
                })), i.push(React.createElement("th", {
                    key: "th" + p,
                    className: "pd-t-4 pd-b-4"
                }, React.createElement("div", {
                    className: "bg_black_opty75 height-100p width-100p pos-absolute top-0 left-0 z-idx-0 radius-r-t"
                }), React.createElement("span", {
                    className: "pos-relative z-idx-1"
                }, 3 == e.sportID ? l.SB_TotalGames : l.SB_TotalPoints))), o.push(React.createElement("td", {
                    key: "hs" + p,
                    className: "pos-relative pd-t-4 pd-b-2"
                }, React.createElement("div", {
                    className: "bg_white_opty16 height-100p width-100p pos-absolute top-0 left-0 z-idx-0"
                }), React.createElement("span", {
                    className: "ft-c-12 pos-relative z-idx-1 fts-13 fontWeight-bold"
                }, g.h))), d.push(React.createElement("td", {
                    key: "as" + p,
                    className: "pos-relative pd-t-4 pd-b-2"
                }, React.createElement("div", {
                    className: "bg_white_opty16 height-100p width-100p pos-absolute top-0 left-0 z-idx-0"
                }), React.createElement("span", {
                    className: "ft-c-12 pos-relative z-idx-1 fts-13 fontWeight-bold"
                }, g.a)))
            }
            return React.createElement("span", null, React.createElement("div", {
                className: "fts-13 ft-c-42 pd-t-6"
            }, e.competitionName), React.createElement("div", {
                className: "overflow-hidden pos-relative"
            }, React.createElement("table", {
                className: "width-100p pos-relative z-idx-1"
            }, React.createElement("colgroup", null, React.createElement("col", null), r), React.createElement("thead", {
                className: "fts-11 ft-c-31 t-a-c"
            }, React.createElement("tr", null, React.createElement("th", {
                className: "fts-13 t-a-l pd-t-4 pd-b-4 pos-relative t-va-bot pd-l-10"
            }, React.createElement("div", {
                className: "bg_black_opty75 height-23 width-75p bottom-0 left-0"
            }), React.createElement("div", {
                className: "bg_black_roundConner height-37 width-25p pos-absolute bottom-0 right-0 z-idx-0"
            }), React.createElement("span", {
                className: "ft-c-14 fontWeight-normal mg-r-6 pos-relative z-idx-1"
            }, AllMarketPage.getPeriod(n.cp, +e.sportID)), React.createElement("span", {
                className: "ft-c-2 fontWeight-normal pos-relative z-idx-1 mg-r-4" + (void 0 !== n.iwd && n.iwd ? "" : " hidden")
            }, l.SB_WeatherDelay), "N" == t.g ? React.createElement(AllMarketPage.Neutral, null) : null), i)))), React.createElement("div", {
                className: " pd-l-10 overflow-hidden pos-relative"
            }, React.createElement("div", {
                className: "bg_black_opty6 height-100p width-100p pos-absolute top-0 left-0 z-idx-0"
            }), React.createElement("table", {
                className: "width-100p pos-relative z-idx-1"
            }, React.createElement("colgroup", null, React.createElement("col", null), r), React.createElement("tbody", {
                className: "t-a-c ft-c-14"
            }, React.createElement("tr", null, React.createElement("td", {
                className: "t-a-l pd-t-2 pd-b-2"
            }, React.createElement("div", {
                className: "fts-15 ft-c-3  t-a-l t-va-m line-clamp"
            }, React.createElement("span", {
                className: "widthHeight-7 dsp-iblk round mg-r-10 t-va-m " + (void 0 !== n.s && 1 == n.s ? "bg-c-36" : "bg-c-24")
            }), React.createElement("span", {
                className: "t-va-m",
                title: a
            }, a))), o), React.createElement("tr", null, React.createElement("td", {
                className: "t-a-l pd-t-2 pd-b-2"
            }, React.createElement("div", {
                className: "fts-15 ft-c-3  t-a-l t-va-m line-clamp"
            }, React.createElement("span", {
                className: "widthHeight-7 dsp-iblk round mg-r-10 t-va-m " + (void 0 !== n.s && 0 == n.s ? "bg-c-36" : "bg-c-24")
            }), React.createElement("span", {
                className: "t-va-m",
                title: c
            }, c))), d)))))
        }
    }), AllMarketPage.ScoreBoardInplay.Basketball = React.createClass({
        displayName: "Basketball",
        render: function () {
            var e = this.props.sbParam,
                t = e.event,
                a = t.i[0],
                c = t.i[1],
                s = void 0 === t.i[5] || "" == t.i[5] ? "" : t.i[5].indexOf(":") > 0 ? t.i[5] : AllMarketUtility.padZeroLeft(moment.duration(parseInt(t.i[5]), "s").minutes(), 2) + ":" + AllMarketUtility.padZeroLeft(moment.duration(parseInt(t.i[5]), "s").seconds(), 2),
                n = "" == t.i[37] ? 4 : t.i[37],
                r = void 0 === t.sb ? {} : t.sb,
                i = [],
                o = [],
                d = [],
                m = [];
            r.cp = void 0 === r.cp ? 4 == n ? "q0" : "0h" : r.cp, r.cpi = parseInt(r.cp.substr(1));
            var p = {
                q1: "1h",
                q2: "1h",
                q3: "2h",
                q4: "2h",
                ot: "2h",
                q0: "0h"
            };
            if (r.hcp = void 0 == p[r.cp] ? r.cp : p[r.cp], r.hcpi = parseInt(r.hcp.substr(0, 1)), 4 == n) {
                for (var h = 1; h <= 4; h++) {
                    var u = void 0 === r.ps ? {
                        h: "",
                        a: "",
                        p: "s" + h
                    } : _.chain(r.ps).filter("p", "q" + h).first().value();
                    void 0 === u && (u = {
                        h: "",
                        a: "",
                        p: "q" + h
                    }), h > r.cpi && (u.h = "", u.a = "");
                    var E = i.length;
                    i.push(React.createElement("col", {
                        key: "c" + E,
                        className: "col-fixed30"
                    })), o.push(React.createElement("th", {
                        key: "ths" + E
                    }, l["stiQ" + h])), d.push(React.createElement("td", {
                        key: "hs" + E,
                        className: "pd-t-4 pd-b-2"
                    }, React.createElement("span", {
                        className: "fts-13" + (u.p == r.cp ? " fontWeight-bold" : " ft-c-3")
                    }, u.h))), m.push(React.createElement("td", {
                        key: "as" + E,
                        className: "pd-t-4 pd-b-2"
                    }, React.createElement("span", {
                        className: "fts-13" + (u.p == r.cp ? " fontWeight-bold" : " ft-c-3")
                    }, u.a)))
                }
                var R = void 0 === r.ps ? {
                    h: "",
                    a: "",
                    p: "ot"
                } : _.chain(r.ps).filter("p", "ot").first().value();
                r.cp != R.p && (R.h = "", R.a = "");
                var E = i.length;
                i.push(React.createElement("col", {
                    key: "c" + E,
                    className: "col-fixed30"
                })), o.push(React.createElement("th", {
                    key: "ths" + E
                }, l.stiOT)), d.push(React.createElement("td", {
                    key: "hs" + E,
                    className: "pd-t-4 pd-b-2"
                }, React.createElement("span", {
                    className: "fts-13" + (R.p == r.cp ? " fontWeight-bold" : " ft-c-3")
                }, R.h))), m.push(React.createElement("td", {
                    key: "as" + E,
                    className: "pd-t-4 pd-b-2"
                }, React.createElement("span", {
                    className: "fts-13" + (R.p == r.cp ? " fontWeight-bold" : " ft-c-3")
                }, R.a)))
            }
            for (var h = 1; h <= 2; h++) {
                var g = void 0 === r.ps ? {
                    h: "",
                    a: "",
                    p: h + "h"
                } : _.chain(r.ps).filter("p", h + "h").first().value();
                h > r.hcpi && (g.h = "", g.a = "");
                var E = i.length;
                i.push(React.createElement("col", {
                    key: "c" + E,
                    className: "col-fixed38"
                })), o.push(React.createElement("th", {
                    key: "ths" + E
                }, l["sti" + h + "H"])), d.push(React.createElement("td", {
                    key: "hs" + E,
                    className: "pd-t-4 pd-b-2 rightBorder_lv2"
                }, React.createElement("div", {
                    className: "bg_white_opty16 height-100p width-100p pos-absolute top-0 left-0 z-idx-0"
                }), React.createElement("span", {
                    className: "fts-13" + (g.p == r.hcp ? " fontWeight-bold" : " ft-c-3")
                }, g.h))), m.push(React.createElement("td", {
                    key: "as" + E,
                    className: "pd-t-4 pd-b-2 rightBorder_lv2"
                }, React.createElement("div", {
                    className: "bg_white_opty16 height-100p width-100p pos-absolute top-0 left-0 z-idx-0"
                }), React.createElement("span", {
                    className: "fts-13" + (g.p == r.hcp ? " fontWeight-bold" : " ft-c-3")
                }, g.a)))
            }
            if (2 == n) {
                var f = void 0 === r.ps ? {
                    h: "",
                    a: "",
                    p: "ot"
                } : _.chain(r.ps).filter("p", "ot").first().value();
                r.cp != f.p && (f = {
                    h: "",
                    a: "",
                    p: "ot"
                });
                var E = i.length;
                i.push(React.createElement("col", {
                    key: "c" + E,
                    className: "col-fixed38"
                })), o.push(React.createElement("th", {
                    key: "ths" + E
                }, l.stiOT)), d.push(React.createElement("td", {
                    key: "hs" + E,
                    className: "pd-t-4 pd-b-2 rightBorder_lv2"
                }, React.createElement("div", {
                    className: "bg_white_opty16 height-100p width-100p pos-absolute top-0 left-0 z-idx-0"
                }), React.createElement("span", {
                    className: "fts-13" + (f.p == r.cp ? " fontWeight-bold" : " ft-c-3")
                }, f.h))), m.push(React.createElement("td", {
                    key: "as" + E,
                    className: "pd-t-4 pd-b-2 rightBorder_lv2"
                }, React.createElement("div", {
                    className: "bg_white_opty16 height-100p width-100p pos-absolute top-0 left-0 z-idx-0"
                }), React.createElement("span", {
                    className: "fts-13" + (f.p == r.cp ? " fontWeight-bold" : " ft-c-3")
                }, f.a)))
            }
            var v = void 0 === r.ps ? {
                    h: "",
                    a: "",
                    p: "ft"
                } : _.chain(r.ps).filter("p", "ft").first().value(),
                E = i.length;
            return i.push(React.createElement("col", {
                key: "c" + E,
                className: "col-fixed38"
            })), o.push(React.createElement("th", {
                key: "ths" + E
            }, l.SB_Total)), d.push(React.createElement("td", {
                key: "hs" + E,
                className: "pos-relative pd-t-4 pd-b-2"
            }, React.createElement("div", {
                className: "bg_white_opty16 height-100p width-100p pos-absolute top-0 left-0 z-idx-0"
            }), React.createElement("span", {
                className: "ft-c-12  pd-t-4 pd-b-2 pos-relative z-idx-1 fts-13 fontWeight-bold"
            }, v.h))), m.push(React.createElement("td", {
                key: "as" + E,
                className: "pos-relative pd-t-4 pd-b-2"
            }, React.createElement("div", {
                className: "bg_white_opty16 height-100p width-100p pos-absolute top-0 left-0 z-idx-0"
            }), React.createElement("span", {
                className: "ft-c-12  pd-t-4 pd-b-2 pos-relative z-idx-1 fts-13 fontWeight-bold"
            }, v.a))), React.createElement("span", null, React.createElement("div", {
                className: "fts-12 ft-c-3 pd-b-10 pd-t-6"
            }, e.competitionName), React.createElement("div", {
                className: "pd-l-10 overflow-hidden pos-relative"
            }, React.createElement("div", {
                className: "bg_black_opty85 top-0 left-0"
            }), React.createElement("table", {
                className: "width-100p pos-relative z-idx-1"
            }, React.createElement("colgroup", null, React.createElement("col", null), i), React.createElement("thead", {
                className: "fts-11 ft-c-31 t-a-c"
            }, React.createElement("tr", null, React.createElement("th", {
                className: "fts-13 t-a-l"
            }, React.createElement("span", {
                className: "ft-c-14 fontWeight-normal mg-r-5 t-va-m"
            }, AllMarketUtility.getPeriod(r.cp, e.sportID)), React.createElement("span", {
                className: "ft-c-3 fontWeight-normal mg-r-10 t-va-m" + ("" != s ? "" : " hidden")
            }, s), "N" == t.g ? React.createElement(AllMarketPage.Neutral, null) : null), o)))), React.createElement("div", {
                className: " pd-l-10 overflow-hidden pos-relative"
            }, React.createElement("div", {
                className: "bg_black_opty6 top-0 left-0 "
            }), React.createElement("table", {
                className: "width-100p pos-relative z-idx-1"
            }, React.createElement("colgroup", null, React.createElement("col", null), i), React.createElement("tbody", {
                className: "t-a-c ft-c-14"
            }, React.createElement("tr", null, React.createElement("td", {
                className: "t-a-l pd-t-2 pd-b-2"
            }, React.createElement("div", {
                className: "fts-15 ft-c-3 t-a-l line-clamp overflow-hidden",
                title: a
            }, a)), d), React.createElement("tr", null, React.createElement("td", {
                className: "t-a-l pd-b-4"
            }, React.createElement("div", {
                className: "fts-15 ft-c-3  t-a-l line-clamp overflow-hidden",
                title: c
            }, c)), m)))))
        }
    }), AllMarketPage.ScoreBoardInplay.Darts = React.createClass({
        displayName: "Darts",
        render: function () {
            var e = this.props.sbParam.event,
                t = +e.i[37],
                a = e.sb;
            return React.createElement("div", {
                className: "mg-t-1 pd-4 pos-relative sb-darts expanded"
            }, React.createElement("div", {
                className: "fts-12 ft-c-3 pd-t-6"
            }, this.props.sbParam.competitionName), React.createElement("div", {
                className: "overflow-hidden pos-relative"
            }, React.createElement("table", {
                className: "width-100p pos-relative z-idx-1"
            }, React.createElement("colgroup", null, React.createElement("col", null), React.createElement("col", {
                className: "col-fixed48"
            }), React.createElement("col", {
                className: "col-fixed48"
            }), React.createElement("col", {
                className: "col-fixed48"
            }), React.createElement("col", {
                className: "col-fixed48"
            }), React.createElement("col", {
                className: "col-fixed48"
            }), React.createElement("col", {
                className: "col-fixed48"
            }), React.createElement("col", {
                className: "col-fixed48"
            })), React.createElement("thead", {
                className: "fts-11 ft-c-31 t-a-c"
            }, React.createElement("tr", null, React.createElement("th", {
                className: "fts-13 t-a-l pd-t-4 pd-b-4 pos-relative t-va-bot pd-l-10"
            }, React.createElement("div", {
                className: "bg_black_opty75 height-23 width-75p bottom-0 left-0"
            }), React.createElement("div", {
                className: "bg_black_roundConner height-40 width-25p pos-absolute bottom-0 right-0 z-idx-0"
            }), React.createElement("span", {
                className: "ft-c-14 fontWeight-normal mg-r-6 pos-relative z-idx-1"
            }), React.createElement("span", {
                className: "ft-c-3 fontWeight-normal pos-relative z-idx-1 mg-r-4"
            }), "N" == e.g ? React.createElement(AllMarketPage.Neutral, null) : null), 11 == t ? [React.createElement("th", null, React.createElement("div", {
                className: "bg_black_opty75 top-0 left-0"
            }), React.createElement("span", {
                className: "pos-relative z-idx-1"
            })), React.createElement("th", null, React.createElement("div", {
                className: "bg_black_opty75 top-0 left-0"
            }), React.createElement("span", {
                className: "pos-relative z-idx-1"
            }))] : null, React.createElement("th", null, React.createElement("div", {
                className: "bg_black_opty75 top-0 left-0"
            }), React.createElement("span", {
                className: "pos-relative z-idx-1"
            })), React.createElement("th", null, React.createElement("div", {
                className: "bg_black_opty75 top-0 left-0"
            }), React.createElement("span", {
                className: "pos-relative z-idx-1"
            })), React.createElement("th", null, React.createElement("div", {
                className: "bg_black_opty75 top-0 left-0"
            }), React.createElement("span", {
                className: "pos-relative z-idx-1"
            })), 10 == t ? React.createElement("th", null, React.createElement("div", {
                className: "bg_black_opty75 top-0 left-0"
            }), React.createElement("span", {
                className: "pos-relative z-idx-1"
            }, l.Sets)) : null, React.createElement("th", null, React.createElement("div", {
                className: "bg_black_opty75 top-0 left-0"
            }), React.createElement("span", {
                className: "pos-relative z-idx-1"
            }, l.Legs)), 10 == t ? React.createElement("th", null, React.createElement("div", {
                className: "bg_black_opty75 top-0 left-0"
            }), React.createElement("span", {
                className: "pos-relative z-idx-1"
            }, l.Total180)) : null, React.createElement("th", {
                className: "pd-t-4 pd-b-4"
            }, React.createElement("div", {
                className: "bg_black_opty75 height-100p width-100p pos-absolute top-0 left-0 z-idx-0 radius-r-t"
            }), React.createElement("span", {
                className: "pos-relative z-idx-1"
            }, 10 == t ? l.TotalLegs : l.Total180)))))), React.createElement("div", {
                className: " pd-l-10 overflow-hidden pos-relative"
            }, React.createElement("div", {
                className: "bg_black_opty6 height-100p width-100p pos-absolute top-0 left-0 z-idx-0"
            }), React.createElement("table", {
                className: "width-100p pos-relative z-idx-1"
            }, React.createElement("colgroup", null, React.createElement("col", null), React.createElement("col", {
                className: "col-fixed48"
            }), React.createElement("col", {
                className: "col-fixed48"
            }), React.createElement("col", {
                className: "col-fixed48"
            }), React.createElement("col", {
                className: "col-fixed48"
            }), React.createElement("col", {
                className: "col-fixed48"
            }), React.createElement("col", {
                className: "col-fixed48"
            }), React.createElement("col", {
                className: "col-fixed48"
            })), React.createElement("tbody", {
                className: "t-a-c ft-c-14"
            }, React.createElement("tr", null, React.createElement("td", {
                className: "t-a-l pd-t-2 pd-b-2"
            }, React.createElement("div", {
                className: "fts-15 ft-c-3  t-a-l t-va-m line-clamp"
            }, React.createElement("span", {
                className: classNames("widthHeight-7 dsp-iblk round mg-r-10 t-va-m", {
                    "bg-c-24": 1 != a.s,
                    "bg-c-36": 1 == a.s
                })
            }), React.createElement("span", {
                className: "t-va-m",
                title: e.i[0]
            }, e.i[0]))), React.createElement("td", {
                className: "pd-t-4 pd-b-2"
            }, React.createElement("span", {
                className: " "
            })), React.createElement("td", {
                className: "pd-t-4 pd-b-2"
            }, React.createElement("span", {
                className: "ft-c-3  "
            })), React.createElement("td", {
                className: "pd-t-4 pd-b-2"
            }, React.createElement("span", {
                className: ""
            })), 11 == t ? [React.createElement("td", {
                className: "pd-t-4 pd-b-2"
            }), React.createElement("td", {
                className: "pd-t-4 pd-b-2"
            })] : null, React.createElement("td", {
                className: "pos-relative rightBorder_lv2 pd-t-4 pd-b-2"
            }, React.createElement("div", {
                className: "bg_white_opty16 height-100p width-100p pos-absolute top-0 left-0 z-idx-0"
            }), React.createElement("span", {
                className: "ft-c-14"
            }, a.h)), 10 == t ? React.createElement("td", {
                className: "pos-relative rightBorder_lv2 pd-t-4 pd-b-2"
            }, React.createElement("div", {
                className: "bg_white_opty16 height-100p width-100p pos-absolute top-0 left-0 z-idx-0"
            }), React.createElement("span", {
                className: "ft-c-14"
            }, a.hl)) : null, React.createElement("td", {
                className: 11 == t ? "pos-relative pd-t-4 pd-b-2" : "pos-relative rightBorder_lv2 pd-t-4 pd-b-2"
            }, React.createElement("div", {
                className: "bg_white_opty16 height-100p width-100p pos-absolute top-0 left-0 z-idx-0"
            }), React.createElement("span", {
                className: "ft-c-3    pos-relative z-idx-1"
            }, a.h180)), 10 == t ? React.createElement("td", {
                className: "pos-relative pd-t-4 pd-b-2"
            }, React.createElement("div", {
                className: "bg_white_opty16 height-100p width-100p pos-absolute top-0 left-0 z-idx-0"
            }), React.createElement("span", {
                className: "ft-c-3  pos-relative z-idx-1"
            }, a.htl)) : null), React.createElement("tr", null, React.createElement("td", {
                className: "t-a-l pd-t-2 pd-b-5"
            }, React.createElement("div", {
                className: "fts-15 ft-c-3  t-a-l t-va-m line-clamp"
            }, React.createElement("span", {
                className: classNames("widthHeight-7 dsp-iblk round mg-r-10 t-va-m", {
                    "bg-c-24": 0 != a.s,
                    "bg-c-36": 0 == a.s
                })
            }), React.createElement("span", {
                className: "t-va-m",
                title: e.i[1]
            }, e.i[1]))), React.createElement("td", {
                className: "pd-t-2 pd-b-4"
            }, React.createElement("span", {
                className: "  "
            })), React.createElement("td", {
                className: "pd-t-2 pd-b-4"
            }, React.createElement("span", {
                className: "ft-c-3 "
            })), 11 == t ? [React.createElement("td", {
                className: "pd-t-4 pd-b-2"
            }), React.createElement("td", {
                className: "pd-t-4 pd-b-2"
            })] : null, React.createElement("td", {
                className: "pd-t-2 pd-b-4"
            }), React.createElement("td", {
                className: "pos-relative rightBorder_lv2 pd-t-4 pd-b-2"
            }, React.createElement("div", {
                className: "bg_white_opty16 height-100p width-100p pos-absolute top-0 left-0 z-idx-0"
            }), React.createElement("span", {
                className: "ft-c-14"
            }, a.a)), 10 == t ? React.createElement("td", {
                className: "pos-relative rightBorder_lv2 pd-t-4 pd-b-2"
            }, React.createElement("div", {
                className: "bg_white_opty16 height-100p width-100p pos-absolute top-0 left-0 z-idx-0"
            }), React.createElement("span", {
                className: "ft-c-14"
            }, a.al)) : null, React.createElement("td", {
                className: 11 == t ? "pos-relative" : "pos-relative rightBorder_lv2 pd-t-4 pd-b-2"
            }, React.createElement("div", {
                className: "bg_white_opty16 height-100p width-100p pos-absolute top-0 left-0 z-idx-0"
            }), React.createElement("span", {
                className: "ft-c-3    pos-relative z-idx-1"
            }, a.a180)), 10 == t ? React.createElement("td", {
                className: "pos-relative"
            }, React.createElement("div", {
                className: "bg_white_opty16 height-100p width-100p pos-absolute top-0 left-0 z-idx-0"
            }), React.createElement("span", {
                className: "ft-c-3  pos-relative z-idx-1"
            }, a.atl)) : null)))))
        }
    }), AllMarketPage.ScoreBoardInplay.Cricket = React.createClass({
        displayName: "Cricket",
        render: function () {
            var e = this.props.sbParam.event,
                t = +e.i[37],
                a = e.sb;
            13 == t && (a.cp = "i1");
            var c = [],
                s = [];
            _.map(12 == t ? a.ps : _.filter(a.ps, "p", "i1"), function (e, n) {
                if (a.cp) {
                    +a.cp.substring(1) == n + 1 && (e.cp = !0)
                }
                e.title = 0 == n ? l.Innings1 : l.Innings2, c.push(React.createElement(AllMarketPage.ScoreBoardInplay.Cricket.Innings, {
                    key: n,
                    s: 1 == a.s,
                    i: e,
                    idx: "h",
                    gt: t
                })), s.push(React.createElement(AllMarketPage.ScoreBoardInplay.Cricket.Innings, {
                    key: n,
                    s: 0 == a.s,
                    i: e,
                    idx: "a",
                    gt: t
                }))
            });
            var n = _.map(_.takeRight(_.sortByAll(a.players, "o"), 2), function (e, t) {
                return React.createElement(AllMarketPage.ScoreBoardInplay.Cricket.Player, _extends({
                    key: t
                }, e))
            });
            return React.createElement("div", {
                className: "mg-t-1 pd-b-6 pd-l-6 pd-r-6 pos-relative sb-cricket"
            }, React.createElement("div", {
                className: "fts-12 ft-c-3 pd-b-8 pd-t-8"
            }, React.createElement("div", {
                className: "float-right"
            }, "N" == e.g ? React.createElement(AllMarketPage.Neutral, null) : null, React.createElement("span", {
                className: "ft-c-14 fts-13 t-va-m mg-l-6"
            }, l.LiveText)), this.props.sbParam.competitionName), React.createElement("div", {
                className: "overflow-hidden pos-relative"
            }, React.createElement("div", {
                className: "bg_black_opty6 top-0 left-0"
            }), React.createElement("table", {
                className: "width-100p pos-relative"
            }, React.createElement("colgroup", null, React.createElement("col", {
                className: "col-50Percent"
            }), React.createElement("col", {
                className: "col-50Percent"
            })), React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", {
                className: classNames("pd-l-10", {
                    "t-a-c": 13 == t
                })
            }, React.createElement("div", {
                className: "t-a-c width-190 ft-c-3 fts-13 pd-t-10 pd-b-8 dsp-iblk",
                title: e.i[0]
            }, e.i[0])), React.createElement("td", {
                className: classNames("pd-r-10", {
                    "t-a-c": 13 == t,
                    "t-a-r": 12 == t
                })
            }, React.createElement("div", {
                className: "t-a-c width-190 ft-c-3 fts-13 pd-t-10 pd-b-8 dsp-iblk",
                title: e.i[1]
            }, e.i[1]))), React.createElement("tr", null, React.createElement("td", {
                className: classNames("pd-l-10", {
                    "t-a-c": 13 == t
                })
            }, React.createElement("div", {
                className: "fts-0"
            }, c)), React.createElement("td", {
                className: classNames("pd-r-10", {
                    "t-a-c": 13 == t,
                    "t-a-r": 12 == t
                })
            }, React.createElement("div", {
                className: "fts-0"
            }, s))))), React.createElement("table", {
                className: "width-100p pos-relative mg-t-8"
            }, React.createElement("colgroup", null, React.createElement("col", {
                className: "col-50Percent"
            }), React.createElement("col", {
                className: "col-50Percent"
            })), React.createElement("tbody", null, React.createElement("tr", null, n)))))
        }
    }), AllMarketPage.ScoreBoardInplay.Cricket.Innings = React.createClass({
        displayName: "Innings",
        render: function () {
            var e, t, a, l = (this.props.gt, this.props.idx),
                c = !1,
                s = this.props.i,
                n = "";
            return s && (c = s.cp && this.props.s, e = s[l], t = s[l + "w"], a = s[l + "o"], n = c ? e + " - " + t + " (" + a + ")" : t < 10 ? e + " - " + t : e), React.createElement("div", {
                className: classNames("dsp-iblk", {
                    "mg-l-1": "i2" == s.p
                })
            }, React.createElement("table", {
                className: "pos-relative z-idx-1"
            }, React.createElement("colgroup", null, React.createElement("col", {
                className: "col-fixed95"
            })), React.createElement("thead", {
                className: "fts-12 ft-c-31 t-a-c "
            }, React.createElement("tr", null, React.createElement("th", null, React.createElement("div", {
                className: "bg_black_opty6 top-0 left-0 z-idx-1"
            }), React.createElement("div", {
                className: "z-idx-2 pos-relative"
            }, s.title)))), React.createElement("tbody", {
                className: classNames("fts-12 t-a-c fontWeight-bold", {
                    "ft-c-43": !c,
                    "ft-c-14": c
                })
            }, React.createElement("tr", null, React.createElement("td", {
                className: "height-23"
            }, React.createElement("div", {
                className: "bg_white_opty16 top-0 left-0 z-idx-1"
            }), React.createElement("div", {
                className: "z-idx-2 pos-relative"
            }, n))))))
        }
    }), AllMarketPage.ScoreBoardInplay.Cricket.Player = React.createClass({
        displayName: "Player",
        render: function () {
            return React.createElement("td", {
                className: "pd-0"
            }, React.createElement("table", {
                className: "width-100p"
            }, React.createElement("colgroup", null, React.createElement("col", null), React.createElement("col", {
                className: "col-fixed37"
            }), React.createElement("col", {
                className: "col-fixed37"
            }), React.createElement("col", {
                className: "col-fixed37"
            })), React.createElement("tbody", {
                className: "ft-c-31 fts-12"
            }, React.createElement("tr", null, React.createElement("td", {
                className: "height-21 pd-l-10 "
            }, React.createElement("div", {
                className: "bg_black_opty6 top-0 left-0 z-idx-1"
            })), React.createElement("td", {
                className: "t-a-c"
            }, React.createElement("div", {
                className: "bg_black_opty6 top-0 left-0 z-idx-1"
            }), React.createElement("div", {
                className: "z-idx-2 pos-relative"
            }, l.Runs)), React.createElement("td", {
                className: "t-a-c"
            }, React.createElement("div", {
                className: "bg_black_opty6 top-0 left-0 z-idx-1"
            }), React.createElement("div", {
                className: "z-idx-2 pos-relative"
            }, "4's")), React.createElement("td", {
                className: "t-a-c"
            }, React.createElement("div", {
                className: "bg_black_opty6 top-0 left-0 z-idx-1"
            }), React.createElement("div", {
                className: "z-idx-2 pos-relative"
            }, "6's")))), React.createElement("tbody", {
                className: "ft-c-31 fts-13"
            }, React.createElement("tr", null, React.createElement("td", {
                className: "height-23 pd-l-10 pd-r-10"
            }, React.createElement("div", {
                className: "bg_black_opty6 top-0 left-0 z-idx-1"
            }), React.createElement("div", {
                className: " ft-c-3  t-a-l t-va-m line-clamp z-idx-2 pos-relative"
            }, React.createElement("span", {
                className: classNames("widthHeight-7 dsp-iblk round mg-r-10 t-va-m", {
                    "bg-c-36": this.props.s,
                    "bg-c-24": !this.props.s
                })
            }), React.createElement("span", {
                className: "t-va-m"
            }, this.props.n))), React.createElement("td", {
                className: "t-a-c ft-c-14 fontWeight-bold"
            }, React.createElement("div", {
                className: "bg_white_opty16 top-0 left-0 z-idx-1"
            }), React.createElement("div", {
                className: "z-idx-2 pos-relative"
            }, this.props.r)), React.createElement("td", {
                className: "t-a-c ft-c-14 fontWeight-bold ofw-hidden"
            }, React.createElement("div", {
                className: "bg_white_opty16 top-0 left-1 z-idx-1"
            }), React.createElement("div", {
                className: "z-idx-2 pos-relative"
            }, this.props.s4)), React.createElement("td", {
                className: "t-a-c ft-c-14 fontWeight-bold ofw-hidden"
            }, React.createElement("div", {
                className: "bg_white_opty16 top-0 left-1 z-idx-1"
            }), React.createElement("div", {
                className: "z-idx-2 pos-relative"
            }, this.props.s6))))))
        }
    }), AllMarketPage.ScoreBoardInplay.Baseball = React.createClass({
        displayName: "Baseball",
        render: function () {
            var e = this.props.sbParam.event,
                t = (e.i[37], e.sb ? e.sb : {
                    h: 0,
                    a: 0,
                    cp: "i",
                    p: {},
                    s: "",
                    ot: 0
                }),
                a = +t.cp.substr(1),
                c = _.range(1, 10),
                s = _.map([0].concat(c), function (e) {
                    return 0 == e ? React.createElement("col", null) : React.createElement("col", {
                        className: "col-fixed20"
                    })
                }).concat([React.createElement("col", {
                    className: "col-fixed30"
                }), React.createElement("col", {
                    className: "col-fixed60"
                })]),
                n = 0,
                r = 0,
                i = _.first(_.filter(t.ps, {
                    p: "ot"
                }));
            i && (n = i.h, r = i.a);
            var o = {
                    normal: 1,
                    overtime: 2,
                    total: 3,
                    empty: 4
                },
                d = _.map(c, function (e) {
                    var l = _.filter(t.ps, "p", "i" + e)[0],
                        c = e <= a,
                        s = e == a;
                    return l = l || {
                        h: 0,
                        a: 0
                    }, "0" == t.s && s && (l.h = ""), {
                        h: React.createElement(AllMarketPage.ScoreBoardInplay.Baseball.Innings, {
                            score: c ? l.h : "",
                            type: o.normal,
                            isCP: s
                        }),
                        a: React.createElement(AllMarketPage.ScoreBoardInplay.Baseball.Innings, {
                            score: c ? l.a : "",
                            type: o.normal,
                            isCP: s
                        })
                    }
                }).concat([{
                    h: React.createElement(AllMarketPage.ScoreBoardInplay.Baseball.Innings, {
                        score: a > 9 && (10 != a || "0" != t.s) ? n : "",
                        type: o.overtime
                    }),
                    a: React.createElement(AllMarketPage.ScoreBoardInplay.Baseball.Innings, {
                        score: a > 9 ? r : "",
                        type: o.overtime
                    })
                }, {
                    h: React.createElement(AllMarketPage.ScoreBoardInplay.Baseball.Innings, {
                        score: t.h,
                        type: o.total
                    }),
                    a: React.createElement(AllMarketPage.ScoreBoardInplay.Baseball.Innings, {
                        score: t.a,
                        type: o.total
                    })
                }]),
                m = "base" + (t.fb ? "-1" : "") + (t.sb ? "-2" : "") + (t.tb ? "-3" : "");
            return React.createElement("div", null, React.createElement("div", {
                className: "fts-12 ft-c-3 pd-b-10 pd-t-6"
            }, this.props.sbParam.competitionName), React.createElement("div", {
                className: " pd-l-10 overflow-hidden pos-relative"
            }, React.createElement("div", {
                className: "bg_black_opty85 top-0 left-0"
            }), React.createElement("table", {
                className: "width-100p pos-relative z-idx-1"
            }, React.createElement("colgroup", null, s), React.createElement("thead", {
                className: "fts-11 ft-c-31 t-a-c"
            }, React.createElement("tr", null, React.createElement("th", {
                className: "fts-13 t-a-l pd-t-4 pd-b-4"
            }, t.cp ? React.createElement("div", {
                className: classNames("dsp-iblk mg-r-6 ft-c-14", {
                    firsthalf: "0" == t.s,
                    secondhalf: "1" == t.s
                })
            }, React.createElement("span", {
                className: "t-va-m mg-r-4"
            }, t.cp.substr(1)), React.createElement("span", {
                className: "icon-current fts-8 t-va-m"
            })) : null, "N" == e.g ? React.createElement(AllMarketPage.Neutral, null) : null), _.map(c, function (e) {
                return React.createElement("th", null, e)
            }), React.createElement("th", null, l.SB_OT), React.createElement("th", null, l.SB_TotalRuns))))), React.createElement("div", {
                className: " pd-l-10 overflow-hidden pos-relative"
            }, React.createElement("div", {
                className: "bg_black_opty6  top-0 left-0 "
            }), React.createElement("table", {
                className: "width-100p pos-relative z-idx-1"
            }, React.createElement("colgroup", null, s), React.createElement("tbody", {
                className: "t-a-c ft-c-14"
            }, React.createElement("tr", {
                className: "fts-14"
            }, React.createElement("td", {
                className: "t-a-l pd-t-2 pd-b-2"
            }, React.createElement("div", {
                className: "fts-15 ft-c-3  t-a-l line-clamp overflow-hidden"
            }, React.createElement("span", {
                className: "widthHeight-7 dsp-iblk round mg-r-10 t-va-m" + ("0" == t.s ? " bg-c-36" : " bg-c-24")
            }), React.createElement("span", {
                className: "t-va-m"
            }, e.i[1]))), _.pluck(d, "a")), React.createElement("tr", {
                className: "fts-14"
            }, React.createElement("td", {
                className: "t-a-l pd-b-4"
            }, React.createElement("div", {
                className: "fts-15 ft-c-3  t-a-l line-clamp overflow-hidden"
            }, React.createElement("span", {
                className: "widthHeight-7 dsp-iblk round mg-r-10 t-va-m" + ("1" == t.s ? " bg-c-36" : " bg-c-24")
            }), React.createElement("span", {
                className: "t-va-m"
            }, e.i[0]))), _.pluck(d, "h"))))), React.createElement("table", {
                className: "width-100p"
            }, React.createElement("colgroup", null, s), React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", {
                className: "t-a-l pd-b-4 pd-t-4 pos-relative  pd-l-10 fts-13",
                colSpan: "1"
            }, React.createElement("div", {
                className: "bg_black_opty75  width-100p top-0 left-0"
            }), React.createElement("span", {
                className: "basecontainer " + m
            }, React.createElement("span", {
                className: "icon-base"
            }, React.createElement("span", {
                className: "path1"
            }), React.createElement("span", {
                className: "path2"
            }), React.createElement("span", {
                className: "path3"
            })))), React.createElement("td", {
                className: "pos-relative t-a-r pd-r-10 fts-13 pd-t-4",
                colSpan: "11"
            }, React.createElement("div", {
                className: "bg_black_opty75  width-100p top-0 left-0"
            }), React.createElement("span", {
                className: "ft-c-26 mg-r-6 pos-relative z-idx-1"
            }, l.SB_Outs), React.createElement("span", {
                className: "ft-c-12 mg-r-6 pos-relative z-idx-1 fontWeight-bold"
            }, t.ot))))))
        }
    }), AllMarketPage.ScoreBoardInplay.Baseball.Innings = React.createClass({
        displayName: "Innings",
        render: function () {
            switch (this.props.type) {
                case 1:
                    return React.createElement("td", {
                        className: "pd-t-4 pd-b-2"
                    }, React.createElement("span", {
                        className: this.props.isCP ? "" : "ft-c-3"
                    }, this.props.score));
                case 2:
                    return React.createElement("td", {
                        className: "pos-relative rightBorder_lv2 pd-t-4 pd-b-2"
                    }, React.createElement("div", {
                        className: "bg_white_opty16 top-0 left-0"
                    }), React.createElement("span", {
                        className: "fontWeight-bold  pos-relative z-idx-1"
                    }, this.props.score));
                case 3:
                    return React.createElement("td", {
                        className: "pos-relative pd-t-4 pd-b-2"
                    }, React.createElement("div", {
                        className: "bg_white_opty16 top-0 left-0 "
                    }), React.createElement("span", {
                        className: "ft-c-12 fontWeight-bold pos-relative z-idx-1"
                    }, this.props.score));
                default:
                    return React.createElement("td", {
                        className: "pd-t-4 pd-b-2"
                    }, React.createElement("span", {
                        className: "ft-c-3"
                    }))
            }
        }
    }), AllMarketPage.ScoreBoardInplay.NoScoreboard = React.createClass({
        displayName: "NoScoreboard",
        render: function () {
            var e = this.props.sbParam,
                t = e.event,
                a = t.i[0],
                c = t.i[1];
            return React.createElement("span", null, React.createElement("div", {
                className: "fts-13 ft-c-42 pd-b-10 pd-t-6"
            }, React.createElement("div", {
                className: "float-right"
            }, "N" == t.g ? React.createElement(AllMarketPage.Neutral, null) : null, React.createElement("span", {
                className: "ft-c-14 fts-13 t-va-m mg-l-6"
            }, l.LiveText)), e.competitionName), React.createElement("div", {
                className: " pd-l-10 pd-r-10 overflow-hidden pos-relative"
            }, React.createElement("div", {
                className: "bg_black_opty6  top-0 left-0 "
            }), React.createElement("table", {
                className: "width-100p"
            }, React.createElement("colgroup", null, React.createElement("col", {
                className: "col-46Percent"
            }), React.createElement("col", null), React.createElement("col", {
                className: "col-46Percent"
            })), React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", {
                className: "t-a-r"
            }, React.createElement("div", {
                className: "fts-15 ft-c-3 z-idx-1 pos-relative  line-clamp height-2p5em pd-t-16 pd-b-17",
                title: a
            }, a)), React.createElement("td", null, React.createElement("div", {
                className: "fts-15 ft-c-3 z-idx-1 pos-relative t-a-c"
            }, React.createElement("div", {
                className: "ft-c-14 fontWeight-bold"
            }, "V"))), React.createElement("td", {
                className: "t-a-l"
            }, React.createElement("div", {
                className: "fts-15 ft-c-3 z-idx-1 pos-relative   line-clamp",
                title: c
            }, c)))))))
        }
    }), AllMarketPage.ScoreBoardNonInplay = React.createClass({
        displayName: "ScoreBoardNonInplay",
        render: function () {
            var e = this.props.sbParam,
                t = e.event,
                a = t.i[0],
                c = t.i[1],
                s = "t" == t.i[4] ? l.td : t.i[4],
                n = void 0 !== t.i[5] && "" != t.i[5] && t.i[5].indexOf(":") > 0 ? t.i[5] : "";
            return React.createElement("div", {
                className: "pd-t-16 pd-b-16 pd-l-10 pd-r-10 ofw-hidden pos-relative"
            }, React.createElement("div", {
                className: "bg_black_opty6 top-0 left-0"
            }), React.createElement("div", {
                className: "float-right z-idx-1 pos-relative"
            }, React.createElement("span", {
                className: "icon-InPlay mg-r-10 ft-c-30 dsp-iblk fts-15 t-va-m" + ("True" == t.i[3] ? "" : " hidden")
            }), "N" == t.g ? React.createElement(AllMarketPage.Neutral, null) : null, React.createElement("span", {
                className: "ft-c-18 fts-12 time mg-l-10"
            }, s), React.createElement("span", {
                className: "ft-c-3 fts-12 time mg-l-8"
            }, n)), React.createElement("div", {
                className: "fts-15 ft-c-3 z-idx-1 pos-relative line-clamp",
                title: a + " v " + c
            }, a, React.createElement("span", {
                className: "ft-c-14 mg-l-10 mg-r-10"
            }, "v"), c))
        }
    }), AllMarketPage.FilterButtons = React.createClass({
        displayName: "FilterButtons",
        render: function () {
            if (this.props.inPlay || 1 != this.props.sportID) return null;
            if (void 0 === this.props.filters) return null;
            var e = this.props.filterParam;
            return React.createElement("div", {
                className: "mg-t-1 bg-c-14 pos-relative height-40 lht-40 pd-l-10 pd-r-10",
                id: "fbContainer"
            }, React.createElement("div", {
                className: "float-left",
                onClick: this._scroll.bind(this, "l")
            }, React.createElement("span", {
                className: "back dsp-iblk bg-c-12 radius iconbg-s t-va-m"
            }, React.createElement("span", {
                className: "dsp-iblk icon-DoubleArrowHorizontalLeft fts-16 wh-ht-22 lht-22"
            }))), React.createElement("div", {
                className: "float-right",
                onClick: this._scroll.bind(this, "r")
            }, React.createElement("span", {
                className: "back dsp-iblk bg-c-12 radius iconbg-s t-va-m"
            }, React.createElement("span", {
                className: "dsp-iblk icon-DoubleArrowHorizontalRight fts-16 wh-ht-22 lht-22"
            }))), React.createElement("div", {
                className: "fts-13 ft-c-27 pos-relative ws-nowrap mg-r-22 mg-l-22"
            }, React.createElement("div", {
                className: "width-35 right-0 height-40 pos-absolute gradientFadeOut-r",
                id: "fg"
            }), React.createElement("div", {
                className: "pos-relative ws-nowrap ofw-hidden",
                id: "filterbar"
            }, _.map(this.props.filters, function (t, a) {
                return React.createElement("div", {
                    key: "f" + a,
                    onClick: this._setFilter.bind(this, t.ex),
                    className: "dsp-iblk t-va-m lht-0p3 filters" + (0 == a ? " mg-l-16" : "") + (a == this.props.filters.length - 1 ? " mg-r-16" : " mg-r-35") + (e.filteredType == t.ex ? " actived" : ""),
                    "data-ex": t.ex
                }, t.tx)
            }, this))))
        },
        _setFilter: function (e, t) {
            t.preventDefault(), t.stopPropagation();
            var a = $("#filterbar");
            void 0 !== a[0] && (a.children().removeClass("actived").filter("[data-ex='" + e + "']").addClass("actived"), Action.AllMarket.filteredMarket(e))
        },
        shouldComponentUpdate: function (e) {
            return $("#filterbar").scroll(function (e) {
                return e.preventDefault(), e.stopPropagation(), !1
            }).children().removeClass("actived").filter("[data-ex='" + e.filterParam.filteredType + "']").addClass("actived"), AMStore.getFirstLoad() || this.props.filters != e.filters || this.props.filterParam.filteredType != e.filterParam.filteredType
        },
        componentDidMount: function () {
            setTimeout(Action.AllMarket.showHideFilterMoveBtn, 100), this.addListener()
        },
        componentDidUpdate: function () {
            setTimeout(Action.AllMarket.showHideFilterMoveBtn, 100)
        },
        addListener: function () {
            window.addEventListener("resize", Action.AllMarket.showHideFilterMoveBtn)
        },
        _scroll: function (e, t) {
            t.preventDefault(), t.stopPropagation();
            var a = $("#filterbar");
            void 0 !== a[0] && a.animate({
                scrollLeft: a[0].scrollLeft + ("r" == e ? 100 : -100)
            }, 300, function () {
                $("#fg")[a[0].scrollLeft + a[0].clientWidth >= a[0].scrollWidth - 40 ? "addClass" : "removeClass"]("hidden")
            })
        }
    }), AllMarketPage.MyMarketList = React.createClass({
        displayName: "MyMarketList",
        render: function () {
            var e = l.MB_ClickAddToMyMarkets.split("{0}");
            return React.createElement("div", {
                id: "fav",
                className: "sportsTable"
            }, React.createElement("div", {
                className: "mg-t-1 fav-header pd-r-10 pd-l-10 bg-c-13 topBorder_lv1 overflow-hidden pd-t-10 pd-b-11 lht-18",
                onClick: this._showHideMyMarkets.bind(this, this.props.isShow)
            }, React.createElement("div", {
                className: "float-right"
            }, React.createElement("span", {
                className: "arrow fts-22 ft-c-27 dsp-iblk" + (this.props.isShow ? "" : " collapsed")
            }, React.createElement("div", {
                className: "icon-ArrowDown"
            }), React.createElement("div", {
                className: "icon-ArrowUp"
            }))), React.createElement("span", {
                className: "thinstar t-va-m top-n1 lht-0p8"
            }, React.createElement("span", {
                className: "dsp-iblk icon-fav-thin ft-c-15 t-va-m"
            })), React.createElement("span", {
                className: "dsp-iblk fts-16 fontWeight-bold ft-c-3 mg-l-6 t-va-m lht-0p9 uppercase"
            }, l.MB_MyMarkets)), React.createElement("div", {
                className: "bg-c-1 fts-13 ft-c-25 pd-t-10 pd-b-10 pd-l-10 pd-r-10" + (this.props.isShow && 0 == this.props.MyMarkets.length ? "" : " hidden")
            }, React.createElement("span", {
                className: "t-va-m"
            }, e[0]), React.createElement("span", {
                className: "thinstar t-va-m mg-l-4 mg-r-4 ft-c-29 t-va-m top-n1"
            }, React.createElement("span", {
                className: "icon-fav-thin"
            })), React.createElement("span", {
                className: "t-va-m"
            }, e[1])), React.createElement("div", {
                className: this.props.isShow ? "" : "hidden"
            }, this.props.MyMarkets))
        },
        _showHideMyMarkets: function (e, t) {
            t.preventDefault(), t.stopPropagation(), Action.AllMarket.showHideMyMarkets(!e)
        }
    }), AllMarketPage.Market = React.createClass({
        displayName: "Market",
        render: function () {
            return React.createElement("div", null, React.createElement(AllMarketPage.Market.HeadLine, {
                filter: this.props.data.filter,
                isFirst: this.props.data.isFirst,
                data: this.props.data
            }), React.createElement(AllMarketPage.Market.MarketType, {
                data: this.props.data
            }))
        }
    }), AllMarketPage.Market.HeadLine = React.createClass({
        displayName: "HeadLine",
        render: function () {
            var e = this.props.data,
                t = e.inPlay && (this._childEventDisplayCurrentTotal(e.market.ctid) || this._is15MinGoals(e.market.ctid)),
                a = "";
            if ("sb" == e.market.mt && "" != e.bestOf && "0" != e.bestOf) {
                var c = "Tennis";
                switch (e.sID) {
                    case 3:
                        c = "Tennis";
                        break;
                    case 9:
                        c = "Badminton";
                        break;
                    case 13:
                        c = "Volleyball";
                        break;
                    case 20:
                        c = "TableTennis"
                }
                a = " (" + e.bestOf + l["SB_BestOf_" + c] + ")"
            }
            var s = [1, 2, 8, 9, 10, 11, 55],
                n = [React.createElement("span", {
                    key: "0",
                    className: "fts-15 ft-c-27 lht-14 "
                }, e.childEventName + ("" != e.childEventName ? _.contains(s, e.market.ctid) ? ": " : " - " : "") + e.pretermName + e.betTypeName + ("" != e.period ? " - " : "")), React.createElement("span", {
                    key: "1",
                    className: "ft-c-3 fts-15"
                }, " ", e.period), a];
            if (e.market.n && "" != e.market.n) {
                var r = null,
                    i = e.market.n;
                "" != e.period && (e.market.n.lastIndexOf("- ") > -1 && !_.contains(["zh-cn", "ja-jp", "th-th"], window.global.lan) && (i = e.market.n.replace(e.market.n.slice(e.market.n.lastIndexOf("- ") + 1), "")), e.market.n.lastIndexOf("-") > -1 && _.contains(["zh-cn", "ja-jp", "th-th"], window.global.lan) && (i = e.market.n.replace(e.market.n.slice(e.market.n.lastIndexOf("-") + 1), "")), r = React.createElement("span", {
                    key: "1",
                    className: "ft-c-3 fts-15"
                }, e.market.n.replace(i, ""))), n = [i, a, r]
            }
            return React.createElement("div", {
                className: "mg-t-1 lht-35 pd-r-10 pd-l-10 bg-c-15 overflow-hidden" + (this.props.isFirst ? "" : " topBorder_lv2"),
                "data-filter": this.props.filter
            }, React.createElement("table", {
                className: "headerTb width-100p"
            }, React.createElement("colgroup", null, React.createElement("col", null), React.createElement("col", {
                className: t ? "col-fixed200" : "col-fixed30"
            })), React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", {
                className: "fts-15 ft-c-27 lht-14"
            }, n), React.createElement("td", {
                className: "t-a-r"
            }, t ? React.createElement("span", {
                className: "ft-c-14 fts-13 mg-r-10"
            }, this._is15MinGoals(e.market.ctid) ? l.MB_15MinScore : l.MB_CurrentTotal, ": ", e.market.scoh, "-", e.market.scoa) : null, React.createElement("span", {
                className: "myFavorite" + (e.isMyMk ? " actived" : ""),
                title: e.isMyMk ? l.MB_RemoveFromMyMarkets : l.MB_AddToMyMarkets,
                onClick: this._addMyMarketTypes.bind(this, e.market.mt, e.market.ctid, void 0 !== e.market.mn ? e.market.n : "", e.isMyMk)
            }, React.createElement("span", {
                className: "thinstar ft-c-28"
            }, React.createElement("span", {
                className: "icon-fav-thin"
            }))))))))
        },
        _addMyMarketTypes: function (e, t, a, l, c) {
            c.preventDefault(), c.stopPropagation(), Action.AllMarket.showHideMyMarkets(!0), l ? (Action.PopUp.show(!1, PopUp_Store.popUpType().MYMARKETS), Action.AllMarket.removeMyMarkets(e, t, a)) : (Action.PopUp.show(!0, PopUp_Store.popUpType().MYMARKETS), Action.AllMarket.addToMyMarkets(e, t, a))
        },
        _is15MinGoals: function (e) {
            return _.contains([16, 17, 18, 19, 20, 21], e)
        },
        _childEventDisplayCurrentTotal: function _childEventDisplayCurrentTotal(ctid) {
            return _.contains(eval("[" + displayCurrentTotalSetting + "]"), ctid)
        }
    }), AllMarketPage.Market.MarketType = React.createClass({
        displayName: "MarketType",
        render: function () {
            var e = this.props.data,
                t = null,
                a = {
                    sID: e.sID,
                    eventId: e.market.k,
                    parentEventId: void 0 !== e.market.pk ? e.market.pk : e.market.k,
                    childEventTypeId: void 0 !== e.market.ctid ? e.market.ctid : null,
                    score: e.homeScore + ":" + e.awayScore,
                    child_score: (void 0 == e.childHomeScore ? "" : e.childHomeScore) + ":" + (void 0 == e.childAwayScore ? "" : e.childAwayScore),
                    isAH: "ah" == e.market.mt.slice(0, 2),
                    homeName: 14 == e.market.ctid ? e.market.ch : e.homeName,
                    awayName: 14 == e.market.ctid ? e.market.ca : e.awayName,
                    inPlay: e.inPlay,
                    odds: e.market.v,
                    highLightOdds: e.highLightOdds,
                    oddsChange: e.oddsChange,
                    oddsType: e.oddsType,
                    showMoreEventIds: e.showMoreEventIds,
                    bestOf: e.bestOf,
                    sid: e.sid
                },
                l = {
                    group1: ["WinningMargin"],
                    group2: ["_1stGoal", "_2ndGoal", "_3rdGoal", "_4thGoal", "_5thGoal", "_6thGoal", "_7thGoal", "_8thGoal", "_9thGoal", "_10thGoal", "_11thGoal", "_12thGoal", "_13thGoal", "_14thGoal", "_15thGoal"],
                    group3: ["WinningMethod", "QualifyingMethod"],
                    group4: ["FT_1X2_And_FT_OU_1p5", "FT_1X2_And_FT_OU_2p5", "FT_1X2_And_FT_OU_3p5", "FT_1X2_And_FT_OU_4p5", "FT_1X2_And_BothTeamsToScore", "FT_1X2_And_1stTeamToScore"],
                    group5: ["DoubleChance_And_FT_OU_1p5", "DoubleChance_And_FT_OU_2p5", "DoubleChance_And_FT_OU_3p5", "DoubleChance_And_FT_OU_4p5", "DoubleChance_And_BothTeamsToScore", "DoubleChance_And_1stTeamToScore"],
                    group6: ["FT_OU_1p5_And_BothTeamsToScore", "FT_OU_2p5_And_BothTeamsToScore", "FT_OU_3p5_And_BothTeamsToScore", "FT_OU_4p5_And_BothTeamsToScore", "FT_OU_1p5_And_FT_OE", "FT_OU_2p5_And_FT_OE", "FT_OU_3p5_And_FT_OE", "FT_OU_4p5_And_FT_OE"],
                    group7: ["FT_OU_1p5_And_1stTeamToScore", "FT_OU_2p5_And_1stTeamToScore", "FT_OU_3p5_And_1stTeamToScore", "FT_OU_4p5_And_1stTeamToScore"]
                };
            switch (e.market.mt.slice(0, 2)) {
                case "ah":
                case "ou":
                    t = null != a.childEventTypeId && 0 != a.childEventTypeId || 1 != a.sID && 2 != a.sID ? React.createElement(AllMarketPage.Market.MarketType.AHOU, {
                        data: a
                    }) : React.createElement(AllMarketPage.Market.MarketType.AHOU_FbBb, {
                        data: a
                    });
                    break;
                case "oe":
                    t = React.createElement(AllMarketPage.Market.MarketType.OE, {
                        data: a
                    });
                    break;
                case "ml":
                    t = React.createElement(AllMarketPage.Market.MarketType.ML, {
                        data: a
                    });
                    break;
                case "hf":
                    t = React.createElement(AllMarketPage.Market.MarketType.HF, {
                        data: a
                    });
                    break;
                case "cs":
                    t = React.createElement(AllMarketPage.Market.MarketType.CS, {
                        data: a
                    });
                    break;
                case "sb":
                    t = _.contains(["", "0", 0], a.bestOf) ? React.createElement(AllMarketPage.Market.MarketType.SB, {
                        data: a
                    }) : React.createElement(AllMarketPage.Market.MarketType.SB_BestOf, {
                        data: a
                    });
                    break;
                case "tg":
                    t = React.createElement(AllMarketPage.Market.MarketType.TG, {
                        data: a
                    })
            }
            switch (e.market.mt.slice(0, 3)) {
                case "1x2":
                    t = React.createElement(AllMarketPage.Market.MarketType.OneXTwo, {
                        data: a
                    });
                    break;
                case "tts":
                    t = React.createElement(AllMarketPage.Market.MarketType.TTS, {
                        data: a
                    });
                    break;
                case "sco":
                    t = React.createElement(AllMarketPage.Market.MarketType.SCO, {
                        data: a
                    })
            }
            return "spwos" == e.market.mt && (t = _.contains(l.group1, e.market.mn) ? React.createElement(AllMarketPage.Market.MarketType.WM, {
                data: a
            }) : _.contains(l.group2, e.market.mn) ? React.createElement(AllMarketPage.Market.MarketType.NG, {
                data: a
            }) : _.contains(l.group3, e.market.mn) ? React.createElement(AllMarketPage.Market.MarketType.WQ, {
                data: a
            }) : _.contains(l.group4, e.market.mn) ? React.createElement(AllMarketPage.Market.MarketType.GBB, {
                data: a
            }) : _.contains(l.group5, e.market.mn) ? React.createElement(AllMarketPage.Market.MarketType.DC, {
                data: a
            }) : _.contains(l.group6, e.market.mn) ? React.createElement(AllMarketPage.Market.MarketType.GB, {
                data: a
            }) : _.contains(l.group7, e.market.mn) ? React.createElement(AllMarketPage.Market.MarketType.GTS, {
                data: a
            }) : React.createElement(AllMarketPage.Market.MarketType.SPWOS, {
                data: a
            })), React.createElement("div", {
                className: "bg-c-1 fts-13"
            }, t)
        }
    }), AllMarketPage.Market.MarketType.AHOU_FbBb = React.createClass({
        displayName: "AHOU_FbBb",
        render: function () {
            var e = this.props.data,
                t = [],
                a = e.odds[0].length / 2 <= 3 ? 3 : e.odds[0].length / 2;
            _.each(_.range(a), function (e) {
                return t.push(React.createElement("col", {
                    key: e,
                    className: "col-dynamicWidth"
                }))
            });
            var c = [];
            return _.forEach(e.odds, function (t, s) {
                if (c[s] = {
                        oddName: e.isAH ? e.homeName : l.Odds_Over,
                        evenName: e.isAH ? e.awayName : l.Odds_Under,
                        oddRow: [],
                        evenRow: []
                    }, _.forEach(t, function (t, a) {
                        var l = {
                            isAH: e.isAH,
                            value: t,
                            score: e.score,
                            child_score: e.child_score,
                            OU: a % 2 == 0 ? "O" : "U",
                            inPlay: e.inPlay,
                            eventId: e.eventId,
                            parentEventId: e.parentEventId,
                            isHL: -1 != _.indexOf(e.highLightOdds, t[2].slice(1)),
                            ocg: e.oddsChange,
                            ot: e.oddsType,
                            name: a % 2 == 0 ? c[s].oddName : c[s].evenName,
                            sid: e.sid
                        };
                        a % 2 == 0 ? c[s].oddRow.push(React.createElement("td", {
                            key: a,
                            className: "pd-t-6 pd-b-6 pd-r-10 t-a-r topBorder_lv3"
                        }, React.createElement(AllMarketPage.Market.Odds.AHOU, {
                            data: l
                        }))) : a % 2 == 1 && c[s].evenRow.push(React.createElement("td", {
                            key: a,
                            className: "pd-t-6 pd-b-6 pd-r-10 t-a-r"
                        }, React.createElement(AllMarketPage.Market.Odds.AHOU, {
                            data: l
                        })))
                    }), a > c[s].oddRow.length)
                    for (var n = 2 * (a - c[s].oddRow.length), r = 0; r < n; r += 2) {
                        var i = r + c[0].oddRow.length;
                        c[s].oddRow.push(React.createElement("td", {
                            key: 2 * c[s].oddRow.length + i,
                            className: "pd-t-6 pd-b-6 pd-l-10 pd-r-10 t-a-r topBorder_lv3"
                        })), c[s].evenRow.push(React.createElement("td", {
                            key: 2 * c[s].evenRow.length + i,
                            className: "pd-t-6 pd-b-6 pd-l-10 pd-r-10 t-a-r"
                        }))
                    }
            }), React.createElement("table", {
                className: "width-100p t-va-m" + (a <= 3 ? " noMergeOdds" : "") + " col-" + a
            }, React.createElement("colgroup", null, React.createElement("col", null), t), _.map(c, function (e, t) {
                return React.createElement("tbody", {
                    key: t,
                    className: "hoverby-nopointer"
                }, React.createElement("tr", null, React.createElement("td", {
                    className: " pd-t-6 pd-b-6 pd-l-10 pd-r-10 topBorder_lv3"
                }, React.createElement("div", {
                    className: "t-va-b pd-t-4 ft-c-25"
                }, e.oddName)), e.oddRow), React.createElement("tr", null, React.createElement("td", {
                    className: " pd-t-6 pd-b-6 pd-l-10 pd-r-10"
                }, React.createElement("div", {
                    className: "t-va-b pd-t-4 ft-c-25"
                }, e.evenName)), e.evenRow))
            }))
        }
    }), AllMarketPage.Market.MarketType.AHOU = React.createClass({
        displayName: "AHOU",
        mixins: [AllMarketPage.Utility.market],
        render: function () {
            var e = this.props.data;
            return React.createElement("table", {
                className: "width-100p t-va-t hoverabletb AHOU"
            }, React.createElement("colgroup", null, React.createElement("col", {
                className: "col-50Percent"
            }), React.createElement("col", {
                className: "col-50Percent"
            })), React.createElement("tbody", null, _.map(e.odds, function (t, a) {
                return React.createElement("tr", {
                    key: a
                }, _.map(t, function (c, s) {
                    var n = {
                            isAH: e.isAH,
                            value: c,
                            score: e.score,
                            child_score: e.child_score,
                            inPlay: e.inPlay,
                            eventId: e.eventId,
                            parentEventId: e.parentEventId,
                            isHL: -1 != _.indexOf(e.highLightOdds, c[2].slice(1)),
                            ocg: e.oddsChange,
                            ot: e.oddsType,
                            name: 0 == s ? e.isAH ? e.homeName : l.Odds_Over : e.isAH ? e.awayName : l.Odds_Under
                        },
                        r = this.addSelection.bind(this, n);
                    return React.createElement("td", {
                        key: s,
                        className: "t-va-m pd-0 pd-l-10 pd-r-10" + (s == t.length - 1 ? "" : " rightBorder_lv1") + (0 == a ? "" : " topBorder_lv3") + (this.isOddsUnaval(n.value) ? " nopointer nohighlight" : ""),
                        onClick: r
                    }, React.createElement("table", {
                        className: "width-100p v-aligntable lht-26"
                    }, React.createElement("colgroup", null, React.createElement("col", null), React.createElement("col", {
                        className: "col-fixed105"
                    })), React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", {
                        className: "t-a-l ft-c-25 lht-14 pd-r-10" + (this.isOddsUnaval(n.value) ? " nopointer nohighlight" : "")
                    }, n.name), React.createElement("td", {
                        className: "t-a-r pd-b-4" + (0 == a ? " pd-t-5" : " pd-t-4") + (this.isOddsUnaval(n.value) ? " nopointer nohighlight" : "")
                    }, React.createElement("div", {
                        className: "noMergeOdds"
                    }, React.createElement(AllMarketPage.Market.Odds.AHOU, {
                        data: n
                    })))))))
                }, this))
            }, this)))
        }
    }), AllMarketPage.Market.MarketType.OneXTwo = React.createClass({
        displayName: "OneXTwo",
        mixins: [AllMarketPage.Utility.market],
        render: function () {
            var e = this.props.data,
                t = [e.homeName, l.Odds_Draw, e.awayName];
            return React.createElement("table", {
                className: "width-100p t-va-t hoverabletb"
            }, React.createElement("colgroup", null, React.createElement("col", {
                className: "col-40Percent"
            }), React.createElement("col", {
                className: "col-20Percent"
            }), React.createElement("col", {
                className: "col-40Percent"
            })), React.createElement("tbody", null, React.createElement("tr", null, _.map(e.odds, function (a, l) {
                var c = {
                        value: a,
                        score: e.score,
                        child_score: e.child_score,
                        inPlay: e.inPlay,
                        eventId: e.eventId,
                        parentEventId: e.parentEventId,
                        isHL: "" != a[0] && -1 != _.indexOf(e.highLightOdds, a[0].slice(1)),
                        ocg: e.oddsChange,
                        ot: e.oddsType,
                        name: t[l]
                    },
                    s = this.addSelection.bind(this, c);
                return React.createElement("td", {
                    key: l,
                    className: "t-va-m pd-0 pd-l-10 pd-r-10" + (l != e.odds.length - 1 ? " rightBorder_lv1" : "") + (this.isOddsUnaval(c.value) ? " nopointer nohighlight" : ""),
                    onClick: s
                }, React.createElement("table", {
                    className: "width-100p v-aligntable lht-26"
                }, React.createElement("colgroup", null, React.createElement("col", null), React.createElement("col", {
                    className: "col-fixed45"
                })), React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", {
                    className: "t-a-l ft-c-25 lht-14 pd-r-10" + (this.isOddsUnaval(c.value) ? " nopointer nohighlight" : "")
                }, c.name), React.createElement("td", {
                    className: "t-a-r pd-b-4" + (0 == l ? " pd-t-5" : " pd-t-4") + (this.isOddsUnaval(c.value) ? " nopointer nohighlight" : "")
                }, React.createElement(AllMarketPage.Market.Odds.Normal, {
                    data: c
                }))))))
            }, this))))
        }
    }), AllMarketPage.Market.MarketType.CS = React.createClass({
        displayName: "CS",
        mixins: [AllMarketPage.Utility.market],
        render: function () {
            var e = this.props.data,
                t = e.odds[e.odds.length - 1],
                a = _.slice(e.odds, 0, e.odds.length - 1),
                c = {
                    value: t,
                    score: e.score,
                    child_score: e.child_score,
                    inPlay: e.inPlay,
                    eventId: e.eventId,
                    parentEventId: e.parentEventId,
                    isHL: "" != t[0] && -1 != _.indexOf(e.highLightOdds, t[0].slice(1)),
                    ocg: e.oddsChange,
                    ot: e.oddsType,
                    name: "" == t[0] ? "" : t[2]
                },
                s = "" == c.value[1] || "0.00" == c.value[1] ? null : this.addSelection.bind(this, c);
            return React.createElement("table", {
                className: "width-100p t-va-t setBet ignore1280 hoverabletb"
            }, React.createElement("colgroup", null, React.createElement("col", {
                className: "col-20Percent"
            }), React.createElement("col", {
                className: "col-20Percent"
            }), React.createElement("col", {
                className: "col-20Percent"
            }), React.createElement("col", {
                className: "col-20Percent"
            }), React.createElement("col", {
                className: "col-20Percent"
            })), React.createElement("tbody", null, React.createElement("tr", null, React.createElement("th", {
                colSpan: "2",
                className: "t-va-m pd-l-10 pd-r-10 bg-c-18 t-a-c fontWeight-normal pd-0"
            }, React.createElement("table", {
                className: "width-100p v-aligntable mHeight-30"
            }, React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", {
                className: "t-a-c"
            }, React.createElement("span", {
                className: "dsp-iblk fts-13 ft-c-22 lht-14"
            }, e.homeName)))))), React.createElement("th", {
                className: "t-va-m pd-l-10 pd-r-10 bg-c-18 t-a-c fontWeight-normal pd-0"
            }, React.createElement("table", {
                className: "width-100p v-aligntable mHeight-30"
            }, React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", {
                className: "t-a-c"
            }, React.createElement("span", {
                className: "dsp-iblk fts-13 ft-c-22 lht-14"
            }, l.Odds_Draw)))))), React.createElement("th", {
                colSpan: "2",
                className: "t-va-m pd-l-10 pd-r-10 bg-c-18 t-a-c fontWeight-normal pd-0"
            }, React.createElement("table", {
                className: "width-100p v-aligntable mHeight-30"
            }, React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", {
                className: "t-a-c"
            }, React.createElement("span", {
                className: "dsp-iblk fts-13 ft-c-22 lht-14"
            }, e.awayName))))))), _.map(a, function (t, a) {
                return React.createElement("tr", {
                    key: a
                }, _.map(t, function (l, c) {
                    var s = {
                            value: l,
                            score: e.score,
                            child_score: e.child_score,
                            inPlay: e.inPlay,
                            eventId: e.eventId,
                            parentEventId: e.parentEventId,
                            isHL: "" != l[0] && -1 != _.indexOf(e.highLightOdds, l[0].slice(1)),
                            ocg: e.oddsChange,
                            ot: e.oddsType,
                            name: l[2]
                        },
                        n = this.isOddsUnaval(s.value) ? null : this.addSelection.bind(this, s);
                    return React.createElement("td", {
                        key: c,
                        className: "t-va-m pd-0 pd-l-10 pd-r-10" + (a > 0 ? " topBorder_lv3" : "") + (c < t.length - 1 ? 1 == c || 2 == c ? " rightBorder_lv3" : " rightBorder_lv1" : "") + (this.isOddsUnaval(s.value) ? " nopointer" : ""),
                        onClick: n
                    }, React.createElement("table", {
                        className: "width-100p v-aligntable lht-26"
                    }, React.createElement("colgroup", null, React.createElement("col", null), React.createElement("col", {
                        className: "col-fixed55"
                    })), React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", {
                        className: "t-a-l pd-t-4 pd-b-4" + (this.isOddsUnaval(s.value) ? " nopointer" : "")
                    }, React.createElement("span", {
                        className: "dark ft-c-16 ws-nowrap"
                    }, s.name)), React.createElement("td", {
                        className: "t-a-r pd-b-4" + (0 == a ? " pd-t-5" : " pd-t-4") + (this.isOddsUnaval(s.value) ? " nopointer" : "")
                    }, React.createElement(AllMarketPage.Market.Odds.Normal, {
                        data: s
                    }))))))
                }, this))
            }, this), React.createElement("tr", null, React.createElement("td", {
                colSpan: "5",
                className: "pd-t-5 pd-b-6 t-va-t pd-l-10 pd-r-10 topBorder_lv4 t-a-r bg-c-19" + (this.isOddsUnaval(c.value) ? " nopointer" : ""),
                onClick: s
            }, React.createElement("div", {
                className: "float-right"
            }, React.createElement(AllMarketPage.Market.Odds.Normal, {
                data: c
            })), React.createElement("div", {
                className: "t-va-b mg-r-60 pd-t-4 ft-c-21 fts-13"
            }, " ", c.name)))))
        }
    }), AllMarketPage.Market.MarketType.SB = React.createClass({
        displayName: "SB",
        mixins: [AllMarketPage.Utility.market],
        render: function () {
            var e = this.props.data;
            return React.createElement("table", {
                className: "width-100p t-va-t hoverabletb"
            }, React.createElement("colgroup", null, React.createElement("col", {
                className: "col-25Percent"
            }), React.createElement("col", {
                className: "col-25Percent"
            }), React.createElement("col", {
                className: "col-25Percent"
            }), React.createElement("col", {
                className: "col-25Percent"
            })), React.createElement("tbody", null, React.createElement("tr", null, React.createElement("th", {
                colSpan: "2",
                className: "pd-t-8 pd-b-7 t-va-t pd-l-10 pd-r-10 bg-c-18 t-a-c fontWeight-normal"
            }, React.createElement("span", {
                className: "dsp-iblk fts-13 ft-c-22 lht-14"
            }, e.homeName)), React.createElement("th", {
                colSpan: "2",
                className: "pd-t-8 pd-b-7 t-va-t pd-l-10 pd-r-10 bg-c-18 t-a-c fontWeight-normal"
            }, React.createElement("span", {
                className: "dsp-iblk fts-13 ft-c-22 lht-14"
            }, e.awayName))), _.map(e.odds, function (t, a) {
                return React.createElement("tr", {
                    key: a
                }, _.map(t, function (l, c) {
                    var s = {
                            value: l,
                            score: e.score,
                            child_score: e.child_score,
                            inPlay: e.inPlay,
                            eventId: e.eventId,
                            parentEventId: e.parentEventId,
                            isHL: "" != l[0] && -1 != _.indexOf(e.highLightOdds, l[0].slice(1)),
                            ocg: e.oddsChange,
                            ot: e.oddsType,
                            name: l[2]
                        },
                        n = this.addSelection.bind(this, s);
                    return React.createElement("td", {
                        key: c,
                        colSpan: "2",
                        className: "t-va-m pd-0 pd-l-10 pd-r-10" + (a > 0 ? " topBorder_lv3" : "") + (c < t.length - 1 ? " rightBorder_lv1" : "") + (this.isOddsUnaval(s.value) ? " nopointer" : ""),
                        onClick: n
                    }, React.createElement("table", {
                        className: "width-100p v-aligntable lht-26"
                    }, React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", {
                        className: "t-a-l pd-t-4 pd-b-4" + (this.isOddsUnaval(s.value) ? " nopointer" : "")
                    }, React.createElement("span", {
                        className: "dark ft-c-16"
                    }, s.name)), React.createElement("td", {
                        className: "t-a-r pd-b-4" + (0 == a ? " pd-t-5" : " pd-t-4") + (this.isOddsUnaval(s.value) ? " nopointer" : "")
                    }, React.createElement(AllMarketPage.Market.Odds.Normal, {
                        data: s
                    }))))))
                }, this))
            }, this)))
        }
    }), AllMarketPage.Market.MarketType.SB_BestOf = React.createClass({
        displayName: "SB_BestOf",
        mixins: [AllMarketPage.Utility.market],
        render: function () {
            var e = this.props.data,
                t = {};
            t.cols3 = [React.createElement("col", {
                key: "0",
                className: "col-25Percent"
            }), React.createElement("col", {
                key: "1",
                className: "col-25Percent"
            }), React.createElement("col", {
                key: "2",
                className: "col-25Percent"
            }), React.createElement("col", {
                key: "3",
                className: "col-25Percent"
            })], t.cols5 = [React.createElement("col", {
                key: "0",
                className: "col-16Percent"
            }), React.createElement("col", {
                key: "1",
                className: "col-16Percent"
            }), React.createElement("col", {
                key: "2",
                className: "col-16Percent"
            }), React.createElement("col", {
                key: "3",
                className: "col-16Percent"
            }), React.createElement("col", {
                key: "4",
                className: "col-16Percent"
            }), React.createElement("col", {
                key: "5",
                className: "col-16Percent"
            })], t.cols7 = [React.createElement("col", {
                key: "0",
                className: "col-12p5Percent"
            }), React.createElement("col", {
                key: "1",
                className: "col-12p5Percent"
            }), React.createElement("col", {
                key: "2",
                className: "col-12p5Percent"
            }), React.createElement("col", {
                key: "3",
                className: "col-12p5Percent"
            }), React.createElement("col", {
                key: "4",
                className: "col-12p5Percent col-secondRow"
            }), React.createElement("col", {
                key: "5",
                className: "col-12p5Percent col-secondRow"
            }), React.createElement("col", {
                key: "6",
                className: "col-12p5Percent col-secondRow"
            }), React.createElement("col", {
                key: "7",
                className: "col-12p5Percent col-secondRow"
            })];
            var a = {};
            a.ths3 = [React.createElement("th", {
                key: "0",
                colSpan: "2",
                className: "pd-t-8 pd-b-7 t-va-t pd-l-10 pd-r-10 bg-c-18 t-a-c fontWeight-normal"
            }, React.createElement("span", {
                className: "dsp-iblk fts-13 ft-c-22 lht-14 "
            }, e.homeName)), React.createElement("th", {
                key: "1",
                colSpan: "2",
                className: "pd-t-8 pd-b-7 t-va-t pd-l-10 pd-r-10 bg-c-18 t-a-c fontWeight-normal"
            }, React.createElement("span", {
                className: "dsp-iblk fts-13 ft-c-22 lht-14 "
            }, e.awayName))], a.ths5 = [React.createElement("th", {
                key: "0",
                colSpan: "3",
                className: "pd-t-8 pd-b-7 t-va-t pd-l-10 pd-r-10 bg-c-18 t-a-c fontWeight-normal"
            }, React.createElement("span", {
                className: "dsp-iblk fts-13 ft-c-22 lht-14 "
            }, e.homeName)), React.createElement("th", {
                key: "1",
                colSpan: "3",
                className: "pd-t-8 pd-b-7 t-va-t pd-l-10 pd-r-10 bg-c-18 t-a-c fontWeight-normal"
            }, React.createElement("span", {
                className: "dsp-iblk fts-13 ft-c-22 lht-14 "
            }, e.awayName))], a.ths7 = [React.createElement("th", {
                key: "0",
                colSpan: "4",
                className: "pd-t-8 pd-b-7 t-va-t pd-l-10 pd-r-10 bg-c-18 t-a-c td-4colspan fontWeight-normal"
            }, React.createElement("span", {
                className: "dsp-iblk fts-13 ft-c-22 lht-14 "
            }, e.homeName)), React.createElement("th", {
                key: "1",
                colSpan: "4",
                className: "pd-t-8 pd-b-7 t-va-t pd-l-10 pd-r-10 bg-c-18 t-a-c td-4colspan fontWeight-normal"
            }, React.createElement("span", {
                className: "dsp-iblk fts-13 ft-c-22 lht-14 "
            }, e.awayName)), React.createElement("th", {
                key: "2",
                colSpan: "2",
                className: "pd-t-8 pd-b-7 t-va-t pd-l-10 pd-r-10 bg-c-18 t-a-c td-2colspan fontWeight-normal"
            }, React.createElement("span", {
                className: "dsp-iblk fts-13 ft-c-22 lht-14 "
            }, e.homeName)), React.createElement("th", {
                key: "3",
                colSpan: "2",
                className: "pd-t-8 pd-b-7 t-va-t pd-l-10 pd-r-10 bg-c-18 t-a-c td-2colspan fontWeight-normal"
            }, React.createElement("span", {
                className: "dsp-iblk fts-13 ft-c-22 lht-14 "
            }, e.awayName))];
            var l = [],
                c = ["4 - 2", "2 - 4", "4 - 3", "3 - 4"];
            return 7 == +e.bestOf && (l = _.filter(e.odds, function (e, t) {
                return _.indexOf(["4 - 2", "2 - 4", "4 - 3", "3 - 4"], e[2]) > -1
            })), React.createElement("table", {
                className: "width-100p t-va-t hoverabletb" + (3 != +e.bestOf ? " setBet ignore1280" : "")
            }, React.createElement("colgroup", null, t["cols" + e.bestOf]), React.createElement("tbody", null, React.createElement("tr", null, a["ths" + e.bestOf]), React.createElement("tr", null, _.map(e.odds, function (t, a) {
                var l = {
                        value: t,
                        score: e.score,
                        child_score: e.child_score,
                        inPlay: e.inPlay,
                        eventId: e.eventId,
                        parentEventId: e.parentEventId,
                        isHL: "" != t[0] && -1 != _.indexOf(e.highLightOdds, t[0].slice(1)),
                        ocg: e.oddsChange,
                        ot: e.oddsType,
                        name: t[2]
                    },
                    s = this.addSelection.bind(this, l);
                return React.createElement("td", {
                    key: a,
                    className: "t-va-m pd-0 pd-l-10 pd-r-10" + (a < e.odds.length - 1 ? " rightBorder_lv1" : "") + (_.indexOf(c, t[2]) > -1 ? " td-secondRow" : "") + (this.isOddsUnaval(l.value) ? " nopointer" : ""),
                    onClick: s
                }, React.createElement("table", {
                    className: "width-100p v-aligntable lht-26"
                }, React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", {
                    className: "t-a-l pd-t-4 pd-b-4" + (this.isOddsUnaval(l.value) ? " nopointer" : "")
                }, React.createElement("span", {
                    className: "dark ft-c-16"
                }, l.name)), React.createElement("td", {
                    className: "t-a-r pd-b-4" + (0 == a ? " pd-t-5" : " pd-t-4") + (this.isOddsUnaval(l.value) ? " nopointer" : "")
                }, React.createElement(AllMarketPage.Market.Odds.Normal, {
                    data: l
                }))))))
            }, this)), React.createElement("tr", {
                className: "tr-secondRow" + (7 != +e.bestOf ? " hidden" : "")
            }, _.map(l, function (t, a) {
                var c = {
                        value: t,
                        score: e.score,
                        child_score: e.child_score,
                        inPlay: e.inPlay,
                        eventId: e.eventId,
                        parentEventId: e.parentEventId,
                        isHL: "" != t[0] && -1 != _.indexOf(e.highLightOdds, t[0].slice(1)),
                        ocg: e.oddsChange,
                        ot: e.oddsType,
                        name: t[2]
                    },
                    s = this.addSelection.bind(this, c);
                return React.createElement("td", {
                    key: a,
                    className: "pd-t-6 pd-b-6 t-va-t pd-l-10 pd-r-10 td-secondRow topBorder_lv3 height-23" + (a == l.length - 1 ? "" : " rightBorder_lv1 "),
                    onClick: s
                }, React.createElement("span", {
                    className: "ft-1x2 ft-c-16 fts-13 mg-r-6 pos-relative top-4"
                }, c.name), React.createElement("div", {
                    className: "float-right"
                }, React.createElement(AllMarketPage.Market.Odds.Normal, {
                    data: c
                })))
            }, this))))
        }
    }), AllMarketPage.Market.MarketType.OE = React.createClass({
        displayName: "OE",
        mixins: [AllMarketPage.Utility.market],
        render: function () {
            var e = this.props.data,
                t = {
                    value: e.odds[0],
                    score: e.score,
                    child_score: e.child_score,
                    inPlay: e.inPlay,
                    eventId: e.eventId,
                    parentEventId: e.parentEventId,
                    isHL: -1 != _.indexOf(e.highLightOdds, e.odds[0][0].slice(1)),
                    ocg: e.oddsChange,
                    ot: e.oddsType,
                    name: l.Odds_Odd
                },
                a = {
                    value: e.odds[1],
                    score: e.score,
                    child_score: e.child_score,
                    inPlay: e.inPlay,
                    eventId: e.eventId,
                    parentEventId: e.parentEventId,
                    isHL: -1 != _.indexOf(e.highLightOdds, e.odds[1][0].slice(1)),
                    ocg: e.oddsChange,
                    ot: e.oddsType,
                    name: l.Odds_Even
                };
            return React.createElement("table", {
                className: "width-100p t-va-t hoverabletb"
            }, React.createElement("colgroup", null, React.createElement("col", {
                className: "col-50Percent"
            }), React.createElement("col", {
                className: "col-50Percent"
            })), React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", {
                className: "rightBorder_lv1 t-va-m pd-0 pd-l-10 pd-r-10" + (this.isOddsUnaval(t.value) ? " nopointer nohighlight" : ""),
                onClick: this.addSelection.bind(this, t)
            }, React.createElement("table", {
                className: "width-100p v-aligntable lht-26"
            }, React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", {
                className: "t-a-l ft-c-25 lht-14 pd-r-10" + (this.isOddsUnaval(t.value) ? " nopointer" : "")
            }, l.Odds_Odd), React.createElement("td", {
                className: "t-a-r pd-b-4 pd-t-5" + (this.isOddsUnaval(t.value) ? " nopointer" : "")
            }, React.createElement(AllMarketPage.Market.Odds.Normal, {
                data: t
            })))))), React.createElement("td", {
                className: "t-va-m pd-0 pd-l-10 pd-r-10" + (this.isOddsUnaval(a.value) ? " nopointer nohighlight" : ""),
                onClick: this.addSelection.bind(this, a)
            }, React.createElement("table", {
                className: "width-100p v-aligntable lht-26"
            }, React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", {
                className: "t-a-l ft-c-25 lht-14 pd-r-10" + (this.isOddsUnaval(a.value) ? " nopointer" : "")
            }, l.Odds_Even), React.createElement("td", {
                className: "t-a-r pd-b-4 pd-t-5" + (this.isOddsUnaval(a.value) ? " nopointer" : "")
            }, React.createElement(AllMarketPage.Market.Odds.Normal, {
                data: a
            })))))))))
        }
    }), AllMarketPage.Market.MarketType.ML = React.createClass({
        displayName: "ML",
        mixins: [AllMarketPage.Utility.market],
        render: function () {
            var e = this.props.data,
                t = {
                    value: e.odds[0],
                    score: e.score,
                    child_score: e.child_score,
                    inPlay: e.inPlay,
                    eventId: e.eventId,
                    parentEventId: e.parentEventId,
                    isHL: -1 != _.indexOf(e.highLightOdds, e.odds[0][0].slice(1)),
                    ocg: e.oddsChange,
                    ot: e.oddsType,
                    name: e.homeName
                },
                a = {
                    value: e.odds[1],
                    score: e.score,
                    child_score: e.child_score,
                    inPlay: e.inPlay,
                    eventId: e.eventId,
                    parentEventId: e.parentEventId,
                    isHL: -1 != _.indexOf(e.highLightOdds, e.odds[1][0].slice(1)),
                    ocg: e.oddsChange,
                    ot: e.oddsType,
                    name: e.awayName
                };
            return React.createElement("table", {
                className: "width-100p t-va-t hoverabletb"
            }, React.createElement("colgroup", null, React.createElement("col", {
                className: "col-50Percent"
            }), React.createElement("col", {
                className: "col-50Percent"
            })), React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", {
                className: "rightBorder_lv1 t-va-m pd-0 pd-l-10 pd-r-10" + (this.isOddsUnaval(t.value) ? " nopointer nohighlight" : "")
            }, React.createElement("table", {
                className: "width-100p v-aligntable lht-26",
                onClick: this.addSelection.bind(this, t)
            }, React.createElement("colgroup", null, React.createElement("col", null), React.createElement("col", {
                className: "col-fixed45"
            })), React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", {
                className: "t-a-l ft-c-25 lht-14 pd-r-10" + (this.isOddsUnaval(t.value) ? " nopointer" : "")
            }, e.homeName), React.createElement("td", {
                className: "t-a-r pd-b-4 pd-t-5" + (this.isOddsUnaval(t.value) ? " nopointer" : "")
            }, React.createElement(AllMarketPage.Market.Odds.Normal, {
                data: t
            })))))), React.createElement("td", {
                className: "t-va-m pd-0 pd-l-10 pd-r-10 "
            }, React.createElement("table", {
                className: "width-100p v-aligntable lht-26" + (this.isOddsUnaval(a.value) ? " nopointer nohighlight" : ""),
                onClick: this.addSelection.bind(this, a)
            }, React.createElement("colgroup", null, React.createElement("col", null), React.createElement("col", {
                className: "col-fixed45"
            })), React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", {
                className: "t-a-l ft-c-25 lht-14 pd-r-10" + (this.isOddsUnaval(a.value) ? " nopointer" : "")
            }, e.awayName), React.createElement("td", {
                className: "t-a-r pd-b-4 pd-t-5" + (this.isOddsUnaval(a.value) ? " nopointer" : "")
            }, React.createElement(AllMarketPage.Market.Odds.Normal, {
                data: a
            })))))))))
        }
    }), AllMarketPage.Market.MarketType.TG = React.createClass({
        displayName: "TG",
        mixins: [AllMarketPage.Utility.market],
        render: function () {
            var e = this.props.data;
            return React.createElement("table", {
                className: "width-100p t-va-t hoverabletb"
            }, React.createElement("colgroup", null, React.createElement("col", {
                className: "col-25Percent"
            }), React.createElement("col", {
                className: "col-25Percent"
            }), React.createElement("col", {
                className: "col-25Percent"
            }), React.createElement("col", {
                className: "col-25Percent"
            })), React.createElement("tbody", null, React.createElement("tr", null, _.map(e.odds, function (t, a) {
                var l = {
                        value: t,
                        score: e.score,
                        child_score: e.child_score,
                        inPlay: e.inPlay,
                        eventId: e.eventId,
                        parentEventId: e.parentEventId,
                        isHL: -1 != _.indexOf(e.highLightOdds, t[0].slice(1)),
                        ocg: e.oddsChange,
                        ot: e.oddsType,
                        name: t[2]
                    },
                    c = this.addSelection.bind(this, l);
                return React.createElement("td", {
                    key: a,
                    className: "t-va-m pd-0 pd-l-10 pd-r-10" + (e.odds.length - 1 != a ? " rightBorder_lv1" : "") + (this.isOddsUnaval(l.value) ? " nopointer nohighlight" : ""),
                    onClick: c
                }, React.createElement("table", {
                    className: "width-100p v-aligntable lht-26"
                }, React.createElement("colgroup", null, React.createElement("col", null), React.createElement("col", {
                    className: "col-fixed45"
                })), React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", {
                    className: "t-a-l ft-c-25 lht-14 pd-r-10" + (this.isOddsUnaval(l.value) ? " nopointer" : "")
                }, l.name), React.createElement("td", {
                    className: "t-a-r pd-b-4" + (0 == a ? " pd-t-5" : " pd-t-4") + (this.isOddsUnaval(l.value) ? " nopointer" : "")
                }, React.createElement(AllMarketPage.Market.Odds.Normal, {
                    data: l
                }))))))
            }, this))))
        }
    }), AllMarketPage.Market.MarketType.HF = React.createClass({
        displayName: "HF",
        mixins: [AllMarketPage.Utility.market],
        render: function () {
            var e = this.props.data;
            return React.createElement("table", {
                className: "width-100p t-va-t hoverabletb"
            }, React.createElement("colgroup", null, React.createElement("col", {
                className: "col-33Percent"
            }), React.createElement("col", {
                className: "col-33Percent"
            }), React.createElement("col", {
                className: "col-33Percent"
            })), React.createElement("tbody", null, _.map(e.odds, function (t, a) {
                return React.createElement("tr", {
                    key: a
                }, _.map(t, function (l, c) {
                    var s = {
                            value: l,
                            score: e.score,
                            child_score: e.child_score,
                            inPlay: e.inPlay,
                            eventId: e.eventId,
                            parentEventId: e.parentEventId,
                            isHL: -1 != _.indexOf(e.highLightOdds, l[0].slice(1)),
                            ocg: e.oddsChange,
                            ot: e.oddsType,
                            name: l[2]
                        },
                        n = this.addSelection.bind(this, s);
                    return React.createElement("td", {
                        key: c,
                        className: "t-va-m pd-0 pd-l-10 pd-r-10" + (0 == a ? "" : " topBorder_lv3") + (t.length - 1 != c ? " rightBorder_lv1" : "") + (this.isOddsUnaval(s.value) ? " nopointer nohighlight" : ""),
                        onClick: n
                    }, React.createElement("table", {
                        className: "width-100p v-aligntable lht-26"
                    }, React.createElement("colgroup", null, React.createElement("col", null), React.createElement("col", {
                        className: "col-fixed45"
                    })), React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", {
                        className: "t-a-l ft-c-25 lht-14 pd-r-10" + (this.isOddsUnaval(s.value) ? " nopointer" : "")
                    }, s.name), React.createElement("td", {
                        className: "t-a-r pd-b-4" + (0 == a ? " pd-t-5" : " pd-t-4") + (this.isOddsUnaval(s.value) ? " nopointer" : "")
                    }, React.createElement(AllMarketPage.Market.Odds.Normal, {
                        data: s
                    }))))))
                }, this))
            }, this)))
        }
    }), AllMarketPage.Market.MarketType.TTS = React.createClass({
        displayName: "TTS",
        mixins: [AllMarketPage.Utility.market],
        render: function () {
            var e = this.props.data,
                t = _.map(e.odds, function (t, a) {
                    return _.map(t, function (t, c) {
                        return {
                            value: t,
                            score: e.score,
                            child_score: e.child_score,
                            inPlay: e.inPlay,
                            eventId: e.eventId,
                            parentEventId: e.parentEventId,
                            isHL: void 0 !== t[0] && -1 != _.indexOf(e.highLightOdds, t[0].slice(1)),
                            ocg: e.oddsChange,
                            ot: e.oddsType,
                            name: 0 == a ? e.homeName : 1 == a ? e.awayName : l.odds_NoGoal
                        }
                    })
                });
            return React.createElement("table", {
                className: "width-100p t-va-t hoverabletb"
            }, React.createElement("colgroup", null, React.createElement("col", {
                className: "col-40Percent"
            }), React.createElement("col", {
                className: "col-40Percent"
            }), React.createElement("col", {
                className: "col-20Percent"
            })), React.createElement("tbody", null, React.createElement("tr", null, React.createElement("th", {
                className: "pd-t-8 pd-b-7 t-va-t pd-l-10 pd-r-10 bg-c-18 t-a-l fontWeight-normal"
            }, React.createElement("div", {
                className: "dsp-iblk fts-13 ft-c-22 lht-14"
            }, l.Odds_FirstGoal)), React.createElement("th", {
                className: "pd-t-8 pd-b-7 t-va-t pd-l-10 pd-r-10 bg-c-18 t-a-l fontWeight-normal"
            }, React.createElement("div", {
                className: "dsp-iblk fts-13 ft-c-22 lht-14"
            }, l.Odds_LastGoal)), React.createElement("th", {
                className: "pd-t-8 pd-b-7 t-va-t pd-l-10 pd-r-10 bg-c-18 t-a-l fontWeight-normal"
            }, React.createElement("div", {
                className: "dsp-iblk fts-13 ft-c-22 lht-14"
            }, l.odds_NoGoal))), React.createElement("tr", null, React.createElement("td", {
                className: "t-va-m pd-0 pd-l-10 pd-r-10 rightBorder_lv1" + (this.isOddsUnaval(t[0][0].value) ? " nopointer nohighlight" : ""),
                onClick: this.addSelection.bind(this, t[0][0])
            }, React.createElement("table", {
                className: "width-100p v-aligntable lht-26"
            }, React.createElement("colgroup", null, React.createElement("col", null), React.createElement("col", {
                className: "col-fixed45"
            })), React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", {
                className: "t-a-l ft-c-25 lht-14 pd-r-10" + (this.isOddsUnaval(t[0][0].value) ? " nopointer" : "")
            }, e.homeName), React.createElement("td", {
                className: "t-a-r pd-b-4 pd-t-5" + (this.isOddsUnaval(t[0][0].value) ? " nopointer" : "")
            }, React.createElement(AllMarketPage.Market.Odds.Normal, {
                data: t[0][0]
            })))))), React.createElement("td", {
                className: "t-va-m pd-0 pd-l-10 pd-r-10 rightBorder_lv1" + (this.isOddsUnaval(t[1][0].value) ? " nopointer nohighlight" : ""),
                onClick: this.addSelection.bind(this, t[1][0])
            }, React.createElement("table", {
                className: "width-100p v-aligntable lht-26"
            }, React.createElement("colgroup", null, React.createElement("col", null), React.createElement("col", {
                className: "col-fixed45"
            })), React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", {
                className: "t-a-l ft-c-25 lht-14 pd-r-10" + (this.isOddsUnaval(t[1][0].value) ? " nopointer" : "")
            }, e.homeName), React.createElement("td", {
                className: "t-a-r pd-b-4 pd-t-5" + (this.isOddsUnaval(t[1][0].value) ? " nopointer" : "")
            }, React.createElement(AllMarketPage.Market.Odds.Normal, {
                data: t[1][0]
            })))))), React.createElement("td", {
                rowSpan: "2",
                className: "t-va-m pd-0 pd-l-10 pd-r-10 t-a-c" + (this.isOddsUnaval(t[0][2].value) ? " nopointer nohighlight" : ""),
                onClick: this.addSelection.bind(this, t[0][2])
            }, React.createElement("table", {
                className: "width-100p v-aligntable lht-26"
            }, React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", {
                className: "t-a-t pd-b-4 pd-t-5" + (this.isOddsUnaval(t[0][2].value) ? " nopointer" : "")
            }, React.createElement(AllMarketPage.Market.Odds.Normal, {
                data: t[0][2]
            }))))))), React.createElement("tr", null, React.createElement("td", {
                className: "t-va-m pd-0 pd-l-10 pd-r-10 topBorder_lv3 rightBorder_lv1" + (this.isOddsUnaval(t[0][1].value) ? " nopointer nohighlight" : ""),
                onClick: this.addSelection.bind(this, t[0][1])
            }, React.createElement("table", {
                className: "width-100p v-aligntable lht-26"
            }, React.createElement("colgroup", null, React.createElement("col", null), React.createElement("col", {
                className: "col-fixed45"
            })), React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", {
                className: "t-a-l ft-c-25 lht-14 pd-r-10" + (this.isOddsUnaval(t[0][1].value) ? " nopointer" : "")
            }, e.awayName), React.createElement("td", {
                className: "t-a-r pd-b-4 pd-t-4" + (this.isOddsUnaval(t[0][1].value) ? " nopointer" : "")
            }, React.createElement(AllMarketPage.Market.Odds.Normal, {
                data: t[0][1]
            })))))), React.createElement("td", {
                className: "t-va-m pd-0 pd-l-10 pd-r-10 topBorder_lv3 rightBorder_lv1" + (this.isOddsUnaval(t[1][1].value) ? " nopointer nohighlight" : ""),
                onClick: this.addSelection.bind(this, t[1][1])
            }, React.createElement("table", {
                className: "width-100p v-aligntable lht-26"
            }, React.createElement("colgroup", null, React.createElement("col", null), React.createElement("col", {
                className: "col-fixed45"
            })), React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", {
                className: "t-a-l ft-c-25 lht-14 pd-r-10" + (this.isOddsUnaval(t[1][1].value) ? " nopointer" : "")
            }, e.awayName), React.createElement("td", {
                className: "t-a-r pd-b-4 pd-t-4" + (this.isOddsUnaval(t[1][1].value) ? " nopointer" : "")
            }, React.createElement(AllMarketPage.Market.Odds.Normal, {
                data: t[1][1]
            })))))))))
        }
    }), AllMarketPage.Market.MarketType.SCO = React.createClass({
        displayName: "SCO",
        mixins: [AllMarketPage.Utility.market],
        render: function () {
            var e = this.props.data;
            return React.createElement("table", {
                className: "width-100p t-va-m setBet hoverabletb"
            }, React.createElement("colgroup", null, React.createElement("col", {
                className: "col-20Percent"
            }), React.createElement("col", {
                className: "col-10Percent"
            }), React.createElement("col", {
                className: "col-10Percent"
            }), React.createElement("col", {
                className: "col-10Percent"
            }), React.createElement("col", {
                className: "col-20Percent"
            }), React.createElement("col", {
                className: "col-10Percent"
            }), React.createElement("col", {
                className: "col-10Percent"
            }), React.createElement("col", {
                className: "col-10Percent"
            })), React.createElement("tbody", null, React.createElement("tr", null, React.createElement("th", {
                colSpan: "4",
                className: "t-va-m pd-l-10 pd-r-10 bg-c-20 t-a-c fontWeight-normal pd-0"
            }, React.createElement("table", {
                className: "width-100p v-aligntable mHeight-30"
            }, React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", {
                className: "t-a-c"
            }, React.createElement("span", {
                className: "dsp-iblk fts-13 ft-c-3 lht-14"
            }, e.homeName)))))), React.createElement("th", {
                colSpan: "4",
                className: "t-va-m pd-l-10 pd-r-10 bg-c-20 t-a-c fontWeight-normal pd-0"
            }, React.createElement("table", {
                className: "width-100p v-aligntable mHeight-30"
            }, React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", {
                className: "t-a-c"
            }, React.createElement("span", {
                className: "dsp-iblk fts-13 ft-c-3 lht-14"
            }, e.awayName))))))), React.createElement("tr", null, React.createElement("th", {
                className: "pd-t-8 pd-b-7 t-va-t pd-l-10 pd-r-10 bg-c-18 t-a-l fontWeight-normal"
            }, React.createElement("div", {
                className: "dsp-iblk fts-13 ft-c-22 lht-14"
            }, l.OP_Player)), React.createElement("th", {
                className: "pd-t-8 pd-b-7 t-va-t pd-l-10 pd-r-10 bg-c-18 t-a-c fontWeight-normal"
            }, React.createElement("div", {
                className: "dsp-iblk fts-13 ft-c-22 lht-14"
            }, l.Odds_First)), React.createElement("th", {
                className: "pd-t-8 pd-b-7 t-va-t pd-l-10 pd-r-10 bg-c-18 t-a-c fontWeight-normal"
            }, React.createElement("div", {
                className: "dsp-iblk fts-13 ft-c-22 lht-14  "
            }, l.Odds_Last)), React.createElement("th", {
                className: "pd-t-8 pd-b-7 t-va-t bg-c-18 t-a-c rightBorder_lv1 fontWeight-normal"
            }, React.createElement("div", {
                className: "dsp-iblk fts-13 ft-c-22 lht-14 "
            }, l.OddsMB_Anytime)), React.createElement("th", {
                className: "pd-t-8 pd-b-7 t-va-t pd-l-10 pd-r-10 bg-c-18 t-a-l fontWeight-normal"
            }, React.createElement("div", {
                className: "dsp-iblk fts-13 ft-c-22 lht-14 "
            }, l.OP_Player)), React.createElement("th", {
                className: "pd-t-8 pd-b-7 t-va-t pd-l-10 pd-r-10 bg-c-18 t-a-c fontWeight-normal"
            }, React.createElement("div", {
                className: "dsp-iblk fts-13 ft-c-22 lht-14 "
            }, l.Odds_First)), React.createElement("th", {
                className: "pd-t-8 pd-b-7 t-va-t pd-l-10 pd-r-10 bg-c-18 t-a-c fontWeight-normal"
            }, React.createElement("div", {
                className: "dsp-iblk fts-13 ft-c-22 lht-14 "
            }, l.Odds_Last)), React.createElement("th", {
                className: "pd-t-8 pd-b-7 t-va-t bg-c-18 t-a-c fontWeight-normal"
            }, React.createElement("div", {
                className: "dsp-iblk fts-13 ft-c-22 lht-14 "
            }, l.OddsMB_Anytime))), _.map(e.odds, function (t, a) {
                return React.createElement("tr", {
                    key: a,
                    className: (a > 4 || _.findIndex(t, "k", "a2") > -1 || _.findIndex(t, "k", "h1") > -1) && -1 == _.indexOf(e.showMoreEventIds, e.eventId) ? " hidden" : ""
                }, _.map(t, function (t, l) {
                    return void 0 !== t ? React.createElement("td", {
                        key: l,
                        colSpan: "4",
                        className: "pd-0" + (0 == a ? "" : " topBorder_lv3") + (0 == l ? " rightBorder_lv1" : "")
                    }, React.createElement("table", {
                        className: "width-100p v-aligntable lht-33 indivtb" + ("h1" == t.k ? " mergehover" : "")
                    }, React.createElement("colgroup", null, React.createElement("col", {
                        className: "col-40Percent"
                    }), React.createElement("col", {
                        className: "col-20Percent"
                    }), React.createElement("col", {
                        className: "col-20Percent"
                    }), React.createElement("col", {
                        className: "col-20Percent"
                    })), React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", {
                        className: "pd-l-10 t-a-l ft-c-25 lht-14 pd-r-10 lht-14 idv-name"
                    }, t.n), _.map(t.o, function (a, l) {
                        var c = {
                                value: a,
                                score: e.score,
                                child_score: e.child_score,
                                inPlay: e.inPlay,
                                eventId: e.eventId,
                                parentEventId: e.parentEventId,
                                isHL: void 0 !== a[0] && -1 != _.indexOf(e.highLightOdds, a[0].slice(1)),
                                ocg: e.oddsChange,
                                ot: e.oddsType,
                                name: t.n
                            },
                            s = this.addSelection.bind(this, c);
                        return React.createElement("td", {
                            key: l,
                            className: "t-a-c" + (l != t.o.length - 1 ? " pd-l-10 pd-r-10" : "") + (void 0 === a[0] ? " nopointer idv-name" : ""),
                            onClick: s
                        }, "h1" == t.k && l != t.o.length - 1 ? null : React.createElement(AllMarketPage.Market.Odds.Normal, {
                            data: c
                        }))
                    }, this))))) : React.createElement("td", {
                        colSpan: "4",
                        className: "rightBorder_lv1 topBorder_lv3 pd-0 nopointer nohighlight"
                    })
                }, this))
            }, this), React.createElement("tr", null, React.createElement("td", {
                colSpan: "8",
                className: "pd-t-11 pd-b-10 t-va-t pd-l-10 pd-r-10 bg-c-49 t-a-c" + (-1 == _.indexOf(e.showMoreEventIds, e.eventId) ? " td-showMore" : " td-showLess"),
                onClick: this._switchLessMore.bind(this, e.eventId)
            }, React.createElement("div", {
                className: "dsp-iblk fts-13 ft-c-3 lht-14 showless"
            }, l.MB_ShowLess), React.createElement("div", {
                className: "dsp-iblk fts-13 ft-c-3 lht-14 showmore"
            }, l.MB_ShowMore)))))
        },
        _switchLessMore: function (e, t) {
            t.preventDefault(), t.stopPropagation(), Action.AllMarket.switchLessMore(e)
        }
    }), AllMarketPage.Market.MarketType.WM = React.createClass({
        displayName: "WM",
        mixins: [AllMarketPage.Utility.market],
        render: function () {
            var e = this.props.data;
            return React.createElement("table", {
                className: "width-100p t-va-m hoverabletb"
            }, React.createElement("colgroup", null, React.createElement("col", {
                className: "col-33Percent"
            }), React.createElement("col", {
                className: "col-33Percent"
            }), React.createElement("col", {
                className: "col-33Percent"
            })), React.createElement("tbody", null, React.createElement("tr", null, React.createElement("th", {
                className: "t-va-m pd-l-10 pd-r-10 bg-c-18 t-a-c fontWeight-normal pd-0"
            }, React.createElement("table", {
                className: "width-100p v-aligntable mHeight-30"
            }, React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", {
                className: "t-a-l"
            }, React.createElement("span", {
                className: "dsp-iblk fts-13 ft-c-22 lht-14"
            }, e.homeName)))))), React.createElement("th", {
                className: "t-va-m pd-l-10 pd-r-10 bg-c-18 t-a-c fontWeight-normal pd-0"
            }, React.createElement("table", {
                className: "width-100p v-aligntable mHeight-30"
            }, React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", {
                className: "t-a-l"
            }, React.createElement("span", {
                className: "dsp-iblk fts-13 ft-c-22 lht-14"
            }, l.Odds_Draw)))))), React.createElement("th", {
                className: "t-va-m pd-l-10 pd-r-10 bg-c-18 t-a-c fontWeight-normal pd-0"
            }, React.createElement("table", {
                className: "width-100p v-aligntable mHeight-30"
            }, React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", {
                className: "t-a-l"
            }, React.createElement("span", {
                className: "dsp-iblk fts-13 ft-c-22 lht-14"
            }, e.awayName))))))), _.map(e.odds, function (t, a) {
                return React.createElement("tr", {
                    key: "wm0" + a
                }, _.map(t, function (l, c) {
                    var s = {
                            value: l,
                            score: e.score,
                            child_score: e.child_score,
                            inPlay: e.inPlay,
                            eventId: e.eventId,
                            parentEventId: e.parentEventId,
                            isHL: -1 != _.indexOf(e.highLightOdds, l[0].slice(1)),
                            ocg: e.oddsChange,
                            ot: e.oddsType,
                            name: l[2]
                        },
                        n = "" == l[1] || "0.00" == l[1] ? null : this.addSelection.bind(this, s);
                    return React.createElement("td", {
                        key: "wm1" + c,
                        className: "t-va-m pd-0 pd-l-10 pd-r-10" + ("" == l[1] || "0.00" == l[1] ? " nopointer nohighlight" : "") + (0 == a ? "" : " topBorder_lv3") + (t.length - 1 != c ? " rightBorder_lv1" : ""),
                        onClick: n
                    }, React.createElement("table", {
                        className: "width-100p v-aligntable lht-26"
                    }, React.createElement("colgroup", null, React.createElement("col", null), React.createElement("col", {
                        className: "col-fixed45"
                    })), React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", {
                        className: "t-a-l ft-c-25 lht-14 pd-r-10" + ("" == l[1] || "0.00" == l[1] ? " nopointer nohighlight" : "")
                    }, s.name), React.createElement("td", {
                        className: "t-a-r pd-b-4" + (0 == a ? " pd-t-5" : " pd-t-4") + ("" == l[1] || "0.00" == l[1] ? " nopointer nohighlight" : "")
                    }, React.createElement(AllMarketPage.Market.Odds.Normal, {
                        data: s
                    }))))))
                }, this))
            }, this)))
        }
    }), AllMarketPage.Market.MarketType.NG = React.createClass({
        displayName: "NG",
        mixins: [AllMarketPage.Utility.market],
        render: function () {
            var e = this.props.data;
            return React.createElement("table", {
                className: "width-100p t-va-m hoverabletb"
            }, React.createElement("colgroup", null, React.createElement("col", {
                className: "col-33Percent"
            }), React.createElement("col", {
                className: "col-33Percent"
            }), React.createElement("col", {
                className: "col-33Percent"
            })), React.createElement("tbody", null, _.map(e.odds, function (t, a) {
                return React.createElement("tr", {
                    key: "ng0" + a
                }, _.map(t, function (l, c) {
                    var s = {
                            value: l,
                            score: e.score,
                            child_score: e.child_score,
                            inPlay: e.inPlay,
                            eventId: e.eventId,
                            parentEventId: e.parentEventId,
                            isHL: -1 != _.indexOf(e.highLightOdds, l[0].slice(1)),
                            ocg: e.oddsChange,
                            ot: e.oddsType,
                            name: l[2]
                        },
                        n = "" == l[1] || "0.00" == l[1] ? null : this.addSelection.bind(this, s);
                    return React.createElement("td", {
                        key: "ng1" + c,
                        className: "t-va-m pd-0 pd-l-10 pd-r-10" + ("" == l[1] || "0.00" == l[1] ? " nopointer nohighlight" : "") + (0 == a ? "" : " topBorder_lv3") + (t.length - 1 != c ? " rightBorder_lv1" : ""),
                        onClick: n
                    }, React.createElement("table", {
                        className: "width-100p v-aligntable lht-26"
                    }, React.createElement("colgroup", null, React.createElement("col", null), React.createElement("col", {
                        className: "col-fixed45"
                    })), React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", {
                        className: "t-a-l ft-c-25 lht-14 pd-r-10" + ("" == l[1] || "0.00" == l[1] ? " nopointer nohighlight" : "")
                    }, s.name), React.createElement("td", {
                        className: "t-a-r pd-b-4" + (0 == a ? " pd-t-5" : " pd-t-4") + ("" == l[1] || "0.00" == l[1] ? " nopointer nohighlight" : "")
                    }, React.createElement(AllMarketPage.Market.Odds.Normal, {
                        data: s
                    }))))))
                }, this))
            }, this)))
        }
    }), AllMarketPage.Market.MarketType.WQ = React.createClass({
        displayName: "WQ",
        mixins: [AllMarketPage.Utility.market],
        render: function () {
            var e = this.props.data;
            return React.createElement("table", {
                className: "width-100p t-va-m hoverabletb"
            }, React.createElement("colgroup", null, React.createElement("col", {
                className: "col-33Percent"
            }), React.createElement("col", {
                className: "col-33Percent"
            }), React.createElement("col", {
                className: "col-33Percent"
            }), React.createElement("col", {
                className: "col-33Percent"
            })), React.createElement("tbody", null, React.createElement("tr", null, React.createElement("th", {
                className: "t-va-m pd-l-10 pd-r-10 bg-c-18 t-a-c fontWeight-normal pd-0"
            }, React.createElement("table", {
                className: "width-100p v-aligntable mHeight-30"
            }, React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", {
                className: "t-a-l"
            }, React.createElement("span", {
                className: "dsp-iblk fts-13 ft-c-22 lht-14"
            }, e.homeName)))))), React.createElement("th", {
                className: "t-va-m pd-l-10 pd-r-10 bg-c-18 t-a-c fontWeight-normal pd-0"
            }, React.createElement("table", {
                className: "width-100p v-aligntable mHeight-30"
            }, React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", {
                className: "t-a-c"
            }, React.createElement("span", {
                className: "dsp-iblk fts-13 ft-c-22 lht-14"
            })))))), React.createElement("th", {
                className: "t-va-m pd-l-10 pd-r-10 bg-c-18 t-a-c fontWeight-normal pd-0"
            }, React.createElement("table", {
                className: "width-100p v-aligntable mHeight-30"
            }, React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", {
                className: "t-a-l"
            }, React.createElement("span", {
                className: "dsp-iblk fts-13 ft-c-22 lht-14"
            }, e.awayName)))))), React.createElement("th", {
                className: "t-va-m pd-l-10 pd-r-10 bg-c-18 t-a-c fontWeight-normal pd-0"
            }, React.createElement("table", {
                className: "width-100p v-aligntable mHeight-30"
            }, React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", {
                className: "t-a-c"
            }, React.createElement("span", {
                className: "dsp-iblk fts-13 ft-c-22 lht-14"
            }))))))), _.map(e.odds, function (t, a) {
                return React.createElement("tr", {
                    key: "wq0" + a
                }, _.map(t, function (l, c) {
                    var s = {
                            value: l,
                            score: e.score,
                            child_score: e.child_score,
                            inPlay: e.inPlay,
                            eventId: e.eventId,
                            parentEventId: e.parentEventId,
                            isHL: -1 != _.indexOf(e.highLightOdds, l[0].slice(1)),
                            ocg: e.oddsChange,
                            ot: e.oddsType,
                            name: this.getSnameOrMname(l[2], 2, "-")
                        },
                        n = "" == l[1] || "0.00" == l[1] ? null : this.addSelection.bind(this, s);
                    return React.createElement("td", {
                        key: "wq1" + c,
                        className: "t-va-m pd-0 pd-l-10 pd-r-10" + ("" == l[1] || "0.00" == l[1] ? " nopointer nohighlight" : "") + (0 == a ? "" : " topBorder_lv3") + (t.length - 1 != c ? " rightBorder_lv1" : ""),
                        onClick: n
                    }, React.createElement("table", {
                        className: "width-100p v-aligntable lht-26"
                    }, React.createElement("colgroup", null, React.createElement("col", null), React.createElement("col", {
                        className: "col-fixed45"
                    })), React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", {
                        className: "t-a-l ft-c-25 lht-14 pd-r-10" + ("" == l[1] || "0.00" == l[1] ? " nopointer nohighlight" : "")
                    }, s.name), React.createElement("td", {
                        className: "t-a-r pd-b-4" + (0 == a ? " pd-t-5" : " pd-t-4") + ("" == l[1] || "0.00" == l[1] ? " nopointer nohighlight" : "")
                    }, React.createElement(AllMarketPage.Market.Odds.Normal, {
                        data: s
                    }))))))
                }, this))
            }, this)))
        }
    }), AllMarketPage.Market.MarketType.GBB = React.createClass({
        displayName: "GBB",
        mixins: [AllMarketPage.Utility.market],
        render: function () {
            var e = this.props.data;
            return React.createElement("table", {
                className: "width-100p t-va-m hoverabletb"
            }, React.createElement("colgroup", null, React.createElement("col", {
                className: "col-33Percent"
            }), React.createElement("col", {
                className: "col-33Percent"
            }), React.createElement("col", {
                className: "col-33Percent"
            })), React.createElement("tbody", null, React.createElement("tr", null, React.createElement("th", {
                className: "t-va-m pd-l-10 pd-r-10 bg-c-18 t-a-c fontWeight-normal pd-0"
            }, React.createElement("table", {
                className: "width-100p v-aligntable mHeight-30"
            }, React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", {
                className: "t-a-l"
            }, React.createElement("span", {
                className: "dsp-iblk fts-13 ft-c-22 lht-14"
            }, e.homeName)))))), React.createElement("th", {
                className: "t-va-m pd-l-10 pd-r-10 bg-c-18 t-a-c fontWeight-normal pd-0"
            }, React.createElement("table", {
                className: "width-100p v-aligntable mHeight-30"
            }, React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", {
                className: "t-a-l"
            }, React.createElement("span", {
                className: "dsp-iblk fts-13 ft-c-22 lht-14"
            }, l.Odds_Draw)))))), React.createElement("th", {
                className: "t-va-m pd-l-10 pd-r-10 bg-c-18 t-a-c fontWeight-normal pd-0"
            }, React.createElement("table", {
                className: "width-100p v-aligntable mHeight-30"
            }, React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", {
                className: "t-a-l"
            }, React.createElement("span", {
                className: "dsp-iblk fts-13 ft-c-22 lht-14"
            }, e.awayName))))))), _.map(e.odds, function (t, a) {
                return React.createElement("tr", {
                    key: "gbb0" + a
                }, _.map(t, function (l, c) {
                    var s = {
                            value: l,
                            score: e.score,
                            child_score: e.child_score,
                            inPlay: e.inPlay,
                            eventId: e.eventId,
                            parentEventId: e.parentEventId,
                            isHL: -1 != _.indexOf(e.highLightOdds, l[0].slice(1)),
                            ocg: e.oddsChange,
                            ot: e.oddsType,
                            name: this.getSnameOrMname(l[2], 2, "&")
                        },
                        n = "" == l[1] || "0.00" == l[1] ? null : this.addSelection.bind(this, s);
                    return React.createElement("td", {
                        key: "gbb1" + c,
                        className: "t-va-m pd-0 pd-l-10 pd-r-10" + ("" == l[1] || "0.00" == l[1] ? " nopointer nohighlight" : "") + (0 == a ? "" : " topBorder_lv3") + (t.length - 1 != c ? " rightBorder_lv1" : ""),
                        onClick: n
                    }, React.createElement("table", {
                        className: "width-100p v-aligntable lht-26"
                    }, React.createElement("colgroup", null, React.createElement("col", null), React.createElement("col", {
                        className: "col-fixed45"
                    })), React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", {
                        className: "t-a-l ft-c-25 lht-14 pd-r-10" + ("" == l[1] || "0.00" == l[1] ? " nopointer nohighlight" : "")
                    }, s.name), React.createElement("td", {
                        className: "t-a-r pd-b-4" + (0 == a ? " pd-t-5" : " pd-t-4") + ("" == l[1] || "0.00" == l[1] ? " nopointer nohighlight" : "")
                    }, React.createElement(AllMarketPage.Market.Odds.Normal, {
                        data: s
                    }))))))
                }, this))
            }, this)))
        }
    }), AllMarketPage.Market.MarketType.DC = React.createClass({
        displayName: "DC",
        mixins: [AllMarketPage.Utility.market],
        render: function () {
            var e = this.props.data;
            return React.createElement("table", {
                className: "width-100p t-va-m hoverabletb"
            }, React.createElement("colgroup", null, React.createElement("col", {
                className: "col-33Percent"
            }), React.createElement("col", {
                className: "col-33Percent"
            }), React.createElement("col", {
                className: "col-33Percent"
            })), React.createElement("tbody", null, React.createElement("tr", null, React.createElement("th", {
                className: "t-va-m pd-l-10 pd-r-10 bg-c-18 t-a-c fontWeight-normal pd-0"
            }, React.createElement("table", {
                className: "width-100p v-aligntable mHeight-30"
            }, React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", {
                className: "t-a-l"
            }, React.createElement("span", {
                className: "dsp-iblk fts-13 ft-c-22 lht-14"
            }, e.homeName, " / ", l.Odds_Draw)))))), React.createElement("th", {
                className: "t-va-m pd-l-10 pd-r-10 bg-c-18 t-a-c fontWeight-normal pd-0"
            }, React.createElement("table", {
                className: "width-100p v-aligntable mHeight-30"
            }, React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", {
                className: "t-a-l"
            }, React.createElement("span", {
                className: "dsp-iblk fts-13 ft-c-22 lht-14"
            }, e.awayName, " / ", l.Odds_Draw)))))), React.createElement("th", {
                className: "t-va-m pd-l-10 pd-r-10 bg-c-18 t-a-c fontWeight-normal pd-0"
            }, React.createElement("table", {
                className: "width-100p v-aligntable mHeight-30"
            }, React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", {
                className: "t-a-l"
            }, React.createElement("span", {
                className: "dsp-iblk fts-13 ft-c-22 lht-14"
            }, e.homeName, " / ", e.awayName))))))), _.map(e.odds, function (t, a) {
                return React.createElement("tr", {
                    key: "dc0" + a
                }, _.map(t, function (l, c) {
                    var s = {
                            value: l,
                            score: e.score,
                            child_score: e.child_score,
                            inPlay: e.inPlay,
                            eventId: e.eventId,
                            parentEventId: e.parentEventId,
                            isHL: -1 != _.indexOf(e.highLightOdds, l[0].slice(1)),
                            ocg: e.oddsChange,
                            ot: e.oddsType,
                            name: this.getSnameOrMname(l[2], 2, "&")
                        },
                        n = "" == l[1] || "0.00" == l[1] ? null : this.addSelection.bind(this, s);
                    return React.createElement("td", {
                        key: "dc1" + c,
                        className: "t-va-m pd-0 pd-l-10 pd-r-10" + ("" == l[1] || "0.00" == l[1] ? " nopointer nohighlight" : "") + (0 == a ? "" : " topBorder_lv3") + (t.length - 1 != c ? " rightBorder_lv1" : ""),
                        onClick: n
                    }, React.createElement("table", {
                        className: "width-100p v-aligntable lht-26"
                    }, React.createElement("colgroup", null, React.createElement("col", null), React.createElement("col", {
                        className: "col-fixed45"
                    })), React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", {
                        className: "t-a-l ft-c-25 lht-14 pd-r-10" + ("" == l[1] || "0.00" == l[1] ? " nopointer nohighlight" : "")
                    }, s.name), React.createElement("td", {
                        className: "t-a-r pd-b-4" + (0 == a ? " pd-t-5" : " pd-t-4") + ("" == l[1] || "0.00" == l[1] ? " nopointer nohighlight" : "")
                    }, React.createElement(AllMarketPage.Market.Odds.Normal, {
                        data: s
                    }))))))
                }, this))
            }, this)))
        }
    }), AllMarketPage.Market.MarketType.GB = React.createClass({
        displayName: "GB",
        mixins: [AllMarketPage.Utility.market],
        render: function () {
            var e = this.props.data,
                t = "" != this.getSnameOrMname(e.odds[0][0][2], 0, "&") ? this.getSnameOrMname(e.odds[0][0][2], 0, "&") : this.getSnameOrMname(e.odds[0][1][2], 0, "&"),
                a = "" != this.getSnameOrMname(e.odds[0][2][2], 0, "&") ? this.getSnameOrMname(e.odds[0][2][2], 0, "&") : this.getSnameOrMname(e.odds[0][3][2], 0, "&");
            return React.createElement("table", {
                className: "width-100p t-va-m hoverabletb"
            }, React.createElement("colgroup", null, React.createElement("col", {
                className: "col-33Percent"
            }), React.createElement("col", {
                className: "col-33Percent"
            }), React.createElement("col", {
                className: "col-33Percent"
            }), React.createElement("col", {
                className: "col-33Percent"
            })), React.createElement("tbody", null, React.createElement("tr", null, React.createElement("th", {
                className: "t-va-m pd-l-10 pd-r-10 bg-c-18 t-a-c fontWeight-normal pd-0"
            }, React.createElement("table", {
                className: "width-100p v-aligntable mHeight-30"
            }, React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", {
                className: "t-a-l"
            }, React.createElement("span", {
                className: "dsp-iblk fts-13 ft-c-22 lht-14"
            }, t)))))), React.createElement("th", {
                className: "t-va-m pd-l-10 pd-r-10 bg-c-18 t-a-c fontWeight-normal pd-0"
            }, React.createElement("table", {
                className: "width-100p v-aligntable mHeight-30"
            }, React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", {
                className: "t-a-c"
            }, React.createElement("span", {
                className: "dsp-iblk fts-13 ft-c-22 lht-14"
            })))))), React.createElement("th", {
                className: "t-va-m pd-l-10 pd-r-10 bg-c-18 t-a-c fontWeight-normal pd-0"
            }, React.createElement("table", {
                className: "width-100p v-aligntable mHeight-30"
            }, React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", {
                className: "t-a-l"
            }, React.createElement("span", {
                className: "dsp-iblk fts-13 ft-c-22 lht-14"
            }, a)))))), React.createElement("th", {
                className: "t-va-m pd-l-10 pd-r-10 bg-c-18 t-a-c fontWeight-normal pd-0"
            }, React.createElement("table", {
                className: "width-100p v-aligntable mHeight-30"
            }, React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", {
                className: "t-a-c"
            }, React.createElement("span", {
                className: "dsp-iblk fts-13 ft-c-22 lht-14"
            }))))))), _.map(e.odds, function (t, a) {
                return React.createElement("tr", {
                    key: "dc0" + a
                }, _.map(t, function (l, c) {
                    var s = {
                            value: l,
                            score: e.score,
                            child_score: e.child_score,
                            inPlay: e.inPlay,
                            eventId: e.eventId,
                            parentEventId: e.parentEventId,
                            isHL: -1 != _.indexOf(e.highLightOdds, l[0].slice(1)),
                            ocg: e.oddsChange,
                            ot: e.oddsType,
                            name: this.getSnameOrMname(l[2], 2, "&")
                        },
                        n = "" == l[1] || "0.00" == l[1] ? null : this.addSelection.bind(this, s);
                    return React.createElement("td", {
                        key: "dc1" + c,
                        className: "t-va-m pd-0 pd-l-10 pd-r-10" + ("" == l[1] || "0.00" == l[1] ? " nopointer nohighlight" : "") + (0 == a ? "" : " topBorder_lv3") + (t.length - 1 != c ? " rightBorder_lv1" : ""),
                        onClick: n
                    }, React.createElement("table", {
                        className: "width-100p v-aligntable lht-26"
                    }, React.createElement("colgroup", null, React.createElement("col", null), React.createElement("col", {
                        className: "col-fixed45"
                    })), React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", {
                        className: "t-a-l ft-c-25 lht-14 pd-r-10" + ("" == l[1] || "0.00" == l[1] ? " nopointer nohighlight" : "")
                    }, s.name), React.createElement("td", {
                        className: "t-a-r pd-b-4" + (0 == a ? " pd-t-5" : " pd-t-4") + ("" == l[1] || "0.00" == l[1] ? " nopointer nohighlight" : "")
                    }, React.createElement(AllMarketPage.Market.Odds.Normal, {
                        data: s
                    }))))))
                }, this))
            }, this)))
        }
    }), AllMarketPage.Market.MarketType.GTS = React.createClass({
        displayName: "GTS",
        mixins: [AllMarketPage.Utility.market],
        render: function () {
            var e = this.props.data,
                t = "" != this.getSnameOrMname(e.odds[0][0][2], 0, "&") ? this.getSnameOrMname(e.odds[0][0][2], 0, "&") : this.getSnameOrMname(e.odds[1][0][2], 0, "&"),
                a = "" != this.getSnameOrMname(e.odds[0][1][2], 0, "&") ? this.getSnameOrMname(e.odds[0][1][2], 0, "&") : this.getSnameOrMname(e.odds[1][1][2], 0, "&");
            return React.createElement("table", {
                className: "width-100p t-va-m hoverabletb"
            }, React.createElement("colgroup", null, React.createElement("col", {
                className: "col-33Percent"
            }), React.createElement("col", {
                className: "col-33Percent"
            })), React.createElement("tbody", null, React.createElement("tr", null, React.createElement("th", {
                className: "t-va-m pd-l-10 pd-r-10 bg-c-18 t-a-c fontWeight-normal pd-0"
            }, React.createElement("table", {
                className: "width-100p v-aligntable mHeight-30"
            }, React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", {
                className: "t-a-l"
            }, React.createElement("span", {
                className: "dsp-iblk fts-13 ft-c-22 lht-14"
            }, t)))))), React.createElement("th", {
                className: "t-va-m pd-l-10 pd-r-10 bg-c-18 t-a-c fontWeight-normal pd-0"
            }, React.createElement("table", {
                className: "width-100p v-aligntable mHeight-30"
            }, React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", {
                className: "t-a-l"
            }, React.createElement("span", {
                className: "dsp-iblk fts-13 ft-c-22 lht-14"
            }, a))))))), _.map(e.odds, function (t, a) {
                return React.createElement("tr", {
                    key: "gts0" + a
                }, _.map(t, function (l, c) {
                    var s = {
                            value: l,
                            score: e.score,
                            child_score: e.child_score,
                            inPlay: e.inPlay,
                            eventId: e.eventId,
                            parentEventId: e.parentEventId,
                            isHL: -1 != _.indexOf(e.highLightOdds, l[0].slice(1)),
                            ocg: e.oddsChange,
                            ot: e.oddsType,
                            name: this.getSnameOrMname(l[2], 2, "&")
                        },
                        n = "" == l[1] || "0.00" == l[1] ? null : this.addSelection.bind(this, s);
                    return React.createElement("td", {
                        key: "gts1" + c,
                        className: "t-va-m pd-0 pd-l-10 pd-r-10" + ("" == l[1] || "0.00" == l[1] ? " nopointer nohighlight" : "") + (0 == a ? "" : " topBorder_lv3") + (t.length - 1 != c ? " rightBorder_lv1" : ""),
                        onClick: n
                    }, React.createElement("table", {
                        className: "width-100p v-aligntable lht-26"
                    }, React.createElement("colgroup", null, React.createElement("col", null), React.createElement("col", {
                        className: "col-fixed45"
                    })), React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", {
                        className: "t-a-l ft-c-25 lht-14 pd-r-10" + ("" == l[1] || "0.00" == l[1] ? " nopointer nohighlight" : "")
                    }, s.name), React.createElement("td", {
                        className: "t-a-r pd-b-4" + (0 == a ? " pd-t-5" : " pd-t-4") + ("" == l[1] || "0.00" == l[1] ? " nopointer nohighlight" : "")
                    }, React.createElement(AllMarketPage.Market.Odds.Normal, {
                        data: s
                    }))))))
                }, this))
            }, this)))
        }
    }), AllMarketPage.Market.MarketType.NP = React.createClass({
        displayName: "NP",
        mixins: [AllMarketPage.Utility.market],
        render: function () {
            var e = this.props.data;
            return React.createElement("table", {
                className: "width-100p t-va-m hoverabletb"
            }, React.createElement("colgroup", null, React.createElement("col", {
                className: "col-33Percent"
            }), React.createElement("col", {
                className: "col-33Percent"
            }), React.createElement("col", {
                className: "col-33Percent"
            }), React.createElement("col", {
                className: "col-33Percent"
            })), React.createElement("tbody", null, React.createElement("tr", null, React.createElement("th", {
                className: "t-va-m pd-l-10 pd-r-10 bg-c-18 t-a-c fontWeight-normal pd-0"
            }, React.createElement("table", {
                className: "width-100p v-aligntable mHeight-30"
            }, React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", {
                className: "t-a-l"
            }, React.createElement("span", {
                className: "dsp-iblk fts-13 ft-c-22 lht-14"
            }, e.homeName)))))), React.createElement("th", {
                className: "t-va-m pd-l-10 pd-r-10 bg-c-18 t-a-c fontWeight-normal pd-0"
            }, React.createElement("table", {
                className: "width-100p v-aligntable mHeight-30"
            }, React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", {
                className: "t-a-l"
            }, React.createElement("span", {
                className: "dsp-iblk fts-13 ft-c-22 lht-14"
            })))))), React.createElement("th", {
                className: "t-va-m pd-l-10 pd-r-10 bg-c-18 t-a-c fontWeight-normal pd-0"
            }, React.createElement("table", {
                className: "width-100p v-aligntable mHeight-30"
            }, React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", {
                className: "t-a-l"
            }, React.createElement("span", {
                className: "dsp-iblk fts-13 ft-c-22 lht-14"
            }, e.awayName)))))), React.createElement("th", {
                className: "t-va-m pd-l-10 pd-r-10 bg-c-18 t-a-c fontWeight-normal pd-0"
            }, React.createElement("table", {
                className: "width-100p v-aligntable mHeight-30"
            }, React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", {
                className: "t-a-l"
            }, React.createElement("span", {
                className: "dsp-iblk fts-13 ft-c-22 lht-14"
            }))))))), _.map(e.odds, function (t, a) {
                return React.createElement("tr", {
                    key: "np0" + a
                }, _.map(t, function (l, c) {
                    var s = {
                            value: l,
                            score: e.score,
                            child_score: e.child_score,
                            inPlay: e.inPlay,
                            eventId: e.eventId,
                            parentEventId: e.parentEventId,
                            isHL: -1 != _.indexOf(e.highLightOdds, l[0].slice(1)),
                            ocg: e.oddsChange,
                            ot: e.oddsType,
                            name: l[2]
                        },
                        n = "" == l[1] || "0.00" == l[1] ? null : this.addSelection.bind(this, s);
                    return React.createElement("td", {
                        key: "np1" + c,
                        className: "t-va-m pd-0 pd-l-10 pd-r-10" + ("" == l[1] || "0.00" == l[1] ? " nopointer nohighlight" : "") + (0 == a ? "" : " topBorder_lv3") + (t.length - 1 != c ? " rightBorder_lv1" : ""),
                        onClick: n
                    }, React.createElement("table", {
                        className: "width-100p v-aligntable lht-26"
                    }, React.createElement("colgroup", null, React.createElement("col", null), React.createElement("col", {
                        className: "col-fixed45"
                    })), React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", {
                        className: "t-a-l ft-c-25 lht-14 pd-r-10" + ("" == l[1] || "0.00" == l[1] ? " nopointer nohighlight" : "")
                    }, s.name), React.createElement("td", {
                        className: "t-a-r pd-b-4" + (0 == a ? " pd-t-5" : " pd-t-4") + ("" == l[1] || "0.00" == l[1] ? " nopointer nohighlight" : "")
                    }, React.createElement(AllMarketPage.Market.Odds.Normal, {
                        data: s
                    }))))))
                }, this))
            }, this)))
        }
    }), AllMarketPage.Market.MarketType.SPWOS = React.createClass({
        displayName: "SPWOS",
        mixins: [AllMarketPage.Utility.market],
        render: function () {
            var e = this.props.data,
                t = React.createElement("col", {
                    key: "c0",
                    className: "col-100Percent"
                }),
                a = [React.createElement("col", {
                    key: "c0",
                    className: "col-50Percent"
                }), React.createElement("col", {
                    key: "c1",
                    className: "col-50Percent"
                })],
                l = [React.createElement("col", {
                    key: "c0",
                    className: "col-33Percent"
                }), React.createElement("col", {
                    key: "c1",
                    className: "col-33Percent"
                }), React.createElement("col", {
                    key: "c2",
                    className: "col-33Percent"
                })],
                c = {};
            switch (e.odds[0].length) {
                case 1:
                    c = t;
                    break;
                case 2:
                    c = a;
                    break;
                case 3:
                    c = l
            }
            return React.createElement("table", {
                className: "width-100p t-va-t hoverabletb SPWOS"
            }, React.createElement("colgroup", null, c), React.createElement("tbody", null, _.map(e.odds, function (t, a) {
                return React.createElement("tr", {
                    key: a
                }, _.map(t, function (t, l) {
                    var c = {
                            value: t,
                            score: e.score,
                            child_score: e.child_score,
                            inPlay: e.inPlay,
                            eventId: e.eventId,
                            parentEventId: e.parentEventId,
                            isHL: void 0 !== t[0] && -1 != _.indexOf(e.highLightOdds, t[0].slice(1)),
                            ocg: e.oddsChange,
                            ot: e.oddsType,
                            name: 5 == t.length ? t[4] : t[2]
                        },
                        s = this.isOddsUnaval(t) ? null : this.addSelection.bind(this, c);
                    return React.createElement("td", {
                        key: l,
                        className: "t-va-m pd-0 pd-l-10 pd-r-10" + (this.isOddsUnaval(c.value) ? " nopointer nohighlight" : "") + (0 == a ? "" : " topBorder_lv3") + (l != t.length - 1 ? " rightBorder_lv1" : ""),
                        onClick: s
                    }, React.createElement("table", {
                        className: "width-100p v-aligntable lht-26"
                    }, React.createElement("colgroup", null, React.createElement("col", null), React.createElement("col", {
                        className: 5 == t.length ? "col-fixed105" : "col-fixed45"
                    })), React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", {
                        className: "t-a-l ft-c-25 lht-14 pd-r-10" + (this.isOddsUnaval(c.value) ? " nopointer nohighlight" : "")
                    }, c.name), React.createElement("td", {
                        className: "t-a-r pd-b-4" + (0 == a ? " pd-t-5" : " pd-t-4") + (this.isOddsUnaval(c.value) ? " nopointer nohighlight" : "")
                    }, 5 == t.length ? React.createElement("div", {
                        className: "noMergeOdds"
                    }, React.createElement(AllMarketPage.Market.Odds.AHOU, {
                        data: c
                    })) : React.createElement(AllMarketPage.Market.Odds.Normal, {
                        data: c
                    }))))))
                }, this))
            }, this)))
        }
    }), AllMarketPage.Market.MarketType.EPS = React.createClass({
        displayName: "EPS",
        mixins: [AllMarketPage.Utility.market],
        render: function () {
            var e = this.props.data;
            return null == e ? null : React.createElement("div", {
                className: "bg-c-1"
            }, React.createElement("table", {
                className: "tb-eps width-100p fts-13"
            }, React.createElement("colgroup", null, React.createElement("col", null), React.createElement("col", {
                className: "col-fixed65"
            }), React.createElement("col", {
                className: "col-fixed65"
            })), React.createElement("thead", {
                className: " ft-c-3  radius"
            }, React.createElement("tr", null, React.createElement("th", {
                className: "height-38 bg-c-4  t-a-l fontWeight-normal pd-l-10"
            }, e.market.n), React.createElement("th", {
                className: "height-38 ft-c-56 t-a-c bg-c-4 fontWeight-normal "
            }, l.OP_Was), React.createElement("th", {
                className: "height-38 t-a-c  bg-c-4  fontWeight-normal "
            }, l.OP_Now)))), React.createElement("table", {
                className: "tb-eps width-100p fts-13"
            }, React.createElement("colgroup", null, React.createElement("col", null), React.createElement("col", {
                className: "col-fixed65"
            }), React.createElement("col", {
                className: "col-fixed65"
            })), React.createElement("tbody", null, _.map(e.odds, function (t, a) {
                var l = {
                    value: t,
                    score: ":",
                    child_score: ":",
                    inPlay: e.inPlay,
                    eventId: e.eventId,
                    parentEventId: e.parentEventId,
                    isHL: void 0 !== t[0] && -1 != _.indexOf(e.highLightOdds, t[0].slice(1)),
                    ocg: e.oddsChange,
                    ot: e.oddsType,
                    name: t[2]
                };
                this.isOddsUnaval(t) || this.addSelection.bind(this, l, !1);
                return React.createElement("tr", {
                    key: a,
                    className: !AMStore.getShowMoreLess_EPS() && a >= 2 ? "hidden" : ""
                }, React.createElement("td", {
                    className: "pd-0 pd-l-10 height-40 ft-c-25"
                }, t[2]), React.createElement("td", {
                    className: "pd-0 t-a-c height-40"
                }, React.createElement("span", {
                    className: "odds odds-last linethrough"
                }, t[3])), React.createElement("td", {
                    className: "pd-0 t-a-c height-40" + (this.isOddsUnaval(l.value) ? " nopointer nohighlight" : "")
                }, React.createElement(AllMarketPage.Market.Odds.Normal, {
                    data: l
                })))
            }, this))), React.createElement("div", {
                className: "viewall lht-35 t-a-c fts-13 topBorder" + (AMStore.getShowMoreLess_EPS() ? " td-showLess" : " td-showMore") + (e.odds.length <= 2 ? " hidden" : ""),
                onClick: this._switchLessMore
            }, React.createElement("div", {
                className: "showless"
            }, l.MB_ShowLess), React.createElement("div", {
                className: "showmore"
            }, l.MB_ShowMore)))
        },
        _switchLessMore: function (e) {
            e.preventDefault(), e.stopPropagation(), Action.AllMarket.switchLessMore_EPS(!AMStore.getShowMoreLess_EPS())
        }
    }), AllMarketPage.Market.Odds = {}, AllMarketPage.Market.Odds.AHOU = React.createClass({
        displayName: "AHOU",
        mixins: [AllMarketPage.Utility.odds],
        componentDidMount: function () {
            this.deepLinkClicked && setTimeout(this.deepLinkClicked, 500)
        },
        deepLinkClicked: null,
        render: function () {
            var e = this.props.data,
                t = e.value,
                a = e.OU,
                l = e.isAH;
            if (e.inPlay && "0.00" == t[3]) return React.createElement(AllMarketPage.Market.Odds.Locked, {
                eid: t[2]
            });
            var c = "" == e.child_score || ":" == e.child_score ? e.score : e.child_score,
                s = this.getUpDownflag(e.ocg, t[2]),
                n = t[2].substring(1),
                r = this.addSelection.bind(this, n, e.eventId, t[3], t[1], c, e.inPlay, e.parentEventId);
            return AMStore.getDeeplinkSelId() === parseInt(n) && (this.deepLinkClicked = r), React.createElement("div", {
                className: "OddsWrapper dsp-iblk lht-1p2" + (e.isHL ? " selected" : "") + (0 == s ? "" : 1 == s ? " oddsUp" : " oddsDown"),
                title: e.name
            }, React.createElement("span", {
                className: "ouHdp"
            }, l || void 0 === a || "" == a ? null : React.createElement("span", {
                className: "ou mg-r-3  ft-c-18"
            }, a), React.createElement("span", {
                className: "handicap dark ft-c-16 mg-r-6"
            }, t[1])), React.createElement("span", {
                className: "odds" + (parseFloat(t[3]) < 0 ? " negOdds" : ""),
                id: t[2],
                onClick: r
            }, React.createElement("span", {
                className: "ouHdp pd-b-3 pd-t-3"
            }, l || void 0 === a || "" == a ? null : React.createElement("span", {
                className: "ou"
            }, a), "0.00" != t[3] ? React.createElement("span", {
                className: "handicap"
            }, t[1]) : React.createElement("span", {
                className: "odds-blank"
            })), t[3]))
        }
    }), AllMarketPage.Market.Odds.Normal = React.createClass({
        displayName: "Normal",
        mixins: [AllMarketPage.Utility.odds],
        componentDidMount: function () {
            this.deepLinkClicked && setTimeout(this.deepLinkClicked, 500)
        },
        deepLinkClicked: null,
        render: function () {
            if (void 0 === this.props.data) return null;
            var e = this.props.data,
                t = e.value,
                a = "" == e.child_score || ":" == e.child_score ? e.score : e.child_score;
            if (void 0 === t[0] || "" == t[0]) return React.createElement("div", null);
            if (e.inPlay && ("c" == t[1] || "0.00" == t[1])) return React.createElement(AllMarketPage.Market.Odds.Locked, {
                eid: t[0]
            });
            var l = this.getUpDownflag(e.ocg, t[0]),
                c = t[0].substring(1),
                s = this.addSelection.bind(this, c, e.eventId, t[1], null, a, e.inPlay, e.parentEventId);
            return AMStore.getDeeplinkSelId() === parseInt(c) && (this.deepLinkClicked = s), React.createElement("div", {
                className: "OddsWrapper dsp-iblk lht-1p2" + (e.isHL ? " selected" : "") + (0 == l ? "" : 1 == l ? " oddsUp" : " oddsDown"),
                title: e.name,
                onClick: s
            }, void 0 !== t[1] && "0.00" != parseFloat(t[1]) ? React.createElement("span", {
                className: "odds odds-last",
                id: t[0]
            }, t[1]) : React.createElement("span", {
                className: "odds-blank"
            }))
        }
    }), AllMarketPage.Market.Odds.Locked = React.createClass({
        displayName: "Locked",
        render: function () {
            return React.createElement("div", {
                className: "OddsWrapper dsp-iblk"
            }, React.createElement("span", {
                className: "odds locked",
                id: this.props.eid
            }, React.createElement("span", {
                className: "icon-Lock"
            }), React.createElement("svg", {
                width: "37",
                height: "20",
                className: "lockedBg"
            }, React.createElement("rect", {
                width: "100%",
                height: "100%",
                fill: "url(#p1)"
            }))))
        }
    }), AllMarketPage.Button = {}, AllMarketPage.Button.Stat = React.createClass({
        displayName: "Stat",
        render: function () {
            return React.createElement("span", {
                className: "dsp-iblk icon-Stats fts-13 wh-ht-22 lht-22",
                onClick: this._openStatWindow.bind(this, this.props.eventId)
            })
        },
        _openStatWindow: function (e, t) {
            t.preventDefault(), t.stopPropagation();
            var a = screen.width / 2 - 502.5,
                l = screen.height / 2 - 360,
                c = "center=yes,resizable=yes,scrollbars=yes, width=1005, height=720,left=" + a + ",top=" + l;
            window.open("/" + window.global.lan + "/info-centre/sportsbook-info/statistics/" + e, "statistics", c)
        }
    }), AllMarketPage.Button.Refresh = React.createClass({
        displayName: "Refresh",
        render: function () {
            return React.createElement("span", {
                className: "dsp-iblk icon-Refresh fts-16 wh-ht-22 lht-22",
                onClick: this._refreshData
            })
        },
        _refreshData: function (e) {
            e.preventDefault(), e.stopPropagation(), cCtrl.loadContent(location.pathname, !1, !1, null, !0)
        }
    }), module.exports = AllMarketPage
}, function (e, t, a) {
    "use strict";
    var c = Object.assign || function (e) {
            for (var t = 1; t < arguments.length; t++) {
                var a = arguments[t];
                for (var l in a) Object.prototype.hasOwnProperty.call(a, l) && (e[l] = a[l])
            }
            return e
        },
        s = React.createClass({
            displayName: "Homepage",
            _getDataFromStore: function () {
                return {
                    data: HP_Store.getData(),
                    extraData: HP_Store.getExtraData()
                }
            },
            getInitialState: function () {
                return this._getDataFromStore()
            },
            componentDidMount: function () {
                HP_Store.addUpdateListener(this._onUpdate)
            },
            componentDidUpdate: function () {
                var e = this.state.data.l.r;
                Timer.after(e, function () {
                    Action.RefreshSite()
                }), this.state.extraData.needUpdateOddsJump && Timer.after(5, function () {
                    Action.Homepage.removeOddsJump()
                }), this.state.extraData.isDisplay && (ScrollerBar.initScrollbarStatus(), this.state.extraData.needScrollTop && ScrollerBar.scrollToTop(), Action.ProcessingFinish())
            },
            render: function () {
                if (null == this.state.data.l.m && 0 == this.state.data.l.s.length && 0 == this.state.data.l.hip.length && 0 == this.state.data.l.hnph.length && 0 == this.state.data.l.hnps.length) return React.createElement("div", {
                    className: "hidden"
                });
                var e = this.state.extraData;
                e.odds.addOddsJump = this._addOddsJump;
                var t = {
                        data: this.state.data.l,
                        extraData: e
                    },
                    a = {
                        data: this.state.data.r,
                        extraData: e
                    };
                return React.createElement("div", {
                    className: "homepage" + (this.state.extraData.isDisplay ? "" : " hidden")
                }, React.createElement("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    width: "37",
                    height: "20",
                    className: "lockedBg_svg",
                    dangerouslySetInnerHTML: {
                        __html: '<defs><pattern id="p1" patternUnits="objectBoundingBox" width=".1" height=".1" patternTransform="rotate(45)"><rect width="3" height="100" fill="#000" x="0" y="0" opacity=".06"></rect></pattern></defs>'
                    }
                }), React.createElement(s.rightPanel, {
                    data: a
                }), React.createElement(s.leftPanel, {
                    data: t
                }), React.createElement("div", {
                    className: "clearBoth"
                }))
            },
            _addOddsJump: function (e, t) {
                if (e) {
                    var a = this.state.extraData;
                    1 == t ? a.odds.oddsUp.push(e) : 2 == t && a.odds.oddsDown.push(e), a.needUpdateOddsJump = !0
                }
            },
            _onUpdate: function () {
                this.setState(this._getDataFromStore())
            }
        });
    s.Utility = {
        timer: {
            _getIPTime: function (e, t) {
                var a = e.split(":"),
                    l = (Math.abs(a[1]) + t) % 60,
                    c = Math.abs(a[0]) + Math.floor((Math.abs(a[1]) + t) / 60);
                return (c < 10 ? ("0" + c).slice(-2) : c) + ":" + (l < 10 ? ("0" + l).slice(-2) : l)
            },
            _getEventDate: function (e) {
                var t = moment(e);
                return t.isSame(new Date, "d") ? "" : t.format("DD / MM")
            },
            _getEventDateForPreStart: function (e) {
                return moment(e).format("DD / MM")
            },
            _getEventStartTime: function (e) {
                return moment(e).format("HH:mm")
            },
            _getShortPeriod: function (e) {
                var t = null;
                return e && ((t = l["sti" + e.toUpperCase()]) || (t = e)), t
            },
            _getLongPeriod: function (e) {
                return null == e ? "" : l["ti" + e]
            }
        },
        odds: {
            _needBlackTeamName: function (e) {
                return /-/.test(e)
            },
            _getHDPbyOddsType: function (e) {
                this.props.data.extraData.odds.isEuroOdds;
                return null == e || "" == e ? "" : e
            },
            _getOddsByRegion: function (e, t, a) {
                if (18 == a) return null != t.o && null != t.o.ml ? this._getOddsItems("ml", t) : null;
                if (14 == a) return null != t.o && t.o["1x2"] ? this._getOddsItems("1x2", t) : null;
                if (25 == a) return null != t.o && t.o.win ? this._getOddsItems("win", t) : null;
                switch (e) {
                    case "HDP":
                        return t.o && t.o.ah ? this._getOddsItems("ah", t) : null;
                    case "1X2":
                        return t.o && t.o["1x2"] ? this._getOddsItems("1x2", t) : null;
                    case "ML":
                        return t.o && t.o.ml ? this._getOddsItems("ml", t) : null;
                    default:
                        return null
                }
            },
            _getEpmOddsItem: function (e, t) {
                if (!t) return null;
                var a = [{
                    sid: t.id,
                    hdp: null,
                    odds: t.o,
                    ttp: l.EPM.EPM
                }];
                if (null != a) {
                    var c = this._highlightCheck,
                        s = this._formatSelectionId;
                    _.forEach(a, function (e, t) {
                        null != e && (e instanceof Array ? _.forEach(e, function (e, t) {
                            e.sid = s(e.sid), e.isHL = c(e.sid)
                        }) : (e.sid = s(e.sid), e.isHL = c(e.sid)))
                    })
                }
                return a
            },
            _getOddsItems: function (e, t) {
                var a;
                if (null == t.o || null == t.o[e]) return null;
                a = t.o[e];
                var c;
                switch (e) {
                    case "ah":
                    case "ahfts":
                        "0" == a[1] && a[3], this.props.data.extraData.odds.isEuroOdds;
                        c = [{
                            sid: a[4],
                            hdp: a[1],
                            odds: a[5],
                            chdp: "0" == a[1] ? a[1] : this._getHDPbyOddsType(a[1]),
                            ttp: t.i[0]
                        }, {
                            sid: a[6],
                            hdp: a[3],
                            odds: a[7],
                            chdp: "0" == a[3] ? a[3] : this._getHDPbyOddsType(a[3]),
                            ttp: t.i[1]
                        }];
                        break;
                    case "ou":
                    case "t1ou":
                    case "t2ou":
                    case "oufts":
                        c = [{
                            sid: a[4],
                            hdp: a[1],
                            odds: a[5],
                            OU: "O",
                            ttp: l.Odds_Over
                        }, {
                            sid: a[6],
                            hdp: a[3],
                            odds: a[7],
                            OU: "U",
                            ttp: l.Odds_Under
                        }];
                        break;
                    case "1x2":
                        c = [{
                            sid: a[0],
                            hdp: null,
                            odds: a[1],
                            ttp: t.i[0]
                        }, {
                            sid: a[4],
                            hdp: null,
                            odds: a[5],
                            ttp: l.Odds_Draw
                        }, {
                            sid: a[2],
                            hdp: null,
                            odds: a[3],
                            ttp: t.i[1]
                        }];
                        break;
                    case "ml":
                        c = [{
                            sid: a[0],
                            hdp: null,
                            odds: a[1],
                            ttp: t.i[0]
                        }, {
                            sid: a[2],
                            hdp: null,
                            odds: a[3],
                            ttp: t.i[1]
                        }];
                        break;
                    case "bts":
                        c = [{
                            sid: a[0][1],
                            hdp: null,
                            odds: a[0][2],
                            n: a[0][0],
                            ttp: a[0][0]
                        }, null == a[1] ? null : {
                            sid: a[1][1],
                            hdp: null,
                            odds: a[1][2],
                            n: a[1][0],
                            ttp: a[1][0]
                        }];
                        break;
                    case "eps":
                        if (null != a.o && a.o.length > 0) {
                            var s = a.o;
                            c = [];
                            for (var n = 0; n < s.length; n++) {
                                var r = s[n];
                                c.push({
                                    sid: r[1],
                                    hdp: null,
                                    odds: r[2],
                                    ttp: r[0],
                                    n: r[0],
                                    was: r[3]
                                })
                            }
                        }
                        break;
                    case "win":
                    case "m180":
                        a.win || a.m180;
                        c = _.map(a, function (e) {
                            return {
                                sid: e[1].substring(1),
                                hdp: null,
                                odds: e[2],
                                ttp: e[0]
                            }
                        }), t.cf || (c[1] = [c[2], c[2] = c[1]][0]);
                        break;
                    case "cs":
                        var i = _.chunk(_.takeRight(a, 12), 2),
                            o = _.chunk(_.take(a, 40), 2),
                            d = [],
                            m = [];
                        i = _.take(i, i.length - 1);
                        for (var p = ["1 - 0", "2 - 0", "2 - 1", "3 - 0", "3 - 1", "3 - 2", "4 - 0", "4 - 1", "4 - 2", "4 - 3"], h = ["0 - 0", "1 - 1", "2 - 2", "3 - 3", "4 - 4"], u = ["0 - 1", "0 - 2", "1 - 2", "0 - 3", "1 - 3", "2 - 3", "0 - 4", "1 - 4", "2 - 4", "3 - 4"], n = 0; n < o.length; n++) n % 2 == 0 ? d.push(o[n]) : m.push(o[n]);
                        for (var E = [], R = [], g = [], n = 0; n < d.length; n++) E.push({
                            n: p[n],
                            sid: d[n][0],
                            odds: d[n][1],
                            hdp: null,
                            ttp: p[n]
                        });
                        for (var n = 0; n < i.length; n++) R.push({
                            n: h[n],
                            sid: i[n][0],
                            odds: i[n][1],
                            hdp: null,
                            ttp: h[n]
                        });
                        for (var n = 0; n < m.length; n++) g.push({
                            n: u[n],
                            sid: m[n][0],
                            odds: m[n][1],
                            hdp: null,
                            ttp: u[n]
                        });
                        c = [E, R, g];
                        break;
                    default:
                        c = null
                }
                if (null != c) {
                    var f = this._highlightCheck,
                        v = this._formatSelectionId;
                    _.forEach(c, function (e, t) {
                        null != e && (e instanceof Array ? _.forEach(e, function (e, t) {
                            e.sid = v(e.sid), e.isHL = f(e.sid)
                        }) : (e.sid = v(e.sid), e.isHL = f(e.sid)))
                    })
                }
                return c
            },
            _highlightCheck: function (e) {
                var t = this.props.data.extraData.odds.hlo;
                return -1 != _.indexOf(t, e)
            },
            _formatSelectionId: function (e) {
                return e.replace(/\D+/, "")
            },
            _getBaseOddsProp: function (e, t) {
                return {
                    evtid: e.k,
                    score: e.i[10] + ":" + e.i[11],
                    isInplay: t,
                    parentEventId: e.pk,
                    addOddsJump: this.props.data.extraData.odds.addOddsJump,
                    oddsUp: this.props.data.extraData.odds.oddsUp,
                    oddsDown: this.props.data.extraData.odds.oddsDown,
                    oddsType: this.props.data.extraData.oddsType,
                    isFirstLoad: this.props.data.extraData.isFirstLoad
                }
            },
            _getOddsTooltips: function (e, t, a) {
                t
            }
        },
        oddsBtn: {
            componentWillReceiveProps: function (e) {
                var t = parseFloat(this.props.data.odds),
                    a = parseFloat(e.data.odds),
                    l = this.props.data.oddsType,
                    c = e.data.oddsType,
                    s = e.data.isFirstLoad;
                if (a != t && l == c && !s) {
                    var n = this.props.data.sid;
                    this.props.data.addOddsJump(n, oddsUtil.getValueIndicator(t, a))
                }
            },
            _addSelection: function (e) {
                var t = this.props.data,
                    a = null != t.ignoreHDP && t.ignoreHDP;
                Action.RightPanel.addSelection(t.sid, t.evtid, t.odds, a ? null : t.hdp, t.score, t.isInplay, t.parentEventId), Action.Homepage.highlightOdds(t.sid), e.preventDefault(), e.stopPropagation()
            }
        },
        pnc: {
            _displayChildTag: function (e) {
                var t = [o.pacType.et, o.pacType.pelAH, o.pacType.pelOU, o.pacType.toQualify, o.pacType.winner];
                return _.includes(t, e)
            },
            _getChildTag: function (e) {
                switch (e) {
                    case o.pacType.et:
                        return l.OP_ExtraTime;
                    case o.pacType.pelAH:
                    case o.pacType.pelOU:
                        return l.HPET_Pens;
                    case o.pacType.toQualify:
                        return l.MB_Qualify;
                    case o.pacType.winner:
                        return l.Odds_Winner
                }
            },
            _displayExtraTimeHeader: function (e) {
                var t = window.o.pacType,
                    a = e.cei.ctid;
                return a == t.et && e.ihe || a == t.par && "ET" == e.i[31]
            }
        },
        link: {
            _getMorebetLink: function (e, t, a) {
                return Router.event(e, t, a)
            },
            _getSportLink: function (e, t) {
                return Router.sport(t, e ? VIEW.INPLAY : VIEW.PRESTART)
            },
            _getFootballTodayLink: function () {
                return Router.today(1)
            },
            _getFootballTomorrowLink: function () {
                return Router.tomorrow(1)
            },
            _getSportStartingSoonLink: function (e) {
                return Router.sport(e, VIEW.STARTINGSOON)
            },
            _getCompetitionLink: function (e, t) {
                return Router.competition(e, t)
            },
            _getAllInplayLink: function () {
                return Router.inplay()
            },
            _getOutrightLink: function (e, t) {
                return Router.outright(e, t)
            },
            _getEpmLink: function (e, t) {
                return Router.epm(e, t)
            }
        },
        tv: {
            _playTV: function () {
                console.log("play TV")
            }
        },
        naming: {
            _getMarketLineName: function (e, t, a) {
                var c = [3, 9, 20, 13, 18];
                if ("ml" == e && _.includes(c, a)) return l.Odds_Winner;
                var s = AllMarketUtility.getPretermName(e, t, a),
                    n = AllMarketUtility.getBetTypeName(e, t, "", a),
                    r = AllMarketUtility.getPeriod(e);
                return s + n + ("" == r ? "" : "- " + r)
            },
            _getChildMarketLineName: function (e, t, a, l) {
                return _.indexOf([7, 53], t) > -1 ? l : l + " - " + AllMarketUtility.getPretermName(e, t, a) + AllMarketUtility.getBetTypeName(e, t, "", a)
            },
            _getBestOfLocalization: function (e) {
                return "0" == e ? l.LiveText : oddsUtil.GetBestOfLocalization(e)
            },
            _getNetSportPeriod: function (e, t) {
                var a = t || this.props.data.sid;
                if (AllMarketUtility.isTableTennisOrBadmintion(a)) {
                    var c = e[1];
                    return l["Period_" + c + "G"]
                }
                return oddsUtil.GetPeriodText(e)
            }
        },
        feContent: {
            _genOddsItem: function (e, t, a) {
                var l = this.props.data,
                    c = l.data.c.e[0],
                    n = e.odds,
                    r = e.sid;
                if (0 == n) return React.createElement("td", {
                    key: r,
                    className: "odds-large t-a-r" + (a ? "" : " pd-t-5")
                }, React.createElement(s.sport.oddsLock, null));
                var l = this.props.data,
                    c = (l.isEuroOdds, l.data.c.e[0]),
                    i = _.assign(this._getBaseOddsProp(c, l.data.ip), e);
                return "ou" == t && c.cei.ctid == o.pacType.pelAH && (i.evtid = c.ouId), React.createElement("td", {
                    key: r,
                    className: "odds-large t-a-r" + (a ? "" : " pd-t-5")
                }, React.createElement(s.sport.odds, {
                    data: i
                }))
            },
            _getOddsProps: function (e, t, a) {
                if (null == t.o[a]) return null;
                var l = this.props.data,
                    c = l.data,
                    s = t.cei.ctid;
                "ou" == a && t.cei.ctid == o.pacType.pelAH && (s = o.pacType.pelOU);
                var n = {
                    ctid: t.cei.ctid,
                    sid: c.sid,
                    betType: a
                };
                s != o.pacType.par && (n.childName = t.cei.n);
                var r = _.assign(n, {
                    baseOddsProps: _.assign({}, e)
                });
                return r.oddsItems = this._getOddsItems(a, t), r
            },
            _linkToAMPage: function (e, t) {
                Action.LoadSite(e), t.preventDefault(), t.stopPropagation()
            }
        },
        score: {
            _canDisplayScore: function (e, t, a) {
                var l = [3, 4, 9, 20, 13, 18, 25, 14, 2];
                return 18 != t && (_.contains(l, t) ? a && "True" == e.i[38] : a)
            }
        }
    }, s.rightPanel = React.createClass({
        displayName: "rightPanel",
        render: function () {
            var e = this.props.data,
                t = e.extraData,
                a = [],
                l = !0;
            return _.forEach(e.data, function (e, c) {
                var n = {
                    data: e,
                    extraData: t,
                    isFirst: l
                };
                1 == e.t ? a.push(React.createElement(s.rightPanel.eventForm, {
                    key: "rfe_" + e.spid,
                    data: n
                })) : 2 == e.t && e.isEpm ? a.push(React.createElement(s.rightPanel.epmForm, {
                    key: "rfe_" + e.spid,
                    data: n
                })) : 2 != e.t || e.isEpm ? 3 == e.t && a.push(React.createElement(s.rightPanel.competitionForm, {
                    key: "rfe_" + e.spid,
                    data: n
                })) : a.push(React.createElement(s.rightPanel.outrightForm, {
                    key: "rfe_" + e.spid,
                    data: n
                })), l && (l = !1)
            }), React.createElement("div", {
                className: "content-r float-right"
            }, a)
        }
    }), s.rightPanel.eventForm = React.createClass({
        displayName: "eventForm",
        mixins: [s.Utility.tv, s.Utility.odds, s.Utility.timer, s.Utility.pnc, s.Utility.link, s.Utility.score],
        render: function () {
            var e, t = this.props.data,
                a = t.data,
                c = a.c.e[0],
                n = a.ip,
                r = this._canDisplayScore(c, a.sid, a.cds);
            "" != c.i[7] && (e = React.createElement("div", {
                onClick: this._playTV,
                className: "icon-TV2 ft-c-18 dsp-iblk",
                title: utility.replaceTooltipBu(n ? l.LP_LiveStreamInplay : l.LP_LiveStream)
            }));
            var i;
            n && (i = React.createElement("div", {
                className: "live dsp-iblk ft-c-14 fts-12" + (null == e ? "" : " mg-r-6")
            }, l.LiveText), 4 == a.sid && ("True" == c.i[38] && c.sb ? i = React.createElement(s.sport.baseBallPeriod, {
                showinInplay: !1,
                hasTV: null != e,
                data: {
                    cp: c.sb.cp,
                    s: c.sb.s
                }
            }) : r = !1));
            var d, m, p = {
                    info: c.i,
                    edt: c.edt,
                    isInplay: n,
                    sid: a.sid,
                    isns: a.isNetSports,
                    cp: null != c.sb ? c.sb.cp : null
                },
                h = c.i[10],
                u = c.i[11];
            d = r ? h + " - " + u : "v", m = React.createElement("div", {
                className: "pd-b-5"
            }, React.createElement("span", {
                className: "mg-r-10"
            }, c.i[0]), React.createElement("span", {
                className: "ft-c-14 mg-r-10 dsp-iblk"
            }, d), c.i[1]);
            var E;
            a.isNetSports && n && null != c.sb && (E = React.createElement("div", {
                className: "pd-t-10 pd-l-10 pd-t-10 pd-b-3 pd-r-6 fts-13"
            }, React.createElement(s.rightPanel.eventForm.netSportScore, {
                data: {
                    sb: c.sb,
                    eid: c.k,
                    r: !0,
                    sid: a.sid
                }
            })));
            var R;
            18 == a.sid && null != c.sb && null != c.sb.ps && c.sb.ps.length > 0 && (R = React.createElement("div", {
                className: "pd-t-10 pd-l-10 pd-t-10 pd-b-3 pd-r-6 fts-13"
            }, React.createElement(s.rightPanel.eventForm.cricketScore, {
                data: {
                    gt: c.i[37],
                    sb: c.sb
                }
            })));
            var g;
            n && this._displayExtraTimeHeader(c) && 1 == a.sid && (g = React.createElement(s.mainFeatureEvent.header.extraTime, {
                data: {
                    hs: c.i[33],
                    as: c.i[34],
                    multipleLine: !0
                }
            }));
            var f, v = {
                txt: l.HP_AllMarkets + " ",
                ec: c.i[32],
                url: this._getMorebetLink(c.cei.ctid == o.pacType.par ? c.k : c.pk, a.ip ? VIEW.INPLAY : VIEW.PRESTART, c.i[36]),
                top: 0
            };
            "N" == c.g && (f = React.createElement(s.neutralIcon, {
                isRight: !0
            }));
            var N;
            if (!a.ip && null != c.o && null != c.o.eps && null != c.o.eps.o && c.o.eps.o.length > 0) {
                var b = {
                    baseProps: this._getBaseOddsProp(c, n),
                    oddsItems: this._getOddsItems("eps", c),
                    url: v.url,
                    n: c.o.eps.n
                };
                N = React.createElement(s.rightPanel.eps, {
                    data: b
                })
            }
            var _;
            return a.idm && "" != a.msg && (_ = React.createElement(s.mainFeatureEvent.content.message, {
                pdb: !1,
                msg: a.msg
            })), React.createElement("div", {
                className: "radius bg-c-1 container pd-6 " + (t.isFirst ? "" : "mg-t-10")
            }, React.createElement("div", {
                className: "rpl-header multiple bg-c-10 radius",
                onClick: this._gotoAMPage.bind(this, v.url)
            }, React.createElement("div", {
                className: "leagueName radius pd-l-10 pd-t-8 pd-b-6  ft-c-27 fts-13 border_lv4"
            }, React.createElement("div", {
                className: "div-lineHeight-lv1 dsp-iblk float-right mg-r-6 "
            }, i, e), React.createElement("div", {
                className: "lht-1e"
            }, a.c.n)), React.createElement("div", {
                className: "teamName radius pd-l-10 pd-r-6  ft-c-27 fts-13 border_lv4"
            }, React.createElement("table", {
                className: "width-100p height-29"
            }, React.createElement("colgroup", null, React.createElement("col", null), React.createElement("col", {
                className: "col-fixed23"
            })), React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", {
                className: "ft-c-3 fts-15 t-va-t"
            }, m), React.createElement("td", {
                className: "t-va-t t-a-r t-va-t"
            }, f))))), g), E, R, React.createElement("div", {
                className: "rpl-greenScreen mg-t-6 bg-c-29 radius"
            }, React.createElement(s.mainFeatureEvent.img, {
                src: a.img,
                url: v.url
            }), React.createElement(s.rightPanel.eventForm.PeriodAndTime, {
                data: p
            })), _, N, React.createElement(s.rightPanel.eventForm.marketLines, {
                data: {
                    evt: c,
                    sid: a.sid,
                    rd: a.rd,
                    isInplay: n,
                    extraData: t.extraData
                }
            }), React.createElement(s.rightPanel.morebet, {
                data: v
            }))
        },
        _gotoAMPage: function (e) {
            Action.LoadSite(e)
        }
    }), s.rightPanel.eventForm.netSportScore = React.createClass({
        displayName: "netSportScore",
        render: function () {
            var e, t = this.props.data,
                a = t.sb,
                c = t.eid,
                s = [],
                n = this._getScore;
            if (null != a) {
                _.forEach(a.ps, function (e, t) {
                    var l, r = "rfe_ns_" + c + "_" + t;
                    l = t != a.ps.length - 1 ? "mg-r-6" : "ft-c-16", s.push(React.createElement("span", {
                        key: r,
                        className: l
                    }, n(e)))
                });
                var r = 3 == t.sid ? l.Results_Games : l.Results_Points;
                e = t.r ? React.createElement("div", {
                    className: "float-right ft-c-16"
                }, React.createElement("span", {
                    className: "ft-c-21 mg-r-3"
                }, r), this._getScore(3 == t.sid ? a.ftg : a.p)) : React.createElement("span", {
                    className: "ft-c-16 mg-l-30"
                }, React.createElement("span", {
                    className: "ft-c-21 mg-r-3"
                }, r), this._getScore(3 == t.sid ? a.ftg : a.p))
            }
            return t.r ? React.createElement("div", null, e, s, React.createElement("div", {
                className: "clearBoth"
            })) : React.createElement("div", null, s, e, React.createElement("div", {
                className: "clearBoth"
            }))
        },
        _getScore: function (e) {
            return e.h + "-" + e.a
        }
    }), s.rightPanel.eventForm.cricketScore = React.createClass({
        displayName: "cricketScore",
        render: function () {
            var e = this.props.data;
            return React.createElement("div", null, React.createElement("span", {
                className: "ft-c-16"
            }, this._getScore(e.gt, e.sb)))
        },
        _getScore: function (e, t) {
            var a = 13 == e ? "i1" : t.cp,
                l = _.first(_.filter(t.ps, "p", a));
            return "1" == t.s ? l.h + "-" + l.hw : l.a + "-" + l.aw
        }
    }), s.rightPanel.eventForm.PeriodAndTime = React.createClass({
        displayName: "PeriodAndTime",
        mixins: [s.Utility.timer, s.Utility.naming],
        render: function () {
            var e, t, a, c, n, r = this.props.data,
                i = r.info,
                o = r.sid;
            if (r.isInplay) {
                if (null != i[31] && "" != i[31] && (a = React.createElement("span", {
                        title: this._getLongPeriod(i[31]),
                        className: "mg-r-4 ft-c-" + (3 == o ? "3" : "18")
                    }, this._getShortPeriod(i[31]))), "" != i[5] && (c = 2 == o ? React.createElement("span", {
                        className: "ft-c-3"
                    }, i[5]) : 14 == o ? React.createElement("span", {
                        className: "ft-c-3"
                    }, "" != i[5] ? i[5].split(":")[0] + "'" : i[5]) : React.createElement(s.sport.iptime, {
                        canTick: utility.canTick(o),
                        data: {
                            class: "ft-c-3",
                            t: i[5]
                        }
                    })), r.isns && null != r.cp && (n = React.createElement("span", {
                        className: "ft-c-3"
                    }, this._getNetSportPeriod(r.cp))), 18 == o && null != r.cp) {
                    var d = "i1" == r.cp ? l.Innings1 : l.Innings2;
                    n = React.createElement("span", {
                        className: "ft-c-3"
                    }, d), a = null, c = null
                }
                if (21 == o && i[37] > 0 && (n = React.createElement("span", {
                        className: "ft-c-3"
                    }, this._getBestOfLocalization(i[37])), a = null, c = null), null == a && null == c && null == n) return null
            } else {
                var m = this._getEventDate(r.edt);
                if ("" != m && (e = React.createElement("span", {
                        className: "ft-c-18"
                    }, m)), t = React.createElement("span", {
                        className: "ft-c-3"
                    }, " " + this._getEventStartTime(r.edt)), null == e && null == t) return null
            }
            return React.createElement("div", {
                className: "greenScreen-time pd-6 pos-absolute bg-c-10 radius fts-13"
            }, a, c, n, e, t)
        }
    }), s.rightPanel.eventForm.marketLines = React.createClass({
        displayName: "marketLines",
        mixins: [s.Utility.odds],
        render: function () {
            var e = this.props.data,
                t = e.evt,
                a = e.sid,
                l = e.rd,
                c = e.isInplay,
                s = e.extraData,
                n = this._getMarketLinesByRegion(t, a, l, c, s);
            return React.createElement("div", {
                className: "mg-t-6"
            }, n)
        },
        _getMarketLinesByRegion: function (e, t, a, l, c) {
            var s;
            if (1 == t) s = "HDP" == a ? ["ah", "ou", "1x2", "bts", "cs"] : ["1x2", "ah", "ou", "bts", "cs"], e.cei.ctid != o.pacType.toQualify && e.cei.ctid != o.pacType.winner && s.push("To Qualify/ Winner");
            else if (2 == t) s = ["ah", "ou", "ml", "t1ou", "t2ou"];
            else if (3 == t) s = ["ml", "ah", "ahfts", "oufts"];
            else if (18 == t) s = ["ml"];
            else if (14 == t) s = ["1x2", "ah", "ou"];
            else if (25 == t) s = ["win", "m180"];
            else if (26 == t) s = ["ah", "ou", "1x2"];
            else {
                var n = null != e.o.ml;
                s = "HDP" == a ? ["ah", "ou", n ? "ml" : "1x2"] : [n ? "ml" : "1x2", "ah", "ou"]
            }
            var r = [],
                i = this._genMarketLine;
            return _.forEach(s, function (a, s) {
                r.push(i(a, e, l, c, t))
            }), r
        },
        _genMarketLine: function (e, t, a, l, c) {
            var n = {
                betType: e,
                baseOddsProps: this._getBaseOddsProp(t, a),
                ctid: t.cei.ctid,
                sid: c
            };
            t.cei.ctid != o.pacType.par && (n.childName = t.cei.n);
            var r;
            switch (e) {
                case "ah":
                case "ml":
                case "ahfts":
                    n.oddsItems = this._getOddsItems(e, t), null != n.oddsItems && (n.hn = t.i[0], n.an = t.i[1]), r = "ah";
                    break;
                case "ou":
                    1 == c && t.cei.ctid == o.pacType.pelAH && (n.baseOddsProps.evtid = t.ouId), n.oddsItems = this._getOddsItems(e, t), r = e;
                    break;
                case "m180":
                    var i = this._getOddsItems(e, t);
                    i && 3 == i.length && (i[1] = [i[2], i[2] = i[1]][0]), n.oddsItems = i, r = "ah";
                    break;
                case "win":
                case "1x2":
                case "cs":
                case "bts":
                    n.oddsItems = this._getOddsItems(e, t), r = e;
                    break;
                case "To Qualify/ Winner":
                    var d = _.find(t.cel, function (e) {
                        return e.cei.ctid == window.o.pacType.toQualify || e.cei.ctid == window.o.pacType.winner
                    });
                    null != d && null != d.o && null != d.o.ah ? (n.oddsItems = this._getOddsItems("ah", d), n.oddsItems[0].chdp = "", n.oddsItems[1].chdp = "", n.hn = t.i[0], n.an = t.i[1], n.ctid = d.cei.ctid, n.betType = "ah", n.childName = d.cei.n, n.baseOddsProps.evtid = d.k, n.baseOddsProps.parentEventId = d.pk) : n.oddsItems = null, r = "ah";
                    break;
                case "t1ou":
                    n.oddsItems = this._getOddsItems(e, t);
                    var d = _.find(t.cel, function (e) {
                        return e.cei.ctid == window.o.pacType.teamPointT1
                    });
                    null != d && null != d.cei && (n.ctid = d.cei.ctid, n.betType = "ou", n.childName = d.cei.n, n.baseOddsProps.evtid = d.k, n.baseOddsProps.parentEventId = d.pk), r = "ou";
                    break;
                case "t2ou":
                    n.oddsItems = this._getOddsItems(e, t);
                    var d = _.find(t.cel, function (e) {
                        return e.cei.ctid == window.o.pacType.teamPointT2
                    });
                    null != d && null != d.cei && (n.ctid = d.cei.ctid, n.betType = "ou", n.childName = d.cei.n, n.baseOddsProps.evtid = d.k, n.baseOddsProps.parentEventId = d.pk), r = "ou";
                case "oufts":
                    n.oddsItems = this._getOddsItems(e, t), r = "ou"
            }
            return null == n.oddsItems ? null : React.createElement(s.rightPanel.eventForm.marketLines[r], {
                key: t.k + "_" + e,
                data: n
            }, null)
        }
    }), s.rightPanel.odds = React.createClass({
        displayName: "odds",
        mixins: [s.Utility.oddsBtn],
        render: function () {
            var e = this.props.data,
                t = null;
            _.includes(e.oddsUp, e.sid) ? t = "oddsUp" : _.includes(e.oddsDown, e.sid) && (t = "oddsDown");
            var a = ["OddsWrapper", "dsp-iblk"];
            return e.isHL && a.push("selected"), null != t && a.push(t), e.isRight && a.push("float-right"), !e.isInplay || 0 != e.odds && "c" != e.odds ? e.inplay || 0 != e.odds && "c" != e.odds ? React.createElement("div", {
                className: a.join(" "),
                title: e.ttp
            }, React.createElement("span", {
                onClick: this._addSelection,
                className: "odds" + (e.last ? " odds-last" : "") + (e.odds < 0 ? " negOdds" : "")
            }, e.odds ? e.odds : "?�")) : React.createElement("div", {
                className: "OddsWrapper dsp-iblk"
            }, React.createElement("span", {
                className: "odds locked v-hidden",
                dangerouslySetInnerHTML: {
                    __html: "&nbsp;"
                }
            })) : React.createElement(s.sport.oddsLock, {
                isRight: e.isRight
            })
        }
    }), s.rightPanel.hdp = React.createClass({
        displayName: "hdp",
        render: function () {
            return React.createElement("div", {
                className: "OddsWrapper dsp-iblk"
            }, React.createElement("span", {
                className: "dark ft-c-16 mg-r-6"
            }, this.props.hdp))
        }
    }), s.rightPanel.marketLineTitle = React.createClass({
        displayName: "marketLineTitle",
        render: function () {
            return React.createElement("div", {
                className: "tb-mainEvent-sub-title bg-c-27 radius ft-c-4 t-a-l"
            }, this.props.n)
        }
    }), s.rightPanel.eventForm.marketLines.ah = React.createClass({
        displayName: "ah",
        mixins: [s.Utility.odds, s.Utility.naming],
        render: function () {
            for (var e = this.props.data, t = e.betType, a = e.baseOddsProps, l = e.oddsItems, c = "m180" == t, n = c ? 3 : 2, r = [], i = (this._needBlackTeamName, 0); i < n; i++) {
                var o = {
                    tn: 0 == i ? e.hn : e.an,
                    baseOddsProps: a,
                    oddsItem: l[i],
                    last: i == n - 1
                };
                null != o.oddsItem && (c && (o.tn = o.oddsItem.ttp), r.push(React.createElement(s.rightPanel.ahMarketLineRow, {
                    key: "fe_ah_" + (0 == i ? "h" : "a") + o.oddsItem.sid,
                    data: o
                })))
            }
            var d = 0 == e.ctid ? this._getMarketLineName(t, e.ctid, e.sid) : this._getChildMarketLineName(t, e.ctid, e.sid, e.childName);
            return React.createElement("table", {
                className: "tb-rpl"
            }, React.createElement("colgroup", null, React.createElement("col", null), React.createElement("col", {
                className: "col-fixed110"
            })), React.createElement("tbody", {
                className: "fts-13"
            }, React.createElement("tr", null, React.createElement("td", {
                colSpan: "2",
                className: "pd-0"
            }, React.createElement(s.rightPanel.marketLineTitle, {
                n: d
            })))), React.createElement("tbody", {
                className: "fts-13"
            }, r))
        }
    }), s.rightPanel.ahMarketLineRow = React.createClass({
        displayName: "ahMarketLineRow",
        mixins: [s.Utility.odds],
        getInitialState: function () {
            return {
                showDetail: !1
            }
        },
        render: function () {
            var e = this,
                t = this.props.data,
                a = t.tn,
                l = t.baseOddsProps,
                c = t.oddsItem,
                n = t.isEpm,
                r = t.dt,
                i = t.dil,
                o = t.ril,
                d = t.iscc,
                m = t.isFirst,
                p = this._needBlackTeamName;
            a = n ? i.map(function (t, a) {
                var l = e._getEpmDisplayName(r, t);
                return React.createElement(s.sport.team, {
                    key: "epmfe_" + t + "_" + a,
                    data: {
                        n: l
                    }
                })
            }) : React.createElement(s.sport.team, {
                data: {
                    n: a,
                    black: p(c.hdp)
                }
            });
            var h;
            (!l.isInplay || null != c.odds && 0 != c.odds) && c.hdp && (h = React.createElement("span", {
                className: "dark ft-c-16 mg-r-6"
            }, null == c.chdp ? c.hdp : c.chdp));
            var u = void 0;
            return n && (u = React.createElement("td", {
                className: "epm epm-content-r pd-t-10 t-a-r " + (m ? "" : " topBorder pd-b-5")
            }, React.createElement("span", {
                className: "icon icon-i-s ft-c-22 bg-c-57",
                onMouseEnter: function () {
                    return e._handleMouseEvent(!0)
                },
                onMouseLeave: function () {
                    return e._handleMouseEvent(!1)
                }
            }), this.state.showDetail ? React.createElement("div", {
                className: "overlayContainer selected pos-absolute"
            }, React.createElement("div", {
                className: "tickContainer"
            }, React.createElement("span", {
                className: "tick"
            })), React.createElement("div", {
                className: "overlay"
            }, React.createElement("div", {
                className: "br-c-1 bg-c-55 fts-13"
            }, o && o.map(function (t, a) {
                var l = e._getReferDetailName(t.isor, t.rn);
                return [React.createElement("div", {
                    className: "bold ft-c-25 t-a-l" + (0 !== a ? " pd-t-5 " : "")
                }, t.sn), d ? React.createElement("div", {
                    className: "ft-c-22 t-a-l"
                }, React.createElement("span", {
                    className: "mg-r-6"
                }, t.cn)) : null, React.createElement("div", {
                    className: "ft-c-22 t-a-l"
                }, l, React.createElement("span", {
                    className: "mg-r-5"
                }, ","), React.createElement("span", {
                    className: "mg-r-10"
                }, t.rd), React.createElement("span", null, t.rt))]
            })))) : null)), React.createElement("tr", {
                className: p(c.hdp) ? "home" : ""
            }, React.createElement("td", {
                className: "td-teameName t-a-l pd-t-10 pd-l-10" + (t.last ? " pd-b-10" : "") + (n && !m ? " topBorder pd-b-5" : " pd-b-5"),
                onClick: this._gotoAMPage
            }, a), u, React.createElement("td", {
                className: "t-a-r pd-t-10 " + (t.last ? " pd-b-10" : "") + (n && !m ? " topBorder pd-b-5" : " pd-b-5")
            }, h, React.createElement(s.rightPanel.odds, {
                data: _.assign({
                    last: !0
                }, l, c)
            })))
        },
        _gotoAMPage: function () {
            this.props.data.url && Action.LoadSite(this.props.data.url)
        },
        _getEpmDisplayName: function (e, t) {
            switch (e) {
                case 1:
                    var a = t.split("-v-");
                    return a.length < 2 ? null : a[0] + " v " + a[1];
                case 2:
                case 3:
                    return t
            }
        },
        _getReferDetailName: function (e, t) {
            if (e) return React.createElement("span", {
                className: "mg-r-6"
            }, t);
            var a = t.split("-v-");
            return a.length < 2 ? null : [React.createElement("span", {
                className: "mg-r-6"
            }, a[0]), React.createElement("span", {
                className: "mg-r-6 ft-c-16"
            }, "v"), React.createElement("span", null, a[1])]
        },
        _handleMouseEvent: function (e) {
            this.setState({
                showDetail: e
            })
        }
    }), s.rightPanel.eventForm.marketLines.ou = React.createClass({
        displayName: "ou",
        mixins: [s.Utility.odds, s.Utility.naming],
        render: function () {
            var e, t, a = this.props.data,
                c = a.betType,
                n = a.baseOddsProps,
                r = a.oddsItems;
            (!n.isInplay || null != r[0].odds && 0 != r[0].odds) && (e = React.createElement("span", {
                className: "upInt dsp-iblk ft-c-16 mg-r-15"
            }, React.createElement("span", {
                className: "ou ft-c-24 mg-r-5"
            }, l.so), r[0].hdp)), (!n.isInplay || null != r[1].odds && 0 != r[1].odds) && (t = React.createElement("span", {
                className: "upInt dsp-iblk ft-c-16 mg-r-15"
            }, React.createElement("span", {
                className: "ou ft-c-24 mg-r-5"
            }, l.su), r[1].hdp));
            var i = 0 == a.ctid ? this._getMarketLineName(c, a.ctid, a.sid) : this._getChildMarketLineName(c, a.ctid, a.sid, a.childName);
            return React.createElement("table", {
                className: "tb-rpl"
            }, React.createElement("colgroup", null, React.createElement("col", {
                className: "col-50Percent"
            }), React.createElement("col", {
                className: "col-50Percent"
            })), React.createElement("tbody", {
                className: "fts-13"
            }, React.createElement("tr", null, React.createElement("td", {
                colSpan: "2",
                className: "pd-0"
            }, React.createElement(s.rightPanel.marketLineTitle, {
                n: i
            })))), React.createElement("tbody", {
                className: "fts-13"
            }, React.createElement("tr", null, React.createElement("td", {
                className: "t-a-l pd-tb-10 pd-l-10"
            }, e, React.createElement(s.rightPanel.odds, {
                data: _.assign({
                    last: !0
                }, n, r[0])
            })), React.createElement("td", {
                className: "t-a-r pd-tb-10 pd-l-10"
            }, t, React.createElement(s.rightPanel.odds, {
                data: _.assign({
                    last: !0
                }, n, r[1])
            })))))
        }
    }), s.rightPanel.eventForm.marketLines["1x2"] = React.createClass({
        mixins: [s.Utility.odds, s.Utility.naming],
        render: function () {
            var e, t = this.props.data;
            if (null != t) {
                var a = t.baseOddsProps,
                    l = t.oddsItems;
                e = React.createElement("tbody", {
                    className: "fts-13"
                }, React.createElement("tr", null, React.createElement("td", {
                    className: "t-a-l pd-tb-10 pd-l-10 nowrap"
                }, React.createElement("span", {
                    className: "ft-1x2 ft-c-16"
                }, "1"), React.createElement(s.rightPanel.odds, {
                    data: _.assign({}, a, l[0])
                })), React.createElement("td", {
                    className: "t-a-c pd-tb-10 nowrap"
                }, React.createElement("span", {
                    className: "ft-1x2 ft-c-16"
                }, "X"), React.createElement(s.rightPanel.odds, {
                    data: _.assign({}, a, l[1])
                })), React.createElement("td", {
                    className: "t-a-r pd-tb-10 nowrap"
                }, React.createElement("span", {
                    className: "ft-1x2 ft-c-16"
                }, "2"), React.createElement(s.rightPanel.odds, {
                    data: _.assign({}, a, l[2])
                }))))
            }
            var c = 0 == t.ctid ? this._getMarketLineName("1x2", t.ctid, t.sid) : this._getChildMarketLineName("1x2", t.ctid, t.sid, t.childName),
                n = this.props.main;
            return React.createElement("table", {
                className: n ? "tb-mainEvent-sub" : "tb-rpl"
            }, React.createElement("colgroup", null, React.createElement("col", null), React.createElement("col", null), React.createElement("col", null)), React.createElement("tbody", {
                className: "fts-13"
            }, React.createElement("tr", null, React.createElement("td", {
                colSpan: "3",
                className: "pd-0"
            }, React.createElement(s.rightPanel.marketLineTitle, {
                n: c
            }))), e))
        }
    }), s.rightPanel.eventForm.marketLines.win = React.createClass({
        displayName: "win",
        mixins: [s.Utility.odds, s.Utility.naming],
        render: function () {
            var e, t = this.props.data;
            if (null != t) {
                var a, l = t.baseOddsProps,
                    c = t.oddsItems;
                a = void 0 != c[1] ? React.createElement(s.rightPanel.odds, {
                    data: _.assign({}, l, c[1])
                }) : React.createElement(s.sport.oddsEmptyWithSpace, null), e = React.createElement("tbody", {
                    className: "fts-13"
                }, React.createElement("tr", null, React.createElement("td", {
                    className: "t-a-l pd-tb-10 pd-l-10 nowrap"
                }, React.createElement("span", {
                    className: "ft-1x2 ft-c-16"
                }, "1"), React.createElement(s.rightPanel.odds, {
                    data: _.assign({}, l, c[0])
                })), React.createElement("td", {
                    className: "t-a-c pd-tb-10 nowrap"
                }, React.createElement("span", {
                    className: "ft-1x2 ft-c-16"
                }, "X"), a), React.createElement("td", {
                    className: "t-a-r pd-tb-10 nowrap"
                }, React.createElement("span", {
                    className: "ft-1x2 ft-c-16"
                }, "2"), React.createElement(s.rightPanel.odds, {
                    data: _.assign({}, l, c[2])
                }))))
            }
            var n = 0 == t.ctid ? this._getMarketLineName("win", t.ctid, t.sid) : this._getChildMarketLineName("win", t.ctid, t.sid, t.childName),
                r = this.props.main;
            return React.createElement("table", {
                className: r ? "tb-mainEvent-sub" : "tb-rpl"
            }, React.createElement("colgroup", null, React.createElement("col", null), React.createElement("col", null), React.createElement("col", null)), React.createElement("tbody", {
                className: "fts-13"
            }, React.createElement("tr", null, React.createElement("td", {
                colSpan: "3",
                className: "pd-0"
            }, React.createElement(s.rightPanel.marketLineTitle, {
                n: n
            }))), e))
        }
    }), s.rightPanel.eventForm.marketLines.bts = React.createClass({
        displayName: "bts",
        mixins: [s.Utility.odds, s.Utility.naming],
        render: function () {
            var e, t = this.props.data;
            if (null != t) {
                var a, l = t.baseOddsProps,
                    c = t.oddsItems;
                null != c[1] && (a = React.createElement("td", {
                    className: "t-a-r pd-tb-10"
                }, React.createElement("span", {
                    className: "mg-l-10 ft-c-4  mg-r-36 fts-12"
                }, c[1].n), React.createElement(s.rightPanel.odds, {
                    data: _.assign({}, l, c[1])
                }))), e = React.createElement("tbody", {
                    className: "fts-13"
                }, React.createElement("tr", null, React.createElement("td", {
                    className: "t-a-l pd-tb-10 pd-l-10"
                }, React.createElement("span", {
                    className: "ft-c-4  mg-r-36 fts-12"
                }, c[0].n), React.createElement(s.rightPanel.odds, {
                    data: _.assign({}, l, c[0])
                })), a))
            }
            return React.createElement("table", {
                className: this.props.main ? "tb-mainEvent-sub" : "tb-rpl"
            }, React.createElement("colgroup", null, React.createElement("col", {
                className: "col-50Percent"
            }), React.createElement("col", {
                className: "col-50Percent"
            })), React.createElement("tbody", {
                className: "fts-13"
            }, React.createElement("tr", null, React.createElement("td", {
                colSpan: "2",
                className: "pd-0"
            }, React.createElement(s.rightPanel.marketLineTitle, {
                n: this._getMarketLineName(t.betType, t.ctid, t.sid)
            })))), e)
        }
    }), s.rightPanel.eventForm.marketLines.cs = React.createClass({
        displayName: "cs",
        mixins: [s.Utility.odds, s.Utility.naming],
        render: function () {
            var e = this.props.data,
                t = e.baseOddsProps,
                a = e.oddsItems,
                l = [],
                c = this._filterOutZeroOdds;
            _.forEach(a, function (e, t) {
                l.push(_.filter(e, c))
            });
            var n = 0 == e.ctid ? this._getMarketLineName("cs", e.ctid, e.sid) : this._getChildMarketLineName("cs", e.ctid, e.sid, e.childName);
            return React.createElement("table", {
                className: "tb-rpl nowrap"
            }, React.createElement("colgroup", null, React.createElement("col", {
                className: "col-22Percent"
            }), React.createElement("col", {
                className: "col-22Percent"
            }), React.createElement("col", {
                className: "col-22Percent"
            })), React.createElement("tbody", {
                className: "fts-13"
            }, React.createElement("tr", null, React.createElement("td", {
                colSpan: "3",
                className: "pd-0"
            }, React.createElement(s.rightPanel.marketLineTitle, {
                n: n
            })))), React.createElement("tbody", {
                className: "fts-13"
            }, this._genRow(l[0], l[1], l[2], t)))
        },
        _filterOutZeroOdds: function (e) {
            return null != e && null != e.odds && "0.00" != e.odds
        },
        _genRow: function (e, t, a, l) {
            for (var c = [], s = this._genOdds, n = l.isInplay ? 3 : Math.max(e.length, t.length, a.length), r = 0; r < n; r++) {
                var i = e[r],
                    o = t[r],
                    d = a[r],
                    m = "";
                m += 0 == r ? " pd-t-10" : " pd-t-5", r == n - 1 && (m += " pd-b-10"), c.push(React.createElement("tr", {
                    key: "cs_r" + r
                }, s(i, m + " pd-l-10 t-a-l", l), s(o, m + " t-a-c", l), s(d, m + " t-a-r", l)))
            }
            return c
        },
        _genOdds: function (e, t, a) {
            return null == e || "0.00" == e.odds ? React.createElement("td", {
                className: t
            }) : React.createElement("td", {
                className: t
            }, React.createElement("span", {
                className: "mg-r-6 ft-c-16"
            }, e.n), React.createElement(s.rightPanel.odds, {
                data: _.assign({}, a, e)
            }))
        }
    }), s.rightPanel.eps = React.createClass({
        displayName: "eps",
        render: function () {
            for (var e = this.props.data, t = [], a = 0; a < e.oddsItems.length && a < 2; a++) {
                var c = e.oddsItems[a],
                    n = {
                        n: c.n,
                        was: c.was,
                        oddsItem: _.assign({
                            last: !0
                        }, e.baseProps, c)
                    },
                    r = "fe_eps_" + c.sid;
                t.push(React.createElement(s.rightPanel.eps.selections, {
                    key: r,
                    data: n
                }))
            }
            return React.createElement("div", null, React.createElement("table", {
                className: "tb-eps mg-t-6 width-100p fts-13"
            }, React.createElement("thead", {
                className: " ft-c-3  radius"
            }, React.createElement("tr", null, React.createElement("th", {
                className: "height-28 bg-c-4 radius t-a-l fontWeight-normal pd-l-10",
                colSpan: "3"
            }, e.n)))), React.createElement("table", {
                className: "tb-eps mg-t-6 width-100p fts-13"
            }, React.createElement("colgroup", null, React.createElement("col", null), React.createElement("col", {
                className: "col-fixed41"
            })), React.createElement("tbody", null, t)), React.createElement("div", {
                className: "viewall lht-30 t-a-c fts-13 topBorder mg-t-5" + (e.oddsItems.length <= 2 ? " hidden" : ""),
                onClick: this._linkToAMP
            }, l.LP_View_All))
        },
        _linkToAMP: function (e) {
            Action.LoadSite(this.props.data.url, {
                showMoreEPS: !0
            }), e.preventDefault(), e.stopPropagation()
        }
    }), s.rightPanel.eps.selections = React.createClass({
        displayName: "selections",
        render: function () {
            var e = this.props.data;
            return React.createElement("tr", null, React.createElement("td", {
                className: "pd-0 height-30 pd-l-10"
            }, e.n), React.createElement("td", {
                className: "pd-0 t-a-cheight-30"
            }, React.createElement(s.rightPanel.odds, {
                data: e.oddsItem
            })))
        }
    }), s.rightPanel.morebet = React.createClass({
        displayName: "morebet",
        render: function () {
            var e = this.props.data,
                t = e.isEpm,
                a = {};
            e.nottp || (a.title = l.OP_ViewAllMarkets);
            var s = "t-a-c bt-moreBet-enlarge height-40 radius ft-c-3 fts-12 mg-t-" + e.top;
            return s += t ? " bg-c-4 epsbanner" : " bg-c-41", React.createElement("div", c({}, a, {
                onClick: this._clickMoreBet.bind(this, e.url),
                className: s
            }), e.txt, React.createElement("span", {
                className: "fontWeight-bold"
            }, e.ec), React.createElement("span", {
                className: "icon-ArrowMoreBets"
            }))
        },
        _clickMoreBet: function (e, t) {
            Action.LoadSite(e), t.preventDefault(), t.stopPropagation()
        }
    }), s.rightPanel.outrightForm = React.createClass({
        displayName: "outrightForm",
        mixins: [s.Utility.odds, s.Utility.link],
        render: function () {
            var e, t = this.props.data,
                a = t.data,
                c = a.c.e[0],
                n = c["n-o"][0],
                r = this._getBaseOddsProp,
                i = this._formatSelectionId,
                o = this._highlightCheck,
                d = _.take(n.o, 10).map(function (e) {
                    var t = i(e[1]),
                        l = {
                            sid: t,
                            hdp: null,
                            odds: e[2],
                            isHL: o(t)
                        },
                        n = r(c, a.ip),
                        d = {
                            tn: e[0],
                            baseOddsProps: n,
                            oddsItem: l
                        };
                    return React.createElement(s.rightPanel.ahMarketLineRow, {
                        key: "ror_" + c.k + "_" + e[1],
                        data: d
                    })
                });
            n.pf && n.pt && (e = React.createElement("table", {
                className: "tb-rpl mg-b-6"
            }, React.createElement("colgroup", null, React.createElement("col", null), React.createElement("col", {
                className: "col-fixedodds"
            })), React.createElement("tbody", {
                className: "fts-13"
            }, React.createElement("tr", null, React.createElement("td", {
                colSpan: "2",
                className: "pd-t-10"
            }, React.createElement("div", {
                className: "tb-mainEvent-sub-title  bg-c-27  radius ft-c-4"
            }, l.OP_EW_S, " - 1/", n.pf, ", ", l.OP_NT.replace("XXX", n.pt)))))));
            var m;
            a.idm && "" != a.msg && (m = React.createElement(s.mainFeatureEvent.content.message, {
                msg: a.msg
            }));
            var p = this._getOutrightLink(a.sid, a.c.k);
            return React.createElement("div", {
                className: "radius bg-c-1 container pd-6 " + (t.isFirst ? "" : "mg-t-10")
            }, React.createElement("div", {
                className: "rpl-header cr-pointer multiple bg-c-10 radius",
                onClick: this._clickHeader.bind(this, p)
            }, React.createElement("div", {
                className: "leagueName radius pd-l-10 pd-t-8 pd-b-6  ft-c-27 fts-13 border_lv4 "
            }, React.createElement("div", {
                className: "uppercase lht-1e"
            }, a.sn)), React.createElement("div", {
                className: "teamName radius pd-l-10 pd-r-6  ft-c-27 fts-13 border_lv4"
            }, React.createElement("table", {
                className: "width-100p height-29"
            }, React.createElement("colgroup", null, React.createElement("col", null), React.createElement("col", {
                className: "col-fixed23"
            })), React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", {
                className: "ft-c-3 fts-15 t-va-t"
            }, React.createElement("div", {
                className: " pd-b-5"
            }, c.egn)), React.createElement("td", {
                className: "t-va-t t-a-r"
            })))))), React.createElement("div", {
                className: "rpl-greenScreen mg-t-6 bg-c-29 radius"
            }, React.createElement(s.mainFeatureEvent.img, {
                src: a.img,
                url: p
            })), m, React.createElement("div", {
                className: "mg-t-6"
            }, React.createElement("table", {
                className: "tb-rpl"
            }, React.createElement("colgroup", null, React.createElement("col", null), React.createElement("col", {
                className: "col-fixedodds"
            })), React.createElement("tbody", {
                className: "fts-13"
            }, React.createElement("tr", null, React.createElement("td", {
                colSpan: "2"
            }, React.createElement(s.rightPanel.marketLineTitle, {
                n: n.mn
            })))), React.createElement("tbody", {
                className: "fts-13"
            }, d)), e, React.createElement(s.rightPanel.morebet, {
                data: {
                    txt: l.LP_View_All,
                    url: p,
                    top: e ? 0 : 10
                }
            })))
        },
        _clickHeader: function (e) {
            Action.LoadSite(e)
        }
    }), s.rightPanel.epmForm = React.createClass({
        displayName: "epmForm",
        mixins: [s.Utility.odds, s.Utility.link],
        render: function () {
            var e, t = this.props.data,
                a = t.data,
                c = a.c.e[0],
                n = c["e-o"][0],
                r = this._getBaseOddsProp,
                i = this._formatSelectionId,
                o = this._highlightCheck,
                d = n.o.map(function (e, t) {
                    var l = e.id,
                        n = e.dil,
                        d = e.ril,
                        m = e.dt,
                        p = e.iscc,
                        h = e.lo,
                        u = e.o,
                        E = i(l),
                        R = {
                            sid: E,
                            hdp: null,
                            odds: u,
                            isHL: o(E)
                        },
                        g = r(c, a.ip),
                        f = {
                            baseOddsProps: g,
                            oddsItem: R,
                            isEpm: !0,
                            lo: h,
                            iscc: p,
                            dt: m,
                            dil: n,
                            ril: d,
                            isFirst: 0 === t
                        };
                    return React.createElement(s.rightPanel.ahMarketLineRow, {
                        key: "repm_" + c.k + "_" + l,
                        data: f
                    })
                });
            a.idm && "" != a.msg && (e = React.createElement(s.mainFeatureEvent.content.message, {
                msg: a.msg
            }));
            var m = this._getEpmLink(a.sid, a.c.k);
            return React.createElement("div", {
                className: "radius bg-c-1 container pd-6 " + (t.isFirst ? "" : "mg-t-10")
            }, React.createElement("div", {
                className: "rpl-header cr-pointer multiple bg-c-10 radius",
                onClick: this._clickHeader.bind(this, m)
            }, React.createElement("div", {
                className: "leagueName radius pd-l-10 pd-t-8 pd-b-6  ft-c-27 fts-13 border_lv4 "
            }, React.createElement("div", {
                className: "uppercase lht-1e"
            }, a.sn)), React.createElement("div", {
                className: "teamName radius pd-l-10 pd-r-6  ft-c-27 fts-13 border_lv4"
            }, React.createElement("table", {
                className: "width-100p height-29"
            }, React.createElement("colgroup", null, React.createElement("col", null), React.createElement("col", {
                className: "col-fixed23"
            })), React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", {
                className: "ft-c-3 fts-15 t-va-t"
            }, React.createElement("div", {
                className: " pd-b-5"
            }, c.egn)), React.createElement("td", {
                className: "t-va-t t-a-r"
            })))))), React.createElement("div", {
                className: "rpl-greenScreen mg-t-6 bg-c-29 radius"
            }, React.createElement(s.mainFeatureEvent.img, {
                src: a.img,
                url: m
            })), e, React.createElement("div", {
                className: "mg-t-6"
            }, React.createElement("table", {
                className: "tb-rpl"
            }, React.createElement("colgroup", null, React.createElement("col", null), React.createElement("col", {
                className: "col-fixedodds"
            }), React.createElement("col", {
                className: "col-fixedodds"
            })), React.createElement("tbody", {
                className: "fts-13"
            }, React.createElement("tr", null, React.createElement("td", {
                colSpan: "3"
            }, React.createElement(s.rightPanel.marketLineTitle, {
                n: n.mn
            })))), React.createElement("tbody", {
                className: "fts-13"
            }, d)), React.createElement(s.rightPanel.morebet, {
                data: {
                    txt: l.LP_View_All,
                    url: m,
                    top: 10
                }
            })))
        },
        _clickHeader: function (e) {
            Action.LoadSite(e)
        }
    }), s.rightPanel.competitionForm = React.createClass({
        displayName: "competitionForm",
        mixins: [s.Utility.odds, s.Utility.link],
        render: function () {
            var e, t = this.props.data,
                a = t.data,
                c = a.c;
            switch (a.rd) {
                case "HDP":
                    e = "ah";
                    break;
                case "ML":
                    e = "ml";
                    break;
                case "1X2":
                    e = "1x2"
            }
            25 == a.sid && (e = "win");
            var n;
            c.e.length > 0 && (n = React.createElement("div", {
                className: "fts-13"
            }, React.createElement(s.rightPanel.marketLineTitle, {
                n: l.LP_Matches
            })));
            var r, i = this._getOddsItems,
                d = this._getBaseOddsProp,
                m = !1,
                p = this._getMorebetLink,
                h = c.e.map(function (l) {
                    25 == a.sid && (l.cf = !0);
                    var c = i(e, l);
                    if (null != c) {
                        var n, r, h, u, E, R, g = d(l, l.ip),
                            f = p(l.cei.ctid == o.pacType.par ? l.k : l.pk, VIEW.PRESTART, l.i[36]);
                        n = {
                            tn: c[0].ttp,
                            baseOddsProps: g,
                            oddsItem: c[0],
                            url: f
                        }, r = {
                            tn: c[1].ttp,
                            baseOddsProps: g,
                            oddsItem: c[1],
                            url: f,
                            last: "1X2" != a.rd
                        }, u = React.createElement(s.rightPanel.ahMarketLineRow, {
                            data: n
                        }), E = React.createElement(s.rightPanel.ahMarketLineRow, {
                            data: r
                        }), ("1X2" == a.rd || 25 == t.data.sid && 3 == c.length) && (h = {
                            tn: c[2].ttp,
                            baseOddsProps: g,
                            oddsItem: c[2],
                            url: f,
                            last: !0
                        }, R = React.createElement(s.rightPanel.ahMarketLineRow, {
                            data: h
                        }), r.last = !0, h.last = !1, E = React.createElement(s.rightPanel.ahMarketLineRow, {
                            data: h
                        }), R = React.createElement(s.rightPanel.ahMarketLineRow, {
                            data: r
                        }));
                        var v = "tb-rpl tb-rfeatureEvent";
                        return m && (v += " topBorder"), !m && (m = !0), React.createElement("table", {
                            key: "feComp_" + l.k,
                            className: v
                        }, React.createElement("colgroup", null, React.createElement("col", null), React.createElement("col", {
                            className: "col-fixed110"
                        })), React.createElement("tbody", {
                            className: "fts-13 hovertby"
                        }, u, E, R))
                    }
                });
            c.hasor && (r = React.createElement(s.rightPanel.morebet, {
                data: {
                    txt: l.LP_OutrightMarkets,
                    url: this._getOutrightLink(a.sid, c.k),
                    nottp: !0
                }
            }));
            var u = void 0;
            c.hasepm && (u = React.createElement(s.rightPanel.morebet, {
                data: {
                    txt: l.EPM.EPM_Available,
                    url: this._getEpmLink(a.sid, c.k),
                    nottp: !0,
                    isEpm: !0
                }
            }));
            var E;
            a.idm && "" != a.msg && (E = React.createElement(s.mainFeatureEvent.content.message, {
                msg: a.msg
            }));
            var R, g = this._getCompetitionLink(a.sid, c.k);
            return c.ec > 0 && (R = React.createElement(s.rightPanel.morebet, {
                data: {
                    txt: l.HP_AllMatches + " " + c.ec,
                    url: g,
                    nottp: !0
                }
            })), React.createElement("div", {
                className: "radius bg-c-1 container pd-6 " + (t.isFirst ? "" : "mg-t-10")
            }, React.createElement("div", {
                className: "rpl-header cr-pointer multiple bg-c-10 radius",
                onClick: this._clickHeader.bind(this, g)
            }, React.createElement("div", {
                className: "leagueName radius pd-l-10 pd-t-8 pd-b-6  ft-c-27 fts-13 border_lv4 "
            }, React.createElement("div", {
                className: "lht-1e uppercase"
            }, a.sn.toUpperCase())), React.createElement("div", {
                className: "teamName radius pd-l-10 pd-r-6  ft-c-27 fts-13 border_lv4"
            }, React.createElement("table", {
                className: "width-100p height-29"
            }, React.createElement("colgroup", null, React.createElement("col", null), React.createElement("col", {
                className: "col-fixed23"
            })), React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", {
                className: "ft-c-3 fts-15 t-va-t"
            }, React.createElement("div", {
                className: " pd-b-5"
            }, c.n)), React.createElement("td", {
                className: "t-va-t t-a-r"
            })))))), React.createElement("div", {
                className: "rpl-greenScreen mg-t-6 bg-c-29 radius"
            }, React.createElement(s.mainFeatureEvent.img, {
                src: a.img,
                url: g
            })), E, React.createElement("div", {
                className: "mg-t-6"
            }, n, h, R, r, u))
        },
        _clickHeader: function (e) {
            Action.LoadSite(e)
        }
    }), s.leftPanel = React.createClass({
        displayName: "leftPanel",
        render: function () {
            var e, t, a, l, c, n, r, i, o = this.props.data,
                d = o.data,
                m = o.extraData;
            null != d.m && (a = {
                data: d.m,
                extraData: m
            }, l = React.createElement(s.mainFeatureEvent, {
                data: a
            })), d.s.length > 0 && (c = React.createElement(s.secondaryFeatureEvent, {
                data: {
                    data: d.s,
                    extraData: m
                }
            })), d.hip.length > 0 && (e = {
                data: d.hip,
                extraData: m,
                ipec: d.ipec
            }, n = React.createElement(s.inplayPanel, {
                data: e
            })), (d.hnph.length > 0 || d.hnps.length > 0) && (t = {
                hl: d.hnph,
                ss: d.hnps,
                extraData: m
            }, r = React.createElement(s.prestartPanel, {
                data: t
            })), window.global.enableEPS && d.hes && d.hes.length > 0 && (i = React.createElement(s.epmSection, {
                data: d.hes,
                extraData: m
            }));
            var p = React.createElement(s.leftPanel.topBanner, {
                url: m.bannerURL,
                h: m.topBannerH
            });
            return React.createElement("div", {
                className: "content-l clearHack-left"
            }, p, l, n, c, r, i)
        }
    }), s.leftPanel.topBanner = React.createClass({
        displayName: "topBanner",
        render: function () {
            return React.createElement("div", {
                className: "radius bg-c-1 pos-relative ofw-hidden topbanner",
                style: {
                    height: this.props.h + "px"
                }
            }, React.createElement("iframe", {
                src: this.props.url,
                height: this.props.h,
                width: "100%",
                scrolling: "no",
                frameBorder: "0",
                allowTransparency: "true"
            }))
        }
    }), s.neutralIcon = React.createClass({
        displayName: "neutralIcon",
        render: function () {
            return React.createElement("span", {
                title: l.neut,
                className: "neutral fts-12" + (this.props.isRight ? "" : " pos-absolute right-n23 top-2")
            }, React.createElement("span", {
                className: "icon-Neutralbg"
            }), React.createElement("span", {
                className: "icon-NeutralN"
            }))
        }
    }), s.mainFeatureEvent = React.createClass({
        displayName: "mainFeatureEvent",
        mixins: [s.Utility.pnc, s.Utility.timer, s.Utility.link, s.Utility.feContent],
        render: function () {
            var e = this.props.data,
                t = e.data,
                a = t.c.e[0],
                c = HP_Store.getNeedScoreBoardConditionSports(),
                n = {
                    isInplay: t.ip,
                    cds: t.cds || "True" == a.i[38],
                    hs: a.i[10],
                    as: a.i[11],
                    ht: a.i[0],
                    at: a.i[1],
                    showExtraTime: t.ip && this._displayExtraTimeHeader(a) && 1 == t.sid,
                    isNeutral: "N" == a.g,
                    period: a.i[31],
                    time: a.i[5],
                    date: this._getEventDate(a.edt),
                    startTime: this._getEventStartTime(a.edt),
                    cn: t.c.n,
                    showTV: "" != a.i[7],
                    isns: t.isNetSports,
                    nspt: a.i[37],
                    fhs: a.i[33],
                    fas: a.i[34],
                    sid: t.sid,
                    url: this._getMorebetLink(a.cei.ctid == o.pacType.par ? a.k : a.pk, t.ip ? VIEW.INPLAY : VIEW.PRESTART, a.i[36])
                };
            _.includes(c, t.sid) && (n.cds = t.cds && "True" == a.i[38]), 18 == t.sid && a.sb && (n.period = "i1" == a.sb.cp || 13 == a.i[37] ? l.Innings1 : l.Innings2, a.sb.ps && a.sb.ps.length > 0 && (n.cricketScore = {
                gt: a.i[37],
                sb: a.sb
            })), 4 == t.sid && "True" == a.i[38] && a.sb && (n.period = a.sb.cp, n.serve = a.sb.s);
            var r, i = {
                data: t,
                extraData: e.extraData
            };
            return r = 25 == t.sid ? React.createElement(s.mainFeatureEvent.dartsContent, {
                data: i
            }) : React.createElement(s.mainFeatureEvent.content, {
                data: i
            }), React.createElement("div", {
                className: "radius bg-c-1 pd-6 mainEvent" + (0 == e.extraData.topBannerH ? "" : " mg-t-10")
            }, React.createElement(s.mainFeatureEvent.header, {
                data: n
            }), r)
        }
    }), s.mainFeatureEvent.header = React.createClass({
        displayName: "header",
        mixins: [s.Utility.timer, s.Utility.tv, s.Utility.naming],
        render: function () {
            var e, t = this.props.data,
                a = t.isInplay,
                c = t.cds,
                n = t.hs,
                r = t.as,
                i = t.showExtraTime;
            i && (e = React.createElement(s.mainFeatureEvent.header.extraTime, {
                data: {
                    hs: t.fhs,
                    as: t.fas
                }
            }));
            var o;
            18 == t.sid && a && c && t.cricketScore && (o = React.createElement(s.mainFeatureEvent.header.cricketscore, {
                score: t.cricketScore
            }));
            var d;
            t.isNeutral && (d = React.createElement(s.neutralIcon, null));
            var m, p, h, u, E, R, g, f, v, N;
            if (t.showTV && (f = React.createElement("div", {
                    className: "icon-TV2 ft-c-18 dsp-iblk fts-13",
                    onClick: this._playTV,
                    title: a ? l.LP_LiveStreamInplay : l.LP_LiveStream
                })), a) {
                if (m = React.createElement("div", {
                        className: "ft-c-14 live dsp-iblk" + (null == f ? "" : " mg-r-6")
                    }, l.LiveText), t.isns || 21 == t.sid) {
                    var b = this._getBestOfLocalization(t.nspt);
                    u = React.createElement("span", {
                        className: "ft-c-18 fts-12 time"
                    }, _.contains(l.LiveText, b) ? "" : b)
                } else {
                    var y = t.period,
                        k = "" == t.time ? "" : t.time;
                    y && (p = React.createElement("span", {
                        className: "ft-c-18 time fts-" + (null != k && "" != k ? 12 : 15)
                    }, y + " ")), k && 18 != t.sid && (h = "" == k || 2 == t.sid ? React.createElement("span", {
                        className: "ft-c-3 time fts-12"
                    }, k) : 14 == t.sid ? React.createElement("span", {
                        className: "ft-c-3 time fts-12"
                    }, k.split(":")[0] + "'") : React.createElement(s.sport.iptime, {
                        canTick: utility.canTick(t.sid),
                        data: {
                            class: "ft-c-3 time fts-12",
                            t: k
                        }
                    }))
                }
                4 == t.sid && ("" == t.period || isNaN(+t.serve) ? c = !1 : (m = React.createElement(s.sport.baseBallPeriod, {
                    showinInplay: !1,
                    hasTV: null != f,
                    data: {
                        cp: t.period,
                        s: t.serve
                    }
                }), h = null, p = null)), null == p && null == u || (N = React.createElement("div", {
                    className: "div-lineHeight-lv1 mg-t-3"
                }, p, h, u))
            } else {
                var P = t.date,
                    S = t.startTime;
                null != P && "" != P && (E = React.createElement("span", {
                    className: "ft-c-18 fts-12 time"
                }, P)), R = React.createElement("span", {
                    className: "ft-c-3 time fts-" + (null != P && "" != P ? 12 : 15)
                }, " " + S), N = React.createElement("div", {
                    className: "div-lineHeight-lv1" + (null == f ? "" : " mg-t-4")
                }, E, R)
            }
            return g = c && !this._noShowScoreLine() ? n + " - " + r : "v", null == m && null == f || (v = React.createElement("div", {
                className: "div-lineHeight-lv1"
            }, m, f)), React.createElement("div", {
                className: "mainevent-header cr-pointer " + (i ? "extra-time" : ""),
                onClick: this._gotoAMPage
            }, React.createElement("table", {
                className: "tb-mainEventHeader bg-c-10 radius border_lv4"
            }, React.createElement("colgroup", null, React.createElement("col", null), React.createElement("col", {
                className: "col-fixedHeaderRight"
            })), React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", null, React.createElement("div", {
                className: "ft-c-3 pd-t-2 pd-b-2 pd-l-10 pd-r-10 dsp-iblk fts-12 "
            }, React.createElement("div", {
                className: "fts-13 ft-c-18"
            }, t.cn), React.createElement("div", {
                className: "fts-15 pos-relative lht-1p1"
            }, React.createElement("span", {
                className: "dsp-iblk t-va-m"
            }, t.ht), React.createElement("span", {
                className: "ft-c-14 mg-l-10 mg-r-10 t-va-m dsp-iblk"
            }, g), React.createElement("span", {
                className: "dsp-iblk t-va-m"
            }, t.at), d))), React.createElement("td", {
                className: "ft-c-3  fts-12 pd-r-10 t-a-r pd-t-2"
            }, v, N)))), e, o)
        },
        _gotoAMPage: function () {
            Action.LoadSite(this.props.data.url)
        },
        _noShowScoreLine: function () {
            return this.props.data.isns || _.contains([18, 25], this.props.data.sid)
        }
    }), s.mainFeatureEvent.header.extraTime = React.createClass({
        displayName: "extraTime",
        render: function () {
            var e, t = this.props.data,
                a = t.multipleLine;
            "" != t.hs && "" != t.as && (e = React.createElement("div", {
                key: "mfe_h_ex_r",
                className: "ft-c-3" + (a ? "" : " float-right")
            }, l.OddsPage_Page_FT_RESULT + " (" + t.hs + "-" + t.as + ")"));
            var c = React.createElement("div", {
                    key: "mfe_h_ex_t",
                    className: a ? "" : "left"
                }, l.OddsPage_Page_ET_MSG),
                s = a ? [c, e] : [e, c];
            return React.createElement("div", {
                className: "et-header radius bg-c-42 ft-c-35 fts-12 pd-t-5 pd-b-5 pd-r-10 pd-l-10 pd-r-10 border_lv5"
            }, s)
        }
    }), s.mainFeatureEvent.header.cricketscore = React.createClass({
        displayName: "cricketscore",
        render: function () {
            var e = this.props.score;
            return React.createElement("div", {
                className: "ft-c-16 fts-13 pd-t-6 pd-l-10"
            }, this._getScore(e.gt, e.sb))
        },
        _getScore: function (e, t) {
            var a = 13 == e ? "i1" : t.cp,
                l = _.first(_.filter(t.ps, "p", a));
            return "1" == t.s ? l.h + "-" + l.hw : l.a + "-" + l.aw
        }
    }), s.mainFeatureEvent.content = React.createClass({
        displayName: "content",
        mixins: [s.Utility.odds, s.Utility.link, s.Utility.pnc, s.Utility.naming, s.Utility.feContent],
        render: function () {
            var e, t, a, c = this.props.data,
                n = c.data,
                r = n.c.e[0],
                i = (c.hlo, c.isEuroOdds, n.ip),
                d = (this._getBaseOddsProp(r, i), {
                    n: r.i[0]
                }),
                m = {
                    n: r.i[1]
                },
                p = [],
                h = [],
                u = this._getMarketLinesByRegionAndSport(n.rd, n.sid),
                E = this._needBlackTeamName,
                R = this._genOddsItem,
                g = this._getOddsItems;
            null != r.o && _.forEach(u, function (l, c) {
                null == l ? (p.push(React.createElement("td", {
                    key: "mfe_t_" + l,
                    className: "odds-large t-a-r"
                })), h.push(React.createElement("td", {
                    key: "mfe_m_" + l,
                    className: "odds-large pd-t-5 t-a-r"
                }))) : (a = r.o[l], "1x2" == l && (e = []), a ? ("ah" == l && (d.black = E(a[1]), m.black = E(a[3])), t = g(l, r), p.push(R(t[0], l, !0)), h.push(R(t["1x2" == l ? 2 : 1], l, !1)), "1x2" == l && e.push(R(t[1], l, !1))) : (p.push(React.createElement("td", {
                    key: "mfe_t_" + l,
                    className: "odds-large t-a-r"
                }, React.createElement(s.sport.oddsEmpty, null))), h.push(React.createElement("td", {
                    key: "mfe_m_" + l,
                    className: "odds-large pd-t-5 t-a-r"
                }, React.createElement(s.sport.oddsEmpty, null))), "1x2" == l && e.push(React.createElement("td", {
                    key: "mfe_b_" + l,
                    className: "odds-large pd-t-5 t-a-r"
                }, React.createElement(s.sport.oddsEmpty, null)))))
            });
            var f;
            "1X2" != n.rd && 14 != n.sid || (f = React.createElement("div", {
                className: "ft-c-21 t-a-l"
            }, l.Odds_Draw));
            var v, N, b = {
                morebetcount: r.i[32],
                url: this._getMorebetLink(r.cei.ctid == o.pacType.par ? r.k : r.pk, n.ip ? VIEW.INPLAY : VIEW.PRESTART, r.i[36])
            };
            1 == n.sid && this._displayChildTag(r.cei.ctid) && (N = React.createElement("div", {
                className: "ft-c-5 float-right mg-r-6"
            }, this._getChildTag(r.cei.ctid)));
            var y, k;
            if (e) 2 != n.dv ? (b.isMin = !0, v = React.createElement(s.sport.morebet, {
                data: b
            }), e.push(React.createElement("td", {
                className: "odds-large t-a-r pd-t-5"
            }, v))) : e.push(React.createElement("td", null));
            else {
                var P;
                2 != n.dv && (b.isMin = !1, v = React.createElement(s.sport.morebet, {
                    data: b
                }), e = React.createElement("td", {
                    colSpan: "2",
                    className: "t-a-r pd-t-5"
                }, v))
            }
            var P;
            n.isNetSports && null != r.sb && (P = [], _.forEach(r.sb.ps, function (e, t) {
                var a = "mfe_ns_" + r.k + "_" + t;
                P.push(React.createElement(s.sport.score.netSport.scoreItem, {
                    key: a,
                    data: e
                }))
            }));
            var k;
            null != P ? k = React.createElement("td", {
                className: "td-score ft-c-23 fts-13 t-a-l",
                colSpan: "2"
            }, P) : null == N && null == f && null == e || (k = React.createElement("td", {
                colSpan: "2"
            }, N, f)), null == k && null == e || (y = React.createElement("tr", null, k, e));
            var S, M;
            if (!n.ip && null != r.o && null != r.o.eps && null != r.o.eps.o && r.o.eps.o.length > 0) {
                var w = {
                    baseProps: this._getBaseOddsProp(r, i),
                    oddsItems: this._getOddsItems("eps", r),
                    url: b.url,
                    n: r.o.eps.n
                };
                S = React.createElement(s.mainFeatureEvent.eps, {
                    data: w
                })
            }
            var C;
            if (2 == n.dv && null != r.o) {
                if (M = null == M ? this._getBaseOddsProp(r, i) : M, 1 == n.sid) {
                    var T, L, x, I = "HDP" == n.rd ? "1x2" : "ou";
                    if (null != r.o[I] || null != r.o.bts) {
                        "ou" == I && r.cei.ctid == o.pacType.pelAH && (M.evtid = r.ouId);
                        var A = {
                            l: {
                                key: I,
                                data: this._getOddsProps(M, r, I)
                            },
                            r: {
                                key: "bts",
                                data: r.cei.ctid == o.pacType.par ? this._getOddsProps(M, r, "bts") : null
                            }
                        };
                        T = React.createElement(s.mainFeatureEvent.content.oddsRow_twoMarketLine, {
                            key: "mfe_mo_bt",
                            data: A
                        })
                    }
                    if (null == r.o.cs || r.cei.ctid != o.pacType.par && r.cei.ctid != o.pacType.et || (L = React.createElement(s.mainFeatureEvent.content.oddsRow_cs, {
                            key: "mfe_mo_cs",
                            data: this._getOddsProps(M, r, "cs")
                        })), r.cei.ctid != o.pacType.toQualify && r.cei.ctid != o.pacType.winner) {
                        var O = _.find(r.cel, function (e) {
                            return e.cei.ctid == window.o.pacType.toQualify || e.cei.ctid == window.o.pacType.winner
                        });
                        if (null != O && null != O.o && null != O.o.ah) {
                            var B = this._getOddsProps(M, O, "ah");
                            B.oddsItems[0].chdp = "", B.oddsItems[1].chdp = "", B.ctid = O.cei.ctid, B.hn = r.i[0], B.an = r.i[1], B.mn = this._getChildMarketLineName("ah", O.cei.ctid, 1, O.cei.n), B.baseOddsProps.evtid = O.k, B.baseOddsProps.parentEventId = O.pk, B.baseOddsProps.score = r.i[10] + ":" + r.i[11], x = React.createElement(s.mainFeatureEvent.content.oddsRow_singleMarketLine, {
                                key: "mfe_mo_ch",
                                data: B
                            })
                        }
                    }
                    C = [T, L, x]
                } else if (2 == n.sid) {
                    var D, U;
                    if (null != r.o.ml) {
                        var F = this._getOddsProps(M, r, "ml");
                        F.hn = r.i[0], F.an = r.i[1], F.mn = this._getMarketLineName("ml", r.cei.ctid, 2), D = React.createElement(s.mainFeatureEvent.content.oddsRow_singleMarketLine, {
                            key: "mfe_mo_ml",
                            data: F
                        })
                    }
                    if (null != r.o.t1ou || null != r.o.t2ou) {
                        var H = {
                            l: {
                                key: "ou",
                                data: this._getOddsProps(M, r, "t1ou")
                            },
                            r: {
                                key: "ou",
                                data: this._getOddsProps(M, r, "t2ou")
                            }
                        };
                        H.l.data.betType = "ou", H.r.data.betType = "ou";
                        var W = _.find(r.cel, function (e) {
                            return e.cei.ctid == window.o.pacType.teamPointT1
                        });
                        null != W && (H.l.data.ctid = W.cei.ctid, H.l.data.childName = W.cei.n, H.l.data.baseOddsProps.evtid = W.k, H.l.data.baseOddsProps.parentEventId = W.pk);
                        var V = _.find(r.cel, function (e) {
                            return e.cei.ctid == window.o.pacType.teamPointT2
                        });
                        null != V && (H.r.data.ctid = V.cei.ctid, H.r.data.childName = V.cei.n, H.r.data.baseOddsProps.evtid = V.k, H.r.data.baseOddsProps.parentEventId = V.pk), null != W && null != V && (U = React.createElement(s.mainFeatureEvent.content.oddsRow_twoMarketLine, {
                            key: "mfe_mo_ch",
                            data: H
                        }))
                    }
                    C = [D, U]
                }
                b = {
                    txt: l.HP_AllMarkets + " " + r.i[32],
                    url: this._getMorebetLink(r.cei.ctid == o.pacType.par ? r.k : r.pk, n.ip ? VIEW.INPLAY : VIEW.PRESTART, r.i[36]),
                    top: 10
                }, v = React.createElement(s.rightPanel.morebet, {
                    key: "mfe_mo_mb",
                    data: b
                }), C.push(v)
            }
            var z, G = n.isNetSports ? this._getOddsTitleForNetSport() : this._getOddsTitleByRegionAndSport(n.rd, n.sid);
            n.idm && "" != n.msg && (z = React.createElement(s.mainFeatureEvent.content.message, {
                msg: n.msg
            }));
            var X;
            return y || (X = React.createElement("div", {
                className: "pd-tb-10"
            })), React.createElement("div", {
                className: "mg-t-6 oddsContainer"
            }, React.createElement("table", {
                className: "tb-mainEvent odds-large"
            }, React.createElement("colgroup", null, React.createElement("col", {
                className: "col-fixedPicture"
            }), React.createElement("col", null)), React.createElement("tbody", {
                className: "hovertby fts-13",
                onClick: this._linkToAMPage.bind(this, b.url)
            }, React.createElement("tr", null, React.createElement("td", {
                className: "fixedPicture t-a-l lht-0p7"
            }, React.createElement(s.mainFeatureEvent.img, {
                disable: !0,
                src: n.img
            })), React.createElement("td", {
                className: "t-va-bot"
            }, React.createElement("table", {
                className: "odds-large width-100p cr-pointer"
            }, React.createElement("colgroup", null, React.createElement("col", null), React.createElement("col", {
                className: "col-fixedRedcard"
            }), React.createElement("col", {
                className: "col-fixedodds"
            }), React.createElement("col", {
                className: "col-fixedodds"
            })), React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", null), React.createElement("td", null), React.createElement("td", {
                className: "fts-11 t-a-c ft-c-23 pd-l-8 pd-b-8"
            }, G[0]), React.createElement("td", {
                className: "fts-11 t-a-c ft-c-23 pd-l-8 pd-b-8"
            }, G[1])), React.createElement("tr", {
                className: d.black ? "home" : ""
            }, React.createElement("td", {
                className: "td-teameName t-a-l"
            }, React.createElement(s.sport.team, {
                data: d
            })), React.createElement(s.mainFeatureEvent.content.redCard, {
                num: r.i[8]
            }), p), React.createElement("tr", {
                className: m.black ? "home" : ""
            }, React.createElement("td", {
                className: "td-teameName t-a-l"
            }, React.createElement(s.sport.team, {
                data: m
            })), React.createElement(s.mainFeatureEvent.content.redCard, {
                num: r.i[9]
            }), h), y)), X)))), S, C, z)
        },
        _getOddsTitleByRegionAndSport: function (e, t) {
            if (18 == t) return [null, l.Odds_Winner];
            if (14 == t) return [l.Odds_1X2, l.Odds_Hdp];
            switch (e) {
                case "HDP":
                    return [l.Odds_Hdp, l.Odds_OU_Short];
                case "1X2":
                    return [l.Odds_1X2, l.Odds_Hdp];
                case "ML":
                    return [l.Odds_MoneyLine, l.Odds_Hdp];
                default:
                    return []
            }
        },
        _getOddsTitleForNetSport: function () {
            return [l.Odds_Winner, AllMarketUtility.isTableTennisOrBadmintion(this.props.data.data.sid) ? l.MB_GameHDC : l.MB_SetHDC]
        },
        _getMarketLinesByRegionAndSport: function (e, t) {
            if (18 == t) return [null, "ml"];
            if (14 == t) return ["1x2", "ah"];
            switch (e) {
                case "HDP":
                    return ["ah", "ou"];
                case "1X2":
                    return ["1x2", "ah"];
                case "ML":
                    return ["ml", "ah"];
                default:
                    return []
            }
        }
    }), s.mainFeatureEvent.dartsContent = React.createClass({
        displayName: "dartsContent",
        mixins: [s.Utility.odds, s.Utility.link, s.Utility.pnc, s.Utility.naming, s.Utility.feContent],
        render: function () {
            var e = this.props.data.data,
                t = e.c.e[0],
                a = t.i,
                c = t,
                n = {
                    data: this._getBaseOddsProp(t, e.ip)
                };
            n.data.o = _.fill(Array(3), null);
            var r = _.fill(Array(3), n),
                i = this.props.data.extraData.odds.hlo;
            t.o.win ? (_.map(t.o.win, function (e, t) {
                var a = {
                    sid: e[1].toString().substring(1),
                    ignoreHDP: !0,
                    odds: e[2],
                    o: e
                };
                _.contains(i, a.sid) && (a.isHL = !0), r[t] = {
                    data: _.assign({}, r[t].data, a)
                }, r[t] = React.createElement(s.mainFeatureEvent.singleOdds, r[t])
            }), 1 == t.o.win.length && (r[1] = React.createElement(s.sport.oddsEmpty, null))) : r = _.fill(Array(2), React.createElement(s.sport.oddsEmpty, null));
            var d, m = {
                morebetcount: a[32],
                url: this._getMorebetLink(t.cei.ctid == o.pacType.par ? t.k : t.pk, e.ip ? VIEW.INPLAY : VIEW.PRESTART, t.i[36]),
                isMin: t.o.win && 3 == t.o.win.length
            };
            if (!e.ip && null != c.o && null != c.o.eps && null != c.o.eps.o && c.o.eps.o.length > 0) {
                var p = {
                    baseProps: this._getBaseOddsProp(c, e.ip),
                    oddsItems: this._getOddsItems("eps", c),
                    url: m.url,
                    n: c.o.eps.n
                };
                d = React.createElement(s.mainFeatureEvent.eps, {
                    data: p
                })
            }
            var h;
            return e.idm && "" != e.msg && (h = React.createElement(s.mainFeatureEvent.content.message, {
                msg: e.msg
            })), React.createElement("div", {
                className: "mg-t-10 oddsContainer"
            }, React.createElement("table", {
                className: "tb-mainEvent odds-large"
            }, React.createElement("colgroup", null, React.createElement("col", {
                className: "col-fixedPicture"
            }), React.createElement("col", null), React.createElement("col", {
                className: "col-fixedRedcard"
            }), React.createElement("col", {
                className: "col-fixedodds"
            }), React.createElement("col", {
                className: "col-fixedodds"
            })), React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", {
                className: "fixedPicture",
                rowSpan: "4"
            }, React.createElement(s.mainFeatureEvent.img, {
                src: e.img
            })), React.createElement("td", null), React.createElement("td", null), React.createElement("td", {
                className: "fts-12 t-a-c ft-c-23"
            }, l.Odds_Winner), React.createElement("td", {
                className: "fts-12 t-a-c ft-c-23"
            })), React.createElement("tr", null, React.createElement("td", {
                className: "td-teameName t-a-l"
            }, React.createElement("div", {
                className: "ft-c-21 ft-c-4 fts-13"
            }, a[0])), React.createElement("td", {
                className: "one t-a-c"
            }, React.createElement("div", {
                className: "redCard"
            }, React.createElement("div", {
                className: "icon-RedCard"
            }), React.createElement("div", {
                className: "icon-RedCard2"
            }), React.createElement("div", {
                className: "icon-RedCard3"
            }))), React.createElement("td", {
                className: "odds-large"
            }, r[0]), React.createElement("td", {
                className: "odds-large"
            })), React.createElement("tr", null, React.createElement("td", {
                className: "td-teameName t-a-l"
            }, React.createElement("div", {
                className: "ft-c-21 ft-c-4 fts-13"
            }, a[1])), React.createElement("td", {
                className: "one t-a-c"
            }, React.createElement("div", {
                className: "redCard"
            }, React.createElement("div", {
                className: "icon-RedCard"
            }), React.createElement("div", {
                className: "icon-RedCard2"
            }), React.createElement("div", {
                className: "icon-RedCard3"
            }))), React.createElement("td", {
                className: "odds-large"
            }, r[1]), React.createElement("td", {
                className: "odds-large"
            })), React.createElement("tr", {
                className: "moreBet"
            }, React.createElement("td", {
                className: "td-teameName t-a-l",
                colSpan: "2"
            }, React.createElement("div", {
                className: "ft-c-21 ft-c-4 fts-13"
            }, m.isMin ? l.Odds_Draw : "")), m.isMin ? React.createElement("td", {
                className: "odds-large"
            }, r[2]) : null, React.createElement("td", {
                className: "odds-large t-a-c",
                colSpan: m.isMin ? 1 : 2
            }, React.createElement(s.sport.morebet, {
                data: m
            }))))), d, h)
        }
    }), s.mainFeatureEvent.singleOdds = React.createClass({
        displayName: "singleOdds",
        mixins: [s.Utility.oddsBtn],
        render: function () {
            var e = this.props.data,
                t = e.o;
            return "0.00" == e.odds ? React.createElement(s.sport.oddsLock, {
                style: {
                    top: 10
                }
            }) : React.createElement("div", {
                className: "odds-container dsp-iblk"
            }, React.createElement("div", {
                className: classNames("OddsWrapper", {
                    selected: e.isHL
                })
            }, React.createElement("span", {
                onClick: this._addSelection,
                className: classNames("odds singleOdds", {
                    oddsUp: _.includes(e.oddsUp, e.sid),
                    oddsDown: _.includes(e.oddsDown, e.sid)
                })
            }, t[2])))
        }
    }), s.mainFeatureEvent.eps = React.createClass({
        displayName: "eps",
        render: function () {
            for (var e = this.props.data, t = [], a = 0; a < e.oddsItems.length && a < 2; a++) {
                var c = e.oddsItems[a],
                    n = {
                        n: c.n,
                        was: c.was,
                        oddsItem: _.assign({}, e.baseProps, c)
                    },
                    r = "fe_eps_" + c.sid;
                t.push(React.createElement(s.mainFeatureEvent.eps.selection, {
                    key: r,
                    data: n
                }))
            }
            return React.createElement("div", null, React.createElement("table", {
                className: "tb-eps mg-t-6 width-100p fts-13"
            }, React.createElement("colgroup", null, React.createElement("col", null), React.createElement("col", {
                className: "col-fixed65"
            }), React.createElement("col", {
                className: "col-fixed65"
            })), React.createElement("thead", {
                className: " ft-c-3  radius"
            }, React.createElement("tr", null, React.createElement("th", {
                className: "height-28 bg-c-4 radius-lt-lb t-a-l fontWeight-normal pd-l-10 rbr-c-1 tbr-c-18"
            }, e.n), React.createElement("th", {
                className: "height-28 ft-c-56 t-a-c bg-c-4 fontWeight-normal rbr-c-1"
            }, l.OP_Was), React.createElement("th", {
                className: "height-28 t-a-c  bg-c-4 radius-rt-rb fontWeight-normal tbr-c-18"
            }, l.OP_Now)))), React.createElement("table", {
                className: "tb-eps mg-t-6 width-100p fts-13"
            }, React.createElement("colgroup", null, React.createElement("col", null), React.createElement("col", {
                className: "col-fixed65"
            }), React.createElement("col", {
                className: "col-fixed65"
            })), React.createElement("tbody", null, t)), React.createElement("div", {
                className: "viewall lht-30 t-a-c fts-13 topBorder mg-t-5" + (e.oddsItems.length <= 2 ? " hidden" : ""),
                onClick: this._linkToAMP
            }, l.LP_View_All))
        },
        _linkToAMP: function (e) {
            Action.LoadSite(this.props.data.url, {
                showMoreEPS: !0
            }), e.preventDefault(), e.stopPropagation()
        }
    }), s.mainFeatureEvent.eps.selection = React.createClass({
        displayName: "selection",
        render: function () {
            var e = this.props.data;
            return React.createElement("tr", null, React.createElement("td", {
                className: "pd-0 height-30 pd-l-10"
            }, e.n), React.createElement("td", {
                className: "pd-0 t-a-c height-30"
            }, React.createElement("span", {
                className: "odds odds-last linethrough"
            }, e.was)), React.createElement("td", {
                className: "pd-0 t-a-c height-30"
            }, React.createElement(s.rightPanel.odds, {
                data: e.oddsItem
            })))
        }
    }), s.mainFeatureEvent.img = React.createClass({
        displayName: "img",
        render: function () {
            var e;
            if (null == this.props.src || "" == this.props.src) e = "/Public/Theme/Theme_Black/Images/SBK-default-banner.jpg";
            else {
                var t = window.location.protocol;
                e = this.props.src.replace(/^(http:|https:)/, t)
            }
            return React.createElement("img", {
                className: classNames({
                    "cr-pointer": !this.props.disable
                }),
                src: e,
                onClick: this._gotoAMPage
            })
        },
        _gotoAMPage: function () {
            this.props.url && Action.LoadSite(this.props.url)
        }
    }), s.mainFeatureEvent.content.oddsRow_twoMarketLine = React.createClass({
        displayName: "oddsRow_twoMarketLine",
        render: function () {
            var e = this.props.data,
                t = e.l,
                a = e.r,
                l = null == t.data ? React.createElement(s.mainFeatureEvent.content.oddsRow_emptyMarketLine, null) : React.createElement(s.rightPanel.eventForm.marketLines[t.key], {
                    data: t.data,
                    main: !0
                }, null),
                c = null == a.data ? React.createElement(s.mainFeatureEvent.content.oddsRow_emptyMarketLine, null) : React.createElement(s.rightPanel.eventForm.marketLines[a.key], {
                    data: a.data,
                    main: !0
                }, null);
            return React.createElement("table", {
                className: "tb-mainEvent mg-t-10"
            }, React.createElement("colgroup", null, React.createElement("col", {
                className: "col-50Percent"
            }), React.createElement("col", {
                className: "col-50Percent"
            })), React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", {
                className: "rightBorder pd-r-10"
            }, l), React.createElement("td", {
                className: "pd-l-10"
            }, c))))
        }
    }), s.mainFeatureEvent.content.oddsRow_emptyMarketLine = React.createClass({
        displayName: "oddsRow_emptyMarketLine",
        render: function () {
            return React.createElement("table", {
                className: "tb-mainEvent-sub"
            }, React.createElement("colgroup", null, React.createElement("col", {
                className: "col-50Percent"
            }), React.createElement("col", {
                className: "col-50Percent"
            })), React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", {
                colSpan: "2",
                className: "t-a-l"
            }, React.createElement("div", {
                className: "tb-mainEvent-sub-title fts-13 bg-c-27 radius ft-c-4 height-15"
            }))), React.createElement("tr", null, React.createElement("td", {
                className: "t-a-l pd-tb-10 pd-l-10 height-26"
            }), React.createElement("td", {
                className: "t-a-r pd-tb-10 height-26"
            }))))
        }
    }), s.mainFeatureEvent.content.oddsRow_cs = React.createClass({
        displayName: "oddsRow_cs",
        mixins: [s.Utility.naming],
        render: function () {
            var e = this.props.data,
                t = e.oddsItems,
                a = e.baseOddsProps,
                l = [],
                c = this._filterOutZeroOdds;
            a.isInplay ? _.forEach(t, function (e, t) {
                l.push(_.filter(e, c))
            }) : l = t;
            var n = 0 == e.ctid ? this._getMarketLineName("cs", e.ctid, e.sid) : this._getChildMarketLineName("cs", e.ctid, e.sid, e.childName);
            return React.createElement("table", {
                className: "tb-mainEvent mg-t-10"
            }, React.createElement("colgroup", null, React.createElement("col", {
                className: "col-19Percent"
            }), React.createElement("col", {
                className: "col-19Percent"
            }), React.createElement("col", {
                className: "col-22Percent"
            }), React.createElement("col", {
                className: "col-19Percent"
            }), React.createElement("col", {
                className: "col-19Percent"
            })), React.createElement("tbody", {
                className: "fts-13"
            }, React.createElement("tr", null, React.createElement("td", {
                colSpan: "5",
                className: "pd-0 "
            }, React.createElement("div", {
                className: "mg-b-10"
            }, React.createElement(s.rightPanel.marketLineTitle, {
                n: n
            })))), this._genRow(l[0], l[1], l[2], a)))
        },
        _filterOutZeroOdds: function (e) {
            return null != e && null != e.odds && "0.00" != e.odds
        },
        _genRow: function (e, t, a, l) {
            for (var c = [], s = this._genOdds, n = [], r = [], i = [], o = [], d = l.isInplay ? 3 : Math.max(Math.floor(e.length / 2), t.length, Math.floor(a.length / 2)), m = 0; m < e.length; m++) m % 2 == 0 ? n.push(e[m]) : r.push(e[m]);
            for (var p = 0; p < a.length; p++) p % 2 == 0 ? i.push(a[p]) : o.push(a[p]);
            for (var h = 0; h < d; h++) {
                var u = n[h],
                    E = r[h],
                    R = t[h],
                    g = i[h],
                    f = o[h];
                c.push(React.createElement("tr", {
                    key: "m_cs_r" + h
                }, s(u, "t-a-l pd-tb-10 pd-l-10", l), s(E, "t-a-c pd-tb-10", l), s(R, "t-a-c pd-tb-10 rightBorder leftBorder", l), s(g, "t-a-c pd-tb-10", l), s(f, "t-a-r pd-tb-10", l)))
            }
            return c
        },
        _genOdds: function (e, t, a) {
            if (!a.isInplay || null != e && "0.00" != e.odds) {
                var l;
                return l = null != e && "0.00" != e.odds ? React.createElement(s.rightPanel.odds, {
                    data: _.assign({}, a, e)
                }) : React.createElement("span", {
                    className: "odds v-hidden"
                }), React.createElement("td", {
                    className: t
                }, React.createElement("span", {
                    className: "mg-r-6 ft-c-16"
                }, null != e ? e.n : ""), l)
            }
            return React.createElement("td", {
                className: t
            })
        }
    }), s.mainFeatureEvent.content.oddsRow_singleMarketLine = React.createClass({
        displayName: "oddsRow_singleMarketLine",
        render: function () {
            var e = this.props.data,
                t = e.oddsItems,
                a = e.baseOddsProps;
            return React.createElement("table", {
                className: "tb-mainEvent mg-t-10 layout-BTTS"
            }, React.createElement("colgroup", null, React.createElement("col", {
                className: "col-50Percent"
            }), React.createElement("col", {
                className: "col-50Percent"
            })), React.createElement("tbody", {
                className: "fts-13"
            }, React.createElement("tr", null, React.createElement("td", {
                colSpan: "2",
                className: "pd-0"
            }, React.createElement(s.rightPanel.marketLineTitle, {
                n: e.mn
            }))), React.createElement("tr", null, React.createElement("td", {
                className: "t-a-l pd-tb-10 pd-l-10"
            }, React.createElement(s.rightPanel.odds, {
                data: _.assign({
                    isRight: !0
                }, a, t[0])
            }), React.createElement("span", {
                className: "ft-c-4 sp-teamName mg-t-2 dsp-iblk"
            }, e.hn)), React.createElement("td", {
                className: "t-a-l pd-tb-10 pd-l-10"
            }, React.createElement(s.rightPanel.odds, {
                data: _.assign({
                    isRight: !0
                }, a, t[1])
            }), React.createElement("span", {
                className: "ft-c-4 sp-teamName mg-t-2 dsp-iblk"
            }, e.an)))))
        }
    }), s.mainFeatureEvent.content.redCard = React.createClass({
        displayName: "redCard",
        render: function () {
            var e, t = ["1", "2", "3"];
            return _.includes(t, this.props.num) && (e = React.createElement("div", {
                className: "redCard"
            }, React.createElement("div", {
                className: "icon-RedCard"
            }), React.createElement("div", {
                className: "icon-RedCard2"
            }), React.createElement("div", {
                className: "icon-RedCard3"
            }))), React.createElement("td", {
                className: "t-a-c rc" + this.props.num
            }, e)
        }
    }), s.mainFeatureEvent.content.message = React.createClass({
        displayName: "message",
        render: function () {
            return React.createElement("div", {
                className: "bg-c-53 pd-t-6" + (this.props.pdb ? " pd-b-6" : "")
            }, React.createElement("div", {
                className: "radius bg-c-54 pd-l-10 pd-r-10 pd-t-8 pd-b-7 fts-13 t-a-l ft-c-57 lht-15"
            }, this.props.msg))
        }
    }), s.secondaryFeatureEvent = React.createClass({
        displayName: "secondaryFeatureEvent",
        render: function () {
            var e = this.props.data,
                t = [];
            return _.forEach(e.data, function (a, l) {
                var c = {
                    data: a,
                    extraData: e.extraData,
                    index: l
                };
                if (1 == a.t) {
                    var n;
                    n = 25 == a.sid ? React.createElement(s.secondaryFeatureEvent.dartsEventForm, {
                        key: "fe_" + l,
                        data: c
                    }) : React.createElement(s.secondaryFeatureEvent.eventForm, {
                        key: "fe_" + l,
                        data: c
                    }), t.push(n)
                } else 2 == a.t && a.isEpm ? t.push(React.createElement(s.secondaryFeatureEvent.epmForm, {
                    key: "rfe_" + a.spid,
                    data: c
                })) : 2 != a.t || a.isEpm ? 3 == a.t && t.push(React.createElement(s.secondaryFeatureEvent.competitionForm, {
                    key: "fe_" + l,
                    data: c
                })) : t.push(React.createElement(s.secondaryFeatureEvent.outrightForm, {
                    key: "rfe_" + a.spid,
                    data: c
                }))
            }), React.createElement("div", {
                className: "radius bg-c-1 pd-6 mg-t-10 featureEvent"
            }, React.createElement("div", {
                className: "featureEvent-header"
            }, React.createElement("div", {
                className: "bg-c-48 radius ft-c-3 fts-16 pd-l-10 pd-r-10 fontWeight-bold pd-t-11 pd-b-11"
            }, l.HP_FeatureEvent)), React.createElement("div", null, t))
        }
    }), s.secondaryFeatureEvent.eventForm = React.createClass({
        displayName: "eventForm",
        mixins: [s.Utility.odds, s.Utility.pnc, s.Utility.link, s.Utility.tv, s.Utility.naming],
        render: function () {
            var e, t = this.props.data,
                a = t.data,
                c = a.c.e[0],
                n = (t.hlo, t.index);
            "" != c.i[7] && (e = React.createElement("div", {
                onClick: this._playTV,
                className: "icon-TV2 dsp-iblk"
            }));
            var r, i = a.ip;
            i && (r = React.createElement("div", {
                className: "live dsp-iblk" + (null == e ? "" : " mg-r-10")
            }, l.LiveText), 4 == a.sid && "True" == c.i[38] && c.sb && (r = null));
            var d;
            1 == a.sid && this._displayChildTag(c.cei.ctid) && (d = React.createElement("div", {
                className: "dsp-iblk ft-c-5" + (null == e && null == r ? "" : " mg-r-10")
            }, this._getChildTag(c.cei.ctid)));
            var m = a.isNetSports,
                p = this._canDisplayScore(c, a.sid, a.cds),
                h = {
                    hn: c.i[0],
                    an: c.i[1]
                };
            if (4 != a.sid && 14 != a.sid || (p = c.i[38], 4 == a.sid && (p = p && c.sb)), p && (h.hs = c.i[10], h.as = c.i[11]), "HDP" == a.rd && c.o && c.o.ah) {
                h.hb = this._needBlackTeamName(c.o.ah[1]), h.ab = this._needBlackTeamName(c.o.ah[3]);
                (25 == a.sid || 14 == a.sid) && (h.hb = !1, h.ab = !1)
            }
            var u;
            m && i && null != c.sb && (u = React.createElement("tr", null, React.createElement("td", {
                colSpan: "6",
                className: "pd-b-10 pd-r-6 ft-c-21 t-a-l"
            }, React.createElement(s.rightPanel.eventForm.netSportScore, {
                data: {
                    sb: c.sb,
                    eid: c.k,
                    sid: a.sid
                }
            }))));
            var E = "1X2" == a.rd || 25 == a.sid || 14 == a.sid,
                R = this._getOddsByRegion(a.rd, c, a.sid),
                g = [];
            if (null == R) g.push(React.createElement("td", {
                key: c.k + "_empty1",
                className: "pd-t-6 pd-b-6"
            }, React.createElement(s.sport.oddsEmpty, null))), g.push(React.createElement("td", {
                key: c.k + "_empty2",
                className: "pd-t-6 pd-b-6"
            }, React.createElement(s.sport.oddsEmpty, null))), E && g.push(React.createElement("td", {
                key: c.k + "_empty3",
                className: "pd-t-6 pd-b-6"
            }, React.createElement(s.sport.oddsEmpty, null)));
            else {
                E || 14 == a.sid ? (R[0].hdp = "1", R[1].hdp = "X", R[2].hdp = "2") : "ML" != a.rd && 18 != a.sid || (R[0].hdp = "1", R[1].hdp = "2");
                var f = this._getBaseOddsProp;
                _.forEach(R, function (e) {
                    if (0 == e.odds) g.push(React.createElement("td", {
                        key: e.sid,
                        className: "pd-t-6 pd-b-6"
                    }, React.createElement(s.sport.oddsLock, null)));
                    else {
                        var t = _.assign({
                            ignoreHDP: "HDP" != a.rd || 18 == a.sid || 14 == a.sid
                        }, f(c, i), e);
                        g.push(React.createElement("td", {
                            key: e.sid,
                            className: "pd-t-6 pd-b-6"
                        }, React.createElement(s.sport.odds, {
                            data: t
                        })))
                    }
                })
            }
            var v = {
                    morebetcount: c.i[32],
                    url: this._getMorebetLink(c.cei.ctid == o.pacType.par ? c.k : c.pk, a.ip ? VIEW.INPLAY : VIEW.PRESTART, c.i[36]),
                    isMin: !0
                },
                N = React.createElement(s.sport.morebet, {
                    data: v
                }),
                b = {
                    isInplay: i,
                    sid: a.sid
                };
            if (i) {
                if (b.showScore = p, b.period = c.i[31], b.time = HP_Store.initTimerString(c.i[5]), 18 == a.sid && null != c.sb && (c.sb.cp = 13 == c.i[37] ? "i1" : c.sb.cp, b.period = c.sb.cp, null != c.sb.ps && c.sb.ps.length > 0)) {
                    var y = _.filter(c.sb.ps, "p", c.sb.cp)[0];
                    b.h = "1" == c.sb.s ? y.h : y.a, b.a = "1" == c.sb.s ? y.hw : y.aw
                }
            } else b.edt = c.edt;
            var k;
            if (m && i) {
                var P;
                null != c.sb && (P = React.createElement("div", null, this._getNetSportPeriod(c.sb.cp, this.props.data.data.sid))), k = React.createElement("td", {
                    className: "ft-c-23"
                }, P), h = $.extend(h, {
                    hs: null,
                    as: null
                })
            } else if (4 == a.sid && i) {
                var S;
                c.sb && (S = React.createElement(s.sport.baseBallPeriod, {
                    showinInplay: !0,
                    hasTV: !1,
                    data: {
                        cp: c.sb.cp,
                        s: c.sb.s
                    }
                })), k = React.createElement("td", {
                    className: "ft-c-59 t-a-c"
                }, S)
            } else k = 21 == a.sid && i ? React.createElement("td", {
                className: "ft-c-23 t-a-c"
            }, c.i[37] > 0 ? this._getBestOfLocalization(c.i[37]) : null) : React.createElement(s.sport.periodAndTime, {
                data: b
            });
            var M, w = 6;
            "1X2" != a.rd && 14 != a.sid || (M = React.createElement("col", {
                className: "col-fixedodds"
            }), w = 7);
            var C;
            this._displayExtraTimeHeader(c) && 1 == a.sid && (C = React.createElement("tr", null, React.createElement("td", {
                colSpan: w,
                className: "t-a-l"
            }, React.createElement(s.mainFeatureEvent.header.extraTime, {
                data: {
                    hs: c.i[33],
                    as: c.i[34]
                }
            }))));
            var T;
            !a.ip && null != c.o && null != c.o.eps && null != c.o.eps.o && c.o.eps.o.length > 0 && (T = React.createElement("tr", null, React.createElement("td", {
                colSpan: w,
                className: "t-a-l"
            }, React.createElement(s.secondaryFeatureEvent.eps, {
                pdt: !0,
                url: v.url
            }))));
            var L;
            a.idm && "" != a.msg && (L = React.createElement("tr", null, React.createElement("td", {
                colSpan: w,
                className: "t-a-l"
            }, React.createElement(s.mainFeatureEvent.content.message, {
                pdb: !0,
                msg: a.msg
            }))));
            return "N" == c.g && React.createElement(s.neutralIcon, null), React.createElement("table", {
                className: "tb-featureEvent odds-large t-a-c odds-large secondary min " + (n > 0 ? " topBorder" : "")
            }, React.createElement("colgroup", null, React.createElement("col", {
                className: "col-eventImage"
            }), React.createElement("col", null), React.createElement("col", {
                className: "col-fixed45"
            }), React.createElement("col", {
                className: "col-fixedodds"
            }), M, React.createElement("col", {
                className: "col-fixedodds"
            }), React.createElement("col", {
                className: "col-fixed51"
            })), React.createElement("tbody", {
                className: "fts-13 selection hovertby\tcr-pointer"
            }, React.createElement("tr", null, React.createElement("td", {
                colSpan: w,
                className: "pd-b-3"
            })), C, React.createElement("tr", {
                className: "ft-c-16 height-24"
            }, React.createElement("td", {
                className: "td-eventImage",
                rowSpan: "2"
            }, React.createElement(s.mainFeatureEvent.img, {
                src: a.img,
                url: v.url
            })), React.createElement("td", {
                className: "t-a-l pd-l-10 pd-t-5 pd-b-2 lht-0p9",
                colSpan: "3"
            }, a.c.n), React.createElement("td", {
                colSpan: null == M ? 2 : 3,
                className: "t-a-r pd-t-5 pd-r-10"
            }, React.createElement("div", {
                className: "div-lineHeight-lv1 ft-c-21 fts-12"
            }, d, r, e))), React.createElement("tr", null, React.createElement("td", {
                className: "t-a-l pd-l-10",
                onClick: this._gotoAMPage.bind(this, v.url)
            }, React.createElement(s.sport.scoreAndTeamName, {
                data: h
            })), k, g, React.createElement("td", {
                className: "t-a-r"
            }, N)), u, T, L))
        },
        _gotoAMPage: function (e) {
            Action.LoadSite(e)
        },
        _canDisplayScore: function (e, t, a) {
            var l = [2, 3, 4, 9, 13, 14, 20, 18, 25];
            return 18 != t && (e && _.contains(l, t) ? "True" == e.i[38] : a)
        }
    }), s.secondaryFeatureEvent.dartsEventForm = React.createClass({
        displayName: "dartsEventForm",
        mixins: [s.Utility.odds, s.Utility.pnc, s.Utility.link, s.Utility.tv, s.Utility.naming],
        render: function () {
            var e, t, a = this.props.data,
                c = a.data,
                n = c.c.e[0],
                r = n.i,
                i = (a.hlo, a.index, {
                    morebetcount: n.i[32],
                    url: this._getMorebetLink(n.cei.ctid == o.pacType.par ? n.k : n.pk, c.ip ? VIEW.INPLAY : VIEW.PRESTART, n.i[36]),
                    isMin: !0
                }),
                d = c.ip && c.cds && "True" == r[38],
                m = {
                    hn: n.i[0],
                    an: n.i[1]
                };
            d && (m.hs = n.i[10], m.as = n.i[11]);
            !c.ip && null != n.o && null != n.o.eps && null != n.o.eps.o && n.o.eps.o.length > 0 && (e = React.createElement("tr", null, React.createElement("td", {
                colSpan: 7,
                className: "t-a-l"
            }, React.createElement(s.secondaryFeatureEvent.eps, {
                pdt: !0,
                url: i.url
            })))), c.idm && "" != c.msg && (t = React.createElement("tr", null, React.createElement("td", {
                colSpan: 7,
                className: "t-a-l"
            }, React.createElement(s.mainFeatureEvent.content.message, {
                pdb: !0,
                msg: c.msg
            }))));
            var p = [],
                h = this._getOddsByRegion(c.rd, n, c.sid),
                p = [];
            if (h) {
                h[1] ? h[1].hdp = "X" : h[1] = {
                    hdp: "X"
                }, h[0].hdp = "1", h[2].hdp = "2";
                var u = this._getBaseOddsProp;
                _.forEach(h, function (e) {
                    if (null == e) p.push(React.createElement("td", {
                        key: n.k + "_empty",
                        className: "pd-t-6 pd-b-6"
                    }, React.createElement(s.sport.oddsEmpty, null)));
                    else if (0 == e.odds) p.push(React.createElement("td", {
                        key: e.sid,
                        className: "pd-t-6 pd-b-6"
                    }, React.createElement(s.sport.oddsLock, null)));
                    else {
                        var t = _.assign({
                            ignoreHDP: !0
                        }, u(n, c.ip), e);
                        p.push(React.createElement("td", {
                            key: e.sid,
                            className: "pd-t-6 pd-b-6"
                        }, React.createElement(s.sport.odds, {
                            data: t
                        })))
                    }
                })
            } else p.push(React.createElement("td", {
                key: n.k + "_empty1",
                className: "pd-t-6 pd-b-6"
            }, React.createElement(s.sport.oddsEmpty, null))), p.push(React.createElement("td", {
                key: n.k + "_empty2",
                className: "pd-t-6 pd-b-6"
            }, React.createElement(s.sport.oddsEmpty, null))), p.push(React.createElement("td", {
                key: n.k + "_empty3",
                className: "pd-t-6 pd-b-6"
            }, React.createElement(s.sport.oddsEmpty, null)));
            return React.createElement("table", {
                className: "tb-featureEvent odds-large t-a-c odds-large secondary topBorder"
            }, React.createElement("colgroup", null, React.createElement("col", {
                className: "col-eventImage"
            }), React.createElement("col", null), React.createElement("col", null), React.createElement("col", {
                className: "col-fixedodds"
            }), React.createElement("col", {
                className: "col-fixedodds"
            }), React.createElement("col", {
                className: "col-fixedodds"
            }), React.createElement("col", {
                className: "col-fixed51"
            })), React.createElement("tbody", {
                className: "fts-13 selection hovertby cr-pointer"
            }, React.createElement("tr", null, React.createElement("td", {
                colSpan: "7",
                className: "pd-b-3"
            })), React.createElement("tr", {
                className: "ft-c-16 height-24"
            }, React.createElement("td", {
                className: "td-eventImage",
                rowSpan: "2"
            }, React.createElement(s.mainFeatureEvent.img, {
                src: c.img,
                url: i.url
            })), React.createElement("td", {
                className: "t-a-l pd-l-10 pd-t-5 pd-b-2 lht-0p9",
                colSpan: "3"
            }, c.c.n), React.createElement("td", {
                colSpan: "3",
                className: "t-a-r pd-r-10"
            }, React.createElement("div", {
                className: "div-lineHeight-lv1 ft-c-21 fts-12"
            }, React.createElement("div", {
                className: "dsp-iblk mg-r-10 ft-c-5"
            }), React.createElement("div", {
                className: classNames("live dsp-iblk", {
                    "mg-r-10": "" != r[7]
                })
            }, c.ip ? l.LiveText : null), "" == r[7] ? null : React.createElement("div", {
                className: "icon-TV2  dsp-iblk"
            })))), React.createElement("tr", null, React.createElement("td", {
                colSpan: "2",
                className: "t-a-l pd-l-10",
                onClick: this._gotoAMPage.bind(this, i.url)
            }, React.createElement(s.sport.scoreAndTeamName, {
                data: m
            })), p, React.createElement("td", {
                className: "t-a-r"
            }, React.createElement(s.sport.morebet, {
                data: i
            }))), e, t))
        },
        _gotoAMPage: function (e) {
            Action.LoadSite(e)
        }
    }), s.secondaryFeatureEvent.eps = React.createClass({
        displayName: "eps",
        render: function () {
            return React.createElement("div", {
                className: "bg-c-53" + (this.props.pdt ? " pd-t-6" : "") + (this.props.pdb ? " pd-b-6" : "")
            }, React.createElement("div", {
                className: "radius bg-c-4 pd-l-10 pd-r-10 pd-t-8 pd-b-7 fts-13 t-a-c ft-c-3 epsbanner",
                onClick: this._gotoAMPage
            }, l.OP_EPSAvailable))
        },
        _gotoAMPage: function () {
            Action.LoadSite(this.props.url)
        }
    }), s.secondaryFeatureEvent.outrightForm = React.createClass({
        displayName: "outrightForm",
        mixins: [s.Utility.odds, s.Utility.link],
        render: function () {
            var e = this.props.data,
                t = e.data,
                a = t.c.e[0],
                c = a["n-o"][0],
                n = e.index;
            if (null == c) return null;
            for (var r, i, o = c.o.length > 2 ? 3 : 2, d = [], m = 0; m < c.o.length && m < 4; m++) {
                var p = c.o[m];
                d.push(React.createElement("td", {
                    className: "t-a-l" + (m % 2 == 0 ? " pd-l-10" : " pd-l-5")
                }, React.createElement("div", {
                    className: "ft-c-25"
                }, p[0])));
                var h = {
                    sid: p[1].replace(/\D+/, ""),
                    odds: p[2],
                    hdp: null,
                    last: !1
                };
                d.push(React.createElement("td", {
                    className: m % 2 == 0 ? "" : "t-a-r pd-r-5"
                }, React.createElement("div", {
                    className: "odds-container"
                }, React.createElement(s.rightPanel.odds, {
                    data: _.assign({}, this._getBaseOddsProp(a, !1), h)
                }))))
            }
            var u = {
                    url: this._getOutrightLink(t.sid, t.c.k),
                    isMin: !0,
                    height: 48
                },
                E = React.createElement(s.sport.morebet, {
                    data: u
                });
            d = _.chunk(_.chunk(d, 2), 2), d.length > 1 ? (r = React.createElement("tr", {
                className: "height-24"
            }, d[0], React.createElement("td", {
                className: "t-a-r",
                rowSpan: "2"
            }, E)), 1 == d[1].length && d[1].push([React.createElement("td", null), React.createElement("td", null)]), i = React.createElement("tr", {
                className: "height-24"
            }, d[1])) : (1 == d[0].length && d[0].push([React.createElement("td", null), React.createElement("td", null)]), r = React.createElement("tr", {
                className: "height-24"
            }, d[0], React.createElement("td", {
                className: "t-a-r"
            }, E)));
            var R;
            c.pf && c.pt && (R = React.createElement("tr", null, React.createElement("td", {
                colSpan: "6",
                className: "t-a-l"
            }, React.createElement("div", {
                className: "bg-c-53 pd-t-6 pd-b-6"
            }, React.createElement("div", {
                className: "radius bg-c-27 pd-l-10 pd-r-10 pd-t-8 pd-b-7 fts-13 t-a-l ft-c-4 lht-15"
            }, l.OP_EW_S, " - 1/", c.pf, ",", " ", l.OP_NT.replace("XXX", c.pt))))));
            var g;
            return t.idm && "" != t.msg && (g = React.createElement("tr", null, React.createElement("td", {
                colSpan: "6",
                className: "t-a-l"
            }, React.createElement(s.mainFeatureEvent.content.message, {
                pdb: !0,
                msg: t.msg
            })))), React.createElement("table", {
                className: "tb-featureEvent t-a-c secondary" + (n > 0 ? " topBorder" : "")
            }, React.createElement("colgroup", null, React.createElement("col", {
                className: "col-eventImage"
            }), React.createElement("col", null), React.createElement("col", {
                className: "col-fixedodds"
            }), React.createElement("col", null), React.createElement("col", {
                className: "col-fixedodds"
            }), React.createElement("col", {
                className: "col-fixed57"
            })), React.createElement("tbody", {
                className: "fts-13 selection hovertby cr-pointer"
            }, React.createElement("tr", null, React.createElement("td", {
                colSpan: "6",
                className: "pd-b-3"
            })), React.createElement("tr", {
                className: "ft-c-16 fts-13 height-24"
            }, React.createElement("td", {
                className: "td-eventImage",
                rowSpan: o
            }, React.createElement(s.mainFeatureEvent.img, {
                src: t.img,
                url: u.url
            })), React.createElement("td", {
                className: "t-a-l pd-l-10  lht-1e",
                colSpan: "5"
            }, React.createElement("div", {
                className: "pd-t-5 pd-b-2"
            }, a.egn, React.createElement("span", {
                className: "ft-c-23"
            }, " " + c.mn)))), r, i, R, g))
        }
    }), s.secondaryFeatureEvent.epmForm = React.createClass({
        displayName: "epmForm",
        mixins: [s.Utility.odds, s.Utility.link],
        render: function () {
            var e = this.props.data,
                t = e.data,
                a = t.c,
                l = t.c.e[0],
                n = l["e-o"][0],
                r = e.index,
                i = e.extraData;
            if (null == n) return null;
            var o = {
                    url: this._getEpmLink(t.sid, t.c.k),
                    isMin: !0,
                    height: 48
                },
                d = _.first(n.o),
                m = d ? React.createElement(s.secondaryFeatureEvent.epmForm.selection, c({
                    key: "se_epm_sel_" + d.id
                }, d, {
                    evt: l,
                    epmLink: o.url,
                    data: {
                        extraData: i
                    }
                })) : null,
                p = void 0;
            return t.idm && "" != t.msg && (p = React.createElement("tr", null, React.createElement("td", {
                colSpan: "6",
                className: "t-a-l"
            }, React.createElement(s.mainFeatureEvent.content.message, {
                pdb: !0,
                msg: t.msg
            })))), React.createElement("table", {
                className: "tb-featureEvent odds-large t-a-c odds-large secondary min" + (r > 0 ? " topBorder" : "")
            }, React.createElement("colgroup", null, React.createElement("col", {
                className: "col-eventImage"
            }), React.createElement("col", null), React.createElement("col", {
                className: "col-fixed45"
            }), React.createElement("col", {
                className: "col-fixedodds"
            }), React.createElement("col", {
                className: "col-fixedodds"
            }), React.createElement("col", {
                className: "col-fixed51"
            })), React.createElement("tbody", {
                className: "fts-13 selection hovertby\tcr-pointer"
            }, React.createElement("tr", null, React.createElement("td", {
                colSpan: "6",
                className: "pd-b-3"
            })), React.createElement("tr", {
                className: "ft-c-16 height-24"
            }, React.createElement("td", {
                className: "td-eventImage",
                rowSpan: 2
            }, React.createElement(s.mainFeatureEvent.img, {
                src: t.img,
                url: o.url
            })), React.createElement("td", {
                className: "t-a-l pd-l-10 pd-t-5 lht-0p9 ft-c-56 fts-13",
                colSpan: "5"
            }, a.n, React.createElement("div", {
                className: "ft-c-83 fts-13 pd-t-5"
            }, n.mn))), m, p))
        }
    }), s.secondaryFeatureEvent.epmForm.selection = React.createClass({
        displayName: "selection",
        mixins: [s.Utility.odds, s.Utility.link],
        getInitialState: function () {
            return {
                showDetail: !1
            }
        },
        render: function () {
            var e = this,
                t = this.props,
                a = t.id,
                l = t.o,
                c = t.lo,
                n = t.dt,
                r = t.dil,
                i = t.ril,
                o = t.iscc,
                d = t.epmLink,
                m = t.evt,
                p = this.state.showDetail,
                h = a.replace(/\D+/, ""),
                u = {
                    sid: h,
                    odds: l,
                    isHL: this._highlightCheck(h),
                    hdp: null,
                    last: !1
                },
                E = _.assign({}, this._getBaseOddsProp(m, !1), u);
            return React.createElement("tr", null, React.createElement("td", {
                className: "t-a-l pd-l-10"
            }, React.createElement("table", {
                className: "lht-1p4"
            }, React.createElement("tbody", null, r && r.map(function (t, a) {
                var l = e._getEpmDisplayName(n, t);
                return React.createElement("tr", {
                    key: "se_epm_" + m.k + "_sel_dil_" + t + "_" + a
                }, React.createElement("td", null, React.createElement("div", {
                    className: "ft-c-4"
                }, l)))
            })))), React.createElement("td", {
                className: "pd-0 t-a-c epm tb-featureEvent "
            }, React.createElement("span", {
                className: "icon icon-i-s ft-c-22 bg-c-57 ",
                onMouseEnter: function () {
                    return e._handleMouseEvent(!0)
                },
                onMouseLeave: function () {
                    return e._handleMouseEvent(!1)
                }
            }), p ? React.createElement("div", {
                className: "overlayContainer selected pos-absolute pd-r-7"
            }, React.createElement("div", {
                className: "tickContainer "
            }, React.createElement("span", {
                className: "tick "
            })), React.createElement("div", {
                className: "overlay "
            }, React.createElement("div", {
                className: "br-c-1 bg-c-55 fts-13 "
            }, i && i.map(function (t, a) {
                var l = e._getReferDetailName(t.isor, t.rn);
                return [React.createElement("div", {
                    key: "sec_epm_sel_ril_sn_" + a,
                    className: "bold ft-c-25 t-a-l " + (0 !== a ? " pd-t-5" : "")
                }, t.sn), o ? React.createElement("div", {
                    key: "sec_epm_sel_ril_cn_" + a,
                    className: "ft-c-22 t-a-l"
                }, React.createElement("span", {
                    className: "mg-r-6"
                }, t.cn)) : null, React.createElement("div", {
                    className: "ft-c-22 t-a-l ",
                    key: "sec_epm_sel_ril_dd_" + a
                }, l, React.createElement("span", {
                    className: "mg-r-5 "
                }, ","), React.createElement("span", {
                    className: "mg-r-10 "
                }, t.rd), React.createElement("span", null, t.rt))]
            })))) : null), React.createElement("td", {
                className: "pd-0 t-a-c "
            }, React.createElement("span", {
                className: "fontWeight-bold strike "
            }, c)), React.createElement("td", {
                className: "pd-t-10 pd-b-10 ",
                key: "epmselodds_" + a
            }, React.createElement("div", {
                className: "odds-container dsp-iblk "
            }, React.createElement(s.sport.odds, {
                data: E
            }))), React.createElement("td", {
                className: "t-a-r pd-t-10 pd-b-10 "
            }, React.createElement("div", {
                className: "t-a-c bt-moreBet bt-moreBet-min bg-c-41 height-40 radius ft-c-3 fontWeight-bold",
                onClick: function () {
                    return Action.LoadSite(d)
                }
            }, React.createElement("span", {
                className: "icon-ArrowMoreBets "
            }))))
        },
        _getEpmDisplayName: function (e, t) {
            switch (e) {
                case 1:
                    var a = t.split("-v-");
                    return a.length < 2 ? null : a[0] + " v " + a[1];
                case 2:
                case 3:
                    return t
            }
        },
        _getReferDetailName: function (e, t) {
            if (e) return React.createElement("span", {
                className: "mg-r-6"
            }, t);
            var a = t.split("-v-");
            return a.length < 2 ? null : [React.createElement("span", {
                className: "mg-r-6"
            }, a[0]), React.createElement("span", {
                className: "mg-r-6 ft-c-16"
            }, "v"), React.createElement("span", null, a[1])]
        },
        _handleMouseEvent: function (e) {
            this.setState({
                showDetail: e
            })
        }
    }), s.secondaryFeatureEvent.competitionForm = React.createClass({
        displayName: "competitionForm",
        mixins: [s.Utility.odds, s.Utility.link],
        render: function () {
            var e, t = this,
                a = this.props.data,
                c = a.data,
                n = c.c,
                r = a.index;
            n.hasor && (e = React.createElement("div", {
                className: "mg-l-10 dsp-blk t-a-c bt-moreBet bg-c-41 height-40 radius ft-c-3 fts-12 colButton",
                onClick: this._linkToOutRight
            }, React.createElement("span", {
                className: "maxwidth-85 pos-relative dsp-iblk lht-1e mg-b-3 t-va-m"
            }, l.LP_OutrightMarkets), React.createElement("span", {
                className: "icon-ArrowMoreBets"
            })));
            var i = void 0;
            n.hasepm && (i = React.createElement("tr", null, React.createElement("td", {
                colSpan: "6",
                className: "t-a-l pd-b-6"
            }, React.createElement("div", {
                className: "t-a-c bt-moreBet-enlarge height-40 radius ft-c-3 fts-12 bg-c-4 epsbanner",
                onClick: function () {
                    return Action.LoadSite(t._getEpmLink(c.sid, n.k))
                }
            }, React.createElement("span", null, l.EPM.EPM_Available), React.createElement("span", {
                className: "fontWeight-bold"
            }), React.createElement("span", {
                className: "icon-ArrowMoreBets"
            })))));
            var o;
            c.idm && "" != c.msg && (o = React.createElement("tr", null, React.createElement("td", {
                colSpan: "6",
                className: "t-a-l"
            }, React.createElement(s.mainFeatureEvent.content.message, {
                pdb: !0,
                msg: c.msg
            }))));
            var d;
            return n.ec > 0 && (d = React.createElement("div", {
                className: "dsp-blk t-a-c bt-moreBet bg-c-41 height-40 radius ft-c-3 fts-12 colButton",
                onClick: this._linkToCompetition
            }, n.ec + " " + l.HP_Matches, React.createElement("span", {
                className: "icon-ArrowMoreBets"
            }))), React.createElement("table", {
                className: "tb-featureEvent t-a-c secondary" + (r > 0 ? " topBorder" : "")
            }, React.createElement("colgroup", null, React.createElement("col", {
                className: "col-eventImage"
            }), React.createElement("col", null), React.createElement("col", {
                className: "col-fixedodds"
            }), React.createElement("col", null), React.createElement("col", {
                className: "col-fixedodds"
            }), React.createElement("col", {
                className: "col-fixedodds"
            })), React.createElement("tbody", {
                className: "fts-13 selection hovertby cr-pointer"
            }, React.createElement("tr", {
                className: "ft-c-16 fts-13 height-24"
            }, React.createElement("td", {
                className: "td-eventImage"
            }, React.createElement(s.mainFeatureEvent.img, {
                src: c.img,
                url: this._getCompetitionLink(c.sid, n.k)
            })), React.createElement("td", {
                className: " pd-l-10 t-a-l"
            }, React.createElement("div", {
                className: "ft-c-21 uppercase"
            }, c.sn), React.createElement("div", {
                className: "ft-c-16 mg-t-5"
            }, n.n)), React.createElement("td", {
                colSpan: "4",
                className: "t-a-r"
            }, d, e)), i, o))
        },
        _linkToCompetition: function () {
            var e = this.props.data,
                t = e.data,
                a = t.c;
            Action.LoadSite(this._getCompetitionLink(t.sid, a.k))
        },
        _linkToOutRight: function () {
            var e = this.props.data,
                t = e.data,
                a = t.c;
            Action.LoadSite(this._getOutrightLink(t.sid, a.k))
        }
    }), s.inplayPanel = React.createClass({
        displayName: "inplayPanel",
        mixins: [s.Utility.link],
        render: function () {
            var e = this.props.data,
                t = e.data,
                a = e.extraData;
            if (null == t || 0 == t.length) return null;
            var c, n = !0,
                r = t.slice(0, 3).map(function (e) {
                    var t = {
                            data: e,
                            isFirstSport: n,
                            isInplay: !0,
                            sportType: "IP",
                            extraData: a
                        },
                        l = React.createElement(s.sport, {
                            key: "hp_ip_" + e.k,
                            data: t
                        });
                    return n && (n = !1), l
                });
            return t.slice(3).length > 0 && (c = React.createElement(s.inplayPanel.otherSports, {
                data: t.slice(3)
            })), React.createElement("div", {
                className: "radius bg-c-1 pd-6 mg-t-10 in-play"
            }, React.createElement(s.header, {
                isInplay: !0,
                ec: e.ipec
            }), React.createElement("div", null, r, c, React.createElement(s.sport.bottomLink, {
                txt: l.LP_All + " " + l.LP_Inplay,
                count: e.ipec,
                url: this._getAllInplayLink()
            })))
        }
    }), s.inplayPanel.otherSports = React.createClass({
        displayName: "otherSports",
        render: function () {
            for (var e = this.props.data, t = [], a = 0; a < e.length; a += 2) {
                var l = a + 2 < e.length ? e.slice(a, a + 2) : e.slice(a);
                t.push(React.createElement(s.inplayPanel.otherSports.row, {
                    key: "other_" + l[0].k,
                    data: l
                }))
            }
            return React.createElement("table", {
                className: "tb-featureEvent odds-large t-a-c odds-large mg-t-10 topBorder_2px bottomBorder_2px"
            }, React.createElement("colgroup", null, React.createElement("col", {
                className: "col-50Percent"
            }), React.createElement("col", {
                className: "col-50Percent"
            })), React.createElement("tbody", {
                className: "fts-13"
            }, t))
        }
    }), s.inplayPanel.otherSports.row = React.createClass({
        displayName: "row",
        render: function () {
            var e = this.props.data,
                t = React.createElement(s.inplayPanel.otherSports.cell, {
                    data: e[0]
                }),
                a = e[1] ? React.createElement(s.inplayPanel.otherSports.cell, {
                    data: e[1]
                }) : React.createElement("td", null);
            return React.createElement("tr", null, t, a)
        }
    }), s.inplayPanel.otherSports.cell = React.createClass({
        displayName: "cell",
        mixins: [s.Utility.link],
        render: function () {
            var e = this.props.data;
            return React.createElement("td", {
                onClick: this._viewAll.bind(this, this._getSportLink(!0, e.k)),
                className: "viewEvents pd-l-10 pd-t-10 pd-b-6 t-a-l pd-r-10"
            }, React.createElement("div", {
                className: "round-moreBet round bg-c-2 ft-c-3 dsp-iblk fts-15 t-a-c fontWeight-bold float-right"
            }, e.ec), React.createElement("div", {
                className: "fontWeight-bold dsp-iblk ft-c-16 fts-15 mg-t-5 uppercase"
            }, React.createElement("span", {
                className: "sportName"
            }, e.n), React.createElement("div", {
                className: "fontWeight-normal ft-c-25 fts-13 txt-idt-1"
            }, l.HP_ViewEvent)))
        },
        _viewAll: function (e, t) {
            Action.LoadSite(e)
        }
    }), s.prestartPanel = React.createClass({
        displayName: "prestartPanel",
        render: function () {
            var e = this.props.data,
                t = e.extraData,
                a = {
                    data: e.hl,
                    isHidden: !t.isDisplayHL,
                    sportType: "HL",
                    extraData: t
                },
                c = {
                    data: e.ss,
                    isHidden: t.isDisplayHL,
                    sportType: "SS",
                    extraData: t
                };
            return React.createElement("div", {
                className: "radius bg-c-1 pd-6 mg-t-10 in-play"
            }, React.createElement(s.header, {
                isInplay: !1
            }), React.createElement("div", null, React.createElement("table", {
                className: "tb-featureEvent odds-large t-a-c odds-large"
            }, React.createElement("colgroup", null, React.createElement("col", {
                className: "col-50Percent"
            }), React.createElement("col", {
                className: "col-50Percent"
            })), React.createElement("tbody", {
                className: "fts-13"
            }, React.createElement("tr", null, React.createElement("td", {
                className: " pd-t-11 pd-b-10 t-a-r pd-r-15"
            }, React.createElement("div", {
                onClick: this._toggleContent.bind(this, !0),
                className: "dsp-blk t-a-c bt-tab bg-c-41 height-35 ft-c-3 fts-14 singleButton radius" + (t.isDisplayHL ? " actived" : "")
            }, l.HP_Highlights)), React.createElement("td", {
                className: "pd-l-15 pd-t-11 pd-b-10 t-a-l"
            }, React.createElement("div", {
                onClick: this._toggleContent.bind(this, !1),
                className: "dsp-blk t-a-c bt-tab bg-c-41 height-35 ft-c-3 fts-14 singleButton radius" + (t.isDisplayHL ? "" : " actived")
            }, l.LP_StartingSoonMenu))))), React.createElement(s.prestartPanel.sportContent, {
                data: a
            }), React.createElement(s.prestartPanel.sportContent, {
                data: c
            })))
        },
        _toggleContent: function (e, t) {
            var a = this.props.data;
            (e && a.hl.length > 0 || !e && a.ss.length > 0) && Action.Homepage.toggleSportsContent(e)
        }
    }), s.prestartPanel.sportContent = React.createClass({
        displayName: "sportContent",
        render: function () {
            var e, t = this.props.data,
                a = t.data,
                l = t.extraData,
                c = !0,
                n = a.slice(0, 3).map(function (e) {
                    var a = {
                            data: e,
                            isFirstSport: c,
                            isInplay: !1,
                            sportType: t.sportType,
                            extraData: l
                        },
                        n = React.createElement(s.sport, {
                            key: "hp_" + t.sportType + "_" + e.k,
                            data: a
                        });
                    return c && (c = !1), n
                });
            if (a.length > 3) {
                var r = "HL" == t.sportType ? a.slice(3, 7) : _.drop(a, 3);
                e = _.chunk(r, 2).map(function (e) {
                    var a = "oths_" + e[0].k + (null != e[1] ? "_" + e[1].k : "");
                    return React.createElement(s.prestartPanel.otherSports, {
                        key: a,
                        data: e,
                        sportType: t.sportType
                    })
                })
            }
            return React.createElement("div", {
                className: t.isHidden ? "hidden" : ""
            }, n, e)
        }
    }), s.prestartPanel.otherSports = React.createClass({
        displayName: "otherSports",
        mixins: [s.Utility.link],
        render: function () {
            var e = this._createSportLinks(this.props.data, "HL" == this.props.sportType);
            return React.createElement("table", {
                className: "tb-featureEvent odds-large t-a-c odds-large mg-t-10 topBorder_2px"
            }, React.createElement("colgroup", null, React.createElement("col", {
                className: "col-50Percent"
            }), React.createElement("col", {
                className: "col-50Percent"
            })), React.createElement("tbody", {
                className: "fts-13"
            }, e))
        },
        _createSportLinks: function (e, t) {
            var a = e[0],
                l = e[1],
                c = t ? this._createHLSportLinkCells : this._createSSSportLinkCells,
                s = c(a, a.ec, !0),
                n = null == l ? [] : c(l, l.ec, !1),
                r = t ? Math.max(s.length, n.length) : 2,
                i = "oths_" + a.k;
            return null != l && (i += "_" + l.k), this._createLinkRows(s, n, r, i)
        },
        _createLinkRows: function (e, t, a, l) {
            for (var c = [], s = 0; s < a; s++) {
                var n = l + "_" + s;
                c.push(this._createLinkRow(e[s], t[s], n))
            }
            return c
        },
        _createLinkRow: function (e, t, a) {
            var l = null == e ? React.createElement("td", null) : e,
                c = null == t ? React.createElement("td", null) : t;
            return React.createElement("tr", {
                key: a
            }, l, c)
        },
        _createHLSportLinkCells: function (e, t, a) {
            var c = [],
                n = {
                    sid: e.k,
                    n: e.n,
                    en: e.en,
                    tc: e.tec,
                    tmrc: e.tmec
                };
            c.push(React.createElement(s.prestartPanel.otherSports.titleCell, {
                data: n
            }));
            var r;
            if (e.or) r = _.take(e.c, 3);
            else {
                var i;
                if (1 == e.k) {
                    var o, d, m = null != e.tec ? e.tec : null != e.tmec ? e.tmec : 0;
                    o = null != e.tec ? l.HP_TodayMatches : null != e.tmec ? l.HP_TomorrowMatches : null, d = null != e.tec ? this._getFootballTodayLink() : null != e.tmec ? this._getFootballTomorrowLink() : null, null != o && (i = {
                        n: o,
                        ec: m,
                        link: d
                    })
                } else i = {
                    n: l.HP_AllMatches,
                    ec: t,
                    link: this._getSportLink(!1, e.k)
                };
                null != i && c.push(React.createElement(s.sport.linkCell, {
                    data: i,
                    odd: a
                })), r = _.take(e.c, null == i ? 3 : 2)
            }
            var p = this._getLinkCellProps,
                h = r.map(function (t) {
                    return React.createElement(s.sport.linkCell, {
                        data: p(e, t, !0),
                        odd: a
                    })
                });
            return c.concat(h)
        },
        _createSSSportLinkCells: function (e, t, a) {
            var l = [],
                c = {
                    sid: e.k,
                    n: e.n,
                    en: e.en,
                    tc: e.tec,
                    tmrc: e.tmec
                };
            return l.push(React.createElement(s.prestartPanel.otherSports.titleCell, {
                data: c
            })), l.push(React.createElement(s.sport.linkCell, {
                data: this._getLinkCellProps(e, null, !1),
                odd: a
            })), l
        },
        _getLinkCellProps: function (e, t, a) {
            return {
                ec: a ? t.ec : e.ec,
                n: a ? t.n : l.LP_StartingSoonMenu,
                link: a ? this._getCompetitionLink(e.k, t.k) : this._getSportStartingSoonLink(e.k)
            }
        }
    }), s.prestartPanel.otherSports.titleCell = React.createClass({
        displayName: "titleCell",
        mixins: [s.Utility.link],
        render: function () {
            var e = this.props.data;
            return React.createElement("td", {
                className: " pd-l-10 pd-t-10 pd-b-10 t-a-l pd-r-15 clickableTitle",
                onClick: this._clickHeader
            }, React.createElement("div", {
                className: "float-right fts-27 ft-c-26 icon-" + e.sid
            }), React.createElement("div", {
                className: "fontWeight-bold dsp-iblk dark ft-c-16 fts-15 mg-t-5 uppercase"
            }, e.n))
        },
        _clickHeader: function () {
            var e = this.props.data,
                t = VIEW.PRESTART,
                a = {
                    sid: e.sid,
                    sen: e.en.replace(/\s/g, "-")
                };
            1 == e.sid && (a.tc = e.tc, a.tmrc = e.tmrc), Action.LeftPanel.sport(a, t)
        }
    }), s.header = React.createClass({
        displayName: "header",
        mixins: [s.Utility.link],
        render: function () {
            var e, t, a = this.props.isInplay;
            return a ? (e = React.createElement("div", {
                className: "round-moreBet round bg-c-2 ft-c-3 dsp-iblk float-right fts-15 t-a-c fontWeight-bold"
            }, this.props.ec), t = l.LP_Inplay) : t = this.props.isEPM ? l.EPM.EPM : l.MyAcc_Sports, React.createElement("div", {
                className: "featureEvent-header"
            }, React.createElement("div", {
                className: "bg-c-10 radius ft-c-14 fts-16 pd-t-15 pd-b-13 lht-0p8 fontWeight-bold pd-r-13 pd-l-10" + (a ? " inplayHeader" : ""),
                onClick: this._clickHeader
            }, e, t.toUpperCase()))
        },
        _clickHeader: function () {
            this.props.isInplay && Action.LoadSite(this._getAllInplayLink())
        }
    }), s.sport = React.createClass({
        displayName: "sport",
        mixins: [s.Utility.link, s.Utility.score],
        render: function () {
            var e = this.props.data,
                t = e.data,
                a = e.extraData,
                c = "tb-featureEvent odds-large t-a-c odds-large mg-t-10";
            e.isFirstSport || (c += " topBorder_2px"), e.isInplay && 2 == t.k && (c += " tridigits");
            for (var n = [], r = 0; r < t.c.length; r++) n = n.concat(t.c[r].e);
            var i, o = !0,
                d = e.isInplay,
                m = "1X2" == t.rd || 25 == t.k,
                p = e.sportType,
                h = _.map(_.filter(n, function (e) {
                    return e.ihe
                }), "pk"),
                u = _.map(n, function (e) {
                    var l = e.i[5].split(":")[0];
                    if (d && 1 == t.k && +l.split(":")[0] > window.global.thi) return null;
                    if (_.includes(h, e.k)) return null;
                    var c = this._canDisplayScore(e, t.k, t.cds),
                        n = {
                            data: e,
                            showScore: !!d && c,
                            isFirstEvt: o,
                            isInplay: d,
                            rd: t.rd,
                            sportId: t.k,
                            isNetSports: t.isNetSports,
                            sportType: p,
                            extraData: a,
                            cols: "1X2" == t.rd || 25 == t.k ? 6 : 5
                        },
                        r = React.createElement(s.sport.eventItem, {
                            key: e.k,
                            data: n
                        });
                    return o && (o = !1), r
                }, this);
            switch (p) {
                case "IP":
                    i = React.createElement(s.sport.bottomLink, {
                        txt: l.LP_All + " " + t.n + " " + l.LP_Inplay,
                        count: t.ec,
                        url: this._getSportLink(!0, t.k)
                    });
                    break;
                case "HL":
                    i = React.createElement(s.sport.bottomLinkMultiple, {
                        ec: t.ec,
                        data: t
                    });
                    break;
                case "SS":
                    i = React.createElement(s.sport.bottomLink, {
                        txt: l.LP_All + " " + t.n + " " + l.LP_StartingSoonMenu,
                        count: t.ec,
                        url: this._getSportStartingSoonLink(t.k)
                    })
            }
            var E = {
                isInplay: d,
                isSS: "SS" == p,
                sid: t.k,
                sportName: t.n,
                en: t.en,
                evtCount: t.ec,
                is1X2: m || 14 == t.k,
                url: d ? this._getSportLink(d, t.k) : null,
                isFirstSport: e.isFirstSport
            };
            return 1 == t.k && (E.tc = t.tec, E.tmrc = t.tmec), React.createElement("div", null, React.createElement("table", {
                className: c
            }, React.createElement(s.sport.colgroup, {
                is1X2: "1X2" == t.rd || 14 == t.k || 25 == t.k,
                isInplay: d,
                isns: t.isNetSports
            }), React.createElement(s.sport.sportsHeader, {
                data: E
            }), u), i)
        }
    }), s.sport.colgroup = React.createClass({
        displayName: "colgroup",
        render: function () {
            var e, t = this.props.is1X2;
            this.props.isInplay;
            return t && (e = React.createElement("col", {
                className: "col-fixedodds"
            })), React.createElement("colgroup", null, React.createElement("col", null), React.createElement("col", {
                className: this.props.isns ? "" : "col-fixedodds"
            }), React.createElement("col", {
                className: "col-fixedodds"
            }), e, React.createElement("col", {
                className: "col-fixedodds"
            }), React.createElement("col", {
                className: "col-fixed51"
            }))
        }
    }), s.sport.sportsHeader = React.createClass({
        displayName: "sportsHeader",
        mixins: [s.Utility.link],
        render: function () {
            var e, t = this.props.data;
            t.is1X2 && (e = React.createElement("th", {
                className: "fts-12 ft-c-60 " + (t.isFirstSport ? "" : "pd-t-10")
            }, "X"));
            var a;
            return t.isInplay || (a = React.createElement("th", {
                className: "t-a-c " + (t.isFirstSport ? "" : "pd-t-10")
            }, React.createElement("div", {
                className: "icon-" + t.sid + " fts-27 ft-c-26"
            }))), React.createElement("thead", null, React.createElement("tr", {
                className: "fontWeight-bold ft-c-16 fts-15 moreBet1x2 " + (t.isFirstSport ? "" : "pd-t-10"),
                onClick: this._clickHeader
            }, React.createElement("th", {
                className: "t-a-l pd-l-10 sportName uppercase " + (t.isFirstSport ? "" : "pd-t-10"),
                colSpan: "2"
            }, t.sportName), React.createElement("th", {
                className: "fts-12 ft-c-60 " + (t.isFirstSport ? "" : "pd-t-10")
            }, "1"), e, React.createElement("th", {
                className: "fts-12 ft-c-60 " + (t.isFirstSport ? "" : "pd-t-10")
            }, "2"), a, void 0))
        },
        _clickHeader: function () {
            var e = this.props.data,
                t = e.isInplay ? VIEW.INPLAY : e.isSS ? VIEW.STARTINGSOON : VIEW.PRESTART,
                a = {
                    sid: e.sid,
                    sen: e.en.replace(/\s/g, "-")
                };
            1 == a.sid && (a.tc = e.tc, a.tmrc = e.tmrc), Action.LeftPanel.sport(a, t)
        },
        _showSportAllInplay: function () {
            var e = this.props.data;
            e.isInplay && Action.LoadSite(e.url)
        }
    }), s.sport.eventItem = React.createClass({
        displayName: "eventItem",
        mixins: [s.Utility.odds, s.Utility.link, s.Utility.pnc, s.Utility.naming],
        render: function () {
            var e = this.props.data,
                t = e.sportId,
                a = e.data,
                c = e.isInplay,
                n = (e.extraData, "fts-13 selection");
            e.isFirstEvt || (n += " topBorder");
            var r;
            this._displayChildTag(a.cei.ctid) && (r = React.createElement("tr", {
                className: "fontWeight-bold ft-c-16 fts-15"
            }, React.createElement("td", {
                className: "t-a-l pd-l-10" + (e.isFirstEvt ? "" : " topBorder"),
                colSpan: "2"
            }), React.createElement("td", {
                colSpan: "3",
                className: "ft-c-5 fontWeight-normal fts-12 pd-t-10" + (e.isFirstEvt ? "" : " topBorder")
            }, this._getChildTag(a.cei.ctid))));
            var i = e.rd,
                d = "1X2" == i || 25 == e.sportId || 14 == e.sportId,
                m = e.sportType,
                p = e.showScore,
                h = e.isNetSports;
            4 != t && 14 != t || (p = "True" == a.i[38], 4 == t && p && a.sb);
            var u = {
                hn: a.i[0],
                an: a.i[1]
            };
            p && (u.hs = a.i[10], u.as = a.i[11]), "HDP" == i && a.o && a.o.ah && (d ? (u.hb = !1, u.ab = !1) : (u.hb = this._needBlackTeamName(a.o.ah[1]), u.ab = this._needBlackTeamName(a.o.ah[3])));
            var E;
            h && c && (E = "0" != a.i[37] ? React.createElement(s.sport.score.netSport, {
                data: {
                    sb: a.sb,
                    sid: t,
                    eid: a.k,
                    topBorder: !e.isFirstEvt && null == r
                }
            }) : React.createElement("td", {
                className: "ft-c-16 t-a-r" + (e.isFirstEvt ? "" : " topBorder")
            }, React.createElement("div", {
                className: "pd-r-10"
            }, l.LiveText)));
            var R;
            4 == t && c && (i = "HDP", R = "0" != a.i[37] && a.sb ? React.createElement("td", {
                className: "ft-c-59 t-a-c"
            }, React.createElement(s.sport.baseBallPeriod, {
                showinInplay: !0,
                hasTV: !1,
                data: {
                    cp: a.sb.cp,
                    s: a.sb.s
                }
            })) : React.createElement("td", {
                className: "ft-c-16 t-a-r" + (e.isFirstEvt ? "" : " topBorder")
            }, React.createElement("div", {
                className: "pd-r-10"
            }, l.LiveText)));
            var g;
            21 == t && c && (g = a.i[37] > 0 ? React.createElement("td", {
                className: "ft-c-23 t-a-c" + (e.isFirstEvt ? "" : " topBorder")
            }, React.createElement("div", {
                className: ""
            }, this._getBestOfLocalization(a.i[37]))) : React.createElement("td", {
                className: "ft-c-16 t-a-r" + (e.isFirstEvt ? "" : " topBorder")
            }, React.createElement("div", {
                className: "pd-r-10"
            }, l.LiveText)));
            var f = this._getOddsByRegion(i, a, e.sportId),
                v = [],
                N = "pd-t-10 pd-b-10" + (e.isFirstEvt || null != r ? "" : " topBorder");
            if (null == f) v.push(React.createElement("td", {
                key: a.k + "_empty1",
                className: N
            }, React.createElement(s.sport.oddsEmpty, null))), v.push(React.createElement("td", {
                key: a.k + "_empty2",
                className: N
            }, React.createElement(s.sport.oddsEmpty, null))), d && v.push(React.createElement("td", {
                key: a.k + "_empty3",
                rowSpan: "2",
                className: N
            }, React.createElement(s.sport.oddsEmpty, null)));
            else {
                var b = (a.i[10], a.i[11], this._getBaseOddsProp);
                _.forEach(f, function (e, t) {
                    if (e)
                        if (0 == e.odds) v.push(React.createElement("td", {
                            key: e.sid,
                            className: N
                        }, React.createElement(s.sport.oddsLock, null)));
                        else {
                            var l = _.assign(b(a, c), e);
                            v.push(React.createElement("td", {
                                key: e.sid,
                                className: N
                            }, React.createElement(s.sport.odds, {
                                data: l
                            })))
                        }
                    else v.push(React.createElement("td", {
                        key: a.k + "_empty2",
                        className: N
                    }, React.createElement(s.sport.oddsEmpty, null)))
                })
            }
            var y, k = {
                    morebetcount: a.i[32],
                    url: this._getMorebetLink(a.cei.ctid == o.pacType.par ? a.k : a.pk, c ? VIEW.INPLAY : VIEW.PRESTART, a.i[36]),
                    isMin: !0
                },
                P = React.createElement(s.sport.morebet, {
                    data: k
                }),
                S = {
                    isInplay: c,
                    topBorder: !e.isFirstEvt && null == r,
                    sid: t
                };
            if (c) {
                if (S.showScore = p, S.period = a.i[31], S.time = HP_Store.initTimerString(a.i[5]), 18 == t && null != a.sb && (a.sb.cp = 13 == a.i[37] ? "i1" : a.sb.cp, S.period = a.sb.cp, null != a.sb.ps && a.sb.ps.length > 0)) {
                    var M = _.filter(a.sb.ps, "p", a.sb.cp)[0];
                    S.h = "1" == a.sb.s ? M.h : M.a, S.a = "1" == a.sb.s ? M.hw : M.aw
                }
            } else S.edt = a.edt, "SS" == m ? (S.isSS = !0, S.mts = a.mts) : S.isSS = !1, null != a.o && null != a.o.eps && null != a.o.eps.o && a.o.eps.o.length > 0 && (y = React.createElement("tr", null, React.createElement("td", {
                colSpan: e.cols
            }, React.createElement(s.secondaryFeatureEvent.eps, {
                pdb: !0,
                url: k.url
            }))));
            var w;
            return h || (w = React.createElement(s.sport.periodAndTime, {
                data: S
            })), (R || g) && (w = null), React.createElement("tbody", {
                className: "hovertby fts-13 selection cr-pointer"
            }, r, React.createElement("tr", null, React.createElement("td", {
                className: "t-a-l pd-l-10" + (e.isFirstEvt || null != r ? "" : " topBorder"),
                onClick: this._gotoAMPage.bind(this, k.url)
            }, React.createElement(s.sport.scoreAndTeamName, {
                data: u
            })), w, E, R, g, v, React.createElement("td", {
                className: "t-a-r" + (e.isFirstEvt || null != r ? "" : " topBorder")
            }, P)), y)
        },
        _gotoAMPage: function (e) {
            Action.LoadSite(e)
        }
    }), s.sport.scoreAndTeamName = React.createClass({
        displayName: "scoreAndTeamName",
        render: function () {
            var e, t, a = this.props.data;
            return null != a.hs && (e = React.createElement("td", {
                className: "ft-c-16 score"
            }, a.hs)), null != a.as && (t = React.createElement("td", {
                className: "ft-c-16 score"
            }, a.as)), React.createElement("table", {
                className: "lht-1p4"
            }, React.createElement("tbody", null, React.createElement("tr", {
                className: a.hb ? "home" : ""
            }, e, React.createElement("td", {
                className: null != e ? " pd-l-10" : ""
            }, React.createElement(s.sport.team, {
                data: {
                    black: a.hb,
                    n: a.hn,
                    url: a.url
                }
            }))), React.createElement("tr", {
                className: a.ab ? "home" : ""
            }, t, React.createElement("td", {
                className: null != t ? " pd-l-10" : ""
            }, React.createElement(s.sport.team, {
                data: {
                    black: a.ab,
                    n: a.an,
                    url: a.url
                }
            })))))
        }
    }), s.sport.score = React.createClass({
        displayName: "score",
        render: function () {
            return React.createElement("td", {
                className: "t-a-l pd-l-10 ft-c-16"
            }, React.createElement("div", {
                className: "pd-t-1 pd-b-3"
            }, this.props.score))
        }
    }), s.sport.score.netSport = React.createClass({
        displayName: "netSport",
        render: function () {
            var e = this.props.data,
                t = e.sb,
                a = e.sid,
                c = e.eid,
                n = [];
            if (null == t) return React.createElement("td", {
                className: "ft-c-16 t-a-r" + (e.topBorder ? " topBorder" : " ")
            }, React.createElement("div", {
                className: "pd-r-10"
            }, l.LiveText));
            if (3 == a)
                for (var r = 0; r < t.ps.length; r++) {
                    var i = c + "_ns_" + r;
                    n.push(React.createElement(s.sport.score.netSport.scoreItem, {
                        key: i,
                        data: t.ps[r]
                    }))
                } else {
                    var i = c + "_ns_ft";
                    n.push(React.createElement(s.sport.score.netSport.scoreItem, {
                        key: i,
                        data: t.ft
                    })), i = c + "_ns_c", n.push(React.createElement(s.sport.score.netSport.scoreItem, {
                        key: i,
                        data: t.ps.length > 0 ? t.ps[0] : null
                    }))
                }
            return React.createElement("td", {
                className: "ft-c-23 t-a-r" + (e.topBorder ? " topBorder" : ""),
                rowSpan: "2"
            }, n)
        }
    }), s.sport.score.netSport.scoreItem = React.createClass({
        displayName: "scoreItem",
        render: function () {
            var e = this.props.data;
            return null == e ? React.createElement("div", null) : React.createElement("div", {
                className: "dsp-iblk scoreRow" + (e.ic ? " ft-c-16" : "")
            }, React.createElement("div", null, e.h), React.createElement("div", null, e.a))
        }
    }), s.sport.team = React.createClass({
        displayName: "team",
        render: function () {
            var e = this.props.data;
            return React.createElement("div", {
                className: "ft-c-" + (e.black ? 4 : 25)
            }, e.n)
        }
    }), s.sport.periodAndTime = React.createClass({
        displayName: "periodAndTime",
        mixins: [s.Utility.timer],
        render: function () {
            var e, t, a, c, n, r = this.props.data;
            if (r.isInplay) r.showScore ? (e = React.createElement("div", {
                title: this._getLongPeriod(r.period)
            }, this._getShortPeriod(r.period)), r.time && "" != r.time && (t = 2 == r.sid ? React.createElement("div", null, r.time) : 14 == r.sid ? React.createElement("div", null, "" != r.time ? r.time.split(":")[0] + "'" : r.time) : React.createElement(s.sport.iptime, {
                canTick: utility.canTick(r.sid),
                data: {
                    class: "",
                    t: r.time
                }
            }))) : 18 == r.sid ? (r.period && (e = React.createElement("div", null, "i1" == r.period ? l.Innings1 : l.Innings2)), null != r.h && null != r.a && (t = React.createElement("div", {
                className: "ft-c-16"
            }, r.h + "-" + r.a)), null == e && null == t && (a = React.createElement("div", {
                className: "ft-c-16"
            }, l.LiveText))) : 19 != r.sid && (a = React.createElement("div", {
                className: "ft-c-16"
            }, l.LiveText));
            else if (r.isSS) {
                var i = parseFloat(r.mts);
                n = React.createElement("div", {
                    className: "dark ft-c-16"
                }, i + (1 == i ? " " + l.HP_Min : " " + l.HP_Mins))
            } else c = React.createElement("div", null, this._getEventDateForPreStart(r.edt)), n = React.createElement("div", null, this._getEventStartTime(r.edt));
            return React.createElement("td", {
                className: "ft-c-23" + (r.topBorder ? " topBorder" : "")
            }, a, e, t, c, n)
        }
    }), s.sport.baseBallPeriod = React.createClass({
        displayName: "baseBallPeriod",
        render: function () {
            var e = this.props.data;
            return React.createElement("div", {
                className: classNames("dsp-iblk", {
                    firsthalf: "0" == e.s || 2 == e.s,
                    secondhalf: 1 == e.s,
                    "mg-r-6": this.props.hasTV,
                    "ft-c-14": !this.props.showinInplay
                })
            }, React.createElement("span", {
                className: "t-va-m mg-r-4"
            }, e.cp.substr(1)), React.createElement("span", {
                className: "icon-current fts-8 t-va-m"
            }))
        }
    }), s.sport.odds = React.createClass({
        displayName: "odds",
        mixins: [s.Utility.oddsBtn],
        render: function () {
            var e = this.props.data;
            if (!e.odds || 0 == parseFloat(e.odds)) return React.createElement("div", {
                className: "odds-container"
            }, React.createElement("div", {
                className: "OddsWrapper"
            }, React.createElement("span", {
                className: "odds singleOdds locked",
                dangerouslySetInnerHTML: {
                    __html: "&nbsp;"
                }
            })));
            var t, a;
            e.OU && "" != e.OU && (t = React.createElement("span", {
                className: "ou ft-c-24 fontWeight-normal"
            }, e.OU));
            var l = "odds";
            e.odds && e.hdp && (null == e.chdp || "" != e.chdp) ? a = React.createElement("span", {
                className: "upInt dsp-blk ft-c-16 fontWeight-normal"
            }, t, React.createElement("span", null, null == e.chdp ? e.hdp : e.chdp)) : l += " singleOdds", e.odds < 0 && (l += " negOdds");
            var c = null;
            _.includes(e.oddsUp, e.sid) ? c = "oddsUp" : _.includes(e.oddsDown, e.sid) && (c = "oddsDown");
            var s = ["OddsWrapper"];
            return e.isHL && s.push("selected"), null != c && s.push(c), React.createElement("div", {
                className: "odds-container",
                title: e.ttp
            }, React.createElement("div", {
                className: s.join(" ")
            }, React.createElement("span", {
                onClick: this._addSelection,
                className: l
            }, a, e.odds)))
        }
    }), s.sport.oddsLock = React.createClass({
        displayName: "oddsLock",
        render: function () {
            var e = this.props.isRight;
            return React.createElement("div", {
                className: "OddsWrapper" + (e ? " float-right" : "")
            }, React.createElement("span", {
                className: "odds locked singleOdds"
            }, React.createElement("span", {
                className: "icon-Lock",
                style: this.props.style
            }), React.createElement("svg", {
                width: "37",
                height: "20",
                className: "lockedBg"
            }, React.createElement("rect", {
                width: "100%",
                height: "100%",
                fill: "url(#p1)"
            }))))
        }
    }), s.sport.oddsEmpty = React.createClass({
        displayName: "oddsEmpty",
        render: function () {
            return React.createElement("div", {
                className: "OddsWrapper dsp-iblk",
                onClick: this._handleClick
            }, React.createElement("span", {
                className: "odds odds-empty"
            }))
        },
        _handleClick: function (e) {
            e.preventDefault(), e.stopPropagation()
        }
    }), s.sport.oddsEmptyWithSpace = React.createClass({
        displayName: "oddsEmptyWithSpace",
        render: function () {
            return React.createElement("div", {
                className: "OddsWrapper dsp-iblk",
                onClick: this._handleClick
            }, React.createElement("span", {
                className: "odds odds-empty odds-no-hover"
            }, " "))
        },
        _handleClick: function (e) {
            e.preventDefault(), e.stopPropagation()
        }
    }), s.sport.morebet = React.createClass({
        displayName: "morebet",
        render: function () {
            var e = this.props.data,
                t = ["t-a-c", "bt-moreBet", "bg-c-41", "radius", "ft-c-3 ", "fts-12"];
            return null != e.height ? t.push("height-" + e.height) : t.push("height-40"), e.isMin && t.push("bt-moreBet-min"), null == e.morebetcount && t.push("empty"), 50 == e.height && t.push("lht-50"), React.createElement("div", {
                title: l.OP_ViewAllMarkets,
                onClick: this._clickMoreBet.bind(this, e.url),
                className: t.join(" ")
            }, e.morebetcount, React.createElement("span", {
                className: "icon-ArrowMoreBets"
            }))
        },
        _clickMoreBet: function (e, t) {
            Action.LoadSite(e)
        }
    }), s.sport.iptime = React.createClass({
        displayName: "iptime",
        mixins: [s.Utility.timer],
        getInitialState: function () {
            return this._defaultState()
        },
        componentDidMount: function () {
            this.props.canTick && Timer.store.Timer.listen(this._tick)
        },
        render: function () {
            var e = this.props.data;
            return React.createElement("span", {
                className: e.class
            }, this._getIPTime(e.t, this.state.elapsed))
        },
        _defaultState: function () {
            return {
                elapsed: 0
            }
        },
        _tick: function (e) {
            this.state.elapsed = e.tick, this.setState(this.state)
        }
    }), s.sport.bottomLink = React.createClass({
        displayName: "bottomLink",
        render: function () {
            return React.createElement("div", {
                onClick: this._handleClick.bind(this, this.props.url),
                className: "mg-t-6 t-a-c bt-moreBet-enlarge bg-c-27 height-40 radius ft-c-21 fts-13 pos-relative"
            }, React.createElement("span", {
                className: "bg-c-11 height-40 float-right ft-c-25 radius bt-moreBet-arrowContainer"
            }, this.props.count, React.createElement("span", {
                className: "icon-ArrowMoreBets"
            })), this.props.txt)
        },
        _handleClick: function (e, t) {
            Action.LoadSite(e)
        }
    }), s.sport.bottomLinkMultiple = React.createClass({
        displayName: "bottomLinkMultiple",
        mixins: [s.Utility.link],
        render: function () {
            var e = this.props.data,
                t = this.props.ec;
            if (0 == e.c.length) return null;
            var a = e.or ? 4 : 3,
                c = e.c.slice(0, a),
                n = this._createLinkCellProps,
                r = c.map(function (t) {
                    return n(e.k, t)
                }),
                i = null;
            if (!e.or)
                if (1 == e.k) {
                    var o, d, m = null != e.tec ? e.tec : null != e.tmec ? e.tmec : 0;
                    o = null != e.tec ? l.HP_TodayMatches : null != e.tmec ? l.HP_TomorrowMatches : null, d = null != e.tec ? this._getFootballTodayLink() : null != e.tmec ? this._getFootballTomorrowLink() : null, null != o && (i = {
                        n: o,
                        ec: m,
                        link: d
                    })
                } else i = {
                    n: l.HP_AllMatches,
                    ec: t,
                    link: this._getSportLink(!1, e.k)
                };
            null != i && (r = [i].concat(r)), r = _.chunk(r, 2);
            for (var p = [], h = 0; h < r.length; h++) {
                var u;
                r[h].length > 1 && (u = React.createElement(s.sport.linkCell, {
                    data: r[h][1]
                })), p.push(React.createElement("tr", {
                    key: "blm_" + e.k + "_" + h
                }, React.createElement(s.sport.linkCell, {
                    data: r[h][0],
                    odd: !0
                }), u)), u = null
            }
            return React.createElement("table", {
                className: "tb-featureEvent odds-large t-a-c odds-large"
            }, React.createElement("colgroup", null, React.createElement("col", {
                className: "col-50Percent"
            }), React.createElement("col", {
                className: "col-50Percent"
            })), React.createElement("tbody", {
                className: "fts-13"
            }, p))
        },
        _createLinkCellProps: function (e, t) {
            return {
                n: t.n,
                ec: t.ec,
                link: this._getCompetitionLink(e, t.k)
            }
        }
    }), s.sport.linkCell = React.createClass({
        displayName: "linkCell",
        render: function () {
            var e = this.props.data;
            return React.createElement("td", {
                className: "pd-t-6" + (this.props.odd ? " pd-r-3" : " pd-l-3")
            }, React.createElement("div", {
                className: "dsp-tb ",
                onClick: this._handleClick
            }, React.createElement("div", {
                className: "t-va-m pd-l-10 t-a-l bt-moreBet-enlarge bg-c-27 height-40 radius ft-c-25 fts-12 dsp-tbcl  pd-r-60 pos-relative"
            }, React.createElement("span", {
                className: " bg-c-11 height-40 float-right ft-c-25 radius bt-moreBet-arrowContainer t-a-c pos-absolute fontWeight-bold"
            }, e.ec, React.createElement("span", {
                className: "icon-ArrowMoreBets"
            })), React.createElement("table", {
                className: "width-100p height-40 lht-1e"
            }, React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", null, e.n)))))))
        },
        _handleClick: function () {
            Action.LoadSite(this.props.data.link)
        }
    }), s.epmSection = React.createClass({
        displayName: "epmSection",
        render: function () {
            var e = this,
                t = this.props.data,
                a = [],
                l = [];
            return t.map(function (e, t) {
                t < 3 ? a.push(e) : l.push(e)
            }), React.createElement("div", {
                className: "radius bg-c-1 pd-6 mg-t-10 in-play"
            }, React.createElement(s.header, {
                isInplay: !1,
                isEPM: !0
            }), React.createElement("div", null, a.map(function (t, a) {
                var l = {
                    sport: t,
                    extraData: e.props.extraData
                };
                return React.createElement(s.epmSection.sport, {
                    key: "epmsec_sport_" + t.k,
                    data: l,
                    sportIndex: a
                })
            })), l.length > 0 ? React.createElement(s.epmSection.otherSports, {
                sports: l
            }) : null)
        },
        _toggleContent: function (e, t) {
            var a = this.props.data;
            (e && a.hl.length > 0 || !e && a.ss.length > 0) && Action.Homepage.toggleSportsContent(e)
        }
    }), s.epmSection.otherSports = React.createClass({
        displayName: "otherSports",
        render: function () {
            var e = this.props.sports,
                t = [],
                a = [];
            e.map(function (e, l) {
                l % 2 == 0 ? t.push(e) : a.push(e)
            });
            for (var c = t.length >= a.length ? t.length : a.length, n = [], r = 0; r < c; r++) n.push(React.createElement("tr", null, React.createElement(s.epmSection.otherSports.sportBox, {
                sport: t[r]
            }), React.createElement(s.epmSection.otherSports.sportBox, {
                sport: a[r]
            })));
            return React.createElement("div", {
                className: "pd-t-5"
            }, React.createElement("table", {
                className: "tb-featureEvent odds-large t-a-c odds-large topBorder_2px"
            }, React.createElement("colgroup", null, React.createElement("col", {
                className: "col-50Percent"
            }), React.createElement("col", {
                className: "col-50Percent"
            })), React.createElement("thead", null, React.createElement("tr", {
                className: "ft-c-16 fts-15"
            }, React.createElement("th", {
                className: "t-a-l pd-l-10 pd-t-15 pd-b-10 sportName",
                colSpan: "3"
            }, l.LP_OtherSports))), n))
        }
    }), s.epmSection.otherSports.sportBox = React.createClass({
        displayName: "sportBox",
        render: function () {
            var e = this,
                t = this.props.sport;
            if (!t) return React.createElement("td", {
                className: "pd-t-6 pd-r-3"
            });
            var a = (t.k, t.n);
            return React.createElement("td", {
                className: "pd-t-6 pd-r-3",
                onClick: function () {
                    return e._handleClick()
                }
            }, React.createElement("div", {
                className: "dsp-tb "
            }, React.createElement("div", {
                className: "t-va-m pd-l-10 t-a-l bt-moreBet-enlarge bg-c-27 height-40 radius ft-c-25 fts-12 dsp-tbcl  pd-r-60 pos-relative"
            }, React.createElement("span", {
                className: " bg-c-11 height-40 float-right ft-c-25 radius bt-moreBet-arrowContainer t-a-c pos-absolute fontWeight-bold"
            }, React.createElement("span", {
                className: "float-right fts-18 ft-c-25 icon-8 pd-r-15 pd-t-10"
            })), React.createElement("table", {
                className: "width-100p height-40 lht-1e"
            }, React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", {
                className: "fts-13 fontWeight-bold uppercase"
            }, a)))))))
        },
        _handleClick: function () {
            var e = Router.epm(this.props.sport.k);
            Action.LoadSite(e)
        }
    }), s.epmSection.sport = React.createClass({
        displayName: "sport",
        render: function () {
            var e = this.props.data,
                t = e.sport,
                a = e.extraData,
                c = t.c,
                n = t.en,
                r = t.k,
                i = t.n,
                o = t.ec,
                d = this.props.sportIndex,
                m = 0 === d ? 6 : 4,
                p = 0,
                h = c.filter(function (e, t) {
                    var a = !1;
                    return a = !(p >= m), e.e.map(function (e) {
                        e.show = !(p >= m);
                        var t = e["e-o"];
                        t && t.length > 0 && (t.map(function (e) {
                            return p++, e.mlIndex = p, e
                        }), e["e-o"] = t.filter(function (e) {
                            return e.mlIndex <= m
                        }))
                    }), e.e = e.e.filter(function (e) {
                        return e.show
                    }), a
                }),
                u = h.map(function (e) {
                    var t = {
                        comp: e,
                        extraData: a
                    };
                    return React.createElement(s.epmSection.competition, {
                        key: "epmsec_comp_" + e.k,
                        data: t,
                        sportId: r
                    })
                });
            return React.createElement("div", {
                className: 0 !== d ? " topBorder pd-t-5" : ""
            }, React.createElement("table", {
                className: "tb-featureEvent odds-large t-a-c odds-large mg-t-10"
            }, React.createElement("colgroup", null, React.createElement("col", null), React.createElement("col", null), React.createElement("col", {
                className: "col-fixed30"
            }), React.createElement("col", {
                className: "col-fixedodds"
            }), React.createElement("col", {
                className: "col-fixedodds"
            }), React.createElement("col", {
                className: "col-fixed51"
            })), React.createElement("thead", null, React.createElement("tr", {
                className: "ft-c-16 fts-15"
            }, React.createElement("th", {
                className: "t-a-l pd-l-10 sportName",
                colSpan: "3"
            }, i), React.createElement("th", {
                className: "fts-12 ft-c-16"
            }, l.OP_Was), React.createElement("th", {
                className: "fts-12 ft-c-25"
            }, l.OP_Now), React.createElement("th", {
                className: "t-a-c"
            }, React.createElement("div", {
                className: "fts-27 ft-c-26 icon-" + r
            })))), u), React.createElement(s.sport.bottomLink, {
                txt: l.EPM.EPM_Sport_Available.replace("{sport}", i),
                count: o,
                url: Router.epm(n)
            }))
        }
    }), s.epmSection.competition = React.createClass({
        displayName: "competition",
        mixins: [s.Utility.odds],
        render: function () {
            var e = this,
                t = this.props.sportId,
                a = this.props.data,
                l = a.comp,
                c = a.extraData,
                s = l.e,
                n = l.n,
                r = l.k,
                i = s.map(function (a, l) {
                    var s = {
                        epmLink: Router.epm(t, r),
                        evt: a,
                        evtIndex: l,
                        extraData: c
                    };
                    return e._getEventContent(s)
                });
            return React.createElement("tbody", {
                className: "fts-13"
            }, React.createElement("tr", {
                className: "ft-c-16 fts-13"
            }, React.createElement("th", {
                className: "t-a-l pd-l-10 sportName",
                colSpan: "6"
            }, n)), i)
        },
        _getEventContent: function (e) {
            var t = this,
                a = e.evt,
                l = e.epmLink,
                n = e.evtIndex,
                r = e.extraData,
                i = a["e-o"],
                o = (a.iscc, a.k),
                d = [];
            return i.map(function (e, i) {
                var m = {
                    isFirst: 0 === n && 0 === i,
                    name: e.mn
                };
                d.push(React.createElement(s.epmSection.marketlineHeader, c({
                    key: "epmsec_" + o + "_ml_" + e.mn + "_" + i
                }, m))), e.o && e.o.map(function (e) {
                    var c = t._getEpmOddsItem(a, e),
                        n = _.assign(t._getBaseOddsProp(a, !1), c[0]),
                        i = {
                            sel: e,
                            extraData: r
                        };
                    d.push(React.createElement(s.epmSection.selectionRow, {
                        key: "epmsec_" + o + "_sel_" + e.id,
                        data: i,
                        oddsProps: n,
                        epmLink: l
                    }))
                })
            }), d
        }
    }), s.epmSection.marketlineHeader = React.createClass({
        displayName: "marketlineHeader",
        render: function () {
            var e = this.props,
                t = e.isFirst,
                a = e.name;
            return React.createElement("tr", {
                className: "ft-c-23 fts-13"
            }, React.createElement("th", {
                className: "t-a-l pd-l-10" + (t ? "" : " topBorder pd-t-5"),
                colSpan: "6"
            }, a))
        }
    }), s.epmSection.selectionRow = React.createClass({
        displayName: "selectionRow",
        getInitialState: function () {
            return {
                showInfo: !1
            }
        },
        render: function () {
            var e = this,
                t = this.props.epmLink,
                a = this.props.data,
                l = a.sel,
                c = (a.extraData, l.dt),
                n = l.id,
                r = l.lo,
                i = (l.o, l.ril),
                o = l.dil,
                d = l.iscc,
                m = this.state.showInfo,
                p = [],
                h = [];
            return o && o.map(function (t, a) {
                var l = (a + 1) % 2 == 0,
                    s = e._getEpmDisplayName(c, t);
                l ? h.push({
                    originName: t,
                    dislpayName: s
                }) : p.push({
                    originName: t,
                    dislpayName: s
                })
            }), React.createElement("tr", {
                className: "tr-outright selection"
            }, React.createElement("td", {
                className: "pd-0 pd-l-10 ft-c-25 t-a-l"
            }, p.map(function (e, t) {
                var a = e.originName,
                    l = e.dislpayName;
                return React.createElement("div", {
                    key: "epmsec_sel_" + n + "_left_" + a + "_" + t,
                    className: "rightBorder_lv4 pd-r-10"
                }, l)
            })), React.createElement("td", {
                className: "pd-0 pd-l-10 ft-c-25 t-a-l"
            }, h.map(function (e, t) {
                var a = e.originName,
                    l = e.dislpayName;
                return React.createElement("div", {
                    key: "epmsec_sel_" + n + "_right_" + a + "_" + t,
                    className: "pd-r-10"
                }, " ", l)
            }), p.length !== h.length ? React.createElement("div", {
                className: "pd-t-12"
            }) : null), React.createElement("td", {
                className: "pd-0 t-a-c epm tb-featureEvent"
            }, React.createElement("span", {
                className: "icon icon-i-s ft-c-22 bg-c-57",
                onMouseEnter: function () {
                    return e._handleMouseEvent(!0)
                },
                onMouseLeave: function () {
                    return e._handleMouseEvent(!1)
                }
            }), m ? React.createElement("div", {
                className: "overlayContainer selected pos-absolute"
            }, React.createElement("div", {
                className: "tickContainer"
            }, React.createElement("span", {
                className: "tick"
            })), React.createElement("div", {
                className: "overlay"
            }, React.createElement("div", {
                className: "br-c-1 bg-c-55 fts-13"
            }, i && i.map(function (t, a) {
                var l = e._getReferDetailName(t.isor, t.rn);
                return [React.createElement("div", {
                    key: "epmsec_" + n + "_ril_" + t.sn + "_" + a,
                    className: "bold ft-c-25 t-a-l" + (0 !== a ? " pd-t-5" : "")
                }, t.sn), d ? React.createElement("div", {
                    key: "epmsec_" + n + "_ril_" + t.cn + "_" + a,
                    className: "ft-c-22 t-a-l"
                }, React.createElement("span", {
                    className: "mg-r-6"
                }, t.cn)) : null, React.createElement("div", {
                    className: "ft-c-22 t-a-l",
                    key: "epmsec_" + n + "_ril_" + t.rn + "_" + a
                }, l, React.createElement("span", {
                    className: "mg-r-5"
                }, ","), React.createElement("span", {
                    className: "mg-r-10"
                }, t.rd), React.createElement("span", null, t.rt))]
            })))) : null), React.createElement("td", {
                className: "pd-0 t-a-c"
            }, React.createElement("span", {
                className: "fontWeight-bold strike"
            }, r)), React.createElement("td", {
                className: "pd-t-10 pd-b-10"
            }, React.createElement(s.sport.odds, {
                data: this.props.oddsProps
            })), React.createElement("td", {
                className: "t-a-r pd-t-10 pd-b-10",
                onClick: function () {
                    return Action.LoadSite(t)
                }
            }, React.createElement(s.moreBetEmptyBtn, null)))
        },
        _getEpmDisplayName: function (e, t) {
            arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
            switch (e) {
                case 1:
                    var a = t.split("-v-");
                    return a.length < 2 ? null : React.createElement("div", null, a[0], React.createElement("span", {
                        className: "ft-c-16 mg-r-6 mg-l-6"
                    }, "v"), a[1]);
                case 2:
                case 3:
                    return t
            }
        },
        _getReferDetailName: function (e, t) {
            if (e) return React.createElement("span", {
                className: "mg-r-6"
            }, t);
            var a = t.split("-v-");
            return a.length < 2 ? null : [React.createElement("span", {
                className: "mg-r-6"
            }, a[0]), React.createElement("span", {
                className: "mg-r-6 ft-c-16"
            }, "v"), React.createElement("span", null, a[1])]
        },
        _handleMouseEvent: function (e) {
            this.setState({
                showInfo: e
            })
        }
    }), s.moreBetEmptyBtn = React.createClass({
        displayName: "moreBetEmptyBtn",
        shouldComponentUpdate: function () {
            return !1
        },
        render: function () {
            return React.createElement("div", {
                className: "t-a-c bg-c-41 radius ft-c-3 bt-moreBet bt-moreBet-min"
            }, React.createElement("span", {
                className: "icon-ArrowMoreBets empty"
            }))
        }
    }), e.exports = s
}, function (e, t, a) {
    "use strict";
    (function (t) {
        var c = Object.assign || function (e) {
                for (var t = 1; t < arguments.length; t++) {
                    var a = arguments[t];
                    for (var l in a) Object.prototype.hasOwnProperty.call(a, l) && (e[l] = a[l])
                }
                return e
            },
            s = a(0),
            n = a(1),
            r = React.createClass({
                displayName: "RightPanel",
                getInitialState: function () {
                    return this._getDataFromStore()
                },
                componentDidMount: function () {
                    RP_Store.addUpdateListener(this._onUpdate)
                },
                componentDidUpdate: function () {
                    this._updateScrollBar()
                },
                render: function () {
                    var e, t = this.state,
                        a = this._updateScrollBar,
                        l = this._scrollToAnchor;
                    return e = React.createElement(s, {
                        ref: "scrollbar",
                        h: t.h,
                        always: !0,
                        offset: 17,
                        disable: t.disableScrollbar
                    }, React.createElement(r.liveCentre, {
                        key: "RP_lc",
                        isLarge: t.enlarge,
                        slideTvMenuCallback: this.slideTvMenu
                    }), React.createElement(r.betSlips, {
                        key: "RP_bs",
                        updateScrollBarFN: a,
                        scrollToAnchorFn: l
                    }), React.createElement(r.banner, {
                        key: "RP_bn"
                    })), React.createElement("div", null, React.createElement("aside", {
                        className: t.enlarge ? " enlarge" : ""
                    }, React.createElement("div", {
                        id: "lt-right"
                    }, e)))
                },
                _getDataFromStore: function () {
                    return RP_Store.getData()
                },
                _onUpdate: function () {
                    this.setState(this._getDataFromStore())
                },
                _updateScrollBar: function () {
                    this.refs.scrollbar.update(), this.refs.scrollbar.state.hasScroll ? ($(".betbox").removeClass("noscrollbar"), $("aside").addClass("hasScroll")) : ($(".betbox").addClass("noscrollbar"), $("aside").removeClass("hasScroll"))
                },
                _scrollToAnchor: function () {
                    this.refs.scrollbar.scrollToAnchor()
                }
            });
        r.TopMenu = React.createClass({
            displayName: "TopMenu",
            render: function () {
                var e = this.props.data,
                    t = e.isShowTV,
                    a = this._getAsiaLink(),
                    c = React.createElement("a", {
                        className: "AsianBtn" + (t ? " float-right" : ""),
                        href: a,
                        target: "_top"
                    }, l.SportMenu_SwitchToAsianView, React.createElement("span", {
                        className: "icon-ArrowMoreBets"
                    })),
                    s = t ? React.createElement("div", {
                        className: "aside-title",
                        onClick: this._openTV
                    }, React.createElement("span", {
                        className: "icon icon-TV2"
                    }), e.TVtxt) : null;
                return React.createElement("div", {
                    className: "tvbox"
                }, c, s)
            },
            _getAsiaLink: function () {
                var e = pm.parentHost();
                return "localhost" != document.domain && null != e && "" != e ? e + "/" + window.global.lan + "/asia" : "javascript:void(0)"
            },
            _openTV: function () {
                var e, t = utility.parsePopupInfo("popup-new w810 h584"),
                    a = screen.width / 2 - t.width / 2,
                    l = screen.height / 2 - t.height / 2,
                    c = pm.parentHost();
                e = "localhost" != document.domain && null != c && "" != c ? c + "/" + window.global.lan + "/live-streaming" : "";
                var s = "center=yes,resizable=yes,scrollbars=yes, width=" + t.width + ", height=" + t.height + ",left=" + a + ",top=" + l;
                window.open(e, "stream", s)
            }
        }), r.liveCentre = React.createClass({
            displayName: "liveCentre",
            getInitialState: function () {
                return this._getDataFromStore()
            },
            componentDidMount: function () {
                LC_Store.addUpdateListener(this._onUpdate)
            },
            render: function () {
                var e, t = this.state,
                    a = null;
                return window.global.enableLiveFeed ? (a = React.createElement(r.liveCentre.scoreboard, null), e = React.createElement("div", {
                    className: "live-content noEvents lcw",
                    id: "lcContainer"
                }, React.createElement("div", {
                    id: "noBgMsg",
                    className: "no-events hidden"
                }, l.RP_NoLiveEvents), React.createElement("div", {
                    id: "iframeTarget",
                    className: "hidden"
                }))) : e = React.createElement("div", {
                    className: "live-content noEvents",
                    id: "lcContainer"
                }, React.createElement("div", {
                    id: "noBgMsg",
                    className: "no-events hidden"
                }, l.RP_NoLiveEvents), React.createElement("div", {
                    id: "iframeTarget",
                    className: "hidden"
                }, React.createElement("iframe", {
                    id: "liveCenter",
                    width: "100%",
                    scrolling: "no",
                    frameborder: "0",
                    allowtransparency: "true"
                }))), window.global.enableLiveFeed && !t.showLC && (lcApi.stopLiveCenter(), Action.RightPanel.TV.resetToDefault()), React.createElement("div", {
                    className: "pos-relative" + (t.showLC ? "" : " hidden")
                }, React.createElement(r.liveCentre.tvMenu, {
                    data: t,
                    slideTvMenuCallback: this.slideTvMenu,
                    isLarge: this.props.isLarge,
                    ref: "tvMenu"
                }), React.createElement("div", {
                    className: "live-center"
                }, React.createElement("table", {
                    className: "height-40 width-100p"
                }, React.createElement("colgroup", null, React.createElement("col", null), React.createElement("col", {
                    className: "col-fixed95"
                })), React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", {
                    className: "pd-l-8"
                }, React.createElement("table", null, React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", null, React.createElement("span", {
                    className: "uppercase dsp-iblk t-va-m"
                }, t.i18n.liveCentreTxt)), React.createElement("td", null, React.createElement("span", {
                    className: "iconbox",
                    ref: "infoIcon",
                    onClick: this._toggleInfo
                }, React.createElement("a", {
                    className: "icon icon-i-s"
                }))))))), React.createElement("td", null, React.createElement("div", {
                    className: "toolicon "
                }, React.createElement("span", {
                    className: "TVMenuBtn" + (t.showMenuBtn ? "" : " hidden"),
                    onClick: this._toggleTVMenu,
                    title: t.i18n.tvGuideTxt
                }, React.createElement("a", {
                    className: "icon icon-TVMenu",
                    href: "javascript:void(0)"
                })), React.createElement("span", {
                    className: "LockBtn" + (t.islockBtn ? " active" : ""),
                    onClick: this._toggleLockTv.bind(this, !t.islockBtn),
                    title: l.RP_LockThisEvent
                }, React.createElement("a", {
                    href: "javascript:void(0)",
                    className: "icon icon-Lock"
                })), React.createElement("span", {
                    className: this.props.isLarge ? "MinimizedBtn" : "MaximizedBtn",
                    onClick: this._toggleEnlargeBtn.bind(this, !this.props.isLarge),
                    title: this.props.isLarge ? l.RP_CondensedView : l.RP_EnlargedView
                }, React.createElement("a", {
                    href: "javascript:void(0)",
                    className: "icon " + (this.props.isLarge ? "icon-Minimized" : "icon-Maximize")
                }))))))), React.createElement("div", {
                    className: "dropdown hidden",
                    ref: "info"
                }, React.createElement("div", {
                    className: "title-bar"
                }, l.LC_Info, React.createElement("span", {
                    className: "iconbox removebtn"
                }, React.createElement("a", {
                    onClick: this._toggleInfo.bind(this, !1),
                    className: "icon icon-removeIcon"
                }))), React.createElement("p", {
                    className: "dropdown-content"
                }, t.i18n.info)), React.createElement("div", {
                    style: {
                        clear: "both"
                    }
                })), a, e)
            },
            componentDidUpdate: function () {
                ocomp.setSumitBtnAlign()
            },
            _getDataFromStore: function () {
                return LC_Store.getData()
            },
            _toggleTVMenu: function () {
                Action.RightPanel.TV.hideSportMenu(), Action.RightPanel.TV.hideDateMenu(), Action.RightPanel.TV.toggleTvMenu(!this.state.showMenu), this.slideTvMenu(), this._toggleInfo(!1)
            },
            _toggleLockTv: function (e) {
                Action.RightPanel.TV.toggleLockBtn(e, !0)
            },
            _toggleEnlargeBtn: function (e) {
                Action.RightPanel.resize(e)
            },
            _onUpdate: function () {
                this.setState(this._getDataFromStore())
            },
            _toggleInfo: function (e) {
                var t = this.refs.info.getDOMNode(),
                    a = this.refs.infoIcon.getDOMNode();
                void 0 != e && 0 == e ? ($(t).addClass("hidden"), $(a).removeClass("info")) : ($(t).toggleClass("hidden"), $(a).toggleClass("info"))
            },
            slideTvMenu: function () {
                var e = $(this.refs.tvMenu.getDOMNode());
                e.is(":visible") ? e.slideUp(400) : e.slideDown(400)
            }
        }), r.liveCentre.scoreboard = React.createClass({
            displayName: "scoreboard",
            mixins: [n.Utility.timer],
            getInitialState: function () {
                return this._getDataFromStore()
            },
            componentDidMount: function () {
                LCSB_Store.addUpdateListener(this._onUpdate)
            },
            componentWillUnmount: function () {
                LCSB_Store.removeUpdateListener()
            },
            _getDataFromStore: function () {
                return LCSB_Store.getData()
            },
            _onUpdate: function () {
                this.setState(this._getDataFromStore())
            },
            _getClock: function (e) {
                return "HT" === e.period || "FT" === e.period || "Pens" === e.period ? e.period : "" != e.time ? this._getIPTime(e.time, e.elapsed) : e.time
            },
            render: function () {
                var e = this.state,
                    t = null,
                    a = null,
                    l = null,
                    c = null,
                    s = null,
                    n = null,
                    r = null;
                if (1 == e.sId && (t = null != e.hScore ? React.createElement("span", {
                        className: "number-txt" + ("h" == e.lastScore ? " ft-c-14" : "")
                    }, e.hScore) : null, a = null != e.aScore ? React.createElement("span", {
                        className: "number-txt" + ("a" == e.lastScore ? " ft-c-14" : "")
                    }, e.aScore) : null, l = null != e.hFScore && "" != e.hFScore ? React.createElement("span", {
                        className: "number-txt"
                    }, "(", e.hFScore, ")") : null, c = null != e.aFScore && "" != e.aFScore ? React.createElement("span", {
                        className: "number-txt"
                    }, "(", e.aFScore, ")") : null, s = e.hRedCard && 0 != e.hRedCard ? React.createElement("span", {
                        className: "rdcard"
                    }) : null, n = e.aRedCard && 0 != e.aRedCard ? React.createElement("span", {
                        className: "rdcard second"
                    }) : null, "" != e.period || "" != e.time)) {
                    var i = "ET" == e.period ? React.createElement("span", {
                        className: "dsp-blk"
                    }, e.period) : null;
                    r = React.createElement("table", {
                        className: "right-txt1 fontWeight-bold fts-13 ft-c-14"
                    }, React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", null, i, React.createElement("span", {
                        className: "dsp-blk"
                    }, this._getClock(e))))))
                }
                return React.createElement("div", {
                    className: "LC-content hidden",
                    id: "lcsb"
                }, React.createElement("span", {
                    className: "float-left"
                }, React.createElement("span", {
                    className: "dsp-blk pos-relative"
                }, t, l, React.createElement("span", {
                    className: "ws-nowrap" + (1 == e.sId ? " mg-l-8" : "")
                }, e.hName)), React.createElement("span", {
                    className: "dsp-blk pos-relative"
                }, a, c, React.createElement("span", {
                    className: "ws-nowrap" + (1 == e.sId ? " mg-l-8" : "")
                }, e.aName))), s, n, React.createElement("span", {
                    className: "gradientFadeOut-r"
                }), r)
            }
        }), r.liveCentre.tvMenu = React.createClass({
            displayName: "tvMenu",
            getInitialState: function () {
                return this._getDataFromStore()
            },
            _getDataFromStore: function () {
                return TVMenu_Store.getData()
            },
            componentDidMount: function () {
                TVMenu_Store.addUpdateListener(this._onUpdate)
            },
            _onUpdate: function () {
                this.setState(this._getDataFromStore())
            },
            render: function () {
                var e = [],
                    t = this.state.sportFilter,
                    a = this.state.dateFilter;
                if (this.state.lsData) {
                    var c = 1,
                        n = this.state.playEventId;
                    if (this.state.lsData) {
                        var c = 1,
                            i = this.props.slideTvMenuCallback;
                        e = this.state.lsData.lds.map(function (e) {
                            if (!a || a == e.Ed) return React.createElement(r.liveCentre.tvMenu.menuItemGroup, {
                                key: c++,
                                data: e,
                                sportFilter: t,
                                dateFilter: a,
                                playEventId: n,
                                slideTvMenuCallback: i
                            })
                        })
                    }
                    _.remove(e, _.isUndefined)
                }
                var o = $("#iframeTarget"),
                    d = o.css("height") ? parseInt(o.css("height")) : 0,
                    m = $("#lcContainer");
                0 != d && m.hasClass("hidden") || (d = m.css("height") ? parseInt(m.css("height")) : 0);
                var p;
                return p = React.createElement(s, {
                    h: d - 80,
                    ref: "scrollbar",
                    always: !0,
                    disable: $.GetIEVersion() > 0
                }, e), React.createElement("div", {
                    className: "TVmenu hidden",
                    id: "tvMenu"
                }, React.createElement("div", {
                    className: "title-bar"
                }, this.state.i18n.tvMenuTxt, React.createElement("span", {
                    className: "iconbox removebtn",
                    onClick: this._closeMenu
                }, React.createElement("a", {
                    href: "javascript:void(0)",
                    className: "icon icon-removeIcon"
                }))), React.createElement("ul", {
                    className: "TVmenu-title"
                }, React.createElement("li", {
                    onClick: this._toggleSportMenu
                }, React.createElement("span", {
                    className: "TVmenu-titleName"
                }, t || l.AllSports), React.createElement("span", {
                    className: "icon icon-SortIcon float-right"
                }), React.createElement(r.liveCentre.tvMenu.subSportMenu, {
                    data: this.state,
                    ref: "sportMenu"
                })), React.createElement("li", {
                    onClick: this._toggleDateMenu
                }, React.createElement("span", {
                    className: "TVmenu-titleName"
                }, a || l.AllDate), React.createElement("span", {
                    className: "icon icon-SortIcon float-right"
                }), React.createElement(r.liveCentre.tvMenu.subDateMenu, {
                    data: this.state,
                    ref: "dateMenu"
                }))), React.createElement("div", {
                    className: "tvmenu-row-group hasScroll-2"
                }, p))
            },
            _closeMenu: function () {
                Action.RightPanel.TV.hideSportMenu(), Action.RightPanel.TV.hideDateMenu(), Action.RightPanel.TV.toggleTvMenu(!1), this.props.slideTvMenuCallback()
            },
            _toggleSportMenu: function () {
                Action.RightPanel.TV.toggleSportMenu()
            },
            _toggleDateMenu: function () {
                Action.RightPanel.TV.toggleDateMenu()
            },
            componentDidUpdate: function (e, t) {
                if (void 0 != t.showSportSubMenu && t.showSportSubMenu != this.state.showSportSubMenu) {
                    var a = $(this.refs.sportMenu.getDOMNode());
                    this.state.showSportSubMenu ? a.slideDown(400) : a.slideUp(400)
                }
                if (void 0 != t.showDateSubMenu && t.showDateSubMenu != this.state.showDateSubMenu) {
                    var l = $(this.refs.dateMenu.getDOMNode());
                    this.state.showDateSubMenu ? l.slideDown(400) : l.slideUp(400)
                }
                this.refs.scrollbar.update()
            }
        }), r.liveCentre.tvMenu.subSportMenu = React.createClass({
            displayName: "subSportMenu",
            render: function () {
                var e, t = this;
                return this.props.data.lsData && (e = this.props.data.lsData.sps.map(function (e) {
                    return React.createElement("li", {
                        onClick: t._onClick.bind(t, e.Sn),
                        key: e.Sn
                    }, React.createElement("a", null, e.Sn))
                })), React.createElement("ul", {
                    className: "SubTVmenu hidden"
                }, React.createElement("li", {
                    onClick: this._onClick.bind(t, ""),
                    className: "title"
                }, React.createElement("a", null, l.AllSports)), e)
            },
            _onClick: function (e, t) {
                Action.RightPanel.TV.selSportFilter(e), t.stopPropagation()
            }
        }), r.liveCentre.tvMenu.subDateMenu = React.createClass({
            displayName: "subDateMenu",
            render: function () {
                var e, t = this;
                return this.props.data.lsData && (e = this.props.data.lsData.lds.map(function (e) {
                    return React.createElement("li", {
                        onClick: t._onClick.bind(t, e.Ed),
                        key: e.Ed
                    }, React.createElement("a", null, e.Ed))
                })), React.createElement("ul", {
                    className: "SubTVmenu hidden"
                }, React.createElement("li", {
                    className: "title",
                    onClick: t._onClick.bind(t, "")
                }, React.createElement("a", null, l.AllDate)), e)
            },
            _onClick: function (e, t) {
                Action.RightPanel.TV.selDateFilter(e), t.stopPropagation()
            }
        }), r.liveCentre.tvMenu.menuItemGroup = React.createClass({
            displayName: "menuItemGroup",
            render: function () {
                var e = [],
                    t = this.props.sportFilter,
                    a = this.props.playEventId,
                    l = this.props.slideTvMenuCallback;
                return this.props.data.sps.forEach(function (c) {
                    c.evts.forEach(function (c) {
                        t && t != c.SpN || e.push(React.createElement(r.liveCentre.tvMenu.menuItem, {
                            key: c.EId,
                            evtData: c,
                            isBeingPlayed: a == c.EId,
                            slideTvMenuCallback: l
                        }))
                    })
                }), React.createElement("div", {
                    className: "tvmenu-row"
                }, React.createElement("div", {
                    className: "titlebar"
                }, this.props.data.Ed), React.createElement("table", {
                    className: "data-row"
                }, React.createElement("colgroup", null, React.createElement("col", {
                    className: "gameTime"
                }), React.createElement("col", {
                    className: "gameItem"
                })), React.createElement("tbody", null, e)), React.createElement("div", {
                    className: "clearfix"
                }))
            }
        }), r.liveCentre.tvMenu.menuItem = React.createClass({
            displayName: "menuItem",
            render: function () {
                var e, t = this.props.evtData;
                return e = t.il ? React.createElement("td", {
                    className: "TimeTd"
                }, React.createElement("span", {
                    className: "icon icon-TV2 hh-o"
                })) : React.createElement("td", {
                    className: "TimeTd"
                }, t.EST), React.createElement("tr", {
                    className: this.props.isBeingPlayed ? "selected" : "",
                    onClick: this.playTV.bind(this, t.EId, t.HT, t.AT, t.SID, t.LSID, t.il),
                    "data-eid": t.EId,
                    "data-lsid": t.LSID
                }, e, React.createElement("td", {
                    className: "ItemTd"
                }, React.createElement("table", null, React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", null, React.createElement("span", {
                    className: "icon icon-" + t.SID
                })), React.createElement("td", null, React.createElement("span", {
                    className: "txt"
                }, t.HT, " ", React.createElement("span", {
                    className: "hh-o bold"
                }, "v "), t.AT)))))))
            },
            playTV: function (e, t, a, l, c, s, n) {
                console.log("playTV:" + [e, l, c, s]), s && (Action.RightPanel.TV.playTvIgnoreLock(e.toString(), t, a, l.toString(), c.toString(), "", !0), Action.RightPanel.TV.toggleTvMenu(!1), this.props.slideTvMenuCallback()), n.stopPropagation()
            }
        }), r.Utility = {
            format: {
                numberWithCommas: function (e) {
                    if (null == e) return e;
                    var t = e.toString().split(".");
                    if (t[0].length > 1 && (t[0] = t[0].replace(/^0*/, "")), t[0] = t[0].replace(/\B(?=(\d{3})+(?!\d))/g, ","), "" != t[0])
                        if (null == t[1]) t.push("00");
                        else if (t[1] = /\d{0,2}/.exec(t[1]).toString(), t[1].length < 2)
                        for (var a = 0; a < 3 - t[1].length; a++) t[1] += "0";
                    return t.join(".")
                },
                numberWithCommasForStakeInput: function (e) {
                    if (null == e) return e;
                    var t = e.toString().split(".");
                    return t[0].length > 1 && (t[0] = t[0].replace(/^0*/, "")), t[0] = t[0].replace(/\B(?=(\d{3})+(?!\d))/g, ","), "" != t[0] && null != t[1] && (t[1] = /\d{0,2}/.exec(t[1]).toString()), t.join(".")
                },
                formatTwoDecimal: function (e) {
                    if (null == e) return e;
                    var t = e.toString().split(".");
                    if (t[0].length > 1 && (t[0] = t[0].replace(/^0*/, "")), "" != t[0])
                        if (null == t[1]) t.push("00");
                        else if (3 != t[1].length && (t[1] = /\d{0,2}/.exec(t[1]).toString(), t[1].length < 2))
                        for (var a = 0; a < 3 - t[1].length; a++) t[1] += "0";
                    return t.join(".")
                },
                removeCommas: function (e) {
                    if (null == e) return e;
                    var t = e.toString().split(".");
                    return t[0].length > 1 && (t[0] = t[0].replace(/^0*/, "")), t[0] = t[0].replace(/,/g, ""), t.join(".")
                },
                removeNonNumeric: function (e) {
                    return null == e ? e : e.replace(/[^0-9\.]+/g, "")
                },
                truncateNumber: function (e) {
                    if (null == e) return e;
                    var t = e + "";
                    return t.length > 12 ? t.substring(0, 12) : e
                },
                onlyHasNumeric: function (e) {
                    return null != e && !/[^0-9\.]+/g.test(e)
                },
                formatPlaceDate: function (e) {
                    return moment(e).format(" DD / MM YYYY  HH:mm:ss")
                },
                formatEventDate: function (e) {
                    return moment(e).format("DD / MM  HH:mm")
                }
            },
            link: {
                _getMorebetLink: function (e, t, a) {
                    var l;
                    l = 2 == t ? VIEW.INPLAY : 0 == t ? VIEW.PRESTART : VIEW.STARTINGSOON;
                    var c = new RegExp(/\s/, "g");
                    return a = a.replace(c, "-"), Router.event(e, l, a)
                },
                _getUnSettledLink: function () {
                    return Router.statement.unsettled()
                },
                _getSettledLink: function () {
                    return Router.statement.settled()
                }
            },
            scrollbarUpdate: {
                _updateFromTop: !1,
                componentWillReceiveProps: function (e) {
                    this._updateFromTop = !0
                },
                componentDidUpdate: function () {
                    this._updateFromTop || null == this.props.updateScrollBarFN ? this._updateFromTop = !1 : this.props.updateScrollBarFN()
                }
            }
        }, r.dangerTimer = null, r.betSlips = React.createClass({
            displayName: "betSlips",
            mixins: [r.Utility.scrollbarUpdate],
            getInitialState: function () {
                return this._getDataFromStore()
            },
            componentDidMount: function () {
                BS_Store.addUpdateListener(this._onUpdate), this.props.isPopUp && Action.RightPanel.resizeFrame()
            },
            componentDidUpdate: function () {
                var e = this.state.extraData.currentMode,
                    t = this.state.extraData.modes,
                    a = null == this.state.BS_Data ? null : this.state.BS_Data.ts;
                if (this._changeFromStore)
                    if (this._changeFromStore = !1, e != t.PLACEBET || null == a || 1 != a.length || this.props.isPopUp) {
                        if (e == t.BETRECEIPT) {
                            var l = this.state.BS_Data.s.map(function (e) {
                                return e.sid + ""
                            });
                            Action.CenterPanel.removeHighlightOdds(l)
                        }
                    } else this.props.scrollToAnchorFn();
                if (e == t.BETRECEIPT) {
                    clearTimeout(r.dangerTimer);
                    var c = this.state.extraData.dangerStatus ? this.state.extraData.dangerStatus : null,
                        s = _.pluck(_.filter(a, {
                            idan: !0
                        }), "wo");
                    if (c && c.f)
                        if (_.some(c.t, "ts", 0)) r.dangerTimer = setTimeout(function () {
                            Action.RightPanel.fetchDangerStatus(s, "betreceipt")
                        }, 3e3);
                        else {
                            for (var n = !1, i = 0; i < c.t.length; i++)
                                if (-1 == _.indexOf(s, +c.t[i].bid)) {
                                    n = !0;
                                    break
                                }
                            n && (r.dangerTimer = setTimeout(function () {
                                Action.RightPanel.fetchDangerStatus(s, "betreceipt")
                            }, 3e3))
                        }
                    else s.length > 0 && !c && (r.dangerTimer = setTimeout(function () {
                        Action.RightPanel.fetchDangerStatus(s, "betreceipt")
                    }, 3e3))
                }
                this.props.isPopUp && Action.RightPanel.resizeFrame()
            },
            render: function () {
                var e, t, a, c, s = this.state.BS_Data,
                    n = this.state.extraData,
                    i = null == s ? [] : s.ts,
                    o = null == s ? [] : s.tc,
                    d = n.retainSelection,
                    m = this.props.isPopUp;
                0 == i.length && 0 == o.length && (e = React.createElement(r.betSlips.emptyBetEntry, null));
                var p, h, u, E = n.editingId,
                    R = 1 != i.length && n.isOpenCombo,
                    g = n.modes,
                    f = n.currentMode,
                    v = "tab_content",
                    N = _.every(i, function (e) {
                        return e.po && e.pf && e.pt && e.po > 0 && e.pf > 0 && e.pt > 0
                    });
                if (s.islog) switch (f) {
                    case g.PLACEBET:
                        p = React.createElement(r.betSlips.topMenu.loggedIn, {
                            showMyBet: n.showMyBet,
                            uc: n.uc
                        }), i.length > 0 && (h = React.createElement(r.betSlips.actions.loggedIn, {
                            data: {
                                abo: s.abo,
                                sbc: s.sbc,
                                berr: s.berr,
                                needAcceptChange: n.needAcceptChange
                            }
                        })), null != s.info && (u = React.createElement(r.betSlips.notice, {
                            msg: s.info
                        }));
                        break;
                    case g.BETCONFIRM:
                        p = React.createElement(r.betSlips.topMenu.betConfirm, null), h = React.createElement(r.betSlips.actions.betConfirm, null), v = "ConfirmBetContent";
                        break;
                    case g.BETRECEIPT:
                        p = React.createElement(r.betSlips.topMenu.betReceipt, null), h = React.createElement(r.betSlips.actions.betReceipt, {
                            data: {
                                retainSelection: d,
                                isPopUp: m
                            }
                        });
                        var b = _.pluck(_.filter(i, {
                            idan: !0,
                            rsl: 9999
                        }), "wo");
                        u = b.length > 0 ? React.createElement(r.betSlips.errorMsg, {
                            msg: l[1 == i.length ? "BS_DangerBet" : "BS_DangerSuccess"],
                            isPending: !0
                        }) : 9999 == s.berr ? React.createElement(r.betSlips.errorMsg, {
                            isComfirm: !0,
                            msg: l[s.info],
                            isGeneralMsg: !0
                        }) : React.createElement(r.betSlips.notice, {
                            msg: l[s.info]
                        }), n.dangerStatus && n.dangerStatus.f && 0 == n.dangerStatus.rc && n.dangerStatus.t && n.dangerStatus.t.every(function (e) {
                            return _.contains(b, +e.bid)
                        }) && (_.every(n.dangerStatus.t, function (e) {
                            return _.contains([1, 2], e.ts)
                        }) ? u = React.createElement(r.betSlips.errorMsg, {
                            isComfirm: !0,
                            msg: l.BetStatus_CONFIRM,
                            isGeneralMsg: !0
                        }) : _.some(n.dangerStatus.t, "ts", 3) && (u = React.createElement(r.betSlips.errorMsg, {
                            msg: 1 == i.length ? l.BS_DangerRejected : l.BS_DangerRejected2,
                            isGeneralMsg: !0,
                            isCancel: !0
                        }))), v = "BetreceiptContent"
                } else p = React.createElement(r.betSlips.topMenu.preLogIn, null), i.length > 0 && (h = React.createElement(r.betSlips.actions.preLogIn, null));
                if (i.length > 0) {
                    t = i.map(function (e, t) {
                        t++;
                        var a = e.sid,
                            l = {
                                currentMode: f,
                                modes: g,
                                data: e,
                                cc: s.cc,
                                isEditing: E == e.sid,
                                isOpenCombo: R,
                                retainSelection: d,
                                islog: s.islog,
                                needFocus: n.needFocus,
                                dangerStatus: _.filter(n.dangerStatus ? n.dangerStatus.t : null, function (t) {
                                    return t.bid == e.wo
                                })[0],
                                dangerFlag: !n.dangerStatus || n.dangerStatus.f && 0 === n.dangerStatus.rc
                            };
                        return React.createElement(r.betSlips.betEntry, {
                            key: a,
                            data: l,
                            last: i.length == t
                        })
                    })
                }
                o.length > 0 && (a = React.createElement(r.betSlips.combobet, {
                    currentMode: f,
                    modes: g,
                    data: o,
                    cc: s.cc,
                    editingId: E,
                    isOpenCombo: R,
                    canCombo: s.iscom,
                    islog: s.islog,
                    canComboEachWay: N
                })), (i.length > 0 || o.length > 0) && (c = React.createElement(r.betSlips.total, {
                    totalBet: s.totalBet,
                    totalStake: s.totalStake,
                    totalPay: s.totalPay,
                    cc: s.cc
                }));
                var y;
                n.showLoading && (y = React.createElement(r.betSlips.loading, null));
                var k;
                return k = React.createElement("div", {
                    className: "tab_content" + (n.showMyBet ? "" : " hidden")
                }, React.createElement(r.myBet, {
                    updateScrollBarFN: this.props.updateScrollBarFN,
                    isPopUp: this.props.isPopUp
                })), null != s.errmsg && null == u && (u = React.createElement(r.betSlips.errorMsg, {
                    msg: s.errmsg,
                    isGeneralMsg: !0
                })), React.createElement("div", {
                    className: s.islog ? "betbox loggedIn" : "betbox prelogin"
                }, p, React.createElement("div", null, React.createElement("div", {
                    className: v + (n.showMyBet ? " hidden" : "")
                }, y, e, t, a, c, u, h), k))
            },
            _getDataFromStore: function () {
                return {
                    BS_Data: BS_Store.getData(),
                    extraData: BS_Store.getExtraData()
                }
            },
            _onUpdate: function () {
                var e = this._getDataFromStore();
                this._changeFromStore = e.extraData.needFocus, this.setState(e)
            }
        }), r.betSlips.topMenu = {}, r.betSlips.topMenu.preLogIn = React.createClass({
            displayName: "preLogIn",
            render: function () {
                return React.createElement("p", {
                    className: "betreceiptTitle"
                }, React.createElement("b", null, l.BS_Bet_Slip))
            }
        }), r.betSlips.topMenu.loggedIn = React.createClass({
            displayName: "loggedIn",
            render: function () {
                var e = this.props.showMyBet,
                    t = this.props.uc;
                return t = +t > 99 ? "99+" : t, React.createElement("ul", {
                    className: "tabs withcount"
                }, React.createElement("li", {
                    id: "tabBetSlip",
                    className: e ? "" : "active"
                }, React.createElement("a", {
                    href: "javascript:void(0)",
                    onClick: this._toggleMyBet.bind(this, !1)
                }, l.BS_Bet_Slip)), React.createElement("li", {
                    id: "tabMyBet",
                    className: e ? "active" : ""
                }, React.createElement("span", null, React.createElement("a", {
                    href: "javascript:void(0)",
                    onClick: this._toggleMyBet.bind(this, !0)
                }, l.BS_My_Bets)), React.createElement("span", {
                    className: "mg-l-5"
                }, t)))
            },
            _toggleMyBet: function (e) {
                e ? Action.RightPanel.refreshMyBet(!0) : Action.RightPanel.toggleMyBet(e)
            }
        }), r.betSlips.topMenu.betConfirm = React.createClass({
            displayName: "betConfirm",
            render: function () {
                return React.createElement("p", {
                    className: "confirmTitle"
                }, React.createElement("b", null, l.BS_Confirm_Bet))
            }
        }), r.betSlips.topMenu.betReceipt = React.createClass({
            displayName: "betReceipt",
            render: function () {
                return React.createElement("p", {
                    className: "betreceiptTitle"
                }, React.createElement("b", null, l.BS_Bet_Receipt))
            }
        }), r.betSlips.emptyBetEntry = React.createClass({
            displayName: "emptyBetEntry",
            render: function () {
                return React.createElement("div", {
                    className: "betslip-row selectBetSlip"
                }, React.createElement("div", {
                    className: "icongroup"
                }, React.createElement("span", {
                    className: "icon icon-addSelectToBetSlip"
                })), React.createElement("p", {
                    className: "text"
                }, l.BS_Add_Selection_To_BetSlip))
            }
        }), r.betSlips.betEntry = React.createClass({
            displayName: "betEntry",
            mixins: [r.Utility.format],
            componentDidMount: function () {
                $(this.refs.betEntry.getDOMNode()).on("contextmenu", function (e) {
                    return !1
                }).on("keydown", function (e) {
                    var t = e.keyCode ? e.keyCode : e.which;
                    if (e.ctrlKey && "v" == String.fromCharCode(t).toLowerCase()) return !1
                })
            },
            render: function () {
                var e, t, a, c, s, n, i, o = this.props.data,
                    d = o.data,
                    m = 1 == d.ip && d.ishp && d.isds,
                    p = o.currentMode,
                    h = o.modes,
                    u = !1,
                    E = "betslip-row",
                    e = "bold",
                    R = "",
                    g = "over-hidden";
                switch (p) {
                    case h.PLACEBET:
                        u = o.isOpenCombo && (d.ip || !d.ap || 8888 == d.rsl), E += u ? " error" : "", e += " hh-o", R += " hh-o", g += " pd-10 inputbox", t = React.createElement("span", {
                            className: "iconbox c-removebtn",
                            onClick: this._handleRemoveBetslip
                        }, React.createElement("a", {
                            href: "javascript:void(0)",
                            className: "icon icon-MainMarketsHideleftminur"
                        })), a = React.createElement(r.betSlips.stake.single, {
                            ref: "stake",
                            st: d.st,
                            towin: d.towin,
                            hasError: u,
                            isEditing: o.isEditing,
                            sid: d.sid,
                            domId: "stake_" + d.sid,
                            needFocus: o.needFocus
                        }), o.isEditing && (c = React.createElement(r.betSlips.quickBet, {
                            hideMax: !o.islog,
                            cc: o.cc,
                            max: d.isew && d.bsew ? d.bsew.bmax : d.bs.bmax,
                            clickFN: this._clickQuickBet,
                            clearFN: this._clearStake,
                            isSingle: !0,
                            st: d.st
                        })), d.po && d.po > 0 && (n = React.createElement(r.betSlips.stake.single.eachWay, {
                            data: d
                        })), d.isew && (i = React.createElement(r.betSlips.stake.totalStake, {
                            data: d.st ? 2 * d.st : 0
                        }));
                        break;
                    case h.BETCONFIRM:
                        d.st > 0 && (a = React.createElement(r.betSlips.stake.confirmBet, {
                            st: d.st,
                            towin: d.towin,
                            nobold: !0
                        })), e += " hh-o", R += " hh-o", g += " pd-t-6 pd-b-6 pd-l-10 pd-r-10";
                        break;
                    case h.BETRECEIPT:
                        u = d.st > 0 && 9999 != d.rsl || 0 == d.st && !d.hasSuccessComboBet, E += u ? " error" : d.idan ? " pending" : " success", e += " hh-b", R += " ft-c-61 bold", g += " pd-b-6 pd-l-10 pd-r-10", d.st > 0 && (a = React.createElement(r.betSlips.stake.confirmBet, {
                            isReceipt: !0,
                            st: d.st,
                            towin: o.dangerStatus && 3 == o.dangerStatus.ts ? "--" : this.numberWithCommas(d.towin)
                        })), 9999 === d.rsl && d.idan && o.dangerFlag && (s = React.createElement("span", {
                            className: "loading-o"
                        }), o.dangerStatus && 0 == o.dangerStatus.ts ? s = React.createElement("span", {
                            className: "loading-o"
                        }) : o.dangerStatus && _.contains([1, 2], o.dangerStatus.ts) ? (s = null, E = E.replace(/pending/g, "success")) : o.dangerStatus && 3 == o.dangerStatus.ts && (s = null, E = E.replace(/pending/g, "error")))
                }
                var f, v = 2 == d.rsl || "Hdp_Odds_Changed" == d.serr || "o-upt" == d.c2,
                    N = 3 == d.rsl,
                    b = 1 == d.rsl || "Hdp_Odds_Changed" == d.serr;
                m && (f = React.createElement("span", {
                    className: "dsp-iblk highlight" + (N ? " ft-c-3" + (p != h.BETRECEIPT ? " bg-c-42" : " bg-c-52") : p != h.BETRECEIPT && u ? " ft-c-3 bg-c-50" : "")
                }, " ", "(" + d.hs + "-" + d.as + ")"));
                var y;
                /or/i.test(d.tl) ? d.isEpm ? d.isEpm && d.dil && d.dil.length > 0 && (y = d.dil.map(function (e, t) {
                    switch (d.dt) {
                        case 1:
                            var a = e.split("-v-");
                            return a.length < 2 ? null : React.createElement("p", {
                                key: "bs_epm_dil_" + e + "_" + t
                            }, a[0] + " ", React.createElement("span", {
                                className: u || p == h.BETRECEIPT ? "" : "hh-o bold"
                            }, " ", "v", " "), a[1] + " ");
                        case 2:
                        case 3:
                            return React.createElement("p", {
                                key: "bs_epm_dil_" + e + "_" + t
                            }, e)
                    }
                })) : y = p == h.BETRECEIPT ? React.createElement("p", null, d.en) : null : y = React.createElement("p", null, d.hn + " ", React.createElement("span", {
                    className: u || p == h.BETRECEIPT ? "" : "hh-o bold"
                }, " ", "v", " "), d.an + " ");
                var k = {
                    cn: d.cpn,
                    h: d.hn,
                    a: d.an,
                    ip: d.ip,
                    isReceipt: p == h.BETRECEIPT,
                    isDisplayScore: m
                };
                d.ip && p != h.BETRECEIPT ? (k.hs = d.hs, k.as = d.as) : (k.edt = d.edt, /or/i.test(d.tl) && (k.en = d.en)), d.isEpm && (k.dt = d.dt, k.ril = d.ril, k.iscc = d.iscc);
                var P, S;
                p == h.BETRECEIPT && 0 != d.st && (P = React.createElement("p", {
                    className: "p-betID"
                }, l.BetNo, React.createElement("span", {
                    className: "bold mg-l-3"
                }, d.wo)), null != d.pdt && (S = React.createElement("p", {
                    className: "p-placed"
                }, l.Wager_BetDate, React.createElement("span", {
                    className: "bold"
                }, this.formatPlaceDate(d.pdt)))));
                var M;
                null != d.hd && "null" != d.hd && (M = React.createElement("span", {
                    className: R + (b ? " highlight ft-c-3" + (p != h.BETRECEIPT ? " bg-c-42" : " bg-c-52") : "")
                }, d.hd));
                var w;
                return null != d.serr && (w = React.createElement(r.betSlips.errorMsg, {
                    msg: null != l[d.serr] ? (p == h.BETRECEIPT ? l.BS_BetFailed : "") + " " + l[d.serr] : d.errMsg
                })), React.createElement("div", {
                    className: classNames("Betreceiptlist", {
                        reomveborder: this.props.last
                    })
                }, React.createElement("div", {
                    id: "be_" + d.eid + "_" + d.sid,
                    className: E,
                    ref: "betEntry"
                }, d.isEpm ? React.createElement(r.epmInfoddl, {
                    data: k,
                    ref: "ddl"
                }, P) : React.createElement(r.infoddl, {
                    data: k,
                    ref: "ddl"
                }, P, S), React.createElement("span", {
                    className: "iconbox",
                    onMouseOver: this._showInfo.bind(this, !0),
                    onMouseOut: this._showInfo.bind(this, !1)
                }, React.createElement("a", {
                    href: "javascript:void(0)",
                    className: "icon icon-i-s"
                })), React.createElement("span", {
                    className: "bettitle"
                }, React.createElement("span", {
                    className: p == h.PLACEBET && u ? " highlight ft-c-3 bg-c-50" : ""
                }, d.isEpm ? l.EPM.EPM : d.bn), f), s, React.createElement("div", {
                    className: "db-group"
                }, React.createElement("p", {
                    className: "big-txt"
                }, React.createElement("span", {
                    className: "name1"
                }, d.isEpm ? d.bn : d.sn + " "), M, React.createElement("span", {
                    className: "at mg-l-3 mg-r-3"
                }, "@"), React.createElement("span", {
                    className: e + (v ? " highlight ft-c-3" + (p != h.BETRECEIPT ? " bg-c-42" : " bg-c-52") : ""),
                    ref: "odds"
                }, d.do)), y), t, React.createElement("div", {
                    className: g
                }, a), n, i, c), w)
            },
            _handleRemoveBetslip: function () {
                Action.RightPanel.removeSelection(this.props.data.data.sid)
            },
            _showInfo: function (e) {
                e ? this.refs.ddl.show() : this.refs.ddl.hide()
            },
            _clickQuickBet: function (e) {
                Action.RightPanel.addStake(this.props.data.data.sid, e), this.refs.stake.focus()
            },
            _clearStake: function () {
                Action.RightPanel.updateStake(this.props.data.data.sid, null), this.refs.stake.focus()
            }
        }), r.betSlips.stakeInput = React.createClass({
            displayName: "stakeInput",
            mixins: [r.Utility.format],
            render: function () {
                var e = {
                        className: "form-control " + (this.props.isTowin ? "ToWin" : "Stake"),
                        onFocus: this._handleFocusAndBlur.bind(this, !0),
                        onBlur: this._handleFocusAndBlur.bind(this, !1),
                        onChange: this._handleChange,
                        onKeyUp: this._handleKeyUp,
                        placeholder: this.props.placeholder
                    },
                    t = "" == this.props.ttp || null == this.props.ttp ? null : isNaN(this.props.ttp) ? this.props.ttp : this.numberWithCommasForStakeInput(this.props.ttp);
                return React.createElement("span", {
                    title: t
                }, React.createElement("input", c({
                    id: this.props.domId,
                    ref: "dom",
                    type: "text",
                    value: this.numberWithCommasForStakeInput(this.props.value)
                }, e, this.props.extraProps)))
            },
            _handleFocusAndBlur: function (e, t) {
                t.target.placeholder = e ? "" : this.props.placeholder, e && this.props.focusInFn()
            },
            _handleChange: function (e) {
                var t = e.target.value;
                this.onlyHasNumeric(t) || (t = this.removeNonNumeric(t)), t = this.truncateNumber(t), $(this.refs.dom.getDOMNode()).val(t);
                this.removeCommas(t);
                $(this.refs.dom.getDOMNode()).data("changeVal", this.removeCommas(t))
            },
            _handleKeyUp: function (e) {
                if (!BS.Utility.IgnoreInput(e)) {
                    var t = $(this.refs.dom.getDOMNode()).data("changeVal");
                    null != t && this.props.changeFN(t)
                }
            },
            focus: function () {
                $(this.refs.dom.getDOMNode()).focus()
            }
        }), r.betSlips.stake = {}, r.betSlips.stake.confirmBet = React.createClass({
            displayName: "confirmBet",
            mixins: [r.Utility.format],
            render: function () {
                var e, t = this.props.st,
                    a = this.props.towin,
                    c = this.props.isCombo,
                    s = this.props.bc;
                return c && (e = React.createElement("span", null, " X " + s)), React.createElement("div", null, React.createElement("span", {
                    className: "staketxt float-left text-left" + (this.props.isReceipt ? this.props.err ? " ft-c-53" : " ft-c-49" : "")
                }, l.BS_Title_Stake, React.createElement("br", null), React.createElement("span", {
                    className: "number" + (this.props.nobold ? "" : " bold"),
                    ref: "stake"
                }, this.numberWithCommas(t), e)), React.createElement("span", {
                    className: "towintxt float-right text-right" + (this.props.isReceipt ? this.props.err ? " ft-c-53" : " ft-c-49" : "")
                }, this.props.isSettled ? l.Wager_Returns : l.BS_Title_To_Win, React.createElement("br", null), React.createElement("span", {
                    className: "number" + (this.props.nobold ? "" : " bold"),
                    ref: "towin"
                }, /--/.test(a) ? a : this.numberWithCommas(a))), React.createElement("div", {
                    className: "clearfix"
                }))
            }
        }), r.betSlips.stake.single = React.createClass({
            displayName: "single",
            mixins: [r.Utility.format],
            componentDidMount: function () {
                this.props.isEditing && this.focus()
            },
            componentDidUpdate: function () {
                this.props.isEditing && this.props.needFocus && this.focus()
            },
            render: function () {
                var e = this.props.st,
                    t = this.props.towin,
                    a = {};
                return React.createElement("div", {
                    className: "pos-relative"
                }, React.createElement(r.betSlips.stakeInput, {
                    placeholder: l.BS_Title_Stake,
                    ref: "stake",
                    focusInFn: this._handleEditStake,
                    changeFN: this._handleChangeStake,
                    value: e,
                    extraProps: a,
                    ttp: l.BS_Title_Stake,
                    domId: this.props.domId
                }), React.createElement("span", {
                    ref: "towin",
                    placeholder: l.BS_Title_To_Win,
                    title: l.BS_Title_To_Win,
                    className: "to-win " + ("" == t || null == t ? "" : " ft-c-52")
                }, null == t ? l.BS_Title_To_Win : this.numberWithCommas(t)))
            },
            _handleChangeStake: function (e) {
                Action.RightPanel.updateStake(this.props.sid, e)
            },
            _handleChangeToWin: function (e) {
                Action.RightPanel.updateToWin(this.props.sid, e)
            },
            _handleEditStake: function () {
                this.props.isEditing || Action.RightPanel.editBetSlip(this.props.sid)
            },
            focus: function () {
                this.refs.stake.focus()
            }
        }), r.betSlips.stake.combo = React.createClass({
            displayName: "combo",
            mixins: [r.Utility.format],
            render: function () {
                var e = this.props.bc,
                    t = this.props.st,
                    a = this.props.towin,
                    s = {},
                    n = {};
                return React.createElement("div", null, React.createElement("span", {
                    className: "staketxt float-left text-left"
                }, React.createElement(r.betSlips.stakeInput, {
                    ref: "stake",
                    placeholder: l.BS_Title_Stake,
                    value: t,
                    focusInFn: this._handleEditCombo,
                    changeFN: this._handleChangeStake,
                    extraProps: s,
                    ttp: l.BS_Title_Stake,
                    domId: this.props.domId
                }), React.createElement("span", {
                    className: "number"
                }, React.createElement("span", {
                    className: "ft-c-3"
                }, "X"), React.createElement("span", {
                    className: "mg-l-5 ft-c-3"
                }, e))), React.createElement("span", c({
                    ref: "towin",
                    className: "towintxt float-right text-right number-txt" + ("" == a || null == a ? "" : " number")
                }, n), null == a ? l.BS_Title_To_Win : this.numberWithCommas(a)), React.createElement("div", {
                    className: "clearfix"
                }))
            },
            _handleChangeStake: function (e) {
                Action.RightPanel.updateComboStake(this.props.wid, e)
            },
            _handleEditCombo: function () {
                this.props.isEditing || Action.RightPanel.editBetSlip("cb_" + this.props.wid)
            },
            focus: function () {
                this.refs.stake.focus()
            }
        }), r.betSlips.stake.single.eachWay = React.createClass({
            displayName: "eachWay",
            mixins: [r.Utility.format],
            render: function () {
                var e = this.props.data;
                return React.createElement("div", {
                    className: "eachway-row" + (e.isew ? " checked" : "")
                }, React.createElement("div", {
                    className: "pos-relative mg-b-3"
                }, React.createElement("span", {
                    className: "checkbox-s radius t-va-m mg-r-9",
                    onClick: this.toggleSingleEachWay.bind(this, e.sid, !e.isew)
                }, React.createElement("span", {
                    className: "icon-Iconbg"
                })), React.createElement("span", {
                    className: "dsp-iblk t-va-m"
                }, React.createElement("span", {
                    className: "dsp-blk ft-c-3"
                }, l.OP_EW_S), React.createElement("span", {
                    className: "dsp-blk learn-more",
                    onClick: this._showParlayHelpingPopUp
                }, l.BS_Title_Learn_More)), React.createElement("span", {
                    className: "to-place" + (e.isew && e.toplace && e.toplace > 0 ? " ft-c-52" : "")
                }, e.isew && e.toplace && e.toplace > 0 ? this.numberWithCommas(e.toplace) : l.BS_Title_To_Place)), React.createElement("div", {
                    className: "mg-t-14"
                }, React.createElement("span", null, "1/", e.pf, " ", l.OP_Odds), " ", "-", " ", React.createElement("span", {
                    className: "ft-c-3"
                }, l.OP_NT.replace("XXX", e.pt))))
            },
            toggleSingleEachWay: function (e, t, a) {
                Action.RightPanel.toggleSingleEachWay(e, t), a.stopPropagation(), a.preventDefault()
            },
            _showParlayHelpingPopUp: function (e) {
                var t = React.createElement(r.betSlips.eachWayPopUp, null);
                Action.FullScreenBlock.show(t), e.stopPropagation(), e.preventDefault()
            }
        }), r.betSlips.stake.totalStake = React.createClass({
            displayName: "totalStake",
            mixins: [r.Utility.format],
            render: function () {
                var e = this.props.data;
                return React.createElement("div", {
                    className: "place-row"
                }, React.createElement("div", {
                    className: "place-linear"
                }), React.createElement("div", {
                    className: "place-total"
                }, React.createElement("span", null, l.BS_Title_Total_Stake), React.createElement("span", {
                    className: "float-right ft-c-3"
                }, this.numberWithCommas(e))))
            }
        }), r.betSlips.combobet = React.createClass({
            displayName: "combobet",
            render: function () {
                var e, t = this.props.data,
                    a = this.props.islog,
                    c = this.props.editingId,
                    s = this.props.cc,
                    n = this.props.currentMode,
                    i = this.props.modes,
                    o = n == i.PLACEBET,
                    d = this.props.canComboEachWay,
                    m = t.map(function (e) {
                        if (1 == e.wid) return "";
                        var t = "cb_" + e.wid + (e.ispl ? "_p" : "");
                        return React.createElement(r.betSlips.combobet.comboItem, {
                            key: t,
                            data: e,
                            cc: s,
                            isEditing: c == t,
                            currentMode: n,
                            modes: i,
                            islog: a,
                            canComboEachWay: d
                        })
                    });
                n == i.BETRECEIPT || this.props.canCombo || (e = React.createElement(r.betSlips.errorMsg, {
                    msg: l.BS_CannotCombined
                }));
                var p;
                _.some(t, "wid", 1) && (p = React.createElement(r.betSlips.combobet.comboItem, {
                    data: t[0],
                    cc: s,
                    isEditing: c == "cb_" + t[0].wid,
                    currentMode: n,
                    modes: i,
                    islog: a,
                    canComboEachWay: d
                }));
                var h, u;
                if (!!o || (t.length > 1 || 1 != t[0].wid)) {
                    var E, R;
                    o && (E = React.createElement("a", {
                        href: "javascript:void(0)",
                        className: "icon " + (this.props.isOpenCombo ? "icon-ArrowUp" : "icon-ArrowDown")
                    }), R = React.createElement("a", {
                        href: "javascript:void(0)",
                        className: "icon icon-Help",
                        onClick: this._showParlayHelpingPopUp
                    })), h = React.createElement("p", {
                        ref: "multiple",
                        className: "MultipleTitle",
                        onClick: this._toggleComboCollapse
                    }, l.BS_ComboBet_Title, E, R), u = React.createElement("div", {
                        ref: "items",
                        className: this.props.isOpenCombo ? "" : "hidden"
                    }, e, null == e ? m : null)
                }
                return React.createElement("div", {
                    className: "MultipleBets " + (o ? "edit" : "")
                }, p, h, u)
            },
            _toggleComboCollapse: function () {
                var e = this.props.isOpenCombo,
                    t = this.refs.items.getDOMNode(),
                    a = this.props.canCombo;
                this.props.currentMode == this.props.modes.PLACEBET && a && (e ? $(t).slideUp("slow", function () {
                    Action.RightPanel.changeComboCollapseStatus(!1)
                }) : $(t).slideDown("slow", function () {
                    Action.RightPanel.changeComboCollapseStatus(!0)
                }))
            },
            _showParlayHelpingPopUp: function (e) {
                var t = React.createElement(r.betSlips.parlayPopUp, null);
                Action.FullScreenBlock.show(t), e.stopPropagation(), e.preventDefault()
            }
        }), r.betSlips.combobet.comboItem = React.createClass({
            displayName: "comboItem",
            mixins: [r.Utility.format],
            render: function () {
                var e, t, a, c, s, n = this.props.data,
                    i = 1 == n.wid ? l.BetType_Singles : n.cbn,
                    o = this.props.currentMode,
                    d = this.props.modes,
                    m = o == d.PLACEBET,
                    p = this.props.canComboEachWay;
                m ? (e = React.createElement(r.betSlips.stake.combo, {
                    ref: "stake",
                    wid: n.wid,
                    bc: n.isew & p ? 2 * n.bc : n.bc,
                    st: n.cba,
                    towin: n.payout,
                    isEditing: this.props.isEditing,
                    domId: "cb_" + n.wid
                }), this.props.isEditing && (t = React.createElement(r.betSlips.quickBet, {
                    hideMax: 1 == n.wid || !this.props.islog,
                    cc: this.props.cc,
                    max: n.cbs.bmax,
                    clickFN: this._clickQuickBet,
                    clearFN: this._clearStake,
                    isSingle: 1 == n.wid,
                    isCombo: !0,
                    st: n.cba
                })), p && (c = React.createElement(r.betSlips.combobet.comboItem.eachway, {
                    wid: n.wid,
                    isChecked: n.isew,
                    toPlace: n.placePayout
                }), s = n.isew ? React.createElement(r.betSlips.stake.totalStake, {
                    data: n.cba ? n.cba * n.bc * 2 : 0
                }) : null)) : (e = React.createElement(r.betSlips.stake.confirmBet, {
                    isReceipt: o == d.BETRECEIPT,
                    st: n.cba,
                    towin: n.payout,
                    isCombo: !0,
                    err: null != n.cerr,
                    bc: n.bc,
                    nobold: o == d.BETCONFIRM
                }), o != d.BETRECEIPT || n.cerr || (a = React.createElement("div", {
                    className: "pd-10 pd-t-5 pd-b-0"
                }, React.createElement("div", {
                    className: "tbr-c-17 pd-t-5"
                }, React.createElement("p", {
                    className: "p-betID "
                }, React.createElement("span", {
                    className: "ft-c-22"
                }, l.BetNo), React.createElement("span", {
                    className: "bold ft-c-25 mg-l-3"
                }, n.wo))))));
                var h;
                n.cerr && (h = React.createElement(r.betSlips.errorMsg, {
                    msg: (o == d.BETRECEIPT ? l.BS_BetFailed : "") + " " + l[n.cerr],
                    domId: "bs_cerr_" + n.wid
                }));
                var u = "MultipleBets-row";
                o == d.BETRECEIPT && (u += " " + (n.cerr && "" != n.cerr ? "error" : "success"));
                var E = [];
                return E.push(i), 1 != n.wid && 1 == n.bc && (E.push(React.createElement("span", {
                    className: "mg-l-6"
                }, "@")), E.push(React.createElement("span", {
                    ref: "odds",
                    className: "mg-l-6 bold" + (o != d.BETRECEIPT ? " ft-c-51" : "") + (n.cerr && /^Odds_Changed/i.test(n.cerr) ? " highlight" : "")
                }, this.numberWithCommas(n.co)))), n.isew && o == d.BETRECEIPT ? E.push(React.createElement("span", {
                    className: "mg-l-6"
                }, "- ", l.BS_Title_Win)) : n.ispl && o == d.BETRECEIPT && E.push(React.createElement("span", {
                    className: "mg-l-6"
                }, "- ", l.BS_Title_Place)), React.createElement("div", null, React.createElement("div", {
                    className: u
                }, React.createElement("p", {
                    className: "pd-l-10 pd-r-10" + (o != d.BETRECEIPT ? " ft-c-27" : n.cerr && "" != n.cerr ? " ft-c-54" : " ft-c-48")
                }, E), React.createElement("div", {
                    className: " pd-l-10 pd-r-10" + (m ? "" : " pd-t-6")
                }, e), React.createElement("div", {
                    className: "clearfix"
                }), a, c), s, t, h)
            },
            _clickQuickBet: function (e) {
                Action.RightPanel.addComboStake(this.props.data.wid, e), this.refs.stake.focus()
            },
            _clearStake: function () {
                Action.RightPanel.updateComboStake(this.props.data.wid, null), this.refs.stake.focus()
            }
        }), r.betSlips.combobet.comboItem.eachway = React.createClass({
            displayName: "eachway",
            mixins: [r.Utility.format],
            render: function () {
                var e = this.props.wid,
                    t = this.props.isChecked,
                    a = this.props.toPlace ? this.props.toPlace : 0;
                return React.createElement("div", {
                    className: "eachway-row" + (t ? " checked" : "")
                }, React.createElement("div", {
                    className: "pos-relative mg-b-3"
                }, React.createElement("span", {
                    className: "checkbox-s radius t-va-m mg-r-9",
                    onClick: this.toggleComboEachWay.bind(this, e, !t)
                }, React.createElement("span", {
                    className: "icon-Iconbg"
                })), React.createElement("span", {
                    className: "dsp-iblk t-va-m"
                }, React.createElement("span", {
                    className: "dsp-blk ft-c-3"
                }, l.OP_EW_S)), React.createElement("span", {
                    className: "to-place" + (t && a && a > 0 ? " ft-c-52" : " ft-c-3")
                }, t && a && a > 0 ? this.numberWithCommas(a) : l.BS_Title_To_Place)))
            },
            toggleComboEachWay: function (e, t, a) {
                Action.RightPanel.toggleComboEachWay(e, t), a.stopPropagation(), a.preventDefault()
            }
        }), r.betSlips.total = React.createClass({
            displayName: "total",
            mixins: [r.Utility.format],
            render: function () {
                var e = this.props.totalBet,
                    t = parseFloat(this.props.totalStake),
                    a = this.props.totalPay,
                    c = this.props.cc;
                return React.createElement("div", {
                    className: "MultipleBetsTotal-row"
                }, React.createElement("p", {
                    className: "staketxt"
                }, React.createElement("span", {
                    className: "float-left"
                }, React.createElement("span", {
                    className: "ft-c-3"
                }, e), " " + (1 == e ? l.BS_Total_Bet : l.BS_Total_Bets) + ":"), React.createElement("span", {
                    className: "float-right number"
                }, React.createElement("span", {
                    ref: "stake"
                }, this.numberWithCommas(t)), " " + c)), React.createElement("p", {
                    className: "towintxt"
                }, React.createElement("span", {
                    className: "float-left"
                }, l.BS_Total_Payout), React.createElement("span", {
                    className: "float-right number"
                }, React.createElement("span", {
                    ref: "pay"
                }, this.numberWithCommas(a)), " " + c)), React.createElement("div", {
                    className: "clearfix"
                }))
            }
        }), r.betSlips.actions = {}, r.betSlips.actions.loggedIn = React.createClass({
            displayName: "loggedIn",
            render: function () {
                var e, t = this.props.data,
                    a = t.abo,
                    c = t.sbc,
                    n = t.berr;
                a && (e = React.createElement("span", {
                    className: "icon-check fts-12"
                }));
                var r = c ? this._showBetConfirm : this._placeBet;
                return React.createElement("div", {
                    className: "quickBetCheck"
                }, React.createElement("a", {
                    id: "btnPlaceBet_BS",
                    className: "BTN placebet-btn bold" + (t.needAcceptChange ? " orangeC" : " greenB"),
                    href: "javascript:void(0)",
                    onClick: r
                }, t.needAcceptChange ? l.BS_AcceptChange : 5555 == n ? l.LP_Ok : l.BS_Place_Bet), React.createElement(s.ScrollBarAnchor, null), React.createElement("a", {
                    id: "BSRemoveAll",
                    href: "javascript:void(0)",
                    className: "removeall",
                    onClick: this._removeAll
                }, l.BS_Remove_All), React.createElement("div", {
                    className: "selectItems has2Item"
                }, React.createElement("span", {
                    className: "ch1",
                    onClick: this._toggleAcceptBetterOdds.bind(this, !a)
                }, React.createElement("span", {
                    id: "bs_abo",
                    className: "cbx-container mg-r-4 dsp-iblk" + (a ? " selected" : "")
                }, React.createElement("span", {
                    className: "checkbox-s radius pos-relative t-va-m"
                }, e), l.BS_Accept_Better_Odds)), React.createElement("div", {
                    className: "clearfix"
                })))
            },
            _toggleAcceptBetterOdds: function (e) {
                Action.RightPanel.updateAcceptBetterOdds(e)
            },
            _toggleShoeBetConfirmation: function (e) {
                Action.RightPanel.updateShowBetConfirmation(e)
            },
            _showBetConfirm: function (e) {
                Action.RightPanel.placebetToBetConfirm()
            },
            _placeBet: function () {
                Action.RightPanel.placebetToBetReceipt()
            },
            _removeAll: function () {
                Action.RightPanel.emptyBetslip()
            }
        }), r.betSlips.actions.preLogIn = React.createClass({
            displayName: "preLogIn",
            render: function () {
                return React.createElement("div", {
                    className: "quickBetCheck"
                }, React.createElement("span", {
                    className: "logIn-sign"
                }, l.BS_Please_LogIn), React.createElement("a", {
                    className: "BTN orangeC logIn-btn bold m-b-10",
                    href: "javascript:void(0)",
                    onClick: this._handleClickJoin
                }, l.BS_Join), React.createElement("a", {
                    href: "javascript:void(0)",
                    className: "removeall join-btn",
                    onClick: this._removeAll
                }, l.BS_Remove_All), React.createElement("div", {
                    className: "clearfix"
                }))
            },
            _handleClickJoin: function (e) {
                var a = pm.parentHost();
                if (null != a && "" != a) {
                    var l = a + "/" + window.global.lan + (/TT_CASH/i.test(t.bu) ? "/user/register" : "/sign-up");
                    e.target.href = l, window.open(l, "_blank")
                }
                e.stopPropagation(), e.preventDefault()
            },
            _removeAll: function () {
                Action.RightPanel.emptyBetslip()
            }
        }), r.betSlips.actions.betConfirm = React.createClass({
            displayName: "betConfirm",
            render: function () {
                return React.createElement("div", {
                    className: "quickBetCheck"
                }, React.createElement("a", {
                    id: "btnConfirm_BS",
                    className: "BTN orangeB confirm-btn m-b-10",
                    href: "javascript:void(0)",
                    onClick: this._placeBet
                }, l.BS_Confirm), React.createElement("a", {
                    id: "btnCancel_BS",
                    className: "BTN grayB m-b-10",
                    href: "javascript:void(0)",
                    onClick: this._clickCancel
                }, l.BS_Cancel), React.createElement("div", {
                    className: "clearfix"
                }))
            },
            _placeBet: function (e) {
                Action.RightPanel.betConfirmToBetReceipt(), e.stopPropagation(), e.preventDefault()
            },
            _clickCancel: function (e) {
                Action.RightPanel.showPlacebet(), e.stopPropagation(), e.preventDefault()
            }
        }), r.betSlips.actions.betReceipt = React.createClass({
            displayName: "betReceipt",
            render: function () {
                var e, t = this.props.data.retainSelection;
                return t && (e = React.createElement("span", {
                    className: "icon-check fts-12"
                })), React.createElement("div", {
                    className: "quickBetCheck"
                }, React.createElement("div", {
                    className: "selectItems no-b-t"
                }, React.createElement("span", {
                    className: "ch1",
                    onClick: this._isRetainSelection
                }, React.createElement("span", {
                    className: "cbx-container mg-r-4 dsp-iblk"
                }, React.createElement("span", {
                    className: "checkbox-s radius pos-relative t-va-m"
                }, e), l.BS_Retain_Selection)), React.createElement("div", {
                    className: "clearfix"
                })), React.createElement("a", {
                    id: "btnOk_BS",
                    className: "BTN grayB m-b-10",
                    href: "javascript:void(0)",
                    onClick: this._clickOK
                }, l.LP_Ok), React.createElement("div", {
                    className: "clearfix"
                }))
            },
            _clickOK: function (e) {
                Action.RightPanel.betReceiptToPlacebet()
            },
            _isRetainSelection: function () {
                var e = this.props.data.retainSelection;
                Action.RightPanel.isRetainSelection(!e)
            }
        }), r.betSlips.errorMsg = React.createClass({
            displayName: "errorMsg",
            render: function () {
                var e = this.props.isGeneralMsg ? "bsGeneralMsg" : this.props.domId ? this.props.domId : "";
                return React.createElement("div", {
                    id: e,
                    className: "t-a-l fts-15 dsp-tb width-100p height-50" + (this.props.isComfirm ? " bg-c-51 ft-c-g" : this.props.isCancel ? " bg-c-r ft-c-r" : " bg-c-50") + (this.props.isPending ? " pendding-alertbar" : "")
                }, this.props.isPending ? null : React.createElement("div", {
                    className: "dsp-tbcl t-va-m pd-l-10 width-35"
                }, React.createElement("span", {
                    className: "fts-24 t-va-m" + (this.props.isComfirm ? " icon-CheckIcon ft-c-55" : this.props.isCancel ? " icon-cancel_r" : " icon-WarningIcon")
                })), React.createElement("div", {
                    className: "dsp-tbcl t-va-m pd-r-10" + (this.props.isPending ? " pd-l-10" : "")
                }, this.props.msg))
            }
        }), r.betSlips.notice = React.createClass({
            displayName: "notice",
            render: function () {
                return React.createElement("div", {
                    id: "bsGeneralMsg",
                    className: "fail-alertbar"
                }, React.createElement("span", null, this.props.msg))
            }
        }), r.betSlips.quickBet = React.createClass({
            displayName: "quickBet",
            mixins: [r.Utility.format],
            render: function () {
                var e, t = this.props.clickFN,
                    a = (this.props.max, this.props.st, this.props.max - (this.props.st ? this.props.st : 0)),
                    c = this.props.isSingle,
                    s = this.props.isCombo,
                    n = BS_Store.getQuickStake(this.props.isSingle, this.props.cc).map(function (e) {
                        var l = e > a;
                        return c && s && (l = !1), React.createElement(r.betSlips.quickBet.qbBtn, {
                            key: e,
                            clickFN: t,
                            val: e,
                            isGreyedOut: l
                        })
                    });
                return this.props.hideMax || (e = React.createElement("a", {
                    href: "javascript:void(0)",
                    className: "float-right maxBet",
                    onMouseOver: this._showMaxBetInfo.bind(this, !0),
                    onMouseOut: this._showMaxBetInfo.bind(this, !1)
                }, l.BS_Maxbet)), React.createElement("div", {
                    className: "quickBet"
                }, n, React.createElement("a", {
                    href: "javascript:void(0)",
                    className: "float-left edit",
                    onClick: this._clearStake
                }, l.BS_Clear), e, React.createElement(r.ddl, {
                    ref: "ddl"
                }, React.createElement("p", {
                    className: "text1 ft-c-22"
                }, l.BS_Maxbet + ": ", React.createElement("span", {
                    className: "bold ft-c-25"
                }, this.numberWithCommas(this.props.max) + " " + this.props.cc))), React.createElement("div", {
                    className: "clearfix"
                }))
            },
            _clearStake: function () {
                this.props.clearFN()
            },
            _showMaxBetInfo: function (e) {
                e ? this.refs.ddl.show() : this.refs.ddl.hide()
            }
        }), r.betSlips.quickBet.qbBtn = React.createClass({
            displayName: "qbBtn",
            mixins: [r.Utility.format],
            render: function () {
                var e = this.props.val,
                    t = this.props.isGreyedOut,
                    a = t ? this._emptyFunction.bind(this) : this._handleClick.bind(this, e);
                return React.createElement("button", {
                    className: t ? "disable" : "",
                    onClick: a
                }, "+" + this.numberWithCommas(e).split(".")[0])
            },
            _handleClick: function (e) {
                this.props.clickFN(parseFloat(e))
            },
            _emptyFunction: function () {}
        }), r.betSlips.parlayPopUp = React.createClass({
            displayName: "parlayPopUp",
            getInitialState: function () {
                return this._getDataFromStore()
            },
            componentDidMount: function () {
                this.refs.scrollbar.update(), PP_Store.addUpdateListener(this._onUpdate)
            },
            componentWillUnmount: function () {
                PP_Store.removeUpdateListener()
            },
            componentDidUpdate: function () {
                this.refs.scrollbar.update()
            },
            render: function () {
                var e = this.state.info,
                    t = this.state.parlayPopUpExpandRowIndex,
                    a = e[0],
                    l = 0,
                    c = _.drop(e, 1).map(function (e) {
                        var a = _.assign({
                            isActived: null != t && l == t,
                            idx: l
                        }, e);
                        return React.createElement(r.betSlips.parlayPopUp.collapseItem, {
                            key: "ppp_" + l++,
                            data: a
                        })
                    });
                return React.createElement("div", {
                    className: "hasScroll"
                }, React.createElement(s, {
                    ref: "scrollbar",
                    h: this.state.h,
                    w: this.state.w,
                    always: !1,
                    offset: 0,
                    top: 4,
                    disable: this.state.disableScrollbar,
                    ieMaxHeight: !0
                }, React.createElement("div", {
                    className: "dropDownContainer"
                }, React.createElement("dl", null, React.createElement("dt", {
                    className: "height-40 lht-40 uppercase"
                }, a.t, React.createElement("span", {
                    className: "icon icon-removeIcon closeicon",
                    onClick: this._closeFSB
                })), React.createElement("dd", {
                    className: "fts-13"
                }, a.c)), React.createElement("ul", null, c))))
            },
            _getDataFromStore: function () {
                return PP_Store.getData()
            },
            _onUpdate: function () {
                this.setState(this._getDataFromStore())
            },
            _closeFSB: function () {
                Action.FullScreenBlock.hide()
            }
        }), r.betSlips.parlayPopUp.collapseItem = React.createClass({
            displayName: "collapseItem",
            render: function () {
                var e = this.props.data,
                    t = e.idx,
                    a = [];
                if (0 == t) a.push(React.createElement("p", {
                    className: "listtitle",
                    key: "ppp_ci_" + t + "_0"
                }, e.c[0])), a.push(React.createElement("p", {
                    className: "listtitle",
                    key: "ppp_ci_" + t + "_1"
                }, e.c[1])), a.push(React.createElement("p", {
                    className: "listtitle",
                    key: "ppp_ci_" + t + "_2"
                }, e.c[2])), a.push(React.createElement("div", {
                    key: "ppp_" + t + "_3#4",
                    className: "egbox"
                }, React.createElement("p", null, e.c[3]), React.createElement("p", null, e.c[4]))), a.push(React.createElement("p", {
                    className: "listtitle",
                    key: "ppp_" + t + "_5"
                }, e.c[5]));
                else
                    for (var l = 0; l < e.c.length; l++) a.push(React.createElement("p", {
                        className: "listtitle",
                        key: "ppp_" + t + "_" + l
                    }, e.c[l]));
                var c;
                return e.isActived && (c = React.createElement("div", {
                    className: "licontent fts-13"
                }, a)), React.createElement("li", null, React.createElement("div", {
                    onClick: this._toggleCollapsed
                }, React.createElement("span", {
                    className: "icon-aw " + (e.isActived ? "icon-ArrowUp" : "icon-ArrowDown")
                }), React.createElement("span", {
                    className: "uppercase"
                }, e.t)), c)
            },
            _toggleCollapsed: function () {
                this.props.data.isActived ? Action.RightPanel.collapsedRow() : Action.RightPanel.expandRow(this.props.data.idx)
            }
        }), r.betSlips.eachWayPopUp = React.createClass({
            displayName: "eachWayPopUp",
            getInitialState: function () {
                return this._getDataFromStore()
            },
            componentDidMount: function () {
                this.refs.scrollbar.update(), EWP_Store.addUpdateListener(this._onUpdate)
            },
            componentWillUnmount: function () {
                EWP_Store.removeUpdateListener()
            },
            componentDidUpdate: function () {
                this.refs.scrollbar.update()
            },
            render: function () {
                var e = this.state.info,
                    t = this.state.eachWayPopUpExpandRowIndex,
                    a = e[0],
                    l = 0,
                    c = _.drop(e, 1).map(function (e) {
                        var a = _.assign({
                            isActived: null != t && l == t,
                            idx: l
                        }, e);
                        return React.createElement(r.betSlips.eachWayPopUp.collapseItem, {
                            key: "ewpp_" + l++,
                            data: a
                        })
                    });
                return React.createElement("div", {
                    className: "hasScroll"
                }, React.createElement(s, {
                    ref: "scrollbar",
                    h: this.state.h,
                    w: this.state.w,
                    always: !1,
                    offset: 0,
                    top: 4,
                    disable: this.state.disableScrollbar,
                    ieMaxHeight: !0
                }, React.createElement("div", {
                    className: "dropDownContainer"
                }, React.createElement("dl", null, React.createElement("dt", {
                    className: "height-40 lht-40 uppercase"
                }, a.t, React.createElement("span", {
                    className: "icon icon-removeIcon closeicon",
                    onClick: this._closeFSB
                })), React.createElement("dd", {
                    className: "fts-13",
                    dangerouslySetInnerHTML: {
                        __html: a.c
                    }
                })), React.createElement("ul", null, c))))
            },
            _getDataFromStore: function () {
                return EWP_Store.getData()
            },
            _onUpdate: function () {
                this.setState(this._getDataFromStore())
            },
            _closeFSB: function () {
                Action.FullScreenBlock.hide()
            }
        }), r.betSlips.eachWayPopUp.collapseItem = React.createClass({
            displayName: "collapseItem",
            render: function () {
                var e, t = this.props.data;
                t.idx;
                return t.isActived && (e = React.createElement("div", {
                    className: "licontent fts-13",
                    dangerouslySetInnerHTML: {
                        __html: t.c
                    }
                })), React.createElement("li", null, React.createElement("div", {
                    onClick: this._toggleCollapsed
                }, React.createElement("span", {
                    className: "icon-aw " + (t.isActived ? "icon-ArrowUp" : "icon-ArrowDown")
                }), React.createElement("span", {
                    className: "uppercase"
                }, t.t)), e)
            },
            _toggleCollapsed: function () {
                this.props.data.isActived ? Action.RightPanel.collapsedRow() : Action.RightPanel.expandRow(this.props.data.idx)
            }
        }), r.ddl = React.createClass({
            displayName: "ddl",
            render: function () {
                return React.createElement("div", {
                    className: "dropdown hidden",
                    ref: "ddl"
                }, React.createElement("span", {
                    className: "cick"
                }), this.props.children)
            },
            show: function () {
                $(this.refs.ddl.getDOMNode()).removeClass("hidden")
            },
            hide: function () {
                $(this.refs.ddl.getDOMNode()).addClass("hidden")
            }
        }), r.infoddl = React.createClass({
            displayName: "infoddl",
            mixins: [r.Utility.format],
            render: function () {
                var e, t = this.props.data,
                    a = t.cn,
                    c = t.h,
                    s = t.a,
                    n = t.isDisplayScore,
                    i = t.edt;
                t.ip && !t.isReceipt || null == i || (e = React.createElement("p", {
                    className: "datetime"
                }, this.formatEventDate(i)));
                var o, d = t.hs,
                    m = t.as;
                n && (o = React.createElement("span", {
                    className: "text-orange"
                }, " (" + d + "-" + m + ")"));
                var p;
                t.ip && !t.isReceipt && null != d && null != m && (p = React.createElement("p", {
                    className: "datetime"
                }, l.LP_Inplay, o));
                var h;
                null != c && null != s && (h = React.createElement("p", {
                    className: "text1 ft-c-22"
                }, c, React.createElement("span", {
                    className: "text-orange"
                }, " v "), s));
                var u;
                return null != t.en && (u = React.createElement("p", {
                    className: "text1 ft-c-22"
                }, t.en)), React.createElement(r.ddl, {
                    ref: "ddl"
                }, React.createElement("p", {
                    className: "dp-title bold"
                }, a), h, u, e, p, this.props.children)
            },
            show: function () {
                this.refs.ddl.show()
            },
            hide: function () {
                this.refs.ddl.hide()
            }
        }), r.epmInfoddl = React.createClass({
            displayName: "epmInfoddl",
            mixins: [r.Utility.format],
            render: function () {
                var e = this.props.data,
                    t = e.iscc,
                    a = (e.dt, e.ril);
                return React.createElement(r.ddl, {
                    ref: "ddl"
                }, a && a.map(function (e, a) {
                    if (e.isor) return [React.createElement("p", {
                        key: "bs_epm_ddlinfo_ril_" + e.sn + "_" + a,
                        className: "dp-title textInitial bold" + (0 !== a ? " pd-t-5" : "")
                    }, e.sn), t ? React.createElement("p", {
                        key: "bs_epm_ddlinfo_ril_" + e.cn + "_" + a,
                        className: "text1 ft-c-22"
                    }, e.cn) : null, React.createElement("p", {
                        key: "bs_epm_ddlinfo_ril_" + e.rn + "_" + a,
                        className: "text1 ft-c-22"
                    }, e.rn), React.createElement("p", {
                        key: "bs_epm_ddlinfo_ril_" + e.rd + "_" + e.rt + "_" + a,
                        className: "text1 ft-c-22"
                    }, e.rd, " ", e.rt)];
                    var l = e.rn.split("-v-");
                    return l.length < 2 ? null : [React.createElement("p", {
                        key: "bs_epm_ddlinfo_ril_" + e.sn + "_" + a,
                        className: "dp-title textInitial bold" + (0 !== a ? " pd-t-5" : "")
                    }, e.sn), t ? React.createElement("p", {
                        key: "bs_epm_ddlinfo_ril_" + e.cn + "_" + a,
                        className: "text1 ft-c-22"
                    }, e.cn) : null, React.createElement("p", {
                        key: "bs_epm_ddlinfo_ril_" + e.rn + "_" + a,
                        className: "text1 ft-c-22"
                    }, React.createElement("span", null, l[0]), React.createElement("span", {
                        className: "text-orange"
                    }, " v "), React.createElement("span", null, l[1])), React.createElement("p", {
                        key: "bs_epm_ddlinfo_ril_" + e.rd + "_" + e.rt + "_" + a,
                        className: "text1 ft-c-22"
                    }, e.rd, " ", e.rt)]
                }), this.props.children)
            },
            show: function () {
                this.refs.ddl.show()
            },
            hide: function () {
                this.refs.ddl.hide()
            }
        }), r.betSlips.loading = React.createClass({
            displayName: "loading",
            render: function () {
                return React.createElement("div", {
                    className: "cover"
                }, React.createElement("div", {
                    className: "fail-alertbar hascover"
                }, l.BS_Proccessing))
            }
        }), r.myBet = React.createClass({
            displayName: "myBet",
            mixins: [r.Utility.scrollbarUpdate],
            getInitialState: function () {
                return this._getDataFromStore()
            },
            componentDidMount: function () {
                MB_Store.addUpdateListener(this._onUpdate), this.props.isPopUp && Action.RightPanel.resizeFrame()
            },
            componentDidUpdate: function () {
                if (this.state.myBetData.aul.length > 0) {
                    clearTimeout(r.dangerTimer);
                    var e = this.state.extraData.dangerStatus,
                        t = _.pluck(_.filter(this.state.myBetData.aul, {
                            nr: !0
                        }), "id");
                    if (e && e.f) {
                        var a = _.pluck(_.filter(e.t, "ts", 0), "bid");
                        a.length > 0 ? r.dangerTimer = setTimeout(function () {
                            Action.RightPanel.fetchDangerStatus(a, "mybet")
                        }, 3e3) : t.length != a.length && Action.RightPanel.refreshMyBet()
                    } else t && t.length > 0 && !e && (r.dangerTimer = setTimeout(function () {
                        Action.RightPanel.fetchDangerStatus(t, "mybet")
                    }, 3e3))
                }
                this.props.isPopUp && Action.RightPanel.resizeFrame()
            },
            render: function () {
                var e = this.state.myBetData,
                    t = this.props.updateScrollBarFN,
                    a = {
                        aul: e.aul,
                        ipul: e.ipul,
                        c: e.uc,
                        extraData: this.state.extraData,
                        updateScrollBarFN: t,
                        ds: e.ds
                    },
                    l = {
                        data: e.sl,
                        c: e.sc,
                        extraData: this.state.extraData,
                        updateScrollBarFN: t
                    };
                return React.createElement("div", null, React.createElement(r.myBet.unsettleBet, {
                    data: a
                }), React.createElement(r.myBet.settledBet, {
                    data: l
                }))
            },
            _getDataFromStore: function () {
                return {
                    myBetData: MB_Store.getData(),
                    extraData: MB_Store.getExtraData()
                }
            },
            _onUpdate: function () {
                this.setState(this._getDataFromStore())
            }
        }), r.myBet.unsettleBet = React.createClass({
            displayName: "unsettleBet",
            mixins: [r.Utility.scrollbarUpdate],
            getInitialState: function () {
                return {
                    activeAllTab: !0
                }
            },
            componentDidUpdate: function () {
                this.props.data.updateScrollBarFN()
            },
            _refreshMyBet: function () {
                Action.RightPanel.refreshMyBet()
            },
            render: function () {
                var e, t, a = this.props.data,
                    c = a.aul,
                    s = a.ipul,
                    n = this.state.activeAllTab;
                0 == c.length && (e = React.createElement(r.myBet.emptyBetItem, {
                    isSettled: !1,
                    isInplay: !1
                })), 0 == s.length && (t = React.createElement(r.myBet.emptyBetItem, {
                    isSettled: !1,
                    isInplay: !0
                }));
                for (var i = [], o = 0; o < c.length; o++) {
                    var d = c[o],
                        m = d.id;
                    i.push(React.createElement(r.myBet.betItem, {
                        last: o + 1 == c.length,
                        key: m,
                        data: d,
                        showLargeInfo: d.id == a.extraData.showParlayInfo,
                        dangerStatus: a.extraData.dangerStatus
                    }))
                }
                for (var p = [], o = 0; o < s.length; o++) {
                    var d = s[o];
                    if (d.c) return null;
                    var m = d.id;
                    p.push(React.createElement(r.myBet.betItem, {
                        last: o + 1 == s.length,
                        key: m,
                        data: d,
                        showLargeInfo: d.id == a.extraData.showParlayInfo,
                        dangerStatus: a.extraData.dangerStatus
                    }))
                }
                var h, u;
                i.length >= 20 && (h = React.createElement(r.myBet.viewMore, null)), p.length >= 20 && (u = React.createElement(r.myBet.viewMore, null));
                var E = a.extraData.isOpenUnsettled,
                    R = a.c;
                R = +R > 99 ? "99+" : R;
                var g = !a.extraData.dangerStatus || a.extraData.dangerStatus.f && 0 == a.extraData.dangerStatus.rc ? null : React.createElement("td", {
                    className: "pd-r-3"
                }, React.createElement("a", {
                    href: "javascript:void(0)",
                    onClick: this._refreshMyBet,
                    className: "fontWeight-normal float-right icon icon-RefreshIcon"
                }));
                return React.createElement("div", {
                    className: "titlebar unsettled"
                }, React.createElement("div", {
                    className: "cr-pointer",
                    onClick: this._toggleContent
                }, React.createElement("div", {
                    className: "title uppercase"
                }, l.MyAcc_BetHistory_UnsettledBets), React.createElement("span", {
                    className: "ballbox"
                }, React.createElement("span", {
                    className: "circles-number bold"
                }, R)), React.createElement("span", {
                    className: "icon " + (E ? "icon-ArrowUp" : "icon-ArrowDown")
                })), React.createElement("div", {
                    ref: "content",
                    className: E ? "" : "hidden"
                }, React.createElement("table", {
                    className: "submenutab tabs tb-auto width-100p"
                }, React.createElement("colgroup", null, React.createElement("col", null), React.createElement("col", null), React.createElement("col", {
                    className: "width-36"
                })), React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", {
                    className: n ? "active" : "",
                    onClick: this._switchTab.bind(this, !0)
                }, l.MyBet_All), React.createElement("td", {
                    className: n ? "" : "active",
                    onClick: this._switchTab.bind(this, !1)
                }, l.MyBet_Inplay_Now), g))), React.createElement("div", {
                    className: "BetreceiptContent"
                }, React.createElement("div", {
                    className: n ? "" : "hidden"
                }, e, i, h), React.createElement("div", {
                    className: n ? "hidden" : ""
                }, t, p, u))))
            },
            _switchTab: function (e) {
                this.state.activeAllTab = e, this.setState(this.state)
            },
            _toggleContent: function () {
                var e = this.props.data.extraData.isOpenUnsettled,
                    t = $(this.refs.content.getDOMNode());
                e ? t.slideUp(function () {
                    Action.RightPanel.toggleUnsettled(!1)
                }) : t.slideDown(function () {
                    Action.RightPanel.toggleUnsettled(!0)
                })
            }
        }), r.myBet.infoddl = {}, r.myBet.infoddl.single = React.createClass({
            displayName: "single",
            mixins: [r.Utility.format],
            render: function () {
                var e = this.props.data,
                    t = e.betId,
                    a = e.pdt,
                    c = e.en,
                    s = this.props.data,
                    n = s.isEpm,
                    i = s.ril,
                    o = s.iscc,
                    d = {
                        cn: e.cn,
                        h: e.h,
                        a: e.a,
                        edt: e.edt
                    };
                return null != c && (d.en = c), n ? (d = {
                    ril: i,
                    iscc: o
                }, React.createElement(r.epmInfoddl, {
                    data: d,
                    ref: "ddl"
                }, React.createElement("p", {
                    className: "p-betID"
                }, l.BetNo, React.createElement("span", {
                    className: "bold"
                }, " " + t)))) : React.createElement(r.infoddl, {
                    data: d,
                    ref: "ddl"
                }, React.createElement("p", {
                    className: "p-betID"
                }, l.BetNo, React.createElement("span", {
                    className: "bold"
                }, " " + t)), React.createElement("p", {
                    className: "p-placed"
                }, l.Wager_BetDate, React.createElement("span", {
                    className: "bold"
                }, this.formatPlaceDate(a))))
            },
            show: function () {
                this.refs.ddl.show()
            },
            hide: function () {
                this.refs.ddl.hide()
            }
        }), r.myBet.infoddl.parlay = React.createClass({
            displayName: "parlay",
            mixins: [r.Utility.format],
            render: function () {
                var e = this.props.data,
                    t = e.cn,
                    a = e.sls,
                    c = e.betId,
                    s = e.pdt,
                    n = [];
                _.forEach(a, function (e, t) {
                    n.push(React.createElement(r.myBet.infoddl.parlay.content, {
                        key: "info_" + t,
                        data: e
                    }))
                });
                var i, o;
                return e.showLarge ? o = React.createElement("div", {
                    className: "betSummary"
                }, React.createElement("span", {
                    className: "iconbox removebtn",
                    onClick: this.closeInfo
                }, React.createElement("a", {
                    href: "javascript:void(0)",
                    className: "icon icon-removeIcon"
                })), React.createElement("div", {
                    className: "Summary-title uppercase"
                }, l.BS_Bet + " " + l.MyBet_Summary), React.createElement("div", {
                    className: "Summary-subtitle uppercase"
                }, l.MyBet_Parlay), n, React.createElement("div", {
                    className: "content"
                }, React.createElement("p", {
                    className: "p-betID"
                }, l.BetNo, React.createElement("span", {
                    className: "bold"
                }, " " + c)), React.createElement("p", {
                    className: "p-placed"
                }, l.Wager_BetDate, React.createElement("span", {
                    className: "bold"
                }, this.formatPlaceDate(s))))) : i = React.createElement("div", null, React.createElement("span", {
                    className: "cick"
                }), React.createElement("p", {
                    className: "dp-title bold"
                }, t), React.createElement("p", {
                    className: "p-betID"
                }, l.BetNo, React.createElement("span", {
                    className: "bold"
                }, " " + c)), React.createElement("p", {
                    className: "p-placed"
                }, l.Wager_BetDate, React.createElement("span", {
                    className: "bold"
                }, this.formatPlaceDate(s))), React.createElement("p", {
                    className: "ft-txt text-orange"
                }, l.BS_ViewDetailInfo)), React.createElement("div", {
                    className: "dropdown " + (e.showLarge ? "" : "hidden"),
                    ref: "main"
                }, i, o)
            },
            show: function () {
                $(this.refs.main.getDOMNode()).removeClass("hidden")
            },
            hide: function () {
                $(this.refs.main.getDOMNode()).addClass("hidden")
            },
            closeInfo: function () {
                Action.RightPanel.toggleParlayInfo(null)
            }
        }), r.myBet.infoddl.parlay.content = React.createClass({
            displayName: "content",
            mixins: [r.Utility.format, r.Utility.outright],
            render: function () {
                var e, t = this.props.data,
                    a = t.bi,
                    l = t.h,
                    c = t.a,
                    s = t.edt;
                return e = t.e && t.nm ? React.createElement("p", {
                    className: "text1 ft-c-22"
                }, t.en) : React.createElement("p", {
                    className: "text1 ft-c-22"
                }, l, React.createElement("span", {
                    className: "text-orange"
                }, " v "), c), React.createElement("div", {
                    className: "content"
                }, React.createElement("p", {
                    className: "dp-title bold"
                }, a), e, React.createElement("p", {
                    className: "text1 ft-c-22"
                }, t.t + (t.ip ? " " + (t.s ? t.s : "") : "")), React.createElement("p", {
                    className: "text1 ft-c-25"
                }, React.createElement("span", {
                    className: "name1"
                }, t.sn + " "), React.createElement("span", {
                    className: "bold hh-b"
                }, t.hd), React.createElement("span", {
                    className: "at"
                }, " @ "), React.createElement("span", {
                    className: "bold hh-b",
                    ref: "odds"
                }, t.od)), React.createElement("p", {
                    className: "datetime"
                }, this.formatEventDate(s)))
            }
        }), r.myBet.betItem = React.createClass({
            displayName: "betItem",
            mixins: [r.Utility.outright],
            render: function () {
                var e, t, a = this.props.data,
                    c = "betslip-row",
                    s = this.props.isSettled;
                a.nr ? c += s ? " error" : " pending" : "Wager_Draw" == a.st ? c += " cancelPanel" : a.nc ? c += a.d ? " error" : " cancelPanel" : c += " success", this.props.last && (c += " reomveborder");
                var n = a.t;
                if (!a.c) {
                    var i = a.l[0];
                    n += i.ip && i.s ? " " + i.s : ""
                }
                switch (a.isEpm && (n = l.EPM.EPM), a.wt) {
                    case "1":
                        n += " - " + l.BS_Title_Win;
                        break;
                    case "2":
                        n += " - " + l.BS_Title_Place
                }
                t = {
                    nr: a.nr,
                    nc: a.nc,
                    isSettled: s,
                    wr: a.wr,
                    st: a.st,
                    d: a.d
                }, (s || null != a.wr || a.nr && !s) && (e = React.createElement(r.myBet.betItem.status, {
                    data: t
                }));
                var o;
                o = a.c ? React.createElement(r.myBet.infoddl.parlay, {
                    data: this._getInfoProps(a),
                    ref: "info"
                }) : React.createElement(r.myBet.infoddl.single, {
                    data: this._getInfoProps(a),
                    ref: "info"
                });
                var d;
                !s && a.nr && (d = React.createElement("span", {
                    className: "float-right loading-o"
                }), !this.props.dangerStatus || this.props.dangerStatus.f && 0 == this.props.dangerStatus.rc || (d = React.createElement("a", {
                    href: "javascript:void(0)",
                    onClick: this._refreshMyBet,
                    className: "float-right icon icon-RefreshIcon"
                })));
                var m = a.l.map(function (e) {
                    return React.createElement(r.myBet.betItem.betData, {
                        key: "mb_" + a.id + "_" + e.eid,
                        data: {
                            sl: e,
                            c: a.c,
                            t: a.c ? e.t : a.t,
                            set: s,
                            isEpm: a.isEpm,
                            dil: a.dil,
                            dt: a.dt
                        }
                    })
                });
                return React.createElement("div", {
                    id: "tt_" + a.id,
                    className: c,
                    ref: "betEntry"
                }, o, d, React.createElement("span", {
                    className: "iconbox",
                    onClick: this._extendParlayInfo,
                    onMouseOver: this._showInfo.bind(this, !0),
                    onMouseOut: this._showInfo.bind(this, !1)
                }, React.createElement("a", {
                    href: "javascript:void(0)",
                    className: "icon icon-i-s"
                })), React.createElement("span", {
                    className: "bettitle"
                }, n), m, React.createElement("div", {
                    className: "pd-b-6 pd-l-10 pd-r-10 over-hidden" + (a.l.length > 1 ? " pd-t-10" : "")
                }, React.createElement(r.betSlips.stake.confirmBet, {
                    isReceipt: !0,
                    st: a.s,
                    towin: a.nc || "Wager_Draw" == a.st ? "--" : s ? a.tf : a.ep,
                    isSettled: !!s
                })), React.createElement("div", {
                    className: "clearfix"
                }), e)
            },
            _refreshMyBet: function () {
                Action.RightPanel.refreshMyBet()
            },
            _getInfoProps: function (e) {
                if (e.c) return {
                    cn: e.t,
                    sls: e.l,
                    betId: e.id,
                    pdt: e.pdt,
                    showLarge: this.props.showLargeInfo
                };
                var t = e.l[0],
                    a = {
                        cn: e.cn,
                        edt: t.edt,
                        betId: e.id,
                        pdt: e.pdt,
                        isEpm: e.isEpm
                    };
                return t.e && t.nm ? a.en = t.en : (a.h = t.h, a.a = t.a), e.isEpm && (a.ril = e.ril, a.iscc = e.iscc), a
            },
            _showInfo: function (e) {
                this.props.data.c && this.props.showLargeInfo || (e ? this.refs.info.show() : this.refs.info.hide())
            },
            _extendParlayInfo: function () {
                var e = this.props.data;
                e.c && Action.RightPanel.toggleParlayInfo(e.id)
            }
        }), r.myBet.betItem.betData = React.createClass({
            displayName: "betData",
            mixins: [r.Utility.format, r.Utility.outright, r.Utility.link],
            render: function () {
                var e, t, a, l = this.props.data,
                    c = l.sl,
                    s = l.c,
                    n = (l.t, this.props.data),
                    r = n.isEpm,
                    i = n.dt,
                    o = n.dil;
                c.e && c.nm ? (a = React.createElement("p", null, c.en), t = React.createElement("p", null, c.m)) : e = React.createElement("p", {
                    className: "cr-pointer",
                    onClick: this._linkToMoreBet
                }, c.h + " ", React.createElement("span", null, " v "), c.a), r && o && o.length > 0 && (e = [], e = o.map(function (e, t) {
                    switch (i) {
                        case 1:
                            var a = e.split("-v-");
                            return a.length < 2 ? null : React.createElement("p", {
                                key: "be_betdata_dil_" + e + "_" + t,
                                className: "cr-pointer"
                            }, a[0] + " ", React.createElement("span", null, " v "), a[1]);
                        case 2:
                        case 3:
                            return React.createElement("p", {
                                key: "be_betdata_dil_" + e + "_" + t,
                                className: "cr-pointer"
                            }, e)
                    }
                }), t = null, a = null);
                var d, m;
                return s && (d = React.createElement("p", null, c.t), m = React.createElement("span", {
                    className: "ft-line"
                })), React.createElement("div", {
                    className: "db-group"
                }, d, React.createElement("p", {
                    className: "big-txt"
                }, React.createElement("span", {
                    className: "name1"
                }, (r ? c.m : c.sn) + " "), React.createElement("span", {
                    className: "bold hh-b"
                }, c.hd), React.createElement("span", {
                    className: "at"
                }, " @ "), React.createElement("span", {
                    className: "bold hh-b",
                    ref: "odds"
                }, c.od)), e, a, t, m)
            },
            _linkToMoreBet: function () {
                if (!this.props.data.set) {
                    var e = this.props.data.sl,
                        t = this._getMorebetLink(e.eid, e.vt, e.en);
                    Action.LoadSite(t)
                }
            }
        }), r.myBet.betItem.status = React.createClass({
            displayName: "status",
            render: function () {
                var e, t = this.props.data,
                    a = t.isSettled,
                    c = t.wr,
                    s = "danger-text" + (t.nr ? " text-red" : t.nc || "Wager_Draw" == t.st ? " text-black" : " text-green"),
                    n = t.d ? "text-red" : "text-black";
                e = a && t.d && t.nc ? React.createElement("span", {
                    className: "text-red danger-text pd-t-5"
                }, l.BetStatus_REJECTED) : a ? l[t.st] : t.nr ? l.BetStatus_PENDING : l.BetStatus_CONFIRM;
                var r = [];
                return null == c || t.d || (r.push(React.createElement("span", {
                    key: "mb_st_i",
                    className: "hidden icon icon-l-more dp-alert " + s,
                    ref: "wr",
                    onMouseOver: this._toggleWagerReason.bind(this, !0),
                    onMouseOut: this._toggleWagerReason.bind(this, !1)
                })), r.push(React.createElement("span", {
                    key: "mb_st_t",
                    className: "tooltip " + n
                }, c))), React.createElement("p", {
                    className: s
                }, e, r)
            },
            _toggleWagerReason: function (e) {
                e ? $(this.refs.wr.getDOMNode()).removeClass("hidden") : $(this.refs.wr.getDOMNode()).addClass("hidden")
            }
        }), r.myBet.settledBet = React.createClass({
            displayName: "settledBet",
            mixins: [r.Utility.scrollbarUpdate],
            render: function () {
                var e, t = this.props.data,
                    a = t.data;
                0 == a.length && (e = React.createElement(r.myBet.emptyBetItem, {
                    isSettled: !0
                }));
                var c, s = t.extraData.isOpenSettled,
                    n = a.map(function (e) {
                        var a = e.id;
                        return React.createElement(r.myBet.betItem, {
                            key: a,
                            data: e,
                            isSettled: !0,
                            showLargeInfo: e.id == t.extraData.showParlayInfo
                        })
                    });
                return a.length > 19 && (c = React.createElement(r.myBet.viewMore, {
                    set: !0
                })), React.createElement("div", {
                    className: "titlebar unsettled"
                }, React.createElement("div", {
                    className: "cr-pointer",
                    onClick: this._toggleContent
                }, React.createElement("div", {
                    className: "title uppercase"
                }, l.MyAcc_BetHistory_SettledBets, React.createElement("br", null), React.createElement("span", {
                    className: "smallfont"
                }, l.MyBet_Last24HR)), React.createElement("span", {
                    className: "ballbox"
                }, React.createElement("span", {
                    className: "circles-number bold"
                }, t.c)), React.createElement("span", {
                    className: "icon " + (s ? "icon-ArrowUp" : "icon-ArrowDown")
                })), React.createElement("div", {
                    ref: "content",
                    className: "BetreceiptContent" + (s ? "" : " hidden")
                }, e, n, c))
            },
            _toggleContent: function () {
                var e = this.props.data.extraData.isOpenSettled,
                    t = $(this.refs.content.getDOMNode());
                e ? t.slideUp(function () {
                    Action.RightPanel.toggleSettled(!1)
                }) : t.slideDown(function () {
                    Action.RightPanel.toggleSettled(!0)
                })
            }
        }), r.myBet.emptyBetItem = React.createClass({
            displayName: "emptyBetItem",
            render: function () {
                return React.createElement("div", {
                    className: "betslipNoContent"
                }, this.props.isSettled ? l.MyBet_No_Settled_Bets : this.props.isInplay ? l.MyBet_No_Inplay_Unsettled_Bets : l.MyBet_No_Unsettled_Bets)
            }
        }), r.myBet.viewMore = React.createClass({
            displayName: "viewMore",
            mixins: [r.Utility.link],
            render: function () {
                var e = this.props.set ? l.MyBet_ViewAllSettledBets : l.MyBet_ViewAllUnsettledBets;
                return React.createElement("div", {
                    className: "viewmore",
                    onClick: this._redirectStatementPage
                }, e)
            },
            _redirectStatementPage: function (e) {
                var t = this.props.set,
                    a = t ? this._getSettledLink() : this._getUnSettledLink(),
                    l = {
                        id: "account",
                        height: 610,
                        width: 1020,
                        resizable: "yes",
                        scroll: "yes"
                    };
                Action.PopupNewWin(l, a)
            }
        }), r.banner = React.createClass({
            displayName: "banner",
            mixins: [r.Utility.scrollbarUpdate],
            getInitialState: function () {
                return this._getDataFromStore()
            },
            componentDidMount: function () {
                RB_Store.addUpdateListener(this._onUpdate)
            },
            render: function () {
                var e = this.state;
                return React.createElement("div", {
                    className: e.height <= 0 ? "" : "bannerbox"
                }, React.createElement("div", {
                    className: "ad"
                }, React.createElement("iframe", {
                    src: e.url,
                    height: e.height,
                    width: "100%",
                    scrolling: "no",
                    frameBorder: "0",
                    allowTransparency: "true"
                })))
            },
            _getDataFromStore: function () {
                return RB_Store.getData()
            },
            _onUpdate: function () {
                this.setState(this._getDataFromStore())
            }
        }), e.exports = r
    }).call(t, a(7))
}, function (e, t) {
    var a;
    a = function () {
        return this
    }();
    try {
        a = a || Function("return this")() || (0, eval)("this")
    } catch (e) {
        "object" == typeof window && (a = window)
    }
    e.exports = a
}, function (e, t, a) {
    "use strict";
    var c = Object.assign || function (e) {
        for (var t = 1; t < arguments.length; t++) {
            var a = arguments[t];
            for (var l in a) Object.prototype.hasOwnProperty.call(a, l) && (e[l] = a[l])
        }
        return e
    };
    LPM.createClass("Sport", {
        mixins: ["longNameTooltipMixin"],
        componentDidMount: function () {
            this.setState({
                sn: this.getDisplayName(this.props.s.sn, "s")
            })
        },
        componentWillReceiveProps: function (e) {
            this.setState({
                sn: this.getDisplayName(e.s.sn, "s")
            })
        },
        render: function () {
            var e, t = this.props.count;
            return LPM.view == VIEW.INPLAY && (-1 == this.props.s.sid ? t = LPM.store.LeftPanel.state.tipc : 1 == this.props.s.sid && (t = LPM.store.LeftPanel.state.ipFB.ipc)), 0 == t ? null : (this.props.showCount && (e = React.createElement("span", {
                className: classNames("badge", {
                    on: this.props.active,
                    off: !this.props.active
                }),
                title: l.LP_NumberOfInplayEvents
            }, t)), React.createElement("li", {
                className: classNames("has-menu-c", {
                    active: this.props.active
                }),
                onClick: this.select,
                onContextMenu: this.selectRightClick
            }, React.createElement("a", {
                className: "menu-T"
            }, React.createElement("span", null, this.state.sn)), React.createElement(LeftPanel.Icon, {
                sid: this.props.s.sid,
                sn: this.props.s.sn,
                showCount: this.props.showCount
            }), e))
        },
        select: function () {
            Action.LeftPanel.sport(this.props.s, LPM.view)
        },
        selectRightClick: function (e) {
            e.preventDefault(), e.stopPropagation(), Action.LeftPanel.sportRightClick(this.props.s, LPM.view)
        }
    }), LPM.createClass("ViewAllBtn", {
        getDefaultProps: function () {
            return {
                onClick: function () {}
            }
        },
        render: function () {
            return React.createElement("li", {
                id: "viewmore",
                onClick: this.props.onClick
            }, React.createElement("a", null, l.LP_View_All))
        }
    }), LPM.createClass("ExpandableSport", {
        mixins: ["expandMixin", "longNameTooltipMixin"],
        componentDidMount: function () {
            this.setState({
                sn: this.getDisplayName(this.props.d.sn, "s")
            })
        },
        componentWillReceiveProps: function (e) {
            this.setState({
                sn: this.getDisplayName(e.d.sn, "s")
            })
        },
        render: function () {
            var e = this.props.d,
                t = this.props.actives,
                a = {},
                c = this.isSelected();
            this.props.viewAll && this.props.viewAll[e.sid] && (a = this.props.viewAll[e.sid]);
            var s = null,
                n = e.puc,
                r = this.props.count;
            if (1 == e.sid && LPM.view == VIEW.INPLAY && (n = LPM.store.LeftPanel.state.ipFB.puc, r = LPM.store.LeftPanel.state.ipFB.ipc), !LPM.collapsed) var s = React.createElement("ul", {
                ref: "expandObj",
                style: this.getExpandStyle()
            }, LPM.collapsed ? React.createElement("li", {
                className: "has-menu-t"
            }, React.createElement("a", {
                className: "menu-T"
            }, React.createElement("span", null, this.state.sn)), React.createElement("a", {
                className: "icon icon-removeIcon closeicon",
                onClick: this.expand
            })) : null, _.map(_.filter(n), function (l) {
                if (!l.ces || 0 == l.ces.length) return null;
                var c = {
                    actives: t,
                    d: l,
                    key: l.cid,
                    me: this.props.me,
                    selected: this.props.selected,
                    v: this.props.v,
                    viewAll: a[l.cid],
                    et: this.props.et,
                    s: e.sid
                };
                return React.createElement(LeftPanel.ExpandableCompetition, c)
            }, this));
            return React.createElement("div", {
                className: "sportlist"
            }, React.createElement("li", {
                className: classNames("has-menu-c", {
                    active: c
                }),
                onClick: this.submenu
            }, React.createElement("span", {
                className: this.getExpandIconCss()
            }), React.createElement("a", {
                className: "float-left menu-T"
            }, React.createElement("span", null, this.state.sn)), React.createElement(LeftPanel.Icon, {
                sid: e.sid,
                sn: e.sn,
                showCount: LPM.view == VIEW.INPLAY
            }), LPM.view == VIEW.INPLAY ? React.createElement("span", {
                className: classNames("badge", {
                    on: c,
                    off: !c
                }),
                title: l.LP_NumberOfInplayEvents
            }, r) : null), s)
        },
        getActiveKey: function () {
            return "s" + this.props.d.sid
        },
        isSelected: function () {
            return (LPM.view == VIEW.INPLAY || LPM.view == VIEW.STARTINGSOON) && (LPM.collapsed ? _.contains(this.props.actives, this.getActiveKey()) : _.where(this.props.d.puc, {
                ces: [{
                    eid: this.props.selected
                }]
            }).length > 0)
        },
        submenu: function (e) {
            LPM.collapsed ? Action.LeftPanel.expand(this.getActiveKey()) : this.expand(e)
        }
    }), LPM.createClass("ExpandableCompetition", {
        mixins: ["expandMixin", "longNameTooltipMixin"],
        componentDidMount: function () {
            this.setState({
                cn: this.getDisplayName(this.props.d.cn, "c", !0)
            })
        },
        componentWillReceiveProps: function (e) {
            this.setState({
                cn: this.getDisplayName(e.d.cn, "c", !0)
            })
        },
        getDefaultProps: function () {
            return {
                prefix: "c"
            }
        },
        render: function () {
            var e = this.props.d,
                t = {},
                a = e.ces;
            return !this.props.viewAll || this.props.viewAll.all || (a = _.take(e.ces, this.props.viewAll.limit)), t = _.map(a, function (e) {
                return React.createElement(this.props.et, {
                    d: e,
                    key: e.eid,
                    selected: this.props.selected,
                    s: this.props.s
                })
            }, this), this.props.viewAll && !this.props.viewAll.all && t.push(React.createElement(LeftPanel.ViewAllBtn, {
                key: "-1",
                onClick: this.viewAll.bind(this, e.cid)
            })), React.createElement("div", {
                className: classNames("group", {
                    hasScroll: LPM.collapsed
                })
            }, React.createElement("li", {
                className: "sp-has-menu",
                title: e.cn
            }, void 0, React.createElement("div", {
                onClick: this.expand
            }, React.createElement("span", {
                className: this.getExpandIconCss()
            }), React.createElement("a", {
                className: "has-menu-title"
            }, this.state.cn))), React.createElement("ul", {
                className: "has-menu-box",
                ref: "expandObj",
                style: this.getExpandStyle()
            }, t))
        },
        viewAll: function (e) {
            Action.LeftPanel.viewAll(e, LPM.view)
        },
        getActiveKey: function () {
            return "c" + this.props.d.cid
        }
    }), LPM.createClass("Icon", {
        render: function () {
            var e = -1 == this.props.sid;
            if (e) {
                var t;
                switch (window.global.lan) {
                    case "en-gb":
                    case "zh-cn":
                        t = l.LP_All;
                        break;
                    default:
                        t = "A-Z"
                }
            }
            return React.createElement("span", {
                className: this.getIconCss(this.props.sid),
                "data-tooltip": t,
                title: e ? l.LP_All : this.props.sn
            })
        },
        getIconCss: function (e) {
            -1 == e && (e = "All");
            var t = "icon";
            return this.props.showCount && (t += " icon-small"), t += " icon-" + e
        }
    }), LPM.createClass("N", {
        render: function () {
            return React.createElement("span", {
                title: l.neut
            }, React.createElement("span", {
                className: "neutral"
            }, React.createElement("span", {
                className: "icon-Neutralbg"
            }), React.createElement("span", {
                className: "icon-NeutralN"
            })))
        }
    }), LPM.createClass("QuickMenu", {
        render: function () {
            var e = l.LP_QuickLinks;
            return React.createElement("div", {
                className: "sidebar-row hasSubmenu",
                onClick: this.submenu
            }, React.createElement("ul", {
                className: "sub-menu sports"
            }, React.createElement("p", {
                className: classNames("menu-title competitions"),
                style: {
                    cursor: LPM.collapsed ? "pointer" : "default",
                    paddingRight: LPM.collapsed ? 3 : 0
                },
                ref: "title"
            }, React.createElement("a", {
                style: {
                    cursor: "default"
                }
            }, e), React.createElement("span", {
                className: "icon icon-Quicklinks",
                title: e,
                style: {
                    maginRight: 3
                }
            })), React.createElement("ul", {
                className: "sub-menu mycomps",
                ref: "quickmenu"
            }, _.map(this.props.data, function (e, t) {
                return React.createElement(LeftPanel.QuickLink, c({
                    key: t
                }, e))
            })), React.createElement("p", null)))
        },
        submenu: function (e) {
            e.stopPropagation(), LPM.collapsed && Action.LeftPanel.expand("sqm")
        }
    }), LPM.createClass("QuickLink", {
        render: function () {
            var e = l.LP_Prestart;
            return React.createElement("li", {
                className: "has-menu-row",
                onClick: this.link,
                style: {
                    minHeight: 30
                }
            }, React.createElement("a", null, React.createElement("span", null, e), React.createElement("p", null, this.props.sn)))
        },
        link: function () {
            Action.LeftPanel.sport(this.props, VIEW.PRESTART)
        }
    }), LPM.createClass("QuickSubMenu", {
        render: function () {
            var e = l.LP_QuickLinks;
            return React.createElement("div", {
                className: "sidebar-row hasSubmenu"
            }, React.createElement("ul", {
                className: "sub-menu sports brr-c-1"
            }, React.createElement("p", {
                className: classNames("menu-title competitions"),
                style: {
                    padding: 0,
                    cursor: "default"
                },
                ref: "title"
            }, React.createElement("a", {
                style: {
                    cursor: "default"
                }
            }, e), React.createElement("a", {
                className: "icon icon-removeIcon closeicon",
                style: {
                    right: 0,
                    cursor: "pointer"
                },
                onClick: this.close
            })), React.createElement("ul", {
                className: "sub-menu mycomps",
                ref: "quickmenu"
            }, _.map(this.props.data, function (e, t) {
                return React.createElement(LeftPanel.QuickLink, c({
                    key: t
                }, e))
            })), React.createElement("p", null)))
        },
        close: function (e) {
            e.stopPropagation(), LPM.collapsed && Action.LeftPanel.expand("sqm")
        }
    }), LPM.createClass("TeamName", {
        mixins: ["longNameTooltipMixin"],
        componentDidMount: function () {
            this.setState({
                n: this.getDisplayName(this.props.n, "t", !0)
            })
        },
        componentWillReceiveProps: function (e) {
            this.setState({
                n: this.getDisplayName(e.n, "t", !0)
            })
        },
        render: function () {
            var e, t;
            return this.state.enalbeLongNameTooltip ? (t = this.props.n, e = this.state.n) : e = this.props.n, LPM.view == VIEW.STARTINGSOON ? React.createElement("p", {
                title: t
            }, e) : React.createElement("span", {
                className: "row-2",
                title: t
            }, e)
        }
    }), e.exports = LPM
}, function (e, t, a) {
    "use strict";
    var c = a(0);
    LPM.createStatefulClass("InPlay", {
        mixins: ["scrollbarMixin"],
        render: function () {
            var e = LeftPanel.InPlayEvent,
                t = [],
                a = {
                    sid: -1,
                    sn: l.AllSports,
                    ipc: _.reduce(_.pluck(this.state.ismd, "ipc"), function (e, t) {
                        return e + t
                    })
                },
                s = {
                    active: -1 == this.state.s,
                    count: a.ipc,
                    key: a.sid,
                    s: a,
                    showCount: !0,
                    v: VIEW.INPLAY
                };
            if (t.push(React.createElement(LeftPanel.Sport, s)), this.state.e) {
                var n = this.getStore().public.filter(this.state.ismd),
                    t = [];
                _.map(n, function (a) {
                    if (0 == a.puc.length) t.push(React.createElement("li", null));
                    else {
                        this.state.s > 0 && this.state.s == a.sid && t.push(React.createElement(c.ScrollBarAnchor, {
                            key: "anchor",
                            id: a.sid
                        }));
                        var l = {
                            actives: LPM.collapsed ? this.state.cActives : this.state.actives,
                            count: a.ipc,
                            d: a,
                            key: a.sid,
                            me: this.state.myevents,
                            selected: this.state.e,
                            v: VIEW.INPLAY,
                            viewAll: this.state.viewAll,
                            et: e
                        };
                        t.push(React.createElement(LeftPanel.ExpandableSport, l))
                    }
                }, this)
            } else _.map(this.state.ismd, function (e) {
                var a = {
                    active: this.state.s == e.sid,
                    count: e.ipc,
                    key: e.sid,
                    s: e,
                    showCount: !0,
                    v: VIEW.INPLAY
                };
                t.push(React.createElement(LeftPanel.Sport, a))
            }, this);
            var r = {
                actives: this.state.actives,
                collapsed: this.state.meCollapsed,
                d: this.state.myeventInfo,
                selected: this.state.e
            };
            return React.createElement("div", null, React.createElement("div", {
                className: "sidebar-row cr-pointer",
                onClick: this.reload
            }, React.createElement("p", {
                className: "menu-title STARTINGSOON"
            }, React.createElement("a", {
                style: {
                    cursor: "pointer"
                }
            }, l.LP_Inplay), React.createElement("span", {
                className: "icon icon-InPlay",
                title: l.LP_Inplay
            }))), React.createElement("div", {
                className: "sidebar-row"
            }, this.state.e > 0 ? React.createElement(LeftPanel.MyEvent, r) : null), React.createElement("div", {
                className: "sidebar-row"
            }, React.createElement("ul", {
                className: classNames("sub-menu", {
                    sports: !this.state.e
                }, "sportsEvents")
            }, t)))
        },
        componentDidUpdate: function (e, t) {
            this.props.scrollbar && this.state.e > 0 && !LPM.collapsed && LPM.needScrollToAnchor && this.props.scrollbar.scrollToAnchor()
        },
        reload: function () {
            Action.LeftPanel.inplay()
        }
    }), LPM.createClass("MyEvent", {
        componentDidUpdate: function (e, t) {
            if (!LPM.collapsed && !this.props.collapsed) {
                var a = $(this.refs.expandObj.getDOMNode());
                a.is(":visible") || a.slideDown()
            }
        },
        render: function () {
            var e = this.props.d,
                t = this.props.actives,
                a = this.props.selected ? this.props.selected : 0,
                c = null,
                s = 0 == e.length ? [] : _.map(e, function (e) {
                    var t = {
                        d: e,
                        isme: !0,
                        key: e.eid,
                        v: VIEW.INPLAY,
                        selected: a,
                        s: e.s
                    };
                    return React.createElement(LeftPanel.InPlayEvent, t)
                });
            if (0 == s.length && !LPM.collapsed) {
                c = React.createElement("div", {
                    className: "no-events"
                }, React.createElement("p", {
                    className: "other",
                    key: 1,
                    dangerouslySetInnerHTML: function () {
                        return {
                            __html: l.LP_AddMyEvents.replace("{0}", '<span class="iconbox"><span class="icon icon-StarUnselected"></span></span>')
                        }
                    }()
                }))
            }
            var n = classNames({
                active: _.contains(t, "smyevents"),
                nopointer: 0 == s.length && !LPM.collapsed
            });
            return React.createElement("ul", {
                className: "sub-menu myevents li-s"
            }, React.createElement("li", {
                className: n,
                onClick: this.active
            }, React.createElement("a", null, l.LP_MyEvent), LPM.collapsed && this.props.submenu ? null : React.createElement("span", {
                className: "icon icon-StarUnselected"
            }), React.createElement("span", {
                className: "badge off"
            }, e.length), LPM.collapsed && this.props.submenu ? React.createElement("a", {
                className: "icon icon-removeIcon closeicon",
                onClick: this.expand
            }) : null), c, React.createElement("ul", {
                className: "has-menu-box",
                ref: "expandObj"
            }, s))
        },
        toggle: function () {
            if (0 != this.props.d.length) {
                var e = $(this.refs.expandObj.getDOMNode()),
                    t = function () {
                        Action.LeftPanel.MyEvent.expand(!this.props.collapsed)
                    }.bind(this);
                this.props.collapsed ? e.slideDown(t) : e.slideUp(t)
            }
        },
        active: function (e) {
            e.stopPropagation(), 0 != this.props.d.length && (LPM.collapsed ? Action.LeftPanel.expand("smyevents") : this.toggle())
        }
    }), LPM.createClass("InPlayEvent", {
        mixins: ["liveStreamMixin"],
        render: function () {
            var e = this.props.d,
                t = this.props.isme,
                a = t ? l.RemoveFromFav : l.AddToFav,
                s = [React.createElement("span", {
                    onClick: this.favor,
                    key: "mc" + e.eid,
                    title: a,
                    className: classNames("icon", "icon-StarUnselected", {
                        lightorange: t
                    })
                })];
            this.hasLivestream() && s.push(React.createElement("span", {
                title: l.LP_LiveStreamInplay,
                key: "tv" + e.eid,
                className: "icon icon-TV2 lightorange"
            }));
            var n, r = e.eid == this.props.selected;
            r && (n = React.createElement(c.ScrollBarAnchor, null));
            var i, o, d = this._canDisplayScore(e.isb, this.props.s);
            if (d) {
                var m = classNames("row-1", {
                    lightorange: "h" != e.lts,
                    lightorange3: "h" == e.lts && 14 != this.props.s
                });
                i = React.createElement("span", {
                    className: m
                }, e.hs.v);
                var p = classNames("row-1", {
                    lightorange: "a" != e.lts || 14 == this.props.s,
                    lightorange3: "a" == e.lts && 14 != this.props.s
                });
                o = React.createElement("span", {
                    className: p
                }, e.as.v)
            }
            return React.createElement("li", {
                className: classNames("has-menu-row", {
                    active: r
                }),
                onClick: this.select
            }, n, React.createElement("p", {
                className: "myeventRow"
            }, i, React.createElement(LeftPanel.TeamName, {
                n: e.ht
            })), React.createElement("p", {
                className: "myeventRow"
            }, o, React.createElement(LeftPanel.TeamName, {
                n: e.at
            })), React.createElement("div", {
                className: "otherInfo"
            }, React.createElement(LeftPanel.ScoreBoard, {
                d: e,
                s: this.props.s
            }), React.createElement("div", {
                className: "float-right"
            }, s), React.createElement("div", {
                className: "clearfix"
            })))
        },
        select: function (e) {
            e.stopPropagation(), Action.event(this.props.d.eid, this.props.d.en)
        },
        favor: function (e) {
            e.stopPropagation(), Action.LeftPanel.MyEvent.toggle(this.props.d.eid)
        },
        _canDisplayScore: function (e, t) {
            var a = [1, 21, 26],
                l = [2, 3, 4, 9, 13, 14, 18, 20, 21, 25, 26];
            return 18 != t && (!!_.contains(a, t) || !!_.contains(l, t) && !0 === e)
        }
    }), LPM.createClass("SubMenu", {
        storeName: "InPlay",
        mixins: ["ctrlMixin", "scrollbarMixin"],
        render: function () {
            if (this.state.eventViewFirsload) return null;
            var e, t = {
                zIndex: 999,
                position: "absolute",
                left: 40
            };
            if (t.left += $("nav:first")[0].offsetLeft, _.contains(this.state.cActives, "smyevents")) {
                if (this.state.myeventInfo.length > 0) {
                    var a = {
                        actives: this.state.cActives,
                        collapsed: this.state.meCollapsed,
                        d: this.state.myeventInfo,
                        selected: this.state.e,
                        submenu: !0
                    };
                    e = React.createElement(LeftPanel.MyEvent, a)
                }
            } else if (_.contains(this.state.cActives, "sqm")) e = React.createElement(LeftPanel.QuickSubMenu, {
                data: this.props.qmd
            }), t.top = 121;
            else {
                var l = this.getStore().public.filter();
                if (0 == l.length) return null;
                var s = _.find(l, function (e) {
                    return _.contains(this.state.cActives, "s" + e.sid)
                }, this);
                if (!s) return null;
                var n = {
                    actives: this.state.cActives,
                    count: s.ipc,
                    d: s,
                    key: s.sid,
                    me: this.state.myevents,
                    selected: this.state.e,
                    v: VIEW.INPLAY,
                    viewAll: this.state.viewAll,
                    et: LeftPanel.InPlayEvent
                };
                e = React.createElement(LeftPanel.SubSport, n)
            }
            var r = {
                ref: "scrollbar",
                w: 227,
                h: function () {
                    return $(window).height()
                },
                ieMaxHeight: !0,
                onChange: this.scrollbarCallback,
                disable: LPM.disableScrollbar
            };
            return React.createElement("nav", {
                className: "otherSidebar",
                style: t,
                ref: "nav"
            }, React.createElement("div", {
                id: "lt-left",
                ref: "content"
            }, React.createElement(c, r, React.createElement("div", {
                key: 1,
                className: "sidebar-menu inPlay aother-sidebar"
            }, React.createElement("div", {
                className: "sidebar-row"
            }, React.createElement("ul", {
                className: "sub-menu sportsEvents brr-c-1"
            }, React.createElement("div", {
                className: "sportlist"
            }, e)))), React.createElement("br", {
                key: 2,
                style: {
                    clear: "both"
                }
            }))))
        },
        updateScrollbar: function () {
            if (this.isMounted() && this.refs.scrollbar && !this.state.collapsed) {
                var e = $(this.refs.content.getDOMNode()).height() > $(window).height();
                return this.scrollbarCallback(e), this.refs.scrollbar.update(), e
            }
        },
        scrollbarCallback: function (e) {
            var t = $(this.refs.nav.getDOMNode());
            e ? t.addClass("hasScroll") : t.removeClass("hasScroll")
        }
    }), LPM.createClass("SubSport", {
        mixins: ["expandMixin"],
        render: function () {
            var e = this.props.d,
                t = this.props.actives,
                a = {},
                l = this.isSelected();
            this.props.viewAll && this.props.viewAll[e.sid] && (a = this.props.viewAll[e.sid]);
            var c = React.createElement("ul", {
                ref: "expandObj",
                style: this.getExpandStyle()
            }, _.map(_.filter(e.puc), function (e) {
                var l = {
                    actives: t,
                    d: e,
                    key: e.cid,
                    me: this.props.me,
                    selected: this.props.selected,
                    v: this.props.v,
                    viewAll: a[e.cid],
                    et: this.props.et,
                    s: this.props.d.sid
                };
                return React.createElement(LeftPanel.ExpandableCompetition, l)
            }, this));
            return React.createElement("li", {
                className: classNames({
                    "has-menu-c": !0,
                    active: l
                })
            }, React.createElement("a", {
                className: "float-left"
            }, e.sn), React.createElement("span", {
                className: "badge on"
            }, this.props.count), React.createElement("a", {
                className: "icon icon-removeIcon closeicon",
                onClick: this.expand
            }), React.createElement("div", {
                className: classNames({
                    group: !0,
                    hasScroll: LPM.collapsed
                })
            }, c))
        },
        getActiveKey: function () {
            return "s" + this.props.d.sid
        },
        isSelected: function () {
            return (LPM.view == VIEW.INPLAY || LPM.view == VIEW.STARTINGSOON) && (LPM.collapsed ? _.contains(this.props.actives, this.getActiveKey()) : _.where(this.props.d.puc, {
                ces: [{
                    eid: this.props.selected
                }]
            }).length > 0)
        }
    }), LPM.createClass("ScoreBoard", {
        render: function () {
            var e = [],
                t = this.props.d;
            if (_.contains([1, 2, 19], this.props.s) || (!_.contains([3, 4, 9, 13, 20, 14], this.props.s) || t.pt < 2) && e.push(React.createElement("span", {
                    key: "live"
                }, "LIVE")), t.sb) {
                var a = LPM.store.InPlay.props.scoreboard[t.pt];
                a || (a = []);
                var l = this.reorder(t.sb.ps);
                if (2 == t.pt || 4 == t.pt || 14 == this.props.s) e.push(React.createElement("span", {
                    key: "0"
                }, t.etts)), e.push(React.createElement("span", {
                    key: "ipt"
                }, t.ipt));
                else if (4 == this.props.s) e.push(React.createElement("div", {
                    className: classNames("dsp-iblk mg-r-6 ft-c-14", {
                        firsthalf: "0" == t.sb.sv,
                        secondhalf: "1" == t.sb.sv
                    })
                }, React.createElement("span", {
                    className: "t-va-m mg-r-4"
                }, t.sb.cp.substr(1)), React.createElement("span", {
                    className: "icon-current fts-8 t-va-m"
                })));
                else
                    for (var c = 0; c < a.length; c++) {
                        var s = l[a[c]],
                            n = s.h + "-" + s.a;
                        if (e.push(React.createElement("span", {
                                key: c,
                                className: classNames({
                                    lightorange: s.p == t.sb.cp
                                })
                            }, n)), s.p == t.sb.cp) break
                    }
            } else _.contains([2, 3, 4, 9, 20, 21, 26], this.props.s) || e.push(React.createElement(LeftPanel.Timer, {
                key: "dt",
                etts: t.etts,
                canTick: utility.canTick(this.props.s),
                ipt: t.ipt
            }));
            return "N" == t.gt && e.push(React.createElement(LeftPanel.N, {
                key: "n"
            })), React.createElement("div", {
                className: "float-left dayDD"
            }, e)
        },
        reorder: function (e) {
            var t = _.remove(e, function (e) {
                return "ftg" == e.p
            });
            return t.length > 0 && e.push(t[0]), e
        }
    }), LPM.createClass("Timer", {
        module: "Timer",
        mixins: ["ctrlMixin"],
        componentDidMount: function () {
            (this.props.etts.length > 0 || this.props.ipt.length > 0) && (this.TimerEventId = this.getStore().listen(this.update))
        },
        componentWillReceiveProps: function (e) {
            this.props.etts.length > 0 || this.props.ipt.length > 0 ? this.TimerEventId || (this.TimerEventId = this.getStore().listen(this.update)) : this.LeftPanelEventId && this.getStore().removeListener(this.LeftPanelEventId)
        },
        render: function () {
            var e = this.props.etts + " " + this.getElpasedTime(this.props.ipt);
            return 1 == e.length ? null : React.createElement("span", null, e)
        },
        getElpasedTime: function (e) {
            var t = e.split(":");
            if (t.length > 1) {
                var a, l = +t[0];
                if (this.props.canTick) var a = +t[1] + this.state.tick;
                else var a = +t[1];
                return a >= 60 && (l += Math.floor(a / 60), a %= 60), a < 10 && (a = "0" + a), l + ":" + a
            }
            return e
        }
    }), e.exports = LPM
}, function (e, t, a) {
    "use strict";
    var c = a(0);
    LPM.createStatefulClass("LeftPanel", {
        mixins: ["scrollbarMixin"],
        getDefaultProps: function () {
            return {
                prevCollapsed: !1,
                prevHasScroll: !1,
                code: $("#srvc").text()
            }
        },
        componentDidMount: function () {
            this.state.info = this.getStore().props.info, this.update(), this.refs.scrollbar && this.refs.scrollbar.scrollToAnchor()
        },
        render: function () {
            var e, t, a, s = [],
                n = [],
                r = "sidebar-menu ",
                i = this.getMenuConfig(),
                o = {
                    count: this.state.tipc,
                    s: this.state.menuState,
                    d: i[VIEW.INPLAY],
                    key: VIEW.INPLAY,
                    updateScrollbar: this.updateScrollbar
                },
                d = {
                    count: this.state.tssc,
                    s: this.state.menuState,
                    d: i[VIEW.STARTINGSOON],
                    key: VIEW.STARTINGSOON,
                    updateScrollbar: this.updateScrollbar
                },
                m = {
                    count: this.state.tpsc,
                    s: this.state.menuState,
                    d: i[VIEW.PARLAY],
                    key: VIEW.PARLAY,
                    updateScrollbar: this.updateScrollbar
                },
                p = React.createElement(LeftPanel.MenuItem, o),
                h = React.createElement(LeftPanel.MenuItem, d);
            switch (this.state.qmd && this.state.view != VIEW.PARLAY && n.push(React.createElement(LeftPanel.QuickMenu, {
                data: this.state.qmd
            })), this.state.view) {
                case VIEW.PRESTART:
                default:
                    s = [p, h], n = React.createElement(LeftPanel.PreStart, {
                        updateScrollbar: this.updateScrollbar,
                        scrollbar: this.refs.scrollbar
                    }), r += "perStart", e = React.createElement(LeftPanel.ParlayMenu, m);
                    break;
                case VIEW.STARTINGSOON:
                    s = [p], n.push(React.createElement(LeftPanel.StartingSoon, {
                        updateScrollbar: this.updateScrollbar
                    })), r += "startingSoon", e = React.createElement(LeftPanel.ParlayMenu, m);
                    break;
                case VIEW.INPLAY:
                    s = [h], n.push(React.createElement(LeftPanel.InPlay, {
                        updateScrollbar: this.updateScrollbar,
                        scrollbar: this.refs.scrollbar
                    })), r += "inPlay", e = React.createElement(LeftPanel.ParlayMenu, m);
                    break;
                case VIEW.PARLAY:
                    s = [p, h], n.push(React.createElement(LeftPanel.Parlay, {
                        updateScrollbar: this.updateScrollbar,
                        scrollbar: this.refs.scrollbar
                    })), r += "parlay"
            }
            var u = this._getAsiaLink(),
                E = 210;
            UI.isMACSafari && LPM.collapsed && (E = 40), t = React.createElement("div", {
                id: "ltc",
                ref: "content",
                style: {
                    width: E
                }
            }, React.createElement("div", {
                className: r,
                style: LPM.collapsed ? {
                    width: 40
                } : null
            }, React.createElement("div", {
                className: "sidebar-row"
            }, React.createElement("ul", {
                className: "sub-menu home"
            }, React.createElement(LeftPanel.FixedMenuItem, {
                callback: this.collapse,
                text: l.SportsHome,
                tip: l.LP_RtnToMenu,
                css: "nav-btn",
                icon: "MenuMobile"
            }), React.createElement(LeftPanel.FixedMenuItem, {
                callback: this.home,
                text: l.SportsHome,
                tip: l.SportsHome,
                icon: "SportsHome",
                onContextMenu: this.homeRightClick
            }), s)), this.state.isUKsite ? null : e, React.createElement("div", {
                className: "menulist-a"
            }, React.createElement("a", {
                className: "AsianBtn cr-pointer",
                target: "_top",
                onContextMenu: this.asisRightClick,
                onClick: this._redirect.bind(this, u)
            }, LPM.collapsed ? null : l.SportMenu_SwitchToAsianView, React.createElement("span", {
                className: "icon icon-AsianView",
                title: l.SportMenu_SwitchToAsianView
            }))), n, React.createElement("div", {
                className: "sidebar-row"
            }, React.createElement("p", {
                className: "menu-title infocenter-t"
            }, React.createElement("a", null, l.InfoCentre), React.createElement("span", {
                className: "icon icon-InfoCenter",
                title: l.InfoCentre
            })), React.createElement("ul", {
                className: "sub-menu infoCenter"
            }, uv.showls ? React.createElement("li", {
                key: "tv",
                onClick: this._openTV
            }, React.createElement("a", null, ccparam.tvTxt), React.createElement("span", {
                className: classNames("icon icon-TV3"),
                title: ccparam.tvTxt
            })) : null, _.map(this.state.info, function (e) {
                return React.createElement(LeftPanel.InfoItem, {
                    key: e.k,
                    i: e
                })
            }, this), React.createElement("div", {
                className: "gap",
                onClick: this.showCode
            })))), React.createElement("br", {
                style: {
                    clear: "both"
                }
            })), LPM.collapsed && (LPM.view == VIEW.PRESTART ? a = React.createElement(LeftPanel.PreSubMenu, null) : LPM.view == VIEW.INPLAY ? a = React.createElement(LeftPanel.SubMenu, {
                qmd: this.state.qmd
            }) : LPM.view == VIEW.STARTINGSOON && (a = React.createElement(LeftPanel.SSSubMenu, {
                qmd: this.state.qmd
            })));
            var R = {
                h: function () {
                    return Math.max($(window).height(), window.innerHeight) - 2
                },
                top: 3,
                ref: "scrollbar",
                offset: (LPM.collapsed, 17),
                always: !0,
                disable: this.state.disableScrollbar
            };
            return R.w = LPM.collapsed ? 54 : 224, t = React.createElement(c, R, t), React.createElement("div", null, React.createElement("nav", {
                className: classNames({
                    collapsed: LPM.collapsed,
                    hasScroll: !0
                }),
                ref: "nav"
            }, React.createElement("div", {
                id: "lt-left"
            }, t)), a, this.state.showCode ? React.createElement("div", {
                style: {
                    position: "absolute",
                    bottom: 15,
                    marginLeft: 5,
                    padding: 5,
                    zIndex: 99
                },
                onClick: this.showCode,
                className: "tt-cont"
            }, this.props.code) : null)
        },
        asisRightClick: function (e) {
            e.preventDefault(), e.stopPropagation();
            var t = pm.parentHost();
            if ("localhost" == document.domain || !t) return "javascript:void(0)";
            utility.openNewTab("/" + window.global.lan + "/asia")
        },
        home: function (e) {
            e.stopPropagation(), LPM.mock ? Action.LeftPanel.view(VIEW.PRESTART) : Action.LeftPanel.home()
        },
        homeRightClick: function (e) {
            e.preventDefault(), e.stopPropagation(), LPM.mock ? Action.LeftPanel.view(VIEW.PRESTART) : Action.LeftPanel.homeRightClick()
        },
        collapse: function (e) {
            e.stopPropagation(), Action.LeftPanel.collapse(!1)
        },
        getMenuConfig: function () {
            var e = [];
            return e[VIEW.INPLAY] = {
                v: VIEW.INPLAY,
                n: l.LP_Inplay,
                i: "icon-InPlay",
                m: l.LP_NoInplay
            }, e[VIEW.STARTINGSOON] = {
                v: VIEW.STARTINGSOON,
                n: l.LP_StartingSoonMenu,
                i: "icon-StartingSoon_m",
                m: l.OP_NoUpcomingEvents
            }, e[VIEW.PARLAY] = {
                v: VIEW.PARLAY,
                n: l.LP_MultiplesMenu,
                i: "icon-parlay ",
                m: l.OP_NoUpcomingEvents
            }, e
        },
        updateScrollbar: function () {
            if (this.isMounted() && this.refs.scrollbar) {
                var e = $(this.refs.content.getDOMNode()).height() > $(window).height();
                return this.refs.scrollbar.update(), e
            }
        },
        showCode: function (e) {
            e.stopPropagation(), Action.LeftPanel.code()
        },
        _getAsiaLink: function () {
            var e = pm.parentHost();
            return "localhost" != document.domain && e ? e + "/" + window.global.lan + "/asia" : "javascript:void(0)"
        },
        _openTV: function () {
            var e, t = utility.parsePopupInfo("popup-new w791 h585"),
                a = screen.width / 2 - t.width / 2,
                l = screen.height / 2 - t.height / 2,
                c = pm.parentHost();
            e = "localhost" != document.domain && null != c && "" != c ? c + "/" + window.global.lan + "/live-streaming" : "";
            var s = "center=yes,resizable=yes,scrollbars=yes, width=" + t.width + ", height=" + t.height + ",left=" + a + ",top=" + l;
            window.open(e, "stream", s)
        },
        _redirect: function (e) {
            top.location.href = e
        }
    }), LPM.createClass("FixedMenuItem", {
        render: function () {
            return React.createElement("li", {
                className: this.props.css,
                onClick: this.props.callback,
                onContextMenu: this.props.onContextMenu
            }, React.createElement("a", null, this.props.text), React.createElement("span", {
                className: "icon icon-" + this.props.icon,
                title: this.props.tip
            }))
        }
    }), LPM.createClass("MenuItem", {
        mixins: ["scrollbarMixin"],
        render: function () {
            var e = "icon " + this.props.d.i,
                t = this.props.d.v;
            return React.createElement("div", null, React.createElement("li", {
                onClick: this.changeView,
                onContextMenu: this.changeViewRightClick
            }, React.createElement("span", null, React.createElement("a", null, this.props.d.n), React.createElement("span", {
                className: e,
                title: this.props.d.n
            }), React.createElement("span", {
                title: l.LP_NumberOfInplayEvents,
                className: classNames("badge", {
                    on: t == VIEW.INPLAY,
                    off: t == VIEW.STARTINGSOON
                })
            }, this.props.count))), React.createElement("div", {
                className: classNames("sub-menu", "no-events", {
                    hidden: this.props.s != t
                })
            }, LPM.collapsed ? null : React.createElement("p", {
                className: "other"
            }, this.props.d.m)))
        },
        changeView: function () {
            if (0 == this.props.count) LPM.collapsed || Action.LeftPanel.menuExpand(this.props.d.v);
            else switch (this.props.d.v) {
                case VIEW.INPLAY:
                    Action.LeftPanel.inplay();
                    break;
                case VIEW.STARTINGSOON:
                    Action.LeftPanel.startingsoon();
                    break;
                case VIEW.PARLAY:
                    Action.LeftPanel.parlay()
            }
        },
        changeViewRightClick: function (e) {
            e.preventDefault(), e.stopPropagation();
            if (0 == this.props.count) LPM.collapsed || Action.LeftPanel.menuExpand(this.props.d.v);
            else switch (this.props.d.v) {
                case VIEW.INPLAY:
                    Action.LeftPanel.inplayRightClick();
                    break;
                case VIEW.STARTINGSOON:
                    Action.LeftPanel.startingsoonRightClick();
                    break;
                case VIEW.PARLAY:
                    Action.LeftPanel.parlayRightClick()
            }
        }
    }), LPM.createClass("InfoItem", {
        render: function () {
            var e = this.props.i;
            return React.createElement("li", {
                key: e.text,
                onClick: this.info.bind(this, e)
            }, React.createElement("a", null, e.text), React.createElement("span", {
                className: classNames("icon", e.icon),
                title: e.text
            }))
        },
        info: function (e, t) {
            t.stopPropagation(), "_blank" != name && name || (name = "188BET"), e && e.id && (name = e.id);
            var a = pm.parentHost();
            !e.local && a || (a = location.protocol + "//" + location.hostname + "/"), utility.popupUrlWin(a + "/" + window.global.lan + e.url, e, e.text)
        }
    }), LPM.createClass("ParlayMenu", {
        render: function () {
            var e = "icon " + this.props.d.i,
                t = this.props.d.v;
            return React.createElement("div", {
                className: "sidebar-row"
            }, React.createElement("ul", {
                className: "sub-menu home"
            }, React.createElement("li", {
                className: "parlay",
                onClick: this.goParlayView,
                onContextMenu: this.parlayRightClick
            }, React.createElement("a", null, this.props.d.n), React.createElement("span", {
                className: e,
                title: this.props.d.n
            })), React.createElement("div", {
                className: classNames("sub-menu", "no-events", {
                    hidden: this.props.s != t
                })
            }, LPM.collapsed ? null : React.createElement("p", {
                className: "other"
            }, this.props.d.m))))
        },
        goParlayView: function () {
            0 == this.props.count ? LPM.collapsed || Action.LeftPanel.menuExpand(this.props.d.v) : Action.LeftPanel.parlay()
        },
        parlayRightClick: function (e) {
            e.preventDefault(), e.stopPropagation(), 0 == this.props.count ? LPM.collapsed || Action.LeftPanel.menuExpand(this.props.d.v) : Action.LeftPanel.parlayRightClick()
        }
    }), e.exports = LPM
}, function (e, t, a) {
    "use strict";
    var c = a(0);
    LPM.createStatefulClass("PreStart", {
        mixins: ["scrollbarMixin"],
        render: function () {
            var e, t = this.getSports(this.state.smd),
                a = this.getSports(this.state.topSports),
                c = this.state.events;
            c.length > 0 && !LPM.collapsed && (e = React.createElement(LeftPanel.PSEventMenu, {
                active: this.state.e,
                c: this.state.c,
                d: c[0],
                s: this.state.s,
                viewAll: this.state.viewAll
            })), this.state.smd.length > this.state.gap && t.splice(this.state.gap, 0, React.createElement("span", {
                key: 0,
                className: "gap"
            }, " "));
            var s = !1;
            this.state.p > 0 && (s = {
                p: this.state.p,
                s: this.state.s
            });
            var n = _.map(this.state.fe, function (e) {
                return React.createElement(LeftPanel.Programme, {
                    active: s,
                    actives: this.state.actives,
                    key: e.pid,
                    p: e
                })
            }, this);
            return React.createElement("div", null, React.createElement(LeftPanel.MyCompetition, {
                d: this.state.mycomps,
                list: this.state.mycomps.info,
                subview: this.state.submenuView,
                favt: this.state.favt
            }), e, React.createElement("div", {
                className: "sidebar-row"
            }, React.createElement("p", {
                className: "menu-title"
            }, React.createElement("a", null, l.LP_SPorts), React.createElement("span", {
                className: "icon icon-Sports"
            })), React.createElement("div", {
                className: "sidebar-row"
            }, React.createElement("ul", {
                className: "sub-menu sportsType"
            })), n, a, React.createElement("div", {
                className: "sidebar-row"
            }, React.createElement("ul", {
                className: "sub-menu sports"
            }, t))))
        },
        componentDidUpdate: function (e, t) {
            var a = tempStore.get("redirect");
            if (a) return void LPM.redirect(a);
            var l = this.props.scrollbar;
            if (l) {
                if (l.state.hasScroll && LPM.collapsed) {
                    var c = this.state.submenuView;
                    l.state.freeze && c < 2 ? l.release() : !l.state.freeze && c > 1 && l.freeze()
                }
                this.state.e > 0 && !LPM.collapsed && LPM.firstLoad && this.props.scrollbar.scrollTo(0)
            }
        },
        getSports: function (e) {
            return _.map(e, function (e) {
                if (e.ios) return React.createElement(LeftPanel.OtherSport, e);
                var t = !1;
                return e.sid == this.state.s && (t = !0, (this.state.p > 0 || 2 == this.state.mycomps.favt) && (t = !1)), React.createElement(LeftPanel.Sport, {
                    active: t,
                    key: e.sid,
                    s: e,
                    v: VIEW.PRESTART
                })
            }, this)
        }
    }), LPM.createClass("Programme", {
        mixins: ["expandMixin"],
        render: function () {
            var e = "icon lightorange " + this.props.p.sports[0].ic,
                t = classNames({
                    "menu-title-2": !0,
                    sp: !0,
                    active: this.isActive() || this.props.p.pid == this.props.active.p
                }),
                a = [];
            return this.props.p.ims && (a = _.map(_.sortBy(this.props.p.sports, "on"), function (e) {
                var t = {
                    active: this.props.active && this.props.active.p == this.props.p.pid && this.props.active.s == e.si,
                    key: e.si,
                    p: this.props.p,
                    s: e
                };
                return React.createElement(LeftPanel.ProgSport, t)
            }, this)), React.createElement("div", {
                className: classNames("sidebar-row", {
                    hasSubmenu: this.props.p.ims
                }),
                "data-pid": this.props.p.pid,
                "data-sv": 2
            }, React.createElement("ul", {
                className: "sub-menu sports"
            }, React.createElement("p", {
                className: t,
                onClick: this.select
            }, React.createElement("a", {
                className: "menut-T"
            }, React.createElement("span", null, this.props.p.pn)), this.props.p.iwc ? React.createElement("span", {
                className: "icon lightorange icon-world-cup"
            }, React.createElement("span", {
                className: "path1"
            }), React.createElement("span", {
                className: "path2"
            })) : React.createElement("span", {
                title: this.props.p.pn,
                className: e
            })), LPM.collapsed ? null : React.createElement("ul", {
                className: "featuredEvents",
                ref: "expandObj",
                style: this.getExpandStyle()
            }, a)))
        },
        select: function (e) {
            e.stopPropagation(), this.props.p.ims ? LPM.collapsed ? Action.LeftPanel.subview({
                v: 3,
                id: this.props.p.pid
            }) : this.expand(e) : Action.programme(this.props.p.sports[0].Url)
        },
        getActiveKey: function () {
            return this.props.p.pid
        }
    }), LPM.createClass("ProgSport", {
        render: function () {
            var e = classNames({
                "has-menu-row": !0,
                active: this.props.active
            });
            return React.createElement("li", {
                className: e,
                onClick: this.select
            }, React.createElement("span", null, this.props.p.pn), React.createElement("p", {
                className: "sport-name"
            }, this.props.s.sn))
        },
        select: function (e) {
            e.stopPropagation(), Action.programme(this.props.s.Url)
        }
    }), LPM.createClass("PSEventMenu", {
        getDefaultProps: function () {
            return {
                size: 10
            }
        },
        render: function () {
            var e;
            return this.props.d.ces.length > this.props.size && !this.props.viewAll && (e = React.createElement(LeftPanel.ViewAllBtn, {
                onClick: this.viewAll
            })), React.createElement("div", {
                className: "sidebar-row"
            }, React.createElement(LeftPanel.PSEventMenuTitle, {
                cn: this.props.d.cn,
                onClick: this.competition
            }), React.createElement("ul", {
                className: "sub-menu EventSelected st3"
            }, _.map(this.props.d.ces, function (e, t) {
                var a = {
                    active: e.eid == this.props.active,
                    e: e,
                    hide: t >= this.props.size && !this.props.viewAll,
                    key: e.eid
                };
                return React.createElement(LeftPanel.PSEvent, a)
            }, this), e))
        },
        viewAll: function () {
            Action.LeftPanel.psEventViewAll(!0)
        },
        competition: function () {
            Action.competition(this.props.s, this.props.c)
        }
    }), LPM.createClass("PSEvent", {
        mixins: ["liveStreamMixin"],
        render: function () {
            var e = this.props.e,
                t = [],
                a = [React.createElement("span", {
                    key: "dt"
                }, " ", e.esd + " " + e.est, " ")];
            "N" == e.gt && a.push(React.createElement(LeftPanel.N, {
                key: "n"
            })), e.il && t.push(React.createElement("span", {
                className: "icon icon-InPlay",
                key: 1
            })), this.livestream && t.push(React.createElement("span", {
                title: l.LP_LiveStream,
                className: "icon icon-TV2",
                key: 2
            }));
            var s = {};
            this.props.hide && (s = {
                display: "none"
            });
            var n = null;
            return this.props.active && (n = React.createElement(c.ScrollBarAnchor, null)), React.createElement("li", {
                style: s,
                className: classNames({
                    "has-menu-row": !0,
                    active: this.props.active
                }),
                onClick: this.select
            }, n, React.createElement("p", {
                className: "myeventRow"
            }, React.createElement(LeftPanel.TeamName, {
                n: e.ht
            })), React.createElement("p", {
                className: "myeventRow"
            }, React.createElement(LeftPanel.TeamName, {
                n: e.at
            })), React.createElement("div", {
                className: "otherInfo"
            }, React.createElement("div", {
                className: "float-left"
            }, a), React.createElement("div", {
                className: "float-right"
            }, t), React.createElement("div", {
                className: "clearfix"
            })))
        },
        select: function (e) {
            e.stopPropagation(), Action.event(this.props.e.eid, this.props.e.en)
        }
    }), LPM.createClass("MyCompetition", {
        componentDidUpdate: function (e, t) {
            if (!this.props.d.collapsed) {
                var a = $(this.refs.mycomps.getDOMNode());
                if (!a.is(":visible")) {
                    var l = function () {
                        Action.LeftPanel.MyCompetition.expand(!1)
                    }.bind(this);
                    a.slideDown(400, l)
                }
            }
        },
        render: function () {
            var e, t = this.props.d,
                a = this.props.list,
                c = t.size[t.favt];
            if (0 == a.length && (!LPM.collapsed || this.props.submenu)) {
                e = React.createElement("li", {
                    className: "other",
                    style: {
                        height: "auto",
                        paddingBottom: 5
                    },
                    dangerouslySetInnerHTML: function () {
                        return {
                            __html: l.LP_AddMyComp.replace("{0}", '<span class="iconbox"><span class="icon merge-icon-a icon-SortCompetition"></span><span class="icon merge-icon-b icon-MainMarketsshowleft"></span></span>')
                        }
                    }()
                })
            }
            return (!LPM.collapsed || this.props.submenu) && a.length > c && !t.viewAll && (e = React.createElement(LeftPanel.ViewAllBtn, {
                onClick: this.viewAll
            })), React.createElement("div", {
                className: "sidebar-row hasSubmenu"
            }, React.createElement("ul", {
                className: "sub-menu sports brr-c-1"
            }, React.createElement("p", {
                className: classNames("menu-title", "competitions", {
                    active: 1 == this.props.subview || 2 == this.props.subview || 2 == this.props.favt
                }),
                onClick: this.toggle,
                ref: "title"
            }, React.createElement("a", null, l.LP_MyComp), this.props.submenu ? React.createElement("a", {
                className: "icon icon-removeIcon closeicon",
                onClick: this.close
            }) : React.createElement("span", {
                title: this.props.submenu ? "" : l.LP_MyComp,
                className: "icon icon-MyCompetitions"
            })), React.createElement("ul", {
                className: "sub-menu mycomps",
                ref: "mycomps"
            }, !LPM.collapsed || this.props.submenu ? _.map(a, function (e, l) {
                var s = {
                    active: this.props.d.active == e.cid,
                    c: e,
                    hide: l >= c && !t.viewAll,
                    i: l,
                    key: e.cid,
                    canMove: a.length > 1
                };
                return React.createElement(LeftPanel.MyCompetitionItem, s)
            }, this) : null, e), React.createElement("p", null)))
        },
        viewAll: function (e) {
            e.stopPropagation(), Action.LeftPanel.MyCompetition.viewAll()
        },
        toggle: function (e) {
            if (e.stopPropagation(), LPM.collapsed) Action.LeftPanel.subview({
                v: 2
            });
            else if (this.props.d.data.length > 0) {
                var t = $(this.refs.mycomps.getDOMNode()),
                    a = function () {
                        Action.LeftPanel.MyCompetition.expand(!this.props.d.collapsed)
                    }.bind(this);
                this.props.d.collapsed ? t.slideDown(a) : t.slideUp(a)
            }
        },
        close: function (e) {
            e.stopPropagation(), Action.LeftPanel.subview({
                v: 0
            })
        }
    }), LPM.createClass("MyCompetitionItem", {
        render: function () {
            var e = {};
            this.props.hide && (e = {
                display: "none"
            });
            var t = this.props.active ? React.createElement(c.ScrollBarAnchor, null) : null;
            return React.createElement("li", {
                className: classNames("has-menu-row", {
                    active: this.props.active
                }),
                key: this.props.c.cid,
                onClick: this.select,
                style: e
            }, t, React.createElement("a", null, React.createElement(LeftPanel.MyCompetitionSportName, {
                n: this.props.c.sn
            }), React.createElement(LeftPanel.MyCompetitionName, {
                n: this.props.c.cn
            })), this.props.canMove ? React.createElement("table", {
                border: "0",
                className: "up-down-btn"
            }, React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", null, React.createElement("span", {
                className: "tick-up",
                onClick: this.up
            }))), React.createElement("tr", null, React.createElement("td", null, React.createElement("span", {
                className: "tick-down",
                onClick: this.down
            }))))) : null, React.createElement("span", {
                className: "icon icon-Xbutton",
                onClick: this.remove
            }))
        },
        select: function (e) {
            e.stopPropagation(), Action.LeftPanel.MyCompetition.select(this.props.c.cid, this.props.c.sid)
        },
        remove: function (e) {
            e.stopPropagation(), Action.LeftPanel.MyCompetition.toggle({
                cid: this.props.c.cid
            })
        },
        up: function (e) {
            e.stopPropagation(), Action.LeftPanel.MyCompetition.order(this.props.i, -1)
        },
        down: function (e) {
            e.stopPropagation(), Action.LeftPanel.MyCompetition.order(this.props.i, 1)
        }
    }), LPM.createClass("MyCompetitionName", {
        mixins: ["longNameTooltipMixin"],
        componentDidMount: function () {
            this.setState({
                n: this.getDisplayName(this.props.n, "c")
            })
        },
        componentWillReceiveProps: function (e) {
            this.setState({
                n: this.getDisplayName(e.n, "c")
            })
        },
        render: function () {
            return React.createElement("p", {
                title: this.props.n
            }, this.state.n)
        }
    }), LPM.createClass("MyCompetitionSportName", {
        mixins: ["longNameTooltipMixin"],
        componentDidMount: function () {
            this.setState({
                n: this.getDisplayName(this.props.n, "s")
            })
        },
        componentWillReceiveProps: function (e) {
            this.setState({
                n: this.getDisplayName(e.n, "s")
            })
        },
        render: function () {
            return React.createElement("span", {
                title: this.props.n
            }, this.state.n)
        }
    }), LPM.createClass("OtherSport", {
        render: function () {
            return React.createElement("a", {
                href: this.props.url,
                className: "a-row",
                target: "_top"
            }, React.createElement("span", {
                className: "sps-txt"
            }, this.props.sn), React.createElement(LeftPanel.Icon, {
                sid: this.props.i,
                sn: this.props.sn
            }))
        }
    }), LPM.createClass("PreSubMenu", {
        storeName: "PreStart",
        mixins: ["ctrlMixin"],
        render: function () {
            var e, t = {
                position: "absolute",
                zIndex: 999
            };
            switch (this.state.submenuView) {
                default:
                    case 0:
                    case 1:
                    return null;
                case 2:
                        e = React.createElement(LeftPanel.MyCompetition, {
                        submenu: !0,
                        d: this.state.mycomps,
                        list: this.state.mycomps.info
                    });
                    break;
                case 3:
                        var a;
                    if (!(this.state.actives.length > 0)) return null;
                    if (a = _.filter(this.state.fe, function (e) {
                            return this.state.actives[0] == e.pid
                        }, this), !(a.length > 0)) return null;a = a[0];
                    var l = !1;this.state.p > 0 && (l = {
                        p: this.state.p,
                        s: this.state.s
                    }),
                    e = React.createElement("div", {
                        className: "sidebar-row"
                    }, React.createElement(LeftPanel.SubProgramme, {
                        active: l,
                        actives: this.state.actives,
                        key: a.pid,
                        p: a
                    }))
            }
            return React.createElement("nav", {
                className: "otherSidebar",
                style: t
            }, React.createElement("div", {
                id: "lt-left"
            }, React.createElement("div", {
                id: "itc"
            }, React.createElement("div", {
                className: "sidebar-menu perStart aother-sidebar"
            }, e))))
        },
        componentDidUpdate: function (e, t) {
            if (LPM.collapsed && this.state.submenuView > 0) {
                var a = $("#ltc .sidebar-menu.perStart .hasSubmenu p.active").closest(".sidebar-row");
                0 == a.length && console.warn(a);
                $(this.getDOMNode()).offset({
                    top: a.offset().top,
                    left: 40 + $("nav:first")[0].offsetLeft
                })
            }
        }
    }), LPM.createClass("SubProgramme", {
        mixins: ["expandMixin"],
        render: function () {
            var e = [];
            return this.props.p.ims && (e = _.map(_.sortBy(this.props.p.sports, "on"), function (e) {
                var t = {
                    active: this.props.active && this.props.active.p == this.props.p.pid && this.props.active.s == e.si,
                    key: e.si,
                    p: this.props.p,
                    s: e
                };
                return React.createElement(LeftPanel.ProgSport, t)
            }, this)), React.createElement("div", {
                className: "sidebar-row",
                "data-pid": this.props.p.pid
            }, React.createElement("ul", {
                className: "sub-menu sports brr-c-1"
            }, React.createElement("p", {
                className: "menu-title-2 sp"
            }, React.createElement("a", {
                className: "menut-T"
            }, React.createElement("span", null, this.props.p.pn)), React.createElement("a", {
                className: "icon icon-removeIcon closeicon",
                onClick: this.close
            })), React.createElement("ul", {
                className: "featuredEvents",
                ref: "expandObj",
                style: this.getExpandStyle()
            }, e)))
        },
        getActiveKey: function () {
            return this.props.p.pid
        },
        close: function () {
            Action.LeftPanel.subview(2)
        }
    }), LPM.createClass("PSEventMenuTitle", {
        mixins: ["longNameTooltipMixin"],
        componentDidMount: function () {
            this.setState({
                n: this.getDisplayName(this.props.cn, "c")
            })
        },
        componentWillReceiveProps: function (e) {
            this.setState({
                n: this.getDisplayName(e.cn, "c")
            })
        },
        render: function () {
            return React.createElement("p", {
                title: this.props.cn,
                className: "menu-title competitions st2",
                onClick: this.props.onClick
            }, this.state.n)
        }
    }), e.exports = LPM
}, function (e, t, a) {
    "use strict";
    a(0);
    LPM.createStatefulClass("Parlay", {
        mixins: ["scrollbarMixin"],
        render: function () {
            var e, t = this.getSports(this.state.smd),
                a = this.getSports(this.state.topSports),
                c = this.state.events;
            c.length > 0 && !LPM.collapsed && (e = React.createElement(LeftPanel.PSEventMenu, {
                active: this.state.e,
                c: this.state.c,
                d: c[0],
                s: this.state.sid,
                viewAll: this.state.viewAll
            })), this.state.smd.length > this.state.gap && t.splice(this.state.gap, 0, React.createElement("span", {
                key: 0,
                className: "gap"
            }, " "));
            var s = !1;
            this.state.p > 0 && (s = {
                p: this.state.p,
                s: this.state.sid
            });
            var n, r = _.map(this.state.fe, function (e) {
                return React.createElement(LeftPanel.Programme, {
                    active: s,
                    actives: this.state.actives,
                    key: e.pid,
                    p: e
                })
            }, this);
            return e && (n = React.createElement("p", {
                className: "menu-title"
            }, React.createElement("a", null, l.LP_SPorts), React.createElement("span", {
                className: "icon icon-Sports"
            }))), React.createElement("div", null, React.createElement("div", {
                className: "sidebar-row"
            }, React.createElement("p", {
                className: "menu-title"
            }, React.createElement("a", null, l.LP_MultiplesMenu.toUpperCase()), React.createElement("span", {
                className: "icon icon-parlay",
                title: l.LP_MultiplesMenu
            })), React.createElement(LPM.ParlayExitBtn, {
                sport: this.state.topPrestarSport
            }), e, n, r, a, React.createElement("div", {
                className: "sidebar-row"
            }, React.createElement("ul", {
                className: "sub-menu sports"
            }, t))))
        },
        componentDidUpdate: function (e, t) {
            var a = tempStore.get("redirect");
            if (a) return void LPM.redirect(a);
            var l = this.props.scrollbar;
            if (l) {
                if (l.state.hasScroll && LPM.collapsed) {
                    var c = this.state.submenuView;
                    l.state.freeze && c < 2 ? l.release() : !l.state.freeze && c > 1 && l.freeze()
                }
                this.state.e > 0 && !LPM.collapsed && LPM.firstLoad && this.props.scrollbar.scrollTo(0)
            }
        },
        getSports: function (e) {
            return _.map(e, function (e) {
                if (e.ios) return React.createElement(LeftPanel.OtherSport, e);
                var t = !1;
                return e.sid == this.state.sid && (t = !0, this.state.p > 0 && (t = !1)), React.createElement(LeftPanel.Sport, {
                    active: t,
                    key: e.sid,
                    s: e,
                    v: VIEW.PARLAY
                })
            }, this)
        }
    }), LPM.ParlayExitBtn = React.createClass({
        displayName: "ParlayExitBtn",
        render: function () {
            return React.createElement("div", {
                className: "sidebar-row"
            }, React.createElement("ul", {
                className: "sub-menu sports"
            }, React.createElement("li", {
                className: "parlay back",
                onClick: this.clickToExit
            }, React.createElement("a", null, l.LP_MultiplesMenu_Exit), React.createElement("span", {
                className: "icon icon-DoubleArrowHorizontalLeft",
                title: l.LP_MultiplesMenu_Exit
            }))))
        },
        clickToExit: function () {
            Action.LeftPanel.sport(this.props.sport, VIEW.PRESTART)
        }
    }), e.exports = LPM
}, function (e, t, a) {
    "use strict";
    var c = a(0);
    LPM.createStatefulClass("StartingSoon", {
        mixins: ["scrollbarMixin"],
        render: function () {
            var e = LeftPanel.StartingSoonEvent,
                t = this.state.e > 0 ? _.map(this.state.ssmd, function (t) {
                    var a = {
                        actives: this.state.actives,
                        count: t.tc,
                        d: t,
                        key: t.sid,
                        selected: this.state.e,
                        v: VIEW.STARTINGSOON,
                        viewAll: this.state.viewAll,
                        et: e
                    };
                    return React.createElement(LeftPanel.ExpandableSport, a)
                }, this) : _.map(this.state.ssmd, function (e) {
                    var t = {
                        active: this.state.s == e.sid,
                        count: e.tc,
                        key: e.sid,
                        s: e,
                        showCount: !0,
                        v: VIEW.STARTINGSOON
                    };
                    return React.createElement(LeftPanel.Sport, t)
                }, this);
            return React.createElement("div", null, React.createElement("div", {
                className: "sidebar-row cr-pointer",
                onClick: this.reload
            }, React.createElement("p", {
                className: "menu-title STARTINGSOON"
            }, React.createElement("a", {
                style: {
                    cursor: "pointer"
                }
            }, l.LP_StartingSoonMenu), React.createElement("span", {
                className: "icon icon-StartingSoon",
                title: l.LP_StartingSoonMenu
            }))), React.createElement("div", {
                className: "sidebar-row"
            }, React.createElement("ul", {
                className: classNames("sub-menu", {
                    sports: !this.state.e
                }, "sportsEvents")
            }, t)))
        },
        componentDidUpdate: function (e, t) {
            this.props.scrollbar && this.state.e > 0 && !LPM.collapsed && LPM.needScrollToAnchor && this.props.scrollbar.scrollToAnchor()
        },
        reload: function () {
            Action.LeftPanel.startingsoon()
        }
    }), LPM.createClass("StartingSoonEvent", {
        mixins: ["liveStreamMixin"],
        render: function () {
            var e = this.props.d,
                t = [],
                a = [];
            return t.push(React.createElement("span", {
                className: "mg-r-5"
            }, e.mts + " " + (e.mts > 1 ? l.HP_Mins : l.HP_Min))), "N" == e.gt && t.push(React.createElement(LeftPanel.N, {
                key: "n"
            })), e.il && a.push(React.createElement("span", {
                title: l.LiveText,
                className: "icon icon-InPlay",
                key: 1
            })), this.livestream && a.push(React.createElement("span", {
                title: l.LP_LiveStream,
                className: "icon icon-TV2",
                key: "tv" + e.eid
            })), React.createElement("li", {
                className: classNames({
                    "has-menu-row": !0,
                    active: e.eid == this.props.selected
                }),
                onClick: this.select
            }, React.createElement(LeftPanel.TeamName, {
                n: e.ht
            }), React.createElement(LeftPanel.TeamName, {
                n: e.at
            }), React.createElement("div", {
                className: "otherInfo"
            }, React.createElement("div", {
                className: "float-left lightorange"
            }, t), React.createElement("div", {
                className: "float-right"
            }, a), React.createElement("div", {
                className: "clearfix"
            })))
        },
        select: function (e) {
            e.stopPropagation(), Action.event(this.props.d.eid, this.props.d.en)
        }
    }), LPM.createClass("SSSubMenu", {
        storeName: "StartingSoon",
        mixins: ["ctrlMixin", "scrollbarMixin"],
        render: function () {
            if (this.state.eventViewFirsload) return null;
            var e = {
                zIndex: 999,
                position: "absolute",
                left: 40
            };
            e.left += $("nav:first")[0].offsetLeft;
            var t;
            if (_.contains(this.state.cActives, "sqm")) t = React.createElement(LeftPanel.QuickSubMenu, {
                data: this.props.qmd
            }), e.top = 121;
            else {
                var a = _.find(this.state.ssmd, function (e) {
                    return _.contains(this.state.cActives, "s" + e.sid)
                }, this);
                if (!a) return null;
                var l = {
                    actives: this.state.cActives,
                    d: a,
                    key: a.sid,
                    selected: this.state.e,
                    v: VIEW.STARTINGSOON,
                    viewAll: this.state.viewAll,
                    et: LeftPanel.StartingSoonEvent
                };
                t = React.createElement(LeftPanel.SubSport, l)
            }
            var s = {
                ref: "scrollbar",
                w: 213,
                h: function () {
                    return $(window).height()
                },
                ieMaxHeight: !0,
                onChange: this.scrollbarCallback,
                disable: LPM.disableScrollbar
            };
            return React.createElement("nav", {
                className: "otherSidebar",
                style: e,
                ref: "nav"
            }, React.createElement("div", {
                id: "lt-left",
                ref: "content"
            }, React.createElement(c, s, React.createElement("div", {
                key: 1,
                className: "sidebar-menu inPlay aother-sidebar"
            }, React.createElement("div", {
                className: "sidebar-row"
            }, React.createElement("ul", {
                className: "sub-menu sportsEvents brr-c-1"
            }, t))), React.createElement("br", {
                key: 2,
                style: {
                    clear: "both"
                }
            }))))
        },
        updateScrollbar: function () {
            if (this.isMounted() && this.refs.scrollbar && !this.state.collapsed) {
                var e = $(this.refs.content.getDOMNode()).height() > $(window).height();
                return this.scrollbarCallback(e), this.refs.scrollbar.update(), e
            }
        },
        scrollbarCallback: function (e) {
            var t = $(this.refs.nav.getDOMNode());
            e ? t.addClass("hasScroll") : t.removeClass("hasScroll")
        }
    }), e.exports = LPM
}, function (e, t, a) {
    "use strict";
    var l = React.createClass({
        displayName: "FullScreenBlock",
        getInitialState: function () {
            return this._getDataFromStore()
        },
        componentDidMount: function () {
            FSB_Store.addUpdateListener(this._onUpdate)
        },
        render: function () {
            return React.createElement("div", {
                className: "fullscreen" + (this.state.isDisplay ? "" : " hidden")
            }, React.createElement("div", {
                id: "container"
            }, this.state.content))
        },
        _getDataFromStore: function () {
            return FSB_Store.getData()
        },
        _onUpdate: function () {
            this.setState(this._getDataFromStore())
        }
    });
    e.exports = l
}, function (e, t, a) {
    "use strict";
    var c = React.createClass({
        displayName: "Popup",
        setTimeOutId: null,
        getInitialState: function () {
            return this._getDataFromStore()
        },
        componentDidMount: function () {
            PopUp_Store.addUpdateListener(this._onUpdate)
        },
        componentDidUpdate: function () {
            this.state.isDisplay && (this.setTimeOutId && clearTimeout(this.setTimeOutId), this.setTimeOutId = setTimeout(function () {
                Action.PopUp.hide()
            }, 3e3))
        },
        render: function () {
            var e = this.state.popupType == PopUp_Store.popUpType().MYEVENTS ? l.PopUp_MyEvents : l.MB_MyMarkets;
            return this.state.isDisplay ? React.createElement("div", {
                className: "border_lv3 notification" + (this.state.isAddedMsg ? " added" : " removed")
            }, this.state.isAddedMsg ? React.createElement("div", {
                className: "t-a-c pd-t-12 pd-b-12 bg-c-10 tbr-c-22 ft-c-18 add"
            }, l.PopUp_AddedTo, " ", React.createElement("a", {
                className: "myfav mg-r-10",
                onClick: this._onClick
            }, e), React.createElement("span", {
                className: "icon-addedtomyfav"
            })) : React.createElement("div", {
                className: "t-a-c pd-t-12 pd-b-12 bg-c-10 tbr-c-22 ft-c-18 remove"
            }, l.PopUp_RemovedFrom, " ", React.createElement("a", {
                className: "myfav mg-r-10",
                onClick: this._onClick
            }, e), React.createElement("span", {
                className: "icon-removedtomyfav"
            }))) : null
        },
        _getDataFromStore: function () {
            return PopUp_Store.getData()
        },
        _onUpdate: function () {
            this.setState(this._getDataFromStore())
        },
        _onClick: function () {
            ScrollerBar.scrollToTop(), Action.PopUp.hide()
        }
    });
    e.exports = c
}, function (e, t, a) {
    "use strict";
    var c = Object.assign || function (e) {
            for (var t = 1; t < arguments.length; t++) {
                var a = arguments[t];
                for (var l in a) Object.prototype.hasOwnProperty.call(a, l) && (e[l] = a[l])
            }
            return e
        },
        s = (a(0), React.createClass({
            displayName: "NotifyPopUp",
            getInitialState: function () {
                return this._getDataFromStore()
            },
            componentDidMount: function () {
                NotifyPopUp_Store.addUpdateListener(this._onUpdate), Action.NotifyPopUp.InitScrollBar()
            },
            componentDidUpdate: function () {
                Action.NotifyPopUp.InitScrollBar()
            },
            render: function () {
                if (!this.state.isDisplay) return null;
                var e = this.state,
                    t = (_.map(e.slide, function (t, a) {
                        return React.createElement("a", {
                            className: "bx-pager-item" + (t.color == e.current.color ? " active" : "")
                        })
                    }), _.map(e.slide, function (t, a) {
                        var l = {
                            index: a,
                            thisSlide: t,
                            currentSlide: e.current,
                            slides: e.slide,
                            isEnd: a === e.slide.length - 1
                        };
                        return React.createElement(s.Content, c({
                            key: "np_" + a
                        }, l))
                    }));
                return React.createElement("div", {
                    className: "fullscreen notificationwrapper"
                }, t)
            },
            _clickNext: function (e, t) {
                t.preventDefault(), t.stopPropagation(), Action.NotifyPopUp.NextStep(e)
            },
            _clickPrevious: function (e, t) {
                t.preventDefault(), t.stopPropagation(), Action.NotifyPopUp.PreviousStep(e)
            },
            _getDataFromStore: function () {
                return NotifyPopUp_Store.getData()
            },
            _onUpdate: function () {
                this.setState(this._getDataFromStore())
            }
        }));
    s.Content = React.createClass({
        displayName: "Content",
        getInitialState: function () {
            return {
                dir: "none",
                swipeType: "none",
                startX: 0,
                startY: 0,
                distX: 0,
                distY: 0,
                threshold: 150,
                restraint: 100,
                allowedTime: 500,
                elapsedTime: (new Date).getTime(),
                startTime: (new Date).getTime()
            }
        },
        render: function () {
            var e = this.props.slides,
                t = this.props.thisSlide,
                a = this.props.currentSlide,
                c = this.props.isEnd ? this._clickOK : this._clickNext.bind(this, t.color),
                s = _.map(e, function (e, a) {
                    return React.createElement("a", {
                        className: "bx-pager-item" + (t.color == e.color ? " active" : "")
                    })
                });
            return React.createElement("div", {
                className: "notification " + t.color + " " + t.size + (t.color == a.color ? "" : " hidden")
            }, React.createElement("div", {
                ref: "pagecontainer",
                className: "pagecontainer",
                onTouchStart: this._touchStart.bind(this),
                onTouchMove: this._touchMove.bind(this),
                onTouchEnd: this._touchEnd.bind(this)
            }, React.createElement("h1", null, l.NP_CD_T), React.createElement("a", {
                className: "previous" + (0 == this.props.index ? " disabled" : ""),
                onClick: this._clickPrevious.bind(this, t.color)
            }, React.createElement("div", null)), React.createElement("a", {
                className: "next" + (this.props.index == e.length - 1 ? " disabled" : ""),
                onClick: this._clickNext.bind(this, t.color)
            }, React.createElement("div", null)), React.createElement("div", {
                className: "dotcontainer"
            }, s), React.createElement("div", {
                className: "notificationscrollable"
            }, React.createElement("div", {
                className: "header "
            }, React.createElement("div", {
                className: "displaytable"
            }, React.createElement("div", {
                className: "headercontent "
            }, React.createElement("div", {
                className: "iconbg"
            }, React.createElement("div", {
                className: "notificationicon"
            }))))), React.createElement("div", {
                className: "txtContent"
            }, React.createElement("div", {
                dangerouslySetInnerHTML: {
                    __html: l[t.content]
                }
            }), React.createElement("div", {
                className: "buttons"
            }, React.createElement("input", {
                type: "submit",
                onClick: c,
                value: t.btn
            }))))))
        },
        _clickNext: function (e, t) {
            t.preventDefault(), t.stopPropagation(), Action.NotifyPopUp.NextStep(e)
        },
        _clickPrevious: function (e, t) {
            t.preventDefault(), t.stopPropagation(), Action.NotifyPopUp.PreviousStep(e)
        },
        _clickOK: function (e) {
            e.preventDefault(), e.stopPropagation(), Action.NotifyPopUp.FinishStep()
        },
        _touchStart: function (e) {
            var t = e.changedTouches[0];
            this.state.dir = "none", this.state.swipeType = "none", this.state.startX = t.pageX, this.state.startY = t.pageY, this.state.startTime = (new Date).getTime()
        },
        _touchMove: function (e) {
            var t = e.changedTouches[0];
            this.state.distX = t.pageX - this.state.startX, this.state.distY = t.pageY - this.state.startY, Math.abs(this.state.distX) > Math.abs(this.state.distY) ? this.state.dir = this.state.distX < 0 ? "left" : "right" : this.state.dir = this.state.distY < 0 ? "up" : "down"
        },
        _touchEnd: function (e) {
            e.changedTouches[0];
            this.state.elapsedTime = (new Date).getTime() - this.state.startTime, this.state.elapsedTime <= this.state.allowedTime && (Math.abs(this.state.distX) >= this.state.threshold && Math.abs(this.state.distY) <= this.state.restraint ? this.state.swipeType = this.state.dir : Math.abs(this.state.distY) >= this.state.threshold && Math.abs(this.state.distX) <= this.state.restraint && (this.state.swipeType = this.state.dir)), "left" == this.state.dir ? Action.NotifyPopUp.NextStep(this.props.currentSlide.color) : "right" == this.state.dir && Action.NotifyPopUp.PreviousStep(this.props.currentSlide.color)
        }
    }), e.exports = s
}]);