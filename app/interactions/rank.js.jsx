var _ = require('lodash');
var React = require('react');
var SearchIndex = require('./search_index.js');

class RankInteraction extends React.Component {

  constructor(props) {
    super(props);
  }

  state = {
    tokens: [],
    index: new SearchIndex(this.props.records, {
      analyzers: [function(token) {
        return token.toLowerCase();
      }]
    })
  }

  setTerms(event) {
    this.setState({
      tokens: event.target.value.toLowerCase().split(/\s+/)
    });
  }

  render() {

    let index = this.state.index;
    let matches = index.search(this.state.tokens);

    let rows = _.reverse(_.sortBy(matches, "rank")).map((m) => {
      return (
        <tr>
          <td>{m.id}</td>
          <td>{m.rank.toFixed(3)}</td>
          <td className="term-matches">
            {m.matches.map((match) => {
              return <span><strong>{match.term}:</strong>{match.rank.toFixed(2)}</span>;
            })}
          </td>
        </tr>
      )
    });

    if(rows.length == 0) {
      rows = (
        <tr>
          <td colSpan={3} className="center">No documents found</td>
        </tr>
      );
    }


    return (
      <div className="search">
        <div className="searchbox">
          <input type="text" onChange={this.setTerms.bind(this)} placeholder="Search..." />
        </div>
        <div className="hits">
          <table className="styled">
            <thead>
              <tr>
                <th width="35x">ID</th>
                <th>Rank</th>
                <th>Term Ranks</th>
              </tr>
            </thead>
            <tbody>
              {rows}
            </tbody>
          </table>

        </div>
      </div>
    );
  }

}

module.exports = RankInteraction;