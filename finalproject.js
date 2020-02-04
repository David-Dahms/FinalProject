// set the margins
let margin = 70, 
    width = 1300 - 2 * margin,
    height = 500 - 2 * margin;

let projectedGrowth = [
  {"occupation": "Computer/Math", "changeNumber": 593900, "changePercent": 12.7},
  {"occupation": "Engineering", "changeNumber": 113300, "changePercent": 4.2},
  {"occupation": "Arts/Design", "changeNumber": 96800, "changePercent": 3.3},
  {"occupation": "Physical Science", "changeNumber": 97400, "changePercent": 7.4},
  {"occupation": "Social Service", "changeNumber": 306200, "changePercent": 11.2},
  {"occupation": "Legal", "changeNumber": 93300, "changePercent": 6.9},
  {"occupation": "Business/Finance", "changeNumber": 591800, "changePercent": 6.9},
  {"occupation": "Education", "changeNumber": 512.9, "changePercent":5.3},
  {"occupation": "Protective Service", "changeNumber": 95200, "changePercent":2.7},
  {"occupation": "Healthcare", "changeNumber": 1082600, "changePercent":11.9},
  {"occupation": "Food Preparation", "changeNumber": 1488300, "changePercent":10.9},
  {"occupation": "Farming/Fishing", "changeNumber": 3200, "changePercent":0.3},
  {"occupation": "Transportation", "changeNumber": 483100, "changePercent":4.5},
]

let svg = d3.select('svg#growthPercent');

    // margin info used from site
    let graph1 = svg.append('g')
      .attr('transform', `translate(${margin}, ${margin})`);

    // creates x axis
    let xScale = d3.scaleBand()
      .domain(projectedGrowth.map((d) => d.occupation))
      .range([0, width])
      .padding(0.25)
      
    // creates y axis
    let yScale = d3.scaleLinear()
      .domain(d3.extent(projectedGrowth.map(d => d.changePercent)))
      .range([height, 0])
      
    let makeYLines = () => d3.axisLeft()
      .scale(yScale)

    // append the axis
    graph1.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(xScale));

      graph1.append('g').call(d3.axisLeft(yScale));


    // creates the Y background tick lines
    graph1.append('g')
      .attr('class', 'grid')
      .call(makeYLines()
        .tickSize(-width, 0, 0)
        .tickFormat('')
      )

    // creates the bar chart
    let barChart_1 = graph1.selectAll()
      .data(projectedGrowth)
      .enter()
      .append('g')

      barChart_1
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (g) => xScale(g.occupation))
      .attr('y', (g) => yScale(g.changePercent))
      .attr('height', (g) => height - yScale(g.changePercent))
      .attr('width', xScale.bandwidth())

      // when the mouse is hovered over bar
      .on('mouseenter', function(actual, i) {
        d3.selectAll('.value')
          .attr('opacity', 0)

        d3.select(this)
          .transition()
          .duration(300)
          .attr('opacity', 0.6)
          .attr('x', (a) => xScale(a.occupation) - 5)
          .attr('width', xScale.bandwidth() + 10)

        let y = yScale(actual.changePercent)

        line = graph1.append('line')
          .attr('id', 'limit')
          .attr('x1', 0)
          .attr('y1', y)
          .attr('x2', width)
          .attr('y2', y)

          barChart_1.append('text')
          .attr('class', 'divergence')
          .attr('x', (a) => xScale(a.occupation) + xScale.bandwidth() / 2)
          .attr('y', (a) => yScale(a.changePercent) + 30)
          .attr('fill', '#F9FFAE')
          .attr('text-anchor', 'middle')
          .text((a, idx) => {
            const divergence = (a.changePercent - actual.changePercent).toFixed(1)

            let text = ''
            if (divergence > 0) text += '+'
            text += `${divergence}%`

            return idx !== i ? text : '';
          })

      })

      //when the mouse is not hovering on bar
      .on('mouseleave', function() {
        d3.selectAll('.value')
          .attr('opacity', 1)

        d3.select(this)
          .transition()
          .duration(300)
          .attr('opacity', 1)
          .attr('x', (a) => xScale(a.occupation))
          .attr('width', xScale.bandwidth())

        graph1.selectAll('#limit').remove()
        graph1.selectAll('.divergence').remove()
      })
    
    // prints out the change in percent
    barChart_1
      .append('text')
      .attr('class', 'value')
      .attr('x', (a) => xScale(a.occupation) + xScale.bandwidth() / 2)
      .attr('y', (a) => yScale(a.changePercent) + 30)
      .attr('text-anchor', 'middle')
      .attr('fill', 'white')
      .text((a) => `${a.changePercent}%`)

    // surrounding labels
    svg
      .append('text')
      .attr('class', 'label')
      .attr('x', -(height / 2) - margin)
      .attr('y', margin / 2.4)
      .attr('transform', 'rotate(-90)')
      .attr('text-anchor', 'middle')
      .attr('font-size', 24)
      .text('Growth (%)')

    svg.append('text')
      .attr('class', 'label')
      .attr('x', width / 2 + margin)
      .attr('y', height + margin * 1.7)
      .attr('text-anchor', 'middle')
      .attr('font-size', 24)
      .text('Occupation Field')

    svg.append('text')
      .attr('class', 'title')
      .attr('x', width / 2 + margin)
      .attr('y', 40)
      .attr('text-anchor', 'middle')
      .attr('font-size', 24)
      .attr('font-weight', 'bold')
      .text('Expected Growth per Occupation Field (2018-2028)');

  
