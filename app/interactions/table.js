var React = require('react');

module.exports = React.createClass({

  getRow: function(data, active, term, idx) {
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
    var item = this.props.activeToken;
    var data = this.props.records;
    var rows = data.map((v, i) => {
      return this.getRow(v, v.id == item.id, item.term, item.termIdx);
    });

    return (
      <table className="data-source">
        <thead>
          <tr>
            <th>Id</th>
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