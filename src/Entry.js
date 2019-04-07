import React from 'react';
import Sprite from './Sprite';

export default function Entry(props) {
  let spritesMentioned = [];
  props.pkmnMentioned.forEach(pokemon => {
    let spriteName = pokemon
      .replace(/\s+/g, '-')
      .replace(/[.,':\s]/g, "")
      .replace(/♀/g, "-f")
      .replace(/♂/g, "-m")
      .toLowerCase();
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