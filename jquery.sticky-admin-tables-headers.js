(function (e, i) {
    "use strict";
    
    function t(t, s) {
        var d = this;
        d.$el = e(t), d.el = t, d.id = l++, d.$window = e(i), d.$document = e(document), d.$el.bind("destroyed", e.proxy(d.teardown, d)), d.$clonedHeader = null, d.$originalHeader = null, d.isSticky = !1, d.hasBeenSticky = !1, d.leftOffset = null, d.topOffset = null, d.init = function () {
            d.$el.each(function () {
                var i = e(this);
                i.css("padding", 0), d.$originalHeader = e("thead:first", this), d.$clonedHeader = d.$originalHeader.clone(), i.trigger("clonedHeader." + o, [d.$clonedHeader]), d.$clonedHeader.addClass("tableFloatingHeader"), d.$clonedHeader.css("display", "none"), d.$originalHeader.addClass("tableFloatingHeaderOriginal"), d.$originalHeader.after(d.$clonedHeader), d.$printStyle = e('<style type="text/css" media="print">.tableFloatingHeader{display:none !important;}.tableFloatingHeaderOriginal{position:static !important;}</style>'), e("head").append(d.$printStyle)
            }), d.setOptions(s), d.updateWidth(), d.toggleHeaders(), d.bind()
        }, d.destroy = function () {
            d.$el.unbind("destroyed", d.teardown), d.teardown()
        }, d.teardown = function () {
            d.isSticky && d.$originalHeader.css("position", "static"), e.removeData(d.el, "plugin_" + o), d.unbind(), d.$clonedHeader.remove(), d.$originalHeader.removeClass("tableFloatingHeaderOriginal"), d.$originalHeader.css("visibility", "visible"), d.$printStyle.remove(), d.el = null, d.$el = null
        }, d.bind = function () {
            d.$scrollableArea.on("scroll." + o, d.toggleHeaders), d.isWindowScrolling || (d.$window.on("scroll." + o + d.id, d.setPositionValues), d.$window.on("resize." + o + d.id, d.toggleHeaders)), d.$scrollableArea.on("resize." + o, d.toggleHeaders), d.$scrollableArea.on("resize." + o, d.updateWidth)
        }, d.unbind = function () {
            d.$scrollableArea.off("." + o, d.toggleHeaders), d.isWindowScrolling || (d.$window.off("." + o + d.id, d.setPositionValues), d.$window.off("." + o + d.id, d.toggleHeaders)), d.$scrollableArea.off("." + o, d.updateWidth), d.$el.off("." + o), d.$el.find("*").off("." + o)
        }, d.toggleHeaders = function () {
            d.$el && d.$el.each(function () {
                var i, t = e(this),
                    o = d.isWindowScrolling ? isNaN(d.options.fixedOffset) ? d.options.fixedOffset.outerHeight() : d.options.fixedOffset : d.$scrollableArea.offset().top + (isNaN(d.options.fixedOffset) ? 0 : d.options.fixedOffset),
                    l = t.offset(),
                    n = d.$scrollableArea.scrollTop() + o,
                    s = d.$scrollableArea.scrollLeft(),
                    a = d.isWindowScrolling ? n > l.top : o > l.top,
                    r = (d.isWindowScrolling ? n : 0) < l.top + t.height() - d.$clonedHeader.height() - (d.isWindowScrolling ? 0 : o);
                a && r ? (i = l.left - s + d.options.leftOffset, d.$originalHeader.css({
                    position: "fixed",
                    "margin-top": 0,
                    left: i,
                    "z-index": 1
                }), d.leftOffset = i, d.topOffset = o, d.$clonedHeader.css("display", ""), d.isSticky || (d.isSticky = !0, d.updateWidth()), d.setPositionValues()) : d.isSticky && (d.$originalHeader.css("position", "static"), d.$clonedHeader.css("display", "none"), d.isSticky = !1, d.resetWidth(e("td,th", d.$clonedHeader), e("td,th", d.$originalHeader)))
            })
        }, d.setPositionValues = function () {
            var e = d.$window.scrollTop(),
                i = d.$window.scrollLeft();
            !d.isSticky || 0 > e || e + d.$window.height() > d.$document.height() || 0 > i || i + d.$window.width() > d.$document.width() || d.$originalHeader.css({
                top: d.topOffset - (d.isWindowScrolling ? 0 : e),
                left: d.leftOffset - (d.isWindowScrolling ? 0 : i)
            })
        }, d.updateWidth = function () {
            if(d.isSticky) {
                d.$originalHeaderCells || (d.$originalHeaderCells = e("th,td", d.$originalHeader)), d.$clonedHeaderCells || (d.$clonedHeaderCells = e("th,td", d.$clonedHeader));
                var i = d.getWidth(d.$clonedHeaderCells);
                d.setWidth(i, d.$clonedHeaderCells, d.$originalHeaderCells), d.$originalHeader.css("width", d.$clonedHeader.width())
            }
        }, d.getWidth = function (t) {
            var o = [];
            return t.each(function (t) {
                var l, n = e(this);
                if("border-box" === n.css("box-sizing")) l = n.outerWidth();
                else {
                    var s = e("th", d.$originalHeader);
                    if("collapse" === s.css("border-collapse"))
                        if(i.getComputedStyle) l = parseFloat(i.getComputedStyle(this, null).width);
                        else {
                            var a = parseFloat(n.css("padding-left")),
                                r = parseFloat(n.css("padding-right")),
                                c = parseFloat(n.css("border-width"));
                            l = n.outerWidth() - a - r - c
                        } else l = n.width()
                }
                o[t] = l
            }), o
        }, d.setWidth = function (e, i, t) {
            i.each(function (i) {
                var o = e[i];
                t.eq(i).css({
                    "min-width": o,
                    "max-width": o
                })
            })
        }, d.resetWidth = function (i, t) {
            i.each(function (i) {
                var o = e(this);
                t.eq(i).css({
                    "min-width": o.css("min-width"),
                    "max-width": o.css("max-width")
                })
            })
        }, d.setOptions = function (t) {
            d.options = e.extend({}, n, t), d.$scrollableArea = e(d.options.scrollableArea), d.isWindowScrolling = d.$scrollableArea[0] === i
        }, d.updateOptions = function (e) {
            d.setOptions(e), d.unbind(), d.bind(), d.updateWidth(), d.toggleHeaders()
        }, d.init()
    }
    var o = "stickyTableHeaders",
        l = 0,
        n = {
            fixedOffset: 0,
            leftOffset: 0,
            scrollableArea: i
        };
    e.fn[o] = function (i) {
        return this.each(function () {
            var l = e.data(this, "plugin_" + o);
            l ? "string" == typeof i ? l[i].apply(l) : l.updateOptions(i) : "destroy" !== i && e.data(this, "plugin_" + o, new t(this, i))
        })
    }
})(jQuery, window);