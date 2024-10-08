"function" != typeof Object.create && (Object.create = function() {
    function a() {}
    return function(b) {
        if (1 !== arguments.length)
            throw new Error("This Object.create implementation only accepts one parameter.");
        return a.prototype = b,
        new a
    }
}());
var apex = {};
apex.jQuery = jQuery,
function(a, b) {
    "use strict";
    apex.gPageContext$ = a(document),
    apex.gParentPageContext$ = apex.gPageContext$,
    a(document).on("pagebeforecreate pageshow", function(b) {
        var c = a(b.target);
        "dialog" === c.data("role") ? 1 === c.has("[role='listbox']").length ? apex.gPageContext$ = apex.gParentPageContext$ : apex.gPageContext$ = a(b.target) : (apex.gPageContext$ = a(b.target),
        apex.gParentPageContext$ = apex.gPageContext$)
    }),
    a(document).on("pageshow", function(b) {
        var c = a(b.target).data();
        c.apexPageTransition && (a.mobile.defaultPageTransition = c.apexPageTransition),
        c.apexPopupTransition && (a.mobile.defaultDialogTransition = c.apexPopupTransition)
    });
    var c, d = 0, e = 0;
    a(window).resize(function() {
        a(window).height() == d && a(window).width() == e || (d = a(window).height(),
        e = a(window).width(),
        c && clearTimeout(c),
        c = setTimeout(function() {
            a(window).trigger("apexwindowresized"),
            c = null
        }, 200))
    });
    var f = /MSIE \d/.test(navigator.userAgent)
      , g = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(navigator.userAgent)
      , h = f || g
      , i = h && (f ? document.documentMode || 7 : g[1]);
    7 === i ? a("html").addClass("ie7 lt-ie8 lt-ie9 lte-ie9 lte-ie10") : 8 === i ? a("html").addClass("ie8 lt-ie9 lte-ie9 lte-ie10") : 9 === i ? a("html").addClass("ie9 lte-ie9 lte-ie10") : 10 === i && a("html").addClass("ie10 lte-ie10"),
    a(document).ready(function() {
        var b;
        a("body").append("<p id='hcmtest' style='position:absolute;top:0;left:-99999px;background-color:#878787;'></p>"),
        b = a("#hcmtest").css("background-color").toLowerCase(),
        a("#hcmtest").remove(),
        "#878787" !== b && "rgb(135, 135, 135)" !== b && a("body").addClass("u-HCM")
    })
}(apex.jQuery);
apex.debug = {},
apex.debug = function() {
    "use strict";
    apex.debug.log.apply(this, arguments)
}
,
function(a, b, c) {
    "use strict";
    function d() {}
    function e(a, b, d) {
        d !== c ? console.log(a, b, d) : b !== c ? console.log(a, b) : console.log(a)
    }
    var f = -1
      , g = d
      , h = d
      , i = d
      , j = d;
    window.console && console.log && ("undefined" == typeof console.log.apply ? (g = e,
    h = e,
    i = e,
    j = e) : (g = console.log,
    h = console.error ? console.error : console.log,
    i = console.warn ? console.warn : console.log,
    j = console.info ? console.info : console.log)),
    a.LOG_LEVEL = {
        OFF: 0,
        ERROR: 1,
        WARN: 2,
        INFO: 4,
        APP_TRACE: 6,
        ENGINE_TRACE: 9
    },
    a.getLevel = function() {
        var c;
        return f < 0 && (c = b("#pdebug", apex.gPageContext$).val(),
        f = "YES" === c ? a.LOG_LEVEL.INFO : /^LEVEL[0-9]$/.test(c) ? parseInt(c.substr(5), 10) : a.LOG_LEVEL.OFF),
        f
    }
    ,
    a.setLevel = function(c) {
        var d, e, g = f;
        f = "number" == typeof c ? c : a.LOG_LEVEL.OFF,
        (f < 0 || f > 9) && (f = a.LOG_LEVEL.OFF),
        f !== g && (d = "LEVEL" + f,
        e = b("#pdebug", apex.gPageContext$),
        0 === e.length && (e = b("<input id='pdebug' type='hidden' name='p_debug'>").prependTo(b("#wwvFlowForm", apex.gPageContext$))),
        e.val(d))
    }
    ,
    a.message = function(b) {
        var c = g;
        a.getLevel() >= b && b > 0 && (b === a.LOG_LEVEL.ERROR ? c = h : b <= a.LOG_LEVEL.WARN ? c = i : b <= a.LOG_LEVEL.INFO && (c = j),
        c.apply(console, Array.prototype.slice.call(arguments, 1)))
    }
    ,
    a.error = function() {
        h.apply(console, arguments),
        console.trace && console.trace()
    }
    ,
    a.warn = function() {
        a.getLevel() >= a.LOG_LEVEL.WARN && i.apply(console, arguments)
    }
    ,
    a.info = function() {
        a.getLevel() >= a.LOG_LEVEL.INFO && j.apply(console, arguments)
    }
    ,
    a.trace = function() {
        a.getLevel() >= a.LOG_LEVEL.APP_TRACE && g.apply(console, arguments)
    }
    ,
    a.log = function() {
        a.getLevel() > a.LOG_LEVEL.OFF && g.apply(console, arguments)
    }
    ,
    a.deprecated = function(b) {
        a.warn("DEPRECATED: " + b)
    }
}(apex.debug, apex.jQuery);
apex.util = {},
function(a, b) {
    "use strict";
    a.debounce = function(a, b) {
        var c;
        return function() {
            var d = arguments
              , e = this;
            clearTimeout(c),
            c = setTimeout(function() {
                c = null,
                a.apply(e, d)
            }, b)
        }
    }
    ,
    a.toArray = function(a, c) {
        var d, e = [];
        return "string" == typeof a ? (d = void 0 === c ? ":" : c,
        e = a.split(d)) : e = b.makeArray(a),
        e
    }
    ,
    a.escapeHTML = function(a) {
        return a.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;").replace(/\//g, "&#x2F;")
    }
    ,
    a.escapeRegExp = function(a) {
        var b = "";
        return a ? a.replace(/([\.\$\*\+\-\?\(\)\{\}\|\^\[\]\\])/g, "\\$1") : b
    }
    ;
    var c = new RegExp("([" + a.escapeRegExp(" !#$%&'()*+,./:;<=>?@[\\]^`{|}~\"") + "])","g");
    a.escapeCSS = function(a) {
        var b = "";
        return a ? a.replace(c, "\\$1") : b
    }
    ,
    a.escapeHTMLContent = a.escapeHTMLAttr = function(b) {
        return b = "" + b,
        a.escapeHTML(b)
    }
    ;
    var d = {
        markup: function(a) {
            return this.html += a,
            this
        },
        attr: function(b, c) {
            return 1 === arguments.length && (c = b,
            b = null),
            b && (this.html += " ",
            this.html += b,
            this.html += "='"),
            this.html += a.escapeHTMLAttr(c),
            b && (this.html += "'"),
            this
        },
        optionalAttr: function(b, c) {
            return c && "object" != typeof c && (this.html += " ",
            this.html += b,
            this.html += "='",
            this.html += a.escapeHTMLAttr(c),
            this.html += "'"),
            this
        },
        optionalBoolAttr: function(a, b) {
            return b === !0 && (this.html += " ",
            this.html += a),
            this
        },
        content: function(b) {
            return this.html += a.escapeHTMLContent(b),
            this
        },
        clear: function() {
            this.html = ""
        },
        toString: function() {
            return this.html
        }
    };
    a.htmlBuilder = function() {
        var a = Object.create(d);
        return a.clear(),
        a
    }
    ,
    a.makeApplicationUrl = function(a) {
        var b, c = "f?p=";
        if (c += a.appId || $v("pFlowId"),
        c += ":",
        c += a.pageId || $v("pFlowStepId"),
        c += ":",
        c += a.session || $v("pInstance"),
        c += ":",
        c += a.request || $v("pRequest"),
        c += ":",
        c += a.debug || $v("pdebug") || "",
        c += ":",
        c += a.clearCache || "",
        c += ":",
        a.itemNames && (c += a.itemNames.join(",")),
        c += ":",
        a.itemValues)
            for (b = 0; b < a.itemValues.length; b++)
                b > 0 && (c += ","),
                c += encodeURIComponent(a.itemValues[b]);
        return c += ":",
        c += a.printerFriendly || ""
    }
    ,
    a.showSpinner = function(c, d) {
        var e, f, g, h, i, j = a.htmlBuilder(), k = b(c ? c : "body"), l = b(window), m = k.offset(), n = b.extend({
            alert: apex.lang.getMessage("APEX.PROCESSING"),
            spinnerClass: ""
        }, d), o = {
            top: l.scrollTop(),
            left: l.scrollLeft()
        };
        return o.bottom = o.top + l.height(),
        o.right = o.left + l.width(),
        m.bottom = m.top + k.outerHeight(),
        m.right = m.left + k.outerWidth(),
        f = m.top > o.top ? m.top : o.top,
        g = m.bottom < o.bottom ? m.bottom : o.bottom,
        h = (g - f) / 2,
        i = o.top - m.top,
        i > 0 && (h += i),
        j.markup("<span").attr("class", "u-Processing" + (n.spinnerClass ? " " + n.spinnerClass : "")).attr("role", "alert").markup(">").markup("<span").attr("class", "u-Processing-spinner").markup(">").markup("</span>").markup("<span").attr("class", "u-VisuallyHidden").markup(">").content(n.alert).markup("</span>").markup("</span>"),
        e = b(j.toString()),
        e.appendTo(k),
        e.position({
            my: "center",
            at: "left+50% top+" + h + "px",
            of: k,
            collision: "fit"
        }),
        e
    }
    ,
    a.delayLinger = function() {
        function a(a) {
            var b = c[a];
            return b || (b = {
                count: 0,
                timer: null
            },
            c[a] = b),
            b
        }
        function b(a) {
            delete c[a]
        }
        var c = {}
          , d = 200
          , e = 1e3;
        return {
            start: function(b, c) {
                var e = a(b);
                e.count += 1,
                1 === e.count && null === e.timer && (e.start = (new Date).getTime(),
                e.timer = setTimeout(function() {
                    e.timer = null,
                    c()
                }, d))
            },
            finish: function(c, d) {
                var f, g = a(c);
                if (0 === g.count)
                    throw "delayLinger.finish called before start for scope " + c;
                f = (new Date).getTime() - g.start,
                g.count -= 1,
                0 === g.count && (null === g.timer ? f < e ? setTimeout(function() {
                    d(),
                    b(c)
                }, e - f) : (d(),
                b(c)) : (clearTimeout(g.timer),
                g.timer = null,
                b(c)))
            }
        }
    }(),
    a.setOuterHeight = function(a, c) {
        b.each(["borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom", "marginTop", "marginBottom"], function(b, d) {
            var e = parseInt(a.css(d), 10);
            isNaN(e) || (c -= e)
        }),
        a.height(c)
    }
    ,
    a.setOuterWidth = function(a, c) {
        b.each(["borderLeftWidth", "borderRightWidth", "paddingLeft", "paddingRight", "marginLeft", "marginRight"], function(b, d) {
            var e = parseInt(a.css(d), 10);
            isNaN(e) || (c -= e)
        }),
        a.width(c)
    }
    ,
    a.getDateFromISO8601String = function(a) {
        var b, c, d, e, f = 0, g = 0, h = 0, i = 0, j = /^(\d\d\d\d)-(\d\d)-(\d\d)(T(\d\d):(\d\d)(:(\d\d)(.(\d\d\d))?)?Z?)?$/.exec(a);
        if (!j)
            throw "Invalid date format";
        return c = parseInt(j[1], 10),
        d = parseInt(j[2], 10) - 1,
        e = parseInt(j[3], 10),
        j[5] && (f = parseInt(j[5], 10),
        g = parseInt(j[6], 10),
        j[8] && (h = parseInt(j[8], 10),
        j[10] && (i = parseInt(j[10], 10)))),
        b = new Date(Date.UTC(c, d, e, f, g, h, i))
    }
    ;
    var e = null;
    a.getTopApex = function() {
        function a(a) {
            var b;
            try {
                b = a.apex || null
            } catch (c) {
                b = null
            }
            return b
        }
        var b, c;
        if (null !== e)
            return e;
        if (e = a(top),
        null !== e)
            return e;
        for (b = window; c = a(b),
        null !== c && b.parent && b.parent !== b; )
            e = c,
            b = b.parent;
        return e
    }
    ;
    var f = null;
    a.getScrollbarSize = function() {
        var a;
        return null === f && (a = b("<div>").css({
            width: "100px",
            height: "100px",
            overflow: "scroll",
            position: "absolute",
            top: "-9999px"
        }).appendTo("body"),
        f = {
            width: a[0].offsetWidth - a[0].clientWidth,
            height: a[0].offsetHeight - a[0].clientHeight
        },
        a.remove()),
        f
    }
    ,
    a.invokeAfterPaint = (window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || function(a) {
        return window.setTimeout(a, 0)
    }
    ).bind(window),
    a.cancelInvokeAfterPaint = (window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || function(a) {
        return window.clearTimeout(a)
    }
    ).bind(window),
    a.stripHTML = function(a) {
        for (var b = /<[^<>]+>/; b.exec(a); )
            a = a.replace(b, "");
        return a
    }
    ;
    var g = null;
    a.applyTemplate = function(c, d) {
        function e(b) {
            return b.replace(n, function(b, c, e, f, h, i) {
                var j, k, m, n, o, p, q, r, s, t, u = null, v = d.defaultEscapeFilter, w = null;
                if (f && (e = f),
                e) {
                    if (d.includePageItems && (k = apex.item(e),
                    k.node && (w = k.getValue(),
                    w = k.displayValueFor(w))),
                    null === w && d.model && d.record) {
                        for (m = d.model,
                        n = d.record,
                        q = []; null === w && n && m; )
                            w = m.getValue(n, e) || null,
                            n = null,
                            null === w ? (s = l.exec(e),
                            s && (t = s[1],
                            r = m.getOption("fields"),
                            r.hasOwnProperty(t) && (w = r[t].label || r[t].heading || null)),
                            null === w && (o = m.getOption("parentModel"),
                            p = m.getOption("parentRecordId"),
                            o && p && (m = apex.model.get(o),
                            m && (q.push(o),
                            n = m.getRecord(p))))) : (r = m.getOption("fields"),
                            r[e].hasOwnProperty("escape") && (v = r[e].escape ? "HTML" : "RAW"),
                            r[e].hasOwnProperty("elementId") && (u = r[e].elementId));
                        for (j = 0; j < q.length; j++)
                            apex.model.release(q[j])
                    }
                    if (null === w && d.includeBuiltinSubstitutions && (w = g[e] || null),
                    null === w && d.extraSubstitutions && (w = d.extraSubstitutions[e] || null),
                    null === w)
                        w = "";
                    else if ("object" == typeof w && w.hasOwnProperty("d") ? w = w.d : u && (k = apex.item(u),
                    k.node && (w = k.displayValueFor(w))),
                    i || (i = v),
                    "HTML" === i)
                        w = a.escapeHTML(w);
                    else if ("ATTR" === i)
                        w = a.escapeHTMLAttr(w);
                    else if ("STRIPHTML" === i)
                        w = a.escapeHTML(a.stripHTML(w.replace("&nbsp;", "")));
                    else if ("RAW" !== i && i)
                        throw new Error("Invalid template filter: " + i)
                } else
                    w = "";
                return w
            })
        }
        var f, h, i, j, k, l = /^(.+)_LABEL$/, m = /#([_$A-Z0-9]+)#/, n = /&(([A-Z0-9_$#]+)|"([^"&\r\n]+)")(!([A-Z]+))?\./g, o = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script\s*>/gi;
        if (d = b.extend({
            placeholders: null,
            defaultEscapeFilter: "HTML",
            includePageItems: !0,
            model: null,
            record: null,
            extraSubstitutions: null,
            includeBuiltinSubstitutions: !0
        }, d || {}),
        !g && d.includeBuiltinSubstitutions && (g = {
            APP_ID: $v("pFlowId"),
            APP_PAGE_ID: $v("pFlowStepId"),
            APP_SESSION: $v("pInstance"),
            REQUEST: $v("pRequest"),
            DEBUG: $v("pdebug"),
            IMAGE_PREFIX: window.apex_img_dir || ""
        }),
        d.placeholders) {
            for (f = "",
            h = c,
            i = h.search(m); i >= 0; )
                j = h.match(m)[1],
                k = d.placeholders[j],
                k ? (f += e(h.substring(0, i)) + k,
                h = h.substring(i + j.length + 2)) : (f += e(h.substring(0, i + j.length + 1)),
                h = h.substring(i + j.length + 1)),
                i = h.search(m);
            f += e(h)
        } else
            f = e(c);
        for (; o.test(f); )
            f = f.replace(o, "");
        return f
    }
}(apex.util, apex.jQuery);
apex.locale = {},
function(a) {
    "use strict";
    var b = {
        language: "en",
        separators: {
            group: ",",
            decimal: "."
        },
        calendar: {
            abbrMonthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            abbrDayNames: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
        }
    };
    a.init = function(a) {
        b = a
    }
    ,
    a.getGroupSeparator = function() {
        return b.separators.group
    }
    ,
    a.getDecimalSeparator = function() {
        return b.separators.decimal
    }
    ,
    a.getAbbrevMonthNames = function() {
        return b.calendar.abbrMonthNames
    }
    ,
    a.getAbbrevDayNames = function() {
        return b.calendar.abbrDayNames
    }
    ,
    a.getLanguage = function() {
        return b.language
    }
}(apex.locale);
apex.lang = {},
function(a, b, c, d, e) {
    "use strict";
    function f(a, e) {
        var f, g = /%([0-9,%])/g;
        f = d.isArray(arguments[2]) ? arguments[2] : Array.prototype.slice.call(arguments, 2);
        var h = 0
          , i = e.replace(g, function(c, d) {
            var g;
            if ("%" === d)
                return "%";
            if (g = parseInt(d, 10),
            h++,
            g >= f.length)
                throw new Error("format(" + e + "): too few arguments");
            return a ? b.escapeHTML(f[g] + "") : f[g]
        });
        return h < f.length && c.error("Format(" + e + "): too many arguments. Expecting " + h + ", got " + f.length),
        i
    }
    var g = {};
    a.addMessages = function(a) {
        d.extend(g, a)
    }
    ,
    a.loadMessages = function(b) {
        var c, e, f = d.Deferred(), g = "wwv_flow.js_messages";
        return e = {
            p_app_id: $v("pFlowId"),
            p_lang: apex.locale.getLanguage(),
            p_version: "1",
            p_names: b
        },
        c = d.get(g, e, null, "json"),
        c.done(function(b) {
            a.addMessages(b),
            f.resolve()
        }).fail(function() {
            f.reject()
        }),
        f.promise()
    }
    ,
    a.clearMessages = function() {
        g = {}
    }
    ,
    a.getMessage = function(a) {
        var b;
        return b = g[a],
        null === b || b === e ? a : b
    }
    ,
    a.hasMessage = function(a) {
        var b;
        return b = g[a],
        null !== b && b !== e
    }
    ,
    a.formatMessage = function(b) {
        var c = a.getMessage(b)
          , d = [c].concat(Array.prototype.slice.call(arguments, 1));
        return a.format.apply(this, d)
    }
    ,
    a.format = function(a) {
        var b = Array.prototype.slice.call(arguments, 1);
        return f(!0, a, b)
    }
    ,
    a.formatMessageNoEscape = function(b) {
        var c = a.getMessage(b)
          , d = [c].concat(Array.prototype.slice.call(arguments, 1));
        return a.formatNoEscape.apply(this, d)
    }
    ,
    a.formatNoEscape = function(a) {
        var b = Array.prototype.slice.call(arguments, 1);
        return f(!1, a, b)
    }
}(apex.lang, apex.util, apex.debug, apex.jQuery);
apex.message = {},
function(a, b, c, d, e) {
    "use strict";
    function f(a, b, e) {
        var f, g = c.getTopApex().jQuery, h = null, i = [{
            id: "apexConfirmBtn",
            text: d.getMessage("APEX.DIALOG.OK"),
            click: function() {
                h = !0,
                g(this).dialog("close")
            }
        }];
        e.dialogClass || (e.dialogClass = "ui-dialog--notification"),
        f = "string" == typeof a ? g("<div><p>" + c.escapeHTML(a).replace(/\r\n|\n/g, "<br>") + "</p></div>") : a,
        b && i.unshift({
            text: d.getMessage("APEX.DIALOG.CANCEL"),
            click: function() {
                h = !1,
                g(this).dialog("close")
            }
        }),
        g("body").append(f),
        f.dialog({
            closeText: d.getMessage("APEX.DIALOG.CLOSE"),
            autoOpen: !0,
            modal: !0,
            dialogClass: e.dialogClass,
            draggable: !0,
            resizable: !1,
            title: "",
            closeOnEscape: !0,
            create: function() {
                g(this).closest(".ui-dialog").css("position", "fixed").attr("role", "alertdialog"),
                g("#apexConfirmBtn").addClass("ui-button--hot")
            },
            open: function() {
                apex.navigation.beginFreezeScroll(),
                g("#apexConfirmBtn").focus()
            },
            close: function() {
                apex.navigation.endFreezeScroll(),
                f.remove(),
                null === h && (h = !1),
                e.callback && (b ? e.callback(h) : e.callback())
            },
            buttons: i
        })
    }
    function g(a, c) {
        var d = c.closest("fieldset").parent();
        return d.length || (d = c.parent()),
        b("<div id='" + a + "_error_placeholder' data-template-id='FALLBACK_ET' class='u-hidden'></div>").appendTo(d)
    }
    function h(a) {
        var d, e = apex.item(a);
        return d = e.callbacks && e.callbacks.setFocusTo ? b.isFunction(e.callbacks.setFocusTo) ? e.callbacks.setFocusTo.call(e) : b(e.callbacks.setFocusTo) : b("#" + c.escapeCSS(a))
    }
    function i(a) {
        var d = {}
          , e = c.escapeCSS(a.pageItem) + "_error"
          , f = h(a.pageItem)
          , i = b("#" + c.escapeCSS(a.pageItem) + "_error_placeholder")
          , j = c.htmlBuilder();
        i.length || (i = g(a.pageItem, f),
        v[o] || (v[o] = "<div class='t-Form-error'>#ERROR_MESSAGE#</div>")),
        j.markup("<div").attr("id", e).markup(">").content(a.message).markup("</div>"),
        d.placeholders = {
            ERROR_MESSAGE: j.toString()
        },
        i.html(v[i.data(n)]),
        i.html(c.applyTemplate(i.html(), d)).removeClass(q).addClass(p),
        f.addClass(r).attr({
            "aria-invalid": !0,
            "aria-describedby": e
        })
    }
    function j(f) {
        var g, h, i, j, k, l, m, o = c.htmlBuilder(), r = {}, s = !0, t = b("#APEX_ERROR_MESSAGE");
        for (t.html(v[t.data(n)]),
        o.markup("<div").attr("class", "a-Notification a-Notification--error").markup(">"),
        o.markup("<h2").attr("class", "a-Notification-title aErrMsgTitle").markup(">"),
        i = 1 === f.length ? d.getMessage("FLOW.SINGLE_VALIDATION_ERROR") : d.formatMessage("FLOW.VALIDATION_ERROR", f.length),
        o.content(i).markup("</h2>"),
        o.markup("<ul").attr("class", "a-Notification-list htmldbUlErr").markup(">"),
        g = 0; g < f.length; g++) {
            if (j = f[g],
            o.markup("<li").attr("class", "a-Notification-item htmldbStdErr").markup(">"),
            m = j.pageItem || j.regionStaticId,
            m && o.markup("<a").attr("href", "#").optionalAttr("data-region", j.regionStaticId).optionalAttr("data-instance", j.instance).optionalAttr("data-record", j.recordId).optionalAttr("data-column", j.columnName).optionalAttr("data-for", j.pageItem).attr("class", "a-Notification-link").markup(">"),
            j.unsafe ? o.content(j.message) : o.markup(j.message),
            m && o.markup("</a>"),
            j.techInfo) {
                for (l = d.getMessage("APEX.ERROR.TECHNICAL_INFO"),
                o.markup("<button class='a-Button a-Button--notification js-showDetails' tabindex='-1' type='button'").attr("aria-label", l).attr("title", l).markup("><span class='a-Icon icon-info' aria-hidden='true'></span></button>"),
                o.markup("<div class='a-Notification-details' style='display:none'><h2>").content(l).markup("</h2><ul class='error_technical_info'>"),
                h = 0; h < j.techInfo.length; h++)
                    k = j.techInfo[h],
                    o.markup("<li><span class='a-Notification-detailName'>").content(k.name + ": ").markup("</span>"),
                    k.usePre && o.markup("<br>"),
                    o.markup("<span").attr("class", "a-Notification-detailValue" + (k.usePre ? " a-Notification--pre" : "")).markup(">").content(k.value).markup("</span></li>");
                o.markup("</ul></div>")
            }
            o.markup("</li>")
        }
        o.markup("</ul>"),
        o.markup("</div>"),
        r.placeholders = {
            MESSAGE: o.toString(),
            CLOSE_NOTIFICATION: d.getMessage("APEX.CLOSE_NOTIFICATION"),
            ERROR_MESSAGE_HEADING: d.getMessage("APEX.ERROR_MESSAGE_HEADING"),
            IMAGE_PREFIX: window.apex_img_dir || ""
        },
        t.html(c.applyTemplate(t.html(), r)),
        y.beforeShow && (s = y.beforeShow(a.TYPE.ERROR, t)),
        (s === e || s) && t.removeClass(q).addClass(p)
    }
    function k() {
        b("#APEX_ERROR_MESSAGE").removeClass(p).addClass(q)
    }
    var l = "page"
      , m = "inline"
      , n = "template-id"
      , o = "FALLBACK_ET"
      , p = "u-visible"
      , q = "u-hidden"
      , r = "apex-page-item-error"
      , s = "a-Form-error"
      , t = "aria-describedby"
      , u = "aria-invalid"
      , v = {}
      , w = []
      , x = []
      , y = {
        beforeShow: null,
        beforeHide: null,
        closeNotificationSelector: "button.t-Button--closeAlert"
    };
    a.TYPE = {
        SUCCESS: "success",
        ERROR: "error"
    },
    a.registerTemplates = function(c) {
        var d, e, f, g;
        if (b.isPlainObject(c))
            v = b.extend(v, c);
        else
            for (d = 0; d < c.length; d++)
                for (f = c[d].ids.split(","),
                e = 0; e < f.length; e++)
                    g = {},
                    g[f[e]] = c[d].markup,
                    a.registerTemplates(g)
    }
    ,
    a.clearTemplates = function() {
        v = {}
    }
    ,
    a.getTemplates = function() {
        return v
    }
    ,
    a.setThemeHooks = function(a) {
        y = b.extend(y, a)
    }
    ,
    a.showErrors = function(a) {
        var c, d, e, f, g = b.isPlainObject(a) ? [a] : a, h = [], k = b("#APEX_SUCCESS_MESSAGE");
        for (c = 0; c < g.length; c++)
            w.push(g[c]);
        for (d = 0; d < w.length; d++)
            e = w[d],
            f = "string" == typeof e.location ? [e.location] : e.location,
            b.inArray(m, f) > -1 && e.pageItem && i(e),
            b.inArray(l, f) > -1 && h.push(e);
        h.length > 0 && j(h),
        k.removeClass(p).addClass(q)
    }
    ,
    a.clearErrors = function(c) {
        function d(a) {
            h(a).removeAttr(u + " " + t).removeClass(r)
        }
        var f, g, i, j, k = !0, l = b("#APEX_ERROR_MESSAGE");
        if (c)
            d(c),
            i = b("#" + c + "_error_placeholder." + s);
        else {
            for (f = 0; f < w.length; f++)
                g = w[f],
                j = "string" == typeof g.location ? [g.location] : g.location,
                b.inArray(m, j) > -1 && g.pageItem && d(g.pageItem);
            i = b("span." + s),
            y.beforeHide && (k = y.beforeHide(a.TYPE.ERROR, l)),
            (k === e || k) && l.removeClass(p).addClass(q).html("")
        }
        i.html("").removeClass(p).addClass(q),
        w = []
    }
    ,
    a.showPageSuccess = function(f) {
        var g = !0
          , h = b("#APEX_SUCCESS_MESSAGE")
          , i = {
            placeholders: {
                SUCCESS_MESSAGE: f,
                CLOSE_NOTIFICATION: d.getMessage("APEX.CLOSE_NOTIFICATION"),
                SUCCESS_MESSAGE_HEADING: d.getMessage("APEX.SUCCESS_MESSAGE_HEADING"),
                IMAGE_PREFIX: window.apex_img_dir || ""
            }
        };
        a.clearErrors(),
        h.html(c.applyTemplate(v[h.data(n)], i)),
        y.beforeShow && (g = y.beforeShow(a.TYPE.SUCCESS, h)),
        (g === e || g) && h.removeClass(q).addClass(p)
    }
    ,
    a.hidePageSuccess = function() {
        var c = !0
          , d = b("#APEX_SUCCESS_MESSAGE");
        y.beforeHide && (c = y.beforeHide(a.TYPE.SUCCESS, d)),
        (c === e || c) && d.removeClass(p).addClass(q)
    }
    ,
    a.confirm = function(a, c) {
        var d;
        b.ui.dialog && "CSS1Compat" === document.compatMode ? f(a, !0, {
            callback: c
        }) : (d = confirm(a),
        c(d))
    }
    ,
    a.alert = function(a, c) {
        b.ui.dialog && "CSS1Compat" === document.compatMode ? f(a, !1, {
            callback: c
        }) : (alert(a),
        c && c())
    }
    ,
    a.addVisibilityCheck = function(a) {
        x.push(a)
    }
    ,
    b(document).ready(function() {
        b("#APEX_SUCCESS_MESSAGE").on("click", y.closeNotificationSelector, function(b) {
            a.hidePageSuccess(),
            b.preventDefault()
        }),
        b("#APEX_ERROR_MESSAGE").on("click", y.closeNotificationSelector, function(a) {
            k(),
            a.preventDefault()
        }).on("click", "a.a-Notification-link", function(a) {
            function c(a) {
                var b;
                for (b = 0; b < x.length; b++)
                    x[b](a)
            }
            var d, f, g, h = b(this), i = {};
            b.each(["data-region", "data-instance", "data-record", "data-column", "data-for"], function(a, b) {
                var c = b.substr(5)
                  , d = h.attr(b);
                d !== e && (i[c] = d)
            }),
            g = i["for"],
            g ? (c(g),
            0 === b("#" + g + "_CONTAINER,#" + g + "_DISPLAY,#" + g, apex.gPageContext$).filter(":visible").length && apex.item(g).show(),
            apex.item(g).setFocus()) : i.region && (f = i.region,
            c(f),
            d = apex.region(f),
            d && d.gotoError(i)),
            a.preventDefault()
        }).on("click", ".js-showDetails", function(a) {
            var c = b(this)
              , d = c.next();
            f(d, !1, {
                callback: function() {
                    c.after(d)
                },
                dialogClass: "ui-dialog--notificationLarge"
            })
        }).on("keydown", ".a-Notification-link", function(a) {
            112 === a.which && a.altKey && b(this).parent().find(".js-showDetails").click()
        })
    })
}(apex.message, apex.jQuery, apex.util, apex.lang);
apex.storage = {},
function(a, b, c) {
    "use strict";
    function d(a, b, c) {
        var d;
        return a() ? (d = Object.create(g),
        d.prefix = e(c),
        d._store = b,
        d._re = new RegExp("^" + d.prefix),
        d.length = f(d._store, d._re)) : (d = Object.create(h),
        d.prefix = e(c)),
        d
    }
    function e(a) {
        var d = (a.prefix || "") + ".";
        return a.useAppId !== c && null !== a.AppId || (a.useAppId = !0),
        a.useAppId && (d += b("#pFlowId").val() + "."),
        a.usePageId && (d += b("#pFlowStepId").val() + "."),
        a.regionId && (d += a.regionId + "."),
        d
    }
    function f(a, b) {
        var c, d = 0;
        for (c = 0; c < a.length; c++)
            b.test(a.key(c)) && (d += 1);
        return d
    }
    a.getCookieVal = function(a) {
        var b = document.cookie.indexOf(";", a);
        return b === -1 && (b = document.cookie.length),
        unescape(document.cookie.substring(a, b))
    }
    ,
    a.getCookie = function(b) {
        for (var c = b + "=", d = c.length, e = document.cookie.length, f = 0; f < e; ) {
            var g = f + d;
            if (document.cookie.substring(f, g) === c)
                return a.getCookieVal(g);
            if (f = document.cookie.indexOf(" ", f) + 1,
            0 === f)
                break
        }
        return null
    }
    ,
    a.setCookie = function(a, b) {
        var c = arguments
          , d = arguments.length
          , e = d > 2 ? c[2] : null
          , f = d > 3 ? c[3] : null
          , g = d > 4 ? c[4] : null
          , h = d > 5;
        document.cookie = a + "=" + escape(b) + (null === e ? "" : "; expires=" + e.toGMTString()) + (null === f ? "" : "; path=" + f) + (null === g ? "" : "; domain=" + g) + (h === !0 || "https:" === window.location.protocol ? "; secure" : "")
    }
    ,
    a.hasLocalStorageSupport = function() {
        var a = null
          , b = "$test$";
        return function() {
            if (null !== a)
                return a;
            if (window.Modernizr && window.Modernizr.hasOwnProperty("localstorage"))
                a = Modernizr.localstorage;
            else
                try {
                    localStorage.setItem(b, b),
                    localStorage.removeItem(b),
                    a = !0
                } catch (c) {
                    a = !1
                }
            return a
        }
    }(),
    a.hasSessionStorageSupport = function() {
        var a = null
          , b = "$test$";
        return function() {
            if (null !== a)
                return a;
            if (window.Modernizr && window.Modernizr.hasOwnProperty("sessionstorage"))
                a = Modernizr.localstorage;
            else
                try {
                    sessionStorage.setItem(b, b),
                    sessionStorage.removeItem(b),
                    a = !0
                } catch (c) {
                    a = !1
                }
            return a
        }
    }();
    var g = {
        prefix: "",
        length: 0,
        key: function(a) {
            var b, c, d = 0;
            if (a < this._store.length)
                for (b = 0; b < this._store.length; b++)
                    if (c = this._store.key(b),
                    this._re.test(c)) {
                        if (a === d)
                            return c;
                        d += 1
                    }
            return null
        },
        getItem: function(a) {
            return this._store.getItem(this.prefix + a)
        },
        setItem: function(a, b) {
            var c = this.getItem(a);
            this._store.setItem(this.prefix + a, b),
            null === c && (this.length += 1)
        },
        removeItem: function(a) {
            var b = this.getItem(a);
            this._store.removeItem(this.prefix + a),
            null !== b && (this.length -= 1)
        },
        clear: function() {
            var a, b;
            for (a = 0; a < this._store.length; a++)
                b = this._store.key(a),
                this._re.test(b) && this._store.removeItem(b);
            this.length = 0
        },
        sync: function() {
            this.length = f(this._store, this._re)
        }
    }
      , h = {
        prefix: "",
        length: 0,
        key: function(a) {
            return null
        },
        getItem: function(a) {
            return null
        },
        setItem: function(a, b) {},
        removeItem: function(a) {},
        clear: function() {}
    };
    a.getScopedSessionStorage = function(b) {
        return d(a.hasSessionStorageSupport, window.sessionStorage, b)
    }
    ,
    a.getScopedLocalStorage = function(b) {
        return d(a.hasLocalStorageSupport, window.localStorage, b)
    }
}(apex.storage, apex.jQuery);
apex.navigation = {},
function(a, b, c, d) {
    "use strict";
    var e = "apex_dialog_"
      , f = "apexclosedialoginternal";
    a.redirect = function(a) {
        c.mobile && a.substring(0, a.indexOf(":")) === "f?p=" + $v("pFlowId") && a.indexOf(",") < 0 ? c(":mobile-pagecontainer").pagecontainer("change", a, {
            reload: !0
        }) : location.href = a
    }
    ,
    a.popup = function(a) {
        var b = c.extend({
            url: "about:blank",
            name: "_blank",
            width: 600,
            height: 600,
            scroll: "yes",
            resizable: "yes",
            toolbar: "no",
            location: "no",
            statusbar: "no",
            menubar: "no"
        }, a)
          , d = window.open(b.url, "_blank" === (b.name + "").toLowerCase() ? b.name : b.name + "_" + $v("pInstance"), "toolbar=" + b.toolbar + ",scrollbars=" + b.scroll + ",location=" + b.location + ",status=" + b.statusbar + ",menubar=" + b.menubar + ",resizable=" + b.resizable + ",width=" + b.width + ",height=" + b.height);
        return d && (null === d.opener && (d.opener = window.self),
        d.focus()),
        d
    }
    ,
    a.openInNewWindow = function(a, b, c) {
        var e, f, g = c ? c.altSuffix || null : null;
        return b === d && (b = "_blank"),
        "_blank" !== b.toLowerCase() && (null === g && (g = $v("pInstance")),
        g && (b += "_" + g)),
        c && c.favorTabbedBrowsing === !0 || (f = /(msie) ([\w.]+)/.exec(navigator.userAgent.toLowerCase()) ? "personalbar,menubar,titlebar,toolbar,location,resizable,scrollbars" : "personalbar,menubar,titlebar,toolbar,location,status,resizable,scrollbars"),
        e = f ? window.open(a, b, f) : window.open(a, b),
        e && e.focus(),
        e
    }
    ,
    a.popup.url = function(b) {
        a.popup({
            url: b,
            name: "winLov",
            width: 800,
            height: 600
        })
    }
    ,
    a.popup.close = function(a, b) {
        window.opener.$x_Value(a, b),
        window.close()
    }
    ,
    b.getTopApex().navigation._gNextDialogId || (b.getTopApex().navigation._gNextDialogId = 1),
    a.dialog = function(f, g, h, i) {
        var j, k, l, m, n, o, p, q = {
            width: 500,
            maxWidth: 1500,
            height: 500,
            closeText: apex.lang.getMessage("APEX.DIALOG.CLOSE"),
            modal: !0,
            resizable: !1,
            scroll: "auto",
            closeOnEscape: !0,
            dialog: null,
            dialogClass: "ui-dialog--apex"
        }, r = c.extend(q, g);
        g.dialogClass && (r.dialogClass = "ui-dialog--apex " + g.dialogClass),
        o = r.close,
        r.close = function(a, c) {
            o && o(a, c),
            k.children("iframe").attr("src", ""),
            b.getTopApex().jQuery(this).dialog("destroy").remove()
        }
        ,
        p = r.beforeClose,
        r.beforeClose = function(a, b) {
            var d = c(this).children("iframe")[0].contentWindow.apex;
            p && p(a, b),
            d && d.page.cancelWarnOnUnsavedChanges()
        }
        ,
        h && (r.dialogClass += " " + h),
        c.mobile ? null === r.dialog ? (j = c(i, apex.gPageContext$),
        c.mobile && f.substring(0, f.indexOf(":")) === "f?p=" + $v("pFlowId") && (a.redirect(f),
        a.dialog.registerCloseHandler({
            handler$: j,
            dialog: c(".ui-dialog"),
            triggeringElement$: j,
            closeFunction: function() {
                a.redirect(i.context.URL)
            }
        }))) : c(window.parent.location).attr("href", f) : (j = c(i, apex.gPageContext$),
        r.modal ? null === r.dialog ? (l = e + b.getTopApex().navigation._gNextDialogId,
        b.getTopApex().navigation._gNextDialogId += 1,
        k = b.getTopApex().jQuery('<div id="' + l + '"><iframe src="' + b.escapeHTMLAttr(f) + '"title="' + b.escapeHTMLAttr(r.title) + '" width="100%" height="100%" style="min-width: 95%;height:100%;" scrolling="' + b.escapeHTMLAttr(r.scroll) + '"></iframe></div>'),
        k.on("dialogcreate", function() {
            c(this).closest(".ui-dialog").css("position", "fixed")
        }).on("dialogopen", function() {
            r.modal && b.getTopApex().navigation.beginFreezeScroll(),
            k.children("iframe").on("load", function() {
                c(this.contentDocument.body).on("keydown", function(a) {
                    if (a.which === c.ui.keyCode.ESCAPE && r.closeOnEscape)
                        k.dialog("close");
                    else if (a.which === c.ui.keyCode.TAB) {
                        var b = c(this).find(":tabbable").last()
                          , d = k.closest(".ui-dialog").find(":tabbable").first();
                        a.target !== b[0] || a.shiftKey || (d.focus(1),
                        a.preventDefault())
                    }
                })
            })
        }).on("dialogclose", function() {
            r.modal && b.getTopApex().navigation.endFreezeScroll()
        }).on("dialogresize", function() {
            var a = k.height()
              , b = k.width();
            k.closest(".ui-dialog").css("position", "fixed"),
            k.children("iframe").width(b).height(a)
        }),
        k.dialog(r),
        k.closest(".ui-dialog").on("keydown", function(a) {
            if (a.keyCode === c.ui.keyCode.TAB) {
                var b = c(k.children("iframe")[0].contentDocument.body).find(":tabbable")
                  , d = b.filter(":first")
                  , e = b.filter(":last")
                  , f = c(this).find(":tabbable")
                  , g = f.filter(":first")
                  , h = f.filter(":last");
                a.target !== h[0] && a.target !== k[0] || a.shiftKey ? a.target !== g[0] && a.target !== k[0] || !a.shiftKey || (e.focus(1),
                a.preventDefault()) : (d.focus(1),
                a.preventDefault())
            }
        }),
        a.dialog.registerCloseHandler({
            handler$: k,
            dialog: k,
            triggeringElement$: j,
            closeFunction: function() {
                k.dialog("close")
            }
        })) : r.dialog.dialog("option", "title", r.title).children("iframe").attr("src", f) : null === r.dialog ? (n = j.id !== d && j[0].id !== d && "" !== j[0].id && j ? j[0].id : "winDialog",
        m = a.popup({
            url: f,
            name: n,
            width: r.width,
            height: r.height
        }),
        a.dialog.registerCloseHandler({
            handler$: j,
            dialog: m,
            triggeringElement$: j,
            closeFunction: function() {
                m.close()
            }
        })) : (r.dialog.location.href = f,
        r.dialog.resizeTo(r.width, r.height)))
    }
    ,
    a.dialog.close = function(e, f) {
        function g() {
            try {
                if (window.opener.apex && window.opener.apex.jQuery)
                    return !0
            } catch (a) {
                return !1
            }
            return !1
        }
        function h(a) {
            var b, c, d, e = {};
            for (b = 0; b < a.length; b++)
                d = a[b],
                c = $v(d),
                e[d] = c;
            return e.dialogPageId = $v("pFlowStepId"),
            e
        }
        var i;
        c.isArray(f) && (f = h(f)),
        c.mobile ? c.isFunction(f) ? f.call(this, window) : a.redirect(apex.jQuery.ajaxSettings.url) : e ? a.dialog.fireCloseHandler(b.getTopApex().jQuery(".ui-dialog--apex").last().children(".ui-dialog-content"), f) : window.opener && !window.opener.closed && g() ? (i = window.name,
        i.lastIndexOf("_") > 0 && (i = i.substring(0, i.lastIndexOf("_"))),
        i === d ? window.close() : "winDialog" === i ? c.isFunction(f) ? f.call(this, window) : window.close() : a.dialog.fireCloseHandler(window.opener.apex.jQuery("#" + i), f)) : c.isFunction(f) ? f.call(this, window) : window.close()
    }
    ,
    a.dialog.cancel = function(b) {
        a.dialog.close(b, !1)
    }
    ,
    a.dialog.registerCloseHandler = function(b) {
        b.handler$.off(f).on(f, function(d, e) {
            var f;
            c.isFunction(e) ? e.call(this, b.dialog) : "string" === c.type(e) ? (f = location.href,
            a.redirect(e),
            location.href !== f && b.closeFunction()) : e === !1 ? b.closeFunction() : (b.closeFunction(),
            b.triggeringElement$.trigger("apexafterclosedialog", [e]))
        })
    }
    ,
    a.dialog.fireCloseHandler = function(a, b) {
        a.trigger(f, b)
    }
    ;
    var g, h = 0, i = function() {
        c(document.body).css("width", g),
        c(window).off("apexwindowresized", i)
    };
    a.beginFreezeScroll = function() {
        0 === h && (c(window).on("apexwindowresized", i),
        g = document.body.style.width,
        c(document.body).width(c(document.body).width()).addClass("apex-no-scroll")),
        h += 1
    }
    ,
    a.endFreezeScroll = function() {
        h -= 1,
        h <= 0 && (i(),
        c(document.body).removeClass("apex-no-scroll"),
        h = 0)
    }
}(apex.navigation, apex.util, apex.jQuery);
apex.event = {},
function(a, b) {
    "use strict";
    a.gCancelFlag = !1,
    a.trigger = function(c, d, e) {
        return a.gCancelFlag = !1,
        b(c, apex.gPageContext$).trigger(d, e),
        a.gCancelFlag
    }
}(apex.event, apex.jQuery);
apex.server = {},
apex.jQuery.ajaxSettings.traditional = !0,
apex.jQuery.ajaxPrefilter("script", function(a) {
    a.cache = !0
}),
function(a, b, c) {
    "use strict";
    function d(a) {
        var b, c, d = 8e3;
        if (a.length > d) {
            for (c = [],
            b = 0; b < a.length; )
                c.push(a.substr(b, d)),
                b += d;
            return c
        }
        return a
    }
    function e(a) {
        return !n[a.toLowerCase()]
    }
    function f(a, c) {
        var d, e, f;
        if (d = c.pageItems,
        b.isArray(d) || (d = [],
        b(c.pageItems, apex.gPageContext$).each(function() {
            this.id && d.push(this.id)
        })),
        f = a.getSessionState(d))
            if (c.pageItems = f.pageItems,
            c.regions) {
                for (o = 0; o < c.regions.length; o++)
                    if (e = c.regions[o],
                    e.id === f.region.id) {
                        c.regions[o] = b.extend(e, f.region);
                        break
                    }
                o >= c.regions.length && c.regions.push(f.region)
            } else
                c.regions = [f.region];
        return f
    }
    function g(a, d, f) {
        function g(a) {
            var c = [];
            return b("[name='" + a + "']").filter(function() {
                var a = this.type;
                return !this.disabled && r.test(this.nodeName) && !q.test(a) && (this.checked || !s.test(a))
            }).each(function() {
                c.push(b(this).val())
            }),
            0 === c.length ? c = "" : 1 === c.length && (c = c[0]),
            c
        }
        var h, i = [], j = 1;
        return f && b("form#wwvFlowForm").triggerHandler("submit"),
        d.salt = $v("pSalt"),
        a && (h = [],
        d.pageItems = {
            itemsToSubmit: h,
            "protected": $v("pPageItemsProtected"),
            rowVersion: $v("pPageItemsRowVersion")
        },
        b.isArray(a) && (a = a.map(function(a) {
            return "#" + c.escapeCSS(a)
        }).join(",")),
        b(a, apex.gPageContext$).each(function() {
            var a, d, k, l, m, n = this.id, o = b(this);
            if (e(n)) {
                if (k = apex.item(n),
                m = k.node && k.isDisabled() && f ? "" : o.attr("name") === n || apex.page.itemCallbacks[n] || k.item_type !== !1 && !f ? k.getValue(n) : g(n),
                b.isArray(m))
                    for (a = 0; a < m.length; a++)
                        m[a] = m[a].replace(p, "\r\n");
                else
                    m = m.replace(p, "\r\n");
                l = {
                    n: n,
                    v: m
                },
                "INPUT" === this.nodeName && "file" === this.type && this.name && this.files.length > 0 && (i.push(this),
                l.fileIndex = j,
                l.fileCount = this.files.length,
                j += this.files.length),
                d = b('input[data-for="' + c.escapeCSS(n) + '"]').val(),
                d && (l.ck = d),
                h.push(l)
            }
        })),
        i
    }
    function h(a, b, c, d, e, f, g) {
        function h(a) {
            var b = x[a];
            return b || (b = x[a] = []),
            b
        }
        function i(a) {
            var b, c, d = h(a);
            d.length >= 1 && (b = d[0],
            c = b.deferred.promise(),
            b.jqXHR = b.call(b.request, b.data, b.options, b.deferred),
            c.then(function(b, c) {
                d.shift(),
                setTimeout(function() {
                    i(a)
                }, 0)
            }, function(a, b) {
                setTimeout(function() {
                    var a, b;
                    for (a = 1; a < d.length; a++)
                        b = d[a],
                        b.options.error && b.options.error({
                            status: 0
                        }, "abort", null),
                        b.deferred.reject({
                            status: 0
                        }, "abort", null),
                        b.options.complete && b.options.complete({
                            status: 0
                        }, "abort");
                    d.length = 0
                }, 0)
            }))
        }
        function j(a, b) {
            var c;
            for (c = 0; c < a.length; c++)
                if (a[c].name === b)
                    return a[c];
            return null
        }
        var k, l, m, n;
        if ("lazyWrite" === b) {
            if (m = j(w, a))
                return m.deferred.reject({
                    status: 0
                }, "superseded", null),
                m.request = c,
                m.data = d,
                m.options = e,
                m.call = f,
                void (m.deferred = g);
            if (w.push({
                name: a,
                request: c,
                data: d,
                options: e,
                call: f,
                deferred: g
            }),
            u)
                return;
            null === v ? l = 10 : (l = v + t - (new Date).getTime(),
            l = l < 0 ? 10 : l),
            u = setTimeout(function() {
                var a;
                for (u = null,
                v = (new Date).getTime(); w.length > 0; )
                    a = w.shift(),
                    a.call(a.request, a.data, a.options, a.deferred)
            }, l)
        } else {
            if (k = h(a),
            "replace" === b && k.length >= 1)
                for (n = k.shift(),
                n.jqXHR ? n.jqXHR.abort() : n.deferred.reject({
                    status: 0
                }, "superseded", null); k.length > 0; )
                    n = k.shift(),
                    n.deferred.reject({
                        status: 0
                    }, "superseded", null);
            k.push({
                request: c,
                data: d,
                options: e,
                call: f,
                deferred: g
            }),
            1 === k.length && i(a)
        }
    }
    function i(a, c, d) {
        var e, f, g, i, k = b.Deferred();
        return d && d.queue ? (e = d.queue.name,
        f = d.queue.action,
        delete d.queue,
        h(e, f, a, c, d, j, k)) : g = j(a, c, d, k),
        i = k.promise(),
        i.abort = function() {
            g && g.abort()
        }
        ,
        i
    }
    function j(a, e, h, i) {
        function j(a) {
            return "string" == typeof a ? a.replace(p, "\r\n") : a
        }
        function k(a, b, c) {
            var d, e = b[c];
            if ("string" != typeof e && null !== e.length && void 0 !== e.length)
                for (d = 0; d < e.length; d++)
                    a.append(c, e[d]);
            else
                a.append(c, e)
        }
        var n, o, q, r, s, t, u, v, w, x, A, B, C, D, E, F, G = null, H = {
            dataType: "json",
            type: "post",
            async: !0,
            url: "wwv_flow.ajax",
            traditional: !0
        }, I = {
            p_flow_id: $v("pFlowId"),
            p_flow_step_id: $v("pFlowStepId"),
            p_instance: $v("pInstance"),
            p_debug: $v("pdebug")
        }, J = b();
        a && (I.p_request = a),
        h || (h = {}),
        ["accepts", "dataType", "beforeSend", "contents", "converters", "dataFilter", "headers", "complete", "statusCode", "async"].forEach(function(a) {
            h.hasOwnProperty(a) && (H[a] = h[a])
        }),
        s = h.success,
        t = h.error,
        E = h.loadingIndicatorPosition || "after",
        h.fullPage && (I.p_request = $v("pRequest"),
        I.p_reload_on_submit = $v("pReloadOnSubmit"),
        I.p_page_submission_id = $v("pPageSubmissionId"),
        H.url = "wwv_flow.accept"),
        B = {};
        for (r in e)
            if (e.hasOwnProperty(r))
                if (w = r.toLowerCase(),
                v = e[r],
                /f[0-5][0-9]/.exec(w))
                    if (b.isArray(v))
                        for (I[r] = [],
                        n = 0; n < v.length; n++)
                            I[r][n] = j(v[n]);
                    else
                        I[r] = d(j(v + ""));
                else
                    /x[0-2][0-9]/.exec(w) || z[w] ? I[r] = j(v) : null !== v && "object" == typeof v ? B[r] = b.extend(!0, b.isArray(v) ? [] : {}, v) : B[r] = v;
        if (h.target && (x = apex.region.findClosest(h.target),
        x && (A = f(x, B))),
        F = g(B.pageItems, B, h.fullPage),
        B.p_arg_names && B.p_arg_values && B.p_arg_names.length === B.p_arg_values.length)
            for (B.pageItems && B.pageItems.itemsToSubmit || (B.pageItems = {
                itemsToSubmit: [],
                "protected": $v("pPageItemsProtected"),
                rowVersion: $v("pPageItemsRowVersion")
            }),
            u = B.pageItems.itemsToSubmit,
            n = 0; n < B.p_arg_names.length; n++)
                u.push({
                    n: B.p_arg_names[n],
                    v: B.p_arg_values[n]
                });
        for (delete B.p_arg_names,
        delete B.p_arg_values,
        I.p_json = d(JSON.stringify(B)),
        I.p_files = [],
        n = 0; n < F.length; n++)
            for (o = 0; o < F[n].files.length; o++)
                I.p_files.push(F[n].files[o]);
        if (F.length > 0) {
            q = new FormData,
            H.enctype = "multipart/form-data",
            H.processData = !1,
            H.contentType = !1,
            k(q, I, "p_json");
            for (r in I)
                I.hasOwnProperty(r) && "p_json" !== r && k(q, I, r);
            H.data = q
        } else
            H.data = I;
        return apex.event.trigger(h.refreshObject, "apexbeforerefresh", h.refreshObjectData) ? (i.reject({
            status: 0
        }, "cancel", null),
        null) : (b.isFunction(h.clear) && h.clear(),
        (h.loadingIndicator || "page" === E) && (C = b('<span class="u-Processing u-Processing--inline"><span class="u-Processing-spinner"></span></span>'),
        y += 1,
        G = "_call" + y,
        c.delayLinger.start(G, function() {
            "page" === E ? (D = c.showSpinner(),
            J = J.add(D)) : b.isFunction(h.loadingIndicator) ? J = h.loadingIndicator(C) : b(h.loadingIndicator).each(function() {
                var a = null
                  , d = b(this, apex.gPageContext$)
                  , e = apex.item(this);
                D = C.clone(),
                x && x.alternateLoadingIndicator && (a = x.alternateLoadingIndicator(this, D)),
                a ? D = a : void 0 !== e.callbacks.loadingIndicator ? D = e.loadingIndicator(D) : "before" === E ? D = D.insertBefore(d.filter(":not(:hidden)")) : "after" === E ? D = D.insertAfter(d.filter(":not(:hidden)")) : "prepend" === E ? D = D.prependTo(d) : "append" === E ? D = D.appendTo(d) : "centered" === E && (D = c.showSpinner(d)),
                J = J.add(D)
            })
        })),
        H.error = function(a, b, c) {
            m(a, b, c, {
                deferred: i,
                callback: t,
                loadingIndicator: J,
                progressScopeName: G
            })
        }
        ,
        H.success = function(a, b, c) {
            l(a, b, c, {
                deferred: i,
                callback: s,
                errorCallback: H.error,
                loadingIndicator: J,
                progressScopeName: G,
                refreshObject: h.refreshObject,
                refreshObjectData: h.refreshObjectData
            })
        }
        ,
        A && A.beforeAsync && A.afterAsync && (A.beforeAsync(),
        i.always(function() {
            A.afterAsync()
        })),
        b.ajax(H))
    }
    function k(a, d) {
        function e() {
            b.isFunction(a) ? a() : b(a, apex.gPageContext$).remove()
        }
        d ? c.delayLinger.finish(d, function() {
            e()
        }) : e()
    }
    function l(a, c, d, e) {
        var f = !0
          , g = d.getResponseHeader("X-APEX-ERROR");
        if (a) {
            if (a.error)
                return e.errorCallback(d, "APEX", a.error);
            if (g)
                return e.errorCallback(d, "APEX", decodeURIComponent(g))
        }
        return k(e.loadingIndicator, e.progressScopeName),
        b.isFunction(e.callback) && (f = e.callback(a, c, d)),
        (f || void 0 == f) && apex.event.trigger(e.refreshObject, "apexafterrefresh", e.refreshObjectData) && (f = !1),
        e.deferred.resolve(a, c, d),
        f
    }
    function m(a, c, d, e) {
        var f, g = !1;
        return k(e.loadingIndicator, e.progressScopeName),
        b.isFunction(e.callback) ? g = e.callback(a, c, d) : 0 !== a.status && (f = "APEX" === c ? d : "Error: " + d,
        b.isFunction(window.onerror) ? window.onerror(f, null, null) : (apex.message.clearErrors(),
        apex.message.showErrors({
            message: f,
            location: "page"
        }))),
        e.deferred.reject(a, c, d),
        g
    }
    a.plugin = function(a, b, c) {
        var d = null;
        return "string" == typeof a ? d = "PLUGIN=" + a : (c = b,
        b = a),
        i(d, b, c)
    }
    ,
    a.pluginUrl = function(c, d) {
        return a.url(b.extend({}, d, {
            p_request: "PLUGIN=" + c
        }))
    }
    ,
    a.ajaxUrl = function(a, c) {
        function h(a) {
            return "string" == typeof a ? a.replace(p, "\r\n") : a
        }
        function i(a, c) {
            var d;
            if (b.isArray(c))
                for (d = 0; d < c.length; d++)
                    k = k + "&" + a + "=" + encodeURIComponent(c[d]);
            else
                k = k + "&" + a + "=" + encodeURIComponent(c)
        }
        var j, k, l, m, n, o, q;
        k = "wwv_flow.ajax?p_flow_id=" + $v("pFlowId") + "&p_flow_step_id=" + $v("pFlowStepId") + "&p_instance=" + $v("pInstance") + "&p_debug=" + $v("pdebug"),
        c || (c = {}),
        q = {};
        for (l in a)
            if (a.hasOwnProperty(l))
                if (m = l.toLowerCase(),
                o = a[l],
                e(m))
                    null !== o && "object" == typeof o ? q[l] = b.extend(!0, b.isArray(o) ? [] : {}, o) : q[l] = o;
                else if (b.isArray(o))
                    for (j = 0; j < a[l].length; j++)
                        i(l, d(h(o[j] + "")));
                else
                    i(l, d(h(o + "")));
        return c.target && (n = apex.region.findClosest(c.target),
        n && f(n, q)),
        g(q.pageItems, q),
        i("p_json", d(h(JSON.stringify(q)))),
        k
    }
    ,
    a.url = function(a, c) {
        var d, e, f, g, h = c;
        null !== h && void 0 !== h || (h = $v("pFlowStepId")),
        f = "wwv_flow.show?p_flow_id=" + $v("pFlowId") + "&p_flow_step_id=" + h + "&p_instance=" + $v("pInstance") + "&p_debug=" + $v("pdebug");
        for (e in a)
            if (a.hasOwnProperty(e))
                if ("pageItems" === e)
                    if (b.isArray(a.pageItems))
                        for (d = 0; d < a.pageItems.length; d++)
                            g = $x(a.pageItems[d]),
                            g && (f = f + "&p_arg_names=" + encodeURIComponent(g.id) + "&p_arg_values=" + encodeURIComponent($v(g)));
                    else
                        b(a.pageItems, apex.gPageContext$).each(function() {
                            f = f + "&p_arg_names=" + encodeURIComponent(this.id) + "&p_arg_values=" + encodeURIComponent($v(this))
                        });
                else
                    f = f + "&" + e + "=" + encodeURIComponent(a[e]);
        return f
    }
    ,
    a.process = function(a, b, c) {
        return i("APPLICATION_PROCESS=" + a, b, c)
    }
    ,
    a.chunk = d,
    a.loadScript = function(a, c) {
        var d, e, f, g, h = {};
        return a.requirejs && "function" == typeof define && define.amd ? (d = a.path,
        e = a.global,
        f = d.substring(0, d.length - 3),
        g = f.replace(/^.*[\\\/]/, ""),
        requirejs.s.contexts._.config.paths[g] && (g += b.guid++),
        h[g] = f,
        requirejs.config({
            paths: h
        }),
        require([g], function(a) {
            "string" == typeof e && (window[e] = a),
            "function" == typeof c && c()
        })) : b.getScript(a.path, c)
    }
    ;
    for (var n = {
        p_flow_id: 1,
        p_flow_step_id: 1,
        p_instance: 1,
        p_debug: 1,
        p_trace: 1,
        p_page_submission_id: 1,
        p_request: 1,
        p_reload_on_submit: 1,
        fmap: 1,
        fhdr: 1,
        fcud: 1,
        fcs: 1,
        frowid: 1
    }, o = 1; o <= 20; o++)
        n["x" + (o < 10 ? "0" + o : o)] = 1;
    for (o = 1; o <= 50; o++)
        n["f" + (o < 10 ? "0" + o : o)] = 1,
        n["f" + (o < 10 ? "0" + o : o) + "_NOSUBMIT"] = 1;
    for (o = 1; o <= 10; o++)
        n["p_ignore_" + (o < 10 ? "0" + o : o)] = 1;
    a.isValidPageItemName = e;
    var p = /\r?\n/g
      , q = /^(?:submit|button|image|reset|file)$/i
      , r = /^(?:input|select|textarea|keygen)/i
      , s = /^(?:checkbox|radio)$/i;
    a.addPageItemsToRequest = g,
    a.accept = function(a, c) {
        var d = b.Deferred();
        return c.fullPage = !0,
        j(null, a, c, d),
        d.promise()
    }
    ,
    a.widget = function(a, c, d) {
        var e = b.Deferred();
        return c = c || {},
        c.p_widget_name = a,
        j("APXWGT", c, d, e),
        e.promise()
    }
    ;
    var t = 5e3
      , u = null
      , v = null
      , w = []
      , x = {}
      , y = 0
      , z = {
        p_flow_id: 1,
        p_flow_step_id: 1,
        p_instance: 1,
        p_trace: 1,
        fcs: 1,
        fmap: 1,
        fhdr: 1,
        fcud: 1,
        frowid: 1,
        p_clob_01: 1,
        p_widget_name: 1,
        p_widget_mod: 1,
        p_widget_action: 1,
        p_widget_action_mod: 1,
        p_widget_num_return: 1,
        p_widget_view_mode: 1,
        p_fsp_region_id: 1,
        p_clear_cache: 1,
        p_pg_min_row: 1,
        p_pg_max_rows: 1,
        p_pg_rows_fetched: 1
    }
}(apex.server, apex.jQuery, apex.util);
apex.page = {},
function(a, b, c, d, e, f) {
    "use strict";
    function g(a, c) {
        var d, e, f = {};
        switch ("SUBMIT" === c ? d = null : "CONFIRM" === c && (d = "Delete"),
        e = {
            request: d,
            set: null,
            showWait: !1,
            waitMsg: null,
            form: "wwv_flow",
            reloadOnSubmit: null,
            ignoreChange: !0,
            validate: !1
        },
        typeof a) {
        case "string":
            f = b.extend(e, {
                request: a
            });
            break;
        case "object":
            f = b.extend(e, a);
            break;
        default:
            f = e
        }
        return f
    }
    function h(a, c, d) {
        var f = {};
        b(a[0].elements).each(function() {
            var a = this
              , b = a.name
              , g = a.type;
            if ("BUTTON" !== a.nodeName && "button" !== g && "submit" !== g && "reset" !== g && b && (d || !f[b]))
                return e.isValidPageItemName(b) ? (f[b] = 1,
                c(a, b, g)) : void 0
        })
    }
    function i(a, c) {
        var d, f, g = [], i = [], j = {};
        for (h(a, function(a, b) {
            g.push(b),
            i.push(a)
        }, !0),
        m = !0,
        f = e.addPageItemsToRequest(g, j, !0),
        d = 0; d < i.length; d++)
            b(i[d]).removeAttr("name");
        for (d = 0; d < f.length; d++)
            b(f[d]).attr("name", "p_files");
        for (j = e.chunk(JSON.stringify(j)),
        b.isArray(j) || (j = [j]),
        d = j.length - 1; d >= 0; d--)
            a.prepend("<input type='hidden' name='p_json' value='" + apex.util.escapeHTML(j[d]) + "'>");
        for (l = c,
        a.trigger("submit"),
        m = !1,
        d = 0; d < i.length; d++)
            b(i[d]).attr("name", g[d]);
        b("input[name='p_json']").remove()
    }
    function j(a, c, f) {
        var g, h, i = [], j = {}, k = {};
        b(a[0].elements).each(function() {
            var a = this
              , c = a.name
              , d = a.nodeName
              , f = a.type;
            if ("BUTTON" !== d && "button" !== f && "submit" !== f && "reset" !== f && c) {
                if (/x[0-2][0-9]/.exec(c)) {
                    if (a.disabled || "INPUT" === d && ("checkbox" === f || "radio" === f) && !a.checked)
                        return;
                    j[c] = b(a).val()
                }
                if (/f[0-5][0-9]|fcs|fmap|fhdr|fcud|frowid/.exec(c)) {
                    if (a.disabled || "INPUT" === d && ("checkbox" === f || "radio" === f) && !a.checked)
                        return;
                    j[c] || (j[c] = []),
                    j[c].push(b(a).val())
                }
                e.isValidPageItemName(c) && i.push(c)
            }
        }),
        i.length && (j.pageItems = i),
        apex.model && (h = apex.model.addChangesToSaveRequest(j)),
        c || (k.loadingIndicatorPosition = "page"),
        l = f,
        m = !0,
        g = e.accept(j, k),
        m = !1,
        h && h(g),
        g.done(function(a) {
            a.errors ? (c && (c.remove(),
            c = null),
            d.clearErrors(),
            d.showErrors(a.errors),
            l = !1) : a.redirectURL ? (apex.navigation.redirect(a.redirectURL),
            c = null) : l = !1
        }).fail(function(a, b, c) {
            l = !1
        }).always(function() {
            c && c.remove()
        })
    }
    a.itemCallbacks = {};
    var k = ".js-ignoreChange"
      , l = !1
      , m = !1
      , n = null
      , o = null;
    b(function() {
        b("#wwvFlowForm").on("submit", function(b) {
            if (!m)
                return a.submit(),
                !1
        })
    }),
    a.submit = function(d) {
        var e, h, k, l, n, o, p, q = !0, r = g(d, "SUBMIT");
        if (r.submitIfEnter !== f && (e = window.event ? window.event.keyCode : r.submitIfEnter.which,
        13 !== e))
            return !0;
        if (k = c.trigger(apex.gPageContext$, "apexbeforepagesubmit", r.request))
            c.gCancelFlag = !1;
        else {
            r.showWait && (l = apex.widget.waitPopup()),
            r.set && b.each(r.set, function(a, b) {
                a && b !== f && $s(a, b)
            }),
            o = b("form[name=" + r.form + "]", apex.gPageContext$),
            r.reloadOnSubmit && $s("pReloadOnSubmit", r.reloadOnSubmit),
            h = $v("pReloadOnSubmit"),
            b("#pRequest", apex.gPageContext$).val(r.request);
            try {
                window.external && "unknown" == typeof window.external.AutoCompleteSaveForm && window.external.AutoCompleteSaveForm(b("form[name=" + r.form + "]", apex.gPageContext$).get(0))
            } catch (s) {}
            n = 0,
            p = function() {
                "wwv_flow.accept" === o.attr("action") && 0 === b("#pPageItemsProtected", apex.gPageContext$).length ? (n++,
                n > 5 ? (l && l.remove(),
                apex.message.alert(apex.lang.getMessage("APEX.WAIT_UNTIL_PAGE_LOADED"))) : (l === f && 1 === n && (l = apex.widget.waitPopup()),
                setTimeout(p, 300))) : (r.validate && (a.validate(o) || (q = !1,
                apex.message.alert(apex.lang.getMessage("APEX.CORRECT_ERRORS"), function() {}))),
                q && (c.trigger(apex.gPageContext$, "apexpagesubmit", r.request),
                "S" === h ? j(o, l, r.ignoreChange) : "A" === h ? i(o, r.ignoreChange) : (m = !0,
                o.trigger("submit"),
                m = !1)))
            }
            ,
            p()
        }
        return r.submitIfEnter === f && void 0
    }
    ,
    a.confirm = function(b, c) {
        var d, e = g(c, "CONFIRM");
        d = b ? b : "Would you like to perform this delete action?",
        apex.message.confirm(d, function(b) {
            b && a.submit(e)
        })
    }
    ,
    a.validatePageItemsOnBlur = function() {
        b(b("#wwvFlowForm")[0].elements).each(function() {
            var a = this
              , c = a.name
              , f = a.type;
            "BUTTON" !== a.nodeName && "button" !== f && "submit" !== f && "reset" !== f && c && e.isValidPageItemName(c) && 0 === b(a).closest(k).length && b(a).on("blur.apexValidate", function(b) {
                var c, e, f = [];
                a.disabled || (c = apex.item(a),
                e = c.getValidity(),
                e.valid ? d.clearErrors(c.id) : (f.push({
                    message: c.getValidationMessage(),
                    location: "inline",
                    pageItem: c.id
                }),
                d.showErrors(f)))
            })
        })
    }
    ,
    a.validate = function(a) {
        var c = !0
          , e = [];
        return a || (a = b("#wwvFlowForm")),
        d.clearErrors(),
        h(a, function(a, b) {
            var d, f;
            d = apex.item(b),
            d.isDisabled() || (f = d.getValidity(),
            f.valid || (c = !1,
            e.push({
                message: d.getValidationMessage(),
                location: "inline",
                pageItem: d.id
            })))
        }),
        c && apex.model && (c = !apex.model.anyErrors()),
        c || d.showErrors(e),
        c
    }
    ,
    a.isChanged = function() {
        var a = !1;
        return apex.model && (a = apex.model.anyChanges()),
        a || h(b("#wwvFlowForm"), function(c, d) {
            if (!c.disabled)
                return 0 === b(c).closest(k).length && apex.item(d).isChanged() ? (a = !0,
                !1) : void 0
        }),
        !a && n && (a = n()),
        a
    }
    ,
    a.warnOnUnsavedChanges = function(c, d) {
        d && (n = d),
        b(window).off(".apexpageunload"),
        c || (c = apex.lang.getMessage("APEX.WARN_ON_UNSAVED_CHANGES")),
        o = c,
        b("button" + k).each(function() {
            var c = b(this)
              , d = c.prop("onclick");
            d && c.removeAttr("onclick").on("click", function() {
                a.cancelWarnOnUnsavedChanges(),
                d()
            })
        }),
        b("a" + k).on("click.apexpageunload", function() {
            a.cancelWarnOnUnsavedChanges()
        }),
        b(window).on("beforeunload.apexpageunload", function(b) {
            if (!l && a.isChanged())
                return o
        })
    }
    ,
    a.cancelWarnOnUnsavedChanges = function() {
        o = null,
        b(window).off("beforeunload.apexpageunload")
    }
    ,
    apex.submit = a.submit,
    apex.confirm = a.confirm
}(apex.page, apex.jQuery, apex.event, apex.message, apex.server);
!function(a, b) {
    "use strict";
    function c(a) {
        return b("#" + apex.util.escapeCSS(a), apex.gPageContext$)
    }
    var d = "apexregion"
      , e = "js-apex-region"
      , f = {
        type: "generic",
        refresh: function() {
            this.element.trigger("apexrefresh")
        },
        focus: function() {
            this.element.find(":tabbable").first().focus()
        },
        widget: function() {
            return null
        },
        gotoError: function(a) {},
        getSessionState: function(a) {
            return null
        }
    };
    apex.region = function(a) {
        var e = null
          , g = c(a);
        return g.length && (e = c(a).data(d),
        e || (e = b.extend({}, f),
        e.element = g)),
        e
    }
    ,
    apex.region.create = function(a, g) {
        var h, i = c(a);
        if (!i.length)
            throw new Error("Region element not found " + a);
        h = b.extend({}, f, g),
        h.element = i,
        i.addClass(e),
        i.data(d, h)
    }
    ,
    apex.region.destroy = function(a) {
        var b = c(a);
        if (!b.length)
            throw new Error("Region element not found " + a);
        b.removeData(d)
    }
    ,
    apex.region.isRegion = function(a) {
        var b = c(a);
        return !!b.length && !!b.data(d)
    }
    ,
    apex.region.findClosest = function(a) {
        var c = b(a).parent().closest("." + e).prop("id");
        return c ? apex.region(c) : null
    }
}(apex.debug, apex.jQuery);
!function(a, b, c) {
    "use strict";
    function d(e, f) {
        function g(a, c) {
            var d, e, f;
            try {
                switch (typeof a) {
                case "string":
                    B.node = b("#" + apex.util.escapeCSS(a), apex.gPageContext$)[0];
                    break;
                case "object":
                    B.node = a;
                    break;
                default:
                    B.node = !1
                }
                B.node && 1 === B.node.nodeType || (B.node = !1)
            } catch (g) {
                B.node = !1
            }
            if (B.node)
                if (B.id = B.node.id,
                c ? apex.page.itemCallbacks[B.id] = B.callbacks : apex.page.itemCallbacks[B.id] && (B.callbacks = apex.page.itemCallbacks[B.id]),
                d = B.node.nodeName.toUpperCase(),
                "FIELDSET" === d)
                    f = b(B.node),
                    B.item_type = !1,
                    f.hasClass("checkbox_group") ? B.item_type = "CHECKBOX_GROUP" : f.hasClass("radio_group") ? B.item_type = "RADIO_GROUP" : f.hasClass("shuttle") && (B.item_type = "SHUTTLE");
                else if ("INPUT" === d)
                    switch (B.item_type = B.node.type.toUpperCase(),
                    B.item_type) {
                    case "CHECKBOX":
                    case "RADIO":
                        break;
                    case "TEXT":
                        e = B.node.parentNode.className.toUpperCase(),
                        "LOV" === e && (b("#" + B.id + "_HIDDENVALUE", apex.gPageContext$).length > 0 ? B.item_type = "POPUP_KEY_LOV" : B.item_type = "POPUP_LOV");
                        break;
                    case "HIDDEN":
                        B.display_span = $x(B.id + "_DISPLAY"),
                        B.display_span && (B.item_type = "DISPLAY_SAVES_STATE");
                        break;
                    default:
                        B.item_type = "TEXT"
                    }
                else
                    switch (B.item_type = d,
                    B.item_type) {
                    case "TEXTAREA":
                        if ("html_editor" === B.node.parentNode.className && "FIELDSET" === B.node.parentNode.tagName)
                            B.item_type = "FCKEDITOR";
                        else
                            try {
                                window.CKEDITOR && window.CKEDITOR.instances[B.id] && (B.item_type = "CKEDITOR3")
                            } catch (g) {}
                        break;
                    case "SELECT":
                        break;
                    case "SPAN":
                        b(B.node).hasClass("display_only") && (B.item_type = "DISPLAY_ONLY");
                        break;
                    default:
                        B.item_type = !1
                    }
        }
        function h(a, c) {
            return b.isFunction(B.callbacks.reinit) ? B.callbacks.reinit.call(B, a, c) : void B.setValue(a, c, !0)
        }
        function i() {
            var a, d, e, f;
            if (!B.node)
                return "";
            if (b.isFunction(B.callbacks.getValue))
                return B.callbacks.getValue.call(B);
            switch (e = !0,
            f = [],
            B.item_type) {
            case "RADIO_GROUP":
                d = b(":checked", B.node),
                f = 0 === d.length ? "" : d.val();
                break;
            case "CHECKBOX_GROUP":
                b(":checked", B.node).each(function() {
                    f[f.length] = this.value
                });
                break;
            case "SELECT":
                f = b(B.node).val(),
                null !== f && f !== c || (f = b(B.node).attr("multiple") ? [] : "");
                break;
            default:
                e = !1
            }
            if (!e)
                switch (B.item_type) {
                case "CHECKBOX":
                    f = B.node.checked ? B.node.value : "";
                    break;
                case "RADIO":
                    f = B.node.checked ? B.node.value : "";
                    break;
                case "POPUP_KEY_LOV":
                    f = b("#" + B.node.id + "_HIDDENVALUE", apex.gPageContext$).val();
                    break;
                case "TEXT":
                case "POPUP_LOV":
                case "HIDDEN":
                case "DISPLAY_SAVES_STATE":
                case "TEXTAREA":
                    f = B.node.value;
                    break;
                case "DISPLAY_ONLY":
                    f = B.node.innerHTML;
                    break;
                case "FCKEDITOR":
                    a = FCKeditorAPI.GetInstance(B.node.id),
                    f = a.GetHTML();
                    break;
                default:
                    f = ""
                }
            return f
        }
        function j(a, c, d) {
            var e, f, g, h, i, j;
            if (b.isFunction(B.callbacks.setValue))
                B.callbacks.setValue.call(B, a, c, d);
            else {
                if (h = !1,
                i = b(B.node, apex.gPageContext$),
                !B.node)
                    return;
                switch (B.item_type) {
                case "RADIO_GROUP":
                    h = $x_FormItems(B.node, "RADIO");
                    break;
                case "CHECKBOX_GROUP":
                    h = $x_FormItems(B.node, "CHECKBOX");
                    break;
                case "POPUP_KEY_LOV":
                    b("#" + B.node.id + "_HIDDENVALUE", apex.gPageContext$).val(a),
                    i.val(c);
                    break;
                case "SELECT":
                    h = B.node.options;
                    break;
                default:
                    h = !1
                }
                if (h)
                    for (e = 0,
                    f = h.length; e < f; e++)
                        g = h[e].value == a,
                        "RADIO_GROUP" === B.item_type || "CHECKBOX_GROUP" === B.item_type ? h[e].checked = g : h[e].selected = g;
                else
                    switch (B.item_type) {
                    case "CHECKBOX":
                    case "RADIO":
                        B.node.checked = B.node.value === a;
                        break;
                    case "TEXT":
                    case "POPUP_LOV":
                    case "HIDDEN":
                    case "TEXTAREA":
                        i.val(a);
                        break;
                    case "DISPLAY_SAVES_STATE":
                        i.val(a),
                        b(B.display_span, apex.gPageContext$).html(a);
                        break;
                    case "DISPLAY_ONLY":
                        i.html(a);
                        break;
                    case "FCKEDITOR":
                        j = FCKeditorAPI.GetInstance(B.node.id),
                        j.SetHTML(a);
                        break;
                    default:
                        B.node.innerHTML = a
                    }
            }
            B.afterModify(),
            d || b(B.node).trigger("change")
        }
        function k() {
            b.isFunction(B.callbacks.enable) ? B.callbacks.enable.call(B) : (b(B.node).removeClass("apex_disabled").prop("disabled", !1),
            b.mobile && ("TEXTAREA" === B.item_type || b.inArray(B.node.type, ["text", "email", "url", "tel", "search", "number", "password", "time", "date", "month", "week", "datetime", "datetime-local", "color"]) >= 0) && b(B.node).textinput("enable")),
            B.afterModify()
        }
        function l() {
            b.isFunction(B.callbacks.disable) ? B.callbacks.disable.call(B) : (b(B.node).addClass("apex_disabled").prop("disabled", !0),
            b.mobile && ("TEXTAREA" === B.item_type || b.inArray(B.node.type, ["text", "email", "url", "tel", "search", "number", "password", "time", "date", "month", "week", "datetime", "datetime-local", "color"]) >= 0) && b(B.node).textinput("disable")),
            B.afterModify()
        }
        function m() {
            return b.isFunction(B.callbacks.isDisabled) ? B.callbacks.isDisabled.call(B) : !!b(B.node).prop("disabled")
        }
        function n(a) {
            var c = apex.util.escapeCSS(B.node.id)
              , d = b("#" + c + "_CONTAINER", apex.gPageContext$);
            d.length > 0 ? d.show() : a ? $x_ItemRow(B.node, "SHOW") : (b.isFunction(B.callbacks.show) ? B.callbacks.show.call(B) : (d = b("#" + c + "_DISPLAY", apex.gPageContext$),
            d.length > 0 ? d.show() : b(B.node).show().trigger("apexaftershow")),
            c && b("label[for=" + c + "]", apex.gPageContext$).show())
        }
        function o(a) {
            var c = apex.util.escapeCSS(B.node.id)
              , d = b("#" + c + "_CONTAINER", apex.gPageContext$);
            d.length > 0 ? d.hide() : a ? $x_ItemRow(B.node, "HIDE") : (b.isFunction(B.callbacks.hide) ? B.callbacks.hide.call(B) : (d = b("#" + c + "_DISPLAY", apex.gPageContext$),
            d.length > 0 ? d.hide() : b(B.node).hide().trigger("apexafterhide")),
            c && b("label[for=" + c + "]", apex.gPageContext$).hide())
        }
        function p() {
            var a, c, d, e, f = "";
            return a = B.getValue(),
            a = b.isArray(a) ? a.join(":") : "" + a,
            c = /^\s{1,}$/g,
            d = $x(B.node),
            "nullValue"in B.callbacks ? b.isFunction(B.callbacks.nullValue) ? B.callbacks.nullValue.call(B) : 0 === a.length || null === a || a === B.callbacks.nullValue || a.search(c) > -1 : ("SELECT" === B.item_type ? (apex.widget && apex.widget.report && apex.widget.report.tabular && apex.widget.report.tabular.gNullValueList && b.each(apex.widget.report.tabular.gNullValueList, function(a, b) {
                if (this.name === d.name)
                    return f = b.value,
                    !1
            }),
            e = d.multiple ? 0 === a.length || a === f : !(!f && "" !== f) && a === f) : e = 0 === a.length || null === a || a.search(c) > -1,
            e)
        }
        function q() {
            function a() {
                var a = f.length !== g.length;
                if (!a)
                    for (d = 0; d < g.length; d++)
                        if (f[d] !== g[d]) {
                            a = !0;
                            break
                        }
                return a
            }
            var d, e, f, g, h, i = !1;
            if (b.isFunction(B.callbacks.isChanged))
                return B.callbacks.isChanged.call(B);
            switch (B.item_type) {
            case "TEXTAREA":
            case "TEXT":
            case "POPUP_LOV":
                i = B.node.value !== B.node.defaultValue;
                break;
            case "SELECT":
                if (f = b(B.node).val(),
                "select-multiple" === B.node.type) {
                    for (f || (f = []),
                    g = [],
                    d = 0; d < B.node.options.length; d++)
                        e = B.node.options[d],
                        e.attributes.selected !== c && g.push(e.value);
                    i = a()
                } else {
                    for (g = "",
                    d = 0; d < B.node.options.length; d++)
                        if (e = B.node.options[d],
                        e.attributes.selected !== c) {
                            g = e.value;
                            break
                        }
                    i = f !== g
                }
                break;
            case "RADIO_GROUP":
                for (f = B.getValue(),
                g = "",
                h = $x_FormItems(B.node, "RADIO"),
                d = 0; d < h.length; d++)
                    if (h[d].defaultChecked) {
                        g = h[d].value;
                        break
                    }
                i = f !== g;
                break;
            case "CHECKBOX_GROUP":
                for (f = B.getValue(),
                g = [],
                h = $x_FormItems(B.node, "CHECKBOX"),
                d = 0; d < h.length; d++)
                    h[d].defaultChecked && g.push(h[d].value);
                i = a();
                break;
            case "RADIO":
            case "CHECKBOX":
                i = B.node.checked !== B.node.defaultChecked;
                break;
            case "POPUP_KEY_LOV":
                i = B.node.value !== B.node.defaultValue
            }
            return i
        }
        function r(c) {
            b.isFunction(B.callbacks.addValue) ? B.callbacks.addValue.call(B, c) : a.error("No default handling defined for addValue"),
            B.afterModify()
        }
        function s() {
            b.isFunction(B.callbacks.removeValue) ? B.callbacks.removeValue.call(B) : a.error("No default handling defined for removeValue"),
            B.afterModify()
        }
        function t() {
            var a;
            a = "setFocusTo"in B.callbacks ? b.isFunction(B.callbacks.setFocusTo) ? B.callbacks.setFocusTo.call(B) : b(B.callbacks.setFocusTo) : b("#" + apex.util.escapeCSS(B.id), apex.gPageContext$),
            a.focus()
        }
        function u(a, c) {
            var d;
            d = "setStyleTo"in B.callbacks ? b.isFunction(B.callbacks.setStyleTo) ? B.callbacks.setStyleTo.call(B) : b(B.callbacks.setStyleTo) : b("#" + apex.util.escapeCSS(B.id), apex.gPageContext$),
            d.css(a, c),
            B.afterModify()
        }
        function v() {
            b.isFunction(B.callbacks.afterModify) && B.callbacks.afterModify.call(B)
        }
        function w(a) {
            var c;
            return "loadingIndicator"in B.callbacks && b.isFunction(B.callbacks.loadingIndicator) && (c = B.callbacks.loadingIndicator.call(B, a)),
            c
        }
        function x(a) {
            var d = a;
            if (d !== c && null !== d || (d = ""),
            b.isFunction(B.callbacks.displayValueFor))
                d = B.callbacks.displayValueFor.call(B, a);
            else {
                if ("password" === B.node.type)
                    return "******";
                switch (B.item_type) {
                case "POPUP_KEY_LOV":
                    a === B.getValue() && (d = b(B.node).val());
                    break;
                case "SELECT":
                    a !== c && null !== a && (d = b(B.node).find("[value='" + apex.util.escapeCSS(a + "") + "']").html(),
                    d !== c && null !== d || (d = a))
                }
            }
            return d
        }
        function y() {
            var a = null;
            return a = b.isFunction(B.callbacks.getValidity) ? B.callbacks.getValidity.call(B) : B.node.validity || {
                valid: !0
            }
        }
        function z() {
            var a, c = "";
            return b.isFunction(B.callbacks.getValidationMessage) ? c = B.callbacks.getValidationMessage.call(B) : (a = b(B.node).attr("data-valid-message"),
            c = !B.getValidity().valid && a ? a : B.node.validationMessage || ""),
            c
        }
        function A() {
            return b.isFunction(B.callbacks.getPopupSelector) ? B.callbacks.getPopupSelector.call(B) : null
        }
        if (!(this instanceof d))
            return new apex.item(e,f);
        var B = this;
        this.node = !1,
        this.item_type = !1,
        this.id = !1,
        this.getValue = i,
        this.init = g,
        this.reinit = h,
        this.setValue = j,
        this.isEmpty = p,
        this.isChanged = q,
        this.enable = k,
        this.disable = l,
        this.isDisabled = m,
        this.show = n,
        this.hide = o,
        this.addValue = r,
        this.removeValue = s,
        this.setFocus = t,
        this.setStyle = u,
        this.afterModify = v,
        this.loadingIndicator = w,
        this.displayValueFor = x,
        this.getValidity = y,
        this.getValidationMessage = z,
        this.getPopupSelector = A,
        f ? this.callbacks = f : this.callbacks = {},
        this.init(e, f)
    }
    apex.item = d,
    apex.item.create = function(a, b) {
        apex.item(a, b)
    }
}(apex.debug, apex.jQuery);
function $d_LOV_from_JSON() {
    function a(a, c, d, e, f, g) {
        var h = apex.jQuery.parseJSON(c);
        if ("SHUTTLE" == b.l_Type) {
            var i = '<table cellspacing="0" cellpadding="0" border="0" class="ajax_shuttle" summary=""><tbody><tr><td class="shuttleSelect1" id="shuttle1"></td><td align="center" class="shuttleControl"><img title="Reset" alt="Reset" onclick="g_Shuttlep_v01.reset();" src="/i/htmldb/icons/shuttle_reload.png"/><img title="Move All" alt="Move All" onclick="g_Shuttlep_v01.move_all();" src="/i/htmldb/icons/shuttle_last.png"/><img title="Move" alt="Move" onclick="g_Shuttlep_v01.move();" src="/i/htmldb/icons/shuttle_right.png"/><img title="Remove" alt="Remove" onclick="g_Shuttlep_v01.remove();" src="/i/htmldb/icons/shuttle_left.png"/><img title="Remove All" alt="Remove All" onclick="g_Shuttlep_v01.remove_all();" src="/i/htmldb/icons/shuttle_first.png"/></td><td class="shuttleSelect2" id="shuttle2"></td><td class="shuttleSort2"><img title="Top" alt="Top" onclick="g_Shuttlep_v01.sort2(\'T\');" src="/i/htmldb/icons/shuttle_top.png"/><img title="Up" alt="Up" onclick="g_Shuttlep_v01.sort2(\'U\');" src="/i/htmldb/icons/shuttle_up.png"/><img title="Down" alt="Down" onclick="g_Shuttlep_v01.sort2(\'D\');" src="/i/htmldb/icons/shuttle_down.png"/><img title="Bottom" alt="Bottom" onclick="g_Shuttlep_v01.sort2(\'B\');" src="/i/htmldb/icons/shuttle_bottom.png"/></td></tr></tbody></table>';
            $x(a).innerHTML = i;
            var j = $dom_AddTag("shuttle1", "select")
              , k = $dom_AddTag("shuttle2", "select");
            j.multiple = !0,
            k.multiple = !0;
            for (var l = 0, m = h.row.length; l < m; l++)
                if (h.row[l]) {
                    var n = !!h.row[l].C && parseInt(h.row[l].C);
                    if (n)
                        var o = $dom_AddTag(k, "option");
                    else
                        var o = $dom_AddTag(j, "option");
                    o.text = h.row[l].D,
                    o.value = h.row[l].R
                }
            if (window.g_Shuttlep_v01 = null,
            !p)
                var p = [];
            return p[2] = j,
            p[1] = k,
            window.g_Shuttlep_v01 = new dhtml_ShuttleObject(j,k),
            window.g_Shuttlep_v01
        }
        if ("SELECT" == b.l_Type || "MULTISELECT" == b.l_Type) {
            for (var j = $dom_AddTag(a, "select"), l = 0, m = h.row.length; l < m; l++)
                if (h.row[l]) {
                    var o = $dom_AddTag(j, "option");
                    o.text = h.row[l].D,
                    o.value = h.row[l].R;
                    var n = parseInt(h.row[l].C);
                    o.selected = n
                }
            return b.l_Dom = j,
            b
        }
        if ("RADIO" == b.l_Type) {
            for (var q = $dom_AddTag(a, "table"), l = 0, m = h.row.length; l < m; l++)
                if (h.row[l]) {
                    (l % 10 == 0 || g) && (lrow = $dom_AddTag(q, "tr"));
                    var r = $dom_AddTag(lrow, "td")
                      , n = !1;
                    f && f == h.row[l].R && (n = !0);
                    var s = $dom_AddInput(r, "radio", h.row[l].R);
                    s.checked = n,
                    $dom_AddTag(r, "span", h.row[l].D)
                }
            return b.l_Dom = j,
            b
        }
        if ("CHECKBOX" == b.l_Type) {
            for (var q = $dom_AddTag(a, "table"), l = 0, m = h.row.length; l < m; l++)
                if (h.row[l]) {
                    (l % 10 == 0 || g) && (lrow = $dom_AddTag(q, "tr"));
                    var r = $dom_AddTag(lrow, "td")
                      , n = parseInt(h.row[l].C)
                      , s = $dom_AddInput(r, "checkbox", h.row[l].R);
                    s.checked = n,
                    $dom_AddTag(r, "span", h.row[l].D)
                }
            return b.l_Dom = j,
            b
        }
        for (var t = $dom_AddTag(a, "div"), l = 0, m = h.row.length; l < m; l++)
            if (h.row[l] && h.row[l].R) {
                var u = h.row[l].D ? h.row[l].D : h.row[l].R
                  , v = $dom_AddTag(t, b.l_Type.toUpperCase(), u);
                b.l_NewEls[b.l_NewEls.length] = v,
                v.id = h.row[l].R;
                var n = parseInt(h.row[l].C);
                n && (v.className = "checked")
            }
        return b.l_Dom = t,
        b
    }
    var b = this;
    this.l_Type = !1,
    this.l_Json = !1,
    this.l_This = !1,
    this.l_JSON = !1,
    this.l_Id = "json_temp",
    this.l_NewEls = [],
    this.create = a,
    this.l_Dom = !1
}
function item_menu(a, b) {
    $x_Style("item_menu", "position", "absolute");
    for (var c = $x("item_menu").getElementsByTagName("a"), d = 0, e = c.length; d < e; d++) {
        var f = c[d].href;
        f = f.split(":"),
        f[f.length - 1] = b,
        c[d].href = $u_ArrayToString(f, ":")
    }
    dhtml_ButtonDropDown(a, "item_menu"),
    $x_Show("item_menu")
}
function doMultiple(a, b) {
    a = $u_Carray(a);
    for (var c = 0; c < a.length; c++) {
        var d = $x(a[c]);
        apex.item(d)[b]()
    }
    return $u_Narray(a)
}
function base_disableItem(a, b) {
    b = !!b,
    $x(a) && (a = [a]);
    for (var c = 0, d = a.length; c < d; c++) {
        var e = $x_object(a[c]);
        if (e) {
            var f = e.node;
            "RADIO_GROUP" == e.item_type || "CHECKBOX_GROUP" == e.item_type ? (f = $x_FormItems(f, "RADIO_GROUP" == e.item_type ? "RADIO" : "CHECKBOX"),
            base_disableItem(f, b)) : "radio" == f.type || "checkbox" == f.type ? (apex.jQuery(f).toggleClass("apex_disabled_multi", b),
            f.disabled = b) : (apex.jQuery(f).toggleClass("apex_disabled", b),
            f.disabled = b)
        }
    }
    return 1 == a.length && (a = a[0]),
    a
}
function htmldb_Get(a, b, c, d, e, f, g) {
    function h(a) {
        this.node = $x(a)
    }
    function i(a) {
        var b = 0;
        for (b = this.node.childNodes.length - 1; b >= 0; b--)
            this.node.removeChild(this.node.childNodes[b]);
        this.node.appendChild(a)
    }
    this.obj = $x(a),
    this.proc = f ? f : "wwv_flow.show",
    this.flow = b ? b : $v("pFlowId"),
    this.request = c ? c : "",
    this.page = d ? d : "0",
    this.queryString = g ? g : null,
    this.params = "",
    this.response = "",
    this.base = null,
    this.syncMode = !1,
    this.addParam = htmldb_Get_addParam,
    this.add = htmldb_Get_addItem,
    this.getPartial = htmldb_Get_trimPartialPage,
    this.getFull = function(a) {
        var b, c;
        return a && (this.obj = $x(a)),
        this.obj && ("INPUT" == this.obj.nodeName ? this.obj.value = this.response : document.all ? (b = this.response,
        c = this.obj,
        setTimeout(function() {
            htmldb_get_WriteResult(c, b)
        }, 100)) : $s(this.obj, this.response)),
        this.response
    }
    ,
    this.get = function(a, b, c) {
        var d;
        try {
            d = new XMLHttpRequest
        } catch (e) {
            d = new ActiveXObject("Msxml2.XMLHTTP")
        }
        try {
            new Date;
            return d.open("POST", this.base, this.syncMode),
            d.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"),
            d.send(null == this.queryString ? this.params : this.queryString),
            this.response = d.responseText,
            this.node && this.replaceNode(d.responseXML),
            null == a || "PPR" == a ? this.getPartial(b, c) : "XML" == a ? d.responseXML : this.getFull()
        } catch (e) {
            return
        }
    }
    ,
    this.url = htmldb_Get_getUrl,
    this.escape = htmldb_Get_escape,
    this.clear = htmldb_Get_clear,
    this.sync = htmldb_Get_sync,
    this.setNode = h,
    this.replaceNode = i;
    var j = window.location.href.indexOf("?") > 0 ? window.location.href.substring(0, window.location.href.indexOf("?")) : window.location.href;
    this.base = j.substring(0, j.lastIndexOf("/")),
    this.proc || (this.proc = j.substring(j.lastIndexOf("/") + 1)),
    this.base = this.base + "/" + this.proc,
    null == e || "" == e ? this.instance = $v("pInstance") : this.instance = e,
    g || (this.addParam("p_request", this.request),
    this.addParam("p_instance", this.instance),
    this.addParam("p_flow_id", this.flow),
    this.addParam("p_flow_step_id", this.page))
}
function htmldb_Get_sync(a) {
    this.syncMode = a
}
function htmldb_Get_clear(a) {
    this.addParam("p_clear_cache", a)
}
function htmldb_Get_getUrl() {
    return null == this.queryString ? this.base + "?" + this.params : this.queryString
}
function htmldb_Get_escape(a) {
    return a += "",
    a = a.replace(/\%/g, "%25"),
    a = a.replace(/\+/g, "%2B"),
    a = a.replace(/\ /g, "%20"),
    a = a.replace(/\./g, "%2E"),
    a = a.replace(/\*/g, "%2A"),
    a = a.replace(/\?/g, "%3F"),
    a = a.replace(/\\/g, "%5C"),
    a = a.replace(/\//g, "%2F"),
    a = a.replace(/\>/g, "%3E"),
    a = a.replace(/\</g, "%3C"),
    a = a.replace(/\{/g, "%7B"),
    a = a.replace(/\}/g, "%7D"),
    a = a.replace(/\~/g, "%7E"),
    a = a.replace(/\[/g, "%5B"),
    a = a.replace(/\]/g, "%5D"),
    a = a.replace(/\`/g, "%60"),
    a = a.replace(/\;/g, "%3B"),
    a = a.replace(/\?/g, "%3F"),
    a = a.replace(/\@/g, "%40"),
    a = a.replace(/\&/g, "%26"),
    a = a.replace(/\#/g, "%23"),
    a = a.replace(/\|/g, "%7C"),
    a = a.replace(/\^/g, "%5E"),
    a = a.replace(/\:/g, "%3A"),
    a = a.replace(/\=/g, "%3D"),
    a = a.replace(/\$/g, "%24")
}
function htmldb_Get_addParam(a, b) {
    "" == this.params ? this.params = a + "=" + (null != b ? this.escape(b) : "") : this.params = this.params + "&" + a + "=" + (null != b ? this.escape(b) : "")
}
function htmldb_Get_addItem(a, b) {
    this.addParam("p_arg_names", a),
    this.addParam("p_arg_values", b)
}
function htmldb_Get_trimPartialPage(a, b, c) {
    c && (this.obj = $x(c)),
    a || (a = "<!--START-->"),
    b || (b = "<!--END-->");
    var d, e, f = this.response.indexOf(a);
    if (f > 0) {
        this.response = this.response.substring(f + a.length);
        var g = this.response.indexOf(b);
        this.response = this.response.substring(0, g)
    }
    return this.obj && (document.all ? (d = this.response,
    e = this.obj,
    setTimeout(function() {
        htmldb_get_WriteResult(e, d)
    }, 100)) : $s(this.obj, this.response)),
    this.response
}
function htmldb_get_WriteResult(a, b) {
    $s(a, b)
}
function htmldb_ExternalPost(a, b, c) {
    var d = "f?p=" + $x("pFlowId").value + ":" + $x("pFlowStepId").value + ":" + $x("pInstance").value + ":FLOW_FOP_OUTPUT_R" + b;
    document.body.innerHTML = document.body.innerHTML + '<div style="display:none;" id="dbaseSecondForm"><form id="xmlFormPost" action="' + c + '?ie=.pdf" method="post" target="pdf"><textarea name="vXML" id="vXML" style="width:500px;height:500px;"></textarea></form></div>';
    var e = $x("vXML")
      , f = new htmldb_Get(e,null,null,null,null,"f",d.substring(2));
    f.get(),
    f = null,
    setTimeout(function() {
        $x("xmlFormPost").submit()
    }, 10)
}
function $xml_Control(a) {
    function b(a, b, c) {
        var d = $x(b);
        if (document.all) {
            this.xsl_processor.addParameter("xpath", a),
            this.xsl_processor.input = this.xml,
            this.xsl_processor.transform;
            var e = this.xsl_processor.output
        } else {
            this.xsl_processor.setParameter(null, "xpath", a);
            var e = this.xsl_processor.transformToFragment(this.xml, this.ownerDocument)
        }
        if (d)
            return ie ? $s(d, e) : ($s(d, ""),
            d.appendChild(e)),
            e
    }
    this.xsl_string = '<?xml version="1.0"?><xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"><xsl:output method="html"/><xsl:param name="xpath" /><xsl:template match="/"><xsl:copy-of select="//*[@id=$xpath]"/></xsl:template></xsl:stylesheet>',
    document.all ? (this.xsl_object = new ActiveXObject("Msxml2.FreeThreadedDOMDocument.3.0"),
    this.xsl_object.async = !1,
    this.xsl_object.loadXML(this.xsl_string),
    tmp = new ActiveXObject("Msxml2.XSLTemplate.3.0"),
    tmp.stylesheet = this.xsl_object,
    this.xsl_processor = tmp.createProcessor()) : (this.xsl_object = (new DOMParser).parseFromString(this.xsl_string, "text/xml"),
    this.xsl_processor = new XSLTProcessor,
    this.xsl_processor.importStylesheet(this.xsl_object),
    this.ownerDocument = document.implementation.createDocument("", "test", null)),
    this.xml = a,
    this.CloneAndPlace = b
}
function $a_PostClob(a, b, c, d) {
    var e = new htmldb_Get(null,$v("pFlowId"),b,c,null,"wwv_flow.accept");
    e.AddArrayClob($x(a).value, 1),
    e.GetAsync(d),
    e = null
}
function $a_GetClob(a, b, c) {
    var d = new htmldb_Get(null,$v("pFlowId"),a,b,null,"wwv_flow.accept");
    d.GetAsync(c),
    d = null,
    x = null
}
function $s_Split(a, b) {
    var c = [];
    if (a.length <= b)
        c[c.length] = a;
    else {
        for (; a.length > 4e3; )
            c[c.length] = a.substr(0, 4e3),
            a = a.substr(4e3, a.length - 4e3);
        c[c.length] = a.substr(0, 4e3)
    }
    return c
}
function json_SetItems(a) {
    a = apex.jQuery.parseJSON(a);
    for (var b = 0, c = a.item.length; b < c; b++)
        apex.item(a.item[b].id).setValue(a.item[b].value)
}
function $x(a) {
    return apex.item(a).node
}
function $x_object(a) {
    return apex.item(a)
}
function $v(a) {
    var b = apex.item(a).getValue();
    return apex.jQuery.isArray(b) ? b.join(":") : b
}
function $v2(a) {
    return apex.item(a).getValue()
}
function $s(a, b, c, d) {
    return apex.item(a).setValue(b, c, d)
}
function $u_Carray(a) {
    return $x(a) ? [a] : a
}
function $u_Narray(a) {
    return 1 == a.length ? a[0] : a
}
function $nvl(a, b) {
    return null != a ? a : b ? b : ""
}
function $x_Check_For_Compound(a) {
    var b = $x(a);
    return b && $x(b.id + "_fieldset") ? $x(b.id + "_fieldset") : b
}
function $x_Style(a, b, c) {
    a = $u_Carray(a);
    for (var d = 0; d < a.length; d++) {
        var e = $x(a[d]);
        e ? e.style[b] = c : null
    }
    return $u_Narray(a)
}
function $x_Hide(a) {
    return doMultiple(a, "hide")
}
function $x_Show(a) {
    return doMultiple(a, "show")
}
function $x_Show_Hide(a, b) {
    $x_Hide(b),
    $x_Show(a)
}
function $x_Toggle(a) {
    var b, c, d;
    a = $u_Carray(a);
    for (var e = 0; e < a.length; e++)
        c = $x(a[e]),
        "string" == typeof a[e] ? b = a[e] : a[e].id && (b = a[e].id),
        b && (d = apex.jQuery("#" + b + "_CONTAINER").get(0),
        d || (d = apex.jQuery("#" + b + "_DISPLAY").get(0))),
        d || (d = c),
        c && (0 === apex.jQuery(d).filter(":visible").length ? $x_Show(c) : $x_Hide(c));
    return $u_Narray(a)
}
function $x_Remove(a) {
    a = $u_Carray(a);
    for (var b = 0, c = a.length; b < c; b++) {
        var d = $x(a[b])
          , e = d.parentNode;
        d && e && (e.removeChild(d),
        e.normalize())
    }
    return $u_Narray(a)
}
function $x_Value(a, b) {
    a = $u_Carray(a);
    for (var c = 0, d = a.length; c < d; c++) {
        var e = $item(a[c]);
        e.setValue(b)
    }
}
function $x_UpTill(a, b, c) {
    var d = $x(a);
    if (d) {
        var e = d.parentNode;
        if (c)
            for (; e && (e.nodeName != b || !apex.jQuery(e).hasClass(c)); )
                e = e.parentNode;
        else
            for (; e && e.nodeName != b; )
                e = e.parentNode;
        return e || !1
    }
    return !1
}
function $x_ItemRow(a, b) {
    var c, d;
    a = $u_Carray(a);
    for (var e = 0; e < a.length; e++)
        if (c = $x_Check_For_Compound(a[e]),
        d = $x_UpTill(c, "TR"))
            switch (b) {
            case "TOGGLE":
                $x_Toggle(d);
                break;
            case "SHOW":
                $x_Show(d);
                break;
            case "HIDE":
                $x_Hide(d)
            }
}
function $x_HideItemRow(a) {
    $x_ItemRow(a, "HIDE")
}
function $x_ShowItemRow(a) {
    $x_ItemRow(a, "SHOW")
}
function $x_ToggleItemRow(a) {
    $x_ItemRow(a, "TOGGLE")
}
function $x_HideAllExcept(a, b) {
    var c = $x(a);
    return c && ($x_Hide(b),
    $x_Show(c)),
    c
}
function $x_HideSiblings(a) {
    var b = apex.jQuery($x(a));
    return b.show().siblings().hide().get()
}
function $x_ShowSiblings(a) {
    var b = apex.jQuery($x(a));
    return b.show().siblings().show().get()
}
function $x_Class(a, b) {
    $x(a) && (a = [a]);
    for (var c = a.length, d = 0; d < c; d++)
        $x(a[d]) && ($x(a[d]).className = b);
    return $u_Narray(a)
}
function $x_SetSiblingsClass(a, b, c) {
    var d = apex.jQuery($x(a));
    return d.siblings().removeClass("").addClass(b),
    c && d.removeClass("").addClass(c),
    d.get()
}
function $x_ByClass(a, b, c) {
    var d = c ? c + "." + a : "." + a;
    return apex.jQuery(d, $x(b)).get()
}
function $x_ShowAllByClass(a, b, c) {
    lClass = c ? c + "." + b : "." + b,
    apex.jQuery(lClass, $x(a)).show()
}
function $x_ShowChildren(a) {
    apex.jQuery($x(a)).children().show()
}
function $x_HideChildren(a) {
    apex.jQuery($x(a)).children().hide()
}
function $x_disableItem(a, b) {
    var c = b ? "disable" : "enable";
    return doMultiple(a, c)
}
function $f_get_emptys(a, b, c) {
    var d = []
      , e = [];
    $x(a) && (a = [a]);
    for (var f = 0, g = a.length; f < g; f++) {
        var h = $x(a[f]);
        h && (apex.item(h).isEmpty() ? d[d.length] = h : e[e.length] = h)
    }
    return b && $x_Class(d, b),
    c && $x_Class(e, c),
    0 === d.length ? d = !1 : d[0].focus(),
    d
}
function $v_Array(a) {
    return apex.jQuery.makeArray(apex.item(a).getValue())
}
function $f_ReturnChecked(a) {
    return !!$x(a) && $v_Array(a)
}
function $d_ClearAndHide(a) {
    $x(a) && (a = [a]);
    for (var b = 0, c = a.length; b < c; b++) {
        var d = $x(a[b]);
        d && ($x_Hide(d).innerHTML = "")
    }
}
function $f_SelectedOptions(a) {
    var b = $x(a)
      , c = [];
    if ("SELECT" == b.nodeName) {
        for (var d = b.options, e = 0, f = d.length; e < f; e++)
            d[e].selected && (c[c.length] = d[e]);
        return $u_Narray(c)
    }
    return !1
}
function $f_SelectValue(a) {
    var b = $v_Array(a);
    return $u_Narray(b)
}
function $u_ArrayToString(a, b) {
    var c = "";
    b && (b = ":"),
    a = $u_Carray(a);
    for (var d = 0, e = a.length; d < e; d++)
        c += a[d] ? a[d] + b : "" + b;
    return c.substr(0, c.length - 1)
}
function $v_CheckValueAgainst(a, b) {
    var c = !1
      , d = []
      , e = !1;
    b.constructor == Array ? d = b : d[0] = b,
    e = $v(a);
    for (var f = 0, g = d.length; f < g && !(c = e == d[f]); f++)
        ;
    return c
}
function $f_Hide_On_Value_Item(a, b, c) {
    var d = $v_CheckValueAgainst(a, c);
    return d ? $x_Hide(b) : $x_Show(b),
    d
}
function $f_Show_On_Value_Item(a, b, c) {
    var d = $v_CheckValueAgainst(a, c);
    return d ? $x_Show(b) : $x_Hide(b),
    d
}
function $f_Hide_On_Value_Item_Row(a, b, c) {
    var d = $v_CheckValueAgainst(a, c);
    return d ? $x_HideItemRow(b) : $x_ShowItemRow(b),
    d
}
function $f_Show_On_Value_Item_Row(a, b, c) {
    var d = $v_CheckValueAgainst(a, c);
    return d ? $x_ShowItemRow(b) : $x_HideItemRow(b),
    d
}
function $f_DisableOnValue(a, b, c) {
    var d = $v_CheckValueAgainst(a, b)
      , e = [];
    if (c) {
        if (c instanceof Array)
            e = c;
        else
            for (var f = 2; f < arguments.length; f++)
                arguments[f] && (e[e.length] = arguments[f]);
        $x_disableItem(e, d)
    }
    return d
}
function $x_ClassByClass(a, b, c, d) {
    var e = $x_ByClass(b, a, c);
    return $x_Class(e, d),
    e
}
function $f_ValuesToArray(a, b, c) {
    for (var d = $x_ByClass(b, a, c), e = [], f = 0, g = d.length; f < g; f++)
        e[f] = d[f].value;
    return e
}
function $dom_JoinNodeLists(a, b) {
    var c, d, e = [];
    for (c = 0,
    d = a.length; c < d; c++)
        e[c] = a[c];
    for (c = 0,
    d = b.length; c < d; c++)
        e[e.length] = b[c];
    return e
}
function $x_FormItems(a, b) {
    var c = b ? b.toUpperCase() : "ALL"
      , d = []
      , e = []
      , f = $x(a);
    if (f) {
        if ("SELECT" == f.nodeName || "INPUT" == f.nodeName || "TEXTAREA" == f.nodeName)
            return [f];
        if (l_Selects = f.getElementsByTagName("SELECT"),
        d = f.getElementsByTagName("INPUT"),
        l_Textarea = f.getElementsByTagName("TEXTAREA"),
        l_Fieldset = f.getElementsByTagName("FIELDSET"),
        "SELECT" == c ? d = l_Selects : "TEXTAREA" == c ? d = l_Textarea : "ALL" == c && (d = $dom_JoinNodeLists(d, l_Fieldset),
        d = $dom_JoinNodeLists(d, l_Selects),
        d = $dom_JoinNodeLists(d, l_Textarea)),
        "SELECT" == c || "TEXTAREA" == c || "ALL" == c)
            e = d;
        else
            for (var g = 0; g < d.length; g++)
                d[g].type.toUpperCase() == b.toUpperCase() && (e[e.length] = d[g]);
        return e
    }
}
function $f_CheckAll(a, b, c) {
    var d;
    d = c ? c : $x_FormItems(a, "CHECKBOX");
    for (var e = 0, f = d.length; e < f; e++)
        d[e].checked = b
}
function $f_CheckFirstColumn(a) {
    for (var b = $x_UpTill(a, "TABLE"), c = [], d = 0, e = b.rows.length; d < e; d++) {
        var f = $x_FormItems(b.rows[d], "CHECKBOX")[0];
        f && (c[c.length] = f)
    }
    return $f_CheckAll(!1, a.checked, c),
    c
}
function $x_ToggleWithImage(a, b) {
    a = $x(a),
    $x_CheckImageSrc(a, "plus") ? ($x_Class(a, gToggleWithImageI),
    a.src = html_StringReplace(a.src, "plus", "minus")) : ($x_Class(a, gToggleWithImageA),
    a.src = html_StringReplace(a.src, "minus", "plus"));
    var c = $x_Toggle(b);
    return c
}
function $x_SwitchImageSrc(a, b, c) {
    var d = $x(a);
    return d && "IMG" == d.nodeName && d.src.indexOf(b) != -1 && (d.src = c),
    d
}
function $x_CheckImageSrc(a, b) {
    var c = $x(a)
      , d = !1;
    return c && "IMG" == c.nodeName && (d = $u_SubString(c.src, b)),
    d
}
function $u_SubString(a, b) {
    return a.toString().indexOf(b.toString()) != -1
}
function html_RemoveAllChildren(a) {
    var b = $x(a);
    if (b && b.hasChildNodes && b.removeChild)
        for (; b.hasChildNodes(); )
            b.removeChild(b.firstChild)
}
function ajax_Loading(a) {
    1 == a ? $x_Show("loader", "wait") : $x_Hide("loader")
}
function html_SetSelectValue(a, b) {
    var c = $x(a);
    if ("SELECT" == c.nodeName) {
        c.selectedIndex = 0;
        for (var d = 0, e = c.options.length; d < e; d++)
            c.options[d].value == b && (c.options[d].selected = !0)
    }
}
function addLoadEvent(a) {
    apex.jQuery(document).ready(a)
}
function $f_Swap(a, b) {
    var c = $x(a);
    lThat = $x(b),
    a && b && ($x_Value(a, lThat.value),
    $x_Value(b, c.value))
}
function $f_Enter(a) {
    var b;
    if (window.event)
        b = window.event.keyCode;
    else {
        if (!a)
            return !1;
        b = a.which
    }
    return 13 == b
}
function $f_SetValueSequence(a, b) {
    for (var c = a.length, d = 0; d < c; d++)
        $x_Value(a[d], (d + 1) * b)
}
function $dom_AddTag(a, b, c) {
    var d = document.createElement(b)
      , e = $x(a);
    return e && e.appendChild(d),
    null != c && (d.innerHTML = c),
    d
}
function $tr_AddTD(a, b) {
    return $dom_AddTag($x(a), "TD", b)
}
function $tr_AddTH(a, b) {
    return $dom_AddTag($x(a), "TH", b)
}
function $dom_Replace(a, b) {
    var c = $x(a)
      , d = c.parentNode;
    return lThat = $dom_AddTag(d, b),
    d.replaceChild(lThat, c)
}
function $dom_AddInput(a, b, c, d, e) {
    var f = $dom_AddTag(!1, "INPUT");
    return f.type = b ? b : "text",
    f.id = c ? c : "",
    f.name = d ? d : "",
    f.value = e ? e : "",
    a && $x(a).appendChild(f),
    f
}
function $dom_MakeParent(a, b) {
    var c = $x(a)
      , d = $x(b);
    return c && d && c.parentNode != d && d.appendChild(c),
    c
}
function $x_RowHighlight(a, b) {
    var c = $x(a);
    c && $x_Style(c.getElementsByTagName("TD"), "backgroundColor", b),
    gCurrentRow = c
}
function $x_RowHighlightOff(a) {
    var b = $x(a);
    b && $x_Style(b.getElementsByTagName("TD"), "backgroundColor", "")
}
function $v_Upper(a) {
    var b = $x(a);
    b && (b.value = b.value.toUpperCase())
}
function $d_Find(a, b, c, d) {
    if (c || (c = "DIV"),
    a = $x(a)) {
        var e = a.getElementsByTagName(c);
        a.style.display = "none",
        gRegex || (gRegex = new RegExp("test")),
        gRegex.compile(b, "i");
        for (var f = 0, g = e.length; f < g; f++)
            gRegex.test(e[f].innerHTML) ? e[f].style.display = "block" : e[f].style.display = "none";
        a.style.display = "block"
    }
}
function $f_First_field(a) {
    var b = $x(a);
    try {
        return b && ("hidden" == b.type || b.disabled || b.focus()),
        !0
    } catch (c) {}
}
function html_StringReplace(a, b, c) {
    c || (c = "");
    var d = a.length
      , e = b.length;
    if (0 === d || 0 === e)
        return a;
    var f = a.indexOf(b);
    if (!f && b != a.substring(0, e))
        return a;
    if (f == -1)
        return a;
    var g = a.substring(0, f) + c;
    return f + e < d && (g += html_StringReplace(a.substring(f + e, d), b, c)),
    g
}
function getScrollXY() {
    var a = 0
      , b = 0;
    return "number" == typeof window.pageYOffset ? (b = window.pageYOffset,
    a = window.pageXOffset) : document.body && (document.body.scrollLeft || document.body.scrollTop) ? (b = document.body.scrollTop,
    a = document.body.scrollLeft) : document.documentElement && (document.documentElement.scrollLeft || document.documentElement.scrollTop) && (b = document.documentElement.scrollTop,
    a = document.documentElement.scrollLeft),
    [a, b]
}
function html_GetTarget(a) {
    var b;
    return a || (a = window.event),
    a.target ? b = a.target : a.srcElement && (b = a.srcElement),
    3 == b.nodeType && (b = b.parentNode),
    b
}
function findPosX(a) {
    var b = $x(a)
      , c = 0;
    if (b.x)
        return b.x;
    if (b.offsetParent)
        for (; b.offsetParent; ) {
            if (b.style.left)
                return c += parseInt(b.style.left.substring(0, b.style.left.length - 2), 10);
            c += b.offsetLeft,
            b = b.offsetParent
        }
    return c
}
function findPosY(a) {
    var b = $x(a)
      , c = 0;
    if (b.y)
        return b.y;
    if (b.offsetParent)
        for (; b.offsetParent; ) {
            if (b.style.top)
                return c += parseInt(b.style.top.substring(0, b.style.top.length - 2), 10);
            c += b.offsetTop,
            b = b.offsetParent
        }
    return c
}
function setSelectionRange(a, b, c) {
    var d;
    if (a.setSelectionRange)
        d = a.value.length,
        b > d && (b = d),
        c > d && (c = d),
        a.focus(),
        a.setSelectionRange(b, c);
    else if (a.createTextRange) {
        var e = a.createTextRange();
        e.collapse(!0),
        e.moveEnd("character", c),
        e.moveStart("character", b),
        e.select()
    }
}
function setCaretToPos(a, b) {
    setSelectionRange(a, b, b)
}
function html_ReturnToTextSelection(a, b, c) {
    var d = $x(b)
      , e = apex.item(d).isEmpty() || c ? "" : " ";
    if (document.selection) {
        d.focus();
        var f = document.selection
          , g = f.createRange();
        g.text = g.text + e + a
    } else
        start = d.selectionStart,
        end = d.selectionEnd,
        d.value = d.value.slice(0, start) + e + a + d.value.slice(end, d.value.length),
        d.focus(),
        setCaretToPos(d, end + (a.length + 2))
}
function setCaretToEnd(a) {
    setSelectionRange(a, a.value.length, a.value.length)
}
function setCaretToBegin(a) {
    setSelectionRange(a, 0, 0)
}
function selectString(a, b) {
    var c = new RegExp(b,"i").exec(a.value);
    c && setSelectionRange(a, c.index, c.index + c[0].length)
}
function ob_PPR_TAB(a) {
    top.gLastTab = a;
    var b = document.body
      , c = new htmldb_Get(b,null,null,null,null,"f",a.substring(2));
    c.get(null, '<body  style="padding:10px;">', "</body>")
}
function flowSelectAll() {
    var a, b, c;
    if ("undefined" == typeof flowSelectArray)
        return !0;
    for (var d = 0, e = flowSelectArray.length; d < e; d++) {
        for (a = $x(flowSelectArray[d]),
        b = a.length,
        c = 0; c <= b - 1; c++)
            a.options[c].selected = !1;
        for (c = 0; c <= b - 1; c++)
            a.options[c].selected = !0
    }
    return !0
}
function htmldb_item_change(a) {
    htmldb_ch = !0
}
function htmldb_doUpdate(a) {
    htmldb_ch ? (lc_SetChange(),
    apex.submit(a)) : apex.submit(a)
}
function htmldb_goSubmit(a) {
    htmldb_ch ? (htmldb_ch_message && null !== htmldb_ch_message || (htmldb_ch_message = "Are you sure you want to leave this page without saving? /n Please use translatable string."),
    window.confirm(htmldb_ch_message) && apex.submit(a)) : apex.submit(a)
}
function $p_DatePicker(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o) {
    var p = open("wwv_flow_utilities.show_as_popup_calendar?p_element_index=" + escape(a) + "&p_form_index=" + escape(b) + "&p_date_format=" + escape(c) + "&p_bgcolor=" + escape(d) + "&p_dd=" + escape(e) + "&p_hh=" + escape(f) + "&p_mi=" + escape(g) + "&p_pm=" + escape(h) + "&p_yyyy=" + escape(i) + "&p_lang=" + escape(j) + "&p_application_format=" + escape(k) + "&p_application_id=" + escape(l) + "&p_security_group_id=" + escape(m) + "&p_mm=" + escape(n), "winLov", "Scrollbars=no,resizable=yes,width=258,height=" + o);
    return null == p.opener && (p.opener = self),
    p.focus(),
    p
}
function confirmDelete2(a, b) {
    var c = b ? b : "DELETE"
      , d = a ? a : "Would you like to perform this delete action?";
    confirm(d) && (apex.submit(c),
    window.close())
}
function lc_SetChange() {
    gChangeCheck && (gChangeCheck.value = 1,
    gChangeCheck.type = "text")
}
function setValue2(a, b, c) {
    var d = $x(a);
    d && ($x_Value(d, b),
    $v(d) != b && alert(c))
}
function dhtml_CloseAllSubMenus(a) {
    var b = null;
    b = a ? a : 0;
    for (var c = b; c <= gSubMenuArray.length; c++)
        if (gSubMenuArray[c]) {
            var d = $x_Hide(gSubMenuArray[c]);
            d && $x_Hide(d)
        }
    a || (gSubMenuArray.length = 0),
    htmldb_IE_Select_Item_Fix(!1),
    $gCurrentAnchorList = apex.jQuery("#" + gCurrentAppMenu).children().children().filter("a[class!=eLink]")
}
function dhtml_CloseAllSubMenusL(a) {
    var b = parseInt($x_UpTill(a, "UL").getAttribute("htmldb:listlevel"), 10) + 1;
    dhtml_CloseAllSubMenus(b)
}
function app_AppMenuMultiClose() {
    if (gCurrentAppMenu) {
        var a = $x(gCurrentAppMenu);
        gCurrentAppMenuImage.className = g_dhtmlMenu,
        $x_Hide(a),
        gCurrentAppMenu = !1,
        gCurrentAppMenuImage = !1,
        $gCurrentAnchorList = !1
    }
}
function dhtml_DocMenuCheck(a) {
    for (var b = html_GetTarget(a), c = !0; "BODY" != b.nodeName; )
        b = b.parentNode,
        $u_SubString(b.className, "dhtmlMenuLG") && (c = !c);
    c && (app_AppMenuMultiClose(),
    dhtml_CloseAllSubMenus(),
    document.onclick = null)
}
function dhtml_ButtonDropDown(a, b, c, d, e) {
    dhtml_SingeMenuOpen(a, b, "Bottom", d, e)
}
function dhtml_KeyAction(a, b) {
    var c, d;
    switch (c = apex.jQuery(a.target),
    d = $gCurrentAnchorList.index(c),
    a.which) {
    case 40:
        $gCurrentAnchorList.eq(d + 1).focus();
        break;
    case 38:
        $gCurrentAnchorList.eq(d - 1).focus();
        break;
    case 37:
        var e = apex.jQuery("#" + gCurrentAppMenu + " a").filter(function() {
            return 1 == apex.jQuery(this).data("setParent")
        });
        e.length > 0 && (dhtml_CloseAllSubMenusL(e[0]),
        e.focus().data("setParent", !1));
        break;
    case 39:
        (c.parent().hasClass("dhtmlSubMenuN") || c.parent().hasClass("dhtmlSubMenuS")) && (c.trigger("mouseover"),
        $gCurrentAnchorList[0].focus(),
        c.data("setParent", !0));
        break;
    case 13:
        return
    }
    a.preventDefault()
}
function dhtml_MenuOpen(a, b, c, d, e) {
    var f;
    if ($x(b)) {
        if (f = "menu_keys_" + b,
        document.onclick = dhtml_DocMenuCheck,
        apex.jQuery(document).unbind("keydown." + f + "_esc").bind("keydown." + f + "_esc", function(a) {
            27 === a.which && (app_AppMenuMultiClose(),
            dhtml_CloseAllSubMenus(),
            document.onclick = null,
            e && apex.jQuery(e).focus())
        }),
        c) {
            var g = parseInt($x(b).getAttribute("htmldb:listlevel"), 10)
              , h = gSubMenuArray[g];
            h && $x_Hide(h),
            gSubMenuArray[g] = $x(b)
        } else
            dhtml_CloseAllSubMenus(),
            gCurrentAppMenu = b;
        $gCurrentAnchorList = apex.jQuery("#" + b).children().children().filter("a[class!=eLink]"),
        apex.jQuery(document).unbind("keydown." + f).bind("keydown." + f, function(a) {
            var c = [40, 38, 37, 39, 13];
            apex.jQuery("#" + b + ":visible").filter("ul")[0] && apex.jQuery.inArray(a.which, c) !== -1 && dhtml_KeyAction(a, f)
        });
        var i = $x(b);
        document.body.appendChild(i),
        d && "Right" != d ? "Bottom" == d ? (i.style.position = "absolute",
        i.style.top = parseInt(findPosY(a), 10) + parseInt(a.offsetHeight, 10) + "px",
        i.style.left = parseInt(findPosX(a), 10) + "px") : "BottomRight" == d ? (i.style.position = "absolute",
        i.style.top = parseInt(findPosY(a), 10) + parseInt(a.offsetHeight, 10) + "px",
        i.style.left = parseInt(findPosX(a), 10) - parseInt(a.offsetWidth, 10) + "px") : (i.style.position = "absolute",
        i.style.top = parseInt(findPosY(a), 10) + "px",
        i.style.left = parseInt(findPosX(a), 10) + parseInt(a.offsetWidth, 10) + "px") : (i.style.position = "absolute",
        i.style.top = parseInt(findPosY(a), 10) + "px",
        i.style.left = parseInt(findPosX(a), 10) + "px"),
        $x_Show(i),
        dhtml_FixLeft(a, i, d),
        htmldb_IE_Select_Item_Fix(i)
    }
}
function dhtml_DocMenuSingleCheck(a, b) {
    if (g_Single_Menu_Count > 0) {
        var c = !0;
        if (a)
            for (var d = html_GetTarget(a); "BODY" != d.nodeName && !b; )
                d = d.parentNode,
                d == g_Single_Menu && (c = !c);
        (c || b) && ($x_Hide(g_Single_Menu),
        document.onclick = null)
    } else
        g_Single_Menu_Count = 1
}
function dhtml_SingeMenuOpen(a, b, c, d, e) {
    var f = $x(b)
      , g = $x(a);
    f.style.zIndex = 2001,
    document.body.appendChild(f),
    c && "Right" != c ? "Bottom" == c ? (f.style.position = "absolute",
    f.style.top = parseInt(findPosY(g), 10) + parseInt(g.offsetHeight, 10) + "px",
    f.style.left = parseInt(findPosX(g), 10) + "px") : "BottomRight" == c ? (f.style.position = "absolute",
    f.style.top = parseInt(findPosY(g), 10) + parseInt(g.offsetHeight, 10) + "px",
    f.style.left = parseInt(findPosX(g), 10) - parseInt(g.offsetWidth, 10) + "px") : "Set" == c ? (f.style.position = "absolute",
    f.style.top = parseInt(e, 10) + "px",
    f.style.left = parseInt(d, 10) + "px") : (f.style.position = "absolute",
    f.style.top = parseInt(findPosY(g), 10) + "px",
    f.style.left = parseInt(findPosX(g), 10) + parseInt(g.offsetWidth, 10) + "px") : (f.style.position = "absolute",
    f.style.top = parseInt(findPosY(g), 10) + "px",
    f.style.left = parseInt(findPosX(g), 10) + "px"),
    $x_Show(f),
    dhtml_FixLeft(g, f, c),
    htmldb_IE_Select_Item_Fix(!0),
    g_Single_Menu_Count = 0,
    g_Single_Menu = f,
    document.onclick = dhtml_DocMenuSingleCheck
}
function dhtml_FixLeft(a, b, c) {
    var d;
    d = document.all ? document.body.clientWidth : window.innerWidth,
    "Bottom" == c ? parseInt(d, 10) < parseInt(findPosX(a), 10) + parseInt(a.offsetWidth, 10) + parseInt(b.offsetWidth, 10) && (b.style.position = "absolute",
    b.style.left = parseInt(findPosX(a), 10) - parseInt(b.offsetWidth, 10) + parseInt(a.offsetWidth, 10) + "px") : parseInt(d, 10) < parseInt(findPosX(a), 10) + parseInt(b.offsetWidth, 10) && (b.style.position = "absolute",
    b.style.left = parseInt(findPosX(a), 10) - parseInt(b.offsetWidth, 10) + "px")
}
function htmldb_IE_Select_Item_Fix(a) {
    var b = document.getElementsByTagName("SELECT").length >= 1;
    document.all && a && b && a.firstChild && "IFRAME" != a.firstChild.nodeName && (a.innerHTML = '<iframe  src="' + htmldb_Img_Dir + 'blank.html" width="' + a.offsetWidth + '" height="' + a.offsetHeight + '" style="z-index:-10;position: absolute;left: 0;top: 0;filter: progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0);" scrolling="no" frameborder="0"></iframe>' + a.innerHTML)
}
function app_AppMenuMultiOpenBottom(a, b, c) {
    $x(b);
    if (a != gCurrentAppMenuImage) {
        app_AppMenuMultiClose();
        var d = a.previousSibling.firstChild;
        a.className = g_dhtmlMenuOn,
        dhtml_MenuOpen(d, b, !1, "Bottom", a),
        gCurrentAppMenuImage = a
    } else
        dhtml_CloseAllSubMenus(),
        app_AppMenuMultiClose()
}
function app_AppMenuMultiOpenBottom2(a, b, c) {
    $x(b);
    if (a != gCurrentAppMenuImage) {
        app_AppMenuMultiClose();
        var d = a.parentNode;
        a.className = g_dhtmlMenuOn,
        dhtml_MenuOpen(d, b, !1, "Bottom", a),
        gCurrentAppMenuImage = a
    } else
        dhtml_CloseAllSubMenus(),
        app_AppMenuMultiClose()
}
function app_AppMenuMultiOpenBottom3(a, b, c, d) {
    $x(b);
    if (a != gCurrentAppMenuImage) {
        app_AppMenuMultiClose();
        var e = $x(c);
        a.className = g_dhtmlMenuOn,
        dhtml_MenuOpen(e, b, !1, "Bottom", a),
        gCurrentAppMenuImage = a
    } else
        dhtml_CloseAllSubMenus(),
        app_AppMenuMultiClose()
}
function $u_js_temp_drop() {
    var a = apex.jQuery("#apex_js_temp_drop");
    return a.length > 0 ? a.empty() : a = apex.jQuery('<div id="apex_js_temp_drop"></div>').prependTo(document.body).hide(),
    a[0]
}
function $u_js_temp_clear() {
    var a = $x("apex_js_temp_drop");
    return a && (a.innerHTML = ""),
    a
}
function ie_RowFixStart(a) {
    if (document.all) {
        var b = $x_FormItems(a, "checkbox");
        g_CheckedArray_IE = [];
        for (var c = 0, d = b.length; c < d; c++)
            "checkbox" == b[c].type && (g_CheckedArray_IE[c] = b[c].checked)
    }
}
function ie_RowFixFinish(a) {
    if (document.all)
        for (var b = $x_FormItems(a, "checkbox"), c = 0, d = b.length; c < d; c++)
            "checkbox" == b[c].type && (b[c].checked = g_CheckedArray_IE[c])
}
function $tr_RowMoveFollow(a, b) {
    gLastRowHighlight && (b && gLastRowMoved && $x_RowHighlightOff(gLastRowMoved),
    $x_RowHighlight(a, gLastRowMovedColor)),
    gLastRowMoved = a
}
function html_RowUp(a, b) {
    var c = $x_UpTill(a, "TR");
    ie_RowFixStart(c),
    $tr_RowMoveFollow(c, b);
    for (var d = c.parentNode, e = c.previousSibling; e && 1 != e.nodeType; )
        e = e.previousSibling;
    return e && e.firstChild && "TH" != e.firstChild.nodeName && "TR" == e.nodeName ? oElement = d.insertBefore(c, e) : oElement = d.appendChild(c),
    ie_RowFixFinish(oElement),
    oElement
}
function html_RowDown(a, b) {
    var c = $x_UpTill(a, "TR");
    ie_RowFixStart(c),
    $tr_RowMoveFollow(c, b);
    for (var d = c.parentNode, e = c.nextSibling; e && 1 != e.nodeType; )
        e = e.nextSibling;
    return e && "TR" == e.nodeName ? oElement = d.insertBefore(c, e.nextSibling) : oElement = d.insertBefore(c, d.getElementsByTagName("TR")[1]),
    ie_RowFixFinish(oElement),
    oElement
}
function toolTip_init() {
    return !(!document || !document.body) && (gToolTipContent = $x("gToolTipContent"),
    gToolTip = $x("dhtmltooltip"),
    gToolTip || (gToolTip = $dom_AddTag(document.body, "DIV"),
    gToolTip.id = "dhtmltooltip",
    gToolTip.className = "htmldbToolTip",
    gToolTip.style.position = "absolute",
    gToolTip.style.border = "1px solid black",
    gToolTip.style.padding = "2px",
    gToolTip.style.backgroundColor = "",
    gToolTip.style.visibility = "hidden",
    gToolTip.style.zIndex = 1e4),
    gToopTipPointer = $x("dhtmlpointer"),
    gToopTipPointer || (gToopTipPointer = $dom_AddTag(document.body, "IMG"),
    gToopTipPointer.id = "dhtmlpointer",
    gToopTipPointer.src = htmldb_Img_Dir + gToolTipGraphic,
    gToopTipPointer.style.position = "absolute",
    gToopTipPointer.style.zIndex = 10001),
    !0)
}
function toolTip_disable() {
    toolTip_init() && (tt_target = null,
    gToolTip.style.visibility = "hidden",
    gToolTip.style.backgroundColor = "",
    gToolTip.style.width = "",
    gToopTipPointer.style.visibility = "hidden",
    gToolTipContent ? gToolTipContent.innerHTML = "" : gToolTip.innerHTML = "")
}
function toolTip_enable(a, b, c, d, e) {
    a = a ? a : window.event ? event : null;
    var f = a.pageX ? a.pageX : a.clientX + getScrollXY()[0]
      , g = a.pageY ? a.pageY : a.clientY + getScrollXY()[1];
    if (toolTip_init()) {
        tt_target = b,
        c || (c = b.getAttribute("htmldb:tip")),
        gToolTipContent ? gToolTipContent.innerHTML = c : gToolTip.innerHTML = c,
        d && (gToolTip.style.width = d + "px"),
        e ? gToolTip.style.backgroundColor = e : gToolTip.style.backgroundColor = "lightyellow",
        gToopTipPointer.style.left = 10 + f + "px",
        gToopTipPointer.style.top = 15 + g + "px",
        gToolTip.style.left = 7 + f + "px",
        gToolTip.style.top = 28 + g + "px",
        gToolTip.style.visibility = "visible",
        gToolTip.style.zIndex = 1e4,
        gToopTipPointer.style.zIndex = 10001,
        gToopTipPointer.style.visibility = "visible";
        try {
            b.addEventListener("mouseout", toolTip_disable, !1)
        } catch (h) {
            b.attachEvent("onmouseout", toolTip_disable)
        }
    }
    return !1
}
function toolTip_follow(a, b) {
    a = a ? a : window.event ? event : null;
    var c = a.pageX ? a.pageX : a.clientX + getScrollXY()[0]
      , d = a.pageY ? a.pageY : a.clientY + getScrollXY()[1];
    return gToolTip && (gToolTip.style.left = 7 + c + "px",
    gToolTip.style.top = 28 + d + "px",
    gToolTip.style.visibility = "visible",
    gToolTip.style.zIndex = 1e4,
    gToopTipPointer.style.left = 10 + c + "px",
    gToopTipPointer.style.top = 15 + d + "px",
    gToopTipPointer.style.zIndex = 10001,
    gToopTipPointer.style.visibility = "visible"),
    !1
}
function dhtml_ShuttleObject(a, b) {
    this.Select1 = $x(a),
    this.Select2 = $x(b),
    this.Select1ArrayInit = this.Select1.cloneNode(!0),
    this.Select2ArrayInit = this.Select2.cloneNode(!0),
    this.Op1Init = [],
    this.Op2Init = [],
    this.Op1Init = this.Select1ArrayInit.options,
    this.Op2Init = this.Select2ArrayInit.options,
    this.move = function() {
        var a = $f_SelectedOptions(this.Select1);
        $x(a) && (a = [a]);
        for (var b = a.length, c = 0; c < b; c++)
            this.Select2.appendChild(a[c])
    }
    ,
    this.remove = function() {
        var a = $f_SelectedOptions(this.Select2);
        $x(a) && (a = [a]);
        for (var b = a.length, c = 0; c < b; c++)
            this.Select1.appendChild(a[c])
    }
    ,
    this.reset = function() {
        this.Select1.options.length = 0,
        this.Select2.options.length = 0;
        for (var a = this.Op1Init.length, b = 0; b < a; b++)
            this.Select1.options[b] = new Option(this.Op1Init[b].text,this.Op1Init[b].value);
        for (var c = this.Op2Init.length, d = 0; d < c; d++)
            this.Select2.options[d] = new Option(this.Op2Init[d].text,this.Op2Init[d].value)
    }
    ,
    this.move_all = function() {
        for (var a = 0, b = this.Select1.options.length; a < b; a++)
            this.Select1.options[a].selected = !0;
        this.move()
    }
    ,
    this.remove_all = function() {
        for (var a = 0, b = this.Select2.options.length; a < b; a++)
            this.Select2.options[a].selected = !0;
        this.remove()
    }
    ,
    this.sort = function(a, b) {
        var c, d = a.options.length;
        if ("U" == b)
            for (c = 0; c < d; c++)
                a.options[c].selected && "U" == b && c && a.insertBefore(a.options[c], a.options[c - 1]);
        else if ("D" == b)
            for (c = d - 1; c >= 0; c--)
                a.options[c].selected && "D" == b && c != d - 1 && a.insertBefore(a.options[c], a.options[c + 2]);
        else {
            var e = [];
            for (c = 0; c < d; c++)
                a.options[c].selected && (e[e.length] = a.options[c]);
            if ("B" == b)
                for (c = 0; c < e.length; c++)
                    a.appendChild(e[c]);
            else if ("T" == b)
                for (c = e.length - 1; c >= 0; c--)
                    a.insertBefore(e[c], a.firstChild)
        }
    }
    ,
    this.sort1 = function(a) {
        this.sort(this.Select1, a)
    }
    ,
    this.sort2 = function(a) {
        this.sort(this.Select2, a)
    }
}
function hideShow(a, b, c, d) {
    var e = $x(b)
      , f = $x(a);
    "none" == f.style.display || "" == f.style.display || null == f.style ? (e.src = d,
    $x(a).style.display = "block") : (e.src = c,
    $x(a).style.display = "none")
}
null !== apex.spreadsheet && "object" == typeof apex.spreadsheet || (apex.spreadsheet = {}),
null !== apex.items && "object" == typeof apex.items || (apex.items = {}),
null !== apex.ajax && "object" == typeof apex.ajax || (apex.ajax = {}),
null !== apex.dhtml && "object" == typeof apex.dhtml || (apex.dhtml = {}),
null !== apex.worksheet && "object" == typeof apex.worksheet || (apex.worksheet = {}),
apex.ajax = {
    clob: function(a) {
        function b(a) {
            e.ajax.addParam("x05", "GET"),
            e.ajax.GetAsync(e._return)
        }
        function c(a) {
            e.ajax.addParam("x05", "SET"),
            e.ajax.AddArrayClob(a, 1),
            e.ajax.GetAsync(e._return)
        }
        function d() {
            if (1 == p.readyState)
                ;
            else if (2 == p.readyState)
                ;
            else if (3 != p.readyState)
                return 4 == p.readyState && p
        }
        var e = this;
        this.ajax = new htmldb_Get(null,$x("pFlowId").value,"APXWGT",0),
        this.ajax.addParam("p_widget_name", "apex_utility"),
        this.ajax.addParam("x04", "CLOB_CONTENT"),
        this._get = b,
        this._set = c,
        this._return = a ? a : d
    },
    test: function(a) {
        function b(a) {
            e.ajax.GetAsync(e._return)
        }
        function c(a) {}
        function d(a) {}
        var e = this;
        this.ajax = new htmldb_Get(null,$x("pFlowId").value,"APXWGT",0),
        this.ajax.addParam("p_widget_name", "apex_utility"),
        this._get = b,
        this._set = c,
        this._return = a ? a : d
    },
    widget: function(a, b) {
        function c(a) {
            f.ajax.GetAsync(f._return)
        }
        function d(a) {}
        function e(a) {}
        var f = this;
        this.ajax = new htmldb_Get(null,$x("pFlowId").value,"APXWGT",0),
        this.ajax.addParam("p_widget_name", a),
        this._get = c,
        this._set = d,
        this._return = b ? b : e
    },
    ondemand: function(a, b) {
        function c(a) {
            f.ajax.GetAsync(f._return)
        }
        function d(a) {}
        function e(a) {}
        var f = this;
        this.ajax = new htmldb_Get(null,$x("pFlowId").value,"APPLICATION_PROCESS=" + a,0),
        this._get = c,
        this._set = d,
        this._return = b ? b : e
    },
    url: function(a, b) {
        function c(a) {
            f.ajax.GetAsync(f._return)
        }
        function d(a) {}
        function e(a) {}
        var f = this;
        this.ajax = new htmldb_Get(null,null,null,null,null,"f",a),
        this._get = c,
        this._set = d,
        this._return = b ? b : e
    }
};
var gResult = null
  , gNode = null;
htmldb_Get.prototype.GetAsync = function(a) {
    var b;
    try {
        b = new XMLHttpRequest
    } catch (c) {
        b = new ActiveXObject("Msxml2.XMLHTTP")
    }
    try {
        new Date;
        if (b.open("POST", this.base, !0),
        b)
            return b.onreadystatechange = function() {
                p = b,
                a(b)
            }
            ,
            b.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"),
            b.send(null == this.queryString ? this.params : this.queryString),
            b
    } catch (c) {
        return !1
    }
}
,
htmldb_Get.prototype.AddArray = function(a, b) {
    var c = "f";
    b = $nvl(b, 1),
    c += b < 10 ? "0" + b : b;
    for (var d = 0, e = a.length; d < e; d++)
        this.addParam(c, a[d]);
    return this
}
,
htmldb_Get.prototype.AddArrayItems = function(a, b) {
    var c = "f";
    b = $nvl(b, 1),
    c += b < 10 ? "0" + b : b;
    for (var d = 0, e = a.length; d < e; d++)
        this.addParam(c, $nvl($v(a[d])), "");
    return this
}
,
htmldb_Get.prototype.AddNameValue = function(a, b, c) {
    var d = "f"
      , e = "f";
    return c = $nvl(c, 1),
    pFnumber2 = c + 1,
    d += c < 10 ? "0" + c : c,
    e += pFnumber2 < 10 ? "0" + pFnumber2 : pFnumber2,
    this.addParam(d, a),
    this.addParam(e, $nvl(b), ""),
    this
}
,
htmldb_Get.prototype.AddArrayItems2 = function(a, b, c) {
    var d = "f"
      , e = "f";
    b = $nvl(b, 1),
    pFnumber2 = b + 1,
    d += b < 10 ? "0" + b : b,
    e += pFnumber2 < 10 ? "0" + pFnumber2 : pFnumber2;
    for (var f = 0, g = a.length; f < g; f++) {
        var h = $x(a[f]);
        h && 0 != h.id.length && (c ? this.addParam(d, apex.jQuery(h).attr(c)) : this.addParam(d, h.id))
    }
    for (var f = 0, g = a.length; f < g; f++) {
        var h = $x(a[f]);
        h && 0 != h.id.length && this.addParam(e, $nvl($v(h)), "")
    }
    return this
}
,
htmldb_Get.prototype.AddArrayClob = function(a, b) {
    var c = $s_Split(a, 4e3);
    return this.AddArray(c, b),
    this
}
,
htmldb_Get.prototype.AddPageItems = function(a) {
    for (var b = 0, c = a.length; b < c; b++)
        $x(a[b]) && this.add($x(a[b]).id, $v(a[b]))
}
,
htmldb_Get.prototype.AddGlobals = function(a, b, c, d, e, f, g, h, i, j, k, l, m, n) {
    return this.addParam("p_widget_mod", a),
    this.addParam("p_widget_action", b),
    this.addParam("p_widget_action_mod", c),
    this.addParam("p_widget_num_return", d),
    this.addParam("x01", e),
    this.addParam("x02", f),
    this.addParam("x03", g),
    this.addParam("x04", h),
    this.addParam("x05", i),
    this.addParam("x06", j),
    this.addParam("x07", k),
    this.addParam("x08", l),
    this.addParam("x09", m),
    this.addParam("x10", n),
    this
}
;
var gDebug = !0, gkeyPressTime, gLastTab = !1, gRegex = !1, ie = !!document.all;
ie && (document.expando = !0);
var gDebugWindow = !1;
$item = $x_object;
var gToggleWithImageA = "pseudoButtonActive", gToggleWithImageI = "pseudoButtonInactive", gCurrentRow = !1, htmldb_ch = !1, gChangeCheck = !1, gCurrentAppMenu = !1, gCurrentAppMenuImage = !1, $gCurrentAnchorList = !1, gSubMenuArray = [], g_Single_Menu = !1, g_Single_Menu_Count = 0, g_dhtmlMenu = "dhtmlMenu", g_dhtmlMenuOn = "dhtmlMenuOn", g_CheckedArray_IE, gLastRowMoved = null, gLastRowMovedColor = "#CCCCCC", gLastRowHighlight = !0, tt_target, gToolTipGraphic = "arrow2.gif", gToolTip = !1, gToopTipPointer = !1, gToolTipContent = !1;
apex.widget = {
    waitPopup: function(a) {
        var b, c, d;
        return a ? (b = apex.jQuery('<div id="apex_wait_popup" class="apex_wait_popup"></div><div id="apex_wait_overlay" class="apex_wait_overlay"></div>').prependTo("body"),
        c = b.first(),
        a.indexOf("<img") >= 0 && c.hide(),
        window.setTimeout(function() {
            c.html(a).find("img").hide().on("load", function() {
                $(this).show(),
                c.show()
            })
        }, 10)) : (b = apex.jQuery('<div id="apex_wait_overlay" class="apex_wait_overlay"></div>').prependTo("body"),
        window.setTimeout(function() {
            void 0 !== b && (d = apex.util.showSpinner())
        }, 10),
        b.css("visibility", "visible")),
        {
            remove: function() {
                void 0 !== d && d.remove(),
                b.remove(),
                b = void 0
            }
        }
    }
},
apex.widget.initPageItem = function(a, b) {
    apex.item.create(a, b)
}
,
apex.widget.textareaClob = {
    upload: function(a, b) {
        var c = new apex.ajax.clob(function() {
            if (1 === p.readyState)
                ;
            else if (2 === p.readyState)
                ;
            else if (3 === p.readyState)
                ;
            else {
                if (4 !== p.readyState)
                    return !1;
                $s(a, ""),
                apex.submit(b)
            }
        }
        );
        c._set($v(a))
    },
    uploadNonEmpty: function(a, b) {
        if (0 === $v(a).replace(/\s/g, "").length || "" === $v(a) || "." === $v(a))
            $s(a, ""),
            apex.submit(b);
        else {
            var c = new apex.ajax.clob(function() {
                if (1 === p.readyState)
                    ;
                else if (2 === p.readyState)
                    ;
                else if (3 === p.readyState)
                    ;
                else {
                    if (4 !== p.readyState)
                        return !1;
                    $s(a, "."),
                    apex.submit(b)
                }
            }
            );
            c._set($v(a))
        }
    }
};
apex.widget.util = {},
function(a, b) {
    "use strict";
    function c(a) {
        var b;
        for (b = 0; b < d.length; b++)
            if (d[b].el === a)
                return b;
        return null
    }
    a.cascadingLov = function(a, c, d, e) {
        var f = b(a, apex.gPageContext$)
          , g = f[0] ? f[0].id : "lov"
          , h = b.extend({
            optimizeRefresh: !0,
            queue: {
                name: g,
                action: "replace"
            }
        }, e)
          , i = !1;
        return h.refreshObject || (h.refreshObject = f),
        h.loadingIndicator || (h.loadingIndicator = f),
        h.optimizeRefresh && (b(h.dependingOn, apex.gPageContext$).each(function() {
            if (apex.item(this).isEmpty())
                return i = !0,
                !1
        }),
        i) ? (h.refreshObject.trigger("apexbeforerefresh"),
        b.isFunction(h.clear) && h.clear(),
        f.change(),
        void h.refreshObject.trigger("apexafterrefresh")) : (d.pageItems = b(d.pageItems, apex.gPageContext$).add(h.dependingOn),
        apex.server.plugin(c, d, h))
    }
    ,
    a.callPopupLov = function(a, c, d) {
        var e, f, g = c || {}, h = d || {};
        return h.filterOutput && (g.x02 = h.filterValue),
        e = apex.server.ajaxUrl(b.extend({}, c, {
            p_request: "PLUGIN=" + a
        }), {
            target: d.target
        }),
        f = window.open(e, "winLovList_" + $v("pInstance"), h.windowParameters),
        null === f.opener && (f.opener = self),
        f.focus(),
        !1
    }
    ,
    a.enableIcon = function(a, b, c) {
        a.find("img").css({
            opacity: 1,
            cursor: ""
        }).parent("a").attr("href", b),
        c && a.click(c)
    }
    ,
    a.disableIcon = function(a) {
        a.find("img").css({
            opacity: .5,
            cursor: "default"
        }).parent("a").removeAttr("href").unbind("click")
    }
    ;
    var d = [];
    a.onVisibilityChange = function(a, b) {
        var e = c(a)
          , f = {
            el: a,
            cb: b
        };
        null !== e ? d[e] = f : d.push(f)
    }
    ,
    a.offVisibilityChange = function(a) {
        var b = c(a);
        null !== b && d.splice(b, 1)
    }
    ;
    var e = a.visibilityChange = function(a, c) {
        var e, f, g, h = b(a);
        for (c = !!c,
        e = 0; e < d.length; e++)
            g = d[e],
            f = b(g.el),
            c === f.is(":visible") && f.closest(h).length && g.cb(c)
    }
    ;
    b(document.body).on("apexaftershow", function(a) {
        e(a.target, !0)
    }).on("apexafterhide", function(a) {
        e(a.target, !1)
    });
    var f = "apex-resize-sensor";
    a.onElementResize = function(a, c) {
        var d, e;
        "string" == typeof a && (a = "#" + a),
        d = b(a).first(),
        e = d.data(f),
        e || (e = new g(d[0]),
        d.data(f, e),
        e.start()),
        e.addListener(c)
    }
    ,
    a.offElementResize = function(a, c) {
        var d, e;
        "string" == typeof a && (a = "#" + a),
        d = b(a).first(),
        e = d.data(f),
        e && (c ? (e.removeListener(c),
        e.isEmpty() && (e.stop(),
        d.removeData(f))) : (e.destroy(),
        d.removeData(f)))
    }
    ,
    a.updateResizeSensors = function(a) {
        "string" == typeof a && (a = "#" + a),
        b(a).find(".js-resize-sensor").parent().each(function(a, c) {
            var d = b(c).data(f);
            null != d && d.init(!0)
        })
    }
    ;
    var g = function(a) {
        function c(a) {
            var b = !1;
            if (null != n.offsetParent) {
                var c = n.offsetWidth
                  , e = n.offsetHeight;
                l === c && m === e || (j = i,
                g(c, e),
                b = !0,
                a && d(!0))
            }
            return b
        }
        function d(b) {
            var c = a.offsetWidth
              , d = a.offsetHeight;
            h.has() && (b ? (null !== k && apex.util.cancelInvokeAfterPaint(k),
            k = apex.util.invokeAfterPaint(function() {
                k = null,
                h.fire(c, d)
            })) : h.fire(c, d))
        }
        function e(a) {
            a.stopPropagation(),
            c(!0) || j > 0 && null != n.offsetParent && (0 == n.scrollLeft || 0 == n.scrollTop) && (j--,
            g(l, m))
        }
        function f() {
            d(!1)
        }
        function g(a, b) {
            l = a,
            m = b;
            var c = n.firstChild.style
              , d = 1;
            do
                c.width = a + d + "px",
                c.height = b + d + "px",
                n.scrollLeft = n.scrollTop = d,
                d++;
            while ((0 == n.scrollTop || 0 == n.scrollLeft) && d <= 5);
            o.scrollLeft = a,
            o.scrollTop = b
        }
        var h = b.Callbacks()
          , i = 2
          , j = 0
          , k = null
          , l = null
          , m = null
          , n = null
          , o = null
          , p = null
          , q = null;
        this.addListener = function(a) {
            h.add(a)
        }
        ,
        this.removeListener = function(a) {
            h.remove(a)
        }
        ,
        this.isEmpty = function() {
            return !h.has()
        }
        ,
        this.destroy = function() {
            h.empty(),
            this.stop()
        }
        ,
        this.start = function() {
            function b(a, b) {
                a.direction = "ltr",
                a.position = b.position = "absolute",
                a.left = a.top = a.right = a.bottom = "0",
                a.overflow = "hidden",
                a.zIndex = "-1",
                a.visibility = "hidden",
                b.left = b.top = "0",
                b.transition = "0s"
            }
            if (q = e.bind(this),
            a.attachEvent)
                p = f.bind(this),
                a.attachEvent("onresize", p);
            else {
                var c = a.childNodes[0];
                n = document.createElement("div"),
                n.className = "js-resize-sensor";
                var d = document.createElement("div");
                b(n.style, d.style),
                n.appendChild(d),
                c ? a.insertBefore(n, c) : a.appendChild(n),
                n.addEventListener("scroll", q, !1),
                o = document.createElement("div");
                var g = document.createElement("div");
                b(o.style, g.style),
                g.style.width = "200%",
                g.style.height = "200%",
                o.appendChild(g),
                a.insertBefore(o, n),
                o.addEventListener("scroll", q, !1),
                this.init(!1)
            }
        }
        ,
        this.stop = function() {
            null !== k && (apex.util.cancelInvokeAfterPaint(k),
            k = null),
            null !== n ? (n.removeEventListener("scroll", q),
            o.removeEventListener("scroll", q),
            a.removeChild(n),
            a.removeChild(o)) : a.detachEvent("onresize", p)
        }
        ,
        this.init = function(a) {
            var b = c(a);
            a && !b && null != n.offsetParent && g(l, m)
        }
    }
}(apex.widget.util, apex.jQuery);
apex.da = {},
function(da, $, event, util, message, undefined) {
    "use strict";
    da.gEventList = [],
    da.gCancelActions = !1,
    da.init = function() {
        $(da.gEventList).each(function() {
            var a, b, c, d = {
                name: null,
                bindDelegateTo: null,
                isIGRegion: !1
            };
            if (a = $.extend(d, this),
            b = da.constructSelector({
                elementType: a.triggeringElementType,
                element: a.triggeringElement,
                regionId: a.triggeringRegionId,
                buttonId: a.triggeringButtonId
            }),
            $.inArray(a.bindEventType, ["ready", "pageinit"]) === -1) {
                switch (a.bindType) {
                case "bind":
                    $(b, apex.gPageContext$).on(a.bindEventType, function(b, c) {
                        da.actions(this, a, b, c)
                    });
                    break;
                case "live":
                    c = a.bindDelegateTo ? $(a.bindDelegateTo, apex.gPageContext$) : apex.gPageContext$,
                    c.on(a.bindEventType, b, function(b, c) {
                        da.actions(this, a, b, c)
                    });
                    break;
                case "one":
                    $(b, apex.gPageContext$).one(a.bindEventType, function(b, c) {
                        da.actions(this, a, b, c)
                    })
                }
                a.anyActionsFireOnInit && (a.isIGRegion ? $("#" + util.escapeCSS(a.triggeringRegionId), apex.gPageContext$).on("apexbeginrecordedit", function(c, d) {
                    da.actions(b, a, c, d)
                }) : da.actions(b, a, "load"))
            } else
                da.actions(b, a, "load")
        })
    }
    ,
    da.constructSelector = function(pOptions) {
        function escapeSelector(a) {
            var b, c;
            return b = a.split(","),
            c = $.map(b, function(a) {
                return util.escapeCSS(a)
            }),
            "#" + c.join(",#")
        }
        var lLen, lDefaults, lOptions, lSelector = "";
        switch (lDefaults = {
            elementType: null,
            element: null,
            regionId: null,
            buttonId: null,
            triggeringElement: null,
            eventTarget: null
        },
        lOptions = $.extend(lDefaults, pOptions),
        lOptions.elementType) {
        case "ITEM":
        case "COLUMN":
            lSelector = escapeSelector(lOptions.element);
            break;
        case "REGION":
            lSelector = "#" + util.escapeCSS(lOptions.regionId);
            break;
        case "BUTTON":
            lSelector = "#" + util.escapeCSS(lOptions.buttonId);
            break;
        case "JAVASCRIPT_EXPRESSION":
            lSelector = lOptions.element();
            break;
        case "DOM_OBJECT":
            apex.debug.deprecated("DOM Object selector"),
            lSelector = "#" + lOptions.element.replace(/,/g, ",#");
            try {
                lLen = $(lSelector, apex.gPageContext$).length
            } catch (ex) {
                lLen = 0
            }
            if (0 === lLen)
                try {
                    lSelector = eval(lOptions.element)
                } catch (err) {
                    lSelector = lOptions.element
                }
            break;
        case "JQUERY_SELECTOR":
            lSelector = lOptions.element;
            break;
        case "TRIGGERING_ELEMENT":
            lSelector = lOptions.triggeringElement;
            break;
        case "EVENT_SOURCE":
            lSelector = lOptions.eventTarget;
            break;
        default:
            lSelector = apex.gPageContext$
        }
        return "#" === lSelector && (lSelector = undefined),
        lSelector
    }
    ,
    da.actions = function(a, b, c, d) {
        event.gCancelFlag = !1,
        da.gCancelActions = !1,
        $(a, apex.gPageContext$).each(function() {
            var a, e;
            b.triggeringConditionType ? "JAVASCRIPT_EXPRESSION" === b.triggeringConditionType ? (a = {
                triggeringElement: this,
                browserEvent: c,
                data: d
            },
            e = b.triggeringExpression.call(a)) : e = da.testCondition(b.conditionElement, b.triggeringConditionType, b.triggeringExpression) : e = !0,
            da.doActions(b, 0, c, d, e, this),
            da.gCancelActions = !1
        })
    }
    ,
    da.doActions = function(a, b, c, d, e, f) {
        for (var g = a.actionList.length, h = b; h < g; h++) {
            var i, j, k, l;
            if (da.gCancelActions)
                return !1;
            if (i = {
                eventResult: null,
                executeOnPageInit: !1,
                stopExecutionOnError: !0,
                action: null,
                affectedElementsType: null,
                affectedRegionId: null,
                affectedElements: null,
                javascriptFunction: null,
                ajaxIdentifier: null,
                attribute01: null,
                attribute02: null,
                attribute03: null,
                attribute04: null,
                attribute05: null,
                attribute06: null,
                attribute07: null,
                attribute08: null,
                attribute09: null,
                attribute10: null,
                attribute11: null,
                attribute12: null,
                attribute13: null,
                attribute14: null,
                attribute15: null
            },
            j = $.extend(i, a.actionList[h]),
            ("load" !== c || "load" === c && (j.executeOnPageInit || $.inArray(a.bindEventType, ["ready", "pageinit"]) !== -1)) && j.eventResult === e && (k = da.constructSelector({
                elementType: j.affectedElementsType,
                element: j.affectedElements,
                regionId: j.affectedRegionId,
                buttonId: j.affectedButtonId,
                triggeringElement: f,
                eventTarget: c.target
            }),
            j.waitForResult && (l = function(b) {
                da.gCancelActions = j.stopExecutionOnError && b,
                da.doActions(a, h + 1, c, d, e, f)
            }
            ),
            da.doAction(f, k, j, c, d, a.name, l) === !1 && j.stopExecutionOnError && (da.gCancelActions = !0),
            j.waitForResult))
                return !1
        }
    }
    ,
    da.testCondition = function(a, b, c) {
        var d, e, f = apex.item(a), g = f.getValue();
        switch (b) {
        case "EQUALS":
            $.isArray(g) ? (d = !1,
            $.each(g, function(a, b) {
                if (d = b === c)
                    return !1
            })) : d = g === c;
            break;
        case "NOT_EQUALS":
            $.isArray(g) ? (d = !0,
            $.each(g, function(a, b) {
                if (d = b !== c,
                !d)
                    return !1
            })) : d = g !== c;
            break;
        case "IN_LIST":
            e = c.split(","),
            $.isArray(g) ? (d = !1,
            $.each(g, function(a, b) {
                if (d = $.inArray(b, e) !== -1)
                    return !1
            })) : d = $.inArray(g, e) !== -1;
            break;
        case "NOT_IN_LIST":
            e = c.split(","),
            $.isArray(g) ? (d = !0,
            $.each(g, function(a, b) {
                if (d = $.inArray(b, e) === -1,
                !d)
                    return !1
            })) : d = $.inArray(g, e) === -1;
            break;
        case "GREATER_THAN":
            $.isArray(g) ? (d = !0,
            $.each(g, function(a, b) {
                if (d = b > parseFloat(c, 10),
                !d)
                    return !1
            })) : d = g > parseFloat(c, 10);
            break;
        case "GREATER_THAN_OR_EQUAL":
            $.isArray(g) ? (d = !0,
            $.each(g, function(a, b) {
                if (d = b >= parseFloat(c, 10),
                !d)
                    return !1
            })) : d = g >= parseFloat(c, 10);
            break;
        case "LESS_THAN":
            $.isArray(g) ? (d = !0,
            $.each(g, function(a, b) {
                if (d = b < parseFloat(c, 10),
                !d)
                    return !1
            })) : d = g < parseFloat(c, 10);
            break;
        case "LESS_THAN_OR_EQUAL":
            $.isArray(g) ? (d = !0,
            $.each(g, function(a, b) {
                if (d = b <= parseFloat(c, 10),
                !d)
                    return !1
            })) : d = g <= parseFloat(c, 10);
            break;
        case "NULL":
            d = f.isEmpty();
            break;
        case "NOT_NULL":
            d = !f.isEmpty();
            break;
        default:
            d = !0
        }
        return d
    }
    ,
    da.doAction = function(a, b, c, d, e, f, g) {
        var h = {
            triggeringElement: a,
            affectedElements: $(b, apex.gPageContext$),
            action: c,
            browserEvent: d,
            data: e,
            resumeCallback: g
        };
        if (c.javascriptFunction)
            return apex.debug.log("Dynamic Action Fired: " + f + " (" + c.action + ")", h),
            c.javascriptFunction.call(h)
    }
    ,
    da.resume = function(a, b) {
        $.isFunction(a) && a(b)
    }
    ,
    da.handleAjaxErrors = function(a, b, c, d) {
        var e;
        if (0 !== a.status) {
            if (e = "APEX" === b ? c : "Error: " + b + " - " + c,
            !$.isFunction(window.onerror))
                return void message.alert(e, function() {
                    da.resume(d, !0)
                });
            window.onerror(e, null, null)
        }
        da.resume(d, !0)
    }
}(apex.da, apex.jQuery, apex.event, apex.util, apex.message);
!function(a, b, c, d, e, f) {
    "use strict";
    a.show = function() {
        var a;
        this.affectedElements && (a = "Y" === this.action.attribute01,
        this.affectedElements.each(function() {
            c(this).show(a)
        }))
    }
    ,
    a.hide = function() {
        var a;
        this.affectedElements && (a = "Y" === this.action.attribute01,
        this.affectedElements.each(function() {
            c(this).hide(a)
        }))
    }
    ,
    a.enable = function() {
        this.affectedElements && this.affectedElements.each(function() {
            c(this).enable()
        })
    }
    ,
    a.disable = function() {
        this.affectedElements && this.affectedElements.each(function() {
            c(this).disable()
        })
    }
    ,
    a.setValue = function() {
        function c(b) {
            o.each(function(a) {
                $s(this, b, null, l)
            }),
            a.resume(p, !1)
        }
        function d() {
            n || o.each(function() {
                $s(this, "", null, !0)
            })
        }
        function e(b) {
            var d, e;
            if ("SQL_STATEMENT" === h)
                if ("ITEM" === g.affectedElementsType) {
                    d = g.affectedElements.split(",");
                    for (var f = 0, i = d.length; f < i; f++)
                        e = "undefined" != typeof b.values[f] ? b.values[f] : "",
                        $s(d[f], e, null, l);
                    a.resume(p, !1)
                } else
                    c(b.values[0]);
            else
                c(b.value)
        }
        function f(b, c, d) {
            a.handleAjaxErrors(b, c, d, p)
        }
        var g = this.action
          , h = g.attribute01
          , i = g.attribute02
          , j = g.attribute04
          , k = g.attribute05
          , l = "Y" === g.attribute09
          , m = g.attribute10
          , n = g.waitForResult && "sync" === g.attribute11
          , o = this.affectedElements
          , p = this.resumeCallback;
        "STATIC_ASSIGNMENT" === h ? c(i) : "SQL_STATEMENT" === h || "PLSQL_EXPRESSION" === h || "FUNCTION_BODY" === h ? b.plugin(g.ajaxIdentifier, {
            pageItems: j
        }, {
            loadingIndicator: o,
            clear: d,
            success: e,
            error: f,
            async: !n,
            target: this.browserEvent.target
        }) : "JAVASCRIPT_EXPRESSION" === h ? c(k.call(this)) : "DIALOG_RETURN_ITEM" === h && c(this.data[m])
    }
    ,
    a.executePlSqlCode = function() {
        function c() {
            k || d(i, apex.gPageContext$).each(function() {
                $s(this, "", null, !0)
            })
        }
        function e(b) {
            var c, d;
            if (b && b.item) {
                c = b.item.length,
                d = b.item;
                for (var e = 0; e < c; e++)
                    $s(d[e].id, d[e].value, null, j)
            }
            a.resume(l, !1)
        }
        function f(b, c, d) {
            a.handleAjaxErrors(b, c, d, l)
        }
        var g = this.action
          , h = g.attribute01
          , i = g.attribute02
          , j = "Y" === g.attribute04
          , k = g.waitForResult && "sync" === g.attribute05
          , l = this.resumeCallback;
        b.plugin(g.ajaxIdentifier, {
            pageItems: h
        }, {
            dataType: i ? "json" : "",
            loadingIndicator: i,
            clear: c,
            success: e,
            error: f,
            async: !k,
            target: this.browserEvent.target
        })
    }
    ,
    a.clear = function() {
        this.affectedElements && this.affectedElements.each(function() {
            $s(this, "", "")
        })
    }
    ,
    a.addClass = function() {
        this.affectedElements && this.affectedElements.addClass(this.action.attribute01)
    }
    ,
    a.removeClass = function() {
        this.affectedElements && (this.action.attribute01 ? this.affectedElements.removeClass(this.action.attribute01) : this.affectedElements.removeClass())
    }
    ,
    a.setCSS = function() {
        var a = this.action;
        this.affectedElements.each(function() {
            c(this).setStyle(a.attribute01, a.attribute02)
        })
    }
    ,
    a.setFocus = function() {
        this.affectedElements.each(function() {
            c(this).setFocus()
        })
    }
    ,
    a.submitPage = function() {
        var a = this.action
          , b = a.attribute01
          , c = "Y" === a.attribute02;
        apex.submit({
            request: b,
            showWait: c
        })
    }
    ,
    a.refresh = function() {
        this.affectedElements && this.affectedElements.each(function() {
            var a = this.id;
            a && e.isRegion(a) ? e(a).refresh() : d(this).trigger("apexrefresh")
        })
    }
    ,
    a.cancelEvent = function() {
        apex.event.gCancelFlag = !0,
        a.gCancelActions = !0,
        this.browserEvent.stopImmediatePropagation(),
        this.browserEvent.preventDefault()
    }
    ,
    a.showAlert = function() {
        window.alert(this.action.attribute01)
    }
    ,
    a.askConfirm = function() {
        confirm(this.action.attribute01) || (apex.event.gCancelFlag = !0,
        a.gCancelActions = !0)
    }
}(apex.da, apex.server, apex.item, apex.jQuery, apex.region);
/*! jQuery UI - v1.10.4 - 2014-10-15
* http://jqueryui.com
* Includes: jquery.ui.core.js, jquery.ui.widget.js, jquery.ui.mouse.js, jquery.ui.position.js, jquery.ui.draggable.js, jquery.ui.resizable.js, jquery.ui.button.js, jquery.ui.datepicker.js, jquery.ui.dialog.js, jquery.ui.tooltip.js, jquery.ui.effect.js, jquery.ui.effect-drop.js
* Copyright 2014 jQuery Foundation and other contributors; Licensed MIT */

(function(e, t) {
    function i(t, i) {
        var a, n, r, o = t.nodeName.toLowerCase();
        return "area" === o ? (a = t.parentNode,
        n = a.name,
        t.href && n && "map" === a.nodeName.toLowerCase() ? (r = e("img[usemap=#" + n + "]")[0],
        !!r && s(r)) : !1) : (/input|select|textarea|button|object/.test(o) ? !t.disabled : "a" === o ? t.href || i : i) && s(t)
    }
    function s(t) {
        return e.expr.filters.visible(t) && !e(t).parents().addBack().filter(function() {
            return "hidden" === e.css(this, "visibility")
        }).length
    }
    var a = 0
      , n = /^ui-id-\d+$/;
    e.ui = e.ui || {},
    e.extend(e.ui, {
        version: "1.10.4",
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
    }),
    e.fn.extend({
        focus: function(t) {
            return function(i, s) {
                return "number" == typeof i ? this.each(function() {
                    var t = this;
                    setTimeout(function() {
                        e(t).focus(),
                        s && s.call(t)
                    }, i)
                }) : t.apply(this, arguments)
            }
        }(e.fn.focus),
        scrollParent: function() {
            var t;
            return t = e.ui.ie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? this.parents().filter(function() {
                return /(relative|absolute|fixed)/.test(e.css(this, "position")) && /(auto|scroll)/.test(e.css(this, "overflow") + e.css(this, "overflow-y") + e.css(this, "overflow-x"))
            }).eq(0) : this.parents().filter(function() {
                return /(auto|scroll)/.test(e.css(this, "overflow") + e.css(this, "overflow-y") + e.css(this, "overflow-x"))
            }).eq(0),
            /fixed/.test(this.css("position")) || !t.length ? e(document) : t
        },
        zIndex: function(i) {
            if (i !== t)
                return this.css("zIndex", i);
            if (this.length)
                for (var s, a, n = e(this[0]); n.length && n[0] !== document; ) {
                    if (s = n.css("position"),
                    ("absolute" === s || "relative" === s || "fixed" === s) && (a = parseInt(n.css("zIndex"), 10),
                    !isNaN(a) && 0 !== a))
                        return a;
                    n = n.parent()
                }
            return 0
        },
        uniqueId: function() {
            return this.each(function() {
                this.id || (this.id = "ui-id-" + ++a)
            })
        },
        removeUniqueId: function() {
            return this.each(function() {
                n.test(this.id) && e(this).removeAttr("id")
            })
        }
    }),
    e.extend(e.expr[":"], {
        data: e.expr.createPseudo ? e.expr.createPseudo(function(t) {
            return function(i) {
                return !!e.data(i, t)
            }
        }) : function(t, i, s) {
            return !!e.data(t, s[3])
        }
        ,
        focusable: function(t) {
            return i(t, !isNaN(e.attr(t, "tabindex")))
        },
        tabbable: function(t) {
            var s = e.attr(t, "tabindex")
              , a = isNaN(s);
            return (a || s >= 0) && i(t, !a)
        }
    }),
    e("<a>").outerWidth(1).jquery || e.each(["Width", "Height"], function(i, s) {
        function a(t, i, s, a) {
            return e.each(n, function() {
                i -= parseFloat(e.css(t, "padding" + this)) || 0,
                s && (i -= parseFloat(e.css(t, "border" + this + "Width")) || 0),
                a && (i -= parseFloat(e.css(t, "margin" + this)) || 0)
            }),
            i
        }
        var n = "Width" === s ? ["Left", "Right"] : ["Top", "Bottom"]
          , r = s.toLowerCase()
          , o = {
            innerWidth: e.fn.innerWidth,
            innerHeight: e.fn.innerHeight,
            outerWidth: e.fn.outerWidth,
            outerHeight: e.fn.outerHeight
        };
        e.fn["inner" + s] = function(i) {
            return i === t ? o["inner" + s].call(this) : this.each(function() {
                e(this).css(r, a(this, i) + "px")
            })
        }
        ,
        e.fn["outer" + s] = function(t, i) {
            return "number" != typeof t ? o["outer" + s].call(this, t) : this.each(function() {
                e(this).css(r, a(this, t, !0, i) + "px")
            })
        }
    }),
    e.fn.addBack || (e.fn.addBack = function(e) {
        return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
    }
    ),
    e("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (e.fn.removeData = function(t) {
        return function(i) {
            return arguments.length ? t.call(this, e.camelCase(i)) : t.call(this)
        }
    }(e.fn.removeData)),
    e.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()),
    e.support.selectstart = "onselectstart"in document.createElement("div"),
    e.fn.extend({
        disableSelection: function() {
            return this.bind((e.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function(e) {
                e.preventDefault()
            })
        },
        enableSelection: function() {
            return this.unbind(".ui-disableSelection")
        }
    }),
    e.extend(e.ui, {
        plugin: {
            add: function(t, i, s) {
                var a, n = e.ui[t].prototype;
                for (a in s)
                    n.plugins[a] = n.plugins[a] || [],
                    n.plugins[a].push([i, s[a]])
            },
            call: function(e, t, i) {
                var s, a = e.plugins[t];
                if (a && e.element[0].parentNode && 11 !== e.element[0].parentNode.nodeType)
                    for (s = 0; a.length > s; s++)
                        e.options[a[s][0]] && a[s][1].apply(e.element, i)
            }
        },
        hasScroll: function(t, i) {
            if ("hidden" === e(t).css("overflow"))
                return !1;
            var s = i && "left" === i ? "scrollLeft" : "scrollTop"
              , a = !1;
            return t[s] > 0 ? !0 : (t[s] = 1,
            a = t[s] > 0,
            t[s] = 0,
            a)
        }
    })
}
)(jQuery);
(function(e, t) {
    var i = 0
      , s = Array.prototype.slice
      , a = e.cleanData;
    e.cleanData = function(t) {
        for (var i, s = 0; null != (i = t[s]); s++)
            try {
                e(i).triggerHandler("remove")
            } catch (n) {}
        a(t)
    }
    ,
    e.widget = function(i, s, a) {
        var n, r, o, h, l = {}, u = i.split(".")[0];
        i = i.split(".")[1],
        n = u + "-" + i,
        a || (a = s,
        s = e.Widget),
        e.expr[":"][n.toLowerCase()] = function(t) {
            return !!e.data(t, n)
        }
        ,
        e[u] = e[u] || {},
        r = e[u][i],
        o = e[u][i] = function(e, i) {
            return this._createWidget ? (arguments.length && this._createWidget(e, i),
            t) : new o(e,i)
        }
        ,
        e.extend(o, r, {
            version: a.version,
            _proto: e.extend({}, a),
            _childConstructors: []
        }),
        h = new s,
        h.options = e.widget.extend({}, h.options),
        e.each(a, function(i, a) {
            return e.isFunction(a) ? (l[i] = function() {
                var e = function() {
                    return s.prototype[i].apply(this, arguments)
                }
                  , t = function(e) {
                    return s.prototype[i].apply(this, e)
                };
                return function() {
                    var i, s = this._super, n = this._superApply;
                    return this._super = e,
                    this._superApply = t,
                    i = a.apply(this, arguments),
                    this._super = s,
                    this._superApply = n,
                    i
                }
            }(),
            t) : (l[i] = a,
            t)
        }),
        o.prototype = e.widget.extend(h, {
            widgetEventPrefix: r ? h.widgetEventPrefix || i : i
        }, l, {
            constructor: o,
            namespace: u,
            widgetName: i,
            widgetFullName: n
        }),
        r ? (e.each(r._childConstructors, function(t, i) {
            var s = i.prototype;
            e.widget(s.namespace + "." + s.widgetName, o, i._proto)
        }),
        delete r._childConstructors) : s._childConstructors.push(o),
        e.widget.bridge(i, o)
    }
    ,
    e.widget.extend = function(i) {
        for (var a, n, r = s.call(arguments, 1), o = 0, h = r.length; h > o; o++)
            for (a in r[o])
                n = r[o][a],
                r[o].hasOwnProperty(a) && n !== t && (i[a] = e.isPlainObject(n) ? e.isPlainObject(i[a]) ? e.widget.extend({}, i[a], n) : e.widget.extend({}, n) : n);
        return i
    }
    ,
    e.widget.bridge = function(i, a) {
        var n = a.prototype.widgetFullName || i;
        e.fn[i] = function(r) {
            var o = "string" == typeof r
              , h = s.call(arguments, 1)
              , l = this;
            return r = !o && h.length ? e.widget.extend.apply(null, [r].concat(h)) : r,
            o ? this.each(function() {
                var s, a = e.data(this, n);
                return a ? e.isFunction(a[r]) && "_" !== r.charAt(0) ? (s = a[r].apply(a, h),
                s !== a && s !== t ? (l = s && s.jquery ? l.pushStack(s.get()) : s,
                !1) : t) : e.error("no such method '" + r + "' for " + i + " widget instance") : e.error("cannot call methods on " + i + " prior to initialization; " + "attempted to call method '" + r + "'")
            }) : this.each(function() {
                var t = e.data(this, n);
                t ? t.option(r || {})._init() : e.data(this, n, new a(r,this))
            }),
            l
        }
    }
    ,
    e.Widget = function() {}
    ,
    e.Widget._childConstructors = [],
    e.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        defaultElement: "<div>",
        options: {
            disabled: !1,
            create: null
        },
        _createWidget: function(t, s) {
            s = e(s || this.defaultElement || this)[0],
            this.element = e(s),
            this.uuid = i++,
            this.eventNamespace = "." + this.widgetName + this.uuid,
            this.options = e.widget.extend({}, this.options, this._getCreateOptions(), t),
            this.bindings = e(),
            this.hoverable = e(),
            this.focusable = e(),
            s !== this && (e.data(s, this.widgetFullName, this),
            this._on(!0, this.element, {
                remove: function(e) {
                    e.target === s && this.destroy()
                }
            }),
            this.document = e(s.style ? s.ownerDocument : s.document || s),
            this.window = e(this.document[0].defaultView || this.document[0].parentWindow)),
            this._create(),
            this._trigger("create", null, this._getCreateEventData()),
            this._init()
        },
        _getCreateOptions: e.noop,
        _getCreateEventData: e.noop,
        _create: e.noop,
        _init: e.noop,
        destroy: function() {
            this._destroy(),
            this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(e.camelCase(this.widgetFullName)),
            this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled " + "ui-state-disabled"),
            this.bindings.unbind(this.eventNamespace),
            this.hoverable.removeClass("ui-state-hover"),
            this.focusable.removeClass("ui-state-focus")
        },
        _destroy: e.noop,
        widget: function() {
            return this.element
        },
        option: function(i, s) {
            var a, n, r, o = i;
            if (0 === arguments.length)
                return e.widget.extend({}, this.options);
            if ("string" == typeof i)
                if (o = {},
                a = i.split("."),
                i = a.shift(),
                a.length) {
                    for (n = o[i] = e.widget.extend({}, this.options[i]),
                    r = 0; a.length - 1 > r; r++)
                        n[a[r]] = n[a[r]] || {},
                        n = n[a[r]];
                    if (i = a.pop(),
                    1 === arguments.length)
                        return n[i] === t ? null : n[i];
                    n[i] = s
                } else {
                    if (1 === arguments.length)
                        return this.options[i] === t ? null : this.options[i];
                    o[i] = s
                }
            return this._setOptions(o),
            this
        },
        _setOptions: function(e) {
            var t;
            for (t in e)
                this._setOption(t, e[t]);
            return this
        },
        _setOption: function(e, t) {
            return this.options[e] = t,
            "disabled" === e && (this.widget().toggleClass(this.widgetFullName + "-disabled ui-state-disabled", !!t).attr("aria-disabled", t),
            this.hoverable.removeClass("ui-state-hover"),
            this.focusable.removeClass("ui-state-focus")),
            this
        },
        enable: function() {
            return this._setOption("disabled", !1)
        },
        disable: function() {
            return this._setOption("disabled", !0)
        },
        _on: function(i, s, a) {
            var n, r = this;
            "boolean" != typeof i && (a = s,
            s = i,
            i = !1),
            a ? (s = n = e(s),
            this.bindings = this.bindings.add(s)) : (a = s,
            s = this.element,
            n = this.widget()),
            e.each(a, function(a, o) {
                function h() {
                    return i || r.options.disabled !== !0 && !e(this).hasClass("ui-state-disabled") ? ("string" == typeof o ? r[o] : o).apply(r, arguments) : t
                }
                "string" != typeof o && (h.guid = o.guid = o.guid || h.guid || e.guid++);
                var l = a.match(/^(\w+)\s*(.*)$/)
                  , u = l[1] + r.eventNamespace
                  , d = l[2];
                d ? n.delegate(d, u, h) : s.bind(u, h)
            })
        },
        _off: function(e, t) {
            t = (t || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace,
            e.unbind(t).undelegate(t)
        },
        _delay: function(e, t) {
            function i() {
                return ("string" == typeof e ? s[e] : e).apply(s, arguments)
            }
            var s = this;
            return setTimeout(i, t || 0)
        },
        _hoverable: function(t) {
            this.hoverable = this.hoverable.add(t),
            this._on(t, {
                mouseenter: function(t) {
                    e(t.currentTarget).addClass("ui-state-hover")
                },
                mouseleave: function(t) {
                    e(t.currentTarget).removeClass("ui-state-hover")
                }
            })
        },
        _focusable: function(t) {
            this.focusable = this.focusable.add(t),
            this._on(t, {
                focusin: function(t) {
                    e(t.currentTarget).addClass("ui-state-focus")
                },
                focusout: function(t) {
                    e(t.currentTarget).removeClass("ui-state-focus")
                }
            })
        },
        _trigger: function(t, i, s) {
            var a, n, r = this.options[t];
            if (s = s || {},
            i = e.Event(i),
            i.type = (t === this.widgetEventPrefix ? t : this.widgetEventPrefix + t).toLowerCase(),
            i.target = this.element[0],
            n = i.originalEvent)
                for (a in n)
                    a in i || (i[a] = n[a]);
            return this.element.trigger(i, s),
            !(e.isFunction(r) && r.apply(this.element[0], [i].concat(s)) === !1 || i.isDefaultPrevented())
        }
    },
    e.each({
        show: "fadeIn",
        hide: "fadeOut"
    }, function(t, i) {
        e.Widget.prototype["_" + t] = function(s, a, n) {
            "string" == typeof a && (a = {
                effect: a
            });
            var r, o = a ? a === !0 || "number" == typeof a ? i : a.effect || i : t;
            a = a || {},
            "number" == typeof a && (a = {
                duration: a
            }),
            r = !e.isEmptyObject(a),
            a.complete = n,
            a.delay && s.delay(a.delay),
            r && e.effects && e.effects.effect[o] ? s[t](a) : o !== t && s[o] ? s[o](a.duration, a.easing, n) : s.queue(function(i) {
                e(this)[t](),
                n && n.call(s[0]),
                i()
            })
        }
    })
}
)(jQuery);
(function(e) {
    var t = !1;
    e(document).mouseup(function() {
        t = !1
    }),
    e.widget("ui.mouse", {
        version: "1.10.4",
        options: {
            cancel: "input,textarea,button,select,option",
            distance: 1,
            delay: 0
        },
        _mouseInit: function() {
            var t = this;
            this.element.bind("mousedown." + this.widgetName, function(e) {
                return t._mouseDown(e)
            }).bind("click." + this.widgetName, function(i) {
                return !0 === e.data(i.target, t.widgetName + ".preventClickEvent") ? (e.removeData(i.target, t.widgetName + ".preventClickEvent"),
                i.stopImmediatePropagation(),
                !1) : undefined
            }),
            this.started = !1
        },
        _mouseDestroy: function() {
            this.element.unbind("." + this.widgetName),
            this._mouseMoveDelegate && e(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate)
        },
        _mouseDown: function(i) {
            if (!t) {
                this._mouseStarted && this._mouseUp(i),
                this._mouseDownEvent = i;
                var s = this
                  , a = 1 === i.which
                  , n = "string" == typeof this.options.cancel && i.target.nodeName ? e(i.target).closest(this.options.cancel).length : !1;
                return a && !n && this._mouseCapture(i) ? (this.mouseDelayMet = !this.options.delay,
                this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function() {
                    s.mouseDelayMet = !0
                }, this.options.delay)),
                this._mouseDistanceMet(i) && this._mouseDelayMet(i) && (this._mouseStarted = this._mouseStart(i) !== !1,
                !this._mouseStarted) ? (i.preventDefault(),
                !0) : (!0 === e.data(i.target, this.widgetName + ".preventClickEvent") && e.removeData(i.target, this.widgetName + ".preventClickEvent"),
                this._mouseMoveDelegate = function(e) {
                    return s._mouseMove(e)
                }
                ,
                this._mouseUpDelegate = function(e) {
                    return s._mouseUp(e)
                }
                ,
                e(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate),
                i.preventDefault(),
                t = !0,
                !0)) : !0
            }
        },
        _mouseMove: function(t) {
            return e.ui.ie && (!document.documentMode || 9 > document.documentMode) && !t.button ? this._mouseUp(t) : this._mouseStarted ? (this._mouseDrag(t),
            t.preventDefault()) : (this._mouseDistanceMet(t) && this._mouseDelayMet(t) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, t) !== !1,
            this._mouseStarted ? this._mouseDrag(t) : this._mouseUp(t)),
            !this._mouseStarted)
        },
        _mouseUp: function(t) {
            return e(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate),
            this._mouseStarted && (this._mouseStarted = !1,
            t.target === this._mouseDownEvent.target && e.data(t.target, this.widgetName + ".preventClickEvent", !0),
            this._mouseStop(t)),
            !1
        },
        _mouseDistanceMet: function(e) {
            return Math.max(Math.abs(this._mouseDownEvent.pageX - e.pageX), Math.abs(this._mouseDownEvent.pageY - e.pageY)) >= this.options.distance
        },
        _mouseDelayMet: function() {
            return this.mouseDelayMet
        },
        _mouseStart: function() {},
        _mouseDrag: function() {},
        _mouseStop: function() {},
        _mouseCapture: function() {
            return !0
        }
    })
}
)(jQuery);
(function(e, t) {
    function i(e, t, i) {
        return [parseFloat(e[0]) * (p.test(e[0]) ? t / 100 : 1), parseFloat(e[1]) * (p.test(e[1]) ? i / 100 : 1)]
    }
    function s(t, i) {
        return parseInt(e.css(t, i), 10) || 0
    }
    function a(t) {
        var i = t[0];
        return 9 === i.nodeType ? {
            width: t.width(),
            height: t.height(),
            offset: {
                top: 0,
                left: 0
            }
        } : e.isWindow(i) ? {
            width: t.width(),
            height: t.height(),
            offset: {
                top: t.scrollTop(),
                left: t.scrollLeft()
            }
        } : i.preventDefault ? {
            width: 0,
            height: 0,
            offset: {
                top: i.pageY,
                left: i.pageX
            }
        } : {
            width: t.outerWidth(),
            height: t.outerHeight(),
            offset: t.offset()
        }
    }
    e.ui = e.ui || {};
    var n, r = Math.max, o = Math.abs, h = Math.round, l = /left|center|right/, u = /top|center|bottom/, d = /[\+\-]\d+(\.[\d]+)?%?/, c = /^\w+/, p = /%$/, f = e.fn.position;
    e.position = {
        scrollbarWidth: function() {
            if (n !== t)
                return n;
            var i, s, a = e("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"), r = a.children()[0];
            return e("body").append(a),
            i = r.offsetWidth,
            a.css("overflow", "scroll"),
            s = r.offsetWidth,
            i === s && (s = a[0].clientWidth),
            a.remove(),
            n = i - s
        },
        getScrollInfo: function(t) {
            var i = t.isWindow || t.isDocument ? "" : t.element.css("overflow-x")
              , s = t.isWindow || t.isDocument ? "" : t.element.css("overflow-y")
              , a = "scroll" === i || "auto" === i && t.width < t.element[0].scrollWidth
              , n = "scroll" === s || "auto" === s && t.height < t.element[0].scrollHeight;
            return {
                width: n ? e.position.scrollbarWidth() : 0,
                height: a ? e.position.scrollbarWidth() : 0
            }
        },
        getWithinInfo: function(t) {
            var i = e(t || window)
              , s = e.isWindow(i[0])
              , a = !!i[0] && 9 === i[0].nodeType;
            return {
                element: i,
                isWindow: s,
                isDocument: a,
                offset: i.offset() || {
                    left: 0,
                    top: 0
                },
                scrollLeft: i.scrollLeft(),
                scrollTop: i.scrollTop(),
                width: s ? i.width() : i.outerWidth(),
                height: s ? i.height() : i.outerHeight()
            }
        }
    },
    e.fn.position = function(t) {
        if (!t || !t.of)
            return f.apply(this, arguments);
        t = e.extend({}, t);
        var n, p, m, g, v, y, b = e(t.of), _ = e.position.getWithinInfo(t.within), x = e.position.getScrollInfo(_), k = (t.collision || "flip").split(" "), w = {};
        return y = a(b),
        b[0].preventDefault && (t.at = "left top"),
        p = y.width,
        m = y.height,
        g = y.offset,
        v = e.extend({}, g),
        e.each(["my", "at"], function() {
            var e, i, s = (t[this] || "").split(" ");
            1 === s.length && (s = l.test(s[0]) ? s.concat(["center"]) : u.test(s[0]) ? ["center"].concat(s) : ["center", "center"]),
            s[0] = l.test(s[0]) ? s[0] : "center",
            s[1] = u.test(s[1]) ? s[1] : "center",
            e = d.exec(s[0]),
            i = d.exec(s[1]),
            w[this] = [e ? e[0] : 0, i ? i[0] : 0],
            t[this] = [c.exec(s[0])[0], c.exec(s[1])[0]]
        }),
        1 === k.length && (k[1] = k[0]),
        "right" === t.at[0] ? v.left += p : "center" === t.at[0] && (v.left += p / 2),
        "bottom" === t.at[1] ? v.top += m : "center" === t.at[1] && (v.top += m / 2),
        n = i(w.at, p, m),
        v.left += n[0],
        v.top += n[1],
        this.each(function() {
            var a, l, u = e(this), d = u.outerWidth(), c = u.outerHeight(), f = s(this, "marginLeft"), y = s(this, "marginTop"), D = d + f + s(this, "marginRight") + x.width, T = c + y + s(this, "marginBottom") + x.height, S = e.extend({}, v), M = i(w.my, u.outerWidth(), u.outerHeight());
            "right" === t.my[0] ? S.left -= d : "center" === t.my[0] && (S.left -= d / 2),
            "bottom" === t.my[1] ? S.top -= c : "center" === t.my[1] && (S.top -= c / 2),
            S.left += M[0],
            S.top += M[1],
            e.support.offsetFractions || (S.left = h(S.left),
            S.top = h(S.top)),
            a = {
                marginLeft: f,
                marginTop: y
            },
            e.each(["left", "top"], function(i, s) {
                e.ui.position[k[i]] && e.ui.position[k[i]][s](S, {
                    targetWidth: p,
                    targetHeight: m,
                    elemWidth: d,
                    elemHeight: c,
                    collisionPosition: a,
                    collisionWidth: D,
                    collisionHeight: T,
                    offset: [n[0] + M[0], n[1] + M[1]],
                    my: t.my,
                    at: t.at,
                    within: _,
                    elem: u
                })
            }),
            t.using && (l = function(e) {
                var i = g.left - S.left
                  , s = i + p - d
                  , a = g.top - S.top
                  , n = a + m - c
                  , h = {
                    target: {
                        element: b,
                        left: g.left,
                        top: g.top,
                        width: p,
                        height: m
                    },
                    element: {
                        element: u,
                        left: S.left,
                        top: S.top,
                        width: d,
                        height: c
                    },
                    horizontal: 0 > s ? "left" : i > 0 ? "right" : "center",
                    vertical: 0 > n ? "top" : a > 0 ? "bottom" : "middle"
                };
                d > p && p > o(i + s) && (h.horizontal = "center"),
                c > m && m > o(a + n) && (h.vertical = "middle"),
                h.important = r(o(i), o(s)) > r(o(a), o(n)) ? "horizontal" : "vertical",
                t.using.call(this, e, h)
            }
            ),
            u.offset(e.extend(S, {
                using: l
            }))
        })
    }
    ,
    e.ui.position = {
        fit: {
            left: function(e, t) {
                var i, s = t.within, a = s.isWindow ? s.scrollLeft : s.offset.left, n = s.width, o = e.left - t.collisionPosition.marginLeft, h = a - o, l = o + t.collisionWidth - n - a;
                t.collisionWidth > n ? h > 0 && 0 >= l ? (i = e.left + h + t.collisionWidth - n - a,
                e.left += h - i) : e.left = l > 0 && 0 >= h ? a : h > l ? a + n - t.collisionWidth : a : h > 0 ? e.left += h : l > 0 ? e.left -= l : e.left = r(e.left - o, e.left)
            },
            top: function(e, t) {
                var i, s = t.within, a = s.isWindow ? s.scrollTop : s.offset.top, n = t.within.height, o = e.top - t.collisionPosition.marginTop, h = a - o, l = o + t.collisionHeight - n - a;
                t.collisionHeight > n ? h > 0 && 0 >= l ? (i = e.top + h + t.collisionHeight - n - a,
                e.top += h - i) : e.top = l > 0 && 0 >= h ? a : h > l ? a + n - t.collisionHeight : a : h > 0 ? e.top += h : l > 0 ? e.top -= l : e.top = r(e.top - o, e.top)
            }
        },
        flip: {
            left: function(e, t) {
                var i, s, a = t.within, n = a.offset.left + a.scrollLeft, r = a.width, h = a.isWindow ? a.scrollLeft : a.offset.left, l = e.left - t.collisionPosition.marginLeft, u = l - h, d = l + t.collisionWidth - r - h, c = "left" === t.my[0] ? -t.elemWidth : "right" === t.my[0] ? t.elemWidth : 0, p = "left" === t.at[0] ? t.targetWidth : "right" === t.at[0] ? -t.targetWidth : 0, f = -2 * t.offset[0];
                0 > u ? (i = e.left + c + p + f + t.collisionWidth - r - n,
                (0 > i || o(u) > i) && (e.left += c + p + f)) : d > 0 && (s = e.left - t.collisionPosition.marginLeft + c + p + f - h,
                (s > 0 || d > o(s)) && (e.left += c + p + f))
            },
            top: function(e, t) {
                var i, s, a = t.within, n = a.offset.top + a.scrollTop, r = a.height, h = a.isWindow ? a.scrollTop : a.offset.top, l = e.top - t.collisionPosition.marginTop, u = l - h, d = l + t.collisionHeight - r - h, c = "top" === t.my[1], p = c ? -t.elemHeight : "bottom" === t.my[1] ? t.elemHeight : 0, f = "top" === t.at[1] ? t.targetHeight : "bottom" === t.at[1] ? -t.targetHeight : 0, m = -2 * t.offset[1];
                0 > u ? (s = e.top + p + f + m + t.collisionHeight - r - n,
                e.top + p + f + m > u && (0 > s || o(u) > s) && (e.top += p + f + m)) : d > 0 && (i = e.top - t.collisionPosition.marginTop + p + f + m - h,
                e.top + p + f + m > d && (i > 0 || d > o(i)) && (e.top += p + f + m))
            }
        },
        flipfit: {
            left: function() {
                e.ui.position.flip.left.apply(this, arguments),
                e.ui.position.fit.left.apply(this, arguments)
            },
            top: function() {
                e.ui.position.flip.top.apply(this, arguments),
                e.ui.position.fit.top.apply(this, arguments)
            }
        }
    },
    function() {
        var t, i, s, a, n, r = document.getElementsByTagName("body")[0], o = document.createElement("div");
        t = document.createElement(r ? "div" : "body"),
        s = {
            visibility: "hidden",
            width: 0,
            height: 0,
            border: 0,
            margin: 0,
            background: "none"
        },
        r && e.extend(s, {
            position: "absolute",
            left: "-1000px",
            top: "-1000px"
        });
        for (n in s)
            t.style[n] = s[n];
        t.appendChild(o),
        i = r || document.documentElement,
        i.insertBefore(t, i.firstChild),
        o.style.cssText = "position: absolute; left: 10.7432222px;",
        a = e(o).offset().left,
        e.support.offsetFractions = a > 10 && 11 > a,
        t.innerHTML = "",
        i.removeChild(t)
    }()
}
)(jQuery);
(function(e) {
    e.widget("ui.draggable", e.ui.mouse, {
        version: "1.10.4",
        widgetEventPrefix: "drag",
        options: {
            addClasses: !0,
            appendTo: "parent",
            axis: !1,
            connectToSortable: !1,
            containment: !1,
            cursor: "auto",
            cursorAt: !1,
            grid: !1,
            handle: !1,
            helper: "original",
            iframeFix: !1,
            opacity: !1,
            refreshPositions: !1,
            revert: !1,
            revertDuration: 500,
            scope: "default",
            scroll: !0,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            snap: !1,
            snapMode: "both",
            snapTolerance: 20,
            stack: !1,
            zIndex: !1,
            drag: null,
            start: null,
            stop: null
        },
        _create: function() {
            "original" !== this.options.helper || /^(?:r|a|f)/.test(this.element.css("position")) || (this.element[0].style.position = "relative"),
            this.options.addClasses && this.element.addClass("ui-draggable"),
            this.options.disabled && this.element.addClass("ui-draggable-disabled"),
            this._mouseInit()
        },
        _destroy: function() {
            this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"),
            this._mouseDestroy()
        },
        _mouseCapture: function(t) {
            var i = this.options;
            return this.helper || i.disabled || e(t.target).closest(".ui-resizable-handle").length > 0 ? !1 : (this.handle = this._getHandle(t),
            this.handle ? (e(i.iframeFix === !0 ? "iframe" : i.iframeFix).each(function() {
                e("<div class='ui-draggable-iframeFix' style='background: #fff;'></div>").css({
                    width: this.offsetWidth + "px",
                    height: this.offsetHeight + "px",
                    position: "absolute",
                    opacity: "0.001",
                    zIndex: 1e3
                }).css(e(this).offset()).appendTo("body")
            }),
            !0) : !1)
        },
        _mouseStart: function(t) {
            var i = this.options;
            return this.helper = this._createHelper(t),
            this.helper.addClass("ui-draggable-dragging"),
            this._cacheHelperProportions(),
            e.ui.ddmanager && (e.ui.ddmanager.current = this),
            this._cacheMargins(),
            this.cssPosition = this.helper.css("position"),
            this.scrollParent = this.helper.scrollParent(),
            this.offsetParent = this.helper.offsetParent(),
            this.offsetParentCssPosition = this.offsetParent.css("position"),
            this.offset = this.positionAbs = this.element.offset(),
            this.offset = {
                top: this.offset.top - this.margins.top,
                left: this.offset.left - this.margins.left
            },
            this.offset.scroll = !1,
            e.extend(this.offset, {
                click: {
                    left: t.pageX - this.offset.left,
                    top: t.pageY - this.offset.top
                },
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset()
            }),
            this.originalPosition = this.position = this._generatePosition(t),
            this.originalPageX = t.pageX,
            this.originalPageY = t.pageY,
            i.cursorAt && this._adjustOffsetFromHelper(i.cursorAt),
            this._setContainment(),
            this._trigger("start", t) === !1 ? (this._clear(),
            !1) : (this._cacheHelperProportions(),
            e.ui.ddmanager && !i.dropBehaviour && e.ui.ddmanager.prepareOffsets(this, t),
            this._mouseDrag(t, !0),
            e.ui.ddmanager && e.ui.ddmanager.dragStart(this, t),
            !0)
        },
        _mouseDrag: function(t, i) {
            if ("fixed" === this.offsetParentCssPosition && (this.offset.parent = this._getParentOffset()),
            this.position = this._generatePosition(t),
            this.positionAbs = this._convertPositionTo("absolute"),
            !i) {
                var s = this._uiHash();
                if (this._trigger("drag", t, s) === !1)
                    return this._mouseUp({}),
                    !1;
                this.position = s.position
            }
            return this.options.axis && "y" === this.options.axis || (this.helper[0].style.left = this.position.left + "px"),
            this.options.axis && "x" === this.options.axis || (this.helper[0].style.top = this.position.top + "px"),
            e.ui.ddmanager && e.ui.ddmanager.drag(this, t),
            !1
        },
        _mouseStop: function(t) {
            var i = this
              , s = !1;
            return e.ui.ddmanager && !this.options.dropBehaviour && (s = e.ui.ddmanager.drop(this, t)),
            this.dropped && (s = this.dropped,
            this.dropped = !1),
            "original" !== this.options.helper || e.contains(this.element[0].ownerDocument, this.element[0]) ? ("invalid" === this.options.revert && !s || "valid" === this.options.revert && s || this.options.revert === !0 || e.isFunction(this.options.revert) && this.options.revert.call(this.element, s) ? e(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function() {
                i._trigger("stop", t) !== !1 && i._clear()
            }) : this._trigger("stop", t) !== !1 && this._clear(),
            !1) : !1
        },
        _mouseUp: function(t) {
            return e("div.ui-draggable-iframeFix").each(function() {
                this.parentNode.removeChild(this)
            }),
            e.ui.ddmanager && e.ui.ddmanager.dragStop(this, t),
            e.ui.mouse.prototype._mouseUp.call(this, t)
        },
        cancel: function() {
            return this.helper.is(".ui-draggable-dragging") ? this._mouseUp({}) : this._clear(),
            this
        },
        _getHandle: function(t) {
            return this.options.handle ? !!e(t.target).closest(this.element.find(this.options.handle)).length : !0
        },
        _createHelper: function(t) {
            var i = this.options
              , s = e.isFunction(i.helper) ? e(i.helper.apply(this.element[0], [t])) : "clone" === i.helper ? this.element.clone().removeAttr("id") : this.element;
            return s.parents("body").length || s.appendTo("parent" === i.appendTo ? this.element[0].parentNode : i.appendTo),
            s[0] === this.element[0] || /(fixed|absolute)/.test(s.css("position")) || s.css("position", "absolute"),
            s
        },
        _adjustOffsetFromHelper: function(t) {
            "string" == typeof t && (t = t.split(" ")),
            e.isArray(t) && (t = {
                left: +t[0],
                top: +t[1] || 0
            }),
            "left"in t && (this.offset.click.left = t.left + this.margins.left),
            "right"in t && (this.offset.click.left = this.helperProportions.width - t.right + this.margins.left),
            "top"in t && (this.offset.click.top = t.top + this.margins.top),
            "bottom"in t && (this.offset.click.top = this.helperProportions.height - t.bottom + this.margins.top)
        },
        _getParentOffset: function() {
            var t = this.offsetParent.offset();
            return "absolute" === this.cssPosition && this.scrollParent[0] !== document && e.contains(this.scrollParent[0], this.offsetParent[0]) && (t.left += this.scrollParent.scrollLeft(),
            t.top += this.scrollParent.scrollTop()),
            (this.offsetParent[0] === document.body || this.offsetParent[0].tagName && "html" === this.offsetParent[0].tagName.toLowerCase() && e.ui.ie) && (t = {
                top: 0,
                left: 0
            }),
            {
                top: t.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: t.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            }
        },
        _getRelativeOffset: function() {
            if ("relative" === this.cssPosition) {
                var e = this.element.position();
                return {
                    top: e.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                    left: e.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                }
            }
            return {
                top: 0,
                left: 0
            }
        },
        _cacheMargins: function() {
            this.margins = {
                left: parseInt(this.element.css("marginLeft"), 10) || 0,
                top: parseInt(this.element.css("marginTop"), 10) || 0,
                right: parseInt(this.element.css("marginRight"), 10) || 0,
                bottom: parseInt(this.element.css("marginBottom"), 10) || 0
            }
        },
        _cacheHelperProportions: function() {
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight()
            }
        },
        _setContainment: function() {
            var t, i, s, a = this.options;
            return a.containment ? "window" === a.containment ? (this.containment = [e(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, e(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, e(window).scrollLeft() + e(window).width() - this.helperProportions.width - this.margins.left, e(window).scrollTop() + (e(window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top],
            undefined) : "document" === a.containment ? (this.containment = [0, 0, e(document).width() - this.helperProportions.width - this.margins.left, (e(document).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top],
            undefined) : a.containment.constructor === Array ? (this.containment = a.containment,
            undefined) : ("parent" === a.containment && (a.containment = this.helper[0].parentNode),
            i = e(a.containment),
            s = i[0],
            s && (t = "hidden" !== i.css("overflow"),
            this.containment = [(parseInt(i.css("borderLeftWidth"), 10) || 0) + (parseInt(i.css("paddingLeft"), 10) || 0), (parseInt(i.css("borderTopWidth"), 10) || 0) + (parseInt(i.css("paddingTop"), 10) || 0), (t ? Math.max(s.scrollWidth, s.offsetWidth) : s.offsetWidth) - (parseInt(i.css("borderRightWidth"), 10) || 0) - (parseInt(i.css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (t ? Math.max(s.scrollHeight, s.offsetHeight) : s.offsetHeight) - (parseInt(i.css("borderBottomWidth"), 10) || 0) - (parseInt(i.css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom],
            this.relative_container = i),
            undefined) : (this.containment = null,
            undefined)
        },
        _convertPositionTo: function(t, i) {
            i || (i = this.position);
            var s = "absolute" === t ? 1 : -1
              , a = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && e.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent;
            return this.offset.scroll || (this.offset.scroll = {
                top: a.scrollTop(),
                left: a.scrollLeft()
            }),
            {
                top: i.top + this.offset.relative.top * s + this.offset.parent.top * s - ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : this.offset.scroll.top) * s,
                left: i.left + this.offset.relative.left * s + this.offset.parent.left * s - ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : this.offset.scroll.left) * s
            }
        },
        _generatePosition: function(t) {
            var i, s, a, n, r = this.options, o = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && e.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent, h = t.pageX, l = t.pageY;
            return this.offset.scroll || (this.offset.scroll = {
                top: o.scrollTop(),
                left: o.scrollLeft()
            }),
            this.originalPosition && (this.containment && (this.relative_container ? (s = this.relative_container.offset(),
            i = [this.containment[0] + s.left, this.containment[1] + s.top, this.containment[2] + s.left, this.containment[3] + s.top]) : i = this.containment,
            t.pageX - this.offset.click.left < i[0] && (h = i[0] + this.offset.click.left),
            t.pageY - this.offset.click.top < i[1] && (l = i[1] + this.offset.click.top),
            t.pageX - this.offset.click.left > i[2] && (h = i[2] + this.offset.click.left),
            t.pageY - this.offset.click.top > i[3] && (l = i[3] + this.offset.click.top)),
            r.grid && (a = r.grid[1] ? this.originalPageY + Math.round((l - this.originalPageY) / r.grid[1]) * r.grid[1] : this.originalPageY,
            l = i ? a - this.offset.click.top >= i[1] || a - this.offset.click.top > i[3] ? a : a - this.offset.click.top >= i[1] ? a - r.grid[1] : a + r.grid[1] : a,
            n = r.grid[0] ? this.originalPageX + Math.round((h - this.originalPageX) / r.grid[0]) * r.grid[0] : this.originalPageX,
            h = i ? n - this.offset.click.left >= i[0] || n - this.offset.click.left > i[2] ? n : n - this.offset.click.left >= i[0] ? n - r.grid[0] : n + r.grid[0] : n)),
            {
                top: l - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : this.offset.scroll.top),
                left: h - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : this.offset.scroll.left)
            }
        },
        _clear: function() {
            this.helper.removeClass("ui-draggable-dragging"),
            this.helper[0] === this.element[0] || this.cancelHelperRemoval || this.helper.remove(),
            this.helper = null,
            this.cancelHelperRemoval = !1
        },
        _trigger: function(t, i, s) {
            return s = s || this._uiHash(),
            e.ui.plugin.call(this, t, [i, s]),
            "drag" === t && (this.positionAbs = this._convertPositionTo("absolute")),
            e.Widget.prototype._trigger.call(this, t, i, s)
        },
        plugins: {},
        _uiHash: function() {
            return {
                helper: this.helper,
                position: this.position,
                originalPosition: this.originalPosition,
                offset: this.positionAbs
            }
        }
    }),
    e.ui.plugin.add("draggable", "connectToSortable", {
        start: function(t, i) {
            var s = e(this).data("ui-draggable")
              , a = s.options
              , n = e.extend({}, i, {
                item: s.element
            });
            s.sortables = [],
            e(a.connectToSortable).each(function() {
                var i = e.data(this, "ui-sortable");
                i && !i.options.disabled && (s.sortables.push({
                    instance: i,
                    shouldRevert: i.options.revert
                }),
                i.refreshPositions(),
                i._trigger("activate", t, n))
            })
        },
        stop: function(t, i) {
            var s = e(this).data("ui-draggable")
              , a = e.extend({}, i, {
                item: s.element
            });
            e.each(s.sortables, function() {
                this.instance.isOver ? (this.instance.isOver = 0,
                s.cancelHelperRemoval = !0,
                this.instance.cancelHelperRemoval = !1,
                this.shouldRevert && (this.instance.options.revert = this.shouldRevert),
                this.instance._mouseStop(t),
                this.instance.options.helper = this.instance.options._helper,
                "original" === s.options.helper && this.instance.currentItem.css({
                    top: "auto",
                    left: "auto"
                })) : (this.instance.cancelHelperRemoval = !1,
                this.instance._trigger("deactivate", t, a))
            })
        },
        drag: function(t, i) {
            var s = e(this).data("ui-draggable")
              , a = this;
            e.each(s.sortables, function() {
                var n = !1
                  , r = this;
                this.instance.positionAbs = s.positionAbs,
                this.instance.helperProportions = s.helperProportions,
                this.instance.offset.click = s.offset.click,
                this.instance._intersectsWith(this.instance.containerCache) && (n = !0,
                e.each(s.sortables, function() {
                    return this.instance.positionAbs = s.positionAbs,
                    this.instance.helperProportions = s.helperProportions,
                    this.instance.offset.click = s.offset.click,
                    this !== r && this.instance._intersectsWith(this.instance.containerCache) && e.contains(r.instance.element[0], this.instance.element[0]) && (n = !1),
                    n
                })),
                n ? (this.instance.isOver || (this.instance.isOver = 1,
                this.instance.currentItem = e(a).clone().removeAttr("id").appendTo(this.instance.element).data("ui-sortable-item", !0),
                this.instance.options._helper = this.instance.options.helper,
                this.instance.options.helper = function() {
                    return i.helper[0]
                }
                ,
                t.target = this.instance.currentItem[0],
                this.instance._mouseCapture(t, !0),
                this.instance._mouseStart(t, !0, !0),
                this.instance.offset.click.top = s.offset.click.top,
                this.instance.offset.click.left = s.offset.click.left,
                this.instance.offset.parent.left -= s.offset.parent.left - this.instance.offset.parent.left,
                this.instance.offset.parent.top -= s.offset.parent.top - this.instance.offset.parent.top,
                s._trigger("toSortable", t),
                s.dropped = this.instance.element,
                s.currentItem = s.element,
                this.instance.fromOutside = s),
                this.instance.currentItem && this.instance._mouseDrag(t)) : this.instance.isOver && (this.instance.isOver = 0,
                this.instance.cancelHelperRemoval = !0,
                this.instance.options.revert = !1,
                this.instance._trigger("out", t, this.instance._uiHash(this.instance)),
                this.instance._mouseStop(t, !0),
                this.instance.options.helper = this.instance.options._helper,
                this.instance.currentItem.remove(),
                this.instance.placeholder && this.instance.placeholder.remove(),
                s._trigger("fromSortable", t),
                s.dropped = !1)
            })
        }
    }),
    e.ui.plugin.add("draggable", "cursor", {
        start: function() {
            var t = e("body")
              , i = e(this).data("ui-draggable").options;
            t.css("cursor") && (i._cursor = t.css("cursor")),
            t.css("cursor", i.cursor)
        },
        stop: function() {
            var t = e(this).data("ui-draggable").options;
            t._cursor && e("body").css("cursor", t._cursor)
        }
    }),
    e.ui.plugin.add("draggable", "opacity", {
        start: function(t, i) {
            var s = e(i.helper)
              , a = e(this).data("ui-draggable").options;
            s.css("opacity") && (a._opacity = s.css("opacity")),
            s.css("opacity", a.opacity)
        },
        stop: function(t, i) {
            var s = e(this).data("ui-draggable").options;
            s._opacity && e(i.helper).css("opacity", s._opacity)
        }
    }),
    e.ui.plugin.add("draggable", "scroll", {
        start: function() {
            var t = e(this).data("ui-draggable");
            t.scrollParent[0] !== document && "HTML" !== t.scrollParent[0].tagName && (t.overflowOffset = t.scrollParent.offset())
        },
        drag: function(t) {
            var i = e(this).data("ui-draggable")
              , s = i.options
              , a = !1;
            i.scrollParent[0] !== document && "HTML" !== i.scrollParent[0].tagName ? (s.axis && "x" === s.axis || (i.overflowOffset.top + i.scrollParent[0].offsetHeight - t.pageY < s.scrollSensitivity ? i.scrollParent[0].scrollTop = a = i.scrollParent[0].scrollTop + s.scrollSpeed : t.pageY - i.overflowOffset.top < s.scrollSensitivity && (i.scrollParent[0].scrollTop = a = i.scrollParent[0].scrollTop - s.scrollSpeed)),
            s.axis && "y" === s.axis || (i.overflowOffset.left + i.scrollParent[0].offsetWidth - t.pageX < s.scrollSensitivity ? i.scrollParent[0].scrollLeft = a = i.scrollParent[0].scrollLeft + s.scrollSpeed : t.pageX - i.overflowOffset.left < s.scrollSensitivity && (i.scrollParent[0].scrollLeft = a = i.scrollParent[0].scrollLeft - s.scrollSpeed))) : (s.axis && "x" === s.axis || (t.pageY - e(document).scrollTop() < s.scrollSensitivity ? a = e(document).scrollTop(e(document).scrollTop() - s.scrollSpeed) : e(window).height() - (t.pageY - e(document).scrollTop()) < s.scrollSensitivity && (a = e(document).scrollTop(e(document).scrollTop() + s.scrollSpeed))),
            s.axis && "y" === s.axis || (t.pageX - e(document).scrollLeft() < s.scrollSensitivity ? a = e(document).scrollLeft(e(document).scrollLeft() - s.scrollSpeed) : e(window).width() - (t.pageX - e(document).scrollLeft()) < s.scrollSensitivity && (a = e(document).scrollLeft(e(document).scrollLeft() + s.scrollSpeed)))),
            a !== !1 && e.ui.ddmanager && !s.dropBehaviour && e.ui.ddmanager.prepareOffsets(i, t)
        }
    }),
    e.ui.plugin.add("draggable", "snap", {
        start: function() {
            var t = e(this).data("ui-draggable")
              , i = t.options;
            t.snapElements = [],
            e(i.snap.constructor !== String ? i.snap.items || ":data(ui-draggable)" : i.snap).each(function() {
                var i = e(this)
                  , s = i.offset();
                this !== t.element[0] && t.snapElements.push({
                    item: this,
                    width: i.outerWidth(),
                    height: i.outerHeight(),
                    top: s.top,
                    left: s.left
                })
            })
        },
        drag: function(t, i) {
            var s, a, n, r, o, h, l, u, d, c, p = e(this).data("ui-draggable"), m = p.options, f = m.snapTolerance, g = i.offset.left, v = g + p.helperProportions.width, y = i.offset.top, b = y + p.helperProportions.height;
            for (d = p.snapElements.length - 1; d >= 0; d--)
                o = p.snapElements[d].left,
                h = o + p.snapElements[d].width,
                l = p.snapElements[d].top,
                u = l + p.snapElements[d].height,
                o - f > v || g > h + f || l - f > b || y > u + f || !e.contains(p.snapElements[d].item.ownerDocument, p.snapElements[d].item) ? (p.snapElements[d].snapping && p.options.snap.release && p.options.snap.release.call(p.element, t, e.extend(p._uiHash(), {
                    snapItem: p.snapElements[d].item
                })),
                p.snapElements[d].snapping = !1) : ("inner" !== m.snapMode && (s = f >= Math.abs(l - b),
                a = f >= Math.abs(u - y),
                n = f >= Math.abs(o - v),
                r = f >= Math.abs(h - g),
                s && (i.position.top = p._convertPositionTo("relative", {
                    top: l - p.helperProportions.height,
                    left: 0
                }).top - p.margins.top),
                a && (i.position.top = p._convertPositionTo("relative", {
                    top: u,
                    left: 0
                }).top - p.margins.top),
                n && (i.position.left = p._convertPositionTo("relative", {
                    top: 0,
                    left: o - p.helperProportions.width
                }).left - p.margins.left),
                r && (i.position.left = p._convertPositionTo("relative", {
                    top: 0,
                    left: h
                }).left - p.margins.left)),
                c = s || a || n || r,
                "outer" !== m.snapMode && (s = f >= Math.abs(l - y),
                a = f >= Math.abs(u - b),
                n = f >= Math.abs(o - g),
                r = f >= Math.abs(h - v),
                s && (i.position.top = p._convertPositionTo("relative", {
                    top: l,
                    left: 0
                }).top - p.margins.top),
                a && (i.position.top = p._convertPositionTo("relative", {
                    top: u - p.helperProportions.height,
                    left: 0
                }).top - p.margins.top),
                n && (i.position.left = p._convertPositionTo("relative", {
                    top: 0,
                    left: o
                }).left - p.margins.left),
                r && (i.position.left = p._convertPositionTo("relative", {
                    top: 0,
                    left: h - p.helperProportions.width
                }).left - p.margins.left)),
                !p.snapElements[d].snapping && (s || a || n || r || c) && p.options.snap.snap && p.options.snap.snap.call(p.element, t, e.extend(p._uiHash(), {
                    snapItem: p.snapElements[d].item
                })),
                p.snapElements[d].snapping = s || a || n || r || c)
        }
    }),
    e.ui.plugin.add("draggable", "stack", {
        start: function() {
            var t, i = this.data("ui-draggable").options, s = e.makeArray(e(i.stack)).sort(function(t, i) {
                return (parseInt(e(t).css("zIndex"), 10) || 0) - (parseInt(e(i).css("zIndex"), 10) || 0)
            });
            s.length && (t = parseInt(e(s[0]).css("zIndex"), 10) || 0,
            e(s).each(function(i) {
                e(this).css("zIndex", t + i)
            }),
            this.css("zIndex", t + s.length))
        }
    }),
    e.ui.plugin.add("draggable", "zIndex", {
        start: function(t, i) {
            var s = e(i.helper)
              , a = e(this).data("ui-draggable").options;
            s.css("zIndex") && (a._zIndex = s.css("zIndex")),
            s.css("zIndex", a.zIndex)
        },
        stop: function(t, i) {
            var s = e(this).data("ui-draggable").options;
            s._zIndex && e(i.helper).css("zIndex", s._zIndex)
        }
    })
}
)(jQuery);
(function(e) {
    function t(e) {
        return parseInt(e, 10) || 0
    }
    function i(e) {
        return !isNaN(parseInt(e, 10))
    }
    e.widget("ui.resizable", e.ui.mouse, {
        version: "1.10.4",
        widgetEventPrefix: "resize",
        options: {
            alsoResize: !1,
            animate: !1,
            animateDuration: "slow",
            animateEasing: "swing",
            aspectRatio: !1,
            autoHide: !1,
            containment: !1,
            ghost: !1,
            grid: !1,
            handles: "e,s,se",
            helper: !1,
            maxHeight: null,
            maxWidth: null,
            minHeight: 10,
            minWidth: 10,
            zIndex: 90,
            resize: null,
            start: null,
            stop: null
        },
        _create: function() {
            var t, i, s, a, n, r = this, o = this.options;
            if (this.element.addClass("ui-resizable"),
            e.extend(this, {
                _aspectRatio: !!o.aspectRatio,
                aspectRatio: o.aspectRatio,
                originalElement: this.element,
                _proportionallyResizeElements: [],
                _helper: o.helper || o.ghost || o.animate ? o.helper || "ui-resizable-helper" : null
            }),
            this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i) && (this.element.wrap(e("<div class='ui-wrapper' style='overflow: hidden;'></div>").css({
                position: this.element.css("position"),
                width: this.element.outerWidth(),
                height: this.element.outerHeight(),
                top: this.element.css("top"),
                left: this.element.css("left")
            })),
            this.element = this.element.parent().data("ui-resizable", this.element.data("ui-resizable")),
            this.elementIsWrapper = !0,
            this.element.css({
                marginLeft: this.originalElement.css("marginLeft"),
                marginTop: this.originalElement.css("marginTop"),
                marginRight: this.originalElement.css("marginRight"),
                marginBottom: this.originalElement.css("marginBottom")
            }),
            this.originalElement.css({
                marginLeft: 0,
                marginTop: 0,
                marginRight: 0,
                marginBottom: 0
            }),
            this.originalResizeStyle = this.originalElement.css("resize"),
            this.originalElement.css("resize", "none"),
            this._proportionallyResizeElements.push(this.originalElement.css({
                position: "static",
                zoom: 1,
                display: "block"
            })),
            this.originalElement.css({
                margin: this.originalElement.css("margin")
            }),
            this._proportionallyResize()),
            this.handles = o.handles || (e(".ui-resizable-handle", this.element).length ? {
                n: ".ui-resizable-n",
                e: ".ui-resizable-e",
                s: ".ui-resizable-s",
                w: ".ui-resizable-w",
                se: ".ui-resizable-se",
                sw: ".ui-resizable-sw",
                ne: ".ui-resizable-ne",
                nw: ".ui-resizable-nw"
            } : "e,s,se"),
            this.handles.constructor === String)
                for ("all" === this.handles && (this.handles = "n,e,s,w,se,sw,ne,nw"),
                t = this.handles.split(","),
                this.handles = {},
                i = 0; t.length > i; i++)
                    s = e.trim(t[i]),
                    n = "ui-resizable-" + s,
                    a = e("<div class='ui-resizable-handle " + n + "'></div>"),
                    a.css({
                        zIndex: o.zIndex
                    }),
                    "se" === s && a.addClass("ui-icon ui-icon-gripsmall-diagonal-se"),
                    this.handles[s] = ".ui-resizable-" + s,
                    this.element.append(a);
            this._renderAxis = function(t) {
                var i, s, a, n;
                t = t || this.element;
                for (i in this.handles)
                    this.handles[i].constructor === String && (this.handles[i] = e(this.handles[i], this.element).show()),
                    this.elementIsWrapper && this.originalElement[0].nodeName.match(/textarea|input|select|button/i) && (s = e(this.handles[i], this.element),
                    n = /sw|ne|nw|se|n|s/.test(i) ? s.outerHeight() : s.outerWidth(),
                    a = ["padding", /ne|nw|n/.test(i) ? "Top" : /se|sw|s/.test(i) ? "Bottom" : /^e$/.test(i) ? "Right" : "Left"].join(""),
                    t.css(a, n),
                    this._proportionallyResize()),
                    e(this.handles[i]).length
            }
            ,
            this._renderAxis(this.element),
            this._handles = e(".ui-resizable-handle", this.element).disableSelection(),
            this._handles.mouseover(function() {
                r.resizing || (this.className && (a = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)),
                r.axis = a && a[1] ? a[1] : "se")
            }),
            o.autoHide && (this._handles.hide(),
            e(this.element).addClass("ui-resizable-autohide").mouseenter(function() {
                o.disabled || (e(this).removeClass("ui-resizable-autohide"),
                r._handles.show())
            }).mouseleave(function() {
                o.disabled || r.resizing || (e(this).addClass("ui-resizable-autohide"),
                r._handles.hide())
            })),
            this._mouseInit()
        },
        _destroy: function() {
            this._mouseDestroy();
            var t, i = function(t) {
                e(t).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").removeData("ui-resizable").unbind(".resizable").find(".ui-resizable-handle").remove()
            };
            return this.elementIsWrapper && (i(this.element),
            t = this.element,
            this.originalElement.css({
                position: t.css("position"),
                width: t.outerWidth(),
                height: t.outerHeight(),
                top: t.css("top"),
                left: t.css("left")
            }).insertAfter(t),
            t.remove()),
            this.originalElement.css("resize", this.originalResizeStyle),
            i(this.originalElement),
            this
        },
        _mouseCapture: function(t) {
            var i, s, a = !1;
            for (i in this.handles)
                s = e(this.handles[i])[0],
                (s === t.target || e.contains(s, t.target)) && (a = !0);
            return !this.options.disabled && a
        },
        _mouseStart: function(i) {
            var s, a, n, r = this.options, o = this.element.position(), h = this.element;
            return this.resizing = !0,
            /absolute/.test(h.css("position")) ? h.css({
                position: "absolute",
                top: h.css("top"),
                left: h.css("left")
            }) : h.is(".ui-draggable") && h.css({
                position: "absolute",
                top: o.top,
                left: o.left
            }),
            this._renderProxy(),
            s = t(this.helper.css("left")),
            a = t(this.helper.css("top")),
            r.containment && (s += e(r.containment).scrollLeft() || 0,
            a += e(r.containment).scrollTop() || 0),
            this.offset = this.helper.offset(),
            this.position = {
                left: s,
                top: a
            },
            this.size = this._helper ? {
                width: this.helper.width(),
                height: this.helper.height()
            } : {
                width: h.width(),
                height: h.height()
            },
            this.originalSize = this._helper ? {
                width: h.outerWidth(),
                height: h.outerHeight()
            } : {
                width: h.width(),
                height: h.height()
            },
            this.originalPosition = {
                left: s,
                top: a
            },
            this.sizeDiff = {
                width: h.outerWidth() - h.width(),
                height: h.outerHeight() - h.height()
            },
            this.originalMousePosition = {
                left: i.pageX,
                top: i.pageY
            },
            this.aspectRatio = "number" == typeof r.aspectRatio ? r.aspectRatio : this.originalSize.width / this.originalSize.height || 1,
            n = e(".ui-resizable-" + this.axis).css("cursor"),
            e("body").css("cursor", "auto" === n ? this.axis + "-resize" : n),
            h.addClass("ui-resizable-resizing"),
            this._propagate("start", i),
            !0
        },
        _mouseDrag: function(t) {
            var i, s = this.helper, a = {}, n = this.originalMousePosition, r = this.axis, o = this.position.top, h = this.position.left, l = this.size.width, u = this.size.height, d = t.pageX - n.left || 0, c = t.pageY - n.top || 0, p = this._change[r];
            return p ? (i = p.apply(this, [t, d, c]),
            this._updateVirtualBoundaries(t.shiftKey),
            (this._aspectRatio || t.shiftKey) && (i = this._updateRatio(i, t)),
            i = this._respectSize(i, t),
            this._updateCache(i),
            this._propagate("resize", t),
            this.position.top !== o && (a.top = this.position.top + "px"),
            this.position.left !== h && (a.left = this.position.left + "px"),
            this.size.width !== l && (a.width = this.size.width + "px"),
            this.size.height !== u && (a.height = this.size.height + "px"),
            s.css(a),
            !this._helper && this._proportionallyResizeElements.length && this._proportionallyResize(),
            e.isEmptyObject(a) || this._trigger("resize", t, this.ui()),
            !1) : !1
        },
        _mouseStop: function(t) {
            this.resizing = !1;
            var i, s, a, n, r, o, h, l = this.options, u = this;
            return this._helper && (i = this._proportionallyResizeElements,
            s = i.length && /textarea/i.test(i[0].nodeName),
            a = s && e.ui.hasScroll(i[0], "left") ? 0 : u.sizeDiff.height,
            n = s ? 0 : u.sizeDiff.width,
            r = {
                width: u.helper.width() - n,
                height: u.helper.height() - a
            },
            o = parseInt(u.element.css("left"), 10) + (u.position.left - u.originalPosition.left) || null,
            h = parseInt(u.element.css("top"), 10) + (u.position.top - u.originalPosition.top) || null,
            l.animate || this.element.css(e.extend(r, {
                top: h,
                left: o
            })),
            u.helper.height(u.size.height),
            u.helper.width(u.size.width),
            this._helper && !l.animate && this._proportionallyResize()),
            e("body").css("cursor", "auto"),
            this.element.removeClass("ui-resizable-resizing"),
            this._propagate("stop", t),
            this._helper && this.helper.remove(),
            !1
        },
        _updateVirtualBoundaries: function(e) {
            var t, s, a, n, r, o = this.options;
            r = {
                minWidth: i(o.minWidth) ? o.minWidth : 0,
                maxWidth: i(o.maxWidth) ? o.maxWidth : 1 / 0,
                minHeight: i(o.minHeight) ? o.minHeight : 0,
                maxHeight: i(o.maxHeight) ? o.maxHeight : 1 / 0
            },
            (this._aspectRatio || e) && (t = r.minHeight * this.aspectRatio,
            a = r.minWidth / this.aspectRatio,
            s = r.maxHeight * this.aspectRatio,
            n = r.maxWidth / this.aspectRatio,
            t > r.minWidth && (r.minWidth = t),
            a > r.minHeight && (r.minHeight = a),
            r.maxWidth > s && (r.maxWidth = s),
            r.maxHeight > n && (r.maxHeight = n)),
            this._vBoundaries = r
        },
        _updateCache: function(e) {
            this.offset = this.helper.offset(),
            i(e.left) && (this.position.left = e.left),
            i(e.top) && (this.position.top = e.top),
            i(e.height) && (this.size.height = e.height),
            i(e.width) && (this.size.width = e.width)
        },
        _updateRatio: function(e) {
            var t = this.position
              , s = this.size
              , a = this.axis;
            return i(e.height) ? e.width = e.height * this.aspectRatio : i(e.width) && (e.height = e.width / this.aspectRatio),
            "sw" === a && (e.left = t.left + (s.width - e.width),
            e.top = null),
            "nw" === a && (e.top = t.top + (s.height - e.height),
            e.left = t.left + (s.width - e.width)),
            e
        },
        _respectSize: function(e) {
            var t = this._vBoundaries
              , s = this.axis
              , a = i(e.width) && t.maxWidth && t.maxWidth < e.width
              , n = i(e.height) && t.maxHeight && t.maxHeight < e.height
              , r = i(e.width) && t.minWidth && t.minWidth > e.width
              , o = i(e.height) && t.minHeight && t.minHeight > e.height
              , h = this.originalPosition.left + this.originalSize.width
              , l = this.position.top + this.size.height
              , u = /sw|nw|w/.test(s)
              , d = /nw|ne|n/.test(s);
            return r && (e.width = t.minWidth),
            o && (e.height = t.minHeight),
            a && (e.width = t.maxWidth),
            n && (e.height = t.maxHeight),
            r && u && (e.left = h - t.minWidth),
            a && u && (e.left = h - t.maxWidth),
            o && d && (e.top = l - t.minHeight),
            n && d && (e.top = l - t.maxHeight),
            e.width || e.height || e.left || !e.top ? e.width || e.height || e.top || !e.left || (e.left = null) : e.top = null,
            e
        },
        _proportionallyResize: function() {
            if (this._proportionallyResizeElements.length) {
                var e, t, i, s, a, n = this.helper || this.element;
                for (e = 0; this._proportionallyResizeElements.length > e; e++) {
                    if (a = this._proportionallyResizeElements[e],
                    !this.borderDif)
                        for (this.borderDif = [],
                        i = [a.css("borderTopWidth"), a.css("borderRightWidth"), a.css("borderBottomWidth"), a.css("borderLeftWidth")],
                        s = [a.css("paddingTop"), a.css("paddingRight"), a.css("paddingBottom"), a.css("paddingLeft")],
                        t = 0; i.length > t; t++)
                            this.borderDif[t] = (parseInt(i[t], 10) || 0) + (parseInt(s[t], 10) || 0);
                    a.css({
                        height: n.height() - this.borderDif[0] - this.borderDif[2] || 0,
                        width: n.width() - this.borderDif[1] - this.borderDif[3] || 0
                    })
                }
            }
        },
        _renderProxy: function() {
            var t = this.element
              , i = this.options;
            this.elementOffset = t.offset(),
            this._helper ? (this.helper = this.helper || e("<div style='overflow:hidden;'></div>"),
            this.helper.addClass(this._helper).css({
                width: this.element.outerWidth() - 1,
                height: this.element.outerHeight() - 1,
                position: "absolute",
                left: this.elementOffset.left + "px",
                top: this.elementOffset.top + "px",
                zIndex: ++i.zIndex
            }),
            this.helper.appendTo("body").disableSelection()) : this.helper = this.element
        },
        _change: {
            e: function(e, t) {
                return {
                    width: this.originalSize.width + t
                }
            },
            w: function(e, t) {
                var i = this.originalSize
                  , s = this.originalPosition;
                return {
                    left: s.left + t,
                    width: i.width - t
                }
            },
            n: function(e, t, i) {
                var s = this.originalSize
                  , a = this.originalPosition;
                return {
                    top: a.top + i,
                    height: s.height - i
                }
            },
            s: function(e, t, i) {
                return {
                    height: this.originalSize.height + i
                }
            },
            se: function(t, i, s) {
                return e.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [t, i, s]))
            },
            sw: function(t, i, s) {
                return e.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [t, i, s]))
            },
            ne: function(t, i, s) {
                return e.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [t, i, s]))
            },
            nw: function(t, i, s) {
                return e.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [t, i, s]))
            }
        },
        _propagate: function(t, i) {
            e.ui.plugin.call(this, t, [i, this.ui()]),
            "resize" !== t && this._trigger(t, i, this.ui())
        },
        plugins: {},
        ui: function() {
            return {
                originalElement: this.originalElement,
                element: this.element,
                helper: this.helper,
                position: this.position,
                size: this.size,
                originalSize: this.originalSize,
                originalPosition: this.originalPosition
            }
        }
    }),
    e.ui.plugin.add("resizable", "animate", {
        stop: function(t) {
            var i = e(this).data("ui-resizable")
              , s = i.options
              , a = i._proportionallyResizeElements
              , n = a.length && /textarea/i.test(a[0].nodeName)
              , r = n && e.ui.hasScroll(a[0], "left") ? 0 : i.sizeDiff.height
              , o = n ? 0 : i.sizeDiff.width
              , h = {
                width: i.size.width - o,
                height: i.size.height - r
            }
              , l = parseInt(i.element.css("left"), 10) + (i.position.left - i.originalPosition.left) || null
              , u = parseInt(i.element.css("top"), 10) + (i.position.top - i.originalPosition.top) || null;
            i.element.animate(e.extend(h, u && l ? {
                top: u,
                left: l
            } : {}), {
                duration: s.animateDuration,
                easing: s.animateEasing,
                step: function() {
                    var s = {
                        width: parseInt(i.element.css("width"), 10),
                        height: parseInt(i.element.css("height"), 10),
                        top: parseInt(i.element.css("top"), 10),
                        left: parseInt(i.element.css("left"), 10)
                    };
                    a && a.length && e(a[0]).css({
                        width: s.width,
                        height: s.height
                    }),
                    i._updateCache(s),
                    i._propagate("resize", t)
                }
            })
        }
    }),
    e.ui.plugin.add("resizable", "containment", {
        start: function() {
            var i, s, a, n, r, o, h, l = e(this).data("ui-resizable"), u = l.options, d = l.element, c = u.containment, p = c instanceof e ? c.get(0) : /parent/.test(c) ? d.parent().get(0) : c;
            p && (l.containerElement = e(p),
            /document/.test(c) || c === document ? (l.containerOffset = {
                left: 0,
                top: 0
            },
            l.containerPosition = {
                left: 0,
                top: 0
            },
            l.parentData = {
                element: e(document),
                left: 0,
                top: 0,
                width: e(document).width(),
                height: e(document).height() || document.body.parentNode.scrollHeight
            }) : (i = e(p),
            s = [],
            e(["Top", "Right", "Left", "Bottom"]).each(function(e, a) {
                s[e] = t(i.css("padding" + a))
            }),
            l.containerOffset = i.offset(),
            l.containerPosition = i.position(),
            l.containerSize = {
                height: i.innerHeight() - s[3],
                width: i.innerWidth() - s[1]
            },
            a = l.containerOffset,
            n = l.containerSize.height,
            r = l.containerSize.width,
            o = e.ui.hasScroll(p, "left") ? p.scrollWidth : r,
            h = e.ui.hasScroll(p) ? p.scrollHeight : n,
            l.parentData = {
                element: p,
                left: a.left,
                top: a.top,
                width: o,
                height: h
            }))
        },
        resize: function(t) {
            var i, s, a, n, r = e(this).data("ui-resizable"), o = r.options, h = r.containerOffset, l = r.position, u = r._aspectRatio || t.shiftKey, d = {
                top: 0,
                left: 0
            }, c = r.containerElement;
            c[0] !== document && /static/.test(c.css("position")) && (d = h),
            l.left < (r._helper ? h.left : 0) && (r.size.width = r.size.width + (r._helper ? r.position.left - h.left : r.position.left - d.left),
            u && (r.size.height = r.size.width / r.aspectRatio),
            r.position.left = o.helper ? h.left : 0),
            l.top < (r._helper ? h.top : 0) && (r.size.height = r.size.height + (r._helper ? r.position.top - h.top : r.position.top),
            u && (r.size.width = r.size.height * r.aspectRatio),
            r.position.top = r._helper ? h.top : 0),
            r.offset.left = r.parentData.left + r.position.left,
            r.offset.top = r.parentData.top + r.position.top,
            i = Math.abs((r._helper ? r.offset.left - d.left : r.offset.left - d.left) + r.sizeDiff.width),
            s = Math.abs((r._helper ? r.offset.top - d.top : r.offset.top - h.top) + r.sizeDiff.height),
            a = r.containerElement.get(0) === r.element.parent().get(0),
            n = /relative|absolute/.test(r.containerElement.css("position")),
            a && n && (i -= Math.abs(r.parentData.left)),
            i + r.size.width >= r.parentData.width && (r.size.width = r.parentData.width - i,
            u && (r.size.height = r.size.width / r.aspectRatio)),
            s + r.size.height >= r.parentData.height && (r.size.height = r.parentData.height - s,
            u && (r.size.width = r.size.height * r.aspectRatio))
        },
        stop: function() {
            var t = e(this).data("ui-resizable")
              , i = t.options
              , s = t.containerOffset
              , a = t.containerPosition
              , n = t.containerElement
              , r = e(t.helper)
              , o = r.offset()
              , h = r.outerWidth() - t.sizeDiff.width
              , l = r.outerHeight() - t.sizeDiff.height;
            t._helper && !i.animate && /relative/.test(n.css("position")) && e(this).css({
                left: o.left - a.left - s.left,
                width: h,
                height: l
            }),
            t._helper && !i.animate && /static/.test(n.css("position")) && e(this).css({
                left: o.left - a.left - s.left,
                width: h,
                height: l
            })
        }
    }),
    e.ui.plugin.add("resizable", "alsoResize", {
        start: function() {
            var t = e(this).data("ui-resizable")
              , i = t.options
              , s = function(t) {
                e(t).each(function() {
                    var t = e(this);
                    t.data("ui-resizable-alsoresize", {
                        width: parseInt(t.width(), 10),
                        height: parseInt(t.height(), 10),
                        left: parseInt(t.css("left"), 10),
                        top: parseInt(t.css("top"), 10)
                    })
                })
            };
            "object" != typeof i.alsoResize || i.alsoResize.parentNode ? s(i.alsoResize) : i.alsoResize.length ? (i.alsoResize = i.alsoResize[0],
            s(i.alsoResize)) : e.each(i.alsoResize, function(e) {
                s(e)
            })
        },
        resize: function(t, i) {
            var s = e(this).data("ui-resizable")
              , a = s.options
              , n = s.originalSize
              , r = s.originalPosition
              , o = {
                height: s.size.height - n.height || 0,
                width: s.size.width - n.width || 0,
                top: s.position.top - r.top || 0,
                left: s.position.left - r.left || 0
            }
              , h = function(t, s) {
                e(t).each(function() {
                    var t = e(this)
                      , a = e(this).data("ui-resizable-alsoresize")
                      , n = {}
                      , r = s && s.length ? s : t.parents(i.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];
                    e.each(r, function(e, t) {
                        var i = (a[t] || 0) + (o[t] || 0);
                        i && i >= 0 && (n[t] = i || null)
                    }),
                    t.css(n)
                })
            };
            "object" != typeof a.alsoResize || a.alsoResize.nodeType ? h(a.alsoResize) : e.each(a.alsoResize, function(e, t) {
                h(e, t)
            })
        },
        stop: function() {
            e(this).removeData("resizable-alsoresize")
        }
    }),
    e.ui.plugin.add("resizable", "ghost", {
        start: function() {
            var t = e(this).data("ui-resizable")
              , i = t.options
              , s = t.size;
            t.ghost = t.originalElement.clone(),
            t.ghost.css({
                opacity: .25,
                display: "block",
                position: "relative",
                height: s.height,
                width: s.width,
                margin: 0,
                left: 0,
                top: 0
            }).addClass("ui-resizable-ghost").addClass("string" == typeof i.ghost ? i.ghost : ""),
            t.ghost.appendTo(t.helper)
        },
        resize: function() {
            var t = e(this).data("ui-resizable");
            t.ghost && t.ghost.css({
                position: "relative",
                height: t.size.height,
                width: t.size.width
            })
        },
        stop: function() {
            var t = e(this).data("ui-resizable");
            t.ghost && t.helper && t.helper.get(0).removeChild(t.ghost.get(0))
        }
    }),
    e.ui.plugin.add("resizable", "grid", {
        resize: function() {
            var t = e(this).data("ui-resizable")
              , i = t.options
              , s = t.size
              , a = t.originalSize
              , n = t.originalPosition
              , r = t.axis
              , o = "number" == typeof i.grid ? [i.grid, i.grid] : i.grid
              , h = o[0] || 1
              , l = o[1] || 1
              , u = Math.round((s.width - a.width) / h) * h
              , d = Math.round((s.height - a.height) / l) * l
              , c = a.width + u
              , p = a.height + d
              , f = i.maxWidth && c > i.maxWidth
              , m = i.maxHeight && p > i.maxHeight
              , g = i.minWidth && i.minWidth > c
              , v = i.minHeight && i.minHeight > p;
            i.grid = o,
            g && (c += h),
            v && (p += l),
            f && (c -= h),
            m && (p -= l),
            /^(se|s|e)$/.test(r) ? (t.size.width = c,
            t.size.height = p) : /^(ne)$/.test(r) ? (t.size.width = c,
            t.size.height = p,
            t.position.top = n.top - d) : /^(sw)$/.test(r) ? (t.size.width = c,
            t.size.height = p,
            t.position.left = n.left - u) : (p - l > 0 ? (t.size.height = p,
            t.position.top = n.top - d) : (t.size.height = l,
            t.position.top = n.top + a.height - l),
            c - h > 0 ? (t.size.width = c,
            t.position.left = n.left - u) : (t.size.width = h,
            t.position.left = n.left + a.width - h))
        }
    })
}
)(jQuery);
(function(e) {
    var t, i = "ui-button ui-widget ui-state-default ui-corner-all", s = "ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only", a = function() {
        var t = e(this);
        setTimeout(function() {
            t.find(":ui-button").button("refresh")
        }, 1)
    }, n = function(t) {
        var i = t.name
          , s = t.form
          , a = e([]);
        return i && (i = i.replace(/'/g, "\\'"),
        a = s ? e(s).find("[name='" + i + "']") : e("[name='" + i + "']", t.ownerDocument).filter(function() {
            return !this.form
        })),
        a
    };
    e.widget("ui.button", {
        version: "1.10.4",
        defaultElement: "<button>",
        options: {
            disabled: null,
            text: !0,
            label: null,
            icons: {
                primary: null,
                secondary: null
            }
        },
        _create: function() {
            this.element.closest("form").unbind("reset" + this.eventNamespace).bind("reset" + this.eventNamespace, a),
            "boolean" != typeof this.options.disabled ? this.options.disabled = !!this.element.prop("disabled") : this.element.prop("disabled", this.options.disabled),
            this._determineButtonType(),
            this.hasTitle = !!this.buttonElement.attr("title");
            var s = this
              , r = this.options
              , o = "checkbox" === this.type || "radio" === this.type
              , h = o ? "" : "ui-state-active";
            null === r.label && (r.label = "input" === this.type ? this.buttonElement.val() : this.buttonElement.html()),
            this._hoverable(this.buttonElement),
            this.buttonElement.addClass(i).attr("role", "button").bind("mouseenter" + this.eventNamespace, function() {
                r.disabled || this === t && e(this).addClass("ui-state-active")
            }).bind("mouseleave" + this.eventNamespace, function() {
                r.disabled || e(this).removeClass(h)
            }).bind("click" + this.eventNamespace, function(e) {
                r.disabled && (e.preventDefault(),
                e.stopImmediatePropagation())
            }),
            this._on({
                focus: function() {
                    this.buttonElement.addClass("ui-state-focus")
                },
                blur: function() {
                    this.buttonElement.removeClass("ui-state-focus")
                }
            }),
            o && this.element.bind("change" + this.eventNamespace, function() {
                s.refresh()
            }),
            "checkbox" === this.type ? this.buttonElement.bind("click" + this.eventNamespace, function() {
                return r.disabled ? !1 : undefined
            }) : "radio" === this.type ? this.buttonElement.bind("click" + this.eventNamespace, function() {
                if (r.disabled)
                    return !1;
                e(this).addClass("ui-state-active"),
                s.buttonElement.attr("aria-pressed", "true");
                var t = s.element[0];
                n(t).not(t).map(function() {
                    return e(this).button("widget")[0]
                }).removeClass("ui-state-active").attr("aria-pressed", "false")
            }) : (this.buttonElement.bind("mousedown" + this.eventNamespace, function() {
                return r.disabled ? !1 : (e(this).addClass("ui-state-active"),
                t = this,
                s.document.one("mouseup", function() {
                    t = null
                }),
                undefined)
            }).bind("mouseup" + this.eventNamespace, function() {
                return r.disabled ? !1 : (e(this).removeClass("ui-state-active"),
                undefined)
            }).bind("keydown" + this.eventNamespace, function(t) {
                return r.disabled ? !1 : ((t.keyCode === e.ui.keyCode.SPACE || t.keyCode === e.ui.keyCode.ENTER) && e(this).addClass("ui-state-active"),
                undefined)
            }).bind("keyup" + this.eventNamespace + " blur" + this.eventNamespace, function() {
                e(this).removeClass("ui-state-active")
            }),
            this.buttonElement.is("a") && this.buttonElement.keyup(function(t) {
                t.keyCode === e.ui.keyCode.SPACE && e(this).click()
            })),
            this._setOption("disabled", r.disabled),
            this._resetButton()
        },
        _determineButtonType: function() {
            var e, t, i;
            this.type = this.element.is("[type=checkbox]") ? "checkbox" : this.element.is("[type=radio]") ? "radio" : this.element.is("input") ? "input" : "button",
            "checkbox" === this.type || "radio" === this.type ? (e = this.element.parents().last(),
            t = "label[for='" + this.element.attr("id") + "']",
            this.buttonElement = e.find(t),
            this.buttonElement.length || (e = e.length ? e.siblings() : this.element.siblings(),
            this.buttonElement = e.filter(t),
            this.buttonElement.length || (this.buttonElement = e.find(t))),
            this.element.addClass("ui-helper-hidden-accessible"),
            i = this.element.is(":checked"),
            i && this.buttonElement.addClass("ui-state-active"),
            this.buttonElement.prop("aria-pressed", i)) : this.buttonElement = this.element
        },
        widget: function() {
            return this.buttonElement
        },
        _destroy: function() {
            this.element.removeClass("ui-helper-hidden-accessible"),
            this.buttonElement.removeClass(i + " ui-state-active " + s).removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html()),
            this.hasTitle || this.buttonElement.removeAttr("title")
        },
        _setOption: function(e, t) {
            return this._super(e, t),
            "disabled" === e ? (this.element.prop("disabled", !!t),
            t && this.buttonElement.removeClass("ui-state-focus"),
            undefined) : (this._resetButton(),
            undefined)
        },
        refresh: function() {
            var t = this.element.is("input, button") ? this.element.is(":disabled") : this.element.hasClass("ui-button-disabled");
            t !== this.options.disabled && this._setOption("disabled", t),
            "radio" === this.type ? n(this.element[0]).each(function() {
                e(this).is(":checked") ? e(this).button("widget").addClass("ui-state-active").attr("aria-pressed", "true") : e(this).button("widget").removeClass("ui-state-active").attr("aria-pressed", "false")
            }) : "checkbox" === this.type && (this.element.is(":checked") ? this.buttonElement.addClass("ui-state-active").attr("aria-pressed", "true") : this.buttonElement.removeClass("ui-state-active").attr("aria-pressed", "false"))
        },
        _resetButton: function() {
            if ("input" === this.type)
                return this.options.label && this.element.val(this.options.label),
                undefined;
            var t = this.buttonElement.removeClass(s)
              , i = e("<span></span>", this.document[0]).addClass("ui-button-text").html(this.options.label).appendTo(t.empty()).text()
              , a = this.options.icons
              , n = a.primary && a.secondary
              , r = [];
            a.primary || a.secondary ? (this.options.text && r.push("ui-button-text-icon" + (n ? "s" : a.primary ? "-primary" : "-secondary")),
            a.primary && t.prepend("<span class='ui-button-icon-primary ui-icon " + a.primary + "'></span>"),
            a.secondary && t.append("<span class='ui-button-icon-secondary ui-icon " + a.secondary + "'></span>"),
            this.options.text || (r.push(n ? "ui-button-icons-only" : "ui-button-icon-only"),
            this.hasTitle || t.attr("title", e.trim(i)))) : r.push("ui-button-text-only"),
            t.addClass(r.join(" "))
        }
    }),
    e.widget("ui.buttonset", {
        version: "1.10.4",
        options: {
            items: "button, input[type=button], input[type=submit], input[type=reset], input[type=checkbox], input[type=radio], a, :data(ui-button)"
        },
        _create: function() {
            this.element.addClass("ui-buttonset")
        },
        _init: function() {
            this.refresh()
        },
        _setOption: function(e, t) {
            "disabled" === e && this.buttons.button("option", e, t),
            this._super(e, t)
        },
        refresh: function() {
            var t = "rtl" === this.element.css("direction");
            this.buttons = this.element.find(this.options.items).filter(":ui-button").button("refresh").end().not(":ui-button").button().end().map(function() {
                return e(this).button("widget")[0]
            }).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass(t ? "ui-corner-right" : "ui-corner-left").end().filter(":last").addClass(t ? "ui-corner-left" : "ui-corner-right").end().end()
        },
        _destroy: function() {
            this.element.removeClass("ui-buttonset"),
            this.buttons.map(function() {
                return e(this).button("widget")[0]
            }).removeClass("ui-corner-left ui-corner-right").end().button("destroy")
        }
    })
}
)(jQuery);
(function(e, t) {
    function i() {
        this._curInst = null,
        this._keyEvent = !1,
        this._disabledInputs = [],
        this._datepickerShowing = !1,
        this._inDialog = !1,
        this._mainDivId = "ui-datepicker-div",
        this._inlineClass = "ui-datepicker-inline",
        this._appendClass = "ui-datepicker-append",
        this._triggerClass = "ui-datepicker-trigger",
        this._dialogClass = "ui-datepicker-dialog",
        this._disableClass = "ui-datepicker-disabled",
        this._unselectableClass = "ui-datepicker-unselectable",
        this._currentClass = "ui-datepicker-current-day",
        this._dayOverClass = "ui-datepicker-days-cell-over",
        this.regional = [],
        this.regional[""] = {
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
        },
        this._defaults = {
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
        },
        e.extend(this._defaults, this.regional[""]),
        this.dpDiv = s(e("<div id='" + this._mainDivId + "' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"))
    }
    function s(t) {
        var i = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
        return t.delegate(i, "mouseout", function() {
            e(this).removeClass("ui-state-hover"),
            -1 !== this.className.indexOf("ui-datepicker-prev") && e(this).removeClass("ui-datepicker-prev-hover"),
            -1 !== this.className.indexOf("ui-datepicker-next") && e(this).removeClass("ui-datepicker-next-hover")
        }).delegate(i, "mouseover", function() {
            e.datepicker._isDisabledDatepicker(n.inline ? t.parent()[0] : n.input[0]) || (e(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"),
            e(this).addClass("ui-state-hover"),
            -1 !== this.className.indexOf("ui-datepicker-prev") && e(this).addClass("ui-datepicker-prev-hover"),
            -1 !== this.className.indexOf("ui-datepicker-next") && e(this).addClass("ui-datepicker-next-hover"))
        })
    }
    function a(t, i) {
        e.extend(t, i);
        for (var s in i)
            null == i[s] && (t[s] = i[s]);
        return t
    }
    e.extend(e.ui, {
        datepicker: {
            version: "1.10.4"
        }
    });
    var n, r = "datepicker";
    e.extend(i.prototype, {
        markerClassName: "hasDatepicker",
        maxRows: 4,
        _widgetDatepicker: function() {
            return this.dpDiv
        },
        setDefaults: function(e) {
            return a(this._defaults, e || {}),
            this
        },
        _attachDatepicker: function(t, i) {
            var s, a, n;
            s = t.nodeName.toLowerCase(),
            a = "div" === s || "span" === s,
            t.id || (this.uuid += 1,
            t.id = "dp" + this.uuid),
            n = this._newInst(e(t), a),
            n.settings = e.extend({}, i || {}),
            "input" === s ? this._connectDatepicker(t, n) : a && this._inlineDatepicker(t, n)
        },
        _newInst: function(t, i) {
            var a = t[0].id.replace(/([^A-Za-z0-9_\-])/g, "\\\\$1");
            return {
                id: a,
                input: t,
                selectedDay: 0,
                selectedMonth: 0,
                selectedYear: 0,
                drawMonth: 0,
                drawYear: 0,
                inline: i,
                dpDiv: i ? s(e("<div class='" + this._inlineClass + " ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")) : this.dpDiv
            }
        },
        _connectDatepicker: function(t, i) {
            var s = e(t);
            i.append = e([]),
            i.trigger = e([]),
            s.hasClass(this.markerClassName) || (this._attachments(s, i),
            s.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp),
            this._autoSize(i),
            e.data(t, r, i),
            i.settings.disabled && this._disableDatepicker(t))
        },
        _attachments: function(t, i) {
            var s, a, n, r = this._get(i, "appendText"), o = this._get(i, "isRTL");
            i.append && i.append.remove(),
            r && (i.append = e("<span class='" + this._appendClass + "'>" + r + "</span>"),
            t[o ? "before" : "after"](i.append)),
            t.unbind("focus", this._showDatepicker),
            i.trigger && i.trigger.remove(),
            s = this._get(i, "showOn"),
            ("focus" === s || "both" === s) && t.focus(this._showDatepicker),
            ("button" === s || "both" === s) && (a = this._get(i, "buttonText"),
            n = this._get(i, "buttonImage"),
            i.trigger = e(this._get(i, "buttonImageOnly") ? e("<img/>").addClass(this._triggerClass).attr({
                src: n,
                alt: a,
                title: a
            }) : e("<button type='button'></button>").addClass(this._triggerClass).html(n ? e("<img/>").attr({
                src: n,
                alt: a,
                title: a
            }) : a)),
            t[o ? "before" : "after"](i.trigger),
            i.trigger.click(function() {
                return e.datepicker._datepickerShowing && e.datepicker._lastInput === t[0] ? e.datepicker._hideDatepicker() : e.datepicker._datepickerShowing && e.datepicker._lastInput !== t[0] ? (e.datepicker._hideDatepicker(),
                e.datepicker._showDatepicker(t[0])) : e.datepicker._showDatepicker(t[0]),
                !1
            }))
        },
        _autoSize: function(e) {
            if (this._get(e, "autoSize") && !e.inline) {
                var t, i, s, a, n = new Date(2009,11,20), r = this._get(e, "dateFormat");
                r.match(/[DM]/) && (t = function(e) {
                    for (i = 0,
                    s = 0,
                    a = 0; e.length > a; a++)
                        e[a].length > i && (i = e[a].length,
                        s = a);
                    return s
                }
                ,
                n.setMonth(t(this._get(e, r.match(/MM/) ? "monthNames" : "monthNamesShort"))),
                n.setDate(t(this._get(e, r.match(/DD/) ? "dayNames" : "dayNamesShort")) + 20 - n.getDay())),
                e.input.attr("size", this._formatDate(e, n).length)
            }
        },
        _inlineDatepicker: function(t, i) {
            var s = e(t);
            s.hasClass(this.markerClassName) || (s.addClass(this.markerClassName).append(i.dpDiv),
            e.data(t, r, i),
            this._setDate(i, this._getDefaultDate(i), !0),
            this._updateDatepicker(i),
            this._updateAlternate(i),
            i.settings.disabled && this._disableDatepicker(t),
            i.dpDiv.css("display", "block"))
        },
        _dialogDatepicker: function(t, i, s, n, o) {
            var h, l, u, d, c, p = this._dialogInst;
            return p || (this.uuid += 1,
            h = "dp" + this.uuid,
            this._dialogInput = e("<input type='text' id='" + h + "' style='position: absolute; top: -100px; width: 0px;'/>"),
            this._dialogInput.keydown(this._doKeyDown),
            e("body").append(this._dialogInput),
            p = this._dialogInst = this._newInst(this._dialogInput, !1),
            p.settings = {},
            e.data(this._dialogInput[0], r, p)),
            a(p.settings, n || {}),
            i = i && i.constructor === Date ? this._formatDate(p, i) : i,
            this._dialogInput.val(i),
            this._pos = o ? o.length ? o : [o.pageX, o.pageY] : null,
            this._pos || (l = document.documentElement.clientWidth,
            u = document.documentElement.clientHeight,
            d = document.documentElement.scrollLeft || document.body.scrollLeft,
            c = document.documentElement.scrollTop || document.body.scrollTop,
            this._pos = [l / 2 - 100 + d, u / 2 - 150 + c]),
            this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px"),
            p.settings.onSelect = s,
            this._inDialog = !0,
            this.dpDiv.addClass(this._dialogClass),
            this._showDatepicker(this._dialogInput[0]),
            e.blockUI && e.blockUI(this.dpDiv),
            e.data(this._dialogInput[0], r, p),
            this
        },
        _destroyDatepicker: function(t) {
            var i, s = e(t), a = e.data(t, r);
            s.hasClass(this.markerClassName) && (i = t.nodeName.toLowerCase(),
            e.removeData(t, r),
            "input" === i ? (a.append.remove(),
            a.trigger.remove(),
            s.removeClass(this.markerClassName).unbind("focus", this._showDatepicker).unbind("keydown", this._doKeyDown).unbind("keypress", this._doKeyPress).unbind("keyup", this._doKeyUp)) : ("div" === i || "span" === i) && s.removeClass(this.markerClassName).empty())
        },
        _enableDatepicker: function(t) {
            var i, s, a = e(t), n = e.data(t, r);
            a.hasClass(this.markerClassName) && (i = t.nodeName.toLowerCase(),
            "input" === i ? (t.disabled = !1,
            n.trigger.filter("button").each(function() {
                this.disabled = !1
            }).end().filter("img").css({
                opacity: "1.0",
                cursor: ""
            })) : ("div" === i || "span" === i) && (s = a.children("." + this._inlineClass),
            s.children().removeClass("ui-state-disabled"),
            s.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !1)),
            this._disabledInputs = e.map(this._disabledInputs, function(e) {
                return e === t ? null : e
            }))
        },
        _disableDatepicker: function(t) {
            var i, s, a = e(t), n = e.data(t, r);
            a.hasClass(this.markerClassName) && (i = t.nodeName.toLowerCase(),
            "input" === i ? (t.disabled = !0,
            n.trigger.filter("button").each(function() {
                this.disabled = !0
            }).end().filter("img").css({
                opacity: "0.5",
                cursor: "default"
            })) : ("div" === i || "span" === i) && (s = a.children("." + this._inlineClass),
            s.children().addClass("ui-state-disabled"),
            s.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !0)),
            this._disabledInputs = e.map(this._disabledInputs, function(e) {
                return e === t ? null : e
            }),
            this._disabledInputs[this._disabledInputs.length] = t)
        },
        _isDisabledDatepicker: function(e) {
            if (!e)
                return !1;
            for (var t = 0; this._disabledInputs.length > t; t++)
                if (this._disabledInputs[t] === e)
                    return !0;
            return !1
        },
        _getInst: function(t) {
            try {
                return e.data(t, r)
            } catch (i) {
                throw "Missing instance data for this datepicker"
            }
        },
        _optionDatepicker: function(i, s, n) {
            var r, o, h, l, u = this._getInst(i);
            return 2 === arguments.length && "string" == typeof s ? "defaults" === s ? e.extend({}, e.datepicker._defaults) : u ? "all" === s ? e.extend({}, u.settings) : this._get(u, s) : null : (r = s || {},
            "string" == typeof s && (r = {},
            r[s] = n),
            u && (this._curInst === u && this._hideDatepicker(),
            o = this._getDateDatepicker(i, !0),
            h = this._getMinMaxDate(u, "min"),
            l = this._getMinMaxDate(u, "max"),
            a(u.settings, r),
            null !== h && r.dateFormat !== t && r.minDate === t && (u.settings.minDate = this._formatDate(u, h)),
            null !== l && r.dateFormat !== t && r.maxDate === t && (u.settings.maxDate = this._formatDate(u, l)),
            "disabled"in r && (r.disabled ? this._disableDatepicker(i) : this._enableDatepicker(i)),
            this._attachments(e(i), u),
            this._autoSize(u),
            this._setDate(u, o),
            this._updateAlternate(u),
            this._updateDatepicker(u)),
            t)
        },
        _changeDatepicker: function(e, t, i) {
            this._optionDatepicker(e, t, i)
        },
        _refreshDatepicker: function(e) {
            var t = this._getInst(e);
            t && this._updateDatepicker(t)
        },
        _setDateDatepicker: function(e, t) {
            var i = this._getInst(e);
            i && (this._setDate(i, t),
            this._updateDatepicker(i),
            this._updateAlternate(i))
        },
        _getDateDatepicker: function(e, t) {
            var i = this._getInst(e);
            return i && !i.inline && this._setDateFromField(i, t),
            i ? this._getDate(i) : null
        },
        _doKeyDown: function(t) {
            var i, s, a, n = e.datepicker._getInst(t.target), r = !0, o = n.dpDiv.is(".ui-datepicker-rtl");
            if (n._keyEvent = !0,
            e.datepicker._datepickerShowing)
                switch (t.keyCode) {
                case 9:
                    e.datepicker._hideDatepicker(),
                    r = !1;
                    break;
                case 13:
                    return a = e("td." + e.datepicker._dayOverClass + ":not(." + e.datepicker._currentClass + ")", n.dpDiv),
                    a[0] && e.datepicker._selectDay(t.target, n.selectedMonth, n.selectedYear, a[0]),
                    i = e.datepicker._get(n, "onSelect"),
                    i ? (s = e.datepicker._formatDate(n),
                    i.apply(n.input ? n.input[0] : null, [s, n])) : e.datepicker._hideDatepicker(),
                    !1;
                case 27:
                    e.datepicker._hideDatepicker();
                    break;
                case 33:
                    e.datepicker._adjustDate(t.target, t.ctrlKey ? -e.datepicker._get(n, "stepBigMonths") : -e.datepicker._get(n, "stepMonths"), "M");
                    break;
                case 34:
                    e.datepicker._adjustDate(t.target, t.ctrlKey ? +e.datepicker._get(n, "stepBigMonths") : +e.datepicker._get(n, "stepMonths"), "M");
                    break;
                case 35:
                    (t.ctrlKey || t.metaKey) && e.datepicker._clearDate(t.target),
                    r = t.ctrlKey || t.metaKey;
                    break;
                case 36:
                    (t.ctrlKey || t.metaKey) && e.datepicker._gotoToday(t.target),
                    r = t.ctrlKey || t.metaKey;
                    break;
                case 37:
                    (t.ctrlKey || t.metaKey) && e.datepicker._adjustDate(t.target, o ? 1 : -1, "D"),
                    r = t.ctrlKey || t.metaKey,
                    t.originalEvent.altKey && e.datepicker._adjustDate(t.target, t.ctrlKey ? -e.datepicker._get(n, "stepBigMonths") : -e.datepicker._get(n, "stepMonths"), "M");
                    break;
                case 38:
                    (t.ctrlKey || t.metaKey) && e.datepicker._adjustDate(t.target, -7, "D"),
                    r = t.ctrlKey || t.metaKey;
                    break;
                case 39:
                    (t.ctrlKey || t.metaKey) && e.datepicker._adjustDate(t.target, o ? -1 : 1, "D"),
                    r = t.ctrlKey || t.metaKey,
                    t.originalEvent.altKey && e.datepicker._adjustDate(t.target, t.ctrlKey ? +e.datepicker._get(n, "stepBigMonths") : +e.datepicker._get(n, "stepMonths"), "M");
                    break;
                case 40:
                    (t.ctrlKey || t.metaKey) && e.datepicker._adjustDate(t.target, 7, "D"),
                    r = t.ctrlKey || t.metaKey;
                    break;
                default:
                    r = !1
                }
            else
                36 === t.keyCode && t.ctrlKey ? e.datepicker._showDatepicker(this) : r = !1;
            r && (t.preventDefault(),
            t.stopPropagation())
        },
        _doKeyPress: function(i) {
            var s, a, n = e.datepicker._getInst(i.target);
            return e.datepicker._get(n, "constrainInput") ? (s = e.datepicker._possibleChars(e.datepicker._get(n, "dateFormat")),
            a = String.fromCharCode(null == i.charCode ? i.keyCode : i.charCode),
            i.ctrlKey || i.metaKey || " " > a || !s || s.indexOf(a) > -1) : t
        },
        _doKeyUp: function(t) {
            var i, s = e.datepicker._getInst(t.target);
            if (s.input.val() !== s.lastVal)
                try {
                    i = e.datepicker.parseDate(e.datepicker._get(s, "dateFormat"), s.input ? s.input.val() : null, e.datepicker._getFormatConfig(s)),
                    i && (e.datepicker._setDateFromField(s),
                    e.datepicker._updateAlternate(s),
                    e.datepicker._updateDatepicker(s))
                } catch (a) {}
            return !0
        },
        _showDatepicker: function(t) {
            if (t = t.target || t,
            "input" !== t.nodeName.toLowerCase() && (t = e("input", t.parentNode)[0]),
            !e.datepicker._isDisabledDatepicker(t) && e.datepicker._lastInput !== t) {
                var i, s, n, r, o, h, l;
                i = e.datepicker._getInst(t),
                e.datepicker._curInst && e.datepicker._curInst !== i && (e.datepicker._curInst.dpDiv.stop(!0, !0),
                i && e.datepicker._datepickerShowing && e.datepicker._hideDatepicker(e.datepicker._curInst.input[0])),
                s = e.datepicker._get(i, "beforeShow"),
                n = s ? s.apply(t, [t, i]) : {},
                n !== !1 && (a(i.settings, n),
                i.lastVal = null,
                e.datepicker._lastInput = t,
                e.datepicker._setDateFromField(i),
                e.datepicker._inDialog && (t.value = ""),
                e.datepicker._pos || (e.datepicker._pos = e.datepicker._findPos(t),
                e.datepicker._pos[1] += t.offsetHeight),
                r = !1,
                e(t).parents().each(function() {
                    return r |= "fixed" === e(this).css("position"),
                    !r
                }),
                o = {
                    left: e.datepicker._pos[0],
                    top: e.datepicker._pos[1]
                },
                e.datepicker._pos = null,
                i.dpDiv.empty(),
                i.dpDiv.css({
                    position: "absolute",
                    display: "block",
                    top: "-1000px"
                }),
                e.datepicker._updateDatepicker(i),
                o = e.datepicker._checkOffset(i, o, r),
                i.dpDiv.css({
                    position: e.datepicker._inDialog && e.blockUI ? "static" : r ? "fixed" : "absolute",
                    display: "none",
                    left: o.left + "px",
                    top: o.top + "px"
                }),
                i.inline || (h = e.datepicker._get(i, "showAnim"),
                l = e.datepicker._get(i, "duration"),
                i.dpDiv.zIndex(e(t).zIndex() + 1),
                e.datepicker._datepickerShowing = !0,
                e.effects && e.effects.effect[h] ? i.dpDiv.show(h, e.datepicker._get(i, "showOptions"), l) : i.dpDiv[h || "show"](h ? l : null),
                e.datepicker._shouldFocusInput(i) && i.input.focus(),
                e.datepicker._curInst = i))
            }
        },
        _updateDatepicker: function(t) {
            this.maxRows = 4,
            n = t,
            t.dpDiv.empty().append(this._generateHTML(t)),
            this._attachHandlers(t),
            t.dpDiv.find("." + this._dayOverClass + " a").mouseover();
            var i, s = this._getNumberOfMonths(t), a = s[1], r = 17;
            t.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""),
            a > 1 && t.dpDiv.addClass("ui-datepicker-multi-" + a).css("width", r * a + "em"),
            t.dpDiv[(1 !== s[0] || 1 !== s[1] ? "add" : "remove") + "Class"]("ui-datepicker-multi"),
            t.dpDiv[(this._get(t, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl"),
            t === e.datepicker._curInst && e.datepicker._datepickerShowing && e.datepicker._shouldFocusInput(t) && t.input.focus(),
            t.yearshtml && (i = t.yearshtml,
            setTimeout(function() {
                i === t.yearshtml && t.yearshtml && t.dpDiv.find("select.ui-datepicker-year:first").replaceWith(t.yearshtml),
                i = t.yearshtml = null
            }, 0))
        },
        _shouldFocusInput: function(e) {
            return e.input && e.input.is(":visible") && !e.input.is(":disabled") && !e.input.is(":focus")
        },
        _checkOffset: function(t, i, s) {
            var a = t.dpDiv.outerWidth()
              , n = t.dpDiv.outerHeight()
              , r = t.input ? t.input.outerWidth() : 0
              , o = t.input ? t.input.outerHeight() : 0
              , h = document.documentElement.clientWidth + (s ? 0 : e(document).scrollLeft())
              , l = document.documentElement.clientHeight + (s ? 0 : e(document).scrollTop());
            return i.left -= this._get(t, "isRTL") ? a - r : 0,
            i.left -= s && i.left === t.input.offset().left ? e(document).scrollLeft() : 0,
            i.top -= s && i.top === t.input.offset().top + o ? e(document).scrollTop() : 0,
            i.left -= Math.min(i.left, i.left + a > h && h > a ? Math.abs(i.left + a - h) : 0),
            i.top -= Math.min(i.top, i.top + n > l && l > n ? Math.abs(n + o) : 0),
            i
        },
        _findPos: function(t) {
            for (var i, s = this._getInst(t), a = this._get(s, "isRTL"); t && ("hidden" === t.type || 1 !== t.nodeType || e.expr.filters.hidden(t)); )
                t = t[a ? "previousSibling" : "nextSibling"];
            return i = e(t).offset(),
            [i.left, i.top]
        },
        _hideDatepicker: function(t) {
            var i, s, a, n, o = this._curInst;
            !o || t && o !== e.data(t, r) || this._datepickerShowing && (i = this._get(o, "showAnim"),
            s = this._get(o, "duration"),
            a = function() {
                e.datepicker._tidyDialog(o)
            }
            ,
            e.effects && (e.effects.effect[i] || e.effects[i]) ? o.dpDiv.hide(i, e.datepicker._get(o, "showOptions"), s, a) : o.dpDiv["slideDown" === i ? "slideUp" : "fadeIn" === i ? "fadeOut" : "hide"](i ? s : null, a),
            i || a(),
            this._datepickerShowing = !1,
            n = this._get(o, "onClose"),
            n && n.apply(o.input ? o.input[0] : null, [o.input ? o.input.val() : "", o]),
            this._lastInput = null,
            this._inDialog && (this._dialogInput.css({
                position: "absolute",
                left: "0",
                top: "-100px"
            }),
            e.blockUI && (e.unblockUI(),
            e("body").append(this.dpDiv))),
            this._inDialog = !1)
        },
        _tidyDialog: function(e) {
            e.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")
        },
        _checkExternalClick: function(t) {
            if (e.datepicker._curInst) {
                var i = e(t.target)
                  , s = e.datepicker._getInst(i[0]);
                (i[0].id !== e.datepicker._mainDivId && 0 === i.parents("#" + e.datepicker._mainDivId).length && !i.hasClass(e.datepicker.markerClassName) && !i.closest("." + e.datepicker._triggerClass).length && e.datepicker._datepickerShowing && (!e.datepicker._inDialog || !e.blockUI) || i.hasClass(e.datepicker.markerClassName) && e.datepicker._curInst !== s) && e.datepicker._hideDatepicker()
            }
        },
        _adjustDate: function(t, i, s) {
            var a = e(t)
              , n = this._getInst(a[0]);
            this._isDisabledDatepicker(a[0]) || (this._adjustInstDate(n, i + ("M" === s ? this._get(n, "showCurrentAtPos") : 0), s),
            this._updateDatepicker(n))
        },
        _gotoToday: function(t) {
            var i, s = e(t), a = this._getInst(s[0]);
            this._get(a, "gotoCurrent") && a.currentDay ? (a.selectedDay = a.currentDay,
            a.drawMonth = a.selectedMonth = a.currentMonth,
            a.drawYear = a.selectedYear = a.currentYear) : (i = new Date,
            a.selectedDay = i.getDate(),
            a.drawMonth = a.selectedMonth = i.getMonth(),
            a.drawYear = a.selectedYear = i.getFullYear()),
            this._notifyChange(a),
            this._adjustDate(s)
        },
        _selectMonthYear: function(t, i, s) {
            var a = e(t)
              , n = this._getInst(a[0]);
            n["selected" + ("M" === s ? "Month" : "Year")] = n["draw" + ("M" === s ? "Month" : "Year")] = parseInt(i.options[i.selectedIndex].value, 10),
            this._notifyChange(n),
            this._adjustDate(a)
        },
        _selectDay: function(t, i, s, a) {
            var n, r = e(t);
            e(a).hasClass(this._unselectableClass) || this._isDisabledDatepicker(r[0]) || (n = this._getInst(r[0]),
            n.selectedDay = n.currentDay = e("a", a).html(),
            n.selectedMonth = n.currentMonth = i,
            n.selectedYear = n.currentYear = s,
            this._selectDate(t, this._formatDate(n, n.currentDay, n.currentMonth, n.currentYear)))
        },
        _clearDate: function(t) {
            var i = e(t);
            this._selectDate(i, "")
        },
        _selectDate: function(t, i) {
            var s, a = e(t), n = this._getInst(a[0]);
            i = null != i ? i : this._formatDate(n),
            n.input && n.input.val(i),
            this._updateAlternate(n),
            s = this._get(n, "onSelect"),
            s ? s.apply(n.input ? n.input[0] : null, [i, n]) : n.input && n.input.trigger("change"),
            n.inline ? this._updateDatepicker(n) : (this._hideDatepicker(),
            this._lastInput = n.input[0],
            "object" != typeof n.input[0] && n.input.focus(),
            this._lastInput = null)
        },
        _updateAlternate: function(t) {
            var i, s, a, n = this._get(t, "altField");
            n && (i = this._get(t, "altFormat") || this._get(t, "dateFormat"),
            s = this._getDate(t),
            a = this.formatDate(i, s, this._getFormatConfig(t)),
            e(n).each(function() {
                e(this).val(a)
            }))
        },
        noWeekends: function(e) {
            var t = e.getDay();
            return [t > 0 && 6 > t, ""]
        },
        iso8601Week: function(e) {
            var t, i = new Date(e.getTime());
            return i.setDate(i.getDate() + 4 - (i.getDay() || 7)),
            t = i.getTime(),
            i.setMonth(0),
            i.setDate(1),
            Math.floor(Math.round((t - i) / 864e5) / 7) + 1
        },
        parseDate: function(i, s, a) {
            if (null == i || null == s)
                throw "Invalid arguments";
            if (s = "object" == typeof s ? "" + s : s + "",
            "" === s)
                return null;
            var n, r, o, h, l = 0, u = (a ? a.shortYearCutoff : null) || this._defaults.shortYearCutoff, d = "string" != typeof u ? u : (new Date).getFullYear() % 100 + parseInt(u, 10), c = (a ? a.dayNamesShort : null) || this._defaults.dayNamesShort, p = (a ? a.dayNames : null) || this._defaults.dayNames, m = (a ? a.monthNamesShort : null) || this._defaults.monthNamesShort, f = (a ? a.monthNames : null) || this._defaults.monthNames, g = -1, v = -1, y = -1, b = -1, _ = !1, x = function(e) {
                var t = i.length > n + 1 && i.charAt(n + 1) === e;
                return t && n++,
                t
            }, k = function(e) {
                var t = x(e)
                  , i = "@" === e ? 14 : "!" === e ? 20 : "y" === e && t ? 4 : "o" === e ? 3 : 2
                  , a = RegExp("^\\d{1," + i + "}")
                  , n = s.substring(l).match(a);
                if (!n)
                    throw "Missing number at position " + l;
                return l += n[0].length,
                parseInt(n[0], 10)
            }, w = function(i, a, n) {
                var r = -1
                  , o = e.map(x(i) ? n : a, function(e, t) {
                    return [[t, e]]
                }).sort(function(e, t) {
                    return -(e[1].length - t[1].length)
                });
                if (e.each(o, function(e, i) {
                    var a = i[1];
                    return s.substr(l, a.length).toLowerCase() === a.toLowerCase() ? (r = i[0],
                    l += a.length,
                    !1) : t
                }),
                -1 !== r)
                    return r + 1;
                throw "Unknown name at position " + l
            }, D = function() {
                if (s.charAt(l) !== i.charAt(n))
                    throw "Unexpected literal at position " + l;
                l++
            };
            for (n = 0; i.length > n; n++)
                if (_)
                    "'" !== i.charAt(n) || x("'") ? D() : _ = !1;
                else
                    switch (i.charAt(n)) {
                    case "d":
                        y = k("d");
                        break;
                    case "D":
                        w("D", c, p);
                        break;
                    case "o":
                        b = k("o");
                        break;
                    case "m":
                        v = k("m");
                        break;
                    case "M":
                        v = w("M", m, f);
                        break;
                    case "y":
                        g = k("y");
                        break;
                    case "@":
                        h = new Date(k("@")),
                        g = h.getFullYear(),
                        v = h.getMonth() + 1,
                        y = h.getDate();
                        break;
                    case "!":
                        h = new Date((k("!") - this._ticksTo1970) / 1e4),
                        g = h.getFullYear(),
                        v = h.getMonth() + 1,
                        y = h.getDate();
                        break;
                    case "'":
                        x("'") ? D() : _ = !0;
                        break;
                    default:
                        D()
                    }
            if (s.length > l && (o = s.substr(l),
            !/^\s+/.test(o)))
                throw "Extra/unparsed characters found in date: " + o;
            if (-1 === g ? g = (new Date).getFullYear() : 100 > g && (g += (new Date).getFullYear() - (new Date).getFullYear() % 100 + (d >= g ? 0 : -100)),
            b > -1)
                for (v = 1,
                y = b; ; ) {
                    if (r = this._getDaysInMonth(g, v - 1),
                    r >= y)
                        break;
                    v++,
                    y -= r
                }
            if (h = this._daylightSavingAdjust(new Date(g,v - 1,y)),
            h.getFullYear() !== g || h.getMonth() + 1 !== v || h.getDate() !== y)
                throw "Invalid date";
            return h
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
        _ticksTo1970: 1e7 * 60 * 60 * 24 * (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)),
        formatDate: function(e, t, i) {
            if (!t)
                return "";
            var s, a = (i ? i.dayNamesShort : null) || this._defaults.dayNamesShort, n = (i ? i.dayNames : null) || this._defaults.dayNames, r = (i ? i.monthNamesShort : null) || this._defaults.monthNamesShort, o = (i ? i.monthNames : null) || this._defaults.monthNames, h = function(t) {
                var i = e.length > s + 1 && e.charAt(s + 1) === t;
                return i && s++,
                i
            }, l = function(e, t, i) {
                var s = "" + t;
                if (h(e))
                    for (; i > s.length; )
                        s = "0" + s;
                return s
            }, u = function(e, t, i, s) {
                return h(e) ? s[t] : i[t]
            }, d = "", c = !1;
            if (t)
                for (s = 0; e.length > s; s++)
                    if (c)
                        "'" !== e.charAt(s) || h("'") ? d += e.charAt(s) : c = !1;
                    else
                        switch (e.charAt(s)) {
                        case "d":
                            d += l("d", t.getDate(), 2);
                            break;
                        case "D":
                            d += u("D", t.getDay(), a, n);
                            break;
                        case "o":
                            d += l("o", Math.round((new Date(t.getFullYear(),t.getMonth(),t.getDate()).getTime() - new Date(t.getFullYear(),0,0).getTime()) / 864e5), 3);
                            break;
                        case "m":
                            d += l("m", t.getMonth() + 1, 2);
                            break;
                        case "M":
                            d += u("M", t.getMonth(), r, o);
                            break;
                        case "y":
                            d += h("y") ? t.getFullYear() : (10 > t.getYear() % 100 ? "0" : "") + t.getYear() % 100;
                            break;
                        case "@":
                            d += t.getTime();
                            break;
                        case "!":
                            d += 1e4 * t.getTime() + this._ticksTo1970;
                            break;
                        case "'":
                            h("'") ? d += "'" : c = !0;
                            break;
                        default:
                            d += e.charAt(s)
                        }
            return d
        },
        _possibleChars: function(e) {
            var t, i = "", s = !1, a = function(i) {
                var s = e.length > t + 1 && e.charAt(t + 1) === i;
                return s && t++,
                s
            };
            for (t = 0; e.length > t; t++)
                if (s)
                    "'" !== e.charAt(t) || a("'") ? i += e.charAt(t) : s = !1;
                else
                    switch (e.charAt(t)) {
                    case "d":
                    case "m":
                    case "y":
                    case "@":
                        i += "0123456789";
                        break;
                    case "D":
                    case "M":
                        return null;
                    case "'":
                        a("'") ? i += "'" : s = !0;
                        break;
                    default:
                        i += e.charAt(t)
                    }
            return i
        },
        _get: function(e, i) {
            return e.settings[i] !== t ? e.settings[i] : this._defaults[i]
        },
        _setDateFromField: function(e, t) {
            if (e.input.val() !== e.lastVal) {
                var i = this._get(e, "dateFormat")
                  , s = e.lastVal = e.input ? e.input.val() : null
                  , a = this._getDefaultDate(e)
                  , n = a
                  , r = this._getFormatConfig(e);
                try {
                    n = this.parseDate(i, s, r) || a
                } catch (o) {
                    s = t ? "" : s
                }
                e.selectedDay = n.getDate(),
                e.drawMonth = e.selectedMonth = n.getMonth(),
                e.drawYear = e.selectedYear = n.getFullYear(),
                e.currentDay = s ? n.getDate() : 0,
                e.currentMonth = s ? n.getMonth() : 0,
                e.currentYear = s ? n.getFullYear() : 0,
                this._adjustInstDate(e)
            }
        },
        _getDefaultDate: function(e) {
            return this._restrictMinMax(e, this._determineDate(e, this._get(e, "defaultDate"), new Date))
        },
        _determineDate: function(t, i, s) {
            var a = function(e) {
                var t = new Date;
                return t.setDate(t.getDate() + e),
                t
            }
              , n = function(i) {
                try {
                    return e.datepicker.parseDate(e.datepicker._get(t, "dateFormat"), i, e.datepicker._getFormatConfig(t))
                } catch (s) {}
                for (var a = (i.toLowerCase().match(/^c/) ? e.datepicker._getDate(t) : null) || new Date, n = a.getFullYear(), r = a.getMonth(), o = a.getDate(), h = /([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g, l = h.exec(i); l; ) {
                    switch (l[2] || "d") {
                    case "d":
                    case "D":
                        o += parseInt(l[1], 10);
                        break;
                    case "w":
                    case "W":
                        o += 7 * parseInt(l[1], 10);
                        break;
                    case "m":
                    case "M":
                        r += parseInt(l[1], 10),
                        o = Math.min(o, e.datepicker._getDaysInMonth(n, r));
                        break;
                    case "y":
                    case "Y":
                        n += parseInt(l[1], 10),
                        o = Math.min(o, e.datepicker._getDaysInMonth(n, r))
                    }
                    l = h.exec(i)
                }
                return new Date(n,r,o)
            }
              , r = null == i || "" === i ? s : "string" == typeof i ? n(i) : "number" == typeof i ? isNaN(i) ? s : a(i) : new Date(i.getTime());
            return r = r && "Invalid Date" == "" + r ? s : r,
            r && (r.setHours(0),
            r.setMinutes(0),
            r.setSeconds(0),
            r.setMilliseconds(0)),
            this._daylightSavingAdjust(r)
        },
        _daylightSavingAdjust: function(e) {
            return e ? (e.setHours(e.getHours() > 12 ? e.getHours() + 2 : 0),
            e) : null
        },
        _setDate: function(e, t, i) {
            var s = !t
              , a = e.selectedMonth
              , n = e.selectedYear
              , r = this._restrictMinMax(e, this._determineDate(e, t, new Date));
            e.selectedDay = e.currentDay = r.getDate(),
            e.drawMonth = e.selectedMonth = e.currentMonth = r.getMonth(),
            e.drawYear = e.selectedYear = e.currentYear = r.getFullYear(),
            a === e.selectedMonth && n === e.selectedYear || i || this._notifyChange(e),
            this._adjustInstDate(e),
            e.input && e.input.val(s ? "" : this._formatDate(e))
        },
        _getDate: function(e) {
            var t = !e.currentYear || e.input && "" === e.input.val() ? null : this._daylightSavingAdjust(new Date(e.currentYear,e.currentMonth,e.currentDay));
            return t
        },
        _attachHandlers: function(t) {
            var i = this._get(t, "stepMonths")
              , s = "#" + t.id.replace(/\\\\/g, "\\");
            t.dpDiv.find("[data-handler]").map(function() {
                var t = {
                    prev: function() {
                        e.datepicker._adjustDate(s, -i, "M")
                    },
                    next: function() {
                        e.datepicker._adjustDate(s, +i, "M")
                    },
                    hide: function() {
                        e.datepicker._hideDatepicker()
                    },
                    today: function() {
                        e.datepicker._gotoToday(s)
                    },
                    selectDay: function() {
                        return e.datepicker._selectDay(s, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this),
                        !1
                    },
                    selectMonth: function() {
                        return e.datepicker._selectMonthYear(s, this, "M"),
                        !1
                    },
                    selectYear: function() {
                        return e.datepicker._selectMonthYear(s, this, "Y"),
                        !1
                    }
                };
                e(this).bind(this.getAttribute("data-event"), t[this.getAttribute("data-handler")])
            })
        },
        _generateHTML: function(e) {
            var t, i, s, a, n, r, o, h, l, u, d, c, p, m, f, g, v, y, b, _, x, k, w, D, T, S, M, N, C, A, P, I, F, H, z, E, j, L, O, W = new Date, R = this._daylightSavingAdjust(new Date(W.getFullYear(),W.getMonth(),W.getDate())), Y = this._get(e, "isRTL"), J = this._get(e, "showButtonPanel"), B = this._get(e, "hideIfNoPrevNext"), K = this._get(e, "navigationAsDateFormat"), V = this._getNumberOfMonths(e), U = this._get(e, "showCurrentAtPos"), q = this._get(e, "stepMonths"), G = 1 !== V[0] || 1 !== V[1], Q = this._daylightSavingAdjust(e.currentDay ? new Date(e.currentYear,e.currentMonth,e.currentDay) : new Date(9999,9,9)), $ = this._getMinMaxDate(e, "min"), X = this._getMinMaxDate(e, "max"), Z = e.drawMonth - U, et = e.drawYear;
            if (0 > Z && (Z += 12,
            et--),
            X)
                for (t = this._daylightSavingAdjust(new Date(X.getFullYear(),X.getMonth() - V[0] * V[1] + 1,X.getDate())),
                t = $ && $ > t ? $ : t; this._daylightSavingAdjust(new Date(et,Z,1)) > t; )
                    Z--,
                    0 > Z && (Z = 11,
                    et--);
            for (e.drawMonth = Z,
            e.drawYear = et,
            i = this._get(e, "prevText"),
            i = K ? this.formatDate(i, this._daylightSavingAdjust(new Date(et,Z - q,1)), this._getFormatConfig(e)) : i,
            s = this._canAdjustMonth(e, -1, et, Z) ? "<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click' title='" + i + "'><span class='ui-icon ui-icon-circle-triangle-" + (Y ? "e" : "w") + "'>" + i + "</span></a>" : B ? "" : "<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='" + i + "'><span class='ui-icon ui-icon-circle-triangle-" + (Y ? "e" : "w") + "'>" + i + "</span></a>",
            a = this._get(e, "nextText"),
            a = K ? this.formatDate(a, this._daylightSavingAdjust(new Date(et,Z + q,1)), this._getFormatConfig(e)) : a,
            n = this._canAdjustMonth(e, 1, et, Z) ? "<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click' title='" + a + "'><span class='ui-icon ui-icon-circle-triangle-" + (Y ? "w" : "e") + "'>" + a + "</span></a>" : B ? "" : "<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='" + a + "'><span class='ui-icon ui-icon-circle-triangle-" + (Y ? "w" : "e") + "'>" + a + "</span></a>",
            r = this._get(e, "currentText"),
            o = this._get(e, "gotoCurrent") && e.currentDay ? Q : R,
            r = K ? this.formatDate(r, o, this._getFormatConfig(e)) : r,
            h = e.inline ? "" : "<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>" + this._get(e, "closeText") + "</button>",
            l = J ? "<div class='ui-datepicker-buttonpane ui-widget-content'>" + (Y ? h : "") + (this._isInRange(e, o) ? "<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'>" + r + "</button>" : "") + (Y ? "" : h) + "</div>" : "",
            u = parseInt(this._get(e, "firstDay"), 10),
            u = isNaN(u) ? 0 : u,
            d = this._get(e, "showWeek"),
            c = this._get(e, "dayNames"),
            p = this._get(e, "dayNamesMin"),
            m = this._get(e, "monthNames"),
            f = this._get(e, "monthNamesShort"),
            g = this._get(e, "beforeShowDay"),
            v = this._get(e, "showOtherMonths"),
            y = this._get(e, "selectOtherMonths"),
            b = this._getDefaultDate(e),
            _ = "",
            k = 0; V[0] > k; k++) {
                for (w = "",
                this.maxRows = 4,
                D = 0; V[1] > D; D++) {
                    if (T = this._daylightSavingAdjust(new Date(et,Z,e.selectedDay)),
                    S = " ui-corner-all",
                    M = "",
                    G) {
                        if (M += "<div class='ui-datepicker-group",
                        V[1] > 1)
                            switch (D) {
                            case 0:
                                M += " ui-datepicker-group-first",
                                S = " ui-corner-" + (Y ? "right" : "left");
                                break;
                            case V[1] - 1:
                                M += " ui-datepicker-group-last",
                                S = " ui-corner-" + (Y ? "left" : "right");
                                break;
                            default:
                                M += " ui-datepicker-group-middle",
                                S = ""
                            }
                        M += "'>"
                    }
                    for (M += "<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix" + S + "'>" + (/all|left/.test(S) && 0 === k ? Y ? n : s : "") + (/all|right/.test(S) && 0 === k ? Y ? s : n : "") + this._generateMonthYearHeader(e, Z, et, $, X, k > 0 || D > 0, m, f) + "</div><table class='ui-datepicker-calendar'><thead>" + "<tr>",
                    N = d ? "<th class='ui-datepicker-week-col'>" + this._get(e, "weekHeader") + "</th>" : "",
                    x = 0; 7 > x; x++)
                        C = (x + u) % 7,
                        N += "<th" + ((x + u + 6) % 7 >= 5 ? " class='ui-datepicker-week-end'" : "") + ">" + "<span title='" + c[C] + "'>" + p[C] + "</span></th>";
                    for (M += N + "</tr></thead><tbody>",
                    A = this._getDaysInMonth(et, Z),
                    et === e.selectedYear && Z === e.selectedMonth && (e.selectedDay = Math.min(e.selectedDay, A)),
                    P = (this._getFirstDayOfMonth(et, Z) - u + 7) % 7,
                    I = Math.ceil((P + A) / 7),
                    F = G ? this.maxRows > I ? this.maxRows : I : I,
                    this.maxRows = F,
                    H = this._daylightSavingAdjust(new Date(et,Z,1 - P)),
                    z = 0; F > z; z++) {
                        for (M += "<tr>",
                        E = d ? "<td class='ui-datepicker-week-col'>" + this._get(e, "calculateWeek")(H) + "</td>" : "",
                        x = 0; 7 > x; x++)
                            j = g ? g.apply(e.input ? e.input[0] : null, [H]) : [!0, ""],
                            L = H.getMonth() !== Z,
                            O = L && !y || !j[0] || $ && $ > H || X && H > X,
                            E += "<td class='" + ((x + u + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + (L ? " ui-datepicker-other-month" : "") + (H.getTime() === T.getTime() && Z === e.selectedMonth && e._keyEvent || b.getTime() === H.getTime() && b.getTime() === T.getTime() ? " " + this._dayOverClass : "") + (O ? " " + this._unselectableClass + " ui-state-disabled" : "") + (L && !v ? "" : " " + j[1] + (H.getTime() === Q.getTime() ? " " + this._currentClass : "") + (H.getTime() === R.getTime() ? " ui-datepicker-today" : "")) + "'" + (L && !v || !j[2] ? "" : " title='" + j[2].replace(/'/g, "&#39;") + "'") + (O ? "" : " data-handler='selectDay' data-event='click' data-month='" + H.getMonth() + "' data-year='" + H.getFullYear() + "'") + ">" + (L && !v ? "&#xa0;" : O ? "<span class='ui-state-default'>" + H.getDate() + "</span>" : "<a class='ui-state-default" + (H.getTime() === R.getTime() ? " ui-state-highlight" : "") + (H.getTime() === Q.getTime() ? " ui-state-active" : "") + (L ? " ui-priority-secondary" : "") + "' href='#'>" + H.getDate() + "</a>") + "</td>",
                            H.setDate(H.getDate() + 1),
                            H = this._daylightSavingAdjust(H);
                        M += E + "</tr>"
                    }
                    Z++,
                    Z > 11 && (Z = 0,
                    et++),
                    M += "</tbody></table>" + (G ? "</div>" + (V[0] > 0 && D === V[1] - 1 ? "<div class='ui-datepicker-row-break'></div>" : "") : ""),
                    w += M
                }
                _ += w
            }
            return _ += l,
            e._keyEvent = !1,
            _
        },
        _generateMonthYearHeader: function(e, t, i, s, a, n, r, o) {
            var h, l, u, d, c, p, m, f, g = this._get(e, "changeMonth"), v = this._get(e, "changeYear"), y = this._get(e, "showMonthAfterYear"), b = "<div class='ui-datepicker-title'>", _ = "";
            if (n || !g)
                _ += "<span class='ui-datepicker-month'>" + r[t] + "</span>";
            else {
                for (h = s && s.getFullYear() === i,
                l = a && a.getFullYear() === i,
                _ += "<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>",
                u = 0; 12 > u; u++)
                    (!h || u >= s.getMonth()) && (!l || a.getMonth() >= u) && (_ += "<option value='" + u + "'" + (u === t ? " selected='selected'" : "") + ">" + o[u] + "</option>");
                _ += "</select>"
            }
            if (y || (b += _ + (!n && g && v ? "" : "&#xa0;")),
            !e.yearshtml)
                if (e.yearshtml = "",
                n || !v)
                    b += "<span class='ui-datepicker-year'>" + i + "</span>";
                else {
                    for (d = this._get(e, "yearRange").split(":"),
                    c = (new Date).getFullYear(),
                    p = function(e) {
                        var t = e.match(/c[+\-].*/) ? i + parseInt(e.substring(1), 10) : e.match(/[+\-].*/) ? c + parseInt(e, 10) : parseInt(e, 10);
                        return isNaN(t) ? c : t
                    }
                    ,
                    m = p(d[0]),
                    f = Math.max(m, p(d[1] || "")),
                    m = s ? Math.max(m, s.getFullYear()) : m,
                    f = a ? Math.min(f, a.getFullYear()) : f,
                    e.yearshtml += "<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>"; f >= m; m++)
                        e.yearshtml += "<option value='" + m + "'" + (m === i ? " selected='selected'" : "") + ">" + m + "</option>";
                    e.yearshtml += "</select>",
                    b += e.yearshtml,
                    e.yearshtml = null
                }
            return b += this._get(e, "yearSuffix"),
            y && (b += (!n && g && v ? "" : "&#xa0;") + _),
            b += "</div>"
        },
        _adjustInstDate: function(e, t, i) {
            var s = e.drawYear + ("Y" === i ? t : 0)
              , a = e.drawMonth + ("M" === i ? t : 0)
              , n = Math.min(e.selectedDay, this._getDaysInMonth(s, a)) + ("D" === i ? t : 0)
              , r = this._restrictMinMax(e, this._daylightSavingAdjust(new Date(s,a,n)));
            e.selectedDay = r.getDate(),
            e.drawMonth = e.selectedMonth = r.getMonth(),
            e.drawYear = e.selectedYear = r.getFullYear(),
            ("M" === i || "Y" === i) && this._notifyChange(e)
        },
        _restrictMinMax: function(e, t) {
            var i = this._getMinMaxDate(e, "min")
              , s = this._getMinMaxDate(e, "max")
              , a = i && i > t ? i : t;
            return s && a > s ? s : a
        },
        _notifyChange: function(e) {
            var t = this._get(e, "onChangeMonthYear");
            t && t.apply(e.input ? e.input[0] : null, [e.selectedYear, e.selectedMonth + 1, e])
        },
        _getNumberOfMonths: function(e) {
            var t = this._get(e, "numberOfMonths");
            return null == t ? [1, 1] : "number" == typeof t ? [1, t] : t
        },
        _getMinMaxDate: function(e, t) {
            return this._determineDate(e, this._get(e, t + "Date"), null)
        },
        _getDaysInMonth: function(e, t) {
            return 32 - this._daylightSavingAdjust(new Date(e,t,32)).getDate()
        },
        _getFirstDayOfMonth: function(e, t) {
            return new Date(e,t,1).getDay()
        },
        _canAdjustMonth: function(e, t, i, s) {
            var a = this._getNumberOfMonths(e)
              , n = this._daylightSavingAdjust(new Date(i,s + (0 > t ? t : a[0] * a[1]),1));
            return 0 > t && n.setDate(this._getDaysInMonth(n.getFullYear(), n.getMonth())),
            this._isInRange(e, n)
        },
        _isInRange: function(e, t) {
            var i, s, a = this._getMinMaxDate(e, "min"), n = this._getMinMaxDate(e, "max"), r = null, o = null, h = this._get(e, "yearRange");
            return h && (i = h.split(":"),
            s = (new Date).getFullYear(),
            r = parseInt(i[0], 10),
            o = parseInt(i[1], 10),
            i[0].match(/[+\-].*/) && (r += s),
            i[1].match(/[+\-].*/) && (o += s)),
            (!a || t.getTime() >= a.getTime()) && (!n || t.getTime() <= n.getTime()) && (!r || t.getFullYear() >= r) && (!o || o >= t.getFullYear())
        },
        _getFormatConfig: function(e) {
            var t = this._get(e, "shortYearCutoff");
            return t = "string" != typeof t ? t : (new Date).getFullYear() % 100 + parseInt(t, 10),
            {
                shortYearCutoff: t,
                dayNamesShort: this._get(e, "dayNamesShort"),
                dayNames: this._get(e, "dayNames"),
                monthNamesShort: this._get(e, "monthNamesShort"),
                monthNames: this._get(e, "monthNames")
            }
        },
        _formatDate: function(e, t, i, s) {
            t || (e.currentDay = e.selectedDay,
            e.currentMonth = e.selectedMonth,
            e.currentYear = e.selectedYear);
            var a = t ? "object" == typeof t ? t : this._daylightSavingAdjust(new Date(s,i,t)) : this._daylightSavingAdjust(new Date(e.currentYear,e.currentMonth,e.currentDay));
            return this.formatDate(this._get(e, "dateFormat"), a, this._getFormatConfig(e))
        }
    }),
    e.fn.datepicker = function(t) {
        if (!this.length)
            return this;
        e.datepicker.initialized || (e(document).mousedown(e.datepicker._checkExternalClick),
        e.datepicker.initialized = !0),
        0 === e("#" + e.datepicker._mainDivId).length && e("body").append(e.datepicker.dpDiv);
        var i = Array.prototype.slice.call(arguments, 1);
        return "string" != typeof t || "isDisabled" !== t && "getDate" !== t && "widget" !== t ? "option" === t && 2 === arguments.length && "string" == typeof arguments[1] ? e.datepicker["_" + t + "Datepicker"].apply(e.datepicker, [this[0]].concat(i)) : this.each(function() {
            "string" == typeof t ? e.datepicker["_" + t + "Datepicker"].apply(e.datepicker, [this].concat(i)) : e.datepicker._attachDatepicker(this, t)
        }) : e.datepicker["_" + t + "Datepicker"].apply(e.datepicker, [this[0]].concat(i))
    }
    ,
    e.datepicker = new i,
    e.datepicker.initialized = !1,
    e.datepicker.uuid = (new Date).getTime(),
    e.datepicker.version = "1.10.4"
}
)(jQuery);
(function(e) {
    var t = {
        buttons: !0,
        height: !0,
        maxHeight: !0,
        maxWidth: !0,
        minHeight: !0,
        minWidth: !0,
        width: !0
    }
      , i = {
        maxHeight: !0,
        maxWidth: !0,
        minHeight: !0,
        minWidth: !0
    };
    e.widget("ui.dialog", {
        version: "1.10.4",
        options: {
            appendTo: "body",
            autoOpen: !0,
            buttons: [],
            closeOnEscape: !0,
            closeText: "close",
            dialogClass: "",
            draggable: !0,
            hide: null,
            height: "auto",
            maxHeight: null,
            maxWidth: null,
            minHeight: 150,
            minWidth: 150,
            modal: !1,
            position: {
                my: "center",
                at: "center",
                of: window,
                collision: "fit",
                using: function(t) {
                    var i = e(this).css(t).offset().top;
                    0 > i && e(this).css("top", t.top - i)
                }
            },
            resizable: !0,
            show: null,
            title: null,
            width: 300,
            beforeClose: null,
            close: null,
            drag: null,
            dragStart: null,
            dragStop: null,
            focus: null,
            open: null,
            resize: null,
            resizeStart: null,
            resizeStop: null
        },
        _create: function() {
            this.originalCss = {
                display: this.element[0].style.display,
                width: this.element[0].style.width,
                minHeight: this.element[0].style.minHeight,
                maxHeight: this.element[0].style.maxHeight,
                height: this.element[0].style.height
            },
            this.originalPosition = {
                parent: this.element.parent(),
                index: this.element.parent().children().index(this.element)
            },
            this.originalTitle = this.element.attr("title"),
            this.options.title = this.options.title || this.originalTitle,
            this._createWrapper(),
            this.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(this.uiDialog),
            this._createTitlebar(),
            this._createButtonPane(),
            this.options.draggable && e.fn.draggable && this._makeDraggable(),
            this.options.resizable && e.fn.resizable && this._makeResizable(),
            this._isOpen = !1
        },
        _init: function() {
            this.options.autoOpen && this.open()
        },
        _appendTo: function() {
            var t = this.options.appendTo;
            return t && (t.jquery || t.nodeType) ? e(t) : this.document.find(t || "body").eq(0)
        },
        _destroy: function() {
            var e, t = this.originalPosition;
            this._destroyOverlay(),
            this.element.removeUniqueId().removeClass("ui-dialog-content ui-widget-content").css(this.originalCss).detach(),
            this.uiDialog.stop(!0, !0).remove(),
            this.originalTitle && this.element.attr("title", this.originalTitle),
            e = t.parent.children().eq(t.index),
            e.length && e[0] !== this.element[0] ? e.before(this.element) : t.parent.append(this.element)
        },
        widget: function() {
            return this.uiDialog
        },
        disable: e.noop,
        enable: e.noop,
        close: function(t) {
            var i, s = this;
            if (this._isOpen && this._trigger("beforeClose", t) !== !1) {
                if (this._isOpen = !1,
                this._destroyOverlay(),
                !this.opener.filter(":focusable").focus().length)
                    try {
                        i = this.document[0].activeElement,
                        i && "body" !== i.nodeName.toLowerCase() && e(i).blur()
                    } catch (a) {}
                this._hide(this.uiDialog, this.options.hide, function() {
                    s._trigger("close", t)
                })
            }
        },
        isOpen: function() {
            return this._isOpen
        },
        moveToTop: function() {
            this._moveToTop()
        },
        _moveToTop: function(e, t) {
            var i = !!this.uiDialog.nextAll(":visible").insertBefore(this.uiDialog).length;
            return i && !t && this._trigger("focus", e),
            i
        },
        open: function() {
            var t = this;
            return this._isOpen ? (this._moveToTop() && this._focusTabbable(),
            undefined) : (this._isOpen = !0,
            this.opener = e(this.document[0].activeElement),
            this._size(),
            this._position(),
            this._createOverlay(),
            this._moveToTop(null, !0),
            this._show(this.uiDialog, this.options.show, function() {
                t._focusTabbable(),
                t._trigger("focus")
            }),
            this._trigger("open"),
            undefined)
        },
        _focusTabbable: function() {
            var e = this.element.find("[autofocus]");
            e.length || (e = this.element.find(":tabbable")),
            e.length || (e = this.uiDialogButtonPane.find(":tabbable")),
            e.length || (e = this.uiDialogTitlebarClose.filter(":tabbable")),
            e.length || (e = this.uiDialog),
            e.eq(0).focus()
        },
        _keepFocus: function(t) {
            function i() {
                var t = this.document[0].activeElement
                  , i = this.uiDialog[0] === t || e.contains(this.uiDialog[0], t);
                i || this._focusTabbable()
            }
            t.preventDefault(),
            i.call(this),
            this._delay(i)
        },
        _createWrapper: function() {
            this.uiDialog = e("<div>").addClass("ui-dialog ui-widget ui-widget-content ui-corner-all ui-front " + this.options.dialogClass).hide().attr({
                tabIndex: -1,
                role: "dialog"
            }).appendTo(this._appendTo()),
            this._on(this.uiDialog, {
                keydown: function(t) {
                    if (this.options.closeOnEscape && !t.isDefaultPrevented() && t.keyCode && t.keyCode === e.ui.keyCode.ESCAPE)
                        return t.preventDefault(),
                        this.close(t),
                        undefined;
                    if (t.keyCode === e.ui.keyCode.TAB) {
                        var i = this.uiDialog.find(":tabbable")
                          , s = i.filter(":first")
                          , a = i.filter(":last");
                        t.target !== a[0] && t.target !== this.uiDialog[0] || t.shiftKey ? t.target !== s[0] && t.target !== this.uiDialog[0] || !t.shiftKey || (a.focus(1),
                        t.preventDefault()) : (s.focus(1),
                        t.preventDefault())
                    }
                },
                mousedown: function(e) {
                    this._moveToTop(e) && this._focusTabbable()
                }
            }),
            this.element.find("[aria-describedby]").length || this.uiDialog.attr({
                "aria-describedby": this.element.uniqueId().attr("id")
            })
        },
        _createTitlebar: function() {
            var t;
            this.uiDialogTitlebar = e("<div>").addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(this.uiDialog),
            this._on(this.uiDialogTitlebar, {
                mousedown: function(t) {
                    e(t.target).closest(".ui-dialog-titlebar-close") || this.uiDialog.focus()
                }
            }),
            this.uiDialogTitlebarClose = e("<button type='button'></button>").button({
                label: this.options.closeText,
                icons: {
                    primary: "ui-icon-closethick"
                },
                text: !1
            }).addClass("ui-dialog-titlebar-close").appendTo(this.uiDialogTitlebar),
            this._on(this.uiDialogTitlebarClose, {
                click: function(e) {
                    e.preventDefault(),
                    this.close(e)
                }
            }),
            t = e("<span>").uniqueId().addClass("ui-dialog-title").prependTo(this.uiDialogTitlebar),
            this._title(t),
            this.uiDialog.attr({
                "aria-labelledby": t.attr("id")
            })
        },
        _title: function(e) {
            this.options.title || e.html("&#160;"),
            e.text(this.options.title)
        },
        _createButtonPane: function() {
            this.uiDialogButtonPane = e("<div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"),
            this.uiButtonSet = e("<div>").addClass("ui-dialog-buttonset").appendTo(this.uiDialogButtonPane),
            this._createButtons()
        },
        _createButtons: function() {
            var t = this
              , i = this.options.buttons;
            return this.uiDialogButtonPane.remove(),
            this.uiButtonSet.empty(),
            e.isEmptyObject(i) || e.isArray(i) && !i.length ? (this.uiDialog.removeClass("ui-dialog-buttons"),
            undefined) : (e.each(i, function(i, s) {
                var a, n;
                s = e.isFunction(s) ? {
                    click: s,
                    text: i
                } : s,
                s = e.extend({
                    type: "button"
                }, s),
                a = s.click,
                s.click = function() {
                    a.apply(t.element[0], arguments)
                }
                ,
                n = {
                    icons: s.icons,
                    text: s.showText
                },
                delete s.icons,
                delete s.showText,
                e("<button></button>", s).button(n).appendTo(t.uiButtonSet)
            }),
            this.uiDialog.addClass("ui-dialog-buttons"),
            this.uiDialogButtonPane.appendTo(this.uiDialog),
            undefined)
        },
        _makeDraggable: function() {
            function t(e) {
                return {
                    position: e.position,
                    offset: e.offset
                }
            }
            var i = this
              , s = this.options;
            this.uiDialog.draggable({
                cancel: ".ui-dialog-content, .ui-dialog-titlebar-close",
                handle: ".ui-dialog-titlebar",
                containment: "document",
                start: function(s, a) {
                    e(this).addClass("ui-dialog-dragging"),
                    i._blockFrames(),
                    i._trigger("dragStart", s, t(a))
                },
                drag: function(e, s) {
                    i._trigger("drag", e, t(s))
                },
                stop: function(a, n) {
                    s.position = [n.position.left - i.document.scrollLeft(), n.position.top - i.document.scrollTop()],
                    e(this).removeClass("ui-dialog-dragging"),
                    i._unblockFrames(),
                    i._trigger("dragStop", a, t(n))
                }
            })
        },
        _makeResizable: function() {
            function t(e) {
                return {
                    originalPosition: e.originalPosition,
                    originalSize: e.originalSize,
                    position: e.position,
                    size: e.size
                }
            }
            var i = this
              , s = this.options
              , a = s.resizable
              , n = this.uiDialog.css("position")
              , r = "string" == typeof a ? a : "n,e,s,w,se,sw,ne,nw";
            this.uiDialog.resizable({
                cancel: ".ui-dialog-content",
                containment: "document",
                alsoResize: this.element,
                maxWidth: s.maxWidth,
                maxHeight: s.maxHeight,
                minWidth: s.minWidth,
                minHeight: this._minHeight(),
                handles: r,
                start: function(s, a) {
                    e(this).addClass("ui-dialog-resizing"),
                    i._blockFrames(),
                    i._trigger("resizeStart", s, t(a))
                },
                resize: function(e, s) {
                    i._trigger("resize", e, t(s))
                },
                stop: function(a, n) {
                    s.height = e(this).height(),
                    s.width = e(this).width(),
                    e(this).removeClass("ui-dialog-resizing"),
                    i._unblockFrames(),
                    i._trigger("resizeStop", a, t(n))
                }
            }).css("position", n)
        },
        _minHeight: function() {
            var e = this.options;
            return "auto" === e.height ? e.minHeight : Math.min(e.minHeight, e.height)
        },
        _position: function() {
            var e = this.uiDialog.is(":visible");
            e || this.uiDialog.show(),
            this.uiDialog.position(this.options.position),
            e || this.uiDialog.hide()
        },
        _setOptions: function(s) {
            var a = this
              , n = !1
              , r = {};
            e.each(s, function(e, s) {
                a._setOption(e, s),
                e in t && (n = !0),
                e in i && (r[e] = s)
            }),
            n && (this._size(),
            this._position()),
            this.uiDialog.is(":data(ui-resizable)") && this.uiDialog.resizable("option", r)
        },
        _setOption: function(e, t) {
            var i, s, a = this.uiDialog;
            "dialogClass" === e && a.removeClass(this.options.dialogClass).addClass(t),
            "disabled" !== e && (this._super(e, t),
            "appendTo" === e && this.uiDialog.appendTo(this._appendTo()),
            "buttons" === e && this._createButtons(),
            "closeText" === e && this.uiDialogTitlebarClose.button({
                label: "" + t
            }),
            "draggable" === e && (i = a.is(":data(ui-draggable)"),
            i && !t && a.draggable("destroy"),
            !i && t && this._makeDraggable()),
            "position" === e && this._position(),
            "resizable" === e && (s = a.is(":data(ui-resizable)"),
            s && !t && a.resizable("destroy"),
            s && "string" == typeof t && a.resizable("option", "handles", t),
            s || t === !1 || this._makeResizable()),
            "title" === e && this._title(this.uiDialogTitlebar.find(".ui-dialog-title")))
        },
        _size: function() {
            var e, t, i, s = this.options;
            this.element.show().css({
                width: "auto",
                minHeight: 0,
                maxHeight: "none",
                height: 0
            }),
            s.minWidth > s.width && (s.width = s.minWidth),
            e = this.uiDialog.css({
                height: "auto",
                width: s.width
            }).outerHeight(),
            t = Math.max(0, s.minHeight - e),
            i = "number" == typeof s.maxHeight ? Math.max(0, s.maxHeight - e) : "none",
            "auto" === s.height ? this.element.css({
                minHeight: t,
                maxHeight: i,
                height: "auto"
            }) : this.element.height(Math.max(0, s.height - e)),
            this.uiDialog.is(":data(ui-resizable)") && this.uiDialog.resizable("option", "minHeight", this._minHeight())
        },
        _blockFrames: function() {
            this.iframeBlocks = this.document.find("iframe").map(function() {
                var t = e(this);
                return e("<div>").css({
                    position: "absolute",
                    width: t.outerWidth(),
                    height: t.outerHeight()
                }).appendTo(t.parent()).offset(t.offset())[0]
            })
        },
        _unblockFrames: function() {
            this.iframeBlocks && (this.iframeBlocks.remove(),
            delete this.iframeBlocks)
        },
        _allowInteraction: function(t) {
            return e(t.target).closest(".ui-dialog").length ? !0 : !!e(t.target).closest(".ui-datepicker").length
        },
        _createOverlay: function() {
            if (this.options.modal) {
                var t = this
                  , i = this.widgetFullName;
                e.ui.dialog.overlayInstances || this._delay(function() {
                    e.ui.dialog.overlayInstances && this.document.bind("focusin.dialog", function(s) {
                        t._allowInteraction(s) || (s.preventDefault(),
                        e(".ui-dialog:visible:last .ui-dialog-content").data(i)._focusTabbable())
                    })
                }),
                this.overlay = e("<div>").addClass("ui-widget-overlay ui-front").appendTo(this._appendTo()),
                this._on(this.overlay, {
                    mousedown: "_keepFocus"
                }),
                e.ui.dialog.overlayInstances++
            }
        },
        _destroyOverlay: function() {
            this.options.modal && this.overlay && (e.ui.dialog.overlayInstances--,
            e.ui.dialog.overlayInstances || this.document.unbind("focusin.dialog"),
            this.overlay.remove(),
            this.overlay = null)
        }
    }),
    e.ui.dialog.overlayInstances = 0,
    e.uiBackCompat !== !1 && e.widget("ui.dialog", e.ui.dialog, {
        _position: function() {
            var t, i = this.options.position, s = [], a = [0, 0];
            i ? (("string" == typeof i || "object" == typeof i && "0"in i) && (s = i.split ? i.split(" ") : [i[0], i[1]],
            1 === s.length && (s[1] = s[0]),
            e.each(["left", "top"], function(e, t) {
                +s[e] === s[e] && (a[e] = s[e],
                s[e] = t)
            }),
            i = {
                my: s[0] + (0 > a[0] ? a[0] : "+" + a[0]) + " " + s[1] + (0 > a[1] ? a[1] : "+" + a[1]),
                at: s.join(" ")
            }),
            i = e.extend({}, e.ui.dialog.prototype.options.position, i)) : i = e.ui.dialog.prototype.options.position,
            t = this.uiDialog.is(":visible"),
            t || this.uiDialog.show(),
            this.uiDialog.position(i),
            t || this.uiDialog.hide()
        }
    })
}
)(jQuery);
(function(e) {
    function t(t, i) {
        var s = (t.attr("aria-describedby") || "").split(/\s+/);
        s.push(i),
        t.data("ui-tooltip-id", i).attr("aria-describedby", e.trim(s.join(" ")))
    }
    function i(t) {
        var i = t.data("ui-tooltip-id")
          , s = (t.attr("aria-describedby") || "").split(/\s+/)
          , a = e.inArray(i, s);
        -1 !== a && s.splice(a, 1),
        t.removeData("ui-tooltip-id"),
        s = e.trim(s.join(" ")),
        s ? t.attr("aria-describedby", s) : t.removeAttr("aria-describedby")
    }
    var s = 0;
    e.widget("ui.tooltip", {
        version: "1.10.4",
        options: {
            content: function() {
                var t = e(this).attr("title") || "";
                return e("<a>").text(t).html()
            },
            hide: !0,
            items: "[title]:not([disabled])",
            position: {
                my: "left top+15",
                at: "left bottom",
                collision: "flipfit flip"
            },
            show: !0,
            tooltipClass: null,
            track: !1,
            close: null,
            open: null
        },
        _create: function() {
            this._on({
                mouseover: "open",
                focusin: "open"
            }),
            this.tooltips = {},
            this.parents = {},
            this.options.disabled && this._disable()
        },
        _setOption: function(t, i) {
            var s = this;
            return "disabled" === t ? (this[i ? "_disable" : "_enable"](),
            this.options[t] = i,
            void 0) : (this._super(t, i),
            "content" === t && e.each(this.tooltips, function(e, t) {
                s._updateContent(t)
            }),
            void 0)
        },
        _disable: function() {
            var t = this;
            e.each(this.tooltips, function(i, s) {
                var a = e.Event("blur");
                a.target = a.currentTarget = s[0],
                t.close(a, !0)
            }),
            this.element.find(this.options.items).addBack().each(function() {
                var t = e(this);
                t.is("[title]") && t.data("ui-tooltip-title", t.attr("title")).attr("title", "")
            })
        },
        _enable: function() {
            this.element.find(this.options.items).addBack().each(function() {
                var t = e(this);
                t.data("ui-tooltip-title") && t.attr("title", t.data("ui-tooltip-title"))
            })
        },
        open: function(t) {
            var i = this
              , s = e(t ? t.target : this.element).closest(this.options.items);
            s.length && !s.data("ui-tooltip-id") && (s.attr("title") && s.data("ui-tooltip-title", s.attr("title")),
            s.data("ui-tooltip-open", !0),
            t && "mouseover" === t.type && s.parents().each(function() {
                var t, s = e(this);
                s.data("ui-tooltip-open") && (t = e.Event("blur"),
                t.target = t.currentTarget = this,
                i.close(t, !0)),
                s.attr("title") && (s.uniqueId(),
                i.parents[this.id] = {
                    element: this,
                    title: s.attr("title")
                },
                s.attr("title", ""))
            }),
            this._updateContent(s, t))
        },
        _updateContent: function(e, t) {
            var i, s = this.options.content, a = this, n = t ? t.type : null;
            return "string" == typeof s ? this._open(t, e, s) : (i = s.call(e[0], function(i) {
                e.data("ui-tooltip-open") && a._delay(function() {
                    t && (t.type = n),
                    this._open(t, e, i)
                })
            }),
            i && this._open(t, e, i),
            void 0)
        },
        _open: function(i, s, a) {
            function n(e) {
                l.of = e,
                r.is(":hidden") || r.position(l)
            }
            var r, o, h, l = e.extend({}, this.options.position);
            if (a) {
                if (r = this._find(s),
                r.length)
                    return r.find(".ui-tooltip-content").html(a),
                    void 0;
                s.is("[title]") && (i && "mouseover" === i.type ? s.attr("title", "") : s.removeAttr("title")),
                r = this._tooltip(s),
                t(s, r.attr("id")),
                r.find(".ui-tooltip-content").html(a),
                this.options.track && i && /^mouse/.test(i.type) ? (this._on(this.document, {
                    mousemove: n
                }),
                n(i)) : r.position(e.extend({
                    of: s
                }, this.options.position)),
                r.hide(),
                this._show(r, this.options.show),
                this.options.show && this.options.show.delay && (h = this.delayedShow = setInterval(function() {
                    r.is(":visible") && (n(l.of),
                    clearInterval(h))
                }, e.fx.interval)),
                this._trigger("open", i, {
                    tooltip: r
                }),
                o = {
                    keyup: function(t) {
                        if (t.keyCode === e.ui.keyCode.ESCAPE) {
                            var i = e.Event(t);
                            i.currentTarget = s[0],
                            this.close(i, !0)
                        }
                    },
                    remove: function() {
                        this._removeTooltip(r)
                    }
                },
                i && "mouseover" !== i.type || (o.mouseleave = "close"),
                i && "focusin" !== i.type || (o.focusout = "close"),
                this._on(!0, s, o)
            }
        },
        close: function(t) {
            var s = this
              , a = e(t ? t.currentTarget : this.element)
              , n = this._find(a);
            this.closing || (clearInterval(this.delayedShow),
            a.data("ui-tooltip-title") && a.attr("title", a.data("ui-tooltip-title")),
            i(a),
            n.stop(!0),
            this._hide(n, this.options.hide, function() {
                s._removeTooltip(e(this))
            }),
            a.removeData("ui-tooltip-open"),
            this._off(a, "mouseleave focusout keyup"),
            a[0] !== this.element[0] && this._off(a, "remove"),
            this._off(this.document, "mousemove"),
            t && "mouseleave" === t.type && e.each(this.parents, function(t, i) {
                e(i.element).attr("title", i.title),
                delete s.parents[t]
            }),
            this.closing = !0,
            this._trigger("close", t, {
                tooltip: n
            }),
            this.closing = !1)
        },
        _tooltip: function(t) {
            var i = "ui-tooltip-" + s++
              , a = e("<div>").attr({
                id: i,
                role: "tooltip"
            }).addClass("ui-tooltip ui-widget ui-corner-all ui-widget-content " + (this.options.tooltipClass || ""));
            return e("<div>").addClass("ui-tooltip-content").appendTo(a),
            a.appendTo(this.document[0].body),
            this.tooltips[i] = t,
            a
        },
        _find: function(t) {
            var i = t.data("ui-tooltip-id");
            return i ? e("#" + i) : e()
        },
        _removeTooltip: function(e) {
            e.remove(),
            delete this.tooltips[e.attr("id")]
        },
        _destroy: function() {
            var t = this;
            e.each(this.tooltips, function(i, s) {
                var a = e.Event("blur");
                a.target = a.currentTarget = s[0],
                t.close(a, !0),
                e("#" + i).remove(),
                s.data("ui-tooltip-title") && (s.attr("title", s.data("ui-tooltip-title")),
                s.removeData("ui-tooltip-title"))
            })
        }
    })
}
)(jQuery);
(function(e, t) {
    var i = "ui-effects-";
    e.effects = {
        effect: {}
    },
    function(e, t) {
        function i(e, t, i) {
            var s = d[t.type] || {};
            return null == e ? i || !t.def ? null : t.def : (e = s.floor ? ~~e : parseFloat(e),
            isNaN(e) ? t.def : s.mod ? (e + s.mod) % s.mod : 0 > e ? 0 : e > s.max ? s.max : e)
        }
        function s(i) {
            var s = l()
              , a = s._rgba = [];
            return i = i.toLowerCase(),
            f(h, function(e, n) {
                var r, o = n.re.exec(i), h = o && n.parse(o), l = n.space || "rgba";
                return h ? (r = s[l](h),
                s[u[l].cache] = r[u[l].cache],
                a = s._rgba = r._rgba,
                !1) : t
            }),
            a.length ? ("0,0,0,0" === a.join() && e.extend(a, n.transparent),
            s) : n[i]
        }
        function a(e, t, i) {
            return i = (i + 1) % 1,
            1 > 6 * i ? e + 6 * (t - e) * i : 1 > 2 * i ? t : 2 > 3 * i ? e + 6 * (t - e) * (2 / 3 - i) : e
        }
        var n, r = "backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor", o = /^([\-+])=\s*(\d+\.?\d*)/, h = [{
            re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
            parse: function(e) {
                return [e[1], e[2], e[3], e[4]]
            }
        }, {
            re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
            parse: function(e) {
                return [2.55 * e[1], 2.55 * e[2], 2.55 * e[3], e[4]]
            }
        }, {
            re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,
            parse: function(e) {
                return [parseInt(e[1], 16), parseInt(e[2], 16), parseInt(e[3], 16)]
            }
        }, {
            re: /#([a-f0-9])([a-f0-9])([a-f0-9])/,
            parse: function(e) {
                return [parseInt(e[1] + e[1], 16), parseInt(e[2] + e[2], 16), parseInt(e[3] + e[3], 16)]
            }
        }, {
            re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
            space: "hsla",
            parse: function(e) {
                return [e[1], e[2] / 100, e[3] / 100, e[4]]
            }
        }], l = e.Color = function(t, i, s, a) {
            return new e.Color.fn.parse(t,i,s,a)
        }
        , u = {
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
        }, d = {
            "byte": {
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
        }, c = l.support = {}, p = e("<p>")[0], f = e.each;
        p.style.cssText = "background-color:rgba(1,1,1,.5)",
        c.rgba = p.style.backgroundColor.indexOf("rgba") > -1,
        f(u, function(e, t) {
            t.cache = "_" + e,
            t.props.alpha = {
                idx: 3,
                type: "percent",
                def: 1
            }
        }),
        l.fn = e.extend(l.prototype, {
            parse: function(a, r, o, h) {
                if (a === t)
                    return this._rgba = [null, null, null, null],
                    this;
                (a.jquery || a.nodeType) && (a = e(a).css(r),
                r = t);
                var d = this
                  , c = e.type(a)
                  , p = this._rgba = [];
                return r !== t && (a = [a, r, o, h],
                c = "array"),
                "string" === c ? this.parse(s(a) || n._default) : "array" === c ? (f(u.rgba.props, function(e, t) {
                    p[t.idx] = i(a[t.idx], t)
                }),
                this) : "object" === c ? (a instanceof l ? f(u, function(e, t) {
                    a[t.cache] && (d[t.cache] = a[t.cache].slice())
                }) : f(u, function(t, s) {
                    var n = s.cache;
                    f(s.props, function(e, t) {
                        if (!d[n] && s.to) {
                            if ("alpha" === e || null == a[e])
                                return;
                            d[n] = s.to(d._rgba)
                        }
                        d[n][t.idx] = i(a[e], t, !0)
                    }),
                    d[n] && 0 > e.inArray(null, d[n].slice(0, 3)) && (d[n][3] = 1,
                    s.from && (d._rgba = s.from(d[n])))
                }),
                this) : t
            },
            is: function(e) {
                var i = l(e)
                  , s = !0
                  , a = this;
                return f(u, function(e, n) {
                    var r, o = i[n.cache];
                    return o && (r = a[n.cache] || n.to && n.to(a._rgba) || [],
                    f(n.props, function(e, i) {
                        return null != o[i.idx] ? s = o[i.idx] === r[i.idx] : t
                    })),
                    s
                }),
                s
            },
            _space: function() {
                var e = []
                  , t = this;
                return f(u, function(i, s) {
                    t[s.cache] && e.push(i)
                }),
                e.pop()
            },
            transition: function(e, t) {
                var s = l(e)
                  , a = s._space()
                  , n = u[a]
                  , r = 0 === this.alpha() ? l("transparent") : this
                  , o = r[n.cache] || n.to(r._rgba)
                  , h = o.slice();
                return s = s[n.cache],
                f(n.props, function(e, a) {
                    var n = a.idx
                      , r = o[n]
                      , l = s[n]
                      , u = d[a.type] || {};
                    null !== l && (null === r ? h[n] = l : (u.mod && (l - r > u.mod / 2 ? r += u.mod : r - l > u.mod / 2 && (r -= u.mod)),
                    h[n] = i((l - r) * t + r, a)))
                }),
                this[a](h)
            },
            blend: function(t) {
                if (1 === this._rgba[3])
                    return this;
                var i = this._rgba.slice()
                  , s = i.pop()
                  , a = l(t)._rgba;
                return l(e.map(i, function(e, t) {
                    return (1 - s) * a[t] + s * e
                }))
            },
            toRgbaString: function() {
                var t = "rgba("
                  , i = e.map(this._rgba, function(e, t) {
                    return null == e ? t > 2 ? 1 : 0 : e
                });
                return 1 === i[3] && (i.pop(),
                t = "rgb("),
                t + i.join() + ")"
            },
            toHslaString: function() {
                var t = "hsla("
                  , i = e.map(this.hsla(), function(e, t) {
                    return null == e && (e = t > 2 ? 1 : 0),
                    t && 3 > t && (e = Math.round(100 * e) + "%"),
                    e
                });
                return 1 === i[3] && (i.pop(),
                t = "hsl("),
                t + i.join() + ")"
            },
            toHexString: function(t) {
                var i = this._rgba.slice()
                  , s = i.pop();
                return t && i.push(~~(255 * s)),
                "#" + e.map(i, function(e) {
                    return e = (e || 0).toString(16),
                    1 === e.length ? "0" + e : e
                }).join("")
            },
            toString: function() {
                return 0 === this._rgba[3] ? "transparent" : this.toRgbaString()
            }
        }),
        l.fn.parse.prototype = l.fn,
        u.hsla.to = function(e) {
            if (null == e[0] || null == e[1] || null == e[2])
                return [null, null, null, e[3]];
            var t, i, s = e[0] / 255, a = e[1] / 255, n = e[2] / 255, r = e[3], o = Math.max(s, a, n), h = Math.min(s, a, n), l = o - h, u = o + h, d = .5 * u;
            return t = h === o ? 0 : s === o ? 60 * (a - n) / l + 360 : a === o ? 60 * (n - s) / l + 120 : 60 * (s - a) / l + 240,
            i = 0 === l ? 0 : .5 >= d ? l / u : l / (2 - u),
            [Math.round(t) % 360, i, d, null == r ? 1 : r]
        }
        ,
        u.hsla.from = function(e) {
            if (null == e[0] || null == e[1] || null == e[2])
                return [null, null, null, e[3]];
            var t = e[0] / 360
              , i = e[1]
              , s = e[2]
              , n = e[3]
              , r = .5 >= s ? s * (1 + i) : s + i - s * i
              , o = 2 * s - r;
            return [Math.round(255 * a(o, r, t + 1 / 3)), Math.round(255 * a(o, r, t)), Math.round(255 * a(o, r, t - 1 / 3)), n]
        }
        ,
        f(u, function(s, a) {
            var n = a.props
              , r = a.cache
              , h = a.to
              , u = a.from;
            l.fn[s] = function(s) {
                if (h && !this[r] && (this[r] = h(this._rgba)),
                s === t)
                    return this[r].slice();
                var a, o = e.type(s), d = "array" === o || "object" === o ? s : arguments, c = this[r].slice();
                return f(n, function(e, t) {
                    var s = d["object" === o ? e : t.idx];
                    null == s && (s = c[t.idx]),
                    c[t.idx] = i(s, t)
                }),
                u ? (a = l(u(c)),
                a[r] = c,
                a) : l(c)
            }
            ,
            f(n, function(t, i) {
                l.fn[t] || (l.fn[t] = function(a) {
                    var n, r = e.type(a), h = "alpha" === t ? this._hsla ? "hsla" : "rgba" : s, l = this[h](), u = l[i.idx];
                    return "undefined" === r ? u : ("function" === r && (a = a.call(this, u),
                    r = e.type(a)),
                    null == a && i.empty ? this : ("string" === r && (n = o.exec(a),
                    n && (a = u + parseFloat(n[2]) * ("+" === n[1] ? 1 : -1))),
                    l[i.idx] = a,
                    this[h](l)))
                }
                )
            })
        }),
        l.hook = function(t) {
            var i = t.split(" ");
            f(i, function(t, i) {
                e.cssHooks[i] = {
                    set: function(t, a) {
                        var n, r, o = "";
                        if ("transparent" !== a && ("string" !== e.type(a) || (n = s(a)))) {
                            if (a = l(n || a),
                            !c.rgba && 1 !== a._rgba[3]) {
                                for (r = "backgroundColor" === i ? t.parentNode : t; ("" === o || "transparent" === o) && r && r.style; )
                                    try {
                                        o = e.css(r, "backgroundColor"),
                                        r = r.parentNode
                                    } catch (h) {}
                                a = a.blend(o && "transparent" !== o ? o : "_default")
                            }
                            a = a.toRgbaString()
                        }
                        try {
                            t.style[i] = a
                        } catch (h) {}
                    }
                },
                e.fx.step[i] = function(t) {
                    t.colorInit || (t.start = l(t.elem, i),
                    t.end = l(t.end),
                    t.colorInit = !0),
                    e.cssHooks[i].set(t.elem, t.start.transition(t.end, t.pos))
                }
            })
        }
        ,
        l.hook(r),
        e.cssHooks.borderColor = {
            expand: function(e) {
                var t = {};
                return f(["Top", "Right", "Bottom", "Left"], function(i, s) {
                    t["border" + s + "Color"] = e
                }),
                t
            }
        },
        n = e.Color.names = {
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
    function() {
        function i(t) {
            var i, s, a = t.ownerDocument.defaultView ? t.ownerDocument.defaultView.getComputedStyle(t, null) : t.currentStyle, n = {};
            if (a && a.length && a[0] && a[a[0]])
                for (s = a.length; s--; )
                    i = a[s],
                    "string" == typeof a[i] && (n[e.camelCase(i)] = a[i]);
            else
                for (i in a)
                    "string" == typeof a[i] && (n[i] = a[i]);
            return n
        }
        function s(t, i) {
            var s, a, r = {};
            for (s in i)
                a = i[s],
                t[s] !== a && (n[s] || (e.fx.step[s] || !isNaN(parseFloat(a))) && (r[s] = a));
            return r
        }
        var a = ["add", "remove", "toggle"]
          , n = {
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
        e.each(["borderLeftStyle", "borderRightStyle", "borderBottomStyle", "borderTopStyle"], function(t, i) {
            e.fx.step[i] = function(e) {
                ("none" !== e.end && !e.setAttr || 1 === e.pos && !e.setAttr) && (jQuery.style(e.elem, i, e.end),
                e.setAttr = !0)
            }
        }),
        e.fn.addBack || (e.fn.addBack = function(e) {
            return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
        }
        ),
        e.effects.animateClass = function(t, n, r, o) {
            var h = e.speed(n, r, o);
            return this.queue(function() {
                var n, r = e(this), o = r.attr("class") || "", l = h.children ? r.find("*").addBack() : r;
                l = l.map(function() {
                    var t = e(this);
                    return {
                        el: t,
                        start: i(this)
                    }
                }),
                n = function() {
                    e.each(a, function(e, i) {
                        t[i] && r[i + "Class"](t[i])
                    })
                }
                ,
                n(),
                l = l.map(function() {
                    return this.end = i(this.el[0]),
                    this.diff = s(this.start, this.end),
                    this
                }),
                r.attr("class", o),
                l = l.map(function() {
                    var t = this
                      , i = e.Deferred()
                      , s = e.extend({}, h, {
                        queue: !1,
                        complete: function() {
                            i.resolve(t)
                        }
                    });
                    return this.el.animate(this.diff, s),
                    i.promise()
                }),
                e.when.apply(e, l.get()).done(function() {
                    n(),
                    e.each(arguments, function() {
                        var t = this.el;
                        e.each(this.diff, function(e) {
                            t.css(e, "")
                        })
                    }),
                    h.complete.call(r[0])
                })
            })
        }
        ,
        e.fn.extend({
            addClass: function(t) {
                return function(i, s, a, n) {
                    return s ? e.effects.animateClass.call(this, {
                        add: i
                    }, s, a, n) : t.apply(this, arguments)
                }
            }(e.fn.addClass),
            removeClass: function(t) {
                return function(i, s, a, n) {
                    return arguments.length > 1 ? e.effects.animateClass.call(this, {
                        remove: i
                    }, s, a, n) : t.apply(this, arguments)
                }
            }(e.fn.removeClass),
            toggleClass: function(i) {
                return function(s, a, n, r, o) {
                    return "boolean" == typeof a || a === t ? n ? e.effects.animateClass.call(this, a ? {
                        add: s
                    } : {
                        remove: s
                    }, n, r, o) : i.apply(this, arguments) : e.effects.animateClass.call(this, {
                        toggle: s
                    }, a, n, r)
                }
            }(e.fn.toggleClass),
            switchClass: function(t, i, s, a, n) {
                return e.effects.animateClass.call(this, {
                    add: i,
                    remove: t
                }, s, a, n)
            }
        })
    }(),
    function() {
        function s(t, i, s, a) {
            return e.isPlainObject(t) && (i = t,
            t = t.effect),
            t = {
                effect: t
            },
            null == i && (i = {}),
            e.isFunction(i) && (a = i,
            s = null,
            i = {}),
            ("number" == typeof i || e.fx.speeds[i]) && (a = s,
            s = i,
            i = {}),
            e.isFunction(s) && (a = s,
            s = null),
            i && e.extend(t, i),
            s = s || i.duration,
            t.duration = e.fx.off ? 0 : "number" == typeof s ? s : s in e.fx.speeds ? e.fx.speeds[s] : e.fx.speeds._default,
            t.complete = a || i.complete,
            t
        }
        function a(t) {
            return !t || "number" == typeof t || e.fx.speeds[t] ? !0 : "string" != typeof t || e.effects.effect[t] ? e.isFunction(t) ? !0 : "object" != typeof t || t.effect ? !1 : !0 : !0
        }
        e.extend(e.effects, {
            version: "1.10.4",
            save: function(e, t) {
                for (var s = 0; t.length > s; s++)
                    null !== t[s] && e.data(i + t[s], e[0].style[t[s]])
            },
            restore: function(e, s) {
                var a, n;
                for (n = 0; s.length > n; n++)
                    null !== s[n] && (a = e.data(i + s[n]),
                    a === t && (a = ""),
                    e.css(s[n], a))
            },
            setMode: function(e, t) {
                return "toggle" === t && (t = e.is(":hidden") ? "show" : "hide"),
                t
            },
            getBaseline: function(e, t) {
                var i, s;
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
                    s = 0;
                    break;
                case "center":
                    s = .5;
                    break;
                case "right":
                    s = 1;
                    break;
                default:
                    s = e[1] / t.width
                }
                return {
                    x: s,
                    y: i
                }
            },
            createWrapper: function(t) {
                if (t.parent().is(".ui-effects-wrapper"))
                    return t.parent();
                var i = {
                    width: t.outerWidth(!0),
                    height: t.outerHeight(!0),
                    "float": t.css("float")
                }
                  , s = e("<div></div>").addClass("ui-effects-wrapper").css({
                    fontSize: "100%",
                    background: "transparent",
                    border: "none",
                    margin: 0,
                    padding: 0
                })
                  , a = {
                    width: t.width(),
                    height: t.height()
                }
                  , n = document.activeElement;
                try {
                    n.id
                } catch (r) {
                    n = document.body
                }
                return t.wrap(s),
                (t[0] === n || e.contains(t[0], n)) && e(n).focus(),
                s = t.parent(),
                "static" === t.css("position") ? (s.css({
                    position: "relative"
                }),
                t.css({
                    position: "relative"
                })) : (e.extend(i, {
                    position: t.css("position"),
                    zIndex: t.css("z-index")
                }),
                e.each(["top", "left", "bottom", "right"], function(e, s) {
                    i[s] = t.css(s),
                    isNaN(parseInt(i[s], 10)) && (i[s] = "auto")
                }),
                t.css({
                    position: "relative",
                    top: 0,
                    left: 0,
                    right: "auto",
                    bottom: "auto"
                })),
                t.css(a),
                s.css(i).show()
            },
            removeWrapper: function(t) {
                var i = document.activeElement;
                return t.parent().is(".ui-effects-wrapper") && (t.parent().replaceWith(t),
                (t[0] === i || e.contains(t[0], i)) && e(i).focus()),
                t
            },
            setTransition: function(t, i, s, a) {
                return a = a || {},
                e.each(i, function(e, i) {
                    var n = t.cssUnit(i);
                    n[0] > 0 && (a[i] = n[0] * s + n[1])
                }),
                a
            }
        }),
        e.fn.extend({
            effect: function() {
                function t(t) {
                    function s() {
                        e.isFunction(n) && n.call(a[0]),
                        e.isFunction(t) && t()
                    }
                    var a = e(this)
                      , n = i.complete
                      , o = i.mode;
                    (a.is(":hidden") ? "hide" === o : "show" === o) ? (a[o](),
                    s()) : r.call(a[0], i, s)
                }
                var i = s.apply(this, arguments)
                  , a = i.mode
                  , n = i.queue
                  , r = e.effects.effect[i.effect];
                return e.fx.off || !r ? a ? this[a](i.duration, i.complete) : this.each(function() {
                    i.complete && i.complete.call(this)
                }) : n === !1 ? this.each(t) : this.queue(n || "fx", t)
            },
            show: function(e) {
                return function(t) {
                    if (a(t))
                        return e.apply(this, arguments);
                    var i = s.apply(this, arguments);
                    return i.mode = "show",
                    this.effect.call(this, i)
                }
            }(e.fn.show),
            hide: function(e) {
                return function(t) {
                    if (a(t))
                        return e.apply(this, arguments);
                    var i = s.apply(this, arguments);
                    return i.mode = "hide",
                    this.effect.call(this, i)
                }
            }(e.fn.hide),
            toggle: function(e) {
                return function(t) {
                    if (a(t) || "boolean" == typeof t)
                        return e.apply(this, arguments);
                    var i = s.apply(this, arguments);
                    return i.mode = "toggle",
                    this.effect.call(this, i)
                }
            }(e.fn.toggle),
            cssUnit: function(t) {
                var i = this.css(t)
                  , s = [];
                return e.each(["em", "px", "%", "pt"], function(e, t) {
                    i.indexOf(t) > 0 && (s = [parseFloat(i), t])
                }),
                s
            }
        })
    }(),
    function() {
        var t = {};
        e.each(["Quad", "Cubic", "Quart", "Quint", "Expo"], function(e, i) {
            t[i] = function(t) {
                return Math.pow(t, e + 2)
            }
        }),
        e.extend(t, {
            Sine: function(e) {
                return 1 - Math.cos(e * Math.PI / 2)
            },
            Circ: function(e) {
                return 1 - Math.sqrt(1 - e * e)
            },
            Elastic: function(e) {
                return 0 === e || 1 === e ? e : -Math.pow(2, 8 * (e - 1)) * Math.sin((80 * (e - 1) - 7.5) * Math.PI / 15)
            },
            Back: function(e) {
                return e * e * (3 * e - 2)
            },
            Bounce: function(e) {
                for (var t, i = 4; ((t = Math.pow(2, --i)) - 1) / 11 > e; )
                    ;
                return 1 / Math.pow(4, 3 - i) - 7.5625 * Math.pow((3 * t - 2) / 22 - e, 2)
            }
        }),
        e.each(t, function(t, i) {
            e.easing["easeIn" + t] = i,
            e.easing["easeOut" + t] = function(e) {
                return 1 - i(1 - e)
            }
            ,
            e.easing["easeInOut" + t] = function(e) {
                return .5 > e ? i(2 * e) / 2 : 1 - i(-2 * e + 2) / 2
            }
        })
    }()
}
)(jQuery);
(function(e) {
    e.effects.effect.drop = function(t, i) {
        var s, a = e(this), n = ["position", "top", "bottom", "left", "right", "opacity", "height", "width"], r = e.effects.setMode(a, t.mode || "hide"), o = "show" === r, h = t.direction || "left", l = "up" === h || "down" === h ? "top" : "left", u = "up" === h || "left" === h ? "pos" : "neg", d = {
            opacity: o ? 1 : 0
        };
        e.effects.save(a, n),
        a.show(),
        e.effects.createWrapper(a),
        s = t.distance || a["top" === l ? "outerHeight" : "outerWidth"](!0) / 2,
        o && a.css("opacity", 0).css(l, "pos" === u ? -s : s),
        d[l] = (o ? "pos" === u ? "+=" : "-=" : "pos" === u ? "-=" : "+=") + s,
        a.animate(d, {
            queue: !1,
            duration: t.duration,
            easing: t.easing,
            complete: function() {
                "hide" === r && a.hide(),
                e.effects.restore(a, n),
                e.effects.removeWrapper(a),
                i()
            }
        })
    }
}
)(jQuery);
!function(a, b, c, d, e, f) {
    "use strict";
    function g(a) {
        var b = ""
          , c = t[a.which];
        return c && (a.which >= 112 && a.which <= 123 || a.which >= 33 && a.which <= 46 || a.ctrlKey || a.altKey || a.metaKey) ? (a.ctrlKey && (b += "Ctrl+"),
        a.altKey && (b += "Alt+"),
        a.metaKey && (b += "Meta+"),
        a.shiftKey && (b += "Shift+"),
        b += c) : null
    }
    function h(a) {
        var b = a.label;
        return !b && a.onLabel && a.offLabel ? b = a.onLabel + "/" + a.offLabel : a.set && a.get && !a.choices && (b = c.formatMessage("APEX.ACTIONS.TOGGLE", b)),
        b
    }
    function i(a) {
        var b;
        return b = a.id ? e("[for=" + a.id + "]") : e(a).closest("label")
    }
    function j(a, b) {
        var d, e, f;
        for (d = 0; d < b.length; d++)
            e = b[d],
            f = e + "Key",
            a[f] && (a[e] = c.getMessage(a[f]),
            delete a[f])
    }
    function k(c, d) {
        function f(a, b) {
            var c, d;
            for (c = 0; c < l.length; c++)
                (d = l[c])(a, b)
        }
        var g = {}
          , i = {}
          , k = {}
          , l = []
          , m = !1
          , n = 0;
        return {
            typeName: c,
            context: d,
            add: function(a) {
                var c, d, h, l, m = !0;
                for (e.isArray(a) || (a = [a]),
                c = 0; c < a.length; c++)
                    if (h = a[c],
                    h.name)
                        if (g[h.name])
                            b.warn("Duplicate action '" + h.name + "' ignored."),
                            m = !1;
                        else {
                            if (g[h.name] = h,
                            h.shortcut && (this.isValidShortcut(h.shortcut) ? h.choices ? (b.warn("Shortcut '" + h.shortcut + "' for radio group action '" + h.name + "' ignored."),
                            h.shortcut = null,
                            m = !1) : k[h.shortcut] ? (b.warn("Duplicate shortcut '" + h.shortcut + "' for action '" + h.name + "' ignored."),
                            h.shortcut = null,
                            m = !1) : (i[h.name] = h.shortcut,
                            k[h.shortcut] = h.name) : (b.warn("Invalid shortcut '" + h.shortcut + "' for action '" + h.name + "' ignored."),
                            h.shortcut = null,
                            m = !1)),
                            j(h, ["label", "onLabel", "offLabel", "title"]),
                            h.choices)
                                for (d = 0; d < h.choices.length; d++)
                                    l = h.choices[d],
                                    l.shortcut && (this.isValidShortcut(l.shortcut) ? k[l.shortcut] ? (b.warn("Duplicate shortcut '" + l.shortcut + "' for action '" + h.name + "' ignored."),
                                    l.shortcut = null,
                                    m = !1) : (i[h.name + s + l.value] = l.shortcut,
                                    k[l.shortcut] = {
                                        actionName: h.name,
                                        value: l.value
                                    }) : (b.warn("Invalid shortcut '" + l.shortcut + "' for action '" + h.name + "' ignored."),
                                    l.shortcut = null,
                                    m = !1)),
                                    j(l, ["label", "group", "title"]);
                            f(h, "add")
                        }
                return m
            },
            addFromMarkup: function(a) {
                var b = this;
                a.children("ul").children("li").each(function() {
                    var a, c, d, f = null, g = e(this), h = g.children("a").eq(0), i = g.children("span").eq(0);
                    a = {},
                    h.length > 0 ? (a.label = h.text(),
                    a.href = h.attr("href"),
                    f = h.attr("title")) : i.length > 0 && (a.label = i.text(),
                    f = i.attr("title")),
                    f && (a.title = f),
                    a.name = g.attr("data-id"),
                    "true" === g.attr("data-hide") && (a.hide = !0),
                    "true" === g.attr("data-disabled") && (a.disabled = !0),
                    a.shortcut = g.attr("data-shortcut") || null,
                    c = g.attr("data-icon"),
                    c && (d = c.indexOf(" "),
                    d >= 0 ? (a.iconType = c.substring(0, d),
                    a.icon = c.substring(d + 1)) : a.icon = c),
                    a.name && a.label && "separator" !== a.href && b.add(a),
                    g.children("ul").length > 0 && b.addFromMarkup(g)
                })
            },
            remove: function(a) {
                var b, c, d, h, j, l;
                for (e.isArray(a) || (a = [a]),
                b = 0; b < a.length; b++)
                    if (h = a[b],
                    j = "string" == typeof h ? h : h.name,
                    j && g[j]) {
                        if (h = g[j],
                        l = h.shortcut,
                        l && delete k[l],
                        h.choices)
                            for (c = 0; c < h.choices.length; c++)
                                d = h.choices[c],
                                l = d.shortcut,
                                l && (delete k[l],
                                delete i[j + s + d.value]);
                        delete g[j],
                        delete i[j],
                        f(h, "remove")
                    }
            },
            clear: function() {
                var a, b;
                for (a in g)
                    b = g[a],
                    f(b, "remove");
                g = {},
                i = {},
                k = {}
            },
            lookup: function(a) {
                return g[a]
            },
            list: function() {
                var a, b, c, d, e, f, i = [];
                for (c in g)
                    if (d = g[c],
                    e = h(d),
                    d.choices)
                        for (a = 0; a < d.choices.length; a++)
                            b = d.choices[a],
                            f = e ? e + ": " + b.label : b.label,
                            i.push({
                                name: c,
                                choice: b.value,
                                label: f
                            });
                    else
                        i.push({
                            name: c,
                            label: e
                        });
                return i
            },
            update: function(a) {
                var c, d, e, h = g[a], l = i[a], m = !0;
                if (h.shortcut !== l && (delete k[l],
                h.shortcut ? this.isValidShortcut(h.shortcut) ? k[h.shortcut] ? (b.warn("Duplicate shortcut '" + h.shortcut + "' for action '" + a + "' ignored."),
                h.shortcut = null,
                m = !1) : (i[a] = h.shortcut,
                k[h.shortcut] = a) : (b.warn("Invalid shortcut '" + h.shortcut + "' for action '" + a + "' ignored."),
                h.shortcut = null,
                m = !1) : delete i[a]),
                j(h, ["label", "onLabel", "offLabel", "title"]),
                h.choices)
                    for (c = 0; c < h.choices.length; c++)
                        d = h.choices[c],
                        e = a + s + d.value,
                        l = i[e],
                        d.shortcut !== l && (delete k[l],
                        d.shortcut ? this.isValidShortcut(d.shortcut) ? k[d.shortcut] ? (b.warn("Duplicate shortcut '" + d.shortcut + "' for action '" + a + "' ignored."),
                        d.shortcut = null,
                        m = !1) : (i[e] = d.shortcut,
                        k[d.shortcut] = {
                            actionName: a,
                            value: d.value
                        }) : (b.warn("Invalid shortcut '" + d.shortcut + "' for action '" + a + "' ignored."),
                        d.shortcut = null,
                        m = !1) : delete i[e]),
                        j(d, ["label", "group", "title"]);
                return f(h, "update"),
                m
            },
            updateChoices: function(a) {
                var b = g[a]
                  , c = !1;
                return b.choices && (f(b, "updateChoices"),
                c = !0),
                c
            },
            enable: function(a) {
                var b = g[a];
                b && b.disabled && (b.disabled = !1,
                f(b, "update"))
            },
            disable: function(a) {
                var b = g[a];
                b && !b.disabled && (b.disabled = !0,
                f(b, "update"))
            },
            hide: function(a) {
                var b = g[a];
                b && !b.hide && (b.hide = !0,
                f(b, "update"))
            },
            show: function(a) {
                var b = g[a];
                b && b.hide && (b.hide = !1,
                f(b, "update"))
            },
            invoke: function(c, d, e) {
                var f = g[c];
                return f && (f.action || f.href) ? f.disabled || f.hide ? void 0 : f.action ? f.action(d, e) : (a.navigation.redirect(f.href),
                !0) : (b.error("No such action '" + c + "' or action can't be invoked."),
                !1)
            },
            toggle: function(a) {
                var c, d = g[a];
                return d && d.get && d.set && !d.choices ? void (d.disabled || d.hide || (c = !d.get(),
                d.set(c),
                this.update(a))) : (b.error("No such action '" + a + "' or action cannot be toggled."),
                !1)
            },
            get: function(a) {
                var c = g[a];
                return c && c.get ? c.get() : (b.error("No such action '" + a + "' or cannot get action value."),
                null)
            },
            set: function(a, c) {
                var d = g[a];
                d && d.get && d.set ? d.disabled || d.hide || (d.choices || (c = !!c),
                d.set(c),
                this.update(a)) : b.error("No such action '" + a + "' or cannot set action value.")
            },
            lookupShortcutAction: function(a) {
                if (!m)
                    return k[a]
            },
            addShortcut: function(a, c, d) {
                var e, f, h = g[c];
                if (!h)
                    return b.warn("No such action '" + c + "'."),
                    !1;
                if (k[a])
                    return b.warn("Duplicate shortcut '" + a + "' for action '" + c + "' ignored."),
                    !1;
                if (h.choices) {
                    if (!d)
                        return b.warn("Shortcut '" + a + "' for radio group action '" + c + "' ignored."),
                        !1;
                    for (f = !1,
                    e = 0; e < h.choices.length; e++)
                        if (h.choices[e].value === d) {
                            f = !0;
                            break
                        }
                    if (!f)
                        return b.warn("No such choice '" + d + " for action '" + c + "'."),
                        !1;
                    k[a] = {
                        actionName: c,
                        value: d
                    }
                } else
                    k[a] = c;
                return !0
            },
            removeShortcut: function(a) {
                var c;
                return c = k[a],
                c && "string" != typeof c && (c = c.actionName + s + c.value),
                i[c] === a ? (b.warn("Can't delete primary for action."),
                !1) : (delete k[a],
                !0)
            },
            listShortcuts: function() {
                var a, b, c, d, e, f, i, j = [];
                for (b in k) {
                    if (c = k[b],
                    "string" != typeof c && (e = c.value,
                    c = c.actionName),
                    d = g[c],
                    f = {
                        shortcut: b,
                        shortcutDisplay: this.shortcutDisplay(b),
                        actionName: c
                    },
                    e && d.choices) {
                        for (f.choice = e,
                        a = 0; a < d.choices.length; a++)
                            if (d.choices[a].value === e) {
                                i = h(d),
                                i ? i += ":" + d.choices[a].label : i = d.choices[a].label,
                                f.actionLabel = i;
                                break
                            }
                    } else
                        f.actionLabel = h(d);
                    j.push(f)
                }
                return j
            },
            shortcutDisplay: function(a) {
                var b, c = "", d = a.split("+");
                for (b = 0; b < d.length; b++)
                    b > 0 && (c += "+"),
                    c += u ? "Alt" === d[b] ? "Option" : "Meta" === d[b] ? "⌘" : d[b] : d[b];
                return c
            },
            disableShortcuts: function() {
                n += 1,
                n > 0 && (m = !0)
            },
            enableShortcuts: function() {
                n -= 1,
                n <= 0 && (m = !1,
                n = 0)
            },
            observe: function(a) {
                l.push(a)
            },
            unobserve: function(a) {
                var b;
                for (b = 0; b < l.length; b++)
                    if (l[b] === a) {
                        l.splice(b, 1);
                        break
                    }
            },
            isValidShortcut: function(a, b) {
                var c, d, e, f, g = 0, h = !0, i = a.split("+");
                for (c = 0; c < i.length - 1; c++) {
                    if (d = i[c],
                    "Ctrl" === d)
                        e = 1;
                    else if ("Alt" === d)
                        e = 2;
                    else if ("Meta" === d)
                        e = 3;
                    else {
                        if ("Shift" !== d) {
                            h = !1;
                            break
                        }
                        e = 4
                    }
                    if (e <= g) {
                        h = !1;
                        break
                    }
                    g = e
                }
                if (h) {
                    d = i[c],
                    h = !1;
                    for (f in t)
                        if (t[f] === d) {
                            h = !0;
                            break
                        }
                    h && 0 === g && 1 === d.length && (h = !1),
                    h && b && k[a] && (h = !1)
                }
                return h
            }
        }
    }
    function l(a, c) {
        function h(a, c, d, e) {
            var g, h, i;
            try {
                if (g = s.lookup(a),
                !g)
                    return void b.error("No such action '" + a + "'.");
                if (g.disabled)
                    return;
                if (g.action || g.href) {
                    if (b.info(d + " invoke action '" + a + "'"),
                    h = s.invoke(a, c, c.target),
                    h === !1)
                        return
                } else
                    g.get && g.set ? (e !== f ? (g.set(e),
                    b.info(d + " set action '" + a + "'. Value now " + e)) : (i = !g.get(),
                    g.set(i),
                    b.info(d + " toggle action '" + a + "'. Value now " + i)),
                    s.update(a)) : b.error("Error action '" + a + "' has no href or action, get, or set methods.")
            } catch (j) {
                b.error("Error in action for '" + a + "'.", j)
            }
            h !== !0 && c.target.focus()
        }
        var j, l = e(c), s = k(a, c);
        return m(a, c),
        j = z[a],
        j || (j = [],
        z[a] = j),
        j.push(s),
        s.observe(function(a, b) {
            function c(a, b, c) {
                a.find("." + b).each(function() {
                    var a = e(this)
                      , d = []
                      , f = a.attr("class");
                    e.each(f.split(" "), function(a, b) {
                        /^t-/.test(b) && d.push(b)
                    }),
                    d.push(b),
                    d.push(c),
                    a.attr("class", d.join(" "))
                })
            }
            var g = a.name
              , h = e("[data-action=" + g + "]", l);
            "remove" !== b ? h.each(function() {
                var g, h, j, k, l, m, s, t, u, z, A, B, C, D, E, F, G, H, I, J, K, L = !1, M = "action", N = e(this);
                if (a.hide)
                    return void N.hide();
                if (N.show(),
                a.get && (M = a.choices ? "radio" : "toggle",
                u = a.get()),
                N.is(p) ? J = "select" : N.is(o) ? J = "radio" : N.is(q) ? (J = "checkbox",
                A = N,
                "INPUT" !== A[0].nodeName && (A = N.find("input")),
                B = i(A[0]),
                B.is(v) ? (L = !0,
                C = N.find(w).first(),
                C.length || (C = B)) : C = B) : N.is(n) && (J = "button",
                C = N.find(w).first(),
                C.length || (C = N)),
                "updateChoices" === b || "add" === b && "radio" === M && 0 === N.children().length) {
                    if (h = d.htmlBuilder(),
                    "select" === J)
                        for (k = null,
                        g = 0; g < a.choices.length; g++)
                            j = a.choices[g],
                            j.hide || (j.group !== f && j.group !== k && (null !== k && h.markup("</optgroup>"),
                            null !== j.group && h.markup("<optgroup").attr("label", j.group).markup(">"),
                            k = j.group),
                            h.markup("<option").attr("value", j.value).markup(">").content(j.label).markup("</option>"));
                    else if ("radio" === J)
                        for (D = N.closest("[id]")[0].id + "_" + a.name,
                        E = N.attr("data-item-start") || a.labelStartClasses,
                        F = N.attr("data-item") || a.labelClasses,
                        G = N.attr("data-item-end") || a.labelClasses,
                        I = N.attr("data-item-wrap") || a.itemWrapClasses || !1,
                        H = !1,
                        I && (H = !!I && "span",
                        I && I.indexOf(":") > 0 && (I = I.split(":"),
                        H = I[0],
                        I = I[1]),
                        H && 1 !== {
                            p: 1,
                            li: 1,
                            span: 1,
                            div: 1
                        }[H] && (H = "span")),
                        g = 0; g < a.choices.length; g++)
                            j = a.choices[g],
                            j.hide || (l = D + "_" + g,
                            m = 0 === g && E ? E : g === a.choices.length - 1 && G ? G : F || "",
                            H && h.markup("<" + H).attr("class", I).markup(">"),
                            h.markup("<input type='radio'").attr("name", D).attr("id", l).attr("value", j.value).markup("><label").attr("for", l).attr("class", m).attr("title", j.title || j.icon ? j.title || j.label : null).markup(">"),
                            j.icon ? h.markup("<span class='u-VisuallyHidden'>").content(j.label).markup("</span><span aria-hidden='true'").attr("class", (j.iconType || "a-Icon") + " " + j.icon).markup("></span>") : h.content(j.label),
                            h.markup("</label>"),
                            H && h.markup("</" + H + ">"));
                    N.html(h.toString())
                } else
                    "add" === b && (null === a.label && ("button" === J && "action" === M ? N.attr(r) ? a.label = N.attr(r) : N.is(y) ? a.label = N.attr("title") : a.label = C.text() : "checkbox" === J && "toggle" === M ? L && B.is(y) ? (a.label = B.find(".u-VisuallyHidden").first().text(),
                    a.label || (a.label = B.attr("title"))) : a.label = C.text() : N.attr(r) && (a.label = N.attr(r))),
                    null === a.title && "radio" !== J && (a.title = N.attr("title"),
                    !a.title && B && (a.title = B.attr("title")),
                    !a.label && a.title && (a.label = a.title)),
                    null === a.disabled && (N.prop("disabled") || A && A.prop("disabled")) && (a.disabled = !0));
                if (t = a.label,
                z = a.title,
                t || "toggle" !== M || (t = u ? a.onLabel : a.offLabel),
                N.attr("data-no-update") === f && ("button" === J && N.is(y) ? (N.attr(r, t),
                z || (z = t)) : "checkbox" === J && "toggle" === M && L && B.is(y) ? (B.find(".u-VisuallyHidden").first().text(t),
                z || (z = t)) : "radio" === M ? (t ? N.attr(r, t) : N.removeAttr(r),
                "select" !== J || z || (z = t)) : C && C.text(t),
                "radio" !== J && (z ? N.attr("title", z) : N.removeAttr("title")),
                "button" === J && a.icon && N.is(x) ? (s = a.iconType || "a-Icon",
                c(N, s, a.icon)) : L && a.icon && B.is(x) && (s = a.iconType || "a-Icon",
                c(B, s, a.icon))),
                "action" !== M && ("select" === J ? N.val(u) : "radio" === J ? (N.find(".is-active").removeClass("is-active"),
                A = N.find("[value=" + d.escapeCSS(u) + "]"),
                A.prop("checked", !0),
                A.length && (B = i(A[0]),
                B.addClass("is-active"))) : "checkbox" === J ? (A.prop("checked", !!u),
                B.toggleClass("is-active", u)) : N.is(n) && ("toggle" !== M || a.onLabel || N.toggleClass("is-active", u))),
                "checkbox" === J && A.prop("disabled", !!a.disabled),
                "radio" === J || "select" === J) {
                    for (K = N.find("option,input"),
                    g = 0; g < a.choices.length; g++)
                        j = a.choices[g],
                        K.eq(g).prop("disabled", !!j.disabled);
                    "select" === J && N.prop("disabled", !!a.disabled)
                } else
                    N.prop("disabled", !!a.disabled)
            }) : h.hide()
        }),
        l.on("click.actions", n, function(a) {
            var b = e(this).attr("data-action");
            h(b, a, "Button click"),
            a.stopPropagation()
        }).on("click.actions", q, function(a) {
            var b, c = e(this).attr("data-action");
            "INPUT" === a.target.nodeName && (b = a.target,
            h(c, a, "Checkbox click", b.checked),
            a.stopPropagation())
        }).on("change.actions", o, function(a) {
            var b, c, d = e(this).attr("data-action");
            c = e(this).find(":checked"),
            b = "",
            c.length && (b = c.val()),
            h(d, a, "Radio group change", b),
            a.stopPropagation()
        }).on("change.actions", p, function(a) {
            var b, c = e(this).attr("data-action"), d = e(this);
            b = d.val(),
            h(c, a, "Select change", b),
            a.stopPropagation()
        }).on("keydown.actions", function(a) {
            var b, c, d = g(a);
            if (d) {
                if (("TEXTAREA" === a.target.nodeName || "INPUT" === a.target.nodeName && "text" === a.target.type.toLowerCase()) && ["Ctrl+C", "Ctrl+X", "Ctrl+V", "Ctrl+A", "Ctrl+Z", "Ctrl+Y"].indexOf(d) >= 0)
                    return;
                b = s.lookupShortcutAction(d),
                b && ("string" != typeof b && (c = b.value,
                b = b.actionName),
                h(b, a, "Shortcut key", c),
                a.stopPropagation())
            }
        }).on("menubeforeopen.actions", function() {
            s.disableShortcuts()
        }).on("menuafterclose.actions", function() {
            s.enableShortcuts()
        }).on("dialogopen.actions", function(a) {
            a.target !== s.context && e(a.target).dialog("option", "modal") && s.disableShortcuts()
        }).on("dialogclose.actions", function(a) {
            a.target !== s.context && e(a.target).dialog("option", "modal") && s.enableShortcuts()
        }),
        s
    }
    function m(a, b) {
        var c, d, f;
        if (d = z[a])
            for (c = 0; c < d.length; c++)
                if (d[c].context === b)
                    return f = e(d[c].context),
                    f.off(".actions"),
                    void d.splice(c, 1)
    }
    var n = ".js-actionButton"
      , o = ".js-actionRadioGroup"
      , p = ".js-actionSelect"
      , q = ".js-actionCheckbox"
      , r = "aria-label"
      , s = ">"
      , t = {
        6: "Help",
        8: "Backspace",
        9: "Tab",
        13: "Enter",
        27: "Escape",
        32: "Space",
        33: "Page Up",
        34: "Page Down",
        35: "End",
        36: "Home",
        37: "Left",
        38: "Up",
        39: "Right",
        40: "Down",
        45: "Insert",
        46: "Delete",
        48: "0",
        49: "1",
        50: "2",
        51: "3",
        52: "4",
        53: "5",
        54: "6",
        55: "7",
        56: "8",
        57: "9",
        65: "A",
        66: "B",
        67: "C",
        68: "D",
        69: "E",
        70: "F",
        71: "G",
        72: "H",
        73: "I",
        74: "J",
        75: "K",
        76: "L",
        77: "M",
        78: "N",
        79: "O",
        80: "P",
        81: "Q",
        82: "R",
        83: "S",
        84: "T",
        85: "U",
        86: "V",
        87: "W",
        88: "X",
        89: "Y",
        90: "Z",
        96: "Keypad 0",
        97: "Keypad 1",
        98: "Keypad 2",
        99: "Keypad 3",
        100: "Keypad 4",
        101: "Keypad 5",
        102: "Keypad 6",
        103: "Keypad 7",
        104: "Keypad 8",
        105: "Keypad 9",
        106: "Keypad *",
        107: "Keypad +",
        109: "Keypad -",
        110: "Keypad .",
        111: "Keypad /",
        112: "F1",
        113: "F2",
        114: "F3",
        115: "F4",
        116: "F5",
        117: "F6",
        118: "F7",
        119: "F8",
        120: "F9",
        121: "F10",
        122: "F11",
        123: "F12",
        188: "Comma",
        190: "Period",
        191: "/",
        192: "`",
        219: "[",
        220: "\\",
        221: "]"
    }
      , u = navigator.appVersion.indexOf("Mac") >= 0
      , v = ".a-Button, .t-Button"
      , w = ".a-Button-label, .t-Button-label"
      , x = ".a-Button--withIcon, .t-Button--icon"
      , y = ".a-Button--noLabel, .t-Button--noLabel"
      , z = {};
    a.actions = l("global", document.body),
    a.actions.createContext = l,
    a.actions.removeContext = m,
    a.actions.getContextsForType = function(a) {
        return z[a] || []
    }
    ,
    a.actions.findContext = function(a, b) {
        function c(a) {
            var c;
            for (c = 0; c < a.length; c++)
                if (a[c].context === b)
                    return a[c]
        }
        var d, e, f;
        if (b || (b = a,
        a = null),
        a)
            e = z[a],
            e && (f = c(e));
        else
            for (d in z)
                if (f = c(z[d]))
                    break;
        return f
    }
    ,
    a.actions.getShortcutFromEvent = function(a) {
        var b = g(a);
        return b ? {
            shortcut: b,
            shortcutDisplay: this.shortcutDisplay(b)
        } : null
    }
}(apex, apex.debug, apex.lang, apex.util, apex.jQuery);
!function(a, b, c) {
    a.checkboxAndRadio = function(d, e, f) {
        function g() {
            b.mobile ? l.children("div.ui-controlgroup-controls").empty() : l.children(":not(legend)").remove()
        }
        function h() {
            l.trigger("apexrefresh")
        }
        function i(a) {
            b.mobile ? (b("div.ui-controlgroup-controls", l).append(a.html),
            b(":" + e, l).checkboxradio(),
            l.controlgroup()) : l.append(a.html)
        }
        function j(c) {
            a.util.cascadingLov(l, k.ajaxIdentifier, {
                x01: k.inputName,
                pageItems: b(k.pageItemsToSubmit, apex.gPageContext$)
            }, {
                optimizeRefresh: k.optimizeRefresh,
                dependingOn: b(k.dependingOnSelector, apex.gPageContext$),
                success: function(a) {
                    i(a),
                    a.hasOwnProperty("default") && $s(l[0], a["default"])
                },
                clear: g,
                target: c.target
            })
        }
        var k = b.extend({
            action: null,
            nullValue: "",
            inputName: null
        }, f)
          , l = b(d, apex.gPageContext$);
        b(d, apex.gPageContext$).each(function() {
            var f = this
              , h = {
                enable: function() {
                    b(":" + e, f).prop("disabled", !1).removeClass("apex_disabled_multi")
                },
                disable: function() {
                    b(":" + e, f).prop("disabled", !0).addClass("apex_disabled_multi")
                },
                isDisabled: function() {
                    return b(":" + e, f).first().prop("disabled") === !0
                },
                setValue: function(a) {
                    var d = b(":" + e, f)
                      , g = [];
                    d.prop("checked", !1),
                    "checkbox" === e ? g = apex.util.toArray(a) : g[0] = a;
                    for (var h = 0; h < g.length; h++)
                        d.filter("[value='" + c.escapeCSS(g[h]) + "']").prop("checked", !0)
                },
                getValue: function() {
                    var a, c;
                    return "checkbox" === e ? (a = [],
                    b(":checked", f).each(function() {
                        a[a.length] = this.value
                    })) : (c = b(d + " :checked", apex.gPageContext$),
                    a = 0 === c.length ? "" : c.val()),
                    a
                },
                afterModify: function() {
                    b.mobile && b(":" + e, f).checkboxradio("refresh")
                },
                nullValue: k.nullValue,
                setFocusTo: b(":" + e, f).first(),
                loadingIndicator: function(a) {
                    var c;
                    return c = b.mobile ? a.appendTo(b("div.ui-controlgroup-controls", l)) : a.appendTo(l)
                },
                displayValueFor: function(a) {
                    var c, d, e, g, h = "", i = b(f);
                    if (null !== a && void 0 !== a)
                        for (b.isArray(a) || (a = [a]),
                        c = 0; c < a.length; c++)
                            d = a[c],
                            void 0 !== d && null !== d && (e = i.find("[value='" + apex.util.escapeCSS(d + "") + "']").prop("id"),
                            e && (g = i.find("[for='" + apex.util.escapeCSS(e) + "']").html(),
                            void 0 !== g && (h.length > 0 && (h += ", "),
                            h += g)));
                    return h
                }
            };
            k.dependingOnSelector && (h.reinit = function(d) {
                var f, h = this, j = b.isArray(d) ? d : [d];
                for (g(),
                f = 0; f < j.length; f++)
                    l.append("<input type='" + e + "' value='" + c.escapeHTML(j[f]) + "'>");
                return this.setValue(d, null, !0),
                function() {
                    a.util.cascadingLov(l, k.ajaxIdentifier, {
                        x01: k.inputName,
                        pageItems: b(k.pageItemsToSubmit, apex.gPageContext$)
                    }, {
                        optimizeRefresh: k.optimizeRefresh,
                        dependingOn: b(k.dependingOnSelector, apex.gPageContext$),
                        success: function(a) {
                            g(),
                            i(a),
                            h.setValue(d, null, !0)
                        },
                        target: h.node
                    })
                }
            }
            ),
            apex.item.create(this.id, h)
        }),
        k.dependingOnSelector && b(k.dependingOnSelector, apex.gPageContext$).on("change", h),
        l.on("apexrefresh", j),
        "REDIRECT_SET_VALUE" === k.action ? l.find("input").click(function() {
            location.href = "f?p=" + $v("pFlowId") + ":" + $v("pFlowStepId") + ":" + $v("pInstance") + "::" + $v("pdebug") + "::" + l.attr("id") + ":" + $v(l.attr("id"))
        }) : "SUBMIT" === k.action && l.find("input").click(function() {
            apex.submit(l.attr("id"))
        })
    }
}(apex.widget, apex.jQuery, apex.util);
!function(a, b, c) {
    a.datepicker = function(d, e, f, g) {
        var h, i = null, j = c.datepicker.regional[g], k = "apex_disabled", l = "apexInitialValue";
        h = c.extend({}, j, {
            dateFormat: f,
            duration: "",
            constrainInput: !1,
            onSelect: i,
            locale: g
        }, e),
        c(".ui-datepicker").prop("tabindex", -1),
        c(d, apex.gPageContext$).each(function() {
            var d, e, f = b.escapeCSS(this.id), g = "#" + f, i = c(g, apex.gPageContext$), j = g;
            "inline" === h.showOn && (j += "_INLINE"),
            "rtl" === i.css("direction") && (h.isRTL = !0),
            d = c(j).datepicker(h),
            "rtl" === i.css("direction") && i.parent().find(".ui-datepicker-trigger").insertAfter(i),
            e = c(g).val(),
            "inline" === h.showOn && h.altField && d.datepicker("setDate", e),
            "inline" !== h.showOn && d.data("datepicker").dpDiv.on("keydown", function(a) {
                var b = a.which;
                27 === b && d.datepicker("hide")
            }),
            c(d).data(l, e),
            a.initPageItem(f, {
                setValue: function(a) {
                    c(this.node, apex.gPageContext$).val(a),
                    "inline" === h.showOn && h.altField && d.datepicker("setDate", a)
                },
                isChanged: function() {
                    return c(g).val() !== d.data(l)
                },
                enable: function() {
                    d.datepicker("enable").removeClass(k)
                },
                disable: function() {
                    d.datepicker("disable").addClass(k)
                },
                isDisabled: function() {
                    return d.datepicker("isDisabled")
                },
                show: function() {
                    i.parent().children().show()
                },
                hide: function() {
                    i.parent().children().hide()
                },
                getPopupSelector: function() {
                    return ".ui-datepicker"
                },
                loadingIndicator: function(a) {
                    return a.appendTo(i.parent())
                }
            })
        })
    }
}(apex.widget, apex.util, apex.jQuery);
!function(a, b) {
    "use strict";
    a.popupLov = function(c, d) {
        function e() {
            i.trigger("apexrefresh")
        }
        function f() {
            i.trigger("apexbeforerefresh"),
            $s(i.attr("id"), h.nullValue, h.nullValue),
            i.trigger("apexafterrefresh")
        }
        function g() {
            return a.util.callPopupLov(h.ajaxIdentifier, {
                pageItems: b(h.pageItemsToSubmit, apex.gPageContext$).add(h.dependingOnSelector)
            }, {
                filterOutput: h.filterWithValue,
                filterValue: i.val(),
                windowParameters: h.windowParameters,
                target: i[0]
            }),
            !1
        }
        var h = b.extend({
            dependingOnSelector: null,
            optimizeRefresh: !0,
            pageItemsToSubmit: null,
            nullValue: "",
            filterWithValue: !1,
            windowParameters: null,
            inputField: "NOT_ENTERABLE"
        }, d)
          , i = b(c, apex.gPageContext$)
          , j = "ENTERABLE" === h.inputField;
        b(c, apex.gPageContext$).each(function() {
            var d = this;
            a.initPageItem(this.id, {
                enable: function() {
                    a.util.enableIcon(b("#" + d.id + "_holder", apex.gPageContext$).find("a"), "#", g),
                    j ? i.prop("disabled", !1).removeClass("apex_disabled") : b("#" + d.id + "_HIDDENVALUE", apex.gPageContext$).prop("disabled", !1)
                },
                disable: function() {
                    a.util.disableIcon(b(i).closest("tr")),
                    j ? i.prop("disabled", !0).addClass("apex_disabled") : b("#" + d.id + "_HIDDENVALUE", apex.gPageContext$).prop("disabled", !0)
                },
                isDisabled: function() {
                    return j ? i.prop("disabled") : b("#" + d.id + "_HIDDENVALUE", apex.gPageContext$).prop("disabled")
                },
                show: function() {
                    b("#" + d.id, apex.gPageContext$).closest("tr").show()
                },
                hide: function() {
                    b("#" + d.id, apex.gPageContext$).closest("tr").hide()
                },
                setValue: function(a, c) {
                    j ? b("#" + d.id, apex.gPageContext$).val(a) : (b("#" + d.id + "_HIDDENVALUE", apex.gPageContext$).val(a),
                    b("#" + d.id, apex.gPageContext$).val(c))
                },
                getValue: function() {
                    var a;
                    return a = j ? b("#" + d.id, apex.gPageContext$).val() : b("#" + d.id + "_HIDDENVALUE", apex.gPageContext$).val()
                },
                setFocusTo: function() {
                    return j ? b(c, apex.gPageContext$) : b(c + "_fieldset a", apex.gPageContext$)
                },
                nullValue: h.nullValue
            })
        }),
        b(c + "_fieldset a", apex.gPageContext$).click(g),
        h.dependingOnSelector && b(h.dependingOnSelector, apex.gPageContext$).change(e),
        i.bind("apexrefresh", f)
    }
}(apex.widget, apex.jQuery);
!function(a, b, c) {
    a.selectList = function(d, e) {
        function f(a) {
            k.val(a),
            k[0].selectedIndex === -1 && 1 === parseInt($nvl(k.attr("size"), "1"), 10) && k.children("option").first().prop("selected", !0)
        }
        function g() {
            "nullValue"in e ? c('option[value!="' + apex.util.escapeCSS(j.nullValue) + '"]', k).remove() : c("option", k).remove(),
            c.mobile && k.selectmenu("refresh", !0)
        }
        function h(a) {
            var b = "";
            c.each(a.values, function() {
                b = b + '<option value="' + this.r + '" ' + j.optionAttributes + ">" + this.d + "</option>"
            }),
            k.append(b),
            c.mobile && k.selectmenu("refresh", !0)
        }
        function i(b) {
            a.util.cascadingLov(k, j.ajaxIdentifier, {
                pageItems: c(j.pageItemsToSubmit, apex.gPageContext$)
            }, {
                optimizeRefresh: j.optimizeRefresh,
                dependingOn: c(j.dependingOnSelector, apex.gPageContext$),
                success: function(a) {
                    h(a),
                    $s(k[0], a["default"])
                },
                clear: g,
                target: b.target
            })
        }
        var j = c.extend({
            optionAttributes: null,
            nullValue: ""
        }, e)
          , k = c(d, apex.gPageContext$);
        k.each(function() {
            var d = {
                setValue: f,
                nullValue: j.nullValue
            };
            j.dependingOnSelector && (d.reinit = function(f, i) {
                var l = this
                  , m = f
                  , n = i || m;
                return "nullValue"in e ? c('option[value!="' + b.escapeCSS(d.nullValue) + '"]', k).remove() : c("option", k).remove(),
                e.nullValue !== m && k.append("<option value='" + b.escapeHTML(m) + "'>" + b.escapeHTML(n) + "</option>"),
                this.setValue(m, null, !0),
                function() {
                    a.util.cascadingLov(k, j.ajaxIdentifier, {
                        pageItems: c(j.pageItemsToSubmit, apex.gPageContext$)
                    }, {
                        optimizeRefresh: j.optimizeRefresh,
                        dependingOn: c(j.dependingOnSelector, apex.gPageContext$),
                        success: function(a) {
                            g(),
                            h(a),
                            l.setValue(m, null, !0)
                        },
                        target: l.node
                    })
                }
            }
            ),
            c.mobile && (d = c.extend(d, {
                enable: function() {
                    k.selectmenu("enable")
                },
                disable: function() {
                    k.selectmenu("disable")
                },
                afterModify: function() {
                    k.selectmenu("refresh")
                }
            })),
            apex.item.create(this.id, d)
        }),
        j.dependingOnSelector && c(j.dependingOnSelector, apex.gPageContext$).on("apexbeforerefresh", g).on("change", i),
        k.on("apexrefresh", i)
    }
}(apex.widget, apex.util, apex.jQuery);
!function(a, b, c) {
    a.textarea = function(a, c) {
        function d() {
            function a(a) {
                return h = f.width() - a.pageX,
                i = f.height() - a.pageY,
                f.css("opacity", .25),
                b(document).bind("mousemove.apex_startResize", function(d) {
                    return c(d, "se-resize" === b(a.currentTarget).css("cursor"))
                }).bind("mouseup.apex_startResize", d),
                !1
            }
            function c(a, b) {
                var c;
                return f.height(Math.max(g, i + a.pageY) + "px"),
                b && (c = Math.max(e, h + a.pageX),
                f.width(c)),
                !1
            }
            function d(a) {
                b(document).unbind("mousemove.apex_startResize").unbind("mouseup.apex_startResize"),
                f.css("opacity", 1)
            }
            var e, g, h = null, i = null;
            e = parseInt(f.css("min-width"), 10) || 20,
            g = parseInt(f.css("min-height"), 10) || 20,
            f.after('<div class="apex_size_bar"><div class="apex_size_grip"></div></div>'),
            b("div.apex_size_bar, div.apex_size_grip", f.parent()).mousedown(a),
            f.parent().css("display:inline-block")
        }
        function e() {
            var a = f.val().replace(/\n/g, "xx").length
              , b = a / g.maxChar * 100;
            a >= g.maxChar ? (f.val(f.val().substr(0, g.maxChar)),
            f.css("color", "red"),
            i.html(g.maxChar)) : (f.css("color", "black"),
            i.html(a)),
            a > 0 ? h.show() : h.hide(),
            b > 95 ? h.css("color", "red") : b >= 90 ? h.css("color", "#EAA914") : h.css("color", "black")
        }
        var f = b("#" + a, apex.gPageContext$)
          , g = b.extend({
            isResizable: !1,
            hasCharCounter: !1,
            maxChar: null
        }, c);
        if (0 !== f.length) {
            if (g.isResizable && ("string" == typeof document.documentElement.style.resize ? f.css("resize", "both") : d()),
            g.hasCharCounter) {
                var h = b("#" + a + "_CHAR_COUNT", apex.gPageContext$)
                  , i = b("#" + a + "_CHAR_COUNTER", apex.gPageContext$);
                f.change(e).keyup(e).focus(e),
                e()
            }
            apex.widget.initPageItem(a, {
                show: function() {
                    f.closest("fieldset").show()
                },
                hide: function() {
                    f.closest("fieldset").hide()
                }
            })
        }
    }
}(apex.widget, apex.jQuery);
!function(a, b, c) {
    "use strict";
    apex.widget.yesNo = function(d) {
        var e;
        b.mobile ? a.create(d, {
            enable: function() {
                b(this.node).slider("enable")
            },
            disable: function() {
                b(this.node).slider("disable")
            },
            afterModify: function() {
                b(this.node).slider("refresh")
            }
        }) : (e = b("#" + c.escapeCSS(d), apex.gPageContext$),
        a.create(d, {
            enable: function() {
                b(":radio", e).prop("disabled", !1)
            },
            disable: function() {
                b(":radio", e).prop("disabled", !0)
            },
            isDisabled: function() {
                return b(":radio", e).first().prop("disabled") === !0
            },
            setValue: function(a) {
                b(":radio", e).prop("checked", !1).filter("[value='" + c.escapeCSS(a) + "']").prop("checked", !0)
            },
            getValue: function() {
                return b(":checked", e).attr("value") || ""
            },
            isChanged: function() {
                var a, b = this.getValue(), c = "", d = $x_FormItems(this.node, "RADIO");
                for (a = 0; a < d.length; a++)
                    if (d[a].defaultChecked) {
                        c = d[a].value;
                        break
                    }
                return b !== c
            },
            setFocusTo: b(":radio", e).first(),
            displayValueFor: function(a) {
                var b, c = "";
                return null !== a && void 0 !== a && (b = e.find("[value='" + apex.util.escapeCSS(a + "") + "']").prop("id"),
                b && (c = e.find("[for='" + apex.util.escapeCSS(b) + "']").html() || "")),
                c
            }
        }))
    }
}(apex.item, apex.jQuery, apex.util);
!function(a, b, c, d, e) {
    "use strict";
    function f(a, b, c, d) {
        a.markup("<span").attr("class", b + " " + c).optionalAttr("style", d).markup("></span>")
    }
    function g() {
        var a, b, c, e, f;
        for (z ? (e = d(z),
        f = null) : (e = G,
        f = H),
        m({
            $menu: C[0],
            subMenu: !1,
            x: e,
            y: f,
            slide: !1
        }),
        a = 1; a < C.length; a++)
            b = C[a],
            c = b.parents(ia).eq(0),
            m({
                $menu: b,
                subMenu: !0,
                x: c,
                slide: !1
            })
    }
    function h() {
        d(S).each(function() {
            d(this).menu("resize")
        })
    }
    function i() {
        E || (E = !0,
        d(window).on("blur.menuTracking", function() {
            Sa.closeAll(!0)
        }),
        d("html").on("mousedown.menuTracking", function(a) {
            var b = d(a.target);
            0 !== b.closest(V).length || z && 0 !== b.closest(z).length || Sa.closeAll(!0)
        }).on("mousemove.menuTracking", function(a) {
            var b, c;
            K === a.pageX && L === a.pageY || (K = a.pageX,
            L = a.pageY,
            b = d(a.target),
            c = b.parents(V)[0],
            !c && x && (c = b.parent(S)[0]),
            !c && P && P !== c && d(P).focus(),
            P = c)
        }),
        apex.tooltipManager && apex.tooltipManager.disableTooltips())
    }
    function j() {
        d(window).off(".menuTracking"),
        d("html").off(".menuTracking"),
        E = !1,
        apex.tooltipManager && apex.tooltipManager.enableTooltips()
    }
    function k(a) {
        return a.children().children($)
    }
    function l() {
        var a;
        z && (a = d(z),
        a.is(ia) ? a.find(Ha).focus() : a.focus())
    }
    function m(b) {
        var c, e, g, h, i, j = b.$menu, l = {}, m = "none" !== j.css("display");
        m || j.css({
            display: "block",
            position: "absolute",
            top: -99999,
            left: 0
        }),
        b.minWidth && j.css("min-width", b.minWidth),
        "true" !== j.attr("data-custom") && (i = j.find("li").first().outerHeight(),
        g = d(window).height(),
        h = g > 1e3 ? .6 : g > 500 ? .75 : .9,
        g = Math.floor(g * h / i) * i - i,
        e = j.height(),
        e > g ? (0 === k(j).length && (c = a.htmlBuilder(),
        c.markup("<div").attr("class", _ + "  " + ca).markup(">"),
        f(c, Ka, ea),
        c.markup("</div>"),
        j.children().first().addClass(ba).prepend(c.toString()).append(c.toString().replace(ea, fa).replace(ca, da)).children("ul").first().wrap("<div class='" + Z + "'></div>")),
        k(j).height(g)[0].scrollTop = 0,
        j.find(aa + "." + ca).addClass(Da)) : k(j).length > 0 && (j.children().first().removeClass(ba).children(aa).remove(),
        j.find("ul").first().unwrap())),
        "number" == typeof b.x && "number" == typeof b.y ? (G = b.x,
        H = b.y,
        l.of = d.Event("click", {
            pageX: G,
            pageY: H
        })) : (G = H = null,
        l.of = b.x),
        y ? b.subMenu ? (l.my = "right top",
        l.at = "left top") : (l.my = "right top",
        l.at = "right bottom") : b.subMenu ? (l.my = "left top",
        l.at = "right top") : (l.my = "left top",
        l.at = "left bottom"),
        l.collision = "flipfit flipfit",
        j.position(l),
        j.css("display", m ? "block" : "none"),
        m || (b.slide ? j.slideDown(200) : j.show(),
        b.focus && j.focus())
    }
    function n(a) {
        return a.parent().parent().hasClass(R)
    }
    function o(a, b) {
        var c = null;
        return d.each(a.items, function(a, d) {
            return d.id === b ? (c = d,
            !1) : ("subMenu" !== d.type || (c = o(d.menu, b),
            null === c)) && void 0
        }),
        c
    }
    function p(a) {
        var b = null
          , c = a.search(/_c[0-9]+$/);
        return c >= 0 && (b = 1 * a.substring(c + 2)),
        b
    }
    function q(a, c, e, f, g, h) {
        function i() {
            var e;
            d(document.body).on("dialogopen.menu", function(a) {
                var b = d(a.target);
                e = !0,
                b.dialog("option", "modal") && b.on("dialogclose.menu", function(a) {
                    b.off("dialogclose.menu"),
                    l()
                })
            }),
            setTimeout(function() {
                d(document.body).off("dialogopen.menu")
            }, 150),
            "string" == typeof a.action && c ? (b.info("Invoke action menu item '" + (a.label || c.lookup(a.action).label) + "'"),
            A = c.invoke(a.action, {}, z) || !1) : (b.info("Invoke action menu item '" + a.label + "'"),
            a.action ? A = a.action(f, z) || !1 : a.href && (apex.navigation.redirect(a.href),
            A = !0)),
            e && (A = !0)
        }
        var j, k = !1, m = g || a.type;
        try {
            if ("toggle" === m)
                "string" == typeof a.action && c && (a = c.lookup(a.action),
                k = !0),
                j = !a.get(),
                b.info("Invoke toggle menu item '" + (a.label || (j ? a.onLabel : a.offLabel)) + "' value now " + j),
                a.set(j),
                k && c.update(a.name),
                B = !0;
            else if ("radioGroup" === m)
                "string" == typeof a.action && c && (a = c.lookup(a.action),
                k = !0),
                j = a.choices[e].value,
                b.info("Invoke choice menu item '" + a.choices[e].label + "' value now " + j),
                a.set(j),
                k && c.update(a.name),
                B = !0;
            else if ("action" === m)
                h ? setTimeout(function() {
                    i()
                }, 210) : i(),
                B = !0;
            else if ("subMenu" === m)
                return !1
        } catch (n) {
            b.error("Error in menu action.", n)
        }
        return !0
    }
    function r(a, b) {
        var c, d;
        if (a.menu && a.menu.items)
            for (c = 0; c < a.menu.items.length; c++)
                if (d = a.menu.items[c],
                d.current || r(d, b))
                    return b && d.current && delete d.current,
                    !0;
        return !1
    }
    function s(a) {
        a.labelKey && (a.label = c.getMessage(a.labelKey)),
        a.onLabelKey && (a.onLabel = c.getMessage(a.onLabelKey)),
        a.offLabelKey && (a.offLabel = c.getMessage(a.offLabelKey))
    }
    function t(a) {
        a.is(Ha) ? a.focus() : a.find(Ha).first().focus()
    }
    function u(a) {
        var b, c;
        return b = a.closest(ha)[0],
        c = a.find(ha).not(function(a, c) {
            var e = d(c).parent().closest(ha)[0];
            return e !== b
        })
    }
    function v(a) {
        var b = a.children(va);
        return 0 === b.length && (b = a.children(ja).find(va)),
        b
    }
    var w = null
      , x = null
      , y = !1
      , z = null
      , A = !1
      , B = !1
      , C = []
      , D = []
      , E = !1
      , F = !1
      , G = null
      , H = null
      , I = 0
      , J = 0
      , K = 0
      , L = 0
      , M = null
      , N = null
      , O = null
      , P = null
      , Q = null
      , R = "a-MenuBar"
      , S = ".a-MenuBar"
      , T = "a-MenuBar--tabs"
      , U = "a-Menu"
      , V = ".a-Menu"
      , W = "a-Menu--top"
      , X = "a-Menu-content"
      , Y = "." + X
      , Z = "a-Menu-scroll"
      , $ = ".a-Menu-scroll"
      , _ = "a-Menu-scrollBtn"
      , aa = ".a-Menu-scrollBtn"
      , ba = "a-Menu--scrollable"
      , ca = "a-Menu-scrollBtn--up"
      , da = "a-Menu-scrollBtn--down"
      , ea = "icon-menu-scroll-up"
      , fa = "icon-menu-scroll-down"
      , ga = "a-Menu-item"
      , ha = "." + ga
      , ia = ".a-Menu-item, .a-MenuBar-item"
      , ja = ".a-Menu-inner"
      , ka = ".a-Menu-item, .a-MenuBar-item, .a-Menu-content"
      , la = ka + ", " + aa
      , ma = "a-Menu-item--default"
      , na = "a-MenuBar-item"
      , oa = "a-MenuBar-item--overflow"
      , pa = "a-MenuBar--overflow"
      , qa = "a-Menu-statusCol"
      , ra = "a-Menu-label"
      , sa = "a-Menu-accel"
      , ta = "a-MenuBar-label"
      , ua = ".a-Menu-label"
      , va = ".a-Menu-label,.a-MenuBar-label"
      , wa = "a-Menu-subMenuCol"
      , xa = ".a-Menu-subMenuCol"
      , ya = "a-Menu--split"
      , za = "a-Menu--current"
      , Aa = "a-Menu-hSeparator"
      , Ba = "a-Menu-itemSep"
      , Ca = ".a-Menu-itemSep"
      , Da = "is-disabled"
      , Ea = "is-focused"
      , Fa = "is-active"
      , Ga = ".is-focused"
      , Ha = "a, button, .a-Menu-label, .a-MenuBar-label"
      , Ia = "is-expanded"
      , Ja = ".is-expanded"
      , Ka = "a-Icon"
      , La = "button.js-menuButton"
      , Ma = "u-RTL"
      , Na = "aria-expanded"
      , Oa = "aria-disabled"
      , Pa = "aria-haspopup"
      , Qa = "aria-checked"
      , Ra = d.ui.keyCode;
    d(document).ready(function() {
        d(window).on("apexwindowresized", function() {
            h(),
            E && g()
        })
    });
    var Sa = {
        openMenu: function(a, b, c, e, f, g) {
            var h = 0;
            this.closeAll(),
            w = a[0],
            x = b ? b[0] : null,
            y = d(x || w).hasClass(Ma),
            z = "object" == typeof c && c.get ? c[0] : null,
            A = !1,
            B = !1,
            F = !0,
            0 === C.length && i(),
            C.push(a),
            F = !1,
            D = [],
            b && (c.addClass(Ia).children(va).attr(Na, "true"),
            h = c.outerWidth()),
            m({
                $menu: a,
                subMenu: !1,
                x: c,
                y: e,
                slide: f,
                focus: g,
                minWidth: h
            })
        },
        isCurrentMenu: function(a) {
            return w && w === a
        },
        isCurrentMenuBar: function(a) {
            return x && x === a
        },
        isMenuOpen: function(a) {
            var b;
            for (b = 0; b < C.length; b++)
                if (C[b] === a)
                    return !0;
            return !1
        },
        openSubMenu: function(a, b, c, d, e) {
            this.closeOpenSiblings(a, c),
            C.push(b),
            m({
                $menu: b,
                subMenu: !0,
                x: a,
                slide: d,
                focus: e
            }),
            a.addClass(Ia).children(ja).find(va).attr(Na, "true")
        },
        closeOpenSiblings: function(a, b) {
            var c = a.parent().find(Ja);
            for (b && (F = !0); c.length > 0; )
                this.closeLast(!1),
                c = a.parent().find(Ja);
            F = !1
        },
        closeLast: function(a) {
            var b, c, e;
            C.length > 0 ? (b = C.pop(),
            c = b.parents(ia).eq(0),
            c.length > 0 && (e = v(c),
            c.removeClass(Ia).children(ja),
            e.attr(Na, "false"),
            a && c.find(Ha).eq(0).focus()),
            b.hide(),
            0 === C.length && (!z || A || F || setTimeout(function() {
                l()
            }, 10),
            x && (e = v(d(w).find(Ja)),
            d(w).find(Ja).removeClass(Ia),
            e.attr(Na, "false")),
            (x || w) && d(x || w).data("apex-menu")._trigger("afterClose", {}, {
                actionTookFocus: A,
                actionTaken: B,
                launcher: z
            }),
            w = null,
            F || (x = null,
            j()))) : (w = null,
            x = null,
            j())
        },
        closeAll: function(a) {
            for (; C.length > 0; )
                this.closeLast(!1);
            a && (w = null,
            x = null,
            j())
        }
    };
    d.widget("apex.menu", {
        version: "5.0",
        widgetEventPrefix: "menu",
        options: {
            menubar: !1,
            menubarShowSubMenuIcon: null,
            menubarOverflow: !1,
            iconType: Ka,
            behaveLikeTabs: !1,
            tabBehavior: "EXIT",
            useLinks: !0,
            slide: !1,
            firstItemIsDefault: !1,
            actionsContext: null,
            items: null,
            idPrefix: null,
            customContent: !1,
            asyncFetchMenu: null,
            beforeOpen: null,
            afterClose: null
        },
        isActive: !1,
        scrollTimerId: null,
        forwardKey: Ra.RIGHT,
        backwardKey: Ra.LEFT,
        actionsContext: null,
        _create: function() {
            var a, c, f = this.options, g = this.element;
            if (f.menubar && f.customContent)
                throw new Error("Menubar cannot have custom content");
            if (apex.actions && (this.actionsContext = f.actionsContext || apex.actions),
            f.items || f.customContent === !0 || (f.items = this._parseMenuMarkup(g, f.menubar).items),
            !f.menubar && (f.customContent || f.asyncFetchMenu) || f.items && 0 !== f.items.length || b.error("Menu has no menu items"),
            "rtl" === g.css("direction") && (g.addClass(Ma),
            f.menubar || g.attr("dir", "rtl"),
            this.forwardKey = Ra.LEFT,
            this.backwardKey = Ra.RIGHT),
            g.attr("tabindex", -1).attr("role", f.menubar ? "menubar" : "menu").addClass(f.menubar ? R : U),
            f.menubar) {
                if (f.menubarOverflow && g.addClass(pa),
                null === f.menubarShowSubMenuIcon)
                    for (f.menubarShowSubMenuIcon = !1,
                    a = 0; a < f.items.length; a++)
                        if ("subMenu" !== f.items[a].type) {
                            f.menubarShowSubMenuIcon = !0;
                            break
                        }
                this.refresh(),
                f.behaveLikeTabs && g.addClass(T),
                f.firstItemIsDefault && b.warn("Invalid options for menu bar ignored")
            } else
                d("body").append(g),
                g.hide(),
                (f.menubarOverflow || f.menubarShowSubMenuIcon || f.behaveLikeTabs) && b.warn("Invalid options for popup menu ignored");
            "onwheel"in g[0] || !this._eventHandlers.wheel || (c = document.onmousewheel !== e ? "mousewheel" : "DOMMouseScroll",
            this._eventHandlers[c] = this._eventHandlers.wheel,
            delete this._eventHandlers.wheel),
            this._on(this._eventHandlers)
        },
        _eventHandlers: {
            mousedown: function(a) {
                var b, c, e, f;
                1 !== a.which || a.shiftKey || a.ctrlKey || (f = d(a.target).closest(la),
                a.preventDefault(),
                f.length > 0 && !f.hasClass(X) && !f.hasClass(Da) && (f.is(aa) ? (f.addClass(Fa),
                this._startScrolling(f.closest(V), f.hasClass(ca))) : n(f) && (c = f[0].id,
                b = this._getMenuItemFromId(c),
                "subMenu" === b.type && (e = 0 !== d(a.target).closest(xa).length,
                (e || !b.action && !b.href) && this.toggle(f)))))
            },
            mouseup: function(a) {
                var b, c, e, f, g, h, i;
                1 !== a.which || a.shiftKey || a.ctrlKey || (i = d(a.target).closest(ka),
                a.preventDefault(),
                i.length > 0 && !i.hasClass(X) && (e = i[0].id,
                b = this._getMenuItemFromId(e),
                g = b.type,
                f = n(i),
                "subMenu" === g && f && (h = 0 !== d(a.target).closest(xa).length,
                h || !b.action && !b.href || (g = "action",
                Sa.closeOpenSiblings(i, f))),
                "subMenu" === g && f || !i.is(ia) || i.hasClass(Da) || "display" === g || (c = p(e),
                q(b, this.actionsContext, c, this.options, g) && Sa.closeAll())))
            },
            click: function(a) {
                var b, c, e, f;
                return "A" === a.target.nodeName && (1 !== a.which || a.shiftKey || a.ctrlKey) ? void (this.keyboardActivate = !1) : (a.preventDefault(),
                void (this.keyboardActivate && (this.keyboardActivate = !1,
                b = d(a.target).closest(ka),
                b.length > 0 && !b.hasClass(X) && (c = b[0].id,
                e = this._getMenuItemFromId(c),
                b.is(ia) && !b.hasClass(Da) && (f = p(c),
                q(e, this.actionsContext, f, this.options, "subMenu" === e.type ? "action" : e.type) && Sa.closeAll())))))
            },
            mousemove: function(a) {
                function b() {
                    var a = f.parent().find(Ja);
                    a.length > 0 && !N && (a.removeClass(Ia),
                    O = a.find(V)[0],
                    N = setTimeout(function() {
                        a.addClass(Ia),
                        N = null,
                        O = null,
                        Sa.closeOpenSiblings(f, c)
                    }, 250))
                }
                var c, e, f, g, h = this;
                if (I !== a.pageX || J !== a.pageY) {
                    if (I = a.pageX,
                    J = a.pageY,
                    e = d(a.target),
                    N && e.closest(V)[0] === O && (d(O).parent().addClass(Ia),
                    O = null,
                    clearTimeout(N),
                    N = null),
                    f = e.closest(Ca),
                    f.length > 0 && f[0] !== Q)
                        return M && (clearTimeout(M),
                        M = null),
                        c = n(f),
                        b(),
                        Q = f[0],
                        g = e.closest(V).eq(0),
                        void (g.length > 0 && !g.hasClass(Ea) && g.focus());
                    if (f = e.closest(ia),
                    f.length > 0) {
                        if (!f.hasClass(Ea) && "true" !== v(f).attr(Na)) {
                            if (M && (clearTimeout(M),
                            M = null),
                            c = n(f),
                            c && E ? (clearTimeout(N),
                            N = null,
                            Sa.closeOpenSiblings(f, c)) : b(),
                            this.options.menubar && !Sa.isCurrentMenuBar(this.element[0]) && !this.isActive)
                                return this.element.find(Ga).removeClass(Ea),
                                void f.addClass(Ea);
                            t(f),
                            !f.hasClass(Da) && f.find(V).length > 0 && "true" !== v(f).attr(Na) && (c ? Sa.isCurrentMenuBar(this.element[0]) && this.open(f) : M = setTimeout(function() {
                                M = null,
                                Sa.openSubMenu(f, f.children(V).first(), c, h.options.slide, !0)
                            }, 300))
                        }
                        Q = f[0]
                    } else
                        e.closest(V).first().focus()
                }
            },
            mouseleave: function(a) {
                M && (clearTimeout(M),
                M = null),
                this.options.menubar && (Sa.isCurrentMenuBar(this.element[0]) || this.isActive || this.element.find(Ga).removeClass(Ea))
            },
            wheel: function(a) {
                var b, c = d(a.target).closest(V), f = a.originalEvent.deltaY || a.originalEvent.detail || -.025 * a.originalEvent.wheelDelta;
                if (c.length) {
                    if (a.preventDefault(),
                    b = k(c)[0],
                    !b)
                        return;
                    a.originalEvent.deltaMode !== e && 1 !== a.originalEvent.deltaMode || (f = 30 * f),
                    b.scrollTop += f,
                    this._checkScrollBounds(c, b)
                }
            },
            keydown: function(a) {
                function b(a) {
                    var b;
                    if (f.hasClass(U))
                        i = f.find(Y).first().find(ia).first();
                    else {
                        if (b = g.index(f),
                        b += 1,
                        b >= g.length) {
                            if (a)
                                return !1;
                            b = 0
                        }
                        i = g.eq(b)
                    }
                    return t(i),
                    f = i,
                    m && C._checkScrollBounds(o, m),
                    !0
                }
                function c(a) {
                    var b;
                    if (f.hasClass(U))
                        i = f.find(Y).first().find(ia).last();
                    else {
                        if (b = g.index(f),
                        b -= 1,
                        b < 0) {
                            if (a)
                                return !1;
                            b = g.length - 1
                        }
                        i = g.eq(b)
                    }
                    return t(i),
                    f = i,
                    m && C._checkScrollBounds(o, m),
                    !0
                }
                function e() {
                    C.toggle(f),
                    f.hasClass(ya) ? f.find(Ha).eq(0).focus() : (i = f.find(Y).first().find(ia).first(),
                    t(i))
                }
                var f, g, h, i, j, l, m, o, r, s, v, w, x, y, B, C = this, D = a.which;
                if (!a.altKey)
                    if (j = this.element,
                    this.keyboardActivate = !1,
                    j.hasClass(Ea) ? (f = j,
                    j.find(Ja).first().each(function() {
                        f = d(this)
                    })) : f = j.find(Ga),
                    o = f.closest(V + "," + S),
                    m = k(o)[0],
                    l = f.is(S) || n(f),
                    g = l ? j.find("." + na) : u(o),
                    D === Ra.UP || D === Ra.DOWN)
                        l ? f.children(V).length > 0 && !f.hasClass(Da) && (f.hasClass(ya) && Sa.isCurrentMenu(f.children(V)[0]) ? (i = f.find("ul").first().children(ia).first(),
                        i.find(Ha).focus()) : e()) : D === Ra.UP ? c() : b(),
                        a.preventDefault();
                    else if (D === this.forwardKey)
                        l ? (b(),
                        Sa.closeOpenSiblings(f, !0),
                        Sa.isCurrentMenuBar(j[0]) && f.children(V).length > 0 && !f.hasClass(Da) && e()) : (i = f.children(V),
                        i.length > 0 && !f.hasClass(Da) ? (Sa.openSubMenu(f, i, !1, this.options.slide, !1),
                        i = i.find("ul").first().children(ia).first(),
                        t(i)) : this.options.menubar && (f = j.find(Ja).eq(0),
                        g = j.find("." + na),
                        b(),
                        Sa.closeOpenSiblings(f, n(f)),
                        f.children(V).length > 0 && !f.hasClass(Da) && e())),
                        a.preventDefault();
                    else if (D === C.backwardKey)
                        l ? (c(),
                        Sa.closeOpenSiblings(f, !0),
                        Sa.isCurrentMenuBar(C.element[0]) && f.children(V).length > 0 && !f.hasClass(Da) && e()) : (i = f.parents(ia).eq(0),
                        i.length > 0 && !n(i) ? Sa.closeLast(!0) : this.options.menubar && (f = j.find(Ja).eq(0),
                        g = j.find("." + na),
                        c(),
                        Sa.closeOpenSiblings(f, n(f)),
                        f.children(V).length > 0 && !f.hasClass(Da) && e())),
                        a.preventDefault();
                    else if (D === Ra.TAB)
                        l ? ("EXIT" === this.options.tabBehavior || a.shiftKey) && (A = !0,
                        Sa.closeAll()) : (B = this.options.tabBehavior,
                        "NEXT" === B && (a.shiftKey ? c(!0) || (B = "EXIT") : b(!0) || (B = "EXIT")),
                        "EXIT" === B && z && (A = !0,
                        Sa.closeAll(),
                        s = d(":tabbable"),
                        this.options.menubar ? (r = s.index(d(z).find(":tabbable")),
                        r < 0 && (r = s.index(this.element.find(":tabbable")))) : r = s.index(z),
                        r > 0 && r < s.length ? r += a.shiftKey ? -1 : 1 : s.length > 0 && (r = 0),
                        r >= 0 && s[r].focus()),
                        a.preventDefault());
                    else if (D === Ra.ESCAPE)
                        Sa.closeLast(!0),
                        a.preventDefault();
                    else if (D === Ra.ENTER || D === Ra.SPACE) {
                        if (f = j.hasClass(Ea) ? j : j.find(Ga),
                        f.hasClass(Da) || !f.is(ia))
                            return void a.preventDefault();
                        if (v = f[0].id,
                        w = this._getMenuItemFromId(v),
                        x = w.type,
                        l = n(f),
                        "subMenu" === x && l && (w.action || w.href) && (x = "action",
                        Sa.closeOpenSiblings(f, l)),
                        "subMenu" === x)
                            l ? (C.toggle(f),
                            i = f.find(Y).first().find(ia).first(),
                            t(i)) : (h = f.children(V),
                            h.length > 0 && (Sa.openSubMenu(f, h, !1, this.options.slide, !1),
                            i = h.find("ul").first().children(ia).first(),
                            t(i)));
                        else {
                            if (("A" !== a.target.nodeName || D !== Ra.SPACE) && ("action" === x || D === Ra.SPACE && "BUTTON" === a.target.nodeName))
                                return void (this.keyboardActivate = !0);
                            "display" !== x && (y = p(v),
                            q(w, this.actionsContext, y, this.options, x, D === Ra.SPACE) && (A = !0,
                            Sa.closeAll()))
                        }
                        a.preventDefault()
                    }
            },
            keypress: function(a) {
                var b, c, d, e, f, g, h, i, j = -1;
                if (0 !== a.which && (f = this.element,
                f.hasClass(Ea) ? (e = f.find(Y).first().find(ia).first(),
                j = 0) : e = f.find(Ga),
                g = e.closest(V),
                0 !== g.length))
                    for (h = u(g),
                    j < 0 && (j = h.index(e) + 1,
                    j >= h.length && (j = 0)),
                    d = h.eq(j),
                    b = String.fromCharCode(a.which).toLowerCase(); ; ) {
                        if (i = d.filter(".a-Menu-label"),
                        0 === i.length && (i = d.find(".a-Menu-label")),
                        i.text().charAt(0).toLowerCase() === b) {
                            t(d),
                            c = k(g)[0],
                            c && this._checkScrollBounds(g, c);
                            break
                        }
                        if (j += 1,
                        j >= h.length && (j = 0),
                        d = h.eq(j),
                        d[0] === e[0])
                            break
                    }
            },
            focusin: function(a) {
                var b = d(a.target);
                this.isActive || this.element.find(Ga).removeClass(Ea),
                b.is(V) ? b.addClass(Ea) : b.closest(ia).addClass(Ea),
                this.isActive = !0
            },
            focusout: function(a) {
                var b = d(a.target);
                b.is(V) ? b.removeClass(Ea) : b.closest(ia).removeClass(Ea),
                this.isActive = !1
            },
            focus: function() {
                this.element.addClass(Ea)
            },
            blur: function() {
                this.element.removeClass(Ea)
            }
        },
        _destroy: function() {
            var a = this.options
              , c = this.element;
            E && Sa.isMenuOpen(this.element) && (b.warn("Menu destroyed while still tracking menus."),
            Sa.closeAll(!0)),
            c.empty().removeClass((a.menubar ? R + " " + T : U) + " " + Ma + " " + pa).removeAttr("role")
        },
        _setOption: function(a, c) {
            var d, e, f, g, h = this.options;
            if ("menubar" === a)
                throw new Error("The menubar option cannot be set");
            if (h.menubar ? "customContent" !== a && "firstItemIsDefault" !== a || b.warn("Option " + a + " ignored when menubar is true") : "menubarOverflow" !== a && "menubarShowSubMenuIcon" !== a && "behaveLikeTabs" !== a || b.warn("Option " + a + " ignored when menubar is false"),
            this._super(a, c),
            "menubarOverflow" === a && h.menubar) {
                if (this.element.toggleClass(pa, c),
                !c && (e = h.items,
                d = e[e.length - 1],
                d && d._overflow)) {
                    for (g = d.menu.items; g.length > 0; )
                        f = g.shift(),
                        "subMenu" === f.type && (f.action || f.href) && f.menu.items.shift(),
                        e.splice(e.length - 1, 0, f);
                    e.pop()
                }
            } else
                "actionsContext" === a && (this.actionsContext = c || apex.actions)
        },
        refresh: function() {
            var b, c = this.element, d = this.options, e = d.idPrefix || c[0].id || "menu", f = a.htmlBuilder();
            return d.menubar && (b = this._renderMenubar(f, e, d),
            c.html(f.toString()),
            this._processMenuCustomMarkup(),
            this.resize()),
            this
        },
        resize: function() {
            var b, c = this.element, d = this.options, e = d.idPrefix || c[0].id || "menu", f = a.htmlBuilder();
            return d.menubar && d.menubarOverflow && this._adjustMenubarForSize(e, d) && (b = this._renderMenubar(f, e, d),
            c.html(f.toString()),
            this._processMenuCustomMarkup()),
            this
        },
        toggle: function(a, b) {
            var c = this.element;
            if (this.options.menubar && (c = null,
            "number" == typeof a ? (a = this.element.children("ul").children("li").eq(a),
            a.length > 0 && (c = a.children(V))) : a.is(ia) && (c = a.children(V)),
            !c || 1 !== c.length))
                throw new Error("Invalid menu bar menu");
            return Sa.isCurrentMenu(c[0]) ? Sa.closeAll() : this.open(a, b),
            this
        },
        open: function(e, f) {
            function h() {
                var b;
                q._trigger("beforeOpen", {}, n),
                j.customContent ? ("string" == typeof j.customContent && (k.empty().append(d("#" + a.escapeCSS(j.customContent)).show()),
                j.customContent = !0),
                q._parseCustomMarkup(k, m, j)) : (s.clear(),
                b = q._renderMenu(s, m, j, o),
                k.html(s.toString()))
            }
            var i, j, k, l, m, n, o, p = !1, q = this, r = this.options, s = a.htmlBuilder();
            if (r.menubar) {
                if (l = this.element,
                k = null,
                "number" == typeof e ? (e = this.element.children("ul").children("li").eq(e),
                e.length > 0 && (k = e.children(V))) : e.is(ia) && (k = e.children(V)),
                !k || 1 !== k.length)
                    throw new Error("Invalid menu bar menu");
                if (m = e[0].id,
                j = this._getMenuItemFromId(m),
                !j || "subMenu" !== j.type || !j.menu)
                    throw new Error("Can't open menu " + e);
                n = j,
                j = j.menu,
                o = !1
            } else
                l = null,
                j = r,
                n = {
                    menu: j
                },
                k = this.element,
                m = r.idPrefix || this.element[0].id || "menu",
                o = !0;
            if (d.isFunction(r.asyncFetchMenu)) {
                if (!E && r.menubar)
                    for (i = 0; i < r.items.length; i++)
                        r.items[i]._fetched = !1;
                r.menubar && n._fetched === !0 ? h() : (q._renderMenu(s, m, {
                    items: [{
                        type: "action",
                        disabled: !0,
                        label: c.getMessage("APEX.MENU.PROCESSING")
                    }]
                }, o),
                k.html(s.toString()),
                p = !0,
                r.asyncFetchMenu(j, function(a) {
                    var b;
                    if (Sa.isCurrentMenu(k[0])) {
                        if (a === !1)
                            return void Sa.closeAll(!0);
                        b = k.find(Ga).first(),
                        h(),
                        g(),
                        b.length ? t(k.find(ia).first()) : k.focus()
                    }
                }),
                r.menubar && (n._fetched = !0))
            } else
                h();
            return p || 0 !== j.items.length ? Sa.openMenu(k, l, e, f, r.slide, r.menubar || f !== !1) : (b.error("Menu has no items"),
            q._trigger("afterClose", {}, {
                actionTookFocus: !1,
                actionTaken: !1,
                launcher: null
            })),
            this
        },
        find: function(a) {
            var b = this.options;
            return o(b, a)
        },
        setCurrentMenuItem: function(a) {
            var d, e, f = 0, g = this.options.items;
            if (!this.options.menubar || !this.options.behaveLikeTabs)
                return void b.warn("setCurrentMenuItem ignored");
            if ("string" == typeof a && (a = this.find(a)),
            a) {
                for (f = 0; f < g.length; f++)
                    d = g[f],
                    d.current && (e = d,
                    delete d.current),
                    r(d, !0);
                for (a.current = !0,
                f = 0; f < g.length; f++)
                    if (d = g[f],
                    r(d)) {
                        d.current = !0,
                        s(e),
                        this.element.find("." + za).removeClass(za).find(".a-MenuBar-label").text(e.label),
                        this.element.children("ul").children("li").eq(f).addClass(za).find(".a-MenuBar-label").append(" <span class='u-VisuallyHidden'>" + c.getMessage("APEX.MENU.CURRENT_MENU") + "</span>");
                        break
                    }
            }
        },
        _parseMenuMarkup: function(a, b) {
            var c = this
              , e = {
                items: []
            };
            return a.children("ul").children("li").each(function(a) {
                var f, g, h, i, j, k, l = d(this), m = l.children("a").eq(0), n = l.children("span").eq(0);
                if (f = {
                    type: "action"
                },
                m.length > 0 ? (f.label = m.text(),
                f.href = m.attr("href")) : n.length > 0 ? f.label = n.text() : f.type = "separator",
                "separator" === f.href && (f.type = "separator",
                delete f.href,
                delete f.label),
                i = l.attr("data-id"),
                i && (f.id = i),
                "true" === l.attr("data-hide") && (f.hide = !0),
                "true" === l.attr("data-disabled") && (f.disabled = !0),
                "true" === l.attr("data-current") && (f.current = !0),
                g = l.attr("data-icon"),
                g && (h = g.indexOf(" "),
                h >= 0 ? (f.iconType = g.substring(0, h),
                f.icon = g.substring(h + 1)) : f.icon = g),
                "separator" !== f.type && (l.children("ul").length > 0 || "true" === l.attr("data-custom")))
                    if (f.type = "subMenu",
                    "true" !== l.attr("data-custom"))
                        f.menu = c._parseMenuMarkup(l, !1);
                    else {
                        if (!b)
                            throw new Error("Attribute data-custom only allowed at menubar level");
                        k = l.children(Y).eq(0),
                        j = k[0].id,
                        j || (j = k[0].id = (c.options.idPrefix || c.element[0].id || "menu") + "_cm_" + a),
                        d(document.body).append(k),
                        k.hide(),
                        f.menu = {
                            customContent: j
                        }
                    }
                "action" === f.type && i && apex.actions && c.actionsContext.lookup(i) && (f.action = i,
                delete f.href,
                delete f.label,
                delete f.disabled,
                delete f.icon,
                delete f.iconType),
                e.items.push(f)
            }),
            e
        },
        _parseCustomMarkup: function(a, b, c) {
            var e = this;
            c.items || (c.items = []),
            a.attr("data-custom", "true"),
            0 === a.find(Y).length && a.children().first().addClass(X),
            a.find(Ha).each(function(a) {
                var f, g, h, i;
                i = d(this),
                h = i.closest(ha),
                i.attr("role", "menuitem"),
                0 === h.length && (h = d(this),
                h.addClass(ga)),
                h.hasClass(ra) || 0 !== h.find(ua).length || i.addClass(ra),
                h[0].id = b + "_" + a,
                "A" === this.nodeName && this.href ? (g = {
                    type: "action",
                    label: i.text(),
                    href: this.href
                },
                c.items[a] = g) : "BUTTON" === this.nodeName ? (g = {
                    type: "action",
                    label: i.text(),
                    action: function() {}
                },
                c.items[a] = g) : (i.attr("tabindex", "-1"),
                c.items[a] || (g = {
                    type: "display",
                    label: i.text(),
                    disabled: !0
                },
                c.items[a] = g)),
                f = h.attr("data-id"),
                f && (g.id = f,
                "action" === g.type && f && apex.actions && e.actionsContext.lookup(f) && (g.action = f,
                delete g.href,
                delete g.label,
                delete g.disabled,
                delete g.icon,
                delete g.iconType))
            })
        },
        _processMenuCustomMarkup: function() {
            var b = this;
            this.element.find("." + na).each(function() {
                var c = d(this).children(V)
                  , e = this.id
                  , f = b._getMenuItemFromId(e).menu;
                f && f.customContent && ("string" == typeof f.customContent && (c.empty().append(d("#" + a.escapeCSS(f.customContent)).show()),
                f.customContent = !0),
                b._parseCustomMarkup(c, e, f))
            })
        },
        _getMenuItemFromId: function(a) {
            var b, c, d = this.options, e = a.split("_"), f = [], g = null;
            for (b = e.length - 1,
            e[b].match(/^c[0-9]+$/) && (b -= 1); b > 0 && e[b].match(/^[0-9]+$/); b--)
                f.unshift(1 * e[b]);
            for (c = d.items,
            b = 0; b < f.length; b++) {
                if (g = c[f[b]],
                !g || b < f.length - 1 && !g.menu)
                    return null;
                g.menu && (c = g.menu.items)
            }
            return g
        },
        _itemIsHidden: function(a) {
            var b = a.hide
              , c = this.options;
            return d.isFunction(b) && (b = a.hide(c)),
            b
        },
        _itemIsDisabled: function(a) {
            var b = a.disabled
              , c = this.options;
            return d.isFunction(b) && (b = a.disabled(c)),
            b
        },
        _renderMenubar: function(a, g, h) {
            var i = ""
              , j = this
              , k = 0
              , l = this.options
              , m = "NEXT" === l.tabBehavior;
            return l.behaveLikeTabs && d.each(h.items, function(a, b) {
                if (r(b) && (b.current = !0),
                b.current)
                    return k = a,
                    !1
            }),
            this.element.find("." + W).filter("[data-custom]").each(function() {
                var a = d(this).children().eq(0)
                  , b = j._getMenuItemFromId(a.closest(ia)[0].id);
                b.menu.customContent = a[0].id,
                d(document.body).append(a)
            }),
            a.markup("<ul>"),
            d.each(h.items, function(d, h) {
                var n, o, p, q, r, t = h.type, u = g + "_" + d;
                if ("action" === h.type && "string" == typeof h.action) {
                    if (!apex.actions)
                        throw new Error("Action name requires apex.actions");
                    q = j.actionsContext.lookup(h.action),
                    q ? (h.hide = !1,
                    q.label && !h.label && (h.label = q.label),
                    q.hide !== e && (h.hide = q.hide),
                    q.disabled !== e && (h.disabled = q.disabled),
                    q.href && !h.href && (h.href = q.href)) : (b.warn("Unknown action name " + h.action + " (item hidden)."),
                    h.hide = !0)
                }
                if (!j._itemIsHidden(h)) {
                    if (o = na,
                    p = j._itemIsDisabled(h),
                    p && (o += " " + Da),
                    "subMenu" === h.type && (h.action || h.href) && (o += " " + ya),
                    l.behaveLikeTabs && h.current && (o += " " + za,
                    r = " <span class='u-VisuallyHidden'>" + c.getMessage("APEX.MENU.CURRENT_MENU") + "</span>"),
                    h._overflow && (o += " " + oa),
                    "action" !== t && "subMenu" !== t)
                        throw new Error("Menu item type not supported in menubar: " + t);
                    a.markup("<li").attr("id", u).attr("class", o).markup(">"),
                    i += " " + u + "i",
                    s(h),
                    n = h.label,
                    (h.icon || h.iconType) && b.warn("Menu bar items cannot have icons."),
                    h.accelerator && b.warn("Menu bar items cannot have accelerators."),
                    p ? a.markup("<span role='menuitem'").attr("class", ta).attr("tabindex", m || d === k ? "0" : "-1").attr("id", u + "i").optionalAttr(Oa, p ? "true" : null).optionalAttr(Pa, "subMenu" === t ? "true" : null).markup(">").content(n).markup("</span>") : h.href && l.useLinks ? (a.markup("<a role='menuitem'").attr("class", ta).attr("id", u + "i").attr("href", h.href).optionalAttr("tabindex", m || d === k ? null : "-1").optionalAttr(Pa, "subMenu" === t ? "true" : null).markup(">").content(n),
                    l.behaveLikeTabs && h.current && a.markup(r),
                    a.markup("</a>")) : (a.markup("<button type='button' role='menuitem'").attr("class", ta).attr("id", u + "i").optionalAttr("tabindex", m || d === k ? null : "-1").optionalAttr(Pa, "subMenu" === t ? "true" : null),
                    h._overflow ? a.attr("title", n).markup("><span class='a-Icon icon-down-chevron'></span>") : (a.markup(">").content(n),
                    l.behaveLikeTabs && h.current && a.markup(r)),
                    a.markup("</button>")),
                    "subMenu" === t && ((h.action || h.href || l.menubarShowSubMenuIcon) && !h._overflow && (a.markup("<span class='" + wa + "'>"),
                    f(a, Ka, !l.menubarShowSubMenuIcon || h.action || h.href ? "icon-menu-split-drop-down" : "icon-menu-drop-down"),
                    a.markup("</span>")),
                    a.markup("<div").attr("id", u + "m").markup(" class='" + U + " " + W + "' role='menu' tabindex='-1' style='display:none;'></div>")),
                    a.markup("</li>")
                }
            }),
            a.markup("</ul>"),
            d.trim(i)
        },
        _renderMenu: function(c, g, h, i) {
            function j() {
                t = !1,
                u > 0 && (c.markup("<li class='").markup(Ba).markup("' role='separator'><div class='a-Menu-inner'><span class='a-Menu-labelContainer'><span class='").markup(qa).markup("'></span><span class='").markup(Aa).markup("'></span></span><span class='a-Menu-accelContainer'></span></div></li>"),
                u += 1)
            }
            function k(a, b, d) {
                c.markup("<span class='" + qa + "'>"),
                (b || "" === b) && f(c, a, b, d),
                c.markup("</span>")
            }
            function l(a) {
                c.markup("<span").attr("class", sa).markup("> ").content(a).markup("</span>")
            }
            function m(a, b, d, e, f, g, h, i) {
                var j;
                b ? (c.markup("<span tabindex='-1'").optionalAttr(Oa, b ? "true" : null),
                j = "</span>") : f && p.useLinks ? (c.markup("<a").attr("href", f),
                j = "</a>") : (c.markup("<button type='button'"),
                j = "</button>"),
                c.attr("id", a).attr("role", g).attr("class", ra).optionalAttr(Pa, i ? "true" : null).optionalAttr(Qa, null !== h && h ? "true" : null).markup(">"),
                c.content(d),
                e && c.markup(" <span class='u-VisuallyHidden'>").content(e).markup("</span>"),
                c.markup(j).markup("</span><span class='a-Menu-accelContainer'>"),
                e && l(e)
            }
            function n() {
                c.markup("<span class='" + wa + "'></span>")
            }
            var o = ""
              , p = this.options
              , q = this
              , r = this.element.hasClass(Ma)
              , t = !1
              , u = 0
              , v = "icon-menu-sub";
            return r && (v = "icon-menu-sub-rtl"),
            c.markup("<div class='" + X + "'><ul>"),
            d.each(h.items, function(h, l) {
                var r, w, x, y, z, A, B, C, D, E, F, G, H = null, I = l.type, J = g + "_" + h;
                if (s(l),
                y = l.icon,
                z = l.iconType,
                w = l.label,
                G = l.href,
                C = l.accelerator,
                ("action" === l.type || "toggle" === l.type || "radioGroup" === l.type) && "string" == typeof l.action) {
                    if (!apex.actions)
                        throw new Error("Action name requires apex.actions");
                    H = q.actionsContext.lookup(l.action),
                    H ? (l.hide = !1,
                    H.icon && !l.icon && (y = H.icon),
                    H.iconType && !l.iconType && (z = H.iconType),
                    H.label && !l.label && (w = H.label),
                    H.shortcut && !l.accelerator && (C = H.shortcut),
                    H.hide !== e && (l.hide = H.hide),
                    H.disabled !== e && (l.disabled = H.disabled),
                    H.href !== e && (G = H.href),
                    H.choices && (l.choices = H.choices)) : (b.warn("Unknown action name " + l.action + " (item hidden)."),
                    l.hide = !0)
                }
                q._itemIsHidden(l) || (x = "separator" === I ? Ba : ga,
                A = q._itemIsDisabled(l),
                A && (x += " " + Da),
                0 === h && i && p.firstItemIsDefault && (x += " " + ma),
                "radioGroup" === I ? (t = !0,
                H && (l = H),
                r = l.get(),
                d.each(l.choices, function(a, e) {
                    var f = J + "_c" + a
                      , g = r === e.value;
                    C = e.accelerator || null,
                    e.shortcut && !C && (C = e.shortcut),
                    x = ga,
                    A = e.disabled,
                    d.isFunction(A) && (A = e.disabled(p)),
                    A && (x += " " + Da),
                    e.icon && !H && b.warn("Radio menu items cannot have icons."),
                    t && j(),
                    c.markup("<li").attr("id", f).attr("class", x).markup("><div class='a-Menu-inner'><span class='a-Menu-labelContainer'>"),
                    k(Ka, g ? "icon-menu-radio" : ""),
                    s(e),
                    D = f + "i",
                    o += " " + D,
                    m(D, A, e.label, C, null, "menuitemradio", g),
                    n(),
                    c.markup("</span></div></li>"),
                    u += 1
                }),
                t = !0) : "separator" === I ? t = !0 : (B = "toggle" === I ? "menuitemcheckbox" : "menuitem",
                t && j(),
                D = J + "i",
                c.markup("<li id='").attr(J).markup("' class='").attr(x).markup("'><div class='a-Menu-inner'><span class='a-Menu-labelContainer'>"),
                "action" === I || "display" === I ? (k(z || p.iconType, y, l.iconStyle),
                m(D, A, w, C, G || "", B, null),
                n(),
                c.markup("</span></div>")) : "toggle" === I ? (H && (l = H),
                r = l.get(),
                l.icon && !H && b.warn("Toggle menu items cannot have icons."),
                l.label && (l.onLabel || l.offLabel) && b.warn("Toggle menu items should not have both label and on/offLabel properties."),
                w = l.label,
                y = r ? "icon-menu-check" : "",
                w || (y = null,
                w = r ? l.onLabel : l.offLabel,
                B = "menuitem",
                r = null),
                k(Ka, y),
                m(D, A, w, C, null, B, r),
                n(),
                c.markup("</span></div>")) : "subMenu" === I && (k(l.iconType || p.iconType, l.icon, l.iconStyle),
                m(D, A, l.label, null, "", B, null, !0),
                l.accelerator && b.warn("Sub menu items cannot have accelerators."),
                c.markup("<span class='" + wa + "'>"),
                f(c, Ka, v),
                c.markup("</span></span></div>"),
                E = a.htmlBuilder(),
                F = q._renderMenu(E, J, l.menu, !1),
                c.markup("<div class='" + U + "' role='menu' tabindex='-1'").attr("id", D + "m").markup(">" + E.toString()),
                c.markup("</div>")),
                o += " " + D,
                c.markup("</li>"),
                u += 1))
            }),
            c.markup("</ul></div>"),
            d.trim(o)
        },
        _checkScrollBounds: function(a, b) {
            return a.find(aa).removeClass(Da),
            b.scrollTop <= 0 ? (a.find(aa + "." + ca).addClass(Da),
            b.scrollTop = 0,
            !0) : b.scrollTop >= b.scrollHeight - b.clientHeight && (a.find(aa + "." + da).addClass(Da),
            b.scrollTop = b.scrollHeight - b.clientHeight,
            !0)
        },
        _startScrolling: function(a, b) {
            function c() {
                return h.scrollTop += b ? -10 : 10,
                e._checkScrollBounds(a, h) ? void e._stopScrolling() : (e.scrollTimerId = setTimeout(function() {
                    c()
                }, g[f]),
                void (f < g.length - 1 && (f += 1)))
            }
            var e = this
              , f = 0
              , g = [100, 99, 96, 91, 84, 75, 64, 51, 36, 19]
              , h = k(a)[0];
            this.scrollTimerId && this._stopScrolling(),
            d(document).on("mouseup.menuScrolling", function() {
                e._stopScrolling()
            }).on("mousemove.menuScrolling", function(a) {
                0 === d(a.target).closest(aa).length && e._stopScrolling()
            }),
            c()
        },
        _stopScrolling: function() {
            clearTimeout(this.scrollTimerId),
            this.scrollTimerId = null,
            this.element.find(aa).removeClass(Fa),
            d(document).off(".menuScrolling")
        },
        _adjustMenubarForSize: function(b, f) {
            var g, h, i, j, k, l, m, n = !1, o = 0, p = this.element.width() - 2, q = f.items;
            for (k = q[q.length - 1],
            k && k._overflow || (k = null),
            g = 0; g < q.length; g++)
                i = q[g],
                i.hide ? i._width = 0 : i._width = d("#" + a.escapeCSS(b + "_" + g)).outerWidth(!0),
                o += i._width;
            if (o > p)
                for (k || (k = {
                    type: "subMenu",
                    _overflow: !0,
                    label: c.getMessage("APEX.MENU.OVERFLOW_LABEL"),
                    menu: {
                        items: []
                    }
                },
                q.push(k)),
                h = k.menu.items,
                g = q.length - 2; g >= 0 && o > p; )
                    i = q[g],
                    q.splice(g, 1),
                    "subMenu" === i.type && (i.action || i.href) && i.menu.items.unshift({
                        type: "action",
                        label: i.label,
                        labelKey: i.labelKey,
                        href: i.href,
                        action: i.action,
                        disabled: i.disabled
                    }),
                    "subMenu" === i.type && i.menu.customContent && (m = d("#" + a.escapeCSS(b + "_" + g)),
                    l = m.children(V).children().eq(0),
                    l.hide(),
                    i.menu.customContent = l[0].id,
                    d(document.body).append(l),
                    m.children(V).attr("data-custom", null)),
                    h.unshift(i),
                    o -= i._width !== e ? i._width : 0,
                    n = !0,
                    g -= 1;
            else if (k) {
                for (h = k.menu.items,
                j = 0,
                g = 0; g < h.length && j < 3; g++)
                    h[g]._width > 0 && (j += 1);
                for (1 === j && (o -= this.element.find("." + oa).outerWidth(!0)),
                delete k.current; h.length > 0 && (i = h[0],
                o += i._width !== e ? i._width : 0,
                !(o > p)); )
                    h.shift(),
                    "subMenu" === i.type && (i.action || i.href) && i.menu.items.shift(),
                    q.splice(q.length - 1, 0, i),
                    n = !0;
                0 === h.length && q.pop()
            }
            return n
        }
    }),
    d.ui.dialog && d.widget("ui.dialog", d.ui.dialog, {
        _allowInteraction: function(a) {
            return d(a.target).closest(V).length > 0 || this._super(a)
        }
    }),
    d(document).ready(function() {
        function c(c, e, f) {
            var g, h = c.attr("data-menu");
            if (h) {
                if (g = d("#" + a.escapeCSS(h)),
                !g.length)
                    return void b.error("Menu cannot be found " + h);
                c.addClass(Fa).attr(Na, "true"),
                f && Sa.isCurrentMenu(g[0]) || g.menu("toggle", c, !1).on("menuafterclose.menubutton", function(a, b) {
                    d(this).off(".menubutton"),
                    c.removeClass(Fa).attr(Na, "false")
                }),
                e && t(g.find(ia).first())
            }
        }
        d("body").on("click", La, function(a) {
            c(d(this), !0, !1)
        }).on("keydown", La, function(a) {
            a.which === Ra.DOWN ? (a.preventDefault(),
            c(d(this), !0, !0)) : a.which === Ra.TAB && (A = !0,
            Sa.closeAll())
        }),
        d(La).attr(Pa, "true").attr(Na, "false"),
        d("body").on("apexafterrefresh", function(a) {
            d(a.target).find(La).attr(Pa, "true").attr(Na, "false")
        })
    })
}(apex.util, apex.debug, apex.lang, apex.jQuery);
var ToggleCore = function(a) {
    return function(b) {
        a = b.extend({}, {
            useSessionStorage: !0,
            defaultExpandedPreference: !1,
            onClick: function() {},
            onResize: function() {},
            onInitialize: function() {
                r ? u() : v()
            },
            onCollapse: function() {},
            onExpand: function() {}
        }, a);
        var c = a.key
          , d = a.defaultExpandedPreference
          , e = a.onExpand
          , f = a.onCollapse
          , g = a.onResize
          , h = a.onClick
          , i = a.onInitialize
          , j = a.content
          , k = a.contentClassExpanded
          , l = a.contentClassCollapsed
          , m = a.controllingElement
          , n = a.controllingElementSelector
          , o = a.useSessionStorage
          , p = apex.storage.getScopedSessionStorage({
            prefix: c,
            usePageId: !0,
            useAppId: !0
        })
          , q = !1
          , r = d;
        if (o) {
            var s = p.getItem("preferenceForExpanded");
            s && (r = "true" === s)
        }
        (!m || m.length < 1) && (m = b(n)),
        m && m.click(function(a) {
            h.call(z),
            y(),
            m.focus(),
            a.preventDefault()
        });
        var t = function(a) {
            r = a,
            o && p.setItem("preferenceForExpanded", r)
        }
          , u = function() {
            q = !1,
            w.call(z)
        }
          , v = function() {
            q = !0,
            x.call(z)
        }
          , w = function(a) {
            q || (q = !0,
            a && t(q),
            j.removeClass(l).addClass(k),
            e())
        }
          , x = function(a) {
            q && (q = !1,
            a && t(q),
            j.addClass(l).removeClass(k),
            f())
        }
          , y = function() {
            q ? x.call(z, !0) : w.call(z, !0)
        }
          , z = {
            key: c,
            setUserPreference: t,
            doesUserPreferExpanded: function() {
                return r
            },
            isExpanded: function() {
                return q
            },
            toggle: function() {
                y.call(z)
            },
            expand: function() {
                w.call(z)
            },
            collapse: function() {
                x.call(z)
            },
            forceExpand: u,
            forceCollapse: v,
            resize: function() {
                g.call(z)
            },
            initialize: function() {
                i.call(z)
            }
        };
        return z
    }(apex.jQuery)
};
!function(a, b, c) {
    "use strict";
    var d = "a-Collapsible"
      , e = d + "-content"
      , f = d + "-heading"
      , g = "is-expanded"
      , h = "is-collapsed"
      , i = "a-Icon"
      , j = i + " " + d + "-icon"
      , k = "."
      , l = k + d
      , m = "aria-controls"
      , n = "aria-expanded"
      , o = "aria-hidden";
    a.widget("apex.collapsible", {
        version: "5.0",
        widgetEventPrefix: "collapsible",
        baseId: null,
        heading$: null,
        controllingElement$: null,
        content$: null,
        isContentIdSetByWidget: !1,
        isHeadingIdSetByWidget: !1,
        isControllingElementALink: !1,
        core: null,
        expandedClass: g,
        collapsedClass: h,
        options: {
            heading: "h1,h2,h3,h4,h5,h6",
            controllingElement: "button,a",
            content: null,
            collapsed: !0,
            doCollapse: !0,
            universalTheme: !1,
            expandedClass: null,
            collapsedClass: null,
            rememberState: !1
        },
        _create: function() {
            var b, g, h = this, i = c.htmlBuilder(), k = this.options, p = a(l).length;
            this.baseId = "a_Collapsible" + (p + 1) + "_" + this.element.attr("id"),
            this.element.addClass(d),
            k.expandedClass && (this.expandedClass += " " + k.expandedClass),
            k.collapsedClass && (this.collapsedClass += " " + k.collapsedClass),
            this.heading$ = this.element.find(k.heading).first(),
            this.heading$.addClass(f),
            this.controllingElement$ = this.element.find(k.controllingElement).first(),
            this.controllingElement$.text() || (g = this.heading$[0].id,
            g || (g = this.baseId + "_heading",
            this.heading$[0].id = g,
            this.isHeadingIdSetByWidget = !0),
            this.controllingElement$.attr("aria-labelledby", g)),
            k.universalTheme ? this.content$ = k.content : k.content ? this.content$ = this.element.find(k.content).first() : this.content$ = this.heading$.next(),
            this.content$.addClass(e),
            b = this.content$[0].id,
            b || (b = this.baseId + "_content",
            this.content$[0].id = b,
            this.isContentIdSetByWidget = !0),
            this.controllingElement$.attr(m, b).attr(n, !k.collapsed),
            this.controllingElement$.is("a") && (this.isControllingElementALink = !0),
            i.markup("<span").attr("class", j).attr("aria-hidden", !0).markup(">").markup("</span>"),
            this.controllingElement$.prepend(i.toString()),
            this.isControllingElementALink && (this.controllingElement$.attr("role", "button"),
            this._on(this.controllingElement$, {
                keypress: function(b) {
                    b.which === a.ui.keyCode.SPACE && (h.core.toggle(),
                    b.preventDefault())
                }
            })),
            this.core = ToggleCore({
                key: h.baseId,
                controllingElement: this.controllingElement$,
                content: h.element,
                contentClassExpanded: this.expandedClass,
                contentClassCollapsed: this.collapsedClass,
                defaultExpandedPreference: !k.collapsed,
                useSessionStorage: k.rememberState,
                onExpand: function() {
                    h.content$.attr(o, "false"),
                    k.doCollapse && h.content$.show(),
                    h.controllingElement$.attr(n, "true"),
                    h._trigger("expand")
                },
                onCollapse: function() {
                    h.content$.attr(o, "true"),
                    k.doCollapse && h.content$.hide(),
                    h.controllingElement$.attr(n, "false"),
                    h._trigger("collapse")
                }
            }),
            this.core.initialize()
        },
        _destroy: function() {
            this.element.removeClass(d + " " + this.collapsedClass + " " + this.expandedClass),
            this.controllingElement$.removeAttr(n).removeAttr(m),
            this._off(this.controllingElement$),
            this.isContentIdSetByWidget && this.content$.removeAttr("id"),
            this.isHeadingIdSetByWidget && this.heading$.removeAttr("id"),
            this.heading$.removeClass(f),
            this.content$.removeAttr(o).removeClass(e),
            this.options.doCollapse && this.content$.show()
        },
        expand: function() {
            this.core.expand()
        },
        collapse: function() {
            this.core.collapse()
        },
        toggle: function() {
            this.core.toggle()
        },
        getCore: function() {
            return this.core
        }
    }),
    apex.message && apex.message.addVisibilityCheck(function(b) {
        a("#" + b).parents(".a-Collapsible").collapsible("expand")
    }),
    apex.widget.util.visibilityChange && a(document.body).on("collapsibleexpand", function(a) {
        apex.widget.util.visibilityChange(a.target, !0)
    }).on("collapsiblecollapse", function(a) {
        apex.widget.util.visibilityChange(a.target, !1)
    })
}(apex.jQuery, apex.lang, apex.util);
!function(a, b, c) {
    "use strict";
    function d() {
        var a, c;
        e && (a = e.target,
        c = b.Event(e),
        c.target = c.currentTarget = e.originalEvent.target,
        b(a).data("ui-tooltip") && b(a).tooltip("close", c))
    }
    var e = null;
    a.tooltipManager = {
        closeTooltip: d,
        disableTooltips: function() {
            this.closeTooltip(),
            b(document.body).find(":data(ui-tooltip)").tooltip("disable")
        },
        enableTooltips: function() {
            b(document.body).find(":data(ui-tooltip)").tooltip("enable")
        },
        defaultShowOption: function() {
            return {
                delay: 1e3,
                effect: "show",
                duration: 500
            }
        }
    },
    b(document).ready(function() {
        b(document.body).on("tooltipopen", function(a, b) {
            d(),
            e = a,
            a.originalEvent || (e.originalEvent = {
                target: a.target
            })
        }).on("tooltipclose", function(a, b) {
            e && a.originalEvent && e.originalEvent.target === a.originalEvent.target && (e = null)
        })
    })
}(apex, apex.jQuery);
apex.theme = {},
function(a, b, c, d, e, f) {
    "use strict";
    var g = "apex_popup_field_help"
      , h = "#" + g
      , i = "apex_popup_help_area"
      , j = "#" + i
      , k = null
      , l = {};
    a.popupFieldHelpClassic = function(a, e, f) {
        function g() {
            i.document.open(),
            i.document.write("<!DOCTYPE html><html><head><title>" + a.title + "</title><link type='text/css' href='" + apex_img_dir + "app_ui/css/Core.css' rel='stylesheet'><link type='text/css' href='" + apex_img_dir + "apex_ui/css/Core.css' rel='stylesheet'><link type='text/css' href='" + apex_img_dir + "apex_ui/css/Theme-Standard.css' rel='stylesheet'></head></html><body style='min-height: 0px; min-width: 0px;'><div class='a-Region-header'><div class='a-Region-headerItems'><h1 class='a-Region-title'><b>" + a.title + "</b></h1></div><div class='a-Region-headerItems a-Region-headerItems--buttons'><button class='a-Button' onclick='window.close();' type='button'>" + d.getMessage("APEX.DIALOG.CLOSE") + "</button></div></div><div class='apex-help-dialog'>" + a.helpText + "</div></body>"),
            i.document.close()
        }
        var h, i;
        c.isPlainObject(a) || (h = f ? f : "wwv_flow_item_help.show_help?p_item_id=" + a + "&p_session=" + e,
        h += "&p_output_format=HTML"),
        i = b.popup({
            url: h,
            name: "Help",
            width: 500,
            height: 350
        }),
        h || g()
    }
    ,
    a.popupFieldHelp = function(b, f, m) {
        function n(a) {
            var b, d = c("<span></span>");
            return b = a.replace(/&#?\w+;/g, function(a) {
                return d.html(a),
                d.text()
            })
        }
        function o(a) {
            var b = e.getTopApex().jQuery(h)
              , f = e.getTopApex().jQuery(j);
            0 === b.length ? (0 === f.length && e.getTopApex().jQuery("#wwvFlowForm").after("<div id='" + i + "'></div>"),
            b = e.getTopApex().jQuery("<div id='" + g + "' tabindex='0'>" + a.helpText + "</div>"),
            b.dialog({
                closeText: d.getMessage("APEX.DIALOG.CLOSE"),
                title: n(a.title),
                appendTo: j,
                dialogClass: "ui-dialog--helpDialog",
                width: 500,
                minHeight: 96,
                create: function() {
                    b.closest(".ui-dialog").css("position", "fixed")
                },
                resize: function() {
                    b.closest(".ui-dialog").css("position", "fixed")
                },
                close: function() {
                    k && c(k).focus()
                }
            }).keydown(function(a) {
                117 === a.which && a.altKey && k && c(k).focus()
            })) : b.html(a.helpText).dialog("option", "title", n(a.title)).dialog("open"),
            b.focus()
        }
        var p;
        if (k = document.activeElement || null,
        p = m ? m : "wwv_flow_item_help.show_help?p_item_id=" + b + "&p_session=" + f,
        $x("pScreenReaderMode"))
            a.popupFieldHelpClassic(b, f, m);
        else {
            if (c.isPlainObject(b))
                return b.helpText.indexOf("apex-help-dialog") < 0 && (b.helpText = "<div class='apex-help-dialog'>" + b.helpText + "</div>"),
                void o(b);
            l[b] ? o(l[b]) : c.getJSON(p + "&p_output_format=JSON", function(a) {
                a.title && a.helpText && (o(a),
                b && (l[b] = a))
            })
        }
    }
    ,
    c(document).ready(function() {
        c(document.body).on("click", ".js-itemHelp", function() {
            var b = c(this).attr("data-itemhelp");
            b && a.popupFieldHelp(b, $v("pInstance"))
        }).on("keydown", function(b) {
            112 === b.which && b.altKey && c(b.target).parents().each(function() {
                var b, d;
                if (this.id && /_CONTAINER$/.test(this.id) || "TD" === this.nodeName) {
                    if (b = c(this).find(".js-itemHelp"),
                    b.length && (d = b.attr("data-itemhelp")))
                        return a.popupFieldHelp(d, $v("pInstance")),
                        !1;
                    if ("TD" !== this.nodeName)
                        return !1
                }
            })
        }),
        c(document.body).on("dialogopen dialogclose", function(a) {
            var b = c(a.target);
            !b.is(h) && b.dialog("option", "modal") && c(h).dialog("close")
        }),
        c(document.body).on("click", "label", function(a) {
            var b, d = c(this).attr("for");
            d && (b = c("#" + e.escapeCSS(d)),
            b.is("input,textarea,select") && !b.prop("disabled") && b.is(":visible") || 0 !== c(this).find("a").length || (apex.item(d).setFocus(),
            a.preventDefault()))
        }),
        c(".js-regionDialog").each(function() {
            var a = c(this)
              , b = /js-dialog-size(\d+)x(\d+)/.exec(this.className)
              , d = {
                autoOpen: !1,
                closeText: apex.lang.getMessage("APEX.DIALOG.CLOSE"),
                modal: a.hasClass("js-modal"),
                resizable: a.hasClass("js-resizable"),
                draggable: a.hasClass("js-draggable"),
                dialogClass: "ui-dialog--inline",
                create: function() {
                    c(this).closest(".ui-dialog").css("position", "fixed")
                }
            }
              , f = c("<div style='display:none'></div>");
            b && (d.width = b[1],
            d.height = b[2]),
            c.each(["width", "height", "minWidth", "minHeight", "maxWidth", "maxHeight"], function(b, c) {
                var e = parseInt(a.attr("data-" + c.toLowerCase()), 10);
                isNaN(e) || (d[c] = e)
            }),
            c.each(["appendTo", "dialogClass"], function(b, c) {
                var e = a.attr("data-" + c.toLowerCase());
                e && (d[c] = e)
            }),
            d.appendTo && "#" === d.appendTo.substring(0, 1) && 0 === c(d.appendTo).length && c("#wwvFlowForm").after('<div id="' + e.escapeHTML(d.appendTo.substring(1)) + '"></div>'),
            a.before(f),
            a.dialog(d).on("dialogopen", function() {
                d.modal && apex.navigation.beginFreezeScroll()
            }).on("dialogresize", function() {
                c(this).closest(".ui-dialog").css("position", "fixed")
            }).on("dialogclose", function() {
                d.modal && apex.navigation.endFreezeScroll()
            }),
            c(apex.gPageContext$).on("apexpagesubmit", function() {
                a.dialog("close").css("display", "none"),
                f.replaceWith(a)
            })
        })
    }),
    a.pageResizeInit = function() {
        c("#wwvFlowForm").addClass("resize"),
        c("body > link").hide(),
        c("body").css("overflow", "hidden"),
        c(".resize").each(function() {
            "flex" === c(this).css("display") && c(this).css("display", "block")
        }),
        c("body").on("resize", function(a) {
            var b, d, f, g, h = c(a.target);
            "BODY" === a.target.nodeName ? (b = document.documentElement.clientHeight,
            d = document.documentElement.clientWidth) : (b = h.height(),
            d = h.width()),
            f = h.children(".resize").filter(":visible"),
            f.length > 0 && (h.children(":not(.resize)").filter(":visible").each(function() {
                g = c(this).css("position"),
                "fixed" !== g && "absolute" !== g && (b -= c(this).outerHeight(!0))
            }),
            b = Math.floor(b / f.length),
            f.each(function() {
                var a = c(this);
                e.setOuterHeight(a, b),
                e.setOuterWidth(a, d),
                a.filter(":visible").trigger("resize")
            })),
            a.stopPropagation()
        }),
        c(".ui-accordion.resize").on("resize", function(a) {
            a.target === this && (c(this).accordion("refresh"),
            a.stopPropagation())
        }),
        c(".ui-tabs.resize").on("resize", function(a) {
            a.target === this && (c(this).tabs("refresh").children(".ui-tabs-panel.resize").trigger("resize"),
            a.stopPropagation())
        }),
        c(window).on("apexwindowresized", function() {
            c("body").trigger("resize")
        }),
        c("body").trigger("resize")
    }
    ,
    a.defaultStickyTop = function() {
        return 0
    }
    ,
    a.initWizardProgressBar = function(a) {
        var b = a ? a : "t-WizardSteps"
          , e = "." + b;
        c(e).find(e + "-step.is-active").find("span" + e + "-labelState").text(d.getMessage("APEX.ACTIVE_STATE")).end().prevAll(e + "-step").addClass("is-complete").find("span" + e + "-labelState").text(d.getMessage("APEX.COMPLETED_STATE"))
    }
    ,
    a.initResponsiveDialogs = function() {
        c("body").on("dialogopen", ".ui-dialog-content", function() {
            var a = c(this)
              , b = a.closest(".ui-dialog");
            if (!(b.find(".utr-container").length > 0)) {
                b.css("maxWidth", "100%");
                var d = b.find(".ui-dialog-buttonpane")
                  , e = 0;
                d.length > 0 && (e = d.outerHeight() + 20);
                var f = a.height();
                a.dialog("option", "show") && (f = parseInt(a.dialog("option", "height"), 10));
                var g = parseInt(a.dialog("option", "minHeight"), 10);
                g || (g = 0);
                var h = function() {
                    var d = b.offset()
                      , h = c(window);
                    d.top -= h.scrollTop(),
                    d.left -= h.scrollLeft();
                    var i = h.width()
                      , j = b.outerWidth();
                    d.left + j > i && b.css("left", i - j);
                    var k = c(window).height()
                      , l = b.height()
                      , m = c(".ui-dialog--apex .ui-dialog-content")
                      , n = c(".ui-dialog .js-regionDialog")
                      , o = function(a) {
                        var b = a.dialog("option", "position");
                        return "number" == typeof b[0]
                    };
                    if (k < f + e) {
                        var p = k - b.find(".ui-dialog-titlebar").outerHeight() - e;
                        a.height(Math.max(p, g)),
                        l = b.height()
                    } else
                        f + e < k && a.height(f);
                    if (d.top + l > k) {
                        var q = 0;
                        "absolute" === b.css("position") && (q = h.scrollTop()),
                        b.css("top", Math.max(k - l + q, 0))
                    }
                    o(m) || m.dialog("option", "position", "center"),
                    o(n) || n.dialog("option", "position", "center")
                };
                c(window).on("apexwindowresized", h),
                setTimeout(function() {
                    h()
                }, 250),
                a.on("dialogclose", function() {
                    c(window).off("apexwindowresized", h)
                })
            }
        })
    }
    ,
    a.openCustomizeDialog = function(a, b) {
        apex.jQuery(c("#pFlowStepId")).on("apexafterclosedialog", function(a, b) {
            var c = document.location.href.replace(/&?success_msg=([^&]$|[^&]*)/i, "") + b.successMessage.urlSuffix;
            document.location.href = c
        }),
        apex.navigation.dialog("wwv_flow_customize.show?p_flow=" + $v("pFlowId") + "&p_page=" + $v("pFlowStepId") + "&p_session=" + $v("pInstance") + "&p_lang=" + b, {
            title: a,
            height: 450,
            scroll: "no",
            width: 600,
            maxWidth: 800,
            modal: !0,
            resizable: !0
        }, null, c("#pFlowStepId"))
    }
}(apex.theme, apex.navigation, apex.jQuery, apex.lang, apex.util);
