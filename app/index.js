const React = require('react');
const ReactDOM = require('react-dom');
const IndexingAnimation = require("./interactions/indexing.js.jsx");
const SearchInteraction = require("./interactions/search.js.jsx");
const SearchIndex = require("./interactions/search_index.js");

require("./fade-in.js");
require("./assets/style.scss");


const records = [
  "chicken pot pie",
  "raspberry pie",
  "blueberry pie",
  "chicken soup",
  "tomato soup",
  "raspberry ice cream",
  "blueberry ice cream"
].map((text, i) => {
  return  {
    id: i + 1,
    text: text
  }
});

const index = new SearchIndex(records,{
  analyzers: [function(s) {
    return s.toLowerCase();
  }]
});

ReactDOM.render(<IndexingAnimation index={index} interval={640} />, document.getElementById('index-animation'));
ReactDOM.render(<SearchInteraction index={index} />, document.getElementById('search-interaction'));

// Google tag manager
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-TFG6VVV');
