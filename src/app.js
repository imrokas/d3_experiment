const linearScale = d3.scaleLinear()
	.domain([0, 100]) // input domain, values that we are expecting to get
	.range([0, 600]) // range to map the values to
	.clamp(true); // clamp value so it would always fit the given range

console.log(linearScale(-50))
console.log(linearScale(0))
console.log(linearScale(25))
console.log(linearScale(50))
console.log(linearScale(75))
console.log(linearScale(100))
console.log(linearScale(150))

console.log(linearScale.invert(300))