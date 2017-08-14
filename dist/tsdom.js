"use strict";function preventDefault(t){return t.preventDefault?t.preventDefault():t.returnValue=!1}Object.defineProperty(exports,"__esModule",{value:!0});var TSDomObject=function(){function t(t,e,n){var r;if(this.document=document,this.meta=n||{},this.regex=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,this.events=[],!(r="string"==typeof t?this.query(t,e||document):t))return this;if(1===r.nodeType||r===window)this[0]=r,this.length=1;else for(var i=this.length=r.length;i--;this[i]=r[i]);}return t.prototype.find=function(e){return new t(e,this[0],{owner:this})},t.prototype.closest=function(e){var n,r=this.document.querySelectorAll(e),i=this[0];do{for(n=r.length;--n>=0&&r.item(n)!==i;);}while(n<0&&(i=i.parentElement));return new t(i)},t.prototype.each=function(t){for(var e=0,n=this.length;e<n;){this[e];if(0==t.call(this,this[e],e++))break}return this},t.prototype.css=function(t){return this.each(function(e){for(var n in t){var r=t[n];e.style.setProperty(n,r)}}),this},t.prototype.attr=function(t){return this.each(function(e){for(var n in t){var r=t[n];e.setAttribute(n,r)}}),this},t.prototype.hasClass=function(t){var e=!1;return this.each(function(n){var r=" "+t+" ";(" "+n.className+" ").replace(/[\n\t]/g," ").indexOf(r)>-1&&(e=!0)}),e},t.prototype.addClass=function(t){var e=this;return this.each(function(n){e.hasClass(t)||(n.className+=" "+t)}),this},t.prototype.removeClass=function(t){var e=this;return this.each(function(n){if(e.hasClass(t)){var r=new RegExp("(\\s|^)"+t+"(\\s|$)");n.className=n.className.replace(r," ")}}),this},t.prototype.toggleClass=function(t){return this.hasClass(t)?this.removeClass(t):this.addClass(t),this},t.prototype.on=function(t,e,n){var r=this,i="function"==typeof e&&void 0===n,o="string"==typeof e&&"function"==typeof n;return this.off(t),this.each(function(s){var u=null;if(i&&(u=e),o&&(u=r.delegateEvent(s,e,n)),!u)throw new Error("TSDom.on: Invalid Arguments");s.addEventListener(t,u,!1),r.events.push({type:t,handler:u})}),this},t.prototype.off=function(t){var e=this,n=this.events;return this.each(function(n){var r=e.findEvent(t);void 0!==r&&n.removeEventListener(t,r.handler,!1)}),this.events=n.filter(function(e){return e.type!==t}),this},t.prototype.html=function(t){var e=this[0];return void 0==t?e.innerHTML:(e.innerHTML=t,t)},t.prototype.append=function(t){return this.each(function(e){e.insertAdjacentHTML("beforeend",t)}),this},t.prototype.prepend=function(t){return this.each(function(e){e.insertAdjacentHTML("afterbegin",t)}),this},t.prototype.query=function(t,e){var n,r,i=this.document;if(n=this.regex.exec(t)){if(r=n[3])return e.getElementsByClassName(r);if(r=n[2])return e.getElementsByTagName(r);if(r=n[1])return i.getElementById(r)}return e.querySelectorAll(t)},t.prototype.findEvent=function(t){return this.events.filter(function(e){return e.type===t},t)[0]},t.prototype.delegateEvent=function(e,n,r){return function(i){var o=!1;new t(n,e).each(function(t){i.target==t&&(o=!0)}),o&&r(i)}},t}();exports.TSDomObject=TSDomObject,exports.preventDefault=preventDefault,exports.default=function(t,e){return new TSDomObject(t,e)};