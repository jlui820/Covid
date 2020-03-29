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

/***/ "./src/circle.js":
/*!***********************!*\
  !*** ./src/circle.js ***!
  \***********************/
/*! exports provided: circle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "circle", function() { return circle; });
var circle = function circle() {
  var margin = {
    left: 100,
    right: 50,
    top: 10,
    bottom: 130
  };
  var width = 1600 - margin.left - margin.right,
      height = 800 - margin.top - margin.bottom;
  var flag = true;
  var t = d3.transition().duration(1000);
  var g = d3.select("#circle").append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + ", " + margin.top + ")");
  var xAxisGroup = g.append("g").attr("class", "x axis").attr("transform", "translate(0," + height + ")");
  var yAxisGroup = g.append("g").attr("class", "y axis"); // X Scale

  var x = d3.scaleBand().range([0, width]).padding(0.4); // Y Scale

  var y = d3.scaleLinear().range([height, 0]); // X Label 

  g.append("text").attr("y", height + 120).attr("x", width / 2).attr("font-size", "30px").attr("text-anchor", "middle").attr("fill", "white").text("States"); // Y Label

  var yLabel = g.append("text").attr("y", -60).attr("x", -(height / 2)).attr("font-size", "30px").attr("text-anchor", "middle").attr("transform", "rotate(-90)").attr("fill", "white").text("Cases");
  d3.json('https://corona.lmao.ninja/states').then(function (data) {
    data.forEach(function (d) {
      d.cases;
      d.state;
      d.deaths;
      d.todayCases;
      d.todayDeaths;
    });
    d3.interval(function () {
      update(data);
      flag = !flag;
    }, 2000);
    update(data);
  });

  var update = function update(data) {
    var value = flag ? "todayCases" : "todayDeaths";
    x.domain(data.map(function (d) {
      return d.state;
    }));
    y.domain([0, d3.max(data, function (d) {
      return d[value];
    })]); // X Axis

    var xAxisCall = d3.axisBottom(x);
    g.append("g").attr("class", "x axis").attr("transform", "translate(0, " + height + ")").call(xAxisCall).selectAll("text").attr("y", "10").attr("x", "-5").attr("font-size", "13px").attr("text-anchor", "end").attr("transform", "rotate(-40)"); //.transition(t).call(xAxisCall)
    // Y Axis

    var yAxisCall = d3.axisLeft(y).tickFormat(function (d) {
      return d;
    });
    yAxisGroup.transition(t).call(yAxisCall); // JOIN new data with old elements.

    var rects = g.selectAll("circle").data(data); // EXIT old elements not present in new data.

    rects.exit().attr('fill', 'blue').transition(t).attr('cy', y(0)).remove(); // ENTER new elements present in new data.

    rects.enter().append("circle").attr("fill", "white").attr('cy', y(0)).attr("cx", function (d) {
      return x(d.state) + x.bandwidth() / 2;
    }).attr("r", 7).merge(rects).transition(t).attr("cx", function (d) {
      return x(d.state) + +x.bandwidth() / 2;
    }).attr("cy", function (d) {
      return y(d[value]);
    });
    var label = flag ? "Today Cases" : "Today Deaths";
    yLabel.text(label);
  };
};

/***/ }),

/***/ "./src/graph.js":
/*!**********************!*\
  !*** ./src/graph.js ***!
  \**********************/
