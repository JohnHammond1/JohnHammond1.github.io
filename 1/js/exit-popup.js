$(document).ready(function() {
    (function() {
        $("html").on("mouseout.ouibounce", function() {
            function e() { $("#ouibounce-modal").modal() }
            return function(t) {
                if (!(t.clientY < 20)) return;
                e();
                $("html").off("mouseout.ouibounce")
            }
        }())
    })();
    $("head").prepend('<style type="text/css">.modal-open{overflow:hidden}.modal{position:fixed;top:0;right:0;bottom:0;left:0;z-index:1040;display:none;overflow:auto;overflow-y:scroll}.modal.fade .modal-dialog{-webkit-transform:translate(0,-25%);-ms-transform:translate(0,-25%);transform:translate(0,-25%);-webkit-transition:-webkit-transform .3s ease-out;-moz-transition:-moz-transform .3s ease-out;-o-transition:-o-transform .3s ease-out;transition:transform .3s ease-out}.modal.in .modal-dialog{-webkit-transform:translate(0,0);-ms-transform:translate(0,0);transform:translate(0,0)}.modal-dialog{position:relative;z-index:1050;width:auto;margin:10px}.modal-content{position:relative;background-color:#fff;outline:0;-webkit-box-shadow:0 3px 9px rgba(0,0,0,0.5);box-shadow:0 3px 9px rgba(0,0,0,0.5);background-clip:padding-box}.modal-backdrop{position:fixed;top:0;right:0;bottom:0;left:0;z-index:1030;background-color:#000}.modal-backdrop.fade{opacity:0;filter:alpha(opacity=0)}.modal-backdrop.in{opacity:.5;filter:alpha(opacity=50)}.modal-header{min-height:16.428571429px;padding:15px;border-bottom:1px solid #e5e5e5}.modal-header .close{margin-top:-2px}.modal-title{margin:0;line-height:1.428571429}.modal-body{    border: 3px dashed #2d6bc5;position:relative;padding:20px;min-height:300px}.modal-footer{padding:19px 20px 20px;margin-top:15px;text-align:right;border-top:1px solid #e5e5e5}.modal-footer:before,.modal-footer:after{display:table;content:" "}.modal-footer:after{clear:both}.modal-footer:before,.modal-footer:after{display:table;content:" "}.modal-footer:after{clear:both}.modal-footer .btn+.btn{margin-bottom:0;margin-left:5px}.modal-footer .btn-group .btn+.btn{margin-left:-1px}.modal-footer .btn-block+.btn-block{margin-left:0}@media screen and (min-width:768px){.modal-dialog{width:600px;margin:30px auto}.modal-content{-webkit-box-shadow:0 5px 15px rgba(0,0,0,0.5);box-shadow:0 5px 15px rgba(0,0,0,0.5)}}</style>'); + function(e) {
        "use strict";
        var t = function(t, n) {
            this.options = n;
            this.$element = e(t);
            this.$backdrop = this.isShown = null;
            if (this.options.remote) this.$element.load(this.options.remote)
        };
        t.DEFAULTS = { backdrop: true, keyboard: true, show: true };
        t.prototype.toggle = function(e) { return this[!this.isShown ? "show" : "hide"](e) };
        t.prototype.show = function(t) {
            var n = this;
            var r = e.Event("show.bs.modal", { relatedTarget: t });
            this.$element.trigger(r);
            if (this.isShown || r.isDefaultPrevented()) return;
            this.isShown = true;
            this.escape();
            this.$element.on("click.dismiss.modal", '[data-dismiss="modal"]', e.proxy(this.hide, this));
            this.backdrop(function() {
                var r = e.support.transition && n.$element.hasClass("fade");
                if (!n.$element.parent().length) { n.$element.appendTo(document.body) }
                n.$element.show();
                if (r) { n.$element[0].offsetWidth }
                n.$element.addClass("in").attr("aria-hidden", false);
                n.enforceFocus();
                var i = e.Event("shown.bs.modal", { relatedTarget: t });
                r ? n.$element.find(".modal-dialog").one(e.support.transition.end, function() { n.$element.focus().trigger(i) }).emulateTransitionEnd(300) : n.$element.focus().trigger(i)
            })
        };
        t.prototype.hide = function(t) {
            if (t) t.preventDefault();
            t = e.Event("hide.bs.modal");
            this.$element.trigger(t);
            if (!this.isShown || t.isDefaultPrevented()) return;
            this.isShown = false;
            this.escape();
            e(document).off("focusin.bs.modal");
            this.$element.removeClass("in").attr("aria-hidden", true).off("click.dismiss.modal");
            e.support.transition && this.$element.hasClass("fade") ? this.$element.one(e.support.transition.end, e.proxy(this.hideModal, this)).emulateTransitionEnd(300) : this.hideModal()
        };
        t.prototype.enforceFocus = function() { e(document).off("focusin.bs.modal").on("focusin.bs.modal", e.proxy(function(e) { if (this.$element[0] !== e.target && !this.$element.has(e.target).length) { this.$element.focus() } }, this)) };
        t.prototype.escape = function() { if (this.isShown && this.options.keyboard) { this.$element.on("keyup.dismiss.bs.modal", e.proxy(function(e) { e.which == 27 && this.hide() }, this)) } else if (!this.isShown) { this.$element.off("keyup.dismiss.bs.modal") } };
        t.prototype.hideModal = function() {
            var e = this;
            this.$element.hide();
            this.backdrop(function() {
                e.removeBackdrop();
                e.$element.trigger("hidden.bs.modal")
            })
        };
        t.prototype.removeBackdrop = function() {
            this.$backdrop && this.$backdrop.remove();
            this.$backdrop = null
        };
        t.prototype.backdrop = function(t) {
            var n = this;
            var r = this.$element.hasClass("fade") ? "fade" : "";
            if (this.isShown && this.options.backdrop) {
                var i = e.support.transition && r;
                this.$backdrop = e('<div class="modal-backdrop ' + r + '" />').appendTo(document.body);
                this.$element.on("click.dismiss.modal", e.proxy(function(e) {
                    if (e.target !== e.currentTarget) return;
                    this.options.backdrop == "static" ? this.$element[0].focus.call(this.$element[0]) : this.hide.call(this)
                }, this));
                if (i) this.$backdrop[0].offsetWidth;
                this.$backdrop.addClass("in");
                if (!t) return;
                i ? this.$backdrop.one(e.support.transition.end, t).emulateTransitionEnd(150) : t()
            } else if (!this.isShown && this.$backdrop) {
                this.$backdrop.removeClass("in");
                e.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one(e.support.transition.end, t).emulateTransitionEnd(150) : t()
            } else if (t) { t() }
        };
        var n = e.fn.modal;
        e.fn.modal = function(n, r) {
            return this.each(function() {
                var i = e(this);
                var s = i.data("bs.modal");
                var o = e.extend({}, t.DEFAULTS, i.data(), typeof n == "object" && n);
                if (!s) i.data("bs.modal", s = new t(this, o));
                if (typeof n == "string") s[n](r);
                else if (o.show) s.show(r)
            })
        };
        e.fn.modal.Constructor = t;
        e.fn.modal.noConflict = function() { e.fn.modal = n; return this };
        e(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(t) {
            var n = e(this);
            var r = n.attr("href");
            var i = e(n.attr("data-target") || r && r.replace(/.*(?=#[^\s]+$)/, ""));
            var s = i.data("modal") ? "toggle" : e.extend({ remote: !/#/.test(r) && r }, i.data(), n.data());
            t.preventDefault();
            i.modal(s, this).one("hide", function() { n.is(":visible") && n.focus() })
        });
        e(document).on("show.bs.modal", ".modal", function() { e(document.body).addClass("modal-open") }).on("hidden.bs.modal", ".modal", function() { e(document.body).removeClass("modal-open") })
    }(jQuery)
});