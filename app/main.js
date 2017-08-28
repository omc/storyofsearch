require("./assets/style.scss");
require("./assets/interactions.scss");
require("./lib/canvas_helper.js");

// Bubble animation
$canvas(function(g, s) {

  var bubbles = [];
  for(var i = 0;i < 128;i++) {
    bubbles.push({
      color: "rgba(2,119,158,0.5)",
      size: 4 + Math.floor(Math.random() * 20),
      x: Math.random() * s.width,
      y: Math.random() * s.height,
      yv: Math.random(),
      xv: Math.random()
    });
  }

  function tick(bubble) {
    bubble.x = bubble.x + (bubble.size / 32);
  }

  function render() {
    g.clearRect(0, 0, s.width, s.height);
    bubbles.forEach(function(bubble) {
      g.fillStyle = bubble.color;
      g.beginPath();
      g.arc(bubble.x, bubble.y, bubble.size, 0, 2 * Math.PI);
      g.closePath();
      g.fill();
      if(bubble.x - bubble.size > s.width) {
        bubble.x = -bubble.size;
      } else {
        tick(bubble);
      }
    });
    
  }

  // RAF loop
  var loop = function() {
    render();
    requestAnimationFrame(loop);
  }
}, document.getElementById("intro-animation"));

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