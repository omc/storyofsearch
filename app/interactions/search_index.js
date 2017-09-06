const _ = require('lodash');

class SearchIndex {

  constructor(records, options={}) {
    this.records = records;
    this.dict = {};
    this.analyzers = options.analyzers || [function(t) { return t; }];
    this.rebuild();
  }

  docCount() {
    return this.records.length;
  }

  dictSize() {
    return Object.keys(this.dict).length;
  }

  record(id) {
    return _.find(this.records, (r) => {
      return r.id == id;
    });
  }

  tokenSet() {
    return [].concat.apply([], this.records.map((r) => {
      return r.text.split(/\s+/).map((term, idx) => {
        return {
          id: r.id,
          term: term,
          token: this.analyze(term),
          idx: idx
        };
      });
    }));
  }

  searchRecords(results) {
    return results.map((r) => {
      return this.record(r.id);
    });
  }

  // Perform a serch for a set of terms
  search(terms) {
    let matches = _.flatten(terms.map((term) => {
      return this.searchTerm(term);
    }));

    let ranked = _.values(_.groupBy(matches, "id")).map((terms) => {
      return {
        id: terms[0].id,
        rank: _.sumBy(terms, "rank"),
        matches: terms
      }
    })

    return _.reverse(_.sortBy(ranked, "rank"));
  }

  searchTerm(term) {
    let match = this.dict[term]; 
    if(!match) {
      return [];
    }

    // idf is the natural log of total number of docs / number of docs with the term
    let idf = Math.log(this.records.length / (match.postings.length * 1.0));
    return match.postings.map((posting) => {
      return {
        id: posting.id,
        term: term,
        positions: posting.positions,
        rank: posting.tf * idf
      }
    })
  }

  // Rebuild the index (in mem datastructure)
  rebuild() {
    this.dict = {};

    // extract term positions in array of terms
    function positions(array, term) {
      let result = [];
      for(let i = 0;i < array.length;i++) {
        if(array[i] == term) {
          result.push(i);
        }
      }
      return result;
    }

    this.records.forEach((record) => {
      var terms = record.text.split(/\s+/);
      var clean = _.uniq(terms);
      clean.forEach((term) => {
        if(!this.dict.hasOwnProperty(term)) {
          this.dict[term] = {
            postings: []
          };
        }

        let pos = positions(terms, term);
        this.dict[term].postings.push({
          id: record.id,
          positions: pos,
          tf: pos.length / terms.length
        });
      })
    });
  }

  analyze(token) {
    let result = token;
    _.each(this.analyzers, (fn) => {
      result = fn(result);
    });
    return result;
  }

}

module.exports = SearchIndex;