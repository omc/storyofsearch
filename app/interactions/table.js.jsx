var React = require('react');

module.exports = React.createClass({

  getRow: function(data, active, idx) {
    var text = data.text.split(/\s+/).map((term, i) => {
      return (active && i == idx) ? <span className="active">{term}</span> : <span>{term}</span>
    });

    return (
      <tr className={active ? "active" : ""}>
        <td className="id">{data.id}</td>
        <td className="text">
          {text}
        </td>
      </tr>
    );
  },

  render: function () {
    var frame = this.props.frame;
    var rows = this.props.records.map((v) => {
      return this.getRow(v, v.id == frame.record_id, frame.token_offset);
    });


    return (
      <table className="data-source">
        <thead>
          <tr>
            <th width="35x">Id</th>
            <th>Full Text</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    );
  }
});