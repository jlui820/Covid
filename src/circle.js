
export const circle = () => {

    let margin = {left: 100, right: 50, top: 10, bottom: 130};

    let width = 1600 - margin.left - margin.right,
        height = 800 - margin.top - margin.bottom;

    let flag = true;

    let t = d3.transition().duration(1000);

    let g = d3.select("#circle")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

    let xAxisGroup = g.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")");

    let yAxisGroup = g.append("g")
        .attr("class", "y axis");

    let x = d3.scaleBand()
        .range([0, width])
        .padding(0.4);

    let y = d3.scaleLinear()
        .range([height, 0]);

    g.append("text")
        .attr("y", height + 120)
        .attr("x", width / 2)
        .attr("font-size", "30px")
        .attr("text-anchor", "middle")
        .attr("fill", "white")
        .text("States");

    let yLabel = g.append("text")
        .attr("y", -60)
        .attr("x", -(height / 2))
        .attr("font-size", "30px")
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .attr("fill", "white")
        .text("Cases"); 
            
    d3.json('https://corona.lmao.ninja/v2/states/').then(data => {
        
                data.forEach(d => {
                    d.cases;
                    d.state;
                    d.deaths
                    d.todayCases
                    d.todayDeaths
                })


        d3.interval(() => {
            update(data)
            flag = !flag
        }, 2000);
        update(data);
    });

    let update = (data) => {
        let value = flag ? "todayCases" : "todayDeaths";

        x.domain(data.map( (d) => { return d.state }));

        y.domain([0, d3.max(data,  (d) => { return d[value]})])

        let xAxisCall = d3.axisBottom(x);
        g.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0, " + height + ")")
            .call(xAxisCall)
            .selectAll("text")
            .attr("y", "10")
            .attr("x", "-5")
            .attr("font-size", "13px")
            .attr("text-anchor", "end")
            .attr("transform", "rotate(-40)");

            //.transition(t).call(xAxisCall)

        let yAxisCall = d3.axisLeft(y)
            .tickFormat( (d) => {return d;});
        yAxisGroup.transition(t).call(yAxisCall);

        let rects = g.selectAll("circle")
            .data(data);

        rects.exit()
            .attr('fill', 'blue')
        .transition(t)
            .attr('cy', y(0))
            .remove();

        rects.enter()
            .append("circle")
                .attr("fill", "white")
                .attr('cy', y(0))
                .attr("cx", (d) => { return x(d.state) + x.bandwidth() / 2 })
                .attr("r", 7)

                .merge(rects)
                .transition(t)
                    .attr("cx", (d) => { return x(d.state) + + x.bandwidth() / 2 })
                    .attr("cy", (d) => { return y(d[value]); })
             
        let label = flag ? "Today Cases" : "Today Deaths";
        yLabel.text(label);

    }
};