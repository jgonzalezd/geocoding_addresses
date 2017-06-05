(function() {
  'use strict';

  var globals = typeof window === 'undefined' ? global : window;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = ({}).hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = null;
    hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    return aliases[name] ? expandAlias(aliases[name]) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = window;
var process;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};
require.register("frontend/js/app.js", function(exports, require, module) {
'use strict';

var _Home = require('./components/Home');

var _Home2 = _interopRequireDefault(_Home);

require('vueify/lib/insert-css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var App = {
  init: function init() {
    new Vue({
      el: '#app',
      components: {
        'Home': _Home2.default
      },
      template: '<div><Home/></div>'
    });
  }
};
// Import this if you wish to use CSS in your .vue files.
// See section below for more information.

module.exports = App;
});

require.register("frontend/js/components/Home.vue", function(exports, require, module) {
var __vueify_style_dispose__ = require("vueify/lib/insert-css").insert(".jumbotron[data-v-786313ba]{\n  border-radius:0px!important;\n  box-shadow:1px 1px 4px rgba(0,0,0,0.6);\n  background-size: cover;\n  background-position: center center;\n  background-repeat: no-repeat;\n  background-image: linear-gradient(to bottom, rgba(255,255,255,0.6) 0%,rgba(255,255,255,0.6) 100%), url(https://static1.squarespace.com/static/548353e7e4b0883e5fe2d2f0/t/54b7015ee4b05e2e7fbb69a9/1419960947279/black-white-city_white_2.jpg?format=2500w);\n  position: relative;\n  height: 100%;\n}\n.jumbotron[data-v-786313ba]:after{\n  opacity: 0.9;\n}\n\n.save.btn[data-v-786313ba] {\n  border-radius:0px!important;\n  box-shadow:1px 1px 4px rgba(0,0,0,0.4);\n  /*padding:10px 40px;*/\n}")
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  data: function data() {
    return {
      welcome: "Hello from Vue!",
      foundLocations: [],
      savedLocations: [],
      address: ''
    };
  },
  mounted: function mounted() {
    $.ajax({
      url: "/index"
    }).done(function (data) {
      this.savedLocations = data;
    }.bind(this));
  },

  methods: {
    search: function search() {

      $.ajax({
        url: "/search",
        data: {
          address: this.address
        }
      }).done(function (data) {
        var _this = this;
        _this.clearFoundLocations();
        data.forEach(function (el) {
          _this.addFoundLocation(el);
        });
      }.bind(this));
    },
    addFoundLocation: function addFoundLocation(location) {
      location["id"] = this.foundLocations.length;
      this.foundLocations.push(location);
    },
    clearFoundLocations: function clearFoundLocations() {
      this.foundLocations = [];
    },
    save: function save(index) {
      var location = this.foundLocations.filter(function (e) {
        return e.id == index;
      })[0];
      var _this = this;
      $.ajax({
        url: "/create",
        data: location,
        dataType: "json",
        method: "post",
        complete: function (data, xhr) {
          if (data.status == 201) {
            this.addSavedLocation(location);
          } else {}
        }.bind(this)
      });
    },
    addSavedLocation: function addSavedLocation(location) {
      this.savedLocations.push(location);
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"container"},[_vm._m(0),_vm._v(" "),_c('h3',{staticClass:"text-center"},[_vm._v("Search Address")]),_vm._v(" "),_c('div',{staticClass:"row"},[_c('div',{staticClass:"col-lg-6 col-lg-offset-3"},[_c('form',[_c('div',{staticClass:"form-group"},[_c('div',{staticClass:"input-group"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.address),expression:"address"}],staticClass:"form-control",attrs:{"type":"text","placeholder":"Type your address here...","name":"search-input"},domProps:{"value":(_vm.address)},on:{"input":function($event){if($event.target.composing){ return; }_vm.address=$event.target.value}}}),_vm._v(" "),_c('span',{staticClass:"input-group-btn"},[_c('button',{staticClass:"btn btn-default",attrs:{"type":"button","name":"search-button"},on:{"click":_vm.search}},[_vm._v("Go!")])])])])])])]),_vm._v(" "),_c('div',{staticClass:"row"},[_c('div',{staticClass:"col-lg-12"},[_c('div',{staticClass:"panel panel-default"},[_vm._m(1),_vm._v(" "),_c('div',{staticClass:"panel-body"},[(_vm.foundLocations.length == 0)?_c('span',[_vm._v(" No results yet. Try typing an address to start searching... Example: "),_c('i',[_vm._v("1600 Amphitheatre Parkway, Mountain View, CA")])]):_c('table',{staticClass:"table table-striped"},[_c('thead',[_c('tr',[_c('th',[_vm._v("City")]),_vm._v(" "),_c('th',[_vm._v("Subdivision")]),_vm._v(" "),_c('th',[_vm._v("State")]),_vm._v(" "),_c('th',[_vm._v("Country")]),_vm._v(" "),_c('th',[_vm._v("Latitude")]),_vm._v(" "),_c('th',[_vm._v("Longitude")]),_vm._v(" "),_c('th')])]),_vm._v(" "),_c('tbody',_vm._l((_vm.foundLocations),function(foundLocation){return _c('tr',[_c('td',[_vm._v(_vm._s(foundLocation.locality))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(foundLocation.administrative_area_level_2))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(foundLocation.administrative_area_level_1))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(foundLocation.country))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(foundLocation.lat))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(foundLocation.lng))]),_vm._v(" "),_c('td',[_c('button',{staticClass:"btn btn-primary btn-xs save",attrs:{"type":"button","name":"button"},on:{"click":function($event){_vm.save(foundLocation.id)}}},[_vm._v("Save")])])])}))])])])])]),_vm._v(" "),_c('div',{staticClass:"row bottom"},[_c('div',{staticClass:"col-lg-12"},[_c('h3',{staticClass:"text-center"},[_vm._v("Saved Locations")]),_vm._v(" "),_c('div',{staticClass:"panel panel-info"},[_c('div',{staticClass:"panel-heading"},[_vm._v("Panel heading without title")]),_vm._v(" "),_c('div',{staticClass:"panel-body"},[_c('table',{staticClass:"table table-striped"},[_vm._m(2),_vm._v(" "),_c('tbody',_vm._l((_vm.savedLocations),function(savedLocation){return _c('tr',[_c('td',[_vm._v(_vm._s(savedLocation.address))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(savedLocation.lat))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(savedLocation.lng))])])}))])])])])])])}
__vue__options__.staticRenderFns = [function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"row"},[_c('br'),_vm._v(" "),_c('div',{staticClass:"col-lg-12"},[_c('div',{staticClass:"jumbotron"},[_c('h1',[_vm._v("Geocode")]),_vm._v(" "),_c('p',[_vm._v("Use this simple app to geocode your addresses. Start by typing your address in the box below and select the desired address to store the geolocation in the DB")])])])])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"panel-heading"},[_c('h3',{staticClass:"panel-title"},[_vm._v("Results")])])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('thead',[_c('tr',[_c('th',[_vm._v("Address")]),_vm._v(" "),_c('th',[_vm._v("Latitude")]),_vm._v(" "),_c('th',[_vm._v("Longitude")])])])}]
__vue__options__._scopeId = "data-v-786313ba"
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  module.hot.dispose(__vueify_style_dispose__)
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-786313ba", __vue__options__)
  } else {
    hotAPI.reload("data-v-786313ba", __vue__options__)
  }
})()}
});

;require.alias("process/browser.js", "process");process = require('process');require.register("___globals___", function(exports, require, module) {
  

// Auto-loaded modules from config.npm.globals.
window["$"] = require("jquery");
window.breakfast = require("breakfast-rails");
window.Vue = require("vue/dist/vue.common.js");


});})();require('___globals___');


//# sourceMappingURL=app.js.map