// RESPONSIVEFY CHART
const margin = {
	top: 25,
	right: 0,
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
		// .attr('viewBox', `0 0 ${fullWidth} ${fullHeight}`) // size is inverse of what you want, to scale down - need to multiply by 2
	.append('g')
		.attr('transform', `translate(${margin.left}, ${margin.top})`);

svg.append('rect')
	.attr('width', width)
	.attr('height', height)
	.style('fill', 'lightblue')
	.style('stroke', 'green')

const yScale = d3.scaleLinear()
	.domain([0, 100]) // defines y axis scale values
	.range([height, 0]); // because y goes in reverse in svg's

const yAxis = d3.axisLeft(yScale) // create y axis
	//.ticks(5, ); // amount of ticks to show on axis, second param label
	//.tickValues([8, 17, 29, 78]) // custom tick values
svg.call(yAxis); // add axis to chart

const xScale = d3.scaleTime()
	.domain([new Date(2017, 9, 24), new Date(2017, 10, 24)])
	.range([0, width]);

const xAxis = d3.axisBottom(xScale)
	.ticks(5);

svg
	.append('g')
		.attr('transform', `translate(0, ${height})`)
	.call(xAxis);


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