/**
 * Created by amernoureddin on 21-Mar-17.
 */



var dataDict = {};

var data = d3.json("countries.json", function(json) {
    json.forEach(function (d) {if (d.continent === "Europe"){dataDict[d.name] = d.years}});



    var Arraysofobejects = Object.values(dataDict).map(function (d) {return d.filter(function (o) {
        return o.year === 2000 || o.year === 2012;}) });


    console.log(Arraysofobejects);
    console.log([dataDict]);


    var gdp = Arraysofobejects.map(function (d) { return ((d[1].gdp - d[0].gdp) / d[0].gdp *100) });
    var pop = Arraysofobejects.map(function (d) { return ((d[1].population - d[0].population) / d[0].population *100)});
    console.log(gdp);
    console.log(pop);
    var ll = [];

    d3.range(gdp.length).forEach(function (i) {
        ll.push([gdp[i],pop[i]])

    });

    Object.keys(dataDict).forEach(function (x,i) {dataDict[x] = ll[i]});

    console.log(dataDict);

    color = d3.scaleOrdinal(d3.schemeCategory20)
        .range(["#0000ff","#8080ff","#64a8a5","#000000",
                "#00008b", "#8a2be2","#ff4040","#956479",
                "#7fff00","#458b00", "#d2691e","#6495ed",
                "#8b8878","#006400","#68228b", "#d2cc52",
                "#eecfa1","#b1b100","#ee82ee", "#cd6152",
                "#8b4513","#ffa500","#191970", "#32cd32",
                "#87cefa","#ee9572","#ff6029","#228b22",
                "#ff7f24","#eedd82","#cd2990","#fff581"]);

    var w = 1200;
    var h = 600;
    var padding = 50;

    var svg = d3.select("body")
        .append("svg")
        .attr("width", w)
        .attr("height", h);


    var xScale = d3.scaleLinear()
        .domain([d3.min(Object.values(dataDict), function(d) { return d[0]; }), d3.max(Object.values(dataDict), function(d) { return d[0];})])
        .range([padding , w - 3*padding ]);

    var yScale = d3.scaleLinear()
        .domain([d3.min(Object.values(dataDict), function (d){return d[1]}), d3.max(Object.values(dataDict), function (d){return d[1]})])
        .range([h - padding, padding]);

    console.log(Object.values(dataDict));

    var div = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);


    svg.selectAll("circle")
        .data(Object.keys(dataDict))
        .enter()
        .append("circle")
        .attr("cx", function(d){
            return xScale(dataDict[d][0]);
        })
        .attr("cy", function(d) {
            return yScale(dataDict[d][1]);
        })
        .attr("r",8)
        .style("fill",color)
        .on("mouseover", function(d) {
        div.transition()
        .duration(200)
        .style("opacity", .9);
        div.html(d + "<br/>" +(dataDict[d][0]).toFixed(3)+", " +(dataDict[d][1]).toFixed(3))
        .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function() {
        div.transition()
        .duration(500)
        .style("opacity", 0);
        });


    var xAxis = d3.axisBottom(xScale)
        .ticks(15);
        svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + (yScale(0)) + ")")
        .call(xAxis)
        .append("text")
        .attr("class", "label")
        .attr("x", w-148)
        .attr("y", -6)
        .attr("dy", ".20em")
        .style("text-anchor", "end")
        .style("fill", "red")
        .style("font-size", 11)
        .text("GDP Grouth (%)");

    var yAxis = d3.axisLeft(yScale)
        .ticks(10);
        svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + padding + ",0)")
        .call(yAxis)
        .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("x",-50)
        .attr("dy", ".80em")
        .style("text-anchor", "end")
        .style("fill", "red")
        .style("font-size", 11)
        .text("Population Grouth (%)");


    color.domain(Object.keys(dataDict));


    var legend = svg.selectAll(".legend")
        .data(color.domain())
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { return "translate(" + i * 25 + ",-30)"; });


    legend.append("circle")
        .attr("cx", 400 )
        .attr("cy", 60)
        .attr("r", 8)
        .style("fill", color);


    legend.append("text")
        .attr("x", h-370)
        .attr("y", h-270)
        .attr("dy", ".20em")
        .style("text-anchor", "end")
        .attr("transform", "rotate(-45)")
        .text(function(d) { return d;});


    svg.append("text")
       .attr("y",h-5)//magic number here
       .attr("x", w-170)
       .attr('text-anchor', 'middle')
       .attr("class", "myLabel")
       .attr("font-size" ,14)
       .text("(GDP vs. Population) Grouth, from the year 2000 & 2012");



});