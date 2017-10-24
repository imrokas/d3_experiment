// Sometimes data needs to be converted from a continuous range, like test scores,
// to a discrete set of output values, like letter grades. 

const quantizeScale = d3.scaleQuantize()
	.domain([0, 100])
	.range(["red", "white", "blue", "green"]); // define discrete intervals where values will live in

console.log(quantizeScale(22))
console.log(quantizeScale(45))
console.log(quantizeScale(50))
console.log(quantizeScale(88))
console.log(quantizeScale(-150)) // values below domain range will fall to first discrete interval
console.log(quantizeScale(150)) // values above domain range will fall to last discrete interval
console.log(quantizeScale.invertExtent("white")) // range will [x, y)