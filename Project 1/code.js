/**
 * Created by amernoureddin on 28-Feb-17.
 */


function SetFunction() {
    var x = document.getElementById("myBudget").value;
    console.log(x);
    if (isNaN(x)) {
        alert("Please enter an Integer value to set the initial budget.");
    }
    else if(x===""){
        alert("Please enter the budget amount!");
    }
    else {

    document.getElementById("ibudget").innerHTML = parseInt(x);
    document.getElementById("rembudget").innerHTML = parseInt(x);
    }

}

function ResetFunction() {
    document.getElementById("ibudget").innerHTML = 0;
    document.getElementById("rembudget").innerHTML = 0;
    document.getElementById("totalex").innerHTML = 0;
    document.getElementById("myBudget").value = "";
    document.getElementById("pricetag").value = "";
    document.getElementById("counter").value = 1;
    document.getElementById("rembudget").style.color="black";
    document.getElementById("dolar").style.color="black";

    data[0]=0;
    data[1]=0;
    data[2]=0;
    d3chart()

}


function plusFunction(){
    var x = document.getElementById("counter").value;
    document.getElementById("counter").value = parseInt(x)+1;
}

function minusFunction () {
    var x = document.getElementById("counter").value;
    document.getElementById("counter").value = parseInt(x)-1;
}


data = [0,0,0];
var dataf=[0,0,0];
function percentage(){
    var t = data[0]+data[1]+data[2];
    var ps = 100*data[0]/t;
    var pl = 100*data[1]/t;
    var pf = 100*data[2]/t;

    dataf[0]=~~ps;
    dataf[1]=~~pl;
    dataf[2]=~~pf;
}

function onclicksport(){
  data[0]+=1;
  console.log(data);
    console.log(dataf);

  d3chart()
 }

function onclicklux(){
    data[1]+=1;
    console.log(data);
      console.log(dataf);

    d3chart()
}

function onclickfood(){
   data[2]+=1;
    console.log(data);
      console.log(dataf);

    d3chart()
}

function function300() {
    var f = document.getElementById("ibudget").textContent;
    var ff = parseInt(f);
    console.log(ff);
    if (ff===0){
        alert("Please enter budget first, nothing in life is free!");
    }
    else {

            var x = document.getElementById("counter").value;
            var p = parseInt(x) * 300;

            var x0 = document.getElementById("totalex").textContent;
            var w = parseInt(x0) + p;
            document.getElementById("totalex").innerHTML = w;

            var x2 = document.getElementById("rembudget").textContent;
            var z = parseInt(x2) - p;
            document.getElementById("rembudget").innerHTML = z;

            onclicksport()
        }
}

function function150() {

    var f = document.getElementById("ibudget").textContent;
    var ff = parseInt(f);
    console.log(ff);
    if (ff === 0) {
        alert("Please enter budget first, nothing in life is free!");
    }
    else
    {
    var x = document.getElementById("counter").value;
    var p = parseInt(x) * 150;

    var x0 =  document.getElementById("totalex").textContent;
    var w = parseInt(x0) + p;
    document.getElementById("totalex").innerHTML = w;

    var x2 = document.getElementById("rembudget").textContent;
    var z = parseInt(x2)-p;
    document.getElementById("rembudget").innerHTML = z;

    onclicklux()}
}

function function2() {
    var f = document.getElementById("ibudget").textContent;
    var ff = parseInt(f);
    console.log(ff);
    if (ff === 0) {
        alert("Please enter budget first, nothing in life is free!");
    }
    else{
    var x = document.getElementById("counter").value;
    var p = parseInt(x) * 2;

    var x0 =  document.getElementById("totalex").textContent;
    var w = parseInt(x0) + p;
    document.getElementById("totalex").innerHTML = w;

    var x2 = document.getElementById("rembudget").textContent;
    var z = parseInt(x2)-p;
    document.getElementById("rembudget").innerHTML = z;

    onclickfood()}

}

function function100() {
    var f = document.getElementById("ibudget").textContent;
    var ff = parseInt(f);
    console.log(ff);
    if (ff === 0) {
        alert("Please enter budget first, nothing in life is free!");
    }
    else{
    var x = document.getElementById("counter").value;
    var p = parseInt(x) * 100;

    var x0 =  document.getElementById("totalex").textContent;
    var w = parseInt(x0) + p;
    document.getElementById("totalex").innerHTML = w;

    var x2 = document.getElementById("rembudget").textContent;
    var z = parseInt(x2)-p;
    document.getElementById("rembudget").innerHTML = z;

    onclicksport()}
}

function function1000() {
    var f = document.getElementById("ibudget").textContent;
    var ff = parseInt(f);
    console.log(ff);
    if (ff === 0) {
        alert("Please enter budget first, nothing in life is free!");
    }
    else{
    var x = document.getElementById("counter").value;
    var p = parseInt(x) * 1000;

    var x0 =  document.getElementById("totalex").textContent;
    var w = parseInt(x0) + p;
    document.getElementById("totalex").innerHTML = w;

    var x2 = document.getElementById("rembudget").textContent;
    var z = parseInt(x2)-p;
    document.getElementById("rembudget").innerHTML = z;

    onclicklux()}
}

