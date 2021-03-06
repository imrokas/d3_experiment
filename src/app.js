const data = [
  {name: 'Alice', math: 37,   science: 62,   language: 54},
  {name: 'Billy', math: null, science: 34,   language: 85},
  {name: 'Cindy', math: 86,   science: 48,   language: null},
  {name: 'David', math: 144,   science: null, language: 65},
  {name: 'Emily', math: 59,   science: 53,   language: 29}
];

const margin = { top: 10, right: 10, bottom: 30, left: 30 };
const width = 400 - margin.left - margin.right;
const height = 535 - margin.top - margin.bottom;

const svg = d3.select('.chart')
  .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .call(responsivefy)
  .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

const xScale = d3.scaleBand()
  .domain(data.map(d => d.name))
  .range([0, width])
  .padding(0.2);
svg
  .append('g')
    .attr('transform', `translate(0, ${height})`)
  .call(d3.axisBottom(xScale));

const yScale = d3.scaleLinear()
  .domain([0, 100])
  .range([height, 0]);
const yAxis = svg
  .append('g')
  .call(d3.axisLeft(yScale));

function render (subject = 'math') {
  const t = d3.transition().duration(1000);
  // figure elements that will get updated
  const update = svg.selectAll('rect')
    .data(data.filter(d => d[subject]), d => d.name);

  // animate and remove elements with null
  // values in new corresponding data
  update.exit()
    .transition(t)
    .attr('y', height)
    .attr('height', 0)
    .remove();

  // calculate new y-axis values
  yScale.domain([0, d3.max(data, d => d[subject])])
  // update and animate y-axis
  yAxis
    .transition(t)
    .delay(500)
    .call(d3.axisLeft(yScale));

  // animate old values that will change
  update
    .transition(t)
    .delay(1000)
    .attr('y', d => yScale(d[subject]))
    .attr('height', d => height - yScale(d[subject]));

  // move in and animate bars that were null before
  update
    .enter()
    .append('rect')
    .attr('y', height)
    .attr('height', 0)
    .attr('x', d => xScale(d.name))
    .attr('width', d => xScale.bandwidth())
    .transition(t)
    .delay(update.exit().size() ? 2000 : 0) // on first render delay will be 0
    .attr('y', d => yScale(d[subject]))
    .attr('height', d => height - yScale(d[subject]));
}

render();

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