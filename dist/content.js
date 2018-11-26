/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/content.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/dom-loaded/index.js":
/*!******************************************!*\
  !*** ./node_modules/dom-loaded/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = new Promise(resolve => {\n\tif (document.readyState === 'interactive' || document.readyState === 'complete') {\n\t\tresolve();\n\t} else {\n\t\tdocument.addEventListener('DOMContentLoaded', () => {\n\t\t\tresolve();\n\t\t}, {\n\t\t\tcapture: true,\n\t\t\tonce: true,\n\t\t\tpassive: true\n\t\t});\n\t}\n});\n\n\n//# sourceURL=webpack:///./node_modules/dom-loaded/index.js?");

/***/ }),

/***/ "./node_modules/element-ready/index.js":
/*!*********************************************!*\
  !*** ./node_modules/element-ready/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nconst PCancelable = __webpack_require__(/*! p-cancelable */ \"./node_modules/p-cancelable/index.js\");\n\nconst targetCache = new WeakMap();\n\nconst cleanCache = (target, selector) => {\n\tconst map = targetCache.get(target);\n\tif (map) {\n\t\tmap.delete(selector);\n\t\tif (map.size === 0) {\n\t\t\ttargetCache.delete(target);\n\t\t}\n\t}\n};\n\nmodule.exports = (selector, options) => {\n\toptions = Object.assign({\n\t\ttarget: document\n\t}, options);\n\n\tif (targetCache.has(options.target) && targetCache.get(options.target).has(selector)) {\n\t\treturn targetCache.get(options.target).get(selector);\n\t}\n\n\tlet alreadyFound = false;\n\tconst promise = new PCancelable((resolve, reject, onCancel) => {\n\t\tlet raf;\n\t\tonCancel(() => {\n\t\t\tcancelAnimationFrame(raf);\n\t\t\tcleanCache(options.target, selector);\n\t\t});\n\n\t\t// Interval to keep checking for it to come into the DOM\n\t\t(function check() {\n\t\t\tconst el = options.target.querySelector(selector);\n\n\t\t\tif (el) {\n\t\t\t\tresolve(el);\n\t\t\t\talreadyFound = true;\n\t\t\t\tcleanCache(options.target, selector);\n\t\t\t} else {\n\t\t\t\traf = requestAnimationFrame(check);\n\t\t\t}\n\t\t})();\n\t});\n\n\t// The element might have been found in the first synchronous check\n\tif (!alreadyFound) {\n\t\tif (targetCache.has(options.target)) {\n\t\t\ttargetCache.get(options.target).set(selector, promise);\n\t\t} else {\n\t\t\ttargetCache.set(options.target, new Map([[selector, promise]]));\n\t\t}\n\t}\n\n\treturn promise;\n};\n\n\n//# sourceURL=webpack:///./node_modules/element-ready/index.js?");

/***/ }),

/***/ "./node_modules/p-cancelable/index.js":
/*!********************************************!*\
  !*** ./node_modules/p-cancelable/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nclass CancelError extends Error {\n\tconstructor() {\n\t\tsuper('Promise was canceled');\n\t\tthis.name = 'CancelError';\n\t}\n\n\tget isCanceled() {\n\t\treturn true;\n\t}\n}\n\nclass PCancelable {\n\tstatic fn(userFn) {\n\t\treturn function () {\n\t\t\tconst args = [].slice.apply(arguments);\n\t\t\treturn new PCancelable((resolve, reject, onCancel) => {\n\t\t\t\targs.push(onCancel);\n\t\t\t\tuserFn.apply(null, args).then(resolve, reject);\n\t\t\t});\n\t\t};\n\t}\n\n\tconstructor(executor) {\n\t\tthis._cancelHandlers = [];\n\t\tthis._isPending = true;\n\t\tthis._isCanceled = false;\n\n\t\tthis._promise = new Promise((resolve, reject) => {\n\t\t\tthis._reject = reject;\n\n\t\t\treturn executor(\n\t\t\t\tvalue => {\n\t\t\t\t\tthis._isPending = false;\n\t\t\t\t\tresolve(value);\n\t\t\t\t},\n\t\t\t\terror => {\n\t\t\t\t\tthis._isPending = false;\n\t\t\t\t\treject(error);\n\t\t\t\t},\n\t\t\t\thandler => {\n\t\t\t\t\tthis._cancelHandlers.push(handler);\n\t\t\t\t}\n\t\t\t);\n\t\t});\n\t}\n\n\tthen(onFulfilled, onRejected) {\n\t\treturn this._promise.then(onFulfilled, onRejected);\n\t}\n\n\tcatch(onRejected) {\n\t\treturn this._promise.catch(onRejected);\n\t}\n\n\tfinally(onFinally) {\n\t\treturn this._promise.finally(onFinally);\n\t}\n\n\tcancel() {\n\t\tif (!this._isPending || this._isCanceled) {\n\t\t\treturn;\n\t\t}\n\n\t\tif (this._cancelHandlers.length > 0) {\n\t\t\ttry {\n\t\t\t\tfor (const handler of this._cancelHandlers) {\n\t\t\t\t\thandler();\n\t\t\t\t}\n\t\t\t} catch (err) {\n\t\t\t\tthis._reject(err);\n\t\t\t}\n\t\t}\n\n\t\tthis._isCanceled = true;\n\t\tthis._reject(new CancelError());\n\t}\n\n\tget isCanceled() {\n\t\treturn this._isCanceled;\n\t}\n}\n\nObject.setPrototypeOf(PCancelable.prototype, Promise.prototype);\n\nmodule.exports = PCancelable;\nmodule.exports.CancelError = CancelError;\n\n\n//# sourceURL=webpack:///./node_modules/p-cancelable/index.js?");

/***/ }),

