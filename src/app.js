// MODIFYING DOM ELEMENTS
const secondLink = d3.select('a:nth-child(2');
// get attribute value
console.log(secondLink.attr('href'));
// set attribute
secondLink.attr('href', 'https://www.google.com');
console.log(secondLink.attr('href'));

// modify css styles
// secondLink.style('color', 'red');

// add css class
secondLink.classed('red', true)

// plain text
secondLink.text('Inventory')
// html text
secondLink.html('Product <b>SALE</b>')