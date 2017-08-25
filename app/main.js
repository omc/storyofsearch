require("./assets/style.scss");
require("./assets/interactions.scss");

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
}, document.getElementById("intro-animation"));

// React components

var React = require('react');
var IndexingAnimation = require("./interactions/indexing.js.jsx");

var records = [{
  id: 1,
  text: "my dog is big"
},{
  id: 2,
  text: "my dog is dog"
},{
  id: 3,
  text: "dog dog dog"
},{
  id: 4,
  text: "dog is my friend"
},{
  id: 5,
  text: "helllo dog"
}];

React.render(<IndexingAnimation records={records} />, document.getElementById('index-animation'));

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

// 