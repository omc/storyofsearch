var React = require('react');

module.exports = React.createClass({

  render: function () {
    var postings = this.props.postings

    var active = postings[postings.length - 1];
    
    // groupby
    var tree = {};
    postings.forEach((p) => {
      if(!tree.hasOwnProperty(p.term)) {
        tree[p.term] = {};
      }
      tree[p.term][p.id] = (tree[p.term][p.id] || 0) + 1;
    })

    var keys = Object.keys(tree).sort()
    var rows = keys.map((k) => {

      var mod = 1;
      var active = active.term == k;
      var docs = tree[k];

      var freq = 0;

      var locs = Object.keys(docs).map((id) => {
        freq += docs[id];
        return <span>&lt;{id},{docs[id]}&gt;</span>
      });

      if(active) {
        if(mod < 1) {
          k = "";
        }
        if(mod < 2) {
          freq = "";
        }
        if(mod < 3) {
          locs = locs
        }
      }

      return (
        <tr className={active ? "active" : ""}>
          <td className="term">{k}</td>
          <td className="idf">{freq}</td>
          <td className="tf">
            {locs}
          </td>
        </tr>
      );
    });

    return (
      <table className="postings">
        <thead>
          <tr>
            <th>Term</th>
            <th>Freq</th>
            <th>Docs</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    );
  }
});