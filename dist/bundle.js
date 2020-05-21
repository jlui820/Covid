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
  var yAxisGroup = g.append("g").attr("class", "y axis");
  var x = d3.scaleBand().range([0, width]).padding(0.4);
  var y = d3.scaleLinear().range([height, 0]);
  g.append("text").attr("y", height + 120).attr("x", width / 2).attr("font-size", "30px").attr("text-anchor", "middle").attr("fill", "white").text("States");
  var yLabel = g.append("text").attr("y", -60).attr("x", -(height / 2)).attr("font-size", "30px").attr("text-anchor", "middle").attr("transform", "rotate(-90)").attr("fill", "white").text("Cases");
  var endpoint = d3.json('https://disease.sh/v2/states').then(function (data) {
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
    })]);
    var xAxisCall = d3.axisBottom(x);
    g.append("g").attr("class", "x axis").attr("transform", "translate(0, " + height + ")").call(xAxisCall).selectAll("text").attr("y", "10").attr("x", "-5").attr("font-size", "13px").attr("text-anchor", "end").attr("transform", "rotate(-40)"); //.transition(t).call(xAxisCall)

    var yAxisCall = d3.axisLeft(y).tickFormat(function (d) {
      return d;
    });
    yAxisGroup.transition(t).call(yAxisCall);
    var rects = g.selectAll("circle").data(data);
    rects.exit().attr('fill', 'blue').transition(t).attr('cy', y(0)).remove();
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
  var yAxisGroup = g.append("g").attr("class", "y axis");
  var x = d3.scaleBand().range([0, width]).padding(0.4);
  var y = d3.scaleLinear().range([height, 0]);
  g.append("text").attr("y", height + 120).attr("x", width / 2).attr("font-size", "30px").attr("text-anchor", "middle").attr("fill", "white").text("States");
  var yLabel = g.append("text").attr("y", -60).attr("x", -(height / 2)).attr("font-size", "30px").attr("text-anchor", "middle").attr("transform", "rotate(-90)").attr("fill", "white").text("Cases");
  d3.json('https://disease.sh/v2/states').then(function (data) {
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
    })]);
    var xAxisCall = d3.axisBottom(x);
    g.append("g").attr("class", "x axis").attr("transform", "translate(0, " + height + ")").call(xAxisCall).selectAll("text").attr("y", "10").attr("x", "-5").attr("font-size", "13px").attr("text-anchor", "end").attr("transform", "rotate(-40)");
    var yAxisCall = d3.axisLeft(y).tickFormat(function (d) {
      return d;
    });
    yAxisGroup.transition(t).call(yAxisCall);
    var rects = g.selectAll("rect").data(data);
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

 // import { bubble } from './line'

