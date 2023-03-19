function final_project(){
    var filePath1="q1_clean.csv";
    question1(filePath1);
    var filePath2a="q2_driver_clean.csv";
    question2a(filePath2a);
    var filePath2b="q2_constructor_clean.csv";
    question2b(filePath2b);
    var filePath3="q3_clean.csv";
    question3(filePath3);
    var filePath4="q4_clean.csv";
    question4(filePath4);
    var filePath5="q5_clean.csv";
    question5(filePath5);
}

// QUESTION 1: SCATTER PLOT
var question1=function(filePath){
    // reading data
    d3.csv(filePath).then(function(data){   
        // console.log(data)
        // dimension and margins
        const margin = {top: 30, right: 30, bottom: 30, left: 30}
        const width = 900 - margin.left - margin.right
        const height = 800 - margin.top - margin.bottom

        // append svg object
        const svg1 = d3.select("#q1_plot")
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`);
        
        // add X axis
        const x = d3.scaleLinear()
            .domain([0, d3.max(data, d => parseFloat(d.finish))])
            .range([0, width]);
        svg1.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(x));

        // add Y axis
        const y = d3.scaleLinear()
            .domain([0, d3.max(data, d => parseFloat(d.start))])
            .range([height, 0]);
        svg1.append("g")
            .call(d3.axisLeft(y));
        
        // TOOLTIP: NEED TO ADD
        const Tooltip = d3.select("#q1_plot")
            .append("div")
            .style("opacity", 0)
            .attr("class", "tooltip")
            .style("background-color", "white")
            .style("border", "solid")
            .style("border-width", "1px")
            .style("border-radius", "5px")
            .style("padding", "10px")

        const mouseover = function(event, d) {
            Tooltip
            .style("opacity", 1)
        }
        
        const mousemove = function(event, d) {
            Tooltip
            .html(`Driver Info: ${d.driver}`)
            .style("left", (event.x)/2 + "px") // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
            .style("top", (event.y)/2 + "px")
        }
        
        // A function that change this tooltip when the leaves a point: just need to set opacity to 0 again
        const mouseleave = function(event,d) {
            Tooltip
            .transition()
            .duration(200)
            .style("opacity", 0)
        }

        // add dots
        svg1.append('g')
            .selectAll("dot")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", function (d) { return x(parseFloat(d.finish)); } )
            .attr("cy", function (d) { return y(parseFloat(d.start)); } )
            .attr("r", 5)
            .style("fill", "#FF1801")
            .style("opacity", 0.3)
            .on("mouseover", mouseover )
            .on("mousemove", mousemove )
            .on("mouseleave", mouseleave )
    });
}

// QUESTION 2: WORD CLOUD - DRIVERS
var question2a=function(filePath){
    d3.csv(filePath).then(function(data){
        // console.log(data);
        const margin = {top: 30, right: 30, bottom: 30, left: 30}
        const width = 900 - margin.left - margin.right
        const height = 800 - margin.top - margin.bottom

        const svg2a = d3.select("#q2a_plot")
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`);

        var layout = d3.layout.cloud()
            .size([width, height])
            .words(data.map(function(d) { return {text: d.driver, size:parseFloat(d.podium)}; }))
            .padding(5)        //space between words
            .rotate(function() { return ~~(Math.random() * 2) * 90; })
            .fontSize(function(d) { return d.size; })      // font size of words
            .on("end", draw);
        layout.start();

        function draw(words) {
            svg2a
              .append("g")
                .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
                .selectAll("text")
                .data(words)
                .enter().append("text")
                .style("font-size", function(d) { return d.size; })
                .style("fill", "#FF1801")
                .attr("text-anchor", "middle")
                .style("font-family", "Impact")
                .attr("transform", function(d) {
                    return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                })
                .text(function(d) { return d.text; });
        }

    });
}

// QUESTION 2: WORD CLOUD - CONSTRUCTORS
var question2b=function(filePath){
    d3.csv(filePath).then(function(data){
        // console.log(data);
    });
}

