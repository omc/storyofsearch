var React = require('react');
var ReactDOM = require('react-dom');
var IndexingAnimation = require("./interactions/indexing.js.jsx");
var SearchInteraction = require("./interactions/search.js.jsx");

require("./assets/style.scss")

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

ReactDOM.render(<IndexingAnimation records={records} interval={300} />, document.getElementById('index-animation'));
ReactDOM.render(<SearchInteraction records={records} />, document.getElementById('search-interaction'));