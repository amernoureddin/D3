/**
 * Created by amernoureddin on 11-Apr-17.
 */


var dataEuro = {};
var dataAfrica = {};
var dataAmeric = {};
var dataAsia = {};
var dataOcean = {};


var EuroFull = {};
var AafricaFull = {};
var AmericaFull = {};
var AsiaFull = {};
var OceFull = {};




var data = d3.json("countries.json", function(json) {

    json.map(function (d) {
        if (d.continent === "Europe"){EuroFull[d.name] = d.years.slice(5,18).map(function (d) {

            return d.gdp

        })}
        if (d.continent === "Africa"){AafricaFull[d.name] = d.years.slice(5,18).map(function (d) {
            return d.gdp

        })}
        if (d.continent === "Americas"){AmericaFull[d.name] = d.years.slice(5,18).map(function (d) {
            return d.gdp

        })}
        if (d.continent === "Asia"){AsiaFull[d.name] = d.years.slice(5,18).map(function (d) {
            return d.gdp

        })}
        if (d.continent === "Oceania"){OceFull[d.name] = d.years.slice(5,18).map(function (d) {
            return d.gdp

        })}

    });

    json.map(function (d) {
       if (d.continent === "Europe"){dataEuro[d.name] = d.years[17].gdp;}
        if (d.continent === "Africa"){dataAfrica[d.name] = d.years[17].gdp}
        if (d.continent === "Americas"){dataAmeric[d.name] = d.years[17].gdp}
        if (d.continent === "Asia"){dataAsia[d.name] = d.years[17].gdp}
        if (d.continent === "Oceania"){dataOcean[d.name] = d.years[17].gdp}

    });




    console.log(EuroFull);
    console.log(AafricaFull);
    console.log(AmericaFull);
    console.log(AsiaFull);
    console.log(OceFull);

    console.log(dataEuro);
    console.log(dataAfrica);
    console.log(dataAmeric);
    console.log(dataAsia);
    console.log(dataOcean);

    var w = 800;
    var h = 800;
    var padding = 50;

    var svg = d3.select("body")
        .append("svg")
        .attr("width", w)
        .attr("height", h);


/////////////

    var dataCombo = ["Europe", "Africa", "Americas", "Asia", "Oceania"];

    var select = d3.select('body')
        .append('select')
        .attr('class','select')
        .on('change',onchange);

    var options = select
        .selectAll('option')
        .data(dataCombo).enter()
        .append('option')
        .text(function (d) { return d; });



    d3.select("body").selectAll("input")
    .data(sortObject(dataEuro).reverse().slice(0,10))
    .enter()
    .append('label')
    .attr('for',function(d,i){ return 'a'+i; })
    .text(function(d) { return d.key; })
    .append("input")
    .attr("checked", true)
    .attr("type", "checkbox")
    .attr("id",  "cb")
    .attr("name", "ckbx");
    d3.selectAll("#cb").on("click", function () {

        selectValue = d3.select('select').property('value');

        if(selectValue === 'Europe'){dataset = dataEuro;var datafull = EuroFull}
        if(selectValue === 'Africa'){dataset = dataAfrica;var datafull = AafricaFull}
        if(selectValue === 'Asia'){dataset = dataAsia;var datafull = AsiaFull}
        if(selectValue === 'Americas'){dataset = dataAmeric;var datafull = AmericaFull}
        if(selectValue === 'Oceania'){dataset = dataOcean;var datafull = OceFull}

        var checkboxes = document.getElementsByName("ckbx");
        var checkboxesChecked = [];
        for (var i=0; i<checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                checkboxesChecked.push(checkboxes[i].parentNode.textContent);
            }
        }


        ListTopTenObj = sortObject(dataset).reverse().slice(0,10);

        var gdps = [];
        ListTopTenObj.forEach(function (d) {
        if(checkboxesChecked.includes(d.key)){
            gdps.push(d.value)}
        });

        ////34e343////
        d3.select('g.pie').remove();
        var pie = d3.pie();
        var color = d3.scaleOrdinal(d3.schemeCategory10);

        var outerRadius = 200;
        var innerRadius = 0;
        var arc = d3.arc()
                    .innerRadius(innerRadius)
                    .outerRadius(outerRadius);
        var arcText = d3.arc()
                    .innerRadius(0)
                    .outerRadius(430);

        var arcs = svg.append("g")
            .attr("class", "pie")
            .attr("transform", "translate(" + 400 + ", " + 300 + ")")
            .selectAll("path")
            .data(pie(gdps))
            .enter();

        arcs.append("path")
            .attr("d", function(d) {
                  return arc(d);
             })
            .attr("class", "arc")
            .attr("fill", function(d, i) {
                    return color(i);
            })
            .on("mousemove", function(d) {
                d3.select(this)
                .attr("fill", "#ccc");

                var xPosition = d3.event.clientX;
                var yPosition = d3.event.clientY;

                d3.select("#tooltip")
                .style("left",  xPosition + "px")
                .style("top",yPosition+ "px")
                .select('#name')
                .text(checkboxesChecked[d.index]);

                d3.select("#tooltip").select("#value")
                .text(d.value);

                d3.select("#tooltip").classed("hidden", false);
            })
            .on("mouseout", function() {
                d3.select(this)
                .transition()
                .duration(250)
                .attr("fill", function(d) {
                    return color(d.index);
                });
                d3.select("#tooltip").classed("hidden", true);
            })
            .on("dblclick",function (d) {
                d3.select(this)
                .attr("fill", "#ccc");

                var xPosition = d3.event.clientX -525;
                var yPosition = d3.event.clientY;

                d3.select("#tooltipLine")
                .style("position", "absolute")
                .style("left",  xPosition + "px")
                .style("top",yPosition+ "px");

                d3.select("#tooltipLine").classed("hidden", false);


                var country = checkboxesChecked[d.index];
                console.log(country);
                console.log(color(this));
                function lineChart(country){

var w = 600;
var h = 300;
var padding = 20;

var dataset =datafull[country];
var years = ['2000', '2001', '2002', '2003', '2004', '2005',
'2006', '2007', '2008', '2009', '2010', '2011', '2012'];


console.log(dataset)
console.log(d3.max(dataset)/10000000000);

// var dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
//        11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ];


var xScale = d3.scaleLinear()
            .domain([0,dataset.length-1])
           .range([padding, w/1.5-padding]);
var xScaleB = d3.scaleBand()
           .domain(years)
           .range([padding, w/1.5-padding])
            .padding(0.09);

var yScale = d3.scaleLinear()
           .domain([0, d3.max(dataset)])
           .range([h/2-padding, padding]);



//Define X axis
var xAxis = d3.axisBottom(xScaleB)     // a function to create an axis
       .ticks(8);                //Set  # of ticks
//Define Y axis
var yAxis = d3.axisLeft(yScale)
          .ticks(10);

var area_generator = d3.area()

        .x(function(d, i) {return xScale(i); })
        .y0(yScale(100))
        .y1(function(d) { return yScale(d); })
        .curve(d3.curveLinear);


var svg2 = d3.select("div#tooltipLine")
        .append("svg")
        .attr("width", w/1.5)
        .attr("height", h/2)
.style("float", "right");


//Create X axis
svg2.append("g")  // add a group element to the svg
.attr("class", "axis") //Assign class "axis" to group
.attr("transform", "translate(0," + (h/2 - padding) + ")")  // transform/shift the axis to bottom
.call(xAxis);   // call the axis function we generated on this group. So it will create & add axis to the group

//Create Y axis
svg2.append("g")
.attr("class", "axis")
.attr("transform", "translate(" + padding + ",0)")  // shift the axis to right
.call(yAxis);

svg2.append("path")
.attr("class", "area1")
.attr("d", area_generator(dataset))

var legend = svg2.
append("g")
.attr("class", "legend")
.attr("transform", "translate(50,0)");


// legend.append("circle")
//     .attr("cx", 5 )
//     .attr("cy", 10)
//     .attr("r", 5);
//     // .style("fill", c);

legend.append("text")
.attr("x", 100)
.attr("y", 10)
.attr("dy", ".20em")
.style("text-anchor", "end")
.style("font-size", "12")
// .attr("transform", "rotate(-45)")
.text(country + " GDP");


}

                lineChart(country)
            })
            .on("mouseout", function() {
                                d3.select(this)
                                .transition()
                                .duration(250)
                                .attr("fill", function(d) {
                                    return color(d.index);
                                });
                                d3.select("#tooltipLine").select('svg').remove();
                                d3.select("#tooltipLine").classed("hidden", true);
                                d3.select("#tooltip").classed("hidden", true);
            })
            .on("click", function (d) {


                            d3.select(this)
          		  	        .attr("fill", "#ccc");

					        var xPosition = d3.event.clientX +20;
                            var yPosition = d3.event.clientY ;

                            d3.select("#tooltipStack")
                            .style("position", "absolute")
                            .style("left",  xPosition + "px")
                            .style("top",yPosition+ "px");
                            // .select('#name')
                            // .text(Object.values(ListTopTenObj)[d.index].key);

                            // d3.select("#tooltip").select("#value")
                            // .text(d.value);

                            d3.select("#tooltipStack").classed("hidden", false);


                            var country = Object.values(ListTopTenObj)[d.index].key;
                            console.log(country);
                            console.log(color(this));

                            function stackChart(listO) {




        var w = 600;
		var h = 300;
		var padding = 23;

		var dataset = listO;
        // var dataset=    [
			// 	{ apples: 5, oranges: 10, grapes: 22 },
        // 		{ apples: 4, oranges: 12, grapes: 28 },
        // 		{ apples: 2, oranges: 19, grapes: 32 },
        // 		{ apples: 7, oranges: 23, grapes: 35 },
        // 		{ apples: 23, oranges: 1, grapes: 13 } ];



            var kiz = checkboxesChecked;
                    var years = ['2000', '2001', '2002', '2003', '2004', '2005',
        '2006', '2007', '2008', '2009', '2010', '2011', '2012'];
			var stack = d3.stack()
				          .keys(kiz)
				          //.offset(d3.stackOffsetSilhouette)
						  .offset(d3.stackOffsetExpand)
						  .order(d3.stackOrderReverse);
            // use stack generator to create new dataset
			stack_data=stack(dataset);

            // create a band scale to equally divide the whole horizontal svg dimension to the stacked bars

                var xScaleB = d3.scaleBand()
                       .domain(years)
               		   .range([padding, w/1.5 - padding])
                        .padding(0.09);

			var xScale = d3.scaleBand()
				.domain(d3.range(stack_data[0].length))
        		.rangeRound([padding, w/1.5 - padding])
		       	.padding(0.05);

			// find the max height the bars will get stacked and scale that range to the whole vertical svg dimension
			var yScale = d3.scaleLinear()
				.domain([ d3.min(stack_data, function(d) {
						return d3.min(d, function(d) {
							return d[0];
						});
					}),
					d3.max(stack_data, function(d) {
						return d3.max(d, function(d) {
							return d[1];
						});
					})
				])
				.range([padding, h/2 - padding]);

			// create an ordinal scale for 10 different colors
			var colors = d3.scaleOrdinal(d3.schemeCategory10);

			var svg = d3.select("div#tooltipStack")
				  .append("svg")
				  .attr("width", w/1.5)
				  .attr("height", h/2);

            svg.selectAll("g")
               .data(stack_data)
               .enter()
               .append("g")
               .attr("class", "stacked_bars")
	    	   .attr("fill", function(d, i) {
     		   	    return colors(i);
    		   	})
               .selectAll("rect")
			   .data(function(d) { return d; })
			   .enter()
			   .append("rect")
			   .attr("x", function(d, i) {
					return xScale(i);
			   })
			   .attr("y", function(d) {
					return yScale(d[0]);
			   })
			   .attr("height", function(d) {
					return yScale(d[1])-yScale(d[0]);
			   })
			   .attr("width", xScale.bandwidth());

        var xAxis = d3.axisBottom(xScaleB)     // a function to create an axis
				   .ticks(8);

            svg.append("g")  // add a group element to the svg
            .attr("class", "axis") //Assign class "axis" to group
            .attr("transform", "translate(0," + (h/2 - padding) + ")")  // transform/shift the axis to bottom
            .call(xAxis);   // call the axis function we generated on this group. So it will create & add axis to the group

            var legend = svg.selectAll(".legend")
        .data(kiz)
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { return "translate(" + i * 15 + ",-30)"; });


    legend.append("circle")
        .attr("cx", 175 )
        .attr("cy", 33)
        .attr("r", 3)
        .data(kiz)
        .style("fill", function(d, i) {
     		   	    return colors(i);
    		   	});

    legend.append("text")
        .attr("x", h-200)
        .attr("y", h-150)
        .attr("dy", ".20em")
        .style("font-size","0.6em")
        .style("text-anchor", "end")
        // .style("font-size", "10")

        .attr("transform", "rotate(-45)")
        .style("font-family","monospace")
        .text(function(d,i) { return kiz[i];});




        // var legend = svg.selectAll(".legend")
        //     .data(kiz)
        //     .enter().append("g")
        //     .attr("class", "legend")
        // .attr("transform", function(d, i) { return "translate(0,"+ i * 10 + ")"; });
        //
        // legend.append("circle")
        //     .attr("cx", 10 )
        //     .attr("cy", 10)
        //     .attr("r", 4)
        //     .style("fill", color);
        // legend.append("text")
        // .attr("x", 10)
        // .attr("y", 20)
        //     .style("font-size", "9")
        // .attr("dy", ".20em")
        // .style("text-anchor", "end")
        // // .attr("transform", "rotate(-45)")
        // .text(function(d) { return d;});

    }
                            function listOfObStack(C) {
        var lo = [{},{},{},{},{},{},{},{},{},{},{},{},{}];
        for(var j = 0; j < C.length; j++){
            var country = C[j];
            for(var k =0; k < json.length; k++){
                if(json[k]["name"] === country){
                    var years_ = json[k]["years"].slice(5);
                    for(var p = 0; p < 13; p++){
                        lo[p][country] = years_[p]["gdp"]
                    }
                }
            }
        }
    return lo;
    }
                            stackChart(listOfObStack(checkboxesChecked))


        })
            .on("mouseout", function(d) {
                            d3.select(this)
                            .transition()
                            .duration(250)
                            .attr("fill", function(d) {
                                return color(d.index);
                            });
                            d3.select("#tooltipLine").select('svg').remove();
                            d3.select("#tooltipLine").classed("hidden", true);
                            d3.select("#tooltip").classed("hidden", true);
                            d3.select("#tooltipStack").select('svg').remove();
                            d3.select("#tooltipStack").classed("hidden", true);

        });

       // Add text to each wedge

        arcs.append("text")
                .attr("transform", function(d) {
                    return "translate(" + arcText.centroid(d) + ")";
                })
                .attr("text-anchor", "middle")
                .text(function(d, i) {
                    return checkboxesChecked[i]
                });


    });





    function getCheckedBoxes(d) {
      var checkboxes = document.getElementsByName("ckbx");
       checkboxesChecked = [];
      // loop over them all
      for (var i=0; i<checkboxes.length; i++) {
         // And stick the checked ones onto an array...
         if (checkboxes[i].checked) {

            checkboxesChecked.push(checkboxes[i].parentNode.textContent);
         }
      }

      ListTopTenObj = sortObject(d).reverse().slice(0,10);

      gdps = [];
        ListTopTenObj.forEach(function (d) {
            console.log(checkboxesChecked.includes(d.key))
            if(checkboxesChecked.includes(d.key)){

            gdps.push(d.value)}
        });

        console.log(gdps)

      // Return the array if it is non-empty, or null
      // return checkboxesChecked.length > 0 ? checkboxesChecked : null;
}
    getCheckedBoxes(dataEuro);



    function onchange() {

        selectValue = d3.select('select').property('value');

        if(selectValue === 'Europe'){dataset = dataEuro;var datafull = EuroFull}
        if(selectValue === 'Africa'){dataset = dataAfrica;var datafull = AafricaFull}
        if(selectValue === 'Asia'){dataset = dataAsia;var datafull = AsiaFull}
        if(selectValue === 'Americas'){dataset = dataAmeric;var datafull = AmericaFull}
        if(selectValue === 'Oceania'){dataset = dataOcean;var datafull = OceFull}



        function sortObject(obj) {
    var arr = [];
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            arr.push({
                'key': prop,
                'value': obj[prop]
            });
        }
    }
    arr.sort(function(a, b) { return a.value - b.value; });
    //arr.sort(function(a, b) { a.value.toLowerCase().localeCompare(b.value.toLowerCase()); }); //use this to sort as strings
    return arr; // returns array
}
        var ListTopTenObj = sortObject(dataset).reverse().slice(0,10);
        var gdps = [];
        ListTopTenObj.forEach(function (d) {
                gdps.push(d.value)
        });
        d3.selectAll('label').remove();
        d3.selectAll('input').remove();


            d3.select("body").selectAll("input")
    .data(sortObject(dataset).reverse().slice(0,10))
    .enter()
    .append('label')
    .attr('for',function(d,i){ return 'a'+i; })
    .text(function(d) { return d.key; })
    .append("input")
    .attr("checked", true)
    .attr("type", "checkbox")
    .attr("id",  "cb")
    .attr("name", "ckbx");
    d3.selectAll("#cb").on("click", function () {

                 selectValue = d3.select('select').property('value');

        if(selectValue === 'Europe'){dataset = dataEuro}
        if(selectValue === 'Africa'){dataset = dataAfrica}
        if(selectValue === 'Asia'){dataset = dataAsia}
        if(selectValue === 'Americas'){dataset = dataAmeric}
        if(selectValue === 'Oceania'){dataset = dataOcean}

         var checkboxes = document.getElementsByName("ckbx");
      var checkboxesChecked = [];
      // loop over them all
      for (var i=0; i<checkboxes.length; i++) {
         // And stick the checked ones onto an array...
         if (checkboxes[i].checked) {

            checkboxesChecked.push(checkboxes[i].parentNode.textContent);
         }
      }

      ListTopTenObj = sortObject(dataset).reverse().slice(0,10);

      gdps = [];
        ListTopTenObj.forEach(function (d) {
            console.log(checkboxesChecked.includes(d.key))
            if(checkboxesChecked.includes(d.key)){

            gdps.push(d.value)}
        });

        ////34e343////
            // create a group and under this group, bind data to paths
        d3.select('g').remove();
          var pie = d3.pie();
    var color = d3.scaleOrdinal(d3.schemeCategory10);

    var outerRadius = 200;
    var innerRadius = 0;
    var arc = d3.arc()
                .innerRadius(innerRadius)
                .outerRadius(outerRadius);
    var arcText = d3.arc()
                .innerRadius(0)
                .outerRadius(430);

    // create a group and under this group, bind data to paths
    var arcs = svg.append("g")
        .attr("class", "pie")
        .attr("transform", "translate(" + 400 + ", " + 300 + ")")
        .selectAll("path")
        .data(pie(gdps))
        .enter();

    // create path element for each wedge
    arcs.append("path")
        .attr("d", function(d) {
              return arc(d);
         })
        .attr("class", "arc")
        .attr("fill", function(d, i) {
                return color(i);
        })
        .on("mousemove", function(d) {
                    d3.select(this)
                    .attr("fill", "#ccc");

                    var xPosition = d3.event.clientX;
                    var yPosition = d3.event.clientY;

                    d3.select("#tooltip")
                    .style("left",  xPosition + "px")
                    .style("top",yPosition+ "px")
                    .select('#name')
                    .text(checkboxesChecked[d.index]);

                    d3.select("#tooltip").select("#value")
                    .text(d.value);

                    d3.select("#tooltip").classed("hidden", false);
        })
        .on("mouseout", function() {
                    d3.select(this)
                    .transition()
                    .duration(250)
                    .attr("fill", function(d) {
                        return color(d.index);
                    });
                    d3.select("#tooltip").classed("hidden", true);
        })
        .on("dblclick",function (d) {
            d3.select(this)
            .attr("fill", "#ccc");

            var xPosition = d3.event.clientX -425;
            var yPosition = d3.event.clientY;

            d3.select("#tooltipLine")
                .style("position", "absolute")
            .style("left",  xPosition + "px")
            .style("top",yPosition+ "px");
            // .select('#name')
            // .text(Object.values(ListTopTenObj)[d.index].key);

            // d3.select("#tooltip").select("#value")
            // .text(d.value);

            d3.select("#tooltipLine").classed("hidden", false);


            var country = checkboxesChecked[d.index];
            console.log(country);
            console.log(color(this));
            function lineChart(country){

                var w = 600;
                var h = 300;
                var padding = 20;

                var dataset =datafull[country];
                var years = ['2000', '2001', '2002', '2003', '2004', '2005',
                '2006', '2007', '2008', '2009', '2010', '2011', '2012'];


                var xScale = d3.scaleLinear()
                                .domain([0,dataset.length-1])
                               .range([padding, w/1.5-padding]);
                var xScaleB = d3.scaleBand()
                               .domain(years)
                               .range([padding, w/1.5-padding])
                                .padding(0.09);

                var yScale = d3.scaleLinear()
                               .domain([0, d3.max(dataset)])
                               .range([h/2-padding, padding]);


                //Define X axis
                var xAxis = d3.axisBottom(xScaleB)
                           .ticks(8);
                //Define Y axis
                var yAxis = d3.axisLeft(yScale)
                              .ticks(10);

                var area_generator = d3.area()

                            .x(function(d, i) {return xScale(i); })
                            .y0(yScale(100))
                            .y1(function(d) { return yScale(d); })
                            .curve(d3.curveLinear);


                var svg2 = d3.select("div#tooltipLine")
                            .append("svg")
                            .attr("width", w/1.5)
                            .attr("height", h/2)
                            .style("float", "right");


               //Create X axis
                svg2.append("g")  // add a group element to the svg
                    .attr("class", "axis") //Assign class "axis" to group
                    .attr("transform", "translate(0," + (h/2 - padding) + ")")  // transform/shift the axis to bottom
                    .call(xAxis);   // call the axis function we generated on this group. So it will create & add axis to the group

               //Create Y axis
                svg2.append("g")
                    .attr("class", "axis")
                    .attr("transform", "translate(" + padding + ",0)")  // shift the axis to right
                    .call(yAxis);

                svg2.append("path")
                    .attr("class", "area1")
                    .attr("d", area_generator(dataset))

                var legend = svg2.
                    append("g")
                    .attr("class", "legend")
                    .attr("transform", "translate(50,0)");


            // legend.append("circle")
            //     .attr("cx", 5 )
            //     .attr("cy", 10)
            //     .attr("r", 5);
            //     // .style("fill", c);

                legend.append("text")
                    .attr("x", 100)
                    .attr("y", 10)
                    .attr("dy", ".20em")
                    .style("text-anchor", "end")
                    .style("font-size", "12")
                    // .attr("transform", "rotate(-45)")
                    .text(country + " GDP");

            }


            lineChart(country)
        })
        .on("mouseout", function() {
                            d3.select(this)
                            .transition()
                            .duration(250)
                            .attr("fill", function(d) {
                                return color(d.index);
                            });
                            d3.select("#tooltipLine").select('svg').remove();
                            d3.select("#tooltipLine").classed("hidden", true);
                            d3.select("#tooltip").classed("hidden", true);
        })
        .on("click", function (d) {
                if(d3.select("#tooltipStack").classed("hidden") === true){

                            d3.select(this)
          		  	        .attr("fill", "#ccc");

					        var xPosition = d3.event.clientX ;
                            var yPosition = d3.event.clientY +65;

                            d3.select("#tooltipStack")
                            .style("position", "absolute")
                            .style("left",  xPosition + "px")
                            .style("top",yPosition+ "px");
                            // .select('#name')
                            // .text(Object.values(ListTopTenObj)[d.index].key);

                            // d3.select("#tooltip").select("#value")
                            // .text(d.value);

                            d3.select("#tooltipStack").classed("hidden", false);


                            var country = Object.values(ListTopTenObj)[d.index].key;
                            console.log(country);
                            console.log(checkboxesChecked);

                                function stackChart(listO) {




        var w = 600;
		var h = 300;
		var padding = 23;

		var dataset = listO;
        // var dataset=    [
			// 	{ apples: 5, oranges: 10, grapes: 22 },
        // 		{ apples: 4, oranges: 12, grapes: 28 },
        // 		{ apples: 2, oranges: 19, grapes: 32 },
        // 		{ apples: 7, oranges: 23, grapes: 35 },
        // 		{ apples: 23, oranges: 1, grapes: 13 } ];



            var kiz = checkboxesChecked;
                    var years = ['2000', '2001', '2002', '2003', '2004', '2005',
        '2006', '2007', '2008', '2009', '2010', '2011', '2012'];
			var stack = d3.stack()
				          .keys(kiz)
				          //.offset(d3.stackOffsetSilhouette)
						  .offset(d3.stackOffsetExpand)
						  .order(d3.stackOrderReverse);
            // use stack generator to create new dataset
			stack_data=stack(dataset);

            // create a band scale to equally divide the whole horizontal svg dimension to the stacked bars

                var xScaleB = d3.scaleBand()
                       .domain(years)
               		   .range([padding, w/1.5 - padding])
                        .padding(0.09);

			var xScale = d3.scaleBand()
				.domain(d3.range(stack_data[0].length))
        		.rangeRound([padding, w/1.5 - padding])
		       	.padding(0.05);

			// find the max height the bars will get stacked and scale that range to the whole vertical svg dimension
			var yScale = d3.scaleLinear()
				.domain([ d3.min(stack_data, function(d) {
						return d3.min(d, function(d) {
							return d[0];
						});
					}),
					d3.max(stack_data, function(d) {
						return d3.max(d, function(d) {
							return d[1];
						});
					})
				])
				.range([padding, h/2 - padding]);

			// create an ordinal scale for 10 different colors
			var colors = d3.scaleOrdinal(d3.schemeCategory10);

			var svg = d3.select("div#tooltipStack")
				  .append("svg")
				  .attr("width", w/1.5)
				  .attr("height", h/2);

            svg.selectAll("g")
               .data(stack_data)
               .enter()
               .append("g")
               .attr("class", "stacked_bars")
	    	   .attr("fill", function(d, i) {
     		   	    return colors(i);
    		   	})
               .selectAll("rect")
			   .data(function(d) { return d; })
			   .enter()
			   .append("rect")
			   .attr("x", function(d, i) {
					return xScale(i);
			   })
			   .attr("y", function(d) {
					return yScale(d[0]);
			   })
			   .attr("height", function(d) {
					return yScale(d[1])-yScale(d[0]);
			   })
			   .attr("width", xScale.bandwidth());

        var xAxis = d3.axisBottom(xScaleB)     // a function to create an axis
				   .ticks(8);

            svg.append("g")  // add a group element to the svg
            .attr("class", "axis") //Assign class "axis" to group
            .attr("transform", "translate(0," + (h/2 - padding) + ")")  // transform/shift the axis to bottom
            .call(xAxis);   // call the axis function we generated on this group. So it will create & add axis to the group

            var legend = svg.selectAll(".legend")
        .data(kiz)
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { return "translate(" + i * 15 + ",-30)"; });


    legend.append("circle")
        .attr("cx", 175 )
        .attr("cy", 33)
        .attr("r", 3)
        .data(kiz)
        .style("fill", function(d, i) {
     		   	    return colors(i);
    		   	});

    legend.append("text")
        .attr("x", h-200)
        .attr("y", h-150)
        .attr("dy", ".20em")
        .style("font-size","0.6em")
        .style("text-anchor", "end")
        // .style("font-size", "10")

        .attr("transform", "rotate(-45)")
        .style("font-family","monospace")
        .text(function(d,i) { return kiz[i];});




        // var legend = svg.selectAll(".legend")
        //     .data(kiz)
        //     .enter().append("g")
        //     .attr("class", "legend")
        // .attr("transform", function(d, i) { return "translate(0,"+ i * 10 + ")"; });
        //
        // legend.append("circle")
        //     .attr("cx", 10 )
        //     .attr("cy", 10)
        //     .attr("r", 4)
        //     .style("fill", color);
        // legend.append("text")
        // .attr("x", 10)
        // .attr("y", 20)
        //     .style("font-size", "9")
        // .attr("dy", ".20em")
        // .style("text-anchor", "end")
        // // .attr("transform", "rotate(-45)")
        // .text(function(d) { return d;});

    }

                            function listOfObStack(C) {
        var lo = [{},{},{},{},{},{},{},{},{},{},{},{},{}];
        for(var j = 0; j < C.length; j++){
            var country = C[j];
            for(var k =0; k < json.length; k++){
                if(json[k]["name"] === country){
                    var years_ = json[k]["years"].slice(5);
                    for(var p = 0; p < 13; p++){
                        lo[p][country] = years_[p]["gdp"]
                    }
                }
            }
        }
    return lo;
    }
                            stackChart(listOfObStack(checkboxesChecked))}


        })
        .on("mouseout", function(d) {
                            d3.select(this)
                            .transition()
                            .duration(250)
                            .attr("fill", function(d) {
                                return color(d.index);
                            });
                            d3.select("#tooltipLine").select('svg').remove();
                            d3.select("#tooltipLine").classed("hidden", true);
                            d3.select("#tooltip").classed("hidden", true);
                            d3.select("#tooltipStack").select('svg').remove();
                            d3.select("#tooltipStack").classed("hidden", true);

        });

   // Add text to each wedge

    arcs.append("text")
            .attr("transform", function(d) {
                return "translate(" + arcText.centroid(d) + ")";
            })
            .attr("text-anchor", "middle")
            .text(function(d, i) {
                return checkboxesChecked[i]
     });

    });
            // getCheckedBoxes(dataset)


    // create a group and under this group, bind data to paths
        d3.select('g').remove();
          var pie = d3.pie();
    var color = d3.scaleOrdinal(d3.schemeCategory10);

    var outerRadius = 200;
    var innerRadius = 0;
    var arc = d3.arc()
                .innerRadius(innerRadius)
                .outerRadius(outerRadius);
    var arcText = d3.arc()
                .innerRadius(0)
                .outerRadius(430);

    // create a group and under this group, bind data to paths
    var arcs = svg.append("g")
        .attr("class", "pie")
        .attr("transform", "translate(" + 400 + ", " + 300 + ")")
        .selectAll("path")
        .data(pie(gdps))
        .enter();

    // create path element for each wedge
    arcs.append("path")
        .attr("d", function(d) {
              return arc(d);
         })
        .attr("class", "arc")
        .attr("fill", function(d, i) {
                return color(i);
        })
        .on("mousemove", function(d) {
                    d3.select(this)
                    .attr("fill", "#ccc");

                    var xPosition = d3.event.clientX;
                    var yPosition = d3.event.clientY;

                    d3.select("#tooltip")
                    .style("left",  xPosition + "px")
                    .style("top",yPosition+ "px")
                    .select('#name')
                    .text(Object.values(ListTopTenObj)[d.index].key);

                    d3.select("#tooltip").select("#value")
                    .text(d.value);

                    d3.select("#tooltip").classed("hidden", false);
        })
        .on("mouseout", function() {
                    d3.select(this)
                    .transition()
                    .duration(250)
                    .attr("fill", function(d) {
                        return color(d.index);
                    });
                    d3.select("#tooltip").classed("hidden", true);
        })
        .on("dblclick",function (d) {
                            d3.select(this)
          		  	        .attr("fill", "#ccc");

					        var xPosition = d3.event.clientX -425;
                            var yPosition = d3.event.clientY;

                            d3.select("#tooltipLine")
                                .style("position", "absolute")
                            .style("left",  xPosition + "px")
                            .style("top",yPosition+ "px");
                            // .select('#name')
                            // .text(Object.values(ListTopTenObj)[d.index].key);

                            // d3.select("#tooltip").select("#value")
                            // .text(d.value);

                            d3.select("#tooltipLine").classed("hidden", false);


                            var country = Object.values(ListTopTenObj)[d.index].key;
                            console.log(country);
                            console.log(color(this));
                             function lineChart(country){

        var w = 600;
		var h = 300;
		var padding = 20;

        var dataset =datafull[country];
        var years = ['2000', '2001', '2002', '2003', '2004', '2005',
        '2006', '2007', '2008', '2009', '2010', '2011', '2012'];


        console.log(dataset)
        console.log(d3.max(dataset)/10000000000);

		// var dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
         //        11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ];


		var xScale = d3.scaleLinear()
                        .domain([0,dataset.length-1])
               		   .range([padding, w/1.5-padding]);
        var xScaleB = d3.scaleBand()
                       .domain(years)
               		   .range([padding, w/1.5-padding])
                        .padding(0.09);

        var yScale = d3.scaleLinear()
			           .domain([0, d3.max(dataset)])
			           .range([h/2-padding, padding]);



		//Define X axis
        var xAxis = d3.axisBottom(xScaleB)     // a function to create an axis
				   .ticks(8);                //Set  # of ticks
		//Define Y axis
		var yAxis = d3.axisLeft(yScale)
                  	  .ticks(10);

		var area_generator = d3.area()

    				.x(function(d, i) {return xScale(i); })
					.y0(yScale(100))
    				.y1(function(d) { return yScale(d); })
					.curve(d3.curveLinear);


		var svg2 = d3.select("div#tooltipLine")
            		.append("svg")
            		.attr("width", w/1.5)
            		.attr("height", h/2)
            .style("float", "right");


       //Create X axis
       svg2.append("g")  // add a group element to the svg
           .attr("class", "axis") //Assign class "axis" to group
           .attr("transform", "translate(0," + (h/2 - padding) + ")")  // transform/shift the axis to bottom
           .call(xAxis);   // call the axis function we generated on this group. So it will create & add axis to the group

	   //Create Y axis
	   svg2.append("g")
    	   .attr("class", "axis")
    	   .attr("transform", "translate(" + padding + ",0)")  // shift the axis to right
    	   .call(yAxis);

	   svg2.append("path")
      	  .attr("class", "area1")
      	  .attr("d", area_generator(dataset))

        var legend = svg2.
        append("g")
        .attr("class", "legend")
        .attr("transform", "translate(50,0)");


    // legend.append("circle")
    //     .attr("cx", 5 )
    //     .attr("cy", 10)
    //     .attr("r", 5);
    //     // .style("fill", c);

    legend.append("text")
        .attr("x", 100)
        .attr("y", 10)
        .attr("dy", ".20em")
        .style("text-anchor", "end")
        .style("font-size", "12")
        // .attr("transform", "rotate(-45)")
        .text(country + " GDP");


    }


                            lineChart(country)
        })
        .on("mouseout", function() {
                            d3.select(this)
                            .transition()
                            .duration(250)
                            .attr("fill", function(d) {
                                return color(d.index);
                            });
                            d3.select("#tooltipLine").select('svg').remove();
                            d3.select("#tooltipLine").classed("hidden", true);
                            d3.select("#tooltip").classed("hidden", true);
        })
        .on("click", function (d) {

        if(d3.select("#tooltipStack").classed("hidden") === true){
                            d3.select(this)
          		  	        .attr("fill", "#ccc");

					        var xPosition = d3.event.clientX ;
                            var yPosition = d3.event.clientY + 65;

                            d3.select("#tooltipStack")
                            .style("position", "absolute")
                            .style("left",  xPosition + "px")
                            .style("top",yPosition+ "px");
                            // .select('#name')
                            // .text(Object.values(ListTopTenObj)[d.index].key);

                            // d3.select("#tooltip").select("#value")
                            // .text(d.value);

                            d3.select("#tooltipStack").classed("hidden", false);


                            var country = Object.values(ListTopTenObj)[d.index].key;
                                var checkboxes = document.getElementsByName("ckbx");
                              var checkboxesChecked = [];
                              // loop over them all
                              for (var i=0; i<checkboxes.length; i++) {
                                 // And stick the checked ones onto an array...
                                 if (checkboxes[i].checked) {

                                    checkboxesChecked.push(checkboxes[i].parentNode.textContent);
                                 }
                              }

                            function stackChart(listO) {




        var w = 600;
		var h = 300;
		var padding = 23;

		var dataset = listO;
        // var dataset=    [
			// 	{ apples: 5, oranges: 10, grapes: 22 },
        // 		{ apples: 4, oranges: 12, grapes: 28 },
        // 		{ apples: 2, oranges: 19, grapes: 32 },
        // 		{ apples: 7, oranges: 23, grapes: 35 },
        // 		{ apples: 23, oranges: 1, grapes: 13 } ];
        var checkboxes = document.getElementsByName("ckbx");
          var checkboxesChecked = [];
          // loop over them all
          for (var i=0; i<checkboxes.length; i++) {
             // And stick the checked ones onto an array...
             if (checkboxes[i].checked) {

                checkboxesChecked.push(checkboxes[i].parentNode.textContent);
             }
          }




            var kiz = checkboxesChecked;
                    var years = ['2000', '2001', '2002', '2003', '2004', '2005',
        '2006', '2007', '2008', '2009', '2010', '2011', '2012'];
			var stack = d3.stack()
				          .keys(kiz)
				          //.offset(d3.stackOffsetSilhouette)
						  .offset(d3.stackOffsetExpand)
						  .order(d3.stackOrderReverse);
            // use stack generator to create new dataset
			stack_data=stack(dataset);

            // create a band scale to equally divide the whole horizontal svg dimension to the stacked bars

                var xScaleB = d3.scaleBand()
                       .domain(years)
               		   .range([padding, w/1.5 - padding])
                        .padding(0.09);

			var xScale = d3.scaleBand()
				.domain(d3.range(stack_data[0].length))
        		.rangeRound([padding, w/1.5 - padding])
		       	.padding(0.05);

			// find the max height the bars will get stacked and scale that range to the whole vertical svg dimension
			var yScale = d3.scaleLinear()
				.domain([ d3.min(stack_data, function(d) {
						return d3.min(d, function(d) {
							return d[0];
						});
					}),
					d3.max(stack_data, function(d) {
						return d3.max(d, function(d) {
							return d[1];
						});
					})
				])
				.range([padding, h/2 - padding]);

			// create an ordinal scale for 10 different colors
			var colors = d3.scaleOrdinal(d3.schemeCategory10);

			var svg = d3.select("div#tooltipStack")
				  .append("svg")
				  .attr("width", w/1.5)
				  .attr("height", h/2);

            svg.selectAll("g")
               .data(stack_data)
               .enter()
               .append("g")
               .attr("class", "stacked_bars")
	    	   .attr("fill", function(d, i) {
     		   	    return colors(i);
    		   	})
               .selectAll("rect")
			   .data(function(d) { return d; })
			   .enter()
			   .append("rect")
			   .attr("x", function(d, i) {
					return xScale(i);
			   })
			   .attr("y", function(d) {
					return yScale(d[0]);
			   })
			   .attr("height", function(d) {
					return yScale(d[1])-yScale(d[0]);
			   })
			   .attr("width", xScale.bandwidth());

        var xAxis = d3.axisBottom(xScaleB)     // a function to create an axis
				   .ticks(8);

            svg.append("g")  // add a group element to the svg
            .attr("class", "axis") //Assign class "axis" to group
            .attr("transform", "translate(0," + (h/2 - padding) + ")")  // transform/shift the axis to bottom
            .call(xAxis);   // call the axis function we generated on this group. So it will create & add axis to the group

            var legend = svg.selectAll(".legend")
        .data(kiz)
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { return "translate(" + i * 15 + ",-30)"; });


    legend.append("circle")
        .attr("cx", 175 )
        .attr("cy", 33)
        .attr("r", 3)
        .data(kiz)
        .style("fill", function(d, i) {
     		   	    return colors(i);
    		   	});

    legend.append("text")
        .attr("x", h-200)
        .attr("y", h-150)
        .attr("dy", ".20em")
        .style("font-size","0.6em")
        .style("text-anchor", "end")
        // .style("font-size", "10")

        .attr("transform", "rotate(-45)")
        .style("font-family","monospace")
        .text(function(d,i) { return kiz[i];});




        // var legend = svg.selectAll(".legend")
        //     .data(kiz)
        //     .enter().append("g")
        //     .attr("class", "legend")
        // .attr("transform", function(d, i) { return "translate(0,"+ i * 10 + ")"; });
        //
        // legend.append("circle")
        //     .attr("cx", 10 )
        //     .attr("cy", 10)
        //     .attr("r", 4)
        //     .style("fill", color);
        // legend.append("text")
        // .attr("x", 10)
        // .attr("y", 20)
        //     .style("font-size", "9")
        // .attr("dy", ".20em")
        // .style("text-anchor", "end")
        // // .attr("transform", "rotate(-45)")
        // .text(function(d) { return d;});

    }
            function listOfObStack(C) {
        var lo = [{},{},{},{},{},{},{},{},{},{},{},{},{}];
        for(var j = 0; j < C.length; j++){
            var country = C[j];
            for(var k =0; k < json.length; k++){
                if(json[k]["name"] === country){
                    var years_ = json[k]["years"].slice(5);
                    for(var p = 0; p < 13; p++){
                        lo[p][country] = years_[p]["gdp"]
                    }
                }
            }
        }
    return lo;
    }

                            stackChart(listOfObStack(checkboxesChecked))}


        })
        .on("mouseout", function(d) {
                            d3.select(this)
                            .transition()
                            .duration(250)
                            .attr("fill", function(d) {
                                return color(d.index);
                            });
                            d3.select("#tooltipLine").select('svg').remove();
                            d3.select("#tooltipLine").classed("hidden", true);
                            d3.select("#tooltip").classed("hidden", true);
                            d3.select("#tooltipStack").select('svg').remove();
                            d3.select("#tooltipStack").classed("hidden", true);

        });

   // Add text to each wedge

    arcs.append("text")
            .attr("transform", function(d) {
                return "translate(" + arcText.centroid(d) + ")";
            })
            .attr("text-anchor", "middle")
            .text(function(d, i) {
                return Object.values(ListTopTenObj[i])[0]
     });

   //      svg.selectAll("path")
   //      .data(pie(gdps))
   //      .transition().duration("1000")
   //
   //      .attr("d", function(d) {
   //            return arc(d);
   //       })
   //      .attr("class", "arc")
   //      .attr("fill", function(d, i) {
   //              return color(i);
   //      });
   //
   //      arcs.selectAll("text")
   //      .transition().duration("1000")
   //      .attr("transform", function(d) {
   //              return "translate(" + arcText.centroid(d) + ")";
   //          })
   //          .attr("text-anchor", "middle")
   //          .text(function(d, i) {
   //              return Object.values(ListTopTenObj[i])[0]
   //   });

    }