document.addEventListener("DOMContentLoaded", function () {
  Object(_graph__WEBPACK_IMPORTED_MODULE_0__["graph"])();
  Object(_circle__WEBPACK_IMPORTED_MODULE_1__["circle"])(); // bubble();
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NpcmNsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZ3JhcGguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbImNpcmNsZSIsIm1hcmdpbiIsImxlZnQiLCJyaWdodCIsInRvcCIsImJvdHRvbSIsIndpZHRoIiwiaGVpZ2h0IiwiZmxhZyIsInQiLCJkMyIsInRyYW5zaXRpb24iLCJkdXJhdGlvbiIsImciLCJzZWxlY3QiLCJhcHBlbmQiLCJhdHRyIiwieEF4aXNHcm91cCIsInlBeGlzR3JvdXAiLCJ4Iiwic2NhbGVCYW5kIiwicmFuZ2UiLCJwYWRkaW5nIiwieSIsInNjYWxlTGluZWFyIiwidGV4dCIsInlMYWJlbCIsImVuZHBvaW50IiwianNvbiIsInRoZW4iLCJkYXRhIiwiZm9yRWFjaCIsImQiLCJjYXNlcyIsInN0YXRlIiwiZGVhdGhzIiwidG9kYXlDYXNlcyIsInRvZGF5RGVhdGhzIiwiaW50ZXJ2YWwiLCJ1cGRhdGUiLCJ2YWx1ZSIsImRvbWFpbiIsIm1hcCIsIm1heCIsInhBeGlzQ2FsbCIsImF4aXNCb3R0b20iLCJjYWxsIiwic2VsZWN0QWxsIiwieUF4aXNDYWxsIiwiYXhpc0xlZnQiLCJ0aWNrRm9ybWF0IiwicmVjdHMiLCJleGl0IiwicmVtb3ZlIiwiZW50ZXIiLCJiYW5kd2lkdGgiLCJtZXJnZSIsImxhYmVsIiwiZ3JhcGgiLCJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFF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O0FBQUMsYUFBT3pCLE1BQU0sR0FBR2dCLENBQUMsQ0FBQ1MsQ0FBQyxDQUFDUSxLQUFELENBQUYsQ0FBakI7QUFBNkIsS0FibEU7QUFlQSxRQUFJaUIsS0FBSyxHQUFHakQsSUFBSSxHQUFHLE9BQUgsR0FBYSxRQUE3QjtBQUNBa0IsVUFBTSxDQUFDRCxJQUFQLENBQVlnQyxLQUFaO0FBRUgsR0F2REc7QUF3RFAsQ0F6SE0sQzs7Ozs7Ozs7Ozs7O0FDQVA7QUFBQTtBQUFBO0FBQUE7Q0FFQTs7QUFFQUUsUUFBUSxDQUFDQyxnQkFBVCxDQUEwQixrQkFBMUIsRUFBOEMsWUFBTTtBQUNoREYsc0RBQUs7QUFDTDFELHdEQUFNLEdBRjBDLENBR2hEO0FBQ0gsQ0FKRCxFIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiXG5leHBvcnQgY29uc3QgY2lyY2xlID0gKCkgPT4ge1xuXG4gICAgbGV0IG1hcmdpbiA9IHtsZWZ0OiAxMDAsIHJpZ2h0OiA1MCwgdG9wOiAxMCwgYm90dG9tOiAxMzB9O1xuXG4gICAgbGV0IHdpZHRoID0gMTYwMCAtIG1hcmdpbi5sZWZ0IC0gbWFyZ2luLnJpZ2h0LFxuICAgICAgICBoZWlnaHQgPSA4MDAgLSBtYXJnaW4udG9wIC0gbWFyZ2luLmJvdHRvbTtcblxuICAgIGxldCBmbGFnID0gdHJ1ZTtcblxuICAgIGxldCB0ID0gZDMudHJhbnNpdGlvbigpLmR1cmF0aW9uKDEwMDApO1xuXG4gICAgbGV0IGcgPSBkMy5zZWxlY3QoXCIjY2lyY2xlXCIpXG4gICAgICAgIC5hcHBlbmQoXCJzdmdcIilcbiAgICAgICAgLmF0dHIoXCJ3aWR0aFwiLCB3aWR0aCArIG1hcmdpbi5sZWZ0ICsgbWFyZ2luLnJpZ2h0KVxuICAgICAgICAuYXR0cihcImhlaWdodFwiLCBoZWlnaHQgKyBtYXJnaW4udG9wICsgbWFyZ2luLmJvdHRvbSlcbiAgICAgICAgLmFwcGVuZChcImdcIilcbiAgICAgICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGUoXCIgKyBtYXJnaW4ubGVmdCArIFwiLCBcIiArIG1hcmdpbi50b3AgKyBcIilcIik7XG5cbiAgICBsZXQgeEF4aXNHcm91cCA9IGcuYXBwZW5kKFwiZ1wiKVxuICAgICAgICAuYXR0cihcImNsYXNzXCIsIFwieCBheGlzXCIpXG4gICAgICAgIC5hdHRyKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlKDAsXCIgKyBoZWlnaHQgKyBcIilcIik7XG5cbiAgICBsZXQgeUF4aXNHcm91cCA9IGcuYXBwZW5kKFwiZ1wiKVxuICAgICAgICAuYXR0cihcImNsYXNzXCIsIFwieSBheGlzXCIpO1xuXG4gICAgbGV0IHggPSBkMy5zY2FsZUJhbmQoKVxuICAgICAgICAucmFuZ2UoWzAsIHdpZHRoXSlcbiAgICAgICAgLnBhZGRpbmcoMC40KTtcblxuICAgIGxldCB5ID0gZDMuc2NhbGVMaW5lYXIoKVxuICAgICAgICAucmFuZ2UoW2hlaWdodCwgMF0pO1xuXG4gICAgZy5hcHBlbmQoXCJ0ZXh0XCIpXG4gICAgICAgIC5hdHRyKFwieVwiLCBoZWlnaHQgKyAxMjApXG4gICAgICAgIC5hdHRyKFwieFwiLCB3aWR0aCAvIDIpXG4gICAgICAgIC5hdHRyKFwiZm9udC1zaXplXCIsIFwiMzBweFwiKVxuICAgICAgICAuYXR0cihcInRleHQtYW5jaG9yXCIsIFwibWlkZGxlXCIpXG4gICAgICAgIC5hdHRyKFwiZmlsbFwiLCBcIndoaXRlXCIpXG4gICAgICAgIC50ZXh0KFwiU3RhdGVzXCIpO1xuXG4gICAgbGV0IHlMYWJlbCA9IGcuYXBwZW5kKFwidGV4dFwiKVxuICAgICAgICAuYXR0cihcInlcIiwgLTYwKVxuICAgICAgICAuYXR0cihcInhcIiwgLShoZWlnaHQgLyAyKSlcbiAgICAgICAgLmF0dHIoXCJmb250LXNpemVcIiwgXCIzMHB4XCIpXG4gICAgICAgIC5hdHRyKFwidGV4dC1hbmNob3JcIiwgXCJtaWRkbGVcIilcbiAgICAgICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgXCJyb3RhdGUoLTkwKVwiKVxuICAgICAgICAuYXR0cihcImZpbGxcIiwgXCJ3aGl0ZVwiKVxuICAgICAgICAudGV4dChcIkNhc2VzXCIpOyBcbiAgICAgICBcbiAgICBjb25zdCBlbmRwb2ludCA9ICAgICAgICAgXG5cbiAgICBkMy5qc29uKCdodHRwczovL2Rpc2Vhc2Uuc2gvdjIvc3RhdGVzJykudGhlbihkYXRhID0+IHtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgZGF0YS5mb3JFYWNoKGQgPT4ge1xuICAgICAgICAgICAgICAgICAgICBkLmNhc2VzO1xuICAgICAgICAgICAgICAgICAgICBkLnN0YXRlO1xuICAgICAgICAgICAgICAgICAgICBkLmRlYXRoc1xuICAgICAgICAgICAgICAgICAgICBkLnRvZGF5Q2FzZXNcbiAgICAgICAgICAgICAgICAgICAgZC50b2RheURlYXRoc1xuICAgICAgICAgICAgICAgIH0pXG5cblxuICAgICAgICBkMy5pbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgICB1cGRhdGUoZGF0YSlcbiAgICAgICAgICAgIGZsYWcgPSAhZmxhZ1xuICAgICAgICB9LCAyMDAwKTtcbiAgICAgICAgdXBkYXRlKGRhdGEpO1xuICAgIH0pO1xuXG4gICAgbGV0IHVwZGF0ZSA9IChkYXRhKSA9PiB7XG4gICAgICAgIGxldCB2YWx1ZSA9IGZsYWcgPyBcInRvZGF5Q2FzZXNcIiA6IFwidG9kYXlEZWF0aHNcIjtcblxuICAgICAgICB4LmRvbWFpbihkYXRhLm1hcCggKGQpID0+IHsgcmV0dXJuIGQuc3RhdGUgfSkpO1xuXG4gICAgICAgIHkuZG9tYWluKFswLCBkMy5tYXgoZGF0YSwgIChkKSA9PiB7IHJldHVybiBkW3ZhbHVlXX0pXSlcblxuICAgICAgICBsZXQgeEF4aXNDYWxsID0gZDMuYXhpc0JvdHRvbSh4KTtcbiAgICAgICAgZy5hcHBlbmQoXCJnXCIpXG4gICAgICAgICAgICAuYXR0cihcImNsYXNzXCIsIFwieCBheGlzXCIpXG4gICAgICAgICAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZSgwLCBcIiArIGhlaWdodCArIFwiKVwiKVxuICAgICAgICAgICAgLmNhbGwoeEF4aXNDYWxsKVxuICAgICAgICAgICAgLnNlbGVjdEFsbChcInRleHRcIilcbiAgICAgICAgICAgIC5hdHRyKFwieVwiLCBcIjEwXCIpXG4gICAgICAgICAgICAuYXR0cihcInhcIiwgXCItNVwiKVxuICAgICAgICAgICAgLmF0dHIoXCJmb250LXNpemVcIiwgXCIxM3B4XCIpXG4gICAgICAgICAgICAuYXR0cihcInRleHQtYW5jaG9yXCIsIFwiZW5kXCIpXG4gICAgICAgICAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBcInJvdGF0ZSgtNDApXCIpO1xuXG4gICAgICAgICAgICAvLy50cmFuc2l0aW9uKHQpLmNhbGwoeEF4aXNDYWxsKVxuXG4gICAgICAgIGxldCB5QXhpc0NhbGwgPSBkMy5heGlzTGVmdCh5KVxuICAgICAgICAgICAgLnRpY2tGb3JtYXQoIChkKSA9PiB7cmV0dXJuIGQ7fSk7XG4gICAgICAgIHlBeGlzR3JvdXAudHJhbnNpdGlvbih0KS5jYWxsKHlBeGlzQ2FsbCk7XG5cbiAgICAgICAgbGV0IHJlY3RzID0gZy5zZWxlY3RBbGwoXCJjaXJjbGVcIilcbiAgICAgICAgICAgIC5kYXRhKGRhdGEpO1xuXG4gICAgICAgIHJlY3RzLmV4aXQoKVxuICAgICAgICAgICAgLmF0dHIoJ2ZpbGwnLCAnYmx1ZScpXG4gICAgICAgIC50cmFuc2l0aW9uKHQpXG4gICAgICAgICAgICAuYXR0cignY3knLCB5KDApKVxuICAgICAgICAgICAgLnJlbW92ZSgpO1xuXG4gICAgICAgIHJlY3RzLmVudGVyKClcbiAgICAgICAgICAgIC5hcHBlbmQoXCJjaXJjbGVcIilcbiAgICAgICAgICAgICAgICAuYXR0cihcImZpbGxcIiwgXCJ3aGl0ZVwiKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdjeScsIHkoMCkpXG4gICAgICAgICAgICAgICAgLmF0dHIoXCJjeFwiLCAoZCkgPT4geyByZXR1cm4geChkLnN0YXRlKSArIHguYmFuZHdpZHRoKCkgLyAyIH0pXG4gICAgICAgICAgICAgICAgLmF0dHIoXCJyXCIsIDcpXG5cbiAgICAgICAgICAgICAgICAubWVyZ2UocmVjdHMpXG4gICAgICAgICAgICAgICAgLnRyYW5zaXRpb24odClcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoXCJjeFwiLCAoZCkgPT4geyByZXR1cm4geChkLnN0YXRlKSArICsgeC5iYW5kd2lkdGgoKSAvIDIgfSlcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoXCJjeVwiLCAoZCkgPT4geyByZXR1cm4geShkW3ZhbHVlXSk7IH0pXG4gICAgICAgICAgICAgXG4gICAgICAgIGxldCBsYWJlbCA9IGZsYWcgPyBcIlRvZGF5IENhc2VzXCIgOiBcIlRvZGF5IERlYXRoc1wiO1xuICAgICAgICB5TGFiZWwudGV4dChsYWJlbCk7XG5cbiAgICB9XG4gICAgXG59OyIsImV4cG9ydCBjb25zdCBncmFwaCA9ICgpID0+IHtcblxuICAgIGxldCBtYXJnaW4gPSB7bGVmdDogMTAwLCByaWdodDogNTAsIHRvcDogMTAsIGJvdHRvbTogMTMwfTtcblxuICAgIGxldCB3aWR0aCA9IDE2MDAgLSBtYXJnaW4ubGVmdCAtIG1hcmdpbi5yaWdodCxcbiAgICAgICAgaGVpZ2h0ID0gODAwIC0gbWFyZ2luLnRvcCAtIG1hcmdpbi5ib3R0b207XG5cbiAgICBsZXQgZmxhZyA9IHRydWU7XG5cbiAgICBsZXQgdCA9IGQzLnRyYW5zaXRpb24oKS5kdXJhdGlvbigxMDAwKTtcblxuICAgIGxldCBnID0gZDMuc2VsZWN0KFwiI2dyYXBoXCIpXG4gICAgICAgIC5hcHBlbmQoXCJzdmdcIilcbiAgICAgICAgLmF0dHIoXCJ3aWR0aFwiLCB3aWR0aCArIG1hcmdpbi5sZWZ0ICsgbWFyZ2luLnJpZ2h0KVxuICAgICAgICAuYXR0cihcImhlaWdodFwiLCBoZWlnaHQgKyBtYXJnaW4udG9wICsgbWFyZ2luLmJvdHRvbSlcbiAgICAgICAgLmFwcGVuZChcImdcIilcbiAgICAgICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGUoXCIgKyBtYXJnaW4ubGVmdCArIFwiLCBcIiArIG1hcmdpbi50b3AgKyBcIilcIik7XG5cbiAgICBsZXQgeEF4aXNHcm91cCA9IGcuYXBwZW5kKFwiZ1wiKVxuICAgICAgICAuYXR0cihcImNsYXNzXCIsIFwieCBheGlzXCIpXG4gICAgICAgIC5hdHRyKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlKDAsXCIgKyBoZWlnaHQgKyBcIilcIik7XG5cbiAgICBsZXQgeUF4aXNHcm91cCA9IGcuYXBwZW5kKFwiZ1wiKVxuICAgICAgICAuYXR0cihcImNsYXNzXCIsIFwieSBheGlzXCIpO1xuXG4gICAgbGV0IHggPSBkMy5zY2FsZUJhbmQoKVxuICAgICAgICAucmFuZ2UoWzAsIHdpZHRoXSlcbiAgICAgICAgLnBhZGRpbmcoMC40KTtcblxuXG4gICAgbGV0IHkgPSBkMy5zY2FsZUxpbmVhcigpXG4gICAgICAgIC5yYW5nZShbaGVpZ2h0LCAwXSk7XG5cbiAgICBnLmFwcGVuZChcInRleHRcIilcbiAgICAgICAgLmF0dHIoXCJ5XCIsIGhlaWdodCArIDEyMClcbiAgICAgICAgLmF0dHIoXCJ4XCIsIHdpZHRoIC8gMilcbiAgICAgICAgLmF0dHIoXCJmb250LXNpemVcIiwgXCIzMHB4XCIpXG4gICAgICAgIC5hdHRyKFwidGV4dC1hbmNob3JcIiwgXCJtaWRkbGVcIilcbiAgICAgICAgLmF0dHIoXCJmaWxsXCIsIFwid2hpdGVcIilcbiAgICAgICAgLnRleHQoXCJTdGF0ZXNcIik7XG5cbiAgICBsZXQgeUxhYmVsID0gZy5hcHBlbmQoXCJ0ZXh0XCIpXG4gICAgICAgIC5hdHRyKFwieVwiLCAtNjApXG4gICAgICAgIC5hdHRyKFwieFwiLCAtKGhlaWdodCAvIDIpKVxuICAgICAgICAuYXR0cihcImZvbnQtc2l6ZVwiLCBcIjMwcHhcIilcbiAgICAgICAgLmF0dHIoXCJ0ZXh0LWFuY2hvclwiLCBcIm1pZGRsZVwiKVxuICAgICAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBcInJvdGF0ZSgtOTApXCIpXG4gICAgICAgIC5hdHRyKFwiZmlsbFwiLCBcIndoaXRlXCIpXG4gICAgICAgIC50ZXh0KFwiQ2FzZXNcIik7XG4gICAgICAgIFxuXG4gICAgICAgIGQzLmpzb24oJ2h0dHBzOi8vZGlzZWFzZS5zaC92Mi9zdGF0ZXMnKS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgICAgICBkYXRhLmZvckVhY2goZCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkLmNhc2VzO1xuICAgICAgICAgICAgICAgICAgICAgICAgZC5zdGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGQuZGVhdGhzXG4gICAgICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIGQzLmludGVydmFsKCgpID0+IHtcbiAgICAgICAgICAgICAgICB1cGRhdGUoZGF0YSlcbiAgICAgICAgICAgICAgICBmbGFnID0gIWZsYWdcbiAgICAgICAgICAgIH0sIDIwMDApO1xuICAgICAgICAgICAgdXBkYXRlKGRhdGEpO1xuICAgICAgICB9KTtcblxuICAgICAgICBsZXQgdXBkYXRlID0gKGRhdGEpID0+IHtcbiAgICAgICAgbGV0IHZhbHVlID0gZmxhZyA/IFwiY2FzZXNcIiA6IFwiZGVhdGhzXCI7XG5cbiAgICAgICAgeC5kb21haW4oZGF0YS5tYXAoIChkKSA9PiB7IHJldHVybiBkLnN0YXRlIH0pKTtcblxuICAgICAgICB5LmRvbWFpbihbMCwgZDMubWF4KGRhdGEsICAoZCkgPT4geyByZXR1cm4gZFt2YWx1ZV19KV0pXG5cblxuICAgICAgICBsZXQgeEF4aXNDYWxsID0gZDMuYXhpc0JvdHRvbSh4KTtcbiAgICAgICAgZy5hcHBlbmQoXCJnXCIpXG4gICAgICAgICAgICAuYXR0cihcImNsYXNzXCIsIFwieCBheGlzXCIpXG4gICAgICAgICAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZSgwLCBcIiArIGhlaWdodCArIFwiKVwiKVxuICAgICAgICAgICAgLmNhbGwoeEF4aXNDYWxsKVxuICAgICAgICAgICAgLnNlbGVjdEFsbChcInRleHRcIilcbiAgICAgICAgICAgIC5hdHRyKFwieVwiLCBcIjEwXCIpXG4gICAgICAgICAgICAuYXR0cihcInhcIiwgXCItNVwiKVxuICAgICAgICAgICAgLmF0dHIoXCJmb250LXNpemVcIiwgXCIxM3B4XCIpXG4gICAgICAgICAgICAuYXR0cihcInRleHQtYW5jaG9yXCIsIFwiZW5kXCIpXG4gICAgICAgICAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBcInJvdGF0ZSgtNDApXCIpO1xuXG4gICAgICAgICAgICBcbiAgICAgICAgbGV0IHlBeGlzQ2FsbCA9IGQzLmF4aXNMZWZ0KHkpXG4gICAgICAgICAgICAudGlja0Zvcm1hdCggKGQpID0+IHtyZXR1cm4gZDt9KTtcbiAgICAgICAgeUF4aXNHcm91cC50cmFuc2l0aW9uKHQpLmNhbGwoeUF4aXNDYWxsKTtcblxuXG4gICAgICAgIGxldCByZWN0cyA9IGcuc2VsZWN0QWxsKFwicmVjdFwiKVxuICAgICAgICAgICAgLmRhdGEoZGF0YSk7XG5cbiAgIFxuICAgICAgICByZWN0cy5leGl0KClcbiAgICAgICAgICAgIC5hdHRyKCdmaWxsJywgJ2JsdWUnKVxuICAgICAgICAudHJhbnNpdGlvbih0KVxuICAgICAgICAgICAgLmF0dHIoJ3knLCB5KDApKVxuICAgICAgICAgICAgLmF0dHIoJ2hlaWdodCcsIDApXG4gICAgICAgICAgICAucmVtb3ZlKCk7XG5cbiAgICAgICAgcmVjdHMuZW50ZXIoKVxuICAgICAgICAgICAgLmFwcGVuZChcInJlY3RcIilcbiAgICAgICAgICAgICAgICAuYXR0cihcImZpbGxcIiwgXCJ3aGl0ZVwiKVxuICAgICAgICAgICAgICAgIC5hdHRyKCd5JywgeSgwKSlcbiAgICAgICAgICAgICAgICAuYXR0cignaGVpZ2h0JywgMClcbiAgICAgICAgICAgICAgICAuYXR0cihcInhcIiwgKGQpID0+IHsgcmV0dXJuIHgoZC5zdGF0ZSl9KVxuICAgICAgICAgICAgICAgIC5hdHRyKFwid2lkdGhcIiwgeC5iYW5kd2lkdGgpXG5cbiAgICAgICAgICAgICAgICAubWVyZ2UocmVjdHMpXG4gICAgICAgICAgICAgICAgLnRyYW5zaXRpb24odClcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoXCJ4XCIsIChkKSA9PiB7IHJldHVybiB4KGQuc3RhdGUpfSlcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoXCJ3aWR0aFwiLCB4LmJhbmR3aWR0aClcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoXCJ5XCIsIChkKSA9PiB7IHJldHVybiB5KGRbdmFsdWVdKTsgfSlcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoXCJoZWlnaHRcIiwgIChkKSA9PiB7cmV0dXJuIGhlaWdodCAtIHkoZFt2YWx1ZV0pO30pXG5cbiAgICAgICAgbGV0IGxhYmVsID0gZmxhZyA/IFwiQ2FzZXNcIiA6IFwiRGVhdGhzXCI7XG4gICAgICAgIHlMYWJlbC50ZXh0KGxhYmVsKTtcblxuICAgIH1cbn07IiwiaW1wb3J0IHsgZ3JhcGggfSBmcm9tICcuL2dyYXBoJztcbmltcG9ydCB7IGNpcmNsZSB9IGZyb20gJy4vY2lyY2xlJztcbi8vIGltcG9ydCB7IGJ1YmJsZSB9IGZyb20gJy4vbGluZSdcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xuICAgIGdyYXBoKCk7XG4gICAgY2lyY2xlKCk7XG4gICAgLy8gYnViYmxlKCk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiIn0=