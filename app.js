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
                .style("fill", "#69b3a2")
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
    d3.csv(filePath).then(function(data){
        // console.log(data);
        var width = 800;
        var height = 700;

        const projection1 = d3.geoNaturalEarth1().scale(140).translate([width/2, height/2])
        const pathgeo1 = d3.geoPath().projection(projection1)

        var svg4 = d3.select('#q4_plot')
            .append('svg')
            .attr('width', width)
            .attr('height', height);

        svg4.append('path')
            .attr('class', 'sphere')
            .attr('d', pathgeo1({type: 'Sphere'}))
            .attr('fill', 'white')

        // var linear = d3.scaleLinear().domain([d3.min(data, d => d.Count), d3.max(pointLst, d => d.Count)]).range([2, 20])

        const worldPath = 'world.json'
        d3.json(worldPath).then(function(data){
            svg4.selectAll('path')
                .data(data.features)
                .enter()
                .append('path')
                .attr('d', pathgeo1)
                .attr('fill', 'pink')
                .attr('stroke', 'white')
        
        // TOOLTIP

        // create population circles
        svg4.selectAll('circle')
            .data(data)
            .enter()
            .append('circle')
            .attr('cx', d => projection1([parseFloat(d.longitude), parseFloat(d.latitude)])[0])
            .attr('cy', d => projection1([parseFloat(d.longitude), parseFloat(d.latitude)])[1])
            .attr('r', 5)
            .style('fill', 'magenta')
            // .attr('stroke', 'red')
            // .attr('stroke-width', 1)
            // .attr('fill-opacity', 0.5)
        })
        
        // plot title
        svg4.append('text')
            .attr('x', width/2)
            .attr('y', 100)
            .attr('text-anchor', 'middle')
            .style('font-size', '15px')
            .text('World Map of Formula One Circuits');
    });
}

// QUESTION 5: BOX PLOT
var question5=function(filePath){
    d3.csv(filePath).then(function(data){
        console.log(data);
        const margin = {top: 30, right: 30, bottom: 30, left: 30}
        const width = 900 - margin.left - margin.right
        const height = 800 - margin.top - margin.bottom

        // append svg object
        const svg5 = d3.select("#q5_plot")
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`);

        var sumstat = d3.nest() // nest function allows to group the calculation per level of a factor
            .key(function(d) { return d.driver;})
            .rollup(function(d) {
                q1 = d3.quantile(d.map(function(g) { return g.Sepal_Length;}).sort(d3.ascending),.25)
                median = d3.quantile(d.map(function(g) { return g.Sepal_Length;}).sort(d3.ascending),.5)
                q3 = d3.quantile(d.map(function(g) { return g.Sepal_Length;}).sort(d3.ascending),.75)
                interQuantileRange = q3 - q1
                min = q1 - 1.5 * interQuantileRange
                max = q3 + 1.5 * interQuantileRange
                return({q1: q1, median: median, q3: q3, interQuantileRange: interQuantileRange, min: min, max: max})
            })
            .entries(data)
        
        var x = d3.scaleBand()
            .range([ 0, width ])
            .domain(["Hamilton", "Alonso", "Miki"])
            .paddingInner(1)
            .paddingOuter(.5)
        svg5.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
        var y = d3.scaleLinear()
            .domain([3,9])
            .range([height, 0])
        svg5.append("g").call(d3.axisLeft(y))
    });
}
