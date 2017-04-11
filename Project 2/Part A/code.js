/**
 * Created by amernoureddin on 21-Mar-17.
 */

var rates = [];


var data = d3.json("exchange_rates.json", function(json) {
    json.forEach(function (d) {rates.push(d.rates)});


    var h = 500;
    var w = 1000;
    var padding = 50;

    var svg = d3.select("body").append("svg")
        .attr("height", h)
        .attr("width", w);


    var x = document.getElementById("combo");
    var a = x.options[x.selectedIndex].value;
    console.log(a);
    da = rates[a];

    d3.select("#linear").on("click",function () {
        yScale = d3.scaleLinear()
        .range([h-padding, padding]);
        yScale.domain([0, 20]).clamp(true);
        onchange()
        });

    d3.select("#log").on("click",function () {
        yScale = d3.scaleLog()
        .domain([0.00001, d3.max(Object.values(da))])
        .range([h-padding, padding]);
        onchangeL()
        });

    yScale = d3.scaleLinear()
        .range([h-padding, padding]);
        yScale.domain([0, 20]).clamp(true);


    xScale = d3.scaleBand()
       .domain(Object.keys(da))
       .range([padding, w-padding])
       .padding(0.09);


    svg.selectAll("rect")
       .data(Object.keys(da))
       .enter().append("rect")
       .attr("class", "bar")

       .attr("height", function (d) {
           return h - yScale(da[d]) -padding
       })
       .attr("width", xScale.bandwidth())
       .attr("x", function (d) {
            return  xScale(d)
       })
       .attr("y", function (d) {
            return  yScale(da[d])
       });

    svg.selectAll("text")
        .data(Object.keys(da))
        .enter().append("text")

        .attr("class", "txt")
        .transition()
        .delay(function(d, i){return (i / (Object.keys(da)).length)*1000})
        .duration("1000").ease(d3.easeLinear)
        .text(function (d) {
            if( da[d] > 20){return  Math.round(da[d] * 10)/10 }
        })

        .attr("x", function (d) {
            return xScale(d)
        })
        .attr("y", function () {
            return padding - 5
        })

        .attr("font-size",12)
        .style("fill","red");


    yAxis = d3.axisLeft(yScale)
        .ticks(5);
        svg.append("g")
        .attr("class", "axisy")
        .attr("transform", "translate( "+padding+" ,0)")
        .call(yAxis);

    xAxis = d3.axisBottom(xScale)
        .ticks(32);
        svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + (h - padding) + ")")
        .call(xAxis);

    var rad = document.getElementById("linear");
    var rad2 = document.getElementById("log");

    d3.select("select").on("change",function () {

        if(rad.checked){onchange()}
        else if(rad2.checked) { onchangeL()}

        });

    function onchange() {

        var x = document.getElementById("combo");
        var a = x.options[x.selectedIndex].value;
        da = rates[a];

        console.log(Object.values(da));

        xScale = d3.scaleBand()
            .domain(Object.keys(da))
            .range([padding, w - padding])
            .padding(0.05);

        svg.selectAll("rect")
            .data(Object.keys(da))
            .transition().duration("1000")
            .attr("class", "bar")
            .attr("height", function (d) {
                return h - yScale(da[d]) - padding
            })
            .attr("width", xScale.bandwidth())
            .attr("x", function (d) {
                return xScale(d)
            })
            .attr("y", function (d) {
                return yScale(da[d])
            });

        svg.selectAll(".txt")
            .data(Object.keys(da))
            .transition()
            .delay(function(d, i){return (i / (Object.keys(da)).length)*1000})
            .duration("1000").ease(d3.easeLinear)
            .text(function (d) {
                if (da[d] > 20) {
                    return Math.round(da[d] * 10)/10
                }
            })
            .attr("x", function (d) {
                return xScale(d)
            })
            .attr("y", function () {
                return padding - 5
            })
            .attr("font-size", 12);


        xAxis = d3.axisBottom(xScale)
            .ticks(32);
            svg.select(".axis")
            .transition().duration("500")
            .call(xAxis);


        yAxis = d3.axisLeft(yScale)
            .ticks(5);
            svg.select(".axisy")
            .transition().duration("500")
            .call(yAxis);

        }

    function onchangeL() {

        var x = document.getElementById("combo");
        var a = x.options[x.selectedIndex].value;
        da = rates[a];

        console.log(Object.values(da));

        xScale = d3.scaleBand()
            .domain(Object.keys(da))
            .range([padding, w - padding])
            .padding(0.05);


        svg.selectAll("rect")
            .data(Object.keys(da))
            .transition().duration("1000")
            .attr("class", "bar")
            .attr("height", function (d) {
                return  h-yScale(da[d]) -padding
            })
            .attr("width", xScale.bandwidth())
            .attr("x", function (d, i) {
                return xScale(d)
            })
            .attr("y", function (d) {
                return yScale(da[d])
            });

        svg.selectAll(".txt")
            .data(Object.keys(da))
            .text(function (d) {
                if (da[d] > 100000) {
                    return da[d]
                }
            })
            .attr("font-size", 12);

        xAxis = d3.axisBottom(xScale)
            .ticks(32);
            svg.select(".axis")
            .transition().duration("500")
            .call(xAxis);

        yAxis = d3.axisLeft(yScale)
            .ticks(5);
            svg.select(".axisy")
            .transition().duration("500")
            .call(yAxis);

        }


});




