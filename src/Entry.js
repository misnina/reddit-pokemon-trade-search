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
      .replace(/[♀\s]/g, "-f")
      .replace(/[♂\s]/g, "-m")
      .toLowerCase();
    spritesMentioned.push(
      <Sprite name={spriteName} />
    );
  })
  return (
    <div className="entry">
      <div>{props.subName}</div>
      <a
        href={props.url}
        target="_blank"
        rel="noopener noreferrer"
      >{props.title}</a>
      <div className="sprites">
        <div>Pokemon Mentioned:</div>
        {spritesMentioned}
      </div>
    </div>
  );
}