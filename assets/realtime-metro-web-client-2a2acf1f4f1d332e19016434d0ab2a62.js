define("realtime-metro-web-client/app",["exports","ember","ember/resolver","ember/load-initializers","realtime-metro-web-client/config/environment"],function(e,t,r,a,n){"use strict";t["default"].MODEL_FACTORY_INJECTIONS=!0;var i=t["default"].Application.extend({modulePrefix:n["default"].modulePrefix,podModulePrefix:n["default"].podModulePrefix,Resolver:r["default"]});a["default"](i,n["default"].modulePrefix),e["default"]=i}),define("realtime-metro-web-client/components/rt-arrival",["exports","ember","moment","realtime-metro-web-client/utils/string-to-hue"],function(e,t,r,a){"use strict";var n=t["default"].inject;e["default"]=t["default"].Component.extend({tagName:"li",clock:n.service(),attributeBindings:["style"],classNames:["rt-arrival"],timeFromNow:t["default"].computed("clock.time",function(){return r["default"](this.get("arrival.time")).fromNow()}),style:t["default"].computed("arrival.route_id",function(){var e=a["default"](this.get("arrival.route_id"));return"color:            hsl("+e+", 60%, 25%);\n            background-color: hsl("+e+", 40%, 95%);\n            border-color:     hsl("+e+", 40%, 80%);"})})}),define("realtime-metro-web-client/controllers/arrivals",["exports","ember"],function(e,t){"use strict";var r=t["default"].computed;e["default"]=t["default"].Controller.extend({arrivalSorting:["time:asc"],sortedArrivals:r.sort("arrivals","arrivalSorting")})}),define("realtime-metro-web-client/controllers/stops",["exports","ember"],function(e,t){"use strict";t["default"].computed;e["default"]=t["default"].Controller.extend({queryParams:["name"],name:null,nameField:t["default"].computed.oneWay("name"),actions:{search:function(){this.set("name",this.get("nameField"))}}})}),define("realtime-metro-web-client/initializers/app-version",["exports","realtime-metro-web-client/config/environment","ember"],function(e,t,r){"use strict";var a=r["default"].String.classify;e["default"]={name:"App Version",initialize:function(e,n){var i=a(n.toString());r["default"].libraries.register(i,t["default"].APP.version)}}}),define("realtime-metro-web-client/initializers/ember-moment",["exports","ember-moment/helpers/moment","ember-moment/helpers/ago","ember"],function(e,t,r,a){"use strict";var n=function(){a["default"].Handlebars.helper("moment",t.moment),a["default"].Handlebars.helper("ago",r.ago)};e["default"]={name:"ember-moment",initialize:n},e.initialize=n}),define("realtime-metro-web-client/initializers/export-application-global",["exports","ember","realtime-metro-web-client/config/environment"],function(e,t,r){"use strict";function a(e,a){var n=t["default"].String.classify(r["default"].modulePrefix);r["default"].exportApplicationGlobal&&!window[n]&&(window[n]=a)}e.initialize=a,e["default"]={name:"export-application-global",initialize:a}}),define("realtime-metro-web-client/router",["exports","ember","realtime-metro-web-client/config/environment"],function(e,t,r){"use strict";var a=t["default"].Router.extend({location:r["default"].locationType});a.map(function(){this.route("stops",{path:"/"}),this.route("routes"),this.route("showRoute",{path:"/route/:route_id"}),this.route("arrivals",{path:"/:stop_id"})}),e["default"]=a}),define("realtime-metro-web-client/routes/arrivals",["exports","ember","ic-ajax","realtime-metro-web-client/config/environment"],function(e,t,r,a){"use strict";var n=t["default"].run,i=15e3;e["default"]=t["default"].Route.extend({pendingRefresh:null,model:function(e){r["default"](""+a["default"].APP.SERVER+"/api/arrivals/"+e.stop_id).then(n.bind(this,"requestDidFinish"))},setupController:function(e){e.setProperties({arrivals:[],stopId:this.paramsFor("arrivals").stop_id,isLoading:!0})},requestDidFinish:function(e){this.controller.setProperties({arrivals:e.arrivals,isLoading:!1}),this.set("pendingRefresh",n.later(this,this.refresh,i))},actions:{willTransition:function(){n.cancel(this.get("pendingRefresh"))}}})}),define("realtime-metro-web-client/routes/routes",["exports","ember","ic-ajax","realtime-metro-web-client/config/environment"],function(e,t,r,a){"use strict";e["default"]=t["default"].Route.extend({model:function(){return r["default"](""+a["default"].APP.SERVER+"/api/routes")}})}),define("realtime-metro-web-client/routes/stops",["exports","ember","ic-ajax","realtime-metro-web-client/config/environment"],function(e,t,r,a){"use strict";e["default"]=t["default"].Route.extend({queryParams:{name:{refreshModel:!0}},model:function(e){return e.name?r["default"](""+a["default"].APP.SERVER+"/api/stops?name="+e.name):[]}})}),define("realtime-metro-web-client/services/clock",["exports","ember"],function(e,t){"use strict";e["default"]=t["default"].Service.extend({time:new Date,setup:t["default"].on("init",function(){var e=this;setInterval(function(){t["default"].run(function(){e.set("time",new Date)})},1e3)})})}),define("realtime-metro-web-client/templates/application",["exports"],function(e){"use strict";e["default"]=Ember.HTMLBars.template(function(){return{isHTMLBars:!0,revision:"Ember@1.12.0-beta.1+canary.d246e754",blockParams:0,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment(),r=e.createElement("div");e.setAttribute(r,"class","well");var a=e.createTextNode("\n  ");e.appendChild(r,a);var a=e.createComment("");e.appendChild(r,a);var a=e.createTextNode("\n");e.appendChild(r,a),e.appendChild(t,r);var r=e.createTextNode("\n");return e.appendChild(t,r),t},render:function(e,t,r){var a=t.dom,n=t.hooks,i=n.content;a.detectNamespace(r);var d;t.useFragmentCache&&a.canClone?(null===this.cachedFragment&&(d=this.build(a),this.hasRendered?this.cachedFragment=d:this.hasRendered=!0),this.cachedFragment&&(d=a.cloneNode(this.cachedFragment,!0))):d=this.build(a);var c=a.createMorphAt(a.childAt(d,[0]),1,1);return i(t,c,e,"outlet"),d}}}())}),define("realtime-metro-web-client/templates/arrivals",["exports"],function(e){"use strict";e["default"]=Ember.HTMLBars.template(function(){var e=function(){return{isHTMLBars:!0,revision:"Ember@1.12.0-beta.1+canary.d246e754",blockParams:0,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment(),r=e.createTextNode("  Loading stops...\n");return e.appendChild(t,r),t},render:function(e,t,r){var a=t.dom;a.detectNamespace(r);var n;return t.useFragmentCache&&a.canClone?(null===this.cachedFragment&&(n=this.build(a),this.hasRendered?this.cachedFragment=n:this.hasRendered=!0),this.cachedFragment&&(n=a.cloneNode(this.cachedFragment,!0))):n=this.build(a),n}}}(),t=function(){var e=function(){var e=function(){return{isHTMLBars:!0,revision:"Ember@1.12.0-beta.1+canary.d246e754",blockParams:1,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment(),r=e.createTextNode("      ");e.appendChild(t,r);var r=e.createComment("");e.appendChild(t,r);var r=e.createTextNode("\n");return e.appendChild(t,r),t},render:function(e,t,r,a){var n=t.dom,i=t.hooks,d=i.set,c=i.get,o=i.inline;n.detectNamespace(r);var l;t.useFragmentCache&&n.canClone?(null===this.cachedFragment&&(l=this.build(n),this.hasRendered?this.cachedFragment=l:this.hasRendered=!0),this.cachedFragment&&(l=n.cloneNode(this.cachedFragment,!0))):l=this.build(n);var s=n.createMorphAt(l,1,1,r);return d(t,e,"arrival",a[0]),o(t,s,e,"rt-arrival",[],{arrival:c(t,e,"arrival"),"class":"push-bottom"}),l}}}();return{isHTMLBars:!0,revision:"Ember@1.12.0-beta.1+canary.d246e754",blockParams:0,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment(),r=e.createTextNode("  ");e.appendChild(t,r);var r=e.createElement("ol");e.setAttribute(r,"class","unstyled-list");var a=e.createTextNode("\n");e.appendChild(r,a);var a=e.createComment("");e.appendChild(r,a);var a=e.createTextNode("  ");e.appendChild(r,a),e.appendChild(t,r);var r=e.createTextNode("\n");return e.appendChild(t,r),t},render:function(t,r,a){var n=r.dom,i=r.hooks,d=i.get,c=i.block;n.detectNamespace(a);var o;r.useFragmentCache&&n.canClone?(null===this.cachedFragment&&(o=this.build(n),this.hasRendered?this.cachedFragment=o:this.hasRendered=!0),this.cachedFragment&&(o=n.cloneNode(this.cachedFragment,!0))):o=this.build(n);var l=n.createMorphAt(n.childAt(o,[1]),1,1);return c(r,l,t,"each",[d(r,t,"sortedArrivals")],{},e,null),o}}}(),t=function(){return{isHTMLBars:!0,revision:"Ember@1.12.0-beta.1+canary.d246e754",blockParams:0,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment(),r=e.createTextNode("  There are no arrivals for stop ");e.appendChild(t,r);var r=e.createComment("");e.appendChild(t,r);var r=e.createTextNode("\n");return e.appendChild(t,r),t},render:function(e,t,r){var a=t.dom,n=t.hooks,i=n.content;a.detectNamespace(r);var d;t.useFragmentCache&&a.canClone?(null===this.cachedFragment&&(d=this.build(a),this.hasRendered?this.cachedFragment=d:this.hasRendered=!0),this.cachedFragment&&(d=a.cloneNode(this.cachedFragment,!0))):d=this.build(a);var c=a.createMorphAt(d,1,1,r);return i(t,c,e,"stopId"),d}}}();return{isHTMLBars:!0,revision:"Ember@1.12.0-beta.1+canary.d246e754",blockParams:0,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment(),r=e.createComment("");return e.appendChild(t,r),t},render:function(r,a,n){var i=a.dom,d=a.hooks,c=d.get,o=d.block;i.detectNamespace(n);var l;a.useFragmentCache&&i.canClone?(null===this.cachedFragment&&(l=this.build(i),this.hasRendered?this.cachedFragment=l:this.hasRendered=!0),this.cachedFragment&&(l=i.cloneNode(this.cachedFragment,!0))):l=this.build(i);var s=i.createMorphAt(l,0,0,n);return i.insertBoundary(l,null),i.insertBoundary(l,0),o(a,s,r,"if",[c(a,r,"sortedArrivals")],{},e,t),l}}}();return{isHTMLBars:!0,revision:"Ember@1.12.0-beta.1+canary.d246e754",blockParams:0,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment(),r=e.createElement("h1");e.setAttribute(r,"class","page-title flush-top");var a=e.createTextNode("Buses for ");e.appendChild(r,a);var a=e.createComment("");e.appendChild(r,a),e.appendChild(t,r);var r=e.createTextNode("\n\n");e.appendChild(t,r);var r=e.createComment("");return e.appendChild(t,r),t},render:function(r,a,n){var i=a.dom,d=a.hooks,c=d.content,o=d.get,l=d.block;i.detectNamespace(n);var s;a.useFragmentCache&&i.canClone?(null===this.cachedFragment&&(s=this.build(i),this.hasRendered?this.cachedFragment=s:this.hasRendered=!0),this.cachedFragment&&(s=i.cloneNode(this.cachedFragment,!0))):s=this.build(i);var u=i.createMorphAt(i.childAt(s,[0]),1,1),m=i.createMorphAt(s,2,2,n);return i.insertBoundary(s,null),c(a,u,r,"stopId"),l(a,m,r,"if",[o(a,r,"isLoading")],{},e,t),s}}}())}),define("realtime-metro-web-client/templates/components/rt-arrival",["exports"],function(e){"use strict";e["default"]=Ember.HTMLBars.template(function(){return{isHTMLBars:!0,revision:"Ember@1.12.0-beta.1+canary.d246e754",blockParams:0,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment(),r=e.createTextNode("Route ");e.appendChild(t,r);var r=e.createComment("");e.appendChild(t,r);var r=e.createTextNode(" - ");e.appendChild(t,r);var r=e.createComment("");e.appendChild(t,r);var r=e.createTextNode("\n");return e.appendChild(t,r),t},render:function(e,t,r){var a=t.dom,n=t.hooks,i=n.content;a.detectNamespace(r);var d;t.useFragmentCache&&a.canClone?(null===this.cachedFragment&&(d=this.build(a),this.hasRendered?this.cachedFragment=d:this.hasRendered=!0),this.cachedFragment&&(d=a.cloneNode(this.cachedFragment,!0))):d=this.build(a);var c=a.createMorphAt(d,1,1,r),o=a.createMorphAt(d,3,3,r);return i(t,c,e,"arrival.route_id"),i(t,o,e,"timeFromNow"),d}}}())}),define("realtime-metro-web-client/templates/routes",["exports"],function(e){"use strict";e["default"]=Ember.HTMLBars.template(function(){var e=function(){var e=function(){return{isHTMLBars:!0,revision:"Ember@1.12.0-beta.1+canary.d246e754",blockParams:0,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment(),r=e.createComment("");e.appendChild(t,r);var r=e.createTextNode(": ");e.appendChild(t,r);var r=e.createComment("");return e.appendChild(t,r),t},render:function(e,t,r){var a=t.dom,n=t.hooks,i=n.content;a.detectNamespace(r);var d;t.useFragmentCache&&a.canClone?(null===this.cachedFragment&&(d=this.build(a),this.hasRendered?this.cachedFragment=d:this.hasRendered=!0),this.cachedFragment&&(d=a.cloneNode(this.cachedFragment,!0))):d=this.build(a);var c=a.createMorphAt(d,0,0,r),o=a.createMorphAt(d,2,2,r);return a.insertBoundary(d,null),a.insertBoundary(d,0),i(t,c,e,"route.route_id"),i(t,o,e,"route.route_long_name"),d}}}();return{isHTMLBars:!0,revision:"Ember@1.12.0-beta.1+canary.d246e754",blockParams:1,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment(),r=e.createTextNode("  ");e.appendChild(t,r);var r=e.createComment("");e.appendChild(t,r);var r=e.createTextNode("\n");return e.appendChild(t,r),t},render:function(t,r,a,n){var i=r.dom,d=r.hooks,c=d.set,o=d.get,l=d.block;i.detectNamespace(a);var s;r.useFragmentCache&&i.canClone?(null===this.cachedFragment&&(s=this.build(i),this.hasRendered?this.cachedFragment=s:this.hasRendered=!0),this.cachedFragment&&(s=i.cloneNode(this.cachedFragment,!0))):s=this.build(i);var u=i.createMorphAt(s,1,1,a);return c(r,t,"route",n[0]),l(r,u,t,"link-to",["showRoute",o(r,t,"route.route_id")],{"class":"list-group__item"},e,null),s}}}();return{isHTMLBars:!0,revision:"Ember@1.12.0-beta.1+canary.d246e754",blockParams:0,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment(),r=e.createElement("h1");e.setAttribute(r,"class","page-title flush-top");var a=e.createTextNode("Bus Routes");e.appendChild(r,a),e.appendChild(t,r);var r=e.createTextNode("\n\n");e.appendChild(t,r);var r=e.createComment("");return e.appendChild(t,r),t},render:function(t,r,a){var n=r.dom,i=r.hooks,d=i.get,c=i.block;n.detectNamespace(a);var o;r.useFragmentCache&&n.canClone?(null===this.cachedFragment&&(o=this.build(n),this.hasRendered?this.cachedFragment=o:this.hasRendered=!0),this.cachedFragment&&(o=n.cloneNode(this.cachedFragment,!0))):o=this.build(n);var l=n.createMorphAt(o,2,2,a);return n.insertBoundary(o,null),c(r,l,t,"each",[d(r,t,"model.routes")],{},e,null),o}}}())}),define("realtime-metro-web-client/templates/stops",["exports"],function(e){"use strict";e["default"]=Ember.HTMLBars.template(function(){var e=function(){var e=function(){return{isHTMLBars:!0,revision:"Ember@1.12.0-beta.1+canary.d246e754",blockParams:0,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment(),r=e.createComment("");return e.appendChild(t,r),t},render:function(e,t,r){var a=t.dom,n=t.hooks,i=n.content;a.detectNamespace(r);var d;t.useFragmentCache&&a.canClone?(null===this.cachedFragment&&(d=this.build(a),this.hasRendered?this.cachedFragment=d:this.hasRendered=!0),this.cachedFragment&&(d=a.cloneNode(this.cachedFragment,!0))):d=this.build(a);var c=a.createMorphAt(d,0,0,r);return a.insertBoundary(d,null),a.insertBoundary(d,0),i(t,c,e,"stop.stop_name"),d}}}();return{isHTMLBars:!0,revision:"Ember@1.12.0-beta.1+canary.d246e754",blockParams:1,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment(),r=e.createTextNode("  ");e.appendChild(t,r);var r=e.createComment("");e.appendChild(t,r);var r=e.createTextNode("\n");return e.appendChild(t,r),t},render:function(t,r,a,n){var i=r.dom,d=r.hooks,c=d.set,o=d.get,l=d.block;i.detectNamespace(a);var s;r.useFragmentCache&&i.canClone?(null===this.cachedFragment&&(s=this.build(i),this.hasRendered?this.cachedFragment=s:this.hasRendered=!0),this.cachedFragment&&(s=i.cloneNode(this.cachedFragment,!0))):s=this.build(i);var u=i.createMorphAt(s,1,1,a);return c(r,t,"stop",n[0]),l(r,u,t,"link-to",["arrivals",o(r,t,"stop.stop_id")],{"class":"list-group__item"},e,null),s}}}();return{isHTMLBars:!0,revision:"Ember@1.12.0-beta.1+canary.d246e754",blockParams:0,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment(),r=e.createElement("h1");e.setAttribute(r,"class","page-title flush-top");var a=e.createTextNode("Bus Stops");e.appendChild(r,a),e.appendChild(t,r);var r=e.createTextNode("\n\n");e.appendChild(t,r);var r=e.createElement("form"),a=e.createTextNode("\n  ");e.appendChild(r,a);var a=e.createComment("");e.appendChild(r,a);var a=e.createTextNode("\n  ");e.appendChild(r,a);var a=e.createElement("button");e.setAttribute(a,"type","submit");var n=e.createTextNode("Search");e.appendChild(a,n),e.appendChild(r,a);var a=e.createTextNode("  \n");e.appendChild(r,a),e.appendChild(t,r);var r=e.createTextNode("\n\n");e.appendChild(t,r);var r=e.createComment("");return e.appendChild(t,r),t},render:function(t,r,a){var n=r.dom,i=r.hooks,d=i.element,c=i.get,o=i.inline,l=i.block;n.detectNamespace(a);var s;r.useFragmentCache&&n.canClone?(null===this.cachedFragment&&(s=this.build(n),this.hasRendered?this.cachedFragment=s:this.hasRendered=!0),this.cachedFragment&&(s=n.cloneNode(this.cachedFragment,!0))):s=this.build(n);var u=n.childAt(s,[2]),m=n.createMorphAt(u,1,1),h=n.createMorphAt(s,4,4,a);return n.insertBoundary(s,null),d(r,u,t,"action",["search"],{on:"submit"}),o(r,m,t,"input",[],{value:c(r,t,"nameField"),placeholder:"Street Name"}),l(r,h,t,"each",[c(r,t,"model.stops")],{},e,null),s}}}())}),define("realtime-metro-web-client/utils/string-to-hue",["exports"],function(e){"use strict";function t(e){var t=0;if(0===e.length)return t;for(var r=0;r<e.length;r++){var a=123*e.charCodeAt(r);t=(t<<5)-t+a,t&=t}return t}function r(e){return Math.abs(t(e))%360}e["default"]=r}),define("realtime-metro-web-client/config/environment",["ember"],function(e){var t="realtime-metro-web-client";try{var r=t+"/config/environment",a=e["default"].$('meta[name="'+r+'"]').attr("content"),n=JSON.parse(unescape(a));return{"default":n}}catch(i){throw new Error('Could not read config from meta tag with name "'+r+'".')}}),runningTests?require("realtime-metro-web-client/tests/test-helper"):require("realtime-metro-web-client/app")["default"].create({SERVER:"http://realtime-metro.herokuapp.com",name:"realtime-metro-web-client",version:"0.0.0.793219d5"});