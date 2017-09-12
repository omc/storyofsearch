var React = require('react');

class DataTable extends React.Component {

  emptyRow(key) {
    return (
      <tr key={"row-emp-" + key}>
        <td className="id"></td>
        <td className="text">&nbsp;</td>
      </tr>
    );
  }

  getRow(data, active, idx, key) {
    var text = data.text.split(/\s+/).map((term, i) => {
      return (active && i == idx) ? <span className="active" key={"term-" + i}>{term}</span> : <span  key={"term-" + i}>{term}</span>
    });

    return (
      <tr className={active ? "active" : ""} key={"row-" + key}>
        <td className="id center">{data.id}</td>
        <td className="text">
          {text}
        </td>
      </tr>
    );
  }

  render() {
    var minRows = this.props.rows || 0;
    var frame = this.props.frame;
    var rows = this.props.records.map((v, i) => {
      return this.getRow(v, v.id == frame.record_id, frame.token_offset, i);
    });

    // Padd table
    while(rows.length < minRows) {
      rows.push(this.emptyRow(rows.length));
    }

    return (
      <table className="data-source styled">
        <thead>
          <tr>
            <th width="20" className="center">Id</th>
            <th>Text</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    );
  }

}

module.exports = DataTable;
