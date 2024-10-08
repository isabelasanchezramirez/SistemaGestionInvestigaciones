!function($) {
    var NO_CYCLE = -1
      , TAB_CONTENTS = "#TAB_CONTENTS#"
      , TAB_CONTENT = "#TAB_CONTENT#"
      , TAB_LABEL = "#TAB_LABEL#"
      , TAB_ID = "#TAB_ID#"
      , TABS = "#TABS#"
      , CAROUSEL_ID = "#CAROUSEL_ID#"
      , TAB_CONTENT_TEMPLATE = '<div class="a-Region-carouselItem" id="CR_' + TAB_ID + '" role="tabpanel" aria-hidden="false">' + TAB_CONTENT + "</div>"
      , TAB_TEMPLATE = '<li class="a-Region-carouselNavItem" aria-controls="CR_' + TAB_ID + '" role="tab"><a href="#CR_' + TAB_ID + '" class="a-Region-carouselLink" tabindex="-1"><span class="a-Region-carouselLabel">' + TAB_LABEL + "</span></a></li>"
      , tpl = function(TEMPLATE, toReplace) {
        if (toReplace)
            for (var key in toReplace)
                TEMPLATE = TEMPLATE.split("#" + key + "#").join(toReplace[key]);
        return TEMPLATE.replace(/#[^\s]+#/g, "")
    };
    $.fn.carousel = function(options) {
        options = $.extend({}, {
            onRegionChange: function() {},
            time: NO_CYCLE,
            data: null,
            html: null,
            hidePrevious: !1,
            containerBodySelect: null
        }, options),
        this.each(function() {
            var carouselContainer$ = $(this)
              , HTML_TEMPLATE = '<div class="a-Region-carouselItems">' + TAB_CONTENTS + '</div><div class="a-Region-carouselControl"><ul class="a-Region-carouselNav" role="tablist" id="' + CAROUSEL_ID + '_tabs">' + TABS + "</ul></div>";
            HTML_TEMPLATE = tpl(HTML_TEMPLATE, {
                CAROUSEL_ID: carouselContainer$.attr("id")
            });
            var body$ = null == options.containerBodySelect ? carouselContainer$ : carouselContainer$.find(options.containerBodySelect).first();
            options.data ? !function() {
                for (var tabs = "", tabContents = "", i = 0, size = options.data.length; size > i; i++) {
                    var item = options.data[i];
                    tabContents += tpl(TAB_CONTENT_TEMPLATE, {
                        TAB_ID: item.id,
                        TAB_CONTENT: item.content
                    }),
                    tabs += tpl(TAB_TEMPLATE, {
                        TAB_ID: item.id,
                        TAB_LABEL: item.label
                    })
                }
                body$.html(tpl(HTML_TEMPLATE, {
                    TAB_CONTENTS: tabContents,
                    TABS: tabs
                }))
            }() : options.html && !function() {
                var children$ = body$.children();
                body$.append(tpl(HTML_TEMPLATE));
                var items = carouselContainer$.find(".a-Region-carouselItems").last()
                  , nav = carouselContainer$.find(".a-Region-carouselNav").last()
                  , buildTab = function(element) {
                    var id = element.attr("id")
                      , tabContent$ = $(tpl(TAB_CONTENT_TEMPLATE, {
                        TAB_ID: id
                    }))
                      , tab$ = $(tpl(TAB_TEMPLATE, {
                        TAB_ID: id,
                        TAB_LABEL: element.attr("data-label")
                    }));
                    tabContent$.append(element),
                    nav.append(tab$),
                    items.append(tabContent$)
                };
                if (options.html instanceof Array)
                    for (var n = 0, size = options.html.length; size > n; n++) {
                        var element = $(options.html[n]);
                        buildTab(element)
                    }
                else
                    children$.each(function() {
                        buildTab($(this))
                    })
            }();
            var useLocalStorage = carouselContainer$.hasClass("js-useLocalStorage")
              , id = carouselContainer$.find(".a-Region-carouselNav").last().attr("id")
              , time = options.time;
            if (time === NO_CYCLE) {
                var myRe = /js-cycle([0-9]+)s/
                  , match = carouselContainer$[0].className.match(myRe);
                null != match && match.length > 0 && (time = 1e3 * match[1])
            }
            var cycleTimeout, tabs$ = $([]), autoCycle = function() {
                clearTimeout(cycleTimeout),
                time === NO_CYCLE || tabs$.length <= 0 || (cycleTimeout = setTimeout(function() {
                    tabs$.aTabs("moveNextActive", {
                        doNotFocus: !0
                    })
                }, time))
            };
            $.apex.aTabs && (tabs$ = $("#" + id),
            tabs$.aTabs({
                mode: "standard",
                useSlider: !1,
                useLocationHash: !1,
                useSessionStorage: useLocalStorage,
                addMoveNextPrevious: !0,
                onRegionChange: function(mode, activeTab) {
                    autoCycle(),
                    options.onRegionChange(mode, activeTab)
                },
                showAllScrollOffset: !1,
                minHeight: !0,
                hidePreviousTab: options.hidePrevious,
                tabsContainer$: carouselContainer$.find(".a-Region-carouselItems").last().parent()
            }),
            autoCycle())
        })
    }
}(apex.jQuery);
