export const bubble = () => {

{/* <svg width="1600" height="1800" font-family="sans-serif" font-size="10" text-anchor="middle"></svg>

 var svg = d3.select("svg"),
     width = +svg.attr("width"),
     height = +svg.attr("height");

 // Define the div for the tooltip
 var div = d3.select("body").append("div")
     .attr("class", "tooltip")
     .style("opacity", 0);


 svg.append("text")
     .attr("x", 900)
     .attr("y", 20)
     .attr("dy", "3.5em")
     .attr("text-anchor", "start")
     .style("font-size", "28px")
     .style("font-weight", "bold")
     .text("Corona Virus Deaths Per State")
     .attr("fill", "white")

 var pack = d3.pack()
     .size([width, height])
     .padding(10);

 d3.csv("data/data.csv", function (d) {
     d.value = +d["deaths"];
     d.Call_Type = d["name"]

     return d;
 }, function (error, data) {
     if (error) throw error;



     var color = d3.scaleOrdinal()
         .domain(data.map(function (d) {
             return d.Call_Type;
         }))
     //   .range(['#5F9EA0', '#4682B4', '#B0C4DE', '#ADD8E6', '#B0E0E6', '#87CEFA', '#0000FF'
     //   ]);

     var root = d3.hierarchy({
             children: data
         })
         .sum(function (d) {
             return d.value;
         })

     var node = svg.selectAll(".node")
         .data(pack(root).leaves())
         .enter().append("g")
         .attr("class", "node")
         .attr("transform", function (d) {
             return "translate(" + d.x + "," + d.y + ")";
         });


     node.append("circle")
         .attr("id", function (d) {
             return d.id;
         })
         .attr("r", function (d) {
             return d.r;
         })
         .style("fill", d => {
             switch (true) {
                 case (d.value < 20):
                     return "#F7C331";
                 case (d.value < 1000):
                     return "#DCC7AA";
                 case (d.value < 5000):
                     return "#F7882F";
                 default:
                     return '#6B7A8F'
             }
         })
         .on("mouseover", function (d) {
             div.transition()
                 .duration(500)
                 .style("opacity", .9);

             var duration = 300;
             data.forEach(function (d, i) {
                 console.log(d.value);
                 node.transition().duration(duration).delay(i * duration)
                     .attr("r", d.value);
             });


             div.html(d.data.Call_Type + ": <br>" + d.data.value)
                 .style("left", (d3.event.pageX) + "px")
                 .style("top", (d3.event.pageY - 28) + "px");
         })
         .on("mouseout", function (d) {
             div.transition()
                 .duration(500)
                 .style("opacity", 0);
         });



     node.append("text")
         .style("fill", "white")
         .text(function (d) {
             return d.data.Call_Type;
         });




     var legend = svg.selectAll(".legend")
         .data(data).enter()
         .append("g")
         .attr("class", "legend")
         .attr("transform", "translate(" + 1400 + "," + 120 + ")");


     legend.append("rect")
         .attr("x", 5)
         .attr("y", function (d, i) {
             return 20 * i;
         })
         .attr("width", 15)
         .attr("height", 15)
         .style("fill", function (d) {
             return color(d.i)
         });


     legend.append("text")
         .attr("x", 25)
         .attr("text-anchor", "start")
         .attr("dy", "1em")
         .attr("y", function (d, i) {
             return 20 * i;
         })
         .text(function (d) {
             return d.Call_Type;
         })
         .attr("font-size", "12px");


     legend.append("text")
         .attr("x", 31)
         .attr("dy", "-.2em")
         .attr("y", -10)
         .text("State")
         .attr("font-size", "17px");

 }); */}
}

