"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utility = require("./utility");
var event = require("./event");
/* -----------------------------------
 *
 * Instance
 *
 * -------------------------------- */
var Instance = /** @class */ (function () {
    function Instance(qry, ctx, meta) {
        var els;
        this.meta = meta || {};
        this.events = event.registry();
        if (typeof qry === 'string') {
            els = utility.query(qry, ctx ? ctx : document);
        }
        else {
            els = qry;
        }
        if (!els)
            return this;
        if (els.nodeType === 1 || els === window) {
            this[0] = els;
            this.length = 1;
        }
        else {
            for (var len = (this.length = els.length); len--; this[len] = els[len])
                ;
        }
    }
    Instance.prototype.get = function (key) {
        return this[key];
    };
    Instance.prototype.first = function () {
        return new Instance(this[0]);
    };
    Instance.prototype.find = function (qry) {
        return new Instance(qry, this[0], { owner: this });
    };
    Instance.prototype.closest = function (qry) {
        var match = document.querySelectorAll(qry);
        var el = this[0];
        var i;
        do {
            i = match.length;
            while (--i >= 0 && match.item(i) !== el) {
                // noop
            }
        } while (i < 0 && (el = el.parentElement));
        return new Instance(el);
    };
    Instance.prototype.each = function (cb) {
        for (var i = 0, len = this.length; i < len;) {
            if (cb.call(this, this[i], i++) === false) {
                break;
            }
        }
        return this;
    };
    Instance.prototype.css = function (obj) {
        this.each(function (el) {
            for (var _i = 0, _a = Object.keys(obj); _i < _a.length; _i++) {
                var key = _a[_i];
                var val = obj[key];
                el.style.setProperty(key, val);
            }
        });
        return this;
    };
    Instance.prototype.attr = function (obj) {
        if (typeof obj === 'string') {
            var value = this[0].getAttribute(obj);
            return value;
        }
        this.each(function (el) {
            for (var _i = 0, _a = Object.keys(obj); _i < _a.length; _i++) {
                var key = _a[_i];
                var val = obj[key];
                el.setAttribute(key, val);
            }
        });
    };
    Instance.prototype.hasClass = function (str) {
        var result = false;
        this.each(function (el) {
            result = utility.hasClass(el, str);
        });
        return result;
    };
    Instance.prototype.addClass = function (str) {
        this.each(function (el) {
            var state = utility.hasClass(el, str);
            if (!state) {
                el.className += ' ' + str;
            }
        });
        return this;
    };
    Instance.prototype.removeClass = function (str) {
        this.each(function (el) {
            var state = utility.hasClass(el, str);
            if (state) {
                var reg = new RegExp('(\\s|^)' + str + '(\\s|$)');
                var val = el.className.replace(reg, ' ').trim();
                el.className = val.replace(/\s{2,}/g, ' ');
            }
        });
        return this;
    };
    Instance.prototype.toggleClass = function (str) {
        if (this.hasClass(str)) {
            this.removeClass(str);
        }
        else {
            this.addClass(str);
        }
        return this;
    };
    Instance.prototype.on = function (ev, op1, op2) {
        var events = this.events;
        var direct = typeof op1 === 'function' && op2 === undefined;
        var delegate = typeof op1 === 'string' && typeof op2 === 'function';
        this.each(function (el) {
            var cb = null;
            if (direct) {
                cb = event.direct(op1);
            }
            if (delegate) {
                cb = event.delegate(el, op1, op2);
            }
            if (cb) {
                el.addEventListener(ev, cb, true);
                events.add({
                    type: ev,
                    handler: cb,
                });
            }
            else {
                throw new Error('TSDom.on: Invalid Arguments');
            }
        });
        return this;
    };
    Instance.prototype.off = function (ev) {
        var events = this.events;
        this.each(function (el) {
            var items = events.find(ev);
            items.forEach(function (item) {
                if (item !== undefined) {
                    el.removeEventListener(ev, item.handler, true);
                }
            });
        });
        events.remove(ev);
        return this;
    };
    Instance.prototype.val = function (val) {
        var item = this.get(0);
        if (item.value === undefined) {
            return null;
        }
        if (val === undefined) {
            return item.value;
        }
        item.value = val;
        return val;
    };
    Instance.prototype.text = function (val) {
        var item = this.get(0);
        if (!item) {
            return null;
        }
        if (val === undefined) {
            return item.innerText;
        }
        this.each(function (el) {
            el.innerHTML = val;
        });
        return val;
    };
    Instance.prototype.data = function (key, val) {
        var item = this.get(0);
        if (!item) {
            return null;
        }
        if (val === undefined) {
            return item.getAttribute("data-" + key);
        }
        this.each(function (el) {
            el.setAttribute("data-" + key, val);
        });
        return val;
    };
    Instance.prototype.html = function (val) {
        var item = this.get(0);
        if (!item) {
            return null;
        }
        if (val === undefined) {
            return item.innerHTML;
        }
        this.each(function (el) {
            el.innerHTML = val;
        });
        return val;
    };
    Instance.prototype.append = function (item) {
        this.each(function (el) {
            if (typeof item === 'string') {
                return el.insertAdjacentHTML('beforeend', item);
            }
            el.appendChild(item);
        });
        return this;
    };
    Instance.prototype.prepend = function (item) {
        this.each(function (el) {
            if (typeof item === 'string') {
                return el.insertAdjacentHTML('afterbegin', item);
            }
            el.insertBefore(item, el.firstChild);
        });
        return this;
    };
    Instance.prototype.empty = function () {
        this.each(function (el) {
            while (el.firstChild) {
                el.removeChild(el.firstChild);
            }
        });
        return this;
    };
    Instance.prototype.remove = function () {
        this.each(function (el) {
            el.parentNode.removeChild(el);
        });
    };
    Instance.prototype.toArray = function () {
        var array = [];
        this.each(function (el) {
            array.push(el);
        });
        return array;
    };
    return Instance;
}());
exports.Instance = Instance;
/* -----------------------------------
 *
 * Constructor
 *
 * -------------------------------- */
exports.default = (function (qry, ctx) {
    return new Instance(qry, ctx);
});
