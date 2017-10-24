// dealing with margin d3 way
const margin = {
	top: 0,
	right: 0,
	bottom: 25,
	left: 25
};
// calculate width, height for inner elements,
// there will be no need to worry about margins
const width = 425 - margin.left - margin.right;
const height = 625 - margin.top - margin.bottom;

const svg = d3.select('.chart')
	.append('svg')
		.attr('width', width + margin.left + margin.right)
		.attr('height', height + margin.top + margin.bottom)
	.append('g')
		.attr('transform', `translate(${margin.left}, ${margin.top})`);

svg.append('rect')
	.attr('width', width)
	.attr('height', height)
	.style('fill', 'lightblue')
	.style('stroke', 'green')