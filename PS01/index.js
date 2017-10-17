document.bgColor="#3c3c3c"


var svg = d3.select('svg').append('g').attr('transform','translate(100,100)');


var nestedData = [];
var yearData = [];


var clicked = true;


var scaleX = d3.scalePoint().domain(["","SPY", "DIA", "QQQ","EWZ","FXI","EWG","EWH"]).range([0, 600]);


var scaleY = d3.scaleLinear().domain([200,0]).range([0, 400]);


svg.append("g")
    .attr('transform','translate(0,400)')
    .attr("class", "axisRed")
    .attr('stroke-width', 3)
    .call(d3.axisBottom(scaleX));

svg.append("g")
    .attr("class", "axisRed")
    .attr('stroke-width', 3)
    .call(d3.axisLeft(scaleY));



d3.csv('./xun.csv', function(dataIn){

    nestedData = d3.nest()
        .key(function(d){return d.year})
        .entries(dataIn);


    data2015 = dataIn.filter(function(d){
        return d.year == 2015;
    });

    data2006 = dataIn.filter(function(d){
        return d.year == 2006;
    });



    svg.append('text')
        .text('Stock Index')
        .attr('transform','translate(300, -50)')
        .style('text-anchor','middle')
        .style("font-size",'28px')
        .attr('fill','white')
    ;


    svg.append('text')
        .text('Price')
        .attr('transform', 'translate(-60,280)rotate(270.5)')
        .style("font-size",'20px')
        .attr('fill','white')
    ;



    svg.selectAll('circles')
        .data(data2015)
        .enter()
        .append('circle')
        .attr('class','dataPoints')
        .attr('r', 10)
        .style("fill",'yellowgreen');


    drawPoints(data2015);

});


function drawPoints(pointData){

    svg.selectAll('.dataPoints')  //select all of the circles with dataPoints class that we made using the enter() commmand above
        .data(pointData)          //re-attach them to data (necessary for when the data changes from 2016 to 2017)
        .attr('cx',function(d){   //look up values for all the attributes that might have changed, and draw the new circles
            return scaleX(d.stock);
        })
        .attr('cy',function(d){
            return scaleY(d.price);
        });

}

function updateData(selectedYear){
    return nestedData.filter(function(d){
        return d.key == selectedYear
    })[0].values

}
function sliderMoved(sliderValue){

    console.log(sliderValue);

    var newData = updateData(+sliderValue);

    drawPoints(newData);





}