// based on materials from class and tutorial from: https://blog.risingstack.com/d3-js-tutorial-bar-charts-with-javascript/

// // GRAPH 2 
/*I attempted to encorporate a "dropdown" function
  but ultimatley failed/was unable to. I left the code for future use.
*/

// set the dimensions and margins of the graph
let margin2 = {top: 20, right: 30, bottom: 30, left: 230},
    width2 = 1250 - margin2.left - margin2.right,
    height2 = 500 - margin2.top - margin2.bottom;

let data = [
  {"field":"Computer Science", "growth":546200, "openings":403500},
  {"field":"Life/Physical/Social Science", "growth":97400, "openings":143300},
  {"field":"Engineering", "growth":85000, "openings":135400},
  {"field":"Mathematics", "growth":47700, "openings":18800},
  ]

// let transitionTime = 2000
// let data_global = []
// let xScale, yScale, xAxis, yAxis


// function setup(data) {
//   data_global = data
//
//   let variables = Object.keys(data[0]).filter(d => d != 'field')

  let svg2 = d3.select("svg#growthOpenings")
    .append("svg")
      .attr("width", width2 + margin2.left + margin2.right)
      .attr("height", height2 + margin2.top + margin2.bottom)

    .append("g")
      .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");

// d3.select('select#xvar')
//   .on('change', () => update(data_global))
//   .selectAll('option')
//   .data(variables)
//   .enter()
//   .append('option')
//   .attr('value', d => d)
//   .text(d => data[d])
//
//   d3.select('select.xvar').property('value', 'growth')
//
//   let xvar = d3.select('select.xvar').property('value')


// set the ranges
let yScale2 = d3.scaleBand()
          .range([height2, 0])
          .padding(0.1);

let xScale2 = d3.scaleLinear()
          .range([0, width2]);

  // set up domain
  xScale2.domain([0, d3.max(data, function(d){ return d.growth; })])
  yScale2.domain(data.map(function(d) { return d.field; }))
  
  // add the x Axis
  svg2.append("g")
      .attr("transform", "translate(0," + height2 + ")")
      .style('font-size', "16px")
      .call(d3.axisBottom(xScale2));

  // add the y Axis
  svg2.append("g")
      .style('font-size', "16px")
      .call(d3.axisLeft(yScale2));

// }
//
// function update(data) {
//
//   let xvar = d3.select('select.xvar').property('value')

  // add the rectangles
  svg2.selectAll("bar")
      .data(data.sort((a, b) => a.growth - b.growth))
      // .join(
      //   enter =>
      //   enter
      //   .append("rect")
      .enter()
      .append("rect")
      .attr("class", "bar")
      .transition()
      .duration(2000)
      .attr("width", function(d) {return xScale2(d.growth); } )
      .attr("y", function(d) { return yScale2(d.field); })
      .attr("height", yScale2.bandwidth())
      //   update =>
      //     update
      //     .transition()
      //     .duration(transitionTime)
      //     .attr("width", function(d) {return xScale(d[xvar]); } )
      //     exit =>
      //     exit
      //     .transition()
      //     .duration(transitionTime)
      //     .remove()
      // )


// title text, p1
  svg2.append("text")
      .attr('x', width2 / 2 )
      .attr('y', 30)
      .attr('text-anchor', 'middle')
      .attr('font-size', 20)
      .attr('font-weight', ' bold')
      .text('US-BLS Avg Annual U.S. STEM Job')

// title text, p2
  svg2.append("text")
      .attr('x', width2 / 2 )
      .attr('y', 50)
      .attr('text-anchor', 'middle')
      .attr('font-size', 20)
      .attr('font-weight', ' bold')
      .text('GROWTH Thru 2028 By Area')


// reference to inclass cars-explorer.js and https://gist.github.com/caravinden/eb0e5a2b38c8815919290fa838c6b63b




