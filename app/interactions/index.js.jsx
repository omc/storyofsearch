var React = require('react');

module.exports = React.createClass({

  render: function () {
    var frame = this.props.frame;
    var postings = frame.postings;

    var tree = {};
    postings.forEach((p) => {
      if(!tree.hasOwnProperty(p.term)) {
        tree[p.term] = {};
      }
      tree[p.term][p.id] = (tree[p.term][p.id] || 0) + 1;
    });

    var keys = Object.keys(tree).sort()
    var rows = keys.map((k) => {

      var mod = 1;
      var active = frame.term == k;
      var docs = tree[k];

      var freq = 0;

      var locs = Object.keys(docs).map((id) => {
        freq += docs[id];
        return <span>&lt;{id},{docs[id]}&gt;</span>
      });

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

    while(rows.length < this.props.rows) {
      rows.push((
        <tr>
          <td className="term">&nbsp;</td>
          <td className="idf"></td>
          <td className="tf">
          </td>
        </tr>
      ));
    }

    return (
      <table className="postings">
        <thead>
          <tr>
            <th width="100">Term</th>
            <th width="50">Freq</th>
            <th>&lt;Id, Freq&gt;</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    );
  }
});