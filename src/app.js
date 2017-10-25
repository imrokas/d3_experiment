// gets destroyed after 1s after page is loaded
// so if one wants to use when it's need to move to inside
// of the function, or create factory function
// const trans = d3.transition()
// 		.delay(1000)
// 		.duration(1000);


const go = () => {
	// move in to execute just during call time
	const trans = d3.transition()
		.delay(1000)
		.duration(1000);

	d3.selectAll('.block')
		.transition(trans)
		.style('width', '400px');

	d3.select('.a')
		.transition(trans)
		.style('background-color', 'orange');

	d3.select('.b')
		.transition(trans)
		.style('background-color', 'forestgreen');
}

// create transition config function
const configureTransition = (trans, delay, duration) => (
	trans
		.delay(delay)
		.duration(duration)
);

const goNow = () => {
	console.log('GO NOW CALLED')
	d3.selectAll('.block')
		.transition()
		.call(configureTransition, 1000, 1000)
		.style('height', '300px');
}