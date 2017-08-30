require("./assets/style.scss");
require("./assets/interactions.scss");
require("./lib/canvas_helper.js");

// React components

var React = require('react');
var IndexingAnimation = require("./interactions/indexing.js.jsx");

var records = [{
  id: 1,
  text: "the dog jumped over the horse"
},{
  id: 2,
  text: "the horse mouth reeks of dog"
},{
  id: 3,
  text: "dog eat dog world"
},{
  id: 4,
  text: "dog is really small horse"
},{
  id: 5,
  text: "dog horse dog dog horse"
}];

React.render(<IndexingAnimation records={records} interval={300} />, document.getElementById('index-animation'));