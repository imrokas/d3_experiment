// SELECTORS

// // select single node
// const link = d3.select('div')
// console.log(link.nodes())

// // select multiple nodes
// const links = d3.selectAll('a')
// console.log(links.nodes

// select from whole DOM
const div = d3.select('div')
console.log(div.nodes())

// select just from DIV, applies same caching as with jquery
const divLinks = div.selectAll('a')
console.log(divLinks.nodes())
console.log('number of links:', divLinks.size())

// can use CSS selectors as well