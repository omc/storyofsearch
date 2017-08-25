var _ = require('lodash');
var React = require('react');
var Table = require('./table.js.jsx');
var Index = require('./index.js.jsx');


// var records = [{
//   id: 1,
//   text: "my dog is big"
// },{
//   id: 2,
//   text: "my dog is dog"
// },{
//   id: 3,
//   text: "dog dog dog"
// },{
//   id: 4,
//   text: "dog is my friend"
// },{
//   id: 5,
//   text: "helllo dog"
// }];

// // convert text to [term, id] tuples
// var tuples = [].concat.apply([], records.map((r) => {
//   return r.text.split(/\s+/).map((term, idx) => {
//     return {
//       id: r.id,
//       term: term, 
//       idx: idx
//     };
//   });
// }));

// Animation time per frame
var interval = 500;

module.exports = React.createClass({

  getInitialState: function() {
    return {
      tick: 0,
      scene: null,
      records: this.props.records,
      tuples: this.generateTuples(this.props.records)
    }
  },

  generateTuples: function(records) {
    return [].concat.apply([], records.map((r) => {
      return r.text.split(/\s+/).map((term, idx) => {
        return {
          id: r.id,
          term: term, 
          idx: idx
        };
      });
    }));
  },

  // Staging frame, empty, waiting for input
  computeStagingFrame: function() {
    return {
      index: {
        css: "",
        style: {
          visibility: "hidden",
          opacity: 0
        },
        data: {
          postings: []
        }
      },
      database: {
        css: "",
        style: {
          left: "30%"
        },
        data: {}
      },
      button: {
        css: "",
        style: {
          display: "block"
        }
      },
      form: {
        css: "",
        style: {
          display: "none"
        }
      }
    };
  },

  // Intro frame slides the table over, and presents an empty index
  computeIntroFrame: function(tick) {
    // TODO: Move this!
    if(tick > 1) {
      setTimeout(() => {
        this.setScene("indexing")
      }, 1)
    }
    return _.merge(this.computeStagingFrame(), {
      index: {
        style: {
          visibility: "visible",
          opacity: 1
        }
      },
      database: {
        style: {
          left: 0
        }
      },
      button: {
        style: {
          display: "none"
        }
      },
      form: {
        style: {
          display: "block"
        }
      }
    });
  },

  // Indexing frames show terms being index
  computeIndexingFrame: function(tick) {
    var tuples = this.state.tuples;
    // Determine which panel to focus on via modulo 2
    var subtick = tick % 4;
    var idx = Math.min(Math.floor(tick / 4), tuples.length - 1);

    // this needs to LAG for the index phase
    var postings = tuples.slice(0, idx + 1);
    var active = tuples[idx];
    var running = idx < tuples.length - 1;

    return _.merge(this.computeIntroFrame(0), {
      database: {
        css: (running && subtick == 0) ? "active" : "",
        data: {
          record_id: active.id,
          token_offset: active.idx
        }
      },
      index: {
        css: (running && subtick > 0) ? "active" : "",
        data: {
          stage: subtick,
          postings: postings,
          term: active.term,
          record_id: active.id
        }
      }
    });
  },



  // Generate a frame for a given scene and tick
  computeFrame: function(scene, tick) {
    if(scene == null) {
      return this.computeStagingFrame();
    } else if(scene == "intro") {
      return this.computeIntroFrame(tick);
    } else if(scene == "indexing") {
      return this.computeIndexingFrame(tick);
    }
  },

  setScene: function(scene) {
    this.setState({
      tick: 0,
      scene: scene
    })
  },

  createIndex: function() {
    this.setScene("intro");
    this.timer = setInterval(() => {
      requestAnimationFrame(() => {
        this.setState({
          tick: this.state.tick + 1
        });      
      })
    }, interval);
  },

  // Add a record to the database
  addRecord: function(event) {
    event.preventDefault();

    var records = this.state.records;
    records.push({
      id: records.length + 1,
      text: this.state.text
    });
    
    this.setState({
      records: records,
      tuples: this.generateTuples(records)
    });
  },

  buildRecord: function(event) {
    this.setState({text: event.target.value.toLowerCase()});
  },

  render: function () {
    var frame = this.computeFrame(this.state.scene, this.state.tick);

    var index = (
      <div className={"index " + frame.index.css} style={frame.index.style}>
        <Index frame={frame.index.data} rows={10} />
      </div>
    );

    var database = (
      <div className={"source " + frame.database.css} style={frame.database.style}>
        <Table records={this.state.records} frame={frame.database.data} />
      </div>
    );

    var button = (
      <div onClick={this.createIndex} className="button" style={frame.button.style}>Create Index</div>
    )

    var controls = (
      <div className="form" style={frame.form.style}>
        <form onSubmit={this.addRecord}>
          <input type="text" onChange={this.buildRecord} />
        </form>

      </div>
    )

    return (
      <div className="indexing">
        <div className="animation">
          {database}
          {index}
        </div>
        <div className="controls">
          {button}
          {controls}
        </div>
      </div>
    );
  }
});