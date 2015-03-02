define("realtime-metro-web-client/app",["exports","ember","ember/resolver","ember/load-initializers","realtime-metro-web-client/config/environment"],function(e,t,a,r,n){"use strict";t["default"].MODEL_FACTORY_INJECTIONS=!0;var i=t["default"].Application.extend({modulePrefix:n["default"].modulePrefix,podModulePrefix:n["default"].podModulePrefix,Resolver:a["default"]});r["default"](i,n["default"].modulePrefix),e["default"]=i}),define("realtime-metro-web-client/components/rt-arrival",["exports","ember","moment","realtime-metro-web-client/utils/string-to-hue"],function(e,t,a,r){"use strict";var n=t["default"].inject;e["default"]=t["default"].Component.extend({tagName:"li",clock:n.service(),attributeBindings:["style"],classNames:["rt-arrival"],timeFromNow:t["default"].computed("clock.time",function(){return a["default"](this.get("arrival.time")).fromNow()}),style:t["default"].computed("arrival.route_id",function(){var e=r["default"](this.get("arrival.route_id"));return"color:            hsl("+e+", 60%, 25%);\n            background-color: hsl("+e+", 40%, 95%);\n            border-color:     hsl("+e+", 40%, 80%);"})})}),define("realtime-metro-web-client/components/rt-stop",["exports","ember"],function(e,t){"use strict";var a=t["default"].inject;e["default"]=t["default"].Component.extend({classNames:"stop-item",favoriteStops:a.service(),isFavorite:t["default"].computed("favoriteStops.all",function(){return this.get("favoriteStops").hasStop(this.get("stop"))}),actions:{toggleFavorite:function(){var e=this.get("favoriteStops");this.get("isFavorite")?e.remove(this.get("stop")):e.add(this.get("stop"))}}})}),define("realtime-metro-web-client/controllers/arrivals",["exports","ember"],function(e,t){"use strict";var a=t["default"].computed;e["default"]=t["default"].Controller.extend({arrivalSorting:["time:asc"],sortedArrivals:a.sort("arrivals","arrivalSorting")})}),define("realtime-metro-web-client/controllers/stops/favorites",["exports","ember"],function(e,t){"use strict";var a=t["default"].inject,r=t["default"].computed;e["default"]=t["default"].Controller.extend({favoriteStops:a.service(),stops:r.readOnly("favoriteStops.all")})}),define("realtime-metro-web-client/controllers/stops/search",["exports","ember"],function(e,t){"use strict";var a=t["default"].computed;e["default"]=t["default"].Controller.extend({queryParams:["name"],name:"",nameField:a.oneWay("name"),actions:{search:function(){this.set("name",this.get("nameField"))}}})}),define("realtime-metro-web-client/helpers/fa-icon",["exports","ember"],function(e,t){"use strict";var a=/^fa\-.+/,r=t["default"].Logger.warn,n=function(e,n){if("string"!==t["default"].typeOf(e)){var i="fa-icon: no icon specified";return r(i),t["default"].String.htmlSafe(i)}var s=n.hash,d=[],c="";d.push("fa"),e.match(a)||(e="fa-"+e),d.push(e),s.spin&&d.push("fa-spin"),s.flip&&d.push("fa-flip-"+s.flip),s.rotate&&d.push("fa-rotate-"+s.rotate),s.lg&&(r("fa-icon: the 'lg' parameter is deprecated. Use 'size' instead. I.e. {{fa-icon size=\"lg\"}}"),d.push("fa-lg")),s.x&&(r("fa-icon: the 'x' parameter is deprecated. Use 'size' instead. I.e. {{fa-icon size=\""+s.x+'"}}'),d.push("fa-"+s.x+"x")),s.size&&("string"===t["default"].typeOf(s.size)&&s.size.match(/\d+/)&&(s.size=Number(s.size)),d.push("number"===t["default"].typeOf(s.size)?"fa-"+s.size+"x":"fa-"+s.size)),s.fixedWidth&&d.push("fa-fw"),s.listItem&&d.push("fa-li"),s.pull&&d.push("pull-"+s.pull),s.border&&d.push("fa-border"),s.classNames&&!t["default"].isArray(s.classNames)&&(s.classNames=[s.classNames]),t["default"].isEmpty(s.classNames)||Array.prototype.push.apply(d,s.classNames),c+="<";var o=s.tagName||"i";return c+=o,c+=" class='"+d.join(" ")+"'",s.title&&(c+=" title='"+s.title+"'"),(void 0===s.ariaHidden||s.ariaHidden)&&(c+=' aria-hidden="true"'),c+="></"+o+">",t["default"].String.htmlSafe(c)};e["default"]=t["default"].Handlebars.makeBoundHelper(n),e.faIcon=n}),define("realtime-metro-web-client/initializers/app-version",["exports","realtime-metro-web-client/config/environment","ember"],function(e,t,a){"use strict";var r=a["default"].String.classify;e["default"]={name:"App Version",initialize:function(e,n){var i=r(n.toString());a["default"].libraries.register(i,t["default"].APP.version)}}}),define("realtime-metro-web-client/initializers/ember-moment",["exports","ember-moment/helpers/moment","ember-moment/helpers/ago","ember"],function(e,t,a,r){"use strict";var n=function(){r["default"].Handlebars.helper("moment",t.moment),r["default"].Handlebars.helper("ago",a.ago)};e["default"]={name:"ember-moment",initialize:n},e.initialize=n}),define("realtime-metro-web-client/initializers/export-application-global",["exports","ember","realtime-metro-web-client/config/environment"],function(e,t,a){"use strict";function r(e,r){var n=t["default"].String.classify(a["default"].modulePrefix);a["default"].exportApplicationGlobal&&!window[n]&&(window[n]=r)}e.initialize=r,e["default"]={name:"export-application-global",initialize:r}}),define("realtime-metro-web-client/router",["exports","ember","realtime-metro-web-client/config/environment"],function(e,t,a){"use strict";var r=t["default"].Router.extend({location:a["default"].locationType});r.map(function(){this.route("stops",{path:"/"},function(){this.route("search",{path:"/"}),this.route("favorites")}),this.route("routes"),this.route("showRoute",{path:"/route/:route_id"}),this.route("arrivals",{path:"/:stop_id"})}),e["default"]=r}),define("realtime-metro-web-client/routes/arrivals",["exports","ember","realtime-metro-web-client/utils/api"],function(e,t,a){"use strict";var r=t["default"].run,n=15e3;e["default"]=t["default"].Route.extend({pendingRefresh:null,model:function(e){return this.update(),{arrivals:[],stopId:e.stop_id,isLoading:!0}},setupController:function(e,t){e.setProperties(t)},update:function(){var e=this.paramsFor("arrivals");a.fetchArrivalsByStopId(e.stop_id).then(r.bind(this,"requestDidFinish"))},requestDidFinish:function(e){this.controller.setProperties({arrivals:e,isLoading:!1}),this.set("pendingRefresh",r.later(this,this.update,n))},actions:{willTransition:function(){r.cancel(this.get("pendingRefresh"))}}})}),define("realtime-metro-web-client/routes/routes",["exports","ember","ic-ajax","realtime-metro-web-client/config/environment"],function(e,t,a,r){"use strict";e["default"]=t["default"].Route.extend({model:function(){return a["default"](""+r["default"].APP.SERVER+"/api/routes")}})}),define("realtime-metro-web-client/routes/stops/favorites",["exports","ember"],function(e,t){"use strict";e["default"]=t["default"].Route.extend({model:function(){}})}),define("realtime-metro-web-client/routes/stops/search",["exports","ember","realtime-metro-web-client/utils/api"],function(e,t,a){"use strict";e["default"]=t["default"].Route.extend({queryParams:{name:{refreshModel:!0}},model:function(e){return e.name?a.searchStops(e.name):[]},setupController:function(e,t){e.set("stops",t)}})}),define("realtime-metro-web-client/services/clock",["exports","ember"],function(e,t){"use strict";e["default"]=t["default"].Service.extend({time:new Date,setup:t["default"].on("init",function(){var e=this;setInterval(function(){t["default"].run(function(){e.set("time",new Date)})},1e3)})})}),define("realtime-metro-web-client/services/favorite-stops",["exports","ember"],function(e,t){"use strict";e["default"]=t["default"].Service.extend({storeKey:"favoriteStops",store:window.localStorage,add:function(e){var t=this.get("all").concat(e);this.replaceStops(t),this.notifyPropertyChange("all")},remove:function(e){var t=this.get("all").rejectBy("id",e.id);this.replaceStops(t),this.notifyPropertyChange("all")},hasStop:function(e){return this.get("all").findBy("id",e.id)},all:t["default"].computed(function(){var e=this.store[this.storeKey];return e?JSON.parse(e):[]}),replaceStops:function(e){this.store[this.storeKey]=JSON.stringify(e)}})}),define("realtime-metro-web-client/templates/application",["exports"],function(e){"use strict";e["default"]=Ember.HTMLBars.template(function(){return{isHTMLBars:!0,revision:"Ember@1.12.0-beta.1+canary.d246e754",blockParams:0,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment(),a=e.createComment("");e.appendChild(t,a);var a=e.createTextNode("\n");return e.appendChild(t,a),t},render:function(e,t,a){var r=t.dom,n=t.hooks,i=n.content;r.detectNamespace(a);var s;t.useFragmentCache&&r.canClone?(null===this.cachedFragment&&(s=this.build(r),this.hasRendered?this.cachedFragment=s:this.hasRendered=!0),this.cachedFragment&&(s=r.cloneNode(this.cachedFragment,!0))):s=this.build(r);var d=r.createMorphAt(s,0,0,a);return r.insertBoundary(s,0),i(t,d,e,"outlet"),s}}}())}),define("realtime-metro-web-client/templates/arrivals",["exports"],function(e){"use strict";e["default"]=Ember.HTMLBars.template(function(){var e=function(){return{isHTMLBars:!0,revision:"Ember@1.12.0-beta.1+canary.d246e754",blockParams:0,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment(),a=e.createTextNode("  ");e.appendChild(t,a);var a=e.createElement("p");e.setAttribute(a,"class","soft-sides");var r=e.createTextNode("Loading stops...");e.appendChild(a,r),e.appendChild(t,a);var a=e.createTextNode("\n");return e.appendChild(t,a),t},render:function(e,t,a){var r=t.dom;r.detectNamespace(a);var n;return t.useFragmentCache&&r.canClone?(null===this.cachedFragment&&(n=this.build(r),this.hasRendered?this.cachedFragment=n:this.hasRendered=!0),this.cachedFragment&&(n=r.cloneNode(this.cachedFragment,!0))):n=this.build(r),n}}}(),t=function(){var e=function(){var e=function(){return{isHTMLBars:!0,revision:"Ember@1.12.0-beta.1+canary.d246e754",blockParams:1,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment(),a=e.createTextNode("      ");e.appendChild(t,a);var a=e.createComment("");e.appendChild(t,a);var a=e.createTextNode("\n");return e.appendChild(t,a),t},render:function(e,t,a,r){var n=t.dom,i=t.hooks,s=i.set,d=i.get,c=i.inline;n.detectNamespace(a);var o;t.useFragmentCache&&n.canClone?(null===this.cachedFragment&&(o=this.build(n),this.hasRendered?this.cachedFragment=o:this.hasRendered=!0),this.cachedFragment&&(o=n.cloneNode(this.cachedFragment,!0))):o=this.build(n);var l=n.createMorphAt(o,1,1,a);return s(t,e,"arrival",r[0]),c(t,l,e,"rt-arrival",[],{arrival:d(t,e,"arrival")}),o}}}();return{isHTMLBars:!0,revision:"Ember@1.12.0-beta.1+canary.d246e754",blockParams:0,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment(),a=e.createTextNode("  ");e.appendChild(t,a);var a=e.createElement("ol");e.setAttribute(a,"class","unstyled-list flush-top");var r=e.createTextNode("\n");e.appendChild(a,r);var r=e.createComment("");e.appendChild(a,r);var r=e.createTextNode("  ");e.appendChild(a,r),e.appendChild(t,a);var a=e.createTextNode("\n");return e.appendChild(t,a),t},render:function(t,a,r){var n=a.dom,i=a.hooks,s=i.get,d=i.block;n.detectNamespace(r);var c;a.useFragmentCache&&n.canClone?(null===this.cachedFragment&&(c=this.build(n),this.hasRendered?this.cachedFragment=c:this.hasRendered=!0),this.cachedFragment&&(c=n.cloneNode(this.cachedFragment,!0))):c=this.build(n);var o=n.createMorphAt(n.childAt(c,[1]),1,1);return d(a,o,t,"each",[s(a,t,"sortedArrivals")],{},e,null),c}}}(),t=function(){return{isHTMLBars:!0,revision:"Ember@1.12.0-beta.1+canary.d246e754",blockParams:0,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment(),a=e.createTextNode("  ");e.appendChild(t,a);var a=e.createElement("p");e.setAttribute(a,"class","soft-sides");var r=e.createTextNode("There are no arrivals for stop ");e.appendChild(a,r);var r=e.createComment("");e.appendChild(a,r),e.appendChild(t,a);var a=e.createTextNode("\n");return e.appendChild(t,a),t},render:function(e,t,a){var r=t.dom,n=t.hooks,i=n.content;r.detectNamespace(a);var s;t.useFragmentCache&&r.canClone?(null===this.cachedFragment&&(s=this.build(r),this.hasRendered?this.cachedFragment=s:this.hasRendered=!0),this.cachedFragment&&(s=r.cloneNode(this.cachedFragment,!0))):s=this.build(r);var d=r.createMorphAt(r.childAt(s,[1]),1,1);return i(t,d,e,"stopId"),s}}}();return{isHTMLBars:!0,revision:"Ember@1.12.0-beta.1+canary.d246e754",blockParams:0,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment(),a=e.createComment("");return e.appendChild(t,a),t},render:function(a,r,n){var i=r.dom,s=r.hooks,d=s.get,c=s.block;i.detectNamespace(n);var o;r.useFragmentCache&&i.canClone?(null===this.cachedFragment&&(o=this.build(i),this.hasRendered?this.cachedFragment=o:this.hasRendered=!0),this.cachedFragment&&(o=i.cloneNode(this.cachedFragment,!0))):o=this.build(i);var l=i.createMorphAt(o,0,0,n);return i.insertBoundary(o,null),i.insertBoundary(o,0),c(r,l,a,"if",[d(r,a,"sortedArrivals")],{},e,t),o}}}();return{isHTMLBars:!0,revision:"Ember@1.12.0-beta.1+canary.d246e754",blockParams:0,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment(),a=e.createElement("h1");e.setAttribute(a,"class","page-title");var r=e.createTextNode("Buses for ");e.appendChild(a,r);var r=e.createComment("");e.appendChild(a,r),e.appendChild(t,a);var a=e.createTextNode("\n\n");e.appendChild(t,a);var a=e.createComment("");return e.appendChild(t,a),t},render:function(a,r,n){var i=r.dom,s=r.hooks,d=s.content,c=s.get,o=s.block;i.detectNamespace(n);var l;r.useFragmentCache&&i.canClone?(null===this.cachedFragment&&(l=this.build(i),this.hasRendered?this.cachedFragment=l:this.hasRendered=!0),this.cachedFragment&&(l=i.cloneNode(this.cachedFragment,!0))):l=this.build(i);var u=i.createMorphAt(i.childAt(l,[0]),1,1),h=i.createMorphAt(l,2,2,n);return i.insertBoundary(l,null),d(r,u,a,"stopId"),o(r,h,a,"if",[c(r,a,"isLoading")],{},e,t),l}}}())}),define("realtime-metro-web-client/templates/components/rt-arrival",["exports"],function(e){"use strict";e["default"]=Ember.HTMLBars.template(function(){return{isHTMLBars:!0,revision:"Ember@1.12.0-beta.1+canary.d246e754",blockParams:0,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment(),a=e.createTextNode("Route ");e.appendChild(t,a);var a=e.createComment("");e.appendChild(t,a);var a=e.createTextNode(" - ");e.appendChild(t,a);var a=e.createComment("");e.appendChild(t,a);var a=e.createTextNode("\n");return e.appendChild(t,a),t},render:function(e,t,a){var r=t.dom,n=t.hooks,i=n.content;r.detectNamespace(a);var s;t.useFragmentCache&&r.canClone?(null===this.cachedFragment&&(s=this.build(r),this.hasRendered?this.cachedFragment=s:this.hasRendered=!0),this.cachedFragment&&(s=r.cloneNode(this.cachedFragment,!0))):s=this.build(r);var d=r.createMorphAt(s,1,1,a),c=r.createMorphAt(s,3,3,a);return i(t,d,e,"arrival.route_id"),i(t,c,e,"timeFromNow"),s}}}())}),define("realtime-metro-web-client/templates/components/rt-stop",["exports"],function(e){"use strict";e["default"]=Ember.HTMLBars.template(function(){var e=function(){return{isHTMLBars:!0,revision:"Ember@1.12.0-beta.1+canary.d246e754",blockParams:0,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment(),a=e.createTextNode("    ");e.appendChild(t,a);var a=e.createComment("");e.appendChild(t,a);var a=e.createTextNode("\n");return e.appendChild(t,a),t},render:function(e,t,a){var r=t.dom,n=t.hooks,i=n.content;r.detectNamespace(a);var s;t.useFragmentCache&&r.canClone?(null===this.cachedFragment&&(s=this.build(r),this.hasRendered?this.cachedFragment=s:this.hasRendered=!0),this.cachedFragment&&(s=r.cloneNode(this.cachedFragment,!0))):s=this.build(r);var d=r.createMorphAt(s,1,1,a);return i(t,d,e,"stop.name"),s}}}();return{isHTMLBars:!0,revision:"Ember@1.12.0-beta.1+canary.d246e754",blockParams:0,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment(),a=e.createElement("div");e.setAttribute(a,"class","stop-item");var r=e.createTextNode("\n");e.appendChild(a,r);var r=e.createComment("");e.appendChild(a,r);var r=e.createTextNode("  ");e.appendChild(a,r);var r=e.createElement("div");e.setAttribute(r,"class","stop-item__action");var n=e.createTextNode("\n    ");e.appendChild(r,n);var n=e.createComment("");e.appendChild(r,n);var n=e.createTextNode("\n  ");e.appendChild(r,n),e.appendChild(a,r);var r=e.createTextNode("\n");e.appendChild(a,r),e.appendChild(t,a);var a=e.createTextNode("\n");return e.appendChild(t,a),t},render:function(t,a,r){var n=a.dom,i=a.hooks,s=i.get,d=i.block,c=i.element,o=i.subexpr,l=i.inline;n.detectNamespace(r);var u;a.useFragmentCache&&n.canClone?(null===this.cachedFragment&&(u=this.build(n),this.hasRendered?this.cachedFragment=u:this.hasRendered=!0),this.cachedFragment&&(u=n.cloneNode(this.cachedFragment,!0))):u=this.build(n);var h=n.childAt(u,[0]),m=n.childAt(h,[3]),p=n.createMorphAt(h,1,1),f=n.createMorphAt(m,1,1);return d(a,p,t,"link-to",["arrivals",s(a,t,"stop.id")],{"class":"stop-item__content"},e,null),c(a,m,t,"action",["toggleFavorite",s(a,t,"stop")],{}),l(a,f,t,"fa-icon",[o(a,t,"if",[s(a,t,"isFavorite"),"star","star-o"],{})],{}),u}}}())}),define("realtime-metro-web-client/templates/routes",["exports"],function(e){"use strict";e["default"]=Ember.HTMLBars.template(function(){var e=function(){var e=function(){return{isHTMLBars:!0,revision:"Ember@1.12.0-beta.1+canary.d246e754",blockParams:0,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment(),a=e.createComment("");e.appendChild(t,a);var a=e.createTextNode(": ");e.appendChild(t,a);var a=e.createComment("");return e.appendChild(t,a),t},render:function(e,t,a){var r=t.dom,n=t.hooks,i=n.content;r.detectNamespace(a);var s;t.useFragmentCache&&r.canClone?(null===this.cachedFragment&&(s=this.build(r),this.hasRendered?this.cachedFragment=s:this.hasRendered=!0),this.cachedFragment&&(s=r.cloneNode(this.cachedFragment,!0))):s=this.build(r);var d=r.createMorphAt(s,0,0,a),c=r.createMorphAt(s,2,2,a);return r.insertBoundary(s,null),r.insertBoundary(s,0),i(t,d,e,"route.route_id"),i(t,c,e,"route.route_long_name"),s}}}();return{isHTMLBars:!0,revision:"Ember@1.12.0-beta.1+canary.d246e754",blockParams:1,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment(),a=e.createTextNode("  ");e.appendChild(t,a);var a=e.createComment("");e.appendChild(t,a);var a=e.createTextNode("\n");return e.appendChild(t,a),t},render:function(t,a,r,n){var i=a.dom,s=a.hooks,d=s.set,c=s.get,o=s.block;i.detectNamespace(r);var l;a.useFragmentCache&&i.canClone?(null===this.cachedFragment&&(l=this.build(i),this.hasRendered?this.cachedFragment=l:this.hasRendered=!0),this.cachedFragment&&(l=i.cloneNode(this.cachedFragment,!0))):l=this.build(i);var u=i.createMorphAt(l,1,1,r);return d(a,t,"route",n[0]),o(a,u,t,"link-to",["showRoute",c(a,t,"route.route_id")],{"class":"list-group__item"},e,null),l}}}();return{isHTMLBars:!0,revision:"Ember@1.12.0-beta.1+canary.d246e754",blockParams:0,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment(),a=e.createElement("h1");e.setAttribute(a,"class","page-title flush-top");var r=e.createTextNode("Bus Routes");e.appendChild(a,r),e.appendChild(t,a);var a=e.createTextNode("\n\n");e.appendChild(t,a);var a=e.createComment("");return e.appendChild(t,a),t},render:function(t,a,r){var n=a.dom,i=a.hooks,s=i.get,d=i.block;n.detectNamespace(r);var c;a.useFragmentCache&&n.canClone?(null===this.cachedFragment&&(c=this.build(n),this.hasRendered?this.cachedFragment=c:this.hasRendered=!0),this.cachedFragment&&(c=n.cloneNode(this.cachedFragment,!0))):c=this.build(n);var o=n.createMorphAt(c,2,2,r);return n.insertBoundary(c,null),d(a,o,t,"each",[s(a,t,"model.routes")],{},e,null),c}}}())}),define("realtime-metro-web-client/templates/stops",["exports"],function(e){"use strict";e["default"]=Ember.HTMLBars.template(function(){var e=function(){return{isHTMLBars:!0,revision:"Ember@1.12.0-beta.1+canary.d246e754",blockParams:0,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment(),a=e.createTextNode("    Search\n");return e.appendChild(t,a),t},render:function(e,t,a){var r=t.dom;r.detectNamespace(a);var n;return t.useFragmentCache&&r.canClone?(null===this.cachedFragment&&(n=this.build(r),this.hasRendered?this.cachedFragment=n:this.hasRendered=!0),this.cachedFragment&&(n=r.cloneNode(this.cachedFragment,!0))):n=this.build(r),n}}}(),t=function(){return{isHTMLBars:!0,revision:"Ember@1.12.0-beta.1+canary.d246e754",blockParams:0,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment(),a=e.createTextNode("    Favorites\n");return e.appendChild(t,a),t},render:function(e,t,a){var r=t.dom;r.detectNamespace(a);var n;return t.useFragmentCache&&r.canClone?(null===this.cachedFragment&&(n=this.build(r),this.hasRendered?this.cachedFragment=n:this.hasRendered=!0),this.cachedFragment&&(n=r.cloneNode(this.cachedFragment,!0))):n=this.build(r),n}}}();return{isHTMLBars:!0,revision:"Ember@1.12.0-beta.1+canary.d246e754",blockParams:0,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment(),a=e.createElement("h1");e.setAttribute(a,"class","page-title");var r=e.createTextNode("Bus Stops");e.appendChild(a,r),e.appendChild(t,a);var a=e.createTextNode("\n\n");e.appendChild(t,a);var a=e.createElement("div");e.setAttribute(a,"class","rt-tabs__navigated-content");var r=e.createTextNode("\n  ");e.appendChild(a,r);var r=e.createComment("");e.appendChild(a,r);var r=e.createTextNode("\n");e.appendChild(a,r),e.appendChild(t,a);var a=e.createTextNode("\n\n");e.appendChild(t,a);var a=e.createElement("nav");e.setAttribute(a,"class","rt-tabs");var r=e.createTextNode("\n");e.appendChild(a,r);var r=e.createComment("");e.appendChild(a,r);var r=e.createTextNode("\n");e.appendChild(a,r);var r=e.createComment("");e.appendChild(a,r),e.appendChild(t,a);var a=e.createTextNode("\n");return e.appendChild(t,a),t},render:function(a,r,n){var i=r.dom,s=r.hooks,d=s.content,c=s.block;i.detectNamespace(n);var o;r.useFragmentCache&&i.canClone?(null===this.cachedFragment&&(o=this.build(i),this.hasRendered?this.cachedFragment=o:this.hasRendered=!0),this.cachedFragment&&(o=i.cloneNode(this.cachedFragment,!0))):o=this.build(i);var l=i.childAt(o,[4]),u=i.createMorphAt(i.childAt(o,[2]),1,1),h=i.createMorphAt(l,1,1),m=i.createMorphAt(l,3,3);return d(r,u,a,"outlet"),c(r,h,a,"link-to",["stops.search"],{"class":"rt-tabs__tab"},e,null),c(r,m,a,"link-to",["stops.favorites"],{"class":"rt-tabs__tab"},t,null),o}}}())}),define("realtime-metro-web-client/templates/stops/favorites",["exports"],function(e){"use strict";e["default"]=Ember.HTMLBars.template(function(){var e=function(){return{isHTMLBars:!0,revision:"Ember@1.12.0-beta.1+canary.d246e754",blockParams:1,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment(),a=e.createTextNode("  ");e.appendChild(t,a);var a=e.createComment("");e.appendChild(t,a);var a=e.createTextNode("\n");return e.appendChild(t,a),t},render:function(e,t,a,r){var n=t.dom,i=t.hooks,s=i.set,d=i.get,c=i.inline;n.detectNamespace(a);var o;t.useFragmentCache&&n.canClone?(null===this.cachedFragment&&(o=this.build(n),this.hasRendered?this.cachedFragment=o:this.hasRendered=!0),this.cachedFragment&&(o=n.cloneNode(this.cachedFragment,!0))):o=this.build(n);var l=n.createMorphAt(o,1,1,a);return s(t,e,"stop",r[0]),c(t,l,e,"rt-stop",[],{stop:d(t,e,"stop")}),o}}}();return{isHTMLBars:!0,revision:"Ember@1.12.0-beta.1+canary.d246e754",blockParams:0,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment(),a=e.createComment("");return e.appendChild(t,a),t},render:function(t,a,r){var n=a.dom,i=a.hooks,s=i.get,d=i.block;n.detectNamespace(r);var c;a.useFragmentCache&&n.canClone?(null===this.cachedFragment&&(c=this.build(n),this.hasRendered?this.cachedFragment=c:this.hasRendered=!0),this.cachedFragment&&(c=n.cloneNode(this.cachedFragment,!0))):c=this.build(n);var o=n.createMorphAt(c,0,0,r);return n.insertBoundary(c,null),n.insertBoundary(c,0),d(a,o,t,"each",[s(a,t,"stops")],{},e,null),c}}}())}),define("realtime-metro-web-client/templates/stops/search",["exports"],function(e){"use strict";e["default"]=Ember.HTMLBars.template(function(){var e=function(){return{isHTMLBars:!0,revision:"Ember@1.12.0-beta.1+canary.d246e754",blockParams:1,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment(),a=e.createTextNode("  ");e.appendChild(t,a);var a=e.createComment("");e.appendChild(t,a);var a=e.createTextNode("\n");return e.appendChild(t,a),t},render:function(e,t,a,r){var n=t.dom,i=t.hooks,s=i.set,d=i.get,c=i.inline;n.detectNamespace(a);var o;t.useFragmentCache&&n.canClone?(null===this.cachedFragment&&(o=this.build(n),this.hasRendered?this.cachedFragment=o:this.hasRendered=!0),this.cachedFragment&&(o=n.cloneNode(this.cachedFragment,!0))):o=this.build(n);var l=n.createMorphAt(o,1,1,a);return s(t,e,"stop",r[0]),c(t,l,e,"rt-stop",[],{stop:d(t,e,"stop")}),o}}}();return{isHTMLBars:!0,revision:"Ember@1.12.0-beta.1+canary.d246e754",blockParams:0,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment(),a=e.createElement("form");e.setAttribute(a,"class","push-sides");var r=e.createTextNode("\n  ");e.appendChild(a,r);var r=e.createElement("div");e.setAttribute(r,"class","input-group");var n=e.createTextNode("\n    ");e.appendChild(r,n);var n=e.createComment("");e.appendChild(r,n);var n=e.createTextNode("\n    ");e.appendChild(r,n);var n=e.createElement("div");e.setAttribute(n,"class","input-group__button");var i=e.createTextNode("\n      ");e.appendChild(n,i);var i=e.createElement("button");e.setAttribute(i,"type","submit"),e.setAttribute(i,"class","button");var s=e.createTextNode("Search");e.appendChild(i,s),e.appendChild(n,i);var i=e.createTextNode("\n    ");e.appendChild(n,i),e.appendChild(r,n);var n=e.createTextNode("\n  ");e.appendChild(r,n),e.appendChild(a,r);var r=e.createTextNode("\n");e.appendChild(a,r),e.appendChild(t,a);var a=e.createTextNode("\n\n");e.appendChild(t,a);var a=e.createComment("");return e.appendChild(t,a),t},render:function(t,a,r){var n=a.dom,i=a.hooks,s=i.element,d=i.get,c=i.inline,o=i.block;n.detectNamespace(r);var l;a.useFragmentCache&&n.canClone?(null===this.cachedFragment&&(l=this.build(n),this.hasRendered?this.cachedFragment=l:this.hasRendered=!0),this.cachedFragment&&(l=n.cloneNode(this.cachedFragment,!0))):l=this.build(n);var u=n.childAt(l,[0]),h=n.createMorphAt(n.childAt(u,[1]),1,1),m=n.createMorphAt(l,2,2,r);return n.insertBoundary(l,null),s(a,u,t,"action",["search"],{on:"submit"}),c(a,h,t,"input",[],{value:d(a,t,"nameField"),placeholder:"Street Name","class":"text-field"}),o(a,m,t,"each",[d(a,t,"stops")],{},e,null),l}}}())}),define("realtime-metro-web-client/utils/api",["exports","ic-ajax","realtime-metro-web-client/config/environment","realtime-metro-web-client/utils/serialize-stops"],function(e,t,a,r){"use strict";function n(e){return t["default"](""+a["default"].APP.SERVER+"/api/stops?name="+e).then(r["default"])}function i(e){return t["default"](""+a["default"].APP.SERVER+"/api/arrivals/"+e).then(function(e){return e.arrivals})}e.searchStops=n,e.fetchArrivalsByStopId=i}),define("realtime-metro-web-client/utils/serialize-stops",["exports"],function(e){"use strict";function t(e){return e.stops.map(function(e){return{id:e.stop_id,name:e.stop_name}})}e["default"]=t}),define("realtime-metro-web-client/utils/string-to-hue",["exports"],function(e){"use strict";function t(e){var t=0;if(0===e.length)return t;for(var a=0;a<e.length;a++){var r=123*e.charCodeAt(a);t=(t<<5)-t+r,t&=t}return t}function a(e){return Math.abs(t(e))%360}e["default"]=a}),define("realtime-metro-web-client/config/environment",["ember"],function(e){var t="realtime-metro-web-client";try{var a=t+"/config/environment",r=e["default"].$('meta[name="'+a+'"]').attr("content"),n=JSON.parse(unescape(r));return{"default":n}}catch(i){throw new Error('Could not read config from meta tag with name "'+a+'".')}}),runningTests?require("realtime-metro-web-client/tests/test-helper"):require("realtime-metro-web-client/app")["default"].create({SERVER:"http://realtime-metro.herokuapp.com",name:"realtime-metro-web-client",version:"0.0.0.ea66e5b1"});