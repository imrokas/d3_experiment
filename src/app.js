// loading data from files


// READING DATA
// //json
// d3.json("data/data.json", (data) => {
// 	console.log("JSON DATA:", data);
// });

// //csv
// d3.csv("data/data.csv", (data) => {
// 	console.log("CSV DATA:", data);
// });

// // tsv
// d3.tsv("data/data.tsv", (data) => {
// 	console.log("TSV DATA:", data);
// });

// MANIPULATING READ DATA
d3.json("data/data.json", (data) => {
	const getAge = (p) => p.age;
	// get min
	const min = d3.min(data, getAge);
	console.log("MIN:", min);
	// get max
	const max = d3.max(data, getAge);
	console.log("MAX:", max);
	// find [min, max] values that can be used as domain for chart
	const extent = d3.extent(data, (p) => p.age);
	// create linear scale
	var scales = d3.scaleLinear()
		.domain(extent)
		.range([0, 600]);

	console.log(scales(37));
	console.log(scales.invert(600));

	// get a set of possible values
	const ages = d3.set(data, getAge);
	console.log('AGES:', ages.values())
});