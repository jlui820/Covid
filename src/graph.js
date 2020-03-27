// let margin = { left: 100, right: 50, top: 10, bottom: 130 };

// let width = 1700 - margin.left - margin.right,
//     height = 900 - margin.top - margin.bottom;

// let flag = true;

// // let t = d3.transition().duration(3000)

// let g = d3.select("#graph")
//     .append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//     .append("g")
//     .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

// let xAxisGroup = g.append('g')
//     .attr('class', 'x axis')
//     .attr('transform', 'tanslate(0,' + height +')')

// let yAxisGroup = g.append("g")
//     .attr("class", "y-axis");

// let x = d3.scaleBand()
//     .range([0, width])
//     .padding(0.2);

// // Y Scale
// let y = d3.scaleLinear()
//     .range([height, 0]);

// // X Label
// g.append("text")
//     .attr("y", height + 50)
//     .attr("x", width / 2)
//     .attr("font-size", "20px")
//     .attr("text-anchor", "middle")
//     .attr("fill", "white")
//     .text("States");

// // Y Label
// let yLabel = g.append("text")
//     .attr("y", -60)
//     .attr("x", -(height / 2))
//     .attr("font-size", "20px")
//     .attr("text-anchor", "middle")
//     .attr("transform", "rotate(-90)")
//     .attr("fill", "white")
//     .text("Cases");
    

// d3.json('https://corona.lmao.ninja/states')
//     .then(data => {
//         data.forEach(d => {
//             d.cases;
//             d.state;
//             d.deaths
//         })

//         console.log(data)
    

//     d3.interval(function () {
//         update(data)
//         flag = !flag
//     }, 1000);
    
//     update(data);
//  })

//  function update(data) {
//     let value = flag ? "cases" : "deaths";

//     x.domain(data.map(function (d) {return d.state}));
//     y.domain([0, d3.max(data, function (d) { return d[value]})])

//     let xAxisCall = d3.axisBottom(x);
//     xAxisGroup.call(xAxisCall);
//     // g.append("g")
//     // xAxisGroup.transition(t).call(xAxisCall)
//     //     .attr("class", "x axis")
//     //     .attr("transform", "translate(0, " + height + ")")
//     //     .call(xAxisCall)
//     //     .selectAll("text")
//     //     .attr("y", "10")
//     //     .attr("x", "-5")
//     //     .attr("text-anchor", "end")
//     //     .attr("transform", "rotate(-70)");


//     // Y Axis
//     let yAxisCall = d3.axisLeft(y)
//         .tickFormat(function (d) { return d; });
//         yAxisGroup.call(yAxisCall);
//     // g.append("g")
//     //     .attr("class", "y axis")
//     //     .call(yAxisCall);
    

//     // Bars
//     let rects = g.selectAll("rect")
//         .data(data)

//     rects.exit().remove();

//     // rects
//     //     .attr("y", function(d){ return y(d.revenue); })
//     //     .attr("x", function(d){ return x(d.month) })
//     //     .attr("height", function(d){ return height - y(d.revenue); })
//     //     .attr("width", x.bandwidth);

//     rects.enter()
//         .append("rect")
//         .attr("y", function (d) {return y(d[value]);})
//         .attr("x", function (d) {return x(d.state)})
//         .attr("height", function (d) {return height - y(d[value]);})
//         .attr("width", x.bandwidth)
//         .attr("fill", "white");

//     let label = flag ? "cases" : "deaths";
//     yLabel.text(label);
//  } 


/*
 *    main.js
 *    Mastering Data Visualization with D3.js
 *    5.6 - Making our chart dynamic
 */

var margin = {left: 100, right: 50, top: 10, bottom: 130};

var width = 1600 - margin.left - margin.right,
    height = 900 - margin.top - margin.bottom;

var flag = true;

var g = d3.select("#graph")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

var xAxisGroup = g.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")");

var yAxisGroup = g.append("g")
    .attr("class", "y axis");

// X Scale
var x = d3.scaleBand()
    .range([0, width])
    .padding(0.2);

// Y Scale
var y = d3.scaleLinear()
    .range([height, 0]);

// X Label
g.append("text")
    .attr("y", height + 50)
    .attr("x", width / 2)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .attr("fill", "white")
    .text("States");

// Y Label
var yLabel = g.append("text")
    .attr("y", -60)
    .attr("x", -(height / 2))
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .attr("fill", "white")
    .text("Cases");

d3.json('https://corona.lmao.ninja/states').then(data => {
            data.forEach(d => {
                d.cases;
                d.state;
                d.deaths
            })


    d3.interval(function () {
        update(data)
        flag = !flag
    }, 2000);

    // Run the vis for the first time
    update(data);
});

function update(data) {
    var value = flag ? "cases" : "deaths";

    x.domain(data.map(function (d) {
        return d.state
    }));
    y.domain([0, d3.max(data, function (d) {
        return d[value]
    })])

    // X Axis
    var xAxisCall = d3.axisBottom(x);
    // xAxisGroup.call(xAxisCall);;
     g.append("g")
         .attr("class", "x axis")
         .attr("transform", "translate(0, " + height + ")")
         .call(xAxisCall)
         .selectAll("text")
         .attr("y", "10")
         .attr("x", "-5")
         .attr("text-anchor", "end")
         .attr("transform", "rotate(-40)");

    // Y Axis
    var yAxisCall = d3.axisLeft(y)
        .tickFormat(function (d) {
            return d;
        });
    yAxisGroup.call(yAxisCall);

    // JOIN new data with old elements.
    var rects = g.selectAll("rect")
        .data(data);

    // EXIT old elements not present in new data.
    rects.exit().remove();

    // UPDATE old elements present in new data.
    rects
        .attr("y", function (d) {
            return y(d[value]);
        })
        .attr("x", function (d) {
            return x(d.state)
        })
        .attr("height", function (d) {
            return height - y(d[value]);
        })
        .attr("width", x.bandwidth);

    // ENTER new elements present in new data.
    rects.enter()
        .append("rect")
        .attr("y", function (d) {
            return y(d[value]);
        })
        .attr("x", function (d) {
            return x(d.state)
        })
        .attr("height", function (d) {
            return height - y(d[value]);
        })
        .attr("width", x.bandwidth)
        .attr("fill", "white");

    var label = flag ? "Cases" : "Deaths";
    yLabel.text(label);

}
