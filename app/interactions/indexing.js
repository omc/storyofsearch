var React = require('react');
var Table = require('./table');
var Index = require('./index');




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
}];

// convert text to [term, id] tuples
var tuples = [].concat.apply([], records.map((r) => {
  return r.text.split(/\s+/).map((term, idx) => {
    return {
      id: r.id,
      term: term, 
      idx: idx
    };
  });
}));

// Animation time per frame
var interval = 250;

module.exports = React.createClass({

  getInitialState: function() {
    return {
      tick: 0
    }
  },

  getActiveItem: function() {
    var idx = Math.floor(this.state.tick / 4) % tuples.length;
    // var ticker = (this.state.tick / 3) % tuples.length;
    var postings = tuples.slice(0, idx + 1);
    var active = tuples[idx];

    // Build empty dataset, fill as required
    // split state

    return {
      id: active.id,
      term: active.term,
      termIdx: active.idx,
      tick: this.state.tick,
      postings: postings
    }
  },

  componentDidMount: function() {
    setInterval(() => {
      requestAnimationFrame(() => {
        this.setState({
          tick: this.state.tick + 1
        });      
      })
    }, interval);
  },

  render: function () {
    var item = this.getActiveItem();
    return (
      <div className="indexing">
        <div className="source">
          <h2>Database</h2>
          <Table records={records} activeToken={item} />
        </div>
        <div className="index">
          <h2>Search Index</h2>
          <Index postings={item.postings} tick={item.tick} />
        </div>
        <div className="clearfix" />
      </div>
    );
  }
});