function function1() {
    var f = document.getElementById("ibudget").textContent;
    var ff = parseInt(f);
    console.log(ff);
    if (ff === 0) {
        alert("Please enter budget first, nothing in life is free!");
    }
    else{
    var x = document.getElementById("counter").value;
    var p = parseInt(x) * 1;

    var x0 =  document.getElementById("totalex").textContent;
    var w = parseInt(x0) + p;
    document.getElementById("totalex").innerHTML = w;

    var x2 = document.getElementById("rembudget").textContent;
    var z = parseInt(x2)-p;
    document.getElementById("rembudget").innerHTML = z;
    onclickfood()}
}

function function200() {
    var f = document.getElementById("ibudget").textContent;
    var ff = parseInt(f);
    console.log(ff);
    if (ff === 0) {
        alert("Please enter budget first, nothing in life is free!");
    }
    else{
    var x = document.getElementById("counter").value;
    var p = parseInt(x) * 200;

    var x0 =  document.getElementById("totalex").textContent;
    var w = parseInt(x0) + p;
    document.getElementById("totalex").innerHTML = w;

    var x2 = document.getElementById("rembudget").textContent;
    var z = parseInt(x2)-p;
    document.getElementById("rembudget").innerHTML = z;

    onclicksport()}
}

function function500() {

    var f = document.getElementById("ibudget").textContent;
    var ff = parseInt(f);
    console.log(ff);
    if (ff === 0) {
        alert("Please enter budget first, nothing in life is free!");
    }
    else{
    var x = document.getElementById("counter").value;
    var p = parseInt(x) * 500;

    var x0 =  document.getElementById("totalex").textContent;
    var w = parseInt(x0) + p;
    document.getElementById("totalex").innerHTML = w;

    var x2 = document.getElementById("rembudget").textContent;
    var z = parseInt(x2)-p;
    document.getElementById("rembudget").innerHTML = z;

    onclicklux()}
}

function function10() {
    var f = document.getElementById("ibudget").textContent;
    var ff = parseInt(f);
    console.log(ff);
    if (ff === 0) {
        alert("Please enter budget first, nothing in life is free!");
    }
    else{
    var x = document.getElementById("counter").value;
    var p = parseInt(x) * 10;

    var x0 =  document.getElementById("totalex").textContent;
    var w = parseInt(x0) + p;
    document.getElementById("totalex").innerHTML = w;

    var x2 = document.getElementById("rembudget").textContent;
    var z = parseInt(x2)-p;
    document.getElementById("rembudget").innerHTML = z;
    onclickfood()}
}

function function20() {
    var f = document.getElementById("ibudget").textContent;
    var ff = parseInt(f);
    console.log(ff);
    if (ff === 0) {
        alert("Please enter budget first, nothing in life is free!");
    }
    else{
    var x = document.getElementById("counter").value;
    var p = parseInt(x) * 20;

    var x0 =  document.getElementById("totalex").textContent;
    var w = parseInt(x0) + p;
    document.getElementById("totalex").innerHTML = w;

    var x2 = document.getElementById("rembudget").textContent;
    var z = parseInt(x2)-p;
    document.getElementById("rembudget").innerHTML = z;
    onclicksport()}
}

function function5() {
    var f = document.getElementById("ibudget").textContent;
    var ff = parseInt(f);
    console.log(ff);
    if (ff === 0) {
        alert("Please enter budget first, nothing in life is free!");
    }
    else{
    var x = document.getElementById("counter").value;
    var p = parseInt(x) * 5;

    var x0 =  document.getElementById("totalex").textContent;
    var w = parseInt(x0) + p;
    document.getElementById("totalex").innerHTML = w;

    var x2 = document.getElementById("rembudget").textContent;
    var z = parseInt(x2)-p;
    document.getElementById("rembudget").innerHTML = z;
    onclicklux()}
}

function function15() {
    var f = document.getElementById("ibudget").textContent;
    var ff = parseInt(f);
    console.log(ff);
    if (ff === 0) {
        alert("Please enter budget first, nothing in life is free!");
    }
    else{
    var x = document.getElementById("counter").value;
    var p = parseInt(x) * 15;

    var x0 =  document.getElementById("totalex").textContent;
    var w = parseInt(x0) + p;
    document.getElementById("totalex").innerHTML = w;

    var x2 = document.getElementById("rembudget").textContent;
    var z = parseInt(x2)-p;
    document.getElementById("rembudget").innerHTML = z;
    onclickfood()}
}


