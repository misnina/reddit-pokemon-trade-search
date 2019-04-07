import React, { Component } from 'react';
import axios from 'axios';
import { pokemonArray } from './pokemonArray';

import Entry from './Entry';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      general: [],
      specific: false,
      searchPokemon: null,
    }
  }

  render() {
    const { general, specific, searchPokemon } = this.state;
    let listings = this.listings(specific, searchPokemon) || 0;
    const all = <header>Searching last 30 results of 3 subreddits...</header>;
    const lookSpecific = <header>Searching last 90 results for trades containing {searchPokemon}...</header>;
    const lookups = pokemonArray.map((pokemon, i) => {
      return (
        <option
          key={pokemon + ` option`}
          value={pokemon}
        >
          {`${pokemon} #${i + 1}`}
        </option>
      );
    });
    const searchAll =
      <select
        onChange={e => this.setSpecificAndPokemon(true, e.target.value)}
      >
        <option
          key='none'
          value={null}
          onClick={() => this.setSpecificAndPokemon(false, null)}
        >
          None
        </option>
        {lookups}
      </select>

    return (
      <div id="app">
        {specific ? lookSpecific : all}
        {searchAll}
        <div id="listing-container">
          {general[89] ? listings : "Loading..."}
        </div>
      </div>
    );
  }

  setSpecificAndPokemon = (value, pokemon) => {
    this.setState({ specific: value, searchPokemon: pokemon });
  }

  getPKMNMentioned(entry) {
    let pkmnMentioned = [];
    pokemonArray.forEach(pokemon => {
      let bodySearch = entry.selftext.search(pokemon);
      if (bodySearch >= 1) {
        pkmnMentioned.push(pokemon);
      } else {
        let titleSearch = entry.title.search(pokemon);
        if (titleSearch >= 1) {
          pkmnMentioned.push(pokemon);
        }
      }
    });
    return pkmnMentioned;
  }

  listings(specifics, pokemon) {
    const { general, searchPokemon } = this.state;
    if (!specifics) {
      return general.map((listing, i) => {
        let post = listing.data;
        let pkmnMentioned = this.getPKMNMentioned(post);
        return <Entry
          key={post.title + i}
          subName={post.subreddit_name_prefixed}
          title={post.title}
          url={post.url}
          text={post.selftext}
          pkmnMentioned={pkmnMentioned}
          setSpecificAndPokemon={this.setSpecificAndPokemon}
        />;
      });
    } else {
      return general.map((listing, i) => {
        let post = listing.data;
        let pkmnMentioned = this.getPKMNMentioned(post);
        if (pkmnMentioned.includes(pokemon, i)) {
          return <Entry
            key={post.title + i}
            subName={post.subreddit_name_prefixed}
            title={post.title}
            url={post.url}
            text={post.selftext}
            searchPokemon={searchPokemon}
            setSpecificAndPokemon={this.setSpecificAndPokemon}
          />;
        } else {
          return "";
        }
      });
    }
  }

  componentDidMount() {
    this.fetchGeneralListings();
  }

  fetchGeneralListings() {
    let generalListings = [];
    axios.get(`https://www.reddit.com/r/pokemontrades/search.json?q=LF&q=FT&limit=30&restrict_sr=1&sort=new`)
      .then(res => {
        res.data.data.children.forEach(child => {
          generalListings.push(child);
        });
        return axios.get(`https://www.reddit.com/r/CasualPokemonTrades/search.json?q=LF&q=FT&limit=30&restrict_sr=1&sort=new`);
      })
      .then(res => {
        res.data.data.children.forEach(child => {
          generalListings.push(child);
        });
        return axios.get(`https://www.reddit.com/r/RelaxedPokemonTrades/search.json?q=LF&q=FT&limit=30&restrict_sr=1&sort=new`);
      })
      .then(res => {
        res.data.data.children.forEach(child => {
          generalListings.push(child);
        });
        this.setState({ general: generalListings });
      })
      .catch(console.log)
  }
}

export default App;
