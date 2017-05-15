/**
 * Created by amernoureddin on 29-Apr-17.
 */



var EuroFull = {};
var AafricaFull = {};
var AmericaFull = {};
var AsiaFull = {};
var OceFull = {};


var dataEuro = {};
var dataAfrica = {};
var dataAmeric = {};
var dataAsia = {};
var dataOcean = {};



var data = d3.json("countries.json", function(json) {
    json.map(function (d) {
        if (d.continent === "Europe"){EuroFull[d.name] = d.years.slice(5,18).map(function (d) {

            return [d.year, d.gdp, d.population]

        })}
        if (d.continent === "Africa"){AafricaFull[d.name] = d.years.slice(5,18).map(function (d) {
            return [d.year, d.gdp, d.population]

        })}
        if (d.continent === "Americas"){AmericaFull[d.name] = d.years.slice(5,18).map(function (d) {
            return [d.year, d.gdp, d.population]

        })}
        if (d.continent === "Asia"){AsiaFull[d.name] = d.years.slice(5,18).map(function (d) {
            return [d.year, d.gdp, d.population]

        })}
        if (d.continent === "Oceania"){OceFull[d.name] = d.years.slice(5,18).map(function (d) {
            return [d.year, d.gdp, d.population]

        })}

    });

    json.map(function (d) {
       if (d.continent === "Europe"){dataEuro[d.name] = [d.years[17].year, d.years[17].gdp, d.years[17].population];}
        if (d.continent === "Africa"){dataAfrica[d.name] = [d.years[17].year, d.years[17].gdp, d.years[17].population]}
        if (d.continent === "Americas"){dataAmeric[d.name] = [d.years[17].year, d.years[17].gdp, d.years[17].population]}
        if (d.continent === "Asia"){dataAsia[d.name] = [d.years[17].year, d.years[17].gdp, d.years[17].population]}
        if (d.continent === "Oceania"){dataOcean[d.name] = [d.years[17].year, d.years[17].gdp, d.years[17].population]}

    });


    // console.log(EuroFull);
    // console.log(AafricaFull);
    // console.log(AmericaFull);
    // console.log(AsiaFull);
    // console.log(OceFull);
    //
    // console.log(dataEuro);
    // console.log(dataAfrica);
    // console.log(dataAmeric);
    // console.log(dataAsia);
    // console.log(dataOcean);

    var dataset = {"name": "World", "children":[
    {"name": "Europe", "children":[]},
    {"name": "Americas", "children":[]},
    {"name": "Africa", "children":[]},
    {"name": "Asia", "children":[]},
    {"name": "Oceania", "children":[]}
    ]};


    function whobaE(c) {
        dataset.children.map(function (d) {
            if(d.name === "Europe") {
                for (var key in c){
                    var co = {"name":key, "gdp":c[key][1], "population":c[key][2]};
                    d.children.push(co)
                }
            }
        });
    }
    function whobaAf(c) {
        dataset.children.map(function (d) {
            if(d.name === "Africa") {
                for (var key in c){
                    var co = {"name":key, "gdp":c[key][1], "population":c[key][2]};
                    d.children.push(co)
                }
            }
        });
    }
    function whobaAm(c) {
        dataset.children.map(function (d) {
            if(d.name === "Americas") {
                for (var key in c){
                    var co = {"name":key, "gdp":c[key][1], "population":c[key][2]};
                    d.children.push(co)
                }
            }
        });
    }
    function whobaAs(c) {
        dataset.children.map(function (d) {
            if(d.name === "Asia") {
                for (var key in c){
                    var co = {"name":key, "gdp":c[key][1], "population":c[key][2]};
                    d.children.push(co)
                }
            }
        });
    }
    function whobaO(c) {
        dataset.children.map(function (d) {
            if(d.name === "Oceania") {
                for (var key in c){
                    var co = {"name":key, "gdp":c[key][1], "population":c[key][2]};
                    d.children.push(co)
                }
            }
        });
    }



    whobaE(dataEuro);
    whobaAf(dataAfrica);
    whobaAm(dataAmeric);
    whobaAs(dataAsia);
    whobaO(dataOcean);
    console.log(dataset);


    /******************************************************************************************************************/

    var radial_selected  = false;

    var sort_by_gdp =  false;
    var sort_by_pop =  false;

    /*******************************************************/

    d3.select("input#radial").on("click", radial_layout);
    d3.select("input#tree").on("click", tree_layout);
    //
    d3.select("input#nocolor").on("click", color_nocolor);
    d3.select("input#color_cont").on("click", color_continent);
    //
    //
    d3.select("input#sort_pop").on("click", sort_population);
    d3.select("input#sort_gdp").on("click", sort_gdp);
    d3.select("input#sort_cont").on("click", sort_continent);

    /*******************************************************/

    var w = 1000;
    var h = 5000;
    var r= 1000;


    var svg = d3.select("body")
   .append("svg")
   .attr("width", w)
   .attr("height", h)
   .append("g")
   .attr("transform", "translate(" + w / 8 + "," + 0 + ")");


    /*******************************************************/

    var root=d3.hierarchy(dataset).sum(function(d) {return d.gdp});


    var tree = d3.tree().size([h, 3*w/4 ]);

    function project(x, y) {
        return [y, x];
    }

    function linkgen(d) {
      return "M" + project(d.source.x, d.source.y)
          + "C" + project(d.source.x,(d.source.y + d.target.y)/2)
          + " " + project(d.target.x,(d.source.y + d.target.y)/2)
          + " " + project(d.target.x,d.target.y);
    }

    function color(d) {

        var EuroColor = "#6699cc";
        var AfricaColor = "#cc8242";
        var AmericaColor = "#cc1d92";
        var AsiaColor = "#74cc3a";
        var OcColor = "#cc2e24";

        if (d.data["name"] === "World"){return "black"}
        else if(d.data["name"] === "Europe"){return EuroColor}
        else if(d.data["name"] === "Africa"){return AfricaColor}
        else if(d.data["name"] === "Americas"){return AmericaColor}
        else if(d.data["name"] === "Asia"){return AsiaColor}
        else if(d.data["name"] === "Oceania"){return OcColor}

        if(d.parent.data["name"] === "Europe"){return EuroColor}
        else if(d.parent.data["name"] === "Africa"){return AfricaColor}
        else if(d.parent.data["name"] === "Americas"){return AmericaColor}
        else if(d.parent.data["name"] === "Asia"){return AsiaColor}
        else if(d.parent.data["name"] === "Oceania"){return OcColor}

    }

    /*******************************************************/

    nodes = tree(root).descendants();
    links = tree(root).links();

    /*******************************************************/

    //Create edges as paths
    var link = svg.selectAll("path")
        .data(links)
        .enter()
        .append("path")
        .attr("class", "link")
        .attr("d", linkgen)
        .style("stroke", "#ccc")
        .style("stroke-width", 1.5)
        .style("fill", "none");

    /*******************************************************/

    var rScale = d3.scaleLinear()
        .domain([0, 142300000])
        .range([7, 15]);

    /*******************************************************/

    //Create nodes as circles
    var node = svg.selectAll("circle")
        .data(nodes)
        .enter()
        .append("circle")
        .attr("class", "node")
        // .attr("r", 4)
        .attr("r", function(d) { return d.children ? 4.5 : Math.sqrt(Math.sqrt(rScale(d.value))) ; })
        .attr("cx", function(d) { return d.y; })
        .attr("cy", function(d) { return d.x; })
        // .style("fill", color)
        .style("stroke", "black")
        .on("mousemove", function(d) {

            d3.select(this)
            .attr("fill", "#ccc");

            var xPosition = d3.event.pageX;
            var yPosition = d3.event.pageY;

            d3.select("#tooltip")
            .style("left",  xPosition + "px")
            .style("top",yPosition+ "px")
            .select('#name')
            .style("font", "14px sans-serif")
            .text(d.data["name"]);

            d3.select("#tooltip").select("#valueG")
            .style("font", "10px sans-serif")
            .text("GDP(2012): " + d.value);


            function popTotal(x) {
                var ppp = 0;
                var popL = [];
                 x.map(function (d) {
                        ppp=ppp+parseInt(d.data.population);
                        popL.push(ppp);
                 });
                 return popL[popL.length - 1]

        }


            d3.select("#tooltip").select("#valueP")
            .style("font", "10px sans-serif")
            .text(d.children ? "Population(2012): " +  popTotal(d.children)
                : "Population(2012): " + d.data["population"]);

            d3.select("#tooltip").classed("hidden", false);
        })
        .on("mouseout", function() {
            d3.select(this)
            .transition()
            .duration(250);

            d3.select("#tooltip").classed("hidden", true);
        })
        .on("click",function (d) {

            var cont = ["World", "Europe","Africa", "Asia", "Americas","Oceania"];
            if(cont.includes(d.data["name"])){click(d)}
            else {
            if(d3.select("#tooltipLine").classed("hidden") === true ){
            d3.select(this)
            .attr("fill", "#ccc");

            var xPosition = d3.event.pageX -425;
            var yPosition = d3.event.pageY;

            d3.select("#tooltipLine")
            .style("position", "absolute")
            .style("left",  xPosition + "px")
            .style("top",yPosition+ "px");

            d3.select("#tooltipLine").classed("hidden", false);

            function lineChart(){

                var Thiscountry = d.data["name"];

                var w = 600;
                var h = 300;
                var padding = 20;

                if(d.parent["data"]["name"] === "Europe"){var datt = EuroFull;}
                if(d.parent["data"]["name"] === 'Africa'){ datt = AafricaFull;}
                if(d.parent["data"]["name"] === 'Asia'){ datt = AsiaFull;}
                if(d.parent["data"]["name"] === 'Americas'){ datt = AmericaFull;}
                if(d.parent["data"]["name"] === 'Oceania'){ datt = OceFull;}

                // console.log(datt[Thiscountry]);

                var dataset = datt[Thiscountry].map(function (d) {return [d[0],d[1]]});
                var years = ['2000', '2001', '2002', '2003', '2004', '2005',
                '2006', '2007', '2008', '2009', '2010', '2011', '2012'];


                // console.log(dataset);

                var xScale = d3.scaleLinear()
                    .domain([d3.min(dataset, function(d) { return d[0]; }), d3.max(dataset, function(d) { return d[0]; })])
                    .range([padding, w/1.5-padding]);

                var yScale = d3.scaleLinear()
			           .domain([0, d3.max(dataset, function(d) { return d[1]; })])
			           .range([h/2-padding, padding]);

                var xAxis = d3.axisBottom(xScale)     // a function to create an axis
				   .ticks(dataset.length)  //Set  # of ticks
				   .tickFormat(d3.format(".0f")) ;


                var linex = d3.line()
                    .x(function(d) { return xScale(d[0]); })
                    .y(function(d) { return yScale(d[1]); })
                    .curve(d3.curveLinear);



                var svg2 = d3.select("div#tooltipLine")
                    .append("svg")
                    .attr("width", w/1.5)
                    .attr("height", h/2)
                    .style("float", "right");

                svg2.append("g")
                    .attr("class", "axis")
                    .attr("transform", "translate(0," + (h/2 - padding) + ")")
                    .call(xAxis);

                svg2.append("path")
                    .attr("class", "line1")
                    .attr("d", linex(dataset));

                var legend = svg2.
                    append("g")
                    .attr("class", "legend")
                    .attr("transform", "translate(50,0)");

                legend.append("text")
                    .attr("x", 100)
                    .attr("y", 10)
                    .attr("dy", ".20em")
                    .style("text-anchor", "end")
                    .style("font-size", "12")
                    // .attr("transform", "rotate(-45)")
                    .text(Thiscountry + " - GDP Trend");

            }
            lineChart()
            }
            }
        })
        .on("mouseout", function() {
            d3.select(this)
            .transition()
            .duration(250)

            d3.select("#tooltipLine").select('svg').remove();
            d3.select("#tooltipLine").classed("hidden", true);
            d3.select("#tooltip").classed("hidden", true);
        });

    /*******************************************************/

    //Create labels as text
    var label = svg.selectAll("text")
        .data(nodes)
        .enter()
        .append("text")
        .attr("class", "label")
        .attr("dx", function(d) {  return d.children ? d.y-8 : d.y +  Math.sqrt(Math.sqrt(rScale(d.value))) + 10;  })
        .attr("dy", function(d) { return d.x +3 ; })
        .style("text-anchor", function(d) { return d.children ? "end" : "start"; })
        .style("font", "10px sans-serif")
        .text(function(d) { return d.data.name; });

    /*******************************************************/

    function click(d) {

        //If the node has children, make a copy of children to _children and delete the children
        //If it has no child, restore the original children or do nothing if it is leaf node
        if (d.children) {
            d._children = d.children;
            d.children = null;

        } else {
                d.children = d._children;
                d._children = null;
        }

        //make a copy of current location of all nodes so later they can stay at their  current locations
       nodes.forEach(function(element) {
            element._x=element.x
            element._y=element.y
        });

       // re-create nodes/edges after removing child of the current node
       nodes = tree(root).descendants(),
       links = tree(root).links();

       // tree layout changed the location of nodes. Move them back to the original location
       nodes.forEach(function(element) {
            element.x=element._x
            element.y=element._y
        });


        // re-bind the edges
        link = svg.selectAll("path.link")
            .data(links)
            .attr("d", linkgen);

        //Create new edges if necessary
        link.enter()
            .append("path")
            .attr("class", "link")
            .attr("d", linkgen)
            .style("stroke", "#ccc")
            .style("stroke-width", 1.5)
            .style("fill", "none");

        //Delete edges if necessart
        link.exit()
            .remove();


    var rScale = d3.scaleLinear()
        .domain([0, 142300000])
        .range([7, 15]);

        // re-bind the nodes
        node = svg.selectAll("circle.node")
            .data(nodes)
            .attr("cx", function(d) { return d.y; })
            .attr("cy", function(d) { return d.x; })
            .attr("r", function(d) { return d.children ? 4.5 : Math.sqrt(Math.sqrt(rScale(d.value))) ; });
            // .style("fill", color);

        //remove nodes if necessary
        node.exit()
            .remove();

        //Create new nodes if necessary
        node.enter()
            .append("circle")
            .attr("class", "node")
            .attr("cx", function(d) { return d.y; })
            .attr("cy", function(d) { return d.x; })
            .attr("r", function(d) { return d.children ? 4.5 : Math.sqrt(Math.sqrt(rScale(d.value))) ; })

            .style("stroke", "blue")
            .on("mousemove", function(d) {

            d3.select(this)
            .attr("fill", "#ccc");

            var xPosition = d3.event.pageX;
            var yPosition = d3.event.pageY;

            d3.select("#tooltip")
            .style("left",  xPosition + "px")
            .style("top",yPosition+ "px")
            .select('#name')
            .style("font", "14px sans-serif")
            .text(d.data["name"]);

            d3.select("#tooltip").select("#valueG")
            .style("font", "10px sans-serif")
            .text("GDP(2012): " + d.value);


            function popTotal(x) {
                var ppp = 0;
                var popL = [];
                 x.map(function (d) {
                        ppp=ppp+parseInt(d.data.population);
                        popL.push(ppp);
                 });
                 return popL[popL.length - 1]

        }


            d3.select("#tooltip").select("#valueP")
            .style("font", "10px sans-serif")
            .text(d.children ? "Population(2012): " +  popTotal(d.children)
                : "Population(2012): " + d.data["population"]);

            d3.select("#tooltip").classed("hidden", false);
        })
            .on("mouseout", function() {
                d3.select(this)
                .transition()
                .duration(250);

                d3.select("#tooltip").classed("hidden", true);
            })
            .on("click",function (d) {

                var cont = ["World", "Europe","Africa", "Asia", "Americas","Oceania"];
                if(cont.includes(d.data["name"])){click(d)}
                else {
                if(d3.select("#tooltipLine").classed("hidden") === true ){
                d3.select(this)
                .attr("fill", "#ccc");

                var xPosition = d3.event.pageX -425;
                var yPosition = d3.event.pageY;

                d3.select("#tooltipLine")
                .style("position", "absolute")
                .style("left",  xPosition + "px")
                .style("top",yPosition+ "px");

                d3.select("#tooltipLine").classed("hidden", false);

                function lineChart(){

                    var Thiscountry = d.data["name"];

                    var w = 600;
                    var h = 300;
                    var padding = 20;

                    if(d.parent["data"]["name"] === "Europe"){var datt = EuroFull;}
                    if(d.parent["data"]["name"] === 'Africa'){ datt = AafricaFull;}
                    if(d.parent["data"]["name"] === 'Asia'){ datt = AsiaFull;}
                    if(d.parent["data"]["name"] === 'Americas'){ datt = AmericaFull;}
                    if(d.parent["data"]["name"] === 'Oceania'){ datt = OceFull;}

                    // console.log(datt[Thiscountry]);

                    var dataset = datt[Thiscountry].map(function (d) {return [d[0],d[1]]});
                    var years = ['2000', '2001', '2002', '2003', '2004', '2005',
                    '2006', '2007', '2008', '2009', '2010', '2011', '2012'];


                    // console.log(dataset);

                    var xScale = d3.scaleLinear()
                        .domain([d3.min(dataset, function(d) { return d[0]; }), d3.max(dataset, function(d) { return d[0]; })])
                        .range([padding, w/1.5-padding]);

                    var yScale = d3.scaleLinear()
                           .domain([0, d3.max(dataset, function(d) { return d[1]; })])
                           .range([h/2-padding, padding]);

                    var xAxis = d3.axisBottom(xScale)     // a function to create an axis
                       .ticks(dataset.length)  //Set  # of ticks
                       .tickFormat(d3.format(".0f")) ;


                    var linex = d3.line()
                        .x(function(d) { return xScale(d[0]); })
                        .y(function(d) { return yScale(d[1]); })
                        .curve(d3.curveLinear);



                    var svg2 = d3.select("div#tooltipLine")
                        .append("svg")
                        .attr("width", w/1.5)
                        .attr("height", h/2)
                        .style("float", "right");

                    svg2.append("g")
                        .attr("class", "axis")
                        .attr("transform", "translate(0," + (h/2 - padding) + ")")
                        .call(xAxis);

                    svg2.append("path")
                        .attr("class", "line1")
                        .attr("d", linex(dataset));

                    var legend = svg2.
                        append("g")
                        .attr("class", "legend")
                        .attr("transform", "translate(50,0)");

                    legend.append("text")
                        .attr("x", 100)
                        .attr("y", 10)
                        .attr("dy", ".20em")
                        .style("text-anchor", "end")
                        .style("font-size", "12")
                        // .attr("transform", "rotate(-45)")
                        .text(Thiscountry + " - GDP Trend");

                }
                lineChart()
                }
                }
            })
            .on("mouseout", function() {
                d3.select(this)
                .transition()
                .duration(250)

                d3.select("#tooltipLine").select('svg').remove();
                d3.select("#tooltipLine").classed("hidden", true);
                d3.select("#tooltip").classed("hidden", true);
            });



        // re-bind the nodes
        label = svg.selectAll("text.label")
            .data(nodes)
            .attr("dx", function(d) {  return d.children ? d.y-8 : d.y +  Math.sqrt(Math.sqrt(rScale(d.value))) + 10;  })
            .attr("dy", function(d) { return d.x +3 ; })
            .style("text-anchor", function(d) { return d.children ? "end" : "start"; })
            .style("font", "10px sans-serif")
            .text(function(d) { return d.data.name; });

        //remove labels if necessary
        label.exit()
            .remove();

        //Create new labels if necessary
        label.enter()
            .append("text")
            .attr("class", "label")
            .attr("dx", function(d) {  return d.children ? d.y-8 : d.y +  Math.sqrt(Math.sqrt(rScale(d.value))) + 10;  })
            .attr("dy", function(d) { return d.x +3 ; })
            .style("text-anchor", function(d) { return d.children ? "end" : "start"; })
            .style("font", "10px sans-serif")
            .text(function(d) { return d.data.name; });

         if(document.getElementById("nocolor").checked){
                d3.selectAll("circle").style("fill", "#CCCCCC");
            }
        else{
                d3.selectAll("circle").style("fill", color);
            }



    }

    /*****************************/

    function tree_layout() {
        radial_selected = false;
        d3.select('svg').remove();

        d3.select("input#radial").on("click", radial_layout);
        d3.select("input#tree").on("click", tree_layout);
        //
        d3.select("input#nocolor").on("click", color_nocolor);
        d3.select("input#color_cont").on("click", color_continent);
        //
        //
        d3.select("input#sort_pop").on("click", sort_population);
        d3.select("input#sort_gdp").on("click", sort_gdp);
        d3.select("input#sort_cont").on("click", sort_continent);

        /*******************************************************/

        var w = 1000;
        var h = 5000;
        var r= 1000;


        var svg = d3.select("body")
       .append("svg")
       .attr("width", w)
       .attr("height", h)
       .append("g")
       .attr("transform", "translate(" + w / 8 + "," + 0 + ")");


        /*******************************************************/

        var root=d3.hierarchy(dataset).sum(function(d) {return d.gdp});


        var tree = d3.tree().size([h, 3*w/4 ]);

        function project(x, y) {
            return [y, x];
        }

        function linkgen(d) {
          return "M" + project(d.source.x, d.source.y)
              + "C" + project(d.source.x,(d.source.y + d.target.y)/2)
              + " " + project(d.target.x,(d.source.y + d.target.y)/2)
              + " " + project(d.target.x,d.target.y);
        }

        function color(d) {

            var EuroColor = "#6699cc";
            var AfricaColor = "#cc8242";
            var AmericaColor = "#cc1d92";
            var AsiaColor = "#74cc3a";
            var OcColor = "#cc2e24";

            if (d.data["name"] === "World"){return "black"}
            else if(d.data["name"] === "Europe"){return EuroColor}
            else if(d.data["name"] === "Africa"){return AfricaColor}
            else if(d.data["name"] === "Americas"){return AmericaColor}
            else if(d.data["name"] === "Asia"){return AsiaColor}
            else if(d.data["name"] === "Oceania"){return OcColor}

            if(d.parent.data["name"] === "Europe"){return EuroColor}
            else if(d.parent.data["name"] === "Africa"){return AfricaColor}
            else if(d.parent.data["name"] === "Americas"){return AmericaColor}
            else if(d.parent.data["name"] === "Asia"){return AsiaColor}
            else if(d.parent.data["name"] === "Oceania"){return OcColor}

        }

        /*******************************************************/

        nodes = tree(root).descendants();
        links = tree(root).links();

        /*******************************************************/

        //Create edges as paths
        var link = svg.selectAll("path")
            .data(links)
            .enter()
            .append("path")
            .attr("class", "link")
            .attr("d", linkgen)
            .style("stroke", "#ccc")
            .style("stroke-width", 1.5)
            .style("fill", "none");

        /*******************************************************/

        var rScale = d3.scaleLinear()
            .domain([0, 142300000])
            .range([7, 15]);

        /*******************************************************/

        //Create nodes as circles
        var node = svg.selectAll("circle")
            .data(nodes)
            .enter()
            .append("circle")
            .attr("class", "node")
            // .attr("r", 4)
            .attr("r", function(d) { return d.children ? 4.5 : Math.sqrt(Math.sqrt(rScale(d.value))) ; })
            .attr("cx", function(d) { return d.y; })
            .attr("cy", function(d) { return d.x; })
            // .style("fill", color)
            .style("stroke", "black")
            .on("mousemove", function(d) {

                d3.select(this)
                .attr("fill", "#ccc");

                var xPosition = d3.event.pageX;
                var yPosition = d3.event.pageY;

                d3.select("#tooltip")
                .style("left",  xPosition + "px")
                .style("top",yPosition+ "px")
                .select('#name')
                .style("font", "14px sans-serif")
                .text(d.data["name"]);

                d3.select("#tooltip").select("#valueG")
                .style("font", "10px sans-serif")
                .text("GDP(2012): " + d.value);


                function popTotal(x) {
                    var ppp = 0;
                    var popL = [];
                     x.map(function (d) {
                            ppp=ppp+parseInt(d.data.population);
                            popL.push(ppp);
                     });
                     return popL[popL.length - 1]

            }


                d3.select("#tooltip").select("#valueP")
                .style("font", "10px sans-serif")
                .text(d.children ? "Population(2012): " +  popTotal(d.children)
                    : "Population(2012): " + d.data["population"]);

                d3.select("#tooltip").classed("hidden", false);
            })
            .on("mouseout", function() {
                d3.select(this)
                .transition()
                .duration(250);

                d3.select("#tooltip").classed("hidden", true);
            })
            .on("click",function (d) {

                var cont = ["World", "Europe","Africa", "Asia", "Americas","Oceania"];
                if(cont.includes(d.data["name"])){click(d)}
                else {
                if(d3.select("#tooltipLine").classed("hidden") === true ){
                d3.select(this)
                .attr("fill", "#ccc");

                var xPosition = d3.event.pageX -425;
                var yPosition = d3.event.pageY;

                d3.select("#tooltipLine")
                .style("position", "absolute")
                .style("left",  xPosition + "px")
                .style("top",yPosition+ "px");

                d3.select("#tooltipLine").classed("hidden", false);

                function lineChart(){

                    var Thiscountry = d.data["name"];

                    var w = 600;
                    var h = 300;
                    var padding = 20;

                    if(d.parent["data"]["name"] === "Europe"){var datt = EuroFull;}
                    if(d.parent["data"]["name"] === 'Africa'){ datt = AafricaFull;}
                    if(d.parent["data"]["name"] === 'Asia'){ datt = AsiaFull;}
                    if(d.parent["data"]["name"] === 'Americas'){ datt = AmericaFull;}
                    if(d.parent["data"]["name"] === 'Oceania'){ datt = OceFull;}

                    // console.log(datt[Thiscountry]);

                    var dataset = datt[Thiscountry].map(function (d) {return [d[0],d[1]]});
                    var years = ['2000', '2001', '2002', '2003', '2004', '2005',
                    '2006', '2007', '2008', '2009', '2010', '2011', '2012'];


                    // console.log(dataset);

                    var xScale = d3.scaleLinear()
                        .domain([d3.min(dataset, function(d) { return d[0]; }), d3.max(dataset, function(d) { return d[0]; })])
                        .range([padding, w/1.5-padding]);

                    var yScale = d3.scaleLinear()
                           .domain([0, d3.max(dataset, function(d) { return d[1]; })])
                           .range([h/2-padding, padding]);

                    var xAxis = d3.axisBottom(xScale)     // a function to create an axis
                       .ticks(dataset.length)  //Set  # of ticks
                       .tickFormat(d3.format(".0f")) ;


                    var linex = d3.line()
                        .x(function(d) { return xScale(d[0]); })
                        .y(function(d) { return yScale(d[1]); })
                        .curve(d3.curveLinear);



                    var svg2 = d3.select("div#tooltipLine")
                        .append("svg")
                        .attr("width", w/1.5)
                        .attr("height", h/2)
                        .style("float", "right");

                    svg2.append("g")
                        .attr("class", "axis")
                        .attr("transform", "translate(0," + (h/2 - padding) + ")")
                        .call(xAxis);

                    svg2.append("path")
                        .attr("class", "line1")
                        .attr("d", linex(dataset));

                    var legend = svg2.
                        append("g")
                        .attr("class", "legend")
                        .attr("transform", "translate(50,0)");

                    legend.append("text")
                        .attr("x", 100)
                        .attr("y", 10)
                        .attr("dy", ".20em")
                        .style("text-anchor", "end")
                        .style("font-size", "12")
                        // .attr("transform", "rotate(-45)")
                        .text(Thiscountry + " - GDP Trend");

                }
                lineChart()
                }
                }
            })
            .on("mouseout", function() {
                d3.select(this)
                .transition()
                .duration(250)

                d3.select("#tooltipLine").select('svg').remove();
                d3.select("#tooltipLine").classed("hidden", true);
                d3.select("#tooltip").classed("hidden", true);
            });

        /*******************************************************/

        //Create labels as text
        var label = svg.selectAll("text")
            .data(nodes)
            .enter()
            .append("text")
            .attr("class", "label")
            .attr("dx", function(d) {  return d.children ? d.y-8 : d.y +  Math.sqrt(Math.sqrt(rScale(d.value))) + 10;  })
            .attr("dy", function(d) { return d.x +3 ; })
            .style("text-anchor", function(d) { return d.children ? "end" : "start"; })
            .style("font", "10px sans-serif")
            .text(function(d) { return d.data.name; });

        /*******************************************************/

        function click(d) {

            //If the node has children, make a copy of children to _children and delete the children
            //If it has no child, restore the original children or do nothing if it is leaf node
            if (d.children) {
                d._children = d.children;
                d.children = null;

            } else {
                    d.children = d._children;
                    d._children = null;
            }

            //make a copy of current location of all nodes so later they can stay at their  current locations
           nodes.forEach(function(element) {
                element._x=element.x
                element._y=element.y
            });

           // re-create nodes/edges after removing child of the current node
           nodes = tree(root).descendants(),
           links = tree(root).links();

           // tree layout changed the location of nodes. Move them back to the original location
           nodes.forEach(function(element) {
                element.x=element._x
                element.y=element._y
            });


            // re-bind the edges
            link = svg.selectAll("path.link")
                .data(links)
                .attr("d", linkgen);

            //Create new edges if necessary
            link.enter()
                .append("path")
                .attr("class", "link")
                .attr("d", linkgen)
                .style("stroke", "#ccc")
                .style("stroke-width", 1.5)
                .style("fill", "none");

            //Delete edges if necessart
            link.exit()
                .remove();


        var rScale = d3.scaleLinear()
            .domain([0, 142300000])
            .range([7, 15]);

            // re-bind the nodes
            node = svg.selectAll("circle.node")
                .data(nodes)
                .attr("cx", function(d) { return d.y; })
                .attr("cy", function(d) { return d.x; })
                .attr("r", function(d) { return d.children ? 4.5 : Math.sqrt(Math.sqrt(rScale(d.value))) ; });
                // .style("fill", color);

            //remove nodes if necessary
            node.exit()
                .remove();

            //Create new nodes if necessary
            node.enter()
                .append("circle")
                .attr("class", "node")
                .attr("cx", function(d) { return d.y; })
                .attr("cy", function(d) { return d.x; })
                .attr("r", function(d) { return d.children ? 4.5 : Math.sqrt(Math.sqrt(rScale(d.value))) ; })
                .style("stroke", "blue")
                .on("mousemove", function(d) {

                d3.select(this)
                .attr("fill", "#ccc");

                var xPosition = d3.event.pageX;
                var yPosition = d3.event.pageY;

                d3.select("#tooltip")
                .style("left",  xPosition + "px")
                .style("top",yPosition+ "px")
                .select('#name')
                .style("font", "14px sans-serif")
                .text(d.data["name"]);

                d3.select("#tooltip").select("#valueG")
                .style("font", "10px sans-serif")
                .text("GDP(2012): " + d.value);


                function popTotal(x) {
                    var ppp = 0;
                    var popL = [];
                     x.map(function (d) {
                            ppp=ppp+parseInt(d.data.population);
                            popL.push(ppp);
                     });
                     return popL[popL.length - 1]

            }


                d3.select("#tooltip").select("#valueP")
                .style("font", "10px sans-serif")
                .text(d.children ? "Population(2012): " +  popTotal(d.children)
                    : "Population(2012): " + d.data["population"]);

                d3.select("#tooltip").classed("hidden", false);
            })
                .on("mouseout", function() {
                    d3.select(this)
                    .transition()
                    .duration(250);

                    d3.select("#tooltip").classed("hidden", true);
                })
                .on("click",function (d) {

                    var cont = ["World", "Europe","Africa", "Asia", "Americas","Oceania"];
                    if(cont.includes(d.data["name"])){click(d)}
                    else {
                    if(d3.select("#tooltipLine").classed("hidden") === true ){
                    d3.select(this)
                    .attr("fill", "#ccc");

                    var xPosition = d3.event.pageX -425;
                    var yPosition = d3.event.pageY;

                    d3.select("#tooltipLine")
                    .style("position", "absolute")
                    .style("left",  xPosition + "px")
                    .style("top",yPosition+ "px");

                    d3.select("#tooltipLine").classed("hidden", false);

                    function lineChart(){

                        var Thiscountry = d.data["name"];

                        var w = 600;
                        var h = 300;
                        var padding = 20;

                        if(d.parent["data"]["name"] === "Europe"){var datt = EuroFull;}
                        if(d.parent["data"]["name"] === 'Africa'){ datt = AafricaFull;}
                        if(d.parent["data"]["name"] === 'Asia'){ datt = AsiaFull;}
                        if(d.parent["data"]["name"] === 'Americas'){ datt = AmericaFull;}
                        if(d.parent["data"]["name"] === 'Oceania'){ datt = OceFull;}

                        // console.log(datt[Thiscountry]);

                        var dataset = datt[Thiscountry].map(function (d) {return [d[0],d[1]]});
                        var years = ['2000', '2001', '2002', '2003', '2004', '2005',
                        '2006', '2007', '2008', '2009', '2010', '2011', '2012'];


                        // console.log(dataset);

                        var xScale = d3.scaleLinear()
                            .domain([d3.min(dataset, function(d) { return d[0]; }), d3.max(dataset, function(d) { return d[0]; })])
                            .range([padding, w/1.5-padding]);

                        var yScale = d3.scaleLinear()
                               .domain([0, d3.max(dataset, function(d) { return d[1]; })])
                               .range([h/2-padding, padding]);

                        var xAxis = d3.axisBottom(xScale)     // a function to create an axis
                           .ticks(dataset.length)  //Set  # of ticks
                           .tickFormat(d3.format(".0f")) ;


                        var linex = d3.line()
                            .x(function(d) { return xScale(d[0]); })
                            .y(function(d) { return yScale(d[1]); })
                            .curve(d3.curveLinear);



                        var svg2 = d3.select("div#tooltipLine")
                            .append("svg")
                            .attr("width", w/1.5)
                            .attr("height", h/2)
                            .style("float", "right");

                        svg2.append("g")
                            .attr("class", "axis")
                            .attr("transform", "translate(0," + (h/2 - padding) + ")")
                            .call(xAxis);

                        svg2.append("path")
                            .attr("class", "line1")
                            .attr("d", linex(dataset));

                        var legend = svg2.
                            append("g")
                            .attr("class", "legend")
                            .attr("transform", "translate(50,0)");

                        legend.append("text")
                            .attr("x", 100)
                            .attr("y", 10)
                            .attr("dy", ".20em")
                            .style("text-anchor", "end")
                            .style("font-size", "12")
                            // .attr("transform", "rotate(-45)")
                            .text(Thiscountry + " - GDP Trend");

                    }
                    lineChart()
                    }
                    }
                })
                .on("mouseout", function() {
                    d3.select(this)
                    .transition()
                    .duration(250)

                    d3.select("#tooltipLine").select('svg').remove();
                    d3.select("#tooltipLine").classed("hidden", true);
                    d3.select("#tooltip").classed("hidden", true);
                });



            // re-bind the nodes
            label = svg.selectAll("text.label")
                .data(nodes)
                .attr("dx", function(d) {  return d.children ? d.y-8 : d.y +  Math.sqrt(Math.sqrt(rScale(d.value))) + 10;  })
                .attr("dy", function(d) { return d.x +3 ; })
                .style("text-anchor", function(d) { return d.children ? "end" : "start"; })
                .style("font", "10px sans-serif")
                .text(function(d) { return d.data.name; });

            //remove labels if necessary
            label.exit()
                .remove();

            //Create new labels if necessary
            label.enter()
                .append("text")
                .attr("class", "label")
                .attr("dx", function(d) {  return d.children ? d.y-8 : d.y +  Math.sqrt(Math.sqrt(rScale(d.value))) + 10;  })
                .attr("dy", function(d) { return d.x +3 ; })
                .style("text-anchor", function(d) { return d.children ? "end" : "start"; })
                .style("font", "10px sans-serif")
                .text(function(d) { return d.data.name; });
            if(document.getElementById("nocolor").checked){
                d3.selectAll("circle").style("fill", "#CCCCCC");
            }
            else{
                d3.selectAll("circle").style("fill", color)
            }



        }

        function color_continent() {
             d3.selectAll("circle.node").style("fill", color )
        }

        function color_nocolor() {
            d3.selectAll("circle.node").style("fill", "#CCCCCC");
        }

        color_continent()


    }

    function radial_layout() {

        radial_selected = true;
        d3.select('svg').remove();

        d3.select("input#radial").on("click", radial_layout);
        d3.select("input#tree").on("click", tree_layout);
        //
        d3.select("input#nocolor").on("click", color_nocolor);
        d3.select("input#color_cont").on("click", color_continent);
        //
        //
        d3.select("input#sort_pop").on("click", sort_population);
        d3.select("input#sort_gdp").on("click", sort_gdp);
        d3.select("input#sort_cont").on("click", sort_continent);





        var root=d3.hierarchy(dataset);

        if(sort_by_gdp){root.sum(function(d) { return d.gdp})
            .sort(function (a,b) {return  a.value - b.value;});
        }
        else if (sort_by_pop){root.sum(function(d) { return d.population})
        .sort(function (a,b) {return  a.value - b.value;});
                console.log(root)

        }

        else{root.sum(function(d) { return d.gdp})
                .sort(function (a,b) {return  a.data["name"] - b.data["name"];});
            }



       var tree = d3.tree()
          .size([360, 350 ]);

       function project(x, y) {
            var angle = x / 180 * Math.PI, radius = y;
            return [radius * Math.cos(angle), radius * Math.sin(angle)];
        }
       function linkgen(d) {
          return "M" + project(d.source.x, d.source.y)
              + "C" + project(d.source.x,(d.source.y + d.target.y) / 2)
              + " " + project(d.target.x,(d.source.y + d.target.y) / 2)
              + " " + project(d.target.x,d.target.y);
       }
       function color(d) {

        var EuroColor = "#6699cc";
        var AfricaColor = "#cc8242";
        var AmericaColor = "#cc1d92";
        var AsiaColor = "#74cc3a";
        var OcColor = "#cc2e24";

        if (d.data["name"] === "World"){return "black"}
        if(d.data["name"] === "Europe"){return EuroColor}
        if(d.data["name"] === "Africa"){return AfricaColor}
        if(d.data["name"] === "Americas"){return AmericaColor}
        if(d.data["name"] === "Asia"){return AsiaColor}
        if(d.data["name"] === "Oceania"){return OcColor}

        if(d.parent.data["name"] === "Europe"){return EuroColor}
        if(d.parent.data["name"] === "Africa"){return AfricaColor}
        if(d.parent.data["name"] === "Americas"){return AmericaColor}
        if(d.parent.data["name"] === "Asia"){return AsiaColor}
        if(d.parent.data["name"] === "Oceania"){return OcColor}

    }


        var svg = d3.select("body")
               .append("svg")
               .attr("width", 2000)
               .attr("height", 1400)
               .append("g")
                .attr("transform", "translate(" + 1.3*600 + "," + 1.1*385 + ")");


        nodes = tree(root).descendants();
        links = tree(root).links();

        //Create edges as lines

        var link = svg.selectAll("path")
                .data(links)
                .enter()
                .append("path")
                .attr("class", "link")
                .attr("d", linkgen)
                .style("stroke", "#ccc")
                .style("stroke-width", 1.5)
                .style("fill", "none");



        //Create nodes as circles
        var node = svg.selectAll("circle")
            .data(nodes)
            .enter()
            .append("circle")
                .attr("class","node")
            .attr("r", 9)
            // .attr("r", function(d) { return d.children ? 4.5 : sort_by_pop? Math.sqrt(Math.sqrt(d.value)) /7 : Math.sqrt(Math.sqrt(rScale(d.value)))  ; })
            .attr("transform", function(d) { return "translate(" + project(d.x, d.y) + ")"; })
            // .style("fill", color)
            .style("stroke", "blue")
            .on("mousemove", function(d) {

            d3.select(this)
            .attr("fill", "#ccc");

            var xPosition = d3.event.pageX;
            var yPosition = d3.event.pageY;

            d3.select("#tooltip")
            .style("left",  xPosition + "px")
            .style("top",yPosition+ "px")
            .select('#name')
            .style("font", "14px sans-serif")
            .text(d.data["name"]);

            d3.select("#tooltip").select("#valueG")
            .style("font", "10px sans-serif")
            .text("GDP(2012): " + d.data.gdp);


            function popTotal(x) {
                var ppp = 0;
                var popL = [];
                 x.map(function (d) {
                        ppp=ppp+parseInt(d.data.population);
                        popL.push(ppp);
                 });
                 return popL[popL.length - 1]

        }


            d3.select("#tooltip").select("#valueP")
            .style("font", "10px sans-serif")
            .text(d.children ? "Population(2012): " +  popTotal(d.children)
                : "Population(2012): " + d.data["population"]);

            d3.select("#tooltip").classed("hidden", false);
        })
            .on("mouseout", function() {
                d3.select(this)
                .transition()
                .duration(250);

                d3.select("#tooltip").classed("hidden", true);
            })
            .on("click",function (d) {

                var cont = ["World", "Europe","Africa", "Asia", "Americas","Oceania"];
                if(cont.includes(d.data["name"])){click(d)}
                else {
                if(d3.select("#tooltipLine").classed("hidden") === true ){
                d3.select(this)
                .attr("fill", "#ccc");

                var xPosition = d3.event.pageX -425;
                var yPosition = d3.event.pageY;

                d3.select("#tooltipLine")
                .style("position", "absolute")
                .style("left",  xPosition + "px")
                .style("top",yPosition+ "px");

                d3.select("#tooltipLine").classed("hidden", false);

                function lineChart(){

                    var Thiscountry = d.data["name"];

                    var w = 600;
                    var h = 300;
                    var padding = 20;

                    if(d.parent["data"]["name"] === "Europe"){var datt = EuroFull;}
                    if(d.parent["data"]["name"] === 'Africa'){ datt = AafricaFull;}
                    if(d.parent["data"]["name"] === 'Asia'){ datt = AsiaFull;}
                    if(d.parent["data"]["name"] === 'Americas'){ datt = AmericaFull;}
                    if(d.parent["data"]["name"] === 'Oceania'){ datt = OceFull;}

                    // console.log(datt[Thiscountry]);

                    var dataset = datt[Thiscountry].map(function (d) {return [d[0],d[1]]});
                    var years = ['2000', '2001', '2002', '2003', '2004', '2005',
                    '2006', '2007', '2008', '2009', '2010', '2011', '2012'];


                    // console.log(dataset);

                    var xScale = d3.scaleLinear()
                        .domain([d3.min(dataset, function(d) { return d[0]; }), d3.max(dataset, function(d) { return d[0]; })])
                        .range([padding, w/1.5-padding]);

                    var yScale = d3.scaleLinear()
                           .domain([0, d3.max(dataset, function(d) { return d[1]; })])
                           .range([h/2-padding, padding]);

                    var xAxis = d3.axisBottom(xScale)     // a function to create an axis
                       .ticks(dataset.length)  //Set  # of ticks
                       .tickFormat(d3.format(".0f")) ;


                    var linex = d3.line()
                        .x(function(d) { return xScale(d[0]); })
                        .y(function(d) { return yScale(d[1]); })
                        .curve(d3.curveLinear);



                    var svg2 = d3.select("div#tooltipLine")
                        .append("svg")
                        .attr("width", w/1.5)
                        .attr("height", h/2)
                        .style("float", "right");

                    svg2.append("g")
                        .attr("class", "axis")
                        .attr("transform", "translate(0," + (h/2 - padding) + ")")
                        .call(xAxis);

                    svg2.append("path")
                        .attr("class", "line1")
                        .attr("d", linex(dataset));

                    var legend = svg2.
                        append("g")
                        .attr("class", "legend")
                        .attr("transform", "translate(50,0)");

                    legend.append("text")
                        .attr("x", 100)
                        .attr("y", 10)
                        .attr("dy", ".20em")
                        .style("text-anchor", "end")
                        .style("font-size", "12")
                        // .attr("transform", "rotate(-45)")
                        .text(Thiscountry + " - GDP Trend");

                }
                lineChart()
                }
                }
            })
            .on("mouseout", function() {
                d3.select(this)
                .transition()
                .duration(250)

                d3.select("#tooltipLine").select('svg').remove();
                d3.select("#tooltipLine").classed("hidden", true);
                d3.select("#tooltip").classed("hidden", true);
            });




               function projectTXT(x, y) {
            var angle = x/ 180 * Math.PI, radius = y;
            return [radius * Math.cos(angle), radius * Math.sin(angle)];
        }

        var label = svg.selectAll("text")
            .data(nodes)
            .enter()

            .append("text")
            .attr("class", "label")
            .style("font", "10px sans-serif")
            .attr("transform", function(d) { return "translate(" + projectTXT(d.x, d.y+10) + ")rotate(" + (d.x < 180 ? d.x  : d.x )+ ")"; })
            // .style("text-anchor", function(d) { return d.x < 180 === !d.children ? "start" : "end"; })

            .text(function(d) { return d.data.name; });



        function click(d) {

        //If the node has children, make a copy of children to _children and delete the children
        //If it has no child, restore the original children or do nothing if it is leaf node
        if (d.children) {
            d._children = d.children;
            d.children = null;

        } else {
                d.children = d._children;
                d._children = null;
        }

        //make a copy of current location of all nodes so later they can stay at their  current locations
       nodes.forEach(function(element) {
            element._x=element.x
            element._y=element.y
        });

       // re-create nodes/edges after removing child of the current node
       nodes = tree(root).descendants(),
       links = tree(root).links();

       // tree layout changed the location of nodes. Move them back to the original location
       nodes.forEach(function(element) {
            element.x=element._x
            element.y=element._y
        });


        // re-bind the edges
        link = svg.selectAll("path.link")
            .data(links)
            .attr("d", linkgen);

        //Create new edges if necessary
        link.enter()
            .append("path")
            .attr("class", "link")
            .attr("d", linkgen)
            .style("stroke", "#ccc")
            .style("stroke-width", 1.5)
            .style("fill", "none");

        //Delete edges if necessart
        link.exit()
            .remove();


        var rScale = d3.scaleLinear()
            .domain([0, 142300000])
            .range([7, 15]);


        // re-bind the nodes
        node = svg.selectAll("circle.node")
            .data(nodes)
            .attr("r", 9)
            .attr("transform", function(d) { return "translate(" + project(d.x, d.y) + ")"; });
            // .attr("r", function(d) { return d.children ? 4.5 : sort_by_pop? Math.sqrt(Math.sqrt(d.value)) /7 : Math.sqrt(Math.sqrt(rScale(d.value)))  ; })


        //remove nodes if necessary
        node.exit()
            .remove();

        //Create new nodes if necessary
        node.enter()
            .append("circle")
            .attr("class", "node")
            .attr("transform", function(d) { return "translate(" + project(d.x, d.y) + ")"; })
            .attr("r", 9)
            // .attr("r", function(d) { return d.children ? 4.5 : sort_by_pop? Math.sqrt(Math.sqrt(d.value)) /7 : Math.sqrt(Math.sqrt(rScale(d.value)))  ; })
            // .style("fill", color )
            .style("stroke", "blue")
            .on("mousemove", function(d) {

            d3.select(this)
            .attr("fill", "#ccc");

            var xPosition = d3.event.pageX;
            var yPosition = d3.event.pageY;

            d3.select("#tooltip")
            .style("left",  xPosition + "px")
            .style("top",yPosition+ "px")
            .select('#name')
            .style("font", "14px sans-serif")
            .text(d.data["name"]);

            d3.select("#tooltip").select("#valueG")
            .style("font", "10px sans-serif")
            .text("GDP(2012): " + d.data.gdp);


            function popTotal(x) {
                var ppp = 0;
                var popL = [];
                 x.map(function (d) {
                        ppp=ppp+parseInt(d.data.population);
                        popL.push(ppp);
                 });
                 return popL[popL.length - 1]

        }


            d3.select("#tooltip").select("#valueP")
            .style("font", "10px sans-serif")
            .text(d.children ? "Population(2012): " +  popTotal(d.children)
                : "Population(2012): " + d.data["population"]);

            d3.select("#tooltip").classed("hidden", false);
        })
            .on("mouseout", function() {
                d3.select(this)
                .transition()
                .duration(250);

                d3.select("#tooltip").classed("hidden", true);
            })
            .on("click",function (d) {

                var cont = ["World", "Europe","Africa", "Asia", "Americas","Oceania"];
                if(cont.includes(d.data["name"])){click(d)}
                else {
                if(d3.select("#tooltipLine").classed("hidden") === true ){
                d3.select(this)
                .attr("fill", "#ccc");

                var xPosition = d3.event.pageX -425;
                var yPosition = d3.event.pageY;

                d3.select("#tooltipLine")
                .style("position", "absolute")
                .style("left",  xPosition + "px")
                .style("top",yPosition+ "px");

                d3.select("#tooltipLine").classed("hidden", false);

                function lineChart(){

                    var Thiscountry = d.data["name"];

                    var w = 600;
                    var h = 300;
                    var padding = 20;

                    if(d.parent["data"]["name"] === "Europe"){var datt = EuroFull;}
                    if(d.parent["data"]["name"] === 'Africa'){ datt = AafricaFull;}
                    if(d.parent["data"]["name"] === 'Asia'){ datt = AsiaFull;}
                    if(d.parent["data"]["name"] === 'Americas'){ datt = AmericaFull;}
                    if(d.parent["data"]["name"] === 'Oceania'){ datt = OceFull;}

                    // console.log(datt[Thiscountry]);

                    var dataset = datt[Thiscountry].map(function (d) {return [d[0],d[1]]});
                    var years = ['2000', '2001', '2002', '2003', '2004', '2005',
                    '2006', '2007', '2008', '2009', '2010', '2011', '2012'];


                    // console.log(dataset);

                    var xScale = d3.scaleLinear()
                        .domain([d3.min(dataset, function(d) { return d[0]; }), d3.max(dataset, function(d) { return d[0]; })])
                        .range([padding, w/1.5-padding]);

                    var yScale = d3.scaleLinear()
                           .domain([0, d3.max(dataset, function(d) { return d[1]; })])
                           .range([h/2-padding, padding]);

                    var xAxis = d3.axisBottom(xScale)     // a function to create an axis
                       .ticks(dataset.length)  //Set  # of ticks
                       .tickFormat(d3.format(".0f")) ;


                    var linex = d3.line()
                        .x(function(d) { return xScale(d[0]); })
                        .y(function(d) { return yScale(d[1]); })
                        .curve(d3.curveLinear);



                    var svg2 = d3.select("div#tooltipLine")
                        .append("svg")
                        .attr("width", w/1.5)
                        .attr("height", h/2)
                        .style("float", "right");

                    svg2.append("g")
                        .attr("class", "axis")
                        .attr("transform", "translate(0," + (h/2 - padding) + ")")
                        .call(xAxis);

                    svg2.append("path")
                        .attr("class", "line1")
                        .attr("d", linex(dataset));

                    var legend = svg2.
                        append("g")
                        .attr("class", "legend")
                        .attr("transform", "translate(50,0)");

                    legend.append("text")
                        .attr("x", 100)
                        .attr("y", 10)
                        .attr("dy", ".20em")
                        .style("text-anchor", "end")
                        .style("font-size", "12")
                        // .attr("transform", "rotate(-45)")
                        .text(Thiscountry + " - GDP Trend");

                }
                lineChart()
                }
                }
            })
            .on("mouseout", function() {
                d3.select(this)
                .transition()
                .duration(250)

                d3.select("#tooltipLine").select('svg').remove();
                d3.select("#tooltipLine").classed("hidden", true);
                d3.select("#tooltip").classed("hidden", true);
            });


        // re-bind the nodes
        label = svg.selectAll("text.label")
            .data(nodes)
            .attr("transform", function(d) { return "translate(" + projectTXT(d.x, d.y+10) + ")rotate(" + (d.x < 180 ? d.x  : d.x )+ ")"; })
            // .style("text-anchor", function(d) { return d.y < 180 === !d.children ? "start" : "end"; })
            .style("font", "10px sans-serif")
            .text(function(d) { return d.data.name; });

        //remove labels if necessary
        label.exit()
            .remove();

        //Create new labels if necessary
        label.enter()
            .append("text")
            .attr("class", "label")
            .attr("transform", function(d) { return "translate(" + projectTXT(d.x, d.y+10) + ")rotate(" + (d.x < 180 ? d.x  : d.x )+ ")"; })
            // .style("text-anchor", function(d) { return d.y < 180 === !d.children ? "start" : "end"; })
            .style("font", "10px sans-serif")
            .text(function(d) { return d.data.name; });

            if(document.getElementById("nocolor").checked){
                d3.selectAll("circle").style("fill", "#CCCCCC");
            }
            else{
                d3.selectAll("circle").style("fill", color)
            }
    }

        function color_continent() {
             d3.selectAll("circle.node").style("fill", color )
        }
        function color_nocolor() {
            d3.selectAll("circle.node").style("fill", "#CCCCCC");
        }

        function sort_gdp() {
            sort_by_gdp = true;
            sort_by_pop = false;

            if (radial_selected) {
                radial_layout();
            }
        }
        function sort_population() {
            sort_by_pop = true;
            sort_by_gdp = false;

            if (radial_selected) {
                radial_layout();
            }

        }
        function sort_continent() {
            sort_by_gdp = false;
            sort_by_pop = false;

            if (radial_selected) {
                radial_layout();
            }
        }
        color_continent()




    }

    /*****************************/

    function color_continent() {
         d3.selectAll("circle.node").style("fill", color )
    }

    function color_nocolor() {
        d3.selectAll("circle.node").style("fill", "#CCCCCC");
    }

    /*****************************/

    function sort_gdp() {
        sort_by_gdp = true;
        sort_by_pop = false;

        if (radial_selected) {
					radial_layout();
                }
    }

    function sort_population() {
        sort_by_pop = true;
        sort_by_gdp = false;
        if (radial_selected) {
        radial_layout();
    }

    }

    function sort_continent() {
        sort_by_gdp = false;
        sort_by_pop = false;

        if (radial_selected) {
                radial_layout();
            }
    }

    /*****************************/

    color_continent()


});