// working with Dates and time scales, when plotting temporal data
const timeScale = d3.scaleTime()
	.domain([new Date(2017, 0, 1), new Date()]) // define date possible range
	.range([0, 100]) // range that values will plot against

console.log(timeScale(new Date(2017, 0, 15)))
console.log(timeScale(new Date(2017, 4, 15)))
console.log(timeScale(new Date()))
console.log(timeScale.invert(50)) // invert to get exactly middle date for the given domain