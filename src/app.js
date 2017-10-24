// convert to svg
const scores = [
	{ name: "Alice", score: 96 },
	{ name: "Billy", score: 83 },
	{ name: "Cindy", score: 91 },
	{ name: "David", score: 96 },
	{ name: "Emily", score: 88 },
];

const bar = d3.select('.chart')
	.append('svg')
		.attr('width', 225)
		.attr('height', 300)
	.selectAll('g')
	.data(scores)
	.enter()
		.append('g')
		.attr('transform', (d, i) => `translate(0, ${i * 33})`);
		// graphic container doesn't have typical y prop

// add rectangles to g containers
bar.append('rect')
		.style('width', d => d.score)
		.attr('class', 'bar');

// add text to each rect
bar.append('text')
	.attr('y', 20) // move text 20px up
	.attr('x', 10) // move text 10px right
	.text((d) => d.name);
		