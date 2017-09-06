var _ = require('lodash');
var React = require('react');

class IndexTable extends React.Component {


  /*
  * We take the terms and generate a spanning forrest:
  *
  *                +---->offset+meta
  *                |
  *      +----->doc+---->offset+meta
  *      |
  *  term+----->doc+---->offset+meta
  *      |
  *      +----->doc+---->offset+meta
  *                |
  *                +---->offset+meta
  *
  *
  * Then leverage each sub-tree as a row in the table.
  *
  */
  render() {

    function emptyRow(key) {
      return (
        <tr  key={"er-" + key}>
          <td className="term">&nbsp;</td>
          <td className="tf">
          </td>
        </tr>
      );
    }

    var frame = this.props.frame;
    var terms = _.groupBy(frame.postings, "term");
    var stage = frame.stage;
    var rows = Object.keys(terms).sort().map((k, i) => {
      var active = frame.term == k;
      var freqActive = active && stage > 1;
      var termActive = active && stage > 0;
      var docs = _.groupBy(terms[k], "id");
      var freq = 0;

      var locs = Object.keys(docs).map((id, j) => {

        var occurances = docs[id];
        var term = occurances[occurances.length - 1];
        var docActive = frame.record_id == id && k == frame.term;

        if(docActive && stage > 1) {          
          return <span className="delim active" key={"term" + j}>&lt;{term.id}&gt;</span>
        }

        return <span className="delim" key={"term" + j}>&lt;{term.id}&gt;</span>
      });

      if(frame.matched_tokens) {
        active = _.some(frame.matched_tokens, function(m) {
          return m == k;
        });
      }

      return (
        <tr className={active ? "active" : ""} key={"term" + i}>
          <td className="term"><span className={termActive ? "active" : ""}>{k}</span></td>
          <td className="tf">
            {locs}
          </td>
        </tr>
      );
    });

    while(rows.length < this.props.rows) {
      rows.push(emptyRow(rows.length));
    }

    return (
      <table className="postings styled">
        <thead>
          <tr>
            <th width="100">Token</th>
            <th>Document Ids</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    );
  }

}

module.exports = IndexTable;