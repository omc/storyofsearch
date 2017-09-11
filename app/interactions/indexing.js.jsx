var _ = require('lodash');
var $ = require('jquery');
var React = require('react');
var Table = require('./table.js.jsx');
var Index = require('./index_simple.js.jsx');

const base_frame = {
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
      left: "25%"
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
}


class IndexingAnimation extends React.Component {

  constructor(props) {
    super(props);
  }

  state = {
    records: this.props.index.records,
    tuples: this.props.index.tokenSet(),

    // Animation constructs
    tick: 0,
    scene: null,
    running: true,
    frame: base_frame
  }

  // Intro frame slides the table over, and presents an empty index
  computeIntroFrame(tick) {
    // TODO: Move this!
    if(tick > 1) {
      setTimeout(() => {
        this.setFrame("indexing", 0)
      }, 1)
    }
    return _.merge({}, base_frame, {
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
      }
    });
  }

  // Indexing frames show terms being index
  computeIndexingFrame(tick) {
    var tuples = this.state.tuples;
    // Determine which panel to focus on via modulo 2

    var idx = Math.min(Math.floor(tick / 3), tuples.length - 1);
    var running = idx < tuples.length - 1;
    var subtick = running ? (tick % 3) : 2;

    // this needs to LAG for the index phase
    var postings = tuples.slice(0, idx + 1);
    var active = tuples[idx];

    return _.merge({}, this.computeIntroFrame(0), {
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
          record_id: active.id,
          token_offset: active.idx
        }
      },
      form: {
        style: {
          display: "block"
        }
      }
    });
  }

  // Generate a frame for a given scene and tick
  computeFrame(scene, tick) {
    if(scene == "intro") {
      return this.computeIntroFrame(tick);
    } else if(scene == "indexing") {
      return this.computeIndexingFrame(tick);
    }
  }

  // Set the current frame state
  setFrame(scene, tick) {
    this.setState({
      tick: tick,
      scene: scene,
      frame: this.computeFrame(scene, tick)
    })
  }

  createIndex() {
    this.setFrame("intro", 0);
    this.timer = setInterval(() => {
      if(this.state.running) {
        requestAnimationFrame(() => {
          this.setFrame(this.state.scene, this.state.tick + 1)
        })
      }
    }, this.props.interval);

    // Odd hack to work around display issues
    $(".penelope-pointing").hide();
  }

  onSlide(event) {
    this.setState({
      running: false
    })
    this.setFrame(this.state.scene, event.target.value);
  }

  render() {
    var frame = this.state.frame;

    var index = (
      <div className={"index " + frame.index.css} style={frame.index.style}>
        <Index frame={frame.index.data} rows={10} />
      </div>
    );

    var database = (
      <div className={"source " + frame.database.css} style={frame.database.style}>
        <Table records={this.state.records} frame={frame.database.data} rows={10} />
      </div>
    );

    var button = (
      <div onClick={this.createIndex.bind(this)} className="button" style={frame.button.style}>Create Index</div>
    )

    var controls = (
      <div className="form" style={frame.form.style}>
        <input className="slider"
          type="range"
          value={this.state.tick}
          min={0}
          max={this.state.tuples.length * 3}
          onChange={this.onSlide.bind(this)}
          step={1} />
        <p className="notes">
          During indexing, raw text is transformed into a set of "tokens". These are added to the index with a reference to each document. This structure allows for fast search results for a given token.
        </p>
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

}

module.exports = IndexingAnimation;
