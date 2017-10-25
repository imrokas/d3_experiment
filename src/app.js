// SIMPLE BAR CHART
const margin = {
	top: 25,
	right: 25,
	bottom: 60,
	left: 30
};
// calculate width, height for inner elements,
// there will be no need to worry about margins
const width = 400 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

const svg = d3.select('.chart')
	.append('svg')
		.attr('width', width + margin.left + margin.right)
		.attr('height', height + margin.top + margin.bottom)
		.call(responsivefy)
	.append('g')
		.attr('transform', `translate(${margin.left}, ${margin.top})`);

// load data
d3.json('./data/data.json', (err, data) => {
	

	const yScale = d3.scaleLinear()
		.domain(d3.extent(data, d => d.expectancy)) // defines y axis scale values as life expectancy from data
		.range([height, 0]) // because y goes in reverse in svg's
		.nice()

	const yAxis = d3.axisLeft(yScale) // create y axis
		//.ticks(5, ); // amount of ticks to show on axis, second param label
		//.tickValues([8, 17, 29, 78]) // custom tick values
	svg.call(yAxis); // add axis to chart

	const xScale = d3.scaleLinear()
		.domain(d3.extent(data, d => d.cost))
		.range([0, width])
		.nice();

	const xAxis = d3.axisBottom(xScale)
		.ticks(5);

	svg
		.append('g')
			.attr('transform', `translate(0, ${height})`)
		.call(xAxis)

	// scale for circle sizes
	const rScale = d3.scaleSqrt()
		.domain([0, d3.max(data, d => d.population)]) // plot population size
		.range([0, 40]); // max size of circle

	// add circles to the chart
	const circles =	svg
		.selectAll('.ball')
		.data(data)
		.enter()
		.append('g')
		.attr('class', 'ball')
		.attr('transform', d => {
			return `translate( ${xScale(d.cost)}, ${yScale(d.expectancy)} )`
		})

	// draw circles
	circles
		.append('circle')
		.attr('cx', 0)
		.attr('cy', 0)
		.attr('r', d => rScale(d.population))

	// add labels
	circles
		.append('text')
		.style('text-anchor', 'middle')
		.style('fill', 'black')
		.attr('y', 4) // move down 4px
		.text(d => d.code);

});




/**
 * HELPERS
 */

function responsivefy(svg) {
  // get container + svg aspect ratio
  var container = d3.select(svg.node().parentNode),
      width = parseInt(svg.style("width")),
      height = parseInt(svg.style("height")),
      aspect = width / height;

  // add viewBox and preserveAspectRatio properties,
  // and call resize so that svg resizes on inital page load
  svg.attr("viewBox", "0 0 " + width + " " + height)
      .attr("preserveAspectRatio", "xMinYMid")
      .call(resize);

  // to register multiple listeners for same event type,
  // you need to add namespace, i.e., 'click.foo'
  // necessary if you call invoke this function for multiple svgs
  // api docs: https://github.com/mbostock/d3/wiki/Selections#on
  d3.select(window).on("resize." + container.attr("id"), resize);

  // get width of container and resize svg to fit it
  function resize() {
      var targetWidth = parseInt(container.style("width"));
      svg.attr("width", targetWidth);
      svg.attr("height", Math.round(targetWidth / aspect));
  }
}