/*! exports provided: graph */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "graph", function() { return graph; });
var graph = function graph() {
  var margin = {
    left: 100,
    right: 50,
    top: 10,
    bottom: 130
  };
  var width = 1600 - margin.left - margin.right,
      height = 800 - margin.top - margin.bottom;
  var flag = true;
  var t = d3.transition().duration(1000);
  var g = d3.select("#graph").append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + ", " + margin.top + ")");
  var xAxisGroup = g.append("g").attr("class", "x axis").attr("transform", "translate(0," + height + ")");
  var yAxisGroup = g.append("g").attr("class", "y axis"); // X Scale

  var x = d3.scaleBand().range([0, width]).padding(0.4); // Y Scale

  var y = d3.scaleLinear().range([height, 0]); // X Label 

  g.append("text").attr("y", height + 120).attr("x", width / 2).attr("font-size", "30px").attr("text-anchor", "middle").attr("fill", "white").text("States"); // Y Label

  var yLabel = g.append("text").attr("y", -60).attr("x", -(height / 2)).attr("font-size", "30px").attr("text-anchor", "middle").attr("transform", "rotate(-90)").attr("fill", "white").text("Cases");
  d3.json('https://corona.lmao.ninja/states').then(function (data) {
    data.forEach(function (d) {
      d.cases;
      d.state;
      d.deaths;
    });
    d3.interval(function () {
      update(data);
      flag = !flag;
    }, 2000);
    update(data);
  });

  var update = function update(data) {
    var value = flag ? "cases" : "deaths";
    x.domain(data.map(function (d) {
      return d.state;
    }));
    y.domain([0, d3.max(data, function (d) {
      return d[value];
    })]); // X Axis

    var xAxisCall = d3.axisBottom(x);
    g.append("g").attr("class", "x axis").attr("transform", "translate(0, " + height + ")").call(xAxisCall).selectAll("text").attr("y", "10").attr("x", "-5").attr("font-size", "13px").attr("text-anchor", "end").attr("transform", "rotate(-40)"); // Y Axis

    var yAxisCall = d3.axisLeft(y).tickFormat(function (d) {
      return d;
    });
    yAxisGroup.transition(t).call(yAxisCall); // JOIN new data with old elements.

    var rects = g.selectAll("rect").data(data); // EXIT old elements not present in new data.

    rects.exit().attr('fill', 'blue').transition(t).attr('y', y(0)).attr('height', 0).remove();
    rects.enter().append("rect").attr("fill", "white").attr('y', y(0)).attr('height', 0).attr("x", function (d) {
      return x(d.state);
    }).attr("width", x.bandwidth).merge(rects).transition(t).attr("x", function (d) {
      return x(d.state);
    }).attr("width", x.bandwidth).attr("y", function (d) {
      return y(d[value]);
    }).attr("height", function (d) {
      return height - y(d[value]);
    });
    var label = flag ? "Cases" : "Deaths";
    yLabel.text(label);
  };
};

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _graph__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./graph */ "./src/graph.js");
/* harmony import */ var _circle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./circle */ "./src/circle.js");
// put charts in here?


