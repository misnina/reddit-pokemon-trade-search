import React, { Component } from 'react';
import axios from 'axios';

import Entry from './Entry';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      general: [],
    }
  }

  render() {
    const { general } = this.state;
    let listings = [];
    general.forEach(listing => {
      let post = listing.data;
      let entry =
        <Entry
          key={post.title}
          subName={post.subreddit_name_prefixed}
          title={post.title}
          url={post.url}
          text={post.selftext}
        />;
      listings.push(entry);
    });

    return (
      <div>
        {listings}
      </div>
    );
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
