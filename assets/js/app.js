var svgWidth = 960;
var svgHeight = 500;

var margin = {top: 20, right: 40, bottom: 60, left: 50};
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3
    .select('body')
    .append('svg')
    .attr('width', svgWidth)
    .attr('height', svgHeight)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

// Import data from an external CSV file
d3.csv('data.csv', function(error, jdata) {
    if (error) throw error;

    jdata.forEach(function(data) {
        data.poverty = +data.poverty;
        data.health = +data.health;
      });

    console.log(jdata);
 
    var xScale = d3.scaleLinear().range([0, width]); 
    var yScale = d3.scaleLinear().range([height, 0]); 

    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);

    xScale.domain(
        d3.extent(jdata, function(data) {
            return data.poverty;
        }),
    );
    yScale.domain(
        d3.extent(jdata, function(data) {
            return data.health;
        }),
    );

    // x-axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    // y-axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

    var tdata = [['AL', 19.3, 13.9],	['AK', 11.2, 15],	['AZ', 18.2, 14.4],	['AR', 18.9, 16.3],	['CA', 16.4, 14.8],	['CO', 12, 12.8],	['CT', 10.8, 8.7],	['DE', 12.5, 8.7],	['DC', 17.7, 8.3],	['FL', 16.5, 17.6],	['GA', 18.3, 20.9],	['HI', 11.4, 8.1],	['ID', 14.8, 16.5],	['IL', 14.4, 11.9],	['IN', 15.2, 14.8],	['IA', 12.2, 7.7],	['KS', 13.6, 14.5],	['KY', 19.1, 10],	['LA', 19.8, 18.7],	['ME', 14.1, 11],	['MD', 10.1, 9.2],	['MA', 11.6, 4.6],	['MI', 16.2, 10.3],	['MN', 11.5, 7.3],	['MS', 21.5, 18.8],	['MO', 15.5, 12.9],	['MT', 15.4, 12.9],	['NE', 12.4, 12.4],	['NV', 15.2, 17.1],	['NH', 9.2, 11.4],	['NJ', 11.1, 12.5],	['NM', 21.3, 15.4],	['NY', 15.9, 12.3],	['NC', 17.2, 16.1],	['ND', 11.5, 8.8],	['OH', 15.8, 10.2],	['OK', 16.6, 13.9],	['OR', 16.6, 11],	['PA', 13.6, 10.1],	['RI', 14.3, 8],	['SC', 18, 17.1],	['SD', 14.2, 9.9],	['TN', 18.3, 14.2],	['TX', 17.2, 24.9],	['UT', 11.7, 13.9],	['VT', 12.2, 6.7],	['VA', 11.8, 13.1],	['WA', 13.2, 10.7],	['WV', 18.3, 10.1],	['WI', 13.2, 8.5]];

    // draw dots
    svg.selectAll("circle")
        .data(tdata)
        .enter()
        .append("circle")
        .attr("cx", function(data) { return xScale(data[1]);})
        .attr("cy", function(data) { return yScale(data[2]);})
        .attr("r", 15)
        .style("fill", 'Turquoise');        

    svg.selectAll("text")
        .data(tdata)
        .enter()
        .append("text")
        .text(function(data) { return data[0];})
        .attr("x", function(data) { return xScale(data[1])-10;})
        .attr("y", function(data) { return yScale(data[2])+5;})
        .attr("font-size", "15px")
        .attr("fill", "white");
    
    svg
        .append('text')
        .attr('transform', 'translate(' + width / 2 + ',' + (height + margin.top + 20) + ')')
        .attr('class', 'xaxis text')
        .text('In Poverty (%)');
        
    svg
        .append('text')
        //.attr('transform', 'rotate(-90)')
        .attr('transform', 'translate(' + (-35) + ',' + (height / 2 + 50) + ')rotate(-90)', )
        .attr('class', 'yaxis text')
        .text('Lacks Healthcare (%)');


});