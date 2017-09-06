const React = require('react');
const ReactDOM = require('react-dom');
const IndexingAnimation = require("./interactions/indexing.js.jsx");
const SearchInteraction = require("./interactions/search.js.jsx");
const SearchIndex = require("./interactions/search_index.js");

require("./assets/style.scss")

const records = [{
  id: 1,
  text: "dog dog"
},{
  id: 2,
  text: "horse dog"
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

const index = new SearchIndex(records,{
  analyzers: [function(s) {
    return s.toLowerCase();
  }]
});

ReactDOM.render(<IndexingAnimation index={index} interval={300} />, document.getElementById('index-animation'));
ReactDOM.render(<SearchInteraction index={index} />, document.getElementById('search-interaction'));