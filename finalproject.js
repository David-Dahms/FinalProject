let margin = 70;
let width = 1300 - 2 * margin;
let height = 500 - 2 * margin;

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
  {"occupation": "Personal Care", "changeNumber": 1237600, "changePercent":17.4},
  {"occupation": "Farming/Fishing", "changeNumber": 3200, "changePercent":0.3},
  {"occupation": "Transportation", "changeNumber": 483100, "changePercent":4.5},
]

let svg = d3
  .select('svg#growthPercent');

    // margin info used from site
    let graph1 = svg.append('g')
      .attr('transform', `translate(${margin}, ${margin})`);

    // creates x axis
    const xScale = d3.scaleBand()
      .domain(projectedGrowth.map((d) => d.occupation))
      .range([0, width])
      .padding(0.25)

    // creates y axis
    const yScale = d3.scaleLinear()
      .domain(d3.extent(projectedGrowth.map(d => d.changePercent)))
      .range([height, 0])


    const makeYLines = () => d3.axisLeft()
      .scale(yScale)

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

    let growthBar = graph1.selectAll()
      .data(projectedGrowth)
      .enter()
      .append('g')

    growthBar
      .append('rect')
      .attr('class', 'bar')
      // .attr('fill', 'white')
      .attr('x', (g) => xScale(g.occupation))
      .attr('y', (g) => yScale(g.changePercent))
      .attr('height', (g) => height - yScale(g.changePercent))
      .attr('width', xScale.bandwidth())
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

        growthBar.append('text')
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

    growthBar
      .append('text')
      .attr('class', 'value')
      .attr('x', (a) => xScale(a.occupation) + xScale.bandwidth() / 2)
      .attr('y', (a) => yScale(a.changePercent) + 30)
      .attr('text-anchor', 'middle')
      .attr('fill', 'white')
      .text((a) => `${a.changePercent}%`)

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
      .text('Expected Growth per Occupation Field (2018-2028)')


/*
NEW GRAPH, V2

*/

let svg = d3
  .select('svg#growthOpenings');


