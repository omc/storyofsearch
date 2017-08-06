var React = require('react');
var Intro = require('./intro');

module.exports = React.createClass({
  render: function () {
    return (<div>
      <h1>Chapter 1</h1>
      <Intro />
    </div>);
  }
});