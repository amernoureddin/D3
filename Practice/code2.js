/**
 * Created by amernoureddin on 14-Mar-17.
 */
var w = 500;
var h = 400;
var padding = 50;

var svg = d3.select("body")
    .append("svg")
    .attr("width", 500)
    .attr("height", 500);

var dataset = [ [5, 20], [480, 90], [250, 50], [100, 33], [330, 95],
[410, 12], [475, 44], [25, 67], [85, 21], [220, 88] ];

var xScale = d3.scaleLinear()
    .domain([d3.min(dataset, function(d) { return d[0]; }), d3.max(dataset, function(d) { return d[0]; })])
 .range([padding , w - 3*padding ]);
var yScale = d3.scaleLinear()
    .domain([d3.min(dataset, function (d){return d[1]}), d3.max(dataset, function (d){return d[1]})])
   .range([padding, h- padding]);

var rScale = d3.scaleLinear() // scale radius to fit in a specific range
    .domain([d3.min(dataset, function(d) { return d[1]; }),
    d3.max(dataset, function(d) { return d[1]; })])
    .range([2, 5]);

svg.selectAll("circle")
.data(dataset) // an array of [x,y] values
.enter()
.append("circle") // draw a circle for each array element [x,y]
.attr("cx", function(d) { // d is [x,y]. cx gets x
return xScale(d[0]);
})
.attr("cy", function(d) { // d is [x,y]. cy gets y
return yScale(d[1]);
})
.attr("r", 5) // circle radius is 5
.attr("r", function(d) {
return rScale(d[1]); // remember that circle area (size) is πr2
});

svg.selectAll("text")
.data(dataset) // an array of [x,y] elements
.enter()
.append("text") // add a text for each circle (array value [x,y])
.text(function(d) { // d is [x,y]
return d[0] + "," + d[1]; // print coordinates as text
})
.attr("x", function(d) { // d is [x,y]. 'x' gets x value
return (xScale(d[0]) + rScale(d[1]));
})
.attr("y", function(d) { // d is [x,y]. 'y' gets y value
return (yScale(d[1]) - rScale(d[1]));
})
.attr("font-family", "sans-serif") //style the text
.attr("font-size", "11px")
.attr("fill", "red");



var xAxis = d3.axisBottom(xScale)
.ticks(5);
svg.append("g")
.attr("class", "axis")
.attr("transform", "translate(0," + (h -
padding) + ")")

.call(xAxis);

var yAxis = d3.axisLeft(yScale)
.ticks(5);
svg.append("g")
.attr("class", "axis")
.attr("transform", "translate(" + padding +
",0)")
.call(yAxis);