// QUESTION 3: STACKED STREAMGRAPH
var question3=function(filePath){
    d3.csv(filePath).then(function(data){
        // console.log(data);
        const margin = {top: 30, right: 30, bottom: 30, left: 30}
        const width = 900 - margin.left - margin.right
        const height = 800 - margin.top - margin.bottom

        var svg3 = d3.select("#q3_plot")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr('transform', `translate(${margin.left}, ${margin.top})`);

    });
}

// QUESTION 4: WORLD MAP
var question4=function(filePath){
    d3.csv(filePath).then(function(dataOrigin){
        var width = 1000;
        var height = 650;

        const projection1 = d3.geoNaturalEarth1().scale(180).translate([width/2, height/2])
        const pathgeo1 = d3.geoPath().projection(projection1)

        var svg4 = d3.select('#q4_plot')
            .append('svg')
            .attr('width', width)
            .attr('height', height);

        svg4.append('path')
            .attr('class', 'sphere')
            .attr('d', pathgeo1({type: 'Sphere'}))
            .attr('fill', '#8AE0FF')

        // var linear = d3.scaleLinear().domain([d3.min(data, d => d.Count), d3.max(pointLst, d => d.Count)]).range([2, 20])

        const worldPath = 'world.json'
        d3.json(worldPath).then(function(data){

            // map the graph
            svg4.selectAll('path')
                .data(data.features)
                .enter()
                .append('path')
                .attr('d', pathgeo1)
                .attr('fill', '#68FF66')
                .attr('stroke', '#00C129')
            
            // ToolTip --> not align with the mouse
            var Tooltip = d3.select('#q4_plot')
                .append('div')
                .attr('class', 'tooltip')
                .style('opacity', 0)
                .style('background-color', 'white')
                .style('border', 'solid')
                .style('border-width', '2px')
                .style('border-radious', '5px')
                .style('padding', '5px');

            const mouseover = function(e, d) {
                // Tooltip.style('opacity', 1)
                // d3.select(this).style('stroke', 'black').style('opacity', 1)
                // Tooltip.html('Country: ' + d.country + '<br>' + 'Circuit: ' + d.name)
                //     .style('left', (e.pageX) + 'px')
                //     .style('top', (e.pageY) + 'px')
                Tooltip.transition().duration(50).style('opacity', 0.9)
            }
            const mousemove = function (e, d) {
                var coords = d3.pointer(e)
                Tooltip.html('Country: ' + d.country + '<br>' + 'Circuit: ' + d.name)
                    .style('left', coords[0])
                    .style('top', coords[1])
            }
            const mouseout = function (e, d) {
                Tooltip.transition().duration(50).style('opacity', 0);
            }

            // create circles
            svg4.selectAll('circle')
                .data(dataOrigin)
                .enter()
                .append('circle')
                .attr('cx', d => projection1([parseFloat(d.longitude), parseFloat(d.latitude)])[0])
                .attr('cy', d => projection1([parseFloat(d.longitude), parseFloat(d.latitude)])[1])
                .attr('r', 4)
                .style('fill', '#FF1801')
                .attr('stroke', 'red')
                .attr('stroke-width', 1)
                .attr('fill-opacity', 0.5)
                    .on('mouseover', mouseover)
                    .on('mousemove', mousemove)
                    .on('mouseout', mouseout)
        })
        
        // plot title
        svg4.append('text')
            .attr('x', width/2)
            .attr('y', 50)
            .attr('text-anchor', 'middle')
            .style('font-size', '15px')
            .text('World Map of Formula One Circuits');
    });
}

