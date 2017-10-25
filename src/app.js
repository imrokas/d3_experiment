// SIMPLE LINE CHART
const margin = {
	top: 25,
	right: 25,
	bottom: 25,
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
	// helper function to parse time
	const parseTime = d3.timeParse('%Y/%m/%d');

	// parse and setup data
	data.forEach(company => {
		company.values.forEach(d => {
			d.date = parseTime(d.date); // parse date
			d.close = +d.close; // convert to numbers
		});
	});

	// x-axis
	const xScale = d3.scaleTime()
		.domain([
			d3.min(data, co => d3.min(co.values, d => d.date)),
			d3.max(data, co => d3.max(co.values, d => d.date)),
		])
		.range([0, width]);

	svg
		.append('g')
			.attr('transform', `translate(0, ${height})`)
		.call(d3.axisBottom(xScale).ticks(5));

	// y-axis
	const yScale = d3.scaleLinear()
		.domain([
			d3.min(data, co => d3.min(co.values, d => d.close)),
			d3.max(data, co => d3.max(co.values, d => d.close))
		])
		.range([height, 0]);

	svg
		.append('g')
		.call(d3.axisLeft(yScale));


	// create line helper funtion
	const drawLine = d3.line()
		.x(d => xScale(d.date))
		.y(d => yScale(d.close))
		.curve(d3.curveCatmullRom.alpha(0.5)); // add curve smoothing

	// draw lines
	svg
		.selectAll('.line')
		.data(data)
		.enter()
		.append('path')
		.attr('class', 'line')
		.attr('d', d => drawLine(d.values))
		.style('stroke', (d, i) => ['#FF9900', '#3369E8'][i]) // map colors to lines
    .style('stroke-width', 2)
    .style('fill', 'none'); // don't fill in path


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