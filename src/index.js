import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      search: '',
      previousSearches: {
        'angular': 'Angular',
        'jquery': 'jQuery',
        'react': 'React',
        'meteor': 'Meteor',
        'feathersjs': 'FeathersJS',
        'keystone': 'Keystone',
      },
      results: []
    };
  }

  handleSearch = (obj, str) => {
    if (str.length === 0) return [];
    const key, results = [];
    for (key in obj) obj.hasOwnProperty(key)
      && key.indexOf(str) === 0
      && results.push([obj[key]]);
    return results;
  }

  handleChange = (event) => {
    const str = event.target.value.replace(/\s+/g, '-').toLowerCase();
    const results = this.handleSearch(this.state.previousSearches, str);
    this.setState({
      [event.target.name]: event.target.value,
      results
    });
  }

  addToList = () => {
    const previousSearches = this.state.previousSearches;
    const searchInput = this.state.search;
    const searchKey = searchInput.replace(/\s+/g, '-').toLowerCase();

    if (this.state.previousSearches.searchKey) {
      return false;
    }

    previousSearches[searchKey] = searchInput;

    this.setState({ previousSearches, search: '' });
  }

  render() {
    return (
      <div>
        <input
          name='search'
          onChange={this.handleChange}
          value={this.state.search}
          placeholder='Search here'
        />
        <button onClick={this.addToList}>Search</button>

        <h3>Results</h3>
        {this.state.results.map((result) => {
          return <p key={result}>{result}</p>;
        })}
        <h3>Search history</h3>
        {Object.keys(this.state.previousSearches).map((key) => {
          return <p key={key}>{this.state.previousSearches[key]}</p>;
        })}
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));