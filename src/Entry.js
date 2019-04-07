import React from 'react';
import { pokemonArray } from './pokemonArray';
import Sprite from './Sprite';

export default function Entry(props) {
  let pkmnMentioned = [];
  pokemonArray.forEach(pokemon => {
    let bodySearch = props.text.search(pokemon);
    if (bodySearch >= 1) {
      pkmnMentioned.push(pokemon);
    } else {
      let titleSearch = props.title.search(pokemon);
      if (titleSearch >= 1) {
        pkmnMentioned.push(pokemon);
      }
    }
  });

  let spritesMentioned = [];
  pkmnMentioned.forEach(pokemon => {
    let spriteName = pokemon
      .replace(/\s+/g, '-')
      .replace(/[.,':\s]/g, "")
      .replace(/♀/g, "-f")
      .replace(/♂/g, "-m")
      .toLowerCase();
    //console.log(`${props.searchPokemon} ${pokemon} ${pokemon === props.searchPokemon}`);
    spritesMentioned.push(
      <Sprite
        key={pokemon}
        fullName={pokemon}
        name={spriteName}
        isSearched={pokemon === props.searchPokemon}
        setSpecificAndPokemon={props.setSpecificAndPokemon}
      />
    );
  })

  return (
    <div className="entry">
      <div className="subname">{props.subName}</div>
      <a
        href={props.url}
        target="_blank"
        rel="noopener noreferrer"
        className="title"
      >
        {props.title.replace(/(&amp;)/g, "&")}
      </a>
      <div className="sprites-container">
        <h3>Pokemon Mentioned:</h3>
        <div className="sprites">
          {spritesMentioned.length ? spritesMentioned : "None"}
        </div>
      </div>
    </div>
  );
}