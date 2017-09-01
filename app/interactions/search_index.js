const _ = require('lodash');

class SearchIndex {

  constructor(records, options={}) {
    this.records = records;
    this.dict = {};
    this.rebuild();
  }

  docCount() {
    return this.records.length;
  }

  dictSize() {
    return Object.keys(this.dict).length;
  }

  // Perform a serch for a set of terms
  search(terms) {
    let matches = _.flatten(terms.map((term) => {
      return this.searchTerm(term);
    }));

    let groups = _.groupBy(matches, "id");

    return _.values(groups).map((terms) => {
      return {
        id: terms[0].id,
        rank: _.sumBy(terms, "rank"),
        matches: terms
      }
    })

    return groups;
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

}

module.exports = SearchIndex;