// CREATE DOM ELEMENTS
// .append, .insert
d3.select('.title')
	.insert('button', 'a:nth-child(2)') // changes the selection to new appended element
	.html('Inventory <b>SALE</b>');

// remove() to remove element