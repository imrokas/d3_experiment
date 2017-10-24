// while scaleQuantize maps continues range of values to discrete intervals
// scaleOrdinal maps non numeric value to specific value

const ordinalScale = d3.scaleOrdinal()
	.domain(["poor", "good", "great"]) // wraps around if domain values don't map 1:1 to given range
	.range(["red", "white", "blue"]);

console.log(ordinalScale("poor"));
console.log(ordinalScale("great"));
console.log(ordinalScale("good"));

// there is no inverts with ordinal scales