function ofunctionsport(){
    var f = document.getElementById("ibudget").textContent;
    var pt = document.getElementById("pricetag").value;
    var ff = parseInt(f);
    console.log(ff);
    if (ff === 0) {
        alert("Please enter budget first, nothing in life is free!");
    }
    else if (pt === ""){
        alert("Please enter a price first.");
    }

    else{
    var x = document.getElementById("counter").value;
    var x1 = document.getElementById("pricetag").value;
    var y = parseInt(x) * parseInt(x1);

    var x0 =  document.getElementById("totalex").textContent;
    var w = parseInt(x0) + y;
    document.getElementById("totalex").innerHTML = w;

    var x3 = document.getElementById("rembudget").textContent;
    var z = parseInt(x3)-y;
    document.getElementById("rembudget").innerHTML = z;
    onclicksport()}
}

function ofunctionlux(){

    var f = document.getElementById("ibudget").textContent;
    var pt = document.getElementById("pricetag").value;

    var ff = parseInt(f);
    console.log(ff);
    if (ff === 0) {
        alert("Please enter budget first, nothing in life is free!");
    }
    else if (pt === ""){
        alert("Please enter a price first.");
    }


    else{
    var x = document.getElementById("counter").value;
    var x1 = document.getElementById("pricetag").value;
    var y = parseInt(x) * parseInt(x1);

    var x0 =  document.getElementById("totalex").textContent;
    var w = parseInt(x0) + y;
    document.getElementById("totalex").innerHTML = w;

    var x3 = document.getElementById("rembudget").textContent;
    var z = parseInt(x3)-y;
    document.getElementById("rembudget").innerHTML = z;
    onclicklux()}
}

function ofunctionfood(){
    var f = document.getElementById("ibudget").textContent;
    var pt = document.getElementById("pricetag").value;

    var ff = parseInt(f);
    console.log(ff);
    if (ff === 0) {
        alert("Please enter budget first, nothing in life is free!");
    }
    else if (pt === ""){
        alert("Please enter a price first.");
    }
    else{
    var x = document.getElementById("counter").value;
    var x1 = document.getElementById("pricetag").value;
    var y = parseInt(x) * parseInt(x1);

    var x0 =  document.getElementById("totalex").textContent;
    var w = parseInt(x0) + y;
    document.getElementById("totalex").innerHTML = w;

    var x3 = document.getElementById("rembudget").textContent;
    var z = parseInt(x3)-y;
    document.getElementById("rembudget").innerHTML = z;
    onclickfood()}
}



function changecolor() {
    var el = document.getElementById("rembudget").textContent;
    var th = parseInt(el);
    if (th < 0){
    document.getElementById("rembudget").style.color="#ff0000";
    document.getElementById("dolar").style.color="#ff0000";
    }
    else {
        document.getElementById("rembudget").style.color="black";
        document.getElementById("dolar").style.color="black";
    }
}


function d3chart() {

    percentage();
    d3.select("svg").remove();
    var svg = d3.select("body").append("svg")
        .attr("height", "100%")
        .attr("width", "100%");

    svg.selectAll("rect")
        .data(dataf)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("height", function (d, i) {
            return (d*2) + 1
        })
        .attr("width", "40")
        .attr("x", function (d, i) {
            return (i * 50) + 10
        })
        .attr("y", function (d, i) {
            return 450 - (d*2)
        });

    svg.selectAll("text")
        .data(dataf)
        .enter().append("text")
        .text(function (d) {
            return d + "%"
        })
        .attr("x", function (d, i) {
            return (i * 50) + 20
        })
        .attr("y", function (d) {
            return 445 - (d*2)
        });

var svgtext = svg.append("text").attr("x","13").attr("y","465");
svgtext.text("Sports").attr("font-size",12);
var svgtext2 = svg.append("text").attr("x","63").attr("y","465");
svgtext2.text("Luxury").attr("font-size",12);
var svgtext3 = svg.append("text").attr("x","118").attr("y","465");
svgtext3.text("Food").attr("font-size",12);

}

var color;

function takeColor(x){
    if (x === "red"){
           color="red";
    }
    else if(x === "redorange"){
        color="orangered";
    }
    else if(x === "orange"){
        color = "darkorange";
    }
    else if(x === "orangeyellow"){
        color = "#dab03a";
    }
    else if(x === "yellow"){
        color = "#d3d300";
    }
    else if(x === "yellowgreen"){
        color = "#8cd229";
    }
    else if(x === "green"){
        color = "#4CAF50";
    }
    else if (x === "bluegreen"){
        color = "#168b73";
    }
    else if(x === "blue"){
        color = "#00bfbf";
    }
    else if (x === "blueviolet"){
        color = "blueviolet";
    }
    else if (x === "violet"){
        color = "#800080";
    }
    else if (x === "violetred"){
        color = "mediumvioletred";
    }

}

function assignColor(z){
    var x =document. getElementsByClassName(z);
    var i;
    for (i = 0; i < x.length; i++) {
        x[i].style.backgroundColor  = color;
    }

}