document.addEventListener("DOMContentLoaded", function () {
  Object(_graph__WEBPACK_IMPORTED_MODULE_0__["graph"])();
  Object(_circle__WEBPACK_IMPORTED_MODULE_1__["circle"])();
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NpcmNsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZ3JhcGguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbImNpcmNsZSIsIm1hcmdpbiIsImxlZnQiLCJyaWdodCIsInRvcCIsImJvdHRvbSIsIndpZHRoIiwiaGVpZ2h0IiwiZmxhZyIsInQiLCJkMyIsInRyYW5zaXRpb24iLCJkdXJhdGlvbiIsImciLCJzZWxlY3QiLCJhcHBlbmQiLCJhdHRyIiwieEF4aXNHcm91cCIsInlBeGlzR3JvdXAiLCJ4Iiwic2NhbGVCYW5kIiwicmFuZ2UiLCJwYWRkaW5nIiwieSIsInNjYWxlTGluZWFyIiwidGV4dCIsInlMYWJlbCIsImpzb24iLCJ0aGVuIiwiZGF0YSIsImZvckVhY2giLCJkIiwiY2FzZXMiLCJzdGF0ZSIsImRlYXRocyIsInRvZGF5Q2FzZXMiLCJ0b2RheURlYXRocyIsImludGVydmFsIiwidXBkYXRlIiwidmFsdWUiLCJkb21haW4iLCJtYXAiLCJtYXgiLCJ4QXhpc0NhbGwiLCJheGlzQm90dG9tIiwiY2FsbCIsInNlbGVjdEFsbCIsInlBeGlzQ2FsbCIsImF4aXNMZWZ0IiwidGlja0Zvcm1hdCIsInJlY3RzIiwiZXhpdCIsInJlbW92ZSIsImVudGVyIiwiYmFuZHdpZHRoIiwibWVyZ2UiLCJsYWJlbCIsImdyYXBoIiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNB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QVdhakIsSUFYYixDQVdrQixPQVhsQixFQVcyQkcsQ0FBQyxDQUFDbUMsU0FYN0IsRUFZYXRDLElBWmIsQ0FZa0IsR0FabEIsRUFZdUIsVUFBQ2UsQ0FBRCxFQUFPO0FBQUUsYUFBT1IsQ0FBQyxDQUFDUSxDQUFDLENBQUNRLEtBQUQsQ0FBRixDQUFSO0FBQXFCLEtBWnJELEVBYWF2QixJQWJiLENBYWtCLFFBYmxCLEVBYTZCLFVBQUNlLENBQUQsRUFBTztBQUFDLGFBQU94QixNQUFNLEdBQUdnQixDQUFDLENBQUNRLENBQUMsQ0FBQ1EsS0FBRCxDQUFGLENBQWpCO0FBQTZCLEtBYmxFO0FBZUEsUUFBSWlCLEtBQUssR0FBR2hELElBQUksR0FBRyxPQUFILEdBQWEsUUFBN0I7QUFDQWtCLFVBQU0sQ0FBQ0QsSUFBUCxDQUFZK0IsS0FBWjtBQUVILEdBekRHO0FBMERQLENBOUhNLEM7Ozs7Ozs7Ozs7OztBQ0FQO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFDQTtBQUdBRSxRQUFRLENBQUNDLGdCQUFULENBQTBCLGtCQUExQixFQUE4QyxZQUFNO0FBQ2hERixzREFBSztBQUNMekQsd0RBQU07QUFDVCxDQUhELEUiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCJcbmV4cG9ydCBjb25zdCBjaXJjbGUgPSAoKSA9PiB7XG5cbiAgICBsZXQgbWFyZ2luID0ge2xlZnQ6IDEwMCwgcmlnaHQ6IDUwLCB0b3A6IDEwLCBib3R0b206IDEzMH07XG5cbiAgICBsZXQgd2lkdGggPSAxNjAwIC0gbWFyZ2luLmxlZnQgLSBtYXJnaW4ucmlnaHQsXG4gICAgICAgIGhlaWdodCA9IDgwMCAtIG1hcmdpbi50b3AgLSBtYXJnaW4uYm90dG9tO1xuXG4gICAgbGV0IGZsYWcgPSB0cnVlO1xuXG4gICAgbGV0IHQgPSBkMy50cmFuc2l0aW9uKCkuZHVyYXRpb24oMTAwMCk7XG5cbiAgICBsZXQgZyA9IGQzLnNlbGVjdChcIiNjaXJjbGVcIilcbiAgICAgICAgLmFwcGVuZChcInN2Z1wiKVxuICAgICAgICAuYXR0cihcIndpZHRoXCIsIHdpZHRoICsgbWFyZ2luLmxlZnQgKyBtYXJnaW4ucmlnaHQpXG4gICAgICAgIC5hdHRyKFwiaGVpZ2h0XCIsIGhlaWdodCArIG1hcmdpbi50b3AgKyBtYXJnaW4uYm90dG9tKVxuICAgICAgICAuYXBwZW5kKFwiZ1wiKVxuICAgICAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZShcIiArIG1hcmdpbi5sZWZ0ICsgXCIsIFwiICsgbWFyZ2luLnRvcCArIFwiKVwiKTtcblxuICAgIGxldCB4QXhpc0dyb3VwID0gZy5hcHBlbmQoXCJnXCIpXG4gICAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJ4IGF4aXNcIilcbiAgICAgICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGUoMCxcIiArIGhlaWdodCArIFwiKVwiKTtcblxuICAgIGxldCB5QXhpc0dyb3VwID0gZy5hcHBlbmQoXCJnXCIpXG4gICAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJ5IGF4aXNcIik7XG5cbiAgICAvLyBYIFNjYWxlXG4gICAgbGV0IHggPSBkMy5zY2FsZUJhbmQoKVxuICAgICAgICAucmFuZ2UoWzAsIHdpZHRoXSlcbiAgICAgICAgLnBhZGRpbmcoMC40KTtcblxuICAgIC8vIFkgU2NhbGVcbiAgICBsZXQgeSA9IGQzLnNjYWxlTGluZWFyKClcbiAgICAgICAgLnJhbmdlKFtoZWlnaHQsIDBdKTtcblxuICAgIC8vIFggTGFiZWwgXG4gICAgZy5hcHBlbmQoXCJ0ZXh0XCIpXG4gICAgICAgIC5hdHRyKFwieVwiLCBoZWlnaHQgKyAxMjApXG4gICAgICAgIC5hdHRyKFwieFwiLCB3aWR0aCAvIDIpXG4gICAgICAgIC5hdHRyKFwiZm9udC1zaXplXCIsIFwiMzBweFwiKVxuICAgICAgICAuYXR0cihcInRleHQtYW5jaG9yXCIsIFwibWlkZGxlXCIpXG4gICAgICAgIC5hdHRyKFwiZmlsbFwiLCBcIndoaXRlXCIpXG4gICAgICAgIC50ZXh0KFwiU3RhdGVzXCIpO1xuXG4gICAgLy8gWSBMYWJlbFxuICAgIGxldCB5TGFiZWwgPSBnLmFwcGVuZChcInRleHRcIilcbiAgICAgICAgLmF0dHIoXCJ5XCIsIC02MClcbiAgICAgICAgLmF0dHIoXCJ4XCIsIC0oaGVpZ2h0IC8gMikpXG4gICAgICAgIC5hdHRyKFwiZm9udC1zaXplXCIsIFwiMzBweFwiKVxuICAgICAgICAuYXR0cihcInRleHQtYW5jaG9yXCIsIFwibWlkZGxlXCIpXG4gICAgICAgIC5hdHRyKFwidHJhbnNmb3JtXCIsIFwicm90YXRlKC05MClcIilcbiAgICAgICAgLmF0dHIoXCJmaWxsXCIsIFwid2hpdGVcIilcbiAgICAgICAgLnRleHQoXCJDYXNlc1wiKTtcblxuICAgIGQzLmpzb24oJ2h0dHBzOi8vY29yb25hLmxtYW8ubmluamEvc3RhdGVzJykudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgICAgICBkYXRhLmZvckVhY2goZCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGQuY2FzZXM7XG4gICAgICAgICAgICAgICAgICAgIGQuc3RhdGU7XG4gICAgICAgICAgICAgICAgICAgIGQuZGVhdGhzXG4gICAgICAgICAgICAgICAgICAgIGQudG9kYXlDYXNlc1xuICAgICAgICAgICAgICAgICAgICBkLnRvZGF5RGVhdGhzXG4gICAgICAgICAgICAgICAgfSlcblxuXG4gICAgICAgIGQzLmludGVydmFsKCgpID0+IHtcbiAgICAgICAgICAgIHVwZGF0ZShkYXRhKVxuICAgICAgICAgICAgZmxhZyA9ICFmbGFnXG4gICAgICAgIH0sIDIwMDApO1xuICAgICAgICB1cGRhdGUoZGF0YSk7XG4gICAgfSk7XG5cbiAgICBsZXQgdXBkYXRlID0gKGRhdGEpID0+IHtcbiAgICAgICAgbGV0IHZhbHVlID0gZmxhZyA/IFwidG9kYXlDYXNlc1wiIDogXCJ0b2RheURlYXRoc1wiO1xuXG4gICAgICAgIHguZG9tYWluKGRhdGEubWFwKCAoZCkgPT4geyByZXR1cm4gZC5zdGF0ZSB9KSk7XG5cbiAgICAgICAgeS5kb21haW4oWzAsIGQzLm1heChkYXRhLCAgKGQpID0+IHsgcmV0dXJuIGRbdmFsdWVdfSldKVxuXG4gICAgICAgIC8vIFggQXhpc1xuICAgICAgICBsZXQgeEF4aXNDYWxsID0gZDMuYXhpc0JvdHRvbSh4KTtcbiAgICAgICAgZy5hcHBlbmQoXCJnXCIpXG4gICAgICAgICAgICAuYXR0cihcImNsYXNzXCIsIFwieCBheGlzXCIpXG4gICAgICAgICAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZSgwLCBcIiArIGhlaWdodCArIFwiKVwiKVxuICAgICAgICAgICAgLmNhbGwoeEF4aXNDYWxsKVxuICAgICAgICAgICAgLnNlbGVjdEFsbChcInRleHRcIilcbiAgICAgICAgICAgIC5hdHRyKFwieVwiLCBcIjEwXCIpXG4gICAgICAgICAgICAuYXR0cihcInhcIiwgXCItNVwiKVxuICAgICAgICAgICAgLmF0dHIoXCJmb250LXNpemVcIiwgXCIxM3B4XCIpXG4gICAgICAgICAgICAuYXR0cihcInRleHQtYW5jaG9yXCIsIFwiZW5kXCIpXG4gICAgICAgICAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBcInJvdGF0ZSgtNDApXCIpO1xuXG4gICAgICAgICAgICAvLy50cmFuc2l0aW9uKHQpLmNhbGwoeEF4aXNDYWxsKVxuXG4gICAgICAgIC8vIFkgQXhpc1xuICAgICAgICBsZXQgeUF4aXNDYWxsID0gZDMuYXhpc0xlZnQoeSlcbiAgICAgICAgICAgIC50aWNrRm9ybWF0KCAoZCkgPT4ge3JldHVybiBkO30pO1xuICAgICAgICB5QXhpc0dyb3VwLnRyYW5zaXRpb24odCkuY2FsbCh5QXhpc0NhbGwpO1xuXG4gICAgICAgIC8vIEpPSU4gbmV3IGRhdGEgd2l0aCBvbGQgZWxlbWVudHMuXG4gICAgICAgIGxldCByZWN0cyA9IGcuc2VsZWN0QWxsKFwiY2lyY2xlXCIpXG4gICAgICAgICAgICAuZGF0YShkYXRhKTtcblxuICAgICAgICAvLyBFWElUIG9sZCBlbGVtZW50cyBub3QgcHJlc2VudCBpbiBuZXcgZGF0YS5cbiAgICAgICAgcmVjdHMuZXhpdCgpXG4gICAgICAgICAgICAuYXR0cignZmlsbCcsICdibHVlJylcbiAgICAgICAgLnRyYW5zaXRpb24odClcbiAgICAgICAgICAgIC5hdHRyKCdjeScsIHkoMCkpXG4gICAgICAgICAgICAucmVtb3ZlKCk7XG5cbiAgICAgICAgLy8gRU5URVIgbmV3IGVsZW1lbnRzIHByZXNlbnQgaW4gbmV3IGRhdGEuXG4gICAgICAgIHJlY3RzLmVudGVyKClcbiAgICAgICAgICAgIC5hcHBlbmQoXCJjaXJjbGVcIilcbiAgICAgICAgICAgICAgICAuYXR0cihcImZpbGxcIiwgXCJ3aGl0ZVwiKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdjeScsIHkoMCkpXG4gICAgICAgICAgICAgICAgLmF0dHIoXCJjeFwiLCAoZCkgPT4geyByZXR1cm4geChkLnN0YXRlKSArIHguYmFuZHdpZHRoKCkgLyAyIH0pXG4gICAgICAgICAgICAgICAgLmF0dHIoXCJyXCIsIDcpXG5cbiAgICAgICAgICAgICAgICAubWVyZ2UocmVjdHMpXG4gICAgICAgICAgICAgICAgLnRyYW5zaXRpb24odClcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoXCJjeFwiLCAoZCkgPT4geyByZXR1cm4geChkLnN0YXRlKSArICsgeC5iYW5kd2lkdGgoKSAvIDIgfSlcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoXCJjeVwiLCAoZCkgPT4geyByZXR1cm4geShkW3ZhbHVlXSk7IH0pXG4gICAgICAgICAgICAgXG4gICAgICAgIGxldCBsYWJlbCA9IGZsYWcgPyBcIlRvZGF5IENhc2VzXCIgOiBcIlRvZGF5IERlYXRoc1wiO1xuICAgICAgICB5TGFiZWwudGV4dChsYWJlbCk7XG5cbiAgICB9XG59OyIsImV4cG9ydCBjb25zdCBncmFwaCA9ICgpID0+IHtcblxuICAgIGxldCBtYXJnaW4gPSB7bGVmdDogMTAwLCByaWdodDogNTAsIHRvcDogMTAsIGJvdHRvbTogMTMwfTtcblxuICAgIGxldCB3aWR0aCA9IDE2MDAgLSBtYXJnaW4ubGVmdCAtIG1hcmdpbi5yaWdodCxcbiAgICAgICAgaGVpZ2h0ID0gODAwIC0gbWFyZ2luLnRvcCAtIG1hcmdpbi5ib3R0b207XG5cbiAgICBsZXQgZmxhZyA9IHRydWU7XG5cbiAgICBsZXQgdCA9IGQzLnRyYW5zaXRpb24oKS5kdXJhdGlvbigxMDAwKTtcblxuICAgIGxldCBnID0gZDMuc2VsZWN0KFwiI2dyYXBoXCIpXG4gICAgICAgIC5hcHBlbmQoXCJzdmdcIilcbiAgICAgICAgLmF0dHIoXCJ3aWR0aFwiLCB3aWR0aCArIG1hcmdpbi5sZWZ0ICsgbWFyZ2luLnJpZ2h0KVxuICAgICAgICAuYXR0cihcImhlaWdodFwiLCBoZWlnaHQgKyBtYXJnaW4udG9wICsgbWFyZ2luLmJvdHRvbSlcbiAgICAgICAgLmFwcGVuZChcImdcIilcbiAgICAgICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGUoXCIgKyBtYXJnaW4ubGVmdCArIFwiLCBcIiArIG1hcmdpbi50b3AgKyBcIilcIik7XG5cbiAgICBsZXQgeEF4aXNHcm91cCA9IGcuYXBwZW5kKFwiZ1wiKVxuICAgICAgICAuYXR0cihcImNsYXNzXCIsIFwieCBheGlzXCIpXG4gICAgICAgIC5hdHRyKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlKDAsXCIgKyBoZWlnaHQgKyBcIilcIik7XG5cbiAgICBsZXQgeUF4aXNHcm91cCA9IGcuYXBwZW5kKFwiZ1wiKVxuICAgICAgICAuYXR0cihcImNsYXNzXCIsIFwieSBheGlzXCIpO1xuXG4gICAgLy8gWCBTY2FsZVxuICAgIGxldCB4ID0gZDMuc2NhbGVCYW5kKClcbiAgICAgICAgLnJhbmdlKFswLCB3aWR0aF0pXG4gICAgICAgIC5wYWRkaW5nKDAuNCk7XG5cbiAgICAvLyBZIFNjYWxlXG4gICAgbGV0IHkgPSBkMy5zY2FsZUxpbmVhcigpXG4gICAgICAgIC5yYW5nZShbaGVpZ2h0LCAwXSk7XG5cbiAgICAvLyBYIExhYmVsIFxuICAgIGcuYXBwZW5kKFwidGV4dFwiKVxuICAgICAgICAuYXR0cihcInlcIiwgaGVpZ2h0ICsgMTIwKVxuICAgICAgICAuYXR0cihcInhcIiwgd2lkdGggLyAyKVxuICAgICAgICAuYXR0cihcImZvbnQtc2l6ZVwiLCBcIjMwcHhcIilcbiAgICAgICAgLmF0dHIoXCJ0ZXh0LWFuY2hvclwiLCBcIm1pZGRsZVwiKVxuICAgICAgICAuYXR0cihcImZpbGxcIiwgXCJ3aGl0ZVwiKVxuICAgICAgICAudGV4dChcIlN0YXRlc1wiKTtcblxuICAgIC8vIFkgTGFiZWxcbiAgICBsZXQgeUxhYmVsID0gZy5hcHBlbmQoXCJ0ZXh0XCIpXG4gICAgICAgIC5hdHRyKFwieVwiLCAtNjApXG4gICAgICAgIC5hdHRyKFwieFwiLCAtKGhlaWdodCAvIDIpKVxuICAgICAgICAuYXR0cihcImZvbnQtc2l6ZVwiLCBcIjMwcHhcIilcbiAgICAgICAgLmF0dHIoXCJ0ZXh0LWFuY2hvclwiLCBcIm1pZGRsZVwiKVxuICAgICAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBcInJvdGF0ZSgtOTApXCIpXG4gICAgICAgIC5hdHRyKFwiZmlsbFwiLCBcIndoaXRlXCIpXG4gICAgICAgIC50ZXh0KFwiQ2FzZXNcIik7XG4gICAgICAgIFxuXG4gICAgICAgIGQzLmpzb24oJ2h0dHBzOi8vY29yb25hLmxtYW8ubmluamEvc3RhdGVzJykudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5mb3JFYWNoKGQgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZC5jYXNlcztcbiAgICAgICAgICAgICAgICAgICAgICAgIGQuc3RhdGU7XG4gICAgICAgICAgICAgICAgICAgICAgICBkLmRlYXRoc1xuICAgICAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICBkMy5pbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdXBkYXRlKGRhdGEpXG4gICAgICAgICAgICAgICAgZmxhZyA9ICFmbGFnXG4gICAgICAgICAgICB9LCAyMDAwKTtcbiAgICAgICAgICAgIHVwZGF0ZShkYXRhKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IHVwZGF0ZSA9IChkYXRhKSA9PiB7XG4gICAgICAgIGxldCB2YWx1ZSA9IGZsYWcgPyBcImNhc2VzXCIgOiBcImRlYXRoc1wiO1xuXG4gICAgICAgIHguZG9tYWluKGRhdGEubWFwKCAoZCkgPT4geyByZXR1cm4gZC5zdGF0ZSB9KSk7XG5cbiAgICAgICAgeS5kb21haW4oWzAsIGQzLm1heChkYXRhLCAgKGQpID0+IHsgcmV0dXJuIGRbdmFsdWVdfSldKVxuXG4gICAgICAgIC8vIFggQXhpc1xuICAgICAgICBsZXQgeEF4aXNDYWxsID0gZDMuYXhpc0JvdHRvbSh4KTtcbiAgICAgICAgZy5hcHBlbmQoXCJnXCIpXG4gICAgICAgICAgICAuYXR0cihcImNsYXNzXCIsIFwieCBheGlzXCIpXG4gICAgICAgICAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZSgwLCBcIiArIGhlaWdodCArIFwiKVwiKVxuICAgICAgICAgICAgLmNhbGwoeEF4aXNDYWxsKVxuICAgICAgICAgICAgLnNlbGVjdEFsbChcInRleHRcIilcbiAgICAgICAgICAgIC5hdHRyKFwieVwiLCBcIjEwXCIpXG4gICAgICAgICAgICAuYXR0cihcInhcIiwgXCItNVwiKVxuICAgICAgICAgICAgLmF0dHIoXCJmb250LXNpemVcIiwgXCIxM3B4XCIpXG4gICAgICAgICAgICAuYXR0cihcInRleHQtYW5jaG9yXCIsIFwiZW5kXCIpXG4gICAgICAgICAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBcInJvdGF0ZSgtNDApXCIpO1xuXG4gICAgICAgICAgICBcblxuICAgICAgICAvLyBZIEF4aXNcbiAgICAgICAgbGV0IHlBeGlzQ2FsbCA9IGQzLmF4aXNMZWZ0KHkpXG4gICAgICAgICAgICAudGlja0Zvcm1hdCggKGQpID0+IHtyZXR1cm4gZDt9KTtcbiAgICAgICAgeUF4aXNHcm91cC50cmFuc2l0aW9uKHQpLmNhbGwoeUF4aXNDYWxsKTtcblxuICAgICAgICAvLyBKT0lOIG5ldyBkYXRhIHdpdGggb2xkIGVsZW1lbnRzLlxuICAgICAgICBsZXQgcmVjdHMgPSBnLnNlbGVjdEFsbChcInJlY3RcIilcbiAgICAgICAgICAgIC5kYXRhKGRhdGEpO1xuXG4gICAgICAgIC8vIEVYSVQgb2xkIGVsZW1lbnRzIG5vdCBwcmVzZW50IGluIG5ldyBkYXRhLlxuICAgICAgICByZWN0cy5leGl0KClcbiAgICAgICAgICAgIC5hdHRyKCdmaWxsJywgJ2JsdWUnKVxuICAgICAgICAudHJhbnNpdGlvbih0KVxuICAgICAgICAgICAgLmF0dHIoJ3knLCB5KDApKVxuICAgICAgICAgICAgLmF0dHIoJ2hlaWdodCcsIDApXG4gICAgICAgICAgICAucmVtb3ZlKCk7XG5cbiAgICAgICAgcmVjdHMuZW50ZXIoKVxuICAgICAgICAgICAgLmFwcGVuZChcInJlY3RcIilcbiAgICAgICAgICAgICAgICAuYXR0cihcImZpbGxcIiwgXCJ3aGl0ZVwiKVxuICAgICAgICAgICAgICAgIC5hdHRyKCd5JywgeSgwKSlcbiAgICAgICAgICAgICAgICAuYXR0cignaGVpZ2h0JywgMClcbiAgICAgICAgICAgICAgICAuYXR0cihcInhcIiwgKGQpID0+IHsgcmV0dXJuIHgoZC5zdGF0ZSl9KVxuICAgICAgICAgICAgICAgIC5hdHRyKFwid2lkdGhcIiwgeC5iYW5kd2lkdGgpXG5cbiAgICAgICAgICAgICAgICAubWVyZ2UocmVjdHMpXG4gICAgICAgICAgICAgICAgLnRyYW5zaXRpb24odClcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoXCJ4XCIsIChkKSA9PiB7IHJldHVybiB4KGQuc3RhdGUpfSlcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoXCJ3aWR0aFwiLCB4LmJhbmR3aWR0aClcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoXCJ5XCIsIChkKSA9PiB7IHJldHVybiB5KGRbdmFsdWVdKTsgfSlcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoXCJoZWlnaHRcIiwgIChkKSA9PiB7cmV0dXJuIGhlaWdodCAtIHkoZFt2YWx1ZV0pO30pXG5cbiAgICAgICAgbGV0IGxhYmVsID0gZmxhZyA/IFwiQ2FzZXNcIiA6IFwiRGVhdGhzXCI7XG4gICAgICAgIHlMYWJlbC50ZXh0KGxhYmVsKTtcblxuICAgIH1cbn07IiwiLy8gcHV0IGNoYXJ0cyBpbiBoZXJlP1xuXG5pbXBvcnQgeyBncmFwaCB9IGZyb20gJy4vZ3JhcGgnO1xuaW1wb3J0IHsgY2lyY2xlIH0gZnJvbSAnLi9jaXJjbGUnO1xuXG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcbiAgICBncmFwaCgpO1xuICAgIGNpcmNsZSgpO1xufSk7XG4iXSwic291cmNlUm9vdCI6IiJ9