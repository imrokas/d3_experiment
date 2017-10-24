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

const scaleBar = (selection, scale) => {
	selection.style('transform', `scaleX(${scale})`);
}

const fade = (selection, opacity) => {
	selection.style('fill-opacity', opacity);
}

const setFill = (selection, color) => {
	selection.style('fill', color);
}

// add rectangles to g containers
bar.append('rect')
		.style('width', d => d.score)
		.attr('class', 'bar')
		// equivalent to :hover
		.on('mouseover', function(d, i, elements) { // need to use function to have access to this
			d3.select(this)
				.call(scaleBar, 1.5)
				.call(setFill, 'orange');
				
			d3.selectAll(elements)
				.filter(':not(:hover)')
				.call(fade, 0.5);
		})
		.on('mouseout', function(d, i, elements) {
			d3.select(this)
				.call(scaleBar, 1)
				.call(setFill, 'lightgreen');

			d3.selectAll(elements)
				.call(fade, 1);
		});

// add text to each rect
bar.append('text')
	.attr('y', 20) // move text 20px up
	.attr('x', 10) // move text 10px right
	.text((d) => d.name);
		