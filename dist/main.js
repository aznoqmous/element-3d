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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/element-3d.js":
/*!***************************!*\
  !*** ./src/element-3d.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Element3d; });\nclass Element3d {\r\n\r\n    constructor(element, options) {\r\n        this.target = element\r\n\r\n        this.options = Object.assign({\r\n            speed: 1,\r\n            perspective: 2000,\r\n            maxSpeed: 0.5,\r\n            parent: null\r\n        }, options)\r\n\r\n        this.parentElement = (this.options.parent) ? this.options.parent : element.parentElement\r\n\r\n        this.isLooping = false\r\n\r\n        this.currentRotation = {\r\n            x: null,\r\n            y: null\r\n        }\r\n\r\n        this.bind()\r\n    }\r\n\r\n    bind(){\r\n        this.parentElement.addEventListener('mouseenter', this.mouseEnter.bind(this))\r\n        this.parentElement.addEventListener('mouseleave', this.mouseLeave.bind(this))\r\n        this.parentElement.addEventListener('mousemove', this.mouseMove.bind(this))\r\n    }\r\n\r\n    mouseEnter(event){\r\n        this.targetRotation = this.getRotation(event.pageX, event.pageY)\r\n        this.start()\r\n    }\r\n\r\n    mouseLeave(event){\r\n        this.targetRotation = {x: 0, y: 0}\r\n        this.start()\r\n    }\r\n\r\n    mouseMove(event){\r\n        this.targetRotation = this.getRotation(event.pageX, event.pageY)\r\n        this.start()\r\n    }\r\n\r\n    start(){\r\n        if(this.isLooping) return;\r\n        this.isLooping = true\r\n        this.loop()\r\n    }\r\n\r\n    loop(){\r\n\r\n        let tx = this.targetRotation.x - this.currentRotation.x\r\n        let ty = this.targetRotation.y - this.currentRotation.y\r\n\r\n        let abstot = Math.abs(tx) + Math.abs(ty)\r\n\r\n        if(abstot > this.options.maxSpeed || abstot > this.options.maxSpeed) {\r\n            tx = tx / abstot * this.options.maxSpeed\r\n            ty = ty / abstot * this.options.maxSpeed\r\n        }\r\n\r\n        if( abstot < 1/1000 ) this.isLooping = false;\r\n\r\n        this.currentRotation.x = this.currentRotation.x + tx * this.options.speed / 10\r\n        this.currentRotation.y = this.currentRotation.y + ty * this.options.speed / 10\r\n        this.target.style.transform = this.getTransform(this.currentRotation.x, this.currentRotation.y)\r\n\r\n        if(this.isLooping) requestAnimationFrame(this.loop.bind(this))\r\n    }\r\n\r\n    getTransform(x, y){\r\n        let rotationX = -y * 360 / 10,\r\n        rotationY = x * 360 / 10\r\n        return `perspective(${this.options.perspective}px) rotateX(${rotationX}deg) rotateY(${rotationY}deg)`\r\n    }\r\n\r\n    // x, y = cursor position inside this.parentElement\r\n    getRotation(x, y){\r\n        let rect = this.parentElement.getBoundingClientRect()\r\n        x = (x - rect.x) / rect.width - 1 / 2\r\n        y = (y - window.scrollY - rect.y) / rect.height - 1 / 2\r\n        return {x, y}\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./src/element-3d.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _element_3d__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./element-3d */ \"./src/element-3d.js\");\n\r\n\r\ndocument.addEventListener('DOMContentLoaded', ()=>{\r\n  let els = [...document.querySelectorAll('.element')]\r\n  els.map(el => new _element_3d__WEBPACK_IMPORTED_MODULE_0__[\"default\"](el))\r\n})\r\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });