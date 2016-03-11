/*
A CodeListSpecification is a reference to an external codelist, the reference being an retrievalQuery.
*/

class CodeListSpecificationModel {
  constructor(object) {
    if(object) {
      this._id = object._id;
      this._retrievalQuery = object._retrievalQuery;
      this._label = object._label;
      this._name = object._name;
    } else {
      this._id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
      this._retrievalQuery = '';
      this._label = '';
      this._name = '';
    }
  }

  get id() {
    return this._id;
  }

  get retrievalQuery() {
    return this._retrievalQuery;
  }

  get label() {
    return this._label;
  }

  get name() {
    return this._name;
  }

  set id(id) {
    if (typeof id !== 'string') {
      throw new Error('The parameter must be a string');
    }
    this._id = id;
  }

  set retrievalQuery(retrievalQuery) {
    if (typeof retrievalQuery !== 'string') {
      throw new Error('The parameter must be a string');
    }
    this._retrievalQuery = retrievalQuery;
  }

  set label(label) {
    if (typeof label !== 'string') {
      throw new Error('The parameter must be a string');
    }
    this._label = label;
  }

  set name(name) {
    if (typeof name !== 'string') {
      throw new Error('The parameter must be a string');
    }
    this._name = name;
  }
}

export default CodeListSpecificationModel;