/***/ "./src/content.js":
/*!************************!*\
  !*** ./src/content.js ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib */ \"./src/lib/index.js\");\n\n\nasync function init() {\n  await Object(_lib__WEBPACK_IMPORTED_MODULE_0__[\"safeElementReady\"])('body');\n\n  Promise.all(\n    Object(_lib__WEBPACK_IMPORTED_MODULE_0__[\"getIssueIDs\"])().map(issueID =>\n      fetch(`https://www.drupal.org/api-d7/node.json?nid=${issueID}`).then(\n        res => res.json(),\n      ),\n    ),\n  )\n    .then(results => results.map(({ list: [node] }) => node))\n    .then(nodeData => {\n      const tableHeader = document.querySelector(\n        'table.project-issue thead tr',\n      );\n\n      const tableRows = Array.from(\n        document.querySelectorAll('table.project-issue tbody tr'),\n      );\n\n      tableHeader.insertCell(-1).innerHTML = 'Author';\n      tableHeader.insertCell(-1).innerHTML = 'Component';\n\n      nodeData.forEach(\n        ({ author, field_issue_component: fieldIssueComponent }, index) => {\n          const row = tableRows[index];\n          row.insertCell(-1).innerHTML = author.name;\n          row.insertCell(-1).innerHTML = fieldIssueComponent;\n        },\n      );\n    });\n}\n\ninit();\n\n\n//# sourceURL=webpack:///./src/content.js?");

/***/ }),

/***/ "./src/lib/index.js":
/*!**************************!*\
  !*** ./src/lib/index.js ***!
  \**************************/
/*! exports provided: getIssueIDs, safeElementReady */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getIssueIDs\", function() { return getIssueIDs; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"safeElementReady\", function() { return safeElementReady; });\n/* harmony import */ var element_ready__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! element-ready */ \"./node_modules/element-ready/index.js\");\n/* harmony import */ var element_ready__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(element_ready__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var dom_loaded__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dom-loaded */ \"./node_modules/dom-loaded/index.js\");\n/* harmony import */ var dom_loaded__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(dom_loaded__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\nconst getIssueIDs = () =>\n  Array.from(document.querySelectorAll('td.views-field-title a')).map(link =>\n    link\n      .getAttribute('href')\n      .split('/')\n      .pop(),\n  );\n\n/**\n * Automatically stops checking for an element to appear once the DOM is ready.\n */\nconst safeElementReady = selector => {\n  const waiting = element_ready__WEBPACK_IMPORTED_MODULE_0___default()(selector);\n\n  // Don't check ad-infinitum\n  dom_loaded__WEBPACK_IMPORTED_MODULE_1___default.a.then(() => requestAnimationFrame(() => waiting.cancel()));\n\n  // If cancelled, return null like a regular select() would\n  return waiting.catch(() => null);\n};\n\n\n//# sourceURL=webpack:///./src/lib/index.js?");

/***/ })

/******/ });