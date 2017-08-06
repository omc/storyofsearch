var Tokenizers = {

  lowecase: function(term) {
  },

  ngram: function(term, min, max) {
  }

}

class Index {

  constructor() {
    this.docs = [];
    this.index = {};
    this.analyzers = {};
  }
  

  addDoc(doc) {
    // gen id
    this.docs.push(doc);
  }

  commit() {
    this.index = {};

    // TODO: index of docs
    for(var doc in this.docs) {
      var terms = this.tokenize(doc);

      // docs
      // count each term
      // 

    }

    // take each doc, scan fields and values, run through analyzers, and store
  }

  search(terms) {
    var tokens  = this.tokenize(terms);
    return this.docs;
  }

  tokenize(terms) {
    return [terms];
  }

}

module.exports = Index
