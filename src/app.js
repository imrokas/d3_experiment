// SIMPLE LINE CHART
const margin = {
	top: 10,
	right: 20,
	bottom: 30,
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
	const parseTime = d3.timeParse('%Y/%m/%d');

	data.forEach(company => {
		company.values.forEach(d => {
			d.date = parseTime(d.date);
			d.close = +d.close;
		});
	});

	// x-axis
	const xScale = d3.scaleTime()
		.domain([
			d3.min(data, company => d3.min(company.values, d => d.date)),
			d3.max(data, company => d3.max(company.values, d => d.date))
		])
		.range([0, width]);

	svg
		.append('g')
			.attr('transform', `translate(0, ${height})`)
		.call(d3.axisBottom(xScale).ticks(5))


	// y-axis
	const yScale = d3.scaleLinear()
		.domain([
			d3.min(data, company => d3.min(company.values, d => d.close)),
			d3.max(data, company => d3.max(company.values, d => d.close))
		])
		.range([height, 0]);

	svg
		.append('g')
		.call(d3.axisLeft(yScale));

	// area generator
	const generateArea = d3.area()
		.x(d => xScale(d.date))
		.y0(yScale(yScale.domain()[0])) // get minimun value from yScale domain
		.y1(d => yScale(d.close)); // top of area

	svg
		.selectAll('.area')
		.data(data)
		.enter()
		.append('path')
		.attr('class', 'area')
		.attr('d', d => generateArea(d.values))
		.style('stroke', (d, i) => ['#FF9900', '#3369E8'][i])
    .style('stroke-width', 2)
    .style('fill', (d, i) => ['#FF9900', '#3369E8'][i])
    .style('fill-opacity', 0.5);
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