// QUESTION 5: BOX PLOT
var question5=function(filePath){
    d3.csv(filePath).then(function(data){
        year_group = Array.from(d3.group(data, d => parseInt(d.year)))
        var year_dict = {
            '2008': year_group[0][1],
            '2012': year_group[1][1],
            '2016': year_group[2][1]
        }

        const margin = {top: 30, right: 30, bottom: 30, left: 30}
        const width = 900 - margin.left - margin.right
        const height = 800 - margin.top - margin.bottom

        // append svg object
        const svg5 = d3.select("#q5_plot")
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left+20}, ${margin.top})`);

        // default 2008
        current_year = "2008"
        var c_data = year_dict[current_year];

        // xScale
        var xScale = d3.scaleBand()
            .domain(Array.from(d3.map(c_data, d => d.driver)))
            .range([0, width])
            .paddingInner(1)
            .paddingOuter(.5)
        
        svg5.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(xScale))
            .style('font-size', '20px')

        // yScale
        var yScale = d3.scaleLinear()
            .domain([d3.min(c_data, d => parseFloat(d.qualifying))-3000, 
                d3.max(c_data, d => parseFloat(d.qualifying))+1000])
            .range([height, 0])

        svg5.append("g")
            .attr('name', 'yAxis')
            .call(d3.axisLeft(yScale))
            .style('font-size', '13px')


        // another way to do sumstat without using d3.nest()
        const groupedData = Array.from(d3.group(c_data, d => d.driver)).map(([key, values]) => {
            const sortedValues = values.map(d => parseFloat(d.qualifying)).sort(d3.ascending);
            const q1 = d3.quantile(sortedValues, 0.25);
            const median = d3.quantile(sortedValues, 0.5);
            const q3 = d3.quantile(sortedValues, 0.75);
            const interQuantileRange = q3 - q1;
            const min = q1 - 1.5 * interQuantileRange;
            const max = q3 + 1.5 * interQuantileRange;

            return {
                driver: key,
                q1,
                median,
                q3,
                interQuantileRange,
                min,
                max
            };
        });

        // svg start
        var boxWidth = 70
        svg5.selectAll("vertLines")
            .data(groupedData)
            .enter()
            .append("line")
            .attr("x1", function(d){return(xScale(d.driver))})
            .attr("x2", function(d){return(xScale(d.driver))})
            .attr("y1", d => yScale(d.min))
            .attr("y2", d => yScale(d.max))
            .attr("stroke", "black")
            .style("width", 40)

        // rectangle for the main box
        var boxWidth = 100
        svg5.selectAll("boxes")
            .data(groupedData)
            .enter()
            .append("rect")
                .attr("x", function(d){return(xScale(d.driver)-boxWidth/2)})
                .attr("y", function(d){return(yScale(d.q3))})
                .attr("height", function(d){return(yScale(d.q1)-yScale(d.q3))})
                .attr("width", boxWidth)
                .attr("stroke", "black")
                .style("fill", "#FF1801")

        // Show the median
        svg5.selectAll("medianLines")
        .data(groupedData)
        .enter()
        .append("line")
            .attr("x1", function(d){return(xScale(d.driver)-boxWidth/2)})
            .attr("x2", function(d){return(xScale(d.driver)+boxWidth/2)})
            .attr("y1", function(d){return(yScale(d.median))})
            .attr("y2", function(d){return(yScale(d.median))})
            .attr("stroke", "black")
            .style("width", 80)

        // Add individual points with jitter
        var jitterWidth = 50
        svg5.selectAll("indPoints")
            .data(groupedData)
            .enter()
            .append("circle")
                .attr("cx", function(d){return(xScale(d.driver) - jitterWidth/2 + Math.random()*jitterWidth )})
                .attr("cy", function(d){return(yScale(d.Sepal_Length))})
                .attr("r", 4)
                .style("fill", "white")
                .attr("stroke", "black")

        // // ratio buttons
        // var radio = d3.selectAll('#radio_q5')
        //     .attr('name', 'year')
        //     .on('change', function(d){
        //         current_year = d.target.value;
        //         c_data = year_dict[current_year];
                
        //         yScale = d3.scaleTime()
        //             .domain([d3.min(c_data, d => d.qualifying), d3.max(c_data, d => d.qualifying)])
        //             .range([0, height])
        //         yAxis = d3.axisLeft().scale(yScale);
        //         d3.selectAll('[name = yAxis]')
        //             .transition()
        //             .call(yAxis)
        //             .duration(100)

        //         // bring new box plot

        //     })
    });
}
