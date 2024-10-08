apex.theme42 = {},
function(ut, $) {
    "use strict";
    var treeNav$, pageTitle$, pageBody$, bodyContent$, bodyContentOffset$, mainBody$, sideCol$, header$, actionsCol$, TREE_NAV = ut.TREE_NAV = "#t_TreeNav", PAGE_BODY = ut.PAGE_BODY = "#t_PageBody", PAGE_TITLE = ut.PAGE_TITLE = "#t_Body_title", HEADER = ut.HEADER = "#t_Header", SIDE_COL = ut.SIDE_COL = "#t_Body_side", BODY_CONTENT = ut.BODY_CONTENT = "#t_Body_content", BODY_CONTENT_OFFSET = ut.BODY_CONTENT_OFFSET = "#t_Body_content_offset", ACTIONS_COL = ut.ACTIONS_COL = "#t_Body_actions", T_ALERT_SUCCESS = (ut.T_MODAL_BODY = ".t-Dialog-body",
    "#t_Alert_Success"), APEX_SUCCESS_MESSAGE = "#APEX_SUCCESS_MESSAGE", marqueeRDS$ = (ut.dialogHeight = 0,
    $(".t-Body-info .apex-rds-container")), baseRDS$ = $(".apex-rds-container"), init = ut.init = {}, screenIsSmall = ut.screenIsSmall = function() {
        var pageHasTreeView = !!treeNav$ && treeNav$.length > 0
          , pageHasLeftAndIsTooSmall = pageHasTreeView && pageBody$.hasClass("t-PageBody--showLeft") && Modernizr.mq("only screen and (max-width: 992px)")
          , pageIsSimplyTooSmall = Modernizr.mq("only screen and (max-width: 640px)");
        return pageHasLeftAndIsTooSmall || pageIsSimplyTooSmall
    }
    ;
    ut.getTitleHeight = function() {
        return pageTitle$.outerHeight()
    }
    ;
    var getFixedHeight = ut.getFixedHeight = function() {
        var headerHeight = $("header").outerHeight()
          , rdsHeight = 0
          , paddingOffset = 12;
        return marqueeRDS$.length > 0 ? rdsHeight += marqueeRDS$.outerHeight() : baseRDS$.length > 0 && (rdsHeight += paddingOffset),
        screenIsSmall() ? pageBody$.hasClass("js-HeaderContracted") ? rdsHeight : headerHeight + rdsHeight : ($(".js-stickyTableHeader").length > 0 && (rdsHeight -= 1),
        ut.getTitleHeight() + headerHeight + rdsHeight)
    }
    ;
    apex.theme.defaultStickyTop = getFixedHeight,
    ut.sticky = function(selector) {
        $(selector).stickyWidget({
            zIndexStart: 200,
            toggleWidth: !0,
            stickToEnd: !0
        })
    }
    ,
    ut.renderBadges = function(children$, labelClass) {
        children$.each(function() {
            var label = this.innerHTML;
            if (-1 === label.indexOf("<span class='" + labelClass + "'>")) {
                var regex = /\[(.*)\]/
                  , match = regex.exec(label);
                null !== match && match.length > 1 && ("" === match[1] ? this.innerHTML = label.replace(regex, "") : (label = label.replace(/\[.*\]/, "") + "<span class='" + labelClass + "'>" + match[1] + "</span>",
                this.innerHTML = label))
            }
        })
    }
    ;
    var resetHeaderOffset = ut.resetHeaderOffset = function() {
        var pageTitleHeight = ut.getTitleHeight()
          , headerHeight = header$.outerHeight();
        Modernizr.mq("only screen and (min-width: 641px)") ? (sideCol$.css({
            top: pageTitleHeight + headerHeight
        }),
        bodyContentOffset$.css({
            height: pageTitleHeight + headerHeight
        }),
        mainBody$.css({
            "margin-top": 0
        }),
        (null === treeNav$ || treeNav$.length <= 0) && pageTitle$.css({
            top: headerHeight
        })) : (sideCol$.css({
            top: "0"
        }),
        bodyContentOffset$.css({
            height: "0"
        }),
        mainBody$.css({
            "margin-top": headerHeight
        })),
        actionsCol$.css({
            top: headerHeight
        })
    }
    ;
    ut.configureSuccessMessages = function(pOptions) {
        var timeOut, suc$ = $(T_ALERT_SUCCESS);
        if (pOptions && pOptions.autoDismiss && suc$[0]) {
            var hide = function() {
                timeOut = setTimeout(function() {
                    apex.message.hidePageSuccess(),
                    suc$.off(),
                    $(document).off("click", hide)
                }, pOptions.duration || 3e3)
            }
              , clear = function() {
                clearTimeout(timeOut)
            };
            hide(),
            suc$.on("click", function(e) {
                e.stopPropagation(),
                ut.configureSuccessMessages.clicked = !0,
                clear()
            }).on("mouseover", clear).on("mouseout", function() {
                ut.configureSuccessMessages.clicked || hide()
            }),
            $(document).on("click", hide),
            suc$.find(".t-Button--closeAlert").on("focus", clear),
            ut.configureSuccessMessages.options = pOptions
        }
    }
    ,
    function() {
        var pages = ut.pages = {
            masterDetail: {},
            leftSideCol: {},
            rightSideCol: {},
            noSideCol: {},
            appLogin: {},
            wizardPage: {},
            wizardModal: {},
            bothSideCols: {},
            popUp: {},
            modalDialog: {}
        };
        ut.initializePage = function() {
            var wrapFunc = function(key) {
                return function() {
                    var onReady = pages[key].onReady
                      , onTheme42Ready = pages[key].onTheme42Ready;
                    void 0 !== onReady && onReady(),
                    void 0 !== onTheme42Ready && $(window).on("theme42ready", function() {
                        onTheme42Ready()
                    })
                }
            }
              , returnPages = {};
            for (var key in pages)
                pages.hasOwnProperty(key) && (returnPages[key] = wrapFunc(key));
            return returnPages
        }()
    }(),
    function() {
        var delayResize;
        ut.delayResize = function() {
            clearTimeout(delayResize),
            delayResize = function() {
                $("body").trigger("theme42delayresizefinish"),
                $(".js-stickyWidget-toggle").each(function() {
                    $(this).trigger("forceresize")
                }),
                $(".js-stickyTableHeader").each(function() {
                    $(this).trigger("forceresize")
                }),
                $(".a-MenuBar").menu("resize")
            }
            ,
            setTimeout(delayResize, 201)
        }
    }(),
    window.openModal = function(pDialogId, pDialogTriggerId, pSetFocusId, pClear) {
        $("#" + pDialogId).dialog("open")
    }
    ,
    window.closeModal = function() {
        $(".ui-dialog-content").dialog("close")
    }
    ,
    init.carousel = function() {
        $.fn.carousel && $(".t-Region--carousel").carousel({
            containerBodySelect: ".t-Region-carouselRegions",
            html: !0
        })
    }
    ,
    init.tabs = function() {
        $.apex.aTabs && $(".t-TabsRegion").utTabs()
    }
    ,
    init.verticalRDS = function() {
        baseRDS$.length > 0 && ($(".apex-rds").aTabs().data("apex-aTabs")._getScrollOffset = function() {
            return $(".apex-rds").offset().top
        }
        )
    }
    ,
    init.rdsSticky = function() {
        marqueeRDS$.length > 0 && marqueeRDS$.stickyWidget({
            toggleWidth: !0,
            top: function() {
                return getFixedHeight() - marqueeRDS$.outerHeight()
            }
        })
    }
    ,
    init.apexDebug = function() {
        $(document).on("apex-devbar-grid-debug-on", function() {
            $("body").addClass("grid-debug-on")
        }).on("apex-devbar-grid-debug-off", function() {
            $("body").removeClass("grid-debug-on")
        })
    }
    ,
    init.topMenu = function() {
        if (!(treeNav$.length > 0 && $.menu)) {
            var render = function() {
                ut.renderBadges($(".t-Header-nav .a-MenuBar-label"), "t-Menu-badge")
            }
              , menubar$ = $(".t-Header-nav-list", "#t_Header");
            menubar$.is(":data('ui-menu')") ? render() : menubar$.on("menucreate", function() {
                render()
            })
        }
    }
    ,
    init.successMessage = function() {
        var msg$ = $(APEX_SUCCESS_MESSAGE);
        apex.message.setThemeHooks({
            beforeHide: function(pMsgType) {
                pMsgType === apex.message.TYPE.SUCCESS && msg$.addClass("animate-hide")
            },
            beforeShow: function(pMsgType) {
                if (pMsgType === apex.message.TYPE.SUCCESS) {
                    var opt = ut.configureSuccessMessages.options;
                    msg$.removeClass("animate-hide"),
                    opt && ut.configureSuccessMessages(opt)
                }
            }
        })
    }
    ,
    $(document).ready(function() {
        $(window).trigger("theme42preload"),
        ut.pageBody$ = pageBody$ = $(PAGE_BODY),
        ut.mainBody$ = mainBody$ = $(".t-Body-main"),
        ut.header$ = header$ = $(HEADER),
        ut.sideCol$ = sideCol$ = $(SIDE_COL),
        ut.bodyContent$ = bodyContent$ = $(BODY_CONTENT),
        ut.actionsCol$ = actionsCol$ = $(ACTIONS_COL),
        ut.treeNav$ = treeNav$ = $(TREE_NAV),
        ut.pageTitle$ = pageTitle$ = $(PAGE_TITLE),
        bodyContent$.prepend('<div id="t_Body_content_offset"></div>'),
        ut.bodyContentOffset$ = bodyContentOffset$ = $(BODY_CONTENT_OFFSET),
        $("body").hasClass("t-PageBody--noNav") && $("body").removeClass("apex-side-nav"),
        $(".t-NavigationBar-menu", apex.gPageContext$).menu(),
        actionsCol$.show(),
        setTimeout(function() {
            $(window).trigger("theme42ready"),
            $("body").removeClass("no-anim"),
            resetHeaderOffset(),
            init.alert(),
            $(".a-MenuBar").menu("resize"),
            init.carousel(),
            init.tabs(),
            init.rdsSticky(),
            ut.init = init = {}
        }, 50),
        init.backToTop(),
        init.hideShow(),
        init.apexDebug(),
        init.handleScrollTop(),
        init.maximize(),
        apex.theme.initResponsiveDialogs(),
        init.treeNav(),
        init.topMenu(),
        ut.toggleWidgets.initialize(),
        init.dialogAutoHeight(),
        init.successMessage()
    })
}(apex.theme42, apex.jQuery),
function(ut, init, $) {
    ut.modalAutoSize = function(elem) {
        if (window.parent === window.self)
            return $("body").addClass("js-dialogReady"),
            null;
        var l$ = apex.util.getTopApex().jQuery
          , boxId = "#" + window.frameElement.parentNode.id
          , box$ = l$(boxId)
          , reCenter = function() {
            box$.dialog("option", "position", "center")
        }
          , dialogReadyClass = function() {
            $("body").addClass("js-dialogReady"),
            box$.addClass("js-dialogReady")
        };
        if (0 !== $(".ui-dialog--stretch").length)
            return box$.parent().css({
                height: "95%",
                width: "95%"
            }),
            reCenter(),
            dialogReadyClass(),
            null;
        var parentWH = l$(parent.window).height() - 20
          , dMinHeight = parseInt(box$.dialog("option", "minHeight"), 10)
          , dMaxHeight = parseInt(box$.dialog("option", "maxHeight"), 10) || parentWH
          , heightAttr = box$.dialog("option", "height") || "auto"
          , newHeight = function() {
            var boxBody = $(elem).outerHeight()
              , boxTitle = box$.parent().find(".ui-dialog-titlebar").outerHeight()
              , boxFooter = $(".t-Dialog-footer").outerHeight()
              , boxSteps = $(".t-Dialog-header").outerHeight()
              , boxHeight = boxBody + boxTitle + boxFooter + boxSteps;
            return boxHeight > dMinHeight ? dMaxHeight > boxHeight ? boxHeight : dMaxHeight : dMinHeight
        }()
          , isResizeHeightRequired = function() {
            return "number" == typeof heightAttr ? !1 : "auto" === heightAttr.toLowerCase() && newHeight !== ut.dialogHeight
        }();
        if (isResizeHeightRequired) {
            var hasMoved = function(elem) {
                var opt = l$(elem).dialog("option", "position");
                return "number" == typeof opt[0]
            };
            box$.parent().css("height", newHeight),
            hasMoved(boxId) || reCenter(),
            ut.dialogHeight = newHeight,
            ut.observeModalSize(ut.T_MODAL_BODY, ut.modalAutoSize)
        }
        dialogReadyClass()
    }
    ,
    ut.observeModalSize = function(elem, callback) {
        var debounceMutationObserver, target = document.querySelector(elem), config = {
            attributes: !0,
            childList: !0,
            characterData: !0,
            subtree: !0,
            attributeOldValue: !1,
            characterDataOldValue: !1,
            attributeFilter: ["class", "id", "style"]
        }, act = function() {
            callback(elem)
        }, observer = new MutationObserver(function(mutations) {
            clearTimeout(debounceMutationObserver),
            debounceMutationObserver = setTimeout(act, 50)
        }
        );
        return observer.observe(target, config),
        observer
    }
    ,
    function() {
        var TABS_REGION_REGEX = /t-TabsRegion-mod--([^\s]*)/;
        $.fn.utTabs = function(options) {
            var that$ = $(this);
            that$.each(function() {
                var tabClasses = []
                  , classes = this.className.split(/\s+/);
                classes.forEach(function(clazz) {
                    var match = clazz.match(TABS_REGION_REGEX);
                    null !== match && match.length > 0 && tabClasses.push("t-Tabs--" + match[1])
                });
                var ul$ = $("<ul class='t-Tabs " + tabClasses.join(" ") + "' role='tablist'>")
                  , tabs$ = $(this)
                  , items$ = tabs$.find(".t-TabsRegion-items").first();
                items$.prepend(ul$),
                items$.children().filter("div").each(function() {
                    var tab$ = $(this)
                      , tabId = tab$.attr("id")
                      , tabLabel = tab$.attr("data-label");
                    ul$.append('<li class="t-Tabs-item" aria-controls="' + tabId + '" role="tab"><a href="#' + tabId + '" class="t-Tabs-link" tabindex="-1"><span>' + tabLabel + "</span></a></li>")
                }),
                ul$.aTabs({
                    tabsContainer$: items$,
                    optionalSelectedClass: "is-active",
                    showAllScrollOffset: !1,
                    onRegionChange: function(mode, activeTab) {
                        activeTab && activeTab.el$.find(".js-stickyWidget-toggle").trigger("forceresize")
                    },
                    useSessionStorage: that$.hasClass("js-useLocalStorage")
                })
            })
        }
    }(),
    ut.toggleWidgets = function() {
        var pushModal, RIGHT_CONTROL_BUTTON = "#t_Button_rightControlButton", A_CONTROLS = "aria-controls", A_EXPANDED = "aria-expanded", A_HIDDEN = "aria-hidden", TREE_NAV_WIDGET_KEY = "nav", RIGHT_WIDGET_KEY = "right", toggleWidgets = {}, resetActionsColumn = function() {
            ut.pageBody$.hasClass("t-PageBody--showLeft") && Modernizr.mq("only screen and (max-width: 992px)") ? expandWidget(RIGHT_WIDGET_KEY) : Modernizr.mq("only screen and (max-width: 640px)") && collapseWidget(RIGHT_WIDGET_KEY)
        }, collapseWidget = function(pKey, pSaveUserPreference) {
            pKey in toggleWidgets && toggleWidgets[pKey].collapse(pSaveUserPreference)
        }, expandWidget = function(pKey, pSaveUserPreference) {
            pKey in toggleWidgets && toggleWidgets[pKey].expand(pSaveUserPreference)
        }, buildToggleWidget = function(options) {
            var widget, checkForElement = options.checkForElement, key = options.key, button$ = $(options.buttonId), expandOriginal = options.onExpand, collapseOriginal = options.onCollapse, element$ = $(checkForElement);
            return !element$ || element$.length <= 0 ? !1 : (options.controllingElement = button$,
            button$.attr(A_CONTROLS, element$.attr("id")),
            options.content = ut.pageBody$,
            options.contentClassExpanded = "js-" + key + "Expanded",
            options.contentClassCollapsed = "js-" + key + "Collapsed",
            options.onExpand = function() {
                expandOriginal(),
                button$.addClass("is-active").attr(A_EXPANDED, "true"),
                pushModal.notify()
            }
            ,
            options.onCollapse = function() {
                collapseOriginal(),
                button$.removeClass("is-active").attr(A_EXPANDED, "false"),
                pushModal.notify()
            }
            ,
            widget = ToggleCore(options),
            toggleWidgets[key] = widget,
            !0)
        }, initialize = function() {
            if (!(ut.pageBody$.length <= 0 && ut.mainBody$.length <= 0 && ut.header$.length <= 0 && ut.bodyContent$.length <= 0)) {
                var treeNav$ = ut.treeNav$
                  , pageBody$ = ut.pageBody$
                  , pushModal$ = $("<div id='pushModal' style='width: 100%; display:none; height: 100%;' class='u-DisplayNone u-Overlay--glass'></div>");
                $("body").append(pushModal$),
                $(window).bind("apexwindowresized", function() {
                    for (var key in toggleWidgets)
                        toggleWidgets.hasOwnProperty(key) && toggleWidgets[key].resize();
                    pushModal.notify()
                }),
                pushModal = {
                    el$: pushModal$,
                    collapse: function() {},
                    expand: function() {},
                    shouldShow: ut.screenIsSmall,
                    notify: function() {}
                };
                var NAV_CONTROL_BUTTON = "#t_Button_treeNavControl";
                $("#t_Button_navControl").length > 0 && $(".t-Header-nav-list.a-MenuBar").length <= 0 && (NAV_CONTROL_BUTTON = "#t_Button_navControl");
                var treeShouldBeHidden = function() {
                    return Modernizr.mq("only screen and (max-width: 480px)")
                }
                  , treeIsHidden = function() {
                    return "hidden" === treeNav$.css("visibility")
                }
                  , showTree = function() {
                    treeNav$.css("visibility", "inherit").attr(A_HIDDEN, "false")
                }
                  , treeIsHiding = !1
                  , handleTreeVisibility = function() {
                    var screenIsTooSmallForTheTree = treeShouldBeHidden();
                    !screenIsTooSmallForTheTree || treeIsHidden() || treeIsHiding ? screenIsTooSmallForTheTree || showTree() : (treeIsHiding = !0,
                    setTimeout(function() {
                        treeIsHiding = !1,
                        toggleWidgets[TREE_NAV_WIDGET_KEY].isExpanded() || treeNav$.css("visibility", "hidden").attr(A_HIDDEN, "true")
                    }, 400))
                }
                  , hasTree = buildToggleWidget({
                    key: TREE_NAV_WIDGET_KEY,
                    checkForElement: ut.TREE_NAV,
                    buttonId: NAV_CONTROL_BUTTON,
                    defaultExpandedPreference: !0,
                    onClick: function() {
                        Modernizr.mq("only screen and (max-width: 992px)") && RIGHT_WIDGET_KEY in toggleWidgets && toggleWidgets[RIGHT_WIDGET_KEY].isExpanded() && toggleWidgets[RIGHT_WIDGET_KEY].toggle()
                    },
                    onExpand: function() {
                        Modernizr.mq("only screen and (max-width: 992px)") && collapseWidget(RIGHT_WIDGET_KEY),
                        treeNav$.treeView("expand", treeNav$.treeView("getSelection")),
                        showTree(),
                        ut.delayResize(),
                        treeNav$.trigger("theme42layoutchanged", {
                            action: "expand"
                        })
                    },
                    onCollapse: function() {
                        treeNav$.treeView("collapseAll"),
                        ut.delayResize(),
                        handleTreeVisibility(),
                        treeNav$.trigger("theme42layoutchanged", {
                            action: "collapse"
                        })
                    },
                    onResize: function() {
                        var usingTreeNav = pageBody$.hasClass("t-PageBody--leftNav");
                        usingTreeNav && (Modernizr.mq("only screen and (max-width: 992px)") ? this.collapse() : this.doesUserPreferExpanded() && this.expand()),
                        handleTreeVisibility(),
                        ut.resetHeaderOffset(),
                        resetActionsColumn()
                    },
                    onInitialize: function() {
                        this.expand(),
                        Modernizr.mq("only screen and (min-width: 480px)") && this.doesUserPreferExpanded() ? this.expand() : this.collapse()
                    }
                });
                if (hasTree)
                    treeNav$.on("treeviewexpansionstatechange", function(jqueryEvent, treeViewEvent) {
                        treeViewEvent.expanded && toggleWidgets[TREE_NAV_WIDGET_KEY].expand()
                    });
                else {
                    var core, lastScrollTop = 0, recal = function() {
                        $(".js-stickyWidget-toggle").stickyWidget("reStick")
                    };
                    core = ToggleCore({
                        content: pageBody$,
                        contentClassExpanded: "js-HeaderExpanded",
                        contentClassCollapsed: "js-HeaderContracted",
                        useSessionStorage: !1,
                        defaultExpandedPreference: !0,
                        onCollapse: recal,
                        onExpand: recal
                    }),
                    core.initialize(),
                    $(window).scroll(function() {
                        var scrollTop = $(this).scrollTop();
                        lastScrollTop > scrollTop || 100 > scrollTop ? core.expand() : core.collapse(),
                        lastScrollTop = scrollTop
                    }),
                    $("body").addClass("t-PageBody--topNav"),
                    $(window).on("apexwindowresized", ut.resetHeaderOffset)
                }
                var rightShouldBeOpenOnStart = Modernizr.mq("only screen and (min-width: 992px)")
                  , actionsContent$ = $(".t-Body-actionsContent");
                buildToggleWidget({
                    key: RIGHT_WIDGET_KEY,
                    checkForElement: ".t-Body-actionsContent",
                    buttonId: RIGHT_CONTROL_BUTTON,
                    defaultExpandedPreference: rightShouldBeOpenOnStart,
                    onClick: function() {
                        Modernizr.mq("only screen and (max-width: 992px)") && TREE_NAV_WIDGET_KEY in toggleWidgets && toggleWidgets[TREE_NAV_WIDGET_KEY].isExpanded() && toggleWidgets[TREE_NAV_WIDGET_KEY].toggle()
                    },
                    onExpand: function() {
                        Modernizr.mq("only screen and (max-width: 992px)") && pageBody$.hasClass("js-navExpanded") && collapseWidget(TREE_NAV_WIDGET_KEY),
                        actionsContent$.css("visibility", "inherit").attr(A_HIDDEN, "false"),
                        ut.delayResize()
                    },
                    onCollapse: function() {
                        ut.delayResize(),
                        actionsContent$.attr(A_HIDDEN, "true"),
                        setTimeout(function() {
                            toggleWidgets[RIGHT_WIDGET_KEY].isExpanded() || actionsContent$.css("visibility", "hidden")
                        }, 400)
                    },
                    onResize: function() {
                        this.doesUserPreferExpanded() && !Modernizr.mq("only screen and (max-width: 640px)") ? this.expand() : this.collapse()
                    },
                    onInitialize: function() {
                        TREE_NAV_WIDGET_KEY in toggleWidgets && toggleWidgets[TREE_NAV_WIDGET_KEY].isExpanded() && Modernizr.mq("only screen and (max-width: 992px)") ? this.forceCollapse() : this.doesUserPreferExpanded() ? this.forceExpand() : this.forceCollapse()
                    }
                }),
                pageBody$.hasClass("t-PageBody--topNav") && Modernizr.mq("only screen and (max-width: 640px)") && pageBody$.addClass("js-menuNavCollapsed"),
                resetActionsColumn();
                for (var key in toggleWidgets)
                    toggleWidgets.hasOwnProperty(key) && toggleWidgets[key].initialize();
                setTimeout(function() {
                    ut.resetHeaderOffset()
                }, 15)
            }
        };
        return {
            initialize: initialize,
            expandWidget: expandWidget,
            collapseWidget: collapseWidget,
            setPreference: function(key, value) {
                key in toggleWidgets && toggleWidgets[key].setUserPreference(value)
            },
            isExpanded: function(key) {
                return key in toggleWidgets ? toggleWidgets[key].isExpanded() : void 0
            }
        }
    }(),
    init.alert = function() {
        var closeAlert$ = $(".t-Alert .t-Button--closeAlert");
        closeAlert$.closest(".t-Alert");
        closeAlert$.click(function() {
            ut.delayResize()
        })
    }
    ,
    init.backToTop = function() {
        var backToTop$ = $("#t_Footer_topButton");
        backToTop$.attr("title", apex.lang.getMessage("APEX.UI.BACK_TO_TOP")).click(function() {
            return $("html,body").animate({
                scrollTop: 0
            }, 500),
            $("a.t-Header-logo-link").focus(),
            !1
        })
    }
    ,
    init.dialogAutoHeight = function() {
        var obs, dlg$ = $(".js-dialog-autoheight"), setAutoHeight = function(id) {
            var elem$ = $(id)
              , hTitle = elem$.prev().outerHeight()
              , hContent = $(id + " .t-DialogRegion-body").outerHeight()
              , hBottom = elem$.find(".t-DialogRegion-buttons").outerHeight()
              , hTotal = hTitle + hContent + hBottom
              , hWin = $(window).height() - 48
              , newHeight = hTotal > hWin ? hWin : hTotal;
            if (newHeight && 0 !== newHeight) {
                var hasMoved = function(elem) {
                    var opt = $(elem).dialog("option", "position");
                    return "number" == typeof opt[0]
                };
                elem$.parent().css("height", newHeight),
                elem$.css("height", "auto"),
                hasMoved(id) || elem$.dialog("option", "position", "center"),
                obs || (obs = ut.observeModalSize(id, setAutoHeight)),
                elem$.on("dialogresizestart dialogclose", function() {
                    null !== obs && (obs.disconnect(),
                    obs = null)
                })
            }
        };
        dlg$.on("dialogopen", function() {
            setAutoHeight("#" + $(this).attr("id"))
        })
    }
    ,
    init.dialogResize = function() {
        function resizeDialog(dialog$) {
            var footerheight = dialog$.find(".t-DialogRegion-buttons").height();
            dialog$.find(".t-DialogRegion-body").css("bottom", footerheight)
        }
        $(document.body).on("dialogopen dialogresizestop", ".t-DialogRegion", function() {
            resizeDialog($(this))
        })
    }
    ,
    init.handleScrollTop = function() {
        var pageTitle$ = ut.pageTitle$;
        if (!($(".t-BreadcrumbRegion").length <= 0 || pageTitle$.length <= 0) && $.trim(pageTitle$.html())) {
            var debounceTitleChange, shadowCore = ToggleCore({
                content: pageTitle$,
                contentClassExpanded: "has-shadow",
                contentClassCollapsed: "",
                useSessionStorage: !1,
                defaultExpandedPreference: !0
            }), expandedHeight = pageTitle$.outerHeight(), storedTitleHeight = ut.getTitleHeight, recal = function() {
                ut.getTitleHeight = function() {
                    if (shrinkCore.isExpanded()) {
                        var realPageTitleHeight = pageTitle$.outerHeight();
                        return realPageTitleHeight > expandedHeight && (expandedHeight = realPageTitleHeight),
                        expandedHeight
                    }
                    return 48
                }
                ;
                var redoTop = function() {
                    var toggle$ = $(".js-stickyWidget-toggle");
                    toggle$.length > 0 && toggle$.stickyWidget("reStick")
                };
                redoTop(),
                clearTimeout(debounceTitleChange),
                ut.resetHeaderOffset(),
                debounceTitleChange = setTimeout(function() {
                    ut.getTitleHeight = storedTitleHeight,
                    ut.resetHeaderOffset(),
                    redoTop()
                }, 500)
            }, shrinkCore = ToggleCore({
                content: pageTitle$,
                contentClassExpanded: "",
                contentClassCollapsed: "t-Body-title-shrink",
                useSessionStorage: !1,
                defaultExpandedPreference: !0,
                onExpand: recal,
                onCollapse: recal
            });
            shrinkCore.initialize(),
            shadowCore.initialize();
            var shrinkThreshold = function() {
                if (shrinkCore.isExpanded()) {
                    var tBodyInfoHeight = $(".t-Body-info").outerHeight() - 100;
                    return tBodyInfoHeight > 100 ? tBodyInfoHeight : 400
                }
                return 0
            }
              , addTop = function() {
                var scrollTop = $(this).scrollTop();
                0 === scrollTop ? shadowCore.collapse() : scrollTop > 0 && shadowCore.expand();
                var top = shrinkThreshold();
                top >= scrollTop ? shrinkCore.expand() : scrollTop > top && shrinkCore.collapse()
            };
            $(window).scroll(addTop),
            addTop.call(window)
        }
    }
    ,
    init.hideShow = function() {
        $(".t-Region--hideShow").each(function() {
            var collapsible$ = $(this)
              , useLocalStorage = collapsible$.hasClass("js-useLocalStorage");
            collapsible$.hasClass("is-expanded") || collapsible$.hasClass("is-collapsed") || collapsible$.addClass("is-expanded"),
            collapsible$.collapsible({
                content: $(this).find(".t-Region-body").first(),
                collapsed: collapsible$.hasClass("is-collapsed"),
                rememberState: useLocalStorage
            })
        })
    }
    ,
    init.maximize = function() {
        var current, maximizeKey = 0, maximizableRegions$ = $(".js-showMaximizeButton"), applyJqueryUiFocusableFix = function() {
            var focusable = function(element, isTabIndexNotNaN) {
                var nodeName = element.nodeName.toLowerCase();
                return (/^(input|select|textarea|button|object)$/.test(nodeName) ? !element.disabled : "a" === nodeName ? element.href || isTabIndexNotNaN : isTabIndexNotNaN) && $.expr.filters.visible(element)
            };
            $.extend($.expr[":"], {
                focusable: focusable,
                tabbable: function(element) {
                    var tabIndex = $.attr(element, "tabindex")
                      , isTabIndexNaN = isNaN(tabIndex);
                    return (isTabIndexNaN || tabIndex >= 0) && focusable(element, !isTabIndexNaN)
                }
            })
        }, hideAllExceptChildren = function(content$) {
            maximizableRegions$.css("visibility", "hidden"),
            content$.css("visibility", "visible").find(".js-showMaximizeButton").css("visibility", "visible")
        }, makeCurrent = function(core, content$, top) {
            var buildCurrent = function() {
                var tabbable$ = content$.find(":tabbable");
                return {
                    core: core,
                    content$: content$,
                    top: top,
                    first: tabbable$.first()[0],
                    last: tabbable$.last()[0]
                }
            };
            if (current) {
                var old = current;
                current.next = buildCurrent(),
                current = current.next,
                current.previous = old
            } else
                current = buildCurrent(),
                ut.pageBody$.addClass("js-regionIsMaximized");
            apex.theme.defaultStickyTop = top,
            hideAllExceptChildren(current.content$)
        };
        maximizableRegions$.length > 0 && applyJqueryUiFocusableFix(),
        maximizableRegions$.each(function() {
            var fthOnResize, content$ = $(this), isIRR = content$.hasClass("t-IRR-region"), injectButtonSelector = ".js-maximizeButtonContainer";
            isIRR && (injectButtonSelector = ".a-IRR-buttons",
            content$.find(injectButtonSelector).length <= 0 && content$.find(".a-IRR-toolbar").append("<div class='a-IRR-buttons'></div>"));
            var maximize$ = content$.find(injectButtonSelector).first()
              , regionId = content$.attr("id")
              , maximizeButton$ = $('<button class="t-Button t-Button--noLabel t-Button--icon t-Button--iconOnly t-Button--noUI" aria-expanded="false"aria-controls="' + regionId + '" type="button"><span class="t-Icon a-Icon" aria-hidden="true"></span></button>');
            maximize$.append(maximizeButton$);
            var fthOnResizeDebouncer, switchToPrevious = function() {
                current && (current.previous ? (current.previous.next = null,
                content$.find(".js-stickyWidget-toggle").stickyWidget("forceScrollParent", content$.parents(".t-Region-bodyWrap").first()),
                hideAllExceptChildren(current.previous.content$),
                apex.theme.defaultStickyTop = current.previous.top) : (apex.theme.defaultStickyTop = ut.getFixedHeight,
                $(".js-stickyWidget-toggle").stickyWidget("forceScrollParent", null),
                ut.pageBody$.removeClass("js-regionIsMaximized"),
                maximizableRegions$.css("visibility", "visible")),
                $(window).trigger("apexwindowresized"),
                current = current.previous)
            }, getCollapsible = function() {
                return content$.find(".a-IRR-controlsContainer.a-Collapsible").first()
            }, resetIRRHeight = function(fthBody$) {
                content$.css("overflow", "auto"),
                fthBody$.css("height", "auto")
            }, forceIRRHeight = function() {
                fthOnResize = function() {
                    clearTimeout(fthOnResizeDebouncer),
                    setTimeout(function() {
                        var fthBody$ = content$.find(".t-fht-tbody");
                        if (fthBody$.length > 0) {
                            content$.css("overflow", "hidden");
                            var head$ = content$.find(".t-fht-thead")
                              , pagWrap$ = content$.find(".a-IRR-paginationWrap")
                              , irrToolBar$ = content$.find(".a-IRR-toolbar")
                              , controlsContainer$ = content$.find(".a-IRR-controlsContainer");
                            if (Modernizr.mq("only screen and (min-width: 769px)")) {
                                var height = $(window).height();
                                fthBody$.css("height", height - irrToolBar$.outerHeight() - controlsContainer$.outerHeight() - pagWrap$.outerHeight() - head$.outerHeight() - 2)
                            } else
                                resetIRRHeight(fthBody$)
                        }
                    }, 200)
                }
                ,
                getCollapsible().on("collapsibleexpand", fthOnResize).on("collapsiblecollapse", fthOnResize),
                $(window).on("apexwindowresized", fthOnResize)
            }, disableForcedIrrHeight = function() {
                current && isIRR && content$ && (resetIRRHeight(content$.find(".t-fht-tbody")),
                $(window).off("apexwindowresized", fthOnResize),
                getCollapsible().off("collapsibleexpand", fthOnResize).off("collapsiblecollapse", fthOnResize))
            }, forceResize = function() {
                $(window).trigger("apexwindowresized").trigger("resize")
            }, header$ = content$.find(".t-Region-header"), maximizeCore = ToggleCore({
                key: "maximize_" + ++maximizeKey,
                content: content$,
                contentClassExpanded: "is-maximized",
                useSessionStorage: !1,
                defaultExpandedPreference: !1,
                controllingElement: maximizeButton$,
                onExpand: function() {
                    apex.navigation.beginFreezeScroll(),
                    maximizeButton$.attr("title", apex.lang.getMessage("RESTORE")).attr("aria-label", apex.lang.getMessage("RESTORE")).attr("aria-expanded", !0).find(".t-Icon").removeClass("icon-maximize").addClass("icon-restore");
                    var scrollParent$, top = function() {
                        var height = header$.outerHeight();
                        return height ? height : 0
                    };
                    isIRR ? (scrollParent$ = content$,
                    forceIRRHeight(),
                    content$.find(".container").first().hide()) : scrollParent$ = content$.find(".t-Region-bodyWrap").first(),
                    content$.find(".js-stickyWidget-toggle").stickyWidget("forceScrollParent", scrollParent$),
                    forceResize(),
                    makeCurrent(maximizeCore, content$, top)
                },
                onCollapse: function() {
                    apex.navigation.endFreezeScroll(),
                    maximizeButton$.attr("title", apex.lang.getMessage("MAXIMIZE")).attr("aria-label", apex.lang.getMessage("MAXIMIZE")).attr("aria-expanded", !1).find(".t-Icon").addClass("icon-maximize").removeClass("icon-restore"),
                    disableForcedIrrHeight(),
                    isIRR && content$.find(".container").first().show(),
                    forceResize(),
                    switchToPrevious()
                }
            });
            maximizeCore.initialize()
        }),
        $(document).on("keydown", function(event) {
            if (current) {
                if (event.which === $.ui.keyCode.ESCAPE)
                    return current.core.collapse(),
                    event.preventDefault(),
                    !1;
                event.which === $.ui.keyCode.TAB && (event.shiftKey && event.target === current.first ? (event.preventDefault(),
                current.first.focus()) : event.shiftKey || current.last === event.target && (event.preventDefault(),
                current.last.focus()))
            }
        })
    }
    ,
    init.treeNav = function() {
        var treeNav$ = ut.treeNav$;
        0 !== treeNav$.length && (treeNav$.treeView({
            showRoot: !1,
            iconType: "fa",
            useLinks: !0,
            navigation: !0,
            autoCollapse: !0
        }),
        treeNav$.treeView("getSelection").parents().children(".a-TreeView-content").addClass("is-current"),
        treeNav$.treeView("getSelection").parents(".a-TreeView-node--topLevel").children(".a-TreeView-content, .a-TreeView-row").removeClass("is-current").addClass("is-current--top"),
        $(".t-TreeNav .a-TreeView-node--topLevel > .a-TreeView-content").each(function() {
            $(this).find(".fa").length <= 0 && $(this).prepend('<span class="fa fa-file-o"></span>')
        }),
        ut.renderBadges($(".a-TreeView-label"), "a-TreeView-badge"),
        treeNav$.on("treeviewexpansionstatechange", function(jqueryEvent, treeViewEvent) {
            treeViewEvent.expanded && ut.renderBadges(treeViewEvent.nodeContent$.parent().find(".a-TreeView-label"), "a-TreeView-badge")
        }))
    }
    ,
    ut.pages.masterDetail = {
        onTheme42Ready: function() {
            var rds$ = $(".apex-rds");
            rds$.on("tabschange", function(activeTab, mode) {
                "jump" !== mode && $(".t-StatusList-blockHeader,.js-stickyTableHeader").trigger("forceresize")
            }),
            ut.sticky(".t-Body-contentInner .t-StatusList .t-StatusList-blockHeader"),
            $(".t-Body-contentInner .t-Report-tableWrap").setTableHeadersAsFixed(),
            ut.sticky(".js-stickyTableHeader"),
            rds$.aTabs("option", "showAllScrollOffset", function() {
                var tHeight = $("#t_Body_info").height() - 50;
                return $(window).scrollTop() > tHeight ? tHeight : !1
            })
        }
    },
    ut.pages.modalDialog = {
        onTheme42Ready: function() {
            ut.modalAutoSize(ut.T_MODAL_BODY)
        }
    },
    ut.pages.wizardModal = {
        onReady: function() {
            ut.modalAutoSize(ut.T_MODAL_BODY)
        }
    }
}(apex.theme42, apex.theme42.init, apex.jQuery);
