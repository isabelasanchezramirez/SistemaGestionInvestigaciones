window.Modernizr = function(window, document, undefined) {
    function setCss(str) {
        mStyle.cssText = str
    }
    function is(obj, type) {
        return typeof obj === type
    }
    function contains(str, substr) {
        return !!~("" + str).indexOf(substr)
    }
    function testProps(props, prefixed) {
        for (var i in props) {
            var prop = props[i];
            if (!contains(prop, "-") && mStyle[prop] !== undefined)
                return "pfx" == prefixed ? prop : !0
        }
        return !1
    }
    function testDOMProps(props, obj, elem) {
        for (var i in props) {
            var item = obj[props[i]];
            if (item !== undefined)
                return elem === !1 ? props[i] : is(item, "function") ? item.bind(elem || obj) : item
        }
        return !1
    }
    function testPropsAll(prop, prefixed, elem) {
        var ucProp = prop.charAt(0).toUpperCase() + prop.slice(1)
          , props = (prop + " " + cssomPrefixes.join(ucProp + " ") + ucProp).split(" ");
        return is(prefixed, "string") || is(prefixed, "undefined") ? testProps(props, prefixed) : (props = (prop + " " + domPrefixes.join(ucProp + " ") + ucProp).split(" "),
        testDOMProps(props, prefixed, elem))
    }
    var featureName, hasOwnProp, version = "2.6.2", Modernizr = {}, docElement = document.documentElement, mod = "modernizr", modElem = document.createElement(mod), mStyle = modElem.style, prefixes = " -webkit- -moz- -o- -ms- ".split(" "), omPrefixes = "Webkit Moz O ms", cssomPrefixes = omPrefixes.split(" "), domPrefixes = omPrefixes.toLowerCase().split(" "), tests = {}, classes = [], slice = classes.slice, injectElementWithStyles = function(rule, callback, nodes, testnames) {
        var style, ret, node, docOverflow, div = document.createElement("div"), body = document.body, fakeBody = body || document.createElement("body");
        if (parseInt(nodes, 10))
            for (; nodes--; )
                node = document.createElement("div"),
                node.id = testnames ? testnames[nodes] : mod + (nodes + 1),
                div.appendChild(node);
        return style = ["&#173;", '<style id="s', mod, '">', rule, "</style>"].join(""),
        div.id = mod,
        (body ? div : fakeBody).innerHTML += style,
        fakeBody.appendChild(div),
        body || (fakeBody.style.background = "",
        fakeBody.style.overflow = "hidden",
        docOverflow = docElement.style.overflow,
        docElement.style.overflow = "hidden",
        docElement.appendChild(fakeBody)),
        ret = callback(div, rule),
        body ? div.parentNode.removeChild(div) : (fakeBody.parentNode.removeChild(fakeBody),
        docElement.style.overflow = docOverflow),
        !!ret
    }, testMediaQuery = function(mq) {
        var matchMedia = window.matchMedia || window.msMatchMedia;
        if (matchMedia)
            return matchMedia(mq).matches;
        var bool;
        return injectElementWithStyles("@media " + mq + " { #" + mod + " { position: absolute; } }", function(node) {
            bool = "absolute" == (window.getComputedStyle ? getComputedStyle(node, null) : node.currentStyle).position
        }),
        bool
    }, isEventSupported = function() {
        function isEventSupported(eventName, element) {
            element = element || document.createElement(TAGNAMES[eventName] || "div"),
            eventName = "on" + eventName;
            var isSupported = eventName in element;
            return isSupported || (element.setAttribute || (element = document.createElement("div")),
            element.setAttribute && element.removeAttribute && (element.setAttribute(eventName, ""),
            isSupported = is(element[eventName], "function"),
            is(element[eventName], "undefined") || (element[eventName] = undefined),
            element.removeAttribute(eventName))),
            element = null,
            isSupported
        }
        var TAGNAMES = {
            select: "input",
            change: "input",
            submit: "form",
            reset: "form",
            error: "img",
            load: "img",
            abort: "img"
        };
        return isEventSupported
    }(), _hasOwnProperty = {}.hasOwnProperty;
    hasOwnProp = is(_hasOwnProperty, "undefined") || is(_hasOwnProperty.call, "undefined") ? function(object, property) {
        return property in object && is(object.constructor.prototype[property], "undefined")
    }
    : function(object, property) {
        return _hasOwnProperty.call(object, property)
    }
    ,
    Function.prototype.bind || (Function.prototype.bind = function(that) {
        var target = this;
        if ("function" != typeof target)
            throw new TypeError;
        var args = slice.call(arguments, 1)
          , bound = function() {
            if (this instanceof bound) {
                var F = function() {};
                F.prototype = target.prototype;
                var self = new F
                  , result = target.apply(self, args.concat(slice.call(arguments)));
                return Object(result) === result ? result : self
            }
            return target.apply(that, args.concat(slice.call(arguments)))
        };
        return bound
    }
    ),
    tests.flexboxlegacy = function() {
        return testPropsAll("boxDirection")
    }
    ,
    tests.touch = function() {
        var bool;
        return "ontouchstart"in window || window.DocumentTouch && document instanceof DocumentTouch ? bool = !0 : injectElementWithStyles(["@media (", prefixes.join("touch-enabled),("), mod, ")", "{#modernizr{top:9px;position:absolute}}"].join(""), function(node) {
            bool = 9 === node.offsetTop
        }),
        bool
    }
    ;
    for (var feature in tests)
        hasOwnProp(tests, feature) && (featureName = feature.toLowerCase(),
        Modernizr[featureName] = tests[feature](),
        classes.push((Modernizr[featureName] ? "" : "no-") + featureName));
    Modernizr.addTest = function(feature, test) {
        if ("object" == typeof feature)
            for (var key in feature)
                hasOwnProp(feature, key) && Modernizr.addTest(key, feature[key]);
        else {
            if (feature = feature.toLowerCase(),
            Modernizr[feature] !== undefined)
                return Modernizr;
            test = "function" == typeof test ? test() : test,
            "undefined" != typeof enableClasses && enableClasses && (docElement.className += " " + (test ? "" : "no-") + feature),
            Modernizr[feature] = test
        }
        return Modernizr
    }
    ,
    setCss(""),
    modElem = inputElem = null,
    Modernizr._version = version,
    Modernizr._prefixes = prefixes,
    Modernizr._domPrefixes = domPrefixes,
    Modernizr._cssomPrefixes = cssomPrefixes,
    Modernizr.mq = testMediaQuery,
    Modernizr.hasEvent = isEventSupported,
    Modernizr.testProp = function(prop) {
        return testProps([prop])
    }
    ,
    Modernizr.testAllProps = testPropsAll,
    Modernizr.testStyles = injectElementWithStyles,
    Modernizr.prefixed = function(prop, obj, elem) {
        return obj ? testPropsAll(prop, obj, elem) : testPropsAll(prop, "pfx")
    }
    ;
    var enableClasses = !0;
    return docElement.className = docElement.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (enableClasses ? " js " + classes.join(" ") : ""),
    Modernizr
}(this, this.document);
