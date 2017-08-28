var _ = require('lodash');
var React = require('react');

module.exports = React.createClass({

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
  render: function () {

    function emptyRow() {
      return (
        <tr>
          <td className="term">&nbsp;</td>
          <td className="idf"></td>
          <td className="tf">
          </td>
        </tr>
      );
    }

    var frame = this.props.frame;
    var terms = _.groupBy(frame.postings, "term");
    var stage = frame.stage;
    var rows = Object.keys(terms).map((k) => {
      var active = frame.term == k;
      var freqActive = active && stage > 1;
      var termActive = active && stage > 0;
      var docs = _.groupBy(terms[k], "id");
      var freq = 0;

      var locs = Object.keys(docs).map((id, i) => {

        var occurances = docs[id];
        var term = occurances[occurances.length - 1];
        var docActive = frame.record_id == id && k == frame.term;

        if(docActive) {
          if(stage > 1) {
            freq += occurances.length;
          } else {
            freq += occurances.length - 1;
          }
          
          if(stage > 2) {
            return <span className="active">&lt;{term.id},{occurances.length}&gt;</span>
          }
          return <span>&lt;{term.id},{occurances.length - 1}&gt;</span>;
        }

        freq += occurances.length;
        return <span>&lt;{term.id},{occurances.length}&gt;</span>
      });

      return (
        <tr className={active ? "active" : ""}>
          <td className="term"><span className={termActive ? "active" : ""}>{k}</span></td>
          <td className="idf"><span className={freqActive ? "active" : ""}>{freq}</span></td>
          <td className="tf">
            {locs}
          </td>
        </tr>
      );
    });

    while(rows.length < this.props.rows) {
      rows.push(emptyRow());
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