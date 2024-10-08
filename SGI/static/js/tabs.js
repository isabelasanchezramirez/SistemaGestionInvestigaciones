!function(a, b) {
    "use strict";
    function c(b) {
        var e, f, g = a("#" + b);
        a.apex.aTabs && (e = a.apex.aTabs.findClosestTab(g),
        e && (f = e.tabSet$.aTabs("getActive"),
        (f !== e && f.href !== d || !g.is(":visible")) && e.makeActive(),
        c(e.tabSet$[0].id)))
    }
    var d = "#SHOW_ALL"
      , e = "a-Tabs"
      , f = e + "-panel"
      , g = "aria-selected"
      , h = "aria-controls"
      , i = "aria-hidden"
      , j = "item--hint"
      , k = "after"
      , l = "before"
      , m = "selected"
      , n = "element-selected"
      , o = 100
      , p = "-fill"
      , q = "u-RTL"
      , r = b.getMessage("APEX.TABS.PREVIOUS")
      , s = b.getMessage("APEX.TABS.NEXT")
      , t = a.ui.keyCode;
    a.widget("apex.aTabs", {
        options: {
            mode: "standard",
            classPrefix: "a-Tabs",
            showHints: !1,
            useSlider: !0,
            useLocationHash: !1,
            useSessionStorage: !0,
            addMoveNextPrevious: !1,
            hidePreviousTab: !0,
            onRegionChange: function(a, b) {
                var c = this.tabs$.data("onRegionChange");
                c && c(a, b)
            },
            showAllScrollOffset: function() {
                return 0
            },
            tabsContainer$: !1,
            optionalSelectedClass: ""
        },
        activeTab: null,
        firstVisibleTab: null,
        lastVisibleTab: null,
        getTabs: function() {
            return this.tabs
        },
        getTab: function(a) {
            return this.tabs[a] || null
        },
        getActive: function() {
            return this.activeTab
        },
        movePrevious: function(a, b) {
            this._moveToRegion(a, "getPreviousVisible", "getNextVisible", b)
        },
        moveNext: function(a, b) {
            this._moveToRegion(a, "getNextVisible", "getPreviousVisible", b)
        },
        moveNextActive: function(a) {
            this.moveNext(this.activeTab, a)
        },
        movePreviousActive: function(a) {
            this.movePrevious(this.activeTab, a)
        },
        tabShouldBeHidden: function() {
            return "jump" !== this.options.mode && this.options.hidePreviousTab
        },
        getNextActiveTabFromSiblings: function(a) {
            var b = this._getScrollOffset()
              , c = a.getNextVisible(this.rtlMode);
            if (null !== c && c.getTop() < b)
                return c;
            var d = a.getPreviousVisible(this.rtlMode);
            return null !== d && b < a.getTop() ? d : null
        },
        getFirstVisibleTab: function(a, b) {
            if (!a)
                return null;
            if (!a.hidden)
                return a;
            for (; a[b]; )
                if (a = a[b],
                !a.hidden)
                    return a;
            return null
        },
        _onClick: function(a, b) {
            a.makeActive(!0),
            void 0 !== b && b.doNotFocus || a.link$.focus()
        },
        _moveToRegion: function(a, b, c, d) {
            var e = a[b]();
            if (null !== e)
                this._onClick(e, d);
            else {
                for (var f = a, g = f[c](); null !== g; )
                    f = g,
                    g = g[c]();
                this._onClick(f, d),
                this.firstVisibleTab.panel$.addClass("apex-rds-swap"),
                this.lastVisibleTab.panel$.addClass("apex-rds-swap")
            }
        },
        _showTabInList: function(a) {
            a.hidden = !1;
            var b = a.getNextVisible();
            null === b && (this.lastVisibleTab = a);
            var c = a.getPreviousVisible();
            null === c && (this.lastVisibleTab = a),
            a.tab$.show(),
            this.activeTab.href !== d && this.tabShouldBeHidden() && a !== this.activeTab ? a.panel$.hide() : this.options.hidePreviousTab || a.panel$.css("display", "")
        },
        _hideTabInList: function(a) {
            this.activeTab === a && (a.previous ? a.previous.makeActive(!0) : a.next && a.next.makeActive(!0)),
            a.hidden = !0,
            a === this.firstVisibleTab && (this.firstVisibleTab = a.getNextVisible()),
            a === this.lastVisibleTab && (this.lastVisibleTab = a.getPreviousVisible()),
            a.tab$.hide()
        },
        _getScrollOffset: function() {
            var a = 60;
            return this.tabs$.offset().top + this.tabs$.outerHeight() + a
        },
        _iterateThroughAndClear: function(a, b, c) {
            for (; null !== a; )
                a.link$.parent().removeClass(this.selectedClass),
                a.panel$.removeClass(this.ELEMENT_SELECTED_CLASS),
                this.jumpMode ? a.panel$.attr(i, "false") : c ? a.hidden || (a.panel$.attr(i, "false"),
                a.panel$.show()) : (this.options.hidePreviousTab && a.panel$.hide(),
                a.panel$.attr(i, "true")),
                a.tab$.removeClass(this.HINT_CLASS).attr(g, !1),
                a.link$.attr("tabIndex", "-1"),
                b ? (a.panel$.removeClass(this.AFTER_CLASS).addClass(this.BEFORE_CLASS),
                a.link$.parent().removeClass(this.AFTER_CLASS).addClass(this.BEFORE_CLASS),
                a = a.previous) : (a.panel$.addClass(this.AFTER_CLASS).removeClass(this.BEFORE_CLASS),
                a.link$.parent().addClass(this.AFTER_CLASS).removeClass(this.BEFORE_CLASS),
                a = a.next)
        },
        _create: function() {
            var b = this.tabs = {}
              , c = this.tabs$ = this.element
              , u = this
              , v = null
              , w = null
              , x = !1
              , y = !1
              , z = c.parent().parent().attr("id")
              , A = this.options.classPrefix
              , B = apex.storage.getScopedSessionStorage({
                usePageId: !0,
                useAppId: !0,
                regionId: this.tabs$.id
            });
            z && apex.region.create(z, {
                focus: function() {
                    var a = u.activeTab.link$;
                    return a.focus(),
                    a
                },
                widget: function() {
                    return u.tabs$
                }
            }),
            this.HINT_CLASS = A + "-" + j,
            this.BEFORE_CLASS = A + "-" + l,
            this.AFTER_CLASS = A + "-" + k,
            this.DEFAULT_SELECTED_CLASS = A + "-" + m,
            this.ELEMENT_SELECTED_CLASS = A + "-" + n,
            this.FILL_CLASS = A + "-" + p;
            var C = this.options
              , D = this.jumpMode = "jump" === C.mode
              , E = C.useSlider
              , F = C.useLocationHash
              , G = C.useSessionStorage
              , H = C.onRegionChange;
            this.selectedClass = this.DEFAULT_SELECTED_CLASS + " " + C.optionalSelectedClass;
            var I = function() {
                return c.hasClass(u.FILL_CLASS)
            }
              , J = function() {
                return null === v && (v = I()),
                v
            }
              , K = function() {
                return "table" === c.css("display")
            }
              , L = function() {
                if (!I() && !K() && E && null === w) {
                    var b = a('<div class="apex-rds-hover left"><a> <span class="a-Icon icon-left-chevron"></span> </a></div>')
                      , d = a('<div class="apex-rds-hover right" ><a> <span class="a-Icon icon-right-chevron"></span> </a></div>');
                    w = a("<div class='apex-rds-slider'>"),
                    w.append(b).append(d),
                    c.parent().prepend(w);
                    var e, f = function(a, b) {
                        var d = function() {
                            var a = b ? "+=20px" : "-=20px";
                            c.stop().animate({
                                scrollLeft: a
                            }, 100, "linear", d),
                            f()
                        }
                          , e = function() {
                            c.stop()
                        };
                        a.click(function() {
                            var a = b ? "+=200px" : "-=200px";
                            c.stop(!1, !1).animate({
                                scrollLeft: a
                            }, 100)
                        });
                        var f = function() {
                            var d, e = parseInt(c.css("paddingRight"), 10) + parseInt(c.css("paddingLeft"), 10), f = c[0].scrollWidth - e, g = c.width(), h = f - g, i = 0, j = c.scrollLeft();
                            return (d = b ? j >= h : j === i) ? (a.hide(),
                            !1) : (d || a.show(),
                            !0)
                        };
                        return a.hover(d, e),
                        {
                            checkState: f
                        }
                    }, g = f(d, !0), h = f(b, !1), i = function() {
                        h.checkState(),
                        g.checkState()
                    };
                    c.scroll(function() {
                        clearTimeout(e),
                        e = setTimeout(i, 200)
                    }),
                    a(window).on("apexwindowresized", i),
                    i()
                }
            }
              , M = function() {
                var j = 0
                  , k = 0;
                if (c.attr("role", "tablist").addClass(e),
                "rtl" === c.css("direction") && (c.addClass(q),
                y = u.rtlMode = !0),
                C.addMoveNextPrevious) {
                    var l = a('<button type="button" class="' + u.options.classPrefix + "-previous-region " + u.options.classPrefix + '-button" title="' + r + '" aria-label="' + r + '"><span class="a-Icon icon-left-chevron" aria-hidden="true"></span></button>')
                      , m = a('<button type="button" class="' + u.options.classPrefix + "-next-region " + u.options.classPrefix + '-button" title="' + s + '" aria-label="' + s + '"><span class="a-Icon icon-right-chevron" aria-hidden="true"></span></button>');
                    c.parent().prepend(l).append(m),
                    l.click(function() {
                        u.movePreviousActive()
                    }),
                    m.click(function() {
                        u.moveNextActive()
                    })
                }
                D && c.addClass("apex-rds-container--jumpNav"),
                c.css({
                    "white-space": "nowrap",
                    "overflow-x": "hidden"
                });
                var n, p = a("a", c), v = null;
                if (p.length <= 2 && p.eq(0).attr("href") === d)
                    return void c.remove();
                if (y && (p = a(p.get().reverse())),
                p.each(function() {
                    var e = a(this)
                      , l = e.attr("href")
                      , m = a(l);
                    if (m.attr("role", "tabpanel").addClass(f),
                    C.tabsContainer$) {
                        var o = m.outerHeight();
                        o > k && (k = o)
                    }
                    if (l === d && D)
                        return void e.parent().css("display", "none");
                    e.attr("role", "presentation");
                    var p = function(a) {
                        if (!I() && E && !K()) {
                            for (var b = -c.width() / 2, d = a.getLeft() / 2, e = a; null !== e.previous; )
                                e = e.previous,
                                d += e.tab$.outerWidth();
                            c.stop(!0, !0).animate({
                                scrollLeft: d + b
                            }, function() {})
                        }
                    }
                      , q = function(f) {
                        var h, j, k;
                        if (!this.hidden && (k = "." + u.selectedClass.trim().split(/\s+/).join("."),
                        j = b[c.find(k).find("a").attr("href")],
                        u._iterateThroughAndClear.call(u, this.previous, !0, l === d),
                        u._iterateThroughAndClear.call(u, this.next, !1, l === d),
                        u.firstVisibleTab.panel$.removeClass("apex-rds-swap"),
                        u.lastVisibleTab.panel$.removeClass("apex-rds-swap"),
                        void 0 !== n && clearTimeout(n),
                        F && (n = setTimeout(function() {
                            if ("history"in window && window.history && window.history.pushState)
                                history.pushState(null, null, l);
                            else {
                                var b = a(window).scrollTop();
                                location.hash = l,
                                a(window).scrollTop(b)
                            }
                        }, 10)),
                        u.tabShouldBeHidden() && m.show(),
                        u.activeTab = this,
                        this.panel$.attr(i, !1),
                        this.panel$.addClass(u.ELEMENT_SELECTED_CLASS),
                        this.tab$.attr(g, !0),
                        this.link$.removeAttr("tabindex"),
                        p(this),
                        e.parent().removeClass(u.HINT_CLASS).addClass(u.selectedClass),
                        G && B.setItem("activeTab", l),
                        "standard" === C.mode && a.apex.stickyWidget && u.activeTab.panel$.find(".js-stickyWidget-toggle").stickyWidget("refresh"),
                        h = {
                            mode: C.mode,
                            active: u.activeTab,
                            previous: j,
                            showing: "standard" === C.mode && j && u.activeTab !== j && j.href !== d
                        },
                        u._trigger("activate", {}, h),
                        c.trigger("tabsregionchange", [u.activeTab, C.mode]),
                        H.call(u, C.mode, u.activeTab),
                        f)) {
                            var o = 0;
                            if (D) {
                                var q = r.getTop();
                                o = apex.theme.defaultStickyTop(),
                                x = !0,
                                a("html,body").stop(!0, !0).animate({
                                    scrollTop: q - o
                                }, {
                                    duration: "slow",
                                    step: function(a, b) {
                                        var c = r.getTop() - o;
                                        c !== b.end && (b.end = c)
                                    },
                                    complete: function() {
                                        x = !1,
                                        F && (location.hash = l)
                                    }
                                })
                            } else
                                !function() {
                                    var a = null;
                                    C.showAllScrollOffset && (a = C.showAllScrollOffset()),
                                    c.data("showAllScrollOffset") && (a = c.data("showAllScrollOffset")()),
                                    a && window.scrollTo(0, a)
                                }()
                        }
                    }
                      , r = b[l] = {
                        href: l,
                        tabSet$: c,
                        panel$: m,
                        el$: m,
                        link$: e,
                        tab$: e.parent(),
                        forceActive: q,
                        makeActive: function(a) {
                            u.activeTab !== this && q.call(this, a)
                        },
                        show: function() {
                            u._showTabInList(r)
                        },
                        hide: function() {
                            u._hideTabInList(r)
                        },
                        moveNext: function(a) {
                            u.moveNext(r, a)
                        },
                        movePrevious: function(a) {
                            u.movePrevious(r, a)
                        },
                        getNextVisible: function(a) {
                            return a ? r.getPreviousVisible() : u.getFirstVisibleTab(r.next, "next")
                        },
                        getPreviousVisible: function(a) {
                            return a ? r.getNextVisible() : u.getFirstVisibleTab(r.previous, "previous")
                        },
                        getTop: function() {
                            return m.offset().top
                        },
                        getLeft: function() {
                            return this.tab$.offset().left
                        },
                        showHint: function() {
                            for (var a = this.previous, b = this.next; null !== a; )
                                a.tab$.removeClass(u.HINT_CLASS),
                                a = a.previous;
                            for (; null !== b; )
                                b.tab$.removeClass(u.HINT_CLASS),
                                b = b.next;
                            this.tab$.addClass(u.HINT_CLASS)
                        },
                        previous: v,
                        next: null
                    };
                    r.tab$.attr(h, l.substring(1)).attr("role", "tab");
                    var s = r.tab$.attr("id");
                    s || (s = r.href.substring(1) + "_tab",
                    r.tab$.attr("id", s)),
                    m.attr("aria-labelledby", s),
                    location.hash === l && F && (u.activeTab = r),
                    null === u.firstVisibleTab && (u.firstVisibleTab = r),
                    null !== v && (v.next = r),
                    v = r,
                    e.click(function(a) {
                        return u._onClick(r, a),
                        !1
                    }),
                    e.on("keydown", function(a) {
                        var b = a.which;
                        if (b === t.UP)
                            u.movePrevious(r);
                        else if (b === t.DOWN)
                            u.moveNext(r);
                        else if (b === t.RIGHT)
                            u.moveNext(r);
                        else if (b === t.LEFT)
                            u.movePrevious(r);
                        else if (b === t.HOME)
                            u.firstVisibleTab.link$.click();
                        else if (b === t.END)
                            u.lastVisibleTab.link$.click();
                        else {
                            if (b !== t.SPACE)
                                return;
                            r.link$.click()
                        }
                        a.preventDefault()
                    }),
                    r.panel$.on("apexaftershow", function(a) {
                        a.target === r.panel$[0] && r.show()
                    }),
                    r.panel$.on("apexafterhide", function(a) {
                        a.target === r.panel$[0] && r.hide()
                    }),
                    j++
                }),
                C.tabsContainer$) {
                    var z = parseInt(C.tabsContainer$.css("min-height").replace(/[^-\d\.]/g, ""), 10);
                    k <= 0 && (k = z),
                    C.tabsContainer$.css("min-height", k)
                }
                var A = function() {
                    if (J() && E) {
                        var a = c.width() / j;
                        a < o ? null === w && (c.removeClass(u.FILL_CLASS),
                        L()) : null !== w && (c.addClass(u.FILL_CLASS),
                        w.hide())
                    }
                };
                if (L(),
                A(),
                u.lastVisibleTab = v,
                y) {
                    var M = u.lastVisibleTab;
                    u.lastVisibleTab = u.firstVisibleTab,
                    u.firstVisibleTab = M
                }
                if (null === u.activeTab) {
                    if (G) {
                        var N = B.getItem("activeTab");
                        for (var O in b)
                            if (b.hasOwnProperty(O) && b[O].href === N) {
                                u.activeTab = b[O],
                                F && (location.hash = N);
                                break
                            }
                    }
                    null === u.activeTab && (u.activeTab = u.firstVisibleTab)
                }
                c.click(function() {
                    u.firstVisibleTab.link$.focus()
                }),
                a(window).on("apexwindowresized", A),
                D && u.lastVisibleTab.panel$.wrap("<div class='apex-rds-last-item-spacer'></div>")
            }
              , N = function() {
                if (M(),
                u.activeTab && u.activeTab.href !== d) {
                    var b = u.activeTab;
                    setTimeout(function() {
                        b.forceActive(!0)
                    }, 250)
                }
                var c = null;
                a(window).on("scroll", function() {
                    if (u.activeTab && u.activeTab.href === d) {
                        var a = u._getScrollOffset();
                        if (null === c)
                            for (var b = u.firstVisibleTab; b; )
                                !b.hidden && b.href !== d && b.getTop() < a && (c = b,
                                c.showHint()),
                                b = b.next;
                        else {
                            var e = u.getNextActiveTabFromSiblings(c);
                            null !== e && (c = e,
                            e.showHint())
                        }
                    }
                })
            }
              , O = function() {
                if (M(),
                u.activeTab) {
                    u.activeTab.forceActive(!0);
                    var b = a(window).height() / 3
                      , c = function() {
                        if (!x) {
                            var a = u.getNextActiveTabFromSiblings(u.activeTab);
                            null !== a && a.makeActive()
                        }
                    };
                    a(window).on("scroll", c).on("apexwindowresized", function() {
                        b = a(window).height() / 3,
                        c()
                    })
                }
            };
            D ? O() : N()
        }
    }),
    a.apex.aTabs.findClosestTab = function(b) {
        var c, d, g, h = null;
        return c = a(b).closest("." + f),
        c.length && (g = "#" + c[0].id,
        d = a("#" + c.attr("aria-labelledby")).closest("." + e),
        h = d.aTabs("getTab", g)),
        h
    }
    ,
    apex.message && apex.message.addVisibilityCheck(c),
    apex.widget.util.visibilityChange && a(document.body).on("atabsactivate", function(b, c) {
        var e, f, g, h;
        if (c.previous && (e = c.previous.panel$[0]),
        f = c.active.panel$[0],
        c.active.href === d) {
            g = a(b.target).aTabs("getTabs");
            for (h in g)
                g.hasOwnProperty(h) && c.previous && h !== c.previous.href && h !== d && apex.widget.util.visibilityChange(g[h].panel$[0], !0)
        } else if (c.previous && c.previous.href === d) {
            g = a(b.target).aTabs("getTabs");
            for (h in g)
                g.hasOwnProperty(h) && h !== c.active.href && h !== d && apex.widget.util.visibilityChange(g[h].panel$[0], !1)
        } else
            e && apex.widget.util.visibilityChange(e, !1),
            apex.widget.util.visibilityChange(f, !0)
    }),
    apex.widget.regionDisplaySelector = function(b, c) {
        var d = a("#" + b + "_RDS");
        return d.aTabs(a.extend({}, {
            classPrefix: "apex-rds"
        }, c)),
        {
            tabs: d.aTabs("getTabs"),
            moveNext: function(a, b) {
                d.aTabs("moveNext", a, b)
            },
            movePrevious: function(a, b) {
                d.aTabs("movePrevious", a, b)
            },
            getActiveTab: function() {
                return d.aTabs("getActive")
            }
        }
    }
}(apex.jQuery, apex.lang);
