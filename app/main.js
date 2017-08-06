require("./assets/style.scss");

var React = require('react');
var Chapter1 = require("./chapters/chapter_one/index.js");
var Chapter2 = require("./chapters/chapter_two/index.js");

var App = React.createClass({
  render: function () {
    return (<div className="chapters">
      <div className="chapter">
        <Chapter1 />
      </div>
      <div className="chapter">
        <Chapter2 />
      </div>
    </div>);
  }
});

React.render(<App/>, document.getElementById('view'));