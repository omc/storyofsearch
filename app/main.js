require("./assets/style.scss");
require("./lib/canvas_helper.js");

window.Index = require("./lib/search.js");

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
  window.requestAnimationFrame(loop);

}, document.getElementById("intro-animation"));


// var React = require('react');
// var Chapter1 = require("./chapters/chapter_one/index.js");
// var Chapter2 = require("./chapters/chapter_two/index.js");

// var App = React.createClass({
//   render: function () {
//     return (
//       <div className="storyofsearch">
//         <div className="intro page">
//           <h1>The Story of Search</h1>
//         </div>
//         <div className="chapter page">
//           <Chapter1 />
//         </div>
//         <div className="chapter page">
//           <Chapter2 />
//         </div>
//       </div>
//     );
//   }
// });

// React.render(<App/>, document.getElementById('view'));