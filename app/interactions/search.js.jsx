var _ = require('lodash');
var React = require('react');
var Table = require('./table.js.jsx');
var Index = require('./index_simple.js.jsx');


class SearchInteraction extends React.Component {

  constructor(props) {
    super(props);
  }

  state = {
    tokens: []
  }

  setTerms(event) {
    this.setState({
      tokens: event.target.value.split(/\s+/).map((s) => {
        return this.props.index.analyze(s);
      })
    });
  }

  render() {

    let index = this.props.index;
    let matches = index.search(this.state.tokens);
    let records = index.searchRecords(matches);
    let tokens  = index.tokenSet();

    let note = <p className="note"></p>;
    if(matches.length > 0) {
      note = (
        <p className="note">
          The search engine quickly finds records for matching tokens.
        </p>
      );
    }


    let frame = {
      postings: tokens,
      matched_tokens: this.state.tokens
    }

    return (
      <div className="search">
        <div className="searchbox">
          <input type="text" onChange={this.setTerms.bind(this)} placeholder="Search... (try searching for pie!)" />
        </div>
        <div className="hits">
          <div className="index">
            <Index frame={frame} rows={9} />
          </div>
          <div className="source">
            <Table records={records} frame={frame} rows={9} />
          </div>
        </div>
        {note}
      </div>
    );
  }

}

module.exports = SearchInteraction;