///////////////////////
    function sortObject(obj) {
    var arr = [];
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            arr.push({
                'key': prop,
                'value': obj[prop]
            });
        }
    }
    arr.sort(function(a, b) { return a.value - b.value; });
    //arr.sort(function(a, b) { a.value.toLowerCase().localeCompare(b.value.toLowerCase()); }); //use this to sort as strings
    return arr; // returns array
}


/////////

    var pie = d3.pie();
    var color = d3.scaleOrdinal(d3.schemeCategory10);

    var outerRadius = 200;
    var innerRadius = 0;
    var arc = d3.arc()
                .innerRadius(innerRadius)
                .outerRadius(outerRadius);
    var arcText = d3.arc()
                .innerRadius(0)
                .outerRadius(430);

    var arcs = svg.append("g")
        .attr("class", "pie")
        .attr("transform", "translate(" + 400 + ", " + 300 + ")")
        .selectAll("path")
        .data(pie(gdps))
        .enter();

    arcs.append("path")
        .attr("d", function(d) {
              return arc(d);
         })
        .attr("class", "arc")
        .attr("fill", function(d, i) {
                return color(i);
        })
        .on("mousemove", function(d) {
                            d3.select(this)
          		  	        .attr("fill", "#ccc");

					        var xPosition = d3.event.clientX;
                            var yPosition = d3.event.clientY;

                            d3.select("#tooltip")
                            .style("left",  xPosition + "px")
                            .style("top",yPosition+ "px")
                            .select('#name')
                            .text(Object.values(ListTopTenObj)[d.index].key);

                            d3.select("#tooltip").select("#value")
                            .text(d.value);

                            d3.select("#tooltip").classed("hidden", false);
        })
        .on("mouseout", function(d) {
                            d3.select(this)
                            .transition()
                            .duration(250)
                            .attr("fill", function(d) {
                                return color(d.index);
                            });
                            d3.select("#tooltip").classed("hidden", true);
        })
        .on("dblclick",function (d) {
                            d3.select(this)
          		  	        .attr("fill", "#ccc");

					        var xPosition = d3.event.clientX -425;
                            var yPosition = d3.event.clientY ;

                            d3.select("#tooltipLine")
                                .style("position", "absolute")
                            .style("left",  xPosition + "px")
                            .style("top",yPosition+ "px");
                            // .select('#name')
                            // .text(Object.values(ListTopTenObj)[d.index].key);

                            // d3.select("#tooltip").select("#value")
                            // .text(d.value);

                            d3.select("#tooltipLine").classed("hidden", false);


                            var country = Object.values(ListTopTenObj)[d.index].key;
                            console.log(country);
                            console.log(color(this));


                            lineChart(country)
        })
        .on("mouseout", function(d) {
                            d3.select(this)
                            .transition()
                            .duration(250)
                            .attr("fill", function(d) {
                                return color(d.index);
                            });
                            d3.select("#tooltipLine").select('svg').remove();
                            d3.select("#tooltipLine").classed("hidden", true);
                            d3.select("#tooltip").classed("hidden", true);
        })
        .on("click", function (d) {

            if(d3.select("#tooltipStack").classed("hidden") === true){
                            d3.select(this)
          		  	        .attr("fill", "#ccc");

					        var xPosition = d3.event.clientX ;
                            var yPosition = d3.event.clientY +65 ;

                            d3.select("#tooltipStack")
                            .style("position", "absolute")
                            .style("left",  xPosition + "px")
                            .style("top",yPosition+ "px");
                            // .select('#name')
                            // .text(Object.values(ListTopTenObj)[d.index].key);

                            // d3.select("#tooltip").select("#value")
                            // .text(d.value);

                            d3.select("#tooltipStack").classed("hidden", false);


                            var country = Object.values(ListTopTenObj)[d.index].key;
                            console.log(country);
                            console.log(color(this));


                            stackChart(listOfObStack(checkboxesChecked))}


        })
        .on("mouseout", function(d) {
                            d3.select(this)
                            .transition()
                            .duration(250)
                            .attr("fill", function(d) {
                                return color(d.index);
                            });
                            d3.select("#tooltipLine").select('svg').remove();
                            d3.select("#tooltipLine").classed("hidden", true);
                            d3.select("#tooltip").classed("hidden", true);
                            d3.select("#tooltipStack").select('svg').remove();
                            d3.select("#tooltipStack").classed("hidden", true);

        });


    arcs.append("text")
            .attr("transform", function(d) {
                return "translate(" + arcText.centroid(d) + ")";
            })
            .attr("text-anchor", "middle")
            .text(function(d, i) {
                return Object.values(ListTopTenObj[i])[0]
            });





    function listOfObStack(C) {
        var lo = [{},{},{},{},{},{},{},{},{},{},{},{},{}];
        for(var j = 0; j < C.length; j++){
            var country = C[j];
            for(var k =0; k < json.length; k++){
                if(json[k]["name"] === country){
                    var years_ = json[k]["years"].slice(5);
                    for(var p = 0; p < 13; p++){
                        lo[p][country] = years_[p]["gdp"]
                    }
                }
            }
        }
    return lo;
    }


    function stackChart(listO) {

        var w = 600;
		var h = 300;
		var padding = 23;

		var dataset = listO;
        // var dataset=    [
			// 	{ apples: 5, oranges: 10, grapes: 22 },
        // 		{ apples: 4, oranges: 12, grapes: 28 },
        // 		{ apples: 2, oranges: 19, grapes: 32 },
        // 		{ apples: 7, oranges: 23, grapes: 35 },
        // 		{ apples: 23, oranges: 1, grapes: 13 } ];



            var kiz = checkboxesChecked;
                    var years = ['2000', '2001', '2002', '2003', '2004', '2005',
        '2006', '2007', '2008', '2009', '2010', '2011', '2012'];
			var stack = d3.stack()
				          .keys(kiz)
				          //.offset(d3.stackOffsetSilhouette)
						  .offset(d3.stackOffsetExpand)
						  .order(d3.stackOrderReverse);
            // use stack generator to create new dataset
			stack_data=stack(dataset);

            // create a band scale to equally divide the whole horizontal svg dimension to the stacked bars

                var xScaleB = d3.scaleBand()
                       .domain(years)
               		   .range([padding, w/1.5 - padding])
                        .padding(0.09);

			var xScale = d3.scaleBand()
				.domain(d3.range(stack_data[0].length))
        		.rangeRound([padding, w/1.5 - padding])
		       	.padding(0.05);

			// find the max height the bars will get stacked and scale that range to the whole vertical svg dimension
			var yScale = d3.scaleLinear()
				.domain([ d3.min(stack_data, function(d) {
						return d3.min(d, function(d) {
							return d[0];
						});
					}),
					d3.max(stack_data, function(d) {
						return d3.max(d, function(d) {
							return d[1];
						});
					})
				])
				.range([padding, h/2 - padding]);

			// create an ordinal scale for 10 different colors
			var colors = d3.scaleOrdinal(d3.schemeCategory10);

			var svg = d3.select("div#tooltipStack")
				  .append("svg")
				  .attr("width", w/1.5)
				  .attr("height", h/2);

            svg.selectAll("g")
               .data(stack_data)
               .enter()
               .append("g")
               .attr("class", "stacked_bars")
	    	   .attr("fill", function(d, i) {
     		   	    return colors(i);
    		   	})
               .selectAll("rect")
			   .data(function(d) { return d; })
			   .enter()
			   .append("rect")
			   .attr("x", function(d, i) {
					return xScale(i);
			   })
			   .attr("y", function(d) {
					return yScale(d[0]);
			   })
			   .attr("height", function(d) {
					return yScale(d[1])-yScale(d[0]);
			   })
			   .attr("width", xScale.bandwidth());

        var xAxis = d3.axisBottom(xScaleB)     // a function to create an axis
				   .ticks(8);

            svg.append("g")  // add a group element to the svg
            .attr("class", "axis") //Assign class "axis" to group
            .attr("transform", "translate(0," + (h/2 - padding) + ")")  // transform/shift the axis to bottom
            .call(xAxis);   // call the axis function we generated on this group. So it will create & add axis to the group

            var legend = svg.selectAll(".legend")
        .data(kiz)
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { return "translate(" + i * 15 + ",-30)"; });


    legend.append("circle")
        .attr("cx", 175 )
        .attr("cy", 33)
        .attr("r", 3)
        .data(kiz)
        .style("fill", function(d, i) {
     		   	    return colors(i);
    		   	});

    legend.append("text")
        .attr("x", h-200)
        .attr("y", h-150)
        .attr("dy", ".20em")
        .style("font-size","0.6em")
        .style("text-anchor", "end")
        // .style("font-size", "10")

        .attr("transform", "rotate(-45)")
        .style("font-family","monospace")
        .text(function(d,i) { return kiz[i];});




        // var legend = svg.selectAll(".legend")
        //     .data(kiz)
        //     .enter().append("g")
        //     .attr("class", "legend")
        // .attr("transform", function(d, i) { return "translate(0,"+ i * 10 + ")"; });
        //
        // legend.append("circle")
        //     .attr("cx", 10 )
        //     .attr("cy", 10)
        //     .attr("r", 4)
        //     .style("fill", color);
        // legend.append("text")
        // .attr("x", 10)
        // .attr("y", 20)
        //     .style("font-size", "9")
        // .attr("dy", ".20em")
        // .style("text-anchor", "end")
        // // .attr("transform", "rotate(-45)")
        // .text(function(d) { return d;});

    }

    function lineChart(country){

        var w = 600;
		var h = 300;
		var padding = 20;

        var dataset =EuroFull[country];
        var years = ['2000', '2001', '2002', '2003', '2004', '2005',
        '2006', '2007', '2008', '2009', '2010', '2011', '2012'];



        console.log(d3.max(dataset)/10000000000);

		// var dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
         //        11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ];


		var xScale = d3.scaleLinear()
                        .domain([0,dataset.length-1])
               		   .range([padding, w/1.5-padding]);
        var xScaleB = d3.scaleBand()
                       .domain(years)
               		   .range([padding, w/1.5-padding])
                        .padding(0.09);

        var yScale = d3.scaleLinear()
			           .domain([0, d3.max(dataset)])
			           .range([h/2-padding, padding]);



		//Define X axis
        var xAxis = d3.axisBottom(xScaleB)     // a function to create an axis
				   .ticks(8);                //Set  # of ticks
		//Define Y axis
		var yAxis = d3.axisLeft(yScale)
                  	  .ticks(10);

		var area_generator = d3.area()

    				.x(function(d, i) {return xScale(i); })
					.y0(yScale(100))
    				.y1(function(d) { return yScale(d); })
					.curve(d3.curveLinear);


		var svg2 = d3.select("div#tooltipLine")
            		.append("svg")
            		.attr("width", w/1.5)
            		.attr("height", h/2)
            .style("float", "right");


       //Create X axis
       svg2.append("g")  // add a group element to the svg
           .attr("class", "axis") //Assign class "axis" to group
           .attr("transform", "translate(0," + (h/2 - padding) + ")")  // transform/shift the axis to bottom
           .call(xAxis);   // call the axis function we generated on this group. So it will create & add axis to the group

	   //Create Y axis
	   svg2.append("g")
    	   .attr("class", "axis")
    	   .attr("transform", "translate(" + padding + ",0)")  // shift the axis to right
    	   .call(yAxis);

	   svg2.append("path")
      	  .attr("class", "area1")
      	  .attr("d", area_generator(dataset))

        var legend = svg2.
        append("g")
        .attr("class", "legend")
        .attr("transform", "translate(50,0)");


    // legend.append("circle")
    //     .attr("cx", 5 )
    //     .attr("cy", 10)
    //     .attr("r", 5);
    //     // .style("fill", c);

    legend.append("text")
        .attr("x", 100)
        .attr("y", 10)
        .attr("dy", ".20em")
        .style("text-anchor", "end")
        .style("font-size", "12")
        // .attr("transform", "rotate(-45)")
        .text(country + " GDP");


    }

////////////////////////////

});